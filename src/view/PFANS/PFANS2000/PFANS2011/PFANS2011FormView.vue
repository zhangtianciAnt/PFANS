<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      :title="title"
      :workflowCode="workflowCode"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
      v-loading="loading"
    >
      <div slot="customize">
        <el-form
          :model="form"
          :rules="rules"
          label-position="top"
          label-width="8vw"
          ref="refform"
          style="padding: 2vw"
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
                  :disabled="!disable"
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
                    :disabled="!disable"
                    style="width:20vw"
                    type="date"
                    v-model="form.applicationdate"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
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
                      :disabled="form.overtimetype === 'PR001007' || form.overtimetype === 'PR001008' ? true : false"
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
                <el-form-item :label="$t('加班时长')" prop="overtimelength"
                              v-show="form.overtimetype === 'PR001005' || form.overtimetype === 'PR001007' || form.overtimetype === 'PR001008'">
                  <el-select :disabled="form.overtimetype === 'PR001007' || form.overtimetype === 'PR001008' ? true : false" @change="handleclick" style="width: 20vw"
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
                  :disabled="form.overtimelength === '' ? false : true"
                  :max="24"
                  :min="0"
                  :precision="2"
                  :step="0.1"
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
                  :max="24"
                  :min="0"
                  :precision="2"
                  :step="0.1"
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
  import {getOrgInfoByUserId} from '@/utils/customize';

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
        if (['PR001004', 'PR001005', 'PR001003'].includes(value) && this.form.reserveovertimedate && !this.$route.params._id) {
          let bool = false;
          this.dataList.forEach(data => {
            if (this.changeType(value) === data.type && moment(this.form.reserveovertimedate).format('YYYY-MM-DD') === moment(data.workingdate).format('YYYY-MM-DD')) {
              bool = true;
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
      var validatePass3 = (rule, value, callback) => {
        if (this.form.overtimetype === 'PR001002') {
          if (!value || value === '' || value < '8') {
            callback(new Error(this.$t('normal.error_greaterequal')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
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
        ageflg: '',
        sexflg: '',
        form: {
          centerid: '',
          groupid: '',
          teamid: '',
          userid: '',
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
              // message:  this.$t("normal.error_09") + this.$t("label.PFANS2011VIEW_TYPE"),
            },
            {
              validator: HolidayCheck,
              trigger: 'change',
            },
          ],
          reserveovertime: [
            {
              required: true,
              message:
                this.$t('normal.error_09') +
                this.$t('label.PFANS2011VIEW_RESERVEOVER'),
              trigger: 'change',
            },
            {
              validator: validatePass3,
              trigger: 'change',
            },
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
        punchcardrecord: {
          user_id: '',
        },
      };
    },
    mounted() {
      this.getAttendance();
      this.getDateList();
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
            this.loading = false;
            this.userlist = this.form.userid;
            if (
              this.form.overtimetype === 'PR001002' &&
              this.form.reserveovertime >= 8
            ) {
              this.show = true;
              this.rules.reservesubstitutiondate[0].required = true;
            }
            if (
              (this.form.status === '4' || this.form.status === '6') &&
              this.disable &&
              this.disactualovertime
            ) {
              this.disable = false;
              this.disactualovertime = true;
            }
            if (
              this.form.status === '5' &&
              this.disable &&
              this.disactualovertime
            ) {
              this.disable = false;
              this.disactualovertime = false;
            }
            if (this.form.status === '0') {
              this.workflowCode = 'W0001';
              this.canStart = true;
              this.disactualovertime = false;
            } else if (this.form.status === '4') {
              this.workflowCode = 'W0040';
              this.canStart = true;
              this.disable = false;
              this.disactualovertime = true;
              this.rules.actualovertime[0].required = true;
            } else if (this.form.status === '7') {
              this.workflowCode = 'W0040';
              this.canStart = false;
              this.disable = true;
              this.disactualovertime = true;
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
        this.ageflg = this.$store.getters.userinfo.age;
        this.sexflg = this.$store.getters.userinfo.sex;
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
      changeReserveovertimedate() {
        let letreserveovertimedate = moment(this.form.reserveovertimedate).format(
          'YYYY-MM-DD',
        );
        if (moment(letreserveovertimedate).format('MM-DD') === '05-04') {
          this.change('PR001007');
          if (
            this.form.reserveovertimedate.getDay() === 0 ||
            this.form.reserveovertimedate.getDay() === 6
          ) {
            this.show = true;
            this.rules.reservesubstitutiondate[0].required = true;
          } else {
            this.show = false;
            this.form.reservesubstitutiondate = null;
            this.rules.reservesubstitutiondate[0].required = false;
            this.form.actualsubstitutiondate = null;
          }
        } else if (moment(letreserveovertimedate).format('MM-DD') === '03-08') {
          this.change('PR001008');
          if (
            this.form.reserveovertimedate.getDay() === 0 ||
            this.form.reserveovertimedate.getDay() === 6
          ) {
            this.show = true;
            this.rules.reservesubstitutiondate[0].required = true;
          } else {
            this.show = false;
            this.form.reservesubstitutiondate = null;
            this.rules.reservesubstitutiondate[0].required = false;
            this.form.actualsubstitutiondate = null;
          }
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
        var status;
        if (val.state === '1') {
          if (val.workflowCode === 'W0001') {
            status = '3';
          } else if (val.workflowCode === 'W0040') {
            status = '6';
          }
        } else if (val.state === '2') {
          if (val.workflowCode === 'W0001') {
            status = '4';
          } else if (val.workflowCode === 'W0040') {
            status = '7';
            this.canStart = false;
          }
        }
        this.buttonClick('update', status);
      },
      start() {
        if (this.form.status === '4' || this.form.status === '6') {
          var status = '5';
        } else {
          var status = '2';
        }
        this.buttonClick('update', status);
      },
      end() {
        if (this.form.status === '5') {
          var status = '4';
        } else {
          var status = '0';
        }
        this.buttonClick('update', status);
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
        debugger;
        if (val === '0') {
          this.form.reserveovertime = '8';
        } else if (val === '1') {
          this.form.reserveovertime = '4';
        }
      },
      change(val) {
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
        if (val === 'PR001008') {
          this.form.overtimelength = this.options1[1].label;
          this.form.reserveovertime = '4';
          this.form.reserveovertimedate = dateMonth.getFullYear() + '-' + '03' + '-' + '08';
          if (this.sexflg !== 'PG020002') {
            Message({
              message: this.$t('label.PFANS2011FROMVIEW_ERRORINFOS'),
              type: 'error',
              duration: 5 * 1000,
            });
          }
        }
        if (val === 'PR001007') {
          this.form.overtimelength = this.options1[1].label;
          this.form.reserveovertime = '4';
          this.form.reserveovertimedate = dateMonth.getFullYear() + '-' + '05' + '-' + '04';
          if (Number(this.ageflg) > 28) {
            Message({
              message: this.$t('label.PFANS2011FROMVIEW_ERRORINFOW'),
              type: 'error',
              duration: 5 * 1000,
            });
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
      buttonClick(val, status) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.loading = true;
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
              this.form.reservesubstitutiondate = moment(
                this.form.reservesubstitutiondate,
              ).format('YYYY-MM-DD');
              if (this.form.actualsubstitutiondate != null) {
                this.form.actualsubstitutiondate = moment(
                  this.form.actualsubstitutiondate,
                ).format('YYYY-MM-DD');
              }
            }
            if (this.$route.params._id) {
              if (status != undefined) {
                this.form.status = status;
              }
              this.$store
                .dispatch('PFANS2011Store/updateOvertime', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if (val !== 'update') {
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
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
            } else {
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
            }
          }
        });
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
