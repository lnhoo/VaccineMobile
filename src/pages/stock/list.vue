<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="stock-list">
			<v-header :headerName="headerName"></v-header>
			<div class="stock-box">
				<div class="stock-container" v-for="(item,index) in result" @click="toDetail($event)">
					<img src="../../assets/images/j17.png"/>
					<b class="jz" v-html="item.name+index"></b>
					<span class="jz" v-html="item.address"></span>
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
				result : [{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				},{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				},{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				},{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				},{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				},{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				}]
			}
		},
		mounted(){
            mui.ajax({
                type: "POST",
                contentType:"application/json; charset=utf-8",
                url:"http://192.168.31.184:8393/WebService.asmx/HelloWorld",
                data:'',
                dataType:'json',
                success:function(result){                    
                    console.log(result);
                    console.log(result.d);
                    console.log(JSON.parse(result.d));
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