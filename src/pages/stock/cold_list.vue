<template>
	<transition name="move" v-on:after-enter="enter">
		<div class="stock-list">
			<v-header :headerObj="headerObj"></v-header>
			<div class="stock-box">
				<div  class="stock-container" v-for="(item,index) in stockList" @click="type=='0'?inStorage(item):scanCode(item)">
					<img src="../../assets/images/j17.png"/>
					<b v-html="item.ColdStoreName"></b>
					<span class="jz" v-html="customerName"></span>
				</div>
					
				<div v-if="stockList.length==0"  class="no-data-msg" >
					<div class="ds-table">
						<div class="ds-tell">{{message}}<span v-if="!message" class="mui-spinner"></span></div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import Header from '@/pages/layout/header'
	import '@/assets/scss/stock-list'
	export default {
		components:{
			'v-header' : Header
		},
		name : 'stock-list',
		data() {
			return {
				customerCode : localStorage.getItem("customerCode"),
				headerObj : {
					title:'库房列表',
					hasBack : true
				},
				listRouter : false,
				stockList : [],
				message : '',
				type : ''
			}
		},
		methods: {
			enter(){
				this.initData();
			},
			initData(){
				let _self = this;
				this.type = this.$route.query.type;
				mui('.mui-scroll-wrapper').scroll({
					indicators: false //是否显示滚动条
				});
	            mui.ajax({
	                type: "POST",
	                contentType:"application/json; charset=utf-8",
	                url : localStorage.getItem("http"),
	                data:{
	            	 	strRequest:'{\
	            	 		"Request":{\
	            	 			"Header":{\
	                	 			"AppCode":"01",\
	                	 			"AppTypeCode":"01",\
	                	 			"FunCode":"0004",\
	                	 			"ResponseFormat":"2"\
	                	 		},"Body":{\
	                	 			"CustomerCode":"'+_self.customerCode+'",\
	                	 			"Page":1,\
	                	 			"PageSize":200,\
	                	 			"Status":"1"\
	                	 		}\
	                	 	}\
	            	 	}',
	            	 	RequestFormat:2
	            	},
	                dataType:'json',
	                success:function(result){
	                	let req = JSON.parse(result.d);
	                	if(req.Response.Header.ResultCode=="1"){
	                		_self.message = req.Response.Header.ResultMsg          	
	                	}else{
	                		let items = req.Response.Body.Items;
	                		if(items){
	                			_self.stockList = items.Item.reverse()
	                		}else{
	                			_self.message = "无库房信息"
	                		}
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						_self.message = type 
					}
	            }); 
			},
			// 直接入库
			inStorage : function( item ){
				let _self = this,
					total = "",
					inStorageNumber = "",
					finalNumber = 0,
					queryParams = _self.$route.query;
				if(!queryParams.packeNumber){
					total = Math.floor(queryParams.total);
					inStorageNumber = Math.floor(queryParams.inStorageNumber);
					finalNumber = total-inStorageNumber;
				}else{
					finalNumber = Math.floor(queryParams.packeNumber);
				}
				var btnArray = ['取消', '确定'];
				mui.prompt('待入库数量:'+finalNumber, '数量', '提示', btnArray, function(e) {
					if (e.index == 1) {
						if(!e.value)return false;
						if(isNaN(e.value)){
							mui.toast("请输入数字");return false;
						}
						if( Math.floor(e.value) > finalNumber ){
							mui.toast("输入数量不能大于待入库数量");return false;
						}
						if(!queryParams.packeNumber){
							_self.joinCold( item, e.value );
							return true;
						}else{
							_self.gotoUnbox( item,e.value );
							return true;
						}
						return false;
					} 
				})
			},
			// 直接入库
			joinCold(item,number) {
				let _self = this;
				plus.nativeUI.showWaiting( "数据处理中..." );
				mui.ajax({
	                type: "POST",
	                contentType:"application/json; charset=utf-8",
	                url : localStorage.getItem("http"),
	                data:{
	            	 	strRequest:'{\
	            	 		"Request":{\
	            	 			"Header":{\
	                	 			"AppCode":"01",\
	                	 			"AppTypeCode":"01",\
	                	 			"FunCode":"0016",\
	                	 			"ResponseFormat":"2"\
	                	 		},"Body":{\
	                	 			"CustomerCode":"'+localStorage.getItem("customerCode")+'",\
	                	 			"ColdStoreNo":"'+item.ColdStoreNo+'",\
	                	 			"SerialNo":"'+_self.$route.query.serialNo+'",\
	                	 			"InNumber":'+number+',\
	                	 			"OperatorName":"'+localStorage.getItem("userName")+'"\
	                	 		}\
	                	 	}\
	            	 	}',
	            	 	RequestFormat:2
	            	},
	                dataType:'json',
	                success:function(result){
	                	let req = JSON.parse(result.d)
	                	if(req.Response.Header.ResultCode=="1"){
	                		mui.toast(req.Response.Header.ResultMsg)
	                	}else{
	                		mui.toast(req.Response.Header.ResultMsg)  
	                		_self.$router.go(-2)
	                		_self.$parent.$parent.initData()
	                	}
	                	plus.nativeUI.closeWaiting();         
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast( type );
					}
	            }); 
			},
			// 扫描入库
			scanCode( item ) {
				let _self = this;
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					var codeValue = result.split("|")[0];
					if(codeValue){
						_self.scanCodeInStock(item,codeValue)
					}else{
						mui.toast("无效二维码");
					}
				}, function(result) {
					//失败
					mui.toast("失败")
				})
			},
			// 拆箱入库
			gotoUnbox( item,value ){
				let _self = this;
				let queryParams = _self.$route.query;
				plus.nativeUI.showWaiting( "数据处理中..." );
				mui.ajax({
	                type: "POST",
	                contentType:"application/json; charset=utf-8",
	                url : localStorage.getItem("http"),
	                data:{
	            	 	strRequest:'{\
	            	 		"Request":{\
	            	 			"Header":{\
	                	 			"AppCode":"01",\
	                	 			"AppTypeCode":"01",\
	                	 			"FunCode":"0025",\
	                	 			"ResponseFormat":"2"\
	                	 		},"Body":{\
	                	 			"RecipeNo":"'+queryParams.inRecipeNo+'",\
	                	 			"ColdStoreNo":"'+item.ColdStoreNo+'",\
	                	 			"OutSerialNo":"'+queryParams.outSerialNo+'",\
	                	 			"InNumber":'+value+',\
	                	 			"PackedNo":"'+queryParams.packedNo+'",\
	                	 			"OperatorName":"'+localStorage.getItem("userName")+'"\
	                	 		}\
	                	 	}\
	            	 	}',
	            	 	RequestFormat:2
	            	},
	                dataType:'json',
	                success:function(result){
	                	let req = JSON.parse(result.d)
	                	if(req.Response.Header.ResultCode=="1"){
	                		mui.toast(req.Response.Header.ResultMsg)           	
	                	}else{
	                		mui.toast(req.Response.Header.ResultMsg) 
	                		_self.$parent.$parent.initData() 
	                		_self.$router.go(-2)
	                	}
	                	plus.nativeUI.closeWaiting();
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast( type );
					}
	            }); 
			},
			// 处理扫码入库
			scanCodeInStock( item,codeValue ){
				let _self = this;
				mui.ajax({
	                type: "POST",
	                contentType:"application/json; charset=utf-8",
	                url : localStorage.getItem("http"),
	                data:{
	            	 	strRequest:'{\
	            	 		"Request":{\
	            	 			"Header":{\
	                	 			"AppCode":"01",\
	                	 			"AppTypeCode":"01",\
	                	 			"FunCode":"0007",\
	                	 			"ResponseFormat":"2"\
	                	 		},"Body":{\
	                	 			"InRecipeNo":"'+_self.$route.query.inRecipeNo+'",\
	                	 			"ColdStoreNo":"'+item.ColdStoreNo+'",\
	                	 			"OperatorName":"'+localStorage.getItem("userName")+'",\
	                	 			"CodeValue":"'+codeValue+'"\
	                	 		}\
	                	 	}\
	            	 	}',
	            	 	RequestFormat:2
	            	},
	                dataType:'json',
	                success:function(result){
	                	let req = JSON.parse(result.d)
	                	if(req.Response.Header.ResultCode=="1"){
	                		mui.toast(req.Response.Header.ResultMsg)
	                	}else{
	                		mui.toast(req.Response.Header.ResultMsg)
	                		_self.$parent.batchList = [];
	                		_self.$parent.initData();
	                		_self.$router.go(-1);      
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast(type);
					}
	            }); 
			}
		}
	}
</script>
<style scoped></style>