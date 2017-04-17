<template>
	<div class="midden-tab">
	    <div id="mui-slider" class="mui-slider" >
			<div class="mui-slider-group mui-slider-loop">
				<div class="mui-slider-item mui-slider-item-duplicate">
					<a href="#"><img class="sliderImg" src="../../assets/images/banner.jpg"></a>
				</div>
				<div class="mui-slider-item">
					<a href="#"><img class="sliderImg" src="../../assets/images/banner.jpg"></a>
				</div>
				<div class="mui-slider-item">
					<a href="#"><img class="sliderImg" src="../../assets/images/banner.jpg"></a>
				</div>
				<div class="mui-slider-item">
					<a href="#"><img class="sliderImg" src="../../assets/images/banner.jpg"></a>
				</div>
				<div class="mui-slider-item mui-slider-item-duplicate">
					<a href="#"><img class="sliderImg" src="../../assets/images/banner.jpg"></a>
				</div>
			</div>
			<div class="mui-slider-indicator">
				<div class="mui-indicator mui-active"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
			</div>
		</div>
	    <div id="divMenu">
        	<ul class="shye_ul">
		    	<li class="cf">
		        	<a href="javascript:;" class="cf"  @tap="goPage('home/nursery-stock','QueryStock_001')">
		            	<img src="../../assets/images/j29.png"  class="img1"/>
		                <span><b>库房盘点</b><i>Warehouse<br/>inventory</i></span>
		                <img src="../../assets/images/j22.png" class="img2"/>
		            </a>
		            <a href="javascript:;" class="cf"  @tap="goPage('home/traceability','QueryStock_005')">
		            	<img src="../../assets/images/j29.png" class="img1"/>
		                <span><b>疫苗溯源</b><i> registered</i></span>
		                <img src="../../assets/images/j23.png" class="img2"/>
		            </a>
		        </li>
		        <li class="cf">
		        	<a href="javascript:;" class="cf"  @tap="goPage('home/out-stock','Stock_005')">
		            	<img src="../../assets/images/j29.png" class="img1"/>
		                <span><b>出库</b><i>outbound</i></span>
		                <img src="../../assets/images/j24.png" class="img2"/>
		            </a>
		            <a href="javascript:;" class="cf"  @tap="goPage('home/in-stock','Stock_002')">
		            	<img src="../../assets/images/j29.png" class="img1"/>
		                <span><b>入库</b><i> Put in<br/>storage</i></span>
		                <img src="../../assets/images/j25.png" class="img2"/>
		            </a>
		        </li>
		        <li class="cf">
		        	<a href="javascript:;" class="cf" @tap="goPage('home/vehicleline','Monitor_004')">
		            	<img src="../../assets/images/j29.png" class="img1"/>
		                <span><b>运输监控</b><i>Transportation</i></span>
		                <img src="../../assets/images/j26.png" class="img2"/>
		            </a>
		            <a href="javascript:;" class="cf" @tap="goPage('home/cold-chain','Monitor_003')">
		            	<img src="../../assets/images/j29.png" class="img1"/>
		                <span><b>冷链监控</b><i>Cold chain<br/>monitoring</i></span>
		                <img src="../../assets/images/j27.png" class="img2"/>
		            </a>
		        </li>

		    </ul>
        </div>
	</div>
</template>

<script>
	export default {
    	name: 'page-home-tab',
        data() {
			return {

			}
		},
		mounted(){
			//获得slider插件对象
			var gallery = mui('.mui-slider');
			

			gallery.slider({ interval:2000 });
		},
		methods : {
           	goPage( url,obj ) {


           		this.$parent.goPage( url , obj )
           	}
		}
    }
</script>

<style scoped src="@/assets/css/home">
</style>