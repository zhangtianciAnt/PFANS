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
                <user :disabled="!disable"
                      :error="error"
                      :selectType="selectType"
                      :userlist="userlist"
                      @getUserids="getUserids"
                      style="width:10.14rem"
                ></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')">
                <el-input :disabled="true"
                          style="width:11rem"
                          v-model="form.type"
                          maxlength="36"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1019FORMVIEW_DAILYPAYMENT')" prop="dailypayment">
                <el-date-picker :disabled="!disable"
                                style="width:11rem"
                                type="date"
                                v-model="form.dailypayment"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="30">
              <div class="sub_color_blue">{{$t('label.PFANS1019FORMVIEW_DETAIL')}}</div>
            </el-col>
          </el-row>
          <el-row style="padding-top:1.5rem">
            <el-table :data="tableT" header-cell-class-name="sub_bg_color_grey height" style="width: 1051px">
              <el-table-column :label="$t('label.PFANS2007VIEW_NUMBER')" align="center" fixed prop="content"
                               type="index"></el-table-column>
              <el-table-column :label="$t('label.PFANS1019FORMVIEW_MACHINENAME')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.machinename" style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1019FORMVIEW_CUSTOMER')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.customer" style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1019FORMVIEW_STARTDATE')" align="center" width="160">
                <template slot-scope="scope">
                  <el-date-picker
                    :no="scope.row"
                    :disabled="!disable"
                    type="date"
                    style="width: 100%"
                    v-model="scope.row.startdate"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1019FORMVIEW_ENDDATE')" align="center" width="160">
                <template slot-scope="scope">
                  <el-date-picker
                    :no="scope.row"
                    :disabled="!disable"
                    type="date"
                    style="width: 100%"
                    v-model="scope.row.enddate"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1019FORMVIEW_SOFTWARENAME')" align="center" width="130">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.softwarename" maxlength="36"
                            style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1019FORMVIEW_NATURE')" align="center" width="160">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code"
                    :data="scope.row.nature"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changenature"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1019FORMVIEW_DEVELOPER')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.developer" style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1019FORMVIEW_EMPLOY')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.employ" maxlength="20"
                            style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1019FORMVIEW_SOFTTYPE')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code"
                    :data="scope.row.softtype"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changesofttype"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableT)"
                    type="danger"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click="addRow()"
                    type="primary"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
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
    name: 'PFANS1019FormView',
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
        baseInfo: {},
        loading: false,
        multiple: false,
        selectType: 'Single',
        error: '',
        userlist: '',
        title: 'title.PFANS1019VIEW',
        disabled: false,
        buttonList: [],
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          dailypayment: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1019FORMVIEW_DAILYPAYMENT'),
            trigger: 'change',
          }],
        },
        canStart: false,
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          type: this.$t('menu.PFANS1019'),
          dailypayment: moment(new Date()).format('YYYY-MM-DD'),
        },
        tableT: [{
          trialsoftdetail_id: '',
          machinename: '',
          customer: '',
          startdate: moment(new Date()).format('YYYY-MM-DD'),
          enddate: moment(new Date()).format('YYYY-MM-DD'),
          softwarename: '',
          nature: '',
          developer: '',
          employ: '',
          softtype: '',
        }],
        code: 'PJ040',
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
          .dispatch('PFANS1019Store/selectById', {'trialsoft_id': this.$route.params._id})
          .then(response => {
            this.userlist = response.user_id;
            this.form = response.trialsoft;
            this.userlist = this.form.user_id;
            if (response.trialsoftdetail.length > 0) {
              this.tableT = response.trialsoftdetail;
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
      changenature(val, row) {
        row.nature = val;
      },
      changesofttype(val, row) {
        row.softtype = val;
      },
      addRow() {
        this.tableT.push({
          machinename: '',
          customer: '',
          startdate: '',
          enddate: '',
          softwarename: '',
          nature: '',
          developer: '',
          employ: '',
          softtype: '',
        });
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.loading = true;
            this.form.dailypayment = moment(this.form.dailypayment).format('YYYY-MM-DD');
            this.baseInfo = {};
            this.baseInfo.trialsoft = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.trialsoftdetail = [];
            for (let i = 0; i < this.tableT.length; i++) {
              if (this.tableT[i].machinename !== '' || this.tableT[i].customer !== '' || this.tableT[i].startdate !== '' ||
                this.tableT[i].enddate !== '' || this.tableT[i].softwarename !== '' || this.tableT[i].nature !== '' ||
                this.tableT[i].developer !== '' || this.tableT[i].employ !== '' || this.tableT[i].softtype !== '') {
                this.baseInfo.trialsoftdetail.push(
                  {
                    trialsoftdetail_id: this.tableT[i].trialsoftdetail_id,
                    trialsoft_id: this.tableT[i].trialsoft_id,
                    machinename: this.tableT[i].machinename,
                    customer: this.tableT[i].customer,
                    startdate: this.tableT[i].startdate,
                    enddate: this.tableT[i].enddate,
                    softwarename: this.tableT[i].softwarename,
                    nature: this.tableT[i].nature,
                    developer: this.tableT[i].developer,
                    employ: this.tableT[i].employ,
                    softtype: this.tableT[i].softtype,
                  },
                );
              }
            }
            if (this.$route.params._id) {
              this.form.trialsoft_id = this.$route.params._id;
              this.loading = true;
              this.$store
                .dispatch('PFANS1019Store/update', this.baseInfo)
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
              this.loading = true;
              this.$store
                .dispatch('PFANS1019Store/insert', this.baseInfo)
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
