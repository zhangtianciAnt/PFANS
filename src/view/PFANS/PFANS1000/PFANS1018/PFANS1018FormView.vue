<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading" :buttonList="buttonList"
                         >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding: 2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" maxlength='36' style="width: 11rem" v-model="form.appcenter_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" maxlength='36' style="width: 11rem" v-model="form.appgroup_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" maxlength='36' style="width: 11rem" v-model="form.appteam_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
<!--            申请人-->
            <el-col :span="8">
              <el-form-item :error="error_applicant" :label="$t('label.applicant')" prop="applicant_id">
                <user :disabled="!disabled" :error="error_applicant" :selectType="selectType" :userlist="userapplicantlist"
                      @getUserids="getApplicantids" style="width: 10.15rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8" >
              <el-form-item :label="$t('label.PFANS2022VIEW_TYPE')" >
<!--           申請種類      选择框-->
                <dicselect
                  :code="code"
                  :data="form.type"
                  :disabled="!disabled"
                  :multiple="multiple"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
<!--            サブ種類-->
            <el-col :span="8">
              <el-form-item :label="$t('label.subtype')">
                <dicselect
                  :code="code1"
                  :data="form.subtype"
                  :disabled="!disabled"
                  :multiple="multiple"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
<!--            申请日付-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1018VIEW_APPLICATIONDAYPAYMENT')">
                <el-date-picker :disabled="!disabled" style="width: 11rem" type="date"
                                v-model="form.payment"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
<!--          申请理由-->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('label.PFANS1021FORMVIEW_REASON')">
                <el-input :disabled="!disabled" style="width: 90%" type="textarea" :rows="3" v-model="form.reason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
