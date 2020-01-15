<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:2vw">
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
                <user :disabled="!disable"
                      :error="error"
                      :selectType="selectType"
                      :userlist="userlist"
                      @getUserids="getUserids"
                      style="width:20vw"
                      v-model="form.user_id"
                ></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')">
                <el-input :disabled="true"
                          style="width:20vw"
                          v-model="form.type"
                          maxlength='36'
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.subtype')" prop="subtype">
                <dicselect :code="code1"
                           :data="form.subtype"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changesubtype"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.application')" prop="application">
                <el-date-picker :disabled="!disable"
                                style="width:20vw"
                                type="date"
                                v-model="form.application"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input :disabled="!disable"
                          maxlength="20"
                          style="width:20vw"
                          v-model="form.email"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1017FORMVIEW_EXTENSION')" prop="extension">
                <el-input :disabled="!disable"
                          style="width:20vw"
                          v-model="form.extension"
                          maxlength="11"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1017FORMVIEW_IDTYPE')" prop="idtype">
                <dicselect :code="code2"
                           :data="form.idtype"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changeidtype"
                           style="width:71.4vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="30">
              <div class="sub_color_blue">{{$t('label.PFANS1017FORMVIEW_NEW')}}</div>
            </el-col>
          </el-row>
          <el-row style="padding-top:1.5rem">
            <el-table :data="tableT" header-cell-class-name="sub_bg_color_blue" style="width: 1051px">
              <el-table-column :label="$t('label.PFANS2007VIEW_NUMBER')" align="center" fixed prop="content"
                               type="index"></el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_USERTYPE')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code3"
                    :data="scope.row.usertype"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changeusertype"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_USERNAME')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.username" maxlength="20"
                            style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_SURNAME')" align="center" width="130">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.surname" maxlength="20"
                            style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_MING')" align="center" width="130">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.ming" maxlength="20"
                            style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_ACCOUNT')" align="center" width="160">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.account" maxlength="20"
                            style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_TRANSMISSION')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code4"
                    :data="scope.row.transmission"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changetransmission"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_WAITFORTIME')" align="center" width="160">
                <template slot-scope="scope">
                  <el-date-picker
                    :no="scope.row"
                    :disabled="!disable"
                    style="width: 100%"
                    type="date"
                    v-model="scope.row.waitfortime"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.budgetunit')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code6"
                    :data="scope.row.budgetunit"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changebudgetunit"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_CYBOZU')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code5"
                    :data="scope.row.cybozu"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changecybozu"
                    style="width: 8rem"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_WAITFORTIME')" align="center" width="160">
                <template slot-scope="scope">
                  <el-date-picker
                    :no="scope.row"
                    :disabled="!disable"
                    style="width: 100%"
                    type="date"
                    v-model="scope.row.expecttime"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_DOMAINACCOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code5"
                    :data="scope.row.domainaccount"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changedomainaccount"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_WAITFORTIME')" align="center" width="160">
                <template slot-scope="scope">
                  <el-date-picker
                    :no="scope.row"
                    :disabled="!disable"
                    style="width: 100%"
                    type="date"
                    v-model="scope.row.forwardtime"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.preparefor" style="width: 100%">
                  </el-input>
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
  import {validateEmail} from '@/utils/validate';
  import moment from 'moment';

  export default {
    name: 'PFANS1017FormView',
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
        var validateTel = (rule, value, callback) => {
            this.regExp =/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/
            if (this.form.extension !== null && this.form.extension !== '') {
                if (!this.regExp.test(value)) {
                    callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER')));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
      return {
        buttonList: [],
        baseInfo: {},
        multiple: false,
        loading: false,
        selectType: 'Single',
        error: '',
        title: 'title.PFANS1017VIEW',
        userlist: '',
        tabIndex: 0,
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          type: this.$t('menu.PFANS1017'),
          subtype: '',
          application: moment(new Date()).format('YYYY-MM-DD'),
          email: '',
          extension: '',
          idtype: '',
        },
        tableT: [{
          number: '',
          usertype: '',
          username: '',
          surname: '',
          ming: '',
          account: '',
          transmission: '',
          waitfortime: '',
          budgetunit: '',
          cybozu: '',
          expecttime: '',
          domainaccount: '',
          forwardtime: '',
          preparefor: '',
        }],
        code1: 'PJ037',
        code2: 'PJ038',
        code3: 'PJ039',
        code4: 'PJ040',
        code5: 'PJ041',
        code6: 'PG001',
        disabled: false,
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          subtype: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.subtype'),
            trigger: 'change',
          }],
          application: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.application'),
            trigger: 'change',
          }],
          email: [
            {validator: checkemail, trigger: 'change'}],
          extension: [
            {validator: validateTel, trigger: 'change'}],
          idtype: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1017FORMVIEW_IDTYPE'),
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
          .dispatch('PFANS1017Store/selectById', {'psdcd_id': this.$route.params._id})
          .then(response => {
            if (this.form.status === '2') {
              this.disable = false;
            }
            this.userlist = response.user_id;
            this.form = response.psdcd;
            if (response.psdcddetail.length > 0) {
              this.tableT = response.psdcddetail;
            }
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
      changesubtype(val) {
        this.form.subtype = val;
      },
      changeidtype(val) {
        this.form.idtype = val;
      },
      changeusertype(val, row) {
        row.usertype = val;
      },
      changetransmission(val, row) {
        row.transmission = val;
      },
      changebudgetunit(val, row) {
        row.budgetunit = val;
      },
      changecybozu(val, row) {
        row.cybozu = val;
      },
      changedomainaccount(val, row) {
        row.domainaccount = val;
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
        else{
          this.tableT=[{
            psdcddetail_id: '',
            psdcd_id: '',
            usertype: ' ',
            username: '',
            surname: '',
            ming: '',
            account: '',
            transmission: ' ',
            waitfortime: '',
            budgetunit: ' ',
            cybozu: ' ',
            expecttime: '',
            domainaccount: ' ',
            forwardtime: '',
            preparefor: '',
          }]
        }
      },
      addRow() {
        this.tableT.push({
          psdcddetail_id: '',
          psdcd_id: '',
          usertype: '',
          username: '',
          surname: '',
          ming: '',
          account: '',
          transmission: '',
          waitfortime: '',
          budgetunit: '',
          cybozu: '',
          expecttime: '',
          domainaccount: '',
          forwardtime: '',
          preparefor: '',
          rowindex: '',
        });
      },
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.loading = true;
            this.baseInfo = {};
            this.form.application = moment(this.form.application).format('YYYY-MM-DD');
            this.baseInfo.psdcd = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.psdcddetail = [];
            for (let i = 0; i < this.tableT.length; i++) {
              if (this.tableT[i].number !== '' || this.tableT[i].usertype !== '' || this.tableT[i].username !== '' ||
                this.tableT[i].surname !== '' || this.tableT[i].ming !== '' || this.tableT[i].account !== '' ||
                this.tableT[i].transmission !== '' || this.tableT[i].waitfortime !== '' || this.tableT[i].budgetunit !== '' ||
                this.tableT[i].cybozu !== '' || this.tableT[i].expecttime !== '' || this.tableT[i].domainaccount !== '' ||
                this.tableT[i].forwardtime !== '' || this.tableT[i].preparefor !== '') {
                this.baseInfo.psdcddetail.push(
                  {
                    psdcddetail_id: this.tableT[i].psdcddetail_id,
                    psdcd_id: this.tableT[i].psdcd_id,
                    number: this.tableT[i].number,
                    usertype: this.tableT[i].usertype,
                    username: this.tableT[i].username,
                    surname: this.tableT[i].surname,
                    ming: this.tableT[i].ming,
                    account: this.tableT[i].account,
                    transmission: this.tableT[i].transmission,
                    waitfortime: this.tableT[i].waitfortime,
                    budgetunit: this.tableT[i].budgetunit,
                    cybozu: this.tableT[i].cybozu,
                    expecttime: this.tableT[i].expecttime,
                    domainaccount: this.tableT[i].domainaccount,
                    forwardtime: this.tableT[i].forwardtime,
                    preparefor: this.tableT[i].preparefor,
                  },
                );
              }
            }
            if (this.$route.params._id) {
              this.form.psdcd_id = this.$route.params._id;
              this.$store
                .dispatch('PFANS1017Store/update', this.baseInfo)
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
                .dispatch('PFANS1017Store/insert', this.baseInfo)
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
