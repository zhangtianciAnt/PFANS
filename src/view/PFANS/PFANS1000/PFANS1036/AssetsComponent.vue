<template>
  <el-tabs v-model="activeName4" type="border-card">
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION')" name="first">
      <el-table :data="tableE2" header-cell-class-name="sub_bg_color_blue" stripe>
        <el-table-column>
          <el-table-column align="center" width="110">
            <template slot-scope="scope">
              {{scope.row.aaa}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column align="center" width="110">
            <template slot-scope="scope">
              {{scope.row.bbb}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.April')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_NEWBUSINESSYEAR')" name="second">
      <el-table :data="tableF2" header-cell-class-name="sub_bg_color_blue" style="width: 100%"  class="tableClass"
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
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETTYPE')" align="center" width="110">
            <template slot-scope="scope">
              <el-select v-model="scope.row.assetstype1">
                <el-option
                  v-for="item in options1"
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
              <el-input-number v-model="scope.row.prices" controls-position="right"  @change="handleChange(scope.row,1)"  :min="0" :max="10" style="width:8vw"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column prop="assetstype">
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
              :disabled="!disable"
              @click.native.prevent="deleteRowF2(scope.$index, tableF2)"
              plain
              size="small"
              type="danger"
            >{{$t('button.delete')}}
            </el-button>
            <el-button
              :disabled="!disable"
              @click="addRowF2()"
              plain
              size="small"
              type="primary"
            >{{$t('button.insert')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="tableG2" header-cell-class-name="sub_bg_color_blue" stripe>
        <el-table-column>
          <el-table-column align="center" width="110">
            <template slot-scope="scope">
              {{scope.row.aaa}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column align="center" width="110">
            <template slot-scope="scope">
              {{scope.row.bbb}}
            </template>
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
      <el-table :data="tableF2" header-cell-class-name="sub_bg_color_blue" style="width: 100%"  class="tableClass"
                :span-method="objectSpanMethod" ref="table">
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
              :disabled="!disable"
              @click.native.prevent="deleteRowF2(scope.$index, tableF2)"
              plain
              size="small"
              type="danger"
            >{{$t('button.delete')}}
            </el-button>
            <el-button
              :disabled="!disable"
              @click="addRowF2()"
              plain
              size="small"
              type="primary"
            >{{$t('button.insert')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableH2" header-cell-class-name="sub_bg_color_blue" stripe>
        <el-table-column>
          <el-table-column align="center" width="110">
            <template slot-scope="scope">
              {{scope.row.aaa}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column align="center" width="110">
            <template slot-scope="scope">
              {{scope.row.bbb}}
            </template>
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
    <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_OTHER')" name="forth">
      <el-table :data="tableI2" header-cell-class-name="sub_bg_color_blue" stripe>
        <el-table-column>
          <el-table-column align="center" width="110">
            <template slot-scope="scope">
              {{scope.row.aaa}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column align="center" width="110">
            <template slot-scope="scope">
              {{scope.row.bbb}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.April')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
            <template slot-scope="scope">
              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                        v-model.trim="scope.row.place"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import {telephoneNumber} from '@/utils/validate';
  import dicselect from '../../../components/dicselect';

  export default {
    name: 'AssetsComponent',
    components: {
    },
    data() {

    },
    mounted() {

    },
    methods: {}
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
