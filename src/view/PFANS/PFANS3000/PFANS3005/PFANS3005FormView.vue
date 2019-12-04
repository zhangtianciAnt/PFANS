<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding:2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:11rem" v-model="form.center_id" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:11rem" v-model="form.group_id" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:11rem" v-model="form.team_id" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="erroruser" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disable" :error="erroruser" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 10.14rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application_date">
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
              <el-form-item :label="$t('label.PFANS3005VIEW_LINENUMBER')" prop="linenumber">
                <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                          v-model="form.linenumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_SETPLACE')" prop="setplace">
                <el-input :disabled="!disable" style="width:11rem" maxlength='20'
                          v-model="form.setplace"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorcontroller" :label="$t('label.PFANS3005VIEW_CONTROLLER')" prop="controller">
                <user :disabled="!disable" :error="errorcontroller" :selectType="selectType" :userlist="controllerlist"
                      style="width:10.14rem" v-model="form.controller"
                      @getUserids="getController"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errorusername" :label="$t('label.PFANS3005VIEW_USER')" prop="username">
                <user :disabled="!disable" :error="errorusername" :selectType="selectType" :userlist="usernamelist"
                      style="width:10.14rem" v-model="form.username"
                      @getUserids="getUsername"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.budgetunit')" prop="budgetnumber">
                <dicselect
                  :code="code"
                  :data="form.budgetnumber"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="changebudgetnumber"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005FORMVIEW_CAREERPLAN')"   prop="careerplan">
                <span style="margin-right: 1rem ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                <el-switch
                  :disabled="!disable"
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
              <el-form-item :label="$t('label.PFANS3005FORMVIEW_BUSINESSPLANTYPE')" prop="businessplantype" v-show="show1">
                <dicselect
                  :code="code1"
                  :data="form.businessplantype"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width: 11rem"
                  @change="getBusinessplantype"
                  v-model="form.businessplantype">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003FORMVIEW_CLASSIFICATION')" prop="classificationtype" v-show="show2">
                <dicselect
                  :code="code2"
                  :data="form.classificationtype"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width: 11rem"
                  @change="getClassificationtype">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005FORMVIEW_BUSINESSPLANBALANCE')" prop="businessplanbalance" v-show="show3">
                <el-input-number v-model="form.businessplanbalance"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width: 11rem"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_BUSINESSPLANAMOUNT')" prop="businessplanamount">
                <el-input-number v-model="form.businessplanamount"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:11rem"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_PURCHASEPURPOSE')" prop="purchasepurpose">
                <el-input :disabled="!disable" style="width:11rem" v-model="form.purchasepurpose"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_PROCUREMENTPROJECT')" prop="procurementproject">
                <dicselect
                  :code="code3"
                  :data="form.procurementproject"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width: 11rem"
                  @change="getprocurementproject">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005FORMVIEW_FIXEDASSETSNO')" v-show="show5" prop="fixedassetsno">
                <el-input :disabled="!disabled" style="width:11rem" maxlength='20'
                          v-model="form.fixedassetsno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005FORMVIEW_OUTASSETSNO')" v-show="show4" prop="outassetsno">
                <el-input :disabled="!disabled" style="width:11rem" maxlength='20'
                          v-model="form.fixedassetsno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_PROCUREMENTDETAILS')">
                <el-input :disabled="!disable" style="width:11rem" v-model="form.procurementdetails"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.remarks')">
                <el-input :disabled="!disable" type="textarea" style="width:57.1rem" v-model="form.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_BRANDNAME')">
                <el-input :disabled="!disable" style="width:11rem" maxlength='20' v-model="form.brandname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_MODEL')">
                <el-input :disabled="!disable" style="width:11rem" maxlength='20' v-model="form.model"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_EQUIPMENTURL')">
                <el-input :disabled="!disable" style="width:11rem" maxlength='50'
                          v-model="form.equipmenturl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_QUANTITY')" prop="quantity">
                <el-input-number v-model="form.quantity"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:11rem"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_UNITPRICE')" prop="unitprice">
                <el-input-number v-model="form.unitprice"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:11rem"

                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_TOTALAMOUNT')" prop="totalamount">
                <el-input-number v-model="form.totalamount"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:11rem"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_STORAGEDATE')">
                <el-date-picker
                  startDate
                  :disabled="!disable"
                  style="width:11rem"
                  type="date"
                  v-model="form.storagedate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_COLLECTIONDAY')">
                <el-date-picker
                  startDate
                  :disabled="!disable"
                  style="width:11rem"
                  type="date"
                  v-model="form.collectionday">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :errorrecipients="errorrecipients" :label="$t('label.PFANS3005VIEW_RECIPIENTS')"
                            prop="recipients">
                <user :disabled="!disable" :errorrecipients="errorrecipients" :selectType="selectType"
                      :userlist="recipientslist"
                      style="width:10.14rem" v-model="form.recipients"
                      @getUserids="getRecipientslist"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_ACTUARIALDATE')">
                <el-date-picker
                  startDate
                  :disabled="!disable"
                  style="width:11rem"
                  type="date"
                  v-model="form.actuarialdate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_ACTUARIALAMOUNT')">
                <el-input-number v-model="form.actuarialamount"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:11rem"
                ></el-input-number>
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
    import PFANS3005View from "../PFANS3005/PFANS3005View.vue";
    import {Message} from 'element-ui'
    import user from "../../../components/user.vue";
    import {getOrgInfoByUserId} from '@/utils/customize'
    import moment from "moment";
    import dicselect from "../../../components/dicselect.vue";
    import {telephoneNumber} from '@/utils/validate';

    export default {
        name: 'PFANS3005FormView',
        components: {
            EasyNormalContainer,
            dicselect,
            getOrgInfoByUserId,
            PFANS3005View,
            user
        },
        data() {
            var checkuser = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                } else {
                    this.erroruser = "";
                    return callback();
                }
            };
            var checkcontroller = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    this.errorcontroller = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_CONTROLLER');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_CONTROLLER')));
                } else {
                    this.errorcontroller = "";
                    return callback();
                }
            };
            var validateTel = (rule, value, callback) => {
                if (this.form.linenumber !== null && this.form.linenumber !== '') {
                    if (telephoneNumber(value)) {
                        callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3005VIEW_LINENUMBER')));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                multiple: false,
                loading: false,
                erroruser: '',
                errorusername: '',
                errorcontroller: '',
                errorrecipients: '',
                selectType: "Single",
                userlist: "",
                controllerlist: "",
                usernamelist: "",
                recipientslist: "",
                title: "title.PFANS3005VIEW",
                buttonList: [],
                editableTabsValue: '0',
                editableTabs: [],
                tabIndex: 0,
                form: {
                    careerplan: true,
                    businessplantype: '',
                    classificationtype: '',
                    businessplanbalance: '',
                    procurementproject: '',
                    user_id: '',
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    setplace: '',
                    linenumber: '',
                    controller: '',
                    user: '',
                    budgetnumber: '',
                    businessplanamount: '',
                    purchasepurpose: '',
                    fixedassetsno: '',
                    outassetsno: '',
                    procurementdetails: '',
                    brandname: '',
                    model: '',
                    equipmenturl: '',
                    quantity: '',
                    unitprice: '',
                    totalamount: '',
                    storagedate: '',
                    collectionday: '',
                    recipients: '',
                    actuarialdate: '',
                    actuarialamount: '',
                    application_date: moment(new Date()).format("YYYY-MM-DD"),
                    nodeList: []
                },
                code: 'PG001',//预算单位
                code1: 'PR002',
                code2: 'PR003',
                code3: 'PJ005',
                show1: true,
                show2: false,
                show3: true,
                show4: false,
                show5: true,
                menuList: [],
                disabled: false,
                rules: {
                    user_id: [{
                        required: true,
                        validator: checkuser,
                        trigger: 'change'
                    }],
                    budgetnumber: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.budgetunit'),
                        trigger: "change"
                    }],
                    application_date: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.application_date'),
                            trigger: 'change'
                        },
                    ],
                    linenumber: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_LINENUMBER'),
                            trigger: 'change'
                        },
                        {validator: validateTel, trigger: 'blur'}],
                    setplace: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_SETPLACE'),
                            trigger: 'change'
                        },
                    ],
                    controller: [
                        {
                            required: true,
                            validator: checkcontroller,
                            trigger: 'change'
                        },
                    ],
                    businessplantype: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS3005FORMVIEW_BUSINESSPLANTYPE'),
                            trigger: 'change'
                        },
                    ],
                    businessplanbalance: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3005FORMVIEW_BUSINESSPLANBALANCE'),
                            trigger: 'change'
                        },
                    ],
                    classificationtype: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3003FORMVIEW_CLASSIFICATION'),
                            trigger: 'change'
                        },
                    ],
                    businessplanamount: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_BUSINESSPLANAMOUNT'),
                            trigger: 'change'
                        },
                    ],
                    purchasepurpose: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_PURCHASEPURPOSE'),
                            trigger: 'change'
                        },
                    ],
                    procurementproject: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_PROCUREMENTPROJECT'),
                            trigger: 'change'
                        },
                    ],
                    quantity: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_QUANTITY'),
                            trigger: 'change'
                        },
                    ],
                    unitprice: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_UNITPRICE'),
                            trigger: 'change'
                        },
                    ],
                    totalamount: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_TOTALAMOUNT'),
                            trigger: 'change'
                        },
                    ],
                },
                canStart: false,
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS3005Store/getPurchaseOne', {"purchase_id": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        if (this.form.careerplan === '1') {
                            this.show3 = true;
                            this.show1 = true;
                            this.rules.businessplantype[0].required = true;
                            this.rules.businessplanbalance[0].required = true;
                        } else{
                            this.show3 = false;
                            this.show2 = false;
                            this.show1 = false;
                            this.rules.businessplantype[0].required = false;
                            this.rules.businessplanbalance[0].required = false;
                            this.rules.classificationtype[0].required = false;
                        }
                        if (this.form.businessplantype === "PR002005") {
                            this.show2 = true;
                        } else if (this.form.businessplantype === "PR002001") {
                            this.show2 = false;
                        } else if (this.form.businessplantype === "PR002002") {
                            this.show2 = false;
                        } else if (this.form.businessplantype === "PR002003") {
                            this.show2 = false;
                        } else if (this.form.businessplantype === "PR002004") {
                            this.show2 = false;
                        }
                        if (this.form.procurementproject === "PJ005001") {
                            this.show5 = true;
                            this.show4 = false;
                        } else if (this.form.procurementproject === "PJ005002") {
                            this.show4 = true;
                            this.show5 = false;
                        } else if (this.form.procurementproject === "PJ005003") {
                            this.show4 = true;
                            this.show5 = false;
                        } else if (this.form.procurementproject === "PJ005004") {
                            this.show4 = true;
                            this.show5 = false;
                        } else if (this.form.procurementproject === "PJ005005") {
                            this.show4 = true;
                            this.show5 = false;
                        } else if (this.form.procurementproject === "PJ005006") {
                            this.show4 = true;
                            this.show5 = false;
                        }
                        this.userlist = this.form.user_id;
                        this.controllerlist = this.form.controller;
                        this.usernamelist = this.form.username;
                        this.recipientslist = this.form.recipients;
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
                        });
                        this.loading = false;
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
            if (this.form.careerplan === '1') {
                this.show3 = true;
                this.show1 = true;
                this.rules.businessplantype[0].required = true;
                this.rules.businessplanbalance[0].required = true;
            } else {
                this.show3 = false;
                this.show1 = false;
                this.rules.businessplantype[0].required = false;
                this.rules.businessplanbalance[0].required = false;
                this.rules.classificationtype[0].required = false;
            }
        },
        methods: {
            getUserids(val) {
                this.form.user_id = val;
                this.userlist = val;
                let lst = getOrgInfoByUserId(val);
                this.form.center_id = lst.centerNmae;
                this.form.group_id = lst.groupNmae;
                this.form.team_id = lst.teamNmae;
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
                    this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.erroruser = "";
                }
            },
            getController(val) {
                this.form.controller = val;
                this.controllerlist = val;
                if (!this.form.controller || this.form.controller === '' || val === "undefined") {
                    this.errorcontroller = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_CONTROLLER');
                } else {
                    this.errorcontroller = "";
                }
            },
            radiochange(val) {
                this.form.careerplan = val;
                if (val === '1') {
                    this.show1 = true;
                    this.show3 = true;
                    if(this.form.businessplantype === 'PR002005'){
                        this.show2 = true;
                        this.rules.classificationtype[0].required = true;
                    }
                    this.rules.businessplantype[0].required = true;
                    this.rules.businessplanbalance[0].required = true;
                } else  {
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = false;
                    this.rules.businessplantype[0].required = false;
                    this.rules.businessplanbalance[0].required = false;
                    this.rules.classificationtype[0].required = false;
                }
            },
            getBusinessplantype(val) {
                this.form.businessplantype = val;
                if (val === "PR002005") {
                    this.show2 = true;
                    this.rules.classificationtype[0].required = true;
                } else if (val === "PR002001") {
                    this.show2 = false;
                    this.rules.classificationtype[0].required = false;
                } else if (val === "PR002002") {
                    this.show2 = false;
                    this.rules.classificationtype[0].required = false;
                } else if (val === "PR002003") {
                    this.show2 = false;
                    this.rules.classificationtype[0].required = false;
                } else if (val === "PR002004") {
                    this.show2 = false;
                    this.rules.classificationtype[0].required = false;
                }
            },
            getClassificationtype(val) {
                this.form.classificationtype = val;
            },
            changebudgetnumber(val) {
                this.form.budgetnumber = val;
            },
            getprocurementproject(val) {
                this.form.procurementproject = val;
                if (val === "PJ005001") {
                    this.show5 = true;
                    this.show4 = false;
                } else if (val === "PJ005002") {
                    this.show4 = true;
                    this.show5 = false;
                } else if (val === "PJ005003") {
                    this.show4 = true;
                    this.show5 = false;
                } else if (val === "PJ005004") {
                    this.show4 = true;
                    this.show5 = false;
                } else if (val === "PJ005005") {
                    this.show4 = true;
                    this.show5 = false;
                } else if (val === "PJ005006") {
                    this.show4 = true;
                    this.show5 = false;
                }
            },
            getUsername(val) {
                this.form.username = val;
                this.usernamelist = val;
                if (!this.form.username || this.form.username === '' || val === "undefined") {
                } else {
                    this.errorusername = "";
                }
            },
            getRecipientslist(val) {
                this.form.recipients = val;
                this.recipientslist = val;
                if (!this.form.recipients || this.form.recipients === '' || val === "undefined") {
                    this.errorrecipients = this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_RECIPIENTS');
                } else {
                    this.errorrecipients = "";
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
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                        this.loading = true
                        if (this.form.careerplan === '0') {
                            this.form.businessplantype = "";
                            this.form.businessplanbalance = "";
                            this.form.classificationtype = "";
                        }
                        if (this.form.businessplantype === "PR002001") {
                            this.form.classificationtype = '';
                        } else if (this.form.businessplantype === "PR002002") {
                            this.form.classificationtype = '';
                        } else if (this.form.businessplantype === "PR002003") {
                            this.form.classificationtype = '';
                        } else if (this.form.businessplantype === "PR002004") {
                            this.form.classificationtype = '';
                        }
                        if (this.$route.params._id) {
                            this.form.purchase_id = this.$route.params._id;
                            this.$store
                                .dispatch('PFANS3005Store/updatePurchase', this.form)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false
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
                                    this.loading = false
                                })
                        } else {
                            this.$store
                                .dispatch('PFANS3005Store/createPurchase', this.form)
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
