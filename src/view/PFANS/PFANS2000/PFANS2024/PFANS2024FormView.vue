<template>
  <div>
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 20px">
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
                      <el-form-item :error="error" :label="$t('label.user_name')" prop="user_id" style="width: 19rem">
                        <user :disabled="!disable" :error="error" :selectType="selectType"
                              :userlist="userlist" @getUserids="getUserids" style="width:10.1rem"></user>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2023FORMVIEW_SKILL_RANK')" prop="skilllevel"
                                    style="width: 19rem">
                        <dicselect
                          :code="code"
                          :data="form.skilllevel"
                          :disabled="!disable"
                          :multiple="multiple"
                          @change="getErrorType">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024VIEW_SCHOOLSPECIES')" style="width: 19rem">
                        <dicselect
                          :code="code1"
                          :data="form.schoolspecies"
                          :disabled="!disable"
                          :multiple="multiple"
                          @change="getschoolspecie">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024VIEW_ENTRYYEAR')">
                        <el-date-picker :disabled="!disable" style="width: 11rem" type="date"
                                        v-model="form.entryyear"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024VIEW_GRADUATIONYEAR')">
                        <el-date-picker :disabled="!disable" style="width: 11rem" type="date"
                                        v-model="form.graduationyear"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_CONTRACT')">
                        <el-date-picker :disabled="!disable" style="width: 11rem" type="date"
                                        v-model="form.contract"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_BUSINESS')" prop="business">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                  style="width: 58.8rem" type="textarea" v-model="form.business"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_FEATURES')" label-width="6rem">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                  style="width: 58.8rem;padding-left: 2rem" type="textarea" v-model="form.features"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2024FORMVIEW_SKILLRANKING')" name="second">
              <div>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_SKILLRANKING1')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                  style="width: 55rem" type="textarea" v-model="form.skillranking1"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_SKILLRANKING1')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                  style="width: 55rem" type="textarea" v-model="form.skillranking2"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item :label="$t('label.PFANS2024FORMVIEW_COMPLETE')">
                      <el-switch
                        :disabled="!disable"
                        :width="60"
                        active-value="0"
                        inactive-value="1"
                        v-model="form.skillrankingfinished"
                      ></el-switch>
                    </el-form-item>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2024FORMVIEW_NEXTSKILLRANKING')" name="third">
              <div>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_SKILLRANKING1')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                  style="width: 55rem" type="textarea" v-model="form.nextskillranking1"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_NEXTSKILLRANKING2')" label-width="6rem">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                  style="width: 55rem;padding-left: 2rem" type="textarea" v-model="form.nextskillranking2"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item :label="$t('label.PFANS2024FORMVIEW_COMPLETE')">
                      <el-switch
                        :disabled="!disable"
                        :width="60"
                        active-value="0"
                        inactive-value="1"
                        v-model="form.nextskillrankingfinished"
                      ></el-switch>
                    </el-form-item>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2024FORMVIEW_FUTURE')" name="fourth">
              <div>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_FUTURE1')" label-width="6rem">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                  style="width: 55rem;padding-left: 2rem" type="textarea"
                                  :placeholder="$t('label.PFANS2024FORMVIEW_FUTURE1PLACE')"
                                  v-model="form.future1"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_FUTURE2')">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                  style="width: 55rem" type="textarea" v-model="form.future2"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item :label="$t('label.PFANS2024FORMVIEW_COMPLETE')">
                      <el-switch
                        :disabled="!disable"
                        :width="60"
                        active-value="0"
                        inactive-value="1"
                        v-model="form.futurefinished"
                      ></el-switch>
                    </el-form-item>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2024FORMVIEW_PANE4')" name="fifth">
              <div>
                <el-form :model="form" label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_TECHNOLOGY')" label-width="6rem">
                        <dicselect
                          style="width: 11rem;padding-left: 2rem"
                          :code="code2"
                          :data="technology"
                          :disabled="!disable"
                          :multiple="multiple1"
                          @change="gettechnology">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_STAFF')" label-width="6rem">
                        <dicselect
                          style="width: 11rem;padding-left: 2rem"
                          :code="code3"
                          :data="staff"
                          :disabled="!disable"
                          :multiple="multiple1"
                          @change="getstaff">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2024FORMVIEW_YEARSCHEDULE')">
                        <el-input :disabled="!disable"
                                  maxlength="20" style="width: 11rem" type="textarea"
                                  v-model="form.yearschedule"></el-input>
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
                disable: false,
                staff: [],
                technology: [],
                checked: true,
                checked1: true,
                checked2: true,
                checked3: true,
                checked4: true,
                error: "",
                selectType: "Single",
                userlist: "",
                activeName: 'first',
                buttonList: [],
                data: [],
                loading: false,
                title: "title.PFANS2024VIEW",
                rules: {
                    user_id: [{
                        required: true,
                        validator: validateUserid,
                        trigger: 'change',
                    }],
                    business: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS2024FORMVIEW_BUSINESS'),
                            trigger: 'blur'
                        }
                    ],
                    skilllevel: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS2023FORMVIEW_SKILL_RANK'),
                            trigger: 'change'
                        }
                    ],
                },
                form: {
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    user_id: '',
                    skilllevel: '',
                    schoolspecies: '',
                    graduationyear: '',
                    contract: '',
                    entryyear: '',
                    business: '',
                    features: '',
                    technology: '',
                    staff: '',
                    skillranking1: '',
                    skillranking2: '',
                    nextskillranking1: '',
                    nextskillranking2: '',
                    future1: '',
                    future2: '',
                    yearschedule: '',
                    skillrankingfinished: "0",
                    nextskillrankingfinished: "0",
                    futurefinished: "0",
                },
                multiple: false,
                multiple1: true,
                code: 'PR015',
                code1: 'PR016',
                code2: 'PR017',
                code3: 'PR018',
                canStart: false,
            }
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS2024Store/getDataOne', {"talentplan_id": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        this.userlist = this.form.user_id;
                        if (this.form.status === '2') {
                            this.disable = false;
                        }
                        let lettechnology;
                        if (this.form.technology.length > 0) {
                            lettechnology = this.form.technology.split(",");
                            for (var i = 0; i < lettechnology.length; i++) {
                                this.technology.push(lettechnology[i]);
                            }
                        }
                        let letstaff;
                        if (this.form.staff.length > 0) {
                            letstaff = this.form.staff.split(",");
                            for (var i = 0; i < letstaff.length; i++) {
                                this.staff.push(letstaff[i]);
                            }
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
            }
        },
        methods: {
            getUserids(val) {
                this.userlist = val;
                this.form.user_id = val;
                let lst = getOrgInfoByUserId(val);
                this.form.center_id = lst.centerNmae;
                this.form.group_id = lst.groupNmae;
                this.form.team_id = lst.teamNmae;
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
                    this.error = this.$t('normal.error_08') + this.$t('label.user_name');
                } else {
                    this.error = "";
                }
            },
            getErrorType(val1) {
                this.form.skilllevel = val1;
            },
            getschoolspecie(val1) {
                this.form.schoolspecies = val1;
            },
            gettechnology(val1) {
                this.technology = val1;
            },
            getstaff(val1) {
                this.staff = val1;
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
                            this.form.staff = "";
                            this.form.technology = "";
                            if (this.staff.length > 0) {
                                let letstaff = this.staff.splice(",");
                                for (var i = 0; i < letstaff.length; i++) {
                                    this.form.staff = this.form.staff + letstaff[i] + ","
                                }
                            }
                            this.form.staff = this.form.staff.substring(0, this.form.staff.length - 1);

                            if (this.technology.length > 0) {
                                let lettechnology = this.technology.splice(",");
                                for (var i = 0; i < lettechnology.length; i++) {
                                    this.form.technology = this.form.technology + lettechnology[i] + ","
                                }
                            }
                            this.form.technology = this.form.technology.substring(0, this.form.technology.length - 1);
                            this.loading = true;
                            if (this.$route.params._id) {
                                this.form.talentplan_id = this.$route.params._id;
                                this.$store
                                    .dispatch('PFANS2024Store/updatePfans2024', this.form)
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
                                this.$store
                                    .dispatch('PFANS2024Store/createPfans2024', this.form)
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
            },
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
