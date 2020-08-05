<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    <el-date-picker
      :placeholder="$t('normal.error_09')"
      @change="changed"
      slot="customize"
      style="width:11vw"
      type="month"
      v-model="months">
    </el-date-picker>
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {getDictionaryInfo, getStatus, getUserInfo,getorgGroupList} from '@/utils/customize';
    import {Message} from 'element-ui';
    import moment from "moment";

    export default {
        name: 'PFANS6010View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS6010VIEW",
                months: moment(new Date()).format("YYYY-MM"),
                // 表格数据源
                data: [],
                letparams:{},
                status:'',
                // 列属性
                columns: [
                    {
                        code: 'groupname',
                        label: 'label.group',
                        width: 110,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'manhour',
                        label: 'label.PFANS1036FORMVIEW_JOBNUMBER',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'cost',
                        label: 'label.PFANS6008VIEW_COST',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: "letstatus",
                        label: "label.approval_status",
                        width: 130,
                        fix: false,
                        filter: false
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                ],
                rowid: '',
                row: 'coststatistics_id',
            };
        },
        mounted() {
            this.getList();
        },
        methods: {
            changed(val) {
                this.months = moment(val).format('YYYY-MM');
                this.getList();
            },
            getList() {
                let groupid = this.$store.getters.userinfo.userinfo.groupid;
                let letRole2 = this.getCurrentRole2();
                if(letRole2 !== '4'){
                    letRole2 = this.getCurrentRole3();
                    if(letRole2 === '2'){
                        //中心长
                        groupid = this.$store.getters.userinfo.userinfo.centerid;
                    }
                }
                let dates = this.months
                if(Number(moment(this.months).format('M')) >= Number(moment(new Date()).format("M"))){
                    var tempDate = new Date();
                    var list = this.months.split('-');
                    tempDate.setFullYear(list[0]);
                    tempDate.setMonth(Number(list[1]) - 2);
                    tempDate.setDate(1);
                    dates = moment(tempDate).format('YYYY-MM');
                }
                this.letparams = {
                    dates: dates,
                    role: letRole2,
                    groupid: groupid
                }
                this.loading = true;
                this.$store
                    .dispatch('PFANS6008Store/getcostMonthList', this.letparams)
                    .then(response => {
                        let dates = moment(this.months).format('M');
                        if(Number(dates) >= Number(moment(new Date()).format("M"))){
                            var tempDate = new Date();
                            var list = moment(new Date()).format("YYYY-MM").split('-');
                            tempDate.setFullYear(list[0]);
                            tempDate.setMonth(Number(list[1]) - 2);
                            tempDate.setDate(1);
                            dates = moment(tempDate).format('M');
                        }
                        for (let j = 0; j < response.length; j++) {
                            if(response[j].groupid){
                                let group = getorgGroupList(response[j].groupid);
                                if (group) {
                                    response[j].groupname = group.groupname;
                                }
                            }
                            if(response[j].status === null || response[j].status === '' || response[j].status === '3'){
                                response[j].letstatus = "0";//未开始
                            }
                            else{
                                if(response[j].status === '0'){//进行中
                                    response[j].letstatus = "2";
                                }
                                else if(response[j].status === '2'){//驳回
                                    response[j].letstatus = "3";
                                }
                                else if(response[j].status === '3'){//撤回
                                    response[j].letstatus = "0";
                                }
                                else if(response[j].status === '4'){//撤回
                                    response[j].letstatus = "4";
                                }
                            }
                            response[j].status = response[j].letstatus;
                            //数据状态
                            response[j].letstatus = getStatus(response[j].status);
                            let letmanhour;
                            let letcost;
                            if(dates === '4'){
                                letmanhour = response[j].manhour4;
                                letcost = response[j].cost4;
                            }
                            else if(dates === '5'){
                                letmanhour = response[j].manhour5;
                                letcost = response[j].cost5;
                            }
                            else if(dates === '6'){
                                letmanhour = response[j].manhour6;
                                letcost = response[j].cost6;
                            }
                            else if(dates === '7'){
                                letmanhour = response[j].manhour7;
                                letcost = response[j].cost7;
                            }
                            else if(dates === '8'){
                                letmanhour = response[j].manhour8;
                                letcost = response[j].cost8;
                            }
                            else if(dates === '9'){
                                letmanhour = response[j].manhour9;
                                letcost = response[j].cost9;
                            }
                            else if(dates === '10'){
                                letmanhour = response[j].manhour10;
                                letcost = response[j].cost10;
                            }
                            else if(dates === '11'){
                                letmanhour = response[j].manhour11;
                                letcost = response[j].cost11;
                            }
                            else if(dates === '12'){
                                letmanhour = response[j].manhour12;
                                letcost = response[j].cost12;
                            }
                            else if(dates === '1'){
                                letmanhour = response[j].manhour1;
                                letcost = response[j].cost1;
                            }
                            else if(dates === '2'){
                                letmanhour = response[j].manhour2;
                                letcost = response[j].cost2;
                            }
                            else if(dates === '3'){
                                letmanhour = response[j].manhour3;
                                letcost = response[j].cost3;
                            }
                            response[j].manhour = letmanhour;
                            response[j].cost = letcost;
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
            rowClick(row) {
                this.rowid = row.coststatistics_id;
                this.letstatus = row.status;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
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
                        name: 'PFANS6010FormView',
                        params: {
                            _id: this.rowid,
                            letparams:this.letparams,
                            letstatus:this.letstatus,
                            disabled: false
                        }
                    })
                }
            },
            getCurrentRole2() {
                let roles = '';
                if (this.$store.getters.useraccount && this.$store.getters.useraccount.roles && this.$store.getters.useraccount.roles.length > 0) {
                    for (let role of this.$store.getters.useraccount.roles) {
                        roles = roles + role.description;
                    }
                    if (roles.toUpperCase().indexOf('外注管理担当') != -1 || roles.toUpperCase().indexOf('总经理') != -1|| roles.toUpperCase().indexOf('管理员') != -1) {
                        return '4';
                    }
                    else{
                        return '0';
                    }
                }
            },
            getCurrentRole3() {
                let roles = '';
                if (this.$store.getters.useraccount && this.$store.getters.useraccount.roles && this.$store.getters.useraccount.roles.length > 0) {
                    for (let role of this.$store.getters.useraccount.roles) {
                        roles = roles + role.description;
                    }
                    if (roles.toUpperCase().indexOf('CENTER') != -1) {
                        return '2';
                    } else if (roles.toUpperCase().indexOf('GM') != -1) {
                        return '1';
                    } else if (roles.toUpperCase().indexOf('TL') != -1) {
                        return '0';
                    }
                }
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
