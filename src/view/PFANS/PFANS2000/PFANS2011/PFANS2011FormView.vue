<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      ref="container"
      v-loading="loading"
      :buttonList="buttonList"
      :canStart="canStart"
      :defaultStart="defaultStart"
      :title="title"
      :workflowCode="workflowCode"
      @StartWorkflow="buttonClick"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
    >
      <div slot="customize">
        <el-form
          ref="refform"
          :model="form"
          :rules="rules"
          label-position="top"
          style="padding: 3vw"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input v-show='false' v-model="form.centerid" :disabled="true" style="width:20vw"></el-input>
                <el-input v-model="centerid" :disabled="true" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input v-model="groupid" :disabled="true" style="width:20vw"></el-input>
                <el-input v-show='false' v-model="form.groupid" :disabled="true" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input v-model="teamid" :disabled="true" style="width:20vw"></el-input>
                <el-input v-show='false' v-model="form.teamid" :disabled="true" style="width:20vw"></el-input>
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
                  style="width: 20vw"
                  @getUserids="getUserids"
                ></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="applicationdate">
                <div class="block">
                  <el-date-picker
                    v-model="form.applicationdate"
                    :disabled="true"
                    style="width:20vw"
                    type="date"
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
                  :label="$t('label.PFANS2011VIEW_TYPECOME')"
                  prop="overtimetypecome"
                >
                  <div class="block">
                    <el-radio-group v-model="form.overtimetypecome" :disabled="showovertimetype"
                                    style="margin-left: 2vw" @change="changeovertimetypecome">
                      <el-radio label="1">{{ $t('label.PFANS2011VIEW_XIURICHUQINCOME') }}</el-radio>
                      <el-radio label="2">{{ $t('label.PFANS2011VIEW_OVERTIMETYPECOME') }}</el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <template>
                <el-form-item
                  :label="showtypecome ? $t('label.PFANS2011VIEW_RESERVEOVERTIME') : $t('label.PFANS2011VIEW_RESERVECOME')"
                  prop="reserveovertimedate"
                >
                  <div class="block">
                    <el-date-picker
                      v-model="form.reserveovertimedate"
                      :disabled="showovertimetype"
                      style="width:20vw"
                      type="date"
                      @change="changeReserveovertimedate"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item
                  :label="showtypecome ? $t('label.PFANS2011VIEW_TYPE') : $t('label.PFANS2011VIEW_TYPEATTENCOME')"
                  prop="overtimetype">
                  <el-select v-if="display" v-model="form.overtimetype" :disabled="!disable"
                             :multiple="multiple"
                             clearable
                             style="width:20vw"
                             @change="change">
                    <el-option
                      v-for="item in optionsdata"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item
                  v-show="form.overtimetype === 'PR001005' || form.overtimetype === 'PR001007' || form.overtimetype === 'PR001008'"
                  :label="showtypecome ? $t('label.PFANS2011FROMVIEW_OVERTIMELENGTH') : $t('label.PFANS2011FROMVIEW_OVERTIMELENGTHCOME')"
                  prop="overtimelength">
                  <!--                 NT_PFANS_20210305_BUG_100 [加班时长]组件活性控制-->
                  <el-select
                    v-model="form.overtimelength"
                    :disabled="disovertimelengths()" style="width: 20vw"
                    @change="handleclick">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                :label="showtypecome ? $t('label.PFANS2011VIEW_RESERVEOVER') : $t('label.PFANS2011VIEW_RESERVEOVERCOME')"
                prop="reserveovertime">
                <el-input-number
                  v-model="form.reserveovertime"
                  :disabled="showovertimelength"
                  :max="24"
                  :min="0"
                  :precision="2"
                  :step="0.25"
                  controls-position="right"
                  style="width:20vw"
                  tep-strictly
                  @change="change2"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :label="showtypecome ? $t('label.PFANS2011VIEW_ACTUALOVER') : $t('label.PFANS2011VIEW_ACTUALOVERCOME')"
                prop="actualovertime">
                <el-input-number
                  v-model="form.actualovertime"
                  :disabled="!disactualovertime"
                  :max="24"
                  :min="0"
                  :precision="2"
                  :step="0.25"
                  controls-position="right"
                  style="width:20vw"
                  tep-strictly
                  @change="getTime"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                v-show="show"
                :error2="error2"
                :label="$t('label.PFANS2011VIEW_RESERVESUBSTITUTION')"
                prop="reservesubstitutiondate"
              >
                <div class="block">
                  <el-date-picker
                    v-model="form.reservesubstitutiondate"
                    :disabled="!disable"
                    :error2="error2"
                    style="width:20vw"
                    type="date"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                v-show="show"
                :label="$t('label.PFANS2011VIEW_ACTUALSUBSTITUTION')"
                prop="actualsubstitutiondate"
              >
                <div class="block">
                  <el-date-picker
                    v-model="form.actualsubstitutiondate"
                    :disabled="true"
                    style="width:20vw"
                    type="date"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-top: 1%">
            <el-col :span="24">
              <el-form-item :label="$t('label.cause')" prop="cause">
                <el-input
                  v-model="form.cause"
                  :disabled="!disable"
                  style="width: 72vw"
                  type="textarea"
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
import {getCurrentRoleNew, getOrgInfoByUserId} from '@/utils/customize';

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
      var timedate = moment(this.form.reserveovertimedate).format('YYYY-MM-DD');
      let bool = false;
      this.dataList.forEach(data => {
        if (moment(this.form.reserveovertimedate).format('YYYY-MM-DD') === moment(data.workingdate).format('YYYY-MM-DD')) {
          if (this.changeType(value) === data.type) {
            bool = true;
          }
        }
      });
      // 法定日加班 和 会社特别休日出勤
      if (['PR001005', 'PR001003'].includes(value) && this.form.reserveovertimedate && !this.$route.params._id) {
        if (bool) {
          callback();
        } else {
          callback(this.$t('label.PFANS2011FORMVIEW_ERROR3'));
        }
        //ADD_FJL_06/30 -- 添加周末加班的check start
      } else if (value === 'PR001002' && this.form.reserveovertimedate !== '' && this.form.reserveovertimedate !== null) {
        let bool2 = false;
        let letdataList = 0;
        this.dataList.forEach(data => {
          if (moment(this.form.reserveovertimedate).format('YYYY-MM-DD') === moment(data.workingdate).format('YYYY-MM-DD')) {
            // 振替休日
            if (data.type === '3') {
              bool2 = true;
            } else {
              letdataList = 1;
            }
          }
        });
        // 振替休日 或者 除日历中设置的其他週末 的情况
        if (this.dataList.length > 0) {
          if (bool2 || (letdataList === 0 && this.getDatey(timedate).getDay() === 6 || this.getDatey(timedate).getDay() === 0)) {
            callback();
          } else {
            callback(this.$t('label.PFANS2011FORMVIEW_ERROR3'));
          }
        }

      } else if (value === 'PR001001' && this.form.reserveovertimedate !== '' && this.form.reserveovertimedate !== null) {
        let bool1 = false;
        let letdataList = 0;
        console.log(this.dataList);
        this.dataList.forEach(data => {
          if (moment(this.form.reserveovertimedate).format('YYYY-MM-DD') === moment(data.workingdate).format('YYYY-MM-DD')) {
            // 振替出勤日
            if (data.type === '4') {
              bool1 = true;
            } else {
              letdataList = 1;
            }
          }
        });
        // 振替出勤日 或者 除日历中设置的其他週工作日 的情况
        if (this.dataList.length > 0) {
          if (bool1 || (letdataList === 0 && [1, 2, 3, 4, 5].includes(this.getDatey(timedate).getDay()))) {
            callback();
          } else {
            callback(this.$t('label.PFANS2011FORMVIEW_ERROR3'));
          }
        }
      } else if (value === 'PR001003' && this.form.reserveovertimedate !== '' && this.form.reserveovertimedate !== null) {
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
      roles: '',
      varworktime: [],
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
      workflowCode: '',
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
      }, {
        value: '2',
        label: this.$t('label.PFANS2011FROMVIEW_NOHALFDATE'),
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
        //add ccm 20210824 添加加班和出勤区分 fr
        overtimetypecome: '1',
        //add ccm 20210824 添加加班和出勤区分 to
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
      //add ccm 20210824 添加加班和出勤区分 fr
      showtypecome: false,
      optionsdata: [],
      //add ccm 20210824 添加加班和出勤区分 to
      //update fjl 20210204  NT_PFANS_20210203_BUG_013 start
      age: '',
      //update fjl 20210204  NT_PFANS_20210203_BUG_013 end
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
              this.$t('label.date'),
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
    this.roles = getCurrentRoleNew();
    this.getAttendance();
    this.getDateList();
    this.getOvertimeDay();
    this.getOvertimeMen();
    this.getWorkingday();
    //this.getWorktime();//重复接口删除【getDateList】
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
              } else if (this.form.overtimelength === '1') {
                this.form.actualovertime = '4';
              } else {
                this.form.actualovertime = '0';
              }
            }
            this.disovertimelength = false;
            this.showovertimelength = true;
            this.disactualovertime = false;
          } else if (this.form.overtimetype === 'PR001007' || this.form.overtimetype === 'PR001008') {
            //五四青年节,妇女节的场合
            if (this.form.status === '4') {
              if (this.form.overtimelength === '0') {
                this.form.actualovertime = '8';
              } else if (this.form.overtimelength === '1') {
                this.form.actualovertime = '4';
              } else {
                this.form.actualovertime = '0';
              }
            }
            this.disovertimelength = false;
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
            if (this.form.overtimetype >= 'PR001005') {
              this.workflowCode = 'W0067';
            } else {
              //upd ztc 1224  start
              // if (getCurrentRole() === '2') {
              //   this.workflowCode = 'W0134';
              // } else {
              //   this.workflowCode = 'W0001';
              // }
              this.workflowCode = 'W0001';
              //upd ztc 1224  end
            }
            //总经理预计
            // if (this.form.userid ==='5e78fefff1560b363cdd6db7')
            if (this.roles === '1') {
              this.workflowCode = 'W0072';
            }
            this.canStart = true;
            this.disactualovertime = false;
          } else if (this.form.status === '2') {
            this.disable = false;
            this.showovertimetype = true;
            this.showovertimelength = true;
            this.disactualovertime = false;
            this.disovertimelength = true;
          } else if (this.form.status === '4' || this.form.status === '6') {
            // this.workflowCode = 'W0040';
            if (this.form.overtimetype >= 'PR001005') {
              this.workflowCode = 'W0068';
            } else {
              //upd ztc 1224  start
              // if (getCurrentRole() === '2') {
              //   this.workflowCode = 'W0135';
              // } else {
              //   this.workflowCode = 'W0040';
              // }
              this.workflowCode = 'W0040';
              //upd ztc 1224  end
            }
            //总经理
            // if (this.form.userid ==='5e78fefff1560b363cdd6db7')
            if (this.roles === '1') {
              this.workflowCode = 'W0073';
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
            if (this.form.overtimetype >= 'PR001005') {
              this.workflowCode = 'W0068';
            } else {
              //upd ztc 1224  start
              // if (getCurrentRole() === '2') {
              //   this.workflowCode = 'W0135';
              // } else {
              //   this.workflowCode = 'W0040';
              // }
              this.workflowCode = 'W0040';
              //upd ztc 1224  end
            }
            //总经理
            // if (this.form.userid ==='5e78fefff1560b363cdd6db7')
            if (this.roles === '1') {
              this.workflowCode = 'W0073';
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
          //add ccm 20210824 添加加班和出勤区分 fr
          this.optionsdata = [];
          let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === this.code);
          if (this.form.overtimetypecome === '2') {
            this.showtypecome = true;
            for (let item of dic) {
              if (item.code === 'PR001001' || item.code === 'PR001002' || item.code === 'PR001003') {
                var vote = {};
                vote.value = item.code;
                vote.lable = item.value1;
                this.optionsdata.push(vote);
              }
            }
          } else {
            this.showtypecome = false;
            for (let item of dic) {
              if (item.code === 'PR001005' || item.code === 'PR001007' || item.code === 'PR001008') {
                var vote = {};
                vote.value = item.code;
                vote.lable = item.value1;
                this.optionsdata.push(vote);
              }
            }
          }
          //add ccm 20210824 添加加班和出勤区分 to
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
      //add ccm 20210824 添加加班和出勤区分 fr
      this.optionsdata = [];
      let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === this.code);
      if (this.form.overtimetypecome === '2') {
        this.showtypecome = true;
        for (let item of dic) {
          if (item.code === 'PR001001' || item.code === 'PR001002' || item.code === 'PR001003') {
            var vote = {};
            vote.value = item.code;
            vote.lable = item.value1;
            this.optionsdata.push(vote);
          }
        }
      } else {
        this.showtypecome = false;
        for (let item of dic) {
          if (item.code === 'PR001005' || item.code === 'PR001007' || item.code === 'PR001008') {
            var vote = {};
            vote.value = item.code;
            vote.lable = item.value1;
            this.optionsdata.push(vote);
          }
        }
      }
      //add ccm 20210824 添加加班和出勤区分 to
    }
    // if (this.$store.getters.userinfo.userid === '5e78fefff1560b363cdd6db7') {//失效
    //if(this.roles === '1'){//变更
    //   this.workflowCode = '';
    // }
    //update fjl 20210204  NT_PFANS_20210203_BUG_013 start
    this.getAge();
    //update fjl 20210204  NT_PFANS_20210203_BUG_013 end
    this.$refs.refform.validateField('overtimetype');
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
    // add start NT_PFANS_20210305_BUG_100 [加班时长]组件活性控制
    disovertimelengths() {
      if (this.$route.params.action === 'view') {
        return true;
      } else {
        return this.disovertimelength;
      }
    },
    // add end NT_PFANS_20210305_BUG_100 [加班时长]组件活性控制
    //ADD_FJL_06/30 -- 添加周末加班的check start
    getDatey(str) {
      var tempDate = new Date();
      var list = str.split('-');
      tempDate.setFullYear(list[0]);
      tempDate.setMonth(list[1] - 1);
      tempDate.setDate(list[2]);
      return tempDate;
    },
    //ADD_FJL_06/30 -- 添加周末加班的check end
    //加班合计时长
    getWorktime() {
      this.loading = true;
      this.$store
        .dispatch('PFANS2017Store/getFpans2017Listowner', {})
        .then(response => {
          if (response.length > 0) {
            this.varworktime = response;
          }
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
    // setdisabled(val) {
    //   if (this.$route.params.disabled) {
    //     this.disable = val;
    //   }
    // },
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
          this.$message.error({
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
          //整合getWorktime方法
          if (response.length > 0) {
            this.varworktime = response;
          }
          for (let i = 0; i < response.length; i++) {
            if (this.$store.getters.userinfo.userid === response[i].user_id && moment(this.form.applicationdate).format('YYYY-MM-DD') === moment(response[i].punchcardrecord_date).format('YYYY-MM-DD')) {
              this.timeend = response[i].time_end;
            }
          }
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
          this.$message.error({
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
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
    // 加班日期变更
    changeReserveovertimedate() {
      let letreserveovertimedate = moment(this.form.reserveovertimedate).format('YYYY-MM-DD');
      let resultList = this.dataList.filter(value => moment(value.workingdate).format('YYYY-MM-DD') == letreserveovertimedate);
      if (moment(letreserveovertimedate).format('MM-DD') === '05-04') {
        //工作日设定中【五四青年节】当天五其他类型假期判断
        if (resultList.length === 0) {
          this.changeovertimetype('1');
          this.change('PR001007');
        }
      } else if (moment(letreserveovertimedate).format('MM-DD') === '03-08') {
        this.changeovertimetype('1');
        this.change('PR001008');
      } else if (this.form.overtimetype === 'PR001002' && this.form.reserveovertime >= 8) {
        this.show = true;
        this.rules.reservesubstitutiondate[0].required = true;
      } else {
        this.show = false;
        this.form.reservesubstitutiondate = null;
        this.rules.reservesubstitutiondate[0].required = false;
        this.form.actualsubstitutiondate = null;
      }
      // 除54和38之外的日期
      if (resultList.length > 0) {
        if (resultList[0].type === '1') { // 法定节假日
          this.changeovertimetype('2');
          this.change('PR001003'); // 法定日加班
        } else if (resultList[0].type === '3') { // 振替休日
          this.changeovertimetype('2');
          this.change('PR001002'); // 周末加班
        } else if (resultList[0].type === '4') { // 振替出勤日
          this.changeovertimetype('2');
          this.change('PR001001'); // 平日加班
        } else if (resultList[0].type === '5') {  // 会社特别休日
          this.changeovertimetype('1');
          this.change('PR001005'); // 会社特别休日出勤
        } else {
          this.display = false;
          this.$nextTick(() => {
            this.form.overtimetype = '';
            this.display = true;
          });
        }
      } else {
        if (moment(letreserveovertimedate).format('MM-DD') !== '05-04' && moment(letreserveovertimedate).format('MM-DD') !== '03-08') {
          this.changeovertimetype('2');
          if (this.getDatey(letreserveovertimedate).getDay() === 6 || this.getDatey(letreserveovertimedate).getDay() === 0) {
            this.change('PR001002');
          } else {
            this.change('PR001001');
          }
        }
      }
    },
    //update fjl 20210204  NT_PFANS_20210203_BUG_013 start
    getAge() {
      let birthdays = new Date(this.$store.getters.userinfo.userinfo.birthday);
      let d = new Date();
      let age = 0;
      let agenew = 0;
      age = d.getFullYear() - birthdays.getFullYear();
      agenew = d.getFullYear() - birthdays.getFullYear();
      if (d.getMonth() > birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() > birthdays.getDate())) {
        agenew = age;
      } else {
        agenew = age - 1;
      }
      this.age = agenew;
    },
    //update fjl 20210204  NT_PFANS_20210203_BUG_013 end
    changeType(type) {
      switch (type) {
        case 'PR001001':
          type = '4';
          break;
        case 'PR001002':
          type = '3';
          break;
        case 'PR001003':
          type = '1';
          break;
        case 'PR001005':
          type = '5';
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
        if (val.workflowCode === 'W0001' || val.workflowCode === 'W0067' || val.workflowCode === 'W0072' || val.workflowCode === 'W0108' || val.workflowCode === 'W0134') {
          this.form.status = '3';
        } else if (val.workflowCode === 'W0040' || val.workflowCode === 'W0068' || val.workflowCode === 'W0073' || val.workflowCode === 'W0109' || val.workflowCode === 'W0135') {
          this.form.status = '6';
        }
      } else if (val.state === '2') {
        if (val.workflowCode === 'W0001' || val.workflowCode === 'W0067' || val.workflowCode === 'W0072' || val.workflowCode === 'W0108' || val.workflowCode === 'W0134') {
          this.form.status = '4';
        } else if (val.workflowCode === 'W0040' || val.workflowCode === 'W0068' || val.workflowCode === 'W0073' || val.workflowCode === 'W0109' || val.workflowCode === 'W0135') {
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
      // if (val.state === '4' || val.state === '6') {
      //   this.form.status = '5';
      // } else if (val.state === '0') {
      //   this.form.status = '2';
      // } else if (val.state === '2') {
      //   this.form.status = '4';
      // }
      // this.uopdateSta();
      if (this.form.status === '4' || this.form.status === '6') {
        this.form.status = '5';
      } else {
        this.form.status = '2';
      }
      // this.buttonClick('update');
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
      // if (getCurrentRole() === '1' && this.form.user_id === '5e78fefff1560b363cdd6db7') {//失效
      //if (getCurrentRole() === '1' && this.roles === '1') {//变更
      //   this.form.status = '7';
      // }
      this.loading = true;
      this.$store
        .dispatch('PFANS2011Store/updateOvertime', this.form)
        .then(response => {
          this.data = response;
          this.loading = false;
          // zy NT_PFANS_20210527_BUG_011 start
          this.disactualovertime = false;
          // zy NT_PFANS_20210527_BUG_011 end
          if (val === 'end') {
            if (this.$store.getters.historyUrl) {
              this.$router.push(this.$store.getters.historyUrl);
            }
          }
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
      } else if (val === '2') {
        if (Number(this.form.status) >= 4) {
          this.form.actualovertime = '0';
        } else {
          this.form.reserveovertime = '0';
        }
      }
    },
    change(val) {
      if (this.form.overtimetype === val) {
        // 单个控件表单重新验证-去掉必填项方法
        this.$refs.refform.validateField('overtimetype');
      }
      if (val >= 'PR001005') {
        if (this.form.status === '0') {
          this.workflowCode = 'W0067';
        }
      } else {
        if (this.form.status === '0') {
          //upd ztc 1224  start
          // if (getCurrentRole() === '2') {
          //   this.workflowCode = 'W0134';
          // } else {
          //   this.workflowCode = 'W0001';
          // }
          this.workflowCode = 'W0001';
          //upd ztc 1224  end
        }
      }
      // if (this.form.userid ==='5e78fefff1560b363cdd6db7')
      if (this.roles === '1') {
        this.workflowCode = 'W0072';
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
        this.form.reserveovertime = '0';
      }
      if (val === 'PR001008') {
        this.disactualovertime = false;
        this.disovertimelength = false;
        this.showovertimetype = true;
        this.showovertimelength = true;
        // this.form.overtimelength = '1';
        this.form.reserveovertime = '0';
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
        this.disovertimelength = false;
        this.showovertimetype = true;
        this.showovertimelength = true;
        // this.form.overtimelength = '1';
        this.form.reserveovertime = '0';
        this.form.reserveovertimedate = dateMonth.getFullYear() + '-' + '05' + '-' + '04';
        //update fjl 20210204  NT_PFANS_20210203_BUG_013 start
        //if (Number(this.$store.getters.userinfo.userinfo.age) > 28) {
        if (Number(this.age) > 28) {
          //update fjl 20210204  NT_PFANS_20210203_BUG_013 end
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

    //add ccm 20210824 添加加班和出勤区分 fr
    changeovertimetypecome(val) {
      this.optionsdata = [];
      let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === this.code);

      if (val === '2') {
        //加班申请
        this.form.reserveovertimedate = '';
        this.form.overtimetype = '';
        this.form.reserveovertime = 1;
        this.form.overtimelength = '';
        this.showtypecome = true;
        for (let item of dic) {
          if (item.code === 'PR001001' || item.code === 'PR001002' || item.code === 'PR001003') {
            var vote = {};
            vote.value = item.code;
            vote.lable = item.value1;
            this.optionsdata.push(vote);
          }
        }
      } else {
        //休日出勤申请
        this.form.reserveovertimedate = '';
        this.form.overtimetype = '';
        this.form.reserveovertime = 0;
        this.form.overtimelength = '';
        this.showtypecome = false;
        for (let item of dic) {
          if (item.code === 'PR001005' || item.code === 'PR001007' || item.code === 'PR001008') {
            var vote = {};
            vote.value = item.code;
            vote.lable = item.value1;
            this.optionsdata.push(vote);
          }
        }
      }
    },
    //add ccm 20210824 添加加班和出勤区分 to

    //add gbb 20210906 选择加班日期变更出勤类型 start
    changeovertimetype(val) {
      this.optionsdata = [];
      let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === this.code);
      this.form.overtimetypecome = val;
      if (val === '2') {
        //加班申请
        this.form.reserveovertime = 1;
        this.showtypecome = true;
        for (let item of dic) {
          if (item.code === 'PR001001' || item.code === 'PR001002' || item.code === 'PR001003') {
            var vote = {};
            vote.value = item.code;
            vote.lable = item.value1;
            this.optionsdata.push(vote);
          }
        }
      } else {
        //休日出勤申请
        this.form.reserveovertime = 0;
        this.showtypecome = false;
        for (let item of dic) {
          if (item.code === 'PR001005' || item.code === 'PR001007' || item.code === 'PR001008') {
            var vote = {};
            vote.value = item.code;
            vote.lable = item.value1;
            this.optionsdata.push(vote);
          }
        }
      }
    },
    //add ccm 20210906 选择加班日期变更出勤类型 to

    //新建接口
    insertForm() {
      //总经理审批自动通过
      // if (getCurrentRole() === '1') {
      //   this.form.status = '4';
      // }
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
          this.$message.error({
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
            if (this.form.overtimelength === '0') {
              Message({
                message: this.$t('label.PFANS2011FROMVIEW_NOALLDAY'),
                type: 'error',
                duration: 5 * 1000,
              });
              return;
            }
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
            if (this.form.overtimelength === '0') {
              Message({
                message: this.$t('label.PFANS2011FROMVIEW_NOALLDAY'),
                type: 'error',
                duration: 5 * 1000,
              });
              return;
            }
            //五四青年节28周岁以内申请
            //update fjl 20210204  NT_PFANS_20210203_BUG_013 start
            //if (Number(this.$store.getters.userinfo.userinfo.age) > 28) {
            if (Number(this.age) > 28) {
              //update fjl 20210204  NT_PFANS_20210203_BUG_013 end
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
            // if (getCurrentRole() === '1' && this.form.status === '4' && this.form.user_id === '5e78fefff1560b363cdd6db7') {//失效
            // if (getCurrentRole() === '1' && this.form.status === '4' && this.roles === '1') {//变更
            //   this.form.status = '7';
            // }
            this.loading = true;
            this.$store
              .dispatch('PFANS2011Store/updateOvertime', this.form)
              .then(response => {
                this.data = response;
                this.loading = false;
                // zy NT_PFANS_20210527_BUG_011 start
//                  Message({
//                    message: this.$t('normal.success_02'),
//                    type: 'success',
//                    duration: 5 * 1000,
//                  });
                // zy NT_PFANS_20210527_BUG_011 end
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
                  // zy NT_PFANS_20210527_BUG_011 start
//                    this.disactualovertime = false;
                  // zy NT_PFANS_20210527_BUG_011 end
                  this.$refs.container.$refs.workflow.startWorkflow();
                }
              })
              .catch(error => {
                this.$message.error({
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
            if (this.form.overtimetype === 'PR001001' || this.form.overtimetype === 'PR001002' || this.form.overtimetype === 'PR001003' || this.form.overtimetype === 'PR001004' || this.form.overtimetype === 'PR001005') {
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
                  this.$message.error({
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
