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
    import {getStatus, getUserInfo} from "../../../../utils/customize";
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
                    },
                    {
                        code: 'name',
                        label: 'label.PFANS3004VIEW_NAME',
                        width: 140,
                        fix: false,
                        filter: true
                    }, {
                        code: 'size',
                        label: 'label.PFANS3004VIEW_SIZE',
                        width: 140,
                        fix: false,
                        filter: true
                    }, {
                        code: 'numbers',
                        label: 'label.numbers',
                        width: 140,
                        fix: false,
                        filter: true
                    }, {
                        code: 'remarks',
                        label: 'label.remarks',
                        width: 140,
                        fix: false,
                        filter: true
                    }, {
                        code: 'status',
                        label: 'label.approval_status',
                        width: 140,
                        fix: false,
                        filter: true
                    }
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
                        let user = getUserInfo(response[j].userid)
                        if (user) {
                            response[j].applicant = user.userinfo.customername;
                        }
                        response[j].centername = response[j].centerid;
                        response[j].groupname = response[j].groupid;
                        response[j].teamname = response[j].teamid;
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
                    this.selectedlist = this.$refs.roletable.selectedList;
                    import('@/vendor/Export2Excel').then(excel => {
                        const tHeader = [this.$t('label.applicant'), this.$t('label.center'), this.$t('label.group'), this.$t('label.team'), this.$t('label.application_date'), this.$t('label.PFANS3004VIEW_NAME'), this.$t('label.PFANS3004VIEW_SIZE'), this.$t('label.numbers'), this.$t('label.remarks'), this.$t('label.status')];
                        const filterVal = ['applicant', 'centerid', 'groupid', 'teamid', 'applicationdate', 'name', 'size', 'numbers', 'remarks', 'status'];
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
