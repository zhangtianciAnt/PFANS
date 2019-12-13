<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     v-loading="loading">
    </EasyNormalTable>
  </div>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {getUserInfo, getOrgInfoByUserId} from '@/utils/customize';
    import {Message} from 'element-ui';

    export default {
        name: 'PFANS2010View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: 'title.PFANS2010VIEW',
                data: [],
                columns: [
                    {
                        code: 'dates',
                        label: 'label.PFANS2010VIEW_application',
                        labelClass: 'pfans2010view_column_17',
                        width: 30,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: '',
                        label: 'label.PFANS2010VIEW_SERVICE',
                        labelClass: 'pfans2010view_column_5',
                        child: [
                            {//正常
                                code: 'normal',
                                label: 'label.PFANS2010VIEW_NORMAL',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//平日残業
                                code: 'ordinaryindustry',
                                label: 'label.PFANS2010VIEW_OVERTIME',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//平日深夜残業
                                code: 'ordinaryindustrynight',
                                label: 'label.PFANS2010VIEW_NIGHTOVERTIME',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//周末残業
                                code: 'weekendindustry',
                                label: 'label.PFANS2010VIEW_RETIREMENT',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//周末深夜残業
                                code: 'weekendindustrynight',
                                label: 'label.PFANS2010VIEW_NIGHTRETIREMENT',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//法定节假日残業
                                code: 'statutoryresidue',
                                label: 'label.PFANS2010VIEW_HOLIDAYS',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//法定节假日深夜残業
                                code: 'statutoryresiduenight',
                                label: 'label.PFANS2010VIEW_NIGHTHOLIDAYS',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//一齐年休日出勤
                                code: 'annualrestday',
                                label: 'label.PFANS2010VIEW_EVERYYEAR',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//会社特别休日出勤
                                code: 'specialday',
                                label: 'label.PFANS2010VIEW_OCCASIONS',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//青年节出勤
                                code: 'youthday',
                                label: 'label.PFANS2010VIEW_YOUTHDAY',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//妇女节出勤
                                code: 'womensday',
                                label: 'label.PFANS2010VIEW_WOMENSDAY',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: '',
                        label: 'label.PFANS2010VIEW_SICKLEAVE',
                        child: [
                            {//短病假
                                code: 'PFANS2010VIEW_NORMAL',
                                label: 'label.PFANS2010VIEW_SHORT',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//长病假
                                code: 'ordinaryindustry',
                                label: 'label.PFANS2010VIEW_LONG',
                                labelClass: 'pfans2010view_column_8',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {//事假
                        code: 'compassionateleave',
                        label: 'label.PFANS2010VIEW_LEAVE',
                        width: 40,
                        fix: false,
                        filter: true,
                        labelClass: 'pfans2010view_column_11',
                    },
                    {//年休
                        code: 'annualrest',
                        label: 'label.PFANS2010VIEW_INHUGH',
                        width: 40,
                        fix: false,
                        filter: true,
                        labelClass: 'pfans2010view_column_11',
                    },
                    {//代休
                        code: 'daixiu',
                        label: 'label.PFANS2010VIEW_DAYOFF',
                        width: 40,
                        fix: false,
                        filter: true,
                        labelClass: 'pfans2010view_column_11',
                    },
                    {//产休护理假
                        code: 'nursingleave',
                        label: 'label.PFANS2010VIEW_MATERNITY',
                        width: 40,
                        fix: false,
                        filter: true,
                        labelClass: 'pfans2010view_column_11',
                    },
                    {//福利假期
                        code: 'welfare',
                        label: 'label.PFANS2010VIEW_WELFARE',
                        width: 40,
                        fix: false,
                        filter: true,
                        labelClass: 'pfans2010view_column_11',
                    },
                    {
                        code: '',
                        label: 'label.PFANS2010VIEW_ABSENCE',
                        labelClass: 'pfans2010view_column_14',
                        child: [
                            {//迟到
                                code: 'late',
                                label: 'label.PFANS2013VIEW_BEGINNING',
                                labelClass: 'pfans2010view_column_15',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//早退
                                code: 'leaveearly',
                                label: 'label.PFANS2013VIEW_DEDUCT',
                                labelClass: 'pfans2010view_column_15',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                            {//无故旷工
                                code: 'absenteeism',
                                label: 'label.PFANS2013VIEW_REMAINING',
                                labelClass: 'pfans2010view_column_15',
                                width: 25,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 50,
                        fix: false,
                        filter: true,
                    },
                    {//承认状态
                        code: 'recognitionstate',
                        label: 'label.PFANS2010VIEW_RECOGNITION',
                        labelClass: 'pfans2010view_column_16',
                        width: 25,
                        fix: false,
                        filter: true,
                    },
                ],
                buttonList: [],
            };
        },
        methods: {
            getAttendancelist() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS2010Store/getAttendancelist', {})
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {
                            let user = getUserInfo(response[j].user_id);
                            if (user) {
                                response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
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

