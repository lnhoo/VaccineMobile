<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="page-child-info">
			<v-header :headerName="headerName"></v-header>
			<div class="child-info-box">
				<p class="tabs">
					<a href="" class="items active">儿童信息</a>
					<a href="" class="items">育苗信息</a>
				</p>
				<div class="pop-wrap">
					<div class="inner-box">
						<div class="li-items flex border-1px">
							<span class="flex-items text-l">姓名</span>
							<span class="flex-items text-r">刘某某</span>
						</div>
						<div class="li-items flex border-1px">
							<span class="flex-items text-l">性别</span>
							<span class="flex-items text-r">女</span>
						</div>
						<div class="li-items flex border-1px">
							<span class="flex-items text-l">接种编号</span>
							<span class="flex-items text-r">sw0345</span>
						</div>
						<div class="li-items flex border-1px">
							<span class="flex-items text-l">出生日期</span>
							<span class="flex-items text-r">2017-04-01</span>
						</div>
						<div class="li-items flex border-1px">
							<span class="flex-items text-l">接种日期</span>
							<span class="flex-items text-r">2017-04-01</span>
						</div>
						<div class="li-items flex border-1px">
							<span class="flex-items text-l">接种部位</span>
							<span class="flex-items text-r">左手臂</span>
						</div>
						<div class="li-items flex border-1px">
							<span class="flex-items text-l">接种点</span>
							<span class="flex-items text-r">8:00</span>
						</div>
						<div class="li-items flex border-1px">
							<span class="flex-items text-l">接种医生</span>
							<span class="flex-items text-r">齐医生</span>
						</div>	
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
				headerName : '儿童信息'
			}
		},
		methods:{
			leave() {
				this.$parent.homeRouter = false
			}
		}
	}
</script>
<style scoped="scoped" src="@/assets/css/inoculation/child-info"></style>