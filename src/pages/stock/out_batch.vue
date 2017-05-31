<template>
	<transition name="move">
		<div class="order-num">
			<v-header :headerObj="headerObj"></v-header>
			<ul class="mui-table-view" v-if="batchList.length>0">
				<li class="mui-table-view-cell mui-collapse" v-for="(batch,index) in batchList" :class="{'mui-active':index==0}">
					<a class="mui-navigate-right" href="javascript:;">{{batch.VaccineName}}&nbsp;&nbsp;{{batch.BatchNo}}</a>
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
							<button class="mui-btn mui-btn-primary fl-r" type="button" @click="inPack(batch)">装 &nbsp;&nbsp;箱</button>
						</div>
					</div>
				</li>
			</ul>
			<div v-if="batchList.length==0" style="position:absolute;top:75px;left:0;right:0;bottom:0;z-index:10;background:#303f7a;">
				<div class="ds-table">
					<div class="ds-tell">{{message}}</div>
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
					title:'疫苗出库批号列表',
					hasBack : true
				},
				batchList:[],
				message : "暂无数据"
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
	            	 			"RecipeNo":"'+_self.$route.query.outRecipeNo+'",\
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
                		_self.message = req.Response.Header.ResultMsg         	
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
			inPack( batch ){
				let _self = this;
				this.$router.push({
					path : "/home/out-stock/pack-list/out-batch/stock-list",
					query:{
						batchNo : batch.BatchNo,
						productCode : batch.ProductCode,
						shelfLife : batch.ShelfLife,
						packedNo : _self.$route.query.packedNo,
						serialNo : batch.SerialNo,
						fromId : "out_batch"
					}
				})
			}
		}
	}
</script>
<style scoped></style>
