<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" @buttonClick="buttonClick"
                        ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1025VIEW_FIRSTDETAILS')" name="first">
              <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1032FORMVIEW_CONTRACTNUMBER')" prop="contractnumber">
                  <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                            v-model="form.contractnumber"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" prop="contracttype">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.contracttype"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1031FORMVIEW_DEPOSITJAPANESE')" prop="trusteejapanese">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.trusteejapanese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYCHINESE')" prop="trusteechinese">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.trusteechinese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACEJAPANESE')" prop="entrustedjapanese">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.entrustedjapanese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACECHINESE')" prop="entrustedchinese">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.entrustedchinese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" prop="department">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.department"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')" prop="pjjapanese">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.pjjapanese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')" prop="pjchinese">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.pjchinese"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1025VIEW_OPENINGDATE')" prop="startdate">
                    <el-date-picker :disabled="!disabled" type="date" v-model="form.startdate" style="width: 11rem" ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1025VIEW_ENDDATE')" prop="enddate">
                    <el-date-picker :disabled="!disabled" type="date" v-model="form.enddate" style="width: 11rem" ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')" prop="currency">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.currency"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" prop="requested">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.requested"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" prop="executor">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.executor"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-table :data="tablefirst" stripe header-cell-class-name="sub_bg_color_grey height">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_NUMBER')" align="center"  prop="delivery" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.delivery">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliveryaate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliveryaate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="finishedday"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.finishedday" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center"  prop="requestday" width="200">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.requestday" style="width: 11rem" ></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center"  prop="supportday" width="200">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportday" style="width: 11rem" ></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" prop="amount" width="200">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.amount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                    </template>
                  </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1025VIEW_SECONDDETAILS')" name="second">
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span  class="collapse_Title">{{$t('label.PFANS1027FORMVIEW_INSTRUMENT')}}</span>
                  </template>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1027FORMVIEW_NUMBER')" prop="requestnumber">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.requestnumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <span  class="collapse_Title">{{$t('label.PFANS1027FORMVIEW_METHOD')}}</span>
                </template>
              <el-row>
                <el-col :span="8">
                    <el-radio-group v-model="radio1">
                      <el-radio :label="1" :disabled="!disabled" v-model="form.batch">{{$t('label.PFANS1027FORMVIEW_BATCH')}}</el-radio>
                      <el-radio :label="2" :disabled="!disabled" v-model="form.settlement">{{$t('label.PFANS1027FORMVIEW_SETTLEMENT')}}</el-radio>
                    </el-radio-group>
                </el-col>
              </el-row>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <span  class="collapse_Title">{{$t('label.PFANS1027FORMVIEW_FORM')}}</span>
                </template>
              <el-row>
                <el-col :span="8">
                    <el-radio-group v-model="radio2">
                      <el-radio :label="1" :disabled="!disabled" v-model="form.contract">{{$t('label.PFANS1027FORMVIEW_CONTRACT')}}</el-radio>
                      <el-radio :label="2" :disabled="!disabled" v-model="form.appoint">{{$t('label.PFANS1027FORMVIEW_APPOINT')}}</el-radio>
                      <el-radio :label="3" :disabled="!disabled" v-model="form.conservative">{{$t('label.PFANS1027FORMVIEW_CONSERVATIVE')}}</el-radio>
                    </el-radio-group>
                </el-col>
              </el-row>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <span  class="collapse_Title">{{$t('label.PFANS1027FORMVIEW_DEFECTS')}}</span>
                </template>
              <el-row>
                <el-col :span="8">
                    <el-radio-group v-model="radio3">
                      <el-radio :label="1" :disabled="!disabled" v-model="form.available">{{$t('label.PFANS1027FORMVIEW_YES')}}</el-radio>
                      <el-radio :label="2" :disabled="!disabled" v-model="form.none">{{$t('label.PFANS1027FORMVIEW_NO')}}</el-radio>
                    </el-radio-group>
                </el-col>
              </el-row>
              </el-collapse-item>
             </el-collapse>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1027VIEW_DETAILS')" name="third">

            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1027VIEW_SYSTEM')" name="fourth">
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="erroruser"  :label="$t('label.PFANS1027FORMVIEW_NAME')" prop="deployment">
                    <user :disabled="!disabled" :error="erroruser" :selectType="selectType" :userlist="userlist"
                          @getUserids="getUserids" style="width: 20vw"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1027FORMVIEW_RESPONSIBLE')" prop="responsible">
                    <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                              v-model="form.responsible"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1027FORMVIEW_TEL')" prop="TEL">
                  <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                            v-model="form.TEL"></el-input>
                </el-form-item>
              </el-col>
               </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1027FORMVIEW_SYSTEM')" prop="system">
                    <el-input v-model="form.system" type="textarea" :rows="3" :disabled="!disabled" style="width: 72vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1027VIEW_ESTIMATION')" name="fifth">
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span  class="collapse_Title">{{$t('label.PFANS1027FORMVIEW_EXPENSES')}}</span>
                  </template>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1027FORMVIEW_REFER')"></el-form-item>
                </el-col>
              </el-row>
                </el-collapse-item>
                <el-collapse-item>
                  <template slot="title">
                    <span  class="collapse_Title">{{$t('label.PFANS1027FORMVIEW_FRUIT')}}</span>
                  </template>
              <el-row>
                <el-col :span="8">
                  <el-input :disabled="!disabled" maxlength='20' style="width: 20vw"
                            v-model="form.fruit"></el-input>
                </el-col>
              </el-row>
                </el-collapse-item>
                  </el-collapse>
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
    import PFANS1027View from "../PFANS1027/PFANS1027View.vue";
    import dicselect from "../../../components/dicselect.vue";
    import {Message} from 'element-ui'
    import {getOrgInfoByUserId} from '@/utils/customize';

    export default {
        name: 'PFANS1027FormView',
        components: {
            EasyNormalContainer,
            PFANS1027View,
            user,
            dicselect
        },
        data() {
            return {
                radio1: 1,
                radio2: 1,
                radio3: 1,
                index: "",
                baseInfo: {},
                activeName: 'first',
                loading: false,
                selectType: "Single",
                nomineeslist: "",
                erroruser: '',
                userlist: '',
                title: "title.PFANS1027VIEW",
                buttonList: [],
                tabIndex: 0,
                multiple: false,
                form: {
                    quotationid: '',
                    contractnumber: '',
                    contracttype: '',
                    trusteejapanese: '',
                    trusteechinese: '',
                    entrustedjapanese: '',
                    entrustedchinese: '',
                    department: '',
                    pjjapanese: '',
                    pjchinese: '',
                    startdate: '',
                    enddate: '',
                    currency: '',
                    requested: '',
                    executor: '',
                    requestnumber: '',
                    batch: '',
                    settlement: '',
                    contract: '',
                    appoint: '',
                    conservative: '',
                    available: '',
                    none: '',
                    deployment: '',
                    responsible: '',
                    tel: '',
                    system: '',
                },
              tablefirst: [
                {
                  basicinformationid: '',
                  quotationid: '',
                  delivery: '',
                  deliveryaate: '',
                  finishedday: '',
                  requestday: '',
                  supportday: '',
                  amount: '',
                },
              ],
                disabled: true,
                menuList: [],
                rules: {},
                show: false,
                show1: false,
                show2: false,
                show3: false,
                show4: false,
                canStart: false,
                qualifications: '',
                fileList: [],
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1027Store/selectById', {"quotationid": this.$route.params._id})
                    .then(response => {
                        this.form = response.quotation;
                      if (response.basicinformation.length > 0) {
                        this.tablefirst = response.basicinformation;
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
                this.loading = false;
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
            this.disabled = this.$route.params.disabled;
        },
        methods: {
          getUserids(val) {
            this.form.deployment = val;
          },
            buttonClick(val) {
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                      this.loading = true;
                      this.baseInfo = {};
                      this.baseInfo.quotation = JSON.parse(JSON.stringify(this.form));
                      this.baseInfo.basicinformation = [];
                      for (let i = 0; i < this.tablefirst.length; i++) {
                        if (this.tablefirst[i].delivery !== '' || this.tablefirst[i].deliveryaate !== '' || this.tablefirst[i].finishedday !== '' ||
                          this.tablefirst[i].requestday !== '' || this.tablefirst[i].supportday !== '' || this.tablefirst[i].amount !== ''
                        )
                          this.baseInfo.basicinformation.push(
                            {
                              basicinformationid: this.tablefirst[i].basicinformationid,
                              quotationid: this.tablefirst[i].quotationid,
                              delivery: this.tablefirst[i].delivery,
                              deliveryaate: this.tablefirst[i].deliveryaate,
                              finishedday: this.tablefirst[i].finishedday,
                              requestday: this.tablefirst[i].requestday,
                              supportday: this.tablefirst[i].supportday,
                              amount:  this.tablefirst[i].amount,
                            },
                          );
                        }
                        if (this.$route.params._id) {
                          this.form.quotationid = this.$route.params._id;
                          this.loading = true;
                          this.$store
                            .dispatch('PFANS1027Store/update', this.baseInfo)
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
                        }
                    }
                });
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
