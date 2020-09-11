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
    import {getDictionaryInfo, getStatus, getUserInfo,getorgGroupList,getorgGroupallList,getCurrentRole8} from '@/utils/customize';
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
                groupid:'',
                buttonListinitial:[
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'contract', 'name': 'button.contract1', 'disabled': false, 'icon': 'el-icon-view'}
                ],
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
                  if (letRole2 === '2')
                  {
                    groupid = this.$store.getters.userinfo.userinfo.centerid;
                  }
                }
                let letdates = [
                    this.months.split('-')[0],
                    this.months.split('-')[1]
                ]
                //大于系统时间时取系统时间的前月
                if(Number(moment(this.months).format('YYYYMM')) >= Number(moment(new Date()).format("YYYYMM"))){
                    letdates[1] = Number(moment(new Date()).format("M")) - 1;
                    if(letdates[1].toString().length === 1){
                        letdates[1] = "0" + letdates[1];
                    }
                }
                //选择1,2,3月时按事业年度算应该年-1
                if(Number(moment(this.months).format('M')) < 4){
                    letdates[0] = Number(moment(this.months).format('YYYY')) - 1;
                }
                let dates = letdates[0] + "-" + letdates[1];
                this.letparams = {
                    dates: dates,
                    role: letRole2,
                    groupid: groupid
                }
                this.loading = true;
                this.$store
                    .dispatch('PFANS6008Store/getcostMonthList', this.letparams)
                    .then(response => {

                       response = response.sort((a,b)=>a.status-b.status).reverse();
                        let dates = moment(this.months).format('M');
                        if(Number(dates) >= Number(moment(new Date()).format("M"))){
                            var tempDate = new Date();
                            var list = moment(new Date()).format("YYYY-MM").split('-');
                            tempDate.setFullYear(list[0]);
                            tempDate.setMonth(Number(list[1]) - 2);
                            tempDate.setDate(1);
                            dates = moment(tempDate).format('M');
                        }
                        let showButton = '0';
                        for (let j = 0; j < response.length; j++) {
                            if(response[j].groupid){
                                let group = getorgGroupallList(response[j].groupid);
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
                            //判断是否有审批未通过的数据
                            if(response[j].letstatus != '4'){
                                // showButton = '1';
                            }
                            this.letstatus = response[j].letstatus;
                            //数据状态
                            response[j].letstatus = getStatus(response[j].status);

                            //region 部门费用合计
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
                            //endregion 部门费用合计
                        }
                        //外驻管理人员可操作【生成合同】
                        if(letRole2 == '4' && showButton === '0'){
                            this.buttonList = this.buttonListinitial;
                        }
                        else{
                            this.buttonList = [
                                {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                            ]
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
                this.groupid = row.groupid;
                if(this.$store.getters.userinfo.userinfo.groupid === this.groupid
                    && row.status === '0' && Number(row.cost) != 0){
                    this.$store.commit('global/SET_OPERATEOWNER', this.$store.getters.userinfo.userid);
                }
                else{
                    if(this.$store.getters.userinfo.userinfo.groupid === null
                        && row.status === '0' && Number(row.cost) != 0){
                        this.$store.commit('global/SET_OPERATEOWNER', this.$store.getters.userinfo.userid);
                    }
                    else{
                        this.$store.commit('global/SET_OPERATEOWNER', "");
                    }
                }
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
                    this.letparams.role = '1'
                    this.letparams.groupid = this.groupid;
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
                if (val === 'contract') {
                    //外驻管理担当
                    this.letparams.role = '4';
                    this.$router.push({
                        name: 'PFANS6010FormView',
                        params: {
                            _id: this.rowid,
                            letparams:this.letparams,
                            letstatus:this.letstatus,
                            _contr:getCurrentRole8(),
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
                  if (roles.toUpperCase().indexOf('外注管理担当') != -1 || roles.toUpperCase().indexOf('财务部长') != -1 || roles.toUpperCase().indexOf('企划部长') != -1 || roles.toUpperCase().indexOf('合同担当') != -1 || roles.toUpperCase().indexOf('总经理') != -1 || roles.toUpperCase().indexOf('管理员') != -1) {
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