<!--          **************************************************-->
<!--          申请部署-->
          <el-row>
            <el-col :span="8">
              <div class="sub_color_blue" type="font-size:6px">{{$t('label.PFANS1018VIEW_APPLICATIONDEPLOYMENT')}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" maxlength='36' style="width: 11rem" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" maxlength='36' style="width: 11rem" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" maxlength='36' style="width: 11rem" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
<!--            使用者-->
            <el-col :span="8">
              <el-form-item :error="error_user" :label="$t('label.PFANS3005VIEW_USER')" prop="user_id">
                <user :disabled="!disabled" :error="error_user" :selectType="selectType" :userlist="useridlist"
                      @getUserids="getUserids" style="width: 10.15rem"></user>
              </el-form-item>
            </el-col>
<!--            E-mail-->
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input :disabled="!disabled" maxlength='20' style="width: 11rem"
                          v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
<!--            ローマ 字氏名-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1018VIEW_ROMANNAME')" prop="romanname">
                <el-input :disabled="!disabled" maxlength='20' style="width: 11rem"
                          v-model="form.romanname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
<!--            内線番号-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1018FORMVIEW_INSIDENUMBER')">
                <el-input :disabled="!disabled" maxlength='20' style="width: 11rem"
                          v-model="form.extension"></el-input>
              </el-form-item>
            </el-col>
 <!--            使用Level-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1018FORMVIEW_USINGLEVEL')">
                <dicselect
                  :code="code2"
                  :data="form.uselevel"
                  :disabled="!disabled"
                  :multiple="multiple"
                >
                </dicselect>
              </el-form-item>
            </el-col>
<!--            申請種別-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_TYPE')">
                <dicselect
                  :code="code3"
                  :data="form.applicationType"
                  :disabled="!disabled"
                  :multiple="multiple"
                ></dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div class="sub_color_red" >{{$t('label.PFANS1018FORMVIEW_LEVELBUTTOM')}}</div>
            </el-col>
          </el-row>
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

    export default {
        name: 'PFANS1018FormView',
        // 组件
        components: {
            EasyNormalContainer,
            PFANS1018View,
            user,
            getOrgInfoByUserId,
            dicselect
        },
        // 固定写法，验证用户名信息
        data() {
            // 申请者
            var checkapplicant = (rule, value, callback) => {
                if(!value || value === '' || value ==="undefined"){
                    this.error_applicant = this.$t('normal.error_09') + this.$t('label.applicant');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                }else{
                    this.error_applicant = "";
                    return callback();
                }
            };
            // 使用者
            var checkuser = (rule, value, callback) => {
                if(!value || value === '' || value ==="undefined"){
                    this.error_user = this.$t('normal.error_09') + this.$t('label.applicant');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                }else{
                    this.error_user = "";
                    return callback();
                }
            };
            return {
                loading: false,
                error_applicant: '',
                error_user:'',
                selectType: "Single",
                useridlist: "",
                userapplicantlist:"",
                title: "title.PFANS1018VIEW",
                disabled: false,
                buttonList: [],
                multiple: false,
                // 数据库字段
                form: {
                    appcenter_id: '',
                    appgroup_id: '',
                    appteam_id: '',
                    global_id: '',
                    type:'',
                    subtype: '',
                    user_id: '',
                    applicant_id:'',
                    payment: moment(new Date()).format("YYYY-MM-DD"),
                    reason: '',
                    center_id:'',
                    group_id:'',
                    team_id:'',
                    email:'',
                    romanname:'',
                    extension:'',
                    applicationtype:'',
                    uselevel:'',
                    applicationType:'',
                },
                // 申请种类
                code: '',
                // サブ種類
                code1: '',
                // 使用Level
                code2: '',
                // 申请种类
                code3:'',
                disabled: true,
                rules:{
                    user_id:[
                        {
                            required: true,
                            validator: checkuser,
                            trigger:'change'
                        },
                    ],
                    applicant_id:[
                        {
                            required: true,
                            validator: checkapplicant,
                            trigger:'change'
                        },
                    ],
                    department: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2006VIEW_CLUB'),
                            trigger: 'change'
                        },
                    ],
                    romanname: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS1018VIEW_ROMANNAME'),
                            trigger: 'change'
                        },
                    ],
                    email: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.email'),
                            trigger: 'change'
                        },
                    ],
                },
                canStart:false,
            };
        },
        /*
        created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
        mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。*/
        mounted() {
            // 使用者
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1018Store/getglobalApplyOne', {"global_id": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        this.userlist = this.form.user_id;
                    })
            } else {
                //申请者
                this.userapplicantlist = this.$store.getters.userinfo.userid;
                if (this.userapplicantlist !== null && this.userapplicantlist !== '') {
                    let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.appcenter_id = lst.centerNmae;
                    this.form.appgroup_id = lst.groupNmae;
                    this.form.appteam_id = lst.teamNmae;
                    this.form.applicant_id = this.$store.getters.userinfo.userid;
                }
                //使用者
                this.useridlist = this.$store.getters.userinfo.userid;
                if (this.useridlist !== null && this.useridlist !== '') {
                    let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.center_id = lst.centerNmae;
                    this.form.group_id = lst.groupNmae;
                    this.form.team_id = lst.teamNmae;
                    this.form.user_id = this.$store.getters.userinfo.userid;
                }
                this.loading = false;
            }
        },
        created() {
            // this.disabled = this.$route.params.disabled;
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
        //警告框
        methods: {
            // 申请人
            getApplicantids(val) {
                this.form.applicant_id = val;
                let lst = getOrgInfoByUserId(val);
                this.form.appcenter_id = lst.centerNmae;
                this.form.appgroup_id = lst.groupNmae;
                this.form.appteam_id = lst.teamNmae;
                if (!this.form.applicant_id || this.form.applicant_id === '' || val === "undefined") {
                    this.error_applicant = this.$t('normal.error_08') + this.$t('label.applicant');
                } else {
                    this.error_applicant = "";
                }
            },
            // 使用者
            getUserids(val) {
                this.form.user_id = val;
                let lst = getOrgInfoByUserId(val);
                this.form.center_id = lst.centerNmae;
                this.form.group_id = lst.groupNmae;
                this.form.team_id = lst.teamNmae;
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
                    this.error_user = this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_USER');
                } else {
                    this.error_user = "";
                }
            },
            // 保存
            buttonClick(val) {
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                        //判断数据库中是否存在该组件
                        if (this.$route.params._id) {
                            this.form.global_id = this.$route.params._id;
                            this.form.payment = moment(this.form.payment).format('YYYY-MM-DD');
                            this.loading = true;
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
                            this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
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

<style rel="stylesheet/scss" lang="scss">

</style>
