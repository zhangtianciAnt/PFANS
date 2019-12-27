<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      ref="container"
      :title="title"
      v-loading="loading"
      @buttonClick="buttonClick"
      :buttonList="buttonList"
      @workflowState="workflowState"
      :canStart="canStart"
      @start="start"
      @end="end"
    >
      <div slot="customize">
        <el-form :model="form" label-width="8rem" label-position="left" :rules="rules" style="padding: 2rem"
                 ref="refform">
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width: 11rem" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width: 11rem" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width: 11rem" v-model="form.teamid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 10.2rem"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3003VIEW_OCCUPATIONAL')" prop="occupational">
                  <el-input v-model.trim="form.occupational" :disabled="!disable" style="width: 11rem"
                            maxlength="20"></el-input>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3003VIEW_INSIDELINE')" prop="insideline">
                  <el-input v-model.trim="form.insideline" :disabled="!disable" style="width: 11rem"
                            maxlength="20"></el-input>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.email')" prop="email">
                  <el-input type="email" v-model.trim="form.email" :disabled="!disable" style="width: 11rem"
                            maxlength="50"></el-input>
                </el-form-item>
              </template>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003FORMVIEW_PLAN')" prop="plan">
                <span style="margin-right: 1rem ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                <el-switch
                  :disabled="!disable"
                  v-model="form.plan"
                  active-value="1"
                  inactive-value="0"
                  @change="change"
                >
                </el-switch>
                <span style="margin-left: 1rem ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003FORMVIEW_TYPE')" prop="type" v-if="show">
                <dicselect
                  style="width: 11rem"
                  :disabled="!disable"
                  :code="code"
                  :multiple="multiple"
                  :data="form.type"
                  @change="change2"
                >
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003FORMVIEW_CLASSIFICATION')" prop="classification" v-if="show2">
                <dicselect
                  style="width: 11rem"
                  :disabled="!disable"
                  :code="code2"
                  :multiple="multiple"
                  :data="form.classification"
                  @change="change3"
                >
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003FORMVIEW_BALANCE')" prop="balance" v-show="show">
                <el-input-number v-model="form.balance" :disabled="!disable" controls-position="right" :step="1"
                                 :min="0" :max="9999999999" :precision="2" style="width: 11rem"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="24">
              <el-form-item :label="$t('label.remarks')" prop="remarks">
                <el-input type="textarea" v-model="form.remarks" :disabled="!disable" style="width: 95%"></el-input>
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
    import dicselect from "../../../components/dicselect.vue";
    import {Message} from 'element-ui';
    import user from "../../../components/user.vue";
    import {getOrgInfoByUserId} from '@/utils/customize'
    import {telephoneNumber, validateEmail} from '@/utils/validate';

    export default {
        name: "PFANS3003FormView",
        components: {
            EasyNormalContainer,
            dicselect,
            user
        },
        data() {
            var validateUserid = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    callback();
                    this.error = '';
                }
            };
            var validateTel = (rule, value, callback) => {
                if (this.form.insideline !== null && this.form.insideline !== '') {
                    if (telephoneNumber(value)) {
                        callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3003VIEW_INSIDELINE')));
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
            var validatePass = (rule, value, callback) => {
                if (this.show) {
                    if (value) {
                        callback();
                    } else {
                        callback(new Error(this.$t("normal.error_09") + this.$t("label.PFANS3003FORMVIEW_TYPE")));
                    }
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (this.show2) {
                    if (value) {
                        callback();
                    } else {
                        callback(new Error(this.$t("normal.error_09") + this.$t("label.PFANS3003FORMVIEW_CLASSIFICATION")));
                    }
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                canStart: false,
                selectType: "Single",
                userlist: "",
                title: "title.PFANS3003VIEW",
                buttonList: [],
                form: {
                    centerid: '',
                    groupid: '',
                    teamid: '',
                    userid: '',
                    occupational: '',
                    insideline: '',
                    email: '',
                    plan: true,
                    type: '',
                    classification: '',
                    balance: '',
                    remarks: '',
                },
                rules: {
                    userid: [{
                        required: true,
                        validator: validateUserid,
                        trigger: 'change'
                    }],
                    occupational: [{
                        required: true,
                        message: this.$t("normal.error_08") + this.$t("label.PFANS3003VIEW_OCCUPATIONAL"),
                        trigger: "blur"
                    }],
                    insideline: [{
                        required: true,
                        message: this.$t("normal.error_08") + this.$t("label.PFANS3003VIEW_INSIDELINE"),
                        trigger: "blur"
                    },
                        {validator: validateTel, trigger: 'blur'}],
                    email: [{
                        required: true,
                        message: this.$t("normal.error_08") + this.$t("label.email"),
                        trigger: "blur"
                    },
                        {validator: checkemail, trigger: 'blur'}],
                    type: [{
                        required: true,
                        validator: validatePass,
                        trigger: "change"
                    }],
                    classification: [{
                        required: true,
                        validator: validatePass2,
                        trigger: "change"
                    }],
                },
                code: 'PR002',
                code2: 'PR003',
                multiple: false,
                disable: false,
                show: false,
                show2: false,
                error: '',
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS3003Store/getBusinessCardOne', {"businesscardid": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        this.loading = false;
                        this.userlist = this.form.userid;
                        if (this.form.plan === '1') {
                            this.show = true;
                        } else {
                            this.show = false;
                            this.show2 = false;
                            this.form.classification = null;
                            this.form.balance = null;
                        }
                        if (this.form.type === "PR002005") {
                            this.show2 = true;
                        } else {
                            this.show2 = false;
                            this.form.classification = null;
                            this.form.balance = null;
                        }
                        if (this.form.status === '2') {
                            this.disable = false;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        })
                        this.loading = false;
                    })
            } else {
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                    let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.centerid = lst.centerNmae;
                    this.form.groupid = lst.groupNmae;
                    this.form.teamid = lst.teamNmae;
                    this.form.userid = this.$store.getters.userinfo.userid;
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
                        disabled: false,
                        icon: "el-icon-check"
                    }
                ];
            }
        },
        methods: {
            workflowState(val) {
                if (val.state === '1') {
                    this.form.status = '3';
                } else if (val.state === '2') {
                    this.form.status = '4';
                }
                this.buttonClick("update");
            },
            start(val) {
                this.form.status = '2';
                this.buttonClick("update");
            },
            end(val) {
                this.form.status = '0';
                this.buttonClick("update");
            },
            getUserids(val) {
                this.form.userid = val;
                this.userlist = val;
                let lst = getOrgInfoByUserId(val);
                this.form.centerid = lst.centerNmae;
                this.form.groupid = lst.groupNmae;
                this.form.teamid = lst.teamNmae;
                if (!this.form.userid || this.form.userid === '' || val === "undefined") {
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.error = "";
                }
            },
            change(val) {
                this.form.plan = val;
                if (val === '1') {
                    this.show = true;
                } else {
                    this.show = false;
                    this.form.type = null;
                    this.show2 = false;
                    this.form.classification = null;
                    this.form.balance = null;
                }
            },
            change2(val) {
                this.form.type = val;
                if (val === "PR002005") {
                    this.show2 = true;
                } else {
                    this.show2 = false;
                    this.form.classification = null;
                    this.form.balance = null;
                }
            },
            change3(val) {
                this.form.classification = val;
            },
            buttonClick(val) {
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.form.userid = this.userlist;
                        if (this.$route.params._id) {
                            this.$store
                                .dispatch('PFANS3003Store/updateBusinessCard', this.form)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    Message({
                                        message: this.$t("normal.success_02"),
                                        type: 'success',
                                        duration: 5 * 1000
                                    })
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
                                    })
                                    this.loading = false;
                                })
                        } else {
                            this.loading = true;
                            this.$store.dispatch('PFANS3003Store/createBusinessCard', this.form).then(response => {
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

</style>
