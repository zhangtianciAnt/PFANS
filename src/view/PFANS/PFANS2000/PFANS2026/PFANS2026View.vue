<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    <el-date-picker
      unlink-panels
      class="bigWidth"
      v-model="workinghours"
      style="margin-right:1vw"
      slot="customize"
      type="daterange"
      :end-placeholder="$t('label.enddate')"
      :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
      :start-placeholder="$t('label.startdate')"
      @change="filterInfo"
    ></el-date-picker>
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getStatus, getUserInfo, getDictionaryInfo,getUserInfoName, getOrgInfoByUserId,getCurrentRolegongzijisuan} from '@/utils/customize';

  export default {
    name: 'PFANS2026View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        workinghours: '',
        checktype: 0,
        loading: false,
        title: 'title.PFANS2026VIEW',
        data: [],
        tableList: [],
        columns: [
          {
            code: 'user_id',
            label: 'label.user_name',
            width: 100,
            fix: false,
            filter: false,
          },
          {
            code: 'center_name',
            label: 'label.center',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'group_name',
            label: 'label.group',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'team_name',
            label: 'label.team',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'starank',
            label: 'label.PFANSUSERFORMVIEW_RANK',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'sex',
            label: 'label.sex',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'position',
            label: 'label.PFANS2026VIEW_POSITION',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'entry_time',
            label: 'label.PFANS2026VIEW_ENTRYTIME',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'hope_exit_date',
            label: 'label.PFANS2026VIEW_DEPARTUREDATE',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': true, 'icon': 'el-icon-edit'},
          //add-ws-6/16-禅道106
          {'key': 'delete', 'name': 'button.delete', 'disabled': true, 'icon': 'el-icon-delete'},
          {'key': 'changedata', 'name': 'button.changedata', 'disabled': true, 'icon': 'el-icon-view'},
          //add-ws-6/16-禅道106
          // add-ccm 7/9 离职考勤对比 fr
          {
            'key': 'resignationAttendCompare',
            'name': 'button.resignationAttendCompare',
            'disabled': true,
            'icon': 'el-icon-view',
          },
          // add-ccm 7/9 离职考勤对比 to
          // add-ccm 7/20 离职工资对比 fr
          {'key': 'wagescontrast', 'name': 'button.wagescontrast', 'disabled': true, 'icon': 'el-icon-view'},
          // add-ccm 7/20 离职工资对比 to
        ],
        userid: '',
        //add-ws-9/23-禅道任务548
        userids: '',
        //add-ws-9/23-禅道任务548
        rowid: '',
        status: '',
        row_id: 'staffexitprocedure_id',
        // add-ccm 7/9 离职考勤对比 fr
        url: '',
        urlparams: '',
        row_userid: '',
        // row_resignation_year:moment(new Date()).format("YYYY"),
        // row_resignation_months:moment(new Date()).format("MM")
        row_resignation_year: '',
        row_resignation_months: '',
        // add-ccm 7/9 离职考勤对比 to
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      getworkinghours(workinghours) {
        if (workinghours != null) {
          if (workinghours.length > 0) {
            return (
              moment(workinghours[0]).format('YYYY-MM-DD') +
              ' ~ ' +
              moment(workinghours[1]).format('YYYY-MM-DD')
            );
          } else {
            return '';
          }
        } else {
          return '';
        }
      },
      filterInfo() {
        this.data = this.tableList.slice(0);
        if (this.tableList.length > 0) {
          //进行时间筛选
          this.working = this.getworkinghours(this.workinghours);
          this.starttime = this.working.substring(0, 10);
          this.endTime = this.working.substring(13, 23);
          if (this.starttime != '' || this.endTime != '') {
            this.data = this.data.filter(item => {
              return this.starttime <= moment(item.hope_exit_date).format('YYYY-MM-DD') && moment(item.hope_exit_date).format('YYYY-MM-DD') <= this.endTime;
            });
          }
        }
      },
      getList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2026Store/get', {'type': 0})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].user_id !== null && response[j].user_id !== '') {
                if (response[j].starank != '' && response[j].starank != null) {
                  let letbudge = getDictionaryInfo(response[j].starank);
                  if (letbudge) {
                    response[j].starank = letbudge.value1;
                  }
                }
                let rst = getUserInfo(response[j].user_id);
                let nameflg = getOrgInfoByUserId(response[j].user_id);
                if (nameflg) {
                  response[j].center_name = nameflg.centerNmae;
                  response[j].group_name = nameflg.groupNmae;
                  response[j].team_name = nameflg.teamNmae;
                }
                let postinfo = getDictionaryInfo(response[j].position);
                if (postinfo) {
                  response[j].position = postinfo.value1;
                }
                // add-ccm 7/9 离职考勤对比 fr
                //保存离职者的用户id
                response[j].userid1 = response[j].user_id;
                // add-ccm 7/9 离职考勤对比 to
                if (rst) {
                  response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
                }

                if (response[j].status !== null && response[j].status !== '') {
                  response[j].status = getStatus(response[j].status);
                }
                if (response[j].hope_exit_date !== null && response[j].hope_exit_date !== '') {
                  response[j].hope_exit_date = moment(response[j].hope_exit_date).format('YYYY-MM-DD');
                }
                if (response[j].entry_time !== null && response[j].entry_time !== '') {
                  response[j].entry_time = moment(response[j].entry_time).format('YYYY-MM-DD');
                }
                if (response[j].sex !== null && response[j].sex !== '') {
                  let letsex = getDictionaryInfo(response[j].sex);
                  if (letsex) {
                    response[j].sex = letsex.value1;
                  }
                }
              }
            }
            this.data = response;
            this.tableList = response;
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
        //add-ws-9/23-禅道任务548
        if (getUserInfoName(row.user_id) !== '-1') {
          this.userids = getUserInfoName(row.user_id).userid;
        }
        //add-ws-9/23-禅道任务548
        if (this.$store.getters.userinfo) {
          let rst = getUserInfo(this.$store.getters.userinfo.userid);
          if (rst) {
            this.userid = getUserInfo(this.$store.getters.userinfo.userid).userinfo.customername;
          }
        }
        this.checktype = 0;
        this.status = 0;
        // add-ccm 7/9 离职考勤对比 fr
        this.row_userid = row.userid1;
        let ru = getUserInfo(this.row_userid);
        if (ru) {
          if (ru.userinfo.resignation_date != null && ru.userinfo.resignation_date != '' && ru.userinfo.resignation_date != undefined) {
            this.row_resignation_year = moment(ru.userinfo.resignation_date).format('YYYY');
            this.row_resignation_months = moment(ru.userinfo.resignation_date).format('MM');
          }
          let dataid = this.row_userid + ',' + this.row_resignation_year + ',' + this.row_resignation_months;
          this.$store
            .dispatch('workflowStore/oneWorkFlowIns', {menuUrl: '/PFANS2010View', dataid: dataid})
            .then(response => {
              if (response) {
                if (response.length > 0 && response[0].status === '通过' && row.status === this.$t('label.PFANS5004VIEW_OVERTIME')) {
                  this.buttonList[5].disabled = false;
                  //工资计算担当可操作【工资对比】
                  if (getCurrentRolegongzijisuan() === '0')
                  {
                      this.buttonList[6].disabled = false;
                  }
                }
                else{
                  this.buttonList[5].disabled = true;
                  this.buttonList[6].disabled = true;
                }

              }
            })
            .catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
            });
        }
        // add-ccm 7/9 离职考勤对比 to

        //add-ws-6/16-禅道106
        this.buttonList[2].disabled = true;
        this.buttonList[3].disabled = true;
        this.buttonList[4].disabled = true;
        if (row.status === this.$t('label.PFANS1026VIEW_WSTATUS') || row.status === this.$t('label.node_step2')) {
          this.buttonList[2].disabled = false;
        }
        if (row.status === this.$t('label.PFANS5004VIEW_OVERTIME') || row.status === this.$t('label.node_step2')) {
          if (row.stage == '0') {
            this.checktype = 1;
          } else {
            this.checktype = 0;
          }
          if (this.userid === row.user_id && row.newhope_exit_date != null) {
            this.buttonList[4].disabled = false;
          }
          this.status = 4;
        }
        if (row.status === this.$t('label.PFANS1026VIEW_WSTATUS')) {
          this.buttonList[3].disabled = false;
        }
        //add-ws-6/16-禅道106
        this.rowid = row.staffexitprocedure_id;
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
          this.$router.push({
            name: 'PFANS2026FormView',
            params: {
              _ckeck: false,
              //add-ws-9/23-禅道任务548
              _userid: this.userids,
              //add-ws-9/23-禅道任务548
              _status: this.status,
              _type: this.checktype,
              _type2: 0,
              _id: this.rowid,
              disabled: false,
            },
          });
        } else if (val === 'insert') {
          this.$router.push({
            name: 'PFANS2026FormView',
            params: {
              _ckeck: true,
              _type: 0,
              _type2: 0,
              _id: '',
              disabled: true,
            },
          });
        } else if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2026FormView',
            params: {
              //add-ws-9/23-禅道任务548
              _userid: this.userids,
              //add-ws-9/23-禅道任务548
              _ckeck: false,
              _status: this.status,
              _type: 0,
              _type2: 0,
              _id: this.rowid,
              disabled: true,
            },
          });
        } else if (val === 'delete') {
          if (this.row === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.delete();
        } else if (val === 'changedata') {
          if (this.row === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2026FormView',
            params: {
              _ckeck: false,
              _type: 1,
              _type2: 1,
              _id: this.rowid,
              disabled: true,
            },
          });
        } else if (val === 'resignationAttendCompare') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2033View',
            params: {
              userid: this.row_userid,
              years: this.row_resignation_year,
              months: this.row_resignation_months,
              disabled: false,
            },
          });
        } else if (val === 'wagescontrast') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2034View',
            params: {
              userid: this.row_userid,
              years: this.row_resignation_year,
              months: this.row_resignation_months,
              disabled: false,
            },
          });
        }
      },
      //add-ws-6/16-禅道106
      delete() {
        this.loading = true;
        this.$confirm(this.$t('normal.info_02'), this.$t('normal.info'), {
          confirmButtonText: this.$t('button.confirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning',
          center: true,
        }).then(() => {
          this.$store
            .dispatch('PFANS2026Store/deletesta', {staffexitprocedure_id: this.rowid})
            .then(response => {
              this.getList();
              this.$store.commit('global/SET_OPERATEID', '');
              Message({
                message: this.$t('normal.info_03'),
                type: 'success',
                duration: 2 * 1000,
              });
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('normal.info_04'),
          });
          this.loading = false;
        });
      },
      //add-ws-6/16-禅道106
    },
  };
</script>

<style scoped>

</style>
