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
				<label>最高温度:</label><input type="number"  v-model="params.MaxTemperature"/>
				<label>最低温度:</label><input type="number"  v-model="params.MinTemperature"/>
				<label>最高湿度:</label><input type="number"  v-model="params.MaxHumidity"/>
				<label>最低湿度:</label><input type="number"  v-model="params.MinHumidity"/>
				<!-- <ul class="mui-table-view mui-table-view-radio">
					<li class="mui-table-view-cell" status="1">
						<a class="mui-navigate-right">停止运输</a>
					</li>
					<li class="mui-table-view-cell mui-selected" status="2">
						<a class="mui-navigate-right">开始运输</a>
					</li>
				</ul> -->
				<button type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" @click="toSubmit">提交</button>
			</div>
		</div>
	</div>
</template>
<script>
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
				showForm : false
			}
		},
		mounted() {
			this.items = this.$route.query.arr;
			/*setTimeout(function(){
				document.querySelector('.mui-table-view.mui-table-view-radio').addEventListener('selected',function(e){
					console.log(e.detail.el.innerText);
				});
			},2000);*/
		},
		methods :{
			cancel() {
				this.$router.go(-1)
			},
			dealData(item,index) {
				this.showForm = true;
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
	                	 			"Status" : "2",\
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

<style>
	.actionSheet-ui{
		height: 100%;
		width: 100%;
	}
	.actionSheet-ui .mask{
		position: absolute;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.4;
	}
	.actionSheet-ui .actionSheet{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		text-align: center;
	}
	.actionSheet-ui .popMsg{
		position: absolute;
		height: 100%;
		width: 100%;
		background: transparent;
		z-index: 11;
	}
	.actionSheet-ui .popMsgBox{
		padding: 20px;
		border-radius: 4px;
		position: absolute;
		width: 90%;
		height: 420px;
		background: #fff;
		left: 5%;
		top: 50%;
		margin-top : -210px;
		overflow-y : auto; 
	}
	.actionSheet-ui .popMsgBox label{
		font-size: 12px;
		margin-bottom: 5px;
		color: #000;
	}
	.actionSheet-ui .mui-btn-primary{
		padding: 8px 10px;
	}
	.actionSheet-ui .mui-table-view-cell{
		font-size: 12px;
	}
</style>