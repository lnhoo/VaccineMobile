<template>
	<div class="page-seedlings midden-tab">
		<div id="scroll1" class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						第一个选项卡子项-1
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-2
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-3
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-4
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-5
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-6
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-7
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-8
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-9
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-10
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-11
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-12
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-13
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-14
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-15
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-16
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-17
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-18
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-19
					</li>
					<li class="mui-table-view-cell">
						第一个选项卡子项-20
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name : 'page-seedings',
		data() {
			return {}
		},
		mounted(){
			mui('.mui-scroll-wrapper').scroll({
				indicators: true //是否显示滚动条
			});
		},
		methods : {
           	goPage( url ) {
           		this.$router.push(url)
           	}
		}
	}
</script>

<style>
.midden-tab{
	bottom: 60px;
}

</style>