<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title"
                         @buttonClick="buttonClick"
                         :noback = "true"
                         @end="end" @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="reff" style="padding: 20px">
          <el-dialog :visible.sync="dialogFormVisible">
            <el-form-item  :label="$t('label.PFANS1024VIEW_NUMBER')" :label-width="formLabelWidth">
              <dicselect
                :code="code"
                :data="form.number"
                :multiple="multiple"
                @change="getnumber"
                style="width: 11rem">
              </dicselect>
            </el-form-item>
            <el-form-item  :label="$t('label.PFANS1024VIEW_ORIGINALCONTRACT')":label-width="formLabelWidth">
              <el-input v-model="form.originalcontract" style="width: 11rem" ></el-input>
              <el-checkbox
                v-model="form.letters"
                :key="index"
                @change="getChecked"
                active-value="1"
                inactive-value="0"
              >{{$t('label.PFANS1024VIEW_LETTERS')}}</el-checkbox>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')":label-width="formLabelWidth">
              <dicselect :code="code2"
                         :data="form.contracttype"
                         @change="getcontracttype"
                         style="width: 11rem">
              </dicselect>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_CAREERYEAR')" :label-width="formLabelWidth">
              <dicselect :code="code2"
                         :data="form.careeryear"
                         @change="getcareeryear"
                         style="width: 11rem">
              </dicselect>
              <dicselect :code="code3"
                         :data="form.careeryear"
                         @change="getcareeryear"
                         style="width: 11rem">
              </dicselect>
            </el-form-item>
            <el-form-item :error="errorgroup" :label="$t('label.group')" prop="group_id"  :label-width="formLabelWidth">
              <org  :orglist="grouporglist" orgtype="2"  :error="errorgroup" style="width: 9rem" @getOrgids="getGroupId"></org>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_OTHERGROUP')" :label-width="formLabelWidth">
              <el-input v-model="form.group_id"  style="width: 11rem" ></el-input>
            </el-form-item >
            <div  class="dialog-footer" align="center">
              <el-button @click="dialogFormVisible = false" v-if="show1">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1024VIEW_NUMBERSUCCESS')}}
                  </span>
              </el-button>
              <el-button  @click="dialogFormVisible = false" v-if="show2">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1024VIEW_NUMBERDELETE')}}
                  </span>
              </el-button>
            </div>
          </el-dialog>
          <el-tabs v-model="activeName" >
            <el-tab-pane :label="$t('label.PFANS1033VIEW_VERIFICATION')" name="first">
              <el-row>
                <el-col>
                  <span style="margin-right: 86%;color:#005BAA">{{$t('label.PFANS1033VIEW_VERIFICATION')}}</span>
                </el-col>
              </el-row>
              <el-table :data="tableInt" header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass">
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content" type="index" width="50"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" style="width: 100%"  v-model="scope.row.group_id" >
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" style="width: 100%"  v-model="scope.row.deployment">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="160">
                  <template slot-scope="scope">
                    <user
                      :disabled="!disable"
                      :no="scope.row"
                      :userlist="scope.row.user_id"
                      @getUserids="getUserids1"
                      selectType="Single"
                      style="width:90%"
                    ></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center"  prop="applicationdate" width="150">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="true" v-model="scope.row.applicationdate"  style="width:90%"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center"  prop="contractnumber" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="true" v-model="scope.row.contractnumber">
                    </el-input>


                    <!-- 契约番号!-->
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center"  prop="entrycondition" width="150">
                  <template slot-scope="scope">
                    <dicselect :code="code4"
                               :disabled="!disable"
                               :data="scope.row.entrycondition"
                               :multiple="multiple"
                               :no="scope.row"
                               @change="getentrycondition"
                               style="width: 100%">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center"  prop="entrypayment" width="150">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" v-model="scope.row.entrypayment"  style="width:90%"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true"  v-model="scope.row.claimtype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center"  prop="deliverydate" width="150">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" v-model="scope.row.deliverydate"  style="width:90%"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center"  prop="completiondate" width="150">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" v-model="scope.row.completiondate"  style="width:90%"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center"  prop="claimdate" width="150">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" v-model="scope.row.claimdate"  style="width:90%"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="120">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.claimamount"
                    ></el-input-number>
                  </template>
                </el-table-column>

                <!-- 111111!-->
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center"  prop="currencyposition" width="120">
                  <template slot-scope="scope">
                    <el-input  v-model="scope.row.currencyposition">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center"  prop="supportdate" width="120">
                  <template slot-scope="scope">
                    <el-input  v-model="scope.row.supportdate">
                    </el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTDATE')" align="center" prop="contractdate"
                                 width="370">
                  <template slot-scope="scope">
                    <el-date-picker unlink-panels
                                    class="bigWidth"
                                    :readonly="!scope.row.contractdate"
                                    v-model.trim="scope.row.contractdate"
                                    type="daterange"
                                    :end-placeholder="$t('label.enddate')"
                                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                    :start-placeholder="$t('label.startdate')"
                    ></el-date-picker>
                  </template>
                </el-table-column>


                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="customernamejapanese" width="120">
                    <template slot-scope="scope">
                      <el-input   v-model="scope.row.customernamejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="customernameabbreviation" width="120">
                    <template slot-scope="scope">
                      <el-input   v-model="scope.row.customernameabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="customernamechinese" width="120">
                    <template slot-scope="scope">
                      <el-input   v-model="scope.row.customernamechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="customerplacejapanese" width="120">
                    <template slot-scope="scope">
                      <el-input  v-model="scope.row.customerplacejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="customerplacechinese" width="120">
                    <template slot-scope="scope">
                      <el-input  v-model="scope.row.customerplacechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center"  prop="responsiblecustomerjapanese" width="120">
                    <template slot-scope="scope">
                      <el-input   v-model="scope.row.responsiblecustomerjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responsiblecustomerphone" width="120">
                    <template slot-scope="scope">
                      <el-input   v-model="scope.row.responsiblecustomerphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responsiblepersonemail" width="120">
                    <template slot-scope="scope">
                      <el-input  v-model="scope.row.responsiblepersonemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center" width="120">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="contractenglish" width="120">
                    <template slot-scope="scope">
                      <el-input   v-model="scope.row.contractenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="contractchinese" width="120">
                    <template slot-scope="scope">
                      <el-input   v-model="scope.row.contractchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRUSTEDNUMBER')" align="center"  prop="entrustednumber" width="120">
                  <template slot-scope="scope">
                    <el-input  v-model="scope.row.entrustednumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center"  prop="papercontract" width="120">
                  <template slot-scope="scope">
                    <el-input   v-model="scope.row.papercontract">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state" width="120">
                  <template slot-scope="scope">
                    <el-input   v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1033VIEW_KEEPITSECRET')" name="second">
              <el-row>
                <el-col>
                  <span style="margin-right: 89%;color:#005BAA">{{$t('label.PFANS1033VIEW_KEEPITSECRET')}}
                  </span>
                </el-col>
              </el-row>
              <el-table :data="tableInt" header-cell-class-name="sub_bg_color_grey height">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center"  prop="content" type="index"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center">
                  <template slot-scope="scope">
                    <el-input :disabled="true" style="width: 100%"  v-model="scope.row.group_id">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center">
                  <template slot-scope="scope">
                    <el-input :disabled="true" style="width: 100%"  v-model="scope.row.group">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="applicat"
                                 :error="errorapplication">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :error="errorapplication" :no="scope.row" :selectType="selectType"
                          :userlist="scope.row.application"
                          @getUserids="getUserids1" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center"  prop="applicationdate" >
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" v-model="scope.row.applicationdate"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center"  prop="contractnumber" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center"  prop="entrycondition">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.entrycondition">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center"  prop="entrypayment">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.entrypayment">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.claimtype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center"  prop="deliverydate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.deliverydate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center"  prop="completiondate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.completiondate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center"  prop="claimdate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.claimdate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.claimamount">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center"  prop="currencyposition">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.currencyposition">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center"  prop="supportdate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.supportdate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTDATE')" align="center"  prop="contractopeningdate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.contractopeningdate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="customernamejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="customernameabbreviation">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernameabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="customernamechinese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="customerplacejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" v-model="scope.row.customerplacejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="customerplacechinese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customerplacechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center"  prop="responsiblecustomerjapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.responsiblecustomerjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responsiblecustomerphone">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.responsiblecustomerphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responsiblepersonemail">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.responsiblepersonemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="contractenglish">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"    v-model="scope.row.contractenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="contractchinese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"   v-model="scope.row.contractchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRUSTEDNUMBER')" align="center"  prop="entrustednumber">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.entrustednumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center"  prop="papercontract">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.papercontract">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1033VIEW_INDENTURE')" name="third">
              <el-row>
                <el-col>
                  <span style="margin-right: 86%;color:#005BAA">{{$t('label.PFANS1033VIEW_INDENTURE')}}
                  </span>
                </el-col>
              </el-row>
              <el-table :data="table0ut" header-cell-class-name="sub_bg_color_grey height">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center"  prop="content" type="index"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center">
                  <template slot-scope="scope">
                    <el-input :disabled="true" style="width: 100%"  v-model="scope.row.group_id">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center">
                  <template slot-scope="scope">
                    <el-input :disabled="true" style="width: 100%"  v-model="scope.row.group">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="applicat"
                                 :error="errorapplication">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :error="errorapplication" :no="scope.row" :selectType="selectType"
                          :userlist="scope.row.application"
                          @getUserids="getUserids1" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center"  prop="applicationdate" >
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" v-model="scope.row.applicationdate"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center"  prop="contractnumber" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center"  prop="entrycondition">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.entrycondition">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center"  prop="entrypayment">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.entrypayment">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.claimtype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center"  prop="deliverydate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.deliverydate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center"  prop="completiondate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.completiondate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center"  prop="claimdate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.claimdate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.claimamount">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center"  prop="currencyposition">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.currencyposition">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center"  prop="supportdate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.supportdate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTDATE')" align="center"  prop="contractopeningdate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.contractopeningdate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="customernamejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="customernamejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="customernameabbreviation">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernameabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="customernamechinese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="customerplacejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" v-model="scope.row.customerplacejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="customernamejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="customerplacechinese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customerplacechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center"  prop="responsiblecustomerjapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.responsiblecustomerjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="customernamejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responsiblecustomerphone">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.responsiblecustomerphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responsiblepersonemail">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.responsiblepersonemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="contractenglish">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"    v-model="scope.row.contractenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="contractchinese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"   v-model="scope.row.contractchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRUSTEDNUMBER')" align="center"  prop="entrustednumber">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.entrustednumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center"  prop="papercontract">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.papercontract">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.state">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1033VIEW_SETUPINDENTURE')" name="fourth">
              <el-row>
                <el-col>
                  <span style="margin-right: 89%;color:#005BAA">{{$t('label.PFANS1033VIEW_SETUPINDENTURE')}}
                  </span>
                </el-col>
              </el-row>
              <el-table :data="table0ut" header-cell-class-name="sub_bg_color_grey height">
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center"  prop="content" type="index"></el-table-column>
                <el-table-column :label="$t('label.department')" align="center">
                  <template slot-scope="scope">
                    <el-input :disabled="true" style="width: 100%"  v-model="scope.row.group_id">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center">
                  <template slot-scope="scope">
                    <el-input :disabled="true" style="width: 100%"  v-model="scope.row.group">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.applicant')" align="center" prop="applicat"
                                 :error="errorapplication">
                  <template slot-scope="scope">
                    <user :disabled="!disabled" :error="errorapplication" :no="scope.row" :selectType="selectType"
                          :userlist="scope.row.application"
                          @getUserids="getUserids1" style="width: 10.15rem"></user>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center"  prop="applicationdate" >
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" v-model="scope.row.applicationdate"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.contracttype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center"  prop="contractnumber" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.contractnumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center"  prop="entrycondition">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.entrycondition">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center"  prop="entrypayment">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.entrypayment">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.claimtype">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center"  prop="deliverydate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.deliverydate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center"  prop="completiondate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.completiondate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center"  prop="claimdate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.claimdate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.claimamount">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center"  prop="currencyposition">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.currencyposition">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center"  prop="supportdate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.supportdate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTDATE')" align="center"  prop="contractopeningdate">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.contractopeningdate">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="customernamejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="customernamejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center"  prop="customernameabbreviation">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernameabbreviation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="customernamechinese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="customerplacejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" v-model="scope.row.customerplacejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center"  prop="customernamejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="customerplacechinese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customerplacechinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center"  prop="responsiblecustomerjapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.responsiblecustomerjapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center"  prop="customernamejapanese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.customernamejapanese">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center"  prop="responsiblecustomerphone">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.responsiblecustomerphone">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center"  prop="responsiblepersonemail">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"  v-model="scope.row.responsiblepersonemail">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
                  <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center"  prop="contractenglish">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"    v-model="scope.row.contractenglish">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center"  prop="contractchinese">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable"   v-model="scope.row.contractchinese">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_ENTRUSTEDNUMBER')" align="center"  prop="entrustednumber">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.entrustednumber">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center"  prop="papercontract">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.papercontract">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center"  prop="state">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable"  v-model="scope.row.state">
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
  import dicselect from "../../../components/dicselect";
  import user from '../../../components/user.vue';
  import org from "../../../components/org";

  export default {
    name: "PFANS1033View",
    components: {
      EasyNormalContainer,
      dicselect,
      user,
      org
    },
    data(){
      var checkgroup = (rule, value, callback) => {
        if(!value || value === ''){
          this.errorgroup = this.$t('normal.error_09') + this.$t('label.group');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.group')));
        }else{
          this.errorgroup = "";
          return callback();
        }
      };
      return{
        dialogFormVisible: false,
        grouporglist: '',
        errorgroup: '',
        loading: false,
        title: "title.PFANS1033VIEW",
        activeName: 'first',
        disable: true,
        tableInt:[
          {
            no:1,
          },
          {
            no:2,
          },
          {
            no:3,
          },
          {
            no:4,
          }
        ],
        rules: {
          group_id: [
            {
              required: true,
              validator: checkgroup,
              trigger: 'change'
            },
          ]
        },
        buttonList:[
          {
            key: 'application',
            name: 'menu.PFANS1033',
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
          number: '',
          originalcontract: '',
          letters:'',
          careeryear: '',
          contracttype: '',
          group_id:'',
          entrycondition:'',










        },
        code:'HT001',
        code2:'HT002',
        code3:'HT003',
        code4:'HT004',
        show1:true,
        show2:false,
      }
    },
    mounted(){},
    methods: {
      getRowClass({row, column, rowIndex, columnIndex}) {

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

      },

      buttonClick(val) {
        if (val === "application") {
          this.dialogFormVisible = true;
          this.show1=true;
          this.show2=false;
        }
        if (val === "cancellation") {
          this.dialogFormVisible = true;
          this.show1=false;
          this.show2=true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
