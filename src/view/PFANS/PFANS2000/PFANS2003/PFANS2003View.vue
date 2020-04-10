<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>
<script>
    import EasyNormalTable from '@/components/EasyNormalTable'
    import {Message} from 'element-ui'
    import moment from 'moment'
    import {getUserInfo} from '@/utils/customize'
    import {getDictionaryInfo, getOrgInfo,getDepartmentById,getorgGroupList} from "../../../../utils/customize";

    export default {
        name: 'PFANS2003View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: 'title.PFANS2003VIEW',
                data: [],
                columns: [
                    {
                        code: 'name',
                        label: 'label.user_name',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'accept_date',
                        label: 'label.PFANS2003VIEW_ACCEPTDATE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'interviewdep',
                        label: 'label.PFANS2003FORMVIEW_INTERVIEWDEP',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'source',
                        label: 'label.PFANS2003VIEW_SOURCE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'member',
                        label: 'label.PFANS2003VIEW_REfERRER',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'school',
                        label: 'label.PFANS2003VIEW_SCHOOL',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'technology',
                        label: 'label.PFANS2003VIEW_TECHNOLOGY',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'createon',
                        label: 'label.information_start',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
                ],
                rowid: '',
                row: 'interviewrecord_id',
            }
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS2003Store/getinterviewrecord')
                .then(response => {
                    console.log("response",response)
                    for (let j = 0; j < response.length; j++) {
                        // if(response.interviewdep){
                        //     let group = getorgGroupList(response[j].interviewdep);
                        //     let groupname = group.groupname
                        //     response[j].interviewdep = groupname
                        // }
                        if(response[j].interviewdep){
                            response[j].interviewdep = getDepartmentById(response[j].interviewdep);
                        }

                        let user = getUserInfo(response[j].member);
                        if (user) {
                            response[j].member = getUserInfo(response[j].member).userinfo.customername;
                        }
                        if (response[j].accept_date !== null && response[j].accept_date !== '') {
                            if (this.$i18n) {
                                response[j].accept_date = moment(response[j].accept_date).format('YYYY-MM-DD')
                            }
                        }
                        if (response[j].recommend_date !== null && response[j].recommend_date !== '') {
                            if (this.$i18n) {
                                response[j].recommend_date = moment(response[j].recommend_date).format('YYYY-MM-DD')
                            }
                        }
                        if (response[j].interview_date !== null && response[j].interview_date !== '') {
                            if (this.$i18n) {
                                response[j].interview_date = moment(response[j].interview_date).format('YYYY-MM-DD')
                            }
                        }
                        if (response[j].createon !== null && response[j].createon !== '') {
                            if (this.$i18n) {
                                response[j].createon = moment(response[j].createon).format('YYYY-MM-DD')
                            }
                        }
                        if (response[j].source !== null && response[j].source !== '') {
                            if (response[j].source === 'PR041001') {
                                response[j].member = response[j].member
                            } else if (response[j].source === 'PR041002') {
                                response[j].member = response[j].network
                            }
                            let dictionaryInfo = getDictionaryInfo(response[j].source);
                            if (dictionaryInfo) {
                                response[j].source = dictionaryInfo.value1;
                            }
                        }
                        if (response[j].technology !== null && response[j].technology !== '') {
                            let dictionaryInfo = getDictionaryInfo(response[j].technology);
                            if (dictionaryInfo) {
                                response[j].technology = dictionaryInfo.value1;
                            }
                        }
                        let recommenddep = getOrgInfo(response[j].recommenddep);
                        if (recommenddep) {
                            response[j].recommenddep = recommenddep.companyname;
                        }
                    }
                  // for (let i = 0; i < response.length; i++) {
                  //   response[i].recommenddep = getDepartmentById(response[i].recommenddep);
                  // }
                    this.data = response;
                    this.loading = false
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
                this.rowid = row.interviewrecord_id
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
                        return
                    }
                    this.$router.push({
                        name: 'PFANS2003FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS2003FormView',
                        params: {
                            _id: '',
                            disabled: true
                        }
                    })
                }
                if (val === 'update') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return
                    }
                    this.$router.push({
                        name: 'PFANS2003FormView',
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
