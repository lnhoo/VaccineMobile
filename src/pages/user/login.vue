<template>
	<div class="page-login">
		<div class="top-icon">
			<div class="img-wrap">
				<img src="../../assets/images/login.png" class="login-icon"/>	
			</div>
		</div>
		<div class="login-frm">
			<input type="text" class="mui-input-clear user-name" v-model="UserNo" placeholder="输入用户名">
			<input type="password" class="mui-input-clear password" v-model="UserPwd"  placeholder="输入密码">
			<button type="button" class="mui-btn mui-btn-primary login-btn" @click="login">登录</button>
			<div class="message"><a href="javascript:;" @click="forgetPwd">忘记密码?</a></div>
		</div>
	</div>
</template>
<script>
	require('@/assets/js/d9')
	let md5 = require("@/assets/js/md5")
	import '@/assets/scss/login'
    export default {
    	name: 'page-login',
        data() {
			return {
				'UserNo' : 'Manager',
				'UserPwd' : '123456'
			}
		},
		mounted(){
			//localStorage.setItem("http","http://61.189.37.57:10004/WebService.asmx/CallFun");
			localStorage.setItem("http","http://114.55.90.253:10999/WebService.asmx/CallFun");
		},
		methods: {
           	login (){
           		let _self = this;
           		plus.nativeUI.showWaiting( "登录中..." );
           		mui.ajax({
	                type: "POST",
	                contentType:"application/json; charset=utf-8",
	                url : localStorage.getItem("http"),
	                data:{
                	 strRequest:'{\
                	 	"Request":{\
                	 		"Header":{\
                	 			"AppCode":"01",\
                	 			"FunCode":"0001",\
                	 			"ResponseFormat":"2"\
                	 		},"Body":{\
                	 			"UserNo":"'+this.UserNo+'",\
                	 			"UserPwd":"'+md5(this.UserPwd)+'"\
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
	                		console.log(JSON.parse(result.d))
	                		let item = req.Response.Body.Items.Item;
	                		let codeList = [];
	                		for(var i = 0 ;i < item.length; i++){
	                			codeList.push(item[i].ResourceCode)
	                		}
	                		let data = req.Response.Body;
	                		// 组织机构代码
	                		localStorage.setItem("customerCode",data.CustomerCode);

	                		localStorage.setItem("customerName",data.CustomerName);

	                		localStorage.setItem("userName",data.UserName);

	                		localStorage.setItem("account",_self.UserNo);

	                		localStorage.setItem("userId",data.UserID);
	                		// 权限列表
	                		localStorage.setItem("codeList",JSON.stringify(codeList));
	                		
	                		_self.$router.push({ name: 'home'})
	                		//plus.nativeUI.closeWaiting();
	                		
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast(type);
					}
	            })
           	},
           	forgetPwd(){
           		mui.toast("忘记密码");
           	}
		}
    }
</script>
<style scoped></style>