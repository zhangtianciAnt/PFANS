<template>
  <div>
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         :enableSave="enableSave"
                         @StartWorkflow="buttonClick"
                         :defaultStart="defaultStart"
                         @buttonClick="buttonClick"
                         :canStart="canStart"
                         @end="end" @start="start"
                         @workflowState="workflowState"
                         @disabled="setdisabled"
                         ref="container"
                         :workflowCode="workflowCode"
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
                      <!--                      add-ws-12/10-汇率字典-->
<!--                      <dicselect :code="code3"-->
<!--                                 :data="form.currencyposition"-->
<!--                                 :disabled="true"-->
<!--                                 :multiple="multiple"-->
<!--                                 @change="getcurrencyformat"-->
<!--                                 style="width:20vw">-->
<!--                      </dicselect>-->
                      <monthlyrate :month="month3"
                                   :data="form.currencyposition"
                                   :disabled="true"
                                   :multiple="multiple"
                                   @change="getcurrencyformat"
                                   style="width:20vw">
                      </monthlyrate>
                      <!--                      add-ws-12/10-汇率字典-->
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
<!--              //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc fr-->
              <el-row v-if="this.form.contracttype != 'HT008002'
                        && this.form.contracttype != 'HT008004'
                        && this.form.contracttype != 'HT008006'
                        && this.form.contracttype != 'HT008008'">
<!--                //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc to-->
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
<!--              //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc fr-->
              <el-row v-if="this.form.contracttype == 'HT008002'
                        || this.form.contracttype == 'HT008004'
                        || this.form.contracttype == 'HT008006'
                        || this.form.contracttype == 'HT008008'">
                <el-col :span="24">
                  <el-table :data="tableFS" header-cell-class-name="sub_bg_color_blue" stripe border style="width: 100%" :cell-style="{padding:'0px'}">
                    <el-table-column
                      prop="claimtype"
                      :label="$t('label.PFANS1024VIEW_NUMBER')" align="center" width="100"/>
                    <el-table-column
                      prop="department"
                      :label="$t('label.PFANS1030FORMVIEW_DEPARTMENT')" align="center" width="260"/>
                    <el-table-column
                      prop="deliverydate"
                      :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" width="110"/>
                    <el-table-column
                      prop="completiondate"
                      :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" width="110"/>
                    <el-table-column
                      prop="claimdate" :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" width="110"/>
                    <el-table-column
                      prop="supportdate" :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" width="110"/>
                    <el-table-column
                      prop="claimamount" :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" width="120"/>
                    <el-table-column
                      prop="distriamount" :label="$t('label.PFANS1030FORMVIEW_DISTRIAMOUNT')" align="center" width="230">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input-number
                            :max="Number(scope.row.claimamount)"
                            :min="0"
                            :precision="2"
                            controls-position="right"
                            style="width: 100%;margin-top: 15px"
                            v-model="scope.row.distriamount"
                            :disabled="distriamt"
                          ></el-input-number>
                        </el-form-item>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
