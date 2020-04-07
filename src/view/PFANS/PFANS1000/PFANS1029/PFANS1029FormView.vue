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
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName1" type="border-card">
            <!--技術契約書(受託)-->
            <el-tab-pane :label="$t('label.PFANS1029FROM_TECHNICAL')" name="first" :disabled="tabDisabled">
              <div>
                <el-tabs v-model="activeName2" type="border-card">
                  <!--info1-->
                  <el-tab-pane :label="$t('label.PFANS1029FROM_INFO1')" name="third">
                    <!--1-->
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_CONTRACTID')">
                          <el-input  :disabled="true" style="width:20vw" v-model="form.contractnumber"></el-input>
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
                        <el-form-item :label="$t('label.PFANS1029VIEW_DEPOSITJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                          <el-input  :disabled="true" style="width:20vw" v-model="form.depositjapanese"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!--2-->
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_DEPOSITJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                          <el-input  :disabled="true"style="width:20vw" v-model="form.depositchinese"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_PRPLACEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                          <el-input  :disabled="true" style="width:20vw" v-model="form.prplacejapanese"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_PRPLACEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                          <el-input  :disabled="true" style="width:20vw" v-model="form.prplacechinese"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <!--3-->
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_DEPLOYMENT')">
                          <el-input  :disabled="true"style="width:20vw" v-model="form.deployment"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_PJNAMEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                          <el-input  :disabled="true" style="width:20vw" v-model="form.pjnamejapanese"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_PJNAMEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                          <el-input  :disabled="true" style="width:20vw" v-model="form.pjnamechinese"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <!--4-->
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_OPENINGDATE')" >
                          <el-date-picker
                            v-model="form.openingdate"
                            :disabled="true"
                            style="width:20vw">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_ENDDATE')">
                          <el-date-picker :disabled="true" style="width:20vw" v-model="form.enddate">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_CURRENCYFORMAT')">
                          <dicselect :code="code2"
                                     :data="form.currencyposition"
                                     :disabled="true"
                                     :multiple="multiple"
                                     @change="getcurrencyformat"
                                     style="width:20vw">
                          </dicselect>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <!--5-->
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_CLAIMAMOUNT')">
                          <el-input-number :disabled="true" :precision="2" controls-position="right" v-model="form.claimamount"></el-input-number>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <template>
                      <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                          prop="claimtype"
                          :label="$t('label.PFANS1029FROM_TABLEHEADER1')"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="deliverydate"
                          :label="$t('label.PFANS1029FROM_TABLEHEADER2')"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="completiondate"
                          :label="$t('label.PFANS1029FROM_TABLEHEADER3')"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="claimdate"
                          :label="$t('label.PFANS1029FROM_TABLEHEADER4')"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="supportdate"
                          :label="$t('label.PFANS1029FROM_TABLEHEADER5')"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="claimamount"
                          :label="$t('label.PFANS1029FROM_TABLEHEADER6')"
                          width="150">
                        </el-table-column>
