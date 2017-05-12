<template>
	<transition name="move">
		<div class="page-nursery">
			<v-header :headerObj="headerObj"></v-header>
			<div class="nursery-content" v-show="hasData">
				<div class="flex">
					<span class="flex-items flex-1" style="width:100%;padding:11px 0;"><i></i><b>库房疫苗信息</b></span>
					<!-- <span class="flex-items flex-2">查看全部</span> -->
				</div>
				<div class="flex-items-wrap">
					<div class="box">
						<div class="flex">
							<span class="flex-items stock-list-item"  @tap="switchTab($event,stock)" v-for="(stock,index) in stockList" :class="{active:index==0}">
								{{stock.ColdStoreName}}
							</span>
						</div>	
					</div>
				</div>
				<div class="pop-content">
					<ul class="mui-table-view"  >
			        	<li class="mui-table-view-cell text-l"  v-for="(item,index)  in items" @click="toDetail(item.VaccineCode)">
				          	<i class="circular"></i><span>{{item.VaccineName}}</span>
				          	<span class="fl-r">{{item.Number}}</span>
			          	</li>
			            <li class="mui-table-view-cell text-l"  v-if="items.length==0">
			            	<span class="gray">没有数据</span>
			            </li>
			        </ul>
				</div>
			</div>

			<div v-if="noData" style="position:absolute;top:75px;left:0;right:0;bottom:0;z-index:10;background:#303f7a;">
				<div class="ds-table">
					<div class="ds-tell"><span class="mui-spinner"></span></div>
				</div>
			</div>

			<router-view></router-view>	
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
				currentColdName : '',
				noData : true,
				hasData : false,
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
                			_self.currentColdNo = _self.stockList[0].ColdStoreNo
                			_self.currentColdName = _self.stockList[0].ColdStoreName
					        _self.getAccin( _self.stockList[0].ColdStoreNo )
					        setTimeout(function(){
								_self.noData = false
								_self.hasData = true
					        },200)
					    })
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					mui.toast( type );
				}
            }); 
		},
		methods: {
			switchTab(e,stock) {
				let _self = this;
				if( _self.currentColdNo == stock.ColdStoreNo )return;
				_self.currentColdNo = stock.ColdStoreNo;
				_self.currentColdName = stock.ColdStoreName;
				let flexItems = mui(".stock-list-item")
				for( let i=0; i<flexItems.length; i++ ){
					flexItems[i].className = "flex-items stock-list-item"
				}
				e.target.className = "flex-items stock-list-item active"

				_self.getAccin(stock.ColdStoreNo)
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
	                			console.log(vaccine)
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
						mui.toast( type );
					}
	            }); 
			},
			toDetail( vaccineCode ) {
				var coldNo = this.currentColdNo;
				var coldName = this.currentColdName;
				this.$router.push({
					path  : "/home/nursery-stock/stock-detail",
					query : {
						coldNo : coldNo,
						coldName : coldName,
						vaccineCode : vaccineCode
					}
				})
			}
		}
    }
</script>
<style scoped="scoped" src="@/assets/css/inoculation/nursery-stock"></style>