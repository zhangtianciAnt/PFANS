<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1011VIEW_OVERSEASBUSINESS')" name="first">
<!--              境外出張予定者-->
              <span  class="collapse_Title">{{$t('label.PFANS1011VIEW_OVERSEASBUSINESS')}}</span>
              <el-row style="padding-top:1.5vw">
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')">
                    <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                    <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.center_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                    <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.group_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                    <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.team_id"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="error" :label="$t('label.PFANS2007VIEW_NAME')" prop="user_id">
                    <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                          style="width:20vw" @getUserids="getUserids"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_SERVICEPOSITION')">
                    <el-input :disabled="true" style="width:20vw" v-model="form.serviceposition"
                              maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
<!--              面談者（記入者）-->
              <span  class="collapse_Title">{{$t('label.PFANS1011VIEW_IN2')}}</span>
              <el-row style="padding-top:1.5vw">
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')">
                    <el-input :disabled="true" style="width:20vw" v-model="form.centere_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <el-input :disabled="true" style="width:20vw" v-model="form.groupe_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <el-input :disabled="true" style="width:20vw" v-model="form.teame_id"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="errorusere" :label="$t('label.PFANS2007VIEW_NAME')" prop="user">
                    <user :disabled="!disable" :error="errorusere" :selectType="selectType" :userlist="userelist"
                          style="width:20vw" v-model="form.user" @getUserids="getUsere"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_INTERVIEWDAY')" prop="interviewday">
                    <el-date-picker
                      :disabled="!disable"
                      style="width:20vw"
                      type="date"
                      v-model="form.interviewday">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
  <!--              出張事前面談事項（面談者で手書き記入)-->
              <el-row>
                <!--                  1-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_INFORMATIONPC')" label-width="24vw">
                    <el-switch :disabled="!disable"
                               v-model="form.informationpc"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
                <!--                2-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_INFORMATIONNO')" label-width="24vw">
                    <el-switch :disabled="!disable"
                               v-model="form.informationno"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
                <!--                3-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_MANAGEMENT')" label-width="23vw">
                    <el-switch :disabled="!disable"
                               v-model="form.management"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
<!--                4-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_HEALTHOFMEMBERS')" label-width="23vw">
                    <el-switch :disabled="!disable"
                               v-model="form.healthofmembers"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
<!--                5-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_CUSTOMERS')" label-width="24vw">
                    <el-switch :disabled="!disable"
                               v-model="form.customers"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
