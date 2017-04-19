<template>
	<div class="midden-tab seedlings-page">
	 	<div id="slider" class="mui-slider mui-fullscreen">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a class="mui-control-item mui-active" href="#item1mobile">
						一类疫苗
					</a>
					<a class="mui-control-item" href="#item2mobile">
						二类疫苗
					</a>
					<a class="mui-control-item" href="#item3mobile">
						全部疫苗
					</a>
				</div>
			</div>
			<div class="mui-slider-group">
				<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
					<div id="scroll1" class="mui-scroll-wrapper">
						<div class="mui-scroll">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell" v-for="item in items">
									{{item.VaccineName}}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div id="item2mobile" class="mui-slider-item mui-control-content">
					<div class="mui-scroll-wrapper">
						<div class="mui-scroll">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell" v-for="(item,i) in items">
									二类疫苗{{i}}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div id="item3mobile" class="mui-slider-item mui-control-content">
					<div class="mui-scroll-wrapper">
						<div class="mui-scroll">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell" v-for="(item,i) in items">
									全部疫苗{{i}}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div> 
	</div>
</template>
<script>
	export default {
		name : 'page-seedlings',
		data(){
			return {
				items : []
			}
		},
		mounted() {
			this.initScroll()
		},
		methods : {
			initScroll(){
				let _self = this;
				mui('.seedlings-page .mui-slider').slider();
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
											_self.getSeedlingData(1,index,self,"down")
										}, 1000);
									}
								},
								up: {
									auto: true,
									callback: function() {
										var self = this;
										setTimeout(function() {
											let length = self.element.querySelector('.mui-table-view').querySelectorAll('li').length;
											_self.getSeedlingData(length==0?1:length,index,self,"up")
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
			},
			getSeedlingData(page,index,obj,type){
				let _self = this;
				mui.ajax({
	                type: "POST",
	                contentType:"application/json; charset=utf-8",
	                url : localStorage.getItem("http"),
	                data: {
		        	 	strRequest:'{\
		        	 		"Request":{\
		        	 			"Header":{\
		            	 			"AppCode":"01",\
		            	 			"AppTypeCode":"01",\
		            	 			"FunCode":"0002",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"Page":'+page+',\
		            	 			"PageSize":10,\
		            	 			"type" : '+index+',\
		            	 			"Status":1\
		            	 		}\
		            	 	}\
		        	 	}',
		        	 	RequestFormat:2
		        	},
	                dataType:'json',
	                success:function(result){
	                	let req = JSON.parse(result.d)
	                	if(req.Response.Header.ResultCode=="1"){
	                		mui.toast(req.Response.Header.ResultMsg)           	
	                	}else{
	                		let items = req.Response.Body.Items;
	                		if(items){
	                			let item = items.Item;
		                		if(!(item instanceof Array)){
		                			_self.items.push( item )
		                		}else{
		                			_self.items = item
		                		}

		                		if(type == "up"){
		                			obj.endPullUpToRefresh(item.length<=10)	
		                		}else{
		                			obj.endPullDownToRefresh();
		                		}
	                		}else{
	                			if(type == "up"){
	                				obj.endPullUpToRefresh(true)	
	                			}else{
	                				obj.endPullDownToRefresh();
	                			}
	                		}
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						alert(type);
					}
	            });
			}
		}
	}
</script>
<style src="@/assets/css/pull"></style>