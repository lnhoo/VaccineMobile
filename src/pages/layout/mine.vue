<template>
	<div class="page-mine midden-tab">
		<scroller style="top: 0,bottom:45px;"
              :on-refresh="refresh"
              :on-infinite="infinite"
              ref="my_scroller">
	      	<div v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">
	        	{{ item }}
	      	</div>
    	</scroller>
	</div>
</template>

<script>
	import Scroller from 'vue-scroller'
  	export default {
  		name : 'page-mine',
	    components: {
	     	Scroller
	    },
	    data() {
	      	return {
	        	items : [],
	        	count : 0
	      	}
	    },
	    mounted() {
	    	for (var i = 1; i <= 20; i++) {
	        	this.items.push(i + ' - keep walking, be 2 with you.');
	    	}
	      	this.top = 1;
	      	this.bottom = 20;
	      	setTimeout(() => {
	        	this.$refs.my_scroller.resize();
	      	},2000)
	    },
	    methods: {
		    refresh() {
		    	alert(77);
		        setTimeout(() => {
		          var start = this.top - 1
		          for (var i = start; i > start - 10; i--) {
		            this.items.splice(0, 0, i + ' - keep walking, be 2 with you.');
		          }
		          this.top = this.top - 10;
		          if (this.$refs.my_scroller)
		            this.$refs.my_scroller.finishPullToRefresh();
		        }, 1500)
		    },
	      	infinite() {
		       setTimeout(() => {

		       		if(this.count<4){
		       			var start = this.bottom + 1;
			          	for (var i = start; i < start + 10; i++) {
			            	this.items.push(i + ' - mine');
			          	}
			          	this.bottom = this.bottom + 10;
			         	setTimeout(() => {
			            	if (this.$refs.my_scroller){
			            		this.$refs.my_scroller.finishInfinite(true);
			            		this.count++;
			            	}
			          	})
		       		}else{
		       			this.$refs.my_scroller.finishInfinite(true);
		       		}
		          	
		        }, 2500)
		    }
	    }
	}
</script>

<style>
  	.row {
	    width: 100%;
	    height: 50px;
	    padding: 10px 0;
	    font-size: 16px;
	    line-height: 30px;
	    text-align: center;
	    color: #444;
	    background-color: #fff;
	 }
  	.grey-bg {
    	background-color: #eee;
  	}
</style>