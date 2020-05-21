<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="rowid"
                     :showSelection="showSelection"
                     :title="title" @buttonClick="buttonClick" @dbrowClick="dbrowClick" ref="roletable"
                     v-loading="loading" v-show="this.showTable===1">

      <el-form label-position="top" label-width="8vw" slot="search">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1044VIEW_CONTRACT')">
              <el-select @change="changed" v-model="contractType">
                <el-option :label="$t('menu.COMMISSIONCONTRACT')" value="0"></el-option>
                <el-option :label="$t('menu.BROKERAGECONTRACT')" value="1"></el-option>
                <el-option :label="$t('menu.OTHERCONTRACT')" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYDATE')">
              <el-date-picker
                @change="changed" type="month"
                v-model="month">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS2016VIEW_OCCURRENCEDATE')">
              <el-date-picker
                @change="changed" type="month"
                v-model="month3">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS2016VIEW_FINISHEDDATE')">
              <el-date-picker
                @change="changed" type="month"
                v-model="month4">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMDATE')">
              <el-date-picker
                @change="changed" type="month"
                v-model="month2">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </EasyNormalTable>
<!--    add-ws-No.29-合同检索一览表中追加纳品日期-->
    <EasyNormalTable :buttonList="buttonList" :columns="columns2" :data="data" :rowid="rowid"
                     :showSelection="showSelection"
                     :title="title" @buttonClick="buttonClick" @dbrowClick="dbrowClick" ref="roletable"
                     v-loading="loading" v-show="this.showTable===2">
      <el-form label-position="top" label-width="8vw" slot="search">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1044VIEW_CONTRACT')">
              <el-select @change="changed" v-model="contractType">
                <el-option :label="$t('menu.COMMISSIONCONTRACT')" value="0"></el-option>
                <el-option :label="$t('menu.BROKERAGECONTRACT')" value="1"></el-option>
                <el-option :label="$t('menu.OTHERCONTRACT')" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYDATE')">
              <el-date-picker
                @change="changed" type="month"
                v-model="month">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS2016VIEW_OCCURRENCEDATE')">
              <el-date-picker
                @change="changed" type="month"
                v-model="month3">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS2016VIEW_FINISHEDDATE')">
              <el-date-picker
                @change="changed" type="month"
                v-model="month4">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMDATE')">
              <el-date-picker
                @change="changed" type="month"
                v-model="month2">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </EasyNormalTable>
