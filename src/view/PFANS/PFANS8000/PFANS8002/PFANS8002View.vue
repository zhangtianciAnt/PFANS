<template>
  <div style="min-height: 100%">

    <EasyNormalTable
      :buttonList="buttonList"
      :columns="columns"
      :data="table"
      :title="title"
      @buttonClick="buttonClick"
      @rowClick="rowclick"
      v-loading="loading"
      v-show="showTable1"
    >
      <el-select @change="handleClick" slot="customize" v-model="activeName">
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
      <el-select @change="handleClick" slot="customize" v-model="activeName">
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
    import {getUserInfo, getOrgInfoByUserId} from '@/utils/customize';

    export default {
        name: "PFANS8002View.vue",
        components: {
            EasyNormalTable
        },
        data() {
            return {
                title: 'label.PFANS8002VIEW_XXYL',
                noback: true,
                activeName: 'first',
                table: [],
                table2: [],
                status: '',
                workflowurl: '',
                total: 0,
                total2: 0,
                dataList: '',
                dataList2: '',
                selectedlist: '',
                loading: false,
                data: [],
                buttonList: [
                    {key: "open", name: "button.open", disabled: false, icon: ""},
                    {key: "end", name: "button.complete", disabled: true, icon: ""}],
                columns: [
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
            this.getStatus('1');
        },
        methods: {
            getStatus(val) {
                this.loading = true;
                this.$store
                    .dispatch('indexStore/getStatus', {status: val})
                    .then(response => {
                        if (response != undefined) {
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
                } else if (this.activeName === 'first') {
                    this.showTable1 = true;
                }
            },
            rowclick(row) {
                // add_fjl_05/25   -- 添加审批驳回的数据就行删除按钮的显示
                if (row.title === this.$t('label.PFANS8002VIEW_WORKFLOWWIN')) {
                    this.buttonList[1].disabled = false;
                }
                // add_fjl_05/25   -- 添加审批驳回的数据就行删除按钮的显示
                this.row = row;
            },
            buttonClick(val) {
                if (val === "open") {
                    if (!this.row || this.row.noticeid === '') {
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
                            disabled: false
                        }
                    })
                } else if (val === 'end') {
                    //    ADD_FJL_05/25  -- 对审批驳回之后不想再次申请的数据进行删除的处理
                    if (!this.row || this.row.noticeid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$confirm(this.$t('normal.confirm_iscontinue'), this.$t('normal.info'), {
                        confirmButtonText: this.$t('button.confirm'),
                        cancelButtonText: this.$t('button.cancel'),
                        type: 'warning',
                    }).then(() => {
                        this.loading = true;
                        this.$store
                            .dispatch("frameStore/delToDoNotice", {'todonoticeid': this.row.noticeid})
                            .then(response => {
                                Message({
                                    message: this.$t("normal.success_03"),
                                    type: 'success',
                                    duration: 5 * 1000
                                });
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
                            message: this.$t('label.PFANS1026FORMVIEW_YQXSC'),
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
