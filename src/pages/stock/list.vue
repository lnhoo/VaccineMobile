<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="stock-list">
			<v-header :headerName="headerName"></v-header>
			<div class="stock-box">
				<div class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<div class="stock-container" v-for="(item,index) in stockList" @click="toDetail($event)">
							<img src="../../assets/images/j17.png"/>
							<b v-html="item.ColdStoreName"></b>
							<span class="jz" v-html="customerName"></span>
						</div>	
					</div>
				</div>
			</div>
			<div :class="{'list-router-active':listRouter}" class="list-router" v-show="listRouter">
				<router-view></router-view>	
			</div>
		</div>

	</transition>
</template>
<script>
	import Header from '@/pages/layout/header'
	export default {
		components:{
			'v-header' : Header
		},
		name : 'stock-list',
		data() {
			return {
				headerName : '冷链监控',
				listRouter : false,
				stockList : [],
				customerName : localStorage.getItem("customerName")
			}
		},
		mounted(){
			let _self = this;
			mui('.mui-scroll-wrapper').scroll({
				indicators: false //是否显示滚动条
			});
            mui.ajax({
                type: "POST",
                contentType:"application/json; charset=utf-8",
                url :"http://192.168.31.184:8393/WebService.asmx/CallFun",
                data:{
            	 	strRequest:'{\
            	 		"Request":{\
            	 			"Header":{\
                	 			"AppCode":"01",\
                	 			"AppTypeCode":"01",\
                	 			"FunCode":"0004",\
                	 			"ResponseFormat":"2"\
                	 		},"Body":{\
                	 			"CustomerCode":"'+localStorage.getItem("customerCode")+'",\
                	 			"Page":"1",\
                	 			"PageSize":"10",\
                	 			"Status":"1"\
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
                		_self.stockList = req.Response.Body.Items.Item.reverse()
                		console.log(_self.stockList)
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					alert(type);
				}
            }); 
		},
		methods: {
			toDetail : function(e){
				this.listRouter = !this.listRouter
				this.$router.push("/home/cold-chain/cold-detail")
			},
			leave() {
				this.$parent.homeRouter = false
			}
		}
	}
</script>
<style scoped src="@/assets/css/stock/stock-list">
	
</style>