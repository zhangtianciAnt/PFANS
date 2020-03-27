<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" ref="roletable"
                     :title="title" @buttonClick="buttonClick" v-loading="loading">
    </EasyNormalTable>
  </div>
</template>
<script>
    import {getToken} from '@/utils/auth'
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui';
    import moment from "moment";
    import {getUserInfo} from '@/utils/customize';

    export default {
        name: 'PFANS2017FromView',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                totaldata: [],
                listQuery: {
                    page: 1,
                    limit: 5
                },
                total: 0,
                message: [{hang: '', error: '',}],
                daoru: false,
                authHeader: {'x-auth-token': getToken()},
                postAction: process.env.BASE_API + '/punchcardrecord/importUser',
                addActionUrl: '',
                resultShow: false,
                result: false,
                file: null,
                successCount: 0,
                errorCount: 0,
                selectedlist: [],
                Message: false,
                cuowu: '',
                downloadLoading: false,
                punchcardrecord_date: '',
                jobnumber: '',
                loading: false,
                title: "title.PFANS2017VIEW",
                data: [],
                columns: [
                    {
                        code: 'user_id',
                        label: 'label.user_name',
                        width: 90,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'center_id',
                        label: 'label.center',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'group_id',
                        label: 'label.group',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'team_id',
                        label: 'label.team',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'punchcardrecord_date',
                        label: 'label.date',
                        width: 130,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'time_start',
                        label: 'label.PFANS2017VIEW_START',
                        width: 130,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'time_end',
                        label: 'label.PFANS2017VIEW_END',
                        width: 130,
                        fix: false,
                        filter: true
                    },
                ],
                buttonList: [
                    {'key': 'back', 'name': 'button.back', 'disabled': false, 'icon': 'el-icon-back'},
                ],
            };
        },
        mounted() {
            this.getPunchcardrecorddetail();
        },
        methods: {
            getPunchcardrecorddetail() {
                let parameter = {
                    jobnumber:this.$route.params.jobnumber,
                    punchcardrecord_date:this.$route.params.punchcardrecord_date,
                }
                alert(1);
                alert(parameter.jobnumber);
                alert(parameter.punchcardrecord_date);
                return;
                this.loading = true;
                this.$store
                    .dispatch('PFANS2017Store/getFpans2017List', {})
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {
                            let user = getUserInfo(response[j].user_id);
                            if (user) {
                                response[j].user_id = user.userinfo.customername;
                            }
                            if (response[j].punchcardrecord_date !== null && response[j].punchcardrecord_date !== "") {
                                response[j].punchcardrecord_date = moment(response[j].punchcardrecord_date).format("YYYY-MM-DD");
                            }
                            if (response[j].time_start !== null && response[j].time_start !== "") {
                                response[j].time_start = moment(response[j].time_start).format("HH:mm");
                            }
                            if (response[j].time_end !== null && response[j].time_end !== "") {
                                response[j].time_end = moment(response[j].time_end).format("HH:mm");
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
            buttonClick(val) {
                if (val === 'detail') {
                    if (this.jobnumber === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    alert(this.jobnumber);
                    alert(this.punchcardrecord_date);
                    return;
                    this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                    this.$router.push({
                        name: 'PFANS2010FormView',
                        params: {
                            userid: this.user_id,
                            years: this.years,
                            months: this.months,
                            disabled: false
                        }
                    })
                }

                //   else if('export2' === val){
                //   this.loading = true;
                //   this.$store
                //     .dispatch('PFANS2017Store/download', {})
                //     .then(response => {
                //       this.loading = false;
                //     })
                //     .catch(error => {
                //       Message({
                //         message: error,
                //         type: 'error',
                //         duration: 5 * 1000
                //       });
                //       this.loading = false;
                //     })
                // }
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-icon-upload {
    font-size: 6rem;
    color: #ffffff;
    text-align: center;
  }
</style>
