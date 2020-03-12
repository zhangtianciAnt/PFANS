<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      :title="title"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
      v-loading="loading"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-row style="padding-top: 2%;padding-bottom: 2%">
            <el-col :span="8">
              <el-radio
                :disabled="!disable"
                @change="gettype"
                label="0"
                v-model="form.type"
              >{{$t('label.PFANS1013FORMVIEW_DOMESTIC')}}
              </el-radio>
              <el-radio
                :disabled="!disable"
                @change="gettype"
                label="1"
                v-model="form.type"
              >{{$t('label.PFANS1013FORMVIEW_ABROAD')}}
              </el-radio>
            </el-col>
          </el-row>
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1013VIEW_TOTAL')" name="first">
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
                    <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_TELEPHONE')" prop="telephone">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_RELATION')" prop="business_id">
                      <el-select :disabled="!disable" @change="changebusiness" style="width:20vw"
                                 v-model="form.business_id">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in relations">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_PLACE')">
                      <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.place"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1013VIEW_STARTDATE')">
                        <el-date-picker
                          :disabled="true"
                          style="width:20vw"
                          type="date"
                          v-model="form.startdate">
                        </el-date-picker>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_ENDDATE')">
                      <el-date-picker
                        :disabled="true"
                        style="width:20vw"
                        type="date"
                        v-model="form.enddate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_DATENUMBER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.datenumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                      <dicselect
                        :code="code1"
                        :data="form.budgetunit"
                        :disabled="!disable"
                        :multiple="multiple"
                        @change="getbudgetunit"
                        style="width:20vw"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013FORMVIEW_LOAN')">
                      <el-select :disabled="!disable" @change="change2" style="width:20vw" v-model="form.loan">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in loans">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_LOANAMOUNT')">
                      <el-input-number
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        controls-position="right"
                        v-model="form.loanamount"
                        style="width:20vw"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_TOTALPAY')">
                      <el-input-number
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        @change="getMoney"
                        controls-position="right"
                        v-model="form.totalpay"
                        style="width:20vw"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_BALANCE')">
                      <el-input-number
                        :disabled="true"
                        :max="9999999999"
                        :precision="2"
                        controls-position="right"
                        v-model="form.balance"
                        style="width:20vw"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
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
                  <el-col :span="8" v-show="show2">
                    <el-form-item :label="$t('label.PFANS1002VIEW_LEVEL')">
                      <el-input :disabled="true" v-model="form.level" style="width: 20vw">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-show="show2">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ABROADBUSINESS')">
                      <el-switch
                        :disabled="true"
                        active-value="1"
                        inactive-value="0"
                        v-model="form.abroadbusiness"
                      >
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--外???-->
                <el-row v-show="show2">
                  <el-collapse>
                    <el-collapse-item>
                      <template slot="title">
                        <span class="collapse_Title">{{$t('label.PFANS1013FORMVIEW_CURRENCYEXCHANGE')}}</span>
                      </template>
                      <el-table :data="tableW"
                                header-cell-class-name="sub_bg_color_blue" stripe border style="width: 70vw">
                        <el-table-column :label="$t('label.PFANS1002VIEW_CURRENCY')" align="center" width="180">
                          <template slot-scope="scope">
                            <dicselect :code="code3"
                                       :data="scope.row.currency"
                                       :disabled="!disable"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getCurrency"
                                       style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1013FORMVIEW_CURRENCYEXCHANGERATE')" align="center"
                                         width="180"
                                         prop="currencyexchangerate">
                          <template slot-scope="scope">
                            <el-input :disabled="true" v-model="scope.row.currencyexchangerate" style="width: 100%">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1004VIEW_AMOUNT')" align="center" width="180">
                          <template slot-scope="scope">
                            <el-input-number :min="0" :precision="2" :max="9999999"
                                             controls-position="right" :no="scope.row" @change="changeSum(scope.row)"
                                             :step="1" v-model="scope.row.amount" style="width: 100%">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1013FORMVIEW_EXCHANGERATE')" align="center" width="180">
                          <template slot-scope="scope">
                            <el-input-number :min="0" :precision="2" :max="9999999"
                                             controls-position="right" :no="scope.row" @change="changeSum(scope.row)"
                                             :step="1" v-model="scope.row.exchangerate" style="width: 100%">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1013FORMVIEW_EXCHANGERMB')" align="center" width="180"
                                         prop="exchangermb">
                          <template slot-scope="scope">
                            <el-input-number :min="0" :precision="2" :max="9999999"
                                             controls-position="right" :no="scope.row" @change="changeSum(scope.row)"
                                             :step="1" v-model="scope.row.exchangermb" style="width: 100%">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" align="center" width="180">
                          <template slot-scope="scope">
                            <el-button
                              :disabled="!disable"
                              @click.native.prevent="deleteRow6(scope.$index, tableW)"
                              plain
                              size="small"
                              type="danger"
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              :disabled="!disable"
                              @click="addRow6()"
                              plain
                              size="small"
                              type="primary"
                            >{{$t('button.insert')}}
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1013FORMVIEW_USEXCHANGERATE')">
                          <el-input :disabled="true" v-model="form.usexchangerate" style="width:20vw">
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-collapse-item>
                  </el-collapse>
                </el-row>
                <el-row>
                  <el-collapse>
                    <el-collapse-item>
                      <template slot="title">
                        <span class="collapse_Title">{{$t('label.PFANS1012FORMVIEW_INVOICEI')}}</span>
                      </template>
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
                            <dicselect :code="code12"
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
                              @click.native.prevent="deleteRow5(scope.$index, tableF)"
                              plain
                              size="small"
                              type="danger"
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              :disabled="!disable"
                              @click="addRow5()"
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
                </el-row>
                <el-row>
                  <el-collapse>
                    <el-collapse-item>
                      <template slot="title">
                        <span class="collapse_Title">{{$t('label.PFANS1012FORMVIEW_SUBTOTAL')}}</span>
                      </template>
                      <el-col :span="24">
                        <el-table :data="tableData"
                                  :summary-method="getDsummaries"
                                  header-cell-class-name="sub_bg_color_blue"
                                  show-summary
                                  v-if="showdata"
                                  stripe border
                                  style="width: 46vw">
                          <el-table-column :label="$t('label.PFANS1013FORMVIEW_COSTITEM')" align="center">
                            <template slot-scope="scope">
                              <dicselect :code="code14"
                                         :data="scope.row.costitem"
                                         :disabled="!disable"
                                         :multiple="multiple"
                                         :no="scope.row"
                                         @change="getcostitem">
                              </dicselect>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center" prop="taxes"
                                           width="200">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="true"
                                :precision="2"
                                controls-position="right"
                                style="width: 100%"
                                v-model="scope.row.taxes">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1013FORMVIEW_RMB')" align="center" prop="rmb">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="true"
                                :precision="2"
                                @change="getValue"
                                controls-position="right"
                                style="width: 100%"
                                v-model="scope.row.rmb">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-col>
                      <el-row>
                        <el-col :span="24">
                          <el-table :data="tableData2"
                                    :summary-method="getsummaries"
                                    header-cell-class-name="sub_bg_color_blue"
                                    show-summary
                                    v-if="showdata2"
                                    stripe border
                                    style="width: 70vw">
                            <el-table-column :label="$t('label.PFANS1013FORMVIEW_COSTITEM')" align="center" width="200">
                              <template slot-scope="scope">
                                <dicselect :code="code14"
                                           :data="scope.row.costitem"
                                           :disabled="!disable"
                                           :multiple="multiple"
                                           :no="scope.row"
                                           @change="getcostitem">
                                </dicselect>
                              </template>
                            </el-table-column>
                            <el-table-column :label="$t('label.PFANS1013VIEW_RATECURRENCY')" align="center"
                                             prop="ratecurrency"
                                             width="200">
                              <template slot-scope="scope">
                                <el-input-number
                                  :disabled="true"
                                  :no="scope.row"
                                  :precision="2"
                                  @change="getValue2"
                                  controls-position="right"
                                  style="width: 100%"
                                  v-model="scope.row.ratecurrency">
                                </el-input-number>
                              </template>
                            </el-table-column>
                            <el-table-column :label="$t('label.PFANS1013VIEW_USDCURRENCY')" align="center"
                                             prop="usdcurrency"
                                             width="200">
                              <template slot-scope="scope">
                                <el-input-number
                                  :disabled="true"
                                  :no="scope.row"
                                  :precision="2"
                                  @change="getValue2"
                                  controls-position="right"
                                  style="width: 100%"
                                  v-model="scope.row.usdcurrency">
                                </el-input-number>
                              </template>
                            </el-table-column>
                            <el-table-column :label="$t('label.PFANS1013VIEW_JPYCURRENCY')" align="center"
                                             prop="jpycurrency"
                                             width="200">
                              <template slot-scope="scope">
                                <el-input-number
                                  :disabled="true"
                                  :no="scope.row"
                                  :precision="2"
                                  @change="getValue2"
                                  controls-position="right"
                                  style="width: 100%"
                                  v-model="scope.row.jpycurrency">
                                </el-input-number>
                              </template>
                            </el-table-column>
                            <el-table-column :label="$t('label.PFANS1013FORMVIEW_RMB')" align="center" prop="rmb"
                                             width="200">
                              <template slot-scope="scope">
                                <el-input-number
                                  :disabled="true"
                                  :no="scope.row"
                                  :precision="2"
                                  @change="getValue2"
                                  controls-position="right"
                                  style="width: 100%"
                                  v-model="scope.row.rmb">
                                </el-input-number>
                              </template>
                            </el-table-column>
                            <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center" prop="taxes"
                                             width="200">
                              <template slot-scope="scope">
                                <el-input-number
                                  :disabled="true"
                                  :precision="2"
                                  controls-position="right"
                                  style="width: 100%"
                                  v-model="scope.row.taxes">
                                </el-input-number>
                              </template>
                            </el-table-column>
                            <el-table-column :label="$t('label.PFANS1013FORMVIEW_TOTAL')" align="center" prop="total"
                                             width="200">
                              <template slot-scope="scope">
                                <el-input-number
                                  :disabled="true"
                                  :no="scope.row"
                                  :precision="2"
                                  @change="getValue2"
                                  controls-position="right"
                                  style="width: 100%"
                                  v-model="scope.row.total">
                                </el-input-number>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                    </el-collapse-item>
                  </el-collapse>
                </el-row>
              </div>
            </el-tab-pane>
            <!--            第二?-->
            <el-tab-pane :label="$t('label.PFANS1013VIEW_TRAFFIC')"
                         :disabled="this.form.business_id === '' ? true : false" name="second">
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableT" :summary-method="getTsummaries" header-cell-class-name="sub_bg_color_blue"
                            show-summary stripe border>
                    <el-table-column :label="$t('label.date')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-date-picker :disabled="!disable" style="width: 100%"
                                        v-model="scope.row.trafficdate"></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-select style="width: 100%" v-model="scope.row.invoicenumber">
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
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_EXPENSES')" align="center" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code14"
                                   :data="scope.row.costitem"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getcostitem">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNTB')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.subjectnumber">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_REGION')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.region">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_VEHICLE')" align="center" width="200">
                      <template slot-scope="scope">
                        <dicselect
                          :code="code15"
                          :data="scope.row.vehicle"
                          :disabled="!disable"
                          :no="scope.row"
                          @change="getvehicle"
                        ></dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_STARTINGPOINT')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-tooltip :content="scope.row.startingpoint"
                                    :disabled="scope.row.startingpoint===''?true:false"
                                    class="item" effect="light"
                                    placement="top">
                          <el-input :disabled="!disable" maxlength="20" style="width: 100%"
                                    v-model="scope.row.startingpoint"/>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :max="1000000000"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changeRMB(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.rmb"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center" prop="taxes"
                                     width="150">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="true"
                          :precision="2"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.taxes">
                        </el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center"
                                     prop="foreigncurrency"
                                     v-if="showforeigncurrency" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :max="1000000000"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changeForeigncurrency(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.foreigncurrency"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.annexno">
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

            <!--            第三?-->
            <el-tab-pane :label="$t('label.PFANS1013VIEW_ACCOMMODATION')"
                         :disabled="this.form.business_id === '' ? true : false" name="third">
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableA" :summary-method="getAsummaries"
                            header-cell-class-name="sub_bg_color_blue"
                            show-summary stripe border>
                    <el-table-column :label="$t('label.date')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-date-picker :disabled="!disable" style="width: 100%" v-model="scope.row.accommodationdate">
                        </el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_NEXTDAY')" align="center" width="80">
                      <template slot-scope="scope">
                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.nextday">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-select style="width: 100%" v-model="scope.row.invoicenumber">
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
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_AEXPENSES')" align="center" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code14"
                                   :data="scope.row.costitem"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getcostitem">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNTB')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.subjectnumber">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_ACTIVITYCONTENT')" align="center" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code4"
                                   :data="scope.row.activitycontent"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getactivitycontent">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_VEHICLE')" align="center" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code5"
                                   :data="scope.row.vehicleon"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getvehicleon"
                                   v-show="showrow3">
                        </dicselect>
                        <dicselect :code="code6"
                                   :data="scope.row.vehiclein"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getvehiclein"
                                   v-show="showrow4">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_MOVEMENTTIME')" align="center" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code7"
                                   :data="scope.row.movementtime"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getmovementtime">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1002VIEW_REGION')" align="center" v-if="showAout"
                                     width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code9"
                                   :data="scope.row.region"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getexitarea">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_CITY')" align="center" v-else width="200">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" :no="scope.row" @blur="getCity(scope.row)" style="width: 100%"
                                  v-model="scope.row.city">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_FACILITYTYPE')" align="center" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code10"
                                   :data="scope.row.facilitytypeon"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getfacilitytypeon"
                                   v-show="showrow">
                        </dicselect>
                        <dicselect :code="code8"
                                   :data="scope.row.facilitytypein"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getfacilitytypein"
                                   v-show="showrow2">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_FACILITYNAME')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" maxlength="20" v-model="scope.row.facilityname">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_ACCOMMODATIONALLOWANCE')" align="center"
                                     prop="accommodationallowance" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="scope.row.disaccommod"
                          :max="1000000000"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changeaccommodationallowance(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.accommodationallowance"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_ACCOMMODATION')" align="center"
                                     prop="accommodation"
                                     v-if="showAout" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="scope.row.disaccommod"
                          :max="1000000000"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changeaccommodation(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.accommodation"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_TRAVELALLOWANCE')" align="center"
                                     prop="travelallowance"
                                     v-else width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="true"
                          :max="1000000000"
                          :min="0"
                          :precision="2"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.travelallowance"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_TRAVEL')" align="center" prop="travel"
                                     v-if="showAout" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="true"
                          :max="1000000000"
                          :min="0"
                          :precision="2"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.travel"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_RELATIVES')" align="center" prop="relatives"
                                     v-else
                                     width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled=true
                          :max="1000000000"
                          :min="0"
                          :precision="2"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.relatives"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_TRAINTICK')" align="center" v-if="showAinner"
                                     width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="scope.row.showtick"
                          :max="1000000000"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="gettrain(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.traintick"
                        ></el-input-number>
                      </template>
                    </el-table-column>

                    <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" maxlength="36" v-model="scope.row.annexno">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.operation')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-button
                          :disabled="!disable"
                          @click.native.prevent="deleteRow3(scope.$index, tableA)"
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
            </el-tab-pane>

            <!--            第四?-->
            <el-tab-pane :label="$t('label.PFANS1012VIEW_OTHER')"
                         :disabled="this.form.business_id === '' ? true : false" name="fourth">
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableR" :summary-method="getRsummaries" header-cell-class-name="sub_bg_color_blue"
                            show-summary stripe border>
                    <el-table-column :label="$t('label.date')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-date-picker :disabled="!disable" style="width: 100%" v-model="scope.row.otherdetailsdate">
                        </el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-select style="width: 100%" v-model="scope.row.invoicenumber">
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
                    <el-table-column :label="$t('label.PFANS1012VIEW_COSTITEM')" align="center" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code18"
                                   :data="scope.row.costitem"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getcostitem">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="150"
                                     v-if="checkStatus != false">
                      <template slot-scope="scope">
                        <dicselect :code="code11"
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
                    <el-table-column :label="$t('label.PFANS1012VIEW_ABSTRACT')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.remarks">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="200">
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
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center" prop="taxes"
                                     width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="true"
                          :precision="2"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.taxes">
                        </el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center"
                                     prop="foreigncurrency"
                                     v-if="showforeigncurrency" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :max="1000000000"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changeForeigncurrency(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.foreigncurrency"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="200">
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
  import {getDictionaryInfo, getDictionaryInfode, getOrgInfo, getOrgInfoByUserId} from '@/utils/customize';
  import dicselect from '../../../components/dicselect';
  import org from '../../../components/org';
  import moment from 'moment';

  export default {
    name: 'PFANS1013FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
      org,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!this.form.userid || this.form.userid === '' || this.form.userid === 'undefined') {
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
      return {
        optionsdate: [{value: '0000000000', lable: this.$t('label.PFANS1012FROMVIEW_COMMON')}],
        error: '',
        week: '',
        tableList: [],
        accountcodeValue: '',
        relations: [],
        Todaysum: [],
        taxrateValue: '',
        loans: [{value: ' ', lable: ' '}],
        selectType: 'Single',
        title: 'title.PFANS1013VIEW',
        userlist: '',
        activeName: 'first',
        loading: false,
        disabled: false,
        disaccommod: false,
        showtick: true,
        checkStatus: false,
        tableTValue: '',
        tableAValue: '',
        tableRValue: '',
        tableDValue: '',
        tableValue: '',
        tableData: [{
          costitem: this.$t('label.PFANS1012VIEW_TRAFFICEXPENSEC'),
          taxes: '',
          rmb: '',
        },
          {
            costitem: this.$t('label.PFANS1013FORMVIEW_ACCOMMODATIONDATA'),
            taxes: '',
            rmb: '',
          },
          {
            costitem: this.$t('label.PFANS1013FORMVIEW_TRAVELALLOWANCEDATA'),
            taxes: '',
            rmb: '',
          },
          {
            costitem: this.$t('label.PFANS1013VIEW_OTHER'),
            taxes: '',
            rmb: '',
          }],
        tableData2: [{
          costitem: this.$t('label.PFANS1012VIEW_TRAFFICEXPENSEC'),
          ratecurrency: '',
          usdcurrency: '',
          jpycurrency: '',
          rmb: '',
          taxes: '',
          total: '',
        },
          {
            costitem: this.$t('label.PFANS1013FORMVIEW_ACCOMMODATIONDATA'),
            ratecurrency: '',
            usdcurrency: '',
            jpycurrency: '',
            rmb: '',
            taxes: '',
            total: '',
          },
          {
            costitem: this.$t('label.PFANS1013FORMVIEW_TRAVELALLOWANCEDATA'),
            ratecurrency: '',
            usdcurrency: '',
            jpycurrency: '',
            rmb: '',
            taxes: '',
            total: '',
          },
          {
            costitem: this.$t('label.PFANS1013VIEW_OTHER'),
            ratecurrency: '',
            usdcurrency: '',
            jpycurrency: '',
            rmb: '',
            taxes: '',
            total: '',
          },
        ],
        baseInfo: {},
        form: {
          level: '',
          abroadbusiness: '',
          project_id: '',
          type: '0',
          center_id: '',
          group_id: '',
          team_id: '',
          userid: '',
          telephone: '',
          business_id: '',
          place: '',
          startdate: '',
          enddate: '',
          datenumber: '',
          budgetunit: '',
          loan: '',
          loanamount: '',
          currency: '',
          totalpay: '',
          totalcurrency: '',
          balance: '',
          jpyfxrate: '',
          dollarfxrate: '',
          otherfxrate: '',
          usexchangerate: getDictionaryInfo("PJ003001").value2,
        },
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        tableF: [{
          publicexpenseid: '',
          invoicenumber: '1',
          invoicetype: '',
          invoiceamount: '',
          taxrate: '',
          excludingtax: '',
          facetax: '',
        }],
        tableW: [{
          evectionid: '',
          currencyexchangeid: '',
          currency: '',
          amount: '',
          exchangerate: '',
          exchangermb: '',
          currencyexchangerate: '',
        }],
        tableT: [{
          budgetcoding: '',
          evectionid: '',
          trafficdetails_id: '',
          publicexpenseid: '',
          trafficdate: '',
          invoicenumber: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          taxes: '',
          costitem: '',
          region: '',
          vehicle: '',
          startingpoint: '',
          rmb: '',
          taxrate: '',
          foreigncurrency: '',
          annexno: '',
          rowindex: '',
        }],
        tableA: [{
          evectionid: '',
          accommodationdetails_id: '',
          accommodationdate: '',
          nextday: '',
          invoicenumber: '',
          budgetcoding: '',
          subjectnumber: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          activitycontent: '',
          vehicleon: '',
          vehiclein: '',
          movementtime: '',
          city: '',
          region: '',
          facilitytypeon: '',
          facilitytypein: '',
          facilityname: '',
          accommodationallowance: '',
          accommodation: '',
          travelallowance: '',
          travel: '',
          relatives: '',
          traintick: 0,
          annexno: '',
          rowindex: '',
          taxes: '',
          costitem: '',
          disaccommod: false,
          showtick: true,
        }],
        tableR: [{
          evectionid: '',
          otherdetails_id: '',
          otherdetailsdate: '',
          invoicenumber: '',
          budgetcoding: '',
          subjectnumber: '',
          remarks: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          costitem: '',
          remarks: '',
          rmb: '',
          taxrate: '',
          foreigncurrency: '',
          annexno: '',
          taxes: '',
          rowindex: '',
        }],
        rules: {
          userid: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
          telephone: [{
            validator: checktele,
            trigger: 'change',
          }],
          business_id: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1013VIEW_RELATION'),
            trigger: 'change',
          }],
          budgetunit: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
            trigger: 'change',
          }],
        },
        code1: 'PG002',
        code3: 'PJ003',
        code4: 'PJ024',
        code5: 'PJ025',
        code6: 'PJ026',
        code7: 'PJ027',
        code8: 'PJ020',
        code9: 'PJ017',
        code10: 'PJ035',
        code11: 'PJ036',
        code12: 'PJ068',
        code13: 'PJ071',
        code14: 'PJ072',
        code15: 'PJ083',
        code16: 'PJ084',
        code17: 'PJ085',
        code18: 'PJ057',
        multiple: false,
        show1: true,
        show2: false,
        show: false,
        showrow: true,
        showrow2: false,
        showrow3: true,
        showrow4: false,
        showAinner: true,
        showAout: false,
        showdata: true,
        showdata2: false,
        showforeigncurrency: false,
        canStart: false,
        result: '',
        result1: '',
        result2: '',
        rank: '',
        invoicenumber: '',
        errorgroup: '',
        orglist: '',
        optionsdata: [{value: this.$t('label.PFANS1012FORMVIEW_NOMONEY'), label: ''}],
      };
    },
    mounted() {
      this.getBusInside();
      this.getLoanapp();
      this.getCompanyProjectList();
      this.checkOption();
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1013Store/selectById', {'evectionid': this.$route.params._id})
          .then(response => {
            this.form = response.evection;
            if (response.trafficdetails.length > 0) {
              this.tableT = response.trafficdetails;
            }
            if (response.accommodationdetails.length > 0) {
              this.tableA = response.accommodationdetails;
              for (var i = 0; i < this.tableA.length; i++) {
                if (this.$route.params.method === 'view') {
                  if (this.form.type === '0') {
                    this.tableA[i].showAinner = true;
                    this.tableA[i].showAout = true;
                    this.showrow3 = true;
                    this.showrow4 = true;
                    this.tableA[i].vehicleon = this.tableA[i].vehicle;
                    this.showrow = true;
                    this.showrow2 = true;
                    this.tableA[i].facilitytypeon = this.tableA[i].facilitytype;
                    this.tableA[i].showtick = true;
                    this.tableA[i].disaccommod = true;
                  } else if (this.form.type === '1') {
                    this.tableA[i].showAinner = true;
                    this.tableA[i].showAout = true;
                    this.showrow3 = true;
                    this.showrow4 = true;
                    this.tableA[i].vehiclein = this.tableA[i].vehicle;
                    this.showrow = true;
                    this.showrow2 = true;
                    this.tableA[i].facilitytypein = this.tableA[i].facilitytype;
                    this.tableA[i].disaccommod = true;
                  }
                } else {
                  if (this.form.type === '0') {
                    this.tableA[i].showAinner = true;
                    this.tableA[i].showAout = false;
                    this.showrow3 = true;
                    this.showrow4 = false;
                    this.tableA[i].vehicleon = this.tableA[i].vehicle;
                    this.showrow = true;
                    this.showrow2 = false;
                    this.tableA[i].facilitytypeon = this.tableA[i].facilitytype;
                    if (this.tableA[i].vehicleon === 'PJ025004') {
                      this.tableA[i].showtick = false;
                      this.tableA[i].disaccommod = true;
                    } else if (this.tableA[i].vehicleon === 'PJ025001' || this.tableA[i].vehicleon === 'PJ025002' || this.tableA[i].vehicleon === 'PJ025003') {
                      this.tableA[i].showtick = true;
                      this.tableA[i].disaccommod = false;
                    }
                  } else if (this.form.type === '1') {
                    this.tableA[i].showAinner = false;
                    this.tableA[i].showAout = true;
                    this.showrow3 = false;
                    this.showrow4 = true;
                    this.tableA[i].vehiclein = this.tableA[i].vehicle;
                    this.showrow = false;
                    this.showrow2 = true;
                    this.tableA[i].facilitytypein = this.tableA[i].facilitytype;
                  }
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
            if (response.currencyexchanges.length > 0) {
              this.tableW = response.currencyexchanges;
            }
            if (this.form.type === '0') {
              this.getBusInside();
              this.showdata = true;
              this.showdata2 = false;
              this.showAinner = true;
              this.showAout = false;
              this.show = true;
              this.show2 = false;
              this.showdata = true;
              this.showdata2 = false;
              this.showAinner = true;
              this.showAout = false;
              this.showforeigncurrency = false;
              this.showrow = true;
              this.showrow3 = true;
              this.showrow2 = false;
              this.showrow4 = false;
            } else {
              this.getBusOuter();
              this.showdata = false;
              this.showdata2 = true;
              this.showAinner = false;
              this.showAout = true;
              this.show = false;
              this.show2 = true;
              this.showforeigncurrency = true;
              this.showrow = false;
              this.showrow2 = true;
              this.showrow3 = false;
              this.showrow4 = true;
            }
            this.userlist = this.form.userid;
            this.baseInfo.evection = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.trafficdetails = JSON.parse(JSON.stringify(this.tableT));
            this.baseInfo.accommodationdetails = JSON.parse(JSON.stringify(this.tableA));
            this.baseInfo.otherdetails = JSON.parse(JSON.stringify(this.tableR));
            this.baseInfo.currencyexchanges = JSON.parse(JSON.stringify(this.tableW));
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
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          var groupid = lst.groupId;
          this.form.centerid = lst.centerNmae;
          this.form.groupid = lst.groupNmae;
          this.form.teamid = lst.teamNmae;
          this.form.userid = this.$store.getters.userinfo.userid;
        }
        if (this.form.type === '0') {
          this.showdata = true;
          this.showdata2 = false;
          this.showAinner = true;
          this.showAout = false;
        } else {
          this.showdata = false;
          this.showdata2 = true;
          this.showAinner = false;
          this.showAout = true;
        }
      }
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      getLoanapp() {
        this.$store
          .dispatch('PFANS1013Store/getLoanApplication')
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              if (response[i].user_id === this.$store.getters.userinfo.userid) {
                var vote = {};
                this.result2 = response;
                vote.value = response[i].loanapplication_id;
                vote.label = this.$t('menu.PFANS1006') + '_' + moment(response[i].createon).format('YYYY-MM-DD');
                this.loans.push(vote);
              }
            }
          });
      },
      getBusOuter() {
        this.$store
          .dispatch('PFANS1013Store/getdate')
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              if (response[i].user_id === this.$store.getters.userinfo.userid && response[i].businesstype === '0') {
                this.relations.push({
                  value: response[i].business_id,
                  label: this.$t('menu.PFANS1002') + '_' + moment(response[i].createon).format('YYYY-MM-DD'),
                  abroadbusiness: response[i].abroadbusiness,
                  city: response[i].city,
                  startdate: response[i].startdate,
                  enddate: response[i].enddate,
                  level: response[i].level,
                  businesstype: response[i].businesstype,
                  datenumber: response[i].datenumber,
                })
              }
            }
          });
      },
      getBusInside() {
        this.$store
          .dispatch('PFANS1013Store/getdate')
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              if (response[i].user_id === this.$store.getters.userinfo.userid && response[i].businesstype === '1') {
                this.relations.push({
                  value: response[i].business_id,
                  label: this.$t('menu.PFANS1035') + '_' + moment(response[i].createon).format('YYYY-MM-DD'),
                  city: response[i].city,
                  startdate: response[i].startdate,
                  enddate: response[i].enddate,
                  businesstype: response[i].businesstype,
                  datenumber: response[i].datenumber,
                })
              }
            }
          });
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
      getGroupId(orglist, row) {
        row.departmentname = orglist;
        let group = getOrgInfo(orglist);
        if (group) {
          this.companyen = group.companyen;
          row.budgetcoding = group.encoding;
        }
      },
      gettype(val) {
        this.form.type = val;
        this.relations = [];
        if (val === '0') {
          this.getBusInside();
          this.form.business_id = '';
          this.form.place = '';
          this.form.startdate = '';
          this.form.enddate = '';
          this.form.datenumber = '';
          this.show = true;
          this.show2 = false;
          this.showdata = true;
          this.showdata2 = false;
          this.showAinner = true;
          this.showAout = false;
          this.showforeigncurrency = false;
          this.showrow3 = true;
          this.showrow4 = false;
          this.showrow = true;
          this.showrow2 = false;
          this.tableA = [{
            evectionid: '',
            accommodationdetails_id: '',
            accommodationdate: '',
            nextday: '',
            activitycontent: '',
            vehicleon: '',
            vehiclein: '',
            movementtime: '',
            city: '',
            region: '',
            budgetcoding: '',
            subjectnumber: '',
            facilitytypeon: '',
            facilitytypein: '',
            facilityname: '',
            accommodationallowance: '',
            accommodation: '',
            travelallowance: '',
            travel: '',
            relatives: '',
            traintick: 0,
            annexno: '',
            rowindex: '',
            disaccommod: false,
            showtick: true,
          }];
        } else {
          this.getBusOuter();
          this.form.business_id = '';
          this.form.place = '';
          this.form.startdate = '';
          this.form.enddate = '';
          this.form.datenumber = '';
          this.show = false;
          this.show2 = true;
          this.showdata = false;
          this.showdata2 = true;
          this.showAinner = false;
          this.showAout = true;
          this.showforeigncurrency = true;
          this.showrow3 = false;
          this.showrow4 = true;
          this.showrow = false;
          this.showrow2 = true;
          this.tableA = [{
            evectionid: '',
            accommodationdetails_id: '',
            accommodationdate: '',
            nextday: '',
            activitycontent: '',
            vehicleon: '',
            vehiclein: '',
            movementtime: '',
            city: '',
            budgetcoding: '',
            subjectnumber: '',
            region: '',
            facilitytypeon: '',
            facilitytypein: '',
            facilityname: '',
            accommodationallowance: '',
            accommodation: '',
            travelallowance: '',
            travel: '',
            relatives: '',
            traintick: 0,
            annexno: '',
            rowindex: '',
            disaccommod: false,
            showtick: true,
          }];
        }
      },
      getUserids(val) {
        this.form.userid = val;
        this.userlist = val;
        let lst = getOrgInfoByUserId(val);
        this.form.centerid = lst.centerNmae;
        this.form.groupid = lst.groupNmae;
        this.form.teamid = lst.teamNmae;
        if (!this.form.userid || this.form.userid === '' || typeof val === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      getrate(val, row) {
        row.taxrate = val;
      },
      getPaymentinvoicetype(val, row) {
        row.invoicetype = val;

      },
      changeSum(row) {
        if (row.taxrate == '') {
          row.facetax = '';
        } else {
          row.facetax = row.invoiceamount - row.excludingtax;
        }
      },
      getbudgetunit(val) {
        this.form.budgetunit = val;
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableT = [{
            budgetcoding: '',
            trafficdate: '',
            invoicenumber: '',
            departmentname: '',
            taxes: '',
            costitem: '',
            region: '',
            vehicle: '',
            startingpoint: '',
            rmb: '',
            taxrate: '',
            foreigncurrency: '',
            annexno: '',
            rowindex: '',
          }];
        }
      },
      deleteRow3(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableA = [{
            accommodationdate: '',
            nextday: '',
            activitycontent: ' ',
            vehicleon: ' ',
            vehiclein: ' ',
            movementtime: ' ',
            budgetcoding: ' ',
            subjectnumber: ' ',
            city: '',
            region: ' ',
            facilitytypeon: ' ',
            facilitytypein: ' ',
            facilityname: '',
            accommodationallowance: '',
            accommodation: '',
            travelallowance: '',
            travel: '',
            annexno: '',
          }];
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
            subjectnumber: '',
            remarks: '',
            budgetcoding: '',
            foreigncurrency: '',
            annexno: '',
          }];
        }
      },
      deleteRow5(index, rows) {
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
        this.checkOption();
      },
      deleteRow6(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableW = [{
            evectionid: '',
            currencyexchangeid: '',
            currency: '',
            amount: '',
            exchangerate: '',
            exchangermb: '',
            currencyexchangerate: '',
          }];
        }
      },
      addRow() {
        this.tableT.push({
          budgetcoding: '',
          evectionid: '',
          trafficdetails_id: '',
          publicexpenseid: '',
          trafficdate: '',
          invoicenumber: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          taxes: '',
          costitem: '',
          region: '',
          vehicle: '',
          startingpoint: '',
          rmb: '',
          taxrate: '',
          foreigncurrency: '',
          annexno: '',
          rowindex: '',
        });
      },
      addRow3() {
        this.tableA.push({
          evectionid: '',
          accommodationdetails_id: '',
          accommodationdate: '',
          nextday: '',
          invoicenumber: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          activitycontent: '',
          vehicleon: '',
          vehiclein: '',
          movementtime: '',
          budgetcoding: '',
          subjectnumber: '',
          city: '',
          region: '',
          facilitytypeon: '',
          facilitytypein: '',
          facilityname: '',
          accommodationallowance: '',
          accommodation: '',
          travelallowance: '',
          travel: '',
          relatives: '',
          traintick: 0,
          annexno: '',
          rowindex: '',
          taxes: '',
          costitem: '',
          disaccommod: false,
          showtick: true,
        });
      },
      addRow4() {
        this.tableR.push({
          evectionid: '',
          otherdetails_id: '',
          otherdetailsdate: '',
          invoicenumber: '',
          budgetcoding: '',
          subjectnumber: '',
          remarks: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          costitem: '',
          remarks: '',
          rmb: '',
          taxrate: '',
          foreigncurrency: '',
          annexno: '',
          taxes: '',
          rowindex: '',
        });
      },
      addRow5() {
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
        this.checkOption();
      },
      addRow6() {
        this.tableW.push({
          evectionid: '',
          currencyexchangeid: '',
          currency: '',
          amount: '',
          exchangerate: '',
          exchangermb: '',
          currencyexchangerate: '',
        });
      },
      getcode(val, row) {
        row.accountcode = val;
        this.accountcodeValue = val;
        this.getCompanyen(val, row);
      },
      checkOption() {
        this.optionsdata = [{value: this.$t('label.PFANS1012FORMVIEW_NOMONEY'), label: ''}];
        for (let i = 0; i < this.tableF.length; i++) {
          var vote = {};
          vote.value = this.tableF[i].invoicenumber,
            vote.lable = this.tableF[i].invoicenumber,
            this.optionsdata.push(vote);
        }
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
        this.getforeign(sums);
        this.getMoney(sums);
        this.getValue(sums);
        this.getValue2(sums);
        return sums;
      },
      getWeekDay(date) {
        if (date.getDay() == 0) {
          this.week = this.$t('label.PFANS1013FORMVIEW_ONE');
        }
        if (date.getDay() == 1) {
          this.week = this.$t('label.PFANS1013FORMVIEW_TWO');
        }
        if (date.getDay() == 2) {
          this.week = this.$t('label.PFANS1013FORMVIEW_THREE');
        }
        if (date.getDay() == 3) {
          this.week = this.$t('label.PFANS1013FORMVIEW_FORE');
        }
        if (date.getDay() == 4) {
          this.week = this.$t('label.PFANS1013FORMVIEW_FIVE');
        }
        if (date.getDay() == 5) {
          this.week = this.$t('label.PFANS1013FORMVIEW_SIX');
        }
        if (date.getDay() == 6) {
          this.week = this.$t('label.PFANS1013FORMVIEW_SECVEN');
        }
      },
      changebusiness(val) {
        this.form.startdate = '',
          this.form.enddate = '';
        this.form.business_id = val;
        this.Todaysum = [];
        if (this.form.type === '0') {
          debugger
          console.log("aaa",this.relations)
          for(var i =0;i<this.relations.length;i++){
            if(this.relations[i].value==val){
              if (this.relations[i].businesstype === '1') {
                this.form.place = this.relations[i].city,
                  this.form.startdate = this.relations[i].startdate,
                  this.form.enddate = this.relations[i].enddate;
                this.tableT[0].trafficdate = this.form.startdate;
                this.tableA[0].accommodationdate = this.form.startdate;
                this.tableA[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
                var getDate = function (str) {
                  var tempDate = new Date();
                  var list = str.split("-");
                  tempDate.setFullYear(list[0]);
                  tempDate.setMonth(list[1] - 1);
                  tempDate.setDate(list[2]);
                  return tempDate;
                };
                var date = getDate(moment(this.tableA[0].accommodationdate).format("YYYY-MM-DD"));
                this.getWeekDay(date);
                this.tableA[0].nextday = this.week;
                this.form.datenumber = this.relations[i].datenumber;
              }
            }
          }


        } else {
          debugger
          console.log("aaa",this.relations)
          for(var i = 0;i<this.relations.length;i++) {
            debugger
            if(this.relations[i].value==val) {
              debugger
              this.rank = this.relations[i].level;
              if (this.relations[i].businesstype === '0') {
                let dict = getDictionaryInfo(this.relations[i].level);
                if (dict) {
                  this.form.level = dict.value1;
                }
                this.form.abroadbusiness = this.relations[i].abroadbusiness,
                  this.form.place = this.relations[i].city,
                  this.form.startdate = this.relations[i].startdate,
                  this.form.enddate = this.relations[i].enddate;
                this.tableT[0].trafficdate = this.form.startdate;
                this.tableA[0].accommodationdate = this.form.startdate;
                this.tableA[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
                var getDate = function (str) {
                  var tempDate = new Date();
                  var list = str.split("-");
                  tempDate.setFullYear(list[0]);
                  tempDate.setMonth(list[1] - 1);
                  tempDate.setDate(list[2]);
                  return tempDate;
                };
                var date = getDate(moment(this.tableA[0].accommodationdate).format("YYYY-MM-DD"));
                this.getWeekDay(date);
                this.tableA[0].nextday = this.week;
                this.form.datenumber = this.relations[i].datenumber;
              }
            }
          }

        }

        if (this.form.startdate != '' && this.form.enddate != ''&& moment(this.form.startdate).format("YYYY-MM-DD")!=moment(this.form.enddate).format("YYYY-MM-DD")) {
          var getDate = function (str) {
            var tempDate = new Date();
            var list = str.split("-");
            tempDate.setFullYear(list[0]);
            tempDate.setMonth(list[1] - 1);
            tempDate.setDate(list[2]);
            return tempDate;
          };
          var date1 = getDate(moment(this.form.startdate).format("YYYY-MM-DD"));
          var date2 = getDate(moment(this.form.enddate).format("YYYY-MM-DD"));
          if (date1 > date2) {
            var tempDate = date1;
            date1 = date2;
            date2 = tempDate;
          }
          date1.setDate(date1.getDate() + 1);
          var dateArr = [];
          var i = 0;
          while (!(date1.getFullYear() == date2.getFullYear()
            && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
              .getDate())) {
            var dayStr = date1.getDate().toString();
            if (dayStr.length == 1) {
              dayStr = "0" + dayStr;
            }
            var monthStr = (date1.getMonth() + 1).toString();
            if (monthStr.length == 1) {
              monthStr = "0" + monthStr;
            }
            dateArr[i] = date1.getFullYear() + "-" + monthStr + "-"
              + dayStr;
            i++;
            date1.setDate(date1.getDate() + 1);
          }
          dateArr.splice(0, 0, moment(this.form.startdate).format("YYYY-MM-DD"));
          dateArr.push(moment(this.form.enddate).format("YYYY-MM-DD"));
          this.Todaysum = dateArr;
          console.log("bbb",this.Todaysum)
        }
        for (let i = 1; i < this.Todaysum.length; i++) {
          var getDate = function (str) {
            var tempDate = new Date();
            var list = str.split("-");
            tempDate.setFullYear(list[0]);
            tempDate.setMonth(list[1] - 1);
            tempDate.setDate(list[2]);
            return tempDate;
          };
          var date = getDate(this.Todaysum[i]);
          this.getWeekDay(date);
          this.tableA.push({
            evectionid: '',
            accommodationdetails_id: '',
            accommodationdate: this.Todaysum[i],
            nextday: this.week,
            invoicenumber: '',
            departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
            activitycontent: '',
            vehicleon: '',
            budgetcoding: '',
            subjectnumber: '',
            vehiclein: '',
            movementtime: '',
            city: '',
            region: '',
            facilitytypeon: '',
            facilitytypein: '',
            facilityname: '',
            accommodationallowance: '',
            accommodation: '',
            travelallowance: '',
            travel: '',
            relatives: '',
            traintick: 0,
            annexno: '',
            rowindex: '',
            taxes: '',
            costitem: '',
            disaccommod: false,
            showtick: true,
          });
        }
      },
      change2(val) {
        this.form.loanamount = "";
        this.result2.forEach(res => {
          if (res.loanapplication_id === val) {
            this.form.loanamount = res.moneys;
          }
        });
      },
      getAsummaries(param) {
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
            if (index == 7) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 8) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 10) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--';
          }
        });
        this.tableAValue = sums;
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
            if (index == 1) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--';
          }
        });
        this.tableDValue = sums;
        return sums;
      },
      getsummaries(param) {
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
            if (index === 5) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--';
          }
        });
        return sums;
      },
      getactivitycontent(val, row) {
        row.activitycontent = val;
      },
      getvehicle(val, row) {
        row.vehicle = val;
      },
      getvehicleon(val, row) {
        row.vehicleon = val;
        if (val === 'PJ025004') {
          row.disaccommod = true;
          row.showtick = false;
          row.accommodationallowance = '';
        } else {
          row.disaccommod = false;
          row.showtick = true;
          row.traintick = '';
        }
      },
      getvehiclein(val, row) {
        row.vehiclein = val;
        this.getTravelFly(row);
      },
      getmovementtime(val, row) {
        row.movementtime = val;
        this.getTravel(row);
      },
      getexitarea(val, row) {
        row.region = val;
        this.getTravel(row);
        this.getTravelFly(row);
      },
      getfacilitytypeon(val, row) {
        row.facilitytypeon = val;
        this.getTravel(row);
      },
      getfacilitytypein(val, row) {
        row.facilitytypein = val;
        this.getTravel(row);
      },
      getCity(row) {
        this.getTravel(row);
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
          row.accountcode = '',
            row.subjectnumber = '',
            this.code11 = 'PJ058';
          this.checkStatus = true;
        } else if (val === 'PJ057015') {
          row.accountcode = '',
            row.subjectnumber = '',
            this.code11 = 'PJ059';
          this.checkStatus = true;
        } else if (val === 'PJ057016') {
          row.accountcode = '',
            row.subjectnumber = '',
            this.code11 = 'PJ060';
          this.checkStatus = true;
        } else {
          row.accountcode = '',
            row.subjectnumber = '',
            this.checkStatus = false;
          this.getCompanyen(val, row);
        }
      },
      getTravel(row) {
        debugger;
        var varmovementtime2;
        let movementtimedic = getDictionaryInfo(row.movementtime);
        if (movementtimedic) {
          varmovementtime2 = movementtimedic.value2;
        }
        if (this.form.type === '0') {
          var varvalueflg1;
          let dictionaryInfo1 = getDictionaryInfo('PJ035001');
          if (dictionaryInfo1) {
            varvalueflg1 = dictionaryInfo1.value2;
          }
          var varvalueflg2;
          var varvalueflg3;
          let dictionaryInfo2 = getDictionaryInfo('PJ035002');
          if (dictionaryInfo2) {
            varvalueflg2 = dictionaryInfo2.value2;
            varvalueflg3 = dictionaryInfo2.value3;
          }
          var varvalueflg4;
          var varvalueflg5;
          let dictionaryInfo3 = getDictionaryInfo('PJ035003');
          if (dictionaryInfo3) {
            varvalueflg4 = dictionaryInfo3.value2;
            varvalueflg5 = dictionaryInfo3.value3;
          }
          if (row.facilitytypeon === 'PJ035001') {
            if (row.city != '') {
              row.travelallowance = varvalueflg1;
              row.relatives = '';
            }
          } else if (row.facilitytypeon === 'PJ035002') {
            row.relatives = '';
            if (row.city != '') {
              if (row.city === this.$t('label.PFANS1013FORMVIEW_BEIJING') || row.city === this.$t('label.PFANS1013FORMVIEW_SHANGHAI')
                || row.city === this.$t('label.PFANS1013FORMVIEW_GUANGZHOU') || row.city === this.$t('label.PFANS1013FORMVIEW_SHENZHEN')) {
                row.travelallowance = varvalueflg2;
              } else {
                row.travelallowance = varvalueflg3;
              }
            }
          } else if (row.facilitytypeon === 'PJ035003') {
            if (!(row.movementtime === 'PJ027006' || row.movementtime === 'PJ027007' || row.movementtime === 'PJ027008'
              || row.movementtime === 'PJ027009')) {
              row.relatives = varvalueflg5;
            } else {
              row.relatives = '';
            }
            if (row.city != '' && row.movementtime != '') {
              row.travelallowance = varvalueflg4;
            }
          }
          if (row.movementtime != '' && row.facilitytypeon != '' && row.city != '') {
            row.travelallowance = Number(row.travelallowance) * varmovementtime2;
          }
        } else if (this.form.type === '1') {
          var varbusiness;
          if (this.rank === 'PJ016001') {
            let businessdic = getDictionaryInfode(row.region, this.$t('label.PFANS1013FORMVIEW_R7DOW'), row.facilitytypein);
            if (businessdic) {
              varbusiness = businessdic.value4;
            }
          } else if (this.rank === 'PJ016002') {
            let businessdic = getDictionaryInfode(row.region, this.$t('label.PFANS1013FORMVIEW_R8UP'), row.facilitytypein);
            if (businessdic) {
              varbusiness = businessdic.value4;
            }
          } else if (this.rank === 'PJ016002') {
            let businessdic = getDictionaryInfode(row.region, this.$t('label.PFANS1013FORMVIEW_CHUXIANGZHE'), row.facilitytypein);
            if (businessdic) {
              varbusiness = businessdic.value4;
            }
          }
          var vartravel = 0;
          if (varmovementtime2 != '' && varmovementtime2 != undefined
            && varbusiness != '' && varbusiness != undefined) {
            vartravel = Number(varmovementtime2) * Number(varbusiness);
          }
          row.travel = vartravel;
        }
      },
      getTravelFly(row) {
        var varbusiness;
        if (this.rank === 'PJ016001') {
          let businessdic = getDictionaryInfode(row.vehiclein, row.region, this.$t('label.PFANS1013FORMVIEW_R7DOW'));
          if (businessdic) {
            varbusiness = businessdic.value4;
          }
        } else if (this.rank === 'PJ016002') {
          let businessdic = getDictionaryInfode(row.vehiclein, row.region, this.$t('label.PFANS1013FORMVIEW_R8UP'));
          if (businessdic) {
            varbusiness = businessdic.value4;
          }
        } else if (this.rank === 'PJ016003') {
          let businessdic = getDictionaryInfode(row.vehiclein, row.region, this.$t('label.PFANS1013FORMVIEW_CHUXIANGZHE'));
          if (businessdic) {
            varbusiness = businessdic.value4;
          }
        }
        if (row.vehiclein === 'PJ026004') {
          row.accommodationallowance = '';
          row.accommodation = '';
          row.travelallowance = '';
          row.disaccommod = true;
        } else {
          row.disaccommod = false;
        }
      },
      getforeign(sums) {
        if (this.form.type === '0') {
          this.form.totalcurrency = null;
        }
        if (this.form.type === '1') {
          this.form.totalcurrency = sums[5] + this.tableAValue[11] + this.tableAValue[12] + this.tableAValue[13] + this.tableRValue[4];
        }

      },
      getMoney(sums) {
        if (this.form.type === '0') {
          if (this.accountcodeValue != '') {
            this.form.totalpay = sums[9] + this.tableRValue[8] + this.tableAValue[13] + this.tableAValue[14];
          } else {
            this.form.totalpay = sums[9] + this.tableRValue[7] + this.tableAValue[13] + this.tableAValue[14];
          }
        } else if (this.form.type === '1') {
          if (this.accountcodeValue != '') {
            this.form.totalpay = sums[9] + this.tableRValue[8] + this.tableAValue[13];
          } else {
            this.form.totalpay = sums[9] + this.tableRValue[7] + this.tableAValue[13];
          }
        }
        this.form.balance = this.form.loanamount - this.form.totalpay;
      },
      getValue(sums) {
        this.tableData[0].rmb = sums[9];
        this.tableData[1].rmb = this.tableAValue[10];
        this.tableData[2].rmb = this.tableAValue[11] + this.tableAValue[12] + this.tableAValue[13];
        if (this.accountcodeValue != '') {
          this.tableData[3].rmb = this.tableRValue[8];
        } else {
          this.tableData[3].rmb = this.tableRValue[7];
        }

      },
      getValue2(sums) {
        this.tableData2[0].rmb = sums[9];
        this.tableData2[1].rmb = this.tableAValue[11];
        if (this.accountcodeValue != '') {
          this.tableData2[3].rmb = this.tableRValue[8];
        } else {
          this.tableData2[3].rmb = this.tableRValue[7];
        }
        for (var i = 0; i < this.tableData2.length; i++) {
          this.tableData2[i].total = this.tableData2[i].rmb;
        }
        if (this.form.currency === 'PJ003001') {
          this.tableData2[0].usdcurrency = sums[10];
          this.tableData2[1].usdcurrency = this.tableAValue[11];
          this.tableData2[2].usdcurrency = this.tableAValue[12] + this.tableAValue[13];
          if (this.accountcodeValue != '') {
            this.tableData2[3].usdcurrency = this.tableRValue[9];
          } else {
            this.tableData2[3].usdcurrency = this.tableRValue[8];
          }
          for (var i = 0; i < this.tableData2.length; i++) {
            this.tableData2[i].jpycurrency = '';
            this.tableData2[i].ratecurrency = '';
            this.tableData2[i].total = this.tableData2[i].usdcurrency * this.form.dollarfxrate + this.tableData2[i].rmb;
          }
        } else if (this.form.currency === 'PJ003002') {
          this.tableData2[0].jpycurrency = sums[10];
          this.tableData2[1].jpycurrency = this.tableAValue[11];
          this.tableData2[2].jpycurrency = this.tableAValue[12] + this.tableAValue[13];
          if (this.accountcodeValue != '') {
            this.tableData2[3].jpycurrency = this.tableRValue[9];
          } else {
            this.tableData2[3].jpycurrency = this.tableRValue[8];
          }
          for (var i = 0; i < this.tableData2.length; i++) {
            this.tableData2[i].usdcurrency = '';
            this.tableData2[i].ratecurrency = '';
            this.tableData2[i].total = this.tableData2[i].jpycurrency * this.form.jpyfxrate + this.tableData2[i].rmb;
          }
        } else if (this.form.currency === 'PJ003003') {
          this.tableData2[0].ratecurrency = sums[10];
          this.tableData2[1].ratecurrency = this.tableAValue[11];
          this.tableData2[2].ratecurrency = this.tableAValue[12] + this.tableAValue[13];
          if (this.accountcodeValue != '') {
            this.tableData2[3].ratecurrency = this.tableRValue[9];
          } else {
            this.tableData2[3].ratecurrency = this.tableRValue[8];
          }
          for (var i = 0; i < this.tableData2.length; i++) {
            this.tableData2[i].total = this.tableData2[i].ratecurrency * this.form.otherfxrate + this.tableData2[i].rmb;
            this.tableData2[i].usdcurrency = '';
            this.tableData2[i].jpycurrency = '';
          }
        }
      },
      getCurrency(val, row) {
        row.currency = val;
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
      changeRMB(newValue) {
        for (let j = 0; j < this.tableF.length; j++) {
          if (newValue.invoicenumber == this.tableF[j].invoicenumber) {
            if (newValue.rmb != '') {
              if (this.tableF[j].taxrate != '') {
                if (this.tableF[j].taxrate == 'PJ071001') {
                  this.taxrateValue = '0.03'
                } else if (this.tableF[j].taxrate == 'PJ071002') {
                  this.taxrateValue = '0.06'
                } else if (this.tableF[j].taxrate == 'PJ071003') {
                  this.taxrateValue = '0.09'
                } else if (this.tableF[j].taxrate == 'PJ071004') {
                  this.taxrateValue = '0.13'
                }
                newValue.taxes = newValue.rmb - (newValue.rmb * this.taxrateValue)
              }
            }
          }
        }
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
      changeaccommodationallowance(newValue) {
        if (newValue.accommodationallowance > 0) {
          newValue.accommodation = '';
          newValue.display = false;
          this.$nextTick(() => {
            newValue.display = true;
          });
        }
      },
      changeaccommodation(newValue) {
        if (newValue.accommodation > 0) {
          newValue.accommodationallowance = '';
          newValue.display = false;
          this.$nextTick(() => {
            newValue.display = true;
          });
        }
      },
      buttonClick(val) {
        if (val === 'save') {
          this.$refs['refform'].validate(valid => {
            if (valid) {
              this.baseInfo = {};
              this.form.user_id = this.userlist;
              this.baseInfo.evection = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.trafficdetails = [];
              this.baseInfo.accommodationdetails = [];
              this.baseInfo.otherdetails = [];
              this.baseInfo.currencyexchanges = [];
              for (let i = 0; i < this.tableT.length; i++) {
                if (this.tableT[i].trafficdate !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
                  || this.tableT[i].rmb > 0 || this.tableT[i].foreigncurrency > 0 || this.tableT[i].annexno !== ''
                  || this.tableT[i].invoicenumber !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== '' || this.tableT[i].taxes !== '' || this.tableT[i].costitem !== '') {
                  this.baseInfo.trafficdetails.push(
                    {
                      trafficdetails_id: this.tableT[i].trafficdetails_id,
                      evectionid: this.tableT[i].evectionid,
                      publicexpenseid: this.tableT[i].publicexpenseid,
                      trafficdate: this.tableT[i].trafficdate,
                      invoicenumber: this.tableT[i].invoicenumber,
                      departmentname: this.tableT[i].departmentname,
                      budgetcoding: this.tableT[i].departmentname,
                      taxes: this.tableT[i].taxes,
                      costitem: this.tableT[i].costitem,
                      taxrate: this.tableT[i].taxrate,
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
              for (let i = 0; i < this.tableA.length; i++) {
                if (this.tableA[i].accommodationdate !== '' || this.tableA[i].activitycontent !== '' || this.tableA[i].vehicle !== '' || this.tableA[i].region !== ''
                  || this.tableA[i].movementtime !== '' || this.tableA[i].city !== '' || this.tableA[i].facilitytype !== '' || this.tableA[i].facilityname !== '' || this.tableA[i].accommodationallowance > 0
                  || this.tableA[i].accommodation > 0 || this.tableA[i].travelallowance > 0 || this.tableA[i].travel > 0 || this.tableA[i].relatives > 0
                  || this.tableA[i].annexno !== ''
                  || this.tableA[i].invoicenumber !== '' || this.tableA[i].departmentname !== '' || this.tableA[i].taxes !== '' || this.tableA[i].costitem !== '') {
                  var varvehiclein;
                  var varfacilitytypein;
                  if (this.form.type === '0') {
                    varvehiclein = this.tableA[i].vehicleon;
                    varfacilitytypein = this.tableA[i].facilitytypeon;
                  } else {
                    varvehiclein = this.tableA[i].vehiclein;
                    varfacilitytypein = this.tableA[i].facilitytypein;
                  }
                  this.baseInfo.accommodationdetails.push(
                    {
                      accommodationdetails_id: this.tableA[i].accommodationdetails_id,
                      evectionid: this.tableA[i].evectionid,
                      accommodationdate: this.tableA[i].accommodationdate,
                      nextday: this.tableA[i].nextday,
                      activitycontent: this.tableA[i].activitycontent,
                      vehicle: varvehiclein,
                      region: this.tableA[i].region,
                      movementtime: this.tableA[i].movementtime,
                      city: this.tableA[i].city,
                      budgetcoding: this.tableA[i].budgetcoding,
                      subjectnumber: this.tableA[i].subjectnumber,
                      facilitytype: varfacilitytypein,
                      facilityname: this.tableA[i].facilityname,
                      accommodationallowance: this.tableA[i].accommodationallowance,
                      accommodation: this.tableA[i].accommodation,
                      travelallowance: this.tableA[i].travelallowance,
                      travel: this.tableA[i].travel,
                      relatives: this.tableA[i].facilitytype,
                      invoicenumber: this.tableA[i].invoicenumber,
                      departmentname: this.tableA[i].departmentname,
                      taxes: this.tableA[i].taxes,
                      costitem: this.tableA[i].costitem,
                      annexno: this.tableA[i].annexno,
                    },
                  );
                }
              }
              for (let i = 0; i < this.tableR.length; i++) {
                if (this.tableR[i].otherdetailsdate !== '' || this.tableR[i].costitem !== '' || this.tableR[i].remarks !== ''
                  || this.tableR[i].rmb > 0 || this.tableR[i].foreigncurrency > 0 || this.tableR[i].annexno !== ''
                  || this.tableR[i].invoicenumber !== '' || this.tableR[i].departmentname !== '' || this.tableR[i].budgetcoding !== '' || this.tableR[i].subjectnumber !== '' || this.tableR[i].remarks !== '' || this.tableR[i].taxes !== '') {
                  this.baseInfo.otherdetails.push(
                    {
                      otherdetails_id: this.tableR[i].otherdetails_id,
                      evectionid: this.tableR[i].evectionid,
                      otherdetailsdate: this.tableR[i].otherdetailsdate,
                      costitem: this.tableR[i].costitem,
                      remarks: this.tableR[i].remarks,
                      rmb: this.tableR[i].rmb,
                      budgetcoding: this.tableR[i].budgetcoding,
                      subjectnumber: this.tableR[i].subjectnumber,
                      remarks: this.tableR[i].remarks,
                      invoicenumber: this.tableR[i].invoicenumber,
                      departmentname: this.tableR[i].departmentname,
                      taxes: this.tableR[i].taxes,
                      foreigncurrency: this.tableR[i].foreigncurrency,
                      annexno: this.tableR[i].annexno,
                    },
                  );
                }
              }
              for (let i = 0; i < this.tableW.length; i++) {
                if (this.tableW[i].currency !== '' || this.tableW[i].amount > 0 || this.tableW[i].exchangerate > 0
                  || this.tableW[i].exchangermb > 0 || this.tableW[i].currencyexchangerate !== '') {
                  this.baseInfo.currencyexchanges.push(
                    {
                      evectionid: this.tableW[i].evectionid,
                      currencyexchangeid: this.tableW[i].currencyexchangeid,
                      currency: this.tableW[i].currency,
                      amount: this.tableW[i].amount,
                      exchangerate: this.tableW[i].exchangerate,
                      exchangermb: this.tableW[i].exchangermb,
                      currencyexchangerate: this.tableW[i].currencyexchangerate,
                    },
                  );
                }
              }
              if (this.$route.params._id) {
                this.baseInfo.evection.evectionid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1013Store/update', this.baseInfo)
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
              } else {
                this.form.user_id = this.userlist;
                this.$store
                  .dispatch('PFANS1013Store/create', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    this.$message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
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

</style>






