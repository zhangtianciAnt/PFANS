<template>
  <el-table :data="tableTrust" :summary-method="getSummaries" header-cell-class-name="sub_bg_color_blue" show-summary
            stripe>
    <el-table-column>
      <el-table-column v-if="this.check" :label="$t('label.PFANS5001FORMVIEW_ENTRUST')" align="center" prop="groupname"
                       tooltip-effect="dark" width="110">
        <template slot-scope="scope">
          <el-input v-model="scope.row.groupname" :disabled="disabled" maxlength="100"
                    style="width: 100%"></el-input>
        </template>
      </el-table-column>
      <el-table-column v-else :label="$t('label.type')" align="center" prop="groupname" width="110">
        <template slot-scope="scope">
          <el-input v-model="scope.row.groupname" :disabled="disabled" maxlength="100"
                    style="width: 100%"></el-input>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.April')" align="center" width="130">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number4"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number4" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money4" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,4)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.May')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number5"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number5" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money5" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money5" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,5)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.June')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number6"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number6" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money6" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money6" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,6)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.July')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number7"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number7" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money7" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money7" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,7)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.August')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number8"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number8" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money8" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money8" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,8)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.September')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number9"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number9" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money9" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money9" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,9)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="numberfirst"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.numberfirst" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyfirst" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.moneyfirst" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.October')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number10"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number10" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money10" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money10" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,10)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.November')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number11"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number11" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money11" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money11" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,11)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.December')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number12"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number12" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money12" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money12" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,12)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.January')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number1"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number1" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money1" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money1" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,1)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.February')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number2"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number2" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money2" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money2" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,2)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.March')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="number3"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number3" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money3" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money3" :disabled="disabled" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw" @change="handleChange(scope.row,3)">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="numbersecond"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.numbersecond" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneysecond" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.moneysecond" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
      <el-table-column v-if="this.check" :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" prop="numbertotal"
                       width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.numbertotal" :disabled="disabled" :min="0" :precision="2" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneytotal" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.moneytotal" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw">
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
    handleChange(scope, index) {
      if (index >= 4 && index <= 9) {
        scope.moneyfirst = ((Number(scope.money4) || 0) + (Number(scope.money5) || 0) + (Number(scope.money6) || 0) + (Number(scope.money7) || 0) + (Number(scope.money8) || 0) + (Number(scope.money9) || 0)).toFixed(3);
      } else if ((index >= 10 && index <= 12) || (index >= 1 && index <= 3)) {
        scope.moneysecond = ((Number(scope.money10) || 0) + (Number(scope.money11) || 0) + (Number(scope.money12) || 0) + (Number(scope.money1) || 0) + (Number(scope.money2) || 0) + (Number(scope.money3) || 0)).toFixed(3);
      } else {
        scope.moneyfirst = ((Number(scope.money4) || 0) + (Number(scope.money5) || 0) + (Number(scope.money6) || 0) + (Number(scope.money7) || 0) + (Number(scope.money8) || 0) + (Number(scope.money9) || 0)).toFixed(3);
        scope.moneysecond = ((Number(scope.money10) || 0) + (Number(scope.money11) || 0) + (Number(scope.money12) || 0) + (Number(scope.money1) || 0) + (Number(scope.money2) || 0) + (Number(scope.money3) || 0)).toFixed(3);
      }
      scope.moneytotal = (Number((scope.moneyfirst || 0)) + Number((scope.moneysecond || 0))).toFixed(3);
      this.getSummaries(this.tableTrust);
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
              return Math.round((prev + curr) * 1000) / 1000;
            } else {
              return Math.round(prev * 1000) / 1000;
            }
            // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
          }, 0);
          sums[index] = Math.round((sums[index]) * 1000) / 1000;
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
