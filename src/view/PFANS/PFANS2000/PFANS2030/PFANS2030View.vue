<template>
  <div>
    <EasyNormalContainer
      ref="container"
      :noback="true"
      v-loading="loading"
    >
      <div slot="customize">
        <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="dataestimate" :title="titlewagesestimate"
                         @buttonClick="buttonClick"
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
                         @buttonClick="buttonClick1"
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
                         @buttonClick="buttonClick2"
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
  import json2csv from 'json2csv';
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
            code: 'heating',
            label: 'label.PFANS2009VIEW_TAXWORKS',
            width: 136,
            fix: false,
            filter: true
          },
          {
              code: 'onlychildmoney',
              label: 'label.PFANS2009VIEW_COLLECTION',
              width: 136,
              fix: false,
              filter: true
          },
          {
            code: 'pension',
            label: 'label.PFANS2009VIEW_KAIHO',
            width: 136,
            fix: false,
            filter: true
          },
          {
            code: 'comendowmentinsurance',
            label: 'label.PFANS2030VIEW_COMENDOWMENTINSURANCE',
            width: 136,
            fix: false,
            filter: true
          },
          {
            code: 'commedicalinsurance',
            label: 'label.PFANS2030VIEW_COMMEDICALINSURANCE',
            width: 136,
            fix: false,
            filter: true
          },
          {
            code: 'comunemploymentinsurance',
            label: 'label.PFANS2030VIEW_COMUNEMPLOYMENTINSURANCE',
            width: 136,
            fix: false,
            filter: true
          },
          {
            code: 'cominjuryinsurance',
            label: 'label.PFANS2030VIEW_COMINJURYINSURANCE',
            width: 136,
            fix: false,
            filter: true
          },
          {
            code: 'combirthinsurance',
            label: 'label.PFANS2030VIEW_COMBIRTHINSURANCE',
            width: 136,
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
           {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-download'}
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
            if (this.dataestimate.length === 0) {
                Message({
                    message: this.$t('normal.info_16'),
                    type: 'info',
                    duration: 2 * 1000,
                });
                return;
            }
            this.exportdata(this.dataestimate);
        },
        buttonClick1(val) {
            if (this.dataactual.length === 0) {
                Message({
                    message: this.$t('normal.info_16'),
                    type: 'info',
                    duration: 2 * 1000,
                });
                return;
            }
            this.exportdata(this.dataactual);
        },
        buttonClick2(val) {
            if (this.datadiff.length === 0) {
                Message({
                    message: this.$t('normal.info_16'),
                    type: 'info',
                    duration: 2 * 1000,
                });
                return;
            }
            this.exportdata(this.datadiff);
        },
        //导出
        exportdata(vardata) {
            let heads = [
                this.$t('label.department'), this.$t('label.PFANS2009VIEW_NUMBER'), this.$t('label.PFANS2009VIEW_KONJIKI'),this.$t('label.PFANS2009VIEW_TAXENGINEERING')
                ,this.$t('label.PFANS2009VIEW_TAXWORKS'), this.$t('label.PFANS2009VIEW_COLLECTION'),this.$t('label.PFANS2009VIEW_KAIHO'), this.$t('label.PFANS2030VIEW_COMENDOWMENTINSURANCE')
                ,this.$t('label.PFANS2030VIEW_COMMEDICALINSURANCE'), this.$t('label.PFANS2030VIEW_COMUNEMPLOYMENTINSURANCE'), this.$t('label.PFANS2030VIEW_COMINJURYINSURANCE')
                ,this.$t('label.PFANS2030VIEW_COMBIRTHINSURANCE'),this.$t('label.PFANS2030VIEW_COMHEATING'), this.$t('label.PFANS2009VIEW_KOKIN')
                ,this.$t('label.PFANS2009VIEW_STOCK'), this.$t('label.PFANS2009VIEW_MONTHLYTAX'), this.$t('label.PFANS2009VIEW_INDUSTRIALPARTY')
                ,this.$t('label.PFANS2009VIEW_DEPARTMENT'),this.$t('label.PFANS2009VIEW_FUKUTOSHI'), this.$t('label.PFANS2009VIEW_COSTLABOR')
                ,this.$t('label.PFANS2009VIEW_OVERTIME'), this.$t('label.PFANS2009VIEW_INCOMETAX'), this.$t('label.PFANS2030VIEW_SOCIALINSURANCE')
                ,this.$t('label.PFANS2030VIEW_ACCUMULATIONFUND'),this.$t('label.PFANS2009VIEW_ACHIEVEMENTS'), this.$t('label.PFANS2009VIEW_SHAKONORIHIRO')
                ,this.$t('label.PFANS2009VIEW_KOJIKIN'), this.$t('label.PFANS2005FORMVIEW_LABORUNIONFUNDBASE')];
            let csvData = [];
            for (let i = 0; i < vardata.length; i++) {
                let obj = vardata[i];
                csvData.push({
                    [heads[0]]: obj.department_id,
                    [heads[1]]: obj.user_id,
                    [heads[2]]: parseFloat(obj.totalwages).toFixed(2),
                    [heads[3]]: parseFloat(obj.taxestotal).toFixed(2),
                    [heads[4]]: parseFloat(obj.heating).toFixed(2),
                    [heads[5]]: parseFloat(obj.onlychildmoney).toFixed(2),
                    [heads[6]]: parseFloat(obj.pension).toFixed(2),
                    [heads[7]]: parseFloat(obj.comendowmentinsurance).toFixed(2),
                    [heads[8]]: parseFloat(obj.commedicalinsurance).toFixed(2),
                    [heads[9]]: parseFloat(obj.comunemploymentinsurance).toFixed(2),
                    [heads[10]]: parseFloat(obj.cominjuryinsurance).toFixed(2),
                    [heads[11]]: parseFloat(obj.combirthinsurance).toFixed(2),
                    [heads[12]]: parseFloat(obj.comheating).toFixed(2),
                    [heads[13]]: parseFloat(obj.comaccumulationfund).toFixed(2),
                    [heads[14]]: parseFloat(obj.bonusmoney).toFixed(2),
                    [heads[15]]: parseFloat(obj.appreciation).toFixed(2),
                    [heads[16]]: parseFloat(obj.labourunionfunds).toFixed(2),
                    [heads[17]]: parseFloat(obj.other4).toFixed(2),
                    [heads[18]]: parseFloat(obj.other5).toFixed(2),
                    [heads[19]]: parseFloat(obj.total).toFixed(2),
                    [heads[20]]: parseFloat(obj.overtimesubsidy).toFixed(2),
                    [heads[21]]: parseFloat(obj.thismonthadjustment).toFixed(2),
                    [heads[22]]: parseFloat(obj.socialinsurance).toFixed(2),
                    [heads[23]]: parseFloat(obj.accumulationfund).toFixed(2),
                    [heads[24]]: parseFloat(obj.realwages).toFixed(2),
                    [heads[25]]: parseFloat(obj.shouldcumulative).toFixed(2),
                    [heads[26]]: parseFloat(obj.other6).toFixed(2),
                    [heads[27]]: parseFloat(obj.labourunionbase).toFixed(2),
                });
            }
            const result = json2csv.parse(csvData, {
                excelStrings: true,
            });
            let csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + result;
            const link = document.createElement('a');
            link.href = csvContent;
            var myDate = new Date;
            link.download = myDate.getFullYear() + this.$t('label.year') +  myDate.getMonth() + this.$t('label.month') + this.$t('title.PFANS2030VIEW') + '.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
