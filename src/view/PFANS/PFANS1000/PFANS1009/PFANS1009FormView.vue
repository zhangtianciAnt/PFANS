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
                      style="width:10.14rem" @getUserids="getUserids"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="casedate">
                <el-date-picker
                  :disabled="!disable"
                  style="width:11rem"
                  type="date"
                  v-model="form.casedate">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_ASSETTYPE')" prop="assettype">
                <dicselect
                  :code="code1"
                  :data="form.assettype"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width: 11rem"
                  @change="getassettype">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_INSTALLSOFTWARE')" v-show="show">
                <el-switch :disabled="!disable"
                           style="width:11rem"
                           v-model="installsoftware"
                           active-value="0"
                           inactive-value="1"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_SUITABLEBRINGOUT')" v-show="show">
                <el-switch :disabled="!disable"
                           style="width:11rem"
                           v-model="suitablebringout"
                           active-value="0"
                           inactive-value="1"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_ASSETNUMBER')" prop="assetnumber">
                <el-input :disabled="!disable" style="width:11rem" v-model="form.assetnumber" maxlength=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_ASSETNAME')" prop="assetname">
                <el-input :disabled="!disable" style="width:11rem" v-model="form.assetname" maxlength=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_ANCILLARYEQUIPMENT')" prop="">
                <el-input :disabled="!disable" style="width:11rem" v-model="form.ancillaryequipment" maxlength=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_INPUTDATE')" prop="inputdate">
                <el-date-picker
                  :disabled="!disable"
                  style="width:11rem"
                  type="date"
                  v-model="form.inputdate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_RELEASEDATE')">
                <el-date-picker
                  :disabled="!disable"
                  style="width:11rem"
                  type="date"
                  v-model="form.releasedate">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_OBJECTIVE')">
                <el-input :disabled="!disable" type="textarea" :rows="4" style="width:55rem"
                          v-model="form.objective"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_BORROWING')">
                <el-input :disabled="!disable" type="textarea" :rows="4" style="width:55rem"
                          v-model="form.borrowing"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_REPAIR')">
                <el-date-picker
                  v-model.trim="form.repair"
                  class="bigWidth"
                  :disabled="!disable"
                  type="daterange"
                  unlink-panels
                  :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                  :start-placeholder="$t('label.startdate')"
                  :end-placeholder="$t('label.enddate')"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_REPAIRKITS')">
                <dicselect
                  :code="code2"
                  :data="form.repairkits"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width: 11rem"
                  @change="changerepairkits"
                  :picker-options="pickerOptions">
                </dicselect>
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

  export default {
    name: 'PFANS1009FormView',
    components: {
      EasyNormalContainer,
      dicselect,
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
        pickerOptions: {
          shortcuts: [{
            text: this.$t('label.PFANS1016FORMVIEW_WEEKEND'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text:this.$t('label.PFANS1016FORMVIEW_MONTH'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text:this.$t('label.PFANS1016FORMVIEW_THREEMONTH'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        repair: '',
        installsoftware: '1',
        installsoftwareflg: '',
        suitablebringout: '1',
        suitablebringoutflg: '',
        loading: false,
        error: '',
        selectType: 'Single',
        userlist: '',
        title: 'title.PFANS1009VIEW',
        buttonList: [],
        tabIndex: 0,
        multiple: false,
        form: {
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          casedate: moment(new Date()).format('YYYY-MM-DD'),
          assettype: '',
          installsoftware: '',
          suitablebringout: '',
          assetnumber: '',
          assetname: '',
          ancillaryequipment: '',
          inputdate: moment(new Date()).format('YYYY-MM-DD'),
          releasedate: '',
          objective: '',
          borrowing: '',
          repair:[],
          repairkits: '',
          nodeList: [],
        },
        code1: 'PJ009',
        code2: 'PJ010',
        menuList: [],
        disabled: false,
        show: false,
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          casedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.application_date'),
            trigger: 'change',
          }],
          inputdate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1009FORMVIEW_INPUTDATE'),
            trigger: 'change',
          }],
          assetnumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1009FORMVIEW_ASSETNUMBER'),
            trigger: 'change',
          }],
          assetname: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1009FORMVIEW_ASSETNAME'),
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
          .dispatch('PFANS1009Store/getFixedassetsOne', {'fixedassets_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;
            this.installsoftware = this.form.installsoftware;
            this.installsoftwareflg = this.form.installsoftware;
            this.suitablebringout = this.form.suitablebringout;
            this.suitablebringoutflg = this.form.suitablebringout;
            let repair = response.repair;
            let serdate = repair.slice(0, 10);
            let serdate1 = repair.slice(repair.length - 10);
            this.form.repair = [serdate, serdate1];
            if (this.form.assettype === 'PJ009002') {
              this.show = true;
            } else {
              this.show = false;
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
      getassettype(val) {
        this.form.assettype = val;
        if (val === 'PJ009002') {
          this.show = true;
        } else {
          this.show = false;
        }
      },
      changerepairkits(val) {
        this.form.repairkits = val;
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
            title: 9,
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
              this.form.repair = moment(this.form.repair[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.repair[1]).format('YYYY-MM-DD');
              this.form.installsoftware = this.installsoftware;
              this.form.suitablebringout = this.suitablebringout;
              if (this.form.assettype !== 'PJ009002') {
                this.form.installsoftware = '1';
                this.form.suitablebringout = '1';
              }
              if (this.$route.params._id) {
                this.form.fixedassets_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1009Store/updateFixedassets', this.form)
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
                  .dispatch('PFANS1009Store/createFixedassets', this.form)
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