<!--              //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc to-->

            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1025VIEW_SECONDDETAILS')" name="second">
              <div>
                <el-row></el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1008FORMVIEW_INITIATOR')" :error="error" prop="user_id">
                      <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
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
                      <el-input :disabled="true" style="width:20vw" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <!--<el-col :span="8">-->
                  <!--<el-form-item :label="$t('label.PFANS1004VIEW_CAREERPLAN')" :error="errorplan" prop="plan">-->
                  <!--<el-select v-model="form.plan" @change="getplan" :disabled="!disable" style="width: 20vw"-->
                  <!--clearable>-->
                  <!--<el-option-->
                  <!--v-for="item in optionsdate"-->
                  <!--:key="item.value"-->
                  <!--:label="item.lable"-->
                  <!--:value="item.value">-->
                  <!--</el-option>-->
                  <!--</el-select>-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1004VIEW_CAREERPLAN')" prop="plan">
                      <span>{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.plan"
                        active-value="1"
                        inactive-value="0">
                      </el-switch>
                      <span>{{$t('label.PFANS1004VIEW_OUTER')}}</span>
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
                    <!--                    <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.budgetcode">-->
                    <!--                    </el-input>-->
                    <el-select clearable style="width: 100%" v-model="scope.row.budgetcode" :disabled="!disable"
                               :placeholder="$t('normal.error_09')" :no="scope.row" @change="getBudgetunit">
                      <el-option
                        v-for="item in scope.row.options1"
                        :key="item.value"
                        :label="item.lable"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_DEPART')" align="center" width="170"
                                 :error="errorgroup" prop="depart">
                  <template slot-scope="scope">
                    <org :orglist="scope.row.depart"
                         orgtype="4"
                         :disabled="scope.row.budgetcode ===$t('label.PFANS6008VIEW_EXPENSE')?true:!disable"
                         :error="errorgroup"
                         style="width: 9rem"
                         :no="scope.row"
                         @getOrgids="getGroupId"></org>
                    <el-input v-show='false' :disabled="false" style="width:20vw"
                              v-model="scope.row.companyend"></el-input>
                  </template>
                </el-table-column>
                <!--     region   add_qhr_20210722 修改【部门】栏宽度-->
                <el-table-column :label="$t('label.PFANS5008VIEW_PROGRAM')" align="center" width="200">
                  <!--     endregion   add_qhr_20210722 修改【部门】栏宽度-->
                  <template slot-scope="scope">
                    <project style="width: 100%" :date="scope.row.projects" :no="scope.row"
                             :disabled="scope.row.budgetcode ===$t('label.PFANS6008VIEW_EXPENSE')?true:!disable"
                             @change="changePro">
                    </project>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="600">
                  <el-table-column :label="$t('label.PFANS1025VIEW_MEMBER')" align="center" width="150" prop="member">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS6008VIEW_EXPENSE')?true:!disable"
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
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS6008VIEW_EXPENSE')?true:!disable"
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
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS6008VIEW_EXPENSE')?true:!disable"
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
                        :disabled="scope.row.budgetcode ===$t('label.PFANS6008VIEW_EXPENSE')?true:!disable"
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
                      :disabled="scope.row.budgetcode ===$t('label.PFANS6008VIEW_EXPENSE')?!disable:true"
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
                      :disabled="scope.row.budgetcode ===$t('label.PFANS6008VIEW_EXPENSE')?true:!disable"
                      @click.native.prevent="deleteRow(scope.$index, tableT)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="scope.row.budgetcode ===$t('label.PFANS6008VIEW_EXPENSE')?true:!disable"
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

                      <el-input :disabled="true" style="width:20vw" v-model="form.exchangerate"></el-input>
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
                      @change="PJcheck2()"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="forreason">
                <el-form-item :label="$t('label.PFANS1028VIEW_RESON')" prop="reason">
                  <el-input :disabled="!disable"
                            :placeholder="$t('label.PFANS1030FORMVIEW_REASON')"
                            style="width: 73vw" type="textarea"
                            v-model="strreason">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-table :data="tableD" :summary-method="getTsummariesTableD"
                          show-summary
                          header-cell-class-name="sub_bg_color_blue" stripe>
                  <el-table-column :label="$t('label.PFANS1030FORMVIEW_DEPARTMENT')" align="center" width="150" prop="incondepartment">
                    <template slot-scope="scope">
                      <el-select :disabled="!disable" :placeholder="$t('normal.error_09')" clearable
                                 v-model="scope.row.incondepartment"  @change="changeDep(scope.row)">
                        <el-option
                          :key="item"
                          :label="item"
                          :value="item"
                          v-for="item in option">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1020FORMVIEW_RANK')" align="center" width="150" prop="attf">
                    <template slot-scope="scope">
                      <el-select :disabled="!disable" :placeholder="$t('normal.error_09')" clearable
                                 v-model="scope.row.attf"  @change="changeRank(scope.row)">
                        <el-option
                          :key="item"
                          :label="item"
                          :value="item"
                          v-for="item in option1">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1030FORMVIEW_PLANNED')" align="center" width="170" >
                    <el-table-column :label="$t('label.PFANS1051MONTH4')" align="center" width="150" prop="inwork04">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 90%"
                          v-model="scope.row.inwork04"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1051MONTH5')" align="center" width="150" prop="inwork05">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.inwork05"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1051MONTH6')" align="center" width="150" prop="inwork06">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.inwork06"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1051MONTH7')" align="center" width="150" prop="inwork07">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.inwork07"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1051MONTH8')" align="center" width="150" prop="inwork08">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.inwork08"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1051MONTH9')" align="center" width="150" prop="inwork09">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.inwork09"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1051MONTH10')" align="center" width="150" prop="inwork10">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.inwork10"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1051MONTH11')" align="center" width="150" prop="inwork11">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.inwork11"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1051MONTH12')" align="center" width="150" prop="inwork12">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.inwork12"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1051MONTH1')" align="center" width="150" prop="inwork01">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.inwork01"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1051MONTH2')" align="center" width="150" prop="inwork02">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.inwork02"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1051MONTH3')" align="center" width="150" prop="inwork03">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changesubtotal(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.inwork03"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_TOTAL')" align="center" width="120" prop="totalall">
                    <template slot-scope="scope">
                      <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.totalall">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1030FORMVIEW_ATTFMOTH')" align="center" width="120" prop="BMtotal" v-if="false">
                    <template slot-scope="scope">
                      <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.BMtotal">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="deleteRow1(scope.$index, tableD)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}
                      </el-button>
                      <el-button
                        @click="addRow1()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <!--              add-ws-公式修改-->
              <!--隐藏无效-->
