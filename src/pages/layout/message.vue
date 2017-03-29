<template>
	<div class="page-message midden-tab">
		<p>消息页面</p>
		<p>消息页面</p>
		<button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="scanImg">扫描二维码</button>
		<p>消息页面</p>
		<p>消息页面</p>
		<button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="maps">第三方地图</button>
		<p>消息页面</p>
		<p>消息页面</p>
		<p>消息页面</p>
		<p>消息页面</p>
		<button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="getImage">拍照</button>
		<p>消息页面</p>
		<p>消息页面</p>
		<p>消息页面</p>
		<button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="callMap">js调用百度地图</button>
		<p>消息页面</p>
		<p>消息页面</p>
		<p>消息页面</p>
	</div>
</template>

<script>
	export default {
		name : 'page-message',
		mounted() {
			
		},
		methods :{
			maps() {
				if('Android'===plus.os.name&&navigator.userAgent.indexOf('StreamApp')>0){
					plus.nativeUI.toast('当前环境暂不支持地图插件');
					return;
				}
				// 设置目标位置坐标点和其实位置坐标点
				let dst = new plus.maps.Point(116.39131928,39.90793074); // 天安门 
				let src = new plus.maps.Point(116.335,39.966); // 大钟寺
				// 调用系统地图显示 
				plus.maps.openSysMap( dst, "天安门", src );
			},
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
			callMap() {
				this.$router.push('map')
			},
			scanImg() {
				/*mui.openWindow({
				    url: 'src/pages/layout/barcode_scan.html', 
				    id:'info'
				})*/
				//plus.barcode.scan.start();
				this.$router.push('barcode')
			}
		}
	}
</script>

<style>
	.page-message{
		height: 100%;
	}
</style>