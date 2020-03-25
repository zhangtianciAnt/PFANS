<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {getDictionaryInfo, getStatus, getUserInfo,getOrgInfoByUserId} from '@/utils/customize';
    import {Message} from 'element-ui';
    import moment from "moment";

    export default {
        name: 'PFANS2023View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {

                loading: false,
                title: "title.PFANS2023VIEW",
                // 表格数据源
                data: [],
                // 列属性
                columns: [
                    {
                        code: 'createon',
                        label: 'label.PFANS2023VIEW_YEARS',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'user_name',
                        label: 'label.user_name',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'center_name',
                        label: 'label.center',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'group_name',
                        label: 'label.group',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'team_name',
                        label: 'label.team',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'stage',
                        label: 'label.PFANS2023VIEW_STAGE',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'status',
                        label: 'label.PFANS2023VIEW_COMPLETIONSTATUS',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'modifyon',
                        label: 'label.PFANS2023VIEW_MAKINGTIME',
                        width: 120,
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
                row:'goalmanagement_id',
            };
        },
        mounted() {
            this.loading = true;

            this.$store
                .dispatch('PFANS2023Store/getFpans2023List', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if(response[j].user_id !== null && response[j].user_id !== "") {
                            let user = getUserInfo(response[j].user_id);
                            let nameflg = getOrgInfoByUserId(response[j].user_id);
                            if (nameflg) {
                                response[j].center_name = nameflg.centerNmae;
                                response[j].group_name = nameflg.groupNmae;
                                response[j].team_name = nameflg.teamNmae;
                            }
                            if (user) {
                                response[j].user_name = user.userinfo.customername;
                            }
                        }
                        response[j] .status = getStatus(response[j] .status);
                        if (response[j].createon !== null && response[j].createon !== "") {
                            response[j].modifyon = moment(response[j].createon).format("YYYY-MM-DD");
                        }
                        if (response[j].stage !== null && response[j].stage !== "") {
                            let letStage = getDictionaryInfo(response[j].stage);
                            if (letStage != null) {
                                response[j].stage = letStage.value1;
                            }
                        }
                        if (response[j].createon !== null && response[j].createon !== "") {
                            response[j].createon = moment(response[j].createon).format("YYYY");
                        }
                        if(response[j].stage!==null&&response[j].stage!==""){
                            if(response[j].stage=='0'){
                                response[j].stage=this.$t('label.PFANS2023FORMVIEW_TARGETGOALSYEAR');
                            }else if(response[j].stage=='1'){
                                response[j].stage=this.$t('label.PFANS2023FORMVIEW_TARGETGOALSSEP');
                            }else if(response[j].stage=='2'){
                                response[j].stage=this.$t('label.PFANS2023FORMVIEW_TARGETGOALSDEC');
                            }else if(response[j].stage=='3'){
                                response[j].stage=this.$t('label.PFANS2023FORMVIEW_TARGETGOALSMAR');
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
                    this.loading = false;
                })

        },
        methods: {
            rowClick(row) {
                this.rowid = row.goalmanagement_id;
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
                        name: 'PFANS2023FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS2023FormView',
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
                        name: 'PFANS2023FormView',
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
