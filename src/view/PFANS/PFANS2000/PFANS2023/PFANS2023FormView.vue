<template>
  <div>
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" :workflowCode="aaaaaa"
                         @buttonClick="buttonClick" @end="end" @start="start" @workflowState="workflowState"
                         ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS2023FORMVIEW_INTELLIGENCE')" name="first">
              <div>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.center')">
                        <el-input :disabled="true" style="width: 11rem" v-model="form.center_id"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.group')">
                        <el-input :disabled="true" style="width:11rem" v-model="form.group_id"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.team')">
                        <el-input :disabled="true" style="width: 11rem" v-model="form.team_id"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="ruleForm">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :error="error" :label="$t('label.user_name')" prop="user_id">
                        <user :disabled="!disable" :error="error" :selectType="selectType"
                              :userlist="userlist" @getUserids="getUserids" style="width:10.1rem"></user>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_SKILL_RANK')" prop="skill_rank">
                        <dicselect
                          :code="code"
                          :data="form.skill_rank"
                          :disabled="!disable"
                          :multiple="multiple"
                          @change="getErrorType"
                          style="width:11rem">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS2023FORMVIEW_ROLE')" prop="role">
                      <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                maxlength="50" style="width: 57.8rem" type="textarea" v-model="form.role"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2023FORMVIEW_TARGETGOALSYEAR')" name="second">
              <div>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_SPECIFICGOALSYEAR')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disableyear"
                                  maxlength="50" style="width: 55rem" type="textarea"
                                  v-model="form.specific_goals_year1"></el-input>
                        <div style="margin: 2rem 0;"></div>
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disableyear"
                                  maxlength="50" style="width: 55rem" type="textarea"
                                  v-model="form.specific_goals_year2"></el-input>
                        <div style="margin: 2rem 0;"></div>
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disableyear"
                                  maxlength="50" style="width: 55rem" type="textarea"
                                  v-model="form.specific_goals_year3"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_YOUROWNGOALSYEAR')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disableyear"
                                  maxlength="50" style="width: 55rem" type="textarea"
                                  v-model="form.your_own_goals_year"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_INTERVIEWRESULTSYEAR')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disableyear"
                                  maxlength="50" style="width: 55rem" type="textarea"
                                  v-model="form.interview_results_year"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2023FORMVIEW_TARGETGOALSSEP')" name="third">
              <div>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_SPECIFICGOALSSEP')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablesep" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.specific_goals_sep1"></el-input>
                        <div style="margin: 1rem 0;"></div>
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablesep" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.specific_goals_sep2"></el-input>
                        <div style="margin: 1rem 0;"></div>
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablesep" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.specific_goals_sep3"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_YOUROWNGOALSSEP')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablesep" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.your_own_goals_sep"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_BUSINESSRESULTSSEP')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablesep" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.business_results_sep"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_INTERVIEWRESULTSSEP')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablesep" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.interview_results_sep"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2023FORMVIEW_TARGETGOALSDEC')" name="fourth">
              <div>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_SPECIFICGOALSDEC')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disabledec" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.specific_goals_dec1"></el-input>
                        <div style="margin: 1rem 0;"></div>
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disabledec" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.specific_goals_dec2"></el-input>
                        <div style="margin: 1rem 0;"></div>
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disabledec" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.specific_goals_dec3"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_YOUROWNGOALSDEC')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disabledec" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.your_own_goals_dec"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_BUSINESSRESULTSDEC')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disabledec" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.interview_results_dec"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_INTERVIEWRESULTSDEC')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disabledec" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.business_results_dec"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2023FORMVIEW_TARGETGOALSMAR')" name="fifth">
              <div>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_SPECIFICGOALSMAR')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablemar" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.specific_goals_mar1"></el-input>
                        <div style="margin: 1rem 0;"></div>
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablemar" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.specific_goals_mar2"></el-input>
                        <div style="margin: 1rem 0;"></div>
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablemar" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.specific_goals_mar3"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_YOUROWNGOALSMAR')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablemar" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.your_own_goals_mar"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_BUSINESSRESULTSMAR')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablemar" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.business_results_mar"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_INTERVIEWRESULTSMAR')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disablemar" maxlength="50"
                                  style="width: 55rem" type="textarea" v-model="form.interview_results_mar"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import user from "../../../components/user.vue";
    import dicselect from "../../../components/dicselect.vue";
    import {Message} from 'element-ui';
    import {getOrgInfoByUserId} from '@/utils/customize'

    export default {
        name: 'PFANS2023FormView',
        components: {
            dicselect,
            EasyNormalContainer,
            user
        },
        data() {
            var validateUserid = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    callback(new Error(this.$t('normal.error_08') + this.$t('label.user_name')));
                    this.error = this.$t('normal.error_08') + this.$t('label.user_name');
                } else {
                    callback();
                    this.error = '';
                }
            };
            return {
                aaaaaa: "W0036",
                error: "",
                selectType: "Single",
                userlist: "",
                activeName: 'first',
                buttonList: [],
                data: [],
                loading: false,
                title: "title.PFANS2023VIEW",
                rules: {
                    user_id: [{
                        required: true,
                        validator: validateUserid,
                        trigger: 'change',
                    }],
                    role: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS2023FORMVIEW_ROLE'),
                            trigger: 'blur'
                        }
                    ],
                    skill_rank: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2023FORMVIEW_SKILL_RANK'),
                            trigger: 'change'
                        }
                    ],
                },
                form: {
                    specific_goals_year1: '',
                    specific_goals_year2: '',
                    specific_goals_year3: '',
                    stage: '',
                    status: '',
                    skill_rank: '',
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    user_id: '',
                    role: '',
                    your_own_goals_year: '',
                    interview_results_year: '',
                    specific_goals_sep1: '',
                    specific_goals_sep2: '',
                    specific_goals_sep3: '',
                    your_own_goals_sep: '',
                    business_results_sep: '',
                    interview_results_sep: '',
                    specific_goals_dec1: '',
                    specific_goals_dec2: '',
                    specific_goals_dec3: '',
                    your_own_goals_dec: '',
                    interview_results_dec: '',
                    business_results_dec: '',
                    specific_goals_mar1: '',
                    specific_goals_mar2: '',
                    specific_goals_mar3: '',
                    your_own_goals_mar: '',
                    business_results_mar: '',
                    interview_results_mar: '',
                },
                code: 'PR015',
                multiple: false,
                disable: false,
                disableyear: false,
                disablesep: false,
                disabledec: false,
                disablemar: false,
                canStart: true,
            }
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS2023Store/getDataOne', {"goalmanagement_id": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        this.userlist = this.form.user_id;
                        if (this.form.stage === 'PR014002' && this.form.status === '0') {
                            this.aaaaaa = 'W0036';
                            this.canStart = true;
                            this.disable = true;
                            this.disableyear = true;
                            this.disablesep = false;
                            this.disabledec = false;
                            this.disablemar = false;
                        } else if (this.form.stage === 'PR014002' && this.form.status === '2') {
                            this.aaaaaa = 'W0036';
                            this.canStart = false;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = false;
                            this.disabledec = false;
                            this.disablemar = false;
                        } else if (this.form.stage === 'PR014002' && this.form.status === '3') {
                            this.aaaaaa = 'W0036';
                            this.canStart = true;
                            this.disable = true;
                            this.disableyear = true;
                            this.disablesep = false;
                            this.disabledec = false;
                            this.disablemar = false;
                        } else if (this.form.stage === 'PR014002' && this.form.status === '4') {
                            this.aaaaaa = 'W0036';
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = true;
                            this.disabledec = false;
                            this.disablemar = false;
                            this.canStart = false;
                        } else if (this.form.stage === 'PR014003' && this.form.status === '0') {
                            this.aaaaaa = 'W0037';
                            this.canStart = true;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = true;
                            this.disabledec = false;
                            this.disablemar = false;
                        } else if (this.form.stage === 'PR014003' && this.form.status === '2') {
                            this.aaaaaa = 'W0037';
                            this.canStart = false;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = false;
                            this.disabledec = false;
                            this.disablemar = false;
                        } else if (this.form.stage === 'PR014003' && this.form.status === '3') {
                            this.aaaaaa = 'W0037';
                            this.canStart = true;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = true;
                            this.disabledec = false;
                            this.disablemar = false;
                        } else if (this.form.stage === 'PR014003' && this.form.status === '4') {
                            this.aaaaaa = 'W0037';
                            this.canStart = false;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = false;
                            this.disabledec = true;
                            this.disablemar = false;
                        } else if (this.form.stage === 'PR014004' && this.form.status === '0') {
                            this.aaaaaa = 'W0038';
                            this.canStart = true;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = false;
                            this.disabledec = true;
                            this.disablemar = false;
                        } else if (this.form.stage === 'PR014004' && this.form.status === '2') {
                            this.aaaaaa = 'W0038';
                            this.canStart = false;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = false;
                            this.disabledec = false;
                            this.disablemar = false;
                        } else if (this.form.stage === 'PR014004' && this.form.status === '3') {
                            this.aaaaaa = 'W0038';
                            this.canStart = true;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = false;
                            this.disabledec = true;
                            this.disablemar = false;
                        } else if (this.form.stage === 'PR014004' && this.form.status === '4') {
                            this.aaaaaa = 'W0038';
                            this.canStart = false;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = false;
                            this.disabledec = false;
                            this.disablemar = true;
                        } else if (this.form.stage === 'PR014005' && this.form.status === '0') {
                            this.aaaaaa = 'W0039';
                            this.canStart = true;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = false;
                            this.disabledec = false;
                            this.disablemar = true;
                        } else if (this.form.stage === 'PR014005' && this.form.status === '2') {
                            this.aaaaaa = 'W0039';
                            this.canStart = false;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = false;
                            this.disabledec = false;
                            this.disablemar = false;
                        } else if (this.form.stage === 'PR014005' && this.form.status === '3') {
                            this.aaaaaa = 'W0039';
                            this.canStart = true;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = false;
                            this.disabledec = false;
                            this.disablemar = true;
                        } else if (this.form.stage === 'PR014005' && this.form.status === '4') {
                            this.aaaaaa = 'W0039';
                            this.canStart = false;
                            this.disable = false;
                            this.disableyear = false;
                            this.disablesep = false;
                            this.disabledec = false;
                            this.disablemar = false;

                        }
                        if (!this.$route.params.disabled) {
                            this.disable = this.$route.params.disabled;
                            this.disableyear = this.$route.params.disabled;
                            this.disablesep = this.$route.params.disabled;
                            this.disabledec = this.$route.params.disabled;
                            this.disablemar = this.$route.params.disabled;
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
                    let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.center_id = lst.centerNmae;
                    this.form.group_id = lst.groupNmae;
                    this.form.team_id = lst.teamNmae;
                    this.form.user_id = this.$store.getters.userinfo.userid;
                    this.disableyear = true;
                    this.disablesep = false;
                    this.disabledec = false;
                    this.disablemar = false;
                }
            }
        },
        created() {
            this.disable = this.$route.params.disabled;
            if (this.disable) {
                this.buttonList = [
                    {
                        key: "save",
                        name: "button.save",
                    }
                ];
                this.form.stage = 'PR014002';
            }
        },
        methods: {
            getUserids(val) {
                this.form.user_id = val;
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
                    this.error = this.$t('normal.error_08') + this.$t('label.user_name');
                } else {
                    this.error = "";
                }
            },
            getErrorType(val1) {
                this.form.skill_rank = val1;
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
            buttonClick(val) {
                if (val === 'save') {
                    this.$refs["ruleForm"].validate(valid => {
                        if (valid) {
                            if (this.form.stage === 'PR014002' && this.form.status === '4') {
                                this.form.stage = 'PR014003';
                                this.form.status = '0';
                            } else if (this.form.stage === 'PR014003' && this.form.status === '4') {
                                this.form.stage = 'PR014004';
                                this.form.status = '0';
                            } else if (this.form.stage === 'PR014004' && this.form.status === '4') {
                                this.form.stage = 'PR014005';
                                this.form.status = '0';
                            }
                            if (this.$route.params._id) {
                                this.form.goalmanagement_id = this.$route.params._id;
                                this.loading = true;
                                this.$store
                                    .dispatch('PFANS2023Store/updatePfans2023', this.form)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false;
                                        if(val !== "update"){
                                            Message({
                                                message: this.$t("normal.success_02"),
                                                type: 'success',
                                                duration: 5 * 1000
                                            });
                                            if (this.$store.getters.historyUrl) {
                                                this.$router.push(this.$store.getters.historyUrl);
                                            }}
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
                                this.loading = true;
                                this.$store
                                    .dispatch('PFANS2023Store/createPfans2023', this.form)
                                    .then(response => {
                                        this.data = response;
                                        Message({
                                            message: this.$t("normal.success_01"),
                                            type: 'success',
                                            duration: 5 * 1000
                                        });
                                        this.loading = false;
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
            },
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