<!--                        <el-table-column-->
<!--                          prop="currencyposition"-->
<!--                          :label="$t('label.PFANS1029FROM_TABLEHEADER7')"-->
<!--                          width="150">-->
<!--                        </el-table-column>-->
                      </el-table>
                    </template>
                    <!--add table-->
                  </el-tab-pane>

                  <!--info2-->
                  <el-tab-pane :label="$t('label.PFANS1029FROM_INFO2')" name="fourth">
                    <!--1-->
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_PRPLACEPOSITION')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.prplacepositionjapanese"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_PRPLACEPOSITION')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.prplacepositionchinese"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_NAME')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.namejapanese"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>


                    <el-row>

                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_NAME')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.namechinese"></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_SIGNINGDATE')">
                          <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.signingdate">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_TECHNICALCONTENT')+$t(' (')+$t('label.PFANS1024VIEW_JAPANESE')+$t(') ')">
                          <el-input type="textarea" :disabled="!disable" style="width:20vw" v-model="form.technicalcontentjapanese"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROMVIEW_OTHERTERMS')+$t(' (')+$t('label.PFANS1024VIEW_JAPANESE')+$t(') ')">
                          <el-input type="textarea" :disabled="!disable" style="width:20vw" v-model="form.othertermsjapanese"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_TECHNICALCONTENT')+$t(' (')+$t('label.PFANS1024VIEW_CHINESE')+$t(') ')">
                          <el-input type="textarea" :disabled="!disable" style="width:20vw" v-model="form.technicalcontentchinese"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROMVIEW_OTHERTERMS')+$t(' (')+$t('label.PFANS1024VIEW_CHINESE')+$t(') ')">
                          <el-input type="textarea" :disabled="!disable" style="width:20vw" v-model="form.othertermschinese"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_REDELEGATE')">
                          <dicselect :code="code3"
                                     :data="form.redelegate"
                                     :disabled="!disable"
                                     :multiple="multiple"
                                     @change="getredelegate"
                                     style="width:20vw">
                          </dicselect>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROMVIEW_SUBCONTRACT')+$t(' (')+$t('label.PFANS1024VIEW_CHINESE')+$t(') ')">
                          <dicselect :code="code4"
                                     :data="form.subcontract"
                                     :disabled="!disable"
                                     :multiple="multiple"
                                     @change="getsubcontract"
                                     style="width:20vw">
                          </dicselect>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="">
                          <el-input type="textarea" :disabled="!disable" style="width:20vw" v-model="form.redelegatecontent"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="">
                          <el-input type="textarea" :disabled="!disable" style="width:20vw" v-model="form.subcontractcontent"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
              </div>

            </el-tab-pane>

            <!--役務契約書(受託)-->
            <el-tab-pane :label="$t('label.PFANS1029FROM_LABOR')" name="second" :disabled="tab2Disabled">
              <!--1-->

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_CONTRACTID')">
                    <el-input  :disabled="true" style="width:20vw" v-model="form2.contractnumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')">
                    <dicselect :code="code1"
                               :data="form2.contracttype"
                               :disabled="true"
                               :multiple="multiple"
                               @change="getcontracttype"
                               style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_DEPOSITJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                    <el-input  :disabled="true" style="width:20vw" v-model="form2.depositjapanese"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--2-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_DEPOSITJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                    <el-input  :disabled="true"style="width:20vw" v-model="form2.depositchinese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_PRPLACEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                    <el-input  :disabled="true" style="width:20vw" v-model="form2.prplacejapanese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_PRPLACEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                    <el-input  :disabled="true" style="width:20vw" v-model="form2.prplacechinese"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!--3-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_DEPLOYMENT')">
                    <el-input  :disabled="true"style="width:20vw" v-model="form2.deployment"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_PJNAMEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                    <el-input  :disabled="true" style="width:20vw" v-model="form2.pjnamejapanese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_PJNAMEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                    <el-input  :disabled="true" style="width:20vw" v-model="form2.pjnamechinese"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!--4-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_OPENINGDATE')" >
                    <el-date-picker
                      v-model="form2.openingdate"
                      :disabled="true"
                      style="width:20vw">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_ENDDATE')">
                    <el-date-picker :disabled="true" style="width:20vw" v-model="form2.enddate">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_CURRENCYFORMAT')">
                    <dicselect :code="code2"
                               :data="form2.currencyposition"
                               :disabled="true"
                               :multiple="multiple"
                               @change="getcurrencyformat"
                               style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>

              <!--5-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_CLAIMAMOUNT')">
                    <el-input-number :disabled="true" :precision="2" controls-position="right" v-model="form2.claimamount" style="width:20vw"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>

              <template>
                <el-table
                  :data="tableData2"
                  style="width: 100%">
                  <el-table-column
                    prop="claimtype"
                    :label="$t('label.PFANS1029FROM_TABLEHEADER1')"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="deliverydate"
                    :label="$t('label.PFANS1029FROM_TABLEHEADER2')"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="completiondate"
                    :label="$t('label.PFANS1029FROM_TABLEHEADER3')"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="claimdate"
                    :label="$t('label.PFANS1029FROM_TABLEHEADER4')"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="supportdate"
                    :label="$t('label.PFANS1029FROM_TABLEHEADER5')"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="claimamount"
                    :label="$t('label.PFANS1029FROM_TABLEHEADER6')"
                    width="150">
                  </el-table-column>
                  <!--<el-table-column-->
                    <!--prop="currencyposition"-->
                    <!--:label="$t('label.PFANS1029FROM_TABLEHEADER7')"-->
                    <!--width="150">-->
                  <!--</el-table-column>-->
                </el-table>
              </template>
              <!--6-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029FROM_COMPANYLEADER')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                    <el-input  :disabled="!disable"style="width:20vw" v-model="form2.companyleaderjapanese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029FROM_COMPANYLEADER')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                    <el-input  :disabled="!disable" style="width:20vw" v-model="form2.companyleaderchinese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029FROM_SIGNINGDATE2')">
                    <el-date-picker :disabled="!disable" style="width:20vw" v-model="form2.signingdate">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
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
  import {getDictionaryInfo,getUserInfo} from '@/utils/customize';


  export default {
    name: "PFANS1029FormView",
    components: {
      EasyNormalContainer,
      user,
      org,
      dicselect
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
        activeName1: 'first',
        activeName2: 'third',
        tabDisabled: true,
        tab2Disabled: true,
        disabled: true,
        tableAValue:'',
        error_typeoffees: '',
        error: '',
        userlist: '',
        code1: 'HT008',
        code2: 'HT006',
        code3: 'PJ080',
        code4: 'PJ010',
        errorgroup:'',
        selectType: "Single",
        loading: false,
        title: "title.PFANS1029VIEW",
        canStart: false,
        multiple: false,
        orglist:'',
        baseInfo: {},
        flag: 0,
        tableData: [],
        tableData2: [],
        for: {},
        form: {
            contract_id:'',
            contractnumber:'',
            contracttype:'',
            depositjapanese:'',
            depositchinese:'',
            prplacejapanese:'',
            prplacechinese:'',
            deployment:'',
            pjnamejapanese:'',
            pjnamechinese:'',
            openingdate:'',
            enddate:'',
            currencyposition:'',
            claimamount:'',
            prplacepositionjapanese:'',
            prplacepositionchinese:'',
            namejapanese:'',
            namechinese:'',
            signingdate:'',
            technicalcontentjapanese:'',
            technicalcontentchinese:'',
            redelegate:'',
            redelegatecontent:'',
            companyleaderjapanese:'',
            companyleaderchinese:'',
            othertermsjapanese:'',
            othertermschinese:'',
            subcontract:'',
            subcontractcontent:'',
        },
        form2: {
              contract_id:'',
              contractnumber:'',
              contracttype:'',
              depositjapanese:'',
              depositchinese:'',
              prplacejapanese:'',
              prplacechinese:'',
              deployment:'',
              pjnamejapanese:'',
              pjnamechinese:'',
              openingdate:'',
              enddate:'',
              currencyposition:'',
              claimamount:'',
              prplacepositionjapanese:'',
              prplacepositionchinese:'',
              namejapanese:'',
              namechinese:'',
              signingdate:'',
              technicalcontentjapanese:'',
              technicalcontentchinese:'',
              redelegate:'',
              redelegatecontent:'',
              companyleaderjapanese:'',
              companyleaderchinese:'',
          },

        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change'
          }],
          telephone: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_TELEPHONE'),
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
          .dispatch('PFANS1029Store/one', {"contract_id": this.$route.params._id})
          .then(response => {
              console.log("response",response)
              let aa = 0;
            for (let i = 0; i < response.numberCount.length; i++) {
              if (response.numberCount[i].currencyposition !== null && response.numberCount[i].currencyposition !== "") {
                let letCurrencyposition = getDictionaryInfo(response.numberCount[i].currencyposition);
                if (letCurrencyposition != null) {
                  response.numberCount[i].currencyposition = letCurrencyposition.value1;
                }
              }

              let deliverydate = response.numberCount[i].deliverydate;
              let completiondate = response.numberCount[i].completiondate;
              let claimdate = response.numberCount[i].claimdate;
              let supportdate = response.numberCount[i].supportdate;

              if ( deliverydate !== "" && deliverydate!=null) {
                response.numberCount[i].deliverydate = moment(deliverydate).format('YYYY-MM-DD');
              }
              if (completiondate!== "" && completiondate!=null) {
                response.numberCount[i].completiondate = moment(completiondate).format('YYYY-MM-DD');
              }
              if (claimdate!==""&& claimdate!=null) {
                response.numberCount[i].claimdate = moment(claimdate).format('YYYY-MM-DD');
              }
              if (supportdate!==""&& supportdate!=null) {
                response.numberCount[i].supportdate = moment(supportdate).format('YYYY-MM-DD');
              }
              if(response.numberCount[i].claimamount){
                  let claimamount = response.numberCount[i].claimamount
                  aa = Number(claimamount) + aa;
              }
            }
              this.form2.claimamount = aa
              console.log("this.form2.claimamount",this.form2.claimamount)


            if (response.depositjapanese !== null && response.depositjapanese !== "") {
              let letUser = getUserInfo(response.depositjapanese);
              if (letUser != null) {
                response.depositjapanese = letUser.userinfo.customername;
              }
            }
              if(response.contracttype === 'HT008001'||response.contracttype === 'HT008002'||response.contracttype === 'HT008005'||response.contracttype === 'HT008006')
              {
                this.flag = 0;//技术类型
                this.activeName1 = 'first',
                  this.tabDisabled = false;
                this.form = response;
                this.tableData = response.numberCount;
              }else{
                this.flag = 1;//业务类型
                this.activeName1 = 'second',
                  this.tab2Disabled = false;
                this.form2 = response;
                this.tableData2 = response.numberCount;
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
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        if (!this.form.user_id || this.form.user_id === '' || typeof val == "undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.user_name');
        } else {
          this.error = '';
        }
      },
      getcontracttype(val){

          if(this.flag === 0){
              this.form.contracttype=val;
          }else{
              this.form2.contracttype=val;
          }
      },
      getcurrencyformat(val) {
          if(this.flag === 0){
              this.form.currencyposition = val;
          }else{
              this.form2.currencyposition = val;
          }
      },
        getredelegate(val){
            if(this.flag === 0){
                this.form.redelegate = val;
            }else{
                this.form2.redelegate = val;
            }
        },
      getsubcontract(val){
            if(this.flag === 0){
                this.form.subcontract = val;
            }else{
                this.form2.subcontract = val;
            }
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

      gettotal(val){
        this.form.total= this.form.number*this.form.price;
      },
      buttonClick(val) {
        if(val==="save"){
          this.$refs["reff"].validate(valid =>{
            if(valid){
              this.loading = true;
              if(this.flag === 0){
                  //this.baseInfo={};
                  this.form.user_id=this.userlist;
                  if(this.form.openingdate != null && this.form.openingdate != "") {
                    this.form.openingdate=moment(this.form.openingdate).format('YYYY-MM-DD');
                  }
                  if(this.form.enddate != null && this.form.enddate != "") {
                    this.form.enddate=moment(this.form.enddate).format('YYYY-MM-DD');
                  }
                  if(this.form.signingdate != null && this.form.signingdate != "") {
                    this.form.signingdate=moment(this.form.signingdate).format('YYYY-MM-DD');
                  }
                  if(this.$route.params._id){     //编辑
                      this.form.contract_id = this.$route.params._id;
                      this.$store
                          .dispatch('PFANS1029Store/update',this.form)
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
              }else{
                  this.form2.user_id=this.userlist;
                  if(this.form2.openingdate != null && this.form2.openingdate != "") {
                    this.form2.openingdate=moment(this.form2.openingdate).format('YYYY-MM-DD');
                  }
                  if(this.form2.enddate != null && this.form2.enddate != ""){
                    this.form2.enddate=moment(this.form2.enddate).format('YYYY-MM-DD');
                  }
                  if(this.form2.signingdate != null && this.form2.signingdate != ""){
                    this.form2.signingdate=moment(this.form2.signingdate).format('YYYY-MM-DD');
                  }
                  if(this.$route.params._id){     //编辑
                      this.form2.contract_id = this.$route.params._id;
                      this.$store
                          .dispatch('PFANS1029Store/update',this.form2)
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
            }
            else{
                Message({
                    message: this.$t("normal.error_12"),
                    type: 'error',
                    duration: 5 * 1000
                });
            }
          });
        } else if (val === "generate") {
            this.loading = true;
          if(this.flag === 0){
            let user = getUserInfo(this.form.user_id);
            if (user) {
              this.form.user_id= user.userinfo.customername;
            }
            this.for = this.form;
          } else {
            let user = getUserInfo(this.form.user_id);
            if (user) {
              this.form2.user_id= user.userinfo.customername;
            }
            this.for = this.form2;
          }
            this.$store
              .dispatch('PFANS1029Store/generateJxls', this.for)
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

