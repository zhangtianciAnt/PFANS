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
                    <el-input class="width" v-model="form.customername" maxlength="20" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.sex')" prop="sex">
                    <dicselect
                      code="PR019"
                      @change="changesex"
                      :data="form.sex"
                      style="width:20vw"
                    ></dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ADFIELD')" prop="adfield">
                    <el-input class="width" v-model="form.adfield" maxlength="20" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERVIEW_BIRTHDAY')" prop="birthday">
                    <el-date-picker
                      v-model="form.birthday"
                      type="date"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_AGE')">
                    <el-input class="width" v-model="form.age" :disabled="true" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERVIEW_NATIONALITY')" prop="nationality">
                    <el-input class="width" v-model="form.nationality" maxlength="20" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_NATION')" prop="nation">
                    <el-input class="width" v-model="form.nation" maxlength="20" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_REGISTER')" prop="register">
                    <el-input class="width" v-model="form.register" maxlength="20" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_IDNUMBER')" prop="idnumber">
                    <el-input class="width" v-model="form.idnumber" maxlength="18" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_PASSPORT')">
                    <el-input class="width" v-model="form.passport" maxlength="10" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_SECURITY')">
                    <el-input class="width" v-model="form.security" maxlength="20" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_HOUSEFUND')">
                    <el-input class="width" v-model="form.housefund" maxlength="20" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_MARITAL')" prop="marital">
                    <el-select
                      v-model="form.marital"
                      :placeholder="$t('normal.error_09')"
                      class="width"
                      style="width:20vw"
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
                      type="date"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_CHILDREN')">
                    <el-date-picker
                      v-model="form.children"
                      type="date"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EXPERIENCE')" prop="experience">
                    <el-select
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
                    <el-input class="width" v-model="form.address" maxlength="50" style="width:20vw"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EMAIL')" prop="email">
                    <el-input class="width" v-model="form.email" style="width:20vw"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_MOBILENUMBER')"
                    prop="mobilenumber"
                  >
                    <el-input class="width" v-model="form.mobilenumber" style="width:20vw"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_PHONE')" prop="phone">
                    <el-input class="width" v-model.number="form.phone" maxlength="20" style="width:20vw"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EXTENSION')" prop="extension">
                    <el-input class="width" v-model.number="form.extension" maxlength="20" style="width:20vw"></el-input>
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
                    <el-input class="width" v-model="form.graduation" maxlength="20" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_DEGREE')" prop="degree">
                    <dicselect
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
                    <dicselect
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
                    <el-input class="width" v-model="form.specialty" maxlength="10" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_GRADUATIONDAY')"
                    prop="graduationday"
                  >
                    <el-date-picker
                      v-model="form.graduationday"
                      type="date"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <span
                    style="margin-left:0.5%;color:#005BAA"
                  >{{this.$t('label.PFANSUSERFORMVIEW_EDUCATIONEXPERIENCE')}}</span>
                </el-col>
              </el-row>
              <el-table
                :data="educationTable"
                style="width:95%;margin-left:2%;margin-top:1%"
                border
              >
                <el-table-column
                  prop="time"
                  :label="$t('label.PFANSUSERFORMVIEW_PERIOD')"
                  align="center"
                  width="340"
                >
                  <template slot-scope="scope">
                    <el-date-picker
                      style="width:300px"
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
                    <el-input class="width" v-model="scope.row.school" maxlength="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.notes" maxlength="50"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, educationTable)"
                      type="danger"
                      size="small"
                      plain
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      @click="addRow('education')"
                      type="primary"
                      size="small"
                      plain
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane :label="this.$t('label.PFANSUSERFORMVIEW_SKILLLEVEL')" name="third">
              <el-row>
                <el-col>
                  <span
                    style="margin-left:0.5%;color:#005BAA"
                  >{{this.$t('label.PFANSUSERFORMVIEW_SKILL')}}</span>
                </el-col>
              </el-row>
              <el-table :data="skillTable" style="width:90%;margin-left:2%;margin-top:1%" border>
                <el-table-column prop="name" :label="$t('label.PFANS3004VIEW_NAME')" align="center">
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.name" maxlength="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="ability"
                  :label="$t('label.PFANSUSERFORMVIEW_ABILITY')"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.ability" maxlength="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.notes" maxlength="50"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, skillTable)"
                      type="danger"
                      size="small"
                      plain
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      @click="addRow('skill')"
                      type="primary"
                      size="small"
                      plain
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-row style="padding-top:2%;">
                <el-col>
                  <span
                    style="margin-left:0.5%;color:#005BAA"
                  >{{this.$t('label.PFANSUSERFORMVIEW_LANGUAGEQUALIFICATION')}}</span>
                </el-col>
              </el-row>
              <el-table :data="languageTable" style="width:90%;margin-left:2%;margin-top:1%" border>
                <el-table-column
                  prop="programme"
                  :label="$t('label.PFANS5008VIEW_PROGRAM')"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.programme" maxlength="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="level"
                  :label="$t('label.PFANSUSERFORMVIEW_LEVEL')"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.level" maxlength="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.notes" maxlength="50"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, languageTable)"
                      type="danger"
                      size="small"
                      plain
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      @click="addRow('language')"
                      type="primary"
                      size="small"
                      plain
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
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
                      type="date"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-col style="padding-bottom:1%">
                <span
                  style="margin-left:0.5%;color:#005BAA"
                >{{this.$t('label.PFANSUSERFORMVIEW_BEFOREWORK')}}</span>
              </el-col>
              <el-table
                :data="beforeWorkTable"
                style="width:98%;margin-left:1%;margin-top:1%"
                border
              >
                <el-table-column
                  prop="time"
                  :label="$t('label.PFANSUSERFORMVIEW_PERIOD')"
                  align="center"
                  width="340"
                >
                  <template slot-scope="scope">
                    <el-date-picker
                      style="width:300px"
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
                  prop="company"
                  :label="$t('label.PFANSUSERFORMVIEW_COMPANY')"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input style="width:9rem" v-model="scope.row.company" maxlength="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="postion"
                  :label="$t('label.PFANS2020VIEW_JOB')"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input style="width:9rem" v-model="scope.row.postion" maxlength="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                  <template slot-scope="scope">
                    <el-input style="width:9rem" v-model="scope.row.notes" maxlength="50"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, beforeWorkTable)"
                      type="danger"
                      size="small"
                      plain
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      @click="addRow('beforeWork')"
                      type="primary"
                      size="small"
                      plain
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
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
                      style="width:20vw"
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
                      style="width:20vw"
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
                      style="width:20vw"
                      selectType="Single"
                      @getOrgids="getCenterid"
                    ></org>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_JOBNUMBER')" prop="jobnumber">
                    <el-input class="width" v-model="form.jobnumber" maxlength="10" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                    <dicselect
                      code="PG001"
                      class="width"
                      style="width:20vw"
                      @change="changeUnit"
                      :data="form.budgetunit"
                    ></dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_DIFFERENCE')">
                    <el-select
                      v-model="form.difference"
                      :placeholder="$t('normal.error_09')"
                      class="width"
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
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERVIEW_POST')" prop="post">
                    <el-input class="width" v-model="form.post" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.type')">
                    <el-select
                      v-model="form.type"
                      :placeholder="$t('normal.error_09')"
                      class="width"
                      style="width:20vw"
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
                               @change="getRank"></dicselect>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_LABORCONTRACTTYPE')">
                    <el-select
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
                      type="date"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_LABORCONTRACTDAY')"
                    prop="laborcontractday"
                  >
                    <el-date-picker
                      v-model="form.laborcontractday"
                      type="date"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ENTERDAY')" prop="enterday">
                    <el-date-picker
                      v-model="form.enterday"
                      type="date"
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
                      type="date"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_UPGRADED')">
                    <el-date-picker
                      v-model="form.upgraded"
                      type="date"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ANNUALYEAR')" prop="annualyear">
                    <el-input-number
                      v-model="form.annualyear"
                      :min="0"
                      :max="365"
                      :precision="0"
                      :step="1"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_ANNUALLASTYEAR')"
                    prop="annuallastyear"
                  >
                    <el-input-number
                      v-model="form.annuallastyear"
                      :min="0"
                      :max="365"
                      :precision="0"
                      :step="1"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_WELFAREYEAR')"
                    prop="welfareyear"
                  >
                    <el-input-number
                      v-model="form.welfareyear"
                      :min="0"
                      :max="365"
                      :precision="0"
                      :step="1"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_WELFARELASTYEAR')"
                    prop="welfarelastyear"
                  >
                    <el-input-number
                      v-model="form.welfarelastyear"
                      :min="0"
                      :max="365"
                      :precision="0"
                      :step="1"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_RESTYEAR')" prop="restyear">
                    <el-input-number
                      v-model="form.restyear"
                      :min="0"
                      :max="365"
                      :precision="0"
                      :step="1"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_RESTLASTYEAR')"
                    prop="restlastyear"
                  >
                    <el-input-number
                      v-model="form.restlastyear"
                      :min="0"
                      :max="365"
                      :precision="0"
                      :step="1"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_SEATNUMBER')" prop="seatnumber">
                    <el-input class="width" v-model="form.seatnumber" maxlength="20" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_SALARY')" prop="salary">
                    <el-input-number
                      v-model="form.salary"
                      :min="0"
                      :precision="2"
                      :step="100"
                      class="width"
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
                        <el-table-column
                          property="before"
                          align="center"
                          :label="$t('label.PFANSUSERFORMVIEW_BEFORE')"
                          width="130"
                        ></el-table-column>
                        <el-table-column
                          property="after"
                          align="center"
                          :label="$t('label.PFANSUSERFORMVIEW_AFTER')"
                          width="130"
                        >
                          <template slot-scope="scope">
                            <span style="color:#d16765">{{ scope.row.after }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          property="remark"
                          align="center"
                          :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')"
                        >
                          <template slot-scope="scope">
                            <el-input style="width:20vw" v-model="scope.row.remark" size="mini"></el-input>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_CAUTION')" label-width="7rem">
                    <el-input class="width" v-model="form.caution" maxlength="20" style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_OLDAGEINSURANCE')"
                    prop="oldageinsurance"
                  >
                    <el-input-number
                      v-model="form.oldageinsurance"
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
                          property="before"
                          align="center"
                          :label="$t('label.PFANSUSERFORMVIEW_BEFORE')"
                          width="130"
                        ></el-table-column>
                        <el-table-column
                          property="after"
                          align="center"
                          :label="$t('label.PFANSUSERFORMVIEW_AFTER')"
                          width="130"
                        >
                          <template slot-scope="scope">
                            <span style="color:#d16765">{{ scope.row.after }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          property="remark"
                          align="center"
                          :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')"
                        >
                          <template slot-scope="scope">
                            <el-input style="width:20vw" v-model="scope.row.remark" size="mini"></el-input>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_HOUSEINSURANCE')"
                    prop="houseinsurance"
                  >
                    <el-input-number
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
                          property="before"
                          align="center"
                          :label="$t('label.PFANSUSERFORMVIEW_BEFORE')"
                          width="130"
                        ></el-table-column>
                        <el-table-column
                          property="after"
                          align="center"
                          :label="$t('label.PFANSUSERFORMVIEW_AFTER')"
                          width="130"
                        >
                          <template slot-scope="scope">
                            <span style="color:#d16765">{{ scope.row.after }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          property="remark"
                          align="center"
                          :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')"
                        >
                          <template slot-scope="scope">
                            <el-input style="width:20vw" v-model="scope.row.remark" size="mini"></el-input>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-dialog>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_MEDICALINSURANCE')"
                    prop="medicalinsurance"
                  >
                    <el-input-number
                      v-model="form.medicalinsurance"
                      :min="0"
                      :max="100000"
                      :precision="2"
                      :step="0.1"
                      class="width"
                      style="width:20vw"
                    ></el-input-number>
                    <el-button
                      type="text"
                      @click="dialogTableVisible4 = true"
                    >{{$t('label.PFANSUSERFORMVIEW_PERSONAL')}}
                    </el-button>
                    <el-dialog
                      :title="$t('label.PFANSUSERFORMVIEW_MEDICALINSURANCE') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"
                      :visible.sync="dialogTableVisible4"
                      style="padding-top:5px"
                    >
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
                          property="before"
                          align="center"
                          :label="$t('label.PFANSUSERFORMVIEW_BEFORE')"
                          width="130"
                        ></el-table-column>
                        <el-table-column
                          property="after"
                          align="center"
                          :label="$t('label.PFANSUSERFORMVIEW_AFTER')"
                          width="130"
                        >
                          <template slot-scope="scope">
                            <span style="color:#d16765">{{ scope.row.after }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          property="remark"
                          align="center"
                          :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')"
                        >
                          <template slot-scope="scope">
                            <el-input style="width:20vw" v-model="scope.row.remark" size="mini"></el-input>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-dialog>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>

            <el-tab-pane
              :label="this.$t('label.PFANSUSERFORMVIEW_AFTERJOININGCOMPANY')"
              name="six"
              style="padding-left:0.5%"
            >
              <el-row>
                <el-col>
                  <span
                    style="margin-left:0.5%;color:#005BAA"
                  >{{this.$t('label.PFANSUSERFORMVIEW_AFTERWORk')}}</span>
                </el-col>
              </el-row>
              <el-table
                :data="workAfterTable"
                style="width:95%;margin-left:2%;margin-top:1%"
                border
              >
                <el-table-column
                  prop="time"
                  :label="$t('label.PFANSUSERFORMVIEW_PERIOD')"
                  align="center"
                  width="340"
                >
                  <template slot-scope="scope">
                    <el-date-picker
                      style="width:300px"
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
                  prop="programme"
                  :label="$t('label.PFANS5008VIEW_PROGRAM')"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.programme" maxlength="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.notes" maxlength="50"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, workAfterTable)"
                      type="danger"
                      size="small"
                      plain
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      @click="addRow('workafter')"
                      type="primary"
                      size="small"
                      plain
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-row style="padding-top:2%">
                <el-col>
                  <span
                    style="margin-left:0.5%;color:#005BAA"
                  >{{this.$t('label.PFANSUSERFORMVIEW_TRAININGPRACTICE')}}</span>
                </el-col>
              </el-row>
              <el-table :data="trainTable" style="width:95%;margin-left:2%;margin-top:1%" border>
                <el-table-column
                  prop="time"
                  :label="$t('label.PFANSUSERFORMVIEW_PERIOD')"
                  align="center"
                  width="340"
                >
                  <template slot-scope="scope">
                    <el-date-picker
                      style="width:300px"
                      v-model="scope.row.time"
                      type="daterange"
                      :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                      :start-placeholder="$t('label.startdate')"
                      :end-placeholder="$t('label.enddate')"
                      unlink-panels
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column prop="programme" :label="$t('label.operation')" align="center">
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.programme" maxlength="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="notes" :label="$t('label.remarks')" align="center">
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.notes" maxlength="50"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, trainTable)"
                      type="danger"
                      size="small"
                      plain
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      @click="addRow('train')"
                      type="primary"
                      size="small"
                      plain
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane :label="this.$t('label.PFANSUSERFORMVIEW_REWARDPUNISHMENT')" name="seven">
              <el-row>
                <el-col>
                  <span
                    style="margin-left:0.5%;color:#005BAA"
                  >{{this.$t('label.PFANSUSERFORMVIEW_REWARDPUNISHMENT')}}</span>
                </el-col>
              </el-row>
              <el-table :data="rewardTable" style="width:95%;margin-left:2%;margin-top:1%" border>
                <el-table-column
                  prop="notes"
                  :label="$t('label.PFANS3004VIEW_NAME')"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.programme" maxlength="20"></el-input>
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
                      type="date"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="notes"
                  :label="$t('label.PFANSUSERFORMVIEW_EXPLAIN')"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input class="width" v-model="scope.row.notes" maxlength="50"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, rewardTable)"
                      type="danger"
                      size="small"
                      plain
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      @click="addRow('reward')"
                      type="primary"
                      size="small"
                      plain
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="this.$t('label.PFANSUSERFORMVIEW_EDITUSER')" name="eight">

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_RESIGNATIONDATE')" prop="resignation_date">
                    <el-date-picker style="width:20vw" v-model="form.resignation_date" :disabled="true">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('title.PFANS2026VIEW')" v-if="this.form.staffexitprocedure !==''&& this.form.staffexitprocedure !==null">
                    <router-link :to="{ name: 'PFANS2026FormView',
                   params: { _id: this.form.staffexitprocedure, disabled: true}}" >{{this.$t('button.view')}}</router-link>
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
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import {isvalidPhone} from "@/utils/validate";
  import {Message} from "element-ui";
  import org from "@/view/components/org";
  import dicselect from "../components/dicselect";
  import moment from "moment";

  export default {
    name: "usersFormView",
    components: {
      EasyNormalContainer,
      org,
      dicselect
    },
    data() {
      var validateTel = (rule, value, callback) => {
        if (value === "") {
          callback(new Error(this.$t("label.PFANSUSERFORMVIEW_TRUEMOBILE")));
        } else if (!isvalidPhone(value)) {
          callback(new Error(this.$t("label.PFANSUSERFORMVIEW_EFFECTIVEMOBILE")));
        } else {
          let params = {
            id: this.$route.params._id,
            mobilenumber: value
          };
          this.$store
            .dispatch("usersStore/mobileCheck", params)
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
            value
          )
        ) {
          callback(new Error(this.$t("label.PFANSUSERFORMVIEW_TRUEIDNUMBER")));
        } else {
          callback();
        }
      };

      var centerId = (rule, value, callback) => {
        if (!this.form.centerid || this.form.centerid === "") {
          callback(new Error(this.$t("normal.error_08") + "center"));
          this.error = this.$t("normal.error_08") + "center";
        } else {
          callback();
        }
      };

      return {
        code: "",
        display: true,
        oldageData: null,
        houseData: null,
        medicalData: null,
        gridData: null,
        dialogTableVisible: false,
        dialogTableVisible2: false,
        dialogTableVisible3: false,
        dialogTableVisible4: false,
        loading: false,
        error: "",
        educationTable: [
          {
            time: [],
            school: "",
            notes: ""
          }
        ],
        skillTable: [
          {
            name: "",
            ability: "",
            notes: ""
          }
        ],
        languageTable: [
          {
            programme: "",
            level: "",
            notes: ""
          }
        ],
        beforeWorkTable: [
          {
            time: [],
            company: "",
            postion: "",
            notes: ""
          }
        ],
        workAfterTable: [
          {
            time: [],
            programme: "",
            notes: ""
          }
        ],
        trainTable: [
          {
            time: [],
            programme: "",
            notes: ""
          }
        ],
        rewardTable: [
          {
            programme: "",
            _time: "",
            notes: ""
          }
        ],

        activeName: "first",
        difference_options: [
          {value: "1", label: this.$t("label.PFANSUSERFORMVIEW_NEWSTAFF")},
          {
            value: "2",
            label: this.$t("label.PFANSUSERFORMVIEW_OLDSTAFF")
          }
        ],
        rank_options: [
          {value: "0", label: this.$t("label.PFANSUSERVIEW_MEMBERS")},
          {
            value: "1",
            label: this.$t("label.PFANSUSERVIEW_OUTGOING")
          }
        ],
        laborcontracttype: [
          {value: "0", label: this.$t("label.PFANSUSERFORMVIEW_FIXEDTIME")},
          {
            value: "1",
            label: this.$t("label.PFANSUSERFORMVIEW_NOFIXEDTIME")
          }
        ],
        marital_options: [
          {value: "0", label: this.$t("label.PFANSUSERFORMVIEW_UNMARRIED")},
          {
            value: "1",
            label: this.$t("label.PFANSUSERFORMVIEW_MARRIED")
          }
        ],
        experience_options: [
          {value: "0", label: this.$t("label.PFANSUSERFORMVIEW_YES")},
          {
            value: "1",
            label: this.$t("label.PFANSUSERFORMVIEW_NO")
          }
        ],
        form: {
          type:"",
          centername: "",
          groupname: "",
          teamname: "",
          customername: "",
          sex: "",
          adfield: "",
          birthday: "",
          age: "",
          nationality: "",
          nation: "",
          register: "",
          idnumber: "",
          passport: "",
          security: "",
          housefund: "",
          marital: "0",
          children: "",
          experience: "",
          address: "",
          email: "",
          mobilenumber: "",
          phone: "",
          extension: "",
          graduation: "",
          degree: "",
          educational: "",
          specialty: "",
          graduationday: "",
          workday: "",
          departmentid: [],
          centerid: "",
          groupid: "",
          teamid: "",
          userid: "",
          jobnumber: "",
          budgetunit: "",
          difference: "1",
          post: "",
          rank: "",
          laborcontracttype: "",
          fixedate: "",
          laborcontractday: "",
          enterday: "",
          upgraded: "",
          annualyear: "",
          annuallastyear: "",
          welfareyear: "",
          welfarelastyear: "",
          restyear: "",
          restlastyear: "",
          seatnumber: "",
          salary: "",
          caution: "",
          resignation_date:"",
          staffexitprocedure:"",
          oldageinsurance: "",
          houseinsurance: "",
          medicalinsurance: "",
          informationid: "",
          title: "",
          availablestate: "0"
        },
        disable: false,
        buttonList: [],
        userToRoleId: "",
        userInfo: {
          userAccount: {},
          customerInfo: {}
        },
        baseInfoForm: {
          email: "",
          departmentid: []
        },
        title: "label.PFANSUSERVIEW_USER",
        isEdit: false,
        status: "0",
        buttonList: [
          {key: "userSave", name: this.$t("button.save")},
          {
            key: "userSaveToRole",
            name: this.$t("label.PFANSUSERFORMVIEW_SAVEANDROLE")
          }
        ],
        rules: {
          adfield: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_ADFIELD"),
              trigger: "blur"
            }
          ],
          customername: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_CUSTOMERNAME"),
              trigger: "blur"
            }
          ],
          sex: [
            {
              required: true,
              message: this.$t("normal.error_08") + this.$t("label.sex"),
              trigger: "change"
            }
          ],
          birthday: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERVIEW_BIRTHDAY"),
              trigger: "blur"
            }
          ],
          nation: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_NATION"),
              trigger: "blur"
            }
          ],
          nationality: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERVIEW_NATIONALITY"),
              trigger: "blur"
            }
          ],
          register: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_REGISTER"),
              trigger: "blur"
            }
          ],
          centerid: [
            {
              required: true,
              validator: centerId,
              trigger: "blur"
            }
          ],
          idnumber: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_IDNUMBER"),
              trigger: "blur"
            },
            {
              validator: validateId,
              trigger: "blur"
            }
          ],
          marital: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_MARITAL"),
              trigger: "change"
            }
          ],
          address: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_ADDRESS"),
              trigger: "blur"
            }
          ],
          phone: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_PHONE"),
              trigger: "blur"
            }
          ],
          extension: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_EXTENSION"),
              trigger: "blur"
            }
          ],
          graduation: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_GRADUATION"),
              trigger: "blur"
            }
          ],
          degree: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_DEGREE"),
              trigger: "change"
            }
          ],
          educational: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_EDUCATIONAL"),
              trigger: "change"
            }
          ],
          specialty: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_SPECIALTY"),
              trigger: "blur"
            }
          ],
          graduationday: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_GRADUATIONDAY"),
              trigger: "blur"
            }
          ],
          workday: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_WORKDAY"),
              trigger: "blur"
            }
          ],
          jobnumber: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_JOBNUMBER"),
              trigger: "blur"
            }
          ],
          budgetunit: [
            {
              required: true,
              message: this.$t("normal.error_08") + this.$t("label.budgetunit"),
              trigger: "change"
            }
          ],
          post: [
            {
              required: true,
              message:
                this.$t("normal.error_08") + this.$t("label.PFANSUSERVIEW_POST"),
              trigger: "blur"
            }
          ],
          laborcontractday: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_LABORCONTRACTDAY"),
              trigger: "blur"
            }
          ],
          enterday: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_ENTERDAY"),
              trigger: "blur"
            }
          ],
          annualyear: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_ANNUALYEAR"),
              trigger: "blur"
            }
          ],
          annuallastyear: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_ANNUALLASTYEAR"),
              trigger: "blur"
            }
          ],
          welfareyear: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_WELFAREYEAR"),
              trigger: "blur"
            }
          ],
          welfarelastyear: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_WELFARELASTYEAR"),
              trigger: "blur"
            }
          ],
          restyear: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_RESTYEAR"),
              trigger: "blur"
            }
          ],
          restlastyear: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_RESTLASTYEAR"),
              trigger: "blur"
            }
          ],
          seatnumber: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_SEATNUMBER"),
              trigger: "blur"
            }
          ],
          salary: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_SALARY"),
              trigger: "blur"
            }
          ],
          oldageinsurance: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_OLDAGEINSURANCE"),
              trigger: "blur"
            }
          ],
          houseinsurance: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_HOUSEINSURANCE"),
              trigger: "blur"
            }
          ],
          medicalinsurance: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_MEDICALINSURANCE"),
              trigger: "blur"
            }
          ],
          mobilenumber: [
            {
              required: true,
              message: this.$t("normal.error_08") + this.$t("label.user_mobile")
            },
            {validator: validateTel, trigger: "blur"}
          ],
          email: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANSUSERFORMVIEW_EMAILADDRESS"),
              trigger: "blur"
            },
            {
              type: "email",
              message: this.$t("label.PFANSUSERFORMVIEW_TRUEEMAILADDRESS"),
              trigger: ["blur", "change"]
            }
          ]
        }
      };
    },
    computed: {
      birthday: {
        get() {
          return this.form.birthday;
        },
        set(val) {
          this.form.birthday = val;
        }
      }
    },
    watch: {
      userToRoleId(val) {
        if (val) {
          this.$router.push({
            name: "usersToRoleView",
            params: {
              _id: val
            }
          });
        }
      },
      birthday(val) {
        if (val) {
          this.form.age =
            moment().format("YYYY") - moment(val).format("YYYY") > 0
              ? moment().format("YYYY") - moment(val).format("YYYY")
              : 0;
        }
      }
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
          teamid: this.form.teamid
        } = this.$route.params._org);
      }

      if (this.$route.params._id) {
        this.getById(this.$route.params._id);
      }
    },
    methods: {
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
          this.activeName = "first";
        } else if (
          !this.form.graduation ||
          !this.form.degree ||
          !this.form.educational ||
          !this.form.specialty ||
          !this.form.nation ||
          !this.form.graduationday
        ) {
          this.activeName = "second";
        } else if (!this.form.workday) {
          this.activeName = "fouth";
        } else if (
          !this.form.jobnumber ||
          !this.form.centerid ||
          !this.form.budgetunit ||
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
          !this.form.salary ||
          this.form.oldageinsurance === undefined ||
          this.form.houseinsurance === undefined ||
          this.form.medicalinsurance === undefined
        ) {
          this.activeName = "five";
        }
      },
      changeUnit(val) {
        this.form.budgetunit = val;
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }else{
          Object.keys(rows[0]).forEach( key =>{
            rows[0][key] = "";
            if(key === "time"){
              rows[0][key] = [];
            }
          })
        }
      },
      addRow(val) {
        if (val === "education") {
          this.educationTable.push({
            time: [],
            school: "",
            notes: ""
          });
        } else if (val === "skill") {
          this.skillTable.push({
            name: "",
            ability: "",
            notes: ""
          });
        } else if (val === "language") {
          this.languageTable.push({
            programme: "",
            level: "",
            notes: ""
          });
        } else if (val === "beforeWork") {
          this.beforeWorkTable.push({
            time: [],
            company: "",
            postion: "",
            notes: ""
          });
        } else if (val === "workafter") {
          this.workAfterTable.push({
            time: [],
            programme: "",
            notes: ""
          });
        } else if (val === "train") {
          this.trainTable.push({
            time: [],
            programme: "",
            notes: ""
          });
        } else if (val === "reward") {
          this.rewardTable.push({
            programme: "",
            _time: "",
            notes: ""
          });
        }
      },
      changeEducational(val) {
        this.form.educational = val;
      },
     changesex(val){
        this.form.sex=val;
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
                this.code = 'PR021'
              } else if (this.form.type === '1') {
                this.code = 'PJ053'
              }
              this.form.rank = "";
              this.display = true;
            }
          )
        }else{
          if (this.form.type === '0') {
            this.code = 'PR021'
          } else if (this.form.type === '1') {
            this.code = 'PJ053'
          }

        }
      },
      getRank(val) {
        this.form.rank = val;
      },
      getCenterid(val) {
        this.getOrgInformation(val);
        if (!val || this.form.centerid === "") {
          this.error = this.$t("normal.error_08") + "center";
        } else {
          this.error = "";
        }
      },
      getGroupid(val) {
        this.getOrgInformation(val);
        if (this.form.centerid === "") {
          this.error = this.$t("normal.error_08") + "center";
        } else {
          this.error = "";
        }
      },
      getTeamid(val) {
        this.getOrgInformation(val);
        if (this.form.centerid === "") {
          this.error = this.$t("normal.error_08") + "center";
        } else {
          this.error = "";
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
            teamid: this.form.teamid
          } = org);
        }
      },
      getById(_id) {
        this.loading = true;
        let params = {
          userid: _id
        };
        this.$store
          .dispatch("usersStore/getById", params)
          .then(response => {
            this.form = response.customerInfo.userinfo;
            this.status = response.customerInfo.status;
            this.userInfo.userAccount = response.userAccount;
            this.userInfo.customerInfo = response.customerInfo;
            this.educationTable = this.userInfo.customerInfo.userinfo.educationTable;
            this.skillTable = this.userInfo.customerInfo.userinfo.skillTable;
            this.languageTable = this.userInfo.customerInfo.userinfo.languageTable;
            this.beforeWorkTable = this.userInfo.customerInfo.userinfo.beforeWorkTable;
            this.workAfterTable = this.userInfo.customerInfo.userinfo.workAfterTable;
            this.trainTable = this.userInfo.customerInfo.userinfo.trainTable;
            this.rewardTable = this.userInfo.customerInfo.userinfo.rewardTable;
            this.gridData = this.userInfo.customerInfo.userinfo.gridData;
            this.oldageData = this.userInfo.customerInfo.userinfo.oldageData;
            this.houseData = this.userInfo.customerInfo.userinfo.houseData;
            this.medicalData = this.userInfo.customerInfo.userinfo.medicalData;
            this.changeRank();
            this.loading = false;
          })
          .catch(err => {
            Message({
              message: err,
              type: "error",
              duration: 5 * 1000
            });
            this.loading = false;
          });
      },

      cancelForm() {
        this.$refs.container.buttonClick("back");
      },

      buttonClick(val) {
        this.loading = true;
        if (val === "userSave") {
          this.userSave("userSave");
        } else if (val === "userSaveToRole") {
          this.userSave("userSaveToRole");
        }
      },
      Personal() {
        if (this.gridData === null) {
          this.gridData = [
            {
              date: new moment().format("YYYY-MM-DD"),
              before: "",
              after: this.form.salary,
              remark: ""
            }
          ];
        } else if (
          this.gridData.length > 0 &&
          this.form.salary.toString() !==
          this.gridData[this.gridData.length - 1].after
        ) {
          this.gridData.push({
            date: new moment().format("YYYY-MM-DD"),
            before: this.gridData[this.gridData.length - 1].after,
            after: this.form.salary,
            remark: ""
          });
        }

        if (this.medicalData === null) {
          this.medicalData = [
            {
              date: new moment().format("YYYY-MM-DD"),
              before: "",
              after: this.form.medicalinsurance,
              remark: ""
            }
          ];
        } else if (
          this.medicalData.length > 0 &&
          this.form.medicalinsurance.toString() !==
          this.medicalData[this.medicalData.length - 1].after
        ) {
          this.medicalData.push({
            date: new moment().format("YYYY-MM-DD"),
            before: this.medicalData[this.medicalData.length - 1].after,
            after: this.form.medicalinsurance,
            remark: ""
          });
        }

        if (this.houseData === null) {
          this.houseData = [
            {
              date: new moment().format("YYYY-MM-DD"),
              before: "",
              after: this.form.houseinsurance,
              remark: ""
            }
          ];
        } else if (
          this.houseData.length > 0 &&
          this.form.houseinsurance.toString() !==
          this.houseData[this.houseData.length - 1].after
        ) {
          this.houseData.push({
            date: new moment().format("YYYY-MM-DD"),
            before: this.houseData[this.houseData.length - 1].after,
            after: this.form.houseinsurance,
            remark: ""
          });
        }

        if (this.oldageData === null) {
          this.oldageData = [
            {
              date: new moment().format("YYYY-MM-DD"),
              before: "",
              after: this.form.oldageinsurance,
              remark: ""
            }
          ];
        } else if (
          this.oldageData.length > 0 &&
          this.form.oldageinsurance.toString() !==
          this.oldageData[this.oldageData.length - 1].after
        ) {
          this.oldageData.push({
            date: new moment().format("YYYY-MM-DD"),
            before: this.oldageData[this.oldageData.length - 1].after,
            after: this.form.oldageinsurance,
            remark: ""
          });
        }
        this.userInfo.customerInfo.userinfo.gridData = this.gridData;
        this.userInfo.customerInfo.userinfo.medicalData = this.medicalData;
        this.userInfo.customerInfo.userinfo.houseData = this.houseData;
        this.userInfo.customerInfo.userinfo.oldageData = this.oldageData;
      },
      userSave(btnkey) {
        this.checkRequire();
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.userInfo.userAccount.account = this.form.adfield;
            this.userInfo.userAccount.password = this.form.adfield;
            this.userInfo.userAccount.usertype = "0";
            this.userInfo.customerInfo.userinfo = this.form;
            this.Personal();
            this.userInfo.customerInfo.userinfo.educationTable = this.educationTable;
            this.userInfo.customerInfo.userinfo.skillTable = this.skillTable;
            this.userInfo.customerInfo.userinfo.languageTable = this.languageTable;
            this.userInfo.customerInfo.userinfo.beforeWorkTable = this.beforeWorkTable;
            this.userInfo.customerInfo.userinfo.workAfterTable = this.workAfterTable;
            this.userInfo.customerInfo.userinfo.trainTable = this.trainTable;
            this.userInfo.customerInfo.userinfo.rewardTable = this.rewardTable;
            this.userInfo.customerInfo.type = "1";
            this.userInfo.customerInfo.userinfo.status = this.status;
            this.userInfo.customerInfo.status = this.status;
            this.userInfo.userAccount.status = this.status;
            if (this.form.teamid) {
              this.userInfo.customerInfo.userinfo.companyid = [this.form.teamid];
            } else if (this.form.groupid) {
              this.userInfo.customerInfo.userinfo.companyid = [this.form.groupid];
            } else if (this.form.centerid) {
              this.userInfo.customerInfo.userinfo.companyid = [
                this.form.centerid
              ];
            } else {
              this.userInfo.customerInfo.userinfo.companyid = this.$route.params._companyid.split();
            }
            this.$store
              .dispatch("usersStore/userSave", this.userInfo)
              .then(response => {
                if (btnkey === "userSaveToRole") {
                  this.userToRoleId = response;
                } else {
                  this.$refs.container.buttonClick("back");
                }
                this.loading = false;
                this.$message({
                  message: this.$t("label.PFANSUSERFORMVIEW_SUBMITSUCCESSFULLY"),
                  type: "success"
                });
              })
              .catch(err => {
                Message({
                  message: err,
                  type: "error",
                  duration: 5 * 1000
                });
                this.loading = false;
              });
          } else {
            this.loading = false;
          }
        });
      }
    }
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

