<template>
  <div >
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         @buttonClick="buttonClick"
                         :canStart="canStart"
                         @end="end" @start="start"
                         @workflowState="workflowState"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vm" ref="reff"  style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1025VIEW_FIRSTDETAILS')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')">
                      <el-input  :disabled="!disable"style="width:20vw" v-model="form.contractnumber"></el-input>
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
                    <el-form-item :label="$t('label.PFANS1031FORMVIEW_DEPOSITJAPANESE')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.custojapanese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYCHINESE')">
                      <el-input  :disabled="!disable"style="width:20vw" v-model="form.custochinese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1030FORMVIEW_PRINCIPALPLAC')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.placejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACECHINESE')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.placechinese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_DEPLOYMENT')">
                      <el-input  :disabled="!disable"style="width:20vw" v-model="form.deployment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.pjnamejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.pjnamechinese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_OPENINGDATE')" >
                      <el-date-picker
                        v-model="form.claimdatetimeStart"
                        :disabled="!disable"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENDDATE')" >
                      <el-date-picker
                        v-model="form.claimdatetimeEnd"
                        :disabled="!disable"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')">
                      <dicselect :code="code3"
                                 :data="form.currencyposition"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getcurrencyformat"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.claimamount"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <el-row >
                <el-col :span="24">
                  <el-table :data="tableS"  header-cell-class-name="sub_bg_color_blue" stripe border style="width: 70vw">
                    <el-table-column
                      prop="claimtype"
                      :label="$t('label.PFANS1024VIEW_NUMBER')" align="center" width="150" />
                    <el-table-column
                      prop="deliverydate"
                      :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" width="170" />
                    <el-table-column
                      prop="completiondate"
                      :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" width="150"/>
                    <el-table-column
                      prop="claimdate" :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center"width="150"/>
                    <el-table-column
                      prop="supportdate" :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center"  width="150" />
                    <el-table-column
                      prop="claimamount" :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  width="150" />
                    <el-table-column
                      prop="currencyposition" :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')" align="center"  width="150" />
                  </el-table>
                </el-col>
              </el-row>

            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1025VIEW_SECONDDETAILS')" name="second">
              <div>
                <el-row></el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1008FORMVIEW_INITIATOR')" :error="error" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width:20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_TELEPHONE')" prop="telephone">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.remarks"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1004VIEW_CAREERPLAN')"   prop="careerplan">
