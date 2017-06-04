<template>
	<transition name="move"  v-on:after-enter="enter">
		<div class="order-num">
			<v-header :headerObj="headerObj"></v-header>
			<ul class="mui-table-view ul-cls" v-if="batchList.length>0">
				<li class="mui-table-view-cell mui-collapse" v-for="(batch,index) in batchList" :class="{'mui-active':index==0}">
					<a class="mui-navigate-right" href="javascript:;">{{batch.InRecipeNo}}</a>
					<div class="mui-collapse-content">
						<div class="flex pd10">
							<span class="flex-items">发苗单号</span>
							<span class="flex-items text-r">{{batch.OutRecipeNo}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">入库疫苗总数量</span>
							<span class="flex-items text-r">{{batch.Number}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">已入库疫苗总数量</span>
							<span class="flex-items text-r">{{batch.InStorageNumber}}</span>
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
							<div class="flex">
								<span class="flex-items mui-btn-primary" @tap="selectOpt(index)">疫苗入库</span>
								<span class="flex-items mui-btn-primary" @tap="codeOutCar(batch.InRecipeNo)">扫码卸车</span>
								<span class="flex-items mui-btn-primary" @tap="lookDetail(batch.InRecipeNo)">查看详情</span>
							</div>	
						</div>
					</div>
				</li>
			</ul>
			<div v-if="batchList.length==0"  class="no-data-msg" >
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
				customerCode : localStorage.getItem("customerCode"),
				idx : 0,
				message : ''
			}
		},
		methods : {
			enter(){
				this.initData();
			},
			initData() {
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
		            	 			"FunCode":"0023",\
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
			// 扫码卸车
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
			// 扫码卸车
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
		            		_self.batchList = [];
		            		// 刷新列表
		            		_self.initData();
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
				let data = this.batchList[this.idx];
				var btnArray = [{title:"扫码入库"},{title:"拆箱入库"}];
				// 如果是入库单号与出库单号相同则显示直接入库
				if(data.InRecipeNo == data.OutRecipeNo){
					btnArray.push({title:"直接入库"});
				}
				plus.nativeUI.actionSheet({
					cancel:"取消",
					buttons:btnArray
				}, function(e){
					var index = e.index;
					switch (index){
						case 1:
							_self.codeInStorage();
							break;
						case 2:
							_self.unboxing();
							break;
						case 3:
							_self.directStorage();
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
