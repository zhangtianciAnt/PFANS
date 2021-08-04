<template>
  <error-content code="" :src="src"/>
</template>

<script>
  import error401 from '@/assets/jpg/403.jpg'
  import errorContent from './error-content.vue'
  export default {
    name: 'error_401',
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