<!--                      <span style="margin-right: 1rem ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>-->
<!--                      <el-switch-->
<!--                        :disabled="!disable"-->
<!--                        v-model="form.plan"-->
<!--                        active-value="1"-->
<!--                        inactive-value="0">-->
<!--                      </el-switch>-->
<!--                      <span style="margin-left: 1rem ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>-->
                      <dicselect :code="code4"
                                 :data="form.plan"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getplan"
                                 style="width:20vw">
                      </dicselect>
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
                      <el-input  :disabled="!disable"style="width:20vw" v-model="form.plannumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_VALUATIONNUMBER')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.valuationnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CONTRACTNUMBER')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-table :data="tableT" :summary-method="getTsummaries"
                        border
                        show-summary
                        header-cell-class-name="sub_bg_color_blue" stripe>
                <el-table-column :label="$t('label.PFANS1025VIEW_BUDGETCODE')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.budgetcode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_DEPART')" align="center" width="170" :error="errorgroup" prop="depart">
                  <template slot-scope="scope">
                    <org  :orglist="scope.row.depart"
                          orgtype="2"
                          :disabled="!disable"
                          :error="errorgroup"
                          style="width: 9rem"
                          :no="scope.row"
                          @getOrgids="getGroupId"></org>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5008VIEW_PROGRAM')" align="center" width="150">
                  <template slot-scope="scope">
                    <project :disabled="!disable" style="width: 100%" :data="scope.row.projects" :no="scope.row"
                             @change="changePro">
                    </project>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="600">
                <el-table-column :label="$t('label.PFANS1025VIEW_MEMBER')" align="center" width="150" prop="member">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.member"
                      @change="changeSum(scope.row)"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_COMMUNITY')" align="center"width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.community"
                      @change="changeSum(scope.row)"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_OUTSOURCE')" align="center"  width="150"  prop="outsource">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
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
                <el-table-column :label="$t('label.PFANS1025VIEW_OUTCOMMUNITY')" align="center"  width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
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
                <el-table-column :label="$t('label.PFANS1025VIEW_WORKNUMBER')" align="center" prop="worknumber" width="150">
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
                <el-table-column :label="$t('label.PFANS1025VIEW_AWARDMONEY')" align="center" prop="awardmoney" width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="true"
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
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1030FORMVIEW_EXCHANGERATE')">
                      <el-input-number
                        :disabled="!disable"
                        :max="1000000000"
                        :min="0"
                        :precision="4"
                        controls-position="right"
                        style="width:20vw"
                        v-model="form.exchangerate"
                        @change="sumAward()"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1030FORMVIEW_SARMB')">
                      <el-input-number
                        :disabled="true"
                        :max="1000000000"
                        :min="0"
                        :precision="2"
                        controls-position="right"
                        style="width:20vw"
                        v-model="form.sarmb"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1030FORMVIEW_DETAIL')" name="third">

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1030FORMVIEW_TOTAL')">
                    <el-input-number
                      :disabled="true"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:11vw"
                      v-model="form.total"
                    ></el-input-number>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1030FORMVIEW_NUMBER')">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:11vw"
                      v-model="form.number"
                      @change="gettotal"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1030FORMVIEW_PRICE')">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:11vw"
                      v-model="form.price"
                      @change="gettotal"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('label.PFANS1030FORMVIEW_RATE')">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:11vw"
                      v-model="form.rate"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-table :data="tableD" :summary-method="getTsummaries"
                          border
                          show-summary
                          header-cell-class-name="sub_bg_color_blue" stripe>
                  <el-table-column :label="$t('label.PFANS1030FORMVIEW_ATTF')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.attf">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1030FORMVIEW_ATTFMOTH')" align="center" width="170" prop="attfmoth">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.attfmoth"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1030FORMVIEW_ATTFNUMBER')" align="center" width="150" prop="attfnumber">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.attfnumber"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
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
  import {getDictionaryInfo} from '@/utils/customize';

  import project from '../../../components/project';

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
      var checktele = (rule, value, callback) => {
        this.regExp = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/;
        if (this.form.telephone !== null && this.form.telephone !== '') {
          if (!this.regExp.test(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_TELEPHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        activeName: 'first',
        disabled: true,
        error: '',
        userlist: '',
        code1: 'PJ010',
        code2: 'HT005',
        code3: 'HT006',
        code4: 'HT018',
        sumAwardmoney: '',
        errorgroup:'',
        selectType: "Single",
        loading: false,
        title: "title.PFANS1030VIEW",
        canStart: false,
        multiple: false,
        orglist:'',
        baseInfo: {},
        arrAttf: [],
        form: {
          number: '',
          total: '',
          price: '',
          rate: '',
          sarmb: '',
          exchangerate: '',
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
          tablecommunt: '',
        },
        tableT: [{
          awarddetail_id: '',
          award_id: '',
          budgetcode: '',
          depart: '',
          projects: '',
          member: '',
          community: '',
          outsource: '',
          outcommunity: '',
          worknumber: '',
          awardmoney: '',
          rowindex: '',
        }],
        tableS:[],
        tableD:[{
          attf: 'R11B',
          attfmoth: '',
          attfnumber: ''
        },
          {
            attf: 'R11A',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R10',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R9B',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R9A',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R8C',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R8B',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R8A',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R7',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R6',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R5',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R4',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R3',
            attfmoth: '',
            attfnumber: ''
          },

        ],

        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change'
          }],
          telephone: [{
            validator: checktele,
            trigger: 'change'
          }],
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
            if(this.form.claimdatetime!=="" && this.form.claimdatetime!==null){
              this.form.claimdatetimeStart = this.form.claimdatetime.slice(0,10);
              this.form.claimdatetimeEnd = this.form.claimdatetime.slice(this.form.claimdatetime.length-10);
            }
            if (response.awardDetail.length > 0) {
              this.tableT = response.awardDetail
              for (var i = 0; i < this.tableT.length; i++) {
                this.orglist=this.tableT[i].depart;
              }
            }
            if (this.form.tablecommunt !== '' && this.form.tablecommunt !== null) {
              for (let i = 0; i < JSON.parse(response.award.tablecommunt).length; i++) {
                let aa = JSON.parse(response.award.tablecommunt)[i];
                this.tableD[i].attfmoth = aa.attf1;
                this.tableD[i].attfnumber = aa.attf2;
              }
            }
            if ( response.numbercounts.length > 0 ) {
              for (let i = 0; i < response.numbercounts.length; i++) {
                let letCurrencyposition = getDictionaryInfo(response.numbercounts[i].currencyposition);
                if (letCurrencyposition != null) {
                  response.numbercounts[i].currencyposition = letCurrencyposition.value1;
                }
                let deliverydate = response.numbercounts[i].deliverydate;
                let completiondate = response.numbercounts[i].completiondate;
                let claimdate = response.numbercounts[i].claimdate;
                let supportdate = response.numbercounts[i].supportdate

                if ( deliverydate !== "" && deliverydate!=null) {
                  response.numbercounts[i].deliverydate = moment(deliverydate).format('YYYY-MM-DD');
                }
                if (completiondate!== "" && completiondate!=null) {
                  response.numbercounts[i].completiondate = moment(completiondate).format('YYYY-MM-DD');
                }
                if (claimdate!==""&& claimdate!=null) {
                  response.numbercounts[i].claimdate = moment(claimdate).format('YYYY-MM-DD');
                }
                if (supportdate!==""&& supportdate!=null) {
                  response.numbercounts[i].supportdate = moment(supportdate).format('YYYY-MM-DD');
                }
              }
            }
            this.tableS = response.numbercounts
            this.userlist = this.form.user_id;
            this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.awardDetail = JSON.parse(JSON.stringify(this.tableT));
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
    },
    created(){
      if(!this.$route.params.disabled){
        this.buttonList=[
          {
            key: 'generate',
            name: 'button.generate',
            disabled: false,
          }
        ]
      }else {
        this.buttonList=[
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
      sumAward(){
        if(this.form.contracttype === "HT006002"){
          this.form.sarmb = this.from.exchangerate * this.sumAwardmoney;
        } else {
          this.form.sarmb = this.sumAwardmoney;
        }
      },
      changeSum(row) {
        row.worknumber = row.member + row.outsource;
        row.awardmoney = row.member * row.community + row.outsource * row.outcommunity;
        if(this.form.contracttype === "HT006002"){
          this.form.sarmb = this.from.exchangerate * this.sumAwardmoney;
        } else {
          this.form.sarmb = this.sumAwardmoney;
        }
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
      gettotal(val){
        this.form.total= this.form.number*this.form.price;
      },

      getcontracttype(val){
        this.form.contracttype=val;
        if(val === "HT006002"){
          this.form.sarmb = this.from.exchangerate * this.sumAwardmoney;
        } else {
          this.form.sarmb = this.sumAwardmoney;
        }
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
      getplan(val) {
        this.form.plan = val;
      },
      getindividual(val) {
        this.form.individual = val;
      },
      getGroupId(orglist,row) {
        row.depart=orglist;
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick("save");
      },
      start() {
        this.form.status = '2';
        this.buttonClick("save");
      },
      end() {
        this.form.status = '0';
        this.buttonClick("save");
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
            if (index == 3) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 5) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 7) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 8) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
              this.sumAwardmoney = sums[index];
            }
          } else {
            sums[index] = '--'
          }
        });
        return sums;
      },
      buttonClick(val) {
        if(val==="save"){
          this.$refs["reff"].validate(valid =>{
            if(valid){
              this.loading = true;
              this.form.maketype='4',
              this.baseInfo={};
              this.form.user_id=this.userlist;
              if(this.form.claimdatetimeStart!=="" && this.form.claimdatetimeEnd!==""){
                this.form.claimdatetime=moment(this.form.claimdatetimeStart).format('YYYY-MM-DD')+" ~ "+moment(this.form.claimdatetimeEnd).format('YYYY-MM-DD');
              }
              for (let i = 0; i < this.tableD.length; i++) {
                this.arrAttf.push({
                  attf1: this.tableD[i].attfmoth,
                  attf2: this.tableD[i].attfnumber,
                });
              }
              this.form.tablecommunt = JSON.stringify(this.arrAttf);
              this.baseInfo.award=JSON.parse(JSON.stringify(this.form));
              this.baseInfo.awardDetail=[];
              for(let i=0;i<this.tableT.length;i++){
                if(this.tableT[i].budgetcode!==""||this.tableT[i].depart!==""||this.tableT[i].member>"0" ||this.tableT[i].community>"0"
                  ||this.tableT[i].outsource>"0"||this.tableT[i].outcommunity>"0"||this.tableT[i].worknumber>"0"||this.tableT[i].awardmoney>"0"){
                  this.baseInfo.awardDetail.push({
                    awarddetail_id:this.tableT[i].awarddetail_id,
                    award_id:this.tableT[i].award_id,
                    budgetcode:this.tableT[i].budgetcode,
                    depart:this.tableT[i].depart,
                    projects:this.tableT[i].projects,
                    member:this.tableT[i].member,
                    community:this.tableT[i].community,
                    outsource:this.tableT[i].outsource,
                    outcommunity:this.tableT[i].outcommunity,
                    worknumber:this.tableT[i].worknumber,
                    awardmoney:this.tableT[i].awardmoney,
                    rowindex:this.tableT[i].rowindex,
                  })
                }
              }
              if(this.$route.params._id){     //编辑
                this.baseInfo.award.award_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1025Store/update',this.baseInfo)
                  .then(response =>{
                    this.data=response;
                    this.loading=false;
                    if( val !== "update"){
                      Message({
                        message: this.$t('normal.success_02'),
                        type: 'success',
                        duration: 5 * 1000,
                      });
                      if(this.$store.getters.historyUrl) {
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
                    this.loading=false;
                  })
              }
            }
          });
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
