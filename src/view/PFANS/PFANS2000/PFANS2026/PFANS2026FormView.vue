<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" :workflowCode="right"
                         @buttonClick="buttonClick" :enableSave="enableSave"
                         @end="end" @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.user_name')" prop="user_id">
                <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width:20vw" v-model="form.user_id"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.sex')" prop="sex">
                <dicselect :code="code3"
                           :data="form.sex"
                           :disabled="true"
                           :multiple="multiple"
                           @change="getsex"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND')"
                            prop="educational_background">
                <dicselect :code="code2"
                           :data="form.educational_background"
                           :disabled="true"
                           :multiple="multiple"
                           @change="geteducational_background"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2026VIEW_POSITION')" prop="position">
                <dicselect :code="code4"
                           :data="form.position"
                           :disabled="true"
                           :multiple="multiple"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2026VIEW_ENTRYTIME')" prop="entry_time">
                <el-date-picker :disabled="true" style="width:20vw" v-model="form.entry_time">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application_date">
                <el-date-picker :disabled="true" style="width:20vw" v-model="form.application_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_RANK')">
                <dicselect
                  :code="code"
                  class="width"
                  style="width:20vw"
                  :data="form.starank"
                  :disabled="true"
                ></dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2026VIEW_ADDRESS')">
                <el-input :disabled="!disable" maxlength="50" style="width:20vw"
                          v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2026VIEW_DEPARTUREDATE')" prop="hope_exit_date">
                <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.hope_exit_date"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2026VIEW_FIXEDTELEPHONE')" prop="fixed_phone">
                <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                          v-model="form.fixed_phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.user_mobile')">
                <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                          v-model="form.cellphone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="button">
              <el-form-item :label="$t('label.PFANS2026VIEW_BUTTON2')">
                <el-button @click="submitForm('ruleFormNew')" icon="el-icon-view">
                  {{$t('label.PFANS2026VIEW_BUTTON')}}
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input :disabled="!disable" maxlength="100" style="width:20vw"
                          v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="this.checktype===1">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2026VIEW_DEPARTUREDATE1')" prop="newhope_exit_date">
                <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.newhope_exit_date"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2026VIEW_DEPARTUREDATE2')" prop="newreason">
                <el-input :disabled="!disable"
                          :placeholder="$t('label.PFANS2026VIEW_REMARK2')"
                          style="width: 46vw" type="textarea"
                          v-model="form.newreason">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-drawer :visible.sync="diaoshu" size="60%" :show-close="false" :withHeader="false" append-to-body
                     destroy-on-close custom-class="custimize_drawer">
            <el-form label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')">
                    <el-input :disabled="true" style="width:12vw" v-model="centerid"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <el-input :disabled="true" style="width:12vw" v-model="groupid"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <el-input :disabled="true" style="width:12vw" v-model="teamid"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_RESIGN')" prop="user_id">
                    <user :disabled="true" :selectType="selectType" :userlist="userlist"
                          style="width:12vw"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND')"
                                prop="educational_background">
                    <dicselect :code="code2"
                               :data="educational_background"
                               :disabled="true"
                               :multiple="multiple"
                               style="width:12vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_RESIGNATIONDATE')" prop="resignation_date">
                    <el-date-picker :disabled="true" style="width:12vw" v-model="resignation_date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_REPORTER')">
                    <user :disabled="true" :selectType="selectType"
                          style="width:12vw"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_REPORTDATE')">
                    <el-date-picker :disabled="true" style="width:12vw" v-model="report_date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('label.PFANS2026VIEW_SOCIALEVALUATION')">
                    <dicselect :code="code1"
                               :data="social_evaluation"
                               :disabled="!disable"
                               :multiple="multiple"
                               style="width: 41vw;">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_EXTERNALEVALUATION')">
                  <el-input :disabled="true" style="width: 41vw;" type="textarea"
                            v-model="external_evaluation">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_REASON2')">
                  <el-input :disabled="true" :placeholder="$t('label.PFANS2026FORMVIEW_PLACEHOLDER1')"
                            style="width: 41vw;"
                            type="textarea" v-model="reason2">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_IMPACTRESIGNATIONEXTERNAL')">
                  <el-input :disabled="true" style="width: 41vw;" type="textarea"
                            v-model="impact_resignation_external">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_IMPACTRESIGNATIONINTERNAL')">
                  <el-input :disabled="true" style="width: 41vw;" type="textarea"
                            v-model="impact_resignation_internal">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_INFLUENCEINFORMATIONSECURITY')">
                  <el-input :disabled="true" :placeholder="$t('label.PFANS2026FORMVIEW_PLACEHOLDER2')" :rows="3"
                            style="width: 41vw;"
                            type="textarea"
                            v-model="influence_information_security">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_RETIREMENTSTRATEGY')">
                  <el-input :disabled="true" :placeholder="$t('label.PFANS2026FORMVIEW_PLACEHOLDER3')"
                            style="width: 41vw;"
                            type="textarea"
                            v-model="retirement_strategy">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026FORMVIEW_DATA1')">
                  <el-input :disabled="true" :rows="2" style="width: 41vw;" type="textarea"
                            v-model="jpwork_delivery">
                  </el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </el-drawer>
          <el-row>
            <el-form-item :label="$t('label.PFANS2026VIEW_CAUSE')" prop="reason">
              <el-input :disabled="!disable"
                        :placeholder="$t('label.PFANS2026VIEW_REMARK2')"
                        style="width: 70vw" type="textarea"
                        v-model="form.reason">
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <div class="sub_color_blue">
              {{$t('label.PFANS2026FORMVIEW_MESSAGE1')}}
            </div>
            <div class="sub_color_blue">
              {{$t('label.PFANS2026FORMVIEW_MESSAGE2')}}
            </div>
            <div class="sub_color_blue">
              {{$t('label.PFANS2026FORMVIEW_MESSAGE3')}}
            </div>
            <div class="sub_color_blue">
              {{$t('label.PFANS2026FORMVIEW_MESSAGE4')}}
            </div>
            <div class="sub_color_blue">
              {{$t('label.PFANS2026FORMVIEW_MESSAGE5')}}
            </div>
            <div class="sub_color_blue">
              {{$t('label.PFANS2026FORMVIEW_MESSAGE6')}}
            </div>
            <div class="sub_color_blue">
              {{$t('label.PFANS2026FORMVIEW_MESSAGE7')}}
            </div>
            <div class="sub_color_blue">
              {{$t('label.PFANS2026FORMVIEW_MESSAGE8')}}
            </div>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getOrgInfoByUserId, getUserInfo} from '@/utils/customize';
  import {isvalidPhone, telephoneNumber} from '@/utils/validate';
  import dicselect from '../../../components/dicselect';
  import {getDictionaryInfo} from '../../../../utils/customize';

  export default {
    name: 'PFANS2026FormVIEW',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
    },
    data() {
      var validateDay = (rule, value, callback) => {
        if (value) {
          if (moment(value).diff(moment(this.form.application_date), 'day') < 0) {
            callback(new Error(this.$t('normal.error_checkTime1') + this.$t('label.application')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var newvalidateDay = (rule, value, callback) => {
        if (value) {
          if (moment(value).diff(moment(this.form.application_date), 'day') < 0) {
            callback(new Error(this.$t('normal.error_checkTime1') + this.$t('label.application')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.user_name');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
        } else {
          this.error = '';
          return callback();
        }
      };
      return {
        code1: 'PR012',
        button: false,
        diaoshu: false,
        code: '',
        centerid: '',
        groupid: '',
        teamid: '',
        right: '',
        error: '',
        selectType: 'Single',
        title: 'title.PFANS2026FROMVIEW',
        userlist: '',
        loading: false,
        enableSave: false,
        buttonList: [],
        baseInfo: {},
        sex: '',
        position: '',
        entry_time: '',
        application_date: moment(new Date()).format('YYYY-MM-DD'),
        jpwork_delivery: '',
        educational_background: '',
        resignation_date: '',
        reporter: '',
        report_date: moment().format('YYYY-MM-DD'),
        external_evaluation: '',
        influence_information_security: '',
        social_evaluation: '',
        reason2: '',
        retirement_strategy: '',
        impact_resignation_internal: '',
        impact_resignation_external: '',
        listbutton: [],
        form: {
          type: 0,
          newhope_exit_date: '',
          newreason: '',
          starank: '',
          center_id: '',
          group_id: '',
          team_id: '',
          user_name: '',
          sex: '',
          position: '',
          entry_time: '',
          application_date: moment(new Date()).format('YYYY-MM-DD'),
          hope_exit_date: '',
          reason: '',
          address: '',
          fixed_phone: '',
          cellphone: '',
          email: '',
          educational_background: '',
          reporter: moment().format('YYYY-MM-DD'),
          report_date: moment().format('YYYY-MM-DD'),
          delivery_sheet_date: moment().format('YYYY-MM-DD'),
          stage: '1',
        },
        code2: 'PR022',
        code3: 'PR019',
        code4: 'PG021',
        disable: true,
        disable1: true,
        multiple: false,
        listsum: '',
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
          sex: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.sex'),
            trigger: 'change',
          }],
          email: [
            {
              type: 'email',
              message: this.$t('normal.error_09') + this.$t('label.effective') + this.$t('label.email'),
              trigger: ['blur', 'change'],
            },
          ],
          hope_exit_date: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_DEPARTUREDATE'),
            trigger: 'change',
          },
            {validator: validateDay, trigger: 'change'}],
          reason: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_CAUSE'),
            trigger: 'change',
          }],
          newhope_exit_date: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_DEPARTUREDATE1'),
            trigger: 'change',
          },
            {validator: newvalidateDay, trigger: 'change'}],
          newreason: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_DEPARTUREDATE2'),
            trigger: 'change',
          }],
        },
        checktype: '',
        canStart: true,
      };
    },
    created() {
      this.checktype = this.$route.params._type;
      // if(this.checktype = 1){
      if (!this.$route.params.disabled) {
        if (this.$route.params._status === 4) {
          this.buttonList = [
            {
              key: 'generate',
              name: 'button.insertgenerate',
              disabled: false,
            },
            {
              key: 'insertsta',
              name: 'button.insertsta',
              disabled: false,
            },
          ];
        } else {
          this.buttonList = [
            {
              key: 'generate',
              name: 'button.insertgenerate',
              disabled: true,
            },
            {
              key: 'insertsta',
              name: 'button.insertsta',
              disabled: true,
            },
          ];
        }
      } else {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ];
      }
      if (this.$route.params._type2 === 1) {
        this.right = 'W0080';
        this.canStart = true;
      } else {
        this.right = 'W0033';
        this.canStart = false;
      }
      this.disable = this.$route.params.disabled;
    },
    mounted() {
      this.checklist();
      this.buttontrue();
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS2026Store/selectById', {'staffexitprocedureid': this.$route.params._id})
          .then(response => {
            this.form = response.staffexitprocedure;
            if (this.form.status === '4') {
              this.enableSave = true;
            } else {
              this.enableSave = false;
            }
            // if(this.checktype = 1){
            if (this.form.newhope_exit_date != '' && this.form.newhope_exit_date != null) {
              if (this.form.status === '4') {
                this.form.hope_exit_date = this.form.newhope_exit_date;
                this.form.stage = '0';
              }
            }
            // }
            if (this.form.stage == '1') {
              this.checktype = 1;
            }
            if (response.staffexitprocedure.user_id !== null && response.staffexitprocedure.user_id !== '') {
              let rst = getOrgInfoByUserId(response.staffexitprocedure.user_id);
              if (rst) {
                this.centerid = rst.centerNmae;
                this.groupid = rst.groupNmae;
                this.form.group_id = rst.groupId;
                this.teamid = rst.teamNmae;
              }
            }
            this.userlist = this.form.user_id;
            this.baseInfo.staffexitprocedure = JSON.parse(JSON.stringify(this.form));
            if (!this.$route.params.disabled) {
              this.disable = this.$route.params.disabled;
              this.disable1 = this.$route.params.disabled;
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
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            this.form.group_id = rst.groupId;
            this.form.team_id = rst.teamId;
          }
          let lst = getUserInfo(this.$store.getters.userinfo.userid);
          if (lst) {
            this.form.sex = lst.userinfo.sex;
            this.form.starank = lst.userinfo.rank;
            if (this.form.starank != '' && this.form.starank != null) {
              let letbudge = getDictionaryInfo(this.form.starank);
              if (letbudge) {
                this.form.starank = letbudge.value1;
              }
            }
            this.form.educational_background = lst.userinfo.educational;
            // let postinfo = getDictionaryInfo(lst.userinfo.post);
            // if (postinfo) {
            //   this.form.position = postinfo.value1;
            // }
            this.form.position = lst.userinfo.post;
            this.form.entry_time = lst.userinfo.enterday;
            // ADD_FJL_05/13  -- 从人员信息里面取值
            this.form.email = lst.userinfo.email;
            this.form.address = lst.userinfo.address;
            this.form.cellphone = lst.userinfo.mobilenumber;
            this.form.fixed_phone = lst.userinfo.phone;
            // ADD_FJL_05/13  -- 从人员信息里面取值
          }
          this.form.user_id = this.$store.getters.userinfo.userid;
          // this.disable = true;
          // this.disable1 = false;
          this.loading = false;
        }
      }
    },
    methods: {
      submitForm(ruleFormNew) {
        this.sex = this.listbutton[0].sex;
        this.position = this.listbutton[0].position;
        this.entry_time = this.listbutton[0].entry_time;
        this.application_date = this.listbutton[0].application_date;
        this.jpwork_delivery = this.listbutton[0].jpwork_delivery;
        this.educational_background = this.listbutton[0].educational_background;
        this.resignation_date = this.listbutton[0].resignation_date;
        this.reporter = this.listbutton[0].reporter;
        this.report_date = this.listbutton[0].report_date;
        this.external_evaluation = this.listbutton[0].external_evaluation;
        this.influence_information_security = this.listbutton[0].influence_information_security;
        this.social_evaluation = this.listbutton[0].social_evaluation;
        this.reason2 = this.listbutton[0].reason2;
        this.retirement_strategy = this.listbutton[0].retirement_strategy;
        this.impact_resignation_internal = this.listbutton[0].impact_resignation_internal;
        this.impact_resignation_external = this.listbutton[0].impact_resignation_external;
        this.reporterlist = this.listbutton[0].reporter;
        this.diaoshu = true;

      },
      checklist() {
        this.$store
          .dispatch('PFANS2026Store/getList2', {'user_id': this.$store.getters.userinfo.userid})
          .then(response => {
            if (response.length > 0) {
              if (this.$route.params._id) {
                this.listsum = 0;
              } else {
                this.listsum = 1;
              }
            } else {
              this.listsum = 0;
            }
          }).catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
        });
      },
      buttontrue() {
        this.button = false;
        this.$store
          .dispatch('PFANS2026Store/getList', {'staffexitprocedure_id': this.$route.params._id})
          .then(response => {
            if (response.length > 0) {
              this.listbutton = response;
              this.button = true;
            } else {
              this.button = false;
            }
          }).catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
        });
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let lst = getUserInfo(val);
        let rst = getOrgInfoByUserId(val);
        if (rst) {
          this.centerid = rst.centerNmae;
          this.groupid = rst.groupNmae;
          this.teamid = rst.teamNmae;
          this.form.center_id = rst.centerId;
          this.form.group_id = rst.groupId;
          this.form.team_id = rst.teamId;
        } else {
          this.centerid = '';
          this.groupid = '';
          this.teamid = '';
          this.form.center_id = '';
          this.form.group_id = '';
          this.form.team_id = '';
        }
        if (lst) {
          this.form.sex = lst.userinfo.sex;
          this.form.educational_background = lst.userinfo.educational;
          this.form.position = lst.userinfo.post;
          this.form.entry_time = lst.userinfo.enterday;
          // ADD_FJL_05/13  -- 从人员信息里面取值
          this.form.email = lst.userinfo.email;
          this.form.address = lst.userinfo.address;
          this.form.cellphone = lst.userinfo.mobilenumber;
          this.form.fixed_phone = lst.userinfo.phone;
          // ADD_FJL_05/13  -- 从人员信息里面取值
        } else {
          this.form.sex = '';
          this.form.educational_background = '';
          this.form.position = '';
          this.form.entry_time = '';
          // ADD_FJL_05/13  -- 从人员信息里面取值
          this.form.email = '';
          this.form.address = '';
          this.form.cellphone = '';
          this.form.fixed_phone = '';
          // ADD_FJL_05/13  -- 从人员信息里面取值
        }
        if (!this.form.user_id || this.form.user_id === '' || typeof val == 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.user_name');
        } else {
          this.error = '';
        }
      },
      geteducational_background(val) {
        this.form.educational_background = val;
      },
      getsex(val) {
        this.form.sex = val;
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
          this.form.stage = '1';
        } else if (val.state === '2') {
          this.form.status = '4';
          this.form.stage = '0';
        }
        this.buttonClick('save');
      },
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
          this.form.stage = '1';
        } else if (val.state === '2') {
          this.form.status = '4';
          this.form.stage = '0';
        }
        this.buttonClick('save');
      },
      //upd 审批流程 to
      end() {
        this.form.status = '0';
        this.buttonClick('save');
      },
      buttonClick(val) {
        if (val === 'generate') {
          this.baseInfo2 = {};
          this.baseInfo2.staffexitprocedure = JSON.parse(JSON.stringify(this.form));
          this.baseInfo2.staffexitprocedure.staffexitprocedure_id = this.$route.params._id;
          this.loading = true;
          this.$store
            .dispatch('PFANS2026Store/generatesta', this.baseInfo2)
            .then(response => {
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
        } else if (val === 'insertsta') {
          this.$store
            .dispatch('PFANS2026Store/getList', {'staffexitprocedure_id': this.$route.params._id})
            .then(response => {
              if (response.length > 0) {
                Message({
                  message: this.$t('label.PFANS2026FROMVIEW_CHECKERROR'),
                  type: 'error',
                  duration: 5 * 1000,
                });
              } else {
                let checkid = this.$route.params._id;
                this.$router.push({
                  name: 'PFANS2032FormView',
                  params: {
                    _checkdisabled: true,
                    _staid: checkid,
                    disabled: true,
                  },
                });
              }
            }).catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
        } else if (val === 'save') {
          this.$refs['reff'].validate(valid => {
            if (valid) {
              if (this.listsum == 1) {
                Message({
                  message: this.$t('label.PFANS2026VIEW_CHECKERROR1'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
              }
              //离职相关手续的字段拼接
              this.loading = true;
              this.baseInfo = {};
              this.form.user_id = this.userlist;
              this.form.hope_exit_date = moment(this.form.hope_exit_date).format('YYYY-MM-DD');
              this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
              if (this.form.entry_time) {
                this.form.entry_time = moment(this.form.entry_time).format('YYYY-MM-DD');
              }
              this.form.delivery_sheet_date = moment(this.form.delivery_sheet_date).format('YYYY-MM-DD');
              this.form.report_date = moment(this.form.report_date).format('YYYY-MM-DD');
              this.baseInfo.staffexitprocedure = JSON.parse(JSON.stringify(this.form));
              if (this.$route.params._id) {
                this.baseInfo.staffexitprocedure.staffexitprocedure_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS2026Store/update', this.baseInfo)
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
                  .dispatch('PFANS2026Store/insert', this.baseInfo)
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
            } else {
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
          });
        }
      },
    },
  };


</script>

<style rel="stylesheet/scss" lang="scss">
  .custimize_drawer {
    -webkit-box-sizing: border-box;
    overflow: auto;
  }
</style>
