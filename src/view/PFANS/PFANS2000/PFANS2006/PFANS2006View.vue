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

  export default {
    name: 'PFANS2006View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        region: '1',
        loading: false,
        title: 'title.PFANS2006VIEW',
        data: [],
        activeName: '',
        buttonList: [],
        showTable1: true,
        columns1: [
          {
            code: 'basicinfor1',
            label: 'label.PFANS2006VIEW_BASICINFOR1',
            child: [
              {
                code: 'no',
                label: 'label.PFANS2006VIEW_NO',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'date',
                label: 'label.PFANS2006VIEW_DATE',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'club',
                label: 'label.PFANS2006VIEW_CLUB',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'lastname',
                label: 'label.PFANS2006VIEW_LASTNAME',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'joined',
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
                code: 'singlechild',
                label: 'label.PFANS2006VIEW_SINGLECHILD',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'entrytype',
                label: 'label.PFANS2006VIEW_ENTRYTYPE',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'scholarship',
                label: 'label.PFANS2006VIEW_SCHOLARSHIP',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'society',
                label: 'label.PFANS2006VIEW_SOCIETY',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'register',
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
                code: 'basicsalary',
                label: 'label.PFANS2006VIEW_BASICSALARY',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'reimbursement',
                label: 'label.PFANS2006VIEW_REIMBURSEMENT',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'telephone',
                label: 'label.PFANS2006VIEW_TELEPHONE',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'residential',
                label: 'label.PFANS2006VIEW_RESIDENTIAL',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'afternoon',
                label: 'label.PFANS2006VIEW_AFTERNOON',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'kasuke',
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
                code: 'subtotal1',
                label: 'label.PFANS2006VIEW_SUBTOTAL1',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'transportation',
                label: 'label.PFANS2006VIEW_TRANSPORTATION',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'womanwashing',
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
                code: 'monthlybonus',
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
                code: 'subtotal2',
                label: 'label.PFANS2006VIEW_SUBTOTAL2',
                width: 150,
                fix: false,
                filter: true,
              },
            ],
            width: 2100,
          },
          {
            code: 'industry',
            label: 'label.PFANS2006VIEW_INDUSTRY',
            width: 150,
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
                code: 'lonechild',
                label: 'label.PFANS2006VIEW_OLONECHILD',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'subtotal3',
                label: 'label.PFANS2006VIEW_SUBTOTAL3',
                width: 150,
                fix: false,
                filter: true,
              },
            ],
            width: 450,
          },
          {
            code: 'arsenal',
            label: 'label.PFANS2006VIEW_ARSENAL',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'security',
            label: 'label.PFANS2006VIEW_SECURITY',
            child: [
              {
                code: 'old',
                label: 'label.PFANS2006VIEW_OLD',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'medical',
                label: 'label.PFANS2006VIEW_MEDICAL',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'unemployment',
                label: 'label.PFANS2006VIEW_UNEMPLOYMENT',
                width: 150,
                fix: false,
                filter: true,
              },
            ],
            width: 450,
          },
          {
            code: 'socialsecurity',
            label: 'label.PFANS2006VIEW_SOCIALSECURITY',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'publicmoney',
            label: 'label.PFANS2006VIEW_PUBLICMONEY',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'securitymon',
            label: 'label.PFANS2006VIEW_SECURITYMON',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'exclusive',
            label: 'label.PFANS2006VIEW_EXCLUSIVE',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'accumulated',
            label: 'label.PFANS2006VIEW_ACCUMULATED',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'unaccumulated',
            label: 'label.PFANS2006VIEW_UNACCUMULATED',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'annual',
            label: 'label.PFANS2006VIEW_ANNUAL',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'onlytax',
            label: 'label.PFANS2006VIEW_ONLYTAX',
            child: [
              {
                code: 'residentialtax',
                label: 'label.PFANS2006VIEW_RESIDENTIALTAX',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'companyboss',
                label: 'label.PFANS2006VIEW_COMPANYBOSS',
                width: 150,
                fix: false,
                filter: true,
              }, {
                code: 'other5',
                label: 'label.PFANS2006VIEW_OTHER5',
                width: 150,
                fix: false,
                filter: true,
              },
            ],
            width: 150,
          },
          {
            code: 'responsible',
            label: 'label.PFANS2006VIEW_RESPONSIBLE',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'cumulative',
            label: 'label.PFANS2006VIEW_CUMULATIVE',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'income',
            label: 'label.PFANS2006VIEW_INCOME',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'thismonth',
            label: 'label.PFANS2006VIEW_THISMONTH',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'actual',
            label: 'label.PFANS2006VIEW_ACTUAL',
            width: 150,
            fix: false,
            filter: true,
          },
        ],
        columns2: [
          {
            code: 'year',
            label: 'label.PFANS2007VIEW_YEAR',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'name',
            label: 'label.PFANS2007VIEW_NAME',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'goldleafsum',
            label: 'label.PFANS2007VIEW_GOLDLEAF',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'taxmethod',
            label: 'label.PFANS2007VIEW_TAXMETHOD',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'combined',
            label: 'label.PFANS2007VIEW_COMBINEDTAX',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'goldleaf',
            label: 'label.PFANS2007VIEW_GOLDLEAF',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'konpo',
            label: 'label.PFANS2007VIEW_KOZO',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'applicationtax',
            label: 'label.PFANS2007VIEW_TAX',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'monthlyaverage',
            label: 'label.PFANS2006VIEW_MONTHLYAVERAGE',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'average',
            label: 'label.PFANS2007VIEW_CASH',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'calculation',
            label: 'label.PFANS2007VIEW_ARITHMETIC',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'property',
            label: 'label.PFANS2007VIEW_GOLD',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'leadmoney',
            label: 'label.PFANS2007VIEW_IEMIKANE',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'note',
            label: 'label.remarks',
            width: 200,
            fix: false,
            filter: true,
          },
        ],

      };
    },
    methods: {
      changed() {
        debugger;
        if (this.region === '2') {
          this.showTable1 = false;
        } else if (this.region === '1') {
          this.showTable1 = true;
        }
      },
    },
  };
</script>

<style scoped>

</style>
