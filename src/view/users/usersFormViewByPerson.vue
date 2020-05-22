<template>
  <div style="min-height: 100%" class="user_form">
    <EasyNormalContainer
      ref="container"
      :title="title"
      @buttonClick="buttonClick"
      :buttonList="buttonList"
      v-loading="loading"
    >
      <div style="margin-top:30px" slot="customize">
        <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="8vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane
              :label="$t('label.PFANSUSERFORMVIEW_BASICPERSONALINFORMATION')"
              name="first"
              style="padding-left:0.5%"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"
                    prop="customername"
                  >
                    <el-input class="width" v-model="form.customername" maxlength="20" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.sex')" prop="sex">
                    <dicselect
                      disabled
                      code="PR019"
                      @change="changesex"
                      :data="form.sex"
                      style="width:20vw"
                    ></dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ADFIELD')" prop="adfield">
                    <el-input class="width" v-model="form.adfield" maxlength="20" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_IDNUMBER')" prop="idnumber">
                    <el-input class="width" v-model="form.idnumber" maxlength="18" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERVIEW_BIRTHDAY')" prop="birthday">
                    <el-date-picker
                      v-model="form.birthday"
                      @change="getAge"
                      type="date" disabled
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_AGE')">
                    <el-input class="width" v-model="age" disabled style="width:20vw" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERVIEW_NATIONALITY')" prop="nationality">
                    <el-input class="width" v-model="form.nationality" maxlength="20" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_NATION')" prop="nation">
                    <el-input class="width" v-model="form.nation" maxlength="20" style="width:20vw" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_REGISTER')" prop="register">
                    <el-input class="width" v-model="form.register" maxlength="20" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_PASSPORT')">
                    <el-input class="width" v-model="form.passport" maxlength="10" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_SECURITY')">
                    <el-input class="width" v-model="form.security" maxlength="20" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_HOUSEFUND')">
                    <el-input class="width" v-model="form.housefund" maxlength="20" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_MARITAL')" prop="marital">
                    <el-select
                      v-model="form.marital"
                      :placeholder="$t('normal.error_09')"
                      class="width"
                      style="width:20vw" disabled
                    >
                      <el-option
                        v-for="item in marital_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_MARRYDAY')">
                    <el-date-picker
                      v-model="form.marryday"
                      type="date" disabled
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_CHILDREN')">
                    <span style="margin-right: 1vw ">{{$t('label.no')}}</span>
                    <el-switch
                    <el-switch disabled
                               v-model="form.children"
                               active-value="1"
                               inactive-value="0">
                    </el-switch>
                    <span style="margin-left: 1vw ">{{$t('label.yes')}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EXPERIENCE')" prop="experience">
                    <el-select disabled
                               v-model="form.experience"
                               :placeholder="$t('normal.error_09')"
                               class="width"
                               style="width:20vw"
                    >
                      <el-option
                        v-for="item in experience_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ADDRESS')" prop="address">
                    <el-input class="width" v-model="form.address" maxlength="50" style="width:20vw" disabled/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EMAIL')" prop="email">
                    <el-input class="width" v-model="form.email" style="width:20vw" disabled/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_MOBILENUMBER')"
                    prop="mobilenumber"
                  >
                    <el-input class="width" v-model="form.mobilenumber" maxlength="20" disabled style="width:20vw"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_PHONE')" prop="phone">
                    <el-input class="width" v-model.number="form.phone" maxlength="20" disabled style="width:20vw"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EXTENSION')" prop="extension">
                    <el-input class="width" v-model.number="form.extension" maxlength="20"
                              style="width:20vw" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>

            <el-tab-pane
              :label="$t('label.PFANSUSERFORMVIEW_EDUCATIONALCALENDAR')"
              name="second"
              style="padding-left:0.5%"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_EDUCATIONALCALENDAR')"
                    prop="graduation"
                  >
                    <el-input class="width" v-model="form.graduation" maxlength="20" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_DEGREE')" prop="degree">
                    <dicselect disabled
                               code="PG018"
                               class="width"
                               style="width:20vw"
                               @change="changeDegree"
                               :data="form.degree"
                    ></dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_EDUCATIONAL')"
                    prop="educational"
                  >
                    <dicselect disabled
                               code="PR022"
                               class="width"
                               style="width:20vw"
                               @change="changeEducational"
                               :data="form.educational"
                    ></dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_SPECIALTY')" prop="specialty">
                    <el-input class="width" v-model="form.specialty" maxlength="10" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_GRADUATIONDAY')"
                    prop="graduationday"
                  >
                    <el-date-picker disabled
                                    v-model="form.graduationday"
                                    type="date"
                                    :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                                    style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANSUSERFORMVIEW_EDUCATIONEXPERIENCE')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table
                        :data="educationTable"
                        style="width:72vw;margin-top:1%"
                        border header-cell-class-name="sub_bg_color_blue" stripe
                      >
                        <el-table-column
                          prop="time"
                          :label="$t('label.PFANSUSERFORMVIEW_PERIOD')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-date-picker
                              style="width:100%" disabled
                              v-model="scope.row.time"
                              type="daterange"
                              :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                              :start-placeholder="$t('label.startdate')"
                              :end-placeholder="$t('label.enddate')"
                              unlink-panels
                            ></el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="school"
                          :label="$t('label.PFANS2003VIEW_SCHOOL')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.school" maxlength="20" style="width:100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.notes" maxlength="50" style="width:100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" width="200" align="center">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow(scope.$index, educationTable)"
                              type="danger"
                              size="small"
                              plain disabled
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              @click="addRow('education')"
                              type="primary"
                              size="small"
                              plain disabled
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
            <el-tab-pane :label="this.$t('label.PFANSUSERFORMVIEW_SKILLLEVEL')" name="third">
              <el-collapse>
<!--                <el-collapse-item>-->
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANSUSERFORMVIEW_SKILL')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table :data="skillTable" style="width:72vw;margin-top:1%" border
                                header-cell-class-name="sub_bg_color_blue" stripe>
                        <el-table-column prop="name" :label="$t('label.PFANS3004VIEW_NAME')" align="center">
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.name" maxlength="20" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="ability"
                          :label="$t('label.PFANSUSERFORMVIEW_ABILITY')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.ability" maxlength="20" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.notes" maxlength="50" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" width="200" align="center">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow(scope.$index, skillTable)"
                              type="danger"
                              size="small"
                              plain disabled
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              @click="addRow('skill')"
                              type="primary"
                              size="small"
                              plain disabled
                            >{{$t('button.insert')}}
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
<!--                </el-collapse-item>-->
              </el-collapse>
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANSUSERFORMVIEW_LANGUAGEQUALIFICATION')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table :data="languageTable" style="width:72vw;margin-top:1%" border
                                header-cell-class-name="sub_bg_color_blue" stripe>
                        <el-table-column
                          prop="programme"
                          :label="$t('label.PFANS5008VIEW_PROGRAM')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.programme" maxlength="20" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="level"
                          :label="$t('label.PFANSUSERFORMVIEW_LEVEL')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.level" maxlength="20" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.notes" maxlength="50" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" width="200" align="center">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow(scope.$index, languageTable)"
                              type="danger"
                              size="small"
                              plain disabled
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              @click="addRow('language')"
                              type="primary"
                              size="small"
                              plain disabled
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

            <el-tab-pane
              :label="this.$t('label.PFANSUSERFORMVIEW_PREVIOUSEMPLOYMENTEXPERIENCE')"
              name="fouth"
            >
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_WORKDAY')" prop="workday">
                    <el-date-picker
                      v-model="form.workday"
                      type="date" disabled
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANSUSERFORMVIEW_BEFOREWORK')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table
                        :data="beforeWorkTable"
                        style="width:72vw;margin-top:1%"
                        border header-cell-class-name="sub_bg_color_blue" stripe
                      >
                        <el-table-column
                          prop="time"
                          :label="$t('label.PFANSUSERFORMVIEW_PERIOD')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-date-picker
                              v-model="scope.row.time"
                              type="daterange" disabled
                              :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                              :start-placeholder="$t('label.startdate')"
                              :end-placeholder="$t('label.enddate')"
                              unlink-panels
                              style="width: 100%"
                            ></el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="company"
                          :label="$t('label.PFANSUSERFORMVIEW_COMPANY')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.company" maxlength="20" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="postion"
                          :label="$t('label.PFANS2020VIEW_JOB')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.postion" maxlength="20" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.notes" maxlength="50" style="width: 100%" disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" width="200" align="center">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow(scope.$index, beforeWorkTable)"
                              type="danger"
                              size="small"
                              plain disabled
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              @click="addRow('beforeWork')"
                              type="primary"
                              size="small"
                              plain disabled
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

            <el-tab-pane
              :label="this.$t('label.PFANSUSERFORMVIEW_POSTEMPLOYMENTHISTORY')"
              name="five"
              style="padding-left:0.5%"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <org
                      :orglist="form.teamid"
                      orgtype="3"
                      style="width:20vw" disabled
                      selectType="Single"
                      @getOrgids="getTeamid"
                    ></org>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <org
                      :orglist="form.groupid"
                      orgtype="2"
                      style="width:20vw" disabled
                      selectType="Single"
                      @getOrgids="getGroupid"
                    ></org>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')" prop="centerid" :error="error">
                    <org
                      :orglist="form.centerid"
                      orgtype="1"
                      :error="error"
                      style="width:20vw" disabled
                      selectType="Single"
                      @getOrgids="getCenterid"
                    ></org>
                    <!--<el-button-->
                    <!--type="text"-->
                    <!--&gt;{{$t('label.INDEX_GD')}}-->
                    <!--</el-button>-->
                  </el-form-item>

                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_JOBNUMBER')" prop="jobnumber">
                    <el-input class="width" v-model="form.jobnumber" maxlength="10" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                    <el-input class="width" disabled v-model="form.budgetunit" maxlength="10"
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_PERSONALCODE')">
                    <el-input class="width" v-model="form.personalcode" maxlength="10" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.type')" prop="type">
                    <el-select
                      v-model="form.type"
                      :placeholder="$t('normal.error_09')"
                      class="width"
                      style="width:20vw" disabled
                      @change="changeRank"
                    >
                      <el-option
                        v-for="item in rank_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_RANK')" prop="rank">
                    <dicselect :code="code" class="width" style="width:20vw" :data="form.rank" v-if="display"
                               @change="getRank" disabled></dicselect>
                    <!--                    add_fjl_05/21  &#45;&#45;添加履历-->
                    <el-button
                      type="text"
                      @click="dialogTableVisible9 = true"
                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}
                    </el-button>
                    <el-dialog
                      :title="$t('label.PFANSUSERFORMVIEW_RANK') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"
                      :visible.sync="dialogTableVisible9"
                      style="padding-top:5px"
                    >
                      <el-row>
                        <el-col :span="16">
                          <el-table :data="rankData" stripe>
                            <el-table-column
                              property="date"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#75a7ef">{{ scope.row.date }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              property="after"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_RANK')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#d16765">{{ scope.row.basic }}</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                    </el-dialog>
                    <!--                    add_fjl_05/21  &#45;&#45;添加履历-->
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_OCCUPATIONTYPE')" prop="occupationtype">
                    <dicselect :code="occupationtypecode" class="width" style="width:20vw" :data="form.occupationtype"
                               :disabled="occupationtypedis" v-if="occupationtypedisplay" @change="getOccupationtype"
                               disabled
                    ></dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_DIFFERENCE')">
                    <el-select
                      v-model="form.difference"
                      :placeholder="$t('normal.error_09')"
                      class="width" disabled
                      style="width:20vw"
                    >
                      <el-option
                        v-for="item in difference_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERVIEW_POST')" prop="post">
                    <dicselect disabled
                               :code="code1"
                               :data="form.post"
                               @change="changePost"
                               style="width:20vw">
                    </dicselect>
                    <!--                    add_fjl_05/21  &#45;&#45;添加履历-->
                    <el-button
                      type="text"
                      @click="dialogTableVisible10 = true"
                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}
                    </el-button>
                    <el-dialog
                      :title="$t('label.PFANSUSERVIEW_POST') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"
                      :visible.sync="dialogTableVisible10"
                      style="padding-top:5px"
                    >
                      <el-row>
                        <el-col :span="16">
                          <el-table :data="postData" stripe>
                            <el-table-column
                              property="date"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#75a7ef">{{ scope.row.date }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              property="after"
                              align="center"
                              :label="$t('label.PFANSUSERVIEW_POST')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#d16765">{{ scope.row.basic }}</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                    </el-dialog>
                    <!--                    add_fjl_05/21  &#45;&#45;添加履历-->
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_CAIWUPERSONALCODE')">
                    <el-input disabled
                              class="width"
                              v-model="form.caiwupersonalcode"
                              maxlength="10"
                              style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_LABORCONTRACTTYPE')">
                    <el-select disabled
                               v-model="form.laborcontracttype"
                               :placeholder="$t('normal.error_09')"
                               class="width"
                               style="width:20vw"
                    >
                      <el-option
                        v-for="item in laborcontracttype"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_FIXEDATE')">
                    <el-date-picker
                      v-model="form.fixedate"
                      type="date" disabled
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ENTERDAY')" prop="enterday">
                    <el-date-picker
                      v-model="form.enterday"
                      type="date" disabled
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_UPGRADED')">
                    <el-date-picker
                      v-model="form.upgraded"
                      type="date" disabled
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ENDDATE')">
                    <el-date-picker
                      v-model="form.enddate"
                      type="date" disabled
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_RESTYEAR')" prop="restyear">
                    <el-input-number
                      v-model="form.restyear"
                      :min="0"
                      :max="365"
                      :precision="0"
                      :step="1"
                      class="width"
                      disabled
                      style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">

                </el-col>
              </el-row>
              <!--del_fjl_05/20   &#45;&#45;式样变更，功能修改-->
              <!--              <el-row>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ANNUALYEAR')" prop="annualyear">-->
              <!--                    <el-input-number-->
              <!--                      v-model="form.annualyear"-->
              <!--                      :min="0"-->
              <!--                      :max="365"-->
              <!--                      :precision="0"-->
              <!--                      :step="1"-->
              <!--                      class="width"-->
              <!--                      disabled-->
              <!--                      style="width:20vw"-->
              <!--                    ></el-input-number>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item-->
              <!--                    :label="$t('label.PFANSUSERFORMVIEW_ANNUALLASTYEAR')"-->
              <!--                    prop="annuallastyear"-->
              <!--                  >-->
              <!--                    <el-input-number-->
              <!--                      v-model="form.annuallastyear"-->
              <!--                      :min="0"-->
              <!--                      :max="365"-->
              <!--                      :precision="0"-->
              <!--                      :step="1"-->
              <!--                      class="width"-->
              <!--                      disabled-->
              <!--                      style="width:20vw"-->
              <!--                    ></el-input-number>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->

              <!--              <el-row>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item-->
              <!--                    :label="$t('label.PFANSUSERFORMVIEW_WELFAREYEAR')"-->
              <!--                    prop="welfareyear"-->
              <!--                  >-->
              <!--                    <el-input-number-->
              <!--                      v-model="form.welfareyear"-->
              <!--                      :min="0"-->
              <!--                      :max="365"-->
              <!--                      :precision="0"-->
              <!--                      :step="1"-->
              <!--                      class="width"-->
              <!--                      disabled-->
              <!--                      style="width:20vw"-->
              <!--                    ></el-input-number>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item-->
              <!--                    :label="$t('label.PFANSUSERFORMVIEW_WELFARELASTYEAR')"-->
              <!--                    prop="welfarelastyear"-->
              <!--                  >-->
              <!--                    <el-input-number-->
              <!--                      v-model="form.welfarelastyear"-->
              <!--                      :min="0"-->
              <!--                      :max="365"-->
              <!--                      :precision="0"-->
              <!--                      :step="1"-->
              <!--                      class="width"-->
              <!--                      disabled-->
              <!--                      style="width:20vw"-->
              <!--                    ></el-input-number>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->

              <!--              <el-row>-->
              <!--                -->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item-->
              <!--                    :label="$t('label.PFANSUSERFORMVIEW_RESTLASTYEAR')"-->
              <!--                    prop="restlastyear"-->
              <!--                  >-->
              <!--                    <el-input-number-->
              <!--                      v-model="form.restlastyear"-->
              <!--                      :min="0"-->
              <!--                      :max="365"-->
              <!--                      :precision="0"-->
              <!--                      :step="1"-->
              <!--                      class="width"-->
              <!--                      disabled-->
              <!--                      style="width:20vw"-->
              <!--                    ></el-input-number>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->
              <!--del_fjl_05/20   &#45;&#45;式样变更，功能修改-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_SEATNUMBER')" prop="seatnumber">
                    <el-input class="width" v-model="form.seatnumber" maxlength="20" style="width:20vw"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_BASIC')" prop="basic">
                    <el-input-number
                      v-model="form.basic"
                      :min="0" disabled
                      :precision="2"
                      :step="50"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_DUTY')" prop="duty">
                    <el-input-number
                      v-model="form.duty"
                      :min="0" disabled
                      :precision="2"
                      :step="50"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--              upd_fjl_05/21  &#45;&#45;添加基数履历-->
              <!-- ADD-LXX -->
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_YANGLAOINSURANCE')"
                    prop="yanglaoinsurance"
                  >
                    <el-input-number
                      disabled
                      v-model="form.yanglaoinsurance"
                      :min="0"
                      :max="100000"
                      :precision="2"
                      :step="100"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                    <el-button
                      type="text"
                      @click="dialogTableVisible2 = true"
                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}
                    </el-button>
                    <el-dialog
                      :title="$t('label.PFANSUSERFORMVIEW_OLDAGEINSURANCE') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"
                      :visible.sync="dialogTableVisible2"
                      style="padding-top:5px"
                    >
                      <el-row>
                        <el-col :span="16">
                          <el-table :data="oldageData" stripe>
                            <el-table-column
                              property="date"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#75a7ef">{{ scope.row.date }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              property="after"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_YANGLAOINSURANCE')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#d16765">{{ scope.row.basic }}</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_GONGSHANGINSURANCE')"
                    prop="gongshanginsurance"
                  >
                    <el-input-number
                      disabled
                      v-model="form.gongshanginsurance"
                      :min="0"
                      :max="100000"
                      :precision="2"
                      :step="100"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                    <el-button
                      type="text"
                      @click="dialogTableVisible6 = true"
                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}
                    </el-button>
                    <el-dialog
                      :title="$t('label.PFANSUSERFORMVIEW_GONGSHANGINSURANCE') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"
                      :visible.sync="dialogTableVisible6"
                      style="padding-top:5px"
                    >
                      <el-row>
                        <el-col :span="16">
                          <el-table :data="gsData" stripe>
                            <el-table-column
                              property="date"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#75a7ef">{{ scope.row.date }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              property="after"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_GONGSHANGINSURANCE')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#d16765">{{ scope.row.basic }}</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_SHIYEINSURANCE')"
                    prop="shiyeinsurance"
                  >
                    <el-input-number
                      disabled
                      v-model="form.shiyeinsurance"
                      :min="0"
                      :max="100000"
                      :precision="2"
                      :step="100"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                    <el-button
                      type="text"
                      @click="dialogTableVisible7 = true"
                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}
                    </el-button>
                    <el-dialog
                      :title="$t('label.PFANSUSERFORMVIEW_SHIYEINSURANCE') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"
                      :visible.sync="dialogTableVisible7"
                      style="padding-top:5px"
                    >
                      <el-row>
                        <el-col :span="16">
                          <el-table :data="syeData" stripe>
                            <el-table-column
                              property="date"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#75a7ef">{{ scope.row.date }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              property="after"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_SHIYEINSURANCE')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#d16765">{{ scope.row.basic }}</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                    </el-dialog>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_YILIAOINSURANCE')"
                    prop="yiliaoinsurance"
                  >
                    <el-input-number
                      disabled
                      v-model="form.yiliaoinsurance"
                      :min="0"
                      :max="100000"
                      :precision="2"
                      :step="100"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                    <el-button
                      type="text"
                      @click="dialogTableVisible4 = true"
                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}
                    </el-button>
                    <el-dialog
                      :title="$t('label.PFANSUSERFORMVIEW_YILIAOINSURANCE') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"
                      :visible.sync="dialogTableVisible4"
                      style="padding-top:5px"
                    >
                      <el-row>
                        <el-col :span="16">
                          <el-table :data="medicalData" stripe>
                            <el-table-column
                              property="date"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#75a7ef">{{ scope.row.date }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              property="after"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_YILIAOINSURANCE')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#d16765">{{ scope.row.basic }}</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_SHENGYUINSURANCE')"
                    prop="shengyuinsurance"
                  >
                    <el-input-number
                      disabled
                      v-model="form.shengyuinsurance"
                      :min="0"
                      :max="100000"
                      :precision="2"
                      :step="100"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                    <el-button
                      type="text"
                      @click="dialogTableVisible8 = true"
                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}
                    </el-button>
                    <el-dialog
                      :title="$t('label.PFANSUSERFORMVIEW_SHENGYUINSURANCE') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"
                      :visible.sync="dialogTableVisible8"
                      style="padding-top:5px"
                    >
                      <el-row>
                        <el-col :span="16">
                          <el-table :data="syuData" stripe>
                            <el-table-column
                              property="date"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#75a7ef">{{ scope.row.date }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              property="after"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_SHENGYUINSURANCE')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#d16765">{{ scope.row.basic }}</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_HOUSEINSURANCE')"
                    prop="houseinsurance"
                  >
                    <el-input-number
                      disabled
                      v-model="form.houseinsurance"
                      :min="0"
                      :max="100000"
                      :precision="2"
                      :step="0.1"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                    <el-button
                      type="text"
                      @click="dialogTableVisible3 = true"
                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}
                    </el-button>
                    <el-dialog
                      :title="$t('label.PFANSUSERFORMVIEW_HOUSEINSURANCE') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"
                      :visible.sync="dialogTableVisible3"
                      style="padding-top:5px"
                    >
                      <el-row>
                        <el-col :span="16">
                          <el-table :data="houseData" stripe>
                            <el-table-column
                              property="date"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#75a7ef">{{ scope.row.date }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              property="after"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_HOUSEINSURANCE')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#d16765">{{ scope.row.basic }}</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                    </el-dialog>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- ADD-LXX -->
              <!--              upd_fjl_05/21  &#45;&#45;添加基数履历-->
              <el-row>
                <!--                add_fjl-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_FEEDINGCHANGEDAY')">
                    <el-date-picker
                      disabled
                      v-model="feedingchangeday"
                      type="date"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <!--                add_fjl-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_SALARY')" prop="salary">
                    <el-input-number
                      disabled
                      v-model="form.salary"
                      :min="0"
                      :precision="2"
                      :step="100"
                      class="width"
                      disabled
                      style="width:20vw"
                    ></el-input-number>
                    <el-button
                      type="text"
                      @click="dialogTableVisible = true"
                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}
                    </el-button>
                    <el-dialog
                      :title="$t('label.PFANSUSERFORMVIEW_SALARY') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"
                      :visible.sync="dialogTableVisible"
                      style="padding-top:5px"
                    >
                      <el-row>
                        <el-col :span="24">
                          <el-table :data="gridData" stripe>
                            <el-table-column
                              property="date"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#75a7ef">{{ scope.row.date }}</span>
                              </template>
                            </el-table-column>
                            <!--<el-table-column-->
                            <!--property="before"-->
                            <!--align="center"-->
                            <!--:label="$t('label.PFANSUSERFORMVIEW_BEFORE')"-->
                            <!--width="130"-->
                            <!--&gt;</el-table-column>-->
                            <!--                            del_fjl_05/20   &#45;&#45;注释掉调整前的工资-->
                            <!--                            <el-table-column-->
                            <!--                              align="center"-->
                            <!--                              :label="$t('label.PFANSUSERFORMVIEW_BEFORE')"-->
                            <!--                              width="130"-->
                            <!--                            >-->
                            <!--                              &lt;!&ndash;                              <template slot-scope="scope">&ndash;&gt;-->
                            <!--                              &lt;!&ndash;                                <span style="color:#d16765">{{ scope.row.after }}</span>&ndash;&gt;-->
                            <!--                              &lt;!&ndash;                              </template>&ndash;&gt;-->
                            <!--                              <el-table-column-->
                            <!--                                property="after"-->
                            <!--                                align="center"-->
                            <!--                                :label="$t('label.PFANSUSERFORMVIEW_BASIC')"-->
                            <!--                                width="100"-->
                            <!--                              >-->
                            <!--                                <template slot-scope="scope">-->
                            <!--                                  <span style="color:#d16765">{{ scope.row.after }}</span>-->
                            <!--                                </template>-->
                            <!--                              </el-table-column>-->
                            <!--                              <el-table-column-->
                            <!--                                property="before"-->
                            <!--                                align="center"-->
                            <!--                                :label="$t('label.PFANSUSERFORMVIEW_DUTY')"-->
                            <!--                                width="100"-->
                            <!--                              >-->
                            <!--                                <template slot-scope="scope">-->
                            <!--                                  <span style="color:#d16765">{{ scope.row.before }}</span>-->
                            <!--                                </template>-->
                            <!--                              </el-table-column>-->
                            <!--                            </el-table-column>-->
                            <!--                            <el-table-column-->
                            <!--                              align="center"-->
                            <!--                              :label="$t('label.PFANSUSERFORMVIEW_AFTER')"-->
                            <!--                              width="200"-->
                            <!--                            >-->
                            <el-table-column
                              property="basic"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_BASIC')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#d16765">{{ scope.row.basic }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              property="duty"
                              align="center"
                              :label="$t('label.PFANSUSERFORMVIEW_DUTY')"
                              width="200"
                            >
                              <template slot-scope="scope">
                                <span style="color:#d16765">{{ scope.row.duty }}</span>
                              </template>
                            </el-table-column>
                            <!--                            </el-table-column>-->
                            <!--                            <el-table-column-->
                            <!--                              property="remark"-->
                            <!--                              align="center"-->
                            <!--                              :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')"-->
                            <!--                            >-->
                            <!--                              <template slot-scope="scope">-->
                            <!--                                <el-input style="width:5vw" v-model="scope.row.remark" size="mini"></el-input>-->
                            <!--                              </template>-->
                            <!--                            </el-table-column>-->
                            <!--                            del_fjl_05/20   &#45;&#45;注释掉调整前的工资-->
                          </el-table>
                        </el-col>
                      </el-row>
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_CAUTION')" label-width="7rem">
                    <el-input
                      disabled
                      class="width"
                      v-model="form.caution"
                      maxlength="20"
                      style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!--              <el-row>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item-->
              <!--                    :label="$t('label.PFANSUSERFORMVIEW_OLDAGEINSURANCE')"-->
              <!--                    prop="oldageinsurance"-->
              <!--                  >-->
              <!--                    <el-input-number-->
              <!--                      v-model="form.oldageinsurance"-->
              <!--                      :min="0" disabled-->
              <!--                      :max="100000"-->
              <!--                      :precision="2"-->
              <!--                      :step="100"-->
              <!--                      class="width"-->
              <!--                      style="width:20vw"-->
              <!--                    ></el-input-number>-->
              <!--                    <el-button-->
              <!--                      type="text"-->
              <!--                      @click="dialogTableVisible2 = true"-->
              <!--                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}-->
              <!--                    </el-button>-->
              <!--                    <el-dialog-->
              <!--                      :title="$t('label.PFANSUSERFORMVIEW_OLDAGEINSURANCE') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"-->
              <!--                      :visible.sync="dialogTableVisible2"-->
              <!--                      style="padding-top:5px"-->
              <!--                    >-->
              <!--                      <el-row>-->
              <!--                        <el-col :span="24">-->
              <!--                          <el-table :data="oldageData" stripe>-->
              <!--                            <el-table-column-->
              <!--                              property="date"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"-->
              <!--                              width="200"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <span style="color:#75a7ef">{{ scope.row.date }}</span>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                            <el-table-column-->
              <!--                              property="before"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_BEFORE')"-->
              <!--                              width="130"-->
              <!--                            ></el-table-column>-->
              <!--                            <el-table-column-->
              <!--                              property="after"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_AFTER')"-->
              <!--                              width="130"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <span style="color:#d16765">{{ scope.row.after }}</span>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                            <el-table-column-->
              <!--                              property="remark"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <el-input style="width:5vw" v-model="scope.row.remark" size="mini" disabled></el-input>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                          </el-table>-->
              <!--                        </el-col>-->
              <!--                      </el-row>-->
              <!--                    </el-dialog>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item-->
              <!--                    :label="$t('label.PFANSUSERFORMVIEW_HOUSEINSURANCE')"-->
              <!--                    prop="houseinsurance"-->
              <!--                  >-->
              <!--                    <el-input-number-->
              <!--                      v-model="form.houseinsurance"-->
              <!--                      :min="0"-->
              <!--                      :max="100000"-->
              <!--                      :precision="2"-->
              <!--                      :step="0.1" disabled-->
              <!--                      class="width"-->
              <!--                      style="width:20vw"-->
              <!--                    ></el-input-number>-->
              <!--                    <el-button-->
              <!--                      type="text"-->
              <!--                      @click="dialogTableVisible3 = true"-->
              <!--                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}-->
              <!--                    </el-button>-->
              <!--                    <el-dialog-->
              <!--                      :title="$t('label.PFANSUSERFORMVIEW_HOUSEINSURANCE') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"-->
              <!--                      :visible.sync="dialogTableVisible3"-->
              <!--                      style="padding-top:5px"-->
              <!--                    >-->
              <!--                      <el-row>-->
              <!--                        <el-col :span="24">-->
              <!--                          <el-table :data="houseData" stripe>-->
              <!--                            <el-table-column-->
              <!--                              property="date"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"-->
              <!--                              width="200"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <span style="color:#75a7ef">{{ scope.row.date }}</span>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                            <el-table-column-->
              <!--                              property="before"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_BEFORE')"-->
              <!--                              width="130"-->
              <!--                            ></el-table-column>-->
              <!--                            <el-table-column-->
              <!--                              property="after"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_AFTER')"-->
              <!--                              width="130"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <span style="color:#d16765">{{ scope.row.after }}</span>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                            <el-table-column-->
              <!--                              property="remark"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <el-input style="width:5vw" v-model="scope.row.remark" size="mini" disabled></el-input>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                          </el-table>-->
              <!--                        </el-col>-->
              <!--                      </el-row>-->
              <!--                    </el-dialog>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->

              <!--              <el-row>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item-->
              <!--                    :label="$t('label.PFANSUSERFORMVIEW_MEDICALINSURANCE')"-->
              <!--                    prop="medicalinsurance"-->
              <!--                  >-->
              <!--                    <el-input-number-->
              <!--                      v-model="form.medicalinsurance"-->
              <!--                      :min="0"-->
              <!--                      :max="100000"-->
              <!--                      :precision="2"-->
              <!--                      :step="0.1" disabled-->
              <!--                      class="width"-->
              <!--                      style="width:20vw"-->
              <!--                    ></el-input-number>-->
              <!--                    <el-button-->
              <!--                      type="text"-->
              <!--                      @click="dialogTableVisible4 = true"-->
              <!--                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}-->
              <!--                    </el-button>-->
              <!--                    <el-dialog-->
              <!--                      :title="$t('label.PFANSUSERFORMVIEW_MEDICALINSURANCE') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"-->
              <!--                      :visible.sync="dialogTableVisible4"-->
              <!--                      style="padding-top:5px"-->
              <!--                    >-->
              <!--                      <el-row>-->
              <!--                        <el-col :span="24">-->
              <!--                          <el-table :data="medicalData" stripe>-->
              <!--                            <el-table-column-->
              <!--                              property="date"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"-->
              <!--                              width="200"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <span style="color:#75a7ef">{{ scope.row.date }}</span>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                            <el-table-column-->
              <!--                              property="before"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_BEFORE')"-->
              <!--                              width="130"-->
              <!--                            ></el-table-column>-->
              <!--                            <el-table-column-->
              <!--                              property="after"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_AFTER')"-->
              <!--                              width="130"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <span style="color:#d16765">{{ scope.row.after }}</span>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                            <el-table-column-->
              <!--                              property="remark"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <el-input style="width:5vw" v-model="scope.row.remark" size="mini" disabled></el-input>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                          </el-table>-->
              <!--                        </el-col>-->
              <!--                      </el-row>-->
              <!--                    </el-dialog>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_SALARY')" prop="salary">-->
              <!--                    <el-input-number-->
              <!--                      v-model="form.salary"-->
              <!--                      :min="0"-->
              <!--                      :precision="2"-->
              <!--                      :step="100"-->
              <!--                      class="width"-->
              <!--                      disabled-->
              <!--                      style="width:20vw"-->
              <!--                    ></el-input-number>-->
              <!--                    <el-button-->
              <!--                      type="text"-->
              <!--                      @click="dialogTableVisible = true"-->
              <!--                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}-->
              <!--                    </el-button>-->
              <!--                    <el-dialog-->
              <!--                      :title="$t('label.PFANSUSERFORMVIEW_SALARY') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"-->
              <!--                      :visible.sync="dialogTableVisible"-->
              <!--                      style="padding-top:5px"-->
              <!--                    >-->
              <!--                      <el-row>-->
              <!--                        <el-col :span="24">-->
              <!--                          <el-table :data="gridData" stripe>-->
              <!--                            <el-table-column-->
              <!--                              property="date"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_TIME')"-->
              <!--                              width="200"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <span style="color:#75a7ef">{{ scope.row.date }}</span>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                            &lt;!&ndash;<el-table-column&ndash;&gt;-->
              <!--                            &lt;!&ndash;property="before"&ndash;&gt;-->
              <!--                            &lt;!&ndash;align="center"&ndash;&gt;-->
              <!--                            &lt;!&ndash;:label="$t('label.PFANSUSERFORMVIEW_BEFORE')"&ndash;&gt;-->
              <!--                            &lt;!&ndash;width="130"&ndash;&gt;-->
              <!--                            &lt;!&ndash;&gt;</el-table-column>&ndash;&gt;-->
              <!--                            &lt;!&ndash;                            del_fjl_05/20   &#45;&#45;注释掉调整前的工资&ndash;&gt;-->
              <!--                            &lt;!&ndash;                            <el-table-column&ndash;&gt;-->
              <!--                            &lt;!&ndash;                              property="after"&ndash;&gt;-->
              <!--                            &lt;!&ndash;                              align="center"&ndash;&gt;-->
              <!--                            &lt;!&ndash;                              :label="$t('label.PFANSUSERFORMVIEW_AFTER')"&ndash;&gt;-->
              <!--                            &lt;!&ndash;                              width="130"&ndash;&gt;-->
              <!--                            &lt;!&ndash;                            >&ndash;&gt;-->
              <!--                            &lt;!&ndash;                              <template slot-scope="scope">&ndash;&gt;-->
              <!--                            &lt;!&ndash;                                <span style="color:#d16765">{{ scope.row.after }}</span>&ndash;&gt;-->
              <!--                            &lt;!&ndash;                              </template>&ndash;&gt;-->
              <!--                            &lt;!&ndash;                            </el-table-column>&ndash;&gt;-->
              <!--                            <el-table-column-->
              <!--                              property="basic"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_BASIC')"-->
              <!--                              width="200"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <span style="color:#d16765">{{ scope.row.basic }}</span>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                            <el-table-column-->
              <!--                              property="duty"-->
              <!--                              align="center"-->
              <!--                              :label="$t('label.PFANSUSERFORMVIEW_DUTY')"-->
              <!--                              width="200"-->
              <!--                            >-->
              <!--                              <template slot-scope="scope">-->
              <!--                                <span style="color:#d16765">{{ scope.row.duty }}</span>-->
              <!--                              </template>-->
              <!--                            </el-table-column>-->
              <!--                            &lt;!&ndash;                            <el-table-column&ndash;&gt;-->
              <!--                            &lt;!&ndash;                              property="remark"&ndash;&gt;-->
              <!--                            &lt;!&ndash;                              align="center"&ndash;&gt;-->
              <!--                            &lt;!&ndash;                              :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')"&ndash;&gt;-->
              <!--                            &lt;!&ndash;                            >&ndash;&gt;-->
              <!--                            &lt;!&ndash;                              <template slot-scope="scope">&ndash;&gt;-->
              <!--                            &lt;!&ndash;                                <el-input style="width:5vw" v-model="scope.row.remark" size="mini" disabled></el-input>&ndash;&gt;-->
              <!--                            &lt;!&ndash;                              </template>&ndash;&gt;-->
              <!--                            &lt;!&ndash;                            </el-table-column>&ndash;&gt;-->
              <!--                            &lt;!&ndash;                            del_fjl_05/20   &#45;&#45;注释掉调整前的工资&ndash;&gt;-->
              <!--                          </el-table>-->
              <!--                        </el-col>-->
              <!--                      </el-row>-->
              <!--                    </el-dialog>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_CAUTION')" label-width="7rem">-->
              <!--                    <el-input class="width" v-model="form.caution" maxlength="20" style="width:20vw"-->
              <!--                              disabled></el-input>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->
            </el-tab-pane>

            <el-tab-pane
              :label="this.$t('label.PFANSUSERFORMVIEW_AFTERJOININGCOMPANY')"
              name="six"
              style="padding-left:0.5%"
            >
              <el-collapse>
