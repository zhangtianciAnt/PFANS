<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
      @disabled="setdisabled"
      ref="container"
      @end="end"
      v-loading="loading"
      :defaultStart="defaultStart"
      @workflowState="workflowState"
      :workflowCode="workflowCode"
      @StartWorkflow="checkWorkFlow"
    >
      <div slot="customize">
        <EasyNormalTable
          :columns="columns"
          :data="data"
          :rowid="row_id"
          @rowClick="rowClick"
          :showSelection="showSelection"
          :handleShow="handleShow"
          @handleEdit="handleEdit"
          @handleView="handleView"
          :selectable="selectable" :rowClassName="rowClassName"
          ref="table">
        </EasyNormalTable>
      </div>
    </EasyNormalContainer>
    <PFANS2013Pop :params="urlparams" :url="url" ref="PFANS2013Pop"></PFANS2013Pop>
  </div>
</template>

<script>
  import PFANS2013Pop from '@/components/EasyPop/PFANS2013Pop';
  import EasyNormalTable from '@/components/EasyNormalTable/index2.vue';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {getDictionaryInfo, getUserInfo} from '../../../../utils/customize';

  export default {
    name: 'PFANS2010FormView',
    components: {
      PFANS2013Pop,
      EasyNormalTable,
      EasyNormalContainer,
    },
    data() {
      return {
        centerDialogVisible:false,
        centerDialogVisible1:false,
        url: '',
        urlparams: '',
        defaultStart: false,
        showSelection: true,
        uplist: [],
        dateInfo: [],
        disdateflg: '',
        loading: false,
        exitdate: '',
        workflowCode: '',
        title: 'title.PFANS2010FOMRVIEW',
        data: [],
        rowid: '',
        row_id: 'attendance_id',
        form: {
          attendanceid: '',
          recognitionstate: '1',
        },
        columns: [
          {
            code: 'dates',
            label: 'label.PFANS2010VIEW_APPLICATION',
            labelClass: 'pfans2010view_column_1',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'SERVICE',
            label: 'label.PFANS2010VIEW_SERVICE',
            labelClass: 'pfans2010view_column_2',
            child: [
              {
                code: 'normal',
                label: 'label.PFANS2010VIEW_NORMAL',
                labelClass: 'pfans2010view_column_3',
                width: 90,
                fix: false,
                filter: true,
              }, {
                code: 'ordinaryindustry',
                label: 'label.PFANS2010VIEW_OVERTIME',
                labelClass: 'pfans2010view_column_3',
                width: 90,
                fix: false,
                filter: true,
              }, {
                code: 'weekendindustry',
                label: 'label.PFANS2010VIEW_RETIREMENT',
                labelClass: 'pfans2010view_column_3',
                width: 90,
                fix: false,
                filter: true,
              }, {
                code: 'statutoryresidue',
                label: 'label.PFANS2010VIEW_HOLIDAYS',
                labelClass: 'pfans2010view_column_3',
                width: 90,
                fix: false,
                filter: true,
              },
              // {
              //   code: 'annualrestday',
              //   label: 'label.PFANS2010VIEW_EVERYYEAR',
              //   labelClass: 'pfans2010view_column_3',
              //   width: 110,
              //   fix: false,
              //   filter: true,
              //
              // },
              {
                code: 'specialday',
                label: 'label.PFANS2010VIEW_OCCASIONS',
                labelClass: 'pfans2010view_column_3',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'youthday',
                label: 'label.PFANS2010VIEW_YOUTHDAY',
                labelClass: 'pfans2010view_column_3',
                width: 100,
                fix: false,
                filter: true,
              }, {
                code: 'womensday',
                label: 'label.PFANS2010VIEW_WOMENSDAY',
                labelClass: 'pfans2010view_column_3',
                width: 100,
                fix: false,
                filter: true,
              },
            ],
          },
          {
            code: 'annualrest',
            label: 'label.PFANS2010VIEW_INHUGH',
            labelClass: 'pfans2010view_column_6',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            code: 'daixiu',
            label: 'label.PFANS2010VIEW_DAYOFF',
            labelClass: 'pfans2010view_column_6',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            code: 'welfare',
            label: 'label.PFANS2010VIEW_WELFARE',
            labelClass: 'pfans2010view_column_6',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'SICKLEAVE',
            label: 'label.PFANS2010VIEW_SICKLEAVE',
            labelClass: 'pfans2010view_column_4',
            child: [
              {
                code: 'shortsickleave',
                label: 'label.PFANS2010VIEW_SHORT',
                labelClass: 'pfans2010view_column_5',
                width: 100,
                fix: false,
                filter: true,
              },
              {
                code: 'longsickleave',
                label: 'label.PFANS2010VIEW_LONG',
                labelClass: 'pfans2010view_column_5',
                width: 100,
                fix: false,
                filter: true,
              },
            ],
          },
          {
            code: 'compassionateleave',
            label: 'label.PFANS2010VIEW_LEAVE',
            labelClass: 'pfans2010view_column_7',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            code: 'nursingleave',
            label: 'label.PFANS2010VIEW_MATERNITY',
            labelClass: 'pfans2010view_column_7',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'absenteeism',
            label: 'label.PFANS2010VIEW_ABSENCE',
            labelClass: 'pfans2010view_column_7',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            code: 'recognitionstate',
            label: 'label.PFANS2010VIEW_RECOGNITION',
            labelClass: 'pfans2010view_column_9',
            width: 110,
            fix: false,
            filter: true,
          },
          // {
          //   code: 'tleaveearly',
          //   label: 'label.PFANS2010VIEW_LEAVEEARLY7',
          //   labelClass: 'pfans2010view_column_10',
          //   width: 110,
          //   fix: false,
          //   filter: true,
          //   type:'tags',
          // },
          // {
          //   code: 'leaveearly',
          //   label: 'label.PFANS2010VIEW_LEAVEEARLY2',
          //   labelClass: 'pfans2010view_column_10',
          //   width: 110,
          //   fix: false,
          //   filter: true,
          //   type:'tags',
          // },
        ],
        totalAbsenteeism: false,
        handleShow:true,
        xiuributtonshow:true,
        buttonList: [
          {'key': 'recognition', 'name': 'button.recognition', 'disabled': false, 'icon': 'el-icon-check'},
          {'key': 'recognitionno', 'name': 'button.recognitionno', 'disabled': false, 'icon': 'el-icon-check'},
        ],
        linshiid:'',
      };
    },
    methods: {

      checkWorkFlow() {
        //考勤是否全部承认
        let count = 0;
        for (let item of this.data) {
          if (item.recognitionstate === this.$t('label.PFANS2010VIEW_RECOGNITION1') || item.recognitionstate === '') {
            count = count + 1;
          }
        }

        if (count != this.data.length - 1) {
          Message({
            message: '承认考勤后，才可发起审批！',
            type: 'error',
            duration: 5 * 1000,
          });
        } else {
          this.$refs.container.$refs.workflow.startWorkflow();
        }
      },
      selectable(row, index) {
        if ((index != 0 && row.recognitionstate === this.$t('label.PFANS2010VIEW_RECOGNITION0'))) {
          return true;
        } else {
          return false;
        }
      },
      //add-ws-考勤设置休日背景色
      getDay() {
        this.loading = true;
        this.$store
          .dispatch('PFANS8007Store/getList', {})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              if (moment(response[i].workingdate).format('MM') === this.linshiid.split(',')[2]) {
                this.dateInfo.push({
                  dateflg: moment(response[i].workingdate).format('YYYY-MM-DD'),
                  type: response[i].type,
                });
              }
            }
            // this.getAttendancelist();
          });
      },
      //add-ws-考勤设置休日背景色
      rowClassName({row, rowIndex}) {
        //add-ws-考勤设置休日背景色
        for (let i = 0; i < this.dateInfo.length; i++) {
          if (this.dateInfo[i].type === '4') {
            if (this.dateInfo[i].dateflg === row.dates) {
              return 'white';
            }
          } else {
            if (this.dateInfo[i].dateflg === row.dates) {
              row.absenteeism = '';
              this.totalAbsenteeism = true;
              this.xiuributtonshow = false;
              return 'sub_bg_color_Darkgrey';
            }
          }
        }

        //ccm 入职离职后考勤颜色   from
        let userid = row.user_id;
        let user = getUserInfo(userid);
        let resignationdate = '';
        let enterdate = '';
        if (user) {
          resignationdate = user.userinfo.resignation_date;
          enterdate = user.userinfo.enterday;
        }
        //入职
        if (moment(row.dates).format('YYYY-MM-DD') < moment(enterdate).format('YYYY-MM-DD')) {
          if (row.dates === this.$t('label.PFANS1012VIEW_ACCOUNT')) {
            return 'white';
          } else {
            row.absenteeism = '';
            this.totalAbsenteeism = true;
            this.xiuributtonshow = false;
            return 'sub_bg_color_Ral';
          }
        }
        //离职
        if (moment(row.dates).format('YYYY-MM-DD') > moment(resignationdate).format('YYYY-MM-DD')) {
          if (row.dates === this.$t('label.PFANS1012VIEW_ACCOUNT')) {
            return 'white';
          } else {
            row.absenteeism = '';
            this.totalAbsenteeism = true;
            this.xiuributtonshow = false;
            return 'sub_bg_color_Ral';
          }
        }
        //ccm 入职离职后考勤颜色   to

        //add-ws-考勤设置休日背景色
        if (moment(row.dates).format('E') == 6 || moment(row.dates).format('E') == 7) {
          row.absenteeism = '';
          this.totalAbsenteeism = true;
          this.xiuributtonshow = false;
          return 'sub_bg_color_Darkgrey';
        }
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disabled = val;
        }
      },
      rowClick(row) {
        this.rowid = row.attendanceid;

      },
      //add_fjl_05/13   --添加审批正常结束后，自动变成承认状态
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
          this.updStatus1(0);
        } else if (val.state === '2') {
          this.form.status = '4';
          this.updStatus();
        }
      },
      end(val) {
        this.updStatus1(0);
      },
      updStatus() {
        if (this.linshiid !== null && this.linshiid !== '') {
          let us = this.linshiid.split(',');
          this.form.user_id = us[0];
          this.form.years = us[1];
          this.form.months = us[2];
        }
        this.loading = true;
        this.$store
          .dispatch('PFANS2010Store/updStatus', this.form)
          .then(response => {
            this.loading = false;
            //this.data = response;
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
      //add_fjl_05/13   --添加审批正常结束后，自动变成承认状态

      // add 0622 ccm --审批被驳回后，当月考勤数据全部变为未承认状态
      updStatus1(val) {
        if (this.linshiid !== null && this.linshiid !== '') {
          let us = this.linshiid.split(',');
          this.form.user_id = us[0];
          this.form.years = us[1];
          this.form.months = us[2];
        }
        this.loading = true;
        this.$store
          .dispatch('PFANS2010Store/updStatus1', this.form)
          .then(response => {
            this.loading = false;
            this.getAttendancelist();
            if (val === 1) {
              Message({
                message: this.$t('normal.success_02'),
                type: 'success',
                duration: 5 * 1000,
              });
            }
            this.$refs.table.$refs.eltable.clearSelection();
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
      // add 0622 ccm --审批被驳回后，当月考勤数据全部变为未承认状态
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'back') {
          this.$router.push({
            name: 'PFANS2010View',
          });
        } else if (val === 'recognition') {
          if (this.$refs.table.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          debugger;
          let letexitdate = '0';
          this.exitdate = getUserInfo(this.linshiid.split(',')[0]).userinfo.resignation_date;
          if (this.exitdate != '') {
            if (moment(this.exitdate).format('YYYY-MM') === moment(new Date()).format('YYYY-MM')) {
              letexitdate = '1';
            }
          }
          let dic = getDictionaryInfo('PR064001');
          if (dic !== null) {
            if (moment(new Date()).format('DD') >= Number(dic.value1)) {
              if (moment(new Date()).format('MM') === moment(this.disdateflg).format('MM')) {
                if (letexitdate === '0') {
                  Message({
                    message: this.$t('label.PFANS2010VIEW_RECOGNITIONDAYERR'),
                    type: 'error',
                    duration: 2 * 1000,
                  });
                  return;
                }
              }
            } else {
              if (letexitdate === '0') {
                Message({
                  message: this.$t('label.PFANS2010VIEW_PLEASE') + dic.value1 + this.$t('label.PFANS2010VIEW_ADMIT'),
                  type: 'error',
                  duration: 2 * 1000,
                });
                return;
              }
            }
          }
          this.loading = true;
          this.uplist = this.$refs.table.selectedList;
          //add ccm 2020729 考勤异常加班审批中的日期，考勤不允许承认
          // this.$store
          //   .dispatch('PFANS2010Store/selectAbnomalandOvertime', {attendance: this.uplist})
          //   .then(response => {
          //     if (response!=null && response !='' && response!=undefined)
          //     {
          //       // let date ='';
          //       // for(let i =0;i<response.length;i++)
          //       // {
          //       //   date += moment(response[i]).format('YYYY-MM-DD')+',';
          //       // }
          //       Message({
          //         //message: this.$t('label.date') +' : ' + date + this.$t('normal.info_15'),
          //         message: this.$t('normal.info_15'),
          //         type: 'info',
          //         duration: 5 * 1000,
          //       });
          //     }
          //     else
          //     {
          //       this.update();
          //     }
          //     this.getAttendancelist();
          //     this.loading = false;
          //     this.$refs.table.$refs.eltable.clearSelection();
          //   })
          //   .catch(error => {
          //     Message({
          //       message: error,
          //       type: 'error',
          //       duration: 5 * 1000,
          //     });
          //     this.loading = false;
          //   });
          let le = [];
          le = this.uplist.filter(item => (item.leaveearly == this.$t('label.PFANS2010VIEW_LEAVEEARLY3') || item.leaveearly == this.$t('label.PFANS2010VIEW_LEAVEEARLY4')));
          if (le.length > 0)
          {
            //弹窗警告
            Message({
              message: this.$t('label.PFANS3006VIEW_CARRYOUT5'),
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          }
          else
          {
            le = this.uplist.filter(item => (item.leaveearly == this.$t('label.PFANS2010VIEW_LEAVEEARLY5')));
            if (le.length>0)
            {
              //弹窗选择是否继续操作
              this.$confirm(this.$t('label.PFANS3006VIEW_CARRYOUT4'), this.$t('normal.info'), {
                confirmButtonText: this.$t('button.confirm'),
                cancelButtonText: this.$t('button.cancel'),
                type: 'warning',
              }).then(() => {
                this.loading = true;
                this.update();
                this.getAttendancelist();
                this.loading = false;
              }).catch(() => {
                this.loading = false;
                this.$message({
                  type: 'info',
                  message: this.$t('label.PFANS1026FORMVIEW_tipis1'),
                });
              });
            }
            else
            {
              this.loading = true;
              this.update();
              this.getAttendancelist();
              this.loading = false;
            }
          }
          //add ccm 2020729 考勤异常加班审批中的日期，考勤不允许承认

        } else if (val === 'recognitionno') {
          this.updStatus1(1);
        }
      },
      update() {
        //this.form.attendanceid = this.uplist[val].attendanceid;
        //val = val + 1;
        this.$store
          .dispatch('PFANS2010Store/update', {attendance: this.uplist})
          .then(response => {
            // if(val < this.uplist.length){
            //   this.update(val);
            // }else{
            //   this.data = response;
            this.getAttendancelist();
            this.loading = false;
            Message({
              message: this.$t('normal.success_02'),
              type: 'success',
              duration: 5 * 1000,
            });

            this.$refs.table.$refs.eltable.clearSelection();
            // }

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
      getAttendancelist() {
        let parameter = {
          user_id: this.linshiid.split(',')[0],
          years: this.linshiid.split(',')[1],
          months: this.linshiid.split(',')[2],
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS2010Store/getAttendancelist1', parameter)
          .then(response => {

            let tableabsenteeism = [];

            for (let j = 0; j < response.length; j++) {
              // response[j].dates = moment(response[j].dates).format("YYYY-MM-DD");
              this.disdateflg = response[0].dates;
              if (response[j].recognitionstate === '0') {
                if (this.$i18n) {
                  response[j].recognitionstate1 = '0';
                  response[j].recognitionstate = this.$t('label.PFANS2010VIEW_RECOGNITION0');
                }
              } else if (response[j].recognitionstate === '1') {
                if (this.$i18n) {
                  response[j].recognitionstate1 = '1';
                  response[j].recognitionstate = this.$t('label.PFANS2010VIEW_RECOGNITION1');
                }
              }

              //add ccm 0813
              if (response[j].leaveearly === '0')
              {
                if (this.$i18n) {
                  response[j].leaveearly = this.$t('label.PFANS2010VIEW_LEAVEEARLY3');
                }
              }
              else if (response[j].leaveearly === '1')
              {
                if (this.$i18n) {
                  response[j].leaveearly = this.$t('label.PFANS2010VIEW_LEAVEEARLY4');
                }
              }
              else if (response[j].leaveearly === '2')
              {
                if (this.$i18n) {
                  response[j].leaveearly = this.$t('label.PFANS2010VIEW_LEAVEEARLY5');
                }
              }
              else if (response[j].leaveearly === '3')
              {
                if (this.$i18n) {
                  response[j].leaveearly = this.$t('label.PFANS2010VIEW_LEAVEEARLY6');
                }
              }
              //add ccm 0813

              //add ccm 0904 加班审批状态显示
              if (response[j].tleaveearly === '0')
              {
                if (this.$i18n) {
                  response[j].tleaveearly = this.$t('label.PFANS2010VIEW_LEAVEEARLY3');
                }
              }
              else if (response[j].tleaveearly === '1')
              {
                if (this.$i18n) {
                  response[j].tleaveearly = this.$t('label.PFANS2010VIEW_LEAVEEARLY4');
                }
              }
              else if (response[j].tleaveearly === '2')
              {
                if (this.$i18n) {
                  response[j].tleaveearly = this.$t('label.PFANS2010VIEW_LEAVEEARLY5');
                }
              }
              else if (response[j].tleaveearly === '3')
              {
                if (this.$i18n) {
                  response[j].tleaveearly = this.$t('label.PFANS2010VIEW_LEAVEEARLY6');
                }
              }
              //add ccm 0904 加班审批状态显示

              //add ccm
              if (response[j].absenteeism === null || response[j].absenteeism === '') {
                response[j].absenteeism = response[j].tabsenteeism;
              }

              //add ccm 0804
              if (response[j].absenteeism !=null && response[j].absenteeism!='')
              {
                  if (Number(response[j].tenantid).toFixed(2) >= Number(response[j].absenteeism).toFixed(2))
                  {
                    response[j].EnoughTime = true;
                  }
                  else
                  {
                    response[j].EnoughTime = false;
                  }
              }
              //add ccm 0804

              //add ccm
              if (response[j].shortsickleave === null || response[j].shortsickleave === '') {
                response[j].shortsickleave = response[j].tshortsickleave;
              }
              if (response[j].longsickleave === null || response[j].longsickleave === '') {
                response[j].longsickleave = response[j].tlongsickleave;
              }
              if (response[j].compassionateleave === null || response[j].compassionateleave === '') {
                response[j].compassionateleave = response[j].tcompassionateleave;
              }
              //add ccm 0803  按钮分情况显示
              response[j].xiuributtonshow = true;
              let k = 0;
              for (let i = 0; i < this.dateInfo.length; i++) {
                    if (this.dateInfo[i].type != '4') {
                      if (this.dateInfo[i].dateflg === moment(response[j].dates).format('YYYY-MM-DD')) {
                        response[j].xiuributtonshow = false;
                      }
                    }
                    else
                    {
                      if (this.dateInfo[i].dateflg === moment(response[j].dates).format('YYYY-MM-DD')) {
                        response[j].xiuributtonshow = true;
                        k = 1;
                      }
                    }
              }
              if (k ===1)
              {
                continue;
              }
               let userid = this.linshiid.split(',')[0];
               let user = getUserInfo(userid);
               let resignationdate = '';
               let enterdate = '';
               if (user) {
                 resignationdate = user.userinfo.resignation_date;
                 enterdate = user.userinfo.enterday;
               }
               //入职
               if (moment(response[j].dates).format('YYYY-MM-DD') < moment(enterdate).format('YYYY-MM-DD')) {
                 if (response[j].dates != this.$t('label.PFANS1012VIEW_ACCOUNT')) {
                   response[j].xiuributtonshow = false;
                 }
               }
               //离职
               if (moment(response[j].dates).format('YYYY-MM-DD') > moment(resignationdate).format('YYYY-MM-DD')) {
                 if (response[j].dates != this.$t('label.PFANS1012VIEW_ACCOUNT')) {
                   response[j].xiuributtonshow = false;
                 }
               }
               //add-ws-考勤设置休日背景色
               if (moment(response[j].dates).format('E') == 6 || moment(response[j].dates).format('E') == 7) {
                 response[j].xiuributtonshow = false;
               }
              //add ccm 0803 按钮分情况显示

            }
            let res = [];
            let res1 = [];
            let yearMonth = moment(Date.parse(this.linshiid.split(',')[1] + '-' + this.linshiid.split(',')[2] + '-01'));
            let start = moment(yearMonth).startOf('month');
            let end = moment(yearMonth).endOf('month');

            for (let day = start; day <= end; day.add(1, 'd')) {
              let daydata = response.filter(item => moment(item.dates).format('YYYY-MM-DD') === moment(day).format('YYYY-MM-DD'));
              if (daydata.length > 0) {
                daydata[0].dates = moment(daydata[0].dates).format('YYYY-MM-DD');
                res.push(daydata[0]);
              }
            }

            //add CCM 合计行--from
            var total_normal = 0;
            var total_ordinaryindustry = 0;
            var total_weekendindustry = 0;
            var total_statutoryresidue = 0;
            // var total_annualrestday = 0;
            var total_specialday = 0;
            var total_youthday = 0;
            var total_womensday = 0;
            var total_annualrest = 0;
            var total_daixiu = 0;
            var total_welfare = 0;
            var total_shortsickleave = 0;
            var total_longsickleave = 0;
            var total_compassionateleave = 0;
            var total_nursingleave = 0;
            var total_absenteeism = 0;

            for (var i = 0; i < res.length; i++) {
              total_normal += parseFloat(res[i]['normal'] === undefined ? '0' : (res[i]['normal'] === null || res[i]['normal'] === '' ? '0' : res[i]['normal']));
              total_ordinaryindustry += parseFloat(res[i]['ordinaryindustry'] === undefined ? '0' : (res[i]['ordinaryindustry'] === null || res[i]['ordinaryindustry'] === '' ? '0' : res[i]['ordinaryindustry']));
              total_weekendindustry += parseFloat(res[i]['weekendindustry'] === undefined ? '0' : (res[i]['weekendindustry'] === null || res[i]['weekendindustry'] === '' ? '0' : res[i]['weekendindustry']));
              total_statutoryresidue += parseFloat(res[i]['statutoryresidue'] === undefined ? '0' : (res[i]['statutoryresidue'] === null || res[i]['statutoryresidue'] === '' ? '0' : res[i]['statutoryresidue']));
              // total_annualrestday += parseFloat(res[i]['annualrestday'] === undefined ? '0' : (res[i]['annualrestday'] === null || res[i]['annualrestday'] === '' ? '0' : res[i]['annualrestday']));
              total_specialday += parseFloat(res[i]['specialday'] === undefined ? '0' : (res[i]['specialday'] === null || res[i]['specialday'] === '' ? '0' : res[i]['specialday']));
              total_youthday += parseFloat(res[i]['youthday'] === undefined ? '0' : (res[i]['youthday'] === null || res[i]['youthday'] === '' ? '0' : res[i]['youthday']));
              total_womensday += parseFloat(res[i]['womensday'] === undefined ? '0' : (res[i]['womensday'] === null || res[i]['womensday'] === '' ? '0' : res[i]['womensday']));
              total_annualrest += parseFloat(res[i]['annualrest'] === undefined ? '0' : (res[i]['annualrest'] === null || res[i]['annualrest'] === '' ? '0' : res[i]['annualrest']));
              total_daixiu += parseFloat(res[i]['daixiu'] === undefined ? '0' : (res[i]['daixiu'] === null || res[i]['daixiu'] === '' ? '0' : res[i]['daixiu']));
              total_welfare += parseFloat(res[i]['welfare'] === undefined ? '0' : (res[i]['welfare'] === null || res[i]['welfare'] === '' ? '0' : res[i]['welfare']));
              total_shortsickleave += parseFloat(res[i]['shortsickleave'] === undefined ? '0' : (res[i]['shortsickleave'] === null || res[i]['shortsickleave'] === '' ? '0' : res[i]['shortsickleave']));
              total_longsickleave += parseFloat(res[i]['longsickleave'] === undefined ? '0' : (res[i]['longsickleave'] === null || res[i]['longsickleave'] === '' ? '0' : res[i]['longsickleave']));
              total_compassionateleave += parseFloat(res[i]['compassionateleave'] === undefined ? '0' : (res[i]['compassionateleave'] === null || res[i]['compassionateleave'] === '' ? '0' : res[i]['compassionateleave']));
              total_nursingleave += parseFloat(res[i]['nursingleave'] === undefined ? '0' : (res[i]['nursingleave'] === null || res[i]['nursingleave'] === '' ? '0' : res[i]['nursingleave']));
              total_absenteeism += parseFloat(res[i]['absenteeism'] === undefined ? '0' : (res[i]['absenteeism'] === null || res[i]['absenteeism'] === '' ? '0' : res[i]['absenteeism']));
            }
            res1.push({
              dates: this.$t('label.PFANS1012VIEW_ACCOUNT'),
              normal: total_normal,
              ordinaryindustry: total_ordinaryindustry,
              weekendindustry: total_weekendindustry,
              statutoryresidue: total_statutoryresidue,
              // annualrestday: total_annualrestday,
              specialday: total_specialday,
              youthday: total_youthday,
              womensday: total_womensday,
              annualrest: total_annualrest,
              daixiu: total_daixiu,
              welfare: total_welfare,
              shortsickleave: total_shortsickleave,
              longsickleave: total_longsickleave,
              compassionateleave: total_compassionateleave,
              nursingleave: total_nursingleave,
              absenteeism: total_absenteeism,
              recognitionstate: null,
            });
            for (var k = 0; k < res.length; k++) {
              res1.push(res[k]);
            }
            //add CCM 合计行--end
            this.data = res1;
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

      //add ccm 0804
      handleEdit(row)
      {
        let lengthtime = Number(row.absenteeism).toFixed(2);
        if (row.teamid!=null && row.teamid!='')
        {
          lengthtime = Number(row.teamid).toFixed(2) - Number(row.absenteeism).toFixed(2);
        }
        this.$router.push({
          name: 'PFANS2016FormView',
          params: {
            _id: "",
            _lengthtime:lengthtime,
            _day:row.dates,
            _user:row.user_id,
            _month:row.months,
            _year:row.years,
            disabled: true,
          },
        });
      },
      handleView(row)
      {
        this.url = '';
        this.urlparams = '';
        this.url = 'PFANS2013FormView';
        this.urlparams = {'_id': row.user_id, '_dates':moment(row.dates).format('YYYY-MM-DD'), 'disabled': false};
        this.$refs.PFANS2013Pop.open = true;
      }
      //add ccm 0804
    },
    mounted() {
      //ADD_FJL_05/14
      if (this.$route.params._id !== null && this.$route.params._id !== '') {
        this.linshiid = this.$route.params._id;
        let us = this.linshiid.split(',');
        let userid = us[0];
        this.loading = true;
        this.$store
          .dispatch('personalCenterStore/getPersonalCenterinfo', {'userid': userid})
          .then(response => {
            let roles = '';
            let num = 0;
            let numz = 0;
            if (response.userAccount && response.userAccount.roles && response.userAccount.roles.length > 0) {
              for (let role of response.userAccount.roles) {
                roles = roles + role.description;
              }
              if (this.$i18n) {
                if (roles.indexOf('总经理') != -1) {
                  numz++;
                  num++;
                } else if (roles.toUpperCase().indexOf('CENTER') != -1) {
                  num++;
                } else if (roles.toUpperCase().indexOf('GM') != -1) {
                  num++;
                } else if (roles.toUpperCase().indexOf('TL') != -1) {
                  num++;
                }
              }
            }
            if (num === 0) {
              //普通社員审批
              //upd by lin 都是一次上司审批 start
              // this.workflowCode = 'W0002'
              this.workflowCode = 'W0069';
              //upd by lin 都是一次上司审批 end
            } else if (numz === 0) {
              //领导审批
              this.workflowCode = 'W0069';
            } else {
              //总经理的考勤管理人事部长审批
              this.workflowCode = 'W0083';
            }
            this.loading = false;
          });
      }
      //ADD_FJL_05/14
      //add-ws-考勤设置休日背景色
      this.getDay();
      //add-ws-考勤设置休日背景色
      this.getAttendancelist();
      // this.$store.commit('global/SET_OPERATEID', '');

    },
    watch: {
      data: {
        handler(val) {
          if (this.totalAbsenteeism) {
            let total = 0;
            for (let item of val) {
              if (item.dates === '合计') {
                continue;
              }

              total = total + Number(item.absenteeism);
            }

            if (total > 0) {
              val[0].absenteeism = total;
            }
          }

          this.totalAbsenteeism = false;
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true,
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .pfans2010view_column_1 {
    height: 81px;
    background: #425E72;
    color: #ffffff;
  }

  .pfans2010view_column_2 {
    height: 40px;
    background: #5CBFA3;
    color: #ffffff;
    text-align: center;
  }

  .pfans2010view_column_3 {
    height: 40px;
    background: #AEDFD1;
    color: #ffffff;
  }

  .pfans2010view_column_4 {
    height: 40px;
    background: #2696C3;
    color: #ffffff;
    text-align: center;
  }

  .pfans2010view_column_5 {
    height: 40px;
    background: #93CBE1;
    color: #ffffff;
  }

  .pfans2010view_column_6 {
    height: 81px;
    background: #F2BC6A;
    color: #ffffff;
  }

  .pfans2010view_column_7 {
    height: 81px;
    background: #E5575E;
    color: #ffffff;
  }

  .pfans2010view_column_8 {
    height: 40px;
    background: #F2ABAF;
    color: #ffffff;
  }

  .pfans2010view_column_9 {
    height: 81px;
    background: #CCCCCC;
    color: #ffffff;
  }

  .pfans2010view_column_10 {
    height: 81px;
    background: #9E9E9E;
    color: #ffffff;
  }
</style>

