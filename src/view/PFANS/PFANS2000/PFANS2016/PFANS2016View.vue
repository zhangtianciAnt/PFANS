<template>
  <EasyNormalTable
    ref="dataTable"
    v-loading="loading"
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row_id" :selectable="selectInit"
    :showSelection="true"
    :title="title"
    @buttonClick="buttonClick"
    @reget="getAbnormalList"
    @rowClick="rowClick"
  >
    <!--    <el-date-picker-->
    <!--      :placeholder="$t('normal.error_09')"-->
    <!--      @change="changed"-->
    <!--      slot="customize"-->
    <!--      style="width:11vw"-->
    <!--      type="month"-->
    <!--      v-model="months">-->
    <!--    </el-date-picker>-->

    <!--    add-ws-9/29-禅道任务547-->
    <el-date-picker
      slot="customize"
      v-model="workinghours"
      :end-placeholder="$t('label.enddate')"
      :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
      :start-placeholder="$t('label.startdate')"
      class="bigWidth"
      style="margin-right:1vw"
      type="daterange"
      unlink-panels
      @change="filterInfo"
    ></el-date-picker>
    <!--    add-ws-9/29-禅道任务547-->
  </EasyNormalTable>
</template>

<script>
import EasyNormalTable from '@/components/EasyNormalTable';
import {Message} from 'element-ui';
import moment from 'moment';
import {getDictionaryInfo, getOrgInfoByUserId, getStatusNum, getUserInfo} from '@/utils/customize';

