<template>
	<div class="mine-page">
		<ul class="mui-table-view">
			<li class="mui-table-view-cell" v-for="(car,index) in carList">
				{{car.PlateNo}}
				<span style="float:right" class="gray" v-if="car.Status==2" @click="startYS(car.VehicleID,index)">运输中</span>
				<span style="float:right" v-if="car.Status==1" @click="startYS(car.VehicleID,index)">待运输</span>
				<span style="float:right" v-if="car.Status==0">装车未完成</span>
			</li>
		</ul>
	</div>
</template>
<script>
  	export default {
  		name : 'page-mine',
	    data() {
	      	return {
	      		idx : 1,
	      		carList : []
	      	}
	    },
	    mounted() {
			// this.initData()
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
	                		mui.toast(req.Response.Header.ResultMsg)           	
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
	    	startYS( vehicleID,idx ) {
	    		this.idx = idx;
	    		this.$router.push({
	    			path : '/home/actionSheet',
	    			query:{
	    				arr    : ["开始运输"],
	    				vehicleID : vehicleID
	    			}
	    		})
	    	},
	    	updateData(){
	    		let _self = this;
	    		let newData = this.carList[this.idx];
	    		newData.Status = 2;
	    		this.$set(this.carList[this.idx],newData);
	    		_self.$nextTick(() => {
	    			_self.$parent.openLocation(newData.VehicleID);
			    })
	    	}
	    }
	}
</script>

<style>
	.mine-page{
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
	.aaaas{
		height: 100%;
		width: 100%;
	}
</style>