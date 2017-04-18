<template>
	<div class="page-seedlings midden-tab">
		<div style="padding: 10px 10px;">
			<div id="segmentedControl" class="mui-segmented-control">
				<a class="mui-control-item mui-active" href="#item1">种类一</a>
				<a class="mui-control-item" href="#item2">种类二</a>
			</div>
		</div>
		<div>
			<div id="item1" class="mui-control-content mui-active">
				<div id="scroll" class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell" v-for="item in items">
								{{item.VaccineName}}
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div id="item2" class="mui-control-content">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" v-for="(item,i) in items">
						种类2-{{i}}
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
			return {
				items : []
			}
		},
		mounted(){
			mui('#scroll').scroll({
				indicators: true //是否显示滚动条
			});
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
	            	 			"Page":1,\
	            	 			"PageSize":10,\
	            	 			"type" : 2,\
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
                		console.log(req);
                		let items = req.Response.Body.Items.Item
                		if(!(items instanceof Array)){
                			_self.items.push( items )
                		}else{
                			_self.items = items
                		}
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					alert(type);
				}
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
	
	.mui-card .mui-control-content {
		padding: 10px;
	}
	
	.mui-control-content {
		position: absolute;
		top:60px;
		bottom: 0;
		width: 100%;
		left:0;
	}
</style>