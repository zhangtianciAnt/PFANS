<template>
  <div>
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
                    <el-form-item :label="$t('label.PFANS1031FORMVIEW_DEPOSITJAPANESE')" :error="errorcustojapanese"
                                  prop="custojapanese">
                      <el-input :disabled="true" style="width:20vw" v-model="form.custojapanese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYCHINESE')" :error="errorcustochinese"
                                  prop="custochinese">
                      <el-input :disabled="true" style="width:20vw" v-model="form.custochinese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      :label="$t('label.PFANS1030FORMVIEW_PRINCIPALPLAC')+$t('（')+$t('label.PFANS1024VIEW_JAPANESE')+$t('）')"
                      :error="errorplacejapanese" prop="placejapanese">
                      <el-input :disabled="true" style="width:20vw" v-model="form.placejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACECHINESE')"
                                  :error="errorplacechinese" prop="placechinese">
                      <el-input :disabled="true" style="width:20vw" v-model="form.placechinese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" :error="errordeployment"
                                  prop="deployment">
                      <el-input :disabled="true" style="width:20vw" v-model="form.deployment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')" :error="errorpjnamejapanese"
                                  prop="pjnamejapanese">
                      <el-input :disabled="true" style="width:20vw" v-model="form.pjnamejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')" :error="errorpjnamechinese"
                                  prop="pjnamechinese">
                      <el-input :disabled="true" style="width:20vw" v-model="form.pjnamechinese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_OPENINGDATE')" :error="errorclaimdatetimeStart"
                                  prop="claimdatetimeStart">
                      <el-date-picker
                        v-model="form.claimdatetimeStart"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENDDATE')" :error="errorclaimdatetimeEnd"
                                  prop="claimdatetimeEnd">
                      <el-date-picker
                        v-model="form.claimdatetimeEnd"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')" :error="errorcurrencyposition"
                                  prop="currencyposition">
                      <dicselect :code="code3"
                                 :data="form.currencyposition"
                                 :disabled="true"
                                 :multiple="multiple"
                                 @change="getcurrencyformat"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" :error="errorclaimamount"
                                  prop="claimamount">
                      <el-input :disabled="true" style="width:20vw" v-model="form.claimamount"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <el-row>
                <el-col :span="24">
                  <el-table :data="tableS" header-cell-class-name="sub_bg_color_blue" stripe border style="width: 70vw">
                    <el-table-column
                      prop="claimtype"
                      :label="$t('label.PFANS1024VIEW_NUMBER')" align="center" width="150"/>
                    <el-table-column
                      prop="deliverydate"
                      :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" width="170"/>
                    <el-table-column
                      prop="completiondate"
                      :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" width="150"/>
                    <el-table-column
                      prop="claimdate" :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" width="150"/>
                    <el-table-column
                      prop="supportdate" :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" width="150"/>
                    <el-table-column
                      prop="claimamount" :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" width="150"/>
                    <!--<el-table-column-->
                    <!--prop="currencyposition" :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')" align="center"  width="150" />-->
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
                      <el-input :disabled="true" style="width:20vw" v-model="form.telephone" maxlength="20"></el-input>
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
                    <el-form-item :label="$t('label.PFANS1025VIEW_VALUATION')" :error="errorvaluation" prop="valuation">
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
                    <el-form-item :label="$t('label.PFANS1025VIEW_INDIVIDUAL')" :error="errorindividual"
                                  prop="individual">
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
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CONTRACTNUMBER')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1004VIEW_CAREERPLAN')" :error="errorplan" prop="plan">
                      <el-select v-model="form.plan" @change="getplan" :disabled="!disable" style="width: 20vw"
                                 clearable>
                        <el-option
                          v-for="item in optionsdate"
                          :key="item.value"
                          :label="item.lable"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')">
                      <el-input :disabled="!disable" style="width:45vw" v-model="form.remarks"></el-input>
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
                    <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.budgetcode"
                              v-if="scope.row.rowindex !== '999'">
                    </el-input>
                    <div v-else>{{scope.row.budgetcode}}</div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_DEPART')" align="center" width="170"
                                 :error="errorgroup" prop="depart">
                  <template slot-scope="scope">
                    <org :orglist="scope.row.depart"
                         orgtype="2"
                         :disabled="!disable"
                         :error="errorgroup"
                         style="width: 9rem"
                         :no="scope.row"
                         @getOrgids="getGroupId" v-if="scope.row.rowindex !== '999'"></org>
                    <el-input v-show='false' :disabled="false" style="width:20vw" v-model="scope.row.companyend"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5008VIEW_PROGRAM')" align="center" width="150">
                  <template slot-scope="scope">
                    <project :disabled="!disable" style="width: 100%" :data="scope.row.projects" :no="scope.row"
                             v-if="scope.row.rowindex !== '999'"
                             @change="changePro">
                    </project>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="600">
                  <el-table-column :label="$t('label.PFANS1025VIEW_MEMBER')" align="center" width="150" prop="member">
                    <template slot-scope="scope">
                      <el-input-number v-if="scope.row.rowindex !== '999'"
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
                  <el-table-column :label="$t('label.PFANS1025VIEW_COMMUNITY')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input-number v-if="scope.row.rowindex !== '999'"
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
                  <el-table-column :label="$t('label.PFANS1025VIEW_OUTSOURCE')" align="center" width="150"
                                   prop="outsource">
                    <template slot-scope="scope">
                      <el-input-number v-if="scope.row.rowindex !== '999'"
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
                  <el-table-column :label="$t('label.PFANS1025VIEW_OUTCOMMUNITY')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input-number v-if="scope.row.rowindex !== '999'"
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
                <el-table-column :label="$t('label.PFANS1025VIEW_WORKNUMBER')" align="center" prop="worknumber"
                                 width="150">
                  <template slot-scope="scope">
                    <el-input-number v-if="scope.row.rowindex !== '999'"
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
                    <el-input-number v-if="scope.row.rowindex !== '999'"
                                     :disabled="true"
                                     :max="1000000000"
                                     :min="0"
                                     :no="scope.row"
                                     :precision="2"
                                     controls-position="right"
                                     style="width: 100%"
                                     v-model="scope.row.awardmoney"
                    ></el-input-number>
                    <el-input-number v-else
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
                    <el-button v-if="scope.row.rowindex !== '999'"
                               :disabled="!disable"
                               @click.native.prevent="deleteRow(scope.$index, tableT)"
                               plain
                               size="small"
                               type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button v-if="scope.row.rowindex !== '999'"
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
                        :disabled="true"
                        :max="1000000000"
                        :min="0"
                        :precision="4"
                        controls-position="right"
                        style="width:20vw"
                        v-model="form.exchangerate"
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
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:11vw"
                      v-model="form.total"
                      @change="gettotal"
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
                      @change="gettotal1"
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
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1030FORMVIEW_OUTSOURCING')">
                    <el-input-number
                      :disabled="true"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:11vw"
                      v-model="form.outsourcing"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1030FORMVIEW_PJRATE')">
                    <el-input-number
                      :disabled="true"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:11vw"
                      v-model="form.pjrate"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
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
              <el-row>
                <el-table :data="tableD" :summary-method="getTsummariesTableD"
                          show-summary
                          header-cell-class-name="sub_bg_color_blue" stripe>
                  <el-table-column :label="$t('label.PFANS1030FORMVIEW_ATTF')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.attf">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1030FORMVIEW_ATTFMOTH')" align="center" width="170"
                                   prop="budgetcode">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        @change="changebudgetcode(scope.row)"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.budgetcode"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1030FORMVIEW_ATTFNUMBER')" align="center" width="150"
                                   prop="depart">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        :precision="2"
                        @change="changedepart(scope.row)"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.depart"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1030FORMVIEW_MONEYSUM')" align="center" width="150"
                                   prop="subtotal">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        :precision="2"
                        @change="changesubtotal(scope.row)"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.subtotal"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
