<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui';
    import moment from "moment";
    import {getDictionaryInfo, getStatus, getUserInfo} from '@/utils/customize';

    export default {
        name: 'PFANS2016View',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS2016VIEW",
                data: [],
                columns: [
                    {
                        code: 'username',
                        label: 'label.user_name',
                        width: 90,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'centername',
                        label: 'label.center',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'groupname',
                        label: 'label.group',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'teamname',
                        label: 'label.team',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'applicationdate',
                        label: 'label.application_date',
                        width: 130,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'errortype',
                        label: 'label.PFANS2016VIEW_ERRORTYPE',
                        width: 130,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'lengthtime',
                        label: 'label.PFANS2016VIEW_PERIODLENGTH',
                        width: 130,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'occurrencedate',
                        label: 'label.PFANS2016VIEW_OCCURRENCEDATE',
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'finisheddate',
                        label: 'label.PFANS2016VIEW_FINISHEDDATE',
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'status',
                        label: 'label.approval_status',
                        width: 130,
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
                row_id: 'abnormalid'
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS2016Store/getFpans2016List', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if (this.$i18n) {
                            response[j].lengthtime = parseFloat(response[j].lengthtime/8).toFixed(1) + this.$t('label.PFANS2016FORMVIEW_DAYS');
                        }
                        let user = getUserInfo(response[j].user_id);
                        if (user) {
                            response[j].username = user.userinfo.customername;
                        }
                        response[j].centername = response[j].centerid;
                        response[j].groupname = response[j].groupid;
                        response[j].teamname = response[j].teamid;

                        if (response[j].status !== null && response[j].status !== "") {
                            response[j].status = getStatus(response[j].status);
                        }
                        if (response[j].applicationdate !== null && response[j].applicationdate !== "") {
                            response[j].applicationdate = moment(response[j].applicationdate).format("YYYY-MM-DD");
                        }
                        if (response[j].occurrencedate !== null && response[j].occurrencedate !== "") {
                            response[j].occurrencedate = moment(response[j].occurrencedate).format("YYYY-MM-DD");
                        }
                        if (response[j].finisheddate !== null && response[j].finisheddate !== "") {
                            response[j].finisheddate = moment(response[j].finisheddate).format("YYYY-MM-DD");
                        }
                        if (response[j].errortype !== null && response[j].errortype !== "") {
                            let letErrortype = getDictionaryInfo(response[j].errortype);
                            if (letErrortype != null) {
                                response[j].errortype = letErrortype.value1;
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
                this.rowid = row.abnormalid;
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
                        name: 'PFANS2016FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS2016FormView',
                        params: {
                            _id: '',
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
                        name: 'PFANS2016FormView',
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
