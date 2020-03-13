<template>
  <el-table :data="tableTrust" :summary-method="getSummaries" show-summary stripe
            header-cell-class-name="sub_bg_color_blue">
    <el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')" align="center" width="110" prop="groupname" :formatter="formatterDir">
      </el-table-column>
    </el-table-column>
    <el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center"
                       width="140" prop="commission">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:7vw" :disabled="disabled" :min="0" controls-position="right"  @change="changeSum(scope.row)"
                           :step="1000" v-model.trim="scope.row.commission" ></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.April')" align="center" width="130">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number4">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,4)" :step="1"
                           v-model.trim="scope.row.number4">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money4">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.May')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number5">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled"  :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row,5)" :step="1"
                           v-model.trim="scope.row.number5"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money5">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.June')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number6">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,6)" :step="1"
                           v-model.trim="scope.row.number6"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money6">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.July')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number7">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,7)" :step="1"
                           v-model.trim="scope.row.number7"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money7">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.August')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number8">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,8)" :step="1"
                           v-model.trim="scope.row.number8"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money8">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.September')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number9">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,9)" :step="1"
                           v-model.trim="scope.row.number9"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money9">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="numberfirst">
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneyfirst">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.October')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number10">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,10)" :step="1"
                           v-model.trim="scope.row.number10"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money10">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.November')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number11">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,11)" :step="1"
                           v-model.trim="scope.row.number11"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money11">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.December')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number12">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,12)" :step="1"
                           v-model.trim="scope.row.number12"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.January')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number1">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,1)" :step="1"
                           v-model.trim="scope.row.number1"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.February')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number2">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,2)" :step="1"
                           v-model.trim="scope.row.number2"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.March')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number3">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,3)" :step="1"
                           v-model.trim="scope.row.number3"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money3">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="numbersecond">
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneysecond">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="numbertotal">
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneytotal">
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
  import {getDictionaryInfo} from '@/utils/customize';
  export default {
    name: 'AssetsComponent',
    components: {
    },
    data() {
      return{
         sum:[]
      }
    },
    props: {
      tableTrust: {
      type: Array,
      default: function(){
        return [{}];
        }
     },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    mounted() {

    },
    methods: {
      formatterDir(row, column,cellValue, index) {
        if(getDictionaryInfo(row[column.property])){
          return getDictionaryInfo(row[column.property]).value1;
        }
         else if(row[column.property] === "" || row[column.property] === null){
            return "-";
          }else{
            return row[column.property];
          }
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        });
        this.sum  = sums;
        return sums;
      },
      changeSum(scope, index) {
        if (scope.commission > 0) {
          scope["money" + index] = (scope.commission * scope["number" + index]/1000).toFixed(2);
          if (index >= 4 && index <= 9) {
            scope.numberfirst = ((scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0)).toFixed(1);
            scope.moneyfirst = (Number(scope.money4 || 0) + Number(scope.money5 || 0) + Number(scope.money6 || 0) + Number(scope.money7 || 0) + Number(scope.money8 || 0) + Number(scope.money9 || 0)).toFixed(2);
          } else if ((index >= 10 && index <= 12) || (index >= 1 && index <= 3)) {
            scope.numbersecond = ((scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0)).toFixed(1);
            scope.moneysecond = (Number(scope.money10 || 0) + Number(scope.money11 || 0) + Number(scope.money12 || 0) + Number(scope.money1 || 0) + Number(scope.money2 || 0) + Number(scope.money3 || 0)).toFixed(2);
          } else {
            for (let par in scope) {
              if (par.substring(0, 5) === "money") {
              let number =  "number" + (par.length > 6 ? par.slice(par.length -2) : par.slice(par.length - 1));
                scope[par] = ((scope.commission * (scope[number]||0))/1000).toFixed(2);
              }else if(par.substring(0, 6) === "number"){
                scope["money" + (par.length > 7 ? par.slice(par.length -2) : par.slice(par.length - 1))] = Number(((scope.commission * (scope[par]||0))/1000)).toFixed(2);
              }
            }
            scope.numberfirst = ((scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0)).toFixed(1);
            scope.moneyfirst = (Number(scope.money4 || 0) + Number(scope.money5 || 0) + Number(scope.money6 || 0) + Number(scope.money7 || 0) + Number(scope.money8 || 0) + Number(scope.money9 || 0)).toFixed(2);
            scope.numbersecond = ((scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0)).toFixed(1);
            scope.moneysecond = (Number(scope.money10 || 0) + Number(scope.money11 || 0) + Number(scope.money12 || 0) + Number(scope.money1 || 0) + Number(scope.money2 || 0) + Number(scope.money3 || 0)).toFixed(2);
          }
          scope.numbertotal = (Number(scope.numberfirst || 0) + Number(scope.numbersecond || 0)).toFixed(1);
          scope.moneytotal = (Number(scope.moneyfirst || 0) + Number(scope.moneysecond || 0)).toFixed(2);
        }
      }
    },
    watch:{
      tableTrust:{
        handler(newValue,oldValue){
          this.tableTrust = newValue;
        },
        deep:true
      },
      sum:{
        handler(newValue,oldValue){
          this.sum = newValue;
          this.$emit("sum", this.sum);
        },
        deep:true
      },
      disabled(val){
        this.disabled = val;
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
