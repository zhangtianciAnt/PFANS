<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading" :enableSave="enableSave"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:3vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_INFORMATION')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.center')">
                      <org :disabled="true"
                           :orglist="form.center_id"
                           @getOrgids="getCenterid"
                           orgtype="1"
                           style="width: 20vw"
                      ></org>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.group')">
                      <org :disabled="checkGro"
                           :orglist="form.group_id"
                           @getOrgids="getGroupId"
                           orgtype="2"
                           style="width: 20vw"
                      ></org>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.team')">
                      <org :disabled="true"
                           :orglist="form.team_id"
                           @getOrgids="getTeamid"
                           orgtype="3"
                           style="width: 20vw"
                      ></org>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--                <el-row>-->
                <!--                  <el-col :span="8">-->
                <!--                    <el-form-item :label="$t('label.center')">-->
                <!--                      <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>-->
                <!--                      <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.center_id"></el-input>-->
                <!--                    </el-form-item>-->
                <!--                  </el-col>-->
                <!--                  <el-col :span="8">-->
                <!--                    <el-form-item :label="$t('label.group')">-->
                <!--                      <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>-->
                <!--                      <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.group_id"></el-input>-->
                <!--                    </el-form-item>-->
                <!--                  </el-col>-->
                <!--                  <el-col :span="8">-->
                <!--                    <el-form-item :label="$t('label.team')">-->
                <!--                      <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>-->
                <!--                      <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.team_id"></el-input>-->
                <!--                    </el-form-item>-->
                <!--                  </el-col>-->
                <!--                </el-row>-->
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                      <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width:20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_TELEPHONE')" prop="telephone">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.telephone"
                                maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_MODULE')" v-show=flag>
                      <dicselect :code="code2"
                                 :data="form.moduleid"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getmodule"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <!--            <el-col :span="8">-->
                  <!--              <el-form-item :label="$t('label.judgement')" prop="judgement">-->
                  <!--                <el-select @change="change" clearable v-model="form.judgements"-->
                  <!--                           style="width: 20vw" :disabled="!disable">-->
                  <!--                  <el-option-->
                  <!--                    :key="item.value"-->
                  <!--                    :label="item.label"-->
                  <!--                    :value="item.value"-->
                  <!--                    v-for="item in options">-->
                  <!--                  </el-option>-->
                  <!--                </el-select>-->
                  <!--              </el-form-item>-->
                  <!--            </el-col>-->
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')">
                      <!--                <el-input :disabled="true" style="width:20vw" v-model="form.budgetunit" maxlength='50'></el-input>-->
                      <el-select clearable style="width: 20vw" v-model="form.budgetunit" :disabled="!disable"
                                 :placeholder="$t('normal.error_09')">
                        <el-option
                          v-for="item in options1"
                          :key="item.value"
                          :label="item.lable"
                          :value="item.value"
                          @change="changeBut">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :error="errorapplicationdate" :label="$t('label.application_date')"
                                  prop="application_date">
                      <el-date-picker
                        :disabled="!disable"
                        :error="errorapplicationdate"
                        style="width:20vw"
                        type="date"
                        v-model="form.application_date">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :error="errorreimbursement" :label="$t('label.PFANS1006FORMVIEW_REIMBURSEMENT')"
                                  prop="reimbursement">
                      <el-date-picker :disabled="!disable" :error="errorreimbursement" style="width:20vw"
                                      v-model="form.reimbursement">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1006FORMVIEW_CURRENCYCHOICE')" prop="currencychoice">
                      <!--                      add-ws-12/10-汇率字典-->
                      <!--                      <dicselect :code="code3"-->
                      <!--                                 :data="form.currencychoice"-->
                      <!--                                 :disabled="!disable"-->
                      <!--                                 :multiple="multiple"-->
                      <!--                                 @change="changecurrencychoice"-->
                      <!--                                 style="width:20vw">-->
                      <!--                      </dicselect>-->
                      <monthlyrate :month="month3"
                                   :data="form.currencychoice"
                                   :disabled="!disable"
                                   :multiple="multiple"
                                   @change="changecurrencychoice"
                                   style="width:20vw">
                      </monthlyrate>
                      <!--                      add-ws-12/10-汇率字典-->
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1004VIEW_AMOUNT')" prop="moneys">
                      <el-input-number v-model="form.moneys"
                                       controls-position="right"
                                       :disabled="!disable"
                                       :min="0"
                                       :max="maxcontrol"
                                       :precision="2"
                                       style="width:20vw"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <!--                  ADD_FJL_0819  添加区分-->
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1006FORMVIEW_DISTINGUISH')">
<!--                      UPD CCM 20210311 NT_PFANS_20210304_BUG_089 FR-->
<!--                      <el-radio-group @change="radioChange" v-model="form.publicradio">-->
<!--                        <el-radio label="1">{{$t('label.PFANS1006FORMVIEW_PUBLIC')}}</el-radio>-->
<!--                        <el-radio label="2">{{$t('label.PFANS1006FORMVIEW_DEDICATED')}}</el-radio>-->
<!--                      </el-radio-group>-->
                      <el-radio-group @change="radioChange" v-model="form.publicradio" :disabled="!disable">
                        <el-radio label="1">{{$t('label.PFANS1006FORMVIEW_PUBLIC')}}</el-radio>
                        <el-radio label="2">{{$t('label.PFANS1006FORMVIEW_DEDICATED')}}</el-radio>
                      </el-radio-group>
