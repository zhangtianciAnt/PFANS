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
                        label: 'label.PFANS1024VIEW_STATE',
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
                    let tabledata = response.contractapplication;

                    for (let i = 0; i < tabledata.length; i++) {
                        tabledata[i].status = getStatus(tabledata[i].status);
                        let user = getUserInfo(tabledata[i].user_id);
                        if (user) {
                            tabledata[i].user_id = getUserInfo(tabledata[i].user_id).userinfo.customername;
                        }
                        if (tabledata[i].applicationdate !== null && tabledata[i].applicationdate !== "") {
                            tabledata[i].applicationdate = moment(tabledata[i].applicationdate).format("YYYY-MM-DD");
                        }
                        if (tabledata[i].contracttype !== null && tabledata[i].contracttype !== "") {
                            let letContracttype = getDictionaryInfo(tabledata[i].contracttype);
                            if (letContracttype != null) {
                                tabledata[i].contracttype = letContracttype.value1;
                            }

                        }
                        if(tabledata[i].contractnumber != ""){
                            letcontractnumber.push(tabledata[i].contractnumber);
                        }
                        if(tabledata[i].state === '1'){
                            tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_EFFECTIVE");
                        }else if(tabledata[i].state === '0'){
                            tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_INVALID");
                        }
                    }
                    var arr= new Array();
                    let o;
                    for(var i = 0; i < letcontractnumber.length; i++){
                        if(arr.indexOf(letcontractnumber[i]) == -1){
                            arr.push(letcontractnumber[i]);
                            o = Object.assign([], tabledata[i]);
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
                            _id: this.contractnumber,
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
