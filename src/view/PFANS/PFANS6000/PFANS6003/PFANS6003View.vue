<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui'
    import {getUserInfo, getDictionaryInfo} from '@/utils/customize';

    export default {
        name: 'PFANS6003View',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS6003VIEW",
                data: [],
                columns: [
                    {
                        //供应商名称
                        code: 'supchinese',
                        label: 'label.PFANS6001VIEW_SUPPLIERNAME',
                        width: 90,
                        fix: false,
                        filter: true,
                    },
                    {
                        //负责人
                        code: 'liableperson',
                        label: 'label.ASSETS1002VIEW_USERID',
                        width: 80,
                        fix: false,
                        filter: true,
                    },
                    {
                        //项目联络人
                        code: 'prochinese',
                        label: 'label.PFANS6002FORMVIEW_PROJECTPERSON',
                        width: 100,
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
                        width: 120,
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
                        code: 'addchinese',
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
                row: 'supplierinfor_id'
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS6003Store/getsupplierinfor')
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].supchinese !== null && response[j].supchinese !== "") {
                            let supchinese = getUserInfo(response[j].supchinese);
                            if (supchinese) {
                                response[j].supchinese = user.userinfo.customername;
                            }
                        }
                        if (response[j].liableperson !== null && response[j].liableperson !== "") {
                            let liableperson = getUserInfo(response[j].liableperson);
                            if (liableperson) {
                                response[j].liableperson = user.userinfo.customername;
                            }
                        }
                        if (response[j].prochinese !== null && response[j].prochinese !== "") {
                            let prochinese = getUserInfo(response[j].prochinese);
                            if (prochinese) {
                                response[j].prochinese = user.userinfo.customername;
                            }
                        }
                        if (response[j].protelephone !== null && response[j].protelephone !== "") {
                            let protelephone = getUserInfo(response[j].protelephone);
                            if (protelephone) {
                                response[j].protelephone = user.userinfo.customername;
                            }
                        }
                        if (response[j].commontperson !== null && response[j].commontperson !== "") {
                            let commontperson = getUserInfo(response[j].commontperson);
                            if (commontperson) {
                                response[j].commontperson = user.userinfo.customername;
                            }
                        }
                        if (response[j].comtelephone !== null && response[j].comtelephone !== "") {
                            let comtelephone = getUserInfo(response[j].comtelephone);
                            if (comtelephone) {
                                response[j].comtelephone = user.userinfo.customername;
                            }
                        }
                        if (response[j].addchinese !== null && response[j].addchinese !== "") {
                            let addchinese = getUserInfo(response[j].addchinese);
                            if (addchinese) {
                                response[j].addchinese = user.userinfo.customername;
                            }
                        }
                        if (response[j].perscale !== null && response[j].perscale !== "") {
                            let perscale = getDictionaryInfo(response[j].perscale);
                            if (perscale != null) {
                                response[j].perscale = perscale.value1;
                            }
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
                this.rowid = row.supplierinfor_id;
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
                        name: 'PFANS6003FormView',
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
                        name: 'PFANS6003FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS6003FormView',
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
