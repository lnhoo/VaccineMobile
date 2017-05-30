<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="stock-list">
			<v-header :headerObj="headerObj"></v-header>
			<div class="stock-box">
				<div class="stock-container" v-for="(item,index) in stockList" @click="toDetail(item.ColdStoreNo)">
					<img src="../../assets/images/j17.png"/>
					<b v-html="item.ColdStoreName"></b>
					<span class="jz" v-html="customerName"></span>
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
	import '@/assets/scss/stock-list'
	export default {
		components:{
			'v-header' : Header
		},
		name : 'stock-list',
		data() {
			return {
				headerObj :{
					title:'冷链监控',
					hasBack : true
				},
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
                url : localStorage.getItem("http"),
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
                		console.log(req)
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					mui.toast(type);
				}
            }); 
		},
		methods: {
			toDetail : function( ColdStoreNo ){
				this.listRouter = !this.listRouter
				this.$router.push({
					path :"/home/cold-chain/cold-detail",
					query : { coldNo : ColdStoreNo }
				})
			},
			leave() {
				this.$parent.homeRouter = false
			}
		}
	}
</script>
<style scoped></style>