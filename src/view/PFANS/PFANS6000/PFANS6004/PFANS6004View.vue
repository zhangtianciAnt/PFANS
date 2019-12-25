<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui'
    import moment from "moment";

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
                        width: 90,
                        fix: false,
                        filter: true,
                    },
                    {
                        //年龄
                        code: 'age',
                        label: 'label.PFANSUSERFORMVIEW_AGE',
                        width: 90,
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
                row: 'expatriatesinfor_id'
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS6004Store/getexpatriatesinfor')
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        let lst = getUserInfo(response[j].suppliername);
                        response[j].expname = lst.expname;
                        response[j].sex = lst.sex;
                        response[j].age = lst.age;
                        response[j].education = lst.education;
                        response[j].graduateschool = lst.graduateschool;
                        response[j].technology = lst.technology;
                        response[j].rn = lst.rn;
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
                this.$store.commit('expatriatesinfor/SET_HISTORYURL', this.$route.path);
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
                        name: 'PFANS6004FormView',
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
                        name: 'PFANS6004FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS6004FormView',
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
