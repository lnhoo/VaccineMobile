<template>
	<transition name="move" v-on:after-enter="enter">
		<div class="order-num">
			<v-header :headerObj="headerObj"></v-header>
			<ul class="mui-table-view" v-if="batchList.length>0">
				<li style="padding:10px 20px;">
					<button class="mui-btn mui-btn-primary add-packing-btn" type="button" @tap="addPacking()">添加包装箱</button>	
				</li>
				<li class="mui-table-view-cell mui-collapse" v-for="(batch,index) in batchList" :class="{'mui-active':index==0}">
					<a class="mui-navigate-right" href="javascript:;">包装箱码：{{batch.PackedNo}}</a>
					<div class="mui-collapse-content">
						<div class="flex pd10">
							<span class="flex-items">包装箱码</span>
							<span class="flex-items text-r">{{batch.PackedNo}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">接收单位</span>
							<span class="flex-items text-r">{{batch.NextOrgName}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">包装箱疫苗总数量</span>
							<span class="flex-items text-r">{{batch.Number}}</span>
						</div>
						<div class="flex pd10">
							<span class="flex-items">状态</span>
							<span class="flex-items text-r">{{batch.Status}}</span>
						</div>
						<div class="mui-button-row pd10">
							<div class="flex">
								<span class="flex-items mui-btn-primary" v-if="batch.StatusID=='1' && (outNumber!=packedNumber || !outNumber)"  @tap="add(batch)">添加疫苗</span>
								<span class="flex-items mui-btn-primary" v-if="batch.StatusID=='1'" @tap="del(batch.PackedNo,index)">删除包装箱</span>
								<span class="flex-items mui-btn-primary" @tap="toDetail(batch)">详情</span>
							</div>	

						</div>
					</div>
				</li>
			</ul>
			<div v-if="batchList.length==0"  class="no-data-msg" >
				<div style="padding:10px 20px;">
					<button type="button" class="mui-btn mui-btn-primary add-packing-btn"  @tap="addPacking()">添加包装箱</button>		
				</div>
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
					title:'包装箱列表',
					hasBack : true
				},
				batchList:[],
				message : '',
				outNumber : '',
				packedNumber : '',
				outRecipeNo : this.$route.query.outRecipeNo
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
		            	 			"FunCode":"0027",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"OutRecipeNo":"'+_self.outRecipeNo+'"\
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
	                		if(items){
	                			let batch = items.Item
	                			_self.outNumber = req.Response.Body.OutNumber
	                			_self.packedNumber = req.Response.Body.PackedNumber
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
			toDetail( batch ){
				console.log(batch.PackedNo);
				this.$router.push({
					path : "/home/out-stock/pack-list/pack-detail",
					query : {
						coldValue : batch.PackedNo
					}
				})
			},
			add( batch ){
				this.$router.push({
					path : "/home/out-stock/pack-list/out-batch",
					query : {
						outRecipeNo : batch.OutRecipeNo,
						packedNo : batch.PackedNo
					}
				})
			},
			del( packedNo,idx ){
				let _self = this;
				//plus.nativeUI.showWaiting( "删除中..." );
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
		            	 			"FunCode":"0030",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"PackedNo":"'+packedNo+'"\
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
	                		mui.toast("删除成功"); 
	                		_self.$parent.initData();
	                		_self.batchList.splice( idx,1 )
	                		if(_self.batchList.length==0){
	                			_self.message = "无包装箱"
	                		}
	                		//plus.nativeUI.closeWaiting();
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast(type);
					}
	            });
			},
			// 添加包装箱
			addPacking(){
				let _self = this;
				//plus.nativeUI.showWaiting( "正在添加..." );
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
		            	 			"OutRecipeNo":"'+_self.$route.query.outRecipeNo+'"\
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
	                		//plus.nativeUI.closeWaiting();
	                		_self.batchList.push( req.Response.Body.Items.Item )
	                		mui.toast("添加成功"); 
	                		_self.$parent.initData();
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
<style scoped></style>
