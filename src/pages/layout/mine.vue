<template>
	<div class="page-child-info">
		<div class="child-info-box">
				<ul class="mui-table-view">
					<br>
		            <li class="mui-table-view-cell">
		            	登录账户<span class="fl-r">{{mineInfo.account}}</span>
		            </li> 
		            <li class="mui-table-view-cell">
		            	用户编号<span class="fl-r">{{mineInfo.userId}}</span>
		            </li>
		            <li class="mui-table-view-cell">
		            	用户名称<span class="fl-r">{{mineInfo.userName}}</span>
		            </li>
		            <li class="mui-table-view-cell text-l">
		            	机构名称<span class="fl-r">{{mineInfo.customerName}}</span>
		            </li>

		             <li class="mui-table-view-cell text-l">
		            	当前日期<span class="fl-r">{{dateStr}}</span>
		            </li>
		        </ul>
		        <br>
		        <br>
		        <br>
		        <p style="padding:0 5%;">
		        	<button type="button" class="mui-btn mui-btn-danger add-packing-btn"  @click="logout()">退出登录</button>	
		        </p>
		</div>
	</div>
</template>
<script>
	import '@/assets/scss/mine'
	export default {
		name:"page-child-info",
		data() {
			return {
				mineInfo : {
					userId : localStorage.getItem("userId"),
					userName : localStorage.getItem("userName"),
					customerCode : localStorage.getItem("customerCode"),
					customerName : localStorage.getItem("customerName"),
					account : localStorage.getItem("account")
				},
				dateStr : ""
			}
		},
		mounted(){
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
			if(month.length<10){
				month = "0"+month;
			}
			this.dateStr = year +"年"+ month +"月"+ day+"日";
		},
		methods:{
			logout(){
				localStorage.clear();
				this.$router.push({path:"/"})
			}
		}
	}
</script>
<style scoped></style>