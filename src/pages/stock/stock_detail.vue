<template>
	<transition name="move">
		<div class="order-num">
			<v-header :headerObj="headerObj"></v-header>
			<ul class="mui-table-view" v-if="stockList.length>0">
				<li class="mui-table-view-cell mui-collapse" v-for="(stock,index) in stockList" :class="{'mui-active':index==0}">
					<a class="mui-navigate-right" href="javascript:;">{{stock.ColdStoreName}}</a> 
					<div class="mui-collapse-content">
						<div class="flex pd10">
							<span class="flex-items">机构</span>
							<span class="flex-items text-r">{{customerName}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">存储最低温度</span>
							<span class="flex-items text-r">{{stock.MinTemperature}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">存储最高温度</span>
							<span class="flex-items text-r">{{stock.MaxTemperature}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">存储最低湿度</span>
							<span class="flex-items text-r">{{stock.MinHumidity}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">存储最高湿度</span>
							<span class="flex-items text-r">{{stock.MaxHumidity}}</span>
						</div>
						<div class="mui-button-row">
							<button class="mui-btn mui-btn-primary fl-r" type="button" @click="out()">出&nbsp;&nbsp;库</button>
						</div>
					</div>
				</li>
			</ul>
			<div v-if="stockList.length==0" style="position:absolute;top:75px;left:0;right:0;bottom:0;z-index:10;background:#303f7a;">
				<div class="ds-table">
					<div class="ds-tell">{{noMessage}}</div>
				</div>
			</div>
			<router-view></router-view>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import Header from '@/pages/layout/header'
	export default {
		name :'order-num',
		components:{
			"v-header" : Header
		},
		data() {
			return {
				headerObj :{
					title:'库房列表',
					hasBack : true
				},
				stockList:[],
				noMessage : '暂无数据',
				customerName : localStorage.getItem("customerName")
			}
		},
		mounted(){
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
            	 	RequestFormat : 2
            	},
                dataType:'json',
                success:function(result){
                	let req = JSON.parse(result.d)
                	if(req.Response.Header.ResultCode=="1"){
                		mui.toast(req.Response.Header.ResultMsg)           	
                	}else{
                		_self.stockList = req.Response.Body.Items.Item.reverse()
                		console.log(req.Response.Body.Items.Item.reverse());
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					mui.toast(type);
				}
            }); 
		},
		methods : {
			out(){
				let _self = this;
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					//成功
					var codeValue = result.split("|")[0];
					if(codeValue){
						_self.inCar( codeValue )
					}else{
						mui.toast("无效二维码");
					}
				}, function(result) {
					//失败
					mui.toast("失败")
				})	
			},
			// 扫码装苗
			inCar( codeValue ){
				let _self = this;
				mui.ajax({
	                type: "POST",
	                contentType:"application/json; charset=utf-8",
	                url : localStorage.getItem("http"),
	                data: {
		        	 	strRequest:'{\
		        	 		"Request":{\
		        	 			"Header":{\
		            	 			"AppCode":"01",\
		            	 			"AppTypeCode":"01",\
		            	 			"FunCode":"0014",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"CodeValue":"'+codeValue+'",\
		            	 			"OutRecipeNo":"'+_self.$route.outRecipeNo+'",\
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
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast(type);
					}
	            });
			},
			gotoOutStock(coldStoreNo,outNumber){
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
	                	 			"FunCode":"0029",\
	                	 			"ResponseFormat":"2"\
	                	 		},"Body":{\
	                	 			"PackedNo":"'+_self.$route.query.packedNo+'",\
	                	 			"OutSerialNo":"'+_self.$route.query.outRecipeNo+'",\
	                	 			"OutNumber":'+outNumber+',\
	                	 			"ColdStoreNo":"'+coldStoreNo+'"\
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
	                		//_self.stockList = req.Response.Body.Items.Item.reverse()
	                		console.log(req.Response.Body);
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
<style scoped>
	.order-num{
		height: 100%;
		width: 100%;
		background: #303f7a;
		position: absolute;
		color:#fff;
		-webkit-transition:all .3s ease;
 		transition:all .3s ease;
 		overflow-y: auto;
	}
	.order-num .mui-table-view{
		position: absolute;
		top:75px;
		bottom: 0;
		left:0;
		right: 0;
		background: #303f7a;
	}
	.order-num .mui-collapse-content .flex-items{
		font-size: 12px;
	}
	.order-num .mui-table-view-cell.mui-active{
		background: transparent;
	}
	.order-num .mui-table-view-cell.mui-collapse .mui-collapse-content{
		background: transparent;
	}
</style>
