<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                     ref="roletable" :showSelection="isShow" @reget="getcustomerinfor"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    </EasyNormalTable>
    <el-dialog :visible.sync="daoru" width="50%">
      <div>
        <div style="margin-top: 1rem;margin-left: 28%">
          <el-upload
            drag
            ref="uploader"
            :action="postAction"
            :on-success="handleSuccess"
            :before-upload="handleChange"
            :headers="authHeader"
            :limit=1
            :on-remove="this.clear"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>
          </el-upload>
        </div>
        <el-row>
          <span v-if="this.resultShow">{{$t('label.PFANS2005FORMVIEW_CG')}}{{this.successCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span v-if="this.resultShow"
          >{{$t('label.PFANS2005FORMVIEW_SB')}}{{this.errorCount}}</span>
        </el-row>
        <span v-if="this.Message">{{this.cuowu}}</span>
        <div v-if="this.result">
          <el-table :data="message">
            <el-table-column :label="$t('label.PFANS2017VIEW_CUHS')" align="center" width="120%" prop="hang">
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2017VIEW_ERROR')" align="center" prop="error">
            </el-table-column>
          </el-table>
          <div class="pagination-container" style="padding-top: 2rem">
            <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit"
                           :page-sizes="[5,10,20,30,50]" :total="total" @current-change="handleCurrentChange"
                           @size-change="handleSizeChange" layout="slot,sizes, ->,prev, pager, next, jumper">
              <slot><span class="front Content_front"
                          style="padding-right: 0.5rem;font-weight: 400">{{$t('table.pagesize')}}</span></slot>
            </el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {getToken} from '@/utils/auth'
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui'
    import {getUserInfo, getDictionaryInfo,Decrypt} from '@/utils/customize';

    export default {
        name: 'PFANS6002View',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                totaldata: [],
                listQuery: {
                    page: 1,
                    limit: 5
                },
                total: 0,
                message: [{hang: '', error: '',}],
                daoru: false,
                authHeader: {'x-auth-token': getToken()},
                postAction: process.env.BASE_API + '/customerinfor/eximport',
                addActionUrl: '',
                resultShow: false,
                result: false,
                file: null,
                successCount: 0,
                errorCount: 0,
                selectedlist: [],
                Message: false,
                cuowu: '',
                downloadLoading: false,
                loading: false,
                title: "title.PFANS6002VIEW",
                data: [],
                columns: [
                    {
                        //客户名称
                        code: 'custchinese',
                        label: 'label.PFANS6002VIEW_CUSTOMERNAMEC',
                        width: 120,
                        fix: false,
                        filter: false,
                    },
                    {
                        //客户名称
                        code: 'custjapanese',
                        label: 'label.PFANS6002VIEW_CUSTOMERNAMEJ',
                        width: 120,
                        fix: false,
                        filter: false,
                    },
                    {
                        //简称
                        code: 'abbreviation',
                        label: 'label.PFANS6002FORMVIEW_ABBREVIATION',
                        width: 160,
                        fix: false,
                        filter: false,
                    },
                    {
                        //公司法人
                        code: 'liableperson',
                        label: 'label.PFANS6002FORMVIEW_LIABLEPERSON',
                        width: 120,
                        fix: false,
                        filter: false,
                    },
                    {
                        //所属公司
                        code: 'thecompany',
                        label: 'label.PFANS6003FORMVIEW_THECOMPANY',
                        width: 120,
                        fix: false,
                        filter: false,
                    },
                    {
                        //事业场编码
                        code: 'causecode',
                        label: 'label.PFANS1024VIEW_BUSINESSCODE',
                        width: 140,
                        fix: false,
                        filter: false,
                    },
                    {
                        //地域区分
                        code: 'regindiff',
                        label: 'label.PFANS6002VIEW_REGINDIFF',
                        width: 140,
                        fix: false,
                        filter: false,
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                    {'key': 'import', 'name': 'button.import', 'disabled': false, icon: 'el-icon-upload2'},
                    {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-download'},
                     {'key': 'export2', 'name': 'button.download2', 'disabled': false, icon: 'el-icon-download'},//scc 模板下载
                ],
                rowid: '',
                row: 'customerinforprimary_id',
                isShow: true,
            };
        },
        mounted() {
            this.getcustomerinfor();
        },
        methods: {
            getcustomerinfor() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS6002Store/getcustomerinforprimary')
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {

                            if (response[j].regindiff !== null && response[j].regindiff !== "") {
                                let perscale = getDictionaryInfo(response[j].regindiff);
                                if (perscale != null) {
                                    response[j].regindiff = perscale.value1;
                                }
                            }
                        }
                        this.data = response;
                        this.loading = false;
                    })
                    .catch(error => {
                        this.$message.error({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                        this.loading = false
                    })
            },
            rowClick(row) {
                this.rowid = row.customerinforprimary_id;
            },
            handleSizeChange(val) {
                this.listQuery.limit = val;
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val;
                this.getList()
            },
            getList() {
                this.loading = true;
                let start = (this.listQuery.page - 1) * this.listQuery.limit;
                let end = this.listQuery.page * this.listQuery.limit;
                if (this.totaldata) {
                    let pList = this.totaldata.slice(start, end);
                    this.message = pList;
                    this.total = this.totaldata.length
                }
                this.loading = false
            },
            handleChange(file, fileList) {
                this.clear(true);
            },
            handleSuccess(response, file, fileList) {
                if (response.code !== 0) {
                    this.cuowu = response.message;
                    this.Message = true;
                } else {
                    response.data = JSON.parse(Decrypt(response.data));
                    let datalist = [];
                    for (let c = 0; c < response.data.length; c++) {
                        let error = response.data[c];
                        error = error.substring(0, 3);
                        if (error === this.$t("label.PFANS2005FORMVIEW_SB")) {
                            this.errorCount = response.data[c].substring(4);
                            this.resultShow = true;
                        }
                        if (error === this.$t("label.PFANS2005FORMVIEW_CG")) {
                            this.successCount = response.data[c].substring(4);
                            this.resultShow = true;
                        }
                        if (error === this.$t("label.PFANS2017VIEW_D")) {
                            let obj = {};
                            var str = response.data[c];
                            var aPos = str.indexOf(this.$t("label.PFANS2017VIEW_BAN"));
                            var bPos = str.indexOf(this.$t("label.PFANS2017VIEW_DE"));
                            var r = str.substr(aPos + 1, bPos - aPos - 1);
                            obj.hang = r;
                            obj.error = response.data[c].substring(6);
                            datalist[c] = obj;
                        }
                        this.message = datalist;
                        this.totaldata = this.message;
                        if (this.errorCount === "0") {
                            this.result = false;
                        } else {
                            this.result = true;
                        }
                        this.getList();
                        this.getcustomerinfor();
                    }
                }
            },
            clear(safe) {
                this.file = null;
                this.resultShow = false;
                this.Message = false;
                this.result = false;
                if (!safe) {
                    this.$refs.uploader.clearFiles();
                }
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            buttonClick(val) {
                if (val === 'import') {
                    this.daoru = true;
                    this.clear(false);
                } else if (val === 'export') {
                  if(this.$refs.roletable.selectedList.length === 0){
                    Message({
                      message: this.$t('normal.info_01'),
                      type: 'info',
                      duration: 2 * 1000
                    });
                    return;
                  }
                  //region scc upd 21/12/2 选择导出 from
                  this.selectedlist = this.$refs.roletable.selectedList;
                  let param = [];
                  this.selectedlist.forEach(item => {
                    param.push(item.customerinforprimary_id);
                  })
                  this.loading = true;
                  this.$store
                    .dispatch('PFANS6002Store/downloadExcel', param)
                    .then(response => {
                      this.download(response, '客户信息');
                      this.loading = false;
                    })
                    .catch(error => {
                      this.$message.error({
                        message: error,
                        type: 'error',
                        duration: 1 * 1000,
                      })
                      this.loading = false;
                    });
                  //endregion scc upd 21/12/2 选择导出 to
                }else if(val === 'export2'){
                  this.loading=true;
                  this.$store
                    .dispatch('PFANS6002Store/download', {})
                    .then(response => {
                      this.loading = false;
                    })
                    .catch(error => {
                      this.$message.error({
                        message: error,
                        type: 'error',
                        duration: 5 * 1000
                      });
                      this.loading = false;
                    })
                }
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === 'update') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS6002FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
                if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS6002FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS6002FormView',
                        params: {
                            _id: '',
                            disabled: true
                        }
                    })
                }
            },

          //region scc add 人员信息excle下载 from
          download(data, filename) {
            if ('msSaveOrOpenBlob' in navigator) {
              window.navigator.msSaveOrOpenBlob(
                new Blob([data], {type: 'application/vnd.ms-excel;charset=utf-8'}),
                decodeURI(filename) + '.xlsx',
              );
            } else {
              var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
              var downloadElement = document.createElement('a');
              var href = window.URL.createObjectURL(blob); //创建下载的链接
              downloadElement.href = href;
              downloadElement.download = decodeURI(filename) + '.xlsx'; //下载后文件名
              document.body.appendChild(downloadElement);
              downloadElement.click(); //点击下载
              document.body.removeChild(downloadElement); //下载完成移除元素
              window.URL.revokeObjectURL(href); //释放掉blob对象
            }
          },
          //endregion scc add 人员信息excle下载 to
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .el-icon-upload {
    font-size: 6rem;
    color: #ffffff;
    text-align: center;
  }
</style>
