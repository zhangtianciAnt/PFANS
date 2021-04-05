<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         :enableSave="enableSave"
                         @StartWorkflow="buttonClick"
                         :defaultStart="defaultStart"
                         @buttonClick="buttonClick"
                         @end="end" @start="start"
                         @workflowState="workflowState"
                         @disabled="setdisabled"
                         ref="container"
                         :workflowCode="workflowCode"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vm" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1025VIEW_FIRSTDETAILS')" name="first">
              <div>
                <el-row></el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')">
                      <dicselect :code="code1"
                                 :data="form.contracttype"
                                 :disabled="true"
                                 :multiple="multiple"
                                 @change="getcontracttype"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENTRUSTJAPANESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.custojapanese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENTRUSTCHINESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.custochinese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENPLACEJAPANESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.placejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENPLACECHINESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.placechinese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_DEPLOYMENT')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.deployment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.pjnamejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.pjnamechinese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_OPENINGDATE')">
                      <el-date-picker
                        v-model="form.claimdatetimeStart"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENDDATE')">
                      <el-date-picker
                        v-model="form.claimdatetimeEnd"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYDATE')">
                      <el-date-picker :disabled="true" style="width:20vw" v-model="form.deliverydate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')">
                      <!--                      add-ws-12/10-汇率字典-->
                      <!--                      <dicselect :code="code3"-->
                      <!--                                 :data="form.currencyposition"-->
                      <!--                                 :disabled="true"-->
                      <!--                                 :multiple="multiple"-->
                      <!--                                 @change="getcurrencyformat"-->
                      <!--                                 style="width:20vw">-->
                      <!--                      </dicselect>-->
                      <monthlyrate :month="month3"
                                   :data="form.currencyposition"
                                   :disabled="true"
                                   :multiple="multiple"
                                   @change="getcurrencyformat"
                                   style="width:20vw">
                      </monthlyrate>
                      <!--                      add-ws-12/10-汇率字典-->
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.claimamount"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableS" header-cell-class-name="sub_bg_color_blue" stripe border style="width: 80vw"
                            @selection-change="handleSelectionChange">
                    <!--                    add-ws-9/25-禅道567-->
                    <el-table-column type="selection" width="55"
                                     :selectable="selectInit"></el-table-column>
                    <!--                    add-ws-9/25-禅道567-->
                    <el-table-column :label="$t('label.PFANS1024VIEW_NUMBER')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.claimtype">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" width="170">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model="scope.row.deliverydate"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" width="150"
                                     prop="member">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model="scope.row.completiondate"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model="scope.row.claimdate"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" width="150"
                                     prop="outsource">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model="scope.row.supportdate"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model="scope.row.claimamount"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')" align="center" width="300">
                      <template slot-scope="scope">
                        <el-input :disabled="true" v-model="scope.row.remarksqh" style="width:13vw">
                        </el-input>
                      </template>
                    </el-table-column>

                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1025VIEW_SECONDDETAILS')" name="second">
              <div>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1008FORMVIEW_INITIATOR')" :error="error" prop="user_id">
                      <user :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width:20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_TELEPHONE')" prop="telephone">
                      <el-input :disabled="true" style="width:20vw" v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025FORMVIEW_DRAFTINGDATE')">
                      <el-date-picker
                        v-model="form.draftingdate"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025FORMVIEW_SCHEDULEDDATE')">
                      <el-date-picker
                        v-model="form.scheduleddate"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_EXTRINSIC')">
                      <span style="margin-right: 1rem ">{{$t('label.no')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.extrinsic"
                        active-value="1"
                        inactive-value="0">
                      </el-switch>
                      <span style="margin-left: 1rem ">{{$t('label.yes')}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_EQUIPMENT')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.equipment"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_COMMDEPARTMENT')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.commdepartment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_COMMISSION')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.commission"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--add-ws-7/17-禅道116任务-->
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_POLICYCONTRACT')">
                      <el-select v-model="form.policycontract_id" :disabled="!disable" style="width: 20vw" clearable
                                 @change="getpolicycontract">
                        <el-option
                          v-for="item in optionsdata"
                          :key="item.value"
                          :label="item.lable"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <!--                      add-ws-7/27-禅道154任务-->
                      <el-button @click="clickBun" size="small" type="primary"
                                 :disabled="this.form.policycontract_id?false:true">{{this.$t('button.view')}}
                      </el-button>
                      <!--                      add-ws-7/27-禅道154任务-->
                    </el-form-item>
                  </el-col>
                  <!--add-ws-7/17-禅道116任务-->
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1004VIEW_CAREERPLAN')" prop="careerplan">
                      <span>{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.plan"
                        active-value="1"
                        inactive-value="0">
                      </el-switch>
                      <span>{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                      <!-- <el-select @change="changePlan" style="width: 20vw" v-model="form.plan">
                         <el-option :label="$t('label.PFANS1004VIEW_INSIDE')" :value="$t('label.PFANS1004VIEW_INSIDE')"></el-option>
                         <el-option :label="$t('label.PFANS1004VIEW_OUTER')" :value="$t('label.PFANS1004VIEW_OUTER')"></el-option>
                       </el-select>-->

                      <!--                      <dicselect :code="code4"-->
                      <!--                                 :data="form.plan"-->
                      <!--                                 :disabled="!disable"-->
                      <!--                                 :multiple="multiple"-->
                      <!--                                 @change="getplan"-->
                      <!--                                 style="width:20vw">-->
                      <!--                      </dicselect>-->
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_VALUATION')">
                      <dicselect :code="code2"
                                 :data="form.valuation"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getvaluation"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_INDIVIDUAL')">
                      <dicselect :code="code2"
                                 :data="form.individual"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getindividual"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PLANNUMBER')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.plannumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_VALUATIONNUMBER')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.valuationnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CONTRACTNUMBER')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>-->
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')">
                      <el-input :disabled="!disable" style="width:70vw" v-model="form.remarks"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-table :data="tableT" :summary-method="getTsummaries"
                        border
                        show-summary
                        header-cell-class-name="sub_bg_color_blue" stripe>
                <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="150">
                  <template slot-scope="scope">
                    <!--                    <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.budgetcode">-->
                    <!--                    </el-input>-->
                    <el-select clearable style="width: 100%" v-model="scope.row.budgetcode" :disabled="!disable"
                               :placeholder="$t('normal.error_09')" :no="scope.row" @change="getBudgetunit">
                      <el-option
                        v-for="item in scope.row.options1"
                        :key="item.value"
                        :label="item.lable"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_DEPART')" align="center" width="170"
                                 :error="errorgroup" prop="depart">
                  <template slot-scope="scope">
                    <org :orglist="scope.row.depart"
                         orgtype="1"
                         :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                         :error="errorgroup"
                         style="width: 9rem"
                         :no="scope.row"
                         @getOrgids="getGroupId"></org>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5008VIEW_PROGRAM')" align="center" width="150">
                  <template slot-scope="scope">
                    <project :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                             style="width: 100%" :data="scope.row.projects" :no="scope.row"
                             @change="changePro">
                    </project>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5008VIEW_PROGRAM')" align="center" width="600">
                  <el-table-column :label="$t('label.PFANS1025VIEW_MEMBER')" align="center" width="150" prop="member"
                                   v-if="checkdisable">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.member"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1025VIEW_COMMUNITY')" align="center" width="150"
                                   v-if="checkdisable">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.community"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1025VIEW_OUTSOURCE')" align="center" width="150"
                                   prop="outsource">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.outsource"
                        @change="changeSum(scope.row)"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1025VIEW_OUTCOMMUNITY')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.outcommunity"
                        @change="changeSum(scope.row)"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_WORKNUMBER')" align="center" prop="worknumber"
                                 width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="true"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.worknumber"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_AWARDMONEY')" align="center" prop="awardmoney"
                                 width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?!disable:true"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.awardmoney"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                      @click.native.prevent="deleteRow(scope.$index, tableT)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                      @click="addRow()"
                      plain
                      size="small"
                      type="primary"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <!--            //add-ws-添加上传附件功能-->
            <el-tab-pane :label="$t('label.PFANS2022VIEW_UPDATINGFILES')" prop="enclosurecontent" name="thrid">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.enclosure')" :error="errorfile">
                    <el-upload
                      :action="upload"
                      :disabled="!disable"
                      :file-list="fileList"
                      :on-error="fileError"
                      :on-preview="fileDownload"
                      :on-remove="fileRemove"
                      :on-success="fileSuccess"
                      :on-change="filechange"
                      class="upload-demo"
                      drag
                      ref="upload"
                      v-model="form.uploadfile">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em>
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <!--            //add-ws-添加上传附件功能-->
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
    <PFANS1045Pop :params="urlparams" ref="PFANS1045Pop" :url="url"></PFANS1045Pop>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import {getCurrentRole} from '@/utils/customize';
  import moment from 'moment';
  import org from '../../../components/org';
  import project from '../../../components/project';
  import {
    getMonthlyrateInfo,
    getDictionaryInfo,
    getOrgInfo,
    getOrgInfoByUserId,
    downLoadUrl,
    getUserInfo,
    uploadUrl,
  } from '@/utils/customize';
  import PFANS1045Pop from '@/components/EasyPop/PFANS1045Pop';
  import monthlyrate from '../../../components/monthlyrate';

  export default {
    name: 'PFANS1025FormView',
    components: {
      monthlyrate,
      PFANS1045Pop,
      EasyNormalContainer,
      user,
      org,
      dicselect,
      project,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.user_name');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
        } else {
          this.error = '';
          return callback();
        }
      };
      var checkuploadfile = (rule, value, callback) => {
        if (!this.form.uploadfile || this.form.uploadfile === '' || this.form.uploadfile === 'undefined') {
          this.errorfile = this.$t('normal.error_16') + this.$t('label.enclosure');
          return callback(new Error(this.$t('normal.error_16') + this.$t('label.enclosure')));
        } else {
          this.errorfile = '';
          return callback();
        }
      };
      return {
        //add-ws-9/25-禅道567
        listjudgement: [],
        multipleSelection: '',
        //add-ws-9/25-禅道567
        url: 'PFANS1045FormView',
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 start
        //urlparams: '',
        urlparams: {},
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 end
        //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
        defaultStart: false,
        //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
        enableSave: true,
        //add-ws-添加上传附件功能-
        fileList: [],
        upload: uploadUrl(),
        //add-ws-添加上传附件功能-
        checkdisable: false,
        budgetcodingcheck: '',
        activeName: 'first',
        disabled: true,
        error: '',
        errorfile: '',
        userlist: '',
        code1: 'HT014',
        code2: 'HT005',
        //add-ws-12/10-汇率字典
        // code3: 'PG019',
        month3: moment(new Date()).format('YYYY-MM'),
        //add-ws-12/10-汇率字典
        code4: 'HT018',
        errorgroup: '',
        selectType: 'Single',
        loading: false,
        title: 'title.PFANS1025VIEW',
        multiple: false,
        orglist: '',
        workflowCode: 'W0056',
        baseInfo: {},
        // add-ws-7/17-禅道116任务
        optionsdata: [],
        modifiedamount: 0,
        numbers: '',
        // add-ws-7/17-禅道116任务
        form: {
          // add-ws-7/17-禅道116任务
          policycontract_id: '',
          dates: '',
          // add-ws-7/17-禅道116任务
          uploadfile: '',
          investorspeopor: '',
          membercost: '',
          numbermoth: '',
          draftingdate: '',
          scheduleddate: '',
          contractnumber: '',
          contracttype: '',
          custojapanese: '',
          custochinese: '',
          placejapanese: '',
          placechinese: '',
          deployment: '',
          pjnamejapanese: '',
          pjnamechinese: '',
          claimdatetimeStart: '',
          claimdatetimeEnd: '',
          deliverydate: '',
          currencyposition: '',
          claimamount: '',
          remarksqh: '',
          user_id: '',
          extrinsic: '',
          equipment: '',
          telephone: '',
          commdepartment: '',
          commission: '',
          plan: '',
          valuation: '',
          individual: '',
          plannumber: '',
          valuationnumber: '',
          remarks: '',
          maketype: '',
        },
        tableS: [],
        tableT: [{
          budgetcode: this.$t('label.PFANS1025FORMVIEW_CHECKERROR'),
          depart: '',
          member: '',
          community: '',
          outsource: '',
          outcommunity: '',
          worknumber: '',
          awardmoney: '',
          rowindex: '',
        }, {
          awarddetail_id: '',
          award_id: '',
          // add-lyt-21/3/16-NT_PFANS_20210226_BUG_030-start
          budgetcode:this.$t('label.PFANS1025FORMVIEW_DETAIL'),
          // add-lyt-21/3/16-NT_PFANS_20210226_BUG_030-end
          depart: '',
          member: '',
          community: '',
          outsource: '',
          outcommunity: '',
          worknumber: '',
          awardmoney: '',
          rowindex: '',
        }],
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
          enclosurecontent: [{
            required: true,
            validator: checkuploadfile,
            trigger: 'change',
          }],
          // telephone: [{
          //   required: true,
          //   message: this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_TELEPHONE'),
          //   trigger: 'change'
          // }],
        },
        buttonList: [],
        //add_fjl_0911 禅道任务515横展开 出现多条重复数据的问题
        params_id: '',
        //add_fjl_0911 禅道任务515横展开 出现多条重复数据的问题
      };
    },
    mounted() {
      this.loading = true;
      //add_fjl_0911 禅道任务515横展开 出现多条重复数据的问题
      this.params_id = this.$route.params._id;
      //add_fjl_0911 禅道任务515横展开 出现多条重复数据的问题
      if (this.params_id) {
        this.$store
          .dispatch('PFANS1025Store/selectById', {'award_id': this.params_id})
          .then(response => {
            if (response.award != null) {
              this.form = response.award;
              //add-ws-契约种类value1值处理
              // if (this.form.contracttype !== null && this.form.contracttype !== '') {
              //   let letContracttype = getDictionaryInfo(this.form.contracttype);
              //   if (letContracttype != null) {
              //     this.form.contracttype = letContracttype.value1;
              //   }
              // }
              //add-ws-契约种类value1值处理
              // let roleLC = getCurrentRole();
              //  if(roleLC == '2' || roleLC == '3') { //GM Center
              //   this.workflowCode = 'W0004'//新流程
              // }else { //TL 正式员工
              //   this.workflowCode = 'W0056'
              // }
              if (getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)) {
                this.budgetcodingcheck = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
              }
              if (this.$store.getters.userinfo.userid) {
                this.form.telephone = getUserInfo(this.$store.getters.userinfo.userid).userinfo.extension;
              }
              this.form.draftingdate = moment(new Date()).format('YYYY-MM-DD');
              var myDate = new Date();
              myDate.setDate(myDate.getDate() + 2);
              this.form.scheduleddate = moment(myDate).format('YYYY-MM-DD');
              if (this.form.claimdatetime !== '' && this.form.claimdatetime !== null) {
                this.form.claimdatetimeStart = this.form.claimdatetime.slice(0, 10);
                this.form.claimdatetimeEnd = this.form.claimdatetime.slice(this.form.claimdatetime.length - 10);
              }
              //add-ws-添加上传附件功能
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
              //add-ws-添加上传附件功能
              if (response.awardDetail.length > 0) {
                let check = 0;
                let data = [];
                for (let i = 0; i < response.awardDetail.length; i++) {
                  if (response.awardDetail[i].budgetcode === this.$t('label.PFANS1025FORMVIEW_CHECKERROR')) {
                    check = check + 1;
                    break;
                  }
                }
                if (check === 0) {
                  this.tableT.push({
                    budgetcode: this.$t('label.PFANS1025FORMVIEW_CHECKERROR'),
                    depart: '',
                    member: '',
                    community: '',
                    outsource: '',
                    outcommunity: '',
                    worknumber: '',
                    awardmoney: '',
                    rowindex: '',
                  });
                  this.tableT = data.concat(response.awardDetail);
                } else {
                  this.tableT = response.awardDetail;
                }
                for (var i = 0; i < this.tableT.length; i++) {
                  this.orglist = this.tableT[i].depart;
                  if (this.tableT[i].depart !== '' && this.tableT[i].depart !== null && this.tableT[i].depart !== undefined) {
                    //ADD_FJL
                    this.tableT[i].options1 = [];
                    let butinfo = getOrgInfo(this.tableT[i].depart).encoding;
                    let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                    if (dic.length > 0) {
                      for (let j = 0; j < dic.length; j++) {
                        if (butinfo === dic[j].value1) {
                          this.tableT[i].options1.push({
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
              let mamount = 0;
              if (response.numbercounts.length > 0) {

                for (let i = 0; i < response.numbercounts.length; i++) {
                  let letCurrencyposition = getMonthlyrateInfo(response.numbercounts[i].currencyposition);
                  if (letCurrencyposition != null) {
                    response.numbercounts[i].currencyposition = letCurrencyposition.currencyname;
                  }
                  let deliverydate = response.numbercounts[i].deliverydate;
                  let completiondate = response.numbercounts[i].completiondate;
                  let claimdate = response.numbercounts[i].claimdate;
                  let supportdate = response.numbercounts[i].supportdate;

                  if (deliverydate !== '' && deliverydate != null) {
                    response.numbercounts[i].deliverydate = moment(deliverydate).format('YYYY-MM-DD');
                  }
                  if (completiondate !== '' && completiondate != null) {
                    response.numbercounts[i].completiondate = moment(completiondate).format('YYYY-MM-DD');
                  }
                  if (claimdate !== '' && claimdate != null) {
                    response.numbercounts[i].claimdate = moment(claimdate).format('YYYY-MM-DD');
                  }
                  if (supportdate !== '' && supportdate != null) {
                    response.numbercounts[i].supportdate = moment(supportdate).format('YYYY-MM-DD');
                  }
                  mamount += parseFloat(response.numbercounts[i].claimamount);
                }
              }

              this.tableS = response.numbercounts;
              this.form.claimamount = mamount;
              this.userlist = this.form.user_id;
              // add-ws-7/17-禅道116任务
              if (this.form.dates != null && this.form.dates != '') {
                this.policycontractlist();
              }
              // add-ws-7/17-禅道116任务
              this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.awardDetail = JSON.parse(JSON.stringify(this.tableT));
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
      // else {
      //   this.userlist = this.$store.getters.userinfo.userid;
      //   if (this.userlist !== null && this.userlist !== '') {
      //     let lst = getUserInfo(this.$store.getters.userinfo.userid);
      //     if (lst) {
      //       this.form.telephone = lst.userinfo.extension;
      //     }
      //   }
      // }
    },
    created() {
      //upd-ws-9/25-禅道567
      if (!this.$route.params.disabled) {
        if (this.$route.params._status === this.$t('label.PFANS5004VIEW_OVERTIME')) {
          this.buttonList = [
            {
              key: 'generate',
              name: 'button.generate',
              //add-lyt-21/3/11-NT_PFANS_20210226_BUG_031-start
              disabled: false,
              //add-lyt-21/3/11-NT_PFANS_20210226_BUG_031-end
            },
            {
              key: 'actuarial',
              name: 'button.actuarial',
              disabled: false,
            },
          ];
        } else if (this.$route.params._status === this.$t('label.PFANS1032FORMVIEW_LOADINGSEAL')) {
          this.buttonList = [
            //add-lyt-21/3/11-NT_PFANS_20210226_BUG_031-start
            // {
            //   key: 'generate',
            //   name: 'button.generate',
            //   disabled: true,
            // },
            //add-lyt-21/3/11-NT_PFANS_20210226_BUG_031-end
            {
              key: 'actuarial',
              name: 'button.actuarial',
              disabled: true,
            },
          ];
        } else {
          this.buttonList = [
            //add-lyt-21/3/11-NT_PFANS_20210226_BUG_031-start
            // {
            //   key: 'generate',
            //   name: 'button.generate',
            //   disabled: false,
            // },
            //add-lyt-21/3/11-NT_PFANS_20210226_BUG_031-end
            {
              key: 'actuarial',
              name: 'button.actuarial',
              disabled: true,
            },
          ];
        }
      } else {
        if (this.$route.params._status === this.$t('label.PFANS5004VIEW_OVERTIME')) {
          this.buttonList = [
            {
              key: 'save',
              name: 'button.save',
              disabled: true,
            },
            {
              key: 'actuarial',
              name: 'button.actuarial',
              disabled: false,
            },
          ];
        } else if (this.$route.params._status === this.$t('label.PFANS1032FORMVIEW_LOADINGSEAL')) {
          this.buttonList = [
            {
              key: 'save',
              name: 'button.save',
              disabled: true,
            },
            {
              key: 'actuarial',
              name: 'button.actuarial',
              disabled: true,
            },
          ];
        } else {
          this.buttonList = [
            {
              key: 'save',
              name: 'button.save',
              disabled: false,
            },
            {
              key: 'actuarial',
              name: 'button.actuarial',
              disabled: true,
            },
          ];
        }
      }
      //upd-ws-9/25-禅道567
      this.disable = this.$route.params.disabled;
    },
    methods: {
//add-ws-9/25-禅道567
      selectInit(row, index) {
        return row;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
//add-ws-9/25-禅道567
      // add-ws-7/17-禅道116任务
      clickBun() {
        if (this.form.policycontract_id !== '' && this.form.policycontract_id !== null && this.form.policycontract_id !== undefined) {
          this.urlparams = {'_id': this.form.policycontract_id};
          this.$refs.PFANS1045Pop.open = true;
        }
      },
      getpolicycontract(val) {
        this.form.policycontract_id = val;
        for (let item of this.optionsdata) {
          if (item.value === val) {
            this.modifiedamount = item.moneys;
            this.numbers = item.lable;
          }
        }
      },
      policycontractlist() {
        let parameter = {
          outsourcingcompany: this.form.custochinese,
          information: this.form.dates,
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS1006Store/getpolicycontract', parameter)
          .then(response => {
              for (let i = 0; i < response.length; i++) {
                this.optionsdata.push({
                  value: response[i].policycontract_id,
                  lable: response[i].policynumbers,
                  moneys: response[i].modifiedamount,
                });
              }
              //DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
              // if (this.optionsdata.length > 0) {
              //   this.getpolicycontract(this.optionsdata[0].value);
              // }
              //DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
              this.loading = false;
            },
          ).catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
      },
      // add-ws-7/17-禅道116任务
      //add-ws-4/17-审批过程中数据可编辑问题修改
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disable = val;
        }
      },
      //add-ws-4/17-审批过程中数据可编辑问题修改
      //add-ws-添加上传附件功能-
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
      filechange(file, fileList) {
        this.$refs.reff.validateField('enclosurecontent');
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
      //add-ws-添加上传附件功能-
      getBudgetunit(val, row) {
        row.budgetcode = val;
      },
      changePro(val, row) {
        row.projects = val;
      },
      changeSum(row) {
        row.worknumber = row.outsource;
        row.awardmoney = row.outsource * row.outcommunity;
      },
      getplan(val) {
        this.form.plan = val;
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        if (!this.form.user_id || this.form.user_id === '' || typeof val == 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.user_name');
        } else {
          this.error = '';
        }
      },
      getcontracttype(val) {
        this.form.contracttype = val;
      },
      getcurrencyformat(val) {
        this.form.currencyposition = val;
      },
      getextrinsic(val) {
        this.form.extrinsic = val;
      },
      getvaluation(val) {
        this.form.valuation = val;
      },
      getindividual(val) {
        this.form.individual = val;
      },
      //修改人员预算编码
      getGroupId(orglist, row) {
        row.depart = orglist;
        //ADD_FJL
        row.options1 = [];
        row.budgetcode = '';
        let butinfo = getOrgInfo(row.depart).encoding;
        let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
        if (dic.length > 0) {
          for (let i = 0; i < dic.length; i++) {
            if (butinfo === dic[i].value1) {
              row.options1.push({
                lable: dic[i].value2 + '_' + dic[i].value3,
                value: dic[i].code,
              });
            }
          }
        }
        //ADD_FJL  修改人员预算编码
        // let group = getOrgInfo(orglist);
        // if (group) {
        //   row.budgetcode = group.encoding;
        // }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
        this.buttonClick2();
        //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
      },
      //upd 审批流程 fr
      // start(val) {
      //   this.form.status = '2';
      //   this.buttonClick("update");
      // },
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
        this.buttonClick2();
        //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
      },
      //upd 审批流程 to
      end() {
        this.form.status = '0';
        //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
        this.buttonClick2();
        //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
      },
      //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
      buttonClick2(val) {
        this.form.maketype = '7',
          this.baseInfo = {};
        this.baseInfo.groupN = this.$store.getters.orgGroupList;
        this.form.user_id = this.userlist;
        if (this.form.claimdatetimeStart !== '' && this.form.claimdatetimeEnd !== '') {
          this.form.claimdatetime = moment(this.form.claimdatetimeStart).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.claimdatetimeEnd).format('YYYY-MM-DD');
        }

        this.loading = true;
        this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
        this.baseInfo.awardDetail = [];
        for (let i = 0; i < this.tableT.length; i++) {
          if (this.tableT[i].budgetcode !== '' || this.tableT[i].depart !== '' || this.tableT[i].member > '0' || this.tableT[i].community > '0'
            || this.tableT[i].outsource > '0' || this.tableT[i].outcommunity > '0' || this.tableT[i].worknumber > '0' || this.tableT[i].awardmoney > '0') {
            this.baseInfo.awardDetail.push({
              awarddetail_id: this.tableT[i].awarddetail_id,
              award_id: this.tableT[i].award_id,
              budgetcode: this.tableT[i].budgetcode,
              depart: this.tableT[i].depart,
              member: this.tableT[i].member,
              projects: this.tableT[i].projects,
              community: this.tableT[i].community,
              outsource: this.tableT[i].outsource,
              outcommunity: this.tableT[i].outcommunity,
              worknumber: this.tableT[i].worknumber,
              awardmoney: this.tableT[i].awardmoney,
              rowindex: this.tableT[i].rowindex,
            });
          }
        }
        this.baseInfo.award.award_id = this.params_id;
        this.$store
          .dispatch('PFANS1025Store/update', this.baseInfo)
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
      },
      //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableT = [{
            budgetcode: '',
            depart: '',
            member: '',
            community: '',
            outsource: '',
            outcommunity: '',
            worknumber: '',
            awardmoney: '',
          }];
        }
      },
      addRow() {
        this.tableT.push({
          awarddetail_id: '',
          award_id: '',
          budgetcode: '',
          depart: '',
          member: '',
          community: '',
          outsource: '',
          outcommunity: '',
          worknumber: '',
          awardmoney: '',
          rowindex: '',
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
            if (index == 1) {
              sums[index] = '--';
            }
            if (index == 2) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 4) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 6) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 7) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--';
          }
        });
        return sums;
      },
      changePlan(val) {
        this.form.plan = val;
      },
      checkparams() {
        let id = this.$route.params._checkid;
        let disable = this.$route.params._checkdisable;
        this.$router.push({
          name: 'PFANS1006FormView',
          params: {
            disabled: disable,
            _id: id,
          },
        });
      },
      //add-ws-4/28-精算中，点击决裁，跳转画面
      checkparamsTitle() {
        let id = this.$route.params._checkid;
        let disable = this.$route.params._checkdisable;
        this.$router.push({
          name: 'PFANS1012FormView',
          params: {
            disabled: disable,
            _id: id,
          },
        });
      },
      // add-ws-7/17-禅道116任务
      checkparamsname() {
        let contractnumber = this.$route.params._contractnumber;
        this.$router.push({
          name: 'PFANS1001FormView',
          params: {
            check: contractnumber,
            title: 12,
          },
        });
      },
      // add-ws-7/17-禅道116任务
      //add-ws-6/22-禅道152任务
      checkparams() {
        let id = this.$route.params.check_id;
        let disable = this.$route.params._checkdisable;
        this.$router.push({
          name: 'PFANS1024FormView',
          params: {
            disabled: disable,
            _id: id,
          },
        });
      },
      //add-ws-6/22-禅道152任务
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1025View',
        });
      },
      //add-ws-4/28-精算中，点击决裁，跳转画面
      buttonClick(val) {
        this.form.maketype = '7',
          this.baseInfo = {};
        this.baseInfo.groupN = this.$store.getters.orgGroupList;
        this.form.user_id = this.userlist;
        if (this.form.claimdatetimeStart !== '' && this.form.claimdatetimeEnd !== '') {
          this.form.claimdatetime = moment(this.form.claimdatetimeStart).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.claimdatetimeEnd).format('YYYY-MM-DD');
        }
        if (val === 'back') {
          //add-ws-4/28-精算中，点击决裁，跳转画面
          if (this.$route.params._check != null && this.$route.params._check != '' && this.$route.params._check != undefined) {
            if (this.$route.params._check) {
              this.checkparamsTitle();
            }
          } else if (this.$route.params._checkname != null && this.$route.params._checkname != '' && this.$route.params._checkname != undefined) {
            if (this.$route.params._checkname) {
              this.checkparams();
            }
          } else if (this.$route.params.checkname != null && this.$route.params.checkname != '' && this.$route.params.checkname != undefined) {
            if (this.$route.params.checkname) {
              this.checkparamsname();
            }
          } else if (this.$route.params._check4 != null && this.$route.params._check4 != '' && this.$route.params._check4 != undefined) {
            if (this.$route.params._check4) {
              this.checkparams2();
            }
          } else {
            this.paramsTitle();
          }
          //add-ws-4/28-精算中，点击决裁，跳转画面
        } else if (val === 'generate') {
          this.baseInfo.awardDetail = [];
          let sumoutsource = 0;
          let sumworknumber = 0;
          let sumawardmoney = 0;
          for (let i = 0; i < this.tableT.length; i++) {
            if (this.tableT[i].budgetcode !== '' || this.tableT[i].depart !== '' || this.tableT[i].member > '0' || this.tableT[i].community > '0'
              || this.tableT[i].outsource > '0' || this.tableT[i].outcommunity > '0' || this.tableT[i].worknumber > '0' || this.tableT[i].awardmoney > '0') {
              sumoutsource += this.tableT[i].outsource;
              sumworknumber += this.tableT[i].worknumber;
              sumawardmoney += this.tableT[i].awardmoney;
              this.baseInfo.awardDetail.push({
                awarddetail_id: this.tableT[i].awarddetail_id,
                award_id: this.tableT[i].award_id,
                budgetcode: this.tableT[i].budgetcode,
                depart: this.tableT[i].depart,
                member: this.tableT[i].member,
                projects: this.tableT[i].projects,
                community: this.tableT[i].community,
                outsource: this.tableT[i].outsource,
                outcommunity: this.tableT[i].outcommunity,
                worknumber: this.tableT[i].worknumber,
                awardmoney: this.tableT[i].awardmoney,
                rowindex: this.tableT[i].rowindex,
              });
            }
          }
          //add-ws-将画面没有用到的字段给模板合计值赋值
          this.form.investorspeopor = sumoutsource;
          this.form.membercost = sumworknumber;
          this.form.numbermoth = sumawardmoney;
          //add-ws-将画面没有用到的字段给模板合计值赋值
          this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
          this.loading = true;
          let user = getUserInfo(this.form.user_id);
          if (user) {
            this.form.user_id = user.userinfo.customername;
          }
          this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
          this.$store
            .dispatch('PFANS1025Store/generateJxls', this.baseInfo)
            .then(response => {
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
          //add-ws-9/25-禅道567
        } else if (val === 'actuarial') {
          if (this.multipleSelection.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          let checktableD = '';
          this.listjudgement = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
            let sealtypeList = this.form.contractnumber + this.multipleSelection[i].claimtype;
            checktableD = checktableD + sealtypeList + ',';
            var vote = {};
            vote.value = this.params_id;
            vote.label = this.form.contractnumber + this.multipleSelection[i].claimtype;
            vote.remarks = this.multipleSelection[i].remarksqh;
            if (this.multipleSelection[i].remarksqh == '' || this.multipleSelection[i].remarksqh == null) {
              vote.remarks = '';
            } else {
              vote.remarks = this.multipleSelection[i].remarksqh;
            }
            vote.judgements_moneys = this.multipleSelection[i].claimamount;
            if (this.$i18n) {
              vote.judgements_type = this.$t('label.PFANS1012VIEW_CHECKLIST');
            }
            this.listjudgement.push(vote);
          }
          let img = checktableD.substring(0, checktableD.length - 1);
          if (this.form.statuspublic !== null && this.form.statuspublic !== '') {
            let public1 = img.split(',');
            let public2 = this.form.statuspublic.split(',');
            let check = 0;
            for (let i = 0; i < public1.length; i++) {
              for (let a = 0; a < public2.length; a++) {
                if (public1[i] === public2[a]) {
                  check = check + 1;
                  break;
                }
              }
            }
            let letstaff = this.form.statuspublic.split(',');
            let length = '';
            let lengths = '';
            for (let b = 0; b < letstaff.length; b++) {
              lengths = letstaff[b].substring(letstaff[b].length - 3, letstaff[b].length),
                length = length + lengths + ',';
            }
            let imgss = length.substring(0, length.length - 1);
            if (check != 0) {
              Message({
                message: imgss + this.$t('label.PFANS1025VIEW_SEALCHECK3'),
                type: 'info',
                duration: 5 * 1000,
              });
              return;
            }
          }
          this.$store.commit('global/SET_HISTORYURL', '');
          this.$router.push({
            name: 'PFANS1012FormView',
            params: {
              _name: this.listjudgement,
              _type: 'PJ001002',
              disabled: true,
              backcheck: true,
              _paramsid: this.params_id,
            },
          });
        } else {
          //add-ws-9/25-禅道567
          this.$refs['reff'].validate(valid => {
              if (valid) {
                this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
                this.baseInfo.award.award_id = this.params_id;
                this.baseInfo.awardDetail = [];
                for (let i = 0; i < this.tableT.length; i++) {
                  if (this.tableT[i].budgetcode !== '' || this.tableT[i].depart !== '' || this.tableT[i].member > '0' || this.tableT[i].community > '0'
                    || this.tableT[i].outsource > '0' || this.tableT[i].outcommunity > '0' || this.tableT[i].worknumber > '0' || this.tableT[i].awardmoney > '0') {
                    this.baseInfo.awardDetail.push({
                      awarddetail_id: this.tableT[i].awarddetail_id,
                      award_id: this.tableT[i].award_id,
                      budgetcode: this.tableT[i].budgetcode,
                      depart: this.tableT[i].depart,
                      member: this.tableT[i].member,
                      projects: this.tableT[i].projects,
                      community: this.tableT[i].community,
                      outsource: this.tableT[i].outsource,
                      outcommunity: this.tableT[i].outcommunity,
                      worknumber: this.tableT[i].worknumber,
                      awardmoney: this.tableT[i].awardmoney,
                      rowindex: this.tableT[i].rowindex,
                    });
                  }
                }
                this.loading = true;
                if (this.modifiedamount != 0) {
                  if (this.form.claimamount > this.modifiedamount) {
                    this.$store
                      .dispatch('PFANS1025Store/update', this.baseInfo)
                      .then(response => {
                        Message({
                          message: this.$t('label.PFANS1025FROMVIEW_MODIFIEDAMOUNTCHECK'),
                          type: 'error',
                          duration: 1 * 1000,
                        });
                        this.loading = false;
                        setTimeout(() => {
                          this.$router.push({
                            name: 'PFANS1045View',
                            params: {
                              check: this.numbers,
                            },
                          });
                        }, 1500);
                        return;
                      })
                      .catch(error => {
                        Message({
                          message: error,
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        this.loading = false;
                      });
                    return;
                  }
                }
//UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
//               this.$store
//                 .dispatch('PFANS1025Store/checkby', this.baseInfo)
//                 .then(response => {
//                   if (response.length == 1) {
//                     if (this.params_id) {     //郛冶ｾ�
//                       this.$store
//                         .dispatch('PFANS1025Store/update', this.baseInfo)
//                         .then(response => {
//                           this.data = response;
//                           this.loading = false;
//                           Message({
//                             message: this.$t('normal.success_02'),
//                             type: 'success',
//                             duration: 5 * 1000,
//                           });
//                           //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修
//                           if (val === 'StartWorkflow') {
//                             this.$refs.container.$refs.workflow.startWorkflow();
//                           } else {
//                             this.paramsTitle();
//                           }
//                           //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
//                         })
//                         .catch(error => {
//                           Message({
//                             message: error,
//                             type: 'error',
//                             duration: 5 * 1000,
//                           });
//                           this.loading = false;
//                         });
//                     }
//                   } else {
//                     if (this.form.policycontract_id) {
//                       Message({
//                         message: this.$t('label.PFANS1025VIEW_CHECKCYCEL'),
//                         type: 'error',
//                         duration: 5 * 1000,
//                       });
//                       this.loading = false;
//                     } else {
//                       if (this.params_id) {     //郛冶ｾ�
//                         this.$store
//                           .dispatch('PFANS1025Store/update', this.baseInfo)
//                           .then(response => {
//                             this.data = response;
//                             this.loading = false;
//                             Message({
//                               message: this.$t('normal.success_02'),
//                               type: 'success',
//                               duration: 5 * 1000,
//                             });
//                             //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修
//                             if (val === 'StartWorkflow') {
//                               this.$refs.container.$refs.workflow.startWorkflow();
//                             } else {
//                               this.paramsTitle();
//                             }
//                             //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
//                           })
//                           .catch(error => {
//                             Message({
//                               message: error,
//                               type: 'error',
//                               duration: 5 * 1000,
//                             });
//                             this.loading = false;
//                           });
//                       }
//                     }
//                   }
//                 }).catch(error => {
//                 Message({
//                   message: error,
//                   type: 'error',
//                   duration: 5 * 1000,
//                 });
//
//               });
                if (this.params_id) {     //郛冶ｾ�
                  this.$store
                    .dispatch('PFANS1025Store/update', this.baseInfo)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      Message({
                        message: this.$t('normal.success_02'),
                        type: 'success',
                        duration: 5 * 1000,
                      });
                      //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修
                      if (val === 'StartWorkflow') {
                        this.$refs.container.$refs.workflow.startWorkflow();
                      } else {
                        this.paramsTitle();
                      }
                      //add-ws-4/28-附件为空的情况下发起审批，提示填入必须项后程序没有终止修改
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
//UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
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
    },
  }
  ;
</script>

<style scoped rel="stylesheet/scss" lang="scss">
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
