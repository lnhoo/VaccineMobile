<template>
	<transition name="move">
		<div class="order-num">
			<v-header :headerObj="headerObj"></v-header>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-collapse" v-for="(batch,index) in batchList" :class="{'mui-active':index==0}">
					<a class="mui-navigate-right" href="javascript:;">{{batch.BatchNo}}</a>
					<div class="mui-collapse-content">
						<div class="flex pd10">
							<span class="flex-items">出库单号</span>
							<span class="flex-items text-r">{{batch.RecipeNo}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">疫苗名称</span>
							<span class="flex-items text-r">{{batch.VaccineName}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">生产企业</span>
							<span class="flex-items text-r">{{batch.ManufactureName}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">接收单位</span>
							<span class="flex-items text-r">{{batch.RevOrgName}}</span>
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
							<span class="flex-items">有效期</span>
							<span class="flex-items text-r">{{batch.ShelfLife}}</span>
						</div>
						<div class="mui-button-row pd10">
							<button class="mui-btn mui-btn-primary" type="button"  @click="directStorage(batch)">直接出库</button>&nbsp;&nbsp;
							<button class="mui-btn mui-btn-primary" type="button"  @click="codeOutStorage(batch.SerialNo)">扫码出库</button>&nbsp;&nbsp;
							<button class="mui-btn mui-btn-primary" type="button"  @click="codeOutCar(batch.SerialNo)">扫码卸车</button>
						</div>
					</div>
				</li>
			</ul>
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
					title:'批次单号列表',
					hasBack : true
				},
				batchList:[]
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
	            	 			"FunCode":"0015",\
	            	 			"ResponseFormat":"2"\
	            	 		},"Body":{\
	            	 			"CustomerCode":"'+localStorage.getItem("customerCode")+'",\
	            	 			"RecipeNo":"",\
	            	 			"BatchNo":"",\
	            	 			"Page":1,\
	            	 			"PageSize":200,\
	            	 			"Status":1\
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
                		let items = req.Response.Body.Items;
                		console.log(items)
                		if(items){
                			let batch = items.Item
	                		if(!(batch instanceof Array)){
	                			_self.batchList.push( batch )
	                		}else{
	                			_self.batchList = batch
	                		}
                		}else{
                			_self.hasData  = false
                			_self.noData = true
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
			directStorage( batch ) {
				this.$router.push({
					path : "/home/out-stock/stock-list",
					query:{
						batchNo : batch.BatchNo,
						productCode : batch.ProductCode,
						serialNo : batch.SerialNo,
						shelfLife : batch.ShelfLife
					}
				})
			},
			codeOutStorage() {
				let _self = this;
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					//成功
					mui.toast("入库成功");
				}, function(result) {
					//失败
					mui.toast("失败")
				})
			},
			codeOutCar() {
				let _self = this;
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					//成功
					mui.toast("卸车成功");
				}, function(result) {
					//失败
					mui.toast("失败")
				})
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
