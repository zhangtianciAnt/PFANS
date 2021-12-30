<template>
  <EasyNormalContainer
    v-loading="loading"
    :buttonList="buttonList"
    :title="title"
    ref="container"
    @buttonClick="buttonClick"
    :noback="true"
  >
    <div slot="customize">
      <el-form :model="formData" label-position="top" label-width="8vw" employedref="form" ref="form"
               style="padding: 0.5vw">
        <el-row style="padding-top: 3%">
          <el-col :span="6">
            <el-form-item :label="$t('label.PFANS5016VIEW_YEARS')">
              <el-date-picker
                :placeholder="$t('normal.error_09')"
                @change="changeDate"
                type="month"
                v-model="formData.saveDate"
                style="width:10vw">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" prop="group_id">
              <el-select v-model="formData.deptId" style="width: 20vw"
                         @change="groupChange">
                <el-option
                  v-for="item in grpOptions"
                  :key="item.groupid"
                  :label="item.groupname"
                  :value="item.groupid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 0.5%" ref="container">
          <el-table :data="tableData" border default-expand-all header-cell-class-name="sub_bg_color_blue"
                    style="margin-top: 1%;font-size: 13px"
                    row-key="wai_id" height="650"
                    highlight-current-row>
            <el-table-column
              fixed="left"
              show-overflow-tooltip
              :label="$t('label.PFANS1050FORMVIEW_THEMENAME')"
              width="160">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.themeinforId"
                  size="mini"
                  v-if="scope.row.newLine"
                  filterable
                  default-first-option
                  @change="selectChange(scope.row)"
                  :placeholder="$t('label.PFANS1053THEMENAME')">
                  <el-option
                    v-for="item in themeOptions"
                    :key="item.themeinforId"
                    :label="item.themeName"
                    :value="item.themeinforId">
                  </el-option>
                </el-select>
                <span v-else style="text-align: center;display:block;">{{ scope.row.themeName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="left"
              show-overflow-tooltip
              :label="$t('label.PFANS1053_CUSTOMER_NAME')"
              width="160">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.customerName" :placeholder="$t('label.PFANS1053CUSTOMERNAME')"
                          v-if="scope.row.newLine"></el-input>
                <span v-else style="text-align: center;display:block;">{{ scope.row.customerName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS2027VIEW_CATEGORY')"
              width="80">
              <template slot-scope="scope">
                <span style="text-align: center;display:block;">收入</span>
              </template>
            </el-table-column>
            <!--4月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_APRIL')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="aprilPlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(4)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.aprilActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(4)
                    v-model.trim="scope.row.aprilForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.aprilActual || scope.row.aprilForecast) - scope.row.aprilPlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--5月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_MAY')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="mayPlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(5)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.mayActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(5)
                    v-model.trim="scope.row.mayForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.mayActual || scope.row.mayForecast) - scope.row.mayPlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--6月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_JUNE')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="junePlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(6)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.juneActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(6)
                    v-model.trim="scope.row.juneForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.juneActual || scope.row.juneForecast) - scope.row.junePlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--1Q-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1036FORMVIEW_1Q')"
              width="300">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ Number(scope.row.aprilPlan) + Number(scope.row.mayPlan) + Number(scope.row.junePlan) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.aprilActual || scope.row.aprilForecast) +
                    Number(scope.row.mayActual || scope.row.mayForecast) +
                    Number(scope.row.juneActual || scope.row.juneForecast)
                  }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.aprilActual || scope.row.aprilForecast) +
                    Number(scope.row.mayActual || scope.row.mayForecast) +
                    Number(scope.row.juneActual || scope.row.juneForecast) - scope.row.aprilPlan - scope.row.mayPlan -
                    scope.row.junePlan
                  }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--7月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_JULY')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="julyPlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(7)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.julyActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(7)
                    v-model.trim="scope.row.julyForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.julyActual || scope.row.julyForecast) - scope.row.julyPlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--8月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_AUGUST')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="augustPlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(8)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.augustActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(8)
                    v-model.trim="scope.row.augustForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.augustActual || scope.row.augustForecast) - scope.row.augustPlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--9月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_SEPTEMBER')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="septemberPlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(9)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.septemberActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(9)
                    v-model.trim="scope.row.septemberForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.septemberActual || scope.row.septemberForecast) - scope.row.septemberPlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--2Q-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1036FORMVIEW_2Q')"
              width="300">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ Number(scope.row.julyPlan) + Number(scope.row.augustPlan) + Number(scope.row.septemberPlan) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.julyActual || scope.row.julyForecast) +
                    Number(scope.row.augustActual || scope.row.augustForecast) +
                    Number(scope.row.septemberActual || scope.row.septemberForecast)
                  }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.julyActual || scope.row.julyForecast) +
                    Number(scope.row.augustActual || scope.row.augustForecast) +
                    Number(scope.row.septemberActual || scope.row.septemberForecast) - scope.row.julyPlan -
                    scope.row.augustPlan - scope.row.septemberPlan
                  }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--半年-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1053_HALF_YEAR')"
              width="300">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.aprilPlan) + Number(scope.row.mayPlan) + Number(scope.row.junePlan) +
                    Number(scope.row.julyPlan) + Number(scope.row.augustPlan) + Number(scope.row.septemberPlan)
                  }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.aprilActual || scope.row.aprilForecast) +
                    Number(scope.row.mayActual || scope.row.mayForecast) +
                    Number(scope.row.juneActual || scope.row.juneForecast) +
                    Number(scope.row.julyActual || scope.row.julyForecast) +
                    Number(scope.row.augustActual || scope.row.augustForecast) +
                    Number(scope.row.septemberActual || scope.row.septemberForecast)
                  }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.aprilActual || scope.row.aprilForecast) +
                    Number(scope.row.mayActual || scope.row.mayForecast) +
                    Number(scope.row.juneActual || scope.row.juneForecast) - scope.row.aprilPlan - scope.row.mayPlan -
                    scope.row.junePlan + (Number(scope.row.julyActual || scope.row.julyForecast) +
                      Number(scope.row.augustActual || scope.row.augustForecast) +
                      Number(scope.row.septemberActual || scope.row.septemberForecast) - scope.row.julyPlan -
                      scope.row.augustPlan - scope.row.septemberPlan)
                  }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--10月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_OCTOBER')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="octoberPlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(10)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.octoberActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(10)
                    v-model.trim="scope.row.octoberForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.octoberActual || scope.row.octoberForecast) - scope.row.octoberPlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--11月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_NOVEMBER')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="novemberPlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(11)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.novemberActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(11)
                    v-model.trim="scope.row.novemberForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.novemberActual || scope.row.novemberForecast) - scope.row.novemberPlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--12月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_DECEMBER')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="decemberPlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(12)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.decemberActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(12)
                    v-model.trim="scope.row.decemberForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.decemberActual || scope.row.decemberForecast) - scope.row.decemberPlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--3Q-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1036FORMVIEW_3Q')"
              width="300">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ Number(scope.row.octoberPlan) + Number(scope.row.novemberPlan) + Number(scope.row.decemberPlan) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.octoberActual || scope.row.octoberForecast) +
                    Number(scope.row.novemberActual || scope.row.novemberForecast) +
                    Number(scope.row.decemberActual || scope.row.decemberForecast)
                  }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.octoberActual || scope.row.octoberForecast) +
                    Number(scope.row.novemberActual || scope.row.novemberForecast) +
                    Number(scope.row.decemberActual || scope.row.decemberForecast) - scope.row.octoberPlan -
                    scope.row.novemberPlan - scope.row.decemberPlan
                  }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--1月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_JANUARY')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="januaryPlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(1)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.januaryActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(1)
                    v-model.trim="scope.row.januaryForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.januaryActual || scope.row.januaryForecast) - scope.row.januaryPlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--2月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_FEBRUARY')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="februaryPlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(2)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.februaryActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(2)
                    v-model.trim="scope.row.februaryForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.februaryActual || scope.row.februaryForecast) - scope.row.februaryPlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--3月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS6011VIEW_MARCH')"
              width="370">
              <el-table-column
                show-overflow-tooltip
                prop="marchPlan"
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100"
                v-if="judge(3)">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">{{ scope.row.marchActual }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054SEETHROUGH')"
                width="170"
                v-else>
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    :disabled = ableOrNot(3)
                    v-model.trim="scope.row.marchForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ (scope.row.marchActual || scope.row.marchForecast) - scope.row.marchPlan }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--4Q-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1036FORMVIEW_4Q')"
              width="300">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{ Number(scope.row.januaryPlan) + Number(scope.row.februaryPlan) + Number(scope.row.marchPlan) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.januaryActual || scope.row.januaryForecast) +
                    Number(scope.row.februaryActual || scope.row.februaryForecast) +
                    Number(scope.row.marchActual || scope.row.marchForecast)
                  }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.januaryActual || scope.row.januaryForecast) +
                    Number(scope.row.februaryActual || scope.row.februaryForecast) +
                    Number(scope.row.marchActual || scope.row.marchForecast) - scope.row.januaryPlan -
                    scope.row.februaryPlan - scope.row.marchPlan
                  }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <!--年间-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1039FORMVIEW_YEARTOTAL')"
              width="300">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_PLAN')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.aprilPlan) + Number(scope.row.mayPlan) + Number(scope.row.junePlan) +
                    Number(scope.row.julyPlan) + Number(scope.row.augustPlan) + Number(scope.row.septemberPlan) +
                    (Number(scope.row.octoberPlan) + Number(scope.row.novemberPlan) + Number(scope.row.decemberPlan)) +
                    (Number(scope.row.januaryPlan) + Number(scope.row.februaryPlan) + Number(scope.row.marchPlan))
                  }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.aprilActual || scope.row.aprilForecast) +
                    Number(scope.row.mayActual || scope.row.mayForecast) +
                    Number(scope.row.juneActual || scope.row.juneForecast) +
                    Number(scope.row.julyActual || scope.row.julyForecast) +
                    Number(scope.row.augustActual || scope.row.augustForecast) +
                    Number(scope.row.septemberActual || scope.row.septemberForecast) +
                    (Number(scope.row.octoberActual || scope.row.octoberForecast) +
                      Number(scope.row.novemberActual || scope.row.novemberForecast) +
                      Number(scope.row.decemberActual || scope.row.decemberForecast)) +
                    (Number(scope.row.januaryActual || scope.row.januaryForecast) +
                      Number(scope.row.februaryActual || scope.row.februaryForecast) +
                      Number(scope.row.marchActual || scope.row.marchForecast))
                  }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  <span style="text-align: center;display:block;">
                  {{
                    Number(scope.row.aprilActual || scope.row.aprilForecast) +
                    Number(scope.row.mayActual || scope.row.mayForecast) +
                    Number(scope.row.juneActual || scope.row.juneForecast) - scope.row.aprilPlan - scope.row.mayPlan -
                    scope.row.junePlan + (Number(scope.row.julyActual || scope.row.julyForecast) +
                      Number(scope.row.augustActual || scope.row.augustForecast) +
                      Number(scope.row.septemberActual || scope.row.septemberForecast) - scope.row.julyPlan -
                      scope.row.augustPlan - scope.row.septemberPlan) +
                    (Number(scope.row.octoberActual || scope.row.octoberForecast) +
                      Number(scope.row.novemberActual || scope.row.novemberForecast) +
                      Number(scope.row.decemberActual || scope.row.decemberForecast) - scope.row.octoberPlan -
                      scope.row.novemberPlan - scope.row.decemberPlan) +
                    (Number(scope.row.januaryActual || scope.row.januaryForecast) +
                      Number(scope.row.februaryActual || scope.row.februaryForecast) +
                      Number(scope.row.marchActual || scope.row.marchForecast) - scope.row.januaryPlan -
                      scope.row.februaryPlan - scope.row.marchPlan)
                  }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              fixed="right"
              :label="$t('label.operation')"
              width="140">
              <template slot-scope="scope">
                <el-popconfirm :title="$t('label.PFANS1053CONFIRM')" @onConfirm="handleDelClick(scope.$index)">
                  <el-button slot="reference" type="danger" plain size="small" :disabled= "!scope.row.newLine">{{ $t('button.delete') }}</el-button>
                </el-popconfirm>
                <el-button @click="handleNewClick()" type="primary" plain size="small">{{
                    $t('button.insert')
                  }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import moment from 'moment';
import {getCurrentRoleNew, getDictionaryInfo, getOrgInfo} from '../../../../utils/customize';

export default {
  name: 'PFANS1053View',
  components: {
    EasyNormalContainer,
  },
  data() {
    return {
      title: 'title.PFANS1053VIEW',
      loading: false,
      themeOptions: [],
      buttonList: [
        {'key': 'save', 'name': 'button.save', 'disabled': false, icon: 'el-icon-check'},
      ],
      formData: {
        saveDate: moment(),
        deptId: '',
      },
      // 见通填写截止日
      deadlineDate: '',
      grpOptions: [],
      tableData: [],
    };
  },
  methods: {
    // 保存年月变更
    changeDate() {
      this.tableData = [];
      this.getData();
    },
    // 部门变更
    groupChange() {
      this.tableData = [];
      this.getData();
    },
    // 查询
    getData() {
      this.loading = true;
      this.$store.dispatch('PFANS1053Store/getInfo', this.formData)
      .then(response => {
        this.tableData = response.length === 0 ? [Object.assign({}, this.newLine)] : response;
        console.log('this.tableData', this.tableData)
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
    // 获取部门列表
    getOrgList() {
      return new Promise((resolve, reject) => {
        let role = getCurrentRoleNew();
        const vote = [];
        if (role === '3') {//CENTER
          vote.push(
            {
              groupid: this.$store.getters.userinfo.userinfo.centerid,
              groupname: this.$store.getters.userinfo.userinfo.centername,
            },
          );
          //add ccm 0112 兼职部门
          if (this.$store.getters.userinfo.userinfo.otherorgs) {
            for (let others of this.$store.getters.userinfo.userinfo.otherorgs) {
              if (others.centerid) {
                this.$store.getters.orgGroupList.filter((item) => {
                  if (item.centerid === others.centerid) {
                    vote.push(
                      {
                        groupid: item.centerid,
                        groupname: item.centername,
                      },
                    );
                  }
                });
              }
            }
          }
          //add ccm 0112 兼职部门
        } else if (role === '2') {//副总经理
          this.$store.getters.orgGroupList.filter((item) => {
            if (item.virtualuser === this.$store.getters.userinfo.userid) {
              vote.push(
                {
                  groupid: item.centerid,
                  groupname: item.centername,
                },
              );
            }
          });
          //add ccm 0112 兼职部门
          if (this.$store.getters.userinfo.userinfo.otherorgs) {
            for (let others of this.$store.getters.userinfo.userinfo.otherorgs) {
              if (others.centerid) {
                this.$store.getters.orgGroupList.filter((item) => {
                  if (item.centerid === others.centerid) {
                    vote.push(
                      {
                        groupid: item.centerid,
                        groupname: item.centername,
                      },
                    );
                  }
                });
              }
            }
          }
          //add ccm 0112 兼职部门
        } else if (role === '4') //GM
        {
          let centers = getOrgInfo(this.$store.getters.userinfo.userinfo.centerid);
          if (centers) {
            if (centers.encoding === null || centers.encoding === '' || centers.encoding === undefined) {
              vote.push(
                {
                  groupid: this.$store.getters.userinfo.userinfo.groupid,
                  groupname: this.$store.getters.userinfo.userinfo.groupname,
                },
              );
            }
          }
        }
        const vote1 = [];
        if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
          || this.$store.getters.roles.indexOf('11') !== -1 //总经理
          || this.$store.getters.roles.indexOf('16') !== -1 //财务部长
          || this.$store.getters.roles.indexOf('18') !== -1) //企划部长部长
        {
          this.$store.getters.orgGroupList.filter((item) => {
            vote1.push(
              {
                groupid: item.centerid,
                groupname: item.centername,
              },
            );
          });
          this.grpOptions = vote1;
        } else {
          this.grpOptions = vote;
        }
        //去重
        let letoptionsdata = [];
        let arrId = [];
        for (let item of this.grpOptions) {
          if (arrId.indexOf(item['groupname']) === -1) {
            arrId.push(item['groupname']);
            letoptionsdata.push(item);
          }
        }
        //针对经营管理统计到group修改 start
        let incfmyList = [];
        for (let item of letoptionsdata) {
          if (getOrgInfo(item.groupid).encoding === '') {
            incfmyList.push(item.groupid);
          }
        }
        if (incfmyList.length > 0) {
          for (let item of incfmyList) {
            letoptionsdata = letoptionsdata.filter(letitem => letitem.groupid !== item);
          }
          let orgInfo = [];
          for (let item of incfmyList) {
            if (item) {
              if (getOrgInfo(item).orgs.length !== 0) {
                orgInfo.push(getOrgInfo(item).orgs);
              }
            }
          }
          let groInfo = orgInfo[0].filter(item => item.type === '2');
          for (let item of groInfo) {
            letoptionsdata.push(
              {
                groupid: item._id,
                groupname: item.title,
              },
            );
          }
        }
        //针对经营管理统计到group修改 end
        this.grpOptions = letoptionsdata;
        if (this.grpOptions.length > 0) {
          this.formData.deptId = this.grpOptions[0].groupid;
        }

        //UPD CCM 20210422
        resolve(this.grpOptions);
      });
    },
    // 新建按钮点击
    handleNewClick() {
      this.tableData.push(Object.assign({}, this.newLine));
    },
    // 删除按钮点击
    handleDelClick(index) {
      this.tableData.splice(index, 1);
    },
    // 保存按钮点击
    buttonClick(val) {
      if (val === 'save') {
        if(JSON.stringify(this.tableData) === "[]" || this.tableData.length === 0){
          this.$message.info({
            message: this.$t('normal.info_16'),
            type: 'info',
            duration: 2 * 1000,
          })
          return;
        }
        this.tableData = this.tableData.filter(item => item.themeinforId !== "")
        const data = {
          revenueForecastList: this.tableData,
          revenueForecast: {
            saveDate: this.formData.saveDate,
            deptId: this.formData.deptId
          }
        }
        this.loading = true
        this.$store.dispatch('PFANS1053Store/saveInfo', data)
        .then(response => {
          this.loading = false
          this.$message.success(this.$t("normal.success_01"))
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false
        });
      }
    },
    // 获取Theme列表
    getThemeOutDepth() {
      this.$store.dispatch('PFANS1053Store/getThemeOutDepth', this.formData)
      .then(response => {
        this.themeOptions = response;
        console.log(this.themeOptions)
      })
      .catch(error => {
        this.$message.error({
          message: error,
          type: 'error',
          duration: 5 * 1000,
        });
      });
    },
    // Theme名选择框变更
    selectChange(row) {
      // 判断是否为新建
      row.themeName = row.themeinforId
      this.themeOptions.every(item => {
        if (item.themeinforId === row.themeinforId) {
          row.themeName = item.themeName
          return false
        }
      })
    },
    //编辑状态
    ableOrNot(val){
      let days = Number(moment().date());
      let month = Number(moment().month()) + 1;
      let year = Number(moment().year());
      if(moment(this.formData.saveDate).year() === moment().year()) {//是否为当年
        if (Number(days) > Number(this.deadlineDate)) {//当前大于字典截止日，不可填写
          return true;
        } else {
          if (month === 4) {//当前时间4月进行全年见通，可填写
            return false;
          }
          if (val + 8 < 12) {//table,1-3月份数据
            if (month >= 4 && month <= 12) {//当前时间4-12月时，1-3月可填写
              return false;
            } else {
              return val < month ? true : false;//当前时间1-3，小于当前月份不可填写
            }
          } else {//table,4-12月份数据
            if (month >= 4 && month <= 12) {//当前时间4-12
              return val < month ? true : false;//小于当前月份不可填写
            } else {//当前时间0-3
              return true;//可以填写
            }
          }
        }
      }else{
        return true;
      }
    },
    //根据选择时间去判断，显示见通或者实际
    judge(val){
      let month = Number(moment(this.formData.saveDate).month()) + 1;
      if (val + 8 < 12) {//table,1-3月份数据
        if (month >= 4 && month <= 12) {//当前时间4-12月时，1-3月显示见通
          return false;
        } else {
          return val < month ? true : false;//当前时间1-3，小于当前月份显示实际
        }
      } else {//table,4-12月份数据
        if (month >= 4 && month <= 12) {//当前时间4-12
          return val < month ? true : false;//小于当前月份显示实际
        } else {//当前时间0-3
          return true;//显示见通
        }
      }


    },
  },
  created() {
    // 获取部门列表
    this.getOrgList();
    // 获取见通修改截止日
    this.deadlineDate = getDictionaryInfo('PJ160001').value1;
    this.getThemeOutDepth()
    // 列表初始化
    this.getData();
  },
  computed: {
    year() {
      if (moment(this.formData.saveDate).month() > 2) {
        return moment(this.formData.saveDate).year();
      } else {
        return Number(moment(this.formData.saveDate).year()) - 1;
      }
    },
    newLine() {
      if (this.deadlineDate !== '') {
        return {
          newLine: true,
          themeName: '',
          themeinforId: '',
          centerId: this.formData.deptId,
          customerName: '',
          aprilPlan: '0',
          aprilActual: moment().month() > 3 || (moment().month() === 3 && moment().date() > Number(this.deadlineDate)) ? 0 : null,
          aprilForecast: '0',
          mayPlan: '0',
          mayActual: moment().month() > 4 || (moment().month() === 4 && moment().date() > Number(this.deadlineDate)) ? 0 : null,
          mayForecast: '0',
          junePlan: '0',
          juneActual: moment().month() > 5 || (moment().month() === 5 && moment().date() > Number(this.deadlineDate)) ? 0 : null,
          juneForecast: '0',
          julyPlan: '0',
          julyActual: moment().month() > 6 || (moment().month() === 6 && moment().date() > Number(this.deadlineDate)) ? 0 : null,
          julyForecast: '0',
          augustPlan: '0',
          augustActual: moment().month() > 7 || (moment().month() === 7 && moment().date() > Number(this.deadlineDate)) ? 0 : null,
          augustForecast: '0',
          septemberPlan: '0',
          septemberActual: moment().month() > 8 || (moment().month() === 8 && moment().date() > Number(this.deadlineDate)) ? 0 : null,
          septemberForecast: '0',
          octoberPlan: '0',
          octoberActual: moment().month() > 9 || (moment().month() === 9 && moment().date() > Number(this.deadlineDate)) ? 0 : null,
          octoberForecast: '0',
          novemberPlan: '0',
          novemberActual: moment().month() > 10 || (moment().month() === 10 && moment().date() > Number(this.deadlineDate)) ? 0 : null,
          novemberForecast: '0',
          decemberPlan: '0',
          decemberActual: moment().month() > 11 || (moment().month() === 11 && moment().date() <= Number(this.deadlineDate)) ? 0 : null,
          decemberForecast: '0',
          januaryPlan: '0',
          januaryActual: (moment().year() > this.year && moment().month() > 0) || (moment().year() > this.year && moment().month() === 0 && moment().date() <= Number(this.deadlineDate)) ? 0 : null,
          januaryForecast: '0',
          februaryPlan: '0',
          februaryActual: (moment().year() > this.year && moment().month() > 1) || (moment().year() > this.year && moment().month() === 1 && moment().date() <= Number(this.deadlineDate)) ? 0 : null,
          februaryForecast: '0',
          marchPlan: '0',
          marchActual: (moment().year() > this.year && moment().month() > 2) || (moment().year() > this.year && moment().month() === 2 && moment().date() <= Number(this.deadlineDate)) ? 0 : null,
          marchForecast: '0',
        };
      }
    },
  },
  watch: {
    formData:{
      handler(){
        //保存按钮状态
        this.buttonList.forEach((item, index) => {
          if (item.key == 'save') {
            if (moment(this.formData.saveDate).year() === moment().year() && moment(this.formData.saveDate).month() + 1 === moment().month() + 1 && moment().date() < Number(this.deadlineDate)) {
              this.buttonList[index].disabled = false;
            } else {
              this.buttonList[index].disabled = true;
            }
          }
        });
      },
      deep: true,
    }

  },
};
</script>

<style scoped>

</style>
