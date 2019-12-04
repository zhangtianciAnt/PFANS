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
    import EasyNormalTable from '@/components/EasyNormalTable'
    import {Message} from 'element-ui'
    import {getDictionaryInfo, getUserInfo} from '@/utils/customize'
    let moment = require("moment");

    export default {
        name: "PFANS1013View",
        components: {
            moment,
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS1013VIEW",
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
                        width: 130,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'groupname',
                        label: 'label.group',
                        width: 130,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'teamname',
                        label: 'label.team',
                        width: 130,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'budgetunit',
                        label: 'label.budgetunit',
                        width: 130,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'telephone',
                        label: 'label.PFANS1013VIEW_TELEPHONE',
                        width: 90,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'startdate',
                        label: 'label.PFANS1013VIEW_STARTDATE',
                        width: 150,
                        fix: false,
                        filter: true

                    },
                    {
                        code: 'enddate',
                        label: 'label.PFANS1013VIEW_ENDDATE',
                        width: 150,
                        fix: false,
                        filter: true

                    },
                    {
                        code: 'balance',
                        label: 'label.PFANS1013VIEW_BALANCE',
                        width: 100,
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
                ],
                rowid: '',
                row_id: 'evectionid'
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS1013Store/get')
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        let user = getUserInfo(response[j].userid);
                        if (user) {
                            response[j].applicant = user.userinfo.customername;
                        }
                        response[j].centername = response[j].centerid;
                        response[j].groupname = response[j].groupid;
                        response[j].teamname = response[j].teamid;
                        if (response[j].budgetunit !== null && response[j].budgetunit !== "") {
                            let letBudgetunit = getDictionaryInfo(response[j].budgetunit);
                            if (letBudgetunit != null) {
                                response[j].budgetunit = letBudgetunit.value1;
                            }
                        }
                        if (response[j].startdate !== null && response[j].startdate !== "") {
                            response[j].startdate = moment(response[j].startdate).format("YYYY-MM-DD");
                        }
                        if (response[j].enddate !== null && response[j].enddate !== "") {
                            response[j].enddate = moment(response[j].enddate).format("YYYY-MM-DD");
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
            this.rowid = row.evectionid;
          },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path)
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
                        name: 'PFANS1013FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                } else  if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS1013FormView',
                        params: {
                            _id: '',
                            disabled: true
                        }
                    })
                } else if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS1013FormView',
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


