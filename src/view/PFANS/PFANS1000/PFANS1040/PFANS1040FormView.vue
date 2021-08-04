<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      ref="container"
    >
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="refform" :model="refform" :rules="rules"
                 style="padding: 2vw">
          <el-row style="padding-top: 2%;padding-bottom: 2%">
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')" prop="year">
                <div class="block">
                  <el-date-picker
                    type="year"
                    @change="yearChange"
                    :disabled="disabledT"
                    style="width: 18vw"
                    v-model="refform.year">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1039FORMVIEW_CENTER')" prop="group">
                <el-select v-model="refform.center_id" style="width: 20vw" :disabled="disabledT"
                           @change="groupChange">
                  <el-option
                    v-for="item in grp_options"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="tabledatashow">
            <el-table :data="tableData" max-height="400" tooltip-effect="dark"
                      highlight-current-row stripe border
                      row-key="rowid"
                      style="width: 100%"
                      border
                      lazy>

              <el-table-column :label="$t('label.PFANS1040FORMVIEW_AMOUNT')" align="center" width="280">

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.amountpersonnel"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.amountwpersonnel"></el-input>
                  </template>
                </el-table-column>

              </el-table-column>
              <el-table-column :label="$t('label.April')" align="center" width="280">

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel4"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel4"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.May')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel5"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel5"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.June')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel6"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel6"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.July')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel7"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel7"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.August')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel8"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel8"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.September')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel9"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel9"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column :label="$t('label.October')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel10"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel10"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.November')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel11"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel11"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.December')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel12"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel12"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.January')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel1"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel1"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.February')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel2"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel2"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.March')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.personnel3"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="100" style="width: 100%"
                              v-model="scope.row.wpersonnel3"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-row>

          <el-row>
            <el-table :data="tableDataA" max-height="400" tooltip-effect="dark"
                      highlight-current-row stripe border :header-cell-style="getHeaderClass"
                      row-key="rowid"
                      style="width: 100%"
                      border
                      lazy>
              <el-table-column fixed
                               type="index">
              </el-table-column>

              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PLAN')"
                               prop="code3"
                               align="center"
                               fixed
                               width="100">
                <template slot-scope="scope">
                  {{$t('label.PFANS1039FORMVIEW_PLAN')}}
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1043FORMVIEW_THEMENAME')"
                               align="center" width="230">
                <template slot-scope="scope">
                  <el-form-item>
                    <div>
                      <el-input class="content bg"
                                :disabled="true"
                                v-model="scope.row.themename">
                        <el-button :disabled="disabled" size="small" slot="append" icon="el-icon-search"
                                   @click="handleClickA(scope.$index,scope.row)"></el-button>
                      </el-input>
                    </div>
                  </el-form-item>
                  <el-dialog :title="$t('title.PFANS1043VIEW')" :visible.sync="dialogTableVisible" center
                             size="50%"
                             top="8vh" lock-scroll
                             append-to-body>
                    <div style="text-align: center">
                      <el-row style="text-align: center;height: 90%;overflow: hidden">
                        <el-table
                          :data="gridData.filter(data => !search || data.themename.toLowerCase().includes(search.toLowerCase()))"
                          height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                          @row-click="handleClickChange">
                          <el-table-column property="themename"
                                           :label="$t('label.PFANS1043FORMVIEW_THEMENAME')"
                                           width="120" show-overflow-tooltip></el-table-column>
                          <el-table-column property="dividevalue1"
                                           :label="$t('label.PFANS1039FORMVIEW_TEAM')"
                                           width="120" show-overflow-tooltip></el-table-column>
                          <el-table-column property="contractvalue1"
                                           :label="$t('label.PFANS1043FORMVIEW_CONTRACT')"
                                           width="120" show-overflow-tooltip></el-table-column>
                          <el-table-column property="currencyvalue1"
                                           :label="$t('label.PFANS8011VIEW_CURRENCY')"
                                           width="120" show-overflow-tooltip></el-table-column>
                          <el-table-column property="toolsorgs"
                                           :label="$t('label.PFANS5001FORMVIEW_ENTRUST')"
                                           width="120" show-overflow-tooltip></el-table-column>
                          <el-table-column
                            align="right" width="230">
                            <template slot="header" slot-scope="scope">
                              <el-input
                                v-model="search"
                                size="mini"
                                :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME3')"/>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </div>
                  </el-dialog>
                </template>
              </el-table-column>
              <!--种类-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_KIND')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                    :code="code2"
                    :data="scope.row.kind"
                    :disabled="true"
                    :no="scope.row"
                  ></dicselect>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.date')"
                               align="center" width="150">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.month"
                    style="width:8vw"
                    :disabled="true"
                    size="small"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>

              <!--分野-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_TEAM')" align="center" width="230">
                <template slot-scope="scope">
                  <dicselect
                    :disabled="true"
                    :code="code3"
                    :data="scope.row.branch"
                    :no="scope.row"
                  ></dicselect>
                </template>
              </el-table-column>

              <!--契約形式-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_CONTRACTTYPE')" align="center" width="190">
                <template slot-scope="scope">
                  <dicselect
                    :disabled="true"
                    :code="code4"
                    :data="scope.row.contracttype"
                    :no="scope.row"
                  ></dicselect>
                </template>
              </el-table-column>
              <!--通貨種別-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_CURRENCYTYPE')" align="center" width="200">
                <template slot-scope="scope">
                  <!--                      add-ws-12/10-汇率字典-->
                  <!--                  <dicselect-->
                  <!--                    :disabled="true"-->
                  <!--                    :code="code5"-->
                  <!--                    :data="scope.row.currencytype"-->
                  <!--                    :no="scope.row"-->
                  <!--                  ></dicselect>-->
                  <monthlyrate :month="month5"
                               :data="scope.row.currencytype"
                               :no="scope.row"
                               :disabled="true">
                  </monthlyrate>
                  <!--                      add-ws-12/10-汇率字典-->
                </template>
              </el-table-column>
              <!--委託元-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_ASSIGNOR')" align="center" width="210"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input
                      :disabled="true"
                      v-if="scope.row.show"
                      v-model="scope.row.assignor">
                    </el-input>
                    <org v-else :disabled="true" :no="scope.row" :orglist="scope.row.assignor"
                         orgtype="2"></org>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.remarks')" align="center" width="230">
                <template slot-scope="scope">
                  <el-input :disabled="true" maxlength="100" style="width: 100%"
                            v-model="scope.row.remarks"></el-input>
                </template>
              </el-table-column>


              <!--本事业年度-->
              <el-table-column :label="$t('label.April')" align="center" width="280">

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum(scope.row)" v-model="scope.row.personnel4" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum(scope.row)" v-model="scope.row.wpersonnel4" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum(scope.row)" v-model="scope.row.amount4"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>

                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.May')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum(scope.row)" v-model="scope.row.personnel5" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum(scope.row)" v-model="scope.row.wpersonnel5" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum(scope.row)" v-model="scope.row.amount5"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.June')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum(scope.row)" v-model="scope.row.personnel6" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum(scope.row)" v-model="scope.row.wpersonnel6" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum(scope.row)" v-model="scope.row.amount6"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2005FORMVIEW_JDHJ')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumpersonnel1" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumwpersonnel1" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumamount1" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>


              <el-table-column :label="$t('label.July')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum1(scope.row)" v-model="scope.row.personnel7" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum1(scope.row)" v-model="scope.row.wpersonnel7"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum1(scope.row)" v-model="scope.row.amount7"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.August')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum1(scope.row)" v-model="scope.row.personnel8" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum1(scope.row)" v-model="scope.row.wpersonnel8"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum1(scope.row)" v-model="scope.row.amount8"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.September')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum1(scope.row)" v-model="scope.row.personnel9" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum1(scope.row)" v-model="scope.row.wpersonnel9"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum1(scope.row)" v-model="scope.row.amount9"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2005FORMVIEW_JDHJ')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumpersonnel2" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumwpersonnel2" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumamount2" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>


              <el-table-column :label="$t('label.October')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum2(scope.row)" v-model="scope.row.personnel10"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum2(scope.row)" v-model="scope.row.wpersonnel10"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum2(scope.row)" v-model="scope.row.amount10"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.November')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum2(scope.row)" v-model="scope.row.personnel11"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum2(scope.row)" v-model="scope.row.wpersonnel11"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum2(scope.row)" v-model="scope.row.amount11"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.December')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum2(scope.row)" v-model="scope.row.personnel12"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum2(scope.row)" v-model="scope.row.wpersonnel12"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum2(scope.row)" v-model="scope.row.amount12"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2005FORMVIEW_JDHJ')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumpersonnel3" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumwpersonnel3" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumamount3" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column :label="$t('label.January')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum3(scope.row)" v-model="scope.row.personnel1" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum3(scope.row)" v-model="scope.row.wpersonnel1"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum3(scope.row)" v-model="scope.row.amount1"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.February')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum3(scope.row)" v-model="scope.row.personnel2" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum3(scope.row)" v-model="scope.row.wpersonnel2"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum3(scope.row)" v-model="scope.row.amount2"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.March')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum3(scope.row)" v-model="scope.row.personnel3" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="wsum3(scope.row)" v-model="scope.row.wpersonnel3"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number @change="amountsum3(scope.row)" v-model="scope.row.amount3"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2005FORMVIEW_JDHJ')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumpersonnel4" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumwpersonnel4" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumamount4" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column :label="$t('label.operation')" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    :disabled="disabled"
                    @click.native.prevent="deleteRowF(scope.$index, tableDataA)"
                    plain
                    size="small"
                    type="danger"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    :disabled="disabled"
                    @click="addRowtableDataA()"
                    plain
                    size="small"
                    type="primary"
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import EasyWorkFlow from '@/components/EasyWorkFlow';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import {getCurrentRoleNew, getDictionaryInfo, getDownOrgInfo, getOrgInfo, getUserInfo} from '@/utils/customize';
  import org from '../../../components/org';
  import moment from 'moment';
  import monthlyrate from '../../../components/monthlyrate';

  export default {
    name: 'PFANS1040FormView',
    components: {
      monthlyrate,
      EasyNormalContainer,
      EasyWorkFlow,
      dicselect,
      org,
    },
    data() {
      return {
        index: '',
        dialogTableVisible: false,
        gridData: [],
        search: '',
        grp_options: [],
        title: 'title.PFANS1040VIEW',
        status: '0',
        loading: false,
        disabledT: false,
        disabled: false,
        refform: {
          themeplan_id: '',
          year: '',
          month: '',
          group_id: '',
          center_id: '',
          region: '',
        },
        rules: {
          year: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR'),
              trigger: 'blur',
            },
          ],
          center_id: [
            {
              required: true,
              message:
                this.$t('normal.error_09') +
                this.$t('label.PFANS1039FORMVIEW_CENTER'),
              trigger: 'change',
            },
          ],
        },
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        tabledatashow: false,
        dividevalue1: '',
        contractvalue1: '',
        currencyvalue1: '',
        baseInfo: [],
        code2: 'PJ064',
        code3: 'PJ063',
        code4: 'PJ142',
        //add-ws-12/10-汇率字典
        // code5: 'PG019',
        month5: moment(new Date()).format('YYYY-MM'),
        //add-ws-12/10-汇率字典
        tableDataAcount: 1,
        tableData: [],
        employed: [],
        newentry: [],
        wemployed: [],
        wnewentry: [],
        tableDataA: [
          {
            show: true,
            customerinfor_id: '',
            rowid: '0',
            themeplantype: this.$t('label.PFANS1039FORMVIEW_PROSPECTS'),
            themeplan_id: '',
            themeplandetail_id: '',
            pthemeplandetail_id: '',
            center_id: '',
            group_id: '',
            year: '',
            themename: '',
            themeinfor_id: '',
            remarks: '',
            branch: '',
            kind: 'PJ064001',
            contracttype: '',
            currencytype: '',
            assignor: '',
            sumpersonnel1: '',
            sumwpersonnel1: '',
            sumamount1: '',
            sumpersonnel2: '',
            sumwpersonnel2: '',
            sumamount2: '',
            sumpersonnel3: '',
            sumwpersonnel3: '',
            sumamount3: '',
            sumpersonnel4: '',
            sumwpersonnel4: '',
            sumamount4: '',
            personnel4: '',
            wpersonnel4: '',
            amount4: '',
            personnel5: '',
            wpersonnel5: '',
            amount5: '',
            personnel6: '',
            wpersonnel6: '',
            amount6: '',
            personnel7: '',
            wpersonnel7: '',
            amount7: '',
            personnel8: '',
            wpersonnel8: '',
            amount8: '',
            personnel9: '',
            wpersonnel9: '',
            amount9: '',
            personnel10: '',
            wpersonnel10: '',
            amount10: '',
            personnel11: '',
            wpersonnel11: '',
            amount11: '',
            personnel12: '',
            wpersonnel12: '',
            amount12: '',
            personnel1: '',
            wpersonnel1: '',
            amount1: '',
            personnel2: '',
            wpersonnel2: '',
            amount2: '',
            personnel3: '',
            wpersonnel3: '',
            amount3: '',
            rowindex: '',
            status: '0',
            type: '0',
          },
        ],
      };
    },
    mounted() {
      this.getGroupOptions();
      this.getlisttheme();
      //查看，编辑
      if (this.$route.params._id) {
        this.loading = true;
        this.disabledT = true;
        this.$store
          .dispatch('PFANS1040Store/getdetilList', {'themeplan_id': this.$route.params._id})
          .then(response => {
            this.refform.themeplan_id = this.$route.params._id;
            this.tableDataA = response;
            if (this.tableDataA.length > 0) {
              this.refform.year = this.tableDataA[0].year;
              this.refform.group_id = this.tableDataA[0].group_id;
              this.refform.center_id = this.tableDataA[0].center_id;
              for (let i = 0; i < this.tableDataA.length; i++) {
                if (this.tableDataA[i].contracttype == 'PJ142001' || this.tableDataA[i].contracttype == 'PJ142002' || this.tableDataA[i].contracttype == 'PJ142003') {
                  this.tableDataA[i].show = true;
                } else if (this.tableDataA[i].contracttype == 'PJ142004' || this.tableDataA[i].contracttype == 'PJ142005') {
                  this.tableDataA[i].show = false;
                }
              }
            }
            this.$nextTick(() => {
              this.groupdata(this.refform.center_id);
            });
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
        this.loading = true;
        this.disabledT = false;
        this.refform.year = parseInt(moment(new Date()).format('MM')) >= 4 ? parseInt(moment(new Date()).format('YYYY')) + 1 + '' : moment(new Date()).format('YYYY');
        this.refform.group_id = this.$route.params.group_id;
        // this.refform.center_id = this.$route.params.center_id;
        this.$nextTick(() => {
          this.groupdata(this.refform.center_id);
        });
        this.loading = false;
      }
    },
    created() {
      this.loading = true;
      this.disabled = this.$route.params.disabled;
      if (this.$route.params.plancount != undefined) {
        this.tableDataAcount = Number(this.$route.params.plancount);
      }
      if (this.disabled) {
        this.buttonList = [];
      }
    },
    methods: {
      nsum(row) {
        row.sumpersonnel1 = Number(row.personnel4) + Number(row.personnel5) + Number(row.personnel6);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-start
        // row.amount4 = Number(row.personnel4 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel4 * this.tableData[0].amountwpersonnel);
        // row.amount5 = Number(row.personnel5 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel5 * this.tableData[0].amountwpersonnel);
        // row.amount6 = Number(row.personnel6 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel6 * this.tableData[0].amountwpersonnel);
        // row.amount7 = Number(row.personnel7 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel7 * this.tableData[0].amountwpersonnel);
        // row.amount8 = Number(row.personnel8 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel8 * this.tableData[0].amountwpersonnel);
        // row.amount9 = Number(row.personnel9 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel9 * this.tableData[0].amountwpersonnel);
        // row.amount10 = Number(row.personnel10 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel10 * this.tableData[0].amountwpersonnel);
        // row.amount11 = Number(row.personnel11 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel11 * this.tableData[0].amountwpersonnel);
        // row.amount12 = Number(row.personnel12 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel12 * this.tableData[0].amountwpersonnel);
        // row.amount1 = Number(row.personnel1 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel1 * this.tableData[0].amountwpersonnel);
        // row.amount2 = Number(row.personnel2 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel2 * this.tableData[0].amountwpersonnel);
        // row.amount3 = Number(row.personnel3 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel3 * this.tableData[0].amountwpersonnel);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-end
        row.sumamount1 = Number(row.amount4) + Number(row.amount5) + Number(row.amount6);
      },
      wsum(row) {
        row.sumwpersonnel1 = Number(row.wpersonnel4) + Number(row.wpersonnel5) + Number(row.wpersonnel6);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-start
        // row.amount4 = Number(row.personnel4 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel4 * this.tableData[0].amountwpersonnel);
        // row.amount5 = Number(row.personnel5 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel5 * this.tableData[0].amountwpersonnel);
        // row.amount6 = Number(row.personnel6 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel6 * this.tableData[0].amountwpersonnel);
        // row.amount7 = Number(row.personnel7 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel7 * this.tableData[0].amountwpersonnel);
        // row.amount8 = Number(row.personnel8 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel8 * this.tableData[0].amountwpersonnel);
        // row.amount9 = Number(row.personnel9 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel9 * this.tableData[0].amountwpersonnel);
        // row.amount10 = Number(row.personnel10 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel10 * this.tableData[0].amountwpersonnel);
        // row.amount11 = Number(row.personnel11 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel11 * this.tableData[0].amountwpersonnel);
        // row.amount12 = Number(row.personnel12 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel12 * this.tableData[0].amountwpersonnel);
        // row.amount1 = Number(row.personnel1 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel1 * this.tableData[0].amountwpersonnel);
        // row.amount2 = Number(row.personnel2 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel2 * this.tableData[0].amountwpersonnel);
        // row.amount3 = Number(row.personnel3 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel3 * this.tableData[0].amountwpersonnel);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-end
        row.sumamount1 = Number(row.amount4) + Number(row.amount5) + Number(row.amount6);
      },
      amountsum(row) {
        row.sumamount1 = Number(row.amount4) + Number(row.amount5) + Number(row.amount6);
      },
      nsum1(row) {
        row.sumpersonnel2 = Number(row.personnel7) + Number(row.personnel8) + Number(row.personnel9);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-start
        // row.amount4 = Number(row.personnel4 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel4 * this.tableData[0].amountwpersonnel);
        // row.amount5 = Number(row.personnel5 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel5 * this.tableData[0].amountwpersonnel);
        // row.amount6 = Number(row.personnel6 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel6 * this.tableData[0].amountwpersonnel);
        // row.amount7 = Number(row.personnel7 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel7 * this.tableData[0].amountwpersonnel);
        // row.amount8 = Number(row.personnel8 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel8 * this.tableData[0].amountwpersonnel);
        // row.amount9 = Number(row.personnel9 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel9 * this.tableData[0].amountwpersonnel);
        // row.amount10 = Number(row.personnel10 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel10 * this.tableData[0].amountwpersonnel);
        // row.amount11 = Number(row.personnel11 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel11 * this.tableData[0].amountwpersonnel);
        // row.amount12 = Number(row.personnel12 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel12 * this.tableData[0].amountwpersonnel);
        // row.amount1 = Number(row.personnel1 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel1 * this.tableData[0].amountwpersonnel);
        // row.amount2 = Number(row.personnel2 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel2 * this.tableData[0].amountwpersonnel);
        // row.amount3 = Number(row.personnel3 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel3 * this.tableData[0].amountwpersonnel);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-end
        row.sumamount2 = Number(row.amount7) + Number(row.amount8) + Number(row.amount9);
      },
      wsum1(row) {
        row.sumwpersonnel2 = Number(row.wpersonnel7) + Number(row.wpersonnel8) + Number(row.wpersonnel9);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-start
        // row.amount4 = Number(row.personnel4 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel4 * this.tableData[0].amountwpersonnel);
        // row.amount5 = Number(row.personnel5 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel5 * this.tableData[0].amountwpersonnel);
        // row.amount6 = Number(row.personnel6 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel6 * this.tableData[0].amountwpersonnel);
        // row.amount7 = Number(row.personnel7 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel7 * this.tableData[0].amountwpersonnel);
        // row.amount8 = Number(row.personnel8 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel8 * this.tableData[0].amountwpersonnel);
        // row.amount9 = Number(row.personnel9 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel9 * this.tableData[0].amountwpersonnel);
        // row.amount10 = Number(row.personnel10 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel10 * this.tableData[0].amountwpersonnel);
        // row.amount11 = Number(row.personnel11 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel11 * this.tableData[0].amountwpersonnel);
        // row.amount12 = Number(row.personnel12 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel12 * this.tableData[0].amountwpersonnel);
        // row.amount1 = Number(row.personnel1 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel1 * this.tableData[0].amountwpersonnel);
        // row.amount2 = Number(row.personnel2 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel2 * this.tableData[0].amountwpersonnel);
        // row.amount3 = Number(row.personnel3 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel3 * this.tableData[0].amountwpersonnel);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-end
        row.sumamount2 = Number(row.amount7) + Number(row.amount8) + Number(row.amount9);
      },
      amountsum1(row) {
        row.sumamount2 = Number(row.amount7) + Number(row.amount8) + Number(row.amount9);
      },

      nsum2(row) {
        row.sumpersonnel3 = Number(row.personnel10) + Number(row.personnel11) + Number(row.personnel12);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-start
        // row.amount4 = Number(row.personnel4 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel4 * this.tableData[0].amountwpersonnel);
        // row.amount5 = Number(row.personnel5 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel5 * this.tableData[0].amountwpersonnel);
        // row.amount6 = Number(row.personnel6 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel6 * this.tableData[0].amountwpersonnel);
        // row.amount7 = Number(row.personnel7 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel7 * this.tableData[0].amountwpersonnel);
        // row.amount8 = Number(row.personnel8 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel8 * this.tableData[0].amountwpersonnel);
        // row.amount9 = Number(row.personnel9 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel9 * this.tableData[0].amountwpersonnel);
        // row.amount10 = Number(row.personnel10 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel10 * this.tableData[0].amountwpersonnel);
        // row.amount11 = Number(row.personnel11 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel11 * this.tableData[0].amountwpersonnel);
        // row.amount12 = Number(row.personnel12 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel12 * this.tableData[0].amountwpersonnel);
        // row.amount1 = Number(row.personnel1 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel1 * this.tableData[0].amountwpersonnel);
        // row.amount2 = Number(row.personnel2 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel2 * this.tableData[0].amountwpersonnel);
        // row.amount3 = Number(row.personnel3 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel3 * this.tableData[0].amountwpersonnel);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-end
        row.sumamount3 = Number(row.amount10) + Number(row.amount11) + Number(row.amount12);
      },
      wsum2(row) {
        row.sumwpersonnel3 = Number(row.wpersonnel10) + Number(row.wpersonnel11) + Number(row.wpersonnel12);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-start
        // row.amount4 = Number(row.personnel4 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel4 * this.tableData[0].amountwpersonnel);
        // row.amount5 = Number(row.personnel5 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel5 * this.tableData[0].amountwpersonnel);
        // row.amount6 = Number(row.personnel6 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel6 * this.tableData[0].amountwpersonnel);
        // row.amount7 = Number(row.personnel7 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel7 * this.tableData[0].amountwpersonnel);
        // row.amount8 = Number(row.personnel8 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel8 * this.tableData[0].amountwpersonnel);
        // row.amount9 = Number(row.personnel9 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel9 * this.tableData[0].amountwpersonnel);
        // row.amount10 = Number(row.personnel10 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel10 * this.tableData[0].amountwpersonnel);
        // row.amount11 = Number(row.personnel11 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel11 * this.tableData[0].amountwpersonnel);
        // row.amount12 = Number(row.personnel12 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel12 * this.tableData[0].amountwpersonnel);
        // row.amount1 = Number(row.personnel1 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel1 * this.tableData[0].amountwpersonnel);
        // row.amount2 = Number(row.personnel2 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel2 * this.tableData[0].amountwpersonnel);
        // row.amount3 = Number(row.personnel3 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel3 * this.tableData[0].amountwpersonnel);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-end
        row.sumamount3 = Number(row.amount10) + Number(row.amount11) + Number(row.amount12);
      },
      amountsum2(row) {
        row.sumamount3 = Number(row.amount10) + Number(row.amount11) + Number(row.amount12);
      },
      nsum3(row) {
        row.sumpersonnel4 = Number(row.personnel1) + Number(row.personnel2) + Number(row.personnel3);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-start
        // row.amount4 = Number(row.personnel4 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel4 * this.tableData[0].amountwpersonnel);
        // row.amount5 = Number(row.personnel5 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel5 * this.tableData[0].amountwpersonnel);
        // row.amount6 = Number(row.personnel6 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel6 * this.tableData[0].amountwpersonnel);
        // row.amount7 = Number(row.personnel7 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel7 * this.tableData[0].amountwpersonnel);
        // row.amount8 = Number(row.personnel8 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel8 * this.tableData[0].amountwpersonnel);
        // row.amount9 = Number(row.personnel9 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel9 * this.tableData[0].amountwpersonnel);
        // row.amount10 = Number(row.personnel10 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel10 * this.tableData[0].amountwpersonnel);
        // row.amount11 = Number(row.personnel11 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel11 * this.tableData[0].amountwpersonnel);
        // row.amount12 = Number(row.personnel12 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel12 * this.tableData[0].amountwpersonnel);
        // row.amount1 = Number(row.personnel1 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel1 * this.tableData[0].amountwpersonnel);
        // row.amount2 = Number(row.personnel2 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel2 * this.tableData[0].amountwpersonnel);
        // row.amount3 = Number(row.personnel3 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel3 * this.tableData[0].amountwpersonnel);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-end
        row.sumamount4 = Number(row.amount1) + Number(row.amount2) + Number(row.amount3);
      },
      wsum3(row) {
        row.sumwpersonnel4 = Number(row.wpersonnel1) + Number(row.wpersonnel2) + Number(row.wpersonnel3);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-start
        // row.amount4 = Number(row.personnel4 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel4 * this.tableData[0].amountwpersonnel);
        // row.amount5 = Number(row.personnel5 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel5 * this.tableData[0].amountwpersonnel);
        // row.amount6 = Number(row.personnel6 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel6 * this.tableData[0].amountwpersonnel);
        // row.amount7 = Number(row.personnel7 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel7 * this.tableData[0].amountwpersonnel);
        // row.amount8 = Number(row.personnel8 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel8 * this.tableData[0].amountwpersonnel);
        // row.amount9 = Number(row.personnel9 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel9 * this.tableData[0].amountwpersonnel);
        // row.amount10 = Number(row.personnel10 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel10 * this.tableData[0].amountwpersonnel);
        // row.amount11 = Number(row.personnel11 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel11 * this.tableData[0].amountwpersonnel);
        // row.amount12 = Number(row.personnel12 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel12 * this.tableData[0].amountwpersonnel);
        // row.amount1 = Number(row.personnel1 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel1 * this.tableData[0].amountwpersonnel);
        // row.amount2 = Number(row.personnel2 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel2 * this.tableData[0].amountwpersonnel);
        // row.amount3 = Number(row.personnel3 * this.tableData[0].amountpersonnel) + Number(row.wpersonnel3 * this.tableData[0].amountwpersonnel);
        // del-lyt-21/3/25-委托受托theme更改为金额一拦手动填写，无需运算出结果-end
        row.sumamount4 = Number(row.amount1) + Number(row.amount2) + Number(row.amount3);
      },
      amountsum3(row) {
        row.sumamount4 = Number(row.amount1) + Number(row.amount2) + Number(row.amount3);
      },
      handleClickA($index, row) {
        this.index = $index;
        this.dialogTableVisible = true;
      },
      handleClickChange(val) {
        if (val.contract == 'PJ142001' || val.contract == 'PJ142002' || val.contract == 'PJ142003') {
          this.tableDataA[this.index].show = true;
        } else if (val.contract == 'PJ142004' || val.contract == 'PJ142005') {
          this.tableDataA[this.index].show = false;
        }
        this.tableDataA[this.index].themename = val.themename;
        //add_qhr_20210707  增加将themeinfor_id取出
        this.tableDataA[this.index].themeinfor_id = val.themeinfor_id;
        this.tableDataA[this.index].month = val.data;
        this.tableDataA[this.index].branch = val.divide;
        this.tableDataA[this.index].contracttype = val.contract;
        this.tableDataA[this.index].currencytype = val.currency;
        this.tableDataA[this.index].assignor = val.toolsorgs;
        this.tableDataA[this.index].remarks = val.remark;
        this.tableDataA[this.index].customerinfor_id = val.customerinfor_id;
        this.tableDataA[this.index].otherone = val.otherone;
        this.tableDataA[this.index].othertwo = val.othertwo;
        this.tableDataA[this.index].otherthree = val.otherthree;
        this.dialogTableVisible = false;
      },
      getlisttheme() {
        this.loading = true;
        let parameters = {
          year: parseInt(moment(new Date()).format('MM')) >= 4 ? moment(new Date()).add(1, 'y').format('YYYY') : moment(new Date()).format('YYYY'),
          contract: 0,
        };
        this.$store
          .dispatch('PFANS1043Store/getlisttheme', parameters)
          .then(response => {
            // response = response.filter(item => (item.contract == 'PJ142001' || item.contract == 'PJ142002' || item.contract == 'PJ142003' || item.contract == 'PJ142004' || item.contract == 'PJ142005') && (item.year = this.refform.year));
            for (let j = 0; j < response.length; j++) {
              if (response[j].divide != '' && response[j].divide != null) {
                let letErrortype = getDictionaryInfo(response[j].divide);
                if (letErrortype != null) {
                  this.dividevalue1 = letErrortype.value1;
                }
              }
              if (response[j].contract != '' && response[j].contract != null) {
                let letErrortype = getDictionaryInfo(response[j].contract);
                if (letErrortype != null) {
                  this.contractvalue1 = letErrortype.value1;
                }
              }
              if (response[j].currency != '' && response[j].currency != null) {
                let letErrortype = getDictionaryInfo(response[j].currency);
                if (letErrortype != null) {
                  this.currencyvalue1 = letErrortype.value1;
                }
              }
              this.gridData.push(
                {
                  dividevalue1: this.dividevalue1,
                  contractvalue1: this.contractvalue1,
                  currencyvalue1: this.currencyvalue1,
                  themename: response[j].themename,
                  //add_qhr_20210707  增加将themeinfor_id取出
                  themeinfor_id: response[j].themeinfor_id,
                  data: response[j].data,
                  divide: response[j].divide,
                  contract: response[j].contract,
                  currency: response[j].currency,
                  toolsorgs: response[j].toolsorgs,
                  remark: response[j].remark,
                  customerinfor_id: response[j].customerinfor_id,
                  otherone: response[j].otherone,
                  othertwo: response[j].othertwo,
                  otherthree: response[j].otherthree,
                },
              );

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
      getGroupOptions() {
        this.loading = true;
        //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 start
        let role = getCurrentRoleNew();
        const vote = [];
        if (role === '3') {//CENTER
            vote.push(
                {
                    value: this.$store.getters.userinfo.userinfo.centerid,
                    lable: this.$store.getters.userinfo.userinfo.centername,
                },
            );
            //add ccm 0112 兼职部门
            if (this.$store.getters.userinfo.userinfo.otherorgs)
            {
                for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
                {
                    if (others.centerid)
                    {
                        this.$store.getters.orgGroupList.filter((item) => {
                            if (item.centerid === others.centerid) {
                                vote.push(
                                    {
                                        value: item.centerid,
                                        lable: item.centername,
                                    },
                                );
                            }
                        })
                    }
                }
            }
            //add ccm 0112 兼职部门
        } else if (role === '2') {//副总经理
            this.$store.getters.orgGroupList.filter((item) => {
                if (item.virtualuser === this.$store.getters.userinfo.userid) {
                    vote.push(
                        {
                            value: item.centerid,
                            lable: item.centername,
                        },
                    );
                }
            })
            //add ccm 0112 兼职部门
            if (this.$store.getters.userinfo.userinfo.otherorgs)
            {
                for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
                {
                    if (others.centerid)
                    {
                        this.$store.getters.orgGroupList.filter((item) => {
                            if (item.centerid === others.centerid) {
                                vote.push(
                                    {
                                        value: item.centerid,
                                        lable: item.centername,
                                    },
                                );
                            }
                        })
                    }
                }
            }
            //add ccm 0112 兼职部门
        }
        const vote1 = [];
        if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
            || this.$store.getters.roles.indexOf("11") != -1 //总经理
            || this.$store.getters.roles.indexOf("16") != -1 //财务部长
            || this.$store.getters.roles.indexOf("18") != -1//企划部长
            || this.$store.getters.roles.indexOf("22") != -1)//外注管理担当
        {
            this.$store.getters.orgGroupList.filter((item) => {
                vote1.push(
                    {
                        value: item.centerid,
                        lable: item.centername,
                    },
                );
            })
            this.grp_options = vote1;
        }
        else
        {
            this.grp_options = vote;
        }
        //去重
        let letoptionsdata = [];
        let arrId = [];
        for(var item of this.grp_options){
            if(arrId.indexOf(item['lable']) == -1){
                arrId.push(item['lable']);
                letoptionsdata.push(item);
            }
        }
        this.grp_options = letoptionsdata;
        this.refform.center_id = this.grp_options[0].value;
        //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 end
        this.loading = false;
      },
      yearChange(value) {
        let val = value;
        if (value) {
          val = moment(value).format('YYYY');
        }
        this.refform.year = val;
        this.groupdata(this.refform.center_id);
      },
      groupdata(val) {
        let parameter = {
          year: moment(this.refform.year).format('YYYY'),
          groupid: val,
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS1040Store/getdataList', parameter)
          .then(response => {
            this.tableData = [];
            let data1 = response.filter(item => (item.type == '0'));
            let data2 = response.filter(item => (item.type == '1'));
            let amountwpersonnel = 0;
            let amountpersonnel = 0;
            let personnel4 = 0;
            let personnel5 = 0;
            let personnel6 = 0;
            let personnel7 = 0;
            let personnel8 = 0;
            let personnel9 = 0;
            let personnel10 = 0;
            let personnel11 = 0;
            let personnel12 = 0;
            let personnel1 = 0;
            let personnel2 = 0;
            let personnel3 = 0;
            let wpersonnel4 = 0;
            let wpersonnel5 = 0;
            let wpersonnel6 = 0;
            let wpersonnel7 = 0;
            let wpersonnel8 = 0;
            let wpersonnel9 = 0;
            let wpersonnel10 = 0;
            let wpersonnel11 = 0;
            let wpersonnel12 = 0;
            let wpersonnel1 = 0;
            let wpersonnel2 = 0;
            let wpersonnel3 = 0;
            if (data1.length > 0) {
              this.newentry = JSON.parse(data1[0].newentry);
              this.wnewentry = JSON.parse(data1[0].employed);
              amountpersonnel = data1[0].moneyavg;
              personnel4 = this.wnewentry.length;
              personnel5 = this.wnewentry.length;
              personnel6 = this.wnewentry.length;
              personnel7 = this.wnewentry.length;
              personnel8 = this.wnewentry.length;
              personnel9 = this.wnewentry.length;
              personnel10 = this.wnewentry.length;
              personnel11 = this.wnewentry.length;
              personnel12 = this.wnewentry.length;
              personnel1 = this.wnewentry.length;
              personnel2 = this.wnewentry.length;
              personnel3 = this.wnewentry.length;
              for (let i = 0; i < this.newentry.length; i++) {
                if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 1) {
                  personnel1 = personnel1 + 1;
                  personnel2 = personnel2 + 1;
                  personnel3 = personnel3 + 1;
                } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 2) {
                  personnel2 = personnel2 + 1;
                  personnel3 = personnel3 + 1;
                } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 3) {
                  personnel3 = personnel3 + 1;
                } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 4) {
                  personnel4 = personnel4 + 1;
                  personnel5 = personnel5 + 1;
                  personnel6 = personnel6 + 1;
                  personnel7 = personnel7 + 1;
                  personnel8 = personnel8 + 1;
                  personnel9 = personnel9 + 1;
                  personnel10 = personnel10 + 1;
                  personnel11 = personnel11 + 1;
                  personnel12 = personnel12 + 1;
                  personnel1 = personnel1 + 1;
                  personnel2 = personnel2 + 1;
                  personnel3 = personnel3 + 1;
                } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 5) {
                  personnel5 = personnel5 + 1;
                  personnel6 = personnel6 + 1;
                  personnel7 = personnel7 + 1;
                  personnel8 = personnel8 + 1;
                  personnel9 = personnel9 + 1;
                  personnel10 = personnel10 + 1;
                  personnel11 = personnel11 + 1;
                  personnel12 = personnel12 + 1;
                  personnel1 = personnel1 + 1;
                  personnel2 = personnel2 + 1;
                  personnel3 = personnel3 + 1;
                } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 6) {
                  personnel6 = personnel6 + 1;
                  personnel7 = personnel7 + 1;
                  personnel8 = personnel8 + 1;
                  personnel9 = personnel9 + 1;
                  personnel10 = personnel10 + 1;
                  personnel11 = personnel11 + 1;
                  personnel12 = personnel12 + 1;
                  personnel1 = personnel1 + 1;
                  personnel2 = personnel2 + 1;
                  personnel3 = personnel3 + 1;
                } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 7) {
                  personnel7 = personnel7 + 1;
                  personnel8 = personnel8 + 1;
                  personnel9 = personnel9 + 1;
                  personnel10 = personnel10 + 1;
                  personnel11 = personnel11 + 1;
                  personnel12 = personnel12 + 1;
                  personnel1 = personnel1 + 1;
                  personnel2 = personnel2 + 1;
                  personnel3 = personnel3 + 1;
                } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 8) {
                  personnel8 = personnel8 + 1;
                  personnel9 = personnel9 + 1;
                  personnel10 = personnel10 + 1;
                  personnel11 = personnel11 + 1;
                  personnel12 = personnel12 + 1;
                  personnel1 = personnel1 + 1;
                  personnel2 = personnel2 + 1;
                  personnel3 = personnel3 + 1;
                } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 9) {
                  personnel9 = personnel9 + 1;
                  personnel10 = personnel10 + 1;
                  personnel11 = personnel11 + 1;
                  personnel12 = personnel12 + 1;
                  personnel1 = personnel1 + 1;
                  personnel2 = personnel2 + 1;
                  personnel3 = personnel3 + 1;
                } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 10) {
                  personnel10 = personnel10 + 1;
                  personnel11 = personnel11 + 1;
                  personnel12 = personnel12 + 1;
                  personnel1 = personnel1 + 1;
                  personnel2 = personnel2 + 1;
                  personnel3 = personnel3 + 1;
                } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 11) {
                  personnel11 = personnel11 + 1;
                  personnel12 = personnel12 + 1;
                  personnel1 = personnel1 + 1;
                  personnel2 = personnel2 + 1;
                  personnel3 = personnel3 + 1;
                } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 12) {
                  personnel12 = personnel12 + 1;
                  personnel1 = personnel1 + 1;
                  personnel2 = personnel2 + 1;
                  personnel3 = personnel3 + 1;
                }
              }
            }
            if (data2.length > 0) {
              this.employed = JSON.parse(data2[0].newentry);
              this.wemployed = JSON.parse(data1[0].employed);
              amountwpersonnel = data2[0].moneyavg;
              wpersonnel4 = this.wemployed.length;
              wpersonnel5 = this.wemployed.length;
              wpersonnel6 = this.wemployed.length;
              wpersonnel7 = this.wemployed.length;
              wpersonnel8 = this.wemployed.length;
              wpersonnel9 = this.wemployed.length;
              wpersonnel10 = this.wemployed.length;
              wpersonnel11 = this.wemployed.length;
              wpersonnel12 = this.wemployed.length;
              wpersonnel1 = this.wemployed.length;
              wpersonnel2 = this.wemployed.length;
              wpersonnel3 = this.wemployed.length;
              for (let i = 0; i < this.employed.length; i++) {
                if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 1) {
                  wpersonnel1 = wpersonnel1 + 1;
                  wpersonnel2 = wpersonnel2 + 1;
                  wpersonnel3 = wpersonnel3 + 1;
                } else if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 2) {
                  wpersonnel2 = wpersonnel2 + 1;
                  wpersonnel3 = wpersonnel3 + 1;
                } else if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 3) {
                  wpersonnel3 = wpersonnel3 + 1;
                } else if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 4) {
                  wpersonnel4 = wpersonnel4 + 1;
                  wpersonnel5 = wpersonnel5 + 1;
                  wpersonnel6 = wpersonnel6 + 1;
                  wpersonnel7 = wpersonnel7 + 1;
                  wpersonnel8 = wpersonnel8 + 1;
                  wpersonnel9 = wpersonnel9 + 1;
                  wpersonnel10 = wpersonnel10 + 1;
                  wpersonnel11 = wpersonnel11 + 1;
                  wpersonnel12 = wpersonnel12 + 1;
                  wpersonnel1 = wpersonnel1 + 1;
                  wpersonnel2 = wpersonnel2 + 1;
                  wpersonnel3 = wpersonnel3 + 1;
                } else if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 5) {
                  wpersonnel5 = wpersonnel5 + 1;
                  wpersonnel6 = wpersonnel6 + 1;
                  wpersonnel7 = wpersonnel7 + 1;
                  wpersonnel8 = wpersonnel8 + 1;
                  wpersonnel9 = wpersonnel9 + 1;
                  wpersonnel10 = wpersonnel10 + 1;
                  wpersonnel11 = wpersonnel11 + 1;
                  wpersonnel12 = wpersonnel12 + 1;
                  wpersonnel1 = wpersonnel1 + 1;
                  wpersonnel2 = wpersonnel2 + 1;
                  wpersonnel3 = wpersonnel3 + 1;
                } else if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 6) {
                  wpersonnel6 = wpersonnel6 + 1;
                  wpersonnel7 = wpersonnel7 + 1;
                  wpersonnel8 = wpersonnel8 + 1;
                  wpersonnel9 = wpersonnel9 + 1;
                  wpersonnel10 = wpersonnel10 + 1;
                  wpersonnel11 = wpersonnel11 + 1;
                  wpersonnel12 = wpersonnel12 + 1;
                  wpersonnel1 = wpersonnel1 + 1;
                  wpersonnel2 = wpersonnel2 + 1;
                  wpersonnel3 = wpersonnel3 + 1;
                } else if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 7) {
                  wpersonnel7 = wpersonnel7 + 1;
                  wpersonnel8 = wpersonnel8 + 1;
                  wpersonnel9 = wpersonnel9 + 1;
                  wpersonnel10 = wpersonnel10 + 1;
                  wpersonnel11 = wpersonnel11 + 1;
                  wpersonnel12 = wpersonnel12 + 1;
                  wpersonnel1 = wpersonnel1 + 1;
                  wpersonnel2 = wpersonnel2 + 1;
                  wpersonnel3 = wpersonnel3 + 1;
                } else if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 8) {
                  wpersonnel8 = wpersonnel8 + 1;
                  wpersonnel9 = wpersonnel9 + 1;
                  wpersonnel10 = wpersonnel10 + 1;
                  wpersonnel11 = wpersonnel11 + 1;
                  wpersonnel12 = wpersonnel12 + 1;
                  wpersonnel1 = wpersonnel1 + 1;
                  wpersonnel2 = wpersonnel2 + 1;
                  wpersonnel3 = wpersonnel3 + 1;
                } else if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 9) {
                  wpersonnel9 = wpersonnel9 + 1;
                  wpersonnel10 = wpersonnel10 + 1;
                  wpersonnel11 = wpersonnel11 + 1;
                  wpersonnel12 = wpersonnel12 + 1;
                  wpersonnel1 = wpersonnel1 + 1;
                  wpersonnel2 = wpersonnel2 + 1;
                  wpersonnel3 = wpersonnel3 + 1;
                } else if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 10) {
                  wpersonnel10 = wpersonnel10 + 1;
                  wpersonnel11 = wpersonnel11 + 1;
                  wpersonnel12 = wpersonnel12 + 1;
                  wpersonnel1 = wpersonnel1 + 1;
                  wpersonnel2 = wpersonnel2 + 1;
                  wpersonnel3 = wpersonnel3 + 1;
                } else if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 11) {
                  wpersonnel11 = wpersonnel11 + 1;
                  wpersonnel12 = wpersonnel12 + 1;
                  wpersonnel1 = wpersonnel1 + 1;
                  wpersonnel2 = wpersonnel2 + 1;
                  wpersonnel3 = wpersonnel3 + 1;
                } else if (parseInt(moment(this.employed[i].entermouth).format('MM')) == 12) {
                  wpersonnel12 = wpersonnel12 + 1;
                  wpersonnel1 = wpersonnel1 + 1;
                  wpersonnel2 = wpersonnel2 + 1;
                  wpersonnel3 = wpersonnel3 + 1;
                }
              }
            }
            this.tableData.push({
              amountwpersonnel: amountwpersonnel,
              amountpersonnel: amountpersonnel,
              personnel4: personnel4,
              wpersonnel4: wpersonnel4,
              personnel5: personnel5,
              wpersonnel5: wpersonnel5,
              personnel6: personnel6,
              wpersonnel6: wpersonnel6,
              personnel7: personnel7,
              wpersonnel7: wpersonnel7,
              personnel8: personnel8,
              wpersonnel8: wpersonnel8,
              personnel9: personnel9,
              wpersonnel9: wpersonnel9,
              personnel10: personnel10,
              wpersonnel10: wpersonnel10,
              personnel11: personnel11,
              wpersonnel11: wpersonnel11,
              personnel12: personnel12,
              wpersonnel12: wpersonnel12,
              personnel1: personnel1,
              wpersonnel1: wpersonnel1,
              personnel2: personnel2,
              wpersonnel2: wpersonnel2,
              personnel3: personnel3,
              wpersonnel3: wpersonnel3,
            });
            this.tabledatashow = true;
            this.loading = false;
          }).catch(err => {
          Message({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
      },
      groupChange(val) {
        let orgInfo = getOrgInfo(val);
        this.refform.center_id = val;
        // this.refform.center_id = orgInfo._id;
        this.groupdata(val);
      },
      deleteRowF(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableDataA = [
            {
              show: true,
              rowid: (this.tableDataAcount).toString(),
              themeplantype: this.$t('label.PFANS1039FORMVIEW_PLAN'),
              themeplan_id: '',
              themeplandetail_id: '',
              pthemeplandetail_id: '',
              center_id: '',
              group_id: '',
              year: '',
              themename: '',
              remarks: '',
              branch: '',
              kind: 'PJ064001',
              contracttype: '',
              currencytype: '',
              assignor: '',
              sumpersonnel1: '',
              sumwpersonnel1: '',
              sumamount1: '',
              sumpersonnel2: '',
              sumwpersonnel2: '',
              sumamount2: '',
              sumpersonnel3: '',
              sumwpersonnel3: '',
              sumamount3: '',
              sumpersonnel4: '',
              sumwpersonnel4: '',
              sumamount4: '',
              wpersonnel1: '',
              wpersonnel2: '',
              wpersonnel3: '',
              wpersonnel4: '',
              wpersonnel5: '',
              wpersonnel6: '',
              wpersonnel7: '',
              wpersonnel8: '',
              wpersonnel9: '',
              wpersonnel10: '',
              wpersonnel11: '',
              wpersonnel12: '',
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
              rowindex: '',
              status: '0',
              type: '0',
              otherone: '',
              othertwo: '',
              otherthree: '',
            },
          ];
        }
      },
      addRowtableDataA() {
        this.tableDataA.push(
          {
            show: true,
            rowid: (this.tableDataAcount).toString(),
            themeplantype: this.$t('label.PFANS1039FORMVIEW_PLAN'),
            themeplan_id: '',
            themeplandetail_id: '',
            pthemeplandetail_id: '',
            center_id: '',
            group_id: '',
            year: '',
            themename: '',
            remarks: '',
            branch: '',
            kind: 'PJ064001',
            contracttype: '',
            currencytype: '',
            assignor: '',
            sumpersonnel1: '',
            sumwpersonnel1: '',
            sumamount1: '',
            sumpersonnel2: '',
            sumwpersonnel2: '',
            sumamount2: '',
            sumpersonnel3: '',
            sumwpersonnel3: '',
            sumamount3: '',
            sumpersonnel4: '',
            sumwpersonnel4: '',
            sumamount4: '',
            wpersonnel1: '',
            wpersonnel2: '',
            wpersonnel3: '',
            wpersonnel4: '',
            wpersonnel5: '',
            wpersonnel6: '',
            wpersonnel7: '',
            wpersonnel8: '',
            wpersonnel9: '',
            wpersonnel10: '',
            wpersonnel11: '',
            wpersonnel12: '',
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
            rowindex: '',
            status: '0',
            type: '0',
            otherone: '',
            othertwo: '',
            otherthree: '',
          });
        this.tableDataAcount = this.tableDataAcount + 1;

      },
      buttonClick(val) {
        ///Check
        if (val === 'save') {
          this.$refs['refform'].validate(valid => {
            if (valid) {
            } else {
              return false;
            }
          });
          if (!this.refform.center_id) {
            Message({
              message: this.$t('normal.error_09') +
                this.$t('label.PFANS1039FORMVIEW_CENTER'),
              type: 'error',
              duration: 5 * 1000,
            });
            return false;
          }
        }
        this.loading = true;
        this.baseInfo = this.tableDataA;
        for (let i = 0; i < this.baseInfo.length; i++) {
          if (!this.baseInfo[i].themename) {
            Message({
              message: this.$t('normal.error_08') +
                this.$t('label.PFANS1039FORMVIEW_THEME'),
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
            return false;
          }
          this.baseInfo[i].themeplan_id = this.refform.themeplan_id === '' ? '' : this.refform.themeplan_id;
          this.baseInfo[i].year = this.refform.year;
          this.baseInfo[i].group_id = this.refform.group_id;
          this.baseInfo[i].center_id = this.refform.center_id;
          if (this.baseInfo[i].month) {
            this.baseInfo[i].month = moment(this.baseInfo[i].month).format('YYYY-MM-DD');
          }
        }
        this.$refs['refform'].validate(valid => {
          if (valid) {
            let requestUrl;
            requestUrl = 'PFANS1040Store/inserttheme';
            this.$store
              .dispatch(requestUrl, this.baseInfo).then(response => {
              this.data = response;

              this.loading = false;
              if (val !== 'update') {
                Message({
                  message: this.$t('normal.success_03'),
                  type: 'success',
                  duration: 5 * 1000,
                });
              }
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
          } else {
            this.loading = false;
            Message({
              message: this.$t('normal.error_12'),
              type: 'error',
              duration: 5 * 1000,
            });
          }
        });
      },
      getHeaderClass({row, column, rowIndex, columnIndex}) {
        if (column.level === 1 && columnIndex >= 10 && columnIndex <= 12) {
          return {
            color: 'white',
            background: '#005BAA',
            border: '1px solid white',
          };
        } else if (column.level === 2 && columnIndex <= 5) {
          return {
            color: 'white',
            background: '#005BAA',
            border: '1px solid white',
          };
        } else {
          return {
            color: 'white',
            background: '#005BAA',
            border: '1px solid white',
          };
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

  .el-table__body .el-table__row.hover-row td {
    background-color: #fafafa;
  }

  .el-table .row1 {
    background: #ebb563;

  }

  /*.sub_bg_color_gray {*/
  /*  background-color: #666666 !important;*/
  /*  height: 40px;*/
  /*  padding: 0px;*/
  /*  color: white;*/
  /*  font-size: 0.8rem;*/
  /*  text-align: center;*/
  /*}*/

</style>
