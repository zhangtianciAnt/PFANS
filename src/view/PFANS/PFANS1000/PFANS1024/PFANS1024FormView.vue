<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         @buttonClick="buttonClick"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form1" :rules="rules1" label-position="top" label-width="6vw" ref="refform1">
          <el-dialog :title="$t('button.application')" :visible.sync="dialogVisibleC">
            <el-form-item :label="$t('label.PFANS1024VIEW_NUMBER')" :label-width="formLabelWidth" :error="errorclaimtype" prop="claimtype">
              <dicselect
                :disabled="!disabled2"
                :code="code"
                :data="form1.claimtype"
                :multiple="multiple"
                @change="getnumber"
                style="width: 20vw">
              </dicselect>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_ORIGINALCONTRACT')" :label-width="formLabelWidth" v-show="show3">
              <el-input v-model="form1.contractnumber" style="width: 20vw" :disabled="!disabled2"></el-input>
              <el-checkbox
                v-if="checkeddisplay"
                v-model="checked"
                disabled
                @change="getChecked"
              >{{$t('label.PFANS1024VIEW_LETTERS')}}
              </el-checkbox>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" :label-width="formLabelWidth" :error="errorcontracttype" prop="contracttype">
              <dicselect :code="code2"
                         :data="form1.contracttype"
                         @change="getcontracttype"
                         style="width: 20vw"
                         :disabled="!disabled2">
              </dicselect>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_CAREERYEAR')" :label-width="formLabelWidth" :error="errorapplicationdate" prop="applicationdate">
              <dicselect :code="code3"
                         :data="form1.applicationdate"
                         @change="getcareeryear1"
                         style="width: 20vw"
                         :disabled="!disabled2">
              </dicselect>
              <dicselect :code="code4"
                         :data="form1.entrycondition"
                         @change="getcareeryear2"
                         style="width: 20vw"
                         :disabled="!disabled2">
              </dicselect>
            </el-form-item>
            <el-form-item :label="$t('label.group')" :label-width="formLabelWidth"  prop="grouporglist"
                          :error="errorgroup">
              <org
                :orglist="form1.grouporglist"
                orgtype="2"
                :error="errorgroup"
                style="width: 20vw"
                @getOrgids="getGroupId"
                :disabled="!disabled2"
              ></org>
            </el-form-item>
            <!--<el-form-item :label="$t('label.PFANS1024VIEW_SIDEGROUP')" :label-width="formLabelWidth">
              <dicselect :code="code10"
                         :data="form.sidegroup"
                         @change="getSidegroup"
                         style="width: 20vw"
                         :disabled="!disabled2">
              </dicselect>
            </el-form-item>-->

            <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
            <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
            <el-form-item :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')+'('+$t('label.PFANS1024VIEW_JAPANESE')+')'"
                          :label-width="formLabelWidth" prop="custojapanese">
              <div class="" style="width: 20vw">
                <el-input class="content bg"
                          v-model="form1.custojapanese" :disabled="!disabled2">
                  <el-button :disabled="!disabled2" size="small" slot="append" icon="el-icon-search"
                             @click="handleClickE()"></el-button>
                </el-input>
              </div>
            </el-form-item>
            <el-dialog :visible.sync="dialogVisibleE"
                       top="8vh"
                       append-to-body>
              <el-table :data="dataA" :row-key="rowid" @row-click="rowClickE" max-height="400" ref="roletableA"
                        v-loading='loading'>
                <el-table-column property="supchinese" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                 width="120"></el-table-column>
                <el-table-column property="suppliercode" :label="$t('label.PFANS6003FORMVIEW_VENDORNUM')"
                                 width="120"></el-table-column>
                <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')"
                                 width="120"></el-table-column>
                <el-table-column property="prochinese" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')"
                                 width="120"></el-table-column>
                <el-table-column property="protelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')"
                                 width="120"></el-table-column>
                <el-table-column property="commontperson" :label="$t('label.PFANS6002VIEW_COMMONTPERSON')"
                                 width="120"></el-table-column>
                <el-table-column property="comtelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')"
                                 width="120"></el-table-column>
              </el-table>
            </el-dialog>

            <div class="dialog-footer" align="center">
              <!--@click="dialogFormVisible = false"-->
              <el-button v-if="show1">
                  <span style="margin-right: 86%;" @click="click">{{$t('label.PFANS1026FORMVIEW_CONTRACTNUMBER')}}
                  </span>
              </el-button>
              <el-button @click="dialogVisibleB = false" v-if="show2">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_ABANDONED')}}
                  </span>
              </el-button>
            </div>
          </el-dialog>
        </el-form>
        <el-form :model="form" :rules="rules" label-position="top" label-width="6vw" ref="refform" style="padding: 2vw">
          <el-dialog :visible.sync="dialogBook" width="30%">
            <div class="dialog-footer" align="center">
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="clickData(7)" :disabled=disabledCount7>
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_AWARD')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-dialog>
          <span>{{this.titleType}}</span>
          <el-table :data="form.tabledata" stripe header-cell-class-name="sub_bg_color_grey height"
                    :header-cell-style="getRowClass1">
            <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content" type="index"
                             width="50"></el-table-column>
            <el-table-column :label="$t('label.department')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'" :error="errordepartment">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem"
                            maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--开发部门-->
            <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.deployment'" :rules='rules.deployment'>
                  <el-input v-model="scope.row.deployment" :disabled="!disabled3" style="width: 11rem"
                            maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200"
                             :error="erroruser">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.user_id'" :rules='rules.applicant'>
                  <user :disabled="!disabled3" :no="scope.row" :error="erroruser" :selectType="selectType"
                        :userlist="scope.row.user_id"
                        @getUserids="getUserids" style="width: 10.15rem"></user>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.applicationdate'">
                  <el-date-picker :disabled="!disabled3" type="date" v-model="scope.row.applicationdate"
                                  style="width: 11rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.contracttype'">
                  <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contracttype">
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.contractnumber'">
                  <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contractnumber">
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"
                             width="200">
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
            <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.entrypayment'">
                  <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.entrypayment"
                                  style="width: 11rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"
                             width="200">
              <template slot-scope="scope">
                <!--code9-->
                <el-form-item :prop="'tabledata.' + scope.$index + '.currencyposition'" :rules='rules.currencyposition'>
                  <!--<dicselect
                    :code="code9"
                    :data="scope.row.currencyposition"
                    :no="scope.row"
                    :multiple="multiple"
                    @change="getCurrencyposition"
                    style="width: 11rem"
                    :disabled="!disabled">
                  </dicselect>-->
                  <el-select :no="scope.row" v-model="scope.row.currencyposition" @change="(val)=>{getCurrencyposition(val,scope.row)}" style="width: 11rem" :disabled="!disabled">
                    <el-option v-for="(item,index) in options" :key="index" v-model="item.value">
                      {{item.value}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTDATE')" align="center" prop="contractdate"
                             width="370">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.contractdate'" :rules='rules.contractdate'>
                  <el-date-picker unlink-panels
                                  class="bigWidth"
                                  :disabled="!disabled"
                                  v-model="scope.row.contractdate"
                                  type="daterange"
                                  :end-placeholder="$t('label.enddate')"
                                  :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                  :start-placeholder="$t('label.startdate')"
                  ></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>

            <!--取引先会社名-->
            <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center" width="120">
              <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese"
                               width="200" :error="errorcusto">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.custojapanese'" :rules='rules.custojapanese'>
                    <div class="">
                      <el-input :disabled="true" v-model="scope.row.custojapanese">
                      </el-input>
                    </div>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center" prop="custoenglish"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.custoenglish'" :rules='rules.custoenglish'>
                    <el-input :disabled="true" v-model="scope.row.custoenglish">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center" prop="custoabbreviation"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.custoabbreviation'"
                                :rules='rules.custoabbreviation'>
                    <el-input :disabled="true" v-model="scope.row.custoabbreviation">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center" prop="custochinese"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.custochinese'" :rules="rules.custochinese">
                    <el-input :disabled="true" v-model="scope.row.custochinese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
            <!--222-->
            <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center" width="120">
              <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.placejapanese'" :rules='rules.placejapanese'>
                    <el-input :disabled="true" v-model="scope.row.placejapanese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center" prop="placeenglish"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.placeenglish'" :rules='rules.placeenglish'>
                    <el-input :disabled="true" v-model="scope.row.placeenglish">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center" prop="placechinese"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.placechinese'" :rules='rules.placechinese'>
                    <el-input :disabled="true" v-model="scope.row.placechinese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center" width="120">
              <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.responjapanese'">
                    <el-input :disabled="true" v-model="scope.row.responjapanese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center" prop="responerglish"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.responerglish'" :rules='rules.responerglish'>
                    <el-input :disabled="true" v-model="scope.row.responerglish">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center" prop="responphone" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.responphone'" :rules='rules.responphone'>
                    <el-input :disabled="true" v-model="scope.row.responphone">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center" prop="responemail" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.responemail'">
                    <el-input :disabled="true" v-model="scope.row.responemail">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center" width="120">
              <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.conjapanese'" :rules='rules.conjapanese'>
                    <el-input  v-model="scope.row.conjapanese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center" prop="conenglish" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.conenglish'">
                    <el-input  v-model="scope.row.conenglish">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center" prop="conchinese" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.conchinese'" :rules='rules.conchinese'>
<!--                    <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true"-->
<!--                             v-model="scope.row.conchinese"-->
<!--                             @change="changePro" :disabled="!disabled">-->
<!--                    </project>-->
                    <el-input  v-model="scope.row.conchinese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_ENTRUSTEDNUMBER')" align="center" prop="entrustednumber"
                             width="200" :error="errorcontractnumber">
              <template slot-scope="scope">
                <!--<user :disabled="!disabled" :no="scope.row" :error="errorcontractnumber" :selectType="selectType" :userlist="scope.row.entrustednumber"-->
                <!--@getUserids="getContractnumber" style="width: 10.15rem"></user>-->
                <el-form-item :prop="'tabledata.' + scope.$index + '.entrustednumber'" :rules='rules.entrustednumber'>
                  <div class="">
                    <el-input class="content bg"
                              :disabled="true"
                              v-model="scope.row.entrustednumber">
                      <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search"
                                 @click="handleClickD(scope.row)"></el-button>
                    </el-input>
                  </div>
                </el-form-item>
                <el-dialog :visible.sync="dialogVisibleD"
                           top="8vh"
                           append-to-body>
                  <el-table :data="tableD" :row-key="rowid" @row-click="rowClickD" max-height="400" ref="roletableD"
                            v-loading='loading'>
                    <el-table-column property="user_id" :label="$t('label.applicant')" width="120"></el-table-column>
                    <el-table-column property="deployment" :label="$t('label.group')" width="120"></el-table-column>
                    <el-table-column property="contractnumber" :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')"
                                     width="120"></el-table-column>
                    <el-table-column property="contracttype" :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')"
                                     width="120"></el-table-column>
                    <el-table-column property="applicationdate" :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')"
                                     width="120"></el-table-column>
                    <el-table-column property="state" :label="$t('label.approval_status')"
                                     width="120"></el-table-column>
                  </el-table>
                </el-dialog>
              </template>
            </el-table-column>
            <!--<el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center" prop="papercontract"
                             width="120">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input v-model="scope.row.papercontract" :disabled="!disabled">
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>-->
            <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
              <template slot-scope="scope">
                <el-form-item prop="theme">
                  <div class="">
                    <el-input class="content bg"
                              :disabled="true"
                              v-model="scope.row.theme">
                      <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search"
                                 @click="handleClickB(scope.row)"></el-button>
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
                    <el-table :data="tableB" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA"
                              width="100%" v-loading='loading' v-show="showTable1">
                      <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')"
                                       width="180"></el-table-column>
                      <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')"
                                       width="180"></el-table-column>
                    </el-table>
                    <el-table :data="tableC" :row-key="rowid" @row-click="rowClickB" max-height="400" ref="roletableA"
                              width="100%" v-loading='loading' v-show="!showTable1">
                      <el-table-column property="theme" :label="$t('label.PFANS1039FORMVIEW_THEME')"
                                       width="180"></el-table-column>
                      <el-table-column property="months" :label="$t('label.PFANS1024VIEW_TIME')"
                                       width="180"></el-table-column>
                    </el-table>
                  </div>
                </el-dialog>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center" prop="state" width="200">
            </el-table-column>
          </el-table>
          <el-table :data="form.tableclaimtype" stripe header-cell-class-name="sub_bg_color_grey height"
                    :header-cell-style="getRowClass1" style="padding-top: 2vw">
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center" prop="claimtype" width="130">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"
                             width="170">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.deliverydate'" :rules='rules.deliverydate'>
                  <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliverydate"
                                  style="width: 9rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"
                             width="170">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.completiondate'"
                              :rules='rules.completiondate'>
                  <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.completiondate"
                                  style="width: 9rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate" width="170">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.claimdate'" :rules='rules.claimdate'>
                  <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.claimdate"
                                  style="width: 9rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"
                             width="170">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.supportdate'" :rules='rules.supportdate'>
                  <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportdate"
                                  style="width: 9rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" prop="claimamount"
                             width="190">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.claimamount'" :rules='rules.claimamount'>
                  <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem"
                                   :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
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
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import {getDictionaryInfo, getOrgInfo,getOrgInfoByUserId, getStatus, getSupplierinfor, getUserInfo} from '@/utils/customize';
  import user from '../../../components/user.vue';
  import org from '../../../components/org';
  import project from '../../../components/project';
  import moment from 'moment';

  export default {
    name: 'PFANS1024View',
    components: {
      EasyNormalContainer,
      dicselect,
      user,
      org,
      project,
      getOrgInfoByUserId,

    },
    data() {
      var validateDeployment = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_KFBS')));
        } else {
          callback();
        }
      };
      var validateContractdate = (rule, value, callback) => {
        if (Array.isArray(value)) {
          if (value.length == 0) {
            callback(new Error(this.$t('label.PFANS1026FORMVIEW_KFQQSJ')));
          }
          value.map(function(item) {
            if (item === '') {
              callback(new Error(this.$t('label.PFANS1026FORMVIEW_KFQQSJ')));
            }
          });
          callback();
        } else {
          if (value === '') {
            callback(new Error(this.$t('label.PFANS1026FORMVIEW_KFQQSJ')));
          } else {
            callback();
          }
        }

      };
      var validateCurrencyposition = (rule, value, callback) => {
        if (value === '') {
          // 333
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_THDW')));
        } else {
          callback();
        }
      };
      var validateLoadingjudge = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_CHPDSSZ')));
        } else {
          callback();
        }
      };
      var validateDeliveryfinshdate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_NPZCR')));
        } else {
          callback();
        }
      };
      var validateCustojapanese = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_QYXHSMHW')));
        } else {
          callback();
        }
      };
      var validateCustoenglish = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_QYXHSMYW')));
        } else {
          callback();
        }
      };
      var validateCustoabbreviation = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_QYXHSMLM')));
        } else {
          callback();
        }
        f;
      };
      var validateCustochinese = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_QYXHSMZWM')));
        } else {
          callback();
        }
      };
      var validateBusinesscode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_SYC')));
        } else {
          callback();
        }
      };
      var validateVarto = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_TO')));
        } else {
          callback();
        }
      };
      var validatePlacejapanese = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_ZSRW')));
        } else {
          callback();
        }
      };
      var validatePlaceenglish = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_ZSYW')));
        } else {
          callback();
        }
      };
      var validatePlacechinese = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_ZSZW')));
        } else {
          callback();
        }
      };

      var validateResponerglish = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_DDZYW')));
        } else {
          callback();
        }
      };
      var validateResponphone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1024FORMVIEW_DDZDH')));
        } else {
          callback();
        }
      };
      var validateConjapanese = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_QYHW')));
        } else {
          callback();
        }
      };
      var validateConenglish = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_QYHW')));
        } else {
          callback();
        }
      };
      var validateConchinese = (rule, value, callback) => {
        debugger;
        if (Array.isArray(value)) {
          if (value.length == 0) {
            callback(new Error(this.$t('label.PFANS1026FORMVIEW_QYZW')));
            return;
          }
          value.map(function(item) {
            if (item === '') {
              callback(new Error(this.$t('label.PFANS1026FORMVIEW_QYZW')));

            }
          });
          callback();
        } else {
          if (value === '' && value != null && value != undefined) {
            callback(new Error(this.$t('label.PFANS1026FORMVIEW_XMHW')));
          } else {
            callback();
          }
        }
      };
      var validateDeliverydate = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_NPYDR')));
        } else {
          callback();
        }
      };
      var validateCompletiondate = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_JSWLR')));
        } else {
          callback();
        }
      };
      var validateClaimdate = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_QQR')));
        } else {
          callback();
        }
      };
      var validateSupportdate = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_ZFR')));
        } else {
          callback();
        }
      };
      var validateClaimamount = (rule, value, callback) => {
        if (value === '' && value != null && value != undefined) {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_QQJE')));
        } else {
          callback();
        }
      };
      var groupId = (rule, value, callback) => {
        if (!this.form1.grouporglist || this.form1.grouporglist === '') {
          callback(new Error(this.$t('normal.error_08') + 'group'));
          this.errorgroup = this.$t('normal.error_08') + 'group';
        } else {
          callback();
        }
      };
      var checkApplicationdate =(rule, value, callback) => {
//          if (!this.form1.applicationdate || this.form1.applicationdate === '' || !this.form1.entrycondition || this.form1.entrycondition === '') {
          if (value === '') {
              callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1024VIEW_CAREERYEAR')));
              this.errorapplicationdate = this.$t('normal.error_09') + this.$t('label.PFANS1024VIEW_CAREERYEAR');
          } else {
              callback();
          }
      };
      return {
        error: '',
        errordepartment: '',
        makeintoBaseInfo: {},
        titleType: '',
        titleType1: this.$t('label.PFANS1024VIEW_INTERNTECHNOLOGY'),
        titleType2: this.$t('label.PFANS1024VIEW_INTERNSERVITUDE'),
        titleType3: this.$t('label.PFANS1024VIEW_OVERSEASTECHNOLOGY'),
        titleType4: this.$t('label.PFANS1024VIEW_OVERSEASSERVITUDE'),
        disabledCount7: false,
        checked: false,
        checkeddisplay: true,
        dialogBook: false,
        display: true,
        options: [],
        contractnumbercount: '',
        maketype: '',
        selectType: 'Single',
        letcontractnumber: '',
        letcontracttype: '',
        dialogFormVisible: false,
        dialogVisibleE: false,
        dialogVisibleC: false,
        formLabelWidth: '120px',
        multiple: false,
        index: '',
          user_id: '',
        grouporglist: '',
        groupinfo: ['', '', '', ''],
        errorgroup: '',
        errorcusto: '',
        erroruser: '',
        errorcontractnumber: '',
          errorclaimtype: '',
          errorcontracttype: '',
          errorapplicationdate: '',
        loading: false,
        title: 'title.PFANS1024VIEW',
        activeName: '',
        disabled: true,
        disabled1: false,
        disabled2: true,
        disabled3: false,
        disabled4: false,
        ruleSet: {
          'save': ['contractnumber'],
          'makeinto': ['contractnumber'],
          '7': ['custojapanese', 'custochinese', 'placejapanese', 'placechinese', 'deployment', 'contractdate', 'currencyposition', 'claimamount', 'deliverydate','conchinese','conjapanese'],
        },
        rules1: {
            claimtype: [
                {
                    required: true,
                    message:
                        this.$t('normal.error_09') +
                        this.$t('label.PFANS1024VIEW_NUMBER'),
                    trigger: 'change',
                },
            ],

            contracttype: [
                {
                    required: true,
                    message:
                        this.$t('normal.error_09') +
                        this.$t('label.PFANS1024VIEW_CONTRACTTYPE'),
                    trigger: 'change',
                },
            ],

            applicationdate: [
                {
                    required: true,
                    validator: checkApplicationdate,
                    trigger: 'submit',
                },
            ],
          grouporglist: [
            {
              required: true,
              validator: groupId,
              trigger: 'blur',
            },
          ],
          custojapanese: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS1024VIEW_CUSTOMERNAME'),
              trigger: 'change',
            },

          ],
        },
        rules: {
          group_id: [
            {
              required: true,
              validator: groupId,
              trigger: 'change',
            },
          ],
          deployment: [
            {validator: validateDeployment},
          ],
          contractdate: [
            {validator: validateContractdate},
          ],
          currencyposition: [
            {validator: validateCurrencyposition},
          ],
          loadingjudge: [
            {validator: validateLoadingjudge},
          ],
          deliveryfinshdate: [
            {validator: validateDeliveryfinshdate},
          ],
          custojapanese: [
            {validator: validateCustojapanese},
          ],
          custoenglish: [
            {validator: validateCustoenglish},
          ],
          custoabbreviation: [
            {validator: validateCustoabbreviation},
          ],
          custochinese: [
            {validator: validateCustochinese},
          ],
          businesscode: [
            {validator: validateBusinesscode},
          ],
          varto: [
            {validator: validateVarto},
          ],
          placejapanese: [
            {validator: validatePlacejapanese},
          ],
          placeenglish: [
            {validator: validatePlaceenglish},
          ],
          placechinese: [
            {validator: validatePlacechinese},
          ],
          responerglish: [
            {validator: validateResponerglish},
          ],
          responphone: [
            {validator: validateResponphone},
          ],
          conjapanese: [
            {validator: validateConjapanese},
          ],
          conenglish: [
            {validator: validateConenglish},
          ],
          conchinese: [
            {validator: validateConchinese},
          ],
          deliverydate: [
            {validator: validateDeliverydate},
          ],
          completiondate: [
            {validator: validateCompletiondate},
          ],
          claimdate: [
            {validator: validateClaimdate},
          ],
          supportdate: [
            {validator: validateSupportdate},
          ],
          claimamount: [
            {validator: validateClaimamount},
          ],
        },
        buttonList: [
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
        form1: {
          claimtype: '',
          contractnumber: '',
          contracttype: '',
          applicationdate: '',
          entrycondition: '',
          grouporglist: '',
          custojapanese: '',
          suppliercode: '',
        },
        form: {
          tabledata: [],
          tabledata2: undefined,
          contractnumber: '',
          claimtype: 'HT001001',
          contracttype: '',
          applicationdate: '',
          entrycondition: '',
          group_id: '',
          maketype: '',
          sidegroup: '',
          deployment: '',
          contractdate: [],
          currencyposition: '',
          loadingjudge: '',
          deliveryfinshdate: '',
          custojapanese: '',
          custoenglish: '',
          custoabbreviation: '',
          custochinese: '',
          businesscode: '',
          varto: '',
          placejapanese: '',
          placeenglish: '',
          placechinese: '',
          responerglish: '',
          responphone: '',
          conjapanese: '',
          conenglish: '',
          conchinese: '',
          deliverydate: '',
          completiondate: '',
          claimdate: '',
          supportdate: '',
          claimamount: '',
          tableclaimtype: [],
        },
        formcustomer: {
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
        },
        tabledata: [],
        tableclaimtype: [],
        code: 'HT001',
        code1: 'PJ028',
        code2: 'HT014',
        code3: 'HT007',
        code4: 'HT003',
        code5: 'HT004',
        code6: 'HT009',
        code7: 'HT010',
        code8: 'HT011',
        code9: 'PG019',
        code10: 'HT017',
        show1: true,
        show2: false,
        show3:false,
        tableB: [],
        tableC: [],
        tableD: [],
        showTable1: true,
        dialogVisibleB: false,
        titleA: 'title.PFANS6002VIEW',
        dialogVisibleA: false,
        rowid: '',
        rowA: 'customerinfor_id',
        dataA: [],
        recordData: [],
        recordDataB: [],
        region: '1',
        titleB: 'menu.PFANS1040',
        titleC: 'menu.PFANS1041',
        projectResult: [],
        recordDataD: [],
        dialogVisibleD: false,
      };
    },
    mounted() {
      this.contractnumbercount = this.$route.params.contractnumbercount;
      let option1 = {};
        option1.name = getDictionaryInfo('PG019001').value1;
        option1.code = 'PG019003';
        option1.value = getDictionaryInfo('PG019001').value4;
      let option2 = {};
        option2.name = getDictionaryInfo('PG019003').value1;
        option2.code = 'PG019003';
        option2.value = getDictionaryInfo('PG019003').value4;
        this.options.push(option1);
        this.options.push(option2);
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/get', {'contractnumber': this.$route.params._id})
          .then(response => {
            let contractapplication = response.contractapplication;
            let contractnumbercount = response.contractnumbercount;
            if (contractapplication.length > 0) {
              for (let i = 0; i < contractapplication.length; i++) {
                 /* //555 this.currencyposition
                let currencyposition =  contractapplication[i].currencyposition;
                this.currencyposition = currencyposition === 'PG019001'?'USB$':'￥';*/
                this.maketype = contractapplication[i].maketype;

                  this.form1.claimtype = contractapplication[i].claimtype;
                //契約書番号
                this.letcontractnumber = contractapplication[i].contractnumber;
                this.show3 = true;
                this.form1.contractnumber = contractapplication[i].contractnumber;
                //契約種類
                this.form.contracttype = contractapplication[i].contracttype;
                  this.form1.contracttype = contractapplication[i].contracttype;
                //事業年度
                this.form.applicationdate = contractapplication[i].careeryear;
                  this.form1.applicationdate = contractapplication[i].careeryear;
                //上下期
                this.form.entrycondition = contractapplication[i].periods;
                  this.form1.entrycondition = contractapplication[i].periods;

                this.form1.custojapanese = contractapplication[i].custojapanese;
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
                if (contractapplication[i].conchinese != null && contractapplication[i].conchinese != '') {
                  let conchinese = contractapplication[i].conchinese;
                  if (typeof conchinese == 'string') {
                    conchinese = conchinese.split(',');
                    contractapplication[i].conchinese = conchinese;
                  }
                }
                let o = Object.assign({}, contractapplication[i]);
                this.form.tabledata.push(o);
                if (this.maketype === '1') {
                  this.titleType = this.titleType1;
                } else if (this.maketype === '2') {
                  this.titleType = this.titleType2;
                } else if (this.maketype === '3') {
                  this.titleType = this.titleType3;
                } else if (this.maketype === '4') {
                  this.titleType = this.titleType4;
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
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      }
      //333
        let userid = this.$store.getters.userinfo.userid;
        if (userid !== null && userid !== '') {
            let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
            this.form1.grouporglist = lst.groupId;
            this.getGroupId(this.form1.grouporglist);
        }

      //get customer
      this.getsupplierinfor();
      //テーマ
      this.getdata('2');
      this.getdata('4');
      //get project
      this.getProjectList();
      //get contractapplication type=1
      this.getContract();
    },
    created() {
      this.disabled = this.$route.params.disabled;
      if (!this.disabled || this.$route.params.state === this.$t('label.PFANS8008FORMVIEW_INVALID')) {
        this.buttonList = [];
      }
//      if(this.$route.params._id === ''){
//        this.buttonList.splice(3, 1);
//      }
    },
    methods: {
      getProjectList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5009Store/getSiteList2', {})
          .then(response => {
            this.projectResult = response.filter(value => {
              return value.status === '4';
            });
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      },
      changePro(val, row) {
        let nameJA = '';
        for (let i = 0; i < val.length; i++) {
          let result = this.projectResult.filter(value => {
            return value.companyprojects_id === val[i];
          });
          nameJA += result[0].project_namejp + ',';
        }
        row.conchinese = val;
        row.conjapanese = nameJA.substring(0, nameJA.length - 1);
      },
      changed() {
        if (this.region === '2') {
          this.showTable1 = false;
        } else if (this.region === '1') {
          this.showTable1 = true;
        }
      },
      handleClickA(row) {
        this.recordData = row;
        this.dialogVisibleA = true;
      },
      rowClick(row) {
        this.loading = true;
        this.recordData.custojapanese = row.supjapanese;
        this.recordData.custoenglish = row.supenglish;
        this.recordData.custoabbreviation = row.abbreviation;
        this.recordData.custochinese = row.supchinese;
        this.recordData.suppliercode = row.suppliercode;

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
        //
      handleClickE() {
        this.form.claimtype = this.form1.claimtype;
        this.dialogVisibleE = true;
      },
      handleClickB(row) {
        this.recordDataB = row;
        this.dialogVisibleB = true;
      },
      rowClickE(row) {//333
        this.form1.custojapanese = row.supjapanese;

        this.formcustomer.custojapanese = row.supjapanese;
        this.formcustomer.custoenglish = row.supenglish;
        this.formcustomer.custoabbreviation = row.abbreviation;
        this.formcustomer.custochinese = row.supchinese;
        this.formcustomer.suppliercode = row.suppliercode;


        if(!row.addjapanese){
            this.formcustomer.placejapanese = row.addchinese;
        }else{
            this.formcustomer.placejapanese = row.addjapanese;
        }

        this.formcustomer.placeenglish = row.addenglish;
        this.formcustomer.placechinese = row.addchinese;

        this.formcustomer.responjapanese = row.projapanese;
        this.formcustomer.responerglish = row.proenglish;
        this.formcustomer.responphone = row.protelephone;
        this.formcustomer.responemail = row.protemail;
        this.dialogVisibleE = false;
      },
      rowClickB(row) {
        this.recordDataB.theme = row.theme;
        this.recordDataB.temaid = row.contractthemeid;
        this.dialogVisibleB = false;
      },
      getdata(type) {
        let datainfo = {};
        var myDate = new Date();
        var tYear = myDate.getFullYear();
        datainfo = {'type': type, 'years': tYear, 'status': '4'};

        this.loading = true;
        this.$store
          .dispatch('PFANS1040Store/get', datainfo)
          .then(response => {
            if (response.length > 0) {
              if (type === '2') {
                this.tableBc = [];
                let months = response[0].months;
                for (let j = 0; j < response.length; j++) {
                  if (months === response[j].months) {
                    this.tableBc.push(response[j]);
                  }
                }
                this.tableB = this.tableBc;
              } else {
                this.tableBc = [];
                let months = response[0].months;
                for (let j = 0; j < response.length; j++) {
                  if (months === response[j].months) {
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
      //获取供应商列表
      getsupplierinfor() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6003Store/getsupplierinfor2')
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].supplierinfor_id !== null && response[j].supplierinfor_id !== '') {
                let supplierInfo = getSupplierinfor(response[j].supplierinfor_id);
                if (supplierInfo) {
                  response[j].supchinese = supplierInfo.supchinese;
                }
              }
              if (response[j].liableperson !== null && response[j].liableperson !== '') {
                let liableperson = getUserInfo(response[j].liableperson);
                if (liableperson) {
                  response[j].liableperson = user.userinfo.customername;
                }
              }
              if (response[j].prochinese !== null && response[j].prochinese !== '') {
                let prochinese = getUserInfo(response[j].prochinese);
                if (prochinese) {
                  response[j].prochinese = user.userinfo.customername;
                }
              }
              if (response[j].protelephone !== null && response[j].protelephone !== '') {
                let protelephone = getUserInfo(response[j].protelephone);
                if (protelephone) {
                  response[j].protelephone = user.userinfo.customername;
                }
              }
              if (response[j].commontperson !== null && response[j].commontperson !== '') {
                let commontperson = getUserInfo(response[j].commontperson);
                if (commontperson) {
                  response[j].commontperson = user.userinfo.customername;
                }
              }
              if (response[j].comtelephone !== null && response[j].comtelephone !== '') {
                let comtelephone = getUserInfo(response[j].comtelephone);
                if (comtelephone) {
                  response[j].comtelephone = user.userinfo.customername;
                }
              }
              if (response[j].addchinese !== null && response[j].addchinese !== '') {
                let addchinese = getUserInfo(response[j].addchinese);
                if (addchinese) {
                  response[j].addchinese = user.userinfo.customername;
                }
              }
              if (response[j].perscale !== null && response[j].perscale !== '') {
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
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      handleClickD(row) {
        this.recordDataD = row;
        this.dialogVisibleD = true;
      },
      rowClickD(row) {
        this.recordDataD.entrustednumber = row.contractnumber;
        this.dialogVisibleD = false;
      },
      getContract() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/get', {'type': '1'})
          .then(response => {
            let letcontractnumber = [];
            let tabledata = response.contractapplication;
            for (let i = 0; i < tabledata.length; i++) {
              tabledata[i].status = getStatus(tabledata[i].status);
              let user = getUserInfo(tabledata[i].user_id);
              if (user) {
                tabledata[i].user_id = getUserInfo(tabledata[i].user_id).userinfo.customername;
              }
              if (tabledata[i].applicationdate !== null && tabledata[i].applicationdate !== '') {
                tabledata[i].applicationdate = moment(tabledata[i].applicationdate).format('YYYY-MM-DD');
              }
              if (tabledata[i].contracttype !== null && tabledata[i].contracttype !== '') {
                let letContracttype = getDictionaryInfo(tabledata[i].contracttype);
                if (letContracttype != null) {
                  tabledata[i].contracttype = letContracttype.value1;
                }
              }
              if (tabledata[i].contractnumber != '') {
                letcontractnumber.push(tabledata[i].contractnumber);
              }
            }
            var arr = [];
            let o;
            for (var i = 0; i < letcontractnumber.length; i++) {
              if (arr.indexOf(letcontractnumber[i]) == -1) {
                arr.push(letcontractnumber[i]);
                o = Object.assign([], tabledata[i]);
                this.tableD.push(o);
              }
            }
//            this.contractnumbercount = (letcontractnumber.length + 1);
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
      getGroupId(val) {
        this.form1.grouporglist = val;
        this.grouporglist = val;
        let group = getOrgInfo(val);
        if (group) {
          this.groupinfo = [val, group.companyen, group.orgname, group.companyname];
        }
        if (!val || this.form1.grouporglist === '') {
          this.errorgroup = this.$t('normal.error_08') + 'group';
        } else {
          this.errorgroup = '';
        }
      },
      getOrgInformation(id) {
        let org = {};
        let treeCom = this.$store.getters.orgs;

        if (id && treeCom.getNode(id)) {
          let node = id;
          let type = treeCom.getNode(id).data.type || 0;
          for (let index = parseInt(type); index >= 1; index--) {
            if (parseInt(type) === index && ![1, 2].includes(parseInt(type))) {
              org.teamname = treeCom.getNode(node).data.departmentname;
              org.teamid = treeCom.getNode(node).data._id;
            }
            if (index === 2) {
              org.groupname = treeCom.getNode(node).data.departmentname;
              org.groupid = treeCom.getNode(node).data._id;
              org.budgetunit = treeCom.getNode(node).data.encoding;
            }
            if (index === 1) {
              org.centername = treeCom.getNode(node).data.companyname;
              org.centerid = treeCom.getNode(node).data._id;
            }
            node = treeCom.getNode(node).parent.data._id;
          }
          ({
            centername: this.form.centername,
            groupname: this.form.groupname,
            teamname: this.form.teamname,
            centerid: this.form.centerid,
            groupid: this.form.groupid,
            teamid: this.form.teamid,
            budgetunit: this.form.budgetunit,
          } = org);
        }
      },
      getSidegroup(val) {
        this.form.sidegroup = val;
      },
      getUserids(val, row) {
        row.user_id = val;
      },
      getCusto(val, row) {
        row.custojapanese = val;
        if (!row.custojapanese || row.custojapanese === '' || val === 'undefined') {
          this.errorcusto = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.errorcusto = '';
        }
      },
      getnumber(val) {
        this.form1.claimtype = val;
      },
      getChecked(val) {
        this.checked = val;
        if (val === true) {
          this.form.contractnumber = this.letcontractnumber;
          this.disabled1 = true;
          this.disabled2 = false;
        } else {
          this.disabled1 = false;
          this.disabled2 = true;
          this.form.contractnumber = '';
        }
      },
      getContractnumber(val, row) {
        row.entrustednumber = val;
      },
      getcontracttype(val) {
        this.form1.contracttype = val;
      },
      getEntrycondition(val, row) {
        row.entrycondition = val;
      },
      getcareeryear1(val) {
        this.form1.applicationdate = val;
        if(this.form1.entrycondition){
            this.errorapplicationdate = '';
        }
      },
      getcareeryear2(val) {
        this.form1.entrycondition = val;
          if(this.form1.applicationdate){
              this.errorapplicationdate = '';
          }
      },
      getCurrencyposition(val, row) {

            row.currencyposition = val;

      },
      getcareeryear(val) {
        this.form.career = val;
      },
      //日期区组件处理
      getcontractdate(contractdate) {
        if (contractdate != null) {
          if (contractdate.length > 0) {
            return moment(contractdate[0]).format('YYYY-MM-DD') + ' ~ ' + moment(contractdate[1]).format('YYYY-MM-DD');
          } else {
            return '';
          }
        } else {
          return '';
        }
      },
      getRowClass1({row, column, rowIndex, columnIndex}) {

        if (column.level === 2 && columnIndex >= 0 && columnIndex < 4) {
          return {
            color: 'white',
            background: '#99CCFF',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73B9FF',
          };
        }
        if (column.level === 2 && columnIndex >= 4 && columnIndex < 7) {
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
        if (column.level === 1 && columnIndex >= 0 && columnIndex < 25) {
          return {
            color: 'white',
            background: '#005BAA',
          };
        }

      },
      addRowdata(isClone) {
        //纳品进步状况=纳品作成完了，如果生成觉书，要在觉书那条把原来的copy过来。
        if (isClone) {
          let olddata = JSON.parse(JSON.stringify(this.form.tabledata[0]));//this.form.contractnumber
          olddata.contractnumber = this.letcontractnumber;
          olddata.state = this.$t('label.PFANS8008FORMVIEW_EFFECTIVE');
          this.form.tabledata.push(olddata);
        } else {
          let o = {
            contractapplication_id: '',
            careeryear: this.form.applicationdate,
            periods: this.form.entrycondition,
            sidegroup: this.form.sidegroup,
            group_id: this.groupinfo[0],
            department: this.groupinfo[1],
            orgnumber: this.groupinfo[2],
            deployment: this.groupinfo[3],
            applicationdate: moment(new Date()).format('YYYY-MM-DD'),
            user_id: this.$store.getters.userinfo.userid,
            contracttype: this.contracttype,
            contractnumber: this.letcontractnumber,
            entrycondition: '',
            entrypayment: '',
            claimtype: this.form1.claimtype,
            deliverydate: '',
            completiondate: '',
            claimdate: moment(new Date()).format('YYYY-MM-DD'),
            claimamount: '',
            currencyposition: '',
            supportdate: '',
            contractdate: [],
            custojapanese: this.formcustomer.custojapanese,
            custoenglish: this.formcustomer.custoenglish,
            custoabbreviation: this.formcustomer.custoabbreviation,
            custochinese: this.formcustomer.custochinese,
            placejapanese: this.formcustomer.placejapanese,
            placeenglish: this.formcustomer.placeenglish,
            placechinese: this.formcustomer.placechinese,
            responjapanese: this.formcustomer.responjapanese,
            responerglish: this.formcustomer.responerglish,
            responphone: this.formcustomer.responphone,
            responemail: this.formcustomer.responemail,
            conjapanese: '',
            conenglish: '',
            conchinese: '',
            entrustednumber: '',
            papercontract: '',
            state: this.$t('label.PFANS8008FORMVIEW_EFFECTIVE'),
            type: '0',
            maketype: '',
            theme: '',//追加
            temaid: '',
          };
          this.form.tabledata.push(o);
        }
      },
      addRowclaimtype() {
        this.form.tableclaimtype.push({
          contractnumbercount_id: '',
          contractnumber: this.letcontractnumber,
          claimtype: '',
          deliverydate: '',
          completiondate: '',
          claimdate: moment(new Date()).format('YYYY-MM-DD'),
          claimamount: '',
          supportdate: '',
          type: '0',
          maketype: '',
          rowindex: '',
        });
      },
      //契約番号做成
      click() {//111

        this.$refs['refform1'].validate(valid => {
          if (valid) {
            this.form.claimtype = this.form1.claimtype;
            this.form.contractnumber = this.form1.contractnumber;
            this.form.contracttype = this.form1.contracttype;
            this.form.applicationdate = this.form1.applicationdate;
            this.form.entrycondition = this.form1.entrycondition;
            this.form.custojapanese = this.form1.custojapanese;
            if (this.$route.params._id) {
              this.handleClick();
            } else {
              if (this.form.tabledata.length > 0) {
                this.$confirm(this.$t('normal.confirm_iscontinue'), this.$t('normal.info'), {
                  confirmButtonText: this.$t('button.confirm'),
                  cancelButtonText: this.$t('button.cancel'),
                  type: 'warning',
                }).then(() => {
                  this.form.tabledata = [];
                  this.form.tableclaimtype = [];
                  this.handleClick();
                  this.dialogVisibleC = false;
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: this.$t('label.PFANS1026FORMVIEW_YQXSC'),
                  });

                });
              } else {
                this.handleClick();
                this.dialogVisibleC = false;
              }
            }
          } else {
            this.dialogVisibleC = true;
              Message({
                  message: this.$t("normal.error_12"),
                  type: 'error',
                  duration: 5 * 1000
              });
          }
        });
      },
      handleClick() {//222
        //請求方式
        let letclaimtype = '';
        let letbook = '';
        //覚書
        if (this.checked) {
          letclaimtype = this.$t('label.PFANS1024VIEW_LETTERS');
          let letcontractnumber = this.form.contractnumber.split('-');
          if (letcontractnumber.length > 1) {
            letbook = '-' + this.$t('label.PFANS1024VIEW_LETTERS').substring(0, 1) + (parseInt(letcontractnumber[1].substring(1, letcontractnumber[1].length)) + 1).toString();
          } else {
            letbook = '-' + this.$t('label.PFANS1024VIEW_LETTERS').substring(0, 1) + '1';
          }
          this.contractnumbercount = this.form.contractnumber.substr(10, 4).replace('0', '').replace('0', '').replace('0', '');
        }
        let letclaimtypeone = letclaimtype + this.$t('label.PFANS1026FORMVIEW_ONE');
        let letclaimtypetwo = letclaimtype + this.$t('label.PFANS1026FORMVIEW_TWO');
        let letclaimtypethree = letclaimtype + this.$t('label.PFANS1026FORMVIEW_THREE');
        let letclaimtypefour = letclaimtype + this.$t('label.PFANS1026FORMVIEW_FOUR');
        //契約種類简称
        let abbreviation = '';
        let letabbreviation = getDictionaryInfo(this.form.contracttype);
        if (letabbreviation != null) {
          //契約種類
          this.contracttype = letabbreviation.value1;
          abbreviation = letabbreviation.value2;
        }
        //先方組織名编码
        let sidegroup = this.formcustomer.suppliercode;
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
        if (this.contractnumbercount.toString().length === 1) {
          number = '0' + this.contractnumbercount;
        } else if (this.contractnumbercount.toString().length === 2) {
          number = this.contractnumbercount;
        }
        if (this.checked) {
          this.letcontractnumber = this.form.contractnumber.split('-')[0] + letbook;
        } else {
          this.letcontractnumber = abbreviation + applicationdate + entrycondition + this.groupinfo[2] + sidegroup + number + letbook;
        }
        //纳品进步状况=纳品作成完了，如果生成觉书，要在觉书那条把原来的copy过来。
        let isClone = false;
        if (this.checked) {
          for (let i = 0; i < this.form.tabledata.length; i++) {
            this.form.tabledata[i].state = this.$t('label.PFANS8008FORMVIEW_INVALID');
            if (this.form.tabledata[0].deliverycondition == 'HT009002') {
              isClone = true;
            }
          }
        }
        this.addRowdata(isClone);
        this.form.tableclaimtype = [];

        if (this.form.claimtype === 'HT001001') {
          this.addRowclaimtype();
          this.form.tableclaimtype[0].claimtype = letclaimtypeone;
        } else if (this.form.claimtype === 'HT001002') {
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.form.tableclaimtype[0].claimtype = letclaimtypeone;
          this.form.tableclaimtype[1].claimtype = letclaimtypetwo;
        } else if (this.form.claimtype === 'HT001003') {
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.form.tableclaimtype[0].claimtype = letclaimtypeone;
          this.form.tableclaimtype[1].claimtype = letclaimtypetwo;
          this.form.tableclaimtype[2].claimtype = letclaimtypethree;

        } else if (this.form.claimtype === 'HT001004') {
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.addRowclaimtype();
          this.form.tableclaimtype[0].claimtype = letclaimtypeone;
          this.form.tableclaimtype[1].claimtype = letclaimtypetwo;
          this.form.tableclaimtype[2].claimtype = letclaimtypethree;
          this.form.tableclaimtype[3].claimtype = letclaimtypefour;
        }
        if (this.form.contracttype === 'HT014001') {
          this.titleType = this.titleType1;
        } else if (this.form.contracttype === 'HT014002') {
          this.titleType = this.titleType2;
        } else if (this.form.contracttype === 'HT014003') {
          this.titleType = this.titleType3;
        } else if (this.form.contracttype === 'HT014004') {
          this.titleType = this.titleType4;
        }
        this.getChecked(false);
        this.dialogFormVisible = false;
      },
      //契約番号廃棄
      clickDiscard() {
        if (!this.show1) {
          for (let i = 0; i < this.form.tabledata.length; i++) {
            this.form.tabledata[i].state = this.$t('label.PFANS8008FORMVIEW_INVALID');
          }
        }
        this.dialogFormVisible = false;
      },
      //存在check222
      existCheck(contractNumber, index) {
        // this.checkRequired()
        this.loading = true;
        if (contractNumber == null || contractNumber == undefined || contractNumber == '') {
          Message({
            message: this.$t('label.PFANS1026FORMVIEW_QXSQFH'),
            type: 'success',
            duration: 5 * 1000,
          });
          this.loading = false;
          this.dialogBook = false;
          return;
        }
        this.$store.dispatch('PFANS1026Store/existCheck', {contractNumber: contractNumber})
          .then(response => {
            let s = 'count' + index;
            if (response[s] > 0) {
              Message({
                message: this.$t('label.PFANS1026FORMVIEW_QXSCZQSCDQYS'),
                type: 'success',
                duration: 5 * 1000,
              });
            } else {
              var tabledata = {'contractnumber': contractNumber, 'rowindex': index};
              this.handleSaveContract(index, this.makeintoBaseInfo, tabledata);
            }
            this.loading = false;
            this.dialogBook = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
            this.dialogBook = false;
          });
      },
      //書類作成
      clickData(val) {
        this.existCheck(this.letcontractnumber, val);
      },
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1024View',
          params: {
            title: 10,
          },
        });
      },
      //保存
      handleSave(value) {
        let baseInfo = {};
        baseInfo.contractapplication = [];
        baseInfo.contractnumbercount = [];
        for (let i = 0; i < this.form.tabledata.length; i++) {
          let o = {};
          Object.assign(o, this.form.tabledata[i]);
          o.contractdate = this.getcontractdate(this.form.tabledata[i].contractdate);
          this.form.tabledata[i].contracttype = this.form.contracttype;
          o.contracttype = this.form.tabledata[i].contracttype;
          if (this.form.contracttype === 'HT014001') {
            o.maketype = '1';
          } else if (this.form.contracttype === 'HT014002') {
            o.maketype = '2';
          } else if (this.form.contracttype === 'HT014003') {
            o.maketype = '3';
          } else if (this.form.contracttype === 'HT014004') {
            o.maketype = '4';
          }
          if (this.form.tabledata[i].state === this.$t('label.PFANS8008FORMVIEW_EFFECTIVE')) {
            let letclaimamount = 0;
            for (let j = 0; j < this.form.tableclaimtype.length; j++) {
              letclaimamount = letclaimamount + Number(this.form.tableclaimtype[j].claimamount);
            }
            o.claimamount = letclaimamount;
          }
          if (Array.isArray(this.form.tabledata[i].conchinese)) {
            o.conchinese = this.form.tabledata[i].conchinese.join(',');
          }
          baseInfo.contractapplication.push(o);
        }
//        baseInfo.contractapplication = this.tabledata;
        baseInfo.contractnumbercount = this.form.tableclaimtype;
        this.makeintoBaseInfo = {};
        this.makeintoBaseInfo = baseInfo;
        if (value === 'makeinto') {
          this.handleIndexDisabled();
        } else {

          this.handleSaveContract(value, baseInfo);

        }
      },
      //contractapplication save
      handleSaveContract(value, baseInfo, tabledata) {
        this.validateByType(value, valid => {
          if (valid) {
            this.loading = true;
            if (this.$route.params._id) {
              this.$store.dispatch('PFANS1026Store/update', baseInfo)
                .then(response => {
                  this.data = response;
                  if (tabledata) {
                    this.handleSaveNumber(tabledata);
                  } else {
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
                    this.paramsTitle();
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
              this.$store.dispatch('PFANS1026Store/insert', baseInfo)
                .then(response => {
                  this.data = response;
                  if (tabledata) {
                    this.handleSaveNumber(tabledata);
                  } else {
                    Message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
                    this.paramsTitle();
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
              message: this.$t('normal.success_02'),
              type: 'success',
              duration: 5 * 1000,
            });
            this.paramsTitle();
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
//              }
//            });
      },
      //indexDisabled
      handleIndexDisabled() {
        if (this.letcontractnumber == null || this.letcontractnumber == undefined || this.letcontractnumber == '') {
          Message({
            message: this.$t('label.PFANS1026FORMVIEW_QXSQFH'),
            type: 'error',
            duration: 5 * 1000,
          });
          return;
        }
        this.loading = true;
        this.$store.dispatch('PFANS1026Store/existCheck', {contractNumber: this.letcontractnumber})
          .then(response => {
            this.dialogBook = true;
            if (response.count7 === 0) {
              this.disabledCount7 = false;
            } else {
              this.disabledCount7 = true;
            }
            // let error = 0;
            // for (let i = 0; i < this.form.tabledata.length; i++) {
            //   if (this.form.tabledata.currencyposition == undefined || this.form.tabledata.contractdate == undefined) {
            //     error = error + 1;
            //   }
            // }
            // for (let i = 0; i < this.form.tableclaimtype.length; i++) {
            //   if (this.form.tableclaimtype.deliverydate == undefined) {
            //     error = error + 1;
            //   }
            // }
            // if (error != 0) {
            //   Message({
            //     message: this.$t('normal.error_08') +
            //       this.$t('label.PFANS1024VIEW_CONTR'),
            //     type: 'error',
            //     duration: 5 * 1000,
            //   });
            // }
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
        if (val === 'application') {
          this.display = true;
          this.checkeddisplay = true;
          this.dialogVisibleC = true;
          this.show1 = true;
          this.show2 = false;
          if (!this.$route.params._id) {

            /*this.form1.claimtype = 'HT001001';
            this.form1.contracttype = 'HT014001';
            this.form1.applicationdate = 'HT007001';
            this.form1.entrycondition = 'HT003001';*/
          } else {
            this.getChecked(true);
          }
        }
        if (val === 'cancellation') {
          for (let i = 0; i < this.form.tabledata.length; i++) {
            this.form.tabledata[i].state = this.$t('label.PFANS8008FORMVIEW_INVALID');
            this.form.tabledata[i].entrycondition = 'HT004001';
          }
          this.handleSave('cancellation');
        }
        if (val === 'save') {
          this.handleSave('save');
        }
        if (val === 'makeinto') {
          this.handleSave('makeinto');
        }
      },
      validateByType: function(type, cb) {
        debugger
        let that = this;
        let countIndex = 0;
        let rowCount = that.form.tabledata.length || 0;
        let rowCount2 = that.form.tableclaimtype.length || 0;
        let myRule = this.ruleSet[type] || [];

        if (myRule.length <= 0) {
          cb(true);
        }
        this.$refs['refform'].clearValidate();
        let pros = [];
        myRule.forEach(function(item, index, array) {
          debugger
          let dataName = 'tabledata';
          let maxCount = rowCount;
          if (['deliverydate', 'completiondate', 'claimdate', 'supportdate', 'claimamount'].indexOf(item) >= 0) {
            dataName = 'tableclaimtype';
            maxCount = rowCount2;
            for (var k = 0; k < maxCount; k++) {
              var itIndex = dataName + '.' + k + '.' + item;
              let pro = new Promise(function(resolve, reject) {
                that.$refs['refform'].validateField(itIndex, function(msg) {
                  if(msg != ""){
                    countIndex++;
                  }
                  resolve(msg);
                });
              });
              pros.push(pro);
            }
          } else if (rowCount > 0) {
            var itIndex = dataName + '.' + (rowCount - 1) + '.' + item;
            let pro = new Promise(function(resolve, reject) {
              that.$refs['refform'].validateField(itIndex, function(msg) {
                if(msg != ""){
                  countIndex++;
                }
                resolve(msg);
              });
            });
            pros.push(pro);
          }

        });
        if (pros.length == 0) {
          cb();
          return;
        }
        Promise.all(pros).then(function(values) {
          let isOk = true;
          values.forEach(function(val) {
            if (val != undefined && val != '') {
              isOk = false;
            }
          });
          cb(isOk);
        });
        if(countIndex > 0){
          Message({
            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CONTR'),
            type: 'error',
            duration: 5 * 1000,
          });
        }
      },
    },
  };
</script>

<style scoped>

</style>
