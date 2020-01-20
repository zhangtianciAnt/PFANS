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
                            :span-method="arraySpanMethod" @row-click="handleClickChange1">
                            <el-table-column property="expname" :label="$t('label.user_name')"
                                             width="100"></el-table-column>
                            <el-table-column property="se" :label="$t('label.sex')"
                                             width="100"></el-table-column>
                            <el-table-column property="contactinforma"
                                             :label="$t('label.PFANS6001VIEW_CONTACTINFORMATION')"
                                             width="150"></el-table-column>
                            <el-table-column property="birth"
                                             :label="$t('label.PFANS6001VIEW_BIRTH')"
                                             width="100"></el-table-column>
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
                            <!--                            <el-table-column property="interviewdep"-->
                            <!--                                             :label="$t('label.PFANS2003FORMVIEW_INTERVIEWDEP')"-->
                            <!--                                             width="100"></el-table-column>-->
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
            <!--            供应商名称-->
            <el-col :span="8">
              <el-form-item :error="errorsuppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                            prop="suppliername">
                <div class="dpSupIndex" style="width:20vw" prop="suppliername">
                  <el-container>
                    <input class="content bg" v-model="form.suppliername" :error="errorsuppliername"
                           :disabled="true"></input>
                    <el-button :disabled="!disabled" icon="el-icon-search" @click="dialogTableVisible = true"
                               size="small"></el-button>
                    <el-dialog :title="$t('title.PFANS6003VIEW')" :visible.sync="dialogTableVisible" center size="50%"
                               top="8vh" lock-scroll
                               append-to-body>
                      <div style="text-align: center">
                        <el-row style="text-align: center;height: 90%;overflow: hidden">
                          <el-table
                            :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                            height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                            :span-method="arraySpanMethod" @row-click="handleClickChange">
                            <el-table-column property="suppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                             width="150"></el-table-column>
                            <el-table-column property="userid" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')"
                                             width="100"></el-table-column>
                            <el-table-column property="contactinformation"
                                             :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')"
                                             width="150"></el-table-column>
                            <el-table-column
                              align="right" width="230">
                              <template slot="header" slot-scope="scope">
                                <el-input
                                  v-model="search"
                                  size="mini"
                                  placeholder="请输入供应商关键字搜索"/>
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
          </el-row>
          <!--            第二行-->
          <el-row>
            <!--            出生日期-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_BIRTH')" prop="birth">
                <el-date-picker
                  :disabled="true"
                  @change="getAge"
                  style="width:20vw"
                  type="date"
                  v-model="form.birth">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!--            年龄-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_AGE')">
                <el-input :disabled="true" style="width:20vw" v-model="form.age"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            第三行-->
          <el-row>
            <!--            毕业院校-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_GRADUATESCHOOL')" prop="graduateschool">
                <el-input :disabled="true" style="width:20vw" v-model="form.graduateschool"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--            学历-->
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
            <el-col :span="8">
              <!--           卒业年-->
              <el-form-item :label="$t('label.PFANS2024VIEW_GRADUATIONYEAR')" prop="graduation_year">
                <el-date-picker
                  :disabled="!disabled"
                  style="width:20vw"
                  type="year"
                  v-model="form.graduation_year">
                </el-date-picker>
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
                  :code="code5"
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
                  :code="code5"
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
              <el-form-item :label="$t('label.PFANS6004FORMVIEW_ADMISSIONTIME')" prop="admissiontime">
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
                  <el-form-item :label="$t('label.PFANS6004FORMVIEW_EXITIME')" prop="exitime" v-show="show">
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
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS6004VIEW_PROJECTINFORMATION')}}</span>
              </template>
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
  import {getDictionaryInfo} from '../../../../utils/customize';
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
      return {
        loading: false,
        selectType: 'Single',
        title: 'title.PFANS6004VIEW',
        errorexpname: '',
        errorsuppliername: '',
        disabled: false,
        buttonList: [],
        multiple: false,
        search: '',
        gridData: [],
        gridData1: [],
        form: {
          expatriatesinfor_id: '',
          expname: '',
          sex: '',
          contactinformation: '',
          birth: moment(new Date()).format('YYYY-MM-DD'),
          age: '',
          suppliername: '',
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
          // 性别
          sex: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.sex'),
              trigger: 'change',
            },
          ],
          // 出生日期
          birth: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_BIRTH'),
              trigger: 'change',
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
              trigger: 'blur',
            },
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
              trigger: 'blur',
            },
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
      this.getSupplierNameList();
      this.getExpnameList();
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
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 3) {
          return [1, 2];
        }
      },

      getAge() {
        let birthdays = new Date(this.form.birth);
        let d = new Date();
        let ageD =
          d.getFullYear() -
          birthdays.getFullYear();
        this.form.age = ageD;
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
        let lst1=this.currentRow2;
        let lst2=this.currentRow3;
        let lst3=this.currentRow4;
        let lst4=this.currentRow5;
        let lst5=this.currentRow6;
        let lst6=this.currentRow7;
        let lst7=this.currentRow8;
        this.dialogTableVisible1 = false;
        this.form.expname = lst;
        this.form.sex=lst1;
        this.form.birth=lst2;
        this.form.age=lst3;
        this.form.graduateschool=lst4;
        this.form.education=lst5;
        this.form.technology=lst6;
        this.form.rn=lst7;
      },
      handleClickChange1(val) {
        this.currentRow = val.expname;
        this.currentRow2=val.se;
        this.currentRow3=val.birth;
        this.currentRow4=val.age;
        this.currentRow5=val.graduateschool;
        this.currentRow6=val.education;
        this.currentRow7=val.technology;
        this.currentRow8=val.rn;
      },
      submit() {
        let val = this.currentRow;
        this.dialogTableVisible = false;
        this.form.suppliername = val;
      },
      handleClickChange(val) {
        this.currentRow = val.suppliername;
      },
      getExpnameList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6004Store/getExpnameList', {})
          .then(response => {
            this.gridData1 = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              vote.expname = response[i].coopername;
              vote.se = getDictionaryInfo(response[i].sex).value1;
              vote.contactinforma = response[i].contactinformation;
              vote.birth=moment(response[i].birth).format('YYYY-MM-DD');
              vote.age = response[i].age;
              vote.suppliername = response[i].suppliername;
              vote.graduateschool = response[i].graduateschool;
              vote.education = getDictionaryInfo(response[i].education).value1;
              vote.speciality = response[i].speciality;
              // vote.interviewdep = response[i].interviewdep;
              vote.interview_date=moment(response[i].interview_date).format('YYYY-MM-DD');
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
      getSupplierNameList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6001Store/getSupplierNameList', {})
          .then(response => {
            this.gridData = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              vote.suppliername = response[i].supchinese;
              vote.userid = response[i].prochinese;
              vote.contactinformation = response[i].protelephone;
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
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.form.expatriatesinfor_id = this.$route.params._id;
            this.form.birth = moment(this.form.birth).format('YYYY-MM-DD');
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
              this.form.birth = moment(this.form.birth).format('YYYY-MM-DD');
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
    },
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