<!--                <el-collapse-item>-->
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANSUSERFORMVIEW_AFTERWORk')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table
                        :data="workAfterTable"
                        style="width:72vw;margin-top:1%"
                        border header-cell-class-name="sub_bg_color_blue" stripe
                      >
                        <el-table-column
                          prop="time"
                          :label="$t('label.PFANSUSERFORMVIEW_PERIOD')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-date-picker
                              v-model="scope.row.time"
                              type="daterange"
                              :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                              :start-placeholder="$t('label.startdate')"
                              :end-placeholder="$t('label.enddate')"
                              unlink-panels disabled
                              style="width: 100%"
                            ></el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="programme"
                          :label="$t('label.PFANS5008VIEW_PROGRAM')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.programme" maxlength="20" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.notes" maxlength="50" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" width="200" align="center">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow(scope.$index, workAfterTable)"
                              type="danger"
                              size="small"
                              plain disabled
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              @click="addRow('workafter')"
                              type="primary"
                              size="small"
                              plain disabled
                            >{{$t('button.insert')}}
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
<!--                </el-collapse-item>-->
              </el-collapse>
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANSUSERFORMVIEW_TRAININGPRACTICE')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table :data="trainTable" style="width:72vw;margin-top:1%" border
                                header-cell-class-name="sub_bg_color_blue" stripe>
                        <el-table-column
                          prop="time"
                          :label="$t('label.PFANSUSERFORMVIEW_PERIOD')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-date-picker
                              v-model="scope.row.time"
                              type="daterange" disabled
                              :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                              :start-placeholder="$t('label.startdate')"
                              :end-placeholder="$t('label.enddate')"
                              unlink-panels
                              style="width: 100%"
                            ></el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column prop="programme" :label="$t('label.operation')" align="center">
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.programme" maxlength="20" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.notes" maxlength="50" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" width="200" align="center">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow(scope.$index, trainTable)"
                              type="danger"
                              size="small"
                              plain disabled
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              @click="addRow('train')"
                              type="primary"
                              size="small"
                              plain disabled
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
            <el-tab-pane :label="this.$t('label.PFANSUSERFORMVIEW_REWARDPUNISHMENT')" name="seven"
                         style="padding-left:0.5%">
              <el-collapse>
