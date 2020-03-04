<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <!--            第一行-->
          <el-row>
            <!--            姓名-->
            <el-col :span="8">
              <el-form-item :error="errorexpname" :label="$t('label.user_name')"
                            prop="expname">
                <div class="dpSupIndex" style="width:20vw" prop="expname">
                  <el-container>
                    <input class="content bg" v-model="form.expname" :error="errorexpname"
                           :disabled="true"></input>
                    <el-button :disabled="!disabled" icon="el-icon-search" @click="dialogTableVisible1 = true"
                               size="small"></el-button>
                    <el-dialog :title="$t('title.PFANS6001VIEW')" :visible.sync="dialogTableVisible1" center size="50%"
                               top="8vh" lock-scroll
                               append-to-body>
                      <div style="text-align: center">
                        <el-row style="text-align: center;height: 90%;overflow: hidden">
                          <el-table
                            :data="gridData1.filter(data => !search || data.expname.toLowerCase().includes(search.toLowerCase()))"
                            height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                            @row-click="handleClickChange1">
                            <el-table-column property="expname" fixed :label="$t('label.user_name')"
                                             width="100"></el-table-column>
                            <el-table-column property="sex" :label="$t('label.sex')"
                                             width="100"></el-table-column>
                            <el-table-column property="contactinformation"
                                             :label="$t('label.PFANS6001VIEW_CONTACTINFORMATION')"
                                             width="150"></el-table-column>
                            <el-table-column property="age"
                                             :label="$t('label.PFANSUSERFORMVIEW_AGE')"
                                             width="100"></el-table-column>
                            <el-table-column property="suppliername"
                                             :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                             width="100"></el-table-column>
                            <el-table-column property="graduateschool"
                                             :label="$t('label.PFANS6001VIEW_GRADUATESCHOOL')"
                                             width="100"></el-table-column>
                            <el-table-column property="education"
                                             :label="$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND')"
                                             width="100"></el-table-column>
                            <el-table-column property="speciality"
                                             :label="$t('label.PFANS2003FORMVIEW_SPECIALITY')"
                                             width="100"></el-table-column>
                            <el-table-column property="interview_date"
                                             :label="$t('label.PFANS2003FORMVIEW_INTERVIEWDATE')"
                                             width="100"></el-table-column>
                            <el-table-column property="result"
                                             :label="$t('label.PFANS6001VIEW_RESULT')"
                                             width="100"></el-table-column>
                            <el-table-column property="technology"
                                             :label="$t('label.PFANS2003VIEW_TECHNOLOGY')"
                                             width="100"></el-table-column>
                            <el-table-column property="rn"
                                             :label="$t('label.PFANS2003FORMVIEW_RN')"
                                             width="100"></el-table-column>
                            <el-table-column property="whetherentry"
                                             :label="$t('label.PFANS2003FORMVIEW_WHETHERENTRY')"
                                             width="100"></el-table-column>
                            <el-table-column property="remarks"
                                             :label="$t('label.remarks')"
                                             width="100"></el-table-column>
                            <el-table-column
                              align="right" width="230">
                              <template slot="header" slot-scope="scope">
                                <el-input
                                  v-model="search"
                                  size="mini"
                                  placeholder="请输入姓名关键字搜索"/>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-row>
                        <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit1">{{$t('button.confirm')}}</el-button>
                        </span>
                      </div>
                    </el-dialog>
                  </el-container>
                </div>
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
                <el-input :disabled="true" style="width:20vw" v-model="form.age"></el-input>
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
            <!--            编号-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS5001FORMVIEW_NUMBERS')" prop="number">
                <el-input
                  :disabled="!disabled"
                  style="width:20vw"
                  v-model="form.number">
                </el-input>
              </el-form-item>
            </el-col>
            <!--            職務-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERVIEW_POST')" prop="post">
                <el-input
                  :disabled="!disabled"
                  style="width:20vw"
                  v-model="form.post">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第四行-->
          <el-row>
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
          </el-row>
          <!--          第五行-->
          <el-row>
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
                    <el-switch :disabled="!disabled"
                               @change="changeexits"
                               active-value="0"
                               inactive-value="1"
                               style="width:20vw"
                               v-model="form.exits"
                    ></el-switch>
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
                  prop="entrust"
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
<!--                客户-->
                <el-table-column
                  prop="deployment"
                  :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')"
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
                  prop="startdate"
                  :label="$t('label.PFANS5001FORMVIEW_STARTDATE')"
                  width="150"
                >
                </el-table-column>
