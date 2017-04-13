<template>
	<div class="page-mine midden-tab">
		<div id="scroll1" class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						第1个选项卡子项-1
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-2
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-3
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-4
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-5
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-6
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-7
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-8
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-9
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-10
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-11
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-12
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-13
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-14
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-15
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-16
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-17
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-18
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-19
					</li>
					<li class="mui-table-view-cell">
						第1个选项卡子项-20
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
  	export default {
  		name : 'page-mine',
	    data() {
	      	return {
	        	
	      	}
	    },
	    mounted() {


	    	(function($) {
				//阻尼系数
				var deceleration = mui.os.ios?0.003:0.0009;
				$('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true, //是否显示滚动条
					deceleration:deceleration
				});
				$.ready(function() {
					//循环初始化所有下拉刷新，上拉加载。
					$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
						$(pullRefreshEl).pullToRefresh({
							down: {
								callback: function() {
									var self = this;
									setTimeout(function() {
										var ul = self.element.querySelector('.mui-table-view');
										ul.insertBefore(createFragment(ul, index, 10, true), ul.firstChild);
										self.endPullDownToRefresh();
									}, 1000);
								}
							},
							up: {
								callback: function() {
									var self = this;
									setTimeout(function() {
										var ul = self.element.querySelector('.mui-table-view');
										ul.appendChild(createFragment(ul, index, 5));
										self.endPullUpToRefresh();
									}, 1000);
								}
							}
						});
					});
					var createFragment = function(ul, index, count, reverse) {
						var length = ul.querySelectorAll('li').length;
						var fragment = document.createDocumentFragment();
						var li;
						for (var i = 0; i < count; i++) {
							li = document.createElement('li');
							li.className = 'mui-table-view-cell';
							li.innerHTML = '第' + (index + 1) + '个选项卡子项-' + (length + (reverse ? (count - i) : (i + 1)));
							fragment.appendChild(li);
						}
						return fragment;
					};
				});
			})(mui);




	    	/*
	    	mui('.mui-scroll-wrapper').scroll({
				bounce: false,
				indicators: true//是否显示滚动条
			});

			mui.ready(function() {
				//循环初始化所有下拉刷新，上拉加载。
				mui('.mui-scroll-wrapper').pullToRefresh({
					down: {
						callback: function() {
							var self = this;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								ul.insertBefore(createFragment(ul, index, 10, true), ul.firstChild);
								self.endPullDownToRefresh();
							}, 1000);
						}
					},
					up: {
						callback: function() {
							var self = this;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								ul.appendChild(createFragment(ul, index, 5));
								self.endPullUpToRefresh();
							}, 1000);
						}
					}
				});
				var createFragment = function(ul, index, count, reverse) {
					var length = ul.querySelectorAll('li').length;
					var fragment = document.createDocumentFragment();
					var li;
					for (var i = 0; i < count; i++) {
						li = document.createElement('li');
						li.className = 'mui-table-view-cell';
						li.innerHTML = '第' + (index + 1) + '个选项卡子项-' + (length + (reverse ? (count - i) : (i + 1)));
						fragment.appendChild(li);
					}
					return fragment;
				};
			});
			*/

		

	    },
	    methods: {
		    
	    }
	}
</script>

<style>
  	.row {
	    width: 100%;
	    height: 50px;
	    padding: 10px 0;
	    font-size: 16px;
	    line-height: 30px;
	    text-align: center;
	    color: #444;
	    background-color: #fff;
	 }
  	.grey-bg {
    	background-color: #eee;
  	}
</style>