<!--    add-ws-No.29-合同检索一览表中追加纳品日期-->
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo, getOrgInfo, getStatus, getUserInfo} from '@/utils/customize';

  const {Parser} = require('json2csv');
  export default {
    name: 'PFANS1044View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        showTable: '',
        selectedlist: [],
        showSelection: true,
        buttonList: [
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-upload2'},
          {'key': 'export1', 'name': 'label.PFANS1012VIEW_EXPORTCSV', 'disabled': false, icon: 'el-icon-upload2'},
        ],
        contractType: '0',
        loading: false,
        title: 'title.PFANS1044VIEW',
        contractnumbercount: '',
        data: [],
        totalcostvalue: [],
        totalcostvalue2: [],
        totalcostvalue3: [],
        month: '',
        month2: '',
        month4: '',
        month3: '',
        alldata: [],
        alldata2: [],
        // add-ws-No.29-合同检索一览表中追加纳品日期
        columns2: [
          {
            code: 'username',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'deployment',
            label: 'label.group',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'contractnumber',
            label: 'label.PFANS1024VIEW_CONTRACTNUMBER',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'contracttype',
            label: 'label.PFANS1024VIEW_CONTRACTTYPE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'applicationdate',
            label: 'label.PFANS1024VIEW_APPLICATIONDATE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'price',
            label: 'label.PFANS1024VIEW_CLAIMAMOUNT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'start',
            label: 'label.PFANS2016VIEW_OCCURRENCEDATE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'end',
            label: 'label.PFANS2016VIEW_FINISHEDDATE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'custochinese',
            label: 'label.PFANS1010FORMVIEW_COMPANYNAME',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'decide',
            label: 'label.PFANS1044VIEW_ONE',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'decisionnumber',
            label: 'label.PFANS1044VIEW_TWO',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'delivery',
            label: 'label.PFANS1044VIEW_THREE',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'deliverycondition',
            label: 'label.PFANS1044VIEW_FORE',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'deliverydate',
            label: 'label.PFANS1044VIEW_FIVE',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'deliveryfinshdate',
            label: 'label.PFANS1044VIEW_SIX',
            width: 130,
            fix: false,
            filter: true,
          },
        ],
        //add-ws-No.29-合同检索一览表中追加纳品日期
        columns: [
          {
            code: 'username',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'deployment',
            label: 'label.group',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'contractnumber',
            label: 'label.PFANS1024VIEW_CONTRACTNUMBER',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'contracttype',
            label: 'label.PFANS1024VIEW_CONTRACTTYPE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'applicationdate',
            label: 'label.PFANS1024VIEW_APPLICATIONDATE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'price',
            label: 'label.PFANS1024VIEW_CLAIMAMOUNT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'start',
            label: 'label.PFANS2016VIEW_OCCURRENCEDATE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'end',
            label: 'label.PFANS2016VIEW_FINISHEDDATE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'custochinese',
            label: 'label.PFANS1010FORMVIEW_COMPANYNAME',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        row: '',
        contractnumber: '',
        state: '',
        rowid: 'contractapplication_id ',
      };
    },
    beforeRouteEnter(to, from, next) {

      if (from.name === 'PFANS1024FormView' || from.name === 'PFANS1026FormView' || from.name === 'PFANS1033FormView') {
        to.meta.isBack = true;
      } else {
        to.meta.isBack = false;
      }
      next();
    },

    activated() {
      if (!this.$route.meta.isBack) {
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        this.init();
        this.contractType = '0';
        this.month = '';
        this.month2 = '';
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack = false;

    },
    methods: {
      init() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/get', {})
          .then(response => {
            let letcontractnumber = [];
            let tabledata = response.contractapplication;
            for (let i = 0; i < tabledata.length; i++) {
              tabledata[i].status = getStatus(tabledata[i].status);
              let user = getUserInfo(tabledata[i].user_id);
              if (user) {
                tabledata[i].username = getUserInfo(tabledata[i].user_id).userinfo.customername;
              }
              // add ccm
              if (tabledata[i].loadingjudge) {
                let user = getUserInfo(tabledata[i].loadingjudge);
                if (user) {
                  tabledata[i].loadingjudge = getUserInfo(tabledata[i].loadingjudge).userinfo.customername;
                }
              }
              // add ccm


              if (tabledata[i].applicationdate !== null && tabledata[i].applicationdate !== '') {
                tabledata[i].applicationdate = moment(tabledata[i].applicationdate).format('YYYY-MM-DD');
              }
              if (tabledata[i].contracttype !== null && tabledata[i].contracttype !== '') {
                let letContracttype = getDictionaryInfo(tabledata[i].contracttype);
                if (letContracttype != null) {
                  tabledata[i].contracttype = letContracttype.value1;
                }
              }

              if (tabledata[i].contractnumber != '') {
                letcontractnumber.push(tabledata[i].contractnumber);
              }
              if (tabledata[i].type !== '1') {
                if (tabledata[i].contractdate && tabledata[i].contractdate.split('~').length > 1) {
                  tabledata[i].start = tabledata[i].contractdate.split('~')[0].trim();
                  tabledata[i].end = tabledata[i].contractdate.split('~')[1].trim();
                }
              } else {
                if (tabledata[i].claimdatetime && tabledata[i].claimdatetime.split('~').length > 1) {
                  tabledata[i].start = tabledata[i].claimdatetime.split('~')[0].trim();
                  tabledata[i].end = tabledata[i].claimdatetime.split('~')[1].trim();
                }

              }

              if (tabledata[i].state === '1' && this.$i18n) {
                tabledata[i].state = this.$t('label.PFANS8008FORMVIEW_EFFECTIVE');
              } else if (tabledata[i].state === '0' && this.$i18n) {
                tabledata[i].state = this.$t('label.PFANS8008FORMVIEW_INVALID');
              }
            }
            var arr = [];
            let o;
            for (var i = 0; i < letcontractnumber.length; i++) {
              if (arr.indexOf(letcontractnumber[i]) == -1) {
                arr.push(letcontractnumber[i]);
                o = Object.assign([], tabledata[i]);
                this.alldata.push(o);
              }
            }
            // this.alldata = this.data;
            for (let i = 0; i < response.contractnumbercount.length; i++) {
              if (response.contractnumbercount[i].loadingjudge) {
                let user = getUserInfo(response.contractnumbercount[i].loadingjudge);
                if (user) {
                  response.contractnumbercount[i].loadingjudge = getUserInfo(response.contractnumbercount[i].loadingjudge).userinfo.customername;
                }
              }
            }
            this.alldata2 = response.contractnumbercount;
            this.contractnumbercount = (letcontractnumber.length + 1);
            this.changed();
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
      dbrowClick(val) {
        let name = '';
        if (val.type === '0') {
          name = 'PFANS1024FormView';
        } else if (val.type === '1') {
          name = 'PFANS1026FormView';
        } else if (val.type === '2') {
          name = 'PFANS1033FormView';
        }

        this.$router.push({
          name: name,
          params: {
            _id: val.contractnumber,
            state: val.state,
            disabled: true,
          },
        });
      },
      buttonClick(val) {
        if (val === 'export') {
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          let selectedlist = this.$refs.roletable.selectedList;
          let output = [];
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [
              this.$t('label.department'),
              this.$t('label.PFANS1024VIEW_DEPLOYMENT'),
              this.$t('label.applicant'),
              this.$t('label.PFANS1024VIEW_APPLICATIONDATE'),
              this.$t('label.PFANS1024VIEW_CONTRACTTYPE'),
              this.$t('label.PFANS1024VIEW_CONTRACTNUMBER'),
              this.$t('label.PFANS1024VIEW_ENTRYCONDITION'),
              this.$t('label.PFANS1024VIEW_ENTRYPAYMENT'),
              this.$t('label.PFANS1024VIEW_CURRENCYPOSITION'),
              this.$t('label.PFANS1024VIEW_CLAIMAMOUNT'),
              this.$t('label.PFANS2016VIEW_OCCURRENCEDATE'),
              this.$t('label.PFANS2016VIEW_FINISHEDDATE'),
              this.$t('label.PFANS1024VIEW_TEMA'),
              this.$t('label.PFANS1024VIEW_EXTENSIONDATE'),
              this.$t('label.PFANS1024VIEW_CUSTOMERNAME') + this.$t('label.PFANS1024VIEW_JAPANESE'),
              this.$t('label.PFANS1024VIEW_CUSTOMERNAME') + this.$t('label.PFANS1024VIEW_ENGLISH'),
              this.$t('label.PFANS1024VIEW_CUSTOMERNAME') + this.$t('label.PFANS1024VIEW_ABBREVIATION'),
              this.$t('label.PFANS1024VIEW_CUSTOMERNAME') + this.$t('label.PFANS1024VIEW_CHINESE'),
              this.$t('label.PFANS1024VIEW_CUSTOMERPLACE') + this.$t('label.PFANS1024VIEW_JAPANESE'),
              this.$t('label.PFANS1024VIEW_CUSTOMERPLACE') + this.$t('label.PFANS1024VIEW_ENGLISH'),
              this.$t('label.PFANS1024VIEW_CUSTOMERPLACE') + this.$t('label.PFANS1024VIEW_CHINESE'),
              this.$t('label.PFANS1024VIEW_RESPON') + this.$t('label.PFANS1024VIEW_BEFOREJAPANESE'),
              this.$t('label.PFANS1024VIEW_RESPON') + this.$t('label.PFANS1024VIEW_BEFOREENGLISH'),
              this.$t('label.PFANS1024VIEW_RESPON') + this.$t('label.PFANS1024VIEW_PHONE'),
              this.$t('label.PFANS1024VIEW_RESPON') + this.$t('label.PFANS1024VIEW_EMAIL'),
              this.$t('label.PFANS1024VIEW_CONTRACT2') + this.$t('label.PFANS1024VIEW_JAPANESE'),
              this.$t('label.PFANS1024VIEW_CONTRACT2') + this.$t('label.PFANS1024VIEW_ENGLISH'),
              this.$t('label.PFANS1024VIEW_CONTRACT2') + this.$t('label.PFANS1024VIEW_CHINESE'),
              this.$t('label.PFANS1024VIEW_ENTRUSTEDNUMBER'),
              this.$t('label.PFANS1024VIEW_DELIVERYFINSHDATE'),
              this.$t('label.PFANS1024VIEW_DELIVERYDATE'),
              this.$t('label.PFANS1044VIEW_KANRYO'),
              this.$t('label.PFANS1024VIEW_LOADINGJUDGE'),
            ];
            const filterVal = [
              'department',
              'deployment',
              'username',
              'applicationdate',
              'contracttype',
              'contractnumber',
              'entrycondition',
              'entrypayment',
              'currencyposition',
              'claimamount',
              'start',
              'end',
              'theme',
              'extensiondate',
              'custojapanese',
              'custoenglish',
              'custoabbreviation',
              'custochinese',
              'placejapanese',
              'placeenglish',
              'placechinese',
              'responjapanese',
              'responerglish',
              'responphone',
              'responemail',
              'conjapanese',
              'conenglish',
              'conchinese',
              'entrustednumber',
              'deliveryfinshdate',
              'deliverydate',
              'deliverydate',
              'loadingjudge',
            ];

            for (let selItem of selectedlist) {
              let cons = this.alldata2;
              if (this.month) {
                cons = cons.filter(item => moment(item.deliverydate).format('YYYY-MM') == moment(this.month).format('YYYY-MM'));
              }
              if (this.month2) {
                cons = cons.filter(item => moment(item.claimdate).format('YYYY-MM') == moment(this.month2).format('YYYY-MM'));
              }

              cons = cons.filter(item => selItem.contractnumber == item.contractnumber);


              for (let citem of cons) {

                let letContracttype = getDictionaryInfo(citem.entrycondition);
                if (letContracttype != null) {
                  citem.entrycondition = letContracttype.value1;
                }
                if (selItem.extensiondate != null) {
                  selItem.extensiondate = moment(selItem.extensiondate).format('YYYY-MM-DD');
                }
                if (citem.entrypayment != null) {
                  citem.entrypayment = moment(citem.entrypayment).format('YYYY-MM-DD');
                }
                letContracttype = getDictionaryInfo(citem.currencyposition);
                if (letContracttype != null) {
                  citem.currencyposition = letContracttype.value1;
                }
                if (citem.deliverydate != null) {
                  citem.deliverydate = moment(citem.deliverydate).format('YYYY-MM-DD');
                }
                if (selItem.entrypayment != null) {
                  selItem.entrypayment = moment(selItem.entrypayment).format('YYYY-MM-DD');
                }
                if (selItem.entrycondition != null) {
                  let letContracttype = getDictionaryInfo(selItem.entrycondition);
                  if (letContracttype != null) {
                    selItem.entrycondition = letContracttype.value1;
                  }
                }
                if (selItem.currencyposition != null) {
                  let letContracttype = getDictionaryInfo(selItem.currencyposition);
                  if (letContracttype != null) {
                    selItem.currencyposition = letContracttype.value1;
                  }
                }
                let oitem = {};
                Object.assign(oitem, selItem, citem);
                oitem.currencyposition = selItem.currencyposition;
                oitem.extensiondate = selItem.extensiondate;
                output.push(oitem);
              }
            }
            const data = this.formatJson(filterVal, output);
            excel.export_json_to_excel(tHeader, data, '契约一览');
          });

        } else if (val === 'export1') {
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.selectedlist = this.$refs.roletable.selectedList;
          this.contractapplication = [];
          let checktableD = '';
          let error = '';
          for (let i = 0; i < this.selectedlist.length; i++) {
            if (this.selectedlist[i].contractnumber.substring(0, 2) === 'NS' || this.selectedlist[i].contractnumber.substring(0, 2) === 'WS' || this.selectedlist[i].contractnumber.substring(0, 2) === 'WG') {
              error = error + 1;
              this.contractapplication.push({
                contractnumber: this.selectedlist[i].contractnumber,
              });
            } else {
              let sealtypeList = this.selectedlist[i].contractnumber;
              checktableD = checktableD + sealtypeList + ',';
            }
          }
          if (error != 0) {
            if (checktableD != '') {
              let img = checktableD.substring(0, checktableD.length - 1);
              Message({
                message: this.$t('label.PFANS1044VIEW_CHECKERROR') + img,
                type: 'info',
                duration: 2 * 1000,
              });
            }
            this.loading = true;
            this.$store
              .dispatch('PFANS1026Store/getList', this.contractapplication)
              .then(response => {
                this.totalcostvalue = [];
                this.totalcostvalue2 = [];
                this.totalcostvalue3 = [];
                let sum = 0;
                let moneysums = 0;
                let numbers;
                let number = 0;
                for (let m = 0; m < response.length; m++) {
                  number = 0;
                  let contractapplication = response[m].contractapplication;
                  let contractnumbercount = response[m].contractnumbercount;
                  let contractcompound = response[m].contractcompound;
                  if (contractapplication.length > 0) {
                    for (let n = 0; n < contractapplication.length; n++) {
                      if (contractapplication[n].state === this.$t('label.PFANS8008FORMVIEW_EFFECTIVE')) {
                        if (contractapplication[n].contracttype === 'HT008002' || contractapplication[n].contracttype === 'HT008004'
                          || contractapplication[n].contracttype === 'HT008006' || contractapplication[n].contracttype === 'HT008008') {
                          if (contractcompound.length > 0) {
                            if (contractnumbercount.length > 0) {
                              for (let j = 0; j < contractnumbercount.length; j++) {
                                for (let d = 0; d < contractcompound.length; d++) {
                                  if (contractnumbercount[j].claimtype === contractcompound[d].claimtype) {
                                    if (this.month && this.month2) {
                                      if (moment(this.month).format('YYYY-MM') === moment(contractnumbercount[j].deliverydate).format('YYYY-MM') && moment(this.month2).format('YYYY-MM') === moment(contractnumbercount[j].claimdate).format('YYYY-MM')) {
                                        number = number + 1;
                                        numbers = number + '0';
                                        let invoicedat = moment(new Date()).format('YY');
                                        let Invoicedat = moment(new Date()).format('YYYY');
                                        let invoiceDate = moment(new Date()).format('MM');
                                        let invoice = moment(new Date()).format('DD');
                                        contractapplication[n].varto = invoicedat + invoiceDate + '-' + contractapplication[n].contractnumber;
                                        let date = '';
                                        if (invoiceDate == '01') {
                                          date = 'JAN';
                                        } else if (invoiceDate == '02') {
                                          date = 'FEB';
                                        } else if (invoiceDate == '03') {
                                          date = 'MAR';
                                        } else if (invoiceDate == '04') {
                                          date = 'APR';
                                        } else if (invoiceDate == '05') {
                                          date = 'MAY';
                                        } else if (invoiceDate == '06') {
                                          date = 'JUNE';
                                        } else if (invoiceDate == '07') {
                                          date = 'JULY';
                                        } else if (invoiceDate == '08') {
                                          date = 'AUG';
                                        } else if (invoiceDate == '09') {
                                          date = 'SEPT';
                                        } else if (invoiceDate == '10') {
                                          date = 'OCT';
                                        } else if (invoiceDate == '11') {
                                          date = 'NOV';
                                        } else if (invoiceDate == '12') {
                                          date = 'DEC';
                                        }
                                        contractapplication[n].applicationdate = '25' + date + Invoicedat;
                                        contractapplication[n].start = '25' + date + Invoicedat;
                                        if (contractapplication[n].currencyposition != '' && contractapplication[n].currencyposition != null) {
                                          let letContracttype = getDictionaryInfo(contractapplication[n].currencyposition);
                                          if (letContracttype != null) {
                                            contractapplication[n].currencyposition = letContracttype.value3;
                                            contractapplication[n].type = letContracttype.value2;
                                          }
                                        }
                                        if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                          contractapplication[n].careeryear = '0271000000';
                                        } else {
                                          contractapplication[n].careeryear = '0201000000';
                                        }
                                        if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                          if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                            contractapplication[n].claim = '7071000003';
                                          } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                            contractapplication[n].claim = '7071000001';
                                          }
                                        } else {
                                          if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                            contractapplication[n].claim = '7001000003';
                                          } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                            contractapplication[n].claim = '7001000001';
                                          }
                                        }
                                        this.totalcostvalue.push({
                                          varto: contractapplication[n].varto,
                                          claimdate: numbers,
                                          applicationdate: contractapplication[n].applicationdate,
                                          start: contractapplication[n].start,
                                          currencyposition: contractapplication[n].currencyposition,
                                          type: contractapplication[n].type,
                                          theme: 'AutoInvoice',
                                          tenantid: '自动发票',
                                          temaid: '00/00/00',
                                          supportdate: '',
                                          status: '',
                                          businesscode: contractapplication[n].businesscode,
                                          state: '应收',
                                          sidegroup: '',
                                          secondjudge: '',
                                          rowindex: '01',
                                          responphone: '000000',
                                          careeryear: contractapplication[n].careeryear,
                                          responerglish: '00000',
                                          responemail: '确认收入',
                                          remarks: '',
                                          qingremarks: '1',
                                          contractnumber: contractcompound[d].contractrequestamount,
                                          claimamount: contractcompound[d].contractrequestamount,
                                          productnumber: '120001',
                                          claim: contractapplication[n].claim,
                                          placechinese: '00000',
                                          periods: '',
                                          papercontract: '',
                                          pageSize: '',
                                          owners: '',
                                          owner: '',
                                          outputmanager: '',
                                          outnumber: '',
                                        });
                                      }
                                    } else if (this.month) {
                                      if (moment(this.month).format('YYYY-MM') === moment(contractnumbercount[j].deliverydate).format('YYYY-MM')) {
                                        number = number + 1;
                                        numbers = number + '0';
                                        let invoicedat = moment(new Date()).format('YY');
                                        let Invoicedat = moment(new Date()).format('YYYY');
                                        let invoiceDate = moment(new Date()).format('MM');
                                        let invoice = moment(new Date()).format('DD');
                                        contractapplication[n].varto = invoicedat + invoiceDate + '-' + contractapplication[n].contractnumber;
                                        let date = '';
                                        if (invoiceDate == '01') {
                                          date = 'JAN';
                                        } else if (invoiceDate == '02') {
                                          date = 'FEB';
                                        } else if (invoiceDate == '03') {
                                          date = 'MAR';
                                        } else if (invoiceDate == '04') {
                                          date = 'APR';
                                        } else if (invoiceDate == '05') {
                                          date = 'MAY';
                                        } else if (invoiceDate == '06') {
                                          date = 'JUNE';
                                        } else if (invoiceDate == '07') {
                                          date = 'JULY';
                                        } else if (invoiceDate == '08') {
                                          date = 'AUG';
                                        } else if (invoiceDate == '09') {
                                          date = 'SEPT';
                                        } else if (invoiceDate == '10') {
                                          date = 'OCT';
                                        } else if (invoiceDate == '11') {
                                          date = 'NOV';
                                        } else if (invoiceDate == '12') {
                                          date = 'DEC';
                                        }
                                        contractapplication[n].applicationdate = '25' + date + Invoicedat;
                                        contractapplication[n].start = '25' + date + Invoicedat;
                                        if (contractapplication[n].currencyposition != '' && contractapplication[n].currencyposition != null) {
                                          let letContracttype = getDictionaryInfo(contractapplication[n].currencyposition);
                                          if (letContracttype != null) {
                                            contractapplication[n].currencyposition = letContracttype.value3;
                                            contractapplication[n].type = letContracttype.value2;
                                          }
                                        }
                                        if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                          contractapplication[n].careeryear = '0271000000';
                                        } else {
                                          contractapplication[n].careeryear = '0201000000';
                                        }
                                        if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                          if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                            contractapplication[n].claim = '7071000003';
                                          } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                            contractapplication[n].claim = '7071000001';
                                          }
                                        } else {
                                          if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                            contractapplication[n].claim = '7001000003';
                                          } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                            contractapplication[n].claim = '7001000001';
                                          }
                                        }
                                        this.totalcostvalue.push({
                                          varto: contractapplication[n].varto,
                                          claimdate: numbers,
                                          applicationdate: contractapplication[n].applicationdate,
                                          start: contractapplication[n].start,
                                          currencyposition: contractapplication[n].currencyposition,
                                          type: contractapplication[n].type,
                                          theme: 'AutoInvoice',
                                          tenantid: '自动发票',
                                          temaid: '00/00/00',
                                          supportdate: '',
                                          status: '',
                                          businesscode: contractapplication[n].businesscode,
                                          state: '应收',
                                          sidegroup: '',
                                          secondjudge: '',
                                          rowindex: '01',
                                          responphone: '000000',
                                          careeryear: contractapplication[n].careeryear,
                                          responerglish: '00000',
                                          responemail: '确认收入',
                                          remarks: '',
                                          qingremarks: '1',
                                          contractnumber: contractcompound[d].contractrequestamount,
                                          claimamount: contractcompound[d].contractrequestamount,
                                          productnumber: '120001',
                                          claim: contractapplication[n].claim,
                                          placechinese: '00000',
                                          periods: '',
                                          papercontract: '',
                                          pageSize: '',
                                          owners: '',
                                          owner: '',
                                          outputmanager: '',
                                          outnumber: '',
                                        });
                                      }
                                    } else if (this.month2) {
                                      if (moment(this.month2).format('YYYY-MM') === moment(contractnumbercount[j].claimdate).format('YYYY-MM')) {
                                        number = number + 1;
                                        numbers = number + '0';
                                        let invoicedat = moment(new Date()).format('YY');
                                        let Invoicedat = moment(new Date()).format('YYYY');
                                        let invoiceDate = moment(new Date()).format('MM');
                                        let invoice = moment(new Date()).format('DD');
                                        contractapplication[n].varto = invoicedat + invoiceDate + '-' + contractapplication[n].contractnumber;
                                        let date = '';
                                        if (invoiceDate == '01') {
                                          date = 'JAN';
                                        } else if (invoiceDate == '02') {
                                          date = 'FEB';
                                        } else if (invoiceDate == '03') {
                                          date = 'MAR';
                                        } else if (invoiceDate == '04') {
                                          date = 'APR';
                                        } else if (invoiceDate == '05') {
                                          date = 'MAY';
                                        } else if (invoiceDate == '06') {
                                          date = 'JUNE';
                                        } else if (invoiceDate == '07') {
                                          date = 'JULY';
                                        } else if (invoiceDate == '08') {
                                          date = 'AUG';
                                        } else if (invoiceDate == '09') {
                                          date = 'SEPT';
                                        } else if (invoiceDate == '10') {
                                          date = 'OCT';
                                        } else if (invoiceDate == '11') {
                                          date = 'NOV';
                                        } else if (invoiceDate == '12') {
                                          date = 'DEC';
                                        }
                                        contractapplication[n].applicationdate = '25' + date + Invoicedat;
                                        contractapplication[n].start = '25' + date + Invoicedat;
                                        if (contractapplication[n].currencyposition != '' && contractapplication[n].currencyposition != null) {
                                          let letContracttype = getDictionaryInfo(contractapplication[n].currencyposition);
                                          if (letContracttype != null) {
                                            contractapplication[n].currencyposition = letContracttype.value3;
                                            contractapplication[n].type = letContracttype.value2;
                                          }
                                        }
                                        if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                          contractapplication[n].careeryear = '0271000000';
                                        } else {
                                          contractapplication[n].careeryear = '0201000000';
                                        }
                                        if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                          if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                            contractapplication[n].claim = '7071000003';
                                          } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                            contractapplication[n].claim = '7071000001';
                                          }
                                        } else {
                                          if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                            contractapplication[n].claim = '7001000003';
                                          } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                            contractapplication[n].claim = '7001000001';
                                          }
                                        }
                                        this.totalcostvalue.push({
                                          varto: contractapplication[n].varto,
                                          claimdate: numbers,
                                          applicationdate: contractapplication[n].applicationdate,
                                          start: contractapplication[n].start,
                                          currencyposition: contractapplication[n].currencyposition,
                                          type: contractapplication[n].type,
                                          theme: 'AutoInvoice',
                                          tenantid: '自动发票',
                                          temaid: '00/00/00',
                                          supportdate: '',
                                          status: '',
                                          businesscode: contractapplication[n].businesscode,
                                          state: '应收',
                                          sidegroup: '',
                                          secondjudge: '',
                                          rowindex: '01',
                                          responphone: '000000',
                                          careeryear: contractapplication[n].careeryear,
                                          responerglish: '00000',
                                          responemail: '确认收入',
                                          remarks: '',
                                          qingremarks: '1',
                                          contractnumber: contractcompound[d].contractrequestamount,
                                          claimamount: contractcompound[d].contractrequestamount,
                                          productnumber: '120001',
                                          claim: contractapplication[n].claim,
                                          placechinese: '00000',
                                          periods: '',
                                          papercontract: '',
                                          pageSize: '',
                                          owners: '',
                                          owner: '',
                                          outputmanager: '',
                                          outnumber: '',
                                        });
                                      }
                                    } else {
                                      number = number + 1;
                                      numbers = number + '0';
                                      let invoicedat = moment(new Date()).format('YY');
                                      let Invoicedat = moment(new Date()).format('YYYY');
                                      let invoiceDate = moment(new Date()).format('MM');
                                      let invoice = moment(new Date()).format('DD');
                                      contractapplication[n].varto = invoicedat + invoiceDate + '-' + contractapplication[n].contractnumber;
                                      let date = '';
                                      if (invoiceDate == '01') {
                                        date = 'JAN';
                                      } else if (invoiceDate == '02') {
                                        date = 'FEB';
                                      } else if (invoiceDate == '03') {
                                        date = 'MAR';
                                      } else if (invoiceDate == '04') {
                                        date = 'APR';
                                      } else if (invoiceDate == '05') {
                                        date = 'MAY';
                                      } else if (invoiceDate == '06') {
                                        date = 'JUNE';
                                      } else if (invoiceDate == '07') {
                                        date = 'JULY';
                                      } else if (invoiceDate == '08') {
                                        date = 'AUG';
                                      } else if (invoiceDate == '09') {
                                        date = 'SEPT';
                                      } else if (invoiceDate == '10') {
                                        date = 'OCT';
                                      } else if (invoiceDate == '11') {
                                        date = 'NOV';
                                      } else if (invoiceDate == '12') {
                                        date = 'DEC';
                                      }
                                      contractapplication[n].applicationdate = '25' + date + Invoicedat;
                                      contractapplication[n].start = '25' + date + Invoicedat;
                                      if (contractapplication[n].currencyposition != '' && contractapplication[n].currencyposition != null) {
                                        let letContracttype = getDictionaryInfo(contractapplication[n].currencyposition);
                                        if (letContracttype != null) {
                                          contractapplication[n].currencyposition = letContracttype.value3;
                                          contractapplication[n].type = letContracttype.value2;
                                        }
                                      }
                                      if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                        contractapplication[n].careeryear = '0271000000';
                                      } else {
                                        contractapplication[n].careeryear = '0201000000';
                                      }
                                      if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                        if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                          contractapplication[n].claim = '7071000003';
                                        } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                          contractapplication[n].claim = '7071000001';
                                        }
                                      } else {
                                        if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                          contractapplication[n].claim = '7001000003';
                                        } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                          contractapplication[n].claim = '7001000001';
                                        }
                                      }
                                      this.totalcostvalue.push({
                                        varto: contractapplication[n].varto,
                                        claimdate: numbers,
                                        applicationdate: contractapplication[n].applicationdate,
                                        start: contractapplication[n].start,
                                        currencyposition: contractapplication[n].currencyposition,
                                        type: contractapplication[n].type,
                                        theme: 'AutoInvoice',
                                        tenantid: '自动发票',
                                        temaid: '00/00/00',
                                        supportdate: '',
                                        status: '',
                                        businesscode: contractapplication[n].businesscode,
                                        state: '应收',
                                        sidegroup: '',
                                        secondjudge: '',
                                        rowindex: '01',
                                        responphone: '000000',
                                        careeryear: contractapplication[n].careeryear,
                                        responerglish: '00000',
                                        responemail: '确认收入',
                                        remarks: '',
                                        qingremarks: '1',
                                        contractnumber: contractcompound[d].contractrequestamount,
                                        claimamount: contractcompound[d].contractrequestamount,
                                        productnumber: '120001',
                                        claim: contractapplication[n].claim,
                                        placechinese: '00000',
                                        periods: '',
                                        papercontract: '',
                                        pageSize: '',
                                        owners: '',
                                        owner: '',
                                        outputmanager: '',
                                        outnumber: '',
                                      });
                                    }
                                  }
                                }
                              }
                            }
                          }
                        } else {
                          if (contractnumbercount.length > 0) {
                            for (let b = 0; b < contractnumbercount.length; b++) {
                              if (this.month && this.month2) {
                                if (moment(this.month).format('YYYY-MM') === moment(contractnumbercount[b].deliverydate).format('YYYY-MM') && moment(this.month2).format('YYYY-MM') === moment(contractnumbercount[b].claimdate).format('YYYY-MM')) {
                                  let invoicedat = moment(new Date()).format('YY');
                                  let Invoicedat = moment(new Date()).format('YYYY');
                                  let invoiceDate = moment(new Date()).format('MM');
                                  let invoice = moment(new Date()).format('DD');
                                  contractapplication[n].varto = invoicedat + invoiceDate + '-' + contractapplication[n].contractnumber;
                                  let date = '';
                                  if (invoiceDate == '01') {
                                    date = 'JAN';
                                  } else if (invoiceDate == '02') {
                                    date = 'FEB';
                                  } else if (invoiceDate == '03') {
                                    date = 'MAR';
                                  } else if (invoiceDate == '04') {
                                    date = 'APR';
                                  } else if (invoiceDate == '05') {
                                    date = 'MAY';
                                  } else if (invoiceDate == '06') {
                                    date = 'JUNE';
                                  } else if (invoiceDate == '07') {
                                    date = 'JULY';
                                  } else if (invoiceDate == '08') {
                                    date = 'AUG';
                                  } else if (invoiceDate == '09') {
                                    date = 'SEPT';
                                  } else if (invoiceDate == '10') {
                                    date = 'OCT';
                                  } else if (invoiceDate == '11') {
                                    date = 'NOV';
                                  } else if (invoiceDate == '12') {
                                    date = 'DEC';
                                  }
                                  contractapplication[n].applicationdate = '25' + date + Invoicedat;
                                  contractapplication[n].start = '25' + date + Invoicedat;
                                  if (contractapplication[n].currencyposition != '' && contractapplication[n].currencyposition != null) {
                                    let letContracttype = getDictionaryInfo(contractapplication[n].currencyposition);
                                    if (letContracttype != null) {
                                      contractapplication[n].currencyposition = letContracttype.value3;
                                      contractapplication[n].type = letContracttype.value2;
                                    }
                                  }
                                  if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                    contractapplication[n].careeryear = '0271000000';
                                  } else {
                                    contractapplication[n].careeryear = '0201000000';
                                  }
                                  if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                    if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                      contractapplication[n].claim = '7071000003';
                                    } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                      contractapplication[n].claim = '7071000001';
                                    }
                                  } else {
                                    if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                      contractapplication[n].claim = '7001000003';
                                    } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                      contractapplication[n].claim = '7001000001';
                                    }
                                  }
                                  this.totalcostvalue.push({
                                    varto: contractapplication[n].varto,
                                    claimdate: '10',
                                    applicationdate: contractapplication[n].applicationdate,
                                    start: contractapplication[n].start,
                                    currencyposition: contractapplication[n].currencyposition,
                                    type: contractapplication[n].type,
                                    theme: 'AutoInvoice',
                                    tenantid: '自动发票',
                                    temaid: '00/00/00',
                                    supportdate: '',
                                    status: '',
                                    businesscode: contractapplication[n].businesscode,
                                    state: '应收',
                                    sidegroup: '',
                                    secondjudge: '',
                                    rowindex: '01',
                                    responphone: '000000',
                                    careeryear: contractapplication[n].careeryear,
                                    responerglish: '00000',
                                    responemail: '确认收入',
                                    remarks: '',
                                    qingremarks: '1',
                                    contractnumber: contractnumbercount[b].claimamount,
                                    claimamount: contractnumbercount[b].claimamount,
                                    productnumber: '120001',
                                    claim: contractapplication[n].claim,
                                    placechinese: '00000',
                                    periods: '',
                                    papercontract: '',
                                    pageSize: '',
                                    owners: '',
                                    owner: '',
                                    outputmanager: '',
                                    outnumber: '',
                                  });
                                }
                              } else if (this.month) {
                                if (moment(this.month).format('YYYY-MM') === moment(contractnumbercount[b].deliverydate).format('YYYY-MM')) {
                                  let invoicedat = moment(new Date()).format('YY');
                                  let Invoicedat = moment(new Date()).format('YYYY');
                                  let invoiceDate = moment(new Date()).format('MM');
                                  let invoice = moment(new Date()).format('DD');
                                  contractapplication[n].varto = invoicedat + invoiceDate + '-' + contractapplication[n].contractnumber;
                                  let date = '';
                                  if (invoiceDate == '01') {
                                    date = 'JAN';
                                  } else if (invoiceDate == '02') {
                                    date = 'FEB';
                                  } else if (invoiceDate == '03') {
                                    date = 'MAR';
                                  } else if (invoiceDate == '04') {
                                    date = 'APR';
                                  } else if (invoiceDate == '05') {
                                    date = 'MAY';
                                  } else if (invoiceDate == '06') {
                                    date = 'JUNE';
                                  } else if (invoiceDate == '07') {
                                    date = 'JULY';
                                  } else if (invoiceDate == '08') {
                                    date = 'AUG';
                                  } else if (invoiceDate == '09') {
                                    date = 'SEPT';
                                  } else if (invoiceDate == '10') {
                                    date = 'OCT';
                                  } else if (invoiceDate == '11') {
                                    date = 'NOV';
                                  } else if (invoiceDate == '12') {
                                    date = 'DEC';
                                  }
                                  contractapplication[n].applicationdate = '25' + date + Invoicedat;
                                  contractapplication[n].start = '25' + date + Invoicedat;
                                  if (contractapplication[n].currencyposition != '' && contractapplication[n].currencyposition != null) {
                                    let letContracttype = getDictionaryInfo(contractapplication[n].currencyposition);
                                    if (letContracttype != null) {
                                      contractapplication[n].currencyposition = letContracttype.value3;
                                      contractapplication[n].type = letContracttype.value2;
                                    }
                                  }
                                  if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                    contractapplication[n].careeryear = '0271000000';
                                  } else {
                                    contractapplication[n].careeryear = '0201000000';
                                  }
                                  if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                    if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                      contractapplication[n].claim = '7071000003';
                                    } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                      contractapplication[n].claim = '7071000001';
                                    }
                                  } else {
                                    if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                      contractapplication[n].claim = '7001000003';
                                    } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                      contractapplication[n].claim = '7001000001';
                                    }
                                  }
                                  this.totalcostvalue.push({
                                    varto: contractapplication[n].varto,
                                    claimdate: '10',
                                    applicationdate: contractapplication[n].applicationdate,
                                    start: contractapplication[n].start,
                                    currencyposition: contractapplication[n].currencyposition,
                                    type: contractapplication[n].type,
                                    theme: 'AutoInvoice',
                                    tenantid: '自动发票',
                                    temaid: '00/00/00',
                                    supportdate: '',
                                    status: '',
                                    businesscode: contractapplication[n].businesscode,
                                    state: '应收',
                                    sidegroup: '',
                                    secondjudge: '',
                                    rowindex: '01',
                                    responphone: '000000',
                                    careeryear: contractapplication[n].careeryear,
                                    responerglish: '00000',
                                    responemail: '确认收入',
                                    remarks: '',
                                    qingremarks: '1',
                                    contractnumber: contractnumbercount[b].claimamount,
                                    claimamount: contractnumbercount[b].claimamount,
                                    productnumber: '120001',
                                    claim: contractapplication[n].claim,
                                    placechinese: '00000',
                                    periods: '',
                                    papercontract: '',
                                    pageSize: '',
                                    owners: '',
                                    owner: '',
                                    outputmanager: '',
                                    outnumber: '',
                                  });
                                }
                              } else if (this.month2) {
                                if (moment(this.month2).format('YYYY-MM') === moment(contractnumbercount[b].claimdate).format('YYYY-MM')) {
                                  let invoicedat = moment(new Date()).format('YY');
                                  let Invoicedat = moment(new Date()).format('YYYY');
                                  let invoiceDate = moment(new Date()).format('MM');
                                  let invoice = moment(new Date()).format('DD');
                                  contractapplication[n].varto = invoicedat + invoiceDate + '-' + contractapplication[n].contractnumber;
                                  let date = '';
                                  if (invoiceDate == '01') {
                                    date = 'JAN';
                                  } else if (invoiceDate == '02') {
                                    date = 'FEB';
                                  } else if (invoiceDate == '03') {
                                    date = 'MAR';
                                  } else if (invoiceDate == '04') {
                                    date = 'APR';
                                  } else if (invoiceDate == '05') {
                                    date = 'MAY';
                                  } else if (invoiceDate == '06') {
                                    date = 'JUNE';
                                  } else if (invoiceDate == '07') {
                                    date = 'JULY';
                                  } else if (invoiceDate == '08') {
                                    date = 'AUG';
                                  } else if (invoiceDate == '09') {
                                    date = 'SEPT';
                                  } else if (invoiceDate == '10') {
                                    date = 'OCT';
                                  } else if (invoiceDate == '11') {
                                    date = 'NOV';
                                  } else if (invoiceDate == '12') {
                                    date = 'DEC';
                                  }
                                  contractapplication[n].applicationdate = '25' + date + Invoicedat;
                                  contractapplication[n].start = '25' + date + Invoicedat;
                                  if (contractapplication[n].currencyposition != '' && contractapplication[n].currencyposition != null) {
                                    let letContracttype = getDictionaryInfo(contractapplication[n].currencyposition);
                                    if (letContracttype != null) {
                                      contractapplication[n].currencyposition = letContracttype.value3;
                                      contractapplication[n].type = letContracttype.value2;
                                    }
                                  }
                                  if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                    contractapplication[n].careeryear = '0271000000';
                                  } else {
                                    contractapplication[n].careeryear = '0201000000';
                                  }
                                  if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                    if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                      contractapplication[n].claim = '7071000003';
                                    } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                      contractapplication[n].claim = '7071000001';
                                    }
                                  } else {
                                    if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                      contractapplication[n].claim = '7001000003';
                                    } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                      contractapplication[n].claim = '7001000001';
                                    }
                                  }
                                  this.totalcostvalue.push({
                                    varto: contractapplication[n].varto,
                                    claimdate: '10',
                                    applicationdate: contractapplication[n].applicationdate,
                                    start: contractapplication[n].start,
                                    currencyposition: contractapplication[n].currencyposition,
                                    type: contractapplication[n].type,
                                    theme: 'AutoInvoice',
                                    tenantid: '自动发票',
                                    temaid: '00/00/00',
                                    supportdate: '',
                                    status: '',
                                    businesscode: contractapplication[n].businesscode,
                                    state: '应收',
                                    sidegroup: '',
                                    secondjudge: '',
                                    rowindex: '01',
                                    responphone: '000000',
                                    careeryear: contractapplication[n].careeryear,
                                    responerglish: '00000',
                                    responemail: '确认收入',
                                    remarks: '',
                                    qingremarks: '1',
                                    contractnumber: contractnumbercount[b].claimamount,
                                    claimamount: contractnumbercount[b].claimamount,
                                    productnumber: '120001',
                                    claim: contractapplication[n].claim,
                                    placechinese: '00000',
                                    periods: '',
                                    papercontract: '',
                                    pageSize: '',
                                    owners: '',
                                    owner: '',
                                    outputmanager: '',
                                    outnumber: '',
                                  });
                                }
                              } else {
                                let invoicedat = moment(new Date()).format('YY');
                                let Invoicedat = moment(new Date()).format('YYYY');
                                let invoiceDate = moment(new Date()).format('MM');
                                let invoice = moment(new Date()).format('DD');
                                contractapplication[n].varto = invoicedat + invoiceDate + '-' + contractapplication[n].contractnumber;
                                let date = '';
                                if (invoiceDate == '01') {
                                  date = 'JAN';
                                } else if (invoiceDate == '02') {
                                  date = 'FEB';
                                } else if (invoiceDate == '03') {
                                  date = 'MAR';
                                } else if (invoiceDate == '04') {
                                  date = 'APR';
                                } else if (invoiceDate == '05') {
                                  date = 'MAY';
                                } else if (invoiceDate == '06') {
                                  date = 'JUNE';
                                } else if (invoiceDate == '07') {
                                  date = 'JULY';
                                } else if (invoiceDate == '08') {
                                  date = 'AUG';
                                } else if (invoiceDate == '09') {
                                  date = 'SEPT';
                                } else if (invoiceDate == '10') {
                                  date = 'OCT';
                                } else if (invoiceDate == '11') {
                                  date = 'NOV';
                                } else if (invoiceDate == '12') {
                                  date = 'DEC';
                                }
                                contractapplication[n].applicationdate = '25' + date + Invoicedat;
                                contractapplication[n].start = '25' + date + Invoicedat;
                                if (contractapplication[n].currencyposition != '' && contractapplication[n].currencyposition != null) {
                                  let letContracttype = getDictionaryInfo(contractapplication[n].currencyposition);
                                  if (letContracttype != null) {
                                    contractapplication[n].currencyposition = letContracttype.value3;
                                    contractapplication[n].type = letContracttype.value2;
                                  }
                                }
                                if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                  contractapplication[n].careeryear = '0271000000';
                                } else {
                                  contractapplication[n].careeryear = '0201000000';
                                }
                                if (contractapplication[n].businesscode.substring(0, 3) === '000') {
                                  if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                    contractapplication[n].claim = '7071000003';
                                  } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                    contractapplication[n].claim = '7071000001';
                                  }
                                } else {
                                  if (contractapplication[n].contractnumber.substring(0, 2) === 'WS' || contractapplication[n].contractnumber.substring(0, 2) === 'WG') {
                                    contractapplication[n].claim = '7001000003';
                                  } else if (contractapplication[n].contractnumber.substring(0, 2) === 'NS') {
                                    contractapplication[n].claim = '7001000001';
                                  }
                                }
                                this.totalcostvalue.push({
                                  varto: contractapplication[n].varto,
                                  claimdate: '10',
                                  applicationdate: contractapplication[n].applicationdate,
                                  start: contractapplication[n].start,
                                  currencyposition: contractapplication[n].currencyposition,
                                  type: contractapplication[n].type,
                                  theme: 'AutoInvoice',
                                  tenantid: '自动发票',
                                  temaid: '00/00/00',
                                  supportdate: '',
                                  status: '',
                                  businesscode: contractapplication[n].businesscode,
                                  state: '应收',
                                  sidegroup: '',
                                  secondjudge: '',
                                  rowindex: '01',
                                  responphone: '000000',
                                  careeryear: contractapplication[n].careeryear,
                                  responerglish: '00000',
                                  responemail: '确认收入',
                                  remarks: '',
                                  qingremarks: '1',
                                  contractnumber: contractnumbercount[b].claimamount,
                                  claimamount: contractnumbercount[b].claimamount,
                                  productnumber: '120001',
                                  claim: contractapplication[n].claim,
                                  placechinese: '00000',
                                  periods: '',
                                  papercontract: '',
                                  pageSize: '',
                                  owners: '',
                                  owner: '',
                                  outputmanager: '',
                                  outnumber: '',
                                });
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                for (let e = 0; e < this.totalcostvalue.length; e++) {
                  sum = sum + 1;
                  moneysums += parseFloat(this.totalcostvalue[e].claimamount);
                }
                this.totalcostvalue2.push({
                  varto: 'LAST',
                  claimdate: '9999',
                  applicationdate: '',
                  start: '',
                  currencyposition: '',
                  type: '',
                  theme: '',
                  tenantid: '',
                  temaid: '',
                  supportdate: '',
                  status: '',
                  businesscode: '',
                  state: '',
                  sidegroup: '',
                  secondjudge: '',
                  rowindex: '',
                  responphone: '',
                  careeryear: '',
                  responerglish: '',
                  responemail: '',
                  remarks: '',
                  qingremarks: sum + 1,
                  contractnumber: '',
                  claimamount: moneysums.toFixed(2),
                  productnumber: '',
                  claim: '',
                  placechinese: '',
                  periods: '',
                  papercontract: '',
                  pageSize: '',
                  owners: '',
                  owner: '',
                  outputmanager: '',
                  outnumber: '',
                });
                this.totalcostvalue3 = this.totalcostvalue.concat(this.totalcostvalue2);
                let heads = [
                  this.$t('label.PFANS1044VIEW_NUMBER')
                  , this.$t('label.PFANS1044VIEW_NUMBERS'), this.$t('label.PFANS1044VIEW_DATA'), this.$t('label.PFANS1044VIEW_DATE'), this.$t('label.PFANS1002VIEW_CURRENCY'), this.$t('label.PFANS1030FORMVIEW_EXCHANGERATE'), this.$t('label.PFANS1044VIEW_LAIYUAN'), this.$t('label.PFANS1044VIEW_SWCLLX'), this.$t('label.PFANS1044VIEW_MONEYF')
                  , this.$t('label.PFANS1044VIEW_XXDB'), this.$t('label.PFANS1044VIEW_VAT'), this.$t('label.PFANS1044VIEW_NUMBERSKF'), this.$t('label.PFANS1044VIEW_SDFDD'), this.$t('label.PFANS1044VIEW_SHFKHNUMBER')
                  , this.$t('label.PFANS1044VIEW_WHERE'), this.$t('label.PFANS1044VIEW_YSNUMBERS'), this.$t('label.PFANS1044VIEW_YSBMD')
                  , this.$t('label.PFANS1044VIEW_YSKM'), this.$t('label.PFANS1044VIEW_YSCPD'), this.$t('label.PFANS1044VIEW_SMNUMBER'), this.$t('label.PFANS1044VIEW_JLDW')
                  , this.$t('label.PFANS3005VIEW_QUANTITY'), this.$t('label.PFANS3005VIEW_UNITPRICE'), this.$t('label.PFANS1044VIEW_HMONEYS'), this.$t('label.PFANS1044VIEW_SRBMD'), this.$t('label.PFANS1044VIEW_SRKM')
                  , this.$t('label.PFANS1044VIEW_SRCPD'), this.$t('label.PFANS1044VIEW_SM'), this.$t('label.PFANS1044VIEW_SMONEYS'), this.$t('label.PFANS1044VIEW_SHKMBMD'), this.$t('label.PFANS1044VIEW_SKMCHECK')
                  , this.$t('label.PFANS1044VIEW_SCPD'), this.$t('label.PFANS1044VIEW_PODH'), this.$t('label.PFANS1044VIEW_CMSHS')];
                let csvData = [];
                for (let i = 0; i < this.totalcostvalue3.length; i++) {
                  let obj = this.totalcostvalue3[i];
                  csvData.push({
                    [heads[0]]: obj.varto,
                    [heads[1]]: obj.claimdate,
                    [heads[2]]: obj.applicationdate,
                    [heads[3]]: obj.start,
                    [heads[4]]: obj.currencyposition,
                    [heads[5]]: obj.type,
                    [heads[6]]: obj.theme,
                    [heads[7]]: obj.tenantid,
                    [heads[8]]: obj.temaid,
                    [heads[9]]: obj.supportdate,
                    [heads[10]]: obj.status,
                    [heads[11]]: obj.businesscode,
                    [heads[12]]: obj.state,
                    [heads[13]]: obj.sidegroup,
                    [heads[14]]: obj.secondjudge,
                    [heads[15]]: obj.rowindex,
                    [heads[16]]: obj.responphone,
                    [heads[17]]: obj.careeryear,
                    [heads[18]]: obj.responerglish,
                    [heads[19]]: obj.responemail,
                    [heads[20]]: obj.remarks,
                    [heads[21]]: obj.qingremarks,
                    [heads[22]]: obj.contractnumber,
                    [heads[23]]: obj.claimamount,
                    [heads[24]]: obj.productnumber,
                    [heads[25]]: obj.claim,
                    [heads[26]]: obj.placechinese,
                    [heads[27]]: obj.periods,
                    [heads[28]]: obj.papercontract,
                    [heads[29]]: obj.pageSize,
                    [heads[30]]: obj.owners,
                    [heads[31]]: obj.owner,
                    [heads[32]]: obj.outputmanager,
                    [heads[33]]: obj.outnumber,
                  });
                }
                let filterVal = ['varto', '', 'applicationdate', 'start', 'currencyposition', 'type', 'theme', 'tenantid', 'temaid',
                  'supportdate', 'status', 'businesscode', 'state', 'sidegroup', 'secondjudge'
                  , 'rowindex', 'responphone', 'careeryear', 'responerglish', 'responemail', 'remarks', 'qingremarks', '', '', 'productnumber'
                  , 'claim', 'placechinese', 'periods', 'papercontract', 'pageSize', 'owners', 'owner', 'outputmanager', 'outnumber'];
                const parser = new Parser({header: false});
                const result = parser.parse(csvData);
                let aaa = result;
                let csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + aaa;
                const link = document.createElement('a');
                link.href = csvContent;
                link.download = this.$t('AR') + this.$t('label.PFANS5001FORMVIEW_CONTRACT') + '.csv';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                this.loading = false;
              });
          } else {
            let img = checktableD.substring(0, checktableD.length - 1);
            Message({
              message: this.$t('label.PFANS1044VIEW_CHECKERROR') + img,
              type: 'info',
              duration: 2 * 1000,
            });
          }
        }
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
      changed() {
        this.$refs.roletable.$refs.eltable.clearSelection();
        let cons = this.alldata2;
        if (this.month) {
          cons = cons.filter(item => moment(item.deliverydate).format('YYYY-MM') == moment(this.month).format('YYYY-MM'));
        }
        if (this.month2) {
          cons = cons.filter(item => moment(item.claimdate).format('YYYY-MM') == moment(this.month2).format('YYYY-MM'));
        }

        let filters = new Set();
        for (let al2 of cons) {
          filters.add(al2);
        }
        let filtersrst = [...new Set(filters)];
        var hash = {};
        filtersrst = filtersrst.reduce(function(item, next) {
          if (hash[next.contractnumber]) {
            '';
          } else {
            hash[next.contractnumber] = true && item.push(next);
          }
          return item;
        }, []);
        let rst = [];
        for (let al2 of filtersrst) {
          let a = this.alldata.filter(item => item.type == this.contractType && al2.contractnumber == item.contractnumber);

          if (this.month3) {
            a = a.filter(item => moment(item.start).format('YYYY-MM') == moment(this.month3).format('YYYY-MM'));
          }
          if (this.month4) {
            a = a.filter(item => moment(item.end).format('YYYY-MM') == moment(this.month4).format('YYYY-MM'));
          }
          let prices = cons.filter(item => al2.contractnumber == item.contractnumber);
          let price = 0;
          for (let pi of prices) {
            price = price + Number(pi.claimamount);
          }
          if (a.length > 0) {
            a[0].price = this.abs(price * 100);
            rst.push(a[0]);
          }
        }
        //add-ws-No.29-合同检索一览表中追加纳品日期
        if (rst[0].type === '0') {
          let listnumber = [];
          for (let list of rst) {
            listnumber = this.alldata2.filter(item => item.contractnumber == list.contractnumber);
            for (let d = 0; d < listnumber.length; d++) {
              if (listnumber[d].claimtype === this.$t('label.PFANS1026FORMVIEW_D') + 1 + this.$t('label.PFANS1026FORMVIEW_H')) {
                if (listnumber[d].deliverydate != null) {
                  list.decide = moment(listnumber[d].deliverydate).format('YYYY-MM-DD');
                }
              }
              if (listnumber[d].claimtype === this.$t('label.PFANS1026FORMVIEW_D') + 2 + this.$t('label.PFANS1026FORMVIEW_H')) {
                if (listnumber[d].deliverydate != null) {
                  list.decisionnumber = moment(listnumber[d].deliverydate).format('YYYY-MM-DD');
                }
              }
              if (listnumber[d].claimtype === this.$t('label.PFANS1026FORMVIEW_D') + 3 + this.$t('label.PFANS1026FORMVIEW_H')) {
                if (listnumber[d].deliverydate != null) {
                  list.delivery = moment(listnumber[d].deliverydate).format('YYYY-MM-DD');
                }
              }
              if (listnumber[d].claimtype === this.$t('label.PFANS1026FORMVIEW_D') + 4 + this.$t('label.PFANS1026FORMVIEW_H')) {
                if (listnumber[d].deliverydate != null) {
                  list.deliverycondition = moment(listnumber[d].deliverydate).format('YYYY-MM-DD');
                }
              }
              if (listnumber[d].claimtype === this.$t('label.PFANS1026FORMVIEW_D') + 5 + this.$t('label.PFANS1026FORMVIEW_H')) {
                if (listnumber[d].deliverydate != null) {
                  list.deliverydate = moment(listnumber[d].deliverydate).format('YYYY-MM-DD');
                }
              }
              if (listnumber[d].claimtype === this.$t('label.PFANS1026FORMVIEW_D') + 6 + this.$t('label.PFANS1026FORMVIEW_H')) {
                if (listnumber[d].deliverydate != null) {
                  list.deliveryfinshdate = moment(listnumber[d].deliverydate).format('YYYY-MM-DD');
                }
              }
            }
          }
          this.data = rst;
          this.showTable = 2;
        } else {
          this.data = rst;
          this.showTable = 1;
        }
        //add-ws-No.29-合同检索一览表中追加纳品日期
      },
      abs(val) {
        var str = (val / 100).toFixed(2) + '';
        var intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
        var dot = str.substring(str.length, str.indexOf('.'));//取到小数部分搜索
        var ret = intSum + dot;
        return ret;
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
