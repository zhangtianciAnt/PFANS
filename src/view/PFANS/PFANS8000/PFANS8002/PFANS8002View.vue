<template>
  <div style="min-height: 100%">

    <EasyNormalTable
      ref="dataTable"
      :buttonList="buttonList"
      :columns="columns"
      :data="table"
      :title="title"
      @buttonClick="buttonClick"
      @rowClick="rowclick"
      v-loading="loading"
      v-show="showTable1"
      :showSelection="true"
    >
      <el-select @change="handleClick" slot="customize" v-model="activeName" style="width: 8vw">
        <el-option :label="$t('label.node_step4')" value="first"></el-option>
        <el-option :label="$t('label.PFANS8002VIEW_JS')" value="second"></el-option>
      </el-select>
    </EasyNormalTable>
    <EasyNormalTable
      :buttonList="buttonList"
      :columns="columns"
      :data="table2"
      :title="title"
      @buttonClick="buttonClick"
      @rowClick="rowclick"
      v-loading="loading"
      v-show="!showTable1"
    >
      <el-select @change="handleClick" slot="customize" v-model="activeName" style="width: 8vw">
        <el-option :label="$t('label.node_step4')" value="first"></el-option>
        <el-option :label="$t('label.PFANS8002VIEW_JS')" value="second"></el-option>
      </el-select>
    </EasyNormalTable>
  </div>
