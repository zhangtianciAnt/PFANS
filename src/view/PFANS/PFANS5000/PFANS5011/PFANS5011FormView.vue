<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title"
      :noback="false"
      @buttonClick="buttonClick"
      v-loading="loading">

      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-form-item>
            <el-row style="padding-top: 1%;padding-bottom: 2%">
              <el-col :span="8">
                <div class="block">
                  <el-date-picker
                    v-model="weeks"
                    type="week"
                    @change="weekChange"
                    format="yyyy-WW"
                    :placeholder="$t('normal.error_09')">
                  </el-date-picker>

                </div>
              </el-col>
            </el-row>
            <el-table
              :data="Datatable" border stripe style="width: 100%" ref="multipleTable"
              tooltip-effect="dark" @selection-change="handleSelectionChange" :header-cell-style="{background:'#005BAA',color:'white'}">
              <!--checkbox-->
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <!--姓名-->
              <el-table-column
                :label="$t('label.user_name')"
                align="center"
                width="130" v-if='false'>
                <template slot-scope="scope">
                  <span>{{scope.row.userid}}</span>
                </template>
              </el-table-column>

              <!--姓名-->
              <el-table-column
                :label="$t('label.user_name')"
                align="center"
                width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>

              <!--所属部门-->
              <el-table-column
                :label="$t('label.PFANS1008FORMVIEW_DEPARTMENT')"
                align="center"
                width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.company}}</span>
                </template>
              </el-table-column>

              <!--员工类型-->
              <el-table-column
                :label="$t('label.PFANS6001VIEW_EMPLOYEETYPE')"
                align="center"
                width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.employeetype}}</span>
                </template>
              </el-table-column>

              <!--1-->
              <el-table-column
                :label="day1"
                align="center"
                width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.timestart1}}</span>
                </template>
              </el-table-column>

              <!--2-->
              <el-table-column
                :label="day2"
                align="center"
                width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.timestart2}}</span>
                </template>
              </el-table-column>

              <!--3-->
              <el-table-column
                :label="day3"
                align="center"
                width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.timestart3}}</span>
                </template>
              </el-table-column>

              <!--4-->
              <el-table-column
                :label="day4"
                align="center"
                width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.timestart4}}</span>
                </template>
              </el-table-column>

              <!--5-->
              <el-table-column
                :label="day5"
                align="center"
                width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.timestart5}}</span>
                </template>
              </el-table-column>

              <!--6-->
              <el-table-column
                :label="day6"
                align="center"
                width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.timestart6}}</span>
                </template>
              </el-table-column>

              <!--7-->
              <el-table-column
                :label="day7"
                align="center"
                width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.timestart7}}</span>
                </template>
              </el-table-column>

            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import {Message} from 'element-ui';
  import {getUserInfo,getCooperinterviewList,getOrgInfo} from '@/utils/customize';
  import moment from "moment";

  export default {
    name: 'PFANS5011FormView',
    components: {
      EasyNormalContainer,
    },

    data() {
      return {
        loading: false,
        title: 'title.PFANS5011FORMVIEW',
        weeks:moment(new Date()).format("YYYY-MM-DD"),
        buttonList: [],
        //一天的毫秒数
        millisecond: 1000 * 60 * 60 * 24,
        monday: '',
        Datatable:[],
        disabled: false,
        baseInfo:{},
        day1: '',
        day2: '',
        day3: '',
        day4: '',
        day5: '',
        day6: '',
        day7: '',
        starttime: '',
        endtime: '',
        buttonList: [
          //承认
          {
            'key': 'recognition',
            'name': 'button.recognition',
            'disabled': false,
            'icon': 'el-icon-plus'
          },
          // 拒绝
          {
            'key': 'refuse',
            'name': 'button.refuse',
            'disabled': false,
            'icon': 'el-icon-edit'
          },
        ],
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      weekChange(value){
        this.weeks = moment(value).format('YYYY-MM-DD');
        this.selectData(value);
      },

      getDateinitial(value){
        //周
        var week = value.getDay();
        //返回date是一周中的某一天
        var week = value.getDay();
        //返回date是一个月中的某一天
        var month = value.getDate();
        //减去的天数
        var minusDay = week != 0 ? week - 1 : 6;
        //本周 周一
        var monday = new Date(value.getTime() - (minusDay * this.millisecond));
        this.monday = new Date(value.getTime() - (minusDay * this.millisecond));
        //本周 周日
        var sunday = new Date(monday.getTime() + (6 * this.millisecond));
        this.starttime = moment(monday).format('YYYY-MM-DD')
        this.endtime = moment(sunday).format('YYYY-MM-DD');
        let months = moment(monday).format('M') + this.$t("label.month");
        this.day1 = months + moment(monday).format('D') + this.$t("label.day");
        this.day2 = months + (monday.getDate() + 1) + this.$t("label.day");
        this.day3 = months + (monday.getDate() + 2) + this.$t("label.day");
        this.day4 = months + (monday.getDate() + 3) + this.$t("label.day");
        this.day5 = months + (monday.getDate() + 4) + this.$t("label.day");
        this.day6 = months + (monday.getDate() + 5) + this.$t("label.day");
        this.day7 = months + (monday.getDate() + 6) + this.$t("label.day");
      },

      selectData(val){
          this.getDateinitial(val);
          let info = {project_id: this.$route.params._id,starttime: this.starttime,endtime: this.endtime}
          if (this.$route.params._id) {
            this.loading = true;
            this.$store
              .dispatch('PFANS5001Store/getTimestart', info)
              .then(response => {
                this.Datatable = [];
                for(let i = 0; i < response.length; i ++){
                  let letinitial = [
                    {starttime: this.starttime,timestart:''},
                    {starttime: moment(new Date(this.monday.getTime() + (1 * this.millisecond))).format('YYYY-MM-DD'),timestart:''},
                    {starttime: moment(new Date(this.monday.getTime() + (2 * this.millisecond))).format('YYYY-MM-DD'),timestart:''},
                    {starttime: moment(new Date(this.monday.getTime() + (3 * this.millisecond))).format('YYYY-MM-DD'),timestart:''},
                    {starttime: moment(new Date(this.monday.getTime() + (4 * this.millisecond))).format('YYYY-MM-DD'),timestart:''},
                    {starttime: moment(new Date(this.monday.getTime() + (5 * this.millisecond))).format('YYYY-MM-DD'),timestart:''},
                    {starttime: moment(new Date(this.monday.getTime() + (6 * this.millisecond))).format('YYYY-MM-DD'),timestart:''},
                  ];
                  let letdata = {};
                  letdata.userid = response[i].createby;
                  let user = getUserInfo(response[i].createby);
                  if(user){
                    letdata.name = user.userinfo.customername;
                    let group = getOrgInfo(user.userinfo.centerid);
                    if(group){
                      letdata.company = group.companyen;
                    }
                    if (this.$i18n) {
                      letdata.employeetype = this.$t("label.PFANS5001FORMVIEW_INCOMMUNITY");
                    }
                  }
                  else{
                    let co = getCooperinterviewList(response[i].createby);
                    if(co){
                      letdata.name = co.expname;
                      letdata.company = co.suppliername;
                      if (this.$i18n) {
                        letdata.employeetype = this.$t("label.PFANS5001FORMVIEW_OUTCOMMUNITY");
                      }
                    }
                  }
                  let letlogdate  = response[i].logdate.split(",");
                  let lettimestart  = response[i].timestart.split(",");
                  if(letlogdate){
                    for(let j = 0; j < letlogdate.length; j ++){
                      for(let x = 0; x < letinitial.length; x ++){
                        if(letinitial[x].starttime === letlogdate[j]){
                          letinitial[x].timestart = Number(letinitial[x].timestart) + Number(lettimestart[j]);
                        }
                      }
                    }
                  }
                  letdata.timestart1 = letinitial[0].timestart;
                  letdata.timestart2 = letinitial[1].timestart;
                  letdata.timestart3 = letinitial[2].timestart;
                  letdata.timestart4 = letinitial[3].timestart;
                  letdata.timestart5 = letinitial[4].timestart;
                  letdata.timestart6 = letinitial[5].timestart;
                  letdata.timestart7 = letinitial[6].timestart;
                  this.Datatable.push(letdata);
                }
                this.loading = false;
              })
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
              });
          }
      },

      buttonClick(val) {
        this.baseInfo = {};
        this.baseInfo.logmanagement = [];
        if(val === 'recognition'){
          //View页面的总工数增加，选择行消失
          this.baseInfo.confirmstatus = '1';
        }
        if(val === 'refuse'){
          //选择行消失，在仪表盘的改用户收到一条代办事项
          this.baseInfo.confirmstatus = '2';
        }
        this.baseInfo.starttime = this.starttime;
        this.baseInfo.endtime = this.endtime;
        for (let i = 0;i < this.multipleSelection.length;i++){
          this.baseInfo.logmanagement.push({
            createby: this.multipleSelection[i].userid
            });
        }
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/updateTimestart', this.baseInfo)
          .then(response => {
            this.data = response;
            for (let i = 0;i < this.Datatable.length;i++){
              for (let j = 0;j < this.multipleSelection.length;j++){
                if(this.Datatable[i].userid === this.multipleSelection[j].userid){
                  this.Datatable.splice(i, 1);
                }
              }
            }
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
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
    },
    mounted() {
      this.selectData(new Date());
    },
  };
</script>

<style scoped>

</style>
