<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui'

    export default {
        name: 'PFANS6002View',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS6002VIEW",
                data: [],
                columns: [
                    {
                        //客户名称
                        code: 'custchinese',
                        label: 'label.PFANS5001FORMVIEW_CUSTOMERNAME',
                        width: 90,
                        fix: false,
                        filter: true,
                    },
                    {
                        //负责人
                        code: 'liableperson',
                        label: 'label.ASSETS1002VIEW_USERID',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //项目联络人
                        code: 'projectperson',
                        label: 'label.PFANS6002VIEW_LIABLEPERSON',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //联系电话
                        code: 'protelephone',
                        label: 'label.PFANS2003FORMVIEW_CONTACTINFORMATION',
                        width: 100,
                        fix: false,
                        filter: true,
                    },
                    {
                        //共同事务联络人
                        code: 'commontperson',
                        label: 'label.PFANS6002VIEW_COMMONTPERSON',
                        width: 100,
                        fix: false,
                        filter: true,
                    },
                    {
                        //联系电话
                        code: 'comtelephone',
                        label: 'label.PFANS2003FORMVIEW_CONTACTINFORMATION',
                        width: 100,
                        fix: false,
                        filter: true,
                    },
                    {
                        //地址
                        code: 'address',
                        label: 'label.PFANS6002VIEW_ADDRESS',
                        width: 100,
                        fix: false,
                        filter: true,
                    },
                    {
                        //人员规模
                        code: 'perscale',
                        label: 'label.PFANS6002VIEW_PERSCALE',
                        width: 100,
                        fix: false,
                        filter: true,
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
                ],
                rowid: '',
                row: 'customerinfor_id'
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS6002Store/getcustomerinfor')
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        let lst = getUserInfo(response[j].custchinese);
                        response[j].custchinese = lst.custchinese;
                        response[j].liableperson = lst.liableperson;
                        response[j].projectperson = lst.prochinese;
                        response[j].protelephone = lst.protelephone;
                        response[j].commontperson = lst.comchinese;
                        response[j].comtelephone = lst.comtelephone;
                        response[j].address = lst.addchinese;
                        response[j].perscale = lst.perscale;
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
                this.rowid = row.customerinfor_id;
            },
            buttonClick(val) {
                this.$store.commit('customerinfor/SET_HISTORYURL', this.$route.path);
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
                        name: 'PFANS6002FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
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
                        name: 'PFANS6002FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS6002FormView',
                        params: {
                            _id: '',
                            disabled: false
                        }
                    })
                }
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
