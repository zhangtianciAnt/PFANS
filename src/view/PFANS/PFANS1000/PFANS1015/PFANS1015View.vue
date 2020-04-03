<template>
  <div style="min-height: 100%">
    <el-card class="box-card" style="height: calc(100vh - 60px - 2rem)">
      <div>
        <div @click="submitForm(1)" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1016')}}
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
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1017')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png2" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm(3)" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1018')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png3" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm(4)" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1019')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png4" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm(5)" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1020')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png5" class="m-img">
          </el-col>
        </div>
      </div>
      <div>
        <div @click="submitForm(6)" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1021')}}
            </div>
          </el-col>
          <el-col :span="6" class="m-div">
            <img :src="png6" class="m-img">
          </el-col>
        </div>
      </div>
      <!--<div>-->
        <!--<div @click="submitForm(7)" class="m-content">-->
          <!--<el-col :span="18">-->
            <!--<div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;-->
                          <!--float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1022')}}-->
            <!--</div>-->
          <!--</el-col>-->
          <!--<el-col :span="6" class="m-div">-->
            <!--<img :src="png7" class="m-img">-->
          <!--</el-col>-->
        <!--</div>-->
      <!--</div>-->
      <div>
        <div @click="submitForm(8)" class="m-content">
          <el-col :span="18">
            <div style="width: 150px; margin-left: 8px; text-overflow: ellipsis; overflow: hidden;
                          float: left; padding: 10px 0px; height: 50px; line-height: 18px;">{{$t('menu.PFANS1023')}}
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

    export default {
        name: 'PFANS1015View',
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
                png8: png8
            };
        },
        mounted() {

        },
        methods: {
            submitForm(val) {
                let letname = "";
                if (val === 1) {
                    this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1016View");
                    letname = 'PFANS1016View';
                }else if (val === 2) {
                    this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1017View");
                    letname = 'PFANS1017View';
                }else if (val === 3) {
                    this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1018View");
                    letname = 'PFANS1018View';
                }else if (val === 4) {
                    this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1019View");
                    letname = 'PFANS1019View';
                }else if (val === 5) {
                    this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1020View");
                    letname = 'PFANS1020View';
                } else if (val === 6) {
                    this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1021View");
                    letname = 'PFANS1021View';
                } else if (val === 7) {
                    this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1022View");
                    letname = 'PFANS1022View';
                } else if (val === 8) {
                    this.$store.commit("global/SET_WORKFLOWURL", "/PFANS1023View");
                    letname = 'PFANS1023View';
                }
                this.$router.push({
                    name: letname,
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
