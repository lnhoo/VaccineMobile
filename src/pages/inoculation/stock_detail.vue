<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="page-child-info">
			<v-header :headerObj="headerObj"></v-header>
			<div class="child-info-box">
				<!-- <ul class="mui-table-view">
					<li class="mui-table-view-cell" v-for="item in items">
						<p>{{item.BatchNo}}</p>
						<p>{{item.ManufactureName}}</p>
						<p>{{item.Number}}</p>
						<p>{{item.ShelfLife}}</p>
						<p>{{item.VaccineCode}}</p>
						<p>{{item.VaccineName}}</p>
					</li>
				</ul> -->
				<div class="xjyem">
			    	<table v-for="item in items">
			    		<tr>
			    			<td><em>•</em>批号<br><span class="font-color">{{item.BatchNo}}</span></td>
			    			<td class="left-border">有效期<br>
			    				<span class="font-color">{{item.ShelfLife}}</span>
			    				<br>所在库房
			    				<br>{{coldName}}
			    			</td>
			    			<td>库存量<br>
			    				<span class="font-color">4000</span><br>
			    			</td>
			    		</tr>
			    	</table>
			    </div>
			    <div class="no-data-msg" v-if="items.length==0">
					<div class="ds-table">
						<div class="ds-tell">无数据</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import header from '@/pages/layout/header'
	export default {
		name:"page-child-info",
		components :{
    		'v-header' : header
    	},
		data() {
			return {
				headerObj :{
					title   : '库存列表',
					hasBack : true
				},
				items : [],
				coldName : ''
			}
		},
		mounted(){
			let _self = this;
			let coldNo = this.$route.query.coldNo;
			let vaccineCode = this.$route.query.vaccineCode;
			_self.coldName = this.$route.query.coldName;
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
                	 			"FunCode":"0019",\
                	 			"ResponseFormat":"2"\
                	 		},"Body":{\
                	 			"ColdStoreNo":"'+coldNo+'",\
                	 			"VaccineCode":"'+vaccineCode+'"\
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
                		var items = req.Response.Body.Items.Item;
                		console.log(items)
                		if(!(items instanceof Array)){
                			_self.items.push( items )
                		}else{
                			_self.items = items
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
			leave() {
				this.$parent.homeRouter = false
			}
		}
	}
</script>
<style scoped="scoped">
	.page-child-info{
		position: absolute;
		height: 100%;
		width: 100%;
		background: #303f7a;
		top: 0;
		left: 0;
		-webkit-transition:all .3s ease;
    	transition:all .3s ease;
	}
	.child-info-box{
		position: fixed;
		top:75px;
		left:0;
		right:0;
		bottom: 0;
		z-index: 9999;
		background: #4553a1;
	}
    .page-child-info .no-data-msg{
		top:0;
	}
</style>