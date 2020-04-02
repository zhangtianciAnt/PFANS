<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :data="data" :buttonList="buttonList"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :rowid="rowid"
                     >
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
        <span v-if="this.Message1">{{this.cuowu}}</span>
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
    import {Message} from 'element-ui';
    let moment = require("moment");
    export default {
        name: 'PFANS1043View',
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
                Message1: true,
                result: false,
                cuowu: '',
                daoru: false,
                checkTableData: [],
                authHeader: {'x-auth-token': getToken()},
                postAction: process.env.BASE_API + '/themeinfor/importUser',
                addActionUrl: '',
                resultShow: false,
                file: null,
                successCount: 0,
                errorCount: 0,
                errorList: [],
                downloadLoading: false,
                loading: false,
                title: "title.PFANS1043VIEW",
                data: [],
                transferData: [],
                selectedlist: [],
                columns: [
                    {
                        code: 'number',
                        label: 'label.PFANS1043FORMVIEW_NUMBER',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'themename',
                        label: 'label.PFANS1043FORMVIEW_NAME',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                ],
                buttonList: [
                    // {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    // {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    // {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                    // {'key': 'import', 'name': 'button.import', 'disabled': false, icon: 'el-icon-download'},
                ],
                row: '',
                rowid: 'logmanagement_id',
            };
        },
        mounted() {
            this.getlistname();
            this.$store.commit('global/SET_OPERATEID', '');
        },
        methods: {
            getlistname() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1043Store/getFpans1043List', {})
                    .then(response => {
                        const data = [];
                        for (let j = 0; j < response.length; j++) {
                            data.push({
                                themename: response[j].themename,
                                number: j + 1,
                            });
                        }
                        this.data = data;
                        this.loading = false;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                        this.loading = false;
                    })
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            getList() {
                this.loading = true
                let start = (this.listQuery.page - 1) * this.listQuery.limit
                let end = this.listQuery.page * this.listQuery.limit
                if (this.totaldata) {
                    let pList = this.totaldata.slice(start, end)
                    this.message = pList
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
                    this.Message1 = true;
                } else {
                    let datalist = [];
                    for (let c = 0; c < response.data.length; c++) {
                        let error = response.data[c];
                        error = error.substring(0, 3);
                        if (error === this.$t("label.PFANS2005FORMVIEW_SB")) {
                            this.errorCount = response.data[c].substring(4)
                            this.resultShow = true;
                        }
                        if (error === this.$t("label.PFANS2005FORMVIEW_CG")) {
                            this.successCount = response.data[c].substring(4)
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
                        this.getlistname();
                    }
                }
            },
            clear(safe) {
                this.file = null;
                this.resultShow = false;
                this.Message1 = false;
                this.result = false;
                if (!safe) {
                    this.$refs.uploader.clearFiles();
                }
            },
            rowClick(row) {
                this.row = row.logmanagement_id;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path)
                if (val === 'update') {
                    if (this.row === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        })
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS1043FormView',
                        params: {
                            _id: this.row,
                            disabled: true
                        }
                    });
                } else if (val === 'view') {
                    if (this.row === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        })
                        return;
                    }
                    this.$router.push({
                        name: "PFANS1043FormView",
                        params: {
                            _id: this.row,
                            disabled: false
                        }
                    });
                } else if (val === 'insert') {
                    this.$router.push({
                        name: "PFANS1043FormView",
                        params: {
                            _id: "",
                            disabled: true
                        }
                    });
                } else if (val === 'import') {
                    this.daoru = true;
                }
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
