<template>
  <div class="EasyNormalTable" style="min-height: 100%">
    <el-card class="box-card">
      <div class="clearfix" slot="header" style="height: 20px">
        <easy-button-bar :data="buttonList" :systembutton="systembutton" @buttonClick="buttonClick"></easy-button-bar>
      </div>
      <div align="right" class="filter-container" style="padding-bottom: 10px">
        <span class="Title_front main_color"
              style="float:left">{{$t('title.PFANS1034VIEW')}}{{$t('table.detail')}}</span>
        <slot name="customize"></slot>
        <el-input :placeholder="defaultSerchTooltip" @input="inputChange" class="filter-item"
                  style="width: 25%;vertical-align:top" v-bind:prefix-icon="changeIcon" v-model="searchValue">
        </el-input>
      </div>
      <el-table :data="this.pagedate" :default-sort='defaultSort' :element-loading-text="$t('normal.waiting')"
                :row-key="rowid"
                @filter-change="tableFilter" @row-click="rowClick" @row-dblclick="rowClick"
                @selection-change="handleSelectionChange" @sort-change="sortChange"
                header-cell-class-name="sub_bg_color_grey height" header-row-class-name="height" height="400"
                highlight-current-row max-height="400" ref="eltable"
                style="width: 100%" v-loading='loading' border default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">>
        <el-table-column reserve-selection type="selection" v-if="showSelection" width="55">
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
      </el-table>
      <div class="pagination-container" style="padding-top: 20px">
        <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit"
                       :page-sizes="[10,20,30,50]" :total="total" @current-change="handleCurrentChange"
                       @size-change="handleSizeChange" layout="slot,sizes, ->,prev, pager, next, jumper">
          <slot><span class="front Content_front"
                      style="padding-right: 5px;font-weight: 400">{{$t('table.pagesize')}}</span></slot>
        </el-pagination>
      </div>
      <div >
        <el-upload
          :action="upload"
          :file-list="fileList"
          :on-remove="fileRemove"
          :on-preview="fileDownload"
          :on-success="fileSuccess"
          :on-error="fileError"
          class="upload-demo"
          drag
          ref="upload">
          <i class="el-icon-upload"></i>
          <el-button id="aa" size="small" type="primary">点击上传</el-button>
          <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em></div>
        </el-upload>


<!--        <el-upload-->
<!--          class="upload-demo"-->
<!--          action="https://jsonplaceholder.typicode.com/posts/"-->
<!--          :on-change="handleChange"-->
<!--          :file-list="fileList">-->
<!--          <el-button size="small" type="primary">点击上传</el-button>-->
<!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--        </el-upload>-->

      </div>
    </el-card>
  </div>
</template>

