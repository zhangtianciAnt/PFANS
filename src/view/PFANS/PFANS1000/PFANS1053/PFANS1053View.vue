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
              show-overflow-tooltip
              :label="$t('label.PFANS1050FORMVIEW_THEMENAME')"
              width="160">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.themeinforId"
                  size="mini"
                  v-if="scope.row.newLine"
                  filterable
                  allow-create
                  default-first-option
                  :placeholder="$t('label.PFANS1053THEMENAME')">
                  <el-option
                    v-for="item in themeOptions"
                    :key="item.themeinforId"
                    :label="item.themeName"
                    :value="item.themeinforId">
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.themeName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1053_CUSTOMER_NAME')"
              width="120">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.customerName" :placeholder="$t('label.PFANS1053CUSTOMERNAME')"
                          v-if="scope.row.newLine"></el-input>
                <span v-else>{{ scope.row.customerName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS2027VIEW_CATEGORY')"
              width="80">
              <template slot-scope="scope">
                收入
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    v-if="scope.row.aprilActual !== null && scope.row.aprilActual !== undefined"
                    :precision="2"
                    controls-position="right"
                    :disabled="true"
                    style="width:90%"
                    v-model.trim="scope.row.aprilActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    v-else
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    v-model.trim="scope.row.aprilForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.aprilActual || scope.row.aprilForecast) - scope.row.aprilPlan }}
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    :disabled="true"
                    v-if="scope.row.mayActual !== null && scope.row.mayActual !== undefined"
                    style="width:90%"
                    v-model.trim="scope.row.mayActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    v-else
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width:90%"
                    v-model.trim="scope.row.mayForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.mayActual || scope.row.mayForecast) - scope.row.mayPlan }}
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    v-if="scope.row.juneActual !== null && scope.row.juneActual !== undefined"
                    disabled
                    controls-position="right"
                    style="width:90%"
                    v-model.trim="scope.row.juneActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    v-else
                    controls-position="right"
                    style="width:90%"
                    v-model.trim="scope.row.juneForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.juneActual || scope.row.juneForecast) - scope.row.junePlan }}
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
                  {{ Number(scope.row.aprilPlan) + Number(scope.row.mayPlan) + Number(scope.row.junePlan) }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
                  {{
                    Number(scope.row.aprilActual || scope.row.aprilForecast) +
                    Number(scope.row.mayActual || scope.row.mayForecast) +
                    Number(scope.row.juneActual || scope.row.juneForecast)
                  }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{
                    Number(scope.row.aprilActual || scope.row.aprilForecast) +
                    Number(scope.row.mayActual || scope.row.mayForecast) +
                    Number(scope.row.juneActual || scope.row.juneForecast) - scope.row.aprilPlan - scope.row.mayPlan -
                    scope.row.junePlan
                  }}
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-if="scope.row.julyActual !== null && scope.row.julyActual !== undefined"
                    disabled
                    style="width:90%"
                    v-model.trim="scope.row.julyActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-else
                    style="width:90%"
                    v-model.trim="scope.row.julyForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.julyActual || scope.row.julyForecast) - scope.row.julyPlan }}
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-if="scope.row.augustActual !== null && scope.row.augustActual !== undefined"
                    disabled
                    style="width:90%"
                    v-model.trim="scope.row.augustActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-else
                    style="width:90%"
                    v-model.trim="scope.row.augustForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.augustActual || scope.row.augustForecast) - scope.row.augustPlan }}
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-if="scope.row.septemberActual !== null && scope.row.septemberActual !== undefined"
                    disabled
                    style="width:90%"
                    v-model.trim="scope.row.septemberActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-else
                    style="width:90%"
                    v-model.trim="scope.row.septemberForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.septemberActual || scope.row.septemberForecast) - scope.row.septemberPlan }}
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
                  {{ Number(scope.row.julyPlan) + Number(scope.row.augustPlan) + Number(scope.row.septemberPlan) }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
                  {{
                    Number(scope.row.julyActual || scope.row.julyForecast) +
                    Number(scope.row.augustActual || scope.row.augustForecast) +
                    Number(scope.row.septemberActual || scope.row.septemberForecast)
                  }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{
                    Number(scope.row.julyActual || scope.row.julyForecast) +
                    Number(scope.row.augustActual || scope.row.augustForecast) +
                    Number(scope.row.septemberActual || scope.row.septemberForecast) - scope.row.julyPlan -
                    scope.row.augustPlan - scope.row.septemberPlan
                  }}
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
                  {{
                    Number(scope.row.aprilPlan) + Number(scope.row.mayPlan) + Number(scope.row.junePlan) +
                    Number(scope.row.julyPlan) + Number(scope.row.augustPlan) + Number(scope.row.septemberPlan)
                  }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
                  {{
                    Number(scope.row.aprilActual || scope.row.aprilForecast) +
                    Number(scope.row.mayActual || scope.row.mayForecast) +
                    Number(scope.row.juneActual || scope.row.juneForecast) +
                    Number(scope.row.julyActual || scope.row.julyForecast) +
                    Number(scope.row.augustActual || scope.row.augustForecast) +
                    Number(scope.row.septemberActual || scope.row.septemberForecast)
                  }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{
                    Number(scope.row.aprilActual || scope.row.aprilForecast) +
                    Number(scope.row.mayActual || scope.row.mayForecast) +
                    Number(scope.row.juneActual || scope.row.juneForecast) - scope.row.aprilPlan - scope.row.mayPlan -
                    scope.row.junePlan + (Number(scope.row.julyActual || scope.row.julyForecast) +
                      Number(scope.row.augustActual || scope.row.augustForecast) +
                      Number(scope.row.septemberActual || scope.row.septemberForecast) - scope.row.julyPlan -
                      scope.row.augustPlan - scope.row.septemberPlan)
                  }}
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-if="scope.row.octoberActual !== null && scope.row.octoberActual !== undefined"
                    disabled
                    style="width:90%"
                    v-model.trim="scope.row.octoberActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-else
                    style="width:90%"
                    v-model.trim="scope.row.octoberForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.octoberActual || scope.row.octoberForecast) - scope.row.octoberPlan }}
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-if="scope.row.novemberActual !== null && scope.row.novemberActual !== undefined"
                    disabled
                    style="width:90%"
                    v-model.trim="scope.row.novemberActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-else
                    style="width:90%"
                    v-model.trim="scope.row.novemberForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.novemberActual || scope.row.novemberForecast) - scope.row.novemberPlan }}
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-if="scope.row.decemberActual !== null && scope.row.decemberActual !== undefined"
                    disabled
                    style="width:90%"
                    v-model.trim="scope.row.decemberActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-else
                    style="width:90%"
                    v-model.trim="scope.row.decemberForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.decemberActual || scope.row.decemberForecast) - scope.row.decemberPlan }}
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
                  {{ Number(scope.row.octoberPlan) + Number(scope.row.novemberPlan) + Number(scope.row.decemberPlan) }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
                  {{
                    Number(scope.row.octoberActual || scope.row.octoberForecast) +
                    Number(scope.row.novemberActual || scope.row.novemberForecast) +
                    Number(scope.row.decemberActual || scope.row.decemberForecast)
                  }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{
                    Number(scope.row.octoberActual || scope.row.octoberForecast) +
                    Number(scope.row.novemberActual || scope.row.novemberForecast) +
                    Number(scope.row.decemberActual || scope.row.decemberForecast) - scope.row.octoberPlan -
                    scope.row.novemberPlan - scope.row.decemberPlan
                  }}
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-if="scope.row.januaryActual !== null && scope.row.januaryActual !== undefined"
                    disabled
                    style="width:90%"
                    v-model.trim="scope.row.januaryActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-else
                    style="width:90%"
                    v-model.trim="scope.row.januaryForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.januaryActual || scope.row.januaryForecast) - scope.row.januaryPlan }}
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-if="scope.row.februaryActual !== null && scope.row.februaryActual !== undefined"
                    disabled
                    style="width:90%"
                    v-model.trim="scope.row.februaryActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-else
                    style="width:90%"
                    v-model.trim="scope.row.februaryForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.februaryActual || scope.row.februaryForecast) - scope.row.februaryPlan }}
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
                width="100">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="170">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    v-if="scope.row.marchActual !== null && scope.row.marchActual !== undefined"
                    disabled
                    style="width:90%"
                    v-model.trim="scope.row.marchActual">
                  </el-input-number>
                  <el-input-number
                    size="mini"
                    :max="9999999999"
                    :min="0"
                    :precision="2"
                    v-else
                    controls-position="right"
                    style="width:90%"
                    v-model.trim="scope.row.marchForecast">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{ (scope.row.marchActual || scope.row.marchForecast) - scope.row.marchPlan }}
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
                  {{ Number(scope.row.januaryPlan) + Number(scope.row.februaryPlan) + Number(scope.row.marchPlan) }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
                  {{
                    Number(scope.row.januaryActual || scope.row.januaryForecast) +
                    Number(scope.row.februaryActual || scope.row.februaryForecast) +
                    Number(scope.row.marchActual || scope.row.marchForecast)
                  }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
                  {{
                    Number(scope.row.januaryActual || scope.row.januaryForecast) +
                    Number(scope.row.februaryActual || scope.row.februaryForecast) +
                    Number(scope.row.marchActual || scope.row.marchForecast) - scope.row.januaryPlan -
                    scope.row.februaryPlan - scope.row.marchPlan
                  }}
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
                  {{
                    Number(scope.row.aprilPlan) + Number(scope.row.mayPlan) + Number(scope.row.junePlan) +
                    Number(scope.row.julyPlan) + Number(scope.row.augustPlan) + Number(scope.row.septemberPlan) +
                    (Number(scope.row.octoberPlan) + Number(scope.row.novemberPlan) + Number(scope.row.decemberPlan)) +
                    (Number(scope.row.januaryPlan) + Number(scope.row.februaryPlan) + Number(scope.row.marchPlan))
                  }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2036VIEW_TRUE')"
                width="100">
                <template slot-scope="scope">
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
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS2006VIEW_DIFF')"
                width="100">
                <template slot-scope="scope">
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
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              fixed="right"
              :label="$t('label.operation')"
              width="140">
              <template slot-scope="scope">
                <el-button @click="handleNewClick()" type="primary" plain size="small">{{
                    $t('button.insert')
                  }}
                </el-button>
                <el-popconfirm :title="$t('label.PFANS1053CONFIRM')" @onConfirm="handleDelClick(scope.$index)">
                  <el-button slot="reference" type="primary" plain size="small">{{ $t('button.delete') }}</el-button>
                </el-popconfirm>
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
      tableData: [
        // {
        //   themeinforId: '1',
        //   themename: 'Test Theme1',
        //   toolsorgs: '天津松下汽车电子开发有限公司',
        //   aprilPlan: '1000',
        //   aprilActual: '2000',
        //   aprilForecast: '3000',
        //   mayPlan: '1000',
        //   mayActual: '2000',
        //   mayForecast: '3000',
        //   junePlan: '1000',
        //   juneActual: '2000',
        //   juneForecast: '3000',
        //   julyPlan: '1000',
        //   julyActual: '2000',
        //   julyForecast: '3000',
        //   augustPlan: '1000',
        //   augustActual: '2000',
        //   augustForecast: '3000',
        //   septemberPlan: '1000',
        //   septemberActual: '2000',
        //   septemberForecast: '3000',
        //   octoberPlan: '1000',
        //   octoberActual: '2000',
        //   octoberForecast: '3000',
        //   novemberPlan: '1000',
        //   novemberActual: '2000',
        //   novemberForecast: '3000',
        //   decemberPlan: '1000',
        //   decemberActual: '2000',
        //   decemberForecast: '3000',
        //   januaryPlan: '1000',
        //   januaryActual: '2000',
        //   januaryForecast: '3000',
        //   februaryPlan: '1000',
        //   februaryActual: '2000',
        //   februaryForecast: '3000',
        //   marchPlan: '1000',
        //   marchActual: '2000',
        //   marchForecast: '3000',
        // },
        // {
        //   themeinforId: '2',
        //   themename: 'Test Theme2',
        //   toolsorgs: '天津松下汽车电子开发有限公司',
        //   aprilPlan: '1000',
        //   aprilActual: '2000',
        //   aprilForecast: '3000',
        //   mayPlan: '1000',
        //   mayActual: '2000',
        //   mayForecast: '3000',
        //   junePlan: '1000',
        //   juneActual: '2000',
        //   juneForecast: '3000',
        //   julyPlan: '1000',
        //   julyActual: '2000',
        //   julyForecast: '3000',
        //   augustPlan: '1000',
        //   augustActual: '2000',
        //   augustForecast: '3000',
        //   septemberPlan: '1000',
        //   septemberActual: '2000',
        //   septemberForecast: '3000',
        //   octoberPlan: '1000',
        //   octoberActual: '2000',
        //   octoberForecast: '3000',
        //   novemberPlan: '1000',
        //   novemberActual: '2000',
        //   novemberForecast: '3000',
        //   decemberPlan: '1000',
        //   decemberActual: '2000',
        //   decemberForecast: '3000',
        //   januaryPlan: '1000',
        //   januaryActual: '2000',
        //   januaryForecast: '3000',
        //   februaryPlan: '1000',
        //   februaryActual: '2000',
        //   februaryForecast: '3000',
        //   marchPlan: '1000',
        //   marchActual: '2000',
        //   marchForecast: '3000',
        // },
      ],
    };
  },
  methods: {
    // 保存年月变更
    changeDate() {
      this.getData();
    },
    // 部门变更
    groupChange() {
      this.getData();
    },
    // 查询
    getData() {
      this.loading = true;
      this.$store.dispatch('PFANS1053Store/getInfo', this.formData)
      .then(response => {
        this.tableData = response.length === 0 ? [Object.assign({}, this.newLine)] : response;
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
        // 全部数据
        console.log('this.tableData', this.tableData);
        // 新建数据
        console.log('this.newData', this.tableData.filter(item => item.newLine));
        const data = {
          themeInforList: this.tableData.filter(item => item.newLine),
          revenueForecastList: this.tableData
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
      })
      .catch(error => {
        this.$message.error({
          message: error,
          type: 'error',
          duration: 5 * 1000,
        });
      });
    }
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
      if (this.formData.saveDate.month() > 2) {
        return this.formData.saveDate.year();
      } else {
        return this.formData.saveDate.year() - 1;
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
};
</script>

<style scoped>

</style>
