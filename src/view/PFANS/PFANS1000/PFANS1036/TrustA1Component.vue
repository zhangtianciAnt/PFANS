<template>
  <el-table :data="tableTrustA1" :summary-method="getSummaries" show-summary stripe
            header-cell-class-name="sub_bg_color_blue">
    <el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')" align="center" width="200" prop="name1" :formatter="formatterDir">
      </el-table-column>
    </el-table-column>
    <el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center" width="140" prop="name2" :formatter="formatterDir">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.April')" align="center" width="130">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money4">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0"  :min="0" controls-position="right" :precision="1"  @change="(currentValue, oldValue) => changeSum(scope.row,4,oldValue,currentValue)" :step="1"
                           v-model="scope.row.money4">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.May')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money5">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0"  :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row,5)" :step="1"
                           v-model="scope.row.money5"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.June')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money6">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0" :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,6)" :step="1"
                           v-model="scope.row.money6"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.July')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money7">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,7)" :step="1"
                           v-model="scope.row.money7"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.August')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money8">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,8)" :step="1"
                           v-model="scope.row.money8"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.September')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money9">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,9)" :step="1"
                           v-model="scope.row.money9"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneyfirst">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.October')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money10">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,10)" :step="1"
                           v-model="scope.row.money10"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.November')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money11">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0" :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,11)" :step="1"
                           v-model="scope.row.money11"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.December')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,12)" :step="1"
                           v-model="scope.row.money12"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.January')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,1)" :step="1"
                           v-model="scope.row.money1"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.February')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,2)" :step="1"
                           v-model="scope.row.money2"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.March')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money3">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="scope.$index === 0"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,3)" :step="1"
                           v-model="scope.row.money3"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneysecond">
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneytotal">
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
  import {getDictionaryInfo} from '@/utils/customize';
  export default {
    name: 'TrustA1Component',
    components: {
    },
    data() {
      return{
        sum:[]
      }
    },
    props: {
      tableTrustA1: {
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

          if(getDictionaryInfo(row[column.property]) && column.property === "name1"){
            return getDictionaryInfo(row[column.property]).value1;
          }else if(getDictionaryInfo(row[column.property]) && column.property === "name2"){
            return getDictionaryInfo(row[column.property]).value2;
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
        this.sum = sums;
        return sums;
      },
      changeSum(scope, index,oldValue,currentValue) {
        this.tableTrustA1[0]["money" + index] = this.tableTrustA1[0]["money" + index] + (oldValue||0) - (currentValue||0);
          if (index >= 4 && index <= 9) {
            scope.moneyfirst = (Number(scope.money4 || 0) + Number(scope.money5 || 0) + Number(scope.money6 || 0) + Number(scope.money7 || 0) + Number(scope.money8 || 0) + Number(scope.money9 || 0)).toFixed(2);
            this.tableTrustA1[0].moneyfirst = (Number(this.tableTrustA1[0].money4 || 0) + Number(this.tableTrustA1[0].money5 || 0) + Number(this.tableTrustA1[0].money6 || 0) + Number(this.tableTrustA1[0].money7 || 0) + Number(this.tableTrustA1[0].money8 || 0) + Number(this.tableTrustA1[0].money9 || 0)).toFixed(2);
          } else if ((index >= 10 && index <= 12) || (index >= 1 && index <= 3)) {
            scope.moneysecond = (Number(scope.money10 || 0) + Number(scope.money11 || 0) + Number(scope.money12 || 0) + Number(scope.money1 || 0) + Number(scope.money2 || 0) + Number(scope.money3 || 0)).toFixed(2);
            this.tableTrustA1[0].moneysecond = (Number(this.tableTrustA1[0].money10 || 0) + Number(this.tableTrustA1[0].money11 || 0) + Number(this.tableTrustA1[0].money12 || 0) + Number(this.tableTrustA1[0].money1 || 0) + Number(this.tableTrustA1[0].money2 || 0) + Number(this.tableTrustA1[0].money3 || 0)).toFixed(2);
          }
          scope.moneytotal = (Number(scope.moneyfirst || 0) + Number(scope.moneysecond || 0)).toFixed(2);
        this.tableTrustA1[0].moneytotal = (Number(this.tableTrustA1[0].moneyfirst || 0) + Number(this.tableTrustA1[0].moneysecond || 0)).toFixed(2);
        }
    },
    watch:{
      sum:{
        handler(newValue,oldValue){
          this.sum = newValue;
          this.$emit("sum", this.sum);
        },
        deep:true
      },
      tableTrustA1:{
        handler(newValue,oldValue){
          this.tableTrustA1 = newValue;
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
