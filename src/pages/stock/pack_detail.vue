<template>
	<transition name="move">
		<div class="order-num">
			<v-header :headerObj="headerObj"></v-header>
			<ul class="mui-table-view" v-if="batchList.length>0">
				<li class="mui-table-view-cell mui-collapse" v-for="(batch,index) in batchList" :class="{'mui-active':index==0}">
					<a class="mui-navigate-right" href="javascript:;">{{batch.PackedNo}}</a>
					<div class="mui-collapse-content">
						<div class="flex pd10">
							<span class="flex-items">包装箱唯一号</span>
							<span class="flex-items text-r">{{batch.PackedNo}}</span>
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
							<span class="flex-items">有效期</span>
							<span class="flex-items text-r">{{batch.ShelfLife}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">已卸车包装数量</span>
							<span class="flex-items text-r">{{batch.PackeNumber}}</span>
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
				headerObj :{
					title:'包装箱详情',
					hasBack : true
				},
				batchList:[],
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
	            	 			"FunCode":"0024",\
	            	 			"ResponseFormat":"2"\
	            	 		},"Body":{\
	            	 			"InRecipeNo":"",\
	            	 			"CodeValue":"'+_self.$route.query.coldValue+'"\
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
		methods : {
			
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
