<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="page-child-info">
			<v-header :headerObj="headerObj"></v-header>
			<div class="child-info-box">
				<p class="tabs">
					<a href="javascript:;" class="items active">儿童信息</a>
					<a href="javascript:;" class="items">育苗信息</a>
				</p>
				<div class="pop-wrap">
					<div class="inner-box">
						<ul class="mui-table-view">
				            <li class="mui-table-view-cell text-l">
				            	姓名<span class="fl-r">刘某某</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	性别<span class="fl-r">女</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	接种编号<span class="fl-r">sw0345</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	出生日期<span class="fl-r">2017-04-01</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	接种日期<span class="fl-r">2017-04-01</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	接种部位<span class="fl-r">左手臂</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	接种点<span class="fl-r">8:00</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	接种医生<span class="fl-r">齐医生</span>
				            </li>
				        </ul>
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
					title:'设备温湿度',
					hasBack : true
				}
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