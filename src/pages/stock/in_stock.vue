<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="stock-detail">
			<v-header :headerName="headerName"></v-header>
			<div class="stock-detail-content">
				<div class="grzx">
					<div class="grzx_top cf">
			        	<span><img src="../../assets/images/login.jpg"></span>
			            <i>
			            	<a href="javascript:;" class="open">入库</a>
			            	<a href="javascript:;" @click="outStock">出库</a>
			            </i>
			        </div>
			        <div class="grzx_bottom">
			        	<i>出库单号</i>
			            <b>CM56133</b>
			        </div>	
				</div>
				<div class="mui-card">
			        <ul class="mui-table-view">
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j8.png" class="apply-icon"/>疫苗名称
			            	<span class="fl-r">流感抗体疫苗</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j9.png" class="apply-icon"/>确认入库日期 
			            	<span class="fl-r">2017-04-01</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j10.png" class="apply-icon"/>确认入库人姓名 
			            	<span class="fl-r">xxxxxxx单位</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j11.png" class="apply-icon"/>有效期 
			            	<span class="fl-r">2017-04-01</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j12.png" class="apply-icon"/>实际入库数量
			            	<span class="fl-r">30(箱)</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j13.png" class="apply-icon"/>批次号
			            	<span class="fl-r">4</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j14.png" class="apply-icon"/>批签发合格证明编号
			            	<span class="fl-r">医疗运输车</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j15.png" class="apply-icon"/>运输车辆
			            	<span class="fl-r">湘A-ob4345</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j16.png" class="apply-icon"/>车牌号
			            	<span class="fl-r">张某某</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j16.png" class="apply-icon"/>司机姓名
			            	<span class="fl-r">56</span>
			            </li>
			        </ul>
			    </div>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import Header from '@/pages/layout/header'
	export default {
		name :'stock-detail',
		components:{
			"v-header" : Header
		},
		data() {
			return {
				headerName : '入库'	
			}
		},
		methods : {
			leave() {
				this.$parent.homeRouter = false
			},
			outStock() {
				this.$router.push('/home/out-stock')
			}
		}
	}
</script>
<style scoped src="@/assets/css/stock/stock-detail">
	
</style>
