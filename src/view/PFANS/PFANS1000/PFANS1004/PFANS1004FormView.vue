<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading" :buttonList="buttonList"
                         @workflowState="workflowState" :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" label-width="8vw" label-position="top" style="padding: 3vw" :rules="rules"
                 ref="refform">
          <el-row>
            <el-col :span="8">
              <el-form-item  :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input  v-show='false' v-model="form.center_id" :disabled="true"  maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input  v-show='false' v-model="form.group_id" :disabled="true"  maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="team_id">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input  v-show='false' v-model="form.team_id" :disabled="true"  maxlength='36'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error"  :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disabled" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_INVESTIGATOR')" prop="investigator">
                <el-input v-model="form.investigator" :disabled="!disabled" style="width:20vw" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_SCHEDULEDDATE')" prop="scheduleddate" >
                <el-date-picker :disabled="!disabled" type="date" v-model="form.scheduleddate" style="width:20vw" ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item :label="$t('label.PFANS1004VIEW_FILENAME')" prop="filename">
                <el-input v-model="form.filename" type="textarea" :disabled="!disabled" style="width:72vw" maxlength='50'></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_CAREERPLAN')"   prop="careerplan">
                <span style="margin-right: 1rem ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                <el-switch
                  :disabled="!disabled"
                  v-model="form.careerplan"
                  active-value="1"
                  inactive-value="0"
                  @change="radiochange">
                </el-switch>
                <span style="margin-left: 1rem ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_BUSINESSPLANTYPE')" prop="businessplantype" v-show="show">
                <dicselect
                  :code="code"
                  :data="form.businessplantype"
                  :multiple="multiple"
                  @change="getBusinessplantype"
                  style="width:20vw"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_CLASSIFICATIONTYPE')" prop="classificationtype"  v-show="show1">
                <dicselect
                  :code="code1"
                  :data="form.classificationtype"
                  :multiple="multiple"
                  @change="getClassificationtype"
                  style="width:20vw"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_BUSINESSPLANBALANCE')" prop="businessplanbalance" v-show="show">
                <el-input-number v-model="form.businessplanbalance" controls-position="right" style="width:20vw" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_AMOUNTTOBEGIVEN')" prop="amounttobegiven">
                <el-input-number v-model="form.amounttobegiven" controls-position="right" style="width:20vw" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004FORMVIEW_DECISIVE')" prop="decisive">
                <dicselect
                  :code="code4"
                  :data="form.decisive"
                  :multiple="multiple"
                  @change="getDecisive"
                  style="width:20vw"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004FORMVIEW_PERIOD')" prop="period" v-show="show6">
                <el-input v-model="form.period" :disabled="true" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.startdate')" prop="startdate" v-show="show5">
                <el-date-picker :disabled="!disabled" type="date" v-model="form.startdate" style="width:20vw" ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.enddate')" prop="enddate" v-show="show5">
                <el-date-picker :disabled="!disabled" type="date" v-model="form.enddate" style="width:20vw" ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_GIST')" prop="gist">
                <el-input v-model="form.gist" type="textarea" :disabled="!disabled" :placeholder="$t('label.PFANS1004VIEW_GISTTAB')" style="width: 72vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_PURCHASSUPPORT')" prop="purchassupport">
                <el-input v-model="form.purchassupport"  type="textarea" :rows="3" :disabled="!disabled" style="width:72vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.numbers')" prop="numbers">
                <el-input-number v-model="form.numbers" controls-position="right" style="width:20vw" :disabled="!disabled" :min="0" :max="1000000000" :precision="2" @change="changeTotal"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_UNITPRICE')" prop="unitprice">
                <el-input-number v-model="form.unitprice" controls-position="right" style="width:20vw"  :disabled="!disabled" :min="0" :max="1000000000" :precision="2" @change="changeTotal"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_AMOUNT')" prop="money">
                <el-input-number v-model="form.money" :controls="false" style="width:20vw" :disabled="true" :min="0" :max="1000000000" :precision="2"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_THISPROJECT')" prop="thisproject" label-width="7rem">
                <el-input v-model="form.thisproject" :disabled="true" style="width: 20vw;" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_SETTINGPLACE')" label-width="6rem">
                <el-input v-model="form.settingplace" :disabled="!disabled" style="width: 20vw;" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_ADDBOOK')">
                <dicselect
                  :code="code2"
                  :data="form.addbook"
                  :multiple="multiple"
                  @change="getAddbook"
                  style="width:20vw"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_SALEQUOTATION')" prop="salequotation">
                <dicselect
                  :code="code3"
                  :data="form.salequotation"
                  :multiple="multiple"
                  @change="getSalequotation"
                  style="width:20vw"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_REASONSFORQUOTATION')" label-width="6rem" v-show="show2">
                <el-input v-model="form.reasonsforquotation" :disabled="!disabled" style="width: 70vw;padding-left:2rem" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.enclosure')" v-show="show3">
                <el-upload
                  v-model="form.uploadfile"
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
    import dicselect from "../../../components/dicselect.vue";
    import user from "../../../components/user.vue";
    import { Message } from 'element-ui'
    import {getOrgInfoByUserId} from '@/utils/customize';
    import {downLoadUrl,getDictionaryInfo, uploadUrl} from '@/utils/customize';
    import moment from "moment";

    export default {
        name: 'PFANS1004FormView',
        components: {
            EasyNormalContainer,
            getOrgInfoByUserId,
            dicselect,
            user
        },
        data() {
            var checkuser = (rule, value, callback) => {
                if(!value || value === '' || value ==="undefined"){
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                }else{
                    this.error = "";
                    return callback();
                }

            };
            var validateStartdate = (rule, value, callback) => {
                if (this.form.startdate !== null && this.form.startdate !== '') {
                    if (moment(value).format('YYYY-MM-DD') > moment(this.form.enddate).format('YYYY-MM-DD')) {
                        callback(new Error(this.$t('label.startdate') + this.$t('normal.error_checkTime2') + this.$t('label.enddate')));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            var validateEnddate = (rule, value, callback) => {
                if (this.form.enddate !== null && this.form.enddate !== '') {
                    if (moment(value).format('YYYY-MM-DD') < moment(this.form.startdate).format('YYYY-MM-DD')) {
                        callback(new Error(this.$t('label.enddate') + this.$t('normal.error_checkTime1') + this.$t('label.startdate')));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };

            var CheckGiven = (rule, value, callback) => {
                if(this.form.careerplan === 0){
                    if (Number(this.form.amounttobegiven) > Number(this.form.businessplanbalance)) {
                        callback(new Error(this.$t('label.PFANS1004VIEW_AMOUNTTOBEGIVEN') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS1004VIEW_BUSINESSPLANBALANCE')));
                    } else {
                        callback();
                    }
                }else{
                    callback();
                }
            };
            return {
                centerid: '',
                groupid: '',
                teamid: '',
                userlist: "",
                loading: false,
                error: '',
                selectType: "Single",
                title: 'title.PFANS1004VIEW',
                buttonList: [],
                multiple: false,
                form: {
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    user_id: '',
                    investigator: '',
                    filename: '',
                    scheduleddate: moment(new Date()).format("YYYY-MM-DD"),
                    careerplan: true,
                    businessplantype: '',
                    classificationtype: '',
                    businessplanbalance: 0,
                    gist: '',
                    purchassupport: '',
                    numbers: '',
                    unitprice: '',
                    money: '',
                    decisive: '',
                    period: '',
                    startdate: '',
                    enddate: '',
                    amounttobegiven: '',
                    thisproject: '',
                    settingplace: '',
                    addbook: '',
                    salequotation: '',
                    reasonsforquotation: '',
                    equipment:'',
                    uploadfile: '',
                    number: '',
                },
                code: 'PJ138',
                code1: 'PJ139',
                code2: 'PJ010',
                code3: 'PJ013',
                code4: 'PJ011',
                disabled: true,
                menuList: [],
                rules: {
                    user_id: [
                        {
                            required: true,
                            validator: checkuser,
                            trigger: 'change'
                        },
                    ],
                    scheduleddate: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_SCHEDULEDDATE'),
                            trigger: 'change'
                        },
                    ],
                    filename: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_FILENAME'),
                            trigger: 'change'
                        },
                    ],
                    amounttobegiven: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_AMOUNTTOBEGIVEN'),
                        },
                        {validator: CheckGiven, trigger: 'change'}
                    ],
                    gist: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_GIST'),
                            trigger: 'change'
                        },
                    ],
                    purchassupport: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_PURCHASSUPPORT'),
                            trigger: 'change'
                        },
                    ],
                    numbers: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.numbers'),
                            trigger: 'change'
                        },
                    ],
                    unitprice: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_UNITPRICE'),
                            trigger: 'change'
                        },
                    ],
                    money: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_AMOUNT'),
                            trigger: 'change'
                        },
                    ],
                    businessplantype: [
                        {
                            required:  false,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_BUSINESSPLANTYPE'),
                            trigger: 'change'
                        },
                    ],
                    classificationtype: [
                        {
                            required:  false,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_CLASSIFICATIONTYPE'),
                            trigger: 'change'
                        },
                    ],
                    businessplanbalance: [
                        {
                            required:  true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_BUSINESSPLANBALANCE'),
                            trigger: 'change'
                        },
                    ],
                    salequotation: [
                        {
                            required:  true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_SALEQUOTATION'),
                            trigger: 'change'
                        },
                    ],
                    decisive: [
                        {
                            required:  true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS1004FORMVIEW_DECISIVE'),
                            trigger: 'change'
                        },
                    ],
                    period: [
                        {
                            required:  true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1004FORMVIEW_PERIOD'),
                            trigger: 'change'
                        },
                    ],
                    startdate: [
                        {
                            required:  true,
                            message: this.$t('normal.error_09') + this.$t('label.startdate'),
                            trigger: 'change'
                        },{validator: validateStartdate, trigger: 'change'}
                    ],
                    enddate: [
                        {
                            required:  true,
                            message: this.$t('normal.error_09') + this.$t('label.enddate'),
                            trigger: 'change'
                        },{validator: validateEnddate, trigger: 'change'}
                    ],
                },
                show: true,
                show1: '',
                show2: false,
                show3: false,
                show4: false,
                show5: false,
                show6: true,
                canStart:false,
                fileList: [],
                upload: uploadUrl(),
            };
        },

        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1004Store/getJudgementOne', {"judgementid": this.$route.params._id})
                    .then(response => {
                        if(response){
                            this.form = response.judgement;
                            let rst = getOrgInfoByUserId(response.judgement.user_id);
                            if(rst){
                                this.centerid = rst.centerNmae;
                                this.groupid= rst.groupNmae;
                                this.teamid= rst.teamNmae;
                                this.form.thisproject = rst.personalcode;
                            }
                            this.userlist = this.form.user_id;
                            this.getDecisive(this.form.decisive);
                            this.getBusinessplantype(this.form.businessplantype);
                            if (this.form.careerplan === '1') {
                                this.show = true;
                                this.rules.businessplantype[0].required = true;
                                this.rules.businessplanbalance[0].required = true;
                            } else{
                                this.show = false;
                                this.show1 = false;
                                this.rules.businessplantype[0].required = false;
                                this.rules.businessplanbalance[0].required = false;
                                this.rules.classificationtype[0].required = false;
                            }
                            if (this.form.businessplantype === 'PR002005') {
                                this.show1 = true;
                            } else if (this.form.salequotation === 'PJ013001') {
                                this.show2 = true;
                            } else if (this.form.salequotation === 'PJ013003') {
                                this.show2 = true;
                            }
                            if (this.form.addbook === "PJ010001") {
                                this.show3 = true;
                            }else if (this.form.addbook === "PJ010002") {
                                this.show3 = false;
                            }
                            if (this.form.status === '2') {
                                this.disable = false;
                            }
                            if(this.form.uploadfile != null){
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
                    if(rst) {
                        this.centerid = rst.centerNmae;
                        this.groupid= rst.groupNmae;
                        this.teamid= rst.teamNmae;
                        this.form.center_id = rst.centerId;
                        this.form.group_id = rst.groupId;
                        this.form.team_id = rst.teamId;
                        this.form.thisproject = rst.personalcode;
                    }
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
            if (this.form.careerplan === '1') {
                this.show = true;
                this.show1 = false;
                this.rules.businessplantype[0].required = true;
                this.rules.businessplanbalance[0].required = true;
                this.rules.classificationtype[0].required = false;
                this.rules.startdate[0].required = false;
                this.rules.enddate[0].required = false;
            } else {
                this.show = false;
                this.show1 = false;
                this.rules.businessplantype[0].required = false;
                this.rules.businessplanbalance[0].required = false;
                this.rules.classificationtype[0].required = false;
                this.rules.startdate[0].required = false;
                this.rules.enddate[0].required = false;
            }
            if (this.form.decisive === "PJ011001") {
                this.show4 = false;
                this.show5 = false;
                this.show6 = true;
                this.rules.startdate[0].required = false;
                this.rules.enddate[0].required = false;
            }else if (this.form.decisive === "PJ011002") {
                this.show4 = true;
                this.show5 = false;
                this.show6 = true;
                this.rules.startdate[0].required = false;
                this.rules.enddate[0].required = false;
            }else if (this.form.decisive === "PJ011003") {
                this.show4 = false;
                this.show5 = true;
                this.show6 = false;
                this.rules.startdate[0].required = true;
                this.rules.enddate[0].required = true;
                this.rules.period[0].required = false;
            }else if (this.form.decisive === "PJ011004") {
                this.show4 = false;
                this.show5 = false;
                this.show6 = false;
                this.rules.startdate[0].required = false;
                this.rules.enddate[0].required = false;
                this.rules.period[0].required = false;
            }
        },
        methods: {
            getUserids(val) {
                this.userlist = val;
                this.form.user_id = val;
                let rst = getOrgInfoByUserId(val);
                if(rst){
                    this.centerid = rst.centerNmae;
                    this.groupid = rst.groupNmae;
                    this.teamid = rst.teamNmae;
                    this.form.center_id = rst.centerId;
                    this.form.group_id = rst.groupId;
                    this.form.team_id = rst.teamId;
                }else{
                    this.centerid =  '';
                    this.groupid =  '';
                    this.teamid =  '';
                    this.form.center_id = '';
                    this.form.group_id =  '';
                    this.form.team_id =  '';
                }
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.error = "";
                }
            },
            getClassificationtype(val) {
                this.form.classificationtype = val;
            },
            getBusinessplantype(val) {
                this.form.businessplantype = val;
                if (val === "PJ138006") {
                    this.show1 = true;
                    this.rules.classificationtype[0].required = true;
                }else if (val === "PJ138001") {
                    this.show1 = false;
                    this.rules.classificationtype[0].required = false;
                }else if (val === "PJ138002") {
                    this.show1 = false;
                    this.rules.classificationtype[0].required = false;
                }else if (val === "PJ138003") {
                    this.show1 = false;
                    this.rules.classificationtype[0].required = false;
                }else if (val === "PJ138004") {
                    this.show1 = false;
                    this.rules.classificationtype[0].required = false;
                }else if (val === "PJ138005") {
                    this.show1 = false;
                    this.rules.classificationtype[0].required = false;
                }
            },
            getAddbook(val) {
                this.form.addbook = val;
                if (val === "PJ010001") {
                    this.show3 = true;
                }else if (val === "PJ010002") {
                    this.show3 = false;
                }
            },
            getDecisive(val) {
                debugger
                this.form.decisive = val;
                let dictionaryInfo = getDictionaryInfo(val);
                if (val === "PJ011001") {
                    this.show4 = false;
                    this.show5 = false;
                    this.show6 = true;
                    this.rules.startdate[0].required = false;
                    this.rules.enddate[0].required = false;
                    if (dictionaryInfo) {
                        this.form.period = dictionaryInfo.value2;
                    }
                }else if (val === "PJ011002") {
                    this.show4 = true;
                    this.show5 = false;
                    this.show6 = true;
                    this.rules.startdate[0].required = false;
                    this.rules.enddate[0].required = false;
                    if (dictionaryInfo) {
                        this.form.period = dictionaryInfo.value2;
                    }
                }else if (val === "PJ011003") {
                    this.show4 = true;
                    this.show5 = false;
                    this.show6 = true;
                    this.rules.startdate[0].required = false;
                    this.rules.enddate[0].required = false;
                    if (dictionaryInfo) {
                        this.form.period = dictionaryInfo.value2;
                    }
                }else if (val === "PJ011004") {
                    this.show4 = false;
                    this.show5 = true;
                    this.show6 = false;
                    this.rules.startdate[0].required = true;
                    this.rules.enddate[0].required = true;
                    this.rules.period[0].required = false;
                    if (dictionaryInfo) {
                        this.form.period = dictionaryInfo.value2;
                    }
                }else if (val === "PJ011005") {
                    this.show4 = false;
                    this.show5 = false;
                    this.show6 = false;
                    this.rules.startdate[0].required = false;
                    this.rules.enddate[0].required = false;
                    this.rules.period[0].required = false;
                    if (dictionaryInfo) {
                        this.form.period = dictionaryInfo.value2;
                    }
                }
            },
            getSalequotation(val) {
                this.form.salequotation = val;
                if (val === "PJ013002") {
                    this.show2 = false;
                }else if (val === "PJ013001") {
                    this.show2 = true;
                }else if (val === "PJ013003") {
                    this.show2 = true;
                }
            },
            radiochange(val){
                this.form.careerplan = val;
                if (val === '1') {
                    this.show = true;
                    this.show1 = false;
                    if(this.form.businessplantype === 'PR002005'){
                        this.show1 = true;
                        this.rules.classificationtype[0].required = true;
                    }
                    this.rules.businessplantype[0].required = true;
                    this.rules.businessplanbalance[0].required = true;
                }else {
                    this.show = false;
                    this.show1 = false;
                    this.rules.businessplantype[0].required = false;
                    this.rules.businessplanbalance[0].required = false;
                    this.rules.classificationtype[0].required = false;
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
            fileError(err, file, fileList){
                Message({
                    message: this.$t("normal.error_04"),
                    type: 'error',
                    duration: 5 * 1000
                });
            },
            fileRemove(file, fileList){
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
            paramsTitle(){
                this.$router.push({
                    name: 'PFANS1001FormView',
                    params: {
                        title: 4,
                    },
                });
            },
            changeTotal(val){
                this.form.money = Number(this.form.unitprice) * Number(this.form.numbers);
            },
            buttonClick(val) {
                let JudgementVo = {};
                JudgementVo.judgement = this.form;
                if (val === 'back') {
                    this.paramsTitle();
                } else {
                    this.$refs["refform"].validate(valid => {
                        if (valid) {
                            this.loading = true;
                            if (this.form.careerplan === '0') {
                                this.form.businessplantype = "";
                                this.form.businessplanbalance = "";
                                this.form.classificationtype = "";
                            }
                            if (this.form.businessplantype === 'PR002001') {
                                this.form.classificationtype = "";
                            }
                            if (this.form.businessplantype === 'PR002002') {
                                this.form.classificationtype = "";
                            }
                            if (this.form.businessplantype === 'PR002003') {
                                this.form.classificationtype = "";
                            }
                            if (this.form.businessplantype === 'PR002004') {
                                this.form.classificationtype = "";
                            }
                            if (this.form.salequotation === 'PJ013001') {
                                this.form.reasonsforquotation = "";
                            }
                            if (this.form.salequotation === 'PJ013003') {
                                this.form.reasonsforquotation = "";
                            }
                            if (this.form.decisive === 'PJ011001') {
                                this.form.startdate = "";
                                this.form.enddate = "";
                            }
                            if (this.form.decisive === 'PJ011002') {
                                this.form.startdate = "";
                                this.form.enddate = "";
                            }
                            if (this.form.decisive === 'PJ011003') {
                                this.form.startdate = "";
                                this.form.enddate = "";
                            }
                            if (this.form.decisive === 'PJ011005') {
                                this.form.startdate = "";
                                this.form.enddate = "";
                            }
                            this.form.scheduleddate = moment(this.form.scheduleddate).format('YYYY-MM-DD');
                            this.form.equipment = "0";
                            if (this.$route.params._id) {
                                this.form.judgementid = this.$route.params._id;
                                this.$store
                                    .dispatch('PFANS1004Store/updateJudgement', JudgementVo)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false;
                                        if(val !== "update") {
                                            Message({
                                                message: this.$t("normal.success_02"),
                                                type: 'success',
                                                duration: 5 * 1000
                                            });
                                            this.paramsTitle();
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
                                this.$store
                                    .dispatch('PFANS1004Store/createJudgement', JudgementVo)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false;
                                        Message({
                                            message: this.$t("normal.success_01"),
                                            type: 'success',
                                            duration: 5 * 1000
                                        });
                                        this.paramsTitle();
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
                        else{
                            Message({
                                message: this.$t("normal.error_12"),
                                type: 'error',
                                duration: 5 * 1000
                            });
                        }
                    });
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
