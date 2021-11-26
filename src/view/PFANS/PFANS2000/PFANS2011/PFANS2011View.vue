<template>
  <EasyNormalTable
    :title="title"
    :columns="columns"
    :data="data"
    :rowid="row_id" @reget="getovertime"
    :buttonList="buttonList"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading"
  >
    <!--    add-ws-9/29-禅道任务547-->
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
    <!--    add-ws-9/29-禅道任务547-->
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyBigDataTable';
  import {Message} from 'element-ui';
  import {
    getDictionaryInfo,
    getStatusNum,
    getUserInfo,
    getOrgInfoByUserId,
  } from '../../../../utils/customize';

  let moment = require('moment');

  export default {
    name: 'PFANS2011View',
    components: {
      moment,
      EasyNormalTable,

    },
    data() {
      return {
        // add-ws-9/29-禅道任务547
        workinghours: '',
        tableList: [],
        working: '',
        starttime: '',
        endTime: '',
        // add-ws-9/29-禅道任务547
        loading: false,
        title: 'title.PFANS2011VIEW',
        data: [],
        columns: [
          {
            code: 'username',
            label: 'label.applicant',
            width: 140,
            fix: false,
            filter: true,
          }, {
            code: 'centername',
            label: 'label.center',
            width: 140,
            fix: false,
            filter: true,
          }, {
            code: 'groupname',
            label: 'label.group',
            width: 140,
            fix: false,
            filter: true,
          }, {
            code: 'teamname',
            label: 'label.team',
            width: 140,
            fix: false,
            filter: true,
          }, {
            code: 'applicationdate',
            label: 'label.application_date',
            width: 140,
            fix: false,
            filter: true,
          }, {
            code: 'reserveovertimedate',
            label: 'label.PFANS2011VIEW_RESERVEOVERTIME',
            width: 140,
            fix: false,
            filter: true,
          }, {
            code: 'overtimetype',
            label: 'label.PFANS2011VIEW_TYPE',
            width: 140,
            fix: false,
            filter: true,
          }, {
            code: 'reserveovertime',
            label: 'label.PFANS2011VIEW_RESERVEOVER',
            width: 140,
            fix: false,
            filter: false,
          }, {
            code: 'actualovertime',
            label: 'label.PFANS2011VIEW_ACTUALOVER',
            width: 140,
            fix: false,
            filter: false,
          },
          // {
          //     code: 'reservesubstitutiondate',
          //     label: 'label.PFANS2011VIEW_RESERVESUBSTITUTION',
          //     width: 140,
          //     fix: false,
          //     filter: true
          // },
          // {
          //     code: 'actualsubstitutiondate',
          //     label: 'label.PFANS2011VIEW_ACTUALSUBSTITUTION',
          //     width: 140,
          //     fix: false,
          //     filter: true
          // },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 140,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {
            key: 'view',
            name: 'button.view',
            disabled: false,
            icon: 'el-icon-view',
          },
          {
            key: 'insert',
            name: 'button.insert',
            disabled: false,
            icon: 'el-icon-plus',
          },
          {
            key: 'update',
            name: 'button.update',
            disabled: false,
            icon: 'el-icon-edit',
          },
          //add-ws-9/4-加班申请可删除任务
          {
            key: 'delete',
            name: 'button.delete',
            disabled: true,
            icon: 'el-icon-delete',
          },
          //add-ws-9/4-加班申请可删除任务
        ],
        rowid: '',
        row_id: 'overtimeid',
      };
    },
    mounted() {
      this.getovertime();
    },
    methods: {
      // add-ws-9/29-禅道任务547
      filterInfo() {
        this.data = this.tableList.slice(0);
        if (this.tableList.length > 0) {
          //进行时间筛选
          this.working = this.getworkinghours(this.workinghours);
          this.starttime = this.working.substring(0, 10);
          this.endTime = this.working.substring(13, 23);
          if (this.starttime != '' || this.endTime != '') {
            this.data = this.data.filter(item => {
              return this.starttime <= moment(item.reserveovertimedate).format('YYYY-MM-DD') && moment(item.reserveovertimedate).format('YYYY-MM-DD') <= this.endTime;
            });
          }
        }
      },
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
      // add-ws-9/29-禅道任务547
      rowClick(row) {
        //add-ws-9/4-加班申请可删除任务
        this.buttonList[3].disabled = true;
        if (row.userid === this.$store.getters.userinfo.userid) {
          if (row.status === this.$t('label.PFANS1026VIEW_WSTATUS') || row.status.indexOf(this.$t('label.onenode_step2')) !== -1) {
            this.buttonList[3].disabled = false;
          }
        }
        //add-ws-9/4-加班申请可删除任务
        this.rowid = row.overtimeid;
        this.$store.commit('global/SET_OPERATEOWNER', row.userid);
      },
      //add-ws-9/4-加班申请可删除任务
      getovertime() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2011Store/getOvertime', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].status !== null && response[j].status !== '') {
                response[j].status = getStatusNum(response[j].status);
              }
              if (response[j].applicationdate !== null && response[j].applicationdate !== '') {
                response[j].applicationdate = moment(response[j].applicationdate).format('YYYY-MM-DD');
              }
              if (response[j].reserveovertimedate !== null && response[j].reserveovertimedate !== '') {
                response[j].reserveovertimedate = moment(response[j].reserveovertimedate).format('YYYY-MM-DD');
              }
              if (response[j].reservesubstitutiondate !== null && response[j].reservesubstitutiondate !== '') {
                response[j].reservesubstitutiondate = moment(response[j].reservesubstitutiondate).format('YYYY-MM-DD');
              }
              if (response[j].actualsubstitutiondate !== null && response[j].actualsubstitutiondate !== '') {
                response[j].actualsubstitutiondate = moment(response[j].actualsubstitutiondate).format('YYYY-MM-DD');
              }
              if (response[j].overtimetype !== null && response[j].overtimetype !== '') {
                let letOvertimetype = getDictionaryInfo(response[j].overtimetype);
                if (letOvertimetype != null) {
                  response[j].overtimetype = letOvertimetype.value1;
                }
              }
              let user = getUserInfo(response[j].userid);
              let nameflg = getOrgInfoByUserId(response[j].userid);
              if (nameflg) {
                response[j].centername = nameflg.centerNmae;
                response[j].groupname = nameflg.groupNmae;
                response[j].teamname = nameflg.teamNmae;
              }
              if (user) {
                response[j].username = user.userinfo.customername;
              }
            }
            this.data = response;
            this.tableList = response;
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      delete() {
        this.loading = true;
        this.$confirm(this.$t('normal.info_02'), this.$t('normal.info'), {
          confirmButtonText: this.$t('button.confirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning',
          center: true,
        }).then(() => {
          this.$store
            .dispatch('PFANS2011Store/deleteLog', {overtimeid: this.rowid})
            .then(response => {
              this.getovertime();
              this.$store.commit('global/SET_OPERATEID', '');
              Message({
                message: this.$t('normal.info_03'),
                type: 'success',
                duration: 2 * 1000,
              });
              this.loading = false;
            })
            .catch(error => {
              this.$message.error({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        }).catch(() => {
          this.$message.info({
            type: 'info',
            message: this.$t('normal.info_04'),
          });
          this.loading = false;
        });
      },
      //add-ws-9/4-加班申请可删除任务
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2011FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS2011FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
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
            name: 'PFANS2011FormView',
            params: {
              _id: this.rowid,
              disabled: false,
              // NT_PFANS_20210305_BUG_100 [加班时长]组件活性控制
              action: "view"
            },
          });
        }
        //add-ws-9/4-加班申请可删除任务
        if (val === 'delete') {
          if (this.row === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.delete();
        }
        //add-ws-9/4-加班申请可删除任务
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
