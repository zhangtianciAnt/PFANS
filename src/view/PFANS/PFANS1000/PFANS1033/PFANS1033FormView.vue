<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         @buttonClick="buttonClick"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form1" :rules="rules1" label-position="top" label-width="6vw" ref="refform1"
                 style="padding: 2vw">
          <el-dialog :title="$t('button.application')" :visible.sync="dialogVisibleC">
            <el-form-item :label="$t('label.PFANS1024VIEW_NUMBER')" :label-width="formLabelWidth"
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
                :disabled="disableCG"
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
              <org
                :orglist="form1.grouporglist"
                orgtype="4"
                :error="errorgroup"
                style="width: 20vw"
                @getOrgids="getGroupId"
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
                <el-input class="content bg" v-model="form1.custojapanese" :disabled="true">
                  <!--                  <el-button :disabled="!disabled2" size="small" slot="append" icon="el-icon-search"-->
                  <!--                             @click="handleClickE()"></el-button>-->
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
          <!--add ccm 0720-->
          <!--书类作成弹出框-->
          <el-dialog :visible.sync="dialogBook" width="30%">
            <div class="dialog-footer" align="center">
              <el-row style=" margin-bottom: 20px;">
                <el-col :span="24">
                  <el-button @click="clickData(9)">
                  <span style="margin-right: 86%;">{{$t('label.PFANS1026FORMVIEW_AWARD')}}
                  </span>
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-dialog>
          <!--<el-dialog :title="$t('button.application')"  :visible.sync="dialogFormVisible">
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
            <el-form-item :label="$t('label.group')" :label-width="formLabelWidth" prop="group">
              <org  :orglist="grouporglist" orgtype="2" style="width: 20vw" @getOrgids="getGroupId" :disabled="!disabled2"></org>
            </el-form-item>
            <el-form-item :label="$t('label.PFANS1024VIEW_SIDEGROUP')" :label-width="formLabelWidth">
              <org  :orglist="grouporglist1" orgtype="2" style="width: 20vw" @getOrgids="getGroupId1" :disabled="!disabled2"></org>
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
          </el-dialog>-->
          <span>{{this.titleType}}</span>
          <el-table :data="tablefourth" stripe header-cell-class-name="sub_bg_color_grey height"
                    :header-cell-style="getRowClass4">
            <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content" type="index"
                             width="50"></el-table-column>
            <el-table-column :label="$t('label.department')" align="center" width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem"
                          maxlength='36'></el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_DEPLOYMENT')" align="center" prop="deployment" width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.deployment" :disabled="!disabled3" style="width: 11rem"
                          maxlength='36'></el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.applicant')" align="center" prop="user_id" width="200"
                             :error="erroruser">
              <template slot-scope="scope">
                <user :disabled="!disabled" :no="scope.row" :error="erroruser" :selectType="selectType"
                      :userlist="scope.row.user_id"
                      @getUserids="getUserids" style="width: 10.15rem"></user>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')" align="center" prop="applicationdate"
                             width="200">
              <template slot-scope="scope">
                <el-date-picker :disabled="!disabled3" type="date" v-model="scope.row.applicationdate"
                                style="width: 11rem"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"
                             width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contracttype">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')" align="center" prop="contractnumber"
                             width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled3" maxlength="20" v-model="scope.row.contractnumber">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYCONDITION')" align="center" prop="entrycondition"
                             width="200">
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
            <el-table-column :label="$t('label.PFANS1024VIEW_ENTRYPAYMENT')" align="center" prop="entrypayment"
                             width="200">
              <template slot-scope="scope">
                <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.entrypayment"
                                style="width: 11rem"></el-date-picker>
              </template>
            </el-table-column>
            <!--<el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center"  prop="claimtype" width="200">-->
            <!--<template slot-scope="scope">-->
            <!--<el-input :disabled="!disabled3" v-model="scope.row.claimtype">-->
            <!--</el-input>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"  width="200">-->
            <!--<template slot-scope="scope">-->
            <!--<el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliverydate" style="width: 11rem" ></el-date-picker>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"  width="200">-->
            <!--<template slot-scope="scope">-->
            <!--<el-date-picker :disabled="!disabled" type="date" v-model="scope.row.completiondate" style="width: 11rem" ></el-date-picker>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"  width="200">-->
            <!--<template slot-scope="scope">-->
            <!--<el-date-picker :disabled="!disabled" type="date" v-model="scope.row.claimdate" style="width: 11rem" ></el-date-picker>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center"  prop="claimamount" width="200">-->
            <!--<template slot-scope="scope">-->
            <!--<el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!-- 111111!-->
            <el-table-column :label="$t('label.PFANS1024VIEW_CURRENCYPOSITION')" align="center" prop="currencyposition"
                             width="200">
              <template slot-scope="scope">
                <!--                    <dicselect-->
                <!--                      :code="code9"-->
                <!--                      :data="scope.row.currencyposition"-->
                <!--                      :no="scope.row"-->
                <!--                      :multiple="multiple"-->
                <!--                      @change="getCurrencyposition"-->
                <!--                      style="width: 11rem"-->
                <!--                      :disabled="!disabled">-->
                <!--                    </dicselect>-->
                <monthlyrate :month="month9"
                             :data="scope.row.currencyposition"
                             :no="scope.row"
                             :multiple="multiple"
                             @change="getCurrencyposition"
                             style="width: 11rem"
                             :disabled="!disabled">>
                </monthlyrate>
                <!--                      add-ws-12/10-汇率字典-->
                <!--<el-select :no="scope.row" v-model="scope.row.currencyposition" @change="(val)=>{getCurrencyposition(val,scope.row)}" style="width: 11rem" :disabled="!disabled">-->
                <!--<el-option v-for="(item,index) in options" :key="index" v-model="item.value">-->
                <!--{{item.value}}-->
                <!--</el-option>-->
                <!--</el-select>-->
              </template>
            </el-table-column>
            <!--<el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"  width="200">-->
            <!--<template slot-scope="scope">-->
            <!--<el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportdate" style="width: 11rem" ></el-date-picker>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTDATE')" align="center" prop="contractdate"
                             width="370">
              <template slot-scope="scope">
                <el-date-picker unlink-panels
                                class="bigWidth"
                                :disabled="!disabled"
                                v-model="scope.row.contractdate"
                                type="daterange"
                                :end-placeholder="$t('label.enddate')"
                                :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                :start-placeholder="$t('label.startdate')"
                ></el-date-picker>
              </template>
            </el-table-column>
            <!--            upd-ws-01/16-禅道任务710-->
            <el-table-column :label="$t('label.PFANS1024VIEW_TEMA')" align="center" prop="theme" width="200">
              <template slot-scope="scope">
                <el-form-item prop="theme" :prop="'tabledata.' + scope.$index + '.theme'" :rules='rules.theme'>
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
            <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERNAME')" align="center" width="120">
              <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="custojapanese"
                               width="200" :error="errorcusto">
                <template slot-scope="scope">
                  <!--<user :disabled="!disabled" :no="scope.row" :error="errorcusto" :selectType="selectType" :userlist="scope.row.custojapanese"-->
                  <!--@getUserids="getCusto" style="width: 10.15rem"></user>-->
                  <div class="">
                    <el-input class="content bg"
                              :disabled="!disabled"
                              v-model="scope.row.custojapanese">
                      <el-button :disabled="true" size="small" slot="append" icon="el-icon-search"
                                 @click="handleClickA(scope.row)"></el-button>
                    </el-input>
                  </div>
                  <el-dialog :visible.sync="dialogVisibleA"
                             top="8vh"
                             append-to-body>
                    <el-table :data="dataA" :row-key="rowid" @row-click="rowClick" max-height="400" ref="roletableA"
                              v-loading='loading'>
                      <el-table-column property="supchinese" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
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
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center" prop="custoenglish"
                               width="200">
                <template slot-scope="scope">
                  <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.custoenglish">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ABBREVIATION')" align="center" prop="custoabbreviation"
                               width="200">
                <template slot-scope="scope">
                  <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.custoabbreviation">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center" prop="custochinese"
                               width="200">
                <template slot-scope="scope">
                  <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.custochinese">
                  </el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CUSTOMERPLACE')" align="center" width="120">
              <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="placejapanese"
                               width="200">
                <template slot-scope="scope">
                  <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.placejapanese">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center" prop="placeenglish"
                               width="200">
                <template slot-scope="scope">
                  <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.placeenglish">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center" prop="placechinese"
                               width="200">
                <template slot-scope="scope">
                  <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.placechinese">
                  </el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_RESPON')" align="center" width="120">
              <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREJAPANESE')" align="center" prop="responjapanese"
                               width="200">
                <template slot-scope="scope">
                  <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.responjapanese">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_BEFOREENGLISH')" align="center" prop="responerglish"
                               width="200">
                <template slot-scope="scope">
                  <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.responerglish">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_PHONE')" align="center" prop="responphone" width="200">
                <template slot-scope="scope">
                  <el-input maxlength="100" :disabled="!disabled" v-model="scope.row.responphone">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_EMAIL')" align="center" prop="responemail" width="200">
                <template slot-scope="scope">
                  <el-input maxlength="100" :disabled="!disabled" v-model="scope.row.responemail">
                  </el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACT2')" align="center" width="120">
              <el-table-column :label="$t('label.PFANS1024VIEW_JAPANESE')" align="center" prop="conjapanese"
                               width="200">
                <template slot-scope="scope">
                  <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.conjapanese">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_ENGLISH')" align="center" prop="conenglish" width="200">
                <template slot-scope="scope">
                  <el-input maxlength="255" :disabled="!disabled" v-model="scope.row.conenglish">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_CHINESE')" align="center" prop="conchinese" width="200">
                <template slot-scope="scope">
                  <!--                      <project style="width: 100%" :data="scope.row.conchinese" :no="scope.row" :multiple="true" v-model="scope.row.conchinese"-->
                  <!--                               @change="changePro" :disabled="!disabled">-->
                  <!--                      </project>-->
                  <el-input maxlength="255" v-model="scope.row.conchinese" :disabled="!disabled"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_ENTRUSTEDNUMBER')" align="center" prop="entrustednumber"
                             width="200" :error="errorcontractnumber">
              <template slot-scope="scope">
                <!--<user :disabled="!disabled" :no="scope.row" :error="errorcontractnumber" :selectType="selectType" :userlist="scope.row.entrustednumber"-->
                <!--@getUserids="getContractnumber" style="width: 10.15rem"></user>-->
                <div class="">
                  <el-input class="content bg"
                            :disabled="true"
                            v-model="scope.row.entrustednumber">
                    <el-button :disabled="!disabled" size="small" slot="append" icon="el-icon-search"
                               @click="handleClickD(scope.row)"></el-button>
                  </el-input>
                </div>
                <el-dialog :visible.sync="dialogVisibleD"
                           top="8vh"
                           append-to-body>
                  <el-table :data="tableD" :row-key="rowid" @row-click="rowClickD" max-height="400" ref="roletableD"
                            v-loading='loading'>
                    <el-table-column property="user_id" :label="$t('label.applicant')" width="120"></el-table-column>
                    <el-table-column property="deployment" :label="$t('label.department')" width="120"></el-table-column>
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
            <el-table-column :label="$t('label.PFANS1024VIEW_PAPERCONTRACT')" align="center" prop="papercontract"
                             width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.papercontract" :disabled="!disabled">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_STATE')" align="center" prop="state" width="200">
            </el-table-column>
          </el-table>
          <el-table :data="tableclaimtype" stripe header-cell-class-name="sub_bg_color_grey height"
                    :header-cell-style="getRowClass4" style="padding-top: 2vw">
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center" prop="claimtype" width="130">
              <template slot-scope="scope">
                <!--                <el-form-item :prop="'tableclaimtype.' + scope.$index + '.claimtype'" :rules='rules.claimtype'>-->
                <el-input :disabled="!disabled3" v-model="scope.row.claimtype">
                </el-input>
                <!--                </el-form-item>-->
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"
                             width="170">
              <template slot-scope="scope">
                <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliverydate"
                                style="width: 9rem"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" prop="completiondate"
                             width="170">
              <template slot-scope="scope">
                <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.completiondate"
                                style="width: 9rem"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate" width="170">
              <template slot-scope="scope">
                <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.claimdate"
                                style="width: 9rem"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"
                             width="170">
              <template slot-scope="scope">
                <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportdate"
                                style="width: 9rem"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" prop="claimamount"
                             width="190">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem"
                                 :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS3005VIEW_NUMBERS')" align="center" prop="purnumbers" width="190"
                             v-if="showCG">
              <template slot-scope="scope">
                <el-input :disabled="true" v-model="scope.row.purnumbers" controls-position="right"
                          style="width: 11rem">
                </el-input>
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
  import {
    getOrgInfo,
    getDictionaryInfo,
    getUserInfo,
    getSupplierinfor,
    getStatus,
    getOrgInfoByUserId,
    getOrgInformation,
  } from '@/utils/customize';
  import user from '../../../components/user.vue';
  import org from '../../../components/org';
  import moment from 'moment';
  import project from '../../../components/project';
  import monthlyrate from '../../../components/monthlyrate';

  export default {
    name: 'PFANS1024View',
    components: {
      monthlyrate,
      EasyNormalContainer,
      dicselect,
      user,
      org,
      project,
    },
    data() {
      var groupId = (rule, value, callback) => {
        if (!this.form1.grouporglist || this.form1.grouporglist === '') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.department')));
          this.errorgroup = this.$t('normal.error_08') + this.$t('label.department');
        } else {
          callback();
        }
      };
      var checkApplicationdate = (rule, value, callback) => {
        if (!this.form1.applicationdate || this.form1.applicationdate === '' || !this.form1.entrycondition || this.form1.entrycondition === '') {
          callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1024VIEW_CAREERYEAR')));
          this.errorapplicationdate = this.$t('normal.error_09') + this.$t('label.PFANS1024VIEW_CAREERYEAR');
        } else {
          callback();
        }
      };
      return {
        //add-ws-01/06-禅道任务710
        search1: '',
        //add-ws-01/06-禅道任务710
        checkGroupId: false,
        titleType: '',
        titleType1: this.$t('label.PFANS1033VIEW_VERIFICATION'),
        titleType2: this.$t('label.PFANS1033VIEW_KEEPITSECRET'),
        titleType3: this.$t('label.PFANS1033VIEW_INDENTURE'),
        titleType4: this.$t('label.PFANS1033VIEW_SETUPINDENTURE'),
        checked: false,
        checkeddisplay: true,
        dialogBook: false,
        display: true,
        contractnumbercount: '',
        contractapplication: {},
        errorjudge: '',
        errorfirstjudge: '',
        errorsecondjudge: '',
        erroroutmanager: '',
        errormanager: '',
        rowindex: '',
        maketype: '',
        selectType: 'Single',
        letcontractnumber: '',
        letcontracttype: '',
        dialogFormVisible: false,
        multiple: false,
        show3: false,
        index: '',
        grouporglist: '',
        grouporglist1: '',
        groupinfo: [],
        errorgroup: '',
        errorclaimtype: '',
        errorcontracttype: '',
        errorapplicationdate: '',
        errorcusto: '',
        erroruser: '',
        errorcontractnumber: '',
        loading: false,
        dialogVisibleC: false,
        dialogVisibleE: false,
        title: 'title.PFANS1024VIEW',
        activeName: '',
        options: [],
        disabled: true,
        disabled1: false,
        disabled2: true,
        disabled3: false,
        disabled4: false,
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
          group: [
            {
              required: true,
              validator: groupId,
              trigger: 'change',
            },
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
          claimtype: '1',
          contractnumber: '',
          contracttype: '',
          applicationdate: '',
          entrycondition: 'HT003001',
          grouporglist: '',
          custojapanese: this.$t('label.PFANS1033FORMVIEW_FIXED'),
          suppliercode: '',
        },
        form: {
          contractnumber: '',
          claimtype: '1',
          contracttype: '',
          applicationdate: '',
          entrycondition: '',
          group_id: '',
          maketype: '',
        },
        formcustomer: {
          custojapanese: '',
          custoenglish: '',
          custoabbreviation: this.$t('label.PFANS1033FORMVIEW_FIXED'),
          custochinese: '',
          placejapanese: '',
          placeenglish: '',
          placechinese: '',
          responjapanese: '',
          responerglish: '',
          responphone: '',
          responemail: '',
        },
        formLabelWidth: '120px',
        tableclaimtype: [],
        tableclaimtypeold: [],
        tablefirst: [],
        tablesecond: [],
        tablethird: [],
        tablefourth: [],
        code: 'HT001',
        code1: 'PJ028',
        code2: 'HT015',
        code3: 'HT007',
        code4: 'HT003',
        code5: 'HT004',
        code6: 'HT009',
        code7: 'HT010',
        code8: 'HT011',

        //add-ws-12/10-汇率字典
        //  code9: 'PG019',
        month9: moment(new Date()).format('YYYY-MM'),
        //add-ws-12/10-汇率字典
        show1: true,
        show2: false,
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
        //add ccm 0722
        caigouhetongTable: [],
        showCG: false,
        enableButton: true,
        disableCG: false,
        //add ccm 0722
      };
    },
    mounted() {
      if (this.$route.params.contractnumbercount) {
        this.contractnumbercount = this.$route.params.contractnumbercount;
      }
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
      //add ccm 0722
      if (this.$route.params._caigouhetongTable) {
        //this.caigouhetongTable = this.$route.params._caigouhetongTable;

        this.buttonClick('application');
        this.disableCG = true;
        this.showCG = true;
      }
      //add ccm 0722
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/get2', {'contractnumber': this.$route.params._id})
          .then(response => {
            let contractapplication = response.contractapplication;
            let contractnumbercount = response.contractnumbercount;
            if (contractapplication.length > 0) {
              for (let i = 0; i < contractapplication.length; i++) {
                this.show3 = true;
                if (contractapplication[i].claimtype) {
                  this.form1.claimtype = contractapplication[i].claimtype.replace('第', '').replace('回', '');
                }
                if (contractapplication[i].checkindivdual === '1' && this.buttonList.length > 3) {
                  this.enableButton = false;
                }
                this.form1.contractnumber = contractapplication[i].contractnumber;
                this.form1.contracttype = contractapplication[i].contracttype;
                this.form1.applicationdate = contractapplication[i].careeryear;
                // this.form1.custojapanese = contractapplication[i].custojapanese;
                this.maketype = contractapplication[i].maketype;
                //契約書番号
                this.letcontractnumber = contractapplication[i].contractnumber;
                //契約種類
                this.form.contracttype = contractapplication[i].contracttype;
                //事業年度
                this.form.applicationdate = contractapplication[i].careeryear;
                //上下期
                this.form.entrycondition = contractapplication[i].periods;
                this.form1.entrycondition = contractapplication[i].periods;
                //グループ
                this.getGroupId(contractapplication[i].group_id);
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
                if (this.maketype === '1') {
                  this.titleType = this.titleType1;
                } else if (this.maketype === '2') {
                  this.titleType = this.titleType2;
                } else if (this.maketype === '3') {
                  this.titleType = this.titleType3;
                } else if (this.maketype === '4') {
                  this.titleType = this.titleType4;
                }
                this.tablefourth.push(o);

              }
            }
            if (contractnumbercount.length > 0) {
              if (contractnumbercount[0].purnumbers != null && contractnumbercount[0].purnumbers != '' && contractnumbercount[0].purnumbers != undefined) {
                this.showCG = true;
              } else {
                this.showCG = false;
              }
              this.tableclaimtype = contractnumbercount;
              this.tableclaimtypeold = contractnumbercount;
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

      let userid = this.$store.getters.userinfo.userid;
      if (userid !== null && userid !== '') {
        let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
        if (lst !== null && lst !== '') {
          this.form1.grouporglist = lst.centerId;
          this.getGroupId(this.form1.grouporglist);
          this.checkGroupId = true;
        } else {
          this.checkGroupId = false;
        }
      }
      if (this.$route.params._applicantdeptcode) {
        this.form1.grouporglist = this.$route.params._applicantdeptcode;
        this.getGroupId(this.form1.grouporglist);
        this.checkGroupId = true;
      }
      //get customer
      this.getsupplierinfor();
      //テーマ
      //upd-ws-01/06-禅道任务710
      this.getdata('0');
      //upd-ws-01/06-禅道任务710
      //get project
      this.getProjectList();
      //get contractapplication type=1
      this.getContract();
    },
    created() {
      this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1033View');
      this.disabled = this.$route.params.disabled;
      if (!this.disabled || this.$route.params.state === this.$t('label.PFANS8008FORMVIEW_INVALID')) {
        this.buttonList = [];
      }
      //add-lyt-21/3/10-NT_PFANS_20210226_BUG_027-start
       //画面没有 makeinto按钮，删除
      if(this.$route.params._id === ''){
          this.buttonList[3].disabled = true;
      }
      //add-lyt-21/3/10-NT_PFANS_20210226_BUG_027-end
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
            if (this.enableButton === false && this.buttonList.length > 3) {
              this.buttonList[3].disabled = false;
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
          .dispatch('PFANS1026Store/get2', {'type': '1'})
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
            if (this.enableButton === false && this.buttonList.length > 3) {
              this.buttonList[3].disabled = false;
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
      getGroupId1(val) {
        this.grouporglist1 = val;
        // let group = getOrgInfo(val);
        // if(group){
        //     this.groupinfo = [val,group.companyen,group.orgname,group.companyname];
        // }----------
      },
      getUserids(val, row) {
        row.user_id = val;
        if (!row.user_id || row.user_id === '' || val === 'undefined') {
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.erroruser = '';
        }
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
      getRowClass4({row, column, rowIndex, columnIndex}) {

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
      addRowfourth() {
        this.tablefourth.push({
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
          entrycondition: '',
          entrypayment: '',
          claimtype: this.form1.claimtype,
          deliverydate: '',
          completiondate: '',
          claimdate: moment(new Date()).format('YYYY-MM-DD'),
          claimamount: '',
          currencyposition: '',
          supportdate: '',
          extensiondate: '',
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
          type: '2',
          maketype: '',
          theme: '',//追加
          temaid: '',
          checkindivdual: '',
        });
      },
      addRowclaimtype() {
        this.tableclaimtype.push({
          contractnumbercount_id: '',
          contractnumber: this.letcontractnumber,
          claimtype: '1',
          deliverydate: '',
          completiondate: '',
          claimdate: moment(new Date()).format('YYYY-MM-DD'),
          claimamount: '',
          supportdate: '',
          type: '1',
          maketype: '',
          rowindex: '',
          purnumbers: '',
        });
      },
      // handleClickE() {
      //     //this.form.claimtype = this.form1.claimtype;
      //     this.dialogVisibleE = true;
      // },
      rowClickE(row) {//333
        // this.form1.custojapanese = row.supjapanese;

        this.formcustomer.custojapanese = row.supjapanese;
        this.formcustomer.custoenglish = row.supenglish;
        this.formcustomer.custoabbreviation = row.abbreviation;
        this.formcustomer.custochinese = row.supchinese;
        this.formcustomer.suppliercode = row.suppliercode;

        this.formcustomer.placejapanese = row.addjapanese;
        this.formcustomer.placeenglish = row.addenglish;
        this.formcustomer.placechinese = row.addchinese;

        this.formcustomer.responjapanese = row.projapanese;
        this.formcustomer.responerglish = row.proenglish;
        this.formcustomer.responphone = row.protelephone;
        this.formcustomer.responemail = row.protemail;
        this.dialogVisibleE = false;
      },
      //契約番号做成111
      click() {
        this.$refs['refform1'].validate(valid => {
          if (valid) {
            this.form.claimtype = this.form1.claimtype;
            this.form.contractnumber = this.form1.contractnumber;
            this.form.contracttype = this.form1.contracttype;
            this.form.applicationdate = this.form1.applicationdate;
            this.form.entrycondition = this.form1.entrycondition;
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
                if(this.groupinfo[2].trim() !== "") {
                  this.letcontractnumber = abbreviation + applicationdate + entrycondition + this.groupinfo[2] + '0000' + letbook;
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

            // if(this.form.claimtype === "HT001001"){
            //     this.addRowclaimtype();
            //     this.tableclaimtype[0].claimtype = letclaimtypeone;
            // }
            // else if(this.form.claimtype === "HT001002"){
            //     this.addRowclaimtype();
            //     this.addRowclaimtype();
            //     this.tableclaimtype[0].claimtype = letclaimtypeone;
            //     this.tableclaimtype[1].claimtype = letclaimtypetwo;
            //
            // }
            // else if(this.form.claimtype === "HT001003"){
            //     this.addRowclaimtype();
            //     this.addRowclaimtype();
            //     this.addRowclaimtype();
            //     this.tableclaimtype[0].claimtype = letclaimtypeone;
            //     this.tableclaimtype[1].claimtype = letclaimtypetwo;
            //     this.tableclaimtype[2].claimtype = letclaimtypethree;
            //
            // }
            // else if(this.form.claimtype === "HT001004"){
            //     this.addRowclaimtype();
            //     this.addRowclaimtype();
            //     this.addRowclaimtype();
            //     this.addRowclaimtype();
            //     this.tableclaimtype[0].claimtype = letclaimtypeone;
            //     this.tableclaimtype[1].claimtype = letclaimtypetwo;
            //     this.tableclaimtype[2].claimtype = letclaimtypethree;
            //     this.tableclaimtype[3].claimtype = letclaimtypefour;
            // }

            //add gbb 20210508 合同觉书的情况带入旧合同回数 start
            let tableclaimtypenew = [];
            if (this.checked) {
              for (let i = 0; i < this.tableclaimtypeold.length; i++) {
                if(i < this.form.claimtype){
                  let letclaimtypeone = letclaimtype + this.$t('label.PFANS1026FORMVIEW_D') + (i + 1) + this.$t('label.PFANS1026FORMVIEW_H');
                  this.tableclaimtypeold[i].claimtype = letclaimtypeone;
                  this.tableclaimtypeold[i].contractnumbercount_id = '';
                  this.tableclaimtypeold[i].contractnumber = this.letcontractnumber;
                  tableclaimtypenew.push(this.tableclaimtypeold[i]);
                }
              }
              this.tableclaimtype = tableclaimtypenew;
            }
            else{
              this.tableclaimtype = [];
            }
            for (let i = this.tableclaimtype.length; i < this.form.claimtype; i++) {
              let letclaimtypeone = letclaimtype + this.$t('label.PFANS1026FORMVIEW_D') + (i + 1) + this.$t('label.PFANS1026FORMVIEW_H');
              this.addRowclaimtype();
              this.tableclaimtype[i].claimtype = letclaimtypeone;
            }
            //add gbb 20210508 合同觉书的情况带入旧合同回数 end
            if (this.checked) {
              for (let i = 0; i < this.tablefourth.length; i++) {
                this.tablefourth[i].state = this.$t('label.PFANS8008FORMVIEW_INVALID');
              }
            }

            //add ccm 0722
            if (this.$route.params._caigouhetongTable) {
              for (let c = 0; c < this.form.claimtype; c++) {
                this.tableclaimtype[c].claimamount = this.$route.params._caigouhetongTable[c].totalamount;
                this.tableclaimtype[c].purnumbers = this.$route.params._caigouhetongTable[c].purnumbers;
              }
            }
            //add ccm 0722

            this.addRowfourth();
            this.getChecked(false);
            this.dialogVisibleC = false;
          } else {
            Message({
              message: this.$t('normal.error_12'),
              type: 'error',
              duration: 5 * 1000,
            });
            this.dialogVisibleC = true;
          }
        });
      },
      //契約番号廃棄
      clickDiscard() {
        if (!this.show1) {
          for (let i = 0; i < this.tablefourth.length; i++) {
            this.tablefourth[i].state = this.$t('label.PFANS8008FORMVIEW_INVALID');
          }
        }
        this.dialogFormVisible = false;
      },
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1033View',
          params: {
            title: 10,
          },
        });
      },
      //保存
      handleSave(tabledatabook) {

        let baseInfo = {};
        baseInfo.contractapplication = [];
        baseInfo.contractnumbercount = [];
        let tabledata = [];
        tabledata = this.tablefourth;

        for (let i = 0; i < tabledata.length; i++) {
          if (this.$route.params._applicantdeptcode) {
            tabledata[i].checkindivdual = '1';
          }
          //tabledata[i].state = this.$t('label.PFANS8008FORMVIEW_EFFECTIVE');
          tabledata[i].contractdate = this.getcontractdate(tabledata[i].contractdate);
          tabledata[i].contracttype = this.form.contracttype;
          if (tabledata[i].entrycondition === 'HT004001') {
            tabledata[i].state = this.$t('label.PFANS8008FORMVIEW_INVALID');
          }
          if (this.form.contracttype === 'HT015001') {
            tabledata[i].maketype = '1';
          } else if (this.form.contracttype === 'HT015002') {
            tabledata[i].maketype = '2';
          } else if (this.form.contracttype === 'HT015003') {
            tabledata[i].maketype = '3';
          } else if (this.form.contracttype === 'HT015004') {
            tabledata[i].maketype = '4';
          }
          if (Array.isArray(tabledata[i].conchinese)) {
            tabledata[i].conchinese = tabledata[i].conchinese.join(',');
          }
        }
        baseInfo.contractapplication = tabledata;
        baseInfo.contractnumbercount = this.tableclaimtype;
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.$route.params._id) {
              this.$store.dispatch('PFANS1026Store/update', baseInfo)
                .then(response => {
                  this.data = response;
                  if (tabledatabook) {
                    this.handleSaveNumber(tabledatabook);
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
              // add fr 检查是否有申请至少一条契约番号
              if (this.tablefourth.length === 0) {
                Message({
                  message: this.$t('normal.error_application'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              } else {
                this.$store.dispatch('PFANS1026Store/insert', baseInfo)
                  .then(response => {
                    this.data = response;
                    if (tabledatabook) {
                      this.handleSaveNumber(tabledatabook);
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
              // add to 检查是否有申请至少一条契约番号
            }
          }
        });
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'application') {
          this.display = true;
          this.checkeddisplay = true;
          this.dialogFormVisible = true;
          this.show1 = true;
          this.show2 = false;
          this.dialogVisibleC = true;
          if (!this.$route.params._id) {
            // this.form.claimtype = 'HT001001';
            // this.form.contracttype = 'HT015001';
            // this.form.applicationdate = 'HT007001';
            // this.form.entrycondition = 'HT003001';
          } else {
            this.getChecked(true);
          }
          if (this.$route.params._caigouhetongTable) {
            // this.caigouhetongTable.length = 5;
            this.form1.claimtype = this.$route.params._caigouhetongTable.length;
            this.form1.contracttype = 'HT015004';
            this.form1.applicationdate = 'HT007003';
            this.form1.entrycondition = 'HT003001';
            this.form1.grouporglist = this.$route.params._applicantdeptcode;

          }
        }
        if (val === 'cancellation') {
          this.$confirm(this.$t('normal.confirm_discardcontract'), this.$t('normal.info'), {
            confirmButtonText: this.$t('button.confirm'),
            cancelButtonText: this.$t('button.cancel'),
            type: 'warning',
          }).then(() => {
            this.$message({
              type: 'success',
              message: this.$t('label.PFANS1026FORMVIEW_tipis2'),
            });
          }).then(() => {
            for (let i = 0; i < this.tablefourth.length; i++) {
              this.tablefourth[i].state = this.$t('label.PFANS8008FORMVIEW_INVALID');
              this.tablefourth[i].entrycondition = 'HT004001';
            }
            this.handleSaveLin('cancellation');
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('label.PFANS1026FORMVIEW_tipis3'),
            });
            return;
          });
        }
        if (val === 'save') {
          this.handleSaveLin('save');
        }
        if (val === 'makeinto') {
          this.handleSaveLin('makeinto');
        }
      },
      //add ccm 0722
      handleSaveNumber(tabledata) {
        this.loading = true;
        this.$store.dispatch('PFANS1026Store/insertBook', tabledata)
          .then(response => {
            this.$store.commit('global/SET_HISTORYURL', '');
            this.$store.commit('global/SET_WORKFLOWURL', '/FFFFF1024FormView');
            if (response.awardlist3 != '') {
              this.$store.commit('global/SET_OPERATEID', response.awardlist3);
              this.$router.push({
                name: 'PFANS1047FormView',
                params: {
                  _checkdisable: this.disable,
                  check_id: this.IDname,
                  _checkname: true,
                  _id: response.awardlist3,
                  disabled: true,
                },
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
      },
      //書類作成
      clickData(val) {
        this.existCheck(this.letcontractnumber, val);
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
        /*判断是否已经生产决裁书*/
        this.$store.dispatch('PFANS1026Store/existCheck', {contractNumber: contractNumber})
          .then(response => {
            let s = 'count' + index;
            if (response[s] > 0) {
              this.tipMes(contractNumber, index);

            } else {
              var tabledata = {'contractnumber': contractNumber, 'rowindex': index};
              this.handleSave(tabledata);
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
      tipMes(contractNumber, index) {
        this.$confirm(this.$t('normal.error_tipis'), this.$t('normal.info'), {
          confirmButtonText: this.$t('button.confirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning',
        }).then(() => {
          var tabledata = {'contractnumber': contractNumber, 'rowindex': index};
          this.handleSave(tabledata);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('label.PFANS1026FORMVIEW_tipis'),
          });
        });
      },
      handleSaveLin(val) {
        if (val === 'makeinto') {
          this.handleIndexDisabled();
        } else {
          this.handleSave();
        }
      },
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
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      },
      //add ccm 0722
    },
  };
</script>

<style scoped>

</style>
