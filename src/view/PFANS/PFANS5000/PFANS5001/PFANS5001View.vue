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
        name: 'PFANS5001View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS5001VIEW",
                // 表格数据源
                data: [],
                // 列属性
                columns: [
                    {
                        code: 'numbers',
                        label: 'label.PFANS5001FORMVIEW_NUMBERS',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'project_name',
                        label: 'label.PFANS5001FORMVIEW_PROJECT_NAME',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'createby',
                        label: 'label.applicant',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'projecttype',
                        label: 'label.PFANS5001FORMVIEW_PROJECTTYPE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'leaderid',
                        label: 'label.PFANS5001FORMVIEW_LEADERID',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'startdate',
                        label: 'label.PFANS5001FORMVIEW_STARTDATE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'enddate',
                        label: 'label.PFANS5001FORMVIEW_ENDDATE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'CREATEON ',
                        label: 'label.PFANS2001VIEW_APPLICATIONTIME',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'status',
                        label: 'label.PFANS2023VIEW_COMPLETIONSTATUS',
                        width: 150,
                        fix: false,
                        filter: true
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
                ],
                rowid: '',
                row:'companyprojects_id',
            };
        },
        mounted() {
            this.loading = true;

            this.$store
                .dispatch('PFANS5001Store/getFpans5001List', {})
                //根据user_id取组织架构和user_name
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if(response[j].createby !== null && response[j].createby !== "") {
                            let user = getUserInfo(response[j].createby);
                            if (user) {
                                response[j].createby = user.userinfo.customername;
                            }
                        }
                        //项目负责人
                        if(response[j].leaderid !== null && response[j].leaderid !== "") {
                            let user = getUserInfo(response[j].leaderid);
                            if (user) {
                                response[j].leaderid = user.userinfo.customername;
                            }
                        }
                        //项目类型
                        if (response[j].projecttype !== null && response[j].projecttype !== "") {
                            let letStage = getDictionaryInfo(response[j].projecttype);
                            if (letStage != null) {
                                response[j].projecttype = letStage.value1;
                            }
                        }
                        //状态
                        response[j] .status = getStatus(response[j] .status);
                        // 开始时间
                        if (response[j].startdate !== null && response[j].startdate !== "") {
                            response[j].startdate = moment(response[j].startdate).format("YYYY-MM-DD");
                        }
                        //预计完成时间
                        if (response[j].enddate !== null && response[j].enddate !== "") {
                            response[j].enddate = moment(response[j].enddate).format("YYYY-MM-DD");
                        }
                        //申请时间
                        if (response[j].CREATEON !== null && response[j].CREATEON !== "") {
                            response[j].CREATEON = moment(response[j].CREATEON).format("YYYY-MM-DD");
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
                    this.loading = false;
                })

        },
        methods: {
            rowClick(row) {
                this.rowid = row.companyprojects_id;
            },
            //点击上部按钮处理
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
                        name: 'PFANS5001FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS5001FormView',
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
                        name: 'PFANS5001FormView',
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
