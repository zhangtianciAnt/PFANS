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
                message: [{hang: '', error: '',}],
                result: false,
                Message: false,
                punchcardrecord_date: '',
                jobnumber: '',
                loading: false,
                title: "title.PFANS2017FROMVIEW",
                data: [],
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
            this.getPunchcardrecorddetail();
        },
        methods: {
            getPunchcardrecorddetail() {
                let parameter = {
                    jobnumber:this.$route.params.jobnumber
                }
                // let parameter = {
                //     jobnumber:this.$route.params.jobnumber,
                //     punchcardrecord_date:this.$route.params.punchcardrecord_date,
                // }
                this.loading = true;
                this.$store
                    .dispatch('PFANS2017Store/getgetDetail', parameter)
                    .then(response => {
                        for (let i = 0; i < response.length; i++) {
                            if (this.$i18n) {
                                if (response[i].eventno === '0') {
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
            buttonClick(val) {
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
