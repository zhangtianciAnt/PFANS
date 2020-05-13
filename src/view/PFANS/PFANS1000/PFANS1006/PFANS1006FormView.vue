<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:3vw">
          <el-row>
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
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width:20vw" v-model="form.user_id"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_TELEPHONE')" prop="telephone">
                <el-input :disabled="!disable" style="width:20vw" v-model="form.telephone"
                          maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.judgement')" prop="judgement">
                <el-select @change="change" clearable v-model="form.judgements"
                           style="width: 20vw">
                  <el-option
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-for="item in options">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')">
                <!--                <el-input :disabled="true" style="width:20vw" v-model="form.budgetunit" maxlength='50'></el-input>-->
                <el-select clearable style="width: 20vw" v-model="form.budgetunit" :disabled="!disable"
                           :placeholder="$t('normal.error_09')">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value"
                    @change="changeBut">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_MODULE')" v-show=flag>
                <dicselect :code="code2"
                           :data="form.moduleid"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="getmodule"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_ACCOUNTNUMBER')" prop="accountnumber" v-show=flag>
                <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                          v-model="form.accountnumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS1006FORMVIEW_BORROWINGCONTENT')}}</span>
              </template>

              <el-row>
                <el-col :span="8">
                  <el-form-item :error="errorapplicationdate" :label="$t('label.application_date')"
                                prop="application_date">
                    <el-date-picker
                      :disabled="!disable"
                      :error="errorapplicationdate"
                      style="width:20vw"
                      type="date"
                      v-model="form.application_date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :error="errorreimbursement" :label="$t('label.PFANS1006FORMVIEW_REIMBURSEMENT')"
                                prop="reimbursement">
                    <el-date-picker :disabled="!disable" :error="errorreimbursement" style="width:20vw"
                                    v-model="form.reimbursement">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1006FORMVIEW_CURRENCYCHOICE')" prop="currencychoice">
                    <dicselect :code="code3"
                               :data="form.currencychoice"
                               :disabled="!disable"
                               :multiple="multiple"
                               @change="changecurrencychoice"
                               style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1004VIEW_AMOUNT')" prop="moneys">
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
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS1012VIEW_ABSTRACT')" prop="remark">
                  <el-input :disabled="!disable" :rows="6" style="width:72vw" type="textarea" v-model="form.remark">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.remarks')">
                    <el-input :disabled="!disable" :rows="4" type="textarea" style="width:72vw" v-model="form.remarks">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS1006FORMVIEW_PAYMENTMETHOD')}}</span>
              </template>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_PAYMENTMETHOD')" prop="paymentmethod">
                    <dicselect :code="code4"
                               :data="form.paymentmethod"
                               :disabled="!disable"
                               :multiple="multiple"
                               @change="getPayment"
                               style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="errorsuppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                prop="suppliername" v-show="show8">
                    <div class="dpSupIndex" style="width: 20vw" prop="suppliername">
                      <el-container>
                        <input class="content bg" v-model="form.accountpayeename" :error="errorsuppliername"
                               :disabled="true">
                        <el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible = true"
                                   size="small"></el-button>
                        <el-dialog :title="$t('title.PFANS6003VIEW')" :visible.sync="dialogTableVisible" center
                                   size="50%"
                                   top="8vh" lock-scroll
                                   append-to-body>
                          <div style="text-align: center">
                            <el-row style="text-align: center;height: 90%;overflow: hidden">
                              <el-table
                                :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                                height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                @row-click="handleClickChange">
                                <el-table-column property="accountpayeename"
                                                 :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                                 width="150"></el-table-column>
                                <el-table-column property="payeename"
                                                 :label="$t('label.PFANS1012VIEW_PAYEENAME')"
                                                 width="150"></el-table-column>
                                <el-table-column property="vendornum"
                                                 :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')"
                                                 width="100"></el-table-column>
                                <el-table-column property="payeebankaccountnumber"
                                                 :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')"
                                                 width="150"></el-table-column>
                                <el-table-column property="payeebankaccount"
                                                 :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')"
                                                 width="150"></el-table-column>
                                <el-table-column
                                  align="right" width="230">
                                  <template slot="header" slot-scope="scope">
                                    <el-input
                                      v-model="search"
                                      size="mini"
                                      :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME')"/>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </el-row>
                            <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
                        </span>
                          </div>
                        </el-dialog>
                      </el-container>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_PAYEENAME')" v-if="show9" prop="payeename">
                    <el-input :disabled="true" style="width:20vw" v-model="form.payeename"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')" v-if="show7" prop="payeecode">
                    <el-input :disabled="true" style="width:20vw"
                              v-model="form.payeecode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')" v-if="show1"
                                prop="payeebankaccountnumber">
                    <el-input :disabled="true" style="width:20vw" v-model="form.payeebankaccountnumber"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')" v-if="show1"
                                prop="payeebankaccount">
                    <el-input :disabled="true" style="width:20vw" v-model="form.payeebankaccount"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_CAIWUPERSONALCODE')" v-show="show2" prop="name">
                    <el-input :disabled="true" style="width:20vw" v-model="form.name" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="1" style="padding-left:1vw">
                  <img :src="png11">
                </el-col>
                <el-col :span="21" style="color: orange;padding-left:2vw;size: 1vw;font-size:0.9vw">
                  <label>
                    <span><b>{{this.warning}}</b><br/>{{this.warning1}}<br/>{{this.warning2}}<br/>{{this.warning3}}</span>
                  </label>
                </el-col>
              </el-row>
              <el-row style="padding-top:1vw">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1006FORMVIEW_REASONFORDELAY')" prop="reasonfordelay">
                    <el-input :disabled="!disable" :rows="4" type="textarea" style="width:72vw"
                              v-model="form.reasonfordelay">
                    </el-input>
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
  import {getOrgInfoByUserId, getOrgInfo, getUserInfo, getCurrentRole2} from '@/utils/customize';
  import moment from 'moment';
  import png11 from '@/assets/png/11.png';
  import {validateNumber} from '@/utils/validate';

  export default {
    name: 'PFANS1006FormView',
    components: {
      EasyNormalContainer,
      dicselect,
      user,
    },
    data() {
      var validatePayeecode = (rule, value, callback) => {
        this.regExp = /^[A-Za-z0-9]+$/;
        if (this.form.payeecode !== null && this.form.payeecode !== '') {
          if (!this.regExp.test((value))) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      // var validatePayeebankaccountnumber = (rule, value, callback) => {
      //   if (!value || value === '' || value === 'undefined') {
      //       callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')));
      //   } else {
      //     callback();
      //   }
      // };
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      var varreimbursement = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.rules.reasonfordelay[0].required = false;
          callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT')));
          this.error = this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT');
        } else {
          if (this.form.application_date !== null && this.form.application_date !== '') {
            if (moment(value).format('YYYY-MM-DD') < moment(this.form.application_date).format('YYYY-MM-DD')) {
              callback(new Error(this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT') + this.$t('normal.error_checkTime1') + this.$t('label.application_date')));
              this.errorreimbursement = this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT') + this.$t('normal.error_checkTime1') + this.$t('label.application_date');
            } else {
              callback();
              this.errorreimbursement = '';
            }
          }
          var startDate = new Date(moment(this.form.application_date).format('YYYY-MM-DD'));
          var endDate = new Date(moment(value).format('YYYY-MM-DD'));
          var days = (endDate - startDate) / (1000 * 60 * 60 * 24);
          if (days > 15) {
            this.rules.reasonfordelay[0].required = true;
          } else {
            this.rules.reasonfordelay[0].required = false;
          }
          callback();
          this.error = '';
        }
      };
      var validatejudgement = (rule, value, callback) => {
        if (!this.form.judgements || this.form.judgements === '' || this.form.judgements === 'undefined') {
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.judgement')));
        } else {
          return callback();
        }
      };
      var varapplication_date = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.rules.reasonfordelay[0].required = false;
        } else {
          if (this.form.reimbursement !== null && this.form.reimbursement !== '') {
            if (moment(value).format('YYYY-MM-DD') > moment(this.form.reimbursement).format('YYYY-MM-DD')) {
              callback(new Error(this.$t('label.application_date') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT')));
              this.errorapplicationdate = this.$t('label.application_date') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT');
            } else {
              callback();
              this.errorapplicationdate = '';
            }
          }
          var startDate = new Date(moment(value).format('YYYY-MM-DD'));
          var endDate = new Date(moment(this.form.reimbursement).format('YYYY-MM-DD'));
          var days = (endDate - startDate) / (1000 * 60 * 60 * 24);
          if (days > 15) {
            this.rules.reasonfordelay[0].required = true;
          } else {
            this.rules.reasonfordelay[0].required = false;
          }
          callback();
          this.error = '';
        }
      };
      return {
        dialogTableVisible: false,
        show9: false,
        show8: false,
        show1: false,
        show7: false,
        errorsuppliername: '',
        options: [],
        options1: [],
        gridData: [],
        flag: false,
        role1: '',
        centerid: '',
        groupid: '',
        teamid: '',
        search: '',
        regExp: [],
        png11: png11,
        loading: false,
        warning: this.$t('label.PFANS1006FORMVIEW_WARNING'),
        warning1: this.$t('label.PFANS1006FORMVIEW_WARNING1'),
        warning2: this.$t('label.PFANS1006FORMVIEW_WARNING2'),
        warning3: this.$t('label.PFANS1006FORMVIEW_WARNING3'),
        error: '',
        errorreimbursement: '',
        errorapplicationdate: '',
        selectType: 'Single',
        userlist: '',
        title: 'title.PFANS1006VIEW',
        buttonList: [],
        editableTabs: [],
        tabIndex: 0,
        multiple: false,
        form: {
          accountpayeename: '',
          judgements: '',
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          telephone: '',
          budgetunit: '',
          moduleid: '',
          accountnumber: '',
          reimbursement: '',
          currencychoice: '',
          moneys: '',
          remark: '',
          remarks: '',
          paymentmethod: '',
          payeename: '',
          payeecode: '',
          payeebankaccountnumber: '',
          payeebankaccount: '',
          name: '',
          accountpayeename: '',
          reasonfordelay: '',
          application_date: moment(new Date()).format('YYYY-MM-DD'),
        },
        currentRow: '',
        currentRow1: '',
        currentRow2: '',
        currentRow3: '',
        currentRow4: '',
        Codecheck: '',
        code1: 'PG001',
        code2: 'PJ002',
        code3: 'PG019',
        code4: 'PJ015',
        show2: false,
        show3: false,
        menuList: [],
        disabled: false,
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          telephone: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_TELEPHONE'),
            trigger: 'blur',
          }],
          reimbursement: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT'),
            trigger: 'change',
          },
            {validator: varreimbursement, trigger: 'change'},
          ],
          application_date: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.application_date'),
            trigger: 'change',
          },
            {validator: varapplication_date, trigger: 'change'},
          ],
          currencychoice: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_CURRENCYCHOICE'),
            trigger: 'change',
          }],
          moneys: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_AMOUNT'),
            trigger: 'change',
          }],
          remark: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_ABSTRACT'),
            trigger: 'change',
          }],
          paymentmethod: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1012VIEW_PAYMENTMETHOD'),
            trigger: 'change',
          }],
          payeename: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEENAME'),
            trigger: 'change',
          }],
          payeecode: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_FOREIGNPAYEECODE'),
              trigger: 'change',
            },
            {validator: validatePayeecode, trigger: 'blur'}],
          payeebankaccountnumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKNUMBER'),
            trigger: 'change',
          },
          ],
          judgement: [{
            required: true,
            validator: validatejudgement,
            trigger: 'change',
          }],
          payeebankaccount: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT'),
            trigger: 'change',
          }],
          name: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_CAIWUPERSONALCODE'),
            trigger: 'change',
          }],
          accountpayeename: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEENAME'),
            trigger: 'change',
          }],
          reasonfordelay: [{
            required: false,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1006FORMVIEW_REASONFORDELAY'),
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
      //add-ws-5/13-总务担当看到所有符合条件的数据，其他人看本身的而数据
      this.role1 = getCurrentRole2();
      //add-ws-5/13-总务担当看到所有符合条件的数据，其他人看本身的而数据
      this.getsupplierinfor();
      this.judgementlist();
      let userid = this.$store.getters.userinfo.userid;
      let groupid = getUserInfo(userid).userinfo.groupid;
      if (groupid === '91B253A1C605E9CA814462FB4C4D2605F43F') {
        this.flag = true;
      }

      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1006Store/getLoanapplicationOne', {'loanapplication_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            let rst = getOrgInfoByUserId(response.user_id);
            if (rst) {
              this.centerid = rst.centerNmae;
              this.groupid = rst.groupNmae;
              this.teamid = rst.teamNmae;
            }
            this.userlist = this.form.user_id;
            if (this.form.paymentmethod === 'PJ015001') {
              this.show9 = true;
              this.show8 = true;
              this.show1 = true;
              this.show7 = true;
            } else if (this.form.paymentmethod === 'PJ015002') {
              this.show9 = false;
              this.show8 = false;
              this.show2 = true;
              this.show7 = false;
            } else if (this.form.paymentmethod === 'PJ015003') {
              this.show9 = true;
              this.show8 = true;
              this.show3 = true;
              this.show7 = true;
            }
            this.getBudt(this.userlist);
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
        if (getUserInfo(this.$store.getters.userinfo.userid)) {
          this.form.name = this.$store.getters.userinfo.userinfo.caiwupersonalcode;
          this.Codecheck = this.$store.getters.userinfo.userinfo.caiwupersonalcode;
        }
        let num = getUserInfo(this.$store.getters.userinfo.userid).userinfo.extension;
        if (num) {
          this.form.telephone = num;
        }
        if (this.userlist !== null && this.userlist !== '') {
          this.form.user_id = this.$store.getters.userinfo.userid;
          // if (getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)) {
          //   this.form.budgetunit = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
          // }
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            this.form.group_id = rst.groupId;
            this.form.team_id = rst.teamId;
          }
          this.getBudt(this.form.user_id);
        }
      }
    },
    methods: {
      getBudt(val) {
        //ADD_FJL  修改人员预算编码
        if (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
          let butinfo = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
          let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
          if (dic.length > 0) {
            for (let i = 0; i < dic.length; i++) {
              if (butinfo === dic[i].value1) {
                this.options1.push({
                  lable: dic[i].value2 + '_' + dic[i].value3,
                  value: dic[i].code,
                });
              }
            }
          }
        }
        //ADD_FJL  修改人员预算编码
      },
      changeBut(val) {
        this.form.budgetunit = val;
      },
      submit() {
        let val = this.currentRow;
        let val1 = this.currentRow1;
        let val2 = this.currentRow2;
        let val3 = this.currentRow3;
        let val4 = this.currentRow4;
        this.dialogTableVisible = false;
        this.form.accountpayeename = val;
        this.form.payeename = val1;
        this.form.payeecode = val2;
        this.form.payeebankaccountnumber = val3;
        this.form.payeebankaccount = val4;
      },
      handleClickChange(val) {
        this.currentRow = val.accountpayeename;
        this.currentRow1 = val.payeename;
        this.currentRow2 = val.suppliercode;
        this.currentRow3 = val.payeebankaccountnumber;
        this.currentRow4 = val.payeebankaccount;
      },
      getsupplierinfor() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6003Store/getsupplierinfor2')
          .then(response => {
            this.gridData = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              vote.accountpayeename = response[i].supchinese;
              vote.payeename = response[i].payeename;
              vote.suppliercode = response[i].suppliercode;
              vote.payeebankaccountnumber = response[i].payeebankaccountnumber;
              vote.payeebankaccount = response[i].payeebankaccount;
              this.gridData.push(vote);
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
      },
      change(val) {
        this.form.judgements = val;
      },

      judgementlist() {
        let user_id = this.$store.getters.userinfo.userid;
        this.options = [];
        this.loading = true;
        this.$store
          .dispatch('PFANS1012Store/selectJudgement', {})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              //add-ws-5/13-总务担当看到所有符合条件的数据，其他人看本身的数据
              if (this.role1 === '0') {
                if (response[i].equipment == '0') {
                  this.options.push({
                    value: response[i].judgementid,
                    label: response[i].judgnumbers + '_' + this.$t('menu.PFANS1004'),
                  });
                }
              } else {
                if (user_id === response[i].user_id && response[i].equipment == '0') {
                  this.options.push({
                    value: response[i].judgementid,
                    label: response[i].judgnumbers + '_' + this.$t('menu.PFANS1004'),
                  });
                }
              }
              //add-ws-5/13-总务担当看到所有符合条件的数据，其他人看本身的数据
              if (user_id === response[i].user_id && response[i].equipment == '1') {
                this.options.push({
                  value: response[i].judgementid,
                  label: response[i].judgnumbers + '_' + this.$t('menu.PFANS1003'),
                });
              }
            }
            //add-ws-4/24-暂借款申请单添加千元以下费用申请数据到下拉列表中
            this.$store
              .dispatch('PFANS1012Store/selectPurchaseApply', {})
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  //add-ws-5/13-总务担当看到所有符合条件的数据，其他人看本身的数据
                  if (this.role1 === '0') {
                    this.options.push({
                      value: response[i].purchaseapply_id,
                      label: response[i].purchasenumbers + '_' + this.$t('menu.PFANS1005'),
                    });
                  } else {
                    if (user_id === response[i].user_id) {
                      this.options.push({
                        value: response[i].purchaseapply_id,
                        label: response[i].purchasenumbers + '_' + this.$t('menu.PFANS1005'),
                      });
                    }
                  }
                  //add-ws-5/13-总务担当看到所有符合条件的数据，其他人看本身而数据
                }
                this.loading = false;
              }).catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
            //add-ws-4/24-暂借款申请单添加千元以下费用申请数据到下拉列表中
            //add-ws-5/13-添加购买申请数据，总务担当看到所有符合条件的数据，其他人看本身而数据
            if (this.role1 === '0') {
              this.$store
                .dispatch('PFANS3005Store/getPurchaseList')
                .then(response => {
                  for (let i = 0; i < response.length; i++) {
                    if (response[i].status === '4') {
                      var vote = {};
                      vote.value = response[i].purchase_id;
                      vote.label = this.$t('label.PFANS1012VIEW_PURCHASSES') + '_' + response[i].purnumbers;
                      this.options.push(vote);
                    }
                  }
                  this.loading = false;
                }).catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
            } else {
              this.$store
                .dispatch('PFANS3005Store/getPurchase')
                .then(response => {
                  for (let i = 0; i < response.length; i++) {
                    if (response[i].status === '4') {
                      var vote = {};
                      vote.value = response[i].purchase_id;
                      vote.label = this.$t('label.PFANS1012VIEW_PURCHASSES') + '_' + response[i].purnumbers;
                      this.options.push(vote);
                    }
                  }
                  this.loading = false;
                }).catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
            }
            this.loading = false;
            //add-ws-5/13-添加购买申请数据，总务担当看到所有符合条件的数据，其他人看本身而数据
          });
      },
      getUserids(val) {
        this.form.user_id = val;
        if (val === '') {
          this.form.code = '';
          this.Codecheck = '';
        } else {
          this.form.code = getUserInfo(val).userinfo.caiwupersonalcode;
          this.Codecheck = getUserInfo(val).userinfo.caiwupersonalcode;
        }
        let rst = getOrgInfoByUserId(val);
        // valif (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
        //   this.form.budgetunit = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
        // }
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
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      getmodule(val) {
        this.form.moduleid = val;
      },
      changecurrencychoice(val) {
        this.form.currencychoice = val;
      },
      getPayment(val) {
        this.form.paymentmethod = val;
        if (val === 'PJ015001') {
          this.show7 = true;
          this.show9 = true;
          this.show8 = true;
          this.show1 = true;
          this.show2 = false;
          this.show3 = false;
          this.form.payeename = '';
          this.form.payeecode = '';
          this.form.payeebankaccountnumber = '';
          this.form.payeebankaccount = '';
          this.form.name = '';
          this.form.accountpayeename = '';
          this.rules.name[0].required = false;
          this.rules.accountpayeename[0].required = false;
          this.rules.payeename[0].required = true;
          this.rules.payeecode[0].required = true;
          this.rules.payeebankaccountnumber[0].required = true;
          this.rules.payeebankaccount[0].required = true;
        } else if (val === 'PJ015002') {
          this.form.name = this.Codecheck;
          this.show7 = false;
          this.show9 = false;
          this.show8 = false;
          this.show1 = false;
          this.show2 = true;
          this.show3 = false;
          this.form.accountpayeename = '';
          this.form.payeename = '';
          this.form.payeecode = '';
          this.form.payeebankaccountnumber = '';
          this.form.payeebankaccount = '';
          this.rules.name[0].required = true;
          this.rules.accountpayeename[0].required = false;
          this.rules.payeename[0].required = false;
          this.rules.payeecode[0].required = false;
          this.rules.payeebankaccountnumber[0].required = false;
          this.rules.payeebankaccount[0].required = false;
        } else if (val === 'PJ015003') {
          this.show7 = true;
          this.show9 = true;
          this.show8 = true;
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          this.form.name = '';
          this.form.payeename = '';
          this.form.payeecode = '';
          this.form.accountpayeename = '';
          this.form.payeebankaccountnumber = '';
          this.form.payeebankaccount = '';
          this.rules.accountpayeename[0].required = true;
          this.rules.name[0].required = false;
          this.rules.payeename[0].required = true;
          this.rules.payeecode[0].required = true;
          this.rules.payeebankaccountnumber[0].required = false;
          this.rules.payeebankaccount[0].required = false;
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
              // if (this.form.paymentmethod === 'PJ015001') {
              //   this.form.name = '';
              // } else if (this.form.paymentmethod === 'PJ015002') {
              //   this.form.payeename = '';
              //   this.form.payeecode = '';
              //   this.form.payeebankaccountnumber = '';
              //   this.form.payeebankaccount = '';
              //   this.form.accountpayeename = '';
              // } else if (this.form.paymentmethod === 'PJ015003') {
              //   this.form.name = '';
              //   this.form.payeename = '';
              //   this.form.payeecode = '';
              //   this.form.payeebankaccountnumber = '';
              //   this.form.payeebankaccount = '';
              // }
              this.form.reimbursement = moment(this.form.reimbursement).format('YYYY-MM-DD');
              this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
              let error = 0;
              if (this.form.moneys === 0) {
                error = error + 1;
                Message({
                  message: this.$t('label.PFANS1025VIEW_AWARDMONEY') + this.$t('label.PFANS1004FORMVIEW_ERROR'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              }
              if (error === 0) {
                if (this.$route.params._id) {
                  this.form.loanapplication_id = this.$route.params._id;
                  this.$store
                    .dispatch('PFANS1006Store/updateLoanapplication', this.form)
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
                    .dispatch('PFANS1006Store/createLoanapplication', this.form)
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
            } else {
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
          });
        }
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
