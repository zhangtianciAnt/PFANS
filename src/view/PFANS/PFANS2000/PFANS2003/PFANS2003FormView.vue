<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick"
                         ref="container" v-loading="loading" @disabled="setdisabled">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:3vw" type="border-card">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.user_name')" prop="name">
                <el-input :disabled="!disabled" maxlength='20' style="width:20vw" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.sex')" prop="sex">
                <dicselect
                  :code="code1"
                  :data="form.sex"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="changesex"
                  style="width:20vw"
                  v-model="form.sex">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :label="$t('label.PFANS2002VIEW_BIRTHDAY')"
                prop="birthday"
              >
                <el-date-picker
                  :disabled="!disabled"
                  :placeholder="$t('normal.error_09')"
                  class="width"
                  type="date"
                  style="width:20vw"
                  v-model="form.birthday"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="erroracceptdate" :label="$t('label.PFANS2003VIEW_ACCEPTDATE')" prop="accept_date">
                <el-date-picker
                  :disabled="!disabled"
                  style="width:20vw"
                  type="date"
                  v-model="form.accept_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorinterviewdep" :label="$t('label.PFANS2003FORMVIEW_INTERVIEWDEP')"
                            prop="interviewdep">
                <org :disabled="!disabled" :error="errorinterviewdep"
                     :orglist="form.interviewdep" @getOrgids="getInterviewDep"
                     orgtype="2" style="width:20vw">
                </org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorinterviewdate" :label="$t('label.PFANS2003FORMVIEW_INTERVIEWDATE')"
                            prop="interview_date">
                <el-date-picker
                  :disabled="!disabled"
                  style="width:20vw"
                  type="date"
                  v-model="form.interview_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_WHETHERENTRY')" prop="whetherentry">
                <span style="margin-right: 1vw ">{{$t('label.no')}}</span>
                <el-switch :disabled="!disabled"
                           @change="changewhetherentry"
                           active-value="0"
                           inactive-value="1"
                           v-model="modelwhetherentry"
                ></el-switch>
                <span style="margin-left: 1vw ">{{$t('label.yes')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_RESULT')">
                <span style="margin-right: 1vw ">{{$t('label.no')}}</span>
                <el-switch :disabled="!result1"
                           active-value="0"
                           inactive-value="1"
                           v-model="modelresult"
                ></el-switch>
                <span style="margin-left: 1vw ">{{$t('label.yes')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <!--  wxl 4/9  start-->
          <el-row>
            <el-col :span="24">
              <el-table
                :data="tableData"
                :summary-method="getAverage"
                border stripe
                show-summary
                style="width:46vw"
                header-cell-class-name="sub_bg_color_blue"
              >
                <el-table-column
                  :label="$t('label.PFANS2002FORMVIEW_INTERVIEWER')"
                  align="center"
                  prop="interviewer"
                >
                  <template slot-scope="scope">
                    <el-input v-show="true" :disabled="!disabled" v-model="scope.row.interviewerN"
                              @change="changeInt(scope.row)"
                              :no="scope.row" style="width:14vw" size="small"></el-input>
                    <el-input v-show="false" :disabled="!disabled" v-model="scope.row.interviewer"
                              @change="changeInt(scope.row)"
                              :no="scope.row" style="width:14vw" size="small"></el-input>
                    <user
                      :disabled="!disabled"
                      :no="scope.row"
                      :userlist="scope.row.interviewer"
                      @getUserids="getInterviewerids"
                      selectType="Single"
                      style="width:100%"
                    ></user>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2002FORMVIEW_SCORE')"
                  align="center"
                  prop="score"
                >
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disabled"
                      :max="10"
                      :min="0"
                      :precision="1"
                      :step="0.1"
                      v-model="scope.row.score"
                      style="width:100%"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disabled"
                      @click.native.prevent="deleteRow(scope.$index, tableData)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disabled"
                      @click="addRow()"
                      plain
                      size="small"
                      type="primary"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <!--  wxl 4/9  end-->
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errorrecommenddep" :label="$t('label.PFANS2003VIEW_RECOMMENDDEP')"
                            prop="recommenddep"
              >
                <org :disabled="!disabled"
                     :error="errorrecommenddep"
                     :orglist="form.recommenddep"
                     @getOrgids="getRecommendDep"
                     orgtype="2"
                     style="width:20vw"
                ></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_RECOMMENDDATE')" prop="recommend_date">
                <el-date-picker
                  :disabled="!disabled"
                  style="width:20vw"
                  type="date"
                  v-model="form.recommend_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2002FORMVIEW_ADOPTION')" prop="source">
                <dicselect
                  :code="code2"
                  :data="form.source"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getsource"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>


<!--wxl 0409 start-->
            <el-col :span="8">
              <el-form-item
                :label="$t('label.PFANS2002FORMVIEW_OTHER3')"
                prop="other3"
                v-show="other3_show"
              >
                <el-input :disabled="!disabled" class="width" maxlength="20" style="width:20vw"
                          v-model="form.other"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-show="display" :label="$t('label.PFANS2002FORMVIEW_OTHERS')">
                <user
                  :disabled="!disabled"
                  :userlist="userlist"
                  @getUserids="getUserids"
                  selectType="Single"
                  style="width:20vw"
                ></user>
              </el-form-item>
            </el-col>
          </el-row>
<!--wxl 0409 end-->


<!--            <el-col :span="8">-->
<!--              <el-form-item :error="error" :label="$t('label.PFANS2003FORMVIEW_MEMBER')" prop="member" v-show="show1">-->
<!--                <user :disabled="!disabled" :error="error" :selectType="selectType"-->
<!--                      :userlist="userlist"-->
<!--                      @getUserids="getUserids"-->
<!--                      style="width:20vw"></user>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item :error="errornetwork" :label="$t('label.PFANS2003FORMVIEW_NETWORK')" prop="network"-->
<!--                            v-show="show2">-->
<!--                <el-input :disabled="!disabled" :error="errornetwork"-->
<!--                          maxlength='50'-->
<!--                          style="width:20vw" v-model="form.network"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--            <el-row>-->
<!--              <el-col :span="8">-->
<!--                <el-form-item  :label="$t('label.PFANS2002FORMVIEW_OTHER3')"-->
<!--                               v-show="show3">-->
<!--                  <el-input :disabled="!disabled"-->
<!--                            style="width:72vw" v-model="form.other" type="textarea"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" prop="contactinformation">
                <el-input :disabled="!disabled" maxlength="20" style="width:20vw"
                          v-model="form.contactinformation"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input
                  :disabled="!disabled" maxlength="50" style="width:20vw"
                  v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_RN')">
                <dicselect
                  :code="code4"
                  :data="form.rn"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="changern"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003VIEW_SCHOOL')" prop="school">
                <el-input :disabled="!disabled" maxlength='20' style="width:20vw" v-model="form.school"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_SUPPLEMENT')" prop="supplement">
                <dicselect
                  :code="code3"
                  :data="form.supplement"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="changesupplement"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="this.$t('label.PFANS2003FORMVIEW_SALARY') + this.$t('label.yuan')">
                <el-input-number
                  :disabled="!disabled"
                  :max="1000000000"
                  :min="0"
                  :precision="2"
                  controls-position="right"
                  style="width:20vw"
                  v-model="form.salary"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003VIEW_TECHNOLOGY')">
                <dicselect
                  :code="code5"
                  :data="form.technology"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="gettechnology"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_SPECIALITY')">
                <el-input :disabled="!disabled" style="width:20vw" v-model="form.speciality"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_RESULTSHOWS')">
                <el-input :disabled="!disabled"  style="width:72vw"type="textarea"
                          v-model="form.resultshows"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.remarks')">
                <el-input :disabled="!disabled" style="width:72vw" type="textarea" v-model="form.remarks"></el-input>
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
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect.vue';
  import user from '../../../components/user.vue';
  import org from '../../../components/org';
  import moment from 'moment';
  import {telephoneNumber, validateEmail} from '@/utils/validate';
  import {getUserInfoName, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS2003FormView',
    components: {
      EasyNormalContainer,
      dicselect,
      user,
      org,
    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (rule.required && (!value || value === '' || value === 'undefined')) {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_MEMBER')));
          this.error = this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_MEMBER');
        } else {
          callback();
          this.error = '';
        }
      };
      var validateinterviewdepid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP')));
          this.errorinterviewdep = this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP');
        } else {
          callback();
          this.errorinterviewdep = '';
        }
      };
      var validaterecommenddepid = (rule, value, callback) => {
        if (this.modelwhetherentry === '1') {
          callback();
          this.errorrecommenddep = '';
        } else if (this.modelwhetherentry === '0') {
          if (!value || value === '' || value === 'undefined') {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2003VIEW_RECOMMENDDEP')));
            this.errorrecommenddep = this.$t('normal.error_08') + this.$t('label.PFANS2003VIEW_RECOMMENDDEP');
          } else {
            callback();
          }
        }
      };
      var validatesourceid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2003VIEW_SOURCE')));
          this.error = this.$t('normal.error_08') + this.$t('label.PFANS2003VIEW_SOURCE');
        } else {
          callback();
          this.error = '';
        }
      };
      var validateTel = (rule, value, callback) => {
        if (this.form.contactinformation !== null && this.form.contactinformation !== '') {
          if (telephoneNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')));
          } else {
            callback();
          }
        } else {
          callback();
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
      var validateaccept_date = (rule, value, callback) => {
        if (this.form.accept_date !== null && this.form.accept_date !== '') {
          if (moment(value).format('YYYY-MM-DD') > moment(this.form.interview_date).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS2003VIEW_ACCEPTDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE')));
            this.erroracceptdate = this.$t('label.PFANS2003VIEW_ACCEPTDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE');
          } else {
            callback();
            this.erroracceptdate = '';
          }
        } else {
          callback();
          this.erroracceptdate = '';
        }
      };
      var validateinterview_date = (rule, value, callback) => {
        if (this.form.interview_date !== null && this.form.interview_date !== '') {
          if (moment(value).format('YYYY-MM-DD') < moment(this.form.accept_date).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2003VIEW_ACCEPTDATE')));
            this.errorinterviewdate = this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2003VIEW_ACCEPTDATE');
          } else {
            callback();
            this.errorinterviewdate = '';
          }
        } else {
          callback();
          this.errorinterviewdate = '';
        }
      };
      return {
        other3_show: false,
        display: false,
        modelwhetherentry: '1',
        modelresult: '1',
        loading: false,
        errorinterviewdep: '',
        errorrecommenddep: '',
        erroracceptdate: '',
        errorinterviewdate: '',
        error: '',
        errornetwork: '',
        selectType: 'Single',
        userlist: '',
        title: 'title.PFANS2003VIEW',
        buttonList: [],
        multiple: false,
          arrInt: [],
        tableData: [
            {
                interviewerN: '',
                interviewer: '',
                score: 0,
            },
        ],
        form: {
          interviewrecord_id: '',
          name: '',
          sex: '',
          birthday: "",
          accept_date: '',
          interviewdep: '',
          interview_date: '',
          recommenddep: '',
          recommend_date: '',
          source: '',
          member: '',
          network: '',
          school: '',
          supplement: '',
          other: '',
          rn: '',
          contactinformation: '',
          email: '',
          salary: '',
          technology: '',
          speciality: '',
          result: '1',
          whetherentry: '1',
          resultshows: '',
          remarks: '',
          nodeList: [],
          interview: '',
        },
        List: '',
        code1: 'PR019',
        // code2: 'PR020',
        code2: 'PR051',
        code3: 'PR022',
        code4: 'PR021',
        code5: 'PR023',
        menuList: [],
        result1: false,
        show1: false,
        show2: false,
        show3: false,
        rules: {
            // add_fjl_05/25  -- 添加必填项
            name: [{
                required: true,
                message: this.$t('normal.error_08') + this.$t('label.user_name'),
                trigger: 'blur',
            }],
            sex: [{
                required: true,
                message: this.$t('normal.error_09') + this.$t('label.sex'),
                trigger: 'change',
            }],
            birthday: [{
                required: true,
                message: this.$t("normal.error_08") + this.$t('label.PFANS2002VIEW_BIRTHDAY'),
                trigger: 'change'
            }],
            accept_date: [{
                required: true,
                message: this.$t('normal.error_09') + this.$t('label.PFANS2003VIEW_ACCEPTDATE'),
                trigger: 'change',
            },
                {validator: validateaccept_date, trigger: 'change'}],
            school: [{
                required: true,
                message: this.$t("normal.error_08") + this.$t('label.PFANS2003VIEW_SCHOOL'),
                trigger: 'blur'
            }],
            supplement: [{
                required: true,
                message: this.$t("normal.error_09") + this.$t('label.PFANS2003FORMVIEW_SUPPLEMENT'),
                trigger: 'change'
            }],
            // add_fjl_05/25  -- 添加必填项
        },
      };
    },
    created() {
      this.disabled = this.$route.params.disabled;
      this.result1 = this.$route.params.disabled;
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
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS2003Store/getinterviewrecordOne', {'interviewrecord_id': this.$route.params._id})
          .then(response => {
            this.form = response;
              // upd_fjl_05/27  --添加面试官手动输入
// wxl 4/8  start
              this.changeOption(this.form, 'view');
              if(this.form.interview){
                  this.tableData = [];
                  for (let a = 0; a < this.form.interview.length; a++) {
                      var vote = {};
                      vote.interviewer = this.form.interview[a].interviewer;
                      vote.interviewerN = getUserInfo(this.form.interview[a].interviewer).userinfo.customername;
                      vote.score = this.form.interview[a].score;
                      this.tableData.push(vote)
                  }
                  // this.tableData = this.form.interview;
              }
// wxl 4/8  end
              // upd_fjl_05/27  --添加面试官手动输入
            this.getsource(this.form.source);
            this.userlist = this.form.member;
            if (this.form.source === 'PR020001') {
              this.show1 = true;
              this.show2 = false;
              this.show3 = false;
              this.rules.member[0].required = true;
              this.error = '';
              this.rules.network[0].required = false;
            }
            if (this.form.source === 'PR020002') {
              this.show1 = false;
              this.show2 = true;
              this.show3 = false;
              this.rules.network[0].required = true;
              this.rules.member[0].required = false;
            }
            if (this.form.source === 'PR020003') {
              this.show1 = false;
              this.show2 = false;
              this.show3 = true;
              this.rules.network[0].required = false;
              this.rules.member[0].required = false;
            }
            this.modelwhetherentry = this.form.whetherentry;
            if (this.form.whetherentry === '0') {
              this.result1 = false;
            }
            this.modelresult = this.form.result;
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
      }
    },
    methods: {
// wxl 4/8 面试官放到面试记录 start
      changeOption(form, method) {
            let arr = [
                'other1',
                'other2',
                'resume',
                'identity',
                'diploma',
                'experience',
                'entry',
                'report',
                'ticket',
                'health',
            ];
            if (method === 'save') {
                for (var i in form) {
                    if (arr.includes(i)) {
                        form[i] = form[i] === true ? '0' : '1';
                    }
                }
            } else if (method === 'view') {
                for (var i in form) {
                    if (i === 'interview') {
                        form[i] = JSON.parse(form[i]);
                    }
                    if (arr.includes(i)) {
                        form[i] = form[i] === '0' ? true : false;
                    }
                }
            }
        },
      getAverage(param) {
          // this.form.interview = JSON.stringify(this.tableData);
            const {columns, data} = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = this.$t('label.PFANS2002FORMVIEW_AVESCORE');
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                } else {
                    sums[index] = '';
                }
            });
            sums[1] = Math.round(sums[1] / param.data.length * 100) / 100;
            return sums;
        },
        // upd_fjl_05/27  --添加面试官手动输入
        changeInt(row) {
            if (getUserInfoName(row.interviewerN) !== "-1") {
                row.interviewer = getUserInfoName(row.interviewerN).userid;
            } else {
                Message({
                    message: this.$t('label.PFANS2003FORMVIEW_INTERVIEWERERROR'),
                    type: 'error',
                    duration: 5 * 1000,
                });
                return;
            }
        },
        // upd_fjl_05/27  --添加面试官手动输入
      getInterviewerids(userlist, row) {
            row.interviewer = userlist;
          // upd_fjl_05/27  --添加面试官手动输入
          row.interviewerN = getUserInfo(userlist).userinfo.customername;
          // upd_fjl_05/27  --添加面试官手动输入
        },

      deleteRow(index, rows) {
            if (rows.length > 1) {
                rows.splice(index, 1);
            } else {
                this.tableData[0].interviewer = '';
                this.tableData[0].score = 0;
            }
        },

      addRow() {
            this.tableData.push({
                interviewer: '',
                score: 0,
            });
        },
// wxl 4/8 面试官放到面试记录 end
      setdisabled(val){
        if(this.$route.params.disabled){
          this.disabled = val;
        }
      },
      getInterviewDep(val) {
        this.form.interviewdep = val;
        if (!this.form.interviewdep || this.form.interviewdep === '' || val === 'undefined') {
          this.errorinterviewdep = this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP');
        } else {
          this.errorinterviewdep = '';
        }
      },
      getRecommendDep(val) {
        this.form.recommenddep = val;
        if (!this.form.recommenddep || this.form.recommenddep === '' || val === 'undefined') {
          this.errorrecommenddep = this.$t('normal.error_09') + this.$t('label.PFANS2003VIEW_RECOMMENDDEP');
        } else {
          this.errorrecommenddep = '';
        }
      },
      getUserids(val) {
        this.userlist = val;
        this.form.member = val;
        if (!this.form.member || this.form.member === '' || val === 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_MEMBER');
        } else {
          this.error = '';
        }
      },
      gettechnology(val) {
        this.form.technology = val;
        if (val === 'PR023001') {
        } else if (val === 'PR023002') {
        }
      },
      // getsource(val) {
      //   this.form.source = val;
      //   if (val === 'PR020001') {
      //     this.show1 = true;
      //     this.show2 = false;
      //     this.show3 = false;
      //     this.rules.member[0].required = true;
      //     this.error = '';
      //     this.rules.network[0].required = false;
      //   } else if (val === 'PR020002') {
      //     this.show1 = false;
      //     this.show2 = true;
      //     this.show3 = false;
      //     this.rules.network[0].required = true;
      //     this.rules.member[0].required = false;
      //   }else if(val === 'PR020003'){
      //     this.show1 = false;
      //     this.show2 = false;
      //     this.show3 = true;
      //     this.rules.network[0].required = false;
      //     this.rules.member[0].required = false;
      //   }
      // },
        getsource(val) {
          this.form.source = val
          if (val === 'PR051004') {
              this.display = true;
          } else {
              this.display = false;
              this.userlist = '',
              this.form.others = '';
          }
          this.form.adoption = val;
          if (val === 'PR051005') {
              this.other3_show = true;
          } else {
              this.other3_show = false;
              // this.form.others = '';
              this.form.other = '';

          }
      },
      changesex(val) {
        this.form.sex = val;
      },
      changesupplement(val) {
        this.form.supplement = val;
      },
      changern(val) {
        this.form.rn = val;
      },
      changewhetherentry(val) {
        if (val === '1') {
          this.result1 = true;
        } else {
          this.modelresult = '0';
          this.result1 = false;
        }
      },
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
              // upd_fjl_05/27  --添加面试官手动输入
              this.arrInt = [];
              for (let i = 0; i < this.tableData.length; i++) {
                  if (this.tableData[i].interviewer === '' || this.tableData[i].interviewer === null || this.tableData[i].interviewer === undefined) {
                      Message({
                          message: this.$t('label.PFANS2003FORMVIEW_INTERVIEWERERROR'),
                          type: 'error',
                          duration: 5 * 1000,
                      });
                      return;
                  } else {
                      this.arrInt.push({
                          interviewer: this.tableData[i].interviewer,
                          score: this.tableData[i].score,
                      });
                  }
              }
              this.form.interview = JSON.stringify(this.arrInt);
              // upd_fjl_05/27  --添加面试官手动输入
            this.loading = true;
            this.form.member = this.userlist;
            this.form.whetherentry = this.whetherentry;
            this.form.result = this.result;
            if (this.form.source === 'PR020001') {
              this.form.network = '';
            } else if (this.form.source === 'PR020002') {
              this.form.member = '';
            }
            this.form.whetherentry = this.modelwhetherentry;
            this.form.result = this.modelresult;
              this.changeOption(this.form, 'save');
            if (this.$route.params._id) {
              this.form.interviewrecord_id = this.$route.params._id;
              this.$store
                .dispatch('PFANS2003Store/updateinterviewrecord', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t('normal.success_02'),
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
            } else {
              this.$store
                .dispatch('PFANS2003Store/createinterviewrecord', this.form)
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

<style lang="scss" rel="stylesheet/scss">

</style>
