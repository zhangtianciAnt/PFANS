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
        <el-form :model="form" :rules="rules" label-position="left" label-width="10rem" ref="refform"
                 style="padding: 1rem">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_INFORMATION')" name="first">
              <div>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.center')">
                      <el-input :disabled="true" style="width: 11rem" v-model="form.center_id"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.group')">
                      <el-input :disabled="true" style="width: 11rem" v-model="form.group_id"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.team')">
                      <el-input :disabled="true" style="width: 11rem" v-model="form.team_id"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 10.2rem"></user>
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
                    <el-form-item :label="$t('label.PFANS1002VIEW_CONDOMINIUMCOMPANY2')" prop="condominiumcompany">
                      <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                                v-model.trim="form.condominiumcompany"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_CITY2')" prop="city">
                      <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                                v-model.trim="form.city"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_STARTDATE2')" prop="startdate">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 11rem"
                            type="date"
                            v-model="form.startdate">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ENDDATE2')" prop="enddate">
                      <div class="block">
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 11rem"
                          type="date"
                          v-model="form.enddate">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_DATENUMBER2')" prop="datenumber">
                      <el-input :disabled="true" style="width: 11rem" v-model="form.datenumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_PURPOSE')" name="second">
              <div>
                <el-row type="flex">
                  <el-col :span="5">
                    <el-form-item :label="$t('label.PFANS1002VIEW_OBJECTIVETYPE')" prop="objectivetype">
                      <dicselect
                        :code="code1"
                        :data="form.objectivetype"
                        :disabled="!disable"
                        :multiple="multiple"
                        @change="getobjectivetype"
                        style="width: 11rem"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                      <el-form-item prop="objectivetypeother" v-if="show" >
                        <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                                  v-model.trim="form.objectivetypeother"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row >
                <el-row :gutter="32">
                  <el-col :span="24">
                    <el-form-item prop="details">
                      <el-input :disabled="!disable" style="width: 100%" type="textarea"
                                v-model="form.details"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_CONTENT')" name="third">
              <el-table :data="tableP" header-cell-class-name="sub_bg_color_grey height">
                <el-table-column :label="$t('label.PFANS1002VIEW_TRAVELCONTENTDATE2')" align="center" width="300">
                  <template slot-scope="scope">
                    <div class="block">
                      <el-date-picker
                        :disabled="!disable"
                        style="width:100%"
                        type="date"
                        v-model="scope.row.travelcontentdate">
                      </el-date-picker>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1002VIEW_PLACE2')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                              v-model.trim="scope.row.place"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1002VIEW_CONTENT2')" align="center" width="300">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                              v-model.trim="scope.row.content"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRow(scope.$index, tableP)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      @click="addRow()"
                      plain
                      size="small"
                      type="primary"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_EXPENSE')" name="fourth">
              <div>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                      <dicselect
                        :code="code2"
                        :data="form.budgetunit"
                        :disabled="!disable"
                        :multiple="multiple"
                        @change="getbudgetunit"
                        style="width: 11rem"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_PLAN2')" prop="plan">
                      <span style="margin-right: 1rem ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.plan"
                        active-value="1"
                        inactive-value="0"
                        @change="getplan1"
                      >
                      </el-switch>
                      <span style="margin-left: 1rem ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_PLANTYPE')" prop="plantype" v-if="show2">
                      <dicselect
                        style="width: 11rem"
                        :disabled="!disable"
                        :code="code3"
                        :multiple="multiple"
                        :data="form.plantype"
                        @change="getplantype"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_CLASSIFICATIONTYPE')" prop="classificationtype"
                                  v-if="show3">
                      <dicselect
                        style="width: 11rem"
                        :disabled="!disable"
                        :code="code4"
                        :multiple="multiple"
                        :data="form.classificationtype"
                        @change="getclassificationtype"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS3003FORMVIEW_BALANCE')" prop="balance" v-if="show2">
                      <el-input-number
                        :disabled="!disable"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="1"
                        controls-position="right"
                        style="width: 11rem"
                        v-model="form.balance">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_BOOKINGDAY')" prop="bookingday">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 11rem"
                            type="date"
                            v-model="form.bookingday">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_LOANDAY2')" prop="loanday">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 11rem"
                            type="date"
                            v-model="form.loanday">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_LOANMONEY2')" prop="loanmoney">
                      <el-input-number
                        :disabled="!disable"
                        :max="999999999"
                        :min="0"
                        :precision="2"
                        :step="1"
                        controls-position="right"
                        style="width: 11rem"
                        v-model.trim="form.loanmoney">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ACCOMMODATIONCOST2')" prop="accommodationcost">
                      <dicselect :code="code5"
                                 :data="form.accommodationcost"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getaccommodationcost1"
                                 style="width: 11rem">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ACCOMMODATION2')" prop="accommodation">
                      <dicselect :code="code6"
                                 :data="form.accommodation"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getaccommodation1"
                                 style="width: 11rem">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_OTHERS2')" name="fifth">
              <div>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_PASSENGERS2')" prop="passengers">
                      <el-switch
                        :disabled="!disable"
                        v-model="form.passengers"
                        active-value="1"
                        inactive-value="0"
                        @change="getpassengers1"
                      >
                      </el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_FIXEDASSETSNO2')" prop="fixedassetsno"
                                  v-if="show4">
                      <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                                v-model.trim="form.fixedassetsno"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_EXTERNAL')" prop="external">
                      <el-switch
                        :disabled="!disable"
                        v-model="form.external"
                        active-value="1"
                        inactive-value="0"
                        @change="getexternal"
                      >
                      </el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item :label="$t('label.PFANS1002VIEW_REGULATIONS')" prop="regulations" v-if="show5">
                      <el-input-number
                        :disabled="!disable"
                        :max="99999"
                        :min="0"
                        :precision="2"
                        :step="1"
                        controls-position="right"
                        style="width: 11rem"
                        v-model.trim="form.regulations">
                      </el-input-number>
                      {{$t('label.yuan')}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1002VIEW_REASON2')" prop="reason" v-if="show5">
                      <el-input :disabled="!disable" style="width: 80%" type="textarea"
                                v-model="form.reason"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1002VIEW_OTHEREXPLANATION2')" prop="otherexplanation">
                      <el-input :disabled="!disable" style="width: 80%" type="textarea"
                                v-model="form.otherexplanation"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
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
    import {Message} from 'element-ui';
    import moment from "moment";
    import {getOrgInfoByUserId} from '@/utils/customize';
    import dicselect from "../../../components/dicselect";

    export default {
        name: 'PFANS1035FormView',
        components: {
            dicselect,
            EasyNormalContainer,
            user,
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
            var validatestartdate1 = (rule, value, callback) => {
                if (this.form.startdate !== null && this.form.startdate !== '' && this.form.enddate !== '' && this.form.enddate !== null) {
                    if (moment(this.form.enddate).format("YYYY-MM-DD") < moment(this.form.startdate).format("YYYY-MM-DD")) {
                        callback(new Error(this.$t("label.PFANS1002FORMVIEW_ERROR1")))
                    } else {
                        this.form.datenumber = moment(this.form.enddate).diff(moment(this.form.startdate), 'days') + 1;
                        callback()
                    }
                } else {
                    this.form.datenumber = 0
                    callback()
                }
            };
            var validateenddate1 = (rule, value, callback) => {
                if (this.form.startdate !== '' && this.form.startdate !== null && this.form.enddate !== '' && this.form.enddate !== null) {
                    if (moment(this.form.enddate).format("YYYY-MM-DD") < moment(this.form.startdate).format("YYYY-MM-DD")) {
                        callback(new Error(this.$t("label.PFANS1002FORMVIEW_ERROR1")))
                    } else {
                        this.form.datenumber = moment(this.form.enddate).diff(moment(this.form.startdate), 'days') + 1;
                        callback()
                    }
                } else {
                    this.form.datenumber = 0
                    callback()
                }
            };
            return {
                disable: false,
                error: '',
                selectType: "Single",
                title: "title.PFANS1035VIEW",
                userlist: "",
                activeName: 'first',
                loading: false,
                disabled: false,
                code1: 'PJ018',
                code2: 'PG002',
                code3: 'PR002',
                code4: 'PR003',
                code5: 'PJ019',
                code6: 'PJ020',
                multiple: false,
                form: {
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    user_id: '',
                    applicationdate: moment(new Date()).format("YYYY-MM-DD"),
                    //分类
                    businesstype: '',
                    condominiumcompany: '',
                    city: '',
                    startdate: '',
                    enddate: '',
                    datenumber: '0',
                    objectivetype: '',
                    objectivetypeother: this.$t('label.PFANS1002VIEW_OTHER'),
                    details: '',
                    budgetunit: '',
                    plan: '',
                    plantype: '',
                    classificationtype: '',
                    balance: '',
                    bookingday: '',
                    loanday: '',
                    loanmoney: '',
                    accommodationcost: '',
                    accommodation: '',
                    passengers: '',
                    fixedassetsno: '',
                    external: '',
                    regulations: '',
                    reason: '',
                    otherexplanation: '',
                },
                buttonList: [
                    {
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                        icon: 'el-icon-check',
                    },
                ],
                tableP: [{
                    travelcontent_id: '',
                    businessid: '',
                    travelcontentdate: '',
                    place: '',
                    content: '',
                    rowindex: "",
                }],
                baseInfo: {},
                rules: {
                    user_id: [
                        {
                            required: true,
                            validator: validateUserid,
                            trigger: 'change'
                        }
                    ],
                    applicationdate: [
                        {
                            required: true,
                            message: this.$t("normal.error_09") + this.$t("label.application_date"),
                            trigger: "blur"
                        },
                    ],
                    condominiumcompany: [
                        {
                            required: true,
                            message: this.$t("normal.error_08") + this.$t("label.PFANS1002VIEW_CONDOMINIUMCOMPANY2"),
                            trigger: "blur"
                        },
                    ],
                    city: [
                        {
                            required: true,
                            message: this.$t("normal.error_08") + this.$t("label.PFANS1002VIEW_CITY2"),
                            trigger: "blur"
                        },
                    ],
                    startdate: [
                        {
                            required: true,
                            message: this.$t("normal.error_09") + this.$t("label.PFANS1002VIEW_STARTDATE2"),
                            trigger: "blur"
                        },
                        {validator: validatestartdate1, trigger: 'blur'}
                    ],
                    enddate: [
                        {
                            required: true,
                            message: this.$t("normal.error_09") + this.$t("label.PFANS1002VIEW_ENDDATE2"),
                            trigger: "blur"
                        },
                        {validator: validateenddate1, trigger: 'blur'}
                    ],
                    objectivetype: [
                        {
                            required: true,
                            message: this.$t("normal.error_09") + this.$t("label.PFANS1002VIEW_OBJECTIVETYPE"),
                            trigger: "change"
                        },
                    ],
                    objectivetypeother: [
                        {
                            required: true,
                            message: this.$t("normal.error_08") + this.$t("label.PFANS1002VIEW_OBJECTIVETYPEOTHER"),
                            trigger: "blur"
                        },
                    ],
                    details: [
                        {
                            required: true,
                            message: this.$t("normal.error_08") + this.$t("label.PFANS1002VIEW_DETAILS"),
                            trigger: "blur"
                        },
                    ],
                    budgetunit: [
                        {
                            required: true,
                            message: this.$t("normal.error_09") + this.$t("label.budgetunit"),
                            trigger: "change"
                        },
                    ],
                    plan: [
                        {
                            required: true,
                        },
                    ],
                    plantype: [
                        {
                            required: true,
                            message: this.$t("normal.error_09") + this.$t("label.PFANS1002VIEW_PLANTYPE"),
                            trigger: "change"
                        },
                    ],
                    classificationtype: [
                        {
                            required: true,
                            message: this.$t("normal.error_09") + this.$t("label.PFANS1002VIEW_CLASSIFICATIONTYPE"),
                            trigger: "change"
                        },
                    ],
                    balance: [
                        {
                            required: true,
                            message: this.$t("normal.error_08") + this.$t("label.PFANS1002VIEW_BALANCE"),
                            trigger: "blur"
                        },
                    ],
                    bookingday: [
                        {
                            required: true,
                            message: this.$t("normal.error_09") + this.$t("label.PFANS1002VIEW_BOOKINGDAY"),
                            trigger: "blur"
                        },
                    ],
                    loanday: [
                        {
                            required: true,
                            message: this.$t("normal.error_09") + this.$t("label.PFANS1002VIEW_LOANDAY2"),
                            trigger: "blur"
                        },
                    ],
                    loanmoney: [
                        {
                            required: true,
                            message: this.$t("normal.error_08") + this.$t("label.PFANS1002VIEW_LOANMONEY2"),
                            trigger: "blur"
                        },
                    ],
                    accommodationcost: [
                        {
                            required: true,
                            message: this.$t("normal.error_09") + this.$t("label.PFANS1002VIEW_ACCOMMODATIONCOST2"),
                            trigger: "change"
                        },
                    ],
                    accommodation: [
                        {
                            required: true,
                            message: this.$t("normal.error_09") + this.$t("label.PFANS1002VIEW_ACCOMMODATION2"),
                            trigger: "change"
                        },
                    ],
                    passengers: [
                        {
                            required: true,
                        },
                    ],
                    fixedassetsno: [
                        {
                            required: true,
                            message: this.$t("normal.error_08") + this.$t("label.PFANS1002VIEW_FIXEDASSETSNO2"),
                            trigger: "blur"
                        },
                    ],
                    external: [
                        {
                            required: true,
                        },
                    ],
                    regulations: [
                        {
                            required: true,
                            message: this.$t("normal.error_08") + this.$t("label.PFANS1002VIEW_REGULATIONS"),
                            trigger: "blur"
                        },
                    ],
                    reason: [
                        {
                            required: true,
                            message: this.$t("normal.error_08") + this.$t("label.PFANS1002VIEW_REASON2"),
                            trigger: "blur"
                        },
                    ],
                },
                show: false,
                show2: false,
                show3: false,
                show4: false,
                show5: false,
                canStart: false
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1035Store/selectById', {'businessid': this.$route.params._id})
                    .then(response => {
                        this.form = response.business;
                        if (response.travelcontent.length > 0) {
                            this.tableP = response.travelcontent;
                        }
                        this.userlist = this.form.user_id;
                        this.baseInfo.business = JSON.parse(JSON.stringify(this.form));
                        this.baseInfo.travelcontent = JSON.parse(JSON.stringify(this.tableP));
                        if (this.form.objectivetype === "PJ018005") {
                            this.show = true;
                        } else {
                            this.show = false;
                        }
                        if (this.form.plan === '1') {
                            this.show2 = true;
                        } else {
                            this.show2 = false;
                            this.show3 = false;
                        }
                        if (this.form.plantype === "PR002005") {
                            this.show3 = true;
                        } else {
                            this.show3 = false;
                        }
                        if (this.form.passengers === '1') {
                            this.show4 = true;
                        } else {
                            this.show4 = false;
                        }
                        if (this.form.external === '1') {
                            this.show5 = true;
                        } else {
                            this.show5 = false;
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
                    this.form.center_id = lst.centerNmae;
                    this.form.group_id = lst.groupNmae;
                    this.form.team_id = lst.teamNmae;
                    this.form.user_id = this.$store.getters.userinfo.userid;
                }
            }
        },
        created() {
            if (!this.$route.params.disabled) {
                this.buttonList = [];
            }
            this.disable = this.$route.params.disabled;
        },
        methods: {
            checkRequire() {
                if (
                    !this.form.user_id ||
                    !this.form.applicationdate ||
                    !this.form.condominiumcompany ||
                    !this.form.city ||
                    !this.form.startdate ||
                    !this.form.enddate
                ) {
                    this.activeName = "first";
                } else if (
                    !this.form.objectivetype ||
                    !this.form.objectivetypeother ||
                    !this.form.details
                ) {
                    this.activeName = "second";
                } else if (
                    !this.form.budgetunit ||
                    !this.form.plantype ||
                    !this.form.classificationtype ||
                    !this.form.balance ||
                    !this.form.bookingday ||
                    !this.form.loanday ||
                    !this.form.loanmoney ||
                    !this.form.accommodationcost ||
                    !this.form.accommodation
                ) {
                    this.activeName = "fouth";
                } else if (
                    !this.form.fixedassetsno ||
                    !this.form.regulations ||
                    !this.form.reason
                ) {
                    this.activeName = "five";
                }
            },
            getUserids(val) {
                this.form.user_id = val;
                this.userlist = val;
                let lst = getOrgInfoByUserId(val);
                this.form.center_id = lst.centerNmae;
                this.form.group_id = lst.groupNmae;
                this.form.team_id = lst.teamNmae;
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.error = "";
                }
            },
            // 第三页
            addRow() {
                this.tableP.push({
                    travelcontentdate: "",
                    place: "",
                    content: "",
                    rowindex: "",
                    display: true
                });
            },
            deleteRow(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                }
                rows[index].travelcontentdate = '';
                rows[index].place = '';
                rows[index].content = '';
            },
            // 第二页
            //出差目的
            getobjectivetype(val) {
                this.form.objectivetype = val;
                if (val === "PJ018005") {
                    this.show = true;
                    this.form.objectivetypeother = this.$t('label.PFANS1002VIEW_OTHER');
                } else {
                    this.show = false;
                    this.form.objectivetypeother = null;
                }
            },
            //第四页
            //预算单位
            getbudgetunit(val) {
                this.form.budgetunit = val;
            },
            //事业计划
            getplan1(val) {
                this.form.plan = val;
                if (val === '1') {
                    this.show2 = true;
                } else {
                    this.show2 = false;
                    this.form.plantype = null;
                    this.show3 = false;
                    this.form.classificationtype = null;
                    this.form.balance = null;
                }
            },
            //事业计划类型
            getplantype(val) {
                this.form.plantype = val;
                if (val === "PR002005") {
                    this.show3 = true;
                } else {
                    this.show3 = false;
                    this.form.classificationtype = null;
                    this.form.balance = null;
                }
            },
            //分类类型
            getclassificationtype(val) {
                this.form.classificationtype = val;
            },
            //宿泊費用負担
            getaccommodationcost1(val) {
                this.form.accommodationcost = val;
            },
            getaccommodation1(val) {
                this.form.accommodation = val;
            },
            //第五页
            //ﾊﾝﾄﾞｷｬﾘｰ
            getpassengers1(val) {
                this.form.passengers = val;
                if (val === '1') {
                    this.show4 = true;
                } else {
                    this.show4 = false;
                    this.form.fixedassetsno = null;
                }
            },
            //规定外费用
            getexternal(val) {
                this.form.external = val;
                if (val === '1') {
                    this.show5 = true;
                } else {
                    this.show5 = false;
                    this.form.reason = null;
                    this.form.regulations = null;
                }
            },
            workflowState(val) {
                if (val.state === '1') {
                    this.form.status = '3';
                } else if (val.state === '2') {
                    this.form.status = '4';
                }
                this.update();
            },
            start() {
                this.form.status = '2';
                this.update();
            },
            end() {
                this.form.status = '0';
                this.update();
            },
            update() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1035Store/updateBusiness', this.baseInfo)
                    .then(response => {
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
            },
            paramsTitle(){
                this.$router.push({
                    name: 'PFANS1001FormView',
                    params: {
                        title: 2,
                    },
                });
            },
            buttonClick(val) {
                if (val === "back") {
                    this.paramsTitle();
                }
                else {
                    this.checkRequire();
                    this.$refs["refform"].validate(valid => {
                        if (valid) {
                            this.loading = true;
                            this.form.businesstype = "1";
                            this.form.user_id = this.userlist;
                            this.baseInfo.business = JSON.parse(JSON.stringify(this.form));
                            this.baseInfo.travelcontent = [];
                            for (let i = 0; i < this.tableP.length; i++) {
                                if (this.tableP[i].travelcontentdate !== "" || this.tableP[i].place !== "" || this.tableP[i].content !== "") {
                                    this.baseInfo.travelcontent.push(
                                        {
                                            travelcontent_id: this.tableP[i].travelcontent_id,
                                            businessid: this.tableP[i].businessid,
                                            travelcontentdate: this.tableP[i].travelcontentdate,
                                            place: this.tableP[i].place,
                                            content: this.tableP[i].content,
                                        }
                                    );
                                }
                            }
                            if (this.$route.params._id) {
                                this.baseInfo.business.businessid = this.$route.params._id;
                                this.loading = true;
                                this.$store
                                    .dispatch('PFANS1035Store/updateBusiness', this.baseInfo)
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
                                this.loading = true;
                                this.$store
                                    .dispatch('PFANS1035Store/createBusiness', this.baseInfo)
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
                    });
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>






