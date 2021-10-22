<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading" @disabled="setdisabled"
                         :enableSave="enableSave"
                         :canStart="canStart" @start="start" @end="end" :workflowCode="workflowCode">
      <div slot="customize">
        <el-form :model="form1" :rules="rules1" label-position="top" label-width="8vw" ref="refform1">
          <el-dialog :title="$t('label.PFANS3005VIEW_TRASHREASON')" :visible.sync="dialogFormVisible">
            <el-form-item :label="$t('label.PFANS3005VIEW_TRASHREASON')" :error="errortrashreason" prop="trashreason">
              <el-input type="textarea" style="width:46vw" :autosize="{ minRows: 3, maxRows: 4}"
                        v-model="form1.trashreason"></el-input>
            </el-form-item>
            <div class="dialog-footer" align="center">
              <el-button @click="saves">
                  <span style="margin-right: 66%;">{{$t('button.save')}}
                  </span>
              </el-button>
              <el-button slot="reference" @click="cancels">
                  <span style="margin-right: 66%;">{{$t('button.cancel')}}
                  </span>
              </el-button>
            </div>
          </el-dialog>
        </el-form>
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:3vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS2002FORMVIEW_ORGIN')" name="first">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3001FORMVIEW_CHULISTATUS')">
                    <el-select clearable style="width: 20vw" v-model="form.acceptstatus" :disabled="acceptShow"
                               :placeholder="$t('normal.error_09')"
                               @change="changeAcc">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1016FORMVIEW_COMPLETEDATE')" v-if="refuseShow">
                    <el-date-picker :disabled="acceptShow" style="width:20vw" type="date"
                                    v-model="form.findate"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1004VIEW_ENABLEDUPLICATELOAN')" prop="enableduplicateloan" >
                    <dicselect
                      :code="code5"
                      :data="form.enableduplicateloan"
                      :disabled="acceptShow"
                      :multiple="multiple"
                      @change="getEnableduplicateloan"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <!--                add-lyt-2/7-控制此单是否可以申请多次暂借款-end-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1016FORMVIEW_COMPLETEDATE')" v-if="refuseShow">
                    <el-date-picker :disabled="acceptShow" style="width:20vw" type="date"
                                    v-model="form.findate"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!--update center取预算单位横展 start 0404-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')">
                    <org :disabled="!disable"
                         :orglist="form.center_id"
                         @getOrgids="getCenterid"
                         orgtype="1"
                         style="width: 20vw"
                    ></org>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <org :disabled="!disable"
                         :orglist="form.group_id"
                         @getOrgids="getGroupId1"
                         orgtype="2"
                         style="width: 20vw"
                    ></org>
                  </el-form-item>
                </el-col>
                <!--update center取预算单位横展 end 0404-->
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
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="erroruser" :label="$t('label.applicant')" prop="user_id">
                    <user :disabled="true" :error="erroruser" :selectType="selectType" :userlist="userlist"
                          @getUserids="getUserids" style="width: 20vw"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.application_date')" prop="application_date">
                    <el-date-picker
                      :disabled="true"
                      style="width:20vw"
                      type="date"
                      v-model="form.application_date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <!--add-ws-6/16-禅道136-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS5004VIEW_PROJECTNAMW')">
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
                <!--            add-ws-6/16-禅道136-->
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_LINENUMBER')" prop="linenumber">
                    <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                              v-model="form.linenumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_SETPLACE')" prop="setplace">
                    <el-input :disabled="!disable" style="width:20vw" maxlength='20'
                              v-model="form.setplace"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :error="errorcontroller" :label="$t('label.PFANS3005VIEW_CONTROLLER')"
                                prop="controller">
                    <user :disabled="!disable" :error="errorcontroller" :selectType="selectType"
                          :userlist="controllerlist"
                          style="width:20vw" v-model="form.controller"
                          @getUserids="getController"></user>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="errorusername" :label="$t('label.PFANS3005VIEW_USER')" prop="username">
                    <user :disabled="!disable" :error="errorusername" :selectType="selectType" :userlist="usernamelist"
                          style="width:20vw" v-model="form.username"
                          @getUserids="getUsername"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_TIME')" prop="usertime">
                    <el-date-picker
                      v-model="form.usertime"
                      class="bigWidth"
                      :disabled="!disabled"
                      type="daterange"
                      unlink-panels
                      :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                      :start-placeholder="$t('label.startdate')"
                      :end-placeholder="$t('label.enddate')"
                      style="width: 20vw">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')" prop="budgetnumber">
                    <el-select clearable style="width: 20vw" v-model="form.budgetnumber" :disabled="!disable"
                               :placeholder="$t('normal.error_09')">
                      <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.lable"
                        :value="item.value"
                        @change="getBudgetunit">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--add ccm 0720-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1004VIEW_SALEQUOTATION')" prop="salequotation">
                    <dicselect
                      :code="code4"
                      :data="form.salequotation"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="getSalequotation"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <!--//add_fjl_0908 添加供应商名称-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005FORMVIEW_SUPPLIERNAME')" prop="suppliername">
                    <el-input :disabled="!disabled" style="width: 20vw;" maxlength="50"
                              v-model="form.suppliername"></el-input>
                  </el-form-item>
                </el-col>
                <!--//add_fjl_0908 添加供应商名称-->
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('label.PFANS1004VIEW_REASONSFORQUOTATION')" label-width="6rem"
                                v-show="show6">
                    <el-input :disabled="!disabled" style="width: 58vw;" type="textarea"
                              v-model="form.reasonsforquotation"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--add ccm 0720-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005FORMVIEW_CAREERPLAN')" prop="careerplan">
                    <span style="margin-right: 1rem ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                    <el-switch
                      :disabled="!disable"
                      v-model="form.careerplan"
                      active-value="1"
                      inactive-color="#005BAA"
                      inactive-value="0"
                      @change="radiochange">
                    </el-switch>
                    <span style="margin-left: 1rem ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
                  </el-form-item>
                </el-col>
