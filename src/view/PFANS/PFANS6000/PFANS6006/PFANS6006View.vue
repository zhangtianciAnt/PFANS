<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :noback="true" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="reff" style="padding-top: 10px">
          <el-form-item>
            <el-row style="margin-top: 20px">
              <div align="right">
                <el-col :span="12">
                    <el-date-picker
                      :placeholder="$t('normal.error_09')"
                      @change="yearChange"
                      format="yyyy"
                      type="year"
                      v-model="year">
                    </el-date-picker>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="group_id" style="width: 20vw"
                               @change="changeGroup">
                      <el-option
                        v-for="item in optionsdata"
                        :key="item.value"
                        :label="item.lable"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-input :placeholder="$t('label.PFANS6006VIEW_BPINFO')"  style="width: 20vw"
                              v-model="filterName">
                      <el-button slot="append" icon="el-icon-search" type="primary" plain @click="inputChange"></el-button>
                    </el-input>
                </el-col>
              </div>
            </el-row>
            <!--insert gbb 20210223 PSDCD_PFANS_20201117_XQ_011 外协委托信息添加【总额税金】和【税率】 start-->
            <el-row style="margin-top: 20px">
              <plx-table-grid :datas="taxdata" border
                              header-cell-class-name="sub_bg_color_blue"
                              use-virtual :pagination-show="paginationShow"
                              style="width: 100%;" :row-height="rowheight">
                <!--4月-->
                <plx-table-column
                  :label="$t('label.April')"
                  align="center">
                <plx-table-column
                  :label="$t('label.taxtotal')"
                  align="center"
                  width="130"
                  prop="april">
                  <template slot-scope="scope">
                    <el-input-number
                      size="mini"
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      :step="0.01"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.april">
                    </el-input-number>
                  </template>
                </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.apriltax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--5月-->
                <plx-table-column
                  :label="$t('label.May')"
                  align="center">
                  <plx-table-column
                    :label="$t('label.taxtotal')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.may">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.maytax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--6月-->
                <plx-table-column
                  :label="$t('label.June')"
                  align="center">
                  <plx-table-column
                    :label="$t('label.taxtotal')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.june">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.junetax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--7月-->
                <plx-table-column
                  :label="$t('label.July')"
                  align="center">
                  <plx-table-column
                    :label="$t('label.taxtotal')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.july">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.julytax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--8月-->
                <plx-table-column
                  :label="$t('label.August')"
                  align="center">
                  <plx-table-column
                    :label="$t('label.taxtotal')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.august">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.augusttax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--9月-->
                <plx-table-column
                  :label="$t('label.September')"
                  align="center">
                  <plx-table-column
                    :label="$t('label.taxtotal')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.september">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.septembertax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--10月-->
                <plx-table-column
                  :label="$t('label.October')"
                  align="center">
                  <plx-table-column
                    :label="$t('label.taxtotal')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.october">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.octobertax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--11月-->
                <plx-table-column
                  :label="$t('label.November')"
                  align="center">
                  <plx-table-column
                    :label="$t('label.taxtotal')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.november">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.novembertax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--12月-->
                <plx-table-column
                  :label="$t('label.December')"
                  align="center">
                  <plx-table-column
                    :label="$t('label.taxtotal')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.december">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.decembertax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--1月-->
                <plx-table-column
                  :label="$t('label.January')"
                  align="center">
                  <plx-table-column
                    :label="$t('label.taxtotal')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.january">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.januarytax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--2月-->
                <plx-table-column
                  :label="$t('label.February')"
                  align="center">
                  <plx-table-column
                    :label="$t('label.taxtotal')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.february">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.februarytax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--3月-->
                <plx-table-column
                  :label="$t('label.March')"
                  align="center">
                  <plx-table-column
                    :label="$t('label.taxtotal')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.march">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <plx-table-column
                    :label="$t('label.tax')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.marchtax">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                </plx-table-column>
              </plx-table-grid>
            </el-row>
            <el-row style="margin-top: 180px">
            <!--insert gbb 20210223 PSDCD_PFANS_20201117_XQ_011 外协委托信息添加【总额税金】和【税率】 end-->
              <plx-table-grid :datas="tableData" :header-cell-style="getRowClass" border
                        header-cell-class-name="sub_bg_color_blue" stripe height="400" header-row-class-name="height"
                              use-virtual :pagination-show="paginationShow" big-data-checkbox highlight-current-row
                              style="width: 100%;height: calc(100vh - 200px - 2rem)" cell-class-name = "row_height_left" :row-height="rowheight"
                        @selection-change="handleSelectionChange" @row-click="handleRowClick">

                <plx-table-column
                  type="selection"
                  width="40"
                  fixed="left">
                </plx-table-column>

                <!-- 序号-->
                <plx-table-column
                  :label="'NO'"
                  align="center"
                  type="index"
                  width="50"
                  fixed="left">
                </plx-table-column>

                <!--              第一组-->
                <!--              基本情报-->
                <plx-table-column
                  :label="$t('label.PFANS2023FORMVIEW_INTELLIGENCE')"
                  align="center">
                  <!--                pj名-->
