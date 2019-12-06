<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>
<script>
    import EasyNormalTable from '@/components/EasyNormalTable'
    import {Message} from 'element-ui'
    import moment from 'moment'
    import {getStatus, getUserInfo} from '@/utils/customize'

    export default {
        name: 'PFANS1017View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: 'title.PFANS1017VIEW',
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
                        code: 'application',
                        label: 'label.application',
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
                row: 'psdcd_id',
            }
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS1017Store/getPsdcd')
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        let user = getUserInfo(response[j].user_id);
                        if(user)
                        {
                            response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
                        }
                        response[j].center_id = response[j].center_id;
                        response[j].group_id = response[j].group_id;
                        response[j].team_id = response[j].team_id;
                        response[j].status = getStatus(response[j].status);
                        // if (response[j].implement_date !== null && response[j].implement_date !== '') {
                        //     response[j].implement_date = moment(response[j].implement_date).format('YYYY-MM-DD')
                        // }
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
                this.rowid = row.psdcd_id
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'error',
                            duration: 2 * 1000
                        });
                        return
                    }
                    this.$router.push({
                        name: 'PFANS1017FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS1017FormView',
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
                            type: 'error',
                            duration: 2 * 1000
                        });
                        return
                    }
                    this.$router.push({
                        name: 'PFANS1017FormView',
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
