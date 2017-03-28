<template>
	<transition name="move">
		<div class="page-nursery">
			<v-header :headerName="headerName"></v-header>
			<div class="nursery-content">
				<div class="flex">
					<span class="flex-items flex-1"><i></i><b>库房育苗信息</b></span>
					<span class="flex-items flex-2">查看全部</span>
				</div>
				<div class="flex">
					<div class="flex-items active">库房信息1</div>
					<div class="flex-items">库房信息1</div>
					<div class="flex-items">库房信息1</div>
				</div>
				<div class="flex">
					<div class="flex-items">库房信息1</div>
					<div class="flex-items">库房信息1</div>
					<div class="flex-items">库房信息1</div>
				</div>
				<div class="flex">
					<div class="flex-items">库房信息1</div>
					<div class="flex-items">库房信息1</div>
					<div class="flex-items">库房信息1</div>
				</div>

				<div class="pop-content">
					<div class="nursery-box flex">
						<span class="nursery-flex text-l"><i class="circular"></i>育苗名称1</span>
						<span class="nursery-flex text-r">育苗数量</span>
					</div>
					<div class="nursery-box flex">
						<span class="nursery-flex text-l"><i class="circular"></i>育苗名称1</span>
						<span class="nursery-flex text-r">育苗数量</span>
					</div>
					<div class="nursery-box flex">
						<span class="nursery-flex text-l"><i class="circular"></i>育苗名称1</span>
						<span class="nursery-flex text-r">育苗数量</span>
					</div>
					<div class="nursery-box flex">
						<span class="nursery-flex text-l"><i class="circular"></i>育苗名称1</span>
						<span class="nursery-flex text-r">育苗数量</span>
					</div>
					<div class="nursery-box flex">
						<span class="nursery-flex text-l"><i class="circular"></i>育苗名称1</span>
						<span class="nursery-flex text-r">育苗数量</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import header from '@/pages/layout/header'
    export default {
    	name: 'page-login',
    	components :{
    		'v-header' : header
    	},
        data() {
			return {
				headerName : '接种登记'
			}
		},
		mounted(){
			
		},
		methods: {
           	
		}
    }
</script>
<style scoped="scoped" src="@/assets/css/inoculation/nursery-stock"></style>