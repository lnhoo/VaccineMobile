<template>
	<transition name="move">
		<div class="stock-list">
			<v-header :headerObj="headerObj"></v-header>
			<div class="stock-box">
				<div  class="stock-container" v-for="(item,index) in stockList" @click="type=='0'?inStorage(item):scanCode()">
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
                		console.log(req)
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					alert(type);
				}
            }); 
		},
		methods: {
			inStorage : function( item ){
				let _self = this;
				plus.nativeUI.prompt( "待入库数量:100", function(e){
					if(e.index == 0){
						_self.joinCold( item,e.value);
					}
				},"入库提示", "请输入入库数量", ["确定","取消"]);
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
	                		_self.$router.go(-1)
	                		_self.$parent.roloadData( number )
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast( type );
					}
	            }); 
			},
			scanCode() {
				let _self = this;
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					//成功
					mui.toast("入库成功");
				}, function(result) {
					//失败
					mui.toast("失败")
				})
			}
		}
	}
</script>
<style scoped src="@/assets/css/stock/stock-list"></style>