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
    import {getUserInfo,getOrgInfoByUserId} from "../../../../utils/customize";
    import moment from "moment";

    export default {
        name: "PFANS3002View",
        components: {
            EasyNormalTable
        },
        data() {
            return {
                selectedlist: [],
                loading: false,
                title: "title.PFANS3002VIEW",
                data: [],
                columns: [
                    {
                        code: 'applicant',
                        label: 'label.applicant',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'centername',
                        label: 'label.center',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'groupname',
                        label: 'label.group',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'teamname',
                        label: 'label.team',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'guestname',
                        label: 'label.PFANS3002VIEW_GUESTNAME',
                        child: [
                            {
                                code: 'name',
                                label: 'label.PFANS3002VIEW_NAME',
                                labelClass: 'pfans3002view_column_5',
                                width: 140,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'namerome',
                                label: 'label.PFANS3002VIEW_NAMEROME',
                                labelClass: 'pfans3002view_column_5',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                        ],
                        width: 280,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'hotel',
                        label: 'label.PFANS3002VIEW_HOTEL',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'checkin',
                        label: 'label.PFANS3002VIEW_CHECKIN',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'checkout',
                        label: 'label.PFANS3002VIEW_CHECKOUT',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'checkindays',
                        label: 'label.PFANS3002VIEW_CHECKINDAYS',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'smoke',
                        label: 'label.PFANS3002VIEW_SMOKE',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'remarks',
                        label: 'label.remarks',
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
                row_id: 'hotelreservationid',
                isShow: true,
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS3002Store/getHotelReservation', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].checkin !== null && response[j].checkin !== "") {
                            response[j].checkin = moment(response[j].checkin).format("YYYY-MM-DD");
                        }
                        if (response[j].checkout !== null && response[j].checkout !== "") {
                            response[j].checkout = moment(response[j].checkout).format("YYYY-MM-DD");
                        }
                        let user = getUserInfo(response[j].userid)
                        let nameflg = getOrgInfoByUserId(response[j].userid);
                        if (nameflg) {
                            response[j].center_name = nameflg.centerNmae;
                            response[j].group_name = nameflg.groupNmae;
                            response[j].team_name = nameflg.teamNmae;
                        }
                        if (user) {
                            response[j].applicant = user.userinfo.customername;
                        }
                        response[j].centername = response[j].centerid;
                        response[j].groupname = response[j].groupid;
                        response[j].teamname = response[j].teamid;
                        if (response[j].smoke !== null && response[j].smoke !== "") {
                            if (this.$i18n) {
                                response[j].smoke = response[j].smoke === "1" ? this.$t('label.yes') : this.$t('label.no');
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
                this.rowid = row.hotelreservationid;
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
                        name: 'PFANS3002FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS3002FormView',
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
                        name: 'PFANS3002FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'export') {
                    this.selectedlist = this.$refs.roletable.selectedList;
                    import('@/vendor/Export2Excel').then(excel => {
                        const tHeader = [this.$t('label.applicant'), this.$t('label.center'), this.$t('label.group'), this.$t('label.team'), this.$t('label.PFANS3002VIEW_NAME'), this.$t('label.PFANS3002VIEW_NAMEROME'), this.$t('label.PFANS3002VIEW_HOTEL'), this.$t('label.PFANS3002VIEW_CHECKIN'), this.$t('label.PFANS3002VIEW_CHECKOUT'), this.$t('label.PFANS3002VIEW_CHECKINDAYS'), this.$t('label.PFANS3002VIEW_SMOKE'), this.$t('label.remarks')];
                        const filterVal = ['applicant', 'centerid', 'groupid', 'teamid', 'name', 'namerome', 'hotel', 'checkin', 'checkout', 'checkindays', 'smoke', 'remarks'];
                        const list = this.selectedlist;
                        const data = this.formatJson(filterVal, list);
                        excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS3002'));
                    })
                }
            },
        }
    }
</script>

<style scoped>

</style>
