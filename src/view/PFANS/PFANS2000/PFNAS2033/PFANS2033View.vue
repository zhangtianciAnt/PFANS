<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title"
      @disabled="setdisabled"
      @buttonClick="buttonClick"
      ref="container"
      v-loading="loading"

    >
      <div slot="customize">
    <EasyNormalTable :columns="columns"
                     :data="data" :rowClassName="rowClassName"
    ref="table">
    </EasyNormalTable>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable/index2.vue';
    import {Message} from 'element-ui';
    import moment from "moment";
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import {getUserInfo, getDictionaryInfo} from "../../../../utils/customize";

    export default {
        name: 'PFANS2033View',
        components: {
            EasyNormalTable,
          EasyNormalContainer
        },
        data() {
            return {
              defaultStart:false,
              showSelection:true,
              uplist:[],
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
                            }, {
                                code: 'annualrestday',
                                label: 'label.PFANS2010VIEW_EVERYYEAR',
                                labelClass: 'pfans2010view_column_3',
                            width: 110,
                                fix: false,
                                filter: true,
                            }, {
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
                    width: 100,
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
                    width: 110,
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
                ],
                totalAbsenteeism:false,
                buttonList: [
                    {'key': 'disclick', 'name': 'button.disclick', 'disabled': false, 'icon': 'el-icon-check'}
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
                  if(moment(response[i].workingdate).format('MM')===this.$route.params.months){
                    this.dateInfo.push({
                      dateflg: moment(response[i].workingdate).format('YYYY-MM-DD'),
                      type: response[i].type,
                    });
                  }
                }
              });
          },
          //add-ws-考勤设置休日背景色
        setdisabled(){
            this.disabled = false;
        },
          rowClassName({row, rowIndex}){
            //add-ws-考勤设置休日背景色

            for(let i =0;i<this.dateInfo.length;i++){
              if(this.dateInfo[i].type === '4'){
                if(this.dateInfo[i].dateflg === row.dates){
                  return "white";
                }
              }else{
                if(this.dateInfo[i].dateflg === row.dates){
                  row.absenteeism = "";
                  this.totalAbsenteeism = true;
                  return "sub_bg_color_Darkgrey";
                }
              }
            }

            //ccm 入职离职后考勤颜色   from
            let userid = this.$route.params.userid;
            let user = getUserInfo(userid);
            let resignationdate ='';
            let enterdate ='';
            if (user) {
              resignationdate = user.userinfo.resignation_date;
              enterdate = user.userinfo.enterday;
            }
            //入职
            if (moment(row.dates).format('YYYY-MM-DD') < moment(enterdate).format('YYYY-MM-DD'))
            {
              if (row.dates ===this.$t('label.PFANS1012VIEW_ACCOUNT'))
              {
                return "white";
              }
              else
              {
                row.absenteeism = "";
                this.totalAbsenteeism = true;
                return "sub_bg_color_Ral";
              }
            }
            //离职
            if (moment(row.dates).format('YYYY-MM-DD') > moment(resignationdate).format('YYYY-MM-DD'))
            {
              if (row.dates ===this.$t('label.PFANS1012VIEW_ACCOUNT'))
              {
                return "white";
              }
              else
              {
                row.absenteeism = "";
                this.totalAbsenteeism = true;
                return "sub_bg_color_Ral";
              }
            }
            //ccm 入职离职后考勤颜色   to

            //add-ws-考勤设置休日背景色
            if(moment(row.dates).format("E") == 6 || moment(row.dates).format("E") == 7 ){
              row.absenteeism = "";
              this.totalAbsenteeism = true;
              return "sub_bg_color_Darkgrey";
            }
          },
          // add 0622 ccm --审批被驳回后，当月考勤数据全部变为未承认状态
          updStatus1(val) {
              if (this.$route.params.userid !== null && this.$route.params.userid !== '') {
                this.form.user_id = this.$route.params.userid;
              }
            if (this.$route.params.years !== null && this.$route.params.years !== '') {
              this.form.years = this.$route.params.years;
            }
            if (this.$route.params.months !== null && this.$route.params.months !== '') {
              this.form.months = this.$route.params.months;
            }
              this.loading = true;
              this.$store
                .dispatch('PFANS2010Store/updStatus1', this.form)
                .then(response => {
                  this.loading = false;
                  this.getAttendancelist();
                  if (val === 1)
                  {
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
                    duration: 5 * 1000
                  });
                  this.loading = false;
                })
            },
          // add 0622 ccm --审批被驳回后，当月考勤数据全部变为未承认状态
          buttonClick(val) {
                if (val === 'disclick')
                {
                  this.updStatus1(1);
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
                    .dispatch('PFANS2010Store/getAttendancelistCompared', parameter)
                    .then(response => {
debugger;
                      for (let j = 0; j < response.length; j++) {
                          this.disdateflg = response[0].dates;
                          //add ccm
                          if(response[j].absenteeism === null || response[j].absenteeism === "")
                          {
                              response[j].absenteeism = response[j].tabsenteeism;
                          }
                          //add ccm
                          if(response[j].shortsickleave === null || response[j].shortsickleave === "")
                          {
                              response[j].shortsickleave = response[j].tshortsickleave;
                          }
                          if(response[j].longsickleave === null || response[j].longsickleave === "")
                          {
                              response[j].longsickleave = response[j].tlongsickleave;
                          }
                        response[j].dates = moment(response[j].dates).format("YYYY-MM-DD");
                      }
                      // let res = [];
                      // let yearMonth = moment(Date.parse(this.$route.params.years + '-' + this.$route.params.months +'-01'));
                      // let start = moment(yearMonth).startOf('month');
                      // let end = moment(yearMonth).endOf('month');
                      //
                      // for(let day = start;day <= end;day.add(1,'d')){
                      //   let daydata = response.filter(item => moment(item.dates).format("YYYY-MM-DD") === moment(day).format("YYYY-MM-DD"))
                      //   if(daydata.length > 0){
                      //     for (let i = 0; i < daydata.length; i++)
                      //     {
                      //       daydata[i].dates = moment(daydata[i].dates).format("YYYY-MM-DD");
                      //       res.push(daydata[i]);
                      //     }
                      //   }
                      // }

                      // //add CCM 合计行--from
                      // var total_normal = 0;
                      // var total_ordinaryindustry = 0;
                      // var total_weekendindustry = 0;
                      // var total_statutoryresidue = 0;
                      // var total_annualrestday = 0;
                      // var total_specialday = 0;
                      // var total_youthday = 0;
                      // var total_womensday = 0;
                      // var total_annualrest = 0;
                      // var total_daixiu = 0;
                      // var total_welfare = 0;
                      // var total_shortsickleave = 0;
                      // var total_longsickleave = 0;
                      // var total_compassionateleave = 0;
                      // var total_nursingleave = 0;
                      // var total_absenteeism = 0;
                      //
                      // for (var i =0; i < res.length; i ++)
                      // {
                      //   total_normal += parseFloat(res[i]["normal"] === undefined ? '0' :(res[i]["normal"] ===null || res[i]["normal"] ==='' ? '0':res[i]["normal"]));
                      //   total_ordinaryindustry += parseFloat(res[i]["ordinaryindustry"] ===undefined ? '0' :(res[i]["ordinaryindustry"]===null || res[i]["ordinaryindustry"]==='' ? '0':res[i]["ordinaryindustry"]));
                      //   total_weekendindustry += parseFloat(res[i]["weekendindustry"] ===undefined ? '0' :(res[i]["weekendindustry"]===null ||  res[i]["weekendindustry"]==='' ? '0':res[i]["weekendindustry"]));
                      //   total_statutoryresidue += parseFloat(res[i]["statutoryresidue"] ===undefined ? '0' :(res[i]["statutoryresidue"]===null || res[i]["statutoryresidue"]==='' ? '0':res[i]["statutoryresidue"]));
                      //   total_annualrestday += parseFloat(res[i]["annualrestday"] ===undefined ? '0' :(res[i]["annualrestday"]===null || res[i]["annualrestday"]=== '' ? '0':res[i]["annualrestday"]));
                      //   total_specialday += parseFloat(res[i]["specialday"] ===undefined ? '0' :(res[i]["specialday"]===null || res[i]["specialday"]=== '' ? '0':res[i]["specialday"]));
                      //   total_youthday += parseFloat(res[i]["youthday"] ===undefined ? '0' :(res[i]["youthday"]===null || res[i]["youthday"]=== '' ? '0':res[i]["youthday"]));
                      //   total_womensday += parseFloat(res[i]["womensday"] ===undefined ? '0' :(res[i]["womensday"]===null || res[i]["womensday"]==='' ? '0':res[i]["womensday"]));
                      //   total_annualrest += parseFloat(res[i]["annualrest"] ===undefined ? '0' :(res[i]["annualrest"]===null || res[i]["annualrest"]==='' ? '0':res[i]["annualrest"]));
                      //   total_daixiu += parseFloat(res[i]["daixiu"] ===undefined ? '0' :(res[i]["daixiu"]===null || res[i]["daixiu"]==='' ? '0':res[i]["daixiu"]));
                      //   total_welfare += parseFloat(res[i]["welfare"] ===undefined ? '0' :(res[i]["welfare"]===null || res[i]["welfare"]==='' ? '0':res[i]["welfare"]));
                      //   total_shortsickleave += parseFloat(res[i]["shortsickleave"] ===undefined ? '0' :(res[i]["shortsickleave"]===null || res[i]["shortsickleave"]==='' ? '0':res[i]["shortsickleave"]));
                      //   total_longsickleave += parseFloat(res[i]["longsickleave"] ===undefined ? '0' :(res[i]["longsickleave"]===null || res[i]["longsickleave"]==='' ? '0':res[i]["longsickleave"]));
                      //   total_compassionateleave += parseFloat(res[i]["compassionateleave"] ===undefined ? '0' :(res[i]["compassionateleave"]===null || res[i]["compassionateleave"]==='' ? '0':res[i]["compassionateleave"]));
                      //   total_nursingleave += parseFloat(res[i]["nursingleave"] ===undefined ? '0' :(res[i]["nursingleave"]===null || res[i]["nursingleave"]==='' ?  '0':res[i]["nursingleave"]));
                      //   total_absenteeism += parseFloat(res[i]["absenteeism"] ===undefined ? '0' :(res[i]["absenteeism"]===null || res[i]["absenteeism"]==='' ? '0':res[i]["absenteeism"]));
                      // }
                      // res1.push( {dates: this.$t('label.PFANS1012VIEW_ACCOUNT'),
                      //                                               normal: total_normal,
                      //                                               ordinaryindustry: total_ordinaryindustry,
                      //                                               weekendindustry: total_weekendindustry,
                      //                                               statutoryresidue: total_statutoryresidue,
                      //                                               annualrestday: total_annualrestday,
                      //                                               specialday: total_specialday,
                      //                                               youthday: total_youthday,
                      //                                               womensday: total_womensday,
                      //                                               annualrest: total_annualrest,
                      //                                               daixiu: total_daixiu,
                      //                                               welfare: total_welfare,
                      //                                               shortsickleave: total_shortsickleave,
                      //                                               longsickleave: total_longsickleave,
                      //                                               compassionateleave: total_compassionateleave,
                      //                                               nursingleave: total_nursingleave,
                      //                                               absenteeism: total_absenteeism,
                      //                                               recognitionstate: null
                      // });
                      // for (var k =0 ; k<res.length;k++)
                      // {
                      //   res1.push(res[k]);
                      // }
                      //
                      // //add CCM 合计行--end
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
        },
        mounted() {
          debugger;
          this.getDay();
          //add-ws-考勤设置休日背景色
          this.getAttendancelist();
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
</style>

