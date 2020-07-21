<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading" >
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" style="padding-top: 25px">
          <el-form-item>
            <el-row>
              <plx-table-grid :datas="tableData" :header-cell-style="getRowClass" border highlight-current-row
                              height="600" :pagination-show="paginationShow" :rowClassName="rowClassName"
                              style="width: 100%;height: calc(100vh - 200px - 2rem)" cell-class-name = "row_height_left">
                <!-- 日期对比-->
                <plx-table-column
                  :label="'-'"
                  align="center"
                  prop="tenantid"
                  width="46">
                </plx-table-column>
                <!-- 日期-->
                <plx-table-column
                  :label="$t('label.PFANS2010VIEW_APPLICATION')"
                  align="center"
                  prop="dates"
                  width="84">
                </plx-table-column>
                <!--              勤务-->
                <plx-table-column
                  :label="$t('label.PFANS2010VIEW_SERVICE')"
                  align="center">
                  <!--                正常-->
                  <plx-table-column
                    :label="$t('label.PFANS2010VIEW_NORMAL')"
                    align="center"
                    prop="normal"
                    width="72" >
                  </plx-table-column>
                  <!--                平日-->
                  <plx-table-column
                    :label="$t('label.PFANS2010VIEW_OVERTIME')"
                    align="center"
                    prop="ordinaryindustry"
                    width="72" >
                  </plx-table-column>
                  <!--                休日-->
                  <plx-table-column
                    :label="$t('label.PFANS2010VIEW_RETIREMENT')"
                    align="center"
                    prop="weekendindustry"
                    width="72" >
                  </plx-table-column>
                  <!--                祝日-->
                  <plx-table-column
                    :label="$t('label.PFANS2010VIEW_HOLIDAYS')"
                    align="center"
                    prop="statutoryresidue"
                    width="72" >
                  </plx-table-column>
                  <!--                一齐年休-->
                  <plx-table-column
                    :label="$t('label.PFANS2010VIEW_EVERYYEAR')"
                    align="left"
                    prop="annualrestday"
                    width="78" >
                  </plx-table-column>
                  <!--                特别休日-->
                  <plx-table-column
                    :label="$t('label.PFANS2010VIEW_OCCASIONS')"
                    align="center"
                    prop="specialday"
                    width="78" >
                  </plx-table-column>
                  <!--                青年节-->
                  <plx-table-column
                    :label="$t('label.PFANS2010VIEW_YOUTHDAY')"
                    align="center"
                    prop="youthday"
                    width="72" >
                  </plx-table-column>
                  <!--                妇女节-->
                  <plx-table-column
                    :label="$t('label.PFANS2010VIEW_WOMENSDAY')"
                    align="center"
                    prop="womensday"
                    width="72" >
                  </plx-table-column>
                </plx-table-column>
                <!--              年休-->
                <plx-table-column
                  :label="$t('label.PFANS2010VIEW_INHUGH')"
                  align="center"
                  prop="annualrest"
                  width="70" >
                </plx-table-column>
                <!--              代休-->
                <plx-table-column
                  :label="$t('label.PFANS2010VIEW_DAYOFF')"
                  align="center"
                  prop="daixiu"
                  width="70" >
                </plx-table-column>
                <!--              其他福利休假-->
                <plx-table-column
                  :label="$t('label.PFANS2010VIEW_WELFARE')"
                  align="left"
                  prop="welfare"
                  width="108" >
                </plx-table-column>
                <!--              病假-->
                <plx-table-column
                  :label="$t('label.PFANS2010VIEW_SICKLEAVE')"
                  align="center">
                  <!--                短病假-->
                  <plx-table-column
                    :label="$t('label.PFANS2010VIEW_SHORT')"
                    align="center"
                    prop="shortsickleave"
                    width="75" >
                  </plx-table-column>
                  <!--                长病假-->
                  <plx-table-column
                    :label="$t('label.PFANS2010VIEW_LONG')"
                    align="center"
                    prop="longsickleave"
                    width="75" >
                  </plx-table-column>
                </plx-table-column>
                <!--              事休-->
                <plx-table-column
                  :label="$t('label.PFANS2010VIEW_LEAVE')"
                  align="center"
                  prop="compassionateleave"
                  width="70" >
                </plx-table-column>
                <!--              产休/护理假-->
                <plx-table-column
                  :label="$t('label.PFANS2010VIEW_MATERNITY')"
                  align="center"
                  prop="nursingleave"
                  width="97" >
                </plx-table-column>
                <!--              欠勤-->
                <plx-table-column
                  :label="$t('label.PFANS2010VIEW_ABSENCE')"
                  align="center"
                  prop="absenteeism"
                  width="70">
                </plx-table-column>
              </plx-table-grid>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getUserInfo,getCurrentRolegongzijisuan} from '@/utils/customize';

  export default {
    name: 'PFANS2033View',
    components: {
      EasyNormalContainer,
    },
    data() {
      return {
        uplist:[],
        paginationShow:false,
        stripe:true,
        dateInfo: [],
        disdateflg: '',
        loading: false,
        exitdate: '',
        title: 'title.PFANS2010FOMRVIEW',
        data: [],
        tableData: [{
          attendance_id:'',
          center_id:'',
          group_id:'',
          team_id:'',
          years:'',
          months:'',
          user_id:'',
          dates:'',
          normal:'',
          actual:'',
          shortsickleave:'',
          longsickleave:'',
          compassionateleave:'',
          annualrest:'',
          daixiu:'',
          nursingleave:'',
          welfare:'',
          absenteeism:'',
          recognitionstate:'',
          tshortsickleave:'',
          tlongsickleave:'',
          tcompassionateleave:'',
          tabsenteeism:'',
          status:'',
          tenantid:'',
        }],
        form: {
          attendanceid: '',
          user_id:'',
          years:'',
          months:'',
        },
        buttonList: [
          {'key': 'disclick', 'name': 'button.disclick', 'disabled': true, 'icon': 'el-icon-check'}
        ],
      };
    },
    methods: {
      getRowClass({row, column, rowIndex, columnIndex}) {
        if (column.level === 1 && columnIndex === 0)
        {
          return {
            height: '40px',
            color: 'white',
            background: '#CCCCCC !important',
            border: '1px solid white',
          };
        }
        if (column.level === 1 && columnIndex === 1)
        {
          return {
            height: '40px',
            color: 'white',
            background: '#425E72 !important',
            border: '1px solid white',
          };
        }
        if (column.level === 1 && columnIndex === 2)
        {
          return {
            height: '20px',
            color: 'white',
            background: '#5CBFA3 !important',
            text_align: 'center',
            border: '1px solid white',
          };
        }
        if (column.level === 2 && columnIndex >=2 && columnIndex <=9)
        {
          return {
            height: '20px',
            color: 'white',
            background: '#AEDFD1 !important',
            border: '1px solid white',
          };
        }
        if (column.level === 1 && columnIndex >=10 && columnIndex <=12)
        {
          return {
            height: '40px',
            color: 'white',
            background: '#F2BC6A !important',
            border: '1px solid white',
          };
        }
        if (column.level === 1 && columnIndex === 6)
        {
          return {
            height: '20px',
            color: 'white',
            background: '#2696C3 !important',
            text_align: 'center',
            border: '1px solid white',
          };
        }
        if (column.level === 2 && columnIndex >= 13 && columnIndex <= 14)
        {
          return {
            height: '20px',
            color: 'white',
            background: '#93CBE1 !important',
            border: '1px solid white',
          };
        }
        if (column.level === 1 && columnIndex >= 7 && columnIndex >= 9)
        {
          return {
            height: '40px',
            color: 'white',
            background: '#E5575E !important',
            border: '1px solid white',
          };
        }
      },
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
      rowClassName({row, rowIndex}){
        for(let i =0;i<this.dateInfo.length;i++){
          if(this.dateInfo[i].type === '4'){
            if(this.dateInfo[i].dateflg === row.dates){
              if (this.$i18n)
              {
                if (row.tenantid === this.$t('label.expectedattend'))
                {
                  return "white";
                }
                else
                {
                  return "sub_bg_color_bai";
                }
              }
            }
          }else{
            if(this.dateInfo[i].dateflg === row.dates){
              if (this.$i18n)
              {
                if (row.tenantid === this.$t('label.expectedattend'))
                {
                  return "sub_bg_color_Darkgrey";
                }
                else
                {
                  return "sub_bg_color_Darkgreyy";
                }
              }
            }
          }
        }

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
          if (this.$i18n)
          {
            if (row.tenantid === this.$t('label.expectedattend'))
            {
              return "sub_bg_color_Ral";
            }
            else
            {
              return "sub_bg_color_Rall";
            }
          }
        }
        //离职
        if (moment(row.dates).format('YYYY-MM-DD') > moment(resignationdate).format('YYYY-MM-DD'))
        {
          if (this.$i18n)
          {
            if (row.tenantid === this.$t('label.expectedattend'))
            {
              return "sub_bg_color_Ral";
            }
            else
            {
              return "sub_bg_color_Rall";
            }
          }
        }

        if(moment(row.dates).format("E") == 6 || moment(row.dates).format("E") == 7 ){
          if (this.$i18n)
          {
            if (row.tenantid === this.$t('label.expectedattend'))
            {
              return "sub_bg_color_Darkgrey";
            }
            else
            {
              return "sub_bg_color_Darkgreyy";
            }
          }
        }
        let jh = this.dateInfo.filter(item => item.dateflg === row.dates);
        if (jh.length>0)
        {
          if(!this.dateInfo.indexOf(moment(row.dates).format('YYYY-MM-DD')) && moment(row.dates).format('YYYY-MM-DD') >= moment(enterdate).format('YYYY-MM-DD')
            && moment(row.dates).format('YYYY-MM-DD') <= moment(resignationdate).format('YYYY-MM-DD')
            && (moment(row.dates).format("E") != 6 || moment(row.dates).format("E") != 7))
          {
            if (this.$i18n)
            {
              if (row.tenantid === this.$t('label.actualattend'))
              {
                return "sub_bg_color_bai";
              }
            }
          }
        }
        else
        {
          if(moment(row.dates).format('YYYY-MM-DD') >= moment(enterdate).format('YYYY-MM-DD')
            && moment(row.dates).format('YYYY-MM-DD') <= moment(resignationdate).format('YYYY-MM-DD')
            && (moment(row.dates).format("E") != 6 || moment(row.dates).format("E") != 7))
          {
            if (this.$i18n)
            {
              if (row.tenantid === this.$t('label.actualattend'))
              {
                return "sub_bg_color_bai";
              }
            }
          }
        }

      },
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
          .dispatch('PFANS2010Store/disclickUpdateStates', this.form)
          .then(response => {
            this.loading = false;
            if (val === 1)
            {
              Message({
                message: this.$t('normal.success_02'),
                type: 'success',
                duration: 5 * 1000,
              });
              this.$router.push({
                name: 'PFANS2026View',
              });
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
          });


      },
      buttonClick(val) {
        if (val === 'disclick')
        {
          this.updStatus1(1);
        }
        else if (val === 'back') {
          this.$router.push({
            name: 'PFANS2026View',
          });
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
            let tabledate = [];
            for (let j = 0; j < response.length; j++) {
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
              if(response[j].tenantid === '0')
              {
                if (this.$i18n)
                {
                  response[j].tenantid = this.$t('label.expectedattend');
                }
              }
              if(response[j].tenantid === '1')
              {
                if (this.$i18n)
                {
                  response[j].tenantid = this.$t('label.actualattend');
                }
              }

              response[j].dates = moment(response[j].dates).format("YYYY-MM-DD");
              tabledate.push({
                attendance_id:response[j].attendance_id,
                center_id:response[j].center_id,
                group_id:response[j].group_id,
                team_id:response[j].team_id,
                years:response[j].years,
                months:response[j].months,
                user_id:response[j].user_id,
                dates:response[j].dates,
                normal:response[j].normal,
                actual:response[j].actual,
                shortsickleave:response[j].shortsickleave,
                longsickleave:response[j].longsickleave,
                compassionateleave:response[j].compassionateleave,
                annualrest:response[j].annualrest,
                daixiu:response[j].daixiu,
                nursingleave:response[j].nursingleave,
                welfare:response[j].welfare,
                absenteeism:response[j].absenteeism,
                recognitionstate:response[j].recognitionstate,
                tshortsickleave:response[j].tshortsickleave,
                tlongsickleave:response[j].tlongsickleave,
                tcompassionateleave:response[j].tcompassionateleave,
                tabsenteeism:response[j].tabsenteeism,
                status:response[j].status,
                tenantid:response[j].tenantid,
              })
            }
            this.tableData = tabledate;
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
      this.getDay();
      this.getAttendancelist();
      let role = getCurrentRolegongzijisuan();
      if (role === '0')
      {
        this.buttonList[0].disabled = false;
      }
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .row_height_left {
    font-size: 0.75rem;
    padding: 0px;
    text-align: left;
    background-color: transparent !important;
  }
</style>
