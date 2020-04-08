<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" v-loading="loading" >
        <el-form label-position="top" label-width="8vw" slot="search">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1044VIEW_CONTRACT')">
            <el-select @change="changed"v-model="contractType">
              <el-option :label="$t('menu.COMMISSIONCONTRACT')" value="0"></el-option>
              <el-option :label="$t('menu.BROKERAGECONTRACT')" value="1"></el-option>
              <el-option :label="$t('menu.OTHERCONTRACT')" value="2"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYDATE')">

            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import { Message } from 'element-ui'
    import moment from "moment";
    import {getOrgInfo,getUserInfo,getStatus,getDictionaryInfo} from '@/utils/customize';

    export default {
        name: 'PFANS1044View',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                contractType:"0",
                loading: false,
                title: "title.PFANS1044VIEW",
                contractnumbercount: '',
                data: [],
                alldata:[],
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
                .dispatch('PFANS1026Store/get',{})
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

                        if(tabledata[i].state === '1' && this.$i18n){
                            tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_EFFECTIVE");
                        }else if(tabledata[i].state === '0' && this.$i18n){
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
                    this.alldata = this.data;
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
          changed(val){
            this.data = this.alldata.filter(item => item.type == val);
          }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
