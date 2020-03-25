<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false'  :disabled="false" maxlength='36' style="width: 20vw" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input  v-show='false' :disabled="false" maxlength='36' style="width: 20vw" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input  v-show='false' :disabled="false" maxlength='36' style="width: 20vw" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error_userids" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disabled" :error="error_userids" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 19.7vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application_date">
                <el-date-picker :disabled="!disabled" style="width: 20vw" type="date"
                                v-model="form.application_date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_STAIR')" prop="firstclass">
                <dicselect
                  :code="code"
                  :data="form.firstclass"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getfirstclass"
                  style="width: 20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_SECONDARY')" prop="twoclass" v-show="show5">
                <dicselect
                  :code="code1"
                  :data="form.twoclass"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="gettwoclass"
                  style="width: 20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error_nominees" :label="$t('label.PFANS2022VIEW_NOMINEES')" v-show="show1" prop="nominees">
                <user :disabled="!disabled" :error="error_nominees" :selectType="selectType"  @getUserids ="getNomineeids"
                      style="width: 19.7vw" :userlist="nomineeslist"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EXPERIENCE')" v-show="show4">
                <el-input :disabled="!disabled1" maxlength='20' style="width: 20vw"
                          v-model="form.experience"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_AMOUNT')">
                <el-input :disabled="true" maxlength="10" style="width: 20vw" v-model="form.amoutmoney"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_JOININGDAY')" v-show="show1" prop="joiningday">
                <el-date-picker :disabled="!disabled" style="width: 20vw" type="date"
                                v-model="form.joiningday"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_ENTERINGFORM')" v-show="show1" prop="enteringform">
                <dicselect
                  :code="code3"
                  :data="form.enteringform"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getenteringform"
                  style="width: 20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_RECOMMENDATIONDAY')" prop="recommendationday"
                            v-show="show1">
                <el-date-picker :disabled="!disabled" style="width: 20vw" type="date"
                                v-model="form.recommendationday"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_REGINSTRATIONDAY')" v-show="show1" prop="reginstrationday">
                <el-date-picker :disabled="!disabled" style="width: 20vw" type="date"
                                v-model="form.reginstrationday"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_NOMINEERELATIONSHIP')" label-width="5rem" v-show="show1" prop="nomineerelationship">
                <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                          v-model="form.nomineerelationship"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_WEDDINGDAY')" prop="weddingday" v-show="show2">
                <el-date-picker :disabled="!disabled" style="width: 20vw" type="date"
                                v-model="form.weddingday"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_SPOUSENAME')" prop="spousename" v-show="show2">
                <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                          v-model="form.spousename"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item :label="$t('label.remarks')" v-show="show3">
              <el-input :disabled="!disabled" style="width: 72vw" type="textarea" v-model="form.remarks"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.enclosure')">
                <el-upload
                  :action="upload"
                  :file-list="fileList"
                  :on-remove="fileRemove"
                  :on-preview="fileDownload"
                  :on-success="fileSuccess"
                  :on-error="fileError"
                  class="upload-demo"
                  drag
                  ref="upload">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em></div>
                </el-upload>
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
    import user from "../../../components/user.vue";
    import PFANS2022View from "../PFANS2022/PFANS2022View.vue";
    import dicselect from "../../../components/dicselect.vue";
    import {Message} from 'element-ui'
    import {downLoadUrl, getDictionaryInfo, getUserInfo, getOrgInfoByUserId, uploadUrl} from '@/utils/customize';
    import moment from "moment";

    export default {
        name: 'PFANS2022FormView',
        components: {
            EasyNormalContainer,
            PFANS2022View,
            user,
            dicselect
        },
        data() {
            var checkuser = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    this.error_userids = this.$t('normal.error_09') + this.$t('label.applicant');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                } else {
                    this.error_userids = "";
                    return callback();
                }
            };
            var checknominees = (rule, value, callback) => {
                if(this.show1){
                    if (!value || value === '' || value === "undefined") {
                        this.error_nominees = this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_NOMINEES');
                        return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_NOMINEES')));
                    } else {
                        this.error_nominees = "";
                        return callback();
                    }
                }
                else{
                    this.error_nominees = "";
                    return callback();
                }
            };
            return {
                centerid: '',
                groupid: '',
                teamid: '',
                loading: false,
                error_userids: '',
                error_nominees:'',
                selectType: "Single",
                userlist: "",
                nomineeslist: "",
                title: "title.PFANS2022VIEW",
                editableTabsValue: '0',
                editableTabs: [],
                buttonList: [],
                tabIndex: 0,
                multiple: false,
                form: {
                    casgiftapplyid: '',
                    firstclass: '',
                    twoclass: '',
                    team_id: '',
                    center_id: '',
                    group_id: '',
                    user_id: '',
                    nomineerelationship: '',
                    joiningday: '',
                    enteringform: '',
                    recommendationday: '',
                    reginstrationday: '',
                    weddingday: '',
                    spousename: '',
                    application_date: moment(new Date()).format("YYYY-MM-DD"),
                    amoutmoney: '',
                    remarks: '',
                    nominees: '',
                    uploadfile: '',
                    payment: '0',
                    aexperience:'',
                    experience:'',
                },
                code: 'PR024',
                code1: ' ',
                code3: 'PR039',
                disable: false,
                disabled: true,
                disabled1: false,
                disabled2: false,
                menuList: [],
                rules: {
                    user_id: [
                        {
                            required: true,
                            validator: checkuser,
                            trigger: 'change'
                        },
                    ],
                    firstclass: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_STAIR'),
                            trigger: 'change'
                        },
                    ],
                    twoclass: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_SECONDARY'),
                            trigger: 'change'
                        },
                    ],
                    application_date: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.application_date'),
                            trigger: 'change'
                        },
                    ],
                    weddingday: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_WEDDINGDAY'),
                            trigger: 'change'
                        },
                    ],
                    spousename: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_SPOUSENAME'),
                            trigger: 'change'
                        },
                    ],
                    nominees: [
                        {
                            required: true,
                            validator: checknominees,
                            trigger: 'change'
                        },
                    ],
                    nomineerelationship: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS2022VIEW_NOMINEERELATIONSHIP'),
                            trigger: 'change',
                        },
                    ],
                    joiningday: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_JOININGDAY'),
                            trigger: 'change'
                        },
                    ],
                    enteringform: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_ENTERINGFORM'),
                            trigger: 'change'
                        },
                    ],
                    recommendationday: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_ENTERINGFORM'),
                            trigger: 'change'
                        },
                    ],
                    reginstrationday: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_REGINSTRATIONDAY'),
                            trigger: 'change'
                        },
                    ],
                },
                show1: false,
                show2: false,
                show3: false,
                show4: false,
                show5: true,
                canStart: false,
                twoclass: '',
                firstclass: '',
                fileList: [],
                upload: uploadUrl(),
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS2022Store/getCasgiftApplyOne', {"casgiftapplyid": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        let rst = getOrgInfoByUserId(response.user_id);
                        this.centerid = rst.centerNmae;
                        this.groupid= rst.groupNmae;
                        this.teamid= rst.teamNmae;
                        this.userlist = this.form.user_id;
                        this.nomineeslist = this.form.nominees;
                        if (this.form.firstclass === 'PR024004') {
                            this.show2 = true;
                            this.rules.weddingday[0].required = false;
                        }
                        if (this.form.firstclass === 'PR024003') {
                            this.show1 = true;
                            this.rules.weddingday[0].required = false;
                        }
                        if (this.form.firstclass === 'PR024001') {
                            this.show3 = true;
                            this.rules.weddingday[0].required = false;
                        }
                        if (this.form.firstclass === 'PR024004') {
                            this.show3 = true;
                            this.rules.weddingday[0].required = true;
                        }
                        if (this.form.firstclass === 'PR024005') {
                            this.show3 = true;
                            this.rules.weddingday[0].required = false;
                        }
                        if (this.form.firstclass === 'PR024006') {
                            this.show3 = true;
                            this.rules.weddingday[0].required = false;
                        }
                        if (this.form.firstclass === 'PR024007') {
                            this.show3 = true;
                            this.rules.weddingday[0].required = false;
                        }
                        if (this.form.twoclass === 'PR034001') {
                            this.show1 = true;
                            this.show4 = true;
                            this.rules.weddingday[0].required = false;
                        }
                        if (this.form.twoclass === 'PR034002') {
                            this.show1 = false;
                            this.show4 = false;
                            this.rules.weddingday[0].required = false;
                        }
                        if (this.form.status === '2' || !this.disabled) {
                            this.disable = false;
                            this.disabled1 = false;
                        } else {
                            this.disable = true;
                            this.disabled1 = false;
                        }
                        if (this.form.status === '3' || this.disabled) {
                            this.disable = true;
                            this.disabled1 = false;
                        }
                        if(this.form.aexperience === '0'){
                            this.form.amoutmoney = 4000;
                            this.form.experience = this.$t('label.yes');
                        }else if(this.form.aexperience === '1'){
                            this.form.amoutmoney = 500;
                            this.form.experience = this.$t('label.no');
                        }else{
                            this.form.amoutmoney = 0;
                            this.form.experience = this.$t('label.PFANS2022VIEW_UNFILLED');
                        }
                      this.getfirstclass(this.form.firstclass)
                        if (this.form.uploadfile != "") {
                            let uploadfile = this.form.uploadfile.split(";");
                            for (var i = 0; i < uploadfile.length; i++) {
                                if (uploadfile[i].split(",")[0] != "") {
                                    let o = {};
                                    o.name = uploadfile[i].split(",")[0];
                                    o.url = uploadfile[i].split(",")[1];
                                    this.fileList.push(o)
                                }
                            }
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
            } else {
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                    let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.centerid = rst.centerNmae;
                    this.groupid= rst.groupNmae;
                    this.teamid= rst.teamNmae;
                    this.form.center_id = rst.centerId;
                    this.form.group_id = rst.groupId;
                    this.form.team_id = rst.teamId;
                    this.form.user_id = this.$store.getters.userinfo.userid;
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
            getUserids(val) {
                this.form.user_id = val;
                let rst = getOrgInfoByUserId(val);
                this.centerid = rst.centerNmae;
                this.groupid = rst.groupNmae;
                this.teamid = rst.teamNmae;
                this.form.center_id = rst.centerId;
                this.form.group_id = rst.groupId;
                this.form.team_id = rst.teamId;
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
                    this.error_userids = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.error_userids = "";
                }
            },
            getNomineeids(val) {
                this.form.nominees = val;
                if (!this.form.nominees || this.form.nominees === '' || val === "undefined") {
                    this.error_nominees = this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_NOMINEES');
                } else {
                    this.error_nominees = "";
                }
                let lst = getUserInfo(val);
                this.form.aexperience = lst.userinfo.experience;
                if(this.form.aexperience === '0'){
                    this.form.amoutmoney = 4000;
                    this.form.experience = this.$t('label.yes');
                }else if(this.form.aexperience === '1'){
                    this.form.amoutmoney = 500;
                    this.form.experience = this.$t('label.no');
                }else{
                    this.form.amoutmoney = 0;
                    this.form.experience = this.$t('label.PFANS2022VIEW_UNFILLED');
                }
            },
            getfirstclass(val) {
                this.form.firstclass = val;
                if (val === "PR024001") {
                    this.code1 = 'PR025';
                    this.gettwoclass("PR025001");
                    this.disable = true;
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = true;
                    this.show4 = false;
                    this.show5 = true;
                    this.rules.nominees[0].required = false;
                    this.rules.nomineerelationship[0].required = false;
                    this.rules.joiningday[0].required = false;
                    this.rules.enteringform[0].required = false;
                    this.rules.recommendationday[0].required = false;
                    this.rules.reginstrationday[0].required = false;
                    this.rules.weddingday[0].required = false;
                    this.rules.spousename[0].required = false;
                    this.rules.twoclass[0].required = true;
                } else if (val === "PR024003") {
                    this.code1 = 'PR034';
                    this.gettwoclass("PR034001");
                    this.disable = true;
                    this.show1 = true;
                    this.show2 = false;
                    this.show3 = false;
                    this.show4 = true;
                    this.show5 = true;
                    this.rules.nominees[0].required = true;
                    this.rules.nomineerelationship[0].required = true;
                    this.rules.joiningday[0].required = true;
                    this.rules.enteringform[0].required = true;
                    this.rules.recommendationday[0].required = true;
                    this.rules.reginstrationday[0].required = true;
                    this.rules.weddingday[0].required = false;
                    this.rules.spousename[0].required = false;
                    this.rules.twoclass[0].required = true;
                } else if (val === "PR024004") {
                    this.code1 = 'PR035';
                    this.gettwoclass("PR035001");
                    this.disable = true;
                    this.show1 = false;
                    this.show2 = true;
                    this.show3 = true;
                    this.show4 = false;
                    this.show5 = true;
                    this.rules.nominees[0].required = false;
                    this.rules.nomineerelationship[0].required = false;
                    this.rules.joiningday[0].required = false;
                    this.rules.enteringform[0].required = false;
                    this.rules.recommendationday[0].required = false;
                    this.rules.reginstrationday[0].required = false;
                    this.rules.weddingday[0].required = true;
                    this.rules.spousename[0].required = true;
                    this.rules.twoclass[0].required = true;
                } else if (val === "PR024005") {
                    this.code1 = 'PR036';
                    this.gettwoclass("PR036001");
                    this.disable = true;
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = true;
                    this.show4 = false;
                    this.show5 = true;
                    this.rules.nominees[0].required = false;
                    this.rules.nomineerelationship[0].required = false;
                    this.rules.joiningday[0].required = false;
                    this.rules.enteringform[0].required = false;
                    this.rules.recommendationday[0].required = false;
                    this.rules.reginstrationday[0].required = false;
                    this.rules.weddingday[0].required = false;
                    this.rules.spousename[0].required = false;
                    this.rules.twoclass[0].required = true;
                } else if (val === "PR024006") {
                    this.code1 = 'PR037';
                    this.gettwoclass("PR037001");
                    this.disable = true;
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = true;
                    this.show4 = false;
                    this.show5 = true;
                    this.rules.nominees[0].required = false;
                    this.rules.nomineerelationship[0].required = false;
                    this.rules.joiningday[0].required = false;
                    this.rules.enteringform[0].required = false;
                    this.rules.recommendationday[0].required = false;
                    this.rules.reginstrationday[0].required = false;
                    this.rules.weddingday[0].required = false;
                    this.rules.spousename[0].required = false;
                    this.rules.twoclass[0].required = true;
                } else if (val === "PR024007") {
                    this.code1 = 'PR038';
                    this.gettwoclass("PR038001");
                    this.disable = true;
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = true;
                    this.show4 = false;
                    this.show5 = true;
                    this.rules.nominees[0].required = false;
                    this.rules.nomineerelationship[0].required = false;
                    this.rules.joiningday[0].required = false;
                    this.rules.enteringform[0].required = false;
                    this.rules.recommendationday[0].required = false;
                    this.rules.reginstrationday[0].required = false;
                    this.rules.weddingday[0].required = false;
                    this.rules.spousename[0].required = false;
                    this.rules.twoclass[0].required = true;
                }
            },
            gettwoclass(val) {
                this.form.twoclass = val;
                let dictionaryInfo = getDictionaryInfo(val);
                if (dictionaryInfo) {
                    this.twoclass = dictionaryInfo.value2;
                    this.form.amoutmoney = dictionaryInfo.value2;
                }
                if (val === "PR034002") {
                    this.code1 = 'PR034';
                    this.disable = true;
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = false;
                    this.show4 = false;
                    this.rules.nominees[0].required = false;
                    this.rules.nomineerelationship[0].required = false;
                    this.rules.joiningday[0].required = false;
                    this.rules.enteringform[0].required = false;
                    this.rules.recommendationday[0].required = false;
                    this.rules.reginstrationday[0].required = false;
                    this.rules.weddingday[0].required = false;
                    this.rules.spousename[0].required = false;
                }
                if(val === "PR034001"){
                    this.code1 = 'PR034';
                    this.disable = true;
                    this.show1 = true;
                    this.show2 = false;
                    this.show3 = false;
                    this.show4 = true;
                    this.rules.nominees[0].required = true;
                    this.rules.nomineerelationship[0].required = true;
                    this.rules.joiningday[0].required = true;
                    this.rules.enteringform[0].required = true;
                    this.rules.recommendationday[0].required = true;
                    this.rules.reginstrationday[0].required = true;
                    this.rules.weddingday[0].required = false;
                    this.rules.spousename[0].required = false;
                }
            },
            getenteringform(val) {
                this.form.enteringform = val;
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
            fileError(err, file, fileList) {
                Message({
                    message: this.$t("normal.error_04"),
                    type: 'error',
                    duration: 5 * 1000
                });
            },
            fileRemove(file, fileList) {
                this.fileList = [];
                this.form.uploadfile = "";
                for (var item of fileList) {
                    let o = {};
                    o.name = item.name;
                    o.url = item.url;
                    this.fileList.push(o);
                    this.form.uploadfile += item.name + "," + item.url + ";"
                }
            },
            fileDownload(file) {
                if (file.url) {
                    var url = downLoadUrl(file.url);
                    window.open(url);
                }

            },
            fileSuccess(response, file, fileList) {
                this.fileList = [];
                this.form.uploadfile = "";
                for (var item of fileList) {
                    let o = {};
                    o.name = item.name;
                    if (!item.url) {
                        o.url = item.response.info;
                    } else {
                        o.url = item.url;
                    }
                    this.fileList.push(o);
                    this.form.uploadfile += o.name + "," + o.url + ";"
                }
            },
            buttonClick(val) {
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                        if(this.form.firstclass === 'PR024003'){
                            this.form.remarks = ' ';
                        }
                        if(this.form.firstclass === 'PR024001'){
                            this.form.nominees = ' ';
                            this.form.nomineerelationship = ' ';
                            this.form.joiningday = ' ';
                            this.form.enteringform = ' ';
                            this.form.recommendationday = ' ';
                            this.form.reginstrationday = ' ';
                            this.form.weddingday = ' ';
                            this.form.spousename = ' ';
                            this.rules.weddingday[0].required = false;
                        }
                        if(this.form.firstclass === 'PR024003'){
                            this.form.remarks = ' ';
                            this.form.weddingday = ' ';
                            this.form.spousename = ' ';
                            this.rules.weddingday[0].required = false;
                        }
                        if(this.form.firstclass === 'PR024004'){
                            this.form.nominees = ' ';
                            this.form.nomineerelationship = ' ';
                            this.form.joiningday = ' ';
                            this.form.enteringform = ' ';
                            this.form.recommendationday = ' ';
                            this.form.reginstrationday = ' ';
                            this.rules.weddingday[0].required = false;
                        }
                        if(this.form.firstclass === 'PR024005'){
                            this.form.nominees = ' ';
                            this.form.nomineerelationship = ' ';
                            this.form.joiningday = ' ';
                            this.form.enteringform = ' ';
                            this.form.recommendationday = ' ';
                            this.form.reginstrationday = ' ';
                            this.form.weddingday = ' ';
                            this.form.spousename = ' ';
                            this.rules.weddingday[0].required = false;
                        }
                        if(this.form.firstclass === 'PR024006'){
                            this.form.nominees = ' ';
                            this.form.nomineerelationship = ' ';
                            this.form.joiningday = ' ';
                            this.form.enteringform = ' ';
                            this.form.recommendationday = ' ';
                            this.form.reginstrationday = ' ';
                            this.form.weddingday = ' ';
                            this.form.spousename = ' ';
                            this.rules.weddingday[0].required = false;
                        }
                        if(this.form.firstclass === 'PR024007'){
                            this.form.nominees = ' ';
                            this.form.nomineerelationship = ' ';
                            this.form.joiningday = ' ';
                            this.form.enteringform = ' ';
                            this.form.recommendationday = ' ';
                            this.form.reginstrationday = ' ';
                            this.form.weddingday = ' ';
                            this.form.spousename = ' ';
                            this.rules.weddingday[0].required = false;
                        }
                        if (this.$route.params._id) {
                            this.form.casgiftapplyid = this.$route.params._id;
                            this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
                            this.loading = true;
                            this.$store
                                .dispatch('PFANS2022Store/updateCasgiftApply', this.form)
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
                                .dispatch('PFANS2022Store/insert', this.form)
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
