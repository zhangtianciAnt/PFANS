<template>
  <el-table :data="tableTrustA1" :summary-method="getSummaries" show-summary stripe
            header-cell-class-name="sub_bg_color_blue">
    <el-table-column>
      <el-table-column :label="$t('label.type')" align="center" width="200" prop="name1">
        <template slot-scope="scope">
          <el-input :disabled="true" maxlength="100" style="width: 100%"
                    v-model="scope.row.name1"></el-input>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center" width="140" prop="name2">
        <template slot-scope="scope">
          <el-input :disabled="true" maxlength="100" style="width: 100%"
                    v-model="scope.row.name2"></el-input>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.April')" align="center" width="130">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money4">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money4" >
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.May')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money5">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money5"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.June')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money6">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money6"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.July')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money7">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money7"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.August')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money8">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money8"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.September')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money9">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money9"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>

    <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneyfirst">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.moneyfirst"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>

    <el-table-column :label="$t('label.October')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money10">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money10"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.November')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money11">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money11"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.December')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money12"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.January')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money1"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.February')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money2"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.March')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money3">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money3"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneysecond">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.moneysecond"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneytotal">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="true" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.moneytotal"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
  import {getDictionaryInfo} from '@/utils/customize';

  export default {
    name: 'TrustA1Component',
    components: {},
    data() {
      return {
        sum: [],
      };
    },
    props: {
      tableTrustA1: {
        type: Array,
        default: function() {
          return [{}];
        },
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
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
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
              if (!isNaN(value)) {
                return Math.round((prev + curr) * 100) / 100;
              } else {
                return Math.round(prev * 100) / 100;
              }
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
            }, 0);
            sums[index] = Math.round((sums[index]) * 100) / 100;
          } else {
            sums[index] = '';
          }
        });

        this.sum = sums;
        return sums;
      },
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

  .el-table__body .el-table__row.hover-row td {
    background-color: #fafafa;
  }
</style>
