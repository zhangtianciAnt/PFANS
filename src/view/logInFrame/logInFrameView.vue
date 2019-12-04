<template>
  <!--<div class="login-container">-->
    <!--<router-view style="float: right;margin-right: 4%;"/>-->
  <div class="login-container">
  <router-view/>
  </div>
</template>

<script>
    export default {
        name: "logInFrameView"
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .login-container {
    height: 100%;
    width: 100%;
    background: url("../../assets/png/login.png") center center no-repeat;
    background-size: cover;
    top: 0;
    bottom: 0;
    z-index: 0;
    word-break: break-all;
    position: absolute;
  }
</style>
