<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns1" :data="data" :title="title" v-loading="loading"
                     v-show="showTable1">
      <el-select @change="changed" slot="customize" v-model="region">
        <el-option :label="$t('label.PFANS2006VIEW_WAGES')" value="1"></el-option>
        <el-option :label="$t('label.PFANS2006VIEW_BONUS')" value="2"></el-option>
      </el-select>
    </EasyNormalTable>
    <EasyNormalTable :buttonList="buttonList" :columns="columns2" :data="data" :title="title" v-loading="loading"
                     v-show="!showTable1">
      <el-select @change="changed" slot="customize" v-model="region">
        <el-option :label="$t('label.PFANS2006VIEW_WAGES')" value="1"></el-option>
        <el-option :label="$t('label.PFANS2006VIEW_BONUS')" value="2"></el-option>
      </el-select>
    </EasyNormalTable>
  </div>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import moment from 'moment';
    import {getStatus, getUserInfo,getCooperinterviewList,getDepartmentById} from '@/utils/customize';

    export default {
        name: 'PFANS2006View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                region: '1',
                loading: false,
                // title: 'title.PFANS2006VIEW',
                title: '',
                data: [],
                activeName: '',
                buttonList: [],
                showTable1: true,
                num:'',
                //工资详细
                columns1: [
                    {
                        code: 'basicinfor1',
                        label: 'label.PFANS2006VIEW_BASICINFOR1',
                        child: [
                            {
                                code: 'rowindex',
                                label: 'label.PFANS2006VIEW_NO',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'giving_id',
                                label: 'label.PFANS2006VIEW_DATE',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'department_id',
                                label: 'label.PFANS2006VIEW_CLUB',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'user_id',
                                label: 'label.PFANS2006VIEW_LASTNAME',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'workdate',
                                label: 'label.PFANS2006VIEW_JOINED',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'sex',
                                label: 'label.PFANS2006VIEW_SEX',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'onlychild',
                                label: 'label.PFANS2006VIEW_SINGLECHILD',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'type',
                                label: 'label.PFANS2006VIEW_ENTRYTYPE',
                                width: 170,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'sociology',
                                label: 'label.PFANS2006VIEW_SCHOLARSHIP',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'society',
                                label: 'label.PFANS2006VIEW_SOCIETY',
                                width: 170,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'registered',
                                label: 'label.PFANS2006VIEW_REGISTER',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 1650,
                    },
                    {
                        code: 'tax',
                        label: 'label.PFANS2006VIEW_TAX',
                        child: [
                            {
                                code: 'actualamount',
                                label: 'label.PFANS2006VIEW_BASICSALARY',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'supplement',
                                label: 'label.PFANS2006VIEW_REIMBURSEMENT',
                                width: 210,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'telephonesubsidy',
                                label: 'label.PFANS2006VIEW_TELEPHONE',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'housingsubsidy',
                                label: 'label.PFANS2006VIEW_RESIDENTIAL',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'lunchsubsidy',
                                label: 'label.PFANS2006VIEW_AFTERNOON',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'overtimesubsidy',
                                label: 'label.PFANS2006VIEW_KASUKE',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'other1',
                                label: 'label.PFANS2006VIEW_OTHER1',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'total1',
                                label: 'label.PFANS2006VIEW_SUBTOTAL1',
                                width: 190,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'traffic',
                                label: 'label.PFANS2006VIEW_TRANSPORTATION',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'washingtheory',
                                label: 'label.PFANS2006VIEW_WOMANWASHING',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'other2',
                                label: 'label.PFANS2006VIEW_OTHER2',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'appreciation',
                                label: 'label.PFANS2006VIEW_MONTHLYBONUS',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'other3',
                                label: 'label.PFANS2006VIEW_OTHER3',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'total2',
                                label: 'label.PFANS2006VIEW_SUBTOTAL2',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 2100,
                    },
                    {
                        code: 'taxestotal',
                        label: 'label.PFANS2006VIEW_INDUSTRY',
                        width: 240,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'free',
                        label: 'label.PFANS2006VIEW_FREE',
                        child: [
                            {
                                code: 'heating',
                                label: 'label.PFANS2006VIEW_HEATING',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'onlychildmoney',
                                label: 'label.PFANS2006VIEW_OLONECHILD',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'total3',
                                label: 'label.PFANS2006VIEW_SUBTOTAL3',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 450,
                    },
                    {
                        code: 'totalwages',
                        label: 'label.PFANS2006VIEW_ARSENAL',
                        width: 240,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'security',
                        label: 'label.PFANS2006VIEW_SECURITY',
                        child: [
                            {
                                code: 'endowmentinsurance',
                                label: 'label.PFANS2006VIEW_OLD',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'medicalinsurance',
                                label: 'label.PFANS2006VIEW_MEDICAL',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'unemploymentinsurance',
                                label: 'label.PFANS2006VIEW_UNEMPLOYMENT',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 450,
                    },
                    {
                        code: 'socialinsurance',
                        label: 'label.PFANS2006VIEW_SOCIALSECURITY',
                        width: 230,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'accumulationfund',
                        label: 'label.PFANS2006VIEW_PUBLICMONEY',
                        width: 240,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'disciplinarycontrol',
                        label: 'label.PFANS2006VIEW_SECURITYMON',
                        width: 320,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'thismonthterm',
                        label: 'label.PFANS2006VIEW_EXCLUSIVE',
                        width: 230,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'thismonthadditional',
                        label: 'label.PFANS2006VIEW_ACCUMULATED',
                        width: 230,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'thismonthdutyfree',
                        label: 'label.PFANS2006VIEW_UNACCUMULATED',
                        width: 230,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'lastdutyfree',
                        label: 'label.PFANS2006VIEW_ANNUAL',
                        width: 230,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'onlytax',
                        label: 'label.PFANS2006VIEW_ONLYTAX',
                        child: [
                            {
                                code: 'housingmoneys',
                                label: 'label.PFANS2006VIEW_RESIDENTIALTAX',
                                width: 170,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'other4',
                                label: 'label.PFANS2006VIEW_COMPANYBOSS',
                                width: 240,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'other5',
                                label: 'label.PFANS2006VIEW_OTHER5',
                                width: 180,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 150,
                    },
                    {
                        code: 'shouldwages',
                        label: 'label.PFANS2006VIEW_RESPONSIBLE',
                        width: 360,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'shouldcumulative',
                        label: 'label.PFANS2006VIEW_CUMULATIVE',
                        width: 220,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'shouldpaytaxes',
                        label: 'label.PFANS2006VIEW_INCOME',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'thismonthadjustment',
                        label: 'label.PFANS2006VIEW_THISMONTH',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'realwages',
                        label: 'label.PFANS2006VIEW_ACTUAL',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                ],
                //奖金详细
                columns2: [
                    {
                        code: 'years',
                        label: 'label.PFANS2007VIEW_YEAR',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'bename',
                        label: 'label.PFANS2007VIEW_NAME',
                        width: 180,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'totalbonus1',
                        label: 'label.PFANS2007VIEW_GOLDLEAF',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'paymentmet',
                        label: 'label.PFANS2007VIEW_TAXMETHOD',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'payable',
                        label: 'label.PFANS2007VIEW_COMBINEDTAX',
                        width: 220,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'totalbonus2',
                        label: 'label.PFANS2007VIEW_GOLDLEAF',
                        width: 220,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'salary',
                        label: 'label.PFANS2007VIEW_KOZO',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'taxpayable',
                        label: 'label.PFANS2007VIEW_TAX',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'monthlyaverage',
                        label: 'label.PFANS2006VIEW_MONTHLYAVERAGE',
                        width: 300,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'taxrate',
                        label: 'label.PFANS2007VIEW_CASH',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'quickdeduction',
                        label: 'label.PFANS2007VIEW_ARITHMETIC',
                        width: 250,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'bonustax',
                        label: 'label.PFANS2007VIEW_GOLD',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'amount',
                        label: 'label.PFANS2007VIEW_IEMIKANE',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'remarks',
                        label: 'label.remarks',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                ],

            };
        },
        mounted() {
            debugger
            this.title = this.$t('title.PFANS2006VIEW') + this.$t('title.allcompany')
            this.getTaxestotal();
        },
        methods: {
            getTaxestotal(){
                this.loading = true;
                this.$store
                    .dispatch('PFANS2006Store/getTaxestotal', {})
                    .then(response => {
                        console.log("response",response)
                        debugger
                        for (let j = 0; j < response.length; j++) {
                            response[j].rowindex = j+1;

                            if(response[j].giving_id !== null && response[j].giving_id !== "") {
                                response[j].giving_id = response[j].giving_id.substring(0,4) + '-' + response[j].giving_id.substring(4,6)
                                // response[j].giving_id = moment(response[j].giving_id).format('YYYY-MM');
                            }

                            if(response[j].department_id !== null && response[j].department_id !== "") {
                                let user = getDepartmentById(response[j].department_id);
                                if (user) {
                                    response[j].department_id = user.coopername;
                                }
                            }

                            if (response[j].user_id !== null && response[j].user_id !== '') {
                                let rst = getUserInfo(response[j].user_id);
                                if (rst) {
                                    debugger;
                                    response[j].user_id = rst.userinfo.customername;
                                    // response[j].department_id = rst.userinfo.centername;
                                }
                            }

                            if (response[j].workdate !== null && response[j].workdate !== '') {
                                response[j].workdate = moment(response[j].workdate).format('YYYY-MM-DD');
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
                        this.loading = false
                    })
            },
            getBonus(){
                this.loading = true;
                this.$store
                    .dispatch('PFANS2006Store/getBonus', {})
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {
                            if (response[j].bename !== null && response[j].bename !== '') {
                                let rst = getUserInfo(response[j].bename);
                                if (rst) {
                                    debugger;
                                    response[j].bename = rst.userinfo.customername;
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
                        this.loading = false
                    })
            },
            changed() {
                if (this.region === '2') {
                    this.showTable1 = false;
                    this.title = this.$t('label.PFANS2006VIEW_BONUS') + this.$t('title.allcompany')
                    this.getBonus();
                } else if (this.region === '1') {
                    this.showTable1 = true;
                    this.title = this.$t('title.PFANS2006VIEW') + this.$t('title.allcompany')
                    this.getTaxestotal();

                }
            },
        },
    };
</script>

<style scoped>

</style>
