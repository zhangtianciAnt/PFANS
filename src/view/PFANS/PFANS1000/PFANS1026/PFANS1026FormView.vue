<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container"
                         :title="title"
                         @buttonClick="buttonClick"
                         v-loading="loading"
                         :buttonList="buttonList">
      <div slot="customize">
        <el-form :model="form1" :rules="rules1" label-width="8vw" label-position="top" ref="refform1">
          <el-dialog :title="$t('button.application')" :visible.sync="dialogFormVisible">
            <el-form-item :label="$t('label.PFANS1024VIEW_NUMBER')" :label-width="formLabelWidth" v-if="display"
                          :error="errorclaimtype" prop="claimtype">
              <!--              <dicselect-->
              <!--                :code="code"-->
              <!--                :data="form1.claimtype"-->
              <!--                :multiple="multiple"-->
              <!--                @change="getnumber"-->
              <!--                style="width: 20vw">-->
              <!--              </dicselect>-->
              <el-input-number
                step-strictly
                :max="1000000000"
                :min="1"
                :precision="0"
                :step="1"
                controls-position="right"
                style="width:20vw"
                v-model="form1.claimtype"
                @change="getnumber"
              ></el-input-number>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_ORIGINALCONTRACT')" :label-width="formLabelWidth"
                          v-show="show3">
              <!--              add-lyt-21/3/10-NT_PFANS_20210226_BUG_029-将‘!disabled1’修改为‘!disabled2’-start-->
              <el-input v-model="form1.contractnumber" style="width: 20vw" :disabled="!disabled2"></el-input>
              <!--              add-lyt-21/3/10-NT_PFANS_20210226_BUG_029-将‘!disabled1’修改为‘!disabled2’-end-->
              <el-checkbox
                v-if="checkeddisplay"
                v-model="checked"
                disabled
                @change="getChecked"
              >{{$t('label.PFANS1024VIEW_LETTERS')}}
              </el-checkbox>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" :label-width="formLabelWidth"
                          :error="errorcontracttype" prop="contracttype">
              <dicselect :code="code2"
                         :data="form1.contracttype"
                         @change="getcontracttype"
                         style="width: 20vw"
                         :disabled="!disabled2">
              </dicselect>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_CAREERYEAR')" :label-width="formLabelWidth"
                          :error="errorapplicationdate" prop="applicationdate">
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
            <el-form-item :label="$t('label.department')" :label-width="formLabelWidth" prop="grouporglist"
                          :error="errorgroup">
              <org :orglist="form1.grouporglist"
                   orgtype="4"
                   style="width: 20vw"
                   :error="errorgroup"
                   @getOrgids="getGroupId"
                   :disabled="!disabled2"
              ></org>
            </el-form-item>
            <div class="dialog-footer" align="center">
              <el-button @click="click" v-if="show1">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_CONTRACTNUMBER')}}
                  </span>
              </el-button>
              <el-button slot="reference" @click="clickDiscard" v-if="show2">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_ABANDONED')}}
                  </span>
              </el-button>
            </div>
          </el-dialog>

        </el-form>
        <el-form :model="form" label-width="8vw" label-position="top" style="padding: 2vw"
                 ref="refform">

          <el-dialog :visible.sync="dialogBook" width="30%">
            <div class="dialog-footer" align="center">
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="clickData(1)">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_VALUATION')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="clickData(2)">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_JUDGMENT')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="clickData(3)">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_CONTRACT')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="clickData(4)">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_AWARD')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="clickData(5)">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_NAPALM')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="clickData(6)">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_REQUEST')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-dialog>
          <span>{{this.titleType}}</span>
          <el-table :data="form.tabledata" stripe header-cell-class-name="sub_bg_color_grey height"
                    :header-cell-style="getRowClass1">
            <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content"
                             type="index" width="50"></el-table-column>
            <el-table-column :label="$t('label.department')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem"
                            maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.deployment'" :rules='rules.deployment'>
                  <el-input v-model="scope.row.deployment" :disabled="!disabled3" style="width: 11rem"
                            maxlength='36'></el-input>
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
            <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200"
                             :error="erroruser">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.user_id'">
                  <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType"
                        :userlist="scope.row.user_id"
                        @getUserids="getUserids" style="width: 10.15rem"></user>
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
            <!--            upd-ws-01/16-禅道任务710-->
            <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
              <template slot-scope="scope">
                <el-form-item prop="theme" :prop="'tabledata.' + scope.$index + '.theme'" >
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
                           size="40%"
                           append-to-body>
                  <div>
                    <el-select @change="changed" v-model="region">
                      <el-option :label="$t(titleB)" value="1"></el-option>
                      <el-option :label="$t(titleC)" value="2"></el-option>
                    </el-select>
                    <el-table
                      :data="tableB.filter(data => !search1 || data.themename.toLowerCase().includes(search1.toLowerCase()))"
                      height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                      @row-click="handleClickChange"
                      v-loading='loading'>
                      <el-table-column property="themename"
                                       :label="$t('label.PFANS1043FORMVIEW_THEMENAME')"
                                       width="120" show-overflow-tooltip></el-table-column>
                      <el-table-column property="divide"
                                       :label="$t('label.PFANS1039FORMVIEW_TEAM')"
                                       width="120" show-overflow-tooltip></el-table-column>
                      <el-table-column property="contract"
                                       :label="$t('label.PFANS1043FORMVIEW_CONTRACT')"
                                       width="120" show-overflow-tooltip></el-table-column>
                      <el-table-column property="currency"
                                       :label="$t('label.PFANS8011VIEW_CURRENCY')"
                                       width="120" show-overflow-tooltip></el-table-column>
                      <el-table-column
                        align="right" width="230">
                        <template slot="header" slot-scope="scope">
                          <el-input
                            v-model="search1"
                            size="mini"
                            :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME3')"/>
                        </template>
                      </el-table-column>
                    </el-table>

                  </div>
                </el-dialog>
              </template>
            </el-table-column>
            <!--            upd-ws-01/16-禅道任务710-->
            <el-table-column :label="$t('label.PFANS1024VIEW_EXTENSIONDATE')" align="center" prop="extensiondate"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.extensiondate'">
                  <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.extensiondate"
                                  style="width: 11rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS1024VIEW_EXTENSIONREASON')" align="center" prop="extensionreason"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.extensionreason'">
                  <el-input type="textarea"
                            :rows="2" :disabled="!disabled" v-model="scope.row.extensionreason"
                            style="width: 11rem"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--            DEL_FJL-->
            <!--            纳品推进状况-->
            <!--            <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">-->
            <!--              <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center" prop="deliverycondition"-->
            <!--                               width="200">-->
            <!--                <template slot-scope="scope">-->
            <!--                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">-->
            <!--                    <dicselect-->
            <!--                      :code="code6"-->
            <!--                      :data="scope.row.deliverycondition"-->
            <!--                      :no="scope.row"-->
            <!--                      :multiple="multiple"-->
            <!--                      @change="getDeliverycondition"-->
            <!--                      style="width: 11rem"-->
            <!--                      :disabled="!disabled">-->
            <!--                    </dicselect>-->
            <!--                  </el-form-item>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--              <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center" prop="delivery" width="200">-->
            <!--                <template slot-scope="scope">-->
            <!--                  <el-form-item :prop="'tabledata.' + scope.$index + '.delivery'">-->
            <!--                    <dicselect-->
            <!--                      :code="code7"-->
            <!--                      :data="scope.row.delivery"-->
            <!--                      :no="scope.row"-->
            <!--                      :multiple="multiple"-->
            <!--                      @change="getDelivery"-->
            <!--                      style="width: 11rem"-->
            <!--                      :disabled="!disabled">-->
            <!--                    </dicselect>-->
            <!--                  </el-form-item>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--            </el-table-column>-->
            <!--&lt;!&ndash;            请求推进状况&ndash;&gt;-->
            <!--            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">-->
            <!--              <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center" prop="claimcondition"-->
            <!--                               width="200">-->
            <!--                <template slot-scope="scope">-->
            <!--                  <el-form-item :prop="'tabledata.' + scope.$index + '.claimcondition'">-->
            <!--                    <dicselect-->
            <!--                      :code="code8"-->
            <!--                      :data="scope.row.claimcondition"-->
            <!--                      :no="scope.row"-->
            <!--                      :multiple="multiple"-->
            <!--                      @change="getClaimcondition"-->
            <!--                      style="width: 11rem"-->
            <!--                      :disabled="!disabled">-->
            <!--                    </dicselect>-->
            <!--                  </el-form-item>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--              <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center" prop="claim" width="200">-->
            <!--                <template slot-scope="scope">-->
            <!--                  <el-form-item :prop="'tabledata.' + scope.$index + '.claim'">-->
            <!--                    <dicselect-->
            <!--                      :code="code7"-->
            <!--                      :data="scope.row.claim"-->
            <!--                      :no="scope.row"-->
            <!--                      :multiple="multiple"-->
            <!--                      @change="getClaim"-->
            <!--                      style="width: 11rem"-->
            <!--                      :disabled="!disabled">-->
            <!--                    </dicselect>-->
            <!--                  </el-form-item>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--            </el-table-column>-->
            <!--            DEL_FJL-->
            <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.currencyposition'" :rules='rules.currencyposition'>
                  <!--                      add-ws-12/10-汇率字典-->
                  <!--                  <dicselect-->
                  <!--                    :code="code9"-->
                  <!--                    :data="scope.row.currencyposition"-->
                  <!--                    :no="scope.row"-->
                  <!--                    :multiple="multiple"-->
                  <!--                    @change="getCurrencyposition"-->
                  <!--                    style="width: 11rem"-->
                  <!--                    :disabled="!disabled">-->
                  <!--                  </dicselect>-->
                  <monthlyrate :month="month9"
                               :data="scope.row.currencyposition"
                               :no="scope.row"
                               :multiple="multiple"
                               @change="getCurrencyposition"
                               style="width: 11rem"
                               :disabled="!disabled">
                  </monthlyrate>
                  <!--                      add-ws-12/10-汇率字典-->
                  <!--<el-select :no="scope.row" v-model="scope.row.currencyposition" @change="(val)=>{getCurrencyposition(val,scope.row)}" style="width: 11rem" :disabled="!disabled">-->
                  <!--<el-option v-for="(item,index) in options" :key="index" :value="item.value">-->
                  <!--{{item.value}}-->
                  <!--</el-option>-->
                  <!--</el-select>-->
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1026VIEW_CONTRACTPERIOD')" align="center" prop="claimdatetime"
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
            <!-- zy-7/6-禅道216任务-->
            <el-table-column :label="$t('label.PFANS1026FORMVIEW_CLAIMAMOUNT')" align="center" prop="claimamount"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.claimamount'">
                  <el-input :disabled="true" maxlength="20" v-model="scope.row.claimamount">
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!-- zy-7/6-禅道216任务-->
            <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center">
              <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center" prop="conchinese" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.conchinese'" :rules='rules.conchinese'>
                    <!--                    <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true"-->
                    <!--                             v-model="scope.row.conchinese"-->
                    <!--                             @change="changePro" :disabled="!disabled">-->
                    <!--                    </project>-->
                    <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.conchinese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.conjapanese'" :rules='rules.conjapanese'>
                    <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.conjapanese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center" prop="conenglish" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.conenglish'" :rules='rules.conenglish'>
                    <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.conenglish">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center">
              <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese"
                               width="200" :error="errorcusto">
                <template slot-scope="scope">
                  <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
                  <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
                  <el-form-item :prop="'tabledata.' + scope.$index + '.custojapanese'" :rules='rules.custojapanese'>
                    <div class="">
                      <el-input class="content bg"
                                :disabled="!disabled"
                                v-model="scope.row.custojapanese">
                        <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search"
                                   @click="handleClickA(scope.row)"></el-button>
                      </el-input>
                    </div>
                  </el-form-item>
                  <el-dialog :visible.sync="dialogVisibleA"
                             top="8vh"
                             append-to-body>
                    <el-table
                      :data="dataA.filter(data => !search || data.custchinese.toLowerCase().includes(search.toLowerCase()))"
                      :row-key="rowid" @row-click="rowClick" max-height="400" ref="roletableA"
                      v-loading='loading'>
                      <el-table-column show-overflow-tooltip property="custchinese"
                                       :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')"
                                       width="120"></el-table-column>
                      <el-table-column show-overflow-tooltip property="thecompany"
                                       :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')"
                                       width="120"></el-table-column>
                      <el-table-column show-overflow-tooltip property="liableperson"
                                       :label="$t('label.ASSETS1002VIEW_USERID')"
                                       width="120"></el-table-column>
                      <el-table-column show-overflow-tooltip property="prochinese"
                                       :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')"
                                       width="120"></el-table-column>
                      <el-table-column show-overflow-tooltip property="protelephone"
                                       :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')"
                                       width="120"></el-table-column>
                      <el-table-column
                        align="right" width="205">
                        <template slot="header" slot-scope="scope">
                          <el-input
                            v-model="search"
                            size="mini"
                            placeholder="请输入客户名称关键字搜索"/>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-dialog>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center" prop="custoenglish"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.custoenglish'" :rules='rules.custoenglish'>
                    <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.custoenglish">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center" prop="custoabbreviation"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.custoabbreviation'"
                                :rules='rules.custoabbreviation'>
                    <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.custoabbreviation">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center" prop="custochinese"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.custochinese'" :rules="rules.custochinese">
                    <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.custochinese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" align="center" prop="businesscode"
                             width="200" :error="errorcode">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.businesscode'" :rules="rules.businesscode">
                  <el-input :disabled="true" style="width: 11rem" v-model="scope.row.businesscode">
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_VARTO')" align="center" prop="varto" width="200">
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
              <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.placejapanese'" :rules='rules.placejapanese'>
                    <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.placejapanese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center" prop="placeenglish"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.placeenglish'" :rules='rules.placeenglish'>
                    <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.placeenglish">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center" prop="placechinese"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.placechinese'" :rules='rules.placechinese'>
                    <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.placechinese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center">
              <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.responjapanese'">
                    <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.responjapanese">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center" prop="responerglish"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.responerglish'" :rules='rules.responerglish'>
                    <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.responerglish">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center" prop="responphone" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.responphone'" :rules='rules.responphone'>
                    <el-input maxlength="100" :disabled="!disabled" v-model="scope.row.responphone">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center" prop="responemail" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.responemail'">
                    <el-input maxlength="100" :disabled="!disabled" v-model="scope.row.responemail">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column v-if="false">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.regindiff'">
                    <el-input :disabled="!disabled" maxlength="100" v-model="scope.row.regindiff">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
            <!--            DEL_FJL-->
            <!--            <el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center" prop="qingremarks"-->
            <!--                             width="200">-->
            <!--              <template slot-scope="scope">-->
            <!--                <el-form-item :prop="'tabledata.' + scope.$index + '.qingremarks'">-->
            <!--                  <el-input :disabled="!disabled" v-model="scope.row.qingremarks">-->
            <!--                  </el-input>-->
            <!--                </el-form-item>-->
            <!--              </template>-->
            <!--            </el-table-column>-->
            <!--            DEL_FJL-->
            <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center" prop="remarks" width="200">
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
            <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center" prop="state">
            </el-table-column>
          </el-table>
          <el-table :data="form.tableclaimtype" stripe header-cell-class-name="sub_bg_color_grey height"
                    :header-cell-style="getRowClass1" style="padding-top: 2vw"
                    @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="40">
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center" prop="claimtype" width="130">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input :disabled="!disabled3" :no="scope.row" v-model="scope.row.claimtype">
                  </el-input>
                </el-form-item>
              </template>
              <!--222-->
            </el-table-column>
            <!--            请求期间  ADD_FJL-->
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetimeqh"
                             width="370">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.claimdatetimeqh'"
                              :rules='rules.claimdatetimeqh'>
                  <el-date-picker unlink-panels
                                  class="bigWidth"
                                  :disabled="scope.row.npbook ? true : !disabled"
                                  v-model="scope.row.claimdatetimeqh"
                                  type="daterange"
                                  :end-placeholder="$t('label.enddate')"
                                  :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                  :start-placeholder="$t('label.startdate')"
                  ></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <!--            纳品推进状况-->
            <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYCONDITION')" align="center">
              <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center" prop="deliveryconditionqh"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableclaimtype.' + scope.$index + '.deliveryconditionqh'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliveryconditionqh"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliveryconditionqh"
                      style="width: 11rem"
                      :disabled="true">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center" prop="deliveryqh" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableclaimtype.' + scope.$index + '.deliveryqh'">
                    <dicselect
                      :code="code7"
                      :data="scope.row.deliveryqh"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliveryqh"
                      style="width: 11rem"
                      :disabled="scope.row.npbook ? true : !disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
            <!--            请求推进状况-->
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMCONDITION')" align="center">
              <el-table-column :label="$t('label.PFANS1026VIEW_SITUATION')" align="center" prop="claimconditionqh"
                               width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableclaimtype.' + scope.$index + '.claimconditionqh'">
                    <dicselect
                      :code="code8"
                      :data="scope.row.claimconditionqh"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getClaimconditionqh"
                      style="width: 11rem"
                      :disabled="true">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1026VIEW_ELEPHANT')" align="center" prop="claimqh" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableclaimtype.' + scope.$index + '.claimqh'">
                    <dicselect
                      :code="code7"
                      :data="scope.row.claimqh"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getClaimqh"
                      style="width: 11rem"
                      :disabled="scope.row.npbook ? true : !disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
            <!--             ADD_FJL-->
            <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.deliverydate'" :rules='rules.deliverydate'>
                  <el-date-picker :disabled="scope.row.npbook ? true : !disabled" type="date" v-model="scope.row.deliverydate"
                                  style="width: 11rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.completiondate'"
                              :rules='rules.completiondate'>
                  <el-date-picker :disabled="scope.row.npbook ? true : !disabled" type="date" v-model="scope.row.completiondate"
                                  style="width: 11rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')" align="center"
                             prop="deliveryfinshdate"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.deliveryfinshdate'"
                              :rules='rules.deliveryfinshdate'>
                  <el-date-picker :disabled="scope.row.npbook ? true : !disabled" type="date" v-model="scope.row.deliveryfinshdate"
                                  style="width: 11rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" align="center"
                             width="200" prop="loadingjudge">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.loadingjudge'" :rules='rules.loadingjudge'>
                  <user :disabled="scope.row.npbook ? true : !disabled" :no="scope.row" :selectType="selectType"
                        :userlist="scope.row.loadingjudge"
                        @getUserids="getJudge" style="width: 10.15rem"></user>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate" width="170">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.claimdate'" :rules='rules.claimdate'>
                  <el-date-picker :disabled="scope.row.npbook ? true : !disabled" type="date" v-model="scope.row.claimdate"
                                  style="width: 9.5rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"
                             width="170">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.supportdate'" :rules='rules.supportdate'>
                  <el-date-picker :disabled="scope.row.npbook ? true : !disabled" type="date" v-model="scope.row.supportdate"
                                  style="width: 9.5rem"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" prop="claimamount"
                             width="190">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.claimamount'" :rules='rules.claimamount'>
                  <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem"
                                   :disabled="scope.row.npbook ? true : !disabled" :min="0" :max="1000000000" :precision="2"
                                   @change="changeclaimamount(scope.row)"></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center" prop="qingremarksqh"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.qingremarksqh'">
                  <el-input :disabled="scope.row.npbook ? true : !disabled" v-model="scope.row.qingremarksqh">
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--            ADD_FJL-->
            <el-table-column :label="$t('label.PFANS1026FORMVIEW_RECOVERYSTATUS')" align="center" prop="recoverystatus"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.recoverystatus'">
                  <el-select
                    :disabled="(scope.row.claimconditionqh === 'HT011003' && scope.row.deliveryconditionqh === 'HT009003' && scope.row.letrecoverystatus === '0') ? false : true"
                    :placeholder="$t('normal.error_09')" @change="onRecoverystatus(scope.row)"
                    clearable v-model="scope.row.recoverystatus">
                    <el-option
                      clearable
                      v-for="item in optionsrestatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1026FORMVIEW_RECOVERYDATE')" align="center" prop="recoverydate"
                             width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.recoverydate'">
                  <el-date-picker
                    :disabled="(scope.row.claimconditionqh === 'HT011003' && scope.row.deliveryconditionqh === 'HT009003' && scope.row.letrecoverystatus === '0') ? false : true"
                    style="width: 9.5rem" type="date" v-model="scope.row.recoverydate"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <!--            ADD_FJL-->
            <el-table-column :label="$t('label.PFANS1024VIEW_REMARKS')" align="center" prop="remarksqh" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.remarksqh'">
                  <el-input :disabled="scope.row.npbook ? true : !disabled" v-model="scope.row.remarksqh">
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--            <el-table-column :label="$t('label.operation')" align="center" width="200">-->
            <!--              <template slot-scope="scope">-->
            <!--                <el-button-->
            <!--                  :disabled="!disabled"-->
            <!--                  @click.native.prevent="viewBook(scope.$index, form.tableclaimtype)"-->
            <!--                  plain-->
            <!--                  size="small"-->
            <!--                  type="primary"-->
            <!--                >{{$t('button.view')}}-->
            <!--                </el-button>-->
            <!--                <el-button-->
            <!--                  :disabled="!disabled"-->
            <!--                  @click="submMon()"-->
            <!--                  plain-->
            <!--                  size="small"-->
            <!--                  type="primary"-->
            <!--                >{{$t('button.submmon')}}-->
            <!--                </el-button>-->
            <!--              </template>-->
            <!--            </el-table-column>-->
            <el-table-column
              :label="$t('label.operation')"
              align="center"
              width="200">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRowclaimtype1(scope.$index, form.tableclaimtype)"
                  plain
                  :disabled="scope.row.npbook"
                  size="small"
                  type="danger"
                >{{$t('button.delete')}}
                </el-button>
                <el-button
                  @click="addRowclaimtype1(form.tableclaimtype)"
                  plain
                  :disabled="scope.row.npbook"
                  size="small"
                  type="primary"
                >{{$t('button.insert')}}
                </el-button>
                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.bookStatus'">
                  <el-input v-if="false" v-model="scope.row.bookStatus">
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="form.tablecompound" stripe border header-cell-class-name="sub_bg_color_blue"
                    style="padding-top: 2vw" v-if="displaycompound">
            <el-table-column
              :label="$t('label.PFANS1024VIEW_CLAIMTYPE')"
              align="center"
              width="200">
              <template slot-scope="scope">
                <el-select clearable v-model="scope.row.claimtype"
                           :placeholder="$t('normal.error_09')" @change="changeclaimtype(scope.row)" :disabled="bookStatuss ? true : !disabled">
                  <el-option
                    clearable
                    v-for="item in optionscompound"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('label.department')"
              align="center"
              width="240">
              <template slot-scope="scope">
                <org :no="scope.row" :orglist="scope.row.group_id" @getOrgids="getEntrustgroupId"
                     orgtype="4" style="width:90%" :disabled="bookStatuss ? true : !disabled"></org>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')"
              align="center"
              width="200">
              <template slot-scope="scope">
                <el-input :disabled="true" v-model="scope.row.claimamount"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('label.PFANS5009FORMVIEW_AMOUNTALLOCATED')"
              align="center"
              width="200">
              <template slot-scope="scope">
                <el-input-number
                  :max="Number(scope.row.claimamount)"
                  :min="0"
                  :precision="2"
                  controls-position="right"
                  style="width: 100%"
                  v-model="scope.row.contractrequestamount"
                  :disabled="bookStatuss ? true : !disabled"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('label.operation')"
              align="center"
              width="200">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRowcompound(scope.$index, form.tablecompound)"
                  plain
                  size="small"
                  type="danger"
                  :disabled="bookStatuss ? true : !disabled"
                >{{$t('button.delete')}}
                </el-button>
                <el-button
                  @click="addRowcompound()"
                  plain
                  size="small"
                  type="primary"
                  :disabled="bookStatuss ? true : !disabled"
                >{{$t('button.insert')}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--add-ws-6/22-禅道152任务-->
          <el-table
            :data="DataList"
            style="padding-top: 2vw"
            header-cell-class-name="sub_bg_color_grey height" stripe
            :header-cell-style="getRowClass1"
            v-if='checkdata'
          >
            <el-table-column
              align="center"
              prop="award"
              :label="$t('label.PFANS1022FORMVIEW_KIND')"
              width="320px">
            </el-table-column>
            <el-table-column
              align="center"
              prop="awardtype"
              :label="$t('label.PFANS1024VIEW_CLAIMTYPE')"
              width="320px">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createon"
              :label="$t('label.PFANS1024VIEW_CREATEON')"
              width="320px">
            </el-table-column>
            <el-table-column :label="$t('label.operation')" align="center" width="220">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="viewdata(scope.row)"
                  plain
                  :disabled="show10"
                  size="small"
                  type="primary"
                >{{$t('button.open')}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- add-ws-6/22-禅道152任务-->
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import {getDictionaryInfo, getOrgInfo, getUserInfo, getOrgInfoByUserId,getOrgInformation} from '@/utils/customize';
  import user from '../../../components/user.vue';
  import org from '../../../components/org';
  import moment from 'moment';
  import ElInput from '../../../../../node_modules/element-ui/packages/input/src/input.vue';
  import ElFormItem from '../../../../../node_modules/element-ui/packages/form/src/form-item.vue';
  import monthlyrate from '../../../components/monthlyrate';
  import {getCurrentRole,getCurrentRoleeditnapin} from "../../../../utils/customize";

  export default {
    name: 'PFANS1026View',
    components: {
      monthlyrate,
      ElFormItem,
      ElInput,
      EasyNormalContainer,
      dicselect,
      user,
      org,
      EasyNormalTable,
    },
    data() {
      var validateDeployment = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_KFBS')));
        } else {
          callback();
        }
      };
      var validateClaimdatetime = (rule, value, callback) => {
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
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CURRENCYPOSITION')));
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
      var validateclaimdatetimeqh = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_CERROR')));
        } else {
          callback();
        }
      };
      var validateDeliveryfinshdate = (rule, value, callback) => {
        if (value === '' || value === null) {
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
      //add-ws-01/06-禅道任务710
      var validateTheme = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_THEME')));
        } else {
          callback();
        }
      };
//add-ws-01/06-禅道任务710
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
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_CHECKPHONE')));
        } else {
          callback();
        }
      };
      var validateConjapanese = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_XMHW')));
        } else {
          callback();
        }
      };
      var validateConenglish = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANS1026FORMVIEW_XMYW')));
        } else {
          callback();
        }
      };
      var validateConchinese = (rule, value, callback) => {
        if (Array.isArray(value)) {
          if (value.length == 0) {
            callback(new Error(this.$t('label.PFANS1026FORMVIEW_XMZW')));
            return;
          }
          value.map(function(item) {
            if (item === '') {
              callback(new Error(this.$t('label.PFANS1026FORMVIEW_XMZW')));

            }
          });
          callback();
        } else {
          if (value === '' && value != null && value != undefined) {
            callback(new Error(this.$t('label.PFANS1026FORMVIEW_XMZW')));
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
      //ADD_FJL 资金回收状况
      // var validateRecoverystatus = (rule, value, callback) => {
      //     if (value === '' && value != null && value != undefined) {
      //         callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1026FORMVIEW_RECOVERYSTATUS')));
      //     } else {
      //         callback();
      //     }
      // };
      // var validateRecoverydate = (rule, value, callback) => {
      //     if (value === '' && value != null && value != undefined) {
      //         callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1026FORMVIEW_RECOVERYDATE')));
      //     } else {
      //         callback();
      //     }
      // };
      var groupId = (rule, value, callback) => {
        if (!this.form1.grouporglist || this.form1.grouporglist === '') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.department')));
          this.errorgroup = this.$t('normal.error_08') + this.$t('label.department');
        } else {
          callback();
        }
      };
      var checkApplicationdate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1024VIEW_CAREERYEAR')));
          this.errorapplicationdate = this.$t('normal.error_09') + this.$t('label.PFANS1024VIEW_CAREERYEAR');
        } else {
          callback();
        }
      };
      return {
        judgementdisable: false,
        bookStatuss:false,
        //add-ws-6/22-禅道152任务
        show10: true,
        IDname: '',
        checkdata: false,
        DataList: [{}],
        //add-ws-6/22-禅道152任务
        search: '',
        //add-ws-01/06-禅道任务710
        search1: '',
        //add-ws-01/06-禅道任务710
        checkGroupId: false,
        makeintoBaseInfo: {},
        tableclaimtypeAnt: [],
        titleType: '',
        titleType1: this.$t('label.PFANS1026VIEW_OVERSEAS'),
        titleType2: this.$t('label.PFANS1026VIEW_TECHNICAL'),
        titleType3: this.$t('label.PFANS1026VIEW_OVERSEASTRUST'),
        titleType4: this.$t('label.PFANS1026VIEW_OVERSEASSERVICE'),
        titleType5: this.$t('label.PFANS1026VIEW_DOMESTIC'),
        titleType6: this.$t('label.PFANS1026VIEW_DOMESTICTRUST'),
        titleType7: this.$t('label.PFANS1026VIEW_DOMESTICSERVICE'),
        titleType8: this.$t('label.PFANS1026VIEW_TRUST'),
        titleType9: this.$t('label.PFANS1026VIEW_SELL'),
        options: [],
        activeDisabledArrays: [
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
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
        existFlg: true,
        checked: false,
        checkeddisplay: true,
        index: '',
        dialogFormVisible: false,
        dialogBook: false,
        display: true,
        displaycompound: false,
        grouporglist: '',
        groupinfo: ['', '', '', ''],
        errorgroup: '',
        errorclaimtype: '',
        errorcontracttype: '',
        errorapplicationdate: '',
        maketype: '',
        letcontractnumber: '',
        contractnumbercount: '',
        letcontracttype: '',
        loading: false,
        selectType: 'Single',
        title: 'title.PFANS1026VIEW',
        multipleSelection: [],
        contractapplication: {},
        activeName: '',
        activeClaimtype: '',
        erroruser: '',
        errorjudge: '',
        errorcusto: '',
        errorcode: '',
        errorfirstjudge: '',
        errorsecondjudge: '',
        erroroutmanager: '',
        errormanager: '',
        disabled: true,
        disabled1: false,
        disabled2: true,
        disabled3: false,
        disabled4: false,
        recoverys: true,
        optionscompound: [],
        optionsrestatus: [{
          value: '0',
          label: this.$t('label.PFANS1026FORMVIEW_RECOVERYOFF'),
        }, {
          value: '1',
          label: this.$t('label.PFANS1026FORMVIEW_RECOVERYON'),
        },
        ],
        multiple: false,
        rowindex: '',
        ruleSet: {
          // , 'theme'
          'save': ['contractnumber','claimdatetime', 'theme', 'varto', 'deliverydate', 'completiondate', 'deliveryfinshdate', 'completiondate', 'loadingjudge'],
          'makeinto': ['contractnumber'],
          '1': ['supportdate', 'conenglish', 'deliverydate', 'completiondate', 'deliveryfinshdate', 'custojapanese', 'conchinese', 'conjapanese', 'custochinese', 'placejapanese', 'placechinese', 'deployment', 'claimdatetime', 'currencyposition', 'claimamount', 'loadingjudge'],
          // 该非判定书
          '2': ['custojapanese', 'deployment', 'claimdatetime', 'varto'],
          // 契约书作成
          '3': ['custojapanese', 'conchinese', 'conjapanese', 'custochinese', 'placejapanese', 'placechinese', 'deployment', 'claimdatetime', 'currencyposition', 'claimamount', 'deliverydate', 'completiondate', 'claimdate', 'supportdate'],
          // 决裁书作成
          '4': ['custojapanese', 'conenglish', 'custochinese', 'conchinese', 'conjapanese', 'placejapanese', 'placechinese', 'deployment', 'claimdatetime', 'currencyposition', 'claimamount'],
          // 纳品书作成
          '5': ['claimdatetimeqh', 'conenglish', 'custojapanese', 'custoenglish', 'custoabbreviation', 'deployment', 'claimdatetime', 'currencyposition', 'claimamount', 'deliveryfinshdate', 'deliverydate', 'completiondate'
            , 'claimdate', 'supportdate', 'varto', 'conchinese', 'conjapanese', 'loadingjudge', 'deliveryfinshdate'],
          '6': ['claimdatetimeqh', 'conenglish', 'conchinese', 'conjapanese', 'custochinese', 'businesscode', 'claimdatetime', 'currencyposition', 'claimamount', 'deliveryfinshdate'],
          '7': ['claimdatetimeqh', 'conenglish', 'custojapanese', 'custochinese', 'placejapanese', 'placechinese', 'deployment', 'claimdatetime', 'currencyposition', 'claimamount', 'deliverydate'],
          '61': ['claimdatetimeqh', 'conenglish', 'custojapanese', 'custoenglish', 'custochinese', 'businesscode', 'currencyposition', 'conchinese', 'conjapanese', 'claimamount', 'claimdate', 'deliverydate', 'completiondate', 'deliveryfinshdate', 'loadingjudge', 'supportdate'],
          // 请求书作成
          '62': ['claimdatetimeqh', 'conenglish', 'claimdatetime', 'custoenglish', 'conchinese', 'currencyposition', 'businesscode', 'conjapanese', 'claimamount', 'placejapanese', 'claimdate', 'placechinese', 'deliveryfinshdate', 'loadingjudge', 'supportdate'],
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
        },
        rules: {
          /*group: [
            {
              required: true,
              validator: groupId,
              trigger: "change"
            }
          ],*/
          claimdatetimeqh: [
            {validator: validateclaimdatetimeqh},
          ],
          deployment: [
            {validator: validateDeployment},
          ],
          claimdatetime: [
            {validator: validateClaimdatetime},
          ],
          currencyposition: [
            {validator: validateCurrencyposition},
          ],
          deliveryfinshdate: [
            {validator: validateDeliveryfinshdate},
          ],
          loadingjudge: [
            {validator: validateLoadingjudge},
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
          //add-ws-01/06-禅道任务710
          theme: [
            {validator: validateTheme},
          ],
          //add-ws-01/06-禅道任务710
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
            {validator: validateDeliverydate, trigger: 'blur'},
          ],
          completiondate: [
            {validator: validateCompletiondate, trigger: 'blur'},
          ],
          claimdate: [
            {validator: validateClaimdate, trigger: 'blur'},
          ],
          supportdate: [
            {validator: validateSupportdate, trigger: 'blur'},
          ],
          claimamount: [
            {validator: validateClaimamount},
          ],
          //ADD_FJL 资金回收状况
          // recoverystatus: [
          //         {validator: validateRecoverystatus},
          //     ],
          // recoverydate: [
          //         {validator: validateRecoverydate},
          //     ],
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
          claimtype: '1',
          contractnumber: '',
          contracttype: '',
          applicationdate: '',
          entrycondition: 'HT003001',
          grouporglist: '',
        },
        form: {
          tabledata: [],
          tabledata2: undefined,
          contractnumber: '',
          claimtype: '1',
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
          tablecompound: [
            {
              contractcompound_id: '',
              contractnumber: '',
              claimtype: '',
              group_id: '',
              claimamount: '',
              contractrequestamount: '',
              rowindex: '',
            },
          ],
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
        code: 'HT001',
        code1: 'PJ028',
        code2: 'HT008',
        code3: 'HT007',
        code4: 'HT003',
        code5: 'HT004',
        code6: 'HT009',
        code7: 'HT010',
        code8: 'HT011',
        //add-ws-12/10-汇率字典
        // code9: 'PG019',
        month9: moment(new Date()).format('YYYY-MM'),
        //add-ws-12/10-汇率字典
        code10: 'HT012',
        code11: 'HT013',
        show1: true,
        show2: false,
        show3: false,
        tableB: [],
        tableC: [],
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
        claimamount1: '',
        claimamount2: '',
        claimamount3: '',
        claimamount4: '',
        peid: '',
        tempMountList: [],
      };
    },
    mounted() {
      //add-ws-6/22-禅道152任务
      this.getaward();
      this.IDname = this.$route.params._id;
      //add-ws-6/22-禅道152任务
      this.contractnumbercount = this.$route.params.contractnumbercount;
      // let option1 = {};
      // option1.name = getDictionaryInfo('PG019001').value1;
      // option1.code = 'PG019001';
      // option1.value = getDictionaryInfo('PG019001').value1;
      // let option2 = {};
      // option2.name = getDictionaryInfo('PG019002').value1;
      // option2.code = 'PG019002';
      // option2.value = getDictionaryInfo('PG019002').value1;
      // let option3 = {};
      // option3.name = getDictionaryInfo('PG019003').value1;
      // option3.code = 'PG019003';
      // option3.value = getDictionaryInfo('PG019003').value1;
      // let option4 = {};
      // option4.name = getDictionaryInfo('PG019004').value1;
      // option4.code = 'PG019004';
      // option4.value = getDictionaryInfo('PG019004').value1;
      // this.options.push(option1);
      // this.options.push(option2);
      // this.options.push(option3);
      // this.options.push(option4);
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/get2', {'contractnumber': this.$route.params._id})
          .then(response => {
            let contractapplication = response.contractapplication;
            let contractnumbercount = response.contractnumbercount;
            let contractcompound = response.contractcompound;
            if (contractapplication.length > 0) {
              for (let i = 0; i < contractapplication.length; i++) {
                // if (contractapplication[i].currencyposition !== '' && contractapplication[i].currencyposition !== null) {
                //   contractapplication[i].currencyposition = getDictionaryInfo(contractapplication[i].currencyposition).value4;
                // }
                this.show3 = true;
                this.maketype = contractapplication[i].maketype;
                this.form1.claimtype = contractapplication[i].claimtype;
                if (contractapplication[i].claimtype) {
                  this.form1.claimtype = contractapplication[i].claimtype.replace('第', '').replace('回', '');
                }
                this.form1.contractnumber = contractapplication[i].contractnumber;
                this.form1.contracttype = contractapplication[i].contracttype;
                this.form1.applicationdate = contractapplication[i].careeryear;
                this.form1.entrycondition = contractapplication[i].periods;
                this.form1.custojapanese = contractapplication[i].custojapanese;
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
                //复合合同的情况
                if (contractapplication[i].state === this.$t('label.PFANS8008FORMVIEW_EFFECTIVE')) {
                  if (contractapplication[i].contracttype === 'HT008002' || contractapplication[i].contracttype === 'HT008004'
                    || contractapplication[i].contracttype === 'HT008006' || contractapplication[i].contracttype === 'HT008008') {
                    this.displaycompound = true;
                  }
                }
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
                // DEL_FJL  start
                // if (contractapplication[i].conchinese != null && contractapplication[i].conchinese != '') {
                //     let conchinese = contractapplication[i].conchinese;
                //     if (typeof conchinese == 'string') {
                //         conchinese = conchinese.split(',');
                //         contractapplication[i].conchinese = conchinese;
                //     }
                // }
                // DEL_FJL  end

                let o = Object.assign({}, contractapplication[i]);
                this.form.tabledata.push(o);
//                                this.tabledata.push(o);
                if (this.maketype === '1') {
                  this.titleType = this.titleType1;
                } else if (this.maketype === '2') {
                  this.titleType = this.titleType2;
                } else if (this.maketype === '3') {
                  this.titleType = this.titleType3;
                  this.activeDisabledArrays[2] = false;
                } else if (this.maketype === '4') {
                  this.titleType = this.titleType4;
                } else if (this.maketype === '5') {
                  this.titleType = this.titleType5;
                } else if (this.maketype === '6') {
                  this.titleType = this.titleType6;
                } else if (this.maketype === '7') {
                  this.titleType = this.titleType7;
                } else if (this.maketype === '8') {
                  this.titleType = this.titleType8;
                } else if (this.maketype === '9') {
                  this.titleType = this.titleType9;
                }
              }
            }
            //纳品回数
            if (contractnumbercount.length > 0) {
              for (let i = 0; i < contractnumbercount.length; i++) {
                if (contractnumbercount[i].claimdatetimeqh !== '' && contractnumbercount[i].claimdatetimeqh !== null) {
                  let claimdatetime = contractnumbercount[i].claimdatetimeqh;
                  let claimdatetim = claimdatetime.slice(0, 10);
                  let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 10);
                  contractnumbercount[i].claimdatetimeqh = [claimdatetim, claimdatetime1];
                  contractnumbercount[i].letrecoverystatus = contractnumbercount[i].recoverystatus;
                }
                //决裁书已经进行中或是结束，编辑后，合同不可编辑
                if (contractnumbercount[i].bookStatus === true ) {
                  this.bookStatuss = true;
                  contractnumbercount[i].npbook = true;
                  this.disabled3 = false;
                  this.disabled = false;
                  // let rolecaneditnapin = getCurrentRoleeditnapin();
                  // if(rolecaneditnapin === '0')
                  // {
                  //   contractnumbercount[i].npbook = false;
                  // }
                }
                else
                {
                  contractnumbercount[i].npbook = false;
                  this.bookStatuss = false;
                }
              }
              this.form.tableclaimtype = contractnumbercount;
              if (this.displaycompound) {
                this.optionscompound = [];

                let option2 = {};
                let option3 = {};
                let option4 = {};
                // if (contractnumbercount.length === 1) {
                //   option1.code = 'HT001001';
                //   option1.value = contractnumbercount[0].claimtype;
                //   this.optionscompound.push(option1);
                //   //请求金额
                //   this.claimamount1 = contractnumbercount[0].claimamount;
                // }
                // else if (contractnumbercount.length === 2) {
                //   option1.code = 'HT001001';
                //   option1.value = contractnumbercount[0].claimtype;
                //   option2.code = 'HT001002';
                //   option2.value = contractnumbercount[1].claimtype;
                //   this.optionscompound.push(option1);
                //   this.optionscompound.push(option2);
                //   //请求金额
                //   this.claimamount1 = contractnumbercount[0].claimamount;
                //   this.claimamount2 = contractnumbercount[1].claimamount;
                // }
                // else if (contractnumbercount.length === 3) {
                //   option1.code = 'HT001001';
                //   option1.value = contractnumbercount[0].claimtype;
                //   option2.code = 'HT001002';
                //   option2.value = contractnumbercount[1].claimtype;
                //   option3.code = 'HT001003';
                //   option3.value = contractnumbercount[2].claimtype;
                //   this.optionscompound.push(option1);
                //   this.optionscompound.push(option2);
                //   this.optionscompound.push(option3);
                //   //请求金额
                //   this.claimamount1 = contractnumbercount[0].claimamount;
                //   this.claimamount2 = contractnumbercount[1].claimamount;
                //   this.claimamount3 = contractnumbercount[2].claimamount;
                // }
                // else if (contractnumbercount.length === 4) {
                //   option1.code = 'HT001001';
                //   option1.value = contractnumbercount[0].claimtype;
                //   option2.code = 'HT001002';
                //   option2.value = contractnumbercount[1].claimtype;
                //   option3.code = 'HT001003';
                //   option3.value = contractnumbercount[2].claimtype;
                //   option4.code = 'HT001004';
                //   option4.value = contractnumbercount[3].claimtype;
                //   this.optionscompound.push(option1);
                //   this.optionscompound.push(option2);
                //   this.optionscompound.push(option3);
                //   this.optionscompound.push(option4);
                //   //请求金额
                //   this.claimamount1 = contractnumbercount[0].claimamount;
                //   this.claimamount2 = contractnumbercount[1].claimamount;
                //   this.claimamount3 = contractnumbercount[2].claimamount;
                //   this.claimamount4 = contractnumbercount[3].claimamount;
                // }
                let lengthjue = 0;
                for (let k = 0; k < contractnumbercount.length; k++) {
                  if (contractnumbercount[k].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS')) != -1)
                  {
                    lengthjue = lengthjue+1;
                  }
                }
                if (lengthjue != contractnumbercount.length && lengthjue!=0 )
                {
                  for (let k = 0; k < contractnumbercount.length; k++) {
                    if (contractnumbercount[k].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS')) != -1)
                    {
                      let letclaimtypeone = contractnumbercount[k].claimtype;
                      let option1 = {};
                      option1.code = letclaimtypeone;
                      option1.value = letclaimtypeone;

                      this.optionscompound.push(option1);
                      let op = [];
                      op.claimtype = contractnumbercount[k].claimtype;
                      op.claimamount = contractnumbercount[k].claimamount;
                      this.tempMountList.push(op);
                    }
                  }
                }
                else
                {
                  for (let k = 0; k < contractnumbercount.length; k++) {
                    let letclaimtypeone = contractnumbercount[k].claimtype;
                    let option1 = {};
                    option1.code = letclaimtypeone;
                    option1.value = letclaimtypeone;

                    this.optionscompound.push(option1);
                    let op = [];
                    op.claimtype = contractnumbercount[k].claimtype;
                    op.claimamount = contractnumbercount[k].claimamount;
                    this.tempMountList.push(op);
                  }
                }
              }
            }
            //复合合同金额分配
            if (contractcompound.length > 0) {
              this.form.tablecompound = contractcompound;
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
        this.buttonList[1].disabled = true;
      }
      if (this.buttonList.length > 2) {
        this.buttonList[3].disabled = true;
      }
      let userid = this.$store.getters.userinfo.userid;
      if (userid !== null && userid !== '') {
        let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
        if (lst.centerId !== null && lst.centerId !== '') {
          this.form1.grouporglist = lst.centerId;

          this.getGroupId(this.form1.grouporglist);
          this.checkGroupId = true;
        } else {
          this.checkGroupId = false;
        }
      }
      //get customer
      this.getcustomerinfor();
      //テーマ
      //upd-ws-01/06-禅道任务710
      this.getdata('0');
      //upd-ws-01/06-禅道任务710
      //get project
      this.getProjectList();
    },
    created() {
      this.disabled = this.$route.params.disabled;
      //add-ws-6/22-禅道152任务
      if (this.disabled) {
        this.show10 = true;
      } else {
        this.show10 = false;
      }
      //add-ws-6/22-禅道152任务
      if (this.$route.params.state === this.$t('label.PFANS8008FORMVIEW_INVALID')) {
        this.buttonList = [];
      }
//            if(this.$route.params._id === ''){
//              this.buttonList.splice(3, 1);
//            }
    },
    methods: {
      //add_fjl_添加合同回款相关  start
      // //查看请求书
      // viewBook(index, rows) {
      //     let countNumber = '';
      //     if (rows[index].claimtype === '第一回') {
      //         countNumber = rows[index].contractnumber + '-1';
      //     } else if (rows[index].claimtype === '第二回') {
      //         countNumber = rows[index].contractnumber + '-2';
      //     } else if (rows[index].claimtype === '第三回') {
      //         countNumber = rows[index].contractnumber + '-3';
      //     } else if (rows[index].claimtype === '第四回') {
      //         countNumber = rows[index].contractnumber + '-4';
      //     }
      //     this.getPe(countNumber);
      // },
      // submMon(val, rows) {
      //     if(val === true){
      //         let roid = this.$store.getters.userinfo.userid;
      //         let rowid = rows.contractNumber;
      //         this.loading = true;
      //         this.$store
      //             .dispatch('PFANS1026Store/getPe', {'roid':roid,'rowid':rowid})
      //             .then(response => {
      //                 this.peid = response[0].petition_id;
      //                 this.$router.push({
      //                     name: "PFANS1032FormView",
      //                     params: {
      //                         _id: this.peid,
      //                         disabled: false
      //                     }
      //                 });
      //                 this.loading = false;
      //             }).catch(error => {
      //             Message({
      //                 message: error,
      //                 type: 'error',
      //                 duration: 5 * 1000,
      //             });
      //             this.loading = false;
      //         });
      //     }
      // },
      onRecoverystatus(val) {
        if (val.recoverystatus === '1') {
          val.recoverydate = moment(new Date()).format('YYYY-MM-DD');
        }
      },
      selectInit(row, index) {
        return (moment(row.deliverydate).format('YYYY-MM') === new moment().format('YYYY-MM')
          || moment(row.claimdate).format('YYYY-MM') === new moment().format('YYYY-MM'));
      },
      // getPe(countNumber){
      //     this.loading = true;
      //     this.$store
      //         .dispatch('PFANS1026Store/getPe', {'claimnumber':countNumber})
      //         .then(response => {
      //             this.peid = response[0].petition_id;
      //             this.$router.push({
      //                 name: "PFANS1032FormView",
      //                 params: {
      //                     _id: this.peid,
      //                     disabled: false
      //                 }
      //             });
      //             this.loading = false;
      //         }).catch(error => {
      //         Message({
      //             message: error,
      //             type: 'error',
      //             duration: 5 * 1000,
      //         });
      //         this.loading = false;
      //     });
      // },
      //add_fjl_添加合同回款相关  end
      //add-ws-6/22-禅道152任务
      getaward() {
        this.DataList = [];
        this.loading = true;
        this.$store
          .dispatch('PFANS1025Store/getDataOne2', {'contractnumber': this.$route.params._id})
          .then(response => {
            if (response.quolist.length > 0) {
              for (let i = 0; i < response.quolist.length; i++) {
                if (response.quolist[i].createon !== null && response.quolist[i].createon !== '') {
                  response.quolist[i].createon = moment(response.quolist[i].createon).format('YYYY-MM-DD');
                }
                this.DataList.push({
                  award_id: response.quolist[i].quotationid,
                  award: this.$t('label.PFANS1004VIEW_SALEQUOTATION'),
                  awardtype: this.$t('label.PFANS1026FORMVIEW_D') + Number(i + 1) + this.$t('label.PFANS1026FORMVIEW_H'),
                  createon: response.quolist[i].createon,
                });
                this.checkdata = true;
              }
            }
            if (response.nonlist.length > 0) {
              for (let i = 0; i < response.nonlist.length; i++) {
                if (response.nonlist[i].createon !== null && response.nonlist[i].createon !== '') {
                  response.nonlist[i].createon = moment(response.nonlist[i].createon).format('YYYY-MM-DD');
                }
                this.DataList.push({
                  award_id: response.nonlist[i].nonjudgment_id,
                  award: this.$t('label.PFANS1002VIEW_JUDGMENT'),
                  awardtype: this.$t('label.PFANS1026FORMVIEW_D') + Number(i + 1) + this.$t('label.PFANS1026FORMVIEW_H'),
                  createon: response.nonlist[i].createon,
                });
                this.checkdata = true;
              }
            }
            if (response.conlist.length > 0) {
              for (let i = 0; i < response.conlist.length; i++) {
                if (response.conlist[i].createon !== null && response.conlist[i].createon !== '') {
                  response.conlist[i].createon = moment(response.conlist[i].createon).format('YYYY-MM-DD');
                }
                this.DataList.push({
                  award_id: response.conlist[i].contract_id,
                  award: this.$t('title.PFANS1029VIEW'),
                  awardtype: this.$t('label.PFANS1026FORMVIEW_D') + Number(i + 1) + this.$t('label.PFANS1026FORMVIEW_H'),
                  createon: response.conlist[i].createon,
                });
                this.checkdata = true;
              }
            }
            if (response.awardlist.length > 0) {
              for (let i = 0; i < response.awardlist.length; i++) {
                if (response.awardlist[i].createon !== null && response.awardlist[i].createon !== '') {
                  response.awardlist[i].createon = moment(response.awardlist[i].createon).format('YYYY-MM-DD');
                }
                this.DataList.push({
                  award_id: response.awardlist[i].award_id,
                  award: this.$t('title.PFANS1025VIEW'),
                  awardtype: this.$t('label.PFANS1026FORMVIEW_D') + Number(i + 1) + this.$t('label.PFANS1026FORMVIEW_H'),
                  createon: response.awardlist[i].createon,
                });
                this.checkdata = true;
              }
            }
            if (response.naplist.length > 0) {
              for (let i = 0; i < response.naplist.length; i++) {
                if (response.naplist[i].createon !== null && response.naplist[i].createon !== '') {
                  response.naplist[i].createon = moment(response.naplist[i].createon).format('YYYY-MM-DD');
                }
                this.DataList.push({
                  award_id: response.naplist[i].napalm_id,
                  award: this.$t('title.PFANS1031VIEW'),
                  awardtype: this.$t('label.PFANS1026FORMVIEW_D') + response.naplist[i].claimnumber.substring(response.naplist[i].claimnumber.length - 1, response.naplist[i].claimnumber.length) + this.$t('label.PFANS1026FORMVIEW_H'),
                  createon: response.naplist[i].createon,
                });
                this.checkdata = true;
              }
            }
            if (response.petilist.length > 0) {
              for (let i = 0; i < response.petilist.length; i++) {
                if (response.petilist[i].createon !== null && response.petilist[i].createon !== '') {
                  response.petilist[i].createon = moment(response.petilist[i].createon).format('YYYY-MM-DD');
                }
                this.DataList.push({
                  award_id: response.petilist[i].petition_id,
                  award: this.$t('title.PFANS1032VIEW'),
                  awardtype: this.$t('label.PFANS1026FORMVIEW_D') + response.petilist[i].claimnumber.substring(response.petilist[i].claimnumber.length - 1, response.petilist[i].claimnumber.length) + this.$t('label.PFANS1026FORMVIEW_H'),
                  createon: response.petilist[i].createon,
                });
                this.checkdata = true;
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
      viewdata(row) {
        this.$store.commit('global/SET_HISTORYURL', '');
        this.$store.commit('global/SET_WORKFLOWURL', '/FFFFF1024FormView');
        if (row.award.substring(0, 3) === this.$t('label.PFANS1004VIEW_SALEQUOTATION')) {
          this.$router.push({
            name: 'PFANS1027FormView',
            params: {
              _checkdisable: this.disable,
              _checkid: this.IDname,
              _check: true,
              _id: row.award_id,
              disabled: false,
            },
          });
        } else if (row.award.substring(0, 3) === this.$t('label.PFANS1002VIEW_JUDGMENT2')) {
          this.$router.push({
            name: 'PFANS1028FormView',
            params: {
              _checkdisable: this.disable,
              _checkid: this.IDname,
              _check: true,
              _id: row.award_id,
              disabled: false,
            },
          });
        } else if (row.award.substring(0, 3) === this.$t('title.PFANS1029VIEW')) {
          this.$router.push({
            name: 'PFANS1029FormView',
            params: {
              _checkdisable: this.disable,
              _checkid: this.IDname,
              _check: true,
              _id: row.award_id,
              disabled: false,
            },
          });
        } else if (row.award.substring(0, 3) === this.$t('title.PFANS1025VIEW')) {
          this.$router.push({
            name: 'PFANS1030FormView',
            params: {
              _checkdisable: this.disable,
              _checkid: this.IDname,
              _check: true,
              _id: row.award_id,
              disabled: false,
            },
          });
        } else if (row.award.substring(0, 3) === this.$t('title.PFANS1031VIEW')) {
          this.$router.push({
            name: 'PFANS1031FormView',
            params: {
              _checkdisable: this.disable,
              _checkid: this.IDname,
              _check: true,
              _id: row.award_id,
              disabled: false,
            },
          });
        } else if (row.award.substring(0, 3) === this.$t('title.PFANS1032VIEW')) {
          this.$router.push({
            name: 'PFANS1032FormView',
            params: {
              _checkdisable: this.disable,
              _checkid: this.IDname,
              _check: true,
              _id: row.award_id,
              disabled: false,
            },
          });
        }
      },
      //add-ws-6/22-禅道152任务
      tipMes(contractNumber, index) {
        this.$confirm(this.$t('normal.error_tipis'), this.$t('normal.info'), {
          confirmButtonText: this.$t('button.confirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning',
        }).then(() => {
          // add_fjl_0604 --添加请求书和纳品书的选择生成
          if (index === 5 || index === 6) {
            let countNumber = '';
            if (this.multipleSelection.length === 0) {
              Message({
                message: this.$t('normal.info_01'),
                type: 'info',
                duration: 2 * 1000,
              });
              this.dialogBook = false;
              this.loading = false;
              return;
            }
            if (this.multipleSelection.length > 0) {
              for (let i = 0; i < this.multipleSelection.length; i++) {
                //   if (this.multipleSelection[i].claimtype.indexOf("第一回") >= 0) {
                //       countNumber = this.multipleSelection[i].contractnumber + '-1';
                // }
                //   if (this.multipleSelection[i].claimtype.indexOf("第二回") >= 0) {
                //       countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-2';
                // }
                //   if (this.multipleSelection[i].claimtype.indexOf("第三回") >= 0) {
                //       countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-3';
                // }
                //   if (this.multipleSelection[i].claimtype.indexOf("第四回") >= 0) {
                //       countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-4';
                // }
                let huishu = this.multipleSelection[i].claimtype.replace('第', '').replace('回', '').replace('覚書', '');
                ;
                countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-' + huishu;
              }
              var tabledata = {'contractnumber': contractNumber, 'rowindex': index, 'countNumber': countNumber};
            }
          } else {
            var tabledata = {'contractnumber': contractNumber, 'rowindex': index};
          }
          // add_fjl_0604 --添加请求书和纳品书的选择生成
          this.handleSaveContract(index, this.makeintoBaseInfo, tabledata);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('label.PFANS1026FORMVIEW_tipis'),
          });
        });
      },

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
      // DEL_FJL  start
      // changePro(val, row) {
      //     let nameJA = '';
      //     for (let i = 0; i < val.length; i++) {
      //         let result = this.projectResult.filter(value => {
      //             return value.companyprojects_id === val[i];
      //         });
      //         nameJA += result[0].project_namejp + ',';
      //     }
      //     row.conchinese = val;
      //     row.conjapanese = nameJA.substring(0, nameJA.length - 1);
      // },
      // DEL_FJL  end
      handleClickA(row) {
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
        this.recordData.businesscode = row.causecode;
        this.recordData.regindiff = row.regindiff;
        this.dialogVisibleA = false;
        this.loading = false;
      },
      //upd-ws-01/06-禅道任务710
      handleClickB(row) {
        this.recordDataB = row;
        this.dialogVisibleB = true;
      },
      handleClickChange(row) {
        this.recordDataB.theme = row.themename;
        this.recordDataB.temaid = row.themeplandetail_id;
        this.dialogVisibleB = false;
      },
      changed() {
        if (this.region === '2') {
          this.getdata('1');
        } else if (this.region === '1') {
          this.getdata('0');
        }
      },
      getdata(type) {
        this.tableB = [];
        this.loading = true;
        this.$store
          .dispatch('PFANS1043Store/themenametype', {'type': type})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].branch != '' && response[j].branch != null) {
                let letErrortype = getDictionaryInfo(response[j].branch);
                if (letErrortype != null) {
                  response[j].branch = letErrortype.value1;
                }
              }
              if (response[j].contracttype != '' && response[j].contracttype != null) {
                let letErrortype = getDictionaryInfo(response[j].contracttype);
                if (letErrortype != null) {
                  response[j].contracttype = letErrortype.value1;
                }
              }
              if (response[j].contracttype != '' && response[j].contracttype != null) {
                let letErrortype = getDictionaryInfo(response[j].contracttype);
                if (letErrortype != null) {
                  response[j].contracttype = letErrortype.value1;
                }
              }
              this.tableB.push(
                {
                  themeplandetail_id: response[j].themeplandetail_id,
                  themename: response[j].themename,
                  divide: response[j].branch,
                  contract: response[j].contracttype,
                  currency: response[j].contracttype,
                },
              );
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
      //upd-ws-01/06-禅道任务710
      getcustomerinfor() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6002Store/getcustomerinfor2')
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].custchinese !== null && response[j].custchinese !== '') {
                let custchinese = getUserInfo(response[j].custchinese);
                if (custchinese) {
                  response[j].custchinese = user.userinfo.customername;
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
      getGroupId(val) {
        this.form1.grouporglist = val;
        this.grouporglist = val;
        //update gbb 20210412 选择group时只需要group的组织编码，别的信息用group对应的center信息 start
        let group = getOrgInformation(val);
        if (group) {
          if(group.data.type === '2'){
            this.form1.grouporglist = group.parent.data._id;
            this.grouporglist = group.parent.data._id;
            this.groupinfo = [
              group.parent.data._id,
              group.parent.data.companyen === undefined ? "" : group.parent.data.companyen,
              group.data.orgname === undefined ? "" : group.data.orgname,
              group.parent.data.companyname === undefined ? "" : group.parent.data.companyname
            ];
          }
          else{
            this.groupinfo = [
              val,
              group.data.companyen === undefined ? "" : group.data.companyen,
              group.data.orgname === undefined ? "" : group.data.orgname,
              group.data.companyname === undefined ? "" : group.data.companyname
            ];
          }
        }
        //update gbb 20210412 选择group时只需要group的组织编码，别的信息用group对应的center信息 end
        if (!val || this.form1.grouporglist === '') {
          this.errorgroup = this.$t('normal.error_08') + this.$t('label.department');
        } else {
          this.errorgroup = '';
        }
      },
      getUserids(val, row) {
        row.user_id = val;
        if (!row.user_id || row.user_id === '' || val === 'undefined') {
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.erroruser = '';
        }
      },
      getJudge(val, row) {
        row.loadingjudge = val;
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
      //本来契約
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
      getcontracttype(val) {
        this.form1.contracttype = val;
      },
      getcareeryear1(val) {
        this.form1.applicationdate = val;
        if (this.form1.entrycondition) {
          this.errorapplicationdate = '';
        }
      },
      getcareeryear2(val) {
        this.form1.entrycondition = val;
        if (this.form1.applicationdate) {
          this.errorapplicationdate = '';
        }
      },
      getVarto(val, row) {
        row.varto = val;
      },
      getCurrencyposition(val, row) {
        row.currencyposition = val;
      },
      getFirstjudge(val, row) {
        row.firstjudge = val;
      },
      getSecondjudge(val, row) {
        row.secondjudge = val;
      },
      getOutmanager(val, row) {
        row.outputmanager = val;
      },
      getManager(val, row) {
        row.manager = val;
      },
      getEntrycondition(val, row) {
        row.entrycondition = val;
      },
      getDecide(val, row) {
        row.decide = val;
      },
      //UPD_FJL  start
      getDeliverycondition(val, row) {
        row.deliverycondition = val;
      },
      getDeliveryconditionqh(val, row) {
        row.deliveryconditionqh = val;
      },
      getDeliveryqh(val, row) {
        row.deliveryqh = val;
      },
      getDelivery(val, row) {
        row.delivery = val;
      },
      getClaimconditionqh(val, row) {
        row.claimconditionqh = val;
      },
      getClaimcondition(val, row) {
        row.claimcondition = val;
      },
      getClaim(val, row) {
        row.claim = val;
      },
      getClaimqh(val, row) {
        row.claimqh = val;
      },
      //UPD_FJL  end
      //日期区组件处理
      getclaimdatetime(claimdatetime) {
        if (claimdatetime != null) {
          if (claimdatetime.length > 0) {
            return moment(claimdatetime[0]).format('YYYY-MM-DD') + ' ~ ' + moment(claimdatetime[1]).format('YYYY-MM-DD');
          } else {
            return '';
          }
        } else {
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
        if (column.level === 2 && columnIndex >= 2 && columnIndex <= 3) {
          return {
            color: 'white',
            background: '#99CC99',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73CC73',
          };
        }
        if (column.level === 2 && columnIndex > 3 && columnIndex <= 6) {
          return {
            color: 'white',
            background: '#CC99FF',
            'border-right': '1px solid #B973FF',
            'border-bottom': '1px solid #99CCFF',
          };
        }
        if (column.level === 2 && columnIndex >= 7 && columnIndex < 11) {
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
        if (column.level === 2 && columnIndex >= 18 && columnIndex < 26) {
          return {
            color: 'white',
            background: '#CC9999',
            'border-right': '1px solid #CC7373',
            'border-bottom': '1px solid #99CCFF',
          };
        }
        if (column.level === 1 && columnIndex >= 0 && columnIndex < 30) {
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
            applicationdate: moment(new Date()).format('YYYY-MM-DD'),
            user_id: this.$store.getters.userinfo.userid,
            contracttype: this.contracttype,
            contractnumber: this.letcontractnumber,
            entrycondition: 'HT004002',
            entrypayment: '',
            extensiondate: '',
            extensionreason: '',
            claimtype: this.form1.claimtype,
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
            regindiff: '',
            conjapanese: '',
            conenglish: '',
            conchinese: '',
            remarks: '',
            state: this.$t('label.PFANS8008FORMVIEW_EFFECTIVE'),
            type: '1',
            maketype: '',
            theme: '',
            temaid: '',
            qingremarks: '',
            claimamount: '',
          };
          this.form.tabledata.push(o);
//                this.tabledata.push(o);
        }

      },
      addRowclaimtype() {
        this.form.tableclaimtype.push({
          contractnumbercount_id: '',
          contractnumber: this.letcontractnumber,
          claimtype: '1',
          deliverydate: '',
          completiondate: '',
          deliveryfinshdate: '',
          loadingjudge: '',
          claimdate: moment(new Date()).format('YYYY-MM-DD'),
          claimamount: '',
          supportdate: '',
          type: '1',
          maketype: '',
          rowindex: '',
          claimdatetimeqh: '',
          deliveryconditionqh: 'HT009001',
          deliveryqh: '',
          claimconditionqh: 'HT011001',
          claimqh: '',
          qingremarksqh: '',
          remarksqh: '',
          recoverystatus: '',
          recoverydate: '',
        });
      },
      //add ccm 20201203
      addRowclaimtype1(rows) {
        let letclaimtype = '';
        if (this.form.tableclaimtype != null && this.form.tableclaimtype.length > 0) {
          if (this.form.tableclaimtype[this.form.tableclaimtype.length-1].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS')) != -1) {
            letclaimtype = this.$t('label.PFANS1024VIEW_LETTERS');
          }
        }
        let flag = 0;
        let con = rows.length + 1;
        let cla = 0;
        for (let h = 0; h < this.tableclaimtypeAnt.length; h++) {
          if (this.tableclaimtypeAnt[h].claimtype.indexOf(con) != -1) {
            flag++;
            cla = h;
          }
        }
        if (flag == 0) {
          let lengthjue = 0;
          if (this.form.tableclaimtype != null && this.form.tableclaimtype.length > 0)
          {
            for (let h = 0; h < this.form.tableclaimtype.length; h++) {
              if (this.form.tableclaimtype[h].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS')) != -1)
              {
                lengthjue = lengthjue+1;
              }
            }
          }
          let letclaimtypejue = rows.length + 1;
          if (lengthjue != 0)
          {
            letclaimtypejue = lengthjue+1;
          }
          this.form.tableclaimtype.push({
            contractnumbercount_id: '',
            contractnumber: this.letcontractnumber,
            claimtype: letclaimtype + this.$t('label.PFANS1026FORMVIEW_D') + letclaimtypejue + this.$t('label.PFANS1026FORMVIEW_H'),
            deliverydate: '',
            bookStatus: false,
            completiondate: '',
            deliveryfinshdate: '',
            loadingjudge: '',
            claimdate: moment(new Date()).format('YYYY-MM-DD'),
            claimamount: '',
            supportdate: '',
            type: '1',
            maketype: '',
            rowindex: '',
            claimdatetimeqh: '',
            deliveryconditionqh: 'HT009001',
            deliveryqh: '',
            claimconditionqh: 'HT011001',
            claimqh: '',
            qingremarksqh: '',
            remarksqh: '',
            recoverystatus: '0',
            recoverydate: '',
          });
        } else {
          this.tableclaimtypeAnt[cla].claimtype = letclaimtype + this.$t('label.PFANS1026FORMVIEW_D') + (rows.length + 1) + this.$t('label.PFANS1026FORMVIEW_H');
          this.tableclaimtypeAnt[cla].contractnumbercount_id = '';
          this.tableclaimtypeAnt[cla].contractnumber = this.letcontractnumber;
          this.form.tableclaimtype.push(this.tableclaimtypeAnt[cla]);
        }

      },
      deleteRowclaimtype1(index, rows) {
        let datainfo = {};
        datainfo = {
          'contractnumber': rows[index].contractnumber,
          'claimnumber': rows[index].contractnumber + '-' + (index + 1),
          'contractnumbercount_id': rows[index].contractnumbercount_id,
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/getNapinQinqiu', datainfo)
          .then(response => {
            if (response != null) {
              if (response === true) {
                Message({
                  message: this.$t('normal.error_napalmpetition'),
                  type: 'error',
                  duration: 5 * 1000,
                });
              } else {
                if (rows.length > 1) {
                  rows.splice(index, 1);
                  let lengthjue = 0;
                  if (this.form.tableclaimtype != null && this.form.tableclaimtype.length > 0)
                  {
                    for (let h = 0; h < this.form.tableclaimtype.length; h++) {
                      if (this.form.tableclaimtype[h].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS')) === -1)
                      {
                        lengthjue = lengthjue+1;
                      }
                    }
                  }
                  for (let i = index; i < rows.length; i++) {
                    if (this.form.tableclaimtype[i].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS')) != -1) {
                      this.form.tableclaimtype[i].claimtype = this.$t('label.PFANS1024VIEW_LETTERS') + this.$t('label.PFANS1026FORMVIEW_D') + (i + 1 - lengthjue) + this.$t('label.PFANS1026FORMVIEW_H');
                    }
                    else
                    {
                      this.form.tableclaimtype[i].claimtype = this.$t('label.PFANS1026FORMVIEW_D') + (i + 1 - lengthjue) + this.$t('label.PFANS1026FORMVIEW_H');
                    }
                  }
                } else {
                  let letclaimtype = '';
                  if (this.form.tableclaimtype != null && this.form.tableclaimtype.length > 0) {
                    if (this.form.tableclaimtype[0].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS')) != -1) {
                      letclaimtype = this.$t('label.PFANS1024VIEW_LETTERS');
                    }
                  }
                  this.form.tableclaimtype = [
                    {
                      contractnumbercount_id: '',
                      bookStatus: false,
                      contractnumber: '',
                      claimtype: letclaimtype + this.$t('label.PFANS1026FORMVIEW_D') + (1) + this.$t('label.PFANS1026FORMVIEW_H'),
                      deliverydate: '',
                      completiondate: '',
                      deliveryfinshdate: '',
                      loadingjudge: '',
                      claimdate: '',
                      claimamount: '',
                      supportdate: '',
                      type: '',
                      maketype: '',
                      rowindex: '',
                      claimdatetimeqh: '',
                      deliveryconditionqh: '',
                      deliveryqh: '',
                      claimconditionqh: '',
                      claimqh: '',
                      qingremarksqh: '',
                      remarksqh: '',
                      recoverystatus: '',
                      recoverydate: '',
                    },
                  ];
                }
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
      //add ccm 20201203
      addRowcompound() {
        this.form.tablecompound.push({
          contractcompound_id: '',
          contractnumber: '',
          claimtype: '',
          group_id: '',
          claimamount: '',
          contractrequestamount: '',
          rowindex: '',
        });
      },
      getEntrustgroupId(val, row) {
        row.group_id = val;
      },
      deleteRowcompound(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.form.tablecompound = [
            {
              contractcompound_id: '',
              contractnumber: '',
              claimtype: '',
              group_id: '',
              claimamount: '',
              contractrequestamount: '',
              rowindex: '',
            },
          ];
        }
      },
      //纳品回数金额xx
      changeclaimamount(val) {
        // if (val.claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_ONE')) != -1) {
        //   this.claimamount1 = val.claimamount;
        // }
        // if (val.claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_TWO')) != -1) {
        //   this.claimamount2 = val.claimamount;
        // }
        // if (val.claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_THREE')) != -1) {
        //   this.claimamount3 = val.claimamount;
        // }
        // if (val.claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_FOUR')) != -1) {
        //   this.claimamount4 = val.claimamount;
        // }
        //add_fjl_0804  合同金额 = 明细【请求金额】合计值  start
        let counttype = 0;
        for (let t = 0; t < this.form.tableclaimtype.length; t++)
        {
          if(this.form.tableclaimtype[t].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS')) != -1)
          {
            counttype = counttype+1;
          }
        }
        for (let i = 0; i < this.form.tabledata.length; i++) {
          if (this.form.tabledata[i].state === this.$t('label.PFANS8008FORMVIEW_EFFECTIVE')) {
            let sumclaimamount = 0;
            for (let i = 0; i < this.form.tableclaimtype.length; i++) {
              if (counttype === this.form.tableclaimtype.length || counttype ===0)
              {
                this.form.tabledata[i].claimamount = sumclaimamount + Number(this.form.tableclaimtype[i].claimamount);
              }
              else
              {
                if(this.form.tableclaimtype[t].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS')) != -1)
                {
                  this.form.tabledata[i].claimamount = sumclaimamount + Number(this.form.tableclaimtype[i].claimamount);
                }
              }
            }
          }
        }
        //add_fjl_0804  合同金额 = 明细【请求金额】合计值  end
        for (let i = 0; i < this.form.tablecompound.length; i++) {
          for (let j = 0; j < this.form.tableclaimtype.length; j++) {
            if (counttype === this.form.tableclaimtype.length || counttype ===0)
            {
              if (this.form.tablecompound[i].claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_D') + (j + 1) + this.$t('label.PFANS1026FORMVIEW_H')) != -1) {
                this.form.tablecompound[i].claimamount = this.this.form.tableclaimtype[j].claimamount;
              }
            }
            else
            {
              if (this.form.tablecompound[i].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS') + this.$t('label.PFANS1026FORMVIEW_D') + (j + 1) + this.$t('label.PFANS1026FORMVIEW_H')) != -1) {
                this.form.tablecompound[i].claimamount = this.this.form.tableclaimtype[j].claimamount;
              }
            }
          }

          // if (this.form.tablecompound[i].claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_TWO')) != -1) {
          //   this.form.tablecompound[i].claimamount = this.claimamount2;
          // }
          // if (this.form.tablecompound[i].claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_THREE')) != -1) {
          //   this.form.tablecompound[i].claimamount = this.claimamount3;
          // }
          // if (this.form.tablecompound[i].claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_FOUR')) != -1) {
          //   this.form.tablecompound[i].claimamount = this.claimamount4;
          // }
        }
      },
      //复合请求方式
      changeclaimtype(val) {
        val.contractrequestamount = '0';
        let datamount = [];
        datamount = this.tempMountList.filter(item => item.claimtype == val.claimtype);
        if (datamount.length > 0) {
          //编辑
          val.claimamount = datamount[0].claimamount;
        } else {
          //新建
          datamount = this.form.tableclaimtype.filter(item => item.claimtype == val.claimtype);
          if (datamount.length > 0) {
            val.claimamount = datamount[0].claimamount;
          }
        }
        // if (val.claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_ONE')) != -1) {
        //   val.claimamount = claimmount;
        // }
        // if (val.claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_TWO')) != -1) {
        //   val.claimamount = this.claimamount2;
        // }
        // if (val.claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_THREE')) != -1) {
        //   val.claimamount = this.claimamount3;
        // }
        // if (val.claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_FOUR')) != -1) {
        //   val.claimamount = this.claimamount4;
        // }

      },
      //契約番号做成
      click() {
        this.tableclaimtypeAnt = [];
        this.$refs['refform1'].validate(valid => {
          if (valid) {
            if (this.form.tableclaimtype.length != 0) {
              for (let i = 0; i < this.form.tableclaimtype.length; i++) {
                if (this.form.tableclaimtype[i].tenantid == '0') {
                  this.tableclaimtypeAnt.push(this.form.tableclaimtype[i]);
                }
              }
            }
            this.form.claimtype = this.form1.claimtype;
            this.form.contractnumber = this.form1.contractnumber;
            this.form.contracttype = this.form1.contracttype;
            this.form.applicationdate = this.form1.applicationdate;
            this.form.entrycondition = this.form1.entrycondition;
            if (this.$route.params._id) {
              this.handleClick();
              this.bookStatuss = false;
              this.disabled = true;
              this.disabled3 = false;
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
                  this.bookStatuss = false;
                  this.disabled = true;
                  this.disabled3 = false;
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: this.$t('label.PFANS1026FORMVIEW_YQXSC'),
                  });
                  this.dialogFormVisible = false;
                });
              } else {
                this.handleClick();
                this.bookStatuss = false;
                this.disabled = true;
                this.disabled3 = false;
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
      },
      handleClick() {
        this.loading = true;
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
        if (this.checked) {
          this.letcontractnumber = this.form.contractnumber.split('-')[0] + letbook;
        } else {
          if (this.groupinfo[2] !== null) {
            //选择group是判断组织编码为空时不可以创建合同
            if(this.groupinfo[2].trim() !== ""){
              this.letcontractnumber = abbreviation + applicationdate + entrycondition + this.groupinfo[2] + letbook;
            }
            else{
              Message({
                message: this.$t('normal.error_14'),
                type: 'error',
                duration: 5 * 1000,
              });
              return;
            }
          } else {
            Message({
              message: this.$t('normal.error_14'),
              type: 'error',
              duration: 5 * 1000,
            });
            return;
          }
        }
        //纳品进步状况=纳品作成完了，如果生成觉书，要在觉书那条把原来的copy过来。
        let isClone = false;
        if (this.checked) {
          for (let i = 0; i < this.form.tabledata.length; i++) {
            this.form.tabledata[i].state = this.$t('label.PFANS8008FORMVIEW_INVALID');
            if (this.form.tabledata[0].deliveryconditionqh == 'HT009003') {
              isClone = true;
            }
          }
        }
        this.optionscompound = [];
        let option1 = {};
        let option2 = {};
        let option3 = {};
        let option4 = {};
        this.addRowdata(isClone);
        this.form.tablecompound = [
          {
            contractcompound_id: '',
            contractnumber: '',
            claimtype: '',
            group_id: '',
            claimamount: '',
            contractrequestamount: '',
            rowindex: '',
          },
        ];
        //this.form.tableclaimtype = [];
        // if (this.form.claimtype === 'HT001001') {
        //   this.addRowclaimtype();
        //   this.form.tableclaimtype[0].claimtype = letclaimtypeone;
        //   this.form.tableclaimtype[0].recoverystatus = '0';
        //   option1.code = 'HT001001';
        //   option1.value = letclaimtypeone;
        //   this.optionscompound.push(option1);
        // } else if (this.form.claimtype === 'HT001002') {
        //   this.addRowclaimtype();
        //   this.addRowclaimtype();
        //   this.form.tableclaimtype[0].claimtype = letclaimtypeone;
        //   this.form.tableclaimtype[1].claimtype = letclaimtypetwo;
        //   this.form.tableclaimtype[0].recoverystatus = '0';
        //   this.form.tableclaimtype[1].recoverystatus = '0';
        //   option1.code = 'HT001001';
        //   option1.value = letclaimtypeone;
        //   option2.code = 'HT001002';
        //   option2.value = letclaimtypetwo;
        //   this.optionscompound.push(option1);
        //   this.optionscompound.push(option2);
        // } else if (this.form.claimtype === 'HT001003') {
        //   this.addRowclaimtype();
        //   this.addRowclaimtype();
        //   this.addRowclaimtype();
        //   this.form.tableclaimtype[0].claimtype = letclaimtypeone;
        //   this.form.tableclaimtype[1].claimtype = letclaimtypetwo;
        //   this.form.tableclaimtype[2].claimtype = letclaimtypethree;
        //   this.form.tableclaimtype[0].recoverystatus = '0';
        //   this.form.tableclaimtype[1].recoverystatus = '0';
        //   this.form.tableclaimtype[2].recoverystatus = '0';
        //   option1.code = 'HT001001';
        //   option1.value = letclaimtypeone;
        //   option2.code = 'HT001002';
        //   option2.value = letclaimtypetwo;
        //   option3.code = 'HT001003';
        //   option3.value = letclaimtypethree;
        //   this.optionscompound.push(option1);
        //   this.optionscompound.push(option2);
        //   this.optionscompound.push(option3);
        //
        // } else if (this.form.claimtype === 'HT001004') {
        //   this.addRowclaimtype();
        //   this.addRowclaimtype();
        //   this.addRowclaimtype();
        //   this.addRowclaimtype();
        //   this.form.tableclaimtype[0].claimtype = letclaimtypeone;
        //   this.form.tableclaimtype[1].claimtype = letclaimtypetwo;
        //   this.form.tableclaimtype[2].claimtype = letclaimtypethree;
        //   this.form.tableclaimtype[3].claimtype = letclaimtypefour;
        //   this.form.tableclaimtype[0].recoverystatus = '0';
        //   this.form.tableclaimtype[1].recoverystatus = '0';
        //   this.form.tableclaimtype[2].recoverystatus = '0';
        //   this.form.tableclaimtype[3].recoverystatus = '0';
        //   option1.code = 'HT001001';
        //   option1.value = letclaimtypeone;
        //   option2.code = 'HT001002';
        //   option2.value = letclaimtypetwo;
        //   option3.code = 'HT001003';
        //   option3.value = letclaimtypethree;
        //   option4.code = 'HT001004';
        //   option4.value = letclaimtypefour;
        //   this.optionscompound.push(option1);
        //   this.optionscompound.push(option2);
        //   this.optionscompound.push(option3);
        //   this.optionscompound.push(option4);
        // }
        //add gbb 20210508 合同觉书的情况带入旧合同回数 start
        let letint = 0;
        if (this.checked) {
          let rolecaneditnapin = getCurrentRoleeditnapin();
          for (let i = 0; i < this.form.tableclaimtype.length; i++) {
            let a = '0';
            // this.form.tableclaimtype[i].npbook = false;
            // for (let x = 0; x < this.DataList.length; x++) {
            //   if(this.DataList[x].award === this.$t('title.PFANS1031VIEW')){
            //     if (this.DataList[x].awardtype === this.form.tableclaimtype[i].claimtype) {
            //       a = '1';
            //       if (rolecaneditnapin === '0')
            //       {
            //         this.form.tableclaimtype[i].npbook = false;
            //       }
            //       else
            //       {
            //         this.form.tableclaimtype[i].npbook = true;
            //       }
            //     }
            //   }
            // }
            // if(a === '0'){
            //     letint = letint + 1;
            //     let letclaimtypeone = letclaimtype + this.$t('label.PFANS1026FORMVIEW_D') + letint + this.$t('label.PFANS1026FORMVIEW_H');
            //     this.form.tableclaimtype[i].claimtype = letclaimtypeone;
            // }
            if(this.form.tableclaimtype[i].tenantid === null){
              letint = letint + 1;
              let letclaimtypeone = letclaimtype + this.$t('label.PFANS1026FORMVIEW_D') + letint + this.$t('label.PFANS1026FORMVIEW_H');
              this.form.tableclaimtype[i].claimtype = letclaimtypeone;
            }
            else
            {
              this.form.claimtype = this.form.claimtype + 1;
            }
            this.form.tableclaimtype[i].contractnumbercount_id = '';
            this.form.tableclaimtype[i].contractnumber = this.letcontractnumber;
            let option = [];
            option.code = this.form.tableclaimtype[i].claimtype;
            option.value = this.form.tableclaimtype[i].claimtype;
            this.optionscompound.push(option);
          }
        }
        else{
          this.form.tableclaimtype = [];
        }

        for (let i = this.form.tableclaimtype.length; i < this.form.claimtype; i++) {
          letint = letint + 1;
          let letclaimtypeone = letclaimtype + this.$t('label.PFANS1026FORMVIEW_D') + letint + this.$t('label.PFANS1026FORMVIEW_H');
          this.addRowclaimtype1(this.form.tableclaimtype);
          this.form.tableclaimtype[i].claimtype = letclaimtypeone;
          let option = [];
          option.code = letclaimtypeone;
          option.value = letclaimtypeone;
          this.optionscompound.push(option);
        }
        //add gbb 20210508 合同觉书的情况带入旧合同回数 end
        //请求金额
        this.claimamount1 = '';
        this.claimamount2 = '';
        this.claimamount3 = '';
        this.claimamount4 = '';
        this.displaycompound = false;
        //海外受託 技術開発
        if (this.form.contracttype === 'HT008001') {
          this.titleType = this.titleType1;
        }
        //海外複合受託 技術開発
        else if (this.form.contracttype === 'HT008002') {
          this.titleType = this.titleType2;
          this.displaycompound = true;
        }
        //海外受託 役務
        else if (this.form.contracttype === 'HT008003') {
          this.titleType = this.titleType3;
        }
        //海外複合受託 役務
        else if (this.form.contracttype === 'HT008004') {
          this.titleType = this.titleType4;
          this.displaycompound = true;
        }
        //国内受託 技術開発
        else if (this.form.contracttype === 'HT008005') {
          this.titleType = this.titleType5;
        }
        //国内複合受託 技術開発
        else if (this.form.contracttype === 'HT008006') {
          this.titleType = this.titleType6;
          this.displaycompound = true;
        }
        //国内受託 役務
        else if (this.form.contracttype === 'HT008007') {
          this.titleType = this.titleType7;
        }
        //国内複合受託 役務
        else if (this.form.contracttype === 'HT008008') {
          this.titleType = this.titleType8;
          this.displaycompound = true;
        }
        //販売
        else if (this.form.contracttype === 'HT008009') {
          this.titleType = this.titleType9;
        }
        this.getChecked(false);
        this.loading = false;
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
      //存在check
      existCheck(contractNumber, index) {
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
        if (index < 5) {
          this.$store.dispatch('PFANS1026Store/existCheck', {contractNumber: contractNumber})
            .then(response => {
              let s = 'count' + index;
              if (response[s] > 0 && s == 'count1') {
                this.tipMes(contractNumber, index);
                // Message({
                //   message: this.$t('label.PFANS1026FORMVIEW_QXSCZQSCDQYS'),
                //   type: 'error',
                //   duration: 5 * 1000,
                // });
              } else if (response[s] > 0 && s === 'count2') {
                this.tipMes(contractNumber, index);
                // Message({
                //   message: this.$t('label.PFANS1026FORMVIEW_QXSCZQSCDQYS1'),
                //   type: 'error',
                //   duration: 5 * 1000,
                // });
              } else if (response[s] > 0 && s === 'count3') {
                this.tipMes(contractNumber, index);
                // Message({
                //   message: this.$t('label.PFANS1026FORMVIEW_QXSCZQSCDQYS2'),
                //   type: 'error',
                //   duration: 5 * 1000,
                // });
              } else if (response[s] > 0 && s === 'count4') {
                this.tipMes(contractNumber, index);
                // Message({
                //   message: this.$t('label.PFANS1026FORMVIEW_QXSCZQSCDQYS3'),
                //   type: 'error',
                //   duration: 5 * 1000,
                // });
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
        } else {
          let NapinList = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
            NapinList.push(this.multipleSelection[i].claimnumber);
          }
          ;
          let s = 'count' + index;
          if (s === 'count5') {
            // 纳品书
            this.$store.dispatch('PFANS1026Store/existN', NapinList)
              .then(response => {
                if (response[s] > 0 && s === 'count5') {
                  this.tipMes(contractNumber, index);
                } else {
                  let countNumber = '';
                  if (this.multipleSelection.length === 0) {
                    Message({
                      message: this.$t('normal.info_01'),
                      type: 'info',
                      duration: 2 * 1000,
                    });
                    this.dialogBook = false;
                    this.loading = false;
                    return;
                  }
                  if (this.multipleSelection.length > 0) {
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                      // if (this.multipleSelection[i].claimtype.indexOf("第一回") >= 0) {
                      //   countNumber = this.multipleSelection[i].contractnumber + '-1';
                      // }
                      // if (this.multipleSelection[i].claimtype.indexOf("第二回") >= 0) {
                      //   countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-2';
                      // }
                      // if (this.multipleSelection[i].claimtype.indexOf("第三回") >= 0) {
                      //   countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-3';
                      // }
                      // if (this.multipleSelection[i].claimtype.indexOf("第四回") >= 0) {
                      //   countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-4';
                      // }
                      let huishu = this.multipleSelection[i].claimtype.replace('第', '').replace('回', '').replace('覚書', '');
                      countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-' + huishu;
                    }
                    var tabledata = {
                      'contractnumber': contractNumber,
                      'rowindex': index,
                      'countNumber': countNumber,
                    };
                  } else {
                    var tabledata = {'contractnumber': contractNumber, 'rowindex': index};
                  }
                  // add_fjl_0604 --添加请求书和纳品书的选择生成
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
          } else {
            let QingqiuList = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
              QingqiuList.push(this.multipleSelection[i].claimnumber);
            }
            ;
            // 请求书
            this.$store.dispatch('PFANS1026Store/existQ', QingqiuList)
              .then(response => {
                if (response[s] > 0 && s === 'count6') {
                  this.tipMes(contractNumber, index);
                } else {
                  let countNumber = '';
                  if (this.multipleSelection.length === 0) {
                    Message({
                      message: this.$t('normal.info_01'),
                      type: 'info',
                      duration: 2 * 1000,
                    });
                    this.dialogBook = false;
                    this.loading = false;
                    return;
                  }
                  if (this.multipleSelection.length > 0) {
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                      // if (this.multipleSelection[i].claimtype.indexOf("第一回") >= 0) {
                      //   countNumber = this.multipleSelection[i].contractnumber + '-1';
                      // }
                      // if (this.multipleSelection[i].claimtype.indexOf("第二回") >= 0) {
                      //   countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-2';
                      // }
                      // if (this.multipleSelection[i].claimtype.indexOf("第三回") >= 0) {
                      //   countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-3';
                      // }
                      // if (this.multipleSelection[i].claimtype.indexOf("第四回") >= 0) {
                      //   countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-4';
                      // }
                      let huishu = this.multipleSelection[i].claimtype.replace('第', '').replace('回', '').replace('覚書', '');
                      ;
                      countNumber = countNumber + ',' + this.multipleSelection[i].contractnumber + '-' + huishu;
                    }
                    var tabledata = {
                      'contractnumber': contractNumber,
                      'rowindex': index,
                      'countNumber': countNumber,
                    };
                  } else {
                    var tabledata = {'contractnumber': contractNumber, 'rowindex': index};
                  }
                  // add_fjl_0604 --添加请求书和纳品书的选择生成
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
          }

        }

      },
      //書類作成
      clickData(val) {
        this.existCheck(this.letcontractnumber, val);
      },
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1026View',
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
          //add  ml   20210707    合同期间check   from
          if(!this.form.tabledata[i].claimdatetime || this.form.tabledata[i].claimdatetime === ''){
            Message({
              message: this.$t('normal.error_08') + this.$t('label.PFANS1026VIEW_CONTRACTPERIOD'),
              type: 'error',
              duration: 5 * 1000,
            });
            return;
          }
          //add  ml   20210707    合同期间check   to
          // if(this.form.tabledata[i].currencyposition !== '' && this.form.tabledata[i].currencyposition !== null){
          //   for(let k = 0;k < this.options.length;k++){
          //     if(this.form.tabledata[i].currencyposition === this.options[k].value){
          //       // o.currencyposition = this.options[k].code;
          //         o.currencyposition = this.options[k].value;
          //     }
          //   }
          // }
          o.claimdatetime = this.getclaimdatetime(this.form.tabledata[i].claimdatetime);
          o.contracttype =this.form.contracttype;
          //海外受託 技術開発
          if (this.form.contracttype === 'HT008001') {
            o.maketype = '1';
          }
          //海外複合受託 技術開発
          else if (this.form.contracttype === 'HT008002') {
            o.maketype = '2';
          }
          //海外受託 役務
          else if (this.form.contracttype === 'HT008003') {
            o.maketype = '3';
          }
          //海外複合受託 役務
          else if (this.form.contracttype === 'HT008004') {
            o.maketype = '4';
          }
          //国内受託 技術開発
          else if (this.form.contracttype === 'HT008005') {
            o.maketype = '5';
          }
          //国内複合受託 技術開発
          else if (this.form.contracttype === 'HT008006') {
            o.maketype = '6';
          }
          //国内受託 役務
          else if (this.form.contracttype === 'HT008007') {
            o.maketype = '7';
          }
          //国内複合受託 役務
          else if (this.form.contracttype === 'HT008008') {
            o.maketype = '8';
          }
          //販売
          else if (this.form.contracttype === 'HT008009') {
            o.maketype = '9';
          }
          // if (this.form.tabledata[i].state === this.$t('label.PFANS8008FORMVIEW_EFFECTIVdeE')) {
          //add-ws-4/17-契约番号废弃状态有效变无效修改
          if (this.form.tabledata[i].state === this.$t('label.PFANS8008FORMVIEW_EFFECTIVE')) {
            let letclaimamount = 0;
            for (let j = 0; j < this.form.tableclaimtype.length; j++) {
              letclaimamount = letclaimamount + Number(this.form.tableclaimtype[j].claimamount);
              //请求番号
              let claimnumber = this.form.tabledata[i].contractnumber + '-' + (j + 1);
              this.form.tableclaimtype[j].claimnumber = claimnumber;
            }
            o.state = this.$t('label.PFANS8008FORMVIEW_EFFECTIVE');
            o.claimamount = letclaimamount;
          }
          //add-ws-4/17-契约番号废弃状态有效变无效修改
          // }
          // DEL_FJL  start
          // if (Array.isArray(this.form.tabledata[i].conchinese)) {
          //     o.conchinese = this.form.tabledata[i].conchinese.join(',');
          // }
          // DEL_FJL   end
          baseInfo.contractapplication.push(o);
        }
//              baseInfo.contractapplication = this.tabledata;
        //UPD_FJL  start
        //回数详情table
        for (let i = 0; i < this.form.tableclaimtype.length; i++) {
          let p = {};
          Object.assign(p, this.form.tableclaimtype[i]);
          p.claimdatetimeqh = this.getclaimdatetime(this.form.tableclaimtype[i].claimdatetimeqh);
          baseInfo.contractnumbercount.push(p);
        }
        //UPD_FJL   end
        baseInfo.contractcompound = [];
        for (let x = 0; x < this.form.tablecompound.length; x++) {
          let o = {};
          if (this.form.tablecompound[x].claimtype != '') {
            o.contractcompound_id = this.form.tablecompound[x].contractcompound_id;
            o.contractnumber = this.form.tablecompound[x].contractnumber;
            o.claimtype = this.form.tablecompound[x].claimtype;
            o.group_id = this.form.tablecompound[x].group_id;
            o.claimamount = this.form.tablecompound[x].claimamount;
            o.contractrequestamount = this.form.tablecompound[x].contractrequestamount;
            o.rowindex = this.form.tablecompound[x].rowindex;
            baseInfo.contractcompound.push(o);
          }
        }
        this.makeintoBaseInfo = {};
        this.makeintoBaseInfo = baseInfo;
        if (value === 'makeinto') {
          this.handleIndexDisabled();
        }
        else if (value === 'cancellation') {
            //废弃
            this.handleCancellation(baseInfo);
        }
        else {
          this.handleSaveContract(value, baseInfo);
        }
      },
        //废弃
      handleCancellation(baseInfo) {
          this.loading = true;
            if (this.$route.params._id) {
                this.$store.dispatch('PFANS1026Store/update', baseInfo)
                    .then(response => {
                        this.data = response;
                        Message({
                            message: this.$t('normal.success_02'),
                            type: 'success',
                            duration: 5 * 1000,
                        });
                        this.loading = false;
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
            }
        },

      // add_fjl_0604 --添加请求书和纳品书的选择生成
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // add_fjl_0604 --添加请求书和纳品书的选择生成
      //contractapplication save
      handleSaveContract(value, baseInfo, tabledata) {
        this.validateByType(value, valid => {
          if (valid) {
            //add-ws-请求金额不可为0check添加
            let checksum = 0;
            let checkdate = 0;
            let checkdate1 = 0;
            let error = 0;
            for (let j = 0; j < this.form.tableclaimtype.length; j++) {
              if (parseFloat(this.form.tableclaimtype[j].claimamount) === 0
                || this.form.tableclaimtype[j].claimamount === ''
                || this.form.tableclaimtype[j].claimamount === undefined) {
                checksum = checksum + 1;
              }
              // add_fjl 纳品预定日必填check  start
              if (this.form.tableclaimtype[j].deliverydate === '' ||
                this.form.tableclaimtype[j].deliverydate === null) {
                checkdate = 1;
              }
              //请求日
              if (this.form.tableclaimtype[j].claimdate === '' ||
                this.form.tableclaimtype[j].claimdate === null) {
                checkdate1 = 1;
              }
              // add_fjl 纳品预定日必填check  end
            }
            if (checksum != 0) {
              error = error + 1;
              Message({
                message: this.$t('label.PFANS1026FORMVIEW_CHECKERRORMONEY'),
                type: 'error',
                duration: 5 * 1000,
              });
              return;
            }
            //add-ws-请求金额不可为0check添加
            // add_fjl 纳品预定日必填check  start
            if (checkdate != 0) {
              error = error + 1;
              Message({
                message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_DELIVERYDATE'),
                type: 'error',
                duration: 5 * 1000,
              });
              return;
            }
            //请求日
            if (checkdate1 != 0) {
              error = error + 1;
              Message({
                message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CLAIMDATE'),
                type: 'error',
                duration: 5 * 1000,
              });
              return;
            }
            // add_fjl 纳品预定日必填check  end

            //region复合合同金额分配check

            let one = 0;
            let two = 0;
            let three = 0;
            let four = 0;
            let letone = [];
            let lettwo = [];
            let letthree = [];
            let letfour = [];
            let checkcontractrequestamount = 0;
            let checkgroup = 0;
            for (let x = 0; x < this.form.tablecompound.length; x++) {
              if (this.form.tablecompound[x].claimtype != '') {
                if (parseFloat(this.form.tablecompound[x].contractrequestamount) === 0
                  || this.form.tablecompound[x].contractrequestamount === ''
                  || this.form.tablecompound[x].contractrequestamount === undefined) {
                  checkcontractrequestamount = checkcontractrequestamount + 1;
                }
                if (this.form.tablecompound[x].group_id === '') {
                  checkgroup = checkgroup + 1;
                }
              }
              for (let y = 0; y < this.form.tableclaimtype.length; y++) {
                if (this.form.tablecompound[x].claimtype === this.form.tableclaimtype[y].claimtype) {
                  let op = [];
                  op.claimtype = this.form.tablecompound[x].claimtype;
                  op.contractrequestamount = this.form.tablecompound[x].contractrequestamount;
                  op.group_id = this.form.tablecompound[x].group_id;
                  op.claimamount = this.form.tablecompound[x].claimamount;
                  letone.push(op);
                }
              }
              // if (this.form.tablecompound[x].claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_ONE')) != -1) {
              //   one = one + this.form.tablecompound[x].contractrequestamount;
              //   letone.push(this.form.tablecompound[x].group_id);
              // }
              // if (this.form.tablecompound[x].claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_TWO')) != -1) {
              //   two = two + this.form.tablecompound[x].contractrequestamount;
              //   lettwo.push(this.form.tablecompound[x].group_id);
              // }
              // if (this.form.tablecompound[x].claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_THREE')) != -1) {
              //   three = three + this.form.tablecompound[x].contractrequestamount;
              //   letthree.push(this.form.tablecompound[x].group_id);
              // }
              // if (this.form.tablecompound[x].claimtype.indexOf(this.$t('label.PFANS1026FORMVIEW_FOUR')) != -1) {
              //   four = four + this.form.tablecompound[x].contractrequestamount;
              //   letfour.push(this.form.tablecompound[x].group_id);
              // }
            }
            if (checkcontractrequestamount != 0) {
              Message({
                message: this.$t('label.PFANS1026FORMVIEW_COMPOUND'),
                type: 'error',
                duration: 5 * 1000,
              });
              return;
            }
            if (checkgroup != 0) {
              Message({
                message: this.$t('label.PFANS1026FORMVIEW_GROUPID'),
                type: 'error',
                duration: 5 * 1000,
              });
              return;
            }
            letone.sort((a, b) => {
              return a.claimtype > b.claimtype;
            });
            // PSDCD_PFANS_20210310_BUG_030 ztc start
            let datamountMap = new Map();
            let counttype = 0;
            for (let t = 0; t < this.form.tableclaimtype.length; t++)
            {
              if(this.form.tableclaimtype[t].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS')) != -1)
              {
                counttype = counttype+1;
              }
            }
            if (counttype === this.form.tableclaimtype.length || counttype ===0)
            {
              for (let t = 0; t < this.form.tableclaimtype.length; t++) {
                datamountMap.set(this.form.tableclaimtype[t].claimtype, this.form.tableclaimtype[t].claimamount);
              }
            }
            else
            {
              for (let t = 0; t < this.form.tableclaimtype.length; t++) {
                if(this.form.tableclaimtype[t].claimtype.indexOf(this.$t('label.PFANS1024VIEW_LETTERS')) != -1)
                {
                  datamountMap.set(this.form.tableclaimtype[t].claimtype, this.form.tableclaimtype[t].claimamount);
                }
              }
            }

            let scanList = [];
            let scanMap = new Map();
            for (let h = 0; h < letone.length; h++) {
              let scanChild = letone[h].claimtype + letone[h].group_id;
              scanList.push(scanChild);
              if (h == 0) {
                scanMap.set(letone[h].claimtype, letone[h].contractrequestamount)
              } else {
                let resultAnt = scanMap.get(letone[h].claimtype)
                if (resultAnt == undefined) {
                  scanMap.set(letone[h].claimtype, letone[h].contractrequestamount)
                } else {
                  let resultInScanMap = resultAnt + letone[h].contractrequestamount;
                  scanMap.set(letone[h].claimtype, resultInScanMap)
                }
              }
            }
            ;
            // 复合合同同一请求回合，部门不能重复
            for (let p = 0; p < letone.length; p++) {
              let cek = 0;
              let checkChild = letone[p].claimtype + letone[p].group_id;
              for (let c = 0; c < scanList.length; c++) {
                if (checkChild == scanList[c]) {
                  cek++;
                }
                if (cek > 1) {
                  Message({
                    message: letone[p].claimtype + this.$t('label.PFANS1026FORMVIEW_GROUP'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
              }
            }
            // 复合合同分配金额校验
            if(this.form.contracttype === 'HT008002' || this.form.contracttype === 'HT008004'
              || this.form.contracttype === 'HT008006' || this.form.contracttype === 'HT008008'){
              for (let t = 0; t < this.form.tableclaimtype.length; t++) {
                let dataMapChild = datamountMap.get(this.form.tableclaimtype[t].claimtype);
                let scanMapChild = scanMap.get(this.form.tableclaimtype[t].claimtype);
                if (dataMapChild != scanMapChild) {
                  Message({
                    message: this.$t('label.PFANS1026FORMVIEW_COMPOUNDM'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
              }
            }

            // PSDCD_PFANS_20210310_BUG_030 ztc end
            function refrain(arr) {
              var tmp = [];
              if (Array.isArray(arr)) {
                arr.concat().sort().sort(function(a, b) {
                  if (a == b && tmp.indexOf(a) === -1) tmp.push(a);
                });
              }
              return tmp;
            }

            //endregion
            if (error === 0) {
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
          } else {
            Message({
              message: this.$t('normal.error_12'),
              type: 'error',
              duration: 5 * 1000,
            });
          }
        });
      },
      handleSaveNumber(tabledata) {
//            this.validateByType(index, valid => {
//              if (valid) {
        // add_fjl_0604 --添加请求书和纳品书的选择生成
        let contractnumber = tabledata.contractnumber;
        let rowindex = tabledata.rowindex;
        let countNumber = tabledata.countNumber;
        // add_fjl_0604 --添加请求书和纳品书的选择生成

        this.loading = true;
        this.$store.dispatch('PFANS1026Store/insertBook', {
          'contractnumber': contractnumber,
          'rowindex': rowindex,
          'countNumber': countNumber,
        })
          .then(response => {
            //add-ws-7/1-禅道152任务
            this.$store.commit('global/SET_HISTORYURL', '');
            this.$store.commit('global/SET_WORKFLOWURL', '/FFFFF1024FormView');
            if (response.quolist != '') {
              this.$router.push({
                name: 'PFANS1027FormView',
                params: {
                  _checkdisable: this.disable,
                  _checkid: this.IDname,
                  _check: true,
                  _id: response.quolist,
                  disabled: true,
                },
              });
            }
            if (response.nonlist != '') {
              this.$router.push({
                name: 'PFANS1028FormView',
                params: {
                  _checkdisable: this.disable,
                  _checkid: this.IDname,
                  _check: true,
                  _id: response.nonlist,
                  disabled: true,
                },
              });
            }
            if (response.conlist != '') {
              this.$router.push({
                name: 'PFANS1029FormView',
                params: {
                  _checkdisable: this.disable,
                  _checkid: this.IDname,
                  _check: true,
                  _id: response.conlist,
                  disabled: true,
                },
              });
            }
            if (response.awardlist1 != '') {
              this.$router.push({
                name: 'PFANS1030FormView',
                params: {
                  _checkdisable: this.disable,
                  _checkid: this.IDname,
                  _check: true,
                  _id: response.awardlist1,
                  disabled: true,
                },
              });
            }
            if (response.naplist != '') {
              this.$router.push({
                name: 'PFANS1031FormView',
                params: {
                  _checkdisable: this.disable,
                  _checkid: this.IDname,
                  _check: true,
                  _id: response.naplist,
                  disabled: false,
                },
              });
            }
            if (response.petilist != '') {
              this.$router.push({
                name: 'PFANS1032FormView',
                params: {
                  _checkdisable: this.disable,
                  _checkid: this.IDname,
                  _check: true,
                  _id: response.petilist,
                  disabled: false,
                },
              });
            }
            this.loading = false;
            //add-ws-7/1-禅道152任务
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
        } else {
          this.dialogBook = true;
        }
      },


      buttonClick(val) {
        if (val === 'back') {
          this.paramsTitle();
        } else if (val === 'application') {
          this.display = true;
          this.checkeddisplay = true;
          this.dialogFormVisible = true;
          this.show1 = true;
          this.show2 = false;
          if (!this.$route.params._id) {
            this.form.contracttype = 'HT008001';
            this.form.applicationdate = 'HT007001';
            this.form.entrycondition = 'HT003001';
          } else {
            this.getChecked(true);
          }
        }
        if (val === 'cancellation') {
          this.$confirm(this.$t('normal.confirm_discardcontract'), this.$t('normal.info'), {
            confirmButtonText: this.$t('button.confirm'),
            cancelButtonText: this.$t('button.cancel'),
            type: 'warning',
          }).then(() => {
            for (let i = 0; i < this.form.tabledata.length; i++) {
              this.form.tabledata[i].state = this.$t('label.PFANS8008FORMVIEW_INVALID');
              this.form.tabledata[i].entrycondition = 'HT004001';
            }
            this.handleSave('cancellation');
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('label.PFANS1026FORMVIEW_tipis3'),
            });
            return;
          });
        }
        // this.display = false;
        // this.checkeddisplay = false;
        // this.dialogFormVisible = true;
        // this.show1=false;
        // this.show2=true;
        // this.form.contractnumber = this.$route.params._id;
        if (val === 'save') {
          this.handleSave('save');
        }
        if (val === 'makeinto') {
          this.handleSave('makeinto');
        }
      },
      validateByType: function(type, cb) {
        let that = this;
        let countIndex = 0;
        if (type == 6) {
          if (this.maketype === '1' || this.maketype === '2' || this.maketype === '3' || this.maketype === '4') {
            if (this.form.tabledata[this.form.tabledata.length - 1].currencyposition === 'PG019003') {
              type = '61';
            } else {
              type = '62';
            }
          }
        }
        let rowCount = that.form.tabledata.length || 0;
        let rowCount2 = that.form.tableclaimtype.length || 0;
        let myRule = this.ruleSet[type] || [];
        if (myRule.length <= 0) {
          cb(true);
        }
        this.$refs['refform'].clearValidate();
        let pros = [];
        myRule.forEach(function(item, index, array) {
          let dataName = 'tabledata';
          let maxCount = rowCount;
          if (['claimdatetimeqh', 'deliverydate', 'completiondate', 'claimdate', 'supportdate', 'deliveryfinshdate', 'loadingjudge', 'claimamount'].indexOf(item) >= 0) {
            dataName = 'tableclaimtype';
            maxCount = rowCount2;
            for (var k = 0; k < maxCount; k++) {
              var itIndex = dataName + '.' + k + '.' + item;
              let pro = new Promise(function(resolve, reject) {
                that.$refs['refform'].validateField(itIndex, function(msg) {
                  if (msg != '') {
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
                if (msg != '') {
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
        if (countIndex > 0 && type !== 'save') {
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
