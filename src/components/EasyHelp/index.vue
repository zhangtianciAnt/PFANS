<template>
  <div>
    <el-tooltip :content="$t('help.name')" placement="bottom" effect="light">
      <img :src="help" @click="dialogVisible=true" style="height: 20px;cursor:pointer;"/>
    </el-tooltip>
    <el-dialog :visible.sync="dialogVisible" :title="$t('help.name')" center>
      <slot name="helpDetail"></slot>
    </el-dialog>
  </div>
</template>

<script>
  import help from "@/assets/svg/help.svg";
  export default {
    name: "index",
    components: {},
    data() {
      return {
        dialogVisible: false,
        help:help
      };
    },
    props: {
    },
    methods: {},
    mounted() {

    },
    watch: {}
  }
</script>
<style lang='scss'>

</style>
