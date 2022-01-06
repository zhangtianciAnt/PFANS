/*
* FileName: lb-column.vue
* Remark: element-column
* Project: lb-element-table
* Author: LiuBing
* File Created: Tuesday, 19th March 2019 9:58:23 am
* Last Modified: Tuesday, 19th March 2019 10:14:42 am
* Modified By: LiuBing
*/

<template>
  <el-table-column v-bind="$attrs"
                   v-on="$listeners"
                   :align="column.align || align || 'left'"
                   :class-name="column.className"
                   :column-key="column.columnKey"
                   :filter-method="column.filterMethod"
                   :filter-multiple="column.filterMultiple"
                   :filter-placement="column.filterPlacement"
                   :filtered-value="column.filteredValue"
                   :filters="column.filters"
                   :fixed="column.fixed"
                   :formatter="column.formatter"
                   :header-align="column.headerAlign || headerAlign || column.align || align || 'left'"
                   :index="column.index"
                   :label=$t(column.label)
                   :label-class-name="column.labelClassName"
                   :min-width="column.minWidth"
                   :prop="column.prop"
                   :render-header="column.renderHeader"
                   :reserve-selection="column.reserveSelection || false"
                   :resizable="column.resizable || true"
                   :selectable="column.selectable"
                   :show-overflow-tooltip="column.showOverflowTooltip || false"
                   :sort-by="column.sortBy"
                   :sort-method="column.sortMethod"
                   :sort-orders="column.sortOrders"
                   :sortable="column.sortable || false"
                   :type="column.type"
                   :width="column.width"
  >

    <template slot="header"
              slot-scope="scope">
      <lb-render v-if="column.renderHeader"
                 :render="column.renderHeader"
                 :scope="scope">
      </lb-render>
      <span v-else>{{ scope.column.label }}</span>
    </template>

    <template slot-scope="scope">
      <lb-render :render="column.render"
                 :scope="scope">
      </lb-render>
    </template>

    <template v-if="column.children">
      <lb-column v-for="(col, index) in column.children"
                 :key="index"
                 :column="col">
      </lb-column>
    </template>
  </el-table-column>
</template>

<script>
import LbRender from './index_render';
import forced from './forced.js';

export default {
  name: 'LbColumn',
  props: {
    column: Object,
    headerAlign: String,
    align: String,
  },
  components: {
    LbRender,
  },
  methods: {
    setColumn() {
      if (this.column.type) {
        this.column.renderHeader = forced[this.column.type].renderHeader;
        this.column.render = this.column.render || forced[this.column.type].renderCell;
      }
      if (this.column.formatter) {
        this.column.render = (h, scope) => {
          return <span>{scope.column.formatter(scope.row, scope.column, scope.row, scope.$index)}</span>;
        };
      }
      if (!this.column.render) {
        this.column.render = (h, scope) => {
          return <span>{scope.row[scope.column.property]}</span>;
        };
      }
    },
  },
  watch: {
    column: {
      handler() {
        this.setColumn();
      },
      immediate: true,
    },
  },
};
</script>
