<template>
  <div class="EasyNormalTable" element-loading-spinner="el-icon-loading" style="height: calc(100vh - 60px - 2rem)">
    <el-card class="box-card">
      <div class="clearfix" slot="header" style="height: 20px" v-if="buttonShow">
        <easy-button-bar :data="buttonList" :systembutton="systembutton" @buttonClick="buttonClick"></easy-button-bar>
        <easy-work-flow ref="workflow"></easy-work-flow>
      </div>
      <div style="padding-bottom: 10px">
        <el-alert
          type="info"
          :description="description"
          v-if="alertshow"
          :closable="false"
          show-icon>
        </el-alert>
      </div>
      <div align="right" class="filter-container" v-if="titleShow">
        <span class="Title_front main_color" style="float:left">{{$t(title)}}{{$t('table.detail')}}
          <el-popover
            placement="right-start"
            title="温馨提示！"
            width="800"
            trigger="click">
            <div v-html="helpContent" class="el-popover__Content_customize"></div>
          <i class="el-icon-question" v-if="showHelp" slot="reference"/>
          </el-popover></span>
        <slot name="customize"></slot>
        <el-input :placeholder="defaultSerchTooltip" class="filter-item" clearable
                  style="width: 25%;vertical-align:top" v-model="searchValue">
          <el-button slot="append" icon="el-icon-search" type="primary" plain @click="inputChange"></el-button>
        </el-input>
      </div>
      <slot name="search"></slot>
      <el-table :cell-class-name="rowheight" :data="pagedate" :default-sort='defaultSort'
                :element-loading-text="$t('normal.waiting')"
                :row-key="rowid" :span-method="SpanMethod" @filter-change="tableFilter"
                @row-click="rowClick" @row-dblclick="dbrowClick" :show-summary="showSummary"
                :summary-method="summaryMethod"
                @selection-change="handleSelectionChange" @sort-change="sortChange" border
                header-cell-class-name="sub_bg_color_blue" header-row-class-name="height"
                height="calc(100vh - 60px - 15rem)"
                highlight-current-row max-height="calc(100vh - 60px - 15rem)" ref="eltable"
                :row-class-name="rowClassName"
                stripe style="width: 100%;" v-loading='loading'>
        <el-table-column reserve-selection type="selection" v-if="showSelection" width="55" :selectable="selectable">
        </el-table-column>
        <el-table-column label="NO" type="index" v-if="showIndex" width="55" fixed>
        </el-table-column>
        <el-table-column :key="item.code" :label="$t(item.label)" :label-class-name="item.labelClass"
                         v-for="item in this.columns" v-if="item.child && item.child.length > 0">
          <el-table-column :key="o.code" :label="$t(o.label)" :label-class-name="o.labelClass"
                           v-for="o in item.child" v-if="o.child && o.child.length > 0">
            <el-table-column :column-key="oo.code" :filters="oo.filter === true?filtersdata(oo):null" :fixed="oo.fix"
                             :formatter="formatter"
                             :key="oo.code"
                             :label="$t(oo.label)" :label-class-name="oo.labelClass" :min-width="oo.width"
                             :prop="oo.code"
                             align="left" show-overflow-tooltip sortable="custom"
                             v-for="oo in o.child"/>
          </el-table-column>
          <el-table-column :column-key="o.code" :filters="o.filter === true?filtersdata(o):null" :fixed="o.fix"
                           :formatter="formatter" :key="o.code"
                           :label="$t(o.label)" :label-class-name="o.labelClass" :min-width="o.width" :prop="o.code"
                           align="left" show-overflow-tooltip sortable="custom"
                           v-else/>
        </el-table-column>
        <el-table-column :column-key="item.code" :filters="item.filter === true?filtersdata(item):null"
                         :fixed="item.fix" :formatter="formatter"
                         :key="item.code"
                         :label="$t(item.label)" :label-class-name="item.labelClass" :min-width="item.width"
                         :prop="item.code"
                         align="left" show-overflow-tooltip sortable="custom"
                         v-else/>
        <!--        add_fjl_书类使用，不可更改disabled-->
        <el-table-column :label="$t('label.operation')" align="center" v-if="handleShow" width="110vw">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              plain
              :disabled="scope.row.sealstatus === undefined || scope.row.sealstatus === '' || scope.row.sealstatus === null"
              size="mini"
              type="primary"
            >{{$t('button.view')}}
            </el-button>
          </template>
        </el-table-column>
        <!--        add_fjl_书类使用，不可更改disabled-->
        <!--        add-ws-12/21-印章盖印-->
        <el-table-column :label="$t('label.PFANS4001FORMVIEW_ACCEPTSTATE')" align="center" width="110vw" v-if="handles">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.acceptstate"
              @change="handleacceptstate(scope.$index, scope.row)"
              :disabled="scope.row.modifyon"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS4001FORMVIEW_REGULATORSTATE')" align="center" v-if="handles"
                         width="130vw">
          <template slot-scope="scope">
            <el-checkbox
              :disabled="scope.row.modifyby"
              @change="handleacceptstate1(scope.$index, scope.row)"
              v-model="scope.row.regulatorstate"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column property="regulator"
                         :label="$t('label.PFANS4001FORMVIEW_REGULATOR')"
                         width="130" v-if="handles">
        </el-table-column>
        <!--        add-ws-12/21-印章盖印-->
      </el-table>
      <div class="pagination-container" style="padding-top: 20px">
        <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit"
                       :page-sizes="[10,50,100,500,99999]" :total="total" @current-change="handleCurrentChange"
                       @size-change="handleSizeChange" layout="slot,sizes, ->,prev, pager, next, jumper">
          <slot><span class="front Content_front"
                      style="padding-right: 5px;font-weight: 400">{{$t('table.total')}}{{totaldata.length}}</span>
          </slot>
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import EasyButtonBar from '@/components/EasyButtonBar';
  import {orderBy, getDictionaryInfo} from '@/utils/customize';
  import EasyWorkFlow from '@/components/EasyWorkFlow';
  import {helpContent} from '@/utils/helpContent';

  let moment = require('moment');
  export default {
    name: 'index',
    components: {
      EasyButtonBar,
      EasyWorkFlow,
    },
    data() {
      return {
        showHelp: false,
        helpContent: '',
        total: 0,
        listQuery: {
          page: 1,
          limit: 50,
        },
        fit: false,
        pagedate: [],
        searchValue: '',
        totaldata: [],
        changeIcon: 'el-icon-search',
        loading: false,
        filterlist: [],
        selectedList: [],
      };
    },
    props: {
      // 详情画面标题
      title: {
        type: String,
        default: '',
      },
      description: {
        type: String,
        default: '',
      },
      // 表格数据源
      data: {
        type: Array,
        default: function() {
          return [];
        },
      },
      // 列属性
      columns: {
        type: Array,
        default: [],
      },
      // 默认排序
      defaultSort: {
        type: Object,
      },
      // 行内容格式化
      formatter: {
        type: Function,
      },
      // 行id
      rowid: {
        type: String,
        default: '_id',
      },
      // 是否显示checkbox
      showSelection: {
        type: Boolean,
        default: false,
      },
      // 操作按钮
      handleShow: {
        type: Boolean,
        default: false,
      },
      //add-ws-12/21-印章盖印
      handle: {
        type: Boolean,
        default: false,
      },
      handles: {
        type: Boolean,
        default: false,
      },
      //add-ws-12/21-印章盖印
      hasEditBtn: {
        type: Boolean,
        default: true,
      },
      defaultSerchTooltip: {
        type: String,
      },
      buttonList: {
        type: Array,
        default: function() {
          return [
            {'key': 'new', 'name': this.$t('button.insert'), 'disabled': false, 'icon': 'el-icon-plus'},
            {'key': 'update', 'name': this.$t('button.update'), 'disabled': false, 'icon': 'el-icon-edit'},
          ];
        },
      },
      selectList: {
        type: Array,
        default: function() {
          return [];
        },
      },
      alertshow: {
        type: Boolean,
        default: false,
      },
      buttonShow: {
        type: Boolean,
        default: true,
      },
      titleShow: {
        type: Boolean,
        default: true,
      },
      // 是否显示index
      showIndex: {
        type: Boolean,
        default: false,
      },
      SpanMethod: {
        type: Function,
      },
      selectable: {
        type: Function,
      },
      rowClassName: {
        type: Function,
      },
      showSummary: {
        type: Boolean,
        default: false,
      },
      summaryMethod: {
        type: Function,
      },
      systembutton: {
        type: Array,
        default: function() {
          return [false, false, false];
        },
      },
      psearchValue: {
        type: String,
        default: '',
      },
    },
    methods: {
      handleEdit(index, row) {
        this.$emit('handleEdit', row);
      },
      //add-ws-12/21-印章盖印
      handleacceptstate(index, row) {
        this.$emit('handleacceptstate', row);
      },
      handleacceptstate1(index, row) {
        this.$emit('handleacceptstate1', row);
      },
      //add-ws-12/21-印章盖印
      handlsealid(index, row) {
        this.$emit('handlsealid', row);
      },
      rowheight({row, column, rowIndex, columnIndex}) {
        let val = row[column.columnKey];
        return 'row_height_left';
      },
      buttonClick(val) {
        this.$emit('buttonClick', val);
      },
      // 表格排序
      sortChange(column, prop, order) {
        this.totaldata = orderBy(this.totaldata, column.prop, column.order);

        // 调用分页
        this.getList();
      },
      getRowKey(row) {
        return row.id;
      },
      // 表格筛选
      tableFilter(filters) {
        this.loading = true;
        this.listQuery.page = 1;
        Object.assign(this.filterlist, filters);
        this.totaldata = this.data.filter(item => {
          let has = 0;
          Object.keys(this.filterlist).map(key => {
            if (this.filterlist[key].length > 0) {
              this.filterlist[key].map(filter => {
                if (item[key] === filter) {
                  has++;
                }
              });
            } else {
              has++;
            }
          });
          if (has === Object.keys(this.filterlist).length) {
            return true;
          } else {
            return false;
          }
        });
        if (this.searchValue !== '') {
          this.inputChange();
        }
        this.getList();
      },
      // 取分页数据
      getList() {
        this.loading = true;
        let start = (this.listQuery.page - 1) * this.listQuery.limit;
        let end = this.listQuery.page * this.listQuery.limit;
        if (this.totaldata) {
          let pList = this.totaldata.slice(start, end);
          this.pagedate = pList;
          this.total = this.totaldata.length;
        }

        this.loading = false;
      },
      // 每页最大数据变更
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      // 当前页变更
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      // 输入框筛选
      inputChange() {
        this.loading = true;
        this.listQuery.page = 1;
        let td = [];
        let len = this.data.length;

        for (let i = 0; i < len; i++) {
          let has = false;
          for (let j = 0; j < this.columns.length; j++) {
            let name = this.data[i][this.columns[j].code];
            if (name != null && name.toString().search(this.searchValue) !== -1) {
              has = true;
            }
          }
          if (has) {
            td.push(this.data[i]);
          }
        }

        // 如果清空搜索信息，则回复到未搜索之前的TableData数据
        if (this.searchValue !== '' && td.length > 0) {
          this.totaldata = td;
        } else if (this.searchValue === '') {
          if (Object.keys(this.filterlist).length > 0) {
            this.tableFilter(this.filterlist);
          } else {
            this.totaldata = this.data;
          }
        } else {
          this.totaldata = [];
        }

        this.getList();
      },
      // 初始化筛选条件
      filtersdata(column) {
        let len = this.data.length;
        let filters = new Set();
        for (let i = 0; i < len; i++) {
          filters.add({
            text: this.data[i][column.code],
            value: this.data[i][column.code],
          });

          // let item = this.data[i][column.code];
          // if(moment(item,"yyyy-MM-dd").isValid()){
          //   filters.add({
          //     text: moment(item).year(),
          //     value: moment(item).year()
          //   })
          //
          //   filters.add({
          //     text: moment(item).year() + "-" + (moment(item).month()+1),
          //     value: moment(item).year()+ "-" + (moment(item).month()+1)
          //   })
          // }
        }
        let filtersrst = [...new Set(filters)];
        var hash = {};
        filtersrst = filtersrst.reduce(function(item, next) {
          if (hash[next.text]) {
            '';
          } else {
            hash[next.text] = true && item.push(next);
          }
          return item;
        }, []);

        // filtersrst = filtersrst.sort();
        return filtersrst;
      },
      // 行点击
      rowClick(row) {
        this.$store.commit('global/SET_OPERATEID', row[this.rowid]);
        if (row.owner) {
          this.$store.commit('global/SET_OPERATEOWNER', row.owner);
        }
        this.$refs.workflow.isViewWorkflow();

        // this.$store
        //   .dispatch('tableStore/getActionsAuth', row.owner)
        //   .then(response => {
        //     this.systembutton = response
        //   })
        //   .catch(error => {
        //     this.systembutton = [false, false, false]
        //   })
        this.$emit('rowClick', row);
      },
      dbrowClick(row) {
        this.$store.commit('global/SET_OPERATEID', row[this.rowid]);
        if (row.owner) {
          this.$store.commit('global/SET_OPERATEOWNER', row.owner);
        }
        this.$refs.workflow.isViewWorkflow();
        this.$emit('dbrowClick', row);
      },
      // checkbox选中状态变更
      handleSelectionChange(val) {
        this.selectedList = val;
        this.$emit('handleSelectionChange', this.selectedList);
      },
      setCurrentRow(row) {
        this.$refs.eltable.setCurrentRow(row);
      },
      // getNewActionAuth () {
      //   this.$store
      //     .dispatch('tableStore/getNewActionAuth')
      //     .then(response => {
      //       this.systembutton = [response, false, false]
      //     })
      //     .catch(error => {
      //       this.systembutton = [false, false, false]
      //     })
      // }
    },
    created() {
      this.$parent.$emit('showPop', []);
      let Content = helpContent().filter(item => item.id == this.$router.currentRoute.name);
      if (Content.length > 0) {
        let text = Content[0].help;
        if (text.indexOf('^') != -1) {
          let code = text.substr(text.indexOf('^') + 1, 8);
          let dic = getDictionaryInfo(code);
          if (dic) {
            text = text.replace('^' + code, dic.value1);
          }
        }
        this.helpContent = text;
        if (this.helpContent.length > 0) {
          this.showHelp = true;
        }
      }
    },
    mounted() {
      this.totaldata = this.data;
      this.getList();
      // this.getNewActionAuth()
      if (this.showSelection) {
        for (let value of this.selectList) {
          this.$refs['eltable'].toggleRowSelection(value, true);
        }
      } else {
        for (let value of this.selectList) {
          this.$refs['eltable'].setCurrentRow(value);
        }

      }
    },
    watch: {
      psearchValue(val) {
        this.searchValue = val;
        if (this.searchValue !== '') {
          this.inputChange();
        }
      },
      data(value) {
        this.totaldata = value;
        this.getList();
        this.tableFilter([]);
        this.inputChange();
      },
      hasEditBtn(val) {
        this.hasEditButtonIn = val;
      },
      selectList(val) {
        if (this.showSelection) {
          for (let value of val) {
            this.$refs['eltable'].toggleRowSelection(value, true);
          }
        } else {
          for (let value of val) {
            this.$refs['eltable'].setCurrentRow(value);
          }

        }

      },
    },
  };
</script>
<style lang="scss">
  .EasyNormalTable {
    .row_height_left {
      height: 40px;
      font-size: 0.75rem;
      padding: 0px;
      text-align: left;
      background-color: transparent !important;
    }

    .row_height_right {
      height: 40px;
      font-size: 0.75rem;
      padding: 0px;
      text-align: right;
    }
  }

  /*.el-table__body-wrapper{*/
  /*overflow-x: scroll;*/
  /*height: 359px !important*/
  /*}*/
  .el-table /deep/ .current-row {
    background-color: #BDD8EE !important;
  }

  .el-form--label-top .el-form-item__label {
    float: none;
    display: inline-block;
    text-align: left;
    padding: 0 0 10px;
    font-size: 0.8rem;
    color: #005BAA;
    font-weight: bold;
  }

  .el-popover__title {
    color: #005BAA;
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 5px;
  }

  .el-popover__Content_customize {
    color: #005BAA;
    font-size: 13px;
    line-height: 1;
    padding: 2px;
  }
</style>
