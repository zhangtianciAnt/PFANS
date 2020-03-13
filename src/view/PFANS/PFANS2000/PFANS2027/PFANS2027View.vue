<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable'
    import {Message} from 'element-ui'
    import moment from 'moment'
    import {getStatus, getUserInfo,getDictionaryInfo,getOrgInfoByUserId} from '@/utils/customize'

    export default {
        name: "PFANS2027View",
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: 'title.PFANS2027VIEW',
                data: [],
                columns: [
                    {
                        code: 'group_id',
                        label: 'label.PFANS2027VIEW_GROUP',
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'evaluationday',
                        label: 'label.PFANS2027VIEW_COMMENTARYDATE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'subjectmon',
                        label: 'label.PFANS2027VIEW_COMMENTARYMONTHS',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'subject',
                        label: 'label.PFANS2027VIEW_COMMENTARY',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'evaluatenum',
                        label: 'label.PFANS2027VIEW_EVALUATIONTIME',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'user_id',
                        label: 'label.PFANS2027VIEW_EVALUATIONMEN',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'status',
                        label: 'label.PFANS5005VIEW_STATUS',
                        width: 150,
                        fix: false,
                        filter: true
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, "icon": "el-icon-plus"},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'}
                ],
                rowid: '',
                row_id: 'lunarbonus_id'
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS2027Store/getLunarbonus', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].user_id !== null && response[j].user_id !== "") {

                            let lst = getOrgInfoByUserId(response[j].user_id);
                            if(lst){
                                response[j].group_id = lst.groupNmae;
                            }
                            let rst = getUserInfo(response[j].user_id);
                            if (rst) {
                                response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
                            }
                            if (response[j].subjectmon !== null && response[j].subjectmon !== "") {
                                let letUsetype = getDictionaryInfo(response[j].subjectmon);
                                if (letUsetype != null) {
                                    response[j].subjectmon = letUsetype.value1;
                                }
                            }
                            if (response[j].subject !== null && response[j].subject !== "") {
                                let letUsetype = getDictionaryInfo(response[j].subject);
                                if (letUsetype != null) {
                                    response[j].subject = letUsetype.value2;
                                }
                            }

                            if (response[j].evaluatenum !== null && response[j].evaluatenum !== "") {
                                let letUsetype = getDictionaryInfo(response[j].evaluatenum);
                                if (letUsetype != null) {
                                    response[j].evaluatenum = letUsetype.value1;
                                }
                            }

                            if (response[j].evaluationday !== null && response[j].evaluationday !== "") {
                                response[j].evaluationday = moment(response[j].evaluationday).format("YYYY-MM-DD");
                            }
                            if (response[j].status !== null && response[j].status !== "") {
                                response[j].status = getStatus(response[j].status);
                            }

                            // if(response[j].stage!==null&&response[j].stage!==""){
                            //     if(response[j].stage=='0'){
                            //         response[j].stage=this.$t('label.PFANS2027VIEW');
                            //     }else if(response[j].stage=='1'){
                            //         response[j].stage=this.$t('label.PFANS2027VIEW_RIGHT');
                            //     }else if(response[j].stage=='2'){
                            //         response[j].stage=this.$t('label.PFANS2027VIEW_DATA');
                            //     }else {
                            //         response[j].stage=this.$t('label.PFANS2027VIEW_OUT');
                            //     }
                            // }
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
                this.rowid = row.appreciation_id;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === "view") {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS2027FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                } else if (val === "insert") {
                    this.$router.push({
                        name: 'PFANS2027FormView',
                        params: {
                            _id: '',
                            disabled: true
                        }
                    })
                } else if (val === "update") {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS2027FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
