<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row_id"
    :title="title"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading"
  >
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui'
    import {getDictionaryInfo, getStatus, getUserInfo,getOrgInfoByUserId} from "../../../../utils/customize";
    let moment = require("moment");

    export default {
        name: "PFANS3006View",
        components: {
            moment,
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS3006VIEW",
                data: [],
                columns: [
                    {
                        code: 'basicsituation',
                        label: 'label.PFANS3006VIEW_BASICSITUATION',
                        child: [
                            {
                                code: 'applicant',
                                label: 'label.applicant',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'centername',
                                label: 'label.center',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'groupname',
                                label: 'label.group',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'teamname',
                                label: 'label.team',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'usedate',
                                label: 'label.PFANS3006VIEW_USEDATE',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'usetype',
                                label: 'label.PFANS3006VIEW_USETYPE',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'mobilephone',
                                label: 'label.PFANS3006VIEW_MOBILEPHONE',
                                labelClass: 'pfans3006view_column_1',
                                width: 150,
                                fix: false,
                                filter: true
                            },
                        ],
                        width: 990,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'set',
                        label: 'label.PFANS3006VIEW_SET',
                        child: [
                            {
                                code: 'starttime',
                                label: 'label.PFANS3006VIEW_STARTTIME',
                                labelClass: 'pfans3006view_column_8',
                                width: 150,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'origin',
                                label: 'label.PFANS3006VIEW_ORIGIN',
                                labelClass: 'pfans3006view_column_8',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                        ],
                        width: 290,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'arrive',
                        label: 'label.PFANS3006VIEW_ARRIVE',
                        child: [
                            {
                                code: 'transferstation',
                                label: 'label.PFANS3006VIEW_TRANSFERSTATION',
                                labelClass: 'pfans3006view_column_10',
                                width: 160,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'destination',
                                label: 'label.PFANS3006VIEW_DESTINATION',
                                labelClass: 'pfans3006view_column_10',
                                width: 160,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'endtime',
                                label: 'label.PFANS3006VIEW_ENDTIME',
                                labelClass: 'pfans3006view_column_10',
                                width: 200,
                                fix: false,
                                filter: true
                            },
                        ],
                        width: 520,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'arrive1',
                        label: 'label.PFANS3006VIEW_ARRIVE',
                        child: [
                            {
                                code: 'flightnumber',
                                label: 'label.PFANS3006VIEW_FLIGHTNUMBER',
                                labelClass: 'pfans3006view_column_13',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'distinguish',
                                label: 'label.PFANS3006VIEW_DISTINGUISH',
                                labelClass: 'pfans3006view_column_13',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'departurecity',
                                label: 'label.PFANS3006VIEW_DEPARTURECITY',
                                labelClass: 'pfans3006view_column_13',
                                width: 150,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'welcomeboard',
                                label: 'label.PFANS3006VIEW_WELCOMEBOARD',
                                labelClass: 'pfans3006view_column_13',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'fellowmembers',
                                label: 'label.PFANS3006VIEW_FELLOWMEMBERS',
                                labelClass: 'pfans3006view_column_13',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'fellowmembersname',
                                label: 'label.PFANS3006VIEW_FELLOWMEMBERSNAME',
                                labelClass: 'pfans3006view_column_13',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                        ],
                        width: 850,
                        fix: false,
                        filter: true
                    }, {
                        code: 'guestinformation',
                        label: 'label.PFANS3006VIEW_GUESTINFORMATION',
                        child: [
                            {
                                code: 'guestname',
                                label: 'label.PFANS3002VIEW_GUESTNAME',
                                labelClass: 'pfans3006view_column_19',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                        ],
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'other',
                        label: 'label.PFANS3006VIEW_OTHER',
                        child: [
                            {
                                code: 'usenumber',
                                label: 'label.PFANS3006VIEW_USENUMBER',
                                labelClass: 'pfans3006view_column_20',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'remarks',
                                label: 'label.remarks',
                                labelClass: 'pfans3006view_column_20',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                        ],
                        width: 280,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'status',
                        label: 'label.status',
                        child: [
                            {
                                code: 'status',
                                label: 'label.approval_status',
                                labelClass: 'pfans3006view_column_22',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'operation',
                                label: 'label.operation',
                                labelClass: 'pfans3006view_column_22',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                        ],
                        width: 280,
                        fix: false,
                        filter: true
                    },
                    {
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
                        key: 'download',
                        name: 'button.downloadjjp',
                        disabled: false,
                        icon: 'el-icon-download'
                    }
                ],
                rowid: '',
                row_id: 'appointmentcarid',
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS3006Store/getAppointmentCar', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        response[j].status = getStatus(response[j].status);
                        if (response[j].usetype !== null && response[j].usetype !== "") {
                            let letUsetype = getDictionaryInfo(response[j].usetype);
                            if (letUsetype != null) {
                                response[j].usetype = letUsetype.value1;
                            }
                        }
                        if (response[j].distinguish !== null && response[j].distinguish !== "") {
                            let letDistinguish = getDictionaryInfo(response[j].distinguish);
                            if (letDistinguish != null) {
                                response[j].distinguish = letDistinguish.value1;
                            }
                        }
                        let user = getUserInfo(response[j].userid)
                        let nameflg = getOrgInfoByUserId(response[j].userid);
                        if (nameflg) {
                            response[j].centername = nameflg.centerNmae;
                            response[j].groupname = nameflg.groupNmae;
                            response[j].teamname = nameflg.teamNmae;
                        }
                        if (user) {
                            response[j].applicant = user.userinfo.customername;
                        }
                        if (response[j].welcomeboard !== null && response[j].welcomeboard !== "") {
                            if (this.$i18n) {
                                response[j].welcomeboard = response[j].welcomeboard === "1" ? this.$t('label.yes') : this.$t('label.no');
                            }
                        }
                        if (response[j].fellowmembers !== null && response[j].fellowmembers !== "") {
                            if (this.$i18n) {
                                response[j].fellowmembers = response[j].fellowmembers === "1" ? this.$t('label.yes') : this.$t('label.no');
                            }
                        }
                        if (response[j].usedate !== null && response[j].usedate !== "") {
                            response[j].usedate = moment(response[j].usedate).format("YYYY-MM-DD");
                        }
                        if (response[j].starttime !== null && response[j].starttime !== "") {
                            response[j].starttime = moment(response[j].starttime).format("HH:mm");
                        }
                        if (response[j].endtime !== null && response[j].endtime !== "") {
                            response[j].endtime = moment(response[j].endtime).format("HH:mm");
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
            rowClick(row) {
                this.rowid = row.appointmentcarid;
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
                        name: 'PFANS3006FormView',
                        params: {
                            _id: this.rowid,
                            disable: true
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS3006FormView',
                        params: {
                            _id: '',
                            disable: true
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
                        name: 'PFANS3006FormView',
                        params: {
                            _id: this.rowid,
                            disable: false
                        }
                    })
                }
                if (val === 'download') {
                  this.loading = true;
                  this.$store
                    .dispatch('PFANS3006Store/download', {})
                    .then(response => {
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
                }
            },
        }
    }
</script>

<style scoped>

</style>
