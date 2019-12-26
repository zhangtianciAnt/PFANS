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
        name: 'PFANS6004View',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS6004VIEW",
                data: [],
                columns: [
                    {
                        //供应商名称
                        code: 'suppliername',
                        label: 'label.PFANS6001VIEW_SUPPLIERNAME',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //姓名
                        code: 'expname',
                        label: 'label.user_name',
                        width: 90,
                        fix: false,
                        filter: true,
                    },
                    {
                        //性别
                        code: 'sex',
                        label: 'label.sex',
                        width: 80,
                        fix: false,
                        filter: true,
                    },
                    {
                        //年龄
                        code: 'age',
                        label: 'label.PFANSUSERFORMVIEW_AGE',
                        width: 80,
                        fix: false,
                        filter: true,
                    },
                    {
                        //学历
                        code: 'education',
                        label: 'label.PFANS2026VIEW_EDUCATIONALBACKGROUND',
                        width: 90,
                        fix: false,
                        filter: true,
                    },
                    {
                        //毕业院校
                        code: 'graduateschool',
                        label: 'label.PFANS6001VIEW_GRADUATESCHOOL',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //技术分类
                        code: 'technology',
                        label: 'label.PFANS2003VIEW_TECHNOLOGY',
                        width: 100,
                        fix: false,
                        filter: true,
                    },
                    {
                        //RN
                        code: 'rn',
                        label: 'label.PFANS2003FORMVIEW_RN',
                        width: 80,
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
                row: 'expatriatesinfor_id'
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS6004Store/getexpatriatesinfor')
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].suppliername !== null && response[j].suppliername !== "") {
                            let suppliername = getUserInfo(response[j].suppliername);
                            if (suppliername) {
                                response[j].suppliername = user.userinfo.customername;
                            }
                        }
                        if (response[j].expname !== null && response[j].expname !== "") {
                            let expname = getUserInfo(response[j].expname);
                            if (expname) {
                                response[j].expname = user.userinfo.customername;
                            }
                        }
                        if (response[j].sex !== null && response[j].sex !== "") {
                            let sex = getDictionaryInfo(response[j].sex);
                            if (sex != null) {
                                response[j].sex = sex.value1;
                            }
                        }
                        if (response[j].age !== null && response[j].age !== "") {
                            let age = getUserInfo(response[j].age);
                            if (age) {
                                response[j].age = user.userinfo.customername;
                            }
                        }
                        if (response[j].education !== null && response[j].education !== "") {
                            let education = getDictionaryInfo(response[j].education);
                            if (education != null) {
                                response[j].education = education.value1;
                            }
                        }
                        if (response[j].graduateschool !== null && response[j].graduateschool !== "") {
                            let graduateschool = getUserInfo(response[j].graduateschool);
                            if (graduateschool) {
                                response[j].graduateschool = user.userinfo.customername;
                            }
                        }
                        if (response[j].technology !== null && response[j].technology !== "") {
                            let technology = getDictionaryInfo(response[j].technology);
                            if (technology != null) {
                                response[j].technology = technology.value1;
                            }
                        }
                        if (response[j].technology !== null && response[j].technology !== "") {
                            let technology = getDictionaryInfo(response[j].technology);
                            if (technology != null) {
                                response[j].technology = technology.value1;
                            }
                        }
                        if (response[j].rn !== null && response[j].rn !== "") {
                            let rn = getDictionaryInfo(response[j].rn);
                            if (rn != null) {
                                response[j].rn = rn.value1;
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
                this.rowid = row.expatriatesinfor_id;
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
                        name: 'PFANS6004FormView',
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
                        name: 'PFANS6004FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS6004FormView',
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
