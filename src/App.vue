<template>
  <div id="app">
    <transition name="fade" mode="out-in">
		<keep-alive>
      <router-view class="view-container"></router-view>
	  	</keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
}

</script>

<style lang="scss">
.fullScreen{
	.fa-arrows-alt{
		display: none;
	}
}
.el-menu-vertical{
	width: 200px;
	li{
		width: 200px!important;
	}
	.el-menu-item{
		width: 200px!important;
		height: 56px;
	}
}
.el-dropdown-selfdefine {
.el-dropdown-link{
	display: none;
}
.el-tooltip{
	display: none;
}
}
.el-menu-vertical{
	width: 22px;
}
.fa-indent{
	display: none;
}
.logo-name{
	p{
		color:#fff !important;
		font-size: 1.25rem !important;
		font-weight: bold;
	}
}
.view-container{
	min-width: 1280px;
}
.el-header{
.icon{
	display: none;
}
}
body {
	margin: 0px;
	padding: 0px;
	font-family: Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,  SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}
a{
  color: #56a9ff;
}
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
