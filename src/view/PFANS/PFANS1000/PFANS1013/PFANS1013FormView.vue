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
                      <el-input :disabled="true" style="width:20vw" v-model="centername"></el-input>
                      <el-input v-show="false" style="width:20vw" v-model="form.centerid">222</el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.group')">
                      <el-input :disabled="true" style="width:20vw" v-model="groupname"></el-input>
                      <el-input v-show="false" style="width:20vw" v-model="form.groupid">222</el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.team')">
                      <el-input :disabled="true" style="width:20vw" v-model="teamname"></el-input>
                      <el-input v-show="false" style="width:20vw" v-model="form.teamid">222</el-input>
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
                    <el-form-item :label="$t('label.PFANS1012VIEW_TELEPHONE')" prop="telephone">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_CAIWUPERSONALCODE')">
                      <el-input :disabled="!disable" style="width: 20vw" v-model="form.personalcode">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_RELATION')" prop="business_id">
                      <el-select :disabled="!disable" clearable @change="changebusiness" style="width:20vw"
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
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_REGION')">
                      <dicselect
                        :data="form.place"
                        :disabled="true"
                        code="PJ036"
                        style="width: 20vw">
                      </dicselect>
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
                </el-row>
                <el-row>
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
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_DATENUMBER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.datenumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--                  <el-col :span="8">-->
                  <!--                    <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">-->
                  <!--                      <dicselect-->
                  <!--                        :code="code1"-->
                  <!--                        :data="form.budgetunit"-->
                  <!--                        :disabled="!disable"-->
                  <!--                        :multiple="multiple"-->
                  <!--                        @change="getbudgetunit"-->
                  <!--                        style="width:20vw"-->
                  <!--                      >-->
                  <!--                      </dicselect>-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-col>-->
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_EXTERNAL')" prop="external">
                      <span style="margin-right: 1vw ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                      <el-switch
                        :disabled="true"
                        v-model="form.external"
                        active-value="1"
                        inactive-value="0"
                      >
                      </el-switch>
                      <span style="margin-left: 1vw ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" v-show="show2">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ABROADBUSINESS')">
                      <span style="margin-right: 1vw ">{{$t('label.no')}}</span>
                      <el-switch
                        :disabled="true"
                        active-value="1"
                        inactive-value="0"
                        v-model="form.abroadbusiness"
                      >
                      </el-switch>
                      <span style="margin-left: 1vw ">{{$t('label.yes')}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-show="show2">
                    <el-form-item :label="$t('label.PFANS1002VIEW_LEVEL')">
                      <el-input :disabled="true" style="width: 20vw" v-model="form.level">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013FORMVIEW_LOAN')">
                      <el-select :disabled="!disable" clearable @change="change2" style="width:20vw"
                                 v-model="form.loan">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in loans">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
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
                </el-row>
                <el-row>
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
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_REIMBURSEMENTDATE')">
                      <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.reimbursementdate">
                      </el-date-picker>
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
                            <el-input-number :max="9999999" :min="0" :no="scope.row" :disabled="!disable"
                                             :precision="2" :step="1" @change="changeamount(scope.row)"
                                             controls-position="right" style="width: 100%" v-model="scope.row.amount">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1013FORMVIEW_EXCHANGERATE')" align="center" width="180">
                          <template slot-scope="scope">
                            <el-input-number :max="9999999" :min="0" :no="scope.row" :disabled="!disable"
                                             :step="0.0001" @change="changeamount(scope.row)"
                                             controls-position="right" style="width: 100%"
                                             v-model="scope.row.exchangerate">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1013FORMVIEW_EXCHANGERMB')" align="center"
                                         prop="exchangermb"
                                         width="180">
                          <template slot-scope="scope">
                            <el-input-number :max="9999999" :min="0" :no="scope.row" :disabled="!disable"
                                             :precision="2" :step="1"
                                             controls-position="right" style="width: 100%"
                                             v-model="scope.row.exchangermb">
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
                        <span class="collapse_Title">{{$t('label.PFANS1012FORMVIEW_INVOICETTYPE')}}</span>
                        <span style="color: red;font-size: 0.85rem">{{$t('label.PFANS1012FORMVIEW_INVOICEI')}}</span>
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
                            <el-input v-show="false" :disabled="true" style="width: 100%"
                                      v-model="scope.row.invoicetype">
                            </el-input>
                            <el-input :disabled="true" style="width: 100%" v-model="invoicetype">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEM')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input-number :max="9999999" :min="0" :no="scope.row" :disabled="!disable"
                                             :precision="2" :step="1" @change="changeSum(scope.row)"
                                             controls-position="right" style="width: 100%"
                                             v-model="scope.row.invoiceamount">
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
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_EXCLUDINGTAX')" align="center"
                                         prop="debitamount"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disable"
                              :max="9999999" :min="0"
                              :no="scope.row"
                              :precision="2"
                              :step="1"
                              @change="changesummoney(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.excludingtax">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_FACETAX')" align="center"
                                         prop="creditamount"
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
                        <el-select :disabled="!disable" clearable style="width: 100%" v-model="scope.row.invoicenumber"
                                   @change="changeinvoicenumber(scope.row)">
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
                             :disabled="checktaxes"
                             :no="scope.row"
                             :orglist="scope.row.departmentname"
                             @getOrgids="getGroupIdT"
                             orgtype="2"
                             style="width: 90%"></org>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="200">
                      <template slot-scope="scope">
                        <!--                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">-->
                        <!--                        </el-input>-->
                        <el-select clearable style="width: 100%" v-model="scope.row.budgetcoding" :disabled="checktaxes"
                                   :placeholder="$t('normal.error_09')" :no="scope.row">
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
                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.plsummary">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250"
                    >
                      <template slot-scope="scope">
                        <!--                        <dicselect :code="code20"-->
                        <!--                                   :data="scope.row.accountcode"-->
                        <!--                                   :disabled="!disable"-->
                        <!--                                   :multiple="multiple"-->
                        <!--                                   :no="scope.row"-->
                        <!--                                   @change="getcode" style="width: 100%">-->
                        <!--                        </dicselect>-->
                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.accountcode">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNTB')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.subjectnumber">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_REGION')" align="center" width="200" >
                      <template slot-scope="scope" >
                        <!--                        <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.region">-->
                        <!--                        </el-input>-->
                        <dicselect :code="code21"
                                   :data="scope.row.region"
                                   :disabled="checktaxes"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getRegion">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_VEHICLE')" align="center" width="200">
                      <template slot-scope="scope">
                        <dicselect
                          :code="code15"
                          :data="scope.row.vehicle"
                          :disabled="checktaxes"
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
                          <el-input :disabled="checktaxes" maxlength="20" style="width: 100%"
                                    v-model="scope.row.startingpoint"/>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="checkmoney"
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
                                     prop="currency"
                                     v-if="this.form.type === '0'? false : true" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code3"
                                   :data="scope.row.currency"
                                   :disabled="checktaxes"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="changeAcc">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center"
                                     prop="foreigncurrency"
                                     v-if="showforeigncurrency" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="checktaxes"
                          :max="1000000000"
                          :min="0"
                          :no="scope.row"
                          :precision="2"
                          @change="changefore(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.foreigncurrency"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input :disabled="checktaxes" maxlength="20" style="width: 100%" v-model="scope.row.annexno">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.operation')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-button
                          :disabled="checktaxes"
                          @click.native.prevent="deleteRow(scope.$index, tableT)"
                          plain
                          size="small"
                          type="danger"
                        >{{$t('button.delete')}}
                        </el-button>
                        <el-button
                          :disabled="checktaxes"
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
                                        @change="getTravel(scope.row)"
                                        class="bigWidth"
                                        type="daterange"
                                        unlink-panels
                                        v-model="scope.row.accommodationdate"
                        ></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-select :disabled="!disable" clearable style="width: 100%" v-model="scope.row.invoicenumber"
                                   @change="changeinvoicenumber(scope.row)">
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
                             :disabled="checktaxes"
                             :no="scope.row"
                             :orglist="scope.row.departmentname"
                             @getOrgids="getGroupIdA"
                             orgtype="2"
                             style="width: 90%"></org>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="200">
                      <template slot-scope="scope">
                        <!--                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">-->
                        <!--                        </el-input>-->
                        <el-select clearable style="width: 100%" v-model="scope.row.budgetcoding" :disabled="checktaxes"
                                   :placeholder="$t('normal.error_09')" :no="scope.row">
                          <el-option
                            v-for="item in scope.row.optionsA"
                            :key="item.value"
                            :label="item.lable"
                            :value="item.value">
                          </el-option>
                        </el-select>
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
                                   :disabled="checktaxes"
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
                                   :disabled="checktaxes"
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
                                   :disabled="checktaxes"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getexitarea">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_CITY')" align="center" v-else width="200">
                      <template slot-scope="scope">
                        <!--                        <el-input :disabled="!disable" :no="scope.row" @blur="getCity(scope.row)" style="width: 100%"-->
                        <!--                                  v-model="scope.row.city">-->
                        <!--                        </el-input>-->
                        <dicselect :code="code2"
                                   :data="scope.row.city"
                                   :disabled="checktaxes"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getCity">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_FACILITYTYPE')" align="center" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code10"
                                   :data="scope.row.facilitytype"
                                   :disabled="checktaxes"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getfacilitytypeon">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_FACILITYNAME')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input :disabled="checktaxes" maxlength="20" v-model="scope.row.facilityname">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCY')" align="center"
                                     prop="currency"
                                     v-if="this.form.type === '0'? false : true" width="200">
                      <template slot-scope="scope">
                        <dicselect :code="code3"
                                   v-if="checktaxes"
                                   :data="scope.row.currency"
                                   :disabled="true"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getAccommodation">
                        </dicselect>
                        <dicselect :code="code3"
                                   v-else
                                   :data="scope.row.currency"
                                   :disabled="(scope.row.accountcode !== 'PJ132005' && scope.row.accountcode !== 'PJ132006') && (scope.row.accountcode !== 'PJ119005' && scope.row.accountcode !== 'PJ119006') ? false : true"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getAccommodation">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1002VIEW_FOREIGNCURRENCY')" align="center" prop="travel"
                                     v-if="this.form.type === '0'? false : true" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          v-if="checktaxes"
                          :disabled="true"
                          :max="1000000000"
                          :min="0"
                          :precision="2"
                          @change="changeTravel(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.travel"
                        ></el-input-number>
                        <el-input-number
                          v-else
                          :disabled="(scope.row.currency != 'PG019003') &&(scope.row.accountcode !== 'PJ132005' && scope.row.accountcode !== 'PJ132006') && (scope.row.accountcode !== 'PJ119005' && scope.row.accountcode !== 'PJ119006') ? false : true"
                          :max="1000000000"
                          :min="0"
                          :precision="2"
                          @change="changeTravel(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.travel"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013FORMVIEW_TRAVELALLOWANCE')" align="center"
                                     prop="rmb" width="200">
                      <template slot-scope="scope">
                        <el-input-number
                          :disabled="(scope.row.currency === 'PG019003' || scope.row.currency === '') && (scope.row.accountcode !== 'PJ132005' && scope.row.accountcode !== 'PJ132006') ? false : true"
                          :max="1000000000" :min="0"
                          :precision="2"
                          @change="changelowance(scope.row)"
                          controls-position="right"
                          style="width: 100%"
                          v-model="scope.row.rmb"
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
                        <el-input :disabled="checktaxes" maxlength="36" v-model="scope.row.annexno">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.operation')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-button
                          :disabled="checktaxes"
                          @click.native.prevent="deleteRow3(scope.$index, tableA)"
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
            </el-tab-pane>

            <!--            第四页-->
            <!--            <el-tab-pane :disabled="this.form.business_id === '' ? true : false"-->
            <!--                         :label="$t('label.PFANS1012VIEW_OTHER')" name="fourth">-->
            <!--              <el-row>-->
            <!--                <el-col :span="24">-->
            <!--                  <el-table :data="tableR" :summary-method="getRsummaries" border-->
            <!--                            header-cell-class-name="sub_bg_color_blue" show-summary stripe>-->
            <!--                    <el-table-column :label="$t('label.date')" align="center" width="200">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-date-picker :disabled="!disable" style="width: 100%" v-model="scope.row.otherdetailsdate">-->
            <!--                        </el-date-picker>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="150">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-select style="width: 100%" v-model="scope.row.invoicenumber">-->
            <!--                          <el-option-->
            <!--                            :key="item.value"-->
            <!--                            :label="item.lable"-->
            <!--                            :value="item.value"-->
            <!--                            v-for="item in optionsdata">-->
            <!--                          </el-option>-->
            <!--                        </el-select>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_DEPARTMENT')" align="center" width="200">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <org :error="errorgroup"-->
            <!--                             :no="scope.row"-->
            <!--                             :orglist="scope.row.departmentname"-->
            <!--                             @getOrgids="getGroupId"-->
            <!--                             orgtype="2"-->
            <!--                             style="width: 100%"></org>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="150">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">-->
            <!--                        </el-input>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_PL')" align="center" width="150">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.plsummary">-->
            <!--                        </el-input>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <dicselect :code="code20"-->
            <!--                                   :data="scope.row.accountcode"-->
            <!--                                   :disabled="!disable"-->
            <!--                                   :multiple="multiple"-->
            <!--                                   :no="scope.row"-->
            <!--                                   @change="getcode" style="width: 100%">-->
            <!--                        </dicselect>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNTB')" align="center" width="150">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.subjectnumber">-->
            <!--                        </el-input>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012VIEW_REGION')" align="center" width="150">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
            <!--                                  v-model="scope.row.region">-->
            <!--                        </el-input>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012VIEW_ABSTRACT')" align="center" width="200">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.remarks">-->
            <!--                        </el-input>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="200">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-input-number-->
            <!--                          :disabled="scope.row.currency === 'PG019003' || scope.row.currency === '' ? false : true"-->
            <!--                          :max="1000000000"-->
            <!--                          :min="0"-->
            <!--                          :precision="2"-->
            <!--                          @change="changeRMB(scope.row)"-->
            <!--                          controls-position="right"-->
            <!--                          style="width: 100%"-->
            <!--                          v-model="scope.row.rmb"-->
            <!--                        ></el-input-number>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center" prop="taxes"-->
            <!--                                     width="200">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-input-number-->
            <!--                          :disabled="true"-->
            <!--                          :precision="2"-->
            <!--                          controls-position="right"-->
            <!--                          style="width: 100%"-->
            <!--                          v-model="scope.row.taxes">-->
            <!--                        </el-input-number>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCY')" align="center"-->
            <!--                                     prop="currency"-->
            <!--                                     v-if="this.form.type === '0'? false : true" width="200">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <dicselect :code="code3"-->
            <!--                                   :data="scope.row.currency"-->
            <!--                                   :disabled="!disable"-->
            <!--                                   :multiple="multiple"-->
            <!--                                   :no="scope.row"-->
            <!--                                   @change="changeAcc">-->
            <!--                        </dicselect>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center"-->
            <!--                                     prop="foreigncurrency"-->
            <!--                                     v-if="showforeigncurrency" width="200">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-input-number-->
            <!--                          :disabled="!disable"-->
            <!--                          :max="1000000000"-->
            <!--                          :min="0"-->
            <!--                          :no="scope.row"-->
            <!--                          :precision="2"-->
            <!--                          @change="changefore(scope.row)"-->
            <!--                          controls-position="right"-->
            <!--                          style="width: 100%"-->
            <!--                          v-model="scope.row.foreigncurrency"-->
            <!--                        ></el-input-number>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="200">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-input :disabled="!disable" maxlength="20" v-model="scope.row.annexno">-->
            <!--                        </el-input>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column :label="$t('label.operation')" align="center" width="200">-->
            <!--                      <template slot-scope="scope">-->
            <!--                        <el-button-->
            <!--                          :disabled="!disable"-->
            <!--                          @click.native.prevent="deleteRow4(scope.$index, tableR)"-->
            <!--                          plain-->
            <!--                          size="small"-->
            <!--                          type="danger"-->
            <!--                        >{{$t('button.delete')}}-->
            <!--                        </el-button>-->
            <!--                        <el-button-->
            <!--                          :disabled="!disable"-->
            <!--                          @click="addRow4()"-->
            <!--                          plain-->
            <!--                          size="small"-->
            <!--                          type="primary"-->
            <!--                        >{{$t('button.insert')}}-->
            <!--                        </el-button>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                  </el-table>-->
            <!--                </el-col>-->
            <!--              </el-row>-->
            <!--            </el-tab-pane>-->
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
        optionsrate: [],
        checkmoney: false,
        checktaxes: false,
        invoicetype: '',
        Codecheck: '',
        centername: '',
        groupname: '',
        teamname: '',
        optionsdate: [{value: 'PP024001', lable: this.$t('label.PFANS5008FORMVIEW_PROJECTGTXM')}],
        error: '',
        week: '',
        tableList: [],
        accountcodeValue: '',
        relations: [],
        Todaysum: [],
        taxrateValue: '',
        loans: [],
        selectType: 'Single',
        title: 'title.PFANS1013VIEW',
        userlist: '',
        activeName: 'first',
        loading: false,
        disabled: false,
        tableTValue: '',
        tableAValue: '',
        // tableRValue: '',
        tableDValue: '',
        tableValue: '',
        baseInfo: {},
        // encoding:'',
        groupId: '',
        form: {
          external: '',
          level: '',
          abroadbusiness: '',
          project_id: '',
          type: '0',
          centerid: '',
          groupid: '',
          teamid: '',
          userid: '',
          telephone: '',
          business_id: '',
          place: '',
          startdate: '',
          enddate: '',
          datenumber: '',
          // budgetunit: '',
          loan: '',
          loanamount: '',
          currency: '',
          totalpay: '',
          totalcurrency: '',
          balance: '',
          jpyfxrate: '',
          dollarfxrate: '',
          otherfxrate: '',
          usexchangerate: getDictionaryInfo('PG019001').value2,
          reimbursementdate: moment(new Date()).format('YYYY-MM-DD'),
          personalcode: '',
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
          invoicenumber: this.$t('label.PFANS1012FORMVIEW_NUMBERZP') + 1,
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
          // publicexpenseid: '',
          trafficdate: '',
          plsummary: this.plsummaryflg,
          accountcode: '',
          subjectnumber: '',
          invoicenumber: '',
          departmentname: '',
          taxes: '',
          // costitem: '',
          region: '',
          vehicle: '',
          startingpoint: '',
          rmb: '',
          // taxrate: '',
          foreigncurrency: '',
          currency: '',
          annexno: '',
          rowindex: '',
        }],
        tableA: [{
          evectionid: '',
          accommodationdetails_id: '',
          accommodationdate: [],
          invoicenumber: '',
          plsummary: this.plsummaryflg,
          // accountcode: this.Redirict == '0' ? 'PJ119001' : 'PJ132001',
          budgetcoding: '',
          subjectnumber: '',
          departmentname: '',
          activitycontent: '',
          city: '',
          region: '',
          facilitytype: '',
          facilityname: '',
          currency: '',
          // accommodation: '',
          rmb: '',
          travel: '',
          annexno: '',
          rowindex: '',
          taxes: '',
          // costitem: '',
        },
          {
            evectionid: '',
            accommodationdetails_id: '',
            accommodationdate: [],
            invoicenumber: '',
            plsummary: this.plsummaryflg,
            // accountcode: this.Redirict == '0' ? 'PJ119005' : 'PJ132005',
            budgetcoding: '',
            subjectnumber: '',
            departmentname: '',
            activitycontent: '',
            city: '',
            region: '',
            facilitytype: '',
            facilityname: '',
            currency: '',
            // accommodation: '',
            rmb: '',
            travel: '',
            annexno: '',
            rowindex: '',
            taxes: '',
            // costitem: '',
          }],
        // tableR: [{
        //   evectionid: '',
        //   otherdetails_id: '',
        //   otherdetailsdate: '',
        //   invoicenumber: '',
        //   budgetcoding: this.encoding,
        //   subjectnumber: '',
        //   plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
        //   accountcode: '',
        //   departmentname: '',
        //   // costitem: '',
        //   remarks: '',
        //   rmb: '',
        //   // taxrate: '',
        //   foreigncurrency: '',
        //   annexno: '',
        //   taxes: '',
        //   currency: '',
        //   rowindex: '',
        // }],
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
          // budgetunit: [{
          //   required: true,
          //   message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
          //   trigger: 'change',
          // }],
        },
        code1: 'PG002',
        code2: 'PJ036',
        code3: 'PG019',
        code4: 'PJ024',
        code9: 'PJ017',
        code10: 'PJ035',
        code12: 'PJ068',
        code15: 'PJ083',
        code20: '',
        code21: '',
        multiple: false,
        show2: false,
        showAout: false,
        showforeigncurrency: false,
        canStart: false,
        rank: '',
        invoicenumber: '',
        errorgroup: '',
        orglist: '',
        Redirict: '',
        accountcodeflg: '',
        accountcodeflg1: '',
        subjectnumberflg: '',
        plsummaryflg1: '',
        plsummaryflg: '',
        optionsdata: [{value: this.$t('label.PFANS1012FORMVIEW_NOMONEY'), label: ''}],
      };
    },
    mounted() {
      this.code21= this.form.type == '0'? 'PJ036' : 'PJ017'
      let plsummaryinfo = getDictionaryInfo('PJ111008');
      if (plsummaryinfo) {
        this.tableA[0].plsummary = plsummaryinfo.value1;
        this.tableA[1].plsummary = plsummaryinfo.value1;
        this.tableT[0].plsummary = plsummaryinfo.value1;
        this.plsummaryflg = plsummaryinfo.value1;
        this.plsummaryflg1 = plsummaryinfo.code;
      }
      let PLdicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ071');
      for (let i = 0; i < PLdicnew.length; i++) {
        this.optionsrate.push({
          value: PLdicnew[i].code,
          lable: PLdicnew[i].value1,
        });
      }
      this.invoicetype = getDictionaryInfo('PJ068001').value1;
      this.getBusInside();
      this.getLoanapp();
      this.getCompanyProjectList();
      this.checkOption();
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1013Store/selectById', {'evectionid': this.$route.params._id})
          .then(response => {
            let lst = getOrgInfoByUserId(response.evection.userid);
            if (lst) {
              this.centername = lst.centerNmae;
              this.groupname = lst.groupNmae;
              this.teamname = lst.teamNmae;
            }

            this.form = response.evection;
            if (response.trafficdetails.length > 0) {
              this.tableT = response.trafficdetails;
              for (let i = 0; i < this.tableT.length; i++) {
                //科目名
                let acinfo = getDictionaryInfo(this.tableT[i].accountcode);
                if (acinfo) {
                  this.tableT[i].accountcode = acinfo.value1;
                  this.accountcodeflg = acinfo.value1;
                  this.accountcodeflg1 = acinfo.code;
                  this.subjectnumberflg = acinfo.value2;
                }
                //PL摘要内容
                let plsuinfo = getDictionaryInfo(this.tableT[i].plsummary);
                if (plsuinfo) {
                  this.tableT[i].plsummary = plsuinfo.value1;
                  this.plsummaryflg = plsuinfo.value1;
                  this.plsummaryflg1 = plsuinfo.code;
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
              }
            }
            if (response.accommodationdetails.length > 0) {
              this.tableA = response.accommodationdetails;
              for (let i = 0; i < this.tableA.length; i++) {
                if (this.tableA[i].accommodationdate !== '' && this.tableA[i].accommodationdate !== null) {
                  let time = this.tableA[i].accommodationdate;
                  let starttime = time.slice(0, 10);
                  let endtime = time.slice(time.length - 10);
                  this.tableA[i].accommodationdate = [starttime, endtime];
                }
                //PL摘要内容
                let plsuinfo = getDictionaryInfo(this.tableA[i].plsummary);
                if (plsuinfo) {
                  this.tableA[i].plsummary = plsuinfo.value1;
                  this.plsummaryflg = plsuinfo.value1;
                  this.plsummaryflg1 = plsuinfo.code;
                }
                if (getOrgInfoByUserId(this.$store.getters.userinfo.userid)) {
                  if (getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)) {
                    this.Redirict = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).redirict;
                  }
                }
                let acinfo = getDictionaryInfo(this.tableA[i].accountcode);
                if (acinfo) {
                  if (this.Redirict == '0') {
                    this.code20 = 'PJ119';
                  } else if (this.Redirict == '1' || this.Redirict == '') {
                    this.code20 = 'PJ132';
                  }
                  this.tableA[i].accountcode = acinfo.value1;
                }
                if (this.tableA[i].departmentname !== '' && this.tableA[i].departmentname !== null && this.tableA[i].departmentname !== undefined) {
                  //ADD_FJL
                  this.tableA[i].optionsA = [];
                  let butinfoA = getOrgInfo(this.tableA[i].departmentname).encoding;
                  let dicA = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                  if (dicA.length > 0) {
                    for (let j = 0; j < dicA.length; j++) {
                      if (butinfoA === dicA[j].value1) {
                        this.tableA[i].optionsA.push({
                          lable: dicA[j].value2 + '_' + dicA[j].value3,
                          value: dicA[j].code,
                        });
                      }
                    }
                  }
                  //ADD_FJL  修改人员预算编码
                }
              }
              for (var i = 0; i < this.tableA.length; i++) {
                if (this.$route.params.method === 'view') {
                  if (this.form.type === '0') {
                    this.tableA[i].showAinner = true;
                    this.tableA[i].showAout = true;
                    this.showrow3 = true;
                    this.showrow = true;
                    this.showrow2 = true;
                  } else if (this.form.type === '1') {
                    this.tableA[i].showAinner = true;
                    this.tableA[i].showAout = true;
                    this.showrow3 = true;
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
                    this.showrow = true;
                    this.showrow2 = false;
                  } else if (this.form.type === '1') {
                    this.tableA[i].showAinner = false;
                    this.tableA[i].showAout = true;
                    this.showrow3 = false;
                    this.showrow = false;
                    this.showrow2 = true;
                  }
                }
              }
            }
            // if (response.otherdetails.length > 0) {
            //   this.tableR = response.otherdetails;
            // }
            if (response.currencyexchanges.length > 0) {
              this.tableW = response.currencyexchanges;
            }
            if (response.invoice.length > 0) {
              this.tableF = response.invoice;
              if (this.form.status === '2') {
                this.checkmoney = true;
                this.checktaxes = true;
              }
            }
            if (this.form.type === '0') {
              this.getBusInside();
              this.showAout = false;
              this.show = true;
              this.show2 = false;
              this.showAout = false;
              this.showforeigncurrency = false;
              this.showrow = true;
              this.showrow3 = true;
              this.showrow2 = false;
            } else {
              this.getBusOuter();
              this.showAout = true;
              this.show = false;
              this.show2 = true;
              this.showforeigncurrency = true;
              this.showrow = false;
              this.showrow2 = true;
              this.showrow3 = false;
            }
            this.userlist = this.form.userid;
            this.baseInfo.evection = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.trafficdetails = JSON.parse(JSON.stringify(this.tableT));
            this.baseInfo.accommodationdetails = JSON.parse(JSON.stringify(this.tableA));
            // this.baseInfo.otherdetails = JSON.parse(JSON.stringify(this.tableR));
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
        this.checkmoney = true;
        this.checktaxes = true;
        let num = getUserInfo(this.$store.getters.userinfo.userid).userinfo.extension;
        if (num) {
          this.form.telephone = num;
        }
        if (getUserInfo(this.$store.getters.userinfo.userid)) {
          this.form.personalcode = this.$store.getters.userinfo.userinfo.caiwupersonalcode;
          this.Codecheck = this.$store.getters.userinfo.userinfo.caiwupersonalcode;
        }
        if (getOrgInfoByUserId(this.$store.getters.userinfo.userid)) {
          this.groupId = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
          // this.tableT[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
          // this.tableA[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
          // this.tableA[1].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
          // this.tableR[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
          if (getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)) {
            // this.encoding = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
            // this.tableT[0].budgetcoding = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
            // this.tableA[0].budgetcoding = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
            // this.tableA[1].budgetcoding = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
            // this.tableR[0].budgetcoding = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
            this.Redirict = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).redirict;
          }
        }
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (lst) {
            this.centername = lst.centerNmae;
            this.groupname = lst.groupNmae;
            this.teamname = lst.teamNmae;
            this.form.centerid = lst.centerId;
            this.form.groupid = lst.groupId;
            this.form.teamid = lst.teamId;
          }
          this.form.userid = this.$store.getters.userinfo.userid;
        }
        if (this.form.type === '0') {
          this.showAout = false;
        } else {
          this.showAout = true;
        }
      }
      if (this.Redirict == '0') {
        this.code20 = 'PJ119';
        this.tableA[0].accountcode = 'PJ119001';
        this.tableA[1].accountcode = 'PJ119005';
        let accinfo = getDictionaryInfo('PJ119002');
        if (accinfo) {
          this.tableT[0].accountcode = accinfo.value1;
          this.tableT[0].subjectnumber = accinfo.value2;
          this.accountcodeflg = accinfo.value1;
          this.accountcodeflg1 = accinfo.code;
          this.subjectnumberflg = accinfo.value2;
        }
      } else if (this.Redirict == '1' || this.Redirict == '') {
        this.code20 = 'PJ132';
        this.tableA[0].accountcode = 'PJ132001';
        this.tableA[1].accountcode = 'PJ132005';
        let accinfo = getDictionaryInfo('PJ132002');
        if (accinfo) {
          this.tableT[0].accountcode = accinfo.value1;
          this.tableT[0].subjectnumber = accinfo.value2;
          this.accountcodeflg = accinfo.value1;
          this.accountcodeflg1 = accinfo.code;
          this.subjectnumberflg = accinfo.value2;
        }
      }
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.checktaxes = false;
        this.checkmoney = false;
      } else {
        this.checkmoney = true;
        this.checktaxes = true;
      }
    },
    methods: {
      changeinvoicenumber(row, val) {
        for (let j = 0; j < this.tableF.length; j++) {
          if (row.invoicenumber == this.tableF[j].invoicenumber) {
            if (this.tableF[j].taxrate === '') {
              row.taxes = 0;
              this.checkmoney = true;
              this.checktaxes = true;
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
              this.checkmoney = false;
              this.checktaxes = false;
              break;
            }
          } else {
            row.taxes = 0;
            this.checkmoney = false;
            this.checktaxes = false;
          }
        }
      },
      getcode(val, row) {
        row.accountcode = val;
        // if(val === 'PJ132005' || val === 'PJ132006' || val === 'PJ119005' || val === 'PJ119006'){
        //   row.currency = 'PG019003';
        // } else {
        //   row.currency = '';
        // }
        let dic = getDictionaryInfo(val);
        if (dic) {
          row.subjectnumber = dic.value2;
        }
      },
      getLoanapp() {
        this.loading = true;
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
      getBusOuter() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1013Store/getdate')
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              if (response[i].user_id === this.$store.getters.userinfo.userid && response[i].businesstype === '0') {
                this.relations.push({
                  place: response[i].city,
                  value: response[i].business_id,
                  label: this.$t('menu.PFANS1002') + '_' + moment(response[i].createon).format('YYYY-MM-DD'),
                  abroadbusiness: response[i].abroadbusiness,
                  external: response[i].external,
                  city: response[i].region,
                  startdate: response[i].startdate,
                  enddate: response[i].enddate,
                  level: response[i].level,
                  businesstype: response[i].businesstype,
                  datenumber: response[i].datenumber,
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
      getBusInside() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1013Store/getdate')
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              if (response[i].user_id === this.$store.getters.userinfo.userid && response[i].businesstype === '1') {
                this.relations.push({
                  place: response[i].city,
                  value: response[i].business_id,
                  label: this.$t('menu.PFANS1035') + '_' + moment(response[i].createon).format('YYYY-MM-DD'),
                  city: response[i].region,
                  startdate: response[i].startdate,
                  enddate: response[i].enddate,
                  businesstype: response[i].businesstype,
                  datenumber: response[i].datenumber,
                  external: response[i].external,
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
      // changeInvoice(val, row){
      //   if(val.invoicenumber !== this.$t('label.PFANS1012FORMVIEW_NOMONEY')){
      //     val.currency = 'PG019003';
      //     val.foreigncurrency = 0;
      //   } else{
      //     val.currency = '';
      //   }
      // },
      getGroupIdT(orglist, row) {
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
          this.Redirict = group.redirict;
          // row.budgetcoding = group.encoding;
          if (group.redirict === '0') {
            this.code20 = 'PJ119';
          } else if (group.redirict === '1') {
            this.code20 = 'PJ132';
          }
        }
        if (!orglist) {
          row.budgetcoding = '';
        }
      },
      getGroupIdA(orglist, row) {
        row.departmentname = orglist;
        //ADD_FJL
        row.optionsA = [];
        row.budgetcoding = '';
        let butinfo = getOrgInfo(row.departmentname).encoding;
        let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
        if (dic.length > 0) {
          for (let i = 0; i < dic.length; i++) {
            if (butinfo === dic[i].value1) {
              row.optionsA.push({
                lable: dic[i].value2 + '_' + dic[i].value3,
                value: dic[i].code,
              });
            }
          }
        }
        //ADD_FJL  修改人员预算编码
        let group = getOrgInfo(orglist);
        if (group) {
          this.Redirict = group.redirict;
          // row.budgetcoding = group.encoding;
          if (group.redirict === '0') {
            this.code20 = 'PJ119';
          } else if (group.redirict === '1') {
            this.code20 = 'PJ132';
          }
        }
        if (this.Redirict == '0') {
          this.code20 = 'PJ119';
          this.tableA[0].accountcode = 'PJ119001';
          this.tableA[1].accountcode = 'PJ119005';
        } else if (this.Redirict == '1' || this.Redirict == '') {
          this.code20 = 'PJ132';
          this.tableA[0].accountcode = 'PJ132001';
          this.tableA[1].accountcode = 'PJ132005';
        }
        if (!orglist) {
          row.budgetcoding = '';
        }
      },
      gettype(val) {
        // [{
        //   evectionid: '',
        //   accommodationdetails_id: '',
        //   accommodationdate: [],
        //   invoicenumber: '',
        //   plsummary: this.plsummaryflg,
        //   accountcode: this.Redirict === '0' ? 'PJ119001' : 'PJ132001',
        //   budgetcoding: this.encoding,
        //   subjectnumber: '',
        //   departmentname: this.groupId,
        //   activitycontent: '',
        //   city: '',
        //   region: '',
        //   facilitytype: '',
        //   facilityname: '',
        //   currency: '',
        //   // accommodation: '',
        //   rmb: '',
        //   travel: '',
        //   annexno: '',
        //   rowindex: '',
        //   taxes: '',
        //   // costitem: '',
        // },
        //   {
        //     evectionid: '',
        //     accommodationdetails_id: '',
        //     accommodationdate: [],
        //     invoicenumber: '',
        //     plsummary: this.plsummaryflg,
        //     accountcode: this.Redirict === '0' ? 'PJ119005' : 'PJ132005',
        //     budgetcoding: this.encoding,
        //     subjectnumber: '',
        //     departmentname: this.groupId,
        //     activitycontent: '',
        //     city: '',
        //     region: '',
        //     facilitytype: '',
        //     facilityname: '',
        //     currency: '',
        //     // accommodation: '',
        //     rmb: '',
        //     travel: '',
        //     annexno: '',
        //     rowindex: '',
        //     taxes: '',
        //     // costitem: '',
        //   }],
        this.activeName = 'first',
          this.form.type = val;
        this.code21 = this.form.type == '0'? 'PJ036' : 'PJ017'
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
          this.showAout = false;
          this.showforeigncurrency = false;
          this.showrow3 = true;
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
          this.showAout = true;
          this.showforeigncurrency = true;
          this.showrow3 = false;
          this.showrow = false;
          this.showrow2 = true;
        }
      },
      getUserids(val) {
        this.form.userid = val;
        if (val === '') {
          this.form.personalcode = '';
          this.Codecheck = '';
        } else {
          this.form.personalcode = getUserInfo(val).userinfo.caiwupersonalcode;
          this.Codecheck = getUserInfo(val).userinfo.caiwupersonalcode;
        }
        this.userlist = val;
        let lst = getOrgInfoByUserId(val);
        if (lst) {
          this.centername = lst.centerNmae;
          this.groupname = lst.groupNmae;
          this.teamname = lst.teamNmae;
          this.form.centerid = lst.centerId;
          this.form.groupid = lst.groupId;
          this.form.teamid = lst.teamId;
        }
        if (!this.form.userid || this.form.userid === '' || typeof val === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      getPaymentinvoicetype(val, row) {
        row.invoicetype = val;
      },
      changeamount(row) {
        if (row.amount !== '' && row.exchangerate > 0) {
          row.exchangermb = (row.amount * row.exchangerate).toFixed(2);
        } else {
          row.exchangermb = 0.00;
        }
      },
      changesummoney(row) {
        row.facetax = row.invoiceamount - row.excludingtax;
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
            plsummary: this.plsummaryflg,
            accountcode: this.accountcodeflg,
            subjectnumber: this.subjectnumberflg,
            taxes: '',
            // costitem: '',
            region: '',
            vehicle: '',
            startingpoint: '',
            rmb: '',
            // taxrate: '',
            currency: '',
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
            plsummary: this.plsummaryflg,
            accountcode: '',
            subjectnumber: '',
            city: '',
            region: ' ',
            facilitytype: '',
            facilityname: '',
            currency: '',
            // accommodation: '',
            rmb: '',
            travel: '',
            annexno: '',
          }];
        }
      },
      // deleteRow4(index, rows) {
      //   if (rows.length > 1) {
      //     rows.splice(index, 1);
      //   } else {
      //     this.tableR = [{
      //       otherdetailsdate: '',
      //       // costitem: '',
      //       plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
      //       accountcode: '',
      //       rmb: '',
      //       subjectnumber: '',
      //       remarks: '',
      //       budgetcoding: '',
      //       foreigncurrency: '',
      //       annexno: '',
      //       currency: '',
      //     }];
      //   }
      // },
      deleteRow5(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableF = [{
            invoicenumber: '',
            invoicetype: '',
            invoiceamount: '',
            taxrate: '',
            excludingtax: '',
            facetax: '',
          }];
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
          plsummary: this.plsummaryflg,
          accountcode: this.accountcodeflg,
          subjectnumber: this.subjectnumberflg,
          departmentname: '',
          taxes: '',
          // costitem: '',
          region: '',
          vehicle: '',
          startingpoint: '',
          rmb: '',
          // taxrate: '',
          currency: '',
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
          departmentname: '',
          activitycontent: '',
          plsummary: this.plsummaryflg,
          accountcode: '',
          budgetcoding: '',
          subjectnumber: '',
          city: '',
          region: '',
          facilitytype: '',
          facilityname: '',
          currency: '',
          // accommodation: '',
          rmb: '',
          travel: '',
          annexno: '',
          rowindex: '',
          taxes: '',
          // costitem: '',
        });
      },
      // addRow4() {
      //   this.tableR.push({
      //     evectionid: '',
      //     otherdetails_id: '',
      //     otherdetailsdate: '',
      //     invoicenumber: '',
      //     budgetcoding: this.encoding,
      //     plsummary: this.$t('label.PFANS1013FORMVIEW_PLSUMMARY'),
      //     accountcode: '',
      //     subjectnumber: '',
      //     departmentname: this.groupId,
      //     // costitem: '',
      //     remarks: '',
      //     rmb: '',
      //     // taxrate: '',
      //     foreigncurrency: '',
      //     annexno: '',
      //     taxes: '',
      //     currency: '',
      //     rowindex: '',
      //   });
      // },
      addRow5() {
        let b;
        let c;
        if (this.tableF.length > 0) {
          b = this.tableF.length + 1;
          c = this.$t('label.PFANS1012FORMVIEW_NUMBERZP') + b;
        }
        this.tableF.push({
          invoice_id: '',
          evectionid: '',
          invoicenumber: c,
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
        this.getMoney(sums);
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
              this.tableA[0].region = cityinfo.code;
              this.tableA[1].region = cityinfo.code;
              if (cityinfo.code === 'PJ017001' || cityinfo.code === 'PJ017002') {
                this.tableA[0].currency = 'PG019002';
                // this.tableA[1].currency = 'PG019002';
              } else if (cityinfo.code === 'PJ017003' || cityinfo.code === 'PJ017004') {
                this.tableA[0].currency = 'PG019001';
                // this.tableA[1].currency = 'PG019001';
              }
            }
            this.rank = this.relations[i].level;
            let dict = getDictionaryInfo(this.relations[i].level);
            if (dict) {
              this.form.level = dict.value1;
            }
            this.form.place = this.relations[i].place;
            this.form.abroadbusiness = this.relations[i].abroadbusiness;
            this.form.external = this.relations[i].external;
            this.form.startdate = this.relations[i].startdate;
            this.form.enddate = this.relations[i].enddate;
            this.form.datenumber = this.relations[i].datenumber;
            // this.tableT[0].trafficdate = this.form.startdate;
            // this.tableR[0].otherdetailsdate = this.form.startdate;
            this.tableA[0].accommodationdate = [this.relations[i].startdate, this.relations[i].enddate];
            this.tableA[0].subjectnumber = getDictionaryInfo(this.tableA[0].accountcode).value2;
            this.tableA[1].accommodationdate = [this.relations[i].startdate, this.relations[i].enddate];
            this.tableA[1].subjectnumber = getDictionaryInfo(this.tableA[1].accountcode).value2;
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
      // getRsummaries(param) {
      //   const {columns, data} = param;
      //   const sums = [];
      //   columns.forEach((column, index) => {
      //     if (index === 0) {
      //       sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
      //       return;
      //     }
      //     const values = data.map(item => Number(item[column.property]));
      //     if (!values.every(value => isNaN(value))) {
      //       sums[index] = values.reduce((prev, curr) => {
      //         const value = Number(curr);
      //         if (!isNaN(value)) {
      //           return prev + curr;
      //         } else {
      //           return prev;
      //         }
      //       }, 0);
      //       if (index === 3) {
      //         sums[index] = Math.round((sums[index]) * 100) / 100;
      //       }
      //       if (index === 4) {
      //         sums[index] = Math.round((sums[index]) * 100) / 100;
      //       }
      //     } else {
      //       sums[index] = '--';
      //     }
      //   });
      //   // this.tableRValue = sums;
      //   return sums;
      // },
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
      getexitarea(val, row) {
        row.region = val;
        this.getTravel(row);
      },
      getfacilitytypeon(val, row) {
        row.facilitytype = val;
        this.getTravel(row);
      },
      getRegion(val, row) {
        row.region = val;
      },
      getCity(val, row) {
        row.city = val;
        this.getTravel(row);
      },
      getTravel(row) {
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
        var diffDate = moment(row.accommodationdate[1]).diff(moment(row.accommodationdate[0]), 'days');
        if (diffDate === 0) {
          diffDate = 1;
        }
        if (this.form.type === '0') {
          //境内无规定外费用的场合，住宿标准check
          if (this.Redirict === '0' ? (row.accountcode === 'PJ119001') : (row.accountcode === 'PJ132001') && this.form.external === '0') {
            if (row.facilitytype === 'PJ035001') {
              if (row.city !== '') {
                if (row.city === 'PJ036001' || row.city === 'PJ036002' || row.city === 'PJ036003' || row.city === 'PJ036004') {
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
                if (row.city === 'PJ036001' || row.city === 'PJ036002' || row.city === 'PJ036003' || row.city === 'PJ036004') {
                  if (row.rmb / diffDate > jpregion8/30) {
                    Message({
                      message: this.$t('label.PFANS1013FORMVIEW_RMBLIMIT'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                  }
                } else {
                  if (row.rmb / diffDate > jpregion9/30) {
                    Message({
                      message: this.$t('label.PFANS1013FORMVIEW_RMBLIMIT'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                  }
                }
              }
            }
          } else if (this.Redirict === '0' ? (row.accountcode === 'PJ119005') : (row.accountcode === 'PJ132005')) {
            row.rmb = '';
            row.rmb = (150 * (diffDate + 1)).toFixed(2);
          } else if (this.Redirict === '0' ? (row.accountcode === 'PJ119006') : (row.accountcode === 'PJ132006')) {
            row.rmb = '';
            row.rmb = (Number(row.rmb + 100) * (diffDate + 1)).toFixed(2);
          }

        } else if (this.form.type === '1') {
          var accfig;
          var firstBusinessflg;
          var firstBusiNum;
          let accinfo = getDictionaryInfo(row.currency);
          if (accinfo) {
            accfig = accinfo.value2;
          }
          let firstBusiness = getDictionaryInfo('PR062001');
          if (firstBusiness) {
            firstBusinessflg = firstBusiness.value1;
          }
          if (firstBusinessflg !== '' && firstBusinessflg !== undefined) {
            firstBusiNum = Number(firstBusinessflg);
          } else {
            firstBusiNum = 0;
          }
          //境外无规定外费用的场合，住宿标准check
          if (this.Redirict === '0' ? (row.accountcode === 'PJ119001') : (row.accountcode === 'PJ132001') && this.form.external === '1') {
            if (row.facilitytype === 'PJ035001') {
              if (row.region === 'PJ017001') {
                if (row.travel / diffDate > jpregion3) {
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
              } else if (row.region === 'PJ017002') {
                if (row.travel / diffDate > jpregion4) {
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
              } else if (row.region === 'PJ017003') {
                if (row.travel / diffDate > jpregion5) {
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
              } else if (row.region === 'PJ017004') {
                if (row.travel / diffDate > jpregion6) {
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
              }
            } else if (row.facilitytype === 'PJ035002') {
              if (row.region === 'PJ017001') {
                if (row.travel / diffDate > jpregion10) {
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
              } else if (row.region === 'PJ017002') {
                if (row.travel / diffDate > jpregion11) {
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_CURRENCYLIMIT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
              }
            }
            if (accfig !== '' && accfig !== undefined && row.travel !== '' && row.travel !== undefined) {
              row.rmb = '';
              row.rmb = (row.travel * Number(accfig)).toFixed(2);
            }
          } else if (this.Redirict === '0' ? (row.accountcode === 'PJ119005') : (row.accountcode === 'PJ132005')) {
            if (this.rank === 'PJ016003') {
              jpvalueflg2 = Number(jpregion12) + 100 + firstBusiNum;
            } else {
              jpvalueflg2 = Number(jpregion12) + firstBusiNum;
            }
            if (jpvalueflg2 !== '' && jpvalueflg2 !== undefined) {
              row.rmb = '';
              row.rmb = (Number(jpvalueflg2) * (diffDate + 1) + firstBusiNum).toFixed(2);
            }
          } else if (this.Redirict === '0' ? (row.accountcode === 'PJ119006') : (row.accountcode === 'PJ132006')) {
            if (jpvalueflg2 !== '' && jpvalueflg2 !== undefined) {
              row.rmb = '';
              row.rmb = (Number(jpvalueflg2 + 100) * (diffDate + 1) + firstBusiNum).toFixed(2);
            }
          }
        }
      },
      getMoney(sums) {
        if (this.form.type === '0') {
          // this.form.totalpay = sums[10] + this.tableAValue[11] + this.tableRValue[9];
          this.form.totalpay = sums[10] + this.tableAValue[11];
        } else if (this.form.type === '1') {
          // this.form.totalpay = sums[10] + this.tableAValue[13] + this.tableRValue[9];
          this.form.totalpay = sums[10] + this.tableAValue[13];
        }
        this.form.balance = this.form.loanamount - this.form.totalpay;
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
      changeTravel(val) {
        val.rmb = '';
        this.getTravel(val);
      },
      changelowance(newValue) {
        newValue.travel = '';
        this.getTravel(newValue);
        for (let j = 0; j < this.tableF.length; j++) {
          let Taxratevalue = 0;
          if (newValue.invoicenumber === this.tableF[j].invoicenumber) {
            if (newValue.rmb !== '') {
              if (this.tableF[j].taxrate !== '') {
                if (this.tableF[j].taxrate == 'PJ071001') {
                  this.taxrateValue = getDictionaryInfo('PJ071001').value1;
                } else if (this.tableF[j].taxrate == 'PJ071002') {
                  this.taxrateValue = getDictionaryInfo('PJ071002').value1;
                } else if (this.tableF[j].taxrate == 'PJ071003') {
                  this.taxrateValue = getDictionaryInfo('PJ071003').value1;
                } else if (this.tableF[j].taxrate == 'PJ071004') {
                  this.taxrateValue = getDictionaryInfo('PJ071004').value1;
                }
                Taxratevalue = 1 + Number(this.taxrateValue);
                newValue.taxes = ((newValue.rmb / (Taxratevalue) * this.taxrateValue)).toFixed(2);
              }
            }
          }
        }
      },
      changeRMB(newValue) {
        for (let j = 0; j < this.tableF.length; j++) {
          let taxratevalue = 0;
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
                newValue.taxes = ((newValue.rmb / (taxratevalue) * Number(this.taxrateValue))).toFixed(2);
              }
            }
          }
        }
        if (newValue.rmb > 0) {
          newValue.foreigncurrency = '';
          newValue.currency = '';
        }
      },
      getcurrency(val, row) {
        row.currency = val;
        if (row.currency === 'PG019003' || row.currency === '') {
          this.checkmoney = false;
        } else {
          this.checkmoney = true;
        }
        let curinfo = getDictionaryInfo(val);
        if (curinfo) {
          row.currencyexchangerate = curinfo.value2;
        }
      },
      changeAcc(val, row) {
        row.currency = val;
        let accinfo = getDictionaryInfo(val);
        if (accinfo) {
          row.rmb = (row.foreigncurrency * accinfo.value2).toFixed(2);
        }
      },
      getAccommodation(val, row) {
        row.currency = val;
        this.getTravel(row);
      },
      changefore(val, row) {
        // val.rmb = '';
        let accinfo = getDictionaryInfo(val.currency);
        if (accinfo) {
          val.taxes = '';
          val.rmb = (val.foreigncurrency * accinfo.value2).toFixed(2);
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
              let errorFLG = 0;
              let errorInfoFLG = 1;
              let errorInfoFLG2 = 1;
              let errorInfoFLG3 = 1;
              if (this.form.type === '0') {
                for (let i = 0; i < this.tableT.length; i++) {
                  if (this.tableT[i].trafficdate !== '' && this.tableT[i].invoicenumber !== '' && this.tableT[i].departmentname !== '' && this.tableT[i].budgetcoding !== ''
                    && this.tableT[i].rmb > 0 && this.tableT[i].plsummary !== ''
                    && this.tableT[i].accountcode !== '' && this.tableT[i].subjectnumber !== '') {
                    this.baseInfo.trafficdetails.push(
                      {
                        trafficdetails_id: this.tableT[i].trafficdetails_id,
                        evectionid: this.tableT[i].evectionid,
                        trafficdate: this.tableT[i].trafficdate,
                        invoicenumber: this.tableT[i].invoicenumber,
                        departmentname: this.tableT[i].departmentname,
                        budgetcoding: this.tableT[i].budgetcoding,
                        plsummary: this.plsummaryflg1,
                        accountcode: this.accountcodeflg1,
                        subjectnumber: this.tableT[i].subjectnumber,
                        region: this.tableT[i].region,
                        vehicle: this.tableT[i].vehicle,
                        startingpoint: this.tableT[i].startingpoint,
                        rmb: this.tableT[i].rmb,
                        taxes: this.tableT[i].taxes,
                        // currency: this.tableT[i].currency,
                        // foreigncurrency: this.tableT[i].foreigncurrency,
                        annexno: this.tableT[i].annexno,
                      },
                    );
                    errorInfoFLG += 1;
                  } else {
                    errorInfoFLG = 0;
                    break;
                  }
                }
                for (let i = 0; i < this.tableA.length; i++) {
                  if (this.tableA[i].accommodationdate !== '' && this.tableA[i].invoicenumber !== '' && this.tableA[i].departmentname !== ''
                    && this.tableA[i].budgetcoding !== '' && this.tableA[i].plsummary !== '' && this.tableA[i].accountcode !== '' && this.tableA[i].subjectnumber !== ''
                    && this.tableA[i].rmb > 0 && this.tableA[i].activitycontent !== ''
                    && this.tableA[i].city !== '' && this.tableA[i].facilitytype !== '') {
                    this.baseInfo.accommodationdetails.push(
                      {
                        accommodationdetails_id: this.tableA[i].accommodationdetails_id,
                        evectionid: this.tableA[i].evectionid,
                        accommodationdate: moment(this.tableA[i].accommodationdate[0]).format('YYYY-MM-DD') + '~' + moment(this.tableA[i].accommodationdate[1]).format('YYYY-MM-DD'),
                        invoicenumber: this.tableA[i].invoicenumber,
                        departmentname: this.tableA[i].departmentname,
                        budgetcoding: this.tableA[i].budgetcoding,
                        plsummary: this.plsummaryflg1,
                        accountcode: this.tableA[i].accountcode,
                        subjectnumber: this.tableA[i].subjectnumber,
                        activitycontent: this.tableA[i].activitycontent,
                        // region: this.tableA[i].region,
                        //境内
                        city: this.tableA[i].city,
                        facilitytype: this.tableA[i].facilitytype,
                        facilityname: this.tableA[i].facilityname,
                        // currency: this.tableA[i].currency,
                        // travel: this.tableA[i].travel,
                        rmb: this.tableA[i].rmb,
                        taxes: this.tableA[i].taxes,
                        annexno: this.tableA[i].annexno,
                      },
                    );
                    errorInfoFLG2 += 1;
                  } else {
                    errorInfoFLG2 = 0;
                    break;
                  }
                }
                // for (let i = 0; i < this.tableR.length; i++) {
                //   if (this.tableR[i].otherdetailsdate !== '' && this.tableR[i].accountcode !== '' && this.tableR[i].region !== ''
                //     && this.tableR[i].rmb > 0 && this.tableR[i].annexno !== '' && this.tableR[i].plsummary !== ''
                //     && this.tableR[i].invoicenumber !== '' && this.tableR[i].departmentname !== '' && this.tableR[i].budgetcoding !== ''
                //     && this.tableR[i].subjectnumber !== '' && this.tableR[i].remarks !== '' && this.tableR[i].taxes >=0) {
                //     this.baseInfo.otherdetails.push(
                //       {
                //         otherdetails_id: this.tableR[i].otherdetails_id,
                //         evectionid: this.tableR[i].evectionid,
                //         otherdetailsdate: this.tableR[i].otherdetailsdate,
                //         invoicenumber: this.tableR[i].invoicenumber,
                //         departmentname: this.tableR[i].departmentname,
                //         budgetcoding: this.tableR[i].budgetcoding,
                //         plsummary: this.tableR[i].plsummary,
                //         accountcode: this.tableR[i].accountcode,
                //         subjectnumber: this.tableR[i].subjectnumber,
                //         region: this.tableR[i].region,
                //         remarks: this.tableR[i].remarks,
                //         rmb: this.tableR[i].rmb,
                //         taxes: this.tableR[i].taxes,
                //         // currency: this.tableR[i].currency,
                //         // foreigncurrency: this.tableR[i].foreigncurrency,
                //         annexno: this.tableR[i].annexno,
                //       },
                //     );
                //     errorInfoFLG3 += 1;
                //   } else {
                //     errorInfoFLG3 = 0;
                //     break;
                //   }
                // }
              } else if (this.form.type === '1') {
                for (let i = 0; i < this.tableT.length; i++) {
                  if (this.tableT[i].trafficdate !== '' && this.tableT[i].invoicenumber !== '' && this.tableT[i].departmentname !== '' && this.tableT[i].budgetcoding !== ''
                    && this.tableT[i].rmb > 0 && this.tableT[i].plsummary !== ''
                    && this.tableT[i].accountcode !== '' && this.tableT[i].subjectnumber !== '' && this.tableT[i].region !== '' && this.tableT[i].vehicle !== ''
                    && this.tableT[i].startingpoint !== '') {
                    // && this.tableT[i].foreigncurrency > 0 && this.tableT[i].currency !== ''
                    this.baseInfo.trafficdetails.push(
                      {
                        trafficdetails_id: this.tableT[i].trafficdetails_id,
                        evectionid: this.tableT[i].evectionid,
                        trafficdate: this.tableT[i].trafficdate,
                        invoicenumber: this.tableT[i].invoicenumber,
                        departmentname: this.tableT[i].departmentname,
                        budgetcoding: this.tableT[i].budgetcoding,
                        plsummary: this.plsummaryflg1,
                        accountcode: this.accountcodeflg1,
                        subjectnumber: this.tableT[i].subjectnumber,
                        region: this.tableT[i].region,
                        vehicle: this.tableT[i].vehicle,
                        startingpoint: this.tableT[i].startingpoint,
                        rmb: this.tableT[i].rmb,
                        taxes: this.tableT[i].taxes,
                        currency: this.tableT[i].currency,
                        foreigncurrency: this.tableT[i].foreigncurrency,
                        annexno: this.tableT[i].annexno,
                      },
                    );
                    errorInfoFLG += 1;
                  } else {
                    errorInfoFLG = 0;
                    break;
                  }
                }
                for (let i = 0; i < this.tableA.length; i++) {
                  if (this.tableA[i].accommodationdate !== '' && this.tableA[i].invoicenumber !== '' && this.tableA[i].departmentname !== ''
                    && this.tableA[i].budgetcoding !== '' && this.tableA[i].plsummary !== '' && this.tableA[i].accountcode !== '' && this.tableA[i].subjectnumber !== ''
                    && this.tableA[i].rmb > 0 && this.tableA[i].activitycontent !== ''
                    && this.tableA[i].region !== '' && this.tableA[i].facilitytype !== '' && this.tableA[i].facilityname !== '') {
                    this.baseInfo.accommodationdetails.push(
                      {
                        accommodationdetails_id: this.tableA[i].accommodationdetails_id,
                        evectionid: this.tableA[i].evectionid,
                        accommodationdate: moment(this.tableA[i].accommodationdate[0]).format('YYYY-MM-DD') + '~' + moment(this.tableA[i].accommodationdate[1]).format('YYYY-MM-DD'),
                        invoicenumber: this.tableA[i].invoicenumber,
                        departmentname: this.tableA[i].departmentname,
                        budgetcoding: this.tableA[i].budgetcoding,
                        plsummary: this.plsummaryflg1,
                        accountcode: this.tableA[i].accountcode,
                        subjectnumber: this.tableA[i].subjectnumber,
                        activitycontent: this.tableA[i].activitycontent,
                        region: this.tableA[i].region,
                        //境内
                        // city: this.tableA[i].city,
                        facilitytype: this.tableA[i].facilitytype,
                        facilityname: this.tableA[i].facilityname,
                        currency: this.tableA[i].currency,
                        travel: this.tableA[i].travel,
                        rmb: this.tableA[i].rmb,
                        taxes: this.tableA[i].taxes,
                        annexno: this.tableA[i].annexno,
                      },
                    );
                    errorInfoFLG2 += 1;
                  } else {
                    errorInfoFLG2 = 0;
                    break;
                  }
                }
                // for (let i = 0; i < this.tableR.length; i++) {
                //   if (this.tableR[i].otherdetailsdate !== '' && this.tableR[i].accountcode !== '' && this.tableR[i].region !== ''
                //     && this.tableR[i].rmb > 0 && this.tableR[i].foreigncurrency > 0 && this.tableR[i].annexno !== '' && this.tableR[i].plsummary !== ''
                //     && this.tableR[i].invoicenumber !== '' && this.tableR[i].departmentname !== '' && this.tableR[i].budgetcoding !== ''
                //     && this.tableR[i].subjectnumber !== '' && this.tableR[i].currency !== '' && this.tableR[i].remarks !== '' && this.tableR[i].taxes >=0) {
                //     this.baseInfo.otherdetails.push(
                //       {
                //         otherdetails_id: this.tableR[i].otherdetails_id,
                //         evectionid: this.tableR[i].evectionid,
                //         otherdetailsdate: this.tableR[i].otherdetailsdate,
                //         invoicenumber: this.tableR[i].invoicenumber,
                //         departmentname: this.tableR[i].departmentname,
                //         budgetcoding: this.tableR[i].budgetcoding,
                //         plsummary: this.tableR[i].plsummary,
                //         accountcode: this.tableR[i].accountcode,
                //         subjectnumber: this.tableR[i].subjectnumber,
                //         region: this.tableR[i].region,
                //         remarks: this.tableR[i].remarks,
                //         rmb: this.tableR[i].rmb,
                //         taxes: this.tableR[i].taxes,
                //         currency: this.tableR[i].currency,
                //         foreigncurrency: this.tableR[i].foreigncurrency,
                //         annexno: this.tableR[i].annexno,
                //       },
                //     );
                //     errorInfoFLG3 += 1;
                //   } else {
                //     errorInfoFLG3 = 0;
                //     break;
                //   }
                // }
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
              for (let j = 0; j < this.tableF.length; j++) {
                let summoney = 0;
                let summoneyT = 0;
                let sumMoney = 0;
                let sumout = 0;
                for (let i = 0; i < this.tableT.length; i++) {
                  if (this.tableT[i].trafficdate !== '' || this.tableT[i].invoicenumber !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== ''
                    || this.tableT[i].rmb > 0 || this.tableT[i].foreigncurrency > 0 || this.tableT[i].annexno !== '' || this.tableT[i].plsummary !== ''
                    || this.tableT[i].accountcode !== '' || this.tableT[i].subjectnumber !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== ''
                    || this.tableT[i].taxes >= 0 || this.tableT[i].startingpoint !== '' || this.tableT[i].currency !== '') {
                    if (this.tableT[i].invoicenumber == this.tableF[j].invoicenumber) {
                      if (this.tableT[i].rmb != '0') {
                        summoneyT += this.tableT[i].rmb;
                      }
                    }
                  }
                }
                for (let i = 0; i < this.tableA.length; i++) {
                  if (this.tableA[i].accommodationdate !== '' || this.tableA[i].invoicenumber !== '' || this.tableA[i].departmentname !== ''
                    || this.tableA[i].budgetcoding !== '' || this.tableA[i].plsummary !== '' || this.tableA[i].accountcode !== '' || this.tableA[i].subjectnumber !== ''
                    || this.tableA[i].taxes >= 0 || this.tableA[i].rmb > 0 || this.tableA[i].travel > 0 || this.tableA[i].activitycontent !== '' || this.tableA[i].currency !== ''
                    || this.tableA[i].region !== '' || this.tableA[i].facilitytype !== '' || this.tableA[i].facilityname !== '' || this.tableA[i].annexno !== '') {
                    if (this.tableA[i].invoicenumber == this.tableF[j].invoicenumber) {
                      if (this.tableA[i].rmb != '0') {
                        summoney += this.tableA[i].rmb;

                      }
                    }
                  }
                }
                // for (let i = 0; i < this.tableR.length; i++) {
                //   if (this.tableR[i].otherdetailsdate !== '' || this.tableR[i].accountcode !== '' || this.tableR[i].region !== ''
                //     || this.tableR[i].rmb > 0 || this.tableR[i].foreigncurrency > 0 || this.tableR[i].annexno !== '' || this.tableR[i].plsummary !== ''
                //     || this.tableR[i].invoicenumber !== '' || this.tableR[i].departmentname !== '' || this.tableR[i].budgetcoding !== ''
                //     || this.tableR[i].subjectnumber !== '' || this.tableR[i].currency !== '' || this.tableR[i].remarks !== '' || this.tableR[i].taxes >=0) {
                //     if (this.tableR[i].invoicenumber == this.tableF[j].invoicenumber) {
                //       if (this.tableR[i].rmb != '0') {
                //         sumMoney += this.tableR[i].rmb;
                //
                //       }
                //     }
                //   }
                // }
                sumout = summoney + sumMoney + summoneyT;
                if (sumout != this.tableF[j].invoiceamount) {
                  errorFLG = errorFLG + 1;
                  Message({
                    message: this.$t('label.PFANS1012FORMVIEW_MESSAGE'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
              }
              // if(this.baseInfo.trafficdetails.length === 0 && this.baseInfo.accommodationdetails.length === 0 && this.baseInfo.otherdetails.length === 0){
              if (this.baseInfo.trafficdetails.length === 0 && this.baseInfo.accommodationdetails.length === 0) {
                Message({
                  message: this.$t('label.PFANS1013FORMVIEW_ERRORINFO'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                errorFLG += 1;
                return;
              } else {
                if (errorInfoFLG === 0 && this.baseInfo.trafficdetails.length !== 0) {
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_ERRORINFOT'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
                if (errorInfoFLG2 === 0 && this.baseInfo.accommodationdetails.length !== 0) {
                  Message({
                    message: this.$t('label.PFANS1013FORMVIEW_ERRORINFOA'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
                // if(errorInfoFLG3 === 0 && this.baseInfo.otherdetails.length !== 0){
                //   Message({
                //     message: this.$t('label.PFANS1013FORMVIEW_ERRORINFOR'),
                //     type: 'error',
                //     duration: 5 * 1000,
                //   });
                //   return;
                // }
              }
              if (errorFLG == '0') {
                this.loading = true;
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
                  this.loading = true;
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






