<template>
  <div>
    <EasyNormalTable v-show="showTable1" v-loading="loading" :buttonList="buttonList" :columns="columns1" :data="data"
                     :showSelectByCondition="displayOrNot" :title="title">
      <el-select slot="customize" v-model="region" @change="changed">
        <el-option :label="$t('label.PFANS2006VIEW_WAGES')" value="1"></el-option>
        <el-option :label="$t('label.PFANS2006VIEW_BONUS')" value="2"></el-option>
      </el-select>
      <el-date-picker
        slot="customize"
        v-model="months"
        :placeholder="$t('normal.error_09')"
        style="width:11vw"
        type="month"
        @change="changeddate">
      </el-date-picker>
    </EasyNormalTable>
    <EasyNormalTable v-show="!showTable1" v-loading="loading" :buttonList="buttonList" :columns="columns2" :data="data"
                     :showSelectByCondition="displayOrNot" :title="title">
      <el-select slot="customize" v-model="region" @change="changed">
        <el-option :label="$t('label.PFANS2006VIEW_WAGES')" value="1"></el-option>
        <el-option :label="$t('label.PFANS2006VIEW_BONUS')" value="2"></el-option>
      </el-select>
      <el-date-picker
        slot="customize"
        v-model="months"
        :placeholder="$t('normal.error_09')"
        style="width:11vw"
        type="month"
        @change="changeddate">
      </el-date-picker>
    </EasyNormalTable>
  </div>
</template>

<script>
import EasyNormalTable from '@/components/EasyNormalTable';
import moment from 'moment';
import {getCurrentRole6, getUserInfo} from '@/utils/customize';

