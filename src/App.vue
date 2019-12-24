<template>
  <div class="theme_base">
    <transition name="el-fade-in">
    <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
