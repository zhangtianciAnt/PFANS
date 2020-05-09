<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading"
                         :canStart="canStart" @start="start" @end="end" :enableSave="enableSave">
      <!--//start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
      <!--:enableSave="enableSave"-->
      <!--//end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <!--//start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_CORRESPONDING')" prop='corresponding'>
                <span style="margin-right: 1vw ">{{$t('label.PFANS1016FORMVIEW_INCOMPLETE')}}</span>
                <el-switch
                  :disabled="acceptShow"
                  @change="getcorresponding"
                  active-value="1"
                  inactive-value="0"
                  v-model="form.corresponding"
                ></el-switch>
                <span style="margin-left: 1vw ">{{$t('label.PFANS1016FORMVIEW_COMPLETE')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <!--//end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')">
                    <el-input :disabled="true" style="width:20vw" v-model="appcenterid"></el-input>
                    <el-input v-show='false' :disabled="true" maxlength='36' style="width: 20vw"
                              v-model="form.appcenter_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <el-input :disabled="true" style="width:20vw" v-model="appgroupid"></el-input>
                    <el-input v-show='false' :disabled="true" maxlength='36' style="width: 20vw"
                              v-model="form.appgroup_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <el-input :disabled="true" style="width:20vw" v-model="appteamid"></el-input>
                    <el-input v-show='false' :disabled="true" maxlength='36' style="width: 20vw"
                              v-model="form.appteam_id"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="error_applicant" :label="$t('label.applicant')" prop="user_id">
                    <user :disabled="true" :error="error_applicant" :selectType="selectType"
                          :userlist="userapplicantlist"
                          @getUserids="getApplicantids" style="width: 20vw"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.pfanstype')">
                    <el-input :disabled="true" maxlength='36' style="width: 20vw" v-model="form.type"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.subtype')" prop="subtype">
                    <dicselect
                      :code="code1"
                      :data="form.subtype"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="getSubtype"
                      style="width: 20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.application')">
                    <el-date-picker :disabled="true" style="width: 20vw" type="date"
                                    v-model="form.payment"></el-date-picker>
                  </el-form-item>
                </el-col>
                <!--                add_fjl-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_PERSONALCODE')">
                    <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.financecode"></el-input>
                  </el-form-item>
                </el-col>
                <!--                add_fjl-->
              </el-row>
          <el-row>
            <el-col :span="24">
                  <el-form-item :label="$t('label.PFANS1016FORMVIEW_REASON')">
                    <el-input :disabled="!disabled" :rows="2" style="width: 71vw" type="textarea"
                              v-model="form.reason"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
<!--            </el-collapse-item>-->
<!--          </el-collapse>-->
<!--          <el-collapse>-->
<!--            <el-collapse-item>-->
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS1018VIEW_APPLICATIONDEPLOYMENT')}}</span>
              </template>
              <!--          <el-row>-->
              <!--            <el-col :span="8">-->
              <!--              <el-form-item :label="$t('label.center')">-->
              <!--                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>-->
              <!--                <el-input v-show='false' :disabled="true" maxlength='36' style="width: 20vw" v-model="form.center_id"></el-input>-->
              <!--              </el-form-item>-->
              <!--            </el-col>-->
              <!--            <el-col :span="8">-->
              <!--              <el-form-item :label="$t('label.group')">-->
              <!--                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>-->
              <!--                <el-input v-show='false' :disabled="true" maxlength='36' style="width: 20vw" v-model="form.group_id"></el-input>-->
              <!--              </el-form-item>-->
              <!--            </el-col>-->
              <!--            <el-col :span="8">-->
              <!--              <el-form-item :label="$t('label.team')">-->
              <!--                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>-->
              <!--                <el-input v-show='false' :disabled="true" maxlength='36' style="width: 20vw" v-model="form.team_id"></el-input>-->
              <!--              </el-form-item>-->
              <!--            </el-col>-->
              <!--          </el-row>-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="error_user" :label="$t('label.PFANS3005VIEW_USER')" prop="user_name">
                    <!--                <user :disabled="!disabled" :error="error_user" :selectType="selectType" :userlist="useridlist"-->
                    <!--                      @getUserids="getUserids" style="width: 20vw"></user>-->
                    <el-input :disabled="!disabled" maxlength='36' style="width: 20vw"
                              v-model="form.user_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1016FORMVIEW_TYPESOF')" prop="applicationType">
                    <dicselect
                      :code="code3"
                      :data="form.applicationType"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="getApplicationtype"
                      style="width: 20vw"
                    ></dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.email')" prop="email">
                    <el-input :disabled="!disabled" style="width: 20vw"
                              v-model="form.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1018VIEW_ROMANNAME')" prop="romanname">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.romanname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1018FORMVIEW_INSIDENUMBER')" prop="extension">
                    <el-input :disabled="!disabled" style="width: 20vw" maxlength='20'
                              v-model="form.extension"></el-input>
                  </el-form-item>
                </el-col>
                <!--<el-col :span="8">-->
                <!--<el-form-item :label="$t('label.PFANS1018FORMVIEW_USINGLEVEL')" prop="useLevel">-->
                <!--<dicselect-->
                <!--:code="code2"-->
                <!--:data="form.useLevel"-->
                <!--:disabled="!disabled"-->
                <!--:multiple="multiple"-->
                <!--@change="getUsinglevel"-->
                <!--style="width: 20vw"-->
                <!--&gt;-->
                <!--</dicselect>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
              </el-row>
              <!--          <el-row>-->
              <!--            <el-col :span="10">-->
              <!--              <div class="sub_color_red">{{$t('label.PFANS1018FORMVIEW_LEVELBUTTOM')}}</div>-->
              <!--            </el-col>-->
              <!--          </el-row>-->
<!--            </el-collapse-item>-->
<!--          </el-collapse>-->
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import dicselect from '../../../components/dicselect.vue';
  import {Message} from 'element-ui';
  import {getCurrentRole4, getOrgInfoByUserId, getUserInfo} from '@/utils/customize';
  import moment from 'moment';
  import {validateEmail} from '@/utils/validate';

  export default {
    name: 'PFANS1018FormView',
    components: {
      EasyNormalContainer,
      user,
      dicselect,
    },
    data() {
      var checkapplicant = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.error_applicant = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        } else {
          this.error_applicant = '';
          return callback();
        }
      };
      var checkuser = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.error_user = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_USER');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_USER')));
        } else {
          this.error_user = '';
          return callback();
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
      return {
        centerid: '',
        groupid: '',
        teamid: '',
        appcenterid: '',
        appgroupid: '',
        appteamid: '',
        loading: false,
        error_applicant: '',
        error_user: '',
        selectType: 'Single',
        useridlist: '',
        userapplicantlist: '',
        //start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
        acceptShow: 'true',
        enableSave: false,
        //end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
        title: 'title.PFANS1018VIEW',
        disabled: false,
        buttonList: [],
        multiple: false,
        form: {
          global_id: '',
          type: this.$t('menu.PFANS1018'),
          subtype: '',
          payment: moment(new Date()).format('YYYY-MM-DD'),
          appcenter_id: '',
          appgroup_id: '',
          appteam_id: '',
          useLevel: '',
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          user_name: '',
          reason: '',
          email: '',
          //start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
          corresponding: '',
          //end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
          romanname: '',
          extension: '',
          applicationType: '',
          status: '',
            financecode: '',
        },
        code1: 'PJ044',
        code2: 'PJ054',
        code3: 'PJ045',
        disabled: true,
        rules: {
          user_id: [
            {
              required: true,
              validator: checkapplicant,
              trigger: 'change',
            },
          ],
          user_name: [
            {
              required: true,
              validator: checkuser,
              trigger: 'change',
            },
          ],
          applicationType: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1016FORMVIEW_TYPESOF'),
              trigger: 'change',
            },
          ],
          romanname: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1018VIEW_ROMANNAME'),
              trigger: 'change',
            },
          ],
          subtype: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.subtype'),
              trigger: 'change',
            },
          ],
          extension: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1018FORMVIEW_INSIDENUMBER'),
            trigger: 'blur',
          }],
          email: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.email'),
            trigger: 'blur',
          },
            {validator: checkemail, trigger: 'blur'}],
          // useLevel: [
          //   {
          //     required: true,
          //     message: this.$t('normal.error_09') + this.$t('label.PFANS1018FORMVIEW_USINGLEVEL'),
          //     trigger: 'change',
          //   },
          // ],
        },
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1018Store/getglobalApplyOne', {'global_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            let rst = getOrgInfoByUserId(response.user_id);
            if (rst) {
              this.centerid = rst.centerNmae;
              this.groupid = rst.groupNmae;
              this.teamid = rst.teamNmae;
              this.appcenterid = rst.centerNmae;
              this.appgroupid = rst.groupNmae;
              this.appteamid = rst.teamNmae;
            }
            this.userapplicantlist = this.form.user_id;
              // ADD_FJL  财务编码
              if (getUserInfo(this.form.user_id)) {
                this.form.financecode = getUserInfo(this.form.user_id).userinfo.personalcode;
              }
              // ADD_FJL  财务编码
            //start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
            let role = getCurrentRole4();
            if (role === '0') {
              if (this.form.status === '4') {
                this.enableSave = true;
                if (this.disable) {
                  this.acceptShow = false;
                } else {
                  this.acceptShow = true;
                }
              } else {
                this.acceptShow = true;
                this.enableSave = false;
              }
            }
            //end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
            this.useridlist = this.form.user_name;
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
        this.userapplicantlist = this.$store.getters.userinfo.userid;
          // ADD_FJL  财务编码
          if (getUserInfo(this.$store.getters.userinfo.userid)) {

            this.form.financecode = getUserInfo(this.$store.getters.userinfo.userid).userinfo.personalcode;
          }
          // ADD_FJL  财务编码
        if (this.userapplicantlist !== null && this.userapplicantlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (rst) {
            this.appcenterid = rst.centerNmae;
            this.appgroupid = rst.groupNmae;
            this.appteamid = rst.teamNmae;
            this.form.appcenter_id = rst.centerId;
            this.form.appgroup_id = rst.groupId;
            this.form.appteam_id = rst.teamId;
          }
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
        this.loading = false;
        this.useridlist = this.$store.getters.userinfo.userid;
        if (this.useridlist !== null && this.useridlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            this.form.group_id = rst.groupId;
            this.form.team_id = rst.teamId;
          }
          //this.form.user_name = this.$store.getters.userinfo.userid;
        }
        this.loading = false;
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
      getApplicantids(val) {
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        if (rst) {
          this.appcenterid = rst.centerNmae;
          this.appgroupid = rst.groupNmae;
          this.appteamid = rst.teamNmae;
          this.form.appcenter_id = rst.centerId;
          this.form.appgroup_id = rst.groupId;
          this.form.appteam_id = rst.teamId;
        } else {
          this.appcenterid = '';
          this.appgroupid = '';
          this.appteamid = '';
          this.form.appcenter_id = '';
          this.form.appgroup_id = '';
          this.form.appteam_id = '';
        }
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error_applicant = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.error_applicant = '';
        }
      },
      // <!--//start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
      getcorresponding(val) {
        this.form.corresponding = val;
      },
      //<!--//start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
      getUserids(val) {
        this.form.user_name = val;
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
        if (!this.form.user_name || this.form.user_name === '' || val === 'undefined') {
          this.error_user = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_USER');
        } else {
          this.error_user = '';
        }
      },
      getSubtype(val) {
        this.form.subtype = val;
      },
      getApplicationtype(val) {
        this.form.applicationType = val;
      },
      // getUsinglevel(val) {
      //   this.form.useLevel = val;
      // },
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
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.form.global_id = this.$route.params._id;
            this.form.payment = moment(this.form.payment).format('YYYY-MM-DD');
            this.loading = true;
            if (this.$route.params._id) {
              this.$store
                .dispatch('PFANS1018Store/updateglobalApply', this.form)
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
              this.form.payment = moment(this.form.payment).format('YYYY-MM-DD');
              this.loading = true;
              this.$store
                .dispatch('PFANS1018Store/createglobalApply', this.form)
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
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
