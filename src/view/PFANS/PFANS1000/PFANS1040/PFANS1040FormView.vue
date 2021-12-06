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
                    :disabled="true"
                    style="width: 18vw"
                    v-model="refform.year">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" prop="center_id">
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
                      highlight-current-row stripe border :header-cell-style="getHeaderClass"
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
              <!--              添加年间合计 ztc fr-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_YEARTOTAL')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_NPERSONNEL')" align="center" width="120" :formatter="formatterDir" prop="npersonnel"/>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_WPERSONNEL')" align="center" width="120" :formatter="formatterDir" prop="wpersonnel"/>
              </el-table-column>
              <!--              添加年间合计 ztc tos-->
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
                               align="center"
                               fixed
                               width="100">
                <template>
                  {{$t('label.PFANS1039FORMVIEW_PLAN')}}
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1043FORMVIEW_THEMENAME')"
                               align="center" width="200" fixed>
                <template slot-scope="scope">
                  <el-col :span="24">
                    <div>
                      <el-container>
                        <el-input class="content bg"
                                :disabled="true" size="small"
                                v-model="scope.row.themename"></el-input>
                          <el-button :disabled="disabled" size="small" icon="el-icon-search"
                                   @click="handleClickA(scope.$index,scope.row)">
                          </el-button>
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
                        <!--                      add  ml  211203  dialog分页   from-->
                        <div class="pagination-container" style="padding-top: 2rem">
                          <el-pagination :current-page.sync="listQuerySys.currentPage" :page-size="listQuerySys.pageSize"
                                         :page-sizes="[20,30,50,9999]" :total="totalSysm" @current-change="handleCurrentChangeSys"
                                         @size-change="handleSizeChangeSys" layout="slot,sizes, ->,prev, pager, next, jumper">
                            <slot><span class="front Content_front"
                                        style="padding-right: 0.5rem;font-weight: 400"></span></slot>
                          </el-pagination>
                        </div>
                        <!--                      add  ml  211203  dialog分页   to-->
                      </div>
                     </el-dialog>
                      </el-container>
                    </div>
                  </el-col>
                </template>
              </el-table-column>
              <!--种类-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_KIND')" align="center" width="120">
                <template slot-scope="scope">
                  <dicselect
                    :code="code2"
                    :data="scope.row.kind"
                    :disabled="true"
                    :no="scope.row"
                    size="small"
                  ></dicselect>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.date')"
                               align="center" width="200">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.month"
                    style="width:10vw"
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
                    size="small"
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
                    size="small"
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
                               :disabled="true"
                               size="small">
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
                      v-model="scope.row.assignor"
                      size="small">
                    </el-input>
                    <org v-else :disabled="true" :no="scope.row" :orglist="scope.row.assignor"
                         orgtype="2" size="small"></org>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.remarks')" align="center" width="230">
                <template slot-scope="scope">
                  <el-input :disabled="true" maxlength="100" style="width: 100%"
                            v-model="scope.row.remarks" size="small"></el-input>
                </template>
              </el-table-column>


              <!--本事业年度-->
              <el-table-column :label="$t('label.April')" align="center" width="280">

                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum(scope.row)" v-model="scope.row.personnel4" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2" size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum(scope.row)" v-model="scope.row.amount4"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>

                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.May')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum(scope.row)" v-model="scope.row.personnel5" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum(scope.row)" v-model="scope.row.amount5"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.June')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum(scope.row)" v-model="scope.row.personnel6" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum(scope.row)" v-model="scope.row.amount6"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2005FORMVIEW_JDHJ')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumpersonnel1" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <thousandnum v-model="scope.row.sumamount1" controls-position="right"
                    style="width: 100%"
                    :disabled="true"
                    :min="0" :max="10000000000" :precision="2"
                    size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>


              <el-table-column :label="$t('label.July')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum1(scope.row)" v-model="scope.row.personnel7" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum1(scope.row)" v-model="scope.row.amount7"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.August')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum1(scope.row)" v-model="scope.row.personnel8" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum1(scope.row)" v-model="scope.row.amount8"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.September')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum1(scope.row)" v-model="scope.row.personnel9" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum1(scope.row)" v-model="scope.row.amount9"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2005FORMVIEW_JDHJ')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumpersonnel2" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumamount2" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>


              <el-table-column :label="$t('label.October')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum2(scope.row)" v-model="scope.row.personnel10"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum2(scope.row)" v-model="scope.row.amount10"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.November')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum2(scope.row)" v-model="scope.row.personnel11"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum2(scope.row)" v-model="scope.row.amount11"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.December')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum2(scope.row)" v-model="scope.row.personnel12"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum2(scope.row)" v-model="scope.row.amount12"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2005FORMVIEW_JDHJ')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumpersonnel3" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumamount3" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column :label="$t('label.January')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum3(scope.row)" v-model="scope.row.personnel1" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum3(scope.row)" v-model="scope.row.amount1"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.February')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum3(scope.row)" v-model="scope.row.personnel2" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum3(scope.row)" v-model="scope.row.amount2"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.March')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number @change="nsum3(scope.row)" v-model="scope.row.personnel3" controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <thousandnum @change="amountsum3(scope.row)" v-model="scope.row.amount3"
                                     controls-position="right"
                                     style="width: 100%"
                                     :disabled="disabled"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2005FORMVIEW_JDHJ')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.sumpersonnel4" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <thousandnum v-model="scope.row.sumamount4" controls-position="right"
                                     style="width: 100%"
                                     :disabled="true"
                                     :min="0" :max="10000000000" :precision="2"
                                     size="small">
                    </thousandnum>
                  </template>
                </el-table-column>
              </el-table-column>
              <!--              添加年间合计 ztc fr-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_YEARTOTAL')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNUMBER')" align="center" width="120" :formatter="formatterDir" prop="personnumber"/>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <thousandnum v-model="scope.row.amount" controls-position="right"
                                 style="width: 100%"
                                 :disabled="true"
                                 :min="0" :max="10000000000" :precision="2"
                                 size="small">
                    </thousandnum>
                  </template>
                </el-table-column>

              </el-table-column>
              <!--              添加年间合计 ztc to-->

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
  import thousandnum from '../../../components/thousandnum';

  export default {
    name: 'PFANS1040FormView',
    components: {
      monthlyrate,
      EasyNormalContainer,
      EasyWorkFlow,
      dicselect,
      org,
      thousandnum,
    },
    watch: {
      tableDataA: {
        deep: true,
        handler(newValue, oldValue) {
          newValue.forEach((v) => {
            v['amount'] = Number(v['amount4'])
                + Number(v['amount5'])
                + Number(v['amount6'])
                + Number(v['amount7'])
                + Number(v['amount8'])
                + Number(v['amount9'])
                + Number(v['amount10'])
                + Number(v['amount11'])
                + Number(v['amount12'])
                + Number(v['amount1'])
                + Number(v['amount2'])
                + Number(v['amount3'])
          });
        }
      },
    },
    data() {
      return {
        // add  ml  211203  dialog分页  from
        listQuerySys: {
          currentPage: 1,
          pageSize: 20,
        },
        totalSysm: 0,
        // add  ml  211203  dialog分页  to
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
                this.$t('label.PFANS2036VIEW_DEPARTMENT'),
              trigger: 'blur',
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
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      } else {
        this.loading = true;
        this.disabledT = false;
        //todo 年度
        this.refform.year = parseInt(moment(new Date()).format('MM')) >= 4 ? parseInt(moment(new Date()).format('YYYY')) + 1 + '' : moment(new Date()).format('YYYY');
        // this.refform.year = '2021';
        this.refform.group_id = this.$route.params.group_id;
        // this.refform.center_id = this.$route.params.center_id;
        this.$nextTick(() => {
          if(this.refform.center_id)
          {
            this.groupdata(this.refform.center_id);
          }
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
      //add   ml   211203    dialog分页   from
      handleCurrentChangeSys(val) {
        this.listQuerySys.currentPage = val;
        this.getlisttheme();
      },
      handleSizeChangeSys(val) {
        this.listQuerySys.pageSize = val;
        this.getlisttheme();
      },
      //add   ml   211203    dialog分页   to
      // 添加年间合计 ztc fr
      formatterDir(row, column, cellValue, index) {
        if (column.property === "npersonnel") {
          return Number(row.personnel1) +
                   Number(row.personnel2) +
                   Number(row.personnel3) +
                   Number(row.personnel4) +
                   Number(row.personnel5) +
                   Number(row.personnel6) +
                   Number(row.personnel7) +
                   Number(row.personnel8) +
                   Number(row.personnel9) +
                   Number(row.personnel10) +
                   Number(row.personnel11) +
                   Number(row.personnel12);
        }else if(column.property === "wpersonnel"){
          return Number(row.wpersonnel1) +
                  Number(row.wpersonnel2) +
                  Number(row.wpersonnel3) +
                  Number(row.wpersonnel4) +
                  Number(row.wpersonnel5) +
                  Number(row.wpersonnel6) +
                  Number(row.wpersonnel7) +
                  Number(row.wpersonnel8) +
                  Number(row.wpersonnel9) +
                  Number(row.wpersonnel10) +
                  Number(row.wpersonnel11) +
                  Number(row.wpersonnel12);
        }else if(column.property === "personnumber"){
          return (Number(row.personnel1) +
                  Number(row.personnel2) +
                  Number(row.personnel3) +
                  Number(row.personnel4) +
                  Number(row.personnel5) +
                  Number(row.personnel6) +
                  Number(row.personnel7) +
                  Number(row.personnel8) +
                  Number(row.personnel9) +
                  Number(row.personnel10) +
                  Number(row.personnel11) +
                  Number(row.personnel12)).toFixed(2);
        }
      },
      // 添加年间合计 ztc to
      nsum(row) {
        row.sumpersonnel1 = Number(row.personnel4) + Number(row.personnel5) + Number(row.personnel6);
        row.sumamount1 = Number(row.amount4) + Number(row.amount5) + Number(row.amount6);
      },
      wsum(row) {
        row.sumwpersonnel1 = Number(row.wpersonnel4) + Number(row.wpersonnel5) + Number(row.wpersonnel6);
        row.sumamount1 = Number(row.amount4) + Number(row.amount5) + Number(row.amount6);
      },
      amountsum(row) {
        row.sumamount1 = Number(row.amount4) + Number(row.amount5) + Number(row.amount6);
      },
      nsum1(row) {
        row.sumpersonnel2 = Number(row.personnel7) + Number(row.personnel8) + Number(row.personnel9);
        row.sumamount2 = Number(row.amount7) + Number(row.amount8) + Number(row.amount9);
      },
      wsum1(row) {
        row.sumwpersonnel2 = Number(row.wpersonnel7) + Number(row.wpersonnel8) + Number(row.wpersonnel9);
        row.sumamount2 = Number(row.amount7) + Number(row.amount8) + Number(row.amount9);
      },
      amountsum1(row) {
        row.sumamount2 = Number(row.amount7) + Number(row.amount8) + Number(row.amount9);
      },

      nsum2(row) {
        row.sumpersonnel3 = Number(row.personnel10) + Number(row.personnel11) + Number(row.personnel12);
        row.sumamount3 = Number(row.amount10) + Number(row.amount11) + Number(row.amount12);
      },
      wsum2(row) {
        row.sumwpersonnel3 = Number(row.wpersonnel10) + Number(row.wpersonnel11) + Number(row.wpersonnel12);
        row.sumamount3 = Number(row.amount10) + Number(row.amount11) + Number(row.amount12);
      },
      amountsum2(row) {
        row.sumamount3 = Number(row.amount10) + Number(row.amount11) + Number(row.amount12);
      },
      nsum3(row) {
        row.sumpersonnel4 = Number(row.personnel1) + Number(row.personnel2) + Number(row.personnel3);
        row.sumamount4 = Number(row.amount1) + Number(row.amount2) + Number(row.amount3);
      },
      wsum3(row) {
        row.sumwpersonnel4 = Number(row.wpersonnel1) + Number(row.wpersonnel2) + Number(row.wpersonnel3);
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
        this.tableDataA[this.index].month = moment(new Date()).format('YYYY-MM-DD');
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
      //  upadte  ml  211203  dialog分页   from
      getlisttheme() {
        this.gridData = [];
        this.loading = true;
        // let parameters = {
        //   year: parseInt(moment(new Date()).format('MM')) >= 4 ? moment(new Date()).add(1, 'y').format('YYYY') : moment(new Date()).format('YYYY'),
        //   // year :'2021',
        //   contract: 0,
        // };
        let params = {
          currentPage: this.listQuerySys.currentPage,
          pageSize: this.listQuerySys.pageSize,
        };
        this.$store
          .dispatch('PFANS1043Store/getlistthemePage', params)
          // .dispatch('PFANS1043Store/getlisttheme', parameters)
          .then(response => {
            // response = response.filter(item => (item.contract == 'PJ142001' || item.contract == 'PJ142002' || item.contract == 'PJ142003' || item.contract == 'PJ142004' || item.contract == 'PJ142005') && (item.year = this.refform.year));
            for (let j = 0; j < response.resultList.length; j++) {
              if (response.resultList[j].divide != '' && response.resultList[j].divide != null) {
                let letErrortype = getDictionaryInfo(response.resultList[j].divide);
                if (letErrortype != null) {
                  this.dividevalue1 = letErrortype.value1;
                }
              }
              if (response.resultList[j].contract != '' && response.resultList[j].contract != null) {
                let letErrortype = getDictionaryInfo(response.resultList[j].contract);
                if (letErrortype != null) {
                  this.contractvalue1 = letErrortype.value1;
                }
              }
              if (response.resultList[j].currency != '' && response.resultList[j].currency != null) {
                let letErrortype = getDictionaryInfo(response.resultList[j].currency);
                if (letErrortype != null) {
                  this.currencyvalue1 = letErrortype.value1;
                }
              }
              this.gridData.push(
                {
                  dividevalue1: this.dividevalue1,
                  contractvalue1: this.contractvalue1,
                  currencyvalue1: this.currencyvalue1,
                  themename: response.resultList[j].themename,
                  //add_qhr_20210707  增加将themeinfor_id取出
                  themeinfor_id: response.resultList[j].themeinfor_id,
                  data: response.resultList[j].data,
                  divide: response.resultList[j].divide,
                  contract: response.resultList[j].contract,
                  currency: response.resultList[j].currency,
                  toolsorgs: response.resultList[j].toolsorgs,
                  remark: response.resultList[j].remark,
                  customerinfor_id: response.resultList[j].customerinfor_id,
                  otherone: response.resultList[j].otherone,
                  othertwo: response.resultList[j].othertwo,
                  otherthree: response.resultList[j].otherthree,
                },
              );
            }
            this.totalSysm = response.total;
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
      },
      //  upadte  ml  211203  dialog分页   to
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
        else if (role === '4') //GM
        {
          let centers = getOrgInfo(this.$store.getters.userinfo.userinfo.centerid);
          if (centers)
          {
            if (centers.encoding === null || centers.encoding === '' || centers.encoding === undefined)
            {
              vote.push(
                {
                  value: this.$store.getters.userinfo.userinfo.groupid,
                  lable: this.$store.getters.userinfo.userinfo.groupname,
                },
              );
            }
          }
        }
        const vote1 = [];
        if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
            || this.$store.getters.roles.indexOf("11") != -1 //总经理
          || this.$store.getters.roles.indexOf("16") != -1//财务部长
          || this.$store.getters.roles.indexOf("18") != -1) //企划部长部长
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
        //针对经营管理统计到group修改 start
        let incfmyList = [];
        for(let item of letoptionsdata){
          if(getOrgInfo(item.value).encoding == ''){
            incfmyList.push(item.value)
          }
        }
        if(incfmyList.length > 0){
          for(let item of incfmyList){
            letoptionsdata = letoptionsdata.filter(letitem => letitem.value != item)
          }
          let orgInfo = [];
          for(let item of incfmyList){
            if(item){
              if(getOrgInfo(item).orgs.length != 0){
                orgInfo.push(getOrgInfo(item).orgs)
              }
            }
          }
          let groInfo = orgInfo[0].filter(item => item.type == '2');
          for(let item of groInfo){
            letoptionsdata.push(
              {
                value: item._id,
                lable: item.title,
              },
            );
          }
        }
        //针对经营管理统计到group修改 end
        this.grp_options = letoptionsdata;
        if (!this.refform.center_id && this.grp_options.length > 0)
        {
          this.refform.center_id = this.grp_options[0].value;
        }

        //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 end
        this.loading = false;
      },
      // yearChange(value) {
      //   let val = value;
      //   if (value) {
      //     val = moment(value).format('YYYY');
      //   }
      //   this.refform.year = val;
      //   this.groupdata(this.refform.center_id);
      // },
      groupdata(val) {
        let parameter = {
          year: moment(this.refform.year).format('YYYY'),
          groupid: val,
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS1040Store/getdataList', parameter)
          .then(response => {
            this.tableData.push({
              amountwpersonnel: '0',
              amountpersonnel: response['Moneyavg'] != undefined ? response['Moneyavg'][0]  : '0',
              personnel4:  response['inCompany'] != undefined ? response['inCompany'][0]  : '0',
              personnel5: response['inCompany'] != undefined ? response['inCompany'][1]  : '0',
              personnel6: response['inCompany'] != undefined ? response['inCompany'][2]  : '0',
              personnel7: response['inCompany'] != undefined ? response['inCompany'][3]  : '0',
              personnel8: response['inCompany'] != undefined ? response['inCompany'][4]  : '0',
              personnel9: response['inCompany'] != undefined ? response['inCompany'][5]  : '0',
              personnel10: response['inCompany'] != undefined ? response['inCompany'][6]  : '0',
              personnel11: response['inCompany'] != undefined ? response['inCompany'][7]  : '0',
              personnel12: response['inCompany'] != undefined ? response['inCompany'][8]  : '0',
              personnel1: response['inCompany'] != undefined ? response['inCompany'][9]  : '0',
              personnel2: response['inCompany'] != undefined ? response['inCompany'][10]  : '0',
              personnel3: response['inCompany'] != undefined ? response['inCompany'][11]  : '0',

              wpersonnel4: response['outCompany'] != undefined ? response['outCompany'][0] : '0',
              wpersonnel5: response['outCompany'] != undefined ? response['outCompany'][1]  : '0',
              wpersonnel6: response['outCompany'] != undefined ? response['outCompany'][2]  : '0',
              wpersonnel7: response['outCompany'] != undefined ? response['outCompany'][3]  : '0',
              wpersonnel8: response['outCompany'] != undefined ? response['outCompany'][4]  : '0',
              wpersonnel9: response['outCompany'] != undefined ? response['outCompany'][5]  : '0',
              wpersonnel10: response['outCompany'] != undefined ? response['outCompany'][6]  : '0',
              wpersonnel11: response['outCompany'] != undefined ? response['outCompany'][7]  : '0',
              wpersonnel12: response['outCompany'] != undefined ? response['outCompany'][8]  : '0',
              wpersonnel1:  response['outCompany'] != undefined ? response['outCompany'][9]  : '0',
              wpersonnel2: response['outCompany'] != undefined ? response['outCompany'][10]  : '0',
              wpersonnel3: response['outCompany'] != undefined ? response['outCompany'][11]  : '0',
            });
            this.tabledatashow = true;
            this.loading = false;
          }).catch(err => {
          this.$message.error({
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
        this.tableData = [];
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
                this.$t('label.PFANS2036VIEW_DEPARTMENT'),
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
                this.$message.error({
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
