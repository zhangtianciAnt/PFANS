<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION')" name="first">
      <el-table :data="tableTotal" header-cell-class-name="sub_bg_color_blue" stripe>
        <el-table-column>
          <el-table-column align="center" width="110" prop="total" :formatter="formatterDir">
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column align="center" width="110" prop="type" :formatter="formatterDir">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.April')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money5" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money6"  align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money7" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money8" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money9" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyfirsthalf" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money10" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money11" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money12" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money1" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money2" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money3" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneysecondhalf" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyAnnual" align="center" width="110">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_NEWBUSINESSYEAR')" name="second">
      <el-table :data="tableNewYear" header-cell-class-name="sub_bg_color_blue" style="width: 100%"  class="tableClass"
                :span-method="objectSpanMethod" ref="table">
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETNAME')" align="center" width="200">
            <template slot-scope="scope">
              <el-input  maxlength="20" style="width: 100%"
                         v-model.trim="scope.row.assetsname"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETTYPE')" align="center" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.assetstype1" @change="(val) => getSummaries(tableNewYear)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center" width="150">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.prices" controls-position="right"  @change="handleChange(scope.row)"  :min="0" :max="10" style="width:8vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column prop="assetstype" align="center" :formatter="formatterDir">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.April')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number4" controls-position="right" @change="handleChange(scope.row,4)"  :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money4" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number5" controls-position="right"  @change="handleChange(scope.row,5)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money5" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number6" controls-position="right" @change="handleChange(scope.row,6)"  :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money6" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number7" controls-position="right" @change="handleChange(scope.row,7)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money7" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number8" controls-position="right"  @change="handleChange(scope.row,8)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money8" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number9" controls-position="right"  @change="handleChange(scope.row,9)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money9" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numberfirsthalf" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneyfirsthalf" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number10" controls-position="right"  @change="handleChange(scope.row,10)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money10" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number11" controls-position="right"  @change="handleChange(scope.row,11)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money11" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number12" controls-position="right"  @change="handleChange(scope.row,12)" :min="0" style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money12" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number1" controls-position="right"  @change="handleChange(scope.row,1)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money1" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number2" controls-position="right"  @change="handleChange(scope.row,2)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money2" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number3" controls-position="right" @change="handleChange(scope.row,3)"  :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money3" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numbersecondhalf" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneysecondhalf" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numberAnnual" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" >
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneyAnnual" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.operation')" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRowF2(scope.$index, tableNewYear)"
              plain
              size="small"
              type="danger"
            >{{$t('button.delete')}}
            </el-button>
            <el-button
              @click="addRowF2(0)"
              plain
              size="small"
              type="primary"
            >{{$t('button.insert')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableNewYearTotal" header-cell-class-name="sub_bg_color_blue" stripe style="padding-top: 2%">
        <el-table-column>
        <el-table-column align="center" width="110" prop="total" :formatter="formatterDir">
        </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column align="center" width="110" prop="type" :formatter="formatterDir">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.April')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money5" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money6"  align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money7" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money8" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money9" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyfirsthalf" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money10" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money11" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money12" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money1" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money2" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money3" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneysecondhalf" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyAnnual" align="center" width="110">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_LASTBUSINESSYEAR')" name="third">
      <el-table :data="tableLastYear" header-cell-class-name="sub_bg_color_blue" style="width: 100%"  class="tableClass"
                :span-method="objectLastYearSpanMethod" ref="table">
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETNAME')" align="center" width="200">
            <template slot-scope="scope">
              <el-input  maxlength="20" style="width: 100%"
                         v-model.trim="scope.row.assetsname"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETTYPE')" align="center" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.assetstype1" @change="(val) => getLastYearSummaries(tableLastYear)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center" width="150">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.prices" controls-position="right"  @change="handleLastYearChange(scope.row)"  :min="0" :max="10" style="width:8vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column prop="assetstype" align="center" :formatter="formatterDir">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number12" controls-position="right"  @change="handleLastYearChange(scope.row,12)" :min="0" style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money12" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number1" controls-position="right"  @change="handleLastYearChange(scope.row,1)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money1" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number2" controls-position="right"  @change="handleLastYearChange(scope.row,2)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money2" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number3" controls-position="right" @change="handleLastYearChange(scope.row,3)"  :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money3" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numbersecondhalf" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneysecondhalf" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numberAnnual" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" >
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneyAnnual" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.operation')" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRowF2(scope.$index, tableLastYear)"
              plain
              size="small"
              type="danger"
            >{{$t('button.delete')}}
            </el-button>
            <el-button
              @click="addRowF2(1)"
              plain
              size="small"
              type="primary"
            >{{$t('button.insert')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableLastYearTotal" header-cell-class-name="sub_bg_color_blue" stripe style="padding-top: 2%">
        <el-table-column>
          <el-table-column align="center" width="110" prop="total" :formatter="formatterDir">
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column align="center" width="110" prop="type" :formatter="formatterDir">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money12" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money1" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money2" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money3" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneysecondhalf" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyAnnual" align="center" width="110">
          </el-table-column>
        </el-table-column>
      </el-table >
    </el-tab-pane>
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_OTHER')" name="forth">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: 'AssetsComponent',
    components: {
    },
    data() {
      return{
        activeName:"first",
        tableTotal:[{},{}],
        tableNewYearTotal:[{},{}],
        tableLastYearTotal:[{},{}],
        options: [{
          value: '1',
          label: '1年'
        }, {
          value: '2',
          label: '3年'
        }, {
          value: '3',
          label: '5年'
        }],
      }
    },
    props: {
    tableNewYear: {
      type: Array,
      default: []
    },
      // tableNewYear: {
      //   type: Function
      // },
      tableLastYear: {
        type: Array,
        default: []
      }
    },
    mounted() {

    },
    methods: {
      formatterDir(row, column,cellValue, index) {
        if(column.property === "total"){
           if(index === 0){
             return this.$t("label.PFANS1036FORMVIEW_TOTALDEPRECIATION");
           }
        }
        if(column.property === "assetstype"){
           if(row[column.property] === "0"){
             return this.$t("label.PFANS1036FORMVIEW_PLAN");
           }else  if(row[column.property] === "1"){
             return this.$t("label.PFANS1036FORMVIEW_ACHIEVEMENTS");
           }
        }
        if(column.property === "type"){
          if(index === 0){
            return this.$t("label.PFANS1036FORMVIEW_PLAN");
          } else if(index === 1){
            return this.$t("label.PFANS1036FORMVIEW_ACHIEVEMENTS");
          }
        }
        return row.address;
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 34) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      objectLastYearSpanMethod({ row, column, rowIndex, columnIndex }){
        if (columnIndex === 16) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      handleChange(scope,index){
        if(scope.prices > 0 ){
          scope["money" + index] = scope.prices * scope["number" + index];
          if(index >= 4 && index <= 9){
            scope.numberfirsthalf = (scope.number4||0) + (scope.number5||0) + (scope.number6||0) + (scope.number7||0) + (scope.number8||0) + (scope.number9||0);
            scope.moneyfirsthalf = (scope.money4||0) + (scope.money5||0) + (scope.money6||0) + (scope.money7||0) + (scope.money8||0) + (scope.money9||0);
          }
         else if((index >= 9 && index <= 12) || (index >= 1 && index <= 3)){
            scope.numbersecondhalf = (scope.number10||0) + (scope.number11||0) + (scope.number12||0) + (scope.number1||0) + (scope.number2||0) + (scope.number3||0);
            scope.moneysecondhalf = (scope.money10||0) + (scope.money11||0) + (scope.money12||0) + (scope.money1||0) + (scope.money2||0) + (scope.money3||0);
          }else{
             for(let par in scope){
               if(par.substring(0,5) === "money"){
                 scope[par] = scope.prices * scope["number" + par.charAt(par.length - 1)];
               }
             }
            scope.numberfirsthalf = (scope.number4||0) + (scope.number5||0) + (scope.number6||0) + (scope.number7||0) + (scope.number8||0) + (scope.number9||0);
            scope.moneyfirsthalf = (scope.money4||0) + (scope.money5||0) + (scope.money6||0) + (scope.money7||0) + (scope.money8||0) + (scope.money9||0);
            scope.numbersecondhalf = (scope.number10||0) + (scope.number11||0) + (scope.number12||0) + (scope.number1||0) + (scope.number2||0) + (scope.number3||0);
            scope.moneysecondhalf = (scope.money10||0) + (scope.money11||0) + (scope.money12||0) + (scope.money1||0) + (scope.money2||0) + (scope.money3||0);
          }
          scope.numberAnnual = (scope.numberfirsthalf||0) +  (scope.numbersecondhalf||0);
          scope.moneyAnnual = (scope.moneyfirsthalf||0) +  (scope.moneysecondhalf||0);
        }
        this.getSummaries(this.tableNewYear);
      },
      handleLastYearChange(scope,index){
        if(scope.prices > 0 ){
          scope["money" + index] = scope.prices * scope["number" + index];
         if((index >= 9 && index <= 12) || (index >= 1 && index <= 3)){
            scope.numbersecondhalf = (scope.number10||0) + (scope.number1||0) + (scope.number12||0) + (scope.number1||0) + (scope.number2||0) + (scope.number3||0);
            scope.moneysecondhalf = (scope.money10||0) + (scope.money11||0) + (scope.money12||0) + (scope.money1||0) + (scope.money2||0) + (scope.money3||0);
          }else{
            for(let par in scope){
              if(par.substring(0,5) === "money"){
                scope[par] = scope.prices * scope["number" + par.charAt(par.length - 1)];
              }
            }
            scope.numbersecondhalf = (scope.number10||0) + (scope.number1||0) + (scope.number12||0) + (scope.number1||0) + (scope.number2||0) + (scope.number3||0);
            scope.moneysecondhalf = (scope.money10||0) + (scope.money11||0) + (scope.money12||0) + (scope.money1||0) + (scope.money2||0) + (scope.money3||0);
          }
          scope.numberAnnual = scope.numbersecondhalf||0;
          scope.moneyAnnual = scope.moneysecondhalf||0;
        }
        this.getLastYearSummaries(this.tableLastYear);
      },
      getSummaries(table) {
        let totalExpect = {};
        let totalActual = {};
        table.forEach(
          row =>{
            let sum = 0;
            for (let i = 1;i <= 12; i++){
              if(row.assetstype1 === "1"){
                sum =  Math.round((row["money" + i]||0) / 12 * 100000) / 100000;
              }else if(row.assetstype1 === "2"){
                sum =  Math.round((row["money" + i]||0) / 36 * 100000) / 100000;
              }else if(row.assetstype1 === "3"){
                sum =  Math.round((row["money" + i]||0) / 60 * 100000) / 100000;
              }
              if(row.assetstype === "0" ){
                totalExpect["money" + i] =  sum + (totalExpect["money" + i]||0);
              }else{
                totalActual["money" + i] =  sum + (totalActual["money" + i]||0);
              }
            }
            if(row.assetstype === "0" ){
              totalExpect.numberfirsthalf+= row.numberfirsthalf;
              totalExpect.numbersecondhalf+= row.numbersecondhalf;
              totalExpect.numberAnnual+= row.numberAnnual;
            }else{
              totalActual.numberfirsthalf += row.numberfirsthalf;
              totalActual.numbersecondhalf += row.numbersecondhalf;
              totalActual.numberAnnual += row.numberAnnual;
            }
          }
        )
        for(let i = 5;i <= 12; i++){
          totalActual["money"+ i] += totalActual["money"+ (i - 1)];
          totalExpect["money"+ i] += totalExpect["money"+ (i - 1)];
        }
        totalActual.money1 += totalActual.money12;
        totalExpect.money1 += totalExpect.money12;
        totalActual.money2 += totalActual.money1;
        totalExpect.money2 += totalExpect.money1;
        totalActual.money3 += totalActual.money2;
        totalExpect.money3 += totalExpect.money2;

        totalExpect.moneyfirsthalf = (totalExpect.money4 + totalExpect.money5 + totalExpect.money6 + totalExpect.money7 + totalExpect.money8 + totalExpect.money9).toFixed(5);
        totalActual.moneyfirsthalf = (totalActual.money4 + totalActual.money5 + totalActual.money6 + totalActual.money7 + totalActual.money8 + totalActual.money9).toFixed(5);
        totalExpect.moneysecondhalf = (totalExpect.money10 + totalExpect.money11 + totalExpect.money12 + totalExpect.money1 + totalExpect.money2 + totalExpect.money3).toFixed(5);
        totalActual.moneysecondhalf = (totalActual.money10 + totalActual.money11 + totalActual.money12 + totalActual.money1 + totalActual.money2 + totalActual.money3).toFixed(5);
        totalExpect.moneyAnnual = (parseFloat(totalExpect.moneyfirsthalf) + parseFloat(totalExpect.moneysecondhalf)).toFixed(5);
        totalActual.moneyAnnual = (parseFloat(totalActual.moneyfirsthalf) + parseFloat(totalActual.moneysecondhalf)).toFixed(5);
        this.tableNewYearTotal = [totalExpect,totalActual];
        this.getTableTotal();
      },
      getLastYearSummaries(table) {
        let months = [1,2,3,12];
        let totalExpect = {};
        let totalActual = {};
        table.forEach(
          row =>{
            let sum = 0;
            for (let i = 0;i <= months.length; i++){
              if(row.assetstype1 === "1"){
                sum =  Math.round((row["money" + months[i]]||0) / 12 * 100000) / 100000;
              }else if(row.assetstype1 === "2"){
                sum =  Math.round((row["money" + months[i]]||0) / 36 * 100000) / 100000;
              }else if(row.assetstype1 === "3"){
                sum =  Math.round((row["money" + months[i]]||0) / 60 * 100000) / 100000;
              }
              if(row.assetstype === "0" ){
                totalExpect["money" + months[i]] =  sum + (totalExpect["money" + months[i]]||0);
              }else{
                totalActual["money" + months[i]] =  sum + (totalActual["money" + months[i]]||0);
              }
            }
            if(row.assetstype === "0" ){
              totalExpect.numbersecondhalf+= row.numbersecondhalf;
              totalExpect.numberAnnual+= row.numberAnnual;
            }else{
              totalActual.numbersecondhalf += row.numbersecondhalf;
              totalActual.numberAnnual += row.numberAnnual;
            }
          }
        )

        totalActual.money1 += totalActual.money12;
        totalExpect.money1 += totalExpect.money12;
        totalActual.money2 += totalActual.money1;
        totalExpect.money2 += totalExpect.money1;
        totalActual.money3 += totalActual.money2;
        totalExpect.money3 += totalExpect.money2;

        totalExpect.moneysecondhalf = ( totalExpect.money12 + totalExpect.money1 + totalExpect.money2 + totalExpect.money3).toFixed(5);
        totalActual.moneysecondhalf = (totalActual.money12 + totalActual.money1 + totalActual.money2 + totalActual.money3).toFixed(5);
        totalExpect.moneyAnnual = totalExpect.moneysecondhalf;
        totalActual.moneyAnnual = totalActual.moneysecondhalf;
        this.tableLastYearTotal = [totalExpect,totalActual];
        this.getTableTotal();
      },
      getTableTotal(){
        let totalExpect = {};
        let totalActual = {};
        for(let val in this.tableNewYearTotal[0]){
          totalExpect[val] = (parseFloat(this.tableNewYearTotal[0][val]) + parseFloat((this.tableLastYearTotal[0][val]||0))).toFixed(5);
        }
        for(let val in this.tableNewYearTotal[1]){
          totalActual[val] = (parseFloat(this.tableNewYearTotal[1][val]) + parseFloat((this.tableLastYearTotal[1][val]||0))).toFixed(5);
        }
       this.tableTotal = [totalExpect,totalActual];
      },
      deleteRowF2(index, rows) {
        if (rows.length > 2) {
          rows.splice(index, 2);
        }
      },
      addRowF2(val) {
        if(val === 0){
          this.tableNewYear.push({assetstype:"0"});
          this.tableNewYear.push({assetstype:"1"});
        }else{
          this.tableLastYear.push({assetstype:"0"});
          this.tableLastYear.push({assetstype:"1"});
        }
      }
    },
    watch:{
      tableNewYear:{
        handler(newValue,oldValue){
          this.tableNewYear = newValue;
          this.getSummaries(newValue);
        },
        deep:true
      },
      tableLastYear:{
        handler(newValue,oldValue){
          this.tableLastYear = newValue;
          this.getLastYearSummaries(newValue);
        },
        deep:true
      }
    }
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

  .el-table__body .el-table__row.hover-row td{
    background-color: #fafafa;
  }
</style>
