<template>
  <EasyNormalTable
    :title="title"
    :columns="columns"
    :data="data"
    :rowid="row_id"
    :buttonList="buttonList"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading"
  >
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui'
    import {getStatus, getUserInfo,getOrgInfoByUserId} from "../../../../utils/customize";
    let moment = require("moment");

    export default {
        name: "PFANS3003View",
        components: {
            moment,
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS3003VIEW",
                data: [],
                columns: [
                    {
                        code: 'applicant',
                        label: 'label.applicant',
                        width: 100,
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
                        code: 'occupational',
                        label: 'label.PFANS3003VIEW_OCCUPATIONAL',
                        width: 140,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'insideline',
                        label: 'label.PFANS3003VIEW_INSIDELINE',
                        width: 140,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'email',
                        label: 'label.email',
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
                    },
                    {
                        code: 'status',
                        label: 'label.approval_status',
                        width: 140,
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
                    }
                ],
                rowid: '',
                row_id: 'businesscardid'
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS3003Store/getBusinessCard', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if (this.$i18n) {
                            response[j].lengthtime = parseFloat(response[j].lengthtime / 8).toFixed(1) + this.$t('label.PFANS3003FORMVIEW_DAYS');
                        }
                        response[j].status = getStatus(response[j].status);
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
                        if (response[j].plan !== null && response[j].plan !== "") {
                            if (this.$i18n) {
                                response[j].plan = response[j].plan === "1" ? this.$t('label.inside') : this.$t('label.outside');
                            }
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
                this.rowid = row.businesscardid;
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
                        name: 'PFANS3003FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS3003FormView',
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
                        name: 'PFANS3003FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped>

</style>
