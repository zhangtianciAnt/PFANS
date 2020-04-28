<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title"
                         @buttonClick="buttonClick" @disabled="setdisabled"
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
                                 style="width:20vw"
                                 v-if="show6"
                      >
                      </dicselect>
                      <el-input :disabled="true" style="width:20vw"
                                v-model="form.moduleidApp" v-if="show9"></el-input>
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
                  <el-table
                    :data="DataList"
                    v-show="show7"
                    @row-click="rowclick"
                    style="width: 230px"
                    header-cell-class-name="sub_bg_color_blue" stripe border
                  >
                    <el-table-column
                      prop="judgement_name"
                      :label="$t('label.judgement')"
                      width="228px">
                    </el-table-column>
                  </el-table>
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
                    <el-form-item :label="$t('label.PFANS1012VIEW_CURRENCYEXPENDITURE')"
                                  v-if="this.form.type === 'PJ001001'?false:true">
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
                    <el-form-item :label="$t('label.PFANS1012VIEW_TORMB')"
                                  v-if="this.form.type === 'PJ001001'?false:true">
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
                    <el-form-item :label="$t('label.PFANS1012VIEW_CAIWUPERSONALCODE')" v-show="show2" prop="code">
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
                  <el-form-item :label="$t('label.PFANS1012VIEW_ABSTRACT')" prop="remark">
                    <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                              v-model="form.remark">
                    </el-input>
                  </el-form-item>
                </el-row>
                <el-row v-if="this.form.type === 'PJ001001'?false:true">
                  <span class="collapse_Title">{{$t('label.PFANS1012FORMVIEW_INVOICETTYPE')}}</span>
                  <span style="color: red;font-size: 0.85rem">{{$t('label.PFANS1012FORMVIEW_INVOICEI')}}</span>
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
                        <el-input v-show="false" :disabled="true" style="width: 100%" v-model="scope.row.invoicetype">
                        </el-input>
                        <el-input :disabled="true" style="width: 100%" v-model="invoicetype">
                        </el-input>
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
                        <el-select :disabled="!disable" clearable style="width: 100%" v-model="scope.row.taxrate"
                                   @change="getrate(scope.row)">
                          <el-option
                            :key="item.value"
                            :label="item.lable"
                            :value="item.value"
                            v-for="item in optionsrate">
                          </el-option>
                        </el-select>
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
                          @change="changesummoney(scope.row)"
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

                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1013VIEW_TRAFFIC')" name="second" v-if="show9">

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
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_DEPARTMENT')" align="center" width="200">
                      <template slot-scope="scope">
                        <org :orglist="scope.row.departmentname"
                             orgtype="2"
                             :disabled="!disable"
                             :error="errorgroup"
                             style="width: 90%"
                             :no="scope.row"
                             @getOrgids="getGroupIdT"></org>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="200">
                      <template slot-scope="scope">
                        <!--                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">-->
                        <!--                            </el-input>-->
                        <el-select clearable style="width: 100%" v-model="scope.row.budgetcoding"
                                   :disabled="!disable"
                                   :placeholder="$t('normal.error_09')" :no="scope.row" @change="getBudgetunit">
                          <el-option
                            v-for="item in scope.row.optionsT"
                            :key="item.value"
                            :label="item.lable"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>

                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_PL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input v-show="false" :disabled="true" style="width: 100%" v-model="scope.row.plsummary">
                        </el-input>
                        <el-input :disabled="true" style="width: 100%" v-model="plsummary">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.accountcode" style="width: 100%" :disabled="!disable"
                                   @change="getaccoundcode(scope.row)">
                          <el-option
                            v-for="item in scope.row.accoundoptionsdate"
                            :key="item.value"
                            :label="item.lable"
                            :value="item.value">
                          </el-option>
                        </el-select>
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

            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS1012FORMVIEW_CHARGED')" name="third" v-if="show6">
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
                                       @change="changeinvoicenumber(scope.row)"
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
                                 :disabled="checktaxes"
                                 :error="errorgroup"
                                 style="width: 100%"
                                 :no="scope.row"
                                 @getOrgids="getGroupIdP"></org>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="200">
                          <template slot-scope="scope">
                            <!--                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">-->
                            <!--                            </el-input>-->
                            <el-select clearable style="width: 100%" v-model="scope.row.budgetcoding"
                                       :disabled="checkexternal"
                                       :placeholder="$t('normal.error_09')" :no="scope.row" @change="getBudgetunit">
                              <el-option
                                v-for="item in scope.row.optionsP"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1002FROMVIEW_SFGDZC')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-switch
                              @change="changeexternal(scope.row)"
                              :disabled="checktaxes"
                              v-model="scope.row.external"
                              active-value="1"
                              inactive-value="0"
                            >
                            </el-switch>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_PL')" align="center" width="150">

                          <template slot-scope="scope">
                            <el-select v-model="scope.row.plsummary" :disabled="checktaxes" style="width: 100%"
                                       clearable
                                       @change="getplsummary(scope.row)">
                              <el-option
                                v-for="item in ploptionsdata"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>

                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250">
                          <template slot-scope="scope">
                            <dicselect :code="scope.row.code17"
                                       :disabled="checktaxes"
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
                            <el-input :disabled="checktaxes" style="width: 100%"
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
                              :disabled="checktaxes"
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
                              controls-position="right"
                              style="width: 100%"
                              @change="changeRMB(scope.row)"
                              v-model="scope.row.taxes">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-input :disabled="checktaxes" maxlength="20" v-model="scope.row.annexno">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-button
                              :disabled="checktaxes"
                              @click.native.prevent="deleteRow3(scope.$index, tableP)"
                              plain
                              size="small"
                              type="danger"
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              :disabled="checktaxes"
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
                                       @change="changeinvoicenumber(scope.row)"
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
                                 :disabled="checktaxes"
                                 orgtype="2"
                                 :error="errorgroup"
                                 style="width: 100%"
                                 :no="scope.row"
                                 @getOrgids="getGroupIdR"></org>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="200">
                          <template slot-scope="scope">
                            <!--                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">-->
                            <!--                            </el-input>-->
                            <el-select clearable style="width: 100%" v-model="scope.row.budgetcoding" :no="scope.row"
                                       @change="getBudgetunit" :disabled="checkdisable"
                                       :placeholder="$t('normal.error_09')">
                              <el-option
                                v-for="item in scope.row.optionsR"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_PL')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.plsummary" :disabled="checktaxes" style="width: 100%"
                                       clearable
                                       @change="getplsummary(scope.row)">
                              <el-option
                                v-for="item in ploptionsdate"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250"
                        >
                          <template slot-scope="scope">
                            <dicselect :code="scope.row.code16"
                                       :disabled="checktaxes"
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
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_FWTIME')" align="center" width="160"
                                         v-if="checktime">
                          <template slot-scope="scope">
                            <el-date-picker :disabled="checktaxes" style="width: 100%"
                                            v-model="scope.row.servicehours"
                                            @change="clickdata(scope.row)"></el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_ABSTRACT')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="checktaxes" style="width: 100%" maxlength="20"
                                      v-model="scope.row.remarks">
                            </el-input>
                          </template>
                        </el-table-column>

                        <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="checktaxes"
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
                              controls-position="right"
                              style="width: 100%"
                              @change="changeRMB(scope.row)"
                              v-model="scope.row.taxes">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-input :disabled="checktaxes" maxlength="20" v-model="scope.row.annexno">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-button
                              :disabled="checktaxes"
                              @click.native.prevent="deleteRow4(scope.$index, tableR)"
                              plain
                              size="small"
                              type="danger"
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              :disabled="checktaxes"
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
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_CAIWUPERSONALCODE')));
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
        DataList: [{
          judgement_name: '',
        }],
        invoicetype: '',
        checkexternal: false,
        checktaxes: false,
        checkdisable: false,
        plsummary: '',
        Codecheck: '',
        checkCode1: '',
        checkcode: '',
        checktime: false,
        centerid: '',
        groupid: '',
        groupId: '',
        teamid: '',
        disablecheck: false,
        ploptionsdate: [],
        optionsrate: [],
        optionstype: [],
        optionsdate: [{value: 'PP024001', lable: this.$t('label.PFANS5008FORMVIEW_PROJECTGTXM')}],
        tormbT: '',
        Redirict: '',
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
        ploptionsdata: [],
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
          plsummary: 'PJ111008',
          departmentname: '',
          budgetcoding: '',
          subjectnumber: '',
          region: '',
          accountcode: '',
          vehicle: '',
          startingpoint: '',
          rmb: '',
          annexno: '',
          rowindex: '',
          display: true,
        }],
        tableF: [{
          invoice_id: '',
          publicexpenseid: '',
          invoicenumber: this.$t('label.PFANS1012FORMVIEW_NUMBERZP') + 1,
          invoicetype: 'PJ068001',
          invoiceamount: '',
          taxrate: '',
          excludingtax: '',
          facetax: '',
        }],
        tableP: [{
          code17: '',
          publicexpenseid: '',
          purchasedetails_id: '',
          invoicenumber: '',
          taxes: '',
          departmentname: '',
          budgetcoding: '',
          external: '',
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
          code16: '',
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
          bsexternal: '',
          project_id: '',
          centerid: '',
          groupid: '',
          teamid: '',
          user_id: '',
          telephone: '',
          moduleid: '',
          moduleidApp: '',
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
          code: '',
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
          remark: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1012VIEW_ABSTRACT'),
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
        code11: '',
        code13: 'PJ071',
        code14: 'PJ083',
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
      this.invoicetype = getDictionaryInfo('PJ068001').value1;
      this.plsummary = getDictionaryInfo('PJ111008').value1;
      this.getsupplierinfor();
      this.getCompanyProjectList();
      this.checkoptionsdata();
      if (getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)) {
        this.Redirict = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).redirict;
      }
      if (getOrgInfoByUserId(this.$store.getters.userinfo.userid)) {
        this.groupId = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
        // if (getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)) {
        //     this.budgetcodingcheck = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
        // }
      }
      let ratelist = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ071');
      for (let i = 0; i < ratelist.length; i++) {
        this.optionsrate.push({
          value: ratelist[i].code,
          lable: ratelist[i].value1,
        });
      }
      let PLdicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ111');
      for (let i = 0; i < PLdicnew.length; i++) {
        if (PLdicnew[i].code === 'PJ111010') {
          this.ploptionsdata.push({
            value: PLdicnew[i].code,
            lable: PLdicnew[i].value1,
          });
        }
      }

      let checktype = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ068');
      for (let i = 0; i < checktype.length; i++) {
        if (checktype[i].code === 'PJ068001') {
          this.optionstype.push({
            value: checktype[i].code,
            lable: checktype[i].value1,
          });
        }
      }

      let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ111');
      for (let i = 0; i < dic.length; i++) {
        if (dic[i].code === 'PJ111001' || dic[i].code === 'PJ111002' || dic[i].code === 'PJ111003' || dic[i].code === 'PJ111004' || dic[i].code === 'PJ111005'
          || dic[i].code === 'PJ111006' || dic[i].code === 'PJ111007' || dic[i].code === 'PJ111009' || dic[i].code === 'PJ111011'
          || dic[i].code === 'PJ111012' || dic[i].code === 'PJ111013' || dic[i].code === 'PJ111014') {
          this.ploptionsdate.push({
            value: dic[i].code,
            lable: dic[i].value1,
          });
        }
      }
      //ADD-WS-个人编码修改
      if (getUserInfo(this.$store.getters.userinfo.userid)) {
        this.Codecheck = this.$store.getters.userinfo.userinfo.caiwupersonalcode;
        this.form.code = this.$store.getters.userinfo.userinfo.caiwupersonalcode;
        let num = getUserInfo(this.$store.getters.userinfo.userid).userinfo.extension;
        if (num) {
          this.form.telephone = num;
        }
      }
      this.tableP[0].code17 = this.Redirict == '0' ? 'PJ121' : 'PJ134';
      //ADD-WS-个人编码修改
      //ADD-WS-直接部门或间接部门赋值变更
      // this.tableT[0].accoundoptionsdate = [];
      // if (this.Redirict == '0') {
      //   let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ119');
      //   for (let i = 0; i < dicnew.length; i++) {
      //     if (dicnew[i].code === 'PJ119004') {
      //       this.tableT[0].accoundoptionsdate.push({
      //         value: dicnew[i].code,
      //         lable: dicnew[i].value1,
      //       });
      //     }
      //   }
      // } else if (this.Redirict == '1' || this.Redirict == '') {
      //
      //   let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ132');
      //   for (let i = 0; i < dicnew.length; i++) {
      //     if (dicnew[i].code === 'PJ132004') {
      //       this.tableT[0].accoundoptionsdate.push({
      //         value: dicnew[i].code,
      //         lable: dicnew[i].value1,
      //       });
      //     }
      //   }
      // }
      //ADD-WS-直接部门或间接部门赋值变更
      this.IDname = this.$route.params._id;
      if (this.IDname) {
        this.disablecheck = true;
        this.loading = true;
        this.$store
          .dispatch('PFANS1012Store/selectById', {'publicexpenseid': this.$route.params._id})
          .then(response => {
              this.form = response.publicexpense;
              //add-ws-4/28-精算中，点击决裁，跳转画面
              let judgement = this.form.judgement.split(',');
              let judgementname = this.form.judgement_name.split(',');
              let datalist = [];
              for (var i = 0; i < judgement.length; i++) {
                for (var d = 0; d < judgementname.length; d++) {
                  if (i === d) {
                    let obj = {};
                    obj.judgement = judgement[i];
                    obj.judgement_name = judgementname[d];
                    datalist[i] = obj;
                  }
                }
              }
              this.DataList = datalist;
              //add-ws-4/28-精算中，点击决裁，跳转画面
              let rst = getOrgInfoByUserId(response.publicexpense.user_id);
              //ADD-WS-4/20-交通费得时候模块修改
              if (this.form.type === 'PJ001001') {
                if (this.form.moduleid !== null && this.form.moduleid !== '') {
                  let moduleidinfo = getDictionaryInfo(this.form.moduleid);
                  if (moduleidinfo) {
                    this.form.moduleidApp = moduleidinfo.value1;
                  }
                }
              } else if (this.form.type === 'PJ001002') {
                if (this.form.moduleid !== null && this.form.moduleid !== '') {
                  let moduleidinfo = getDictionaryInfo(this.form.moduleid);
                  if (moduleidinfo) {
                    this.form.moduleid = moduleidinfo.value1;
                  }
                }
              }
              //ADD-WS-4/20-交通费得时候模块修改
              // if (this.form.moduleid == 'PJ001001') {
              //   let moduleidinfo = getDictionaryInfo(this.form.moduleid);
              //   if (moduleidinfo != null) {
              //     this.form.moduleid = moduleidinfo.value1;
              //   }
              //   // moduleid
              // }
              if (rst) {
                this.centerid = rst.centerNmae;
                this.groupid = rst.groupNmae;
                this.teamid = rst.teamNmae;
              }
              if (response.invoice.length > 0) {
                this.tableF = response.invoice;
                if (this.form.status === '2') {
                  this.checkexternal = true;
                  this.checktaxes = true;
                  this.checkdisable = true;
                  this.disablecheck = true;
                }
                this.checkoptionsdata();
              }
              if (response.trafficdetails.length > 0) {
                this.tableT = response.trafficdetails;
                for (var i = 0; i < this.tableT.length; i++) {
                  this.orglist = this.tableT[i].departmentname;
                  let group = getOrgInfo(this.orglist);
                  if (group) {
                    this.Redirict = group.redirict;
                  }
                  if (this.tableT[i].departmentname !== '' && this.tableT[i].departmentname !== null && this.tableT[i].departmentname !== undefined) {
                    //ADD_FJL
                    this.tableT[i].optionsT = [];
                    let butinfo = getOrgInfo(this.tableT[i].departmentname).encoding;
                    let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                    if (dic.length > 0) {
                      for (let j = 0; j < dic.length; j++) {
                        if (butinfo === dic[j].value1) {
                          this.tableT[i].optionsT.push({
                            lable: dic[j].value2 + '_' + dic[j].value3,
                            value: dic[j].code,
                          });
                        }
                      }
                    }
                    //ADD_FJL  修改人员预算编码
                  }
                  if (this.Redirict == '0') {
                    this.tableT[i].accoundoptionsdate = [];
                    let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ119');
                    for (let a = 0; a < dicnew.length; a++) {
                      if (dicnew[a].code === 'PJ119004') {
                        this.tableT[i].accoundoptionsdate.push({
                          value: dicnew[a].code,
                          lable: dicnew[a].value1,
                        });
                      }
                    }
                  } else if (this.Redirict == '1' || this.Redirict == '') {
                    this.tableT[i].accoundoptionsdate = [];
                    let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ132');
                    for (let a = 0; a < dicnew.length; a++) {
                      if (dicnew[a].code === 'PJ132004') {
                        this.tableT[i].accoundoptionsdate.push({
                          value: dicnew[a].code,
                          lable: dicnew[a].value1,
                        });
                      }
                    }
                  }

                }
              }
              if (response.purchasedetails.length > 0) {
                this.tableP = response.purchasedetails;
                for (var i = 0; i < this.tableP.length; i++) {
                  this.tableP[i].code17 = '';
                  this.orglist = this.tableP[i].departmentname;
                  let group = getOrgInfo(this.orglist);
                  if (group) {
                    this.Redirict = group.redirict;
                  }
                  if (this.tableP[i].departmentname !== '' && this.tableP[i].departmentname !== null && this.tableP[i].departmentname !== undefined) {
                    //ADD_FJL
                    this.tableP[i].optionsP = [];
                    let butinfo = getOrgInfo(this.tableP[i].departmentname).encoding;
                    let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                    if (dic.length > 0) {
                      for (let j = 0; j < dic.length; j++) {
                        if (butinfo === dic[j].value1) {
                          this.tableP[i].optionsP.push({
                            lable: dic[j].value2 + '_' + dic[j].value3,
                            value: dic[j].code,
                          });
                        }
                      }
                    }
                    //ADD_FJL  修改人员预算编码
                  }
                  if (this.tableP[i].foreigncurrency > 0) {
                    this.disa = false;
                    this.disablecheck = false;
                  }
                  if (this.Redirict == '0') {
                    if (this.tableP[i].plsummary === 'PJ111010') {
                      this.tableP[i].code17 = 'PJ121';
                      let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                      if (letErrortype != null) {
                        this.tableP[i].accountcode = letErrortype.code;
                      }
                    }
                  } else if (this.Redirict == '1' || this.Redirict == '') {
                    if (this.tableP[i].plsummary === 'PJ111010') {
                      this.tableP[i].code17 = 'PJ134';
                      let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                      if (letErrortype != null) {
                        this.tableP[i].accountcode = letErrortype.code;
                      }
                    }
                  }
                }
              }
              if (response.otherdetails.length > 0) {
                this.tableR = response.otherdetails;
                for (let i = 0; i < this.tableR.length; i++) {
                  this.tableR[i].code16 = '';
                  this.orglist = this.tableR[i].departmentname;
                  let group = getOrgInfo(this.orglist);
                  if (group) {
                    this.Redirict = group.redirict;
                  }
                  if (this.tableR[i].departmentname !== '' && this.tableR[i].departmentname !== null && this.tableR[i].departmentname !== undefined) {
                    //ADD_FJL
                    this.tableR[i].optionsR = [];
                    let butinfo = getOrgInfo(this.tableR[i].departmentname).encoding;
                    let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                    if (dic.length > 0) {
                      for (let j = 0; j < dic.length; j++) {
                        if (butinfo === dic[j].value1) {
                          this.tableR[i].optionsR.push({
                            lable: dic[j].value2 + '_' + dic[j].value3,
                            value: dic[j].code,
                          });
                        }
                      }
                    }
                    //ADD_FJL  修改人员预算编码
                  }
                  if (this.tableR[i].foreigncurrency > 0) {
                    this.disa = false;
                    this.disablecheck = false;
                  }
                  if (this.Redirict == '0') {
                    if (this.tableR[i].plsummary == 'PJ111001') {
                      this.tableR[i].code16 = 'PJ112';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111002') {
                      this.tableR[i].code16 = 'PJ113';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111003') {
                      this.tableR[i].code16 = 'PJ114';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111004') {
                      this.tableR[i].code16 = '';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111005') {
                      this.tableR[i].code16 = 'PJ116';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111006') {
                      this.tableR[i].code16 = 'PJ117';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111007') {
                      this.tableR[i].code16 = 'PJ118';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111008') {
                      this.tableR[i].code16 = 'PJ119';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111009') {
                      this.tableR[i].code16 = 'PJ120';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111010') {
                      this.tableR[i].code16 = 'PJ121';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111011') {
                      this.tableR[i].code16 = 'PJ122';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111012') {
                      this.tableR[i].code16 = 'PJ123';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111013') {
                      this.tableR[i].code16 = '';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111014') {
                      this.tableR[i].code16 = 'PJ125';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    }
                  } else if (this.Redirict == '1' || this.Redirict == '') {
                    if (this.tableR[i].plsummary == 'PJ111001') {
                      this.tableR[i].code16 = 'PJ127';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111002') {
                      this.tableR[i].code16 = 'PJ128';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111003') {
                      this.tableR[i].code16 = 'PJ129';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111004') {
                      this.tableR[i].code16 = 'PJ115';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111005') {
                      this.tableR[i].code16 = 'PJ130';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111006') {
                      this.tableR[i].code16 = '';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111007') {
                      this.tableR[i].code16 = 'PJ131';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111008') {
                      this.tableR[i].code16 = 'PJ132';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111009') {
                      this.tableR[i].code16 = 'PJ133';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111010') {
                      this.tableR[i].code16 = 'PJ134';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111011') {
                      this.tableR[i].code16 = 'PJ135';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111012') {
                      this.tableR[i].code16 = 'PJ136';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111013') {
                      this.tableR[i].code16 = 'PJ124';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111014') {
                      this.tableR[i].code16 = 'PJ137';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    }
                  }
                  if (this.tableR[i].subjectnumber == '0504-00-0000') {
                    this.checktime = true;
                    if (this.tableR[i].servicehours == null || this.tableR[i].servicehours == '') {
                      this.checkdisable = false;
                    } else {
                      this.checkdisable = true;
                    }
                  }
                }
              }

              this.userlist = this.form.user_id;
              this.baseInfo.publicexpense = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.trafficdetails = JSON.parse(JSON.stringify(this.tableT));
              this.baseInfo.purchasedetails = JSON.parse(JSON.stringify(this.tableP));
              this.baseInfo.otherdetails = JSON.parse(JSON.stringify(this.tableR));
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
              // 111
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
            },
          )
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      } else {
        // if (getOrgInfoByUserId(this.$store.getters.userinfo.userid)) {
        //     this.groupId = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
        //     this.tableT[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
        //     this.tableP[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
        //     this.tableR[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
        //     if (getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)) {
        //         this.budgetcodingcheck = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
        //         this.tableT[0].budgetcoding = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
        //         this.tableP[0].budgetcoding = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
        //         this.tableR[0].budgetcoding = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
        //     }
        // }
        this.checkexternal = true;
        this.checktaxes = true;
        this.checkdisable = true;
        this.disablecheck = true;
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
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
          this.form.moduleid = 'PJ002001';
          this.form.moduleidApp = getDictionaryInfo(this.form.moduleid).value1;
        } else if (this.form.type === 'PJ001002') {
          this.show9 = false;
          this.show6 = true;
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
      if (this.disable) {
        this.checkexternal = false;
        this.checktaxes = false;
        this.checkdisable = false;
        this.disablecheck = false;
      } else {
        this.checkexternal = true;
        this.checktaxes = true;
        this.checkdisable = true;
        this.disablecheck = true;
      }
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
      //add-ws-4/28-精算中，点击决裁，跳转画面
      rowclick(row, event, column) {
        if (row.judgement_name.substring(0, 2) === this.$t('menu.PFANS1001')) {
          this.$router.push({
            name: 'PFANS1004FormView',
            params: {
              _checkid: this.IDname,
              _check: true,
              _id: row.judgement,
              disabled: false,
            },
          });
        } else if (row.judgement_name.substring(0, 2) === this.$t('label.PFANS1012VIEW_QIANYUAN')) {
          this.$router.push({
            name: 'PFANS1005FormView',
            params: {
              _checkid: this.IDname,
              _check: true,
              _id: row.judgement,
              disabled: false,
            },
          });
        } else if (row.judgement_name.substring(0, 2) === this.$t('label.PFANS1012VIEW_JIAOJI')) {
          this.$router.push({
            name: 'PFANS1010FormView',
            params: {
              _checkid: this.IDname,
              _check: true,
              _id: row.judgement,
              disabled: false,
            },
          });
        } else if (row.judgement_name.substring(0, 2) === this.$t('label.PFANS1012VIEW_WEITUO')) {
          this.$router.push({
            name: 'PFANS1025FormView',
            params: {
              _checkid: this.IDname,
              _check: true,
              _id: row.judgement,
              disabled: false,
            },
          });
        }
      },
      //add-ws-4/28-精算中，点击决裁，跳转画面
      changeinvoicenumber(row, val) {
        for (let j = 0; j < this.tableF.length; j++) {
          if (row.invoicenumber == this.tableF[j].invoicenumber) {
            if (this.tableF[j].taxrate === '') {
              row.taxes = 0;
              this.checkexternal = true;
              this.checkdisable = true;
              this.checktaxes = true;
              this.disablecheck = true;
              break;
            } else {
              let taxratevalue = 0;
              if (row.rmb != '') {
                if (this.tableF[j].taxrate == 'PJ071001') {
                  this.taxrateValue = getDictionaryInfo('PJ071001').value1;
                } else if (this.tableF[j].taxrate == 'PJ071002') {
                  this.taxrateValue = getDictionaryInfo('PJ071002').value1;
                } else if (this.tableF[j].taxrate == 'PJ071003') {
                  this.taxrateValue = getDictionaryInfo('PJ071003').value1;
                } else if (this.tableF[j].taxrate == 'PJ071004') {
                  this.taxrateValue = getDictionaryInfo('PJ071004').value1;
                }
                taxratevalue = 1 + Number(this.taxrateValue);
                row.taxes = parseFloat((row.rmb / (taxratevalue) * this.taxrateValue)).toFixed(2);
              }
              this.checkdisable = false;
              this.checkexternal = false;
              this.checktaxes = false;
              this.disablecheck = false;
              break;
            }
          } else {
            row.taxes = 0;
            this.checkdisable = false;
            this.checkexternal = false;
            this.checktaxes = false;
            this.disablecheck = false;
          }
        }
      },
      getBudgetunit(val, row) {
        row.budgetcoding = val;
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disable = val;
        }
      },
      changeexternal(row) {
        if (row.external == '1') {
          this.checkexternal = true;
          this.budgetcodingcheck = row.budgetcoding;
          row.subjectnumber = getDictionaryInfo('PG023001').value2;
          row.budgetcoding = '000000';
        } else if (row.external == '0') {
          this.checkexternal = false;
          row.budgetcoding = this.budgetcodingcheck;
          row.subjectnumber = this.checkCode2;
        }
      },
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
          .dispatch('PFANS5009Store/getSiteList3', {})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              this.optionsdate.push({
                value: response[i].companyprojects_id,
                lable: response[i].numbers + '_' + response[i].project_name,
              });
            }
            this.$store
              .dispatch('PFANS5013Store/getMyConProject', {})
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  this.optionsdate.push({
                    value: response[i].comproject_id,
                    lable: response[i].numbers + '_' + response[i].project_name,
                  });
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
      getGroupIdT(orglist, row) {
        if (orglist == '') {
          row.budgetcoding = '';
        }
        this.Redirict = '',
          row.departmentname = orglist;
        //ADD_FJL
        row.optionsT = [];
        row.budgetcoding = '';
        let butinfo = getOrgInfo(row.departmentname).encoding;
        let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
        if (dic.length > 0) {
          for (let i = 0; i < dic.length; i++) {
            if (butinfo === dic[i].value1) {
              row.optionsT.push({
                lable: dic[i].value2 + '_' + dic[i].value3,
                value: dic[i].code,
              });
            }
          }
        }
        //ADD_FJL  修改人员预算编码
        let group = getOrgInfo(orglist);
        if (group) {
          this.companyen = group.companyen;
          this.Redirict = group.redirict;
          // row.budgetcoding = group.encoding;
          // this.code17 = this.Redirict == '0' ? 'PJ121' : 'PJ134';
          // if (this.Redirict == '0') {
          //     if (row.plsummary == 'PJ111001') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ112';
          //
          //     } else if (row.plsummary == 'PJ111002') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ113';
          //
          //     } else if (row.plsummary == 'PJ111003') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ114';
          //
          //     } else if (row.plsummary == 'PJ111004') {
          //         row.accountcode = '',
          //             this.code16 = '';
          //
          //     } else if (row.plsummary == 'PJ111005') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ116';
          //
          //     } else if (row.plsummary == 'PJ111006') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ117';
          //
          //     } else if (row.plsummary == 'PJ111007') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ118';
          //
          //     } else if (row.plsummary == 'PJ111008') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ119';
          //
          //     } else if (row.plsummary == 'PJ111009') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ120';
          //
          //     } else if (row.plsummary == 'PJ111010') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ121';
          //
          //     } else if (row.plsummary == 'PJ111011') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ122';
          //
          //     } else if (row.plsummary == 'PJ111012') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ123';
          //
          //     } else if (row.plsummary == 'PJ111013') {
          //         row.accountcode = '',
          //             this.code16 = '';
          //
          //     } else if (row.plsummary == 'PJ111014') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ125';
          //
          //     }
          // }
          // else if (this.Redirict == '1' || this.Redirict == '') {
          //     if (row.plsummary == 'PJ111001') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ127';
          //
          //     } else if (row.plsummary == 'PJ111002') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ128';
          //
          //     } else if (row.plsummary == 'PJ111003') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ129';
          //
          //     } else if (row.plsummary == 'PJ111004') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ115';
          //
          //     } else if (row.plsummary == 'PJ111005') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ130';
          //
          //     } else if (row.plsummary == 'PJ111006') {
          //         row.accountcode = '',
          //             this.code16 = '';
          //
          //     } else if (row.plsummary == 'PJ111007') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ131';
          //
          //     } else if (row.plsummary == 'PJ111008') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ132';
          //
          //     } else if (row.plsummary == 'PJ111009') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ133';
          //
          //     } else if (row.plsummary == 'PJ111010') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ134';
          //
          //     } else if (row.plsummary == 'PJ111011') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ135';
          //
          //     } else if (row.plsummary == 'PJ111012') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ136';
          //
          //     } else if (row.plsummary == 'PJ111013') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ124';
          //
          //     } else if (row.plsummary == 'PJ111014') {
          //         row.accountcode = '',
          //             this.code16 = 'PJ137';
          //
          //     }
          // }
          if (this.Redirict == '0') {
            row.accoundoptionsdate = [];
            let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ119');
            for (let i = 0; i < dicnew.length; i++) {
              if (dicnew[i].code === 'PJ119004') {
                row.accoundoptionsdate.push({
                  value: dicnew[i].code,
                  lable: dicnew[i].value1,
                });
              }
            }
          } else if (this.Redirict == '1' || this.Redirict == '') {
            row.accoundoptionsdate = [];
            let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ132');
            for (let i = 0; i < dicnew.length; i++) {
              if (dicnew[i].code === 'PJ132004') {
                row.accoundoptionsdate.push({
                  value: dicnew[i].code,
                  lable: dicnew[i].value1,
                });
              }
            }
          }
        }
        this.budgetcodingcheck = row.budgetcoding;
      },
      getGroupIdR(orglist, row) {
        if (orglist == '') {
          row.budgetcoding = '';
        }
        this.Redirict = '',
          row.departmentname = orglist;
        //ADD_FJL
        row.optionsR = [];
        row.budgetcoding = '';
        let butinfo = getOrgInfo(row.departmentname).encoding;
        let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
        if (dic.length > 0) {
          for (let i = 0; i < dic.length; i++) {
            if (butinfo === dic[i].value1) {
              row.optionsR.push({
                lable: dic[i].value2 + '_' + dic[i].value3,
                value: dic[i].code,
              });
            }
          }
        }
        //ADD_FJL  修改人员预算编码
        let group = getOrgInfo(orglist);
        if (group) {
          this.companyen = group.companyen;
          this.Redirict = group.redirict;
          // row.budgetcoding = group.encoding;
          row.code17 = this.Redirict == '0' ? 'PJ121' : 'PJ134';
          if (this.Redirict == '0') {
            if (row.plsummary == 'PJ111001') {
              row.accountcode = '',
                row.code16 = 'PJ112';

            } else if (row.plsummary == 'PJ111002') {
              row.accountcode = '',
                row.code16 = 'PJ113';

            } else if (row.plsummary == 'PJ111003') {
              row.accountcode = '',
                row.code16 = 'PJ114';

            } else if (row.plsummary == 'PJ111004') {
              row.accountcode = '',
                row.code16 = '';

            } else if (row.plsummary == 'PJ111005') {
              row.accountcode = '',
                row.code16 = 'PJ116';

            } else if (row.plsummary == 'PJ111006') {
              row.accountcode = '',
                row.code16 = 'PJ117';

            } else if (row.plsummary == 'PJ111007') {
              row.accountcode = '',
                row.code16 = 'PJ118';

            } else if (row.plsummary == 'PJ111008') {
              row.accountcode = '',
                row.code16 = 'PJ119';

            } else if (row.plsummary == 'PJ111009') {
              row.accountcode = '',
                row.code16 = 'PJ120';

            } else if (row.plsummary == 'PJ111010') {
              row.accountcode = '',
                row.code16 = 'PJ121';

            } else if (row.plsummary == 'PJ111011') {
              row.accountcode = '',
                row.code16 = 'PJ122';

            } else if (row.plsummary == 'PJ111012') {
              row.accountcode = '',
                row.code16 = 'PJ123';

            } else if (row.plsummary == 'PJ111013') {
              row.accountcode = '',
                row.code16 = '';

            } else if (row.plsummary == 'PJ111014') {
              row.accountcode = '',
                row.code16 = 'PJ125';

            }
          } else if (this.Redirict == '1' || this.Redirict == '') {
            if (row.plsummary == 'PJ111001') {
              row.accountcode = '',
                row.code16 = 'PJ127';

            } else if (row.plsummary == 'PJ111002') {
              row.accountcode = '',
                row.code16 = 'PJ128';

            } else if (row.plsummary == 'PJ111003') {
              row.accountcode = '',
                row.code16 = 'PJ129';

            } else if (row.plsummary == 'PJ111004') {
              row.accountcode = '',
                row.code16 = 'PJ115';

            } else if (row.plsummary == 'PJ111005') {
              row.accountcode = '',
                row.code16 = 'PJ130';

            } else if (row.plsummary == 'PJ111006') {
              row.accountcode = '',
                row.code16 = '';

            } else if (row.plsummary == 'PJ111007') {
              row.accountcode = '',
                row.code16 = 'PJ131';

            } else if (row.plsummary == 'PJ111008') {
              row.accountcode = '',
                row.code16 = 'PJ132';

            } else if (row.plsummary == 'PJ111009') {
              row.accountcode = '',
                row.code16 = 'PJ133';

            } else if (row.plsummary == 'PJ111010') {
              row.accountcode = '',
                row.code16 = 'PJ134';

            } else if (row.plsummary == 'PJ111011') {
              row.accountcode = '',
                row.code16 = 'PJ135';

            } else if (row.plsummary == 'PJ111012') {
              row.accountcode = '',
                row.code16 = 'PJ136';

            } else if (row.plsummary == 'PJ111013') {
              row.accountcode = '',
                row.code16 = 'PJ124';

            } else if (row.plsummary == 'PJ111014') {
              row.accountcode = '',
                row.code16 = 'PJ137';

            }
          }
          if (this.Redirict == '0') {
            row.accoundoptionsdate = [];
            let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ119');
            for (let i = 0; i < dicnew.length; i++) {
              if (dicnew[i].code === 'PJ119004') {
                row.accoundoptionsdate.push({
                  value: dicnew[i].code,
                  lable: dicnew[i].value1,
                });
              }
            }
          } else if (this.Redirict == '1' || this.Redirict == '') {
            row.accoundoptionsdate = [];
            let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ132');
            for (let i = 0; i < dicnew.length; i++) {
              if (dicnew[i].code === 'PJ132004') {
                row.accoundoptionsdate.push({
                  value: dicnew[i].code,
                  lable: dicnew[i].value1,
                });
              }
            }
          }
        }
        this.budgetcodingcheck = row.budgetcoding;
      },
      getGroupIdP(orglist, row) {
        if (orglist == '') {
          row.budgetcoding = '';
        }
        this.Redirict = '',
          row.departmentname = orglist;
        //ADD_FJL
        row.optionsP = [];
        row.budgetcoding = '';
        let butinfo = getOrgInfo(row.departmentname).encoding;
        let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
        if (dic.length > 0) {
          for (let i = 0; i < dic.length; i++) {
            if (butinfo === dic[i].value1) {
              row.optionsP.push({
                lable: dic[i].value2 + '_' + dic[i].value3,
                value: dic[i].code,
              });
            }
          }
        }
        //ADD_FJL  修改人员预算编码
        let group = getOrgInfo(orglist);
        if (group) {
          this.companyen = group.companyen;
          this.Redirict = group.redirict;
          // row.budgetcoding = group.encoding;
          row.code17 = this.Redirict == '0' ? 'PJ121' : 'PJ134';
          // if (this.Redirict == '0') {
          //     if (row.plsummary == 'PJ111001') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ112';
          //
          //     } else if (row.plsummary == 'PJ111002') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ113';
          //
          //     } else if (row.plsummary == 'PJ111003') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ114';
          //
          //     } else if (row.plsummary == 'PJ111004') {
          //         row.accountcode = '',
          //           row.code16 = '';
          //
          //     } else if (row.plsummary == 'PJ111005') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ116';
          //
          //     } else if (row.plsummary == 'PJ111006') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ117';
          //
          //     } else if (row.plsummary == 'PJ111007') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ118';
          //
          //     } else if (row.plsummary == 'PJ111008') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ119';
          //
          //     } else if (row.plsummary == 'PJ111009') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ120';
          //
          //     } else if (row.plsummary == 'PJ111010') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ121';
          //
          //     } else if (row.plsummary == 'PJ111011') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ122';
          //
          //     } else if (row.plsummary == 'PJ111012') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ123';
          //
          //     } else if (row.plsummary == 'PJ111013') {
          //         row.accountcode = '',
          //           row.code16 = '';
          //
          //     } else if (row.plsummary == 'PJ111014') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ125';
          //
          //     }
          // }
          // else if (this.Redirict == '1' || this.Redirict == '') {
          //     if (row.plsummary == 'PJ111001') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ127';
          //
          //     } else if (row.plsummary == 'PJ111002') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ128';
          //
          //     } else if (row.plsummary == 'PJ111003') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ129';
          //
          //     } else if (row.plsummary == 'PJ111004') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ115';
          //
          //     } else if (row.plsummary == 'PJ111005') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ130';
          //
          //     } else if (row.plsummary == 'PJ111006') {
          //         row.accountcode = '',
          //           row.code16 = '';
          //
          //     } else if (row.plsummary == 'PJ111007') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ131';
          //
          //     } else if (row.plsummary == 'PJ111008') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ132';
          //
          //     } else if (row.plsummary == 'PJ111009') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ133';
          //
          //     } else if (row.plsummary == 'PJ111010') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ134';
          //
          //     } else if (row.plsummary == 'PJ111011') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ135';
          //
          //     } else if (row.plsummary == 'PJ111012') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ136';
          //
          //     } else if (row.plsummary == 'PJ111013') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ124';
          //
          //     } else if (row.plsummary == 'PJ111014') {
          //         row.accountcode = '',
          //           row.code16 = 'PJ137';
          //
          //     }
          // }
          if (this.Redirict == '0') {
            row.accoundoptionsdate = [];
            let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ119');
            for (let i = 0; i < dicnew.length; i++) {
              if (dicnew[i].code === 'PJ119004') {
                row.accoundoptionsdate.push({
                  value: dicnew[i].code,
                  lable: dicnew[i].value1,
                });
              }
            }
          } else if (this.Redirict == '1' || this.Redirict == '') {
            row.accoundoptionsdate = [];
            let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ132');
            for (let i = 0; i < dicnew.length; i++) {
              if (dicnew[i].code === 'PJ132004') {
                row.accoundoptionsdate.push({
                  value: dicnew[i].code,
                  lable: dicnew[i].value1,
                });
              }
            }
          }
        }
        this.budgetcodingcheck = row.budgetcoding;
      },
      getplsummary(row) {
        row.accountcode = '',
          row.plsummary = row.plsummary;
        if (this.Redirict == '0') {
          if (row.plsummary == 'PJ111001') {
            row.accountcode = '',
              row.code16 = 'PJ112';
            row.code17 = 'PJ112';
          } else if (row.plsummary == 'PJ111002') {
            row.accountcode = '',
              row.code16 = 'PJ113';
            row.code17 = 'PJ113';
          } else if (row.plsummary == 'PJ111003') {
            row.accountcode = '',
              row.code16 = 'PJ114';
            row.code17 = 'PJ114';
          } else if (row.plsummary == 'PJ111004') {
            row.accountcode = '',
              row.code16 = '';
            row.code17 = '';
          } else if (row.plsummary == 'PJ111005') {
            row.accountcode = '',
              row.code16 = 'PJ116';
            row.code17 = 'PJ116';
          } else if (row.plsummary == 'PJ111006') {
            row.accountcode = '',
              row.code16 = 'PJ117';
            row.code17 = 'PJ117';
          } else if (row.plsummary == 'PJ111007') {
            row.accountcode = '',
              row.code16 = 'PJ118';
            row.code17 = 'PJ118';
          } else if (row.plsummary == 'PJ111008') {
            row.accountcode = '',
              row.code16 = 'PJ119';
            row.code17 = 'PJ119';
          } else if (row.plsummary == 'PJ111009') {
            row.accountcode = '',
              row.code16 = 'PJ120';
            row.code17 = 'PJ120';
          } else if (row.plsummary == 'PJ111010') {
            row.accountcode = '',
              row.code16 = 'PJ121';
            row.code17 = 'PJ121';
          } else if (row.plsummary == 'PJ111011') {
            row.accountcode = '',
              row.code16 = 'PJ122';
            row.code17 = 'PJ122';
          } else if (row.plsummary == 'PJ111012') {
            row.accountcode = '',
              row.code16 = 'PJ123';
            row.code17 = 'PJ123';
          } else if (row.plsummary == 'PJ111013') {
            row.accountcode = '',
              row.code16 = '';
            row.code17 = '';
          } else if (row.plsummary == 'PJ111014') {
            row.accountcode = '',
              row.code16 = 'PJ125';
            row.code17 = 'PJ125';
          }
        } else if (this.Redirict == '1' || this.Redirict == '') {
          if (row.plsummary == 'PJ111001') {
            row.accountcode = '',
              row.code16 = 'PJ127';
            row.code17 = 'PJ127';
          } else if (row.plsummary == 'PJ111002') {
            row.accountcode = '',
              row.code16 = 'PJ128';
            row.code17 = 'PJ128';
          } else if (row.plsummary == 'PJ111003') {
            row.accountcode = '',
              row.code16 = 'PJ129';
            row.code17 = 'PJ129';
          } else if (row.plsummary == 'PJ111004') {
            row.accountcode = '',
              row.code16 = 'PJ115';
            row.code17 = 'PJ115';
          } else if (row.plsummary == 'PJ111005') {
            row.accountcode = '',
              row.code16 = 'PJ130';
            row.code17 = 'PJ130';
          } else if (row.plsummary == 'PJ111006') {
            row.accountcode = '',
              row.code16 = '';
            row.code17 = '';
          } else if (row.plsummary == 'PJ111007') {
            row.accountcode = '',
              row.code16 = 'PJ131';
            row.code17 = 'PJ131';
          } else if (row.plsummary == 'PJ111008') {
            row.accountcode = '',
              row.code16 = 'PJ132';
            row.code17 = 'PJ132';
          } else if (row.plsummary == 'PJ111009') {
            row.accountcode = '',
              row.code16 = 'PJ133';
            row.code17 = 'PJ133';
          } else if (row.plsummary == 'PJ111010') {
            row.accountcode = '',
              row.code16 = 'PJ134';
            row.code17 = 'PJ134';
          } else if (row.plsummary == 'PJ111011') {
            row.accountcode = '',
              row.code16 = 'PJ135';
            row.code17 = 'PJ135';
          } else if (row.plsummary == 'PJ111012') {
            row.accountcode = '',
              row.code16 = 'PJ136';
            row.code17 = 'PJ136';
          } else if (row.plsummary == 'PJ111013') {
            row.accountcode = '',
              row.code16 = 'PJ124';
            row.code17 = 'PJ124';
          } else if (row.plsummary == 'PJ111014') {
            row.accountcode = '',
              row.code16 = 'PJ137';
            row.code17 = 'PJ137';
          }
        }

      },
      clickdata(row) {
        if (row.servicehours == null) {
          row.budgetcoding = this.budgetcodingcheck;
          row.subjectnumber = this.checkCode2;
          this.checkdisable = false;
        } else {
          this.budgetcodingcheck = row.budgetcoding;
          row.subjectnumber = this.checkcode;
          row.budgetcoding = '000000';
          this.checkdisable = true;
        }
      },
      getaccoundcode(row) {
        let dic = getDictionaryInfo(row.accountcode);
        if (dic) {
          row.subjectnumber = dic.value2;
        }
      },
      getcode(val, row) {
        row.accountcode = val;
        let dic = getDictionaryInfo(val);
        if (dic) {
          row.subjectnumber = dic.value2;
          this.checkCode2 = dic.value2;
          this.checkCode1 = dic.value3;
          if (dic.value3 == 1) {
            this.checktime = true;
            this.checkcode = dic.value4;
          }

        }
      },
      changesummoney(row) {
        row.facetax = row.invoiceamount - row.excludingtax;
      },
      getrate(row) {
        let taxratevalue = 0;
        if (row.taxrate == 'PJ071001') {
          this.taxrateValue = getDictionaryInfo('PJ071001').value1;
        } else if (row.taxrate == 'PJ071002') {
          this.taxrateValue = getDictionaryInfo('PJ071002').value1;
        } else if (row.taxrate == 'PJ071003') {
          this.taxrateValue = getDictionaryInfo('PJ071003').value1;
        } else if (row.taxrate == 'PJ071004') {
          this.taxrateValue = getDictionaryInfo('PJ071004').value1;
        }
        taxratevalue = 1 + Number(this.taxrateValue);
        row.facetax = parseFloat((row.invoiceamount / (taxratevalue) * this.taxrateValue)).toFixed(2);
        row.excludingtax = row.invoiceamount - row.facetax;
      },
      getPaymentinvoicetype(val, row) {
        row.excludingtax = '';
        row.facetax = '';
        row.invoicetype = val;
        row.taxrate = ' ';
      },
      changeSum(row) {
        let taxratevalue = 0;
        if (row.taxrate == 'PJ071001') {
          this.taxrateValue = getDictionaryInfo('PJ071001').value1;
        } else if (row.taxrate == 'PJ071002') {
          this.taxrateValue = getDictionaryInfo('PJ071002').value1;
        } else if (row.taxrate == 'PJ071003') {
          this.taxrateValue = getDictionaryInfo('PJ071003').value1;
        } else if (row.taxrate == 'PJ071004') {
          this.taxrateValue = getDictionaryInfo('PJ071004').value1;
        }
        taxratevalue = 1 + Number(this.taxrateValue);
        row.facetax = parseFloat((row.invoiceamount / (taxratevalue) * this.taxrateValue)).toFixed(2);
        row.excludingtax = row.invoiceamount - row.facetax;
        for (let j = 0; j < this.tableF.length; j++) {
          if (this.tableF[j].invoiceamount != 0) {
            this.form.tormb = '';
            this.disablecheck = true;
            break;
          } else {
            this.disablecheck = false;
            continue;
          }
        }
        for (let j = 0; j < this.tableT.length; j++) {
          this.form.tormb = '';
          this.disa = true;
        }
        for (let j = 0; j < this.tableP.length; j++) {
          this.tableP[j].foreigncurrency = '';
          this.tableP[j].currencyrate = '';
          this.tableP[j].tormb = '';
          this.tableP[j].currency = '';
          this.form.tormb = '';
          this.disa = true;
        }
        for (let j = 0; j < this.tableR.length; j++) {
          this.tableR[j].foreigncurrency = '';
          this.tableR[j].currencyrate = '';
          this.tableR[j].tormb = '';
          this.tableR[j].currency = '';
          this.form.tormb = '';
          this.disa = true;
        }

      },
      getUserids(val) {
        if (val === '') {
          this.form.code = '';
          this.Codecheck = '';
        } else {
          this.form.code = getUserInfo(val).userinfo.caiwupersonalcode;
          this.Codecheck = getUserInfo(val).userinfo.caiwupersonalcode;
        }
        this.userlist = val;
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        let num = getUserInfo(val).userinfo.extension;
        if (num) {
          this.form.telephone = num;
        }
        if (rst) {
          this.centerid = rst.centerNmae;
          this.groupid = rst.groupNmae;
          this.teamid = rst.teamNmae;
          this.form.centerid = rst.centerId;
          this.form.groupid = rst.groupId;
          this.form.teamid = rst.teamId;
        } else {
          this.centerid = '';
          this.groupid = '';
          this.teamid = '';
          this.form.centerid = '';
          this.form.groupid = '';
          this.form.teamid = '';
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
        this.updateSta();
        // this.buttonClick('save');
      },
      start() {
        this.form.status = '2';
        this.updateSta();
        // this.buttonClick('save');
      },
      end() {
        this.form.status = '0';
        this.updateSta();
        // this.buttonClick('save');
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
          this.form.code = this.Codecheck;
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
        if (this.form.type === 'PJ001002') {
          if (this.tableP.length > 1) {
            for (let i = 0; i < this.tableP.length; i++) {
              for (let j = 1; j < this.tableP.length; j++) {
                if (this.tableP[i].currency != this.tableP[j].currency) {
                  error = error + 1;
                  Message({
                    message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  break;
                }
                continue;
              }
              break;
            }
          }
          if (error == '0') {
            if (this.tableP.length > 0) {
              for (let i = 0; i < this.tableP.length; i++) {
                if (this.tableR[0].currency != '' && this.tableP[0].currency != '') {
                  for (let j = 0; j < this.tableR.length; j++) {
                    if (this.tableP[i].currency != this.tableR[j].currency) {
                      error = error + 1;
                      Message({
                        message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                  }
                }
                break;
              }
            }
          }
          if (error == '0') {
            if (this.tableR.length > 0) {
              for (let i = 0; i < this.tableR.length; i++) {
                if (this.tableP[0].currency != '' && this.tableR[0].currency != '') {
                  for (let j = 0; j < this.tableP.length; j++) {
                    if (this.tableR[i].currency != this.tableP[j].currency) {
                      error = error + 1;
                      Message({
                        message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                  }
                  break;
                }
              }
            }
          }
          if (error == '0') {
            if (this.tableR.length > 1) {
              for (let i = 0; i < this.tableR.length; i++) {
                for (let j = 1; j < this.tableR.length; j++) {
                  if (this.tableR[i].currency != this.tableR[j].currency) {
                    error = error + 1;
                    Message({
                      message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    break;
                  }
                  continue;
                }
                break;
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
            accountcode: '',
            departmentname: '',
            budgetcoding: '',
            plsummary: '',
            region: '',
            subjectnumber: '',
            vehicle: '',
            startingpoint: '',
            rmb: '',
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
            external: '',
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
          this.tableF = [{
            invoicenumber: this.$t('label.PFANS1012FORMVIEW_NUMBERZP') + 1,
            invoicetype: '',
            invoiceamount: '',
            taxrate: '',
            excludingtax: '',
            facetax: '',
          }];
        }
        this.checkoptionsdata();
      },
      addRow() {
        this.tableT.push({
          trafficdetails_id: '',
          publicexpenseid: '',
          trafficdate: '',
          accountcode: '',
          departmentname: '',
          budgetcoding: '',
          subjectnumber: '',
          plsummary: 'PJ111008',
          region: '',
          vehicle: '',
          startingpoint: '',
          rmb: '',
          annexno: '',
          rowindex: '',
          display: true,
        });
      },
      addRow7() {
        let b;
        let c;
        if (this.tableF.length > 0) {
          b = this.tableF.length + 1;
          c = this.$t('label.PFANS1012FORMVIEW_NUMBERZP') + b;
        }
        this.tableF.push({
          invoice_id: '',
          publicexpenseid: '',
          invoicenumber: c,
          invoicetype: '',
          invoiceamount: '',
          taxrate: '',
          excludingtax: '',
          facetax: '',
        });
        this.checkoptionsdata();
      },
      addRow3() {
        this.tableP.push({
          publicexpenseid: '',
          purchasedetails_id: '',
          invoicenumber: '',
          departmentname: '',
          budgetcoding: '',
          purchasedetailsdate: '',
          procurementdetails: '',
          accountcode: '',
          plsummary: '',
          external: '',
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
          departmentname: '',
          accountcode: '',
          plsummary: '',
          subjectnumber: '',
          budgetcoding: '',
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
          this.form.rmbexpenditure = sums[9];
        } else if (this.checkCode1 == '1') {
          this.form.rmbexpenditure = this.tablePValue[9] + sums[9];
        } else {
          this.form.rmbexpenditure = this.tablePValue[9] + sums[8];
        }
      },
      getforeigncurrency(sums) {
        if (this.form.type === 'PJ001001') {
          this.form.foreigncurrency = '0';
        } else if (this.checkCode1 == '1') {
          this.form.foreigncurrency = this.tablePValue[10] + sums[10];
        } else {
          this.form.foreigncurrency = this.tablePValue[10] + sums[9];
        }
      },
      changeRMB(newValue) {
        for (let j = 0; j < this.tableF.length; j++) {
          let taxratevalue = 0;
          if (newValue.invoicenumber == this.tableF[j].invoicenumber) {
            if (newValue.rmb != '') {
              if (this.tableF[j].taxrate != '') {
                if (this.tableF[j].taxrate == 'PJ071001') {
                  this.taxrateValue = getDictionaryInfo('PJ071001').value1;
                } else if (this.tableF[j].taxrate == 'PJ071002') {
                  this.taxrateValue = getDictionaryInfo('PJ071002').value1;
                } else if (this.tableF[j].taxrate == 'PJ071003') {
                  this.taxrateValue = getDictionaryInfo('PJ071003').value1;
                } else if (this.tableF[j].taxrate == 'PJ071004') {
                  this.taxrateValue = getDictionaryInfo('PJ071004').value1;
                }
                taxratevalue = 1 + Number(this.taxrateValue);
                newValue.taxes = parseFloat((newValue.rmb / (taxratevalue) * this.taxrateValue)).toFixed(2);
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
        this.currentRow2 = val.suppliercode;
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
          .dispatch('PFANS6003Store/getsupplierinfor2')
          .then(response => {
            this.gridData = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              vote.suppliername = response[i].supchinese;
              vote.payeename = response[i].payeename;
              vote.suppliercode = response[i].suppliercode;
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
              this.baseInfo.publicexpense = [];
              this.baseInfo.trafficdetails = [];
              this.baseInfo.purchasedetails = [];
              this.baseInfo.otherdetails = [];
              this.baseInfo.invoice = [];
              this.form.user_id = this.userlist;
              if (this.form.tormb === undefined) {
                this.form.tormb = '';
              }
              this.form.moneys = Math.round((this.form.rmbexpenditure + this.form.tormb) * 100) / 100;
              this.form.reimbursementdate = moment(this.form.reimbursementdate).format('YYYY-MM-DD');
              //add-ws-4/27-BS科目根据收款方编码值，赋01
              if (this.form.payeecode != '' && this.form.payeecode != null) {
                if (this.form.payeecode === '00027358') {
                  this.form.bsexternal = '1';
                } else {
                  this.form.bsexternal = '0';
                }
              }
              //add-ws-4/27-BS科目根据收款方编码值，赋01
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
                  if (this.tableT[i].trafficdate !== '' || this.tableT[i].subjectnumber !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
                    || this.tableT[i].rmb > 0 || this.tableT[i].annexno !== '') {
                    this.baseInfo.trafficdetails.push(
                      {
                        trafficdetails_id: this.tableT[i].trafficdetails_id,
                        publicexpenseid: this.tableT[i].publicexpenseid,
                        trafficdate: this.tableT[i].trafficdate,
                        accountcode: this.tableT[i].accountcode,
                        plsummary: this.tableT[i].plsummary,
                        departmentname: this.tableT[i].departmentname,
                        budgetcoding: this.tableT[i].budgetcoding,
                        subjectnumber: this.tableT[i].subjectnumber,
                        region: this.tableT[i].region,
                        vehicle: this.tableT[i].vehicle,
                        startingpoint: this.tableT[i].startingpoint,
                        rmb: this.tableT[i].rmb,
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
                        external: this.tableP[i].external,
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
              //ADD-WS-增加公共费用精算书check
              if (this.form.type === 'PJ001001') {
                for (let i = 0; i < this.tableT.length; i++) {
                  if (this.tableT[i].rmb > 0) {
                    if (this.tableT[i].budgetcoding === '') {
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_BUDGET'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                    if (this.tableT[i].subjectnumber === '') {
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_ACCOUNTB'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                  }
                }
              } else if (this.form.type === 'PJ001002') {
                for (let i = 0; i < this.tableR.length; i++) {
                  if (this.tableR[i].rmb > 0) {
                    if (this.tableR[i].budgetcoding === '') {
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_BUDGET'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                    if (this.tableR[i].subjectnumber === '') {
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_ACCOUNTB'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                    if (this.tableR[i].plsummary === '') {
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_PL'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                  }
                }
                for (let i = 0; i < this.tableP.length; i++) {
                  if (this.tableP[i].rmb > 0) {
                    if (this.tableP[i].budgetcoding === '') {
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_BUDGET'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                    if (this.tableP[i].subjectnumber === '') {
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_ACCOUNTB'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                    if (this.tableP[i].plsummary === '') {
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_PL'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                  }
                }
              }
              //ADD-WS-增加公共费用精算书check
              if (this.form.type === 'PJ001001') {
                for (let j = 0; j < this.tableF.length; j++) {
                  let summoney = 0;
                  for (let i = 0; i < this.tableT.length; i++) {
                    if (this.tableT[i].trafficdate !== '' || this.tableT[i].subjectnumber !== '' || this.tableT[i].invoicenumber !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
                      || this.tableT[i].rmb > 0 || this.tableT[i].foreigncurrency > 0 || this.tableT[i].annexno !== '') {
                      if (this.tableT[i].invoicenumber == this.tableF[j].invoicenumber) {
                        if (this.tableT[i].rmb != '0') {
                          summoney += this.tableT[i].rmb;
                          continue;
                        }
                      }
                    }
                  }
                  if (summoney != this.tableF[j].invoiceamount) {
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
                          summoney += this.tableP[i].rmb;
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
                          sumMoney += this.tableR[i].rmb;
                          continue;
                        }
                      }
                    }
                  }
                  sumout = summoney + sumMoney;
                  if (sumout != this.tableF[j].invoiceamount) {
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

            } else {
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }

          });
        }
      },
      updateSta() {
        this.baseInfo = {};
        this.baseInfo.publicexpense = [];
        this.baseInfo.trafficdetails = [];
        this.baseInfo.purchasedetails = [];
        this.baseInfo.otherdetails = [];
        this.baseInfo.invoice = [];
        this.form.user_id = this.userlist;
        if (this.form.tormb === undefined) {
          this.form.tormb = '';
        }
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
            if (this.tableT[i].trafficdate !== '' || this.tableT[i].subjectnumber !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
              || this.tableT[i].rmb > 0 || this.tableT[i].annexno !== '') {
              this.baseInfo.trafficdetails.push(
                {
                  trafficdetails_id: this.tableT[i].trafficdetails_id,
                  publicexpenseid: this.tableT[i].publicexpenseid,
                  trafficdate: this.tableT[i].trafficdate,
                  accountcode: this.tableT[i].accountcode,
                  plsummary: this.tableT[i].plsummary,
                  departmentname: this.tableT[i].departmentname,
                  budgetcoding: this.tableT[i].budgetcoding,
                  subjectnumber: this.tableT[i].subjectnumber,
                  region: this.tableT[i].region,
                  vehicle: this.tableT[i].vehicle,
                  startingpoint: this.tableT[i].startingpoint,
                  rmb: this.tableT[i].rmb,
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
                  external: this.tableP[i].external,
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
        this.loading = true;
        this.baseInfo.publicexpense.publicexpenseid = this.$route.params._id;
        this.$store
          .dispatch('PFANS1012Store/update', this.baseInfo)
          .then(response => {
            this.data = response;
            this.loading = false;
            // if (val !== 'update') {
            //     Message({
            //         message: this.$t('normal.success_02'),
            //         type: 'success',
            //         duration: 5 * 1000,
            //     });
            //     this.$router.push({
            //         name: 'PFANS1012View',
            //     });
            // }
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
