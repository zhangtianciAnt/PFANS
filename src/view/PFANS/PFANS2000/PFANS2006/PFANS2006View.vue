<template>
  <div>


    <EasyNormalTable :buttonList="buttonList" :columns="columns1" :data="data" :showSelection="isShow" :title="title"
                     @buttonClick="buttonClick"
                     ref="roletable" v-loading="loading" v-show="showTable1">
      <el-select @change="changed" slot="customize" v-model="region">
        <el-option :label="$t('label.PFANS2006VIEW_WAGES')" value="1"></el-option>
        <el-option :label="$t('label.PFANS2006VIEW_BONUS')" value="2"></el-option>
      </el-select>
      <el-date-picker :end-placeholder="$t('label.enddate')" :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                      :start-placeholder="$t('label.startdate')"
                      @change="clickdata"
                      class="bigWidth"
                      slot="customize"
                      type="daterange"
                      unlink-panels
                      v-model="workinghours"
      ></el-date-picker>
    </EasyNormalTable>

    <EasyNormalTable :buttonList="buttonList" :columns="columns2" :data="datatada" :showSelection="isShow"
                     :title="title" @buttonClick="buttonClick"
                     ref="rolet" v-loading="loading" v-show="!showTable1">
      <el-select @change="changed" slot="customize" v-model="region">
        <el-option :label="$t('label.PFANS2006VIEW_WAGES')" value="1"></el-option>
        <el-option :label="$t('label.PFANS2006VIEW_BONUS')" value="2"></el-option>
      </el-select>
      <el-date-picker :end-placeholder="$t('label.enddate')" :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                      :start-placeholder="$t('label.startdate')"
                      @change="clickdata"
                      class="bigWidth"
                      slot="customize"
                      type="daterange"
                      unlink-panels
                      v-model="workinghours"
      ></el-date-picker>
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
        DATA: [],
        datatada: [],
        DATATADA: [],
        activeName: '',
        buttonList: [{'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-download'},],
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
              }, {
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
      this.Taxestotal = 1;
      if (this.$i18n) {

        this.title = this.$t('title.PFANS2006VIEW') + this.$t('title.allcompany')
      }
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
      buttonClick(val) {
        if (val === 'export') {
          if (this.Taxestotal === 1) {
            if (this.$refs.roletable.selectedList.length === 0) {
              Message({
                message: this.$t('normal.info_01'),
                type: 'info',
                duration: 2 * 1000
              });
              return;
            }
            this.selectedlist = this.$refs.roletable.selectedList;
            let heads = [
              this.$t('label.PFANS2006VIEW_PENSION')
              , this.$t('label.PFANS2006VIEW_MEDICALAA'), this.$t('label.PFANS2005FORMVIEW_HOUSINGFUNDBASE'), this.$t('label.PFANS2005FORMVIEW_LASTMONTHPAYMENTMONEY'), this.$t('label.PFANS2005FORMVIEW_LASTMONTHPAYMENTMONEYTO'), this.$t('label.PFANS2005FORMVIEW_MONTHPAYMENTMONEY'), this.$t('label.PFANS2005FORMVIEW_MONTHPAYMENTMONEYTO'), this.$t('label.PFANS2006VIEW_RNBASESALARY'), this.$t('label.PFANS2006VIEW_BIRTHREST')
              , this.$t('label.PFANS2005FORMVIEW_MONTHLYPOSTALTEMPORARY'), this.$t('label.PFANS2005FORMVIEW_GDURATIONTIME'), this.$t('label.PFANS2005FORMVIEW_ABSENCETIME'), this.$t('label.PFANS2005FORMVIEW_ABSENCEOFWORK'), this.$t('label.PFANS2006VIEW_BASICSALARY')
              , this.$t('label.PFANS2006VIEW_REIMBURSEMENT'), this.$t('label.PFANS2006VIEW_YKBT'), this.$t('label.PFANS2006VIEW_KASUKE')
              , this.$t('label.PFANS2006VIEW_OTHER1'), this.$t('label.PFANS2006VIEW_SUBTOTAL1'), this.$t('label.PFANS2006VIEW_OTHER2')
              , this.$t('label.PFANS2006VIEW_MONTHLYBONUS'), this.$t('label.PFANS2006VIEW_OTHER3'), this.$t('label.PFANS2006VIEW_SUBTOTAL2'), this.$t('label.PFANS2006VIEW_INDUSTRY'), this.$t('label.PFANS2006VIEW_HEATING')
              , this.$t('label.PFANS2006VIEW_OLONECHILD'), this.$t('label.PFANS2006VIEW_SUBTOTAL3'), this.$t('label.PFANS2006VIEW_ARSENAL'), this.$t('label.PFANS2006VIEW_OLD'), this.$t('label.PFANS2006VIEW_MEDICAL')
              , this.$t('label.PFANS2006VIEW_UNEMPLOYMENT'), this.$t('label.PFANS2006VIEW_SOCIALSECURITY'), this.$t('label.PFANS2006VIEW_PUBLICMONEY'), this.$t('label.PFANS2006VIEW_SECURITYMON'), this.$t('label.PFANS2006VIEW_EXCLUSIVE')
              , this.$t('label.PFANS2006VIEW_ACCUMULATED'), this.$t('label.PFANS2006VIEW_UNACCUMULATED'), this.$t('label.PFANS2006VIEW_ANNUAL'), this.$t('label.PFANS2006VIEW_RESIDENTIALTAX'), this.$t('label.PFANS2006VIEW_COMPANYBOSS')
              , this.$t('label.PFANS2006VIEW_OTHER5'), this.$t('label.PFANS2006VIEW_RESPONSIBLE'), this.$t('label.PFANS2006VIEW_CUMULATIVE'), this.$t('label.PFANS2006VIEW_INCOME'), this.$t('label.PFANS2006VIEW_THISMONTH')
              , this.$t('label.PFANS2006VIEW_ACTUAL'), this.$t('label.PFANS2006VIEW_OLD'), this.$t('label.PFANS2006VIEW_MEDICAL'), this.$t('label.PFANS2006VIEW_UNEMPLOYMENT'), this.$t('label.PFANS2005FORMVIEW_EMPLOYMENTINJURYINSURANCE')
              , this.$t('label.PFANS2005FORMVIEW_COMBIRTHINSURANCE'), this.$t('label.PFANS2005FORMVIEW_HEATINGCOST'), this.$t('label.PFANS2005FORMVIEW_HOUSINGPROVIDENTFUND'), this.$t('label.PFANS2005FORMVIEW_TOTAL'), this.$t('label.PFANS2005FORMVIEW_LABORUNIONFUNDBASE')
              , this.$t('label.PFANS2009VIEW_INDUSTRIALPARTY'), this.$t('label.PFANS2005FORMVIEW_TOTALWAGES'), this.$t('label.PFANS2005FORMVIEW_GAUGE'), this.$t('label.PFANS2005FORMVIEW_TOTALGAUGE'), this.$t('label.PFANS2005FORMVIEW_OTHER6')];

            let filterVal = ['pension', 'medical', 'accumulation', 'lastmonthbasic', 'lastmonthduty', 'thisbasic', 'thismonthduty', 'rnbasesalary'
              , 'birthrest', 'thismonthbasic', 'shortillness', 'owediligence', 'owingcontrol', 'actualamount'
              , 'supplement', 'ykbz', 'overtimesubsidy', 'other1', 'total1'
              , 'other2', 'appreciation', 'other3', 'total2', 'taxestotal'
              , 'heating', 'onlychildmoney', 'total3', 'totalwages', 'endowmentinsurance', 'medicalinsurance', 'unemploymentinsurance'
              , 'socialinsurance', 'accumulationfund', 'disciplinarycontrol', 'thismonthterm', 'thismonthadditional', 'thismonthdutyfree'
              , 'lastdutyfree', 'housingmoneys', 'other4', 'other5', 'shouldwages', 'shouldcumulative', 'shouldpaytaxes'
              , 'thismonthadjustment', 'realwages', 'comendowmentinsurance', 'commedicalinsurance', 'comunemploymentinsurance', 'cominjuryinsurance'
              , 'combirthinsurance', 'comheating', 'comaccumulationfund', 'total', 'labourunionbase', 'labourunionfunds', 'comtotalwages'
              , 'bonusmoney', 'totalbonus', 'other6'];

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
          } else if (this.Bonus === 1) {
            if (this.$refs.rolet.selectedList.length === 0) {
              Message({
                message: this.$t('normal.info_01'),
                type: 'info',
                duration: 2 * 1000
              });
              return;
            }
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
            this.endTime = this.working.substring(13, 23);
          if (this.starttime == '' && this.endTime == '') {
            let tabledata = [];
            for (let i = 0; i < this.DATA.length; i++) {
              tabledata.push({
                rowindex: this.DATA[i].rowindex,
                department_id: this.DATA[i].department_id,
                user_id: this.DATA[i].user_id,
                workdate: this.DATA[i].workdate,
                sex: this.DATA[i].sex,
                onlychild: this.DATA[i].onlychild,
                type: this.DATA[i].type,
                bonus: this.DATA[i].bonus,
                sociology: this.DATA[i].sociology,
                registered: this.DATA[i].registered,
                pension: this.DATA[i].pension,
                medical: this.DATA[i].medical,
                accumulation: this.DATA[i].accumulation,
                lastmonthbasic: this.DATA[i].lastmonthbasic,
                lastmonthduty: this.DATA[i].lastmonthduty,
                thisbasic: this.DATA[i].thisbasic,
                thismonthduty: this.DATA[i].thismonthduty,
                rnbasesalary: this.DATA[i].rnbasesalary,
                birthrest: this.DATA[i].birthrest,
                thismonthbasic: this.DATA[i].thismonthbasic,
                shortillness: this.DATA[i].shortillness,
                owediligence: this.DATA[i].owediligence,
                owingcontrol: this.DATA[i].owingcontrol,
                actualamount: this.DATA[i].actualamount,
                supplement: this.DATA[i].supplement,
                ykbz: this.DATA[i].ykbz,
                overtimesubsidy: this.DATA[i].overtimesubsidy,
                other1: this.DATA[i].other1,
                total1: this.DATA[i].total1,
                other2: this.DATA[i].other2,
                appreciation: this.DATA[i].appreciation,
                other3: this.DATA[i].other3,
                total2: this.DATA[i].total2,
                taxestotal: this.DATA[i].taxestotal,
                heating: this.DATA[i].heating,
                onlychildmoney: this.DATA[i].onlychildmoney,
                total3: this.DATA[i].total3,
                totalwages: this.DATA[i].totalwages,
                endowmentinsurance: this.DATA[i].endowmentinsurance,
                medicalinsurance: this.DATA[i].medicalinsurance,
                unemploymentinsurance: this.DATA[i].unemploymentinsurance,
                socialinsurance: this.DATA[i].socialinsurance,
                accumulationfund: this.DATA[i].accumulationfund,
                disciplinarycontrol: this.DATA[i].disciplinarycontrol,
                thismonthterm: this.DATA[i].thismonthterm,
                thismonthadditional: this.DATA[i].thismonthadditional,
                thismonthdutyfree: this.DATA[i].thismonthdutyfree,
                lastdutyfree: this.DATA[i].lastdutyfree,
                housingmoneys: this.DATA[i].housingmoneys,
                other4: this.DATA[i].other4,
                other5: this.DATA[i].other5,
                shouldwages: this.DATA[i].shouldwages,
                shouldcumulative: this.DATA[i].shouldcumulative,
                shouldpaytaxes: this.DATA[i].shouldpaytaxes,
                thismonthadjustment: this.DATA[i].thismonthadjustment,
                realwages: this.DATA[i].realwages,
                comendowmentinsurance: this.DATA[i].comendowmentinsurance,
                commedicalinsurance: this.DATA[i].commedicalinsurance,
                comunemploymentinsurance: this.DATA[i].comunemploymentinsurance,
                cominjuryinsurance: this.DATA[i].cominjuryinsurance,
                combirthinsurance: this.DATA[i].combirthinsurance,
                comheating: this.DATA[i].comheating,
                comaccumulationfund: this.DATA[i].comaccumulationfund,
                total: this.DATA[i].total,
                labourunionbase: this.DATA[i].labourunionbase,
                labourunionfunds: this.DATA[i].labourunionfunds,
                comtotalwages: this.DATA[i].comtotalwages,
                bonusmoney: this.DATA[i].bonusmoney,
                totalbonus: this.DATA[i].totalbonus,
                other6: this.DATA[i].other6,
              })
            }
            this.data = tabledata
          } else {
            let tabledate = [];
            if (this.DATA != '') {
              for (let i = 0; i < this.DATA.length; i++) {
                if (this.starttime < this.DATA[i].workdate && this.DATA[i].workdate < this.endTime) {
                  tabledate.push({
                    rowindex: this.DATA[i].rowindex,
                    department_id: this.DATA[i].department_id,
                    user_id: this.DATA[i].user_id,
                    workdate: this.DATA[i].workdate,
                    sex: this.DATA[i].sex,
                    onlychild: this.DATA[i].onlychild,
                    type: this.DATA[i].type,
                    bonus: this.DATA[i].bonus,
                    sociology: this.DATA[i].sociology,
                    registered: this.DATA[i].registered,
                    pension: this.DATA[i].pension,
                    medical: this.DATA[i].medical,
                    accumulation: this.DATA[i].accumulation,
                    lastmonthbasic: this.DATA[i].lastmonthbasic,
                    lastmonthduty: this.DATA[i].lastmonthduty,
                    thisbasic: this.DATA[i].thisbasic,
                    thismonthduty: this.DATA[i].thismonthduty,
                    rnbasesalary: this.DATA[i].rnbasesalary,
                    birthrest: this.DATA[i].birthrest,
                    thismonthbasic: this.DATA[i].thismonthbasic,
                    shortillness: this.DATA[i].shortillness,
                    owediligence: this.DATA[i].owediligence,
                    owingcontrol: this.DATA[i].owingcontrol,
                    actualamount: this.DATA[i].actualamount,
                    supplement: this.DATA[i].supplement,
                    ykbz: this.DATA[i].ykbz,
                    overtimesubsidy: this.DATA[i].overtimesubsidy,
                    other1: this.DATA[i].other1,
                    total1: this.DATA[i].total1,
                    other2: this.DATA[i].other2,
                    appreciation: this.DATA[i].appreciation,
                    other3: this.DATA[i].other3,
                    total2: this.DATA[i].total2,
                    taxestotal: this.DATA[i].taxestotal,
                    heating: this.DATA[i].heating,
                    onlychildmoney: this.DATA[i].onlychildmoney,
                    total3: this.DATA[i].total3,
                    totalwages: this.DATA[i].totalwages,
                    endowmentinsurance: this.DATA[i].endowmentinsurance,
                    medicalinsurance: this.DATA[i].medicalinsurance,
                    unemploymentinsurance: this.DATA[i].unemploymentinsurance,
                    socialinsurance: this.DATA[i].socialinsurance,
                    accumulationfund: this.DATA[i].accumulationfund,
                    disciplinarycontrol: this.DATA[i].disciplinarycontrol,
                    thismonthterm: this.DATA[i].thismonthterm,
                    thismonthadditional: this.DATA[i].thismonthadditional,
                    thismonthdutyfree: this.DATA[i].thismonthdutyfree,
                    lastdutyfree: this.DATA[i].lastdutyfree,
                    housingmoneys: this.DATA[i].housingmoneys,
                    other4: this.DATA[i].other4,
                    other5: this.DATA[i].other5,
                    shouldwages: this.DATA[i].shouldwages,
                    shouldcumulative: this.DATA[i].shouldcumulative,
                    shouldpaytaxes: this.DATA[i].shouldpaytaxes,
                    thismonthadjustment: this.DATA[i].thismonthadjustment,
                    realwages: this.DATA[i].realwages,
                    comendowmentinsurance: this.DATA[i].comendowmentinsurance,
                    commedicalinsurance: this.DATA[i].commedicalinsurance,
                    comunemploymentinsurance: this.DATA[i].comunemploymentinsurance,
                    cominjuryinsurance: this.DATA[i].cominjuryinsurance,
                    combirthinsurance: this.DATA[i].combirthinsurance,
                    comheating: this.DATA[i].comheating,
                    comaccumulationfund: this.DATA[i].comaccumulationfund,
                    total: this.DATA[i].total,
                    labourunionbase: this.DATA[i].labourunionbase,
                    labourunionfunds: this.DATA[i].labourunionfunds,
                    comtotalwages: this.DATA[i].comtotalwages,
                    bonusmoney: this.DATA[i].bonusmoney,
                    totalbonus: this.DATA[i].totalbonus,
                    other6: this.DATA[i].other6,
                  })
                }
              }
              this.data = tabledate
            }
          }
        } else if (this.Bonus === 1) {
          this.working = '',
            this.starttime = '',
            this.endTime = '',
            this.working = this.getworkinghours(this.workinghours);
          this.starttime = this.working.substring(0, 4),
            this.endTime = this.working.substring(13, 17);
          if (this.starttime == '' && this.endTime == '') {
            let tableData = [];
            for (let i = 0; i < this.DATATADA.length; i++) {
              tableData.push({
                years: this.DATATADA[i].years,
                user_id: this.DATATADA[i].user_id,
                totalbonus1: this.DATATADA[i].totalbonus1,
                method: this.DATATADA[i].method,
                taxable: this.DATATADA[i].taxable,
                amount: this.DATATADA[i].amount,
                payable: this.DATATADA[i].payable,
                income: this.DATATADA[i].income,
                taxrate: this.DATATADA[i].taxrate,
                deductions: this.DATATADA[i].deductions,
                bonustax: this.DATATADA[i].bonustax,
                received: this.DATATADA[i].received,
                remarks: this.DATATADA[i].remarks,
              })
            }
            this.datatada = tableData
          } else {
            let tableDate = [];
            for (let i = 0; i < this.DATATADA.length; i++) {
              if (this.DATATADA[i].years != '') {
                if (this.starttime <= this.DATATADA[i].years && this.DATATADA[i].years <= this.endTime) {
                  tableDate.push({
                    years: this.DATATADA[i].years,
                    user_id: this.DATATADA[i].user_id,
                    totalbonus1: this.DATATADA[i].totalbonus1,
                    method: this.DATATADA[i].method,
                    taxable: this.DATATADA[i].taxable,
                    amount: this.DATATADA[i].amount,
                    payable: this.DATATADA[i].payable,
                    income: this.DATATADA[i].income,
                    taxrate: this.DATATADA[i].taxrate,
                    deductions: this.DATATADA[i].deductions,
                    bonustax: this.DATATADA[i].bonustax,
                    received: this.DATATADA[i].received,
                    remarks: this.DATATADA[i].remarks,
                  })
                }
              }
            }
            this.datatada = tableDate
          }
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
            this.DATA = response;
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
            this.DATATADA = response;
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
        this.workinghours = '';
        if (this.region === '2') {
          this.showTable1 = false;
          this.title = this.$t('label.PFANS2006VIEW_BONUS') + this.$t('title.allcompany');
          this.Taxestotal = '';
          this.Bonus = 1;
          this.getBonus();
        } else if (this.region === '1') {
          this.showTable1 = true;
          this.title = this.$t('title.PFANS2006VIEW') + this.$t('title.allcompany');
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
