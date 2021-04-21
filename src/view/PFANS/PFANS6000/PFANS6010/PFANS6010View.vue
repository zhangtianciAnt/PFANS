<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    <el-date-picker
      :placeholder="$t('normal.error_09')"
      @change="changed"
      slot="customize"
      style="width:11vw"
      type="month"
      v-model="months">
    </el-date-picker>
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {
    getDictionaryInfo,
    getStatus,
    getUserInfo,
    getorgGroupList,
    getCurrentRole8,
    getOrgInfo,
    getCurrentRoleNew,
  } from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from 'moment';

  export default {
    name: 'PFANS6010View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS6010VIEW',
        months: moment(new Date().setMonth(new Date().getMonth() - 1)).format('YYYY-MM'),
        // 表格数据源
        data: [],
        letparams: {},
        showButton: '0',
        status: '',
        groupid: '',
        buttonListinitial: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'contract', 'name': 'button.contract1', 'disabled': false, 'icon': 'el-icon-view'},
        ],
        // 列属性
        columns: [
          {
            code: 'groupname',
            label: 'label.department',
            width: 110,
            fix: false,
            filter: false,
          },
          {
            code: 'manhour',
            label: 'label.PFANS1036FORMVIEW_JOBNUMBER',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'cost',
            label: 'label.PFANS6008VIEW_COST',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'letstatus',
            label: 'label.approval_status',
            width: 130,
            fix: false,
            filter: false,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
        ],
        rowid: '',
        row: 'coststatistics_id',
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      changed(val) {
        this.months = moment(val).format('YYYY-MM');
        this.showButton = '0'
        this.getList();
      },
      getList() {
          let role = getCurrentRoleNew();
          const vote = [];
          if (role === '3') {//CENTER
              vote.push(
                  {
                      value: this.$store.getters.userinfo.userinfo.centerid,
                      lable: this.$store.getters.userinfo.userinfo.centername,
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
                                          value: item.centerid,
                                          lable: item.centername,
                                      },
                                  );
                              }
                          })
                      }
                  }
              }
              //add ccm 0112 兼职部门
              this.group_id = this.$store.getters.userinfo.userinfo.centerid;
          } else if (role === '2') {//副总经理
              this.$store.getters.orgGroupList.filter((item) => {
                  if (item.virtualuser === this.$store.getters.userinfo.userid) {
                      vote.push(
                          {
                              value: item.centerid,
                              lable: item.centername,
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
                                          value: item.centerid,
                                          lable: item.centername,
                                      },
                                  );
                              }
                          })
                      }
                  }
              }
              //add ccm 0112 兼职部门
          }
          const vote1 = [];
          let letRole2 = this.getCurrentRole2();
          if (letRole2 === '4')//外注管理担当
          {
              this.$store.getters.orgGroupList.filter((item) => {
                  vote1.push(
                      {
                          value: item.centerid,
                          lable: item.centername,
                      },
                  );
              })
              this.optionsdata = vote1;
          }
          else
          {
              this.optionsdata = vote;
          }
        //针对经营管理统计到group修改 start
        let incfmyList = [];
        for(let item of this.optionsdata){
          if(getOrgInfo(item.value).encoding == ''){
            incfmyList.push(item.value)
          }
        }
        if(incfmyList.length > 0) {
          for (let item of incfmyList) {
            this.optionsdata = this.optionsdata.filter(letitem => letitem.value != item)
          }
          let orgInfo = [];
          for (let item of incfmyList) {
            if (item) {
              if (getOrgInfo(item).orgs.length != 0) {
                orgInfo.push(getOrgInfo(item).orgs)
              }
            }
          }
          let groInfo = orgInfo[0].filter(item => item.type == '2');
          for (let item of groInfo) {
            this.optionsdata.push(
              {
                value: item._id,
                lable: item.title,
              },
            );
          }
        }
        //针对经营管理统计到group修改 end
          //去重
          let groupidList = "";
          let arrId = [];
          for(var item of this.optionsdata){
              if(arrId.indexOf(item['lable']) == -1){
                  arrId.push(item['lable']);
                  //groupidList.push(item['value']);
                  groupidList = groupidList + ',' + item['value'];
              }
          }

          console.log(groupidList)
        // let groupid = this.$store.getters.userinfo.userinfo.groupid;
        // let letRole2 = this.getCurrentRole2();
        // if (letRole2 !== '4') {
        //   letRole2 = this.getCurrentRole3();
        //   // if (letRole2 === '2') {
        //   //   groupid = this.$store.getters.userinfo.userinfo.centerid;
        //   // }
        //   if (letRole2 === '2') {
        //     //CENTER长
        //     groupid = this.$store.getters.userinfo.userinfo.centerid;
        //     if (this.$store.getters.userinfo.userinfo.otherorgs)
        //     {
        //       for (let others of this.$store.getters.userinfo.userinfo.otherorgs) {
        //         if (others.centerid) {
        //           groupid = groupid + ',' + others.centerid;
        //         }
        //       }
        //     }
        //   } else if (letRole2 === '1') {
        //     //GROUP
        //     groupid = this.$store.getters.userinfo.userinfo.groupid;
        //     if (this.$store.getters.userinfo.userinfo.otherorgs)
        //     {
        //       for (let others of this.$store.getters.userinfo.userinfo.otherorgs) {
        //         if (others.centerid) {
        //           let centerId = others.centerid;
        //           let orgs = getOrgInfo(centerId);
        //           if (orgs) {
        //             for (let org of orgs) {
        //               if (others.groupid) {
        //                 if (org._id === others.groupid) {
        //                   groupid = groupid + ',' + org._id;
        //                 }
        //               }
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
        let letdates = [
          this.months.split('-')[0],
          this.months.split('-')[1],
        ];
        let now = new Date(this.months);
        let dates = moment(now).format('YYYY-MM');
        if(now.getMonth() === 0 || now.getMonth() === 1 || now.getMonth() === 2){
            dates = moment(now.setFullYear(now.getFullYear() - 1)).format('YYYY-MM');
        }
        this.letparams = {
          dates: dates,
          role: '',
          groupid: groupidList.substring(1,groupidList.length),
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS6008Store/getcostMonthList', this.letparams)
          .then(response => {
            response = response.sort((a, b) => a.status - b.status).reverse();
            // let dates = moment(this.months).format('M');
            let now1 = new Date(this.months);
            let dates = moment(now1).format('M');
            for (let j = 0; j < response.length; j++) {
              if (response[j].groupid) {
                let group = getorgGroupList(response[j].groupid);
                if (group) {
                  response[j].groupname = group.centername;
                }
              }
              if (response[j].status === null || response[j].status === '' || response[j].status === '3') {
                response[j].letstatus = '0';//未开始
              } else {
                if (response[j].status === '0') {//进行中
                  response[j].letstatus = '2';
                } else if (response[j].status === '2') {//驳回
                  response[j].letstatus = '3';
                } else if (response[j].status === '3') {//撤回
                  response[j].letstatus = '0';
                } else if (response[j].status === '4') {//撤回
                  response[j].letstatus = '4';
                }
              }
              response[j].status = response[j].letstatus;
              //判断是否有审批未通过的数据
              if (response[j].letstatus != '4') {
                this.showButton = '1';
              }
              this.letstatus = response[j].letstatus;
              //数据状态
              response[j].letstatus = getStatus(response[j].status);

              //region 部门费用合计
              let letmanhour;
              let letcost;
              if (dates === '4') {
                letmanhour = response[j].manhour4;
                letcost = response[j].cost4;
              } else if (dates === '5') {
                letmanhour = response[j].manhour5;
                letcost = response[j].cost5;
              } else if (dates === '6') {
                letmanhour = response[j].manhour6;
                letcost = response[j].cost6;
              } else if (dates === '7') {
                letmanhour = response[j].manhour7;
                letcost = response[j].cost7;
              } else if (dates === '8') {
                letmanhour = response[j].manhour8;
                letcost = response[j].cost8;
              } else if (dates === '9') {
                letmanhour = response[j].manhour9;
                letcost = response[j].cost9;
              } else if (dates === '10') {
                letmanhour = response[j].manhour10;
                letcost = response[j].cost10;
              } else if (dates === '11') {
                letmanhour = response[j].manhour11;
                letcost = response[j].cost11;
              } else if (dates === '12') {
                letmanhour = response[j].manhour12;
                letcost = response[j].cost12;
              } else if (dates === '1') {
                letmanhour = response[j].manhour1;
                letcost = response[j].cost1;
              } else if (dates === '2') {
                letmanhour = response[j].manhour2;
                letcost = response[j].cost2;
              } else if (dates === '3') {
                letmanhour = response[j].manhour3;
                letcost = response[j].cost3;
              }
              response[j].manhour = letmanhour;
              response[j].cost = letcost;
              //endregion 部门费用合计
            }
            //外驻管理人员可操作【生成合同】
            if (letRole2 == '4') {
              this.buttonList = this.buttonListinitial;
            } else {
              this.buttonList = [
                {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
              ];
            }
            this.data = response;
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
      },
      rowClick(row) {
        this.rowid = row.coststatistics_id;
        this.letstatus = row.status;
        this.groupid = row.groupid;
        //upd-ws-01/13-修改审批驳回问题
        let checkgroupid = '';
        let checkgroupid2 = '';
        if (this.$store.getters.userinfo.userinfo.otherorgs) {
          for (let i = 0; i < this.$store.getters.userinfo.userinfo.otherorgs.length; i++) {
            checkgroupid2 = this.$store.getters.userinfo.userinfo.otherorgs[i].groupid + ',';
          }
          checkgroupid = checkgroupid2 + ',' + this.$store.getters.userinfo.userinfo.groupid;
        } else {
          //upd 20210127 王聪 没有发起审批修改
          // checkgroupid = this.$store.getters.userinfo.userinfo.groupid;
          let groupid = this.$store.getters.userinfo.userinfo.groupid;
          if(groupid)
          {
            checkgroupid = this.$store.getters.userinfo.userinfo.groupid;
          }
          else
          {
            if (this.$store.getters.userinfo.userinfo.centerid) {
              let centerId = this.$store.getters.userinfo.userinfo.centerid;
              let orgs = getOrgInfo(centerId);
              if (orgs) {
                for (let org of orgs) {
                    if (org.user === this.$store.getters.userinfo.userid) {
                      checkgroupid = checkgroupid + ',' + org._id;
                    }
                }
              }
            }
          }
          //upd 20210127 王聪 没有发起审批修改
        }

        if (checkgroupid.indexOf(this.groupid) !== -1
          && (row.status === '0' || row.status === '3' || row.status === '4')) {
          this.$store.commit('global/SET_OPERATEOWNER', this.$store.getters.userinfo.userid);
        } else {
          if (checkgroupid === null
            && (row.status === '0' || row.status === '3' || row.status === '4')) {
            this.$store.commit('global/SET_OPERATEOWNER', this.$store.getters.userinfo.userid);
          } else {
            this.$store.commit('global/SET_OPERATEOWNER', '');
          }
        }
        //upd-ws-01/13-修改审批驳回问题
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.letparams.role = '1';
          this.letparams.groupid = this.groupid;
          this.$router.push({
            name: 'PFANS6010FormView',
            params: {
              _id: this.rowid,
              letparams: this.letparams,
              letstatus: this.showButton,
              disabled: false,
            },
          });
        }
        if (val === 'contract') {
          //外驻管理担当
          this.letparams.role = '4';
          this.$router.push({
            name: 'PFANS6010FormView',
            params: {
              _id: this.rowid,
              letparams: this.letparams,
              letstatus: this.showButton,
              _contr: getCurrentRole8(),
              disabled: false,
            },
          });
        }
      },
      getCurrentRole2() {
        let roles = '';
        if (this.$store.getters.useraccount && this.$store.getters.useraccount.roles && this.$store.getters.useraccount.roles.length > 0) {
          for (let role of this.$store.getters.useraccount.roles) {
            roles = roles + role.description;
          }
          roles = roles.replace('副总经理','');
          if (roles.toUpperCase().indexOf('外注管理担当') != -1 || roles.toUpperCase().indexOf('财务部长') != -1 || roles.toUpperCase().indexOf('企划部长') != -1 || roles.toUpperCase().indexOf('合同担当') != -1 || roles.toUpperCase().indexOf('总经理') != -1 || roles.toUpperCase().indexOf('管理员') != -1) {
            return '4';
          } else {
            return '0';
          }
        }
      },
      getCurrentRole3() {
        let roles = '';
        if (this.$store.getters.useraccount && this.$store.getters.useraccount.roles && this.$store.getters.useraccount.roles.length > 0) {
          for (let role of this.$store.getters.useraccount.roles) {
            roles = roles + role.description;
          }
          if (roles.toUpperCase().indexOf('CENTER') != -1) {
            return '2';
          } else if (roles.toUpperCase().indexOf('GM') != -1) {
            return '1';
          } else if (roles.toUpperCase().indexOf('TL') != -1) {
            return '0';
          }
        }
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
