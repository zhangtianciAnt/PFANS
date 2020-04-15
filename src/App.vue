<template>
  <div class="theme_panasonic">
    <transition name="el-fade-in">
    <router-view style="font-family: 'Helvetica Neue', 'Arial'"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  #nprogress .bar {
    background: #81b2ec !important;
  }
</style>