<!--                  <plx-table-column-->
<!--                    :label="$t('label.PFANS6007VIEW_PJNAME')"-->
<!--                    prop="project_name"-->
<!--                    align="center"-->
<!--                    fixed="left"-->
<!--                    width="120">-->
<!--                  </plx-table-column>-->
<!--                  &lt;!&ndash;                窓口&ndash;&gt;-->
<!--                  <plx-table-column-->
<!--                    :label="$t('label.PFANS6007VIEW_PSDCDWINDOW')"-->
<!--                    align="center"-->
<!--                    prop="managerid"-->
<!--                    fixed="left"-->
<!--                    width="80">-->
<!--                  </plx-table-column>-->
                  <!--                BP会社名-->
                  <plx-table-column
                    sortable
                    :label="$t('label.PFANS6007VIEW_BPCLUBNAME')"
                    align="left"
                    prop="suppliername"
                    fixed="left"
                    width="170">
                  </plx-table-column>
                  <!--                BP名前-->
                  <plx-table-column
                    :label="$t('label.PFANS5001FORMVIEW_BPNAME')"
                    align="center"
                    prop="expname"
                    fixed="left"
                    width="80">
                  </plx-table-column>
                  <!--                入场时间-->
<!--                  <plx-table-column-->
<!--                    :label="$t('label.PFANS6004FORMVIEW_ADMISSIONTIME')"-->
<!--                    align="center"-->
<!--                    prop="admissiontime"-->
<!--                    width="90">-->
<!--                  </plx-table-column>-->
<!--                  &lt;!&ndash;                退场时间&ndash;&gt;-->
<!--                  <plx-table-column-->
<!--                    :label="$t('label.PFANS6004FORMVIEW_EXITIME')"-->
<!--                    align="center"-->
<!--                    prop="exittime"-->
<!--                    width="90">-->
<!--                  </plx-table-column>-->
                  <!--                作業形態-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_OPERATIONFORM')"
                    align="center"
                    prop="operationform"
                    fixed="left"
                    width="90">
                  </plx-table-column>
                  <!--                作業分類-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_JOBCLASSIFICATIONM')"
                    align="center"
                    prop="jobclassification"
                    fixed="left"
                    width="90">
                  </plx-table-column>
                  <!--                配賦対象-->