<!--              add-ws-公式修改-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1030FORMVIEW_ATTFMOTH')">
                    <el-input-number
                      :disabled="true"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:11vw"
                      v-model="form.membercost"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1030FORMVIEW_ATTFNUMBER')">
                    <el-input-number
                      :disabled="true"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:11vw"
                      v-model="form.investorspeopor"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--              add-ws-公式修改-->
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import moment from 'moment';
  import org from '../../../components/org';
  import {getDictionaryInfo, getUserInfo, getOrgInfo} from '@/utils/customize';

  import project from '../../../components/project';

  export default {
    name: 'PFANS1025FormView',
    components: {
      EasyNormalContainer,
      user,
      org,
      dicselect,
      project,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.user_name');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
        } else {
          this.error = '';
          return callback();
        }
      };
      var checkcustojapanese = (rule, value, callback) => {
        if (!this.form.custojapanese || this.form.custojapanese === '' || this.form.custojapanese === 'undefined') {
          this.errorcustojapanese = this.$t('normal.error_08') + this.$t('label.PFANS1031FORMVIEW_DEPOSITJAPANESE');
          return callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1031FORMVIEW_DEPOSITJAPANESE')));
        } else {
          this.errorcustojapanese = '';
          return callback();
        }
      };

      var checkcustochinese = (rule, value, callback) => {
        if (!this.form.custochinese || this.form.custochinese === '' || this.form.custochinese === 'undefined') {
          this.errorcustochinese = this.$t('normal.error_08') + this.$t('label.PFANS1032FORMVIEW_DEPOSITARYCHINESE');
          return callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1032FORMVIEW_DEPOSITARYCHINESE')));
        } else {
          this.errorcustochinese = '';
          return callback();
        }
      };

      var checkplacejapanese = (rule, value, callback) => {
        if (!this.form.placejapanese || this.form.placejapanese === '' || this.form.placejapanese === 'undefined') {
          this.errorplacejapanese = this.$t('normal.error_08') + this.$t('label.PFANS1030FORMVIEW_PRINCIPALPLAC');
          return callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1030FORMVIEW_PRINCIPALPLAC')));
        } else {
          this.errorplacejapanese = '';
          return callback();
        }
      };

      var checkplacechinese = (rule, value, callback) => {
        if (!this.form.placechinese || this.form.placechinese === '' || this.form.placechinese === 'undefined') {
          this.errorplacechinese = this.$t('normal.error_08') + this.$t('label.PFANS1032FORMVIEW_PRINCIPALPLACECHINESE');
          return callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1032FORMVIEW_PRINCIPALPLACECHINESE')));
        } else {
          this.errorplacechinese = '';
          return callback();
        }
      };

      var checkdeployment = (rule, value, callback) => {
        if (!this.form.deployment || this.form.deployment === '' || this.form.deployment === 'undefined') {
          this.errordeployment = this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_DEPLOYMENT');
          return callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_DEPLOYMENT')));
        } else {
          this.errordeployment = '';
          return callback();
        }
      };

      var checkpjnamejapanese = (rule, value, callback) => {
        if (!this.form.pjnamejapanese || this.form.pjnamejapanese === '' || this.form.pjnamejapanese === 'undefined') {
          this.errorpjnamejapanese = this.$t('normal.error_08') + this.$t('label.PFANS1025VIEW_PJNAMEJAPANESE');
          return callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1025VIEW_PJNAMEJAPANESE')));
        } else {
          this.errorpjnamejapanese = '';
          return callback();
        }
      };
      var checkpjnamechinese = (rule, value, callback) => {
        if (!this.form.pjnamechinese || this.form.pjnamechinese === '' || this.form.pjnamechinese === 'undefined') {
          this.errorpjnamechinese = this.$t('normal.error_08') + this.$t('label.PFANS1025VIEW_PJNAMECHINESE');
          return callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1025VIEW_PJNAMECHINESE')));
        } else {
          this.errorpjnamechinese = '';
          return callback();
        }
      };
      var checkclaimdatetimeStart = (rule, value, callback) => {
        if (!this.form.claimdatetimeStart || this.form.claimdatetimeStart === '' || this.form.claimdatetimeStart === 'undefined') {
          this.errorclaimdatetimeStart = this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_OPENINGDATE');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_OPENINGDATE')));
        } else {
          this.errorclaimdatetimeStart = '';
          return callback();
        }
      };

      var checkclaimdatetimeEnd = (rule, value, callback) => {
        if (!this.form.claimdatetimeEnd || this.form.claimdatetimeEnd === '' || this.form.claimdatetimeEnd === 'undefined') {
          this.errorclaimdatetimeEnd = this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_ENDDATE');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_ENDDATE')));
        } else {
          this.errorclaimdatetimeEnd = '';
          return callback();
        }
      };

      var checkcurrencyposition = (rule, value, callback) => {
        if (!this.form.currencyposition || this.form.currencyposition === '' || this.form.currencyposition === 'undefined') {
          this.errorcurrencyposition = this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_CURRENCYFORMAT');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_CURRENCYFORMAT')));
        } else {
          this.errorcurrencyposition = '';
          return callback();
        }
      };

      var checkclaimamount = (rule, value, callback) => {
        if (!this.form.claimamount || this.form.claimamount === '' || this.form.claimamount === 'undefined') {
          this.errorclaimamount = this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CLAIMAMOUNT');
          return callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CLAIMAMOUNT')));
        } else {
          this.errorclaimamount = '';
          return callback();
        }
      };
      var checkplan = (rule, value, callback) => {
        if (!this.form.plan || this.form.plan === '' || this.form.plan === 'undefined') {
          this.errorplan = this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_CAREERPLAN');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_CAREERPLAN')));
        } else {
          this.errorplan = '';
          return callback();
        }
      };
      var checkvaluation = (rule, value, callback) => {
        if (!this.form.valuation || this.form.valuation === '' || this.form.valuation === 'undefined') {
          this.errorvaluation = this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_VALUATION');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_VALUATION')));
        } else {
          this.errorvaluation = '';
          return callback();
        }
      };

      var checkindividual = (rule, value, callback) => {
        if (!this.form.individual || this.form.individual === '' || this.form.individual === 'undefined') {
          this.errorindividual = this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_INDIVIDUAL');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_INDIVIDUAL')));
        } else {
          this.errorindividual = '';
          return callback();
        }
      };

      return {
        optionsdate: [{
          value: this.$t('label.PFANS1004VIEW_INSIDE'),
          lable: this.$t('label.PFANS1004VIEW_INSIDE'),
        }, {
          value: this.$t('label.PFANS1004VIEW_OUTER'),
          lable: this.$t('label.PFANS1004VIEW_OUTER'),
        }],
        activeName: 'first',
        disabled: true,
        moneysum: '',
        errorcustojapanese: '',
        errorcustochinese: '',
        errorplacejapanese: '',
        errorplacechinese: '',
        errordeployment: '',
        errorpjnamejapanese: '',
        errorpjnamechinese: '',
        error: '',
        errorcurrencyposition: '',
        errorclaimamount: '',
        errorclaimdatetimeStart: '',
        errorclaimdatetimeEnd: '',
        errorplan: '',
        errorvaluation: '',
        errorindividual: '',
        userlist: '',
        code1: 'HT008',
        code2: 'HT005',
        code3: 'PG019',
        sumAwardmoney: '',
        errorgroup: '',
        selectType: 'Single',
        loading: false,
        title: 'title.PFANS1030VIEW',
        canStart: false,
        multiple: false,
        orglist: '',
        baseInfo: {},
        arrAttf: [],
        groupN: '',
        form: {
          membercost: '',
          investorspeopor: '',
          group_id: '',
          draftingdate: '',
          scheduleddate: '',
          number: '',
          total: '',
          price: '',
          rate: '',
          outsourcing: '',
          pjrate: '',
          sarmb: '',
          exchangerate: '',
          contractnumber: '',
          contracttype: '',
          custojapanese: '',
          custochinese: '',
          placejapanese: '',
          placechinese: '',
          deployment: '',
          companyend: '',
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
          companyend: '',
          projects: '',
          member: '',
          community: '',
          outsource: '',
          outcommunity: '',
          worknumber: '',
          awardmoney: '',
          rowindex: '',
        },
          {
            awarddetail_id: '',
            award_id: '',
            budgetcode: '经费',
            depart: '',
            projects: '',
            member: '',
            community: '',
            outsource: '',
            outcommunity: '',
            worknumber: '',
            awardmoney: '',
            rowindex: '999',
          }],
        tableS: [],
        tableD: [],

        // },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021012').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021011').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021010').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021009').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021006').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021007').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021008').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021005').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021004').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021003').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021002').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        //   {
        //     award_id: '',
        //     staffdetail_id: '',
        //     attf: getDictionaryInfo('PR021001').value1,
        //     budgetcode: '',
        //     depart: ''
        //   },
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
          // telephone: [{
          //   required: true,
          //   message: this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_TELEPHONE'),
          //   trigger: 'change'
          // }],
          custojapanese: [{
            required: true,
            validator: checkcustojapanese,
            trigger: 'change',
          }],
          custochinese: [{
            required: true,
            validator: checkcustochinese,
            trigger: 'change',
          }],
          placejapanese: [{
            required: true,
            validator: checkplacejapanese,
            trigger: 'change',
          }],
          placechinese: [{
            required: true,
            validator: checkplacechinese,
            trigger: 'change',
          }],
          deployment: [{
            required: true,
            validator: checkdeployment,
            trigger: 'change',
          }],
          pjnamejapanese: [{
            required: true,
            validator: checkpjnamejapanese,
            trigger: 'change',
          }],
          pjnamechinese: [{
            required: true,
            validator: checkpjnamechinese,
            trigger: 'change',
          }],
          claimdatetimeStart: [{
            required: true,
            validator: checkclaimdatetimeStart,
            trigger: 'change',
          }],
          claimdatetimeEnd: [{
            required: true,
            validator: checkclaimdatetimeEnd,
            trigger: 'change',
          }],
          currencyposition: [{
            required: true,
            validator: checkcurrencyposition,
            trigger: 'change',
          }],
          claimamount: [{
            required: true,
            validator: checkclaimamount,
            trigger: 'change',
          }],
          plan: [{
            required: true,
            validator: checkplan,
            trigger: 'blur',
          }],
          valuation: [{
            required: true,
            validator: checkvaluation,
            trigger: 'change',
          }],
          individual: [{
            required: true,
            validator: checkindividual,
            trigger: 'change',
          }],
        },
        buttonList: [],
        optionsdatedic: [],
      };
    },
    mounted() {
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1025Store/selectById', {'award_id': this.$route.params._id})
          .then(response => {
            this.form = response.award;
            if (response.award.custojapanese !== null && response.award.custojapanese !== '') {
              let letUser = getUserInfo(response.award.custojapanese);
              if (letUser != null) {
                this.form.custojapanese = letUser.userinfo.customername;
              }
            }
            //add-ws-汇率修改
            if(response.award.currencyposition === 'PG019001'  || this.form.currencyposition === this.$t('label.PFANS1039FORMVIEW_DOLLAR')){
              let letcheckexchangerate = getDictionaryInfo('JY001001');
              if (letcheckexchangerate != null) {
                response.award.exchangerate = letcheckexchangerate.value2;
              }
            }else {
              response.award.exchangerate =  1 ;
            }
            //add-ws-汇率修改
            let letCurrencyposition = getDictionaryInfo(response.award.currencyposition);
            if (letCurrencyposition != null) {
              response.award.currencyposition = letCurrencyposition.value1;
            }
            if (this.$store.getters.userinfo.userid) {
              this.form.telephone = getUserInfo(this.$store.getters.userinfo.userid).userinfo.extension;
            }
            this.form.draftingdate = moment(new Date()).format('YYYY-MM-DD');
            var myDate = new Date();
            myDate.setDate(myDate.getDate() + 2);
            this.form.scheduleddate = moment(myDate).format('YYYY-MM-DD');
            if (this.form.claimdatetime !== '' && this.form.claimdatetime !== null) {
              this.form.claimdatetimeStart = this.form.claimdatetime.slice(0, 10);
              this.form.claimdatetimeEnd = this.form.claimdatetime.slice(this.form.claimdatetime.length - 10);
            }
            if (response.awardDetail.length > 0) {
              this.tableT = response.awardDetail;
              for (var i = 0; i < this.tableT.length; i++) {
                this.orglist = this.tableT[i].depart;
                this.getGroupId(this.orglist,this.tableT[i]);
                // let group = getOrgInfo(this.orglist);
                // this.tableT[i].companyend = group.companyen;
              }
            }
            // add-ws-合同人件费修改
            let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ070');
            for (let i = 0; i < dicnew.length; i++) {
              if (dicnew[i].value1 === this.form.group_id) {
                this.optionsdatedic.push({
                  value2: dicnew[i].value2,
                  value3: dicnew[i].value3,
                  value4: dicnew[i].value4,
                });
              }
            }
            let data = [];
            for (let i = 0; i < this.optionsdatedic.length; i++) {
              let money3 = this.optionsdatedic[i].value3;
              let money4 = this.optionsdatedic[i].value4;
              data.push({
                award_id: '',
                staffdetail_id: '',
                attf: getDictionaryInfo(this.optionsdatedic[i].value2).value1,
                budgetcode: ((money3 * 3) + (money4 * 9)) / 12,
                depart: '',
                subtotal: '',
              });
            }
            this.tableD = data
            console.log("aaa",this.tableD)
            // add-ws-合同人件费修改
            // if (this.form.tablecommunt !== '' && this.form.tablecommunt !== null) {
            //   for (let i = 0; i < JSON.parse(response.award.tablecommunt).length; i++) {
            //     let aa = JSON.parse(response.award.tablecommunt)[i];
            //     this.tableD[i].budgetcode = aa.attf1;
            //     this.tableD[i].depart = aa.attf2;
            //   }
            // }
            if (response.staffDetail.length > 0) {
              this.tableD = response.staffDetail;
            }

            let aa = 0;

            if (response.numbercounts.length > 0) {
              for (let i = 0; i < response.numbercounts.length; i++) {
                // let letCurrencyposition = getDictionaryInfo(response.numbercounts[i].currencyposition);
                // if (letCurrencyposition != null) {
                //   response.numbercounts[i].currencyposition = letCurrencyposition.value1;
                // }
                let deliverydate = response.numbercounts[i].deliverydate;
                let completiondate = response.numbercounts[i].completiondate;
                let claimdate = response.numbercounts[i].claimdate;
                let supportdate = response.numbercounts[i].supportdate;

                if (deliverydate !== '' && deliverydate != null) {
                  response.numbercounts[i].deliverydate = moment(deliverydate).format('YYYY-MM-DD');
                }
                if (completiondate !== '' && completiondate != null) {
                  response.numbercounts[i].completiondate = moment(completiondate).format('YYYY-MM-DD');
                }
                if (claimdate !== '' && claimdate != null) {
                  response.numbercounts[i].claimdate = moment(claimdate).format('YYYY-MM-DD');
                }
                if (supportdate !== '' && supportdate != null) {
                  response.numbercounts[i].supportdate = moment(supportdate).format('YYYY-MM-DD');
                }
                if (response.numbercounts[i].claimamount) {
                  let claimamount = response.numbercounts[i].claimamount;
                  aa = Number(claimamount) + aa;
                }
              }
            }
            this.form.claimamount = aa;
            this.tableS = response.numbercounts;
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
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [
          {
            key: 'generate',
            name: 'button.generate',
            disabled: false,
          },
        ];
      } else {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ];
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      changesubtotal(row){
        row.subtotal = row.subtotal
      },
      changebudgetcode(row){
       row.subtotal = row.budgetcode * row.depart
      },
      changedepart(row){
        row.subtotal = row.budgetcode * row.depart
      },
      getTsummariesTableD(param) {
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
            if (index == 1) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 2) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 3) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--';
          }
        });
        this.moneysumclick(sums);
        return sums;
      },
      moneysumclick(sums){
        this.form.membercost = sums[3]
        this.form.investorspeopor =sums[2]
        let checkpjrate =  parseFloat((this.form.sarmb - this.form.membercost - this.form.total))/this.form.sarmb
        this.form.pjrate =checkpjrate *100
      },
      changePro(val, row) {
        row.projects = val;
      },
      changeSum(row) {
        row.worknumber = row.member + row.outsource;
        row.awardmoney = row.member * row.community + row.outsource * row.outcommunity;
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        if (!this.form.user_id || this.form.user_id === '' || typeof val == 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.user_name');
        } else {
          this.error = '';
        }
      },
      gettotal1(val) {
        if(this.form.total===0){
          this.form.outsourcing = 0;
        }else{
          this.form.outsourcing = this.form.total / val;
        }
      },
      gettotal(val) {
        if(this.form.number===0){
          this.form.outsourcing = 0;
        }else{
          this.form.outsourcing = val / this.form.number;
        }
        this.form.pjrate =  parseFloat((this.form.sarmb-this.form.membercost-val))/this.form.sarmb
      },
      getcontracttype(val) {
        this.form.contracttype = val;
        if (val === 'PG019001') {
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
      getGroupId(orglist, row) {
        row.depart = orglist;
        let group = getOrgInfo(orglist);
        if (group) {
          row.budgetcode = group.encoding;
          row.companyend = group.companyen;
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('save');
      },
      start() {
        this.form.status = '2';
        this.buttonClick('save');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('save');
      },
      deleteRow(index, rows) {
        if (rows.length > 2) {
          rows.splice(index, 1);
        }
      },
      addRow() {
        let lastRow = this.tableT[this.tableT.length - 1];
        this.tableT.pop();
        this.tableT.push({
          awarddetail_id: '',
          award_id: '',
          budgetcode: '',
          companyend: '',
          depart: '',
          member: '',
          community: '',
          outsource: '',
          outcommunity: '',
          worknumber: '',
          awardmoney: '',
          rowindex: '',
        });
        this.tableT.push(lastRow);
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
            this.sumAwardmoney = sums[8];

          } else {
            sums[index] = '--';
          }
        });
        this.moneySum(sums);
        return sums;
      },
      moneySum(sums){
        if (this.form.currencyposition === 'PG019001' || this.form.currencyposition === this.$t('label.PFANS1039FORMVIEW_DOLLAR')) {
          this.form.sarmb = this.form.exchangerate * sums[8];
        } else {
          this.form.sarmb = sums[8];
        }
      },
      buttonClick(val) {
        this.form.maketype = '4',
          this.baseInfo = {};
        this.form.user_id = this.userlist;
        if (this.form.claimdatetimeStart !== '' && this.form.claimdatetimeEnd !== '') {
          this.form.claimdatetime = moment(this.form.claimdatetimeStart).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.claimdatetimeEnd).format('YYYY-MM-DD');
        }
        this.baseInfo.staffDetail = [];
        for (let i = 0; i < this.tableD.length; i++) {
          this.baseInfo.staffDetail.push({
            staffdetail_id: this.tableD[i].staffdetail_id,
            award_id: this.tableD[i].award_id,
            attf: this.tableD[i].attf,
            budgetcode: this.tableD[i].budgetcode,
            depart: this.tableD[i].depart,
            subtotal: this.tableD[i].subtotal,
          });
        }
        this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
        this.baseInfo.groupN = this.$store.getters.orgGroupList;
        this.baseInfo.awardDetail = [];
        for (let i = 0; i < this.tableT.length; i++) {
          if (this.tableT[i].budgetcode !== '' || this.tableT[i].depart !== '' || this.tableT[i].member > '0' || this.tableT[i].community > '0'
            || this.tableT[i].outsource > '0' || this.tableT[i].outcommunity > '0' || this.tableT[i].worknumber > '0' || this.tableT[i].awardmoney > '0') {
            this.baseInfo.awardDetail.push({
              awarddetail_id: this.tableT[i].awarddetail_id,
              award_id: this.tableT[i].award_id,
              budgetcode: this.tableT[i].budgetcode,
              depart: this.tableT[i].depart,
              projects: this.tableT[i].projects,
              member: this.tableT[i].member,
              community: this.tableT[i].community,
              outsource: this.tableT[i].outsource,
              outcommunity: this.tableT[i].outcommunity,
              worknumber: this.tableT[i].worknumber,
              awardmoney: this.tableT[i].awardmoney,
              rowindex: this.tableT[i].rowindex,
            });
          }
        }
        if (val === 'save') {
          this.$refs['reff'].validate(valid => {
            if (valid) {
              this.loading = true;

              if (this.$route.params._id) {     //编辑
                this.baseInfo.award.award_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1025Store/update', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    if (val !== 'update') {
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
                  });
              }
            } else {
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
          });
        } else if (val === 'generate') {
          let user = getUserInfo(this.form.user_id);
          if (user) {
            this.form.user_id = user.userinfo.customername;
          }
          this.form.companyend = this.tableT.companyend;
          this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
          this.$store
            .dispatch('PFANS1025Store/generateJxls', this.baseInfo)
            .then(response => {
              // for(let i = 0; i < response.baseInfo.awardDetail.length; i++){
              //
              // }
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
    },
  };
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
