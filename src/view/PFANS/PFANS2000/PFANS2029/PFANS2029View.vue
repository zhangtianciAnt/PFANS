<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" ref="roletable" @rowClick="rowClick"
                     :title="title" @buttonClick="buttonClick" v-loading="loading" :showSelection="isShow" :rowid="rowid">
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
    import {Message} from 'element-ui';
    import moment from "moment";
    import {getUserInfo} from '@/utils/customize';

    export default {
        name: 'PFANS2029View',
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
                postAction: process.env.BASE_API + '/punchcardrecord/importUser',
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
                punchcardrecord_date: '',
                jobnumber: '',
                loading: false,
                title: "title.PFANS2017VIEW",
                data: [],
                columns: [
                    {
                        code: 'user_id',
                        label: 'label.user_name',
                        width: 90,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'center_id',
                        label: 'label.center',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'group_id',
                        label: 'label.group',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'team_id',
                        label: 'label.team',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'punchcardrecord_date',
                        label: 'label.date',
                        width: 110,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'time_start',
                        label: 'label.PFANS2017VIEW_START',
                        width: 110,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'time_end',
                        label: 'label.PFANS2017VIEW_END',
                        width: 110,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'worktime',
                        label: 'label.PFANS2017VIEW_COUNTTIME',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'absenteeismam',
                        label: 'label.PFANS2017VIEW_ABSENTEEISMAM',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    // ADD-LXX
                    {
                        code: 'afternoon',
                        label: 'label.PFANS2017VIEW_AFTERNOON',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    // ADD-LXX
                ],
                buttonList: [
                    // {'key': 'import', 'name': 'button.import', 'disabled': false, icon: 'el-icon-upload2'},
                    {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-download'},
                    // {'key': 'export2', 'name': 'button.download2', 'disabled': false, icon: 'el-icon-download'},
                    {'key': 'detail', 'name': 'button.detailed', 'disabled': false, icon: 'el-icon-s-grid'}
                ],
                isShow: true,
              rowid:"punchcardrecord_id"
            };
        },
        mounted() {
            this.getFpans2029List();
        },
        methods: {
            rowClick(row) {
                this.jobnumber = row.jobnumber;
                this.punchcardrecord_date = row.punchcardrecord_date;
            },
            getFpans2029List() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS2029Store/getFpans2029List', {})
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {
                            let user = getUserInfo(response[j].user_id);
                            if (user) {
                                response[j].user_id = user.userinfo.customername;
                            }
                            if (response[j].punchcardrecord_date !== null && response[j].punchcardrecord_date !== "") {
                                response[j].punchcardrecord_date = moment(response[j].punchcardrecord_date).format("YYYY-MM-DD");
                            }
                            if (response[j].time_start !== null && response[j].time_start !== "") {
                                response[j].time_start = moment(response[j].time_start).format("HH:mm");
                            }
                            if (response[j].time_end !== null && response[j].time_end !== "") {
                                response[j].time_end = moment(response[j].time_end).format("HH:mm");
                            }
                            //系统服务下午四点取得考勤数据时不显示结束时间
                            if(response[j].punchcardrecord_date === moment(new Date()).format('YYYY-MM-DD')){
                                response[j].time_end = "";
                            }
                            // ADD-LXX
                            response[j].afternoon = Number(parseFloat(response[j].worktime) - parseFloat(response[j].absenteeismam)).toFixed(3)
                            if(response[j].afternoon === 0){
                                response[j].afternoon  = ""
                            }
                            // ADD-LXX
                            if(response[j].worktime === "0.00"){
                                response[j].worktime = "";
                            }
                            if(response[j].absenteeismam === "0.00"){
                                response[j].absenteeismam = "";
                            }
                        }
                        this.data = response;
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
                    this.Message = true;
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
                        this.getFpans2029List();
                    }
                }
            },
            clear(safe) {
                this.file = null;
                this.resultShow = false;
                this.Message = false;
                this.result = false;
                if (!safe) {
                    if(this.$refs.uploader != undefined){
                        this.$refs.uploader.clearFiles();
                    }
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
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                // if (val === 'import') {
                //     this.daoru = true;
                //     this.clear(false);
                // } else
                  if (val === 'export') {
                    if(this.$refs.roletable.selectedList.length === 0){
                      Message({
                        message: this.$t('normal.info_01'),
                        type: 'info',
                        duration: 2 * 1000
                      });
                      return;
                    }
                    this.selectedlist = this.$refs.roletable.selectedList;
                    import('@/vendor/Export2Excel').then(excel => {
                        const tHeader = [this.$t('label.user_name'), this.$t('label.center'), this.$t('label.group'), this.$t('label.team'), this.$t('label.date'), this.$t('label.PFANS2017VIEW_START'), this.$t('label.PFANS2017VIEW_END')];
                        const filterVal = ['user_id', 'center_id', 'group_id', 'team_id', 'punchcardrecord_date', 'time_start', 'time_end'];
                        const list = this.selectedlist;
                        const data = this.formatJson(filterVal, list);
                        excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS2029'));
                    })
                }
                if (val === 'detail') {
                    if (this.jobnumber === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS2029FormView',
                        params: {
                            jobnumber: this.jobnumber,
                            punchcardrecord_date: this.punchcardrecord_date,
                        }
                    })
                }

                //   else if('export2' === val){
                //   this.loading = true;
                //   this.$store
                //     .dispatch('PFANS2029Store/download', {})
                //     .then(response => {
                //       this.loading = false;
                //     })
                //     .catch(error => {
                //       Message({
                //         message: error,
                //         type: 'error',
                //         duration: 5 * 1000
                //       });
                //       this.loading = false;
                //     })
                // }
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-icon-upload {
    font-size: 6rem;
    color: #ffffff;
    text-align: center;
  }
</style>
