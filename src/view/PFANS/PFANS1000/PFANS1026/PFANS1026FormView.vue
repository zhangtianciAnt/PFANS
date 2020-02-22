first<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container"
                         :title="title"
                         @buttonClick="buttonClick"
                         v-loading="loading"
                         :buttonList="buttonList">
      <div slot="customize">
        <el-form :model="form" label-width="8vw" label-position="top" style="padding: 2vw" :rules="rules"
                 ref="refform">
          <el-dialog :title="$t('button.application')"  :visible.sync="dialogFormVisible">
            <el-form-item  :label="$t('label.PFANS1024VIEW_NUMBER')" :label-width="formLabelWidth">
              <dicselect
                :code="code"
                :data="form.claimtype"
                :multiple="multiple"
                @change="getnumber"
                style="width: 20vw"
                :disabled="!disabled2">
              </dicselect>
            </el-form-item>
            <el-form-item  :label="$t('label.PFANS1024VIEW_ORIGINALCONTRACT')" :label-width="formLabelWidth">
              <el-input v-model="form.contractnumber" style="width: 20vw" :disabled="!disabled1"></el-input>
              <el-checkbox
                v-model="checked1"
                @change="getChecked"
              >{{$t('label.PFANS1024VIEW_LETTERS')}}</el-checkbox>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" :label-width="formLabelWidth">
              <dicselect :code="code2"
                         :data="form.contracttype"
                         @change="getcontracttype"
                         style="width: 20vw"
                         :disabled="!disabled2">
              </dicselect>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_CAREERYEAR')" :label-width="formLabelWidth">
              <dicselect :code="code3"
                         :data="form.applicationdate"
                         @change="getcareeryear1"
                         style="width: 20vw"
                         :disabled="!disabled2">
              </dicselect>
              <dicselect :code="code4"
                         :data="form.entrycondition"
                         @change="getcareeryear2"
                         style="width: 20vw"
                         :disabled="!disabled2">
              </dicselect>
            </el-form-item>
            <el-form-item :label="$t('label.group')" :label-width="formLabelWidth">
              <org  :orglist="grouporglist" orgtype="2" style="width: 20vw" @getOrgids="getGroupId" :disabled="!disabled2"></org>
            </el-form-item>
            <div  class="dialog-footer" align="center">
              <el-button @click="dialogFormVisible = false" v-if="show1">
                  <span style="margin-right: 86%;" @click="click">{{$t('label.PFANS1026FORMVIEW_CONTRACTNUMBER')}}
                  </span>
              </el-button>
              <el-button  @click="dialogFormVisible = false" v-if="show2">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_ABANDONED')}}
                  </span>
              </el-button>
            </div>
          </el-dialog>
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1026VIEW_OVERSEAS')" name="first">
              <el-table :data="tablefirst" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass1">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.deployment" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled3" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code5"
                      :data="scope.row.entrycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getEntrycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.entrypayment" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="deliverycondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code6"
                        :data="scope.row.deliverycondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDeliverycondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="delivery" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.delivery"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDelivery"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="claimcondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.claimcondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaimcondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="claim" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.claim"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaim"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')" align="center" prop="deliveryfinshdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliveryfinshdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center" prop="loadingjudge" width="200" :error="errorjudge">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorjudge" :selectType="selectType" :userlist="scope.row.loadingjudge"
                          @getUserids="getJudge" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="200">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code9"
                      :data="scope.row.currencyposition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getCurrencyposition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.claimdatetime"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"
                            @getUserids="getCusto" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="custoenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="custoabbreviation" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="custochinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custochinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" align="center"  prop="businesscode" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled"   style="width: 11rem" v-model="scope.row.businesscode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_VARTO')" align="center" prop="varto"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code10"
                      :data="scope.row.varto"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getVarto"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="placeenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placeenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="placechinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="responerglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responerglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responphone" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responemail" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="conenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="conchinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1026VIEW_DETERMINATION')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_DECIDE')" align="center" prop="decide"  width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code11"
                        :data="scope.row.decide"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDecide"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_FIRSTJUDGE')" align="center" prop="firstjudge" width="200" :error="errorfirstjudge">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorfirstjudge" :selectType="selectType" :userlist="scope.row.firstjudge"
                            @getUserids="getFirstjudge" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_SECONDJUDGE')" align="center" prop="secondjudge" width="200" :error="errorsecondjudge">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorsecondjudge" :selectType="selectType" :userlist="scope.row.secondjudge"
                            @getUserids="getSecondjudge" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_OUTPUTMANAGER')" align="center" prop="outputmanager" width="200" :error="erroroutmanager">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="erroroutmanager" :selectType="selectType" :userlist="scope.row.outputmanager"
                            @getUserids="getOutmanager" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_MANAGER')" align="center" prop="manager" width="200" :error="errormanager">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errormanager" :selectType="selectType" :userlist="scope.row.manager"
                            @getUserids="getManager" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_DECISIONNUMBER')" align="center"  prop="decisionnumber" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.decisionnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_OUTNUMBER')" align="center"  prop="outnumber" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.outnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PRODUCTNUMBER')" align="center"  prop="productnumber" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.productnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_TECHNICAL')" name="second">
              <el-table :data="tablesecond" stripe header-cell-class-name="sub_bg_color_grey height"  :header-cell-style="getRowClass2">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center" prop="department" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.deployment" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.application')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled3" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code5"
                      :data="scope.row.entrycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getEntrycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.entrypayment" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="deliverycondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code6"
                        :data="scope.row.deliverycondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDeliverycondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="delivery" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.delivery"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDelivery"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="claimcondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.claimcondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaimcondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="claim" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.claim"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaim"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')" align="center" prop="deliveryfinshdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliveryfinshdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center" prop="loadingjudge" width="200" :error="errorjudge">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorjudge" :selectType="selectType" :userlist="scope.row.loadingjudge"
                          @getUserids="getJudge" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="200">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code9"
                      :data="scope.row.currencyposition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getCurrencyposition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.claimdatetime"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"
                            @getUserids="getCusto" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="custoenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="custoabbreviation" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="custochinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custochinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" align="center"  prop="businesscode" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.businesscode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_VARTO')" align="center" prop="varto"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code10"
                      :data="scope.row.varto"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getVarto"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="placeenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placeenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="placechinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="responerglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responerglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responphone" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responemail">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="conenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="conchinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1026VIEW_DETERMINATION')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_DECIDE')" align="center" prop="decide"  width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code11"
                        :data="scope.row.decide"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDecide"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_FIRSTJUDGE')" align="center" prop="firstjudge" width="200" :error="errorfirstjudge">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorfirstjudge" :selectType="selectType" :userlist="scope.row.firstjudge"
                            @getUserids="getFirstjudge" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_SECONDJUDGE')" align="center" prop="secondjudge" width="200" :error="errorsecondjudge">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorsecondjudge" :selectType="selectType" :userlist="scope.row.secondjudge"
                            @getUserids="getSecondjudge" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_OUTPUTMANAGER')" align="center" prop="outputmanager" width="200" :error="erroroutmanager">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="erroroutmanager" :selectType="selectType" :userlist="scope.row.outputmanager"
                            @getUserids="getOutmanager" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_MANAGER')" align="center" prop="manager" width="200" :error="errormanager">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errormanager" :selectType="selectType" :userlist="scope.row.manager"
                            @getUserids="getManager" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_DECISIONNUMBER')" align="center"  prop="decisionnumber" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.decisionnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_OUTNUMBER')" align="center"  prop="outnumber" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.outnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PRODUCTNUMBER')" align="center"  prop="productnumber" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.productnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_OVERSEASTRUST')" name="third">
              <el-table :data="tablethird" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass3">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center" prop="department" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.deployment" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled3" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code5"
                      :data="scope.row.entrycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getEntrycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.entrypayment" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="deliverycondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code6"
                        :data="scope.row.deliverycondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDeliverycondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="delivery" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.delivery"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDelivery"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="claimcondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.claimcondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaimcondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="claim" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.claim"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaim"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')" align="center" prop="deliveryfinshdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliveryfinshdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center" prop="loadingjudge" width="200" :error="errorjudge">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorjudge" :selectType="selectType" :userlist="scope.row.loadingjudge"
                          @getUserids="getJudge" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="200">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code9"
                      :data="scope.row.currencyposition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getCurrencyposition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.claimdatetime"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"
                            @getUserids="getCusto" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="custoenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="custoabbreviation" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="custochinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custochinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" align="center"  prop="businesscode" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.businesscode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_VARTO')" align="center" prop="varto"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code10"
                      :data="scope.row.varto"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getVarto"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="placeenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placeenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="placechinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="responerglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responerglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responphone" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responemail" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="conenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="conchinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_OVERSEASSERVICE')" name="fourth">
              <el-table :data="tablefourth" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass4">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center" prop="department" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.deployment" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled3" :no="scope.row" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code5"
                      :data="scope.row.entrycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getEntrycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.entrypayment" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="deliverycondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code6"
                        :data="scope.row.deliverycondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDeliverycondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="delivery" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.delivery"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDelivery"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="claimcondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.claimcondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaimcondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="claim" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.claim"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaim"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliverydate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.completiondate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')" align="center" prop="deliveryfinshdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliveryfinshdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center" prop="loadingjudge" width="200" :error="errorjudge">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorjudge" :selectType="selectType" :userlist="scope.row.loadingjudge"
                          @getUserids="getJudge" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="200">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code9"
                      :data="scope.row.currencyposition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getCurrencyposition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.claimdatetime"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"
                            @getUserids="getCusto" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="custoenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="custoabbreviation" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="custochinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custochinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" align="center"  prop="businesscode" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.businesscode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_VARTO')" align="center" prop="varto"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code10"
                      :data="scope.row.varto"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getVarto"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="placeenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placeenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="placechinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="responerglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responerglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responphone" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responemail" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="conenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="conchinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_DOMESTIC')" name="fifth">
              <el-table :data="tablefifth" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass5">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center" prop="department" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.department" :no="scope.row" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.deployment" :no="scope.row" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled3" :no="scope.row" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code5"
                      :data="scope.row.entrycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getEntrycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.entrypayment" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="deliverycondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code6"
                        :data="scope.row.deliverycondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDeliverycondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="delivery" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.delivery"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDelivery"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="claimcondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.claimcondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaimcondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="claim" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.claim"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaim"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliverydate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.completiondate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')" align="center" prop="deliveryfinshdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliveryfinshdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center" prop="loadingjudge" width="200" :error="errorjudge">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorjudge" :selectType="selectType" :userlist="scope.row.loadingjudge"
                          @getUserids="getJudge" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount"  width="200">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code9"
                      :data="scope.row.currencyposition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getCurrencyposition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.claimdatetime"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"
                            @getUserids="getCusto" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="custoenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="custoabbreviation" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="custochinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custochinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" align="center"  prop="businesscode" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.businesscode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_VARTO')" align="center" prop="varto"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code10"
                      :data="scope.row.varto"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getVarto"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="placeenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placeenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="placechinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="responerglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responerglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responphone" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responemail" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="conenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="conchinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_DOMESTICTRUST')" name="sixth">
              <el-table :data="tablesixth" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass6">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center" prop="department" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.department" :no="scope.row" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.deployment" :no="scope.row" :disabled="!disabled" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code5"
                      :data="scope.row.entrycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getEntrycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.entrypayment" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="deliverycondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code6"
                        :data="scope.row.deliverycondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDeliverycondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="delivery" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.delivery"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDelivery"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="claimcondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.claimcondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaimcondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="claim" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.claim"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaim"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliverydate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.completiondate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')" align="center" prop="deliveryfinshdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliveryfinshdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center" prop="loadingjudge" width="200" :error="errorjudge">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorjudge" :selectType="selectType" :userlist="scope.row.loadingjudge"
                          @getUserids="getJudge" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="200">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code9"
                      :data="scope.row.currencyposition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getCurrencyposition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.claimdatetime"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"
                            @getUserids="getCusto" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="custoenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="custoabbreviation" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="custochinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custochinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" align="center"  prop="businesscode" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.businesscode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_VARTO')" align="center" prop="varto"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code10"
                      :data="scope.row.varto"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getVarto"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="placeenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placeenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="placechinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="responerglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responerglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responphone" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responemail" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="conenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="conchinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_DOMESTICSERVICE')" name="seventh">
              <el-table :data="tableseventh" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass7">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center" prop="department" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.department" :no="scope.row" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.deployment" :no="scope.row" :disabled="!disabled" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code5"
                      :data="scope.row.entrycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getEntrycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.entrypayment" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="deliverycondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code6"
                        :data="scope.row.deliverycondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDeliverycondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="delivery" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.delivery"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDelivery"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="claimcondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.claimcondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaimcondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="claim" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.claim"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaim"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliverydate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.completiondate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')" align="center" prop="deliveryfinshdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliveryfinshdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center" prop="loadingjudge" width="200" :error="errorjudge">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorjudge" :selectType="selectType" :userlist="scope.row.loadingjudge"
                          @getUserids="getJudge" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="200">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code9"
                      :data="scope.row.currencyposition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getCurrencyposition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.claimdatetime"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"
                            @getUserids="getCusto" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="custoenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="custoabbreviation" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="custochinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custochinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" align="center"  prop="businesscode" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.businesscode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_VARTO')" align="center" prop="varto"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code10"
                      :data="scope.row.varto"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getVarto"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="placeenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placeenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="placechinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="responerglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responerglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responphone" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responemail" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="conenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="conchinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS2026FORMVIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_TRUST')" name="eighth">
              <el-table :data="tableeighth" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass8">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center" prop="department" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.department" :no="scope.row" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.deployment" :no="scope.row" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled3" :no="scope.row" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code5"
                      :data="scope.row.entrycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getEntrycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.entrypayment" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="deliverycondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code6"
                        :data="scope.row.deliverycondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDeliverycondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="delivery" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.delivery"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDelivery"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="claimcondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.claimcondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaimcondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="claim" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.claim"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaim"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliverydate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.completiondate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')" align="center" prop="deliveryfinshdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliveryfinshdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center" prop="loadingjudge" width="200" :error="errorjudge">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorjudge" :selectType="selectType" :userlist="scope.row.loadingjudge"
                          @getUserids="getJudge" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="200">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code9"
                      :data="scope.row.currencyposition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getCurrencyposition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.claimdatetime"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"
                            @getUserids="getCusto" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="custoenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="custoabbreviation" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="custochinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custochinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" align="center"  prop="businesscode" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.businesscode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_VARTO')" align="center" prop="varto"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code10"
                      :data="scope.row.varto"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getVarto"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="placeenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placeenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="placechinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="responerglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responerglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responphone" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responemail" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="conenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="conchinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_SELL')" name="ninth">
              <el-table :data="tableninth" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass9">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center" prop="department" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.department" :no="scope.row" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.deployment" :no="scope.row" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled3" :no="scope.row" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"  width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" :no="scope.row" maxlength="20" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code5"
                      :data="scope.row.entrycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getEntrycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.entrypayment" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="deliverycondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code6"
                        :data="scope.row.deliverycondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDeliverycondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="delivery" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.delivery"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDelivery"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="claimcondition" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.claimcondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaimcondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="claim" width="200">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.claim"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaim"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliverydate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.completiondate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')" align="center" prop="deliveryfinshdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.deliveryfinshdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center" prop="loadingjudge" width="200" :error="errorjudge">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorjudge" :selectType="selectType" :userlist="scope.row.loadingjudge"
                          @getUserids="getJudge" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="200">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code9"
                      :data="scope.row.currencyposition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getCurrencyposition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.claimdatetime"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"
                            @getUserids="getCusto" style="width: 10.15rem"></user>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="custoenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="custoabbreviation" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custoabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="custochinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.custochinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" align="center"  prop="businesscode" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.businesscode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_VARTO')" align="center" prop="varto"  width="200">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code10"
                      :data="scope.row.varto"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getVarto"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="placeenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placeenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="placechinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="responerglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responerglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responphone" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responemail" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="conenglish" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="conchinese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.state">
                    </el-input>
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
    import { Message } from 'element-ui'
    import dicselect from "../../../components/dicselect";
    import {getOrgInfo,getDictionaryInfo} from '@/utils/customize';
    import user from '../../../components/user.vue';
    import org from "../../../components/org";
    import moment from "moment";

    export default {
        name: 'PFANS1026View',
        components: {
            EasyNormalContainer,
            dicselect,
            user,
            org
        },
        data() {
            return {
                checked1: false,
                index: "",
                dialogFormVisible: false,
                grouporglist: '',
                groupinfo:[],
                errorgroup: '',
                maketype: '',
                letcontractnumber: '',
                letcontracttype: '',
                loading: false,
                selectType: "Single",
                title: "title.PFANS1026VIEW",
                contractapplication: {},
                activeName: '',
                erroruser: "",
                errorjudge: "",
                errorcusto: "",
                errorfirstjudge: "",
                errorsecondjudge: "",
                erroroutmanager: "",
                errormanager: "",
                disabled: true,
                disabled1: false,
                disabled2: true,
                disabled3: false,
                multiple: false,
                rowindex: '',
                rules: {},
                buttonList:[
                    {
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                    },
                    {
                        key: 'makeinto',
                        name: 'button.makeinto',
                        disabled: false,
                    }
                ],
                form:{
                    contractnumber: '',
                    claimtype: '',
                    contracttype: '',
                    applicationdate: '',
                    entrycondition: '',
                    group_id: '',
                    maketype: '',
                },
                formLabelWidth: '120px',
                tablefirst: [],
                tablesecond: [],
                tablethird: [],
                tablefourth: [],
                tablefifth: [],
                tablesixth: [],
                tableseventh: [],
                tableeighth: [],
                tableninth: [],
                code:'HT001',
                code1: 'PJ028',
                code2: 'HT008',
                code3: 'HT007',
                code4: 'HT003',
                code5: 'HT004',
                code6: 'HT009',
                code7: 'HT010',
                code8: 'HT011',
                code9: 'HT006',
                code10: 'HT012',
                code11: 'HT013',
                show1: true,
                show2: false,
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1026Store/get', {"contractapplication_id": this.$route.params._id})
                    .then(response => {
                        if (response.length > 0) {
                            for (let i = 0; i < response.length; i++) {
                                this.maketype = response[i].maketype;
                                this.form.contracttype = response[i].contracttype;
                                //契約種類
                                let letabbreviation = getDictionaryInfo(response[i].contracttype);
                                if (letabbreviation != null) {
                                    response[i].contracttype = letabbreviation.value1;
                                }
                                if (response[i].claimdatetime !== '' && response[i].claimdatetime !== null) {
                                    let claimdatetime = response[i].claimdatetime;
                                    let claimdatetim = claimdatetime.slice(0, 10);
                                    let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 10);
                                    response[i].claimdatetime = [claimdatetim, claimdatetime1];
                                }
                                let o = Object.assign({}, response[i]);
                                if (this.maketype === '1') {
                                    this.activeName = 'first';
                                    this.tablefirst.push(o);
                                } else if (this.maketype === '2') {
                                    this.activeName = 'second';
                                    this.tablesecond.push(o);
                                } else if (this.maketype === '3') {
                                    this.activeName = 'third';
                                    this.tablethird.push(o);
                                } else if (this.maketype === '4') {
                                    this.activeName = 'fourth';
                                    this.tablefourth.push(o);
                                } else if (this.maketype === '5') {
                                    this.activeName = 'fifth';
                                    this.tablefifth.push(o);
                                } else if (this.maketype === '6') {
                                    this.activeName = 'sixth';
                                    this.tablesixth.push(o);
                                } else if (this.maketype === '7') {
                                    this.activeName = 'seventh';
                                    this.tableseventh.push(o);
                                } else if (this.maketype === '8') {
                                    this.activeName = 'eighth';
                                    this.tableeighth.push(o);
                                } else if (this.maketype === '9') {
                                    this.activeName = 'ninth';
                                    this.tableninth.push(o);
                                }
                            }
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                        this.loading = false
                    })
            } else {
                this.activeName = 'first';
                this.dialogFormVisible = true;
            }
        },
        created() {
            this.disabled = this.$route.params.disabled;
            if (!this.disabled) {
                this.buttonList = [];
            }
            if (this.$route.params._id) {
                this.buttonList = [
                    {
                        key: 'cancellation',
                        name: 'button.cancellation',
                        disabled: false,
                    },
                    {
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                    },
                    {
                        key: 'makeinto',
                        name: 'button.makeinto',
                        disabled: false,
                    },
                ]
            }
            else{
                this.buttonList = [
                    {
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                    },
                    {
                        key: 'makeinto',
                        name: 'button.makeinto',
                        disabled: false,
                    },
                ]
            }
        },
        methods: {
            getGroupId(val) {
                this.grouporglist = val;
                let group = getOrgInfo(val);
                if(group){
                    this.groupinfo = [val,group.companyen,group.orgname,group.companyname];
                }
            },
            getUserids(val,row) {
                row.user_id = val;
                if (!row.user_id || row.user_id === '' || val === "undefined") {
                    this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.erroruser = "";
                }
            },
            getJudge(val, row) {
                row.loadingjudge = val;
                if (!row.loadingjudge || row.loadingjudge === '' || val === "undefined") {
                    this.errorjudge = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.errorjudge = "";
                }
            },
            getCusto(val, row) {
                row.custojapanese = val;
                if (!row.custojapanese || row.custojapanese === '' || val === "undefined") {
                    this.errorcusto = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.errorcusto = "";
                }
            },
            getnumber(val){
                this.form.claimtype = val;
            },
            //本来契約
            getChecked(val){
                this.checked1 = val;
                if(val === true){
                    this.disabled1 = true;
                    this.disabled2 = false;
                }else{
                    this.disabled1 = false;
                    this.disabled2 = true;
                    this.form.contractnumber = '';
                }
            },
            getcontracttype(val){
                this.form.contracttype = val;
            },
            getcareeryear1(val){
                this.form.applicationdate = val;
            },
            getcareeryear2(val){
                this.form.entrycondition = val;
            },
            getVarto(val, row){
                row.varto = val;
            },
            getCurrencyposition(val, row){
                row.currencyposition = val;
            },
            getFirstjudge(val,row){
                row.firstjudge = val;
            },
            getSecondjudge(val,row){
                row.secondjudge = val;
            },
            getOutmanager(val,row){
                row.outputmanager = val;
            },
            getManager(val,row){
                row.manager = val;
            },
            getEntrycondition(val,row){
                row.entrycondition = val;
            },
            getDecide(val,row){
                row.decide = val;
            },
            getDeliverycondition(val,row){
                row.deliverycondition = val;
            },
            getDelivery(val,row){
                row.delivery = val;
            },
            getClaimcondition(val,row){
                row.claimcondition = val;
            },
            getClaim(val,row){
                row.claim = val;
            },
            //日期区组件处理
            getclaimdatetime(claimdatetime){
                if(claimdatetime.length > 0){
                    return moment(claimdatetime[0]).format('YYYY-MM-DD') + " ~ " + moment(claimdatetime[1]).format('YYYY-MM-DD');
                }
                else{
                    return '';
                }
            },
            getRowClass1({row, column, rowIndex, columnIndex}) {

                if (column.level === 2 && columnIndex >= 0 && columnIndex < 2) {
                    return {
                        color: 'white',
                        background: '#99CCFF',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73B9FF',
                    };
                }
                if (column.level === 2 && columnIndex >=2  && columnIndex < 4) {
                    return {
                        color: 'white',
                        background: '#99CC99',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73CC73',
                    };
                }
                if (column.level === 2 && columnIndex >= 4 && columnIndex < 8) {
                    return {
                        color: 'white',
                        background: '#CC99FF',
                        'border-right': '1px solid #B973FF',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 8 && columnIndex < 11) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 11 && columnIndex < 15) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 15 && columnIndex < 18) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if(column.level === 2 && columnIndex >= 18 && columnIndex < 26 ){
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    }
                }
                if(column.level === 1 && columnIndex >= 0 && columnIndex < 30){
                    return {
                        color: 'white',
                        background: '#005BAA',
                    };
                }
            },
            getRowClass2({row, column, rowIndex, columnIndex}) {

                if (column.level === 2 && columnIndex >= 0 && columnIndex < 2) {
                    return {
                        color: 'white',
                        background: '#99CCFF',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73B9FF',
                    };
                }
                if (column.level === 2 && columnIndex >=2  && columnIndex < 4) {
                    return {
                        color: 'white',
                        background: '#99CC99',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73CC73',
                    };
                }
                if (column.level === 2 && columnIndex >= 4 && columnIndex < 8) {
                    return {
                        color: 'white',
                        background: '#CC99FF',
                        'border-right': '1px solid #B973FF',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 8 && columnIndex < 11) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 11 && columnIndex < 15) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 15 && columnIndex < 18) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if(column.level === 2 && columnIndex >= 18 && columnIndex < 26 ){
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    }
                }
                if(column.level === 1 && columnIndex >= 0 && columnIndex < 30){
                    return {
                        color: 'white',
                        background: '#005BAA',
                    };
                }
            },
            getRowClass3({row, column, rowIndex, columnIndex}) {

                if (column.level === 2 && columnIndex >= 0 && columnIndex < 2) {
                    return {
                        color: 'white',
                        background: '#99CCFF',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73B9FF',
                    };
                }
                if (column.level === 2 && columnIndex >=2  && columnIndex < 4) {
                    return {
                        color: 'white',
                        background: '#99CC99',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73CC73',
                    };
                }
                if (column.level === 2 && columnIndex >= 4 && columnIndex < 8) {
                    return {
                        color: 'white',
                        background: '#CC99FF',
                        'border-right': '1px solid #B973FF',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 8 && columnIndex < 11) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 11 && columnIndex < 15) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 15 && columnIndex < 18) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if(column.level === 1 && columnIndex >= 0 && columnIndex < 30){
                    return {
                        color: 'white',
                        background: '#005BAA',
                    };
                }
            },
            getRowClass4({row, column, rowIndex, columnIndex}) {

                if (column.level === 2 && columnIndex >= 0 && columnIndex < 2) {
                    return {
                        color: 'white',
                        background: '#99CCFF',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73B9FF',
                    };
                }
                if (column.level === 2 && columnIndex >=2  && columnIndex < 4) {
                    return {
                        color: 'white',
                        background: '#99CC99',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73CC73',
                    };
                }
                if (column.level === 2 && columnIndex >= 4 && columnIndex < 8) {
                    return {
                        color: 'white',
                        background: '#CC99FF',
                        'border-right': '1px solid #B973FF',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 8 && columnIndex < 11) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 11 && columnIndex < 15) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 15 && columnIndex < 18) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if(column.level === 1 && columnIndex >= 0 && columnIndex < 30){
                    return {
                        color: 'white',
                        background: '#005BAA',
                    };
                }
            },
            getRowClass5({row, column, rowIndex, columnIndex}) {

                if (column.level === 2 && columnIndex >= 0 && columnIndex < 2) {
                    return {
                        color: 'white',
                        background: '#99CCFF',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73B9FF',
                    };
                }
                if (column.level === 2 && columnIndex >=2  && columnIndex < 4) {
                    return {
                        color: 'white',
                        background: '#99CC99',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73CC73',
                    };
                }
                if (column.level === 2 && columnIndex >= 4 && columnIndex < 8) {
                    return {
                        color: 'white',
                        background: '#CC99FF',
                        'border-right': '1px solid #B973FF',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 8 && columnIndex < 11) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 11 && columnIndex < 15) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 15 && columnIndex < 18) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if(column.level === 1 && columnIndex >= 0 && columnIndex < 30){
                    return {
                        color: 'white',
                        background: '#005BAA',
                    };
                }
            },
            getRowClass6({row, column, rowIndex, columnIndex}) {

                if (column.level === 2 && columnIndex >= 0 && columnIndex < 2) {
                    return {
                        color: 'white',
                        background: '#99CCFF',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73B9FF',
                    };
                }
                if (column.level === 2 && columnIndex >=2  && columnIndex < 4) {
                    return {
                        color: 'white',
                        background: '#99CC99',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73CC73',
                    };
                }
                if (column.level === 2 && columnIndex >= 4 && columnIndex < 8) {
                    return {
                        color: 'white',
                        background: '#CC99FF',
                        'border-right': '1px solid #B973FF',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 8 && columnIndex < 11) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 11 && columnIndex < 15) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 15 && columnIndex < 18) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if(column.level === 1 && columnIndex >= 0 && columnIndex < 30){
                    return {
                        color: 'white',
                        background: '#005BAA',
                    };
                }
            },
            getRowClass7({row, column, rowIndex, columnIndex}) {

                if (column.level === 2 && columnIndex >= 0 && columnIndex < 2) {
                    return {
                        color: 'white',
                        background: '#99CCFF',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73B9FF',
                    };
                }
                if (column.level === 2 && columnIndex >=2  && columnIndex < 4) {
                    return {
                        color: 'white',
                        background: '#99CC99',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73CC73',
                    };
                }
                if (column.level === 2 && columnIndex >= 4 && columnIndex < 8) {
                    return {
                        color: 'white',
                        background: '#CC99FF',
                        'border-right': '1px solid #B973FF',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 8 && columnIndex < 11) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 11 && columnIndex < 15) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 15 && columnIndex < 18) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if(column.level === 1 && columnIndex >= 0 && columnIndex < 30){
                    return {
                        color: 'white',
                        background: '#005BAA',
                    };
                }
            },
            getRowClass8({row, column, rowIndex, columnIndex}) {

                if (column.level === 2 && columnIndex >= 0 && columnIndex < 2) {
                    return {
                        color: 'white',
                        background: '#99CCFF',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73B9FF',
                    };
                }
                if (column.level === 2 && columnIndex >=2  && columnIndex < 4) {
                    return {
                        color: 'white',
                        background: '#99CC99',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73CC73',
                    };
                }
                if (column.level === 2 && columnIndex >= 4 && columnIndex < 8) {
                    return {
                        color: 'white',
                        background: '#CC99FF',
                        'border-right': '1px solid #B973FF',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 8 && columnIndex < 11) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 11 && columnIndex < 15) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 15 && columnIndex < 18) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if(column.level === 1 && columnIndex >= 0 && columnIndex < 30){
                    return {
                        color: 'white',
                        background: '#005BAA',
                    };
                }
            },
            getRowClass9({row, column, rowIndex, columnIndex}) {

                if (column.level === 2 && columnIndex >= 0 && columnIndex < 2) {
                    return {
                        color: 'white',
                        background: '#99CCFF',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73B9FF',
                    };
                }
                if (column.level === 2 && columnIndex >=2  && columnIndex < 4) {
                    return {
                        color: 'white',
                        background: '#99CC99',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73CC73',
                    };
                }
                if (column.level === 2 && columnIndex >= 4 && columnIndex < 8) {
                    return {
                        color: 'white',
                        background: '#CC99FF',
                        'border-right': '1px solid #B973FF',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 8 && columnIndex < 11) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #CC7373',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 11 && columnIndex < 15) {
                    return {
                        color: 'white',
                        background: '#99CC99',
                        'border-right': '1px solid #B973FF',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if (column.level === 2 && columnIndex >= 15 && columnIndex < 18) {
                    return {
                        color: 'white',
                        background: '#CC9999',
                        'border-right': '1px solid #99CCFF',
                        'border-bottom': '1px solid #99CCFF',
                    };
                }
                if(column.level === 1 && columnIndex >= 0 && columnIndex < 30){
                    return {
                        color: 'white',
                        background: '#005BAA',
                    };
                }
            },
            //海外受託 技術開発
            addRowfirst() {
                this.tablefirst.push({
                    contractapplication_id: '',
                    group_id: this.groupinfo[0],
                    department: this.groupinfo[1],
                    orgnumber: this.groupinfo[2],
                    deployment: this.groupinfo[3],
                    applicationdate: moment(new Date()).format("YYYY-MM-DD"),
                    user_id: this.$store.getters.userinfo.userid,
                    contracttype: this.contracttype,
                    contractnumber: this.letcontractnumber,
                    entrycondition: '',
                    entrypayment: '',
                    deliverycondition: '',
                    delivery: '',
                    claimcondition: '',
                    claim: '',
                    claimtype: '',
                    deliverydate: '',
                    completiondate: '',
                    deliveryfinshdate: '',
                    loadingjudge: '',
                    claimdate: moment(new Date()).format("YYYY-MM-DD"),
                    claimamount: '',
                    currencyposition: '',
                    supportdate: '',
                    custojapanese: '',
                    custoenglish: '',
                    custoabbreviation: '',
                    custochinese: '',
                    businesscode: '',
                    claimdatetime: [],
                    varto: '',
                    placejapanese: '',
                    placeenglish: '',
                    placechinese: '',
                    responjapanese: '',
                    responerglish: '',
                    responphone: '',
                    responemail: '',
                    conjapanese: '',
                    conenglish: '',
                    conchinese: '',
                    remarks: '',
                    state: '',
                    decide: '',
                    firstjudge: '',
                    secondjudge: '',
                    outputmanager: '',
                    manager: '',
                    decisionnumber: '',
                    outnumber: '',
                    productnumber: '',
                    type: '1',
                    maketype: '1',
                });
            },
            addRowsecond() {
                //契約書番号
                let letcontractnumber = '';
                if(this.form.contractnumber != ''){
                    letcontractnumber = this.form.contractnumber;
                }
                //契約种类
                let letcontracttype = '';
                if(this.form.contracttype != ''){
                    letcontracttype = this.form.contracttype;
                }
                this.tablesecond.push({
                    contractapplication_id: '',
                    group_id: this.groupinfo[0],
                    department: this.groupinfo[1],
                    orgnumber: this.groupinfo[2],
                    deployment: this.groupinfo[3],
                    applicationdate:  moment(new Date()).format("YYYY-MM-DD"),
                    user_id: this.$store.getters.userinfo.userid,
                    contracttype: this.contracttype,
                    contractnumber: this.letcontractnumber,
                    entrycondition: '',
                    entrypayment: '',
                    deliverycondition: '',
                    delivery: '',
                    claimcondition: '',
                    claim: '',
                    claimtype: '',
                    deliverydate: '',
                    completiondate: '',
                    deliveryfinshdate: '',
                    loadingjudge: '',
                    claimdate: moment(new Date()).format("YYYY-MM-DD"),
                    claimamount: '',
                    currencyposition: '',
                    supportdate: '',
                    custojapanese: '',
                    custoenglish: '',
                    custoabbreviation: '',
                    custochinese: '',
                    businesscode: '',
                    claimdatetime: [],
                    varto: '',
                    placejapanese: '',
                    placeenglish: '',
                    placechinese: '',
                    responjapanese: '',
                    responerglish: '',
                    responphone: '',
                    responemail: '',
                    conjapanese: '',
                    conenglish: '',
                    conchinese: '',
                    remarks: '',
                    state: '',
                    decide: '',
                    firstjudge: '',
                    secondjudge: '',
                    outputmanager: '',
                    manager: '',
                    decisionnumber: '',
                    outnumber: '',
                    productnumber: '',
                    type: '1',
                    maketype: '2',
                });
            },
            addRowthird() {
                let letcontractnumber = '';
                if(this.form.contractnumber != ''){
                    letcontractnumber = this.form.contractnumber;
                }
                //契約种类
                let letcontracttype = '';
                if(this.form.contracttype != ''){
                    letcontracttype = this.form.contracttype;
                }
                this.tablethird.push({
                    contractapplication_id: '',
                    group_id: this.groupinfo[0],
                    department: this.groupinfo[1],
                    orgnumber: this.groupinfo[2],
                    deployment: this.groupinfo[3],
                    applicationdate:  moment(new Date()).format("YYYY-MM-DD"),
                    user_id: this.$store.getters.userinfo.userid,
                    contracttype: this.contracttype,
                    contractnumber: this.letcontractnumber,
                    entrycondition: '',
                    entrypayment: '',
                    deliverycondition: '',
                    delivery: '',
                    claimcondition: '',
                    claim: '',
                    claimtype: '',
                    deliverydate: '',
                    completiondate: '',
                    deliveryfinshdate: '',
                    loadingjudge: '',
                    claimdate: moment(new Date()).format("YYYY-MM-DD"),
                    claimamount: '',
                    currencyposition: '',
                    supportdate: '',
                    custojapanese: '',
                    custoenglish: '',
                    custoabbreviation: '',
                    custochinese: '',
                    businesscode: '',
                    claimdatetime: [],
                    varto: '',
                    placejapanese: '',
                    placeenglish: '',
                    placechinese: '',
                    responjapanese: '',
                    responerglish: '',
                    responphone: '',
                    responemail: '',
                    conjapanese: '',
                    conenglish: '',
                    conchinese: '',
                    remarks: '',
                    state: '',
                    type: '1',
                    maketype: '3',
                });
            },
            addRowfourth() {
                let letcontractnumber = '';
                if(this.form.contractnumber != ''){
                    letcontractnumber = this.form.contractnumber;
                }
                //契約种类
                let letcontracttype = '';
                if(this.form.contracttype != ''){
                    letcontracttype = this.form.contracttype;
                }
                this.tablefourth.push({
                    contractapplication_id: '',
                    group_id: this.groupinfo[0],
                    department: this.groupinfo[1],
                    orgnumber: this.groupinfo[2],
                    deployment: this.groupinfo[3],
                    applicationdate:  moment(new Date()).format("YYYY-MM-DD"),
                    user_id: this.$store.getters.userinfo.userid,
                    contracttype: this.contracttype,
                    contractnumber: this.letcontractnumber,
                    entrycondition: '',
                    entrypayment: '',
                    deliverycondition: '',
                    delivery: '',
                    claimcondition: '',
                    claim: '',
                    claimtype: '',
                    deliverydate: '',
                    completiondate: '',
                    deliveryfinshdate: '',
                    loadingjudge: '',
                    claimdate: moment(new Date()).format("YYYY-MM-DD"),
                    claimamount: '',
                    currencyposition: '',
                    supportdate: '',
                    custojapanese: '',
                    custoenglish: '',
                    custoabbreviation: '',
                    custochinese: '',
                    businesscode: '',
                    claimdatetime: [],
                    varto: '',
                    placejapanese: '',
                    placeenglish: '',
                    placechinese: '',
                    responjapanese: '',
                    responerglish: '',
                    responphone: '',
                    responemail: '',
                    conjapanese: '',
                    conenglish: '',
                    conchinese: '',
                    remarks: '',
                    state: '',
                    type: '1',
                    maketype: '4',
                });
            },
            addRowfifth() {
                let letcontractnumber = '';
                if(this.form.contractnumber != ''){
                    letcontractnumber = this.form.contractnumber;
                }
                //契約种类
                let letcontracttype = '';
                if(this.form.contracttype != ''){
                    letcontracttype = this.form.contracttype;
                }
                this.tablefifth.push({
                    contractapplication_id: '',
                    group_id: this.groupinfo[0],
                    department: this.groupinfo[1],
                    orgnumber: this.groupinfo[2],
                    deployment: this.groupinfo[3],
                    applicationdate:  moment(new Date()).format("YYYY-MM-DD"),
                    user_id: this.$store.getters.userinfo.userid,
                    contracttype: this.contracttype,
                    contractnumber: this.letcontractnumber,
                    entrycondition: '',
                    entrypayment: '',
                    deliverycondition: '',
                    delivery: '',
                    claimcondition: '',
                    claim: '',
                    claimtype: '',
                    deliverydate: '',
                    completiondate: '',
                    deliveryfinshdate: '',
                    loadingjudge: '',
                    claimdate: moment(new Date()).format("YYYY-MM-DD"),
                    claimamount: '',
                    currencyposition: '',
                    supportdate: '',
                    custojapanese: '',
                    custoenglish: '',
                    custoabbreviation: '',
                    custochinese: '',
                    businesscode: '',
                    claimdatetime: [],
                    varto: '',
                    placejapanese: '',
                    placeenglish: '',
                    placechinese: '',
                    responjapanese: '',
                    responerglish: '',
                    responphone: '',
                    responemail: '',
                    conjapanese: '',
                    conenglish: '',
                    conchinese: '',
                    remarks: '',
                    state: '',
                    type: '1',
                    maketype: '5',
                });
            },
            addRowsixth() {
                let letcontractnumber = '';
                if(this.form.contractnumber != ''){
                    letcontractnumber = this.form.contractnumber;
                }
                //契約种类
                let letcontracttype = '';
                if(this.form.contracttype != ''){
                    letcontracttype = this.form.contracttype;
                }
                this.tablesixth.push({
                    contractapplication_id: '',
                    group_id: this.groupinfo[0],
                    department: this.groupinfo[1],
                    orgnumber: this.groupinfo[2],
                    deployment: this.groupinfo[3],
                    applicationdate:  moment(new Date()).format("YYYY-MM-DD"),
                    user_id: this.$store.getters.userinfo.userid,
                    contracttype: this.contracttype,
                    contractnumber: this.letcontractnumber,
                    entrycondition: '',
                    entrypayment: '',
                    deliverycondition: '',
                    delivery: '',
                    claimcondition: '',
                    claim: '',
                    claimtype: '',
                    deliverydate: '',
                    completiondate: '',
                    deliveryfinshdate: '',
                    loadingjudge: '',
                    claimdate: moment(new Date()).format("YYYY-MM-DD"),
                    claimamount: '',
                    currencyposition: '',
                    supportdate: '',
                    custojapanese: '',
                    custoenglish: '',
                    custoabbreviation: '',
                    custochinese: '',
                    businesscode: '',
                    claimdatetime: [],
                    varto: '',
                    placejapanese: '',
                    placeenglish: '',
                    placechinese: '',
                    responjapanese: '',
                    responerglish: '',
                    responphone: '',
                    responemail: '',
                    conjapanese: '',
                    conenglish: '',
                    conchinese: '',
                    remarks: '',
                    state: '',
                    type: '1',
                    maketype: '6',
                });
            },
            addRowseventh() {
                let letcontractnumber = '';
                if(this.form.contractnumber != ''){
                    letcontractnumber = this.form.contractnumber;
                }
                //契約种类
                let letcontracttype = '';
                if(this.form.contracttype != ''){
                    letcontracttype = this.form.contracttype;
                }
                this.tableseventh.push({
                    contractapplication_id: '',
                    group_id: this.groupinfo[0],
                    department: this.groupinfo[1],
                    orgnumber: this.groupinfo[2],
                    deployment: this.groupinfo[3],
                    applicationdate:  moment(new Date()).format("YYYY-MM-DD"),
                    user_id: this.$store.getters.userinfo.userid,
                    contracttype: this.contracttype,
                    contractnumber: this.letcontractnumber,
                    entrycondition: '',
                    entrypayment: '',
                    deliverycondition: '',
                    delivery: '',
                    claimcondition: '',
                    claim: '',
                    claimtype: '',
                    deliverydate: '',
                    completiondate: '',
                    deliveryfinshdate: '',
                    loadingjudge: '',
                    claimdate: moment(new Date()).format("YYYY-MM-DD"),
                    claimamount: '',
                    currencyposition: '',
                    supportdate: '',
                    custojapanese: '',
                    custoenglish: '',
                    custoabbreviation: '',
                    custochinese: '',
                    businesscode: '',
                    claimdatetime: [],
                    varto: '',
                    placejapanese: '',
                    placeenglish: '',
                    placechinese: '',
                    responjapanese: '',
                    responerglish: '',
                    responphone: '',
                    responemail: '',
                    conjapanese: '',
                    conenglish: '',
                    conchinese: '',
                    remarks: '',
                    state: '',
                    type: '1',
                    maketype: '7',
                });
            },
            addRoweighth() {
                let letcontractnumber = '';
                if(this.form.contractnumber != ''){
                    letcontractnumber = this.form.contractnumber;
                }
                //契約种类
                let letcontracttype = '';
                if(this.form.contracttype != ''){
                    letcontracttype = this.form.contracttype;
                }
                this.tableeighth.push({
                    contractapplication_id: '',
                    group_id: this.groupinfo[0],
                    department: this.groupinfo[1],
                    orgnumber: this.groupinfo[2],
                    deployment: this.groupinfo[3],
                    applicationdate:  moment(new Date()).format("YYYY-MM-DD"),
                    user_id: this.$store.getters.userinfo.userid,
                    contracttype: this.contracttype,
                    contractnumber: this.letcontractnumber,
                    entrycondition: '',
                    entrypayment: '',
                    deliverycondition: '',
                    delivery: '',
                    claimcondition: '',
                    claim: '',
                    claimtype: '',
                    deliverydate: '',
                    completiondate: '',
                    deliveryfinshdate: '',
                    loadingjudge: '',
                    claimdate: moment(new Date()).format("YYYY-MM-DD"),
                    claimamount: '',
                    currencyposition: '',
                    supportdate: '',
                    custojapanese: '',
                    custoenglish: '',
                    custoabbreviation: '',
                    custochinese: '',
                    businesscode: '',
                    claimdatetime: [],
                    varto: '',
                    placejapanese: '',
                    placeenglish: '',
                    placechinese: '',
                    responjapanese: '',
                    responerglish: '',
                    responphone: '',
                    responemail: '',
                    conjapanese: '',
                    conenglish: '',
                    conchinese: '',
                    remarks: '',
                    state: '',
                    type: '1',
                    maketype: '8',
                });
            },
            addRowninth() {
                let letcontractnumber = '';
                if(this.form.contractnumber != ''){
                    letcontractnumber = this.form.contractnumber;
                }
                //契約种类
                let letcontracttype = '';
                if(this.form.contracttype != ''){
                    letcontracttype = this.form.contracttype;
                }
                this.tableninth.push({
                    contractapplication_id: '',
                    group_id: this.groupinfo[0],
                    department: this.groupinfo[1],
                    orgnumber: this.groupinfo[2],
                    deployment: this.groupinfo[3],
                    applicationdate:  moment(new Date()).format("YYYY-MM-DD"),
                    user_id: this.$store.getters.userinfo.userid,
                    contracttype: this.contracttype,
                    contractnumber: this.letcontractnumber,
                    entrycondition: '',
                    entrypayment: '',
                    deliverycondition: '',
                    delivery: '',
                    claimcondition: '',
                    claim: '',
                    claimtype: '',
                    deliverydate: '',
                    completiondate: '',
                    deliveryfinshdate: '',
                    loadingjudge: '',
                    claimdate: moment(new Date()).format("YYYY-MM-DD"),
                    claimamount: '',
                    currencyposition: '',
                    supportdate: '',
                    custojapanese: '',
                    custoenglish: '',
                    custoabbreviation: '',
                    custochinese: '',
                    businesscode: '',
                    claimdatetime: [],
                    varto: '',
                    placejapanese: '',
                    placeenglish: '',
                    placechinese: '',
                    responjapanese: '',
                    responerglish: '',
                    responphone: '',
                    responemail: '',
                    conjapanese: '',
                    conenglish: '',
                    conchinese: '',
                    remarks: '',
                    state: '',
                    type: '1',
                    maketype: '9',
                });
            },
            //契約番号做成
            click() {
                this.tablefirst = [];
                this.tablesecond = [];
                this.tablethird = [];
                this.tablefourth = [];
                this.tablefifth = [];
                this.tablesixth = [];
                this.tableseventh = [];
                this.tableeighth = [];
                this.tableninth = [];
                //contractnumber
                //請求方式
                let letclaimtype = '';
                //覚書
                if(this.form.contractnumber != ''){
                    letclaimtype = this.$t("label.PFANS1024VIEW_LETTERS");
                }
                let letclaimtypeone = letclaimtype + this.$t("label.PFANS1026FORMVIEW_ONE");
                let letclaimtypetwo = letclaimtype + this.$t("label.PFANS1026FORMVIEW_TWO");
                let letclaimtypethree = letclaimtype + this.$t("label.PFANS1026FORMVIEW_THREE");
                let letclaimtypefour = letclaimtype + this.$t("label.PFANS1026FORMVIEW_FOUR");
                debugger;
                //契約書番号
                this.letcontractnumber = this.form.contractnumber;
                //契約種類简称
                let abbreviation = '';
                let letabbreviation = getDictionaryInfo(this.form.contracttype);
                if (letabbreviation != null) {
                    //契約種類
                    this.contracttype = letabbreviation.value1;
                    abbreviation = letabbreviation.value2;
                }
                //事業年度
                let applicationdate = '';
                let letapplicationdate = getDictionaryInfo(this.form.applicationdate);
                if (letapplicationdate != null) {
                    applicationdate = letapplicationdate.value2;
                }
                //上下期
                let entrycondition = '';
                let letentrycondition = getDictionaryInfo(this.form.entrycondition);
                if (letentrycondition != null) {
                    entrycondition = letentrycondition.value2;
                }
                if(this.letcontractnumber === ""){
                    this.letcontractnumber = abbreviation + applicationdate + entrycondition + this.groupinfo[1];
                }
                //海外受託 技術開発
                if(this.form.contracttype === 'HT008001'){
                    this.activeName = 'first';
                    if(this.form.claimtype === "HT001001"){
                        this.addRowfirst();
                        this.tablefirst[0].claimtype = letclaimtypeone;
                    }
                    else if(this.form.claimtype === "HT001002"){
                        this.addRowfirst();
                        this.addRowfirst();
                        this.tablefirst[0].claimtype = letclaimtypeone;
                        this.tablefirst[1].claimtype = letclaimtypetwo;
                    }
                    else if(this.form.claimtype === "HT001003"){
                        this.addRowfirst();
                        this.addRowfirst();
                        this.addRowfirst();
                        this.tablefirst[0].claimtype = letclaimtypeone;
                        this.tablefirst[1].claimtype = letclaimtypetwo;
                        this.tablefirst[2].claimtype = letclaimtypethree;

                    }
                    else if(this.form.claimtype === "HT001004"){
                        this.addRowfirst();
                        this.addRowfirst();
                        this.addRowfirst();
                        this.addRowfirst();
                        this.tablefirst[0].claimtype = letclaimtypeone;
                        this.tablefirst[1].claimtype = letclaimtypetwo;
                        this.tablefirst[2].claimtype = letclaimtypethree;
                        this.tablefirst[3].claimtype = letclaimtypefour;
                    }
                }
                //海外複合受託 技術開発
                else if(this.form.contracttype === 'HT008002'){
                    this.activeName = 'second';
                    if(this.form.claimtype === "HT001001"){
                        this.addRowsecond();
                        this.tablesecond[0].claimtype = letclaimtypeone;
                    }
                    else if(this.form.claimtype === "HT001002"){
                        this.addRowsecond();
                        this.addRowsecond();
                        this.tablesecond[0].claimtype = letclaimtypeone;
                        this.tablesecond[1].claimtype = letclaimtypetwo;
                    }
                    else if(this.form.claimtype === "HT001003"){
                        this.addRowsecond();
                        this.addRowsecond();
                        this.addRowsecond();
                        this.tablesecond[0].claimtype = letclaimtypeone;
                        this.tablesecond[1].claimtype = letclaimtypetwo;
                        this.tablesecond[2].claimtype = letclaimtypethree;

                    }
                    else if(this.form.claimtype === "HT001004"){
                        this.addRowsecond();
                        this.addRowsecond();
                        this.addRowsecond();
                        this.addRowsecond();
                        this.tablesecond[0].claimtype = letclaimtypeone;
                        this.tablesecond[1].claimtype = letclaimtypetwo;
                        this.tablesecond[2].claimtype = letclaimtypethree;
                        this.tablesecond[3].claimtype = letclaimtypefour;
                    }
                }
                //海外受託 役務
                else if(this.form.contracttype === 'HT008003'){
                    this.activeName = 'third';

                    if(this.form.claimtype === "HT001001"){
                        this.addRowthird();
                        this.tablethird[0].claimtype = letclaimtypeone;
                    }
                    else if(this.form.claimtype === "HT001002"){
                        this.addRowthird();
                        this.addRowthird();
                        this.tablethird[0].claimtype = letclaimtypeone;
                        this.tablethird[1].claimtype = letclaimtypetwo;
                    }
                    else if(this.form.claimtype === "HT001003"){
                        this.addRowthird();
                        this.addRowthird();
                        this.addRowthird();
                        this.tablethird[0].claimtype = letclaimtypeone;
                        this.tablethird[1].claimtype = letclaimtypetwo;
                        this.tablethird[2].claimtype = letclaimtypethree;

                    }
                    else if(this.form.claimtype === "HT001004"){
                        this.addRowthird();
                        this.addRowthird();
                        this.addRowthird();
                        this.addRowthird();
                        this.tablethird[0].claimtype = letclaimtypeone;
                        this.tablethird[1].claimtype = letclaimtypetwo;
                        this.tablethird[2].claimtype = letclaimtypethree;
                        this.tablethird[3].claimtype = letclaimtypefour;
                    }
                }
                //海外複合受託 役務
                else if(this.form.contracttype === 'HT008004'){
                    this.activeName = 'fourth';

                    if(this.form.claimtype === "HT001001"){
                        this.addRowfourth();
                        this.tablefourth[0].claimtype = letclaimtypeone;
                    }
                    else if(this.form.claimtype === "HT001002"){
                        this.addRowfourth();
                        this.addRowfourth();
                        this.tablefourth[0].claimtype = letclaimtypeone;
                        this.tablefourth[1].claimtype = letclaimtypetwo;
                    }
                    else if(this.form.claimtype === "HT001003"){
                        this.addRowfourth();
                        this.addRowfourth();
                        this.addRowfourth();
                        this.tablefourth[0].claimtype = letclaimtypeone;
                        this.tablefourth[1].claimtype = letclaimtypetwo;
                        this.tablefourth[2].claimtype = letclaimtypethree;

                    }
                    else if(this.form.claimtype === "HT001004"){
                        this.addRowfourth();
                        this.addRowfourth();
                        this.addRowfourth();
                        this.addRowfourth();
                        this.tablefourth[0].claimtype = letclaimtypeone;
                        this.tablefourth[1].claimtype = letclaimtypetwo;
                        this.tablefourth[2].claimtype = letclaimtypethree;
                        this.tablefourth[3].claimtype = letclaimtypefour;
                    }
                }
                //国内受託 技術開発
                else if(this.form.contracttype === 'HT008005'){
                    this.activeName = 'fifth';

                    if(this.form.claimtype === "HT001001"){
                        this.addRowfifth();
                        this.tablefifth[0].claimtype = letclaimtypeone;
                    }
                    else if(this.form.claimtype === "HT001002"){
                        this.addRowfifth();
                        this.addRowfifth();
                        this.tablefifth[0].claimtype = letclaimtypeone;
                        this.tablefifth[1].claimtype = letclaimtypetwo;
                    }
                    else if(this.form.claimtype === "HT001003"){
                        this.addRowfifth();
                        this.addRowfifth();
                        this.addRowfifth();
                        this.tablefifth[0].claimtype = letclaimtypeone;
                        this.tablefifth[1].claimtype = letclaimtypetwo;
                        this.tablefifth[2].claimtype = letclaimtypethree;

                    }
                    else if(this.form.claimtype === "HT001004"){
                        this.addRowfifth();
                        this.addRowfifth();
                        this.addRowfifth();
                        this.addRowfifth();
                        this.tablefifth[0].claimtype = letclaimtypeone;
                        this.tablefifth[1].claimtype = letclaimtypetwo;
                        this.tablefifth[2].claimtype = letclaimtypethree;
                        this.tablefifth[3].claimtype = letclaimtypefour;
                    }
                }
                //国内複合受託 技術開発
                else if(this.form.contracttype === 'HT008006'){
                    this.activeName = 'sixth';

                    if(this.form.claimtype === "HT001001"){
                        this.addRowsixth();
                        this.tablesixth[0].claimtype = letclaimtypeone;
                    }
                    else if(this.form.claimtype === "HT001002"){
                        this.addRowsixth();
                        this.addRowsixth();
                        this.tablesixth[0].claimtype = letclaimtypeone;
                        this.tablesixth[1].claimtype = letclaimtypetwo;
                    }
                    else if(this.form.claimtype === "HT001003"){
                        this.addRowsixth();
                        this.addRowsixth();
                        this.addRowsixth();
                        this.tablesixth[0].claimtype = letclaimtypeone;
                        this.tablesixth[1].claimtype = letclaimtypetwo;
                        this.tablesixth[2].claimtype = letclaimtypethree;

                    }
                    else if(this.form.claimtype === "HT001004"){
                        this.addRowsixth();
                        this.addRowsixth();
                        this.addRowsixth();
                        this.addRowsixth();
                        this.tablesixth[0].claimtype = letclaimtypeone;
                        this.tablesixth[1].claimtype = letclaimtypetwo;
                        this.tablesixth[2].claimtype = letclaimtypethree;
                        this.tablesixth[3].claimtype = letclaimtypefour;
                    }
                }
                //国内受託 役務
                else if(this.form.contracttype === 'HT008007'){
                    this.activeName = 'seventh';

                    if(this.form.claimtype === "HT001001"){
                        this.addRowseventh();
                        this.tableseventh[0].claimtype = letclaimtypeone;
                    }
                    else if(this.form.claimtype === "HT001002"){
                        this.addRowseventh();
                        this.addRowseventh();
                        this.tableseventh[0].claimtype = letclaimtypeone;
                        this.tableseventh[1].claimtype = letclaimtypetwo;
                    }
                    else if(this.form.claimtype === "HT001003"){
                        this.addRowseventh();
                        this.addRowseventh();
                        this.addRowseventh();
                        this.tableseventh[0].claimtype = letclaimtypeone;
                        this.tableseventh[1].claimtype = letclaimtypetwo;
                        this.tableseventh[2].claimtype = letclaimtypethree;

                    }
                    else if(this.form.claimtype === "HT001004"){
                        this.addRowseventh();
                        this.addRowseventh();
                        this.addRowseventh();
                        this.addRowseventh();
                        this.tableseventh[0].claimtype = letclaimtypeone;
                        this.tableseventh[1].claimtype = letclaimtypetwo;
                        this.tableseventh[2].claimtype = letclaimtypethree;
                        this.tableseventh[3].claimtype = letclaimtypefour;
                    }
                }
                //国内複合受託 役務
                else if(this.form.contracttype === 'HT008008'){
                    this.activeName = 'eighth';

                    if(this.form.claimtype === "HT001001"){
                        this.addRoweighth();
                        this.tableeighth[0].claimtype = letclaimtypeone;
                    }
                    else if(this.form.claimtype === "HT001002"){
                        this.addRoweighth();
                        this.addRoweighth();
                        this.tableeighth[0].claimtype = letclaimtypeone;
                        this.tableeighth[1].claimtype = letclaimtypetwo;
                    }
                    else if(this.form.claimtype === "HT001003"){
                        this.addRoweighth();
                        this.addRoweighth();
                        this.addRoweighth();
                        this.tableeighth[0].claimtype = letclaimtypeone;
                        this.tableeighth[1].claimtype = letclaimtypetwo;
                        this.tableeighth[2].claimtype = letclaimtypethree;

                    }
                    else if(this.form.claimtype === "HT001004"){
                        this.addRoweighth();
                        this.addRoweighth();
                        this.addRoweighth();
                        this.addRoweighth();
                        this.tableeighth[0].claimtype = letclaimtypeone;
                        this.tableeighth[1].claimtype = letclaimtypetwo;
                        this.tableeighth[2].claimtype = letclaimtypethree;
                        this.tableeighth[3].claimtype = letclaimtypefour;
                    }
                }
                //販売
                else if(this.form.contracttype === 'HT008009'){
                    this.activeName = 'ninth';

                    if(this.form.claimtype === "HT001001"){
                        this.addRowninth();
                        this.tableninth[0].claimtype = letclaimtypeone;
                    }
                    else if(this.form.claimtype === "HT001002"){
                        this.addRowninth();
                        this.addRowninth();
                        this.tableninth[0].claimtype = letclaimtypeone;
                        this.tableninth[1].claimtype = letclaimtypetwo;
                    }
                    else if(this.form.claimtype === "HT001003"){
                        this.addRowninth();
                        this.addRowninth();
                        this.addRowninth();
                        this.tableninth[0].claimtype = letclaimtypeone;
                        this.tableninth[1].claimtype = letclaimtypetwo;
                        this.tableninth[2].claimtype = letclaimtypethree;

                    }
                    else if(this.form.claimtype === "HT001004"){
                        this.addRowninth();
                        this.addRowninth();
                        this.addRowninth();
                        this.addRowninth();
                        this.tableninth[0].claimtype = letclaimtypeone;
                        this.tableninth[1].claimtype = letclaimtypetwo;
                        this.tableninth[2].claimtype = letclaimtypethree;
                        this.tableninth[3].claimtype = letclaimtypefour;
                    }
                }
            },
            paramsTitle(){
                this.$router.push({
                    name: 'PFANS1026View',
                    params: {
                        title: 10,
                    },
                });
            },
            buttonClick(val) {
                if (val === "application") {
                    this.dialogFormVisible = true;
                    this.show1 = true;
                    this.show2 = false;
                }
                if (val === "cancellation") {
                    this.dialogFormVisible = true;
                    this.show1=false;
                    this.show2=true;
                }
                if (val === "save") {//111
                    let tabledata = [];
                    this.form.maketype = "1";
                    //海外受託 技術開発
                    if(this.form.contracttype === 'HT008001'){
                        tabledata = this.tablefirst;
                    }
                    //海外複合受託 技術開発
                    else if(this.form.contracttype === 'HT008002'){
                        tabledata = this.tablesecond;
                    }
                    //海外受託 役務
                    else if(this.form.contracttype === 'HT008003'){
                        tabledata = this.tablethird;
                    }
                    //海外複合受託 役務
                    else if(this.form.contracttype === 'HT008004'){
                        tabledata = this.tablefourth;
                    }
                    //国内受託 技術開発
                    else if(this.form.contracttype === 'HT008005'){
                        tabledata = this.tablefifth;
                    }
                    //国内複合受託 技術開発
                    else if(this.form.contracttype === 'HT008006'){
                        tabledata = this.tablesixth;
                    }
                    //国内受託 役務
                    else if(this.form.contracttype === 'HT008007'){
                        tabledata = this.tableseventh;
                    }
                    //国内複合受託 役務
                    else if(this.form.contracttype === 'HT008008'){
                        tabledata = this.tableeighth;
                    }
                    //販売
                    else if(this.form.contracttype === 'HT008009'){
                        tabledata = this.tableninth;
                    }
                    for (let i = 0; i < tabledata.length; i++) {
                        tabledata[i].claimdatetime = this.getclaimdatetime(tabledata[i].claimdatetime);
                        tabledata[i].contracttype = this.form.contracttype
                    }
                    this.$refs["refform"].validate(valid => {
                        if (valid) {
                            this.loading = true;
                            if (this.$route.params._id) {
                                this.$store.dispatch('PFANS1026Store/update', tabledata)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false;
                                        Message({
                                            message: this.$t("normal.success_02"),
                                            type: 'success',
                                            duration: 5 * 1000
                                        });
                                        this.paramsTitle();
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
                            else{
                                this.$store.dispatch('PFANS1026Store/insert', tabledata)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false;
                                        Message({
                                            message: this.$t("normal.success_01"),
                                            type: 'success',
                                            duration: 5 * 1000
                                        });
                                        this.paramsTitle();
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
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