</template>
<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui';
    import moment from 'moment';
    import { menu } from "@/utils/menu";
    import {getUserInfo, getOrgInfoByUserId} from '@/utils/customize';

    export default {
        name: "PFANS8002View.vue",
        components: {
            EasyNormalTable
        },
        data() {
            return {
                thatday: '',
                // update gbb 20210315 NT_PFANS_20210305_BUG_098 代办列表【已读】后刷新 start
                row:[],
                // update gbb 20210315 NT_PFANS_20210305_BUG_098 代办列表【已读】后刷新 end
                title: 'label.PFANS8002VIEW_XXYL',
                noback: true,
                activeName: 'first',
                activeTime: 'first',
                table: [],
                table2: [],
                status: '0',
                workflowurl: '',
                total: 0,
                total2: 0,
                dataList: '',
                dataList2: '',
                selectedlist: [],
                loading: false,
                data: [],
                buttonList: [
                    {key: "open", name: "button.open", disabled: false, icon: ""},
                    {key: "read", name: "button.read", disabled: false, icon: ""}],
                columns: [
                    {
                      code: 'viewname',
                      label: 'label.information_viewname',
                      width: 150,
                      fix: false,
                      filter: true
                    },
                    {
                        code: 'title',
                        label: 'label.information_title',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'initiatorname',
                        label: 'label.applicant',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'group',
                        label: 'label.group',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'createon',
                        label: 'label.information_start',
                        width: 150,
                        fix: false,
                        filter: true
                    }
                ],
                showTable1: true
            };
        },
        mounted() {
            this.$store.commit("global/SET_CURRENTURL", "/PFANS8002View");
            this.$store.commit("global/SET_WORKFLOWURL", "/PFANS8002View");
            this.getStatus('0');
        },
        methods: {
            getStatus(data1) {
              this.loading = true;
                this.$store
                    .dispatch('indexStore/getStatus', {status: data1})
                    .then(response => {
                        if (response != undefined) {
                            if (data1 === '0') {
                                this.table = [];
                            } else if (data1 === '1') {
                                this.table2 = [];
                            }
                            for (let j = 0; j < response.length; j++) {
                                if (response[j].status === '0') {
                                    if (response[j].createon !== null && response[j].createon !== '') {
                                        response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                                    }
                                    if (response[j].initiator !== null && response[j].initiator !== '') {
                                        let userinfo = getUserInfo(response[j].initiator)
                                        if (userinfo) {
                                            response[j].initiatorname = userinfo.userinfo.customername
                                        }

                                        let nameflg = getOrgInfoByUserId(response[j].initiator);
                                        if (nameflg) {
                                            response[j].group = nameflg.groupNmae;
                                        }
                                    }

                                    this.table = response;
                                }
                              this.appdata = menu();
                                response[j].viewname = this.$t('menu.' + response[j].url.replace("/","").replace("Form","").replace("View",""));
                                if (response[j].status === '1') {
                                    if (response[j].createon !== null && response[j].createon !== '') {
                                        response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                                    }
                                    if (response[j].initiator !== null && response[j].initiator !== '') {
                                        let userinfo = getUserInfo(response[j].initiator)
                                        if (userinfo) {
                                            response[j].initiatorname = userinfo.userinfo.customername
                                        }

                                        let nameflg = getOrgInfoByUserId(response[j].initiator);
                                        if (nameflg) {
                                            response[j].group = nameflg.groupNmae;
                                        }
                                    }
                                    this.table2 = response;
                                }
                            }
                        }
                        // update gbb 20210315 NT_PFANS_20210305_BUG_098 代办列表【已读】后刷新 start
                        else{
                            if (data1 === '0') {
                                this.table = [];
                            } else if (data1 === '1') {
                                this.table2 = [];
                            }
                        }
                        // update gbb 20210315 NT_PFANS_20210305_BUG_098 代办列表【已读】后刷新 end
                      this.loading = false;
                    })
                    .catch(err => {
                        this.loading = false;
                        Message({
                            message: err,
                            type: "error",
                            duration: 5 * 1000
                        });
                    });
            },
            handleClick() {
                if (this.activeName === 'second') {
                  this.showTable1 = false;
                  this.getStatus('1');
                } else if (this.activeName === 'first') {
                  this.showTable1 = true;
                  this.getStatus('0');
                }
            },
            rowclick(row) {
                // add_fjl_05/25   -- 添加审批驳回的数据就行删除按钮的显示
                // if (row.title === this.$t('label.PFANS8002VIEW_WORKFLOWWIN')) {
                //     this.buttonList[1].disabled = false;
                // } else {
                //     this.buttonList[1].disabled = true;
                // }
                // add_fjl_05/25   -- 添加审批驳回的数据就行删除按钮的显示
                this.row = row;
            },
            buttonClick(val) {
                if (val === "open") {
                    if (this.row.length === 0) {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    let name = this.row.url.replace("/", "");
                    this._id = this.row.dataid;
                    //流程之外的代办判断
                    if (this.row.workflowurl != null) {
                        this.workflowurl = this.row.workflowurl.replace("/", "");
                    }
                    this.$store.commit('global/SET_OPERATEID', this._id);
                    this.$store.commit('global/SET_OPERATEOWNER', this.row.initiator);
                    this.$store.commit('global/SET_WORKFLOWURL', "/" + this.workflowurl);
                    this.$router.push({
                        name: name,
                        params: {
                            _id: this._id,
                            _url: this.workflowurl,
                            disabled: false,
                            _disto: '1' //判断是否可用save按钮
                        }
                    })
                } else if (val === 'read') {
                    this.selectedlist = [];
                    //    ADD_FJL_05/25  -- 对审批驳回之后不想再次申请的数据进行删除的处理
                    // update gbb 20210315 NT_PFANS_20210305_BUG_098 代办列表【已读】后刷新 start
                    //if (!this.row || this.row.noticeid === '') {
                    if (this.$refs.dataTable.selectedList.length === 0) {
                    // update gbb 20210315 NT_PFANS_20210305_BUG_098 代办列表【已读】后刷新 end
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    for (let i = 0; i < this.$refs.dataTable.selectedList.length; i++) {
                      this.selectedlist.push(this.$refs.dataTable.selectedList[i].noticeid)
                    }
                    this.$confirm(this.$t('normal.confirm_iscontinue1'), this.$t('normal.info'), {
                        confirmButtonText: this.$t('button.confirm'),
                        cancelButtonText: this.$t('button.cancel'),
                        type: 'warning',
                    }).then(() => {
                        this.loading = true;
                        this.$store
                            .dispatch("frameStore/delToDoNotice", this.selectedlist)
                            .then(response => {
                                // update gbb 20210315 NT_PFANS_20210305_BUG_098 代办列表【已读】后刷新 start
                                this.row = [];
                                // update gbb 20210315 NT_PFANS_20210305_BUG_098 代办列表【已读】后刷新 emd
                                this.getStatus('0');
                                this.selectedlist = [];
                              Message({
                                    message: this.$t("normal.success_03"),
                                    type: 'success',
                                    duration: 5 * 1000
                                });
                                this.$refs['dataTable'].$refs['eltable'].clearSelection();
                                this.loading = false;
                            })
                            .catch(err => {
                                this.loading = false;
                                Message({
                                    message: err,
                                    type: "error",
                                    duration: 5 * 1000
                                });
                            });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: this.$t('label.PFANS1026FORMVIEW_tipis'),
                        });
                    });
                }
                //    ADD_FJL_05/25  -- 对审批驳回之后不想再次申请的数据进行删除的处理
            },
        }
    }
</script>
<style scoped>
</style>
