<template>
	<transition name="move"  v-on:after-leave="leave">
		<div class="page-nursery">
			<v-header :headerObj="headerObj"></v-header>
			<div class="nursery-content">
				<div class="flex">
					<span class="flex-items flex-1"><i></i><b>库房育苗信息</b></span>
					<span class="flex-items flex-2">查看全部</span>
				</div>
				<div class="flex-items-wrap">
					<div class="stock-list-item"  @tap="switchTab($event,stock.ColdStoreNo)" v-for="(stock,index) in stockList" :class="{active:index==0}">
						{{stock.ColdStoreName}}
					</div>
				</div>
				<div class="pop-content">
					<ul class="mui-table-view">
			            <li class="mui-table-view-cell text-l"  v-for="(item,index)  in items">
			            	<i class="circular"></i><span>{{item.VaccineName}}</span>
			            	<span class="fl-r">{{item.Number}}</span>
			            </li>

			            <li class="mui-table-view-cell text-l" v-if="items.length==0">
			            	没有育苗数据
			            </li>

			        </ul>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import header from '@/pages/layout/header'
    export default {
    	name: 'page-login',
    	components :{
    		'v-header' : header
    	},
        data() {
			return {
				headerObj :{
					title:'库房盘点',
					hasBack : true
				}, 
				stockList : [],
				currentColdNo : '',
				items : []
			}
		},
		mounted(){
			//console.log(this.$route.params.id)
			let _self = this;
			// 获取库存列表
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
                	 			"FunCode":"0004",\
                	 			"ResponseFormat":"2"\
                	 		},"Body":{\
                	 			"CustomerCode":"'+localStorage.getItem("customerCode")+'",\
                	 			"Page":"1",\
                	 			"PageSize":"10",\
                	 			"Status":"1"\
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
                		_self.stockList = req.Response.Body.Items.Item.reverse()

                		_self.$nextTick(() => {
					        _self.getAccin(_self.stockList[0].ColdStoreNo)
					    })
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					alert(type);
				}
            }); 
		},
		methods: {
           	leave() {
				this.$parent.homeRouter = false
			},
			switchTab(e,coldStoreNo) {
				let _self = this;
				if( _self.currentColdNo == coldStoreNo )return;
				_self.currentColdNo = coldStoreNo;
				let flexItems = mui(".stock-list-item")
				for( let i=0; i<flexItems.length; i++ ){
					flexItems[i].className = "stock-list-item"
				}
				e.target.className = "stock-list-item active"
				_self.getAccin(coldStoreNo)
			},
			getAccin(coldStoreNo){
				let _self = this;
				mui.ajax({
	                type: "POST",
	                contentType:"application/json; charset=utf-8",
	                url : localStorage.getItem("http"),
	                data:{
	            	 	strRequest:'{"Request":{"Header":{"AppCode":"01",\
	                	 			"AppTypeCode":"01",\
	                	 			"FunCode":"0008",\
	                	 			"ResponseFormat":"2"\
	                	 		},"Body":{\
	                	 			"ColdNo":"'+coldStoreNo+'"\
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
	                		_self.items = []
	                		if(req.Response.Body.Items){
	                			var vaccine = req.Response.Body.Items.Item
	                			if(!(vaccine instanceof Array)){
		                			_self.items.push( vaccine )
		                		}else{
		                			_self.items = vaccine
		                		}
	                		}
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						alert(type);
					}
	            }); 
			}
		}
    }
</script>
<style scoped="scoped" src="@/assets/css/inoculation/nursery-stock"></style>