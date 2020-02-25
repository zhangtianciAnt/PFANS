<template>
  <EasyNormalContainer
    :buttonList="buttonList"
    :title="titles"
    @buttonClick="buttonClick"
    @end="end"
    @start="start"
    @workflowState="workflowState"
    ref="container"
    v-loading="loading"
  >
    <div slot="customize" style="margin-top:2vw">
      <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane
            label="现实点人员"
            name="first"
            style="padding-top:1%"
          >
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="no"
                label="No."
                width="180">
              </el-table-column>
              <el-table-column
                prop="expatriate"
                label="外驻先"
                width="180"
                v-show="this.$route.params.type === 0 ? false : true">
              </el-table-column>

              <el-table-column
                prop="name"
                label="社员名前"
                width="180">
              </el-table-column>
              <el-table-column
                prop="thisyear"
                :label="getThisYearLevel"
                width="180">
              </el-table-column>
              <el-table-column
                prop="nextyear"
                :label="getNextYearLevel"
                width="180">
              </el-table-column>
              <el-table-column
                prop="entermouth"
                label="新规采用入社预定日"
                width="180">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="新入职人员" name="second">
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId, getStatus, getUserInfo} from '@/utils/customize';
  import moment from "moment";
  export default {
    name: 'PFANS1038FormView',
    components: {
      EasyNormalContainer
    },
    data() {
      return {
        titles: this.$route.params.type === 0 ? "社员计划" : "外驻计划",

        form:{
          year:""
        }
      };
    },
    computed:{
      getThisYearLevel:function () {
           if(this.form.year){
             return this.form.year;
           }else{
            return moment().format('YYYY');
           }
      },
      getNextYearLevel:function () {
           if(this.form.year){
             return parseInt(this.form.year) + 1;
           }else{
            return parseInt(moment().format('YYYY')) + 1;
           }
      }
    },
    mounted() {

    },
    methods: {

    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
