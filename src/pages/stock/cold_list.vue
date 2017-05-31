<template>
	<transition name="move">
		<div class="stock-list">
			<v-header :headerObj="headerObj"></v-header>
			<div class="stock-box">
				<div  class="stock-container" v-for="(item,index) in stockList" @click="type=='0'?inStorage(item):scanCode(item)">
					<img src="../../assets/images/j17.png"/>
					<b v-html="item.ColdStoreName"></b>
					<span class="jz" v-html="customerName"></span>
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
				headerObj :{
					title:'库房列表',
					hasBack : true
				},
				listRouter : false,
				stockList : [],
				type : '',
				customerName : localStorage.getItem("customerName")
			}
		},
		mounted(){
			this.type = this.$route.query.type
			let _self = this;
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
                	 			"CustomerCode":"'+localStorage.getItem("customerCode")+'",\
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
                	let req = JSON.parse(result.d)
                	if(req.Response.Header.ResultCode=="1"){
                		mui.toast(req.Response.Header.ResultMsg)           	
                	}else{
                		_self.stockList = req.Response.Body.Items.Item.reverse()
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					mui.toast(type);
				}
            }); 
		},
		methods: {
			inStorage : function( item ){
				let _self = this;
				let total = "";
				let inStorageNumber = "";
				let finalNumber = 0; 
				let queryParams = _self.$route.query;
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
						if(isNaN(e.value)){
							mui.toast("请输入数字");return;
						}
						if( Math.floor(e.value) > finalNumber ){
							mui.toast("输入数量不能大于待入库数量");return;
						}
						if(!queryParams.packeNumber){
							_self.joinCold( item, e.value );
						}else{
							_self.gotoUnbox( item,e.value );
						}
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
	                		plus.nativeUI.closeWaiting();
	                		mui.toast(req.Response.Header.ResultMsg)  
	                		_self.$router.go(-2)
	                		//_self.$parent.roloadData( number )
	                	}
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
	                		plus.nativeUI.closeWaiting();
	                		mui.toast(req.Response.Header.ResultMsg)  
	                		_self.$router.go(-2)
	                	}
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
	                		_self.$router.go(-1)        
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