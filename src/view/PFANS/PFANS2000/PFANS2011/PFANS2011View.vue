<template>
  <EasyNormalTable
    :title="title"
    :columns="columns"
    :data="data"
    :rowid="row_id"
    :buttonList="buttonList"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading"
  >
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {
    getDictionaryInfo,
    getStatus,
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
      rowClick(row) {
        //add-ws-9/4-加班申请可删除任务
        debugger
        this.buttonList[3].disabled = true;
        if (row.userid === this.$store.getters.userinfo.userid ) {
         if(row.status === this.$t('label.PFANS1026VIEW_WSTATUS')){
           this.buttonList[3].disabled = false;
         }
        }
        //add-ws-9/4-加班申请可删除任务
        this.rowid = row.overtimeid;
      },
      //add-ws-9/4-加班申请可删除任务
      getovertime() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2011Store/getOvertime', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].status !== null && response[j].status !== '') {
                response[j].status = getStatus(response[j].status);
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
