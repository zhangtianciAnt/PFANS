<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :defaultStart="defaultStart"
      @StartWorkflow="buttonClick"
      :buttonList="buttonList"
      :canStart="canStart"
      :title="title"
      :workflowCode="workflowCode"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState" @disabled="setdisabled"
      ref="container"
      v-loading="loading"
    >
      <div slot="customize">
        <el-form
          :model="form"
          :rules="rules"
          label-position="top"
          ref="refform"
          style="padding: 3vw"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="form.centerid" v-show='false'></el-input>
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input :disabled="true" style="width:20vw" v-model="form.groupid" v-show='false'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input :disabled="true" style="width:20vw" v-model="form.teamid" v-show='false'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                <user
                  :disabled="true"
                  :error="error"
                  :selectType="selectType"
                  :userlist="userlist"
                  @getUserids="getUserids"
                  style="width: 20vw"
                ></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="applicationdate">
                <div class="block">
                  <el-date-picker
                    :disabled="true"
                    style="width:20vw"
                    type="date"
                    v-model="form.applicationdate"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <!--            <el-col :span="8">-->
            <!--              <el-form-item :label="$t('label.PFANS2011FROMVIEW_OVERTIME')" prop="worktime">-->
            <!--                <el-input :disabled="true" style="width:20vw" v-model="form.worktime"></el-input>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
          </el-row>
          <el-row>
            <el-col :span="8">
              <template>
                <el-form-item
                  :label="$t('label.PFANS2011VIEW_RESERVEOVERTIME')"
                  prop="reserveovertimedate"
                >
                  <div class="block">
                    <el-date-picker
                      :disabled="showovertimetype"
                      @change="changeReserveovertimedate"
                      style="width:20vw"
                      type="date"
                      v-model="form.reserveovertimedate"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS2011VIEW_TYPE')" prop="overtimetype">
                  <dicselect
                    :code="code"
                    :data="form.overtimetype"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="change"
                    style="width:20vw"
                    v-if="display"
                  ></dicselect>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS2011FROMVIEW_OVERTIMELENGTH')" prop="overtimelength"
                              v-show="form.overtimetype === 'PR001005' || form.overtimetype === 'PR001007' || form.overtimetype === 'PR001008'">
                  <el-select
                    :disabled="disovertimelength"
                    @change="handleclick" style="width: 20vw"
                    v-model="form.overtimelength">
                    <el-option
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      v-for="item in options1"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2011VIEW_RESERVEOVER')" prop="reserveovertime">
                <el-input-number
                  :disabled="showovertimelength"
                  tep-strictly
                  :max="24"
                  :min="0"
                  :precision="2"
                  :step="0.25"
                  @change="change2"
                  controls-position="right"
                  style="width:20vw"
                  v-model="form.reserveovertime"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2011VIEW_ACTUALOVER')" prop="actualovertime">
                <el-input-number
                  :disabled="!disactualovertime"
                  tep-strictly
                  :max="24"
                  :min="0"
                  :precision="2"
                  :step="0.25"
                  @change="getTime"
                  controls-position="right"
                  style="width:20vw"
                  v-model="form.actualovertime"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                :error2="error2"
                :label="$t('label.PFANS2011VIEW_RESERVESUBSTITUTION')"
                prop="reservesubstitutiondate"
                v-show="show"
              >
                <div class="block">
                  <el-date-picker
                    :disabled="!disable"
                    :error2="error2"
                    style="width:20vw"
                    type="date"
                    v-model="form.reservesubstitutiondate"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :label="$t('label.PFANS2011VIEW_ACTUALSUBSTITUTION')"
                prop="actualsubstitutiondate"
                v-show="show"
              >
                <div class="block">
                  <el-date-picker
                    :disabled="true"
                    style="width:20vw"
                    type="date"
                    v-model="form.actualsubstitutiondate"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-top: 1%">
            <el-col :span="24">
              <el-form-item :label="$t('label.cause')" prop="cause">
                <el-input
                  :disabled="!disable"
                  style="width: 72vw"
                  type="textarea"
                  v-model="form.cause"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import PFANS2011View from '../PFANS2011/PFANS2011View.vue';
  import dicselect from '../../../components/dicselect.vue';
  import moment from 'moment';
  import {Message} from 'element-ui';
  import user from '../../../components/user.vue';
  import {getOrgInfoByUserId, getCurrentRole} from '@/utils/customize';

  export default {
    name: 'PFANS2011FormView',
    components: {
      EasyNormalContainer,
      PFANS2011View,
      getOrgInfoByUserId,
      dicselect,
      user,
    },
    data() {
      var HolidayCheck = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(
            new Error(this.$t('normal.error_09') + this.$t('label.PFANS2011VIEW_TYPE')),
          );
        }
        if (['PR001004', 'PR001005', 'PR001003'].includes(value) && this.form.reserveovertimedate && !this.$route.params._id) {
          let bool = false;
          // for(let i = 0; i < this.dataList.length; i++){
          //   if(moment(this.form.reserveovertimedate).format('YYYY-MM-DD') === moment(this.dataList[i].workingdate).format('YYYY-MM-DD')){
          //     if (this.changeType(value) === data.type) {
          //       bool = true;
          //       break;
          //     }
          //   }
          // }
          this.dataList.forEach(data => {
            if (moment(this.form.reserveovertimedate).format('YYYY-MM-DD') === moment(data.workingdate).format('YYYY-MM-DD')) {
              if (this.changeType(value) === data.type) {
                bool = true;
              }
            }
          });
          if (bool) {
            callback();
          } else {
            callback(this.$t('label.PFANS2011FORMVIEW_ERROR3'));
          }
        } else {
          callback();
        }
      };
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(
            new Error(this.$t('normal.error_09') + this.$t('label.applicant')),
          );
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      var validatePass = (rule, value, callback) => {
        if (this.show) {
          if (value === '' || value === null) {
            callback(
              new Error(
                this.$t('normal.error_09') +
                this.$t('label.PFANS2011VIEW_RESERVESUBSTITUTION'),
              ),
            );
          } else {
            if (
              this.form.reserveovertimedate !== '' ||
              this.form.reserveovertimedate !== null
            ) {
              if (
                moment(value)
                  .startOf('month')
                  .diff(
                    moment(this.form.reserveovertimedate).startOf('month'),
                    'months',
                  ) > 3
              ) {
                callback(new Error(this.$t('label.PFANS2011FORMVIEW_ERROR')));
              }
              if (moment(value) <= moment(this.form.reserveovertimedate)) {
                callback(new Error(this.$t('label.PFANS2011FORMVIEW_ERROR2')));
              } else {
                callback();
              }
            } else {
              callback();
            }
          }
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (this.form.status === '4') {
          if (value === undefined || value === '') {
            callback(
              new Error(
                this.$t('normal.error_09') +
                this.$t('label.PFANS2011VIEW_ACTUALOVER'),
              ),
            );
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      // var validatePass3 = (rule, value, callback) => {
      //   if (this.form.overtimetype === 'PR001002') {
      //     if (!value || value === '' || value < '8') {
      //       callback(new Error(this.$t('normal.error_greaterequal')));
      //     } else {
      //       callback();
      //     }
      //   } else {
      //     callback();
      //   }
      // };
      return {
        disovertimelength: false,
        defaultStart: false,
        showovertimelength: false,
        showovertimetype: false,
        centerid: '',
        groupid: '',
        teamid: '',
        arr: [],
        timeend: '',
        closingtimeend: '',
        display: true,
        workflowCode: 'W0001',
        loading: false,
        canStart: true,
        selectType: 'Single',
        userlist: '',
        error: '',
        error2: '',
        title: 'title.PFANS2011VIEW',
        buttonList: [],
        options1: [{
          value: '0',
          label: this.$t('label.PFANS2016FORMVIEW_QUANTIAN'),
        }, {
          value: '1',
          label: this.$t('label.PFANS2011FROMVIEW_HALFDATE'),
        }],
        // ageflg: '',
        sexflg: '',
        form: {
          centerid: '',
          groupid: '',
          teamid: '',
          userid: '',
          worktime: '0.00',
          applicationdate: moment(new Date()).format('YYYY-MM-DD'),
          reserveovertimedate: '',
          overtimetype: '',
          reserveovertime: 1,
          actualovertime: 0,
          reservesubstitutiondate: '',
          actualsubstitutiondate: '',
          overtimelength: '',
          cause: '',
          status: '',
        },
        rules: {
          userid: [
            {
              required: true,
              validator: validateUserid,
              trigger: 'change',
            },
          ],
          applicationdate: [
            {
              required: true,
              message:
                this.$t('normal.error_09') + this.$t('label.application_date'),
              trigger: 'change',
            },
          ],
          reserveovertimedate: [
            {
              required: true,
              message:
                this.$t('normal.error_09') +
                this.$t('label.PFANS2011VIEW_RESERVEOVERTIME'),
              trigger: 'change',
            },
          ],
          overtimetype: [
            {
              required: true,
              validator: HolidayCheck,
              trigger: 'change',
              // message:  this.$t("normal.error_09") + this.$t("label.PFANS2011VIEW_TYPE"),
            },
            // {
            //   validator: HolidayCheck,
            //   trigger: 'change',
            // },
          ],
          reserveovertime: [
            {
              required: true,
              message:
                this.$t('normal.error_09') +
                this.$t('label.PFANS2011VIEW_RESERVEOVER'),
              trigger: 'change',
            },
            // {
            //   validator: validatePass3,
            //   trigger: 'change',
            // },
          ],
          cause: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.cause'),
              trigger: 'change',
            },
          ],
          actualovertime: [
            {
              required: false,
              validator: validatePass2,
              trigger: 'blur',
            },
          ],
          reservesubstitutiondate: [
            {
              required: false,
              validator: validatePass,
              trigger: 'change',
            },
          ],
        },
        code: 'PR001',
        multiple: false,
        disable: true,
        show: false,
        disactualovertime: false,
        dataList: [],
        overtimeday: '',
        overtimeOneday: '',
        overtimemen: '',
        punchcardrecord: {
          user_id: '',
        },
      };
    },
    mounted() {
      this.getAttendance();
      this.getDateList();
      this.getOvertimeDay();
      this.getOvertimeMen();
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS2011Store/getOvertimeOne', {
            overtimeid: this.$route.params._id,
          })
          .then(response => {
            this.form = response;
            let rst = getOrgInfoByUserId(response.userid);
            if (rst) {
              this.centerid = rst.centerNmae;
              this.groupid = rst.groupNmae;
              this.teamid = rst.teamNmae;
            }
            //会社特别休日加班的场合
            if (this.form.overtimetype === 'PR001005') {
              if (this.form.status === '4') {
                if (this.form.overtimelength === '0') {
                  this.form.actualovertime = '8';
                } else {
                  this.form.actualovertime = '4';
                }
              }
              this.disovertimelength = false;
              this.showovertimelength = true;
              this.disactualovertime = false;
            } else if (this.form.overtimetype === 'PR001007' || this.form.overtimetype === 'PR001008') {
              //五四青年节,妇女节的场合
              this.disovertimelength = true;
              this.showovertimetype = true;
              this.showovertimelength = true;
              this.disactualovertime = false;
            }
            this.userlist = this.form.userid;
            if (
              this.form.overtimetype === 'PR001002' &&
              this.form.reserveovertime >= 8
            ) {
              this.show = true;
              this.rules.reservesubstitutiondate[0].required = true;
            }
            if (this.form.status === '5') {
              this.disable = false;
              this.disactualovertime = false;
              this.disovertimelength = true;
            }
            // if (this.form.status === '6') {
            //     this.workflowCode = 'W0040';
            //     this.canStart = true;
            //     this.disable = true;
            //     this.disactualovertime = true;
            // }
            if (this.form.status === '0' || this.form.status === '3') {
              // this.workflowCode = 'W0001';
              if (this.form.overtimetype >= 'PR001004') {
                this.workflowCode = 'W0067';
              } else {
                this.workflowCode = 'W0001';
              }

              this.canStart = true;
              this.disactualovertime = false;
            } else if (this.form.status === '2') {
              this.disable = false;
              this.showovertimetype = true;
              this.showovertimelength = true;
              this.disactualovertime = false;
            } else if (this.form.status === '4' || this.form.status === '6') {
              // this.workflowCode = 'W0040';
              if (this.form.overtimetype >= 'PR001004') {
                this.workflowCode = 'W0068';
              } else {
                this.workflowCode = 'W0040';
              }
              this.canStart = true;
              if (!this.disable || this.form.overtimetype === 'PR001005') {
                this.disactualovertime = false;
              } else {
                this.disactualovertime = true;
              }
              this.disable = false;
              this.rules.actualovertime[0].required = true;
            } else if (this.form.status === '7') {
              this.disovertimelength = true;
              // this.workflowCode = 'W0040';
              if (this.form.overtimetype >= 'PR001004') {
                this.workflowCode = 'W0068';
              } else {
                this.workflowCode = 'W0040';
              }
              this.canStart = false;
              this.disable = false;
              this.disactualovertime = false;
            }
            if (!this.disable) {
              (
                this.showovertimelength = true,
                  this.showovertimetype = true
                // this.disactualovertime = false
              );
            }
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
      } else {
        // this.ageflg = this.$store.getters.userinfo.userinfo.age;
        this.sexflg = this.$store.getters.userinfo.userinfo.sex;
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (lst) {
            this.centerid = lst.centerNmae;
            this.groupid = lst.groupNmae;
            this.teamid = lst.teamNmae;
            this.form.centerid = lst.centerId;
            this.form.groupid = lst.groupId;
            this.form.teamid = lst.teamId;
          }
          this.form.userid = this.$store.getters.userinfo.userid;
        }
      }
      this.getWorkingday();
      if (this.$store.getters.userinfo.userid === '5e78fefff1560b363cdd6db7') {
        this.workflowCode = '';
      }
    },
    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ];
      }
    },
    methods: {
      //加班合计时长
      getWorktime() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2017Store/getFpans2017Listowner', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (moment(this.form.reserveovertimedate).format('YYYY-MM-DD') === moment(response[j].punchcardrecord_date).format('YYYY-MM-DD') && this.$store.getters.userinfo.userid === response[j].user_id) {
                let timeend = moment(response[j].time_end).format('HH:mm').replace(':', '.');
                // let worktime = Number(response[j].worktime);
                let timeflg1 = timeend.substring(0, 2);
                let timeflg2 = timeend.substring(timeend.length - 2);
                let timeflg3 = timeflg2 / 60;
                // if ((Number(timeflg1) + Number(timeflg3) - Number(worktime) - 18).toFixed(2) > 0) {
                //     this.form.worktime = (Number(timeflg1) + Number(timeflg3) - Number(worktime) - 18).toFixed(2);
                if ((Number(timeflg1) + Number(timeflg3) - 18).toFixed(2) > 0) {
                  this.form.worktime = (Number(timeflg1) + Number(timeflg3) - 18).toFixed(2);
                } else {
                  this.form.worktime = 0.00;
                }
              }
            }
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
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disable = val;
        }
      },
      getTime(val) {
        let sum = val * 60;
        let hours = Math.floor(sum / 60);
        let minute = sum % 60;
        let sumTime = hours * 100 + minute;
        let starttime = this.closingtimeend.replace(':', '');
        let endtime = moment(this.timeend).format('HHmm');
        if (Number(starttime) + sumTime > endtime) {
          Message({
            message: this.$t('label.PFANS2011FROMVIEW_CHECHERROR'),
            type: 'error',
            duration: 5 * 1000,
          });
        }
      },
      getAttendance() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2018Store/getFpans2018List', {})
          .then(response => {
            this.closingtimeend = response[0].closingtime_end;
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
      getDateList() {
        this.punchcardrecord.user_id = this.$store.getters.userinfo.userid;
        this.loading = true;
        this.$store
          .dispatch('PFANS2011Store/getDataList', {})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              if (this.$store.getters.userinfo.userid === response[i].user_id && moment(this.form.applicationdate).format('YYYY-MM-DD') === moment(response[i].punchcardrecord_date).format('YYYY-MM-DD')) {
                this.timeend = response[i].time_end;
              }
            }
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
      //获取本年度的五四青年节请假次数
      getOvertimeDay() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2011Store/getOvertimeDay', {
            'overtimetype': 'PR001007',
            'reserveovertimedate': new Date().getFullYear() + '-05-04',
            'userid': this.$store.getters.userinfo.userid,
          })
          .then(response => {
            this.overtimeday = response.length;
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
      //获取本年度的三八妇女节请假次数
      getOvertimeMen() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2011Store/getOvertimeDay', {
            'overtimetype': 'PR001008',
            'reserveovertimedate': new Date().getFullYear() + '-03-08',
            'userid': this.$store.getters.userinfo.userid,
          })
          .then(response => {
            this.overtimemen = response.length;
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
      changeReserveovertimedate() {
        this.getWorktime();
        let letreserveovertimedate = moment(this.form.reserveovertimedate).format(
          'YYYY-MM-DD',
        );
        if (moment(letreserveovertimedate).format('MM-DD') === '05-04') {
          this.change('PR001007');
          // DEL_FJL_05/13   --暂时注释掉无用代码
          // if (
          //     this.form.reserveovertimedate.getDay() === 0 ||
          //     this.form.reserveovertimedate.getDay() === 6
          // ) {
          //     this.show = true;
          //     this.rules.reservesubstitutiondate[0].required = true;
          // } else {
          //     this.show = false;
          //     this.form.reservesubstitutiondate = null;
          //     this.rules.reservesubstitutiondate[0].required = false;
          //     this.form.actualsubstitutiondate = null;
          // }
          // DEL_FJL_05/13   --暂时注释掉无用代码
        } else if (moment(letreserveovertimedate).format('MM-DD') === '03-08') {
          this.change('PR001008');
          // DEL_FJL_05/13   --暂时注释掉无用代码
          // if (
          //     this.form.reserveovertimedate.getDay() === 0 ||
          //     this.form.reserveovertimedate.getDay() === 6
          // ) {
          //     this.show = true;
          //     this.rules.reservesubstitutiondate[0].required = true;
          // } else {
          //     this.show = false;
          //     this.form.reservesubstitutiondate = null;
          //     this.rules.reservesubstitutiondate[0].required = false;
          //     this.form.actualsubstitutiondate = null;
          // }
          // DEL_FJL_05/13   --暂时注释掉无用代码
        } else if (
          this.form.overtimetype === 'PR001002' &&
          this.form.reserveovertime >= 8
        ) {
          this.show = true;
          this.rules.reservesubstitutiondate[0].required = true;
        } else {
          this.show = false;
          this.form.reservesubstitutiondate = null;
          this.rules.reservesubstitutiondate[0].required = false;
          this.form.actualsubstitutiondate = null;
        }
        for (let i = 0; i < this.dataList.length; i++) {
          if (
            letreserveovertimedate ===
            moment(this.dataList[i].workingdate).format('YYYY-MM-DD')
          ) {
            if (this.dataList[i].type === '1') {
              this.change('PR001003');
            } else if (this.dataList[i].type === '5') {
              this.change('PR001005');
            } else if (this.dataList[i].type === '6') {
              this.change('PR001004');
            } else {
              this.display = false;
              this.$nextTick(() => {
                this.form.overtimetype = '';
                this.display = true;
              });
            }
            return;
          }
        }
      },
      changeType(type) {
        switch (type) {
          case 'PR001003':
            type = '1';
            break;
          case 'PR001005':
            type = '5';
            break;
          case 'PR001004':
            type = '6';
            break;
        }
        return type;
      },
      getWorkingday() {
        this.$store.dispatch('PFANS2011Store/getList', {}).then(response => {
          this.dataList = response;
          this.$store.commit('global/SET_DAYS', response);
        });
      },
      workflowState(val) {
        if (val.state === '1') {
          if (val.workflowCode === 'W0001' || val.workflowCode === 'W0067') {
            this.form.status = '3';
          } else if (val.workflowCode === 'W0040' || val.workflowCode === 'W0068') {
            this.form.status = '6';
          }
        } else if (val.state === '2') {
          if (val.workflowCode === 'W0001' || val.workflowCode === 'W0067') {
            this.form.status = '4';
          } else if (val.workflowCode === 'W0040' || val.workflowCode === 'W0068') {
            this.form.status = '7';
            this.canStart = false;
          }
        }
        // this.buttonClick('update');
        this.uopdateSta();
      },
      //add-ws-5/20-审批流程添加
      start(val) {
        this.form.applicationdate = moment(new Date()).format('YYYY-MM-DD');
        if (val.state === '4' || val.state === '6') {
          this.form.status = '5';
        } else if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.uopdateSta();
      },
      //add-ws-5/20-审批流程添加

      end() {
        if (this.form.status === '5') {
          this.form.status = '4';
        } else {
          this.form.status = '0';
        }
        // this.buttonClick('update');
        this.uopdateSta('end');
      },
      uopdateSta(val) {
        //总经理审批自动通过
        if (getCurrentRole() === '1' && this.form.user_id === '5e78fefff1560b363cdd6db7') {
          this.form.status = '7';
        }
        this.loading = true;
        this.$store
          .dispatch('PFANS2011Store/updateOvertime', this.form)
          .then(response => {
            this.data = response;
            this.loading = false;
            if (val === 'end') {
              if (this.$store.getters.historyUrl) {
                this.$router.push(this.$store.getters.historyUrl);
              }
            }
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
      getUserids(val) {
        this.form.userid = val;
        this.userlist = val;
        let lst = getOrgInfoByUserId(val);
        if (lst) {
          this.centerid = lst.centerNmae;
          this.groupid = lst.groupNmae;
          this.teamid = lst.teamNmae;
          this.form.centerid = lst.centerId;
          this.form.groupid = lst.groupId;
          this.form.teamid = lst.teamId;
        } else {
          this.centerid = '';
          this.groupid = '';
          this.teamid = '';
          this.form.centerid = '';
          this.form.teamid = '';
          this.form.groupid = '';
        }
        if (!this.form.userid || this.form.userid === '' || val === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      handleclick(val) {
        if (val !== '') {
          this.showovertimelength = true;
        }
        if (val === '0') {
          if (Number(this.form.status) >= 4) {
            this.form.actualovertime = '8';
          } else {
            this.form.reserveovertime = '8';
          }
        } else if (val === '1') {
          if (Number(this.form.status) >= 4) {
            this.form.actualovertime = '4';
          } else {
            this.form.reserveovertime = '4';
          }
        }
      },
      change(val) {
        if (val >= 'PR001004') {
          if (this.form.status === '0') {
            this.workflowCode = 'W0067';
          }
        } else {
          if (this.form.status === '0') {
            this.workflowCode = 'W0001';
          }
        }
        this.showovertimetype = false;
        this.showovertimelength = false;
        let dateMonth = new Date();
        this.form.overtimelength = '';
        this.form.overtimetype = val;
        if (val === 'PR001002' && this.form.reserveovertime >= 8) {
          this.show = true;
          this.rules.reservesubstitutiondate[0].required = true;
        } else {
          this.show = false;
          this.form.reservesubstitutiondate = null;
          this.rules.reservesubstitutiondate[0].required = false;
          this.form.actualsubstitutiondate = null;
        }
        if (val === 'PR001005') {
          this.disovertimelength = false;
          this.showovertimelength = true;
          this.disactualovertime = false;
        }
        if (val === 'PR001008') {
          this.disactualovertime = false;
          this.disovertimelength = true;
          this.showovertimetype = true;
          this.showovertimelength = true;
          this.form.overtimelength = '1';
          this.form.reserveovertime = '4';
          this.form.reserveovertimedate = dateMonth.getFullYear() + '-' + '03' + '-' + '08';
          if (this.$store.getters.userinfo.userinfo.sex !== 'PR019002') {
            Message({
              message: this.$t('label.PFANS2011FROMVIEW_ERRORINFOS'),
              type: 'error',
              duration: 5 * 1000,
            });
            return;
          }
        }
        if (val === 'PR001007') {
          this.disactualovertime = false;
          this.disovertimelength = true;
          this.showovertimetype = true;
          this.showovertimelength = true;
          this.form.overtimelength = '1';
          this.form.reserveovertime = '4';
          this.form.reserveovertimedate = dateMonth.getFullYear() + '-' + '05' + '-' + '04';
          if (Number(this.$store.getters.userinfo.userinfo.age) > 28) {
            Message({
              message: this.$t('label.PFANS2011FROMVIEW_ERRORINFOW'),
              type: 'error',
              duration: 5 * 1000,
            });
            return;
          }
        }


      },
      change2(val) {
        this.form.reserveovertime = val;
        if (this.form.overtimetype === 'PR001002' && val >= 8) {
          this.show = true;
          this.rules.reservesubstitutiondate[0].required = true;
        } else {
          this.show = false;
          this.form.reservesubstitutiondate = null;
          this.form.actualsubstitutiondate = null;
        }
      },
      //新建接口
      insertForm() {
        //总经理审批自动通过
        if (getCurrentRole() === '1') {
          this.form.status = '4';
        }
        this.loading = true;
        this.$store
          .dispatch('PFANS2011Store/createOvertime', this.form)
          .then(response => {
            this.data = response;
            this.loading = false;
            Message({
              message: this.$t('normal.success_01'),
              type: 'success',
              duration: 5 * 1000,
            });
            if (this.$store.getters.historyUrl) {
              this.$router.push(this.$store.getters.historyUrl);
            }
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
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            if (this.form.overtimetype === 'PR001008') {
              //三八妇女节重复申请check
              // if (this.overtimemen >= 1) {
              //     Message({
              //         message: this.$t('label.PFANS2011FROMVIEW_OVERTIMEMEN'),
              //         type: 'error',
              //         duration: 5 * 1000,
              //     });
              //     return;
              // }
              if (this.$store.getters.userinfo.userinfo.sex !== 'PR019002') {
                Message({
                  message: this.$t('label.PFANS2011FROMVIEW_ERRORINFOS'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
              }

            }
            if (this.form.overtimetype === 'PR001007') {
              //五四青年节重复申请check
              // if (this.overtimeday >= 1) {
              //     Message({
              //         message: this.$t('label.PFANS2011FROMVIEW_OVERTIMEDAY'),
              //         type: 'error',
              //         duration: 5 * 1000,
              //     });
              //     return;
              // }
              //五四青年节28周岁以内申请
              if (Number(this.$store.getters.userinfo.userinfo.age) > 28) {
                Message({
                  message: this.$t('label.PFANS2011FROMVIEW_ERRORINFOW'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
              }
            }
            if (Number(this.form.status) <= 4 || this.form.status === '') {
              if (Number(this.form.reserveovertime) === 0) {
                Message({
                  message: this.$t('label.PFANS2011VIEW_TIMEERROR'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
              }
            } else if (Number(this.form.status) > 4) {
              if (Number(this.form.actualovertime) === 0) {
                Message({
                  message: this.$t('label.PFANS2011VIEW_TIMEERROR'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
              }
            }
            this.form.userid = this.userlist;
            this.form.applicationdate = moment(this.form.applicationdate).format(
              'YYYY-MM-DD',
            );
            this.form.reserveovertimedate = moment(
              this.form.reserveovertimedate,
            ).format('YYYY-MM-DD');
            if (this.form.overtimetype != 'PR001002') {
              this.form.reservesubstitutiondate = null;
              this.form.actualsubstitutiondate = null;
            } else {
              if (this.form.reservesubstitutiondate != null) {
                this.form.reservesubstitutiondate = moment(
                  this.form.reservesubstitutiondate,
                ).format('YYYY-MM-DD');
              }
              if (this.form.actualsubstitutiondate != null) {
                this.form.actualsubstitutiondate = moment(
                  this.form.actualsubstitutiondate,
                ).format('YYYY-MM-DD');
              }
            }
            if (this.$route.params._id) {
              //总经理审批自动通过
              if (getCurrentRole() === '1' && this.form.status === '4' && this.form.user_id === '5e78fefff1560b363cdd6db7') {
                this.form.status = '7';
              }
              this.loading = true;
              this.$store
                .dispatch('PFANS2011Store/updateOvertime', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t('normal.success_02'),
                    type: 'success',
                    duration: 5 * 1000,
                  });
                  if (val !== 'save' && val !== 'StartWorkflow') {
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                  }
                  if (val === 'StartWorkflow') {
                    this.showovertimetype = true;
                    this.disovertimelength = true;
                    this.showovertimelength = true;
                    this.disactualovertime = false;
                    this.$refs.container.$refs.workflow.startWorkflow();
                  }
                })
                .catch(error => {
                  Message({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  this.loading = false;
                });
            } else {
              //五四青年节和三八妇女节重复申请check
              if (this.form.overtimetype === 'PR001007') {
                if (this.overtimeday >= 1) {
                  Message({
                    message: this.$t('label.PFANS2011FROMVIEW_OVERTIMEDAY'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
              }
              //三八妇女节重复申请check
              if (this.form.overtimetype === 'PR001008') {
                if (this.overtimemen >= 1) {
                  Message({
                    message: this.$t('label.PFANS2011FROMVIEW_OVERTIMEMEN'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
              }
              //平日加班，周末加班，法定加班一天只能申请一次的check
              if (this.form.overtimetype === 'PR001001' || this.form.overtimetype === 'PR001002' || this.form.overtimetype === 'PR001003') {
                //获取一天的（平时，周末，法定加班次数）
                this.loading = true;
                let letreserveovertimedate = moment(this.form.reserveovertimedate).format('YYYY-MM-DD');
                this.$store
                  .dispatch('PFANS2011Store/getOvertimeOneday', {
                    'reserveovertimedate': letreserveovertimedate,
                    'userid': this.$store.getters.userinfo.userid,
                  })
                  .then(response => {
                    this.overtimeOneday = response.length;
                    this.loading = false;
                    if (this.overtimeOneday >= 1) {
                      Message({
                        message: this.$t('label.PFANS2011FROMVIEW_OVERTIMEONEDAY'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      return;
                    } else {
                      //新建接口
                      this.insertForm();
                    }
                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
                  });

              } else {
                //新建接口
                this.insertForm();
              }
            }
          } else {
            Message({
              message: this.$t('normal.error_12'),
              type: 'error',
              duration: 5 * 1000,
            });
          }
        });
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
