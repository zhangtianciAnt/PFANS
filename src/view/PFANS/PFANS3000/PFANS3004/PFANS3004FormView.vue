<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding: 2rem">
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :label="$t('label.center')" prop="centerid">
                <el-input :disabled="true" style="width: 11rem" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')" prop="groupid">
                <el-input :disabled="true" style="width: 11rem" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="teamid">
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
            <el-col :span="8">
              <el-form-item :label="$t('label.budgetunit')" prop="company">
                <dicselect
                  :code="code"
                  :data="form.company"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="change"
                  style="width: 11rem"
                >
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="applicationdate">
                <div class="block">
                  <el-date-picker
                    :disabled="!disable"
                    style="width: 11rem"
                    type="date"
                    v-model="form.applicationdate">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <template>
                <el-form-item
                  :label="$t('label.PFANS3004VIEW_TYPE')" prop="stationerytype">
                  <dicselect
                    :code="code2"
                    :data="form.stationerytype"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="change2"
                    style="width: 11rem"
                  >
                  </dicselect>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3004VIEW_NAME')" prop="name">
                <el-input :disabled="!disable" maxlength="20" style="width: 11rem" v-model.trim="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3004VIEW_SIZE')" maxlength="50" prop="size">
                <el-input :disabled="!disable" style="width: 11rem" v-model.trim="form.size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :label="$t('label.numbers')" prop="numbers">
                <el-input-number :disabled="!disable" controls-position="right" :precision="0" :step="1" :min="0"
                                 :max="9999999999" style="width: 11rem"
                                 v-model.trim="form.numbers"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="24">
              <el-form-item :label="$t('label.remarks')" prop="remarks">
                <el-input :disabled="!disable" style="width: 100%" type="textarea" v-model="form.remarks"></el-input>
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
    import PFANS3004View from '../PFANS3004/PFANS3004View.vue';
    import dicselect from "../../../components/dicselect.vue";
    import moment from "moment";
    import {Message} from 'element-ui';
    import user from "../../../components/user.vue";
    import {getOrgInfoByUserId} from '@/utils/customize'

    export default {
        name: "PFANS3004FormView",
        components: {
            EasyNormalContainer,
            PFANS3004View,
            getOrgInfoByUserId,
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
            return {
                loading: false,
                canStart: false,
                selectType: "Single",
                userlist: "",
                error: '',
                title: "title.PFANS3004VIEW",
                buttonList: [],
                form: {
                    centerid: '',
                    groupid: '',
                    teamid: '',
                    userid: '',
                    company: '',
                    applicationdate: moment(new Date()).format("YYYY-MM-DD"),
                    stationerytype: '',
                    name: '',
                    size: '',
                    numbers: '',
                    remarks: '',
                },
                rules: {
                    userid: [{
                        required: true,
                        validator: validateUserid,
                        trigger: 'change'
                    }],
                    company: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.budgetunit'),
                        trigger: 'change'
                    }],
                    applicationdate: [{
                        required: true,
                        message: this.$t("normal.error_09") + this.$t("label.application_date"),
                        trigger: "change"
                    }],
                    stationerytype: [{
                        required: true,
                        message: this.$t("normal.error_09") + this.$t("label.PFANS3004VIEW_TYPE"),
                        trigger: "change"
                    }],
                    name: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.PFANS3004VIEW_NAME'),
                        trigger: 'blur'
                    }],
                    size: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.PFANS3004VIEW_SIZE'),
                        trigger: 'blur'
                    }],
                    numbers: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.numbers'),
                        trigger: 'blur'
                    }],
                },
                code: 'GT001',
                code2: 'PR004',
                multiple: false,
                disable: false,
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS3004Store/getStationeryOne', {"stationeryid": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        this.userlist = this.form.userid;
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
                this.form.company = val;
            },
            change2(val) {
                this.form.stationerytype = val;
            },
            buttonClick(val) {
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.form.userid = this.userlist;
                        if (this.$route.params._id) {
                            this.form.applicationdate = moment(this.form.applicationdate).format('YYYY-MM-DD')
                            this.loading = true;
                            this.$store
                                .dispatch('PFANS3004Store/updateStationery', this.form)
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
                            this.form.applicationdate = moment(this.form.applicationdate).format('YYYY-MM-DD')
                            this.loading = true;
                            this.$store
                                .dispatch('PFANS3004Store/createStationery', this.form)
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

<style scoped>

</style>
