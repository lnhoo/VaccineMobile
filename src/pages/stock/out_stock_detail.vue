<template>
	<transition name="move">
		<div class="detail-page-box">
			<v-header :headerObj="headerObj"></v-header>
			<ul class="mui-table-view ul-cls" v-if="batchList.length>0">
				<li class="mui-table-view-cell  mui-collapse" v-for="(batch,index) in batchList" :class="{'mui-active':index==0}">
					<a class="mui-navigate-right" href="javascript:;">{{batch.VaccineName}}
						<span class="flr-text">批号:{{batch.BatchNo}}</span>
					</a>
					<div class="mui-collapse-content">
						<div class="flex pd10">
							<span class="flex-items">厂家名称</span>
							<span class="flex-items text-r">{{batch.ManufactureName}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">接收单位</span>
							<span class="flex-items text-r">{{batch.RevOrgName}}</span>
						</div>
						
						<div class="flex pd10">
							<span class="flex-items">有效日期</span>
							<span class="flex-items text-r">{{batch.ShelfLife}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">出库总数量</span>
							<span class="flex-items text-r">{{batch.Number}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">已装箱数量</span>
							<span class="flex-items text-r">{{batch.PackingNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">已出库数量</span>
							<span class="flex-items text-r">{{batch.OutStorageNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">装车数量</span>
							<span class="flex-items text-r">{{batch.LoadNumber}}</span>
						</div>
					</div>
				</li> 
			</ul>
			<router-view></router-view>	
			<div v-if="batchList.length==0"  class="no-data-msg" >
				<div class="ds-table">
					<div class="ds-tell">{{message}}<span v-if="!message" class="mui-spinner"></span></div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import Header from '@/pages/layout/header'
	export default {
		name :'detail-page-box',
		components:{
			"v-header" : Header
		},
		data() {
			return {
				headerObj :{
					title:'出库单详情',
					hasBack : true
				},
				batchList:[],
				message : ""
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
	            	 			"PageSize":200\
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
	                	if(req.Response.Header.ResultCode=="1"){
	                		_self.message = req.Response.Header.ResultMsg          	
	                	}else{
	                		let items = req.Response.Body.Items;
	                		console.log( items );
	                		if(items){
	                			let batch = items.Item
		                		if(!(batch instanceof Array)){
		                			_self.batchList.push( batch )
		                		}else{
		                			_self.batchList = batch
		                		}
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
			
		}
	}
</script>
<style>
	.detail-page-box{
		height: 100%;
		width: 100%;
		background: #303f7a;
		position: absolute;
		color:#fff;
		-webkit-transition:all .3s ease;
 		transition:all .3s ease;
 		z-index: 1000;
	}
	.mui-backdrop{
		z-index: 998;
	}
	.detail-page-box .ul-cls{
		position: absolute;
		top:75px;
		bottom: 0;
		left:0;
		right: 0;
		background: #303f7a;
		overflow-y: auto;
	}
	.detail-page-box .mui-collapse-content .flex-items{
		font-size: 12px;
	}
	.detail-page-box .mui-table-view-cell.mui-active{
		background: transparent;
	}
	.detail-page-box .mui-table-view-cell.mui-collapse .mui-collapse-content{
		background: transparent;
	}
</style>
