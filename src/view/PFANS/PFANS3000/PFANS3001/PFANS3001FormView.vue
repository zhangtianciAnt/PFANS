<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="ruleForm"
                 style="padding: 20px">
          <el-tabs @tab-click="handleClick" v-model="form.ticketstype">
            <el-tab-pane :label="$t('label.PFANS3001FORMVIEW_DOMESTIC')" name="first" value="1"></el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS3001FORMVIEW_FOREIGN')" name="second" value="2"></el-tab-pane>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.center')">
                  <el-input :disabled="true" style="width: 11rem" v-model="form.center_id"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.group')">
                  <el-input :disabled="true" style="width: 11rem" v-model="form.group_id"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.team')">
                  <el-input :disabled="true" style="width: 11rem" v-model="form.team_id"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                  <user :disabled="!disable" :error="error" :selectType="selectType"
                        :userlist="userlist" @getUserids="getUserids" style="width: 10.1rem"></user>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_ROMANID')" prop="romanid">
                  <el-input :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.romanid"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.budgetunit')" prop="budgetnumber">
                  <dicselect
                    :code="code"
                    :data="form.budgetnumber"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="getBudgetnumber"
                    style="width: 11rem">
                  </dicselect>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_EXTENSIONNUMBER')" prop="extensionnumber">
                  <el-input :disabled="!disable" style="width: 11rem"
                            v-model="form.extensionnumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="showDomestic">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_IDCARD')" prop="idcard">
                  <el-input :disabled="!disable" maxlength="18" style="width: 11rem" v-model="form.idcard"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="showDomestic">
                <el-form-item :label="$t('label.PFANS3001VIEW_MOBILEPHONE')" prop="mobilephone">
                  <el-input :disabled="!disable" maxlength="11" style="width: 11rem"
                            v-model="form.mobilephone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="showForeign">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_PASSPORT')" prop="passport">
                  <el-input :disabled="!disable" maxlength="9" style="width: 11rem" v-model="form.passport"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="showForeign">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_EFFECTIVEDATE')" prop="effectivedate">
                  <el-date-picker :disabled="!disable" style="width: 11rem" type="date"
                                  v-model="form.effectivedate"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="showForeign">
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_MOBILEPHONE')" prop="mobilephone">
                  <el-input :disabled="!disable" maxlength="11" style="width: 11rem"
                            v-model="form.mobilephone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_TRIPPOINT')" prop="trippoint">
                  <el-input :disabled="!disable" maxlength="50" style="width: 11rem"
                            v-model="form.trippoint"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_TRIPSTART')" prop="tripstart">
                  <el-date-picker :disabled="!disable" style="width: 11rem" type="date"
                                  v-model="form.tripstart"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_TRIPEND')" prop="tripend">
                  <el-date-picker :disabled="!disable" style="width: 11rem" type="date"
                                  v-model="form.tripend"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_GOING')" prop="going">
                  <el-input :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.going"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_GOAIRLINENUMBER')" prop="goairlinenumber">
                  <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                            v-model="form.goairlinenumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :error="errorgodeparturedate" :label="$t('label.PFANS3001VIEW_GODEPARTUREDATE')"
                              prop="godeparturedate">
                  <el-date-picker :disabled="!disable" style="width: 11rem" type="datetime"
                                  v-model="form.godeparturedate"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :error="errorgoarrivaldate" :label="$t('label.PFANS3001VIEW_GOARRIVALDATE')"
                              prop="goarrivaldate">
                  <el-date-picker :disabled="!disable" style="width: 11rem" type="datetime"
                                  v-model="form.goarrivaldate"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_BACK')" prop="back">
                  <el-input :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.back"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_GOAIRLINENUMBER')" prop="reairlinenumber">
                  <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                            v-model="form.reairlinenumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :error="errorredeparturedate" :label="$t('label.PFANS3001VIEW_GODEPARTUREDATE')"
                              prop="redeparturedate">
                  <el-date-picker :disabled="!disable" style="width: 11rem" type="datetime"
                                  v-model="form.redeparturedate"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :error="errorrearrivaldate" :label="$t('label.PFANS3001VIEW_GOARRIVALDATE')"
                              prop="rearrivaldate">
                  <el-date-picker :disabled="!disable" style="width: 11rem" type="datetime"
                                  v-model="form.rearrivaldate"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_TICKETINGDATE')" prop="ticketingdate">
                  <el-date-picker :disabled="!disable" style="width: 11rem" type="date"
                                  v-model="form.ticketingdate"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import PFANS3001View from '../PFANS3001/PFANS3001View.vue';
  import {Message} from 'element-ui';
  import user from '../../../components/user.vue';
  import dicselect from '../../../components/dicselect.vue';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import {isvalidPhone, idcardNumber, telephoneNumber} from '@/utils/validate';
  import moment from 'moment';

  export default {
    name: 'PFANS3001FormView',
    components: {
      EasyNormalContainer,
      PFANS3001View,
      user,
      dicselect,
    },
    data() {
      var validateExtensionnumber = (rule, value, callback) => {
        this.regExp =/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/
        if (this.form.extensionnumber !== null && this.form.extensionnumber !== '') {
          if (!this.regExp.test((value))) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateIdCard = (rule, value, callback) => {
        if (this.form.idcard !== null && this.form.idcard !== '') {
          if (!idcardNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3001FORMVIEW_IDCARD')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value ==="undefined") {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      var validateTel = (rule, value, callback) => {
        if (this.form.mobilephone !== null && this.form.mobilephone !== '') {
          if (!isvalidPhone(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3001VIEW_MOBILEPHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateTripstart = (rule, value, callback) => {
        if (this.form.tripstart !== null && this.form.tripstart !== '' && this.form.tripend !== null && this.form.tripend !== '') {
          if (moment(value).format('YYYY-MM-DD') > moment(this.form.tripend).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS3001FORMVIEW_TRIPSTART') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001FORMVIEW_TRIPEND')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateTripend = (rule, value, callback) => {
        if (this.form.tripend !== null && this.form.tripend !== '' && this.form.tripstart !== null && this.form.tripstart !== '') {
          if (moment(value).format('YYYY-MM-DD') < moment(this.form.tripstart).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS3001FORMVIEW_TRIPEND') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001FORMVIEW_TRIPSTART')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateGodeparturedate = (rule, value, callback) => {
        if (this.form.godeparturedate !== null && this.form.godeparturedate !== '' && this.form.goarrivaldate !== null && this.form.goarrivaldate !== '') {
          if (moment(value).format('YYYY-MM-DD HH:mm:ss') >= moment(this.form.goarrivaldate).format('YYYY-MM-DD HH:mm:ss')) {
            callback(new Error(this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE')));
            this.errorgodeparturedate = this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE');
          } else {
            callback();
            this.errorgodeparturedate = '';
          }
        } else {
          callback();
          this.errorgodeparturedate = '';
        }
      };
      var validateGoarrivaldate = (rule, value, callback) => {
        if (this.form.goarrivaldate !== null && this.form.goarrivaldate !== '' && this.form.godeparturedate !== null && this.form.godeparturedate !== '') {
          if (moment(value).format('YYYY-MM-DD HH:mm:ss') <= moment(this.form.godeparturedate).format('YYYY-MM-DD HH:mm:ss')) {
            callback(new Error(this.$t('label.PFANS3001VIEW_GOARRIVALDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE')));
            this.errorgoarrivaldate = this.$t('label.PFANS3001VIEW_GOARRIVALDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE');
          } else {
            callback();
            this.errorgoarrivaldate = '';
          }
        } else {
          callback();
          this.errorgoarrivaldate = '';
        }
      };
      var validateRedeparturedate = (rule, value, callback) => {
        if (this.form.redeparturedate !== null && this.form.redeparturedate !== '') {
          if (this.form.rearrivaldate !== null && this.form.rearrivaldate !== '' && moment(value).format('YYYY-MM-DD HH:mm:ss') >= moment(this.form.rearrivaldate).format('YYYY-MM-DD HH:mm:ss')) {
            callback(new Error(this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE')));
            this.errorredeparturedate = this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE');
          } else if (this.form.goarrivaldate !== null && this.form.goarrivaldate !== '' && moment(value).format('YYYY-MM-DD HH:mm:ss') <= moment(this.form.goarrivaldate).format('YYYY-MM-DD HH:mm:ss')) {
            callback(new Error(this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE')));
            this.errorredeparturedate = this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE');
          } else {
            callback();
            this.errorredeparturedate = '';
          }
        } else {
          callback();
          this.errorredeparturedate = '';
        }
      };
      var validateRearrivaldate = (rule, value, callback) => {
        if (this.form.rearrivaldate !== null && this.form.rearrivaldate !== '') {
          if (this.form.redeparturedate !== null && this.form.redeparturedate !== '' && moment(value).format('YYYY-MM-DD HH:mm:ss') <= moment(this.form.redeparturedate).format('YYYY-MM-DD HH:mm:ss')) {
            callback(new Error(this.$t('label.PFANS3001VIEW_GOARRIVALDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE')));
            this.errorrearrivaldate = this.$t('label.PFANS3001VIEW_GOARRIVALDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE');
          } else {
            callback();
            this.errorrearrivaldate = '';
          }
        } else {
          callback();
          this.errorrearrivaldate = '';
        }
      };
      return {
        errorredeparturedate: '',
        errorrearrivaldate: '',
        errorgodeparturedate: '',
        errorgoarrivaldate: '',
        showForeign: '',
        showDomestic: '',
        loading: false,
        title: 'title.PFANS3001VIEW',
        error: '',
        selectType: 'Single',
        userlist: '',
        buttonList: [],
        regExp: [],
        code: 'PG001',
        multiple: false,
        form: {
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          ticketstype: 'first',
          idcard: '',
          passport: '',
          effectivedate: '',
          romanid: '',
          extensionnumber: '',
          budgetnumber: '',
          mobilephone: '',
          trippoint: '',
          going: '',
          goairlinenumber: '',
          godeparturedate: '',
          goarrivaldate: '',
          back: '',
          reairlinenumber: '',
          redeparturedate: '',
          rearrivaldate: '',
          ticketingdate: '',
          tripstart: '',
          tripend: '',
        },
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'blur',
          }],
          romanid: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001FORMVIEW_ROMANID'),
            trigger: 'blur',
          }],
          budgetnumber: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
            trigger: 'change',
          }],
          extensionnumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER'),
            trigger: 'blur',
          },
            {validator: validateExtensionnumber, trigger: 'blur'}],
          idcard: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001FORMVIEW_IDCARD'),
            trigger: 'blur',
          },
            {validator: validateIdCard, trigger: 'blur'}],
          mobilephone: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_MOBILEPHONE'),
            trigger: 'blur',
          },
            {validator: validateTel, trigger: 'blur'}],
          passport: [{
            required: false,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001FORMVIEW_PASSPORT'),
            trigger: 'blur',
          }],
          effectivedate: [{
            required: false,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001FORMVIEW_EFFECTIVEDATE'),
            trigger: 'blur',
          }],
          trippoint: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_TRIPPOINT'),
            trigger: 'blur',
          }],
          tripstart: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001FORMVIEW_TRIPSTART'),
            trigger: 'change',
          },
            {validator: validateTripstart, trigger: 'change'}],
          tripend: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001FORMVIEW_TRIPEND'),
            trigger: 'change',
          },
            {validator: validateTripend, trigger: 'change'}],
          going: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_GOING'),
            trigger: 'blur',
          }],
          goairlinenumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_GOAIRLINENUMBER'),
            trigger: 'blur',
          }],
          godeparturedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE'),
            trigger: 'change',
          },
            {validator: validateGodeparturedate, trigger: 'change'}],
          goarrivaldate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE'),
            trigger: 'change',
          },
            {validator: validateGoarrivaldate, trigger: 'change'}],
          back: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_BACK'),
            trigger: 'blur',
          }],
          reairlinenumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_GOAIRLINENUMBER'),
            trigger: 'blur',
          }],
          redeparturedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE'),
            trigger: 'change',
          },
            {validator: validateRedeparturedate, trigger: 'change'}],
          rearrivaldate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE'),
            trigger: 'change',
          },
            {validator: validateRearrivaldate, trigger: 'change'}],
        },
      };
    },
    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            icon: 'el-icon-check',
          },
        ];
      }
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS3001Store/getPfans3001One', {'tickets_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            if (this.form.ticketstype === 'first') {
              this.showDomestic = true;
              this.showForeign = false;
              this.rules.idcard[0].required = true;
              this.rules.passport[0].required = false;
              this.rules.effectivedate[0].required = false;
            } else {
              this.showDomestic = false;
              this.showForeign = true;
              this.rules.idcard[0].required = false;
              this.rules.passport[0].required = true;
              this.rules.effectivedate[0].required = true;
            }
            this.userlist = this.form.user_id;
            if (this.form.status === '2') {
              this.disable = false;
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
        this.showDomestic = true;
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.center_id = lst.centerNmae;
          this.form.group_id = lst.groupNmae;
          this.form.team_id = lst.teamNmae;
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
      }
    },
    methods: {
      getBudgetnumber(val) {
        this.form.budgetnumber = val;
      },
      handleClick(tab, event) {
        if (tab.name === 'first') {
          this.showDomestic = true;
          this.showForeign = false;
          this.rules.idcard[0].required = true;
          this.rules.passport[0].required = false;
          this.rules.effectivedate[0].required = false;
        } else {
          this.showForeign = true;
          this.showDomestic = false;
          this.rules.idcard[0].required = false;
          this.rules.passport[0].required = true;
          this.rules.effectivedate[0].required = true;
        }
        this.$refs["ruleForm"].clearValidate();
      },
      getUserids(val) {
        this.form.user_id = val;
        let lst = getOrgInfoByUserId(val);
        this.form.center_id = lst.centerNmae;
        this.form.group_id = lst.groupNmae;
        this.form.team_id = lst.teamNmae;
        if (!this.form.user_id || this.form.user_id === ''  || val ==="undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick("update");
      },
      start() {
        this.form.status = '2';
        this.buttonClick("update");
      },
      end() {
        this.form.status = '0';
        this.buttonClick("update");
      },
      buttonClick(val) {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            if(this.form.ticketstype === 'first'){
              this.form.passport = '';
              this.form.effectivedate = '';
            }else {
              this.form.idcard = '';
            }
            if (this.$route.params._id) {
              this.form.abnormalid = this.$route.params._id;
              this.loading = true;
              this.$store
                .dispatch('PFANS3001Store/updatePfans3001', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if(val !== "update"){
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
              this.loading = true;
              this.$store
                .dispatch('PFANS3001Store/createPfans3001', this.form)
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

<style scoped>

</style>
