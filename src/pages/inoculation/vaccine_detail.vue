<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="page-vaccine-detail">
			<header class="mui-bar mui-bar-nav" style="background-color: rgb(48, 63, 122);padding-top:30px;height:75px;">
				<a class="mui-icon mui-icon-left-nav mui-pull-left" @click="toggleBack"></a>
				<p class="mui-title" style="font-weight: normal;color:#fff">{{ headerName }}</p>
				<span class="mui-icon mui-icon-contact mui-pull-right" style="color:#fff;"  @click="toHome"></span>
			</header>
			<div class="vaccine-detail">
				<section class="main" style="position:relative;">
					<div class="wuza1 cf">
				    	<i><img src="../../assets/images/b34.png">2017年2月25日  12:00</i>
				        <span>疫苗出库时间</span>
				    </div>
				    
				    <div class="wuza2">
				    	<div class="wuza2_a">
				        	<h3>疫苗入库时间</h3>
				        	<span><img src="../../assets/images/b34.png"> 3月01日-3月4日</span>
				        </div>
				        <em><img src="../../assets/images/b35.png"></em>
				        <div class="wuza2_a">
				        	<h3>在库停留时间</h3>
				        	<span><img src="../../assets/images/b34.png"> 3月01日-3月6日  01:11</span>
				            <i>仓库：某某某仓库</i><i>操作人：张先生</i>
				        </div>
				        <em><img src="../../assets/images/b35.png"></em>
				        <div class="wuza2_a">
				        	<h3>接种时间</h3>
				        	<span><img src="../../assets/images/b34.png"> 3月9日</span>            
				        </div>
				        <em><img src="../../assets/images/b35.png"></em>
				        <div class="wuza2_a">
				        	<h3>进入市级库时间</h3>
				        	<span><img src="../../assets/images/b34.png"> 3月01日-3月7日  3:45</span>            
				        </div>
				    </div>
				</section>
			</div>	
		</div>
	</transition>
</template>
<script>
	export default {
		name:"page-vaccine-detail",
		data() {
			return {
				headerName :'物流追踪'
			}
		},
		methods:{
			leave() {
				//this.$parent.homeRouter = false
			},
			toggleBack(){
				this.$parent.detail = false
			},
			toHome(){
				this.$router.push("/home")
			}
		}
	}
</script>
<style scoped="scoped">
	.page-vaccine-detail{
		position: absolute;
		width: 100%;
		height: 100%;
		background: #303F7A;
		z-index: 999;
		-webkit-transition:all .6s ease;
		transition:all .6s ease;
	}
	.vaccine-detail{
		position: absolute;
		top: 75px;
		left: 0;
		right:0;
		bottom: 0;
		z-index: 999;
		padding: 10px;
		overflow-y: auto;
		background: url("../../assets/images/b32.png") no-repeat; 
		background-size:100% 100%; 
	}
	.wuza1{ background:url("../../assets/images/b33.png") no-repeat; background-size:100% 100%; position:absolute; left:10px; top:20px; width:50px; padding:25px 5px 25px 15px}
	.wuza1 i{writing-mode:tb-rl; color:#a3a3a3; float:left; display:block; padding:0 4px 0 0}
	.wuza1 i img{ width:15px; height:auto; margin-bottom:4px;}
	.wuza1 span{writing-mode:tb-rl; color:#4096e1; font-size:16px;}
	.wuza2{ padding:50px 0 0 80px;}
	.wuza2 em{ display:block; text-align:center; padding:5px 0}
	.wuza2 em img{ height:30px; width:auto}
	.wuza2_a{ border:1px dashed #4096e1;border-radius:10px; padding:10px;}
	.wuza2_a h3{ font-size:16px; color:#4096e1;}
	.wuza2_a span{color:#a3a3a3; display:block; padding:10px 0; }
	.wuza2_a span img{width:15px; height:auto;margin-top: 5px;float: left;margin-top: 2px;margin-right: 10px;}
	.wuza2_a i{color:#a3a3a3; padding-left:15px;}

</style>