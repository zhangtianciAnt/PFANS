<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" :workflowCode="right"
                         @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS2026VIEW')" name="first">
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
                  <el-form-item :error="error" :label="$t('label.user_name')" prop="user_id">
                    <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                          @getUserids="getUserids" style="width:20vw" v-model="form.user_id"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.sex')">
                    <dicselect :code="code3"
                               :data="form.sex"
                               :disabled="true"
                               :multiple="multiple"
                               @change="getsex"
                               style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND')"
                                prop="educational_background">
                    <dicselect :code="code2"
                               :data="form.educational_background"
                               :disabled="true"
                               :multiple="multiple"
                               @change="geteducational_background"
                               style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_POSITION')" prop="position">
                    <el-input :disabled="true" maxlength="20" style="width:20vw"
                              v-model="form.position"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_ENTRYTIME')" prop="entry_time">
                    <el-date-picker :disabled="true" style="width:20vw" v-model="form.entry_time">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.application_date')" prop="application_date">
                    <el-date-picker :disabled="true" style="width:20vw" v-model="form.application_date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_DEPARTUREDATE')" prop="hope_exit_date">
                    <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.hope_exit_date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_ADDRESS')">
                    <el-input :disabled="!disable" maxlength="50" style="width:20vw"
                              v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_FIXEDTELEPHONE')" prop="fixed_phone">
                    <el-input :disabled="!disable" maxlength="11" style="width:20vw"
                              v-model="form.fixed_phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.user_mobile')" prop="cellphone">
                    <el-input :disabled="!disable" maxlength="11" style="width:20vw"
                              v-model="form.cellphone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.email')" prop="email">
                    <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                              v-model="form.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_CAUSE')" prop="reason" >
                  <el-input :disabled="!disable"
                            :placeholder="$t('label.PFANS2026VIEW_REMARK2')"
                            style="width: 70vw" type="textarea"
                            v-model="form.reason">
                  </el-input>
                </el-form-item>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2026VIEW_RIGHT')" name="second">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <el-input :disabled="true" style="width:20vw" v-model="form.group_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :error="error" :label="$t('label.user_name')">
                    <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                          @getUserids="getUserids" style="width:20vw" v-model="form.user_id"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.sex')">
                    <dicselect :code="code3"
                               :data="form.sex"
                               :disabled="true"
                               :multiple="multiple"
                               @change="getsex"
                               style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <div >
                <el-table
                  :data="tableData"
                  border
                  stripe
                  header-cell-class-name="sub_bg_color_blue">
                  <el-table-column
                    :label="$t('label.PFANS2026FORMVIEW_ORDERNUMBER')"
                    align="center"
                    prop="ordernumber"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2026FORMVIEW_CONFIRMPERSON')"
                    align="center"
                    prop="confirmperson"
                    width="230">
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2026FORMVIEW_CONFIRMEDATA')"
                    align="center"
                    prop="confirmdata"
                    width="460">
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2026FORMVIEW_CONFIRMMARK')"
                    align="center"
                    prop="confirmmark"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.date')"
                    align="center"
                    prop="date"
                    width="180">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2026VIEW_DATA')" name="third">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('label.PFANS2026VIEW_DELIVERYSHEETDATE')"
                                prop="delivery_sheet_date">
                    <el-date-picker :disabled="!disable1" style="width: 70vw" v-model="form.delivery_sheet_date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_JOBWORKDELIVERY')" >
                  <el-input :disabled="!disable1" :rows="2"  style="width: 70vw;" type="textarea"
                            v-model="form.jpwork_delivery">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row >
                <el-form-item :label="$t('label.PFANS2026FORMVIEW_CITATION')">
                  <el-table :data="tableD" stripe border header-cell-class-name="sub_bg_color_blue">
                    <el-table-column :label="$t('label.PFANS2026FORMVIEW_CONTENT')" align="center" fixed prop="content" width="230">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable1" v-model="scope.row.content">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS2026FORMVIEW_USERID')" align="center" prop="user_id" width="300">
                      <template slot-scope="scope">
                        <user
                          :disabled="!disable1"
                          :no="scope.row"
                          :userlist="scope.row.user_id"
                          @getUserids="getCitationUserid"
                          selectType="Single"
                        ></user>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS2026FORMVIEW_REMARKS')" align="center" prop="remarks" width="400">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable1" v-model="scope.row.remarks">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.operation')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-button
                          :disabled="!disable1"
                          @click.native.prevent="deleteRow(scope.$index, tableD)"
                          plain
                          size="small"
                          type="danger"
                        >{{$t('button.delete')}}
                        </el-button>
                        <el-button
                          :disabled="!disable1"
                          @click="addRow()"
                          plain
                          size="small"
                          type="primary"
                        >{{$t('button.insert')}}
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2026VIEW_OUT')" name="fourth">
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="errorreporter" :label="$t('label.PFANS2026VIEW_REPORTER')" prop="reporterlist">
                    <user :disabled="!disable2" :error="errorreporter" :selectType="selectType"
                          :userlist="reporterlist" @getUserids="getReporterids" style="width:20vw"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_REPORTDATE')">
                    <el-date-picker :disabled="!disable2" style="width:20vw" v-model="form.report_date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_RESIGNATIONDATE')" prop="resignation_date">
                    <el-date-picker :disabled="!disable2" style="width:20vw" v-model="form.resignation_date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('label.PFANS2026VIEW_SOCIALEVALUATION')" >
                    <dicselect :code="code1"
                               :data="form.social_evaluation"
                               :disabled="!disable2"
                               :multiple="multiple"
                               @change="getSocial"
                               style="width: 70vw;">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_EXTERNALEVALUATION')" >
                  <el-input :disabled="!disable2"  style="width: 70vw;" type="textarea"
                            v-model="form.external_evaluation">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_REASON2')" >
                  <el-input :disabled="!disable2" :placeholder="$t('label.PFANS2026FORMVIEW_PLACEHOLDER1')"  style="width: 70vw;"
                            type="textarea" v-model="form.reason2">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_IMPACTRESIGNATIONEXTERNAL')" >
                  <el-input :disabled="!disable2"  style="width: 70vw;" type="textarea"
                            v-model="form.impact_resignation_external">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_IMPACTRESIGNATIONINTERNAL')" >
                  <el-input :disabled="!disable2" style="width: 70vw;"  type="textarea"
                            v-model="form.impact_resignation_internal">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_INFLUENCEINFORMATIONSECURITY')">
                  <el-input :disabled="!disable2" :placeholder="$t('label.PFANS2026FORMVIEW_PLACEHOLDER2')"  :rows="3" style="width: 70vw;"
                            type="textarea"
                            v-model="form.influence_information_security">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_RETIREMENTSTRATEGY')">
                  <el-input :disabled="!disable2" :placeholder="$t('label.PFANS2026FORMVIEW_PLACEHOLDER3')" style="width: 70vw;"
                            type="textarea"
                            v-model="form.retirement_strategy">
                  </el-input>
                </el-form-item>
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
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getOrgInfoByUserId, getUserInfo} from '@/utils/customize';
  import {isvalidPhone, telephoneNumber} from '@/utils/validate';
  import dicselect from '../../../components/dicselect';


  export default {
    name: 'PFANS2026FormVIEW',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
    },
    data() {
      var validateDay = (rule, value, callback) => {
        if (value) {
          if (moment(value).diff(moment(this.form.application_date), 'day') <= 30) {
            callback(new Error(this.$t('normal.error_date1')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === "undefined") {
          this.error = this.$t('normal.error_09') + this.$t('label.user_name');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
        } else {
          this.error = "";
          return callback();
        }
      };
      var checkrep = (rule, value, callback) => {
        if (this.disable2) {
          if (!this.form.reporter || this.form.reporter === '' || this.form.reporter === "undefined") {
            this.errorreporter = this.$t('normal.error_09') + this.$t('label.user_name');
            return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
          } else {
            this.errorreporter = "";
            return callback();
          }
        } else {
          callback();
        }
      };
      var checktel = (rule, value, callback) => {
        if (this.form.cellphone !== null && this.form.cellphone !== '') {
          if (!isvalidPhone(value)) {
            callback(new Error(this.$t('normal.error_09') + this.$t('label.effective') + this.$t('label.user_mobile')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var checkphone = (rule, value, callback) => {
        if (this.form.fixed_phone !== null && this.form.fixed_phone !== '') {
          if (telephoneNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS2026VIEW_FIXEDTELEPHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        tableData: [{
          ordernumber: '1',
          confirmperson: this.$t('label.center'),
          confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA1'),
          confirmmark: '',
          date: '',
        }, {
          ordernumber: '2',
          confirmperson: this.$t('label.group'),
          confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA2'),
          confirmmark: '',
          date: '',
        }, {
          ordernumber: '3',
          confirmperson: this.$t('label.team'),
          confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA2'),
          confirmmark: '',
          date: '',
        }, {
          ordernumber: '4',
          confirmperson: this.$t('label.PFANS2026FORMVIEW_UNIONMEMBER'),
          confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA4'),
          confirmmark: '',
          date: '',
        },
          {
            ordernumber: '5',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_FINANCE'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA5'),
            confirmmark: '',
            date: '',
          }, {
            ordernumber: '6',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_LEGALAFFAIRS'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA6'),
            confirmmark: '',
            date: '',
          }, {
            ordernumber: '7',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_AFFAIRSPERSONNEL'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA7'),
            confirmmark: '',
            date: '',
          }, {
            ordernumber: '8',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_AFFAIRSPERSONNEL'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA8'),
            confirmmark: '',
            date: '',
          },
          {
            ordernumber: '9',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_AFFAIRSPERSONNEL'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA9'),
            confirmmark: '',
            date: '',
          }, {
            ordernumber: '10',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_AFFAIRSPERSONNEL'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA10'),
            confirmmark: '',
            date: '',
          }, {
            ordernumber: '11',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_AFFAIRSPERSONNEL'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA11'),
            confirmmark: '',
            date: '',
          }, {
            ordernumber: '12',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_INFORMATIONSYSTEM'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA12'),
            confirmmark: '',
            date: '',
          }
        ],
        right: 'W0033',
        d1: false,
        d2: true,
        d3: true,
        d4: true,
        error: '',
        errorreporter: '',
        selectType: 'Single',
        title: 'title.PFANS2026VIEW',
        userlist: '',
        reporterlist: '',
        activeName: 'first',
        loading: false,
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        tableD: [
          {
            citation_id: "",
            staffexitprocedure_id: "",
            content: "",
            user_id: "",
            remarks: "",
          }
        ],
        baseInfo: {},
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_name: '',
          sex: '',
          position: '',
          entry_time: '',
          application_date: moment(new Date()).format('YYYY-MM-DD'),
          hope_exit_date: '',
          reason: '',
          address: '',
          fixed_phone: '',
          cellphone: '',
          email: '',
          jpwork_delivery: '',
          educational_background: '',
          resignation_date: '',
          reporter: moment().format('YYYY-MM-DD'),
          report_date: moment().format('YYYY-MM-DD'),
          external_evaluation: '',
          influence_information_security: '',
          social_evaluation: '',
          reason2: '',
          retirement_strategy: '',
          delivery_sheet_date:moment().format('YYYY-MM-DD'),
          impact_resignation_internal: '',
          impact_resignation_external: '',
          stage: '0',
        },
        code1: 'PR012',
        code2: 'PR022',
        code3:'PR019',
        disable: false,
        disable1: false,
        disable2: false,
        multiple: false,
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change'
          }],
          fixed_phone: [{
            validator: checkphone, trigger: 'change',
          }],
          email: [
            {
              type: "email",
              message: this.$t('normal.error_09') + this.$t('label.effective') + this.$t('label.email'),
              trigger: ["blur", "change"]
            }
          ],
          cellphone: [{
            validator: checktel, trigger: 'change',
          }],
          hope_exit_date: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_DEPARTUREDATE'),
            trigger: 'change',
          },
            {validator: validateDay, trigger: 'change'}],
          reason: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_CAUSE'),
            trigger: 'change',
          }],
          reporterlist: [{
            required: this.disable2,
            validator: checkrep,
            trigger: 'change'
          }],
        },
        canStart: true,
      };
    },
    mounted() {
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS2026Store/selectById', {'staffexitprocedureid': this.$route.params._id})
          .then(response => {
            this.form = response.staffexitprocedure;
            if (response.citation.length > 0) {
              this.tableD = response.citation
            }
            this.userlist = this.form.user_id;
            this.reporterlist = this.form.reporter;
            this.baseInfo.staffexitprocedure = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.citation = JSON.parse(JSON.stringify(this.tableD));
            if (this.form.stage === '0' && this.form.status === '0') {
              this.right = 'W0033';
              this.canStart = true;
              this.disable = true;
              this.disable1 = false;
              this.disable2 = false;
            } else if (this.form.stage === '0' && this.form.status === '2') {
              this.right = 'W0033';
              this.canStart = false;
              this.disable = false;
              this.disable1 = false;
              this.disable2 = false;
            } else if (this.form.stage === '0' && this.form.status === '3') {
              this.right = 'W0033';
              this.canStart = true;
              this.disable = true;
              this.disable1 = false;
              this.disable2 = false;
            } else if (this.form.stage === '0' && this.form.status === '4') {
              this.right = 'W0033';
              this.canStart = true;
              this.disable = false;
              this.disable1 = false;
              this.disable2 = false;
            } else if (this.form.stage === '1' && this.form.status === '0') {

              this.right = 'W0045';
              this.canStart = true;
              this.disable = false;
              this.disable1 = false;
              this.disable2 = false;
            } else if (this.form.stage === '1' && this.form.status === '2') {
              this.right = 'W0045';
              this.canStart = false;
              this.disable = false;
              this.disable1 = false;
              this.disable2 = false;
            } else if (this.form.stage === '1' && this.form.status === '3') {
              this.right = 'W0045';
              this.canStart = true;
              this.disable = false;
              this.disable1 = false;
              this.disable2 = false;
            } else if (this.form.stage === '1' && this.form.status === '4') {
              this.right = 'W0045';
              this.canStart = true;
              this.disable = false;
              this.disable1 = true;
              this.disable2 = false;
            } else if (this.form.stage === '2' && this.form.status === '0') {
              this.right = 'W0046';
              this.canStart = true;
              this.disable = false;
              this.disable1 = true;
              this.disable2 = false;
              this.form.delivery_sheet_date=moment(new Date()).format('YYYY-MM-DD');
            } else if (this.form.stage === '2' && this.form.status === '2') {
              this.right = 'W0046';
              this.canStart = false;
              this.disable = false;
              this.disable1 = false;
              this.disable2 = false;
            } else if (this.form.stage === '2' && this.form.status === '3') {
              this.right = 'W0046';
              this.canStart = true;
              this.disable = false;
              this.disable1 = true;
              this.disable2 = false;
            } else if (this.form.stage === '2' && this.form.status === '4') {
              this.right = 'W0046';
              this.canStart = true;
              this.disable = false;
              this.disable1 = false;
              this.disable2 = true;
            } else if (this.form.stage === '3' && this.form.status === '0') {
              this.right = 'W0047';
              this.canStart = true;
              this.disable = false;
              this.disable1 = false;
              this.disable2 = true;
              this.form.report_date=moment(new Date()).format('YYYY-MM-DD');
            } else if (this.form.stage === '3' && this.form.status === '2') {
              this.right = 'W0047';
              this.canStart = false;
              this.disable = false;
              this.disable1 = false;
              this.disable2 = false;
            } else if (this.form.stage === '3' && this.form.status === '3') {
              this.right = 'W0047';
              this.canStart = true;
              this.disable = false;
              this.disable1 = false;
              this.disable2 = true;
            } else if (this.form.stage === '3' && this.form.status === '4') {
              this.right = 'W0047';
              this.canStart = false;
              this.disable = false;
              this.disable1 = false;
              this.disable2 = false;
            }
            if (!this.$route.params.disabled) {
              this.disable = this.$route.params.disabled;
              this.disable1 = this.$route.params.disabled;
              this.disable2 = this.$route.params.disabled;
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
        if (this.userlist !== null && this.userlist !== "") {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.center_id = rst.centerNmae;
          this.form.group_id = rst.groupNmae;
          this.form.team_id = rst.teamNmae;
          let lst = getUserInfo(this.$store.getters.userinfo.userid);
          if (lst) {
            this.form.sex = lst.userinfo.sex ;
            this.form.educational_background = lst.userinfo.educational;
            this.form.position = lst.userinfo.post;
            this.form.entry_time = lst.userinfo.enterday;
          }
          this.form.user_id = this.$store.getters.userinfo.userid;
          this.disable = true;
          this.disable1 = false;
          this.disable2 = false;
          this.loading = false;
        }
      }
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let lst = getUserInfo(val);
        let rst = getOrgInfoByUserId(val);
        if(rst){
            this.form.center_id = rst.centerNmae;
            this.form.group_id = rst.groupNmae;
            this.form.team_id = rst.teamNmae;
        }
        else{
            this.form.center_id = '';
            this.form.group_id = '';
            this.form.team_id = '';
        }
        if(lst){
            this.form.sex = lst.userinfo.sex ;
            this.form.educational_background = lst.userinfo.educational;
            this.form.position = lst.userinfo.post;
            this.form.entry_time = lst.userinfo.enterday;
        }
        else{
            this.form.sex = '';
            this.form.educational_background = '';
            this.form.position = '';
            this.form.entry_time = '';
        }
        if (!this.form.user_id || this.form.user_id === '' || typeof val == "undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.user_name');
        } else {
          this.error = '';
        }
      },
      getReporterids(val) {
        this.reporterlist = val;
        this.form.reporter = val;
        if (!this.form.reporter || this.form.reporter === '') {
          this.errorreporter = this.$t('normal.error_08') + this.$t('label.PFANS2026VIEW_REPORTER');
        } else {
          this.errorreporter = '';
        }
      },
      getCitationUserid(userlist, row) {
        row.user_id = userlist;
      },
      getType(val) {
        this.form.educational_background = val;
      },
      getSocial(val) {
        this.form.social_evaluation = val;
      },
      geteducational_background(val){
        this.form.educational_background=val;
      },
      getsex(val){
        this.form.sex=val;
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick("update");
      },
      start() {
        this.form.status = '2';
        this.buttonClick("update");
      },
      end() {
        this.form.status = '0';
        this.buttonClick("update");
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }else {
          this.tableD=[{
            citation_id: "",
            staffexitprocedure_id: "",
            content: "",
            user_id: null,
            remarks: "",
          }]
        }
      },
      addRow() {
        this.tableD.push({
          citation_id: "",
          staffexitprocedure_id: "",
          content: "",
          user_id: "",
          remarks: "",
        });
      },
      buttonClick(val) {
        this.$refs['reff'].validate(valid => {
          if (valid) {
            if (this.form.stage === '0' && this.form.status === '4' && val !== 'update') {
              if (this.form.user_id !== null && this.form.user_id !== '') {
                this.form.stage = '1';
                this.form.status = '0';
              }
            } else if (this.form.stage === '1' && this.form.status === '4' && val !== 'update') {
              if (this.form.jpwork_delivery !== null && this.form.jpwork_delivery !== '') {
                this.form.stage = '2';
                this.form.status = '0';
              }
            } else if (this.form.stage === '2' && this.form.status === '4' && val !== 'update') {
              if (this.form.reporter !== null && this.form.reporter !== '') {
                this.form.stage = '3';
                this.form.status = '0';
              }
            }
            this.loading = true;
            this.baseInfo = {};
            this.form.user_id = this.userlist;
            this.form.reporter = this.reporterlist;
            this.form.hope_exit_date = moment(this.form.hope_exit_date).format('YYYY-MM-DD');
            this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
            this.form.entry_time = moment(this.form.entry_time).format('YYYY-MM-DD');
            this.form.delivery_sheet_date = moment(this.form.delivery_sheet_date).format('YYYY-MM-DD');
            this.form.report_date = moment(this.form.report_date).format('YYYY-MM-DD');
            this.baseInfo.staffexitprocedure = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.citation = [];
            for (let i = 0; i < this.tableD.length; i++) {
              if (this.tableD[i].content !== "" || this.tableD[i].user_id !== "" || this.tableD[i].remarks !== "") {
                this.baseInfo.citation.push(
                  {
                    citation_id: this.tableD[i].citation_id,
                    staffexitprocedure_id: this.tableD[i].staffexitprocedure_id,
                    content: this.tableD[i].content,
                    user_id: this.tableD[i].user_id,
                    remarks: this.tableD[i].remarks,
                  }
                );
              }
            }
            if (this.$route.params._id) {
              this.baseInfo.staffexitprocedure.staffexitprocedure_id = this.$route.params._id;
              this.$store
                .dispatch('PFANS2026Store/update', this.baseInfo)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if (val !== "update") {
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
                .dispatch('PFANS2026Store/insert', this.baseInfo)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t('normal.success_01'),
                    type: 'success',
                    duration: 5 * 1000
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
                  }
                })
                .catch(error => {
                  Message({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000
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

<style rel="stylesheet/scss" lang="scss">

</style>
