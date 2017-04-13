<template>
	<div class="barcode">
		<div id="bcid">
			<div style="height:40%"></div>
			<p class="tip">...载入中...</p>
		</div>
		<footer>
			<div class="fbt" @click="back()">取　 消</div>
			<div class="fbt" @click="scanPicture()">扫描</div>
		</footer>
	</div>
</template>
<script>
	export default {
		name:"page-header",
		props : [ 'headerName' ],
		data() {
			return {
				scan : null
			}
		},
		mounted() {
			this.scan=new plus.barcode.Barcode('bcid')
		    this.scan.onmarked = this.onmarked
		    this.scan.start({conserve:true,filename:'_doc/barcode/'})
		},
		methods : {
			back() {
				this.scan.close()
				history.back()
			},
			scanPicture() {
				/*plus.gallery.pick(function(path){
				    plus.barcode.scan(path,onmarked,function(error){
						plus.nativeUI.alert('无法识别此图片')
					})
			    }, function(err){
			        plus.nativeUI.alert('Failed: '+err.message)
			    })
				*/
			    this.scan.start({conserve:true,filename:'_doc/barcode/'})
			},
			onmarked(type, result, file) {
				alert(JSON.stringify(result));
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
		height: 100%;
		width: 100%;
		background: red;
	}
	#bcid {
		width: 100%;
		position: absolute;
		top: 0px;
		bottom: 44px;
		text-align: center;
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