<!--                  <plx-table-column-->
<!--                    :label="$t('label.PFANS6005VIEW_PFDX')"-->
<!--                    align="center"-->
<!--                    width="120">-->
<!--                    <template slot-scope="scope">-->
<!--                      <el-input-->
<!--                        :disabled="!disabled"-->
<!--                        :no="scope.row"-->
<!--                        style="width: 100%"-->
<!--                        v-model="scope.row.distriobjects">-->
<!--                      </el-input>-->
<!--                    </template>-->
<!--                  </plx-table-column>-->
<!--                  &lt;!&ndash;                構内対象&ndash;&gt;-->
<!--                  <plx-table-column-->
<!--                    :label="$t('label.PFANS6005VIEW_SNDX')"-->
<!--                    align="center"-->
<!--                    width="120">-->
<!--                    <template slot-scope="scope">-->
<!--                      <el-input-->
<!--                        :disabled="!disabled"-->
<!--                        :no="scope.row"-->
<!--                        style="width: 100%"-->
<!--                        v-model="scope.row.venuetarget">-->
<!--                      </el-input>-->
<!--                    </template>-->
<!--                  </plx-table-column>-->
                </plx-table-column>
                <!--              第二组-->
                <!--              工数-->
                <plx-table-column
                  :label="$t('label.PFANS6008VIEW_MANHOUR')"
                  align="center">
                  <!--四月-->
                  <plx-table-column
                    :label="$t('label.April')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(4)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.april">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--五月-->
                  <plx-table-column
                    :label="$t('label.May')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(5)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.may">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--六月-->
                  <plx-table-column
                    :label="$t('label.June')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(6)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.june">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--七月-->
                  <plx-table-column
                    :label="$t('label.July')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(7)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.july">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--八月-->
                  <plx-table-column
                    :label="$t('label.August')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(8)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.august">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--九月-->
                  <plx-table-column
                    :label="$t('label.September')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(9)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.september">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--十月-->
                  <plx-table-column
                    :label="$t('label.October')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(10)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.october">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--十一月-->
                  <plx-table-column
                    :label="$t('label.November')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(11)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.november">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--十二月-->
                  <plx-table-column
                    :label="$t('label.December')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(12)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.december">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--一月-->
                  <plx-table-column
                    :label="$t('label.January')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(1)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.january">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--二月-->
                  <plx-table-column
                    :label="$t('label.February')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(2)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.february">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--三月-->
                  <plx-table-column
                    :label="$t('label.March')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="disabledfunc(3)"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.march">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--勤続月数-->
