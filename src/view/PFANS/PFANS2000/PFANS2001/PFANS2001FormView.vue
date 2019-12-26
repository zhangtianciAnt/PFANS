<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading" :buttonList="buttonList"
                         @workflowState="workflowState" :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" label-width="8rem" label-position="left" style="padding: 2rem" :rules="rules"
                 ref="refform">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS2001VIEW_BASICINFORMATION')" name="first">
              <el-row>
            <el-col :span="8">
              <el-form-item :error="errorcenter"  :label="$t('label.center')"  prop="center_id">
                <org  :orglist="centerorglist" :error="errorcenter" orgtype="1" :disabled="!disabled" style="width: 9rem" @getOrgids="getCenterId"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorgroup" :label="$t('label.group')" prop="group_id" >
                <org  :orglist="grouporglist" orgtype="2" :disabled="!disabled" :error="errorgroup" style="width: 9rem" @getOrgids="getGroupId"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <org  :orglist="teamorglist" orgtype="3" :disabled="!disabled" style="width: 9rem" @getOrgids="getTeamId"></org>
              </el-form-item>
            </el-col>
              </el-row>
              <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2001VIEW_POSITIONTITLE')" prop="postname">
                <el-input v-model="form.postname" :disabled="!disabled" style="width: 11rem" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2001VIEW_PEOPLEREQUIRED')" prop="peoplerequired">
                <el-input v-model="form.peoplerequired" :disabled="!disabled" style="width: 11rem" maxlength='5'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2001VIEW_WORKPLACE')" prop="workplace">
                <el-input v-model="form.workplace" :disabled="!disabled" style="width: 11rem" maxlength='50'></el-input>
              </el-form-item>
            </el-col>
              </el-row>
              <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="applicationtime" >
                <el-date-picker :disabled="!disabled" type="date" v-model="form.applicationtime" style="width: 11rem" ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_VIEWPROJECT')" style="width: 19rem" prop="viewproject">
                    <el-select v-model="form.viewproject" :disabled="!disabled">
                      <el-option
                        v-for="item in optionsdata"
                        :key="item.value"
                        :label="item.lable"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
            </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_RECRUITMENTROUTE')" prop="recruitmentroute" >
                    <dicselect
                      :code="code"
                      :data="form.recruitmentroute"
                      :multiple="multiple"
                      @change="getRecruitmentroute"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_OTHERWAYS')" v-show="show1">
                  <el-input v-model="form.other" :disabled="!disabled" style="width: 11rem" maxlength='20'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_JOBDEMAND')" prop="jobdemand" >
                    <dicselect
                      :code="code1"
                      :data="form.jobdemand"
                      :multiple="multiple"
                      @change="getJobdemand"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_NEEDTOTRAVEL')" prop="needtotravel" >
                    <dicselect
                      :code="code2"
                      :data="form.needtotravel"
                      :multiple="multiple"
                      @change="getNeedtotravel"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_DEMANDLEVEL')" prop="demandlevel" >
                    <dicselect
                      :code="code3"
                      :data="form.demandlevel"
                      :multiple="multiple"
                      @change="getDemandlevel"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2001VIEW_EXPECTEDARRIVALTIME')" prop="expectedarrivaltime">
                <el-date-picker :disabled="!disabled" type="date" v-model="form.expectedarrivaltime" style="width: 11rem" ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2001VIEW_SUGGESTEDSALARY')">
                <el-input-number v-model="form.suggestedsalary" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_TURNINGDAY')" prop="turningday">
                    <el-date-picker :disabled="!disabled" type="date" v-model="form.turningday" style="width: 11rem" ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_AFTERTURNINGPOSITIVE')">
                    <el-input-number v-model="form.afterturningpositiv" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_SKILLLEVEL')">
                    <el-input v-model="form.skilllevel" :disabled="!disabled" style="width: 11rem" maxlength='20'></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2001VIEW_JOBREQUIREMENTS')" name="second">
              <el-row>
              <el-col :span="24">
                  <div class="sub_color_blue" >{{$t('label.PFANS2001VIEW_QUALIFICATIONS')}}</div>
              </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_GENDERREQUIREMENTS')" prop="genderrequirements">
                    <dicselect
                      :code="code4"
                      :data="form.genderrequirements"
                      :multiple="multiple"
                      @change="getGenderrequirements"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_AGEREQUIREMENT')"  prop="agerequirement">
                    <el-input v-model="form.agerequirement" :disabled="!disabled" style="width: 11rem" maxlength='20'></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_REQUIREMENTS')" prop="requirements" >
                    <dicselect
                      :code="code5"
                      :data="form.requirements"
                      :multiple="multiple"
                      @change="getRequirements"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_OTHERQUALIFICATIONS')" v-show="show2">
                    <el-input v-model="form.postother" :disabled="!disabled" style="width: 11rem" maxlength='20'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_PROFESSIONAL')" prop="professional" >
                    <el-input v-model="form.professional" :disabled="!disabled" style="width: 11rem"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_EXPERIENCE')" prop="experience" >
                    <el-input v-model="form.experience" :disabled="!disabled" style="width: 11rem"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_OTHERREQUIREMENTS')" label-width="6rem" prop="otherrequirements">
                    <el-input v-model="form.otherrequirements" type="textarea" :disabled="!disabled" style="width: 34.3rem;padding-left:2rem"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="sub_color_blue" >{{$t('label.PFANS2001VIEW_RESPONSIBILITIES')}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-input v-model="form.responsibilities" type="textarea" :disabled="!disabled" style="width: 34.3rem;padding-left:8rem"></el-input>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import PFANS2001View from "../PFANS2001/PFANS2001View.vue";
    import dicselect from "../../../components/dicselect.vue";
    import user from "../../../components/user.vue";
    import { Message } from 'element-ui'
    import {getOrgInfoByUserId} from '@/utils/customize';
    import moment from "moment";
    import org from "../../../components/org";

    export default {
        name: 'PFANS2001FormView',
        components: {
            EasyNormalContainer,
            PFANS2001View,
            getOrgInfoByUserId,
            dicselect,
            user,
            org
        },
        data() {
          var checkcenter = (rule, value, callback) => {
                if(!value || value === ''){
                    this.errorcenter = this.$t('normal.error_09') + this.$t('label.center');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.center')));
                }else{
                    this.errorcenter = "";
                    return callback();
                }

            };
          var checkgroup = (rule, value, callback) => {
            if(!value || value === ''){
              this.errorgroup = this.$t('normal.error_09') + this.$t('label.group');
              return callback(new Error(this.$t('normal.error_09') + this.$t('label.group')));
            }else{
              this.errorgroup = "";
              return callback();
            }

          };
            return {
                centerorglist: '',
                grouporglist: '',
                teamorglist: '',
                optionsdata: [],
                loading: false,
                errorcenter: '',
                errorgroup: '',
                activeName: 'first',
                checked: true,
                selectType: "Single",
                title: "title.PFANS2001VIEW",
                buttonList: [],
                tabIndex: 0,
                multiple: false,
                form: {
                    recruitid: '',
                    postname: '',
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    experience: '',
                    project_name: '',
                    peoplerequired: '',
                    workplace: '',
                    applicationtime: moment(new Date()).format("YYYY-MM-DD"),
                    viewproject: '',
                    recruitmentroute:'',
                    other:'',
                    jobdemand: '',
                    needtotravel: '',
                    demandlevel: '',
                    suggestedsalary: '',
                    turningday: moment(new Date()).format("YYYY-MM-DD"),
                    afterturningpositiv: '',
                    expectedarrivaltime: moment(new Date()).format("YYYY-MM-DD"),
                    skilllevel: '',
                    genderrequirements: '',
                    postother: '',
                    agerequirement: '',
                    requirements: '',
                    professional: '',
                    otherrequirements: '',
                    responsibilities: '',
                },
                code: 'PR027',
                code1: 'PR028',
                code2: 'PR029',
                code3: 'PR030',
                code4: 'PR031',
                code5: 'PR032',
                disabled: true,
                menuList: [],
                rules: {
                  viewproject: [
                    {
                      required: true,
                      message: this.$t('normal.error_09') + this.$t('label.PFANS2001VIEW_VIEWPROJECT'),
                      trigger: 'change'
                    },
                  ],
                  center_id: [
                    {
                      required: true,
                      validator: checkcenter,
                      trigger: 'change'
                    },
                  ],
                  group_id: [
                    {
                      required: true,
                      validator: checkgroup,
                      trigger: 'change'
                    },
                  ],
                  postname: [
                    {
                      required: true,
                      message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_POSITIONTITLE'),
                      trigger: 'change'
                    },
                  ],
                  peoplerequired: [
                    {
                      required: true,
                      message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_PEOPLEREQUIRED'),
                      trigger: 'change'
                    },
                  ],
                  workplace: [
                    {
                      required: true,
                      message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_WORKPLACE'),
                      trigger: 'change'
                    },
                  ],
                  applicationtime: [
                    {
                      required: true,
                      message: this.$t('normal.error_09') + this.$t('label.application_date'),
                      trigger: 'change'
                    },
                  ],
                  genderrequirements: [
                    {
                      required: true,
                      message: this.$t('normal.error_09') + this.$t('label.PFANS2001VIEW_GENDERREQUIREMENTS'),
                      trigger: 'change'
                    },
                  ],
                  agerequirement: [
                    {
                      required: true,
                      message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_AGEREQUIREMENT'),
                      trigger: 'change'
                    },
                  ],
                  requirements: [
                    {
                      required: true,
                      message: this.$t('normal.error_09') + this.$t('label.PFANS2001VIEW_REQUIREMENTS'),
                      trigger: 'change'
                    },
                  ],
                  professional: [
                    {
                      required: true,
                      message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_PROFESSIONAL'),
                      trigger: 'change'
                    },
                  ],
                  experience: [
                    {
                      required: true,
                      message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_EXPERIENCE'),
                      trigger: 'change'
                    },
                  ],
                  otherrequirements: [
                    {
                      required: true,
                      message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_OTHERREQUIREMENTS'),
                      trigger: 'change'
                    },
                  ],
                },
                show1: false,
                show2: false,
                canStart:false,
            };
        },
        mounted() {
          this.getCompanyProjectList();
          this.loading = true;
            if (this.$route.params._id) {
                this.$store
                    .dispatch('PFANS2001Store/getRecruitOne', {"recruitid": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        this.centerorglist = this.form.center_id;
                        this.grouporglist = this.form.group_id;
                        this.teamorglist = this.form.team_id;
                      if (this.form.recruitmentroute === 'PR027004') {
                        this.show1 = true;
                      }
                      if (this.form.requirements === 'PR032005') {
                        this.show2 = true;
                      }
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
          getCenterId(val) {
            this.form.center_id = val;
            this.centerorglist = val;
            if (!this.form.center_id || this.form.center_id === '' || val === "undefined") {
              this.errorcenter = this.$t('normal.error_09') + this.$t('label.center');
            } else {
              this.errorcenter = "";
            }
          },
          getGroupId(val) {
            this.form.group_id = val;
            this.grouporglist = val;
            if (!this.form.group_id || this.form.group_id === '' || val === "undefined") {
              this.errorgroup = this.$t('normal.error_09') + this.$t('label.group');
            } else {
              this.errorgroup = "";
            }
          },
          getTeamId(val) {
            this.form.team_id = val;
            this.teamorglist = val;
          },
          getRecruitmentroute(val) {
            this.form.recruitmentroute = val;
            if (val === "PR027004") {
              this.show1 = true;
            }else if (val === "PR027001") {
              this.show1 = false;
            }else if (val === "PR027002") {
              this.show1 = false;
            }else if (val === "PR027003") {
              this.show1 = false;
            }
          },
          getJobdemand(val) {
            this.form.jobdemand = val;
          },
          getNeedtotravel(val) {
            this.form.needtotravel = val;
          },
          getDemandlevel(val) {
            this.form.demandlevel = val;
          },
          getGenderrequirements(val) {
            this.form.genderrequirements = val;
          },
          getRequirements(val) {
            this.form.requirements = val;
            if (val === "PR032005") {
              this.show2 = true;
            }if (val === "PR032001") {
              this.show2 = false;
            }else if (val === "PR032002") {
              this.show2 = false;
            }else if (val === "PR032003") {
              this.show2 = false;
            }else if (val === "PR032004") {
              this.show2 = false;
            }
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
            getCompanyProjectList() {
              this.loading = true;
              this.$store
                .dispatch('PFANS2001Store/getCompanyProjectList', {})
                .then(response => {
                  this.optionsdata = [];
                  for (let i = 0; i < response.length; i++) {
                    var vote = {};
                    vote.value = response[i].companyprojects_id;
                      vote.lable = response[i].project_name;
                      this.optionsdata.push(vote)
                  }
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
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                        if (this.$route.params._id) {
                            this.form.recruitid = this.$route.params._id;
                            this.form.center_id = this.centerorglist;
                            this.form.group_id = this.grouporglist;
                            this.form.team_id = this.teamorglist;
                            this.form.applicationtime = moment(this.form.applicationtime).format('YYYY-MM-DD');
                            this.form.turningday = moment(this.form.turningday).format('YYYY-MM-DD');
                            this.form.expectedarrivaltime = moment(this.form.expectedarrivaltime).format('YYYY-MM-DD');
                            this.loading = true;
                            this.$store
                              .dispatch('PFANS2001Store/updateRecruit', this.form)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    if(val !== "update") {
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

                        } else{
                            this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
                            this.form.turningday = moment(this.form.turningday).format('YYYY-MM-DD');
                            this.form.expectedarrivaltime = moment(this.form.expectedarrivaltime).format('YYYY-MM-DD');
                            this.$store
                                .dispatch('PFANS2001Store/createRecruit', this.form)
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
                });
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  .width {
    width: 13rem;
  }

  .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td{
    color: blue;
  }
</style>
