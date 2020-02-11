<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PERSONNELPLAN')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_CENTER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_GROUP')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_TEAM')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.PFANS1036FORMVIEW_APPLICANT')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-tabs v-model="activeName2" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTAL')" name="first">
                    <el-table :data="tableA" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="120">
                          <template slot-scope="scope">
                            {{scope.row.aaa}}
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number4"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours4"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number5"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours5"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number6"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours6"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number7"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours7"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number8"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours8"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number9"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours9"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.numberfirsthalf"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghoursfirsthalf"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number10"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours10"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number11"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours11"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number12"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours12"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number1"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours1"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number2"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours2"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.number3"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghours3"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.numbersecondhalf"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghourssecondhalf"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.numberannual"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.workinghoursannual"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                    <el-table :data="tableB" header-cell-class-name="sub_bg_color_blue"  stripe>
                      <el-table-column>
                        <el-table-column align="center" width="120">
                          <template slot-scope="scope">

                            {{scope.row.aaa}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay4"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay4"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay5"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay5"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay6"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay6"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay7"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay7"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay8"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay8"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay9"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay9"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.payupper"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepayupper"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay10"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay10"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay11"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay11"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay12"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay12"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay1"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay1"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay2"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay2"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.pay3"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepay3"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.paylower"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepaylower"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.payyear"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.overtimepayyear"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_CURRENTPERSONNEL')" name="second">
                    <el-table :data="tableC" :summary-method="getCSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column align="center" width="110">
                        <template slot-scope="scope">

                          {{scope.row.ccc}}

                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_RANK')" align="center" width="110">
                        <template slot-scope="scope">

                          {{scope.row.ccc2}}

                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_MONEY46')" align="center" width="120">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" size="mini"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_MONEY73')" align="center" width="120">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" size="mini"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAYHOUR')" align="center"
                                       width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" size="mini"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_CAREER')" name="third">
                    <el-table :data="tableD" :summary-method="getDSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column align="center" width="110">
                        <template slot-scope="scope">

                          {{scope.row.ccc}}

                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_RANK')" align="center" width="110">
                        <template slot-scope="scope">

                          {{scope.row.ccc2}}

                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_MONEY46')" align="center" width="120">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" size="mini"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_MONEY73')" align="center" width="120">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" size="mini"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAYHOUR')" align="center"
                                       width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" size="mini"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" size="mini"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_EQUIPMENTINVESTMENT')" name="second">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_CENTER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_GROUP')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_TEAM')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.PFANS1036FORMVIEW_APPLICANT')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-tabs v-model="activeName3" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION')" name="first">
                    <el-table :data="tableE" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.aaa}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.bbb}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_NEWBUSINESSYEAR')" name="second">
                    <el-table :data="tableF" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETNAME')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETTYPE')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center"
                                         width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRowF(scope.$index, tableF)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRowF()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>

                    </el-table>
                    <el-table :data="tableG" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.aaa}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.bbb}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_LASTBUSINESSYEAR')" name="third">
                    <el-table :data="tableH" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">
                            {{scope.row.aaa}}
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.bbb}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_OTHER')" name="forth">
                    <el-table :data="tableI" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">
                            {{scope.row.aaa}}
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.bbb}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_SOFTWAREINVESTMENT')" name="third">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_CENTER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_GROUP')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.PFANS1036FORMVIEW_APPLICANT')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-tabs v-model="activeName4" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION')" name="first">
                    <el-table :data="tableE2" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">
                            {{scope.row.aaa}}
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">
                            {{scope.row.bbb}}
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_NEWBUSINESSYEAR')" name="second">
                    <el-table :data="tableF2" header-cell-class-name="sub_bg_color_blue" style="width: 100%"  class="tableClass"
                              :span-method="objectSpanMethod">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETNAME')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input  maxlength="20" style="width: 100%"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETTYPE')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.place1">
                              <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place2" controls-position="right"  :min="0" :max="10" style="width:8vw"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column prop="assetstype">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place3" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place4" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place5" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place6" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place7" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place8" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place9" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place10" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place11" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place12" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place13" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place14" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place15" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place16" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place17" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place18" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place19" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place20" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place21" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place22" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place23" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place24" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place25" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place26" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place27" controls-position="right"  :min="0" :max="10" style="width:6vw"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place28" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place29" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place30" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place31" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" >
                          <template slot-scope="scope">
                            <el-input-number v-model="scope.row.place32" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200" fixed="right">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRowF2(scope.$index, tableF2)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRowF2()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>

                    <el-table :data="tableG2" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.aaa}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.bbb}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_LASTBUSINESSYEAR')" name="third">
                    <el-table :data="tableH2" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.aaa}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.bbb}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_OTHER')" name="forth">
                    <el-table :data="tableI2" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.aaa}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.bbb}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TRAVELEXPENSES')" name="forth">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_CENTER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_GROUP')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_TEAM')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.PFANS1036FORMVIEW_APPLICANT')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-tabs v-model="activeName5" type="border-card">
                  <el-table :data="tableJ" header-cell-class-name="sub_bg_color_blue" stripe>
                    <el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_CONTENT')" align="center" width="110">
                        <template slot-scope="scope">

                          {{scope.row.jjj}}

                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center"
                                       width="120">
                        <template slot-scope="scope">

                          {{scope.row.jjj2}}

                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column>
                      <el-table-column align="center" width="110">
                        <template slot-scope="scope">

                          {{scope.row.jjj3}}

                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.April')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.May')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.June')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.July')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.August')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.September')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.October')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.November')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.December')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.January')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.February')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.March')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TIMES')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PROJECTPLAN')" name="fifth">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_CENTER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_GROUP')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_TEAM')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.PFANS1036FORMVIEW_APPLICANT')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-tabs v-model="activeName6" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTAL')" name="first">
                    <el-table :data="tableK" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <template slot-scope="scope">

                            {{scope.row.kkk}}

                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_1Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_2Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_3Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_4Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B1')" name="second">
                    <el-table :data="tableL" :summary-method="getLSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.lll"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center"
                                         width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRowL(scope.$index, tableL)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRowL()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B2')" name="third">
                    <el-table :data="tableM" :summary-method="getMSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center"
                                         width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRowM(scope.$index, tableM)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRowM()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B3')" name="forth">
                    <el-table :data="tableN" :summary-method="getNSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center"
                                         width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRowN(scope.$index, tableN)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRowN()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_VARIOUSFUNDS')" name="sixth">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_CENTER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_GROUP')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_TEAM')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.PFANS1036FORMVIEW_APPLICANT')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-tabs v-model="activeName7" type="border-card">
                  <el-table :data="tableO" :summary-method="getOSummaries" show-summary stripe
                            header-cell-class-name="sub_bg_color_blue">
                    <el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110">
                        <el-table-column>
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column width="140">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_CONTENTTHOUSAND')" align="center">
                        <el-table-column width="140">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_SMALLPROJECT')" align="center" width="110">
                        <el-table-column>
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICE')" align="center">
                        <el-table-column width="120">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TYPE')" align="center" width="110">
                        <el-table-column>
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.totalyear')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_TOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.operation')" align="center" width="200">
                      <template slot-scope="scope">
                        <el-button
                          :disabled="!disable"
                          @click.native.prevent="deleteRowO(scope.$index, tableO)"
                          plain
                          size="small"
                          type="danger"
                        >{{$t('button.delete')}}
                        </el-button>
                        <el-button
                          :disabled="!disable"
                          @click="addRowO()"
                          plain
                          size="small"
                          type="primary"
                        >{{$t('button.insert')}}
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PL')" name="seventh">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_CENTER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_GROUP')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_TEAM')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.PFANS1036FORMVIEW_APPLICANT')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-tabs v-model="activeName8" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PLTOTAL')" name="first">
                    <el-table :data="tableP" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="110">
                          <el-table-column>
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CONTENT')" align="center" width="110">
                          <el-table-column>
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.April')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.totalyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_TOTAL')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRowP(scope.$index, tableP)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRowP()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PLDETAILED')" name="second">
                    <el-table :data="tableQ" :summary-method="getQSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110">
                          <el-table-column>
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CONTENT')" align="center" width="110">
                          <el-table-column>
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PROJECT')" align="center">
                          <el-table-column PFANS1036FORMVIEW_PROJECT>
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.April')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.totalyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_TOTAL')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRowQ(scope.$index, tableQ)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRowQ()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-table :data="tableR" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CONTENT')" align="center" width="110">
                          <el-table-column>
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PROJECT')" align="center">
                          <el-table-column width="120">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.April')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.totalyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_TOTAL')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRowQ(scope.$index, tableQ)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRowQ()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import {telephoneNumber} from '@/utils/validate';
  import dicselect from '../../../components/dicselect';

  export default {
    name: 'PFANS1012FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
    },
    data() {
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
        if (this.form.telephone !== null && this.form.telephone !== '') {
          if (telephoneNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1036VIEW_TELEPHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        options1: [{
        value: '1',
        label: '1年'
      }, {
        value: '2',
        label: '3年'
      }, {
        value: '3',
        label: '5年'
      }],
        tableTValue: '',
        tablePValue: '',
        tableZValue: '',
        tableYValue: '',
        error: '',
        options: [],
        selectType: 'Single',
        title: 'title.PFANS1036VIEW',
        userlist: '',
        activeName: 'first',
        activeName2: 'first',
        activeName3: 'first',
        activeName4: 'first',
        activeName5: 'first',
        activeName6: 'first',
        activeName7: 'first',
        activeName8: 'first',
        loading: false,
        disable: false,
        disablecurr: false,
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        tableA: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_TOTALPLAN'),
            totalplan_id: '',
            businessplanid: '',
            number4: '',
            workinghours4: '',
            number5: '',
            workinghours5: '',
            number6: '',
            workinghours6: '',
            number7: '',
            workinghours7: '',
            number8: '',
            workinghours8: '',
            number9: '',
            workinghours9: '',
            number10: '',
            workinghours10: '',
            number11: '',
            workinghours11: '',
            number12: '',
            workinghours12: '',
            number1: '',
            workinghours1: '',
            number2: '',
            workinghours2: '',
            number3: '',
            workinghours3: '',
            numberfirsthalf: '',
            workinghoursfirsthalf: '',
            numbersecondhalf: '',
            workinghourssecondhalf: '',
            numberannual: '',
            workinghoursannual: '',
            rowindex: '',

          },
        ],
        tableB: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_TOTALPLAN'),
            pay4: '',
            overtimepay4: '',
            pay5: '',
            overtimepay5: '',
            pay6: '',
            overtimepay6: '',
            pay7: '',
            overtimepay7: '',
            pay8: '',
            overtimepay8: '',
            pay9: '',
            overtimepay9: '',
            pay10: '',
            overtimepay10: '',
            pay11: '',
            overtimepay11: '',
            pay12: '',
            overtimepay12: '',
            pay1: '',
            overtimepay1: '',
            pay2: '',
            overtimepay2: '',
            pay3: '',
            overtimepay3: '',
            payupper: '',
            overtimepayupper: '',
            paylower: '',
            overtimelower: '',
            payyear: '',
            overtimepayyear: '',
            rowindex: '',
          },
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTAL'),
          },
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALTHOUSAND'),
          },
        ],
        tableC: [
          {
            ccc: '出向者',
            ccc2: '参事以上',
          },
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        tableD: [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        tableE: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableE2: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableF: [

        ],
        tableF2: [
          {place:"1",place1:"1",assetstype:"0",plac2:"1",place3:"1",place4:"1",place5:"1",place6:"1",place7:"1",place8:"1",place9:"1",place10:"1",place11:"1",place12:"1",
            place13:"1",place14:"1",place15:"1",place16:"1",place17:"1",place18:"1",place19:"1",place20:"1",place21:"1",place22:"1",place23:"1",place24:"1",place25:"1",
            place26:"1",place27:"1",place28:"1",place29:"1",place30:"1",place31:"1",place32:"1"},
          {assetstype:"1"}
        ],
        tableG: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableG2: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableH: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableH2: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableI: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableI2: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableJ: [
          {
            jjj: this.$t('label.PFANS1036FORMVIEW_DOMESTICTRAVEL'),
            jjj2: '3.15',
            jjj3: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            jjj: '',
            jjj2: '',
            jjj3: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
          {
            jjj: this.$t('label.PFANS1036FORMVIEW_JAPANBUSINESSTRAVEL'),
            jjj2: '11.1',
            jjj3: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            jjj: '',
            jjj2: '',
            jjj3: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
          {
            jjj: this.$t('label.PFANS1036FORMVIEW_BUSINESSTRAVEL'),
            jjj2: '18.9',
            jjj3: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            jjj: '',
            jjj2: '',
            jjj3: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
          {
            jjj: this.$t('label.PFANS1036FORMVIEW_TOTAL'),
            jjj2: '',
            jjj3: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            jjj: '',
            jjj2: '',
            jjj3: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableK: [
          {
            kkk: this.$t('label.PFANS1036FORMVIEW_B1'),
          },
          {
            kkk: this.$t('label.PFANS1036FORMVIEW_B2'),
          },
          {
            kkk: this.$t('label.PFANS1036FORMVIEW_B3'),
          },
        ],
        tableL: [
          {},
        ],
        tableM: [
          {},
        ],
        tableN: [
          {},
        ],
        tableO: [
          {},
        ],
        tableP: [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        tableQ: [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        tableR: [
          {},
          {},
          {},
        ],
        baseInfo: {},
        form: {
          centerid: '',
          groupid: '',
          teamid: '',
          user_id: '',
        },
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
        },
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
        code7: '',
        code8: '',
        multiple: false,
        canStart: false,
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1036Store/selectById', {'businessplanid': this.$route.params._id})
          .then(response => {
            this.form = response.businessplan;
            if (response.totalplan.length > 0) {
              this.tableA = response.totalplan;
            }
            if (response.pieceworktotal.length > 0) {
              this.tableB = response.pieceworktotal;
            }
            this.userlist = this.form.user_id;
            this.baseInfo.businessplan = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.totalplan = JSON.parse(JSON.stringify(this.tableA));
            this.baseInfo.pieceworktotal = JSON.parse(JSON.stringify(this.tableB));
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
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.centerid = rst.centerNmae;
          this.form.groupid = rst.groupNmae;
          this.form.teamid = rst.teamNmae;
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
      }
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 34) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      getCSummaries(param) {
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
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getDSummaries(param) {
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
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getLSummaries(param) {
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
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getMSummaries(param) {
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
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getNSummaries(param) {
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
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getOSummaries(param) {
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
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getQSummaries(param) {
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
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        this.form.centerid = rst.centerNmae;
        this.form.groupid = rst.groupNmae;
        this.form.teamid = rst.teamNmae;
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
        this.buttonClick('save');
      },
      start() {
        this.form.status = '2';
        this.buttonClick('save');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('save');
      },
      deleteRowF(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowF() {
        this.tableF.push({});
      },
      deleteRowF2(index, rows) {
        if (rows.length > 2) {
          rows.splice(index, 2);
        }
      },
      addRowF2() {
        this.tableF2.push({assetstype:"0"});
        this.tableF2.push({assetstype:"1"});
      },
      deleteRowL(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowL() {
        this.tableL.push({});
      },
      deleteRowM(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowM() {
        this.tableM.push({});
      },
      deleteRowN(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowN() {
        this.tableN.push({});
      },
      deleteRowO(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowO() {
        this.tableO.push({});
      },
      deleteRowP(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowP() {
        this.tableP.push({});
      },
      deleteRowQ(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowQ() {
        this.tableQ.push({});
      },
      buttonClick(val) {
        if (val === 'back') {
          this.$router.push({
            name: 'PFANS1036View',
            params: {},
          });
        }
        if (val === 'save') {
          this.$refs['refform'].validate(valid => {
            if (valid) {
              this.baseInfo = {};
              this.form.user_id = this.userlist;
              this.baseInfo.businessplan = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.totalplan = [];
              this.baseInfo.pieceworktotal = [];
              // for (let i = 0; i < this.tableT.length; i++) {
              //   if (this.tableT[i].trafficdate !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
              //     || this.tableT[i].rmb !== '' || this.tableT[i].foreigncurrency !== '' || this.tableT[i].annexno !== '') {
              //     this.baseInfo.trafficdetails.push(
              //       {
              //         trafficdetails_id: this.tableT[i].trafficdetails_id,
              //         publicexpenseid: this.tableT[i].publicexpenseid,
              //         trafficdate: this.tableT[i].trafficdate,
              //         region: this.tableT[i].region,
              //         vehicle: this.tableT[i].vehicle,
              //         startingpoint: this.tableT[i].startingpoint,
              //         rmb: this.tableT[i].rmb,
              //         foreigncurrency: this.tableT[i].foreigncurrency,
              //         annexno: this.tableT[i].annexno,
              //       },
              //     );
              //   }
              // }
              // for (let i = 0; i < this.tableP.length; i++) {
              //   if (this.tableP[i].purchasedetailsdate !== '' || this.tableP[i].procurementdetails !== '' || this.tableP[i].procurementproject !== ''
              //     || this.tableP[i].rmb !== '' || this.tableP[i].foreigncurrency !== '' || this.tableP[i].annexno !== '') {
              //     if (this.tableP[i].procurementdetails === ' ') {
              //       this.tableP[i].procurementdetails = '';
              //     }
              //     this.baseInfo.purchasedetails.push(
              //       {
              //         purchasedetails_id: this.tableP[i].purchasedetails_id,
              //         publicexpenseid: this.tableP[i].publicexpenseid,
              //         purchasedetailsdate: this.tableP[i].purchasedetailsdate,
              //         procurementdetails: this.tableP[i].procurementdetails,
              //         procurementproject: this.tableP[i].procurementproject,
              //         rmb: this.tableP[i].rmb,
              //         foreigncurrency: this.tableP[i].foreigncurrency,
              //         annexno: this.tableP[i].annexno,
              //       },
              //     );
              //   }
              // }
              // for (let i = 0; i < this.tableR.length; i++) {
              //   if (this.tableR[i].otherdetailsdate !== '' || this.tableR[i].costitem !== '' || this.tableR[i].remarks !== ''
              //     || this.tableR[i].rmb !== '' || this.tableR[i].foreigncurrency !== '' || this.tableR[i].annexno !== '') {
              //     this.baseInfo.otherdetails.push(
              //       {
              //         otherdetails_id: this.tableR[i].otherdetails_id,
              //         publicexpenseid: this.tableR[i].publicexpenseid,
              //         otherdetailsdate: this.tableR[i].otherdetailsdate,
              //         costitem: this.tableR[i].costitem,
              //         remarks: this.tableR[i].remarks,
              //         rmb: this.tableR[i].rmb,
              //         foreigncurrency: this.tableR[i].foreigncurrency,
              //         annexno: this.tableR[i].annexno,
              //       },
              //     );
              //   }
              // }
              if (this.$route.params._id) {
                this.baseInfo.businessplan.businessplanid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1036Store/updateBusinessplan', this.baseInfo)
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
                        name: 'PFANS1036View',
                      });
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
                this.$store
                  .dispatch('PFANS1036Store/createBusinessplan', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.$router.push({
                      name: 'PFANS1036View',
                    });
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
        }
      },
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-table {
    overflow-x: auto;
  }

  .el-table__header-wrapper,
  .el-table__body-wrapper,
  .el-table__footer-wrapper {

  }

  .el-table::after {
    position: relative;
  }

  .el-table--scrollable-x .el-table__body-wrapper {

  }

  .tableClass {
    .el-table__fixed-right {
      height: 100% !important;
    }
  }

  /*.el-table tbody tr:hover>td { background-color: #fafafa }*/

  /*.el-table__fixed-right tbody tr:hover>td {*/
  /*  background-color: #fafafa;*/
  /*}*/

  .el-table__body .el-table__row.hover-row td{
    background-color: #fafafa;
  }
</style>
