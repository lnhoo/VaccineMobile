<template>
	<transition name="move" v-on:after-enter="enter">
		<div class="order-num">
			<v-header :headerObj="headerObj"></v-header>
			<ul class="mui-table-view" v-if="batchList.length>0">
				<li class="mui-table-view-cell mui-collapse" v-for="(batch,index) in batchList" :class="{'mui-active':index==0}">
					<a class="mui-navigate-right" href="javascript:;">{{batch.OutRecipeNo}}</a>
					<div class="mui-collapse-content">
						<div class="flex pd10">
							<span class="flex-items">出库单号</span>
							<span class="flex-items text-r">{{batch.OutRecipeNo}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">接收单位</span>
							<span class="flex-items text-r">{{batch.NextOrgName}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">出库总数量</span>
							<span class="flex-items text-r">{{batch.Number}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">已出库数量</span>
							<span class="flex-items text-r">{{batch.OutStorageNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">已装车疫苗总数量</span>
							<span class="flex-items text-r">{{batch.LoadNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">包装箱总数量</span>
							<span class="flex-items text-r">{{batch.PackedNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">已出库包装箱数量</span>
							<span class="flex-items text-r">{{batch.OutStoragePackeNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">已装车包装箱数量</span>
							<span class="flex-items text-r">{{batch.LoadPackeNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">出库单状态</span>
							<span class="flex-items text-r">{{batch.Status}}</span>
						</div>
						<div class="mui-button-row pd10">
							<div class="flex">
								<span class="flex-items mui-btn-primary" @tap="codeOutStorage(batch.OutRecipeNo)">扫码出库</span>
								<span class="flex-items mui-btn-primary" @tap="codeInCar(batch.OutRecipeNo)">扫码装车</span>
								<span class="flex-items mui-btn-primary" @tap="packing(batch.OutRecipeNo)">疫苗装箱</span>
								<span class="flex-items mui-btn-primary" @tap="toDetail(batch.OutRecipeNo)">详情</span>
							</div>	
						</div>
					</div>
				</li>
			</ul>
			<div v-if="batchList.length==0"  class="no-data-msg">
				<div class="ds-table">
					<div class="ds-tell">{{noMessage}}<span v-if="!noMessage" class="mui-spinner"></span></div>
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
				headerObj : {
					title : '疫苗出库单列表',
					hasBack : true
				},
				batchList : [],
				customerCode : localStorage.getItem("customerCode"),
				noMessage : ''
			}
		},
		methods : {
			enter(){
				this.initData();
			},
			initData(){
				let _self = this;
				_self.batchList = [];
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
		            	 			"FunCode":"0026",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"CustomerCode":"'+_self.customerCode+'"\
		            	 		}\
		            	 	}\
		        	 	}',
		        	 	RequestFormat:2
		        	},
	                dataType:'json',
	                success:function(result){
	                	let req = JSON.parse(result.d)
	                	if(req.Response.Header.ResultCode=="1"){
	                		_self.noMessage = req.Response.Header.ResultMsg          	
	                	}else{
	                		let items = req.Response.Body.Items;
	                		if(items){
	                			let batch = items.Item
		                		if(!(batch instanceof Array)){
		                			_self.batchList.push( batch )
		                		}else{
		                			_self.batchList = batch
		                		}
	                		}
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast(type);
					}
	            });
			},
			/*directStorage( batch ) {
				if(Math.floor(batch.OutStorageNumber)>=Math.floor(batch.Number)){
					mui.toast("出库数量已达上限");return;
				}
				this.$router.push({
					path : "/home/out-stock/stock-list",
					query:{
						batchNo : batch.BatchNo,
						productCode : batch.ProductCode,
						serialNo : batch.SerialNo,
						shelfLife : batch.ShelfLife
					}
				})
			},*/
			// 扫码出库
			codeOutStorage(outRecipeNo) {
				let _self = this;
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					//成功
					var codeValue = result.split("|")[0];
					if(codeValue){
						_self.outData( outRecipeNo,codeValue )
					}else{
						mui.toast("无效二维码");
					}
				}, function(result) {
					//失败
					mui.toast("失败")
				})
			},
			// 扫码装车
			codeInCar( outRecipeNo ) {
				let _self = this;
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					//成功
					var codeValue = result.split("|")[0];
					if(codeValue){
						_self.toJoinCar( outRecipeNo,codeValue )
					}else{
						mui.toast("无效二维码");
					}
				}, function(result) {
					//失败
					mui.toast("失败")
				})
			},
			// 扫描出库
			outData(outRecipeNo,codeValue){
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
		            	 			"FunCode":"0013",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"OutRecipeNo":"'+outRecipeNo+'",\
		            	 			"CodeValue":"'+codeValue+'",\
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
	                		_self.batchList = [];  
	                		_self.initData();
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast(type);
					}
	            });
			},
			// 处理扫码装车
			toJoinCar(outRecipeNo,codeValue){
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
		            	 			"OutRecipeNo":"'+outRecipeNo+'",\
		            	 			"CodeValue":"'+codeValue+'",\
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
	                		_self.initData();        
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast(type);
					}
	            });
			},
			// 疫苗装箱
			packing( outRecipeNo ){
				this.$router.push({
					path : "/home/out-stock/pack-list",
					query : {
						outRecipeNo : outRecipeNo
					}
				})
			},
			// 详情
			toDetail( outRecipeNo ) {
				this.$router.push({
					path : "/home/out-stock/out-stock-detail",
					query : {
						outRecipeNo : outRecipeNo
					}
				})
			}
		}
	}
</script>
<style scoped></style>