<!--                      UPD CCM 20210311 NT_PFANS_20210304_BUG_089 TO-->
                    </el-form-item>
                  </el-col>
                  <!--                  ADD_FJL_0819  添加区分-->
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012VIEW_ACCOUNTNUMBER')" prop="accountnumber" v-show=flag>
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.accountnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--add-ws-8/12-禅道任务446-->
                  <el-col :span="8" v-if="this.role2==='0'">
                    <el-form-item :label="$t('label.status')">
                      <el-select :disabled="acceptShow" :placeholder="$t('normal.error_09')" @change="prostatusChange"
                                 clearable
                                 style="width: 20vw" v-model="form.processingstatus">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in options2">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!--add-ws-8/12-禅道任务446-->
                  <!--add-fjl-0928-作废原因-->
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1006FORMVIEW_REASONVOID')" prop="reasonvoid" v-show="showvoid">
                      <el-input :disabled="acceptShow" style="width:20vw"
                                v-model="form.reasonvoid"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--add-fjl-0928-作废原因-->
                </el-row>

                <el-row>
                  <el-form-item :label="$t('label.PFANS1006FORMVIEW_ABSTRACT')" prop="remark">
                    <el-input :disabled="!disable" style="width:72vw" type="textarea" v-model="form.remark"
                              maxlength="20">
                    </el-input>
                  </el-form-item>
                </el-row>


                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.remarks')">
                      <el-input :disabled="!disable" :rows="4" type="textarea" style="width:72vw"
                                v-model="form.remarks">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-collapse v-model="active">
                  <el-collapse-item name="1">
                    <template slot="title">
                      <span class="collapse_Title">{{$t('label.PFANS1006FORMVIEW_PAYMENTMETHOD')}}</span>
                    </template>

                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1012VIEW_PAYMENTMETHOD')" prop="paymentmethod">
                          <dicselect :code="code4"
                                     :data="form.paymentmethod"
                                     :disabled="!disable"
                                     :multiple="multiple"
                                     @change="getPayment"
                                     style="width:20vw">
                          </dicselect>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :error="errorsuppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                      prop="suppliername" v-show="show8">
                          <div class="dpSupIndex" style="width: 20vw" prop="suppliername">
                            <el-container>
                              <input class="content bg" v-model="form.accountpayeename" :error="errorsuppliername"
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
                                      :data="gridData.filter(data => !search || data.accountpayeename.toLowerCase().includes(search.toLowerCase()))"
                                      height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                      @row-click="handleClickChange">
                                      <el-table-column property="accountpayeename"
                                                       :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                                       width="150"></el-table-column>
                                      <el-table-column property="payeename"
                                                       :label="$t('label.PFANS1012VIEW_PAYEENAME')"
                                                       width="150"></el-table-column>
                                      <el-table-column property="vendornum"
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
                        <el-form-item :label="$t('label.PFANS1012VIEW_PAYEENAME')" v-if="show9" prop="payeename">
                          <el-input :disabled="true" style="width:20vw" v-model="form.payeename"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')" v-if="show7" prop="payeecode">
                          <el-input :disabled="true" style="width:20vw"
                                    v-model="form.payeecode"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')" v-if="show1"
                                      prop="payeebankaccountnumber">
                          <el-input :disabled="true" style="width:20vw" v-model="form.payeebankaccountnumber"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')" v-if="show1"
                                      prop="payeebankaccount">
                          <el-input :disabled="true" style="width:20vw" v-model="form.payeebankaccount"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <!--                //add-ws-5/18-No70-增加收款人-->
                      <el-col :span="8">
                        <el-form-item :error="errorname" :label="$t('label.PFANS1006FORMVIEW_USERNAME')" v-if="show2">
                          <user :disabled="!disable" :error="errorname" :selectType="selectType" :userlist="namelist"
                                @getUserids="getUsernames" style="width: 20vw" v-model="form.user_name"></user>
                        </el-form-item>
                      </el-col>
                      <!--                //add-ws-5/18-No70-增加收款人-->
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1012VIEW_CAIWUPERSONALCODE')" v-if="show2" prop="name">
                          <el-input :disabled="true" style="width:20vw" v-model="form.name" maxlength="20"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="1" style="padding-left:1vw">
                        <img :src="png11">
                      </el-col>
                      <el-col :span="21" style="color: orange;padding-left:2vw;size: 1vw;font-size:0.9vw">
                        <label>
                          <span><b>{{this.warning}}</b><br/>{{this.warning1}}<br/>{{this.warning2}}<br/>{{this.warning3}}</span>
                        </label>
                      </el-col>
                    </el-row>
                    <el-row style="padding-top:1vw">
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS1006FORMVIEW_REASONFORDELAY')" prop="reasonfordelay">
                          <el-input :disabled="!disable" :rows="4" type="textarea" style="width:72vw"
                                    v-model="form.reasonfordelay">
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item>
                    <template slot="title">
                      <span class="collapse_Title"
                            style="margin-left:0.5%;color:#005BAA">{{$t('label.enclosure')}}</span>
                    </template>
                    <div style="margin-left:5%;margin-top:1%">
                      <el-row>
                        <!--                      UPD CCM 20210311 NT_PFANS_20210304_BUG_089 FR-->
<!--                        <el-upload-->
<!--                          :action="upload"-->
<!--                          :file-list="fileList"-->
<!--                          :on-remove="fileRemove"-->
<!--                          :on-preview="fileDownload"-->
<!--                          :on-success="fileSuccess"-->
<!--                          :on-error="fileError"-->
<!--                          class="upload-demo"-->
<!--                          drag-->
<!--                          ref="upload"-->
<!--                          v-model="form.uploadfile">-->
<!--                          <i class="el-icon-upload"></i>-->
<!--                          <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em>-->
<!--                          </div>-->
<!--                        </el-upload>-->
                        <el-upload
                          :action="upload"
                          :file-list="fileList"
                          :on-remove="fileRemove"
                          :on-preview="fileDownload"
                          :on-success="fileSuccess"
                          :on-error="fileError"
                          class="upload-demo"
                          drag
                          ref="upload"
                          v-model="form.uploadfile" :disabled="!disable">
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em>
                          </div>
                        </el-upload>
<!--                      UPD CCM 20210311 NT_PFANS_20210304_BUG_089 TO-->
                      </el-row>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_NUBERSGLJC')" name="second" v-if="showtab">
              <el-row>
                <el-table
                  :data="DataList"
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
                  <el-table-column
                    align="center"
                    prop="moneys"
                    :label="$t('label.PFANS1025VIEW_AWARDMONEY')"
                    width="280px">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="status"
                    :label="$t('label.PFANS5005VIEW_STATUS')"
                    width="280px">
                  </el-table-column>
                </el-table>
              </el-row>
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
  </div>
