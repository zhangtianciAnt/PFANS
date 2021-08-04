<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      ref="container"
      :noback="noback"
    >
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="refform" :model="refform"
                 style="padding: 2vw">
          <el-row style="padding-top: 0.5%;padding-bottom: 0.5%">
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')" prop="year">
                <div class="block">
                  <el-date-picker
                    type="year"
                    :disabled="true"
                    style="width: 15vw"
                    v-model="refform.year">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" prop="group_id">
                <el-select v-model="refform.group_id" style="width: 20vw" :disabled="false"
                           @change="groupChange">
                  <el-option
                    v-for="item in grp_options"
                    :key="item.groupid"
                    :label="item.groupname"
                    :value="item.groupid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="datatotal" border
                      header-cell-class-name="sub_bg_color_blue"  height="85vh" width="100%"
            >
              <el-table-column
                :label = "$t('label.PFANS1051THEMENAME')"
                prop="themename"
                width="150px"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051TOOLSTYPE')"
                prop="contract"
                width="100px"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051TOOLS')"
                prop="toolsorgs"
                width="240px"
                show-overflow-tooltip
              >

              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051CONTRACTMOUNT')"
                prop="amount"
                width="200px"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH4')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan4"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual4">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH5')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan5"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual5">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH6')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan6"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual6">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1045VIEW_CYCLE3')"
                prop="totalactual1q">
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH7')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan7"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual7">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH8')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan8"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual8">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH9')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan9"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual9">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1045VIEW_CYCLE4')"
                prop="totalactual2q">

              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH10')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan10"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual10">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH11')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan11"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual11">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH12')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan12"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual12">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1045VIEW_CYCLE5')"
                prop="totalactual3q">
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH1')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan1">

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual1">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH2')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan2">

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual2">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH3')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan3"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual3">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1045VIEW_CYCLE6')"
                prop="totalactual4q">

              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051TOTAL')"
                prop="totalactual">

              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {getDictionaryInfo,getOrgInfo, getUserInfo,getCurrentRoleNew} from '@/utils/customize';
  import {Message} from 'element-ui';

  let moment = require('moment');
  export default {
    name: 'PFANS1051View',
    components: {
      EasyNormalContainer,
    },
    data() {
      return {
        noback:true,
        loading:false,
        title: 'title.PFANS1051VIEW',
        datatotal: [],
        buttonList: [
          {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-upload2'},
        ],
        grp_options: [],
        refform:{
          year:parseInt(moment(new Date()).format('MM')) >= 4 ? moment(new Date()).format('YYYY') : parseInt(moment(new Date()).format('YYYY')) - 1 + '',
          group_id:'',
        },
      };
    },
    mounted() {
      this.getorglistname().then(val =>{
        this.selectBygroupid();
      });
    },
    methods: {
      getorglistname() {
        return new Promise((resolve, reject) => {

        let role = getCurrentRoleNew();
        const vote = [];

        if (role === '3') {//CENTER
          vote.push(
            {
              groupid: this.$store.getters.userinfo.userinfo.centerid,
              groupname: this.$store.getters.userinfo.userinfo.centername,
            },
          );
          //add ccm 0112 兼职部门
          if (this.$store.getters.userinfo.userinfo.otherorgs)
          {
            for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
            {
              if (others.centerid)
              {
                this.$store.getters.orgGroupList.filter((item) => {
                  if (item.centerid === others.centerid) {
                    vote.push(
                      {
                        groupid: item.centerid,
                        groupname: item.centername,
                      },
                    );
                  }
                })
              }
            }
          }
          //add ccm 0112 兼职部门
        } else if (role === '2') {//副总经理
          this.$store.getters.orgGroupList.filter((item) => {
            if (item.virtualuser === this.$store.getters.userinfo.userid) {
              vote.push(
                {
                  groupid: item.centerid,
                  groupname: item.centername,
                },
              );
            }
          })
          //add ccm 0112 兼职部门
          if (this.$store.getters.userinfo.userinfo.otherorgs)
          {
            for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
            {
              if (others.centerid)
              {
                this.$store.getters.orgGroupList.filter((item) => {
                  if (item.centerid === others.centerid) {
                    vote.push(
                      {
                        groupid: item.centerid,
                        groupname: item.centername,
                      },
                    );
                  }
                })
              }
            }
          }
          //add ccm 0112 兼职部门
        }
        else if (role === '4') //GM
        {
          let centers = getOrgInfo(this.$store.getters.userinfo.userinfo.centerid);
          if (centers)
          {
            if (centers.encoding === null || centers.encoding === '' || centers.encoding === undefined)
            {
              vote.push(
                {
                  groupid: this.$store.getters.userinfo.userinfo.groupid,
                  groupname: this.$store.getters.userinfo.userinfo.groupname,
                },
              );
            }
          }
        }
        const vote1 = [];
        if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
          || this.$store.getters.roles.indexOf("11") != -1 //总经理
          || this.$store.getters.roles.indexOf("16") != -1) //财务部长
        {
          this.$store.getters.orgGroupList.filter((item) => {
            vote1.push(
              {
                groupid: item.centerid,
                groupname: item.centername,
              },
            );
          })
          this.grp_options = vote1;
        }
        else
        {
          this.grp_options = vote;
        }
        //去重
        let letoptionsdata = [];
        let arrId = [];
        for(var item of this.grp_options){
          if(arrId.indexOf(item['groupname']) == -1){
            arrId.push(item['groupname']);
            letoptionsdata.push(item);
          }
        }
        //针对经营管理统计到group修改 start
        let incfmyList = [];
        for(let item of letoptionsdata){
          if(getOrgInfo(item.groupid).encoding == ''){
            incfmyList.push(item.groupid)
          }
        }
        if(incfmyList.length > 0){
          for(let item of incfmyList){
            letoptionsdata = letoptionsdata.filter(letitem => letitem.groupid != item)
          }
          let orgInfo = [];
          for(let item of incfmyList){
            if(item){
              if(getOrgInfo(item).orgs.length != 0){
                orgInfo.push(getOrgInfo(item).orgs)
              }
            }
          }
          let groInfo = orgInfo[0].filter(item => item.type == '2');
          for(let item of groInfo){
            letoptionsdata.push(
              {
                groupid: item._id,
                groupname: item.title,
              },
            );
          }
        }
        //针对经营管理统计到group修改 end
        this.grp_options = letoptionsdata;
        if (this.grp_options.length > 0)
        {
          this.refform.group_id = this.grp_options[0].groupid;
        }

        //UPD CCM 20210422
          resolve(this.grp_options)
        });
      },
      selectBygroupid(){
        return new Promise((resolve, reject) => {
        let parameter = {
          groupid: this.refform.group_id,
          year: this.refform.year
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS1051Store/selectBygroupid',parameter)
          .then(response => {
            if (response.length > 0) {
              debugger;
              for (let i = 0; i < response.length; i++) {

              }
            }
            this.datatotal = response;
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
          resolve(this.datatotal)
        });
      },
      groupChange(val) {
        this.refform.group_id = val;
        let data = this.grp_options.filter(item => (item.groupid == val));
        if (data.length > 0) {
          this.refform.encoding = data[0].encoding;
        }
        this.selectBygroupid();
      },
      buttonClick(val) {
        if (val === 'export')
        {

        }
      }
    },
  };
</script>

<style lang='scss'>
  .custimize_drawer {
    -webkit-box-sizing: border-box;
    overflow: auto !important;
  }
</style>