<!--                6-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_OBJECTCHINA')" label-width="23vw">
                    <el-switch :disabled="!disable"
                               v-model="form.objectchina"
                               active-value="0"
                               inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1011VIEW_OVERSEASBUSINESSNI')" name="second">
            <!--   境外出張にあたって-->
              <span  class="collapse_Title">{{$t('label.PFANS1011VIEW_OVERSEASBUSINESSNI')}}</span>
              <el-row style="padding-top:1.5vw">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1009FORMVIEW_OBJECTIVE')">
                    <el-input :disabled="!disable" style="width:72vw" type="textarea" :rows="4"
                              v-model="form.objective"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_LOOKFORWARD')">
                    <el-input :disabled="!disable" style="width:72vw" type="textarea" :rows="4"
                              v-model="form.lookforward"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 健康状況-->
              <span  class="collapse_Title">{{$t('label.PFANS1011VIEW_HEALTHCONDITION')}}</span>
              <el-row style="padding-top:1.5vw">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_KOLEI')">
                    <el-input :disabled="!disable" style="width:72vw" type="textarea" :rows="4"
                              v-model="form.kolei"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_RECENTLY')" label-width="6vw">
                    <el-input :disabled="!disable" style="width:72vw" type="textarea" :rows="4"
                              v-model="form.recently"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_NOW')" label-width="6vw">
                    <el-input :disabled="!disable" style="width:72vw" type="textarea" :rows="4"
                              v-model="form.now"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1011VIEW_EMERGENCYCONTACT')" name="third">
            <!-- 緊急時の連絡先（家族）-->
              <span  class="collapse_Title">{{$t('label.PFANS1011VIEW_EMERGENCYCONTACT1')}}</span>
              <el-row style="padding-top:1.5vw">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2007VIEW_NAME')" prop="name">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.name" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_SHANK')" prop="shank">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.shank" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ADDRESS')" prop="address">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.address" maxlength="36"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_PHONE')" prop="phonenumber">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.phonenumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 出張先事業場と受入責任者-->
              <span  class="collapse_Title">{{$t('label.PFANS1011VIEW_TORESPONSIBLEPERSON')}}</span>
              <el-row style="padding-top:1.5vw">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_DOMEI')" prop="domei">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.domei" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_BUSINESSPLACE')" prop="businessplace">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.businessplace"
                              maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_DEPLOY')" prop="deploy">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.deploy" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_RESPONSIBLEPERSON')" prop="responsibleperson">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.responsibleperson"
                              maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_SPECIALCLASS')" prop="specialclass">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.specialclass"
                              maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_PHONE')" prop="phone">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.email')" prop="email">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.email" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_ACTASAPERSON')"
                                prop="actasaperson">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.actasaperson"
                              maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_SPECIALCLASS')" prop="special">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.special" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_PHONE')" prop="phonenum">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.phonenum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.email')" prop="mail">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.mail" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
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
  import {getOrgInfoByUserId, getUserInfo,getDictionaryInfo} from '@/utils/customize';
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
      var validatephonenumber = (rule, value, callback) => {
        this.regExp = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/;
        if (this.form.phonenumber !== null && this.form.phonenumber !== '') {
          if (!this.regExp.test((value))) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1024VIEW_PHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validatePhone = (rule, value, callback) => {
        this.regExp = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/;
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
        this.regExp = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/;
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
          centerid: '',
          groupid: '',
          teamid: '',
        activeName: 'first',
        loading: false,
        error: '',
        errorusere: '',
        selectType: 'Single',
        userlist: '',
        userelist: '',
        title: 'title.PFANS1011VIEW',
        buttonList: [],
        regExp: [],
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
          interviewday: moment(new Date()).format('YYYY-MM-DD'),
          informationpc: '1',
          informationno: '1',
          management: '1',
          healthofmembers: '1',
          customers: '1',
          objectchina: '1',
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
          interviewday: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1011VIEW_INTERVIEWDAY'),
            trigger: 'change',
          }],
          name: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2007VIEW_NAME'),
            trigger: 'change',
          }],
          shank: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1011VIEW_SHANK'),
            trigger: 'change',
          }],
          address: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANSUSERFORMVIEW_ADDRESS'),
            trigger: 'change',
          }],
          phonenumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_PHONE'),
            trigger: 'blur',
          },
            {validator: validatephonenumber, trigger: 'blur'}],
          businessplace: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1011VIEW_BUSINESSPLACE'),
            trigger: 'change',
          }],
          deploy: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1011VIEW_DEPLOY'),
            trigger: 'change',
          }],
          domei: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1011VIEW_DOMEI'),
            trigger: 'change',
          }],
          responsibleperson: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1011VIEW_RESPONSIBLEPERSON'),
            trigger: 'change',
          }],
          specialclass: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1011VIEW_SPECIALCLASS'),
            trigger: 'change',
          }],
          phone: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_PHONE'),
            trigger: 'blur',
          },
            {validator: validatePhone, trigger: 'blur'}],
          email: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.email'),
            trigger: 'blur',
          },
            {validator: checkemail, trigger: 'blur'}],
          actasaperson: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1011VIEW_ACTASAPERSON'),
            trigger: 'change',
          }],
          special: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1011VIEW_SPECIALCLASS'),
            trigger: 'change',
          }],
          phonenum: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_PHONE'),
            trigger: 'blur',
          },
            {validator: validatePhonenum, trigger: 'blur'}],
          mail: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.email'),
            trigger: 'blur',
          },
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
              let rst = getOrgInfoByUserId(response.user_id);
              if(rst){
                  this.centerid = rst.centerNmae;
                  this.groupid= rst.groupNmae;
                  this.teamid= rst.teamNmae;
              }
            this.userlist = this.form.user_id;
            this.userelist = this.form.user;
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
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
            if(rst) {
                this.centerid = rst.centerNmae;
                this.groupid= rst.groupNmae;
                this.teamid= rst.teamNmae;
                this.form.center_id = rst.centerId;
                this.form.group_id = rst.groupId;
                this.form.team_id = rst.teamId;
            }
          let lst = getUserInfo(this.$store.getters.userinfo.userid);
          if (lst) {
            this.form.serviceposition = lst.userinfo.post;
          }
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
        let rst = getUserInfo(val);
        let lst = getOrgInfoByUserId(val);
          if(lst){
              this.centerid = lst.centerNmae;
              this.groupid = lst.groupNmae;
              this.teamid = lst.teamNmae;
              this.form.center_id = lst.centerId;
              this.form.group_id = lst.groupId;
              this.form.team_id = lst.teamId;
          }else{
              this.centerid =  '';
              this.groupid =  '';
              this.teamid =  '';
              this.form.center_id = '';
              this.form.group_id =  '';
              this.form.team_id =  '';
          }
        if (rst) {
          this.form.serviceposition = getDictionaryInfo(rst.userinfo.rank).value1;
        } else {
          this.form.serviceposition = '';
        }
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
              this.customers = this.form.customers;
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
