<template>
	<transition name="move">
		<div class="order-num">
			<v-header :headerObj="headerObj"></v-header>
			<ul class="mui-table-view" v-if="batchList.length>0">
				<li class="mui-table-view-cell mui-collapse" v-for="(batch,index) in batchList" :class="{'mui-active':index==0}">
					<a class="mui-navigate-right" href="javascript:;">{{batch.InRecipeNo}}</a>
					<div class="mui-collapse-content">
						<div class="flex pd10">
							<span class="flex-items">入库单号</span>
							<span class="flex-items text-r">{{batch.InRecipeNo}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">入库疫苗总数量</span>
							<span class="flex-items text-r">{{batch.Number}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">已卸车疫苗数量</span>
							<span class="flex-items text-r">{{batch.UnLoadNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">包装箱总数量</span>
							<span class="flex-items text-r">{{batch.PackedNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">已卸车包装箱数量</span>
							<span class="flex-items text-r">{{batch.UnLoadPackeNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">已入库包装箱数量</span>
							<span class="flex-items text-r">{{batch.InStoragePackeNumber}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">入库单状态</span>
							<span class="flex-items text-r">{{batch.Status}}</span>
						</div>
						<div class="mui-button-row">
							<button v-if="batch.InRecipeNo == batch.InRecipeNo" class="mui-btn mui-btn-primary" type="button" @click="directStorage(batch,index)">直接入库</button>&nbsp;&nbsp;
							<button class="mui-btn mui-btn-primary" type="button" @click="codeInStorage(batch.InRecipeNo)">扫码入库</button>&nbsp;&nbsp;
							<button class="mui-btn mui-btn-primary" type="button" @click="codeOutCar(batch.InRecipeNo)">扫码卸苗</button>&nbsp;&nbsp;
							<button class="mui-btn mui-btn-primary" type="button" @click="lookDetail(batch.InRecipeNo)">查看详情</button>
						</div>
					</div>
				</li>
			</ul>
			<div v-if="batchList.length==0" style="position:absolute;top:75px;left:0;right:0;bottom:0;z-index:10;background:#303f7a;">
				<div class="ds-table">
					<div class="ds-tell">暂无数据</div>
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
					title:'疫苗入库批号列表',
					hasBack : true
				},
				batchList:[],
				idx : 0
			}
		},
		mounted(){
            this.initData();
		},
		methods : {
			initData() {
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
		            	 			"FunCode":"0023",\
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
	                		}
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast(type);
					}
	            });
			},
			// 直接入库 recipeNo入库单号
			directStorage( batch,idx ) {
				if(Math.floor(batch.InStorageNumber)>=Math.floor(batch.Number)){
					mui.toast("入库数量已满");return;
				}
				this.idx = idx;
	            this.$router.push({
	            	path  :'/home/in-stock/detail',
	            	query : { 
	            		inRecipeNo : batch.InRecipeNo,
	            		total : batch.Number,
	            		inStorageNumber : batch.InStorageNumber,
	            		from : 'zjrk',
	            		title: '入库单批号列表'
	            	}
	            });
			},
			// 扫码入库
			codeInStorage(serialNo) {
				this.$router.push({
	            	path  :'/home/in-stock/cold-list',
	            	query : { serialNo : serialNo, type : '1' }
	            });
			},
			// 扫码卸苗
			codeOutCar() {
				let _self = this;
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					var codeValue = result.split("|")[0];
					if(codeValue){
						_self.unCar(codeValue)	
					}else{
						mui.toast("无效二维码");
					}
				}, function(result) {
					//失败
					mui.toast("失败")
				})
			},
			// 扫码卸苗
			unCar(coldValue){
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
		            	 			"FunCode":"0006",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"CodeValue":"'+coldValue+'",\
		            	 			"CustomerCode":"'+localStorage.getItem("customerCode")+'",\
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
			roloadData( number ) {
				let data = this.batchList[this.idx];
				data.InStorageNumber = Math.floor(data.InStorageNumber)+Math.floor(number);
				this.$set(this.batchList[this.idx],data);
			},
			// 查看详情
			lookDetail( inRecipeNo ){
				this.$router.push({
					path : '/home/in-stock/detail',
					query: {
						inRecipeNo : inRecipeNo,
						from : 'ckxq',
						title: '入库单批号列表'
					}
				})
			}
		}
	}
</script>
<style>
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
