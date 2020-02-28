<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-row>
            <el-col :span="22">
              <div class="sub_color_black" style="font-size: 30px ; text-align: center">
                {{$t('label.PFANS6001VIEW_INTERVIEWRECORD')}}
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.user_name')" prop="coopername">
                <el-input :disabled="!disabled" maxlength='36' style="width: 20vw"
                          v-model="form.coopername"></el-input>
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
                  style="width: 20vw"
                  v-model="form.sex">
                </dicselect>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_CONTACTINFORMATION')" prop="contactinformation">
                <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                          v-model="form.contactinformation"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_BIRTH')" prop="birth">
                <el-date-picker
                  :disabled="!disabled"
                  @change="getAge"
                  style="width: 20vw"
                  type="date"
                  v-model="form.birth">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_AGE')">
                <el-input :disabled="true" style="width: 20vw" v-model="form.age"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :error="errorsuppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                            prop="suppliername">
                <div class="dpSupIndex" style="width: 20vw" prop="suppliername">
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

          <el-row>

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_GRADUATESCHOOL')" prop="graduateschool">
                <el-input :disabled="!disabled" style="width: 20vw" v-model="form.graduateschool"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND')" prop="education">
                <dicselect
                  :code="code2"
                  :data="form.education"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="changeeducation"
                  style="width: 20vw"
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

          <el-row>

            <el-col :span="24">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_SPECIALITY')">
                <el-input :disabled="!disabled" :rows="2" style="width: 72vw" type="textarea"
                          v-model="form.speciality"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>

            <el-col :span="8">
              <el-form-item :error="errorinterviewdep" :label="$t('label.PFANS2003FORMVIEW_INTERVIEWDEP')"
                            prop="interviewdep">
                <org
                  :disabled="!disabled"
                  :orglist="form.interviewdep"
                  :error="errorinterviewdep"
                  @getOrgids="getInterviewDep"
                  orgtype="2"
                  style="width: 20vw">
                </org>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_INTERVIEWDATE')" prop="interview_date">
                <el-date-picker
                  :disabled="!disabled"
                  style="width: 20vw"
                  type="date"
                  v-model="form.interview_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">

              <el-form-item :label="$t('label.PFANS6001VIEW_RESULT')" prop="result">
                <dicselect
                  :code="code3"
                  :data="form.result"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="changeresult"
                  style="width: 20vw"
                  v-model="form.result">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003VIEW_TECHNOLOGY')" prop="technology">
                <dicselect
                  :code="code5"
                  :data="form.technology"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="changetechnology"
                  style="width: 20vw">
                </dicselect>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_RN')" prop="rn">
                <dicselect
                  :code="code4"
                  :data="form.rn"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="changern"
                  style="width: 20vw">
                </dicselect>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_WHETHERENTRY')" prop="whetherentry">
                <dicselect
                  :code="code6"
                  :data="form.whetherentry"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="changewhetherentry"
                  style="width: 20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>

            <el-col :span="24">
              <el-form-item :label="$t('label.remarks')">
                <el-input :disabled="!disabled" :rows="2" style="width: 72vw" type="textarea"
                          v-model="form.remarks"></el-input>
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
  import PFANS6001View from '../PFANS6001/PFANS6001View.vue';
  import dicselect from '../../../components/dicselect.vue';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import org from '../../../components/org';
  import {isvalidPhone} from '@/utils/validate';
  import {getSupplierinfor} from '@/utils/customize';


  export default {
    name: 'PFANS6001FormView',
    components: {
      EasyNormalContainer,
      PFANS6001View,
      dicselect,
      org,
    },
    data() {
      var validateTel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANSUSERFORMVIEW_TRUEMOBILE')));
        } else if (!isvalidPhone(value)) {
          callback(new Error(this.$t('label.PFANSUSERFORMVIEW_EFFECTIVEMOBILE')));
        } else {
          callback();
        }
        ;
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
      var checkinterview_date = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.errorinterviewdep = this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP')));
        } else {
          this.errorinterviewdep = '';
          return callback();
        }
      };
      return {
        loading: false,
        selectType: 'Single',
        title: 'title.PFANS6001VIEW',
        errorinterviewdep: '',
        errorsuppliername: '',
        disabled: false,
        buttonList: [],
        multiple: false,
        search: '',
        gridData: [],
        form: {
          cooperinterview_id: '',
          coopername: '',
          sex: '',
          contactinformation: '',
          birth: '',
          age: '',
          suppliername: '',
          suppliernameid: '',
          graduateschool: '',
          education: '',
          graduation_year: '',
          speciality: '',
          interviewdep: '',
          interview_date: moment(new Date()).format('YYYY-MM-DD'),
          result: '',
          technology: '',
          rn: '',
          whetherentry: '',
          remarks: '',
        },

        code1: 'BP001',

        code2: 'PR022',

        code3: 'BP003',

        code4: 'PR021',

        code5: 'BP005',

        code6: 'BP006',
        disabled: true,
        dialogTableVisible: false,

        rules: {

          coopername: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.user_name'),
              trigger: 'blur',
            }],

          sex: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.sex'),
              trigger: 'change',
            },
          ],

          contactinformation: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS6001VIEW_CONTACTINFORMATION'),
              trigger: 'blur',
            },
            {validator: validateTel, trigger: 'blur'}],

          birth: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_BIRTH'),
              trigger: 'change',
            },
          ],

          suppliername: [
            {
              required: true,
              validator: checksuppliername,
              trigger: 'change',
            },
          ],

          graduateschool: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS6001VIEW_GRADUATESCHOOL'),
              trigger: 'blur',
            }],

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

          interviewdep: [
            {
              required: true,
              validator: checkinterview_date,
              trigger: 'change',
            },
          ],

          interview_date: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE'),
              trigger: 'change',
            },
          ],

          result: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_RESULT'),
              trigger: 'change',
            },
          ],

          technology: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2003VIEW_TECHNOLOGY'),
              trigger: 'change',
            },
          ],

          rn: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_RN'),
              trigger: 'change',
            },
          ],

          whetherentry: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_WHETHERENTRY'),
              trigger: 'change',
            },
          ],
        },
      };
    },
    mounted() {
      this.getSupplierNameList();
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS6001Store/getcooperinterviewApplyOne', {'cooperinterview_id': this.$route.params._id})
          .then(response => {
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
    },
    methods: {
      getInterviewDep(val) {
        this.form.interviewdep = val;
        if (!this.form.interviewdep || this.form.interviewdep === '' || val === 'undefined') {
          this.errorinterviewdep = this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP');
        } else {
          this.errorinterviewdep = '';
        }
      },
      getSuppliername(val) {
        this.form.suppliername = val;
        if (!this.form.suppliername || this.form.suppliername === '' || val === 'undefined') {
          this.errorsuppliername = this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_SUPPLIERNAME');
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
      changeresult(val) {
        this.form.result = val;
      },
      changetechnology(val) {
        this.form.technology = val;
      },
      changern(val) {
        this.form.rn = val;
      },
      changewhetherentry(val) {
        this.form.whetherentry = val;
      },
      handleCurrentChange(val) {
        this.currentRow = val;
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
      submit() {
        let val = this.currentRow;
        let val1 = this.currentRow1;
        this.dialogTableVisible = false;
        this.form.suppliername = val;
        this.form.suppliernameid = val1;
      },
      handleClickChange(val) {
        this.currentRow = val.suppliername;
        this.currentRow1 = val.suppliernameid;
      },
      getSupplierNameList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6001Store/getSupplierNameList', {})
          .then(response => {
            this.gridData = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              if (response[i].supplierinfor_id !== null && response[i].supplierinfor_id !== "") {
                let supplierInfo = getSupplierinfor(response[i].supplierinfor_id);
                if (supplierInfo) {
                  vote.suppliername = supplierInfo.supchinese;
                }
              }
              vote.userid = response[i].prochinese;
              vote.contactinformation = response[i].protelephone;
              vote.suppliernameid = response[i].supplierinfor_id;
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
            this.form.cooperinterview_id = this.$route.params._id;
            this.form.birth = moment(this.form.birth).format('YYYY-MM-DD');
            this.form.interview_date = moment(this.form.interview_date).format('YYYY-MM-DD');
            this.loading = true;
            if (this.$route.params._id) {
              this.$store
                .dispatch('PFANS6001Store/updatecooperinterviewApply', this.form)
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
              this.form.interview_date = moment(this.form.interview_date).format('YYYY-MM-DD');
              this.loading = true;
              this.$store
                .dispatch('PFANS6001Store/createcooperinterviewApply', this.form)
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
