<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION')" name="first">
      <el-table :data="tableTotal" header-cell-class-name="sub_bg_color_blue" stripe>
        <el-table-column>
          <el-table-column :formatter="formatterDir" align="center" prop="total" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :formatter="formatterDir" align="center" prop="type" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.April')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money5" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money6" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money7" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money8" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money9" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyfirsthalf"
                           width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money10" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money11" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money12" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money1" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money2" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money3" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneysecondhalf"
                           width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyAnnual" width="110">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_NEWBUSINESSYEAR')" name="second">
      <el-table ref="table" :data="tableNewYear" class="tableClass" header-cell-class-name="sub_bg_color_blue"
                style="width: 100%">
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETNAME')" align="center" prop="assetsname"
                           width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.assetsname" :disabled="disabled" maxlength="20"
                        style="width: 100%"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETTYPE')" align="center" prop="assetstype1"
                           width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.assetstype1" @change="(val) => getSummaries(tableNewYear)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :disabled="disabled"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center" prop="prices"
                           width="150">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.prices" :min="0" controls-position="right"
                               style="width:8vw" @change="handleChange(scope.row)"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :formatter="formatterDir" align="center" prop="assetstype">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.April')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number4" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number4" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,4)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money4" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" prop="number5" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number5" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,5)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money5" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money5" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" prop="number6" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number6" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,6)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money6" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money6" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number7" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number7" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,7)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money7" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money7" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number8" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number8" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,8)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money8" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money8" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number9" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number9" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,9)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money9" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money9" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numberfirsthalf"
                           width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numberfirsthalf" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyfirsthalf"
                           width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneyfirsthalf" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number10" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number10" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,10)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money10" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money10" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number11" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number11" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,11)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money11" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money11" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number12" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number12" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,12)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money12" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money12" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number1" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number1" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,1)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money1" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money1" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number2" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number2" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,2)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money2" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money2" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number3" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number3" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleChange(scope.row,3)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money3" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money3" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numbersecondhalf"
                           width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numbersecondhalf" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneysecondhalf"
                           width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneysecondhalf" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numberAnnual"
                           width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numberAnnual" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyAnnual" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneyAnnual" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.operation')" align="center" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button
              :disabled="disabled"
              plain
              size="small"
              type="danger"
              @click.native.prevent="deleteRowF1(scope.$index, tableNewYear)"
            >{{ $t('button.delete') }}
            </el-button>
            <el-button
              :disabled="disabled"
              plain
              size="small"
              type="primary"
              @click="addRowF2(0)"
            >{{ $t('button.insert') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableNewYearTotal" header-cell-class-name="sub_bg_color_blue" stripe style="padding-top: 2%">
        <el-table-column>
          <el-table-column :formatter="formatterDir" align="center" prop="total" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :formatter="formatterDir" align="center" prop="type" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.April')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money5" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money6" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money7" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money8" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money9" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyfirsthalf"
                           width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money10" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money11" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money12" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money1" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money2" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money3" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneysecondhalf"
                           width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyAnnual" width="110">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_LASTBUSINESSYEAR')" name="third">
      <el-table ref="table" :data="tableLastYear" class="tableClass" header-cell-class-name="sub_bg_color_blue"
                style="width: 100%">
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETNAME')" align="center" prop="assetsname"
                           width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.assetsname" :disabled="disabled"
                        maxlength="20" style="width: 100%"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETTYPE')" align="center" prop="assetstype1"
                           width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.assetstype1" @change="(val) => getLastYearSummaries(tableLastYear)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :disabled="disabled"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center" prop="prices"
                           width="150">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.prices" :disabled="disabled" :min="0"
                               controls-position="right" style="width:8vw" @change="handleLastYearChange(scope.row)"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :formatter="formatterDir" align="center" prop="assetstype">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number12" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number12" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw"
                               @change="handleLastYearChange(scope.row,12)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money12" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money12" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number1" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number1" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleLastYearChange(scope.row,1)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money1" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money1" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number2" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number2" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleLastYearChange(scope.row,2)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money2" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money2" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number3" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number3" :disabled="disabled" :min="0"
                               controls-position="right" style="width:7vw" @change="handleLastYearChange(scope.row,3)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money3" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money3" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numbersecondhalf"
                           width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numbersecondhalf" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneysecondhalf"
                           width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneysecondhalf" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numberAnnual"
                           width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.numberAnnual" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyAnnual" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.moneyAnnual" :controls="false" :disabled="true" :min="0"
                               style="width:7vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.operation')" align="center" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button
              :disabled="disabled"
              plain
              size="small"
              type="danger"
              @click.native.prevent="deleteRowF2(scope.$index, tableLastYear)"
            >{{ $t('button.delete') }}
            </el-button>
            <el-button
              :disabled="disabled"
              plain
              size="small"
              type="primary"
              @click="addRowF2(1)"
            >{{ $t('button.insert') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableLastYearTotal" header-cell-class-name="sub_bg_color_blue" stripe style="padding-top: 2%">
        <el-table-column>
          <el-table-column :formatter="formatterDir" align="center" prop="total" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column :formatter="formatterDir" align="center" prop="type" width="110">
          </el-table-column>
        </el-table-column>

        <el-table-column :label="$t('label.April')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money5" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money6" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money7" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money8" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money9" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyfirsthalf"
                           width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money10" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money11" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money12" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money1" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money2" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money3" width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneysecondhalf"
                           width="130">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyAnnual" width="130">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_LODBUSINESSYEAR')" name="forth">
      <el-table :data="tableLodYear" header-cell-class-name="sub_bg_color_blue" stripe style="padding-top: 2%">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')" align="center" prop="companyen" width="110">
          <template slot-scope="scope">
            <el-input v-model="scope.row.companyen" :disabled="true" maxlength="100"
                      style="width: 100%"></el-input>
          </template>
        </el-table-column>

        <el-table-column :label="$t('label.April')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money4" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money5" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money5" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money6" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money6" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money7" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money7" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money8" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money8" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money9" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money9" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money10" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money10" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money11" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money11" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money12" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money12" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money1" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money1" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money2" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money2" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="150">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money3" width="130">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money3" :disabled="checkdisabled" :min="0" :precision="2"
                               :step="1" controls-position="right"
                               size="small" style="width:8.5vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
import {getCurrentRole13, getOrgInfoByUserId} from '@/utils/customize';

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
    //region scc add 10/9 设备投资 or 软件资产 from
    active: {
      type: String,
      default: '',
    },
    //endregion scc add 10/9 设备投资 or 软件资产 to
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
        //region scc add 清空个数，金额归0 from
        if (!scope['number' + index]) {
          scope['money' + index] = 0.000;
        }
        //endregion scc add 清空个数，金额归0 to
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
      //region scc add 10/9 根据设备投资或软件资产，采取不同计算方式 from
      if (this.active == 'second') {//设备投资,下月开始
        this.getSummaries(this.tableNewYear);
      }
      if (this.active == 'third') {//软件资产，当月开始
        this.getSummaries1(this.tableNewYear);
      }
      //endregion scc add 10/9 根据设备投资或软件资产，采取不同计算方式 to
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
        for (let i = 1; i <= 12; i++) {
          //事业计划设备投资、软件资产 以前事业年度合计bug ztc fr
          totalExpect['money' + i] = (filtable[0]['money' + i] || 0).toFixed(3);
          //事业计划设备投资、软件资产 以前事业年度合计bug ztc to
        }
        totalExpect.moneyfirsthalf = (Number(totalExpect.money4) + Number(totalExpect.money5) + Number(totalExpect.money6) + Number(totalExpect.money7) + Number(totalExpect.money8) + Number(totalExpect.money9)).toFixed(3);
        totalExpect.moneysecondhalf = (Number(totalExpect.money10) + Number(totalExpect.money11) + Number(totalExpect.money12) + Number(totalExpect.money1) + Number(totalExpect.money2) + Number(totalExpect.money3)).toFixed(3);
        totalExpect.moneyAnnual = (parseFloat(totalExpect.moneyfirsthalf) + parseFloat(totalExpect.moneysecondhalf)).toFixed(3);
        this.tableLodYearTotal = [totalExpect];
      }
      this.getTableTotal();
    },
    getSummaries(table) {
      let totalExpect = {};
      let totalExpectfin = {};
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
      for (let i = 1; i <= 12; i++) {
        if (i >= 4 && i <= 11) {
          if (totalExpect['money' + i] > 0) {
            for (let j = i + 1; j <= 12; j++) {
              totalExpectfin['money' + j] = (totalExpectfin['money' + j] || 0) + totalExpect['money' + i];
            }
            totalExpectfin['money1'] = (totalExpectfin['money1'] || 0) + totalExpect['money' + i];
            totalExpectfin['money2'] = (totalExpectfin['money2'] || 0) + totalExpect['money' + i];
            totalExpectfin['money3'] = (totalExpectfin['money3'] || 0) + totalExpect['money' + i];
          }
        } else if (i == 12) {
          for (let j = 1; j <= 3; j++) {
            totalExpectfin['money' + j] = (totalExpectfin['money' + j] || 0) + totalExpect['money' + i];
          }
        } else {
          for (let j = i + 1; j <= 3; j++) {
            totalExpectfin['money' + j] = (totalExpectfin['money' + j] || 0) + totalExpect['money' + i];
          }
        }
      }
      totalExpectfin.money4 = 0;
      totalExpectfin.money4 = '0.000';
      totalExpectfin.money5 = (totalExpectfin.money5 || 0).toFixed(3);
      totalExpectfin.money6 = (totalExpectfin.money6 || 0).toFixed(3);
      totalExpectfin.money7 = (totalExpectfin.money7 || 0).toFixed(3);
      totalExpectfin.money8 = (totalExpectfin.money8 || 0).toFixed(3);
      totalExpectfin.money9 = (totalExpectfin.money9 || 0).toFixed(3);
      totalExpectfin.money10 = (totalExpectfin.money10 || 0).toFixed(3);
      totalExpectfin.money11 = (totalExpectfin.money11 || 0).toFixed(3);
      totalExpectfin.money12 = (totalExpectfin.money12 || 0).toFixed(3);
      totalExpectfin.money1 = (totalExpectfin.money1 || 0).toFixed(3);
      totalExpectfin.money2 = (totalExpectfin.money2 || 0).toFixed(3);
      totalExpectfin.money3 = (totalExpectfin.money3 || 0).toFixed(3);
      //region scc upd 10/9 上期，下期，年间合计 from
      totalExpectfin.moneyfirsthalf = (Number(totalExpectfin.money4) + Number(totalExpectfin.money5) + Number(totalExpectfin.money6) + Number(totalExpectfin.money7) + Number(totalExpectfin.money8) + Number(totalExpectfin.money9)).toFixed(3);
      totalExpectfin.moneysecondhalf = (Number(totalExpectfin.money10) + Number(totalExpectfin.money11) + Number(totalExpectfin.money12) + Number(totalExpectfin.money1) + Number(totalExpectfin.money2) + Number(totalExpectfin.money3)).toFixed(3);
      totalExpectfin.moneyAnnual = ((Number(totalExpectfin.moneyfirsthalf) || 0) + (Number(totalExpectfin.moneysecondhalf) || 0)).toFixed(3);
      //endregion scc upd 10/9 上期，下期，年间合计 to
      this.tableNewYearTotal = [totalExpectfin];
      this.getTableTotal();
    },
    //region scc add 软件资产table求和 from
    getSummaries1(table) {
      let totalExpect = {};
      let totalExpectfin = {};
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
      for (let i = 1; i <= 12; i++) {
        if (i >= 4 && i <= 11) {
          if (totalExpect['money' + i] > 0) {
            for (let j = i; j <= 12; j++) {
              totalExpectfin['money' + j] = (totalExpectfin['money' + j] || 0) + totalExpect['money' + i];
            }
            totalExpectfin['money1'] = (totalExpectfin['money1'] || 0) + totalExpect['money' + i];
            totalExpectfin['money2'] = (totalExpectfin['money2'] || 0) + totalExpect['money' + i];
            totalExpectfin['money3'] = (totalExpectfin['money3'] || 0) + totalExpect['money' + i];
          }
        } else if (i == 12) {
          for (let j = 1; j <= 3; j++) {
            totalExpectfin['money' + j] = (totalExpectfin['money' + j] || 0) + totalExpect['money' + i];
          }
        } else {
          for (let j = i + 1; j <= 3; j++) {
            totalExpectfin['money' + j] = (totalExpectfin['money' + j] || 0) + totalExpect['money' + i];
          }
        }
      }
      // totalExpectfin.money4 = 0;
      // totalExpectfin.money4 = '0.000';
      totalExpectfin.money4 = (totalExpectfin.money4 || 0).toFixed(3);
      totalExpectfin.money5 = (totalExpectfin.money5 || 0).toFixed(3);
      totalExpectfin.money6 = (totalExpectfin.money6 || 0).toFixed(3);
      totalExpectfin.money7 = (totalExpectfin.money7 || 0).toFixed(3);
      totalExpectfin.money8 = (totalExpectfin.money8 || 0).toFixed(3);
      totalExpectfin.money9 = (totalExpectfin.money9 || 0).toFixed(3);
      totalExpectfin.money10 = (totalExpectfin.money10 || 0).toFixed(3);
      totalExpectfin.money11 = (totalExpectfin.money11 || 0).toFixed(3);
      totalExpectfin.money12 = (totalExpectfin.money12 || 0).toFixed(3);
      totalExpectfin.money1 = (totalExpectfin.money1 || 0).toFixed(3);
      totalExpectfin.money2 = (totalExpectfin.money2 || 0).toFixed(3);
      totalExpectfin.money3 = (totalExpectfin.money3 || 0).toFixed(3);
      totalExpectfin.moneyfirsthalf = (Number(totalExpectfin.money4) + Number(totalExpectfin.money5) + Number(totalExpectfin.money6) + Number(totalExpectfin.money7) + Number(totalExpectfin.money8) + Number(totalExpectfin.money9)).toFixed(3);
      totalExpectfin.moneysecondhalf = (Number(totalExpectfin.money10) + Number(totalExpectfin.money11) + Number(totalExpectfin.money12) + Number(totalExpectfin.money1) + Number(totalExpectfin.money2) + Number(totalExpectfin.money3)).toFixed(3);
      totalExpectfin.moneyAnnual = ((Number(totalExpectfin.moneyfirsthalf) || 0) + (Number(totalExpectfin.moneysecondhalf) || 0)).toFixed(3);
      this.tableNewYearTotal = [totalExpectfin];
      this.getTableTotal();
    },
    //endregion scc add 软件资产table求和 to
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

          if (row.assetstype1 === '1') {
            sum121 = Math.round((row['money12'] || 0) / 12 * 100000) / 100000;
            sum11 = Math.round((row['money1'] || 0) / 12 * 100000) / 100000;
            sum21 = Math.round((row['money2'] || 0) / 12 * 100000) / 100000;
            sum31 = Math.round((row['money3'] || 0) / 12 * 100000) / 100000;
          } else if (row.assetstype1 === '2') {
            sum123 = Math.round((row['money12'] || 0) / 36 * 100000) / 100000;
            sum13 = Math.round((row['money1'] || 0) / 36 * 100000) / 100000;
            sum23 = Math.round((row['money2'] || 0) / 36 * 100000) / 100000;
            sum33 = Math.round((row['money3'] || 0) / 36 * 100000) / 100000;
          } else if (row.assetstype1 === '3') {
            sum125 = Math.round((row['money12'] || 0) / 60 * 100000) / 100000;
            sum15 = Math.round((row['money1'] || 0) / 60 * 100000) / 100000;
            sum25 = Math.round((row['money2'] || 0) / 60 * 100000) / 100000;
            sum35 = Math.round((row['money3'] || 0) / 60 * 100000) / 100000;
          }

          for (let i = 1; i <= 12; i++) {
            if (i == 1 && row.assetstype1 === '1') {
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum11;
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum21;
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum31;
            } else if (i == 2 && row.assetstype1 === '1') {
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum21;
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum31;
            } else if (i == 3 && row.assetstype1 === '1') {
              totalExpect['money' + i] = (totalExpect['money' + i] || 0) + sum31;
            } else if (row.assetstype1 === '1') {
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


      totalExpect.moneyfirsthalf = ((totalExpect.money4 || 0) + (totalExpect.money5 || 0) + (totalExpect.money6 || 0) + (totalExpect.money7 || 0) + (totalExpect.money8 || 0) + (totalExpect.money9 || 0)).toFixed(3);
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
      } else {
        //region scc upd 10/9 只有一行时。清空内容 from
        // this.tableLastYear = [];
        // this.tableLastYear.push({assetstype: '0'});
        this.$emit('on-change-tableLastYear', [{assetstype: '0'}]);
        //endregion scc upd 10/9 只有一行时。清空内容 to
      }
      this.getLastYearSummaries(this.tableLastYear);
    },
    deleteRowF1(index, rows) {
      if (rows.length > 1) {
        rows.splice(index, 1);
      } else {
        //region scc upd 10/9 只有一行时。清空内容 from
        // this.tableNewYear = [];
        // this.tableNewYear.push({assetstype: '0'})
        this.$emit('on-change-tableNewYear', [{assetstype: '0'}]);
        //endregion scc upd 10/9 只有一行时。清空内容 to
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
    //region scc del from
    // tableNewYear: {
    //   handler(newValue, oldValue) {
    //     this.tableNewYear = newValue;
    //   },
    //   deep: true,
    // },
    //endregion scc del to
    //region scc add 根据设备或软件tab页，页面初始计算table from
    //todo 因为事业计划PL表统计时，设备软件数据有问题，先做删除 fr
    // active(newValue, oldVal){
    //   if (newValue == 'second') {
    //     this.getSummaries(this.tableNewYear);
    //   } else if (newValue == 'third') {
    //     this.getSummaries1(this.tableNewYear);
    //   }
    // },
    //todo 因为事业计划PL表统计时，设备软件数据有问题，先做删除 to
    //endregion scc add 根据设备或软件tab页，页面初始计算table to
    //region scc add 新事业年度，表格数据变化时，重新计算table,含删除行，子组件向父组件传递数据生效 from
    tableNewYear(newValue, oldVal) {
      this.tableNewYear = newValue;
      if (this.active == 'second') {
        this.getSummaries(this.tableNewYear);
      } else if (this.active == 'third') {
        this.getSummaries1(this.tableNewYear);
      }
      //endregion scc add 新事业年度，表格数据变化时，重新计算table,含删除行，子组件向父组件传递数据生效 to
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
<style lang="scss" rel="stylesheet/scss">
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
