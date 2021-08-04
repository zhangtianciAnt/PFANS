<template>
  <div>
    <el-tooltip :content="$t('logout.name')" placement="bottom" effect="light">
    <router-link :to="url">
      <el-avatar icon="el-icon-switch-button" size="medium" style="background-color: transparent"></el-avatar>
    </router-link>
    </el-tooltip>
  </div>
</template>

<script>
  import logout from "@/assets/svg/logout.svg";
  export default {
    name: "index",
    components: {},
    data() {
      return {
        dialogVisible: false,
        logout:logout
      };
    },
    props: {
      url:{
        type:String,
        default:"/"
      }
    },
    methods: {},
    mounted() {

    },
    watch: {}
  }
</script>
<style lang='scss'>

</style>
