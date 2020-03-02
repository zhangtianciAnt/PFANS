<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
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
                      <el-table-column align="center" width="110" :formatter="formatterColumn" prop="type">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_RANK')" align="center" width="110" :formatter="formatterColumn" prop="level">
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
                                      v-model.trim="scope.row.place">

                            </el-input>
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
                <AssetsComponent :tableNewYear="equipmentNewyear" :tableLastYear="equipmentLastyear"></AssetsComponent>
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
                    <el-table :data="tableL" :summary-method="getNSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="false"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.companyname"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center"
                                         width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false" :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)"
                                             :step="1" v-model.trim="scope.row.commission" :no="scope.row" ></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="210">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1"
                                             v-model.trim="scope.row.number4" :no="scope.row" >
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money4"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number5"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money5"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number6"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money6"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number7"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money7"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number8"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money8"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number9"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money9"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" @change="changeSum(scope.row)" :no="scope.row"
                                             v-model.trim="scope.row.numberfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.moneyfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number10"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money10"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number11"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money11"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number12"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money12"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number1"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money1"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number2"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money2"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number3"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money3"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.numbersecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.moneysecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.numberAnnual"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.moneyAnnual"></el-input-number>
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
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B2')" name="third">
                    <el-table :data="tableM" :summary-method="getNSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="false"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.companyname"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center"
                                         width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false" :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)"
                                             :step="1" v-model.trim="scope.row.commission" :no="scope.row" ></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="210">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1"
                                             v-model.trim="scope.row.number4" :no="scope.row" >
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money4"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number5"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money5"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number6"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money6"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number7"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money7"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number8"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money8"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number9"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money9"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" @change="changeSum(scope.row)" :no="scope.row"
                                             v-model.trim="scope.row.numberfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.moneyfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number10"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money10"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number11"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money11"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number12"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money12"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number1"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money1"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number2"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money2"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number3"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money3"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.numbersecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.moneysecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.numberAnnual"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.moneyAnnual"></el-input-number>
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

                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B3')" name="forth">
                    <el-table :data="tableN" :summary-method="getNSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_BUSHU')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="false"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.companyname"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center"
                                         width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false" :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)"
                                             :step="1" v-model.trim="scope.row.commission" :no="scope.row" ></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="210">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1"
                                      v-model.trim="scope.row.number4" :no="scope.row" >
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money4"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number5"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money5"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number6"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money6"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number7"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money7"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number8"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money8"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number9"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money9"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" @change="changeSum(scope.row)" :no="scope.row"
                                      v-model.trim="scope.row.numberfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.moneyfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number10"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money10"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number11"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money11"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number12"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money12"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number1"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money1"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number2"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money2"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number3"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money3"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.numbersecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.moneysecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.numberAnnual"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.moneyAnnual"></el-input-number>
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
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B4')" name="fifth">
                    <el-table :data="tableO" :summary-method="getNSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS5008VIEW_PROGRAM')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="false"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.companyname"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center"
                                         width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false" :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)"
                                             :step="1" v-model.trim="scope.row.commission" :no="scope.row" ></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="210">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1"
                                             v-model.trim="scope.row.number4" :no="scope.row" >
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money4"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number5"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money5"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number6"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money6"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number7"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money7"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number8"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money8"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number9"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money9"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" @change="changeSum(scope.row)" :no="scope.row"
                                             v-model.trim="scope.row.numberfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.moneyfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number10"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money10"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number11"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money11"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number12"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money12"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number1"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money1"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number2"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money2"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number3"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money3"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.numbersecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.moneysecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.numberAnnual"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.moneyAnnual"></el-input-number>
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
  import AssetsComponent from './AssetsComponent';
  export default {
    name: 'PFANS1012FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
      AssetsComponent
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
        month:"",
        equipment_newyear: [{assetstype:"0"},{assetstype:"1"}],
        equipment_lastyear: [{assetstype:"0"},{assetstype:"1"}],
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
          {},{},{},{},{},{},{},{},{},{},{},{},{}
        ],
        tableD: [
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
          {assetstype:"0"},
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
          {
              businessplandet_id:'',
              businessplan_id:'',
              plantype:'4',
              companyname:'',
              commission:'',
              prices:'',
              number4:'',
              money4:'',
              number5:'',
              money5:'',
              number6:'',
              money6:'',
              number7:'',
              money7:'',
              number8:'',
              money8:'',
              number9:'',
              money9:'',
              number10:'',
              money10:'',
              number11:'',
              money11:'',
              number12:'',
              money12:'',
              number1:'',
              money1:'',
              number2:'',
              money2:'',
              number3:'',
              money3:'',
              numberfirsthalf:'',
              moneyfirsthalf:'',
              numbersecondhalf:'',
              moneysecondhalf:'',
              numberAnnual:'',
              moneyAnnual:'',

          },
        ],
        tableO: [
          {
              businessplandet_id:'',
              businessplan_id:'',
              plantype:'4',
              companyname:'',
              commission:'',
              number4:'',
              money4:'',
              number5:'',
              money5:'',
              number6:'',
              money6:'',
              number7:'',
              money7:'',
              number8:'',
              money8:'',
              number9:'',
              money9:'',
              number10:'',
              money10:'',
              number11:'',
              money11:'',
              number12:'',
              money12:'',
              number1:'',
              money1:'',
              number2:'',
              money2:'',
              number3:'',
              money3:'',
              numberfirsthalf:'',
              moneyfirsthalf:'',
              numbersecondhalf:'',
              moneysecondhalf:'',
              numberAnnual:'',
              moneyAnnual:'',
          },
        ],
        tableP: [
        ],
        tableQ: [
        ],
        tableR: [
          {},
          {},
          {},
        ],
        baseInfo: {},

        arrayMonth: [],

        form: {
          centerid: '',
          groupid: '',
          teamid: '',
          user_id: '',
          trustb3: '',
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

            if (response.businessplandets.length > 0) {
                this.tableN = response.businessplandets;
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
      changeSum(row) {
            row.money4 = row.commission * row.number4 / 1000;
            row.money5 = row.commission * row.number5 / 1000;
            row.money6 = row.commission * row.number6 / 1000;
            row.money7 = row.commission * row.number7 / 1000;
            row.money8 = row.commission * row.number8 / 1000;
            row.money9 = row.commission * row.number9 / 1000;
            row.money10 = row.commission * row.number10 / 1000;
            row.money11 = row.commission * row.number11 / 1000;
            row.money12 = row.commission * row.number12 / 1000;
            row.money1 = row.commission * row.number1 / 1000;
            row.money2 = row.commission * row.number2 / 1000;
            row.money3 = row.commission * row.number3 / 1000;
            row.numberfirsthalf = (row.number4 + row.number5 + row.number6 + row.number7 + row.number8 + row.number9);
            row.moneyfirsthalf = row.money4 + row.money5 + row.money6 + row.money7 + row.money8 + row.money9;
            row.numbersecondhalf = row.number10 + row.number11 + row.number12 + row.number1 + row.number2 + row.number3;
            row.moneysecondhalf = row.money10 + row.money11 + row.money12 + row.money1 + row.money2 + row.money3;
            row.numberAnnual = row.numberfirsthalf + row.numbersecondhalf;
            row.moneyAnnual = row.moneyfirsthalf + row.moneysecondhalf;
          },
      formatterColumn(row,column,cellValue, index){
        if(column.property === "type"){
          if(index === 0){
            return this.$t('label.PFANS1013FORMVIEW_CHUXIANGZHE');
          }else if(index === 2){
            return this.$t('label.PFANSUSERVIEW_MEMBERS');
          }
        }else if(column.property === "level"){
          if(index === 0){
            return "参事以上";
          }else if(index === 1){
            return "主事以下";
          }else if(index === 2){
            return "R10";
          }else if(index === 3){
            return "R9A";
          }else if(index === 4){
            return "R9B";
          }else if(index === 5){
            return "R8A";
          }else if(index === 6){
            return "R8B";
          }else if(index === 7){
            return "R8C";
          }else if(index === 8){
            return "R7";
          }else if(index === 9){
            return "R6";
          }else if(index === 10){
            return "R5";
          }else if(index === 11){
            return "R4";
          }else if(index === 12){
            return "R3";
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
      deleteRowF(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowF() {
        this.tableF.push({});
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
        this.tableN.push({
            businessplandet_id:'',
            plantype:'',
            companyname:'',
            commission:'',
            number4:'',
            money4:'',
            number5:'',
            money5:'',
            number6:'',
            money6:'',
            number7:'',
            money7:'',
            number8:'',
            money8:'',
            number9:'',
            money9:'',
            number10:'',
            money10:'',
            number11:'',
            money11:'',
            number12:'',
            money12:'',
            number1:'',
            money1:'',
            number2:'',
            money2:'',
            number3:'',
            money3:'',
            numberfirsthalf:'',
            moneyfirsthalf:'',
            numbersecondhalf:'',
            moneysecondhalf:'',
            numberAnnual:'',
            moneyAnnual:'',
        });
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

                for(let i =0; i < this.tableN.length; i++){
                    if(this.tableN[i].companyname !=null || this.tableN[i].commission !=null || this.table[i].number4 != null || this.table[i].money4 != null ||
                        this.tableN[i].number5 !=null || this.tableN[i].money5 !=null || this.table[i].number6 != null || this.table[i].money6 != null ||
                        this.tableN[i].number7 !=null || this.tableN[i].money7 !=null || this.table[i].number8 != null ||
                        this.tableN[i].money8 !=null || this.tableN[i].number9 !=null || this.table[i].money9 != null ||
                        this.tableN[i].number10 !=null || this.tableN[i].money10 !=null || this.table[i].number11 != null ||
                        this.tableN[i].money11 !=null || this.tableN[i].number12 !=null || this.table[i].money12 != null ||
                        this.tableN[i].number1 !=null || this.tableN[i].money1 !=null || this.table[i].number2 != null ||
                        this.tableN[i].money2 !=null || this.tableN[i].number3 !=null || this.table[i].money3 != null ||
                        this.tableN[i].numberfirsthalf !=null || this.tableN[i].moneyfirsthalf !=null || this.table[i].numbersecondhalf != null ||
                        this.tableN[i].moneysecondhalf !=null || this.tableN[i].numberAnnual !=null || this.table[i].moneyAnnual != null)
                    {
                        for(let i = 0;i < this.tableN.length; i++){
                            this.arrayMonth.push({
                                m0:this.tableN[i].businessplan_id,
                                m1: this.tableN[i].companyname,
                                m2: this.tableN[i].commission,
                                m3: this.tableN[i].prices,
                                m4: this.tableN[i].number4,
                                m5: this.tableN[i].money4,
                                m6: this.tableN[i].number5,
                                m7: this.tableN[i].money5,
                                m8: this.tableN[i].number6,
                                m9: this.tableN[i].money6,
                                m10: this.tableN[i].number7,
                                m11: this.tableN[i].money7,
                                m12: this.tableN[i].number8,
                                m13: this.tableN[i].money8,
                                m14: this.tableN[i].number9,
                                m15: this.tableN[i].money9,
                                m16: this.tableN[i].number10,
                                m17: this.tableN[i].money10,
                                m18: this.tableN[i].number11,
                                m19: this.tableN[i].money11,
                                m20: this.tableN[i].number12,
                                m21: this.tableN[i].money12,
                                m22: this.tableN[i].number1,
                                m23: this.tableN[i].money1,
                                m24: this.tableN[i].money2,
                                m25: this.tableN[i].number3,
                                m26: this.tableN[i].money3,
                                m27: this.tableN[i].numberfirsthalf,
                                m28: this.tableN[i].moneyfirsthalf,
                                m28: this.tableN[i].numbersecondhalf,
                                m29: this.tableN[i].moneysecondhalf,
                                m30: this.tableN[i].numberAnnual,
                                m31: this.tableN[i].moneyAnnual,

                            })
                        }
                        this.form.trustb3 = JSON.stringify(this.arrayMonth);
                    }
                }
              this.baseInfo.businessplan = JSON.parse(JSON.stringify(this.form));

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
