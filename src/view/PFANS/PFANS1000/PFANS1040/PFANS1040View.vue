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
      :workflowCode="workflowCode"
      ref="container"
    >
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="refform" :model="refform"
                 style="padding: 2vw">
          <el-tabs @tab-click="handleClick" v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1039FORMVIEW_PLAN')" name="first">
              <el-row style="padding-top: 2%;padding-bottom: 2%">
                <el-col :span="8">
                  <el-date-picker
                    v-model="years"
                    type="year"
                    @change="yearChange"
                    :placeholder="$t('normal.error_09')">
                  </el-date-picker>
                </el-col>
              </el-row>
              <div>
                <el-table :data="tableA" header-cell-class-name="sub_bg_color_blue" stripe border>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_THEME')" align="center" width="230">
                    <template slot-scope="scope">
                      <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                v-model.trim="scope.row.theme"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_GROUP')" align="center" width="230">
                    <template slot-scope="scope">
                      <org :disabled="true" :no="scope.row" :orglist="scope.row.groupid" @getOrgids="getGroupId"
                           orgtype="2" style="width:13vw"></org>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_TEAM')" align="center" width="230">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code3"
                        :data="scope.row.teamid"
                        :disabled="disabled"
                        :no="scope.row"
                        @change="getteam"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_KIND')" align="center" width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code4"
                        :data="scope.row.kind"
                        :disabled="disabled"
                        :no="scope.row"
                        @change="getkind"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_CONTRACTFORM')" align="center" width="180">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code5"
                        :data="scope.row.contractform"
                        :disabled="disabled"
                        :no="scope.row"
                        @change="getcontractform"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_CURRENCYTYPE')" align="center" width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code6"
                        :data="scope.row.currencytype"
                        :disabled="disabled"
                        :no="scope.row"
                        @change="getcurrencytype"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_COMMISSION')" align="center" width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.commission"
                        :disabled="disabled"
                        :no="scope.row"
                        @change="getcommission"
                      ></dicselect>
                    </template>
                  </el-table-column>

                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_19January')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel191"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount191" controls-position="right"
                                         style="width: 100%" :disabled="true"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_19February')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel192"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount192" controls-position="right"
                                         style="width: 100%" :disabled="true"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_19March')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel193"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount193" controls-position="right"
                                         style="width: 100%" :disabled="true"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>

                  <el-table-column :label="$t('label.April')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel4"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount4" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.May')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel5"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount5" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.June')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel6"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount6" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.July')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel7"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount7" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.August')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel8"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount8" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.September')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel9"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount9" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.October')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel10"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount10" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.November')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel11"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount11" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.December')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel12"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount12" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.January')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel1"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount1" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.February')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel2"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount2" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.March')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel3"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount3" controls-position="right"
                                         style="width: 100%" :disabled="disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button
                        :disabled="disabled"
                        @click.native.prevent="deleteRowF(scope.$index, tableA)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}
                      </el-button>
                      <el-button
                        :disabled="disabled"
                        @click="addRowA()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS1039FORMVIEW_PROSPECTS')" name="second">
              <el-row style="padding-top: 2%;padding-bottom: 2%">
                <el-col :span="8">
                  <el-date-picker
                    v-model="months"
                    type="month"
                    @change="monthChange"
                    :placeholder="$t('normal.error_09')">
                  </el-date-picker>
                </el-col>
              </el-row>
              <div>
                <el-table :data="tableB" header-cell-class-name="sub_bg_color_blue" stripe border>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_THEME')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="gettrue(scope.row)" :no="scope.row" maxlength="20" style="width: 100%"
                                v-model.trim="scope.row.theme"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_CENTER')" align="center" width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code1"
                        :data="scope.row.center"
                        :disabled="gettrue(scope.row)"
                        :no="scope.row"
                        @change="getcenter"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_GROUP')" align="center" width="230">
                    <template slot-scope="scope">
                      <org :disabled="true" :no="scope.row" :orglist="scope.row.groupid" @getOrgids="getGroupId"
                           orgtype="2" style="width:13vw"></org>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_TEAM')" align="center" width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code3"
                        :data="scope.row.teamid"
                        :disabled="gettrue(scope.row)"
                        :no="scope.row"
                        @change="getteam"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_KIND')" align="center" width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code4"
                        :data="scope.row.kind"
                        :disabled="gettrue(scope.row)"
                        :no="scope.row"
                        @change="getkind"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_CONTRACTFORM')" align="center" width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code5"
                        :data="scope.row.contractform"
                        :disabled="gettrue(scope.row)"
                        :no="scope.row"
                        @change="getcontractform"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_CURRENCYTYPE')" align="center" width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code6"
                        :data="scope.row.currencytype"
                        :disabled="gettrue(scope.row)"
                        :no="scope.row"
                        @change="getcurrencytype"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_COMMISSION')" align="center" width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code7"
                        :data="scope.row.commission"
                        :disabled="gettrue(scope.row)"
                        :no="scope.row"
                        @change="getcommission"
                      ></dicselect>
                    </template>
                  </el-table-column>

                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_19January')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel191"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount191" controls-position="right"
                                         style="width: 100%" :disabled="true"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_19February')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel192"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount192" controls-position="right"
                                         style="width: 100%" :disabled="true"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1039FORMVIEW_19March')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel193"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount193" controls-position="right"
                                         style="width: 100%" :disabled="true"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>

                  <el-table-column :label="$t('label.April')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[0].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel4"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount4" controls-position="right"
                                         style="width: 100%" :disabled="arrays[0].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.May')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[1].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel5"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount5" controls-position="right"
                                         style="width: 100%" :disabled="arrays[1].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.June')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[2].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel6"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount6" controls-position="right"
                                         style="width: 100%" :disabled="arrays[2].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.July')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[3].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel7"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount7" controls-position="right"
                                         style="width: 100%" :disabled="arrays[3].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.August')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[4].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel8"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount8" controls-position="right"
                                         style="width: 100%" :disabled="arrays[4].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.September')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[5].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel9"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount9" controls-position="right"
                                         style="width: 100%" :disabled="arrays[5].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.October')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[6].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel10"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount10" controls-position="right"
                                         style="width: 100%" :disabled="arrays[6].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.November')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[7].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel11"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount11" controls-position="right"
                                         style="width: 100%" :disabled="arrays[7].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.December')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[8].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel12"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount12" controls-position="right"
                                         style="width: 100%" :disabled="arrays[8].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.January')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[9].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel1"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount1" controls-position="right"
                                         style="width: 100%" :disabled="arrays[9].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.February')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[10].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel2"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount2" controls-position="right"
                                         style="width: 100%" :disabled="arrays[10].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.March')" align="center" width="150">
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="arrays[11].disabled" maxlength="20" style="width: 100%"
                                  v-model.trim="scope.row.personnel3"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount3" controls-position="right"
                                         style="width: 100%" :disabled="arrays[11].disabled"
                                         :min="0" :max="1000000000" :precision="2">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button
                        :disabled="disabled"
                        @click.native.prevent="deleteRowF(scope.$index, tableB)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}
                      </el-button>
                      <el-button
                        :disabled="false"
                        @click="addRowB()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
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
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import org from "../../../components/org";
  import moment from "moment";
  import EasyWorkFlow from '@/components/EasyWorkFlow'

  export default {
    name: 'PFANS1040View',
    components: {
      dicselect,
      org,
      EasyNormalContainer,
      EasyWorkFlow,
    },
    data() {
      return {
        months: moment(new Date()).format("YYYY-MM"),
        title: 'title.PFANS1040VIEW',
        activeName: 'first',
        workflowCode: "W0052",
        status: '0',
        loading: false,
        disabled: false,
        refform: {},
        years: this.$route.params._id,
        groupId:'',
        arrays: [
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
        ],
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        tableB:[],
        tableA: [
          {
            contractthemeid: '',
            months: '',
            years: moment(new Date()).format('YYYY'),
            theme: '',
            center: '',
            groupid: this.groupId,
            teamid: '',
            kind: '',
            contractform: '',
            currencytype: '',
            commission: '',
            personnel191: '',
            amount191: '',
            personnel192: '',
            amount192: '',
            personnel193: '',
            amount193: '',
            personnel4: '',
            amount4: '',
            personnel5: '',
            amount5: '',
            personnel6: '',
            amount6: '',
            personnel7: '',
            amount7: '',
            personnel8: '',
            amount8: '',
            personnel9: '',
            amount9: '',
            personnel10: '',
            amount10: '',
            personnel11: '',
            amount11: '',
            personnel12: '',
            amount12: '',
            personnel1: '',
            amount1: '',
            personnel2: '',
            amount2: '',
            personnel3: '',
            amount3: '',
            type: '0',
            rowindex: '',
            status: '',
          },
        ],
        baseInfo: [],
        code1: 'PJ061',
        code2: 'PJ062',
        code3: 'PJ063',
        code4: 'PJ064',
        code5: 'PJ065',
        code6: 'PJ066',
        code7: 'PJ067',
        canStart: false,
      };
    },
    mounted() {
      let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
      this.groupId = lst.groupId;
      this.tableA[0].groupid = this.groupId;
      this.getdata(this.years,"",'0',0);
    },
    created() {
      this.disabled = this.$route.params.disabled;
      if (this.disabled) {
        this.buttonList = [];
      }
      let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
      this.groupId = lst.groupId;
    },
    methods: {
      getdata(year,month,type,flg){
        //datainfo = {'centerid':this.groupId,'type': '0','months': month};
        let datainfo = {};
        if(type === '0'){
            datainfo = {'type': type,'years': year,'months':''};
        }
        else{
          //datainfo = {'type': type,'years': month.substring(0,4),'months': month,'status': '4'};
          datainfo = {'type': type,'years': month.substring(0,4),'status': '4'};
        }
        this.loading = true;
        this.$store
          .dispatch('PFANS1040Store/get', datainfo)
          .then(response => {
            if (response.length > 0) {
              if(type === "0"){
                  this.tableA = response;
                  if(this.tableA[0].status === '4'){
                      this.disabled = true;
                      this.status = '4';
                  }
              }
              else{
                  this.tableB = [];
                  let months = response[0].months;
                  for (let j = 0; j < response.length; j++) {
                      if(months === response[j].months){
                        this.tableB.push(response[j]);
                      }
                  }
                  var monthCurrent = Number(moment(new Date()).format('MM'));
                  for (var j = 0; j < 12; j++) {
                    if (j > monthCurrent - 5) {
                      this.arrays[j].disabled = false;
                    }
                  }
              }
            }
            else{
                if(type === "0"){
                    this.tableA = [];
                    if(year === moment(new Date()).format('YYYY')){
                      this.addRowA();
                    }
                }
                else{
                    this.tableB = [];
                    if(this.tableA.length > 0){
                      if(this.status === '4'){
                        this.disabled = true;
                        this.tableB = this.tableA;
                        var monthCurrent = Number(month.substr(5,2));
                        for (var i = 0; i < 12; i++) {
                          if (i > monthCurrent - 5) {
                            this.arrays[i].disabled = false;
                          }
                        }
                      }
                    }
                }
                // else{
                //     this.tableB = [];
                //     if(this.tableA.length > 0){
                //         if(this.status === '4'){
                //           this.disabled = true;
                //           this.tableB = this.tableA;
                //           var monthCurrent = Number(month.substr(5,2));
                //           for (var i = 0; i < 12; i++) {
                //             if (i > monthCurrent - 5) {
                //               this.arrays[i].disabled = false;
                //             }
                //           }
                //         }
                //     }
                // }
            }
            if(flg === 0){
                this.loading = false;
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
      getcenter(val, row) {
        row.center = val;
      },
      gettrue(val, row) {
        if(val.status === '4'){
          return true;
        }
        else{
          return false;
        }
      },
      getGroupId(val, row) {
        row.groupid = val;
      },
      getteam(val, row) {
        row.teamid = val;
      },
      getkind(val, row) {
        row.kind = val;
      },
      getcontractform(val, row) {
        row.contractform = val;
      },
      getcurrencytype(val, row) {
        row.currencytype = val;
      },
      getcommission(val, row) {
        row.commission = val;
      },
      workflowState(val) {
        if (val.state === '1') {
          this.status = '3';
        } else if (val.state === '2') {
          this.status = '4';
        }
        this.buttonClick('update');
      },
      start() {
        this.status = '2';
        this.buttonClick('update');
      },
      end() {
        this.status = '0';
        this.buttonClick('update');
      },
      deleteRowF(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      yearChange(value){
        this.years = moment(value).format('YYYY');
        this.getdata(this.years,"",'0',0);
        if(this.years === moment(new Date()).format("YYYY")){
          this.disabled = false;
        }
        else{
          this.disabled = true;
        }
      },
      handleClick(tab, event) {//xx
          this.activeName = tab.name;
          this.workflowCode = "W0052";
          this.canStart = false;
          if(tab === 'first'){
              this.getdata(this.years,"",'0',0);
          }
          else{
              if(this.status === '4'){
                this.workflowCode = "W0053";
                this.canStart = true;
              }
              this.getdata("",this.months,'1',0);
          }

      },
      monthChange(value){
        this.months = moment(value).format('YYYY-MM');
        this.arrays = [
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
        ];
        var monthCurrent = Number(moment(value).format('MM'));
        for (var i = 0; i < 12; i++) {
          if (i > monthCurrent - 5) {
            this.arrays[i].disabled = false;
          }
        }
        this.getdata("",this.months,'1',0);

      },
      addRowA() {
        this.tableA.push({
          contractthemeid: '',
          months: '',
          years: this.$route.params._id,
          theme: '',
          center: '',
          groupid: this.groupId,
          teamid: '',
          kind: '',
          contractform: '',
          currencytype: '',
          commission: '',
          personnel191: '',
          amount191: '',
          personnel192: '',
          amount192: '',
          personnel193: '',
          amount193: '',
          personnel4: '',
          amount4: '',
          personnel5: '',
          amount5: '',
          personnel6: '',
          amount6: '',
          personnel7: '',
          amount7: '',
          personnel8: '',
          amount8: '',
          personnel9: '',
          amount9: '',
          personnel10: '',
          amount10: '',
          personnel11: '',
          amount11: '',
          personnel12: '',
          amount12: '',
          personnel1: '',
          amount1: '',
          personnel2: '',
          amount2: '',
          personnel3: '',
          amount3: '',
          type: '0',
          rowindex: '',
          status: '0',
        });
      },
      addRowB() {
        this.tableB.push({
          contractthemeid: '',
          months: this.months,
          years: this.$route.params._id,
          theme: '',
          center: '',
          groupid: this.groupId,
          teamid: '',
          kind: '',
          contractform: '',
          currencytype: '',
          commission: '',
          personnel191: '',
          amount191: '',
          personnel192: '',
          amount192: '',
          personnel193: '',
          amount193: '',
          personnel4: '',
          amount4: '',
          personnel5: '',
          amount5: '',
          personnel6: '',
          amount6: '',
          personnel7: '',
          amount7: '',
          personnel8: '',
          amount8: '',
          personnel9: '',
          amount9: '',
          personnel10: '',
          amount10: '',
          personnel11: '',
          amount11: '',
          personnel12: '',
          amount12: '',
          personnel1: '',
          amount1: '',
          personnel2: '',
          amount2: '',
          personnel3: '',
          amount3: '',
          type: '1',
          rowindex: '',
          status: '0',
        });
      },
      buttonClick(val) {//111
        if(this.disabled){
          this.baseInfo = this.tableB;
        }
        else{
          this.baseInfo = this.tableA;
        }
        for(let i = 0; i < this.baseInfo.length; i++){
          if(this.disabled){
            this.baseInfo[i].months = moment(this.months).format('YYYY-MM');
            this.baseInfo[i].type = '1';
          }
          this.baseInfo[i].status = this.status;
        }
        this.loading = true;
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.$store
              .dispatch('PFANS1040Store/insert', this.baseInfo).then(response => {
              this.data = response;
              if(this.activeName === 'first'){
                this.getdata(this.years,"",'0',1);
              }
              else{
                this.getdata("",this.months,'1',1);
              }
              this.loading = false;
              Message({
                message: this.$t('normal.success_01'),
                type: 'success',
                duration: 5 * 1000,
              });
              this.$router.push({
                name: 'PFANS1040View',
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
        });
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

  .el-table__body .el-table__row.hover-row td {
    background-color: #fafafa;
  }
</style>
