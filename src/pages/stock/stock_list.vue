<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="page-child-info">
			<v-header :headerObj="headerObj"></v-header>
			<div class="child-info-box">
				<div class="xjyem">
			    	<table v-for="item in items">
			    		<tr>
			    			<td><em>•</em>批号<br><span class="font-color">{{item.BatchNo}}</span></td>
			    			<td class="left-border">有效期<br>
			    				<span class="font-color">{{item.ShelfLife}}</span>
			    				<br>所在库房
			    				<br><span class="font-color">{{item.ColdStoreName}}</span>
			    			</td>
			    			<td>库存量<br>
			    				<span class="font-color">{{item.Number}}</span><br>
			    				<span class="out-btn" @click="outStock(item)">出库</span>
			    			</td>
			    		</tr>
			    	</table>
			    </div>
			    <div class="no-data-msg" v-if="items.length==0">
					<div class="ds-table">
						<div class="ds-tell">无数据</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import header from '@/pages/layout/header'
	export default {
		name:"page-child-info",
		components :{
    		'v-header' : header
    	},
		data() {
			return {
				headerObj :{
					title   : '库存列表',
					hasBack : true
				},
				items : []
			}
		},
		mounted(){
			let _self = this;
			let query = this.$route.query;
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
                	 			"FunCode":"0018",\
                	 			"ResponseFormat":"2"\
                	 		},"Body":{\
                	 			"CustomerCode":"'+localStorage.getItem("customerCode")+'",\
                	 			"BatchNo":"'+query.batchNo+'",\
                	 			"ProductCode":"'+query.productCode+'",\
                	 			"ShelfLife":"'+query.shelfLife+'"\
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
                			let stock = items.Item
	                		if(!(stock instanceof Array)){
	                			_self.items.push( stock )
	                		}else{
	                			_self.items = stock
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
		methods:{
			leave() {
				this.$parent.homeRouter = false
			},
			outStock( item ){
				let _self = this;
				plus.nativeUI.prompt( "可出库数量："+item.Number, function(e){
					if(e.index == 0){
						if(Math.floor(e.value)>Math.floor(item.Number)){
							mui.toast("没有足够的出库数量");return;
						}
						_self.outCold( item.coldStoreNo,e.value);
					}
				},"提示", "请输入出库数量", ["确定","取消"]);
			},
			outCold( coldStoreNo,number ) {
				plus.nativeUI.showWaiting( "数据处理中..." );
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
	                	 			"FunCode":"0016",\
	                	 			"ResponseFormat":"2"\
	                	 		},"Body":{\
	                	 			"CustomerCode":"'+localStorage.getItem("customerCode")+'",\
	                	 			"ColdStoreNo":"'+coldStoreNo+'",\
	                	 			"SerialNo":"'+_self.$route.query.serialNo+'",\
	                	 			"OutNumber":"'+number+'",\
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
	                		plus.nativeUI.closeWaiting();
	                		mui.toast(req.Response.Header.ResultMsg)  
	                		_self.$router.go(-1)
	                		_self.$parent.roloadData()
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
<style scoped="scoped">
	.page-child-info{
		position: absolute;
		height: 100%;
		width: 100%;
		background: #303f7a;
		top: 0;
		left: 0;
		-webkit-transition:all .3s ease;
    	transition:all .3s ease;
    	font-size: 12px;
	}
	.child-info-box{
		position: fixed;
		top:75px;
		left:0;
		right:0;
		bottom: 0;
		z-index: 9999;
		background: #4553a1;
	}
	.page-child-info .no-data-msg{
		top:0;
	}
</style>