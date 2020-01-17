<template>
  <div style="min-height: 100%">
    <el-card class="box-card" style="min-height: 600px">
      <div>
        <div @click="submitForm(7)" class="m-content">
          <el-col :span="18">
          <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1007')}}
          </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png6" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm(8)" class="m-content">
          <el-col :span="18">
          <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1008')}}
          </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png7" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm(9)" class="m-content">
          <el-col :span="18">
          <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1009')}}
          </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png8" class="m-img">
          </el-col>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import png1 from "@/assets/png/1.png";
  import png2 from "@/assets/png/2.png";
  import png3 from "@/assets/png/3.png";
  import png4 from "@/assets/png/4.png";
  import png5 from "@/assets/png/5.png";
  import png6 from "@/assets/png/6.png";
  import png7 from "@/assets/png/7.png";
  import png8 from "@/assets/png/8.png";
  import png9 from "@/assets/png/9.png";
  import png10 from "@/assets/png/10.png";

  export default {
    name: 'PFANS1037View',
    components: {
      EasyNormalTable,

    },
    data() {
      return {
        logo: {
          type: String,
        },
        png1: png1,
        png2: png2,
        png3: png3,
        png4: png4,
        png5: png5,
        png6: png6,
        png7: png7,
        png8: png8,
        png9: png9,
        png10: png10
      };
    },
    mounted() {

    },
    methods: {
      submitForm(val) {
        if (val === 7) {
          this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1007FormView");
        } else if (val === 8) {
          this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1008FormView");
        } else if (val === 9) {
          this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1009FormView");
        }
        this.$router.push({
          name: 'PFANS1037FormView',
          params: {
            title: val,
          },
        });
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
