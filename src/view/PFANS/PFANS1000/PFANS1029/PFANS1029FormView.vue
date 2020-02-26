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
            <el-tab-pane :label="$t('label.PFANS1029FROM_technical')" name="first">
              <div>
                <el-tabs v-model="activeName2" type="border-card">
                  <!--info1-->
                  <el-tab-pane :label="$t('label.PFANS1029FROM_INFO1')" name="third">
                    <!--1-->
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_CONTRACTID')">
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.contract_id"></el-input>
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
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.depositjapanese"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!--2-->
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_DEPOSITJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                          <el-input  :disabled="!disable"style="width:20vw" v-model="form.depositchinese"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_PRPLACEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.prplacejapanese"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_PRPLACEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.prplacechinese"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <!--3-->
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_DEPLOYMENT')">
                          <el-input  :disabled="!disable"style="width:20vw" v-model="form.deployment"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_PJNAMEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.pjnamejapanese"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_PJNAMEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.pjnamechinese"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <!--4-->
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_OPENINGDATE')" >
                          <el-date-picker
                            v-model="form.openingdate"
                            :disabled="!disable"
                            type="daterange"
                            :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                            :start-placeholder="$t('label.startdate')"
                            :end-placeholder="$t('label.enddate')"
                            style="width:20vw">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_ENDDATE')">
                          <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.enddate">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029VIEW_CURRENCYFORMAT')">
                          <dicselect :code="code2"
                                     :data="form.currencyformat"
                                     :disabled="!disable"
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
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.claimamount"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <!--add table-->
                  </el-tab-pane>

                  <!--info2-->
                  <el-tab-pane :label="$t('label.PFANS1029FROM_technical')" name="fourth">
                    <!--1-->
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_prplaceposition')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.prplacepositionjapanese"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_prplaceposition')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
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
                        <el-form-item :label="$t('label.PFANS1029FROM_signingdate')">
                          <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.signingdate">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_technicalcontent')+$t(' (')+$t('label.PFANS1024VIEW_JAPANESE')+$t(') ')">
                          <el-input type="textarea" v-model="form.technicalcontentjapanese"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_technicalcontent')+$t(' (')+$t('label.PFANS1024VIEW_CHINESE')+$t(') ')">
                          <el-input type="textarea" v-model="form.technicalcontentchinese"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1029FROM_redelegate')">
                          <dicselect :code="code3"
                                     :data="form.redelegate"
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
                        <el-form-item label="">
                          <el-input type="textarea" v-model="form.redelegatecontent"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
              </div>

            </el-tab-pane>

            <!--役務契約書(受託)-->
            <el-tab-pane :label="$t('label.PFANS1029FROM_labor')" name="second">
              <!--1-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_CONTRACTID')">
                    <el-input  :disabled="!disable" style="width:20vw" v-model="form.contract_id"></el-input>
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
                    <el-input  :disabled="!disable" style="width:20vw" v-model="form.depositjapanese"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--2-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_DEPOSITJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                    <el-input  :disabled="!disable"style="width:20vw" v-model="form.depositchinese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_PRPLACEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                    <el-input  :disabled="!disable" style="width:20vw" v-model="form.prplacejapanese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_PRPLACEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                    <el-input  :disabled="!disable" style="width:20vw" v-model="form.prplacechinese"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!--3-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_DEPLOYMENT')">
                    <el-input  :disabled="!disable"style="width:20vw" v-model="form.deployment"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_PJNAMEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                    <el-input  :disabled="!disable" style="width:20vw" v-model="form.pjnamejapanese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_PJNAMEJAPANESE')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                    <el-input  :disabled="!disable" style="width:20vw" v-model="form.pjnamechinese"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!--4-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_OPENINGDATE')" >
                    <el-date-picker
                      v-model="form.openingdate"
                      :disabled="!disable"
                      type="daterange"
                      :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                      :start-placeholder="$t('label.startdate')"
                      :end-placeholder="$t('label.enddate')"
                      style="width:20vw">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_ENDDATE')">
                    <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.enddate">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029VIEW_CURRENCYFORMAT')">
                    <dicselect :code="code2"
                               :data="form.currencyformat"
                               :disabled="!disable"
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
                    <el-input  :disabled="!disable" style="width:20vw" v-model="form.claimamount"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!--6-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029FROM_companyleader')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')">
                    <el-input  :disabled="!disable"style="width:20vw" v-model="form.companyleaderjapanese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029FROM_companyleader')+$t('（')+$t('label.PFANS1024VIEW_CHINESE')+$t('）')">
                    <el-input  :disabled="!disable" style="width:20vw" v-model="form.companyleaderchinese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1029FROM_signingdate')">
                    <el-input  :disabled="!disable" style="width:20vw" v-model="form.signingdate"></el-input>
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
  import {getDictionaryInfo} from '@/utils/customize';


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
        activeName1: 'first',
        activeName2: 'third',
        disabled: true,
        tableAValue:'',
        error: '',
        userlist: '',
        code1: 'PJ010',
        code2: 'HT005',
        code3:'',
        errorgroup:'',
        selectType: "Single",
        loading: false,
        title: "title.PFANS1029VIEW",
        canStart: false,
        multiple: false,
        orglist:'',
        baseInfo: {},
        form: {
            contract_id:'',
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
            currencyformat:'',
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
            validator: checktele,
            trigger: 'change'
          }],
        },
        buttonList: []
      }
    },
    mounted() {
      console.log("fffffffffffffff");
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1029Store/one', {"contract_id": this.$route.params._id})
          .then(response => {
            this.form = response;
            this.loading = false;
            console.log(response);
           /* if (response.length > 0) {
              for (let i = 0; i < response.length; i++) {
                if(response[i].contracttype !== null && response[i].contracttype !== ""){
                  this.form.contracttype = getDictionaryInfo(response[i].contracttype).value1;
                }
                this.form.contractnumber= response[i].contractnumber;
                this.form.deployment= response[i].deployment;
                this.form.claimamount= response[i].claimamount;
                this.form.currencyposition= response[i].currencyposition;
                this.form.custojapanese= response[i].custojapanese;
                this.form.placejapanese= response[i].placejapanese;
                this.form.placechinese= response[i].placechinese;
                if(response[i].currencyposition !== null && response[i].currencyposition !== ""){
                  this.form.currencyposition= getDictionaryInfo(response[i].currencyposition).value1;
                }

                if(this.form.contractdate!=="" && this.form.contractdate!==null){
                  this.form.contractdate=response[i].contractdate;
                }
              }
            }*/
            // if (response.awardDetail.length > 0) {
            //   this.tableT = response.awardDetail
            //   for (var i = 0; i < this.tableT.length; i++) {
            //     this.orglist=this.tableT[i].depart;
            //   }
            // }
           /* this.userlist = this.form.user_id;
            this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.awardDetail = JSON.parse(JSON.stringify(this.tableT));
            this.loading = false;*/
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
        this.form.contracttype=val;
      },
      getcurrencyformat(val) {
        this.form.currencyformat = val;
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
              this.baseInfo={};
              this.form.user_id=this.userlist;
              this.form.deliverydate=moment(this.form.deliverydate).format('YYYY-MM-DD');
              this.form.developdate=moment(this.form.developdate[0]).format('YYYY-MM-DD')+" ~ "+moment(this.form.developdate[1]).format('YYYY-MM-DD');
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
                  .dispatch('PFANSStore/update',this.baseInfo)
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

