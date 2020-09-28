<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row_id"
    :showSelection="isShow"
    :title="title"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    ref="roletable"
    v-loading="loading"
  >
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui'
    import {
        getDepartmentById,
        getDictionaryInfo,
        getOrgInfoByUserId,
        getStatus,
        getUserInfo
    } from "../../../../utils/customize";
    import moment from "moment";

    export default {
        name: "PFANS3004View",
        components: {
            EasyNormalTable
        },
        data() {
            return {
                selectedlist: [],
                loading: false,
                title: "title.PFANS3004VIEW",
                data: [],
                columns: [
                    {
                        code: 'applicant',
                        label: 'label.applicant',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'centername',
                        label: 'label.center',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'groupname',
                        label: 'label.group',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'teamname',
                        label: 'label.team',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'applicationdate',
                        label: 'label.application_date',
                        width: 140,
                        fix: false,
                        filter: true,
                        // },
                        // {
                        //     code: 'name',
                        //     label: 'label.PFANS3004VIEW_NAME',
                        //     width: 140,
                        //     fix: false,
                        //     filter: true
                    }, {
                        code: 'size',
                        label: 'label.PFANS3004VIEW_NAME',
                        width: 200,
                        fix: false,
                        filter: false
                        // }, {
                        //     code: 'numbers',
                        //     label: 'label.numbers',
                        //     width: 140,
                        //     fix: false,
                        //     filter: true
                    }, {
                        code: 'remarks',
                        label: 'label.remarks',
                        width: 140,
                        fix: false,
                        filter: false
                    }, {
                        code: 'status',
                        label: 'label.approval_status',
                        width: 140,
                        fix: false,
                        filter: true
                    }, {
                        code: 'acceptstatus',
                        label: 'label.PFANS3001FORMVIEW_ACCEPTSTATUS',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'findate',
                        label: 'label.PFANS3006VIEW_ACCEPTTIME',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'refusereason',
                        label: 'label.PFANS3007FORMVIEW_REFUSEREASON',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                ],
                buttonList: [
                    {
                        key: 'view',
                        name: 'button.view',
                        disabled: false,
                        icon: 'el-icon-view'
                    },
                    {
                        key: 'insert',
                        name: 'button.insert',
                        disabled: false,
                        icon: 'el-icon-plus'
                    },
                    {
                        key: 'update',
                        name: 'button.update',
                        disabled: false,
                        icon: 'el-icon-edit'
                    },
                    {
                        key: 'export',
                        name: 'button.export',
                        disabled: false,
                        icon: 'el-icon-upload2'
                    }
                ],
                rowid: '',
                row_id: 'stationeryid',
                isShow: true,
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS3004Store/getStationery', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        response[j].status = getStatus(response[j].status);
                        if (response[j].applicationdate !== null && response[j].applicationdate !== "") {
                            response[j].applicationdate = moment(response[j].applicationdate).format("YYYY-MM-DD");
                        }
                        if (response[j].finshtime !== null && response[j].finshtime !== "") {
                            response[j].finshtime = moment(response[j].finshtime).format("YYYY-MM-DD");
                        }
                        if (response[j].company !== null && response[j].company !== "") {
                            let letCompany = getDictionaryInfo(response[j].company);
                            if (letCompany != null) {
                                response[j].company = letCompany.value2 + '_' + letCompany.value3;
                            }
                        }
                        //add_fjl 拼接类别明细
                        if (response[j].stationerytype !== '' && response[j].stationerytype !== null && response[j].stationerytype !== undefined) {
                            let typeflg = response[j].stationerytype.split(",");
                            if (typeflg.length > 1) {
                                let footnam = "";
                                let numbre = "";
                                for (var val of JSON.parse(response[j].stationerytype)) {
                                    if (val.footname) {
                                        footnam += getDictionaryInfo(val.footname).value2 + ",";
                                    }
                                    if (val.numbers) {
                                        numbre += val.numbers + ",";
                                    }
                                }
                                if (footnam !== "") {
                                    response[j].size = footnam.substring(0, footnam.length - 1);
                                }
                                if (numbre !== "") {
                                    response[j].numbers = numbre.substring(0, numbre.length - 1);
                                }
                            }
                        }
                        //add_fjl 拼接类别明细
                        let user = getUserInfo(response[j].userid)
                        let nameflg = getOrgInfoByUserId(response[j].userid);
                        if (nameflg) {
                            response[j].centername = nameflg.centerNmae;
                            // response[j].groupname = nameflg.groupNmae;
                            response[j].teamname = nameflg.teamNmae;
                        }
                        //add_fjl_0927
                        if (response[j].groupid !== null && response[j].groupid !== '' && response[j].groupid !== undefined) {
                            response[j].groupname = getDepartmentById(response[j].groupid);
                        }
                        //add_fjl_0927
                        if (user) {
                            response[j].applicant = user.userinfo.customername;
                        }
                        // ADD_FJL   (受理状态)
                        if (response[j].acceptstatus !== null && response[j].acceptstatus !== "") {
                            if (this.$i18n) {
                                if (response[j].acceptstatus === '0') {
                                    response[j].acceptstatus = this.$t('label.PFANS3006VIEW_ACCEPT');
                                } else if (response[j].acceptstatus === '1') {
                                    response[j].acceptstatus = this.$t('label.PFANS3006VIEW_REFUSE');
                                } else if (response[j].acceptstatus === '2') {
                                    response[j].acceptstatus = this.$t('label.PFANS3006VIEW_CARRYOUT');
                                }
                            }
                        }
                        // ADD_FJL   (受理时间)
                        if (response[j].findate !== null && response[j].findate !== "") {
                            response[j].findate = moment(response[j].findate).format('YYYY-MM-DD');
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
                    this.loading = false;
                })
        },
        methods: {
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            rowClick(row) {
                this.rowid = row.stationeryid;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path)
                if (val === 'update') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        })
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS3004FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS3004FormView',
                        params: {
                            _id: '',
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
                        })
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS3004FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'export') {
                    if (this.$refs.roletable.selectedList.length === 0) {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.selectedlist = this.$refs.roletable.selectedList;
                    import('@/vendor/Export2Excel').then(excel => {
                        const tHeader = [
                            this.$t('label.PFANS2002VIEW_CREATEON'),//申请日期
                            this.$t('label.PFANS1016FORMVIEW_COMPLETEDATE'),//完成日期
                            this.$t('label.applicant'),//申请人
                            this.$t('label.budgetunit'),//预算编码
                            this.$t('label.PFANS3005VIEW_ITEMNAME'),//物品名称
                            this.$t('label.PFANS3005VIEW_QUANTITY'),//数量
                            this.$t('label.remarks')//备注
                        ];
                        const filterVal = ['applicationdate', 'finshtime', 'applicant', 'company', 'size', 'numbers', 'remarks'];
                        const list = this.selectedlist;
                        const data = this.formatJson(filterVal, list);
                        excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS3004'));
                    })
                }
            },
        }
    }
</script>

<style scoped>

</style>
