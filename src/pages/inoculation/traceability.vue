<template>
	<transition name="move">
		<div class="page-child-info">
			<v-header :headerObj="headerObj"></v-header>
			<div class="child-info-box">
				<p class="tabs">
					<a href="javascript:;" class="items active">儿童信息</a>
					<a href="javascript:;" class="items" @click="vaccineDetail">育苗信息</a>
				</p>
				<div class="pop-wrap">
					<div class="inner-box">
						<ul class="mui-table-view">
				            <li class="mui-table-view-cell text-l">
				            	姓名<span class="fl-r">刘某某</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	性别<span class="fl-r">女</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	接种编号<span class="fl-r">sw0345</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	出生日期<span class="fl-r">2017-04-01</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	接种日期<span class="fl-r">2017-04-01</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	接种部位<span class="fl-r">左手臂</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	接种点<span class="fl-r">8:00</span>
				            </li>
				            <li class="mui-table-view-cell text-l">
				            	接种医生<span class="fl-r">齐医生</span>
				            </li>
				        </ul>
					</div>
				</div>
			</div>
			<transition name="silder">
				<v-detail v-show="detail"></v-detail>
			</transition>
		</div>
	</transition>
</template>
<script>
	import header from '@/pages/layout/header'
	import vaccineDetail from '@/pages/inoculation/vaccine_detail'
	export default {
		name:"page-child-info",
		components :{
    		'v-header' : header,
    		'v-detail' : vaccineDetail
    	},
		data() {
			return {
				headerObj :{
					title:'疫苗溯源',
					hasBack : true
				},
				detail : false
			}
		},
		mounted(){
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
                		console.log(req)
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					mui.toast(type);
				}
            });
		},
		methods:{
			vaccineDetail(){
				this.detail = true
			}
		}
	}
</script>
<style scoped="scoped" src="@/assets/css/inoculation/child-info"></style>