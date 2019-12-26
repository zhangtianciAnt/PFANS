<template>
  <div class="EasyNormalTable" style="min-height: 100%" element-loading-spinner="el-icon-loading">
    <el-card class="box-card">
      <div class="clearfix" slot="header" style="height: 20px">
        <easy-button-bar :data="buttonList" :systembutton="systembutton" @buttonClick="buttonClick"></easy-button-bar>
        <easy-work-flow ref="workflow"> </easy-work-flow>
      </div>
      <div align="right" class="filter-container" style="padding-bottom: 10px">
        <span class="Title_front main_color" style="float:left">{{$t(title)}}{{$t('table.detail')}}</span>
        <slot name="customize"></slot>
        <el-input :placeholder="defaultSerchTooltip" @input="inputChange" class="filter-item"
                  style="width: 25%;vertical-align:top" v-bind:prefix-icon="changeIcon" v-model="searchValue">
        </el-input>
      </div>
      <el-table :data="this.pagedate" :default-sort='defaultSort' :element-loading-text="$t('normal.waiting')" :row-key="rowid"
                @filter-change="tableFilter" @row-click="rowClick" @row-dblclick="rowClick" @selection-change="handleSelectionChange" @sort-change="sortChange"
                header-cell-class-name="sub_bg_color_grey height" header-row-class-name="height" height="400"
                highlight-current-row max-height="400" ref="eltable"
                style="width: 100%" v-loading='loading' cell-class-name = "row_height">
        <el-table-column reserve-selection type="selection" v-if="showSelection" width="55">
        </el-table-column>
        <el-table-column :key="item.code" :label="$t(item.label)" :label-class-name="item.labelClass"
                         v-for="item in this.columns" v-if="item.child && item.child.length > 0">
          <el-table-column :key="o.code" :label="$t(o.label)" :label-class-name="o.labelClass"
                           v-for="o in item.child" v-if="o.child && o.child.length > 0">
            <el-table-column :column-key="oo.code" :filters="oo.filter === true?filtersdata(oo):null" :fixed="oo.fix" :formatter="formatter"
                             :key="oo.code"
                             :label="$t(oo.label)" :label-class-name="oo.labelClass" :min-width="oo.width" :prop="oo.code"
                             align="left" show-overflow-tooltip sortable="custom"
                             v-for="oo in o.child"/>
          </el-table-column>
          <el-table-column :column-key="o.code" :filters="o.filter === true?filtersdata(o):null" :fixed="o.fix" :formatter="formatter" :key="o.code"
                           :label="$t(o.label)" :label-class-name="o.labelClass" :min-width="o.width" :prop="o.code"
                           align="left" show-overflow-tooltip sortable="custom"
                           v-else/>
        </el-table-column>
        <el-table-column :column-key="item.code" :filters="item.filter === true?filtersdata(item):null" :fixed="item.fix" :formatter="formatter"
                         :key="item.code"
                         :label="$t(item.label)" :label-class-name="item.labelClass" :min-width="item.width" :prop="item.code"
                         align="left" show-overflow-tooltip sortable="custom"
                         v-else/>
      </el-table>
      <div class="pagination-container" style="padding-top: 20px">
        <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit"
                       :page-sizes="[10,20,30,50]" :total="total" @current-change="handleCurrentChange"
                       @size-change="handleSizeChange" layout="slot,sizes, ->,prev, pager, next, jumper">
          <slot><span class="front Content_front"
                      style="padding-right: 5px;font-weight: 400">{{$t('table.pagesize')}}</span></slot>
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import EasyButtonBar from '@/components/EasyButtonBar'
  import {orderBy} from '@/utils/customize'
  import EasyWorkFlow from '@/components/EasyWorkFlow'
  let moment = require('moment')
  export default {
    name: 'index',
    components: {
      EasyButtonBar,
      EasyWorkFlow
    },
    data () {
      return {
        total: 0,
        listQuery: {
          page: 1,
          limit: 10
        },
        pagedate: [],
        searchValue: '',
        totaldata: [],
        changeIcon: 'el-icon-search',
        loading: false,
        filterlist: [],
        systembutton: [false, false, false],
        selectedList: []
      }
    },
    props: {
      // 详情画面标题
      title: {
        type: String,
        default: ''
      },
      // 表格数据源
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 列属性
      columns: {
        type: Array,
        default: []
      },
      // 默认排序
      defaultSort: {
        type: Object
      },
      // 行内容格式化
      formatter: {
        type: Function
      },
      // 行id
      rowid: {
        type: String,
        default: '_id'
      },
      // 是否显示checkbox
      showSelection: {
        type: Boolean,
        default: false
      },
      hasEditBtn: {
        type: Boolean,
        default: true
      },
      defaultSerchTooltip: {
        type: String
      },
      buttonList: {
        type: Array,
        default: function () {
          return [
            {'key': 'new', 'name': this.$t('button.insert'), 'disabled': false, 'icon': 'el-icon-plus'},
            {'key': 'update', 'name': this.$t('button.update'), 'disabled': false, 'icon': 'el-icon-edit'}
          ]
        }
      },
      selectList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      buttonClick (val) {
        this.$emit('buttonClick', val)
      },
      // 表格排序
      sortChange (column, prop, order) {
        this.totaldata = orderBy(this.totaldata, column.prop, column.order)

        // 调用分页
        this.getList()
      },
      // 表格筛选
      tableFilter (filters) {
        this.loading = true
        this.listQuery.page = 1
        Object.assign(this.filterlist, filters)
        this.totaldata = this.data.filter(item => {
          let has = 0
          Object.keys(this.filterlist).map(key => {
            if (this.filterlist[key].length > 0) {
              this.filterlist[key].map(filter => {
                if (item[key] === filter || item[key].indexOf(filter) >= 0) {
                  has++
                }
              })
            } else {
              has++
            }
          })
          if (has === Object.keys(this.filterlist).length) {
            return true
          } else {
            return false
          }
        })
        if (this.searchValue !== '') {
          this.inputChange()
        }
        this.getList()
      },
      // 取分页数据
      getList () {
        this.loading = true
        let start = (this.listQuery.page - 1) * this.listQuery.limit
        let end = this.listQuery.page * this.listQuery.limit
        if (this.totaldata) {
          let pList = this.totaldata.slice(start, end)
          this.pagedate = pList
          this.total = this.totaldata.length
        }

        this.loading = false
      },
      // 每页最大数据变更
      handleSizeChange (val) {
        this.listQuery.limit = val
        this.getList()
      },
      // 当前页变更
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.getList()
      },
      // 输入框筛选
      inputChange () {
        this.loading = true
        this.listQuery.page = 1
        let td = []
        let len = this.data.length

        for (let i = 0; i < len; i++) {
          let has = false
          for (let j = 0; j < this.columns.length; j++) {
            let name = this.data[i][this.columns[j].code]
            if (name != null && name.toString().search(this.searchValue) !== -1) {
              has = true
            }
          }
          if (has) {
            td.push(this.data[i])
          }
        }

        // 如果清空搜索信息，则回复到未搜索之前的TableData数据
        if (this.searchValue !== '' && td.length > 0) {
          this.totaldata = td
        } else if (this.searchValue === '') {
          if (Object.keys(this.filterlist).length > 0) {
            this.tableFilter(this.filterlist)
          } else {
            this.totaldata = this.data
          }
        } else {
          this.totaldata = []
        }

        this.getList()
      },
      // 初始化筛选条件
      filtersdata (column) {
        let len = this.data.length
        let filters = new Set()
        for (let i = 0; i < len; i++) {
          filters.add({
            text: this.data[i][column.code],
            value: this.data[i][column.code]
          })

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
        let filtersrst = [...new Set(filters)]
        var hash = {}
        filtersrst = filtersrst.reduce(function (item, next) {
          if (hash[next.text]) {
            ''
          } else {
            hash[next.text] = true && item.push(next)
          }
          return item
        }, [])

        // filtersrst = filtersrst.sort();
        return filtersrst;
      },
      // 行点击
      rowClick (row) {
        this.$store.commit('global/SET_OPERATEID', row[this.rowid])
        this.$refs.workflow.isViewWorkflow()

        // this.$store
        //   .dispatch('tableStore/getActionsAuth', row.owner)
        //   .then(response => {
        //     this.systembutton = response
        //   })
        //   .catch(error => {
        //     this.systembutton = [false, false, false]
        //   })
        this.$emit('rowClick', row)
      },
      // checkbox选中状态变更
      handleSelectionChange (val) {
        this.selectedList = val
        this.$emit('handleSelectionChange', this.selectedList)
      },
      setCurrentRow (row) {
        this.$refs.eltable.setCurrentRow(row)
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
    mounted () {
      this.totaldata = this.data
      this.getList()
      // this.getNewActionAuth()
      if (this.showSelection) {
        for (let value of this.selectList) {
          this.$refs['eltable'].toggleRowSelection(value, true)
        }
      } else {
        for (let value of this.selectList) {
          this.$refs['eltable'].setCurrentRow(value)
        }

      }
    },
    watch: {
      data (value) {
        this.totaldata = value
        this.getList()
        this.tableFilter([])
        this.inputChange()
      },
      hasEditBtn (val) {
        this.hasEditButtonIn = val
      },
      selectList (val) {
        if (this.showSelection) {
          for (let value of val) {
            this.$refs['eltable'].toggleRowSelection(value, true)
          }
        } else {
          for (let value of val) {
            this.$refs['eltable'].setCurrentRow(value)
          }

        }

      }
    }
  }
</script>
<style lang="scss">
  .EasyNormalTable {
    .height {
      height: 40px;
      padding: 0px;
    }
    .row_height {
      height: 40px;
      font-size: 0.8rem;
      padding: 0px;
    }
  }
  /*.el-table__body-wrapper{*/
    /*overflow-x: scroll;*/
    /*height: 359px !important*/
  /*}*/
</style>
