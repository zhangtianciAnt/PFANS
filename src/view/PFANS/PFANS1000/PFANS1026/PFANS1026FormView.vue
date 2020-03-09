<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container"
                         :title="title"
                         @buttonClick="buttonClick"
                         v-loading="loading"
                         :buttonList="buttonList">
      <div slot="customize">
        <el-form :model="form" label-width="8vw" label-position="top" style="padding: 2vw"
                 ref="refform">
          <el-dialog :title="$t('button.application')"  :visible.sync="dialogFormVisible">
            <el-form-item  :label="$t('label.PFANS1024VIEW_NUMBER')" :label-width="formLabelWidth" v-if="display">
              <dicselect
                :code="code"
                :data="form.claimtype"
                :multiple="multiple"
                @change="getnumber"
                style="width: 20vw">
              </dicselect>
            </el-form-item>
            <el-form-item  :label="$t('label.PFANS1024VIEW_ORIGINALCONTRACT')" :label-width="formLabelWidth">
              <el-input v-model="form.contractnumber" style="width: 20vw" :disabled="!disabled1"></el-input>
              <el-checkbox
                v-if="checkeddisplay"
                v-model="checked"
                disabled
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
              <el-button  slot="reference" @click="dialogFormVisible = false" v-if="show2">
                  <span style="margin-right: 86%;" @click="clickDiscard">>{{$t('label.PFANS1026FORMVIEW_ABANDONED')}}
                  </span>
              </el-button>
            </div>
          </el-dialog>
          <el-dialog :visible.sync="dialogBook" width="30%">
            <div  class="dialog-footer" align="center">
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="dialogBook = false" :disabled=disabledCount1>
                  <span style="margin-right: 86%;" @click="clickData(1)">{{$t('label.PFANS1026FORMVIEW_VALUATION')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="dialogBook = false" :disabled=disabledCount2>
                  <span style="margin-right: 86%;" @click="clickData(2)">{{$t('label.PFANS1026FORMVIEW_JUDGMENT')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="dialogBook = false" :disabled=disabledCount3>
                  <span style="margin-right: 86%;" @click="clickData(3)">{{$t('label.PFANS1026FORMVIEW_CONTRACT')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="dialogBook = false" :disabled=disabledCount4>
                  <span style="margin-right: 86%;" @click="clickData(4)">{{$t('label.PFANS1026FORMVIEW_AWARD')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="dialogBook = false" :disabled=disabledCount5>
                  <span style="margin-right: 86%;" @click="clickData(5)">{{$t('label.PFANS1026FORMVIEW_NAPALM')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="dialogBook = false" :disabled=disabledCount6>
                  <span style="margin-right: 86%;" @click="clickData(6)">{{$t('label.PFANS1026FORMVIEW_REQUEST')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-dialog>

          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1026VIEW_OVERSEAS')" name="first" :disabled="activeDisabledArrays[0].disabled">
              <el-table :data="form.tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass1">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content"
                                 type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                      <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.deployment'" :rules='rules.deployment'>
                      <el-input v-model="scope.row.deployment" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.applicationdate'">
                      <el-date-picker :disabled="!disabled3" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.user_id'">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"  width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.contracttype'">
                    <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contracttype">
                    </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"  width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.contractnumber'">
                    <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contractnumber">
                    </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"  width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.entrycondition'">
                    <dicselect
                      :code="code5"
                      :data="scope.row.entrycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getEntrycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"  width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.entrypayment'">
                    <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.entrypayment" style="width: 11rem" ></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="deliverycondition" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                      <dicselect
                        :code="code6"
                        :data="scope.row.deliverycondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDeliverycondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="delivery" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.delivery'">
                      <dicselect
                        :code="code7"
                        :data="scope.row.delivery"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getDelivery"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">
                  <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center"  prop="claimcondition" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.claimcondition'">
                      <dicselect
                        :code="code8"
                        :data="scope.row.claimcondition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaimcondition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center"  prop="claim" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.claim'">
                      <dicselect
                        :code="code7"
                        :data="scope.row.claim"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getClaim"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')" align="center" prop="deliveryfinshdate"  width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.deliveryfinshdate'" :rules='rules.deliveryfinshdate'>
                      <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliveryfinshdate" style="width: 11rem" ></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center" prop="loadingjudge" width="200" :error="errorjudge">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.loadingjudge'" :rules='rules.loadingjudge'>
                      <user :disabled="!disabled" :no="scope.row" :error="errorjudge" :selectType="selectType" :userlist="scope.row.loadingjudge"
                          @getUserids="getJudge" style="width: 10.15rem"></user>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"  width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.currencyposition'" :rules='rules.currencyposition'>
                      <dicselect
                        :code="code9"
                        :data="scope.row.currencyposition"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getCurrencyposition"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                 width="370">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.claimdatetime'" :rules='rules.claimdatetime'>
                      <el-date-picker unlink-panels
                                      class="bigWidth"
                                      :disabled="!disabled"
                                      v-model="scope.row.claimdatetime"
                                      type="daterange"
                                      :end-placeholder="$t('label.enddate')"
                                      :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                      :start-placeholder="$t('label.startdate')"
                      ></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
                            <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
                      <el-form-item :prop="'tabledata.' + scope.$index + '.custojapanese'" :rules='rules.custojapanese'>
                        <div class="">
                          <el-input class="content bg"
                                    :disabled="true"
                                    v-model="scope.row.custojapanese">
                            <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickA(scope.row)"></el-button>
                          </el-input>
                        </div>
                      </el-form-item>
                      <el-dialog :visible.sync="dialogVisibleA"
                                 top="8vh"
                                 append-to-body>
                        <el-table :data="dataA" :row-key="rowid" @row-click="rowClick" max-height="400" ref="roletableA" v-loading='loading'>
                          <el-table-column property="custchinese" :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" width="120"></el-table-column>
                          <el-table-column property="thecompany" :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" width="120"></el-table-column>
                          <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')" width="120"></el-table-column>
                          <el-table-column property="prochinese" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')" width="120"></el-table-column>
                          <el-table-column property="protelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" width="120"></el-table-column>
                        </el-table>
                      </el-dialog>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="custoenglish" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.custoenglish'" :rules='rules.custoenglish'>
                        <el-input :disabled="!disabled" v-model="scope.row.custoenglish">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="custoabbreviation" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.custoabbreviation'" :rules='rules.custoabbreviation'>
                        <el-input :disabled="!disabled" v-model="scope.row.custoabbreviation">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center" prop="custochinese" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.custochinese'" :rules="rules.custochinese">
                        <el-input :disabled="!disabled" v-model="scope.row.custochinese">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" align="center"  prop="businesscode" width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.businesscode'" :rules='rules.businesscode'>
                      <el-input :disabled="!disabled"   style="width: 11rem" v-model="scope.row.businesscode">
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_VARTO')" align="center" prop="varto"  width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.varto'" :rules='rules.varto'>
                      <dicselect
                        :code="code10"
                        :data="scope.row.varto"
                        :no="scope.row"
                        :multiple="multiple"
                        @change="getVarto"
                        style="width: 11rem"
                        :disabled="!disabled">
                      </dicselect>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.placejapanese'" :rules='rules.placejapanese'>
                        <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="placeenglish" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.placeenglish'" :rules='rules.placeenglish'>
                        <el-input :disabled="!disabled" v-model="scope.row.placeenglish">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="placechinese" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.placechinese'" :rules='rules.placechinese'>
                        <el-input :disabled="!disabled" v-model="scope.row.placechinese">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.responjapanese'">
                        <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="responerglish" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.responerglish'" :rules='rules.responerglish'>
                        <el-input :disabled="!disabled" v-model="scope.row.responerglish">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responphone" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.responphone'" :rules='rules.responphone'>
                        <el-input :disabled="!disabled" v-model="scope.row.responphone">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responemail" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.responemail'">
                        <el-input :disabled="!disabled" v-model="scope.row.responemail">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.conjapanese'" :rules='rules.conjapanese'>
                        <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="conchinese" width="200">
                    <template slot-scope="scope">
                      <!--<el-input :disabled="!disabled" v-model="scope.row.conchinese">-->
                      <!--</el-input>-->
                      <el-form-item :prop="'tabledata.' + scope.$index + '.conchinese'" :rules='rules.conchinese'>
                        <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true" v-model="scope.row.conchinese"
                                 @change="changePro">
                        </project>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="conenglish" width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'tabledata.' + scope.$index + '.conenglish'">
                        <el-input :disabled="!disabled" v-model="scope.row.conenglish">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-form-item :prop="'tabledata.' + scope.$index + '.remarks'">
                      <el-input :disabled="!disabled" v-model="scope.row.remarks">
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <!--<el-table-column :label="$t('label.PFANS1026VIEW_DETERMINATION')" align="center">-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_DECIDE')" align="center" prop="decide"  width="200">-->
                    <!--<template slot-scope="scope">-->
                      <!--<dicselect-->
                        <!--:code="code11"-->
                        <!--:data="scope.row.decide"-->
                        <!--:no="scope.row"-->
                        <!--:multiple="multiple"-->
                        <!--@change="getDecide"-->
                        <!--style="width: 11rem"-->
                        <!--:disabled="!disabled">-->
                      <!--</dicselect>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_FIRSTJUDGE')" align="center" prop="firstjudge" width="200" :error="errorfirstjudge">-->
                    <!--<template slot-scope="scope">-->
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorfirstjudge" :selectType="selectType" :userlist="scope.row.firstjudge"-->
                            <!--@getUserids="getFirstjudge" style="width: 10.15rem"></user>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_SECONDJUDGE')" align="center" prop="secondjudge" width="200" :error="errorsecondjudge">-->
                    <!--<template slot-scope="scope">-->
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorsecondjudge" :selectType="selectType" :userlist="scope.row.secondjudge"-->
                            <!--@getUserids="getSecondjudge" style="width: 10.15rem"></user>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_OUTPUTMANAGER')" align="center" prop="outputmanager" width="200" :error="erroroutmanager">-->
                    <!--<template slot-scope="scope">-->
                      <!--<user :disabled="!disabled" :no="scope.row" :error="erroroutmanager" :selectType="selectType" :userlist="scope.row.outputmanager"-->
                            <!--@getUserids="getOutmanager" style="width: 10.15rem"></user>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_MANAGER')" align="center" prop="manager" width="200" :error="errormanager">-->
                    <!--<template slot-scope="scope">-->
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errormanager" :selectType="selectType" :userlist="scope.row.manager"-->
                            <!--@getUserids="getManager" style="width: 10.15rem"></user>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_DECISIONNUMBER')" align="center"  prop="decisionnumber" width="200">-->
                    <!--<template slot-scope="scope">-->
                      <!--<el-input :disabled="!disabled" v-model="scope.row.decisionnumber">-->
                      <!--</el-input>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_OUTNUMBER')" align="center"  prop="outnumber" width="200">-->
                    <!--<template slot-scope="scope">-->
                      <!--<el-input :disabled="!disabled" v-model="scope.row.outnumber">-->
                      <!--</el-input>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_PRODUCTNUMBER')" align="center"  prop="productnumber" width="200">-->
                    <!--<template slot-scope="scope">-->
                      <!--<el-input :disabled="!disabled" v-model="scope.row.productnumber">-->
                      <!--</el-input>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                <!--</el-table-column>-->

                <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
                  <template slot-scope="scope">
                    <el-form-item prop="theme">
                      <div class="">
                        <el-input class="content bg"
                                  :disabled="true"
                                  v-model="scope.row.theme">
                          <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickB(scope.row)"></el-button>
                        </el-input>
                      </div>
                    </el-form-item>
                    <el-dialog :visible.sync="dialogVisibleB"
                               top="8vh"
                               width="30%"
                               append-to-body>
                      <div>
                      <el-select @change="changed" v-model="region">
                        <el-option :label="$t(titleB)" value="1"></el-option>
                        <el-option :label="$t(titleC)" value="2"></el-option>
                      </el-select>
                      <el-table :data="tableB" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="showTable1">
                        <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                        <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                      </el-table>
                      <el-table :data="tableC" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="!showTable1">
                        <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                        <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                      </el-table>
                      </div>
                    </el-dialog>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-form-item>
                      <el-input :disabled="true" v-model="scope.row.state">
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_TECHNICAL')" name="second" :disabled="activeDisabledArrays[1].disabled">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height"  :header-cell-style="getRowClass2">
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
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
                            <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
                      <div class="">
                        <el-input class="content bg"
                                  :disabled="true"
                                  v-model="scope.row.custojapanese">
                          <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickA(scope.row)"></el-button>
                        </el-input>
                      </div>
                      <el-dialog :visible.sync="dialogVisibleA"
                                 top="8vh"
                                 append-to-body>
                        <el-table :data="dataA" :row-key="rowid" @row-click="rowClick" max-height="400" ref="roletableA" v-loading='loading'>
                          <el-table-column property="custchinese" :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" width="120"></el-table-column>
                          <el-table-column property="thecompany" :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" width="120"></el-table-column>
                          <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')" width="120"></el-table-column>
                          <el-table-column property="prochinese" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')" width="120"></el-table-column>
                          <el-table-column property="protelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" width="120"></el-table-column>
                        </el-table>
                      </el-dialog>
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
                      <!--<el-input :disabled="!disabled" v-model="scope.row.conchinese">-->
                      <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true" v-model="scope.row.conchinese"
                               @change="changePro"></project>
                      <!--</el-input>-->
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <!--<el-table-column :label="$t('label.PFANS1026VIEW_DETERMINATION')" align="center">-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_DECIDE')" align="center" prop="decide"  width="200">-->
                    <!--<template slot-scope="scope">-->
                      <!--<dicselect-->
                        <!--:code="code11"-->
                        <!--:data="scope.row.decide"-->
                        <!--:no="scope.row"-->
                        <!--:multiple="multiple"-->
                        <!--@change="getDecide"-->
                        <!--style="width: 11rem"-->
                        <!--:disabled="!disabled">-->
                      <!--</dicselect>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_FIRSTJUDGE')" align="center" prop="firstjudge" width="200" :error="errorfirstjudge">-->
                    <!--<template slot-scope="scope">-->
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorfirstjudge" :selectType="selectType" :userlist="scope.row.firstjudge"-->
                            <!--@getUserids="getFirstjudge" style="width: 10.15rem"></user>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_SECONDJUDGE')" align="center" prop="secondjudge" width="200" :error="errorsecondjudge">-->
                    <!--<template slot-scope="scope">-->
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorsecondjudge" :selectType="selectType" :userlist="scope.row.secondjudge"-->
                            <!--@getUserids="getSecondjudge" style="width: 10.15rem"></user>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_OUTPUTMANAGER')" align="center" prop="outputmanager" width="200" :error="erroroutmanager">-->
                    <!--<template slot-scope="scope">-->
                      <!--<user :disabled="!disabled" :no="scope.row" :error="erroroutmanager" :selectType="selectType" :userlist="scope.row.outputmanager"-->
                            <!--@getUserids="getOutmanager" style="width: 10.15rem"></user>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_MANAGER')" align="center" prop="manager" width="200" :error="errormanager">-->
                    <!--<template slot-scope="scope">-->
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errormanager" :selectType="selectType" :userlist="scope.row.manager"-->
                            <!--@getUserids="getManager" style="width: 10.15rem"></user>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_DECISIONNUMBER')" align="center"  prop="decisionnumber" width="200">-->
                    <!--<template slot-scope="scope">-->
                      <!--<el-input :disabled="!disabled" v-model="scope.row.decisionnumber">-->
                      <!--</el-input>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_OUTNUMBER')" align="center"  prop="outnumber" width="200">-->
                    <!--<template slot-scope="scope">-->
                      <!--<el-input :disabled="!disabled" v-model="scope.row.outnumber">-->
                      <!--</el-input>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column :label="$t('label.PFANS1024VIEW_PRODUCTNUMBER')" align="center"  prop="productnumber" width="200">-->
                    <!--<template slot-scope="scope">-->
                      <!--<el-input :disabled="!disabled" v-model="scope.row.productnumber">-->
                      <!--</el-input>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                <!--</el-table-column>-->
                <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
                  <template slot-scope="scope">
                    <div class="">
                      <el-input class="content bg"
                                :disabled="true"
                                v-model="scope.row.theme">
                        <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickB(scope.row)"></el-button>
                      </el-input>
                    </div>

                    <el-dialog :visible.sync="dialogVisibleB"
                               top="8vh"
                               width="30%"
                               append-to-body>
                      <div>
                        <el-select @change="changed" v-model="region">
                          <el-option :label="$t(titleB)" value="1"></el-option>
                          <el-option :label="$t(titleC)" value="2"></el-option>
                        </el-select>
                        <el-table :data="tableB" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                        <el-table :data="tableC" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="!showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                      </div>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="true" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_OVERSEASTRUST')" name="third" :disabled="activeDisabledArrays[2].disabled">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass3">
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
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
                            <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
                      <div class="">
                        <el-input class="content bg"
                                  :disabled="true"
                                  v-model="scope.row.custojapanese">
                          <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickA(scope.row)"></el-button>
                        </el-input>
                      </div>
                      <el-dialog :visible.sync="dialogVisibleA"
                                 top="8vh"
                                 append-to-body>
                        <el-table :data="dataA" :row-key="rowid" @row-click="rowClick" max-height="400" ref="roletableA" v-loading='loading'>
                          <el-table-column property="custchinese" :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" width="120"></el-table-column>
                          <el-table-column property="thecompany" :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" width="120"></el-table-column>
                          <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')" width="120"></el-table-column>
                          <el-table-column property="prochinese" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')" width="120"></el-table-column>
                          <el-table-column property="protelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" width="120"></el-table-column>
                        </el-table>
                      </el-dialog>
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
                      <!--<el-input :disabled="!disabled" v-model="scope.row.conchinese">-->
                      <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true" v-model="scope.row.conchinese"
                               @change="changePro"></project>
                      <!--</el-input>-->
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
                  <template slot-scope="scope">
                    <div class="">
                      <el-input class="content bg"
                                :disabled="true"
                                v-model="scope.row.theme">
                        <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickB(scope.row)"></el-button>
                      </el-input>
                    </div>

                    <el-dialog :visible.sync="dialogVisibleB"
                               top="8vh"
                               width="30%"
                               append-to-body>
                      <div>
                        <el-select @change="changed" v-model="region">
                          <el-option :label="$t(titleB)" value="1"></el-option>
                          <el-option :label="$t(titleC)" value="2"></el-option>
                        </el-select>
                        <el-table :data="tableB" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                        <el-table :data="tableC" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="!showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                      </div>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="true" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_OVERSEASSERVICE')" name="fourth" :disabled="activeDisabledArrays[3].disabled">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass4">
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
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
                            <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
                      <div class="">
                        <el-input class="content bg"
                                  :disabled="true"
                                  v-model="scope.row.custojapanese">
                          <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickA(scope.row)"></el-button>
                        </el-input>
                      </div>
                      <el-dialog :visible.sync="dialogVisibleA"
                                 top="8vh"
                                 append-to-body>
                        <el-table :data="dataA" :row-key="rowid" @row-click="rowClick" max-height="400" ref="roletableA" v-loading='loading'>
                          <el-table-column property="custchinese" :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" width="120"></el-table-column>
                          <el-table-column property="thecompany" :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" width="120"></el-table-column>
                          <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')" width="120"></el-table-column>
                          <el-table-column property="prochinese" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')" width="120"></el-table-column>
                          <el-table-column property="protelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" width="120"></el-table-column>
                        </el-table>
                      </el-dialog>
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
                      <!--<el-input :disabled="!disabled" v-model="scope.row.conchinese">-->
                      <!--</el-input>-->
                      <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true" v-model="scope.row.conchinese"
                               @change="changePro"></project>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
                  <template slot-scope="scope">
                    <div class="">
                      <el-input class="content bg"
                                :disabled="true"
                                v-model="scope.row.theme">
                        <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickB(scope.row)"></el-button>
                      </el-input>
                    </div>

                    <el-dialog :visible.sync="dialogVisibleB"
                               top="8vh"
                               width="30%"
                               append-to-body>
                      <div>
                        <el-select @change="changed" v-model="region">
                          <el-option :label="$t(titleB)" value="1"></el-option>
                          <el-option :label="$t(titleC)" value="2"></el-option>
                        </el-select>
                        <el-table :data="tableB" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                        <el-table :data="tableC" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="!showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                      </div>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="true" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_DOMESTIC')" name="fifth" :disabled="activeDisabledArrays[4].disabled">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass5">
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
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
                            <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
                      <div class="">
                        <el-input class="content bg"
                                  :disabled="true"
                                  v-model="scope.row.custojapanese">
                          <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickA(scope.row)"></el-button>
                        </el-input>
                      </div>
                      <el-dialog :visible.sync="dialogVisibleA"
                                 top="8vh"
                                 append-to-body>
                        <el-table :data="dataA" :row-key="rowid" @row-click="rowClick" max-height="400" ref="roletableA" v-loading='loading'>
                          <el-table-column property="custchinese" :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" width="120"></el-table-column>
                          <el-table-column property="thecompany" :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" width="120"></el-table-column>
                          <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')" width="120"></el-table-column>
                          <el-table-column property="prochinese" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')" width="120"></el-table-column>
                          <el-table-column property="protelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" width="120"></el-table-column>
                        </el-table>
                      </el-dialog>
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
                      <!--<el-input :disabled="!disabled" v-model="scope.row.conchinese">-->
                      <!--</el-input>-->
                      <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true" v-model="scope.row.conchinese"
                               @change="changePro"></project>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
                  <template slot-scope="scope">
                    <div class="">
                      <el-input class="content bg"
                                :disabled="true"
                                v-model="scope.row.theme">
                        <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickB(scope.row)"></el-button>
                      </el-input>
                    </div>

                    <el-dialog :visible.sync="dialogVisibleB"
                               top="8vh"
                               width="30%"
                               append-to-body>
                      <div>
                        <el-select @change="changed" v-model="region">
                          <el-option :label="$t(titleB)" value="1"></el-option>
                          <el-option :label="$t(titleC)" value="2"></el-option>
                        </el-select>
                        <el-table :data="tableB" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                        <el-table :data="tableC" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="!showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                      </div>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="true" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_DOMESTICTRUST')" name="sixth" :disabled="activeDisabledArrays[5].disabled">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass6">
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
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
                            <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
                      <div class="">
                        <el-input class="content bg"
                                  :disabled="true"
                                  v-model="scope.row.custojapanese">
                          <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickA(scope.row)"></el-button>
                        </el-input>
                      </div>
                      <el-dialog :visible.sync="dialogVisibleA"
                                 top="8vh"
                                 append-to-body>
                        <el-table :data="dataA" :row-key="rowid" @row-click="rowClick" max-height="400" ref="roletableA" v-loading='loading'>
                          <el-table-column property="custchinese" :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" width="120"></el-table-column>
                          <el-table-column property="thecompany" :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" width="120"></el-table-column>
                          <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')" width="120"></el-table-column>
                          <el-table-column property="prochinese" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')" width="120"></el-table-column>
                          <el-table-column property="protelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" width="120"></el-table-column>
                        </el-table>
                      </el-dialog>
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
                      <!--<el-input :disabled="!disabled" v-model="scope.row.conchinese">-->
                      <!--</el-input>-->
                      <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true" v-model="scope.row.conchinese"
                               @change="changePro"></project>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
                  <template slot-scope="scope">
                    <div class="">
                      <el-input class="content bg"
                                :disabled="true"
                                v-model="scope.row.theme">
                        <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickB(scope.row)"></el-button>
                      </el-input>
                    </div>

                    <el-dialog :visible.sync="dialogVisibleB"
                               top="8vh"
                               width="30%"
                               append-to-body>
                      <div>
                        <el-select @change="changed" v-model="region">
                          <el-option :label="$t(titleB)" value="1"></el-option>
                          <el-option :label="$t(titleC)" value="2"></el-option>
                        </el-select>
                        <el-table :data="tableB" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                        <el-table :data="tableC" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="!showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                      </div>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="true" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_DOMESTICSERVICE')" name="seventh" :disabled="activeDisabledArrays[6].disabled">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass7">
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
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
                            <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
                      <div class="">
                        <el-input class="content bg"
                                  :disabled="true"
                                  v-model="scope.row.custojapanese">
                          <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickA(scope.row)"></el-button>
                        </el-input>
                      </div>
                      <el-dialog :visible.sync="dialogVisibleA"
                                 top="8vh"
                                 append-to-body>
                        <el-table :data="dataA" :row-key="rowid" @row-click="rowClick" max-height="400" ref="roletableA" v-loading='loading'>
                          <el-table-column property="custchinese" :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" width="120"></el-table-column>
                          <el-table-column property="thecompany" :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" width="120"></el-table-column>
                          <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')" width="120"></el-table-column>
                          <el-table-column property="prochinese" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')" width="120"></el-table-column>
                          <el-table-column property="protelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" width="120"></el-table-column>
                        </el-table>
                      </el-dialog>
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
                      <!--<el-input :disabled="!disabled" v-model="scope.row.conchinese">-->
                      <!--</el-input>-->
                      <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true" v-model="scope.row.conchinese"
                               @change="changePro"></project>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS2026FORMVIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
                  <template slot-scope="scope">
                    <div class="">
                      <el-input class="content bg"
                                :disabled="true"
                                v-model="scope.row.theme">
                        <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickB(scope.row)"></el-button>
                      </el-input>
                    </div>

                    <el-dialog :visible.sync="dialogVisibleB"
                               top="8vh"
                               width="30%"
                               append-to-body>
                      <div>
                        <el-select @change="changed" v-model="region">
                          <el-option :label="$t(titleB)" value="1"></el-option>
                          <el-option :label="$t(titleC)" value="2"></el-option>
                        </el-select>
                        <el-table :data="tableB" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                        <el-table :data="tableC" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="!showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                      </div>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="true" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_TRUST')" name="eighth" :disabled="activeDisabledArrays[7].disabled">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass8">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center" prop="loadingjudge" width="200" :error="errorjudge">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorjudge" :selectType="selectType" :userlist="scope.row.loadingjudge"
                          @getUserids="getJudge" style="width: 10.15rem"></user>
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
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
                            <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
                      <div class="">
                        <el-input class="content bg"
                                  :disabled="true"
                                  v-model="scope.row.custojapanese">
                          <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickA(scope.row)"></el-button>
                        </el-input>
                      </div>
                      <el-dialog :visible.sync="dialogVisibleA"
                                 top="8vh"
                                 append-to-body>
                        <el-table :data="dataA" :row-key="rowid" @row-click="rowClick" max-height="400" ref="roletableA" v-loading='loading'>
                          <el-table-column property="custchinese" :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" width="120"></el-table-column>
                          <el-table-column property="thecompany" :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" width="120"></el-table-column>
                          <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')" width="120"></el-table-column>
                          <el-table-column property="prochinese" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')" width="120"></el-table-column>
                          <el-table-column property="protelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" width="120"></el-table-column>
                        </el-table>
                      </el-dialog>
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
                      <!--<el-input :disabled="!disabled" v-model="scope.row.conchinese">-->
                      <!--</el-input>-->
                      <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true" v-model="scope.row.conchinese"
                               @change="changePro"></project>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
                  <template slot-scope="scope">
                    <div class="">
                      <el-input class="content bg"
                                :disabled="true"
                                v-model="scope.row.theme">
                        <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickB(scope.row)"></el-button>
                      </el-input>
                    </div>

                    <el-dialog :visible.sync="dialogVisibleB"
                               top="8vh"
                               width="30%"
                               append-to-body>
                      <div>
                        <el-select @change="changed" v-model="region">
                          <el-option :label="$t(titleB)" value="1"></el-option>
                          <el-option :label="$t(titleC)" value="2"></el-option>
                        </el-select>
                        <el-table :data="tableB" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                        <el-table :data="tableC" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="!showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                      </div>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="true" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1026VIEW_SELL')" name="ninth" :disabled="activeDisabledArrays[8].disabled">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass9">
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
                      <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
                            <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
                      <div class="">
                        <el-input class="content bg"
                                  :disabled="true"
                                  v-model="scope.row.custojapanese">
                          <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickA(scope.row)"></el-button>
                        </el-input>
                      </div>
                      <el-dialog :visible.sync="dialogVisibleA"
                                 top="8vh"
                                 append-to-body>
                        <el-table :data="dataA" :row-key="rowid" @row-click="rowClick" max-height="400" ref="roletableA" v-loading='loading'>
                          <el-table-column property="custchinese" :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" width="120"></el-table-column>
                          <el-table-column property="thecompany" :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" width="120"></el-table-column>
                          <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')" width="120"></el-table-column>
                          <el-table-column property="prochinese" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')" width="120"></el-table-column>
                          <el-table-column property="protelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" width="120"></el-table-column>
                        </el-table>
                      </el-dialog>
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
                      <!--<el-input :disabled="!disabled" v-model="scope.row.conchinese">-->
                      <!--</el-input>-->
                      <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true" v-model="scope.row.conchinese"
                               @change="changePro"></project>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center"  prop="remarks" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
                  <template slot-scope="scope">
                    <div class="">
                      <el-input class="content bg"
                                :disabled="true"
                                v-model="scope.row.theme">
                        <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search" @click="handleClickB(scope.row)"></el-button>
                      </el-input>
                    </div>

                    <el-dialog :visible.sync="dialogVisibleB"
                               top="8vh"
                               width="30%"
                               append-to-body>
                      <div>
                        <el-select @change="changed" v-model="region">
                          <el-option :label="$t(titleB)" value="1"></el-option>
                          <el-option :label="$t(titleC)" value="2"></el-option>
                        </el-select>
                        <el-table :data="tableB" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                        <el-table :data="tableC" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA" width="100%" v-loading='loading' v-show="!showTable1">
                          <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')" width="180"></el-table-column>
                          <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')" width="180"></el-table-column>
                        </el-table>
                      </div>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="true" v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>

          <el-table :data="form.tableclaimtype" stripe header-cell-class-name="sub_bg_color_grey height"
                    :header-cell-style="getRowClass1" style="padding-top: 2vw">
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="130">
              <template slot-scope="scope">
              <el-form-item>
                <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
                </el-input>
              </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"  width="170">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.deliverydate'" :rules='rules.deliverydate'>
                  <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliverydate" style="width: 9rem" ></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"  width="170">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.completiondate'" :rules='rules.completiondate'>
                  <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.completiondate" style="width: 9rem" ></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="170">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.claimdate'" :rules='rules.claimdate'>
                  <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.claimdate" style="width: 9rem" ></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="170">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.supportdate'" :rules='rules.supportdate'>
                  <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportdate" style="width: 9rem" ></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="190">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.claimamount'" :rules='rules.claimamount'>
                  <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>

        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import EasyNormalTable from "@/components/EasyNormalTable";
    import { Message } from 'element-ui'
    import dicselect from "../../../components/dicselect";
    import {getOrgInfo,getDictionaryInfo,getUserInfo} from '@/utils/customize';
    import user from '../../../components/user.vue';
    import org from "../../../components/org";
    import moment from "moment";
    import project from '../../../components/project';
    import ElInput from "../../../../../node_modules/element-ui/packages/input/src/input.vue";
    import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";

    export default {
        name: 'PFANS1026View',
        components: {
          ElFormItem,
          ElInput,
          EasyNormalContainer,
            dicselect,
            user,
            org,
          EasyNormalTable,
          project
        },
        data() {
          var validateDeployment = (rule, value, callback) => {
            //没数据，先不验证
//            if (value === '') {
//              callback(new Error('请输入开发部署'));
//            } else {
              callback();
//            }
          };
          var validateClaimdatetime = (rule, value, callback) => {
            if ( Array.isArray(value)) {
              if ( value.length ==0 ) {
                callback(new Error('请输入开发请求期间'));
                return
              }
              value.map(function(item){
                if ( item === '' ) {
                  callback(new Error('请输入开发请求期间'));
                  return
                }
              });
              callback();
            } else {
              if (value === '') {
                callback(new Error('请输入开发请求期间'));
              } else {
                callback();
              }
            }

          };
          var validateCurrencyposition = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入通货单位'));
            } else {
              callback();
            }
          };
          //没数据先不验证
          var validateLoadingjudge = (rule, value, callback) => {
//            if (value === '') {
//              callback(new Error('请输入出荷判定实施者'));
//            } else {
              callback();
//            }
          };
          var validateDeliveryfinshdate = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入纳品作成日'));
            } else {
              callback();
            }
          };
          var validateCustojapanese = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入取引先会社名和文'));
            } else {
              callback();
            }
          };
          var validateCustoenglish = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入取引先会社名英文'));
            } else {
              callback();
            }
          };
          var validateCustoabbreviation = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入取引先会社名略名'));
            } else {
              callback();
            }
          };
          var validateCustochinese = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入取引先会社名中文名'));
            } else {
              callback();
            }
          };
          var validateBusinesscode = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入事业场code'));
            } else {
              callback();
            }
          };
          var validateVarto = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入to'));
            } else {
              callback();
            }
          };
          var validatePlacejapanese = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入住所日文'));
            } else {
              callback();
            }
          };
          var validatePlaceenglish = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入住所英文'));
            } else {
              callback();
            }
          };
          var validatePlacechinese = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入住所中文'));
            } else {
              callback();
            }
          };

          var validateResponerglish = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入担当者英文'));
            } else {
              callback();
            }
          };
          var validateResponphone = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入担当者电话'));
            } else {
              callback();
            }
          };
          var validateConjapanese = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入项目和文'));
            } else {
              callback();
            }
          };
          var validateConenglish = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入项目英文'));
            } else {
              callback();
            }
          };
          var validateConchinese = (rule, value, callback) => {
            if (value === '' && value != null && value != undefined) {
              callback(new Error('请输入项目中文'));
            } else {
              callback();
            }
          };
          var validateDeliverydate = (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入纳品预定日'));
            } else {
              callback();
            }
          };
          var validateCompletiondate = (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入检收完了日'));
            } else {
              callback();
            }
          };
          var validateClaimdate = (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入请求日'));
            } else {
              callback();
            }
          };
          var validateSupportdate = (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入支付日'));
            } else {
              callback();
            }
          };
          var validateClaimamount = (rule, value, callback) => {
            if (value === '' && value != null && value != undefined) {
              callback(new Error('请输入请求金额'));
            } else {
              callback();
            }
          };



            return {
              makeintoBaseInfo:{},
              activeDisabledArrays: [
                {disabled: true},
                {disabled: true},
                {disabled: true},
                {disabled: true},
                {disabled: true},
                {disabled: true},
                {disabled: true},
                {disabled: true},
                {disabled: true}
              ],
              disabledCount: {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
              },
              disabledCount1: false,
              disabledCount2: false,
              disabledCount3: false,
              disabledCount4: false,
              disabledCount5: false,
              disabledCount6: false,
              disabledCount7: false,
                existFlg: true,
                checked: false,
                checkeddisplay: true,
                index: "",
                dialogFormVisible: false,
                dialogBook: false,
                display:true,
                grouporglist: '',
                groupinfo:["","","",""],
                errorgroup: '',
                maketype: '',
                letcontractnumber: '',
                contractnumbercount: '',
                letcontracttype: '',
                loading: false,
                selectType: "Single",
                title: "title.PFANS1026VIEW",
                contractapplication: {},
                activeName: '',
                activeClaimtype: '',
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
                ruleSet: {
                  'save': ['contractnumber'],
                  'makeinto': ['contractnumber'],
                  '1': ['custojapanese','custochinese','placejapanese','placechinese','deployment','conjapanese','conchinese','claimdatetime','currencyposition','claimamount','loadingjudge'],
                  '2': ['custojapanese','deployment','conjapanese','claimdatetime','varto'],
                  '3': ['custojapanese','custochinese','placejapanese','placechinese','deployment','conjapanese','conchinese','claimdatetime','currencyposition','claimamount','deliverydate','completiondate','claimdate','supportdate'],
                  '4': ['custojapanese','custochinese','placejapanese','placechinese','deployment','conjapanese','conchinese','claimdatetime','currencyposition','claimamount'],
                  '5': ['custojapanese','custoenglish','custoabbreviation','deployment','conjapanese','conchinese','claimdatetime','currencyposition','claimamount','deliveryfinshdate','deliverydate','completiondate','claimdate','supportdate','varto'],
                  '6': ['custochinese','businesscode','conchinese','claimdatetime','currencyposition','claimamount','deliveryfinshdate'],
                  '7': ['custojapanese','custochinese','placejapanese','placechinese','deployment','conjapanese','conchinese','claimdatetime','currencyposition','claimamount','deliverydate'],
                  '61': ['custoenglish','conjapanese','businesscode','placeenglish','responerglish','claimdatetime','currencyposition','claimamount','deliveryfinshdate','placechinese','responphone'],
                  '62': ['custoenglish','conjapanese','businesscode','placeenglish','responerglish','claimdatetime','currencyposition','claimamount','deliveryfinshdate','placechinese','responphone'],
                },
                rules: {
                  deployment: [
                    { validator: validateDeployment }
                  ],
                  claimdatetime: [
                    { validator: validateClaimdatetime }
                  ],
                  currencyposition: [
                    { validator: validateCurrencyposition }
                  ],
                  loadingjudge: [
                    { validator: validateLoadingjudge }
                  ],
                  deliveryfinshdate: [
                    { validator: validateDeliveryfinshdate }
                  ],
                  custojapanese: [
                    { validator: validateCustojapanese }
                  ],
                  custoenglish: [
                    { validator: validateCustoenglish }
                  ],
                  custoabbreviation: [
                    { validator: validateCustoabbreviation }
                  ],
                  custochinese: [
                    { validator: validateCustochinese }
                  ],
                  businesscode: [
                    { validator: validateBusinesscode }
                  ],
                  varto: [
                    { validator: validateVarto }
                  ],
                  placejapanese: [
                    { validator: validatePlacejapanese }
                  ],
                  placeenglish: [
                    { validator: validatePlaceenglish }
                  ],
                  placechinese: [
                    { validator: validatePlacechinese }
                  ],
                  responerglish: [
                    { validator: validateResponerglish }
                  ],
                  responphone: [
                    { validator: validateResponphone }
                  ],
                  conjapanese: [
                    { validator: validateConjapanese }
                  ],
                  conenglish: [
                    { validator: validateConenglish }
                  ],
                  conchinese: [
                    { validator: validateConchinese }
                  ],
                  deliverydate: [
                    { validator: validateDeliverydate }
                  ],
                  completiondate: [
                    { validator: validateCompletiondate }
                  ],
                  claimdate: [
                    { validator: validateClaimdate }
                  ],
                  supportdate: [
                    { validator: validateSupportdate }
                  ],
                  claimamount: [
                    { validator: validateClaimamount }
                  ],


                },
                buttonList:[
                    {
                        key: 'application',
                        name: 'button.application',
                        disabled: false,
                    },
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
                ],
                form:{
                  tabledata: [],
                  tabledata2:undefined,
                    contractnumber: '',
                    claimtype: 'HT001001',
                    contracttype: '',
                    applicationdate: '',
                    entrycondition: '',
                    group_id: '',
                    maketype: '',
                    deployment: '',
                  claimdatetime: [],
                  currencyposition: '',
                  loadingjudge: '',
                  deliveryfinshdate: '',
                  custojapanese:'',
                  custoenglish:'',
                  custoabbreviation:'',
                  custochinese:'',
                  businesscode:'',
                  varto:'',
                  placejapanese:'',
                  placeenglish:'',
                  placechinese:'',
                  responerglish:'',
                  responphone:'',
                  conjapanese:'',
                  conenglish:'',
                  conchinese:'',
                  deliverydate:'',
                  completiondate:'',
                  claimdate:'',
                  supportdate:'',
                  claimamount:'',
                  tableclaimtype: []
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
              tableB:[],
              tableC:[],
              showTable1: true,
              dialogVisibleB: false,
              titleA: "title.PFANS6002VIEW",
              dialogVisibleA: false,
              rowid: '',
              rowA: 'customerinfor_id',
              dataA: [],
              recordData: [],
              recordDataB: [],
              region: "1",
              titleB:"menu.PFANS1040",
              titleC: "menu.PFANS1041",
              projectResult:[],
            };
        },
        mounted() {
            this.contractnumbercount = this.$route.params.contractnumbercount;
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1026Store/get',{'contractnumber': this.$route.params._id})
                    .then(response => {
                        let contractapplication = response.contractapplication;
                        let contractnumbercount = response.contractnumbercount;
                        if (contractapplication.length > 0) {
                            for (let i = 0; i < contractapplication.length; i++) {
                                this.maketype = contractapplication[i].maketype;
                                //契約書番号
                                this.letcontractnumber = contractapplication[i].contractnumber;
                                //契約種類
                                this.form.contracttype = contractapplication[i].contracttype;
                                //事業年度
                                this.form.applicationdate = contractapplication[i].careeryear;
                                //上下期
                                this.form.entrycondition = contractapplication[i].periods;
                                //グループ
                                this.getGroupId(contractapplication[i].group_id);
                                //契約種類
                                let letabbreviation = getDictionaryInfo(contractapplication[i].contracttype);
                                if (letabbreviation != null) {
                                    contractapplication[i].contracttype = letabbreviation.value1;
                                }
                                if (contractapplication[i].claimdatetime !== '' && contractapplication[i].claimdatetime !== null) {
                                    let claimdatetime = contractapplication[i].claimdatetime;
                                    let claimdatetim = claimdatetime.slice(0, 10);
                                    let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 10);
                                    contractapplication[i].claimdatetime = [claimdatetim, claimdatetime1];
                                }
                                if ( contractapplication[i].conchinese !=null && contractapplication[i].conchinese !='') {
                                  let conchinese = contractapplication[i].conchinese;
                                  if ( typeof conchinese == "string" ) {
                                    conchinese = conchinese.split(",");
                                    contractapplication[i].conchinese = conchinese;
                                  }
                                }
                                console.log(contractapplication[i]);
                                let o = Object.assign({}, contractapplication[i]);
                                this.form.tabledata.push(o);
//                                this.tabledata.push(o);
                                if (this.maketype === '1') {
                                    this.activeName = 'first';
                                    this.activeDisabledArrays[0] = false;
                                } else if (this.maketype === '2') {
                                    this.activeName = 'second';
                                  this.activeDisabledArrays[1] = false;
                                } else if (this.maketype === '3') {
                                    this.activeName = 'third';
                                  this.activeDisabledArrays[2] = false;
                                } else if (this.maketype === '4') {
                                    this.activeName = 'fourth';
                                  this.activeDisabledArrays[3] = false;
                                } else if (this.maketype === '5') {
                                    this.activeName = 'fifth';
                                  this.activeDisabledArrays[4] = false;
                                } else if (this.maketype === '6') {
                                    this.activeName = 'sixth';
                                  this.activeDisabledArrays[5] = false;
                                } else if (this.maketype === '7') {
                                    this.activeName = 'seventh';
                                  this.activeDisabledArrays[6] = false;
                                } else if (this.maketype === '8') {
                                    this.activeName = 'eighth';
                                  this.activeDisabledArrays[7] = false;
                                } else if (this.maketype === '9') {
                                    this.activeName = 'ninth';
                                  this.activeDisabledArrays[8] = false;
                                }
                            }
                        }
                        if (contractnumbercount.length > 0) {
                          this.form.tableclaimtype = contractnumbercount;
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
                for(var p=0; p<9; p++){
                  this.activeDisabledArrays[p] = false;
                }
            }
          //get customer
          this.getcustomerinfor();
          //テーマ
          this.getdata("2");
          this.getdata("4");
          //get project
          this.getProjectList();
        },
        created() {
            this.disabled = this.$route.params.disabled;
            if (!this.disabled || this.$route.params.state === this.$t("label.PFANS8008FORMVIEW_INVALID")) {
                this.buttonList = [];
            }
//            if(this.$route.params._id === ''){
//              this.buttonList.splice(3, 1);
//            }
        },
        methods: {
          getProjectList() {
            this.loading = true;
            this.$store
              .dispatch('PFANS5009Store/getSiteList', {})
              .then(response => {
                this.projectResult = response.filter(value => {
                  return value.status === "4";
                });
                this.loading = false;
              })
              .catch(error => {
                this.loading = false;
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000
                })
              })
          },
          changePro(val, row) {
            let nameJA = "";
            for(let i=0;i<val.length;i++) {
              let result = this.projectResult.filter(value => {
                return value.companyprojects_id === val[i];
              });
              nameJA += result[0].project_namejp + ",";
            }
            row.conchinese = val;
            row.conjapanese = nameJA.substring(0, nameJA.length -1);
          },
          changed() {
            if (this.region === '2') {
              this.showTable1 = false;
            } else if (this.region === '1') {
              this.showTable1 = true;
            }
          },
          handleClickA(row){
            this.recordData = row;
            this.dialogVisibleA = true;
          },
          rowClick(row) {
            this.loading = true;
            this.recordData.custojapanese = row.custjapanese;
            this.recordData.custoenglish = row.custenglish;
            this.recordData.custoabbreviation = row.abbreviation;
            this.recordData.custochinese = row.custchinese;

            this.recordData.placejapanese = row.addjapanese;
            this.recordData.placeenglish = row.addenglish;
            this.recordData.placechinese = row.addchinese;

            this.recordData.responjapanese = row.projapanese;
            this.recordData.responerglish = row.proenglish;
            this.recordData.responphone = row.protelephone;
            this.recordData.responemail = row.protemail;
            this.dialogVisibleA = false;
            this.loading = false;
          },
          handleClickB(row){
            this.recordDataB = row;
            this.dialogVisibleB = true;
          },
          rowClickB(row){
            this.recordDataB.theme = row.theme;
            this.recordDataB.temaid = row.contractthemeid;
            this.dialogVisibleB = false;
          },
          getdata(type){
            let datainfo = {};
            var myDate = new Date();
            var tYear = myDate.getFullYear();
            datainfo = {'type': type,'years': tYear,'status': '4'};

            this.loading = true;
            this.$store
              .dispatch('PFANS1040Store/get', datainfo)
              .then(response => {
                if (response.length > 0) {
                  if(type === "2") {
                    this.tableBc = [];
                    let months = response[0].months;
                    for (let j = 0; j < response.length; j++) {
                      if(months === response[j].months){
                        this.tableBc.push(response[j]);
                      }
                    }
                    this.tableB = this.tableBc;
                  }else {
                    this.tableBc = [];
                    let months = response[0].months;
                    for (let j = 0; j < response.length; j++) {
                      if(months === response[j].months){
                        this.tableBc.push(response[j]);
                      }
                    }
                    this.tableC = this.tableBc;
                  }
                }
                this.dialogVisibleB = false;
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
          getcustomerinfor() {
            this.loading = true;
            this.$store
              .dispatch('PFANS6002Store/getcustomerinfor')
              .then(response => {
                for (let j = 0; j < response.length; j++) {
                  if (response[j].custchinese !== null && response[j].custchinese !== "") {
                    let custchinese = getUserInfo(response[j].custchinese);
                    if (custchinese) {
                      response[j].custchinese = user.userinfo.customername;
                    }
                  }
                  if (response[j].liableperson !== null && response[j].liableperson !== "") {
                    let liableperson = getUserInfo(response[j].liableperson);
                    if (liableperson) {
                      response[j].liableperson = user.userinfo.customername;
                    }
                  }
                  if (response[j].prochinese !== null && response[j].prochinese !== "") {
                    let prochinese = getUserInfo(response[j].prochinese);
                    if (prochinese) {
                      response[j].prochinese = user.userinfo.customername;
                    }
                  }
                  if (response[j].protelephone !== null && response[j].protelephone !== "") {
                    let protelephone = getUserInfo(response[j].protelephone);
                    if (protelephone) {
                      response[j].protelephone = user.userinfo.customername;
                    }
                  }
                  if (response[j].commontperson !== null && response[j].commontperson !== "") {
                    let commontperson = getUserInfo(response[j].commontperson);
                    if (commontperson) {
                      response[j].commontperson = user.userinfo.customername;
                    }
                  }
                  if (response[j].comtelephone !== null && response[j].comtelephone !== "") {
                    let comtelephone = getUserInfo(response[j].comtelephone);
                    if (comtelephone) {
                      response[j].comtelephone = user.userinfo.customername;
                    }
                  }
                  if (response[j].addchinese !== null && response[j].addchinese !== "") {
                    let addchinese = getUserInfo(response[j].addchinese);
                    if (addchinese) {
                      response[j].addchinese = user.userinfo.customername;
                    }
                  }
                  if (response[j].perscale !== null && response[j].perscale !== "") {
                    let perscale = getDictionaryInfo(response[j].perscale);
                    if (perscale != null) {
                      response[j].perscale = perscale.value1;
                    }
                  }
                }
                this.dataA = response;
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
          },
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
                this.checked = val;
                if(val === true){
                    this.form.contractnumber = this.letcontractnumber
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
              if(claimdatetime != null){
                  if(claimdatetime.length > 0){
                    return moment(claimdatetime[0]).format('YYYY-MM-DD') + " ~ " + moment(claimdatetime[1]).format('YYYY-MM-DD');
                  }
                  else{
                    return '';
                  }
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
            addRowdata(isClone) {
              //纳品进步状况=纳品作成完了，如果生成觉书，要在觉书那条把原来的copy过来。
              if ( isClone ) {
                let olddata = JSON.parse(JSON.stringify(this.form.tabledata[0]));//this.form.contractnumber
                olddata.contractnumber = this.letcontractnumber;
                olddata.state = this.$t("label.PFANS8008FORMVIEW_EFFECTIVE");
                this.form.tabledata.push(olddata);
//                this.tabledata.push(olddata);
              } else {
                let o = {
                  contractapplication_id: '',
                  careeryear: this.form.applicationdate,
                  periods: this.form.entrycondition,
                  group_id: this.groupinfo[0],
                  department: this.groupinfo[1],
                  orgnumber: this.groupinfo[2],
                  deployment: this.groupinfo[3],
                  applicationdate:  moment(new Date()).format("YYYY-MM-DD"),
                  user_id: this.$store.getters.userinfo.userid,
                  contracttype: this.contracttype,
                  contractnumber: this.letcontractnumber,
                  entrycondition: 'HT004002',
                  entrypayment: '',
                  deliverycondition: '',
                  delivery: '',
                  claimcondition: '',
                  claim: '',
                  deliveryfinshdate: '',
                  loadingjudge: '',
                  currencyposition: '',
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
                  state: this.$t("label.PFANS8008FORMVIEW_EFFECTIVE"),
                  type: '1',
                  maketype: '',
                  theme: '',
                  temaid: ''
                };
                this.form.tabledata.push(o);
//                this.tabledata.push(o);
              }

            },
            addRowclaimtype() {
              this.form.tableclaimtype.push({
                contractnumbercount_id: '',
                contractnumber: this.letcontractnumber,
                claimtype:'',
                deliverydate:'',
                completiondate:'',
                claimdate: moment(new Date()).format("YYYY-MM-DD"),
                claimamount:'',
                supportdate:'',
                type: '1',
                maketype: '',
                rowindex:'',
              });
            },
            //契約番号做成
            click() {
                //請求方式
                let letclaimtype = '';
                let letbook = '';
                //覚書
                if(this.checked){
                    letclaimtype = this.$t("label.PFANS1024VIEW_LETTERS");
                    let letcontractnumber = this.form.contractnumber.split("-");
                    if(letcontractnumber.length > 1){
                        letbook = '-' + this.$t("label.PFANS1024VIEW_LETTERS").substring(0,1) + (parseInt(letcontractnumber[1].substring(1,letcontractnumber[1].length)) + 1).toString();
                    }
                    else{
                        letbook = '-' + this.$t("label.PFANS1024VIEW_LETTERS").substring(0,1) + '1';
                    }
                    this.contractnumbercount = this.form.contractnumber.substr(10,4).replace("0","").replace("0","").replace("0","");
                }
                let letclaimtypeone = letclaimtype + this.$t("label.PFANS1026FORMVIEW_ONE");
                let letclaimtypetwo = letclaimtype + this.$t("label.PFANS1026FORMVIEW_TWO");
                let letclaimtypethree = letclaimtype + this.$t("label.PFANS1026FORMVIEW_THREE");
                let letclaimtypefour = letclaimtype + this.$t("label.PFANS1026FORMVIEW_FOUR");
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
                //契約書番号(契約種類 + 事業年度 + 上下期 + 社内組織番号)
                //通し番号
                let number = '0001';
                if(this.contractnumbercount.toString().length === 1){
                    number = '000' + this.contractnumbercount
                }
                else if(this.contractnumbercount.toString().length === 2){
                    number = '00' + this.contractnumbercount
                }
                else if(this.contractnumbercount.toString().length === 3){
                    number = '0' + this.contractnumbercount
                }
                if(this.checked){
                    this.letcontractnumber = this.form.contractnumber.split("-")[0] + letbook;
                }
                else{
                    this.letcontractnumber = abbreviation + applicationdate + entrycondition + this.groupinfo[2] + number + letbook;
                }
                //纳品进步状况=纳品作成完了，如果生成觉书，要在觉书那条把原来的copy过来。
                let isClone = false;
                if(this.checked){
                  for (let i = 0; i < this.form.tabledata.length; i++) {
                    this.form.tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_INVALID");
                    if (this.form.tabledata[0].deliverycondition == 'HT009002') {
                      isClone = true;
                    }
                  }
                }

                this.addRowdata(isClone);
                this.form.tableclaimtype = [];
                if(this.form.claimtype === "HT001001"){
                  this.addRowclaimtype();
                  this.form.tableclaimtype[0].claimtype = letclaimtypeone;
                }
                else if(this.form.claimtype === "HT001002"){
                  this.addRowclaimtype();
                  this.addRowclaimtype();
                  this.form.tableclaimtype[0].claimtype = letclaimtypeone;
                  this.form.tableclaimtype[1].claimtype = letclaimtypetwo;
                }
                else if(this.form.claimtype === "HT001003"){
                  this.addRowclaimtype();
                  this.addRowclaimtype();
                  this.addRowclaimtype();
                  this.form.tableclaimtype[0].claimtype = letclaimtypeone;
                  this.form.tableclaimtype[1].claimtype = letclaimtypetwo;
                  this.form.tableclaimtype[2].claimtype = letclaimtypethree;

                }
                else if(this.form.claimtype === "HT001004"){
                  this.addRowclaimtype();
                  this.addRowclaimtype();
                  this.addRowclaimtype();
                  this.addRowclaimtype();
                  this.form.tableclaimtype[0].claimtype = letclaimtypeone;
                  this.form.tableclaimtype[1].claimtype = letclaimtypetwo;
                  this.form.tableclaimtype[2].claimtype = letclaimtypethree;
                  this.form.tableclaimtype[3].claimtype = letclaimtypefour;
                }
                //海外受託 技術開発
                if(this.form.contracttype === 'HT008001'){
                  this.activeName = 'first';
                }
                //海外複合受託 技術開発
                else if(this.form.contracttype === 'HT008002'){
                  this.activeName = 'second';
                }
                //海外受託 役務
                else if(this.form.contracttype === 'HT008003'){
                  this.activeName = 'third';
                }
                //海外複合受託 役務
                else if(this.form.contracttype === 'HT008004'){
                  this.activeName = 'fourth';
                }
                //国内受託 技術開発
                else if(this.form.contracttype === 'HT008005'){
                  this.activeName = 'fifth';
                }
                //国内複合受託 技術開発
                else if(this.form.contracttype === 'HT008006'){
                  this.activeName = 'sixth';
                }
                //国内受託 役務
                else if(this.form.contracttype === 'HT008007'){
                  this.activeName = 'seventh';
                }
                //国内複合受託 役務
                else if(this.form.contracttype === 'HT008008'){
                  this.activeName = 'eighth';
                }
                //販売
                else if(this.form.contracttype === 'HT008009'){
                  this.activeName = 'ninth';
                }
                this.getChecked(false);
            },
            //契約番号廃棄
            clickDiscard(){
                if(!this.show1){
                    for (let i = 0; i < this.form.tabledata.length; i++) {
                      this.form.tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_INVALID")
                    }
                }
            },
            //存在check
            existCheck(contractNumber, index) {
              this.loading = true;
              this.$store.dispatch('PFANS1026Store/existCheck', {contractNumber:contractNumber})
                .then(response => {
                  let s = "count" + index;
                  if(response[s] > 0) {
                    Message({
                      message: "请先删除",
                      type: 'success',
                      duration: 5 * 1000
                    });
                  }else {
                    var tabledata = {'contractnumber': contractNumber,'rowindex': index};
                    //first save contractapplication
                    this.handleSaveContract(index,this.makeintoBaseInfo,tabledata);

//                    this.$refs["refform"].validate(valid => {

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
            },
            //書類作成
            clickData(val){
                this.existCheck(this.letcontractnumber,val);
            },
            paramsTitle(){
                this.$router.push({
                    name: 'PFANS1026View',
                    params: {
                        title: 10,
                    },
                });
            },
            //保存
            handleSave(value){
              let baseInfo = {};
              baseInfo.contractapplication = [];
              baseInfo.contractnumbercount = [];
              for (let i = 0; i < this.form.tabledata.length; i++) {
                let o = {};
                Object.assign(o, this.form.tabledata[i]);
                o.claimdatetime = this.getclaimdatetime(this.form.tabledata[i].claimdatetime);
                this.form.tabledata[i].contracttype = this.form.contracttype;
                o.contracttype = this.form.tabledata[i].contracttype;
                //海外受託 技術開発
                if(this.form.contracttype === 'HT008001'){
                  o.maketype = '1';
                }
                //海外複合受託 技術開発
                else if(this.form.contracttype === 'HT008002'){
                  o.maketype = '2';
                }
                //海外受託 役務
                else if(this.form.contracttype === 'HT008003'){
                  o.maketype = '3';
                }
                //海外複合受託 役務
                else if(this.form.contracttype === 'HT008004'){
                  o.maketype = '4';
                }
                //国内受託 技術開発
                else if(this.form.contracttype === 'HT008005'){
                  o.maketype = '5';
                }
                //国内複合受託 技術開発
                else if(this.form.contracttype === 'HT008006'){
                  o.maketype = '6';
                }
                //国内受託 役務
                else if(this.form.contracttype === 'HT008007'){
                  o.maketype = '7';
                }
                //国内複合受託 役務
                else if(this.form.contracttype === 'HT008008'){
                  o.maketype = '8';
                }
                //販売
                else if(this.form.contracttype === 'HT008009'){
                  o.maketype = '9';
                }
                if(this.form.tabledata[i].state === this.$t("label.PFANS8008FORMVIEW_EFFECTIVE")){
                  let letclaimamount = 0;
                  for (let j = 0; j < this.form.tableclaimtype.length; j++) {
                    letclaimamount = letclaimamount + Number(this.form.tableclaimtype[j].claimamount);

                    //请求番号
                    let claimnumber = this.form.tabledata[i].contractnumber + '-' + (j + 1);
                    this.form.tableclaimtype[j].claimnumber = claimnumber;
                  }
                  o.claimamount = letclaimamount;
                }
                if ( Array.isArray(this.form.tabledata[i].conchinese) ) {
                  o.conchinese = this.form.tabledata[i].conchinese.join(",");
                }
                baseInfo.contractapplication.push(o)
              }
//              baseInfo.contractapplication = this.tabledata;
              baseInfo.contractnumbercount = this.form.tableclaimtype;
              this.makeintoBaseInfo = {};
              this.makeintoBaseInfo = baseInfo;
              if(value === "makeinto"){
                this.handleIndexDisabled();
              }else {

                    this.handleSaveContract(value,baseInfo);

              }
            },
            //contractapplication save
            handleSaveContract(value,baseInfo,tabledata) {
              this.validateByType(value, valid => {
                if (valid) {
                      this.loading = true;
                      if (this.$route.params._id) {
                        this.$store.dispatch('PFANS1026Store/update', baseInfo)
                          .then(response => {
                            this.data = response;
                            if(tabledata){
                                this.handleSaveNumber(tabledata);
                            }else {
                              Message({
                                message: this.$t("normal.success_02"),
                                type: 'success',
                                duration: 5 * 1000
                              });
                              this.loading = false;
                              this.paramsTitle();
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
                      }
                      else{
                        this.$store.dispatch('PFANS1026Store/insert', baseInfo)
                          .then(response => {
                            this.data = response;
                            if(tabledata) {
                              this.handleSaveNumber(tabledata);
                            }else {
                              Message({
                                message: this.$t("normal.success_01"),
                                type: 'success',
                                duration: 5 * 1000
                              });
                              this.loading = false;
                              this.paramsTitle();
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
                      }
                }
              });
            },
          handleSaveNumber(tabledata) {
//            this.validateByType(index, valid => {
//              if (valid) {
                this.loading = true;
                this.$store.dispatch('PFANS1026Store/insertBook', tabledata)
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
//              }
//            });
          },
            //indexDisabled
            handleIndexDisabled() {
              this.loading = true;
              this.$store.dispatch('PFANS1026Store/existCheck', {contractNumber:this.letcontractnumber})
                .then(response => {
                  this.dialogBook = true;
//                  let index = 0;
//                  for ( var i=1; i<=7; i++) {
//                    if ( response["count"+i] === 0 ) {
//                      index = i;
//                      break;
//                    }
//                  }
//                  for ( var i=1; i<=7; i++ ) {
//                    this.$set(this, "disabledCount"+i, i>index);
//                  }
                  if(response.count1 === 0) {
                    this.disabledCount1 = false;
                    this.disabledCount2 = true;
                    this.disabledCount3 = true;
                    this.disabledCount4 = true;
                    this.disabledCount5 = true;
                    this.disabledCount6 = true;
                    this.disabledCount7 = true;
                    this.loading = false;
                    return
                  }else if(response.count1 > 0 && response.count2 === 0) {
                    this.disabledCount1 = false;
                    this.disabledCount2 = false;
                    this.disabledCount3 = true;
                    this.disabledCount4 = true;
                    this.disabledCount5 = true;
                    this.disabledCount6 = true;
                    this.disabledCount7 = true;
                    this.loading = false;
                    return
                  }else if(response.count1 > 0 && response.count2 > 0 && response.count3 === 0) {
                    this.disabledCount1 = false;
                    this.disabledCount2 = false;
                    this.disabledCount3 = false;
                    this.disabledCount4 = true;
                    this.disabledCount5 = true;
                    this.disabledCount6 = true;
                    this.disabledCount7 = true;
                    this.loading = false;
                    return
                  }else if(response.count1 > 0 && response.count2 > 0 && response.count3 > 0 && response.count4 === 0) {
                    this.disabledCount1 = false;
                    this.disabledCount2 = false;
                    this.disabledCount3 = false;
                    this.disabledCount4 = false;
                    this.disabledCount5 = true;
                    this.disabledCount6 = true;
                    this.disabledCount7 = true;
                    this.loading = false;
                    return
                  }else if(response.count1 > 0 && response.count2 > 0 && response.count3 > 0 && response.count4 > 0 && response.count5 === 0) {
                    this.disabledCount1 = false;
                    this.disabledCount2 = false;
                    this.disabledCount3 = false;
                    this.disabledCount4 = false;
                    this.disabledCount5 = false;
                    this.disabledCount6 = true;
                    this.disabledCount7 = true;
                    this.loading = false;
                    return
                  }else if(response.count1 > 0 && response.count2 > 0 && response.count3 > 0 && response.count4 > 0 && response.count5 > 0 && response.count6 === 0) {
                    this.disabledCount1 = false;
                    this.disabledCount2 = false;
                    this.disabledCount3 = false;
                    this.disabledCount4 = false;
                    this.disabledCount5 = false;
                    this.disabledCount6 = false;
                    this.disabledCount7 = true;
                    this.loading = false;
                    return
                  }else if(response.count1 > 0 && response.count2 > 0 && response.count3 > 0 && response.count4 > 0 && response.count5 > 0 && response.count6 > 0 && response.count7 === 0) {
                    this.disabledCount1 = false;
                    this.disabledCount2 = false;
                    this.disabledCount3 = false;
                    this.disabledCount4 = false;
                    this.disabledCount5 = false;
                    this.disabledCount6 = false;
                    this.disabledCount7 = false;
                    this.loading = false;
                    return
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
            },

            buttonClick(val) {
                if (val === "application") {
                    this.display = true;
                    this.checkeddisplay = true;
                    this.dialogFormVisible = true;
                    this.show1 = true;
                    this.show2 = false;
                    if(!this.$route.params._id){
                        this.form.claimtype = 'HT001001';
                        this.form.contracttype = 'HT008001';
                        this.form.applicationdate = 'HT007001';
                        this.form.entrycondition = 'HT003001';
                    }else {
                      this.getChecked(true);
                    }
                }
                if (val === "cancellation") {
                    for (let i = 0; i < this.form.tabledata.length; i++) {
                      this.form.tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_INVALID");
                      this.form.tabledata[i].entrycondition = 'HT004001';
                    }
                    this.handleSave("cancellation");
                    // this.display = false;
                    // this.checkeddisplay = false;
                    // this.dialogFormVisible = true;
                    // this.show1=false;
                    // this.show2=true;
                    // this.form.contractnumber = this.$route.params._id;
                }
                if (val === "save") {
                  this.handleSave("save");
                }
                if (val === "makeinto") {
                  console.log("aaa", this.letcontractnumber);
                  this.handleSave("makeinto");
                }
            },
          validateByType: function(type, cb) {
              let that = this;
              if(type==='6') {
                if(this.maketype === '1' || this.maketype === '2'|| this.maketype === '3'|| this.maketype === '4'){
                  if(this.form.tabledata[this.form.tabledata.length - 1].currencyposition === 'HT006001') {
                    type = '61'
                  }else {
                    type = '62'
                  }
                }
              }
              let rowCount = that.form.tabledata.length || 0;
              if ( rowCount <= 0  ) {
                cb(true);
              }
              let myRule = this.ruleSet[type] || [];
              console.log("vrules", myRule);
              if ( myRule.length <=0 ) {
                cb(true);
              }
              this.$refs["refform"].clearValidate();
              let pros = [];
              myRule.forEach(function (item, index, array) {
                var dataName = ['deliverydate', 'completiondate', 'claimdate', 'supportdate', 'claimamount'].indexOf(item) >=0 ? "tableclaimtype" : "tabledata";
                for ( var k = 0; k<rowCount; k++ ) {
                  var itIndex = dataName + "." + k + "." +item;
                  console.log("va", itIndex);
                  let pro = new Promise(function(resolve, reject){
                    that.$refs["refform"].validateField(itIndex, function(msg){
                      resolve(msg);
                    });
                  });
                  pros.push(pro);
                }
              });
              Promise.all(pros).then(function(values) {
                console.log("va result ", values);
                let isOk = true;
                values.forEach(function(val) {
                  if ( val != undefined && val != "") {
                    isOk = false;
                  }
                });
                console.log("cb result", isOk);
                cb(isOk);
              });

          }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
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