<!--                结束时间-->
                <el-table-column
                  prop="enddate"
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
  import {getDictionaryInfo,getUserInfo,getCooperinterviewList,getSupplierinfor} from '../../../../utils/customize';
  import org from '../../../components/org';

  export default {
    name: 'PFANS6004FormView',
    components: {
      EasyNormalContainer,
      PFANS6004View,
      dicselect,
      org,
    },
    data() {
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
      return {
        loading: false,
        selectType: 'Single',
        title: 'title.PFANS6004VIEW',
        errorexpname: '',
        errorsuppliername: '',
        erroradmissiontime: '',
        errorexitime: '',
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
          number: '',
          post: '',
          contactinformation: '',
          age: '',
          suppliername: '',
          suppliernameid: '',
          graduateschool: '',
          education: '',
          graduation_year: '',
          technology: '',
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
          entrust: '',
          project_name: '',
          deployment: '',
          projecttype: '',
          startdate: '',
          endtime: '',
        }],
        //性别
        code1: 'BP001',
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
        //作业形态
        code20: 'BP024',
        //作业分类
        code21: 'BP025',
        result1: "",
        disabled: true,
        dialogTableVisible: false,
        dialogTableVisible1: false,
        rules: {
          // 姓名
          expname: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.user_name'),
              trigger: 'blur',
            }],
          // 職務
          post: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANSUSERVIEW_POST'),
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
              message: this.$t('normal.error_08') + this.$t('label.PFANS6001VIEW_GRADUATESCHOOL'),
              trigger: 'blur',
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
      this.getExpnameList();
      if(this.$route.params._id){
          this.selectById();
      }
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS6004Store/getexpatriatesinforApplyOne', {'expatriatesinfor_id': this.$route.params._id})
          .then(response => {
            this.form = response;
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
      getSuppliername(val) {
        this.form.suppliername = val;
        if (!this.form.suppliername || this.form.suppliername === '' || val === 'undefined') {
          this.suppliername = this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_SUPPLIERNAME');
        } else {
          this.errorsuppliername = '';
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
      changeexitreason(val) {
        this.form.exitreason = val;
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleCurrentChange1(val) {
        this.currentRow1 = val;
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
      submit1() {
        let lst = this.currentRow;
        let lst1 = this.currentRow2;
        let lst2 = this.currentRow3;
        let lst4 = this.currentRow5;
        let lst5 = this.currentRow6;
        let lst6 = this.currentRow7;
        let lst7 = this.currentRow8;
        let lst8 = this.currentRow9;
        let lst9 = this.currentRow10;
        let lst10 = this.currentRow11;
        let lst11 = this.currentRow12;
        let lst12 = this.currentRow13;
        let lst13 = this.currentRow14;
        let lst14 = this.currentRow15;
        let lst15 = this.currentRow16;
        let lst16 = this.currentRow17;
        let lst17 = this.currentRow18;

        this.dialogTableVisible1 = false;

        this.form.expname = lst;
        this.form.sex = lst1;
        this.form.contactinformation = lst2;
        this.form.age = lst4;
        this.form.suppliername = lst5;
        this.form.graduateschool = lst6;
        this.form.education = lst7;
        this.form.graduation_year = lst8;
        this.form.speciality = lst9;
        this.form.interview_date = lst10;
        this.form.result = lst11;
        this.form.technology = lst12;
        this.form.rn = lst13;
        this.form.whetherentry = lst14;
        this.form.remarks = lst15;
        this.form.cooperuserid = lst16;
        this.form.suppliernameid = lst17;
      },
      handleClickChange1(val) {
        this.currentRow = val.expname;
        this.currentRow2 = val.sex;
        this.currentRow3 = val.contactinformation;
        this.currentRow5 = val.age;
        this.currentRow6 = val.suppliername;
        this.currentRow7 = val.graduateschool;
        this.currentRow8 = val.education;
        this.currentRow9 = val.graduation_year;
        this.currentRow10 = val.speciality;
        this.currentRow11 = val.interview_date;
        this.currentRow12 = val.result;
        this.currentRow13 = val.technology;
        this.currentRow14 = val.rn;
        this.currentRow15 = val.whetherentry;
        this.currentRow16 = val.remarks;
        this.currentRow17 = val.cooperuserid;
        this.currentRow18 = val.suppliernameid;
      },
      getExpnameList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6001Store/getcooperinterview', {})
          .then(response => {
            this.gridData1 = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              if (response[i].cooperuserid !== null && response[i].cooperuserid !== '') {
                let cooperInfo = getCooperinterviewList(response[i].cooperuserid);
                if (cooperInfo) {
                  vote.expname = cooperInfo.coopername;
                }
              }
              vote.cooperuserid = response[i].cooperuserid;
              vote.sex = getDictionaryInfo(response[i].sex).value1;
              vote.contactinformation = response[i].contactinformation;
              vote.age = response[i].age;
              if (response[i].suppliernameid !== null && response[i].suppliernameid !== '') {
                let supplierInfo = getSupplierinfor(response[i].suppliernameid);
                if (supplierInfo) {
                  vote.suppliername = supplierInfo.supchinese;
                }
              }
              vote.suppliernameid = response[i].suppliernameid;
              vote.graduateschool = response[i].graduateschool;
              vote.education = getDictionaryInfo(response[i].education).value1;
              vote.graduation_year = response[i].graduation_year;
              vote.speciality = response[i].speciality;
              vote.interview_date = moment(response[i].interview_date).format('YYYY-MM-DD');
              vote.result = getDictionaryInfo(response[i].result).value1;
              vote.technology = getDictionaryInfo(response[i].technology).value1;
              vote.rn = getDictionaryInfo(response[i].rn).value1;
              vote.whetherentry = getDictionaryInfo(response[i].whetherentry).value1;
              vote.remarks = response[i].remarks;
              this.gridData1.push(vote);
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
      selectById(val) {
        this.loading = true;
        this.$store
          .dispatch('PFANS6004Store/getCompanyProject', {"SyspName":this.$route.params._name})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].entrust !== null && response[j].entrust !== "") {
                let entrust = getUserInfo(response[j].entrust);
                if (entrust != null) {
                  response[j].entrust = user.userinfo.entrust;
                }
              }
              if (response[j].project_name !== null && response[j].project_name !== "") {
                let project_name = getUserInfo(response[j].project_name);
                if (project_name) {
                  response[j].project_name = user.userinfo.customername;
                }
              }
              if (response[j].deployment !== null && response[j].deployment !== "") {
                let deployment = getUserInfo(response[j].deployment);
                if (deployment) {
                  response[j].deployment = user.userinfo.deployment;
                }
              }
              if (response[j].startdate !== null && response[j].startdate !== "") {
                response[j].startdate = moment(response[j].startdate).format("YYYY-MM-DD");
              }
              if (response[j].enddate !== null && response[j].enddate !== "") {
                response[j].enddate = moment(response[j].enddate).format("YYYY-MM-DD");
              }
              if (response[j].projecttype !== null && response[j].projecttype !== "") {
                let projecttype = getDictionaryInfo(response[j].projecttype);
                if (projecttype != null) {
                  response[j].projecttype = projecttype.value1;
                }
              }
              if (response[j].jobclassification !== null && response[j].jobclassification !== "") {
                let jobclassification = getDictionaryInfo(response[j].jobclassification);
                if (jobclassification != null) {
                  response[j].jobclassification = jobclassification.value1;
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
                .dispatch('PFANS6004Store/updateexpatriatesinforApply', this.form)
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
