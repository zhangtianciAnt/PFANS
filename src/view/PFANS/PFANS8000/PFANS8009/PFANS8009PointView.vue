<template>
  <div style="min-height: 100%">
    <el-card class="box-card" style="height: calc(100vh - 60px - 2rem)">
      <div>
        <div @click="submitForm('PJ')" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.MANAGEMENT')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png1" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm('CT')" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.CONTRACT')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png1" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm('PR')" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">
              {{$t('menu.PERSONNELMATTERS')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png1" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm('PP')" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANSPJ')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png2" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm('PC')" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.FINANCIAL')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png3" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm('BP')" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANSBP')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png3" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm('PA')" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.ASSETS')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png5" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm('PG')" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANSSYSTEM')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png4" class="m-img">
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
        name: 'PFANS8009PointView',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
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
            submitForm(codetype) {
                this.$store.commit("global/SET_WORKFLOWURL", "/PFANS8009View");
                this.$router.push({
                    name: 'PFANS8009View',
                    params: {
                        codetype: codetype,
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

  .m-div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
  }

  .m-img {
    width: 80%;
  }
</style>
