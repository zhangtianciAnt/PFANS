<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>
<script>
    import EasyNormalTable from '@/components/EasyNormalTable'
    import {Message} from 'element-ui'
    import moment from 'moment'
    import {getStatus, getUserInfo,getOrgInfoByUserId} from '@/utils/customize'

    export default {
        name: 'PFANS2014View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: 'title.PFANS2014VIEW',
                data: [],
                columns: [
                    {
                        code: 'user_id',
                        label: 'label.applicant',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'center_id',
                        label: 'label.center',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'group_id',
                        label: 'label.group',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'team_id',
                        label: 'label.team',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'worktime',
                        label: 'label.PFANS2014VIEW_HOURS',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'implement_date',
                        label: 'label.PFANS2014FORMVIEW_STARTDATE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'status',
                        label: 'label.approval_status',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
                ],
                rowid: '',
                row: 'flexibleworkid',
            }
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS2014Store/getFlexiblework')
                .then(response => {
                    if(response.length > 0){
                        let now = new Date();
                        now = moment(now.setMonth(now.getMonth() + 6)).format("YYYY-MM-DD");
                        let application_date = moment(response[0].application_date).format("YYYY-MM-DD");
                        if(application_date > now){
                            this.buttonList[1].disabled = true;
                        }
                    }
                    for (let j = 0; j < response.length; j++) {
                        let user = getUserInfo(response[j].user_id);
                        let nameflg = getOrgInfoByUserId(response[j].user_id);
                        if (nameflg) {
                            response[j].center_id = nameflg.centerNmae;
                            response[j].group_id = nameflg.groupNmae;
                            response[j].team_id = nameflg.teamNmae;
                        }
                        if(user)
                        {
                            response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
                        }
                        response[j].status = getStatus(response[j].status);
                        if (response[j].implement_date !== null && response[j].implement_date !== '') {
                            response[j].implement_date = moment(response[j].implement_date).format('YYYY-MM-DD')
                        }
                    }
                    this.data = response;
                    this.loading = false
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
                this.rowid = row.flexibleworkid
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
                        return
                    }
                    this.$router.push({
                        name: 'PFANS2014FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS2014FormView',
                        params: {
                            _id: '',
                            disabled: true
                        }
                    })
                }
                if (val === 'update') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return
                    }
                    this.$router.push({
                        name: 'PFANS2014FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
