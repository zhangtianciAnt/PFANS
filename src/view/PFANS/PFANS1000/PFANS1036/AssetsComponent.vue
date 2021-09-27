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
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money6" align="center" width="110">
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
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyfirsthalf" align="center"
                           width="110">
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
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneysecondhalf" align="center"
                           width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyAnnual" align="center" width="110">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_NEWBUSINESSYEAR')" name="second">
      <el-table :data="tableNewYear" header-cell-class-name="sub_bg_color_blue" style="width: 100%" class="tableClass"
                 ref="table">
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETNAME')" align="center" width="200"
                           prop="assetsname">
            <template slot-scope="scope">
              <el-input :disabled="disabled" maxlength="20" style="width: 100%"
                        v-model="scope.row.assetsname"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETTYPE')" align="center" width="120"
                           prop="assetstype1">
            <template slot-scope="scope">
              <el-select v-model="scope.row.assetstype1" @change="(val) => getSummaries(tableNewYear)">
                <el-option
                  :disabled="disabled"
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
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center" width="150"
                           prop="prices">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.prices" controls-position="right" @change="handleChange(scope.row)"
                               :min="0" style="width:8vw" ></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column prop="assetstype" align="center" :formatter="formatterDir">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.April')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number4">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number4" controls-position="right"
                               @change="handleChange(scope.row,4)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money4">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money4" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="150" prop="number5">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number5" controls-position="right"
                               @change="handleChange(scope.row,5)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money5">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money5" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="150" prop="number6">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number6" controls-position="right"
                               @change="handleChange(scope.row,6)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money6">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money6" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number7">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number7" controls-position="right"
                               @change="handleChange(scope.row,7)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money7">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money7" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number8">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number8" controls-position="right"
                               @change="handleChange(scope.row,8)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money8">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money8" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number9">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number9" controls-position="right"
                               @change="handleChange(scope.row,9)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money9">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money9" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130"
                           prop="numberfirsthalf">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numberfirsthalf" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                           prop="moneyfirsthalf">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneyfirsthalf" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number10">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number10" controls-position="right"
                               @change="handleChange(scope.row,10)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money10">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money10" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number11">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number11" controls-position="right"
                               @change="handleChange(scope.row,11)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money11">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money11" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number12">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number12" controls-position="right"
                               @change="handleChange(scope.row,12)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money12" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number1">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number1" controls-position="right"
                               @change="handleChange(scope.row,1)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money1" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number2">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number2" controls-position="right"
                               @change="handleChange(scope.row,2)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money2" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number3">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number3" controls-position="right"
                               @change="handleChange(scope.row,3)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money3">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money3" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130"
                           prop="numbersecondhalf">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numbersecondhalf" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                           prop="moneysecondhalf">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneysecondhalf" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130"
                           prop="numberAnnual">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numberAnnual" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneyAnnual">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneyAnnual" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.operation')" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button
              :disabled="disabled"
              @click.native.prevent="deleteRowF1(scope.$index, tableNewYear)"
              plain
              size="small"
              type="danger"
            >{{$t('button.delete')}}
            </el-button>
            <el-button
              :disabled="disabled"
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
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money6" align="center" width="110">
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
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyfirsthalf" align="center"
                           width="110">
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
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneysecondhalf" align="center"
                           width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyAnnual" align="center" width="110">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_LASTBUSINESSYEAR')" name="third">
      <el-table :data="tableLastYear" header-cell-class-name="sub_bg_color_blue" style="width: 100%" class="tableClass"
                 ref="table">
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETNAME')" align="center" width="200"
                           prop="assetsname">
            <template slot-scope="scope">
              <el-input maxlength="20" style="width: 100%"
                        :disabled="disabled" v-model="scope.row.assetsname"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETTYPE')" align="center" width="120"
                           prop="assetstype1">
            <template slot-scope="scope">
              <el-select v-model="scope.row.assetstype1" @change="(val) => getLastYearSummaries(tableLastYear)">
                <el-option
                  :disabled="disabled"
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
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center" width="150"
                           prop="prices">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.prices" controls-position="right"
                               @change="handleLastYearChange(scope.row)" :min="0" style="width:8vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column prop="assetstype" align="center" :formatter="formatterDir">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number12">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number12" controls-position="right"
                               @change="handleLastYearChange(scope.row,12)" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money12" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number1">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number1" controls-position="right"
                               @change="handleLastYearChange(scope.row,1)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money1" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number2">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number2" controls-position="right"
                               @change="handleLastYearChange(scope.row,2)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money2" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130" prop="number3">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" v-model="scope.row.number3" controls-position="right"
                               @change="handleLastYearChange(scope.row,3)" :min="0" style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money3">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money3" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130"
                           prop="numbersecondhalf">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numbersecondhalf" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                           prop="moneysecondhalf">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneysecondhalf" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130"
                           prop="numberAnnual">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numberAnnual" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneyAnnual">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneyAnnual" :controls="false" :min="0" style="width:7vw"
                               :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.operation')" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button
              :disabled="disabled"
              @click.native.prevent="deleteRowF2(scope.$index, tableLastYear)"
              plain
              size="small"
              type="danger"
            >{{$t('button.delete')}}
            </el-button>
            <el-button
              :disabled="disabled"
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

        <el-table-column :label="$t('label.April')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money5" align="center" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money6" align="center" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money7" align="center" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money8" align="center" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money9" align="center" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyfirsthalf" align="center"
                           width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money10" align="center" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money11" align="center" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money12" align="center" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money1" align="center" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money2" align="center" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money3" align="center" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneysecondhalf" align="center"
                           width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyAnnual" align="center" width="130">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_LODBUSINESSYEAR')" name="forth">
      <el-table :data="tableLodYear" header-cell-class-name="sub_bg_color_blue" stripe style="padding-top: 2%">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')" align="center" width="110" prop="companyen">
          <template slot-scope="scope">
            <el-input :disabled="true" maxlength="100" style="width: 100%"
                      v-model="scope.row.companyen"></el-input>
          </template>
        </el-table-column>

        <el-table-column :label="$t('label.April')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money4">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money4" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money5">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money5" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money6">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money6" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money7">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money7" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money8">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money8" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money9">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money9" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money10">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money10" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money11">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money11" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money12" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money1" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money2" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money3">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money3" size="small" style="width:6vw" :disabled="checkdisabled"
                               :min="0" controls-position="right"
                               :precision="2" :step="1"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
  import {getOrgInfoByUserId,getCurrentRole13} from '@/utils/customize';
  export default {
    name: 'AssetsComponent',
    components: {},
    data() {
      return {
        roles: '',
        checkdisabled: false,
        activeName: 'first',
        tableTotal: [{}],
        tableNewYearTotal: [{}],
        tableLastYearTotal: [{}],
        tableLodYearTotal: [{}],
        options: [{
          value: '1',
          label: '1年',
        }, {
          value: '2',
          label: '3年',
        }, {
          value: '3',
          label: '5年',
        }],
      };
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      tableNewYear: {
        type: Array,
        default: [],
      },
      tableLastYear: {
        type: Array,
        default: [],
      },
      tableLodYear: {
        type: Array,
        default: [],
      },
    },
    mounted() {
      this.roles = getCurrentRole13();
      if (this.roles === '0') {
        this.checkdisabled = false;
      } else {
        this.checkdisabled = true;
      }
    },
    methods: {
      formatterDir(row, column, cellValue, index) {
        if (column.property === 'total') {
          if (index === 0) {
            return this.$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION');
          }
        }
        if (column.property === 'assetstype') {
          if (row[column.property] === '0') {
            return this.$t('label.PFANS1036FORMVIEW_PLAN');
          }
        }
        if (column.property === 'type') {
          if (index === 0) {
            return this.$t('label.PFANS1036FORMVIEW_PLAN');
          }
        }
        return row.address;
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 34) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 1,
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
      },
      objectLastYearSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 16) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 1,
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
      },
      handleChange(scope, index) {
        if (scope.prices > 0) {
          scope['money' + index] = scope.prices * scope['number' + index];
          if (index >= 4 && index <= 9) {
            scope.numberfirsthalf = (scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0);
            scope.moneyfirsthalf = (Number(scope.money4) || 0) + (Number(scope.money5) || 0) + (Number(scope.money6) || 0) + (Number(scope.money7) || 0) + (Number(scope.money8) || 0) + (Number(scope.money9) || 0);
          } else if ((index >= 10 && index <= 12) || (index >= 1 && index <= 3)) {
            scope.numbersecondhalf = (scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0);
            scope.moneysecondhalf = (Number(scope.money10) || 0) + (Number(scope.money11) || 0) + (Number(scope.money12) || 0) + (Number(scope.money1) || 0) + (Number(scope.money2) || 0) + (Number(scope.money3) || 0);
          } else {
            for (let par in scope) {
              if (par.substring(0, 5) === 'money') {
                let number = 'number' + (par.length > 6 ? par.slice(par.length - 2) : par.slice(par.length - 1));
                scope[par] = Number((scope.prices * (scope[number] || 0)).toFixed(2));
              }
            }
            scope.numberfirsthalf = (scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0);
            scope.moneyfirsthalf = (Number(scope.money4) || 0) + (Number(scope.money5) || 0) + (Number(scope.money6) || 0) + (Number(scope.money7) || 0) + (Number(scope.money8) || 0) + (Number(scope.money9) || 0);
            scope.numbersecondhalf = (scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0);
            scope.moneysecondhalf = (Number(scope.money10) || 0) + (Number(scope.money11) || 0) + (Number(scope.money12) || 0) + (Number(scope.money1) || 0) + (Number(scope.money2) || 0) + (Number(scope.money3) || 0);
          }
          scope.numberAnnual = (scope.numberfirsthalf || 0) + (scope.numbersecondhalf || 0);
          scope.moneyAnnual = (scope.moneyfirsthalf || 0) + (scope.moneysecondhalf || 0);
        }
        this.getSummaries(this.tableNewYear);
      },
      handleLastYearChange(scope, index) {
        if (scope.prices > 0) {
          scope['money' + index] = scope.prices * scope['number' + index];
          if ((index <= 5 || index == 12)) {
            scope.numbersecondhalf = (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0) + (scope.number4 || 0) + (scope.number5 || 0);
            scope.moneysecondhalf = (Number(scope.money12) || 0) + (Number(scope.money1) || 0) + (Number(scope.money2) || 0) + (Number(scope.money3) || 0) + (Number(scope.money4) || 0) + (Number(scope.money5) || 0);
          } else {
            for (let par in scope) {
              if (par.substring(0, 5) === 'money') {
                let number = 'number' + (par.length > 6 ? par.slice(par.length - 2) : par.slice(par.length - 1));
                scope[par] = Number((scope.prices * (scope[number] || 0)).toFixed(2));
              }
            }
            scope.numbersecondhalf = (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0) + (scope.number4 || 0) + (scope.number5 || 0);
            scope.moneysecondhalf = (Number(scope.money12) || 0) + (Number(scope.money1) || 0) + (Number(scope.money2) || 0) + (Number(scope.money3) || 0) + (Number(scope.money4) || 0) + (Number(scope.money5) || 0);
            scope.numberfirsthalf = (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0) + (scope.number10 || 0) + (scope.number11 || 0);
            scope.moneyfirsthalf = (Number(scope.money6) || 0) + (Number(scope.money7) || 0) + (Number(scope.money8) || 0) + (Number(scope.money9) || 0 + (Number(scope.money10) || 0) + (Number(scope.money11) || 0));
          }
          scope.numberAnnual = (scope.numberfirsthalf || 0) + (scope.numbersecondhalf || 0);
          scope.moneyAnnual = (scope.moneyfirsthalf || 0) + (scope.moneysecondhalf || 0);
        }
        this.getLastYearSummaries(this.tableLastYear);
      },
      getLodYearSummaries(table) {
        let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
        let group_id = rst.groupId || '';
        let grouplist = this.$store.getters.orgGroupList.filter(item => item.groupid === group_id);
        // let filtable = table.filter(item => item.companyen === grouplist.companyen);
        let filtable = table;
        if (filtable.length > 0) {
          let totalExpect = {};
          totalExpect.money1 = filtable[0].money1 === undefined ? 0 : filtable[0].money1;
          totalExpect.money2 = filtable[0].money2 === undefined ? 0 : filtable[0].money2;
          totalExpect.money3 = filtable[0].money3 === undefined ? 0 : filtable[0].money3;
          totalExpect.money4 = filtable[0].money4 === undefined ? 0 : filtable[0].money4;
          totalExpect.money5 = filtable[0].money5 === undefined ? 0 : filtable[0].money5;
          totalExpect.money6 = filtable[0].money6 === undefined ? 0 : filtable[0].money6;
          totalExpect.money7 = filtable[0].money7 === undefined ? 0 : filtable[0].money7;
          totalExpect.money8 = filtable[0].money8 === undefined ? 0 : filtable[0].money8
          totalExpect.money9 = filtable[0].money9 === undefined ? 0 : filtable[0].money9;
          totalExpect.money10 = filtable[0].money10 === undefined ? 0 : filtable[0].money10;
          totalExpect.money11 = filtable[0].money11 === undefined ? 0 : filtable[0].money11;
          totalExpect.money12 = filtable[0].money12 === undefined ? 0 : filtable[0].money12;
          totalExpect.moneyfirsthalf = (totalExpect.money4 + totalExpect.money5 + totalExpect.money6 + totalExpect.money7 + totalExpect.money8 + totalExpect.money9).toFixed(3);
          totalExpect.moneysecondhalf = (totalExpect.money10 + totalExpect.money11 + totalExpect.money12 + totalExpect.money1 + totalExpect.money2 + totalExpect.money3).toFixed(3);
          totalExpect.moneyAnnual = (parseFloat(totalExpect.moneyfirsthalf) + parseFloat(totalExpect.moneysecondhalf)).toFixed(3);
          this.tableLodYearTotal = [totalExpect];
        }
        this.getTableTotal();
      },
      getSummaries(table) {
        let totalExpect = {};
        let totalActual = {};
        table.forEach(
          row => {
            let sum = 0;
            for (let i = 1; i <= 12; i++) {
              if (row.assetstype1 === '1') {
                sum = Math.round((row['money' + i] || 0) / 12 * 100000) / 100000;
              } else if (row.assetstype1 === '2') {
                sum = Math.round((row['money' + i] || 0) / 36 * 100000) / 100000;
              } else if (row.assetstype1 === '3') {
                sum = Math.round((row['money' + i] || 0) / 60 * 100000) / 100000;
              }
              if (row.assetstype === '0') {
                totalExpect['money' + i] = sum + (totalExpect['money' + i] || 0);
              } else {
                totalActual['money' + i] = sum + (totalActual['money' + i] || 0);
              }
            }
            if (row.assetstype === '0') {
              totalExpect.numberfirsthalf += row.numberfirsthalf;
              totalExpect.numbersecondhalf += row.numbersecondhalf;
              totalExpect.numberAnnual += row.numberAnnual;
            } else {
              totalActual.numberfirsthalf += row.numberfirsthalf;
              totalActual.numbersecondhalf += row.numbersecondhalf;
              totalActual.numberAnnual += row.numberAnnual;
            }
          },
        );
        for (let i = 5; i <= 12; i++) {
          totalExpect['money' + i] += totalExpect['money' + (i - 1)];
        }
        totalExpect.money1 += totalExpect.money12;
        totalExpect.money2 += totalExpect.money1;
        totalExpect.money3 += totalExpect.money2;
        totalExpect.money4 = '0.000';
        totalExpect.moneyfirsthalf = (Number(totalExpect.money4) + totalExpect.money5 + totalExpect.money6 + totalExpect.money7 + totalExpect.money8 + totalExpect.money9).toFixed(3);
        totalExpect.moneysecondhalf = (totalExpect.money10 + totalExpect.money11 + totalExpect.money12 + totalExpect.money1 + totalExpect.money2 + totalExpect.money3).toFixed(3);
        totalExpect.moneyAnnual = (parseFloat(totalExpect.moneyfirsthalf) + parseFloat(totalExpect.moneysecondhalf)).toFixed(3);

        totalExpect.money5 = totalExpect.money5.toFixed(3) || 0;
        totalExpect.money6 = totalExpect.money6.toFixed(3) || 0;
        totalExpect.money7 = totalExpect.money7.toFixed(3) || 0;
        totalExpect.money8 = totalExpect.money8.toFixed(3) || 0;
        totalExpect.money9 = totalExpect.money9.toFixed(3) || 0;
        totalExpect.money10 = totalExpect.money10.toFixed(3) || 0;
        totalExpect.money11 = totalExpect.money11.toFixed(3) || 0;
        totalExpect.money12 = totalExpect.money12.toFixed(3) || 0;
        totalExpect.money1 = totalExpect.money1.toFixed(3) || 0;
        totalExpect.money2 = totalExpect.money2.toFixed(3) || 0;
        totalExpect.money3 = totalExpect.money3.toFixed(3) || 0;
        this.tableNewYearTotal = [totalExpect];
        this.getTableTotal();
      },
      getLastYearSummaries(table) {
        let totalExpect = {};
        let totalActual = {};
        let sum121 = 0;
        let sum123 = 0;
        let sum125 = 0;

        let sum11 = 0;
        let sum13 = 0;
        let sum15 = 0;

        let sum21 = 0;
        let sum23 = 0;
        let sum25 = 0;

        let sum31 = 0;
        let sum33 = 0;
        let sum35 = 0;

        table.forEach(
          row => {

            if (row.assetstype1 === '1')
            {
              sum121 = Math.round((row['money12'] || 0) / 12 * 100000) / 100000;
              sum11 = Math.round((row['money1'] || 0) / 12 * 100000) / 100000;
              sum21 = Math.round((row['money2'] || 0) / 12 * 100000) / 100000;
              sum31 = Math.round((row['money3'] || 0) / 12 * 100000) / 100000;
            }
            else if (row.assetstype1 === '2')
            {
              sum123 = Math.round((row['money12'] || 0) / 36 * 100000) / 100000;
              sum13 = Math.round((row['money1'] || 0) / 36 * 100000) / 100000;
              sum23 = Math.round((row['money2'] || 0) / 36 * 100000) / 100000;
              sum33 = Math.round((row['money3'] || 0) / 36 * 100000) / 100000;
            }
            else if (row.assetstype1 === '3')
            {
              sum125 = Math.round((row['money12'] || 0) / 60 * 100000) / 100000;
              sum15 = Math.round((row['money1'] || 0) / 60 * 100000) / 100000;
              sum25 = Math.round((row['money2'] || 0) / 60 * 100000) / 100000;
              sum35 = Math.round((row['money3'] || 0) / 60 * 100000) / 100000;
            }

            for (let i = 1; i <= 12; i++) {
              if (i == 1 && row.assetstype1 === '1')
              {
                totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum11;
                totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum21;
                totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum31;
              }
              else if(i == 2 && row.assetstype1 === '1')
              {
                totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum21;
                totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum31;
              }
              else if(i == 3 && row.assetstype1 === '1')
              {
                totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum31;
              }
              else if(row.assetstype1 === '1')
              {
                totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum121;
                totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum11;
                totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum21;
                totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum31;
              }
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum123;
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum125;
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum13;
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum15;
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum23;
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum25;
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum33;
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum35;
            }
            //
            //
            //
            //
            // for (let i = 1; i <= 12; i++) {
            //   if (row.assetstype1 === '1') {
            //     sum = Math.round((row['money' + i] || 0) / 12 * 100000) / 100000;
            //   } else if (row.assetstype1 === '2') {
            //     sum = Math.round((row['money' + i] || 0) / 36 * 100000) / 100000;
            //   } else if (row.assetstype1 === '3') {
            //     sum = Math.round((row['money' + i] || 0) / 60 * 100000) / 100000;
            //   }
            //   if (row.assetstype === '0') {
            //     totalExpect['money' + i] = sum + (totalExpect['money' + i] || 0);
            //   } else {
            //     totalActual['money' + i] = sum + (totalActual['money' + i] || 0);
            //   }
            // }
            // if (row.assetstype === '0') {
            //   totalExpect.numberfirsthalf += row.numberfirsthalf;
            //   totalExpect.numbersecondhalf += row.numbersecondhalf;
            //   totalExpect.numberAnnual += row.numberAnnual;
            // } else {
            //   totalActual.numberfirsthalf += row.numberfirsthalf;
            //   totalActual.numbersecondhalf += row.numbersecondhalf;
            //   totalActual.numberAnnual += row.numberAnnual;
            // }
          },
        );


        totalExpect.moneyfirsthalf = ((totalExpect.money4 || 0) + (totalExpect.money5 || 0)+ (totalExpect.money6 || 0) + (totalExpect.money7 || 0) + (totalExpect.money8 || 0) + (totalExpect.money9 || 0)).toFixed(3);
        totalExpect.moneysecondhalf = ((totalExpect.money10 || 0) + (totalExpect.money11 || 0) + (totalExpect.money12 || 0) + (totalExpect.money1 || 0) + (totalExpect.money2 || 0) + (totalExpect.money3 || 0)).toFixed(3);
        totalExpect.moneyAnnual = (parseFloat(totalExpect.moneyfirsthalf) + parseFloat(totalExpect.moneysecondhalf)).toFixed(3);
        totalExpect.money4 = totalExpect.money4.toFixed(3) || 0;
        totalExpect.money5 = totalExpect.money5.toFixed(3) || 0;
        totalExpect.money6 = totalExpect.money6.toFixed(3) || 0;
        totalExpect.money7 = totalExpect.money7.toFixed(3) || 0;
        totalExpect.money8 = totalExpect.money8.toFixed(3) || 0;
        totalExpect.money9 = totalExpect.money9.toFixed(3) || 0;
        totalExpect.money10 = totalExpect.money10.toFixed(3) || 0;
        totalExpect.money11 = totalExpect.money11.toFixed(3) || 0;
        totalExpect.money12 = totalExpect.money12.toFixed(3) || 0;
        totalExpect.money1 = totalExpect.money1.toFixed(3) || 0;
        totalExpect.money2 = totalExpect.money2.toFixed(3) || 0;
        totalExpect.money3 = totalExpect.money3.toFixed(3) || 0;
        this.tableLastYearTotal = [totalExpect];
        this.getTableTotal();
      },
      getTableTotal() {
        let totalExpect = {};
        for (let val in this.tableNewYearTotal[0]) {
          totalExpect[val] = (parseFloat(this.tableNewYearTotal[0][val]) + parseFloat((this.tableLastYearTotal[0][val] || 0)) + parseFloat((this.tableLodYearTotal[0][val] || 0))).toFixed(3);
        }
        this.tableTotal = [totalExpect];
        this.$emit('assets', this.tableTotal);
      },

      deleteRowF2(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
          this.getLastYearSummaries(this.tableLastYear);
        }
      },
      deleteRowF1(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
          this.getSummaries(this.tableNewYear);
        }
      },
      addRowF2(val) {
        if (val === 0) {
          this.tableNewYear.push({assetstype: '0'});
        } else {
          this.tableLastYear.push({assetstype: '0'});
        }
      },
    },
    watch: {
      tableNewYear: {
        handler(newValue, oldValue) {
          this.tableNewYear = newValue;
          this.getSummaries(newValue);
        },
        deep: true,
      },
      tableLodYear: {
        handler(newValue, oldValue) {
          this.tableLodYear = newValue;
          this.getLodYearSummaries(newValue);
        },
        deep: true,
      },
      tableLastYear: {
        handler(newValue, oldValue) {
          this.tableLastYear = newValue;
          this.getLastYearSummaries(newValue);
        },
        deep: true,
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
</style>
