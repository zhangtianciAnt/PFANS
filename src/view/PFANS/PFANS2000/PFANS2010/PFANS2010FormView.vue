<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     :rowid="row_id"
                     @rowClick="rowClick"
                     @buttonClick="buttonClick"
                     v-loading="loading">
    </EasyNormalTable>
  </div>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui';

    export default {
        name: 'PFANS2010FormView',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: 'title.PFANS2010VIEW',
                data: [],
                rowid: '',
                row_id: 'attendance_id',
                columns: [
                    {
                        code: 'dates',
                        label: 'label.PFANS2010VIEW_APPLICATION',
                        width: 110,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'SERVICE',
                        label: 'label.PFANS2010VIEW_SERVICE',
                        child: [
                            {
                                code: 'normal',
                                label: 'label.PFANS2010VIEW_NORMAL',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'ordinaryindustry',
                                label: 'label.PFANS2010VIEW_OVERTIME',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'ordinaryindustrynight',
                                label: 'label.PFANS2010VIEW_NIGHTOVERTIME',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'weekendindustry',
                                label: 'label.PFANS2010VIEW_RETIREMENT',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'weekendindustrynight',
                                label: 'label.PFANS2010VIEW_NIGHTRETIREMENT',
                                width: 90,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'statutoryresidue',
                                label: 'label.PFANS2010VIEW_HOLIDAYS',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'statutoryresiduenight',
                                label: 'label.PFANS2010VIEW_NIGHTHOLIDAYS',
                                width: 110,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'annualrestday',
                                label: 'label.PFANS2010VIEW_EVERYYEAR',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'specialday',
                                label: 'label.PFANS2010VIEW_OCCASIONS',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'youthday',
                                label: 'label.PFANS2010VIEW_YOUTHDAY',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'womensday',
                                label: 'label.PFANS2010VIEW_WOMENSDAY',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 1650,
                    },
                    {
                        code: 'SICKLEAVE',
                        label: 'label.PFANS2010VIEW_SICKLEAVE',
                        child: [
                            {
                                code: 'shortsickleave',
                                label: 'label.PFANS2010VIEW_SHORT',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'longsickleave',
                                label: 'label.PFANS2010VIEW_LONG',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 2100,
                    },
                    {
                        code: 'compassionateleave',
                        label: 'label.PFANS2010VIEW_LEAVE',
                        width: 80,
                    },
                    {
                        code: 'annualrest',
                        label: 'label.PFANS2010VIEW_INHUGH',
                        width: 80,
                    },
                    {
                        code: 'daixiu',
                        label: 'label.PFANS2010VIEW_DAYOFF',
                        width: 80,
                    },
                    {
                        code: 'nursingleave',
                        label: 'label.PFANS2010VIEW_MATERNITY',
                        width: 80,
                    },
                    {
                        code: 'welfare',
                        label: 'label.PFANS2010VIEW_WELFARE',
                        width: 80,
                    },
                    {
                        code: '',
                        label: 'label.PFANS2010VIEW_ABSENCE',
                        child: [
                            {
                                code: 'late',
                                label: 'label.PFANS2010VIEW_LATE',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'leaveearly',
                                label: 'label.PFANS2010VIEW_LEAVEEARLY',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'absenteeism',
                                label: 'label.PFANS2010VIEW_ABSENTEEISM',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 450,
                    },
                    {
                        code: 'recognitionstate',
                        label: 'label.PFANS2010VIEW_RECOGNITION',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                ],
                buttonList: [
                    {'key': 'back', 'name': 'button.back', 'disabled': false, 'icon': 'el-icon-back'},
                    {'key': 'recognition', 'name': 'button.recognition', 'disabled': false, 'icon': 'el-icon-check'}
                ],
            };
        },
        methods: {
            rowClick(row) {
                this.rowid = row.attendance_id;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path)
                if (val === 'back') {
                    this.$router.push({
                        name: 'PFANS2010View',
                    });
                }
                else if (val === 'recognition') {
                    // this.loading = true;
                    // this.$store
                    //     .dispatch('PFANS2010Store/download', {})
                    //     .then(response => {
                    //         this.loading = false;
                    //     })
                    //     .catch(error => {
                    //         Message({
                    //             message: error,
                    //             type: 'error',
                    //             duration: 5 * 1000
                    //         });
                    //         this.loading = false;
                    //     })
                }
            },
            getAttendancelist() {
                let parameter = {
                    user_id:this.$route.params.userid,
                    years:this.$route.params.years,
                    months:this.$route.params.months,
                }
                this.loading = true;
                this.$store
                    .dispatch('PFANS2010Store/getAttendancelist', parameter)
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {
                            if(response[j].recognitionstate === "0"){
                                if (this.$i18n) {
                                    response[j].recognitionstate = this.$t('label.PFANS2010VIEW_RECOGNITION0');
                                }
                            }
                            else{
                                if (this.$i18n) {
                                    response[j].recognitionstate = this.$t('label.PFANS2010VIEW_RECOGNITION1');
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
                            duration: 5 * 1000,
                        });
                        this.loading = false;
                    });
            },
        },
        mounted() {
            this.getAttendancelist();
            this.$store.commit('global/SET_OPERATEID', '');
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  .pfans2010view_column_5 {
    background: #5CBFA3;
    color: #ffffff;
  }

  .pfans2010view_column_8 {
    background: #AEDFD1;
    color: #ffffff;
  }

  .pfans2010view_column_11 {
    background: #F2BC6A;
    color: #ffffff;
  }

  .pfans2010view_column_14 {
    background: #E5575E;
    color: #ffffff;
  }

  .pfans2010view_column_15 {
    background: #F2ABAF;
    color: #ffffff;
  }

  .pfans2010view_column_16 {
    background: #CCCCCC;
    color: #ffffff;
  }

  .pfans2010view_column_17 {
    background: #425E72;
    color: #ffffff;
  }
</style>