<!--                  <plx-table-column-->
<!--                    :label="$t('label.PFANS6005VIEW_KQYS')"-->
<!--                    align="center"-->
<!--                    width="80">-->
<!--                    <template slot-scope="scope">-->
<!--                      <el-input-->
<!--                        size="mini"-->
<!--                        :disabled="!disabled"-->
<!--                        :no="scope.row"-->
<!--                        style="width: 100%"-->
<!--                        v-model="scope.row.monthlength">-->
<!--                      </el-input>-->
<!--                    </template>-->
<!--                  </plx-table-column>-->
                  <!--備考-->
                  <plx-table-column
                    :label="$t('label.PFANS6007VIEW_REMARKS')"
                    align="center"
                    width="200">
                    <template slot-scope="scope">
                      <el-input
                        size="mini"
                        :disabled="false"
                        :rows="1"
                        style="width: 10vw"
                        type="textarea"
                        v-model="scope.row.remarks">
                      </el-input>
                    </template>
                  </plx-table-column>
                </plx-table-column>
                <!--              第三组-->
                <!--              退场情报-->
                <plx-table-column
                  :label="$t('label.PFANS6004VIEW_EXINTELLIGENCE')"
                  align="center">
                  <!--                所有情报-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_ALLTECHNOLOGY')"
                    align="center"
                    prop="alltechnology"
                    width="120">
                  </plx-table-column>
                  <!--                現場評価-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_SITEVALUATION')"
                    align="center"
                    prop="sitevaluation"
                    width="120">
                  </plx-table-column>
                  <!--                退場理由-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_EXITREASON')"
                    align="center"
                    prop="exitreason"
                    width="120">
                  </plx-table-column>
                  <!--                業務影響-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_BUSINESSIMPACT')"
                    align="center"
                    prop="businessimpact"
                    width="120">
                  </plx-table-column>
                  <!--                対策-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_COUNTERMEASURE')"
                    align="center"
                    prop="countermeasure"
                    width="120">
                  </plx-table-column>
                </plx-table-column>
              </plx-table-grid>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import moment from "moment";
  import {Message} from 'element-ui';
  import user from "../../../components/user.vue";
  import {getCurrentRoleNew,getOrgInfo,getDictionaryInfo,getCooperinterviewListByAccount} from '../../../../utils/customize';

  export default {
    name: "PFANS6006View",
    components: {
      EasyNormalContainer,
      user,
    },
    data() {
      return {
        rowheight:40,
        nowm: Number(moment(new Date()).format("M")) === 1 ? 12 : Number(moment(new Date()).format("M")) - 1,
        nowd: Number(moment(new Date()).format("D")),
        paginationShow:false,
        loading: false,
        buttonList: [],
        baseInfo: {},
        scope: '',
        filterName: "",
        responseDataInit: [],
        year: moment(new Date()).format('MM') < 4 ? moment(new Date()).add(-1, 'y').format("YYYY") : moment(new Date()).format('YYYY'),
        group_id:'',
        row: '',
        tableData: [{
          delegainformation_id: '',
          companyprojects_id:'',
          projectsystem_id:'',
          supplierinfor_id:'',
          project_name: '',
          group_id: '',
          account: '',
          managerid: '',
          expname: '',
          suppliername: '',
          admissiontime: '',
          exittime: '',
          operationform: '',
          jobclassification: '',
          distriobjects: '',
          venuetarget: '',
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
          monthlength: '',
          remarks: '',
          alltechnology: '',
          sitevaluation: '',
          exitreason: '',
          businessimpact: '',
          countermeasure: '',
          year: '',
        }],
        data: [],
        dictionary:'',
        multipleSelection: [],
        userlist: "",
        title: 'title.PFANS6006VIEW_TITLE',
        disabled: false,
        disable: true,
        //insert gbb 20210223 PSDCD_PFANS_20201117_XQ_011 外协委托信息添加【总额税金】和【税率】 start
        taxdata:[],
        multiple: false,
        //insert gbb 20210223 PSDCD_PFANS_20201117_XQ_011 外协委托信息添加【总额税金】和【税率】 end
        buttonList: [
          {
            'key': 'save',
            'name': 'button.save',
            'disabled': false,
          },
            {
                'key': 'createfree',
                'name': 'button.createfree',
                'disabled': false,
            },
        ],
        optionsdata: [],
      };
    },
    methods: {
      inputChange(){
        if (this.filterName === "") {
          this.tableData = this.responseDataInit;
        } else {
          this.tableData = this.responseDataInit.filter(item => {
            return item.suppliername.toLowerCase().indexOf(this.filterName) != -1
              || item.expname.toLowerCase().indexOf(this.filterName) != -1  ;
          });
        }
      },
      getList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6006Store/getYears', {'year': this.year,'group_id': this.group_id})
          .then(response => {
            let tabledate = [];
            //insert gbb 20210223 PSDCD_PFANS_20201117_XQ_011 外协委托信息添加【总额税金】和【税率】 start
            let responsex = response.delegainformationVo;
            for (let j = 0; j < responsex.length; j++) {
              let arr = [
                  responsex[j].april,
                  responsex[j].may,
                  responsex[j].june,
                  responsex[j].july,
                  responsex[j].august,
                  responsex[j].september,
                  responsex[j].october,
                  responsex[j].november,
                  responsex[j].december,
                  responsex[j].january,
                  responsex[j].february,
                  responsex[j].march
              ];
              var h = 0;
              for (let i = 0; i < arr.length; i++) {
                  if (arr[i] != null && arr[i] != "0.00" && arr[i] != "0") {
                      h++;
                  }
              }
              responsex[j].monthlength = h;
              let exp = getCooperinterviewListByAccount(responsex[j].account);
              if (exp)
              {
                responsex[j].exittime = exp.exitime;
              }
              tabledate.push({
                  delegainformation_id: responsex[j].delegainformation_id,
                  companyprojects_id: responsex[j].companyprojects_id,
                  projectsystem_id: responsex[j].projectsystem_id,
                  supplierinfor_id: responsex[j].supplierinfor_id,
                  project_name: responsex[j].project_name,
                  group_id: responsex[j].group_id,
                  account: responsex[j].account,
                  managerid: responsex[j].managerid,
                  expname: responsex[j].expname,
                  suppliername: responsex[j].suppliername,
                  admissiontime: responsex[j].admissiontime,
                  exittime: responsex[j].exittime,
                  operationform: responsex[j].operationform,
                  jobclassification: responsex[j].jobclassification,
                  distriobjects: responsex[j].distriobjects,
                  venuetarget: responsex[j].venuetarget,
                  january: responsex[j].january,
                  february: responsex[j].february,
                  march: responsex[j].march,
                  april: responsex[j].april,
                  may: responsex[j].may,
                  june: responsex[j].june,
                  july: responsex[j].july,
                  august: responsex[j].august,
                  september: responsex[j].september,
                  october: responsex[j].october,
                  november: responsex[j].november,
                  december: responsex[j].december,
                  monthlength: responsex[j].monthlength,
                  remarks: responsex[j].remarks,
                  alltechnology: responsex[j].alltechnology,
                  sitevaluation: responsex[j].sitevaluation,
                  exitreason: responsex[j].exitreason,
                  businessimpact:responsex[j].businessimpact,
                  countermeasure: responsex[j].countermeasure,
                  year: responsex[j].year,
              })
            }
            if(response.delegainformationtaxList != null){
                this.taxdata = response.delegainformationtaxList;
            }
            else{
                this.taxdata = [{
                    delegainformationtax_id: '',
                    year: this.year,
                    group_id: this.group_id,
                    april: '',
                    apriltax: '',
                    may: '',
                    maytax: '',
                    june: '',
                    junetax: '',
                    july: '',
                    julytax: '',
                    august: '',
                    augusttax: '',
                    september: '',
                    septembertax: '',
                    october: '',
                    octobertax: '',
                    november: '',
                    novembertax: '',
                    december: '',
                    decembertax: '',
                    january: '',
                    januarytax: '',
                    february: '',
                    februarytax: '',
                    march: '',
                    marchtax: '',
                }]
            }
            //insert gbb 20210223 PSDCD_PFANS_20201117_XQ_011 外协委托信息添加【总额税金】和【税率】 end
            this.multipleSelection = [];
            this.responseDataInit = tabledate;
            this.tableData = tabledate;
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
          })
      },
      getById() {
            this.loading = true;
            //update gbb 20210331 2021组织架构变更-group下拉变为center下拉 start
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
                this.group_id = this.$store.getters.userinfo.userinfo.centerid;
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
                this.optionsdata = vote1;
            }
            else
            {
                this.optionsdata = vote;
            }
            //去重
            let letoptionsdata = [];
            let arrId = [];
            for(var item of this.optionsdata){
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
        if(incfmyList.length > 0) {
          for (let item of incfmyList) {
            letoptionsdata = letoptionsdata.filter(letitem => letitem.value != item)
          }
          let orgInfo = [];
          for (let item of incfmyList) {
            if (item) {
              if (getOrgInfo(item).orgs.length != 0) {
                orgInfo.push(getOrgInfo(item).orgs)
              }
            }
          }
          let groInfo = orgInfo[0].filter(item => item.type == '2');
          for (let item of groInfo) {
            letoptionsdata.push(
              {
                value: item._id,
                lable: item.title,
              },
            );
          }
        }
        //针对经营管理统计到group修改 end
            this.optionsdata = letoptionsdata;
            if(this.optionsdata.length > 0){
                this.group_id = this.optionsdata[0].value;
            }
            //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 end
            this.loading = false;
        },
      changeGroup(val) {
            this.group_id = val;
            if (this.group_id) {
                this.getList();
            }
        },
      handleRowClick(row) {
         //row.type='1'
      },
      yearChange(value) {
        this.year = moment(value).format('YYYY');
        this.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      disabledfunc(item){
          if(item === this.nowm){
              if(this.nowd <= this.dictionary){
                  return false;
              }
              else{
                  return true;
              }
          }
          else{
              return true;
          }
      },
      buttonClick(val) {
          if (val === 'save') {
              if (this.multipleSelection.length === 0) {
                  Message({
                      message: this.$t('normal.info_01'),
                      type: 'info',
                      duration: 2 * 1000
                  });
                  return;
              }
          //insert gbb 20210223 PSDCD_PFANS_20201117_XQ_011 外协委托信息添加【总额税金】和【税率】 start
          this.taxdata[0].group_id = this.group_id;
          this.taxdata[0].year = this.year;
          let vo = {
              delegainformationList: this.multipleSelection,
              delegainformationtaxList: this.taxdata,
          };
          //insert gbb 20210223 PSDCD_PFANS_20201117_XQ_011 外协委托信息添加【总额税金】和【税率】 end
          this.loading = true;
          this.$store
          //insert gbb 20210223 PSDCD_PFANS_20201117_XQ_011 外协委托信息添加【总额税金】和【税率】 start
          //.dispatch('PFANS6006Store/updateDeleginformation', this.multipleSelection)
              .dispatch('PFANS6006Store/updateDeleginformation', vo)
            //insert gbb 20210223 PSDCD_PFANS_20201117_XQ_011 外协委托信息添加【总额税金】和【税率】 end
            .then(response => {
              this.data = response;
              this.multipleSelection = [];
              this.loading = false;
              Message({
                message: this.$t("normal.success_02"),
                type: "success",
                duration: 5 * 1000
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
          //add_fjl_0727  添加生成费用统计功能  start
          if (val === 'createfree') {
              let groupid = '';
              this.loading = true;
              if (this.group_id) {
                  groupid = this.group_id;
              }
            // ADD CCM 20210330 费用统计添加年度筛选 fr
            let yearnomal = '';
            if (this.year)
            {
              yearnomal = moment(this.year).format('YYYY');
            }
            // ADD CCM 20210330 费用统计添加年度筛选 to
              let params = {
                  groupid: groupid,
                // ADD CCM 20210330 费用统计添加年度筛选 fr
                year:yearnomal
                // ADD CCM 20210330 费用统计添加年度筛选 to
              }
              this.$store
                  .dispatch('PFANS6008Store/insertCoststatistics', params)
                  .then(response => {
                      Message({
                          message: this.$t("normal.success_04"),
                          type: "success",
                          duration: 5 * 1000
                      });
                      this.loading = false;
                  })
                  .catch(error => {
                      this.loading = false;
                  })
                  .catch(error => {
                      Message({
                          message: error,
                          type: 'error',
                          duration: 5 * 1000
                      });
                      this.loading = false;
                  })
          }
          //add_fjl_0727  添加生成费用统计功能  end
      },
      getRowClass({row, column, rowIndex, columnIndex}) {
        // if (column.level === 2 && columnIndex >= 0 && columnIndex < 6) {
        //   return {
        //     color: 'white',
        //     background: '#99CCFF !important',
        //     border: '1px solid white',
        //   };
        // }
        if (column.level === 2 && columnIndex >= 6 && columnIndex < 19) {
          return {
            color: 'white',
            background: '#99CC99 !important',
            border: '1px solid white',
          };
        }
        // if (column.level === 2 && columnIndex >= 22 && columnIndex < 29) {
        //   return {
        //     color: 'white',
        //     background: '#99CCFF',
        //     border: '1px solid white',
        //   };
        // }
        if (column.level === 1 && columnIndex >= 0 && columnIndex < 23) {
          return {
            color: 'white',
            background: '#005BAA !important',
            border: '1px solid white',
          };
        }
      },
      //add-退场人员信息背景色
      rowClassName({row, rowIndex}) {
        if (row.exittime !==null && row.exittime !=='' && row.exittime !==undefined)
        {
          if (moment(new Date()).format('YYYY-MM') >= moment(row.exittime).add(2, 'months').format('YYYY-MM'))
          {
            return "sub_bg_color_Darkgrey";
          }
        }
      },
      //add-退场人员信息背景色
    },
    mounted() {
      this.getById();
      this.getList();
      if(getDictionaryInfo('BP026001')){
          this.dictionary = Number(getDictionaryInfo('BP026001').value1);
      }
    },
  }
</script>

<style lang="scss">
  .row_height_left {
    font-size: 0.75rem;
    padding: 0px;
    text-align: left;
    background-color: transparent !important;
  }
  .el-table /deep/ .current-row{
    background-color: #BDD8EE;
  }
</style>
