<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState"  v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding:2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:11rem" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:11rem" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:11rem" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')"  prop="user_id">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      style="width:10.14rem" @getUserids="getUserids"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorrapplicationdate"   :label="$t('label.application_date')" prop="application_date">
                <el-date-picker
                  :disabled="!disable"
                  style="width:11rem"
                  type="date"
                  v-model="form.application_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2014VIEW_HOURS')" prop="worktime">
                <el-time-select
                  :disabled="!disable"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:45'
                  }"
                  style="width:11rem"
                  v-model="form.worktime">
                </el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorrimplementdate" :label="$t('label.PFANS2014FORMVIEW_STARTDATE')" prop="implement_date">
                <el-date-picker
                  startDate
                  :disabled="!disable"
                  style="width:11rem"
                  type="date"
                  v-model="form.implement_date">
                </el-date-picker>
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
    import PFANS2014View from "../PFANS2014/PFANS2014View.vue";
    import {Message} from 'element-ui'
    import user from "../../../components/user.vue";
    import {getOrgInfoByUserId} from '@/utils/customize'
    import moment from "moment";

    export default {
        name: 'PFANS2014FormView',
        components: {
            EasyNormalContainer,
            PFANS2014View,
            user
        },
        data() {
            var validateUserid = (rule, value, callback) => {
                if (!value || value === '' || value ==="undefined") {
                    callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
                    this.error = this.$t('normal.error_08') + this.$t('label.applicant');
                } else {
                    callback();
                    this.error = '';
                }
            };
              var validateimplement_date = (rule, value, callback) => {
                if (value) {
                    if (moment(this.form.implement_date).format('YYYY-MM') <= moment(new Date()).format('YYYY-MM-DD')) {
                        callback(new Error(this.$t('label.PFANS2014FORMVIEW_IMPLEMENTDATECHECK')));
                    } else {
                        if (moment(this.form.implement_date).format('DD') !== '01') {
                            callback(new Error(this.$t('label.PFANS2014FORMVIEW_ZHI')));
                        } else {
                            if (this.form.implement_date !== null && this.form.implement_date !== '') {
                                if (moment(value).format('YYYY-MM-DD') <= moment(this.form.application_date).format('YYYY-MM-DD')) {
                                    callback(new Error(this.$t('label.PFANS2014FORMVIEW_STARTDATE') + this.$t('normal.error_checkTime1') + this.$t('label.application_date')));
                                    this.errorrapplicationdate = this.$t('label.PFANS2014FORMVIEW_STARTDATE') + this.$t('normal.error_checkTime1') + this.$t('label.application_date');
                                } else {
                                    callback();
                                }
                            }
                        }
                    }
                } else {
                    callback();
                }
            };
            var validateapplication_date = (rule, value, callback) => {
                if (this.form.application_date !== null && this.form.application_date !== '') {
                    if (moment(value).format('YYYY-MM-DD') >= moment(this.form.implement_date).format('YYYY-MM-DD')) {
                        callback(new Error(this.$t('label.application_date') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2014FORMVIEW_STARTDATE')));
                        this.errorrapplicationdate = this.$t('label.application_date') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2014FORMVIEW_STARTDATE');
                    } else {
                        callback();
                        this.errorrapplicationdate = '';
                    }
                } else {
                    callback();
                    this.errorrapplicationdate = '';
                }
            };
            return {
                errorrapplicationdate: '',
                errorrimplementdate: '',
                loading: false,
                error: '',
                selectType: "Single",
                userlist: "",
                title: "title.PFANS2014VIEW",
                buttonList: [],
                form: {
                    user_id: '',
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    application_date: moment(new Date()).format("YYYY-MM-DD"),
                    worktime: '',
                    implement_date: '',
                    nodeList: []
                },
                disabled: false,
                rules: {
                    user_id: [{
                        required: true,
                        validator: validateUserid,
                        trigger: 'change',
                    }],
                    worktime: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.PFANS2014VIEW_HOURS'),
                        trigger: "blur"
                    }],
                    application_date: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.application_date'),
                        trigger: "change"
                    },
                        {validator: validateapplication_date, trigger: 'change'}],
                    implement_date: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.PFANS2014FORMVIEW_STARTDATE'),
                        trigger: "change"
                    },
                        {validator: validateimplement_date, trigger: "change"}],
                },
                canStart: false,
            };
        },
        created() {
            this.disable = this.$route.params.disabled;
            if (this.disable) {
                this.buttonList = [
                    {
                        key: "save",
                        name: "button.save",
                        icon: "el-icon-check"
                    }
                ];
            }
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true
                this.$store
                    .dispatch('PFANS2014Store/getFlexibleworkOne', {"flexibleworkid": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        this.userlist = this.form.user_id;
                        if (this.form.status === '2') {
                            this.disable = false;
                        }
                        this.loading = false
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                        this.loading = false
                    })
            } else {
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                    let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.center_id = lst.centerNmae;
                    this.form.group_id = lst.groupNmae;
                    this.form.team_id = lst.teamNmae;
                    this.form.user_id = this.$store.getters.userinfo.userid;
                }
            }
        },
        methods: {
            getUserids(val) {
                this.form.user_id = val;
                let lst = getOrgInfoByUserId(val);
                this.form.center_id = lst.centerNmae;
                this.form.group_id = lst.groupNmae;
                this.form.team_id = lst.teamNmae;
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
                    this.error = this.$t('normal.error_08') + this.$t('label.applicant');
                } else {
                    this.error = "";
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
            start(val) {
                this.form.status = '2';
                this.buttonClick("update");
            },
            end(val) {
                this.form.status = '0';
                this.buttonClick("update");
            },
            buttonClick(val) {
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                        this.loading = true
                        if (this.$route.params._id) {
                            this.form.flexibleworkid = this.$route.params._id;
                            this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
                            this.form.implement_date = moment(this.form.implement_date).format('YYYY-MM-DD');
                            this.$store
                                .dispatch('PFANS2014Store/updateFlexiblework', this.form)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false
                                    if(val !== "update"){
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
                                    this.loading = false
                                })
                        } else {
                            this.loading = true
                            this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
                            this.form.implement_date = moment(this.form.implement_date).format('YYYY-MM-DD');
                            this.$store
                                .dispatch('PFANS2014Store/createFlexiblework', this.form)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false
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
                                    this.loading = false
                                })
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
