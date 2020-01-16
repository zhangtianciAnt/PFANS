<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui'
    // import {getUserInfo, getDictionaryInfo} from '@/utils/customize';
    export default {
        name: "PFANS6005View",
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS6005VIEW",
                data: [],
                columns: [
                    {
                        //査定時間
                        code: 'checktime',
                        label: 'label.PFANS6005VIEW_CHECKTIME',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //单价设定姓名
                        code: 'priname',
                        label: 'label.PFANS2007VIEW_NAME',
                        width: 130,
                        fix: false,
                        filter: true,
                    },
                    {
                        //卒業年
                        code: 'graduationyear',
                        label: 'label.PFANS2024VIEW_GRADUATIONYEAR',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //会社名
                        code: 'clubname',
                        label: 'label.PFANS1036FORMVIEW_CLUBNAME',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //開発単価微調整（开发单价微调）
                        code: 'priceadjust',
                        label: 'label.PFANS6005VIEW_PRICEADJUST',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        //開発総単価(开发总单价)
                        code: 'sumprice',
                        label: 'label.PFANS6005VIEW_SUMPRICE',
                        width: 140,
                        fix: false,
                        filter: true,
                    },
                    {
                        //PSDCD相当ランク
                        code: 'PSDCDgrade',
                        label: 'label.PFANS6005VIEW_PSDCDGRADE',
                        width: 180,
                        fix: false,
                        filter: true,
                    },
                    {
                        //前年単価
                        code: 'lastyearprice',
                        label: 'label.PFANS6005VIEW_LASTYEARPRICE',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //前年差
                        code: 'lastyearpoor',
                        label: 'label.PFANS6005FORMVIEW_LASTYEARPOOR',
                        width: 110,
                        fix: false,
                        filter: true,
                    },
                    {
                        //备考
                        code: 'note',
                        label: 'label.PFANS6005FORMVIEW_NOTE',
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
                row: 'price_id'
            };
        },
        mounted() {
        },
        methods: {
            rowClick(row) {
                this.rowid = row.price_id;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
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
                        name: 'PFANS6005FormView',
                        params: {
                            _id: this.rowid,
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
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS6005FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS6005FormView',
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

<style scoped>

</style>