export default {
  name: 'PFANS2016View',
  components: {
    EasyNormalTable,
  },
  data() {
    return {
      // add-ws-9/29-禅道任务547
      tableList: [],
      workinghours: [moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format('YYYY-MM-DD'), moment(new Date()).endOf('month').format('YYYY-MM-DD')],
      working: '',
      starttime: moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format('YYYY-MM-DD'),
      endTime: moment(new Date()).endOf('month').format('YYYY-MM-DD'),
      // add-ws-9/29-禅道任务547
      loading: false,
      title: 'title.PFANS2016VIEW',
      months: moment(new Date()).format('YYYY-MM'),
      data: [],
      selectedlist: [],
      columns: [
        {
          code: 'username',
          label: 'label.user_name',
          width: 90,
          fix: false,
          filter: false,
        },
        {
          code: 'centername',
          label: 'label.center',
          width: 160,
          fix: false,
          filter: false,
        },
        {
          code: 'groupname',
          label: 'label.group',
          width: 160,
          fix: false,
          filter: false,
        },
        {
          code: 'teamname',
          label: 'label.team',
          width: 160,
          fix: false,
          filter: false,
        },
        {
          code: 'applicationdate',
          label: 'label.application_date',
          width: 130,
          fix: false,
          filter: false,
        },
        {
          code: 'errortype',
          label: 'label.PFANS2016VIEW_ERRORTYPE',
          width: 130,
          fix: false,
          filter: true,
        },
        {
          code: 'lengthtime',
          label: 'label.PFANS2016VIEW_PERIODLENGTH',
          width: 140,
          fix: false,
          filter: false,
        },
        // add-ws-考勤异常实际值添加
        {
          code: 'relengthtime',
          label: 'label.PFANS2016VIEW_REPERIODLENGTH',
          width: 140,
          fix: false,
          filter: false,
        },
        // add-ws-考勤异常实际值添加
        {
          code: 'occurrencedate',
          label: 'label.PFANS2016VIEW_OCCURRENCEDATE',
          width: 100,
          fix: false,
          filter: true,
        },
        {
          code: 'finisheddate',
          label: 'label.PFANS2016VIEW_FINISHEDDATE',
          width: 100,
          fix: false,
          filter: true,
        },
        {
          code: 'status',
          label: 'label.approval_status',
          width: 130,
          fix: false,
          filter: false,
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
          key: 'edit',
          name: 'button.update',
          disabled: false,
          icon: 'el-icon-edit',
        },
        {
          key: 'export',
          name: 'button.export',
          disabled: false,
          icon: 'el-icon-download',
        },
        {
          key: 'delete',
          name: 'button.delete',
          disabled: true,
          icon: 'el-icon-delete',
        },
      ],
      rowid: '',
      row_id: 'abnormalid',
      rowdata: {},
    };
  },
  mounted() {
    this.getAbnormalList();
  },
  methods: {
    // add-ws-9/29-禅道任务547
    // filterInfo() {
    //   this.data = this.tableList.slice(0);
    //   if (this.tableList.length > 0) {
    //     //进行时间筛选
    //     this.working = this.getworkinghours(this.workinghours);
    //     this.starttime = this.working.substring(0, 10);
    //     this.endTime = this.working.substring(13, 23);
    //     if (this.starttime != '' || this.endTime != '') {
    //       this.data = this.data.filter(item => {
    //         return (this.starttime <= moment(item.occurrencedate).format('YYYY-MM-DD') && moment(item.finisheddate).format('YYYY-MM-DD') <= this.endTime) ||
    //           (this.starttime > moment(item.occurrencedate).format('YYYY-MM-DD') && moment(item.finisheddate).format('YYYY-MM-DD') <= this.endTime) ||
    //           (this.starttime <= moment(item.occurrencedate).format('YYYY-MM-DD') && this.endTime < moment(item.finisheddate).format('YYYY-MM-DD'));
    //       });
    //     }
    //   }
    // },
    filterInfo() {
      this.working = this.getworkinghours(this.workinghours);
      if (this.working === '') {
        this.starttime = moment(new Date()).startOf('month').format('YYYY-MM-DD');
        this.endTime = moment(new Date()).endOf('month').format('YYYY-MM-DD');
        this.getAbnormalList();
      } else {
        this.starttime = this.working.substring(0, 10);
        this.endTime = this.working.substring(13, 23);
        this.getAbnormalList();
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
    selectInit(row, index) {
      return row.status.indexOf('结束') !== -1;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        }),
      );
    },
    rowClick(row) {
      this.rowid = row.abnormalid;
      //add_fjl_0904_添加逻辑删除data  start
      if (this.$store.getters.userinfo.userid === row.user_id && ((row.status.indexOf(this.$t('normal.todo')) !== -1) || row.status.indexOf(this.$t('label.onenode_step2')) !== -1)) {
        this.buttonList[4].disabled = false;
      } else {
        this.buttonList[4].disabled = true;
      }
      this.rowdata = row;
      //add_fjl_0904_添加逻辑删除data  end
    },
    getAbnormalList() {
      let parameter = {
        occurrencedate: this.starttime,
        finisheddate: this.endTime,
      };
      this.loading = true;
      this.$store
        .dispatch('PFANS2016Store/getFpans2016List', parameter)
        .then(response => {
          for (let j = 0; j < response.length; j++) {

            if (
              response[j].errortype != 'PR013005' &&
              response[j].errortype != 'PR013007'
            ) {
              if (this.$i18n) {
                //UPD_FJL   添加是否有实际时长的判断
                response[j].lengthtime = response[j].lengthtime + this.$t('label.hours');
                if (parseInt(response[j].status) > 4) {
                  response[j].relengthtime = response[j].relengthtime + this.$t('label.hours');
                } else {
                  response[j].relengthtime = '';
                }
                //UPD_FJL
              }
            } else {
              if (this.$i18n) {
                //UPD_FJL   添加是否有实际时长的判断
                response[j].lengthtime = response[j].lengthtime === '4' ? this.$t('label.PFANS2011FROMVIEW_HALFDATE') : this.$t('label.PFANS2016FORMVIEW_QUANTIAN');
                if (parseInt(response[j].status) > 4) {
                  if (parseInt(response[j].relengthtime) >= 8) {
                    response[j].relengthtime = this.$t('label.PFANS2016FORMVIEW_QUANTIAN');
                  } else if (parseInt(response[j].relengthtime) === 4) {
                    response[j].relengthtime = this.$t('label.PFANS2011FROMVIEW_HALFDATE');
                  } else if (parseInt(response[j].relengthtime) === 0) {
                    response[j].relengthtime = this.$t('label.PFANS2016FORMVIEW_UNREST');
                  } else {
                    response[j].relengthtime = '';
                  }
                  // response[j].relengthtime = response[j].relengthtime === "4" ? this.$t("label.PFANS2011FROMVIEW_HALFDATE") : this.$t("label.PFANS2016FORMVIEW_QUANTIAN");
                } else {
                  response[j].relengthtime = '';
                }
                //UPD_FJL
              }
            }

            let user = getUserInfo(response[j].user_id);
            let nameflg = getOrgInfoByUserId(response[j].user_id);
            if (nameflg) {
              response[j].centername = nameflg.centerNmae;
              response[j].groupname = nameflg.groupNmae;
              response[j].teamname = nameflg.teamNmae;
            }
            if (user) {
              response[j].username = user.userinfo.customername;
            }
            // del_fjl
            // add-ws-考勤异常实际值添加
            // if (response[j].status == 7) {
            //   if (this.$i18n) {
            //     response[j].relengthtime =
            //       response[j].relengthtime + this.$t("label.hours");
            //   }
            // }else{
            //   response[j].relengthtime ='';
            // }
            // add-ws-考勤异常实际值添加
            // del_fjl
            if (
              response[j].applicationdate !== null &&
              response[j].applicationdate !== ''
            ) {
              response[j].applicationdate = moment(
                response[j].applicationdate,
              ).format('YYYY-MM-DD');
            }
            //add_fjl    如果状态大于4，显示实际日期
            // if (parseInt(response[j].status) > 4) {
            //   //实际日期
            //   if (response[j].reoccurrencedate !== null && response[j].reoccurrencedate !== '') {
            //     response[j].occurrencedate = moment(response[j].reoccurrencedate).format('YYYY-MM-DD');
            //   }
            //   if (response[j].refinisheddate !== null && response[j].refinisheddate !== '') {
            //     response[j].finisheddate = moment(response[j].refinisheddate).format('YYYY-MM-DD');
            //   }
            // } else {
            //   //预计日期
            if (response[j].occurrencedate !== null && response[j].occurrencedate !== '') {
              response[j].occurrencedate = moment(response[j].occurrencedate).format('YYYY-MM-DD');
            }
            if (response[j].finisheddate !== null && response[j].finisheddate !== '') {
              response[j].finisheddate = moment(response[j].finisheddate).format('YYYY-MM-DD');
            }
            // }
            if (response[j].status !== null && response[j].status !== '') {
              response[j].status = getStatusNum(response[j].status);
            }
            if (response[j].errortype !== null && response[j].errortype !== '') {
              let letErrortype = getDictionaryInfo(response[j].errortype);
              if (letErrortype != null) {
                response[j].errortype = letErrortype.value1;
              }
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
    //ADD_FJL_0904  添加删除data
    deleteData() {
      this.loading = true;
      this.$confirm(this.$t('normal.info_02'), this.$t('normal.info'), {
        confirmButtonText: this.$t('button.confirm'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning',
        center: true,
      }).then(() => {
        this.$store
          .dispatch('PFANS2016Store/deletePfans2016', {abnormalid: this.rowid})
          .then(response => {
            this.getAbnormalList();
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
    //ADD_FJL_0904  添加删除data
    buttonClick(val) {
      this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      //ADD_FJL_0906  添加workfolwurl start
      this.$store.commit('global/SET_WORKFLOWURL', '/PFANS2016View');
      //ADD_FJL_0906  添加workfolwurl end
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
          name: 'PFANS2016FormView',
          params: {
            _id: this.rowid,
            disabled: false,
          },
        });
      }
      if (val === 'insert') {
        this.$router.push({
          name: 'PFANS2016FormView',
          params: {
            _id: '',
            disabled: true,
          },
        });
      }
      //ADD_FJL_0904  添加删除data
      if (val === 'delete') {
        this.deleteData();
      }
      //ADD_FJL_0904  添加删除data
      if (val === 'edit') {
        if (this.rowid === '') {
          Message({
            message: this.$t('normal.info_01'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
        this.$router.push({
          name: 'PFANS2016FormView',
          params: {
            _id: this.rowid,
            disabled: true,
          },
        });
      }
      if (val === 'export') {
        if (this.$refs.dataTable.selectedList.length === 0) {
          Message({
            message: this.$t('normal.info_01'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
        this.selectedlist = this.$refs.dataTable.selectedList;
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [
            this.$t('label.user_name'), // 名称
            this.$t('label.center'), // center
            this.$t('label.group'), // group
            this.$t('label.team'), // team
            this.$t('label.application_date'), // 申请日期
            this.$t('label.PFANS2016VIEW_ERRORTYPE'), // 异常类别
            this.$t('label.PFANS2016VIEW_PERIODLENGTH'), // 时间长度
            this.$t('label.PFANS2016VIEW_OCCURRENCEDATE'), // 开始日
            this.$t('label.PFANS2016VIEW_FINISHEDDATE'), // 完了日
            this.$t('label.cause'), // 事由
          ];
          const filterVal = [
            'username',
            'centername',
            'groupname',
            'teamname',
            'applicationdate',
            'errortype',
            'lengthtime',
            'occurrencedate',
            'finisheddate',
            'cause',
          ];
          const list = this.selectedlist;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS2016'));
        });
      }
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
