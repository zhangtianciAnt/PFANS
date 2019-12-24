<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" @end="end"
                         @start="start"
                         @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding: 2rem">
          <el-row>
            <el-col :span="10">
              <div class="sub_color_black">{{$t('label.PFANS6001VIEW_INTERVIEWRECORD')}}</div>
            </el-col>
          </el-row>
          <!--            第一行-->
          <el-row>
            <!--            姓名-->
            <el-col :span="8">
              <el-form-item :label="$t('label.user_name')" prop="coopername">
                <el-input :disabled="disabled" maxlength='36' style="width: 11rem" v-model="form.coopername"></el-input>
              </el-form-item>
            </el-col>
            <!--            性别-->
            <el-col :span="8">
              <el-form-item :label="$t('label.sex')" prop="sex">
                <dicselect
                  :code="code1"
                  :data="form.sex"
                  :disabled="disabled"
                  :multiple="multiple"
                  @change="changesex"
                  style="width: 11rem"
                  v-model="form.sex">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            联系方式-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_CONTACTINFORMATION')" prop="contactinformation">
                <el-input :disabled="disabled" maxlength='36' style="width: 11rem"
                          v-model="form.contactinformation"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            第二行-->
          <el-row>
            <!--            出生日期-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_BIRTH')" prop="birth">
                <el-date-picker
                  :disabled="disabled"
                  @change="getAge"
                  style="width: 11rem"
                  type="date"
                  v-model="form.birth">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!--            年龄-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_AGE')">
                <el-input :disabled="true" maxlength='36' style="width: 11rem" v-model="form.age"></el-input>
              </el-form-item>
            </el-col>
            <!--            供应商名称-->
            <el-col :span="8">
              <el-form-item :error="errorsuppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                            prop="suppliername">
                <org
                  :disabled="disabled"
                  :orglist="form.suppliername"
                  :error="errorsuppliername"
                  @getOrgids="getSuppliername"
                  orgtype="2"
                  style="width: 8.9rem">
                </org>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            第三行-->
          <el-row>
            <!--            毕业院校-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_GRADUATESCHOOL')" prop="graduateschool">
                <el-input :disabled="disabled" style="width: 11rem" v-model="form.graduateschool"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--            学历-->
              <el-form-item :label="$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND')" prop="education">
                <dicselect
                  :code="code2"
                  :data="form.education"
                  :disabled="disabled"
                  :multiple="multiple"
                  @change="changeeducation"
                  style="width: 11rem"
                  v-model="form.education">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第四行-->
          <el-row>
            <!--        经验特长-->
            <el-col :span="24">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_SPECIALITY')">
                <el-input :disabled="disabled" :rows="2" style="width: 93%" type="textarea"
                          v-model="form.speciality"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第五行-->
          <el-row>
            <!--            面试部门-->
            <el-col :span="8">
              <el-form-item :error="errorinterviewdep" :label="$t('label.PFANS2003FORMVIEW_INTERVIEWDEP')"
                            prop="interviewdep">
                <org
                  :disabled="disabled"
                  :orglist="form.interviewdep"
                  :error="errorinterviewdep"
                  @getOrgids="getInterviewDep"
                  orgtype="2"
                  style="width: 8.9rem">
                </org>
              </el-form-item>
            </el-col>
            <!--            面试时间-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_INTERVIEWDATE')" prop="interview_date">
                <el-date-picker
                  :disabled="disabled"
                  style="width:11rem"
                  type="date"
                  v-model="form.interview_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--            面试结果-->
              <el-form-item :label="$t('label.PFANS6001VIEW_RESULT')" prop="result">
                <dicselect
                  :code="code3"
                  :data="form.result"
                  :disabled="disabled"
                  :multiple="multiple"
                  @change="changeresult"
                  style="width: 11rem"
                  v-model="form.result">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第六行-->
          <el-row>
            <!--            技术分类-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003VIEW_TECHNOLOGY')" prop="technology">
                <dicselect
                  :code="code5"
                  :data="form.technology"
                  :disabled="disabled"
                  :multiple="multiple"
                  @change="changetechnology"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            Rn-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_RN')" prop="rn">
                <dicselect
                  :code="code4"
                  :data="form.rn"
                  :disabled="disabled"
                  :multiple="multiple"
                  @change="changern"
                  style="
                  width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            入职与否-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_WHETHERENTRY')" prop="whetherentry">
                <dicselect
                  :code="code6"
                  :data="form.whetherentry"
                  :disabled="disabled"
                  :multiple="multiple"
                  @change="changewhetherentry"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第七行-->
          <el-row>
            <!--            备注-->
            <el-col :span="24">
              <el-form-item :label="$t('label.remarks')">
                <el-input :disabled="disabled" :rows="2" style="width: 93% ; height: 10px" type="textarea"
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
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import PFANS6001View from "../PFANS6001/PFANS6001View.vue";
    import dicselect from "../../../components/dicselect.vue";
    import {Message} from 'element-ui';
    import moment from "moment";
    import org from '../../../components/org';
    import {telephoneNumber} from '@/utils/validate';

    export default {
        name: 'PFANS6001FormView',
        components: {
            EasyNormalContainer,
            PFANS6001View,
            dicselect,
            org
        },
        data() {
            var validateTel = (rule, value, callback) => {
                if (this.form.contactinformation !== null && this.form.contactinformation !== '') {
                    if (telephoneNumber(value)) {
                        callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS6001VIEW_CONTACTINFORMATION')));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                selectType: "Single",
                title: "title.PFANS6001VIEW",
                errorinterviewdep: '',
                errorsuppliername: '',
                buttonList: [],
                multiple: false,
                form: {
                    cooperinterview_id: '',
                    type: this.$t('menu.PFANS6001'),
                    coopername: '',
                    sex: '',
                    contactinformation: '',
                    birth: '',
                    age: '',
                    suppliername: '',
                    graduateschool: '',
                    education: '',
                    speciality: '',
                    interviewdep: '',
                    interview_date: moment(new Date()).format("YYYY-MM-DD"),
                    result: '',
                    technology: '',
                    rn: '',
                    whetherentry: '',
                    remarks: '',
                },
                //性别
                code1: 'BP001',
                //学历
                code2: 'BP002',
                // 面试结果
                code3: 'BP003',
                //Rn
                code4: 'BP004',
                //技术分类
                code5: 'BP005',
                //入职与否
                code6: 'BP006',
                rules: {
                    // 姓名
                    coopername: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.user_name'),
                            trigger: 'blur'
                        }],
                    // 性别
                    sex: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.sex'),
                            trigger: 'change'
                        },
                    ],
                    // 联系方式
                    contactinformation: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS6001VIEW_CONTACTINFORMATION'),
                            trigger: 'blur'
                        },
                        {validator: validateTel, trigger: 'blur'}],
                    // 出生日期
                    birth: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_BIRTH'),
                            trigger: 'change'
                        },
                    ],
                    // 供应商名称
                    suppliername: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_SUPPLIERNAME'),
                            trigger: 'change'
                        },
                    ],
                    // 毕业院校
                    graduateschool: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS6001VIEW_GRADUATESCHOOL'),
                            trigger: 'blur'
                        }],
                    // 学历
                    education: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND'),
                            trigger: 'change'
                        },
                    ],
                    // 面试部门
                    education: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP'),
                            trigger: 'change'
                        },
                    ],
                    // 面试时间
                    interview_date: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE'),
                            trigger: 'change'
                        },
                    ],
                    // 面试结果
                    result: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_RESULT'),
                            trigger: 'change'
                        },
                    ],
                    // 技术分类
                    technology: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2003VIEW_TECHNOLOGY'),
                            trigger: 'change'
                        },
                    ],
                    // Rn
                    rn: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_RN'),
                            trigger: 'change'
                        },
                    ],
                    // 入职与否
                    whetherentry: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_WHETHERENTRY'),
                            trigger: 'change'
                        },
                    ],
                },
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS6001Store/cooperinterviewApplyOne', {"cooperinterview_id": this.$route.params._id})
                    .then(response => {
                        this.form = response;
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
            }
        },
        created() {
            this.disabled = this.$route.params.disabled;
            if (this.disabled) {
                this.buttonList = [
                    {
                        key: "save",
                        name: "button.save",
                        disabled: false,
                        icon: "el-icon-check"
                    }
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
            getAge() {
                let birthdays = new Date(this.form.birth);
                let d = new Date();
                let ageD =
                    d.getFullYear() -
                    birthdays.getFullYear()
                this.form.age = ageD;
            },
            buttonClick(val) {
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                        this.form.cooperinterview_id = this.$route.params._id;
                        this.form.birth = moment(this.form.birth).format('YYYY-MM-DD');
                        this.form.interview_date = moment(this.form.interview_date).format('YYYY-MM-DD');
                        this.loading = true;
                        if (this.$route.params._id) {
                            this.$store
                                .dispatch('PFANS6002Store/updatecooperinterviewApply', this.form)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    if (val !== "update") {
                                        Message({
                                            message: this.$t("normal.success_02"),
                                            type: 'success',
                                            duration: 5 * 1000
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
                                        duration: 5 * 1000
                                    });
                                    this.loading = false;
                                })
                        } else {
                            this.form.birth = moment(this.form.birth).format('YYYY-MM-DD');
                            this.form.interview_date = moment(this.form.interview_date).format('YYYY-MM-DD');
                            this.loading = true;
                            this.$store
                                .dispatch('PFANS6002Store/createcooperinterviewApply', this.form)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    Message({
                                        message: this.$t("normal.success_01"),
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
                                })
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
