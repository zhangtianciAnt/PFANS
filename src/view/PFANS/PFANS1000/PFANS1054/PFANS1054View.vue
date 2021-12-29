<template>
  <EasyNormalContainer
    v-loading="loading"
    :buttonList="buttonList"
    :title="title"
    ref="container"
    @buttonClick="buttonClick"
    :noback="true"
  >
    <div slot="customize" style="padding-top: 3%">
      <el-input :placeholder="$t('label.PFANS1054CONDITIONSFORRETRIEVAL')"
                maxlength="20"
                style="width: 20vw;margin-left: 75%"
                v-model="formData.themeName">
      </el-input>
      <el-form :model="formData" label-position="top" label-width="8vw" employedref="form" ref="form"
               style="padding: 0.5vw">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleDetailClick">
          <el-tab-pane :label="$t('label.PFANS1054SPENDINGTOSEETHROUGH')" name="first">
        <el-row >
          <el-col :span="6">
            <el-form-item :label="$t('label.PFANS5016VIEW_YEARS')">
              <el-date-picker
                :placeholder="$t('normal.error_09')"
                @change="changeDate"
                type="month"
                v-model="formData.saveDate"
                style="width:10vw"
                :clearable="false">
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
                    row-key="wai_id" height="600"
                    highlight-current-row
                    ref="tableMachineData"
                    :span-method="objectSpanMethod">
            <el-table-column
              fixed="left"
              show-overflow-tooltip
              :label="$t('label.PFANS1054THEMENAME')"
              width="170">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.themeinforId"
                  size="mini"
                  v-if="scope.row.newLine"
                  filterable
                  default-first-option
                  clearable
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
              :label="$t('label.PFANS1054CLASSIFICATION')"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.classIfication }}
              </template>
            </el-table-column>
            <!--4月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH4')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{ scope.row.hoursPlan4 }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{ scope.row.moneyPlan4 }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual4 !== null && scope.row.hoursActual4 !== undefined" style="text-align: center;display:block;">{{ scope.row.hoursActual4 }}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :max="9999999999"
                      :disabled = ableOrNot(4)
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast4">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual4 !== null && scope.row.moneyActual4 !== undefined" style="text-align: center;display:block;">{{ scope.row.moneyActual4 }}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(4)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast4">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--5月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH5')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{ scope.row.hoursPlan5 }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{ scope.row.moneyPlan5 }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual5 !== null && scope.row.hoursActual5 !== undefined" style="text-align: center;display:block;">{{ scope.row.hoursActual5 }}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(5)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast5">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual5 !== null && scope.row.moneyActual5 !== undefined" style="text-align: center;display:block;">{{ scope.row.moneyActual5 }}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(5)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast5">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--6月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH6')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.hoursPlan6}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.moneyPlan6}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual6 !== null && scope.row.hoursActual6 !== undefined" style="text-align: center;display:block;">{{scope.row.hoursActual6}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(6)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast6">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual6 !== null && scope.row.moneyActual6 !== undefined" style="text-align: center;display:block;">{{scope.row.moneyActual6}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(6)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast6">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--7月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH7')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.hoursPlan7}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.moneyPlan7}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual7 !== null && scope.row.hoursActual7 !== undefined" style="text-align: center;display:block;">{{scope.row.hoursActual7}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(7)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast7">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual7 !== null && scope.row.moneyActual7 !== undefined" style="text-align: center;display:block;">{{scope.row.moneyActual7}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(7)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast7">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--8月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH8')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.hoursPlan8}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.moneyPlan8}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual8 !== null && scope.row.hoursActual8 !== undefined" style="text-align: center;display:block;">{{scope.row.hoursActual8}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(8)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast8">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual8 !== null && scope.row.moneyActual8 !== undefined" style="text-align: center;display:block;">{{scope.row.moneyActual8}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(8)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast8">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--9月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH9')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.hoursPlan9}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.moneyPlan9}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual9 !== null && scope.row.hoursActual9 !== undefined" style="text-align: center;display:block;">{{scope.row.hoursActual9}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(9)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast9">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual9 !== null && scope.row.moneyActual9 !== undefined" style="text-align: center;display:block;">{{scope.row.moneyActual9}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(9)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast9">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--半年-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054HALFAYEARINTOTAL')"
              >
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    {{
                      (Number(scope.row.hoursPlan4 || 0) +
                      Number(scope.row.hoursPlan5 || 0) +
                      Number(scope.row.hoursPlan6 || 0) +
                      Number(scope.row.hoursPlan7 || 0) +
                      Number(scope.row.hoursPlan8 || 0) +
                      Number(scope.row.hoursPlan9 || 0)).toFixed(2)
                    }}
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="120">
                  <template slot-scope="scope">
                    {{
                      (Number(scope.row.moneyPlan4 || 0) +
                      Number(scope.row.moneyPlan5 || 0) +
                      Number(scope.row.moneyPlan6 || 0) +
                      Number(scope.row.moneyPlan7 || 0) +
                      Number(scope.row.moneyPlan8 || 0) +
                      Number(scope.row.moneyPlan9 || 0)).toFixed(2)
                    }}
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    {{
                      (Number(scope.row.hoursActual4 || 0) +
                      Number(scope.row.hoursActual5 || 0) +
                      Number(scope.row.hoursActual6 || 0) +
                      Number(scope.row.hoursActual7 || 0) +
                      Number(scope.row.hoursActual8 || 0) +
                      Number(scope.row.hoursActual9 || 0)).toFixed(2)
                    }}
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="120">
                  <template slot-scope="scope">
                    {{
                      (Number(scope.row.moneyActual4 || 0) +
                      Number(scope.row.moneyActual5 || 0) +
                      Number(scope.row.moneyActual6 || 0) +
                      Number(scope.row.moneyActual7 || 0) +
                      Number(scope.row.moneyActual8 || 0) +
                      Number(scope.row.moneyActual9 || 0)).toFixed(2)
                    }}
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--10月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH10')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.hoursPlan10}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.moneyPlan10}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual10 !== null && scope.row.hoursActual10 !== undefined" style="text-align: center;display:block;">{{scope.row.hoursActual10}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(10)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast10">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual10 !== null && scope.row.moneyActual10 !== undefined" style="text-align: center;display:block;">{{scope.row.moneyActual10}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(10)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast10">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--11月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH11')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.hoursPlan11}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.moneyPlan11}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual11 !== null && scope.row.hoursActual11 !== undefined" style="text-align: center;display:block;">{{scope.row.hoursActual11}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(11)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast11">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual11 !== null && scope.row.moneyActual11 !== undefined" style="text-align: center;display:block;">{{scope.row.moneyActual11}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(11)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast11">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--12月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH12')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.hoursPlan12}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.moneyPlan12}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual12 !== null && scope.row.hoursActual12 !== undefined" style="text-align: center;display:block;">{{scope.row.hoursActual12}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(12)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast12">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual12 !== null && scope.row.moneyActual12 !== undefined" style="text-align: center;display:block;">{{scope.row.moneyActual12}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(12)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast12">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--1月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH1')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.hoursPlan1}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.moneyPlan1}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual1 !== null && scope.row.hoursActual1 !== undefined" style="text-align: center;display:block;">{{scope.row.hoursActual1}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(1)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast1">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual1 !== null && scope.row.moneyActual1 !== undefined" style="text-align: center;display:block;">{{scope.row.moneyActual1}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(1)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast1">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--2月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH2')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.hoursPlan2}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.moneyPlan2}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual2 !== null && scope.row.hoursActual2 !== undefined" style="text-align: center;display:block;">{{scope.row.hoursActual2}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(2)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast2">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual2 !== null && scope.row.moneyActual2 !== undefined" style="text-align: center;display:block;">{{scope.row.moneyActual2}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(2)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--3月-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054MONTH3')">
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.hoursPlan3}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="100">
                  <template slot-scope="scope">
                    <span style="text-align: center;display:block;">{{scope.row.moneyPlan3}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.hoursActual3 !== null && scope.row.hoursActual3 !== undefined" style="text-align: center;display:block;">{{scope.row.hoursActual3}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(3)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.hoursForecast3">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.row.moneyActual3 !== null && scope.row.moneyActual3 !== undefined" style="text-align: center;display:block;">{{scope.row.moneyActual3}}</span>
                    <el-input-number
                      size="mini"
                      v-else
                      :disabled = ableOrNot(3)
                      :max="9999999999"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width:90%"
                      v-model.trim="scope.row.moneyForecast3">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--年间-->
            <el-table-column
              show-overflow-tooltip
              :label="$t('label.PFANS1054AWHOLE')"
              >
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054PLAN')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    {{
                      (Number(scope.row.hoursPlan4 || 0) +
                      Number(scope.row.hoursPlan5 || 0) +
                      Number(scope.row.hoursPlan6 || 0) +
                      Number(scope.row.hoursPlan7 || 0) +
                      Number(scope.row.hoursPlan8 || 0) +
                      Number(scope.row.hoursPlan9 || 0) +
                      Number(scope.row.hoursPlan10 || 0) +
                      Number(scope.row.hoursPlan11 || 0) +
                      Number(scope.row.hoursPlan12 || 0) +
                      Number(scope.row.hoursPlan1 || 0) +
                      Number(scope.row.hoursPlan2 || 0) +
                      Number(scope.row.hoursPlan3 || 0)).toFixed(2)
                    }}
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="120">
                  <template slot-scope="scope">
                    {{
                      (Number(scope.row.moneyPlan4 || 0) +
                      Number(scope.row.moneyPlan5 || 0) +
                      Number(scope.row.moneyPlan6 || 0) +
                      Number(scope.row.moneyPlan7 || 0) +
                      Number(scope.row.moneyPlan8 || 0) +
                      Number(scope.row.moneyPlan9 || 0) +
                      Number(scope.row.moneyPlan10 || 0) +
                      Number(scope.row.moneyPlan11 || 0) +
                      Number(scope.row.moneyPlan12 || 0) +
                      Number(scope.row.moneyPlan1 || 0) +
                      Number(scope.row.moneyPlan2 || 0) +
                      Number(scope.row.moneyPlan3 || 0)).toFixed(2)
                    }}
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('label.PFANS1054ACTUAL')">
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054NUMBEROFWORKERS')"
                  width="100">
                  <template slot-scope="scope">
                    {{
                      (Number(scope.row.hoursActual4 || 0) +
                      Number(scope.row.hoursActual5 || 0) +
                      Number(scope.row.hoursActual6 || 0) +
                      Number(scope.row.hoursActual7 || 0) +
                      Number(scope.row.hoursActual8 || 0) +
                      Number(scope.row.hoursActual9 || 0) +
                      Number(scope.row.hoursActual10 || 0) +
                      Number(scope.row.hoursActual11 || 0) +
                      Number(scope.row.hoursActual12 || 0) +
                      Number(scope.row.hoursActual1 || 0) +
                      Number(scope.row.hoursActual2 || 0) +
                      Number(scope.row.hoursActual3 || 0)).toFixed(2)
                    }}
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('label.PFANS1054AMOUNTOF')"
                  width="120">
                  <template slot-scope="scope">
                    {{
                      (Number(scope.row.moneyActual4 || 0) +
                      Number(scope.row.moneyActual5 || 0) +
                      Number(scope.row.moneyActual6 || 0) +
                      Number(scope.row.moneyActual7 || 0) +
                      Number(scope.row.moneyActual8 || 0) +
                      Number(scope.row.moneyActual9 || 0) +
                      Number(scope.row.moneyActual10 || 0) +
                      Number(scope.row.moneyActual11 || 0) +
                      Number(scope.row.moneyActual12 || 0) +
                      Number(scope.row.moneyActual1 || 0) +
                      Number(scope.row.moneyActual2 || 0) +
                      Number(scope.row.moneyActual3 || 0)).toFixed(2)
                    }}
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--操作-->
            <el-table-column
              fixed="right"
              :label="$t('label.operation')"
              width="140">
              <template slot-scope="scope">
                <el-button @click="handleNewClick()" type="primary" plain size="small">{{
                    $t('button.insert')
                  }}
                </el-button>
                <el-popconfirm :title="$t('label.PFANS1053CONFIRM')" @onConfirm="handleDelClick(scope.row)">
                  <el-button slot="reference" type="primary" plain size="small"  :disabled= "!scope.row.newLine">{{ $t('button.delete') }}</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('label.PFANS1054POORPLANNING')" name="second">
            <el-row >
              <el-col :span="6">
                <el-form-item :label="$t('label.PFANS5016VIEW_YEARS')">
                  <el-date-picker
                    :placeholder="$t('normal.error_09')"
                    type="month"
                    :disabled="true"
                    v-model="formData.saveDate"
                    style="width:10vw">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" prop="group_id">
                  <el-select v-model="formData.deptId" style="width: 20vw"
                             :disabled="true">
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
                <el-table :data="tableData1" border default-expand-all header-cell-class-name="sub_bg_color_blue"
                          style="margin-top: 1%;font-size: 13px"
                          row-key="wai_id1"
                          highlight-current-row
                          ref="tableMachineData1">
                  <el-table-column
                    prop="classIfication"
                    width="100"
                    fixed="left">
                  </el-table-column>
                  <!-- 4月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH4')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual4 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan4 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual4) - Number(scope.row.hoursPlan4)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 5月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH5')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual5 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan5 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual5) - Number(scope.row.hoursPlan5)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 6月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH6')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual6 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan6 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual6) - Number(scope.row.hoursPlan6)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 7月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH7')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual7 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan7 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual7) - Number(scope.row.hoursPlan7)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 8月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH8')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual8 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan8 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual8) - Number(scope.row.hoursPlan8)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 9月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH9')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual9 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan9 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual9) - Number(scope.row.hoursPlan9)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 半年 -->
                  <el-table-column
                    :label="$t('label.PFANS1054HALFAYEARINTOTAL')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{
                            Number(Number(scope.row.hoursActual4) +
                              Number(scope.row.hoursActual5) +
                              Number(scope.row.hoursActual6) +
                              Number(scope.row.hoursActual7) +
                              Number(scope.row.hoursActual8) +
                              Number(scope.row.hoursActual9)).toFixed(2)
                          }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{
                            Number(Number(scope.row.hoursPlan4) +
                              Number(scope.row.hoursPlan5) +
                              Number(scope.row.hoursPlan6) +
                              Number(scope.row.hoursPlan7) +
                              Number(scope.row.hoursPlan8) +
                              Number(scope.row.hoursPlan9)).toFixed(2)
                               }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{
                            Number(Number(scope.row.hoursActual4) +
                              Number(scope.row.hoursActual5) +
                              Number(scope.row.hoursActual6) +
                              Number(scope.row.hoursActual7) +
                              Number(scope.row.hoursActual8) +
                              Number(scope.row.hoursActual9) -
                              Number(scope.row.hoursPlan4) -
                              Number(scope.row.hoursPlan5) -
                              Number(scope.row.hoursPlan6) -
                              Number(scope.row.hoursPlan7) -
                              Number(scope.row.hoursPlan8) -
                              Number(scope.row.hoursPlan9)).toFixed(2)
                          }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 10月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH10')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual10 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan10 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual10) - Number(scope.row.hoursPlan10)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 11月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH11')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual11 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan11 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual11) - Number(scope.row.hoursPlan11)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 12月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH12')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual12 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan12 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual12) - Number(scope.row.hoursPlan12)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 1月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH1')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual1 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan1 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual1) - Number(scope.row.hoursPlan1)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 2月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH2')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual2 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan2 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual2) - Number(scope.row.hoursPlan2)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 3月 -->
                  <el-table-column
                    :label="$t('label.PFANS1054MONTH3')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursActual3 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ scope.row.hoursPlan3 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{ Number(Number(scope.row.hoursActual3) - Number(scope.row.hoursPlan3)).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <!-- 全年 -->
                  <el-table-column
                    :label="$t('label.PFANS1054AWHOLE')">
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFTHEME')"
                      width="100">
                      <template slot-scope="scope">
                      <span style="text-align: center;display:block;">{{
                          Number(Number(scope.row.hoursActual4) +
                            Number(scope.row.hoursActual5) +
                            Number(scope.row.hoursActual6) +
                            Number(scope.row.hoursActual7) +
                            Number(scope.row.hoursActual8) +
                            Number(scope.row.hoursActual9) +
                            Number(scope.row.hoursActual10) +
                            Number(scope.row.hoursActual11) +
                            Number(scope.row.hoursActual12) +
                            Number(scope.row.hoursActual1) +
                            Number(scope.row.hoursActual2) +
                            Number(scope.row.hoursActual3)
                          ).toFixed(2)
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054NUMBEROFSYSTEM')"
                      width="100">
                      <template slot-scope="scope">
                        <span style="text-align: center;display:block;">{{
                            Number(Number(scope.row.hoursPlan4) +
                              Number(scope.row.hoursPlan5) +
                              Number(scope.row.hoursPlan6) +
                              Number(scope.row.hoursPlan7) +
                              Number(scope.row.hoursPlan8) +
                              Number(scope.row.hoursPlan9) +
                              Number(scope.row.hoursPlan10) +
                              Number(scope.row.hoursPlan11) +
                              Number(scope.row.hoursPlan12) +
                              Number(scope.row.hoursPlan1) +
                              Number(scope.row.hoursPlan2) +
                              Number(scope.row.hoursPlan3)
                            ).toFixed(2)
                          }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS1054POOR')"
                      width="100">
                      <template slot-scope="scope">
                      <span style="text-align: center;display:block;">{{
                          Number(Number(scope.row.hoursActual4) + Number(scope.row.hoursActual5) + Number(scope.row.hoursActual6) + Number(scope.row.hoursActual7) +
                            Number(scope.row.hoursActual8) + Number(scope.row.hoursActual9) + Number(scope.row.hoursActual10) + Number(scope.row.hoursActual11) +
                            Number(scope.row.hoursActual12) + Number(scope.row.hoursActual1) + Number(scope.row.hoursActual2) + Number(scope.row.hoursActual3) -
                            Number(scope.row.hoursPlan4) - Number(scope.row.hoursPlan5) - Number(scope.row.hoursPlan6) - Number(scope.row.hoursPlan7) - Number(scope.row.hoursPlan8) -
                            Number(scope.row.hoursPlan9) - Number(scope.row.hoursPlan10) - Number(scope.row.hoursPlan11) - Number(scope.row.hoursPlan12) - Number(scope.row.hoursPlan1) -
                            Number(scope.row.hoursPlan2) - Number(scope.row.hoursPlan3)
                          ).toFixed(2)
                        }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import moment from 'moment';
import {getCurrentRoleNew, getDictionaryInfo, getOrgInfo} from '../../../../utils/customize';
export default {
  name: 'PFANS1054VIEW',
  components: {
    EasyNormalContainer,
  },
  data() {
    return {
      title: 'title.PFANS1054VIEW',
      loading: false,
      activeName: 'first',
      themeOptions: [],
      spanArr: [],
      position: 0,
      buttonList: [
        {'key': 'save', 'name': 'button.save', 'disabled': false, icon: 'el-icon-check'},
        {'key': 'search', 'name': 'button.search', 'disabled': false, icon: 'el-icon-search'},
      ],
      formData: {
        saveDate: moment(),
        deptId: '',
        themeName: '',
      },
      // 见通填写截止日
      deadlineDate: '',
      grpOptions: [],
      tableData: [],
      tableData1: [],
    };
  },
  methods: {
    // 年月变更
    changeDate(val) {
      this.tableData = [];
      this.getData();
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
    // 部门变更
    groupChange() {
      this.tableData = [];
      this.getData();
    },
    // 查询
    getData() {
      this.loading = true;
      this.$store.dispatch('PFANS1054Store/getInfo', this.formData)
        .then(response => {
          // this.tableData = response.length === 0 ? [Object.assign({}, this.handleNewClick("0"))] : response;
          this.tableData = response;
          this.getSpanArr(this.tableData);//计算合并
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
      let $index = Math.random();
      this.tableData.push(Object.assign({}, this.newLine($index, '员工')),
        Object.assign({}, this.newLine($index, '构内外注')),
        Object.assign({}, this.newLine($index, '构外外注')));
    },
    // 删除按钮点击
    handleDelClick(val) {
      this.tableData = this.tableData.filter(item => item.flag !== val.flag)
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
          expenditureForecastList: this.tableData,
          expenditureForecast: {
            saveDate: this.formData.saveDate,
            deptId: this.formData.deptId,
          },
        };
        this.loading = true;
        setTimeout(() => {
          this.$store.dispatch('PFANS1054Store/saveInfo', data)
            .then(response => {
              this.loading = false;
              this.$message.success(this.$t('normal.success_01'));
            })
            .catch(error => {
              this.$message.error({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        },100);
      }
      if(val === 'search'){
        // if(JSON.stringify(this.tableData) === "[]" || this.tableData.length === 0){
        //   this.$message.info({
        //     message: this.$t('normal.info_16'),
        //     type: 'info',
        //     duration: 2 * 1000,
        //   })
        //   return;
        // }
        this.tableData = [];
        this.getData();
      }
    },
    // 获取Theme列表
    getThemeOutDepth() {
      this.$store.dispatch('PFANS1054Store/getThemeOutDepth', this.formData)
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
    },
    // Theme名选择框变更
    selectChange(row) {
      // 判断是否为新建
      row.themeName = row.themeinforId;
      let _tid = row.themeinforId;
      let _tname = '';
      this.themeOptions.every(item => {
        if (item.themeinforId === row.themeinforId) {
          row.themeName = item.themeName;//自身行赋值
          _tname = item.themeName;
          return false;
        }
      });
      this.tableData.forEach(items => {
        if(items.flag === row.flag){//相同theme标记
          items.themeName = _tname;//三条记录，其关联行赋值
          items.themeinforId = _tid;
        }
      })
    },
    //新建
    newLine($index,val){
      if (this.deadlineDate !== '') {
        return {
          newLine: true,
          flag: $index,//相同theme标记
          classIfication: val,//分类
          themeName: '',
          themeinforId: '',
          centerId: this.formData.deptId,
          hoursPlan4: 0,
          moneyPlan4: 0,
          hoursForecast4: 0,
          moneyForecast4: 0,
          hoursActual4: null,
          moneyActual4: null,
          hoursPlan5: 0,
          moneyPlan5: 0,
          hoursForecast5: 0,
          moneyForecast5: 0,
          hoursActual5: null,
          moneyActual5: null,
          hoursPlan6: 0,
          moneyPlan6: 0,
          hoursForecast6: 0,
          moneyForecast6: 0,
          hoursActual6: null,
          moneyActual6: null,
          hoursPlan7: 0,
          moneyPlan7: 0,
          hoursForecast7: 0,
          moneyForecast7: 0,
          hoursActual7: null,
          moneyActual7: null,
          hoursPlan8: 0,
          moneyPlan8: 0,
          hoursForecast8: 0,
          moneyForecast8: 0,
          hoursActual8: null,
          moneyActual8: null,
          hoursPlan9: 0,
          moneyPlan9: 0,
          hoursForecast9: 0,
          moneyForecast9: 0,
          hoursActual9: null,
          moneyActual9: null,
          hoursPlan10: 0,
          moneyPlan10: 0,
          hoursForecast10: 0,
          moneyForecast10: 0,
          hoursActual10: null,
          moneyActual10: null,
          hoursPlan11: 0,
          moneyPlan11: 0,
          hoursForecast11: 0,
          moneyForecast11: 0,
          hoursActual11: null,
          moneyActual11: null,
          hoursPlan12: 0,
          moneyPlan12: 0,
          hoursForecast12: 0,
          moneyForecast12: 0,
          hoursActual12: null,
          moneyActual12: null,
          hoursPlan1: 0,
          moneyPlan1: 0,
          hoursForecast1: 0,
          moneyForecast1: 0,
          hoursActual1: null,
          moneyActual1: null,
          hoursPlan2: 0,
          moneyPlan2: 0,
          hoursForecast2: 0,
          moneyForecast2: 0,
          hoursActual2: null,
          moneyActual2: null,
          hoursPlan3: 0,
          moneyPlan3: 0,
          hoursForecast3: 0,
          moneyForecast3: 0,
          hoursActual3: null,
          moneyActual3: null,
        };
      }
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
    //tab切换
    handleDetailClick(tab, event){
      if(tab.name=='first'){
        setTimeout(()=>{
          this.$refs.tableMachineData.doLayout()
        },100);
      }else if(tab.name=='second'){
        setTimeout(()=>{
          this.tableData1 = [];
          this.getPoor();
          this.$refs.tableMachineData1.doLayout()
        },100);
      }
    },
    //获取部门人员与计划差
    getPoor(){
        this.loading = true;
        this.$store.dispatch('PFANS1054Store/getPoortDepth', this.formData)
        .then(response => {
          this.tableData1 = response;
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
    //筛选需要合并单元格的数据
    getSpanArr(data) {
      this.spanArr = [] // 避免表格错乱！
      data.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1)
          this.position = 0
        } else {
          if (data[index].themeName === data[index - 1].themeName) { // 这里是要合并行
            this.spanArr[this.position] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.position = index
          }
        }
      })
    },
    //合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if(!row.newLine){//新建行不合并
        if (columnIndex === 0 || columnIndex === 58) { // 对第一列进行合并
          const _row = this.spanArr[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }
    },
  },
  created() {
    // 获取部门列表
    this.getOrgList();
    // 获取见通修改截止日
    this.deadlineDate = getDictionaryInfo('PJ160001').value1;
    //获取未关联theme
    this.getThemeOutDepth();
    // 列表初始化
    this.getData();
  },
};
</script>

<style lang="scss"   rel="stylesheet/scss">
/*列锁定之后滚动条拖不动问题处理*/
.el-table--scrollable-y .el-table__body-wrapper{
  z-index: 1;
}
</style>
