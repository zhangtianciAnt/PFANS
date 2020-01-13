<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick"
                         ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:2vw" type="border-card">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.user_name')" prop="name">
                <el-input :disabled="!disable" maxlength='20' style="width:20vw" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.sex')" prop="sex">
                <dicselect
                  :code="code1"
                  :data="form.sex"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="changesex"
                  style="width:20vw"
                  v-model="form.sex">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="erroracceptdate" :label="$t('label.PFANS2003VIEW_ACCEPTDATE')" prop="accept_date">
                <el-date-picker
                  :disabled="!disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.accept_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errorinterviewdep" :label="$t('label.PFANS2003FORMVIEW_INTERVIEWDEP')"
                            prop="interviewdep">
                <org :disabled="!disable" :error="errorinterviewdep"
                     :orglist="form.interviewdep" @getOrgids="getInterviewDep"
                     orgtype="2" style="width:20vw">
                </org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorinterviewdate" :label="$t('label.PFANS2003FORMVIEW_INTERVIEWDATE')"
                            prop="interview_date">
                <el-date-picker
                  :disabled="!disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.interview_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_WHETHERENTRY')" prop="whetherentry">
                <el-switch :disabled="!disable"
                           @change="changewhetherentry"
                           active-value="0"
                           inactive-value="1"
                           style="width:20vw"
                           v-model="modelwhetherentry"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_RESULT')">
                <el-switch :disabled="!result1"
                           active-value="0"
                           inactive-value="1"
                           style="width:20vw"
                           v-model="modelresult"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errorrecommenddep" :label="$t('label.PFANS2003VIEW_RECOMMENDDEP')"
                            prop="recommenddep"
                            v-show="show">
                <org :disabled="!disable"
                     :error="errorrecommenddep"
                     :orglist="form.recommenddep"
                     @getOrgids="getRecommendDep"
                     orgtype="2"
                     style="width:20vw"
                ></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_RECOMMENDDATE')" prop="recommend_date" v-show="show">
                <el-date-picker
                  :disabled="!disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.recommend_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003VIEW_SOURCE')" prop="source">
                <dicselect
                  :code="code2"
                  :data="form.source"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="getsource"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS2003FORMVIEW_MEMBER')" prop="member" v-show="show1">
                <user :disabled="!disable" :error="error" :selectType="selectType"
                      :userlist="userlist"
                      @getUserids="getUserids"
                      style="width:20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errornetwork" :label="$t('label.PFANS2003FORMVIEW_NETWORK')" prop="network"
                            v-show="show2">
                <el-input :disabled="!disable" :error="errornetwork"
                          maxlength='50'
                          style="width:20vw" v-model="form.network"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" prop="contactinformation">
                <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                          v-model="form.contactinformation"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input
                  :disabled="!disable" maxlength="20" style="width:20vw"
                  v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_RN')">
                <dicselect
                  :code="code4"
                  :data="form.rn"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="changern"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003VIEW_SCHOOL')">
                <el-input :disabled="!disable" maxlength='20' style="width:20vw" v-model="form.school"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_SUPPLEMENT')">
                <dicselect
                  :code="code3"
                  :data="form.supplement"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="changesupplement"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="this.$t('label.PFANS2003FORMVIEW_SALARY') + this.$t('label.yuan')">
                <el-input-number
                  :disabled="!disable"
                  :max="1000000000"
                  :min="0"
                  :precision="2"
                  controls-position="right"
                  style="width:20vw"
                  v-model="form.salary"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003VIEW_TECHNOLOGY')">
                <dicselect
                  :code="code5"
                  :data="form.technology"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="gettechnology"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_SPECIALITY')">
                <el-input :disabled="!disable" style="width:20vw" v-model="form.speciality"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_RESULTSHOWS')">
                <el-input :disabled="!disable" style="width:71.4vw" type="textarea"
                          v-model="form.resultshows"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.remarks')">
                <el-input :disabled="!disable" style="width:71.4vw" type="textarea" v-model="form.remarks"></el-input>
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
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect.vue';
  import user from '../../../components/user.vue';
  import org from '../../../components/org';
  import moment from 'moment';
  import {telephoneNumber, validateEmail} from '@/utils/validate';

  export default {
    name: 'PFANS2003FormView',
    components: {
      EasyNormalContainer,
      dicselect,
      user,
      org,
    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (rule.required && (!value || value === '' || value === 'undefined')) {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_MEMBER')));
          this.error = this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_MEMBER');
        } else {
          callback();
          this.error = '';
        }
      };
      var validateinterviewdepid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP')));
          this.errorinterviewdep = this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP');
        } else {
          callback();
          this.errorinterviewdep = '';
        }
      };
      var validaterecommenddepid = (rule, value, callback) => {
        if (this.modelwhetherentry === '1') {
          callback();
          this.errorrecommenddep = '';
        } else if (this.modelwhetherentry === '0') {
          if (!value || value === '' || value === 'undefined') {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2003VIEW_RECOMMENDDEP')));
            this.errorrecommenddep = this.$t('normal.error_08') + this.$t('label.PFANS2003VIEW_RECOMMENDDEP');
          } else {
            callback();
          }
        }
      };
      var validatesourceid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2003VIEW_SOURCE')));
          this.error = this.$t('normal.error_08') + this.$t('label.PFANS2003VIEW_SOURCE');
        } else {
          callback();
          this.error = '';
        }
      };
      var validateTel = (rule, value, callback) => {
        if (this.form.contactinformation !== null && this.form.contactinformation !== '') {
          if (telephoneNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var checkemail = (rule, value, callback) => {
        if (this.form.email !== null && this.form.email !== '') {
          if (!validateEmail(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.email')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateaccept_date = (rule, value, callback) => {
        if (this.form.accept_date !== null && this.form.accept_date !== '') {
          if (moment(value).format('YYYY-MM-DD') > moment(this.form.interview_date).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS2003VIEW_ACCEPTDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE')));
            this.erroracceptdate = this.$t('label.PFANS2003VIEW_ACCEPTDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE');
          } else {
            callback();
            this.erroracceptdate = '';
          }
        } else {
          callback();
          this.erroracceptdate = '';
        }
      };
      var validateinterview_date = (rule, value, callback) => {
        if (this.form.interview_date !== null && this.form.interview_date !== '') {
          if (moment(value).format('YYYY-MM-DD') < moment(this.form.accept_date).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2003VIEW_ACCEPTDATE')));
            this.errorinterviewdate = this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2003VIEW_ACCEPTDATE');
          } else {
            callback();
            this.errorinterviewdate = '';
          }
        } else {
          callback();
          this.errorinterviewdate = '';
        }
      };
      return {
        modelwhetherentry: '1',
        modelresult: '1',
        loading: false,
        errorinterviewdep: '',
        errorrecommenddep: '',
        erroracceptdate: '',
        errorinterviewdate: '',
        error: '',
        errornetwork: '',
        selectType: 'Single',
        userlist: '',
        title: 'title.PFANS2003VIEW',
        buttonList: [],
        multiple: false,
        form: {
          interviewrecord_id: '',
          name: '',
          sex: '',
          accept_date: '',
          interviewdep: '',
          interview_date: '',
          recommenddep: '',
          recommend_date: '',
          source: '',
          member: '',
          network: '',
          school: '',
          supplement: '',
          rn: '',
          contactinformation: '',
          email: '',
          salary: '',
          technology: '',
          speciality: '',
          result: '1',
          whetherentry: '1',
          resultshows: '',
          remarks: '',
          nodeList: [],
        },
        List: '',
        code1: 'PR019',
        code2: 'PR020',
        code3: 'PR022',
        code4: 'PR021',
        code5: 'PR023',
        menuList: [],
        result1: false,
        show1: false,
        show2: false,
        show: false,
        rules: {
          name: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.user_name'),
            trigger: 'blur',
          }],
          sex: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.sex'),
            trigger: 'change',
          }],
          accept_date: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2003VIEW_ACCEPTDATE'),
            trigger: 'change',
          },
            {validator: validateaccept_date, trigger: 'change'}],
          interviewdep: [{
            required: true,
            validator: validateinterviewdepid,
            trigger: 'change',
          }],
          interview_date: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE'),
            trigger: 'change',
          },
            {validator: validateinterview_date, trigger: 'change'}],
          source: [{
            required: true,
            validator: validatesourceid,
            trigger: 'change',
          }],
          member: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          network: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_NETWORK'),
            trigger: 'blur',
          }],
          recommend_date: [{
            required: false,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_RECOMMENDDATE'),
            trigger: 'blur',
          }],
          recommenddep: [
            {
              required: false,
              validator: validaterecommenddepid,
              trigger: 'blur',
            },
          ],
          email: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.email'),
            trigger: 'blur',
          },
            {validator: checkemail, trigger: 'blur'}],
          contactinformation: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION'),
            trigger: 'blur',
          },
            {validator: validateTel, trigger: 'blur'}],
        },
      };
    },
    created() {
      this.disable = this.$route.params.disabled;
      this.result1 = this.$route.params.disabled;
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
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS2003Store/getinterviewrecordOne', {'interviewrecord_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.getsource(this.form.source);
            this.userlist = this.form.member;
            if (this.form.source === 'PR020001') {
              this.show1 = true;
              this.show2 = false;
              this.rules.member[0].required = true;
              this.error = '';
              this.rules.network[0].required = false;
            }
            if (this.form.source === 'PR020002') {
              this.show1 = false;
              this.show2 = true;
              this.rules.network[0].required = true;
              this.rules.member[0].required = false;
            }
            this.modelwhetherentry = this.form.whetherentry;
            if (this.form.whetherentry === '0') {
              this.show = true;
              this.result1 = false;
              this.rules.recommend_date[0].required = true;
              this.rules.recommenddep[0].required = true;
            }
            this.modelresult = this.form.result;
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
      }
    },
    methods: {
      getInterviewDep(val) {
        this.form.interviewdep = val;
        if (!this.form.interviewdep || this.form.interviewdep === '' || val === 'undefined') {
          this.errorinterviewdep = this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP');
        } else {
          this.errorinterviewdep = '';
        }
      },
      getRecommendDep(val) {
        this.form.recommenddep = val;
        if (!this.form.recommenddep || this.form.recommenddep === '' || val === 'undefined') {
          this.errorrecommenddep = this.$t('normal.error_09') + this.$t('label.PFANS2003VIEW_RECOMMENDDEP');
        } else {
          this.errorrecommenddep = '';
        }
      },
      getUserids(val) {
        this.userlist = val;
        this.form.member = val;
        if (!this.form.member || this.form.member === '' || val === 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_MEMBER');
        } else {
          this.error = '';
        }
      },
      gettechnology(val) {
        this.form.technology = val;
        if (val === 'PR023001') {
        } else if (val === 'PR023002') {
        }
      },
      getsource(val) {
        this.form.source = val;
        if (val === 'PR020001') {
          this.show1 = true;
          this.show2 = false;
          this.rules.member[0].required = true;
          this.error = '';
          this.rules.network[0].required = false;
        } else if (val === 'PR020002') {
          this.show1 = false;
          this.show2 = true;
          this.rules.network[0].required = true;
          this.rules.member[0].required = false;
        }
      },
      changesex(val) {
        this.form.sex = val;
      },
      changesupplement(val) {
        this.form.supplement = val;
      },
      changern(val) {
        this.form.rn = val;
      },
      changewhetherentry(val) {
        if (val === '1') {
          this.show = false;
          this.result1 = true;
          this.rules.recommend_date[0].required = false;
          this.rules.recommenddep[0].required = false;
        } else {
          this.show = true;
          this.modelresult = '0';
          this.result1 = false;
          this.rules.recommend_date[0].required = true;
          this.rules.recommenddep[0].required = true;
        }
      },
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.loading = true;
            this.form.member = this.userlist;
            this.form.whetherentry = this.whetherentry;
            this.form.result = this.result;
            if (this.form.source === 'PR020001') {
              this.form.network = '';
            } else if (this.form.source === 'PR020002') {
              this.form.member = '';
            }
            this.form.whetherentry = this.modelwhetherentry;
            if (this.form.whetherentry === '1') {
              this.form.recommend_date = '';
              this.form.recommenddep = '';
            }
            this.form.result = this.modelresult;
            if (this.$route.params._id) {
              this.form.interviewrecord_id = this.$route.params._id;
              this.$store
                .dispatch('PFANS2003Store/updateinterviewrecord', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t('normal.success_02'),
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
            } else {
              this.$store
                .dispatch('PFANS2003Store/createinterviewrecord', this.form)
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
