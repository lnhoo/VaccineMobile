<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="page-vaccine-detail">
			<v-header :headerObj="headerObj"></v-header>
			<div class="vaccine-detail" v-if="detailList.length>0">
				<section class="main" style="position:relative;">
					<div class="wuza1 cf">
				    	<i><img src="../../assets/images/b34.png">{{orderObj.QRCodeValue}}</i>
				        <span>&nbsp;&nbsp;{{orderObj.VaccineName}}</span>
				    </div>
				    
				    <div class="wuza2">
				    	<div v-for="(item,index) in detailList">
					    	<div class="wuza2_a">
					    	<h3>{{item.Status}}<label class="fl-r">{{item.OrgName}}</label></h3>
					        	<span><img src="../../assets/images/b34.png"> {{item.DateTime}}</span>
					        </div>
					        <em v-if="detailList.length-1>index"><img src="../../assets/images/b35.png"></em>	
				    	</div>
				    </div>
				</section>
			</div>	

			<div v-if="detailList.length==0" style="position:absolute;top:75px;left:0;right:0;bottom:0;z-index:10;background:#303f7a;">
				<div class="ds-table">
					<div class="ds-tell">暂无数据</div>
				</div>
			</div>

		</div>
	</transition>
</template>
<script>
	import header from '@/pages/layout/header'
	export default {
		name:"page-vaccine-detail",
		components :{
    		'v-header' : header
    	},
		data() {
			return {
				headerObj :{
					title:'物流追踪',
					hasBack : true
				},
				detailList : [],
				orderObj : {}
			}
		},
		mounted(){
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
	            	 			"FunCode":"0020",\
	            	 			"ResponseFormat":"2"\
	            	 		},"Body":{\
	            	 			"CodeValue":"LN201705091115102"\
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
                		let items = req.Response.Items;
                		console.log(req)
                		if(items){
                			let item = items.Item
                			_self.orderObj.QRCodeValue = req.Response.QRCodeValue
                			_self.orderObj.VaccineName = req.Response.VaccineName
	                		if(!(item instanceof Array)){
	                			_self.detailList.push( item )
	                		}else{
	                			_self.detailList = item
	                		}
                		}
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					mui.toast(type);
				}
            });
		},
		methods:{
			
		}
	}
</script>
<style scoped="scoped">
	.page-vaccine-detail{
		position: absolute;
		width: 100%;
		height: 100%;
		background: #303F7A;
		z-index: 999;
		-webkit-transition:all .6s ease;
		transition:all .6s ease;
	}
	.vaccine-detail{
		position: absolute;
		top: 75px;
		left: 0;
		right:0;
		bottom: 0;
		z-index: 999;
		padding: 10px;
		overflow-y: auto;
		background: url("../../assets/images/b32.png") no-repeat; 
		background-size:100% 100%; 
	}
	.wuza1{ background:url("../../assets/images/b33.png") no-repeat; background-size:100% 100%; position:absolute; left:10px; top:20px; width:50px; padding:25px 5px 25px 15px}
	.wuza1 i{writing-mode:tb-rl; color:#a3a3a3; float:left; display:block; padding:0 4px 0 0}
	.wuza1 i img{ width:15px; height:auto; margin-bottom:4px;}
	.wuza1 span{writing-mode:tb-rl; color:#4096e1; font-size:16px;}
	.wuza2{ padding:50px 0 0 80px;}
	.wuza2 em{ display:block; text-align:center; padding:5px 0}
	.wuza2 em img{ height:30px; width:auto}
	.wuza2_a{ border:1px dashed #4096e1;border-radius:10px; padding:10px;}
	.wuza2_a h3{ font-size:16px; color:#4096e1;}
	.wuza2_a span{color:#a3a3a3; display:block; padding:10px 0; }
	.wuza2_a span img{width:15px; height:auto;margin-top: 5px;float: left;margin-top: 2px;margin-right: 10px;}
	.wuza2_a i{color:#a3a3a3; padding-left:15px;}

</style>