<!--                <el-collapse-item>-->
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANSUSERFORMVIEW_REWARDPUNISHMENT')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="24">
                      <el-table :data="rewardTable" style="width:72vw;margin-top:1%" border
                                header-cell-class-name="sub_bg_color_blue" stripe>
                        <el-table-column
                          prop="notes"
                          :label="$t('label.PFANS3004VIEW_NAME')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.programme" maxlength="20" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="time"
                          :label="$t('label.PFANSUSERFORMVIEW_TIME')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-date-picker
                              v-model="scope.row._time"
                              type="date" disabled
                              :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                              style="width: 100%"
                            ></el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="notes"
                          :label="$t('label.PFANSUSERFORMVIEW_EXPLAIN')"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-input class="width" v-model="scope.row.notes" maxlength="50" style="width: 100%"
                                      disabled></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" width="200" align="center">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow(scope.$index, rewardTable)"
                              type="danger"
                              size="small"
                              plain disabled
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              @click="addRow('reward')"
                              type="primary"
                              size="small"
                              plain disabled
                            >{{$t('button.insert')}}
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
<!--                </el-collapse-item>-->
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane :label="this.$t('label.PFANSUSERFORMVIEW_EDITUSER')" name="eight" style="padding-left:0.5%">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_RESIGNATIONDATE')" prop="resignation_date">
                    <el-date-picker style="width:20vw" v-model="form.resignation_date" disabled>
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_REASON2')" prop="reason2">
                    <el-input style="width:20vw" v-model="form.reason2" disabled type="textarea">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('title.PFANS2026VIEW')"
                                v-if="this.form.staffexitprocedure !==''&& this.form.staffexitprocedure !==null">
                    <router-link :to="{ name: 'PFANS2026FormView',
                   params: { _id: this.form.staffexitprocedure, disabled: true}}">{{this.$t('button.view')}}
                    </router-link>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {isvalidPhone} from '@/utils/validate';
  import {Message} from 'element-ui';
  import org from '@/view/components/org';
  import dicselect from '../components/dicselect';
  import moment from 'moment';
  import {getDictionaryInfo} from "../../utils/customize";

  export default {
    name: 'usersFormViewByPerson',
    components: {
      EasyNormalContainer,
      org,
      dicselect,
    },
    data() {
      var validateTel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('label.PFANSUSERFORMVIEW_TRUEMOBILE')));
        } else if (!isvalidPhone(value)) {
          callback(new Error(this.$t('label.PFANSUSERFORMVIEW_EFFECTIVEMOBILE')));
        } else {
          let params = {
            id: this.$route.params._id,
            mobilenumber: value,
          };
          this.$store
            .dispatch('usersStore/mobileCheck', params)
            .then(response => {
              if (response.code != 0) {
                callback(new Error(response.message));
              } else {
                callback();
              }
            })
            .catch(err => {
              callback(new Error(err));
            });
        }
      };

      var validateId = (rule, value, callback) => {
        if (
          !/^\d{2}(0[1-9]|[1-9][0-9])\d{2}((((1[6-9]|[2-9]\d)\d{2})(0[13578]|1[02])(0[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})(0[13456789]|1[012])(0[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})02(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))0229))\d{3}(\d|x|X)$/i.test(
            value,
          )
        ) {
          callback(new Error(this.$t('label.PFANSUSERFORMVIEW_TRUEIDNUMBER')));
        } else {
          callback();
        }
      };

      var centerId = (rule, value, callback) => {
        if (!this.form.centerid || this.form.centerid === '') {
          callback(new Error(this.$t('normal.error_08') + 'center'));
          this.error = this.$t('normal.error_08') + 'center';
        } else {
          callback();
        }
      };

      return {
        age: '',
        code: '',
        code1: 'PG021',
        occupationtypecode: '',
        occupationtypedis: true,
        display: true,
        occupationtypedisplay: true,
        oldageData: null,
        houseData: null,
          // add_fjl
          syeData: null,
          syuData: null,
          rankData: null,
          postData: null,
          gsData: null,
          // add_fjl
        medicalData: null,
        gridData: null,
        dialogTableVisible: false,
        dialogTableVisible2: false,
        dialogTableVisible3: false,
        dialogTableVisible4: false,
          // add_fjl
          dialogTableVisible6: false,
          dialogTableVisible7: false,
          dialogTableVisible8: false,
          dialogTableVisible9: false,
          dialogTableVisible10: false,
          // add_fjl
        loading: false,
        error: '',
        educationTable: [
          {
            time: [],
            school: '',
            notes: '',
          },
        ],
        skillTable: [
          {
            name: '',
            ability: '',
            notes: '',
          },
        ],
        languageTable: [
          {
            programme: '',
            level: '',
            notes: '',
          },
        ],
        beforeWorkTable: [
          {
            time: [],
            company: '',
            postion: '',
            notes: '',
          },
        ],
        workAfterTable: [
          {
            time: [],
            programme: '',
            notes: '',
          },
        ],
        trainTable: [
          {
            time: [],
            programme: '',
            notes: '',
          },
        ],
        rewardTable: [
          {
            programme: '',
            _time: '',
            notes: '',
          },
        ],

        activeName: 'first',
        difference_options: [
          {value: '1', label: this.$t('label.PFANSUSERFORMVIEW_NEWSTAFF')},
          {
            value: '2',
            label: this.$t('label.PFANSUSERFORMVIEW_OLDSTAFF'),
          },
        ],
        rank_options: [
          {value: '0', label: this.$t('label.PFANSUSERVIEW_MEMBERS')},
          {
            value: '1',
            label: this.$t('label.PFANSUSERVIEW_OUTGOING'),
          },
        ],
        laborcontracttype: [
          {value: '0', label: this.$t('label.PFANSUSERFORMVIEW_FIXEDTIME')},
          {
            value: '1',
            label: this.$t('label.PFANSUSERFORMVIEW_NOFIXEDTIME'),
          },
        ],
        marital_options: [
          {value: '0', label: this.$t('label.PFANSUSERFORMVIEW_UNMARRIED')},
          {
            value: '1',
            label: this.$t('label.PFANSUSERFORMVIEW_MARRIED'),
          },
        ],
        experience_options: [
          {value: '0', label: this.$t('label.PFANSUSERFORMVIEW_YES')},
          {
            value: '1',
            label: this.$t('label.PFANSUSERFORMVIEW_NO'),
          },
        ],
        form: {
          type: '',
          centername: '',
          groupname: '',
          teamname: '',
          customername: '',
          sex: '',
          adfield: '',
          birthday: '',
          nationality: '',
          nation: '',
          register: '',
          idnumber: '',
          passport: '',
          security: '',
          housefund: '',
          marital: '0',
          children: '',
          experience: '',
          address: '',
          email: '',
          mobilenumber: '',
          phone: '',
          extension: '',
          graduation: '',
          degree: '',
          educational: '',
          specialty: '',
          graduationday: '',
          workday: '',
          departmentid: [],
          centerid: '',
          groupid: '',
          teamid: '',
          budgetunit: '',
          userid: '',
          jobnumber: '',
          personalcode: '',
          difference: '1',
          post: '',
          rank: '',
          occupationtype: '',
          laborcontracttype: '',
          fixedate: '',
          laborcontractday: '',
          enterday: '',
          upgraded: '',
          annualyear: '',
          annuallastyear: '',
          welfareyear: '',
          welfarelastyear: '',
          restyear: '',
          restlastyear: '',
          seatnumber: '',
          salary: '',
          duty: '',
          basic: '',
          caution: '',
          resignation_date: '',
          reason2: '',
          staffexitprocedure: '',
          oldageinsurance: '',
          houseinsurance: '',
          medicalinsurance: '',
          informationid: '',
          title: '',
          availablestate: '0',
            // ADD-LXX
            yanglaoinsurance: '',
            yiliaoinsurance: '',
            shiyeinsurance: '',
            gongshanginsurance: '',
            shengyuinsurance: '',
            // ADD-LXX
        },
          //add_fjl
          feedingchangeday: '',
          //add_fjl
        disable: false,
        userToRoleId: '',
        userInfo: {
          userAccount: {},
          customerInfo: {},
        },
        baseInfoForm: {
          email: '',
          departmentid: [],
        },
        title: 'label.PFANSUSERVIEW_USER',
        isEdit: false,
        status: '0',
        buttonList: [
          {key: 'userSave', name: this.$t('button.save')},
        ],
        rules: {
          adfield: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_ADFIELD'),
              trigger: 'blur',
            },
          ],
          customername: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME'),
              trigger: 'blur',
            },
          ],
          sex: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.sex'),
              trigger: 'change',
            },
          ],
          birthday: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERVIEW_BIRTHDAY'),
              trigger: 'blur',
            },
          ],
          nation: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_NATION'),
              trigger: 'blur',
            },
          ],
          nationality: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERVIEW_NATIONALITY'),
              trigger: 'blur',
            },
          ],
          register: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_REGISTER'),
              trigger: 'blur',
            },
          ],
          centerid: [
            {
              required: true,
              validator: centerId,
              trigger: 'blur',
            },
          ],
          idnumber: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_IDNUMBER'),
              trigger: 'blur',
            },
            {
              validator: validateId,
              trigger: 'blur',
            },
          ],
          marital: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_MARITAL'),
              trigger: 'change',
            },
          ],
          address: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_ADDRESS'),
              trigger: 'blur',
            },
          ],
          //ccm 课题票对应
          // phone: [
          //   {
          //     required: true,
          //     message:
          //       this.$t('normal.error_08') +
          //       this.$t('label.PFANSUSERFORMVIEW_PHONE'),
          //     trigger: 'blur',
          //   },
          // ],
          //ccm 课题票对应
          extension: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_EXTENSION'),
              trigger: 'blur',
            },
          ],
          graduation: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_GRADUATION'),
              trigger: 'blur',
            },
          ],
          degree: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_DEGREE'),
              trigger: 'change',
            },
          ],
          educational: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_EDUCATIONAL'),
              trigger: 'change',
            },
          ],
          specialty: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_SPECIALTY'),
              trigger: 'blur',
            },
          ],
          graduationday: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_GRADUATIONDAY'),
              trigger: 'blur',
            },
          ],
          workday: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_WORKDAY'),
              trigger: 'blur',
            },
          ],
          jobnumber: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_JOBNUMBER'),
              trigger: 'blur',
            },
          ],
          type: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.type'),
              trigger: 'change',
            },
          ],
          rank: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_RANK'),
              trigger: 'change',
            },
          ],
          occupationtype: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_OCCUPATIONTYPE'),
              trigger: 'change',
            },
          ],
          post: [
            {
              required: true,
              message:
                this.$t('normal.error_08') + this.$t('label.PFANSUSERVIEW_POST'),
              trigger: 'change',
            },
          ],
          laborcontractday: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_LABORCONTRACTDAY'),
              trigger: 'blur',
            },
          ],
          enterday: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_ENTERDAY'),
              trigger: 'blur',
            },
          ],
          // annualyear: [
          //   {
          //     required: true,
          //     message:
          //       this.$t("normal.error_08") +
          //       this.$t("label.PFANSUSERFORMVIEW_ANNUALYEAR"),
          //     trigger: "blur"
          //   }
          // ],
          // annuallastyear: [
          //   {
          //     required: true,
          //     message:
          //       this.$t("normal.error_08") +
          //       this.$t("label.PFANSUSERFORMVIEW_ANNUALLASTYEAR"),
          //     trigger: "blur"
          //   }
          // ],
          // welfareyear: [
          //   {
          //     required: true,
          //     message:
          //       this.$t("normal.error_08") +
          //       this.$t("label.PFANSUSERFORMVIEW_WELFAREYEAR"),
          //     trigger: "blur"
          //   }
          // ],
          // welfarelastyear: [
          //   {
          //     required: true,
          //     message:
          //       this.$t("normal.error_08") +
          //       this.$t("label.PFANSUSERFORMVIEW_WELFARELASTYEAR"),
          //     trigger: "blur"
          //   }
          // ],
          // restyear: [
          //   {
          //     required: true,
          //     message:
          //       this.$t("normal.error_08") +
          //       this.$t("label.PFANSUSERFORMVIEW_RESTYEAR"),
          //     trigger: "blur"
          //   }
          // ],
          // restlastyear: [
          //   {
          //     required: true,
          //     message:
          //       this.$t("normal.error_08") +
          //       this.$t("label.PFANSUSERFORMVIEW_RESTLASTYEAR"),
          //     trigger: "blur"
          //   }
          // ],
          seatnumber: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_SEATNUMBER'),
              trigger: 'blur',
            },
          ],
          basic: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_BASIC'),
              trigger: 'blur',
            },
          ],
          duty: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_DUTY'),
              trigger: 'blur',
            },
          ],
            // 暂时注释掉-lxx
            // oldageinsurance: [
            //   {
            //     required: true,
            //     message:
            //       this.$t('normal.error_08') +
            //       this.$t('label.PFANSUSERFORMVIEW_OLDAGEINSURANCE'),
            //     trigger: 'blur',
            //   },
            // ],
            // 暂时注释掉-lxx
          houseinsurance: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_HOUSEINSURANCE'),
              trigger: 'blur',
            },
          ],
            // 暂时注释掉-lxx
            // medicalinsurance: [
            //   {
            //     required: true,
            //     message:
            //       this.$t('normal.error_08') +
            //       this.$t('label.PFANSUSERFORMVIEW_MEDICALINSURANCE'),
            //     trigger: 'blur',
            //   },
            // ],
            // 暂时注释掉-lxx
            // ADD-LXX
            yanglaoinsurance: [
                {
                    required: true,
                    message:
                        this.$t('normal.error_08') +
                        this.$t('label.PFANSUSERFORMVIEW_YANGLAOINSURANCE'),
                    trigger: 'blur',
                },
            ],
            yiliaoinsurance: [
                {
                    required: true,
                    message:
                        this.$t('normal.error_08') +
                        this.$t('label.PFANSUSERFORMVIEW_YILIAOINSURANCE'),
                    trigger: 'blur',
                },
            ],
            shiyeinsurance: [
                {
                    required: true,
                    message:
                        this.$t('normal.error_08') +
                        this.$t('label.PFANSUSERFORMVIEW_SHIYEINSURANCE'),
                    trigger: 'blur',
                },
            ],
            gongshanginsurance: [
                {
                    required: true,
                    message:
                        this.$t('normal.error_08') +
                        this.$t('label.PFANSUSERFORMVIEW_GONGSHANGINSURANCE'),
                    trigger: 'blur',
                },
            ],
            shengyuinsurance: [
                {
                    required: true,
                    message:
                        this.$t('normal.error_08') +
                        this.$t('label.PFANSUSERFORMVIEW_SHENGYUINSURANCE'),
                    trigger: 'blur',
                },
            ],
            // ADD-LXX
          //ccm 课题票对应
          // mobilenumber: [
          //   {
          //     required: true,
          //     message: this.$t('normal.error_08') + this.$t('label.user_mobile'),
          //   },
          //   {validator: validateTel, trigger: 'blur'},
          // ],
          //ccm 课题票对应
          email: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
              trigger: 'blur',
            },
            {
              type: 'email',
              message: this.$t('label.PFANSUSERFORMVIEW_TRUEEMAILADDRESS'),
              trigger: ['blur', 'change'],
            },
          ],
        },
      };
    },
    computed: {
      // birthday: {
      //   get() {
      //     return this.form.birthday;
      //   },
      //   set(val) {
      //     this.form.birthday = val;
      //   }
      // }
    },
    watch: {
      form: {
        handler: function() {
          this.form.salary = this.form.duty + this.form.basic;
        },
        deep: true,
      },
      userToRoleId(val) {
        if (val) {
          this.$router.push({
            name: 'usersToRoleView',
            params: {
              _id: val,
            },
          });
        }
      },
      // birthday(val) {
      //   if (val) {
      //     this.form.age =
      //       moment().format("YYYY") - moment(val).format("YYYY") > 0
      //         ? moment().format("YYYY") - moment(val).format("YYYY")
      //         : 0;
      //   }
      // }
    },
    mounted() {
      this.form.staffexitprocedure;
      if (this.$route.params._org) {
        ({
          centername: this.form.centername,
          groupname: this.form.groupname,
          teamname: this.form.teamname,
          centerid: this.form.centerid,
          groupid: this.form.groupid,
          teamid: this.form.teamid,
          budgetunit: this.form.budgetunit,
        } = this.$route.params._org);
      }

      // if (this.$route.params._id) {
      this.getById();
      // }
    },
    methods: {
      // ADD-WS-生年月日change事件
      getAge() {
        let birthdays = new Date(this.form.birthday);
        let d = new Date();
        let age = 0;
        let agenew = 0;
        age = d.getFullYear() - birthdays.getFullYear();
        agenew = d.getFullYear() - birthdays.getFullYear();
        if (d.getMonth() > birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() > birthdays.getDate())) {
          agenew = age;
        } else {
          agenew = age - 1;
        }
        this.age = agenew;
      },
      // ADD-WS-生年月日change事件
      checkRequire() {
        if (
          !this.form.customername ||
          !this.form.sex ||
          !this.form.adfield ||
          !this.form.birthday ||
          !this.form.nationality ||
          !this.form.nation ||
          !this.form.register ||
          !this.form.idnumber ||
          !this.form.marital ||
          !this.form.address ||
          !this.form.email ||
          !this.form.mobilenumber ||
          !this.form.phone ||
          !this.form.extension
        ) {
          this.activeName = 'first';
        } else if (
          !this.form.graduation ||
          !this.form.degree ||
          !this.form.educational ||
          !this.form.specialty ||
          !this.form.nation ||
          !this.form.graduationday
        ) {
          this.activeName = 'second';
        } else if (!this.form.workday) {
          this.activeName = 'fouth';
        } else if (
          !this.form.jobnumber ||
          !this.form.type ||
          !this.form.rank ||
          !this.form.occupationtype ||
          !this.form.centerid ||
          !this.form.post ||
          !this.form.laborcontractday ||
          !this.form.enterday ||
          this.form.annualyear === undefined ||
          this.form.annuallastyear === undefined ||
          this.form.welfareyear === undefined ||
          this.form.welfarelastyear === undefined ||
          this.form.restyear === undefined ||
          this.form.restlastyear === undefined ||
          !this.form.seatnumber ||
          !this.form.duty ||
          !this.form.basic ||
            // this.form.oldageinsurance === undefined ||
          this.form.houseinsurance === undefined ||
            // this.form.medicalinsurance === undefined
            // ADD-LXX
            this.form.yanglaoinsurance === undefined ||
            this.form.yiliaoinsurance === undefined ||
            this.form.shiyeinsurance === undefined ||
            this.form.gongshanginsurance === undefined ||
            this.form.shengyuinsurance === undefined
        // ADD-LXX
        ) {
          this.activeName = 'five';
        }
      },
      changePost(val) {
        this.form.post = val;
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          Object.keys(rows[0]).forEach(key => {
            rows[0][key] = '';
            if (key === 'time') {
              rows[0][key] = [];
            }
          });
        }
      },
      addRow(val) {
        if (val === 'education') {
          this.educationTable.push({
            time: [],
            school: '',
            notes: '',
          });
        } else if (val === 'skill') {
          this.skillTable.push({
            name: '',
            ability: '',
            notes: '',
          });
        } else if (val === 'language') {
          this.languageTable.push({
            programme: '',
            level: '',
            notes: '',
          });
        } else if (val === 'beforeWork') {
          this.beforeWorkTable.push({
            time: [],
            company: '',
            postion: '',
            notes: '',
          });
        } else if (val === 'workafter') {
          this.workAfterTable.push({
            time: [],
            programme: '',
            notes: '',
          });
        } else if (val === 'train') {
          this.trainTable.push({
            time: [],
            programme: '',
            notes: '',
          });
        } else if (val === 'reward') {
          this.rewardTable.push({
            programme: '',
            _time: '',
            notes: '',
          });
        }
      },
      changeEducational(val) {
        this.form.educational = val;
      },
      changesex(val) {
        this.form.sex = val;
      },
      changeDegree(val) {
        this.form.degree = val;
      },
      changeRank(val) {
        if (val) {
          this.display = false;
          this.$nextTick(
            () => {
              if (this.form.type === '0') {
                this.code = 'PR021';
                this.occupationtypecode = 'PR055';
                this.rules.occupationtype[0].required = true;
              } else if (this.form.type === '1') {
                this.code = 'PJ053';
                this.rules.occupationtype[0].required = false;
              }
              this.form.occupationtype = '';
              this.occupationtypedisplay = true;
              this.form.rank = '';
              this.display = true;
            },
          );
        } else {
          if (this.form.type === '0') {
            this.code = 'PR021';
            this.occupationtypecode = 'PR055';
            this.rules.occupationtype[0].required = true;
            if (this.form.rank === 'PR021001' || this.form.rank === 'PR021002'
              || this.form.rank === 'PR021003' || this.form.rank === 'PR021004') {
              this.occupationtypedis = true;
              this.form.occupationtype = 'PR055001';
            } else {
              this.occupationtypedis = false;
            }
          } else if (this.form.type === '1') {
            this.form.occupationtype = '';
            this.rules.occupationtype[0].required = false;
            this.code = 'PJ053';
          }
        }
      },
      getRank(val) {
        if (val) {
          this.form.rank = val;
          this.$nextTick(
            () => {
              if (this.code === 'PR021') {
                this.rules.occupationtype[0].required = true;
                if (this.form.rank === 'PR021001' || this.form.rank === 'PR021002'
                  || this.form.rank === 'PR021003' || this.form.rank === 'PR021004') {
                  this.occupationtypedis = true;
                  this.form.occupationtype = 'PR055001';
                } else {
                  this.occupationtypedis = false;
                }
              } else {
                this.rules.occupationtype[0].required = false;
              }
            },
          );
        }
      },
      getOccupationtype(val) {
        this.form.occupationtype = val;
      },
      getCenterid(val) {
        this.getOrgInformation(val);
        if (!val || this.form.centerid === '') {
          this.error = this.$t('normal.error_08') + 'center';
        } else {
          this.error = '';
        }
      },
      getGroupid(val) {
        this.getOrgInformation(val);
        if (this.form.centerid === '') {
          this.error = this.$t('normal.error_08') + 'center';
        } else {
          this.error = '';
        }
      },
      getTeamid(val) {
        this.getOrgInformation(val);
        if (this.form.centerid === '') {
          this.error = this.$t('normal.error_08') + 'center';
        } else {
          this.error = '';
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
      getById() {
        this.loading = true;
        this.$store
          .dispatch('usersStore/getme')
          .then(response => {
            this.form = response.customerInfo.userinfo;
            if (response.customerInfo.userinfo.birthday != '') {
              let birthdays = new Date(
                response.customerInfo.userinfo.birthday.replace(/-/g, '/'),
              );
              let d = new Date();
              let age = 0;
              let agenew = 0;
              age = d.getFullYear() - birthdays.getFullYear();
              agenew = d.getFullYear() - birthdays.getFullYear();
              if (
                d.getMonth() > birthdays.getMonth() ||
                (d.getMonth() == birthdays.getMonth() &&
                  d.getDate() > birthdays.getDate())
              ) {
                agenew = age;
              } else {
                agenew = age - 1;
              }
              this.age = agenew;
            } else {
              this.age = 0;
            }
            this.status = response.customerInfo.status;
            this.userInfo.userAccount = response.userAccount;
            this.userInfo.customerInfo = response.customerInfo;
            this.educationTable = this.userInfo.customerInfo.userinfo.educationTable;
            if (this.educationTable == null) {
              this.educationTable = [
                {
                  time: [],
                  school: '',
                  notes: '',
                },
              ];
            }
            this.skillTable = this.userInfo.customerInfo.userinfo.skillTable;
            if (this.skillTable == null) {
              this.skillTable = [
                {
                  name: '',
                  ability: '',
                  notes: '',
                },
              ];
            }
            this.languageTable = this.userInfo.customerInfo.userinfo.languageTable;
            if (this.languageTable == null) {
              this.languageTable = [
                {
                  programme: '',
                  level: '',
                  notes: '',
                },
              ];
            }
            this.beforeWorkTable = this.userInfo.customerInfo.userinfo.beforeWorkTable;
            if (this.beforeWorkTable == null) {
              this.beforeWorkTable = [
                {
                  time: [],
                  company: '',
                  postion: '',
                  notes: '',
                },
              ];
            }
            this.workAfterTable = this.userInfo.customerInfo.userinfo.workAfterTable;
            if (this.workAfterTable == null) {
              this.workAfterTable = [
                {
                  time: [],
                  programme: '',
                  notes: '',
                },
              ];
            }
            this.trainTable = this.userInfo.customerInfo.userinfo.trainTable;
            if (this.trainTable == null) {
              this.trainTable = [
                {
                  time: [],
                  programme: '',
                  notes: '',
                },
              ];
            }
            this.rewardTable = this.userInfo.customerInfo.userinfo.rewardTable;
            if (this.rewardTable == null) {
              this.rewardTable = [
                {
                  programme: '',
                  _time: '',
                  notes: '',
                },
              ];
            }
              // add_fjl_05/21   --添加履历的处理
              //给料履历
              let letgridData = this.userInfo.customerInfo.userinfo.gridData;
              if (letgridData !== null && letgridData !== '') {
                  this.gridData = [];
                  for (let g = 0; g < letgridData.length; g++) {
                      //最后一次的变更日期
                      if (letgridData[g].date !== null && letgridData[g].date !== '') {
                          // if (letgridData[g].basic !== "0" && letgridData[g].duty !== "0") {
                          this.feedingchangeday = letgridData[0].date;
                          let gridData = {};
                          gridData.basic = letgridData[g].basic;
                          gridData.duty = letgridData[g].duty;
                          if (letgridData[g].date.length != 10) {
                              gridData.date = moment(letgridData[g].date).format("YYYY-MM-DD");
                          } else {
                              gridData.date = letgridData[g].date;
                          }
                          this.gridData.push(gridData);
                          // }
                      }
                  }
              }
              //养老保险基数履历
              let oldageData = this.userInfo.customerInfo.userinfo.oldageData;
              if (oldageData !== null && oldageData !== '') {
                  this.oldageData = [];
                  for (let g = 0; g < oldageData.length; g++) {
                      if (oldageData[g].date !== null && oldageData[g].date !== '' &&
                          oldageData[g].basic !== null && oldageData[g].basic !== '') {
                          let letoldageData = {};
                          letoldageData.basic = oldageData[g].basic;
                          if (oldageData[g].date.length != 10) {
                              letoldageData.date = moment(oldageData[g].date).format("YYYY-MM-DD");
                          } else {
                              letoldageData.date = oldageData[g].date;
                          }
                          this.oldageData.push(letoldageData);
                      }
                  }
              }
              //住房保险基数履历
              let houseData = this.userInfo.customerInfo.userinfo.houseData;
              if (houseData !== null && houseData !== '') {
                  this.houseData = [];
                  for (let g = 0; g < houseData.length; g++) {
                      if (houseData[g].date !== null && houseData[g].date !== '' &&
                          houseData[g].basic !== null && houseData[g].basic !== '') {
                          let lethouseData = {};
                          lethouseData.basic = houseData[g].basic;
                          if (houseData[g].date.length != 10) {
                              lethouseData.date = moment(houseData[g].date).format("YYYY-MM-DD");
                          } else {
                              lethouseData.date = houseData[g].date;
                          }
                          this.houseData.push(lethouseData);
                      }
                  }
              }
              //医疗保险基数履历
              let medicalData = this.userInfo.customerInfo.userinfo.medicalData;
              if (medicalData !== null && medicalData !== '') {
                  this.medicalData = [];
                  for (let g = 0; g < medicalData.length; g++) {
                      if (medicalData[g].date !== null && medicalData[g].date !== '' &&
                          medicalData[g].basic !== null && medicalData[g].basic !== '') {
                          let letmedicalData = {};
                          letmedicalData.basic = medicalData[g].basic;
                          if (medicalData[g].date.length != 10) {
                              letmedicalData.date = moment(medicalData[g].date).format("YYYY-MM-DD");
                          } else {
                              letmedicalData.date = medicalData[g].date;
                          }
                          this.medicalData.push(letmedicalData);
                      }
                  }
              }
              //失业保险基数履历
              let syeData = this.userInfo.customerInfo.userinfo.syeData;
              if (syeData !== null && syeData !== '') {
                  this.syeData = [];
                  for (let g = 0; g < syeData.length; g++) {
                      if (syeData[g].date !== null && syeData[g].date !== '' &&
                          syeData[g].basic !== null && syeData[g].basic !== '') {
                          let letsyeData = {};
                          letsyeData.basic = syeData[g].basic;
                          if (syeData[g].date.length != 10) {
                              letsyeData.date = moment(syeData[g].date).format("YYYY-MM-DD");
                          } else {
                              letsyeData.date = syeData[g].date;
                          }
                          this.syeData.push(letsyeData);
                      }
                  }
              }
              //生育保险基数履历
              let syuData = this.userInfo.customerInfo.userinfo.syuData;
              if (syuData !== null && syuData !== '') {
                  this.syuData = [];
                  for (let g = 0; g < syuData.length; g++) {
                      if (syuData[g].date !== null && syuData[g].date !== '' &&
                          syuData[g].basic !== null && syuData[g].basic !== '') {
                          let letsyuData = {};
                          letsyuData.basic = syuData[g].basic;
                          if (syuData[g].date.length != 10) {
                              letsyuData.date = moment(syuData[g].date).format("YYYY-MM-DD");
                          } else {
                              letsyuData.date = syuData[g].date;
                          }
                          this.syuData.push(letsyuData);
                      }
                  }
              }
              //工伤保险基数履历
              let gsData = this.userInfo.customerInfo.userinfo.gsData;
              if (gsData !== null && gsData !== '') {
                  this.gsData = [];
                  for (let g = 0; g < gsData.length; g++) {
                      if (gsData[g].date !== null && gsData[g].date !== '' &&
                          gsData[g].basic !== null && gsData[g].basic !== '') {
                          let letgsData = {};
                          letgsData.basic = gsData[g].basic;
                          if (gsData[g].date.length != 10) {
                              letgsData.date = moment(gsData[g].date).format("YYYY-MM-DD");
                          } else {
                              letgsData.date = gsData[g].date;
                          }
                          this.gsData.push(letgsData);
                      }
                  }
              }
              //rank
              let rankData = this.userInfo.customerInfo.userinfo.rankData;
              if (rankData !== null && rankData !== '') {
                  this.rankData = [];
                  for (let g = 0; g < rankData.length; g++) {
                      if (rankData[g].date !== null && rankData[g].date !== '' &&
                          rankData[g].basic !== null && rankData[g].basic !== '') {
                          let letrankData = {};
                          letrankData.basic = getDictionaryInfo(rankData[g].basic).value1;
                          if (rankData[g].date.length != 10) {
                              letrankData.date = moment(rankData[g].date).format("YYYY-MM-DD");
                          } else {
                              letrankData.date = rankData[g].date;
                          }
                          this.rankData.push(letrankData);
                      }
                  }
              }
              //职务
              let postData = this.userInfo.customerInfo.userinfo.postData;
              if (postData !== null && postData !== '') {
                  this.postData = [];
                  for (let g = 0; g < postData.length; g++) {
                      if (postData[g].date !== null && postData[g].date !== '' &&
                          postData[g].basic !== null && postData[g].basic !== '') {
                          let letpostData = {};
                          letpostData.basic = getDictionaryInfo(postData[g].basic).value1;
                          if (postData[g].date.length != 10) {
                              letpostData.date = moment(postData[g].date).format("YYYY-MM-DD");
                          } else {
                              letpostData.date = postData[g].date;
                          }
                          this.postData.push(letpostData);
                      }
                  }
              }
              // add_fjl_05/21   --添加履历的处理
              // this.gridData = this.userInfo.customerInfo.userinfo.gridData;
              // this.oldageData = this.userInfo.customerInfo.userinfo.oldageData;
              // this.houseData = this.userInfo.customerInfo.userinfo.houseData;
              // this.medicalData = this.userInfo.customerInfo.userinfo.medicalData;
            this.changeRank();
            this.loading = false;
          })
          .catch(err => {
            Message({
              message: err,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },

      cancelForm() {
        this.$refs.container.buttonClick('back');
      },

      buttonClick(val) {
        this.loading = true;
        if (val === 'userSave') {
          this.userSave('userSave');
        } else if (val === 'userSaveToRole') {
          this.userSave('userSaveToRole');
        }
      },
        Personal() {
            //给料
            if (this.gridData === null) {
                this.gridData = [
                    {
                        date: moment(this.feedingchangeday).format("YYYY-MM-DD"),
                        // before: '',
                        // after: this.form.salary,
                        duty: this.form.duty,
                        basic: this.form.basic,
                        // remark: '',
                    },
                ];
            } else if (
                this.gridData.length > 0 &&
                this.form.salary.toString() !==
                this.gridData[this.gridData.length - 1].basic
            ) {
                // add_fjl_05/19  --添加一天一条履历的判断
                let addflg = 0;
                for (let a = 0; a < this.gridData.length; a++) {
                    if (this.gridData[a].date === moment(this.feedingchangeday).format("YYYY-MM-DD")) {
                        addflg = 1;
                        // this.gridData[a].before = this.gridData[this.gridData.length - 1].after;
                        // this.gridData[a].after = this.form.after;
                        this.gridData[a].duty = this.form.duty;
                        this.gridData[a].basic = this.form.basic;
                    }
                }
                if (addflg === 0) {
                    this.gridData.push({
                        date: moment(this.feedingchangeday).format("YYYY-MM-DD"),
                        // before: this.gridData[this.gridData.length - 1].after,
                        // after: this.form.salary,
                        duty: this.form.duty,
                        basic: this.form.basic,
                        // remark: '',
                    });
                }
                // add_fjl_05/19  --添加一天一条履历的判断
            }
            //医疗
            if (this.medicalData === null) {
                this.medicalData = [
                    {
                        date: new moment().format('YYYY-MM-DD'),
                        basic: this.form.yiliaoinsurance,
                    },
                ];
            } else if (this.form.yiliaoinsurance != null) {
                if (this.medicalData.length > 0 &&
                    this.form.yiliaoinsurance.toString() !==
                    this.medicalData[this.medicalData.length - 1].basic) {
                    // add_fjl_05/19  --添加一天一条履历的判断
                    let addflg = 0;
                    for (let a = 0; a < this.medicalData.length; a++) {
                        if (this.medicalData[a].date === moment(new Date()).format("YYYY-MM-DD")) {
                            addflg = 1;
                            this.medicalData[a].basic = this.form.yiliaoinsurance;
                        }
                    }
                    if (addflg === 0) {
                        this.medicalData.push({
                            date: new moment().format('YYYY-MM-DD'),
                            basic: this.form.yiliaoinsurance
                        });
                    }
                    // add_fjl_05/19  --添加一天一条履历的判断
                }
            }
            //住房
            if (this.houseData === null) {
                this.houseData = [
                    {
                        date: new moment().format('YYYY-MM-DD'),
                        basic: this.form.houseinsurance,
                    },
                ];
            } else if (this.form.houseinsurance != null) {
                if (this.houseData.length > 0 && this.form.houseinsurance.toString() !==
                    this.houseData[this.houseData.length - 1].basic) {
                    // add_fjl_05/19  --添加一天一条履历的判断
                    let addflg = 0;
                    for (let a = 0; a < this.houseData.length; a++) {
                        if (this.houseData[a].date === moment(new Date()).format("YYYY-MM-DD")) {
                            addflg = 1;
                            this.houseData[a].basic = this.form.houseinsurance;
                        }
                    }
                    if (addflg === 0) {
                        this.houseData.push({
                            date: new moment().format('YYYY-MM-DD'),
                            basic: this.form.houseinsurance,
                        });
                    }
                    // add_fjl_05/19  --添加一天一条履历的判断
                }
            }
            //养老
            if (this.oldageData === null) {
                this.oldageData = [
                    {
                        date: new moment().format('YYYY-MM-DD'),
                        basic: this.form.yanglaoinsurance,
                    },
                ];
            } else if (this.form.yanglaoinsurance != null
            ) {
                if (this.oldageData.length > 0 &&
                    this.form.yanglaoinsurance.toString() !==
                    this.oldageData[this.oldageData.length - 1].basic) {
                    // add_fjl_05/19  --添加一天一条履历的判断
                    let addflg = 0;
                    for (let a = 0; a < this.oldageData.length; a++) {
                        if (this.oldageData[a].date === moment(new Date()).format("YYYY-MM-DD")) {
                            addflg = 1;
                            this.oldageData[a].basic = this.form.yanglaoinsurance;
                        }
                    }
                    if (addflg === 0) {
                        this.oldageData.push({
                            date: new moment().format('YYYY-MM-DD'),
                            basic: this.form.yanglaoinsurance,
                        });
                    }
                    // add_fjl_05/19  --添加一天一条履历的判断
                }
            }
            //工伤
            if (this.gsData === null) {
                this.gsData = [
                    {
                        date: new moment().format('YYYY-MM-DD'),
                        basic: this.form.gongshanginsurance,
                    },
                ];
            } else if (this.form.gongshanginsurance != null
            ) {
                if (this.gsData.length > 0 &&
                    this.form.gongshanginsurance.toString() !==
                    this.gsData[this.gsData.length - 1].basic) {
                    // add_fjl_05/19  --添加一天一条履历的判断
                    let addflg = 0;
                    for (let a = 0; a < this.gsData.length; a++) {
                        if (this.gsData[a].date === moment(new Date()).format("YYYY-MM-DD")) {
                            addflg = 1;
                            this.gsData[a].basic = this.form.gongshanginsurance;
                        }
                    }
                    if (addflg === 0) {
                        this.gsData.push({
                            date: new moment().format('YYYY-MM-DD'),
                            basic: this.form.gongshanginsurance,
                        });
                    }
                    // add_fjl_05/19  --添加一天一条履历的判断
                }
            }
            //失业
            if (this.syeData === null) {
                this.syeData = [
                    {
                        date: new moment().format('YYYY-MM-DD'),
                        basic: this.form.shiyeinsurance,
                    },
                ];
            } else if (this.form.shiyeinsurance != null
            ) {
                if (this.syeData.length > 0 &&
                    this.form.shiyeinsurance.toString() !==
                    this.syeData[this.syeData.length - 1].basic) {
                    // add_fjl_05/19  --添加一天一条履历的判断
                    let addflg = 0;
                    for (let a = 0; a < this.syeData.length; a++) {
                        if (this.syeData[a].date === moment(new Date()).format("YYYY-MM-DD")) {
                            addflg = 1;
                            this.syeData[a].basic = this.form.shiyeinsurance;
                        }
                    }
                    if (addflg === 0) {
                        this.syeData.push({
                            date: new moment().format('YYYY-MM-DD'),
                            basic: this.form.shiyeinsurance,
                        });
                    }
                    // add_fjl_05/19  --添加一天一条履历的判断
                }
            }
            //生育
            if (this.syuData === null) {
                this.syuData = [
                    {
                        date: new moment().format('YYYY-MM-DD'),
                        basic: this.form.shengyuinsurance,
                    },
                ];
            } else if (this.form.shengyuinsurance != null
            ) {
                if (this.syuData.length > 0 &&
                    this.form.shengyuinsurance.toString() !==
                    this.syuData[this.syuData.length - 1].basic) {
                    // add_fjl_05/19  --添加一天一条履历的判断
                    let addflg = 0;
                    for (let a = 0; a < this.syuData.length; a++) {
                        if (this.syuData[a].date === moment(new Date()).format("YYYY-MM-DD")) {
                            addflg = 1;
                            this.syuData[a].basic = this.form.shengyuinsurance;
                        }
                    }
                    if (addflg === 0) {
                        this.syuData.push({
                            date: new moment().format('YYYY-MM-DD'),
                            basic: this.form.shengyuinsurance,
                        });
                    }
                    // add_fjl_05/19  --添加一天一条履历的判断
                }
            }
            //rank
            if (this.rankData === null) {
                this.rankData = [
                    {
                        date: new moment().format('YYYY-MM-DD'),
                        basic: this.form.rank,
                    },
                ];
            } else if (this.form.rank != null
            ) {
                if (this.rankData.length > 0 &&
                    this.form.rank.toString() !==
                    this.rankData[this.rankData.length - 1].basic) {
                    // add_fjl_05/19  --添加一天一条履历的判断
                    let addflg = 0;
                    for (let a = 0; a < this.rankData.length; a++) {
                        if (this.rankData[a].date === moment(new Date()).format("YYYY-MM-DD")) {
                            addflg = 1;
                            this.rankData[a].basic = this.form.rank;
                        }
                    }
                    if (addflg === 0) {
                        this.rankData.push({
                            date: new moment().format('YYYY-MM-DD'),
                            basic: this.form.rank,
                        });
                    }
                    // add_fjl_05/19  --添加一天一条履历的判断
                }
            }
            //职务
            if (this.postData === null) {
                this.postData = [
                    {
                        date: new moment().format('YYYY-MM-DD'),
                        basic: this.form.post,
                    },
                ];
            } else if (this.form.post != null
            ) {
                if (this.postData.length > 0 &&
                    this.form.post.toString() !==
                    this.postData[this.postData.length - 1].basic) {
                    // add_fjl_05/19  --添加一天一条履历的判断
                    let addflg = 0;
                    for (let a = 0; a < this.postData.length; a++) {
                        if (this.postData[a].date === moment(new Date()).format("YYYY-MM-DD")) {
                            addflg = 1;
                            this.postData[a].basic = this.form.post;
                        }
                    }
                    if (addflg === 0) {
                        this.postData.push({
                            date: new moment().format('YYYY-MM-DD'),
                            basic: this.form.post,
                        });
                    }
                    // add_fjl_05/19  --添加一天一条履历的判断
                }
            }
            this.userInfo.customerInfo.userinfo.gridData = this.gridData;
            this.userInfo.customerInfo.userinfo.medicalData = this.medicalData;
            this.userInfo.customerInfo.userinfo.houseData = this.houseData;
            this.userInfo.customerInfo.userinfo.oldageData = this.oldageData;
            this.userInfo.customerInfo.userinfo.syuData = this.syuData;
            this.userInfo.customerInfo.userinfo.syeData = this.syeData;
            this.userInfo.customerInfo.userinfo.gsData = this.gsData;
            this.userInfo.customerInfo.userinfo.rankData = this.rankData;
            this.userInfo.customerInfo.userinfo.postData = this.postData;
        },
      userSave(btnkey) {
        this.checkRequire();
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.userInfo.userAccount.account = this.form.adfield;
            // this.userInfo.userAccount.password = this.form.adfield;
            this.userInfo.userAccount.usertype = '0';
            this.userInfo.customerInfo.userinfo = this.form;
            this.Personal();
            this.userInfo.customerInfo.userinfo.educationTable = this.educationTable;
            this.userInfo.customerInfo.userinfo.skillTable = this.skillTable;
            this.userInfo.customerInfo.userinfo.languageTable = this.languageTable;
            this.userInfo.customerInfo.userinfo.beforeWorkTable = this.beforeWorkTable;
            this.userInfo.customerInfo.userinfo.workAfterTable = this.workAfterTable;
            this.userInfo.customerInfo.userinfo.trainTable = this.trainTable;
            this.userInfo.customerInfo.userinfo.rewardTable = this.rewardTable;
            this.userInfo.customerInfo.type = '1';
            this.userInfo.customerInfo.userinfo.status = this.status;
            this.userInfo.customerInfo.status = this.status;
            this.userInfo.userAccount.status = this.status;
            if (this.form.teamid) {
              this.userInfo.customerInfo.userinfo.companyid = [this.form.teamid];
            } else if (this.form.groupid) {
              this.userInfo.customerInfo.userinfo.companyid = [this.form.groupid];
            } else if (this.form.centerid) {
              this.userInfo.customerInfo.userinfo.companyid = [
                this.form.centerid,
              ];
            }
            this.$store
              .dispatch('usersStore/userSave', this.userInfo)
              .then(response => {
                // if (btnkey === "userSaveToRole") {
                //   this.userToRoleId = response;
                // } else {
                //   this.$refs.container.buttonClick("back");
                // }
                this.loading = false;
                this.$message({
                  message: this.$t('label.PFANSUSERFORMVIEW_SUBMITSUCCESSFULLY'),
                  type: 'success',
                });
                this.activeName = 'first';
                // this.getUserList();
              })
              .catch(err => {
                Message({
                  message: err,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });


          } else {
            Message({
              message: this.$t('normal.error_12'),
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          }
        });
      },
      getUserList() {
        let params = {
          orgtype: '1',
        };
        this.$store.dispatch('usersStore/getUserTableList', params).then(response => {
          this.$store.commit('global/SET_USERLIST', response);
        }).catch(err => {
          Message({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
        });
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-dialog__title {
    color: #75a7ef;
  }

  .el-dialog__body {
    padding-top: 0px;
  }

  .width {
    width: 10.7rem;
  }

  .user_form {
    .el-input--medium .el-input__inner {
      border: none;
    }

    a {
      cursor: pointer;
      background: transparent;
      color: #5d9cec;
      text-decoration: none;
    }

    a:hover {
      color: #fb6e52;
      text-decoration: underline;
    }
  }
</style>

