<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                     ref="roletable" :showSelection="isShow"
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
    import {getUserInfo, getDictionaryInfo} from '@/utils/customize';

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
                        label: 'label.PFANS5001FORMVIEW_CUSTOMERNAME',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //负责人
                        code: 'liableperson',
                        label: 'label.ASSETS1002VIEW_USERID',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //项目联络人
                        code: 'prochinese',
                        label: 'label.PFANS6002FORMVIEW_PROJECTPERSON',
                        width: 140,
                        fix: false,
                        filter: true,
                    },
                    {
                        //联系电话
                        code: 'protelephone',
                        label: 'label.PFANS2003FORMVIEW_CONTACTINFORMATION',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //共同事务联络人
                        code: 'commontperson',
                        label: 'label.PFANS6002VIEW_COMMONTPERSON',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        //联系电话
                        code: 'comtelephone',
                        label: 'label.PFANS2003FORMVIEW_CONTACTINFORMATION',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //地址
                        code: 'addchinese',
                        label: 'label.PFANS6002VIEW_ADDRESS',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //人员规模
                        code: 'perscale',
                        label: 'label.PFANS6002VIEW_PERSCALE',
                        width: 120,
                        fix: false,
                        filter: true,
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                    {'key': 'import', 'name': 'button.import', 'disabled': false, icon: 'el-icon-upload2'},
                    {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-download'},
                    // {'key': 'export2', 'name': 'button.download2', 'disabled': false, icon: 'el-icon-download'},
                ],
                rowid: '',
                row: 'customerinfor_id',
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
                    .dispatch('PFANS6002Store/getcustomerinfor')
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {
                            if (response[j].custchinese !== null && response[j].custchinese !== "") {
                                let custchinese = getUserInfo(response[j].custchinese);
                                if (custchinese) {
                                    response[j].custchinese = user.userinfo.customername;
                                }
                            }
                            if (response[j].liableperson !== null && response[j].liableperson !== "") {
                                let liableperson = getUserInfo(response[j].liableperson);
                                if (liableperson) {
                                    response[j].liableperson = user.userinfo.customername;
                                }
                            }
                            if (response[j].prochinese !== null && response[j].prochinese !== "") {
                                let prochinese = getUserInfo(response[j].prochinese);
                                if (prochinese) {
                                    response[j].prochinese = user.userinfo.customername;
                                }
                            }
                            if (response[j].protelephone !== null && response[j].protelephone !== "") {
                                let protelephone = getUserInfo(response[j].protelephone);
                                if (protelephone) {
                                    response[j].protelephone = user.userinfo.customername;
                                }
                            }
                            if (response[j].commontperson !== null && response[j].commontperson !== "") {
                                let commontperson = getUserInfo(response[j].commontperson);
                                if (commontperson) {
                                    response[j].commontperson = user.userinfo.customername;
                                }
                            }
                            if (response[j].comtelephone !== null && response[j].comtelephone !== "") {
                                let comtelephone = getUserInfo(response[j].comtelephone);
                                if (comtelephone) {
                                    response[j].comtelephone = user.userinfo.customername;
                                }
                            }
                            if (response[j].addchinese !== null && response[j].addchinese !== "") {
                                let addchinese = getUserInfo(response[j].addchinese);
                                if (addchinese) {
                                    response[j].addchinese = user.userinfo.customername;
                                }
                            }
                            if (response[j].perscale !== null && response[j].perscale !== "") {
                                let perscale = getDictionaryInfo(response[j].perscale);
                                if (perscale != null) {
                                    response[j].perscale = perscale.value1;
                                }
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
                        this.loading = false
                    })
            },
            rowClick(row) {
                this.rowid = row.customerinfor_id;
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
                } else if (val === 'export') {
                    this.selectedlist = this.$refs.roletable.selectedList;
                    import('@/vendor/Export2Excel').then(excel => {
                        const tHeader = [
                            this.$t('label.PFANS6002VIEW_CUSTOMERNAMEC'),
                            this.$t('label.PFANS6002VIEW_CUSTOMERNAMEJ'),
                            this.$t('label.PFANS6002VIEW_CUSTOMERNAMEE'),
                            this.$t('label.PFANS6002FORMVIEW_ABBREVIATION'),
                            this.$t('label.ASSETS1002VIEW_USERID'),
                            this.$t('label.PFANS6002VIEW_PROJECTNAMEC'),
                            this.$t('label.PFANS6002VIEW_PROJECTNAMEJ'),
                            this.$t('label.PFANS6002VIEW_PROJECTNAMEE'),
                            this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION'),
                            this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
                            this.$t('label.PFANS6002VIEW_COMMONTPERSON'),
                            this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION'),
                            this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
                            this.$t('label.PFANS6002VIEW_ADDRESSC'),
                            this.$t('label.PFANS6002VIEW_ADDRESSJ'),
                            this.$t('label.PFANS6002VIEW_ADDRESSE'),
                            this.$t('label.PFANS6002VIEW_PERSCALE'),
                        ];
                        const filterVal = [
                            'custchinese',
                            'custjapanese',
                            'custenglish',
                            'abbreviation',
                            'liableperson',
                            'prochinese',
                            'projapanese',
                            'proenglish',
                            'protelephone',
                            'protemail',
                            'commontperson',
                            'comtelephone',
                            'comnemail',
                            'addchinese',
                            'addjapanese',
                            'addenglish',
                            'perscale',
                        ];
                        const list = this.selectedlist;
                        const data = this.formatJson(filterVal, list);
                        excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS6002') + moment(new Date()).format('YYYYMMDDHHmmss'));
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
