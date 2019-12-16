<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding:2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:11rem" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:11rem" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:11rem" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width:10.14rem" v-model="form.user_id"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_TELEPHONE')" prop="telephone">
                <el-input :disabled="!disable" style="width: 11rem" v-model="form.telephone" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                <dicselect :code="code1"
                           :data="form.budgetunit"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="getbudgetunit"
                           style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_MODULE')">
                <dicselect :code="code2"
                           :data="form.moduleid"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="getmodule"
                           style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_ACCOUNTNUMBER')" prop="accountnumber">
                <el-input :disabled="!disable" maxlength="20" style="width:11rem"
                          v-model="form.accountnumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="30">
              <div class="sub_color_blue">{{$t('label.PFANS1006FORMVIEW_BORROWINGCONTENT')}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errorapplicationdate" :label="$t('label.application_date')" prop="application_date">
                <el-date-picker
                  :disabled="!disable"
                  :error="errorapplicationdate"
                  style="width:11rem"
                  type="date"
                  v-model="form.application_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorreimbursement" :label="$t('label.PFANS1006FORMVIEW_REIMBURSEMENT')"
                            prop="reimbursement">
                <el-date-picker :disabled="!disable" :error="errorreimbursement" style="width: 11rem"
                                v-model="form.reimbursement">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1006FORMVIEW_CURRENCYCHOICE')" prop="currencychoice">
                <dicselect :code="code3"
                           :data="form.currencychoice"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changecurrencychoice"
                           style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_AMOUNT')" prop="moneys">
                <el-input-number v-model="form.moneys"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:11rem"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item :label="$t('label.PFANS1012VIEW_ABSTRACT')" prop="remark">
              <el-input :disabled="!disable" :rows="4" style="width:57.1rem" type="textarea" v-model="form.remark">
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.remarks')">
                <el-input :disabled="!disable" :rows="4" type="textarea" style="width:57.1rem" v-model="form.remarks">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="30">
              <div class="sub_color_blue">{{$t('label.PFANS1006FORMVIEW_PAYMENTMETHOD')}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_PAYMENTMETHOD')" prop="paymentmethod">
                <dicselect :code="code4"
                           :data="form.paymentmethod"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="getPayment"
                           style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_PAYEENAME')" v-show="show1" prop="payeename">
                <el-input :disabled="!disable" style="width: 11rem" v-model="form.payeename" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')" v-show="show1" prop="payeecode">
                <el-input :disabled="!disable" style="width: 11rem" maxlength="20"
                          v-model="form.payeecode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')" v-show="show1"
                            prop="payeebankaccountnumber">
                <el-input :disabled="!disable" style="width: 11rem" v-model="form.payeebankaccountnumber"
                          maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')" v-show="show1" prop="payeebankaccount">
                <el-input :disabled="!disable" style="width: 11rem" v-model="form.payeebankaccount"
                          maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_PERSONALNAME')" v-show="show2" prop="name">
                <el-input :disabled="!disable" style="width: 11rem" v-model="form.name" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_PAYEENAME')" v-show="show3" prop="accountpayeename">
                <el-input :disabled="!disable" style="width: 11rem" v-model="form.accountpayeename"
                          maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="1" style="padding-left:1rem">
              <img :src="png11">
            </el-col>
            <el-col :span="21" style="color: orange;padding-left:2rem;size: 1rem;font-size:0.9rem">
              <label>
                <span><b>{{this.warning}}</b><br/>{{this.warning1}}<br/>{{this.warning2}}<br/>{{this.warning3}}</span>
              </label>
            </el-col>
          </el-row>
          <el-row style="padding-top:1rem">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1006FORMVIEW_REASONFORDELAY')" prop="reasonfordelay">
                <el-input :disabled="!disable" :rows="4" type="textarea" style="width:57.1rem"
                          v-model="form.reasonfordelay">
                </el-input>
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
  import dicselect from '../../../components/dicselect.vue';
  import {Message} from 'element-ui';
  import user from '../../../components/user.vue';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import moment from 'moment';
  import png11 from '@/assets/png/11.png';
  import {validateNumber} from '@/utils/validate';

  export default {
    name: 'PFANS1006FormView',
    components: {
      EasyNormalContainer,
      dicselect,
      user,
    },
    data() {
      var checkaccountnumber = (rule, value, callback) => {
        if (this.form.accountnumber !== null && this.form.accountnumber !== '') {
          if (!validateNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_ACCOUNTNUMBER')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validatePayeecode = (rule, value, callback) => {
        this.regExp = /^[A-Za-z0-9]+$/;
        if (this.form.payeecode !== null && this.form.payeecode !== '') {
          if (!this.regExp.test((value))) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validatePayeebankaccountnumber = (rule, value, callback) => {
        this.regExp = /^[A-Za-z0-9]+$/;
        if (this.form.ayeebankaccountnumber !== null && this.form.payeebankaccountnumber !== '') {
          if (!this.regExp.test((value))) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      var validateTel = (rule, value, callback) => {
        this.regExp = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/;
        if (this.form.telephone !== null && this.form.telephone !== '') {
          if (!this.regExp.test((value))) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_TELEPHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var varreimbursement = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.rules.reasonfordelay[0].required = false;
          callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT')));
          this.error = this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT');
        } else {
          if (this.form.application_date !== null && this.form.application_date !== '') {
            if (moment(value).format('YYYY-MM-DD') < moment(this.form.application_date).format('YYYY-MM-DD')) {
              callback(new Error(this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT') + this.$t('normal.error_checkTime1') + this.$t('label.application_date')));
              this.errorreimbursement = this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT') + this.$t('normal.error_checkTime1') + this.$t('label.application_date');
            } else {
              callback();
              this.errorreimbursement = '';
            }
          }
          var startDate = new Date(moment(this.form.application_date).format('YYYY-MM-DD'));
          var endDate = new Date(moment(value).format('YYYY-MM-DD'));
          var days = (endDate - startDate) / (1000 * 60 * 60 * 24);
          if (days > 15) {
            this.rules.reasonfordelay[0].required = true;
          } else {
            this.rules.reasonfordelay[0].required = false;
          }
          callback();
          this.error = '';
        }
      };
      var varapplication_date = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.rules.reasonfordelay[0].required = false;
        } else {
          if (this.form.reimbursement !== null && this.form.reimbursement !== '') {
            if (moment(value).format('YYYY-MM-DD') > moment(this.form.reimbursement).format('YYYY-MM-DD')) {
              callback(new Error(this.$t('label.application_date') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT')));
              this.errorapplicationdate = this.$t('label.application_date') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT');
            } else {
              callback();
              this.errorapplicationdate = '';
            }
          }
          var startDate = new Date(moment(value).format('YYYY-MM-DD'));
          var endDate = new Date(moment(this.form.reimbursement).format('YYYY-MM-DD'));
          var days = (endDate - startDate) / (1000 * 60 * 60 * 24);
          if (days > 15) {
            this.rules.reasonfordelay[0].required = true;
          } else {
            this.rules.reasonfordelay[0].required = false;
          }
          callback();
          this.error = '';
        }
      };
      return {
        regExp: [],
        png11: png11,
        loading: false,
        warning: this.$t('label.PFANS1006FORMVIEW_WARNING'),
        warning1: this.$t('label.PFANS1006FORMVIEW_WARNING1'),
        warning2: this.$t('label.PFANS1006FORMVIEW_WARNING2'),
        warning3: this.$t('label.PFANS1006FORMVIEW_WARNING3'),
        error: '',
        errorreimbursement: '',
        errorapplicationdate: '',
        selectType: 'Single',
        userlist: '',
        title: 'title.PFANS1006VIEW',
        buttonList: [],
        editableTabs: [],
        tabIndex: 0,
        multiple: false,
        form: {
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          telephone: '',
          budgetunit: '',
          moduleid: '',
          accountnumber: '',
          reimbursement: '',
          currencychoice: '',
          moneys: '',
          remark: '',
          remarks: '',
          paymentmethod: '',
          payeename: '',
          payeecode: '',
          payeebankaccountnumber: '',
          payeebankaccount: '',
          name: '',
          accountpayeename: '',
          reasonfordelay: '',
          application_date: moment(new Date()).format('YYYY-MM-DD'),
        },
        code1: 'PG001',
        code2: 'PJ002',
        code3: 'PJ014',
        code4: 'PJ015',
        show1: false,
        show2: false,
        show3: false,
        menuList: [],
        disabled: false,
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          telephone: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_TELEPHONE'),
            trigger: 'blur',
          },
            {validator: validateTel, trigger: 'blur'}],
          budgetunit: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
            trigger: 'change',
          }],
          accountnumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_ACCOUNTNUMBER'),
            trigger: 'blur',
          },
            {validator: checkaccountnumber, trigger: 'blur'},
          ],
          reimbursement: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT'),
            trigger: 'change',
          },
            {validator: varreimbursement, trigger: 'change'},
          ],
          application_date: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.application_date'),
            trigger: 'change',
          },
            {validator: varapplication_date, trigger: 'change'},
          ],
          currencychoice: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_CURRENCYCHOICE'),
            trigger: 'change',
          }],
          moneys: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_AMOUNT'),
            trigger: 'change',
          }],
          remark: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_ABSTRACT'),
            trigger: 'change',
          }],
          paymentmethod: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1012VIEW_PAYMENTMETHOD'),
            trigger: 'change',
          }],
          payeename: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEENAME'),
            trigger: 'change',
          }],
          payeecode: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_FOREIGNPAYEECODE'),
            trigger: 'change',
          },
            {validator: validatePayeecode, trigger: 'blur'}],
          payeebankaccountnumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKNUMBER'),
            trigger: 'change',
          },
            {validator: validatePayeebankaccountnumber, trigger: 'blur'}],
          payeebankaccount: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT'),
            trigger: 'change',
          }],
          name: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PERSONALNAME'),
            trigger: 'change',
          }],
          accountpayeename: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEENAME'),
            trigger: 'change',
          }],
          reasonfordelay: [{
            required: false,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1006FORMVIEW_REASONFORDELAY'),
            trigger: 'change',
          }],
        },
        canStart: false,
      };
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
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1006Store/getLoanapplicationOne', {'loanapplication_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;
            this.getPayment(this.form.paymentmethod);
            if (this.form.paymentmethod === 'PJ015001') {
              this.show1 = true;
            } else if (this.form.paymentmethod === 'PJ015002') {
              this.show2 = true;
            } else if (this.form.paymentmethod === 'PJ015003') {
              this.show3 = true;
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
          this.form.user_id = this.$store.getters.userinfo.userid;
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.center_id = lst.centerNmae;
          this.form.group_id = lst.groupNmae;
          this.form.team_id = lst.teamNmae;
        }
      }
    },
    methods: {
      getUserids(val) {
        this.form.user_id = val;
        let lst = getOrgInfoByUserId(val);
        this.form.center_id = lst.centerNmae;
        this.form.group_id = lst.groupNmae;
        this.form.team_id = lst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      getbudgetunit(val) {
        this.form.budgetunit = val;
      },
      getmodule(val) {
        this.form.moduleid = val;
      },
      changecurrencychoice(val) {
        this.form.currencychoice = val;
      },
      getPayment(val) {
        this.form.paymentmethod = val;
        if (val === 'PJ015001') {
          this.show1 = true;
          this.show2 = false;
          this.show3 = false;
          this.rules.name[0].required = false;
          this.rules.accountpayeename[0].required = false;
          this.rules.payeename[0].required = true;
          this.rules.payeecode[0].required = true;
          this.rules.payeebankaccountnumber[0].required = true;
          this.rules.payeebankaccount[0].required = true;
        } else if (val === 'PJ015002') {
          this.show1 = false;
          this.show2 = true;
          this.show3 = false;
          this.rules.name[0].required = true;
          this.rules.accountpayeename[0].required = false;
          this.rules.payeename[0].required = false;
          this.rules.payeecode[0].required = false;
          this.rules.payeebankaccountnumber[0].required = false;
          this.rules.payeebankaccount[0].required = false;
        } else if (val === 'PJ015003') {
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          this.rules.accountpayeename[0].required = true;
          this.rules.name[0].required = false;
          this.rules.payeename[0].required = false;
          this.rules.payeecode[0].required = false;
          this.rules.payeebankaccountnumber[0].required = false;
          this.rules.payeebankaccount[0].required = false;
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      start() {
        this.form.status = '2';
        this.buttonClick('update');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('update');
      },
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1001FormView',
          params: {
            title: 6,
          },
        });
      },
      buttonClick(val) {
        if (val === 'back') {
          this.paramsTitle();
        } else {
          this.$refs['refform'].validate(valid => {
            if (valid) {
              this.loading = true;
              if (this.form.paymentmethod === 'PJ015001') {
                this.form.name = '';
                this.form.accountpayeename = '';
              } else if (this.form.paymentmethod === 'PJ015002') {
                this.form.payeename = '';
                this.form.payeecode = '';
                this.form.payeebankaccountnumber = '';
                this.form.payeebankaccount = '';
                this.form.accountpayeename = '';
              } else if (this.form.paymentmethod === 'PJ015003') {
                this.form.name = '';
                this.form.payeename = '';
                this.form.payeecode = '';
                this.form.payeebankaccountnumber = '';
                this.form.payeebankaccount = '';
              }
              this.form.reimbursement = moment(this.form.reimbursement).format('YYYY-MM-DD');
              this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
              if (this.$route.params._id) {
                this.form.loanapplication_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1006Store/updateLoanapplication', this.form)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    if (val !== 'update') {
                      Message({
                        message: this.$t('normal.success_02'),
                        type: 'success',
                        duration: 5 * 1000,
                      });
                      this.paramsTitle();
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
                  .dispatch('PFANS1006Store/createLoanapplication', this.form)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.paramsTitle();
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
        }
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