<!--              <el-row>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item :label="$t('label.PFANS1030FORMVIEW_ATTFMOTH')">-->
<!--                    <el-input-number-->
<!--                      :disabled="true"-->
<!--                      :max="1000000000"-->
<!--                      :min="0"-->
<!--                      :precision="2"-->
<!--                      controls-position="right"-->
<!--                      style="width:11vw"-->
<!--                      v-model="form.membercost"-->
<!--                    ></el-input-number>-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item :label="$t('label.PFANS1030FORMVIEW_ATTFNUMBER')">-->
<!--                    <el-input-number-->
<!--                      :disabled="true"-->
<!--                      :max="1000000000"-->
<!--                      :min="0"-->
<!--                      :precision="2"-->
<!--                      controls-position="right"-->
<!--                      style="width:11vw"-->
<!--                      v-model="form.investorspeopor"-->
<!--                    ></el-input-number>-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--              </el-row>-->
              <!--              add-ws-公式修改-->
            </el-tab-pane>
            <!--            //add-ws-添加上传附件功能-->
            <el-tab-pane :label="$t('label.PFANS2022VIEW_UPDATINGFILES')" name="fourth">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.enclosure')" prop="enclosurecontent" :error="errorfile">
                    <el-upload
                      :action="upload"
                      :disabled="!disable"
                      :file-list="fileList"
                      :on-error="fileError"
                      :on-preview="fileDownload"
                      :on-remove="fileRemove"
                      :on-success="fileSuccess"
                      :on-change="filechange"
                      class="upload-demo"
                      drag
                      ref="upload"
                      v-model="form.uploadfile">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em>
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <!--            //add-ws-添加上传附件功能-->
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
  import {getDictionaryInfo, getUserInfo, downLoadUrl, uploadUrl, getOrgInfo,getCurrentRole} from '@/utils/customize';
  import monthlyrate from '../../../components/monthlyrate';
  import project from '../../../components/project';

  export default {
    name: 'PFANS1025FormView',
    components: {
      monthlyrate,
      EasyNormalContainer,
      user,
      org,
      dicselect,
      project,
    },
    //region scc add 9/17 添加监听，初始化判断限界利润率 from
    watch: {
      activeName(val){
        if (val == 'third'){
          this.PJcheck()
        }
      }
    },
    //endregion scc add 9/17 添加监听，初始化判断限界利润率 to
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
      // var checkplan = (rule, value, callback) => {
      //   if (!this.form.plan || this.form.plan === '' || this.form.plan === 'undefined') {
      //     this.errorplan = this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_CAREERPLAN');
      //     return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_CAREERPLAN')));
      //   } else {
      //     this.errorplan = '';
      //     return callback();
      //   }
      // };
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

      var checkuploadfile = (rule, value, callback) => {
        if (!this.form.uploadfile || this.form.uploadfile === '' || this.form.uploadfile === 'undefined') {
          this.errorfile = this.$t('normal.error_16') + this.$t('label.enclosure');
          return callback(new Error(this.$t('normal.error_16') + this.$t('label.enclosure')));
        } else {
          this.errorfile = '';
          return callback();
        }
      };

      //region scc add 9/18 理由必填 from
      var checkreason = (rule, value, callback) => {
        if (this.forreason === true) {
          if(!this.strreason){
            return callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1028VIEW_RESON')));
          }else{
            callback();
            this.clearValidate(['reason']);
          }
        } else {
          callback();
          this.clearValidate(['reason']);
        }
      };
      //endregion scc add 9/18 理由必填 to

      return {
        //region scc add  9/18 超出利润率理由 from
        strreason:'',
        //endregion scc add 9/18 超出利润率理由 to
        // region scc add 21-8/20 详情部门下拉框 from
        option: [],
        option1: [],
        rabm: [],
        rabm1: {},
        forreason: false,
        // endregion scc add 21-8/20 详情部门下拉框 to
        //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
        defaultStart: false,
        //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
        enableSave: false,
        //add-ws-添加上传附件功能-
        fileList: [],
        upload: uploadUrl(),
        //add-ws-添加上传附件功能-
        optionsdate: [{
          value: this.$t('label.PFANS1004VIEW_INSIDE'),
          lable: this.$t('label.PFANS1004VIEW_INSIDE'),
        }, {
          value: this.$t('label.PFANS1004VIEW_OUTER'),
          lable: this.$t('label.PFANS1004VIEW_OUTER'),
        }],
        activeName: 'first',
        disabled: true,
        //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc fr
        distriamt: true,
        canStart: true,
        //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc to
        moneysum: '',
        errorcustojapanese: '',
        errorcustochinese: '',
        errorplacejapanese: '',
        errorplacechinese: '',
        errordeployment: '',
        errorpjnamejapanese: '',
        errorpjnamechinese: '',
        errorfile: '',
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
        //add-ws-12/10-汇率字典
        // code3: 'PG019',
        month3: moment(new Date()).format('YYYY-MM'),
        //add-ws-12/10-汇率字典
        sumAwardmoney: '',
        errorgroup: '',
        selectType: 'Single',
        loading: false,
        title: 'title.PFANS1030VIEW',
        multiple: false,
        orglist: '',
        workflowCode: 'W0057',
        baseInfo: {},
        arrAttf: [],
        groupN: '',
        form: {
          uploadfile: '',
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
          extrinsic: '',
          numbermoth: '',
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
          budgetcode: this.$t('label.PFANS6008VIEW_EXPENSE'),
          depart: '',
          projects: '',
          member: '',
          community: '',
          outsource: '',
          outcommunity: '',
          worknumber: '',
          awardmoney: '',
        }, {
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
        }],
        tableS: [],
        //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc fr
        tableFS: [],
        //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc to
        //region scc  upd 21/8/23  from
        tableD: [{
          staffdetail_id: '',
          award_id: '',
          incondepartment: '',
          attf: '',
          inwork04: '',
          inwork05: '',
          inwork06: '',
          inwork07: '',
          inwork08: '',
          inwork09: '',
          inwork10: '',
          inwork11: '',
          inwork12: '',
          inwork01: '',
          inwork02: '',
          inwork03: '',
          totalall: '0.00',
          BM: '',
          BMtotal: '0.00',
        }],
        //endregion scc  upd 21/8/23  from

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
          // plan: [{
          //   required: true,
          //   validator: checkplan,
          //   trigger: 'blur',
          // }],
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
          enclosurecontent: [{
            required: true,
            validator: checkuploadfile,
            trigger: 'change',
          }],
          //region scc add 9/18 理由必填 from
          reason: [{
            required: true,
            validator: checkreason,
            trigger: 'change',
          }],
          //endregion scc add 9/18 理由必填 to
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
            //regon scc add 9/18 页面初始化理由 from
            if(response.staffDetail.length > 0){
              this.strreason = response.staffDetail[0].reason;
            }else{
              this.strreason = "";
            }
            //endregon scc add 9/18 页面初始化理由 to
            if (this.form.status === '4' || this.form.status === '2') {
              this.enableSave = false;
              //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc fr
              if(this.form.status === '4'){
                this.distriamt = false;
              }
            } else {
              this.enableSave = true;
              this.distriamt = false;
              //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc to
            }
            if (response.award.custojapanese !== null && response.award.custojapanese !== '') {
              let letUser = getUserInfo(response.award.custojapanese);
              if (letUser != null) {
                this.form.custojapanese = letUser.userinfo.customername;
              }
            }
            //add-ws-汇率修改
            //region scc del 9/16 汇率从每月汇率里取，在做决裁书时生成 from
            // if (response.award.currencyposition === 'PG019001' || this.form.currencyposition === this.$t('label.PFANS1039FORMVIEW_DOLLAR')) {
            //   let letcheckexchangerate = getDictionaryInfo('JY001001');
            //   if (letcheckexchangerate != null) {
            //     response.award.exchangerate = letcheckexchangerate.value2;
            //   }
            // } else {
            //   response.award.exchangerate = 1;
            // }
            //endregion scc del 9/16 汇率从每月汇率里取，在做决裁书时生成 to
            //add-ws-汇率修改
            // let letCurrencyposition = getDictionaryInfo(response.award.currencyposition);
            // if (letCurrencyposition != null) {
            //   response.award.currencyposition = letCurrencyposition.value1;
            // }
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
            //add-ws-表格第一行固定处理
            //add-ws-添加上传附件功能
            if (this.form.uploadfile != '' && this.form.uploadfile != null) {
              let uploadfile = this.form.uploadfile.split(';');
              for (var i = 0; i < uploadfile.length; i++) {
                if (uploadfile[i].split(',')[0] != '') {
                  let o = {};
                  o.name = uploadfile[i].split(',')[0];
                  o.url = uploadfile[i].split(',')[1];
                  this.fileList.push(o);
                }
              }
            }
            //add-ws-添加上传附件功能
            if (response.awardDetail.length > 0) {
              let check = 0;
              let data = [];
              for (let i = 0; i < response.awardDetail.length; i++) {
                if (response.awardDetail[i].budgetcode === this.$t('label.PFANS1025FORMVIEW_CHECKERROR')) {
                  check = check + 1;
                  break;
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
                });
                this.tableT = data.concat(response.awardDetail);
              } else {
                this.tableT = response.awardDetail;
              }
              for (var i = 0; i < this.tableT.length; i++) {
                this.orglist = this.tableT[i].depart;
                if (this.tableT[i].depart !== '' && this.tableT[i].depart !== null && this.tableT[i].depart !== undefined) {
                  //ADD_FJL
                  this.tableT[i].options1 = [];
                  if (getOrgInfo(this.tableT[i].depart)) {
                    let butinfo = (getOrgInfo(this.tableT[i].depart).encoding).substring(0, 3);
                    let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                    if (dic.length > 0) {
                      for (let j = 0; j < dic.length; j++) {
                        if (butinfo === (dic[j].value1).substring(0, 3)) {
                          this.tableT[i].options1.push({
                            lable: dic[j].value2 + '_' + dic[j].value3,
                            value: dic[j].code,
                          });
                        }
                      }
                    }
                    //ADD_FJL  修改人员预算编码
                  }
                }
              }
            }
            //add-ws-表格第一行固定处理
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

            //region scc add 8/26 删除详情页面列出初始rank  from
            // let data = [];
            // for (let i = 0; i < this.optionsdatedic.length; i++) {
            //   let money3 = this.optionsdatedic[i].value3;
            //   let money4 = this.optionsdatedic[i].value4;
            //   data.push({
            //     award_id: '',
            //     staffdetail_id: '',
            //     attf: getDictionaryInfo(this.optionsdatedic[i].value2).value1,
            //     budgetcode: ((money3 * 3) + (money4 * 9)) / 12,
            //     depart: '',
            //     subtotal: '',
            //   });
            // }
            // this.tableD = data;
            //endregion scc add 8/26 删除详情页面列出初始rank  to


            // add-ws-合同人件费修改
            // if (this.form.tablecommunt !== '' && this.form.tablecommunt !== null) {
            //   for (let i = 0; i < JSON.parse(response.award.tablecommunt).length; i++) {
            //     let aa = JSON.parse(response.award.tablecommunt)[i];
            //     this.tableD[i].budgetcode = aa.attf1;
            //     this.tableD[i].depart = aa.attf2;
            //   }
            // }
            //region upd scc 8/24 页面加载重新获取 from
            if (response.staffDetail.length > 0) {
              this.tableD = response.staffDetail;
              for(let i = 0; i < response.staffDetail.length; i++){
                this.tableD[i].totalall = response.staffDetail[i].depart;
                this.tableD[i].BMtotal = response.staffDetail[i].subtotal;
                this.tableD[i].BM = response.staffDetail[i].bm;
              }
            }
            //endregion upd scc 8/24 页面加载重新获取 to

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
              //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc fr
              this.tableS = response.numbercounts;
            }
            if (response.awardReunites.length > 0) {
              for (let i = 0; i < response.awardReunites.length; i++) {
                let deliverydate = response.awardReunites[i].deliverydate;
                let completiondate = response.awardReunites[i].completiondate;
                let claimdate = response.awardReunites[i].claimdate;
                let supportdate = response.awardReunites[i].supportdate;

                if (deliverydate !== '' && deliverydate != null) {
                  response.awardReunites[i].deliverydate = moment(deliverydate).format('YYYY-MM-DD');
                }
                if (completiondate !== '' && completiondate != null) {
                  response.awardReunites[i].completiondate = moment(completiondate).format('YYYY-MM-DD');
                }
                if (claimdate !== '' && claimdate != null) {
                  response.awardReunites[i].claimdate = moment(claimdate).format('YYYY-MM-DD');
                }
                if (supportdate !== '' && supportdate != null) {
                  response.awardReunites[i].supportdate = moment(supportdate).format('YYYY-MM-DD');
                }
              }
              this.tableFS = response.awardReunites;
              //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc to
            }
            this.form.claimamount = aa;
            this.userlist = this.form.user_id;
            this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.awardDetail = JSON.parse(JSON.stringify(this.tableT));
            //region scc add 21/8/20 查询部门下拉框数据源 from
            this.$store
            .dispatch('PFANS1025Store/getcompanyen')
            .then(res => {
              this.option = res;
            })
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
              });
            //endregion scc add 21/8/20 查询部门下拉框数据源 to
            //region scc add 21/8/23 rank下拉框数据源 from
            this.$store
              .dispatch('PFANS1025Store/getRanks')
              .then(ress => {
                this.option1 = ress;
              })
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
              });
            //endregion scc add 21/8/23 rank下拉框数据源 to
            //region scc add 8/30 获取年度所有部门对用的成本 from
            this.$store
              .dispatch('PFANS1025Store/getPersonalBm', {
                'years': this.form.claimdatetimeStart
              })
              .then(res => {
                this.rabm.push(res);
              })
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
              });
            //endregion scc add 8/30 获取年度所有部门对应的成本 to
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
            disabled: true,
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
      checkRequire() {
        if (!this.form.custochinese ||
          !this.form.placejapanese ||
          !this.form.custojapanese ||
          !this.form.placechinese ||
          !this.form.deployment ||
          !this.form.pjnamejapanese ||
          !this.form.pjnamechinese ||
          !this.form.claimdatetimeStart ||
          !this.form.claimdatetimeEnd ||
          !this.form.currencyposition ||
          !this.form.claimamount
        ) {
          this.activeName = 'first';
        } else if (!this.form.user_id ||
          !this.form.valuation ||
          !this.form.individual
        ) {
          this.activeName = 'second';
        } else if (!this.form.uploadfile) {
          this.activeName = 'fourth';
        }
      },
      //add-ws-4/17-审批过程中数据可编辑问题修改
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disable = val;
        }
      },
      //add-ws-4/17-审批过程中数据可编辑问题修改
      getBudgetunit(val, row) {
        row.budgetcode = val;
      },
      //add-ws-添加上传附件功能-
      fileError(err, file, fileList) {
        Message({
          message: this.$t('normal.error_04'),
          type: 'error',
          duration: 5 * 1000,
        });
      },
      fileRemove(file, fileList) {
        this.fileList = [];
        this.form.uploadfile = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          o.url = item.url;
          this.fileList.push(o);
          this.form.uploadfile += item.name + ',' + item.url + ';';
        }
      },
      fileDownload(file) {
        if (file.url) {
          file.url = file.url.replace("%","%25");
          file.url = file.url.replace("#","%23");
          file.url = file.url.replace("&","%26");
          file.url = file.url.replace("+","%2B");
          file.url = file.url.replace("=","%3D");
          file.url = file.url.replace("?","%3F");
          var url = downLoadUrl(file.url);
          window.open(url);
        }

      },
      filechange(file, fileList) {
        this.$refs.reff.validateField('enclosurecontent');
      },
      fileSuccess(response, file, fileList) {
        if (response.data == 'upload_success') {
          this.fileList = [];
          this.form.uploadfile = '';
          for (var item of fileList) {
            let o = {};
            o.name = item.name;
            if (!item.url) {
              o.url = item.response.info;
            } else {
              o.url = item.url;
            }
            this.fileList.push(o);
            this.form.uploadfile += o.name + ',' + o.url + ';';
          }
        } else {
          Message({
            message: this.$t('label.PFANS2016FORMVIEW_FILEERROR'),
            type: 'error',
            duration: 5 * 1000,
          });
          this.form.uploadfile = '';
          this.$refs.upload.clearFiles();
        }
      },
       //部门获取人员rank成本 ztc fr
      checkUndefined(val){
        if(val != undefined){
          return val
        }else{
          return 0;
        }
      },
      //部门获取人员rank成本 ztc to
      //add-ws-添加上传附件功能-
      //region scc upd 8/23 总计 from
      changesubtotal(row) {
        row.totalall = row.inwork04 + row.inwork05 + row.inwork06 + row.inwork07 + row.inwork08 + row.inwork09 + row.inwork10
                        + row.inwork11 + row.inwork12 + row.inwork01 + row.inwork02 + row.inwork03;
        //部门获取人员rank成本 ztc fr
        row.BMtotal =
          this.checkUndefined(row.BM[0].month1) * row.inwork01 +
          this.checkUndefined(row.BM[0].month2)* row.inwork02 +
          this.checkUndefined(row.BM[0].month3)* row.inwork03 +
          this.checkUndefined(row.BM[0].month4)* row.inwork04 +
          this.checkUndefined(row.BM[0].month5)* row.inwork05 +
          this.checkUndefined(row.BM[0].month6)* row.inwork06 +
          this.checkUndefined(row.BM[0].month7)* row.inwork07 +
          this.checkUndefined(row.BM[0].month8)* row.inwork08 +
          this.checkUndefined(row.BM[0].month9)* row.inwork09 +
          this.checkUndefined(row.BM[0].month10) * row.inwork10 +
          this.checkUndefined(row.BM[0].month11) * row.inwork11 +
          this.checkUndefined(row.BM[0].month12) * row.inwork12
        //部门获取人员rank成本 ztc to
      },
      //endregion scc upd 8/23 总计 to
      changebudgetcode(row) {
        row.subtotal = row.budgetcode * row.depart;
      },
      changedepart(row) {
        row.subtotal = row.budgetcode * row.depart;
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
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
              if (!isNaN(value)) {
                return Math.round((prev + curr) * 100) / 100;
              } else {
                return Math.round(prev * 100) / 100;
              }
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
            }, 0);
            if (index == 1) {
              sums[index] = '--';
            }
            if (index == 2) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 3) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            //region scc add 8/23 计算和 from
            if (index == 4) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 5) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 6) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 7) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 8) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 9) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 10) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 11) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 12) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 13) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 14) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 15) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            //endregion scc add 8/23 计算和 to
          } else {
            sums[index] = '--';
          }
        });
        this.moneysumclick(sums);
        return sums;
      },
      //region scc upd 9/22 隐藏总金额列时表格求和方法无法计算总和，修正pj限界利润率 from
      moneysumclick(sums) {
        // this.form.membercost = sums[15];
        // let checkpjrate = parseFloat((this.form.sarmb - this.form.membercost - this.form.total)) / this.form.sarmb;
        // this.form.pjrate = checkpjrate * 100;
        Math.formatFloat = function (f, digit) {  // 解决js精度丢失问题，保留小数
          var m = Math.pow(10, digit);
          return Math.round(f * m, 10) / m;
        }
        let checkpjrate = 0.00;
        for(let i = 0; i < this.tableD.length; i++){
          checkpjrate += Number(this.tableD[i].BMtotal);
        }
        let checkPjrate1 = Math.formatFloat(checkpjrate,2);
        let Pjrate = parseFloat((this.form.sarmb - Math.formatFloat(checkpjrate,2) - this.form.total).toString()) / this.form.sarmb;
        this.form.pjrate = Pjrate * 100;
      },
      //endregion scc upd 9/22 隐藏总金额列时表格求和方法无法计算总和，修正pj限界利润率 to
      //region scc add 界限利润率比部门界限利润率低于-5% 高于8% 检查 from
      PJcheck() {//合计外注费(元)，因为计算，被/100
        let rate1 = Number(this.form.pjrate) * 100 - Number(this.form.rate);
        if (rate1 > 8 || rate1 < -5) {
          this.forreason = true;
        } else {
          this.forreason = false
          this.form.reason = '';
        }
      },
      PJcheck2() {//部門計画限界利益率
        let rate1 = Number(this.form.pjrate) - Number(this.form.rate);
        if (rate1 > 8 || rate1 < -5) {
          this.forreason = true;
        } else {
          this.forreason = false;
          this.strreason = '';
        }
      },
      //endregion scc add 界限利润率比部门界限利润率低于-5% 高于8% 检查 to
      //region update_qhr_20210723 修改组件方法
      changePro(val, row) {
        row.projects = val.companyprojects_id;
      },
      //endregion update_qhr_20210723 修改组件方法
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
        if (this.form.total === 0) {
          this.form.outsourcing = 0;
        } else {
          this.form.outsourcing = this.form.total / val;
        }
      },
      gettotal(val) {
        if (this.form.number === 0) {
          this.form.outsourcing = 0;
        } else {
          this.form.outsourcing = val / this.form.number;
        }
        this.form.pjrate = parseFloat((this.form.sarmb - this.form.membercost - val)) / this.form.sarmb;
        //region scc add 9/17 合计外注费(元)改变判断限界利润率 from
        this.PJcheck();
        //endregion scc add 9/17 合计外注费(元)改变判断限界利润率 to
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
      // getplan(val) {
      //   this.form.plan = val;
      // },
      getindividual(val) {
        this.form.individual = val;
      },
      //修改人员预算编码
      // update center取预算单位横展 start 0404
      getGroupId(orglist, row) {
        row.depart = orglist;
        //ADD_FJL
        row.options1 = [];
        row.budgetcode = '';
        if(getOrgInfo(row.depart)){
            let butinfo = (getOrgInfo(row.depart).encoding).substring(0,3);
            let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
            if (dic.length > 0) {
                for (let i = 0; i < dic.length; i++) {
                    if (butinfo === (dic[i].value1).substring(0,3)) {
                        row.options1.push({
                            lable: dic[i].value2 + '_' + dic[i].value3,
                            value: dic[i].code,
                        });
                    }
                }
            }
        }
        //ADD_FJL  修改人员预算编码
        let group = getOrgInfo(orglist);
        if (group) {
          // row.budgetcode = group.encoding;
          row.companyend = group.companyen;
        }
      },
      // update center取预算单位横展 end 0404
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
        this.buttonClick2();
        //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
      },
      //add-ws-5-20-流程恒展开
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
        this.buttonClick2();
        //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
      },
      //add-ws-5-20-流程恒展开
      end() {
        this.form.status = '0';
        //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
        this.buttonClick2();
        //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
      },
      //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
      buttonClick2() {
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
            // budgetcode: this.tableD[i].BM,
            depart: this.tableD[i].totalall,
            subtotal: this.tableD[i].BMtotal,
            incondepartment: this.tableD[i].incondepartment,
            inwork04: this.tableD[i].inwork04,
            inwork05: this.tableD[i].inwork05,
            inwork06: this.tableD[i].inwork06,
            inwork07: this.tableD[i].inwork07,
            inwork08: this.tableD[i].inwork08,
            inwork09: this.tableD[i].inwork09,
            inwork10: this.tableD[i].inwork10,
            inwork11: this.tableD[i].inwork11,
            inwork12: this.tableD[i].inwork12,
            inwork01: this.tableD[i].inwork01,
            inwork02: this.tableD[i].inwork02,
            inwork03: this.tableD[i].inwork03,
            contractnumber: this.form.contractnumber,
            claimamount: this.form.claimamount,
            //region scc upd from
            reason: this.strreason
            //endregion scc upd to
          });
        }
        this.baseInfo.groupN = this.$store.getters.orgGroupList;
        this.loading = true;
        this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
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
        this.$store
          .dispatch('PFANS1025Store/update', this.baseInfo)
          .then(response => {
            this.data = response;
            this.loading = false;
            if (this.$store.getters.historyUrl) {
              if(this.form.status != '0'){
                this.$router.push(this.$store.getters.historyUrl);
              }else{
                this.distriamt = false
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
      },
      //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
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
          projects: '123',   //update_qhr_20210723 修改组件属性
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
      //region scc add 详情增加减行 from
      addRow1() {
        this.tableD.push({
          staffdetail_id: '',
          award_id: '',
          incondepartment: '',
          attf: '',
          inwork04: '',
          inwork05: '',
          inwork06: '',
          inwork07: '',
          inwork08: '',
          inwork09: '',
          inwork10: '',
          inwork11: '',
          inwork12: '',
          inwork01: '',
          inwork02: '',
          inwork03: '',
          totalall: '0.00',
          BM: '',
          BMtotal: '0.00',
        });
      },
      deleteRow1(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableD = [{
            staffdetail_id: '',
            award_id: '',
            incondepartment: '',
            attf: '',
            inwork04: '',
            inwork05: '',
            inwork06: '',
            inwork07: '',
            inwork08: '',
            inwork09: '',
            inwork10: '',
            inwork11: '',
            inwork12: '',
            inwork01: '',
            inwork02: '',
            inwork03: '',
            totalall: '0.00',
            BM: '',
            BMtotal: '0.00',
          }];
        }
      },
      //endregion scc add 详情增加减行 to
      //region scc add 部门RANK下拉框事件 from
      changeDep(row) {
        //获取年度对应rank的成本 from
          if (row.incondepartment) {
            this.rabm1 = this.rabm[0][row.incondepartment];
          }else{
            this.rabm1 = {};
          }
        //获取年度对应rank的成本 to
      },
      changeRank(row) {
        if (row.incondepartment) {
          this.rabm1 = this.rabm[0][row.incondepartment];
        }
        if(JSON.stringify(this.rabm1) !== "{}"){
          row.BM = this.rabm1[row.attf];
          row.BMtotal =
            this.checkUndefined(row.BM[0].month1) * row.inwork01 +
            this.checkUndefined(row.BM[0].month2)* row.inwork02 +
            this.checkUndefined(row.BM[0].month3)* row.inwork03 +
            this.checkUndefined(row.BM[0].month4)* row.inwork04 +
            this.checkUndefined(row.BM[0].month5)* row.inwork05 +
            this.checkUndefined(row.BM[0].month6)* row.inwork06 +
            this.checkUndefined(row.BM[0].month7)* row.inwork07 +
            this.checkUndefined(row.BM[0].month8)* row.inwork08 +
            this.checkUndefined(row.BM[0].month9)* row.inwork09 +
            this.checkUndefined(row.BM[0].month10) * row.inwork10 +
            this.checkUndefined(row.BM[0].month11) * row.inwork11 +
            this.checkUndefined(row.BM[0].month12) * row.inwork12
        }else{
          row.attf = "";
          Message({
            message: this.$t("normal.error_depart"),
            type: 'error',
            duration: 5 * 1000,
          });
        }
      },
      //endregion scc add 部门RANK下拉框事件 to
      //region scc add tableD部门，rank非空验证 from
      checkTableD(flag){
        for(let i = 0; i < this.tableD.length; i++){
          if(!this.tableD[i].incondepartment || !this.tableD[i].attf){
            flag = true;
            Message({
              message: this.$t('normal.info_28'),
              type: 'error',
              duration: 5 * 1000,
            });
            return flag;
          }
        }
      },
      //endregion scc add tableD部门，rank非空验证 to
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
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
              if (!isNaN(value)) {
                return Math.round((prev + curr) * 100) / 100;
              } else {
                return Math.round(prev * 100) / 100;
              }
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
            }, 0);
            if (index == 1) {
              sums[index] = '--';
            }
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
        //region scc del 9/16 売上(RMB)变更用请求金额计算且不在从前台做计算 from
        // this.moneySum(sums);
        //endregion scc del 9/16 売上(RMB)变更用请求金额计算且不在从前台做计算 to
        return sums;
      },
      //region scc del 9/16 売上(RMB)变更用请求金额计算且不在从前台做计算 from
      // moneySum(sums) {
      //   if (this.form.currencyposition === 'PG019001' || this.form.currencyposition === this.$t('label.PFANS1039FORMVIEW_DOLLAR')) {
      //     this.form.sarmb = this.form.exchangerate * sums[8];
      //   } else {
      //     this.form.sarmb = sums[8];
      //   }
      // },
      //endregion scc del 9/16 売上(RMB)变更用请求金额计算且不在从前台做计算 to
      //add-ws-6/22-禅道152任务
      checkparamsTitle() {
        let id = this.$route.params._checkid;
        let disable = this.$route.params._checkdisable;
        this.$router.push({
          name: 'PFANS1026FormView',
          params: {
            _id: id,
            disabled: disable,
          },
        });
      },

      paramsTitle() {
        this.$router.push({
          name: 'PFANS1030View',
        });
      },
      //add-ws-6/22-禅道152任务
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
            // budgetcode: this.tableD[i].budgetcode,
            depart: this.tableD[i].totalall,
            subtotal: this.tableD[i].BMtotal,
            incondepartment: this.tableD[i].incondepartment,
            inwork04: this.tableD[i].inwork04,
            inwork05: this.tableD[i].inwork05,
            inwork06: this.tableD[i].inwork06,
            inwork07: this.tableD[i].inwork07,
            inwork08: this.tableD[i].inwork08,
            inwork09: this.tableD[i].inwork09,
            inwork10: this.tableD[i].inwork10,
            inwork11: this.tableD[i].inwork11,
            inwork12: this.tableD[i].inwork12,
            inwork01: this.tableD[i].inwork01,
            inwork02: this.tableD[i].inwork02,
            inwork03: this.tableD[i].inwork03,
            contractnumber: this.form.contractnumber,
            claimamount: this.form.claimamount,
            //region scc upd from
            reason: this.strreason
            //endregion scc upd to
          });
        }
        this.baseInfo.groupN = this.$store.getters.orgGroupList;
        //add-ws-6/22-禅道152任务
        if (val === 'back') {
          if (this.$route.params._check != null && this.$route.params._check != '' && this.$route.params._check != undefined) {
            if (this.$route.params._check) {
              this.checkparamsTitle();
            }
          } else {
            this.paramsTitle();
          }
          //add-ws-6/22-禅道152任务
        } else if (val === 'save' || val === 'StartWorkflow') {
          //region scc 8/27 add tableD部门，rank非空验证判断，结束方法 from
          let flag = false;
          let flag1 =  this.checkTableD(flag);
          if(flag1 === true){
            return;
          }
          //endregion scc 8/27 add tableD部门，rank非空验证判断，结束方法 to
          this.checkRequire();
          //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc fr
          if(this.form.contracttype == 'HT008002'
            || this.form.contracttype == 'HT008004'
            || this.form.contracttype == 'HT008006'
            || this.form.contracttype == 'HT008008'){
            let datamountMap = new Map();
            for (let t = 0; t < this.tableFS.length; t++) {
              datamountMap.set(this.tableFS[t].claimtype, this.tableFS[t].claimamount);
            }
            let scanMap = new Map();
            for (let h = 0; h < this.tableFS.length; h++) {
              if (h == 0) {
                scanMap.set(this.tableFS[h].claimtype, this.tableFS[h].distriamount)
              } else {
                let resultAnt = scanMap.get(this.tableFS[h].claimtype)
                if (resultAnt == undefined) {
                  scanMap.set(this.tableFS[h].claimtype, this.tableFS[h].distriamount)
                } else {
                  let resultInScanMap = resultAnt + this.tableFS[h].distriamount;
                  scanMap.set(this.tableFS[h].claimtype, resultInScanMap)
                }
              }
            }
            for (let t = 0; t < this.tableFS.length; t++) {
              let dataMapChild = datamountMap.get(this.tableFS[t].claimtype);
              let scanMapChild = scanMap.get(this.tableFS[t].claimtype);
              if (dataMapChild != scanMapChild) {
                Message({
                  message: this.$t('label.PFANS1026FORMVIEW_COMPOUNDM'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
              }
            }
          }
          //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc to
          this.$refs['reff'].validate(valid => {
            if (valid) {
              this.loading = true;
              this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.awardDetail = [];
              //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc fr
              this.baseInfo.awardReunites = [];
              //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc to
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
              //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc fr
              for (let i = 0; i < this.tableFS.length; i++) {
               this.baseInfo.awardReunites.push({
                 awardreunite_id: this.tableFS[i].awardreunite_id,
                 contractnumber: this.form.contractnumber,
                 claimtype: this.tableFS[i].claimtype,
                 department: this.tableFS[i].department,
                 deliverydate: this.tableFS[i].deliverydate,
                 completiondate: this.tableFS[i].completiondate,
                 claimdate: this.tableFS[i].claimdate,
                 supportdate: this.tableFS[i].supportdate,
                 claimamount: this.tableFS[i].claimamount,
                 distriamount: this.tableFS[i].distriamount,
                 rowindex: this.tableFS[i].rowindex,
               });
              }
              //    PSDCD_PFANS_20210525_XQ_054 复合合同决裁书分配金额可修改 ztc to
              if (this.$route.params._id) {     //编辑
                this.baseInfo.award.award_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1025Store/update', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
                    if (val !== 'save' && val !== 'StartWorkflow') {
                      if (this.$store.getters.historyUrl) {
                        this.$router.push(this.$store.getters.historyUrl);
                      }
                    }
                    if (val === 'StartWorkflow') {
                      this.$store.commit('global/SET_OPERATEID', this.$route.params._id);
                      this.$refs.container.$refs.workflow.startWorkflow();
                      this.distriamt = true
                    }
                    //add-ws-4/17-实施结果为空的情况下发起审批，提示填入必须项后程序没有终止修改
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
          this.baseInfo.awardDetail = [];
          let sumoutsource = 0;
          let summember = 0;
          let sumworknumber = 0;
          let sumawardmoney = 0;
          for (let i = 0; i < this.tableT.length; i++) {
            if (this.tableT[i].budgetcode !== '' || this.tableT[i].depart !== '' || this.tableT[i].member > '0' || this.tableT[i].community > '0'
              || this.tableT[i].outsource > '0' || this.tableT[i].outcommunity > '0' || this.tableT[i].worknumber > '0' || this.tableT[i].awardmoney > '0') {
              //add-ws-模板合计值累加
              sumoutsource += this.tableT[i].outsource;
              summember += this.tableT[i].member;
              sumworknumber += this.tableT[i].worknumber;
              sumawardmoney += this.tableT[i].awardmoney;
              //add-ws-模板合计值累加
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
          //add-ws-将画面没有用到的字段给模板合计值赋值
          this.form.extrinsic = sumoutsource;
          this.form.numbermoth = summember;
          this.form.commdepartment = sumworknumber;
          this.form.commission = sumawardmoney;
          //add-ws-将画面没有用到的字段给模板合计值赋值
          this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
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
      //region scc add 9/18 理由验证 from
      clearValidate(prop) {
        this.$refs['reff'].fields.forEach((e) => {
          if (prop.includes(e.prop)) {
            e.clearValidate();
          }
        });
      },
      //endregion scc add 9/18 理由验证 to
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
