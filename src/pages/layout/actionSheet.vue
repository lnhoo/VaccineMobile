<template>
	<div class="actionSheet-ui">
		<div class="mask"></div>
		<ul class="mui-table-view actionSheet">
			<li class="mui-table-view-cell" v-for="(item,index) in items" @click="dealData(item,index)">
				{{item}}
			</li>
			<li  class="mui-table-view-cell" @click="cancel"><b>取消</b></li>
		</ul>
		<div class="popMsg" v-show="showForm">
			<div class="mask" v-show="showForm" @click="closeMask"></div>
			<div class="popMsgBox">
				<label>最高温度:</label><input type="number" maxlength="6" v-model="params.MaxTemperature"/>
				<label>最低温度:</label><input type="number" maxlength="6" v-model="params.MinTemperature"/>
				<label>最高湿度:</label><input type="number" maxlength="6" v-model="params.MaxHumidity"/>
				<label>最低湿度:</label><input type="number" maxlength="6" v-model="params.MinHumidity"/>
				<button type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" @click="toSubmit">提交</button>
			</div>
		</div>
	</div>
</template>
<script>
	import '@/assets/scss/actionSheet'
	export default {
		name : 'actionSheet-ui',
		data(){
			return {
				items :[],
				params : {
					MaxTemperature : 21,
					MinTemperature : 10,
					MaxHumidity : 26,
					MinHumidity : 12
				},
				showForm : false,
				status : 1
			}
		},
		mounted() {
			this.items = this.$route.query.arr;
		},
		methods :{
			cancel() {
				this.$router.go(-1)
			},
			dealData(item,index) {
				this.status = (item=="完成运输"?1:2);
				if(item=="上传当前位置"){
					this.$router.go(-1);
	               	this.$parent.refreMineData();
				}else{
					this.showForm = true;
				}
			},
			closeMask() {
				this.showForm = false;
			},
			toSubmit() {
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
	                	 			"FunCode":"0022",\
	                	 			"ResponseFormat":"2"\
	                	 		},"Body":{\
	                	 			"VehicleID" : "'+_self.$route.query.vehicleID+'",\
	                	 			"Status" : "'+_self.status+'",\
	                	 			"UserID" : "'+localStorage.getItem("userId")+'",\
	                	 			"MaxTemperature" : "'+_self.params.MaxTemperature+'",\
	                	 			"MinTemperature" : "'+_self.params.MinTemperature+'",\
	                	 			"MaxHumidity" : "'+_self.params.MaxHumidity+'",\
	                	 			"MinHumidity" : "'+_self.params.MinHumidity+'"\
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
	                		mui.toast(req.Response.Header.ResultMsg)
	                		_self.$router.go(-1);
	                		_self.$parent.refreMineData();
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
<style scoped></style>