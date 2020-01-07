<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui'
    import moment from "moment";
    import {getUserInfo, getDictionaryInfo, getOrgInfo} from '@/utils/customize';

    export default {
        name: 'PFANS6001View',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS6001VIEW",
                data: [],
                columns: [
                    {
                        //姓名
                        code: 'coopername',
                        label: 'label.user_name',
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
                        //供应商名称
                        code: 'suppliername',
                        label: 'label.PFANS6001VIEW_SUPPLIERNAME',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        //面试部门
                        code: 'interviewdep',
                        label: 'label.PFANS2003FORMVIEW_INTERVIEWDEP',
                        width: 100,
                        fix: false,
                        filter: true,
                    },
                    {
                        //面试结果
                        code: 'result',
                        label: 'label.PFANS6001VIEW_RESULT',
                        width: 100,
                        fix: false,
                        filter: true,
                    },
                    {
                        //入职与否
                        code: 'whetherentry',
                        label: 'label.PFANS2003FORMVIEW_WHETHERENTRY',
                        width: 100,
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
                        //面试时间
                        code: 'interview_date',
                        label: 'label.PFANS2003FORMVIEW_INTERVIEWDATE',
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
                row: 'cooperinterview_id'
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS6001Store/getcooperinterview')
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].coopername !== null && response[j].coopername !== "") {
                            let coopername = getUserInfo(response[j].coopername);
                            if (coopername) {
                                response[j].coopername = user.userinfo.customername;
                            }
                        }
                        if (response[j].graduateschool !== null && response[j].graduateschool !== "") {
                            let graduateschool = getUserInfo(response[j].graduateschool);
                            if (graduateschool) {
                                response[j].graduateschool = user.userinfo.customername;
                            }
                        }
                        if (response[j].suppliername !== null && response[j].suppliername !== "") {
                            let suppliername = getUserInfo(response[j].suppliername);
                            if (suppliername) {
                                response[j].suppliername = user.userinfo.customername;
                            }
                        }
                        let interviewdep = getOrgInfo(response[j].interviewdep);
                        if (interviewdep) {
                            response[j].interviewdep = interviewdep.companyname;
                        }
                        if (response[j].result !== null && response[j].result !== "") {
                            let letStage = getDictionaryInfo(response[j].result);
                            if (letStage != null) {
                                response[j].result = letStage.value1;
                            }
                        }
                        if (response[j].whetherentry !== null && response[j].whetherentry !== "") {
                            let letStage = getDictionaryInfo(response[j].whetherentry);
                            if (letStage != null) {
                                response[j].whetherentry = letStage.value1;
                            }
                        }
                        if (response[j].technology !== null && response[j].technology !== "") {
                            let letStage = getDictionaryInfo(response[j].technology);
                            if (letStage != null) {
                                response[j].technology = letStage.value1;
                            }
                        }
                        if (response[j].interview_date !== null && response[j].interview_date !== "") {
                            response[j].interview_date = moment(response[j].interview_date).format("YYYY-MM-DD");
                        }
                    }
                    // 部门id赋值（缺少接口）
                    // let interviewdepname = (response.interviewdep || " ").split(",");
                    // if(interviewdepname.length > 0){
                    //   let name = "";
                    //   for(let i = 0; i <interviewdepname.length; i ++){
                    //       if(interviewdepname[i] && getUserInfo(interviewdepname[i]) != null){
                    //           name += getUserInfo(
                    //               interviewdepname[i]
                    //           ).value + ',';
                    //       }
                    //       name = name.substring(0,name.length - 1);
                    //       response.interviewdep = name;
                    //   }
                    // };
                    // for(let i = 0; i < response.length; i++){
                    //     response[i].groupNmae = getUserInfo(response[i].interviewdep);
                    // }
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
                this.rowid = row.cooperinterview_id;
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
                        name: 'PFANS6001FormView',
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
                        name: 'PFANS6001FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS6001FormView',
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
