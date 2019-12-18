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
    import moment from "moment";

    export default {
        name: 'PFANS2010FormView',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: 'title.PFANS2010FOMRVIEW',
                data: [],
                rowid: '',
                row_id: 'attendance_id',
                columns: [
                    {
                        code: 'dates',
                        label: 'label.PFANS2010VIEW_APPLICATION',
                        labelClass: 'pfans2010view_column_17',
                        width: 65,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'SERVICE',
                        label: 'label.PFANS2010VIEW_SERVICE',
                        labelClass: 'pfans2010view_column_5',
                        child: [
                            {
                                code: 'normal',
                                label: 'label.PFANS2010VIEW_NORMAL',
                                labelClass: 'pfans2010view_column_8',
                                width: 90,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'ordinaryindustry',
                                label: 'label.PFANS2010VIEW_OVERTIME',
                                labelClass: 'pfans2010view_column_8',
                                width: 120,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'ordinaryindustrynight',
                                label: 'label.PFANS2010VIEW_NIGHTOVERTIME',
                                labelClass: 'pfans2010view_column_8',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'weekendindustry',
                                label: 'label.PFANS2010VIEW_RETIREMENT',
                                labelClass: 'pfans2010view_column_8',
                                width: 120,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'weekendindustrynight',
                                label: 'label.PFANS2010VIEW_NIGHTRETIREMENT',
                                labelClass: 'pfans2010view_column_8',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'statutoryresidue',
                                label: 'label.PFANS2010VIEW_HOLIDAYS',
                                labelClass: 'pfans2010view_column_8',
                                width: 160,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'statutoryresiduenight',
                                label: 'label.PFANS2010VIEW_NIGHTHOLIDAYS',
                                labelClass: 'pfans2010view_column_8',
                                width: 190,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'annualrestday',
                                label: 'label.PFANS2010VIEW_EVERYYEAR',
                                labelClass: 'pfans2010view_column_8',
                                width: 160,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'specialday',
                                label: 'label.PFANS2010VIEW_OCCASIONS',
                                labelClass: 'pfans2010view_column_8',
                                width: 180,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'youthday',
                                label: 'label.PFANS2010VIEW_YOUTHDAY',
                                labelClass: 'pfans2010view_column_8',
                                width: 130,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'womensday',
                                label: 'label.PFANS2010VIEW_WOMENSDAY',
                                labelClass: 'pfans2010view_column_8',
                                width: 130,
                                fix: false,
                                filter: true,
                            },
                        ],
                    },
                    {
                        code: 'SICKLEAVE',
                        label: 'label.PFANS2010VIEW_SICKLEAVE',
                        labelClass: 'pfans2010view_column_9',
                        child: [
                            {
                                code: 'shortsickleave',
                                label: 'label.PFANS2010VIEW_SHORT',
                                labelClass: 'pfans2010view_column_10',
                                width: 105,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'longsickleave',
                                label: 'label.PFANS2010VIEW_LONG',
                                labelClass: 'pfans2010view_column_10',
                                width: 105,
                                fix: false,
                                filter: true,
                            },
                        ],
                    },
                    {
                        code: 'compassionateleave',
                        label: 'label.PFANS2010VIEW_LEAVE',
                        labelClass: 'pfans2010view_column_11',
                        width: 40,
                    },
                    {
                        code: 'annualrest',
                        label: 'label.PFANS2010VIEW_INHUGH',
                        labelClass: 'pfans2010view_column_11',
                        width: 40,
                    },
                    {
                        code: 'daixiu',
                        label: 'label.PFANS2010VIEW_DAYOFF',
                        labelClass: 'pfans2010view_column_11',
                        width: 40,
                    },
                    {
                        code: 'nursingleave',
                        label: 'label.PFANS2010VIEW_MATERNITY',
                        labelClass: 'pfans2010view_column_11',
                        width: 70,
                    },
                    {
                        code: 'welfare',
                        label: 'label.PFANS2010VIEW_WELFARE',
                        labelClass: 'pfans2010view_column_11',
                        width: 60,
                    },
                    {
                        code: '',
                        label: 'label.PFANS2010VIEW_ABSENCE',
                        labelClass: 'pfans2010view_column_14',
                        child: [
                            {
                                code: 'late',
                                label: 'label.PFANS2010VIEW_LATE',
                                labelClass: 'pfans2010view_column_15',
                                width: 90,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'leaveearly',
                                label: 'label.PFANS2010VIEW_LEAVEEARLY',
                                labelClass: 'pfans2010view_column_15',
                                width: 90,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'absenteeism',
                                label: 'label.PFANS2010VIEW_ABSENTEEISM',
                                labelClass: 'pfans2010view_column_15',
                                width: 120,
                                fix: false,
                                filter: true,
                            },
                        ],
                    },
                    {
                        code: 'recognitionstate',
                        label: 'label.PFANS2010VIEW_RECOGNITION',
                        labelClass: 'pfans2010view_column_16',
                        width: 80,
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
                            response[j].dates = moment(response[j].dates).format("YYYY-MM-DD");
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
    height: 40px;
    background: #5CBFA3;
    color: #ffffff;
  }

  .pfans2010view_column_8 {
    height: 40px;
    background: #AEDFD1;
    color: #ffffff;
  }
  .pfans2010view_column_9 {
    height: 40px;
    background: rgb(38,150,195);
    color: #ffffff;
  }
  .pfans2010view_column_10 {
    height: 40px;
    background: rgb(147,203,225);
    color: #ffffff;
  }
  .pfans2010view_column_11 {
    height: 80px;
    background: #F2BC6A;
    color: #ffffff;
  }

  .pfans2010view_column_14 {
    height: 40px;
    background: #E5575E;
    color: #ffffff;
  }

  .pfans2010view_column_15 {
    height: 40px;
    background: #F2ABAF;
    color: #ffffff;
  }

  .pfans2010view_column_16 {
    height: 81px;
    background: #CCCCCC;
    color: #ffffff;
  }

  .pfans2010view_column_17 {
    height:81px;
    background: #425E72;
    color: #ffffff;
  }
</style>