export default {
  name: 'PFANS2028View',
  components: {
    EasyNormalTable,
  },
  data() {
    return {
      roles: '',
      displayOrNot: false,
      months: moment(new Date()).format('YYYY-MM'),
      region: '1',
      loading: false,
      // title: 'title.PFANS2006VIEW',
      title: '',
      data: [],
      activeName: '',
      buttonList: [],
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
              code: 'giving_id',
              label: 'label.PFANS2006VIEW_DATE',
              width: 90,
              fix: true,
              filter: true,
            }, {
              code: 'department_id',
              label: 'label.PFANS2006VIEW_CLUB',
              width: 120,
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
              code: 'sociology',
              label: 'label.PFANS2006VIEW_SCHOLARSHIP',
              width: 110,
              fix: false,
              filter: true,
            }, {
              code: 'society',
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
            // {
            //   code: 'supplement',
            //   label: 'label.PFANS2006VIEW_REIMBURSEMENT',
            //   width: 210,
            //   fix: false,
            //   filter: true,
            // },
            // {
            //   code: 'telephonesubsidy',
            //   label: 'label.PFANS2006VIEW_TELEPHONE',
            //   width: 150,
            //   fix: false,
            //   filter: true,
            // },
            {
              code: 'ykbzjs',
              label: 'label.PFANS2006VIEW_YKBZJB',
              width: 150,
              fix: false,
              filter: true,
            },
            {
              code: 'ykbz',
              label: 'label.PFANS2006VIEW_YKBZ',
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
              code: 'traffic',
              label: 'label.PFANS2006VIEW_TRANSPORTATION',
              width: 110,
              fix: false,
              filter: true,
            },
            {
              code: 'washingtheory',
              label: 'label.PFANS2006VIEW_WOMANWASHING',
              width: 124,
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
              width: 96,
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
              width: 96,
              fix: false,
              filter: true,
            },
          ],
          width: 450,
        },
        {
          code: 'totalwages',
          label: 'label.PFANS2006VIEW_ARSENAL',
          width: 190,
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
          width: 450,
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
        // {
        //     code: 'totalbonus2',
        //     label: 'label.PFANS2007VIEW_GOLDLEAF',
        //     width: 220,
        //     fix: false,
        //     filter: true,
        // },
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
    this.roles = getCurrentRole6();
    if (this.$i18n) {

      this.title = this.$t('title.PFANS2006VIEW') + this.$t('title.onlypeo');
    }
    //只有张建波、冷美琴、康奕凝
    // if(this.$store.getters.userinfo.userid === "5e78fefff1560b363cdd6db7"
    //   || this.$store.getters.userinfo.userid === "5e78b22c4e3b194874180f5f"
    //   || this.$store.getters.userinfo.userid === "5e78b2034e3b194874180e37"){
    if (this.roles === '0') {
      this.getTaxestotal();
    }
  },
  methods: {
    // update gbb 20210312 NT_PFANS_20210308_BUG_168 添加日期组件 start
    changeddate(val) {
      this.months = moment(val).format('YYYY-MM');
      if (this.region === '2') {
        this.getBonus();
      } else if (this.region === '1') {
        this.getTaxestotal();
      }
    },
    // update gbb 20210312 NT_PFANS_20210308_BUG_168 添加日期组件 end
    getTaxestotal() {
      this.loading = true;
      this.$store
        // update gbb 20210312 NT_PFANS_20210308_BUG_168 添加日期组件 start
        //.dispatch('PFANS2006Store/getTaxestotal', {"userid": this.$store.getters.userinfo.userid})
        .dispatch('PFANS2006Store/getTaxestotal', {'userid': this.$store.getters.userinfo.userid, 'dates': this.months})
        // update gbb 20210312 NT_PFANS_20210308_BUG_168 添加日期组件 end
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            response[j].rowindex = j + 1;
            // response[j].giving_id = moment(response[j].createon).format('YYYY-MM');
            response[j].giving_id = moment(response[j].createonym).format('YYYY-MM');
            if (response[j].user_id !== null && response[j].user_id !== '') {
              let rst = getUserInfo(response[j].user_id);
              if (rst) {
                response[j].user_id = rst.userinfo.customername;
                // response[j].department_id = rst.userinfo.centername;
              }
            }

            if (response[j].workdate !== null && response[j].workdate !== '') {
              response[j].workdate = moment(response[j].workdate).format('YYYY-MM-DD');
            }
            if (this.$i18n) {
              response[j].sex = response[j].sex === 'PR019001' ? this.$t('label.PFANS2002FORMVIEW_BOY') : this.$t('label.PFANS2002FORMVIEW_GRIL');
              response[j].onlychild = response[j].onlychild === '1' ? this.$t('label.yes') : '-';
              response[j].type =
                response[j].type === '1'
                  ? '入職'
                  : response[j].type === '2'
                  ? '女産休'
                  : response[j].type === '4'
                    ? '退職'
                    : '-';
              //UPD GBB 20210220 PSDCD_PFANS_20210220_BUG_020 奖金记上用字典【PR021】 FROM
              response[j].bonus = response[j].bonus; //=== "2" ? this.$t("label.PFANSUSERFORMVIEW_OLDSTAFF") : this.$t("label.PFANSUSERFORMVIEW_NEWSTAFF");
              //UPD GBB 20210220 PSDCD_PFANS_20210220_BUG_020 奖金记上用字典【PR021】 TO
              response[j].sociology = response[j].sociology === '1' ? this.$t('label.yes') : '-';
              response[j].registered = response[j].registered === '1' ? this.$t('label.yes') : '-';
            }
          }
          this.data = response;
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
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
        // update gbb 20210312 NT_PFANS_20210308_BUG_168 添加日期组件 start
        //.dispatch('PFANS2006Store/getBonus', {"userid": this.$store.getters.userinfo.userid})
        .dispatch('PFANS2006Store/getBonus', {userid: this.$store.getters.userinfo.userid, dates: this.months})
        // update gbb 20210312 NT_PFANS_20210308_BUG_168 添加日期组件 end
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].user_id !== null && response[j].user_id !== '') {
              let rst = getUserInfo(response[j].user_id);
              if (rst) {
                response[j].user_id = rst.userinfo.customername;
              }
            }
          }
          this.data = response;
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
    changed() {
      if (this.region === '2') {
        this.showTable1 = false;
        this.title = this.$t('label.PFANS2006VIEW_BONUS') + this.$t('title.onlypeo');
        this.getBonus();
      } else if (this.region === '1') {
        this.showTable1 = true;
        this.title = this.$t('title.PFANS2006VIEW') + this.$t('title.onlypeo');
        this.getTaxestotal();

      }
    },
  },
};
</script>

<style scoped>

</style>
