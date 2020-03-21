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
          <el-tabs type="border-card" v-model="activeName">
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
                    <el-form-item :label="$t('label.PFANS1002VIEW_REGION')">
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
                        style="width:20vw"
                        v-model="form.loanamount"
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
                        style="width:20vw"
                        v-model="form.totalpay"
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
                        style="width:20vw"
                        v-model="form.balance"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS5004VIEW_PROJECTNAMW')">
                      <el-select :disabled="!disable" clearable style="width: 20vw" v-model="form.project_id">
                        <el-option
                          :key="item.value"
                          :label="item.lable"
                          :value="item.value"
                          v-for="item in optionsdate">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-show="show2">
                    <el-form-item :label="$t('label.PFANS1002VIEW_LEVEL')">
                      <el-input :disabled="true" style="width: 20vw" v-model="form.level">
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
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_REIMBURSEMENTDATE')">
                      <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.reimbursementdate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PERSONALCODE')">
                      <el-input :disabled="true" style="width: 20vw" v-model="form.personalcode">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--外币兑换-->
                <el-row v-show="show2">
                  <el-collapse>
                    <el-collapse-item>
                      <template slot="title">
                        <span class="collapse_Title">{{$t('label.PFANS1013FORMVIEW_CURRENCYEXCHANGE')}}</span>
                      </template>
                      <el-table :data="tableW"
                                border header-cell-class-name="sub_bg_color_blue" stripe style="width: 70vw">
                        <el-table-column :label="$t('label.PFANS1002VIEW_CURRENCY')" align="center" width="180">
                          <template slot-scope="scope">
                            <dicselect :code="code3"
                                       :data="scope.row.currency"
                                       :disabled="!disable"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getcurrency"
                                       style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1013FORMVIEW_CURRENCYEXCHANGERATE')" align="center"
                                         prop="currencyexchangerate"
                                         width="180">
                          <template slot-scope="scope">
                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.currencyexchangerate">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1004VIEW_AMOUNT')" align="center" width="180">
                          <template slot-scope="scope">
                            <el-input-number :max="9999999" :min="0" :no="scope.row"
                                             :precision="2" :step="1" @change="changeamount(scope.row)"
                                             controls-position="right" style="width: 100%" v-model="scope.row.amount">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1013FORMVIEW_EXCHANGERATE')" align="center" width="180">
                          <template slot-scope="scope">
                            <el-input-number :max="9999999" :min="0" :no="scope.row"
                                             :precision="2" :step="1" @change="changeamount(scope.row)"
                                             controls-position="right" style="width: 100%" v-model="scope.row.exchangerate">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1013FORMVIEW_EXCHANGERMB')" align="center" prop="exchangermb"
                                         width="180">
                          <template slot-scope="scope">
                            <el-input-number :max="9999999" :min="0" :no="scope.row"
                                             :precision="2" :step="1"
                                             controls-position="right" style="width: 100%" v-model="scope.row.exchangermb">
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
                          <el-input :disabled="true" style="width:20vw" v-model="form.usexchangerate">
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
                                border header-cell-class-name="sub_bg_color_blue" stripe style="width: 70vw">
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
                            <el-input-number :max="9999999" :min="0" :no="scope.row"
                                             :precision="2" :step="1" @change="changeSum(scope.row)"
                                             controls-position="right" style="width: 100%" v-model="scope.row.invoiceamount">
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
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_EXCLUDINGTAX')" align="center" prop="debitamount"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disable"
                              :max="9999999" :min="0"
                              :no="scope.row"
                              :precision="2"
                              :step="1"
                              @change="changeSum(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.excludingtax">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_FACETAX')" align="center" prop="creditamount"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :max="9999999" :min="0"
                              :no="scope.row"
                              :precision="2"
                              :step="1"
                              @change="changeSum(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.facetax">
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
<!--                <el-row>-->
<!--                  <el-collapse>-->
<!--                    <el-collapse-item>-->
<!--                      <template slot="title">-->
<!--                        <span class="collapse_Title">{{$t('label.PFANS1012FORMVIEW_SUBTOTAL')}}</span>-->
<!--                      </template>-->
<!--                      <el-col :span="24">-->
<!--                        <el-table :data="tableData"-->
<!--                                  :summary-method="getDsummaries"-->
<!--                                  border-->
<!--                                  header-cell-class-name="sub_bg_color_blue"-->
<!--                                  show-summary-->
<!--                                  stripe style="width: 46vw"-->
<!--                                  v-if="showdata">-->
<!--                          <el-table-column :label="$t('label.PFANS1013FORMVIEW_COSTITEM')" align="center">-->
<!--                            <template slot-scope="scope">-->
<!--                              <dicselect :code="code14"-->
<!--                                         :data="scope.row.costitem"-->
<!--                                         :disabled="!disable"-->
<!--                                         :multiple="multiple"-->
<!--                                         :no="scope.row"-->
<!--                                         @change="getcostitem">-->
<!--                              </dicselect>-->
<!--                            </template>-->
<!--                          </el-table-column>-->
<!--                          <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center" prop="taxes"-->
<!--                                           width="200">-->
<!--                            <template slot-scope="scope">-->
<!--                              <el-input-number-->
<!--                                :disabled="true"-->
<!--                                :precision="2"-->
<!--                                controls-position="right"-->
<!--                                style="width: 100%"-->
<!--                                v-model="scope.row.taxes">-->
<!--                              </el-input-number>-->
<!--                            </template>-->
<!--                          </el-table-column>-->
<!--                          <el-table-column :label="$t('label.PFANS1013FORMVIEW_RMB')" align="center" prop="rmb">-->
<!--                            <template slot-scope="scope">-->
<!--                              <el-input-number-->
<!--                                :disabled="true"-->
<!--                                :precision="2"-->
<!--                                @change="getValue"-->
<!--                                controls-position="right"-->
<!--                                style="width: 100%"-->
<!--                                v-model="scope.row.rmb">-->
<!--                              </el-input-number>-->
<!--                            </template>-->
<!--                          </el-table-column>-->
<!--                        </el-table>-->
<!--                      </el-col>-->
<!--                      <el-row>-->
<!--                        <el-col :span="24">-->
<!--                          <el-table :data="tableData2"-->
<!--                                    :summary-method="getsummaries"-->
<!--                                    border-->
<!--                                    header-cell-class-name="sub_bg_color_blue"-->
<!--                                    show-summary-->
<!--                                    stripe style="width: 70vw"-->
<!--                                    v-if="showdata2">-->
<!--                            <el-table-column :label="$t('label.PFANS1013FORMVIEW_COSTITEM')" align="center" width="200">-->
<!--                              <template slot-scope="scope">-->
<!--                                <dicselect :code="code14"-->
<!--                                           :data="scope.row.costitem"-->
<!--                                           :disabled="!disable"-->
<!--                                           :multiple="multiple"-->
<!--                                           :no="scope.row"-->
<!--                                           @change="getcostitem">-->
<!--                                </dicselect>-->
<!--                              </template>-->
<!--                            </el-table-column>-->
<!--                            <el-table-column :label="$t('label.PFANS1013VIEW_RATECURRENCY')" align="center"-->
<!--                                             prop="ratecurrency"-->
<!--                                             width="200">-->
<!--                              <template slot-scope="scope">-->
<!--                                <el-input-number-->
<!--                                  :disabled="true"-->
<!--                                  :no="scope.row"-->
<!--                                  :precision="2"-->
<!--                                  @change="getValue2"-->
<!--                                  controls-position="right"-->
<!--                                  style="width: 100%"-->
<!--                                  v-model="scope.row.ratecurrency">-->
<!--                                </el-input-number>-->
<!--                              </template>-->
<!--                            </el-table-column>-->
<!--                            <el-table-column :label="$t('label.PFANS1013VIEW_USDCURRENCY')" align="center"-->
<!--                                             prop="usdcurrency"-->
<!--                                             width="200">-->
<!--                              <template slot-scope="scope">-->
<!--                                <el-input-number-->
<!--                                  :disabled="true"-->
<!--                                  :no="scope.row"-->
<!--                                  :precision="2"-->
<!--                                  @change="getValue2"-->
<!--                                  controls-position="right"-->
<!--                                  style="width: 100%"-->
<!--                                  v-model="scope.row.usdcurrency">-->
<!--                                </el-input-number>-->
<!--                              </template>-->
<!--                            </el-table-column>-->
<!--                            <el-table-column :label="$t('label.PFANS1013VIEW_JPYCURRENCY')" align="center"-->
<!--                                             prop="jpycurrency"-->
<!--                                             width="200">-->
<!--                              <template slot-scope="scope">-->
<!--                                <el-input-number-->
<!--                                  :disabled="true"-->
<!--                                  :no="scope.row"-->
<!--                                  :precision="2"-->
<!--                                  @change="getValue2"-->
<!--                                  controls-position="right"-->
<!--                                  style="width: 100%"-->
<!--                                  v-model="scope.row.jpycurrency">-->
<!--                                </el-input-number>-->
<!--                              </template>-->
<!--                            </el-table-column>-->
<!--                            <el-table-column :label="$t('label.PFANS1013FORMVIEW_RMB')" align="center" prop="rmb"-->
<!--                                             width="200">-->
<!--                              <template slot-scope="scope">-->
<!--                                <el-input-number-->
<!--                                  :disabled="true"-->
<!--                                  :no="scope.row"-->
<!--                                  :precision="2"-->
<!--                                  @change="getValue2"-->
<!--                                  controls-position="right"-->
<!--                                  style="width: 100%"-->
<!--                                  v-model="scope.row.rmb">-->
<!--                                </el-input-number>-->
<!--                              </template>-->
<!--                            </el-table-column>-->
<!--                            <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center" prop="taxes"-->
<!--                                             width="200">-->
<!--                              <template slot-scope="scope">-->
<!--                                <el-input-number-->
<!--                                  :disabled="true"-->
<!--                                  :precision="2"-->
<!--                                  controls-position="right"-->
<!--                                  style="width: 100%"-->
<!--                                  v-model="scope.row.taxes">-->
<!--                                </el-input-number>-->
<!--                              </template>-->
<!--                            </el-table-column>-->
<!--                            <el-table-column :label="$t('label.PFANS1013FORMVIEW_TOTAL')" align="center" prop="total"-->
<!--                                             width="200">-->
<!--                              <template slot-scope="scope">-->
<!--                                <el-input-number-->
<!--                                  :disabled="true"-->
<!--                                  :no="scope.row"-->
<!--                                  :precision="2"-->
<!--                                  @change="getValue2"-->
<!--                                  controls-position="right"-->
<!--                                  style="width: 100%"-->
<!--                                  v-model="scope.row.total">-->
<!--                                </el-input-number>-->
<!--                              </template>-->
<!--                            </el-table-column>-->
<!--                          </el-table>-->
<!--                        </el-col>-->
<!--                      </el-row>-->
<!--                    </el-collapse-item>-->
<!--                  </el-collapse>-->
<!--                </el-row>-->
              </div>
            </el-tab-pane>
            <!--            第二页-->
            <el-tab-pane :disabled="this.form.business_id === '' ? true : false"
                         :label="$t('label.PFANS1013VIEW_TRAFFIC')" name="second">
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableT" :summary-method="getTsummaries" border
                            header-cell-class-name="sub_bg_color_blue" show-summary stripe>
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
                            :key="item.value"
                            :label="item.lable"
                            :value="item.value"
                            v-for="item in optionsdata">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_DEPARTMENT')" align="center" width="200">
                      <template slot-scope="scope">
                        <org :error="errorgroup"
                             :no="scope.row"
                             :orglist="scope.row.departmentname"
                             @getOrgids="getGroupId"
                             orgtype="2"
                             style="width: 100%"></org>
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
                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.plsummary">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250"
                    >
                      <template slot-scope="scope">
                        <dicselect :code="code20"
                                   :data="scope.row.accountcode"
                                   :disabled="!disable"
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
                    <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCY')" align="center"
                                     prop="accommodationallowance"
                                     v-if="this.form.type === '0'? false : true" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code3"
                                   :data="scope.row.accommodationallowance"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row">
                        </dicselect>
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

            <!--            第三页-->
            <el-tab-pane :disabled="this.form.business_id === '' ? true : false"
                         :label="$t('label.PFANS1013VIEW_ACCOMMODATION')" name="third">
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableA" :summary-method="getAsummaries"
                            border
                            header-cell-class-name="sub_bg_color_blue" show-summary stripe>
                    <el-table-column :label="$t('label.date')" align="center" width="400">
                      <template slot-scope="scope">
                        <el-date-picker :disabled="!disable"
                                        :end-placeholder="$t('label.enddate')"
                                        :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                        :start-placeholder="$t('label.startdate')"
                                        class="bigWidth"
                                        type="daterange"
                                        unlink-panels
                                        v-model="scope.row.accommodationdate"
                                        @change="getTravel(scope.row)"
                        ></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-select style="width: 100%" v-model="scope.row.invoicenumber">
                          <el-option
                            :key="item.value"
                            :label="item.lable"
                            :value="item.value"
                            v-for="item in optionsdata">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_DEPARTMENT')" align="center" width="200">
                      <template slot-scope="scope">
                        <org :error="errorgroup"
                             :no="scope.row"
                             :orglist="scope.row.departmentname"
                             @getOrgids="getGroupId"
                             orgtype="2"
                             style="width: 100%"></org>
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
                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.plsummary">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250"
                    >
                      <template slot-scope="scope">
                        <dicselect :code="code20"
                                   :data="scope.row.accountcode"
                                   :disabled="!disable"
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
                                   :data="scope.row.facilitytype"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getfacilitytypeon">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_FACILITYNAME')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" maxlength="20" v-model="scope.row.facilityname">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCY')" align="center"
                                     prop="accommodationallowance"
                                     v-if="this.form.type === '0'? false : true" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code3"
                                   :data="scope.row.accommodationallowance"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1002VIEW_FOREIGNCURRENCY')" align="center" prop="travel"
                                     v-if="this.form.type === '0'? false : true" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="!disable"
                          :max="1000000000"
                          :min="0"
                          :precision="2"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.travel"
                          @change="changeTravel(scope.row)"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_TRAVELALLOWANCE')" align="center"
                                     prop="rmb" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="scope.row.accountcode === 'PJ119001' || 'PJ132001' ? false : true"
                          :max="1000000000"
                          :min="0"
                          :precision="2"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.rmb"
                          @change="changelowance(scope.row)"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center"
                                     width="150">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="true"
                          :precision="2"
                          @change="changeRMB(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.taxes">
                        </el-input-number>
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

            <!--            第四页-->
            <el-tab-pane :disabled="this.form.business_id === '' ? true : false"
                         :label="$t('label.PFANS1012VIEW_OTHER')" name="fourth">
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableR" :summary-method="getRsummaries" border
                            header-cell-class-name="sub_bg_color_blue" show-summary stripe>
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
                            :key="item.value"
                            :label="item.lable"
                            :value="item.value"
                            v-for="item in optionsdata">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_DEPARTMENT')" align="center" width="200">
                      <template slot-scope="scope">
                        <org :error="errorgroup"
                             :no="scope.row"
                             :orglist="scope.row.departmentname"
                             @getOrgids="getGroupId"
                             orgtype="2"
                             style="width: 100%"></org>
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
                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.plsummary">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250">
                      <template slot-scope="scope">
                        <dicselect :code="code20"
                                   :data="scope.row.accountcode"
                                   :disabled="!disable"
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
                        <el-input :disabled="!disable" maxlength="20" style="width: 100%"
                                  v-model="scope.row.region">
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
                    <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCY')" align="center"
                                     prop="accommodationallowance"
                                     v-if="this.form.type === '0'? false : true" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code3"
                                   :data="scope.row.accommodationallowance"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row">
                        </dicselect>
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
  import {getDictionaryInfo, getOrgInfo, getOrgInfoByUserId, getUserInfo} from '@/utils/customize';
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
        // disaccommod: false,
        // showtick: true,
        // checkStatus: false,
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
          usexchangerate: getDictionaryInfo('PJ003001').value2,
          reimbursementdate: moment(new Date()).format('YYYY-MM-DD'),
          personalcode: getUserInfo(this.$store.getters.userinfo.userid).userinfo.personalcode,
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
          evectionid: '',
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
          budgetcoding: getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding,
          evectionid: '',
          trafficdetails_id: '',
          publicexpenseid: '',
          trafficdate: '',
          plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
          accountcode: '',
          subjectnumber: '',
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
          accommodationallowance: '',
          annexno: '',
          rowindex: '',
        }],
        tableA: [{
          evectionid: '',
          accommodationdetails_id: '',
          accommodationdate: [],
          invoicenumber: '',
          plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
          accountcode: this.Redirict == '0' ? 'PJ119001' : 'PJ132001',
          budgetcoding: getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding,
          subjectnumber: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          activitycontent: '',
          city: '',
          region: '',
          facilitytype: '',
          facilityname: '',
          accommodationallowance: '',
          accommodation: '',
          rmb: '',
          travel: '',
          annexno: '',
          rowindex: '',
          taxes: '',
          costitem: '',
          // disaccommod: false,
          // showtick: true,
        },
          {
            evectionid: '',
            accommodationdetails_id: '',
            accommodationdate: [],
            invoicenumber: '',
            plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
            accountcode: this.Redirict == '0' ? 'PJ119005' : 'PJ132005',
            budgetcoding: getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding,
            subjectnumber: '',
            departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
            activitycontent: '',
            city: '',
            region: '',
            facilitytype: '',
            facilityname: '',
            accommodationallowance: '',
            accommodation: '',
            rmb: '',
            travel: '',
            annexno: '',
            rowindex: '',
            taxes: '',
            costitem: '',
            // disaccommod: false,
            // showtick: true,
          }],
        tableR: [{
          evectionid: '',
          otherdetails_id: '',
          otherdetailsdate: '',
          invoicenumber: '',
          budgetcoding: getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding,
          subjectnumber: '',
          plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
          accountcode: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          costitem: '',
          remarks: '',
          rmb: '',
          taxrate: '',
          foreigncurrency: '',
          annexno: '',
          taxes: '',
          accommodationallowance: '',
          rowindex: '',
        }],
        rules: {
          userid: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
          telephone: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_TELEPHONE'),
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
        // code5: 'PJ025',
        // code6: 'PJ026',
        // code7: 'PJ027',
        // code8: 'PJ020',
        code9: 'PJ017',
        code10: 'PJ035',
        // code11: 'PJ036',
        code12: 'PJ068',
        code13: 'PJ071',
        // code14: 'PJ126',
        code15: 'PJ083',
        // code16: 'PJ084',
        // code17: 'PJ085',
        // code18: 'PJ057',
        // code19: 'PJ003',
        code20: this.Redirict == '0' ? 'PJ119' : 'PJ132',
        multiple: false,
        // show1: true,
        show2: false,
        // show: false,
        // showrow: true,
        // showrow2: false,
        // showrow3: true,
        // showrow4: false,
        // showAinner: true,
        showAout: false,
        // showdata: true,
        // showdata2: true,
        showforeigncurrency: false,
        canStart: false,
        rank: '',
        invoicenumber: '',
        errorgroup: '',
        orglist: '',
        Redirict: getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).redirict,
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
              for (let i = 0; i < response.accommodationdetails.length; i++) {
                if (response.accommodationdetails[i].accommodationdate !== '' && response.accommodationdetails[i].accommodationdate !== null) {
                  let time = response.accommodationdetails[i].accommodationdate;
                  let starttime = time.slice(0, 10);
                  let endtime = time.slice(time.length - 10);
                  response.accommodationdetails[i].accommodationdate = [starttime, endtime];
                }
              }
              this.tableA = response.accommodationdetails;
              for (var i = 0; i < this.tableA.length; i++) {
                if (this.$route.params.method === 'view') {
                  if (this.form.type === '0') {
                    this.tableA[i].showAinner = true;
                    this.tableA[i].showAout = true;
                    this.showrow3 = true;
                    // this.showrow4 = true;
                    // this.tableA[i].vehicleon = this.tableA[i].vehicle;
                    this.showrow = true;
                    this.showrow2 = true;
                    // this.tableA[i].facilitytypeon = this.tableA[i].facilitytype;
                    // this.tableA[i].showtick = true;
                    // this.tableA[i].disaccommod = true;
                  } else if (this.form.type === '1') {
                    this.tableA[i].showAinner = true;
                    this.tableA[i].showAout = true;
                    this.showrow3 = true;
                    // this.showrow4 = true;
                    // this.tableA[i].vehiclein = this.tableA[i].vehicle;
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
                    // this.showrow4 = false;
                    // this.tableA[i].vehicleon = this.tableA[i].vehicle;
                    this.showrow = true;
                    this.showrow2 = false;
                    // this.tableA[i].facilitytypeon = this.tableA[i].facilitytype;
                    // if (this.tableA[i].vehicleon === 'PJ025004') {
                    //   this.tableA[i].showtick = false;
                    //   this.tableA[i].disaccommod = true;
                    // } else if (this.tableA[i].vehicleon === 'PJ025001' || this.tableA[i].vehicleon === 'PJ025002' || this.tableA[i].vehicleon === 'PJ025003') {
                    //   this.tableA[i].showtick = true;
                    //   this.tableA[i].disaccommod = false;
                    // }
                  } else if (this.form.type === '1') {
                    this.tableA[i].showAinner = false;
                    this.tableA[i].showAout = true;
                    this.showrow3 = false;
                    // this.showrow4 = true;
                    // this.tableA[i].vehiclein = this.tableA[i].vehicle;
                    this.showrow = false;
                    this.showrow2 = true;
                    // this.tableA[i].facilitytypein = this.tableA[i].facilitytype;
                  }
                }
              }
            }
            if (response.otherdetails.length > 0) {
              // for (let i = 0; i < response.otherdetails.length; i++) {
              //   this.orglist = response.otherdetails[i].departmentname;
              //   if (response.otherdetails[i].costitem === 'PJ057001') {
              //     this.checkStatus = true;
              //   } else if (response.otherdetails[i].costitem === 'PJ057015') {
              //     this.checkStatus = true;
              //   } else if (response.otherdetails[i].costitem === 'PJ057016') {
              //     this.checkStatus = true;
              //   }
              // }
              this.tableR = response.otherdetails;
            }
            if (response.currencyexchanges.length > 0) {
              this.tableW = response.currencyexchanges;
            }
            if (response.invoice.length > 0) {
              this.tableF = response.invoice;
            }
            if (this.form.type === '0') {
              this.getBusInside();
              // this.showdata = true;
              // this.showdata2 = false;
              // this.showAinner = true;
              this.showAout = false;
              this.show = true;
              this.show2 = false;
              // this.showdata = true;
              // this.showdata2 = false;
              // this.showAinner = true;
              this.showAout = false;
              this.showforeigncurrency = false;
              this.showrow = true;
              this.showrow3 = true;
              this.showrow2 = false;
              this.showrow4 = false;
            } else {
              this.getBusOuter();
              // this.showdata = false;
              // this.showdata2 = true;
              // this.showAinner = false;
              this.showAout = true;
              this.show = false;
              this.show2 = true;
              this.showforeigncurrency = true;
              this.showrow = false;
              this.showrow2 = true;
              this.showrow3 = false;
              // this.showrow4 = true;
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
          // this.showdata = true;
          // this.showdata2 = false;
          // this.showAinner = true;
          this.showAout = false;
        } else {
          // this.showdata = false;
          // this.showdata2 = true;
          // this.showAinner = false;
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
      getcode(val, row) {
        row.accountcode = val;
        let dic = getDictionaryInfo(val);
        if (dic) {
          row.subjectnumber = dic.value2;
        }
      },
      getLoanapp() {
        this.$store
          .dispatch('PFANS1013Store/getLoanApplication')
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              if (response[i].user_id === this.$store.getters.userinfo.userid) {
                this.loans.push({
                  value: response[i].loanapplication_id,
                  label: this.$t('menu.PFANS1006') + '_' + moment(response[i].createon).format('YYYY-MM-DD'),
                  moneys: response[i].moneys,
                });
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
                  city: response[i].region,
                  startdate: response[i].startdate,
                  enddate: response[i].enddate,
                  level: response[i].level,
                  businesstype: response[i].businesstype,
                  datenumber: response[i].datenumber,
                });
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
                  city: response[i].region,
                  startdate: response[i].startdate,
                  enddate: response[i].enddate,
                  businesstype: response[i].businesstype,
                  datenumber: response[i].datenumber,
                });
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
          this.Redirict = group.redirict;
          if (group.redirict === '0') {
            this.code20 = 'PJ119';
          } else if (group.redirict === '1') {
            this.code20 = 'PJ132';
          }
          this.companyen = group.companyen;
          row.budgetcoding = group.encoding;
        }
      },
      gettype(val) {
        [{
          evectionid: '',
          accommodationdetails_id: '',
          accommodationdate: [],
          invoicenumber: '',
          plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
          accountcode: this.Redirict === '0' ? 'PJ119001' : 'PJ132001',
          budgetcoding: getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding,
          subjectnumber: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          activitycontent: '',
          city: '',
          region: '',
          facilitytype: '',
          facilityname: '',
          accommodationallowance: '',
          accommodation: '',
          rmb: '',
          travel: '',
          annexno: '',
          rowindex: '',
          taxes: '',
          costitem: '',
          // disaccommod: false,
          // showtick: true,
        },
          {
            evectionid: '',
            accommodationdetails_id: '',
            accommodationdate: [],
            invoicenumber: '',
            plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
            accountcode: this.Redirict === '0' ? 'PJ119005' : 'PJ132005',
            budgetcoding: getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding,
            subjectnumber: '',
            departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
            activitycontent: '',
            city: '',
            region: '',
            facilitytype: '',
            facilityname: '',
            accommodationallowance: '',
            accommodation: '',
            rmb: '',
            travel: '',
            annexno: '',
            rowindex: '',
            taxes: '',
            costitem: '',
            // disaccommod: false,
            // showtick: true,
          }],
          this.activeName = 'first',
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
          // this.showdata = true;
          // this.showdata2 = false;
          // this.showAinner = true;
          this.showAout = false;
          this.showforeigncurrency = false;
          this.showrow3 = true;
          // this.showrow4 = false;
          this.showrow = true;
          this.showrow2 = false;
        } else {
          this.getBusOuter();
          this.form.business_id = '';
          this.form.place = '';
          this.form.startdate = '';
          this.form.enddate = '';
          this.form.datenumber = '';
          this.show = false;
          this.show2 = true;
          // this.showdata = false;
          // this.showdata2 = true;
          // this.showAinner = false;
          this.showAout = true;
          this.showforeigncurrency = true;
          this.showrow3 = false;
          // this.showrow4 = true;
          this.showrow = false;
          this.showrow2 = true;
        }
      },
      getUserids(val) {
        this.form.userid = val;
        this.form.personalcode = getUserInfo(val).userinfo.personalcode;
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
      changeamount(row){
        if(row.amount !== '' && row.exchangerate > 0){
          row.exchangermb = row.amount / row.exchangerate;
        } else {
          row.exchangermb = 0.00;
        }
      },
      changeSum(row) {
        if (row.taxrate === '') {
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
            accommodationallowance: '',
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
            accommodationdate: [],
            activitycontent: ' ',
            budgetcoding: '',
            plsummary: '',
            accountcode: '',
            subjectnumber: '',
            city: '',
            region: ' ',
            facilitytype: '',
            facilityname: '',
            accommodationallowance: '',
            accommodation: '',
            rmb: '',
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
            plsummary: '',
            accountcode: '',
            rmb: '',
            subjectnumber: '',
            remarks: '',
            budgetcoding: '',
            foreigncurrency: '',
            annexno: '',
            accommodationallowance: '',
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
          budgetcoding: getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding,
          evectionid: '',
          trafficdetails_id: '',
          publicexpenseid: '',
          trafficdate: '',
          invoicenumber: '',
          plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
          accountcode: '',
          subjectnumber: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          taxes: '',
          costitem: '',
          region: '',
          vehicle: '',
          startingpoint: '',
          rmb: '',
          taxrate: '',
          accommodationallowance: '',
          foreigncurrency: '',
          annexno: '',
          rowindex: '',
        });
      },
      addRow3() {
        this.tableA.push({
          evectionid: '',
          accommodationdetails_id: '',
          accommodationdate: [],
          // nextday: '',
          invoicenumber: '',
          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          activitycontent: '',
          plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
          accountcode: '',
          // vehicle: '',
          // vehicleon: '',
          // vehiclein: '',
          // movementtime: '',
          budgetcoding: getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding,
          subjectnumber: '',
          city: '',
          region: '',
          facilitytype: '',
          // facilitytypeon: '',
          // facilitytypein: '',
          facilityname: '',
          accommodationallowance: '',
          accommodation: '',
          rmb: '',
          travel: '',
          // relatives: '',
          // traintick: 0,
          annexno: '',
          rowindex: '',
          taxes: '',
          costitem: '',
          // disaccommod: false,
          // showtick: true,
        });
      },
      addRow4() {
        this.tableR.push({
          evectionid: '',
          otherdetails_id: '',
          otherdetailsdate: '',
          invoicenumber: '',
          budgetcoding: getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding,
          plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
          accountcode: '',
          subjectnumber: '',

          departmentname: getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId,
          costitem: '',
          remarks: '',
          rmb: '',
          taxrate: '',
          foreigncurrency: '',
          annexno: '',
          taxes: '',
          accommodationallowance: '',
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
          evectionid: '',
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
            if (index === 4) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index === 5) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--';
          }
        });
        // this.getforeign(sums);
        this.getMoney(sums);
        // this.getValue(sums);
        // this.getValue2(sums);
        return sums;
      },
      changebusiness(val) {
        this.form.startdate = '';
        this.form.enddate = '';
        this.form.business_id = val;
        for (var i = 0; i < this.relations.length; i++) {
          if (this.relations[i].value === val) {
            let cityinfo = getDictionaryInfo(this.relations[i].city);
            if (cityinfo) {
              this.form.place = cityinfo.value1;
              this.tableA[0].region = cityinfo.value1;
              this.tableA[1].region = cityinfo.value1;
              if(cityinfo.code === 'PJ017001' || cityinfo.code === 'PJ017002'){
                this.tableA[0].accommodationallowance = 'PJ003002';
                this.tableA[1].accommodationallowance = 'PJ003002';
              } else if(cityinfo.code === 'PJ017003' || cityinfo.code === 'PJ017004'){
                this.tableA[0].accommodationallowance = 'PJ003001';
                this.tableA[1].accommodationallowance = 'PJ003001';
              }
            }
            this.rank = this.relations[i].level;
            let dict = getDictionaryInfo(this.relations[i].level);
            if (dict) {
              this.form.level = dict.value1;
            }
            this.form.abroadbusiness = this.relations[i].abroadbusiness;
            this.form.startdate = this.relations[i].startdate;
            this.form.enddate = this.relations[i].enddate;
            this.form.datenumber = this.relations[i].datenumber;
            this.tableT[0].trafficdate = this.form.startdate;
            this.tableR[0].otherdetailsdate = this.form.startdate;
            this.tableA[0].accommodationdate = [this.relations[i].startdate, this.relations[i].enddate];
            this.tableA[0].subjectnumber = getDictionaryInfo(this.tableA[0].accountcode).value2;
            this.tableA[1].accommodationdate = [this.relations[i].startdate, this.relations[i].enddate];
            this.tableA[1].subjectnumber = getDictionaryInfo(this.tableA[0].accountcode).value2;
            this.tableA[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
          }
        }
      },
      change2(val) {
        this.form.loanamount = '';
        for (var i = 0; i < this.loans.length; i++) {
          if (this.loans[i].value === val) {
            this.form.loanamount = this.loans[i].moneys;
          }
        }
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
            if (index === 7) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index === 8) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index === 10) {
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
            if (index === 3) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index === 4) {
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
            if (index === 1) {
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
      changeTravel(val, row) {
        row.travel = val;
        this.getTravel(row);
      },
      // changeAccdate(val, row) {
      //   row.accommodationdate = val;
      //   var diffDate1 = moment(row.accommodationdate[1]).diff(moment(row.accommodationdate[0]), 'days');
      //   alert(diffDate1);
      //   this.getTravel(row);
      // },
      getexitarea(val, row) {
        row.region = val;
        this.getTravel(row);
      },
      getfacilitytypeon(val, row) {
        row.facilitytype = val;
        this.getTravel(row);
      },
      getCity(row) {
        this.getTravel(row);
      },
      getcostitem(val, row) {
        row.costitem = val;
        this.getTravel(row);
      },
      getTravel(row) {
        var jpvalueflg;
        var jpvalueflg2;
        var jpregion1;
        var jpregion2;
        var jpregion3;
        var jpregion4;
        var jpregion5;
        var jpregion6;
        var jpregion7;
        var jpregion8;
        var jpregion9;
        var jpregion10;
        var jpregion11;
        var jpregion12;
        let jpregioninfo = getDictionaryInfo('PJ035001');
        if (jpregioninfo) {
          jpregion1 = jpregioninfo.value2;
          jpregion2 = jpregioninfo.value3;
          jpregion3 = jpregioninfo.value4;
          jpregion4 = jpregioninfo.value5;
          jpregion5 = jpregioninfo.value6;
          jpregion6 = jpregioninfo.value7;
          jpregion7 = jpregioninfo.value8;
        }
        let jpregioninfo2 = getDictionaryInfo('PJ035002');
        if (jpregioninfo2) {
          jpregion8 = jpregioninfo2.value2;
          jpregion9 = jpregioninfo2.value3;
          jpregion10 = jpregioninfo2.value4;
          jpregion11 = jpregioninfo2.value5;
          jpregion12 = jpregioninfo2.value8;
        }
        // var diffDate = moment(this.form.enddate).diff(moment(this.form.startdate), 'days');
        var diffDate = moment(row.accommodationdate[1]).diff(moment(row.accommodationdate[0]), 'days');
        if (this.form.type === '0') {
          if (this.Redirict === '0' ? (row.accountcode === 'PJ132001') : (row.accountcode === 'PJ119001')) {
            if (row.facilitytype === 'PJ035001') {
              if (row.city !== '') {
                if (row.city === this.$t('label.PFANS1013FORMVIEW_BEIJING') || row.city === this.$t('label.PFANS1013FORMVIEW_SHANGHAI')
                  || row.city === this.$t('label.PFANS1013FORMVIEW_GUANGZHOU') || row.city === this.$t('label.PFANS1013FORMVIEW_SHENZHEN')) {
                  if (row.rmb / diffDate > jpregion1) {
                    Message({
                      message: this.$t('label.PFANS1013FORMVIEW_RMBLIMIT'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                  }
                } else {
                  if (row.rmb / diffDate > jpregion2) {
                    Message({
                      message: this.$t('label.PFANS1013FORMVIEW_RMBLIMIT'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                  }
                }
              }
            } else if (row.facilitytype === 'PJ035002') {
              if (row.city !== '') {
                if (row.city === this.$t('label.PFANS1013FORMVIEW_BEIJING') || row.city === this.$t('label.PFANS1013FORMVIEW_SHANGHAI')
                  || row.city === this.$t('label.PFANS1013FORMVIEW_GUANGZHOU') || row.city === this.$t('label.PFANS1013FORMVIEW_SHENZHEN')) {
                  if (row.rmb / diffDate > jpregion8) {
                    Message({
                      message: this.$t('label.PFANS1013FORMVIEW_RMBLIMIT'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                  }
                } else {
                  if (row.rmb / diffDate > jpregion9) {
                    Message({
                      message: this.$t('label.PFANS1013FORMVIEW_RMBLIMIT'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                  }
                }
              }
            }
          } else if (this.Redirict === '0' ? (row.accountcode === 'PJ132005') : (row.accountcode === 'PJ119005')) {
            row.rmb = 150 * diffDate;
          } else if (this.Redirict === '0' ? (row.accountcode === 'PJ132006') : (row.accountcode === 'PJ119006')) {
            row.rmb = Number(row.rmb + 100) * diffDate;
          }
        } else if (this.form.type === '1') {
          var accfig;
          var regionflg;
          if(row.region === 'PJ017001' || row.region === 'PJ017002'){
            regionflg = 'PJ003002'
          } else if(row.region === 'PJ017003' || row.region === 'PJ017004'){
            regionflg = 'PJ003001'
          }
          let accinfo = getDictionaryInfo(regionflg);
          if (accinfo) {
            accfig = accinfo.value2;
          }
          if (this.Redirict === '0' ? (row.accountcode === 'PJ132001') : (row.accountcode === 'PJ119001')) {
            if (row.facilitytype === 'PJ035001') {
              if (row.region === 'PJ017001') {
                if(row.travel / diffDate > jpregion3){
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
                // row.travel = Number(jpvalueflg) * diffDate;
                // jpvalueflg = jpregion3;
              } else if (row.region === 'PJ017002') {
                if(row.travel / diffDate > jpregion4){
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
              } else if (row.region === 'PJ017003') {
                if(row.travel / diffDate > jpregion5){
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
              } else if (row.region === 'PJ017004') {
                if(row.travel / diffDate > jpregion6){
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
              }
            } else if (row.facilitytype === 'PJ035002') {
              if (row.region === 'PJ017001') {
                if(row.travel / diffDate > jpregion10){
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
              } else if (row.region === 'PJ017002') {
                if(row.travel / diffDate > jpregion11){
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
              }
            }
            if (accfig !== '' && accfig !== undefined && row.travel !== '' && row.travel !== undefined) {
              // row.travel = Number(jpvalueflg) * diffDate;
              row.rmb = row.travel / accfig;
            }
          } else if (this.Redirict === '0' ? (row.accountcode === 'PJ132005') : (row.accountcode === 'PJ119005')) {
            if (this.rank === 'PJ016003') {
              jpvalueflg2 = Number(jpregion12) + 100;
            } else {
              jpvalueflg2 = Number(jpregion12);
            }
            if (jpvalueflg2 !== '' && jpvalueflg2 !== undefined) {
              row.rmb = Number(jpvalueflg2) * diffDate;
              // row.travelallowance = row.travel * accfig;
            }
          } else if (this.Redirict === '0' ? (row.accountcode === 'PJ132006') : (row.accountcode === 'PJ119006')) {
            if (jpvalueflg2 !== '' && jpvalueflg2 !== undefined) {
              row.rmb = Number(jpvalueflg2 + 100) * diffDate;
            }
            // row.travelallowance = row.travel * accfig;
          }
          // var varbusiness;
          // if (this.rank === 'PJ016001') {
          //   let businessdic = getDictionaryInfode(row.region, this.$t('label.PFANS1013FORMVIEW_R7DOW'), row.facilitytypein);
          //   if (businessdic) {
          //     varbusiness = businessdic.value4;
          //   }
          // } else if (this.rank === 'PJ016002') {
          //   let businessdic = getDictionaryInfode(row.region, this.$t('label.PFANS1013FORMVIEW_R8UP'), row.facilitytypein);
          //   if (businessdic) {
          //     varbusiness = businessdic.value4;
          //   }
          // } else if (this.rank === 'PJ016002') {
          //   let businessdic = getDictionaryInfode(row.region, this.$t('label.PFANS1013FORMVIEW_CHUXIANGZHE'), row.facilitytypein);
          //   if (businessdic) {
          //     varbusiness = businessdic.value4;
          //   }
          // }
          // var vartravel = 0;
          // if (varbusiness !== '' && varbusiness !== undefined) {
          //   vartravel = Number(varbusiness);
          // }
          // row.travel = varbusiness;
        }
      },
      // getforeign(sums) {
      //   if (this.form.type === '0') {
      //     this.form.totalcurrency = null;
      //   }
      //   if (this.form.type === '1') {
      //     this.form.totalcurrency = sums[5] + this.tableAValue[11] + this.tableAValue[12] + this.tableAValue[13] + this.tableRValue[4];
      //   }
      // },
      getMoney(sums) {
        if (this.form.type === '0') {
          this.form.totalpay = sums[10] + this.tableRValue[9] + this.tableAValue[11]
        } else if (this.form.type === '1') {
          this.form.totalpay = sums[10] + this.tableRValue[9] + this.tableAValue[13];
        }
        this.form.balance = this.form.loanamount - this.form.totalpay;
      },
      // getValue(sums) {
      //   this.tableData[0].rmb = sums[9];
      //   this.tableData[1].rmb = this.tableAValue[10];
      //   this.tableData[2].rmb = this.tableAValue[11] + this.tableAValue[12] + this.tableAValue[13];
      //   if (this.accountcodeValue !== '') {
      //     this.tableData[3].rmb = this.tableRValue[8];
      //   } else {
      //     this.tableData[3].rmb = this.tableRValue[7];
      //   }
      //
      // },
      // getValue2(sums) {
      //   this.tableData2[0].rmb = sums[9];
      //   this.tableData2[1].rmb = this.tableAValue[11];
      //   if (this.accountcodeValue !== '') {
      //     this.tableData2[3].rmb = this.tableRValue[8];
      //   } else {
      //     this.tableData2[3].rmb = this.tableRValue[7];
      //   }
      //   for (var i = 0; i < this.tableData2.length; i++) {
      //     this.tableData2[i].total = this.tableData2[i].rmb;
      //   }
      //   if (this.form.currency === 'PJ003001') {
      //     this.tableData2[0].usdcurrency = sums[10];
      //     this.tableData2[1].usdcurrency = this.tableAValue[11];
      //     this.tableData2[2].usdcurrency = this.tableAValue[12] + this.tableAValue[13];
      //     if (this.accountcodeValue !== '') {
      //       this.tableData2[3].usdcurrency = this.tableRValue[9];
      //     } else {
      //       this.tableData2[3].usdcurrency = this.tableRValue[8];
      //     }
      //     for (var i = 0; i < this.tableData2.length; i++) {
      //       this.tableData2[i].jpycurrency = '';
      //       this.tableData2[i].ratecurrency = '';
      //       this.tableData2[i].total = this.tableData2[i].usdcurrency * this.form.dollarfxrate + this.tableData2[i].rmb;
      //     }
      //   } else if (this.form.currency === 'PJ003002') {
      //     this.tableData2[0].jpycurrency = sums[10];
      //     this.tableData2[1].jpycurrency = this.tableAValue[11];
      //     this.tableData2[2].jpycurrency = this.tableAValue[12] + this.tableAValue[13];
      //     if (this.accountcodeValue !== '') {
      //       this.tableData2[3].jpycurrency = this.tableRValue[9];
      //     } else {
      //       this.tableData2[3].jpycurrency = this.tableRValue[8];
      //     }
      //     for (var i = 0; i < this.tableData2.length; i++) {
      //       this.tableData2[i].usdcurrency = '';
      //       this.tableData2[i].ratecurrency = '';
      //       this.tableData2[i].total = this.tableData2[i].jpycurrency * this.form.jpyfxrate + this.tableData2[i].rmb;
      //     }
      //   } else if (this.form.currency === 'PJ003003') {
      //     this.tableData2[0].ratecurrency = sums[10];
      //     this.tableData2[1].ratecurrency = this.tableAValue[11];
      //     this.tableData2[2].ratecurrency = this.tableAValue[12] + this.tableAValue[13];
      //     if (this.accountcodeValue !== '') {
      //       this.tableData2[3].ratecurrency = this.tableRValue[9];
      //     } else {
      //       this.tableData2[3].ratecurrency = this.tableRValue[8];
      //     }
      //     for (var i = 0; i < this.tableData2.length; i++) {
      //       this.tableData2[i].total = this.tableData2[i].ratecurrency * this.form.otherfxrate + this.tableData2[i].rmb;
      //       this.tableData2[i].usdcurrency = '';
      //       this.tableData2[i].jpycurrency = '';
      //     }
      //   }
      // },
        getcurrency(val,row) {
        row.currency = val;
        let curinfo = getDictionaryInfo(val);
        if(curinfo){
          row.currencyexchangerate = curinfo.value2;
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
      changelowance(newValue) {
        this.getTravel(newValue);
        for (let j = 0; j < this.tableF.length; j++) {
          if (newValue.invoicenumber === this.tableF[j].invoicenumber) {
            if (newValue.rmb !== '') {
              if (this.tableF[j].taxrate !== '') {
                if (this.tableF[j].taxrate === 'PJ071001') {
                  this.taxrateValue = '0.03';
                } else if (this.tableF[j].taxrate === 'PJ071002') {
                  this.taxrateValue = '0.06';
                } else if (this.tableF[j].taxrate === 'PJ071003') {
                  this.taxrateValue = '0.09';
                } else if (this.tableF[j].taxrate === 'PJ071004') {
                  this.taxrateValue = '0.13';
                }
                taxratevalue = 1 + Number(this.taxrateValue);
                newValue.taxes = (newValue.rmb / (taxratevalue) * this.taxrateValue);
              }
            }
          }
        }
      },
      changeRMB(newValue) {
        for (let j = 0; j < this.tableF.length; j++) {
          if (newValue.invoicenumber === this.tableF[j].invoicenumber) {
            if (newValue.rmb !== '') {
              if (this.tableF[j].taxrate !== '') {
                if (this.tableF[j].taxrate === 'PJ071001') {
                  this.taxrateValue = '0.03';
                } else if (this.tableF[j].taxrate === 'PJ071002') {
                  this.taxrateValue = '0.06';
                } else if (this.tableF[j].taxrate === 'PJ071003') {
                  this.taxrateValue = '0.09';
                } else if (this.tableF[j].taxrate === 'PJ071004') {
                  this.taxrateValue = '0.13';
                }
                newValue.taxes = newValue.rmb - (newValue.rmb * this.taxrateValue);
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
              this.baseInfo.invoice = [];
              this.baseInfo.currencyexchanges = [];
              for (let i = 0; i < this.tableT.length; i++) {
                if (this.tableT[i].trafficdate !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
                  || this.tableT[i].rmb > 0 || this.tableT[i].foreigncurrency > 0 || this.tableT[i].annexno !== ''
                  || this.tableT[i].invoicenumber !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== ''
                  || this.tableT[i].taxes !== '' || this.tableT[i].accommodationallowance !== '' || this.tableT[i].costitem !== '') {
                  this.baseInfo.trafficdetails.push(
                    {
                      trafficdetails_id: this.tableT[i].trafficdetails_id,
                      evectionid: this.tableT[i].evectionid,
                      publicexpenseid: this.tableT[i].publicexpenseid,
                      trafficdate: this.tableT[i].trafficdate,
                      invoicenumber: this.tableT[i].invoicenumber,
                      plsummary: this.tableT[i].plsummary,
                      accountcode: this.tableT[i].accountcode,
                      subjectnumber: this.tableT[i].subjectnumber,
                      departmentname: this.tableT[i].departmentname,
                      budgetcoding: this.tableT[i].departmentname,
                      taxes: this.tableT[i].taxes,
                      costitem: this.tableT[i].costitem,
                      taxrate: this.tableT[i].taxrate,
                      accommodationallowance: this.tableT[i].accommodationallowance,
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
                if (this.tableA[i].accommodationdate !== '' || this.tableA[i].activitycontent !== '' || this.tableA[i].region !== ''
                  || this.tableA[i].movementtime !== '' || this.tableA[i].city !== '' || this.tableA[i].facilitytype !== '' || this.tableA[i].facilityname !== '' || this.tableA[i].accommodationallowance > 0
                  || this.tableA[i].accommodation > 0 || this.tableA[i].rmb > 0 || this.tableA[i].travel > 0
                  || this.tableA[i].annexno !== ''
                  || this.tableA[i].invoicenumber !== '' || this.tableA[i].departmentname !== '' || this.tableA[i].taxes !== '' || this.tableA[i].costitem !== '') {
                  this.baseInfo.accommodationdetails.push(
                    {
                      accommodationdetails_id: this.tableA[i].accommodationdetails_id,
                      evectionid: this.tableA[i].evectionid,
                      accommodationdate: moment(this.tableA[i].accommodationdate[0]).format('YYYY-MM-DD') + '~' + moment(this.tableA[i].accommodationdate[1]).format('YYYY-MM-DD'),
                      activitycontent: this.tableA[i].activitycontent,
                      region: this.tableA[i].region,
                      movementtime: this.tableA[i].movementtime,
                      city: this.tableA[i].city,
                      budgetcoding: this.tableA[i].budgetcoding,
                      subjectnumber: this.tableA[i].subjectnumber,
                      plsummary: this.tableA[i].plsummary,
                      accountcode: this.tableA[i].accountcode,
                      facilitytype: this.tableA[i].facilitytype,
                      facilityname: this.tableA[i].facilityname,
                      accommodationallowance: this.tableA[i].accommodationallowance,
                      accommodation: this.tableA[i].accommodation,
                      rmb: this.tableA[i].rmb,
                      travel: this.tableA[i].travel,
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
                  || this.tableR[i].invoicenumber !== '' || this.tableR[i].departmentname !== '' || this.tableR[i].budgetcoding !== ''
                  || this.tableR[i].subjectnumber !== '' || this.tableR[i].accommodationallowance !== '' || this.tableR[i].remarks !== '' || this.tableR[i].taxes !== '') {
                  this.baseInfo.otherdetails.push(
                    {
                      otherdetails_id: this.tableR[i].otherdetails_id,
                      evectionid: this.tableR[i].evectionid,
                      otherdetailsdate: this.tableR[i].otherdetailsdate,
                      costitem: this.tableR[i].costitem,
                      plsummary: this.tableR[i].plsummary,
                      accountcode: this.tableR[i].accountcode,
                      rmb: this.tableR[i].rmb,
                      budgetcoding: this.tableR[i].budgetcoding,
                      subjectnumber: this.tableR[i].subjectnumber,
                      accommodationallowance: this.tableR[i].accommodationallowance,
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
              for (let i = 0; i < this.tableF.length; i++) {
                if (this.tableF[i].invoicenumber !== '' || this.tableF[i].invoicetype !== '' || this.tableF[i].invoiceamount > 0 || this.tableF[i].taxrate !== ''
                  || this.tableF[i].excludingtax > 0 || this.tableF[i].facetax > 0) {
                  this.baseInfo.invoice.push(
                    {
                      invoice_id: this.tableF[i].invoice_id,
                      evectionid: this.tableF[i].evectionid,
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
              let error = 0;
              for (let j = 0; j < this.tableF.length; j++) {
                let summoney = 0;
                let summoneyT = 0;
                let sumMoney = 0;
                let sumout = 0;
                for (let i = 0; i < this.tableT.length; i++) {
                  if (this.tableT[i].trafficdate !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
                    || this.tableT[i].rmb > 0 || this.tableT[i].foreigncurrency > 0 || this.tableT[i].annexno !== ''
                    || this.tableT[i].invoicenumber !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== ''
                    || this.tableT[i].taxes !== '' || this.tableT[i].accommodationallowance !== '' || this.tableT[i].costitem !== '') {
                    if (this.tableT[i].invoicenumber == this.tableF[j].invoicenumber) {
                      if (this.tableT[i].rmb != '0') {
                        summoneyT += this.tableT[i].rmb;

                      }
                    }
                  }
                }
                for (let i = 0; i < this.tableA.length; i++) {
                  if (this.tableA[i].accommodationdate !== '' || this.tableA[i].activitycontent !== '' || this.tableA[i].region !== ''
                    || this.tableA[i].movementtime !== '' || this.tableA[i].city !== '' || this.tableA[i].facilitytype !== '' || this.tableA[i].facilityname !== '' || this.tableA[i].accommodationallowance > 0
                    || this.tableA[i].accommodation > 0 || this.tableA[i].rmb > 0 || this.tableA[i].travel > 0
                    || this.tableA[i].annexno !== ''
                    || this.tableA[i].invoicenumber !== '' || this.tableA[i].departmentname !== '' || this.tableA[i].taxes !== '' || this.tableA[i].costitem !== '') {
                    if (this.tableA[i].invoicenumber == this.tableF[j].invoicenumber) {
                      if (this.tableA[i].rmb != '0') {
                        summoney += this.tableA[i].rmb;

                      }
                    }
                  }
                }
                for (let i = 0; i < this.tableR.length; i++) {
                  if (this.tableR[i].otherdetailsdate !== '' || this.tableR[i].costitem !== '' || this.tableR[i].remarks !== ''
                    || this.tableR[i].rmb > 0 || this.tableR[i].foreigncurrency > 0 || this.tableR[i].annexno !== ''
                    || this.tableR[i].invoicenumber !== '' || this.tableR[i].departmentname !== '' || this.tableR[i].accommodationallowance !== ''
                    || this.tableR[i].budgetcoding !== '' || this.tableR[i].subjectnumber !== '' || this.tableR[i].remarks !== '' || this.tableR[i].taxes !== '') {
                    if (this.tableR[i].invoicenumber == this.tableF[j].invoicenumber) {
                      if (this.tableR[i].rmb != '0') {
                        sumMoney += this.tableR[i].rmb;

                      }
                    }
                  }
                }
                sumout = summoney + sumMoney + summoneyT;
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
              if (error == '0') {
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
            }
          });
        }

      },
    },
  };


</script>

<style lang="scss" rel="stylesheet/scss">

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






