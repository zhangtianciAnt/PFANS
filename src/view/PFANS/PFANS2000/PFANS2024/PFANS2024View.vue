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
        name: 'PFANS2024View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS2024VIEW",
                // 表格数据源
                data: [],
                // 列属性
                columns: [
                    {
                        code: 'graduationyear',
                        label: 'label.PFANS2023VIEW_YEARS',
                        width: 90,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'user_name',
                        label: 'label.user_name',
                        width: 90,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'center_name',
                        label: 'label.center',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'group_name',
                        label: 'label.group',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'team_name',
                        label: 'label.team',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'skilllevel',
                        label: 'label.PFANS2024VIEW_SKILLLEVEL',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'schoolspecies',
                        label: 'label.PFANS2024VIEW_SCHOOLSPECIES',
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'entryyear',
                        label: 'label.PFANS2024VIEW_ENTRYYEAR',
                        width: 100,
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
                row:'talentplan_id',
            };
        },
        mounted() {
            this.loading = true;

            this.$store
                .dispatch('PFANS2024Store/getFpans2024List', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].user_id !== null && response[j].user_id !== "") {
                            let user = getUserInfo(response[j].user_id);
                            if (user) {
                                response[j].user_name = user.userinfo.customername;
                            }
                            response[j].center_name = response[j].center_id;
                            response[j].group_name = response[j].group_id;
                            response[j].team_name = response[j].team_id;
                        }
                            response[j].status = getStatus(response[j].status);
                        if (response[j].skilllevel !== null && response[j].skilllevel !== "") {
                            let letStage = getDictionaryInfo(response[j].skilllevel);
                            if (letStage != null) {
                                response[j].skilllevel = letStage.value1;
                            }
                        }
                        if (response[j].schoolspecies !== null && response[j].schoolspecies !== "") {
                            let letStage = getDictionaryInfo(response[j].schoolspecies);
                            if (letStage != null) {
                                response[j].schoolspecies = letStage.value1;
                            }
                        }
                        if (response[j].entryyear !== null && response[j].entryyear !== "") {
                            response[j].entryyear = moment(response[j].entryyear).format("YYYY-MM-DD");
                        }
                        if (response[j].graduationyear !== null && response[j].graduationyear !== "") {
                            response[j].graduationyear = moment(response[j].graduationyear).format("YYYY");
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
                this.rowid = row.talentplan_id;
            },
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
                        name: 'PFANS2024FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS2024FormView',
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
                        name: 'PFANS2024FormView',
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
