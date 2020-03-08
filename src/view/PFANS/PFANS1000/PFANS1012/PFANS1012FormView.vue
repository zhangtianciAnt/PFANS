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
                    <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                      <dicselect :code="code1"
                                 :data="form.budgetunit"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 style="width:20vw"
                                 @change="getBudge">
                      </dicselect>
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
                    <el-form-item :label="$t('label.PFANS1012VIEW_REIMBURSEMENTDATE')" prop="application_date">
                      <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.reimbursementdate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.judgement')" v-if="show7">
                      <el-input :disabled="true" style="width:20vw" v-model="form.judgement">
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
                </el-row>
                <el-row>
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
                                        placeholder="请输入供应商关键字搜索"/>
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
                                        placeholder="请输入供应商关键字搜索"/>
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
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.payeename"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')" v-show="show3" prop="payeecode">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
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
                                        placeholder="请输入供应商关键字搜索"/>
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
                          <el-input-number :min="0" :precision="2" :max="9999999"
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
                            :disabled="!disablde"
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
                            <el-select style="width: 100%" v-model="scope.row.invoicenumber" clearable>
                              <el-option
                                v-for="item in arryoption"
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
                        <el-table-column :label="$t('label.PFANS1012VIEW_YGBXXM')" align="center" width="150">
                          <template slot-scope="scope">
                            <dicselect :code="code12"
                                       :data="scope.row.costitem"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getcostitem" style="width: 100%">
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
                            <el-input :disabled="!disable" style="width: 100%" maxlength="20"
                                      v-model="scope.row.vehicle">
                            </el-input>
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
                            <el-select style="width: 100%" v-model="scope.row.invoicenumber" clearable>
                              <el-option
                                v-for="item in arryoption"
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
                        <el-table-column :label="$t('label.PFANS1012VIEW_PROCUREMENTPROJECT')" align="center"
                                         width="150">
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
                        <el-table-column :label="$t('label.PFANS1012VIEW_PROCUREMENTDETAILS')" align="center"
                                         width="150">
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
                      <el-table :data="tableR" :summary-method="getRsummaries"
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
                            <el-select style="width: 100%" v-model="scope.row.invoicenumber" clearable>
                              <el-option
                                v-for="item in arryoption"
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
                        <el-table-column :label="$t('label.PFANS1012VIEW_COSTITEM')" align="center" width="150">
                          <template slot-scope="scope">
                            <dicselect :code="code10"
                                       :data="scope.row.costitem"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getcostitem" style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="150"
                                         v-if="checkStatus != false">
                          <template slot-scope="scope">
                            <dicselect :code="code11"
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
  import {getDictionaryInfo, getOrgInfo, getOrgInfoByUserId} from '@/utils/customize';
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
      // /*人民币支出与明细check*/
      // var checkrmb=(rule, value, callback) => {
      //   if (!this.form.rmbexpenditure || this.form.rmbexpenditure === '' || this.form.rmbexpenditure === 'undefined') {
      //     if( ! (this.form.moneys-this.form.tormb)===rmbexpenditure){
      //       this.error = this.$t('label.PFANS1012VIEW_CHECK');
      //       return callback(new Error(this.$t('label.PFANS1012VIEW_CHECK')));
      //     }
      //
      //   } else {
      //     this.error = '';
      //     return callback();
      //   }
      // };
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
        search: '',
        companyen: '',
        invoiceamountsum: '',
        tableTValue: '',
        accountcodeValue: '',
        tablePValue: '',
        tableRValue: '',
        errorsuppliername: '',
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
          {
            'key': 'export',
            'name': 'button.export',
            disabled: false,
            icon: 'el-icon-download',
          },
        ],
        tableT: [{
          publicexpenseid: '',
          trafficdetails_id: '',
          trafficdate: '',
          invoicenumber: '',
          costitem: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          budgetcoding: '',
          subjectnumber: '',
          region: '',
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
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          budgetcoding: '',
          purchasedetailsdate: '',
          procurementdetails: '',
          procurementproject: '',
          subjectnumber: '',
          rmb: '',
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
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          accountcode: '',
          subjectnumber: '',
          budgetcoding: '',
          remarks: '',
          rmb: '',
          foreigncurrency: '',
          annexno: '',
          rowindex: '',
          display: true,
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
          reimbursementdate: moment(new Date()).format('YYYY-MM-DD'),
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
          subjectnumber: '',
          subjectname: '',
          remarks: '',
          purchasesubjectnumber: '',
          purchasesubjectname: '',
          purchaseremarks: '',
          othersubjectnumber: '',
          othersubjectname: '',
          otherremarks: '',
          suppliername:'',
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
          budgetunit: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
            trigger: 'change',
          }],
          // rmbexpenditure:[{
          //   required: true,
          //   validator: checkrmb,
          //   trigger: 'change',
          // }],
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
        code9: 'PJ068',
        code10: 'PJ057',
        code11: '',
        code12: 'PJ069',
        code13: 'PJ071',
        invoicenumber: '',
        checkStatus: false,
        errorgroup: '',
        orglist: '',
        optionsdata: [],
        staroption: [{value:' ',label:' '}],
        arryoption:[],
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

      this.optionsdata = [];
      this.arryoption=[];
      for (var i = 0; i < this.tableF.length; i++) {
        var vote = {};
        vote.value = this.tableF[i].invoicenumber,
          vote.lable = this.tableF[i].invoicenumber,
          this.optionsdata.push(vote);
      }
      this.arryoption = this.optionsdata.concat( this.staroption);
      //this.arryoption.push.apply(this.arryoption,this.optionsdata);



      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1012Store/selectById', {'publicexpenseid': this.$route.params._id})
          .then(response => {
            debugger
            this.form = response.publicexpense;
            if (response.invoice.length > 0) {
              this.tableF = response.invoice;
              this.optionsdata = [];
              for (let i = 0; i < this.tableF.length; i++) {
                var vote = {};
                vote.value = this.tableF[i].invoicenumber,
                  vote.lable = this.tableF[i].invoicenumber,
                  this.optionsdata.push(vote);
              }
            }
            if (response.trafficdetails.length > 0) {
              this.tableT = response.trafficdetails;
              for (var i = 0; i < this.tableT.length; i++) {
                this.orglist = this.tableT[i].departmentname;
              }
            }
            if (response.purchasedetails.length > 0) {
              this.tableP = response.purchasedetails;
              for (var i = 0; i < this.tableP.length; i++) {
                this.orglist = this.tableP[i].departmentname;
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
              for (let i = 0; i < response.otherdetails.length; i++) {
                this.orglist = response.otherdetails[i].departmentname;
                if (response.otherdetails[i].costitem === 'PJ057001') {
                  this.checkStatus = true;
                } else if (response.otherdetails[i].costitem === 'PJ057015') {
                  this.checkStatus = true;
                } else if (response.otherdetails[i].costitem === 'PJ057016') {
                  this.checkStatus = true;
                }
              }
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
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          console.log(getOrgInfoByUserId(this.$store.getters.userinfo.userid));
          var groupid = rst.groupId;
          this.form.centerid = rst.centerNmae;
          this.form.groupid = rst.groupNmae;
          this.form.teamid = rst.teamNmae;
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
        this.jude = this.$route.params._name;
        for (var i = 0; i < this.jude.length; i++) {
          this.form.judgement += this.jude[i][0].label + ',';
        }
        this.form.judgement = this.form.judgement.substring(0, this.form.judgement.length - 1);
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
    watch: {
      foreigncurrency(val) {
        this.form.tormb = Math.round((val * this.form.currencyrate) * 100) / 100;
      },
    },
    methods: {
      getGroupId(orglist, row) {
        row.departmentname = orglist;
        let group = getOrgInfo(orglist);
        if (group) {
          this.companyen = group.companyen;
          row.budgetcoding = group.encoding;
        }
      },
      getcode(val, row) {
          row.accountcode = val;
          this.accountcodeValue = val;
          this.getCompanyen(val, row);
      },
      getCompanyen(val, row) {
        if (this.companyen != '') {
          if (this.companyen == 'ADMN' || this.companyen == 'FPO' || this.companyen == 'DANP') {
            let dic = getDictionaryInfo(val);
            if (dic) {
              row.subjectnumber = dic.value3;
            }
          } else {
            let dic = getDictionaryInfo(val);
            if (dic) {
              row.subjectnumber = dic.value2;
            }
          }
        } else {
          let dic = getDictionaryInfo(val);
          if (dic) {
            row.subjectnumber = dic.value2;
          }
        }
      },
      getcostitem(val, row) {
        row.costitem = val;
        if (val === 'PJ057001') {
          row.subjectnumber = '',
            this.code11 = 'PJ058';
          this.checkStatus = true;
        } else if (val === 'PJ057015') {
          row.subjectnumber = '',
            this.code11 = 'PJ059';
          this.checkStatus = true;
        } else if (val === 'PJ057016') {
          row.subjectnumber = '',
            this.code11 = 'PJ060';
          this.checkStatus = true;
        } else {
          row.subjectnumber = '',
            this.checkStatus = false;
          this.getCompanyen(val, row);
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
        //   if (dic) {
        //       row.taxrate = dic.value2;
        //       if (row.taxrate == "") {
        //         this.disablde = false
        //     }
        //     if (row.taxrate == 0.06 || row.taxrate == 0.09) {
        //         this.disablde = true
        //     }
        // }
      },
      changeSum(row) {

        if (row.taxrate == '') {
          row.facetax = '';
        } else {
          row.facetax = row.invoiceamount - row.excludingtax;
        }
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        this.form.centerid = rst.centerNmae;
        this.form.groupid = rst.groupNmae;
        this.form.teamid = rst.teamNmae;
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
          this.form.name = '';
          this.form.code = '';
          this.form.accountnumber = '';
          this.form.receivables = '';
          this.form.loan = '';
          this.form.fullname = '';
         // this.form.suppliername=' ';
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
         this.form.suppliername=' ';
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
          this.form.name = '';
          this.form.code = '';
          this.form.loan = '';
          this.form.fullname = '';
          //this.form.suppliername=' ';
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
          this.form.name = '';
          this.form.code = '';
          this.form.receivables = '';
          this.form.fullname = '';
          this.form.suppliername=' ';
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
          this.form.name = '';
          this.form.code = '';
          this.form.receivables = '';
          this.form.loan = '';
          //this.form.suppliername=' ';
        }
      },
      getBudge(val) {
        this.form.budgetunit = val;
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
            invoicenumber: '',
            costitem: '',
            departmentname: '',
            budgetcoding: '',
            region: '',
            subjectnumber: '',
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
            purchasedetailsdate: '',
            procurementdetails: '',
            procurementproject: ' ',
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
            otherdetailsdate: '',
            invoicenumber: '',
            costitem: '',
            departmentname: '',
            accountcode: '',
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
        this.optionsdata = [];
        for (let i = 0; i < this.tableF.length; i++) {
          var vote = {};
          vote.value = this.tableF[i].invoicenumber,
            vote.lable = this.tableF[i].invoicenumber,
            this.optionsdata.push(vote);
        }
      },
      addRow() {
        this.tableT.push({
          trafficdetails_id: '',
          publicexpenseid: '',
          trafficdate: '',
          invoicenumber: '',
          costitem: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          budgetcoding: '',
          subjectnumber: '',
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
        this.optionsdata = [];
        for (let i = 0; i < this.tableF.length; i++) {
          var vote = {};
          vote.value = this.tableF[i].invoicenumber,
            vote.lable = this.tableF[i].invoicenumber,
            this.optionsdata.push(vote);
        }
      },
      addRow3() {
        this.tableP.push({
          publicexpenseid: '',
          purchasedetails_id: '',
          invoicenumber: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          budgetcoding: '',
          purchasedetailsdate: '',
          procurementdetails: '',
          procurementproject: '',
          subjectnumber: '',
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
          costitem: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          accountcode: '',
          subjectnumber: '',
          budgetcoding: '',
          remarks: '',
          rmb: '',
          foreigncurrency: '',
          annexno: '',
          rowindex: '',
          display: true,
        });
      },
      getprocurementproject(val, row) {
        row.procurementproject = val;
        this.getCompanyen(val, row);
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
        this.tableRValue = sums;
        this.getMoney(this.tablePValue);
        this.getforeigncurrency(this.tablePValue);
        return sums;
      },
      getMoney(sums) {
        if (this.form.type === 'PJ001001') {
          this.form.rmbexpenditure = sums[9];
        } else if (this.accountcodeValue != '') {
          this.form.rmbexpenditure = this.tablePValue[7] + this.tableRValue[8];
        } else {
          this.form.rmbexpenditure = this.tablePValue[7] + this.tableRValue[7];
        }
      },
      getforeigncurrency(sums) {
        if (this.form.type === 'PJ001001') {
          this.form.foreigncurrency = sums[10];
        } else if (this.accountcodeValue != '') {
          this.form.foreigncurrency = this.tablePValue[8] + this.tableRValue[9];
        } else {
          this.form.foreigncurrency = this.tablePValue[8] + this.tableRValue[8];
        }
      },
      changeRMB(newValue) {
        if (newValue.rmb > 0) {
          newValue.foreigncurrency = '';
          newValue.display = false;
          this.$nextTick(() => {
            newValue.display = true;
          });
        }
      },
      changeForeigncurrency(newValue) {
        if (newValue.foreigncurrency > 0) {
          newValue.rmb = '';
          newValue.display = false;
          this.$nextTick(() => {
            newValue.display = true;
          });
        }
      },
      // 判断是否IE??器
      MyBrowserIsIE() {
        let isIE = false;
        if (
          navigator.userAgent.indexOf('compatible') > -1 &&
          navigator.userAgent.indexOf('MSIE') > -1
        ) {
          // ie??器
          isIE = true;
        }
        if (navigator.userAgent.indexOf('Trident') > -1) {
          // edge ??器
          isIE = true;
        }
        return isIE;
      },

      //?建a??下?
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
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        }));
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
        let val2= this.currentRow2;
        let val3 = this.currentRow3;
        let val4 = this.currentRow4;

        this.dialogTableVisible = false;
        this.form.suppliername = val;
        this.form.payeename = val1;
        this.form.payeecode = val2;
        this.form. payeebankaccountnumber = val3;
        this.form. payeebankaccount = val4;

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
              this.form.user_id = this.userlist;
              this.form.moneys = Math.round((this.form.rmbexpenditure + this.form.tormb) * 100) / 100;
              this.form.reimbursementdate = moment(this.form.reimbursementdate).format('YYYY-MM-DD');
              this.baseInfo.publicexpense = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.trafficdetails = [];
              this.baseInfo.purchasedetails = [];
              this.baseInfo.otherdetails = [];
              this.baseInfo.invoice = [];
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
              for (let i = 0; i < this.tableT.length; i++) {
                if (this.tableT[i].trafficdate !== '' || this.tableT[i].subjectnumber !== '' || this.tableT[i].invoicenumber !== '' || this.tableT[i].costitem !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
                  || this.tableT[i].rmb > 0 || this.tableT[i].foreigncurrency > 0 || this.tableT[i].annexno !== '') {
                  this.baseInfo.trafficdetails.push(
                    {
                      trafficdetails_id: this.tableT[i].trafficdetails_id,
                      publicexpenseid: this.tableT[i].publicexpenseid,
                      trafficdate: this.tableT[i].trafficdate,
                      invoicenumber: this.tableT[i].invoicenumber,
                      costitem: this.tableT[i].costitem,
                      departmentname: this.tableT[i].departmentname,
                      budgetcoding: this.tableT[i].budgetcoding,
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
              for (let i = 0; i < this.tableP.length; i++) {
                if (this.tableP[i].purchasedetailsdate !== '' || this.tableP[i].procurementdetails !== '' || this.tableP[i].invoicenumber !== '' || this.tableP[i].departmentname !== '' || this.tableP[i].budgetcoding !== '' || this.tableP[i].procurementproject !== ''
                  || this.tableP[i].subjectnumber !== '' || this.tableP[i].rmb > 0 || this.tableP[i].foreigncurrency > 0 || this.tableP[i].annexno !== '') {
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
                      purchasedetailsdate: this.tableP[i].purchasedetailsdate,
                      procurementdetails: this.tableP[i].procurementdetails,
                      procurementproject: this.tableP[i].procurementproject,
                      subjectnumber: this.tableP[i].subjectnumber,
                      rmb: this.tableP[i].rmb,
                      foreigncurrency: this.tableP[i].foreigncurrency,
                      annexno: this.tableP[i].annexno,
                    },
                  );
                }
              }
              for (let i = 0; i < this.tableR.length; i++) {
                if (this.tableR[i].otherdetailsdate !== '' || this.tableR[i].invoicenumber !== '' || this.tableR[i].costitem !== '' || this.tableR[i].departmentname !== '' || this.tableR[i].accountcode !== '' || this.tableR[i].subjectnumber !== '' || this.tableR[i].budgetcoding !== '' || this.tableR[i].remarks !== ''
                  || this.tableR[i].rmb > 0 || this.tableR[i].foreigncurrency > 0 || this.tableR[i].annexno !== '') {
                  this.baseInfo.otherdetails.push(
                    {
                      otherdetails_id: this.tableR[i].otherdetails_id,
                      publicexpenseid: this.tableR[i].publicexpenseid,
                      otherdetailsdate: this.tableR[i].otherdetailsdate,
                      invoicenumber: this.tableR[i].invoicenumber,
                      costitem: this.tableR[i].costitem,
                      departmentname: this.tableR[i].departmentname,
                      accountcode: this.tableR[i].accountcode,
                      subjectnumber: this.tableR[i].subjectnumber,
                      budgetcoding: this.tableR[i].budgetcoding,
                      remarks: this.tableR[i].remarks,
                      rmb: this.tableR[i].rmb,
                      foreigncurrency: this.tableR[i].foreigncurrency,
                      annexno: this.tableR[i].annexno,
                    },
                  );
                }
              }
              if (this.form.rmbexpenditure != '0') {
                if (this.form.rmbexpenditure != this.invoiceamountsum) {
                  Message({
                    message: this.$t('label.PFANS1012FORMVIEW_MESSAGE'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                } else {
                  if (this.$route.params._id) {
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
              } else if (this.form.tormb != '0') {
                if (this.form.tormb != this.invoiceamountsum) {
                  Message({
                    message: this.$t('label.PFANS1012FORMVIEW_MESSAGE'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                } else {
                  if (this.$route.params._id) {
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

            }

          });
        } else if (val === 'export') {
          let heads = [this.$t('label.date'), this.$t('label.PFANS1012FORMVIEW_INVOICEN'), this.$t('label.PFANS1012VIEW_COSTITEM'), this.$t('label.PFANS1012FORMVIEW_DEPARTMENT'), this.$t('label.PFANS1012VIEW_REGION'), this.$t('label.PFANS1012VIEW_VEHICLE'),
            this.$t('label.PFANS1012VIEW_STARTINGPOINT'), this.$t('label.PFANS1012VIEW_RMB'),
            this.$t('label.PFANS1012VIEW_FOREIGNCURRENCY'), this.$t('label.PFANS1012VIEW_ANNEXNO')];
          let filterVal = ['trafficdate', 'invoicenumber', 'costitem', 'departmentname', 'region', 'vehicle', 'startingpoint', 'rmb', 'foreigncurrency', 'annexno'];
          let csvData = [];
          var tableTdata = this.tableT;
          for (let i = 0; i < tableTdata.length; i++) {
            if (tableTdata[i].costitem !== null && tableTdata[i].costitem !== '') {
              let letErrortype = getDictionaryInfo(tableTdata[i].costitem);
              if (letErrortype != null) {
                tableTdata[i].costitem = letErrortype.value1;
              }
            }
            if (tableTdata[i].departmentname !== null && tableTdata[i].departmentname !== '') {
              let lettype = getOrgInfo(tableTdata[i].departmentname);
              if (lettype != null) {
                tableTdata[i].departmentname = lettype.departmentname;
              }
            }
            let obj = tableTdata[i];
            csvData.push({
              [heads[0]]: obj.trafficdate,
              [heads[1]]: obj.invoicenumber,
              [heads[2]]: obj.costitem,
              [heads[3]]: obj.departmentname,
              [heads[4]]: obj.region,
              [heads[5]]: obj.vehicle,
              [heads[6]]: obj.startingpoint,
              [heads[7]]: obj.rmb,
              [heads[8]]: obj.foreigncurrency,
              [heads[9]]: obj.annexno,
            });
          }
          const result = json2csv.parse(csvData, {
            excelStrings: true,
          });
          let csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + result;
          const link = document.createElement('a');
          link.href = csvContent;
          link.download = this.$t('label.PFANS1012VIEW_TRAFFIC') + '.csv';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
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

</style>
