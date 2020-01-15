<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:2vw">
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span  class="collapse_Title">{{$t('title.PFANS1010VIEW')}}</span>
              </template>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      style="width:20vw" @getUserids="getUserids"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="30">
              <div class="sub_color_blue">{{$t('label.PFANS1010FORMVIEW_USERNAME')}}</div>
            </el-col>
          </el-row>
          <el-row style="padding-top:1.5rem">
            <el-table :data="tableT" border="true" header-cell-class-name="sub_bg_color_blue" style="width: 72vw" stripe="true">
              <el-table-column :label="$t('label.user_name')" align="center" width="400">
                <template slot-scope="scope">
                  <user
                    :no="scope.row"
                    :disabled="!disable"
                    @getUserids="getuserid"
                    :userlist="scope.row.user"
                    selectType="Single"
                    style="width:100%"
                  ></user>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1010FORMVIEW_JOINREASON')" align="center">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.reason" style="width:20vw">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow1(scope.$index, tableT)"
                    type="danger"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click="addRow1()"
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
          <el-row style="padding-top:1.5rem">
            <el-col :span="8">
              <el-form-item :label="$t('label.remarks')">
                <el-input :disabled="!disable" type="textarea" style="width:72vw" v-model="form.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_DATEOFUSE')" prop="usedate">
                <el-date-picker
                  :disabled="!disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.usedate">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
            </el-collapse-item>
          </el-collapse>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span  class="collapse_Title">{{$t('label.PFANS1010FORMVIEW_OPPOSITEUNIT')}}</span>
              </template>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_COMPANYNAME')" prop="company">
                <el-input :disabled="!disable" style="width:20vw" v-model="form.company" maxlength='50'></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="width: 800px" align="right">
            <el-table :data="tableP" border="true" header-cell-class-name="sub_bg_color_blue"  style="width: 1041px" stripe="true">
              <el-table-column :label="$t('label.PFANS1010FORMVIEW_PARTICIPANTS')" align="center" width="500">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.participants">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow2(scope.$index, tableP)"
                    type="danger"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click="addRow2()"
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
            </el-collapse-item>
          </el-collapse>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span  class="collapse_Title">{{$t('label.PFANS1010FORMVIEW_AMOUNTUSED')}}</span>
              </template>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_SCHEDULEDAMOUNT')" prop="moneys">
                <el-input-number v-model="form.moneys"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:20vw"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_PERCAPITA')" prop="percapita">
                <el-input-number v-model="form.percapita"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:20vw"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                <dicselect
                  :code="code1"
                  :data="form.budgetunit"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="getbudgetunit">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_PURPOSEOFUSE')">
                <el-input :disabled="!disable" type="textarea" style="width:72vw"
                          v-model="form.objective"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_RECEPTIONPLACE')">
                <el-input :disabled="!disable" type="textarea" style="width:72vw" v-model="form.place"></el-input>
              </el-form-item>
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
  import {Message} from 'element-ui';
  import user from '../../../components/user.vue';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import moment from 'moment';

  export default {
    name: 'PFANS1010FormView',
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
        total: 0,
        total2: 0,
        tableT: [{
          user: '',
          reason: '',
        }],
        tableP: [{
          participants: '',
        }],
        error: '',
        loading: false,
        selectType: 'Single',
        title: 'title.PFANS1010VIEW',
        buttonList: [],
        editableTabsValue: '0',
        editableTabs: [],
        tabIndex: 0,
        multiple: false,
        userlist: '',
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          reason: '',
          participants: '',
          remarks: '',
          usedate: moment(new Date()).format('YYYY-MM-DD'),
          company: '',
          moneys: '',
          percapita: '',
          budgetunit: '',
          objective: '',
          place: '',
          nodeList: [],
        },
        code1: 'PG001',
        menuList: [],
        disabled: false,
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          usedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1010FORMVIEW_DATEOFUSE'),
            trigger: 'change',
          }],
          company: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1010FORMVIEW_COMPANYNAME'),
            trigger: 'change',
          }],
          moneys: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1010FORMVIEW_SCHEDULEDAMOUNT'),
            trigger: 'change',
          }],
          percapita: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1010FORMVIEW_PERCAPITA'),
            trigger: 'change',
          }],
          budgetunit: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
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
          .dispatch('PFANS1010Store/getCommunicationOne', {'communication_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;
            let lettableT = [];
            let letreason = response.reason.split(';');
            if (letreason.length > 0) {
              for (var i = 0; i <= letreason.length - 1; i++) {
                let letuser = letreason[i].split(',');
                lettableT.push({
                  user: letuser[0],
                  reason: letuser[1],
                });
              }
            }
            let lettableP = [];
            let letresponse = response.participants.split(';');
            if (letresponse.length > 0) {
              for (var i = 0; i <= letresponse.length - 1; i++) {
                lettableP.push({
                  participants: letresponse[i],
                });
              }
            }
            this.tableT = lettableT;
            this.tableP = lettableP;
            this.form = response;
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
      deleteRow1(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else{
          this.tableT=[{
            user: '',
            reason: '',
          }]
        }
      },
      deleteRow2(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
        else{
          this.tableP=[{
            participants: '',
          }]
        }
      },
      addRow1() {
        this.tableT.push({
          user: '',
          reason: '',
        });
      },
      addRow2() {
        this.tableP.push({
          participants: '',
        });
      },
      getuserid(userlist, row) {
        row.user = userlist;
      },
      getUserids(val) {
        this.form.user_id = val;
        this.userlist = val;
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
            title: 10,
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
              let letreason = '';
              for (let i = 0; i <= this.tableT.length - 1; i++) {
                if (this.tableT[i].user.trim() === '' && this.tableT[i].reason.trim() === '') {
                } else {
                  letreason = letreason + this.tableT[i].user + ',' + this.tableT[i].reason + ';';
                }
              }
              letreason = letreason.substring(0, letreason.length - 1).replace('undefined', '').trim();
              if (letreason.replace(';', '').replace('undefined', '').replace(',', '').trim() === '') {
                letreason = '';
              }
              this.form.reason = letreason;
              let letparticipants = '';
              for (var j = 0; j <= this.tableP.length - 1; j++) {
                if (this.tableP[j].participants.trim() != '') {
                  letparticipants = letparticipants + this.tableP[j].participants + ';';
                }
              }
              letparticipants = letparticipants.substring(0, letparticipants.length - 1);
              if (this.form.participants.replace(';', '').trim() === '') {
                this.form.participants = '';
              }
              this.form.participants = letparticipants;
              if (this.$route.params._id) {
                this.form.communication_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1010Store/updateCommunication', this.form)
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
                  .dispatch('PFANS1010Store/createCommunication', this.form)
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
