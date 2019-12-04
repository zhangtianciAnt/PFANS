<template>
  <div>
    <el-tooltip :content="$t('notice.name')" placement="bottom" effect="light">
      <el-badge :value="noticeVal" :max="99">
        <img :src="bell" @click="dialogVisible = true" style="height: 20px;cursor: pointer"/>
      </el-badge>
    </el-tooltip>
    <el-dialog :visible.sync="dialogVisible" :title="$t('notice.name')" center>
      <slot name="messageDetail" v-if="dialogVisible"></slot>
    </el-dialog>
  </div>
</template>

<script>
  import bell from "@/assets/svg/bell.svg";
  export default {
    name: "index",
    components: {},
    data() {
      return {
        dialogVisible: false,
        bell: bell
      };
    },
    props: {
      noticeVal:{
        type:Number,
        default:200
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
