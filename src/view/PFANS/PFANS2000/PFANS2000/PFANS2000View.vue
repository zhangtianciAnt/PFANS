<template>
  <!--<EasyDictionary-->

  <!--&gt;</EasyDictionary>-->
  <div style="min-height: 100%">
    <el-card class="box-card">
      <img :src="svg">
    </el-card>
  </div>

</template>

<script>
    import EasyDictionary from "@/components/EasyDictionary";
    import svg from "@/assets/svg/网站建设.svg";

    let moment = require("moment");
  export default {
    name: 'PFANS2000View',
    components: {
        EasyDictionary
    },
    data() {
      return {
        svg:svg
      }
    }
  }
</script>

<style scoped>

</style>
