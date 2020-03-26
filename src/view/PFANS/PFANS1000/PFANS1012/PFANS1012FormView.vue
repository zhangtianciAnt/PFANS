<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title"
                         @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1012VIEW_SUMMONS')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.center')">
                      <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                      <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.group')">
                      <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                      <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.team')">
                      <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                      <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_TELEPHONE')" prop="telephone">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_REIMBURSEMENTDATE')" prop="application_date">
                      <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.reimbursementdate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
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
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5004VIEW_PROJECTNAMW')">
                        <el-select v-model="form.project_id" :disabled="!disable" style="width: 20vw" clearable>
                          <el-option
                            v-for="item in optionsdate"
                            :key="item.value"
                            :label="item.lable"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.judgement')" v-if="show7">
                      <el-input :disabled="true" style="width:20vw" v-model="form.judgement_name">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_RMBEXPENDITURE')" prop="rmbexpenditure">
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
                </el-row>
                <el-row>
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
                    <el-form-item :error="errorsuppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                  prop="suppliername" v-show="show1">
                      <div class="dpSupIndex" style="width: 20vw" prop="suppliername">
                        <el-container>
                          <input class="content bg" v-model="form.suppliername" :error="errorsuppliername"
                                 :disabled="true">
                          <el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible = true"
                                     size="small"></el-button>
                          <el-dialog :title="$t('title.PFANS6003VIEW')" :visible.sync="dialogTableVisible" center
                                     size="50%"
                                     top="8vh" lock-scroll
                                     append-to-body>
                            <div style="text-align: center">
                              <el-row style="text-align: center;height: 90%;overflow: hidden">
                                <el-table
                                  :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                                  height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                  @row-click="handleClickChange">
                                  <el-table-column property="suppliername"
                                                   :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeename"
                                                   :label="$t('label.PFANS1012VIEW_PAYEENAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="vendornum"
                                                   :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')"
                                                   width="100"></el-table-column>
                                  <el-table-column property="payeebankaccountnumber"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeebankaccount"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')"
                                                   width="150"></el-table-column>
                                  <el-table-column
                                    align="right" width="230">
                                    <template slot="header" slot-scope="scope">
                                      <el-input
                                        v-model="search"
                                        size="mini"
                                        :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME')"/>
                                    </template>
                                  </el-table-column>
                                </el-table>
                              </el-row>
                              <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
                        </span>
                            </div>
                          </el-dialog>
                        </el-container>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEENAME')" v-show="show1" prop="payeename">
                      <el-input :disabled="true" maxlength="20" style="width:20vw"
                                v-model="form.payeename"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')" v-show="show1" prop="payeecode">
                      <el-input :disabled="true" maxlength="20" style="width:20vw" type="email"
                                v-model="form.payeecode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')" v-show="show1"
                                  prop="payeebankaccountnumber">
                      <el-input :disabled="true" maxlength="20" style="width:20vw"
                                v-model="form.payeebankaccountnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')" v-show="show1"
                                  prop="payeebankaccount">
                      <el-input :disabled="true" maxlength="20" style="width:20vw"
                                v-model="form.payeebankaccount"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PERSONALCODE')" v-show="show2" prop="code">
                      <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.code"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="errorsuppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                  prop="suppliername" v-show="show3">
                      <div class="dpSupIndex" style="width: 20vw" prop="suppliername">
                        <el-container>
                          <input class="content bg" v-model="form.suppliername" :error="errorsuppliername"
                                 :disabled="true"></input>
                          <el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible = true"
                                     size="small"></el-button>
                          <el-dialog :title="$t('title.PFANS6003VIEW')" :visible.sync="dialogTableVisible" center
                                     size="50%"
                                     top="8vh" lock-scroll
                                     append-to-body>
                            <div style="text-align: center">
                              <el-row style="text-align: center;height: 90%;overflow: hidden">
                                <el-table
                                  :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                                  height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                  @row-click="handleClickChange">
                                  <el-table-column property="suppliername"
                                                   :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeename"
                                                   :label="$t('label.PFANS1012VIEW_PAYEENAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="vendornum"
                                                   :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')"
                                                   width="100"></el-table-column>
                                  <el-table-column property="payeebankaccountnumber"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeebankaccount"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')"
                                                   width="150"></el-table-column>
                                  <el-table-column
                                    align="right" width="230">
                                    <template slot="header" slot-scope="scope">
                                      <el-input
                                        v-model="search"
                                        size="mini"
                                        :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME')"/>
                                    </template>
                                  </el-table-column>
                                </el-table>
                              </el-row>
                              <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
                        </span>
                            </div>
                          </el-dialog>
                        </el-container>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEENAME')" v-show="show3" prop="payeecode">
                      <el-input :disabled="true" maxlength="20" style="width:20vw"
                                v-model="form.payeename"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')" v-show="show3" prop="payeecode">
                      <el-input :disabled="true" maxlength="20" style="width:20vw"
                                v-model="form.payeecode"></el-input>
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
                    <el-form-item :error="errorsuppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                  prop="suppliername" v-show="show5">
                      <div class="dpSupIndex" style="width: 20vw" prop="suppliername">
                        <el-container>
                          <input class="content bg" v-model="form.suppliername" :error="errorsuppliername"
                                 :disabled="true"></input>
                          <el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible = true"
                                     size="small"></el-button>
                          <el-dialog :title="$t('title.PFANS6003VIEW')"
                                     :visible.sync="dialogTableVisible"
                                     center size="50%"
                                     top="8vh" lock-scroll
                                     append-to-body>
                            <div style="text-align: center">
                              <el-row style="text-align: center;height: 90%;overflow: hidden">
                                <el-table
                                  :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                                  height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                  @row-click="handleClickChange">
                                  <el-table-column property="suppliername"
                                                   :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeename"
                                                   :label="$t('label.PFANS1012VIEW_PAYEENAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="vendornum"
                                                   :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')"
                                                   width="100"></el-table-column>
                                  <el-table-column property="payeebankaccountnumber"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeebankaccount"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')"
                                                   width="150"></el-table-column>
                                  <el-table-column
                                    align="right" width="230">
                                    <template slot="header" slot-scope="scope">
                                      <el-input
                                        v-model="search"
                                        size="mini"
                                        :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME')"/>
                                    </template>
                                  </el-table-column>
                                </el-table>
                              </el-row>
                              <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
                        </span>
                            </div>
                          </el-dialog>
                        </el-container>
                      </div>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_COMPANYNAME')" v-show="show5" prop="fullname">
                      <el-input :disabled="!disable" maxlength="20"
                                style="width:20vw" v-model="form.fullname"></el-input>
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
                  <el-form-item :label="$t('label.PFANS1012FORMVIEW_INVOICEI')">
                    <el-table :data="tableF"
                              header-cell-class-name="sub_bg_color_blue" stripe border style="width: 70vw">
                      <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-input :disabled="true" style="width: 100%" v-model="scope.row.invoicenumber">
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICET')" align="center" width="200">
                        <template slot-scope="scope">
                          <dicselect :code="code9"
                                     :data="scope.row.invoicetype"
                                     :disabled="!disable"
                                     :multiple="multiple"
                                     :no="scope.row"
                                     @change="getPaymentinvoicetype"
                                     style="width: 100%">
                          </dicselect>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEM')" align="center" width="150">
                        <template slot-scope="scope">
                          <el-input-number :min="0" :precision="2" :max="9999999" :disabled="!disable"
                                           controls-position="right" :no="scope.row" @change="changeSum(scope.row)"
                                           :step="1" v-model="scope.row.invoiceamount" style="width: 100%">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXRATE')" align="center" width="240">
                        <template slot-scope="scope">
                          <dicselect :code="code13"
                                     :data="scope.row.taxrate"
                                     :disabled="!disable"
                                     :no="scope.row"
                                     @change="getrate"
                                     style="width: 100%">
                          </dicselect>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1012FORMVIEW_EXCLUDINGTAX')" align="center" width="150"
                                       prop="debitamount">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disable"
                            :min="0" :precision="2"
                            :max="9999999"
                            controls-position="right"
                            :no="scope.row"
                            :step="1"
                            v-model="scope.row.excludingtax"
                            @change="changeSum(scope.row)"
                            style="width: 100%">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1012FORMVIEW_FACETAX')" align="center" width="150"
                                       prop="creditamount">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :min="0" :precision="2"
                            :max="9999999"
                            controls-position="right"
                            :no="scope.row"
                            :step="1"
                            v-model="scope.row.facetax"
                            @change="changeSum(scope.row)"
                            style="width: 100%">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRow7(scope.$index, tableF)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRow7()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1012FORMVIEW_CHARGED')" name="second">
              <el-collapse>
                <el-collapse-item v-if="show9">
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANS1012VIEW_TRAFFIC')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table :data="tableT" :summary-method="getTsummaries"
                                header-cell-class-name="sub_bg_color_blue"
                                show-summary stripe border style="width: 70vw">
                        <el-table-column :label="$t('label.date')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-date-picker :disabled="!disable" style="width: 100%"
                                            v-model="scope.row.trafficdate"></el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-select style="width: 100%" v-model="scope.row.invoicenumber" clearable
                                       :disabled="!disable">
                              <el-option
                                v-for="item in optionsdata"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_DEPARTMENT')" align="center" width="200">
                          <template slot-scope="scope">
                            <org :orglist="scope.row.departmentname"
                                 orgtype="2"
                                 :disabled="!disable"
                                 :error="errorgroup"
                                 style="width: 100%"
                                 :no="scope.row"
                                 @getOrgids="getGroupId"></org>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">
                            </el-input>
                          </template>
                        </el-table-column>

                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_PL')" align="center" width="150">
                          <template slot-scope="scope">
                            <dicselect :code="code12"
                                       :disabled="!disable"
                                       :data="scope.row.plsummary"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getplsummary" style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250">
                          <template slot-scope="scope">
                            <dicselect :code="code16"
                                       :disabled="!disable"
                                       :data="scope.row.accountcode"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getcode" style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNTB')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.subjectnumber">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_REGION')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" style="width: 100%" maxlength="20"
                                      v-model="scope.row.region">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_VEHICLE')" align="center" width="150">
                          <template slot-scope="scope">
                            <dicselect :code="code14"
                                       :data="scope.row.vehicle"
                                       :disabled="!disable"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getvehicle" style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_STARTINGPOINT')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-tooltip class="item" effect="light" :content="scope.row.startingpoint" placement="top"
                                        :disabled="scope.row.startingpoint===''?true:false">
                              <el-input :disabled="!disable" style="width: 100%" maxlength="20"
                                        v-model="scope.row.startingpoint"/>
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
                        <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center"
                                         prop="foreigncurrency"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="disablecheck"
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
                        <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCY')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <dicselect :code="code4"
                                       clearable
                                       :data="scope.row.currency"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       :disabled="disa"
                                       @change="getCurrency"
                                       style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCYRATE')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disablecurr"
                              :max="999999"
                              :min="0"
                              :precision="3"
                              :step="0.01"
                              @change="getCurrencyrate(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.currencyrate"
                            ></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_TORMB')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :max="1000000000"
                              :min="0"
                              :precision="2"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.tormb"
                            ></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :precision="2"
                              controls-position="right"
                              style="width: 100%"
                              @change="changeRMB(scope.row)"
                              v-model="scope.row.taxes">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" v-model="scope.row.annexno">
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
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
              <el-collapse>
                <el-collapse-item v-if="show6">
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANS1012VIEW_PURCHASE')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table :data="tableP" :summary-method="getPsummaries"
                                header-cell-class-name="sub_bg_color_blue"
                                show-summary stripe border style="width: 70vw">
                        <el-table-column :label="$t('label.date')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-date-picker :disabled="!disable" style="width: 100%"
                                            v-model="scope.row.purchasedetailsdate">
                            </el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-select style="width: 100%" v-model="scope.row.invoicenumber" clearable
                                       :disabled="!disable">
                              <el-option
                                v-for="item in optionsdata"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_DEPARTMENT')" align="center" width="200">
                          <template slot-scope="scope">
                            <org :orglist="scope.row.departmentname"
                                 orgtype="2"
                                 :disabled="!disable"
                                 :error="errorgroup"
                                 style="width: 100%"
                                 :no="scope.row"
                                 @getOrgids="getGroupId"></org>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_PL')" align="center" width="150">
                          <template slot-scope="scope">
                            <dicselect :code="code12"
                                       :disabled="!disable"
                                       :data="scope.row.plsummary"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getplsummary" style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250">
                          <template slot-scope="scope">
                            <dicselect :code="code16"
                                       :disabled="!disable"
                                       :data="scope.row.accountcode"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getcode" style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_PROCUREMENTDETAILS')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" style="width: 100%"
                                      maxlength="20"
                                      v-model="scope.row.procurementdetails"
                            >
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNTB')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.subjectnumber">
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
                        <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center"
                                         prop="foreigncurrency"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="disablecheck"
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
                        <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCY')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <dicselect :code="code4"
                                       clearable
                                       :data="scope.row.currency"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       :disabled="disa"
                                       @change="getCurrency"
                                       style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCYRATE')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disablecurr"
                              :max="999999"
                              :min="0"
                              :precision="3"
                              :step="0.01"
                              @change="getCurrencyrate(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.currencyrate"
                            ></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_TORMB')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :max="1000000000"
                              :min="0"
                              :precision="2"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.tormb"
                            ></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :precision="2"
                              controls-position="right"
                              style="width: 100%"
                              @change="changeRMB(scope.row)"
                              v-model="scope.row.taxes">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" v-model="scope.row.annexno">
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
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
              <el-collapse>
                <el-collapse-item v-if="show6">
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANS1012VIEW_OTHER')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table :data="tableR" :summary-method="getRsummaries" ref="tableR"
                                header-cell-class-name="sub_bg_color_blue"
                                show-summary stripe border style="width: 70vw">
                        <el-table-column :label="$t('label.date')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-date-picker :disabled="!disable" style="width: 100%"
                                            v-model="scope.row.otherdetailsdate">
                            </el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-select style="width: 100%" v-model="scope.row.invoicenumber" clearable
                                       :disabled="!disable">
                              <el-option
                                v-for="item in optionsdata"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_DEPARTMENT')" align="center" width="200">
                          <template slot-scope="scope">
                            <org :orglist="scope.row.departmentname"
                                 :disabled="!disable"
                                 orgtype="2"
                                 :error="errorgroup"
                                 style="width: 100%"
                                 :no="scope.row"
                                 @getOrgids="getGroupId"></org>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_PL')" align="center" width="150">
                          <template slot-scope="scope">
                            <dicselect :code="code12"
                                       :disabled="!disable"
                                       :data="scope.row.plsummary"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getplsummary" style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250"
                        >
                          <template slot-scope="scope">
                            <dicselect :code="code16"
                                       :disabled="!disable"
                                       :data="scope.row.accountcode"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getcode" style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNTB')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.subjectnumber">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_FWTIME')" align="center" width="150"  v-if="checktime">
                          <template slot-scope="scope">
                            <el-date-picker :disabled="!disable" style="width: 100%"
                                            v-model="scope.row.servicehours"  @change="clickdata(scope.row)"></el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_ABSTRACT')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" style="width: 100%" maxlength="20"
                                      v-model="scope.row.remarks">
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
                        <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center"
                                         prop="foreigncurrency"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="disablecheck"
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
                        <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCY')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <dicselect :code="code4"
                                       :data="scope.row.currency"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       :disabled="disa"
                                       @change="getCurrency"
                                       style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCYRATE')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disablecurr"
                              :max="999999"
                              :min="0"
                              :precision="3"
                              :step="0.01"
                              @change="getCurrencyrate(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.currencyrate"
                            ></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_TORMB')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :max="1000000000"
                              :min="0"
                              :precision="2"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.tormb"
                            ></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center"
                                         width="150
