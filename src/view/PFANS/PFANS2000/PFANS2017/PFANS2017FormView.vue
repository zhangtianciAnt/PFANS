<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" ref="roletable"
                     :title="title" @buttonClick="buttonClick" v-loading="loading">
      <el-tag v-if="this.resultShow" slot="customize" type="success" style="float: left;margin-left: 3vw;font-size:15px;margin-top:-4px">{{$t('label.PFANS2017VIEW_WORKHOURS')}}&nbsp;&nbsp;&nbsp;&nbsp;{{this.workHours}}</el-tag>
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
                message: [{hang: '', error: '',}],
                result: false,
                Message: false,
                punchcardrecord_date: '',
                jobnumber: '',
                loading: false,
                title: "title.PFANS2017FROMVIEW",
                data: [],
                workHours: 0,
                resultShow: false,
                columns: [
                    {
                        code: 'punchcardrecord_date',
                        label: 'label.PFANS2017VIEW_DKSJ',
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'eventno',
                        label: 'label.PFANS2017VIEW_EVENTNO',
                        width: 100,
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
            if(this.$route.params.jobnumber === ''){
                //获取当日考勤
                this.getnowPunchcardrecorddetail();
            }
            else{
                this.getPunchcardrecorddetail();
            }
        },
        methods: {
            getPunchcardrecorddetail() {
                let parameter = {
                    //update gbb 20210323 获取打卡记录时删除人员名称条件 start
                    //user_id:this.$route.params.user_id,
                    //update gbb 20210323 获取打卡记录时删除人员名称条件 end
                    jobnumber:this.$route.params.jobnumber,
                    punchcardrecord_date:this.$route.params.punchcardrecord_date,
                }
                this.loading = true;
                this.$store
                    .dispatch('PFANS2017Store/getPunDetail', parameter)
                    .then(response => {
                        for (let i = 0; i < response.length; i++) {
                            if (this.$i18n) {
                                if (response[i].eventno === '1') {
                                    //进门
                                    response[i].eventno = this.$t('label.PFANS2017VIEW_ENTER');
                                }
                                else{
                                    //出门
                                    response[i].eventno = this.$t('label.PFANS2017VIEW_OUT');
                                }
                            }
                            response[i].punchcardrecord_date = moment(response[i].punchcardrecord_date).format('YYYY-MM-DD HH:mm:ss')
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
            getnowPunchcardrecorddetail() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS2017Store/getTodayPunDetaillist')
                    .then(response => {
                        for (let i = 0; i < response.length; i++) {
                            if(i == 0){
                                this.resultShow = true;
                                if(Number(response[i].tenantid) > 0){
                                    this.workHours = Math.round(response[i].tenantid * 100) / 100;
                                }
                            }
                            if (this.$i18n) {
                                if (response[i].eventno === '1') {
                                    //进门
                                    response[i].eventno = this.$t('label.PFANS2017VIEW_ENTER');
                                }
                                else{
                                    //出门
                                    response[i].eventno = this.$t('label.PFANS2017VIEW_OUT');
                                }
                            }
                            if(i === response.length - 1){
                                response[i].eventno = '';
                            }
                            response[i].punchcardrecord_date = moment(response[i].punchcardrecord_date).format('YYYY-MM-DD HH:mm:ss')
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
                this.$store.commit('global/SET_HISTORYURL', this.$route.path)
                if (val === 'back') {
                    this.$router.push({
                        name: 'PFANS2017View',
                    });
                }
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
