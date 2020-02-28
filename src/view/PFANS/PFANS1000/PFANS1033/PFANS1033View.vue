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
        name: 'PFANS1033View',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS1033VIEW",
                contractnumbercount: '',
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
                        code: 'contractnumber',
                        label: 'label.PFANS1024VIEW_CONTRACTNUMBER',
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
                contractnumber: '',
                state: '',
                row : 'contractapplication_id '
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS1026Store/get',{'type': '2'})
                .then(response => {
                    let letcontractnumber = [];
                    for (let i = 0; i < response.length; i++) {
                        response[i].status = getStatus(response[i].status);
                        let user = getUserInfo(response[i].user_id);
                        if (user) {
                            response[i].user_id = getUserInfo(response[i].user_id).userinfo.customername;
                        }
                        if (response[i].applicationdate !== null && response[i].applicationdate !== "") {
                            response[i].applicationdate = moment(response[i].applicationdate).format("YYYY-MM-DD");
                        }
                        if (response[i].contracttype !== null && response[i].contracttype !== "") {
                            let letContracttype = getDictionaryInfo(response[i].contracttype);
                            if (letContracttype != null) {
                                response[i].contracttype = letContracttype.value1;
                            }
                        }
                        if(response[i].contractnumber != ""){
                            letcontractnumber.push(response[i].contractnumber);
                        }
                    }
                    var arr= new Array();
                    let o;
                    for(var i = 0; i < letcontractnumber.length; i++){
                        if(arr.indexOf(letcontractnumber[i]) == -1){
                            arr.push(letcontractnumber[i]);
                            o = Object.assign([], response[i]);
                            this.data.push(o);
                        }
                    }
                    this.contractnumbercount = (letcontractnumber.length + 1);
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
                this.contractnumber = row.contractnumber;
                this.state = row.state;
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
                        name: 'PFANS1033FormView',
                        params: {
                            _id: this.contractnumber,
                            contractnumbercount: this.contractnumbercount,
                            state: this.state,
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
                        name: 'PFANS1033FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS1033FormView',
                        params: {
                            _id: '',
                            contractnumbercount: this.contractnumbercount,
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
