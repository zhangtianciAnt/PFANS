<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {getDictionaryInfo, getStatus, getUserInfo} from '@/utils/customize';
    import {Message} from 'element-ui';
    import moment from "moment";

    export default {
        name: 'PFANS6010View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS6010VIEW",
                // 表格数据源
                data: [],
                // 列属性
                columns: [
                    {
                        code: 'groupid',
                        label: 'label.group',
                        width: 110,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'jobnumber',
                        label: 'label.PFANS1036FORMVIEW_JOBNUMBER',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'cost',
                        label: 'label.PFANS6008VIEW_COST',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: "status",
                        label: "label.approval_status",
                        width: 130,
                        fix: false,
                        filter: false
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
                ],
                rowid: '',
                row: 'comproject_id',
            };
        },
        mounted() {

        },
        methods: {
            rowClick(row) {
                this.rowid = row.comproject_id;
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
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS6010FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS6010FormView',
                        params: {
                            _id: "",
                            disabled: true
                        }
                    })
                }
                if (val === 'edit') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS6010FormView',
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
