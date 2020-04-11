<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading" @disabled="setdisabled">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 3vw">
          <!--            第一行-->
          <el-row>
            <!--            姓名-->
            <el-col :span="8">
              <el-form-item :error="errorexpname" :label="$t('label.user_name')"
                            prop="expname">
                <el-input :disabled="true" maxlength='36' style="width: 20vw"
                          v-model="form.expname"></el-input>
              </el-form-item>
            </el-col>
            <!--            性别-->
            <el-col :span="8">
              <el-form-item :label="$t('label.sex')" prop="sex">
                <dicselect
                  :code="code1"
                  :data="form.sex"
                  :disabled="true"
                  :multiple="multiple"
                  @change="changesex"
                  style="width:20vw"
                  v-model="form.sex">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            年龄-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_AGE')">
                <el-input :disabled="true" style="width:20vw" v-model="age"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            第二行-->
          <el-row>
            <!--            毕业院校-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_GRADUATESCHOOL')" prop="graduateschool">
                <el-input :disabled="true" style="width:20vw" v-model="form.graduateschool"></el-input>
              </el-form-item>
            </el-col>
            <!--            学历-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND')" prop="education">
                <dicselect
                  :code="code2"
                  :data="form.education"
                  :disabled="true"
                  :multiple="multiple"
                  @change="changeeducation"
                  style="width:20vw"
                  v-model="form.education">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--           卒业年-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2024VIEW_GRADUATIONYEAR')" prop="graduation_year">
                <el-date-picker
                  :disabled="true"
                  style="width:20vw"
                  type="year"
                  v-model="form.graduation_year">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            第三行-->
          <el-row>
            <!--            供应商名称-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')" prop="suppliername">
                <el-input :disabled="true" style="width:20vw" v-model="form.suppliername"></el-input>
              </el-form-item>
            </el-col>
            <!--            技术分类-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003VIEW_TECHNOLOGY')" prop="technology">
                <dicselect
                  :code="code5"
                  :data="form.technology"
                  :disabled="true"
                  :multiple="multiple"
                  @change="changetechnology"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            Rn-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_RN')" prop="rn">
                <dicselect
                  :code="code4"
                  :data="form.rn"
                  :disabled="true"
                  :multiple="multiple"
                  @change="changern"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第四行-->
          <el-row>
            <!--            所属部门-->
            <el-col :span="8">
              <el-form-item :error="errorgroup" :label="$t('label.group')" prop="group_id">
                <org :disabled="!disabled" :error="errorgroup" :orglist="grouporglist" @getOrgids="getGroupId"
                     orgtype="2" style="width:20vw"></org>
              </el-form-item>
            </el-col>
            <!--            编号变更卡号-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_JOBNUMBER')" prop="number">
                <el-input
                  :disabled="!disabled"
                  style="width:20vw"
                  v-model="form.number">
                </el-input>
              </el-form-item>
            </el-col>
            <!--            邮箱-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EMAILADDRESS')" prop="email">
                <el-input :disabled="!disabled" style="width:20vw" maxlength="50"
                          v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第五行-->
          <el-row>
            <!--            作业形态-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6004FORMVIEW_OPERATIONFORM')" prop="operationform">
                <dicselect
                  :code="code20"
                  :data="form.operationform"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="changeoperationform"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            作业分类-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6004FORMVIEW_JOBCLASSIFICATIONM')" prop="jobclassification">
                <dicselect
                  :code="code21"
                  :data="form.jobclassification"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="changejobclassification"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            入场时间-->
            <el-col :span="8">
              <el-form-item :error="erroradmissiontime" :label="$t('label.PFANS6004FORMVIEW_ADMISSIONTIME')"
                            prop="admissiontime">
                <el-date-picker
                  :disabled="!disabled"
                  style="width:20vw"
                  type="date"
                  v-model="form.admissiontime">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!--            職務-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERVIEW_POST')" prop="post">
                <dicselect
                  :disabled="!disabled"
                  :code="code15"
                  :data="form.post"
                  @change="changePost"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第六行-->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS6004VIEW_EXINTELLIGENCE')}}</span>
              </template>
              <!--          第七行-->
              <el-row>
                <!--            退场与否-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6004FORMVIEW_EXITS')" prop="exits">
                    <span style="margin-right: 1vw ">{{$t('label.no')}}</span>
                    <el-switch :disabled="!disabled"
                               @change="changeexits"
                               active-value="0"
                               inactive-value="1"
                               v-model="form.exits"
                    ></el-switch>
                    <span style="margin-left: 1vw ">{{$t('label.yes')}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <!--          第八行-->
              <el-row>
                <!--            退场时间-->
                <el-col :span="8">
                  <el-form-item :error="errorexitime" :label="$t('label.PFANS6004FORMVIEW_EXITIME')" prop="exitime"
                                v-show="show">
                    <el-date-picker
                      :disabled="!disabled"
                      style="width:20vw"
                      type="date"
                      v-model="form.exitime">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <!--            退场理由-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6004FORMVIEW_EXITREASON')" prop="exitreason" v-show="show">
                    <dicselect
                      :code="code6"
                      :data="form.exitreason"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="changeexitreason"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <!--            所有技术-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6004FORMVIEW_ALLTECHNOLOGY')" prop="alltechnology" v-show="show">
                    <dicselect
                      :code="code7"
                      :data="form.alltechnology"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="changealltechnology"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--          第九行-->
              <el-row>
                <!--            現場評価-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6004FORMVIEW_SITEVALUATION')" prop="sitevaluation" v-show="show">
                    <dicselect
                      :code="code8"
                      :data="form.sitevaluation"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="changesitevaluation"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <!--            業務影響-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6004FORMVIEW_BUSINESSIMPACT')" prop="businessimpact"
                                v-show="show">
                    <dicselect
                      :code="code10"
                      :data="form.businessimpact"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="changebusinessimpact"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <!--            対策-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6004FORMVIEW_COUNTERMEASURE')" prop="countermeasure"
                                v-show="show">
                    <dicselect
                      :code="code9"
                      :data="form.countermeasure"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="changecountermeasure"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <!--          最后一行-->
          <!--          项目信息-->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS6004VIEW_PROJECTINFORMATION')}}</span>
              </template>
              <el-table
                :data="tableData"
                border
                style="width:100%"
              >
                <!--                部门-->
                <el-table-column
                  prop="group_id"
                  :label="$t('label.department')"
                  width="150"
                >
                </el-table-column>
                <!--                项目-->
                <el-table-column
                  prop="project_name"
                  :label="$t('label.PFANS5009VIEW_PROJECTNAME')"
                  width="150"
                >
                </el-table-column>
                <!--                项目类型-->
                <el-table-column
                  prop="projecttype"
                  :label="$t('label.PFANS5001FORMVIEW_PROJECTTYPE')"
                  width="150"
                >
                </el-table-column>
                <!--                开始时间-->
                <el-table-column
                  prop="admissiontime"
                  :label="$t('label.PFANS5001FORMVIEW_STARTDATE')"
                  width="150"
                >
                </el-table-column>
                <!--                结束时间-->
                <el-table-column
                  prop="exittime"
                  :label="$t('label.end')"
                  width="150"
                >
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import PFANS6004View from '../PFANS6004/PFANS6004View.vue';
  import dicselect from '../../../components/dicselect.vue';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {
    getDictionaryInfo,
    getUserInfo,
    getorgGroupList
  } from '../../../../utils/customize';
  import org from '../../../components/org';
  import {validateEmail} from "../../../../utils/validate";

  export default {
    name: 'PFANS6004FormView',
    components: {
      EasyNormalContainer,
      PFANS6004View,
      dicselect,
      org,
    },
    data() {
      var checkexpname = (rule, value, callback) => {
        if (!value || value === '') {
          this.errorexpname = this.$t('normal.error_09') + this.$t('label.user_name');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
        } else {
          this.errorexpname = '';
          return callback();
        }
      };

      var checkgraduateschool = (rule, value, callback) => {
        if (!value || value === '') {
          this.errorgraduateschool = this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_GRADUATESCHOOL');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_GRADUATESCHOOL')));
        } else {
          this.errorgraduateschool = '';
          return callback();
        }
      };

      var checkgroup = (rule, value, callback) => {
        if (!value || value === '') {
          this.errorgroup = this.$t('normal.error_09') + this.$t('label.group');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.group')));
        } else {
          this.errorgroup = '';
          return callback();
        }
      };
      var checksuppliername = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.errorsuppliername = this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_SUPPLIERNAME');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_SUPPLIERNAME')));
        } else {
          this.errorsuppliername = '';
          return callback();
        }
      };
      var valadmissiontime = (rule, value, callback) => {
        if (this.form.exitime !== null && this.form.exitime !== '') {
          if (moment(value).format('YYYY-MM-DD') > moment(this.form.exitime).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS6004FORMVIEW_ADMISSIONTIME') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2002FORMVIEW_EXITTIME')));
            this.erroradmissiontime = this.$t('label.PFANS6004FORMVIEW_ADMISSIONTIME') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2002FORMVIEW_EXITTIME');
          } else {
            callback();
            this.erroradmissiontime = '';
          }
        } else {
          callback();
          this.erroradmissiontime = '';
        }
      };
      var valexitime = (rule, value, callback) => {
        if (this.form.exitime !== null && this.form.exitime !== '') {
          if (moment(value).format('YYYY-MM-DD') < moment(this.form.admissiontime).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS2002FORMVIEW_EXITTIME') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2002FORMVIEW_ADMISSIONTIME')));
            this.errorexitime = this.$t('label.PFANS2002FORMVIEW_EXITTIME') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE');
          } else {
            callback();
            this.errorexitime = '';
          }
        } else {
          callback();
          this.errorexitime = '';
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
      return {
        age: '',
        loading: false,
        selectType: 'Single',
        title: 'title.PFANS6004VIEW',
        errorexpname: '',
        errorsuppliername: '',
        erroradmissiontime: '',
        grouporglist: '',
        errorexitime: '',
        errorgroup: '',
        errorgraduateschool: '',
        disabled: false,
        buttonList: [],
        multiple: false,
        search: '',
        gridData1: [],
        form: {
          expatriatesinfor_id: '',
          expname: '',
          cooperuserid: '',
          sex: '',
          group_id: '',
          number: '',
          post: '',
          contactinformation: '',
          suppliername: '',
          suppliernameid: '',
          graduateschool: '',
          education: '',
          graduation_year: '',
          technology: '',
          email: '',
          rn: '',
          operationform: '',
          jobclassification: '',
          admissiontime: moment(new Date()).format('YYYY-MM-DD'),
          exitime: moment(new Date()).format('YYYY-MM-DD'),
          exitreason: '',
          alltechnology: '',
          sitevaluation: '',
          businessimpact: '',
          whetherentry: '',
          countermeasure: '',
          exits: '1',
        },
        tableData: [{
          group_id: '',
          project_name: '',
          projecttype: '',
          exittime: '',
          admissiontime: '',
        }],
        //性别
        code1: 'PR019',
        //学历
        code2: 'PR022',
        // 面试结果
        code3: 'BP003',
        //Rn
        code4: 'PR021',
        //技术分类
        code5: 'BP005',
        //退场理由
        code6: 'BP012',
        //所有技术
        code7: 'BP008',
        //现场评价
        code8: 'BP009',
        //対策
        code9: 'BP011',
        //業務影響
        code10: 'BP010',
        code15: 'PG021',
        //作业形态
        code20: 'BP024',
        //作业分类
        code21: 'BP025',
        result1: "",
        disabled: true,
        rules: {
          // 姓名
          expname: [
            {
              required: true,
              validator: checkexpname,
              trigger: 'change',
            }],
          // 職務
          post: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANSUSERVIEW_POST'),
              trigger: 'blur',
            }],
          // 性别
          sex: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.sex'),
              trigger: 'change',
            },
          ],
          //所属部门
          group_id: [
            {
              required: true,
              validator: checkgroup,
              trigger: 'change',
            },
          ],
          email: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
              trigger: 'blur'
            },
            {validator: checkemail, trigger: 'blur'}],
          // 编号
          number: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_NUMBERS'),
              trigger: 'blur',
            },
          ],
          // 供应商名称
          suppliername: [
            {
              required: true,
              validator: checksuppliername,
              trigger: 'change',
            },
          ],
          // 毕业院校
          graduateschool: [
            {
              required: true,
              validator: checkgraduateschool,
              trigger: 'change',
            }],
          // 学历
          education: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND'),
              trigger: 'change',
            },
          ],
          //毕业年
          graduation_year: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2024VIEW_GRADUATIONYEAR'),
              trigger: 'change',
            },
          ],
          // 作业形态
          operationform: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND'),
              trigger: 'change',
            },
          ],
          // 作业分类
          jobclassification: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP'),
              trigger: 'change',
            },
          ],
          // 入场时间
          admissiontime: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE'),
              trigger: 'change',
            },
            {validator: valadmissiontime, trigger: 'change'},
          ],
          // 技术分类
          technology: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2003VIEW_TECHNOLOGY'),
              trigger: 'change',
            },
          ],
          // Rn
          rn: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_RN'),
              trigger: 'change',
            },
          ],
          // 退场时间
          exitime: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_EXITIME'),
              trigger: 'change',
            },
            {validator: valexitime, trigger: 'change'},
          ],
          // 退场理由
          exitreason: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_EXITREASON'),
              trigger: 'change',
            },
          ],
          // 所有技术
          alltechnology: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_ALLTECHNOLOGY'),
              trigger: 'change',
            },
          ],
          // 現場評価
          sitevaluation: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_SITEVALUATION'),
              trigger: 'change',
            },
          ],
          // 業務影響
          businessimpact: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_BUSINESSIMPACT'),
              trigger: 'change',
            },
          ],
          // 対策
          countermeasure: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_COUNTERMEASURE'),
              trigger: 'change',
            },
          ],
        },
        show: false,
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.selectById();
      }
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS6004Store/getexpatriatesinforApplyOne', {'expatriatesinfor_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            if(this.form.birth!='') {
              let birthdays = new Date(this.form.birth);
              let d = new Date();
              let age = 0;
              let agenew = 0;
              age = d.getFullYear() - birthdays.getFullYear();
              agenew = d.getFullYear() - birthdays.getFullYear();
              if (d.getMonth() > birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() > birthdays.getDate())) {
                agenew = age;
              } else {
                agenew = age - 1;
              }
              this.age = agenew;
            }else{
              this.age = 0;
            }
            this.form.admissiontime = moment(new Date()).format('YYYY-MM-DD');
            this.grouporglist = this.form.group_id;
            this.loading = false;
            if (this.form.exits === '1') {
              this.show = false;
            } else {
              this.show = true;
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
      if (this.form.exits === '1') {
        this.show = false;
        this.rules.exitime[0].required = false;
        this.rules.exitreason[0].required = false;
        this.rules.alltechnology[0].required = false;
        this.rules.sitevaluation[0].required = false;
        this.rules.businessimpact[0].required = false;
        this.rules.countermeasure[0].required = false;
      } else {
        this.show = true;
        this.rules.exitime[0].required = true;
        this.rules.exitreason[0].required = true;
        this.rules.alltechnology[0].required = true;
        this.rules.sitevaluation[0].required = true;
        this.rules.businessimpact[0].required = true;
        this.rules.countermeasure[0].required = true;
      }
    },
    methods: {
      setdisabled(val){
        if(this.$route.params.disabled){
          this.disabled = val;
        }
      },
      changesex(val) {
        this.form.sex = val;
      },
      changeeducation(val) {
        this.form.education = val;
      },
      changeoperationform(val) {
        this.form.operationform = val;
      },
      changetechnology(val) {
        this.form.technology = val;
      },
      changejobclassification(val) {
        this.form.jobclassification = val;
      },
      changern(val) {
        this.form.rn = val;
      },
      changealltechnology(val) {
        this.form.alltechnology = val;
      },
      changesitevaluation(val) {
        this.form.sitevaluation = val;
      },
      changebusinessimpact(val) {
        this.form.businessimpact = val;
      },
      changecountermeasure(val) {
        this.form.countermeasure = val;
      },
      changePost(val) {
        this.form.post = val;
      },
      changeexitreason(val) {
        this.form.exitreason = val;
      },
      getGroupId(val) {
        this.form.group_id = val;
        this.grouporglist = val;
        if (!this.form.group_id || this.form.group_id === '' || val === 'undefined') {
          this.errorgroup = this.$t('normal.error_09') + this.$t('label.group');
        } else {
          this.errorgroup = '';
        }
      },
      changeexits(val) {
        this.form.exits = val;
        if (val === '1') {
          this.show = false;
          this.rules.exitime[0].required = false;
          this.rules.exitreason[0].required = false;
          this.rules.alltechnology[0].required = false;
          this.rules.sitevaluation[0].required = false;
          this.rules.businessimpact[0].required = false;
          this.rules.countermeasure[0].required = false;
        } else {
          this.show = true;
          this.rules.exitime[0].required = true;
          this.rules.exitreason[0].required = true;
          this.rules.alltechnology[0].required = true;
          this.rules.sitevaluation[0].required = true;
          this.rules.businessimpact[0].required = true;
          this.rules.countermeasure[0].required = true;
        }
      },
      selectById(val) {
        this.loading = true;
        this.$store
          .dispatch('PFANS6004Store/getCompanyProject', {"SyspName": this.$route.params._id})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].group_id !== null && response[j].group_id !== '') {
                let group = getorgGroupList(response[j].group_id);
                if (group) {
                  response[j].group_id = group.groupname;
                }
              }
              if (response[j].project_name !== null && response[j].project_name !== "") {
                let project_name = getUserInfo(response[j].project_name);
                if (project_name) {
                  response[j].project_name = user.userinfo.customername;
                }
              }
              if (response[j].admissiontime !== null && response[j].admissiontime !== "") {
                response[j].admissiontime = moment(response[j].admissiontime).format("YYYY-MM-DD");
              }
              if (response[j].exittime !== null && response[j].exittime !== "") {
                response[j].exittime = moment(response[j].exittime).format("YYYY-MM-DD");
              }
              if (response[j].projecttype !== null && response[j].projecttype !== "") {
                let checkvalue1 = getDictionaryInfo(response[j].projecttype);
                if (checkvalue1) {
                  response[j].projecttype = checkvalue1.value1;
                }

              }
            }
            this.tableData = response;
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
          })
      },
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.form.expatriatesinfor_id = this.$route.params._id;
            this.form.admissiontime = moment(this.form.admissiontime).format('YYYY-MM-DD');
            this.loading = true;
            if (this.form.exits === '1') {
              this.form.exitime = '';
              this.form.exitreason = '';
              this.form.alltechnology = '';
              this.form.sitevaluation = '';
              this.form.businessimpact = '';
              this.form.countermeasure = '';
              this.rules.exitime[0].required = false;
              this.rules.exitreason[0].required = false;
              this.rules.alltechnology[0].required = false;
              this.rules.sitevaluation[0].required = false;
              this.rules.businessimpact[0].required = false;
              this.rules.countermeasure[0].required = false;
            }
            if (this.$route.params._id) {
              this.$store
                .dispatch('PFANS6004Store/updateexpatriatesinfor', this.form)
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
              this.form.admissiontime = moment(this.form.admissiontime).format('YYYY-MM-DD');
              this.loading = true;
              this.$store
                .dispatch('PFANS6004Store/createexpatriatesinforApply', this.form)
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
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .dpSupIndex {
    .content {
      height: 34px;
      min-width: 80%;
      border: 0.1rem solid #ebeef5;
      overflow-y: scroll;
      overflow-x: hidden;
      line-height: 34px;
      padding: 0.1rem 0.5rem 0.2rem 0.5rem;
    }

    .bg {
      background: white;
      border-width: 1px;
    }
  }
</style>
