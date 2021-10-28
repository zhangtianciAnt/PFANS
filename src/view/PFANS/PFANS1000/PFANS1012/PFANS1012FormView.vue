<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title"
                         @buttonClick="buttonClick" @disabled="setdisabled" :enableSave="enableSave"
                         @end="end" @start="start" @workflowState="workflowState" ref="container" v-loading="loading"
                         :workflowCode="workflowCode">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane :label="$t('label.PFANS1012VIEW_SUMMONS')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.center')">
                      <org :disabled="true"
                           :orglist="form.centerid"
                           @getOrgids="getCenterid"
                           orgtype="1"
                           style="width: 20vw"
                      ></org>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.group')">
                      <org :disabled="checkGro"
                           :orglist="form.groupid"
                           @getOrgids="getGroupId"
                           orgtype="2"
                           style="width: 20vw"
                      ></org>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.team')">
                      <org :disabled="true"
                           :orglist="form.teamid"
                           @getOrgids="getTeamid"
                           orgtype="3"
                           style="width: 20vw"
                      ></org>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_TELEPHONE')" prop="telephone">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_REIMBURSEMENTDATE')" prop="application_date">
                      <el-date-picker :disabled="true" style="width:20vw" v-model="form.reimbursementdate"
                                      @change="changeereimbursementdate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_MODULE')">
                      <!--                      upd-lyt-21/3/24-PSDCD_PFANS_20210318_BUG_035-:disabled参数更改为新创建的moduledisable参数-start-->
                      <dicselect :code="code2"
                                 :data="form.moduleid"
                                 :disabled="moduledisable"
                                 :multiple="multiple"
                                 @change="getmodule"
                                 style="width:20vw"
                                 v-if="show6"
                      >
                      </dicselect>
                      <!--                      upd-lyt-21/3/24-PSDCD_PFANS_20210318_BUG_035-:disabled参数更改为新创建的moduledisable参数-end-->
                      <el-input :disabled="true" style="width:20vw"
                                v-model="form.moduleidApp" v-if="show9"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--与财务王颖确认此项在系统中没有用 ztc-->
                  <!--                  <el-col :span="8">-->
                  <!--                    <el-form-item :label="$t('label.PFANS1012VIEW_ACCOUNTNUMBER')" prop="account_number">-->
                  <!--                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"-->
                  <!--                                v-model="form.accountnumber"></el-input>-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-col>-->
                  <el-col :span="8">
<!--                    update_qhr_20210811 添加项目名称必填项-->
                    <el-form-item :label="$t('label.PFANS5004VIEW_PROJECTNAMW')" prop="projectname">
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
                </el-row>
