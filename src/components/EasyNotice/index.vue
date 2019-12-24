<template>
  <div>
    <el-tooltip :content="$t('notice.name')" placement="bottom" effect="light">
      <!--<el-badge :value="noticeVal" :max="99">-->
      <router-link :to="url">
        <!--<img :src="bell" @click="dialogVisible = true" style="height: 20px;cursor: pointer"/>-->
        <el-avatar icon="el-icon-bell" size="medium" style="background-color: transparent"></el-avatar>
      </router-link>
      <!--</el-badge>-->
    </el-tooltip>
    <!--<el-dialog :visible.sync="dialogVisible" :title="$t('notice.name')" center>-->
      <!--<slot name="messageDetail" v-if="dialogVisible"></slot>-->
    <!--</el-dialog>-->
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
      },
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
