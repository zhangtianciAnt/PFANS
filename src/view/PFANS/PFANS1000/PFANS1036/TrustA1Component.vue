<template>
  <el-table :data="tableTrustA1" :summary-method="getSummaries" header-cell-class-name="sub_bg_color_blue" show-summary
            stripe>
    <el-table-column>
      <el-table-column :label="$t('label.type')" align="center" prop="name1" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name1" :disabled="true" maxlength="100"
                    style="width: 100%"></el-input>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center" prop="name2" width="140">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name2" :disabled="true" maxlength="100"
                    style="width: 50%"></el-input>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.April')" align="center" width="130">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money4" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.May')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money5" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money5" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.June')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money6" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money6" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.July')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money7" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money7" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.August')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money8" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money8" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.September')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money9" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money9" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>

    <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyfirst" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.moneyfirst" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>

    <el-table-column :label="$t('label.October')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money10" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money10" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.November')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money11" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money11" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.December')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money12" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money12" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.January')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money1" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money1" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.February')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money2" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money2" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.March')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money3" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.money3" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneysecond" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.moneysecond" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneytotal" width="130">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.moneytotal" :disabled="true" :min="0" :precision="3" :step="1"
                           controls-position="right" size="small"
                           style="width:7vw"></el-input-number>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>

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
    sum: {
      handler(newValue, oldValue) {
        this.sum = newValue;
        this.$emit('sum', this.sum);
      },
      deep: true,
    },
    tableTrustA1: {
      handler(newValue, oldValue) {
        this.tableTrustA1 = newValue;
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
