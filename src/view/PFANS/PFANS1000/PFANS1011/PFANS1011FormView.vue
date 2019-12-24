<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding:2rem">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS1011VIEW_OVERSEASBUSINESS')" name="first">
              <el-row>
                <el-col>
                  <span style="margin-right: 86%;color:#005BAA">{{$t('label.PFANS1011VIEW_OVERSEASBUSINESS')}}</span>
                </el-col>
              </el-row>
              <el-row style="padding-top:1.5rem">
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
                  <el-form-item :error="error" :label="$t('label.PFANS2007VIEW_NAME')" prop="user_id">
                    <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                          style="width:10.14rem" @getUserids="getUserids"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_SERVICEPOSITION')">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.serviceposition"
                              maxlength=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1011VIEW_FACETOFACE')" name="second">
              <el-row>
                <el-col>
                  <span style="margin-right:11rem;color:#005BAA">{{$t('label.PFANS1011VIEW_FACETOFACE')}}</span>
                </el-col>
              </el-row>
              <el-row style="padding-top:1.5rem">
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')">
                    <el-input :disabled="true" style="width:11rem" v-model="form.centere_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <el-input :disabled="true" style="width:11rem" v-model="form.groupe_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <el-input :disabled="true" style="width:11rem" v-model="form.teame_id"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="errorusere" :label="$t('label.PFANS2007VIEW_NAME')" prop="user">
                    <user :disabled="!disable" :error="errorusere" :selectType="selectType" :userlist="userelist"
                          style="width:10.14rem" v-model="form.user"  @getUserids="getUsere"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_INTERVIEWDAY')">
                    <el-date-picker
                      :disabled="!disable"
                      style="width:11rem"
                      type="date"
                      v-model="form.interviewday">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_INFORMATIONPC')">
                    <el-switch :disabled="!disable"
                               style="width:11rem"
                               v-model="informationpc"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_INFORMATIONNO')">
                    <el-switch :disabled="!disable"
                               style="width:11rem"
                               v-model="informationno"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_MANAGEMENT')">
                    <el-switch :disabled="!disable"
                               style="width:11rem"
                               v-model="management"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_HEALTHOFMEMBERS')">
                    <el-switch :disabled="!disable"
                               style="width:11rem"
                               v-model="healthofmembers"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_CUSTOMERS')">
                    <el-switch :disabled="!disable"
                               style="width:11rem"
                               v-model="customers"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_OBJECTCHINA')">
                    <el-switch :disabled="!disable"
                               style="width:11rem"
                               v-model="objectchina"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1011VIEW_OVERSEASBUSINESSNI')" name="third">
              <el-row>
                <el-col>
                  <span style="margin-right:11rem;color:#005BAA">{{$t('label.PFANS1011VIEW_OVERSEASBUSINESSNI')}}
                  </span>
                </el-col>
              </el-row>
              <el-row style="padding-top:1.5rem">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1009FORMVIEW_OBJECTIVE')">
                    <el-input :disabled="!disable" style="width:57.2rem" type="textarea"
                              v-model="form.objective"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_LOOKFORWARD')">
                    <el-input :disabled="!disable" style="width:57.2rem" type="textarea"
                              v-model="form.lookforward"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1011VIEW_HEALTHCONDITION')" name="fourth">
              <el-row>
                <el-col>
                  <span style="margin-right: 89%;color:#005BAA">{{$t('label.PFANS1011VIEW_HEALTHCONDITION')}}
                  </span>
                </el-col>
              </el-row>
              <el-row style="padding-top:1.5rem">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_KOLEI')">
                    <el-input :disabled="!disable" style="width:57.2rem" type="textarea"
                              v-model="form.kolei"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_RECENTLY')">
                    <el-input :disabled="!disable" style="width:57.2rem" type="textarea"
                              v-model="form.recently"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_NOW')">
                    <el-input :disabled="!disable" style="width:57.2rem" type="textarea" v-model="form.now"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1011VIEW_EMERGENCYCONTACT')" name="fifth">
              <el-row>
                <el-col>
                  <span style="margin-right: 89%;color:#005BAA">{{$t('label.PFANS1011VIEW_EMERGENCYCONTACT')}}
                  </span>
                </el-col>
              </el-row>
              <el-row style="padding-top:1.5rem">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2007VIEW_NAME')">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_SHANK')">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.shank"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ADDRESS')">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_PHONE')">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.phonenumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_BUSINESSPLACE')">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.businessplace"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_DEPLOY')">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.deploy"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_DOMEI')">
                    <el-input :disabled="!disable" style="width:56.8rem" type="textarea"
                              v-model="form.domei"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1011VIEW_TORESPONSIBLEPERSON')" name="Sixthly">
              <el-row>
                <el-col>
                  <span style="margin-right:11rem;color:#005BAA">{{$t('label.PFANS1011VIEW_TORESPONSIBLEPERSON')}}
                  </span>
                </el-col>
              </el-row>
              <el-row style="padding-top:1.5rem">
                <el-col :span="8">
                  <el-form-item :error="errorresponsibleperson" :label="$t('label.PFANS1011VIEW_RESPONSIBLEPERSON')"
                                prop="responsibleperson">
                    <user :disabled="!disable" :error="errorresponsibleperson" :selectType="selectType" :userlist="responsiblepersonlist"
                          style="width:10.14rem" v-model="form.responsibleperson" @getUserids="getresponsibleperson"></user>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_SPECIALCLASS')">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.specialclass"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_PHONE')" prop="phone">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.email')" prop="email">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="erroractasaperson" :label="$t('label.PFANS1011VIEW_ACTASAPERSON')" prop="actasaperson">
                    <user :disabled="!disable" :error="erroractasaperson" :selectType="selectType" :userlist="actasapersonlist"
                          style="width:10.14rem" v-model="form.actasaperson" @getUserids="getactasaperson"></user>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_SPECIALCLASS')">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.special"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_PHONE')" prop="phonenum">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.phonenum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.email')" prop="mail">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.mail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import user from '../../../components/user.vue';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import {validateEmail} from '@/utils/validate';
  import moment from 'moment';

  export default {
    name: 'PFANS1011FormView',
    components: {
      EasyNormalContainer,
      user,

    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2007VIEW_NAME')));
          this.error = this.$t('normal.error_08') + this.$t('label.PFANS2007VIEW_NAME');
        } else {
          callback();
          this.error = '';
        }
      };
      var validateuser = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2007VIEW_NAME')));
          this.errorusere = this.$t('normal.error_08') + this.$t('label.PFANS2007VIEW_NAME');
        } else {
          callback();
          this.errorusere = '';
        }
      };
      var validatePhone = (rule, value, callback) => {
        this.regExp =/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/
        if (this.form.phone !== null && this.form.phone !== '') {
          if (!this.regExp.test((value))) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1024VIEW_PHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validatePhonenum = (rule, value, callback) => {
        this.regExp =/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/
        if (this.form.phonenum !== null && this.form.phonenum !== '') {
          if (!this.regExp.test((value))) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1024VIEW_PHONE')));
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
      var checkmail = (rule, value, callback) => {
        if (this.form.mail !== null && this.form.mail !== '') {
          if (!validateEmail(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.email')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        activeName: 'first',
        loading: false,
        error: '',
        errorusere: '',
        errorresponsibleperson: '',
        erroractasaperson: '',
        selectType: 'Single',
        userlist: '',
        userelist: '',
        responsiblepersonlist: '',
        actasapersonlist: '',
        title: 'title.PFANS1011VIEW',
        buttonList: [],
        regExp: [],
        informationpc: '1',
        informationno: '1',
        management: '1',
        healthofmembers: '1',
        customers: '1',
        objectchina: '1',
        form: {
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          serviceposition: '',
          centere_id: '',
          groupe_id: '',
          teame_id: '',
          user: '',
          interviewday: '',
          informationpc: '',
          informationno: '',
          management: '',
          healthofmembers: '',
          customers: '',
          objectchina: '',
          objective: '',
          lookforward: '',
          kolei: '',
          recently: '',
          now: '',
          name: '',
          shank: '',
          address: '',
          phonenumber: '',
          businessplace: '',
          deploy: '',
          domei: '',
          responsibleperson: '',
          specialclass: '',
          phone: '',
          email: '',
          actasaperson: '',
          special: '',
          phonenum: '',
          mail: '',
        },
        disabled: false,
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          user: [{
            required: true,
            validator: validateuser,
            trigger: 'change',
          }],
          phone: [
            {validator: validatePhone, trigger: 'blur'}],
          phonenum: [
            {validator: validatePhonenum, trigger: 'blur'}],
          email: [
            {validator: checkemail, trigger: 'blur'}],
          mail: [
            {validator: checkmail, trigger: 'blur'}],
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
          .dispatch('PFANS1011Store/getOffshoreOne', {'offshore_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;
            this.userelist = this.form.user;
            this.responsiblepersonlist = this.form.responsibleperson;
            this.actasapersonlist = this.form.actasaperson;
            this.informationpc = this.form.informationpc;
            this.informationno = this.form.informationno;
            this.management = this.form.management;
            this.healthofmembers = this.form.healthofmembers;
            this.customers = this.form.customers;
            this.objectchina = this.form.objectchina;
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
        this.userelist = this.$store.getters.userinfo.userid;
        if (this.userelist !== null && this.userelist !== '') {
          this.form.user = this.$store.getters.userinfo.userid;
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.centere_id = lst.centerNmae;
          this.form.groupe_id = lst.groupNmae;
          this.form.teame_id = lst.teamNmae;
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
          this.error = this.$t('normal.error_08') + this.$t('label.PFANS2007VIEW_NAME');
        } else {
          this.error = '';
        }
      },
      getUsere(val) {
        this.form.user = val;
        let lst = getOrgInfoByUserId(val);
        this.form.centere_id = lst.centerNmae;
        this.form.groupe_id = lst.groupNmae;
        this.form.teame_id = lst.teamNmae;
        if (!this.form.user || this.form.user === '' || val === 'undefined') {
          this.errorusere = this.$t('normal.error_08') + this.$t('label.PFANS2007VIEW_NAME');
        } else {
          this.errorusere = '';
        }
      },
      getresponsibleperson(val) {
        this.form.responsibleperson = val;
        this.responsiblepersonlist = val;
        if (!this.form.responsibleperson || this.form.responsibleperson === '' || val === 'undefined') {
          this.errorresponsibleperson = this.$t('normal.error_09') + this.$t('label.PFANS1011VIEW_RESPONSIBLEPERSON');
        } else {
          this.errorresponsibleperson = '';
        }
      },
      getactasaperson(val) {
        this.form.actasaperson = val;
        this.actasapersonlist = val;
        if (!this.form.actasaperson || this.form.actasaperson === '' || val === 'undefined') {
          this.erroractasaperson = this.$t('normal.error_09') + this.$t('label.PFANS1011VIEW_ACTASAPERSON');
        } else {
          this.erroractasaperson = '';
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
            title: 11,
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
              this.form.interviewday = moment(this.form.interviewday).format('YYYY-MM-DD');
              if (this.$route.params._id) {
                this.form.offshore_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1011Store/updateOffshore', this.form)
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
                this.form.interviewday = moment(this.form.interviewday).format('YYYY-MM-DD');
                this.$store
                  .dispatch('PFANS1011Store/createOffshore', this.form)
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
