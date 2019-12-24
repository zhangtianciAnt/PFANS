<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="ruleForm"
                 style="padding: 2rem">
          <el-row>
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
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width:10rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')"
                            style="width: 5%" prop="application_date">
                <el-date-picker
                  v-model="form.application_date"
                  :disabled="true"
                  type="date"
                  style="width:  11rem"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIEW_YYRQ')"
                            style="width: 5%" prop="usedate">
                <el-date-picker
                  v-model="form.usedate"
                  :disabled="!disable"
                  type="date"
                  style="width:  11rem"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_WJLX')" style="width:19rem" prop="filetype">
                <dicselect
                  :disabled="!disable"
                  :code="code"
                  :multiple="multiple"
                  :data="form.filetype"
                  @change="wjlx">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_YYLX')" style="width:19rem" prop="sealtype">
                <dicselect
                  :disabled="!disable"
                  :code="code2"
                  :multiple="multiple2"
                  :data="form.sealtype"
                  @change="yilx">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_KH')" style="width:19rem" prop="client">
                <dicselect
                  :disabled="!disable"
                  :code="code3"
                  :multiple="multiple3"
                  :data="form.client"
                  @change="kh">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_YYFS')" prop="printscore">
                <el-input-number :disabled="!disable" :min="0" :step="1" :max="9999999999" :precision="0" style="width:11rem"
                                 v-model.trim="form.printscore"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1034VIEW_FILENAME')" prop="filename">
                <el-input v-model="form.filename" :disabled="!disable" style="width: 11rem" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item :label="$t('label.remarks')" style="width: 100%" prop="remarks"
            >
              <el-input
                :disabled="!disable"
                type="textarea"
                :rows="7"
                v-model="form.remarks">
              </el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import PFANS4001View from '../PFANS4001/PFANS4001View.vue';
    import {Message} from 'element-ui';
    import dicselect from '../../../components/dicselect.vue';
    import user from '../../../components/user.vue';
    import {getOrgInfoByUserId} from '@/utils/customize';

    export default {
        name: 'PFANS4001FormView',
        components: {
            EasyNormalContainer,
            PFANS4001View,
            dicselect,
            user,
        },
        data() {
            var checkuser = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                } else {
                    this.error = "";
                    return callback();
                }
            };
            return {
                error: '',
                loading: false,
                disable: false,
                selectType: 'Single',
                userlist: "",
                title: 'title.PFANS4001FORMVIEW',
                buttonList: [],
                form: {
                    usedate: '',
                    application_date: new Date(),
                    remarks: '',
                    client: '',
                    sealtype: '',
                    filetype: '',
                    printscore: '',
                    filename: '',
                    centerid: '',
                    groupid: '',
                    teamid: '',
                    userid: '',

                },
                code: 'PC002',
                multiple: false,
                code2: 'PC001',
                multiple2: false,
                code3: 'PG017',
                multiple3: false,
                rules: {
                    userid: [
                        {
                            required: true,
                            validator: checkuser,
                            trigger: 'change'
                        },
                    ],
                    application_date: [{
                        required: true,
                    }
                    ],
                    usedate: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.PFANS4001FORMVIEW_YYRQ'),
                        trigger: 'change',
                    }
                    ],
                    filename: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1034VIEW_FILENAME'),
                            trigger: 'blur',
                        },
                    ],
                    printscore: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_YYFS'),
                            trigger: 'blur',
                        },
                    ],
                    filetype: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_WJLX'),
                            trigger: 'change',
                        },
                    ],
                    sealtype: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_YYLX'),
                            trigger: 'change',
                        },
                    ],
                    client: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_KH'),
                            trigger: 'change',
                        },
                    ],
                },
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS4001Store/getPfans4001One', {'sealid': this.$route.params._id})
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
                            duration: 5 * 1000,
                        });
                        this.loading = false;
                    });
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
                        key: 'save',
                        name: 'button.save',
                        icon: 'el-icon-check',
                    },
                ];
            }
        },
        methods: {
            wjlx(value1) {
                this.form.filetype = value1;
            },
            yilx(value2) {
                this.form.sealtype = value2;
            },
            kh(value3) {
                this.form.client = value3;
            },
            getUserids(val) {
                this.form.userid = val;
                this.userlist = val;
                let lst = getOrgInfoByUserId(val);
                this.form.centerid = lst.centerNmae;
                this.form.groupid = lst.groupNmae;
                this.form.teamid = lst.teamNmae;
                if (!this.form.userid || this.form.userid === '' || val === "undefined") {
                    this.error = this.$t('normal.error_08') + this.$t('label.applicant');
                } else {
                    this.error = '';
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
            buttonClick(val) {
                this.$refs['ruleForm'].validate(valid => {
                    if (valid) {
                        if (this.$route.params._id) {
                            this.loading = true;
                            this.form.userid = this.userlist;
                            this.form.sealid = this.$route.params._id;
                            this.$store
                                .dispatch('PFANS4001Store/updatePfans4001', this.form)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    Message({
                                        message: this.$t("normal.success_02"),
                                        type: 'success',
                                        duration: 5 * 1000
                                    });
                                    if(val !== "update"){
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
                            this.form.userid = this.userlist;
                            this.$store
                                .dispatch('PFANS4001Store/createPfans4001', this.form)
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
            },
        },
    }
</script>
<style lang="scss">
  .el-form-item__error {
    width: 15rem;
  }
</style>
