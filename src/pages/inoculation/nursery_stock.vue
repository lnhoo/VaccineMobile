<template>
	<transition name="move"  v-on:after-leave="leave">
		<div class="page-nursery">
			<v-header :headerName="headerName"></v-header>
			<div class="nursery-content">
				<div class="flex">
					<span class="flex-items flex-1"><i></i><b>库房育苗信息</b></span>
					<span class="flex-items flex-2">查看全部</span>
				</div>
				<div class="flex-items-wrap">
					<div class="flex">
						<div class="flex-items active" @click="switchTab($event)">库房信息1</div>
						<div class="flex-items" @click="switchTab($event)">库房信息1</div>
						<div class="flex-items" @click="switchTab($event)">库房信息1</div>
					</div>
					<div class="flex">
						<div class="flex-items" @click="switchTab($event)">库房信息1</div>
						<div class="flex-items" @click="switchTab($event)">库房信息1</div>
						<div class="flex-items" @click="switchTab($event)">库房信息1</div>
					</div>	
				</div>
				<div class="pop-content">
					<div class="nursery-box flex" v-for="(item,index)  in items">
						<span class="nursery-flex text-l"><i class="circular"></i><span v-html="item.name"></span></span>
						<span class="nursery-flex text-r"><span v-html="item.number"></span></span>
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
				headerName : '库房盘点',
				i : 10,
				number : 38,
				items : [
					{name: '库房信息1',number:10},
					{name: '库房信息2',number:12},
					{name: '库房信息3',number:32},
					{name: '库房信息4',number:42},
					{name: '库房信息5',number:36},
					{name: '库房信息6',number:36},
					{name: '库房信息7',number:36},
					{name: '库房信息8',number:36},
					{name: '库房信息9',number:36}
				]
			}
		},
		mounted(){
			
		},
		methods: {
           	leave() {
				this.$parent.homeRouter = false
			},
			switchTab(e) {
				let flexItems = mui(".flex-items-wrap .flex-items")

				for( let i=0; i<flexItems.length; i++ ){
					flexItems[i].className = "flex-items"
				}
				e.target.className = "flex-items active"

				this.items.push({name: '库房信息'+this.i,number:this.number})
				this.i++
				this.number++
			}
		}
    }
</script>
<style scoped="scoped" src="@/assets/css/inoculation/nursery-stock"></style>