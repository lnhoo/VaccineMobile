<template>
	<transition name="move">
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
							<button class="mui-btn mui-btn-primary" type="button" @click="selectOpt(index)">疫苗出库</button>&nbsp;&nbsp;
							<button class="mui-btn mui-btn-primary" type="button"  @click="codeInCar(batch)">扫码装苗</button>&nbsp;&nbsp;
							<button class="mui-btn mui-btn-primary" type="button" @click="packing(batch.OutRecipeNo)">疫苗装箱</button>
						</div>
					</div>
				</li>
			</ul>
			<div v-if="batchList.length==0" style="position:absolute;top:75px;left:0;right:0;bottom:0;z-index:10;background:#303f7a;">
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
				headerObj : {
					title : '疫苗出库单列表',
					hasBack : true
				},
				batchList : [],
				idx : 0,
				noMessage : '暂无数据'
			}
		},
		mounted(){
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
	            	 			"FunCode":"0026",\
	            	 			"ResponseFormat":"2"\
	            	 		},"Body":{\
	            	 			"CustomerCode":"'+localStorage.getItem("customerCode")+'"\
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
                			console.log(items);
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
		methods : {
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
			codeOutStorage() {
				let _self = this;
				let batch = this.batchList[this.idx];
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					//成功
					var codeValue = result.split("|")[0];
					if(codeValue){
						_self.outData( batch.SerialNo,codeValue )
					}else{
						mui.toast("无效二维码");
					}
				}, function(result) {
					//失败
					mui.toast("失败")
				})
			},
			// 扫码装苗
			codeInCar( item ) {
				this.$router.push({
					path : "/home/out-stock/stock-detail",
					query : {
						outRecipeNo : item.OutRecipeNo	
					}
				})
			},
			// 扫描出库
			outData(serialNo,coldValue){
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
		            	 			"CustomerCode":"'+localStorage.getItem("customerCode")+'",\
		            	 			"SerialNo":"'+serialNo+'",\
		            	 			"CodeValue":"'+coldValue+'",\
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
			
			// 疫苗装箱
			packing( outRecipeNo ){
				this.$router.push({
					path : "/home/out-stock/pack-list",
					query : {
						outRecipeNo : outRecipeNo
					}
				})
			},
			selectOpt(idx){
				this.idx = idx;
				let _self = this;
				let batch = this.batchList[this.idx];
				var btnArray = [{title:"扫码出库"},{title:"添加包装箱"}];
				if(batch.StatusID!="0" || batch.StatusID!="1"){
					btnArray.splice( idx,1 );	
				}
				plus.nativeUI.actionSheet( {
					cancel:"取消",
					buttons:btnArray
				}, function(e){
					var index = e.index;
					switch (index){
						case 1:
							_self.codeOutStorage();
							break;
						case 2:
							_self.addPack();
							break;
					}
				} );
			},
			addPack() {
				let batch = this.batchList[this.idx];
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
		            	 			"FunCode":"0028",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"OutRecipeNo":"'+batch.OutRecipeNo+'"\
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
