<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading"
                         :buttonList="buttonList"
                         @workflowState="workflowState" :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" label-width="8vw" label-position="top" style="padding: 2vw" :rules="rules"
                 ref="refform">
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('title.PFANS1023VIEW')}}</span>
              </template>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')">
                    <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                    <el-input   v-show='false' v-model="form.center_id" :disabled="false" style="width: 20vw" maxlength='36'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                    <el-input  v-show='false' v-model="form.group_id" :disabled="false" style="width: 20vw" maxlength='36'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                    <el-input v-show='false'  v-model="form.team_id" :disabled="false" style="width: 20vw" maxlength='36'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :error="erroruser" :label="$t('label.applicant')" prop="user_id">
                    <user :disabled="!disabled" :error="erroruser" :selectType="selectType" :userlist="userlist"
                          @getUserids="getUserids" style="width: 20vw"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.pfanstype')" prop="type">
                    <el-input v-model="form.type" :disabled="!disabled6" style="width: 20vw" maxlength='20'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.application_date')" prop="application">
                    <el-date-picker :disabled="!disabled" type="date" v-model="form.application"
                                    style="width: 20vw"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFASN1023FORMVIEW_MACHINEMEDIA')" prop="machinemedia">
                    <dicselect
                      :code="code"
                      :data="form.machinemedia"
                      :multiple="multiple"
                      @change="getMachinemedia"
                      style="width: 20vw"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFASN1023FORMVIEW_MANAGEMENT')" prop="management">
                    <el-input v-model="form.management" :disabled="!disabled" style="width: 20vw"
                              maxlength='20'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFASN1023FORMVIEW_COMPATIBLESEAL')">
                    <el-radio-group v-model="radio">
                      <el-radio :label="1" :disabled="!disabled">{{$t('label.yes')}}</el-radio>
                      <el-radio :label="2" :disabled="!disabled">{{$t('label.no')}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="errorexportdate" :label="$t('label.PFASN1023FORMVIEW_EXPORTDATE')"
                                prop="exportdate">
                    <el-date-picker :disabled="!disabled" type="date" v-model="form.exportdate"
                                    style="width: 20vw"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :error="errorreturndate" :label="$t('label.PFASN1023FORMVIEW_RETURNDATE')"
                                prop="returndate">
                    <el-date-picker :disabled="!disabled" type="date" v-model="form.returndate"
                                    style="width: 20vw"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFASN1023FORMVIEW_HOLDINGPLACE')" prop="holdingplace">
                    <el-input v-model="form.holdingplace" :disabled="!disabled" style="width: 20vw"
                              maxlength='50'></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFASN1023FORMVIEW_HOLDOUTREASON')" prop="holdoutreason">
                    <el-input v-model="form.holdoutreason" type="textarea" :disabled="!disabled"
                              style="width: 71.4vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFASN1023FORMVIEW_STOREDDATA')}}</span>
              </template>
              <el-row>
                <el-col :span="8">
                  <el-checkbox v-model="checked1" @change="getChecked1" :disabled="!disabled">
                    <el-form-item :label="$t('label.PFANS1023FORMVIEW_COMPANY')" label-width="8vw">
                      <el-input v-model="form.company" :disabled="!disabled1" style="width: 18.4vw"></el-input>
                    </el-form-item>
                  </el-checkbox>
                </el-col>
                <el-col :span="8">
                  <el-checkbox v-model="checked2" @change="getChecked2" :disabled="!disabled">
                    <el-form-item :label="$t('label.PFANS1023FORMVIEW_SECRET')" label-width="8vw">
                      <el-input v-model="form.secret" :disabled="!disabled2" style="width: 18.4vw"></el-input>
                    </el-form-item>
                  </el-checkbox>
                </el-col>
                <el-col :span="8">
                  <el-checkbox v-model="checked3" @change="getChecked3" :disabled="!disabled">
                    <el-form-item :label="$t('label.PFANS1023FORMVIEW_INFORMATION')" label-width="8vw">
                      <el-input v-model="form.information" :disabled="!disabled3" style="width: 18.4vw"></el-input>
                    </el-form-item>
                  </el-checkbox>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-checkbox v-model="checked4" @change="getChecked4" :disabled="!disabled">
                    <el-form-item :label="$t('label.PFANS1023FORMVIEW_INTELLIGENCE')">
                      <el-input v-model="form.intelligence" :disabled="!disabled4" style="width: 18.4vw"></el-input>
                    </el-form-item>
                  </el-checkbox>
                </el-col>
                <el-col :span="8">
                  <el-checkbox v-model="checked5" @change="getChecked5" :disabled="!disabled">
                    <el-form-item :label="$t('label.PFANS1023FORMVIEW_CONFIDENTIAL')">
                      <el-input v-model="form.confident" :disabled="!disabled5" style="width: 18.4vw"></el-input>
                    </el-form-item>
                  </el-checkbox>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import dicselect from '../../../components/dicselect.vue';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import org from '../../../components/org';
  import moment from 'moment';

  export default {
    name: 'PFANS1023FormView',
    components: {
      EasyNormalContainer,
      getOrgInfoByUserId,
      dicselect,
      user,
      org,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        } else {
          this.erroruser = '';
          return callback();
        }
      };
      var validateexportdate = (rule, value, callback) => {
        if (this.form.exportdate !== null && this.form.exportdate !== '') {
          if (moment(value).format('YYYY-MM-DD') > moment(this.form.returndate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFASN1023FORMVIEW_EXPORTDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFASN1023FORMVIEW_RETURNDATE')));
            this.errorexportdate = this.$t('label.PFASN1023FORMVIEW_EXPORTDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFASN1023FORMVIEW_RETURNDATE');
          } else {
            callback();
            this.errorexportdate = '';
          }
        } else {
          callback();
          this.errorexportdate = '';
        }
      };
      var validatereturndate = (rule, value, callback) => {
        if (this.form.returndate !== null && this.form.returndate !== '') {
          if (moment(value).format('YYYY-MM-DD') < moment(this.form.exportdate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFASN1023FORMVIEW_RETURNDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFASN1023FORMVIEW_EXPORTDATE')));
            this.errorreturndate = this.$t('label.PFASN1023FORMVIEW_RETURNDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFASN1023FORMVIEW_EXPORTDATE');
          } else {
            callback();
            this.errorreturndate = '';
          }
        } else {
          callback();
          this.errorreturndate = '';
        }
      };
      return {
        centerid: '',
        groupid: '',
        teamid: '',
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        checked5: false,
        radio: 1,
        userlist: '',
        loading: false,
        erroruser: '',
        selectType: 'Single',
        title: 'title.PFANS1023VIEW',
        buttonList: [],
        multiple: false,
        errorexportdate: '',
        errorreturndate: '',
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          type: this.$t('menu.PFANS1023'),
          machinemedia: '',
          management: '',
          application: moment(new Date()).format('YYYY-MM-DD'),
          exportdate: '',
          returndate: '',
          holdingplace: '',
          compatibleseal: '',
          holdoutreason: '',
          company: '',
          secret: '',
          information: '',
          intelligence: '',
          confident: '',
        },
        code: 'PJ028',
        disabled: false,
        disabled1: false,
        disabled2: false,
        disabled3: false,
        disabled4: false,
        disabled5: false,
        disabled6: false,
        menuList: [],
        rules: {
          user_id: [
            {
              required: true,
              validator: checkuser,
              trigger: 'change',
            },
          ],
          machinemedia: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_MACHINEMEDIA'),
              trigger: 'change',
            },
          ],
          management: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_MANAGEMENT'),
              trigger: 'change',
            },
          ],
          application: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.application_date'),
              trigger: 'change',
            },
          ],
          exportdate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2003VIEW_ACCEPTDATE'),
            trigger: 'change',
          },
            {validator: validateexportdate, trigger: 'change'}],
          returndate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE'),
            trigger: 'change',
          },
            {validator: validatereturndate, trigger: 'change'}],
          holdingplace: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_HOLDINGPLACE'),
              trigger: 'change',
            },
          ],
          holdoutreason: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_HOLDOUTREASON'),
              trigger: 'change',
            },
          ],
        },
        canStart: false,
      };
    },
    mounted() {
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1023Store/getConfidentialOne', {'confidentialid': this.$route.params._id})
          .then(response => {
            this.form = response;
            let rst = getOrgInfoByUserId(response.user_id);
              if(rst){
                  this.centerid = rst.centerNmae;
                  this.groupid= rst.groupNmae;
                  this.teamid= rst.teamNmae;
              }
            this.userlist = this.form.user_id;
            if (this.form.compatibleseal === '1') {
              this.radio = 1;
            }
            if (this.form.compatibleseal === '2') {
              this.radio = 2;
            }
            if (this.form.status === '2') {
              this.disable = false;
            }
            if (this.form.company === '') {
              this.checked1 = false;
            } else {
              this.checked1 = true;
              this.disabled1 = true;
            }
            if (this.form.secret === '') {
              this.checked2 = false;
            } else {
              this.checked2 = true;
              this.disabled2 = true;
            }
            if (this.form.information === '') {
              this.checked3 = false;
            } else {
              this.checked3 = true;
              this.disabled3 = true;
            }
            if (this.form.intelligence === '') {
              this.checked4 = false;
            } else {
              this.checked4 = true;
              this.disabled4 = true;
            }
            if (this.form.confident === '') {
              this.checked5 = false;
            } else {
              this.checked5 = true;
              this.disabled5 = true;
            }
            if (!this.disabled) {
              this.disabled1 = false;
              this.disabled2 = false;
              this.disabled3 = false;
              this.disabled4 = false;
              this.disabled5 = false;
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
          if(rst) {
              this.centerid = rst.centerNmae;
              this.groupid = rst.groupNmae;
              this.teamid = rst.teamNmae;
              this.form.center_id = rst.centerId;
              this.form.group_id = rst.groupId;
              this.form.team_id = rst.teamId;
          }
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
        this.loading = false;
      }
    },
    created() {
      this.disabled = this.$route.params.disabled;
      if (this.disabled) {
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
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        if(rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            this.form.group_id = rst.groupId;
            this.form.team_id = rst.teamId;
        }else{
            this.centerid =  '';
            this.groupid =  '';
            this.teamid =  '';
            this.form.center_id = '';
            this.form.group_id =  '';
            this.form.team_id =  '';
        }
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.erroruser = '';
        }
      },
      getMachinemedia(val) {
        this.form.machinemedia = val;
      },
      getFabuilding(val) {
        this.form.fabuilding = val;
      },
      getSubtype(val) {
        this.form.subtype = val;
      },
      getFbbuilding(val) {
        this.form.fbbuilding = val;
      },
      getChecked1(val) {
        this.checked1 = val;
        if (val === true) {
          this.disabled1 = true;
        } else {
          this.disabled1 = false;
          this.form.company = '';
        }
      },
      getChecked2(val) {
        this.checked2 = val;
        if (val === true) {
          this.disabled2 = true;
        } else {
          this.disabled2 = false;
          this.form.secret = '';
        }
      },
      getChecked3(val) {
        this.checked3 = val;
        if (val === true) {
          this.disabled3 = true;
        } else {
          this.disabled3 = false;
          this.form.information = '';
        }
      },
      getChecked4(val) {
        this.checked4 = val;
        if (val === true) {
          this.disabled4 = true;
        } else {
          this.disabled4 = false;
          this.form.intelligence = '';
        }
      },
      getChecked5(val) {
        this.checked5 = val;
        if (val === true) {
          this.disabled5 = true;
        } else {
          this.disabled5 = false;
          this.form.confident = '';
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
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            if (this.checked1 === false) {
              this.form.company = '';
            }
            if (this.checked2 === false) {
              this.form.secret = '';
            }
            if (this.checked3 === false) {
              this.form.information = '';
            }
            if (this.checked4 === false) {
              this.form.intelligence = '';
            }
            if (this.checked5 === false) {
              this.form.confident = '';
            }
            this.loading = true;
            this.form.compatibleseal = this.radio;
            if (this.$route.params._id) {
              this.form.confidentialid = this.$route.params._id;
              this.form.application = moment(this.form.application).format('YYYY-MM-DD');
              this.$store
                .dispatch('PFANS1023Store/update', this.form)
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
                .dispatch('PFANS1023Store/insert', this.form)
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
          else{
              Message({
                  message: this.$t("normal.error_12"),
                  type: 'error',
                  duration: 5 * 1000
              });
          }
        });
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
