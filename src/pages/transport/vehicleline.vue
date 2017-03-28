<template>
		<transition name="move">
			<div class="stock-detail">
				<v-header :headerName="headerName"></v-header>
				<div class="xslx">
					<img src="../../assets/images/j30.jpg"/>
					<div class="clxs cf">
			        	<span>行驶车辆</span>
			            <a href="#">湘A2b457  </a>
			            <a href="#">湘A2b457  </a>
			            <a href="#">湘A2b457  </a>
			            <a href="#">湘A2b457  </a>
			            <a href="#">湘A2b457  </a>
			            <a href="#">湘A2b457  </a>
			            <a href="#">湘A2b457  </a>
			        </div>
				</div>
				<v-tabber></v-tabber>
			</div>
		</transition>
		
</template>

<script>
	import Header from '@/pages/layout/header'
	import Tabber from '@/pages/layout/tabber'
	export default {
		name :'stock-vehicleline',
		components:{
			"v-header" : Header,
			'v-tabber' : Tabber
		},
		data() {
			return {
				headerName : '行驶路线'	
			}
		},
		methods: {
			toDetail : function(){
				this.$router.push("/vehicleline")
			}
		}
	}
</script>

<style>
	.xslx{ position:relative;}
	.xslx img{ width:100%; height:auto}
	.clxs{ background:url(../../assets/images/j31.png) no-repeat center; background-size:100% 100%; position:absolute; bottom:0; left:0; width:100%; padding:8% 6%}
	.clxs span,.clxs a{ float:left;}
	.clxs span{ font-size:12px; color:#fff; padding:4px;}
	.clxs a{ background:#6972b2;padding:4px 6px; display:inline-block; color:#fff; font-size:12px; margin:0 5px 10px 5px;border-radius:10px;}
	.clxs a:hover,.clxs a.open{ background:#363f7e;}
</style>