<template>
  <EasyNormalContainer
    ref="container"
    :noback="true"
    v-loading="loading">
    <div slot="customize">
      <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="dataestimate" :title="titlewagesestimate"
                       v-loading="loading">
      </EasyNormalTable>
    </div>
    <div slot="customize">
      <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="dataactual" :title="titlewagesactual"
                       v-loading="loading">
      </EasyNormalTable>
    </div>
    <div slot="customize">
      <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="datadiff" :title="titlewagesdiff"
                       v-loading="loading">
      </EasyNormalTable>
    </div>
  </EasyNormalContainer>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  let moment = require('moment');
  import {Message} from 'element-ui';
  export default {
    name: 'PFANS2009View',
    components: {
      EasyNormalTable,
      EasyNormalContainer
    },
    data() {
      return {
        loading: false,
        titlewagesestimate: "label.PFANS2030FROMVIEW_WAGESESTIMATE",
        titlewagesactual: "label.PFANS2030FROMVIEW_WAGESACTUAL",
        titlewagesdiff: "label.PFANS2030FROMVIEW_WAGESDIFF",
        dataestimate: [],
        dataactual: [],
        datadiff: [],
        columns: [
          {
            code: 'createonym',
            label: 'label.PFANS2009VIEW_JUNE',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.PFANS2009VIEW_NUMBER',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'totalwages',
            label: 'label.PFANS2009VIEW_KONJIKI',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'taxestotal',
            label: 'label.PFANS2009VIEW_TAXENGINEERING',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'total3',
            label: 'label.PFANS2009VIEW_TAXWORKS',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'socialinsurance',
            label: 'label.PFANS2009VIEW_KAIHO',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'comaccumulationfund',
            label: 'label.PFANS2009VIEW_KOKIN',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'bonusmoney',
            label: 'label.PFANS2009VIEW_STOCK',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'appreciation',
            label: 'label.PFANS2009VIEW_MONTHLYTAX',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'labourunionfunds',
            label: 'label.PFANS2009VIEW_INDUSTRIALPARTY',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'other4',
            label: 'label.PFANS2009VIEW_DEPARTMENT',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'other5',
            label: 'label.PFANS2009VIEW_FUKUTOSHI',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'total',
            label: 'label.PFANS2009VIEW_COSTLABOR',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'overtimesubsidy',
            label: 'label.PFANS2009VIEW_OVERTIME',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'thismonthadjustment',
            label: 'label.PFANS2009VIEW_INCOMETAX',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'realwages',
            label: 'label.PFANS2009VIEW_ACHIEVEMENTS',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'shouldcumulative',
            label: 'label.PFANS2009VIEW_SHAKONORIHIRO',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'other6',
            label: 'label.PFANS2009VIEW_KOJIKIN',
            width: 200,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [],
      };
    },
    mounted() {
      this.getWages();
    },
    methods: {
      getWages() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2005Store/getWagecompany')
          .then(response => {
            //region 预计发生额
            this.dataestimate =  this.getresponse(response.wagesListestimate);
            //endregion 预计发生额

            //region 实际发生额
            this.dataactual = this.getresponse(response.wagesListactual);
            //endregion 实际发生额

            //region 差异额
            this.datadiff = this.getresponse(response.wagesListdiff);
            //endregion 差异额
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
      getresponse(response) {
          let letlength = response.length;
          if(letlength > 0){
              //去年同期工资
              let letyear = moment(new Date(response[letlength - 1].createonym).setFullYear(new Date(response[letlength - 1].createonym).getFullYear() - 1)).format("YYYY-MM");
              //上个月工资
              let letmonth = moment(new Date(response[letlength - 1].createonym).setMonth(new Date(response[letlength - 1].createonym).getMonth() - 1)).format("YYYY-MM");
              for (let i = 0; i < letlength; i++) {
                  if(moment(response[i].createonym).format('YYYY-MM') === letmonth
                      || moment(response[i].createonym).format('YYYY-MM') === letyear){
                      let letcreateon;
                      if (this.$i18n) {
                          if(moment(response[i].createonym).format('YYYY-MM') === letmonth){
                              letcreateon = this.$t("label.PFANS2009VIEW_DIFFMONTH");
                          }
                          else{
                              letcreateon = this.$t("label.PFANS2009VIEW_DIFFYEAR");
                          }
                      }
                      response[i].createonym = moment(response[i].createonym).format('YYYY-MM').replace('-',this.$t("label.year")) + this.$t("label.day")
                      response.push({
                          createonym:letcreateon,
                          totalwages: response[letlength - 1].totalwages === '-' ? '-' : Math.round((response[letlength - 1].totalwages - response[i].totalwages) * 100) / 100,
                          taxestotal: response[letlength - 1].taxestotal === '-' ? '-' : Math.round((response[letlength - 1].taxestotal - response[i].taxestotal) * 100) / 100,
                          total3: response[letlength - 1].total3 === '-' ? '-' : Math.round((response[letlength - 1].total3 - response[i].total3) * 100) / 100,
                          socialinsurance: response[letlength - 1].socialinsurance === '-' ? '-' : Math.round((response[letlength - 1].socialinsurance - response[i].socialinsurance) * 100) / 100,
                          comaccumulationfund: response[letlength - 1].comaccumulationfund === '-' ? '-' : Math.round((response[letlength - 1].comaccumulationfund - response[i].comaccumulationfund) * 100) / 100,
                          bonusmoney: response[letlength - 1].bonusmoney === '-' ? '-' : Math.round((response[letlength - 1].bonusmoney - response[i].bonusmoney) * 100) / 100,
                          appreciation: response[letlength - 1].appreciation === '-' ? '-' : Math.round((response[letlength - 1].appreciation - response[i].appreciation) * 100) / 100,
                          labourunionfunds: response[letlength - 1].labourunionfunds === '-' ? '-' : Math.round((response[letlength - 1].labourunionfunds - response[i].labourunionfunds) * 100) / 100,
                          other4: response[letlength - 1].other4 === '-' ? '-' : Math.round((response[letlength - 1].other4 - response[i].other4) * 100) / 100,
                          other5: response[letlength - 1].other5 === '-' ? '-' : Math.round((response[letlength - 1].other5 - response[i].other5) * 100) / 100,
                          total: response[letlength - 1].total === '-' ? '-' : Math.round((response[letlength - 1].total - response[i].total) * 100) / 100,
                          overtimesubsidy: response[letlength - 1].overtimesubsidy === '-' ? '-' : Math.round((response[letlength - 1].overtimesubsidy - response[i].overtimesubsidy) * 100) / 100,
                          thismonthadjustment: response[letlength - 1].thismonthadjustment === '-' ? '-' : Math.round((response[letlength - 1].thismonthadjustment - response[i].thismonthadjustment) * 100) / 100,
                          realwages: response[letlength - 1].realwages === '-' ? '-' : Math.round((response[letlength - 1].realwages - response[i].realwages) * 100) / 100,
                          shouldcumulative: response[letlength - 1].shouldcumulative === '-' ? '-' : Math.round((response[letlength - 1].shouldcumulative - response[i].shouldcumulative) * 100) / 100,
                          other6: response[letlength - 1].other6 === '-' ? '-' : Math.round((response[letlength - 1].other6 - response[i].other6) * 100) / 100,
                      });
                  }
                  else{
                      response[i].createonym = moment(response[i].createonym).format('YYYY-MM').replace('-',this.$t("label.year")) + this.$t("label.day")
                  }
              }
          }
          return response;
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
      rowheight({row, column, rowIndex, columnIndex}) {
          // if(Number(val) != 'NaN' || Number(val) != '0'){
          //
          // }
          return 'stylered';
      },
    }
  };
</script>

<style scoped>
  .stylered {
    color: red;
  }
</style>
