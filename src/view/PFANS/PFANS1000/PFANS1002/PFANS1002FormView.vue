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
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_INFORMATION')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.center')">
                      <el-input :disabled="true" style="width: 20vw" v-model="form.center_id"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.group')">
                      <el-input :disabled="true" style="width: 20vw" v-model="form.group_id"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.team')">
                      <el-input :disabled="true" style="width: 20vw" v-model="form.team_id"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.application_date')" prop="applicationdate">
                      <div class="block">
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 20vw"
                          type="date"
                          v-model="form.applicationdate">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS5009VIEW_PROJECTNAME')" prop="projectname">
                      <div class="dpSupIndex" style="width: 19vw" prop="projectname">
                        <el-container>
                          <input class="content bg" v-model="form.projectname"
                                 :disabled="true"></input>
                          <el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible = true"
                                     size="small"></el-button>
                          <el-dialog :title="$t('label.PFANS5009VIEW_PROJECTNAME')" :visible.sync="dialogTableVisible"
                                     center size="50%"
                                     top="8vh" lock-scroll
                                     append-to-body>
                            <div style="text-align: center">
                              <el-row style="text-align: center;height: 90%;overflow: hidden">
                                <el-table
                                  :data="gridData.filter(data => !search || data.projectname.toLowerCase().includes(search.toLowerCase()))"
                                  height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                  @row-click="handleClickChange">
                                  <el-table-column property="numbers"
                                                   :label="$t('label.PFANS5004VIEW_PROJECTNUMBER')"
                                                   width="200"></el-table-column>
                                  <el-table-column property="projectname"
                                                   :label="$t('label.PFANS5009VIEW_PROJECTNAME')"
                                                   width="200"></el-table-column>
                                  <el-table-column
                                    align="right" width="230">
                                    <template slot="header" slot-scope="scope">
                                      <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="请输入供应商关键字搜索"/>
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
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_CONDOMINIUMCOMPANY1')" prop="condominiumcompany">
                      <el-input :disabled="!disable" maxlength="20" style="width: 20vw"
                                v-model.trim="form.condominiumcompany"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_REGION')" prop="region">
                      <dicselect
                        :code="code2"
                        :data="form.region"
                        :disabled="!disable"
                        :multiple="multiple"
                        @change="getregion"
                        style="width: 20vw"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_CITY1')" prop="city">
                      <el-input :disabled="!disable" maxlength="20" style="width: 20vw"
                                v-model.trim="form.city" @change="cityChange"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_STARTDATE1')" prop="startdate">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 20vw"
                            type="date"
                            v-model="form.startdate"
                            @change="startDateChange"
                          >
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ENDDATE1')" prop="enddate">
                      <div class="block">
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 20vw"
                          type="date"
                          v-model="form.enddate"
                          @change="endDateChange"
                        >
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_DATENUMBER1')" prop="datenumber">
                      <el-input :disabled="true" style="width: 20vw" v-model="form.datenumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_LEVEL')" prop="level">
                      <dicselect
                        :code="code1"
                        :data="form.level"
                        :disabled="!disable"
                        :multiple="multiple"
                        @change="getlevel"
                        style="width: 20vw"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ABROADBUSINESS')" prop="abroadbusiness">
                      <el-switch
                        :disabled="!disable"
                        active-value="1"
                        inactive-value="0"
                        v-model="form.abroadbusiness"
                      >
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_PURPOSE')" name="second">
              <div>
                <el-row type="flex">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_OBJECTIVETYPE')" prop="objectivetype">
                      <dicselect
                        :code="code3"
                        :data="form.objectivetype"
                        :disabled="!disable"
                        :multiple="multiple"
                        @change="getobjectivetype"
                        style="width: 20vw"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_OBJECTIVETYPEOTHER')" prop="objectivetypeother"
                                  v-if="show">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model.trim="form.objectivetypeother"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item prop="details">
                      <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                                v-model="form.details"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_CONTENT')" name="third">
              <el-row>
                <el-col :span="24">
                  <el-table :data="tablePD" header-cell-class-name="sub_bg_color_blue" stripe border
                            style="width: 70vw">
                    <el-table-column :label="$t('label.PFANS1002VIEW_TRAVELCONTENTDATE2')" align="center"
                                     prop="startdate"
                                     width="370">
                      <template slot-scope="scope">
                        <el-date-picker
                          v-model.trim="scope.row.duringdate"
                          class="bigWidth"
                          :disabled="!disable"
                          type="daterange"
                          unlink-panels
                          style="width:20vw"
                          :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                          :start-placeholder="$t('label.startdate')"
                          :end-placeholder="$t('label.enddate')"
                        >
                        </el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1002VIEW_PLACE2')" align="center">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                  v-model.trim="scope.row.place"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1002VIEW_CONTENT2')" align="center">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                  v-model.trim="scope.row.content"></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_RELATION')" name="fourth">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                      <dicselect
                        :code="code4"
                        :data="form.budgetunit"
                        :disabled="!disable"
                        :multiple="multiple"
                        @change="getbudgetunit"
                        style="width: 20vw"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_PLAN1')" prop="plan">
                      <span style="margin-right: 1rem ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.plan"
                        active-value="1"
                        inactive-value="0"
                        @change="getplan1"
                      >
                      </el-switch>
                      <span style="margin-left: 1rem ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_PLANTYPE')" prop="plantype" v-if="show2">
                      <dicselect
                        style="width: 20vw"
                        :disabled="!disable"
                        :code="code5"
                        :multiple="multiple"
                        :data="form.plantype"
                        @change="getplantype"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_CLASSIFICATIONTYPE')" prop="classificationtype"
                                  v-if="show3">
                      <dicselect
                        style="width: 20vw"
                        :disabled="!disable"
                        :code="code6"
                        :multiple="multiple"
                        :data="form.classificationtype"
                        @change="getclassificationtype"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS3003FORMVIEW_BALANCE')" prop="balance" v-if="show2">
                      <el-input-number
                        :disabled="!disable"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="1"
                        controls-position="right"
                        style="width: 20vw"
                        v-model="form.balance">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_MONEYS')" prop="moneys">
                      <el-input-number
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="1"
                        controls-position="right"
                        style="width: 20vw"
                        v-model.trim="form.moneys">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_FOREIGNCURRENCY')" prop="foreigncurrency">
                      <el-input-number
                        :disabled="!disable"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="1"
                        controls-position="right"
                        style="width: 20vw"
                        v-model.trim="form.foreigncurrency"
                        @change="getforeigncurrency">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_CURRENCY')" prop="currency">
                      <dicselect :code="code7"
                                 :data="form.currency"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getCurrency"
                                 style="width: 20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_DOLLARFXRATE')" prop="dollarfxrate" v-if="show4">
                      <el-input :disabled="true" style="width: 20vw" v-model="form.dollarfxrate"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_JPYFXRATE')" prop="jpyfxrate" v-if="show5">
                      <el-input :disabled="true" style="width: 20vw" v-model="form.jpyfxrate"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_OTHERFXRATE')" prop="otherfxrate" v-if="show6">
                      <el-input-number
                        :disabled="!disable"
                        :max="99999"
                        :min="0"
                        :step="0.01"
                        controls-position="right"
                        style="width: 20vw"
                        v-model.trim="form.otherfxrate"
                        @change="getotherfxrate">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_BOOKINGDAY')" prop="bookingday">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 20vw"
                            type="date"
                            v-model="form.bookingday">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_ACTUARIALDATE')" prop="actuarialdate">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 20vw"
                            type="date"
                            v-model="form.actuarialdate">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_RECRUITMENT')" prop="recruitment">
                      <el-switch
                        :disabled="!disable"
                        active-value="1"
                        inactive-value="0"
                        v-model="form.recruitment"
                      >
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_LOANDAY1')" prop="loanday">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 20vw"
                            type="date"
                            v-model="form.loanday">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_LOANMONEY1')" prop="loanmoney">
                      <el-input-number
                        :disabled="!disable"
                        :max="999999999"
                        :min="0"
                        :precision="2"
                        :step="1"
                        controls-position="right"
                        style="width: 20vw"
                        v-model.trim="form.loanmoney">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ACCOMMODATIONCOST1')" prop="accommodationcost">
                      <dicselect :code="code8"
                                 :data="form.accommodationcost"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getaccommodationcost1"
                                 style="width: 20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ACCOMMODATION1')" prop="accommodation">
                      <dicselect :code="code9"
                                 :data="form.accommodation"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getaccommodation1"
                                 style="width: 20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ACCOMMODATIONEXPENSES')" prop="accommodationexpenses">
                      <el-switch
                        :disabled="!disable"
                        active-value="1"
                        inactive-value="0"
                        v-model="form.accommodationexpenses"
                      >
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_PASSPORTNO')" prop="passportno">
                      <el-input :disabled="!disable" maxlength="20" style="width: 20vw"
                                v-model.trim="form.passportno"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_DURATIONSTART')" prop="durationstart">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 20vw"
                            type="date"
                            v-model="form.durationstart">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_DURATIONEND')" prop="durationend">
                      <div class="block">
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 20vw"
                          type="date"
                          v-model="form.durationend">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_VISA')" prop="visa">
                      <dicselect :code="code10"
                                 :data="form.visa"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getvisa"
                                 style="width: 20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_VALIDSTART')" prop="validstart">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 20vw"
                            type="date"
                            v-model="form.validstart">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_VALIDEND')" prop="validend">
                      <div class="block">
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 20vw"
                          type="date"
                          v-model="form.validend">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_PERMIT')" prop="permit">
                      <dicselect :code="code11"
                                 :data="form.permit"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getpermit"
                                 style="width: 20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_SCHEDULED')" prop="scheduled">
                      <el-input-number
                        :disabled="!disable"
                        :max="99999"
                        :min="0"
                        :precision="1"
                        :step="1"
                        controls-position="right"
                        style="width: 20vw"
                        v-model.trim="form.scheduled">
                      </el-input-number>
                      {{$t('label.day')}}
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_MANAGEMENT')" name="fifth">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_PROVISION')" prop="provision">
                      <el-switch
                        :disabled="!disable"
                        v-model="form.provision"
                        active-value="1"
                        inactive-value="0"
                        @change="getprovision"
                      >
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1002VIEW_TECHNOLOGY')" prop="technology" v-if="show7">
                      <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                                v-model="form.technology"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_JUDGMENT')" prop="judgment">
                      <dicselect
                        style="width: 20vw"
                        :disabled="!disable"
                        :code="code12"
                        :multiple="multiple"
                        :data="form.judgment"
                        @change="getjudgment"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_JUDGMENTNO')" prop="judgmentno" v-if="show8">
                      <el-input :disabled="!disable" maxlength="20" style="width: 20vw"
                                v-model.trim="form.judgmentno"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_PASSENGERS1')" prop="passengers">
                      <el-switch
                        :disabled="!disable"
                        v-model="form.passengers"
                        active-value="1"
                        inactive-value="0"
                        @change="getpassengers1"
                      >
                      </el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_FIXEDASSETSNO1')" prop="fixedassetsno"
                                  v-if="show9">
                      <el-input :disabled="!disable" maxlength="20" style="width: 20vw"
                                v-model.trim="form.fixedassetsno"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_OTHERS1')" name="sixth">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_EXTERNAL')" prop="external">
                      <el-switch
                        :disabled="!disable"
                        v-model="form.external"
                        active-value="1"
                        inactive-value="0"
                        @change="getexternal"
                      >
                      </el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item :label="$t('label.PFANS1002VIEW_REGULATIONS')" prop="regulations" v-if="show10">
                      <el-input-number
                        :disabled="!disable"
                        :max="99999"
                        :min="0"
                        :precision="2"
                        :step="1"
                        controls-position="right"
                        style="width: 20vw"
                        v-model.trim="form.regulations">
                      </el-input-number>
                      {{$t('label.yuan')}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1002VIEW_REASON1')" prop="reason" v-if="show10">
                      <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                                v-model="form.reason"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1002VIEW_OTHEREXPLANATION1')" prop="otherexplanation">
                      <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                                v-model="form.otherexplanation"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
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
  import moment from 'moment';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import dicselect from '../../../components/dicselect';
  import {getDictionaryInfo} from '../../../../utils/customize';

  export default {
    name: 'PFANS1002FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      var validatestartdate1 = (rule, value, callback) => {
        if (this.form.startdate !== null && this.form.startdate !== '' && this.form.enddate !== '' && this.form.enddate !== null) {
          if (moment(this.form.enddate).format('YYYY-MM-DD') < moment(this.form.startdate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS1002FORMVIEW_ERROR1')));
          } else {
            this.form.datenumber = moment(this.form.enddate).diff(moment(this.form.startdate), 'days') + 1;
            callback();
          }
        } else {
          this.form.datenumber = 0;
          callback();
        }
      };
      var validateenddate1 = (rule, value, callback) => {
        if (this.form.startdate !== '' && this.form.startdate !== null && this.form.enddate !== '' && this.form.enddate !== null) {
          if (moment(this.form.enddate).format('YYYY-MM-DD') < moment(this.form.startdate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS1002FORMVIEW_ERROR1')));
          } else {
            this.form.datenumber = moment(this.form.enddate).diff(moment(this.form.startdate), 'days') + 1;
            callback();
          }
        } else {
          this.form.datenumber = 0;
          callback();
        }
      };
      var validatedurationstart = (rule, value, callback) => {
        if (this.form.durationstart !== '' && this.form.durationstart !== null && this.form.durationend !== '' && this.form.durationend !== null) {
          if (moment(this.form.durationend).format('YYYY-MM-DD') <= moment(this.form.durationstart).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS1002FORMVIEW_ERROR2')));
          }
        }
        callback();
      };
      var validatedurationend = (rule, value, callback) => {
        if (this.form.durationstart !== '' && this.form.durationstart !== null && this.form.durationend !== '' && this.form.durationend !== null) {
          if (moment(this.form.durationend).format('YYYY-MM-DD') <= moment(this.form.durationstart).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS1002FORMVIEW_ERROR2')));
          }
        }
        callback();
      };
      var validatevalidstart = (rule, value, callback) => {
        if (this.form.validstart !== '' && this.form.validstart !== null && this.form.validend !== '' && this.form.validend !== null) {
          if (moment(this.form.validend).format('YYYY-MM-DD') <= moment(this.form.validstart).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS1002FORMVIEW_ERROR2')));
          }
        }
        callback();
      };
      var validatevalidend = (rule, value, callback) => {
        if (this.form.validstart !== '' && this.form.validstart !== null && this.form.validend !== '' && this.form.validend !== null) {
          if (moment(this.form.validend).format('YYYY-MM-DD') <= moment(this.form.validstart).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS1002FORMVIEW_ERROR2')));
          }
        }
        callback();
      };
      return {
        disable: false,
        error: '',
        selectType: 'Single',
        title: 'title.PFANS1002VIEW',
        userlist: '',
        activeName: 'first',
        loading: false,
        disabled: false,
        code1: 'PJ016',
        code2: 'PJ017',
        code3: 'PJ018',
        code4: 'PG002',
        code5: 'PR002',
        code6: 'PR003',
        code7: 'PJ003',
        code8: 'PJ019',
        code9: 'PJ020',
        code10: 'PJ021',
        code11: 'PJ022',
        code12: 'PJ023',
        multiple: false,
        search: '',
        gridData: [],
        dialogTableVisible: false,
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          applicationdate: moment(new Date()).format('YYYY-MM-DD'),
          businesstype: '',
          level: '',
          condominiumcompany: '',
          region: '',
          city: '',
          startdate: '',
          enddate: '',
          projectname: '',
          datenumber: '0',
          abroadbusiness: '',
          objectivetype: '',
          objectivetypeother: this.$t('label.PFANS1002VIEW_OTHER'),
          details: '',
          budgetunit: '',
          plan: '',
          plantype: '',
          classificationtype: '',
          balance: '',
          moneys: '',
          foreigncurrency: '',
          currency: '',
          dollarfxrate: '',
          jpyfxrate: '',
          otherfxrate: '',
          bookingday: '',
          actuarialdate: '',
          recruitment: '',
          loanday: '',
          loanmoney: '',
          accommodationcost: '',
          accommodation: '',
          accommodationexpenses: '',
          passportno: '',
          durationstart: '',
          durationend: '',
          visa: '',
          validstart: '',
          validend: '',
          permit: '',
          scheduled: '',
          provision: '',
          technology: '',
          judgment: '',
          judgmentno: '',
          passengers: '',
          fixedassetsno: '',
          external: '',
          regulations: '',
          reason: '',
          otherexplanation: '',
        },
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        tableP: [{
          travelcontent_id: '',
          businessid: '',
          duringdate1: '',
          content1: '',
          duringdate2: '',
          content2: '',
          duringdate3: '',
          content3: '',
          rowindex: '',
        }],
        tablePD: [
          {
            duringdate: '',
            place: '',
            content: '',
          },
          {
            duringdate: '',
            place: '',
            content: '',
          },
          {
            duringdate: '',
            place: '',
            content: '',
          },
        ],
        baseInfo: {},
        rules: {
          user_id: [
            {
              required: true,
              validator: validateUserid,
              trigger: 'change',
            },
          ],
          applicationdate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.application_date'),
              trigger: 'blur',
            },
          ],
          level: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_LEVEL'),
              trigger: 'change',
            },
          ],
          condominiumcompany: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_CONDOMINIUMCOMPANY1'),
              trigger: 'blur',
            },
          ],
          region: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_REGION'),
              trigger: 'change',
            },
          ],
          city: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_CITY1'),
              trigger: 'blur',
            },
          ],
          startdate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_STARTDATE1'),
              trigger: 'blur',
            },
            {validator: validatestartdate1, trigger: 'blur'},
          ],
          enddate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_ENDDATE1'),
              trigger: 'blur',
            },
            {validator: validateenddate1, trigger: 'blur'},
          ],
          abroadbusiness: [
            {
              required: true,
            },
          ],
          objectivetype: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_OBJECTIVETYPE'),
              trigger: 'change',
            },
          ],
          objectivetypeother: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_OBJECTIVETYPEOTHER'),
              trigger: 'blur',
            },
          ],
          details: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_DETAILS'),
              trigger: 'blur',
            },
          ],
          budgetunit: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
              trigger: 'change',
            },
          ],
          plantype: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_PLANTYPE'),
              trigger: 'change',
            },
          ],
          classificationtype: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_CLASSIFICATIONTYPE'),
              trigger: 'change',
            },
          ],
          balance: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_BALANCE'),
              trigger: 'blur',
            },
          ],
          moneys: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_MONEYS'),
              trigger: 'blur',
            },
          ],
          foreigncurrency: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_FOREIGNCURRENCY'),
              trigger: 'blur',
            },
          ],
          currency: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_CURRENCY'),
              trigger: 'change',
            },
          ],
          otherfxrate: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_OTHERFXRATE'),
              trigger: 'blur',
            },
          ],
          bookingday: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_BOOKINGDAY'),
              trigger: 'blur',
            },
          ],
          actuarialdate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_ACTUARIALDATE'),
              trigger: 'blur',
            },
          ],
          recruitment: [
            {
              required: true,
            },
          ],
          loanday: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_LOANDAY1'),
              trigger: 'blur',
            },
          ],
          loanmoney: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_LOANMONEY1'),
              trigger: 'blur',
            },
          ],
          accommodationcost: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_ACCOMMODATIONCOST1'),
              trigger: 'change',
            },
          ],
          accommodation: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_ACCOMMODATION1'),
              trigger: 'change',
            },
          ],
          accommodationexpenses: [
            {
              required: true,
            },
          ],
          passportno: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_PASSPORTNO'),
              trigger: 'blur',
            },
          ],
          durationstart: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_DURATIONSTART'),
              trigger: 'blur',
            },
            {validator: validatedurationstart, trigger: 'blur'},
          ],
          durationend: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_DURATIONEND'),
              trigger: 'blur',
            },
            {validator: validatedurationend, trigger: 'blur'},
          ],
          visa: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_VISA'),
              trigger: 'change',
            },
          ],
          validstart: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_VALIDSTART'),
              trigger: 'blur',
            },
            {validator: validatevalidstart, trigger: 'blur'},
          ],
          validend: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_VALIDEND'),
              trigger: 'blur',
            },
            {validator: validatevalidend, trigger: 'blur'},
          ],
          permit: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_PERMIT'),
              trigger: 'change',
            },
          ],
          scheduled: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_SCHEDULED'),
              trigger: 'blur',
            },
          ],
          provision: [
            {
              required: true,
            },
          ],
          technology: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_TECHNOLOGY'),
              trigger: 'blur',
            },
          ],
          judgment: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_JUDGMENT'),
              trigger: 'change',
            },
          ],
          judgmentno: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_JUDGMENTNO'),
              trigger: 'blur',
            },
          ],
          passengers: [
            {
              required: true,
            },
          ],
          fixedassetsno: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_FIXEDASSETSNO1'),
              trigger: 'blur',
            },
          ],
          external: [
            {
              required: true,
            },
          ],
          regulations: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_REGULATIONS'),
              trigger: 'blur',
            },
          ],
          reason: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_REASON1'),
              trigger: 'blur',
            },
          ],
        },
        show: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        show9: false,
        show10: false,
        canStart: false,
      };
    },
    mounted() {
      this.getProjectNames();
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1002Store/selectById', {'businessid': this.$route.params._id})
          .then(response => {
            if (!response.business) {
              this.loading = false;
              return;
            }
            this.form = response.business;
            if (response.travelcontent.length > 0) {
              this.tableP = response.travelcontent;
            }
            this.userlist = this.form.user_id;
            this.baseInfo.business = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.travelcontent = JSON.parse(JSON.stringify(this.tableP));
            if (this.form.objectivetype === 'PJ018005') {
              this.show = true;
            } else {
              this.show = false;
            }
            if (this.form.plan === '1') {
              this.show2 = true;
            } else {
              this.show2 = false;
              this.show3 = false;
            }
            if (this.form.plantype === 'PR002005') {
              this.show3 = true;
            } else {
              this.show3 = false;
            }
            if (this.form.currency === 'PJ003001') {
              this.show4 = true;
              this.show5 = false;
              this.show6 = false;
              this.form.dollarfxrate = getDictionaryInfo(this.form.currency).value2;
            }
            if (this.form.currency === 'PJ003002') {
              this.show4 = false;
              this.show5 = true;
              this.show6 = false;
              this.form.jpyfxrate = getDictionaryInfo(this.form.currency).value2;
            }
            if (this.form.currency === 'PJ003003') {
              this.show4 = false;
              this.show5 = false;
              this.show6 = true;
              this.form.otherfxrate = getDictionaryInfo(this.form.currency).value2;
            }
            if (this.form.provision === '1') {
              this.show7 = true;
            } else {
              this.show7 = false;
            }
            if (this.form.judgment === 'PJ023001') {
              this.show8 = true;
            } else {
              this.show8 = false;
            }
            if (this.form.passengers === '1') {
              this.show9 = true;
            } else {
              this.show9 = false;
            }
            if (this.form.external === '1') {
              this.show10 = true;
            } else {
              this.show10 = false;
            }
            if (this.form.status === '2') {
              this.disable = false;
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
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.center_id = lst.centerNmae;
          this.form.group_id = lst.groupNmae;
          this.form.team_id = lst.teamNmae;
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
      checkRequire() {
        if (
          !this.form.user_id ||
          !this.form.applicationdate ||
          !this.form.level ||
          !this.form.condominiumcompany ||
          !this.form.region ||
          !this.form.city ||
          !this.form.startdate ||
          !this.form.enddate
        ) {
          this.activeName = 'first';
        } else if (
          !this.form.objectivetype ||
          !this.form.details
        ) {
          this.activeName = 'second';
        } else if (
          !this.form.budgetunit ||
          (this.form.plan === '1' && (
              !this.form.plantype ||
              (this.form.plantype === 'PR002005' && (
                  !this.form.classificationtype)
              ) ||
              !this.form.balance)
          ) ||
          this.form.currency === 'PJ003001' && (
            !this.form.dollarfxrate) ||
          !this.form.currency === 'PJ003002' && (
            !this.form.jpyfxrate) ||
          !this.form.currency === 'PJ003003' && (
            !this.form.otherfxrate) ||
          !this.form.bookingday ||
          !this.form.actuarialdate ||
          !this.form.loanday ||
          !this.form.accommodationcost ||
          !this.form.accommodation ||
          !this.form.passportno ||
          !this.form.durationstart ||
          !this.form.durationend ||
          !this.form.visa ||
          !this.form.validstart ||
          !this.form.validend ||
          !this.form.permit
        ) {
          this.activeName = 'fourth';
        } else if (
          (this.form.provision === '1' && (
              !this.form.technology)
          ) ||
          !this.form.judgment ||
          !this.form.judgmentno ||
          !this.form.fixedassetsno
        ) {
          this.activeName = 'fifth';
        } else if (
          !this.form.regulations ||
          !this.form.reason
        ) {
          this.activeName = 'sixth';
        }
      },
      submit() {
        let val = this.currentRow;
        this.dialogTableVisible = false;
        this.form.projectname = val;
      },
      handleClickChange(val) {
        this.currentRow = val.projectname;
      },
      getProjectNames() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/getFpans5001List', {})
          .then(response => {
            this.gridData = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              vote.projectname = response[i].project_name;
              vote.numbers = response[i].numbers;
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
      cityChange() {
        this.tablePD[0].place = this.$t('label.PFANS1035FORMVIEW_MOBILE');
        this.tablePD[1].place = getDictionaryInfo(this.form.region).value1 + this.form.city;
        this.tablePD[2].place = this.$t('label.PFANS1035FORMVIEW_MOBILE');
      },
      startDateChange() {
        let date = [];
        date.push(this.form.startdate);
        date.push(this.form.startdate);
        this.tablePD[0].duringdate = date;
      },
      endDateChange() {
        let date = [];
        date.push(this.form.startdate);
        date.push(this.form.enddate);
        this.tablePD[1].duringdate = date;
        let date1 = [];
        date1.push(this.form.enddate);
        date1.push(this.form.enddate);
        this.tablePD[2].duringdate = date1;
      },
      getUserids(val) {
        this.form.user_id = val;
        this.userlist = val;
        let lst = getOrgInfoByUserId(val);
        this.form.center_id = lst.centerNmae;
        this.form.group_id = lst.groupNmae;
        this.form.team_id = lst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      getlevel(val) {
        this.form.level = val;
      },
      getregion(val) {
        this.form.region = val;
      },
      getobjectivetype(val) {
        this.form.objectivetype = val;
        if (val === 'PJ018005') {
          this.show = true;
          this.form.objectivetypeother = this.$t('label.PFANS1002VIEW_OTHER');
        } else {
          this.show = false;
          this.rules.objectivetypeother[0].required = false;
          this.form.objectivetypeother = null;
        }
      },
      getbudgetunit(val) {
        this.form.budgetunit = val;
      },
      getplan1(val) {
        this.form.plan = val;
        if (val === '1') {
          this.show2 = true;
        } else {
          this.show2 = false;
          this.form.plantype = null;
          this.show3 = false;
          this.form.classificationtype = null;
          this.form.balance = null;
        }
      },
      getplantype(val) {
        this.form.plantype = val;
        if (val === 'PR002005') {
          this.show3 = true;
        } else {
          this.show3 = false;
          this.form.classificationtype = null;
          this.form.balance = null;
        }
      },
      getclassificationtype(val) {
        this.form.classificationtype = val;
      },
      getforeigncurrency(val) {
        this.form.foreigncurrency = val;
        if (this.form.foreigncurrency != null && this.form.foreigncurrency !== '') {
          if (this.form.currency === 'PJ003001') {
            this.form.moneys = Math.round((val * this.form.dollarfxrate) * 10) / 10;
          }
          if (this.form.currency === 'PJ003002') {
            this.form.moneys = Math.round((val * this.form.jpyfxrate) * 10) / 10;
          }
          if (this.form.currency === 'PJ003003') {
            this.form.moneys = Math.round((val * this.form.otherfxrate) * 10) / 10;
          }
        }
      },
      getotherfxrate(val) {
        this.form.otherfxrate = val;
        if (this.form.foreigncurrency != null && this.form.foreigncurrency !== '') {
          if (this.form.currency === 'PJ003003') {
            this.form.moneys = Math.round((this.form.foreigncurrency * this.form.otherfxrate) * 10) / 10;
          }
        }
      },
      getCurrency(val) {
        this.form.currency = val;
        if (val === 'PJ003001') {
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.show4 = true;
            this.show5 = false;
            this.show6 = false;
            this.form.dollarfxrate = dictionaryInfo.value2;
            this.form.jpyfxrate = null;
            this.form.otherfxrate = null;
            this.form.moneys = Math.round((this.form.foreigncurrency * this.form.dollarfxrate) * 10) / 10;
          }
        }
        if (val === 'PJ003002') {
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.show4 = false;
            this.show5 = true;
            this.show6 = false;
            this.form.dollarfxrate = null;
            this.form.jpyfxrate = dictionaryInfo.value2;
            this.form.otherfxrate = null;
            this.form.moneys = Math.round((this.form.foreigncurrency * this.form.jpyfxrate) * 10) / 10;
          }
        }
        if (val === 'PJ003003') {
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.show4 = false;
            this.show5 = false;
            this.show6 = true;
            this.form.dollarfxrate = null;
            this.form.jpyfxrate = null;
            this.form.moneys = Math.round((this.form.foreigncurrency * this.form.otherfxrate) * 10) / 10;
          }
        }
      },
      getaccommodationcost1(val) {
        this.form.accommodationcost = val;
      },
      getaccommodation1(val) {
        this.form.accommodation = val;
      },
      getvisa(val) {
        this.form.visa = val;
      },
      getpermit(val) {
        this.form.permit = val;
      },
      getprovision(val) {
        this.form.provision = val;
        if (val === '1') {
          this.show7 = true;
        } else {
          this.show7 = false;
          this.form.technology = null;
        }
      },
      getjudgment(val) {
        this.form.judgment = val;
        if (val === 'PJ023001') {
          this.show8 = true;
        } else {
          this.show8 = false;
          this.form.judgmentno = null;
        }
      },
      getpassengers1(val) {
        this.form.passengers = val;
        if (val === '1') {
          this.show9 = true;
        } else {
          this.show9 = false;
          this.form.fixedassetsno = null;
        }
      },
      getexternal(val) {
        this.form.external = val;
        if (val === '1') {
          this.show10 = true;
        } else {
          this.show10 = false;
          this.form.reason = null;
          this.form.regulations = null;
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
      start(val) {
        this.form.status = '2';
        this.buttonClick('update');
      },
      end(val) {
        this.form.status = '0';
        this.buttonClick('update');
      },
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1001FormView',
          params: {
            title: 1,
          },
        });
      },
      buttonClick(val) {
        if (val === 'back') {
          this.paramsTitle();
        } else {
          this.checkRequire();
          this.$refs['refform'].validate(valid => {
            if (valid) {
              this.loading = true;
              this.form.businesstype = '0',
                this.form.user_id = this.userlist;
              this.baseInfo.business = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.travelcontent = [];
              this.baseInfo.travelcontent.push(
                {
                  travelcontent_id: this.tableP.travelcontent_id,
                  businessid: this.tableP.businessid,
                  // 开始日期
                  duringdate1: moment(this.tablePD[0].duringdate[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.tablePD[0].duringdate[1]).format('YYYY-MM-DD'),
                  content1: this.tablePD[0].content,
                  duringdate2: moment(this.tablePD[0].duringdate[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.tablePD[0].duringdate[1]).format('YYYY-MM-DD'),
                  content2: this.tablePD[1].content,
                  //结束日期
                  duringdate3: moment(this.tablePD[0].duringdate[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.tablePD[0].duringdate[1]).format('YYYY-MM-DD'),
                  content3: this.tablePD[2].content,
                },
              );
              if (this.$route.params._id) {
                this.baseInfo.business.businessid = this.$route.params._id;
                this.loading = true;
                this.$store
                  .dispatch('PFANS1002Store/updateBusiness', this.baseInfo)
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
                  .dispatch('PFANS1002Store/createBusiness', this.baseInfo)
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
          });
        }
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-col el-col-8 {
    padding-top: 20vw;
  }

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






