<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         @buttonClick="buttonClick"
                         ref="container"
                         v-loading="loading">
      <div slot="customize" >
        <el-form :model="form" :rules="rules" label-position="top" label-width="6vw" ref="refform" style="padding: 2vw">
          <el-dialog :title="$t('button.application')"  :visible.sync="dialogFormVisible">
            <el-form-item  :label="$t('label.PFANS1024VIEW_NUMBER')" :label-width="formLabelWidth">
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
                v-model="checked"
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
            <el-form-item :label="$t('label.PFANS1024VIEW_SIDEGROUP')" :label-width="formLabelWidth">
              <dicselect :code="code10"
                         :data="form.sidegroup"
                         @change="getSidegroup"
                         style="width: 20vw"
                         :disabled="!disabled2">
              </dicselect>
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
          <el-dialog :visible.sync="dialogBook" width="30%">
            <div  class="dialog-footer" align="center">
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="dialogBook = false">
                  <span style="margin-right: 86%;" @click="clickData(7)">{{$t('label.PFANS1026FORMVIEW_AWARD')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-dialog>
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1024VIEW_INTERNTECHNOLOGY')" name="first">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass1">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content" type="index" width="50"></el-table-column>
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
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled3" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTDATE')" align="center" prop="contractdate"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.contractdate"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"
                            @getUserids="getCusto" style="width: 10.15rem"></user>
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRUSTEDNUMBER')" align="center" prop="entrustednumber" width="200" :error="errorcontractnumber">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorcontractnumber" :selectType="selectType" :userlist="scope.row.entrustednumber"
                          @getUserids="getContractnumber" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center"  prop="papercontract" width="120">
                  <template slot-scope="scope">
                    <el-input   v-model="scope.row.papercontract">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state" width="200">
                  <template slot-scope="scope">
                    <el-input   v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1024VIEW_INTERNSERVITUDE')" name="second">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass2">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content" type="index" width="50"></el-table-column>
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
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled3" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTDATE')" align="center" prop="contractdate"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.contractdate"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese" width="200" :error="errorcusto">
                    <template slot-scope="scope">
                      <user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"
                            @getUserids="getCusto" style="width: 10.15rem"></user>
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.placejapanese">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.responjapanese">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.conjapanese">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRUSTEDNUMBER')" align="center" prop="entrustednumber" width="200" :error="errorcontractnumber">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorcontractnumber" :selectType="selectType" :userlist="scope.row.entrustednumber"
                          @getUserids="getContractnumber" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center"  prop="papercontract" width="120">
                  <template slot-scope="scope">
                    <el-input   v-model="scope.row.papercontract">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state" width="200">
                  <template slot-scope="scope">
                    <el-input   v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1024VIEW_OVERSEASTECHNOLOGY')" name="third">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass3">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content" type="index" width="50"></el-table-column>
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
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled3" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTDATE')" align="center" prop="contractdate"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.contractdate"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center" width="120">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center" width="120">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center" width="120">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center" width="120">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRUSTEDNUMBER')" align="center" prop="entrustednumber" width="200" :error="errorcontractnumber">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorcontractnumber" :selectType="selectType" :userlist="scope.row.entrustednumber"
                          @getUserids="getContractnumber" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center"  prop="papercontract" width="120">
                  <template slot-scope="scope">
                    <el-input   v-model="scope.row.papercontract">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state" width="200">
                  <template slot-scope="scope">
                    <el-input   v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1024VIEW_OVERSEASSERVITUDE')" name="fourth">
              <el-table :data="tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass4">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content" type="index" width="50"></el-table-column>
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
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200" :error="erroruser">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType" :userlist="scope.row.user_id"
                          @getUserids="getUserids" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"  width="200">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disabled3" type="date" v-model="scope.row.applicationdate" style="width: 11rem" ></el-date-picker>
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTDATE')" align="center" prop="contractdate"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :disabled="!disabled"
                                    v-model.trim="scope.row.contractdate"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center" width="120">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center" width="120">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center" width="120">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center" width="120">
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
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRUSTEDNUMBER')" align="center" prop="entrustednumber" width="200" :error="errorcontractnumber">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :no="scope.row" :error="errorcontractnumber" :selectType="selectType" :userlist="scope.row.entrustednumber"
                          @getUserids="getContractnumber" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center"  prop="papercontract" width="120">
                  <template slot-scope="scope">
                    <el-input   v-model="scope.row.papercontract">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state" width="200">
                  <template slot-scope="scope">
                    <el-input   v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>

          <el-table :data="tableclaimtype" stripe header-cell-class-name="sub_bg_color_grey height"
                    :header-cell-style="getRowClass1" style="padding-top: 2vw">
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="130">
              <template slot-scope="scope">
                <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"  width="170">
              <template slot-scope="scope">
                <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliverydate" style="width: 9rem" ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"  width="170">
              <template slot-scope="scope">
                <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.completiondate" style="width: 9rem" ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="170">
              <template slot-scope="scope">
                <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.claimdate" style="width: 9rem" ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="170">
              <template slot-scope="scope">
                <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportdate" style="width: 9rem" ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="190">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
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
  import { Message } from 'element-ui'
  import dicselect from "../../../components/dicselect";
  import {getOrgInfo,getDictionaryInfo} from '@/utils/customize';
  import user from '../../../components/user.vue';
  import org from "../../../components/org";
  import moment from "moment";

  export default {
    name: "PFANS1024View",
    components: {
      EasyNormalContainer,
      dicselect,
      user,
      org
    },
    data(){
      return{
        checked: false,
        checkeddisplay: true,
        dialogBook: false,
        display:true,
        contractnumbercount: '',
        maketype: '',
        selectType: "Single",
        letcontractnumber: '',
        letcontracttype: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        multiple: false,
        index: "",
        grouporglist: '',
        groupinfo:["","","",""],
        errorgroup: '',
        errorcusto: "",
        erroruser: "",
        errorcontractnumber: "",
        loading: false,
        title: "title.PFANS1024VIEW",
        activeName: '',
        disabled: true,
        disabled1: false,
        disabled2: true,
        disabled3: false,
        rules: {},
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
        form: {
          contractnumber: '',
          claimtype: 'HT001001',
          contracttype: '',
          applicationdate: '',
          entrycondition: '',
          group_id: '',
          maketype: '',
          sidegroup: '',
        },
        tabledata: [],
        tableclaimtype: [],
        code:'HT001',
        code1: 'PJ028',
        code2: 'HT014',
        code3: 'HT007',
        code4: 'HT003',
        code5: 'HT004',
        code6: 'HT009',
        code7: 'HT010',
        code8: 'HT011',
        code9: 'HT006',
        code10: 'HT017',
        show1: true,
        show2: false,
      }
    },
    mounted(){
      this.contractnumbercount = this.$route.params.contractnumbercount;
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/get', {"contractnumber": this.$route.params._id})
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
                //先方组織
                this.form.sidegroup = contractapplication[i].sidegroup;
                //契約種類
                let letabbreviation = getDictionaryInfo(contractapplication[i].contracttype);
                if (letabbreviation != null) {
                  contractapplication[i].contracttype = letabbreviation.value1;
                }
                if (contractapplication[i].contractdate !== '' && contractapplication[i].contractdate !== null) {
                  let contractdate = contractapplication[i].contractdate;
                  let contractdat = contractdate.slice(0, 10);
                  let contractdate1 = contractdate.slice(contractdate.length - 10);
                  contractapplication[i].contractdate = [contractdat, contractdate1];
                }
                let o = Object.assign({}, contractapplication[i]);
                this.tabledata.push(o);
                if (this.maketype === '1') {
                  this.activeName = 'first';
                } else if (this.maketype === '2') {
                  this.activeName = 'second';
                } else if (this.maketype === '3') {
                  this.activeName = 'third';
                } else if (this.maketype === '4') {
                  this.activeName = 'fourth';
                }
              }
            }
            if (contractnumbercount.length > 0) {
              this.tableclaimtype = contractnumbercount;
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
      }
    },
    created() {
      this.disabled = this.$route.params.disabled;
      if (!this.disabled || this.$route.params.state === this.$t("label.PFANS8008FORMVIEW_INVALID")) {
        this.buttonList = [];
      }
      if(this.$route.params._id === ''){
        this.buttonList.splice(3, 1);
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
      getSidegroup(val) {
        this.form.sidegroup = val;
      },
      getUserids(val,row) {
        row.user_id = val;
        if (!row.user_id || row.user_id === '' || val === "undefined") {
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.erroruser = "";
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
        this.form.claimtype=val;
      },
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
      getContractnumber(val,row){
        row.entrustednumber = val;
      },
      getcontracttype(val){
        this.form.contracttype=val;
      },
      getEntrycondition(val,row){
        row.entrycondition = val;
      },
      getcareeryear1(val){
        this.form.applicationdate = val;
      },
      getcareeryear2(val){
        this.form.entrycondition = val;
      },
      getCurrencyposition(val, row){
        row.currencyposition = val;
      },
      getcareeryear(val) {
        this.form.career = val;
      },
      //日期区组件处理
      getcontractdate(contractdate){
        if(contractdate != null){
          if(contractdate.length > 0){
            return moment(contractdate[0]).format('YYYY-MM-DD') + " ~ " + moment(contractdate[1]).format('YYYY-MM-DD');
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

        if (column.level === 2 && columnIndex >= 0 && columnIndex < 3) {
          return {
            color: 'white',
            background: '#99CCFF',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73B9FF',
          };
        }
        if (column.level === 2 && columnIndex >=3  && columnIndex < 5) {
          return {
            color: 'white',
            background: '#99CC99',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73CC73',
          };
        }
        if (column.level === 2 && columnIndex >= 5 && columnIndex < 8) {
          return {
            color: 'white',
            background: '#CC99FF',
            'border-right': '1px solid #B973FF',
            'border-bottom': '1px solid #99CCFF',
          };
        }
        if (column.level === 2 && columnIndex >= 8 && columnIndex < 10) {
          return {
            color: 'white',
            background: '#CC9999',
            'border-right': '1px solid #CC7373',
            'border-bottom': '1px solid #99CCFF',
          };
        }
        if(column.level === 1 && columnIndex >= 0 && columnIndex < 25){
          return {
            color: 'white',
            background: '#005BAA',
          };
        }

      },
      getRowClass2({row, column, rowIndex, columnIndex}) {

        if (column.level === 2 && columnIndex >= 0 && columnIndex < 4) {
          return {
            color: 'white',
            background: '#99CCFF',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73B9FF',
          };
        }
        if (column.level === 2 && columnIndex >=4  && columnIndex < 7) {
          return {
            color: 'white',
            background: '#99CC99',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73CC73',
          };
        }
        if (column.level === 2 && columnIndex >= 7 && columnIndex < 11) {
          return {
            color: 'white',
            background: '#CC99FF',
            'border-right': '1px solid #B973FF',
            'border-bottom': '1px solid #99CCFF',
          };
        }
        if (column.level === 2 && columnIndex >= 11 && columnIndex < 14) {
          return {
            color: 'white',
            background: '#CC9999',
            'border-right': '1px solid #CC7373',
            'border-bottom': '1px solid #99CCFF',
          };
        }
        if(column.level === 1 && columnIndex >= 0 && columnIndex < 25){
          return {
            color: 'white',
            background: '#005BAA',
          };
        }

      },
      getRowClass3({row, column, rowIndex, columnIndex}) {

        if (column.level === 2 && columnIndex >= 0 && columnIndex < 4) {
          return {
            color: 'white',
            background: '#99CCFF',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73B9FF',
          };
        }
        if (column.level === 2 && columnIndex >=4  && columnIndex < 7) {
          return {
            color: 'white',
            background: '#99CC99',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73CC73',
          };
        }
        if (column.level === 2 && columnIndex >= 7 && columnIndex < 11) {
          return {
            color: 'white',
            background: '#CC99FF',
            'border-right': '1px solid #B973FF',
            'border-bottom': '1px solid #99CCFF',
          };
        }
        if (column.level === 2 && columnIndex >= 11 && columnIndex < 14) {
          return {
            color: 'white',
            background: '#CC9999',
            'border-right': '1px solid #CC7373',
            'border-bottom': '1px solid #99CCFF',
          };
        }
        if(column.level === 1 && columnIndex >= 0 && columnIndex < 25){
          return {
            color: 'white',
            background: '#005BAA',
          };
        }

      },
      getRowClass4({row, column, rowIndex, columnIndex}) {

        if (column.level === 2 && columnIndex >= 0 && columnIndex < 4) {
          return {
            color: 'white',
            background: '#99CCFF',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73B9FF',
          };
        }
        if (column.level === 2 && columnIndex >=4  && columnIndex < 7) {
          return {
            color: 'white',
            background: '#99CC99',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73CC73',
          };
        }
        if (column.level === 2 && columnIndex >= 7 && columnIndex < 11) {
          return {
            color: 'white',
            background: '#CC99FF',
            'border-right': '1px solid #B973FF',
            'border-bottom': '1px solid #99CCFF',
          };
        }
        if (column.level === 2 && columnIndex >= 11 && columnIndex < 14) {
          return {
            color: 'white',
            background: '#CC9999',
            'border-right': '1px solid #CC7373',
            'border-bottom': '1px solid #99CCFF',
          };
        }
        if(column.level === 1 && columnIndex >= 0 && columnIndex < 25){
          return {
            color: 'white',
            background: '#005BAA',
          };
        }

      },
      addRowdata() {
        this.tabledata.push({
          contractapplication_id: '',
          careeryear: this.form.applicationdate,
          periods: this.form.entrycondition,
          sidegroup: this.form.sidegroup,
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
          claimtype: '',
          deliverydate: '',
          completiondate: '',
          claimdate: moment(new Date()).format("YYYY-MM-DD"),
          claimamount: '',
          currencyposition: '',
          supportdate: '',
          contractdate: [],
          custojapanese: '',
          custoenglish: '',
          custoabbreviation: '',
          custochinese: '',
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
          entrustednumber: '',
          papercontract: '',
          state: this.$t("label.PFANS8008FORMVIEW_EFFECTIVE"),
          type: '0',
          maketype: '',
        });
      },
      addRowclaimtype() {
        this.tableclaimtype.push({
          contractnumbercount_id: '',
          contractnumber: this.letcontractnumber,
          claimtype:'',
          deliverydate:'',
          completiondate:'',
          claimdate: moment(new Date()).format("YYYY-MM-DD"),
          claimamount:'',
          supportdate:'',
          type: '0',
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
        //先方組織名
        let sidegroup = '';
        let letsidegroup = getDictionaryInfo(this.form.sidegroup);
        if (letsidegroup != null) {
          sidegroup = letsidegroup.value2;
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
        //契約書番号(契約種類 + 事業年度 + 上下期 + 社内組織番号 + 先方番号)
        //通し番号
        let number = '01';
        if(this.contractnumbercount.toString().length === 1){
          number = '0' + this.contractnumbercount
        }
        else if(this.contractnumbercount.toString().length === 2){
          number = this.contractnumbercount
        }
        if(this.checked){
          this.letcontractnumber = this.form.contractnumber.split("-")[0] + letbook;
        }
        else{
          this.letcontractnumber = abbreviation + applicationdate + entrycondition + this.groupinfo[2] + sidegroup + number + letbook;
        }
        if(this.checked){
          for (let i = 0; i < this.tabledata.length; i++) {
            this.tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_INVALID")
          }
        }
        this.addRowdata();
        this.tableclaimtype = [];
        if(this.form.claimtype === "HT001001"){
          this.addRowclaimtype();
          this.tableclaimtype[0].claimtype = letclaimtypeone;
        }
        else if(this.form.claimtype === "HT001002"){
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.tableclaimtype[0].claimtype = letclaimtypeone;
          this.tableclaimtype[1].claimtype = letclaimtypetwo;
        }
        else if(this.form.claimtype === "HT001003"){
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.tableclaimtype[0].claimtype = letclaimtypeone;
          this.tableclaimtype[1].claimtype = letclaimtypetwo;
          this.tableclaimtype[2].claimtype = letclaimtypethree;

        }
        else if(this.form.claimtype === "HT001004"){
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.tableclaimtype[0].claimtype = letclaimtypeone;
          this.tableclaimtype[1].claimtype = letclaimtypetwo;
          this.tableclaimtype[2].claimtype = letclaimtypethree;
          this.tableclaimtype[3].claimtype = letclaimtypefour;
        }
        if(this.form.contracttype === 'HT014001'){
          this.activeName = 'first';
        }
        else if(this.form.contracttype === 'HT014002'){
          this.activeName = 'second';
        }
        else if(this.form.contracttype === 'HT014003'){
          this.activeName = 'third';
        }
        else if(this.form.contracttype === 'HT014004'){
          this.activeName = 'fourth';
        }
        this.getChecked(false);
      },
      //契約番号廃棄
      clickDiscard(){
        if(!this.show1){
          for (let i = 0; i < this.tabledata.length; i++) {
            this.tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_INVALID")
          }
        }
      },
      //書類作成
      clickData(val){
        var tabledata = {'contractnumber': this.$route.params._id,'rowindex': val};
        this.$refs["refform"].validate(valid => {
          if (valid) {
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
          }
        });
      },
      paramsTitle(){
        this.$router.push({
          name: 'PFANS1024View',
          params: {
            title: 10,
          },
        });
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
            this.form.contracttype = 'HT014001';
            this.form.applicationdate = 'HT007001';
            this.form.entrycondition = 'HT003001';
          }
        }
        if (val === "cancellation") {
          for (let i = 0; i < this.tabledata.length; i++) {
            this.tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_INVALID")
          }
        }
        if (val === "save") {
          let baseInfo = {};
          baseInfo.contractapplication = [];
          baseInfo.contractnumbercount = [];
          for (let i = 0; i < this.tabledata.length; i++) {
            this.tabledata[i].contractdate = this.getcontractdate(this.tabledata[i].contractdate);
            this.tabledata[i].contracttype = this.form.contracttype;
            if (this.form.contracttype === 'HT014001') {
              this.tabledata[i].maketype = '1';
            } else if (this.form.contracttype === 'HT014002') {
              this.tabledata[i].maketype = '2';
            } else if (this.form.contracttype === 'HT014003') {
              this.tabledata[i].maketype = '3';
            } else if (this.form.contracttype === 'HT014004') {
              this.tabledata[i].maketype = '4';
            }
            if(this.tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_EFFECTIVE")){
              let letclaimamount = 0;
              for (let j = 0; j < this.tableclaimtype.length; j++) {
                letclaimamount = letclaimamount + Number(this.tableclaimtype[j].claimamount);
              }
              this.tabledata[i].claimamount = letclaimamount;
            }
          }
          baseInfo.contractapplication = this.tabledata;
          baseInfo.contractnumbercount = this.tableclaimtype;
          this.$refs["refform"].validate(valid => {
            if (valid) {
              this.loading = true;
              if (this.$route.params._id) {
                this.$store.dispatch('PFANS1026Store/update', baseInfo)
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
              } else {
                this.$store.dispatch('PFANS1026Store/insert', baseInfo)
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
        if (val === "makeinto") {
          this.dialogBook = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
