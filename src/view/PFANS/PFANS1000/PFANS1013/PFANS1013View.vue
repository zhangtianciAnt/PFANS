<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row_id"
    :showSelection="isShow"
    :title="title"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    ref="roletable"
    v-loading="loading"
  >
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable'
  import {Message} from 'element-ui'
  import {getDictionaryInfo, getStatus, getUserInfo} from '@/utils/customize'
  import moment from "moment";

  const {Parser} = require('json2csv');

  export default {
    name: "PFANS1013View",
    components: {
      moment,
      EasyNormalTable
    },
    data() {
      return {
        travelcostvalue: [],
        startoption: [],
        selectedlist: [],
        selectedList: [],
        isShow: true,
        loading: false,
        title: "title.PFANS1013VIEW",
        data: [],
        columns: [
          {
            code: 'applicant',
            label: 'label.applicant',
            width: 100,
            fix: false,
            filter: true
          },
          {
            code: 'centername',
            label: 'label.center',
            width: 130,
            fix: false,
            filter: true
          },
          {
            code: 'groupname',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true
          },
          {
            code: 'teamname',
            label: 'label.team',
            width: 130,
            fix: false,
            filter: true
          },
          {
            code: 'budgetunit',
            label: 'label.budgetunit',
            width: 130,
            fix: false,
            filter: true
          },
          {
            code: 'telephone',
            label: 'label.PFANS1013VIEW_TELEPHONE',
            width: 90,
            fix: false,
            filter: true
          },
          {
            code: 'startdate',
            label: 'label.PFANS1013VIEW_STARTDATE',
            width: 150,
            fix: false,
            filter: true

          },
          {
            code: 'enddate',
            label: 'label.PFANS1013VIEW_ENDDATE',
            width: 150,
            fix: false,
            filter: true

          },
          {
            code: 'balance',
            label: 'label.PFANS1013VIEW_BALANCE',
            width: 100,
            fix: false,
            filter: true
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true
          }
        ],
        buttonList: [
          {
            key: 'view',
            name: 'button.view',
            disabled: false,
            icon: 'el-icon-view'
          },
          {
            key: 'insert',
            name: 'button.insert',
            disabled: false,
            icon: 'el-icon-plus'
          },
          {
            key: 'update',
            name: 'button.update',
            disabled: false,
            icon: 'el-icon-edit'
          },
          {
            key: 'export',
            name: 'button.export',
            disabled: false,
            icon: 'el-icon-upload2'
          }
        ],
        rowid: '',
        row_id: 'evectionid'
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1013Store/get')
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            let user = getUserInfo(response[j].userid);
            if (user) {
              response[j].applicant = user.userinfo.customername;
            }
            response[j].centername = response[j].centerid;
            response[j].groupname = response[j].groupid;
            response[j].teamname = response[j].teamid;
            if (response[j].budgetunit !== null && response[j].budgetunit !== "") {
              let letBudgetunit = getDictionaryInfo(response[j].budgetunit);
              if (letBudgetunit != null) {
                response[j].budgetunit = letBudgetunit.value1;
              }
            }
            if (response[j].startdate !== null && response[j].startdate !== "") {
              response[j].startdate = moment(response[j].startdate).format("YYYY-MM-DD");
            }
            if (response[j].status !== null && response[j].status !== "") {
              response[j].status = getStatus(response[j].status);
            }
            if (response[j].enddate !== null && response[j].enddate !== "") {
              response[j].enddate = moment(response[j].enddate).format("YYYY-MM-DD");
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
          this.loading = false;
        })
    },
    methods: {
      rowClick(row) {
        this.rowid = row.evectionid;
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
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1013FormView',
            params: {
              _id: this.rowid,
              disabled: true,
              method: "update"
            }
          })
        } else if (val === 'insert') {
          this.$router.push({
            name: 'PFANS1013FormView',
            params: {
              _id: '',
              disabled: true
            }
          })
        } else if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1013FormView',
            params: {
              _id: this.rowid,
              disabled: false,
              method: "view"
            }
          })
        } else if (val === 'export') {
          this.selectedList = {};
          this.selectedList.travelcost = [];
          this.selectedlist = this.$refs.roletable.selectedList;
          for (let i = 0; i < this.selectedlist.length; i++) {
            this.selectedList.travelcost.push({
              evectionid: this.selectedlist[i].evectionid
            })
          }
          this.loading = true;
          this.$store
            .dispatch('PFANS1013Store/gettravelcostvo', this.selectedList)
            .then(response => {
              this.selectedlist = this.$refs.roletable.selectedList;
              let sum = 0;
              let invoiceamountvalue = 0;
              for (let m = 0; m < response.length; m++) {
                sum = sum + 1;
                for (let i = 0; i < this.selectedlist.length; i++) {
                  if (response[m].evectionid == this.selectedlist[i].evectionid) {
                    let letErrortype = getDictionaryInfo(this.selectedlist[i].paymentmethod);
                    if (letErrortype != null) {
                      this.selectedlist[i].paymentmethod = letErrortype.value1;
                      if (this.selectedlist[i].paymentmethod === this.$t("label.PFANS1012VIEW_ONLINEPAYMENT") || this.selectedlist[i].paymentmethod === this.$t("label.PFANS1012VIEW_TRANSFERCHECK")) {
                        this.selectedlist[i].paymentmethod = this.$t("label.PFANS1012VIEW_COST")
                      } else if (this.selectedlist[i].paymentmethod === this.$t("label.PFANS1012VIEW_PPAYMENT")) {
                        this.selectedlist[i].paymentmethod = this.$t("label.PFANS1012VIEW_OFFICE")
                      } else if (this.selectedlist[i].paymentmethod === '') {
                        this.selectedlist[i].paymentmethod = ''
                      }
                    }
                    let letError = getDictionaryInfo(this.selectedlist[i].currency);
                    if (letError.value1 == this.$t("label.PFANS1012VIEW_USD")) {
                      this.selectedlist[i].currencyrate = letError.value1;
                      response[m].currency = this.$t("label.PFANS1012FORMVIEW_USDA");
                    } else if (letError.value1 == null) {
                      this.selectedlist[i].currencyrate = '';
                      response[m].currency = this.$t("label.PFANS1012FORMVIEW_CNY");
                    }
                    if (response[m].invoicedate !== null && response[m].invoicedate !== "") {
                      let date;
                      let invoiceDate = moment(response[m].invoicedate).format("MM");
                      if (invoiceDate == '01') {
                        date = 'Jan'
                      } else if (invoiceDate == '02') {
                        date = 'Feb'
                      } else if (invoiceDate == '03') {
                        date = 'Mar'
                      } else if (invoiceDate == '04') {
                        date = 'Apr'
                      } else if (invoiceDate == '05') {
                        date = 'May'
                      } else if (invoiceDate == '06') {
                        date = 'June'
                      } else if (invoiceDate == '07') {
                        date = 'July'
                      } else if (invoiceDate == '08') {
                        date = 'Aug'
                      } else if (invoiceDate == '09') {
                        date = 'Sept'
                      } else if (invoiceDate == '10') {
                        date = 'Oct'
                      } else if (invoiceDate == '11') {
                        date = 'Nov'
                      } else if (invoiceDate == '12') {
                        date = 'Dec'
                      }
                      let invoiceDat = moment(response[m].invoicedate).format("DD");
                      let invoicedat = moment(response[m].invoicedate).format("YYYY");
                      response[m].invoicedate = invoiceDat + date + invoicedat;
                    }
                    if (response[m].conditiondate !== null && response[m].conditiondate !== "") {
                      let Date;
                      let conditionDate = moment(response[m].conditiondate).format("MM");
                      if (conditionDate == '01') {
                        Date = 'Jan'
                      } else if (conditionDate == '02') {
                        Date = 'Feb'
                      } else if (conditionDate == '03') {
                        Date = 'Mar'
                      } else if (conditionDate == '04') {
                        Date = 'Apr'
                      } else if (conditionDate == '05') {
                        Date = 'May'
                      } else if (conditionDate == '06') {
                        Date = 'June'
                      } else if (conditionDate == '07') {
                        Date = 'July'
                      } else if (conditionDate == '08') {
                        Date = 'Aug'
                      } else if (conditionDate == '09') {
                        Date = 'Sept'
                      } else if (conditionDate == '10') {
                        Date = 'Oct'
                      } else if (conditionDate == '11') {
                        Date = 'Nov'
                      } else if (conditionDate == '12') {
                        Date = 'Dec'
                      }
                      let conditionDat = moment(response[m].invoicedate).format("DD");
                      let conditiondat = moment(response[m].invoicedate).format("YYYY");
                      response[m].conditiondate = conditionDat + Date + conditiondat;
                    }
                    invoiceamountvalue += parseFloat(response[m].lineamount);
                    this.travelcostvalue.push({
                      invoicenumber: response[m].invoicenumber,
                      number: response[m].number,
                      invoicetype: 'STANDARD',
                      rowtype: 'ITEM',
                      invoicedate: response[m].invoicedate,
                      conditiondate: response[m].conditiondate,
                      vendorcode: response[m].vendorcode,
                      paymentmethod: this.selectedlist[i].paymentmethod,
                      currency: response[m].currency,
                      invoiceamount: response[m].invoiceamount,
                      lineamount: response[m].lineamount,
                      currencyrate: this.selectedlist[i].currencyrate,
                      companysegment: '01',
                      budgetcoding: response[m].budgetcoding,
                      subjectnumber: response[m].subjectnumber,
                      productsegment: '00000',
                      vatnumber: '',
                      taxCode: '0%',
                      paymentterms: '00/00/00',
                      remarks: response[m].remarks,
                      source: 'OPEN_IF',
                      paymentmethods: 'WIRE',
                      type: ',',
                    })
                  }
                }
              }
              this.startoption.push({
                invoicenumber: 'LAST',
                number: '9999',
                invoicetype: '',
                rowtype: '',
                invoicedate: '',
                conditiondate: '',
                vendorcode: '',
                paymentmethod: '',
                currency: '',
                invoiceamount: sum,
                lineamount: invoiceamountvalue,
                currencyrate: '',
                companysegment: '',
                budgetcoding: '',
                subjectnumber: '',
                productsegment: '',
                vatnumber: '',
                taxCode: '',
                paymentterms: '',
                remarks: '',
                source: '',
                paymentmethods: '',
                type: '',
              });
              debugger;
              this.startoptionvalue = this.travelcostvalue.concat(this.startoption);
              console.log("this.startoptionvalue", this.startoptionvalue);
              let csvData = [];
              for (let i = 0; i < this.startoptionvalue.length; i++) {
                let obj = this.startoptionvalue[i];
                csvData.push({
                  invoicenumber: obj.invoicenumber,
                  number: obj.number,
                  invoicetype: obj.invoicetype,
                  rowtype: obj.rowtype,
                  invoicedate: obj.invoicedate,
                  conditiondate: obj.conditiondate,
                  vendorcode: obj.vendorcode,
                  paymentmethod: obj.paymentmethod,
                  currency: obj.currency,
                  invoiceamount: obj.invoiceamount,
                  lineamount: obj.lineamount,
                  currencyrate: obj.currencyrate,
                  companysegment: obj.companysegment,
                  budgetcoding: obj.budgetcoding,
                  subjectnumber: obj.subjectnumber,
                  productsegment: obj.productsegment,
                  vatnumber: obj.vatnumber,
                  taxCode: obj.taxCode,
                  paymentterms: obj.paymentterms,
                  remarks: obj.remarks,
                  source: obj.source,
                  paymentmethods: obj.paymentmethods,
                  type: obj.type,
                })
              }
              let filterVal = ['invoicenumber', 'number', 'invoicetype', 'rowtype', 'invoicedate', 'conditiondate', 'vendorcode', 'paymentmethod', 'currency',
                'invoiceamount', 'lineamount', 'currencyrate', 'companysegment', 'budgetcoding', 'subjectnumber',
                , 'productsegment', 'vatnumber', 'taxCode', 'paymentterms', 'remarks', 'source', 'paymentmethods', 'type'];
              const parser = new Parser({header: false});
              const result = parser.parse(csvData);

              let resultflg = result;
              let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + resultflg;
              const link = document.createElement("a");
              link.href = csvContent;
              link.download = this.$t('AP') + this.$t('title.PFANS1013VIEW') + '.csv';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              this.loading = false;
            })
            .catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000
              });
              this.loading = false;
            })
        }
      },
    }
  }
</script>

<style scoped>

</style>


