<template>
	<div class="midden-tab seedlings-page">
	 	<div id="slider" class="mui-slider mui-fullscreen">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a class="mui-control-item mui-active" href="#item1mobile">
						全部疫苗
					</a>
					<a class="mui-control-item" href="#item2mobile">
						一类疫苗
					</a>
					<a class="mui-control-item" href="#item3mobile">
						二类疫苗
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
								<li class="mui-table-view-cell" v-for="(item,i) in firstData">
									{{item.VaccineName}}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div id="item3mobile" class="mui-slider-item mui-control-content">
					<div class="mui-scroll-wrapper">
						<div class="mui-scroll">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell" v-for="(item,i) in secondData">
									{{item.VaccineName}}
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
				items : [],
				firstData : [],
				secondData : []
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
					var that = "";
					$.ready(function() {
						var slider = document.querySelectorAll('.mui-slider-group .mui-scroll');
						document.getElementById('slider').addEventListener('slide', function(e) {
							var num = e.detail?e.detail.slideNumber:0;
							$(slider[num]).pullToRefresh({
								down: {
									callback: function() {
										that = this;
										setTimeout(function() {
											_self.getSeedlingData(1,num,that,"down")
										}, 1000);
									}
								},
								up: {
									auto: true,
									callback: function() {
										that = this;
										setTimeout(function() {
											let length = that.element.querySelector('.mui-table-view').querySelectorAll('li').length;
											console.log(length)
											_self.getSeedlingData(length==0?1:length,num,that,"up")
										}, 1000);	
									}
								}
							});	
						});
						setTimeout(function(){
							mui.trigger(slider[0],'slide');
						},2000);
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
		            	 			"Type" : '+index+',\
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
		                			if(index==0){
		                				_self.items.push( item )
		                			}else if(index==1){
		                				_self.firstData.push( item )
		                			}else if(index==2){
		                				_self.secondData.push( item )
		                			}
		                		}else{
		                			if(index==0){
		                				_self.items = item
		                			}else if(index==1){
		                				_self.firstData = item
		                			}else if(index==2){
		                				_self.secondData = item
		                			}
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
						mui.toast(type);
					}
	            });
			}
		}
	}
</script>
<style src="@/assets/css/pull"></style>