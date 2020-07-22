<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading" >
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" style="padding-top: 25px">
          <el-form-item>
            <el-row>
              <div style="height: calc(100vh - 230px - 2rem);width: 100%">
                <plx-table-grid
                :datas="data"
                :element-loading-text="$t('normal.waiting')"
                header-cell-class-name="sub_bg_color_blue"
                header-row-class-name="height"
                :pagination-show="false"
                :height-change="false"
                highlight-current-row
                ref="eltable"
                stripe
                border
                use-virtual
                style="width: 100%"
                cell-class-name="row_height_left"
                :row-height="40"
              >
                <plx-table-column
                  prop="no"
                  :label="$t('label.PFANS2006VIEW_NO')"
                  width="50"
                  align="center"
                  fixed="left"
                >
                  <template slot-scope="scope">
                    <span style="color:blue">{{ scope.row.no }}</span>
                  </template>
                </plx-table-column>
                <plx-table-column
                  prop="department_id"
                  :label="$t('label.PFANS2006VIEW_CLUB')"
                  width="120"
                  align="center"
                  fixed="left"
                ></plx-table-column>
                <plx-table-column
                  prop="user_name"
                  :label="$t('label.PFANS2006VIEW_LASTNAME')"
                  width="120"
                  align="center"
                  fixed="left"
                ></plx-table-column>
                <plx-table-column
                  prop="workdate"
                  :label="$t('label.PFANS2006VIEW_JOINED')"
                  width="120"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="sex"
                  :label="$t('label.PFANS2006VIEW_SEX')"
                  width="70"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="onlychild"
                  :label="$t('label.PFANS2006VIEW_SINGLECHILD')"
                  width="120"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="type"
                  :label="$t('label.PFANS2006VIEW_ENTRYTYPE')"
                  width="130"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="bonus"
                  :label="$t('label.PFANS2006VIEW_SCHOLARSHIP')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="sociology"
                  :label="$t('label.PFANS2006VIEW_SOCIETY')"
                  width="160"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="registered"
                  :label="$t('label.PFANS2006VIEW_REGISTER')"
                  width="100"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="yanglaojs"
                  :label="$t('label.PFANS2005FORMVIEW_YANGLAOJS')"
                  width="220"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="shiyejs"
                  :label="$t('label.PFANS2005FORMVIEW_SHIYEJS')"
                  width="220"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="gongshangjs"
                  :label="$t('label.PFANS2005FORMVIEW_GONGSHANGJS')"
                  width="220"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="yiliaojs"
                  :label="$t('label.PFANS2005FORMVIEW_YILIAOJS')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="shengyujs"
                  :label="$t('label.PFANS2005FORMVIEW_SHENGYUJS')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="accumulation"
                  :label="$t('label.PFANS2005FORMVIEW_HOUSINGFUNDBASE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="lastmonthbasic"
                  :label="$t('label.PFANS2005FORMVIEW_LASTMONTHBASIC')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="lastmonthduty"
                  :label="$t('label.PFANS2005FORMVIEW_LASTMONTHDUTY')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="basethismonthbasic"
                  :label="$t('label.PFANS2005FORMVIEW_BASETHISMONTHBASIC')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthduty"
                  :label="$t('label.PFANS2005FORMVIEW_THISMONTHDUTY')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column prop="rnbasesalary" label="RN" width="150" align="center"></plx-table-column>
                <plx-table-column
                  prop="birthrest"
                  :label="$t('label.PFANS2005FORMVIEW_BIRTHDAYREST')"
                  width="200"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthbasicbasic"
                  :label="$t('label.PFANS2006VIEW_THISMONTHBASICBASIC')"
                  width="200"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthbasic"
                  :label="$t('label.PFANS2005FORMVIEW_MONTHLYPOSTALTEMPORARY')"
                  width="200"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="shortillness"
                  :label="$t('label.PFANS2005FORMVIEW_SHORTDURATIONTIME')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="longillness"
                  :label="$t('label.PFANS2005FORMVIEW_LONGDURATIONTIME')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="owediligence"
                  :label="$t('label.PFANS2005FORMVIEW_ABSENCETIME')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="owingcontrol"
                  :label="$t('label.PFANS2005FORMVIEW_ABSENCEOFWORK')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthbasicgei"
                  :label="$t('label.PFANS2006VIEW_THISMONTHBASICGEI')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthdutygei"
                  :label="$t('label.PFANS2006VIEW_THISMONTHDUTYGEI')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <!-- 一括补助基本 -->
                <plx-table-column
                  prop="ykbzjs"
                  :label="$t('label.PFANS2006VIEW_YKBZJB')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <!-- 一括补助 -->
                <plx-table-column
                  prop="ykbz"
                  :label="$t('label.PFANS2006VIEW_YKBZ')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="overtimesubsidy"
                  :label="$t('label.PFANS2006VIEW_KASUKE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <!-- 小计1(基本給+补助) -->
                <plx-table-column
                  prop="total1"
                  :label="$t('label.PFANS2006VIEW_SUBTOTAL1')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="other2"
                  :label="$t('label.PFANS2006VIEW_OTHER2')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="appreciation"
                  :label="$t('label.PFANS2006VIEW_MONTHLYBONUS')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="other3"
                  :label="$t('label.PFANS2006VIEW_OTHER3')"
                  width="150"
                  align="center"
                >
                  <!-- zqu start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.other3"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.other3,'other3')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- zqu end -->
                </plx-table-column>
                <plx-table-column
                  prop="total2"
                  :label="$t('label.PFANS2006VIEW_SUBTOTAL2')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.total2"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.total2,'total2')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <!-- </plx-table-column> -->

                <plx-table-column
                  prop="taxestotal"
                  :label="$t('label.PFANS2006VIEW_INDUSTRY')"
                  width="150"
                  align="center"
                ></plx-table-column>

                <!-- <plx-table-column :label="$t('label.PFANS2005FORMVIEW_MS')" align="center"> -->
                <plx-table-column
                  prop="heating"
                  :label="$t('label.PFANS2006VIEW_HEATING')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="onlychildmoney"
                  :label="$t('label.PFANS2006VIEW_OLONECHILD')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="total3"
                  :label="$t('label.PFANS2006VIEW_SUBTOTAL3')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <!-- </plx-table-column> -->

                <plx-table-column
                  prop="totalwages"
                  :label="$t('label.PFANS2006VIEW_ARSENAL')"
                  width="150"
                  align="center"
                ></plx-table-column>

                <!-- <plx-table-column :label="$t('label.PFANS2006VIEW_SECURITY')" align="center"> -->
                <plx-table-column
                  prop="endowmentinsurance"
                  :label="$t('label.PFANS2006VIEW_OLD')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.endowmentinsurance"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.endowmentinsurance,'endowmentinsurance')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <plx-table-column
                  prop="medicalinsurance"
                  :label="$t('label.PFANS2006VIEW_MEDICAL')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.medicalinsurance"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.medicalinsurance,'medicalinsurance')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <plx-table-column
                  prop="unemploymentinsurance"
                  :label="$t('label.PFANS2006VIEW_UNEMPLOYMENT')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.unemploymentinsurance"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.unemploymentinsurance,'unemploymentinsurance')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <!-- </plx-table-column> -->

                <plx-table-column
                  prop="socialinsurance"
                  :label="$t('label.PFANS2006VIEW_SOCIALSECURITY')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.socialinsurance"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.socialinsurance,'socialinsurance')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <!--                  <plx-table-column-->
                <!--                    prop="adjustment"-->
                <!--                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"-->
                <!--                    width="150"-->
                <!--                    align="center"-->
                <!--                  >-->
                <!--                    <template slot-scope="scope">-->
                <!--                      <el-input-number-->
                <!--                        v-model="scope.row.adjustment"-->
                <!--                        @change="wagesChange(scope.row,scope.row.no,scope.row.adjustment,'socialinsurance')"-->
                <!--                        controls-position="right"-->
                <!--                        :min="-10000000"-->
                <!--                        size="mini"-->
                <!--                        style="width:7rem"-->
                <!--                      ></el-input-number>-->
                <!--                    </template>-->
                <!--                  </plx-table-column>-->
                <plx-table-column
                  prop="accumulationfund"
                  :label="$t('label.PFANS2006VIEW_PUBLICMONEY')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.accumulationfund"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.accumulationfund,'accumulationfund')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <plx-table-column
                  prop="disciplinarycontrol"
                  :label="$t('label.PFANS2006VIEW_SECURITYMON')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="disciplinary_total"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="comprehensive_yearstotal12"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_ljynssdecs"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_0je"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_1je"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_0sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_1sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_2sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_3sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_4sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_5sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_6sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_0sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_1sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_2sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_3sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_4sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_5sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_6sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthterm"
                  :label="$t('label.PFANS2006VIEW_EXCLUSIVE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthadditional"
                  :label="$t('label.PFANS2006VIEW_ACCUMULATED')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthdutyfree"
                  :label="$t('label.PFANS2006VIEW_UNACCUMULATED')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="lastdutyfree"
                  :label="$t('label.PFANS2006VIEW_ANNUAL')"
                  width="150"
                  align="center"
                ></plx-table-column>

                <!-- <plx-table-column :label="$t('label.PFANS2006VIEW_ONLYTAX')" align="center"> -->
                <plx-table-column
                  prop="housingmoneys"
                  :label="$t('label.PFANS2006VIEW_RESIDENTIALTAX')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="other4"
                  :label="$t('label.PFANS2006VIEW_COMPANYBOSS')"
                  width="230"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.other4"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.other4,'other4')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <plx-table-column
                  prop="other5"
                  :label="$t('label.PFANS2006VIEW_OTHER5')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.other5"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.other5,'other5')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <!-- </plx-table-column> -->

                <plx-table-column
                  prop="shouldwages"
                  :label="$t('label.PFANS2006VIEW_RESPONSIBLE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="shouldcumulative"
                  :label="$t('label.PFANS2006VIEW_CUMULATIVE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="shouldpaytaxes"
                  :label="$t('label.PFANS2006VIEW_INCOME')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthadjustment"
                  :label="$t('label.PFANS2006VIEW_THISMONTH')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.thismonthadjustment"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.thismonthadjustment,'thismonthadjustment')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <plx-table-column
                  prop="realwages"
                  :label="$t('label.PFANS2006VIEW_ACTUAL')"
                  width="150"
                  align="center"
                ></plx-table-column>

                <!-- <plx-table-column
                  :label="$t('label.PFANS2005FORMVIEW_COMPANYSUPPORT')"
                  align="center"
                >-->
                <plx-table-column
                  prop="comendowmentinsurance"
                  :label="$t('label.PFANS2006VIEW_OLD')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.comendowmentinsurance"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.comendowmentinsurance,'comendowmentinsurance')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <plx-table-column
                  prop="commedicalinsurance"
                  :label="$t('label.PFANS2006VIEW_MEDICAL')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.commedicalinsurance"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.commedicalinsurance,'commedicalinsurance')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <plx-table-column
                  prop="comunemploymentinsurance"
                  :label="$t('label.PFANS2006VIEW_UNEMPLOYMENT')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.comunemploymentinsurance"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.comunemploymentinsurance,'comunemploymentinsurance')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <plx-table-column
                  prop="cominjuryinsurance"
                  :label="$t('label.PFANS2005FORMVIEW_EMPLOYMENTINJURYINSURANCE')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.cominjuryinsurance"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.cominjuryinsurance,'cominjuryinsurance')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <plx-table-column
                  prop="combirthinsurance"
                  :label="$t('label.PFANS2005FORMVIEW_COMBIRTHINSURANCE')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.combirthinsurance"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.combirthinsurance,'combirthinsurance')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <plx-table-column
                  prop="comheating"
                  :label="$t('label.PFANS2005FORMVIEW_HEATINGCOST')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="comaccumulationfund"
                  :label="$t('label.PFANS2005FORMVIEW_HOUSINGPROVIDENTFUND')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.comaccumulationfund"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.comaccumulationfund,'comaccumulationfund')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <plx-table-column
                  prop="total"
                  :label="$t('label.PFANS2005FORMVIEW_TOTAL')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.total"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.total,'total')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
                <!-- </plx-table-column> -->

                <!--                  <plx-table-column-->
                <!--                    prop="totaladjustment"-->
                <!--                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"-->
                <!--                    width="150"-->
                <!--                    align="center"-->
                <!--                  >-->
                <!--                    <template slot-scope="scope">-->
                <!--                      <el-input-number-->
                <!--                        v-model="scope.row.totaladjustment"-->
                <!--                        @change="wagesChange(scope.row,scope.row.no,scope.row.totaladjustment,'total')"-->
                <!--                        controls-position="right"-->
                <!--                        :min="-10000000"-->
                <!--                        size="mini"-->
                <!--                        style="width:7rem"-->
                <!--                      ></el-input-number>-->
                <!--                    </template>-->
                <!--                  </plx-table-column>-->
                <plx-table-column
                  prop="labourunionbase"
                  :label="$t('label.PFANS2005FORMVIEW_LABORUNIONFUNDBASE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="labourunionfunds"
                  :label="$t('label.PFANS2009VIEW_INDUSTRIALPARTY')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="comtotalwages"
                  :label="$t('label.PFANS2005FORMVIEW_TOTALWAGES')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="njjy"
                  :label="$t('label.PFANS2005FORMVIEW_NJJY')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="bonusmoney"
                  :label="$t('label.PFANS2005FORMVIEW_GAUGE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="totalbonus"
                  :label="$t('label.PFANS2005FORMVIEW_TOTALGAUGE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="other6"
                  :label="$t('label.PFANS2005FORMVIEW_OTHER6')"
                  width="150"
                  align="center"
                >
                  <!-- gbb 0720 工资计算画面调整项目添加 start -->
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.other6"
                      @change="wagesChange(scope.row,scope.row.no,scope.row.other6,'totalbonus')"
                      controls-position="right"
                      :min="-10000000"
                      size="mini"
                      style="width:7rem"
                    ></el-input-number>
                  </template>
                  <!-- gbb 0720 工资计算画面调整项目添加 end -->
                </plx-table-column>
              </plx-table-grid>
              </div>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getUserInfo,getCurrentRolegongzijisuan} from '@/utils/customize';

  export default {
    name: 'PFANS2034View',
    components: {
      EasyNormalContainer,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2034VIEW',
        data: [],
        buttonList: [],
      };
    },
    methods: {
      getWagesByResign() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2005Store/getWagesByResign', {user_id: this.$route.params.userid})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              let user = getUserInfo(response[i].user_id);
              if (user) {
                  response[i].user_name = user.userinfo.customername;
                  response[i].department_id = user.userinfo.budgetunit;
              }
              if(i === 0){
                  response[i].no = this.$t("label.PFANS2034VIEW_ESTIMATE")
              }
              else{
                  response[i].no = this.$t("label.PFANS2006VIEW_ACTUAL")
              }
              if (this.$i18n) {
                  response[i].sex = response[i].sex === "PR019001" ? this.$t("label.PFANS2002FORMVIEW_BOY") : this.$t("label.PFANS2002FORMVIEW_GRIL");
                  response[i].onlychild = response[i].onlychild === "1" ? this.$t("label.yes") : "-";
                  response[i].type =
                      response[i].type === "1"
                          ? "入職"
                          : response[i].type === "2"
                          ? "女産休"
                          : response[i].type === "4"
                              ? "退職"
                              : "-";
                  response[i].bonus = response[i].bonus === "2" ? this.$t("label.PFANSUSERFORMVIEW_OLDSTAFF") : this.$t("label.PFANSUSERFORMVIEW_NEWSTAFF");
                  response[i].sociology = response[i].sociology === "1" ? this.$t("label.yes") : "-";
                  response[i].registered = response[i].registered === "1" ? this.$t("label.yes") : "-";
              }
            }
            this.data = response;
            this.loading = false;
          });
      },
      wagesChange(row, noId, val, prop) {
            //其他3
            if (prop === 'other3') {
                //纳税工资总额(小计1+2)
                row.total2 = Math.round((Number(row.total2) + Number(val)) * 100) / 100;
                //纳税工资总额(小计1+2)
                row.taxestotal = Math.round((Number(row.total1) + Number(val)) * 100) / 100;
                //工资总额(纳税+免税)
                row.totalwages = Math.round((Number(row.taxestotal) + Number(row.total3)) * 100) / 100;
                //当月応発工資（工资总额(纳税+免税)+只納税）
                //@DYYKGZ := round( ( @工资总额(纳税+免税) + @住房公积金应纳税金额 + @其他4 + @其他5 ), 2 ) AS SHOULDWAGES,#当月応発工資（工资总额(纳税+免税)+只納税）
                row.shouldwages = Math.round((Number(row.totalwages) + Number(row.housingmoneys) + Number(row.other4) + Number(row.other5)) * 100) / 100;
                //累計応発工資（当月含）
                //@YEARSTOTAL12 := round(base.COMPREHENSIVE_YEARSTOTAL12 + @DYYKGZ,2) AS SHOULDCUMULATIVE,#累計応発工資（当月含）
                row.shouldcumulative = Math.round((Number(row.comprehensive_yearstotal12)+ Number(row.shouldwages)) * 100) / 100;
                //累計应纳税所得额
                let thismonthterm = Number(row.thismonthterm) + Number(row.thismonthadditional) + Number(row.thismonthdutyfree)
                let newdate = new Date();
                //入社日
                let workdate = new Date(row.workdate);
                if(newdate.getFullYear() === workdate.getFullYear()){
                    row.shouldpaytaxes = Math.round((Number(row.shouldcumulative) - Number(row.dic_ljynssdecs) * ( newdate.getMonth() - 1- workdate.getMonth() + 1 ) - thismonthterm) * 100) / 100;
                }
                else{
                    row.shouldpaytaxes = Math.round((Number(row.shouldcumulative) - Number(row.dic_ljynssdecs) * ( newdate.getMonth() - 1 ) - thismonthterm) * 100) / 100;
                }
                //本月应扣缴所得税
                row.shouldpaytaxes = "0";//xx
            }
            //小计2
            if (prop === 'total2') {
                //纳税工资总额(小计1+2)
                row.taxestotal = Math.round((Number(row.total1) + Number(val)) * 100) / 100;
                //工资总额(纳税+免税)
                row.totalwages = Math.round((Number(row.taxestotal) + Number(row.total3)) * 100) / 100;
                //当月応発工資（工资总额(纳税+免税)+只納税）
                //@DYYKGZ := round( ( @工资总额(纳税+免税) + @住房公积金应纳税金额 + @其他4 + @其他5 ), 2 ) AS SHOULDWAGES,#当月応発工資（工资总额(纳税+免税)+只納税）
                row.shouldwages = Math.round((Number(row.totalwages) + Number(row.housingmoneys) + Number(row.other4) + Number(row.other5)) * 100) / 100;
                //累計応発工資（当月含）
                //@YEARSTOTAL12 := round(base.COMPREHENSIVE_YEARSTOTAL12 + @DYYKGZ,2) AS SHOULDCUMULATIVE,#累計応発工資（当月含）
                row.shouldcumulative = Math.round((Number(row.comprehensive_yearstotal12)+ Number(row.shouldwages)) * 100) / 100;
                //累計应纳税所得额
                let thismonthterm = Number(row.thismonthterm) + Number(row.thismonthadditional) + Number(row.thismonthdutyfree)
                let newdate = new Date();
                //入社日
                let workdate = new Date(row.workdate);
                if(newdate.getFullYear() === workdate.getFullYear()){
                    row.shouldpaytaxes = Math.round((Number(row.shouldcumulative) - Number(row.dic_ljynssdecs) * ( newdate.getMonth() - 1- workdate.getMonth() + 1 ) - thismonthterm) * 100) / 100;
                }
                else{
                    row.shouldpaytaxes = Math.round((Number(row.shouldcumulative) - Number(row.dic_ljynssdecs) * ( newdate.getMonth() - 1 ) - thismonthterm) * 100) / 100;
                }
                //本月应扣缴所得税
                row.shouldpaytaxes = "0";//xx
            }
            //养老保险
            if (prop === 'endowmentinsurance') {
                //个人社会保险(専項控除)
                row.socialinsurance = Math.round((Number(val) + Number(row.medicalinsurance) + Number(row.unemploymentinsurance)) * 100) / 100;
                //个人社会保险费+公积金(専項控除)合计
                row.disciplinarycontrol = Math.round((Number(row.socialinsurance) + Number(row.accumulationfund)) * 100) / 100;
                //専項控除累計（当月まで）
                row.thismonthterm = Math.round((Number(row.disciplinary_total) + Number(row.disciplinarycontrol)) * 100) / 100;
                //累計应纳税所得额xx
                row.shouldpaytaxes = "0";
                //本月应扣缴所得税
                row.thismonthadjustment = "0";
                //当月实发工资
                row.realwages = Math.round((Number(row.totalwages) - Number(row.disciplinarycontrol) - Number(row.thismonthadjustment)) * 100) / 100;
            }
            //社保各个分项（个人）
            //医疗保险
            if (prop === 'medicalinsurance') {
                //个人社会保险(専項控除)
                row.socialinsurance = Math.round((Number(row.endowmentinsurance) + Number(val) + Number(row.unemploymentinsurance)) * 100) / 100;
                //个人社会保险费+公积金(専項控除)合计
                row.disciplinarycontrol = Math.round((Number(row.socialinsurance) + Number(row.accumulationfund)) * 100) / 100;
                //専項控除累計（当月まで）
                row.thismonthterm = Math.round((Number(row.disciplinary_total) + Number(row.disciplinarycontrol)) * 100) / 100;
                //累計应纳税所得额xx
                row.shouldpaytaxes = "0";
                //本月应扣缴所得税
                row.thismonthadjustment = "0";
                //当月实发工资
                row.realwages = Math.round((Number(row.totalwages) - Number(row.disciplinarycontrol) - Number(row.thismonthadjustment)) * 100) / 100;
            }
            //失业保险
            if (prop === 'unemploymentinsurance') {
                //个人社会保险(専項控除)
                row.socialinsurance = Math.round((Number(row.endowmentinsurance) + Number(row.medicalinsurance) + Number(val)) * 100) / 100;
                //个人社会保险费+公积金(専項控除)合计
                row.disciplinarycontrol = Math.round((Number(row.socialinsurance) + Number(row.accumulationfund)) * 100) / 100;
                //専項控除累計（当月まで）
                row.thismonthterm = Math.round((Number(row.disciplinary_total) + Number(row.disciplinarycontrol)) * 100) / 100;
                //累計应纳税所得额xx
                row.shouldpaytaxes = "0";
                //本月应扣缴所得税
                row.thismonthadjustment = "0";
                //当月实发工资
                row.realwages = Math.round((Number(row.totalwages) - Number(row.disciplinarycontrol) - Number(row.thismonthadjustment)) * 100) / 100;
            }
            //个人社会保险（专项控除）
            if (prop === 'socialinsurance') {
                //个人社会保险费+公积金(専項控除)合计
                row.disciplinarycontrol = Math.round((Number(val) + Number(row.accumulationfund)) * 100) / 100;
                //専項控除累計（当月まで）
                row.thismonthterm = Math.round((Number(row.disciplinary_total) + Number(row.disciplinarycontrol)) * 100) / 100;
                //累計应纳税所得额xx
                row.shouldpaytaxes = "0";
                //本月应扣缴所得税
                row.thismonthadjustment = "0";
                //当月实发工资
                row.realwages = Math.round((Number(row.totalwages) - Number(row.disciplinarycontrol) - Number(row.thismonthadjustment)) * 100) / 100;
            }
            //个人社会保险（专项控除）
            if (prop === 'accumulationfund') {
                //个人社会保险费+公积金(専項控除)合计
                row.disciplinarycontrol = Math.round((Number(row.socialinsurance) + Number(val)) * 100) / 100;
                //専項控除累計（当月まで）
                row.thismonthterm = Math.round((Number(row.disciplinary_total) + Number(row.disciplinarycontrol)) * 100) / 100;
                //累計应纳税所得额xx
                row.shouldpaytaxes = "0";
                //本月应扣缴所得税
                row.thismonthadjustment = "0";
                //当月实发工资
                row.realwages = Math.round((Number(row.totalwages) - Number(row.disciplinarycontrol) - Number(row.thismonthadjustment)) * 100) / 100;
            }
            //本月应扣缴所得税ok
            if (prop === 'thismonthadjustment') {
                //当月实发工资
                row.realwages = Math.round((Number(row.totalwages) - Number(row.disciplinarycontrol) - Number(val)) * 100) / 100;
            }
            //社保各个分项（企业）
            //养老保险ok
            if (prop === 'comendowmentinsurance') {
                //公司担负保险总计
                row.total = Math.round((Number(val) + Number(row.commedicalinsurance) + Number(row.comunemploymentinsurance)
                    + Number(row.cominjuryinsurance) + Number(row.combirthinsurance) + Number(row.comheating) + Number(row.comaccumulationfund)) * 100) / 100;
                //工资总额(纳税+免税)+福祉+公司負担+工会経費总计
                row.comtotalwages = Math.round((Number(row.totalwages) + Number(row.other4) + Number(row.other5) + Number(row.total) + Number(row.labourunionfunds)) * 100) / 100;
                //总计+計上奨金
                if (new Date().getMonth() + 1 === 4) {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.njjy) + Number(row.bonusmoney)) * 100) / 100;
                } else {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.bonusmoney)) * 100) / 100;
                }
            }
            //医疗保险ok
            if (prop === 'commedicalinsurance') {
                //公司担负保险总计
                row.total = Math.round((Number(row.comendowmentinsurance) + Number(val) + Number(row.comunemploymentinsurance)
                    + Number(row.cominjuryinsurance) + Number(row.combirthinsurance) + Number(row.comheating) + Number(row.comaccumulationfund)) * 100) / 100;
                //工资总额(纳税+免税)+福祉+公司負担+工会経費总计
                row.comtotalwages = Math.round((Number(row.totalwages) + Number(row.other4) + Number(row.other5) + Number(row.total) + Number(row.labourunionfunds)) * 100) / 100;
                //总计+計上奨金
                if (new Date().getMonth() + 1 === 4) {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.njjy) + Number(row.bonusmoney)) * 100) / 100;
                } else {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.bonusmoney)) * 100) / 100;
                }
            }
            //失业保险ok
            if (prop === 'comunemploymentinsurance') {
                //公司担负保险总计
                row.total = Math.round((Number(row.comendowmentinsurance) + Number(row.commedicalinsurance) + Number(val)
                    + Number(row.cominjuryinsurance) + Number(row.combirthinsurance) + Number(row.comheating) + Number(row.comaccumulationfund)) * 100) / 100;
                //工资总额(纳税+免税)+福祉+公司負担+工会経費总计
                row.comtotalwages = Math.round((Number(row.totalwages) + Number(row.other4) + Number(row.other5) + Number(row.total) + Number(row.labourunionfunds)) * 100) / 100;
                //总计+計上奨金
                if (new Date().getMonth() + 1 === 4) {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.njjy) + Number(row.bonusmoney)) * 100) / 100;
                } else {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.bonusmoney)) * 100) / 100;
                }
            }
            //工伤保险ok
            if (prop === 'cominjuryinsurance') {
                //公司担负保险总计
                row.total = Math.round((Number(row.comendowmentinsurance) + Number(row.commedicalinsurance) + Number(row.comunemploymentinsurance)
                    + Number(val) + Number(row.combirthinsurance) + Number(row.comheating) + Number(row.comaccumulationfund)) * 100) / 100;
                //工资总额(纳税+免税)+福祉+公司負担+工会経費总计
                row.comtotalwages = Math.round((Number(row.totalwages) + Number(row.other4) + Number(row.other5) + Number(row.total) + Number(row.labourunionfunds)) * 100) / 100;
                //总计+計上奨金
                if (new Date().getMonth() + 1 === 4) {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.njjy) + Number(row.bonusmoney)) * 100) / 100;
                } else {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.bonusmoney)) * 100) / 100;
                }
            }
            //生育保险ok
            if (prop === 'combirthinsurance') {
                //公司担负保险总计
                row.total = Math.round((Number(row.comendowmentinsurance) + Number(row.commedicalinsurance) + Number(row.comunemploymentinsurance)
                    + Number(row.cominjuryinsurance) + Number(val) + Number(row.comheating) + Number(row.comaccumulationfund)) * 100) / 100;
                //工资总额(纳税+免税)+福祉+公司負担+工会経費总计
                row.comtotalwages = Math.round((Number(row.totalwages) + Number(row.other4) + Number(row.other5) + Number(row.total) + Number(row.labourunionfunds)) * 100) / 100;
                //总计+計上奨金
                if (new Date().getMonth() + 1 === 4) {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.njjy) + Number(row.bonusmoney)) * 100) / 100;
                } else {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.bonusmoney)) * 100) / 100;
                }
            }
            //公积金ok
            if (prop === 'comaccumulationfund') {
                //公司担负保险总计
                row.total = Math.round((Number(row.comendowmentinsurance) + Number(row.commedicalinsurance) + Number(row.comunemploymentinsurance)
                    + Number(row.cominjuryinsurance) + Number(row.combirthinsurance) + Number(row.comheating) + Number(val)) * 100) / 100;
                //工资总额(纳税+免税)+福祉+公司負担+工会経費总计
                row.comtotalwages = Math.round((Number(row.totalwages) + Number(row.other4) + Number(row.other5) + Number(row.total) + Number(row.labourunionfunds)) * 100) / 100;
                //总计+計上奨金
                if (new Date().getMonth() + 1 === 4) {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.njjy) + Number(row.bonusmoney)) * 100) / 100;
                } else {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.bonusmoney)) * 100) / 100;
                }
            }
            //公司担负保险总计ok
            if (prop === 'total') {
                //@GZFZFDZJ := ROUND( ( 工资总额(纳税+免税) + @其他4 + @其他5 + @公司担负保险总计 + @工会经费 ), 2 ) AS COMTOTALWAGES,#工资总额(纳税+免税)+福祉+公司負担+工会経費总计
                //工资总额(纳税+免税)+福祉+公司負担+工会経費总计
                row.comtotalwages = Math.round((Number(row.totalwages) + Number(row.other4) + Number(row.other5) + Number(val) + Number(row.labourunionfunds)) * 100) / 100;
                //总计+計上奨金
                if (new Date().getMonth() + 1 === 4) {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.njjy) + Number(row.bonusmoney)) * 100) / 100;
                } else {
                    row.totalbonus = Math.round((Number(row.comtotalwages) + Number(row.bonusmoney)) * 100) / 100;
                }
            }
            ///OTHER4
            if (prop === 'other4') {
                //当月応発工資（工资总额(纳税+免税)+只納税）
                //@DYYKGZ := round( ( @工资总额(纳税+免税) + @住房公积金应纳税金额 + @其他4 + @其他5 ), 2 ) AS SHOULDWAGES,
                row.shouldwages = Math.round((Number(row.totalwages) + Number(row.housingmoneys) + Number(val) + Number(row.other5)) * 100) / 100;

            }
            //OTHER5
            if (prop === 'other5') {
                //当月応発工資（工资总额(纳税+免税)+只納税）
                row.shouldwages = Math.round((Number(row.totalwages) + Number(row.housingmoneys) + Number(row.other4) + Number(val)) * 100) / 100;

            }
            //总计+记上奖金ok
            if (prop === 'totalbonus') {

            }
            // this.data.forEach((item, index) => {
            //   if (item.no === noId) {
            //     this.wagesChangeSwitch(item, prop, val);
            //   }
            // });
        },
      buttonClick(val) {

      }
    },
    mounted() {
      this.getWagesByResign();
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .row_height_left {
    font-size: 0.75rem;
    padding: 0px;
    text-align: left;
    background-color: transparent !important;
  }
</style>
