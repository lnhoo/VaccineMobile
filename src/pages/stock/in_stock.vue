<template>
	<transition name="move">
		<div class="order-num">
			<v-header :headerObj="headerObj"></v-header>
			<ul class="mui-table-view ul-cls" v-if="batchList.length>0">
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
							<button class="mui-btn mui-btn-primary fl-r" type="button" @click="selectOpt(index)">疫苗入库</button>&nbsp;&nbsp;
							<button class="mui-btn mui-btn-primary fl-r mr10" type="button" @click="codeOutCar(batch.InRecipeNo)">扫码卸苗</button>&nbsp;&nbsp;
							<button class="mui-btn mui-btn-primary fl-r mr10" type="button" @click="lookDetail(batch.InRecipeNo)">查看详情</button>

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
					title:'疫苗入库单列表',
					hasBack : true
				},
				batchList:[],
				idx : 0,
				message : '暂无数据'
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
	                		_self.message =  req.Response.Header.ResultMsg    	
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
			// 直接入库 
			directStorage() {
				let batch = this.batchList[this.idx];
				if(Math.floor(batch.InStorageNumber)>=Math.floor(batch.Number)){
					mui.toast("入库数量已满");return;
				}
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
			codeInStorage() {
				let _self = this;
				let batch = this.batchList[this.idx];
				this.$router.push({
	            	path  :'/home/in-stock/cold-list',
	            	query : { 
	            		type : '1',
	            		inRecipeNo : batch.InRecipeNo 
	            	}
	            });
			},
			// 扫码卸苗
			codeOutCar(inRecipeNo) {
				let _self = this;
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					var codeValue = result.split("|")[0];
					if(codeValue){
						_self.unCar(inRecipeNo,codeValue)
					}else{
						mui.toast("无效二维码");
					}
				}, function(result) {
					//失败
					mui.toast("失败")
				})
			},
			// 扫码卸苗
			unCar(inRecipeNo,coldValue){
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
		            	 			"FunCode":"0006",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"CodeValue":"'+coldValue+'",\
		            	 			"InRecipeNo":"'+inRecipeNo+'",\
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
			},
			selectOpt(idx){
				this.idx = idx;
				let _self = this;
				var btnArray = [{title:"直接入库"},{title:"拆箱入库"},{title:"扫码入库"}];
				plus.nativeUI.actionSheet( {
					cancel:"取消",
					buttons:btnArray
				}, function(e){
					var index = e.index;
					switch (index){
						case 1:
							_self.directStorage();
							break;
						case 2:
							_self.unboxing();
							break;
						case 3:
							_self.codeInStorage();
							break;
					}
				} );
			},
			// 拆箱入库
			unboxing(){
				let _self = this;
				let batch = this.batchList[this.idx];
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					let codeValue = result.split("|")[0];
					if(codeValue){
						_self.gotoUnboxing(batch.InRecipeNo,codeValue);
					}else{
						mui.toast("无效二维码");
					}
				}, function(result) {
					//失败
					mui.toast("失败")
				})
				
			},
			gotoUnboxing(inRecipeNo,codeValue){
				this.$router.push({
	            	path  :'/home/in-stock/order-detail',
	            	query : { 
	            		inRecipeNo : inRecipeNo,
	            		codeValue  :codeValue
	            	}
	            });
			}
		}
	}
</script>
<style></style>
