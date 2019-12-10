<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" >
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import { Message } from 'element-ui'
    import moment from "moment";
    import {getOrgInfoByUserId,getUserInfo,getStatus,getDictionaryInfo,getOrgInfo} from '@/utils/customize';

    export default {
        name: 'PFANS1018View',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS1018VIEW",
                data: [],
                columns: [
                    {
                        code: 'user_id',
                        label: 'label.applicant',
                        width: 90,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'appcenter_id',
                        label: 'label.center',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'appgroup_id',
                        label: 'label.group',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'appteam_id',
                        label: 'label.team',
                        width: 100,
                        fix: false,
                        filter: true,
                    },
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
                ],
                rowid: '',
                row : 'global_id'
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS1018Store/getglobal')
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        let center = getOrgInfo(response[j].appcenter_id);
                        let group = getOrgInfo(response[j].appgroup_id);
                        let team = getOrgInfo(response[j].appteam_id);
                        if(center){
                            response[j].appcenter_id = center.companyname;
                        }
                        if(group){
                            response[j].appgroup_id = group.companyname;
                        }
                        if(team){
                            response[j].appteam_id = team.departmentname;
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
                    this.loading = false
                })
        },
        methods: {
            rowClick(row) {
                this.rowid = row.global_id;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === 'update') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'error',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS1018FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
                if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.error_09'),
                            type: 'error',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS1018FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS1018FormView',
                        params: {
                            _id: '',
                            disabled: true
                        }
                    })
                }
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
