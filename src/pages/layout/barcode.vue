<template>
	<transition v-on:after-leave="leave">
		<div class="barcode">
			<v-header :headerObj="headerObj"></v-header>
			<div id="bcid">
				<div style="height:40%"></div>
				<p class="tip">...载入中...</p>
			</div>
			<footer>
				<div class="fbt" @click="back()">取　 消</div>
				<div class="fbt" @click="scanPicture()">选择图片</div>
			</footer>
		</div>
	</transition>
</template>
<script>
	import Header from '@/pages/layout/header'
	export default {
		name:"page-header",
		props : [ 'headerName' ],
		components:{
			"v-header" : Header
		},
		data() {
			return {
				headerObj :{
					title:'扫码',
					hasBack : true
				}, 
				scan : null
			}
		},
		mounted() {
			this.scan=new plus.barcode.Barcode('bcid')
		    this.scan.onmarked = this.onmarked
		    this.scan.start({conserve:true,filename:'_doc/barcode/'})
		},
		methods : {
			leave(){
				this.scan.close()
			},
			back() {
				this.scan.close()
				history.back()
			},
			scanPicture() {
				plus.gallery.pick(function(path){
				    plus.barcode.scan(path,onmarked,function(error){
						plus.nativeUI.alert('无法识别此图片')
					})
			    }, function(err){
			        plus.nativeUI.alert('Failed: '+err.message)
			    })
			},
			onmarked(type, result, file) {
				this.scan.cancel()
				switch(type){
			    	case plus.barcode.QR:
			    	type = 'QR';
			    	break;
			    	case plus.barcode.EAN13:
			    	type = 'EAN13';
			    	break;
			    	case plus.barcode.EAN8:
			    	type = 'EAN8';
			    	break;
			    	default:
			    	type = '其它'+type;
			    	break;
			    }
			   
			}
		}
	}
</script>
<style scoped="scoped">
	.barcode{
		top:0;
		bottom: 0;
		width: 100%;
		position: absolute;
		z-index: 1000;
		background: #303f7a;
		overflow: hidden;
	}
	#bcid {
		width: 100%;
		position: absolute;
		top: 75px;
		bottom: 44px;
		background: #000;
		text-align: center;
		overflow: hidden;
	}
	.tip {
		color: #FFFFFF;
		font-weight: bold;
		text-shadow: 0px -1px #103E5C;
	}
	footer {
		width: 100%;
		height: 44px;
		position: absolute;
		bottom: 0px;
		line-height: 44px;
		text-align: center;
		color: #FFF;
	}
	.fbt {
		width: 50%;
		height: 100%;
		background-color: #FFCC33;
		float: left;
	}
	.fbt:active {
	  	-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
		box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
	}
	
</style>