<!--              </el-row>-->
<!--              <el-row>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item :label="$t('label.PFANS3005FORMVIEW_BUSINESSPLANTYPE')" prop="businessplantype"-->
<!--                                v-show="show1">-->
<!--                    <dicselect-->
<!--                      :code="code1"-->
<!--                      :data="form.businessplantype"-->
<!--                      :disabled="!disable"-->
<!--                      :multiple="multiple"-->
<!--                      style="width:20vw"-->
<!--                      @change="getBusinessplantype"-->
<!--                      v-model="form.businessplantype">-->
<!--                    </dicselect>-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3003FORMVIEW_CLASSIFICATION')" prop="classificationtype"
                                v-show="show3">
                    <dicselect
                      :code="code2"
                      :data="form.classificationtype"
                      :disabled="!disable"
                      :multiple="multiple"
                      style="width:20vw"
                      @change="getClassificationtype">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005FORMVIEW_BUSINESSPLANBALANCE')"
                                v-show="show3">
                    <el-input-number v-model="form.businessplanbalance"
                                     controls-position="right"
                                     :disabled="true"
                                     :min="0"
                                     :precision="2"
                                     style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!--<el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005FORMVIEW_CAREERPLANAMOUNT')" prop="businessplanamount">
                    <el-input-number v-model="form.businessplanamount"
                                     controls-position="right"
                                     :disabled="!disable"
                                     :min="0"
                                     :max="1000000000"
                                     :precision="2"
                                     style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_PURCHASEPURPOSE')" prop="purchasepurpose">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.purchasepurpose"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_PROCUREMENTPROJECT')" prop="procurementproject">
                    <dicselect
                      :code="code3"
                      :data="form.procurementproject"
                      :disabled="!disable"
                      :multiple="multiple"
                      style="width:20vw"
                      @change="getprocurementproject">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005FORMVIEW_FIXEDASSETSNO')" v-show="show5"
                                prop="fixedassetsno">
                    <el-input :disabled="fixedisable" style="width:20vw" maxlength='20'
                              v-model="form.fixedassetsno"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005FORMVIEW_OUTASSETSNO')" v-show="show4" prop="outassetsno">
                    <el-input :disabled="fixedisable" style="width:20vw" maxlength='20'
                              v-model="form.fixedassetsno"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_PROCUREMENTDETAILS_NAME')" prop="procurementdetails">
                    <el-input :disabled="!disable" style="width:20vw" v-model="form.procurementdetails"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.remarks')">
                    <el-input :disabled="!disable" type="textarea" style="width:58vw" v-model="form.remarks"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--              <el-row>-->
              <!--                <el-col :span="24">-->
              <!--                  <el-form-item :label="$t('label.PFANS3005VIEW_YUSUANBUZUFORQUOTATION')" label-width="6rem">-->
              <!--                    <el-input :disabled="acceptShow1" style="width: 70vw;" type="textarea"-->
              <!--                              v-model="form.yusuanbuzu"></el-input>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_BRANDNAME')">
                    <el-input :disabled="!disable" style="width:20vw" maxlength='20'
                              v-model="form.brandname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_MODEL')" prop="model">
                    <el-input :disabled="!disable" style="width:20vw" maxlength='20' v-model="form.model"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--111-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_EQUIPMENTURL')">
                    <el-input :disabled="!disable" style="width: 58vw" type='textarea'
                              v-model="form.equipmenturl"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_QUANTITY')" prop="quantity">
                    <el-input-number v-model="form.quantity"
                                     controls-position="right"
                                     :disabled="!disable"
                                     :min="0"
                                     :max="1000000000"
                                     :step="1"
                                     style="width:20vw"
                                     @change="changeSum"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_UNITPRICE')" prop="unitprice">
                    <el-input-number v-model="form.unitprice"
                                     @change="changeSum"
                                     controls-position="right"
                                     :disabled="!disable"
                                     :min="0"
                                     :max="1000000000"
                                     :precision="2"
                                     style="width:20vw"

                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_TOTALAMOUNT')+$t('label.PFANS3005VIEW_FARE')" prop="totalamount">
                    <el-input-number :disabled="!disable" :precision="2" style="width:20vw" controls-position="right"
                                     :min="0" :max="1000000000"
                                     v-model="form.totalamount">
                    </el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--              <el-row>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item :label="$t('label.PFANS3005VIEW_STORAGEDATE')">-->
              <!--                    <el-date-picker-->
              <!--                      startDate-->
              <!--                      :disabled="acceptShow1"-->
              <!--                      style="width:20vw"-->
              <!--                      type="date"-->
              <!--                      v-model="form.storagedate">-->
              <!--                    </el-date-picker>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item :label="$t('label.PFANS3005VIEW_COLLECTIONDAY')">-->
              <!--                    <el-date-picker-->
              <!--                      startDate-->
              <!--                      :disabled="acceptShow1"-->
              <!--                      style="width:20vw"-->
              <!--                      type="date"-->
              <!--                      v-model="form.collectionday">-->
              <!--                    </el-date-picker>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item :errorrecipients="errorrecipients" :label="$t('label.PFANS3005VIEW_RECIPIENTS')"-->
              <!--                                prop="recipients">-->
              <!--                    <user :disabled="acceptShow1" :errorrecipients="errorrecipients" :selectType="selectType"-->
              <!--                          :userlist="recipientslist"-->
              <!--                          style="width:20vw" v-model="form.recipients"-->
              <!--                          @getUserids="getRecipientslist"></user>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->
              <!--              <el-row>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item :label="$t('label.PFANS3005VIEW_ACTUARIALDATE')">-->
              <!--                    <el-date-picker-->
              <!--                      startDate-->
              <!--                      :disabled="acceptShow1"-->
              <!--                      style="width:20vw"-->
              <!--                      type="date"-->
              <!--                      v-model="form.actuarialdate">-->
              <!--                    </el-date-picker>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item :label="$t('label.PFANS3005VIEW_ACTUARIALAMOUNT')">-->
              <!--                    <el-input-number v-model="form.actuarialamount"-->
              <!--                                     controls-position="right"-->
              <!--                                     :disabled="acceptShow1"-->
              <!--                                     :min="0"-->
              <!--                                     :max="1000000000"-->
              <!--                                     :precision="2"-->
              <!--                                     style="width:20vw"-->
              <!--                    ></el-input-number>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS3005FORMVIEW_LOANAPP_ACTU')" name="second">
              <el-row>
                <el-table :data="tableA" border
                          header-cell-class-name="sub_bg_color_blue"
                          stripe style="width: 952px">
                  <el-table-column :label="$t('label.PFANS1013FORMVIEW_LOAN')" align="center"
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
                  <el-table-column :label="$t('label.remarks')" align="center" prop="remarks"
                                   width="300px">
                    <template slot-scope="scope">
                      <span>{{scope.row.remarks}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS5005VIEW_STATUS')" align="center" prop="status"
                                   width="150px">
                    <template slot-scope="scope">
                      <span>{{scope.row.status}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="rowClick(scope.row)"
                        plain
                        size="small"
                        type="primary"
                        :disabled="disableview === true ? true : false"
                      >{{$t('button.viewdetails')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <div></div>
              <el-row>
                <el-table :data="tableB" border
                          header-cell-class-name="sub_bg_color_blue"
                          stripe style="width: 952px;margin-top: 40px">
                  <el-table-column :label="$t('label.PFANS1013VIEW_REIMNUMBER')" align="center"
                                   prop="invoiceno" width="200px">
                    <template slot-scope="scope">
                      <span>{{scope.row.invoiceno}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS3005VIEW_ACTUARIALAMOUNT')" align="center" prop="moneys"
                                   width="150px">
                    <template slot-scope="scope">
                      <span>{{scope.row.moneys}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.remarks')" align="center" prop="remarks"
                                   width="300px">
                    <template slot-scope="scope">
                      <span>{{scope.row.remarks}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS5005VIEW_STATUS')" align="center" prop="status"
                                   width="150px">
                    <template slot-scope="scope">
                      <span>{{scope.row.status}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="rowClick1(scope.row)"
                        plain
                        size="small"
                        type="primary"
                        :disabled="disableview === true ? true : false"
                      >{{$t('button.viewdetails')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>

            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2022VIEW_UPDATINGFILES')" name="thrid">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.enclosure')">
                    <el-upload
                      :action="upload"
                      :file-list="fileList"
                      :on-error="fileError"
                      :on-preview="fileDownload"
                      :on-remove="fileRemove"
                      :on-success="fileSuccess"
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
            <el-tab-pane :label="$t('label.PFANS3005FORMVIEW_ORGIN')" name="four">
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('label.PFANS3005VIEW_YUSUANBUZUFORQUOTATION')" label-width="6rem">
                    <el-input :disabled="acceptShow1" style="width: 58vw;" type="textarea"
                              v-model="form.yusuanbuzu"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_STORAGEDATE')">
                    <el-date-picker
                      startDate
                      :disabled="acceptShow1"
                      style="width:20vw"
                      type="date"
                      v-model="form.storagedate">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_COLLECTIONDAY')">
                    <el-date-picker
                      startDate
                      :disabled="acceptShow1"
                      style="width:20vw"
                      type="date"
                      v-model="form.collectionday">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :errorrecipients="errorrecipients" :label="$t('label.PFANS3005VIEW_RECIPIENTS')"
                                prop="recipients">
                    <user :disabled="acceptShow1" :errorrecipients="errorrecipients" :selectType="selectType"
                          :userlist="recipientslist"
                          style="width:20vw" v-model="form.recipients"
                          @getUserids="getRecipientslist"></user>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_ACTUARIALDATE')">
                    <el-date-picker
                      startDate
                      :disabled="true"
                      style="width:20vw"
                      type="date"
                      v-model="form.actuarialdate">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS3005VIEW_ACTUARIALAMOUNT')">
                    <el-input-number v-model="form.actuarialamount"
                                     controls-position="right"
                                     :disabled="true"
                                     :min="0"
                                     :max="1000000000"
                                     :precision="2"
                                     style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
    <!--    <PFANS1012Pop :params="urlparams" :url="url" ref="PFANS1012Pop"></PFANS1012Pop>-->
    <!--    <PFANS1006Pop :params="urlparams" :url="url" ref="PFANS1006Pop"></PFANS1006Pop>-->
  </div>
</template>
<script>

  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import PFANS3005View from '../PFANS3005/PFANS3005View.vue';
  import {Message} from 'element-ui';
  import user from '../../../components/user.vue';
  import {
    downLoadUrl,
    getCurrentRole,
    getCurrentRole2,
    getCurrentRole3,
    getCurrentRole4,
    getCurrentRole5,
    getDictionaryInfo,
    getOrgInfo,
    getOrgInfoByUserId,
    getUserInfo,
    uploadUrl,
  } from '@/utils/customize';
  import moment from 'moment';
  import dicselect from '../../../components/dicselect.vue';
  import org from '../../../components/org';
  import {getStatus} from '../../../../utils/customize';

  export default {
    name: 'PFANS3005FormView',
    components: {
      // PFANS1012Pop,
      // PFANS1006Pop,
      EasyNormalContainer,
      PFANS3005View,
      dicselect,
      getOrgInfoByUserId,
      user,
      org,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!value || value === '' || value === undefined) {
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        } else {
          this.erroruser = '';
          return callback();
        }
      };
      var checkcontroller = (rule, value, callback) => {
        if (!value || value === '' || value === undefined) {
          this.errorcontroller = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_CONTROLLER');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_CONTROLLER')));
        } else {
          this.errorcontroller = '';
          return callback();
        }
      };
      var checkusername = (rule, value, callback) => {
        if (!value || value === '' || value === undefined) {
          this.errorusername = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_USER');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_USER')));
        } else {
          this.errorusername = '';
          return callback();
        }
      };
      var centerIds = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.errorcenter = this.$t('normal.error_09') + this.$t('label.center');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.center')));
        } else {
          this.errorcenter = '';
          return callback();
        }
      };
      var groupIds = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.errorgroup = this.$t('normal.error_09') + this.$t('label.group');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.group')));
        } else {
          this.errorgroup = '';
          return callback();
        }
      };
      return {
        dialogFormVisible: false,
        optionsdate: [{value: 'PP024001', lable: this.$t('label.PFANS5008FORMVIEW_PROJECTGTXM')}],
        options1: [],
        tableA: [],
        tableB: [],
        multipleSelection: [],
        multipleSelection1: [],
        url: '',
        findateShow: false,
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 start
        //urlparams: '',
        urlparams: {},
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 end
        centerid: '',
        groupid: '',
        teamid: '',
        regExp: [],
        multiple: false,
        loading: false,
        checkGro: false,
        disableview: false,
        erroruser: '',
        errorcenter: '',
        errorgroup: '',
        errorusername: '',
        errorcontroller: '',
        errorrecipients: '',
        selectType: 'Single',
        userlist: '',
        controllerlist: '',
        errortrashreason: '',
        usernamelist: '',
        recipientslist: '',
        title: 'title.PFANS3005VIEW',
        enableSave: false,
        workflowCode: '',
        fixedisable: true,
        editableTabsValue: '0',
        editableTabs: [],
        tabIndex: 0,
        refuseShow: false,
        form1: {
          trashreason: '',
        },
        form: {
          project_id: '',
          careerplan: '1',
          // businessplantype: '',
          classificationtype: '',
          businessplanbalance: '',
          procurementproject: '',
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          setplace: '',
          linenumber: '',
          controller: '',
          username: '',
          usertime: '',
          user: '',
          budgetnumber: '',
          /*businessplanamount: '',*/
          purchasepurpose: '',
          fixedassetsno: '',
          outassetsno: '',
          procurementdetails: '',
          brandname: '',
          model: '',
          equipmenturl: '',
          quantity: '',
          unitprice: '',
          totalamount: '',
          storagedate: '',
          collectionday: '',
          recipients: '',
          actuarialdate: '',
          actuarialamount: '',
          application_date: moment(new Date()).format('YYYY-MM-DD'),
          nodeList: [],
          accept: '0',
          acceptstatus: '',
          findate: '',
          refusereason: '',
          //add_fjl_0908 添加供应商名称
          suppliername: '',
          //add_fjl_0908 添加供应商名称
          //add ccm 0720
          salequotation: '',
          reasonsforquotation: '',
          uploadfile: '',
          yusuanbuzu: '',
          loanapplication_id: '',
          loanapno: '',
          invoiceno: '',
          publicexpense_id: '',
          trashreason: '',
          //add ccm 0720
          //add-lyt-2/7-控制此单是否可以申请多次暂借款-start
          enableduplicateloan:'PJ055002',
          //add-lyt-2/7-控制此单是否可以申请多次暂借款-end
        },
        options: [
          {
            value: '0',
            label: this.$t('label.PFANS3006VIEW_CARRYOUT'),
          },
          {
            value: '1',
            label: this.$t('label.PFANS3006VIEW_DUIYINGZHONG'),
          },
          {
            value: '2',
            label: this.$t('label.PFANS3006VIEW_WEIDUIYING'),
          },
        ],
        acceptShow: true,
        acceptShow1: true,
        // code1: 'PR002',
        code2: 'PR003',
        code3: 'PJ005',
        //add ccm 0720
        code4: 'PJ013',
        //add-lyt-2/7-控制此单是否可以申请多次暂借款-start
        code5: 'PJ055',
        //add-lyt-2/7-控制此单是否可以申请多次暂借款-end
        show6: false,
        upload: uploadUrl(),
        fileList: [],
        activeName: 'first',
        caigouhetongTable: [],
        //add ccm 0720
        show1: true,
        show2: false,
        show3: true,
        show4: false,
        show5: true,
        menuList: [],
        disabled: false,
        rules: {
          //add-lyt-2/7-控制此单是否可以申请多次暂借款-start
          enableduplicateloan: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_ENABLEDUPLICATELOAN'),
              trigger: 'change',
            },
          ],
          //add-lyt-2/7-控制此单是否可以申请多次暂借款-end
          //add ccm 0720
          salequotation: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_SALEQUOTATION'),
              trigger: 'change',
            },
          ],
          //add ccm 0720
          suppliername: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005FORMVIEW_SUPPLIERNAME'),
              trigger: 'change',
            },
          ],
          //add ccm 0720
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
          application_date: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.application_date'),
              trigger: 'change',
            },
          ],
          linenumber: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3005VIEW_LINENUMBER'),
              trigger: 'change',
            }],
          center_id: [
            {
              required: true,
              validator: centerIds,
              trigger: 'change',
            },
          ],
          group_id: [
            {
              required: true,
              validator: groupIds,
              trigger: 'change',
            },
          ],
          setplace: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_SETPLACE'),
              trigger: 'change',
            },
          ],
          controller: [
            {
              required: true,
              validator: checkcontroller,
              trigger: 'change',
            },
          ],
          username: [
            {
              required: true,
              validator: checkusername,
              trigger: 'change',
            },
          ],
          usertime: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_TIME'),
              trigger: 'change',
            },
          ],
          budgetnumber: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.group') + this.$t('label.hou') + this.$t('label.PFANS1012FORMVIEW_BUDGET'),
              trigger: 'change',
            },
          ],

          // businessplantype: [
          //   {
          //     required: true,
          //     message: this.$t('normal.error_09') + this.$t('label.PFANS3005FORMVIEW_BUSINESSPLANTYPE'),
          //     trigger: 'change',
          //   },
          // ],
          // businessplanbalance: [
          //   {
          //     required: true,
          //     message: this.$t('normal.error_08') + this.$t('label.PFANS3005FORMVIEW_BUSINESSPLANBALANCE'),
          //     trigger: 'change',
          //   },
          // ],
          classificationtype: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3003FORMVIEW_CLASSIFICATION'),
              trigger: 'change',
            },
          ],
         /* businessplanamount: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005FORMVIEW_CAREERPLANAMOUNT'),
              trigger: 'change',
            },
          ],*/
          purchasepurpose: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_PURCHASEPURPOSE'),
              trigger: 'change',
            },
          ],
          procurementproject: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_PROCUREMENTPROJECT'),
              trigger: 'change',
            },
          ],
          procurementdetails: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_PROCUREMENTDETAILS_NAME'),
              trigger: 'change',
            },
          ],
          quantity: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_QUANTITY'),
              trigger: 'change',
            },
          ],
          /*型号*/
          model: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_MODEL'),
              trigger: 'change',
            },
          ],


          unitprice: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_UNITPRICE'),
              trigger: 'change',
            },
          ],
          totalamount: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_TOTALAMOUNT'),
              trigger: 'change',
            },
          ],
        },
        rules1: {
          trashreason: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS3005VIEW_TRASHREASON'),
              trigger: 'change',
            },
          ]
        },
        canStart: false,
        buttonList: [],
        flowData: [],
      };
    },
    mounted() {
      this.getCompanyProjectList();
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS3005Store/getPurchaseOne', {'purchase_id': this.$route.params._id})
          .then(response => {
            if (response !== undefined) {
              this.form = response;
              if (this.form.acceptstatus === '0') {
                this.refuseShow = true;
              } else {
                this.refuseShow = false;
              }

              //禅道 610 去除数据字典不统一 ztc range
              // if (this.form.budgetnumber !== null && this.form.budgetnumber !== '') {
              //   let procurement = getDictionaryInfo(this.form.budgetnumber);
              //   if (procurement != null) {
              //     this.form.budgetnumber = procurement.value2 + '_' + procurement.value3;
              //   }
              // }
              // if (this.form.group_name != '' && this.form.group_name != null) {
              //   this.orglist = this.form.group_name;
              //   this.getchangeGroup(this.form.group_name)
              // }
              //禅道 610 去除数据字典不统一 ztc range

              //start(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
              let role = getCurrentRole2();
              let role4 = getCurrentRole4();
              let role5 = getCurrentRole5();
              let role3 = getCurrentRole3();
              if (role === '0' || role4 === '0' || role3 === '0' || role5 === '0') {
                if (this.form.status === '4') {
                  this.enableSave = true;
                  if (this.disable) {
                    if (this.form.findate == null || this.form.findate == "") {
                      if (this.form.acceptstatus === '0') {
                        this.form.findate = moment(new Date()).format('YYYY-MM-DD');
                      }
                    }
                    this.disable = !this.$route.params.disabled;
                    this.acceptShow = false;
                  } else {
                    this.acceptShow = true;
                  }
                  this.acceptShow1 = false;
                  if (this.buttonList.length > 5) {
                    this.buttonList[2].disabled = false;
                    this.buttonList[3].disabled = false;
                    this.buttonList[4].disabled = false;
                  }
                } else {
                  this.acceptShow = true;
                  this.enableSave = false;
                  this.acceptShow1 = true;
                  if (this.buttonList.length > 5) {
                    this.buttonList[2].disabled = true;
                    this.buttonList[3].disabled = true;
                    this.buttonList[4].disabled = true;
                  }
                }
              } else {
                if (this.buttonList.length > 5) {
                  this.buttonList[2].disabled = true;
                  this.buttonList[3].disabled = true;
                  this.buttonList[4].disabled = true;
                }
                this.acceptShow1 = true;
              }

              //end(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
              // update center取预算单位横展 start
              // let rst = getOrgInfoByUserId(response.user_id);
              // if (rst) {
              //   //upd_fjl_0927
              //   if (rst.groupId !== null && rst.groupId !== '' && rst.groupId !== undefined) {
              //     this.checkGro = true;
              //   } else {
              //     this.checkGro = false;
              //   }
              //   // this.centerid = rst.centerNmae;
              //   // this.groupid = rst.groupNmae;
              //   // this.teamid = rst.teamNmae;
              //   //upd_fjl_0927
              // }
              this.getBudt(this.form.center_id);
              // update center取预算单位横展 end
              if (this.form.careerplan === '1') {
                this.show3 = true;
                this.show1 = true;
                // this.rules.businessplantype[0].required = true;
                // this.rules.businessplanbalance[0].required = true;
                this.rules.classificationtype[0].required = true;
              } else {
                this.show3 = false;
                this.show2 = false;
                this.show1 = false;
                // this.rules.businessplantype[0].required = false;
                // this.rules.businessplanbalance[0].required = false;
                this.rules.classificationtype[0].required = false;
              }
              // if (this.form.businessplantype === 'PR002006') {
              //   this.show2 = true;
              // } else if (this.form.businessplantype === 'PR002001') {
              //   this.show2 = false;
              // } else if (this.form.businessplantype === 'PR002002') {
              //   this.show2 = false;
              // } else if (this.form.businessplantype === 'PR002003') {
              //   this.show2 = false;
              // } else if (this.form.businessplantype === 'PR002004') {
              //   this.show2 = false;
              // }
              if (this.form.procurementproject === 'PJ005001') {
                this.show5 = true;
                this.show4 = false;
              } else if (this.form.procurementproject === 'PJ005002') {
                this.show4 = true;
                this.show5 = false;
              } else if (this.form.procurementproject === 'PJ005003') {
                this.show4 = true;
                this.show5 = false;
              } else if (this.form.procurementproject === 'PJ005004') {
                this.show4 = true;
                this.show5 = false;
              } else if (this.form.procurementproject === 'PJ005005') {
                this.show4 = true;
                this.show5 = false;
              } else if (this.form.procurementproject === 'PJ005006') {
                this.show4 = true;
                this.show5 = false;
              }
              //add ccm 0720
              if (this.form.salequotation === 'PJ013001' || this.form.salequotation === 'PJ013003') {
                this.show6 = true;
              }
              if (this.form.uploadfile != null && this.form.uploadfile != '' && this.form.uploadfile != undefined) {
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
              //add ccm 0720

              this.userlist = this.form.user_id;
              this.controllerlist = this.form.controller;
              this.usernamelist = this.form.username;
              this.recipientslist = this.form.recipients;
              let timea = this.form.usertime;
              let serdate = timea.slice(0, 10);
              let serdate1 = timea.slice(timea.length - 10);
              this.form.usertime = [serdate, serdate1];
              // this.getBudt(this.userlist);
            }
            //有暂借款编号绑定暂借款信息
            if (this.form.loanapplication_id) {
              this.$store
                .dispatch('PFANS1006Store/getLoanapplicationOne2', {'loanapplication_id': this.form.loanapplication_id})
                .then(response1 => {
                  if (response1 !== null && response1 !== '' && response1 !== undefined) {
                    for (var i = 0; i < response1.length; i++) {
                      let status = getStatus(response1[i].status);
                      this.tableA.push({
                        loanapno: response1[i].loanapno,
                        moneys: response1[i].moneys,
                        remarks: response1[i].remarks,
                        status: status,
                        loanapplication_id: response1[i].loanapplication_id,
                      });
                    }

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
            }

            //有精算报销编号绑定精算信息
            if (this.form.publicexpense_id) {
              this.$store
                .dispatch('PFANS1012Store/selectByIdone2', {'publicexpenseid': this.form.publicexpense_id})
                .then(response2 => {
                  if (response2 !== null && response2 !== '' && response2 !== undefined) {
                    for (var i = 0; i < response2.length; i++) {
                      let status = getStatus(response2[i].status);
                      this.tableB.push({
                        invoiceno: response2[i].invoiceno,
                        moneys: response2[i].moneys,
                        remarks: response2[i].preparefor,
                        status: status,
                        publicexpense_id: response2[i].publicexpenseid,
                      });
                    }
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

            }

            //采购业务数据流程查看详情
            this.$store
              .dispatch('PFANS3005Store/getworkfolwPurchaseData', {'purchase_id': this.$route.params._id})
              .then(response3 => {
                if (response3 !== null && response3 !== '' && response3 !== undefined) {
                  if (response3["purchase"] != undefined) {
                    let purlist = response3["purchase"].split(';');
                    for (let i = 0; i < purlist.length; i++) {
                      let pur = purlist[i].split(',');
                      let statu = pur[1] === '4' ? 'normal.done' : (pur[1] === '2' ? 'normal.doing' : 'normal.todo')
                      this.flowData.push(
                        {
                          No: this.flowData.length + 1,
                          Name: '采购决裁',
                          Status: statu,
                          url: 'PFANS3005FormView',
                          params: {'_id': pur[0]}
                        })
                    }
                  }
                  if (response3["award"] != undefined) {
                    let awlist = response3["award"].split(';');
                    for (let i = 0; i < awlist.length; i++) {
                      let aw = awlist[i].split(',');
                      let statu = aw[1] === '4' ? 'normal.done' : (aw[1] === '2' ? 'normal.doing' : 'normal.todo')
                      this.flowData.push(
                        {
                          No: this.flowData.length + 1,
                          Name: '合同决裁',
                          Status: statu,
                          url: 'PFANS1047FormView',
                          params: {'_id': aw[0]}
                        })
                    }
                  }
                  if (response3["seal"] != undefined) {
                    let seallist = response3["seal"].split(';');
                    for (let i = 0; i < seallist.length; i++) {
                      let seal = seallist[i].split(',');
                      if (seal[0]!='undefined' && seal[0]!='null' && seal[0]!='')
                      {
                        let statu = seal[1] === '3' ? 'normal.done' : (seal[1] === '2' ? 'normal.doing' : 'normal.todo')
                        this.flowData.push(
                          {
                            No: this.flowData.length + 1,
                            Name: '印章申请',
                            Status: statu,
                            url: 'PFANS4001FormView',
                            params: {'_id': seal[0]}
                          })
                      }
                    }
                  }
                  if (response3["loanApplication"] != undefined) {
                    let loanapplist = response3["loanApplication"].split(';');
                    let setloanapplist = new Set(loanapplist);
                    for (let i of setloanapplist) {
                      let loanapp = i.split(',');
                      let statu = loanapp[1] === '4' ? 'normal.done' : (loanapp[1] === '2' ? 'normal.doing' : 'normal.todo')
                      this.flowData.push(
                        {
                          No: this.flowData.length + 1,
                          Name: '暂借款申请',
                          Status: statu,
                          url: 'PFANS1006FormView',
                          params: {'_id': loanapp[0]}
                        })
                    }
                  }
                  if (response3["publicExpense"] != undefined) {
                    let publist = response3["publicExpense"].split(';');
                    let setpublist = new Set(publist);
                    for (let i of setpublist) {
                      let pub = i.split(',');
                      let statu = pub[1] === '4' ? 'normal.done' : (pub[1] === '2' ? 'normal.doing' : 'normal.todo')
                      this.flowData.push(
                        {
                          No: this.flowData.length + 1,
                          Name: '公共费用精算',
                          Status: statu,
                          url: 'PFANS1012FormView',
                          params: {'_id': pub[0]}
                        })
                    }
                  }
                  this.$emit('showPop', this.flowData);
                }
              })
            //采购业务数据流程查看详情
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
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          // if(getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)){
          //     this.form.budgetnumber = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
          // }
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            this.form.group_id = rst.groupId;
            // update center取预算单位横展 start
            this.form.team_id = rst.teamId;
            this.getBudt(this.form.center_id);
            //add_fjl_0927
            // if (rst.groupId !== null && rst.groupId !== '' && rst.groupId !== undefined) {
            //   this.form.group_id = rst.groupId;
            //   this.checkGro = true;
            // } else {
            //   this.checkGro = false;
            // }
            // update center取预算单位横展 end
            //add_fjl_0927
          }
          // if (this.form.group_id) {
          //   this.getchangeGroup(this.form.group_id);
          // }
          this.form.user_id = this.$store.getters.userinfo.userid;
          // this.buttonList = [];
          // this.buttonList = [
          //   {
          //     key: 'save',
          //     name: 'button.save',
          //     disabled: false,
          //     icon: 'el-icon-check',
          //   },
          // ];
          //this.buttonList[1].disabled = true;
          // this.getBudt(this.form.user_id);
        }
      }
    },
    //add_fjl start
    watch: {
      form: {
        handler: function () {
          //totalamount --总金额
          // add_fjl_06/15 --添加审批流程 start
           if (this.form.careerplan === '1') {
            if (Number(this.form.totalamount) <= 1000) {
              if (this.form.procurementproject === 'PJ005005' ||
                this.form.procurementproject === 'PJ005006' ||
                this.form.procurementproject === 'PJ005007' ||
                this.form.procurementproject === 'PJ005018' ||
                this.form.procurementproject === 'PJ005019' ||
                this.form.procurementproject === 'PJ005020') {
                //电脑相关，1000元以下
                //update ztc 2021新年度流程调整 start
                this.workflowCode = 'W0126';
                // if (getCurrentRole() === '2' || getCurrentRole() === '3') {
                //   this.workflowCode = 'W0136';//删除
                // } else {
                //   this.workflowCode = 'W0126';
                // }
                //update ztc 2021新年度流程调整 end
              } else {
                //update ztc 2021新年度流程调整 start
                this.workflowCode = 'W0082';
                // if (getCurrentRole() === '2' || getCurrentRole() === '3') {
                //   this.workflowCode = 'W0140';//删除
                // } else {
                //   //最后节点到GM  事业计划内 1000以下
                //   this.workflowCode = 'W0082';
                // }
                //update ztc 2021新年度流程调整 end
              }
            } else if (Number(this.form.totalamount) > 1000 && Number(this.form.totalamount) <= 20000) {
              if (this.form.procurementproject === 'PJ005005' ||
                this.form.procurementproject === 'PJ005006' ||
                this.form.procurementproject === 'PJ005007' ||
                this.form.procurementproject === 'PJ005018'||
              this.form.procurementproject === 'PJ005019' ||
              this.form.procurementproject === 'PJ005020'){
                //电脑相关，//最后节点到center长  事业计划内  1000到20000之间
                this.workflowCode = 'W0127';
                // if (getCurrentRole() === '2' || getCurrentRole() === '3') {
                //   this.workflowCode = 'W0131';
                // } else {
                //   this.workflowCode = 'W0127';
                // }
              } else {
                this.workflowCode = 'W0022';
                // if (getCurrentRole() === '2' || getCurrentRole() === '3') {
                //   this.workflowCode = 'W0130';
                // } else {
                //   //最后节点到center长  事业计划内  1000到20000之间
                //   this.workflowCode = 'W0022';
                // }
              }
            } else if (Number(this.form.totalamount) > 20000) {
              if (this.form.procurementproject === 'PJ005005' ||
                this.form.procurementproject === 'PJ005006' ||
                this.form.procurementproject === 'PJ005007' ||
                this.form.procurementproject === 'PJ005018' ||
                this.form.procurementproject === 'PJ005019' ||
                this.form.procurementproject === 'PJ005020') {
                //电脑相关，最后节点到总经理   两万以上
                this.workflowCode = 'W0114';
                // upd ztc 1223 start
                // if (getCurrentRole() === '2' || getCurrentRole() === '3') {
                //   this.workflowCode = 'W0125';
                // } else {
                //   //电脑相关，最后节点到总经理   两万以上
                //   this.workflowCode = 'W0114';
                // }
                // upd ztc 1223 end
              } else {
                //最后节点到总经理   两万以上
                this.workflowCode = 'W0075';
                // if (getCurrentRole() === '2' || getCurrentRole() === '3') {
                //   this.workflowCode = 'W0132';
                // } else {
                //   //最后节点到总经理   两万以上
                //   this.workflowCode = 'W0075';
                // }
              }
            }
          } else if (this.form.careerplan === '0') {
            if (this.form.procurementproject === 'PJ005005' ||
              this.form.procurementproject === 'PJ005006' ||
              this.form.procurementproject === 'PJ005007' ||
              this.form.procurementproject === 'PJ005018'||
              this.form.procurementproject === 'PJ005019' ||
              this.form.procurementproject === 'PJ005020') {
              //最后节点到总经理   电脑相关 事业计划外
              this.workflowCode = 'W0128';
              // if (getCurrentRole() === '2' || getCurrentRole() === '3') {
              //   this.workflowCode = 'W0133';
              // } else {
              //   this.workflowCode = 'W0128';
              // }
            } else {
              //最后节点到总经理   事业计划外
              this.workflowCode = 'W0075';
              // if (getCurrentRole() === '2' || getCurrentRole() === '3') {
              //   this.workflowCode = 'W0132';
              // } else {
              //   //最后节点到总经理   事业计划外
              //   this.workflowCode = 'W0075';
              // }
            }
          }
          // add_fjl_06/15 --添加审批流程 end
        },
        deep: true,
      },
    }, loading: false,
    //add_fjl end
    created() {
      // this.$store.commit('global/SET_WORKFLOWURL', '/PFANS3005View');
      this.disable = this.$route.params.disabled;
      this.disableview = this.$route.params._disableview;
      // if (this.disable) {
      //   this.buttonList = [
      //     {
      //       key: 'save',
      //       name: 'button.save',
      //       disabled: false,
      //       icon: 'el-icon-check',
      //     },
      //     {
      //       key: 'trash',
      //       name: 'button.trash',
      //       disabled: false,
      //       icon: 'el-icon-close',
      //     },
      //   ];
      // }
      //新建
      if (!this.$route.params._id) {
        this.fixedisable = false;
        this.buttonList = [];
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
          {
            key: 'trash',
            name: 'button.trash',
            disabled: false,
            icon: 'el-icon-close',
          },
        ];
      } else {
        //查看
        if (!this.disable) {
          let role = getCurrentRole2();
          let role4 = getCurrentRole4();
          let role5 = getCurrentRole5();
          if (role === '0') {
            this.fixedisable = true;
            this.buttonList = [
              {
                key: 'save',
                name: 'button.save',
                disabled: false,
                icon: 'el-icon-check',
              },
              {
                key: 'trash',
                name: 'button.trash',
                disabled: false,
                icon: 'el-icon-close',
              },
              {
                key: 'conapp',
                name: 'button.conapp',
                disabled: true,
                icon: 'el-icon-plus',
              },
              // {
              //   key: 'temLoanApp',
              //   name: 'button.temLoanApp',
              //   disabled: true,
              //   icon: 'el-icon-plus',
              // },
              // {
              //   key: 'actuarial',
              //   name: 'button.actuarial',
              //   disabled: true,
              //   icon: 'el-icon-edit-outline',
              // },
            ];
          } else if(role4 === '0' || role5 === '0'){
            // this.disable = !this.$route.params.disabled;
            this.fixedisable = false;
            this.buttonList = [
              {
                key: 'save',
                name: 'button.save',
                disabled: false,
                icon: 'el-icon-check',
              },
            ];
          }else{
            this.buttonList = [

            ];
          }
        } else {
          this.fixedisable = false;
          //修改
          this.buttonList = [
            {
              key: 'save',
              name: 'button.save',
              disabled: false,
              icon: 'el-icon-check',
            },
            {
              key: 'trash',
              name: 'button.trash',
              disabled: false,
              icon: 'el-icon-close',
            },
            {
              key: 'conapp',
              name: 'button.conapp',
              disabled: true,
              icon: 'el-icon-plus',
            },
            // {
            //   key: 'temLoanApp',
            //   name: 'button.temLoanApp',
            //   disabled: true,
            //   icon: 'el-icon-plus',
            // },
            // {
            //   key: 'actuarial',
            //   name: 'button.actuarial',
            //   disabled: true,
            //   icon: 'el-icon-edit-outline',
            // },
          ];
        }
      }


      if (this.form.careerplan === '1') {
        this.show3 = true;
        this.show1 = true;
        // this.rules.businessplantype[0].required = true;
        // this.rules.businessplanbalance[0].required = true;
        this.rules.classificationtype[0].required = true;
      } else {
        this.show3 = false;
        this.show1 = false;
        // this.rules.businessplantype[0].required = false;
        // this.rules.businessplanbalance[0].required = false;
        this.rules.classificationtype[0].required = false;
      }
    },
    methods: {
      // update center取预算单位横展 start 0404
      getOrgInformation(id) {
        let org = {};
        let treeCom = this.$store.getters.orgs;
        if (id && treeCom.getNode(id)) {
          let node = id;
          let type = treeCom.getNode(id).data.type || 0;
          for (let index = parseInt(type); index >= 1; index--) {
            if (index === 2) {
              org.groupname = treeCom.getNode(node).data.departmentname;
              org.group_id = treeCom.getNode(node).data._id;
            }
            if (index === 1) {
              org.centername = treeCom.getNode(node).data.companyname;
              org.center_id = treeCom.getNode(node).data._id;
            }
            node = treeCom.getNode(node).parent.data._id;
          }
          ({
            centername: this.form.centername,
            groupname: this.form.groupname,
            center_id: this.form.center_id,
            group_id: this.form.group_id,
          } = org);
        }
      },
      //add_fjl_0927
      getCenterid(val) {
        this.form.center_id = val;
        this.form.budgetnumber = '';
        this.getBudt(val);
        if(val === ""){
          this.form.group_id = "";
        }
      },
      getGroupId1(val) {
        this.form.group_id = val;
        this.form.budgetnumber = '';
        if(val != ""){
          this.getOrgInformation(val);
          this.getBudt(val);
        }else{
          this.getBudt(this.form.center_id);
        }
      },
      // update center取预算单位横展 end 0404
      getTeamid(val) {
        this.form.team_id = val;
      },
      //add_fjl_0927
      saves() {
        this.$refs['refform1'].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false;
            this.form.trashreason = this.form1.trashreason;
            this.buttonClick('save');
          } else {
            Message({
              message: this.$t('normal.error_12'),
              type: 'error',
              duration: 5 * 1000,
            });
          }
        });
      },
      cancels() {
        this.dialogFormVisible = false;
      },
      //add ccm 0720
      getSalequotation(val) {
        this.form.salequotation = val;
        if (val === 'PJ013002') {
//ADD CCM 20210312 NT_PFANS_20210308_BUG_177 FR
          this.form.reasonsforquotation = null;
//ADD CCM 20210312 NT_PFANS_20210308_BUG_177 TO
          this.show6 = false;
        } else if (val === 'PJ013001') {
          this.show6 = true;
        } else if (val === 'PJ013003') {
          this.show6 = true;
        }
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
          file.url = file.url.replace("%", "%25");
          file.url = file.url.replace("#", "%23");
          file.url = file.url.replace("&", "%26");
          file.url = file.url.replace("+", "%2B");
          file.url = file.url.replace("=", "%3D");
          file.url = file.url.replace("?", "%3F");
          var url = downLoadUrl(file.url);
          window.open(url);
        }

      },
      fileSuccess(response, file, fileList) {
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
      },
      // rowClick(row) {
      //   this.url = '';
      //   this.urlparams = '';
      //   this.url = 'PFANS1006FormView';
      //   this.urlparams = {'_id': row.loanapplication_id, 'disabled': false};
      //     this.$refs.PFANS1006Pop.open = true;
      // },
      // rowClick1(row) {
      //   this.url = '';
      //   this.urlparams = '';
      //   this.url = 'PFANS1012FormView';
      //   this.urlparams = {'_id': row.publicexpense_id, 'disabled': false};
      //     this.$refs.PFANS1012Pop.open = true;
      // },
      //add ccm 0720
      //add_fjl_0813  查看详情
      rowClick(row) {
        this.$store.commit('global/SET_HISTORYURL', '');
        this.$store.commit('global/SET_WORKFLOWURL', '/FFFF1006FormView');
        this.$router.push({
          name: 'PFANS1006FormView',
          params: {
            _id: row.loanapplication_id,
            disabled: false,
            _checkid: this.$route.params._id,
            _check: true,
            _fromname: 'PFANS3005FormView',
          },
        });
      },
      rowClick1(row) {
        this.$store.commit('global/SET_HISTORYURL', '');
        this.$store.commit('global/SET_WORKFLOWURL', '/FFFF1012FormView');
        this.$router.push({
          name: 'PFANS1012FormView',
          params: {
            _id: row.publicexpense_id,
            disabled: false,
            _checkid: this.$route.params._id,
            _check2: true,
            _fromname: 'PFANS3005FormView',
          },
        });
      },
      //add_fjl_0813  查看详情

      //add-ws-6/16-禅道137
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
      //add-ws-6/16-禅道137
      //add-lyt-2/7-控制此单是否可以申请多次暂借款-start
      getEnableduplicateloan(val){
        this.form.enableduplicateloan = val;
      },
      //add-lyt-2/7-控制此单是否可以申请多次暂借款-end
      //change受理状态  add_fjl
      changeAcc(val) {
        this.form.acceptstatus = val;
        if (val === '0') {
          this.form.findate = moment(new Date()).format('YYYY-MM-DD');
          this.refuseShow = true;
        } else {
          this.form.findate = null;
          this.refuseShow = false;
        }
      },
      // update center取预算单位横展 start 0404
      getBudt(val) {
        this.options1 = [];
        if (val === '' || val === null) {
          return;
        }
        //ADD_FJL  修改人员预算编码
        // if (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
        if(getOrgInfo(val)){
        let butinfo = (getOrgInfo(val).encoding).substring(0,3);
        let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
        if (dic.length > 0) {
          for (let i = 0; i < dic.length; i++) {
            if (butinfo === (dic[i].value1).substring(0,3)) {
              this.options1.push({
                lable: dic[i].value2 + '_' + dic[i].value3,
                value: dic[i].code,
              });
            }
          }
        }
          if(this.options1.length === 0){
            let butinfo = (getOrgInfo(this.form.group_id).encoding).substring(0,3);
            let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
            if (dic.length > 0) {
              for (let i = 0; i < dic.length; i++) {
                if (butinfo === (dic[i].value1).substring(0,3)) {
                  this.options1.push({
                    lable: dic[i].value2 + '_' + dic[i].value3,
                    value: dic[i].code,
                  });
                }
              }
            }
          }
        }

        // }
        //ADD_FJL  修改人员预算编码
      },
      // update center取预算单位横展 end 0404
      getBudgetunit(val) {
        this.form.budgetnumber = val;
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          //fjl --与总务下其他几本同步
          this.disabled = val;
        }
      },
      changeSum() {
        this.form.totalamount = this.form.quantity * this.form.unitprice;
      },
      getUserids(val) {
        this.form.user_id = val;
        this.userlist = val;
        let rst = getOrgInfoByUserId(val);
        // if(getOrgInfo(getOrgInfoByUserId(val).groupId)){
        //     this.form.budgetnumber = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
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
        if (!this.form.user_id || this.form.user_id === '' || val === undefined) {
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.erroruser = '';
        }
      },
      getController(val) {
        this.form.controller = val;
        this.controllerlist = val;
        if (!this.form.controller || this.form.controller === '' || val === undefined) {
          this.errorcontroller = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_CONTROLLER');
        } else {
          this.errorcontroller = '';
        }
      },
      radiochange(val) {
        this.form.careerplan = val;
        if (val === '1') {
          this.show1 = true;
          this.show3 = true;
          // if (this.form.businessplantype === 'PR002006') {
          //   this.show2 = true;
          //   this.rules.classificationtype[0].required = true;
          // }
          // this.rules.businessplantype[0].required = true;
          // this.rules.businessplanbalance[0].required = true;
          this.rules.classificationtype[0].required = true;
        } else {
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
          // this.rules.businessplantype[0].required = false;
          // this.rules.businessplanbalance[0].required = false;
          this.rules.classificationtype[0].required = false;
          // this.form.businessplantype = '';
          // this.form.businessplanbalance = '';
          this.form.classificationtype = '';
        }
      },
      // getBusinessplantype(val) {
      //   this.form.businessplantype = val;
      //   if (val === 'PR002006') {
      //     this.show2 = true;
      //     this.rules.classificationtype[0].required = true;
      //   }
      //   else if (val === 'PR002001') {
      //     this.show2 = false;
      //     this.rules.classificationtype[0].required = false;
      //   } else if (val === 'PR002002') {
      //     this.show2 = false;
      //     this.rules.classificationtype[0].required = false;
      //   } else if (val === 'PR002003') {
      //     this.show2 = false;
      //     this.rules.classificationtype[0].required = false;
      //   } else if (val === 'PR002004') {
      //     this.show2 = false;
      //     this.rules.classificationtype[0].required = false;
      //   }
      //   else {
      //     this.show2 = false;
      //     this.rules.classificationtype[0].required = false;
      //   }
      // },
      getClassificationtype(val) {
        this.form.classificationtype = val;
      },
      getprocurementproject(val) {
        this.form.procurementproject = val;
        if (val === 'PJ005001') {
          this.show5 = true;
          this.show4 = false;
        } else if (val === 'PJ005002') {
          this.show4 = true;
          this.show5 = false;
        } else if (val === 'PJ005003') {
          this.show4 = true;
          this.show5 = false;
        } else if (val === 'PJ005004') {
          this.show4 = true;
          this.show5 = false;
        } else if (val === 'PJ005005') {
          this.show4 = true;
          this.show5 = false;
        } else if (val === 'PJ005006') {
          this.show4 = true;
          this.show5 = false;
        }
      },
      getUsername(val) {
        this.form.username = val;
        this.usernamelist = val;
        if (!this.form.username || this.form.username === '' || val === undefined) {
          this.errorusername = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_USER');
        } else {
          this.errorusername = '';
        }
      },
      getRecipientslist(val) {
        this.form.recipients = val;
        this.recipientslist = val;
        if (!this.form.recipients || this.form.recipients === '' || val === undefined) {
          this.errorrecipients = this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_RECIPIENTS');
        } else {
          this.errorrecipients = '';
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('save');
      },
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        // this.form.status = '2';
        this.buttonClick('save');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('save');
      },
      //add-ws-4/28-精算中，点击决裁，跳转画面
      checkparamsTitle() {
        let id = this.$route.params._checkid;
        let disable = this.$route.params._checkdisable;
        this.$router.push({
          name: 'PFANS1012FormView',
          params: {
            _id: id,
            disabled: disable,
          },
        });
      },

      paramsTitle() {
        this.$router.push({
          name: 'PFANS3005View',
        });
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
      buttonClick(val) {
        if (val === 'back') {
          //add-ws-4/28-精算中，点击决裁，跳转画面
          if (this.$route.params._check != null && this.$route.params._check != undefined) {
            if (this.$route.params._check) {
              this.checkparamsTitle();
            }
          } else if (this.$route.params._check5 != null && this.$route.params._check5 != undefined) {
            if (this.$route.params._check5) {
              this.checkparams();
            }
          } else {
            this.paramsTitle();
          }
          //add-ws-4/28-精算中，点击决裁，跳转画面
        } else if (val === 'trash') {
          this.dialogFormVisible = true;
          //this.$store.commit('global/SET_HISTORYURL', this.$route.path);
          // this.loading = true;
          // this.form.status = '1';
          // this.form.usertime = moment(this.form.usertime[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.usertime[1]).format('YYYY-MM-DD');
          // this.$store
          //     .dispatch('PFANS3005Store/updatePurchase', this.form)
          //     .then(response => {
          //         this.data = response;
          //         this.loading = false;
          //         if (val !== 'update') {
          //             Message({
          //                 message: this.$t('normal.success_02'),
          //                 type: 'success',
          //                 duration: 5 * 1000,
          //             });
          //             if (this.$store.getters.historyUrl) {
          //                 this.$router.push(this.$store.getters.historyUrl);
          //             }
          //         }
          //     })
          //     .catch(error => {
          //         this.$message.error({
          //             message: error,
          //             type: 'error',
          //             duration: 5 * 1000,
          //         });
          //         this.loading = false;
          //     });
        } else if (val === 'save') {
          this.$refs['refform'].validate(valid => {
            if (valid) {
              this.loading = true;
              if (this.form.careerplan === '0') {
                // this.form.businessplantype = '';
                // this.form.businessplanbalance = '';
                this.form.classificationtype = '';
              }
              this.form.surloappmoney = this.form.totalamount;
              // if (this.form.businessplantype === 'PR002001') {
              //   this.form.classificationtype = '';
              // } else if (this.form.businessplantype === 'PR002002') {
              //   this.form.classificationtype = '';
              // } else if (this.form.businessplantype === 'PR002003') {
              //   this.form.classificationtype = '';
              // } else if (this.form.businessplantype === 'PR002004') {
              //   this.form.classificationtype = '';
              // }
              this.form.usertime = moment(this.form.usertime[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.usertime[1]).format('YYYY-MM-DD');

              //add ccm 0811 事业计划金额小于总金额
              if (this.form.careerplan === '1') {
                if (Number(this.form.businessplanbalance) < Number(this.form.totalamount)) {
                  this.form.careerplan = '0';
                  this.radiochange(this.form.careerplan);
                }
              }
              //add ccm 0811 事业计划金额小于总金额

              if (this.$route.params._id) {
                this.form.purchase_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS3005Store/updatePurchase', this.form)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    if (val !== 'update') {
                      Message({
                        message: this.$t('normal.success_02'),
                        type: 'success',
                        duration: 5 * 1000,
                      });
                      if (this.$store.getters.historyUrl) {
                        this.$router.push(this.$store.getters.historyUrl);
                      }
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
                this.$store
                  .dispatch('PFANS3005Store/createPurchase', this.form)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
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
              }
            } else {
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
          });
        } else if (val === 'conapp') {
          this.$store.commit('global/SET_HISTORYURL', this.$route.path);
          //合同号申请
          let o = {};
          o.totalamount = this.form.totalamount;
          o.purnumbers = this.form.purnumbers;
          this.caigouhetongTable.push(o);

          //采购合同重复check
          this.$store
            .dispatch('PFANS1026Store/purchaseExistCheck', {'purnumbers': this.form.purnumbers})
            .then(response => {
              if (response.length === 0) {
                //合同号申请
                this.$router.push({
                  name: 'PFANS1033FormView',
                  params: {
                    _id: '',
                    _applicantdeptcode: this.form.center_id,
                    _caigouhetongTable: this.caigouhetongTable,
                    disabled: true,
                  },
                });
              } else {
                Message({
                  message: this.$t('label.PFANS3005VIEW_NUMBERS') + ' : ' + this.form.purnumbers + ' ' + this.$t('label.PFANS3005VIEW_MSG1'),
                  type: 'info',
                  duration: 3 * 1000,
                });
                return;
              }
              // if (this.$store.getters.historyUrl) {
              //   this.$router.push(this.$store.getters.historyUrl);
              // }
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
          //采购合同重复check

        }
        // else if (val === 'temLoanApp') {
        //   this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        //   //暂借款申请
        //   //del ccm 0813 决裁到暂借款，精算  check去掉
        //   // //check是否存在暂借款
        //   if (this.form.loanapno != null && this.form.loanapno != '' && this.form.loanapno != undefined) {
        //     Message({
        //       message: this.$t('label.PFANS3005VIEW_NUMBERS') + ' : ' + this.form.purnumbers + ' ' + this.$t('label.PFANS3005VIEW_LOANAPP'),
        //       type: 'info',
        //       duration: 3 * 1000,
        //     });
        //     return;
        //   } else {
        //   //del ccm 0813 决裁到暂借款，精算  check去掉
        //   //采购ID
        //   let purchase_id = [];
        //   //采购编号
        //   let purnumbers = [];
        //   //采购金额
        //   let moneys = [];
        //   //采购摘要
        //   let remarks = [];
        //   purnumbers = this.form.purnumbers + ',';
        //   purchase_id = this.form.purchase_id + ',';
        //   moneys = this.form.totalamount + ',';
        //   remarks = (this.form.remarks === null ? '' : this.form.remarks) + ',';
        //   //暂借款申请
        //   this.$router.push({
        //     name: 'PFANS1006FormView',
        //     params: {
        //       _id: '',
        //       _judgement: purchase_id,
        //       _judgement_name: purnumbers,
        //       _judgements_moneys: moneys,
        //       _remarks: remarks,
        //       _judgements_type: this.$t('label.PFANS1012VIEW_PURCHASSES'),
        //       disabled: true,
        //     },
        //   });
        //   //del ccm 0813 决裁到暂借款，精算  check去掉
        //   }
        //   //del ccm 0813 决裁到暂借款，精算  check去掉
        // }
        // else if (val === 'actuarial') {
        //   this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        //   //del ccm 0813 决裁到暂借款，精算  check去掉
        //   // if (this.form.invoiceno != null && this.form.invoiceno != '' && this.form.invoiceno != undefined) {
        //   //   Message({
        //   //     message: this.$t('label.PFANS3005VIEW_NUMBERS') + ' : ' + this.form.purnumbers + ' ' + this.$t('label.PFANS3005VIEW_INVOICENO'),
        //   //     type: 'info',
        //   //     duration: 3 * 1000,
        //   //   });
        //   //   return;
        //   // } else {
        //   //del ccm 0813 决裁到暂借款，精算  check去掉
        //   let optionsSEL = [];
        //   let user = getUserInfo(this.form.user_id);
        //   if (user) {
        //     this.form.user_id = getUserInfo(this.form.user_id).userinfo.customername;
        //   }
        //   var vote = {};
        //   vote.user_id = this.form.user_id;
        //   vote.remarks = this.form.purchasepurpose;
        //   vote.numbers = this.form.purnumbers;
        //   vote.value = this.form.purchase_id;
        //   vote.label = this.form.purnumbers;
        //   vote.judgements_moneys = this.form.totalamount;
        //   if (this.$i18n) {
        //     vote.judgements_type = this.$t('label.PFANS1012VIEW_PURCHASSES');
        //   }
        //   optionsSEL.push(vote);
        //   if (this.form.loanapno === null || this.form.loanapno === '' || this.form.loanapno === undefined) {
        //     //精算 没有暂借款
        //     this.$router.push({
        //       name: 'PFANS1012FormView',
        //       params: {
        //         _name: optionsSEL,
        //         _type: 'PJ001002',
        //         disabled: true,
        //       },
        //     });
        //   } else {
        //     //精算  带暂借款
        //     this.$router.push({
        //       name: 'PFANS1012FormView',
        //       params: {
        //         _name: optionsSEL,
        //         _type: 'PJ001002',
        //         _haveLoanapp: this.form.loanapplication_id,
        //         disabled: true,
        //       },
        //     });
        //   }
        //   //del ccm 0813 决裁到暂借款，精算  check去掉
        //   // }
        //   //del ccm 0813 决裁到暂借款，精算  check去掉
        // }
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
