<template>
  <error-content code="" :src="src"/>
</template>

<script>
  import error401 from '@/assets/jpg/404.jpg'
  import errorContent from './error-content.vue'
  export default {
    name: 'error_404',
    components: {
      errorContent
    },
    data () {
      return {
        src: error401
      }
    }
  }
</script>
