<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" >
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import { Message } from 'element-ui'
    import moment from "moment";
    import {getOrgInfo,getUserInfo,getStatus,getDictionaryInfo} from '@/utils/customize';

    export default {
        name: 'PFANS1026View',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS1026VIEW",
                data: [],
                columns: [
                    {
                        code: 'user_id',
                        label: 'label.applicant',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'deployment',
                        label: 'label.group',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'contracttype',
                        label: 'label.PFANS1024VIEW_CONTRACTTYPE',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'applicationdate',
                        label: 'label.PFANS1024VIEW_APPLICATIONDATE',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'state',
                        label: 'label.approval_status',
                        width: 120,
                        fix: false,
                        filter: true,
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
                ],
                rowid: '',
                row : 'contractapplication_id '
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS1026Store/get',{'maketype': '1'})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        response[j].status = getStatus(response[j].status);
                        let user = getUserInfo(response[j].user_id);
                        if (user) {
                            response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
                        }
                        if (response[j].applicationdate !== null && response[j].applicationdate !== "") {
                            response[j].applicationdate = moment(response[j].applicationdate).format("YYYY-MM-DD");
                        }
                        if (response[j].contracttype !== null && response[j].contracttype !== "") {
                            let letContracttype = getDictionaryInfo(response[j].contracttype);
                            if (letContracttype != null) {
                                response[j].contracttype = letContracttype.value1;
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
        methods: {
            rowClick(row) {
                this.rowid = row.contractapplication_id;
            },
            buttonClick(val) {
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
                        name: 'PFANS1026FormView',
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
                        name: 'PFANS1026FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS1026FormView',
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

<style rel="stylesheet/scss" lang="scss">

</style>
