<template>
	<div class="page-login">
		<div class="top-icon">
			<div class="img-wrap">
				<img src="../../assets/images/login.png" class="login-icon"/>	
			</div>
		</div>
		<div class="login-frm">
			<input type="text" class="mui-input-clear user-name" v-model="userName" placeholder="用户名">
			<input type="password" class="mui-input-clear password" v-model="password"  placeholder="密码">
			<button type="button" class="mui-btn mui-btn-primary mui-btn-block login-btn" @click="login">登陆</button>
			<div class="message"><a href="javascript:;" @click="forgetPwd">忘记密码?</a></div>
		</div>
	</div>
</template>
<script>
    export default {
    	name: 'page-login',
        data() {
			return {
				'userName' : 'admin',
				'password' : 'admin'
			}
		},
		mounted(){
			
		},
		methods: {
           	login (){
           		this.$router.push('/home');
           	},
           	forgetPwd(){
           		mui.toast("忘记密码");
           	}
		}
    }
</script>

<style scoped src="@/assets/css/login">
	
</style>