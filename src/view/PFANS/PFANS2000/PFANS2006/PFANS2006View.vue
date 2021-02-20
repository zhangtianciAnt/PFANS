<template>
  <div>


    <EasyNormalTable :buttonList="buttonList" :columns="columns1" :data="data" :showSelection="isShow" :title="title"
                     @buttonClick="buttonClick"
                     ref="roletable" v-loading="loading" v-show="showTable1">
      <el-select @change="changed" slot="customize" v-model="region">
        <el-option :label="$t('label.PFANS2006VIEW_WAGES')" value="1"></el-option>
        <el-option :label="$t('label.PFANS2006VIEW_BONUS')" value="2"></el-option>
      </el-select>
      <el-date-picker
        :placeholder="$t('normal.error_09')"
        @change="changeddate"
        slot="customize"
        style="width:11vw"
        type="month"
        v-model="months">
      </el-date-picker>
      <!--      <el-date-picker :end-placeholder="$t('label.enddate')" :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"-->
      <!--                      :start-placeholder="$t('label.startdate')"-->
      <!--                      @change="clickdata"-->
      <!--                      class="bigWidth"-->
      <!--                      slot="customize"-->
      <!--                      type="daterange"-->
      <!--                      unlink-panels-->
      <!--                      v-model="workinghours"-->
      <!--      ></el-date-picker>-->
    </EasyNormalTable>

    <EasyNormalTable :buttonList="buttonList" :columns="columns2" :data="datatada" :showSelection="isShow"
                     :title="title" @buttonClick="buttonClick"
                     ref="rolet" v-loading="loading" v-show="!showTable1">
      <el-select @change="changed" slot="customize" v-model="region">
        <el-option :label="$t('label.PFANS2006VIEW_WAGES')" value="1"></el-option>
        <el-option :label="$t('label.PFANS2006VIEW_BONUS')" value="2"></el-option>
      </el-select>
      <el-date-picker
        :placeholder="$t('normal.error_09')"
        @change="changeddate"
        slot="customize"
        style="width:11vw"
        type="month"
        v-model="months">
      </el-date-picker>
      <!--      <el-date-picker :end-placeholder="$t('label.enddate')" :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"-->
      <!--                      :start-placeholder="$t('label.startdate')"-->
      <!--                      @change="clickdata"-->
      <!--                      class="bigWidth"-->
      <!--                      slot="customize"-->
      <!--                      type="daterange"-->
      <!--                      unlink-panels-->
      <!--                      v-model="workinghours"-->
      <!--      ></el-date-picker>-->
    </EasyNormalTable>

  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import moment from 'moment';
  import {Message} from 'element-ui';
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
        months: moment(new Date()).format('YYYY-MM'),
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
        buttonList: [{'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-download'}],
        showTable1: true,
        num: '',
        //工资详细
        columns1: [
          {
            code: 'basicinfor1',
            label: 'label.PFANS2006VIEW_BASICINFOR1',
            fix: true,
            child: [
              {
                code: 'rowindex',
                label: 'label.PFANS2006VIEW_NO',
                width: 80,
                fix: true,
                filter: true,
              }, {
                code: 'department_id',
                label: 'label.PFANS2006VIEW_CLUB',
                width: 140,
                fix: true,
                filter: true,
              }, {
                code: 'user_id',
                label: 'label.PFANS2006VIEW_LASTNAME',
                width: 90,
                fix: true,
                filter: true,
              }, {
                code: 'workdate',
                label: 'label.PFANS2006VIEW_JOINED',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'sex',
                label: 'label.PFANS2006VIEW_SEX',
                width: 90,
                fix: false,
                filter: true,
              }, {
                code: 'onlychild',
                label: 'label.PFANS2006VIEW_SINGLECHILD',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'type',
                label: 'label.PFANS2006VIEW_ENTRYTYPE',
                width: 145,
                fix: false,
                filter: true,
              }, {
                code: 'bonus',
                label: 'label.PFANS2006VIEW_SCHOLARSHIP',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'sociology',
                label: 'label.PFANS2006VIEW_SOCIETY',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'registered',
                label: 'label.PFANS2006VIEW_REGISTER',
                width: 110,
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
                code: 'yanglaojs',
                label: 'label.PFANS2005FORMVIEW_YANGLAOJS',
                width: 135,
                fix: false,
                filter: true,
              }, {
                code: 'shiyejs',
                label: 'label.PFANS2005FORMVIEW_SHIYEJS',
                width: 135,
                fix: false,
                filter: true,
              }, {
                code: 'gongshangjs',
                label: 'label.PFANS2005FORMVIEW_GONGSHANGJS',
                width: 135,
                fix: false,
                filter: true,
              }, {
                code: 'yiliaojs',
                label: 'label.PFANS2005FORMVIEW_YILIAOJS',
                width: 135,
                fix: false,
                filter: true,
              }, {
                code: 'shengyujs',
                label: 'label.PFANS2005FORMVIEW_SHENGYUJS',
                width: 135,
                fix: false,
                filter: true,
                // }, {
                //   code: 'pension',
                //   label: 'label.PFANS2006VIEW_PENSION',
                //   width: 230,
                //   fix: false,
                //   filter: true,
                // }, {
                //   code: 'medical',
                //   label: 'label.PFANS2006VIEW_MEDICALAA',
                //   width: 200,
                //   fix: false,
                //   filter: true,
              }, {
                code: 'accumulation',
                label: 'label.PFANS2005FORMVIEW_HOUSINGFUNDBASE',
                width: 148,
                fix: false,
                filter: true,
              }, {
                code: 'lastmonthbasic',
                label: 'label.PFANS2005FORMVIEW_LASTMONTHPAYMENTMONEY',
                width: 135,
                fix: false,
                filter: true,
              }, {
                code: 'lastmonthduty',
                label: 'label.PFANS2005FORMVIEW_LASTMONTHPAYMENTMONEYTO',
                width: 135,
                fix: false,
                filter: true,
              },
              {
                code: 'basethismonthbasic',
                label: 'label.PFANS2005FORMVIEW_MONTHPAYMENTMONEY',
                width: 135,
                fix: false,
                filter: true,
              }, {
                code: 'thismonthduty',
                label: 'label.PFANS2005FORMVIEW_MONTHPAYMENTMONEYTO',
                width: 135,
                fix: false,
                filter: true,
              }, {
                code: 'rnbasesalary',
                label: 'label.PFANS2005FORMVIEW_RANK',
                width: 138,
                fix: false,
                filter: true,
              },
              {
                code: 'birthrest',
                label: 'label.PFANS2006VIEW_BIRTHREST',
                width: 222,
                fix: false,
                filter: true,
              }, {
                code: 'thismonthbasic',
                label: 'label.PFANS2005FORMVIEW_MONTHLYPOSTALTEMPORARY',
                width: 214,
                fix: false,
                filter: true,
              }, {
                code: 'shortillness',
                label: 'label.PFANS2005FORMVIEW_SHORTDURATIONTIME',
                width: 130,
                fix: false,
                filter: true,
              }, {
                code: 'longillness',
                label: 'label.PFANS2005FORMVIEW_LONGDURATIONTIME',
                width: 130,
                fix: false,
                filter: true,
              }, {
                code: 'owediligence',
                label: 'label.PFANS2005FORMVIEW_ABSENCETIME',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'owingcontrol',
                label: 'label.PFANS2005FORMVIEW_ABSENCEOFWORK',
                width: 140,
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
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'ykbzjs',
                label: 'label.PFANS2006VIEW_YKBZJB',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'ykbz',
                label: 'label.PFANS2006VIEW_YKBT',
                width: 110,
                fix: false,
                filter: true,
              },
              {
                code: 'overtimesubsidy',
                label: 'label.PFANS2006VIEW_KASUKE',
                width: 110,
                fix: false,
                filter: true,
              },
              {
                code: 'other1',
                label: 'label.PFANS2006VIEW_OTHER1',
                width: 96,
                fix: false,
                filter: true,
              },
              {
                code: 'total1',
                label: 'label.PFANS2006VIEW_SUBTOTAL1',
                width: 176,
                fix: false,
                filter: true,
              },
              {
                code: 'other2',
                label: 'label.PFANS2006VIEW_OTHER2',
                width: 96,
                fix: false,
                filter: true,
              },
              {
                code: 'appreciation',
                label: 'label.PFANS2006VIEW_MONTHLYBONUS',
                width: 110,
                fix: false,
                filter: true,
              },
              {
                code: 'other3',
                label: 'label.PFANS2006VIEW_OTHER3',
                width: 96,
                fix: false,
                filter: true,
              },
              {
                code: 'total2',
                label: 'label.PFANS2006VIEW_SUBTOTAL2',
                width: 96,
                fix: false,
                filter: true,
              },
            ],
            width: 2100,
          },
          {
            code: 'taxestotal',
            label: 'label.PFANS2006VIEW_INDUSTRY',
            width: 210,
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
                width: 98,
                fix: false,
                filter: true,
              },
              {
                code: 'onlychildmoney',
                label: 'label.PFANS2006VIEW_OLONECHILD',
                width: 124,
                fix: false,
                filter: true,
              },
              {
                code: 'total3',
                label: 'label.PFANS2006VIEW_SUBTOTAL3',
                width: 98,
                fix: false,
                filter: true,
              },
            ],
            width: 450,
          },
          {
            code: 'totalwages',
            label: 'label.PFANS2006VIEW_ARSENAL',
            width: 176,
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
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'medicalinsurance',
                label: 'label.PFANS2006VIEW_MEDICAL',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'unemploymentinsurance',
                label: 'label.PFANS2006VIEW_UNEMPLOYMENT',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
            width: 500,
          },
          {
            code: 'socialinsurance',
            label: 'label.PFANS2006VIEW_SOCIALSECURITY',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'accumulationfund',
            label: 'label.PFANS2006VIEW_PUBLICMONEY',
            width: 210,
            fix: false,
            filter: true,
          },
          {
            code: 'disciplinarycontrol',
            label: 'label.PFANS2006VIEW_SECURITYMON',
            width: 280,
            fix: false,
            filter: true,
          },
          {
            code: 'thismonthterm',
            label: 'label.PFANS2006VIEW_EXCLUSIVE',
            width: 214,
            fix: false,
            filter: true,
          },
          {
            code: 'thismonthadditional',
            label: 'label.PFANS2006VIEW_ACCUMULATED',
            width: 216,
            fix: false,
            filter: true,
          },
          {
            code: 'thismonthdutyfree',
            label: 'label.PFANS2006VIEW_UNACCUMULATED',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'lastdutyfree',
            label: 'label.PFANS2006VIEW_ANNUAL',
            width: 216,
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
                width: 180,
                fix: false,
                filter: true,
              }, {
                code: 'other5',
                label: 'label.PFANS2006VIEW_OTHER5',
                width: 170,
                fix: false,
                filter: true,
              },
            ],
            width: 150,
          },
          {
            code: 'shouldwages',
            label: 'label.PFANS2006VIEW_RESPONSIBLE',
            width: 330,
            fix: false,
            filter: true,
          },
          {
            code: 'shouldcumulative',
            label: 'label.PFANS2006VIEW_CUMULATIVE',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'shouldpaytaxes',
            label: 'label.PFANS2006VIEW_INCOME',
            width: 170,
            fix: false,
            filter: true,
          },
          {
            code: 'thismonthadjustment',
            label: 'label.PFANS2006VIEW_THISMONTH',
            width: 170,
            fix: false,
            filter: true,
          },
          {
            code: 'realwages',
            label: 'label.PFANS2005VIEW_ACTUAL',
            width: 136,
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
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'commedicalinsurance',
                label: 'label.PFANS2006VIEW_MEDICAL',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'comunemploymentinsurance',
                label: 'label.PFANS2006VIEW_UNEMPLOYMENT',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'cominjuryinsurance',
                label: 'label.PFANS2005FORMVIEW_EMPLOYMENTINJURYINSURANCE',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'combirthinsurance',
                label: 'label.PFANS2005FORMVIEW_COMBIRTHINSURANCE',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'comheating',
                label: 'label.PFANS2005FORMVIEW_HEATINGCOST',
                width: 98,
                fix: false,
                filter: true,
              }, {
                code: 'comaccumulationfund',
                label: 'label.PFANS2005FORMVIEW_HOUSINGPROVIDENTFUND',
                width: 124,
                fix: false,
                filter: true,
              }, {
                code: 'total',
                label: 'label.PFANS2005FORMVIEW_TOTAL',
                width: 120,
                fix: false,
                filter: true,
              },
            ],
            width: 1650,
          },
          {
            code: 'labourunionbase',
            label: 'label.PFANS2005FORMVIEW_LABORUNIONFUNDBASE',
            width: 135,
            fix: false,
            filter: true,
          },
          {
            code: 'labourunionfunds',
            label: 'label.PFANS2009VIEW_INDUSTRIALPARTY',
            width: 110,
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
            width: 110,
            fix: false,
            filter: true,
          }, {
            code: 'totalbonus',
            label: 'label.PFANS2005FORMVIEW_TOTALGAUGE',
            width: 145,
            fix: false,
            filter: true,
          }, {
            code: 'other6',
            label: 'label.PFANS2005FORMVIEW_OTHER6',
            width: 98,
            fix: false,
            filter: true,
          },

        ],
        //奖金详细
        columns2: [
          {
            code: 'years',
            label: 'label.PFANS2007VIEW_YEAR',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.PFANS2007VIEW_NAME',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            code: 'totalbonus1',
            label: 'label.PFANS2007VIEW_GOLDLEAF',
            width: 148,
            fix: false,
            filter: true,
          },
          {
            code: 'method',
            label: 'label.PFANS2007VIEW_TAXMETHOD',
            width: 190,
            fix: false,
            filter: true,
          },
          {
            code: 'taxable',
            label: 'label.PFANS2007VIEW_COMBINEDTAX',
            width: 210,
            fix: false,
            filter: true,
          },
          {
            code: 'amount',
            label: 'label.PFANS2007VIEW_KOZO',
            width: 190,
            fix: false,
            filter: true,
          },
          {
            code: 'payable',
            label: 'label.PFANS2007VIEW_TAX',
            width: 166,
            fix: false,
            filter: true,
          },
          {
            code: 'income',
            label: 'label.PFANS2006VIEW_MONTHLYAVERAGE',
            width: 280,
            fix: false,
            filter: true,
          },
          {
            code: 'taxrate',
            label: 'label.PFANS2007VIEW_CASH',
            width: 190,
            fix: false,
            filter: true,
          },
          {
            code: 'deductions',
            label: 'label.PFANS2007VIEW_ARITHMETIC',
            width: 230,
            fix: false,
            filter: true,
          },
          {
            code: 'bonustax',
            label: 'label.PFANS2007VIEW_GOLD',
            width: 190,
            fix: false,
            filter: true,
          },
          {
            code: 'received',
            label: 'label.PFANS2007VIEW_IEMIKANE',
            width: 148,
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

        this.title = this.$t('title.PFANS2006VIEW') + this.$t('title.allcompany');
      }
      this.getTaxestotal();
    },
    methods: {
      changeddate(val) {
        this.months = moment(val).format('YYYY-MM');
        if (this.region === '2') {
          this.getBonus();
        } else if (this.region === '1') {
          this.getTaxestotal();
        }

      },
      MyBrowserIsIE() {
        let isIE = false;
        if (
          navigator.userAgent.indexOf('compatible') > -1 &&
          navigator.userAgent.indexOf('MSIE') > -1
        ) {
          // ie浏览器
          isIE = true;
        }
        if (navigator.userAgent.indexOf('Trident') > -1) {
          // edge 浏览器
          isIE = true;
        }
        return isIE;
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        }));
      },
      buttonClick(val) {
        if (val === 'export') {
          if (this.Taxestotal === 1) {
            if (this.$refs.roletable.selectedList.length === 0) {
              Message({
                message: this.$t('normal.info_01'),
                type: 'info',
                duration: 2 * 1000,
              });
              return;
            }
            this.selectedlist = this.$refs.roletable.selectedList;
            let heads = [
              this.$t('label.PFANSUSERFORMVIEW_JOBNUMBER'), this.$t('label.PFANS2006VIEW_CLUB'), this.$t('label.PFANS2006VIEW_LASTNAME')
              , this.$t('label.PFANS2006VIEW_JOINED'),this.$t('label.PFANS2006VIEW_SEX'),this.$t('label.PFANS2006VIEW_SINGLECHILD')
              , this.$t('label.PFANS2006VIEW_ENTRYTYPE'),this.$t('label.PFANS2006VIEW_SCHOLARSHIP'),this.$t('label.PFANS2006VIEW_SOCIETY')
              , this.$t('label.PFANS2006VIEW_REGISTER')
              , this.$t('label.PFANS2005FORMVIEW_YANGLAOJS'), this.$t('label.PFANS2005FORMVIEW_SHIYEJS'), this.$t('label.PFANS2005FORMVIEW_GONGSHANGJS')
              , this.$t('label.PFANS2005FORMVIEW_YILIAOJS'), this.$t('label.PFANS2005FORMVIEW_SHENGYUJS')
              , this.$t('label.PFANS2005FORMVIEW_HOUSINGFUNDBASE'), this.$t('label.PFANS2005FORMVIEW_LASTMONTHPAYMENTMONEY')
              , this.$t('label.PFANS2005FORMVIEW_LASTMONTHPAYMENTMONEYTO'), this.$t('label.PFANS2005FORMVIEW_MONTHPAYMENTMONEY')
              , this.$t('label.PFANS2005FORMVIEW_MONTHPAYMENTMONEYTO'), this.$t('label.PFANS2005FORMVIEW_RANK')
              , this.$t('label.PFANS2006VIEW_BIRTHREST'), this.$t('label.PFANS2005FORMVIEW_MONTHLYPOSTALTEMPORARY')
              , this.$t('label.PFANS2005FORMVIEW_SHORTDURATIONTIME'),this.$t('label.PFANS2005FORMVIEW_LONGDURATIONTIME')
              , this.$t('label.PFANS2005FORMVIEW_ABSENCETIME'), this.$t('label.PFANS2005FORMVIEW_ABSENCEOFWORK')
              , this.$t('label.PFANS2006VIEW_BASICSALARY'), this.$t('label.PFANS2006VIEW_YKBZJB'), this.$t('label.PFANS2006VIEW_YKBT')
              , this.$t('label.PFANS2006VIEW_KASUKE'), this.$t('label.PFANS2006VIEW_OTHER1'), this.$t('label.PFANS2006VIEW_SUBTOTAL1'), this.$t('label.PFANS2006VIEW_OTHER2')
              , this.$t('label.PFANS2006VIEW_MONTHLYBONUS'), this.$t('label.PFANS2006VIEW_OTHER3'), this.$t('label.PFANS2006VIEW_SUBTOTAL2'), this.$t('label.PFANS2006VIEW_INDUSTRY'), this.$t('label.PFANS2006VIEW_HEATING')
              , this.$t('label.PFANS2006VIEW_OLONECHILD'), this.$t('label.PFANS2006VIEW_SUBTOTAL3'), this.$t('label.PFANS2006VIEW_ARSENAL'), this.$t('label.PFANS2006VIEW_OLD'), this.$t('label.PFANS2006VIEW_MEDICAL')
              , this.$t('label.PFANS2006VIEW_UNEMPLOYMENT'), this.$t('label.PFANS2006VIEW_SOCIALSECURITY'), this.$t('label.PFANS2006VIEW_PUBLICMONEY'), this.$t('label.PFANS2006VIEW_SECURITYMON'), this.$t('label.PFANS2006VIEW_EXCLUSIVE')
              , this.$t('label.PFANS2006VIEW_ACCUMULATED'), this.$t('label.PFANS2006VIEW_UNACCUMULATED'), this.$t('label.PFANS2006VIEW_ANNUAL'), this.$t('label.PFANS2006VIEW_RESIDENTIALTAX'), this.$t('label.PFANS2006VIEW_COMPANYBOSS')
              , this.$t('label.PFANS2006VIEW_OTHER5'), this.$t('label.PFANS2006VIEW_RESPONSIBLE'), this.$t('label.PFANS2006VIEW_CUMULATIVE'), this.$t('label.PFANS2006VIEW_INCOME'), this.$t('label.PFANS2006VIEW_THISMONTH')
              , this.$t('label.PFANS2005VIEW_ACTUAL'), this.$t('label.PFANS2006VIEW_OLDC'), this.$t('label.PFANS2006VIEW_MEDICALC'), this.$t('label.PFANS2005FORMVIEW_COMUNEMPLOYMENTINSURANCEC'), this.$t('label.PFANS2005FORMVIEW_EMPLOYMENTINJURYINSURANCEC')
              , this.$t('label.PFANS2005FORMVIEW_COMBIRTHINSURANCE'), this.$t('label.PFANS2005FORMVIEW_HEATINGCOST'), this.$t('label.PFANS2005FORMVIEW_HOUSINGPROVIDENTFUND'), this.$t('label.PFANS2005FORMVIEW_TOTAL'), this.$t('label.PFANS2005FORMVIEW_LABORUNIONFUNDBASE')
              , this.$t('label.PFANS2009VIEW_INDUSTRIALPARTY'), this.$t('label.PFANS2005FORMVIEW_TOTALWAGES'), this.$t('label.PFANS2005FORMVIEW_GAUGE'), this.$t('label.PFANS2005FORMVIEW_TOTALGAUGE'), this.$t('label.PFANS2005FORMVIEW_OTHER6')];

           let filterVal = ['workdate','sex','onlychild','type','bonus','sociology','registered'
              , 'yanglaojs', 'shiyejs', 'gongshangjs', 'yiliaojs', 'shengyujs', 'accumulation', 'lastmonthbasic', 'lastmonthduty', 'thisbasic', 'thismonthduty', 'rnbasesalary'
              , 'birthrest', 'thismonthbasic', 'shortillness','longillness', 'owediligence', 'owingcontrol', 'actualamount'
              , 'ykbzjs', 'ykbz', 'overtimesubsidy', 'other1', 'total1'
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
                [heads[0]]: obj.jobnumber,
                [heads[1]]: obj.department_id,
                [heads[2]]: obj.user_id,
                [heads[3]]: obj.workdate,
                [heads[4]]: obj.sex,
                [heads[5]]: obj.onlychild,
                [heads[6]]: obj.type,
                [heads[7]]: obj.bonus,
                [heads[8]]: obj.sociology,
                [heads[9]]: obj.registered,
                [heads[10]]: obj.yanglaojs,
                [heads[11]]: obj.shiyejs,
                [heads[12]]: obj.gongshangjs,
                [heads[13]]: obj.yiliaojs,
                [heads[14]]: obj.shengyujs,
                [heads[15]]: obj.accumulation,
                [heads[16]]: parseFloat(obj.lastmonthbasic).toFixed(2),
                [heads[17]]: parseFloat(obj.lastmonthduty).toFixed(2),
                [heads[18]]: parseFloat(obj.thisbasic).toFixed(2),
                [heads[19]]: parseFloat(obj.thismonthduty).toFixed(2),
                [heads[20]]: obj.rnbasesalary,
                [heads[21]]: obj.birthrest,
                [heads[22]]: obj.thismonthbasic,
                [heads[23]]: obj.shortillness,
                [heads[24]]: obj.longillness,
                [heads[25]]: parseFloat(obj.owediligence).toFixed(2),
                [heads[26]]: parseFloat(obj.owingcontrol).toFixed(2),
                [heads[27]]: parseFloat(obj.actualamount).toFixed(2),
                [heads[28]]: obj.ykbzjs,
                [heads[29]]: parseFloat(obj.ykbz).toFixed(2),
                [heads[30]]: parseFloat(obj.overtimesubsidy).toFixed(2),
                [heads[31]]: obj.other1,
                [heads[32]]: parseFloat(obj.total1).toFixed(2),
                [heads[33]]: obj.other2,
                [heads[34]]: obj.appreciation,
                [heads[35]]: obj.other3,
                [heads[36]]: obj.total2,
                [heads[37]]: parseFloat(obj.taxestotal).toFixed(2),
                [heads[38]]: obj.heating,
                [heads[39]]: obj.onlychildmoney,
                [heads[40]]: obj.total3,
                [heads[41]]: parseFloat(obj.totalwages).toFixed(2),
                [heads[42]]: parseFloat(obj.endowmentinsurance).toFixed(2),
                [heads[43]]: parseFloat(obj.medicalinsurance).toFixed(2),
                [heads[44]]: parseFloat(obj.unemploymentinsurance).toFixed(2),
                [heads[45]]: parseFloat(obj.socialinsurance).toFixed(2),
                [heads[46]]: parseFloat(obj.accumulationfund).toFixed(2),
                [heads[47]]: parseFloat(obj.disciplinarycontrol).toFixed(2),
                [heads[48]]: parseFloat(obj.thismonthterm).toFixed(2),
                [heads[49]]: obj.thismonthadditional,
                [heads[50]]: obj.thismonthdutyfree,
                [heads[51]]: parseFloat(obj.lastdutyfree).toFixed(2),
                [heads[52]]: parseFloat(obj.housingmoneys).toFixed(2),
                [heads[53]]: parseFloat(obj.other4).toFixed(2),
                [heads[54]]: parseFloat(obj.other5).toFixed(2),
                [heads[55]]: parseFloat(obj.shouldwages).toFixed(2),
                [heads[56]]: parseFloat(obj.shouldcumulative).toFixed(2) ,
                [heads[57]]: parseFloat(obj.shouldpaytaxes).toFixed(2),
                [heads[58]]: parseFloat(obj.thismonthadjustment).toFixed(2),
                [heads[59]]: parseFloat(obj.realwages).toFixed(2),
                [heads[60]]: parseFloat(obj.comendowmentinsurance).toFixed(2),
                [heads[61]]: parseFloat(obj.commedicalinsurance).toFixed(2),
                [heads[62]]: parseFloat(obj.comunemploymentinsurance).toFixed(2),
                [heads[63]]: parseFloat(obj.cominjuryinsurance).toFixed(2),
                [heads[64]]: parseFloat(obj.combirthinsurance).toFixed(2),
                [heads[65]]: parseFloat(obj.comheating).toFixed(2),
                [heads[66]]: parseFloat(obj.comaccumulationfund).toFixed(2),
                [heads[67]]: parseFloat(obj.total).toFixed(2),
                [heads[68]]: parseFloat(obj.labourunionbase).toFixed(2),
                [heads[69]]: parseFloat(obj.labourunionfunds).toFixed(2),
                [heads[70]]: parseFloat(obj.comtotalwages).toFixed(2),
                [heads[71]]: parseFloat(obj.bonusmoney).toFixed(2),
                [heads[72]]: parseFloat(obj.totalbonus).toFixed(2),
                [heads[73]]: obj.other6,
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
                duration: 2 * 1000,
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
                [heads[2]]: parseFloat(obj.totalbonus1).toFixed(2),
                [heads[3]]: obj.method,
                [heads[4]]: parseFloat(obj.taxable).toFixed(2),
                [heads[5]]: parseFloat(obj.amount).toFixed(2),
                [heads[6]]: parseFloat(obj.payable).toFixed(2),
                [heads[7]]: parseFloat(obj.income).toFixed(2),
                [heads[8]]: obj.taxrate,
                [heads[9]]: parseFloat(obj.deductions).toFixed(2),
                [heads[10]]: parseFloat(obj.bonustax).toFixed(2),
                [heads[11]]: parseFloat(obj.received).toFixed(2),
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
      getTaxestotal() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2006Store/getwagesList', {dates: this.months})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              response[j].rowindex = j + 1;
              if (response[j].giving_id !== null && response[j].giving_id !== '') {
                response[j].giving_id = response[j].giving_id.substring(0, 4) + '-' + response[j].giving_id.substring(4, 6);
              }
              if (response[j].department_id !== null && response[j].department_id !== '') {
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
              if (response[j].thismonth !== null && response[j].thismonth !== '') {
                response[j].thismonth = Math.round(response[j].thismonth * 100 / 100);
              }
              //区分上短病假 20201201 gbb start
              // if (response[j].shortillness !== null || response[j].longillness !== '') {
              //   response[j].shortillness = Number(response[j].shortillness) + Number(response[j].longillness);
              // }
              //区分上短病假 20201201 gbb end
              if (this.$i18n) {
                response[j].sex = response[j].sex === 'PR019001' ? this.$t('label.PFANS2002FORMVIEW_BOY') : this.$t('label.PFANS2002FORMVIEW_GRIL');
                response[j].onlychild = response[j].onlychild === '1' ? this.$t('label.yes') : '-';
                response[j].type =
                  response[j].type === '1'
                    ? '入職'
                    : response[j].type === '2'
                    ? '女産休'
                    : response[j].type === '3'
                    ? '男看护'
                    : response[j].type === '4'
                    ? '退職'
                    : '-';
                //UPD GBB 20210220 PSDCD_PFANS_20210220_BUG_020 奖金记上用字典【PR021】 FROM
                response[j].bonus = response[j].bonus;// === '2' ? this.$t('label.PFANSUSERFORMVIEW_OLDSTAFF') : this.$t('label.PFANSUSERFORMVIEW_NEWSTAFF');
                //UPD GBB 20210220 PSDCD_PFANS_20210220_BUG_020 奖金记上用字典【PR021】 TO
                response[j].sociology = response[j].sociology === '1' ? this.$t('label.yes') : '-';
                response[j].registered = response[j].registered === '1' ? this.$t('label.yes') : '-';
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
              duration: 5 * 1000,
            });
            this.loading = false;
          });
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
              duration: 5 * 1000,
            });
            this.loading = false;
          });
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
