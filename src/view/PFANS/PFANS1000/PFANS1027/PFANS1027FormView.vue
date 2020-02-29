<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" @buttonClick="buttonClick"
                        ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1025VIEW_FIRSTDETAILS')" name="first" >
              <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1032FORMVIEW_CONTRACTNUMBER')" prop="contractnumber">
                  <el-input :disabled="!disabled1" maxlength='20' style="width: 20vw"
                            v-model="form.contractnumber"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" prop="contracttype">
                    <dicselect
                      :code="code"
                      :data="form.contracttype"
                      :disabled="!disabled1"
                      :selectType="selectType"
                      @change="getContracttype"
                      style="width:20vw">
                    </dicselect>
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
                  <el-form-item :label="$t('label.PFANS1027FORMVIEW_JAPANESE')" prop="entrustedjapanese">
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
                  <el-form-item :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" prop="deployment">
                    <el-input :disabled="!disabled1" maxlength='20' style="width: 20vw"
                              v-model="form.deployment"></el-input>
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
                    <el-date-picker :disabled="!disabled" type="date" v-model="form.startdate" style="width: 18rem" ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1025VIEW_ENDDATE')" prop="enddate">
                    <el-date-picker :disabled="!disabled" type="date" v-model="form.enddate" style="width: 18rem" ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')" prop="currencyposition">
                    <dicselect
                      code="HT006"
                      :data="form.currencyposition"
                      style="width: 20vw"
                      :disabled="!disabled1">
                    </dicselect>
                    <!--<el-input :disabled="!disabled1" maxlength='20' style="width: 20vw"-->
                              <!--v-model="form.currencyposition"></el-input>-->
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" prop="claimamount">
                    <el-input :disabled="!disabled1" maxlength='20' style="width: 20vw"
                              v-model="form.claimamount"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" prop="loadingjudge">
                    <el-input :disabled="!disabled1" maxlength='20' style="width: 20vw"
                              v-model="form.loadingjudge"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-table :data="tablefirst" stripe header-cell-class-name="sub_bg_color_grey height">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_NUMBER')" align="center"  prop="claimtype" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.claimtype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliverydate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.completiondate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center"  prop="claimdate" width="200">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center"  prop="supportdate" width="200">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" prop="claimamount" width="200">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
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
                    <el-radio-group v-model="radio1" @change="radio1change">
                      <el-radio :label="1" :disabled="!disabled">{{$t('label.PFANS1027FORMVIEW_BATCH')}}</el-radio>
                      <el-radio :label="2" :disabled="!disabled">{{$t('label.PFANS1027FORMVIEW_SETTLEMENT')}}</el-radio>
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
                    <el-radio-group v-model="radio2" @change="radio2change">
                      <el-radio :label="1" :disabled="!disabled">{{$t('label.PFANS1027FORMVIEW_CONTRACT')}}</el-radio>
                      <el-radio :label="2" :disabled="!disabled">{{$t('label.PFANS1027FORMVIEW_APPOINT')}}</el-radio>
                      <el-radio :label="3" :disabled="!disabled">{{$t('label.PFANS1027FORMVIEW_CONSERVATIVE')}}</el-radio>
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
                    <el-radio-group v-model="radio3" @change="radio3change">
                      <el-radio :label="1" :disabled="!disabled">{{$t('label.PFANS1027FORMVIEW_YES')}}</el-radio>
                      <el-radio :label="2" :disabled="!disabled">{{$t('label.PFANS1027FORMVIEW_NO')}}</el-radio>
                    </el-radio-group>
                </el-col>
              </el-row>
              </el-collapse-item>
             </el-collapse>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1027VIEW_DETAILS')" name="third">
              <el-tabs v-model="activeName2" type="border-card">
                <el-tab-pane :label="$t('label.PFANS1027FORMVIEW_PERSON')" name="third1">
                  <el-table
                    :data="tablethird1"
                    :span-method="objectSpanMethod"
                    border
                    style="width: 100%; margin-top: 20px"
                    stripe header-cell-class-name="sub_bg_color_grey height">
                    <el-table-column
                      width="200">
                      <template slot-scope="scope">
                        {{$t('label.PFANS1027FORMVIEW_APPOINT1')}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      :label="$t('label.PFANS1027VIEW_CONTENT')"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1027VIEW_UNITPRICE')"
                      width="200">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.functionsprice1" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1027VIEW_MANHOUR')"
                      width="200">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.functionhour1" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1027VIEW_UNIT')"
                      width="200">
                      <template slot-scope="scope">
                        <dicselect
                          :no="scope.row"
                          :code="code"
                          :data="scope.row.functionunit1"
                          :multiple="multiple"
                          @change="getFunctionunit1"
                          style="width: 11rem"
                          :disabled="!disabled">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1027VIEW_COST')"
                      width="200">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.functionamount1" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1027FORMVIEW_OTHER')" name="third2">
                  <el-table :data="tablethird2" stripe header-cell-class-name="sub_bg_color_grey height">
                    <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content"
                                     type="index" width="50"></el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_NUMBER')" align="center"  prop="claimtype" width="200">
                      <template slot-scope="scope">
                        <el-input :disabled="!disabled" v-model="scope.row.claimtype">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"  width="200">
                      <template slot-scope="scope">
                        <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliverydate" style="width: 11rem" ></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"  width="200">
                      <template slot-scope="scope">
                        <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.completiondate" style="width: 11rem" ></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center"  prop="claimdate" width="200">
                      <template slot-scope="scope">
                        <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center"  prop="supportdate" width="200">
                      <template slot-scope="scope">
                        <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" prop="claimamount" width="200">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1027VIEW_SYSTEM')" name="fourth">
              <el-row>
                <el-col :span="8">
                    <el-form-item :error="errorcenter" :label="$t('label.PFANS1027FORMVIEW_NAME')" prop="deploy">
                      <org :disabled="!disabled" :error="errorcenter" :orglist="centerorglist" @getOrgids="getCenterId"
                           orgtype="2" style="width:20vw"></org>
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
                  <el-table :data="tablefifth" stripe header-cell-class-name="sub_bg_color_grey height">
                    <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content"
                                     type="index" width="50"></el-table-column>
                    <el-table-column :label="$t('label.PFANS1027FORMVIEW_FRUITNAME')" align="center"  prop="delivery" width="200">
                      <template slot-scope="scope">
                        <el-input :disabled="!disabled" v-model="scope.row.fruition">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.operation')" align="center" width="180">
                      <template slot-scope="scope">
                        <el-button
                          :disabled="!disabled"
                          @click.native.prevent="deleteRow(scope.$index, tablefifth)"
                          plain
                          size="small"
                          type="danger"
                        >{{$t('button.delete')}}
                        </el-button>
                        <el-button
                          :disabled="!disabled"
                          @click="addRow()"
                          plain
                          size="small"
                          type="primary"
                        >{{$t('button.insert')}}
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
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
    import org from "../../../components/org";
    import moment from "moment";
    import {getOrgInfo,getDictionaryInfo,getUserInfo} from '@/utils/customize';

    export default {
        name: 'PFANS1027FormView',
        components: {
            EasyNormalContainer,
            PFANS1027View,
            user,
            dicselect,
            org
        },
        data() {
            return {
                radio1: 1,
                radio2: 1,
                radio3: 1,
                index: "",
                baseInfo: {},
                activeName: 'first',
                activeName2: 'third1',
                loading: false,
                selectType: "Single",
                nomineeslist: "",
                errorcenter: '',
                centerorglist: '',
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
                    deployment: '',
                    pjjapanese: '',
                    pjchinese: '',
                    startdate: '',
                    enddate: '',
                    currencyposition: '',
                    claimamount: '',
                    loadingjudge: '',
                    requestnumber: '',
                    batch: '',
                    settlement: '',
                    contract: '',
                    deploy: '',
                    responsible: '',
                    tel: '',
                    system: '',
                },
                tablefirst: [
                {
                  basicinformationid: '',
                  quotationid: '',
                  claimtype: '',
                  deliverydate: '',
                  completiondate: '',
                  claimdate: '',
                  supportdate: '',
                  claimamount: '',
                },
              ],
              tablethird1: [{
                name: '仕様分析',
                functionsprice1: '',
                functionhour1: '',
                functionunit1: '',
                functionamount1: ''
              }, {
                name: 'システム設計',
                  systemsprice1: '',
                  systemhour1: '',
                  systemunit1: '',
                  systemamount1: ''
              }, {
                name: '詳細設計',
                  designsprice1: '',
                  designhour1: '',
                  designunit1: '',
                  designamount1: ''
                },{
                name: '検証設計',
                  versprice1: '',
                  verhour1: '',
                  verunit1: '',
                  veramount1: ''
                },{
                name: '実装',
                implesprice1: '',
                implehour1: '',
                impleunit1: '',
                impleamount1: ''
              },{
                name: '検証・デバッグ',
                debugsprice1: '',
                debughour1: '',
                debugunit1: '',
                debugamount1: ''
              },{
                name: '仕様分析',
                functionsprice2: '',
                functionhour2: '',
                functionunit2: '',
                functionamount2: ''
              }, {
                name: 'システム設計',
                systemsprice2: '',
                systemhour2: '',
                systemunit2: '',
                systemamount2: ''
              }, {
                name: '詳細設計',
                designsprice2: '',
                designhour2: '',
                designunit2: '',
                designamount2: ''
              },{
                name: '検証設計',
                versprice2: '',
                verhour2: '',
                verunit2: '',
                veramount2: ''
              },{
                name: '実装',
                implesprice2: '',
                implehour2: '',
                impleunit2: '',
                impleamount2: ''
              },{
                name: '検証・デバッグ',
                debugsprice2: '',
                debughour2: '',
                debugunit2: '',
                debugamount2: ''
              },{
                name: '仕様分析',
                functionsprice3: '',
                functionhour3: '',
                functionunit3: '',
                functionamount3: ''
              }, {
                name: 'システム設計',
                systemsprice3: '',
                systemhour3: '',
                systemunit3: '',
                systemamount3: ''
              }, {
                name: '詳細設計',
                designsprice3: '',
                designhour3: '',
                designunit3: '',
                designamount3: ''
              },{
                name: '検証設計',
                versprice3: '',
                verhour3: '',
                verunit3: '',
                veramount3: ''
              },{
                name: '実装',
                implesprice3: '',
                implehour3: '',
                impleunit3: '',
                impleamount3: ''
              },{
                name: '検証・デバッグ',
                debugsprice3: '',
                debughour3: '',
                debugunit3: '',
                debugamount3: ''
              },],
              //   tablethird1:[
              //   {
              //   personfeeid: '',
              //   quotationid: '',
              //   functionsprice1: '',
              //   functionhour1: '',
              //   functionunit1: '',
              //   functionamount1: '',
              //   systemsprice1: '',
              //   systemhour1: '',
              //   systemunit1: '',
              //   systemamount1: '',
              //   designsprice1: '',
              //   designhour1: '',
              //   designunit1: '',
              //   designamount1: '',
              //   versprice1: '',
              //   verhour1: '',
              //   verunit1: '',
              //   veramount1: '',
              //   implesprice1: '',
              //   implehour1: '',
              //   impleunit1: '',
              //   impleamount1: '',
              //   debugsprice1: '',
              //   debughour1: '',
              //   debugunit1: '',
              //   debugamount1: '',
              //   functionsprice2: '',
              //   functionhour2: '',
              //   functionunit2: '',
              //   functionamount2: '',
              //   systemsprice2: '',
              //   systemhour2: '',
              //   systemunit2: '',
              //   systemamount2: '',
              //   designsprice2: '',
              //   designhour2: '',
              //   designunit2: '',
              //   designamount2: '',
              //   versprice2: '',
              //   verhour2: '',
              //   verunit2: '',
              //   veramount2: '',
              //   implesprice2: '',
              //   implehour2: '',
              //   impleunit2: '',
              //   impleamount2: '',
              //   debugsprice2: '',
              //   debughour2: '',
              //   debugunit2: '',
              //   debugamount2: '',
              //   functionsprice3: '',
              //   functionhour3: '',
              //   functionunit3: '',
              //   functionamount3: '',
              //   systemsprice3: '',
              //   systemhour3: '',
              //   systemunit3: '',
              //   systemamount3: '',
              //   designsprice3: '',
              //   designhour3: '',
              //   designunit3: '',
              //   designamount3: '',
              //   versprice3: '',
              //   verhour3: '',
              //   verunit3: '',
              //   veramount3: '',
              //   implesprice3: '',
              //   implehour3: '',
              //   impleunit3: '',
              //   impleamount3: '',
              //   debugsprice3: '',
              //   debughour3: '',
              //   debugunit3: '',
              //   debugamount3: '',
              //   },
              // ],
                tablethird2:[
                {
                  othpersonfeeid: '',
                  quotationid: '',
                  detailed1: '',
                  cost1: '',
                  unit1: '',
                  amount1: '',
                  detailed2: '',
                  cost2: '',
                  unit2: '',
                  amount2: '',
                  detailed3: '',
                  cost3: '',
                  unit3: '',
                  amount3: '',
                },
              ],
                tablefifth:[
                {
                  fruition: '',
                },
              ],
                disabled: true,
                disabled1: false,
                menuList: [],
                rules: {},
                canStart: false,
                qualifications: '',
                fileList: [],
                code: 'HT008',
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1027Store/selectById', {"quotationid": this.$route.params._id})
                    .then(response => {
                      this.form = response.quotation;
//                      //契約種類
//                      let letabbreviation = getDictionaryInfo(response[i].contracttype);
//                     if (letabbreviation != null) {
//                        response[i].contracttype = letabbreviation.value1;
//                      }

                      // 委託元（和文）
                      if(this.form.trusteejapanese !== null && this.form.trusteejapanese !== "") {
                        let user = getUserInfo(this.form.trusteejapanese);
                        if (user) {
                          this.form.trusteejapanese = user.userinfo.customername;
                        }
                      }
                      // 出荷判定実施者
                      if(this.form.loadingjudge !== null && this.form.loadingjudge !== "") {
                        let user = getUserInfo(this.form.loadingjudge);
                        if (user) {
                          this.form.loadingjudge = user.userinfo.customername;
                        }
                      }
                      if (response.basicinformation.length > 0) {
                        this.tablefirst = response.basicinformation;
                      }
                      if (response.personfee.length > 0) {
                        this.tablethird1 = response.personfee;
                      }
                      if (response.othpersonfee.length > 0) {
                        this.tablethird2 = response.othpersonfee;
                      }
                      if (response.fruit.length > 0) {
                        this.tablefifth = response.fruit;
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
      created() {
        this.disable = this.$route.params.disabled;
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
        // created(){
        //     if(!this.$route.params.disabled){
        //         this.buttonList=[
        //             {
        //                 key: 'generate',
        //                 name: 'button.generate',
        //                 disabled: false,
        //             }
        //         ]
        //     }else {
        //         this.buttonList=[
        //             {
        //                 key: 'save',
        //                 name: 'button.save',
        //                 disabled: false,
        //                 icon: 'el-icon-check',
        //             },
        //         ]
        //     }
        //     this.disable = this.$route.params.disabled;
        // },
        methods: {
          getCenterId(val) {
            this.form.deploy = val;
            this.centerorglist = val;
          },
          getContracttype(val){
            this.form.contracttype = val;
          },
          radio1change(val){
            this.radio1 = val;
          },
          radio2change(val){
            this.radio2 = val;
          },
          radio3change(val){
            this.radio3 = val;
          },
          getFunctionunit1(val,row){
            row.functionunit1 = val;
          },
          objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 ) {
              if (rowIndex === 0) {
                return {
                  rowspan: 6,
                  colspan: 1
                };
              }else if (rowIndex === 0) {
                return {
                  rowspan: 6,
                  colspan: 1
                };
              }else if (rowIndex === 0) {
                return {
                  rowspan: 6,
                  colspan: 1
                };
              }
              else {
                return {
                  rowspan: 0,
                  colspan: 0
                };
              }
            }
          },
          deleteRow(index, rows) {
            if (rows.length > 1) {
              rows.splice(index, 1);
            }else{
              this.tablefifth = [{
                fruition: '',
              }]
            }
          },
          addRow() {
            this.tablefifth.push({
              fruitid: '',
              quotationid: '',
              fruition: '',
            });
          },
            buttonClick(val) {
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                      this.loading = true;
                      this.form.batch = this.radio1;
                      this.form.settlement = this.radio2;
                      this.form.contract = this.radio3;
                      this.form.startdate = moment(this.form.applicationtime).format('YYYY-MM-DD');
                      this.form.enddate = moment(this.form.turningday).format('YYYY-MM-DD');
                      this.baseInfo = {};
                      this.baseInfo.quotation = JSON.parse(JSON.stringify(this.form));
                      this.baseInfo.basicinformation = [];
                      this.baseInfo.personfee = [];
                      this.baseInfo.othpersonfee = [];
                      this.baseInfo.fruit = [];
                      for (let i = 0; i < this.tablefirst.length; i++) {
                        if (this.tablefirst[i].claimtype !== '' || this.tablefirst[i].deliverydate !== '' || this.tablefirst[i].completiondate !== '' ||
                          this.tablefirst[i].claimdate !== '' || this.tablefirst[i].supportdate !== '' || this.tablefirst[i].claimamount !== ''
                        )
                          this.baseInfo.basicinformation.push(
                            {
                              basicinformationid: this.tablefirst[i].basicinformationid,
                              quotationid: this.tablefirst[i].quotationid,
                              claimtype: this.tablefirst[i].claimtype,
                              deliverydate: this.tablefirst[i].deliverydate,
                              completiondate: this.tablefirst[i].completiondate,
                              claimdate: this.tablefirst[i].claimdate,
                              supportdate: this.tablefirst[i].supportdate,
                              claimamount:  this.tablefirst[i].claimamount,
                            },
                          );
                        }
                      for (let i = 0; i < this.tablethird1.length; i++) {
                        if (this.tablethird1[i].functionsprice1 !== '' || this.tablethird1[i].functionhour1 !== '' || this.tablethird1[i].functionunit1 !== '' ||
                          this.tablethird1[i].functionamount1 !== '' || this.tablethird1[i].systemsprice1 !== '' || this.tablethird1[i].systemsprice1 !== '' || this.tablethird1[i].systemhour1 !== ''
                          || this.tablethird1[i].designsprice1 !== '' || this.tablethird1[i].designhour1 !== '' || this.tablethird1[i].designunit1 !== '' || this.tablethird1[i].designamount1 !== ''
                          || this.tablethird1[i].versprice1 !== '' || this.tablethird1[i].verhour1 !== '' || this.tablethird1[i].verunit1 !== '' || this.tablethird1[i].veramount1 !== ''
                          || this.tablethird1[i].implesprice1 !== '' || this.tablethird1[i].implehour1 !== '' || this.tablethird1[i].impleunit1 !== '' || this.tablethird1[i].impleamount1 !== ''
                          || this.tablethird1[i].debugsprice1 !== '' || this.tablethird1[i].debughour1 !== '' || this.tablethird1[i].debugunit1 !== '' || this.tablethird1[i].debugamount1 !== ''
                          || this.tablethird1[i].functionsprice2 !== '' || this.tablethird1[i].functionhour2 !== '' || this.tablethird1[i].functionunit2 !== '' || this.tablethird1[i].functionamount2 !== ''
                          || this.tablethird1[i].systemsprice2 !== '' || this.tablethird1[i].systemhour2 !== '' || this.tablethird1[i].systemunit2 !== '' || this.tablethird1[i].systemamount2 !== ''
                          || this.tablethird1[i].designsprice2 !== '' || this.tablethird1[i].designhour2 !== '' || this.tablethird1[i].designunit2 !== '' || this.tablethird1[i].designamount2 !== ''
                          || this.tablethird1[i].versprice2 !== '' || this.tablethird1[i].verhour2 !== '' || this.tablethird1[i].verunit2 !== '' || this.tablethird1[i].veramount2 !== ''
                          || this.tablethird1[i].implesprice2 !== '' || this.tablethird1[i].implehour2 !== '' || this.tablethird1[i].impleunit2 !== '' || this.tablethird1[i].impleamount2 !== ''
                          || this.tablethird1[i].debugsprice2 !== '' || this.tablethird1[i].debughour2 !== '' || this.tablethird1[i].debugunit2 !== '' || this.tablethird1[i].debugamount2 !== ''
                          || this.tablethird1[i].functionsprice3 !== '' || this.tablethird1[i].functionhour23!== '' || this.tablethird1[i].functionunit3 !== '' || this.tablethird1[i].functionamount3 !== ''
                          || this.tablethird1[i].systemsprice3 !== '' || this.tablethird1[i].systemhour3 !== '' || this.tablethird1[i].systemunit3 !== '' || this.tablethird1[i].systemamount3 !== ''
                          || this.tablethird1[i].designsprice3 !== '' || this.tablethird1[i].designhour3 !== '' || this.tablethird1[i].designunit3 !== '' || this.tablethird1[i].designamount3 !== ''
                          || this.tablethird1[i].versprice3 !== '' || this.tablethird1[i].verhour3 !== '' || this.tablethird1[i].verunit3 !== '' || this.tablethird1[i].veramount3 !== ''
                          || this.tablethird1[i].implesprice3 !== '' || this.tablethird1[i].implehour3 !== '' || this.tablethird1[i].impleunit3 !== '' || this.tablethird1[i].impleamount3 !== ''
                          || this.tablethird1[i].debugsprice3 !== '' || this.tablethird1[i].debughour3 !== '' || this.tablethird1[i].debugunit3 !== '' || this.tablethird1[i].debugamount3 !== ''
                        )
                          this.baseInfo.personfee.push(
                            {
                              personfeeid: this.tablethird1[i].personfeeid,
                              quotationid: this.tablethird1[i].quotationid,
                              functionsprice1: this.tablethird1[i].functionsprice1,
                              functionhour1: this.tablethird1[i].functionhour1,
                              functionunit1: this.tablethird1[i].functionunit1,
                              functionamount1: this.tablethird1[i].functionamount1,
                              systemsprice1: this.tablethird1[i].systemsprice1,
                              systemhour1:  this.tablethird1[i].systemhour1,
                              systemunit1:  this.tablethird1[i].systemunit1,
                              systemamount1:  this.tablethird1[i].systemamount1,
                              designsprice1:  this.tablethird1[i].designsprice1,
                              designhour1:  this.tablethird1[i].designhour1,
                              designunit1:  this.tablethird1[i].designunit1,
                              designamount1:  this.tablethird1[i].designamount1,
                              versprice1:  this.tablethird1[i].versprice1,
                              verhour1:  this.tablethird1[i].verhour1,
                              verunit1:  this.tablethird1[i].verunit1,
                              veramount1:  this.tablethird1[i].veramount1,
                              implesprice1:  this.tablethird1[i].implesprice1,
                              implehour1:  this.tablethird1[i].implehour1,
                              impleunit1:  this.tablethird1[i].impleunit1,
                              impleamount1:  this.tablethird1[i].impleamount1,
                              debugsprice1:  this.tablethird1[i].debugsprice1,
                              debughour1:  this.tablethird1[i].debughour1,
                              debugunit1:  this.tablethird1[i].debugunit1,
                              debugamount1:  this.tablethird1[i].debugamount1,
                              functionsprice2: this.tablethird1[i].functionsprice2,
                              functionhour2: this.tablethird1[i].functionhour2,
                              functionunit2: this.tablethird1[i].functionunit2,
                              functionamount2: this.tablethird1[i].functionamount2,
                              systemsprice2: this.tablethird1[i].systemsprice2,
                              systemhour2:  this.tablethird1[i].systemhour2,
                              systemunit2:  this.tablethird1[i].systemunit2,
                              systemamount2:  this.tablethird1[i].systemamount2,
                              designsprice2:  this.tablethird1[i].designsprice2,
                              designhour2:  this.tablethird1[i].designhour2,
                              designunit2:  this.tablethird1[i].designunit2,
                              designamount2:  this.tablethird1[i].designamount2,
                              versprice2:  this.tablethird1[i].versprice2,
                              verhour2:  this.tablethird1[i].verhour2,
                              verunit2:  this.tablethird1[i].verunit2,
                              veramount2:  this.tablethird1[i].veramount2,
                              implesprice2:  this.tablethird1[i].implesprice2,
                              implehour2:  this.tablethird1[i].implehour2,
                              impleunit2:  this.tablethird1[i].impleunit2,
                              impleamount2:  this.tablethird1[i].impleamount2,
                              debugsprice2:  this.tablethird1[i].debugsprice2,
                              debughour2:  this.tablethird1[i].debughour2,
                              debugunit2:  this.tablethird1[i].debugunit2,
                              debugamount2:  this.tablethird1[i].debugamount2,
                              functionsprice3: this.tablethird1[i].functionsprice3,
                              functionhour3: this.tablethird1[i].functionhour3,
                              functionunit3: this.tablethird1[i].functionunit3,
                              functionamount3: this.tablethird1[i].functionamount3,
                              systemsprice3: this.tablethird1[i].systemsprice3,
                              systemhour3:  this.tablethird1[i].systemhour3,
                              systemunit3:  this.tablethird1[i].systemunit3,
                              systemamount3:  this.tablethird1[i].systemamount3,
                              designsprice3:  this.tablethird1[i].designsprice3,
                              designhour3:  this.tablethird1[i].designhour3,
                              designunit3:  this.tablethird1[i].designunit3,
                              designamount3:  this.tablethird1[i].designamount3,
                              versprice3:  this.tablethird1[i].versprice3,
                              verhour3:  this.tablethird1[i].verhour3,
                              verunit3:  this.tablethird1[i].verunit3,
                              veramount3:  this.tablethird1[i].veramount3,
                              implesprice3:  this.tablethird1[i].implesprice3,
                              implehour3:  this.tablethird1[i].implehour3,
                              impleunit3:  this.tablethird1[i].impleunit3,
                              impleamount3:  this.tablethird1[i].impleamount3,
                              debugsprice3:  this.tablethird1[i].debugsprice3,
                              debughour3:  this.tablethird1[i].debughour3,
                              debugunit3:  this.tablethird1[i].debugunit3,
                              debugamount3:  this.tablethird1[i].debugamount3,
                            },
                          );
                      }
                      for (let i = 0; i < this.tablethird2.length; i++) {
                        if (this.tablethird2[i].detailed1 !== '' || this.tablethird2[i].cost1 !== '' || this.tablethird2[i].unit1 !== '' || this.tablethird2[i].amount1 !== ''
                          || this.tablethird2[i].detailed2 !== '' || this.tablethird2[i].cost2 !== '' || this.tablethird2[i].unit2 !== '' || this.tablethird2[i].amount2 !== ''
                          || this.tablethird2[i].detailed3 !== '' || this.tablethird2[i].cost3 !== '' || this.tablethird2[i].unit3 !== '' || this.tablethird2[i].amount3 !== ''
                        )
                          this.baseInfo.othpersonfee.push(
                            {
                              othpersonfeeid: this.tablethird2[i].othpersonfeeid,
                              quotationid: this.tablethird2[i].quotationid,
                              detailed1: this.tablethird2[i].detailed1,
                              cost1: this.tablethird2[i].cost1,
                              unit1: this.tablethird2[i].unit1,
                              amount1: this.tablethird2[i].amount1,
                              detailed2: this.tablethird2[i].detailed2,
                              cost2: this.tablethird2[i].cost2,
                              unit2: this.tablethird2[i].unit2,
                              amount2: this.tablethird2[i].amount2,
                              detailed3: this.tablethird2[i].detailed3,
                              cost3: this.tablethird2[i].cost3,
                              unit3: this.tablethird2[i].unit3,
                              amount3: this.tablethird2[i].amount3,
                            },
                          );
                      }
                      for (let i = 0; i < this.tablefifth.length; i++) {
                        if (this.tablefifth[i].fruition !== ''
                        )
                          this.baseInfo.fruit.push(
                            {
                              fruitid: this.tablefifth[i].fruitid,
                              quotationid: this.tablefifth[i].quotationid,
                              fruition: this.tablefifth[i].fruition,
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