<!--            region    add_qhr_20210830 添加外注费用check、记账日期-->
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_CHECKWZFY')" label-width="24vw">
                      <span style="margin-right: 1vw ">{{$t('label.no')}}</span>
                      <el-switch :disabled="!disable"
                                 v-model="form.checkedWZFY"
                                 active-value="0"
                                 inactive-value="1"
                      ></el-switch>
                      <span style="margin-left: 1vw ">{{$t('label.yes')}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_JZMONTH')" prop="jzmonth">
                      <el-date-picker
                        style="width: 20vw"
                        :disabled="!disable"
                        type="month"
                        v-model="form.jzmonth">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
<!--                endregion    add_qhr_20210830 添加外注费用check、记账日期-->
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_RMBEXPENDITURE')" prop="rmbexpenditure">
                      <thousandnum
                        :disabled="true"
                        :min="0"
                        :precision="2"
                        @change="getMoney"
                        style="width:20vw"
                        v-model="form.rmbexpenditure"
                      ></thousandnum>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_CURRENCYEXPENDITURE')"
                                  v-if="this.form.type === 'PJ001001'?false:true">
                      <thousandnum
                        :disabled="true"
                        :max="1000000000"
                        :min="0"
                        :precision="2"
                        @change="getforeigncurrency"
                        style="width:20vw"
                        v-model="form.foreigncurrency"
                      ></thousandnum>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_CURRENCY')"
                                  v-if="this.form.type === 'PJ001001'?false:true">
                      <el-input :disabled="true" style="width:20vw" v-model="form.currency"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_TORMB')"
                                  v-if="this.form.type === 'PJ001001'?false:true">
                      <thousandnum
                        :disabled="true"
                        :max="1000000000"
                        :min="0"
                        :precision="2"
                        style="width:20vw"
                        v-model="form.tormb"
                      ></thousandnum>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYMENTMETHOD')" prop="paymentmethod">
                      <dicselect :code="code3"
                                 :data="form.paymentmethod"
                                 :disabled="this.form.type === 'PJ001001'?true:!disable"
                                 :multiple="multiple"
                                 @change="getPayment"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_EXPECTEDPAYDATE')">
                      <el-date-picker :disabled="checkexpectedpaydate" style="width:20vw"
                                      v-model="form.expectedpaydate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <!--                  <el-col :span="8">-->
                  <!--                    <el-form-item :label="$t('label.PFANS1012VIEW_EXPORTCSV')">-->
                  <!--                      <el-switch-->
                  <!--                        @change="changeexternal(scope.row)"-->
                  <!--                        :disabled="!disable"-->
                  <!--                        v-model="form.exportcsv"-->
                  <!--                        active-value="1"-->
                  <!--                        inactive-value="0"-->
                  <!--                      >-->
                  <!--                      </el-switch>-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-col>-->
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="errorsuppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                  prop="suppliername" v-show="show1">
                      <div class="dpSupIndex" style="width: 20vw" prop="suppliername">
                        <el-container>
                          <input class="content bg" v-model="form.suppliername" :error="errorsuppliername"
                                 :disabled="true">
                          <el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible = true"
                                     size="small"></el-button>
                          <el-dialog :title="$t('title.PFANS6003VIEW')" :visible.sync="dialogTableVisible" center
                                     size="50%"
                                     top="8vh" lock-scroll
                                     append-to-body>
                            <div style="text-align: center">
                              <el-row style="text-align: center;height: 90%;overflow: hidden">
                                <el-table
                                  :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                                  height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                  @row-click="handleClickChange">
                                  <el-table-column property="suppliername"
                                                   :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeename"
                                                   :label="$t('label.PFANS1012VIEW_PAYEENAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="suppliercode"
                                                   :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')"
                                                   width="100"></el-table-column>
                                  <el-table-column property="payeebankaccountnumber"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeebankaccount"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')"
                                                   width="150"></el-table-column>
                                  <el-table-column
                                    align="right" width="230">
                                    <template slot="header" slot-scope="scope">
                                      <el-input
                                        v-model="search"
                                        size="mini"
                                        :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME')"/>
                                    </template>
                                  </el-table-column>
                                </el-table>
                              </el-row>
                              <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
                        </span>
                            </div>
                          </el-dialog>
                        </el-container>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEENAME')" v-show="show1" prop="payeename">
                      <el-input :disabled="true" maxlength="50" style="width:20vw"
                                v-model="form.payeename"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')" v-show="show1" prop="payeecode">
                      <el-input :disabled="true" maxlength="20" style="width:20vw" type="email"
                                v-model="form.payeecode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')" v-show="show1"
                                  prop="payeebankaccountnumber">
                      <el-input :disabled="true" maxlength="20" style="width:20vw"
                                v-model="form.payeebankaccountnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')" v-show="show1"
                                  prop="payeebankaccount">
                      <el-input :disabled="true" maxlength="50" style="width:20vw"
                                v-model="form.payeebankaccount"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--add-ws-8/12-禅道任务446-->
                  <el-col :span="8" v-if="this.role2==='0'">
                    <el-form-item :label="$t('label.status')">
                      <el-select clearable style="width: 20vw" v-model="form.processingstatus" :disabled="acceptShow"
                                 :placeholder="$t('normal.error_09')">
                        <el-option
                          v-for="item in options2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!--add-ws-8/12-禅道任务446-->
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="errorname" :label="$t('label.PFANS1006FORMVIEW_USERNAME')" v-show="show2">
                      <user :disabled="!disable" :error="errorname" :selectType="selectType" :userlist="namelist"
                            @getUserids="getUsernames" style="width: 20vw" v-model="form.user_name"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_CAIWUPERSONALCODE')" v-show="show2" prop="code">
                      <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.code"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="errorsuppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                  prop="suppliername" v-show="show3">
                      <div class="dpSupIndex" style="width: 20vw" prop="suppliername">
                        <el-container>
                          <input class="content bg" v-model="form.suppliername" :error="errorsuppliername"
                                 :disabled="true"></input>
                          <el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible = true"
                                     size="small"></el-button>
                          <el-dialog :title="$t('title.PFANS6003VIEW')" :visible.sync="dialogTableVisible" center
                                     size="50%"
                                     top="8vh" lock-scroll
                                     append-to-body>
                            <div style="text-align: center">
                              <el-row style="text-align: center;height: 90%;overflow: hidden">
                                <el-table
                                  :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                                  height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                  @row-click="handleClickChange">
                                  <el-table-column property="suppliername"
                                                   :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeename"
                                                   :label="$t('label.PFANS1012VIEW_PAYEENAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="suppliercode"
                                                   :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')"
                                                   width="100"></el-table-column>
                                  <el-table-column property="payeebankaccountnumber"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeebankaccount"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')"
                                                   width="150"></el-table-column>
                                  <el-table-column
                                    align="right" width="230">
                                    <template slot="header" slot-scope="scope">
                                      <el-input
                                        v-model="search"
                                        size="mini"
                                        :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME')"/>
                                    </template>
                                  </el-table-column>
                                </el-table>
                              </el-row>
                              <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
                        </span>
                            </div>
                          </el-dialog>
                        </el-container>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_PAYEENAME')" v-show="show3" prop="payeecode">
                      <el-input :disabled="true" maxlength="50" style="width:20vw"
                                v-model="form.payeename"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')" v-show="show3" prop="payeecode">
                      <el-input :disabled="true" maxlength="20" style="width:20vw"
                                v-model="form.payeecode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <!--                  <el-col :span="8">-->
                  <!--                    <el-form-item :label="$t('label.PFANS1012VIEW_TEMPORARYLOAN')" v-show="show4" prop="loan">-->
                  <!--                      <el-select :disabled="!disable" @change="changeLoan" clearable filterable style="width:20vw"-->
                  <!--                                 v-model="form.loan">-->
                  <!--                        <el-option-->
                  <!--                          :key="item.value"-->
                  <!--                          :label="item.label"-->
                  <!--                          :value="item.value"-->
                  <!--                          v-for="item in options">-->
                  <!--                        </el-option>-->
                  <!--                      </el-select>-->
                  <!--                      <el-button @click="clickBun" size="small" type="primary">{{$t('button.view')}}</el-button>-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-col>-->
                  <!--                  &lt;!&ndash;                  add_fjl_0722 添加【供应商/社员名称】显示  start&ndash;&gt;-->
                  <!--                  <el-col :span="8" v-if="form.loan !== ''">-->
                  <!--                    <el-form-item :label="$t('label.PFANS1012VIEW_ACCENAME')">-->
                  <!--                      <el-input :disabled="true" style="width:20vw" v-model="form.accename"></el-input>-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-col>-->
                  <!--                  &lt;!&ndash;                  add_fjl_0722 添加【供应商/社员名称】显示  end&ndash;&gt;-->
                  <el-table :data="tableLoa" border ref="multipleTable"
                            v-show="show4" header-cell-class-name="sub_bg_color_blue"
                            stripe style="width: 957px" @selection-change="handleSelectionChange">
                    <!--                    add-ws-8/20-禅道469-->
                    <el-table-column type="selection" width="55"
                                     :selectable="selectInit"></el-table-column>
                    <!--                    add-ws-8/20-禅道469-->
                    <el-table-column :label="$t('label.PFANS1012VIEW_TEMPORARYLOAN')" align="center"
                                     prop="loanapno" width="200px">
                      <template slot-scope="scope">
                        <span>{{scope.row.loanapno}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1013VIEW_LOANAMOUNT')" align="center" prop="moneys"
                                     width="150px">
                      <template slot-scope="scope">
                        <span>{{scope.row.moneys}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_ACCENAME')" align="center" prop="accename"
                                     width="400px">
                      <template slot-scope="scope">
                        <span>{{scope.row.accename}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.operation')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-button
                          @click.native.prevent="rowClickLoa(scope.row)"
                          plain
                          size="small"
                          type="primary"
                          :disabled="(fromViewname !== undefined || IDname === undefined) ? true : false "
                        >{{$t('button.viewdetails')}}
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="errorsuppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                  prop="suppliername" v-show="show5">
                      <div class="dpSupIndex" style="width: 20vw" prop="suppliername">
                        <el-container>
                          <input class="content bg" v-model="form.suppliername" :error="errorsuppliername"
                                 :disabled="true"></input>
                          <el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible = true"
                                     size="small"></el-button>
                          <el-dialog :title="$t('title.PFANS6003VIEW')"
                                     :visible.sync="dialogTableVisible"
                                     center size="50%"
                                     top="8vh" lock-scroll
                                     append-to-body>
                            <div style="text-align: center">
                              <el-row style="text-align: center;height: 90%;overflow: hidden">
                                <el-table
                                  :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                                  height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                  @row-click="handleClickChange">
                                  <el-table-column property="suppliername"
                                                   :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeename"
                                                   :label="$t('label.PFANS1012VIEW_PAYEENAME')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="suppliercode"
                                                   :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')"
                                                   width="100"></el-table-column>
                                  <el-table-column property="payeebankaccountnumber"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')"
                                                   width="150"></el-table-column>
                                  <el-table-column property="payeebankaccount"
                                                   :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')"
                                                   width="150"></el-table-column>
                                  <el-table-column
                                    align="right" width="230">
                                    <template slot="header" slot-scope="scope">
                                      <el-input
                                        v-model="search"
                                        size="mini"
                                        :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME')"/>
                                    </template>
                                  </el-table-column>
                                </el-table>
                              </el-row>
                              <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
                        </span>
                            </div>
                          </el-dialog>
                        </el-container>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_COMPANYNAME')" v-show="show5" prop="fullname">
                      <el-input :disabled="true" maxlength="20"
                                style="width:20vw" v-model="form.fullname"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')">
                    <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                              v-model="form.preparefor">
                    </el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item :label="$t('label.PFANS1012VIEW_ABSTRACTTEXT')" prop="remark">
                    <el-input :disabled="!disable" style="width: 70vw" type="textarea" maxlength="60"
                              v-model="form.remark">
                    </el-input>
                  </el-form-item>
                </el-row>
                <el-row v-if="this.form.type === 'PJ001001'?false:true">
                  <span class="collapse_Title">{{$t('label.PFANS1012FORMVIEW_INVOICETTYPE')}}</span>
                  <span style="color: red;font-size: 0.85rem">{{$t('label.PFANS1012FORMVIEW_INVOICEI')}}</span>
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
                        <el-input v-show="false" :disabled="true" style="width: 100%" v-model="scope.row.invoicetype">
                        </el-input>
                        <el-input :disabled="true" style="width: 100%" v-model="invoicetype">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEM')" align="center" width="150">
                      <template slot-scope="scope">
                        <thousandnum :min="0" :precision="2" :max="9999999" :disabled="!disable"
                                         controls-position="right" :no="scope.row" @change="changeSum(scope.row)"
                                         :step="1" v-model="scope.row.invoiceamount" style="width: 100%">
                        </thousandnum>
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
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_EXCLUDINGTAX')" align="center" width="150"
                                     prop="debitamount">
                      <template slot-scope="scope">
                        <thousandnum
                          :disabled="!disable"
                          :min="0" :precision="2"
                          :max="9999999"
                          controls-position="right"
                          :no="scope.row"
                          :step="1"
                          v-model="scope.row.excludingtax"
                          @change="changesummoney(scope.row)"
                          style="width: 100%">
                        </thousandnum>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_FACETAX')" align="center" width="150"
                                     prop="creditamount">
                      <template slot-scope="scope">
                        <thousandnum
                          :disabled="true"
                          :min="0" :precision="2"
                          :max="9999999"
                          controls-position="right"
                          :no="scope.row"
                          :step="1"
                          v-model="scope.row.facetax"
                          @change="changeSum(scope.row)"
                          style="width: 100%">
                        </thousandnum>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.operation')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-button
                          :disabled="!disable"
                          @click.native.prevent="deleteRow7(scope.$index, tableF)"
                          plain
                          size="small"
                          type="danger"
                        >{{$t('button.delete')}}
                        </el-button>
                        <el-button
                          :disabled="!disable"
                          @click="addRow7()"
                          plain
                          size="small"
                          type="primary"
                        >{{$t('button.insert')}}
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1013VIEW_TRAFFIC')" name="second" v-if="show9">
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableT" :summary-method="getTsummaries"
                            header-cell-class-name="sub_bg_color_blue"
                            show-summary stripe border>
                    <el-table-column :label="$t('label.date')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-date-picker :disabled="!disable" style="width: 110%"
                                        v-model="scope.row.trafficdate"></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_DEPARTMENT')" align="center" width="200">
                      <template slot-scope="scope">
                        <org :orglist="scope.row.departmentname"
                             orgtype="2"
                             :disabled="!disable"
                             :error="errorgroup"
                             style="width: 90%"
                             :no="scope.row"
                             @getOrgids="getGroupIdT"></org>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="200">
                      <template slot-scope="scope">
                        <!--                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">-->
                        <!--                            </el-input>-->
                        <el-select clearable style="width: 100%" v-model="scope.row.budgetcoding"
                                   :disabled="!disable"
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
                        <el-input v-show="false" :disabled="true" style="width: 100%" v-model="scope.row.plsummary">
                        </el-input>
                        <el-input :disabled="true" style="width: 100%" v-model="plsummary">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.accountcode" style="width: 100%" :disabled="!disable"
                                   @change="getaccoundcode(scope.row)">
                          <el-option
                            v-for="item in scope.row.accoundoptionsdate"
                            :key="item.value"
                            :label="item.lable"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNTB')" align="center" width="150"
                                     v-if="false">
                      <template slot-scope="scope">
                        <el-input :disabled="true" style="width: 100%" v-model="scope.row.subjectnumber">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_REGION')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" style="width: 100%" maxlength="20"
                                  v-model="scope.row.region">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_VEHICLE')" align="center" width="150">
                      <template slot-scope="scope">
                        <dicselect :code="code14"
                                   :data="scope.row.vehicle"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   :no="scope.row"
                                   @change="getvehicle" style="width: 100%">
                        </dicselect>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_STARTINGPOINT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" :content="scope.row.startingpoint" placement="top"
                                    :disabled="scope.row.startingpoint===''?true:false">
                          <el-input :disabled="!disable" style="width: 100%" maxlength="20"
                                    v-model="scope.row.startingpoint"/>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="150">
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
                    <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="100">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" maxlength="20" v-model="scope.row.annexno">
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

            <el-tab-pane :label="$t('label.PFANS1012FORMVIEW_CHARGED')" name="third" v-if="show6">
              <el-collapse v-model="active">
                <el-collapse-item v-if="show6" name="1">
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANS1012VIEW_PURCHASE')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table :data="tableP" :summary-method="getPsummaries"
                                header-cell-class-name="sub_bg_color_blue"
                                show-summary stripe border>
                        <el-table-column :label="$t('label.date')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-date-picker :disabled="!disable" style="width: 110%"
                                            v-model="scope.row.purchasedetailsdate">
                            </el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-select style="width: 100%" v-model="scope.row.invoicenumber" clearable
                                       @change="changeinvoicenumber(scope.row)"
                                       :disabled="!disable">
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
                                 :disabled="checktaxes"
                                 :error="errorgroup"
                                 style="width: 100%"
                                 :no="scope.row"
                                 @getOrgids="getGroupIdP"></org>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="200">
                          <template slot-scope="scope">
                            <!--                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">-->
                            <!--                            </el-input>-->
                            <el-select clearable style="width: 100%" v-model="scope.row.budgetcoding"
                                       :disabled="checkexternal"
                                       :placeholder="$t('normal.error_09')" :no="scope.row">
                              <el-option
                                v-for="item in scope.row.optionsP"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <!--                        <el-table-column :label="$t('label.PFANS1002FROMVIEW_SFGDZC')" align="center" width="150">-->
                        <!--                          <template slot-scope="scope">-->
                        <!--                            <el-switch-->
                        <!--                              @change="changeexternal(scope.row)"-->
                        <!--                              :disabled="checktaxes"-->
                        <!--                              v-model="scope.row.external"-->
                        <!--                              active-value="1"-->
                        <!--                              inactive-value="0"-->
                        <!--                            >-->
                        <!--                            </el-switch>-->
                        <!--                          </template>-->
                        <!--                        </el-table-column>-->
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_PL')" align="center" width="150">

                          <template slot-scope="scope">
                            <el-select v-model="scope.row.plsummary" :disabled="checktaxes" style="width: 100%"
                                       clearable
                                       @change="getplsummaryP(scope.row)">
                              <el-option
                                v-for="item in ploptionsdata"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>

                        </el-table-column>
                        <!--                        upd-ws-9/23-禅道任务555-->
                        <!--                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250">-->
                        <!--                          <template slot-scope="scope">-->
                        <!--                            <dicselect :code="scope.row.code17"-->
                        <!--                                       :disabled="checktaxes"-->
                        <!--                                       :data="scope.row.accountcode"-->
                        <!--                                       :multiple="multiple"-->
                        <!--                                       :no="scope.row"-->
                        <!--                                       @change="getcode" style="width: 100%">-->
                        <!--                            </dicselect>-->
                        <!--                          </template>-->
                        <!--                        </el-table-column>-->

                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.accountcode" style="width: 100%" :disabled="!disable"
                                       @change="getaccoundcodeP(scope.row)">
                              <el-option
                                v-for="item in scope.row.accoundoptionsdateP"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>

                        <!--                        upd-ws-9/23-禅道任务555-->
                        <el-table-column :label="$t('label.PFANS1012VIEW_PROCUREMENTDETAILS')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="checktaxes" style="width: 100%"
                                      maxlength="20"
                                      v-model="scope.row.procurementdetails"
                            >
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNTB')" align="center" width="150"
                                         v-if="false">
                          <template slot-scope="scope">
                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.subjectnumber">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="150">
                          <template slot-scope="scope">
                            <thousandnum
                              :disabled="checktaxes"
                              :max="1000000000"
                              :min="0"
                              :precision="2"
                              @change="changeRMB(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.rmb"
                            ></thousandnum>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center"
                                         prop="foreigncurrency"
                                         width="150">
                          <template slot-scope="scope">
                            <thousandnum
                              :disabled="disablecheck"
                              :max="1000000000"
                              :min="0"
                              :precision="2"
                              @change="changeForeigncurrency(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.foreigncurrency"
                            ></thousandnum>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCY')" align="center" prop="currency"
                                         width="150">
                          <template slot-scope="scope">
                            <!--                      add-ws-12/10-汇率字典-->
                            <!--                            <dicselect :code="code4"-->
                            <!--                                       clearable-->
                            <!--                                       :data="scope.row.currency"-->
                            <!--                                       :multiple="multiple"-->
                            <!--                                       :no="scope.row"-->
                            <!--                                       :disabled="disa"-->
                            <!--                                       @change="getCurrency"-->
                            <!--                                       style="width: 100%">-->
                            <!--                            </dicselect>-->
                            <monthlyrate :month="month4"
                                         clearable
                                         :data="scope.row.currency"
                                         :multiple="multiple"
                                         :no="scope.row"
                                         :disabled="disa"
                                         @change="getCurrency"
                                         style="width: 100%">
                            </monthlyrate>
                            <!--                      add-ws-12/10-汇率字典-->
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCYRATE')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :max="999999"
                              :min="0"
                              :precision="7"
                              :step="0.0000001"
                              @change="getCurrencyrate(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.currencyrate"
                            ></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_TORMB')" align="center"
                                         width="150" prop="tormb">
                          <template slot-scope="scope">
                            <thousandnum
                              :disabled="true"
                              :max="1000000000"
                              :min="0"
                              :precision="2"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.tormb"
                            ></thousandnum>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center"
                                         width="150" prop="taxes">
                          <template slot-scope="scope">
                            <thousandnum
                              :disabled="true"
                              :min="0"
                              controls-position="right"
                              :precision="2"
                              style="width: 100%"
                              @change="changeRMB(scope.row)"
                              v-model="scope.row.taxes">
                            </thousandnum>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-input :disabled="checktaxes" maxlength="20" v-model="scope.row.annexno">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-button
                              :disabled="checktaxes"
                              @click.native.prevent="deleteRow3(scope.$index, tableP)"
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
                </el-collapse-item>
              </el-collapse>
              <el-collapse v-model="active2">
                <el-collapse-item v-if="show6" name="2">
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANS1012VIEW_OTHER')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table :data="tableR" :summary-method="getRsummaries" ref="tableR"
                                header-cell-class-name="sub_bg_color_blue"
                                show-summary stripe border>
                        <el-table-column :label="$t('label.date')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-date-picker :disabled="!disable" style="width: 110%"
                                            v-model="scope.row.otherdetailsdate">
                            </el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-select style="width: 100%" v-model="scope.row.invoicenumber" clearable
                                       @change="changeinvoicenumber(scope.row)"
                                       :disabled="!disable">
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
                                 :disabled="checktaxes"
                                 orgtype="4"
                                 :error="errorgroup"
                                 style="width: 100%"
                                 :no="scope.row"
                                 @getOrgids="getGroupIdR"></org>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="200">
                          <template slot-scope="scope">
                            <!--                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.budgetcoding">-->
                            <!--                            </el-input>-->
                            <el-select clearable style="width: 100%" v-model="scope.row.budgetcoding" :no="scope.row"
                                       :disabled="checkdisable"
                                       :placeholder="$t('normal.error_09')">
                              <el-option
                                v-for="item in scope.row.optionsR"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_PL')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.plsummary" :disabled="checktaxes" style="width: 100%"
                                       clearable
                                       @change="getplsummary(scope.row)">
                              <el-option
                                v-for="item in ploptionsdate"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNT')" align="center" width="250"
                        >
                          <template slot-scope="scope">
                            <dicselect :code="scope.row.code16"
                                       :disabled="checktaxes"
                                       :data="scope.row.accountcode"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getcodenew" style="width: 100%">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_ACCOUNTB')" align="center" width="150"
                                         v-if="false">
                          <template slot-scope="scope">
                            <el-input :disabled="true" style="width: 100%" v-model="scope.row.subjectnumber">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_FWTIME')" align="center" width="300"
                                         v-if="checktime">
                          <template slot-scope="scope">
                            <el-date-picker
                              unlink-panels
                              class="bigWidth"
                              v-model="scope.row.servicehours"
                              style="width: 100%"
                              slot="customize"
                              type="daterange"
                              :end-placeholder="$t('label.enddate')"
                              :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                              :start-placeholder="$t('label.startdate')"
                              @change="clickdata(scope.row)"
                            ></el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_ABSTRACT')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="checktaxes" style="width: 100%" maxlength="20"
                                      v-model="scope.row.remarks">
                            </el-input>
                          </template>
                        </el-table-column>

                        <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="150">
                          <template slot-scope="scope">
                            <thousandnum
                              :disabled="checktaxes"
                              :max="1000000000"
                              :min="0"
                              :precision="2"
                              @change="changeRMB(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.rmb"
                            ></thousandnum>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center"
                                         prop="foreigncurrency"
                                         width="150">
                          <template slot-scope="scope">
                            <thousandnum
                              :disabled="disablecheck"
                              :max="1000000000"
                              :min="0"
                              :precision="2"
                              @change="changeForeigncurrency(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.foreigncurrency"
                            ></thousandnum>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCY')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <!--                      add-ws-12/10-汇率字典-->
                            <!--                            <dicselect :code="code4"-->
                            <!--                                       :data="scope.row.currency"-->
                            <!--                                       :multiple="multiple"-->
                            <!--                                       :no="scope.row"-->
                            <!--                                       :disabled="disa"-->
                            <!--                                       @change="getCurrency"-->
                            <!--                                       style="width: 100%">-->
                            <!--                            </dicselect>-->
                            <monthlyrate :month="month4"
                                         :data="scope.row.currency"
                                         :multiple="multiple"
                                         :no="scope.row"
                                         :disabled="disa"
                                         @change="getCurrency"
                                         style="width: 100%">
                            </monthlyrate>
                            <!--                      add-ws-12/10-汇率字典-->
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_CURRENCYRATE')" align="center"
                                         width="150">
                          <template slot-scope="scope">
                            <thousandnum
                              :disabled="true"
                              :max="999999"
                              :min="0"
                              :precision="7"
                              :step="0.0000001"
                              @change="getCurrencyrate(scope.row)"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.currencyrate"
                            ></thousandnum>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_TORMB')" align="center"
                                         width="150" prop="tormb">
                          <template slot-scope="scope">
                            <thousandnum
                              :disabled="true"
                              :max="1000000000"
                              :min="0"
                              :precision="2"
                              controls-position="right"
                              style="width: 100%"
                              v-model="scope.row.tormb"
                            ></thousandnum>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012FORMVIEW_TAXES')" align="center"
                                         width="150" prop="taxes"
                        >
                          <template slot-scope="scope">
                            <thousandnum
                              :disabled="true"
                              :min="0"
                              controls-position="right"
                              style="width: 100%"
                              @change="changeRMB(scope.row)"
                              v-model="scope.row.taxes">
                            </thousandnum>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-input :disabled="checktaxes" maxlength="20" v-model="scope.row.annexno">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-button
                              :disabled="checktaxes"
                              @click.native.prevent="deleteRow4(scope.$index, tableR)"
                              plain
                              size="small"
                              type="danger"
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              :disabled="checktaxes"
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
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_NUBERSGLJC')" name="fouthd" v-if="show7">
              <el-row>
                <el-table
                  :data="DataList"
                  :summary-method="getSummaries"
                  show-summary
                  style="width: 978px"
                  header-cell-class-name="sub_bg_color_blue" stripe border
                >
                  <el-table-column
                    align="center"
                    prop="judgement_name"
                    :label="$t('label.judgement')"
                    width="180px">
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS1006FORMVIEW_DECISIVE')"
                    align="center"
                    prop="judgements_type"
                    width="180px">
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS1045VIEW_MONEYS')"
                    align="center"
                    prop="judgements_moneys"
                    width="100px">
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS1012VIEW_ABSTRACT')"
                    align="center"
                    prop="remarks"
                    width="315px">
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="rowclick(scope.row)"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.usedetails')}}
                      </el-button>
                      <el-button
                        @click.native.prevent="viewdata(scope.row)"
                        plain
                        size="small"
                        type="primary"
                        :disabled="fromViewname !== undefined ? true : false "
                      >{{$t('button.viewdetails')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <div>&nbsp;</div>
              <el-row>
                <el-table
                  :data="DataList2"
                  style="width: 841px"
                  header-cell-class-name="sub_bg_color_blue" stripe border
                  v-show="show12"
                >
                  <el-table-column
                    align="center"
                    prop="invoiceno"
                    :label="$t('label.PFANS1013VIEW_REIMNUMBER')"
                    width="280px">
                  </el-table-column>
                  <!--                    upd-lyt-21/4/13-PSDCD_PFANS_20210318_BUG_034-start-->
                  <el-table-column
                    align="center"
                    prop="detail_moneys"
                    :label="$t('label.PFANS1025VIEW_AWARDMONEY')"
                    width="280px">
                  </el-table-column>
                  <!--                    upd-lyt-21/4/13-PSDCD_PFANS_20210318_BUG_034-end-->
                  <el-table-column
                    align="center"
                    prop="status"
                    :label="$t('label.PFANS5005VIEW_STATUS')"
                    width="280px">
                  </el-table-column>
                </el-table>
              </el-row>
            </el-tab-pane>

            <!--            文件上传-->
            <el-tab-pane :label="$t('label.PFANS1004VIEW_ADDBOOK')" name="seventh">
              <el-form-item>
                <el-row>
                  <el-col :span="8">
                    <el-upload
                      :disabled="!disable"
                      :action="upload"
                      :file-list="fileList"
                      :on-remove="fileRemove"
                      :on-preview="fileDownload"
                      :on-success="fileSuccess"
                      :on-error="fileError"
                      class="upload-demo"
                      drag
                      ref="upload"
                      v-model="form.uploadfile">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em>
                      </div>
                    </el-upload>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-tab-pane>

          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
    <PFANS1003Pop :params="urlparams" :url="url" ref="PFANS1003Pop"></PFANS1003Pop>
    <PFANS1004Pop :params="urlparams" :url="url" ref="PFANS1004Pop"></PFANS1004Pop>
    <PFANS1005Pop :params="urlparams" :url="url" ref="PFANS1005Pop"></PFANS1005Pop>
    <PFANS1025Pop :params="urlparams" :url="url" ref="PFANS1025Pop"></PFANS1025Pop>
    <PFANS3005Pop :params="urlparams" :url="url" ref="PFANS3005Pop"></PFANS3005Pop>
    <PFANS1002Pop :params="urlparams" :url="url" ref="PFANS1002Pop"></PFANS1002Pop>
    <PFANS1035Pop :params="urlparams" :url="url" ref="PFANS1035Pop"></PFANS1035Pop>
    <PFANS1010Pop :params="urlparams" :url="url" ref="PFANS1010Pop"></PFANS1010Pop>
    <PFANS1006Pop :params="urlparams" :url="url" ref="PFANS1006Pop"></PFANS1006Pop>
  </div>
</template>


<script>
import PFANS1003Pop from '@/components/EasyPop/PFANS1003Pop';
import PFANS1004Pop from '@/components/EasyPop/PFANS1004Pop';
import PFANS1005Pop from '@/components/EasyPop/PFANS1005Pop';
import PFANS1025Pop from '@/components/EasyPop/PFANS1025Pop';
import PFANS3005Pop from '@/components/EasyPop/PFANS3005Pop';
import PFANS1002Pop from '@/components/EasyPop/PFANS1002Pop';
import PFANS1035Pop from '@/components/EasyPop/PFANS1035Pop';
import PFANS1010Pop from '@/components/EasyPop/PFANS1010Pop';
import PFANS1006Pop from '@/components/EasyPop/PFANS1006Pop';
import EasyNormalContainer from '@/components/EasyNormalContainer';
import user from '../../../components/user.vue';
import dicselect from '../../../components/dicselect';
import monthlyrate from '../../../components/monthlyrate';
import thousandnum from '../../../components/thousandnum';

import {
  getMonthlyrateInfo2,
  downLoadUrl,
  getCurrentRole,
  getCurrentRole5,
  getDictionaryInfo,
  getOrgInfo,
  getOrgInfoByUserId,
  getStatus,
  getUserInfo,
  uploadUrl,
  accAdd,
} from '@/utils/customize';
import {Message} from 'element-ui';
import moment from 'moment';
import org from '../../../components/org';

export default {
  name: 'PFANS1012FormView',
  components: {
    monthlyrate,
    PFANS1003Pop,
    PFANS1004Pop,
    PFANS1005Pop,
    PFANS1025Pop,
    PFANS3005Pop,
    PFANS1002Pop,
    PFANS1035Pop,
    PFANS1010Pop,
    PFANS1006Pop,
    dicselect,
    EasyNormalContainer,
    getOrgInfoByUserId,
    user,
    org,
    thousandnum,
  },
  data() {

      // region   add_qhr_20210830 添加外注费用check、记账日期
      var checkJzmonth = (rule, value, callback) => {
        if (this.form.checkedWZFY === "0") {
          if (this.form.jzmonth) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1012VIEW_JZMONTH')));
          }
        } else {
          callback();
        }
      };
      // endregion    add_qhr_20210830 添加外注费用check、记账日期
     //region  add_qhr_20210811  添加项目名称必填项
    var checkprojectname = (rule, value, callback) => {
      if (this.form.project_id) {
        callback();
      } else {
        callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS5004VIEW_PROJECTNAMW')));
      }
    };
    //endregion  add_qhr_20210811  添加项目名称必填项
    var checkuser = (rule, value, callback) => {
      if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === 'undefined') {
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

    var validatepayeename = (rule, value, callback) => {
      if (this.show1) {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEENAME')));
        }
      } else {
        callback();
      }
    };
    var validatepayeecode = (rule, value, callback) => {
      if (this.show1) {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')));
        }
      } else {
        callback();
      }
    };
    var validatepayeebankaccountnumber = (rule, value, callback) => {
      if (this.show1) {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')));
        }
      } else {
        callback();
      }
    };
    var validatepayeebankaccount = (rule, value, callback) => {
      if (this.show1) {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')));
        }
      } else {
        callback();
      }
    };
    var validatename = (rule, value, callback) => {
      if (this.show2) {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PERSONALNAME')));
        }
      } else {
        callback();
      }
    };
    var validatecode = (rule, value, callback) => {
      if (this.show2) {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_CAIWUPERSONALCODE')));
        }
      } else {
        callback();
      }
    };
    var validatereceivables = (rule, value, callback) => {
      if (this.show3) {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEENAME')));
        }
      } else {
        callback();
      }
    };
    var validateloan = (rule, value, callback) => {
      if (this.show4) {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_TEMPORARYLOAN')));
        }
      } else {
        callback();
      }
    };
    var validatefullname = (rule, value, callback) => {
      if (this.show5) {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_COMPANYNAME')));
        }
      } else {
        callback();
      }
    };
    return {
        //PSDCD_PFANS_20210723_XQ_086 委托决裁报销明细自动带出 ztc fr
        moduledisable: false,
        //PSDCD_PFANS_20210723_XQ_086 委托决裁报销明细自动带出 ztc to
      tableTgroupId: '',
      // add-ws-8/12-禅道任务446
      enableSave: false,
      role2: '',
      acceptShow: true,
      options2: [
        {
          value: '0',
          label: this.$t('label.PFANS1006FORMVIEW_OPTIONS1'),
        },
        {
          value: '1',
          label: this.$t('label.PFANS1006FORMVIEW_OPTIONS2'),
        },
      ],
      // add-ws-8/12-禅道任务446
      tableLoa: [],
      multipleSelection: [],
      url: '',
      // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 start
      //urlparams: '',
      urlparams: {},
      // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 end
      checkexpectedpaydate: false,
      DataList2: [],
      show12: false,
      DataList: [{
        judgement_name: '',
        remarks: '',
      }],
      invoicetype: '',
      checkexternal: false,
      checktaxes: false,
      checkdisable: false,
      plsummary: '',
      Codecheck: '',
      // checkCode1: '0',
      checkcode: '',
      error_currency: '',
      checktime: false,
      centerid: '',
      groupid: '',
      groupId: '',
      teamid: '',
      disablecheck: false,
      ploptionsdate: [],
      optionsrate: [],
      optionstype: [],
      optionsdate: [{value: 'PP024001', lable: this.$t('label.PFANS5008FORMVIEW_PROJECTGTXM')}],
      tormbT: '',
      //add-ws-6/12-禅道105
      workflowCode: '',
      //add-ws-6/12-禅道105
      Redirict: '',
      search: '',
      companyen: '',
      taxrateValue: '',
      invoiceamountsum: '',
      tableTValue: '',
      tablePValue: '',
      tableRValue: '',
      errorsuppliername: '',
      disa: true,
      errorname: '',
      error: '',
      gridData: [],
      dialogTableVisible: false,
      selectedlist: [],
      ploptionsdata: [],
      options: [],
      jude: [],
      fileList: [],
      upload: uploadUrl(),
      selectType: 'Single',
      title: 'title.PFANS1012VIEW',
      userlist: '',
      namelist: '',
      active: '1',
      active2: '2',
      activeName: 'first',
      disablde: true,
      checkGro: false,
      loading: false,
      disabled: false,
      fromViewname: '',
      buttonList: [],
      checkCode2: '',
      tableT: [{
        publicexpenseid: '',
        trafficdetails_id: '',
        trafficdate: '',
        plsummary: 'PJ111008',
        departmentname: '',
        budgetcoding: '',
        subjectnumber: '',
        region: '',
        accountcode: '',
        vehicle: '',
        startingpoint: '',
        rmb: '',
        annexno: '',
        rowindex: '',
        display: true,
        RedirictT: '',
      }],
      tableF: [{
        invoice_id: '',
        publicexpenseid: '',
        invoicenumber: this.$t('label.PFANS1012FORMVIEW_NUMBERZP') + 1,
        invoicetype: 'PJ068001',
        invoiceamount: '',
        taxrate: '',
        excludingtax: '',
        facetax: '',
      }],
      tableP: [{
        // code17: '',
        publicexpenseid: '',
        purchasedetails_id: '',
        invoicenumber: '',
        taxes: '',
        departmentname: '',
        budgetcoding: '',
        purchasedetailsdate: '',
        plsummary: '',
        procurementdetails: '',
        currency: '',
        currencyrate: '',
        tormb: '',
        subjectnumber: '',
        rmb: '',
        accountcode: '',
        foreigncurrency: '',
        annexno: '',
        rowindex: '',
        showrow: true,
        showrow1: false,
        showrow2: false,
        showrow3: false,
        display: true,
        RedirictP: '',
      }],
      tableR: [{
        code16: '',
        publicexpenseid: '',
        otherdetails_id: '',
        otherdetailsdate: '',
        invoicenumber: '',
        costitem: '',
        plsummary: '',
        servicehours: '',
        departmentname: '',
        accountcode: '',
        subjectnumber: '',
        currency: '',
        currencyrate: '',
        tormb: '',
        remarks: '',
        budgetcoding: '',
        rmb: '',
        foreigncurrency: '',
        taxes: '',
        annexno: '',
        rowindex: '',
        checkCode2: '',
        checkCode: '',
        RedirictR: '',
        display: true,
      }],
      baseInfo: {},
      form: {
          // region    add_qhr_20210830 添加外注费用check、记账日期
          checkedWZFY: "1",
          jzmonth: moment(new Date()),
          // endregion    add_qhr_20210830 添加外注费用check、记账日期
        // add-ws-8/12-禅道任务446
        processingstatus: '0',
        // add-ws-8/12-禅道任务446
        currency: '',
        user_name: '',
        bsexternal: '',
        project_id: '',
        centerid: '',
        groupid: '',
        teamid: '',
        user_id: '',
        telephone: '',
        moduleid: '',
        expectedpaydate: '',
        moduleidApp: '',
        accountnumber: '',
        reimbursementdate: moment(new Date()).format('YYYY-MM-DD'),
        moneys: '',
        foreigncurrency: '',
        rmbexpenditure: '',
        tormb: '',
        preparefor: '',
        remark: '',
        paymentmethod: '',
        payeename: '',
        payeecode: '',
        payeebankaccountnumber: '',
        payeebankaccount: '',
        code: '',
        type: '',
        judgement: '',
        judgement_name: '',
        remarksdetail: '',
        judgements_moneys: '',
        detail_moneys:'',
        judgements_type: '',
        receivables: '',
        loan: '',
        fullname: '',
        subjectnumber: '',
        subjectname: '',
        remarks: '',
        purchasesubjectnumber: '',
        purchasesubjectname: '',
        purchaseremarks: '',
        othersubjectnumber: '',
        othersubjectname: '',
        otherremarks: '',
        suppliername: '',
        uploadfile: '',
        accename: '',
      },
      rules: {
          // region    add_qhr_20210830 添加外注费用check、记账日期
          jzmonth: [{
            required: false,
            validator: checkJzmonth,
            trigger: 'change',
          }],
          // endregion    add_qhr_20210830 添加外注费用check、记账日期
        //region  add_qhr_20210811 添加项目名称必填项
        projectname: [{
          required: true,
          validator: checkprojectname,
          trigger: 'change',
        }],
        //endregion  add_qhr_20210811 添加项目名称必填项
        user_id: [{
          required: true,
          validator: checkuser,
          trigger: 'change',
        }],
        telephone: [{
          validator: checktele,
          trigger: 'change',
        }],
        paymentmethod: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.PFANS1012VIEW_PAYMENTMETHOD'),
          trigger: 'change',
        }],
        remark: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_ABSTRACT'),
          trigger: 'change',
        }],
        accountnumber: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.PFANS1012VIEW_ACCOUNT_NUMBER'),
          trigger: 'change',
        }],
        payeename: [{
          required: true,
          validator: validatepayeename,
          trigger: 'change',
        }],
        payeecode: [{
          required: true,
          validator: validatepayeecode,
          trigger: 'change',
        }],
        payeebankaccountnumber: [{
          required: true,
          validator: validatepayeebankaccountnumber,
          trigger: 'change',
        }],
        payeebankaccount: [{
          required: true,
          validator: validatepayeebankaccount,
          trigger: 'change',
        }],
        name: [{
          required: true,
          validator: validatename,
          trigger: 'change',
        }],
        code: [{
          required: true,
          validator: validatecode,
          trigger: 'change',
        }],
        receivables: [{
          required: true,
          validator: validatereceivables,
          trigger: 'change',
        }],
        loan: [{
          required: true,
          validator: validateloan,
          trigger: 'change',
        }],
        fullname: [{
          required: true,
          validator: validatefullname,
          trigger: 'change',
        }],
      },
      IDname: '',
      code2: 'PJ002',
      code3: 'PJ004',
      //add-ws-12/10-汇率字典
      // code4: 'PG019',
      month4: moment(new Date()).format('YYYY-MM'),
      //add-ws-12/10-汇率字典
      code5: 'PJ005',
      code11: '',
      code13: 'PJ071',
      code14: 'PJ083',
      invoicenumber: '',
      formloan: '',
      errorgroup: '',
      orglist: '',
      optionsdata: [{value: this.$t('label.PFANS1012FORMVIEW_NOMONEY'), lable: ''}],
      multiple: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show10: true,
      show9: false,
      show: false,
      showrow: true,
      showrow1: false,
      showrow2: false,
      showrow3: false,
      showdoll: false,
      showjpy: false,
      showother: false,
      canStart: false,
      flowData: [],
    };
  },
  mounted() {
    this.invoicetype = getDictionaryInfo('PJ068001').value1;
    this.plsummary = getDictionaryInfo('PJ111008').value1;
    //this.getLoanApplicationList();
    this.getsupplierinfor();
    this.getCompanyProjectList();
    this.checkoptionsdata();
    if (getOrgInfoByUserId(this.$store.getters.userinfo.userid)) {
      this.groupId = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
      // if (getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)) {
      //     this.budgetcodingcheck = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
      // }
    }
    let ratelist = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ071');
    for (let i = 0; i < ratelist.length; i++) {
      this.optionsrate.push({
        value: ratelist[i].code,
        lable: ratelist[i].value1,
      });
    }
    let PLdicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ111');
    let cgList = PLdicnew.filter(dicnew => dicnew.value5.indexOf('CG') != -1);
    for(let cgOption of cgList){
        this.ploptionsdata.push({//采购费明细
          value: cgOption.code,
          lable: cgOption.value1,
        });
    }
    let checktype = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ068');
    for (let i = 0; i < checktype.length; i++) {
      if (checktype[i].code === 'PJ068001') {
        this.optionstype.push({
          value: checktype[i].code,
          lable: checktype[i].value1,
        });
      }
    }
    let qtList = PLdicnew.filter(dicnew => dicnew.value5.indexOf('QT') != -1);
    for(let qtOption of qtList){
      this.ploptionsdate.push({//采购费明细
        value: qtOption.code,
        lable: qtOption.value1,
      });
    }
    // let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ111');
    // for (let i = 0; i < dic.length; i++) {
    //   if (dic[i].code === 'PJ111001' || dic[i].code === 'PJ111002' || dic[i].code === 'PJ111003' || dic[i].code === 'PJ111004' || dic[i].code === 'PJ111005'
    //     || dic[i].code === 'PJ111006' || dic[i].code === 'PJ111007' || dic[i].code === 'PJ111009' || dic[i].code === 'PJ111011'
    //     || dic[i].code === 'PJ111012' || dic[i].code === 'PJ111013' || dic[i].code === 'PJ111014' || dic[i].code === 'PJ111015') {
    //     this.ploptionsdate.push({
    //       value: dic[i].code,
    //       lable: dic[i].value1,
    //     });
    //   }
    // }
    //ADD-WS-个人编码修改
    if (getUserInfo(this.$store.getters.userinfo.userid)) {
      this.Codecheck = this.$store.getters.userinfo.userinfo.caiwupersonalcode;
      this.form.code = this.$store.getters.userinfo.userinfo.caiwupersonalcode;
      let num = getUserInfo(this.$store.getters.userinfo.userid).userinfo.extension;
      if (num) {
        this.form.telephone = num;
      }
    }
    //ADD-WS-个人编码修改
    this.IDname = this.$route.params._id;
    if (this.IDname) {
      this.disablecheck = true;
      this.loading = true;
      this.$store
        .dispatch('PFANS1012Store/selectById', {'publicexpenseid': this.IDname})
        .then(response => {
            if (response.publicexpense != null) {
              this.form = response.publicexpense;
              if (this.form.uploadfile != '' && this.form.uploadfile != null) {
                let uploadfile = this.form.uploadfile.split(';');
                for (var i = 0; i < uploadfile.length; i++) {
                  if (uploadfile[i].split(',')[0] != '') {
                    let o = {};
                    o.name = uploadfile[i].split(',')[0];
                    o.url = uploadfile[i].split(',')[1];
                    this.fileList.push(o);
                  }
                }
              }
              let role = getCurrentRole();
              if (role == '1') {
                //总经理
                this.workflowCode = 'W0100';
              } else {
                if (this.form.moneys >= 20000) {
                  // if (role == '2' || role == '3') { //GM Center
                  //   this.workflowCode = 'W0115';//新流程
                  // } else { //TL 正式员工
                  this.workflowCode = 'W0077';
                  // }
                } else {
                  // if (role == '2' || role == '3') { //GM Center
                  //   this.workflowCode = 'W0141';//新流程
                  // } else { //TL 正式员工
                  this.workflowCode = 'W0016';
                  // }
                }
              }
              if (this.disable) {
                if (this.form.paymentmethod === 'PJ004001') {
                  this.checkexpectedpaydate = false;
                } else if (this.form.paymentmethod === 'PJ004002') {
                  this.checkexpectedpaydate = false;
                } else if (this.form.paymentmethod === 'PJ004003') {
                  this.checkexpectedpaydate = true;
                } else if (this.form.paymentmethod === 'PJ004004') {
                  this.checkexpectedpaydate = true;
                } else {
                  this.checkexpectedpaydate = true;
                }
              } else {
                this.checkexpectedpaydate = true;
              }
//add-ws-6/16-禅道103
              //add-ws-4/28-精算中，点击决裁，跳转画面
              let judgement = this.form.judgement.split(',');
              let judgementname = this.form.judgement_name.split(',');
              let remarks = [];
              let judgements_moneys = [];
              let judgements_type = [];
              if (this.form.remarksdetail !== '' && this.form.remarksdetail !== null && this.form.remarksdetail !== undefined) {
                remarks = this.form.remarksdetail.split('^');
              }
              if (this.form.judgements_moneys !== '' && this.form.judgements_moneys !== null && this.form.judgements_moneys !== undefined) {
                judgements_moneys = this.form.judgements_moneys.split('^');
              }
              if (this.form.judgements_type !== '' && this.form.judgements_type !== null && this.form.judgements_type !== undefined) {
                judgements_type = this.form.judgements_type.split('^');
              }
              let datalist = [];
              for (var i = 0; i < judgement.length; i++) {
                for (var d = 0; d < judgementname.length; d++) {
                  if (i === d) {
                    let obj = {};
                    obj.judgement = judgement[i];
                    obj.judgement_name = judgementname[d];
                    obj.remarks = remarks[i];
                    obj.judgements_moneys = judgements_moneys[i];
                    obj.judgements_type = judgements_type[i];
                    datalist[i] = obj;
                  }
                }
              }
              this.DataList = datalist;
              //add-ws-4/28-精算中，点击决裁，跳转画面
              let rst = getOrgInfoByUserId(response.publicexpense.user_id);
              //ADD-WS-4/20-交通费得时候模块修改
              if (this.form.type === 'PJ001001') {
                if (this.form.moduleid !== null && this.form.moduleid !== '') {
                  let moduleidinfo = getDictionaryInfo(this.form.moduleid);
                  if (moduleidinfo) {
                    this.form.moduleidApp = moduleidinfo.value1;
                  }
                }
              } else if (this.form.type === 'PJ001002') {
                if (this.form.moduleid !== null && this.form.moduleid !== '') {
                  let moduleidinfo = getDictionaryInfo(this.form.moduleid);
                  if (moduleidinfo) {
                    this.form.moduleid = moduleidinfo.value1;
                  }
                }
              }
              //ADD-WS-4/20-交通费得时候模块修改
              // if (this.form.moduleid == 'PJ001001') {
              //   let moduleidinfo = getDictionaryInfo(this.form.moduleid);
              //   if (moduleidinfo != null) {
              //     this.form.moduleid = moduleidinfo.value1;
              //   }
              //   // moduleid
              // }
              if (rst) {
                if (rst.groupId !== null && rst.groupId !== '') {
                  this.checkGro = true;
                } else {
                  this.checkGro = false;
                }
                // this.centerid = rst.centerNmae;
                // this.groupid = rst.groupNmae;
                // this.teamid = rst.teamNmae;
              }
              if (response.invoice.length > 0) {
                this.tableF = response.invoice;
                if (this.form.status === '2') {
                  this.checkexternal = true;
                  this.checktaxes = true;
                  this.checkdisable = true;
                  this.disablecheck = true;
                }
                this.checkoptionsdata();
              }
              if (response.trafficdetails.length > 0) {
                this.tableT = response.trafficdetails;
                for (var i = 0; i < this.tableT.length; i++) {
                  this.orglist = this.tableT[i].departmentname;
                  let group = getOrgInfo(this.orglist);
                  if (group) {
                    this.tableT[i].RedirictT = group.redirict;
                  }
                  if (this.tableT[i].departmentname !== '' && this.tableT[i].departmentname !== null
                    && this.tableT[i].departmentname !== undefined) {
                    //ADD_FJL
                    this.tableT[i].optionsT = [];
                    if (getOrgInfo(this.tableT[i].departmentname)) {
                      let butinfo = (getOrgInfo(this.tableT[i].departmentname).encoding).substring(0,3);
                      //213
                      let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                      if (dic.length > 0) {
                        for (let j = 0; j < dic.length; j++) {
                          if (butinfo === (dic[j].value1).substring(0, 3)) {
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
                  if (this.tableT[i].RedirictT == '0') {
                    this.tableT[i].accoundoptionsdate = [];
                    let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ119');
                    for (let a = 0; a < dicnew.length; a++) {
                      if (dicnew[a].code === 'PJ119004') {
                        this.tableT[i].accoundoptionsdate.push({
                          value: dicnew[a].code,
                          lable: dicnew[a].value1,
                        });
                      }
                    }
                  } else if (this.tableT[i].RedirictT == '1' || this.tableT[i].RedirictT == '') {
                    this.tableT[i].accoundoptionsdate = [];
                    let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ132');
                    for (let a = 0; a < dicnew.length; a++) {
                      if (dicnew[a].code === 'PJ132004') {
                        this.tableT[i].accoundoptionsdate.push({
                          value: dicnew[a].code,
                          lable: dicnew[a].value1,
                        });
                      }
                    }
                  }

                }
              }
              if (response.purchasedetails.length > 0) {
                this.tableP = response.purchasedetails;
                for (var i = 0; i < this.tableP.length; i++) {
                  //this.tableP[i].code17 = '';
                  this.orglist = this.tableP[i].departmentname;
                  let group = getOrgInfo(this.orglist);
                  if (group) {
                    this.tableP[i].RedirictP = group.redirict;
                  }
                  if (this.tableP[i].departmentname !== '' && this.tableP[i].departmentname !== null && this.tableP[i].departmentname !== undefined) {
                    //ADD_FJL
                    this.tableP[i].optionsP = [];
                    if (getOrgInfo(this.tableP[i].departmentname)) {
                      let butinfo = (getOrgInfo(this.tableP[i].departmentname).encoding).substring(0,3);
                      let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                      if (dic.length > 0) {
                        for (let j = 0; j < dic.length; j++) {
                          if (butinfo === (dic[j].value1).substring(0, 3)) {
                            this.tableP[i].optionsP.push({
                              lable: dic[j].value2 + '_' + dic[j].value3,
                              value: dic[j].code,
                            });
                          }
                        }
                      }
                      //ADD_FJL  修改人员预算编码
                    }
                  }
                  if (this.tableP[i].foreigncurrency > 0) {
                    this.disa = false;
                    this.disablecheck = false;
                  }
                  //upd-ws-9/23-禅道任务555
                  // if (this.tableP[i].RedirictP == '0') {
                  //   if (this.tableP[i].plsummary === 'PJ111010') {
                  //     // this.tableP[i].code17 = 'PJ121';
                  //     let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                  //     if (letErrortype != null) {
                  //       this.tableP[i].accountcode = letErrortype.code;
                  //     }
                  //   }
                  // } else if (this.tableP[i].RedirictP == '1' || this.tableP[i].RedirictP == '') {
                  //   if (this.tableP[i].plsummary === 'PJ111010') {
                  //     // this.tableP[i].code17 = 'PJ134';
                  //     let letErrortype = getDictionaryInfo(this.tableP[i].accountcode);
                  //     if (letErrortype != null) {
                  //       this.tableP[i].accountcode = letErrortype.code;
                  //     }
                  //   }
                  // }

                  if (this.tableP[i].RedirictP == '0') {
                    this.tableP[i].accoundoptionsdateP = [];
                    if (this.tableP[i].plsummary === 'PJ111008') {
                      let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ119');
                      for (let a = 0; a < dicnew.length; a++) {
                        if (dicnew[a].code === 'PJ119003') {
                          this.tableP[i].accoundoptionsdateP.push({
                            value: dicnew[a].code,
                            lable: dicnew[a].value1,
                          });
                        }else if(dicnew[a].code === 'PJ119004'){
                          this.tableP[i].accoundoptionsdateP.push({
                            value: dicnew[a].code,
                            lable: dicnew[a].value1,
                          });
                        }else if(dicnew[a].code === 'PJ119007'){
                          this.tableP[i].accoundoptionsdateP.push({
                            value: dicnew[a].code,
                            lable: dicnew[a].value1,
                          });
                        }
                      }
                    } else if (this.tableP[i].plsummary === 'PJ111010') {
                      let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ121');
                      for (let a = 0; a < dicnew.length; a++) {
                        this.tableP[i].accoundoptionsdateP.push({
                          value: dicnew[a].code,
                          lable: dicnew[a].value1,
                        });
                      }
                    }
                  } else if (this.tableP[i].RedirictP == '1' || this.tableP[i].RedirictP == '') {
                    this.tableP[i].accoundoptionsdateP = [];
                    if (this.tableP[i].plsummary === 'PJ111008') {
                      let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ132');
                      for (let a = 0; a < dicnew.length; a++) {
                        if (dicnew[a].code === 'PJ132003') {
                          this.tableP[i].accoundoptionsdateP.push({
                            value: dicnew[a].code,
                            lable: dicnew[a].value1,
                          });
                        }else if (dicnew[a].code === 'PJ132004') {
                          this.tableP[i].accoundoptionsdateP.push({
                            value: dicnew[a].code,
                            lable: dicnew[a].value1,
                          });
                        }else if (dicnew[a].code === 'PJ132007') {
                          this.tableP[i].accoundoptionsdateP.push({
                            value: dicnew[a].code,
                            lable: dicnew[a].value1,
                          });
                        }
                      }
                    } else if (this.tableP[i].plsummary === 'PJ111010') {
                      let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ134');
                      for (let a = 0; a < dicnew.length; a++) {
                        this.tableP[i].accoundoptionsdateP.push({
                          value: dicnew[a].code,
                          lable: dicnew[a].value1,
                        });
                      }
                    }
                  }
                  //upd-ws-9/23-禅道任务555
                }
              }
              if (response.otherdetails.length > 0) {
                this.tableR = response.otherdetails;
                for (let i = 0; i < this.tableR.length; i++) {
                  //add-ws-6/11-禅道090
                  if (this.tableR[i].servicehours !== '' && this.tableR[i].servicehours !== null) {
                    let claimdatetime = this.tableR[i].servicehours;
                    let claimdatetim = claimdatetime.slice(0, 10);
                    let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 10);
                    this.tableR[i].servicehours = [claimdatetim, claimdatetime1];
                  }
                  //add-ws-6/11-禅道090
                  this.tableR[i].code16 = '';
                  this.orglist = this.tableR[i].departmentname;
                  let group = getOrgInfo(this.orglist);
                  if (group) {
                    this.tableR[i].RedirictR = group.redirict;
                  }
                  if (this.tableR[i].departmentname !== '' && this.tableR[i].departmentname !== null && this.tableR[i].departmentname !== undefined) {
                    //ADD_FJL
                    this.tableR[i].optionsR = [];
                    if (getOrgInfo(this.tableR[i].departmentname)) {
                      let butinfo = (getOrgInfo(this.tableR[i].departmentname).encoding).substring(0,3);
                      let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                      if (dic.length > 0) {
                        for (let j = 0; j < dic.length; j++) {
                          if (butinfo === (dic[j].value1).substring(0, 3)) {
                            this.tableR[i].optionsR.push({
                              lable: dic[j].value2 + '_' + dic[j].value3,
                              value: dic[j].code,
                            });
                          }
                        }
                      }
                      //ADD_FJL  修改人员预算编码
                    }
                  }
                  if (this.tableR[i].foreigncurrency > 0) {
                    this.disa = false;
                    this.disablecheck = false;
                  }
                  if (this.tableR[i].RedirictR == '0') {
                    if (this.tableR[i].plsummary == 'PJ111001') {
                      this.tableR[i].code16 = 'PJ112';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111002') {
                      this.tableR[i].code16 = 'PJ113';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111003') {
                      this.tableR[i].code16 = 'PJ114';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111004') {
                      this.tableR[i].code16 = 'PJ150';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111005') {
                      this.tableR[i].code16 = 'PJ116';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111006') {
                      this.tableR[i].code16 = 'PJ117';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111007') {
                      this.tableR[i].code16 = 'PJ118';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111008') {
                      this.tableR[i].code16 = 'PJ119';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111009') {
                      this.tableR[i].code16 = 'PJ120';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111010') {
                      this.tableR[i].code16 = 'PJ121';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111011') {
                      this.tableR[i].code16 = 'PJ122';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111012') {
                      this.tableR[i].code16 = 'PJ123';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111013') {
                      this.tableR[i].code16 = '';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111014') {
                      this.tableR[i].code16 = 'PJ125';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111015') {
                      this.tableR[i].code16 = 'PJ138';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    }
                  } else if (this.tableR[i].RedirictR == '1' || this.tableR[i].RedirictR == '') {
                    if (this.tableR[i].plsummary == 'PJ111001') {
                      this.tableR[i].code16 = 'PJ127';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111002') {
                      this.tableR[i].code16 = 'PJ128';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111003') {
                      this.tableR[i].code16 = 'PJ129';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111004') {
                      this.tableR[i].code16 = 'PJ115';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111005') {
                      this.tableR[i].code16 = 'PJ130';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111006') {
                      this.tableR[i].code16 = '';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111007') {
                      this.tableR[i].code16 = 'PJ131';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111008') {
                      this.tableR[i].code16 = 'PJ132';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111009') {
                      this.tableR[i].code16 = 'PJ133';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111010') {
                      this.tableR[i].code16 = 'PJ134';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111011') {
                      this.tableR[i].code16 = 'PJ135';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111012') {
                      this.tableR[i].code16 = 'PJ136';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111013') {
                      this.tableR[i].code16 = 'PJ124';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111014') {
                      this.tableR[i].code16 = 'PJ137';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    } else if (this.tableR[i].plsummary === 'PJ111015') {
                      this.tableR[i].code16 = 'PJ139';
                      let letErrortype = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letErrortype != null) {
                        this.tableR[i].accountcode = letErrortype.code;
                      }
                    }
                  }
                  if (this.tableR[i].subjectnumber == '0504-00-0000') {
                    this.checktime = true;
                    if (this.tableR[i].servicehours == null || this.tableR[i].servicehours == '') {
                      this.checkdisable = false;
                    } else {
                      this.checkdisable = true;
                    }
                  }
                }
              }

              this.userlist = this.form.user_id;
              this.namelist = this.form.user_name;
              this.baseInfo.publicexpense = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.trafficdetails = JSON.parse(JSON.stringify(this.tableT));
              this.baseInfo.purchasedetails = JSON.parse(JSON.stringify(this.tableP));
              this.baseInfo.otherdetails = JSON.parse(JSON.stringify(this.tableR));
              if (this.form.paymentmethod === 'PJ004001') {
                this.show1 = true;
              } else if (this.form.paymentmethod === 'PJ004002') {
                this.show2 = true;
              } else if (this.form.paymentmethod === 'PJ004003') {
                this.show3 = true;
              } else if (this.form.paymentmethod === 'PJ004004') {
                this.show4 = true;
              } else if (this.form.paymentmethod === 'PJ004005') {
                this.show5 = true;
              }
              // 111
              if (this.form.type === 'PJ001001') {
                this.show9 = true;
                this.show6 = false;
                this.show7 = false;
                this.show10 = true;
              } else if (this.form.type === 'PJ001002') {
                this.show9 = false;
                this.show6 = true;
                this.show7 = true;
                if (this.disable) {
                  this.show10 = true;
                } else {
                  this.show10 = false;
                }
              }
              if (this.form.loan != null && this.form.loan != '') {
                this.getPayment('PJ004004');
                this.getLoanApplicationList2();
              }
            }
            //采购业务数据流程查看详情
            this.$store
              .dispatch('PFANS1012Store/getworkfolwPurchaseData', {'publicexpenseid': this.IDname})
              .then(response3 => {

                if (response3 !== null && response3 !== '' && response3 !== undefined) {
                  if (response3['purchase'] != undefined) {
                    let purlist = response3['purchase'].split(';');
                    let setpurlist = new Set(purlist);
                    for (let i of setpurlist) {
                      let pur = i.split(',');
                      let statu = pur[1] === '4' ? 'normal.done' : (pur[1] === '2' ? 'normal.doing' : 'normal.todo');
                      this.flowData.push(
                        {
                          No: this.flowData.length + 1,
                          Name: '采购决裁',
                          Status: statu,
                          url: 'PFANS3005FormView',
                          params: {'_id': pur[0]},
                        });
                    }
                  }
                  // if (response3['award'] != undefined) {
                  //   let aw = response3['award'].split(',');
                  //   let statu = aw[1] === '4' ? 'normal.done' : (aw[1] === '2' ? 'normal.doing' : 'normal.todo');
                  //   this.flowData.push(
                  //     {
                  //       No: this.flowData.length + 1,
                  //       Name: '合同决裁',
                  //       Status: statu,
                  //       url: 'PFANS1047FormView',
                  //       params: {'_id': aw[0]},
                  //     });
                  // }
                  // if (response3['seal'] != undefined) {
                  //   let seal = response3['seal'].split(',');
                  //   let statu = seal[1] === '3' ? 'normal.done' : (seal[1] === '2' ? 'normal.doing' : 'normal.todo');
                  //   this.flowData.push(
                  //     {
                  //       No: this.flowData.length + 1,
                  //       Name: '印章申请',
                  //       Status: statu,
                  //       url: 'PFANS4001FormView',
                  //       params: {'_id': seal[0]},
                  //     });
                  // }
                  // if (response3['loanApplication'] != undefined) {
                  //   let loanapp = response3['loanApplication'].split(',');
                  //   let statu = loanapp[1] === '4' ? 'normal.done' : (loanapp[1] === '2' ? 'normal.doing' : 'normal.todo');
                  //   this.flowData.push(
                  //     {
                  //       No: this.flowData.length + 1,
                  //       Name: '暂借款申请',
                  //       Status: statu,
                  //       url: 'PFANS1006FormView',
                  //       params: {'_id': loanapp[0]},
                  //     });
                  // }

                  if (response3['publicExpense'] != undefined) {
                    let publist = response3['publicExpense'].split(';');
                    let setpublist = new Set(publist);
                    for (let i of setpublist) {
                      let pub = i.split(',');
                      let statu = pub[1] === '4' ? 'normal.done' : (pub[1] === '2' ? 'normal.doing' : 'normal.todo');
                      this.flowData.push(
                        {
                          No: this.flowData.length + 1,
                          Name: '公共费用精算',
                          Status: statu,
                          url: 'PFANS1012FormView',
                          params: {'_id': pub[0]},
                        });
                    }
                  }
                  this.$emit('showPop', this.flowData);
                }
              });
            //采购业务数据流程查看详情
            this.loading = false;
          },
        )
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    } else {
      if (getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)) {
        this.tableT[0].RedirictT = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).redirict;
        this.tableP[0].RedirictP = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).redirict;
        // 禅道611 其他费用明细 是否为直接部门没有判定 start ztc
        this.tableR[0].RedirictR = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).redirict;
        // 禅道611 其他费用明细 是否为直接部门没有判定 end ztc
      }
      // this.tableP[0].code17 = this.tableP[0].RedirictP == '0' ? 'PJ121' : 'PJ134';
      this.show10 = true;
      //ADD-WS-直接部门或间接部门赋值变更
      this.tableT[0].accoundoptionsdate = [];
      if (this.tableT[0].RedirictT == '0') {
        let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ119');
        for (let i = 0; i < dicnew.length; i++) {
          if (dicnew[i].code === 'PJ119004') {
            this.tableT[0].accoundoptionsdate.push({
              value: dicnew[i].code,
              lable: dicnew[i].value1,
            });
          }
        }
      } else if (this.tableT[0].RedirictT == '1' || this.tableT[0].RedirictT == '') {
        let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ132');
        for (let i = 0; i < dicnew.length; i++) {
          if (dicnew[i].code === 'PJ132004') {
            this.tableT[0].accoundoptionsdate.push({
              value: dicnew[i].code,
              lable: dicnew[i].value1,
            });
          }
        }
      }
      //ADD-WS-直接部门或间接部门赋值变更
      if (getOrgInfoByUserId(this.$store.getters.userinfo.userid)) {
        this.tableTgroupId = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
        this.tableT[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
        this.tableP[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
        this.tableR[0].departmentname = getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId;
        if (this.tableT[0].departmentname) {
          this.tableT[0].optionsT = [];
          if (getOrgInfo(this.tableT[0].departmentname)) {
            let butinfo = (getOrgInfo(this.tableT[0].departmentname).encoding).substring(0,3);
            if (butinfo) {
              let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
              if (dic.length > 0) {
                for (let j = 0; j < dic.length; j++) {
                  if (butinfo === (dic[j].value1).substring(0, 3)) {
                    this.tableT[0].optionsT.push({
                      lable: dic[j].value2 + '_' + dic[j].value3,
                      value: dic[j].code,
                    });
                  }
                }
              }
            }
          }
        }
        if (this.tableP[0].departmentname) {
          this.tableP[0].optionsP = [];
          if (getOrgInfo(this.tableP[0].departmentname)) {
            let butinfo = (getOrgInfo(this.tableP[0].departmentname).encoding).substring(0, 3);
            if (butinfo) {
              let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
              if (dic.length > 0) {
                for (let j = 0; j < dic.length; j++) {
                  if (butinfo === (dic[j].value1).substring(0, 3)) {
                    this.tableP[0].optionsP.push({
                      lable: dic[j].value2 + '_' + dic[j].value3,
                      value: dic[j].code,
                    });
                  }
                }
              }
            }
          }
        }
        if (this.tableR[0].departmentname) {
          this.tableR[0].optionsR = [];
          if (getOrgInfo(this.tableR[0].departmentname)) {
            let butinfo = (getOrgInfo(this.tableR[0].departmentname).encoding).substring(0, 3);
            if (butinfo) {
              let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
              if (dic.length > 0) {
                for (let j = 0; j < dic.length; j++) {
                  if (butinfo === (dic[j].value1).substring(0, 3)) {
                    this.tableR[0].optionsR.push({
                      lable: dic[j].value2 + '_' + dic[j].value3,
                      value: dic[j].code,
                    });
                  }
                }
              }
            }
          }
        }
      }
      this.checkexternal = true;
      this.checktaxes = true;
      this.checkdisable = true;
      this.disablecheck = true;
      this.userlist = this.$store.getters.userinfo.userid;
      this.namelist = this.$store.getters.userinfo.userid;
      if (this.userlist !== null && this.userlist !== '') {
        let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
        if (rst) {
          this.centerid = rst.centerNmae;
          this.groupid = rst.groupNmae;
          this.teamid = rst.teamNmae;
          this.form.centerid = rst.centerId;
          // this.form.groupid = rst.groupId;
          this.form.teamid = rst.teamId;
          if (rst.groupId !== null && rst.groupId !== '') {
            this.form.groupid = rst.groupId;
            this.checkGro = true;
          } else {
            this.checkGro = false;
          }
        }
        this.form.user_id = this.$store.getters.userinfo.userid;
        this.form.user_name = this.$store.getters.userinfo.userid;
      }
      this.jude = this.$route.params._name;
      for (var i = 0; i < this.jude.length; i++) {
        this.form.judgement += this.jude[i].value + ',';
        this.form.judgement_name += this.jude[i].label + ',';
        this.form.remarksdetail += this.jude[i].remarks + '^';
        this.form.judgements_moneys += this.jude[i].judgements_moneys + '^';
        this.form.judgements_type += this.jude[i].judgements_type + '^';
      }
        //PSDCD_PFANS_20210723_XQ_086 委托决裁报销明细自动带出 ztc fr
        if(this.$route.params._aInfo){
          this.checktaxes = false;
          this.checkdisable = false;
          let antList = this.$route.params._aInfo[0]
          let adInfo = [];
          let annexno = 0;
          for (let a = 0; a < antList.length; a++) {
            annexno ++;
            let infoA = {};
            infoA.otherdetailsdate = moment(new Date()).format('YYYY-MM-DD');
            infoA.invoicenumber = this.$t('label.PFANS1012FORMVIEW_NOMONEY');
            infoA.departmentname = antList[a].depart;
            infoA.budgetcoding = this.getAwardEnCode(antList[a].budgetcode)[0].lable;
            infoA.RedirictR = getOrgInfo(antList[a].depart).redirict
            infoA.optionsR = [{
                value: this.getAwardEnCode(antList[a].budgetcode)[0].value,
                lable: this.getAwardEnCode(antList[a].budgetcode)[0].lable
              }]
            infoA.plsummary = 'PJ111015';
            if(infoA.RedirictR === '0'){
              infoA.code16 = 'PJ138';
              infoA.accountcode = 'PJ138002';
              infoA.subjectnumber = '4317-00-0062';
            }else if(infoA.RedirictR === '1'){
              infoA.code16 = 'PJ139';
              infoA.accountcode = 'PJ139001';
              infoA.subjectnumber = '5317-00-2062';
            }
            infoA.rmb = antList[a].awardmoney;
            infoA.foreigncurrency = '0';
            infoA.currencyrate = '0';
            infoA.tormb = '0';
            infoA.taxes = '0';
            infoA.currency = '';
            infoA.annexno = annexno;
            adInfo.push(infoA);
          }
          this.tableR = adInfo;
        }
        //PSDCD_PFANS_20210723_XQ_086 委托决裁报销明细自动带出 ztc to
      //add-ws-4/28-精算中，点击决裁，跳转画面
      let judgementnew = this.form.judgement.substring(0, this.form.judgement.length - 1);
      let judgementnamenew = this.form.judgement_name.substring(0, this.form.judgement_name.length - 1);
      let remarksnew = this.form.remarksdetail.substring(0, this.form.remarksdetail.length - 1);
      let judgements_moneysnew = this.form.judgements_moneys.substring(0, this.form.judgements_moneys.length - 1);
      let judgements_typenew = this.form.judgements_type.substring(0, this.form.judgements_type.length - 1);
      let judgement = judgementnew.split(',');
      let judgementname = judgementnamenew.split(',');
      let remarks = remarksnew.split('^');
      let judgements_moneys = judgements_moneysnew.split('^');
      let judgements_type = judgements_typenew.split('^');
      let datalist = [];
      for (var i = 0; i < judgement.length; i++) {
        for (var d = 0; d < judgementname.length; d++) {
          if (i === d) {
            let obj = {};
            obj.judgement = judgement[i];
            obj.judgement_name = judgementname[d];
            obj.remarks = remarks[i];
            obj.judgements_moneys = judgements_moneys[i];
            obj.judgements_type = judgements_type[i];
            datalist[i] = obj;
          }
        }
      }
      this.DataList = datalist;
      //add-ws-4/28-精算中，点击决裁，跳转画面
      this.form.judgement = this.form.judgement.substring(0, this.form.judgement.length - 1);
      this.form.judgement_name = this.form.judgement_name.substring(0, this.form.judgement_name.length - 1);
      this.form.remarksdetail = this.form.remarksdetail.substring(0, this.form.remarksdetail.length - 1);
      this.form.judgements_moneys = this.form.judgements_moneys.substring(0, this.form.judgements_moneys.length - 1);
      this.form.judgements_type = this.form.judgements_type.substring(0, this.form.judgements_type.length - 1);
      this.form.type = this.$route.params._type;
      //ADD_FJL_0715 模块默认值AP START
      this.form.moduleid = 'PJ002001';
      //ADD_FJL_0715 模块默认值AP END
      //add ccm 存在暂借款，选中暂借款
      if (this.form.type === 'PJ001001') {
        //add-ws-5/25-No.16-费明细：【付款方式】不用员工做选择，固定为“个人账户”
        this.getPayment('PJ004002');
        //add-ws-5/25-No.16-费明细：【付款方式】不用员工做选择，固定为“个人账户”
        this.show9 = true;
        this.show7 = false;
        this.show6 = false;
        this.form.moduleidApp = getDictionaryInfo(this.form.moduleid).value1;
      } else if (this.form.type === 'PJ001002') {
        //add-ws-5/25-No.16-费明细：【付款方式】不用员工做选择，固定为“个人账户”
        if (this.$route.params._haveLoanapp) {
          this.form.loan = this.$route.params._haveLoanapp;
          this.formloan = this.$route.params._haveLoanapp;
          this.getPayment('PJ004004');
          this.getLoanApplicationList();
        } else {
          //add-ws-8/24-禅道任务544
          this.getPayment('PJ004001');
          // this.LoanApplication();
          //add-ws-8/24-禅道任务544
        }
        //add-ws-5/25-No.16-费明细：【付款方式】不用员工做选择，固定为“个人账户”
        this.show9 = false;
        this.show7 = true;
        this.show6 = true;
      }
    }
  },
  created() {
    //add-ws-8/19-禅道458任务修正
    if (this.$route.params._workfliw) {
      this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1012View');
    }
    //add-ws-8/19-禅道458任务修正
    // add-ws-8/12-禅道任务446
    this.role2 = getCurrentRole5();
    // add-ws-8/12-禅道任务446
    this.fromViewname = this.$route.params._fromname;
    if (!this.$route.params.disabled) {
      this.buttonList = [];
    }
    this.disable = this.$route.params.disabled;
    // add-lyt-21/3/24-PSDCD_PFANS_20210318_BUG_035-设置新参数的判定（编辑查看模式下都不可更改“模块”数据项）-start
    if(this.$route.params._id){
      this.moduledisable = true;
    }
    // add-lyt-21/3/24-PSDCD_PFANS_20210318_BUG_035-设置新参数的判定（编辑查看模式下都不可更改“模块”数据项）-end
    if (this.disable) {
      this.checkexternal = false;
      this.checktaxes = false;
      this.checkdisable = false;
      this.disablecheck = false;
      if (this.role2 === '0') {
        if (this.$route.params._statuss == this.$t('label.PFANS5004VIEW_OVERTIME')) {
          this.buttonList = [
            {
              key: 'save',
              name: 'button.save',
              disabled: false,
              icon: 'el-icon-check',
            },
          ];
          this.checkexternal = true;
          this.checktaxes = true;
          this.checkdisable = true;
          this.disablecheck = true;
          this.acceptShow = false;
          this.disable = !this.$route.params.disabled;
          this.enableSave = true;
        } else if (this.$route.params._statuss == this.$t('label.node_step4')) {
          this.buttonList = [
            {
              key: 'save',
              name: 'button.save',
              disabled: true,
              icon: 'el-icon-check',
            },
          ];
          this.enableSave = true;
        } else {
          this.buttonList = [
            {
              key: 'save',
              name: 'button.save',
              disabled: false,
              icon: 'el-icon-check',
            },
          ];
        }
      } else {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ];
      }
    } else {
      this.checkexternal = true;
      this.checktaxes = true;
      this.checkdisable = true;
      this.disablecheck = true;
    }
  },
  computed: {
    foreigncurrency: {
      get() {
        return this.form.foreigncurrency;
      },
      set(val) {
        this.form.foreigncurrency = val;
      },
    },
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === 'first') {
        if (this.form.type === 'PJ001002') {
          let tableptormb = 0;
          let tablertormb = 0;
          if (this.tableP.length > 0) {
            for (let j = 0; j < this.tableP.length; j++) {
              if (this.tableP[j].tormb > 0) {
                tableptormb += parseFloat(this.tableP[j].tormb);
              }
            }
          }

          if (this.tableR.length > 0) {
            for (let i = 0; i < this.tableR.length; i++) {
              if (this.tableR[i].tormb > 0) {
                tablertormb += parseFloat(this.tableR[i].tormb);
              }
            }
          }
          this.tormbT = Number(tablertormb) + Number(tableptormb);
          this.form.tormb = this.tormbT;
        }
      }
    },
    changeereimbursementdate(value) {
      if (value) {
        this.month4 = moment(value).format('YYYY-MM');
      }
    },
    // add-ws-8/20-禅道469
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    // LoanApplication() {
    //   this.loading = true;
    //   this.$store
    //     .dispatch('PFANS1012Store/loanapplication', {})
    //     .then(response => {
    //       if (response != undefined && response != null) {
    //         this.tableLoa = [];
    //         for (let i = 0; i < response.length; i++) {
    //           var vote = {};
    //           if (response[i].paymentmethod === 'PJ015001' || response[i].paymentmethod === 'PJ015003') {
    //             vote.accename = response[i].accountpayeename;
    //           } else if (response[i].paymentmethod === 'PJ015002') {
    //             if (response[i].user_name !== '' && response[i].user_name !== null) {
    //               vote.accename = getUserInfo(response[i].user_name).userinfo.customername;
    //             }
    //           }
    //           vote.moneys = response[i].moneys;
    //           vote.loanapno = response[i].loanapno;
    //           vote.loanapplication_id = response[i].loanapplication_id;
    //           this.tableLoa.push(vote);
    //         }
    //       }
    //     })
    //     .catch(error => {
    //       this.$message.error({
    //         message: error,
    //         type: 'error',f
    //         duration: 5 * 1000,
    //       });
    //       this.loading = false;
    //     });
    // },
    selectInit(row, index) {
      // if (!this.$route.params._haveLoanapp) {
      if (this.$route.params._statuss != this.$t('label.PFANS1032FORMVIEW_LOADINGSEAL') || this.$route.params._statuss != this.$t('label.PFANS5004VIEW_OVERTIME')) {
        return row;
      }
      // }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // add-ws-8/20-禅道469
    getCenterid(val) {
      this.form.centerid = val;
    },
    getGroupId(val) {
      this.form.groupid = val;
    },
    getTeamid(val) {
      this.form.teamid = val;
    },
    fileError(err, file, fileList) {
      Message({
        message: this.$t('normal.error_04'),
        type: 'error',
        duration: 5 * 1000,
      });
    },
    fileRemove(file, fileList) {
      this.fileList = [];
      this.form.uploadfile = '';
      for (var item of fileList) {
        let o = {};
        o.name = item.name;
        o.url = item.url;
        this.fileList.push(o);
        this.form.uploadfile += item.name + ',' + item.url + ';';
      }
    },
    fileDownload(file) {
      if (file.url) {
        file.url = file.url.replace('%', '%25');
        file.url = file.url.replace('#', '%23');
        file.url = file.url.replace('&', '%26');
        file.url = file.url.replace('+', '%2B');
        file.url = file.url.replace('=', '%3D');
        file.url = file.url.replace('?', '%3F');
        var url = downLoadUrl(file.url);
        window.open(url);
      }
    },
    fileSuccess(response, file, fileList) {
      if (response.data == 'upload_success') {
        this.fileList = [];
        this.form.uploadfile = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          if (!item.url) {
            o.url = item.response.info;
          } else {
            o.url = item.url;
          }
          this.fileList.push(o);
          this.form.uploadfile += o.name + ',' + o.url + ';';
        }
      } else {
        Message({
          message: this.$t('label.PFANS2016FORMVIEW_FILEERROR'),
          type: 'error',
          duration: 5 * 1000,
        });
        this.form.uploadfile = '';
        this.$refs.upload.clearFiles();
      }
    },
    getLoanApplicationList2() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1012Store/getLoanApplicationList2', {'loanapno': this.form.loan})
        .then(response => {
          if (response != undefined && response != null) {
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              if (response[i].paymentmethod === 'PJ015001' || response[i].paymentmethod === 'PJ015003') {
                vote.accename = response[i].accountpayeename;
              } else if (response[i].paymentmethod === 'PJ015002') {
                if (response[i].user_name !== '' && response[i].user_name !== null) {
                  vote.accename = getUserInfo(response[i].user_name).userinfo.customername;
                }
              }
              vote.moneys = response[i].moneys;
              vote.loanapno = response[i].loanapno;
              vote.loanapplication_id = response[i].loanapplication_id;
              this.tableLoa.push(vote);
              //add-ws-8/20-禅道469任务
              this.tableLoa.forEach(item => {
                this.$refs.multipleTable.toggleRowSelection(item, true);
              });
              //add-ws-8/20-禅道469任务
            }
          }
          this.loading = false;
        });
    },
    //add-ws-5/26-No.208问题延申咱借款申请编号问题修改
    getLoanApplicationList() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1012Store/getLoanApplicationList', {'loanapno': this.formloan})
        .then(response => {
          if (response != undefined && response != null) {
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              if (response[i].paymentmethod === 'PJ015001' || response[i].paymentmethod === 'PJ015003') {
                vote.accename = response[i].accountpayeename;
              } else if (response[i].paymentmethod === 'PJ015002') {
                if (response[i].user_name !== '' && response[i].user_name !== null) {
                  vote.accename = getUserInfo(response[i].user_name).userinfo.customername;
                }
              }
              vote.moneys = response[i].moneys;
              vote.loanapno = response[i].loanapno;
              vote.loanapplication_id = response[i].loanapplication_id;
              this.tableLoa.push(vote);
              //add-ws-8/20-禅道469任务
              this.tableLoa.forEach(item => {
                this.$refs.multipleTable.toggleRowSelection(item, true);

              });
              //add-ws-8/20-禅道469任务
            }
          }
          // for (let i = 0; i < response.length; i++) {
          //   if (this.disable) {
          //
          //     if (response[i].status === '4' && this.$store.getters.userinfo.userid === response[i].user_id) {
          //       var vote = {};
          //       vote.value = response[i].loanapplication_id;
          //       vote.label = this.$t('menu.PFANS1006') + '_' + response[i].loanapno;
          //         //add_fjl_0722 添加【供应商/社员名称】显示  start
          //         vote.paymentmethod = response[i].paymentmethod;
          //         vote.accountpayeename = response[i].accountpayeename;
          //         vote.user_name = response[i].user_name;
          //         //add_fjl_0722 添加【供应商/社员名称】显示  end
          //       this.options.push(vote);
          //     }
          //   } else {
          //     if (response[i].status === '4') {
          //       var vote = {};
          //       vote.value = response[i].loanapplication_id;
          //       vote.label = this.$t('menu.PFANS1006') + '_' + response[i].loanapno;
          //         //add_fjl_0722 添加【供应商/社员名称】显示  start
          //         vote.paymentmethod = response[i].paymentmethod;
          //         vote.accountpayeename = response[i].accountpayeename;
          //         vote.user_name = response[i].user_name;
          //         //add_fjl_0722 添加【供应商/社员名称】显示  end
          //       this.options.push(vote);
          //     }
          //   }
          // }
          this.loading = false;
        });
    },
    //add-ws-5/26-No.208问题延申咱借款申请编号问题修改
    //add-ws-4/30-公共费用决裁已关联得精算
    rowclick(row, event, column) {
      this.DataList2 = [];
      this.loading = true;
      // add-lyt-21/3/13-PSDCD_PFANS_20210318_BUG_034-start
      let detailmoney ='';
      // add-lyt-21/3/13-PSDCD_PFANS_20210318_BUG_034-end
      this.$store
        .dispatch('PFANS1012Store/getpublicelist', {'publicexpenseid': row.judgement})
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            if (response[i].status !== null && response[i].status !== '') {
              response[i].status = getStatus(response[i].status);
            }
            // upd-lyt-21/4/13-PSDCD_PFANS_20210318_BUG_034-start
            if(response[i].currency == this.$t('label.PFANS1012VIEW_USD')
              ||response[i].currency == this.$t('label.PFANS1012VIEW_JPY')
              ||response[i].currency == this.$t('label.PFANS1012VIEW_SGD')){
              detailmoney = response[i].foreigncurrency;
            }else {
              detailmoney = response[i].moneys;
            }
            // upd-lyt-21/4/13-PSDCD_PFANS_20210318_BUG_034-end
            this.DataList2.push({
              // upd-lyt-21/4/13-PSDCD_PFANS_20210318_BUG_034-start
              detail_moneys: detailmoney,
              // upd-lyt-21/4/13-PSDCD_PFANS_20210318_BUG_034-end
              moneys: response[i].moneys,
              invoiceno: response[i].invoiceno,
              status: response[i].status,
            });
          }
          this.show12 = true;
          this.loading = false;
        }).catch(error => {
        this.$message.error({
          message: error,
          type: 'error',
          duration: 5 * 1000,
        });
        this.loading = false;
      });
    },
    //add-ws-4/30-公共费用决裁已关联得精算
    //add-ws-4/28-精算中，点击决裁，跳转画面
    viewdata(row) {
      //upd_fjl_0807 pop显示
      // this.$store.commit('global/SET_HISTORYURL', '');
      // this.$store.commit('global/SET_WORKFLOWURL', '/FFFFF1012FormView');
      let dicStr = '';
      let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'HT014');
      if (dic.length > 0) {
        for (let d of dic) {
          dicStr += d.value2 + ',';
        }
      }
      // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 start
      //this.urlparams = '';
      this.urlparams = {};
      // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 end
      this.url = '';
      this.urlparams = {'_id': row.judgement, 'disabled': false, '_disableview': true};
      if (row.judgement_name.substring(0, 2) === 'JC') {
        this.url = 'PFANS1004FormView';
        this.$refs.PFANS1004Pop.open = true;
        // this.$router.push({
        //   name: 'PFANS1004FormView',
        //   params: {
        //     _checkdisable: this.disable,
        //     _checkid: this.IDname,
        //     _check: true,
        //     _id: row.judgement,
        //     disabled: false,
        //   },
        // });
      } else if (row.judgement_name.substring(0, 2) === 'QY') {
        this.url = 'PFANS1005FormView';
        this.$refs.PFANS1005Pop.open = true;
        // this.$router.push({
        //   name: 'PFANS1005FormView',
        //   params: {
        //     _checkdisable: this.disable,
        //     _checkid: this.IDname,
        //     _check: true,
        //     _id: row.judgement,
        //     disabled: false,
        //   },
        // });
      } else if (row.judgement_name.substring(0, 2) === 'JJ') {
        this.url = 'PFANS1010FormView';
        this.$refs.PFANS1010Pop.open = true;
        // this.$router.push({
        //   name: 'PFANS1010FormView',
        //   params: {
        //     _checkdisable: this.disable,
        //     _checkid: this.IDname,
        //     _check: true,
        //     _id: row.judgement,
        //     disabled: false,
        //   },
        // });
      } else if (dicStr !== '' && dicStr.indexOf(row.judgement_name.substring(0, 2)) != -1) {
        this.url = 'PFANS1025FormView';
        this.$refs.PFANS1025Pop.open = true;
        // this.$router.push({
        //   name: 'PFANS1025FormView',
        //   params: {
        //     _checkdisable: this.disable,
        //     _checkid: this.IDname,
        //     _check: true,
        //     _id: row.judgement,
        //     disabled: false,
        //   },
        // });
      } else if (row.judgement_name.substring(0, 2) === 'CG') {
        this.url = 'PFANS3005FormView';
        this.$refs.PFANS3005Pop.open = true;
        // this.$router.push({
        //   name: 'PFANS3005FormView',
        //   params: {
        //     _checkdisable: this.disable,
        //     _checkid: this.IDname,
        //     _check: true,
        //     _id: row.judgement,
        //     disabled: false,
        //   },
        // });
      } else if (row.judgement_name.substring(0, 2) === 'WC') {
        this.url = 'PFANS1003FormView';
        this.$refs.PFANS1003Pop.open = true;
        // this.$router.push({
        //   name: 'PFANS1003FormView',
        //   params: {
        //     _checkdisable: this.disable,
        //     _checkid: this.IDname,
        //     _check: true,
        //     _id: row.judgement,
        //     disabled: false,
        //   },
        // });
      } else if (row.judgement_name.substring(0, 1) === 'C' && row.judgements_type === this.$t('title.PFANS1002VIEW')) {
        this.url = 'PFANS1002FormView';
        this.$refs.PFANS1002Pop.open = true;
      } else if (row.judgement_name.substring(0, 1) === 'C' && row.judgements_type === this.$t('title.PFANS1035VIEW')) {
        this.url = 'PFANS1035FormView';
        this.$refs.PFANS1035Pop.open = true;
      }
      //upd_fjl_0807 pop显示
    },

    //add-ws-4/28-精算中，点击决裁，跳转画面
    changeinvoicenumber(row, val) {
      for (let j = 0; j < this.tableF.length; j++) {
        if (row.invoicenumber == this.tableF[j].invoicenumber) {
          if (this.tableF[j].taxrate === '') {
            row.taxes = 0;
            this.checkexternal = true;
            this.checkdisable = true;
            this.checktaxes = true;
            this.disablecheck = true;
            break;
          } else {
            let taxratevalue = 0;
            if (row.rmb != '') {
              if (this.tableF[j].taxrate != '' && this.tableF[j].taxrate != null) {
                let letbudge = getDictionaryInfo(this.tableF[j].taxrate);
                if (letbudge) {
                  this.taxrateValue = letbudge.value1;
                }
              }
              taxratevalue = 1 + Number(this.taxrateValue);
              row.taxes = parseFloat((row.rmb / (taxratevalue) * this.taxrateValue)).toFixed(2);
            }
            this.checkdisable = false;
            this.checkexternal = false;
            this.checktaxes = false;
            this.disablecheck = false;
            break;
          }
        } else {
          row.taxes = 0;
          this.checkdisable = false;
          this.checkexternal = false;
          this.checktaxes = false;
          this.disablecheck = false;
        }
      }
    },
    setdisabled(val) {
      if (this.$route.params.disabled) {
        this.disable = val;
      }
    },
    // changeexternal(row) {
    //   if (row.external == '1') {
    //     this.checkexternal = true;
    //     this.budgetcodingcheck = row.budgetcoding;
    //     row.subjectnumber = getDictionaryInfo('PG023001').value2;
    //     row.budgetcoding = '000000';
    //   } else if (row.external == '0') {
    //     this.checkexternal = false;
    //     row.budgetcoding = this.budgetcodingcheck;
    //     row.subjectnumber = this.checkCode2;
    //   }
    // },
    checkoptionsdata() {
      this.optionsdata = [{value: this.$t('label.PFANS1012FORMVIEW_NOMONEY'), lable: ''}];
      for (var i = 0; i < this.tableF.length; i++) {
        var vote = {};
        vote.value = this.tableF[i].invoicenumber,
          vote.lable = this.tableF[i].invoicenumber,
          this.optionsdata.push(vote);
      }
    },
    getvehicle(val, row) {
      row.vehicle = val;
    },
    //upd-ws-6/5-禅道075任务，项目名称问题修正
    getCompanyProjectList() {
      if (this.disable) {
        this.loading = true;
        this.$store
          .dispatch('PFANS5009Store/getSiteList5', {})
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
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      } else {
        this.loading = true;
        this.$store
          .dispatch('PFANS5013Store/Listproject2', {})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              this.optionsdate.push({
                value: response[i].companyprojects_id,
                lable: response[i].numbers + '_' + response[i].project_name,
              });
            }
            this.$store
              .dispatch('PFANS5013Store/Listproject', {})
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
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });

            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      }
    },
    //upd-ws-6/5-禅道075任务，项目名称问题修正
    getGroupIdT(orglist, row) {
      if (orglist == '') {
        row.budgetcoding = '';
      }
      row.RedirictT = '',
        row.departmentname = orglist;
      //ADD_FJL
      row.optionsT = [];
      row.budgetcoding = '';
      row.accountcode = '';
      row.accoundoptionsdate = [];
      row.subjectnumber = '';
      // update center取预算单位横展 start
      if(getOrgInfo(row.departmentname)){
        let butinfo = (getOrgInfo(row.departmentname).encoding).substring(0,3);
        let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
        if (dic.length > 0) {
          for (let i = 0; i < dic.length; i++) {
            if (butinfo === (dic[i].value1).substring(0,3)) {
              row.optionsT.push({
                lable: dic[i].value2 + '_' + dic[i].value3,
                value: dic[i].code,
              });
            }
          }
        }
      }
      // update center取预算单位横展 end
      //ADD_FJL  修改人员预算编码
      let group = getOrgInfo(orglist);
      if (group) {
        this.companyen = group.companyen;
        row.RedirictT = group.redirict;
        if (row.RedirictT == '0') {
          row.accoundoptionsdate = [];
          let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ119');
          for (let i = 0; i < dicnew.length; i++) {
            if (dicnew[i].code === 'PJ119004') {
              row.accoundoptionsdate.push({
                value: dicnew[i].code,
                lable: dicnew[i].value1,
              });
            }
          }
        } else if (row.RedirictT == '1' || row.RedirictT == '') {
          row.accoundoptionsdate = [];
          let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ132');
          for (let i = 0; i < dicnew.length; i++) {
            if (dicnew[i].code === 'PJ132004') {
              row.accoundoptionsdate.push({
                value: dicnew[i].code,
                lable: dicnew[i].value1,
              });
            }
          }
        }
      }
    },
      //PSDCD_PFANS_20210723_XQ_086 委托决裁报销明细自动带出 ztc fr
      getAwardEnCode(val){
        let resultList = [];
        let departCode = getDictionaryInfo(val);
        if (departCode) {
         resultList.push({
            lable: departCode.value2 + '_' + departCode.value3,
            value: departCode.code,
          });
        }
        return resultList;
      },
      //PSDCD_PFANS_20210723_XQ_086 委托决裁报销明细自动带出 ztc to
    getGroupIdR(orglist, row) {
      if (orglist == '') {
        row.budgetcoding = '';
      }
      row.RedirictR = '',
        row.departmentname = orglist;
      //ADD_FJL
      row.optionsR = [];
      row.budgetcoding = '';
      row.ploptionsdate = [];
      row.plsummary = '';
      row.code16 = [];
      row.accountcode = '';
      row.subjectnumber = '';
      row.checkCode2 = '';
      row.checkCode = '';
      // update center取预算单位横展 start
      if(getOrgInfo(row.departmentname)){
        let butinfo = (getOrgInfo(row.departmentname).encoding).substring(0,3);
        let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
        if (dic.length > 0) {
          for (let i = 0; i < dic.length; i++) {
            if (butinfo === (dic[i].value1).substring(0,3)) {
              row.optionsR.push({
                lable: dic[i].value2 + '_' + dic[i].value3,
                value: dic[i].code,
              });
            }
          }
        }
      }
      // update center取预算单位横展 end
      //ADD_FJL  修改人员预算编码
      let group = getOrgInfo(orglist);
      if (group) {
        this.companyen = group.companyen;
        row.RedirictR = group.redirict;
        // row.budgetcoding = group.encoding;
        //row.code17 = row.RedirictR == '0' ? 'PJ121' : 'PJ134';
        if (row.RedirictR == '0') {
          if (row.plsummary == 'PJ111001') {
            row.accountcode = '',
              row.code16 = 'PJ112';

          } else if (row.plsummary == 'PJ111002') {
            row.accountcode = '',
              row.code16 = 'PJ113';

          } else if (row.plsummary == 'PJ111003') {
            row.accountcode = '',
              row.code16 = 'PJ114';

          } else if (row.plsummary == 'PJ111004') {
            row.accountcode = '',
              row.code16 = 'PJ150';

          } else if (row.plsummary == 'PJ111005') {
            row.accountcode = '',
              row.code16 = 'PJ116';

          } else if (row.plsummary == 'PJ111006') {
            row.accountcode = '',
              row.code16 = 'PJ117';

          } else if (row.plsummary == 'PJ111007') {
            row.accountcode = '',
              row.code16 = 'PJ118';

          } else if (row.plsummary == 'PJ111008') {
            row.accountcode = '',
              row.code16 = 'PJ119';

          } else if (row.plsummary == 'PJ111009') {
            row.accountcode = '',
              row.code16 = 'PJ120';

          } else if (row.plsummary == 'PJ111010') {
            row.accountcode = '',
              row.code16 = 'PJ121';

          } else if (row.plsummary == 'PJ111011') {
            row.accountcode = '',
              row.code16 = 'PJ122';

          } else if (row.plsummary == 'PJ111012') {
            row.accountcode = '',
              row.code16 = 'PJ123';

          } else if (row.plsummary == 'PJ111013') {
            row.accountcode = '',
              row.code16 = '';

          } else if (row.plsummary == 'PJ111014') {
            row.accountcode = '',
              row.code16 = 'PJ125';

          } else if (row.plsummary == 'PJ111015') {
            row.accountcode = '',
              row.code16 = 'PJ138';

          }
        } else if (row.RedirictR == '1' || row.RedirictR == '') {
          if (row.plsummary == 'PJ111001') {
            row.accountcode = '',
              row.code16 = 'PJ127';

          } else if (row.plsummary == 'PJ111002') {
            row.accountcode = '',
              row.code16 = 'PJ128';

          } else if (row.plsummary == 'PJ111003') {
            row.accountcode = '',
              row.code16 = 'PJ129';

          } else if (row.plsummary == 'PJ111004') {
            row.accountcode = '',
              row.code16 = 'PJ115';

          } else if (row.plsummary == 'PJ111005') {
            row.accountcode = '',
              row.code16 = 'PJ130';

          } else if (row.plsummary == 'PJ111006') {
            row.accountcode = '',
              row.code16 = '';

          } else if (row.plsummary == 'PJ111007') {
            row.accountcode = '',
              row.code16 = 'PJ131';

          } else if (row.plsummary == 'PJ111008') {
            row.accountcode = '',
              row.code16 = 'PJ132';

          } else if (row.plsummary == 'PJ111009') {
            row.accountcode = '',
              row.code16 = 'PJ133';

          } else if (row.plsummary == 'PJ111010') {
            row.accountcode = '',
              row.code16 = 'PJ134';

          } else if (row.plsummary == 'PJ111011') {
            row.accountcode = '',
              row.code16 = 'PJ135';

          } else if (row.plsummary == 'PJ111012') {
            row.accountcode = '',
              row.code16 = 'PJ136';

          } else if (row.plsummary == 'PJ111013') {
            row.accountcode = '',
              row.code16 = 'PJ124';

          } else if (row.plsummary == 'PJ111014') {
            row.accountcode = '',
              row.code16 = 'PJ137';

          } else if (row.plsummary == 'PJ111015') {
            row.accountcode = '',
              row.code16 = 'PJ139';

          }
        }
        // if (this.Redirict == '0') {
        //   row.accoundoptionsdate = [];
        //   let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ119');
        //   for (let i = 0; i < dicnew.length; i++) {
        //     if (dicnew[i].code === 'PJ119004') {
        //       row.accoundoptionsdate.push({
        //         value: dicnew[i].code,
        //         lable: dicnew[i].value1,
        //       });
        //     }
        //   }
        // } else if (this.Redirict == '1' || this.Redirict == '') {
        //   row.accoundoptionsdate = [];
        //   let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ132');
        //   for (let i = 0; i < dicnew.length; i++) {
        //     if (dicnew[i].code === 'PJ132004') {
        //       row.accoundoptionsdate.push({
        //         value: dicnew[i].code,
        //         lable: dicnew[i].value1,
        //       });
        //     }
        //   }
        // }
      }
    },
    getGroupIdP(orglist, row) {
      if (orglist == '') {
        row.budgetcoding = '';
      }
      row.RedirictP = '',
        row.departmentname = orglist;
      //ADD_FJL
      row.optionsP = [];
      row.budgetcoding = '';
      row.ploptionsdata = [];
      row.plsummary = '';
      row.accoundoptionsdateP = [];
      row.accountcode = '';
      row.subjectnumber = '';
      // update center取预算单位横展 start
      if(getOrgInfo(row.departmentname)){
        let butinfo = (getOrgInfo(row.departmentname).encoding).substring(0,3);
        let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
        if (dic.length > 0) {
          for (let i = 0; i < dic.length; i++) {
            if (butinfo === (dic[i].value1).substring(0,3)) {
              row.optionsP.push({
                lable: dic[i].value2 + '_' + dic[i].value3,
                value: dic[i].code,
              });
            }
          }
        }
      }
      // update center取预算单位横展 end
      //ADD_FJL  修改人员预算编码
      let group = getOrgInfo(orglist);
      if (group) {
        this.companyen = group.companyen;
        row.RedirictP = group.redirict;

      }
    },
    //add-ws-9/23-禅道任务555
    getplsummaryP(row) {
      row.accountcode = '';
      row.accoundoptionsdateP = [];
      if (row.RedirictP == '0') {
        if (row.plsummary === 'PJ111008') {
          let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ119');
          for (let a = 0; a < dicnew.length; a++) {
            if (dicnew[a].code === 'PJ119003') {
              row.accoundoptionsdateP.push({
                value: dicnew[a].code,
                lable: dicnew[a].value1,
              });
            }else if(dicnew[a].code === 'PJ119004'){
              row.accoundoptionsdateP.push({
                value: dicnew[a].code,
                lable: dicnew[a].value1,
              });
            }else if(dicnew[a].code === 'PJ119007'){
              row.accoundoptionsdateP.push({
                value: dicnew[a].code,
                lable: dicnew[a].value1,
              });
            }
          }
        } else if (row.plsummary === 'PJ111010') {
          let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ121');
          for (let a = 0; a < dicnew.length; a++) {
            row.accoundoptionsdateP.push({
              value: dicnew[a].code,
              lable: dicnew[a].value1,
            });
          }
        }

      } else if (row.RedirictP == '1' || row.RedirictP == '') {
        row.accoundoptionsdateP = [];
        if (row.plsummary === 'PJ111008') {
          let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ132');
          for (let a = 0; a < dicnew.length; a++) {
            if (dicnew[a].code === 'PJ132003') {
              row.accoundoptionsdateP.push({
                value: dicnew[a].code,
                lable: dicnew[a].value1,
              });
            }else if (dicnew[a].code === 'PJ132004') {
              row.accoundoptionsdateP.push({
                value: dicnew[a].code,
                lable: dicnew[a].value1,
              });
            }else if (dicnew[a].code === 'PJ132007') {
              row.accoundoptionsdateP.push({
                value: dicnew[a].code,
                lable: dicnew[a].value1,
              });
            }
          }
        } else if (row.plsummary === 'PJ111010') {
          let dicnew = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PJ134');
          for (let a = 0; a < dicnew.length; a++) {
            row.accoundoptionsdateP.push({
              value: dicnew[a].code,
              lable: dicnew[a].value1,
            });
          }
        }
      }
    },
    //add-ws-9/23-禅道任务555
    getplsummary(row) {
      row.accountcode = '',
        row.plsummary = row.plsummary;
      if (row.RedirictR == '0') {
        if (row.plsummary == 'PJ111001') {
          row.accountcode = '',
            row.code16 = 'PJ112';
          //row.code17 = 'PJ112';
        } else if (row.plsummary == 'PJ111002') {
          row.accountcode = '',
            row.code16 = 'PJ113';
          // row.code17 = 'PJ113';
        } else if (row.plsummary == 'PJ111003') {
          row.accountcode = '',
            row.code16 = 'PJ114';
          // row.code17 = 'PJ114';
        } else if (row.plsummary == 'PJ111004') {
          row.accountcode = '',
            row.code16 = 'PJ150';
          //   row.code17 = '';
        } else if (row.plsummary == 'PJ111005') {
          row.accountcode = '',
            row.code16 = 'PJ116';
          //   row.code17 = 'PJ116';
        } else if (row.plsummary == 'PJ111006') {
          row.accountcode = '',
            row.code16 = 'PJ117';
          //  row.code17 = 'PJ117';
        } else if (row.plsummary == 'PJ111007') {
          row.accountcode = '',
            row.code16 = 'PJ118';
          // row.code17 = 'PJ118';
        } else if (row.plsummary == 'PJ111008') {
          row.accountcode = '',
            row.code16 = 'PJ119';
          // row.code17 = 'PJ119';
        } else if (row.plsummary == 'PJ111009') {
          row.accountcode = '',
            row.code16 = 'PJ120';
          //   row.code17 = 'PJ120';
        } else if (row.plsummary == 'PJ111010') {
          row.accountcode = '',
            row.code16 = 'PJ121';
          //  row.code17 = 'PJ121';
        } else if (row.plsummary == 'PJ111011') {
          row.accountcode = '',
            row.code16 = 'PJ122';
          // row.code17 = 'PJ122';
        } else if (row.plsummary == 'PJ111012') {
          row.accountcode = '',
            row.code16 = 'PJ123';
          // row.code17 = 'PJ123';
        } else if (row.plsummary == 'PJ111013') {
          row.accountcode = '',
            row.code16 = '';
          // row.code17 = '';
        } else if (row.plsummary == 'PJ111014') {
          row.accountcode = '',
            row.code16 = 'PJ125';
          // row.code17 = 'PJ125';
        } else if (row.plsummary == 'PJ111015') {
          row.accountcode = '',
            row.code16 = 'PJ138';
          //  row.code17 = 'PJ138';
        }
      } else if (row.RedirictR == '1' || row.RedirictR == '') {
        if (row.plsummary == 'PJ111001') {
          row.accountcode = '',
            row.code16 = 'PJ127';
          // row.code17 = 'PJ127';
        } else if (row.plsummary == 'PJ111002') {
          row.accountcode = '',
            row.code16 = 'PJ128';
          // row.code17 = 'PJ128';
        } else if (row.plsummary == 'PJ111003') {
          row.accountcode = '',
            row.code16 = 'PJ129';
          //   row.code17 = 'PJ129';
        } else if (row.plsummary == 'PJ111004') {
          row.accountcode = '',
            row.code16 = 'PJ115';
          //  row.code17 = 'PJ115';
        } else if (row.plsummary == 'PJ111005') {
          row.accountcode = '',
            row.code16 = 'PJ130';
          // row.code17 = 'PJ130';
        } else if (row.plsummary == 'PJ111006') {
          row.accountcode = '',
            row.code16 = '';
          // row.code17 = '';
        } else if (row.plsummary == 'PJ111007') {
          row.accountcode = '',
            row.code16 = 'PJ131';
          // row.code17 = 'PJ131';
        } else if (row.plsummary == 'PJ111008') {
          row.accountcode = '',
            row.code16 = 'PJ132';
          // row.code17 = 'PJ132';
        } else if (row.plsummary == 'PJ111009') {
          row.accountcode = '',
            row.code16 = 'PJ133';
          // row.code17 = 'PJ133';
        } else if (row.plsummary == 'PJ111010') {
          row.accountcode = '',
            row.code16 = 'PJ134';
          //  row.code17 = 'PJ134';
        } else if (row.plsummary == 'PJ111011') {
          row.accountcode = '',
            row.code16 = 'PJ135';
          // row.code17 = 'PJ135';
        } else if (row.plsummary == 'PJ111012') {
          row.accountcode = '',
            row.code16 = 'PJ136';
          // row.code17 = 'PJ136';
        } else if (row.plsummary == 'PJ111013') {
          row.accountcode = '',
            row.code16 = 'PJ124';
          //  row.code17 = 'PJ124';
        } else if (row.plsummary == 'PJ111014') {
          row.accountcode = '',
            row.code16 = 'PJ137';
          // row.code17 = 'PJ137';
        } else if (row.plsummary == 'PJ111015') {
          row.accountcode = '',
            row.code16 = 'PJ139';
          //row.code17 = 'PJ139';
        }
      }

    },
    clickdata(row) {
      if (row.servicehours == null) {
        row.subjectnumber = row.checkCode2;
      } else {
        row.subjectnumber = row.checkcode;
      }
    },
    getaccoundcode(row) {
      let dic = getDictionaryInfo(row.accountcode);
      if (dic) {
        row.subjectnumber = dic.value2;
      }
    },
    //add-ws-9/23-禅道任务555
    getaccoundcodeP(row) {
      let dic = getDictionaryInfo(row.accountcode);
      if (dic) {
        row.subjectnumber = dic.value2;
      }
    },
    //add-ws-9/23-禅道任务555
    //add-ws-6/11-禅道090
    getworkinghours(workinghours) {
      if (workinghours != null) {
        if (workinghours.length > 0) {
          return moment(workinghours[0]).format('YYYY-MM-DD') + ' ~ ' + moment(workinghours[1]).format('YYYY-MM-DD');
        } else {
          return '';
        }
      } else {
        return '';
      }
    },
    //add-ws-6/11-禅道090
    getcodenew(val, row) {
      row.accountcode = val;
      let dic = getDictionaryInfo(val);
      if (row.accountcode == 'PJ116008' || row.accountcode == 'PJ130010') {
        this.checktime = true;
        row.checkcode = dic.value2;
      } else {
        this.checktime = false;
        row.servicehours = '';
      }
      if (dic) {
        row.subjectnumber = dic.value2;
        row.checkCode2 = dic.value2;
        // this.checkCode1 = dic.value3;
      }
    },
    //add-ws-6/11-禅道090
    getcode(val, row) {
      row.accountcode = val;
      let dic = getDictionaryInfo(val);
      if (dic) {
        row.subjectnumber = dic.value2;
        //   this.checkCode2 = dic.value2;
        //   this.checkCode1 = dic.value3;
      }
    },
    changesummoney(row) {
      row.facetax = row.invoiceamount - row.excludingtax;
    },
    getrate(row) {
      let taxratevalue = 0;
      if (row.taxrate != '' && row.taxrate != null) {
        let letbudge = getDictionaryInfo(row.taxrate);
        if (letbudge) {
          this.taxrateValue = letbudge.value1;
        }
      }
      taxratevalue = 1 + Number(this.taxrateValue);
      row.facetax = parseFloat((row.invoiceamount / (taxratevalue) * this.taxrateValue)).toFixed(2);
      row.excludingtax = row.invoiceamount - row.facetax;
      //add-ws-6/2-No.221-专票税率发生变化，自动将明细此专票下税金重新计算
      for (let j = 0; j < this.tableP.length; j++) {
        if (row.invoicenumber == this.tableP[j].invoicenumber) {
          this.tableP[j].taxes = parseFloat((this.tableP[j].rmb / (taxratevalue) * this.taxrateValue)).toFixed(2);
        }
      }
      for (let i = 0; i < this.tableR.length; i++) {
        if (row.invoicenumber == this.tableR[i].invoicenumber) {
          this.tableR[i].taxes = parseFloat((this.tableR[i].rmb / (taxratevalue) * this.taxrateValue)).toFixed(2);
        }
      }
      //add-ws-6/2-No.221-专票税率发生变化，自动将明细此专票下税金重新计算
    },
    getPaymentinvoicetype(val, row) {
      row.excludingtax = '';
      row.facetax = '';
      row.invoicetype = val;
      row.taxrate = ' ';
    },
    changeSum(row) {
      let taxratevalue = 0;
      if (row.taxrate != '' && row.taxrate != null) {
        let letbudge = getDictionaryInfo(row.taxrate);
        if (letbudge) {
          this.taxrateValue = letbudge.value1;
        }
      }
      taxratevalue = 1 + Number(this.taxrateValue);
      row.facetax = parseFloat((row.invoiceamount / (taxratevalue) * this.taxrateValue)).toFixed(2);
      row.excludingtax = row.invoiceamount - row.facetax;
      for (let j = 0; j < this.tableF.length; j++) {
        if (this.tableF[j].invoiceamount != 0) {
          this.form.tormb = '';
          this.disablecheck = true;
          break;
        } else {
          this.disablecheck = false;
          continue;
        }
      }
      for (let j = 0; j < this.tableT.length; j++) {
        this.form.tormb = '';
        this.disa = true;
      }
      for (let j = 0; j < this.tableP.length; j++) {
        this.tableP[j].foreigncurrency = '';
        this.tableP[j].currencyrate = '';
        this.tableP[j].tormb = '';
        this.tableP[j].currency = '';
        this.form.tormb = '';
        this.disa = true;
      }
      for (let j = 0; j < this.tableR.length; j++) {
        this.tableR[j].foreigncurrency = '';
        this.tableR[j].currencyrate = '';
        this.tableR[j].tormb = '';
        this.tableR[j].currency = '';
        this.form.tormb = '';
        this.disa = true;
      }

    },
    getUsernames(val) {
      if (val === '') {
        this.form.code = '';
        this.Codecheck = '';
      } else {
        this.form.code = getUserInfo(val).userinfo.caiwupersonalcode;
      }
      this.namelist = val;
      this.form.user_name = val;
      if (!this.form.user_name || this.form.user_name === '' || typeof val == 'undefined') {
        this.errorname = this.$t('normal.error_08') + this.$t('label.PFANS1006FORMVIEW_USERNAME');
      } else {
        this.errorname = '';
      }
    },
    // 禅道597 ztc 决裁精算金额合计-start
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
            if (!isNaN(value)) {
              return Math.round((prev + curr) * 100) / 100;
            } else {
              return Math.round(prev * 100) / 100;
            }
            // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
          }, 0);
          sums[index] = Math.round((sums[index]) * 100) / 100;
        } else {
          sums[index] = '--';
          sums[3] = '--';
        }
      });
      return sums;
    },
    // 禅道597 ztc 决裁精算金额合计-end
    getUserids(val) {
      this.form.telephone = '';
      this.userlist = val;
      this.form.user_id = val;
      let rst = getOrgInfoByUserId(val);
      let num = getUserInfo(val).userinfo.extension;
      if (num) {
        this.form.telephone = num;
      }
      if (rst) {
        this.centerid = rst.centerNmae;
        this.groupid = rst.groupNmae;
        this.teamid = rst.teamNmae;
        this.form.centerid = rst.centerId;
        this.form.groupid = rst.groupId;
        this.form.teamid = rst.teamId;
      } else {
        this.centerid = '';
        this.groupid = '';
        this.teamid = '';
        this.form.centerid = '';
        this.form.groupid = '';
        this.form.teamid = '';
      }
      if (!this.form.user_id || this.form.user_id === '' || typeof val == 'undefined') {
        this.error = this.$t('normal.error_08') + this.$t('label.applicant');
      } else {
        this.error = '';
      }
    },
    workflowState(val) {
      if (val.state === '1') {
        this.form.status = '3';
      } else if (val.state === '2') {
        this.form.status = '4';
      }
      this.updateSta();
      // this.buttonClick('save');
    },
    //add-ws-5-20-流程恒展开
    start(val) {
      if (val.state === '0') {
        this.form.status = '2';
      } else if (val.state === '2') {
        this.form.status = '4';
      }
      this.updateSta();
    },
    //add-ws-5-20-流程恒展开
    end() {
      this.form.status = '0';
      this.updateSta();
      // this.buttonClick('save');
    },
    getPayment(val) {
      this.tableLoa = [];
      this.form.paymentmethod = val;
      if (val === 'PJ004001') {
        this.show1 = true;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        this.namelist = '';
        this.form.user_name = '';
        this.form.code = '';
        this.form.expectedpaydate = '';
        this.form.accountnumber = '';
        this.form.receivables = '';
        this.form.loan = '';
        this.form.fullname = '';
        this.checkexpectedpaydate = false;
        this.multipleSelection = '';
      } else if (val === 'PJ004002') {
        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        this.form.expectedpaydate = '';
        this.namelist = this.$store.getters.userinfo.userid;
        this.form.code = this.Codecheck;
        this.form.payeename = '';
        this.form.payeecode = '';
        this.form.payeebankaccountnumber = '';
        this.form.payeebankaccount = '';
        this.form.receivables = '';
        this.form.loan = '';
        this.form.fullname = '';
        this.form.suppliername = ' ';
        this.checkexpectedpaydate = false;
        this.multipleSelection = '';
      } else if (val === 'PJ004003') {
        this.show1 = false;
        this.show2 = false;
        this.show3 = true;
        this.show4 = false;
        this.show5 = false;
        this.form.payeename = '';
        this.form.payeecode = '';
        this.form.expectedpaydate = '';
        this.form.payeebankaccountnumber = '';
        this.form.payeebankaccount = '';
        this.form.code = '';
        this.form.user_name = '';
        this.namelist = '';
        this.form.loan = '';
        this.form.fullname = '';
        this.checkexpectedpaydate = true;
        this.multipleSelection = '';
      } else if (val === 'PJ004004') {
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = true;
        this.show5 = false;
        this.form.payeename = '';
        this.form.payeecode = '';
        this.form.expectedpaydate = '';
        this.form.payeebankaccountnumber = '';
        this.form.payeebankaccount = '';
        this.form.code = '';
        this.form.user_name = '';
        this.namelist = '';
        this.form.receivables = '';
        this.form.fullname = '';
        this.form.suppliername = ' ';
        this.checkexpectedpaydate = true;
        if (this.form.loan === '') {
          this.getLoanApplicationList();
        }
      } else {
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = true;
        this.form.payeename = '';
        this.form.payeecode = '';
        this.form.expectedpaydate = '';
        this.form.payeebankaccountnumber = '';
        this.form.payeebankaccount = '';
        this.form.code = '';
        this.form.user_name = '';
        this.form.receivables = '';
        this.form.loan = '';
        this.checkexpectedpaydate = true;
        this.multipleSelection = '';
      }
    },
    getmodule(val) {
      this.form.moduleid = val;
    },

    getCurrency(val, row) {
      row.currency = val;
      let error = 0;
      if (this.form.type === 'PJ001002') {
        if (this.tableP.length > 1) {
          for (let i = 0; i < this.tableP.length; i++) {
            for (let j = 1; j < this.tableP.length; j++) {
              if (this.tableP[i].currency != this.tableP[j].currency) {
                error = error + 1;
                Message({
                  message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                break;
              }
              continue;
            }
            break;
          }
        }
        if (error == '0') {
          if (this.tableP.length > 0) {
            for (let i = 0; i < this.tableP.length; i++) {
              if (this.tableR[0].currency != '' && this.tableP[0].currency != '') {
                for (let j = 0; j < this.tableR.length; j++) {
                  if (this.tableP[i].currency != this.tableR[j].currency) {
                    error = error + 1;
                    Message({
                      message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                      type: 'error',
                      duration: 5 * 1000,
                    });

                    break;
                  }
                }
              }
              break;
            }
          }
        }
        if (error == '0') {
          if (this.tableR.length > 0) {
            for (let i = 0; i < this.tableR.length; i++) {
              if (this.tableP[0].currency != '' && this.tableR[0].currency != '') {
                for (let j = 0; j < this.tableP.length; j++) {
                  if (this.tableR[i].currency != this.tableP[j].currency) {
                    error = error + 1;
                    Message({
                      message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    break;
                  }
                }
                break;
              }
            }
          }
        }
        if (error == '0') {
          if (this.tableR.length > 1) {
            for (let i = 0; i < this.tableR.length; i++) {
              for (let j = 1; j < this.tableR.length; j++) {
                if (this.tableR[i].currency != this.tableR[j].currency) {
                  error = error + 1;
                  Message({
                    message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  break;
                }
                continue;
              }
              break;
            }
          }
        }
      }
      if (error == '0') {
        let dictionaryInfo = getMonthlyrateInfo2(val, this.month4);
        if (dictionaryInfo) {
          row.currencyrate = dictionaryInfo.exchangerate;
        }
        row.tormb = Math.round((row.foreigncurrency * row.currencyrate) * 100) / 100;
        // this.tormbT = Number(this.tormbT) + row.tormb;
        // this.form.tormb = this.tormbT;
        this.form.currency = getMonthlyrateInfo2(val, this.month4).currencyname;
      }
      this.error_currency = error;
    },
    getCurrencyrate(row) {
      row.tormb = Math.round((row.foreigncurrency * row.currencyrate) * 100) / 100;
      // this.tormbT = Number(this.tormbT) + row.tormb;
      // this.form.tormb = this.tormbT;
    },
    deleteRow(index, rows, row) {
      if (rows.length > 1) {
        rows.splice(index, 1);
      } else {
        this.tableT = [{
          trafficdate: '',
          accountcode: '',
          departmentname: '',
          budgetcoding: '',
          plsummary: '',
          region: '',
          subjectnumber: '',
          vehicle: '',
          startingpoint: '',
          rmb: '',
          annexno: '',
        }];
      }
    },
    deleteRow3(index, rows) {
      if (rows.length > 1) {
        rows.splice(index, 1);
      } else {
        this.tableP = [{
          departmentname: '',
          budgetcoding: '',
          invoicenumber: '',
          accountcode: '',
          taxes: '',
          plsummary: '',
          purchasedetailsdate: '',
          currency: '',
          currencyrate: '',
          tormb: '',
          procurementdetails: '',
          subjectnumber: ' ',
          rmb: '',
          foreigncurrency: '',
          annexno: '',
          showrow: true,
        }];
      }
    },
    deleteRow4(index, rows) {
      if (rows.length > 1) {
        rows.splice(index, 1);
      } else {
        this.tableR = [{
          servicehours: '',
          otherdetailsdate: '',
          invoicenumber: '',
          costitem: '',
          taxes: '',
          plsummary: '',
          departmentname: '',
          accountcode: '',
          currency: '',
          currencyrate: '',
          tormb: '',
          subjectnumber: '',
          budgetcoding: '',
          remarks: '',
          rmb: '',
          foreigncurrency: '',
          annexno: '',
          checkCode2: '',
          checkCode: '',
        }];
      }
    },
    deleteRow7(index, rows) {
      if (rows.length > 1) {
        rows.splice(index, 1);
      } else {
        this.tableF = [{
          invoicenumber: this.$t('label.PFANS1012FORMVIEW_NUMBERZP') + 1,
          invoicetype: 'PJ068001',
          invoiceamount: '',
          taxrate: '',
          excludingtax: '',
          facetax: '',
        }];
      }
      this.checkoptionsdata();
    },
    addRow() {
      this.tableT.push({
        optionsT: this.tableT[0].optionsT,
        //禅道653 ztc
        accoundoptionsdate: this.tableT[0].accoundoptionsdate,
        //禅道653 ztc
        trafficdetails_id: '',
        publicexpenseid: '',
        trafficdate: '',
        accountcode: this.tableT[0].accountcode,
        departmentname: this.tableT[0].departmentname,
        budgetcoding: this.tableT[0].budgetcoding,
        //禅道653 ztc
        subjectnumber: this.tableT[0].subjectnumber,
        //禅道653 ztc
        plsummary: 'PJ111008',
        region: '',
        vehicle: '',
        startingpoint: '',
        rmb: '',
        annexno: '',
        rowindex: '',
        display: true,
      });
    },
    addRow7() {
      let b;
      let c;
      if (this.tableF.length > 0) {
        b = this.tableF.length + 1;
        c = this.$t('label.PFANS1012FORMVIEW_NUMBERZP') + b;
      }
      this.tableF.push({
        invoice_id: '',
        publicexpenseid: '',
        invoicenumber: c,
        invoicetype: 'PJ068001',
        invoiceamount: '',
        taxrate: '',
        excludingtax: '',
        facetax: '',
      });
      this.checkoptionsdata();
    },
    addRow3() {
      this.tableP.push({
        publicexpenseid: '',
        purchasedetails_id: '',
        invoicenumber: '',
        departmentname: '',
        budgetcoding: '',
        purchasedetailsdate: '',
        procurementdetails: '',
        accountcode: '',
        plsummary: '',
        currency: '',
        currencyrate: '',
        tormb: '',
        subjectnumber: '',
        taxes: '',
        rmb: '',
        foreigncurrency: '',
        annexno: '',
        rowindex: '',
        display: true,
        showrow: true,
        showrow1: false,
        showrow2: false,
        showrow3: false,
      });
    },
    addRow4() {
      this.tableR.push({
        publicexpenseid: '',
        otherdetails_id: '',
        otherdetailsdate: '',
        invoicenumber: '',
        servicehours: '',
        costitem: '',
        currency: '',
        currencyrate: '',
        tormb: '',
        departmentname: '',
        accountcode: '',
        plsummary: '',
        subjectnumber: '',
        budgetcoding: '',
        remarks: '',
        rmb: '',
        foreigncurrency: '',
        taxes: '',
        annexno: '',
        rowindex: '',
        checkCode2: '',
        checkCode: '',
        display: true,
      });
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
            // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
            if (!isNaN(value)) {
              return Math.round((prev + curr) * 100) / 100;
            } else {
              return Math.round(prev * 100) / 100;
            }
            // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
          }, 0);
          // if (index == 8) {
          //   sums[index] = Math.round((sums[index]) * 100) / 100;
          // }
        } else {
          sums[index] = '--';
        }
      });
      sums[8] = Math.round(sums[8] * 100) / 100;
      this.getMoney(sums);
      this.getforeigncurrency(sums);
      return this.formatThods(sums);
    },
    getPsummaries(param) {
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
            // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
            if (!isNaN(value)) {
              return Math.round((prev + curr) * 100) / 100;
            } else {
              return Math.round(prev * 100) / 100;
            }
            // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
          }, 0);
          // if (index == 8) {
          //   sums[index] = Math.round((sums[index]) * 100) / 100;
          // }
          // if (index == 9) {
          //   sums[index] = Math.round((sums[index]) * 100) / 100;
          // }
        } else {
          sums[index] = '--';
        }
      });
      sums[7] = Math.round(sums[7] * 100) / 100;
      sums[8] = Math.round(sums[8] * 100) / 100;
      sums[11] = Math.round(sums[11] * 100) / 100;
      sums[12] = Math.round(sums[12] * 100) / 100;
      this.tablePValue = JSON.parse(JSON.stringify(sums));
      return this.formatThods(sums);
    },
    formatThods(val){
      for(let i = 0; i < val.length; i ++){
        if(val[i] != null && val[i] !== 'NaN' && typeof val[i] === 'number'){
          val[i] = val[i].toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }
      return val
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
          debugger
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
            if (!isNaN(value)) {
              return Math.round((prev + curr) * 100) / 100;
            } else {
              return Math.round(prev * 100) / 100;
            }
            // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
          }, 0);
          if (index == 7) {
            sums[index] = Math.round((sums[index]) * 100) / 100;
          }
          if (index == 8) {
            sums[index] = Math.round((sums[index]) * 100) / 100;
          }
          if (index == 9) {
            sums[index] = Math.round((sums[index]) * 100) / 100;
          }
          if (index == 10) {
            sums[index] = Math.round((sums[index]) * 100) / 100;
          }
          if (index == 11) {
            sums[index] = Math.round((sums[index]) * 100) / 100;
          }
          if (index == 12) {
            sums[index] = Math.round((sums[index]) * 100) / 100;
          }
        } else {
          sums[index] = '--';
        }
      });
      this.getMoney(sums);
      this.getforeigncurrency(sums);
      return this.formatThods(sums);
    },
    getMoney(sums) {
      debugger
      if (this.form.type === 'PJ001001') {
        this.form.rmbexpenditure = sums[8];
      } else if (this.checktime) {
        this.form.rmbexpenditure = this.tablePValue[7] + sums[8];
      } else {
        this.form.rmbexpenditure = this.tablePValue[7] + sums[7];
      }
    },
    getforeigncurrency(sums) {
      if (this.form.type === 'PJ001001') {
        this.form.foreigncurrency = '0';
      } else if (this.checktime) {
        this.form.foreigncurrency = this.tablePValue[8] + sums[9];
      } else {
        this.form.foreigncurrency = this.tablePValue[8] + sums[8];
      }
    },
    changeRMB(newValue) {
      for (let j = 0; j < this.tableF.length; j++) {
        let taxratevalue = 0;
        if (newValue.invoicenumber == this.tableF[j].invoicenumber) {
          if (newValue.rmb != '') {
            if (this.tableF[j].taxrate != '') {
              if (this.tableF[j].taxrate != '' && this.tableF[j].taxrate != null) {
                let letbudge = getDictionaryInfo(this.tableF[j].taxrate);
                if (letbudge) {
                  this.taxrateValue = letbudge.value1;
                }
              }
              taxratevalue = 1 + Number(this.taxrateValue);
              newValue.taxes = parseFloat((newValue.rmb / (taxratevalue) * this.taxrateValue)).toFixed(2);
            }
          }
        }
      }
      if (newValue.rmb > 0) {
        newValue.foreigncurrency = '';
        newValue.currencyrate = '';
        newValue.tormb = '';
        newValue.currency = '';
        this.form.tormb = '';
        this.disa = true;
        newValue.display = false;
        this.$nextTick(() => {
          newValue.display = true;
        });
      }
    },
    changeForeigncurrency(newValue) {
      if (newValue.foreigncurrency > 0) {
        newValue.rmb = '';
        newValue.currencyrate = '';
        newValue.tormb = '';
        this.form.tormb = '';
        this.disa = false;
        newValue.display = false;
        this.$nextTick(() => {
          newValue.display = true;
        });
      }
      let dictionaryInfo = getMonthlyrateInfo2(newValue.currency, this.month4);
      if (dictionaryInfo) {
        newValue.currencyrate = dictionaryInfo.exchangerate;
      }
      newValue.tormb = Math.round((newValue.foreigncurrency * newValue.currencyrate) * 100) / 100;
      // this.tormbT = Number(this.tormbT) + newValue.tormb;
      // this.form.tormb = this.tormbT;
    },
    handleClickChange(val) {
      this.currentRow = val.suppliername;
      this.currentRow1 = val.payeename;
      this.currentRow2 = val.suppliercode;
      this.currentRow3 = val.payeebankaccountnumber;
      this.currentRow4 = val.payeebankaccount;
    },
    //add_fjl_0724  添加暂借款的pop跳转  start
    // clickBun() {
    //     if (this.form.loan !== '' && this.form.loan !== null && this.form.loan !== undefined) {
    //         this.urlparams = {'_id': this.form.loan};
    //         this.url = 'PFANS1006FormView';
    //         this.$refs[1].open = true;
    //     }
    // },
    //add_fjl_0724  添加暂借款的pop跳转  end
    //add_fjl_0722 添加【供应商/社员名称】显示  start
    // changeLoan(val) {
    //     let opt = this.options.filter(item => item.value === val);
    //     if (opt.length > 0) {
    //         if (opt[0].paymentmethod === 'PJ015001' || opt[0].paymentmethod === 'PJ015003') {
    //             this.form.accename = opt[0].accountpayeename;
    //         } else if (this.options[0].paymentmethod === 'PJ015002') {
    //             if (opt[0].user_name !== '' && opt[0].user_name !== null) {
    //                 this.form.accename = getUserInfo(opt[0].user_name).userinfo.customername;
    //             }
    //         }
    //     }
    // },
    //add_fjl_0722 添加【供应商/社员名称】显示  end
    submit() {
      let val = this.currentRow;
      let val1 = this.currentRow1;
      let val2 = this.currentRow2;
      let val3 = this.currentRow3;
      let val4 = this.currentRow4;
      this.dialogTableVisible = false;
      this.form.suppliername = val;
      this.form.payeename = val1;
      this.form.fullname = val1;
      this.form.payeecode = val2;
      this.form.payeebankaccountnumber = val3;
      this.form.payeebankaccount = val4;

    },
    getsupplierinfor() {
      this.loading = true;
      this.$store
        .dispatch('PFANS6003Store/getsupplierinfor2')
        .then(response => {
          this.gridData = [];
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            vote.suppliername = response[i].supchinese;
            vote.payeename = response[i].payeename;
            vote.suppliercode = response[i].suppliercode;
            vote.payeebankaccountnumber = response[i].payeebankaccountnumber;
            vote.payeebankaccount = response[i].payeebankaccount;
            this.gridData.push(vote);
          }
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
    checkparams() {
      let id = this.$route.params._checkid;
      let fromname = this.$route.params._fromname;
      //add_fjl_0828  流程信息查不到横展开
      if (fromname === 'PFANS3005FormView') {
        this.$store.commit('global/SET_WORKFLOWURL', '/PFANS3005View');
      } else {
        this.$store.commit('global/SET_WORKFLOWURL', '/' + fromname);
      }
      //add_fjl_0828  流程信息查不到横展开
      this.$router.push({
        name: fromname,
        params: {
          disabled: true,
          _id: id,
        },
      });
    },
    //add-ws-9/25-禅道任务567
    checkbackcheck() {
      let id = this.$route.params._paramsid;
      let disable = this.$route.params.backcheck;
      this.$router.push({
        name: 'PFANS1025FormView',
        params: {
          _status: this.$t('label.PFANS5004VIEW_OVERTIME'),
          disabled: disable,
          _id: id,
        },
      });
    },
    //add-ws-9/25-禅道任务567
    buttonClick(val) {
      if (val === 'back') {
        //add-fjl-0813-精算中，点击决裁，跳转画面
        if (this.$route.params._check2 != null && this.$route.params._check2 != '' && this.$route.params._check2 != undefined) {
          if (this.$route.params._check2) {
            this.checkparams();
          }
          //add-ws-9/25-禅道任务567
        } else if (this.$route.params.backcheck != null && this.$route.params.backcheck != '' && this.$route.params.backcheck != undefined) {
          if (this.$route.params.backcheck) {
            this.checkbackcheck();
          }
        } else {
          //add-ws-9/25-禅道任务567
          // add_zy_210608  精算返回按钮到一览画面  start
          let _re_title = '';
          let _name = [];
          _name =  this.$route.params._name;
          if(_name) {
            let _judgements_type = _name[0].judgements_type;
            if (_judgements_type === this.$t('menu.PFANS1010')) {
              _re_title = 10;
            } else if (_judgements_type === this.$t('title.PFANS1004VIEW')) {
              _re_title = 4;
            } else if (_judgements_type === this.$t('label.PFANS1012VIEW_PURCHASSESWC')) {
              _re_title = 3;
            } else if (_judgements_type === this.$t('menu.PFANS1005')) {
              _re_title = 5;
            }
            this.$router.push({
              name: 'PFANS1001FormView',
              params: {
                title: _re_title,
              },
            });
          }else{
            this.$router.push({
              name: 'PFANS1012View',
              params: {
              },
            });
          }
          // add_zy_210608  精算返回按钮到一览画面  end
        }
        //add-fjl-0813-精算中，点击决裁，跳转画面
      }
      if (val === 'save') {
        // add-lyt-21/4/14-NT_PFANS_20210413_BUG_002-start
        for(let i = 0;i<this.tableP.length;i++){
          for(let j = 0;j<this.tableP.length;j++){
            if((this.tableP[i].foreigncurrency > 0 && this.tableP[j].rmb>0)
              || (this.tableP[j].rmb>0 && (this.tableP[j].currency !== null && this.tableP[j].currency !==''))){
              this.activeName = 'third';
              Message({
                message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                type: 'error',
                duration: 5 * 1000,
              });
              return;
            }
          }
        };
        for(let i = 0;i<this.tableR.length;i++){
          for(let j = 0;j<this.tableR.length;j++){
            if((this.tableR[i].foreigncurrency > 0 && this.tableR[j].rmb>0)
              || (this.tableR[j].rmb>0 && (this.tableR[j].currency !== null && this.tableR[j].currency !==''))){
              this.activeName = 'third';
              Message({
                message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                type: 'error',
                duration: 5 * 1000,
              });
              return;
            }
          }
        };
        // add-lyt-21/4/14-NT_PFANS_20210413_BUG_002-end
        this.$refs['reff'].validate(valid => {
            if (valid) {
              if (this.form.type === 'PJ001002') {
                let tableptormb = 0;
                let tablertormb = 0;
                if (this.tableP.length > 0) {
                  for (let j = 0; j < this.tableP.length; j++) {
                    if (this.tableP[j].tormb > 0) {
                      tableptormb += parseFloat(this.tableP[j].tormb);
                    }
                  }
                }

                if (this.tableR.length > 0) {
                  for (let i = 0; i < this.tableR.length; i++) {
                    if (this.tableR[i].tormb > 0) {
                      tablertormb += parseFloat(this.tableR[i].tormb);
                    }
                  }
                }
                this.tormbT = Number(tablertormb) + Number(tableptormb);
                this.form.tormb = this.tormbT;
              }
              this.baseInfo = {};
              this.baseInfo.publicexpense = [];
              this.baseInfo.trafficdetails = [];
              this.baseInfo.purchasedetails = [];
              this.baseInfo.otherdetails = [];
              this.baseInfo.invoice = [];
              this.form.user_id = this.userlist;
              this.form.user_name = this.namelist;
              if (this.form.tormb === undefined) {
                this.form.tormb = '';
              }
// add-ws-8/20-禅道469
              let checktableD = '';
              if (this.multipleSelection) {
                let checktlist = this.multipleSelection.splice(',');
                for (let m = 0; m < checktlist.length; m++) {
                  if (checktlist[m].loanapplication_id != '' && checktlist[m].loanapplication_id != null && checktlist[m].loanapplication_id != undefined) {
                    checktableD = checktableD + checktlist[m].loanapplication_id + ',';
                    this.form.loan = checktableD.substring(0, checktableD.length - 1);
                  }
                }
              }
// add-ws-8/20-禅道469
              this.form.moneys = Math.round((this.form.rmbexpenditure + this.form.tormb) * 100) / 100;
              this.form.reimbursementdate = moment(this.form.reimbursementdate).format('YYYY-MM-DD');
              //add-ws-4/27-BS科目根据收款方编码值，赋01
              if (this.form.payeecode != '' && this.form.payeecode != null) {
                if (this.form.payeecode === '00027358') {
                  this.form.bsexternal = '1';
                } else {
                  this.form.bsexternal = '0';
                }
              }
              //add-ws-4/27-BS科目根据收款方编码值，赋01
              this.baseInfo.publicexpense = JSON.parse(JSON.stringify(this.form));
              let sum = 0;
              for (let i = 0; i < this.tableF.length; i++) {
                //add_fjl_0723_分录传票的发票税金需要与后面明细同种发票的税金和相同  start
                let sumtaxesT = 0;
                let sumtaxesA = 0;
                let sumtaxesF = 0;
                let sumtaxes = 0;
                let taxesm = 0;
                let taxesn = 0;
                for (let m = 0; m < this.tableP.length; m++) {
                  if (this.tableP[m].invoicenumber == this.tableF[i].invoicenumber) {
                    if (this.tableP[m].taxes != '0') {
                      taxesm = m;
                      sumtaxesT += this.tableP[m].taxes;
                    }
                  }
                }
                for (let n = 0; n < this.tableR.length; n++) {
                  if (this.tableR[n].invoicenumber == this.tableF[i].invoicenumber) {
                    if (this.tableR[n].taxes != '0') {
                      taxesn = n;
                      sumtaxesA += this.tableR[n].taxes;
                    }
                  }
                }
                sumtaxesF = Number(sumtaxesT) + Number(sumtaxesA);
                sumtaxes = Number(sumtaxesF) - Number(this.tableF[i].facetax);
                //PSDCD_PFANS_20210519_BUG_007 bug修改 fr
                if (sumtaxes < 0) {
                  if (taxesm === 0 && sumtaxesT === 0) {
                    this.tableR[taxesn].taxes = (Number(this.tableR[taxesn].taxes) - Number(sumtaxes)).toFixed(2);
                  } else {
                    this.tableP[taxesm].taxes = (Number(this.tableP[taxesm].taxes) - Number(sumtaxes)).toFixed(2);
                  }
                } else if (sumtaxes > 0) {
                  if (taxesm === 0 && sumtaxesT === 0) {
                    this.tableR[taxesn].taxes = (Number(this.tableR[taxesn].taxes) - Number(sumtaxes)).toFixed(2);
                  } else {
                    this.tableP[taxesm].taxes = (Number(this.tableP[taxesm].taxes) - Number(sumtaxes)).toFixed(2);
                  }
                }
                //PSDCD_PFANS_20210519_BUG_007 bug修改 to
                //add_fjl_0723_分录传票的发票税金需要与后面明细同种发票的税金和相同  end
                sum += this.tableF[i].invoiceamount;
                if (this.tableF[i].invoicenumber !== '' || this.tableF[i].invoicetype !== '' || this.tableF[i].invoiceamount > 0 || this.tableF[i].taxrate !== ''
                  || this.tableF[i].excludingtax > 0 || this.tableF[i].facetax > 0) {
                  this.baseInfo.invoice.push(
                    {
                      invoice_id: this.tableF[i].invoice_id,
                      publicexpenseid: this.tableF[i].publicexpenseid,
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
              this.invoiceamountsum = sum;
              if (this.form.type === 'PJ001001') {
                for (let i = 0; i < this.tableT.length; i++) {
                  if (this.tableT[i].trafficdate !== '' || this.tableT[i].subjectnumber !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
                    || this.tableT[i].rmb > 0 || this.tableT[i].annexno !== '') {
                    this.baseInfo.trafficdetails.push(
                      {
                        trafficdetails_id: this.tableT[i].trafficdetails_id,
                        publicexpenseid: this.tableT[i].publicexpenseid,
                        trafficdate: this.tableT[i].trafficdate,
                        accountcode: this.tableT[i].accountcode,
                        plsummary: this.tableT[i].plsummary,
                        departmentname: this.tableT[i].departmentname,
                        budgetcoding: this.tableT[i].budgetcoding,
                        subjectnumber: this.tableT[i].subjectnumber,
                        region: this.tableT[i].region,
                        vehicle: this.tableT[i].vehicle,
                        startingpoint: this.tableT[i].startingpoint,
                        rmb: this.tableT[i].rmb,
                        annexno: this.tableT[i].annexno,
                      },
                    );
                  }
                }
              } else if (this.form.type === 'PJ001002') {
                for (let i = 0; i < this.tableP.length; i++) {
                  if (this.tableP[i].purchasedetailsdate !== '' || this.tableP[i].procurementdetails !== '' || this.tableP[i].invoicenumber !== '' || this.tableP[i].departmentname !== '' || this.tableP[i].budgetcoding !== ''
                    || this.tableP[i].subjectnumber !== '' || this.tableP[i].rmb > 0 || this.tableP[i].foreigncurrency > 0 || this.tableP[i].taxes !== '' || this.tableP[i].annexno !== '') {
                    if (this.tableP[i].procurementdetails === ' ') {
                      this.tableP[i].procurementdetails = '';
                    }
                    if (this.tableP[i].accountcode == 'PJ121012' || this.tableP[i].accountcode == 'PJ134013') {
                      let letbudge = getDictionaryInfo(this.tableP[i].accountcode);
                      if (letbudge) {
                        this.tableP[i].budgetcoding = letbudge.value4;
                      }
                    }
                    this.baseInfo.purchasedetails.push(
                      {
                        purchasedetails_id: this.tableP[i].purchasedetails_id,
                        publicexpenseid: this.tableP[i].publicexpenseid,
                        invoicenumber: this.tableP[i].invoicenumber,
                        departmentname: this.tableP[i].departmentname,
                        budgetcoding: this.tableP[i].budgetcoding,
                        plsummary: this.tableP[i].plsummary,
                        accountcode: this.tableP[i].accountcode,
                        currency: this.tableP[i].currency,
                        currencyrate: this.tableP[i].currencyrate,
                        tormb: this.tableP[i].tormb,
                        purchasedetailsdate: this.tableP[i].purchasedetailsdate,
                        procurementdetails: this.tableP[i].procurementdetails,
                        subjectnumber: this.tableP[i].subjectnumber,
                        rmb: this.tableP[i].rmb,
                        foreigncurrency: this.tableP[i].foreigncurrency,
                        taxes: this.tableP[i].taxes,
                        annexno: this.tableP[i].annexno,
                      },
                    );
                  }
                }
                for (let i = 0; i < this.tableR.length; i++) {
                  if (this.tableR[i].otherdetailsdate !== '' || this.tableR[i].invoicenumber !== '' || this.tableR[i].costitem !== '' || this.tableR[i].departmentname !== '' || this.tableR[i].accountcode !== '' || this.tableR[i].subjectnumber !== '' || this.tableR[i].budgetcoding !== '' || this.tableR[i].remarks !== ''
                    || this.tableR[i].rmb > 0 || this.tableR[i].foreigncurrency > 0 || this.tableR[i].taxes !== '' || this.tableR[i].annexno !== '') {
                    if (this.tableR[i].accountcode == 'PJ116008' || this.tableR[i].accountcode == 'PJ130010') {
                      let letbudge = getDictionaryInfo(this.tableR[i].accountcode);
                      if (letbudge) {
                        this.tableR[i].budgetcoding = letbudge.value4;
                      }
                    }
                    this.baseInfo.otherdetails.push(
                      {
                        otherdetails_id: this.tableR[i].otherdetails_id,
                        publicexpenseid: this.tableR[i].publicexpenseid,
                        otherdetailsdate: this.tableR[i].otherdetailsdate,
                        invoicenumber: this.tableR[i].invoicenumber,
                        costitem: this.tableR[i].costitem,
                        departmentname: this.tableR[i].departmentname,
                        accountcode: this.tableR[i].accountcode,
                        plsummary: this.tableR[i].plsummary,
                        servicehours: this.tableR[i].servicehours,
                        currency: this.tableR[i].currency,
                        currencyrate: this.tableR[i].currencyrate,
                        tormb: this.tableR[i].tormb,
                        subjectnumber: this.tableR[i].subjectnumber,
                        budgetcoding: this.tableR[i].budgetcoding,
                        remarks: this.tableR[i].remarks,
                        rmb: this.tableR[i].rmb,
                        foreigncurrency: this.tableR[i].foreigncurrency,
                        taxes: this.tableR[i].taxes,
                        annexno: this.tableR[i].annexno,
                      },
                    );
                  }
                }
              }
              if (this.error_currency != 0) {
                this.activeName = 'third';
                Message({
                  message: this.$t('label.PFANS1012FORMVIEW_CHECKMESSAGE'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
              }
              let error = 0;
              //add-ws-6/16-禅道103
              if (!this.checkexpectedpaydate) {
                if (this.form.expectedpaydate === null || this.form.expectedpaydate === '') {
                  error = error + 1;
                  this.activeName = 'first';
                  Message({
                    message: this.$t('label.PFANS1012VIEW_CHECKEXPECTEDPAYDATE'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                } else {
                  if (moment(this.form.expectedpaydate).format('DD') != 15 && moment(this.form.expectedpaydate).format('DD') != 25) {
                    this.activeName = 'first';
                    Message({
                      message: this.$t('label.PFANS1012VIEW_CHECKEXPECTEDPAYDATE1'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                }
              }
              //add-ws-6/16-禅道103
              //add-ztc-10-19-禅道581 tableP采购费明细-start、
              for (let p = 0; p < this.tableP.length; p++) {
                if (this.tableP[p].foreigncurrency > 0) {
                  if (this.tableP[p].currency === '') {
                    this.activeName = 'third';
                    error = error + 1;
                    Message({
                      message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_CURRENCY'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    break;
                  }
                }
              }
              for (let r = 0; r < this.tableR.length; r++) {
                if (this.tableR[r].foreigncurrency > 0) {
                  if (this.tableR[r].currency === '') {
                    this.activeName = 'third';
                    error = error + 1;
                    Message({
                      message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_CURRENCY'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    break;
                  }
                }
              }
              //add-ztc-10-19-禅道581 tableP采购费明细-end、
              //ADD-WS-增加公共费用精算书check
              if (this.form.type === 'PJ001001') {
                for (let i = 0; i < this.tableT.length; i++) {
                  if (this.tableT[i].rmb > 0) {
                    if (this.tableT[i].budgetcoding === '') {
                      this.activeName = 'second';
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_BUDGET'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                    if (this.tableT[i].accountcode === '') {
                      this.activeName = 'second';
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_ACCOUNT'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                  }
                }
              } else if (this.form.type === 'PJ001002') {
                for (let i = 0; i < this.tableR.length; i++) {
                  if (this.tableR[i].rmb > 0) {
                    if (this.tableR[i].budgetcoding === '') {
                      this.activeName = 'third';
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_BUDGET'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                    //ADD_fjl_07/14 -- 禅道任务201（GL模块时，明细中的“PL摘要”和“科目”非必填项） start
                    if (this.form.moduleid !== 'PJ002002' && this.form.moduleid !== 'GL') {
                      if (this.tableR[i].accountcode === '') {
                        this.activeName = 'third';
                        error = error + 1;
                        Message({
                          message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_ACCOUNT'),
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        break;
                      }
                      if (this.tableR[i].plsummary === '') {
                        this.activeName = 'third';
                        error = error + 1;
                        Message({
                          message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_PL'),
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        break;
                      }
                    }
                    //ADD_fjl_07/14 -- 禅道任务201（GL模块时，明细中的“PL摘要”和“科目”非必填项） end
                  }
                }
                for (let i = 0; i < this.tableP.length; i++) {
                  if (this.tableP[i].rmb > 0) {
                    if (this.tableP[i].budgetcoding === '') {
                      this.activeName = 'third';
                      error = error + 1;
                      Message({
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_BUDGET'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                    //ADD_fjl_07/14 -- 禅道任务201（GL模块时，明细中的“PL摘要”和“科目”非必填项） start
                    if (this.form.moduleid !== 'PJ002002' && this.form.moduleid !== 'GL') {
                      if (this.tableP[i].accountcode === '') {
                        this.activeName = 'third';
                        error = error + 1;
                        Message({
                          message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_ACCOUNT'),
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        break;
                      }
                      if (this.tableP[i].plsummary === '') {
                        this.activeName = 'third';
                        error = error + 1;
                        Message({
                          message: this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_PL'),
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        break;
                      }
                    }
                    //ADD_fjl_07/14 -- 禅道任务201（GL模块时，明细中的“PL摘要”和“科目”非必填项） end
                  }
                }
              }

              //ADD-WS-增加公共费用精算书check
              if (this.form.type === 'PJ001002') {
                for (let j = 0; j < this.tableF.length; j++) {
                  let summoney = 0;
                  let sumMoney = 0;
                  let sumout = 0;
                  for (let i = 0; i < this.tableP.length; i++) {
                    if (this.tableP[i].purchasedetailsdate !== '' || this.tableP[i].procurementdetails !== '' || this.tableP[i].invoicenumber !== '' || this.tableP[i].departmentname !== '' || this.tableP[i].budgetcoding !== ''
                      || this.tableP[i].subjectnumber !== '' || this.tableP[i].rmb > 0 || this.tableP[i].foreigncurrency > 0 || this.tableP[i].taxes !== '' || this.tableP[i].annexno !== '') {
                      if (this.tableP[i].invoicenumber == this.tableF[j].invoicenumber) {
                        if (this.tableP[i].rmb != '0') {
                          summoney += Number(this.tableP[i].rmb);
                          continue;
                        }
                      }
                    }
                  }
                  for (let i = 0; i < this.tableR.length; i++) {
                    if (this.tableR[i].otherdetailsdate !== '' || this.tableR[i].invoicenumber !== '' || this.tableR[i].costitem !== '' || this.tableR[i].departmentname !== '' || this.tableR[i].accountcode !== '' || this.tableR[i].subjectnumber !== '' || this.tableR[i].budgetcoding !== '' || this.tableR[i].remarks !== ''
                      || this.tableR[i].rmb > 0 || this.tableR[i].foreigncurrency > 0 || this.tableR[i].taxes !== '' || this.tableR[i].annexno !== '') {
                      if (this.tableR[i].invoicenumber == this.tableF[j].invoicenumber) {
                        if (this.tableR[i].rmb != '0') {
                          sumMoney += Number(this.tableR[i].rmb);
                          continue;
                        }
                      }
                    }
                  }
                  //add_fjl_0816  添加四舍五入
                  sumout = (Number(summoney) + Number(sumMoney)).toFixed(2);
                  // if (Number(sumout) > 0) {
                  //   sumout = (Number(summoney) + Number(sumMoney)).toFixed(2);
                  // }
                  //add_fjl_0816  添加四舍五入
                  if (Number(sumout) != Number(this.tableF[j].invoiceamount)) {
                    error = error + 1;
                    this.activeName = 'first';
                    Message({
                      message: this.$t('label.PFANS1012FORMVIEW_MESSAGE'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    break;
                  }
                }
              }
              if (error == '0') {
                //add-ws-6/11-禅道任务090
                for (let i = 0; i < this.baseInfo.otherdetails.length; i++) {
                  this.baseInfo.otherdetails[i].servicehours = this.getworkinghours(this.baseInfo.otherdetails[i].servicehours);
                }
                //add-ws-6/11-禅道任务090
                if (this.IDname) {
                  this.loading = true;
                  this.baseInfo.publicexpense.publicexpenseid = this.IDname;
                  this.$store
                    .dispatch('PFANS1012Store/update', this.baseInfo)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      if (val !== 'update') {
                        Message({
                          message: this.$t('normal.success_02'),
                          type: 'success',
                          duration: 5 * 1000,
                        });
                        this.$router.push({
                          name: 'PFANS1012View',
                        });
                      }
                    })
                    .catch(error => {
                      this.$message.error({
                        message: error,
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      this.loading = false;
                    });
                } else {
                  this.loading = true;
                  this.$store
                    .dispatch('PFANS1012Store/insert', this.baseInfo)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      Message({
                        message: this.$t('normal.success_01'),
                        type: 'success',
                        duration: 5 * 1000,
                      });
                      this.$router.push({
                        name: 'PFANS1012View',
                      });
                    })
                    .catch(error => {
                      this.$message.error({
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

          },
        );
      }
    },
    updateSta() {
      this.baseInfo = {};
      this.baseInfo.publicexpense = [];
      this.baseInfo.trafficdetails = [];
      this.baseInfo.purchasedetails = [];
      this.baseInfo.otherdetails = [];
      this.baseInfo.invoice = [];
      this.form.user_id = this.userlist;
      this.form.user_name = this.namelist;
      if (this.form.tormb === undefined) {
        this.form.tormb = '';
      }
      this.form.moneys = Math.round((this.form.rmbexpenditure + this.form.tormb) * 100) / 100;
      this.form.reimbursementdate = moment(this.form.reimbursementdate).format('YYYY-MM-DD');
      this.baseInfo.publicexpense = JSON.parse(JSON.stringify(this.form));
      let sum = 0;
      for (let i = 0; i < this.tableF.length; i++) {
        sum += this.tableF[i].invoiceamount;
        if (this.tableF[i].invoicenumber !== '' || this.tableF[i].invoicetype !== '' || this.tableF[i].invoiceamount > 0 || this.tableF[i].taxrate !== ''
          || this.tableF[i].excludingtax > 0 || this.tableF[i].facetax > 0) {
          this.baseInfo.invoice.push(
            {
              invoice_id: this.tableF[i].invoice_id,
              publicexpenseid: this.tableF[i].publicexpenseid,
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
      this.invoiceamountsum = sum;
      if (this.form.type === 'PJ001001') {
        for (let i = 0; i < this.tableT.length; i++) {
          if (this.tableT[i].trafficdate !== '' || this.tableT[i].subjectnumber !== '' || this.tableT[i].departmentname !== '' || this.tableT[i].budgetcoding !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
            || this.tableT[i].rmb > 0 || this.tableT[i].annexno !== '') {
            this.baseInfo.trafficdetails.push(
              {
                trafficdetails_id: this.tableT[i].trafficdetails_id,
                publicexpenseid: this.tableT[i].publicexpenseid,
                trafficdate: this.tableT[i].trafficdate,
                accountcode: this.tableT[i].accountcode,
                plsummary: this.tableT[i].plsummary,
                departmentname: this.tableT[i].departmentname,
                budgetcoding: this.tableT[i].budgetcoding,
                subjectnumber: this.tableT[i].subjectnumber,
                region: this.tableT[i].region,
                vehicle: this.tableT[i].vehicle,
                startingpoint: this.tableT[i].startingpoint,
                rmb: this.tableT[i].rmb,
                annexno: this.tableT[i].annexno,
              },
            );
          }
        }
      } else if (this.form.type === 'PJ001002') {
        for (let i = 0; i < this.tableP.length; i++) {
          if (this.tableP[i].purchasedetailsdate !== '' || this.tableP[i].procurementdetails !== '' || this.tableP[i].invoicenumber !== '' || this.tableP[i].departmentname !== '' || this.tableP[i].budgetcoding !== ''
            || this.tableP[i].subjectnumber !== '' || this.tableP[i].rmb > 0 || this.tableP[i].foreigncurrency > 0 || this.tableP[i].taxes !== '' || this.tableP[i].annexno !== '') {
            if (this.tableP[i].procurementdetails === ' ') {
              this.tableP[i].procurementdetails = '';
            }
            this.baseInfo.purchasedetails.push(
              {
                purchasedetails_id: this.tableP[i].purchasedetails_id,
                publicexpenseid: this.tableP[i].publicexpenseid,
                invoicenumber: this.tableP[i].invoicenumber,
                departmentname: this.tableP[i].departmentname,
                budgetcoding: this.tableP[i].budgetcoding,
                plsummary: this.tableP[i].plsummary,
                accountcode: this.tableP[i].accountcode,
                currency: this.tableP[i].currency,
                currencyrate: this.tableP[i].currencyrate,
                tormb: this.tableP[i].tormb,
                purchasedetailsdate: this.tableP[i].purchasedetailsdate,
                procurementdetails: this.tableP[i].procurementdetails,
                subjectnumber: this.tableP[i].subjectnumber,
                rmb: this.tableP[i].rmb,
                foreigncurrency: this.tableP[i].foreigncurrency,
                taxes: this.tableP[i].taxes,
                annexno: this.tableP[i].annexno,
              },
            );
          }
        }
        for (let i = 0; i < this.tableR.length; i++) {
          if (this.tableR[i].otherdetailsdate !== '' || this.tableR[i].invoicenumber !== '' || this.tableR[i].costitem !== '' || this.tableR[i].departmentname !== '' || this.tableR[i].accountcode !== '' || this.tableR[i].subjectnumber !== '' || this.tableR[i].budgetcoding !== '' || this.tableR[i].remarks !== ''
            || this.tableR[i].rmb > 0 || this.tableR[i].foreigncurrency > 0 || this.tableR[i].taxes !== '' || this.tableR[i].annexno !== '') {
            this.baseInfo.otherdetails.push(
              {
                otherdetails_id: this.tableR[i].otherdetails_id,
                publicexpenseid: this.tableR[i].publicexpenseid,
                otherdetailsdate: this.tableR[i].otherdetailsdate,
                invoicenumber: this.tableR[i].invoicenumber,
                costitem: this.tableR[i].costitem,
                departmentname: this.tableR[i].departmentname,
                accountcode: this.tableR[i].accountcode,
                plsummary: this.tableR[i].plsummary,
                servicehours: this.tableR[i].servicehours,
                currency: this.tableR[i].currency,
                currencyrate: this.tableR[i].currencyrate,
                tormb: this.tableR[i].tormb,
                subjectnumber: this.tableR[i].subjectnumber,
                budgetcoding: this.tableR[i].budgetcoding,
                remarks: this.tableR[i].remarks,
                rmb: this.tableR[i].rmb,
                foreigncurrency: this.tableR[i].foreigncurrency,
                taxes: this.tableR[i].taxes,
                annexno: this.tableR[i].annexno,
              },
            );
          }
        }
      }
      //add-ws-6/11-禅道任务090
      for (let i = 0; i < this.baseInfo.otherdetails.length; i++) {
        this.baseInfo.otherdetails[i].servicehours = this.getworkinghours(this.baseInfo.otherdetails[i].servicehours);
      }
      //add-ws-6/11-禅道任务090
      this.loading = true;
      this.baseInfo.publicexpense.publicexpenseid = this.IDname;
      this.$store
        .dispatch('PFANS1012Store/update', this.baseInfo)
        .then(response => {
          this.data = response;
          this.loading = false;
          // if (val !== 'update') {
          //     Message({
          //         message: this.$t('normal.success_02'),
          //         type: 'success',
          //         duration: 5 * 1000,
          //     });
          //     this.$router.push({
          //         name: 'PFANS1012View',
          //     });
          // }
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
    //add 0728
    rowClickLoa(row) {
      //upd_fjl_0807 pop显示
      // this.urlparams = {'_id': row.loanapplication_id, 'disabled': false};
      // this.url = 'PFANS1006FormView';
      // this.$refs.PFANS1006Pop.open = true;
      this.$store.commit('global/SET_HISTORYURL', '');
      this.$store.commit('global/SET_WORKFLOWURL', '/FFFF1006FormView');
      this.$router.push({
        name: 'PFANS1006FormView',
        params: {
          _id: row.loanapplication_id,
          disabled: false,
          _checkid: this.IDname,
          _check: true,
          _fromname: 'PFANS1012FormView',
          _workflowurl1012: '1',//添加跳转时，是否显示流程信息的判断
        },
      });
      //upd_fjl_0807 pop显示
    },
    //add 0728

  },
};
</script>
<style rel="stylesheet/scss" lang="scss">


.dpSupIndex {
  .content {
    height: 34px;
    min-width: 80%;
    border: 0.1rem solid #ebeef5;
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
