<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" @end="end"
                         @start="start"
                         @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span  class="collapse_Title">{{$t('title.PFANS1018VIEW')}}</span>
              </template>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" maxlength='36' style="width: 20vw" v-model="form.appcenter_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" maxlength='36' style="width: 20vw" v-model="form.appgroup_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" maxlength='36' style="width: 20vw" v-model="form.appteam_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error_applicant" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disabled" :error="error_applicant" :selectType="selectType"
                      :userlist="userapplicantlist"
                      @getUserids="getApplicantids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')">
                <el-input :disabled="true" maxlength='36' style="width: 20vw" v-model="form.type"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.subtype')" prop="subtype">
                <dicselect
                  :code="code1"
                  :data="form.subtype"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getSubtype"
                  style="width: 20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.application')">
                <el-date-picker :disabled="!disabled" style="width: 20vw"type="date"
                                v-model="form.payment"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_REASON')">
                <el-input :disabled="!disabled" :rows="2" style="width: 20vw" type="textarea"
                          v-model="form.reason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            </el-collapse-item>
          </el-collapse>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span  class="collapse_Title">{{$t('label.PFANS1018VIEW_APPLICATIONDEPLOYMENT')}}</span>
              </template>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" maxlength='36' style="width: 20vw" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" maxlength='36' style="width: 20vw" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" maxlength='36' style="width: 20vw" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error_user" :label="$t('label.PFANS3005VIEW_USER')" prop="user_name">
                <user :disabled="!disabled" :error="error_user" :selectType="selectType" :userlist="useridlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_TYPESOF')" prop="applicationType">
                <dicselect
                  :code="code3"
                  :data="form.applicationType"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getApplicationtype"
                  style="width: 20vw"
                ></dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                          v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1018VIEW_ROMANNAME')" prop="romanname">
                <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                          v-model="form.romanname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1018FORMVIEW_INSIDENUMBER')" prop="extension">
                <el-input :disabled="!disabled" style="width: 20vw"
                          v-model="form.extension"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1018FORMVIEW_USINGLEVEL')" prop="useLevel">
                <dicselect
                  :code="code2"
                  :data="form.useLevel"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getUsinglevel"
                  style="width: 20vw"
                >
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div class="sub_color_red">{{$t('label.PFANS1018FORMVIEW_LEVELBUTTOM')}}</div>
            </el-col>
          </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import user from "../../../components/user.vue";
    import PFANS1018View from "../PFANS1018/PFANS1018View.vue";
    import dicselect from "../../../components/dicselect.vue";
    import {Message} from 'element-ui'
    import {getOrgInfoByUserId} from '@/utils/customize';
    import moment from "moment";
    import {validateEmail} from "../../../../utils/validate";

    export default {
        name: 'PFANS1018FormView',
        components: {
            EasyNormalContainer,
            PFANS1018View,
            user,
            getOrgInfoByUserId,
            dicselect
        },
        data() {
            var checkapplicant = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    this.error_applicant = this.$t('normal.error_09') + this.$t('label.applicant');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                } else {
                    this.error_applicant = "";
                    return callback();
                }
            };
            var checkuser = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    this.error_user = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_USER');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_USER')));
                } else {
                    this.error_user = "";
                    return callback();
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
                loading: false,
                error_applicant: '',
                error_user: '',
                selectType: "Single",
                useridlist: "",
                userapplicantlist: "",
                title: "title.PFANS1018VIEW",
                disabled: false,
                buttonList: [],
                multiple: false,
                form: {
                    global_id: '',
                    type: this.$t('menu.PFANS1018'),
                    subtype: '',
                    payment: moment(new Date()).format("YYYY-MM-DD"),
                    appcenter_id: '',
                    appgroup_id: '',
                    appteam_id: '',
                    useLevel: '',
                    user_id: '',
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    user_name: '',
                    reason: '',
                    email: '',
                    romanname: '',
                    extension: '',
                    applicationType: '',
                    status: '',
                },
                code1: 'PJ044',
                code2: 'PJ054',
                code3: 'PJ045',
                disabled: true,
                rules: {
                    user_id: [
                        {
                            required: true,
                            validator: checkapplicant,
                            trigger: 'change'
                        },
                    ],
                    user_name: [
                        {
                            required: true,
                            validator: checkuser,
                            trigger: 'change'
                        },
                    ],
                    applicationType: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS1016FORMVIEW_TYPESOF'),
                            trigger: 'change'
                        },
                    ],
                    romanname: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1018VIEW_ROMANNAME'),
                            trigger: 'change'
                        },
                    ],
                    subtype: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.subtype'),
                            trigger: 'change'
                        },
                    ],
                    extension: [{
                        required: true,
                        message:  this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1018FORMVIEW_INSIDENUMBER'),
                        trigger: 'blur',
                    }],
                    email: [{
                        required: true,
                        message: this.$t("normal.error_08") + this.$t("label.email"),
                        trigger: "blur"
                    },
                        {validator: checkemail, trigger: 'blur'}],
                    useLevel: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS1018FORMVIEW_USINGLEVEL'),
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
                    .dispatch('PFANS1018Store/getglobalApplyOne', {"global_id": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        this.userapplicantlist = this.form.user_id;
                        this.useridlist = this.form.user_name;
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
            } else {
                this.userapplicantlist = this.$store.getters.userinfo.userid;
                if (this.userapplicantlist !== null && this.userapplicantlist !== '') {
                    let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.appcenter_id = lst.centerNmae;
                    this.form.appgroup_id = lst.groupNmae;
                    this.form.appteam_id = lst.teamNmae;
                    this.form.user_id = this.$store.getters.userinfo.userid;
                }
                this.loading = false;
                this.useridlist = this.$store.getters.userinfo.userid;
                if (this.useridlist !== null && this.useridlist !== '') {
                    let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.center_id = lst.centerNmae;
                    this.form.group_id = lst.groupNmae;
                    this.form.team_id = lst.teamNmae;
                    this.form.user_name = this.$store.getters.userinfo.userid;
                }
                this.loading = false;
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
            getApplicantids(val) {
                this.form.user_id = val;
                let lst = getOrgInfoByUserId(val);
                this.form.appcenter_id = lst.centerNmae;
                this.form.appgroup_id = lst.groupNmae;
                this.form.appteam_id = lst.teamNmae;
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
                    this.error_applicant = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.error_applicant = "";
                }
            },
            getUserids(val) {
                this.form.user_name = val;
                let lst = getOrgInfoByUserId(val);
                this.form.center_id = lst.centerNmae;
                this.form.group_id = lst.groupNmae;
                this.form.team_id = lst.teamNmae;
                if (!this.form.user_name || this.form.user_name === '' || val === "undefined") {
                    this.error_user = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_USER');
                } else {
                    this.error_user = "";
                }
            },
            getSubtype(val) {
                this.form.subtype = val;
            },
            getApplicationtype(val) {
                this.form.applicationType = val;
            },
            getUsinglevel(val) {
                this.form.useLevel = val;
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
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                        this.form.global_id = this.$route.params._id;
                        this.form.payment = moment(this.form.payment).format('YYYY-MM-DD');
                        this.loading = true;
                        if (this.$route.params._id) {
                            this.$store
                                .dispatch('PFANS1018Store/updateglobalApply', this.form)
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
                            this.form.payment = moment(this.form.payment).format('YYYY-MM-DD');
                            this.loading = true;
                            this.$store
                                .dispatch('PFANS1018Store/createglobalApply', this.form)
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
