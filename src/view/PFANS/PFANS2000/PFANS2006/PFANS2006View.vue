<template>
  <div>
    <el-date-picker unlink-panels
                    class="bigWidth"
                    v-model="workinghours"
                    type="daterange"
                    :end-placeholder="$t('label.enddate')"
                    :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                    :start-placeholder="$t('label.startdate')"
                    @change="clickdata"
    ></el-date-picker>

    <EasyNormalTable :buttonList="buttonList" @buttonClick="buttonClick" :columns="columns1" :data="data" :title="title" v-loading="loading"
                     v-show="showTable1" ref="roletable" :showSelection="isShow">
      <el-select @change="changed" slot="customize" v-model="region">
        <el-option :label="$t('label.PFANS2006VIEW_WAGES')" value="1"></el-option>
        <el-option :label="$t('label.PFANS2006VIEW_BONUS')" value="2"></el-option>
      </el-select>
    </EasyNormalTable>

    <EasyNormalTable :buttonList="buttonList" @buttonClick="buttonClick" :columns="columns2" :data="datatada" :title="title" v-loading="loading"
                     v-show="!showTable1" ref="rolet" :showSelection="isShow">
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
    import {Message} from "element-ui";
    import {getDepartmentById, getUserInfo} from '@/utils/customize';
    import json2csv from 'json2csv';
    export default {
        name: 'PFANS2006View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                isShow: true,
                selectedList: [],
                selectedlist: [],
                Taxestotal: '',
                Bonus: '',
                working: '',
                workinghours: '',
                starttime: '',
                endTime: '',
                region: '1',
                loading: false,
                // title: 'title.PFANS2006VIEW',
                title: '',
                data: [],
                datatada: [],
                activeName: '',
                buttonList: [  {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-download'},],
                showTable1: true,
                num: '',
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
                                code: 'bonus',
                                label: 'label.PFANS2006VIEW_SCHOLARSHIP',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'sociology',
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
                        code: 'basicinfor2',
                        label: 'label.PFANS2005FORMVIEW_BASICINFOR2',
                        child: [
                            {
                                code: 'pension',
                                label: 'label.PFANS2006VIEW_PENSION',
                                width: 230,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'medical',
                                label: 'label.PFANS2006VIEW_MEDICALAA',
                                width: 200,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'accumulation',
                                label: 'label.PFANS2005FORMVIEW_HOUSINGFUNDBASE',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'lastmonthbasic',
                                label: 'label.PFANS2005FORMVIEW_LASTMONTHPAYMENTMONEY',
                                width: 150,
                                fix: false,
                                filter: true,
                            },{
                                code: 'lastmonthduty',
                                label: 'label.PFANS2005FORMVIEW_LASTMONTHPAYMENTMONEYTO',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'thisbasic',
                                label: 'label.PFANS2005FORMVIEW_MONTHPAYMENTMONEY',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'thismonthduty',
                                label: 'label.PFANS2005FORMVIEW_MONTHPAYMENTMONEYTO',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'rnbasesalary',
                                label: 'label.PFANS2006VIEW_RNBASESALARY',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'birthrest',
                                label: 'label.PFANS2006VIEW_BIRTHREST',
                                width: 250,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'thismonthbasic',
                                label: 'label.PFANS2005FORMVIEW_MONTHLYPOSTALTEMPORARY',
                                width: 230,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'shortillness',
                                label: 'label.PFANS2005FORMVIEW_GDURATIONTIME',
                                width: 170,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'owediligence',
                                label: 'label.PFANS2005FORMVIEW_ABSENCETIME',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'owingcontrol',
                                label: 'label.PFANS2005FORMVIEW_ABSENCEOFWORK',
                                width: 170,
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
                                code: 'ykbz',
                                label: 'label.PFANS2006VIEW_YKBT',
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
                                width: 200,
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
                        width: 500,
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
                    {
                        code: 'basicinfor3',
                        label: 'label.PFANS2005FORMVIEW_COMPANYSUPPORT',
                        child: [
                            {
                                code: 'comendowmentinsurance',
                                label: 'label.PFANS2006VIEW_OLD',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'commedicalinsurance',
                                label: 'label.PFANS2006VIEW_MEDICAL',
                                width: 200,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'comunemploymentinsurance',
                                label: 'label.PFANS2006VIEW_UNEMPLOYMENT',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'cominjuryinsurance',
                                label: 'label.PFANS2005FORMVIEW_EMPLOYMENTINJURYINSURANCE',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'combirthinsurance',
                                label: 'label.PFANS2005FORMVIEW_COMBIRTHINSURANCE',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'comheating',
                                label: 'label.PFANS2005FORMVIEW_HEATINGCOST',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'comaccumulationfund',
                                label: 'label.PFANS2005FORMVIEW_HOUSINGPROVIDENTFUND',
                                width: 150,
                                fix: false,
                                filter: true,
                            }, {
                                code: 'total',
                                label: 'label.PFANS2005FORMVIEW_TOTAL',
                                width: 170,
                                fix: false,
                                filter: true,
                            },
                        ],
                        width: 1650,
                    },
                    {
                        code: 'labourunionbase',
                        label: 'label.PFANS2005FORMVIEW_LABORUNIONFUNDBASE',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'labourunionfunds',
                        label: 'label.PFANS2009VIEW_INDUSTRIALPARTY',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'comtotalwages',
                        label: 'label.PFANS2005FORMVIEW_TOTALWAGES',
                        width: 360,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'bonusmoney',
                        label: 'label.PFANS2005FORMVIEW_GAUGE',
                        width: 150,
                        fix: false,
                        filter: true,
                    }, {
                        code: 'totalbonus',
                        label: 'label.PFANS2005FORMVIEW_TOTALGAUGE',
                        width: 150,
                        fix: false,
                        filter: true,
                    }, {
                        code: 'other6',
                        label: 'label.PFANS2005FORMVIEW_OTHER6',
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
                        code: 'user_id',
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
                        code: 'method',
                        label: 'label.PFANS2007VIEW_TAXMETHOD',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'taxable',
                        label: 'label.PFANS2007VIEW_COMBINEDTAX',
                        width: 220,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'amount',
                        label: 'label.PFANS2007VIEW_KOZO',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'payable',
                        label: 'label.PFANS2007VIEW_TAX',
                        width: 200,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'income',
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
                        code: 'deductions',
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
                        code: 'received',
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
            this.Taxestotal = 1
            this.title = this.$t('title.PFANS2006VIEW') + this.$t('title.allcompany')
            this.getTaxestotal();
        },
        methods: {
            MyBrowserIsIE() {
                let isIE = false;
                if (
                    navigator.userAgent.indexOf("compatible") > -1 &&
                    navigator.userAgent.indexOf("MSIE") > -1
                ) {
                    // ie浏览器
                    isIE = true;
                }
                if (navigator.userAgent.indexOf("Trident") > -1) {
                    // edge 浏览器
                    isIE = true;
                }
                return isIE;
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            buttonClick(val){
                if (val === 'export') {
                    if (this.Taxestotal === 1) {
                        this.selectedlist = this.$refs.roletable.selectedList;
                        let heads = [
                             this.$t('label.PFANS2006VIEW_PENSION')
                            ,this.$t('label.PFANS2006VIEW_MEDICALAA'), this.$t('label.PFANS2005FORMVIEW_HOUSINGFUNDBASE'), this.$t('label.PFANS2005FORMVIEW_LASTMONTHPAYMENTMONEY'), this.$t('label.PFANS2005FORMVIEW_LASTMONTHPAYMENTMONEYTO'), this.$t('label.PFANS2005FORMVIEW_MONTHPAYMENTMONEY'), this.$t('label.PFANS2005FORMVIEW_MONTHPAYMENTMONEYTO'),this.$t('label.PFANS2006VIEW_RNBASESALARY'), this.$t('label.PFANS2006VIEW_BIRTHREST')
                            ,this.$t('label.PFANS2005FORMVIEW_MONTHLYPOSTALTEMPORARY'), this.$t('label.PFANS2005FORMVIEW_GDURATIONTIME'), this.$t('label.PFANS2005FORMVIEW_ABSENCETIME'), this.$t('label.PFANS2005FORMVIEW_ABSENCEOFWORK'), this.$t('label.PFANS2006VIEW_BASICSALARY')
                            ,this.$t('label.PFANS2006VIEW_REIMBURSEMENT'), this.$t('label.PFANS2006VIEW_YKBT'), this.$t('label.PFANS2006VIEW_KASUKE')
                            ,this.$t('label.PFANS2006VIEW_OTHER1'), this.$t('label.PFANS2006VIEW_SUBTOTAL1'), this.$t('label.PFANS2006VIEW_OTHER2')
                            ,this.$t('label.PFANS2006VIEW_MONTHLYBONUS'), this.$t('label.PFANS2006VIEW_OTHER3'), this.$t('label.PFANS2006VIEW_SUBTOTAL2'), this.$t('label.PFANS2006VIEW_INDUSTRY'), this.$t('label.PFANS2006VIEW_HEATING')
                            ,this.$t('label.PFANS2006VIEW_OLONECHILD'), this.$t('label.PFANS2006VIEW_SUBTOTAL3'), this.$t('label.PFANS2006VIEW_ARSENAL'), this.$t('label.PFANS2006VIEW_OLD'), this.$t('label.PFANS2006VIEW_MEDICAL')
                            ,this.$t('label.PFANS2006VIEW_UNEMPLOYMENT'), this.$t('label.PFANS2006VIEW_SOCIALSECURITY'), this.$t('label.PFANS2006VIEW_PUBLICMONEY'), this.$t('label.PFANS2006VIEW_SECURITYMON'), this.$t('label.PFANS2006VIEW_EXCLUSIVE')
                            ,this.$t('label.PFANS2006VIEW_ACCUMULATED'), this.$t('label.PFANS2006VIEW_UNACCUMULATED'), this.$t('label.PFANS2006VIEW_ANNUAL'), this.$t('label.PFANS2006VIEW_RESIDENTIALTAX'), this.$t('label.PFANS2006VIEW_COMPANYBOSS')
                            ,this.$t('label.PFANS2006VIEW_OTHER5'), this.$t('label.PFANS2006VIEW_RESPONSIBLE'), this.$t('label.PFANS2006VIEW_CUMULATIVE'), this.$t('label.PFANS2006VIEW_INCOME'), this.$t('label.PFANS2006VIEW_THISMONTH')
                            ,this.$t('label.PFANS2006VIEW_ACTUAL'), this.$t('label.PFANS2006VIEW_OLD'), this.$t('label.PFANS2006VIEW_MEDICAL'), this.$t('label.PFANS2006VIEW_UNEMPLOYMENT'), this.$t('label.PFANS2005FORMVIEW_EMPLOYMENTINJURYINSURANCE')
                            ,this.$t('label.PFANS2005FORMVIEW_COMBIRTHINSURANCE'), this.$t('label.PFANS2005FORMVIEW_HEATINGCOST'), this.$t('label.PFANS2005FORMVIEW_HOUSINGPROVIDENTFUND'), this.$t('label.PFANS2005FORMVIEW_TOTAL'), this.$t('label.PFANS2005FORMVIEW_LABORUNIONFUNDBASE')
                            ,this.$t('label.PFANS2009VIEW_INDUSTRIALPARTY'), this.$t('label.PFANS2005FORMVIEW_TOTALWAGES'), this.$t('label.PFANS2005FORMVIEW_GAUGE'), this.$t('label.PFANS2005FORMVIEW_TOTALGAUGE'), this.$t('label.PFANS2005FORMVIEW_OTHER6')];

                        let filterVal = ['pension', 'medical', 'accumulation', 'lastmonthbasic', 'lastmonthduty', 'thisbasic', 'thismonthduty', 'rnbasesalary'
                            , 'birthrest', 'thismonthbasic', 'shortillness', 'owediligence', 'owingcontrol', 'actualamount'
                            ,'supplement', 'ykbz', 'overtimesubsidy', 'other1', 'total1'
                            , 'other2', 'appreciation', 'other3', 'total2', 'taxestotal'
                            ,'heating', 'onlychildmoney', 'total3', 'totalwages', 'endowmentinsurance', 'medicalinsurance', 'unemploymentinsurance'
                            ,'socialinsurance', 'accumulationfund', 'disciplinarycontrol', 'thismonthterm', 'thismonthadditional', 'thismonthdutyfree'
                            ,'lastdutyfree', 'housingmoneys', 'other4', 'other5', 'shouldwages', 'shouldcumulative', 'shouldpaytaxes'
                            ,'thismonthadjustment', 'realwages', 'comendowmentinsurance', 'commedicalinsurance', 'comunemploymentinsurance', 'cominjuryinsurance'
                            ,'combirthinsurance', 'comheating', 'comaccumulationfund', 'total', 'labourunionbase', 'labourunionfunds', 'comtotalwages'
                            ,'bonusmoney', 'totalbonus', 'other6'];

                        let csvData = [];
                        for (let i = 0; i < this.selectedlist.length; i++) {
                            let obj = this.selectedlist[i];
                            csvData.push({
                                [heads[0]]: obj.pension,
                                [heads[1]]: obj.medical,
                                [heads[2]]: obj.accumulation,
                                [heads[3]]: obj.lastmonthbasic,
                                [heads[4]]: obj.lastmonthduty,
                                [heads[5]]: obj.thisbasic,
                                [heads[6]]: obj.thismonthduty,
                                [heads[7]]: obj.rnbasesalary,
                                [heads[8]]: obj.birthrest,
                                [heads[9]]: obj.thismonthbasic,
                                [heads[10]]: obj.shortillness,
                                [heads[11]]: obj.owediligence,
                                [heads[12]]: obj.owingcontrol,
                                [heads[13]]: obj.actualamount,
                                [heads[14]]: obj.supplement,
                                [heads[15]]: obj.ykbz,
                                [heads[16]]: obj.overtimesubsidy,
                                [heads[17]]: obj.other1,
                                [heads[18]]: obj.total1,
                                [heads[19]]: obj.other2,
                                [heads[20]]: obj.appreciation,
                                [heads[21]]: obj.other3,
                                [heads[22]]: obj.total2,
                                [heads[23]]: obj.taxestotal,
                                [heads[24]]: obj.heating,
                                [heads[25]]: obj.onlychildmoney,
                                [heads[26]]: obj.total3,
                                [heads[27]]: obj.totalwages,
                                [heads[28]]: obj.endowmentinsurance,
                                [heads[29]]: obj.medicalinsurance,
                                [heads[30]]: obj.unemploymentinsurance,
                                [heads[31]]: obj.socialinsurance,
                                [heads[32]]: obj.accumulationfund,
                                [heads[33]]: obj.disciplinarycontrol,
                                [heads[34]]: obj.thismonthterm,
                                [heads[35]]: obj.thismonthadditional,
                                [heads[36]]: obj.thismonthdutyfree,
                                [heads[37]]: obj.lastdutyfree,
                                [heads[38]]: obj.housingmoneys,
                                [heads[39]]: obj.other4,
                                [heads[40]]: obj.other5,
                                [heads[41]]: obj.shouldwages,
                                [heads[42]]: obj.shouldcumulative,
                                [heads[43]]: obj.shouldpaytaxes,
                                [heads[44]]: obj.thismonthadjustment,
                                [heads[45]]: obj.realwages,
                                [heads[46]]: obj.comendowmentinsurance,
                                [heads[47]]: obj.commedicalinsurance,
                                [heads[48]]: obj.comunemploymentinsurance,
                                [heads[49]]: obj.cominjuryinsurance,
                                [heads[50]]: obj.combirthinsurance,
                                [heads[51]]: obj.comheating,
                                [heads[52]]: obj.comaccumulationfund,
                                [heads[53]]: obj.total,
                                [heads[54]]: obj.labourunionbase,
                                [heads[55]]: obj.labourunionfunds,
                                [heads[56]]: obj.comtotalwages,
                                [heads[57]]: obj.bonusmoney,
                                [heads[58]]: obj.totalbonus,
                                [heads[59]]: obj.other6,
                            });
                        }
                        const result = json2csv.parse(csvData, {
                            excelStrings: true,
                        });
                        let csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + result;
                        const link = document.createElement('a');
                        link.href = csvContent;
                        link.download = this.$t('title.PFANS2006VIEW') + '.csv';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }else if(this.Bonus === 1){
                        this.selectedList = this.$refs.rolet.selectedList;
                        let heads = [this.$t('label.PFANS2007VIEW_YEAR'), this.$t('label.PFANS2007VIEW_NAME'), this.$t('label.PFANS2007VIEW_GOLDLEAF'), this.$t('label.PFANS2007VIEW_TAXMETHOD'), this.$t('label.PFANS2007VIEW_COMBINEDTAX'), this.$t('label.PFANS2007VIEW_KOZO'), this.$t('label.PFANS2007VIEW_TAX'),
                            this.$t('label.PFANS2006VIEW_MONTHLYAVERAGE'), this.$t('label.PFANS2007VIEW_CASH'),
                            this.$t('label.PFANS2007VIEW_ARITHMETIC'), this.$t('label.PFANS2007VIEW_GOLD'), this.$t('label.PFANS2007VIEW_IEMIKANE'), this.$t('label.remarks')];
                        let filterVal = ['years', 'user_id', 'totalbonus1', 'method', 'taxable', 'amount', 'payable', 'income', 'taxrate', 'deductions', 'bonustax', 'received', 'remarks'];
                        let csvData = [];
                        for (let i = 0; i < this.selectedList.length; i++) {
                            let obj = this.selectedList[i];
                            csvData.push({
                                [heads[0]]: obj.years,
                                [heads[1]]: obj.user_id,
                                [heads[2]]: obj.totalbonus1,
                                [heads[3]]: obj.method,
                                [heads[4]]: obj.taxable,
                                [heads[5]]: obj.amount,
                                [heads[6]]: obj.payable,
                                [heads[7]]: obj.income,
                                [heads[8]]: obj.taxrate,
                                [heads[9]]: obj.deductions,
                                [heads[10]]: obj.bonustax,
                                [heads[11]]: obj.received,
                                [heads[12]]: obj.remarks,

                            });
                        }
                        const result = json2csv.parse(csvData, {
                            excelStrings: true,
                        });
                        let csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + result;
                        const link = document.createElement('a');
                        link.href = csvContent;
                        link.download = this.$t('label.PFANS2006VIEW_BONUS') + '.csv';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            },
            getworkinghours(workinghours) {
                if (workinghours != null) {
                    if (workinghours.length > 0) {
                        return moment(workinghours[0]).format('YYYY-MM-DD') + " ~ " + moment(workinghours[1]).format('YYYY-MM-DD');
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            },
            clickdata() {
                if (this.Taxestotal === 1) {
                    this.working = '',
                        this.starttime = '',
                        this.endTime = '',
                        this.working = this.getworkinghours(this.workinghours);
                    this.starttime = this.working.substring(0, 10),
                        this.endTime = this.working.substring(13, 23)
                    let tabledate = [];
                    if (this.data != '') {
                        for (let i = 0; i < this.data.length; i++) {
                            if (this.starttime < this.data[i].workdate && this.data[i].workdate < this.endTime) {
                                tabledate.push({
                                    rowindex: this.data[i].rowindex,
                                    department_id: this.data[i].department_id,
                                    user_id: this.data[i].user_id,
                                    workdate: this.data[i].workdate,
                                    sex: this.data[i].sex,
                                    onlychild: this.data[i].onlychild,
                                    type: this.data[i].type,
                                    bonus: this.data[i].bonus,
                                    sociology: this.data[i].sociology,
                                    registered: this.data[i].registered,
                                    pension: this.data[i].pension,
                                    medical: this.data[i].medical,
                                    accumulation: this.data[i].accumulation,
                                    lastmonthbasic: this.data[i].lastmonthbasic,
                                    lastmonthduty: this.data[i].lastmonthduty,
                                    thisbasic: this.data[i].thisbasic,
                                    thismonthduty: this.data[i].thismonthduty,
                                    rnbasesalary: this.data[i].rnbasesalary,
                                    birthrest: this.data[i].birthrest,
                                    thismonthbasic: this.data[i].thismonthbasic,
                                    shortillness: this.data[i].shortillness,
                                    owediligence: this.data[i].owediligence,
                                    owingcontrol: this.data[i].owingcontrol,
                                    actualamount: this.data[i].actualamount,
                                    supplement: this.data[i].supplement,
                                    ykbz: this.data[i].ykbz,
                                    overtimesubsidy: this.data[i].overtimesubsidy,
                                    other1: this.data[i].other1,
                                    total1: this.data[i].total1,
                                    other2: this.data[i].other2,
                                    appreciation: this.data[i].appreciation,
                                    other3: this.data[i].other3,
                                    total2: this.data[i].total2,
                                    taxestotal: this.data[i].taxestotal,
                                    heating: this.data[i].heating,
                                    onlychildmoney: this.data[i].onlychildmoney,
                                    total3: this.data[i].total3,
                                    totalwages: this.data[i].totalwages,
                                    endowmentinsurance: this.data[i].endowmentinsurance,
                                    medicalinsurance: this.data[i].medicalinsurance,
                                    unemploymentinsurance: this.data[i].unemploymentinsurance,
                                    socialinsurance: this.data[i].socialinsurance,
                                    accumulationfund: this.data[i].accumulationfund,
                                    disciplinarycontrol: this.data[i].disciplinarycontrol,
                                    thismonthterm: this.data[i].thismonthterm,
                                    thismonthadditional: this.data[i].thismonthadditional,
                                    thismonthdutyfree: this.data[i].thismonthdutyfree,
                                    lastdutyfree: this.data[i].lastdutyfree,
                                    housingmoneys: this.data[i].housingmoneys,
                                    other4: this.data[i].other4,
                                    other5: this.data[i].other5,
                                    shouldwages: this.data[i].shouldwages,
                                    shouldcumulative: this.data[i].shouldcumulative,
                                    shouldpaytaxes: this.data[i].shouldpaytaxes,
                                    thismonthadjustment: this.data[i].thismonthadjustment,
                                    realwages: this.data[i].realwages,
                                    comendowmentinsurance: this.data[i].comendowmentinsurance,
                                    commedicalinsurance: this.data[i].commedicalinsurance,
                                    comunemploymentinsurance: this.data[i].comunemploymentinsurance,
                                    cominjuryinsurance: this.data[i].cominjuryinsurance,
                                    combirthinsurance: this.data[i].combirthinsurance,
                                    comheating: this.data[i].comheating,
                                    comaccumulationfund: this.data[i].comaccumulationfund,
                                    total: this.data[i].total,
                                    labourunionbase: this.data[i].labourunionbase,
                                    labourunionfunds: this.data[i].labourunionfunds,
                                    comtotalwages: this.data[i].comtotalwages,
                                    bonusmoney: this.data[i].bonusmoney,
                                    totalbonus: this.data[i].totalbonus,
                                    other6: this.data[i].other6,
                                })
                            }
                        }
                        this.data = tabledate
                    }
                } else if (this.Bonus === 1) {
                    this.working = '',
                        this.starttime = '',
                        this.endTime = '',
                        this.working = this.getworkinghours(this.workinghours);
                    this.starttime = this.working.substring(0, 4),
                        this.endTime = this.working.substring(13, 17)
                    let tableDate = [];
                    for (let i = 0; i < this.datatada.length; i++) {
                        if (this.datatada[i].years != '') {
                            if (this.starttime <= this.datatada[i].years && this.datatada[i].years <= this.endTime) {
                                tableDate.push({
                                    years: this.datatada[i].years,
                                    user_id: this.datatada[i].user_id,
                                    totalbonus1: this.datatada[i].totalbonus1,
                                    method: this.datatada[i].method,
                                    taxable: this.datatada[i].taxable,
                                    amount: this.datatada[i].amount,
                                    payable: this.datatada[i].payable,
                                    income: this.datatada[i].income,
                                    taxrate: this.datatada[i].taxrate,
                                    deductions: this.datatada[i].deductions,
                                    bonustax: this.datatada[i].bonustax,
                                    received: this.datatada[i].received,
                                    remarks: this.datatada[i].remarks,
                                })
                            }
                        }
                    }
                    this.datatada = tableDate
                }
            },
            getTaxestotal() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS2006Store/getwagesList', {})
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {
                            response[j].rowindex = j + 1;
                            if (response[j].giving_id !== null && response[j].giving_id !== "") {
                                response[j].giving_id = response[j].giving_id.substring(0, 4) + '-' + response[j].giving_id.substring(4, 6)
                            }
                            if (response[j].department_id !== null && response[j].department_id !== "") {
                                let user = getDepartmentById(response[j].department_id);
                                if (user) {
                                    response[j].department_id = user.coopername;
                                }
                            }
                            if (response[j].user_id !== null && response[j].user_id !== '') {
                                let rst = getUserInfo(response[j].user_id);
                                if (rst) {
                                    response[j].user_id = rst.userinfo.customername;
                                }
                            }
                            if (response[j].workdate !== null && response[j].workdate !== '') {
                                response[j].workdate = moment(response[j].workdate).format('YYYY-MM-DD');
                            }
                            if (response[j].shortillness !== null || response[j].longillness !== '') {
                                response[j].shortillness = Number(response[j].shortillness) + response[j].longillness;
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
            getBonus() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS2006Store/getBonus', {})
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {
                            if (response[j].user_id !== null && response[j].user_id !== '') {
                                let rst = getUserInfo(response[j].user_id);
                                if (rst) {
                                    response[j].user_id = rst.userinfo.customername;
                                }
                            }
                        }
                        this.datatada = response;
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
                this.workinghours=''
                if (this.region === '2') {
                    this.showTable1 = false;
                    this.title = this.$t('label.PFANS2006VIEW_BONUS') + this.$t('title.allcompany')
                    this.Taxestotal = '';
                    this.Bonus = 1;
                    this.getBonus();
                } else if (this.region === '1') {
                    this.showTable1 = true;
                    this.title = this.$t('title.PFANS2006VIEW') + this.$t('title.allcompany')
                    this.Bonus = '';
                    this.Taxestotal = 1;
                    this.getTaxestotal();
                }
            },
        },
    };
</script>

<style scoped>

</style>
