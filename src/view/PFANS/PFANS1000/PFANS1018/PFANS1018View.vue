<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui'
    import {getUserInfo} from '@/utils/customize';

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
                row: 'global_id'
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS1018Store/getglobal', {'user_id': this.$route.params._id})
                .then(response => {
                    debugger;
                    for (let j = 0; j < response.length; j++) {
                        //解决数据库乱码问题
                        let lst = getUserInfo(response[j].user_id);
                        if (lst) {
                            response[j].user_id = lst.userinfo.customername;
                        }
                        //因为数据库中有相应的字段，且columns中code与数据库对应，所以可省略
                        // response[j].appcenter_id = lst.centerNmae;
                        // response[j].appgroup_id = lst.groupNmae;
                        // response[j].appteam_id = lst.teamNmae;
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

<style lang="scss" rel="stylesheet/scss">

</style>
