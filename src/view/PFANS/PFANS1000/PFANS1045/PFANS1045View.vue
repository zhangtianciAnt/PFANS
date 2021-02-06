<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns7" :data="data" :title="title" v-loading="loading"
                     @buttonClick="buttonClick" @rowClick="rowClick" :rowid="row"
                     :psearchValue="search">
    </EasyNormalTable>
  </div>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui';
    import {getOrgInfoByUserId, getStatus, getUserInfo, getDictionaryInfo} from '@/utils/customize';
    import moment from 'moment';

    export default {
        name: 'PFANS1045View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                search: '',
                loading: false,
                title: '',
                data: [],
                columns7: [
                    {
                        code: 'policynumbers',
                        label: 'label.PFANS1045VIEW_POLICYNUMBERS',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'user_id',
                        label: 'label.PFANS1008FORMVIEW_INITIATOR',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'outsourcingcompany',
                        label: 'label.PFANS1045VIEW_OUTSOURCINGCOMPANY',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'amountcase',
                        label: 'label.PFANS1045VIEW_AMOUNTCASE',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'modifiedamount',
                        label: 'label.PFANS1045VIEW_MODIFIEDAMOUNT',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'newamountcase',
                        label: 'label.PFANS1045VIEW_NEWAMOUNTCASE',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078
                    // {
                    //   code: 'cycle',
                    //   label: 'label.PFANS1045VIEW_CYCLE',
                    //   width: 120,
                    //   fix: false,
                    //   filter: true,
                    // },
                    {
                        code: 'yearss',
                        label: 'label.PFANS1045VIEW_CYCLE',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078
                    {
                        code: 'remark',
                        label: 'label.PFANS1017FORMVIEW_PREPAREFOR',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'status',
                        label: 'label.approval_status',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                ],
                rowid: '',
                statuss: '',
                check: false,
                row: '',
            };
        },
        mounted() {
            if (this.$route.params.check) {
                this.search = this.$route.params.check;
            }
            this.getCompanyProjectList();
        },
        methods: {
            selectInit(row, index) {
                return row.status === this.$t('label.PFANS5004VIEW_OVERTIME');
            },
            getCompanyProjectList() {
                this.row = 'policycontract_id';
                this.title = 'title.PFANS1045VIEW';
                this.dispatch('PFANS1006Store/getpolicycontract3');
            },
            dispatch(val) {
                this.data = [];
                this.loading = true;
                this.$store
                    .dispatch(val)
                    .then(response => {
                        this.data = this.setuser(response);
                        this.loading = false;
                    });
            },
            setuser(response) {
                for (let j = 0; j < response.length; j++) {
                    let nameflg = getOrgInfoByUserId(response[j].user_id);
                    if (nameflg) {
                        response[j].center_id = nameflg.centerNmae;
                        response[j].group_id = nameflg.groupNmae;
                        response[j].team_id = nameflg.teamNmae;
                    }
                    let user = getUserInfo(response[j].user_id);
                    if (user) {
                        response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
                    }
                    if (response[j].cycle !== null && response[j].cycle !== '') {
                        if (response[j].cycle == '0') {
                            response[j].cycle = this.$t('label.PFANS2007VIEW_YEAR')
                        } else if (response[j].cycle == '1') {
                            response[j].cycle = this.$t('label.PFANS1045VIEW_CYCLE1')
                        } else if (response[j].cycle == '2') {
                            response[j].cycle = this.$t('label.PFANS1045VIEW_CYCLE2')
                        } else if (response[j].cycle == '3') {
                            response[j].cycle = this.$t('label.PFANS1045VIEW_CYCLE3')
                        } else if (response[j].cycle == '4') {
                            response[j].cycle = this.$t('label.PFANS1045VIEW_CYCLE4')
                        } else if (response[j].cycle == '5') {
                            response[j].cycle = this.$t('label.PFANS1045VIEW_CYCLE5')
                        } else if (response[j].cycle == '6') {
                            response[j].cycle = this.$t('label.PFANS1045VIEW_CYCLE6')
                        }
                    }
                    if (response[j].status !== null && response[j].status !== '') {
                        response[j].status = getStatus(response[j].status);
                    }
                    //        add_fjl_05/27  --添加审批时间
                    if (response[j].status != '0') {
                        if (response[j].modifyon !== null && response[j].modifyon !== '') {
                            response[j].modifyon = moment(response[j].modifyon).format('YYYY-MM-DD');
                        }
                    } else {
                        response[j].modifyon = null;
                    }
                    //        add_fjl_05/27  --添加审批时间
                    // ztc 禅道No.61-增加编号（日期加序列号）start
                    if (response[j].businesstype == '1' && response[j].city != null && response[j].city != '') {
                        let letcity = getDictionaryInfo(response[j].city);
                        if (letcity != null) {
                            response[j].regioncity = letcity.value1;
                        }
                    } else if (response[j].businesstype == '0' && response[j].city != null && response[j].city != '') {
                        let letregion = getDictionaryInfo(response[j].region);
                        {
                            if (letregion != null) {
                                response[j].regioncity = letregion.value1 + response[j].city;
                            }
                        }
                    }
                    if (response[j].startdate != null && response[j].startdate != '') {
                        response[j].date = moment(response[j].startdate).format('YYYY-MM-DD') + '~' + moment(response[j].enddate).format('YYYY-MM-DD');
                    }
                    if (response[j].canafver != null && response[j].canafver != '') {
                        if (response[j].canafver == 1) {
                            response[j].canafver = this.$t('label.PFANS1030FORMVIEW_YCANAFVER');
                        } else {
                            response[j].canafver = this.$t('label.PFANS1030FORMVIEW_NCANAFVER');
                        }
                    }
                    // ztc 禅道No.61-增加编号（日期加序列号）end
                }
                return response;
                this.loading = false;
            },
            rowClick(row) {
                this.rowid = row.policycontract_id;
                this.statuss = row;
            },
            buttonClick(val) {
                let letname;
                letname = 'PFANS1045FormView';
                this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1045View');
                this.$store.commit('global/SET_HISTORYURL', '');
                if (val === 'update') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }
                    this.$router.push({
                        name: letname,
                        params: {
                            _id: this.rowid,
                            _type: 2,
                            _check: this.check,
                            statuss: this.statuss.status,
                            disabled: true,
                        },
                    });
                }
                if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                        });
                        return;
                    }
                    this.$router.push({
                        name: letname,
                        params: {
                            _type: 2,
                            _id: this.rowid,
                            disabled: false,
                        },
                    });
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: letname,
                        params: {
                            _type: 2,
                            _id: '',
                            disabled: true,
                        },
                    });
                }
            },
        },
    };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
