<template>
  <div>
    <EasyNormalContainer
      ref="container"
      :noback="true"
      v-loading="loading"
    >
      <div slot="customize">
        <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="dataestimate" :title="titlewagesestimate"
                         v-loading="loading" :summary-method="summaryMethod">
          <el-date-picker
            :placeholder="$t('normal.error_09')"
            @change="changed"
            slot="customize"
            style="width:11vw"
            type="month"
            v-model="months">
          </el-date-picker>
        </EasyNormalTable>
      </div>
      <div slot="customize">
        <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="dataactual" :title="titlewagesactual"
                         v-loading="loading" :summary-method="summaryMethod">
          <el-date-picker
            :placeholder="$t('normal.error_09')"
            @change="changed"
            slot="customize"
            style="width:11vw"
            type="month"
            v-model="months">
          </el-date-picker>
        </EasyNormalTable>
      </div>
      <div slot="customize">
        <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="datadiff" :title="titlewagesdiff"
                         v-loading="loading" :summary-method="summaryMethod">
          <el-date-picker
            :placeholder="$t('normal.error_09')"
            @change="changed"
            slot="customize"
            style="width:11vw"
            type="month"
            v-model="months">
          </el-date-picker>
        </EasyNormalTable>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import moment from 'moment';

  export default {
    name: 'PFANS2030View',
    components: {
      EasyNormalTable,
      EasyNormalContainer
    },
    data() {
      return {
        totaldata: [],
        months: moment(new Date()).format("YYYY-MM"),
        loading: false,
        titlewagesestimate: "label.PFANS2030FROMVIEW_WAGESESTIMATE",
        titlewagesactual: "label.PFANS2030FROMVIEW_WAGESACTUAL",
        titlewagesdiff: "label.PFANS2030FROMVIEW_WAGESDIFF",
        dataestimate: [],
        dataactual: [],
        datadiff: [],
        columns: [
          {
            code: 'department_id',
            label: 'label.department',
            width: 90,
            fix: true,
            filter: true
          },
          {
            code: 'user_id',
            label: 'label.PFANS2009VIEW_NUMBER',
            width: 90,
            fix: false,
            filter: true
          },
          {
            code: 'totalwages',
            label: 'label.PFANS2009VIEW_KONJIKI',
            width: 110,
            fix: false,
            filter: true
          },
          {
            code: 'taxestotal',
            label: 'label.PFANS2009VIEW_TAXENGINEERING',
            width: 136,
            fix: false,
            filter: true
          },
          {
            code: 'total3',
            label: 'label.PFANS2009VIEW_TAXWORKS',
            width: 134,
            fix: false,
            filter: true
          },
          {
            code: 'pension',
            label: 'label.PFANS2009VIEW_KAIHO',
            width: 134,
            fix: false,
            filter: true
          },
          {
            code: 'comendowmentinsurance',
            label: 'label.PFANS2030VIEW_COMENDOWMENTINSURANCE',
            width: 134,
            fix: false,
            filter: true
          },
          {
            code: 'commedicalinsurance',
            label: 'label.PFANS2030VIEW_COMMEDICALINSURANCE',
            width: 134,
            fix: false,
            filter: true
          },
          {
            code: 'comunemploymentinsurance',
            label: 'label.PFANS2030VIEW_COMUNEMPLOYMENTINSURANCE',
            width: 134,
            fix: false,
            filter: true
          },
          {
            code: 'cominjuryinsurance',
            label: 'label.PFANS2030VIEW_COMINJURYINSURANCE',
            width: 134,
            fix: false,
            filter: true
          },
          {
            code: 'combirthinsurance',
            label: 'label.PFANS2030VIEW_COMBIRTHINSURANCE',
            width: 134,
            fix: false,
            filter: true
          },
          {
            code: 'comheating',
            label: 'label.PFANS2030VIEW_COMHEATING',
            width: 110,
            fix: false,
            filter: true
          },
          {
            code: 'comaccumulationfund',
            label: 'label.PFANS2009VIEW_KOKIN',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'bonusmoney',
            label: 'label.PFANS2009VIEW_STOCK',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'appreciation',
            label: 'label.PFANS2009VIEW_MONTHLYTAX',
            width: 160,
            fix: false,
            filter: true
          },
          {
            code: 'labourunionfunds',
            label: 'label.PFANS2009VIEW_INDUSTRIALPARTY',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'other4',
            label: 'label.PFANS2009VIEW_DEPARTMENT',
            width: 130,
            fix: false,
            filter: true
          },
          {
            code: 'other5',
            label: 'label.PFANS2009VIEW_FUKUTOSHI',
            width: 90,
            fix: false,
            filter: true
          },
          {
            code: 'total',
            label: 'label.PFANS2009VIEW_COSTLABOR',
            width: 130,
            fix: false,
            filter: true
          },
          {
            code: 'overtimesubsidy',
            label: 'label.PFANS2009VIEW_OVERTIME',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'thismonthadjustment',
            label: 'label.PFANS2009VIEW_INCOMETAX',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'socialinsurance',
            label: 'label.PFANS2030VIEW_SOCIALINSURANCE',
            width: 136,
            fix: false,
            filter: true
          },
          {
            code: 'accumulationfund',
            label: 'label.PFANS2030VIEW_ACCUMULATIONFUND',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'realwages',
            label: 'label.PFANS2009VIEW_ACHIEVEMENTS',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'shouldcumulative',
            label: 'label.PFANS2009VIEW_SHAKONORIHIRO',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'other6',
            label: 'label.PFANS2009VIEW_KOJIKIN',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'labourunionbase',
            label: 'label.PFANS2005FORMVIEW_LABORUNIONFUNDBASE',
            width: 150,
            fix: false,
            filter: true
          },
        ],
        buttonList: [
          //{'key': 'handle', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
        ],
        rowid: '',
        row_id: 'department_id'
      };
    },
    mounted() {
      this.getWages();
    },
    methods: {
        changed(val) {
        this.months = moment(val).format('YYYY-MM');
        this.getWages();
      },
      getWages() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2005Store/getWagesdepartment', {dates: this.months})
          .then(response => {
            this.dataestimate = response.wagesListestimate;
            this.dataactual = response.wagesListactual;
            this.datadiff = response.wagesListdiff;
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
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'handle') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
        }
      },
      summaryMethod(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
          if (index === 0) {
              sums[index] = this.$t("label.PFANS2005FORMVIEW_HJ");
              return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                  const value = parseFloat(curr);
                  if (!isNaN(value)) {
                      return this.setScale2(parseFloat(prev) + parseFloat(curr));
                  } else {
                      return this.setScale2(prev);
                  }
              }, 0);
              sums[index] += " ";
          } else {
              //非合计项显示空 -- lxx
              sums[index] = " ";
              //非合计项显示空 -- lxx
          }
      });
      return sums;
  },
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