<script>
    import EasyButtonBar from '@/components/EasyButtonBar'
    import {orderBy,uploadUrl} from '@/utils/customize'
    import moment from 'moment';
    import {Message} from 'element-ui';

    export default {
        name: 'PFANS1034View',
        components: {
            EasyButtonBar
        },
        data() {
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
                selectedList: [],
                folderid:'',
                uploadfile:'',
                fileList: [],
                upload: uploadUrl(),
                // 行id
                rowid: 'folderid',
                // 列属性
                columns: [
                    {
                        code: 'filename',
                        label: 'label.PFANS1034VIEW_FILENAME',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'filesize',
                        label: 'label.PFANS1034VIEW_FILESIZE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'updatedate',
                        label: 'label.PFANS1034VIEW_UPDATEDATE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'updateperson',
                        label: 'label.PFANS1034VIEW_UPDATEPERSON',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                ],
                tableData: [{
                    folderid: 1,
                    filename: '文件夹1',
                    filesize: '31M',
                    updatedate: '2019-10-27',
                    updateperson: '大一',
                    url: '',
                    children: []
                }, {
                    folderid: 2,
                    filename: '文件夹2',
                    filesize: '99M',
                    updatedate: '2019-10-27',
                    updateperson: '大二',
                    url: '',
                    children: []
                }, {
                    folderid: 3,
                    filename: '文件夹3',
                    filesize: '109M',
                    updatedate: '2019-10-27',
                    updateperson: '大三',
                    url: '',
                    children: [{
                        folderid: 31,
                        filename: '文件夹31',
                        filesize: '109M',
                        updatedate: '2019-10-27',
                        updateperson: '大三',
                        url: '',
                    }, {
                        folderid: 32,
                        filename: '文件夹32',
                        filesize: '109M',
                        updatedate: '2019-10-27',
                        updateperson: '大三',
                        url: '',
                    }]
                }, {
                    folderid: 4,
                    filename: '文件夹3',
                    filesize: '109M',
                    updatedate: '2019-10-27',
                    updateperson: '大四',
                    url: '',
                    children: []
                }],
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
            // 默认排序
            defaultSort: {
                type: Object
            },
            // 行内容格式化
            formatter: {
                type: Function
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
                        {'key': 'folder', 'name': 'button.folder', 'disabled': false, 'icon': 'el-icon-folder-add'},
                        {'key': 'upload', 'name': 'button.upload', 'disabled': false, 'icon': 'el-icon-upload2'},
                        {'key': 'download', 'name': 'button.download', 'disabled': false, 'icon': 'el-icon-download'},
                        {'key': 'delete', 'name': 'button.delete', 'disabled': false, 'icon': 'el-icon-delete'},
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
            fileError(err, file, fileList) {
                Message({
                    message: this.$t("normal.error_04"),
                    type: 'error',
                    duration: 5 * 1000
                });
            },
            fileRemove(file, fileList) {
                this.fileList = [];
                this.uploadfile = "";
                for (var item of fileList) {
                    let o = {};
                    o.name = item.name;
                    o.url = item.url;
                    this.fileList.push(o);
                    this.uploadfile += item.name + "," + item.url + ";"
                }
            },
            fileDownload(file) {
                debugger;
                if (file.url) {
                    var url = downLoadUrl(file.url);
                    window.open(url);
                }

            },
            fileSuccess(response, file, fileList) {
                debugger;
                this.fileList = [];
                this.uploadfile = "";
                for (var item of fileList) {
                    let o = {};
                    o.name = item.name;
                    if (!item.url) {
                        o.url = item.response.info;
                    } else {
                        o.url = item.url;
                    }
                    this.fileList.push(o);
                    this.uploadfile += o.name + "," + o.url + ";"


                    let letfolderid = 0;
                    if(this.tableData.length > 0){
                        letfolderid = this.tableData[this.tableData.length - 1].folderid + 1;
                    }
                    let updateperson;
                    if(this.$store.getters.userinfo){
                        updateperson = this.$store.getters.userinfo.userinfo.customername;
                    }
                    this.tableData.push({
                        folderid: letfolderid,
                        filename: '文件夹' + moment(new Date()).format('YYYY-MM-DD'),
                        filesize: '',
                        updatedate: moment(new Date()).format('YYYY-MM-DD'),
                        updateperson: updateperson,
                        url: '',
                        children: []
                    });
                    this.totaldata = this.tableData
                    this.getList()

                }
            },
            buttonClick(val) {
                this.$emit("buttonClick", val);
                if(val == 'folder'){
                    let letfolderid = 0;
                    if(this.tableData.length > 0){
                        letfolderid = this.tableData[this.tableData.length - 1].folderid + 1;
                    }
                    let updateperson;
                    if(this.$store.getters.userinfo){
                        updateperson = this.$store.getters.userinfo.userinfo.customername;
                    }
                    this.tableData.push({
                        folderid: letfolderid,
                        filename: '文件夹' + moment(new Date()).format('YYYY-MM-DD'),
                        filesize: '',
                        updatedate: moment(new Date()).format('YYYY-MM-DD'),
                        updateperson: updateperson,
                        url: '',
                        children: []
                    });
                    this.totaldata = this.tableData
                    this.getList()
                }
                else if(val == 'upload'){//111
                  document.getElementById("aa").click();
                }
                else if(val == 'download'){

                }
                else if(val == 'delete'){
                  if (this.folderid === '') {
                      Message({
                          message: this.$t('normal.info_01'),
                          type: 'error',
                          duration: 2 * 1000
                      });
                      return;
                  }
                  let deleteflg = 0;
                  for(let i = 0;i <= this.tableData.length;i++){
                      if(this.tableData.length > i){
                          if(this.tableData[i].folderid === this.folderid){
                              this.tableData.splice(i,1);
                              deleteflg = 1;
                          }
                          if(this.tableData.length > 0){
                              let letchildren = this.tableData[i].children;
                              for(let j = 0;j <= letchildren.length;j++){
                                  if(letchildren.length > j){
                                      if(letchildren[j].folderid === this.folderid){
                                          this.tableData[i].children.splice(j,1);
                                          deleteflg = 1;
                                      }
                                  }
                              }
                          }
                      }
                  }
                  this.totaldata = this.tableData
                  this.getList()
                  if(deleteflg === 0){
                      Message({
                          message: this.$t('normal.info_01'),
                          type: 'error',
                          duration: 2 * 1000
                      });
                      return;
                  }
                }
                //this.$emit('buttonClick', val)
            },
            // 表格排序
            sortChange(column, prop, order) {
                this.totaldata = orderBy(this.totaldata, column.prop, column.order)

                // 调用分页
                this.getList()
            },
            // 表格筛选
            tableFilter(filters) {
                this.loading = true
                this.listQuery.page = 1
                Object.assign(this.filterlist, filters)
                this.totaldata = this.data.filter(item => {
                    let has = 0
                    Object.keys(this.filterlist).map(key => {
                        if (this.filterlist[key].length > 0) {
                            this.filterlist[key].map(filter => {
                                if (item[key] === filter) {
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
            getList() {
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
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            // 当前页变更
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            // 输入框筛选
            inputChange() {
                this.loading = true
                this.listQuery.page = 1
                let td = []
                let len = this.totaldata.length

                for (let i = 0; i < len; i++) {
                    let has = false
                    for (let j = 0; j < this.columns.length; j++) {
                        let name = this.totaldata[i][this.columns[j].code]
                        if (name != null && name.toString().search(this.searchValue) !== -1) {
                            has = true
                        }
                    }
                    if (has) {
                        td.push(this.totaldata[i])
                    }
                }

                // 如果清空搜索信息，则回复到未搜索之前的TableData数据
                if (this.searchValue !== '' && td.length > 0) {
                    this.totaldata = td
                } else if (this.searchValue === '') {
                    if (Object.keys(this.filterlist).length > 0) {
                        this.tableFilter(this.filterlist)
                    } else {
                        this.totaldata = this.tableData
                    }
                } else {
                    this.totaldata = []
                }

                this.getList()
            },
            // 初始化筛选条件
            filtersdata(column) {
                let len = this.tableData.length
                let filters = new Set()
                for (let i = 0; i < len; i++) {
                    filters.add({
                        text: this.tableData[i][column.code],
                        value: this.tableData[i][column.code]
                    })
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
                return filtersrst
            },
            // 行点击
            rowClick(row) {
                this.folderid = row.folderid;
                this.$store.commit('global/SET_OPERATEID', row[this.rowid])
                this.$store
                    .dispatch('tableStore/getActionsAuth', row.owner)
                    .then(response => {
                        this.systembutton = response
                    })
                    .catch(error => {
                        this.systembutton = [false, false, false]
                    })
                this.$emit('rowClick', row)
            },
            // checkbox选中状态变更
            handleSelectionChange(val) {
                //alert(val[0].folderid)
                this.selectedList = val
                this.$emit('handleSelectionChange', this.selectedList)
            },
            setCurrentRow(row) {
                this.$refs.eltable.setCurrentRow(row)
            },
            getNewActionAuth() {
                this.$store
                    .dispatch('tableStore/getNewActionAuth')
                    .then(response => {
                        this.systembutton = [response, false, false]
                    })
                    .catch(error => {
                        this.systembutton = [false, false, false]
                    })
            }
        },
        mounted() {
            this.totaldata = this.tableData
            this.getList()
            this.getNewActionAuth()
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
            data(value) {
                this.totaldata = this.tableData
                this.getList()
                this.tableFilter([])
                this.inputChange()
            },
            hasEditBtn(val) {
                this.hasEditButtonIn = val
            },
            selectList(val) {
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
  }
</style>
