<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      ref="container"
      v-loading="loading"
      :buttonList="buttonList"
      :canStart="canStart"
      :enableSave="enableSave" :title="title"
      :workflowCode="workflowCode"
      @buttonClick="buttonClick"
      @disabled="setdisabled"
      @end="end"
      @start="start"
      @workflowState="workflowState"
    >
      <div slot="customize">
        <el-form ref="refform" :model="form" :rules="rules" label-position="top" label-width="8vw"
                 style="padding: 3vw">
          <!--            start  fjl 2020/04/08  添加总务担当的受理功能-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3001FORMVIEW_ACCEPTSTATUS')">
                <el-select v-model="form.acceptstatus" :disabled="acceptShow" :placeholder="$t('normal.error_09')" clearable
                           style="width: 20vw" @change="changeAcc">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_ACCEPTTIME')">
                <el-date-picker v-model="form.findate" :disabled="acceptShow" style="width:20vw"
                                type="date"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col v-show="refuseShow" :span="8">
              <el-form-item :label="$t('label.PFANS3007FORMVIEW_REFUSEREASON')">
                <el-input v-model="form.refusereason" :disabled="acceptShow" maxlength="100"
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col v-show="refuseShow1" :span="8">
              <el-form-item :label="$t('label.PFANS5004VIEW_FINSHTIME')">
                <el-date-picker v-model="form.finshtime" :disabled="acceptShow" style="width:20vw"
                                type="date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            end  fjl 2020/04/08  添加总务担当的受理功能-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input v-model="centerid" :disabled="true" style="width:20vw"></el-input>
                <el-input v-show='false' v-model="form.centerid" :disabled="true" style="width:20vw"></el-input>
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
            <!--            start(添加申请日期)  fjl 2020/04/08-->
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="applicationdate">
                <div class="block">
                  <el-date-picker
                    v-model="form.applicationdate"
                    :disabled="true"
                    style="width:20vw"
                    type="date">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <!--            end(添加申请日期)  fjl 2020/04/08-->
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                      style="width: 20vw" @getUserids="getUserids"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003VIEW_EUSER_ID')" prop="euser_id">
                <el-input v-model="form.euser_id" :disabled="!disable" maxlength="20"
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003VIEW_DCENTER')" prop="dcenter">
                <el-input v-model="form.dcenter" :disabled="!disable" style="width:20vw"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003VIEW_ECENTER')" prop="ecenter">
                <el-input v-model="form.ecenter" :disabled="!disable" style="width:20vw"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003VIEW_BCENTER')" prop="bcenter">
                <el-input v-model="form.bcenter" :disabled="!disable" style="width:20vw"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003VIEW_ACENTER')" prop="acenter">
                <el-input v-model="form.acenter" :disabled="!disable" style="width:20vw"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3003VIEW_OCCUPATIONAL')" prop="occupational">
                  <el-input v-model="form.occupational" :disabled="!disable" maxlength="20"
                            style="width:20vw"></el-input>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3003VIEW_EOCCUPATIONAL')" prop="eoccupational">
                  <el-input v-model="form.eoccupational" :disabled="!disable" maxlength="20"
                            style="width:20vw"></el-input>
                </el-form-item>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3003VIEW_INSIDELINE')" prop="insideline">
                  <el-input v-model="form.insideline" :disabled="!disable" maxlength="20"
                            style="width:20vw"></el-input>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.email')" prop="email">
                  <el-input v-model="form.email" :disabled="!disable" maxlength="100" style="width:20vw"
                            type="email"></el-input>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003FORMVIEW_PLAN')" prop="plan">
                <span style="margin-right: 1rem ">{{ $t('label.PFANS1004VIEW_OUTER') }}</span>
                <el-switch
                  v-model="form.plan"
                  :disabled="!disable"
                  active-value="1"
                  inactive-value="0"
                  @change="change"
                >
                </el-switch>
                <span style="margin-left: 1rem ">{{ $t('label.PFANS1004VIEW_INSIDE') }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item v-if="show" :label="$t('label.PFANS3003FORMVIEW_TYPE')" prop="type">
                <dicselect
                  :code="code"
                  :data="form.type"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="change2"
                >
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-if="show2" :label="$t('label.PFANS3003FORMVIEW_CLASSIFICATION')" prop="classification">
                <dicselect
                  :code="code2"
                  :data="form.classification"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="change3"
                >
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-show="show" :label="$t('label.PFANS3003FORMVIEW_BALANCE')" prop="balance">
                <el-input-number v-model="form.balance" :disabled="!disable" :max="9999999999" :min="0"
                                 :precision="2" :step="1" controls-position="right" style="width:20vw"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('label.remarks')" prop="remarks">
                <el-input v-model="form.remarks" :disabled="!disable" style="width:72vw" type="textarea"></el-input>
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
import moment from 'moment';
import user from '../../../components/user.vue';
import {getCurrentRole2, getOrgInfoByUserId} from '@/utils/customize';
import {validateEmail} from '@/utils/validate';

export default {
  name: 'PFANS3003FormView',
  components: {
    EasyNormalContainer,
    dicselect,
    user,
  },
  data() {
    var validateUserid = (rule, value, callback) => {
      if (!value || value === '' || value === 'undefined') {
        callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        this.error = this.$t('normal.error_09') + this.$t('label.applicant');
      } else {
        callback();
        this.error = '';
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
    var validatePass = (rule, value, callback) => {
      if (this.show) {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS3003FORMVIEW_TYPE')));
        }
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (this.show2) {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS3003FORMVIEW_CLASSIFICATION')));
        }
      } else {
        callback();
      }
    };
    return {
      centerid: '',
      groupid: '',
      teamid: '',
      workflowCode: 'W0043',
      loading: false,
      canStart: false,
      enableSave: false,
      selectType: 'Single',
      userlist: '',
      title: 'title.PFANS3003VIEW',
      buttonList: [],
      options: [
        {
          value: '0',
          label: this.$t('label.PFANS3006VIEW_ACCEPT'),
        },
        {
          value: '1',
          label: this.$t('label.PFANS3006VIEW_REFUSE'),
        },
        {
          value: '2',
          label: this.$t('label.PFANS3006VIEW_CARRYOUT'),
        },
      ],
      acceptShow: true,
      refuseShow: false,
      refuseShow1: false,
      form: {
        centerid: '',
        groupid: '',
        teamid: '',
        euser_id: '',
        ecenter: '',
        dcenter: '',
        bcenter: '',
        acenter: '',
        eoccupational: '',
        userid: '',
        applicationdate: moment(new Date()).format('YYYY-MM-DD'),
        occupational: '',
        insideline: '',
        email: '',
        plan: true,
        type: '',
        classification: '',
        balance: '',
        remarks: '',
        accept: '0',
        acceptstatus: '',
        findate: '',
        refusereason: '',
      },
      rules: {
        userid: [{
          required: true,
          validator: validateUserid,
          trigger: 'change',
        }],
        applicationdate: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.application_date'),
          trigger: 'change',
        }],
        occupational: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS3003VIEW_OCCUPATIONAL'),
          trigger: 'blur',
        }],
        euser_id: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS3003VIEW_EUSER_ID'),
          trigger: 'blur',
        }],
        ecenter: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS3003VIEW_ECENTER'),
          trigger: 'blur',
        }],
        dcenter: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS3003VIEW_DCENTER'),
          trigger: 'blur',
        }],
        bcenter: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS3003VIEW_ACENTER'),
          trigger: 'blur',
        }],
        acenter: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS3003VIEW_BCENTER'),
          trigger: 'blur',
        }],
        eoccupational: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS3003VIEW_EOCCUPATIONAL'),
          trigger: 'blur',
        }],
        insideline: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS3003VIEW_INSIDELINE'),
          trigger: 'blur',
        }],
        email: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.email'),
          trigger: 'blur',
        },
          {validator: checkemail, trigger: 'blur'}],
        type: [{
          required: true,
          validator: validatePass,
          trigger: 'change',
        }],
        classification: [{
          required: true,
          validator: validatePass2,
          trigger: 'change',
        }],
      },
      code: 'PR002',
      code2: 'PR003',
      multiple: false,
      disable: false,
      show: false,
      show2: false,
      error: '',
    };
  },
  mounted() {
    if (this.$route.params._id) {
      this.loading = true;
      this.$store
        .dispatch('PFANS3003Store/getBusinessCardOne', {'businesscardid': this.$route.params._id})
        .then(response => {
          this.form = response;
          if (this.form.acceptstatus === '1') {
            this.refuseShow = true;
          } else if (this.form.acceptstatus === '2') {
            this.refuseShow = false;
            this.refuseShow1 = true;
          } else {
            this.refuseShow = false;
            this.refuseShow1 = false;
          }
          let rst = getOrgInfoByUserId(response.userid);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
          }
          //start(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
          let role = getCurrentRole2();
          if (role === '0') {
            if (this.form.status === '4') {
              this.enableSave = true;
              if (this.disable) {
                this.form.findate = moment(new Date()).format('YYYY-MM-DD');
                this.acceptShow = false;
              } else {
                this.acceptShow = true;
              }
            } else {
              this.acceptShow = true;
              this.enableSave = false;
            }
          }
          //end(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
          this.loading = false;
          this.userlist = this.form.userid;
          if (this.form.plan === '1') {
            this.show = true;
          } else {
            this.show = false;
            this.show2 = false;
            this.form.classification = null;
            this.form.balance = null;
          }
          if (this.form.type === 'PR002006') {
            this.show2 = true;
          } else {
            this.show2 = false;
            this.form.classification = null;
            this.form.balance = null;
          }
          if (this.form.status === '2') {
            this.disable = false;
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
    } else {
      this.userlist = this.$store.getters.userinfo.userid;
      if (this.userlist !== null && this.userlist !== '') {
        let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
        if (rst) {
          this.centerid = rst.centerNmae;
          this.groupid = rst.groupNmae;
          this.teamid = rst.teamNmae;
          this.form.centerid = rst.centerId;
          this.form.groupid = rst.groupId;
          this.form.teamid = rst.teamId;
        }
        this.form.userid = this.$store.getters.userinfo.userid;
      }
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
    //change受理状态  add_fjl
    changeAcc(val) {
      this.form.acceptstatus = val;
      // if (val === '1') {
      //     this.refuseShow = true;
      // } else {
      //     this.refuseShow = false;
      // }
      if (val === '1') {
        this.refuseShow = true;
        this.refuseShow1 = false;
        this.form.finshtime = null;
      } else if (val === '2') {
        this.refuseShow = false;
        this.refuseShow1 = true;
        this.form.finshtime = moment(new Date()).format('YYYY-MM-DD');
        this.form.refusereason = null;
      } else {
        this.refuseShow = false;
        this.refuseShow1 = false;
        this.form.refusereason = null;
        this.form.finshtime = null;
      }
    },
    setdisabled(val) {
      if (this.$route.params.disabled) {
        this.disabled = val;
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
    start(val) {
      if (val.state === '0') {
        this.form.status = '2';
      } else if (val.state === '2') {
        this.form.status = '4';
      }
      // this.form.status = '2';
      this.buttonClick('update');
    },
    end(val) {
      this.form.status = '0';
      this.buttonClick('update');
    },
    getUserids(val) {
      this.form.userid = val;
      this.userlist = val;
      let rst = getOrgInfoByUserId(val);
      if (rst) {
        this.centerid = rst.centerNmae;
        this.groupid = rst.groupNmae;
        this.teamid = rst.teamNmae;
        this.form.centerid = rst.centerId;
        this.form.groupid = rst.groupId;
        this.form.teamid = rst.teamId;
      } else {
        this.centerid = '';
        this.groupid = '';
        this.teamid = '';
        this.form.centerid = '';
        this.form.groupid = '';
        this.form.teamid = '';
      }
      if (!this.form.userid || this.form.userid === '' || val === 'undefined') {
        this.error = this.$t('normal.error_09') + this.$t('label.applicant');
      } else {
        this.error = '';
      }
    },
    change(val) {
      this.form.plan = val;
      if (val === '1') {
        this.show = true;
      } else {
        this.show = false;
        this.form.type = null;
        this.show2 = false;
        this.form.classification = null;
        this.form.balance = null;
      }
    },
    change2(val) {
      this.form.type = val;
      if (val === 'PR002006') {
        this.show2 = true;
      } else {
        this.show2 = false;
        this.form.classification = null;
        this.form.balance = null;
      }
    },
    change3(val) {
      this.form.classification = val;
    },
    buttonClick(val) {
      this.$refs['refform'].validate(valid => {
        if (valid) {
          this.loading = true;
          this.form.userid = this.userlist;
          this.form.applicationdate = moment(this.form.applicationdate).format('YYYY-MM-DD');
          if (this.$route.params._id) {
            this.$store
              .dispatch('PFANS3003Store/updateBusinessCard', this.form)
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
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
          } else {
            this.loading = true;
            this.$store.dispatch('PFANS3003Store/createBusinessCard', this.form).then(response => {
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
