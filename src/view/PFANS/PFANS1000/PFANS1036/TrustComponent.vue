<template>
  <el-table :data="tableTrust" :summary-method="getSummaries" show-summary stripe
            header-cell-class-name="sub_bg_color_blue">
    <el-table-column>
      <el-table-column v-if="this.check" :label="$t('label.department')" align="center" width="110" prop="groupname">
        <template slot-scope="scope">
          <el-input :disabled="disabled" maxlength="100" style="width: 100%"
                    v-model="scope.row.groupname"></el-input>
        </template>
      </el-table-column>
      <el-table-column v-else :label="$t('label.type')" align="center" width="110" prop="groupname">
        <template slot-scope="scope">
          <el-input :disabled="disabled" maxlength="100" style="width: 100%"
                    v-model="scope.row.groupname"></el-input>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column v-if="this.check">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_DEVELOPMENTRATE')" align="center"
                       width="140" prop="commission">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:7vw" :min="0" controls-position="right" :disabled="disabled"
                           :step="1000" v-model="scope.row.commission"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.April')" align="center" width="130">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number4"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number4">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money4">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money4">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.May')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number5"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number5"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money5">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money5">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.June')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number6"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number6"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money6">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money6">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.July')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number7"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number7"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money7">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money7">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.August')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number8"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number8"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money8">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money8">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.September')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number9"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number9"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money9">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money9">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="numberfirst"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.numberfirst">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneyfirst">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.moneyfirst">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.October')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number10"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number10"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money10">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money10">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.November')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number11"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number11"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money11">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money11">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.December')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number12"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number12"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money12">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.January')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number1"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number1"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money1">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.February')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number2"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number2"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money2">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.March')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number3"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.number3"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money3">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.money3">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="numbersecond"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.numbersecond">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneysecond">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.moneysecond">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="numbertotal"
                       v-if="this.check">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.numbertotal">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneytotal">
        <template slot-scope="scope">
          <el-input-number size="small" style="width:6vw" :disabled="disabled" :min="0" controls-position="right"
                           :precision="1" :step="1"
                           v-model="scope.row.moneytotal">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
  import {getDictionaryInfo} from '@/utils/customize';

  export default {
    name: 'AssetsComponent',
    components: {},
    data() {
      return {
        sum: [],
      };
    },
    props: {
      tableTrust: {
        type: Array,
        default: function() {
          return [{}];
        },
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      check: {
        type: Boolean,
        default: true,
      },
    },
    mounted() {

    },
    methods: {
      formatterDir(row, column, cellValue, index) {
        if (getDictionaryInfo(row[column.property])) {
          return getDictionaryInfo(row[column.property]).value1;
        } else if (row[column.property] === '' || row[column.property] === null) {
          return '-';
        } else {
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
    watch: {
      tableTrust: {
        handler(newValue, oldValue) {
          this.tableTrust = newValue;
        },
        deep: true,
      },
      sum: {
        handler(newValue, oldValue) {
          this.sum = newValue;
          this.$emit('sum', this.sum);
        },
        deep: true,
      },
      disabled(val) {
        this.disabled = val;
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
