<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         @buttonClick="buttonClick"
                         :canStart="canStart"
                         @end="end" @start="start"
                         @workflowState="workflowState"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vm" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1025VIEW_FIRSTDETAILS')" name="first">
              <div>
                <el-row></el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')">
                      <dicselect :code="code1"
                                 :data="form.contracttype"
                                 :disabled="true"
                                 :multiple="multiple"
                                 @change="getcontracttype"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENTRUSTJAPANESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.custojapanese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENTRUSTCHINESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.custochinese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENPLACEJAPANESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.placejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENPLACECHINESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.placechinese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_DEPLOYMENT')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.deployment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.pjnamejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.pjnamechinese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_OPENINGDATE')">
                      <el-date-picker
                        v-model="form.claimdatetimeStart"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENDDATE')">
                      <el-date-picker
                        v-model="form.claimdatetimeEnd"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYDATE')">
                      <el-date-picker :disabled="true" style="width:20vw" v-model="form.deliverydate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')">
                      <dicselect :code="code3"
                                 :data="form.currencyposition"
                                 :disabled="true"
                                 :multiple="multiple"
                                 @change="getcurrencyformat"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.claimamount"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableS" header-cell-class-name="sub_bg_color_blue" stripe border style="width: 70vw">
                    <el-table-column :label="$t('label.PFANS1024VIEW_NUMBER')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.claimtype">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" width="170">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model="scope.row.deliverydate"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" width="150"
                                     prop="member">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model="scope.row.completiondate"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model="scope.row.claimdate"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" width="150"
                                     prop="outsource">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model="scope.row.supportdate"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model="scope.row.claimamount"></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1025VIEW_SECONDDETAILS')" name="second">
              <div>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1008FORMVIEW_INITIATOR')" :error="error" prop="user_id">
                      <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width:20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_TELEPHONE')" prop="telephone">
                      <el-input :disabled="true" style="width:20vw" v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025FORMVIEW_DRAFTINGDATE')">
                      <el-date-picker
                        v-model="form.draftingdate"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025FORMVIEW_SCHEDULEDDATE')">
                      <el-date-picker
                        v-model="form.scheduleddate"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_EXTRINSIC')">
                      <span style="margin-right: 1rem ">{{$t('label.no')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.extrinsic"
                        active-value="1"
                        inactive-value="0">
                      </el-switch>
                      <span style="margin-left: 1rem ">{{$t('label.yes')}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_EQUIPMENT')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.equipment"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_COMMDEPARTMENT')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.commdepartment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_COMMISSION')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.commission"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1004VIEW_CAREERPLAN')" prop="careerplan">
                      <span>{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.plan"
                        active-value="1"
                        inactive-value="0">
                      </el-switch>
                      <span>{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                      <!-- <el-select @change="changePlan" style="width: 20vw" v-model="form.plan">
                         <el-option :label="$t('label.PFANS1004VIEW_INSIDE')" :value="$t('label.PFANS1004VIEW_INSIDE')"></el-option>
                         <el-option :label="$t('label.PFANS1004VIEW_OUTER')" :value="$t('label.PFANS1004VIEW_OUTER')"></el-option>
                       </el-select>-->

                      <!--                      <dicselect :code="code4"-->
                      <!--                                 :data="form.plan"-->
                      <!--                                 :disabled="!disable"-->
                      <!--                                 :multiple="multiple"-->
                      <!--                                 @change="getplan"-->
                      <!--                                 style="width:20vw">-->
                      <!--                      </dicselect>-->
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_VALUATION')">
                      <dicselect :code="code2"
                                 :data="form.valuation"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getvaluation"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_INDIVIDUAL')">
                      <dicselect :code="code2"
                                 :data="form.individual"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getindividual"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PLANNUMBER')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.plannumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_VALUATIONNUMBER')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.valuationnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CONTRACTNUMBER')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>-->
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')">
                      <el-input :disabled="!disable" style="width:70vw" v-model="form.remarks"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-table :data="tableT" :summary-method="getTsummaries"
                        border
                        show-summary
                        header-cell-class-name="sub_bg_color_blue" stripe>
                <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.budgetcode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_DEPART')" align="center" width="170"
                                 :error="errorgroup" prop="depart">
                  <template slot-scope="scope">
                    <org :orglist="scope.row.depart"
                         orgtype="2"
                         :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                         :error="errorgroup"
                         style="width: 9rem"
                         :no="scope.row"
                         @getOrgids="getGroupId"></org>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5008VIEW_PROGRAM')" align="center" width="150">
                  <template slot-scope="scope">
                    <project :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                             style="width: 100%" :data="scope.row.projects" :no="scope.row"
                             @change="changePro">
                    </project>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5008VIEW_PROGRAM')" align="center" width="600">
                  <el-table-column :label="$t('label.PFANS1025VIEW_MEMBER')" align="center" width="150" prop="member"
                                   v-if="checkdisable">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.member"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1025VIEW_COMMUNITY')" align="center" width="150"
                                   v-if="checkdisable">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.community"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1025VIEW_OUTSOURCE')" align="center" width="150"
                                   prop="outsource">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.outsource"
                        @change="changeSum(scope.row)"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1025VIEW_OUTCOMMUNITY')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.outcommunity"
                        @change="changeSum(scope.row)"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_WORKNUMBER')" align="center" prop="worknumber"
                                 width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="true"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.worknumber"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_AWARDMONEY')" align="center" prop="awardmoney"
                                 width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?false:true"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.awardmoney"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRow(scope.$index, tableT)"
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
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import user from "../../../components/user.vue";
    import {Message} from 'element-ui';
    import dicselect from '../../../components/dicselect';
    import moment from "moment";
    import org from "../../../components/org";
    import project from '../../../components/project';
    import {getDictionaryInfo, getOrgInfo, getOrgInfoByUserId, getUserInfo} from '@/utils/customize';

    export default {
        name: "PFANS1025FormView",
        components: {
            EasyNormalContainer,
            user,
            org,
            dicselect,
            project
        },
        data() {
            var checkuser = (rule, value, callback) => {
                if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === "undefined") {
                    this.error = this.$t('normal.error_09') + this.$t('label.user_name');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
                } else {
                    this.error = "";
                    return callback();
                }
            };
            return {
                checkdisable: false,
                budgetcodingcheck: '',
                activeName: 'first',
                disabled: true,
                error: '',
                userlist: '',
                code1: 'HT008',
                code2: 'HT005',
                code3: 'PG019',
                code4: 'HT018',
                errorgroup: '',
                selectType: "Single",
                loading: false,
                title: "title.PFANS1025VIEW",
                canStart: false,
                multiple: false,
                orglist: '',
                baseInfo: {},
                form: {
                    draftingdate: '',
                    scheduleddate: '',
                    contractnumber: '',
                    contracttype: '',
                    custojapanese: '',
                    custochinese: '',
                    placejapanese: '',
                    placechinese: '',
                    deployment: '',
                    pjnamejapanese: '',
                    pjnamechinese: '',
                    claimdatetimeStart: '',
                    claimdatetimeEnd: '',
                    deliverydate: '',
                    currencyposition: '',
                    claimamount: '',
                    user_id: '',
                    extrinsic: '',
                    equipment: '',
                    telephone: '',
                    commdepartment: '',
                    commission: '',
                    plan: '',
                    valuation: '',
                    individual: '',
                    plannumber: '',
                    valuationnumber: '',
                    remarks: '',
                    maketype: '',
                },
                tableS: [],
                tableT: [{
                    budgetcode: this.$t('label.PFANS1025FORMVIEW_CHECKERROR'),
                    depart: '',
                    member: '',
                    community: '',
                    outsource: '',
                    outcommunity: '',
                    worknumber: '',
                    awardmoney: '',
                    rowindex: '',
                }, {
                    awarddetail_id: '',
                    award_id: '',
                    budgetcode: '',
                    depart: '',
                    member: '',
                    community: '',
                    outsource: '',
                    outcommunity: '',
                    worknumber: '',
                    awardmoney: '',
                    rowindex: '',
                }],
                rules: {
                    user_id: [{
                        required: true,
                        validator: checkuser,
                        trigger: 'change'
                    }],
                    // telephone: [{
                    //   required: true,
                    //   message: this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_TELEPHONE'),
                    //   trigger: 'change'
                    // }],
                },
                buttonList: []
            }
        },
        mounted() {
            this.loading = true;
            if (this.$route.params._id) {
                this.$store
                    .dispatch('PFANS1025Store/selectById', {'award_id': this.$route.params._id})
                    .then(response => {
                        this.form = response.award;
                        if (getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)) {
                            this.budgetcodingcheck = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
                        }
                        if (this.$store.getters.userinfo.userid) {
                            this.form.telephone = getUserInfo(this.$store.getters.userinfo.userid).userinfo.extension;
                        }
                        this.form.draftingdate = moment(new Date()).format('YYYY-MM-DD');
                        var myDate = new Date();
                        myDate.setDate(myDate.getDate() + 2);
                        this.form.scheduleddate = moment(myDate).format('YYYY-MM-DD');
                        if (this.form.claimdatetime !== "" && this.form.claimdatetime !== null) {
                            this.form.claimdatetimeStart = this.form.claimdatetime.slice(0, 10);
                            this.form.claimdatetimeEnd = this.form.claimdatetime.slice(this.form.claimdatetime.length - 10);
                        }
                        if (response.awardDetail.length > 0) {
                            let check = 0;
                            let data = [];
                            for (let i = 0; i < response.awardDetail.length; i++) {
                                if (response.awardDetail[i].budgetcode === this.$t('label.PFANS1025FORMVIEW_CHECKERROR')) {
                                    check = check + 1;
                                    break
                                }
                            }
                            if (check === 0) {
                                this.tableT.push({
                                    budgetcode: this.$t('label.PFANS1025FORMVIEW_CHECKERROR'),
                                    depart: '',
                                    member: '',
                                    community: '',
                                    outsource: '',
                                    outcommunity: '',
                                    worknumber: '',
                                    awardmoney: '',
                                    rowindex: '',
                                })
                                this.tableT = data.concat(response.awardDetail);
                            } else {
                                this.tableT = response.awardDetail;
                            }
                            for (var i = 0; i < this.tableT.length; i++) {
                                this.orglist = this.tableT[i].depart;
                            }
                        }
                        let mamount = 0
                        if (response.numbercounts.length > 0) {

                            for (let i = 0; i < response.numbercounts.length; i++) {
                                let letCurrencyposition = getDictionaryInfo(response.numbercounts[i].currencyposition);
                                if (letCurrencyposition != null) {
                                    response.numbercounts[i].currencyposition = letCurrencyposition.value1;
                                }
                                let deliverydate = response.numbercounts[i].deliverydate;
                                let completiondate = response.numbercounts[i].completiondate;
                                let claimdate = response.numbercounts[i].claimdate;
                                let supportdate = response.numbercounts[i].supportdate

                                if (deliverydate !== "" && deliverydate != null) {
                                    response.numbercounts[i].deliverydate = moment(deliverydate).format('YYYY-MM-DD');
                                }
                                if (completiondate !== "" && completiondate != null) {
                                    response.numbercounts[i].completiondate = moment(completiondate).format('YYYY-MM-DD');
                                }
                                if (claimdate !== "" && claimdate != null) {
                                    response.numbercounts[i].claimdate = moment(claimdate).format('YYYY-MM-DD');
                                }
                                if (supportdate !== "" && supportdate != null) {
                                    response.numbercounts[i].supportdate = moment(supportdate).format('YYYY-MM-DD');
                                }
                                mamount += parseFloat(response.numbercounts[i].claimamount)
                            }
                        }

                        this.tableS = response.numbercounts
                        this.form.claimamount = mamount;
                        this.userlist = this.form.user_id;
                        this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
                        this.baseInfo.awardDetail = JSON.parse(JSON.stringify(this.tableT));
                        this.baseInfo.groupN = this.$store.getters.orgGroupList;
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
            }
            // else {
            //   this.userlist = this.$store.getters.userinfo.userid;
            //   if (this.userlist !== null && this.userlist !== '') {
            //     let lst = getUserInfo(this.$store.getters.userinfo.userid);
            //     if (lst) {
            //       this.form.telephone = lst.userinfo.extension;
            //     }
            //   }
            // }
        },
        created() {
            if (!this.$route.params.disabled) {
                this.buttonList = [
                    {
                        key: 'generate',
                        name: 'button.generate',
                        disabled: false,
                    }
                ]
            } else {
                this.buttonList = [
                    {
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                        icon: 'el-icon-check',
                    },
                ]
            }
            this.disable = this.$route.params.disabled;
        },
        methods: {
            changePro(val, row) {
                row.projects = val;
            },
            changeSum(row) {
                row.worknumber = row.outsource;
                row.awardmoney = row.outsource * row.outcommunity;
            },
            getplan(val) {
                this.form.plan = val;
            },
            getUserids(val) {
                this.userlist = val;
                this.form.user_id = val;
                if (!this.form.user_id || this.form.user_id === '' || typeof val == "undefined") {
                    this.error = this.$t('normal.error_08') + this.$t('label.user_name');
                } else {
                    this.error = '';
                }
            },
            getcontracttype(val) {
                this.form.contracttype = val;
            },
            getcurrencyformat(val) {
                this.form.currencyposition = val;
            },
            getextrinsic(val) {
                this.form.extrinsic = val;
            },
            getvaluation(val) {
                this.form.valuation = val;
            },
            getindividual(val) {
                this.form.individual = val;
            },
            getGroupId(orglist, row) {
                row.depart = orglist;
                let group = getOrgInfo(orglist);
                if (group) {
                    row.budgetcode = group.encoding;
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
            deleteRow(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                } else {
                    this.tableT = [{
                        budgetcode: '',
                        depart: '',
                        member: '',
                        community: '',
                        outsource: '',
                        outcommunity: '',
                        worknumber: '',
                        awardmoney: '',
                    }]
                }
            },
            addRow() {
                this.tableT.push({
                    awarddetail_id: '',
                    award_id: '',
                    budgetcode: '',
                    depart: '',
                    member: '',
                    community: '',
                    outsource: '',
                    outcommunity: '',
                    worknumber: '',
                    awardmoney: '',
                    rowindex: '',
                })
            },
            getTsummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        if (index == 2) {
                            sums[index] = Math.round((sums[index]) * 100) / 100;
                        }
                        if (index == 4) {
                            sums[index] = Math.round((sums[index]) * 100) / 100;
                        }
                        if (index == 6) {
                            sums[index] = Math.round((sums[index]) * 100) / 100;
                        }
                        if (index == 7) {
                            sums[index] = Math.round((sums[index]) * 100) / 100;
                        }
                    } else {
                        sums[index] = '--'
                    }
                });
                return sums;
            },
            changePlan(val) {
                this.form.plan = val;
            },
            buttonClick(val) {
                this.form.maketype = '7',
                    this.baseInfo = {};
                this.form.user_id = this.userlist;
                if (this.form.claimdatetimeStart !== "" && this.form.claimdatetimeEnd !== "") {
                    this.form.claimdatetime = moment(this.form.claimdatetimeStart).format('YYYY-MM-DD') + " ~ " + moment(this.form.claimdatetimeEnd).format('YYYY-MM-DD');
                }
                this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
                this.baseInfo.awardDetail = [];
                let money = 0;
                for (let i = 0; i < this.tableT.length; i++) {
                    if (this.tableT[i].budgetcode !== "" || this.tableT[i].depart !== "" || this.tableT[i].member > "0" || this.tableT[i].community > "0"
                        || this.tableT[i].outsource > "0" || this.tableT[i].outcommunity > "0" || this.tableT[i].worknumber > "0" || this.tableT[i].awardmoney > "0") {
                        money += parseFloat(this.tableT[i].awardmoney);
                        this.baseInfo.awardDetail.push({
                            awarddetail_id: this.tableT[i].awarddetail_id,
                            award_id: this.tableT[i].award_id,
                            budgetcode: this.tableT[i].budgetcode,
                            depart: this.tableT[i].depart,
                            member: this.tableT[i].member,
                            projects: this.tableT[i].projects,
                            community: this.tableT[i].community,
                            outsource: this.tableT[i].outsource,
                            outcommunity: this.tableT[i].outcommunity,
                            worknumber: this.tableT[i].worknumber,
                            awardmoney: this.tableT[i].awardmoney,
                            rowindex: this.tableT[i].rowindex,
                        })
                    }
                }
                let error = 0;
                if (money != this.form.claimamount) {
                    error = error + 1;
                    Message({
                        message: this.$t('label.PFANS1025FROMVIEW_CHECKAWARDMONEY'),
                        type: 'error',
                        duration: 5 * 1000,
                    });
                }
                if (error == '0') {
                    if (this.$route.params.disabled) {
                        this.$refs["reff"].validate(valid => {
                            if (valid) {
                                this.loading = true;
                                if (this.$route.params._id) {     //郛冶ｾ�
                                    this.baseInfo.award.award_id = this.$route.params._id;
                                    this.$store
                                        .dispatch('PFANS1025Store/update', this.baseInfo)
                                        .then(response => {
                                            this.data = response;
                                            this.loading = false;
                                            if (val !== "update") {
                                                Message({
                                                    message: this.$t('normal.success_02'),
                                                    type: 'success',
                                                    duration: 5 * 1000,
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
                                                duration: 5 * 1000,
                                            });
                                            this.loading = false;
                                        })
                                }
                            } else {
                                Message({
                                    message: this.$t("normal.error_12"),
                                    type: 'error',
                                    duration: 5 * 1000
                                });
                            }
                        });
                    } else {
                        this.loading = true;
                        let user = getUserInfo(this.form.user_id);
                        if (user) {
                            this.form.user_id = user.userinfo.customername;
                        }
                        this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
                        this.$store
                            .dispatch('PFANS1025Store/generateJxls', this.baseInfo)
                            .then(response => {
                                this.loading = false;
                            })
                            .catch(error => {
                                Message({
                                    message: error,
                                    type: 'error',
                                    duration: 5 * 1000,
                                });
                                this.loading = false;
                            })
                    }
                }
            }
        }
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .el-table {
    overflow-x: auto;
  }

  .el-table__header-wrapper,
  .el-table__body-wrapper,
  .el-table__footer-wrapper {
    overflow: visible;
  }

  .el-table::after {
    position: relative;
  }

  .el-table--scrollable-x .el-table__body-wrapper {
    overflow: visible;
  }
</style>
