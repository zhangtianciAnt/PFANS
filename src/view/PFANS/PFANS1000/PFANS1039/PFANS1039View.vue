<template>
  <div style="min-height: 100%">
    <el-card class="box-card" style="height: calc(100vh - 60px - 2rem)">
      <div>
        <div @click="submitForm(1)" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1040')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png1" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm(2)" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1041')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png2" class="m-img">
          </el-col>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import png1 from "@/assets/png/12.png";
  import png2 from "@/assets/png/13.png";
  import moment from "moment";
  export default {
    name: 'PFANS1039View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        years: moment(new Date()).format("YYYY"),
        logo: {
          type: String,
        },
        png1: png1,
        png2: png2
      };
    },
    mounted() {
    },
    methods: {
      submitForm(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        this.$store.commit("global/SET_OPERATEID", this.years);
        if (val === 1) {
          this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1040View");
          this.$router.push({
            name: 'PFANS1040View',
            params: {
              title: val,
              _id: this.years
            },
          });
        }else if (val === 2) {
            this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1041View");
          this.$router.push({
            name: 'PFANS1041View',
            params: {
              title: val,
              _id: this.years
            },
          });
        }
      },
    },
  };
</script>
<style lang="scss">
  .m-content {
    border: 1px solid #e0e0e0;
    cursor: pointer;
    float: left;
    width: 240px;
    height: 90px;
    margin: 20px 2%;
    position: relative;
  }
  .m-div{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
  }
  .m-img{
    width: 80%;
  }
</style>