</template>
<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import dicselect from '../../../components/dicselect.vue';
  import {Message} from 'element-ui';
  import user from '../../../components/user.vue';
  import {
    getCurrentRole2,
    getCurrentRole5,
    getOrgInfo,
    getOrgInfoByUserId,
    getStatus,
    getUserInfo,
  } from '@/utils/customize';
  import moment from 'moment';
  import png11 from '@/assets/png/11.png';
  import {downLoadUrl, uploadUrl} from '../../../../utils/customize';
  import org from '../../../components/org';
  import PFANS1003Pop from '@/components/EasyPop/PFANS1003Pop';
  import PFANS1004Pop from '@/components/EasyPop/PFANS1004Pop';
  import PFANS1005Pop from '@/components/EasyPop/PFANS1005Pop';
  import PFANS1025Pop from '@/components/EasyPop/PFANS1025Pop';
  import PFANS3005Pop from '@/components/EasyPop/PFANS3005Pop';
  import PFANS1002Pop from '@/components/EasyPop/PFANS1002Pop';
  import PFANS1035Pop from '@/components/EasyPop/PFANS1035Pop';
  import PFANS1010Pop from '@/components/EasyPop/PFANS1010Pop';
  import monthlyrate from '../../../components/monthlyrate';

  export default {
    name: 'PFANS1006FormView',
    components: {
      monthlyrate,
      EasyNormalContainer,
      dicselect,
      user,
      org,
      PFANS1003Pop,
      PFANS1004Pop,
      PFANS1005Pop,
      PFANS1025Pop,
      PFANS3005Pop,
      PFANS1002Pop,
      PFANS1035Pop,
      PFANS1010Pop,
    },
    data() {
      var validatePayeecode = (rule, value, callback) => {
        //upd-ws-8/26-禅道bug65
        // this.regExp = /^[A-Za-z0-9]+$/;
        // if (this.form.payeecode !== null && this.form.payeecode !== '') {
        //   if (!this.regExp.test((value))) {
        //     callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')));
        //   } else {
        //     callback();
        //   }
        // } else {
        //   callback();
        // }
        if (this.show7) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')));
          }
        } else {
          callback();
        }
        //upd-ws-8/26-禅道bug65
      };
      // var validatePayeebankaccountnumber = (rule, value, callback) => {
      //   if (!value || value === '' || value === 'undefined') {
      //       callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')));
      //   } else {
      //     callback();
      //   }
      // };
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      var varreimbursement = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.rules.reasonfordelay[0].required = false;
          callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT')));
          this.error = this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT');
        } else {
          if (this.form.application_date !== null && this.form.application_date !== '') {
            if (moment(value).format('YYYY-MM-DD') < moment(this.form.application_date).format('YYYY-MM-DD')) {
              callback(new Error(this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT') + this.$t('normal.error_checkTime1') + this.$t('label.application_date')));
              this.errorreimbursement = this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT') + this.$t('normal.error_checkTime1') + this.$t('label.application_date');
            } else {
              callback();
              this.errorreimbursement = '';
            }
          }
          var startDate = new Date(moment(this.form.application_date).format('YYYY-MM-DD'));
          var endDate = new Date(moment(value).format('YYYY-MM-DD'));
          var days = (endDate - startDate) / (1000 * 60 * 60 * 24);
          if (days > 15) {
            this.rules.reasonfordelay[0].required = true;
          } else {
            this.rules.reasonfordelay[0].required = false;
          }
          callback();
          this.error = '';
        }
      };
      var validatejudgement = (rule, value, callback) => {
        if (!this.form.judgements || this.form.judgements === '' || this.form.judgements === 'undefined') {
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.judgement')));
        } else {
          return callback();
        }
      };
      var varapplication_date = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.rules.reasonfordelay[0].required = false;
        } else {
          if (this.form.reimbursement !== null && this.form.reimbursement !== '') {
            if (moment(value).format('YYYY-MM-DD') > moment(this.form.reimbursement).format('YYYY-MM-DD')) {
              callback(new Error(this.$t('label.application_date') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT')));
              this.errorapplicationdate = this.$t('label.application_date') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT');
            } else {
              callback();
              this.errorapplicationdate = '';
            }
          }
          var startDate = new Date(moment(value).format('YYYY-MM-DD'));
          var endDate = new Date(moment(this.form.reimbursement).format('YYYY-MM-DD'));
          var days = (endDate - startDate) / (1000 * 60 * 60 * 24);
          if (days > 15) {
            this.rules.reasonfordelay[0].required = true;
          } else {
            this.rules.reasonfordelay[0].required = false;
          }
          callback();
          this.error = '';
        }
      };
      return {
        url: '',
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 start
        //urlparams: '',
        urlparams: {},
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 end
        active: '1',
        activeName: 'first',
        showtab: true,
        checkGro: false,
        show10: true,
        show11: false,
        DataList: [{
          judgement_name: '',
          judgements_type: '',
          remarks: '',
          judgements_moneys: '',
        }],
        IDname: '',
        namelist: '',
        errorname: '',
        //add-ws-5/18-No70-增加收款人
        dialogTableVisible: false,
        show9: false,
        show8: false,
        show1: false,
        show7: false,
        errorsuppliername: '',
        options: [],
        options1: [],
        // add-ws-8/12-禅道任务446
        enableSave: false,
        role2: '',
        acceptShow: true,
        maxcontrol: 100000000,
        showvoid: false,
        options2: [
          {
            value: '0',
            label: this.$t('label.PFANS1006FORMVIEW_OPTIONS1'),
          },
          {
            value: '1',
            label: this.$t('label.PFANS1006FORMVIEW_OPTIONS2'),
          },
          {
            value: '2',
            label: this.$t('label.PFANS1006FORMVIEW_OPTIONS3'),
          },
        ],
        // add-ws-8/12-禅道任务446
        gridData: [],
        flag: false,
        role1: '',
        centerid: '',
        groupid: '',
        teamid: '',
        search: '',
        regExp: [],
        png11: png11,
        loading: false,
        pubLoan: 0,
        warning: this.$t('label.PFANS1006FORMVIEW_WARNING'),
        warning1: this.$t('label.PFANS1006FORMVIEW_WARNING1'),
        warning2: this.$t('label.PFANS1006FORMVIEW_WARNING2'),
        warning3: this.$t('label.PFANS1006FORMVIEW_WARNING3'),
        error: '',
        errorreimbursement: '',
        errorapplicationdate: '',
        selectType: 'Single',
        userlist: '',
        title: 'title.PFANS1006VIEW',
        buttonList: [],
        DataList2: [],
        show12: false,
        editableTabs: [],
        tabIndex: 0,
        multiple: false,
        form: {
          // add-ws-8/12-禅道任务446
          processingstatus: '0',
          // add-ws-8/12-禅道任务446
          reasonvoid: '',
          accountpayeename: '',
          judgements: '',
          judgements_name: '',
          judgements_type: '',
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          telephone: '',
          budgetunit: '',
          moduleid: '',
          accountnumber: '',
          reimbursement: '',
          currencychoice: '',
          moneys: '',
          remark: '',
          remarks: '',
          paymentmethod: '',
          payeename: '',
          payeecode: '',
          payeebankaccountnumber: '',
          payeebankaccount: '',
          name: '',
          accountpayeename: '',
          reasonfordelay: '',
          uploadfile: '',
          canafver: '0',
          application_date: moment(new Date()).format('YYYY-MM-DD'),
          publicradio: '2',//专用
        },
        currentRow: '',
        currentRow1: '',
        currentRow2: '',
        currentRow3: '',
        currentRow4: '',
        Codecheck: '',
        code1: 'PG001',
        code2: 'PJ002',
        //add-ws-12/10-汇率字典
        // code3: 'PG019',
        month3: moment(new Date()).format('YYYY-MM'),
        //add-ws-12/10-汇率字典
        code4: 'PJ015',
        show2: false,
        show3: false,
        menuList: [],
        upload: uploadUrl(),
        fileList: [],
        disabled: false,
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          telephone: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_TELEPHONE'),
            trigger: 'blur',
          }],
          reimbursement: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_REIMBURSEMENT'),
            trigger: 'change',
          },
            {validator: varreimbursement, trigger: 'change'},
          ],
          application_date: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.application_date'),
            trigger: 'change',
          },
            {validator: varapplication_date, trigger: 'change'},
          ],
          currencychoice: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1006FORMVIEW_CURRENCYCHOICE'),
            trigger: 'change',
          }],
          moneys: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_AMOUNT'),
            trigger: 'change',
          }],
          remark: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_ABSTRACT'),
            trigger: 'change',
          }],
          paymentmethod: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1012VIEW_PAYMENTMETHOD'),
            trigger: 'change',
          }],
          payeename: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEENAME'),
            trigger: 'change',
          }],
          payeecode: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_FOREIGNPAYEECODE'),
              trigger: 'change',
            },
            {validator: validatePayeecode, trigger: 'blur'}],
          payeebankaccountnumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKNUMBER'),
            trigger: 'change',
          },
          ],
          judgement: [{
            required: true,
            validator: validatejudgement,
            trigger: 'change',
          }],
          payeebankaccount: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT'),
            trigger: 'change',
          }],
          name: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_CAIWUPERSONALCODE'),
            trigger: 'change',
          }],
          accountpayeename: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEENAME'),
            trigger: 'change',
          }],
          reasonfordelay: [{
            required: false,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1006FORMVIEW_REASONFORDELAY'),
            trigger: 'change',
          }],
          //add_fjl_0929  报废原因
          reasonvoid: [{
            required: false,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1006FORMVIEW_REASONVOID'),
            trigger: 'change',
          }],
          //add_fjl_0929  报废原因
        },
        canStart: false,
        flowData: [],
        //add-ws-02/19-NT_PFANS_20210204_BUG_015-from
        checkids: '',
        fromname: '',
        //add-ws-02/19-NT_PFANS_20210204_BUG_015-to
      };
    },
    created() {
      //add-ws-02/19-NT_PFANS_20210204_BUG_015-from
      this.checkids = this.$route.params._checkid;
      this.fromname = this.$route.params._fromname;
      this.check = this.$route.params._check
      //add-ws-02/19-NT_PFANS_20210204_BUG_015-to
      // add-ws-8/12-禅道任务446
      //   alert(1 + this.$store.getters.workflowUrl)
      this.role2 = getCurrentRole5();
      // add-ws-8/12-禅道任务446
      //add_fjl_0815  添加1012画面跳转过来是否显示流程信息
      // if (this.$route.params._workflowurl1012 === undefined) {
      //     this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1006FormView');
      // }
      //add_fjl_0815  添加1012画面跳转过来是否显示流程信息
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        if (this.role2 === '0') {
          if (this.$route.params.statuss == this.$t('label.PFANS5004VIEW_OVERTIME')) {
            this.buttonList = [
              {
                key: 'save',
                name: 'button.save',
                disabled: false,
                icon: 'el-icon-check',
              },
            ];
            this.acceptShow = false;
            this.disable = !this.$route.params.disabled;
            this.enableSave = true;
          } else if (this.$route.params.statuss == this.$t('label.node_step4')) {
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
      }
    },
    mounted() {
      // alert(2 + this.$store.getters.workflowUrl)
      //add-ws-5/13-总务担当看到所有符合条件的数据，其他人看本身的而数据
      this.role1 = getCurrentRole2();
      //add-ws-5/13-总务担当看到所有符合条件的数据，其他人看本身的而数据
      this.getsupplierinfor();
      let userid = this.$store.getters.userinfo.userid;
      let groupid = getUserInfo(userid).userinfo.groupid;
      if (groupid === '91B253A1C605E9CA814462FB4C4D2605F43F') {
        this.flag = true;
      }
      this.IDname = this.$route.params._id;
      //add_fjl_0929  查询公共费用中的暂借款 start
      this.getpublice();
      //add_fjl_0929  查询公共费用中的暂借款 end
      if (this.IDname) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1006Store/getLoanapplicationOne', {'loanapplication_id': this.IDname})
          .then(response => {
            if (response !== undefined) {
              this.form = response;
              //add_fjl_0929  报废原因
              if (this.role2 === '0' && this.form.processingstatus === '2') {
                this.showvoid = true;
                this.rules.reasonvoid[0].required = true;
              }
              //add_fjl_0929  报废原因
              //决裁关联
              if (this.form.judgements != null && this.form.judgements != '' && this.form.judgements != undefined) {
                let judgement = this.form.judgements.split(',');
                let judgementname = this.form.judgements_name.split(',');
                let remarks = [];
                if (this.form.remarksdetail !== '' && this.form.remarksdetail !== null && this.form.remarksdetail !== undefined) {
                  remarks = this.form.remarksdetail.split('^');
                }
                //add_fjl_0806  添加摘要的判断
                for (let a = 0; a < remarks.length; a++) {
                  if (remarks[a] === 'null' || remarks[a] === 'undefined') {
                    remarks[a] = '';
                  }
                }
                //add_fjl_0806  添加摘要的判断
                let judgements_moneys = [];
                if (this.form.judgements_moneys !== '' && this.form.judgements_moneys !== null && this.form.judgements_moneys !== undefined) {
                  judgements_moneys = this.form.judgements_moneys.split(',');
                }
                let datalist = [];
                for (var i = 0; i < judgement.length; i++) {
                  for (var d = 0; d < judgementname.length; d++) {
                    if (i === d) {
                      let obj = {};
                      obj.judgement = judgement[i];
                      obj.judgement_name = judgementname[d];
                      obj.judgements_type = this.form.judgements_type;
                      obj.remarks = remarks[i];
                      obj.judgements_moneys = judgements_moneys[i];
                      datalist[i] = obj;
                    }
                  }
                }
                this.DataList = datalist;
              } else {
                this.showtab = false;
              }

              this.namelist = this.form.user_name;
              let rst = getOrgInfoByUserId(response.user_id);
              if (rst) {
                //upd_fjl_0927
                if (rst.groupId !== null && rst.groupId !== '' && rst.groupId !== undefined) {
                  this.checkGro = true;
                } else {
                  this.checkGro = false;
                }
                // this.centerid = rst.centerNmae;
                // this.groupid = rst.groupNmae;
                // this.teamid = rst.teamNmae;
                //upd_fjl_0927
              }
              this.userlist = this.form.user_id;
              if (this.form.paymentmethod === 'PJ015001') {
                this.show9 = true;
                this.show8 = true;
                this.show1 = true;
                this.show7 = true;
              } else if (this.form.paymentmethod === 'PJ015002') {
                this.show9 = false;
                this.show8 = false;
                this.show2 = true;
                this.show7 = false;
              } else if (this.form.paymentmethod === 'PJ015003') {
                this.show9 = true;
                this.show8 = true;
                this.show3 = true;
                this.show7 = true;
              }
              this.getBudt(this.form.group_id);
              if (this.form.uploadfile != '' && this.form.uploadfile != null && this.form.uploadfile != undefined) {
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
              if (this.disable) {
                this.show10 = true;
              } else {
                this.show10 = false;
              }
            }

            //采购业务数据流程查看详情
            this.$store
              .dispatch('PFANS1006Store/getworkfolwPurchaseData', {'loanapplication_id': this.IDname})
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
                  // if (response3["award"]!=undefined)
                  // {
                  //   let awlist = response3["award"].split(';');
                  //   let setawlist = new Set(awlist);
                  //   for (let i of setawlist)
                  //   {
                  //     let aw = i.split(',');
                  //     let statu = aw[1] === '4' ? 'normal.done' : (aw[1] === '2' ? 'normal.doing' : 'normal.todo')
                  //     this.flowData.push(
                  //       {
                  //         No:this.flowData.length + 1,
                  //         Name: '合同决裁',
                  //         Status: statu,
                  //         url: 'PFANS1047FormView',
                  //         params: {'_id':aw[0]}
                  //       })
                  //   }
                  // }
                  // if (response3["seal"]!=undefined)
                  // {
                  //   let seallist = response3["seal"].split(';');
                  //   let setseallist = new Set(seallist);
                  //   for (let i of setseallist)
                  //   {
                  //     let seal = i.split(',');
                  //     let statu = seal[1] === '3' ? 'normal.done' : (seal[1] === '2' ? 'normal.doing' : 'normal.todo')
                  //     this.flowData.push(
                  //       {
                  //         No:this.flowData.length + 1,
                  //         Name: '印章申请',
                  //         Status: statu,
                  //         url: 'PFANS4001FormView',
                  //         params: {'_id':seal[0]}
                  //       })
                  //   }
                  // }
                  if (response3['loanApplication'] != undefined) {
                    let loanapplist = response3['loanApplication'].split(';');
                    let setloanapplist = new Set(loanapplist);
                    for (let i of setloanapplist) {
                      let loanapp = i.split(',');
                      let statu = loanapp[1] === '4' ? 'normal.done' : (loanapp[1] === '2' ? 'normal.doing' : 'normal.todo');
                      this.flowData.push(
                        {
                          No: this.flowData.length + 1,
                          Name: '暂借款申请',
                          Status: statu,
                          url: 'PFANS1006FormView',
                          params: {'_id': loanapp[0]},
                        });
                    }
                  }
                  // if (response3["publicExpense"]!=undefined)
                  // {
                  //   let publist = response3["publicExpense"].split(';');
                  //   let setpublist = new Set(publist);
                  //   for (let i of setpublist)
                  //   {
                  //     let pub = i.split(',');
                  //     let statu = pub[1] === '4' ? 'normal.done' : (pub[1] === '2' ? 'normal.doing' : 'normal.todo')
                  //     this.flowData.push(
                  //       {
                  //         No:this.flowData.length + 1,
                  //         Name: '公共费用精算',
                  //         Status: statu,
                  //         url: 'PFANS1012FormView',
                  //         params: {'_id':pub[0]}
                  //       })
                  //   }
                  // }
                  this.$emit('showPop', this.flowData);
                }
              });
            //采购业务数据流程查看详情
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
        this.show10 = true;
        this.namelist = this.$store.getters.userinfo.userid;
        this.userlist = this.$store.getters.userinfo.userid;
        if (getUserInfo(this.$store.getters.userinfo.userid)) {
          this.form.name = this.$store.getters.userinfo.userinfo.caiwupersonalcode;
          this.Codecheck = this.$store.getters.userinfo.userinfo.caiwupersonalcode;
        }
        let num = getUserInfo(this.$store.getters.userinfo.userid).userinfo.extension;
        if (num) {
          this.form.telephone = num;
        }
        if (this.userlist !== null && this.userlist !== '') {
          this.form.user_id = this.$store.getters.userinfo.userid;
          // if (getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)) {
          //   this.form.budgetunit = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
          // }
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            // this.form.group_id = rst.groupId;
            this.form.team_id = rst.teamId;
            //add_fjl_0927
            if (rst.groupId !== null && rst.groupId !== '' && rst.groupId !== undefined) {
              this.form.group_id = rst.groupId;
              this.getBudt(this.form.group_id);
              this.checkGro = true;
            } else {
              this.checkGro = false;
            }
            //add_fjl_0927
          }

          if (this.$route.params._judgement != null && this.$route.params._judgement != '' && this.$route.params._judgement != undefined) {
            let _judgement = this.$route.params._judgement.substring(0, this.$route.params._judgement.length - 1);
            let _judgement_name = this.$route.params._judgement_name.substring(0, this.$route.params._judgement_name.length - 1);

            //决裁关联
            let judgement = _judgement.split(',');
            let judgementname = _judgement_name.split(',');
            let remarks = [];
            if (this.$route.params._remarks !== '' && this.$route.params._remarks !== null && this.$route.params._remarks !== undefined) {
              let _remarks = this.$route.params._remarks.substring(0, this.$route.params._remarks.length - 1);
              remarks = _remarks.split('^');
              //add_fjl_0806  添加摘要的判断
              for (let a = 0; a < remarks.length; a++) {
                if (remarks[a] === 'null' || remarks[a] === 'undefined') {
                  remarks[a] = '';
                }
              }
              //add_fjl_0806  添加摘要的判断
              this.form.remarksdetail = _remarks;
            }
            let judgements_moneys = [];
            if (this.$route.params._judgements_moneys !== '' && this.$route.params._judgements_moneys !== null && this.$route.params._judgements_moneys !== undefined) {
              let _judgements_moneys = this.$route.params._judgements_moneys.substring(0, this.$route.params._judgements_moneys.length - 1);
              judgements_moneys = _judgements_moneys.toString().split(',');
              this.form.judgements_moneys = _judgements_moneys;
            }
            this.form.judgements = _judgement;
            this.form.judgements_name = _judgement_name;
            this.form.judgements_type = this.$route.params._judgements_type;
            let datalist = [];
            for (var i = 0; i < judgement.length; i++) {
              for (var d = 0; d < judgementname.length; d++) {
                if (i === d) {
                  let obj = {};
                  obj.judgement = judgement[i];
                  obj.judgement_name = judgementname[d];
                  obj.judgements_type = this.$route.params._judgements_type;
                  obj.remarks = remarks[i];
                  obj.judgements_moneys = judgements_moneys[i];
                  datalist[i] = obj;
                }
              }
            }
            this.DataList = datalist;
            let muchmoneys = 0;
            for (var m = 0; m < judgements_moneys.length; m++) {
              muchmoneys = (muchmoneys - 0) + (judgements_moneys[m] - 0);
            }
            this.form.moneys = muchmoneys;
            this.form.remarks = remarks[0];
          } else {
            this.showtab = false;
          }
        }
      }
    },
    methods: {
      //add_fjl_0927
      getCenterid(val) {
        this.form.center_id = val;
      },
      getGroupId(val) {
        this.form.group_id = val;
        this.form.budgetunit = '';
        this.getBudt(val);
      },
      getTeamid(val) {
        this.form.team_id = val;
      },
      //add_fjl_0927
      //add-ws-5/18-No70-增加收款人
      getUsernames(val) {
        if (val === '') {
          this.form.name = '';
          this.Codecheck = '';
        } else {
          this.form.name = getUserInfo(val).userinfo.caiwupersonalcode;
        }
        this.namelist = val;
        this.form.user_name = val;
        if (!this.form.user_name || this.form.user_name === '' || typeof val == 'undefined') {
          this.errorname = this.$t('normal.error_08') + this.$t('label.PFANS1012FORMVIEW_PERPOR');
        } else {
          this.errorname = '';
        }
      },
//add-ws-5/18-No70-增加收款人
      getBudt(val) {
        this.options1 = [];
        if (val === '' || val === null) {
          return;
        }
        //ADD_FJL  修改人员预算编码
        // if (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
        let butinfo = getOrgInfo(val).encoding;
        let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
        if (dic.length > 0) {
          for (let i = 0; i < dic.length; i++) {
            if (butinfo === dic[i].value1) {
              this.options1.push({
                lable: dic[i].value2 + '_' + dic[i].value3,
                value: dic[i].code,
              });
            }
          }
        }
        // }
        //ADD_FJL  修改人员预算编码
      },
      changeBut(val) {
        this.form.budgetunit = val;
      },
      submit() {
        let val = this.currentRow;
        let val1 = this.currentRow1;
        let val2 = this.currentRow2;
        let val3 = this.currentRow3;
        let val4 = this.currentRow4;
        this.dialogTableVisible = false;
        this.form.accountpayeename = val;
        this.form.payeename = val1;
        this.form.payeecode = val2;
        this.form.payeebankaccountnumber = val3;
        this.form.payeebankaccount = val4;
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
      handleClickChange(val) {
        this.currentRow = val.accountpayeename;
        this.currentRow1 = val.payeename;
        this.currentRow2 = val.suppliercode;
        this.currentRow3 = val.payeebankaccountnumber;
        this.currentRow4 = val.payeebankaccount;
      },
      getsupplierinfor() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6003Store/getsupplierinfor2')
          .then(response => {
            this.gridData = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              vote.accountpayeename = response[i].supchinese;
              vote.payeename = response[i].payeename;
              vote.suppliercode = response[i].suppliercode;
              vote.payeebankaccountnumber = response[i].payeebankaccountnumber;
              vote.payeebankaccount = response[i].payeebankaccount;
              this.gridData.push(vote);
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
      //add_fjl_0929  添加公共费用中暂借款查询 start
      getpublice() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1006Store/getpublice', {'loanapplication_id': this.IDname})
          .then(response => {
            this.pubLoan = response.length;
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
      //add_fjl_0929  添加公共费用中暂借款查询 end
      getUserids(val) {
        this.form.user_id = val;
        if (val === '') {
          this.form.code = '';
          this.Codecheck = '';
        } else {
          this.form.code = getUserInfo(val).userinfo.caiwupersonalcode;
          this.Codecheck = getUserInfo(val).userinfo.caiwupersonalcode;
        }
        let rst = getOrgInfoByUserId(val);
        // valif (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
        //   this.form.budgetunit = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
        // }
        if (rst) {
          this.centerid = rst.centerNmae;
          this.groupid = rst.groupNmae;
          this.teamid = rst.teamNmae;
          this.form.center_id = rst.centerId;
          this.form.group_id = rst.groupId;
          this.form.team_id = rst.teamId;
        } else {
          this.centerid = '';
          this.groupid = '';
          this.teamid = '';
          this.form.center_id = '';
          this.form.group_id = '';
          this.form.team_id = '';
        }
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      getmodule(val) {
        this.form.moduleid = val;
      },
      //ADD_FJL_0819  添加区分
      radioChange(val) {
        this.form.publicradio = val;
        if (val == '1') {
          this.maxcontrol = 100000000;
        } else {
          if (this.surloappmoney != 0) {
            this.maxcontrol = this.surloappmoney;
            if (this.form.moneys > this.surloappmoney) {
              this.form.moneys = this.maxcontrol;
            }
          }
        }
      },
      //ADD_FJL_0819  添加区分
      changecurrencychoice(val) {
        this.form.currencychoice = val;
      },
      //add_fjl_0929  处理状态
      prostatusChange(val) {
        this.rules.reasonvoid[0].required = false;
        this.showvoid = false;
        this.form.processingstatus = val;
        this.form.reasonvoid = '';
        if (val === '2') {
          this.showvoid = true;
          this.rules.reasonvoid[0].required = true;
        }
      },
      //add_fjl_0929  处理状态
      getPayment(val) {
        this.form.paymentmethod = val;
        if (val === 'PJ015001') {
          this.show7 = true;
          this.show9 = true;
          this.show8 = true;
          this.show1 = true;
          this.show2 = false;
          this.show3 = false;
          this.form.payeename = '';
          this.form.payeecode = '';
          this.form.payeebankaccountnumber = '';
          this.form.payeebankaccount = '';
          this.form.name = '';
          this.namelist = '';
          this.form.accountpayeename = '';
          this.rules.name[0].required = false;
          this.rules.accountpayeename[0].required = false;
          this.rules.payeename[0].required = true;
          this.rules.payeecode[0].required = true;
          this.rules.payeebankaccountnumber[0].required = true;
          this.rules.payeebankaccount[0].required = true;
        } else if (val === 'PJ015002') {
          this.form.name = this.Codecheck;
          this.show7 = false;
          this.show9 = false;
          this.show8 = false;
          this.show1 = false;
          this.show2 = true;
          this.show3 = false;
          this.form.accountpayeename = '';
          this.form.payeename = '';
          this.form.payeecode = '';
          this.form.payeebankaccountnumber = '';
          this.form.payeebankaccount = '';
          this.namelist = this.$store.getters.userinfo.userid;
          this.rules.name[0].required = true;
          this.rules.accountpayeename[0].required = false;
          this.rules.payeename[0].required = false;
          this.rules.payeecode[0].required = false;
          this.rules.payeebankaccountnumber[0].required = false;
          this.rules.payeebankaccount[0].required = false;
        } else if (val === 'PJ015003') {
          this.show7 = true;
          this.show9 = true;
          this.show8 = true;
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          this.form.name = '';
          this.form.payeename = '';
          this.form.payeecode = '';
          this.namelist = '';
          this.form.accountpayeename = '';
          this.form.payeebankaccountnumber = '';
          this.form.payeebankaccount = '';
          this.rules.accountpayeename[0].required = true;
          this.rules.name[0].required = false;
          this.rules.payeename[0].required = true;
          this.rules.payeecode[0].required = true;
          this.rules.payeebankaccountnumber[0].required = false;
          this.rules.payeebankaccount[0].required = false;
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      // start() {
      //   this.form.status = '2';
      //   this.buttonClick('update');
      // },
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('update');
      },
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1001FormView',
          params: {
            title: 6,
          },
        });
      },
      //add-fjl-0816-暂借款中，点击决裁，跳转画面
      //upd-ws-02/19-NT_PFANS_20210204_BUG_015-from
      // checkparams() {
      //   let id = this.$route.params._checkid;
      //   let fromname = this.$route.params._fromname;
      //   //add_fjl_0828  流程信息查不到横展开
      //   if (fromname === 'PFANS3005FormView') {
      //     this.$store.commit('global/SET_WORKFLOWURL', '/PFANS3005View');
      //   } else if (fromname === 'PFANS1013FormView') {
      //     this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1013View');
      //   } else if (fromname === 'PFANS1012FormView') {
      //     this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1012View');
      //   } else {
      //     this.$store.commit('global/SET_WORKFLOWURL', '/' + fromname);
      //   }
      //   //add_fjl_0828  流程信息查不到横展开
      //   this.$router.push({
      //     name: fromname,
      //     params: {
      //       disabled: true,
      //       _id: id,
      //     },
      //   });
      // },
      checkparams() {
        //add_fjl_0828  流程信息查不到横展开
        if (this.fromname === 'PFANS3005FormView') {
          this.$store.commit('global/SET_WORKFLOWURL', '/PFANS3005View');
        } else if (this.fromname === 'PFANS1013FormView') {
          this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1013View');
        } else if (this.fromname === 'PFANS1012FormView') {
          this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1012View');
        } else {
          this.$store.commit('global/SET_WORKFLOWURL', '/' + this.fromname);
        }
        //add_fjl_0828  流程信息查不到横展开
        this.$router.push({
          name: this.fromname,
          params: {
            disabled: true,
            _id: this.checkids,
          },
        });
      },
      //upd-ws-02/19-NT_PFANS_20210204_BUG_015-to
      //add-fjl-0816-暂借款中，点击决裁，跳转画面
      buttonClick(val) {
        if (val === 'back') {
          //add-fjl-0816-暂借款中，点击决裁，跳转画面
          //upd-ws-02/19-NT_PFANS_20210204_BUG_015-from
          // if (this.$route.params._check != null && this.$route.params._check!= '' && this.$route.params._check!= undefined) {
          //   if (this.$route.params._check) {
          //     this.checkparams();
          //   }
          // } else {
          //   this.paramsTitle();
          // }
          if (this.check != null && this.check!= '' && this.check!= undefined) {
            if (this.check) {
              this.checkparams();
            }
          } else {
            this.paramsTitle();
          }
          //upd-ws-02/19-NT_PFANS_20210204_BUG_015-from
          //add-fjl-0816-暂借款中，点击决裁，跳转画面
        } else {
          this.$refs['refform'].validate(valid => {
            if (valid) {
              //add_fjl_0929  暂借款在公共费用中使用，不可作废 start
              if (this.showvoid && this.pubLoan !== 0) {
                Message({
                  message: this.$t('label.PFANS1006FORMVIEW_VOIDERROR'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
              }
              //add_fjl_0929  暂借款在公共费用中使用，不可作废 end
              // if (this.form.paymentmethod === 'PJ015001') {
              //   this.form.name = '';
              // } else if (this.form.paymentmethod === 'PJ015002') {
              //   this.form.payeename = '';
              //   this.form.payeecode = '';
              //   this.form.payeebankaccountnumber = '';
              //   this.form.payeebankaccount = '';
              //   this.form.accountpayeename = '';
              // } else if (this.form.paymentmethod === 'PJ015003') {
              //   this.form.name = '';
              //   this.form.payeename = '';
              //   this.form.payeecode = '';
              //   this.form.payeebankaccountnumber = '';
              //   this.form.payeebankaccount = '';
              // }
              this.form.user_name = this.namelist;
              this.form.reimbursement = moment(this.form.reimbursement).format('YYYY-MM-DD');
              this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
              let error = 0;
              if (this.form.moneys === 0) {
                error = error + 1;
                Message({
                  message: this.$t('label.PFANS1025VIEW_AWARDMONEY') + this.$t('label.PFANS1004FORMVIEW_ERROR'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              }
              if (error === 0) {
                if (this.IDname) {
                  this.loading = true;
                  this.form.loanapplication_id = this.IDname;
                  this.$store
                    .dispatch('PFANS1006Store/updateLoanapplication', this.form)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      if (val !== 'update') {
                        Message({
                          message: this.$t('normal.success_02'),
                          type: 'success',
                          duration: 5 * 1000,
                        });
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
                  this.loading = true;
                  this.$store
                    .dispatch('PFANS1006Store/createLoanapplication', this.form)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      Message({
                        message: this.$t('normal.success_01'),
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
      rowclick(row, event, column) {
        this.DataList2 = [];
        this.loading = true;
        this.$store
          .dispatch('PFANS1012Store/getpublicelist', {'publicexpenseid': row.judgement})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              if (response[i].status !== null && response[i].status !== '') {
                response[i].status = getStatus(response[i].status);
              }
              this.DataList2.push({
                moneys: response[i].moneys,
                invoiceno: response[i].invoiceno,
                status: response[i].status,
              });
            }
            this.show12 = true;
            this.loading = false;
          }).catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
      },
      viewdata(row) {
        //upd_fjl_0807 pop显示
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
        // this.$store.commit('global/SET_HISTORYURL', '');
        // this.$store.commit('global/SET_WORKFLOWURL', '/FFFFF1047FormView');
        if (row.judgement_name.substring(0, 2) === 'JC') {
          this.url = 'PFANS1004FormView';
          this.$refs.PFANS1004Pop.open = true;
          // this.$router.push({
          //   name: 'PFANS1004FormView',
          //   params: {
          //     _checkdisable: this.disable,
          //     _checkid: this.IDname,
          //     _check1: true,
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
          //     _check2: true,
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
          //     _check3: true,
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
          //     _check4: true,
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
          //     _checkdisable: false,
          //     _checkid: this.IDname,
          //     _check5: true,
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
          //     _check6: true,
          //     _id: row.judgement,
          //     disabled: false,
          //   },
          // });
        } else if (row.judgement_name.substring(0, 1) === 'C' && row.judgements_type === this.$t('title.PFANS1002VIEW')) {
          this.url = 'PFANS1002FormView';
          this.$refs.PFANS1002Pop.open = true;
          //   this.$router.push({
          //   name: 'PFANS1002FormView',
          //   params: {
          //     _checkdisable: this.disable,
          //     _checkid: this.IDname,
          //     _check7: true,
          //     _id: row.judgement,
          //     disabled: false,
          //   },
          // });
        } else if (row.judgement_name.substring(0, 1) === 'C' && row.judgements_type === this.$t('title.PFANS1035VIEW')) {
          this.url = 'PFANS1035FormView';
          this.$refs.PFANS1035Pop.open = true;
          //   this.$router.push({
          //   name: 'PFANS1035FormView',
          //   params: {
          //     _checkdisable: this.disable,
          //     _checkid: this.IDname,
          //     _check8: true,
          //     _id: row.judgement,
          //     disabled: false,
          //   },
          // });
        }
        //upd_fjl_0807 pop显示
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
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
