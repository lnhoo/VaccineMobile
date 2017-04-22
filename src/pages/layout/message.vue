<template>
	<div class="midden-tab">
		<div id="scroll1" class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell"  @click="scanImg">
						扫描二维码
					</li>

					<li class="mui-table-view-cell"  @click="showJDCode">
						九鼎二维码
					</li>
					<li class="mui-table-view-cell"  @click="goMap">
						百度定位
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

		<div v-show="showMap" style="position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;z-index:9999" id="map">地图加载中...</div>
	</div>
</template>
<script>
	export default {
		name : 'page-message',
		data(){
			return {
				showMap:false
			}
		},
		mounted() {
			mui('.mui-scroll-wrapper').scroll({
				indicators: true //是否显示滚动条
			});

		},
		methods :{
			getImage() {
				mui.toast('开始拍照：')

				let cmr = plus.camera.getCamera();

				cmr.captureImage(function(p){

					mui.toast('成功：'+p)

					plus.io.resolveLocalFileSystemURL(p, function(entry){

						createItem(entry);

					}, function(e){

						mui.toast('读取拍照文件错误：'+e.message);

					});

				}, function(e){

					mui.toast('失败：'+e.message);

				}, {filename:'_doc/camera/',index:1});

			},
			createItem(entry) {

				mui.toast(entry);
			},
			scanImg() {
				this.$router.push('barcode')
			},
			goMap(){
				this.$router.push('map')
			},
			showJDCode() {
				mui.toast("d9")
				var content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					//成功
					alert("成功："+result)
				}, function(result) {
					//失败
					alert("失败")
				})
			}
		}
	}
</script>

<style>
	
</style>