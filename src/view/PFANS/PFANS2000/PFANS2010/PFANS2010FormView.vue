<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     :rowid="row_id"
                     :show-summary ="showSummary"
                     :summary-method="getSummaries"
                     @rowClick="rowClick"
                     @buttonClick="buttonClick"
                     v-loading="loading" :rowClassName="rowClassName"
                     @disabled="setdisabled">
    </EasyNormalTable>
  </div>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui';
    import moment from "moment";

    export default {
        name: 'PFANS2010FormView',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                dateInfo: [],
                loading: false,
                title: 'title.PFANS2010FOMRVIEW',
                data: [],
                rowid: '',
                showSummary:true,
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
                                width: 110,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'ordinaryindustry',
                                label: 'label.PFANS2010VIEW_OVERTIME',
                                labelClass: 'pfans2010view_column_3',
                                width: 120,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'weekendindustry',
                                label: 'label.PFANS2010VIEW_RETIREMENT',
                                labelClass: 'pfans2010view_column_3',
                                width: 120,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'statutoryresidue',
                                label: 'label.PFANS2010VIEW_HOLIDAYS',
                                labelClass: 'pfans2010view_column_3',
                                width: 170,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'annualrestday',
                                label: 'label.PFANS2010VIEW_EVERYYEAR',
                                labelClass: 'pfans2010view_column_3',
                                width: 170,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'specialday',
                                label: 'label.PFANS2010VIEW_OCCASIONS',
                                labelClass: 'pfans2010view_column_3',
                                width: 180,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'youthday',
                                label: 'label.PFANS2010VIEW_YOUTHDAY',
                                labelClass: 'pfans2010view_column_3',
                                width: 130,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'womensday',
                                label: 'label.PFANS2010VIEW_WOMENSDAY',
                                labelClass: 'pfans2010view_column_3',
                                width: 130,
                                fix: false,
                                filter: true,
                            },
                        ],
                    },
                    {
                        code: 'annualrest',
                        label: 'label.PFANS2010VIEW_INHUGH',
                        labelClass: 'pfans2010view_column_6',
                        width: 100,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'daixiu',
                        label: 'label.PFANS2010VIEW_DAYOFF',
                        labelClass: 'pfans2010view_column_6',
                        width: 100,
                        fix: false,
                        filter: true,
                    },
                  {
                    code: 'welfare',
                    label: 'label.PFANS2010VIEW_WELFARE',
                    labelClass: 'pfans2010view_column_6',
                    width: 120,
                    fix: false,
                    filter: true,
                  },
                  {
                    code: 'shortsickleave',
                    label: 'label.PFANS2010VIEW_SICKLEAVE',
                    labelClass: 'pfans2010view_column_4',
                    width: 120,
                    fix: false,
                    filter: true,
                  },
                  {
                    code: 'compassionateleave',
                    label: 'label.PFANS2010VIEW_LEAVE',
                    labelClass: 'pfans2010view_column_7',
                    width: 100,
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
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'recognitionstate',
                        label: 'label.PFANS2010VIEW_RECOGNITION',
                        labelClass: 'pfans2010view_column_9',
                        width: 130,
                        fix: false,
                        filter: true,
                    },
                ],
                buttonList: [
                    {'key': 'back', 'name': 'button.back', 'disabled': false, 'icon': 'el-icon-back'},
                    {'key': 'recognition', 'name': 'button.recognition', 'disabled': false, 'icon': 'el-icon-check'}
                ],
            };
        },
        methods: {
          //add-ws-考勤设置休日背景色
          getDay() {
            this.$store
              .dispatch('PFANS8007Store/getList', {})
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  if(moment(response[i].workingdate).format('MM')===moment(new Date()).format('MM')){
                    this.dateInfo.push({
                      dateflg: moment(response[i].workingdate).format('YYYY-MM-DD'),
                      type: response[i].type,
                    });
                  }
                }
              });
          },
          //add-ws-考勤设置休日背景色
          rowClassName({row, rowIndex}){
            //add-ws-考勤设置休日背景色

            for(let i =0;i<this.dateInfo.length;i++){
              if(this.dateInfo[i].type === '4'){
                if(this.dateInfo[i].dateflg === row.dates){
                  return "white";
                }
              }else{
                if(this.dateInfo[i].dateflg === row.dates){
                  return "sub_bg_color_Darkgrey";
                }
              }
            }
            //add-ws-考勤设置休日背景色
            if(moment(row.dates).format("E") == 6 || moment(row.dates).format("E") == 7 ){
              return "sub_bg_color_Darkgrey";
            }

          },
          setdisabled(val){
            if(this.$route.params.disabled){
              this.disabled = val;
            }
          },
            rowClick(row) {
                this.rowid = row.attendanceid;
                this.form.attendanceid = row.attendanceid;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path)
                if (val === 'back') {
                    this.$router.push({
                        name: 'PFANS2010View',
                    });
                }
                else if (val === 'recognition') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.loading = true;
                    this.$store
                        .dispatch('PFANS2010Store/update', this.form)
                        .then(response => {
                            this.data = response;
                            this.getAttendancelist();
                            this.loading = false;
                            Message({
                                message: this.$t('normal.success_02'),
                                type: 'success',
                                duration: 5 * 1000,
                            });
                        })
                        .catch(error => {
                            Message({
                                message: error,
                                type: 'error',
                                duration: 5 * 1000
                            });
                            this.loading = false;
                        })
                }
            },
            getAttendancelist() {
                let parameter = {
                    user_id:this.$route.params.userid,
                    years:this.$route.params.years,
                    months:this.$route.params.months,
                }
                this.loading = true;
                this.$store
                    .dispatch('PFANS2010Store/getAttendancelist', parameter)
                    .then(response => {

                      for (let j = 0; j < response.length; j++) {
                          // response[j].dates = moment(response[j].dates).format("YYYY-MM-DD");
                          if(response[j].recognitionstate === "0"){
                              if (this.$i18n) {
                                  response[j].recognitionstate = this.$t('label.PFANS2010VIEW_RECOGNITION0');
                              }
                          }
                          else{
                              if (this.$i18n) {
                                  response[j].recognitionstate = this.$t('label.PFANS2010VIEW_RECOGNITION1');
                              }
                          }

                          if(response[j].absenteeism === null || response[j].absenteeism === "")
                          {
                              response[j].absenteeism = response[j].tabsenteeism;
                          }
                          if(response[j].shortsickleave === null || response[j].shortsickleave === "")
                          {
                              response[j].shortsickleave = response[j].tshortsickleave;
                          }
                          if(response[j].longsickleave === null || response[j].longsickleave === "")
                          {
                              response[j].longsickleave = response[j].tlongsickleave;
                          }

                      }

                      let res = [];
                      let start = moment().startOf('month');
                      let end = moment().endOf('month');

                      for(let day = start;day <= end;day.add(1,'d')){
                        let daydata = response.filter(item => moment(item.dates).format("YYYY-MM-DD") === moment(day).format("YYYY-MM-DD"))
                        if(daydata.length > 0){
                          daydata[0].dates = moment(daydata[0].dates).format("YYYY-MM-DD")
                          res.push(daydata[0]);
                        }else{
                          res.push({
                            dates:moment(day).format("YYYY-MM-DD"),
                            absenteeism:8
                          });
                        }
                      }

                        this.data = res;
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
          getSummaries(param) {
            debugger;
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
              if (index === 0) {
                sums[index] = '合计';
                return;
              }
              const values = data.map(item => Number(item[column.property]));
              if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
              } else {
                sums[index] = '-';
              }
            });

            return sums;
          },
        },
        mounted() {
          //add-ws-考勤设置休日背景色
          this.getDay();
          //add-ws-考勤设置休日背景色
            this.getAttendancelist();
            this.$store.commit('global/SET_OPERATEID', '');
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
    height: 81px;
    background: #2696C3;
    color: #ffffff;
    text-align: center;
  }
  .pfans2010view_column_5 {
    height: 81px;
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
</style>

