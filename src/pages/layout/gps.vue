<template>
	<div class="gps">
		<ul class="mui-table-view" v-if="carList.length>0">
			<li class="mui-table-view-cell" v-for="(car,index) in carList" @click="startYS(car.VehicleID,index,car.Status)">
				{{car.PlateNo}}
				<span style="float:right" class="gray" v-if="car.Status==2" >运输中</span>
				<span style="float:right" v-if="car.Status==1">待运输</span>
				<span style="float:right" v-if="car.Status==0">装车未完成</span>
			</li>
		</ul>

		<div class="no-data-msg" v-if="carList.length==0">
			<div class="ds-table">
				<div class="ds-tell">{{message}}<span v-if="!message" class="mui-spinner"></span></div>
			</div>
		</div>
	</div>
</template>
<script>
  	export default {
  		name : 'page-mine',
	    data() {
	      	return {
	      		idx : 1,
	      		sts : 0,
	      		carList : [],
	      		message : ''
	      	}
	    },
	    mounted() {
			this.getMineCarList()
	    },
	    methods:{
	    	getMineCarList(){
	    		let _self = this;
	    		mui.ajax({
	                type: "POST",
	                contentType:"application/json; charset=utf-8",
	                url : localStorage.getItem("http"),
	                data:{
	            	 	strRequest:'{\
	            	 		"Request":{\
	            	 			"Header":{\
	                	 			"AppCode":"01",\
	                	 			"AppTypeCode":"01",\
	                	 			"FunCode":"0021",\
	                	 			"ResponseFormat":"2"\
	                	 		},"Body":{\
	                	 			"UserID":"'+localStorage.getItem("userId")+'"\
	                	 		}\
	                	 	}\
	            	 	}',
	            	 	RequestFormat:2
	            	},
	                dataType:'json',
	                success:function(result){
	                	let req = JSON.parse(result.d)
	                	if(req.Response.Header.ResultCode=="1"){
	                		_self.message = req.Response.Header.ResultMsg;           	
	                	}else{
	                		let items = req.Response.Body.Items;
	                		console.log(items)
	                		if(items){
	                			let carList = items.Item
		                		if(!(carList instanceof Array)){
		                			_self.carList.push( carList )
		                		}else{
		                			_self.carList = carList
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
	    	startYS( vehicleID,idx,status ) {
	    		var _self = this;
	    		this.sts = status;
	    		this.idx = idx;
	    		status = status=='2'?"上传当前位置":"开始运输";
	    		this.$router.push({
	    			path : '/home/actionSheet',
	    			query:{
	    				arr    : [status,"完成运输"],
	    				vehicleID : vehicleID
	    			}
	    		})	
	    	},
	    	updateData(){
	    		let _self = this;
	    		let newData = this.carList[this.idx];
	    		newData.Status = _self.sts;
	    		this.$set(this.carList[this.idx],newData);
	    		_self.$nextTick(() => {
	    			_self.$parent.openLocation(newData.VehicleID);
			    })
	    	}
	    }
	}
</script>

<style>
	.gps{
		position: fixed;
		top: 75px;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.box{
		height: 100%;
		width: 100%;
	}
	.gps .no-data-msg{
		top:0;
	}
</style>