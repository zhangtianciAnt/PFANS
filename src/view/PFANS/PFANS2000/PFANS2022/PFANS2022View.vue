<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" @reget="getCasgiftApply"
                   :showSelection="true" :selectable="selectInit" ref="dataTable">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import { Message } from 'element-ui'
  import moment from "moment";
  import {getOrgInfoByUserId,getUserInfo,getStatus,getDictionaryInfo,getCurrentRole16} from '@/utils/customize';

  export default {
    name: 'PFANS2022View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS2022VIEW",
        data: [],
        columns: [
          {
            code: 'user_idshow',
            label: 'label.applicant',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'center_nameshow',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_nameshow',
            label: 'label.group',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'team_nameshow',
            label: 'label.team',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'twoclass',
            label: 'label.PFANS2022VIEW_TYPE',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'amoutmoney',
            label: 'label.PFANS2022VIEW_AMOUNT',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'application_dateshow',
            label: 'label.application_date',
            width: 130,
            fix: false,
            filter: true,
          },
          {
              code: 'paymentshow',
              label: 'label.PFANS2022VIEW_MONEYSTATUS',
              width: 150,
              fix: false,
              filter: true,
          },
          {
              code: 'releasedate',
              label: 'label.PFANS2022VIEW_RELEASEDATE',
              width: 150,
              fix: false,
              filter: true,
          },
            {
                code: 'statusshow',
                label: 'label.approval_status',
                width: 120,
                fix: false,
                filter: true,
            }
        ],
        //【关联发放】和【取消发放】按钮仅【工资计算担当】角色可见 ztc fr
        buttonList: [],
        buttonListStaff: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        buttonListBility: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'release', 'name': 'button.release', 'disabled': false, 'icon': 'el-icon-success'},
          {'key': 'cancelrelease', 'name': 'button.cancelrelease', 'disabled': false, 'icon': 'el-icon-error'}
        ],
        //【关联发放】和【取消发放】按钮仅【工资计算担当】角色可见 ztc to
        rowid: '',
        row : 'casgiftapplyid'
      };
    },
    mounted() {
        this.getCasgiftApply();
      //【关联发放】和【取消发放】按钮仅【工资计算担当】角色可见 ztc fr
        this.getPerson();
      //【关联发放】和【取消发放】按钮仅【工资计算担当】角色可见 ztc to
    },
    methods: {
      //【关联发放】和【取消发放】按钮仅【工资计算担当】角色可见 ztc fr
      getPerson(){
        this.roleBility = getCurrentRole16();
        if(this.roleBility == '0'){
          this.buttonList = this.buttonListBility
        } else {
          this.buttonList = this.buttonListStaff;
        }
      },
      //【关联发放】和【取消发放】按钮仅【工资计算担当】角色可见 ztc to
      getCasgiftApply(){
          this.loading = true;
          this.$store
              .dispatch('PFANS2022Store/getCasgiftApply')
              .then(response => {
                  for (let j = 0; j < response.length; j++) {
                      response[j].statusshow = getStatus(response[j].status);
                      let user = getUserInfo(response[j].user_id);
                      let nameflg = getOrgInfoByUserId(response[j].user_id);
                      if (nameflg) {
                          response[j].center_nameshow = nameflg.centerNmae;
                          response[j].group_nameshow = nameflg.groupNmae;
                          response[j].team_nameshow = nameflg.teamNmae;
                      }
                      if (user) {
                          response[j].user_idshow = getUserInfo(response[j].user_id).userinfo.customername;
                      }
                      if (response[j].application_date !== null && response[j].application_date !== "") {
                          response[j].application_dateshow = moment(response[j].application_date).format("YYYY-MM-DD");
                      }
                      if (response[j].twoclass !== null && response[j].twoclass !== "") {
                          let letTwoclass = getDictionaryInfo(response[j].twoclass);
                          if (letTwoclass != null) {
                              response[j].twoclass = letTwoclass.value1;
                          }
                      }
                      //add_fjl_0708  添加奖金发放状态  start
                      if (response[j].payment !== null && response[j].payment !== "") {
                          if (response[j].payment === "1") {
                              if (this.$i18n) {
                                  response[j].paymentshow = this.$t('label.PFANS2022VIEW_MONEYSTATUSED');
                              }
                          } else {
                              response[j].paymentshow = '';
                          }
                      }
                      //add_fjl_0708  添加奖金发放状态  end
                  }
                  this.data = response;
                  this.loading = false;
              })
              .catch(error => {
                  this.$message.error({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000
                  });
                  this.loading = false
              })
      },
      rowClick(row) {
        this.rowid = row.casgiftapplyid;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2022FormView',
            params: {
              _id: this.rowid,
              disabled: true
            }
          })
        }
        if (val === 'view') {
          if (this.rowid === '') {
            Message({
                message: this.$t('normal.info_01'),
                type: 'info',
              duration: 2 * 1000
            });

            return;
          }
          this.$router.push({
            name: 'PFANS2022FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS2022FormView',
            params: {
              _id: '',
              disabled: true
            }
          })
        }
        if (val === 'release' || val === 'cancelrelease') {
            this.multipleSelection = this.$refs.dataTable.selectedList;
            if (this.multipleSelection.length <= 0) {
                Message({
                    message: this.$t('normal.info_01'),
                    type: 'info',
                    duration: 2 * 1000
                });

                return;
            }
            if(val === 'release'){
                this.multipleSelection[0].tenantid = "0";
            }
            else{
                this.multipleSelection[0].tenantid = "1";
            }
            this.loading = true;
            this.$store
                .dispatch('PFANS2022Store/updateCasgiftApplyList', this.multipleSelection)
                .then(response => {
                    this.data = response;
                    this.getCasgiftApply();
                    this.loading = false;
                    Message({
                        message: this.$t("normal.success_02"),
                        type: 'success',
                        duration: 5 * 1000
                    });
                })
                .catch(error => {
                    this.$message.error({
                        message: error,
                        type: 'error',
                        duration: 5 * 1000
                    });
                    this.loading = false;
                })
        }
      },
      selectInit(row, index) {
          return (row.status === '4' &&  row.payment === '0');
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
