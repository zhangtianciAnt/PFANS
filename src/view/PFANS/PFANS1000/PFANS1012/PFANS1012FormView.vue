<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title"
                         @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <!--<el-dialog :visible.sync="csvVisible">-->
          <!--<el-upload-->
            <!--drag-->
            <!--ref="uploader"-->
            <!--:action="postAction"-->
            <!--:on-success="handleSuccess"-->
            <!--:before-upload="handleChange"-->
            <!--:headers="authHeader"-->
            <!--:limit=1-->
            <!--:on-remove="this.clear"-->
            <!--multiple-->
          <!--&gt;-->
            <!--<i class="el-icon-upload"></i>-->
            <!--<div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>-->
          <!--</el-upload>-->
        <!--</el-dialog>-->

        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1012VIEW_SUMMONS')" name="first"  >
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.center')" >
                      <el-input :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.group')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.team')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 10.2rem" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_TELEPHONE')" prop="telephone">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                      <dicselect :code="code1"
                                 :data="form.budgetunit"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getBudge"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_MODULE')">
                      <dicselect :code="code2"
                                 :data="form.moduleid"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getmodule"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_ACCOUNTNUMBER')" prop="account_number">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.accountnumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_REIMBURSEMENTDATE')" prop="application_date">
                      <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.reimbursementdate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item :label="$t('label.judgement')" v-if="show7" >
                      <el-input :disabled="true" style="width:20vw" v-model="form.judgement">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_RMBEXPENDITURE')">
                      <el-input-number
                        :disabled="true"
                        :min="0"
                        :precision="2"
                        @change="getMoney"
                        style="width:20vw"
                        controls-position="right"
                        v-model="form.rmbexpenditure"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_CURRENCYEXPENDITURE')">
                      <el-input-number
                        :disabled="true"
                        :max="1000000000"
                        :min="0"
                        :precision="2"
                        @change="getforeigncurrency"
                        controls-position="right"
                        style="width:20vw"
                        v-model="form.foreigncurrency"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_TORMB')">
                      <el-input-number
                        :disabled="true"
                        :max="1000000000"
                        :min="0"
                        :precision="2"
                        controls-position="right"
                        style="width:20vw"
                        v-model="form.tormb"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_CURRENCY')">
                      <dicselect :code="code4"
                                 :data="form.currency"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getCurrency"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_CURRENCYRATE')">
                      <el-input-number
                        :disabled="!disablecurr"
                        :max="999999"
                        :min="0"
                        :precision="3"
                        :step="0.01"
                        controls-position="right"
                        style="width:20vw"
                        @change="getCurrencyrate"
                        v-model="form.currencyrate">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item :label="$t('label.PFANS1012VIEW_ABSTRACT')">
                    <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                              v-model="form.remark">
                    </el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYMENTMETHOD')" prop="paymentmethod">
                      <dicselect :code="code3"
                                 :data="form.paymentmethod"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getPayment"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEENAME')" v-show="show1" prop="payeename">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.payeename"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')" v-show="show1" prop="payeecode">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw" type="email"
                                v-model="form.payeecode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')" v-show="show1" prop="payeebankaccountnumber">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.payeebankaccountnumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')" v-show="show1" prop="payeebankaccount">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.payeebankaccount"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PERSONALNAME')" v-show="show2" prop="name">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PERSONALCODE')" v-show="show2" prop="code">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.code"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEENAME')" v-show="show3" prop="receivables">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.receivables"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_TEMPORARYLOAN')" v-show="show4" prop="loan">
                      <el-select :disabled="!disable" style="width:20vw" v-model="form.loan">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in options">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_COMPANYNAME')" v-show="show5" prop="fullname">
                      <el-input :disabled="!disable" maxlength="20"
                                style="width:20vw" v-model="form.fullname"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-table :data="tableData"
                          show-summary
                          :summary-method="getDsummaries"
                          header-cell-class-name="sub_bg_color_blue" v-if="showdata">
                  <el-table-column :label="$t('label.PFANS1012VIEW_ABSTRACT')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="true" style="width: 100%" v-model="scope.row.abstract">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1012VIEW_SUBJECTNUMBER')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.subjectnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1012VIEW_SUBJECTNAME')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.subjectname">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.budgetunit')" align="center"width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetunit">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1012VIEW_DEBITAMOUNT')" align="center"width="150" prop="debitamount">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="true"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.debitamount">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1012VIEW_CREDITAMOUNT')" align="center" width="150" prop="creditamount">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="true"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.creditamount"
                        @change="getValue">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.remarks')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.remarks" >
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table :data="tableData2"
                          show-summary
                          :summary-method="getDsummaries"
                          header-cell-class-name="sub_bg_color_blue" v-if="showdata2">
                  <el-table-column :label="$t('label.PFANS1012VIEW_ABSTRACT')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="true" style="width: 100%" v-model="scope.row.abstract">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1012VIEW_SUBJECTNUMBER')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.subjectnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1012VIEW_SUBJECTNAME')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.subjectname">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.budgetunit')" align="center"width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetunit">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1012VIEW_DEBITAMOUNT')" align="center"width="150" prop="debitamount">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="true"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.debitamount">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1012VIEW_CREDITAMOUNT')" align="center" width="150" prop="creditamount">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="true"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.creditamount"
                        @change="getValue">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.remarks')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.remarks" >
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane >
            <el-tab-pane :label="$t('label.PFANS1012VIEW_TRAFFIC')" name="second">
              <el-table :data="tableT" :summary-method="getTsummaries"
                        header-cell-class-name="sub_bg_color_blue"
                        show-summary>
                <el-table-column :label="$t('label.date')" align="center" width="160">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" style="width: 100%"
                                    v-model="scope.row.trafficdate"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_REGION')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 100%" maxlength="20"  v-model="scope.row.region">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_VEHICLE')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 100%"  maxlength="20" v-model="scope.row.vehicle">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_STARTINGPOINT')" align="center" width="140">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" :content="scope.row.startingpoint" placement="top" :disabled="scope.row.startingpoint===''?true:false">
                      <el-input :disabled="!disable" style="width: 100%"  maxlength="20" v-model="scope.row.startingpoint"/>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      @change="changeRMB(scope.row)"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.rmb"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center" prop="foreigncurrency"
                                 width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      @change="changeForeigncurrency(scope.row)"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.foreigncurrency"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.annexno">
                    </el-input>
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
            </el-tab-pane >
            <el-tab-pane :label="$t('label.PFANS1012VIEW_PURCHASE')" name="third" v-if="show6">
              <el-table :data="tableP" :summary-method="getPsummaries"
                        header-cell-class-name="sub_bg_color_blue"
                        show-summary>
                <el-table-column :label="$t('label.date')" align="center" width="160">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" style="width: 100%" v-model="scope.row.purchasedetailsdate">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_PROCUREMENTPROJECT')" align="center" width="150">
                  <template slot-scope="scope">
                    <dicselect :code="code5"
                               :data="scope.row.procurementproject"
                               :disabled="!disable"
                               :multiple="multiple"
                               :no="scope.row"
                               @change="getprocurementproject" style="width: 100%">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_PROCUREMENTDETAILS')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 100%"
                              maxlength="20"
                              v-model="scope.row.procurementdetails"
                              v-show="scope.row.showrow">
                    </el-input>
                    <dicselect :code="code6"
                               :data="scope.row.procurementdetails"
                               :disabled="!disable"
                               :multiple="multiple"
                               :no="scope.row"
                               @change="setprocurementdetails"
                               style="width: 100%" v-show="scope.row.showrow1">
                    </dicselect>
                    <dicselect :code="code7"
                               :data="scope.row.procurementdetails"
                               :disabled="!disable"
                               :multiple="multiple"
                               :no="scope.row"
                               @change="setprocurementdetails"
                               style="width: 100%" v-show="scope.row.showrow2">
                    </dicselect>
                    <dicselect :code="code8"
                               :data="scope.row.procurementdetails"
                               :disabled="!disable"
                               :multiple="multiple"
                               :no="scope.row"
                               @change="setprocurementdetails"
                               style="width: 100%" v-show="scope.row.showrow3">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      @change="changeRMB(scope.row)"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.rmb"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center" prop="foreigncurrency"
                                 width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      @change="changeForeigncurrency(scope.row)"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.foreigncurrency"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.annexno">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRow3(scope.$index, tableP)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      @click="addRow3()"
                      plain
                      size="small"
                      type="primary"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1012VIEW_OTHER')" name="fourth" v-if="show6" >
              <el-table :data="tableR" :summary-method="getRsummaries" header-cell-class-name="sub_bg_color_blue"
                        show-summary>
                <el-table-column :label="$t('label.date')" align="center" width="160">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" style="width: 100%" v-model="scope.row.otherdetailsdate">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_COSTITEM')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 100%"  maxlength="20" v-model="scope.row.costitem">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_ABSTRACT')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 100%" maxlength="20"  v-model="scope.row.remarks" >
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      @change="changeRMB(scope.row)"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.rmb"
                    ></el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center" prop="foreigncurrency"
                                 width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      @change="changeForeigncurrency(scope.row)"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.foreigncurrency"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" v-model="scope.row.annexno">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRow4(scope.$index, tableR)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      @click="addRow4()"
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
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import {getToken} from '@/utils/auth'
  import user from "../../../components/user.vue";
  import {Message} from 'element-ui';
  import moment from "moment";
  import {getOrgInfoByUserId} from '@/utils/customize';
  import dicselect from "../../../components/dicselect";
  import {getDictionaryInfo} from "../../../../utils/customize";
  import Papa from "papaparse"

  export default {
    name: 'PFANS1012FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,

    },

    data() {
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === "undefined") {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        } else {
          this.error = "";
          return callback();
        }
      };
      var checktele = (rule, value, callback) => {
        this.regExp = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/
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
      var validatepayeename = (rule, value, callback) => {
        if (this.show1) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEENAME')));
          }
        } else {
          callback();
        }
      };
      var validatepayeecode = (rule, value, callback) => {
        if (this.show1) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')));
          }
        } else {
          callback();
        }
      };
      var validatepayeebankaccountnumber = (rule, value, callback) => {
        if (this.show1) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')));
          }
        } else {
          callback();
        }
      };
      var validatepayeebankaccount = (rule, value, callback) => {
        if (this.show1) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')));
          }
        } else {
          callback();
        }
      };
      var validatename = (rule, value, callback) => {
        if (this.show2) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PERSONALNAME')));
          }
        } else {
          callback();
        }
      };
      var validatecode = (rule, value, callback) => {
        if (this.show2) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PERSONALCODE')));
          }
        } else {
          callback();
        }
      };
      var validatereceivables = (rule, value, callback) => {
        if (this.show3) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEENAME')));
          }
        } else {
          callback();
        }
      };
      var validateloan = (rule, value, callback) => {
        if (this.show4) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_TEMPORARYLOAN')));
          }
        } else {
          callback();
        }
      };
      var validatefullname = (rule, value, callback) => {
        if (this.show5) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_COMPANYNAME')));
          }
        } else {
          callback();
        }
      };
      return {
        tableTValue: "",
        tablePValue: "",
        tableRValue: "",
        error: '',
        selectedlist: [],
        options: [],
        jude: [],
        selectType: "Single",
        title: "title.PFANS1012VIEW",
        userlist: "",
        activeName: 'first',

        loading: false,
        disabled: false,
        disablecurr: false,
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
          {
            'key': 'export',
            'name': 'button.export',
            disabled: false,
            icon: 'el-icon-download'
          }
        ],
        tableData: [{
          abstract: this.$t('label.PFANS1012VIEW_TRAFFICEXPENSEC'),
          subjectnumber: "",
          subjectname: "",
          budgetunit: "",
          debitamount: "",
          creditamount: "",
          remarks: "",
        },
          {
            abstract: this.$t('label.PFANS1012VIEW_PURCHASEEXPENSEC'),
            subjectnumber: "",
            subjectname: "",
            budgetunit: "",
            debitamount: "",
            creditamount: "",
            remarks: "",
          },
          {
            abstract: this.$t('label.PFANS1012VIEW_OTHEREXPENSEC'),
            subjectnumber: "",
            subjectname: "",
            budgetunit: "",
            debitamount: "",
            creditamount: "",
            remarks: "",
          },
        ],
        tableData2: [{
          abstract: this.$t('label.PFANS1012VIEW_TRAFFICEXPENSEC'),
          subjectnumber: "",
          subjectname: "",
          budgetunit: "",
          debitamount: "",
          creditamount: "",
          remarks: "",
        }],
        tableT: [{
          publicexpenseid: "",
          trafficdetails_id: "",
          trafficdate: "",
          region: "",
          vehicle: "",
          startingpoint: "",
          rmb: "",
          foreigncurrency: "",
          annexno: "",
          rowindex: "",
          display: true,
        }],
        tableP: [{
          publicexpenseid: "",
          purchasedetails_id: "",
          purchasedetailsdate: "",
          procurementdetails: "",
          procurementproject: "",
          rmb: "",
          foreigncurrency: "",
          annexno: "",
          rowindex: "",
          showrow: true,
          showrow1: false,
          showrow2: false,
          showrow3: false,
          display: true
        }],
        tableR: [{
          publicexpenseid: "",
          otherdetails_id: "",
          otherdetailsdate: "",
          costitem: "",
          remarks: "",
          rmb: "",
          foreigncurrency: "",
          annexno: "",
          rowindex: "",
          display: true
        }],
        baseInfo: {},
        form: {
          centerid: '',
          groupid: '',
          teamid: '',
          user_id: '',
          telephone: '',
          budgetunit: '',
          moduleid: '',
          accountnumber: '',
          reimbursementdate: moment(new Date()).format("YYYY-MM-DD"),
          moneys: '',
          currency: '',
          foreigncurrency: '',
          rmbexpenditure: '',
          currencyrate: '',
          tormb: '',
          remark: '',
          paymentmethod: '',
          payeename: '',
          payeecode: '',
          payeebankaccountnumber: '',
          payeebankaccount: '',
          name: '',
          code: '',
          type: '',
          judgement: '',
          receivables: '',
          loan: '',
          fullname: '',
          subjectnumber: "",
          subjectname: "",
          remarks: '',
          purchasesubjectnumber: "",
          purchasesubjectname: "",
          purchaseremarks: '',
          othersubjectnumber: "",
          othersubjectname: "",
          otherremarks: '',
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
          budgetunit: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
            trigger: 'change',
          }],
          paymentmethod: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1012VIEW_PAYMENTMETHOD'),
            trigger: 'change',
          }],
          accountnumber: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1012VIEW_ACCOUNT_NUMBER'),
            trigger: 'change',
          }],
          payeename: [{
            required: true,
            validator: validatepayeename,
            trigger: 'change',
          }],
          payeecode: [{
            required: true,
            validator: validatepayeecode,
            trigger: 'change',
          }],
          payeebankaccountnumber: [{
            required: true,
            validator: validatepayeebankaccountnumber,
            trigger: 'change',
          }],
          payeebankaccount: [{
            required: true,
            validator: validatepayeebankaccount,
            trigger: 'change',
          }],
          name: [{
            required: true,
            validator: validatename,
            trigger: 'change',
          }],
          code: [{
            required: true,
            validator: validatecode,
            trigger: 'change',
          }],
          receivables: [{
            required: true,
            validator: validatereceivables,
            trigger: 'change',
          }],
          loan: [{
            required: true,
            validator: validateloan,
            trigger: 'change',
          }],
          fullname: [{
            required: true,
            validator: validatefullname,
            trigger: 'change',
          }],
        },
        code1: 'PG002',
        code2: 'PJ002',
        code3: 'PJ004',
        code4: 'PJ003',
        code5: 'PJ005',
        code6: 'PJ006',
        code7: 'PJ007',
        code8: 'PJ008',
        multiple: false,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show: false,
        showrow: true,
        showrow1: false,
        showrow2: false,
        showrow3: false,
        showdata: false,
        showdata2: false,
        showdoll: false,
        showjpy: false,
        showother: false,
        canStart: false
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1012Store/selectById', {'publicexpenseid': this.$route.params._id})
          .then(response => {
            this.form = response.publicexpense;
            if (response.trafficdetails.length > 0) {
              this.tableT = response.trafficdetails;
            }
            if (response.purchasedetails.length > 0) {
              this.tableP = response.purchasedetails;
              for (var i = 0; i < this.tableP.length; i++) {
                if (this.tableP[i].procurementproject === 'PJ005001' || this.tableP[i].procurementproject === 'PJ005002' || this.tableP[i].procurementproject === 'PJ005006') {
                  this.tableP[i].showrow = true;
                  this.tableP[i].showrow1 = false;
                  this.tableP[i].showrow2 = false;
                  this.tableP[i].showrow3 = false;
                } else if (this.tableP[i].procurementproject === 'PJ005003') {
                  this.tableP[i].showrow = false;
                  this.tableP[i].showrow1 = true;
                  this.tableP[i].showrow2 = false;
                  this.tableP[i].showrow3 = false;
                } else if (this.tableP[i].procurementproject === 'PJ005004') {
                  this.tableP[i].showrow = false;
                  this.tableP[i].showrow1 = false;
                  this.tableP[i].showrow2 = true;
                  this.tableP[i].showrow3 = false;
                } else if (this.tableP[i].procurementproject === 'PJ005005') {
                  this.tableP[i].showrow = false;
                  this.tableP[i].showrow1 = false;
                  this.tableP[i].showrow2 = false;
                  this.tableP[i].showrow3 = true;
                } else if (this.tableP[i].procurementproject === ' ') {
                  this.tableP[i].showrow = true;
                }
              }
            }
            if (response.otherdetails.length > 0) {
              this.tableR = response.otherdetails;
            }
            this.userlist = this.form.user_id;
            this.baseInfo.publicexpense = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.trafficdetails = JSON.parse(JSON.stringify(this.tableT));
            this.baseInfo.purchasedetails = JSON.parse(JSON.stringify(this.tableP));
            this.baseInfo.otherdetails = JSON.parse(JSON.stringify(this.tableR));
            this.getPayment(this.form.paymentmethod);
            if (this.form.paymentmethod === 'PJ004001') {
              this.show1 = true;
            } else if (this.form.paymentmethod === 'PJ004002') {
              this.show2 = true;
            } else if (this.form.paymentmethod === 'PJ004003') {
              this.show3 = true;
            } else if (this.form.paymentmethod === 'PJ004004') {
              this.show4 = true;
            } else if (this.form.paymentmethod === 'PJ004005') {
              this.show5 = true;
            }
            if (this.form.type === 'PJ001001') {
              this.show6 = false;
              this.showdata2 = true;
              this.showdata = false;
              this.show7 = false;
              this.tableData2[0].subjectname = this.form.subjectname;
              this.tableData2[0].subjectnumber = this.form.subjectnumber;
              this.tableData2[0].remarks = this.form.remarks;
            } else if (this.form.type === 'PJ001002') {
              this.show6 = true;
              this.showdata = true;
              this.showdata2 = false;
              this.show7 = false;
              this.tableData[0].subjectname = this.form.subjectname;
              this.tableData[0].subjectnumber = this.form.subjectnumber;
              this.tableData[0].remarks = this.form.remarks;
              this.tableData[1].subjectname = this.form.purchasesubjectname;
              this.tableData[1].subjectnumber = this.form.purchasesubjectnumber;
              this.tableData[1].remarks = this.form.purchaseremarks;
              this.tableData[2].subjectname = this.form.othersubjectname;
              this.tableData[2].subjectnumber = this.form.othersubjectnumber;
              this.tableData[2].remarks = this.form.otherremarks;
            } else if (this.form.type === 'PJ001003') {
              this.show6 = true;
              this.showdata = true;
              this.showdata2 = false;
              this.tableData[0].subjectname = this.form.subjectname;
              this.tableData[0].subjectnumber = this.form.subjectnumber;
              this.tableData[0].remarks = this.form.remarks;
              this.tableData[1].subjectname = this.form.purchasesubjectname;
              this.tableData[1].subjectnumber = this.form.purchasesubjectnumber;
              this.tableData[1].remarks = this.form.purchaseremarks;
              this.tableData[2].subjectname = this.form.othersubjectname;
              this.tableData[2].subjectnumber = this.form.othersubjectnumber;
              this.tableData[2].remarks = this.form.otherremarks;
              this.show7 = true;
            }
            this.tableData2[0].budgetunit = getDictionaryInfo(this.form.budgetunit).value1;
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].budgetunit = getDictionaryInfo(this.form.budgetunit).value1;
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
        if (this.userlist !== null && this.userlist !== "") {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.centerid = rst.centerNmae;
          this.form.groupid = rst.groupNmae;
          this.form.teamid = rst.teamNmae;
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
        this.jude = this.$route.params._name;
        for (var i = 0; i < this.jude.length; i++) {
          this.form.judgement += this.jude[i][0].label + ",";
        }
        this.form.judgement = this.form.judgement.substring(0, this.form.judgement.length - 1);

        this.form.type = this.$route.params._type;
        if (this.form.type === 'PJ001001') {
          this.show6 = false;
          this.showdata2 = true;
          this.showdata = false;
          this.show7 = false;
          this.form.subjectname = this.tableData2[0].subjectname;
          this.form.subjectnumber = this.tableData2[0].subjectnumber;
          this.form.remarks = this.tableData2[0].remarks;
        } else if (this.form.type === 'PJ001002') {
          this.show6 = true;
          this.showdata2 = false;
          this.showdata = true;
          this.show7 = false;
        } else if (this.form.type === 'PJ001003') {
          this.show6 = true;
          this.showdata2 = false;
          this.showdata = true;
          this.show7 = true;
        }
      }
      this.$store
        .dispatch('PFANS1012Store/getLoanApplication', {user_id:this.$store.getters.userinfo.userid})
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            vote.value = response[i].loanapplication_id;
            vote.label = moment(response[i].application_date).format('YYYY-MM-DD');
            this.options.push(vote)
          }
        })
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    computed: {
      foreigncurrency: {
        get() {
          return this.form.foreigncurrency;
        },
        set(val) {
          this.form.foreigncurrency = val;
        }
      }
    },
    watch: {
      foreigncurrency(val) {
        this.form.tormb = Math.round((val * this.form.currencyrate) * 100) / 100;
      }
    },
    methods: {
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        this.form.centerid = rst.centerNmae;
        this.form.groupid = rst.groupNmae;
        this.form.teamid = rst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || typeof val == "undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = "";
        }
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
      getPayment(val) {
        this.form.paymentmethod = val;
        if (val === 'PJ004001') {
          this.show1 = true;
          this.show2 = false;
          this.show3 = false;
          this.show4 = false;
          this.show5 = false;
          this.form.name = "";
          this.form.code = "";
          this.form.accountnumber = "";
          this.form.receivables = "";
          this.form.loan = "";
          this.form.fullname = "";
        } else if (val === 'PJ004002') {
          this.show1 = false;
          this.show2 = true;
          this.show3 = false;
          this.show4 = false;
          this.show5 = false;
          this.form.payeename = "";
          this.form.payeecode = "";
          this.form.payeebankaccountnumber = "";
          this.form.payeebankaccount = "";
          this.form.receivables = "";
          this.form.loan = "";
          this.form.fullname = "";
        } else if (val === 'PJ004003') {
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          this.show4 = false;
          this.show5 = false;
          this.form.payeename = "";
          this.form.payeecode = "";
          this.form.payeebankaccountnumber = "";
          this.form.payeebankaccount = "";
          this.form.name = "";
          this.form.code = "";
          this.form.loan = "";
          this.form.fullname = "";
        } else if (val === 'PJ004004') {
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
          this.show4 = true;
          this.show5 = false;
          this.form.payeename = "";
          this.form.payeecode = "";
          this.form.payeebankaccountnumber = "";
          this.form.payeebankaccount = "";
          this.form.name = "";
          this.form.code = "";
          this.form.receivables = "";
          this.form.fullname = "";
        } else {
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
          this.show4 = false;
          this.show5 = true;
          this.form.payeename = "";
          this.form.payeecode = "";
          this.form.payeebankaccountnumber = "";
          this.form.payeebankaccount = "";
          this.form.name = "";
          this.form.code = "";
          this.form.receivables = "";
          this.form.loan = "";
        }
      },
      getBudge(val) {
        this.form.budgetunit = val;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].budgetunit = getDictionaryInfo(val).value1;
        }
        for (let i = 0; i < this.tableData2.length; i++) {
          this.tableData2[i].budgetunit = getDictionaryInfo(val).value1;
        }
      },
      getmodule(val) {
        this.form.moduleid = val;
      },
      getCurrency(val) {
        this.form.currency = val;
        if (val === 'PJ003001') {
          this.disablecurr = false;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.form.currencyrate = dictionaryInfo.value2;
          }
        } else if (val === 'PJ003002') {
          this.disablecurr = false;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.form.currencyrate = dictionaryInfo.value2;
          }
        } else if (val === 'PJ003003') {
          this.disablecurr = true;
          this.form.currencyrate = '';
        }
        this.form.tormb = Math.round((this.form.foreigncurrency * this.form.currencyrate) * 100) / 100;
      },
      getCurrencyrate(val) {
        this.form.currencyrate = val;
        this.form.tormb = Math.round((this.form.foreigncurrency * this.form.currencyrate) * 100) / 100;
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableT = [{
            trafficdate: '',
            region: '',
            vehicle: '',
            startingpoint: '',
            rmb: '',
            foreigncurrency: '',
            annexno: '',
          }]
        }
      },
      deleteRow3(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableP = [{
            purchasedetailsdate: '',
            procurementdetails: '',
            procurementproject: ' ',
            rmb: '',
            foreigncurrency: '',
            annexno: '',
            showrow: true,
          }]
        }
      },
      deleteRow4(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableR = [{
            otherdetailsdate: '',
            costitem: '',
            remarks: '',
            rmb: '',
            foreigncurrency: '',
            annexno: '',
          }]
        }
      },
      addRow() {
        this.tableT.push({
          trafficdetails_id: "",
          publicexpenseid: "",
          trafficdate: "",
          region: "",
          vehicle: "",
          startingpoint: "",
          rmb: "",
          foreigncurrency: "",
          annexno: "",
          rowindex: "",
          display: true
        });
      },
      addRow3() {
        this.tableP.push({
          publicexpenseid: "",
          purchasedetails_id: "",
          purchasedetailsdate: "",
          procurementdetails: "",
          procurementproject: "",
          rmb: "",
          foreigncurrency: "",
          annexno: "",
          rowindex: "",
          display: true,
          showrow: true,
          showrow1: false,
          showrow2: false,
          showrow3: false,
        });
      },
      addRow4() {
        this.tableR.push({
          publicexpenseid: "",
          otherdetails_id: "",
          otherdetailsdate: "",
          costitem: "",
          remarks: "",
          rmb: "",
          foreigncurrency: "",
          annexno: "",
          rowindex: "",
          display: true,
        });
      },
      getprocurementproject(val, row) {
        row.procurementproject = val;
        row.procurementdetails = ' ';
        if (val === 'PJ005001' || val === 'PJ005002' || val === 'PJ005006') {
          row.showrow = true;
          row.showrow1 = false;
          row.showrow2 = false;
          row.showrow3 = false;
        } else if (val === 'PJ005003') {
          row.showrow = false;
          row.showrow1 = true;
          row.showrow2 = false;
          row.showrow3 = false;
        } else if (val === 'PJ005004') {
          row.showrow = false;
          row.showrow1 = false;
          row.showrow2 = true;
          row.showrow3 = false;
        } else if (val === 'PJ005005') {
          row.showrow = false;
          row.showrow1 = false;
          row.showrow2 = false;
          row.showrow3 = true;
        }
      },

      setprocurementdetails(val, row) {
        row.procurementdetails = val;
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
            if (index == 4) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 5) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--'
          }
        });
        this.getMoney(sums);
        this.getforeigncurrency(sums);
        this.getValue(sums);
        return sums;
      },
      getPsummaries(param) {
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
            if (index == 4) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--'
          }
        });
        this.tablePValue = sums;
        return sums;
      },
      getRsummaries(param) {
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
            if (index == 4) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--'
          }
        });
        this.tableRValue = sums;
        return sums;
      },
      getDsummaries(param) {
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
            if (index == 4) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 5) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--'
          }
        });
        return sums;
      },
      getMoney(sums) {
        if (this.form.type === 'PJ001001') {
          this.form.rmbexpenditure = sums[4];
        } else {
          this.form.rmbexpenditure = sums[4] + this.tablePValue[3] + this.tableRValue[3];
        }
      },
      getforeigncurrency(sums) {
        if (this.form.type === 'PJ001001') {
          this.form.foreigncurrency = sums[5];
        } else {
          this.form.foreigncurrency = sums[5] + this.tablePValue[4] + this.tableRValue[4];
        }
      },
      getValue(sums) {
        if (this.form.type === 'PJ001001') {
          this.tableData2[0].creditamount = (sums[4] + sums[5] * this.form.currencyrate);
        } else {
          this.tableData[0].creditamount = (sums[4] + sums[5] * this.form.currencyrate);
          this.tableData[1].creditamount = (this.tablePValue[3] + this.tablePValue[4] * this.form.currencyrate);
          this.tableData[2].creditamount = (this.tableRValue[3] + this.tableRValue[4] * this.form.currencyrate);
        }
      },
      changeRMB(newValue) {
        if (newValue.rmb > 0) {
          newValue.foreigncurrency = "";
          newValue.display = false;
          this.$nextTick(() => {
            newValue.display = true
          })
        }
      },
      changeForeigncurrency(newValue) {
        if (newValue.foreigncurrency > 0) {
          newValue.rmb = "";
          newValue.display = false;
          this.$nextTick(() => {
            newValue.display = true
          })
        }
      },
      // 判断是否IE浏览器
      MyBrowserIsIE() {
        let isIE = false;
        if (
          navigator.userAgent.indexOf("compatible") > -1 &&
          navigator.userAgent.indexOf("MSIE") > -1
        ) {
          // ie浏览器
          isIE = true;
        }
        if (navigator.userAgent.indexOf("Trident") > -1) {
          // edge 浏览器
          isIE = true;
        }
        return isIE;
      },

      //创建a标签下载
      // createDownLoadClick(content, fileName) {
      //   const link = document.createElement("a");
      //   link.href = encodeURI(content);
      //   link.download = fileName;
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      // },

      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      buttonClick(val) {
        if (val === "back") {
          this.$router.push({
            name: 'PFANS1012View',
            params: {}
          })
        }
        if (val === "save") {
          this.$refs["reff"].validate(valid => {
            if (valid) {
              if (this.form.type === 'PJ001001') {
                this.form.subjectnumber = this.tableData2[0].subjectnumber;
                this.form.subjectname = this.tableData2[0].subjectname;
                this.form.remarks = this.tableData2[0].remarks;
              } else {
                this.form.subjectnumber = this.tableData[0].subjectnumber;
                this.form.subjectname = this.tableData[0].subjectname;
                this.form.remarks = this.tableData[0].remarks;
                this.form.purchasesubjectnumber = this.tableData[1].subjectnumber;
                this.form.purchasesubjectname = this.tableData[1].subjectname;
                this.form.purchaseremarks = this.tableData[1].remarks;
                this.form.othersubjectnumber = this.tableData[2].subjectnumber;
                this.form.othersubjectname = this.tableData[2].subjectname;
                this.form.otherremarks = this.tableData[2].remarks;
              }
              this.baseInfo = {};
              this.form.user_id = this.userlist;
              this.form.moneys = Math.round((this.form.rmbexpenditure + this.form.tormb) * 100) / 100;
              this.form.reimbursementdate = moment(this.form.reimbursementdate).format('YYYY-MM-DD');
              this.baseInfo.publicexpense = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.trafficdetails = [];
              this.baseInfo.purchasedetails = [];
              this.baseInfo.otherdetails = [];
              for (let i = 0; i < this.tableT.length; i++) {
                if (this.tableT[i].trafficdate !== "" || this.tableT[i].region !== "" || this.tableT[i].vehicle !== "" || this.tableT[i].startingpoint !== ""
                  || this.tableT[i].rmb > 0 || this.tableT[i].foreigncurrency > 0 || this.tableT[i].annexno !== "") {
                  this.baseInfo.trafficdetails.push(
                    {
                      trafficdetails_id: this.tableT[i].trafficdetails_id,
                      publicexpenseid: this.tableT[i].publicexpenseid,
                      trafficdate: this.tableT[i].trafficdate,
                      region: this.tableT[i].region,
                      vehicle: this.tableT[i].vehicle,
                      startingpoint: this.tableT[i].startingpoint,
                      rmb: this.tableT[i].rmb,
                      foreigncurrency: this.tableT[i].foreigncurrency,
                      annexno: this.tableT[i].annexno,
                    }
                  );
                }
              }
              for (let i = 0; i < this.tableP.length; i++) {
                if (this.tableP[i].purchasedetailsdate !== "" || this.tableP[i].procurementdetails !== "" || this.tableP[i].procurementproject !== ""
                  || this.tableP[i].rmb > 0 || this.tableP[i].foreigncurrency > 0 || this.tableP[i].annexno !== "") {
                  if (this.tableP[i].procurementdetails === ' ') {
                    this.tableP[i].procurementdetails = '';
                  }
                  this.baseInfo.purchasedetails.push(
                    {
                      purchasedetails_id: this.tableP[i].purchasedetails_id,
                      publicexpenseid: this.tableP[i].publicexpenseid,
                      purchasedetailsdate: this.tableP[i].purchasedetailsdate,
                      procurementdetails: this.tableP[i].procurementdetails,
                      procurementproject: this.tableP[i].procurementproject,
                      rmb: this.tableP[i].rmb,
                      foreigncurrency: this.tableP[i].foreigncurrency,
                      annexno: this.tableP[i].annexno,
                    }
                  );
                }
              }
              for (let i = 0; i < this.tableR.length; i++) {
                if (this.tableR[i].otherdetailsdate !== "" || this.tableR[i].costitem !== "" || this.tableR[i].remarks !== ""
                  || this.tableR[i].rmb > 0 || this.tableR[i].foreigncurrency > 0 || this.tableR[i].annexno !== "") {
                  this.baseInfo.otherdetails.push(
                    {
                      otherdetails_id: this.tableR[i].otherdetails_id,
                      publicexpenseid: this.tableR[i].publicexpenseid,
                      otherdetailsdate: this.tableR[i].otherdetailsdate,
                      costitem: this.tableR[i].costitem,
                      remarks: this.tableR[i].remarks,
                      rmb: this.tableR[i].rmb,
                      foreigncurrency: this.tableR[i].foreigncurrency,
                      annexno: this.tableR[i].annexno,
                    }
                  );
                }
              }
              if (this.$route.params._id) {
                this.baseInfo.publicexpense.publicexpenseid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1012Store/update', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    if (val !== "update") {
                      Message({
                        message: this.$t('normal.success_02'),
                        type: 'success',
                        duration: 5 * 1000
                      });
                      this.$router.push({
                        name: 'PFANS1012View',
                      });
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
                this.$store
                  .dispatch('PFANS1012Store/insert', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
                      duration: 5 * 1000
                    });
                    this.$router.push({
                      name: 'PFANS1012View',
                    });
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
          })

        }  else if (val === 'export') {
          // import('@/vendor/Blob').then(csv => {
          //   var tableTdata=this.tableT
          //   let str='';
          //   str +='trafficdate'+','+'region'+','+'vehicle';
          //
          //   str +='\n'+this.tableT[i].trafficdate +','+ this.tableT[i].region +','+ this.tableT[i].vehicle
          //   let exportContent="\uFEFF";
          //   let blob=new Blob([exportContent+str],{
          //     type:"text/plain;charset=utf-8"
          //   });
          //   FileSaver.saveAs(blob,"demo.csv");
          // })
          // this.selectedlist = this.$refs.reff.selectedList;
          //   traffic:{
          //     const tHeader = [this.$t('label.date'), this.$t('label.PFANS1012VIEW_REGION')];
          //     const filterVal = ['trafficdate', 'region'];
          //     const list = this.selectedlist;
          //   }
          //  var maintraffic=data.traffic
          // let maintitle=maintraffic.tHeader;
          //   let mainForkey=maintraffic.fileVal;
          //  let mainList=maintraffic.list;
          //  let mainstr=[];
          //  mainstr.push(maintitle.join("\t,")+"\n");
          //  for(let i=0;i<maintraffic.length;i++){
          //    let temp=[];
          //    for(let j=0;j<mainForkey.length;j++){
          //      temp.push(maintraffic[i][mainForkey[j]]);
          //    }
          //    mainstr.push(temp.join("\t,")+"\n");
          //  }
          // let str='';
          // str +='trafficdate'+','+'region'+','+'vehicle';
          // str +='\n'+this.tableT[i].trafficdate +','+ this.tableT[i].region +','+ this.tableT[i].vehicle
          let heads=[this.$t('label.date'),this.$t('label.PFANS1012VIEW_REGION')];
          let filterVal = ['trafficdate', 'region'];
          let csvData=[];
          var tableTdata=this.tableT;
          for(let i=0;i<tableTdata.length;i++){
            let obj=tableTdata[i];
            csvData.push({
              [heads[0]]:obj.trafficdate,
              [heads[1]]:obj.region,
            })
          }
           const url='data:text/csv;charset=utf-8,\ufeff'+encodeURIComponent(csvData)
            let link=document.createElement('a')
          link.href=url;
           link.download='demo.csv';
           document.body.appendChild(link);
           link.click();
        }
      },
  }
  }
</script>
<style rel="stylesheet/scss" lang="scss">

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
