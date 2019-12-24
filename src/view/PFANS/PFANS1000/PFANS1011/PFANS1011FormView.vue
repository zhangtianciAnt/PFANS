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
<!--              <el-table :data="tableInt" header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass">-->
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
                  <el-form-item :error="error" :label="$t('label.PFANS2007VIEW_NAME')" prop="user_id">
                    <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                          style="width:10.14rem" @getUserids="getUserids"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_SERVICEPOSITION')">
                    <el-input :disabled="!disable" style="width:11rem" v-model="form.serviceposition" maxlength=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
<!--              </el-table>-->
            </el-tab-pane>





            <el-tab-pane :label="$t('label.PFANS1011VIEW_FACETOFACE')" name="second">
              <el-row>
                <el-col>
                  <span style="margin-right: 89%;color:#005BAA">{{$t('label.PFANS1011VIEW_FACETOFACE')}}</span>
                </el-col>
              </el-row>
              <el-row>
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
                  <el-form-item :error="error" :label="$t('label.PFANS2007VIEW_NAME')" prop="user">
                    <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                          style="width:10.14rem" @getUserids="getUserids"></user>
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
                <el-form-item :label="$t('label.PFANS1011VIEW_INFORMATIONPC')" >
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
                  <span style="margin-right: 89%;color:#005BAA">{{$t('label.PFANS1011VIEW_OVERSEASBUSINESSNI')}}
                  </span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1009FORMVIEW_OBJECTIVE')">
                    <el-input :disabled="!disable" style="width:57.2rem" type="textarea" v-model="form.objective"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_LOOKFORWARD')">
                    <el-input :disabled="!disable" style="width:57.2rem" type="textarea" v-model="form.lookforward"></el-input>
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
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_KOLEI')">
                    <el-input :disabled="!disable" style="width:57.2rem" type="textarea" v-model="form.kolei"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1011VIEW_RECENTLY')">
                    <el-input :disabled="!disable" style="width:57.2rem" type="textarea" v-model="form.recently"></el-input>
                  </el-form-item>
                </el-col>
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
            </el-tab-pane>


            <el-tab-pane :label="$t('label.PFANS1011VIEW_TORESPONSIBLEPERSON')" name="Sixthly">
              <el-row>
                <el-col>
                  <span style="margin-right: 89%;color:#005BAA">{{$t('label.PFANS1011VIEW_TORESPONSIBLEPERSON')}}
                  </span>
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
  import {getOrgInfoByUserId} from '@/utils/customize';
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
          callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      return {
        workshift_start: '',
        workshift_end: '',
        errorrapplicationdate: '',
        errorrimplementdate: '',
        errorrworktime: '',
        loading: false,
        error: '',
        selectType: 'Single',
        userlist: '',
        title: 'title.PFANS1011VIEW',
        buttonList: [],
        form: {
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          application_date: moment(new Date()).format('YYYY-MM-DD'),
          worktime: '',
          implement_date: '',
          nodeList: [],
        },
        disabled: false,
        rules: {
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
          .dispatch('PFANS1011Store/getOffshoreOne', {'Offshore_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;


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
              this.form.reimbursement = moment(this.form.reimbursement).format('YYYY-MM-DD');
              this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
              if (this.$route.params._id) {
                this.form.loanapplication_id = this.$route.params._id;
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
