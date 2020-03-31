<template>
  <div>
      <el-table :data="tableBusiness" header-cell-class-name="sub_bg_color_blue" style="width: 100%"  class="tableClass"
                 ref="table">
        <el-table-column>
            <el-table-column :label="$t('label.PFANS1036FORMVIEW_CONTENT')" align="center" width="110" :formatter="formatterDir" prop="name">
            </el-table-column>
          </el-table-column>
          <el-table-column>
            <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center" width="120" prop="prices">
              <template slot-scope="scope">
                <el-input-number :disabled="disabled" size="small" v-model="scope.row.prices" controls-position="right" @change="handleChange(scope.row)"  :min="0"  style="width:6vw"></el-input-number>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column>
            <el-table-column align="center" width="110" prop="assetstype" :formatter="formatterDir">
            </el-table-column>
          </el-table-column>
        <el-table-column :label="$t('label.April')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number4">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number4" controls-position="right" @change="handleChange(scope.row,4)"  :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money4">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money4" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number5">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number5" controls-position="right"  @change="handleChange(scope.row,5)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money5">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money5" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number6">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number6" controls-position="right" @change="handleChange(scope.row,6)"  :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money6">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money6" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number7">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number7" controls-position="right" @change="handleChange(scope.row,7)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money7">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money7" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number8">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number8" controls-position="right"  @change="handleChange(scope.row,8)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money8">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money8" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number9">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number9" controls-position="right"  @change="handleChange(scope.row,9)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money9">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money9" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="numberfirsthalf">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.numberfirsthalf" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="moneyfirsthalf">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.moneyfirsthalf" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number10">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number10" controls-position="right"  @change="handleChange(scope.row,10)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money10">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money10" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number11">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number11" controls-position="right"  @change="handleChange(scope.row,11)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money11">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money11" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number12">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number12" controls-position="right"  @change="handleChange(scope.row,12)" :min="0" style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money12">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money12" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number1">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number1" controls-position="right"  @change="handleChange(scope.row,1)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money1">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money1" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number2">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number2" controls-position="right"  @change="handleChange(scope.row,2)" :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money2">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money2" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="number3">
            <template slot-scope="scope">
              <el-input-number :disabled="disabled" size="small" v-model="scope.row.number3" controls-position="right" @change="handleChange(scope.row,3)"  :min="0"  style="width:6vw"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money3">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.money3" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="numbersecondhalf">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.numbersecondhalf" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="moneysecondhalf">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.moneysecondhalf" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110" prop="numberAnnual">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.numberAnnual" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="moneyAnnual">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.moneyAnnual" :controls="false"  :min="0"  style="width:6vw" :disabled="true"></el-input-number>
            </template>
          </el-table-column>
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
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number4" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.May')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number5" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money5" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.June')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number6" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money6"  align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.July')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number7" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money7" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.August')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number8" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money8" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.September')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number9" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money9" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numberfirsthalf" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyfirsthalf" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.October')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number10" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money10" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.November')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number11" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money11" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.December')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number12" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money12" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.January')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number1" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money1" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.February')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number2" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money2" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.March')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number3" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="money3" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numbersecondhalf" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneysecondhalf" align="center" width="110">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numberAnnual" width="110">
          </el-table-column>
          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" prop="moneyAnnual" align="center" width="110">
          </el-table-column>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  export default {
    name: 'AssetsComponent',
    components: {},
    data() {
      return {
        activeName: "first",
        tableNewYearTotal: [{assetstype:"0"}, {assetstype:"1"}]
      }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
      tableBusiness: {
        type: Array,
        default: function () {
          return [{}]
        }
      }
    },
    mounted() {

    },
    methods: {
      formatterDir(row, column, cellValue, index) {
        if (column.property === "name") {
          if (index === 0) {
            return this.$t("label.PFANS1036FORMVIEW_DOMESTICTRAVEL");
          }else if(index === 2){
            return this.$t('label.PFANS1036FORMVIEW_JAPANBUSINESSTRAVEL');
          }else if(index === 4){
            return this.$t('label.PFANS1036FORMVIEW_BUSINESSTRAVEL');
          }else if(index === 6 ){
           return  this.$t('label.PFANS1036FORMVIEW_LOCALTRANSPORT');
          }
        }
        if (column.property === "assetstype") {
          if (row[column.property] === "0") {
            return this.$t("label.PFANS1036FORMVIEW_PLAN");
          } else if (row[column.property] === "1") {
            return this.$t("label.PFANS1036FORMVIEW_ACHIEVEMENTS");
          }
        }
        if(column.property === "total"){
          if (index === 0) {
            return this.$t("label.PFANS1036FORMVIEW_TOTAL");
          }
        }
        if(column.property === "type"){
          if (index === 0) {
            return this.$t("label.PFANS1036FORMVIEW_PLAN");
          } else if (index === 1) {
            return this.$t("label.PFANS1036FORMVIEW_ACHIEVEMENTS");
          }
        }
      },
      handleChange(scope, index) {
        if (scope.prices > 0) {
          scope["money" + index] = scope.prices * scope["number" + index];
          if (index >= 4 && index <= 9) {
            scope.numberfirsthalf = (scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0);
            scope.moneyfirsthalf = (Number(scope.money4) || 0) + (Number(scope.money5) || 0) + (Number(scope.money6) || 0) + (Number(scope.money7) || 0) + (Number(scope.money8) || 0) + (Number(scope.money9) || 0);
          } else if ((index >= 10 && index <= 12) || (index >= 1 && index <= 3)) {
            scope.numbersecondhalf = (scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0);
            scope.moneysecondhalf = (Number(scope.money10) || 0) + (Number(scope.money11) || 0) + (Number(scope.money12) || 0) + (Number(scope.money1) || 0) + (Number(scope.money2) || 0) + (Number(scope.money3) || 0);
          } else {
            for (let par in scope) {
              if (par.substring(0, 5) === "money") {
                let number = "number" + (par.length > 6 ? par.slice(par.length - 2) : par.slice(par.length - 1));
                scope[par] = Number((scope.prices * (scope[number]||0)).toFixed(2));
              }
            }
            scope.numberfirsthalf = (scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0);
            scope.moneyfirsthalf = (Number(scope.money4) || 0) + (Number(scope.money5) || 0) + (Number(scope.money6) || 0) + (Number(scope.money7) || 0) + (Number(scope.money8) || 0) + (Number(scope.money9) || 0);
            scope.numbersecondhalf = (scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0);
            scope.moneysecondhalf = (Number(scope.money10) || 0) + (Number(scope.money11) || 0) + (Number(scope.money12) || 0) + (Number(scope.money1) || 0) + (Number(scope.money2) || 0) + (Number(scope.money3) || 0);
          }
          scope.numberAnnual = (scope.numberfirsthalf || 0) + (scope.numbersecondhalf || 0);
          scope.moneyAnnual = (scope.moneyfirsthalf || 0) + (scope.moneysecondhalf || 0);
          this.getSummaries(this.tableBusiness);
        }
      },
      getSummaries(table) {
        let totalExpect = {};
        let totalActual = {};
        table.forEach(
          row => {
            let sum = 0;
            for (let i = 1; i <= 12; i++) {
              if (row.assetstype === "0") {
                totalExpect["money" + i] = (row["money" + i] || 0) + (totalExpect["money" + i] || 0);
                totalExpect["number" + i] = (row["number" + i] || 0) + (totalExpect["number" + i] || 0);
              } else {
                totalActual["money" + i] = (row["money" + i] || 0) + (totalActual["money" + i] || 0);
                totalActual["number" + i] = (row["number" + i] || 0) + (totalActual["number" + i] || 0);
              }
            }
            if (row.assetstype === "0") {
              totalExpect.numberfirsthalf = (row.numberfirsthalf||0) + (totalExpect.numberfirsthalf||0);
              totalExpect.numbersecondhalf = (row.numbersecondhalf||0) + (totalExpect.numbersecondhalf||0);
              totalExpect.numberAnnual = (row.numberAnnual||0) + (totalExpect.numberAnnual||0);
              totalExpect.moneyfirsthalf = (row.moneyfirsthalf||0) + (totalExpect.moneyfirsthalf||0);
              totalExpect.moneysecondhalf = (row.moneysecondhalf||0) + (totalExpect.moneysecondhalf||0);
              totalExpect.moneyAnnual = (row.moneyAnnual||0) + (totalExpect.moneyAnnual||0);
            } else {
              totalActual.numberfirsthalf = (row.numberfirsthalf||0) + (totalActual.numberfirsthalf||0) ;
              totalActual.numbersecondhalf = (row.numbersecondhalf||0) + (totalActual.numbersecondhalf||0);
              totalActual.numberAnnual = (row.numberAnnual||0) + (totalActual.numberAnnual||0);
              totalActual.moneyfirsthalf = (row.moneyfirsthalf||0) + (totalActual.moneyfirsthalf||0);
              totalActual.moneysecondhalf = (row.moneysecondhalf||0) + (totalActual.moneysecondhalf||0);
              totalActual.moneyAnnual = (row.moneyAnnual||0) + (totalActual.moneyAnnual||0);
            }
          }
        )
        totalExpect.moneyAnnual = (parseFloat(totalExpect.moneyfirsthalf) + parseFloat(totalExpect.moneysecondhalf));
        totalActual.moneyAnnual = (parseFloat(totalActual.moneyfirsthalf) + parseFloat(totalActual.moneysecondhalf));
        this.tableNewYearTotal = [totalExpect, totalActual];
        this.$emit("travel", this.tableNewYearTotal);
      },
      deleteRowF2(index, rows) {
        if (rows.length > 2) {
          rows.splice(index, 2);
        }
      },
      addRowF2(val) {
        if (val === 0) {
          this.tableNewYear.push({assetstype: "0"});
          this.tableNewYear.push({assetstype: "1"});
        } else {
          this.tableLastYear.push({assetstype: "0"});
          this.tableLastYear.push({assetstype: "1"});
        }
      }
    },
    watch: {
      tableBusiness: {
        handler(newValue, oldValue) {
          this.tableNewYear = newValue;
          this.getSummaries(newValue);
        },
        deep: true
      }
    }
  }
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