">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :precision="2"
                              controls-position="right"
                              style="width: 100%"
                              @change="changeRMB(scope.row)"
                              v-model="scope.row.taxes">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="100">
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
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import user from '../../../components/user.vue';
    import dicselect from '../../../components/dicselect';
    import {getDictionaryInfo, getOrgInfo, getOrgInfoByUserId, getUserInfo} from '@/utils/customize';
    import {Message} from 'element-ui';
    import moment from 'moment';
    import json2csv from 'json2csv';
    import org from '../../../components/org';

    export default {
        name: 'PFANS1012FormView',
        components: {
            dicselect,
            EasyNormalContainer,
            getOrgInfoByUserId,
            user,
            org,
        },
        data() {
            var checkuser = (rule, value, callback) => {
                if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === 'undefined') {
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                } else {
                    this.error = '';
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
                checkCode1: '',
                checkcode: '',
                checktime: false,
                centerid: '',
                groupid: '',
                groupId: '',
                teamid: '',
                disablecheck: false,
                optionsdate: [{value: 'PP024001', lable: this.$t('label.PFANS5008FORMVIEW_PROJECTGTXM')}],
                tormbT: '',
                Redirict: '' ,
                search: '',
                companyen: '',
                taxrateValue: '',
                invoiceamountsum: '',
                tableTValue: '',
                tablePValue: '',
                tableRValue: '',
                errorsuppliername: '',
                disa: true,
                error: '',
                gridData: [],
                dialogTableVisible: false,
                selectedlist: [],
                options: [],
                jude: [],
                selectType: 'Single',
                title: 'title.PFANS1012VIEW',
                userlist: '',
                activeName: 'first',
                disablde: true,
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
                ],
                checkCode2: '',
                budgetcodingcheck: '',
                tableT: [{
                    publicexpenseid: '',
                    trafficdetails_id: '',
                    trafficdate: '',
                    invoicenumber: '',
                    currency: '',
                    currencyrate: '',
                    tormb: '',
                    plsummary: '',
                    taxes: '',
                    departmentname: '',
                    budgetcoding: '',
                    subjectnumber: '',
                    region: '',
                    accountcode: '',
                    vehicle: '',
                    startingpoint: '',
                    rmb: '',
                    foreigncurrency: '',
                    annexno: '',
                    rowindex: '',
                    display: true,
                }],
                tableF: [{
                    invoice_id: '',
                    publicexpenseid: '',
                    invoicenumber: '1',
                    invoicetype: '',
                    invoiceamount: '',
                    taxrate: '',
                    excludingtax: '',
                    facetax: '',
                }],
                tableP: [{
                    publicexpenseid: '',
                    purchasedetails_id: '',
                    invoicenumber: '',
                    taxes: '',
                    departmentname: '',
                    budgetcoding:'',
                    purchasedetailsdate: '',
                    plsummary: '',
                    procurementdetails: '',
                    currency: '',
                    currencyrate: '',
                    tormb: '',
                    subjectnumber: '',
                    rmb: '',
                    accountcode: '',
                    foreigncurrency: '',
                    annexno: '',
                    rowindex: '',
                    showrow: true,
                    showrow1: false,
                    showrow2: false,
                    showrow3: false,
                    display: true,
                }],
                tableR: [{
                    publicexpenseid: '',
                    otherdetails_id: '',
                    otherdetailsdate: '',
                    invoicenumber: '',
                    costitem: '',
                    plsummary: '',
                    servicehours: '',
                    departmentname: '',
                    accountcode: '',
                    subjectnumber: '',
                    currency: '',
                    currencyrate: '',
                    tormb: '',
                    remarks: '',
                    budgetcoding: '',
                    rmb: '',
                    foreigncurrency: '',
                    taxes: '',
                    annexno: '',
                    rowindex: '',
                    display: true,
                }],
                baseInfo: {},
                form: {
                    project_id: '',
                    centerid: '',
                    groupid: '',
                    teamid: '',
                    user_id: '',
                    telephone: '',
                    moduleid: '',
                    accountnumber: '',
                    reimbursementdate: moment(new Date()).format('YYYY-MM-DD'),
                    moneys: '',
                    foreigncurrency: '',
                    rmbexpenditure: '',
                    tormb: '',
                    remark: '',
                    paymentmethod: '',
                    payeename: '',
                    payeecode: '',
                    payeebankaccountnumber: '',
                    payeebankaccount: '',
                    code:'',
                    type: '',
                    judgement: '',
                    judgement_name: '',
                    receivables: '',
                    loan: '',
                    fullname: '',
                    subjectnumber: '',
                    subjectname: '',
                    remarks: '',
                    purchasesubjectnumber: '',
                    purchasesubjectname: '',
                    purchaseremarks: '',
                    othersubjectnumber: '',
                    othersubjectname: '',
                    otherremarks: '',
                    suppliername: '',
                },
                rules: {
                    user_id: [{
                        required: true,
                        validator: checkuser,
                        trigger: 'change',
                    }],
                    telephone: [{
                        validator: checktele,
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
                IDname: '',
                code2: 'PJ002',
                code3: 'PJ004',
                code4: 'PG019',
                code5: 'PJ005',
                code9: 'PJ068',
                code10: 'PJ057',
                code11: '',
                code12: 'PJ111',
                code13: 'PJ071',
                code14: 'PJ083',
                code16: '',
                invoicenumber: '',
                errorgroup: '',
                orglist: '',
                optionsdata: [{value: this.$t('label.PFANS1012FORMVIEW_NOMONEY'), lable: ''}],
                multiple: false,
                show1: false,
                show2: false,
                show3: false,
                show4: false,
                show5: false,
                show6: false,
                show7: false,
                show9: false,
                show: false,
                showrow: true,
                showrow1: false,
                showrow2: false,
                showrow3: false,
                showdoll: false,
                showjpy: false,
                showother: false,
                canStart: false,
            };
        },
        mounted() {
            this.getsupplierinfor();
            this.getCompanyProjectList();
            this.checkoptionsdata();
            this.IDname = this.$route.params._id
            if (this.IDname) {
                this.disablecheck = true;
                this.loading = true;
                this.$store
                    .dispatch('PFANS1012Store/selectById', {'publicexpenseid': this.$route.params._id})
                    .then(response => {
                        this.form = response.publicexpense;
                        let rst = getOrgInfoByUserId(response.publicexpense.user_id);
                        if(rst){
                            this.centerid = rst.centerNmae;
                            this.groupid= rst.groupNmae;
                            this.teamid= rst.teamNmae;
                        }
                        if (response.invoice.length > 0) {
                            this.tableF = response.invoice;
                            this.checkoptionsdata()
                        }
                        if (response.trafficdetails.length > 0) {
                            this.tableT = response.trafficdetails;
                            for (var i = 0; i < this.tableT.length; i++) {
                                this.code16 = '';
                                if(this.tableT[i].foreigncurrency > 0){
                                    this.disa = false;
                                    this.disablecheck = false;
                                }
                                this.orglist = this.tableT[i].departmentname;
                                if (this.Redirict == '0') {
                                    if (this.tableT[i].plsummary == 'PJ111001') {
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        this.code16 = 'PJ112';
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111002') {
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        this.code16 = 'PJ113';
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111003') {
                                        this.code16 = 'PJ114';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111004') {
                                        this.code16 = '';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111005') {
                                        this.code16 = 'PJ116';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111006') {
                                        this.code16 = 'PJ117';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111007') {
                                        this.code16 = 'PJ118';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111008') {
                                        this.code16 = 'PJ119';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111009') {
                                        this.code16 = 'PJ120';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111010') {
                                        this.code16 = 'PJ121';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111011') {
                                        this.code16 = 'PJ122';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111012') {
                                        this.code16 = 'PJ123';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111013') {
                                        this.code16 = '';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111014') {
                                        this.code16 = 'PJ125';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    }
                                } else if (this.Redirict == '1') {
                                    if (this.tableT[i].plsummary == 'PJ111001') {
                                        this.code16 = 'PJ127';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111002') {
                                        this.code16 = 'PJ128';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111003') {
                                        this.code16 = 'PJ129';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111004') {
                                        this.code16 = 'PJ115';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111005') {
                                        this.code16 = 'PJ130';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111006') {
                                        this.code16 = '';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111007') {
                                        this.code16 = 'PJ131';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111008') {
                                        this.code16 = 'PJ132';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111009') {
                                        this.code16 = 'PJ133';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111010') {
                                        this.code16 = 'PJ134';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111011') {
                                        this.code16 = 'PJ135';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111012') {
                                        this.code16 = 'PJ136';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111013') {
                                        this.code16 = 'PJ124';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableT[i].plsummary === 'PJ111014') {
                                        this.code16 = 'PJ137';
                                        let letErrortype = getDictionaryInfo(this.tableT[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableT[i].accountcode = letErrortype.code;
                                        }
                                    }
                                }
                            }
                        }
                        if (response.purchasedetails.length > 0) {
                            this.tableP = response.purchasedetails;
                            for (var i = 0; i < response.purchasedetails.length; i++) {
                                this.code16 = '';
                                this.orglist = this.tableP[i].departmentname;
                                if(this.tableP[i].foreigncurrency > 0){
                                    this.disa = false;
                                    this.disablecheck = false;
                                }
                                if (this.Redirict == '0') {
                                    if (this.tableP[i].plsummary == 'PJ111001') {
                                        this.code16 = 'PJ112';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111002') {
                                        this.code16 = 'PJ113';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111003') {
                                        this.code16 = 'PJ114';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111004') {
                                        this.code16 = '';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111005') {
                                        this.code16 = 'PJ116';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111006') {
                                        this.code16 = 'PJ117';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111007') {
                                        this.code16 = 'PJ118';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111008') {
                                        this.code16 = 'PJ119';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111009') {
                                        this.code16 = 'PJ120';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111010') {
                                        this.code16 = 'PJ121';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111011') {
                                        this.code16 = 'PJ122';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111012') {
                                        this.code16 = 'PJ123';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111013') {
                                        this.code16 = '';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111014') {
                                        this.code16 = 'PJ125';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    }
                                } else if (this.Redirict == '1') {
                                    if (this.tableP[i].plsummary == 'PJ111001') {
                                        this.code16 = 'PJ127';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111002') {
                                        this.code16 = 'PJ128';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111003') {
                                        this.code16 = 'PJ129';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111004') {
                                        this.code16 = 'PJ115';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111005') {
                                        this.code16 = 'PJ130';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111006') {
                                        this.code16 = '';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111007') {
                                        this.code16 = 'PJ131';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111008') {
                                        this.code16 = 'PJ132';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111009') {
                                        this.code16 = 'PJ133';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111010') {
                                        this.code16 = 'PJ134';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111011') {
                                        this.code16 = 'PJ135';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111012') {
                                        this.code16 = 'PJ136';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111013') {
                                        this.code16 = 'PJ124';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    } else if (this.tableP[i].plsummary === 'PJ111014') {
                                        this.code16 = 'PJ137';
                                        let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                                        if (letErrortype != null) {
                                            this.tableP[i].accountcode = letErrortype.code;
                                        }
                                    }
                                }
                            }
                            if (response.otherdetails.length > 0) {
                                this.tableR = response.otherdetails;
                                for (let i = 0; i < this.tableR.length; i++) {
                                    this.code16 = '';
                                    this.orglist = this.tableR[i].departmentname;
                                    if(this.tableR[i].foreigncurrency > 0){
                                        this.disa = false;
                                        this.disablecheck = false;
                                    }
                                    if (this.Redirict == '0') {
                                        if (this.tableR[i].plsummary == 'PJ111001') {
                                            this.code16 = 'PJ112';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111002') {
                                            this.code16 = 'PJ113';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111003') {
                                            this.code16 = 'PJ114';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111004') {
                                            this.code16 = '';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111005') {
                                            this.code16 = 'PJ116';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111006') {
                                            this.code16 = 'PJ117';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111007') {
                                            this.code16 = 'PJ118';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111008') {
                                            this.code16 = 'PJ119';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111009') {
                                            this.code16 = 'PJ120';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111010') {
                                            this.code16 = 'PJ121';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111011') {
                                            this.code16 = 'PJ122';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111012') {
                                            this.code16 = 'PJ123';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111013') {
                                            this.code16 = '';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111014') {
                                            this.code16 = 'PJ125';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        }
                                    } else if (this.Redirict == '1') {
                                        if (this.tableR[i].plsummary == 'PJ111001') {
                                            this.code16 = 'PJ127';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111002') {
                                            this.code16 = 'PJ128';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111003') {
                                            this.code16 = 'PJ129';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111004') {
                                            this.code16 = 'PJ115';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111005') {
                                            this.code16 = 'PJ130';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111006') {
                                            this.code16 = '';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111007') {
                                            this.code16 = 'PJ131';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111008') {
                                            this.code16 = 'PJ132';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111009') {
                                            this.code16 = 'PJ133';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111010') {
                                            this.code16 = 'PJ134';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111011') {
                                            this.code16 = 'PJ135';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111012') {
                                            this.code16 = 'PJ136';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111013') {
                                            this.code16 = 'PJ124';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        } else if (this.tableR[i].plsummary === 'PJ111014') {
                                            this.code16 = 'PJ137';
                                            let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                                            if (letErrortype != null) {
                                                this.tableR[i].accountcode = letErrortype.code;
                                            }
                                        }
                                    }
                                    if(this.tableR[i].subjectnumber == '0504-00-0000'){
                                        this.checktime = true;
                                    }
                                }
                            }
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
                            this.show9 = true;
                            this.show6 = false;
                            this.show7 = false;
                        } else if (this.form.type === 'PJ001002') {
                            this.show9 = false;
                            this.show6 = true;
                            this.show7 = true;
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
            } else {

                if(getUserInfo(this.$store.getters.userinfo.userid)){
                    this.form.code = getUserInfo(this.$store.getters.userinfo.userid).userinfo.personalcode;
                }
                if(getOrgInfoByUserId(this.$store.getters.userinfo.userid)){
                    this.groupId = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
                    this.tableT[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
                    this.tableP[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
                    this.tableR[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
                    if(getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)){
                        this.budgetcodingcheck = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
                        this.tableT[0].budgetcoding = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
                        this.tableP[0].budgetcoding = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
                        this.tableR[0].budgetcoding = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
                        this.Redirict = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).redirict;
                    }
                }
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                    let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    if(rst) {
                        this.centerid = rst.centerNmae;
                        this.groupid= rst.groupNmae;
                        this.teamid= rst.teamNmae;
                        this.form.centerid = rst.centerId;
                        this.form.groupid = rst.groupId;
                        this.form.teamid = rst.teamId;
                    }
                    this.form.user_id = this.$store.getters.userinfo.userid;
                }
                this.jude = this.$route.params._name;
                for (var i = 0; i < this.jude.length; i++) {
                    this.form.judgement += this.jude[i][0].value + ',';
                    this.form.judgement_name += this.jude[i][0].label + ',';
                }

                this.form.judgement = this.form.judgement.substring(0, this.form.judgement.length - 1);
                this.form.judgement_name = this.form.judgement_name.substring(0, this.form.judgement_name.length - 1);
                this.form.type = this.$route.params._type;
                if (this.form.type === 'PJ001001') {
                    this.show9 = true;
                    this.show6 = false;
                    this.show7 = false;
                } else if (this.form.type === 'PJ001002') {
                    this.show9 = false;
                    this.show6 = true;
                    this.show7 = true;
                }
            }
            this.$store
                .dispatch('PFANS1012Store/getLoanApplication', {user_id: this.$store.getters.userinfo.userid})
                .then(response => {
                    for (let i = 0; i < response.length; i++) {
                        var vote = {};
                        vote.value = response[i].loanapplication_id;
                        vote.label = moment(response[i].application_date).format('YYYY-MM-DD');
                        this.options.push(vote);
                    }
                });
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
                },
            },
        },
        methods: {
            checkoptionsdata() {
                this.optionsdata = [{value: this.$t('label.PFANS1012FORMVIEW_NOMONEY'), lable: ''}];
                for (var i = 0; i < this.tableF.length; i++) {
                    var vote = {};
                    vote.value = this.tableF[i].invoicenumber,
                        vote.lable = this.tableF[i].invoicenumber,
                        this.optionsdata.push(vote);
                }
            },
            getvehicle(val, row) {
                row.vehicle = val;
            },
            getCompanyProjectList() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS5008Store/getCompanyProjectList', {})
                    .then(response => {

                        for (let i = 0; i < response.length; i++) {
                            if (response[i].status == '4' || response[i].status == '6' || response[i].status == '7') {
                                this.optionsdate.push({
                                    value: response[i].companyprojects_id,
                                    lable: response[i].project_name,
                                });
                            }
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
            },
            getGroupId(orglist, row,) {
                if(orglist==''){
                    row.budgetcoding = '';
                }
                this.Redirict = '',
                    row.departmentname = orglist;
                let group = getOrgInfo(orglist);
                if (group) {
                    this.companyen = group.companyen;
                    this.Redirict = group.redirict;
                    row.budgetcoding = group.encoding;
                }

                this.budgetcodingcheck =  row.budgetcoding
            },
            getplsummary(val, row) {
                row.accountcode = '',
                    row.plsummary = val;
                if (this.Redirict == '0') {
                    if (val == 'PJ111001') {
                        row.accountcode = '',
                            this.code16 = 'PJ112';
                    } else if (val == 'PJ111002') {
                        row.accountcode = '',
                            this.code16 = 'PJ113';
                    } else if (val == 'PJ111003') {
                        row.accountcode = '',
                            this.code16 = 'PJ114';
                    } else if (val == 'PJ111004') {
                        row.accountcode = '',
                            this.code16 = '';
                    } else if (val == 'PJ111005') {
                        row.accountcode = '',
                            this.code16 = 'PJ116';
                    } else if (val == 'PJ111006') {
                        row.accountcode = '',
                            this.code16 = 'PJ117';
                    } else if (val == 'PJ111007') {
                        row.accountcode = '',
                            this.code16 = 'PJ118';
                    } else if (val == 'PJ111008') {
                        row.accountcode = '',
                            this.code16 = 'PJ119';
                    } else if (val == 'PJ111009') {
                        row.accountcode = '',
                            this.code16 = 'PJ120';
                    } else if (val == 'PJ111010') {
                        row.accountcode = '',
                            this.code16 = 'PJ121';
                    } else if (val == 'PJ111011') {
                        row.accountcode = '',
                            this.code16 = 'PJ122';
                    } else if (val == 'PJ111012') {
                        row.accountcode = '',
                            this.code16 = 'PJ123';
                    } else if (val == 'PJ111013') {
                        row.accountcode = '',
                            this.code16 = '';
                    } else if (val == 'PJ111014') {
                        row.accountcode = '',
                            this.code16 = 'PJ125';
                    }
                } else if (this.Redirict == '1') {
                    if (val == 'PJ111001') {
                        row.accountcode = '',
                            this.code16 = 'PJ127';
                    } else if (val == 'PJ111002') {
                        row.accountcode = '',
                            this.code16 = 'PJ128';
                    } else if (val == 'PJ111003') {
                        row.accountcode = '',
                            this.code16 = 'PJ129';
                    } else if (val == 'PJ111004') {
                        row.accountcode = '',
                            this.code16 = 'PJ115';
                    } else if (val == 'PJ111005') {
                        row.accountcode = '',
                            this.code16 = 'PJ130';
                    } else if (val == 'PJ111006') {
                        row.accountcode = '',
                            this.code16 = '';
                    } else if (val == 'PJ111007') {
                        row.accountcode = '',
                            this.code16 = 'PJ131';
                    } else if (val == 'PJ111008') {
                        row.accountcode = '',
                            this.code16 = 'PJ132';
                    } else if (val == 'PJ111009') {
                        row.accountcode = '',
                            this.code16 = 'PJ133';
                    } else if (val == 'PJ111010') {
                        row.accountcode = '',
                            this.code16 = 'PJ134';
                    } else if (val == 'PJ111011') {
                        row.accountcode = '',
                            this.code16 = 'PJ135';
                    } else if (val == 'PJ111012') {
                        row.accountcode = '',
                            this.code16 = 'PJ136';
                    } else if (val == 'PJ111013') {
                        row.accountcode = '',
                            this.code16 = 'PJ124';
                    } else if (val == 'PJ111014') {
                        row.accountcode = '',
                            this.code16 = 'PJ137';
                    }
                }

            },
            clickdata(row){
                if(row.servicehours == null){
                    row.budgetcoding = this.budgetcodingcheck;
                    row.subjectnumber = this.checkCode2;
                }else{
                    this.budgetcodingcheck =  row.budgetcoding;
                    row.subjectnumber = this.checkcode;
                    row.budgetcoding = '000000';
                }
            },
            getcode(val, row) {
                row.accountcode = val;
                let dic = getDictionaryInfo(val);
                if (dic) {
                    row.subjectnumber = dic.value2;
                    this.checkCode2 =  dic.value2
                    this.checkCode1 = dic.value3
                    if(dic.value3 == 1){
                        this.checktime = true;
                        this.checkcode = dic.value4
                    }

                }
            },
            getrate(val, row) {
                row.taxrate = val;
            },
            getPaymentinvoicetype(val, row) {
                row.excludingtax = '';
                row.facetax = '';
                row.invoicetype = val;
                row.taxrate = ' ';
            },
            changeSum(row) {
                if (row.taxrate == '') {
                    row.facetax = '';
                } else {
                    row.facetax = row.invoiceamount - row.excludingtax;
                }
                for (let j = 0; j < this.tableF.length; j++) {
                 if(this.tableF[j].invoiceamount!=0){
                     this.form.tormb = '';
                     this.disablecheck =true;
                     break
                 }else{
                     this.disablecheck =false;
                     continue
                 }

                }
                for(let j = 0; j < this.tableT.length; j++){
                    this.tableT[j].foreigncurrency = '';
                    this.tableT[j].currencyrate = '';
                    this.tableT[j].tormb = '';
                    this.tableT[j].currency = '';
                    this.form.tormb = '';
                    this.disa = true;
                }
                for(let j = 0; j < this.tableP.length; j++){
                    this.tableP[j].foreigncurrency = '';
                    this.tableP[j].currencyrate = '';
                    this.tableP[j].tormb = '';
                    this.tableP[j].currency = '';
                    this.form.tormb = '';
                    this.disa = true;
                }
                for(let j = 0; j < this.tableR.length; j++){
                    this.tableR[j].foreigncurrency = '';
                    this.tableR[j].currencyrate = '';
                    this.tableR[j].tormb = '';
                    this.tableR[j].currency = '';
                    this.form.tormb = '';
                    this.disa = true;
                }

            },
            getUserids(val) {
                this.form.code = getUserInfo(val).userinfo.personalcode;
                this.userlist = val;
                this.form.user_id = val;
                let rst = getOrgInfoByUserId(val);
                if(rst){
                    this.centerid = rst.centerNmae;
                    this.groupid = rst.groupNmae;
                    this.teamid = rst.teamNmae;
                    this.form.centerid = rst.centerId;
                    this.form.groupid = rst.groupId;
                    this.form.teamid = rst.teamId;
                }else{
                    this.centerid =  '';
                    this.groupid =  '';
                    this.teamid =  '';
                    this.form.centerid = '';
                    this.form.groupid =  '';
                    this.form.teamid =  '';
                }
                if (!this.form.user_id || this.form.user_id === '' || typeof val == 'undefined') {
                    this.error = this.$t('normal.error_08') + this.$t('label.applicant');
                } else {
                    this.error = '';
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
            getPayment(val) {
                this.form.paymentmethod = val;
                if (val === 'PJ004001') {
                    this.show1 = true;
                    this.show2 = false;
                    this.show3 = false;
                    this.show4 = false;
                    this.show5 = false;
                    this.form.code = '';
                    this.form.accountnumber = '';
                    this.form.receivables = '';
                    this.form.loan = '';
                    this.form.fullname = '';
                } else if (val === 'PJ004002') {
                    this.show1 = false;
                    this.show2 = true;
                    this.show3 = false;
                    this.show4 = false;
                    this.show5 = false;
                    this.form.payeename = '';
                    this.form.payeecode = '';
                    this.form.payeebankaccountnumber = '';
                    this.form.payeebankaccount = '';
                    this.form.receivables = '';
                    this.form.loan = '';
                    this.form.fullname = '';
                    this.form.suppliername = ' ';
                } else if (val === 'PJ004003') {
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = true;
                    this.show4 = false;
                    this.show5 = false;
                    this.form.payeename = '';
                    this.form.payeecode = '';
                    this.form.payeebankaccountnumber = '';
                    this.form.payeebankaccount = '';
                    this.form.code = '';
                    this.form.loan = '';
                    this.form.fullname = '';
                } else if (val === 'PJ004004') {
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = false;
                    this.show4 = true;
                    this.show5 = false;
                    this.form.payeename = '';
                    this.form.payeecode = '';
                    this.form.payeebankaccountnumber = '';
                    this.form.payeebankaccount = '';
                    this.form.code = '';
                    this.form.receivables = '';
                    this.form.fullname = '';
                    this.form.suppliername = ' ';
                } else {
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = false;
                    this.show4 = false;
                    this.show5 = true;
                    this.form.payeename = '';
                    this.form.payeecode = '';
                    this.form.payeebankaccountnumber = '';
                    this.form.payeebankaccount = '';
                    this.form.code = '';
                    this.form.receivables = '';
                    this.form.loan = '';
                }
            },
            getmodule(val) {
                this.form.moduleid = val;
            },

            getCurrency(val, row) {
                row.currency = val;
                let error = 0;
                if (this.form.type === 'PJ001001') {
                    if (this.tableT.length > 1) {
                        for (let i = 0; i < this.tableT.length; i++) {
                            for (let j = 1; j < this.tableT.length; j++) {
                                if (this.tableT[i].currency != this.tableT[j].currency) {
                                    error = error + 1
                                    Message({
                                        message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                                        type: 'error',
                                        duration: 5 * 1000,
                                    });
                                    break;
                                }
                                continue
                            }
                            break
                        }
                    }
                } else if (this.form.type === 'PJ001002') {
                    if (this.tableP.length > 1) {
                        for (let i = 0; i < this.tableP.length; i++) {
                            for (let j = 1; j < this.tableP.length; j++) {
                                if (this.tableP[i].currency != this.tableP[j].currency) {
                                    error = error + 1
                                    Message({
                                        message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                                        type: 'error',
                                        duration: 5 * 1000,
                                    });
                                    break;
                                }
                                continue
                            }
                            break
                        }
                    }
                    if (error == '0') {
                        if (this.tableP.length > 0) {
                            for (let i = 0; i < this.tableP.length; i++) {
                                if (this.tableR[0].currency != '' && this.tableP[0].currency != '' ) {
                                    for (let j = 0; j < this.tableR.length; j++) {
                                        if (this.tableP[i].currency != this.tableR[j].currency) {
                                            error = error + 1
                                            Message({
                                                message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                                                type: 'error',
                                                duration: 5 * 1000,
                                            });
                                            break;
                                        }
                                    }
                                }
                                break
                            }
                        }
                    }
                    if (error == '0') {
                        if (this.tableR.length > 0) {
                            for (let i = 0; i < this.tableR.length; i++) {
                                if (this.tableP[0].currency != ''&&this.tableR[0].currency != '') {
                                    for (let j = 0; j < this.tableP.length; j++) {
                                        if (this.tableR[i].currency != this.tableP[j].currency) {
                                            error = error + 1
                                            Message({
                                                message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                                                type: 'error',
                                                duration: 5 * 1000,
                                            });
                                            break;
                                        }
                                    }
                                    break
                                }
                            }
                        }
                    }
                    if (error == '0') {
                        if (this.tableR.length > 1) {
                            for (let i = 0; i < this.tableR.length; i++) {
                                for (let j = 1; j < this.tableR.length; j++) {
                                    if (this.tableR[i].currency != this.tableR[j].currency) {
                                        error = error + 1
                                        Message({
                                            message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                                            type: 'error',
                                            duration: 5 * 1000,
                                        });
                                        break;
                                    }
                                    continue
                                }
                                break
                            }
                        }
                    }
                }
                if (error == '0') {
                    if (val === 'PG019001') {
                        this.disablecurr = false;
                        let dictionaryInfo = getDictionaryInfo(val);
                        if (dictionaryInfo) {
                            row.currencyrate = dictionaryInfo.value2;
                        }
                    } else if (val === 'PG019002') {
                        this.disablecurr = false;
                        let dictionaryInfo = getDictionaryInfo(val);
                        if (dictionaryInfo) {
                            row.currencyrate = dictionaryInfo.value2;
                        }
                    }
                    row.tormb = Math.round((row.foreigncurrency * row.currencyrate) * 100) / 100;
                    this.tormbT = Number(this.tormbT) + row.tormb;
                    this.form.tormb = this.tormbT;
                }
            },
            getCurrencyrate(row) {
                row.tormb = Math.round((row.foreigncurrency * row.currencyrate) * 100) / 100;
                this.tormbT = Number(this.tormbT) + row.tormb;
                this.form.tormb = this.tormbT;
            },
            deleteRow(index, rows, row) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                } else {
                    this.tableT = [{
                        trafficdate: '',
                        invoicenumber: '',
                        accountcode: '',
                        taxes: '',
                        departmentname: '',
                        budgetcoding: '',
                        plsummary: '',
                        region: '',
                        subjectnumber: '',
                        currency: '',
                        currencyrate: '',
                        tormb: '',
                        vehicle: '',
                        startingpoint: '',
                        rmb: '',
                        foreigncurrency: '',
                        annexno: '',
                    }];
                }
            },
            deleteRow3(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                } else {
                    this.tableP = [{
                        departmentname: '',
                        budgetcoding: '',
                        invoicenumber: '',
                        accountcode: '',
                        taxes: '',
                        plsummary: '',
                        purchasedetailsdate: '',
                        currency: '',
                        currencyrate: '',
                        tormb: '',
                        procurementdetails: '',
                        subjectnumber: ' ',
                        rmb: '',
                        foreigncurrency: '',
                        annexno: '',
                        showrow: true,
                    }];
                }
            },
            deleteRow4(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                } else {
                    this.tableR = [{
                        servicehours: '',
                        otherdetailsdate: '',
                        invoicenumber: '',
                        costitem: '',
                        taxes: '',
                        plsummary: '',
                        departmentname: '',
                        accountcode: '',
                        currency: '',
                        currencyrate: '',
                        tormb: '',
                        subjectnumber: '',
                        budgetcoding: '',
                        remarks: '',
                        rmb: '',
                        foreigncurrency: '',
                        annexno: '',
                    }];
                }
            },
            deleteRow7(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                } else {
                    this.tableF.push({
                        invoicenumber: '',
                        invoicetype: '',
                        invoiceamount: '',
                        taxrate: '',
                        excludingtax: '',
                        facetax: '',
                    });
                }
                this.checkoptionsdata()
            },
            addRow() {
                this.tableT.push({
                    trafficdetails_id: '',
                    publicexpenseid: '',
                    trafficdate: '',
                    invoicenumber: '',
                    accountcode: '',
                    taxes: '',
                    currency: '',
                    currencyrate: '',
                    tormb: '',
                    departmentname: this.groupId,
                    budgetcoding:  this.budgetcodingcheck,
                    subjectnumber: '',
                    plsummary: '',
                    region: '',
                    vehicle: '',
                    startingpoint: '',
                    rmb: '',
                    foreigncurrency: '',
                    annexno: '',
                    rowindex: '',
                    display: true,
                });
            },
            addRow7() {
                let b;
                if (this.tableF.length > 0) {
                    b = this.tableF.length + 1;
                }
                this.tableF.push({
                    invoice_id: '',
                    publicexpenseid: '',
                    invoicenumber: b,
                    invoicetype: '',
                    invoiceamount: '',
                    taxrate: '',
                    excludingtax: '',
                    facetax: '',
                });
                this.checkoptionsdata()
            },
            addRow3() {
                this.tableP.push({
                    publicexpenseid: '',
                    purchasedetails_id: '',
                    invoicenumber: '',
                    departmentname: this.groupId,
                    budgetcoding:  this.budgetcodingcheck,
                    purchasedetailsdate: '',
                    procurementdetails: '',
                    accountcode: '',
                    plsummary: '',
                    currency: '',
                    currencyrate: '',
                    tormb: '',
                    subjectnumber: '',
                    taxes: '',
                    rmb: '',
                    foreigncurrency: '',
                    annexno: '',
                    rowindex: '',
                    display: true,
                    showrow: true,
                    showrow1: false,
                    showrow2: false,
                    showrow3: false,
                });
            },
            addRow4() {
                this.tableR.push({
                    publicexpenseid: '',
                    otherdetails_id: '',
                    otherdetailsdate: '',
                    invoicenumber: '',
                    servicehours: '',
                    costitem: '',
                    currency: '',
                    currencyrate: '',
                    tormb: '',
                    departmentname: this.groupId,
                    accountcode: '',
                    plsummary: '',
                    subjectnumber: '',
                    budgetcoding:  this.budgetcodingcheck,
                    remarks: '',
                    rmb: '',
                    foreigncurrency: '',
                    taxes: '',
                    annexno: '',
                    rowindex: '',
                    display: true,
                });
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
                        sums[index] = '--';
                    }
                });
                this.getMoney(sums);
                this.getforeigncurrency(sums);
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
                        sums[index] = '--';
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
                        sums[index] = '--';
                    }
                });
                this.getMoney(sums);
                this.getforeigncurrency(sums);
                return sums;
            },
            getMoney(sums) {
                if (this.form.type === 'PJ001001') {
                    this.form.rmbexpenditure = sums[10];
                } if (this.checkCode1 == '1'){
                    this.form.rmbexpenditure = this.tablePValue[8] + sums[9];
                }else {
                    this.form.rmbexpenditure = this.tablePValue[8] + sums[8];
                }
            },
            getforeigncurrency(sums) {
                if (this.form.type === 'PJ001001') {
                    this.form.foreigncurrency = sums[11];
                } if (this.checkCode1 == '1'){
                    this.form.foreigncurrency = this.tablePValue[9] + sums[10];
                }else {
                    this.form.foreigncurrency = this.tablePValue[9] + sums[9];
                }
            },
            changeRMB(newValue) {
                for (let j = 0; j < this.tableF.length; j++) {
                    let taxratevalue = 0;
                    if (newValue.invoicenumber == this.tableF[j].invoicenumber) {
                        if (newValue.rmb != '') {
                            if (this.tableF[j].taxrate != '') {
                                if (this.tableF[j].taxrate == 'PJ071001') {
                                    this.taxrateValue = getDictionaryInfo('PJ071001').value1
                                } else if (this.tableF[j].taxrate == 'PJ071002') {
                                    this.taxrateValue =getDictionaryInfo('PJ071002').value1
                                } else if (this.tableF[j].taxrate == 'PJ071003') {
                                    this.taxrateValue = getDictionaryInfo('PJ071003').value1
                                } else if (this.tableF[j].taxrate == 'PJ071004') {
                                    this.taxrateValue = getDictionaryInfo('PJ071004').value1
                                }
                                taxratevalue = 1 + Number(this.taxrateValue);
                                newValue.taxes = parseFloat((newValue.rmb / (taxratevalue) * this.taxrateValue)).toFixed(2)
                            }
                        }
                    }
                }
                if (newValue.rmb > 0) {
                    newValue.foreigncurrency = '';
                    newValue.currencyrate = '';
                    newValue.tormb = '';
                    newValue.currency = '';
                    this.form.tormb = '';
                    this.disa = true;
                    newValue.display = false;
                    this.$nextTick(() => {
                        newValue.display = true;
                    });
                }
            },
            changeForeigncurrency(newValue) {
                if (newValue.foreigncurrency > 0) {
                    newValue.rmb = '';
                    newValue.currencyrate = '';
                    newValue.tormb = '';
                    this.form.tormb = '';
                    this.disa = false;
                    newValue.display = false;
                    this.$nextTick(() => {
                        newValue.display = true;
                    });
                }
                if (newValue.currency === 'PG019001') {
                    this.disablecurr = false;
                    let dictionaryInfo = getDictionaryInfo(newValue.currency);
                    if (dictionaryInfo) {
                        newValue.currencyrate = dictionaryInfo.value2;
                    }
                } else if (newValue.currency === 'PG019002') {
                    this.disablecurr = false;
                    let dictionaryInfo = getDictionaryInfo(newValue.currency);
                    if (dictionaryInfo) {
                        newValue.currencyrate = dictionaryInfo.value2;
                    }
                }
                newValue.tormb = Math.round((newValue.foreigncurrency * newValue.currencyrate) * 100) / 100;
                this.tormbT = Number(this.tormbT) + newValue.tormb;
                this.form.tormb = this.tormbT;
            },
            handleClickChange(val) {
                this.currentRow = val.suppliername;
                this.currentRow1 = val.payeename;
                this.currentRow2 = val.vendornum;
                this.currentRow3 = val.payeebankaccountnumber;
                this.currentRow4 = val.payeebankaccount;
            },

            submit() {
                let val = this.currentRow;
                let val1 = this.currentRow1;
                let val2 = this.currentRow2;
                let val3 = this.currentRow3;
                let val4 = this.currentRow4;
                this.dialogTableVisible = false;
                this.form.suppliername = val;
                this.form.payeename = val1;
                this.form.payeecode = val2;
                this.form.payeebankaccountnumber = val3;
                this.form.payeebankaccount = val4;

            },
            getsupplierinfor() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS6003Store/getsupplierinfor')
                    .then(response => {
                        this.gridData = [];
                        for (let i = 0; i < response.length; i++) {
                            var vote = {};
                            vote.suppliername = response[i].supchinese;
                            vote.payeename = response[i].payeename;
                            vote.vendornum = response[i].vendornum;
                            vote.payeebankaccountnumber = response[i].payeebankaccountnumber;
                            vote.payeebankaccount = response[i].payeebankaccount;
                            this.gridData.push(vote);
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
            },

            buttonClick(val) {
                if (val === 'back') {
                    this.$router.push({
                        name: 'PFANS1012View',
                        params: {},
                    });
                }
                if (val === 'save') {
                    this.$refs['reff'].validate(valid => {
                        if (valid) {
                            this.baseInfo = {};
                            this.baseInfo.publicexpense= [];
                            this.baseInfo.trafficdetails = [];
                            this.baseInfo.purchasedetails = [];
                            this.baseInfo.otherdetails = [];
                            this.baseInfo.invoice = [];
                            this.form.user_id = this.userlist;
                            this.form.moneys = Math.round((this.form.rmbexpenditure + this.form.tormb) * 100) / 100;
                            this.form.reimbursementdate = moment(this.form.reimbursementdate).format('YYYY-MM-DD');
                            this.baseInfo.publicexpense = JSON.parse(JSON.stringify(this.form));
                            let sum = 0;
                            for (let i = 0; i < this.tableF.length; i++) {
                                sum += this.tableF[i].invoiceamount;
                                if (this.tableF[i].invoicenumber !== '' || this.tableF[i].invoicetype !== '' || this.tableF[i].invoiceamount > 0 || this.tableF[i].taxrate !== ''
                                    || this.tableF[i].excludingtax > 0 || this.tableF[i].facetax > 0) {
                                    this.baseInfo.invoice.push(
                                        {
                                            invoice_id: this.tableF[i].invoice_id,
                                            publicexpenseid: this.tableF[i].publicexpenseid,
                                            invoicenumber: this.tableF[i].invoicenumber,
                                            invoicetype: this.tableF[i].invoicetype,
                                            invoiceamount: this.tableF[i].invoiceamount,
                                            taxrate: this.tableF[i].taxrate,
                                            excludingtax: this.tableF[i].excludingtax,
                                            facetax: this.tableF[i].facetax,
                                        },
                                    );
                                }
                            }
                            this.invoiceamountsum = sum;
                            if (this.form.type === 'PJ001001') {
                                for (let i = 0; i < this.tableT.length; i++) {
                                    if (this.tableT[i].trafficdate !== '' || this.tableT[i].subjectnumber !== '' || this.tableT[i].invoicenumber !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
                                        || this.tableT[i].rmb > 0 || this.tableT[i].foreigncurrency > 0 || this.tableT[i].annexno !== '') {
                                        this.baseInfo.trafficdetails.push(
                                            {
                                                trafficdetails_id: this.tableT[i].trafficdetails_id,
                                                publicexpenseid: this.tableT[i].publicexpenseid,
                                                trafficdate: this.tableT[i].trafficdate,
                                                invoicenumber: this.tableT[i].invoicenumber,
                                                taxes: this.tableT[i].taxes,
                                                accountcode: this.tableT[i].accountcode,
                                                plsummary: this.tableT[i].plsummary,
                                                departmentname: this.tableT[i].departmentname,
                                                budgetcoding: this.tableT[i].budgetcoding,
                                                currency: this.tableT[i].currency,
                                                currencyrate: this.tableT[i].currencyrate,
                                                tormb: this.tableT[i].tormb,
                                                subjectnumber: this.tableT[i].subjectnumber,
                                                region: this.tableT[i].region,
                                                vehicle: this.tableT[i].vehicle,
                                                startingpoint: this.tableT[i].startingpoint,
                                                rmb: this.tableT[i].rmb,
                                                foreigncurrency: this.tableT[i].foreigncurrency,
                                                annexno: this.tableT[i].annexno,
                                            },
                                        );
                                    }
                                }
                            } else if (this.form.type === 'PJ001002') {
                                for (let i = 0; i < this.tableP.length; i++) {
                                    if (this.tableP[i].purchasedetailsdate !== '' || this.tableP[i].procurementdetails !== '' || this.tableP[i].invoicenumber !== '' || this.tableP[i].departmentname !== '' || this.tableP[i].budgetcoding !== ''
                                        || this.tableP[i].subjectnumber !== '' || this.tableP[i].rmb > 0 || this.tableP[i].foreigncurrency > 0 || this.tableP[i].taxes !== '' || this.tableP[i].annexno !== '') {
                                        if (this.tableP[i].procurementdetails === ' ') {
                                            this.tableP[i].procurementdetails = '';
                                        }
                                        this.baseInfo.purchasedetails.push(
                                            {
                                                purchasedetails_id: this.tableP[i].purchasedetails_id,
                                                publicexpenseid: this.tableP[i].publicexpenseid,
                                                invoicenumber: this.tableP[i].invoicenumber,
                                                departmentname: this.tableP[i].departmentname,
                                                budgetcoding: this.tableP[i].budgetcoding,
                                                plsummary: this.tableP[i].plsummary,
                                                accountcode: this.tableP[i].accountcode,
                                                currency: this.tableP[i].currency,
                                                currencyrate: this.tableP[i].currencyrate,
                                                tormb: this.tableP[i].tormb,
                                                purchasedetailsdate: this.tableP[i].purchasedetailsdate,
                                                procurementdetails: this.tableP[i].procurementdetails,
                                                subjectnumber: this.tableP[i].subjectnumber,
                                                rmb: this.tableP[i].rmb,
                                                foreigncurrency: this.tableP[i].foreigncurrency,
                                                taxes: this.tableP[i].taxes,
                                                annexno: this.tableP[i].annexno,
                                            },
                                        );
                                    }
                                }
                                for (let i = 0; i < this.tableR.length; i++) {
                                    if (this.tableR[i].otherdetailsdate !== '' || this.tableR[i].invoicenumber !== '' || this.tableR[i].costitem !== '' || this.tableR[i].departmentname !== '' || this.tableR[i].accountcode !== '' || this.tableR[i].subjectnumber !== '' || this.tableR[i].budgetcoding !== '' || this.tableR[i].remarks !== ''
                                        || this.tableR[i].rmb > 0 || this.tableR[i].foreigncurrency > 0 || this.tableR[i].taxes !== '' || this.tableR[i].annexno !== '') {
                                        this.baseInfo.otherdetails.push(
                                            {
                                                otherdetails_id: this.tableR[i].otherdetails_id,
                                                publicexpenseid: this.tableR[i].publicexpenseid,
                                                otherdetailsdate: this.tableR[i].otherdetailsdate,
                                                invoicenumber: this.tableR[i].invoicenumber,
                                                costitem: this.tableR[i].costitem,
                                                departmentname: this.tableR[i].departmentname,
                                                accountcode: this.tableR[i].accountcode,
                                                plsummary: this.tableR[i].plsummary,
                                                servicehours: this.tableR[i].servicehours,
                                                currency: this.tableR[i].currency,
                                                currencyrate: this.tableR[i].currencyrate,
                                                tormb: this.tableR[i].tormb,
                                                subjectnumber: this.tableR[i].subjectnumber,
                                                budgetcoding: this.tableR[i].budgetcoding,
                                                remarks: this.tableR[i].remarks,
                                                rmb: this.tableR[i].rmb,
                                                foreigncurrency: this.tableR[i].foreigncurrency,
                                                taxes: this.tableR[i].taxes,
                                                annexno: this.tableR[i].annexno,
                                            },
                                        );
                                    }
                                }
                            }
                            let error = 0;
                            if (this.form.type === 'PJ001001') {
                                for (let j = 0; j < this.tableF.length; j++) {
                                    let summoney = 0;
                                    for (let i = 0; i < this.tableT.length; i++) {
                                        if (this.tableT[i].trafficdate !== '' || this.tableT[i].subjectnumber !== '' || this.tableT[i].invoicenumber !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
                                            || this.tableT[i].rmb > 0 || this.tableT[i].foreigncurrency > 0 || this.tableT[i].annexno !== '') {
                                            if (this.tableT[i].invoicenumber == this.tableF[j].invoicenumber) {
                                                if (this.tableT[i].rmb != '0') {
                                                    summoney += this.tableT[i].rmb
                                                    continue;
                                                }
                                            }
                                        }
                                    }
                                    if (summoney != this.tableF[j].invoiceamount && summoney != '0') {
                                        error = error + 1;
                                        Message({
                                            message: this.$t('label.PFANS1012FORMVIEW_MESSAGE'),
                                            type: 'error',
                                            duration: 5 * 1000,
                                        });
                                        break;
                                    }
                                }
                            } else if (this.form.type === 'PJ001002') {
                                for (let j = 0; j < this.tableF.length; j++) {
                                    let summoney = 0;
                                    let sumMoney = 0;
                                    let sumout = 0;
                                    for (let i = 0; i < this.tableP.length; i++) {
                                        if (this.tableP[i].purchasedetailsdate !== '' || this.tableP[i].procurementdetails !== '' || this.tableP[i].invoicenumber !== '' || this.tableP[i].departmentname !== '' || this.tableP[i].budgetcoding !== ''
                                            || this.tableP[i].subjectnumber !== '' || this.tableP[i].rmb > 0 || this.tableP[i].foreigncurrency > 0 || this.tableP[i].taxes !== '' || this.tableP[i].annexno !== '') {
                                            if (this.tableP[i].invoicenumber == this.tableF[j].invoicenumber) {
                                                if (this.tableP[i].rmb != '0') {
                                                    summoney += this.tableP[i].rmb
                                                    continue;
                                                }
                                            }
                                        }
                                    }

                                    for (let i = 0; i < this.tableR.length; i++) {
                                        if (this.tableR[i].otherdetailsdate !== '' || this.tableR[i].invoicenumber !== '' || this.tableR[i].costitem !== '' || this.tableR[i].departmentname !== '' || this.tableR[i].accountcode !== '' || this.tableR[i].subjectnumber !== '' || this.tableR[i].budgetcoding !== '' || this.tableR[i].remarks !== ''
                                            || this.tableR[i].rmb > 0 || this.tableR[i].foreigncurrency > 0 || this.tableR[i].taxes !== '' || this.tableR[i].annexno !== '') {
                                            if (this.tableR[i].invoicenumber == this.tableF[j].invoicenumber) {
                                                if (this.tableR[i].rmb != '0') {
                                                    sumMoney += this.tableR[i].rmb
                                                    continue;
                                                }
                                            }
                                        }
                                    }
                                    sumout = summoney + sumMoney;
                                    if (sumout != this.tableF[j].invoiceamount && sumout != '0') {
                                        error = error + 1;
                                        Message({
                                            message: this.$t('label.PFANS1012FORMVIEW_MESSAGE'),
                                            type: 'error',
                                            duration: 5 * 1000,
                                        });
                                        break;
                                    }
                                }
                            }
                            if (error == '0') {
                                if (this.$route.params._id) {
                                    this.loading = true;
                                    this.baseInfo.publicexpense.publicexpenseid = this.$route.params._id;
                                    this.$store
                                        .dispatch('PFANS1012Store/update', this.baseInfo)
                                        .then(response => {
                                            this.data = response;
                                            this.loading = false;
                                            if (val !== 'update') {
                                                Message({
                                                    message: this.$t('normal.success_02'),
                                                    type: 'success',
                                                    duration: 5 * 1000,
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
                                                duration: 5 * 1000,
                                            });
                                            this.loading = false;
                                        });
                                } else {
                                    this.loading = true;
                                    this.$store
                                        .dispatch('PFANS1012Store/insert', this.baseInfo)
                                        .then(response => {
                                            this.data = response;
                                            this.loading = false;
                                            Message({
                                                message: this.$t('normal.success_01'),
                                                type: 'success',
                                                duration: 5 * 1000,
                                            });
                                            this.$router.push({
                                                name: 'PFANS1012View',
                                            });
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
                }
            },
        },
    };
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

  .dpSupIndex {
    .content {
      height: 34px;
      min-width: 80%;
      border: 0.1rem solid #ebeef5;
      overflow-y: scroll;
      overflow-x: hidden;
      line-height: 34px;
      padding: 0.1rem 0.5rem 0.2rem 0.5rem;
    }

    .bg {
      background: white;
      border-width: 1px;
    }
  }

</style>
