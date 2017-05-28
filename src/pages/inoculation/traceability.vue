<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="page-vaccine-detail">
			<v-header :headerObj="headerObj"></v-header>
		 	<div class="vaccine-detail" v-if="detailList.length>0">
				<section class="main" style="position:relative;">
					<div class="wuza1 cf">
				    	<i><img src="../../assets/images/b34.png">{{orderObj.VaccineName}}</i>
				    </div>
				    <p class="title">{{orderObj.QRCodeValue}}</p>
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
	import '@/assets/scss/traceability'
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
	            	 			"CodeValue":"'+_self.$route.query.codeValue+'"\
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
	
</style>