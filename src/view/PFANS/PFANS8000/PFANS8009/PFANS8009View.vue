<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row_id" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui';
    export default {
        name: 'PFANS8009View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: '',
                data: [],
                codetype: '',
                codename: '',
                // 列属性
                columns: [
                    {
                        code: 'code',
                        label: 'label.PFANS8009VIEW_CODE',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'value1',
                        label: 'label.PFANS8009VIEW_VALUE',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                ],
                buttonList: [
                    {'key': 'back', 'name': 'button.back', 'disabled': false, 'icon': 'el-icon-back'},
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                ],
                rowid: '',
                row_id: 'code',
            };
        },
        mounted() {
            this.codetype = this.$route.params.codetype;
            this.getCompanyProjectList(this.$route.params.codetype);
        },
        methods: {
            getCompanyProjectList(codetype) {
                if (codetype === 'PJ') {
                    this.title = 'label.PFANS8009VIEW_MANAGEMENT';
                } else if (codetype === 'CT') {
                    this.title = 'label.PFANS8009VIEW_CONTRACT';
                } else if (codetype === 'PR') {
                    this.title = 'label.PFANS8009VIEW_PERSONNELMATTERS';
                } else if (codetype === 'PP') {
                    this.title = 'label.PFANS8009VIEW_PFANSPJ';
                } else if (codetype === 'PC') {
                    this.title = 'label.PFANS8009VIEW_FINANCIAL';
                } else if (codetype === 'BP') {
                    this.title = 'label.PFANS8009VIEW_PFANSBP';
                } else if (codetype === 'PA') {
                    this.title = 'label.PFANS8009VIEW_ASSETS';
                } else if (codetype === 'PG') {
                    this.title = 'label.PFANS8009VIEW_PFANSSYSTEM';
                }
                this.dispatch('PFANS8009Store/getDictionary', codetype);
            },
            dispatch(val, codetype) {
                this.data = [];
                this.loading = true;
                this.$store
                    .dispatch(val, {"code": codetype})
                    .then(response => {
                        this.data = response;
                        this.loading = false;
                    });
            },
            rowClick(row) {
                this.rowid = row.code;
                this.codename = row.value1;
            },
            buttonClick(val) {
                //this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                this.$store.commit('global/SET_HISTORYURL', '');
                let letname = 'PFANS8009FormView';
                if (val === 'back') {
                    this.$router.push({
                        name: 'PFANS8009PointView',
                    });
                }
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
                        name: letname,
                        params: {
                            code: this.rowid,
                            disabled: true,
                            codetype: this.codetype,
                            codename: this.codename
                        },
                    });
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
                        name: letname,
                        params: {
                            code: this.rowid,
                            disabled: false,
                            codetype: this.codetype,
                            codename: this.codename
                        },
                    });
                }
            },
        },
    };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
