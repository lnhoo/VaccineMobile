<template>
  <div id="app">
    <router-view class="animated" transition="bounce"></router-view>
  </div>
</template>
<script>
	export default {
	  	name: 'app',
	  	transitions: {
		    bounce: {
		      	enterClass: 'bounceInLeft',
		      	leaveClass: 'bounceOutRight'
		    }
		}
	}
</script>

<style>
	
</style>
