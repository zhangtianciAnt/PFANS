<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      @buttonClick="buttonClick"
      ref="container"
      v-loading="loading"
    >
      <div slot="customize">
        <el-form label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
          <el-tabs @tab-click="handleClick" v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_GZ')" name="first">
              <div id="app">
                <el-table
                  :data="tableData"
                  style="margin-top:2%;"
                  :header-cell-style="getRowClass"
                >
                  <el-table-column
                    prop="basicinfor1"
                    :label="$t('label.PFANS2006VIEW_BASICINFOR1')"
                    align="center"
                  >
                    <el-table-column
                      prop="no"
                      :label="$t('label.PFANS2006VIEW_NO')"
                      width="50"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span style="color:blue">{{ scope.row.no }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="department_id"
                      :label="$t('label.PFANS2006VIEW_CLUB')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="user_id"
                      :label="$t('label.PFANS2006VIEW_LASTNAME')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="workdate"
                      :label="$t('label.PFANS2006VIEW_JOINED')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="sex"
                      :label="$t('label.PFANS2006VIEW_SEX')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="onlychild"
                      :label="$t('label.PFANS2006VIEW_SINGLECHILD')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="type"
                      :label="$t('label.PFANS2006VIEW_ENTRYTYPE')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="bonus"
                      :label="$t('label.PFANS2006VIEW_SCHOLARSHIP')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="sociology"
                      :label="$t('label.PFANS2006VIEW_SOCIETY')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="registered"
                      :label="$t('label.PFANS2006VIEW_REGISTER')"
                      width="150"
                      align="center"
                    ></el-table-column>
                  </el-table-column>

                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_BASICINFOR2')"
                    align="center"
                  >
                    <el-table-column
                      prop="pension"
                      :label="$t('label.PFANS2005FORMVIEW_PENSIONBASE')"
                      width="270"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="medical"
                      :label="$t('label.PFANS2005FORMVIEW_MEDICALCARE')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="accumulation"
                      :label="$t('label.PFANS2005FORMVIEW_HOUSINGFUNDBASE')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="lastmonth"
                      :label="$t('label.PFANS2005FORMVIEW_LASTMONTHPAYMENT')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="thismonth"
                      :label="$t('label.PFANS2005FORMVIEW_MONTHPAYMENT')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="birthrest"
                      :label="$t('label.PFANS2005FORMVIEW_BIRTHDAYREST')"
                      width="200"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="thismonthbasic"
                      :label="$t('label.PFANS2005FORMVIEW_MONTHLYPOSTALTEMPORARY')"
                      width="200"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="shortillness"
                      :label="$t('label.PFANS2005FORMVIEW_SHORTDURATIONTIME')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="longillness"
                      :label="$t('label.PFANS2005FORMVIEW_LONGDURATIONTIME')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="owediligence"
                      :label="$t('label.PFANS2005FORMVIEW_ABSENCETIME')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="owingcontrol"
                      :label="$t('label.PFANS2005FORMVIEW_ABSENCEOFWORK')"
                      width="150"
                      align="center"
                    ></el-table-column>
                  </el-table-column>

                  <el-table-column :label="$t('label.PFANS2006VIEW_TAX')" align="center">
                    <el-table-column
                      prop="actualamount"
                      :label="$t('label.PFANS2006VIEW_BASICSALARY')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="supplement"
                      :label="$t('label.PFANS2006VIEW_REIMBURSEMENT')"
                      width="200"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="telephonesubsidy"
                      :label="$t('label.PFANS2006VIEW_TELEPHONE')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="housingsubsidy"
                      :label="$t('label.PFANS2006VIEW_RESIDENTIAL')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="lunchsubsidy"
                      :label="$t('label.PFANS2006VIEW_AFTERNOON')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="overtimesubsidy"
                      :label="$t('label.PFANS2006VIEW_KASUKE')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="other1"
                      :label="$t('label.PFANS2006VIEW_OTHER1')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="total1"
                      :label="$t('label.PFANS2006VIEW_SUBTOTAL1')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="traffic"
                      :label="$t('label.PFANS2006VIEW_TRANSPORTATION')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="washingtheory"
                      :label="$t('label.PFANS2006VIEW_WOMANWASHING')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="other2"
                      :label="$t('label.PFANS2006VIEW_OTHER2')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="appreciation"
                      :label="$t('label.PFANS2006VIEW_MONTHLYBONUS')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="other3"
                      :label="$t('label.PFANS2006VIEW_OTHER3')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="total2"
                      :label="$t('label.PFANS2006VIEW_SUBTOTAL2')"
                      width="150"
                      align="center"
                    ></el-table-column>
                  </el-table-column>

                  <el-table-column
                    prop="taxestotal"
                    :label="$t('label.PFANS2006VIEW_INDUSTRY')"
                    width="150"
                    align="center"
                  ></el-table-column>

                  <el-table-column :label="$t('label.PFANS2005FORMVIEW_MS')" align="center">
                    <el-table-column
                      prop="heating"
                      :label="$t('label.PFANS2006VIEW_HEATING')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="onlychildmoney"
                      :label="$t('label.PFANS2006VIEW_OLONECHILD')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="total3"
                      :label="$t('label.PFANS2006VIEW_SUBTOTAL3')"
                      width="150"
                      align="center"
                    ></el-table-column>
                  </el-table-column>

                  <el-table-column
                    prop="totalwages"
                    :label="$t('label.PFANS2006VIEW_ARSENAL')"
                    width="150"
                    align="center"
                  ></el-table-column>

                  <el-table-column :label="$t('label.PFANS2006VIEW_SECURITY')" align="center">
                    <el-table-column
                      prop="endowmentinsurance"
                      :label="$t('label.PFANS2006VIEW_OLD')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="medicalinsurance"
                      :label="$t('label.PFANS2006VIEW_MEDICAL')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="unemploymentinsurance"
                      :label="$t('label.PFANS2006VIEW_UNEMPLOYMENT')"
                      width="150"
                      align="center"
                    ></el-table-column>
                  </el-table-column>

                  <el-table-column
                    prop="socialinsurance"
                    :label="$t('label.PFANS2006VIEW_SOCIALSECURITY')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="adjustment"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    width="150"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.adjustment"
                        controls-position="right"
                        :min="0"
                        size="mini"
                        style="width:7rem"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="accumulationfund"
                    :label="$t('label.PFANS2006VIEW_PUBLICMONEY')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="disciplinarycontrol"
                    :label="$t('label.PFANS2006VIEW_SECURITYMON')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="thismonthterm"
                    :label="$t('label.PFANS2006VIEW_EXCLUSIVE')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="thismonthadditional"
                    :label="$t('label.PFANS2006VIEW_ACCUMULATED')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="thismonthdutyfree"
                    :label="$t('label.PFANS2006VIEW_UNACCUMULATED')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="lastdutyfree"
                    :label="$t('label.PFANS2006VIEW_ANNUAL')"
                    width="150"
                    align="center"
                  ></el-table-column>

                  <el-table-column :label="$t('label.PFANS2006VIEW_ONLYTAX')" align="center">
                    <el-table-column
                      prop="housingmoneys"
                      :label="$t('label.PFANS2006VIEW_RESIDENTIALTAX')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="other4"
                      :label="$t('label.PFANS2006VIEW_COMPANYBOSS')"
                      width="230"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="other5"
                      :label="$t('label.PFANS2006VIEW_OTHER5')"
                      width="150"
                      align="center"
                    ></el-table-column>
                  </el-table-column>

                  <el-table-column
                    prop="shouldwages"
                    :label="$t('label.PFANS2006VIEW_RESPONSIBLE')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="shouldcumulative"
                    :label="$t('label.PFANS2006VIEW_CUMULATIVE')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="shouldpaytaxes"
                    :label="$t('label.PFANS2006VIEW_INCOME')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="thismonthadjustment"
                    :label="$t('label.PFANS2006VIEW_THISMONTH')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="thisadjustment"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    width="150"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.thisadjustment"
                        controls-position="right"
                        :min="0"
                        size="mini"
                        style="width:7rem"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="realwages"
                    :label="$t('label.PFANS2006VIEW_ACTUAL')"
                    width="150"
                    align="center"
                  ></el-table-column>

                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_COMPANYSUPPORT')"
                    align="center"
                  >
                    <el-table-column
                      prop="comendowmentinsurance"
                      :label="$t('label.PFANS2006VIEW_OLD')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="commedicalinsurance"
                      :label="$t('label.PFANS2006VIEW_MEDICAL')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="comunemploymentinsurance"
                      :label="$t('label.PFANS2006VIEW_UNEMPLOYMENT')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="cominjuryinsurance"
                      :label="$t('label.PFANS2005FORMVIEW_EMPLOYMENTINJURYINSURANCE')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="combirthinsurance"
                      :label="$t('label.PFANS2005FORMVIEW_COMBIRTHINSURANCE')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="comheating"
                      :label="$t('label.PFANS2005FORMVIEW_HEATINGCOST')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="comaccumulationfund"
                      :label="$t('label.PFANS2005FORMVIEW_HOUSINGPROVIDENTFUND')"
                      width="150"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="total"
                      :label="$t('label.PFANS2005FORMVIEW_TOTAL')"
                      width="150"
                      align="center"
                    ></el-table-column>
                  </el-table-column>

                  <el-table-column
                    prop="totaladjustment"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    width="150"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.totaladjustment"
                        controls-position="right"
                        :min="0"
                        size="mini"
                        style="width:7rem"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="labourunionbase"
                    :label="$t('label.PFANS2005FORMVIEW_LABORUNIONFUNDBASE')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="labourunionfunds"
                    :label="$t('label.PFANS2009VIEW_INDUSTRIALPARTY')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="comtotalwages"
                    :label="$t('label.PFANS2005FORMVIEW_TOTALWAGES')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="bonusmoney"
                    :label="$t('label.PFANS2005FORMVIEW_GAUGE')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="totalbonus"
                    :label="$t('label.PFANS2005FORMVIEW_TOTALGAUGE')"
                    width="150"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="other6"
                    :label="$t('label.PFANS2005FORMVIEW_OTHER6')"
                    width="150"
                    align="center"
                  ></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_JS')" name="second">
              {{$t('label.PFANS2005FORMVIEW_JS')}}
              <el-table :data="tableJS" :summary-method="getSummaries" show-summary>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_NO')"
                  align="center"
                  prop="rowindex"
                  width="50%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_CLUB')"
                  align="center"
                  prop="department_id"
                  width="200%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_LASTNAME')"
                  align="center"
                  prop="user_id"
                  width="160%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2003FORMVIEW_RN')"
                  align="center"
                  prop="rn"
                  width="110%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_SEX')"
                  align="center"
                  prop="sex"
                  width="110%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_SINGLECHILD')"
                  align="center"
                  prop="onlychild"
                  width="110%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_ENTRYTYPE')"
                  align="center"
                  prop="type"
                  width="110%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_SCHOLARSHIP')"
                  align="center"
                  prop="bonus"
                  width="110%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_SOCIETY')"
                  align="center"
                  prop="sociology"
                  width="110%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_REGISTER')"
                  align="center"
                  prop="registered"
                  width="110%"
                ></el-table-column>
                <el-table-column :label="this.YEAR6" align="center" prop="lastmonth" width="110%"></el-table-column>
                <el-table-column :label="this.YEAR7" align="center" prop="thismonth" width="110%"></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2005FORMVIEW_YSG')"
                  align="center"
                  prop="pension"
                  width="110%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2005FORMVIEW_YS')"
                  align="center"
                  prop="medical"
                  width="120%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2005FORMVIEW_ACCUMULATION')"
                  align="center"
                  prop="accumulation"
                  width="120%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_HEATING')"
                  align="center"
                  prop="heating"
                  width="120%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2022VIEW_JOININGDAY')"
                  align="center"
                  prop="workdate"
                  width="120%"
                ></el-table-column>
              </el-table>
              <div class="pagination-container" style="padding-top: 2rem">
                <el-pagination
                  :current-page.sync="listQueryListJS.page"
                  :page-size="listQueryListJS.limit"
                  :page-sizes="[5,10,20,30,50]"
                  :total="totalBase"
                  @current-change="handleCurrentChangeJS"
                  @size-change="handleSizeChangeJS"
                  layout="slot,sizes, ->,prev, pager, next, jumper"
                >
                  <slot>
                    <span
                      class="front Content_front"
                      style="padding-right: 0.5rem;font-weight: 400"
                    >{{$t('table.pagesize')}}</span>
                  </slot>
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_QT1')" name="third">
              <div>
                <span
                  class="Title_front main_color"
                  style="float:left; padding-top: 1.5rem"
                >{{$t('label.PFANS2005FORMVIEW_FEMALELEAVE')}}</span>
                <el-table :data="tableQT1Woman" header-cell-class-name="sub_bg_color_grey height">
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_NO')"
                    align="center"
                    prop="rowindex"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_CLUB')"
                    align="center"
                    prop="department_id"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_LASTNAME')"
                    align="center"
                    prop="user_id"
                    width="160%"
                  ></el-table-column>
                  <el-table-column :label="$t('label.PFANS2006VIEW_SEX')" align="center" prop="sex"></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2022VIEW_JOININGDAY')"
                    align="center"
                    prop="workdate"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_RESTSTART')"
                    align="center"
                    prop="reststart"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_RESTEND')"
                    align="center"
                    prop="restend"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_ATTENDANCE')"
                    align="center"
                    prop="attendance"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_QT1')"
                    align="center"
                    prop="other1"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_BASE')"
                    align="center"
                    prop="basedata"
                  >
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.basedata">
                        <el-option
                          v-for="item in menuList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination-container" style="padding-top: 2rem">
                  <el-pagination
                    :current-page.sync="listQueryListQT1Woman.page"
                    :page-size="listQueryListQT1Woman.limit"
                    :page-sizes="[5,10,20,30,50]"
                    :total="totalOtherOne"
                    @current-change="handleCurrentChangeQT1Woman"
                    @size-change="handleSizeChangeQT1Woman"
                    layout="slot,sizes, ->,prev, pager, next, jumper"
                  >
                    <slot>
                      <span
                        class="front Content_front"
                        style="padding-right: 0.5rem;font-weight: 400"
                      >{{$t('table.pagesize')}}</span>
                    </slot>
                  </el-pagination>
                </div>
              </div>
              <div>
                <span
                  class="Title_front main_color"
                  style="float:left; padding-top: 2rem"
                >{{$t('label.PFANS2005FORMVIEW_MALELEAVE')}}</span>
                <el-table :data="tableQT1Man" header-cell-class-name="sub_bg_color_grey height">
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_NO')"
                    align="center"
                    prop="rowindex"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_CLUB')"
                    align="center"
                    prop="department_id"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_LASTNAME')"
                    align="center"
                    prop="user_id"
                    width="160%"
                  ></el-table-column>
                  <el-table-column :label="$t('label.PFANS2006VIEW_SEX')" align="center" prop="sex"></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2022VIEW_JOININGDAY')"
                    align="center"
                    prop="workdate"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_STARTDATE')"
                    align="center"
                    prop="startdate"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_ENDDATE')"
                    align="center"
                    prop="enddate"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_VACATION')"
                    align="center"
                    prop="vacation"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_HANDSUPPORT')"
                    align="center"
                    prop="handsupport"
                  ></el-table-column>
                </el-table>
                <div class="pagination-container" style="padding-top: 2rem">
                  <el-pagination
                    :current-page.sync="listQueryListQT1Man.page"
                    :page-size="listQueryListQT1Man.limit"
                    :page-sizes="[5,10,20,30,50]"
                    :total="totalOtherOneMan"
                    @current-change="handleCurrentChangeQT1Man"
                    @size-change="handleSizeChangeQT1Man"
                    layout="slot,sizes, ->,prev, pager, next, jumper"
                  >
                    <slot>
                      <span
                        class="front Content_front"
                        style="padding-right: 0.5rem;font-weight: 400"
                      >{{$t('table.pagesize')}}</span>
                    </slot>
                  </el-pagination>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_QT2')" name="fourth">
              <div>
                <span
                  class="Title_front main_color"
                  style="float:left"
                >{{$t('label.PFANS2005FORMVIEW_QT2YL')}}</span>
                <el-row>
                  <el-table
                    :data="tableQT2"
                    :summary-method="getSummaries"
                    header-cell-class-name="sub_bg_color_grey height"
                    show-summary
                  >
                    <el-table-column
                      :label="$t('label.PFANS2006VIEW_NO')"
                      align="center"
                      prop="rowindex"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2006VIEW_LASTNAME')"
                      align="center"
                      prop="user_id"
                      width="160%"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1004VIEW_AMOUNT')"
                      align="center"
                      prop="moneys"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_GJ')"
                      align="center"
                      prop="rootknot"
                    >
                      <template slot-scope="scope">
                        <el-input
                          :disabled="false"
                          v-if="scope.row.type === '1'"
                          v-model="scope.row.rootknot"
                        ></el-input>
                        <el-input
                          :disabled="true"
                          v-if="scope.row.type === '0'"
                          v-model="scope.row.rootknot"
                        ></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="pagination-container" style="padding-top: 2rem">
                    <el-pagination
                      :current-page.sync="listQueryListQT2.page"
                      :page-size="listQueryListQT2.limit"
                      :page-sizes="[5,10,20,30,50]"
                      :total="totalQT2"
                      @current-change="handleCurrentChangeQT2"
                      @size-change="handleSizeChangeQT2"
                      layout="slot,sizes, ->,prev, pager, next, jumper"
                    >
                      <slot>
                        <span
                          class="front Content_front"
                          style="padding-right: 0.5rem;font-weight: 400"
                        >{{$t('table.pagesize')}}</span>
                      </slot>
                    </el-pagination>
                  </div>
                </el-row>
              </div>
              <div>
                <el-dialog :visible.sync="daoruothertwo" width="50%">
                  <div>
                    <div style="margin-top: 1rem;margin-left: 28%">
                      <el-upload
                        :action="UploadUrlothertwo()"
                        :before-upload="handleChange"
                        :headers="authHeader"
                        :limit="1"
                        :on-remove="this.clear"
                        :on-success="handleSuccess"
                        drag
                        multiple
                        ref="uploader"
                      >
                        <i class="el-icon-upload"></i>
                        <div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>
                      </el-upload>
                    </div>
                    <el-row>
                      <span
                        v-if="this.resultShowothertwo"
                      >{{$t('label.PFANS2005FORMVIEW_CG')}}{{this.successCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        v-if="this.resultShowothertwo"
                      >{{$t('label.PFANS2005FORMVIEW_SB')}}{{this.errorCount}}</span>
                    </el-row>
                    <span v-if="this.Messageothertwo">{{this.cuowu}}</span>
                    <div v-if="this.resultothertwo">
                      <el-table :data="message">
                        <el-table-column
                          :label="$t('label.PFANS2017VIEW_CUHS')"
                          align="center"
                          prop="hang"
                          width="120%"
                        ></el-table-column>
                        <el-table-column
                          :label="$t('label.PFANS2017VIEW_ERROR')"
                          align="center"
                          prop="error"
                        ></el-table-column>
                      </el-table>
                      <div class="pagination-container" style="padding-top: 2rem">
                        <el-pagination
                          :current-page.sync="listQuery.page"
                          :page-size="listQuery.limit"
                          :page-sizes="[5,10,20,30,50]"
                          :total="total"
                          @current-change="handleCurrentChangeimprot"
                          @size-change="handleSizeChangeimprot"
                          layout="slot,sizes, ->,prev, pager, next, jumper"
                        >
                          <slot>
                            <span
                              class="front Content_front"
                              style="padding-right: 0.5rem;font-weight: 400"
                            >{{$t('table.pagesize')}}</span>
                          </slot>
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </el-dialog>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_QT4')" name="fifth">
              <div>
                <span
                  class="Title_front main_color"
                  style="float:left"
                >{{$t('label.PFANS2005FORMVIEW_QT4YL')}}</span>
                <el-row>
                  <el-table
                    :data="tableQT4"
                    header-cell-class-name="sub_bg_color_grey height"
                    show-summary
                    :summary-method="getSummaries"
                  >
                    <el-table-column
                      :label="$t('label.PFANS2006VIEW_NO')"
                      align="center"
                      prop="rowindex"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.department')"
                      align="center"
                      prop="department_id"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2020VIEW_JOBNUMBER')"
                      align="center"
                      prop="jobnumber"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2006VIEW_LASTNAME')"
                      align="center"
                      prop="user_id"
                      width="160%"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2009VIEW_DEPARTMENT')"
                      align="center"
                      prop="socialsecurity"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_HJ')"
                      align="center"
                      prop="total"
                    ></el-table-column>
                    <el-table-column :label="$t('label.remarks')" align="center" prop="remarks"></el-table-column>
                  </el-table>
                  <div class="pagination-container" style="padding-top: 2rem">
                    <el-pagination
                      :current-page.sync="listQueryListQT4.page"
                      :page-size="listQueryListQT4.limit"
                      :page-sizes="[5,10,20,30,50]"
                      :total="totalQT4"
                      @current-change="handleCurrentChangeQT4"
                      @size-change="handleSizeChangeQT4"
                      layout="slot,sizes, ->,prev, pager, next, jumper"
                    >
                      <slot>
                        <span
                          class="front Content_front"
                          style="padding-right: 0.5rem;font-weight: 400"
                        >{{$t('table.pagesize')}}</span>
                      </slot>
                    </el-pagination>
                  </div>
                </el-row>
              </div>
              <div>
                <el-dialog :visible.sync="daoruotherfour" width="50%">
                  <div>
                    <div style="margin-top: 1rem;margin-left: 28%">
                      <el-upload
                        :action="UploadUrlotherfour()"
                        :before-upload="handleChange"
                        :headers="authHeader"
                        :limit="1"
                        :on-remove="this.clear"
                        :on-success="handleSuccess"
                        drag
                        multiple
                        ref="uploader"
                      >
                        <i class="el-icon-upload"></i>
                        <div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>
                      </el-upload>
                    </div>
                    <el-row>
                      <span
                        v-if="this.resultShowotherfour"
                      >{{$t('label.PFANS2005FORMVIEW_CG')}}{{this.successCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        v-if="this.resultShowotherfour"
                      >{{$t('label.PFANS2005FORMVIEW_SB')}}{{this.errorCount}}</span>
                    </el-row>
                    <span v-if="this.Messageotherfour">{{this.cuowu}}</span>
                    <div v-if="this.resultotherfour">
                      <el-table :data="message">
                        <el-table-column
                          :label="$t('label.PFANS2017VIEW_CUHS')"
                          align="center"
                          prop="hang"
                          width="120%"
                        ></el-table-column>
                        <el-table-column
                          :label="$t('label.PFANS2017VIEW_ERROR')"
                          align="center"
                          prop="error"
                        ></el-table-column>
                      </el-table>
                      <div class="pagination-container" style="padding-top: 2rem">
                        <el-pagination
                          :current-page.sync="listQuery.page"
                          :page-size="listQuery.limit"
                          :page-sizes="[5,10,20,30,50]"
                          :total="total"
                          @current-change="handleCurrentChangeimprot"
                          @size-change="handleSizeChangeimprot"
                          layout="slot,sizes, ->,prev, pager, next, jumper"
                        >
                          <slot>
                            <span
                              class="front Content_front"
                              style="padding-right: 0.5rem;font-weight: 400"
                            >{{$t('table.pagesize')}}</span>
                          </slot>
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </el-dialog>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_QT5')" name="sixth">
              <div>
                <span
                  class="Title_front main_color"
                  style="float:left"
                >{{$t('label.PFANS2005FORMVIEW_QT5YL')}}</span>
                <el-row>
                  <el-table
                    :data="tableQT5"
                    :summary-method="getSummaries"
                    header-cell-class-name="sub_bg_color_grey height"
                    show-summary
                  >
                    <el-table-column
                      :label="$t('label.PFANS2006VIEW_NO')"
                      align="center"
                      prop="rowindex"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.department')"
                      align="center"
                      prop="department_id"
                    ></el-table-column>
                    <el-table-column :label="$t('label.user_name')" align="center" prop="user_id"></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_BCYL')"
                      align="center"
                      prop="medicalinsurance"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_YWBX')"
                      align="center"
                      prop="accident"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_TJ')"
                      align="center"
                      prop="physical"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_FZHJ')"
                      align="center"
                      prop="welfaretotal"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_GHFL')"
                      align="center"
                      prop="labourunion"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_WNHJP')"
                      align="center"
                      prop="annualmeeting"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_ZHLYF')"
                      align="center"
                      prop="travel"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_HJ')"
                      align="center"
                      prop="total"
                    ></el-table-column>
                    <el-table-column :label="$t('label.remarks')" align="center" prop="remarks"></el-table-column>
                  </el-table>
                  <div class="pagination-container" style="padding-top: 2rem">
                    <el-pagination
                      :current-page.sync="listQueryListQT5.page"
                      :page-size="listQueryListQT5.limit"
                      :page-sizes="[5,10,20,30,50]"
                      :total="totalQT5"
                      @current-change="handleCurrentChangeQT5"
                      @size-change="handleSizeChangeQT5"
                      layout="slot,sizes, ->,prev, pager, next, jumper"
                    >
                      <slot>
                        <span
                          class="front Content_front"
                          style="padding-right: 0.5rem;font-weight: 400"
                        >{{$t('table.pagesize')}}</span>
                      </slot>
                    </el-pagination>
                  </div>
                </el-row>
              </div>
              <div>
                <el-dialog :visible.sync="daoruotherfive" width="50%">
                  <div>
                    <div style="margin-top: 1rem;margin-left: 28%">
                      <el-upload
                        :action="UploadUrlotherfive()"
                        :before-upload="handleChange"
                        :headers="authHeader"
                        :limit="1"
                        :on-remove="this.clear"
                        :on-success="handleSuccess"
                        drag
                        multiple
                        ref="uploader"
                      >
                        <i class="el-icon-upload"></i>
                        <div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>
                      </el-upload>
                    </div>
                    <el-row>
                      <span
                        v-if="this.resultShowotherfive"
                      >{{$t('label.PFANS2005FORMVIEW_CG')}}{{this.successCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        v-if="this.resultShowotherfive"
                      >{{$t('label.PFANS2005FORMVIEW_SB')}}{{this.errorCount}}</span>
                    </el-row>
                    <span v-if="this.Messageotherfive">{{this.cuowu}}</span>
                    <div v-if="this.resultotherfive">
                      <el-table :data="message">
                        <el-table-column
                          :label="$t('label.PFANS2017VIEW_CUHS')"
                          align="center"
                          prop="hang"
                          width="120%"
                        ></el-table-column>
                        <el-table-column
                          :label="$t('label.PFANS2017VIEW_ERROR')"
                          align="center"
                          prop="error"
                        ></el-table-column>
                      </el-table>
                      <div class="pagination-container" style="padding-top: 2rem">
                        <el-pagination
                          :current-page.sync="listQuery.page"
                          :page-size="listQuery.limit"
                          :page-sizes="[5,10,20,30,50]"
                          :total="total"
                          @current-change="handleCurrentChangeimprot"
                          @size-change="handleSizeChangeimprot"
                          layout="slot,sizes, ->,prev, pager, next, jumper"
                        >
                          <slot>
                            <span
                              class="front Content_front"
                              style="padding-right: 0.5rem;font-weight: 400"
                            >{{$t('table.pagesize')}}</span>
                          </slot>
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </el-dialog>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_RZ')" name="seventh"></el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_TZ')" name="eighth"></el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_QQ')" name="ninth">
              <span
                class="Title_front main_color"
                style="float:left"
              >{{$t('label.PFANS2005FORMVIEW_QQYL')}}</span>
              <el-table :data="tableQQ" :summary-method="getSummaries" show-summary>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_NO')"
                  align="center"
                  prop="rowindex"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_LASTNAME')"
                  align="center"
                  prop="user_id"
                  width="160%"
                ></el-table-column>
                <el-table-column :label="$t('label.PFANS2005FORMVIEW_XYQQ')" align="center">
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_QQH')"
                    align="center"
                    prop="lastdiligence"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_DBQH')"
                    align="center"
                    prop="lastshortdeficiency"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_CBQH')"
                    align="center"
                    prop="lastchronicdeficiency"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_HJY')"
                    align="center"
                    prop="lasttotal"
                    width="150%"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS2005FORMVIEW_JYQQ')" align="center">
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_QQH')"
                    align="center"
                    prop="thisdiligence"
                    width="150%"
                  >
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_DBQH')"
                    align="center"
                    prop="thisshortdeficiency"
                    width="150%"
                  >
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_CBQH')"
                    align="center"
                    prop="thischronicdeficiency"
                    width="150%"
                  >
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_HJY')"
                    align="center"
                    prop="thistotal"
                    width="150%"
                  ></el-table-column>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2026FORMVIEW_REMARKS')"
                  align="center"
                  prop="remarks"
                  width="120%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2005FORMVIEW_KCJL')"
                  align="center"
                  prop="give"
                  width="120%"
                ></el-table-column>
              </el-table>
              <div class="pagination-container" style="padding-top: 2rem">
                <el-pagination
                  :current-page.sync="listQueryListQQ.page"
                  :page-size="listQueryListQQ.limit"
                  :page-sizes="[5,10,20,30,50]"
                  :total="totalQQ"
                  @current-change="handleCurrentChangeQQ"
                  @size-change="handleSizeChangeQQ"
                  layout="slot,sizes, ->,prev, pager, next, jumper"
                >
                  <slot>
                    <span
                      class="front Content_front"
                      style="padding-right: 0.5rem;font-weight: 400"
                    >{{$t('table.pagesize')}}</span>
                  </slot>
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_CY')" name="tenth">
              <span
                class="Title_front main_color"
                style="float:left"
              >{{$t('label.PFANS2005FORMVIEW_CYYL')}}</span>
              <el-table :data="tableCY" :summary-method="getSummaries" show-summary>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_NO')"
                  align="center"
                  prop="rowindex"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_LASTNAME')"
                  align="center"
                  prop="user_id"
                  width="160%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2003FORMVIEW_RN')"
                  align="center"
                  prop="rn"
                  width="160%"
                ></el-table-column>
                <el-table-column :label="$t('label.PFANS2005FORMVIEW_XYCY')" align="center">
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_PRJB')"
                    align="center"
                    prop="lastweekdays"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_PRSY1')"
                    align="center"
                    prop="lastlatenight"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_XRJB')"
                    align="center"
                    prop="lastrestDay"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_XRSY1')"
                    align="center"
                    prop="lastrestlatenight"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_FDJB')"
                    align="center"
                    prop="lastlegal"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_FDSY1')"
                    align="center"
                    prop="lastlegallatenight"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_DX')"
                    align="center"
                    prop="lastreplace"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_HJH')"
                    align="center"
                    prop="lasttotalh"
                    width="110%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_HJY')"
                    align="center"
                    prop="lasttotaly"
                    width="110%"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS2005FORMVIEW_JYCY')" align="center">
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_PRJB')"
                    align="center"
                    prop="thisweekdays"
                    width="150%"
                  >
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_PRSY1')"
                    align="center"
                    prop="thislatenight"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_XRJB')"
                    align="center"
                    prop="thisrestDay"
                    width="150%"
                  >
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_XRSY1')"
                    align="center"
                    prop="thisrestlatenight"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_FDJB')"
                    align="center"
                    prop="thislegal"
                    width="150%"
                  >
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_FDSY1')"
                    align="center"
                    prop="thislegallatenight"
                    width="150%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_DX')"
                    align="center"
                    prop="thisreplace"
                    width="150%"
                  >
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_DXN')"
                    align="center"
                    prop="thisreplace3"
                    width="150%"
                  >
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_HJH')"
                    align="center"
                    prop="thistotalh"
                    width="110%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_HJY')"
                    align="center"
                    prop="thistotaly"
                    width="110%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2026FORMVIEW_REMARKS')"
                    align="center"
                    prop="remarks"
                    width="110%"
                  ></el-table-column>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_KASUKE')"
                  align="center"
                  prop="subsidy"
                  width="120%"
                ></el-table-column>
              </el-table>
              <div class="pagination-container" style="padding-top: 2rem">
                <el-pagination
                  :current-page.sync="listQueryListCY.page"
                  :page-size="listQueryListCY.limit"
                  :page-sizes="[5,10,20,30,50]"
                  :total="totalCY"
                  @current-change="handleCurrentChangeCY"
                  @size-change="handleSizeChangeCY"
                  layout="slot,sizes, ->,prev, pager, next, jumper"
                >
                  <slot>
                    <span
                      class="front Content_front"
                      style="padding-right: 0.5rem;font-weight: 400"
                    >{{$t('table.pagesize')}}</span>
                  </slot>
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_YDSY')" name="eleventh">
              <div>
                <span
                  class="Title_front main_color"
                  style="float:left"
                >{{$t('label.PFANS2005FORMVIEW_YDSY')}}</span>
                <el-row>
                  <el-table
                    :data="tableYDSY"
                    :summary-method="getSummaries"
                    header-cell-class-name="sub_bg_color_grey height"
                    show-summary
                  >
                    <el-table-column
                      :label="$t('label.PFANS2006VIEW_NO')"
                      align="center"
                      prop="rowindex"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"
                      align="center"
                      prop="user_id"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_PJ')"
                      align="center"
                      prop="commentary"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1004VIEW_AMOUNT')"
                      align="center"
                      prop="amount"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_KZ1')"
                      align="center"
                      prop="other1"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_KZ2')"
                      align="center"
                      prop="other2"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_KZ3')"
                      align="center"
                      prop="other3"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_KZ4')"
                      align="center"
                      prop="other4"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_KZ5')"
                      align="center"
                      prop="other5"
                    ></el-table-column>
                  </el-table>
                  <div class="pagination-container" style="padding-top: 2rem">
                    <el-pagination
                      :current-page.sync="listQueryListYDSY.page"
                      :page-size="listQueryListYDSY.limit"
                      :page-sizes="[5,10,20,30,50]"
                      :total="totalYDSY"
                      @current-change="handleCurrentChangeYDSY"
                      @size-change="handleSizeChangeYDSY"
                      layout="slot,sizes, ->,prev, pager, next, jumper"
                    >
                      <slot>
                        <span
                          class="front Content_front"
                          style="padding-right: 0.5rem;font-weight: 400"
                        >{{$t('table.pagesize')}}</span>
                      </slot>
                    </el-pagination>
                  </div>
                </el-row>
              </div>
              <div>
                <el-dialog :visible.sync="daoruappreciation" width="50%">
                  <div>
                    <div style="margin-top: 1rem;margin-left: 28%">
                      <el-upload
                        :action="UploadUrlappreciation()"
                        :before-upload="handleChange"
                        :headers="authHeader"
                        :limit="1"
                        :on-remove="this.clear"
                        :on-success="handleSuccess"
                        drag
                        multiple
                        ref="uploader"
                      >
                        <i class="el-icon-upload"></i>
                        <div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>
                      </el-upload>
                    </div>
                    <el-row>
                      <span
                        v-if="this.resultShowappreciation"
                      >{{$t('label.PFANS2005FORMVIEW_CG')}}{{this.successCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        v-if="this.resultShowappreciation"
                      >{{$t('label.PFANS2005FORMVIEW_SB')}}{{this.errorCount}}</span>
                    </el-row>
                    <span v-if="this.Messageappreciation">{{this.cuowu}}</span>
                    <div v-if="this.resultappreciation">
                      <el-table :data="message">
                        <el-table-column
                          :label="$t('label.PFANS2017VIEW_CUHS')"
                          align="center"
                          prop="hang"
                          width="120%"
                        ></el-table-column>
                        <el-table-column
                          :label="$t('label.PFANS2017VIEW_ERROR')"
                          align="center"
                          prop="error"
                        ></el-table-column>
                      </el-table>
                      <div class="pagination-container" style="padding-top: 2rem">
                        <el-pagination
                          :current-page.sync="listQuery.page"
                          :page-size="listQuery.limit"
                          :page-sizes="[5,10,20,30,50]"
                          :total="total"
                          @current-change="handleCurrentChangeimprot"
                          @size-change="handleSizeChangeimprot"
                          layout="slot,sizes, ->,prev, pager, next, jumper"
                        >
                          <slot>
                            <span
                              class="front Content_front"
                              style="padding-right: 0.5rem;font-weight: 400"
                            >{{$t('table.pagesize')}}</span>
                          </slot>
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </el-dialog>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_ZHSR')" name="twelfth">
              <span
                class="Title_front main_color"
                style="float:left"
              >{{$t('label.PFANS2005FORMVIEW_ZHSR')}}</span>
              <el-table :data="tableZHSR" :summary-method="getSummaries" show-summary>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_NO')"
                  align="center"
                  prop="rowindex"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_LASTNAME')"
                  align="center"
                  width="160%"
                  prop="user_id"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANSUSERFORMVIEW_NDSY')"
                  align="center"
                  width="120%"
                  prop="user_id"
                ></el-table-column>

                <el-table-column :label="this.YEAR1" align="center" width="110%" prop="january">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month1wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month1appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="this.YEAR2" align="center" width="110%" prop="february">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month2wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month2appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="this.YEAR3" align="center" width="110%" prop="march">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month3wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month3appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="this.YEAR4" align="center" width="110%" prop="april">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month4wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month4appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="this.YEAR8" align="center" width="110%" prop="may">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month5wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month5appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="this.YEAR6" align="center" width="110%" prop="june">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month6wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month6appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="this.YEAR7" align="center" width="110%" prop="july">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month7wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month7appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="this.YEAR8" align="center" width="110%" prop="august">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month8wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month8appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="this.YEAR9" align="center" width="110%" prop="september">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month9wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month9appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="this.YEAR10" align="center" width="110%" prop="october">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month10wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month10appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="this.YEAR11" align="center" width="110%" prop="november">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month11wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month11appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="this.YEAR12" align="center" width="110%" prop="december">
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YFGZ')"
                    align="center"
                    width="110%"
                    prop="month12wages"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANSUSERFORMVIEW_YDSY')"
                    align="center"
                    width="110%"
                    prop="month12appreciation"
                  ></el-table-column>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANSUSERFORMVIEW_LJNDSY')"
                  align="center"
                  prop="total"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANSUSERFORMVIEW_LJNJSR')"
                  align="center"
                  prop="total"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANSUSERFORMVIEW_LJN')"
                  align="center"
                  prop="total"
                ></el-table-column>
              </el-table>
              <div class="pagination-container" style="padding-top: 2rem">
                <el-pagination
                  :current-page.sync="listQueryListZHSR.page"
                  :page-size="listQueryListZHSR.limit"
                  :page-sizes="[5,10,20,30,50]"
                  :total="totalZHSR"
                  @current-change="handleCurrentChangeZHSR"
                  @size-change="handleSizeChangeZHSR"
                  layout="slot,sizes, ->,prev, pager, next, jumper"
                >
                  <slot>
                    <span
                      class="front Content_front"
                      style="padding-right: 0.5rem;font-weight: 400"
                    >{{$t('table.pagesize')}}</span>
                  </slot>
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_ZXKC')" name="thirteenth">
              <span
                class="Title_front main_color"
                style="float:left"
              >{{$t('label.PFANS2005FORMVIEW_LYZXKC')}}</span>
              <el-table :data="tableZXKC" :summary-method="getSummaries" show-summary>
                <el-table-column :label="$t('label.PFANS2005FORMVIEW_JB')" align="center">
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_NO')"
                    align="center"
                    prop="number"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_LASTNAME')"
                    align="center"
                    prop="user_id"
                    width="160%"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS2005FORMVIEW_LYZXKC')" align="center">
                  <el-table-column :label="this.YEAR1" align="center" prop="january" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR2" align="center" prop="february" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR3" align="center" prop="march" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR4" align="center" prop="april" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR5" align="center" prop="may" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR6" align="center" prop="june" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR7" align="center" prop="july" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR8" align="center" prop="august" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR9" align="center" prop="september" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR10" align="center" prop="october" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR11" align="center" prop="november" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR12" align="center" prop="december" width="110%"></el-table-column>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2005FORMVIEW_LJNDKC')"
                  align="center"
                  prop="total"
                  width="120%"
                ></el-table-column>
              </el-table>
              <div class="pagination-container" style="padding-top: 2rem">
                <el-pagination
                  :current-page.sync="listQueryListZXKC.page"
                  :page-size="listQueryListZXKC.limit"
                  :page-sizes="[5,10,20,30,50]"
                  :total="totalZXKC"
                  @current-change="handleCurrentChangeZXKC"
                  @size-change="handleSizeChangeZXKC"
                  layout="slot,sizes, ->,prev, pager, next, jumper"
                >
                  <slot>
                    <span
                      class="front Content_front"
                      style="padding-right: 0.5rem;font-weight: 400"
                    >{{$t('table.pagesize')}}</span>
                  </slot>
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_FJKC')" name="fourteenth">
              <div>
                <span
                  class="Title_front main_color"
                  style="float:left"
                >{{$t('label.PFANS2005FORMVIEW_FJKCYL')}}</span>
                <el-row>
                  <el-table
                    :data="tableFJKC"
                    header-cell-class-name="sub_bg_color_grey height"
                    show-summary
                    :summary-method="getSummaries"
                  >
                    <el-table-column
                      :label="$t('label.PFANS2006VIEW_NO')"
                      align="center"
                      prop="rowindex"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2006VIEW_LASTNAME')"
                      align="center"
                      prop="user_id"
                      width="160%"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_LJZNJY')"
                      align="center"
                      prop="childreneducation"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_LJZFDYXX')"
                      align="center"
                      prop="housing"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_LJZFZJ')"
                      align="center"
                      prop="rent"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_LJSYLR')"
                      align="center"
                      prop="support"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_LJJXJY')"
                      align="center"
                      prop="education"
                    ></el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2005FORMVIEW_TJF')"
                      align="center"
                      prop="total"
                    ></el-table-column>
                  </el-table>
                  <div class="pagination-container" style="padding-top: 2rem">
                    <el-pagination
                      :current-page.sync="listQueryListFJKC.page"
                      :page-size="listQueryListFJKC.limit"
                      :page-sizes="[5,10,20,30,50]"
                      :total="totalFJKC"
                      @current-change="handleCurrentChangeFJKC"
                      @size-change="handleSizeChangeFJKC"
                      layout="slot,sizes, ->,prev, pager, next, jumper"
                    >
                      <slot>
                        <span
                          class="front Content_front"
                          style="padding-right: 0.5rem;font-weight: 400"
                        >{{$t('table.pagesize')}}</span>
                      </slot>
                    </el-pagination>
                  </div>
                </el-row>
              </div>
              <div>
                <el-dialog :visible.sync="daorufjkc" width="50%">
                  <div>
                    <div style="margin-top: 1rem;margin-left: 28%">
                      <el-upload
                        :action="UploadUrlfjkc()"
                        :before-upload="handleChange"
                        :headers="authHeader"
                        :limit="1"
                        :on-remove="this.clear"
                        :on-success="handleSuccess"
                        drag
                        multiple
                        ref="uploader"
                      >
                        <i class="el-icon-upload"></i>
                        <div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>
                      </el-upload>
                    </div>
                    <el-row>
                      <span
                        v-if="this.resultShowfjkc"
                      >{{$t('label.PFANS2005FORMVIEW_CG')}}{{this.successCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        v-if="this.resultShowfjkc"
                      >{{$t('label.PFANS2005FORMVIEW_SB')}}{{this.errorCount}}</span>
                    </el-row>
                    <span v-if="this.Messagefjkc">{{this.cuowu}}</span>
                    <div v-if="this.resultfjkc">
                      <el-table :data="message">
                        <el-table-column
                          :label="$t('label.PFANS2017VIEW_CUHS')"
                          align="center"
                          prop="hang"
                          width="120%"
                        ></el-table-column>
                        <el-table-column
                          :label="$t('label.PFANS2017VIEW_ERROR')"
                          align="center"
                          prop="error"
                        ></el-table-column>
                      </el-table>
                      <div class="pagination-container" style="padding-top: 2rem">
                        <el-pagination
                          :current-page.sync="listQuery.page"
                          :page-size="listQuery.limit"
                          :page-sizes="[5,10,20,30,50]"
                          :total="total"
                          @current-change="handleCurrentChangeimprot"
                          @size-change="handleSizeChangeimprot"
                          layout="slot,sizes, ->,prev, pager, next, jumper"
                        >
                          <slot>
                            <span
                              class="front Content_front"
                              style="padding-right: 0.5rem;font-weight: 400"
                            >{{$t('table.pagesize')}}</span>
                          </slot>
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </el-dialog>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_MS')" name="fifteenth">
              <span
                class="Title_front main_color"
                style="float:left"
              >{{$t('label.PFANS2005FORMVIEW_MS')}}</span>
              <el-table :data="tableMS" :summary-method="getSummaries" show-summary>
                <el-table-column :label="$t('label.PFANS2005FORMVIEW_JB')" align="center">
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_NO')"
                    align="center"
                    prop="rowindex"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_LASTNAME')"
                    align="center"
                    width="160%"
                    prop="user_id"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS2005FORMVIEW_LYMSRE')" align="center">
                  <el-table-column :label="this.YEAR1" align="center" width="110%" prop="january"></el-table-column>
                  <el-table-column :label="this.YEAR2" align="center" width="110%" prop="february"></el-table-column>
                  <el-table-column :label="this.YEAR3" align="center" width="110%" prop="march"></el-table-column>
                  <el-table-column :label="this.YEAR4" align="center" width="110%" prop="april"></el-table-column>
                  <el-table-column :label="this.YEAR8" align="center" width="110%" prop="may"></el-table-column>
                  <el-table-column :label="this.YEAR6" align="center" width="110%" prop="june"></el-table-column>
                  <el-table-column :label="this.YEAR7" align="center" width="110%" prop="july"></el-table-column>
                  <el-table-column :label="this.YEAR8" align="center" width="110%" prop="august"></el-table-column>
                  <el-table-column :label="this.YEAR9" align="center" width="110%" prop="september"></el-table-column>
                  <el-table-column :label="this.YEAR10" align="center" width="110%" prop="october"></el-table-column>
                  <el-table-column :label="this.YEAR11" align="center" width="110%" prop="november"></el-table-column>
                  <el-table-column :label="this.YEAR12" align="center" width="110%" prop="december"></el-table-column>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2005FORMVIEW_LJNDKC')"
                  align="center"
                  prop="total"
                ></el-table-column>
              </el-table>
              <div class="pagination-container" style="padding-top: 2rem">
                <el-pagination
                  :current-page.sync="listQueryListMS.page"
                  :page-size="listQueryListMS.limit"
                  :page-sizes="[5,10,20,30,50]"
                  :total="totalDutyfreeVo"
                  @current-change="handleCurrentChangeMS"
                  @size-change="handleSizeChangeMS"
                  layout="slot,sizes, ->,prev, pager, next, jumper"
                >
                  <slot>
                    <span
                      class="front Content_front"
                      style="padding-right: 0.5rem;font-weight: 400"
                    >{{$t('table.pagesize')}}</span>
                  </slot>
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_LJSJ')" name="sixteenth">
              {{$t('label.PFANS2005FORMVIEW_LJNF')}}
              <el-table :data="tableLJSJ" :summary-method="getSummaries" show-summary>
                <el-table-column :label="$t('label.PFANS2005FORMVIEW_JB')" align="center">
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_NO')"
                    align="center"
                    prop="rowindex"
                    width="50%"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_LASTNAME')"
                    align="center"
                    prop="user_id"
                    width="160%"
                  ></el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS2005FORMVIEW_LJNF')" align="center">
                  <el-table-column :label="this.YEAR1" align="center" prop="january" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR2" align="center" prop="february" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR3" align="center" prop="march" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR4" align="center" prop="april" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR8" align="center" prop="may" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR6" align="center" prop="june" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR7" align="center" prop="july" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR8" align="center" prop="august" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR9" align="center" prop="september" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR10" align="center" prop="october" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR11" align="center" prop="november" width="110%"></el-table-column>
                  <el-table-column :label="this.YEAR12" align="center" prop="december" width="110%"></el-table-column>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2005FORMVIEW_NJLJSJ')"
                  align="center"
                  prop="sumThis"
                  width="120%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2005FORMVIEW_NDYDNS')"
                  align="center"
                  prop="shouldwages"
                  width="120%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2005FORMVIEW_NDYDSJ')"
                  align="center"
                  prop="shouldwages"
                  width="120%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2005FORMVIEW_HFCE')"
                  align="center"
                  prop="balance"
                  width="120%"
                ></el-table-column>
              </el-table>
              <div class="pagination-container" style="padding-top: 2rem">
                <el-pagination
                  :current-page.sync="listQueryListLJSJ.page"
                  :page-size="listQueryListLJSJ.limit"
                  :page-sizes="[5,10,20,30,50]"
                  :total="totalAccumulatedTax"
                  @current-change="handleCurrentChangeLJSJ"
                  @size-change="handleSizeChangeLJSJ"
                  layout="slot,sizes, ->,prev, pager, next, jumper"
                >
                  <slot>
                    <span
                      class="front Content_front"
                      style="padding-right: 0.5rem;font-weight: 400"
                    >{{$t('table.pagesize')}}</span>
                  </slot>
                </el-pagination>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS2005FORMVIEW_GRDB')" name="seventeenth">
              {{$t('label.PFANS2005FORMVIEW_GRDB')}}
              <el-row>
                <el-table
                  :data="tableGRDB"
                  :summary-method="getSummaries"
                  border
                  header-cell-class-name="sub_bg_color_grey height"
                  show-summary
                >
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_NO')"
                    align="center"
                    prop="rowindex"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.department')"
                    align="center"
                    prop="department_id"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2007VIEW_NAME')"
                    align="center"
                    prop="user_id"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_JULY')"
                    align="center"
                    prop="thismonth"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_JUNE')"
                    align="center"
                    prop="lastmonth"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_DIFFERENCE')"
                    align="center"
                    prop="difference"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_CAUSE')"
                    align="center"
                    prop="reason"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.reason"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination-container" style="padding-top: 2rem">
                  <el-pagination
                    :current-page.sync="listQueryListGRDB.page"
                    :page-size="listQueryListGRDB.limit"
                    :page-sizes="[5,10,20,30,50]"
                    :total="totalContrast"
                    @current-change="handleCurrentChangeGRDB"
                    @size-change="handleSizeChangeGRDB"
                    layout="slot,sizes, ->,prev, pager, next, jumper"
                  >
                    <slot>
                      <span
                        class="front Content_front"
                        style="padding-right: 0.5rem;font-weight: 400"
                      >{{$t('table.pagesize')}}</span>
                    </slot>
                  </el-pagination>
                </div>
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
  import PFANS2005View from '../PFANS2005/PFANS2005View.vue';
  import {getToken} from '@/utils/auth';
  import {Message} from 'element-ui';
  import {getDictionaryInfo, getUserInfo} from '@/utils/customize';
  import moment from 'moment';

  export default {
    name: 'PFANS2005FormView',
    components: {
      EasyNormalContainer,
      PFANS2005View,
    },
    data() {
      return {
        tableData: [{
          no: 1,
        },
          {
            no: 2,
          },
          {
            no: 3,
          }],
        totaldataFJKC: [],
        totaldataQQ: [],
        totaldataCY: [],
        totaldataZHSR: [],
        totaldataZXKC: [],
        totaldataQT4: [],
        totaldataQT5: [],
        totaldataQT2: [],
        totaldataBase: [],
        totaldataContrast: [],
        totaldataOtherOneWoman: [],
        totaldataOtherOneMan: [],
        totaldataDutyfreeVo: [],
        totaldataAccumulatedTax: [],
        totaldataYDSY: [],
        totaldata: [],
        totaldataimprot: [],
        listQuery: {
          page: 1,
          limit: 5,
        },
        listQueryListQT1Woman: {
          page: 1,
          limit: 5,
        },
        listQueryListQT1Man: {
          page: 1,
          limit: 5,
        },
        listQueryListYDSY: {
          page: 1,
          limit: 5,
        },
        listQueryListZHSR: {
          page: 1,
          limit: 5,
        },
        listQueryListZXKC: {
          page: 1,
          limit: 5,
        },
        listQueryListFJKC: {
          page: 1,
          limit: 5,
        },
        listQueryListMS: {
          page: 1,
          limit: 5,
        },
        listQueryListLJSJ: {
          page: 1,
          limit: 5,
        },
        listQueryListGRDB: {
          page: 1,
          limit: 5,
        },
        listQueryListQT2: {
          page: 1,
          limit: 5,
        },
        listQueryListQT4: {
          page: 1,
          limit: 5,
        },
        listQueryListQT5: {
          page: 1,
          limit: 5,
        },
        listQueryListQQ: {
          page: 1,
          limit: 5,
        },
        listQueryListCY: {
          page: 1,
          limit: 5,
        },
        listQueryListJS: {
          page: 1,
          limit: 5,
        },
        menuList: [{value: '1', label: 1}, {value: '2', label: 2}],
        totalQQ: 0,
        totalCY: 0,
        total: 0,
        totalFJKC: 0,
        totalZHSR: 0,
        totalQT4: 0,
        totalQT2: 0,
        totalZXKC: 0,
        totalQT5: 0,
        totalBase: 0,
        totalDutyfreeVo: 0,
        totalAccumulatedTax: 0,
        totalContrast: 0,
        totalOtherOneMan: 0,
        totalOtherOne: 0,
        totalYDSY: 0,
        ListZXKC: '',
        ListFJKC: '',
        ListZHSR: '',
        ListQt2: '',
        ListQQ: '',
        ListCY: '',
        ListQt5: '',
        listBase: '',
        listAccumulatedTax: '',
        listDutyfreeVo: '',
        listContrast: '',
        listOtherOne: '',
        ListOtherOneSex: '',
        ListYDSY: '',
        YEAR1:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '01' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        YEAR2:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '02' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        YEAR3:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '03' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        YEAR4:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '04' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        YEAR5:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '06' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        YEAR6:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '06' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        YEAR7:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '07' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        YEAR8:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '08' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        YEAR9:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '09' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        YEAR10:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '10' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        YEAR11:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '11' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        YEAR12:
          moment().years() +
          this.$t('label.PFANS2005FORMVIEW_YEAR') +
          '12' +
          this.$t('label.PFANS2005FORMVIEW_MONTH'),
        othertwo: [],
        message: [{hang: '', error: ''}],
        Messageothertwo: false,
        Messageotherfive: false,
        Messageappreciation: false,
        Messageotherfour: false,
        Messagefjkc: false,
        cuowu: '',
        tab: '',
        resultShowfjkc: false,
        resultothertwo: false,
        resultotherfour: false,
        resultotherfive: false,
        resultappreciation: false,
        addActionUrl: '',
        daorufjkc: false,
        daoruappreciation: false,
        daoruotherfive: false,
        daoruotherfour: false,
        daoruothertwo: false,
        loading: false,
        Giving: '',
        resultfjkc: false,
        resultShowothertwo: false,
        resultShowotherfive: false,
        resultShowappreciation: false,
        resultShowotherfour: false,
        downloadLoading: false,
        authHeader: {'x-auth-token': getToken()},
        activeName: 'first',
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: true,
            icon: 'el-icon-check',
          },
          {
            key: 'import',
            name: 'button.import',
            disabled: true,
            icon: 'el-icon-download',
          },
        ],
        OTherTwo: {
          giving_id: '',
          type: '',
        },
        tableJS: [
          {
            rowindex: '',
            department_id: '',
            user_id: '',
            rn: '',
            sex: '',
            onlychil: '',
            type: '',
            bonus: '',
            sociology: '',
            registered: '',
            lastmonth: '',
            thismonth: '',
            pension: '',
            medical: '',
            accumulation: '',
            heating: '',
            workdate: '',
          },
        ],
        tableQT5: [
          {
            rowindex: '',
            department_id: '',
            user_id: '',
            medicalinsurance: '',
            accident: '',
            physical: '',
            welfaretotal: '',
            labourunion: '',
            annualmeeting: '',
            travel: '',
            total: '',
            remarks: '',
          },
        ],
        tableQT1Woman: [
          {
            otherone_id: '',
            giving_id: '',
            rowindex: '',
            department_id: '',
            user_id: '',
            sex: '',
            workdate: '',
            reststart: '',
            restend: '',
            attendance: '',
            other1: '',
            basedata: '',
          },
        ],
        tableQT1Man: [
          {
            rowindex: '',
            department_id: '',
            user_id: '',
            sex: '',
            workdate: '',
            startdate: '',
            enddate: '',
            vacation: '',
            handsupport: '',
          },
        ],
        tableQT2: [
          {
            giving_id: '',
            othertwo_id: '',
            rowindex: '',
            user_id: '',
            moneys: '',
            rootknot: '',
          },
        ],
        tableYDSY: [
          {
            rowindex: '',
            user_id: '',
            commentary: '',
            amount: '',
            other1: '',
            other2: '',
            other3: '',
            other4: '',
            other5: '',
          },
        ],
        tableQT4: [
          {
            otherfour_id: '',
            giving_id: '',
            department_id: '',
            user_id: '',
            socialsecurity: '',
            total: '',
            remarks: '',
            rowindex: '',
            jobnumber: '',
          },
        ],
        tableFJKC: [
          {
            user_id: '',
            childreneducation: '',
            housing: '',
            rent: '',
            support: '',
            education: '',
            total: '',
          },
        ],
        tableZHSR: [
          {
            month1wages: '',
            month1appreciation: '',
            month2wages: '',
            month2appreciation: '',
            month3wages: '',
            month3appreciation: '',
            month4wages: '',
            month4appreciation: '',
            month5wages: '',
            month5appreciation: '',
            month6wages: '',
            month6appreciation: '',
            month7wages: '',
            month7appreciation: '',
            month8wages: '',
            month8appreciation: '',
            month9wages: '',
            month9appreciation: '',
            month10wages: '',
            month10appreciation: '',
            month11wages: '',
            month11appreciation: '',
            month12wages: '',
            month12appreciation: '',
          },
        ],
        tableMS: [
          {
            rowindex: '',
            user_id: '',
            january: '',
            february: '',
            march: '',
            april: '',
            may: '',
            june: '',
            july: '',
            august: '',
            september: '',
            october: '',
            november: '',
            december: '',
            total: '',
          },
        ],
        tableZXKC: [
          {
            number: '',
            user_id: '',
            january: '',
            february: '',
            march: '',
            april: '',
            may: '',
            june: '',
            july: '',
            august: '',
            september: '',
            october: '',
            november: '',
            december: '',
            total: '',
          },
        ],
        tableQQ: [{}],
        tableCY: [{}],
        tableLJSJ: [
          {
            user_id: '',
            january: '',
            february: '',
            march: '',
            april: '',
            may: '',
            june: '',
            july: '',
            august: '',
            september: '',
            october: '',
            november: '',
            december: '',
            sumThis: '',
            shouldwages: '',
            balance: '',
          },
        ],
        tableGRDB: [
          {
            contrast_id: '',
            rowindex: '',
            department_id: '',
            user_id: '',
            thismonth: '',
            lastmonth: '',
            difference: '',
            reason: '',
          },
        ],
        baseInfo: {},
      };
    },
    created() {
    },
    mounted() {
      this.Giving = this.$route.params._id;
      this.getListdata();
    },
    methods: {
      getListdata() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2005Store/givinglist', {giving_id: this.Giving})
          .then(response => {
            let lettableQT1Woman = [];
            let lettableQT1Man = [];
            let datalist = [];
            let datalistgrdb = [];
            let datalistzxkc = [];
            for (let j = 0; j < response.lackattendance.length; j++) {
              let user = getUserInfo(response.lackattendance[j].user_id);
              if (user) {
                response.lackattendance[j].user_id = getUserInfo(
                  response.lackattendance[j].user_id,
                ).userinfo.customername;
              }
              this.tableQQ = response.lackattendance;
              this.totaldataQQ = response.lackattendance;
              this.ListQQ = 8;
              this.getList();
            }
            for (let j = 0; j < response.residual.length; j++) {
              let user = getUserInfo(response.residual[j].user_id);
              if (user) {
                response.residual[j].user_id = getUserInfo(
                  response.residual[j].user_id,
                ).userinfo.customername;
              }
              if (response.residual[j].rn !== null && response.residual[j].rn !== '') {
                let letErrortype = getDictionaryInfo(response.residual[j].rn);
                if (letErrortype != null) {
                  response.residual[j].rn = letErrortype.value1;
                }
              }
              this.tableCY = response.residual;
              this.totaldataCY = response.residual;
              this.ListCY = 9;
              this.getList();
            }
            for (let i = 0; i < response.disciplinaryVo.length; i++) {
              let user = getUserInfo(response.disciplinaryVo[i].user_id);
              if (user) {
                response.disciplinaryVo[i].user_id = getUserInfo(
                  response.disciplinaryVo[i].user_id,
                ).userinfo.customername;
              }
              let obj = {};
              obj.number = i + 1;
              obj.user_id = response.disciplinaryVo[i].user_id;
              obj.january = response.disciplinaryVo[i].january;
              obj.february = response.disciplinaryVo[i].february;
              obj.march = response.disciplinaryVo[i].march;
              obj.april = response.disciplinaryVo[i].april;
              obj.may = response.disciplinaryVo[i].may;
              obj.june = response.disciplinaryVo[i].june;
              obj.july = response.disciplinaryVo[i].july;
              obj.august = response.disciplinaryVo[i].august;
              obj.september = response.disciplinaryVo[i].september;
              obj.october = response.disciplinaryVo[i].october;
              obj.november = response.disciplinaryVo[i].november;
              obj.december = response.disciplinaryVo[i].december;
              obj.total = response.disciplinaryVo[i].total;
              datalistzxkc[i] = obj;
              this.tableZXKC = datalistzxkc;
              this.totaldataZXKC = datalistzxkc;
              this.ListZXKC = 12;
              this.getList();
            }
            for (let j = 0; j < response.otherOne.length; j++) {
              if (response.otherOne[j].basedata === '1') {
                this.menuList.value = '1';
                this.menuList.label = 1;
              }
              if (response.otherOne[j].basedata === '2') {
                this.menuList.value = '2';
                this.menuList.label = 2;
              }
              if (response.otherOne[j].type === '1') {
                let user = getUserInfo(response.otherOne[j].user_id);
                if (user) {
                  response.otherOne[j].user_id = user.userinfo.customername;
                  response.otherOne[j].department_id = user.userinfo.centername;
                }
                if (
                  response.otherOne[j].sex !== null &&
                  response.otherOne[j].sex !== ''
                ) {
                  if (this.$i18n) {
                    if (response.otherOne[j].sex === '0') {
                      response.otherOne[j].sex = this.$t(
                        'label.PFANS2002FORMVIEW_BOY',
                      );
                    } else {
                      response.otherOne[j].sex = this.$t(
                        'label.PFANS2002FORMVIEW_GRIL',
                      );
                    }
                  }
                }
                if (
                  response.otherOne[j].workdate !== null &&
                  response.otherOne[j].workdate !== ''
                ) {
                  response.otherOne[j].workdate = moment(
                    response.otherOne[j].workdate,
                  ).format('YYYY-MM-DD');
                }
                if (
                  response.otherOne[j].reststart !== null &&
                  response.otherOne[j].reststart !== ''
                ) {
                  response.otherOne[j].reststart = moment(
                    response.otherOne[j].reststart,
                  ).format('YYYY-MM-DD');
                }
                if (
                  response.otherOne[j].restend !== null &&
                  response.otherOne[j].restend !== ''
                ) {
                  response.otherOne[j].restend = moment(
                    response.otherOne[j].restend,
                  ).format('YYYY-MM-DD');
                }
                lettableQT1Woman.push({
                  otherone_id: response.otherOne[j].otherone_id,
                  giving_id: response.otherOne[j].giving_id,
                  rowindex: response.otherOne[j].rowindex,
                  department_id: response.otherOne[j].department_id,
                  user_id: response.otherOne[j].user_id,
                  sex: response.otherOne[j].sex,
                  workdate: response.otherOne[j].workdate,
                  reststart: response.otherOne[j].reststart,
                  restend: response.otherOne[j].restend,
                  attendance: response.otherOne[j].attendance,
                  other1: response.otherOne[j].other1,
                  basedata: response.otherOne[j].basedata,
                });
                this.ListOtherOneSex = 1;
              } else if (response.otherOne[j].type === '2') {
                let user = getUserInfo(response.otherOne[j].user_id);
                if (user) {
                  response.otherOne[j].user_id = user.userinfo.customername;
                  response.otherOne[j].department_id = user.userinfo.centername;
                }
                if (
                  response.otherOne[j].sex !== null &&
                  response.otherOne[j].sex !== ''
                ) {
                  if (this.$i18n) {
                    if (response.otherOne[j].sex === '0') {
                      response.otherOne[j].sex = this.$t(
                        'label.PFANS2002FORMVIEW_BOY',
                      );
                    } else {
                      response.otherOne[j].sex = this.$t(
                        'label.PFANS2002FORMVIEW_GRIL',
                      );
                    }
                  }
                }
                if (
                  response.otherOne[j].workdate !== null &&
                  response.otherOne[j].workdate !== ''
                ) {
                  response.otherOne[j].workdate = moment(
                    response.otherOne[j].workdate,
                  ).format('YYYY-MM-DD');
                }
                if (
                  response.otherOne[j].startdate !== null &&
                  response.otherOne[j].startdate !== ''
                ) {
                  response.otherOne[j].startdate = moment(
                    response.otherOne[j].startdate,
                  ).format('YYYY-MM-DD');
                }
                if (
                  response.otherOne[j].enddate !== null &&
                  response.otherOne[j].enddate !== ''
                ) {
                  response.otherOne[j].enddate = moment(
                    response.otherOne[j].enddate,
                  ).format('YYYY-MM-DD');
                }
                lettableQT1Man.push({
                  rowindex: response.otherOne[j].rowindex,
                  department_id: response.otherOne[j].department_id,
                  user_id: response.otherOne[j].user_id,
                  sex: response.otherOne[j].sex,
                  workdate: response.otherOne[j].workdate,
                  startdate: response.otherOne[j].startdate,
                  enddate: response.otherOne[j].enddate,
                  vacation: response.otherOne[j].vacation,
                  handsupport: response.otherOne[j].handsupport,
                });
                this.ListOtherOneSex = 2;
              }
              if (this.ListOtherOneSex === 1) {
                this.totaldataOtherOneWoman = lettableQT1Woman;
              } else if (this.ListOtherOneSex === 2) {
                this.totaldataOtherOneMan = lettableQT1Man;
              }
              this.tableQT1Woman = lettableQT1Woman;
              this.tableQT1Man = lettableQT1Man;
              this.ListOtherOne = 2;
              this.getList();
            }
            for (let a = 0; a < response.otherTwo.length; a++) {
              let user = getUserInfo(response.otherTwo[a].user_id);
              if (user) {
                response.otherTwo[a].user_id = getUserInfo(
                  response.otherTwo[a].user_id,
                ).userinfo.customername;
              }
              if (
                response.otherTwo[a].rootknot !== null &&
                response.otherTwo[a].rootknot !== ''
              ) {
                let letErrortype = getDictionaryInfo(
                  response.otherTwo[a].rootknot,
                );
                if (letErrortype != null) {
                  response.otherTwo[a].rootknot = letErrortype.value1;
                }
              }
              let Obj = {};
              Obj.othertwo_id = response.otherTwo[a].othertwo_id;
              Obj.user_id = response.otherTwo[a].user_id;
              Obj.moneys = response.otherTwo[a].moneys;
              Obj.rootknot = response.otherTwo[a].rootknot;
              Obj.type = response.otherTwo[a].type;
              Obj.giving_id = response.otherTwo[a].giving_id;
              Obj.rowindex = a + 1;
              datalist[a] = Obj;
              this.tableQT2 = datalist;
              this.totaldataQT2 = datalist;
              this.ListQt2 = 3;
              this.getList();
            }
            for (let j = 0; j < response.appreciation.length; j++) {
              let user = getUserInfo(response.appreciation[j].user_id);
              if (user) {
                response.appreciation[j].user_id = getUserInfo(
                  response.appreciation[j].user_id,
                ).userinfo.customername;
              }
              this.tableYDSY = response.appreciation;
              this.totaldataYDSY = response.appreciation;
              this.ListYDSY = 10;
              this.getList();
            }

            for (let j = 0; j < response.otherFour.length; j++) {
              let user = getUserInfo(response.otherFour[j].user_id);
              if (user) {
                response.otherFour[j].user_id = getUserInfo(
                  response.otherFour[j].user_id,
                ).userinfo.customername;
              }
              this.tableQT4 = response.otherFour;
              this.totaldataQT4 = response.otherFour;
              this.ListQT4 = 4;
              this.getList();
            }

            for (let j = 0; j < response.addiTional.length; j++) {
              let user = getUserInfo(response.addiTional[j].user_id);
              if (user) {
                response.addiTional[j].user_id = getUserInfo(
                  response.addiTional[j].user_id,
                ).userinfo.customername;
              }
              this.tableFJKC = response.addiTional;
              this.totaldataFJKC = response.addiTional;
              this.ListFJKC = 13;
              this.getList();
            }

            for (let j = 0; j < response.otherFive.length; j++) {
              let user = getUserInfo(response.otherFive[j].user_id);
              if (user) {
                response.otherFive[j].user_id = getUserInfo(
                  response.otherFive[j].user_id,
                ).userinfo.customername;
              }
              this.tableQT5 = response.otherFive;
              this.totaldataQT5 = response.otherFive;
              this.ListQt5 = 5;
              this.getList();
            }
            for (let j = 0; j < response.base.length; j++) {
              let user = getUserInfo(response.base[j].user_id);
              if (user) {
                response.base[j].user_id = user.userinfo.customername;
                response.base[j].department_id = user.userinfo.centername;
              }
              if (response.base[j].rn !== null && response.base[j].rn !== '') {
                let letErrortype = getDictionaryInfo(response.base[j].rn);
                if (letErrortype != null) {
                  response.base[j].rn = letErrortype.value1;
                }
              }
              if (
                response.base[j].workdate !== null &&
                response.base[j].workdate !== ''
              ) {
                response.base[j].workdate = moment(
                  response.base[j].workdate,
                ).format('YYYY-MM-DD');
              }
              if (response.base[j].sex !== null && response.base[j].sex !== '') {
                if (this.$i18n) {
                  if (response.base[j].sex === '0') {
                    response.base[j].sex = this.$t('label.PFANS2002FORMVIEW_BOY');
                  } else {
                    response.base[j].sex = this.$t(
                      'label.PFANS2002FORMVIEW_GRIL',
                    );
                  }
                }
              }
              if (
                response.base[j].registered !== null &&
                response.base[j].registered !== ''
              ) {
                if (this.$i18n) {
                  if (response.base[j].registered === '1') {
                    response.base[j].registered = this.$t('label.yes');
                  } else {
                    response.base[j].registered = this.$t('label.no');
                  }
                }
              }
              if (
                response.base[j].bonus !== null &&
                response.base[j].bonus !== ''
              ) {
                if (this.$i18n) {
                  if (response.base[j].bonus === '1') {
                    response.base[j].bonus = this.$t(
                      'label.PFANSUSERFORMVIEW_NEWSTAFF',
                    );
                  } else {
                    response.base[j].bonus = this.$t(
                      'label.PFANSUSERFORMVIEW_OLDSTAFF',
                    );
                  }
                }
              }
              if (
                response.base[j].onlychild !== null &&
                response.base[j].onlychild !== ''
              ) {
                if (this.$i18n) {
                  if (response.base[j].onlychild === '1') {
                    response.base[j].onlychild = this.$t('label.yes');
                  } else {
                    response.base[j].onlychild = this.$t('label.no');
                  }
                }
              }
              this.tableJS = response.base;
              this.totaldataBase = response.base;
              this.listBase = 1;
              this.getList();
            }
            for (let j = 0; j < response.contrast.length; j++) {
              let user = getUserInfo(response.contrast[j].user_id);
              if (user) {
                response.contrast[j].user_id = user.userinfo.customername;
                response.contrast[j].department_id = user.userinfo.centername;
              }
              let obj = {};
              obj.contrast_id = response.contrast[j].contrast_id;
              obj.department_id = response.contrast[j].department_id;
              obj.user_id = response.contrast[j].user_id;
              obj.thismonth = response.contrast[j].thismonth;
              obj.lastmonth = response.contrast[j].lastmonth;
              obj.reason = response.contrast[j].reason;
              obj.rowindex = response.contrast[j].rowindex;
              if (
                response.contrast[j].thismonth != null &&
                response.contrast[j].lastmonth != null
              ) {
                obj.difference =
                  response.contrast[j].lastmonth - response.contrast[j].thismonth;
              }
              datalistgrdb[j] = obj;
              this.tableGRDB = datalistgrdb;
              this.totaldataContrast = datalistgrdb;
              this.listContrast = 16;
              this.getList();
            }
            for (let j = 0; j < response.accumulatedTaxVo.length; j++) {
              let user = getUserInfo(response.accumulatedTaxVo[j].user_id);
              if (user) {
                response.accumulatedTaxVo[j].user_id = getUserInfo(
                  response.accumulatedTaxVo[j].user_id,
                ).userinfo.customername;
              }
              if (
                response.accumulatedTaxVo[j].shouldwages === null ||
                response.accumulatedTaxVo[j].shouldwages === ''
              ) {
                response.accumulatedTaxVo[j].shouldwages = '0';
              }
              if (
                response.accumulatedTaxVo[j].shouldwages !== null ||
                response.accumulatedTaxVo[j].shouldwages !== ''
              ) {
                response.accumulatedTaxVo[j].balance =
                  response.accumulatedTaxVo[j].shouldwages -
                  response.accumulatedTaxVo[j].sumThis -
                  response.accumulatedTaxVo[j].december;
              }
              this.tableLJSJ = response.accumulatedTaxVo;
              this.totaldataAccumulatedTax = response.accumulatedTaxVo;
              this.listAccumulatedTax = 15;
              this.getList();
            }
            for (let j = 0; j < response.dutyfreeVo.length; j++) {
              let user = getUserInfo(response.dutyfreeVo[j].user_id);
              if (user) {
                response.dutyfreeVo[j].user_id = getUserInfo(
                  response.dutyfreeVo[j].user_id,
                ).userinfo.customername;
              }

              this.tableMS = response.dutyfreeVo;
              this.totaldataDutyfreeVo = response.dutyfreeVo;
              this.listDutyfreeVo = 14;
              this.getList();
            }
            for (let j = 0; j < response.comprehensiveVo.length; j++) {
              let user = getUserInfo(response.comprehensiveVo[j].user_id);
              if (user) {
                response.comprehensiveVo[j].user_id = getUserInfo(
                  response.comprehensiveVo[j].user_id,
                ).userinfo.customername;
              }

              this.tableZHSR = response.comprehensiveVo;
              this.totaldataZHSR = response.comprehensiveVo;
              this.ListZHSR = 11;
              this.getList();
            }

            this.loading = false;
          });
      },
      UploadUrlfjkc: function() {
        return (
          process.env.BASE_API +
          '/giving/importUseradditional?givingid=' +
          this.Giving
        );
      },
      UploadUrlothertwo: function() {
        return (
          process.env.BASE_API +
          '/giving/importUserothertwo?givingid=' +
          this.Giving
        );
      },
      UploadUrlotherfour: function() {
        return (
          process.env.BASE_API +
          '/giving/importUserotherfour?givingid=' +
          this.Giving
        );
      },
      UploadUrlotherfive: function() {
        return (
          process.env.BASE_API +
          '/giving/importUserotherfive?givingid=' +
          this.Giving
        );
      },
      UploadUrlappreciation: function() {
        return (
          process.env.BASE_API +
          '/giving/importUserappreciation?givingid=' +
          this.Giving
        );
      },
      handleSizeChangeYDSY(val) {
        this.listQueryListYDSY.limit = val;
        this.getList();
      },
      handleCurrentChangeYDSY(val) {
        this.listQueryListYDSY.page = val;
        this.getList();
      },
      handleSizeChangeZHSR(val) {
        this.listQueryListZHSR.limit = val;
        this.getList();
      },
      handleCurrentChangeZHSR(val) {
        this.listQueryListZHSR.page = val;
        this.getList();
      },
      handleSizeChangeZXKC(val) {
        this.listQueryListZXKC.limit = val;
        this.getList();
      },
      handleCurrentChangeZXKC(val) {
        this.listQueryListZXKC.page = val;
        this.getList();
      },
      handleSizeChangeFJKC(val) {
        this.listQueryListFJKC.limit = val;
        this.getList();
      },
      handleCurrentChangeFJKC(val) {
        this.listQueryListFJKC.page = val;
        this.getList();
      },
      handleSizeChangeMS(val) {
        this.listQueryListMS.limit = val;
        this.getList();
      },
      handleCurrentChangeMS(val) {
        this.listQueryListMS.page = val;
        this.getList();
      },
      handleSizeChangeLJSJ(val) {
        this.listQueryListLJSJ.limit = val;
        this.getList();
      },
      handleCurrentChangeLJSJ(val) {
        this.listQueryListKJSJ.page = val;
        this.getList();
      },
      handleSizeChangeGRDB(val) {
        this.listQueryListGRDB.limit = val;
        this.getList();
      },
      handleCurrentChangeGRDB(val) {
        this.listQueryListGRDB.page = val;
        this.getList();
      },
      handleSizeChangeQT1Woman(val) {
        this.listQueryListQT1Woman.limit = val;
        this.getList();
      },
      handleCurrentChangeQT1Woman(val) {
        this.listQueryListQT1Woman.page = val;
        this.getList();
      },
      handleSizeChangeQT2(val) {
        this.listQueryListQT2.limit = val;
        this.getList();
      },
      handleCurrentChangeQT2(val) {
        this.listQueryListQT2.page = val;
        this.getList();
      },
      handleSizeChangeQT4(val) {
        this.listQueryListQT4.limit = val;
        this.getList();
      },
      handleCurrentChangeQT4(val) {
        this.listQueryListQT4.page = val;
        this.getList();
      },
      handleSizeChangeQT5(val) {
        this.listQueryListQT5.limit = val;
        this.getList();
      },
      handleCurrentChangeQT5(val) {
        this.listQueryListQT5.page = val;
        this.getList();
      },
      handleSizeChangeQQ(val) {
        this.listQueryListQQ.limit = val;
        this.getList();
      },
      handleCurrentChangeQQ(val) {
        this.listQueryListQQ.page = val;
        this.getList();
      },
      handleSizeChangeCY(val) {
        this.listQueryListCY.limit = val;
        this.getList();
      },
      handleCurrentChangeCY(val) {
        this.listQueryListCY.page = val;
        this.getList();
      },
      handleSizeChangeQT1Man(val) {
        this.listQueryListQT1Man.limit = val;
        this.getList();
      },
      handleCurrentChangeQT1Man(val) {
        this.listQueryListQT1Man.page = val;
        this.getList();
      },
      handleSizeChangeJS(val) {
        this.listQueryListJS.limit = val;
        this.getList();
      },
      handleCurrentChangeJS(val) {
        this.listQueryListJS.page = val;
        this.getList();
      },
      handleSizeChangeimprot(val) {
        this.listQuery.limit = val;
        this.getListimprot();
      },
      handleCurrentChangeimprot(val) {
        this.listQuery.page = val;
        this.getListimprot();
      },
      getList() {
        this.loading = true;
        if (this.tab === '0') {
        }
        if (this.listBase === 1 || this.tab === '1') {
          let start = (this.listQueryListJS.page - 1) * this.listQueryListJS.limit;
          let end = this.listQueryListJS.page * this.listQueryListJS.limit;
          if (this.totaldataBase) {
            let pListBase = this.totaldataBase.slice(start, end);
            this.tableJS = pListBase;
            this.totalBase = this.totaldataBase.length;
          }
        }
        if (this.ListOtherOne === 2 || this.tab === '2') {
          if (this.totaldataOtherOneWoman || this.totaldataOtherOneMan) {
            if (this.ListOtherOneSex === 1) {
              let start = (this.listQueryListQT1Woman.page - 1) * this.listQueryListQT1Woman.limit;
              let end = this.listQueryListQT1Woman.page * this.listQueryListQT1Woman.limit;
              let pListWoman = this.totaldataOtherOneWoman.slice(start, end);
              this.tableQT1Woman = pListWoman;
              this.totalOtherOne = this.totaldataOtherOneWoman.length;
            } else if (this.ListOtherOneSex === 2) {
              let start = (this.listQueryListQT1Man.page - 1) * this.listQueryListQT1Man.limit;
              let end = this.listQueryListQT1Man.page * this.listQueryListQT1Man.limit;
              let pListMan = this.totaldataOtherOneMan.slice(start, end);
              this.tableQT1Man = pListMan;
              this.totalOtherOneMan = this.totaldataOtherOneMan.length;
            }
          }
        }
        if (this.ListQt2 === 3 || this.tab === '3') {
          let start = (this.listQueryListQT2.page - 1) * this.listQueryListQT2.limit;
          let end = this.listQueryListQT2.page * this.listQueryListQT2.limit;
          if (this.totaldataQT2) {
            let pListQT2 = this.totaldataQT2.slice(start, end);
            this.tableQT2 = pListQT2;
            this.totalQT2 = this.totaldataQT2.length;
          }
        }
        if (this.ListQT4 === 4 || this.tab === '4') {
          let start = (this.listQueryListQT4.page - 1) * this.listQueryListQT4.limit;
          let end = this.listQueryListQT4.page * this.listQueryListQT4.limit;
          if (this.totaldataQT4) {
            let pListQT4 = this.totaldataQT4.slice(start, end);
            this.tableQT4 = pListQT4;
            this.totalQT4 = this.totaldataQT4.length;
          }
        }
        if (this.ListQt5 === 5 || this.tab === '5') {
          let start = (this.listQueryListQT5.page - 1) * this.listQueryListQT5.limit;
          let end = this.listQueryListQT5.page * this.listQueryListQT5.limit;
          if (this.totaldataQT5) {
            let pListQT5 = this.totaldataQT5.slice(start, end);
            this.tableQT5 = pListQT5;
            this.totalQT5 = this.totaldataQT5.length;
          }
        }
        if (this.tab === '6') {
        }
        if (this.tab === '7') {
        }
        if (this.ListQQ === 8 || this.tab === '8') {
          let start = (this.listQueryListQQ.page - 1) * this.listQueryListQQ.limit;
          let end = this.listQueryListQQ.page * this.listQueryListQQ.limit;
          if (this.totaldataQQ) {
            let pListQQ = this.totaldataQQ.slice(start, end);
            this.tableQQ = pListQQ;
            this.totalQQ = this.totaldataQQ.length;
          }
        }
        if (this.ListCY === 9 || this.tab === '9') {
          let start = (this.listQueryListCY.page - 1) * this.listQueryListCY.limit;
          let end = this.listQueryListCY.page * this.listQueryListCY.limit;
          if (this.totaldataCY) {
            let pListCY = this.totaldataCY.slice(start, end);
            this.tableCY = pListCY;
            this.totalCY = this.totaldataCY.length;
          }
        }
        if (this.ListYDSY === 10 || this.tab === '10') {
          let start = (this.listQueryListYDSY.page - 1) * this.listQueryListYDSY.limit;
          let end = this.listQueryListYDSY.page * this.listQueryListYDSY.limit;
          if (this.totaldataYDSY) {
            let pListYDSY = this.totaldataYDSY.slice(start, end);
            this.tableYDSY = pListYDSY;
            this.totalYDSY = this.totaldataYDSY.length;
          }
        }
        if (this.ListZHSR === 11 || this.tab === '11') {
          let start = (this.listQueryListZHSR.page - 1) * this.listQueryListZHSR.limit;
          let end = this.listQueryListZHSR.page * this.listQueryListZHSR.limit;
          if (this.totaldataZHSR) {
            let pListZHSR = this.totaldataZHSR.slice(start, end);
            this.tableZHSR = pListZHSR;
            this.totalZHSR = this.totaldataZHSR.length;
          }
        }
        if ((this.ListZXKC = 12 || this.tab === '12')) {
          let start = (this.listQueryListZXKC.page - 1) * this.listQueryListZXKC.limit;
          let end = this.listQueryListZXKC.page * this.listQueryListZXKC.limit;
          if (this.totaldataZXKC) {
            let pListZXKC = this.totaldataZXKC.slice(start, end);
            this.tableZXKC = pListZXKC;
            this.totalZXKC = this.totaldataZXKC.length;
          }
        }
        if ((this.ListFJKC = 13 || this.tab === '13')) {
          let start = (this.listQueryListFJKC.page - 1) * this.listQueryListFJKC.limit;
          let end = this.listQueryListFJKC.page * this.listQueryListFJKC.limit;
          if (this.totaldataFJKC) {
            let pListFJKC = this.totaldataFJKC.slice(start, end);
            this.tableFJKC = pListFJKC;
            this.totalFJKC = this.totaldataFJKC.length;
          }
        }
        if (this.listDutyfreeVo === 14 || this.tab === '14') {
          let start = (this.listQueryListMS.page - 1) * this.listQueryListMS.limit;
          let end = this.listQueryListMS.page * this.listQueryListMS.limit;
          if (this.totaldataDutyfreeVo) {
            let pListDutyfreeVo = this.totaldataDutyfreeVo.slice(start, end);
            this.tableMS = pListDutyfreeVo;
            this.totalDutyfreeVo = this.totaldataDutyfreeVo.length;
          }
        }
        if (this.listAccumulatedTax === 15 || this.tab === '15') {
          let start = (this.listQueryListLJSJ.page - 1) * this.listQueryListLJSJ.limit;
          let end = this.listQueryListLJSJ.page * this.listQueryListLJSJ.limit;
          if (this.totaldataAccumulatedTax) {
            let pListAccumulatedTax = this.totaldataAccumulatedTax.slice(start, end);
            this.tableLJSJ = pListAccumulatedTax;
            this.totalAccumulatedTax = this.totaldataAccumulatedTax.length;
          }
        }
        if (this.listContrast === 16 || this.tab === '16') {
          let start = (this.listQueryListGRDB.page - 1) * this.listQueryListGRDB.limit;
          let end = this.listQueryListGRDB.page * this.listQueryListGRDB.limit;
          if (this.totaldataContrast) {
            let pListContrast = this.totaldataContrast.slice(start, end);
            this.tableGRDB = pListContrast;
            this.totalContrast = this.totaldataContrast.length;
          }
        }
        this.loading = false;
      },
      getListimprot() {
        this.loading = true;
        let start = (this.listQuery.page - 1) * this.listQuery.limit;
        let end = this.listQuery.page * this.listQuery.limit;
        if (this.totaldataimprot) {
          let pList = this.totaldataimprot.slice(start, end);
          this.message = pList;
          this.total = this.totaldataimprot.length;
        }
        this.loading = false;
      },
      handleClick(tab, event) {
        this.tab = tab.index;
        if (
          tab.index === '3' ||
          tab.index === '4' ||
          tab.index === '5' ||
          tab.index === '10' ||
          tab.index === '13'
        ) {
          this.buttonList[1].disabled = false;
        } else if (
          tab.index === '0' ||
          tab.index === '1' ||
          tab.index === '2' ||
          tab.index === '6' ||
          tab.index === '7' ||
          tab.index === '8' ||
          tab.index === '9' ||
          tab.index === '11' ||
          tab.index === '12' ||
          tab.index === '14' ||
          tab.index === '15' ||
          tab.index === '16'
        ) {
          this.buttonList[1].disabled = true;
        }
        if (tab.index === '16' || tab.index === '2' || tab.index === '3'  ) {
          this.buttonList[0].disabled = false;
        } else if (
          tab.index === '0' ||
          tab.index === '4' ||
          tab.index === '5' ||
          tab.index === '6' ||
          tab.index === '7' ||
          tab.index === '8' ||
          tab.index === '9' ||
          tab.index === '10' ||
          tab.index === '11' ||
          tab.index === '12' ||
          tab.index === '13' ||
          tab.index === '14' ||
          tab.index === '15' ||
          tab.index === '1'
        ) {
          this.buttonList[0].disabled = true;
        }
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS2005FORMVIEW_HJ');
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
            sums[index] += ' ';
          }
        });
        return sums;
      },
      handleChange(file, fileList) {
        this.clear(true);
      },
      handleSuccess(response, file, fileList) {
        if (response.code !== 0) {
          this.cuowu = response.message;
          if (this.tab === '3') {
            this.Messageothertwo = true;
          }
          if (this.tab === '4') {
            this.Messageotherfour = true;
          }
          if (this.tab === '5') {
            this.Messageotherfive = true;
          }
          if (this.tab === '10') {
            this.Messageappreciation = true;
          }
          if (this.tab === '13') {
            this.Messagefjkc = true;
          }
        } else {
          let datalist = [];
          for (let c = 0; c < response.data.length; c++) {
            let error = response.data[c];
            error = error.substring(0, 3);
            if (error === this.$t('label.PFANS2005FORMVIEW_SB')) {
              this.errorCount = response.data[c].substring(4);
              if (this.tab === '3') {
                this.resultShowothertwo = true;
              }
              if (this.tab === '4') {
                this.resultShowotherfour = true;
              }
              if (this.tab === '5') {
                this.resultShowotherfive = true;
              }
              if (this.tab === '10') {
                this.resultShowappreciation = true;
              }
              if (this.tab === '13') {
                this.resultShowfjkc = true;
              }
            }
            if (error === this.$t('label.PFANS2005FORMVIEW_CG')) {
              this.successCount = response.data[c].substring(4);
              if (this.tab === '3') {
                this.resultShowothertwo = true;
              }
              if (this.tab === '4') {
                this.resultShowotherfour = true;
              }
              if (this.tab === '5') {
                this.resultShowotherfive = true;
              }
              if (this.tab === '10') {
                this.resultShowappreciation = true;
              }
              if (this.tab === '13') {
                this.resultShowfjkc = true;
              }
            }
            if (error === this.$t('label.PFANS2017VIEW_D')) {
              let obj = {};
              var str = response.data[c];
              var aPos = str.indexOf(this.$t('label.PFANS2017VIEW_BAN'));
              var bPos = str.indexOf(this.$t('label.PFANS2017VIEW_DE'));
              var r = str.substr(aPos + 1, bPos - aPos - 1);
              obj.hang = r;
              obj.error = response.data[c].substring(6);
              datalist[c] = obj;
            }
            this.message = datalist;
            this.getListdata();
            this.totaldataimprot = this.message;
            this.getListimprot();
            if (this.errorCount === '0') {
              if (this.tab === '3') {
                this.resultothertwo = false;
              }
              if (this.tab === '4') {
                this.resultotherfour = false;
              }
              if (this.tab === '5') {
                this.resultotherfive = false;
              }
              if (this.tab === '10') {
                this.resultappreciation = false;
              }
              if (this.tab === '13') {
                this.resultfjkc = false;
              }
            } else {
              if (this.tab === '3') {
                this.resultothertwo = true;
              }
              if (this.tab === '4') {
                this.resultotherfour = true;
              }
              if (this.tab === '5') {
                this.resultotherfive = true;
              }
              if (this.tab === '10') {
                this.resultappreciation = true;
              }
              if (this.tab === '13') {
                this.resultfjkc = true;
              }
            }
          }
        }
      },
      clear(safe) {
        this.file = null;
        if (this.tab === '3') {
          this.resultothertwo = false;
          this.Messageothertwo = false;
          this.resultShowothertwo = false;
        }
        if (this.tab === '4') {
          this.resultotherfour = false;
          this.Messageotherfour = false;
          this.resultShowotherfour = false;
        }
        if (this.tab === '5') {
          this.resultotherfive = false;
          this.Messageotherfive = false;
          this.resultShowotherfive = false;
        }
        if (this.tab === '10') {
          this.resultappreciation = false;
          this.Messageappreciation = false;
          this.resultShowappreciation = false;
        }
        if (this.tab === '13') {
          this.resultfjkc = false;
          this.Messagefjkc = false;
          this.resultShowfjkc = false;
        }
        if (!safe) {
          this.$refs.uploader.clearFiles();
        }
      },
      getRowClass({row, column, rowIndex, columnIndex}) {
        if (column.level === 1 && columnIndex === 0) {
          return {
            color: 'white',
            background: '#ec8989',
            'border-top': '1px solid #ea5555',
            'border-bottom': '1px solid #ea5555',
            'border-right': '1px solid #ec8989',
          };
        }
        if (column.level === 2 && columnIndex >= 0 && columnIndex < 10) {
          return {
            color: 'white',
            background: '#ec8989',
            'border-bottom': '1px solid #ea5555',
            'border-right': '1px solid #ec8989',
          };
        }
        if (column.level === 1 && columnIndex === 1) {
          return {
            color: 'white',
            background: '#569df1',
            'border-top': '1px solid #005baa',
            'border-bottom': '1px solid #005baa',
            'border-right': '1px solid #569df1',
          };
        }
        if (column.level === 2 && columnIndex >= 10 && columnIndex < 21) {
          return {
            color: 'white',
            background: '#569df1',
            'border-bottom': '1px solid #005baa',
            'border-right': '1px solid #569df1',
          };
        }
        if (column.level === 1 && columnIndex === 2) {
          return {
            color: 'white',
            background: '#3dd1d6',
            'border-top': '1px solid #0499af',
            'border-bottom': '1px solid #0499af',
            'border-right': '1px solid #3dd1d6',
          };
        }
        if (column.level === 2 && columnIndex >= 21 && columnIndex < 35) {
          return {
            color: 'white',
            background: '#3dd1d6',
            'border-bottom': '1px solid #0499af',
            'border-right': '1px solid #3dd1d6',
          };
        }
        if (column.level === 1 && columnIndex === 3) {
          return {
            color: 'white',
            background: '#4c4040',
            'border-right': '1px solid #4c4040',
            'border-bottom': '1px solid #4c4040',
            'border-top': '1px solid #4c4040',
          };
        }
        if (column.level === 1 && columnIndex === 4) {
          return {
            color: 'white',
            background: '#4282c1',
            'border-top': '1px solid #005baa',
            'border-bottom': '1px solid #005baa',
            'border-right': '1px solid #4282c1',
          };
        }
        if (column.level === 2 && columnIndex >= 35 && columnIndex < 38) {
          return {
            color: 'white',
            background: '#4282c1',
            'border-right': '1px solid #4282c1',
            'border-bottom': '1px solid #005baa',
          };
        }
        if (column.level === 1 && columnIndex === 5) {
          return {
            color: 'white',
            background: '#4c4040',
            'border-right': '1px solid #4c4040',
            'border-bottom': '1px solid #4c4040',
            'border-top': '1px solid #4c4040',
          };
        }
        if (column.level === 1 && columnIndex === 6) {
          return {
            color: 'white',
            background: '#4282c1',
            'border-bottom': '1px solid #005baa',
            'border-right': '1px solid #4282c1',
          };
        }
        if (column.level === 2 && columnIndex >= 38 && columnIndex < 41) {
          return {color: 'white', background: '#4282c1', 'border-right': '1px solid #4282c1'};
        }
        if (column.level === 1 && columnIndex === 7) {
          return {color: 'white', background: '#4c4040'};
        }
        if (column.level === 1 && columnIndex === 8) {
          return {color: 'white', background: '#ec8989'};
        }
        if (column.level === 1 && columnIndex >= 9 && columnIndex < 15) {
          return {color: 'white', background: '#4c4040'};
        }
        if (column.level === 1 && columnIndex === 15) {
          return {
            color: 'white',
            background: '#4282c1',
            'border-bottom': '1px solid #005baa',
            'border-right': '1px solid #4282c1',
          };
        }
        if (column.level === 2 && columnIndex >= 41 && columnIndex < 44) {
          return {color: 'white', background: '#4282c1', 'border-right': '1px solid #4282c1'};
        }
        if (column.level === 1 && columnIndex >= 16 && columnIndex < 19) {
          return {color: 'white', background: '#4c4040'};
        }
        if (column.level === 1 && columnIndex === 20) {
          return {color: 'white', background: '#ec8989'};
        }
        if (column.level === 1 && (columnIndex === 19 || columnIndex === 21)) {
          return {color: 'white', background: '#4c4040'};
        }
        if (column.level === 1 && columnIndex === 22) {
          return {
            color: 'white',
            background: '#f5b038',
            'border-bottom': '1px solid #ecc40c',
            'border-right': '1px solid #f5b038',
            'border-right': '1px solid #f5b038',
          };
        }
        if (column.level === 2 && columnIndex >= 44 && columnIndex < 52) {
          return {
            color: 'white',
            background: '#f5b038',
            'border-right': '1px solid #f5b038',
            'border-bottom': '1px solid #ecc40c',
          };
        }
        if (column.level === 1 && columnIndex === 23) {
          return {color: 'white', background: '#ec8989'};
        }
        if (column.level === 1 && columnIndex >= 24 && columnIndex < 30) {
          return {color: 'white', background: '#4c4040'};
        }
      },
      buttonClick(val) {
        if (val === 'import') {
          if (this.tab === '3') {
            this.OTherTwo.giving_id = this.Giving;
            this.OTherTwo.type = '0';
            this.$store
              .dispatch('PFANS2005Store/deleteothertwo', {type: '1'})
              .then(response => {
                this.daoruothertwo = true;
              });
          }
          if (this.tab === '4') {
            this.$store
              .dispatch('PFANS2005Store/deleteotherfour', {
                giving_id: this.Giving,
              })
              .then(response => {
                this.daoruotherfour = true;
              });
          }
          if (this.tab === '5') {
            this.$store
              .dispatch('PFANS2005Store/deleteFive', {giving_id: this.Giving})
              .then(response => {
                this.daoruotherfive = true;
              });
          }
          if (this.tab === '10') {
            this.$store
              .dispatch('PFANS2005Store/deleteteappreciation', {
                giving_id: this.Giving,
              })
              .then(response => {
                this.daoruappreciation = true;
              });
          }
          if (this.tab === '13') {
            this.$store
              .dispatch('PFANS2005Store/deleteadditional', {
                giving_id: this.Giving,
              })
              .then(response => {
                this.daorufjkc = true;
              });
          }
        } else if (val === 'save') {
          this.loading = true;
          this.baseInfo = {};
          this.baseInfo.strFlg = this.tab;
          this.baseInfo.otherOne = [];
          this.baseInfo.contrast = [];
          this.baseInfo.otherTwo = [];
          if (this.tab === '2') {
            for (let i = 0; i < this.tableQT1Woman.length; i++) {
              this.baseInfo.otherOne.push({
                otherone_id: this.tableQT1Woman[i].otherone_id,
                basedata: this.tableQT1Woman[i].basedata,
              });
            }
          } else if (this.tab === '3') {
            for (let i = 0; i < this.tableQT2.length; i++) {
              this.baseInfo.otherTwo.push({
                othertwo_id: this.tableQT2[i].othertwo_id,
                rootknot: this.tableQT2[i].rootknot,
                giving_id: this.tableQT2[i].giving_id,
              });
            }
          } else if (this.tab === '16') {
            for (let i = 0; i < this.tableGRDB.length; i++) {
              this.baseInfo.contrast.push({
                contrast_id: this.tableGRDB[i].contrast_id,
                reason: this.tableGRDB[i].reason,
              });
            }
          }
          this.$store
            .dispatch('PFANS2005Store/save', this.baseInfo)
            .then(response => {
              this.data = response;
              this.loading = false;
              Message({
                message: this.$t('normal.success_02'),
                type: 'success',
                duration: 5 * 1000,
              });
              if (this.$store.getters.historyUrl) {
                this.$router.push(this.$store.getters.historyUrl);
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
        }
      },
    },
  };
</script>
<style scoped>
</style>
