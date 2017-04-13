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
    export default {
    	name: 'page-login',
        data() {
			return {
				'UserNo' : '',
				'UserPwd' : ''
			}
		},
		mounted(){
			
		},
		methods: {
           	login (){
           		var ajaxData = {
				  	"Request": {
				    	"Header": {
						    "FunCode": "0001",
						    "ResponseFormat": "2"
				    	},
					    "Body": {
					      	"UserNo": this.UserNo,
					      	"UserPwd": this.UserPwd
					    }
				  	}
				}

           		mui.ajax({
	                type: "POST",
	                contentType:"application/json; charset=utf-8",
	                url :"http://192.168.1.104:8393/WebService.asmx/CallFun",
	                data :ajaxData,
	                dataType:'json',
	                success:function(result){                   
	                    console.log(result); 
	                    console.log(result.d);
	                    console.log(JSON.parse(result.d));
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						alert(type);
					}
	            }); 
           	},
           	forgetPwd(){
           		mui.toast("忘记密码");
           	}
		}
    }
</script>

<style scoped src="@/assets/css/login"></style>