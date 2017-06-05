<template>
	<transition name="move">
		<div class="detail-page-box">
			<v-header :headerObj="headerObj"></v-header>
			<ul class="mui-table-view ul-cls" v-if="detailList.length>0">
				<li class="mui-table-view-cell  mui-collapse" v-for="(detail,index) in detailList" :class="{'mui-active':index==0}">
					<a class="mui-navigate-right" href="javascript:;">{{detail.VaccineName}}<span style="font-size:14px;float:right;padding-right:2em;">批号：{{detail.BatchNo}}</span></a>
					<div class="mui-collapse-content">
						<div class="flex pd10">
							<span class="flex-items">疫苗名称</span>
							<span class="flex-items text-r">{{detail.VaccineName}}</span>
						</div> 
						<div class="flex pd10">
							<span class="flex-items">批号</span>
							<span class="flex-items text-r">{{detail.BatchNo}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">生产企业</span>
							<span class="flex-items text-r">{{detail.ManufactureName}}</span>
						</div>
						
						<div class="flex pd10">
							<span class="flex-items">有效日期</span>
							<span class="flex-items text-r">{{detail.ShelfLife}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">疫苗总数量</span>
							<span class="flex-items text-r">{{detail.PackeNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">待入库疫苗数量</span>
							<span class="flex-items text-r">{{unNumber}}</span>
						</div>
						<div class="mui-button-row">
							<button class="mui-btn mui-btn-primary fl-r" type="button" @click="gotoStock(detail)">选择库房</button>
						</div>
						
					</div>
				</li> 
			</ul>
			<div v-if="detailList.length==0" class="no-data-msg">
				<div class="ds-table">
					<div class="ds-tell">{{message}}<span v-if="!message" class="mui-spinner"></span></div>
				</div>
			</div>
			<router-view></router-view>	
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
					title:'拆箱详情',
					hasBack : true
				},
				detailList:[],
				message : '',
				unNumber : 0
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
                	 			"FunCode":"0024",\
                	 			"ResponseFormat":"2"\
                	 		},"Body":{\
                	 			"CodeValue":"'+_self.$route.query.codeValue+'",\
                	 			"InRecipeNo":"'+_self.$route.query.inRecipeNo+'"\
                	 		}\
                	 	}\
            	 	}',
            	 	RequestFormat:2
            	},
                dataType:'json',
                success:function(result){
                	let req = JSON.parse(result.d)
                	if(req.Response.Header.ResultCode=="1"){
                		_self.message = req.Response.Header.ResultMsg;          	
                	}else{
                		let items = req.Response.Body.Items;
	            		if(items){
	            			let Item = items.Item
	                		if(!(Item instanceof Array)){
	                			_self.unNumber = Math.floor(Item.PackeNumber)-Math.floor(Item.InNumber)
	                			_self.detailList.push( Item )
	                		}else{
	                			_self.detailList = Item
	                		}
	            		}
                	}
                	
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					mui.toast( type );
				}
            });
		},
		methods : {
			gotoStock(batch,idx){
				let _self = this;
				this.$router.push({
	            	path  :'/home/in-stock/order-detail/cold-list',
	            	query : { 
	            		type : '0', 
	            		packeNumber : Math.floor(batch.PackeNumber)-Math.floor(batch.InNumber),
	            		inRecipeNo : _self.$route.query.inRecipeNo,
	            		outSerialNo : batch.OutSerialNo,
	            		packedNo :  batch.PackedNo
	            	}
	            });
			}
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
