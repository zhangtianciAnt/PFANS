<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :title="title" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    let moment = require('moment');
    export default {
        name: 'PFANS2009View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: 'title.PFANS2009VIEW',
                data: [],
                columns: [
                    {
                        code: 'createon',
                        label: 'label.PFANS2009VIEW_JUNE',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'user_id',
                        label: 'label.PFANS2009VIEW_NUMBER',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'totalwages',
                        label: 'label.PFANS2009VIEW_KONJIKI',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'taxestotal',
                        label: 'label.PFANS2009VIEW_TAXENGINEERING',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'total3',
                        label: 'label.PFANS2009VIEW_TAXWORKS',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'socialinsurance',
                        label: 'label.PFANS2009VIEW_KAIHO',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'comaccumulationfund',
                        label: 'label.PFANS2009VIEW_KOKIN',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'bonusmoney',
                        label: 'label.PFANS2009VIEW_STOCK',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'appreciation',
                        label: 'label.PFANS2009VIEW_MONTHLYTAX',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'labourunionfunds',
                        label: 'label.PFANS2009VIEW_INDUSTRIALPARTY',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'other4',
                        label: 'label.PFANS2009VIEW_DEPARTMENT',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'other5',
                        label: 'label.PFANS2009VIEW_FUKUTOSHI',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'total',
                        label: 'label.PFANS2009VIEW_COSTLABOR',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'overtimesubsidy',
                        label: 'label.PFANS2009VIEW_OVERTIME',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'thismonthadjustment',
                        label: 'label.PFANS2009VIEW_INCOMETAX',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'realwages',
                        label: 'label.PFANS2009VIEW_ACHIEVEMENTS',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'shouldcumulative',
                        label: 'label.PFANS2009VIEW_SHAKONORIHIRO',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'other6',
                        label: 'label.PFANS2009VIEW_KOJIKIN',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                ],
                buttonList: [
                    // {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                ],
            };
        },
        mounted() {
            this.getWages();
        },
        methods: {
            getWages() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS2005Store/getWagecompany')
                    .then(response => {
                        for (let i = 0; i < response.length; i++) {
                            response[i].createon = moment(response[i].createon).format('YYYY-MM');
                            response[i].createon = response[i].createon.replace('-',this.$t("label.year")) + this.$t("label.day")
                        }
                        this.data = response;
                        this.loading = false;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000,
                        });
                        this.loading = false;
                    });
            },
        }
    };
</script>

<style scoped>

</style>
