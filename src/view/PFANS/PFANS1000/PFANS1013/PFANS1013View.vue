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
    :selectable="selectInit"
    ref="roletable"
    v-loading="loading"
  >
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getDictionaryInfo, getOrgInfoByUserId, getStatus, getUserInfo} from '@/utils/customize';
  import moment from 'moment';

  const {Parser} = require('json2csv');

  export default {
    name: 'PFANS1013View',
    components: {
      moment,
      EasyNormalTable,
    },
    data() {
      return {
        travelcostvalue: [],
        startoption: [],
        selectedlist: [],
        selectedList: [],
        isShow: true,
        loading: false,
        title: 'title.PFANS1013VIEW',
        data: [],
        columns: [
          {
            code: 'applicant',
            label: 'label.applicant',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'centername',
            label: 'label.center',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'groupname',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'teamname',
            label: 'label.team',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'type',
            label: 'label.PFANS1013VIEW_TYPE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'invoiceno',
            label: 'label.PFANS1013VIEW_REIMNUMBER',
            width: 130,
            fix: false,
            filter: true,
          },
          //add-ws-5/11-支出总额添加
          {
            code: 'totalpay',
            label: 'label.PFANS1013VIEW_TOTALPAY',
            width: 130,
            fix: false,
            filter: true,
          },
          //add-ws-5/11-支出总额添加
          {
            code: 'startdate',
            label: 'label.PFANS1013VIEW_STARTDATE',
            width: 150,
            fix: false,
            filter: true,

          },
          {
            code: 'enddate',
            label: 'label.PFANS1013VIEW_ENDDATE',
            width: 150,
            fix: false,
            filter: true,

          },
          // {
          //   code: 'balance',
          //   label: 'label.PFANS1013VIEW_BALANCE',
          //   width: 100,
          //   fix: false,
          //   filter: true
          // },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'modifyon',
            label: 'label.PFANS1030FORMVIEW_TIEEEND',
            width: 150,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {
            key: 'view',
            name: 'button.view',
            disabled: false,
            icon: 'el-icon-view',
          },
          {
            key: 'insert',
            name: 'button.insert',
            disabled: false,
            icon: 'el-icon-plus',
          },
          {
            key: 'update',
            name: 'button.update',
            disabled: false,
            icon: 'el-icon-edit',
          },
          {
            'key': 'export',
            'name': 'label.PFANS1012VIEW_EXPORTCSV',
            'disabled': false,
            icon: 'el-icon-upload2',
          },
          {
            'key': 'export1',
            'name': 'button.printing',
            'disabled': false,
            icon: 'el-icon-upload2',
          },
        ],
        rowid: '',
        row_id: 'evectionid',
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
            let nameflg = getOrgInfoByUserId(response[j].userid);
            if (nameflg) {
              response[j].centername = nameflg.centerNmae;
              response[j].groupname = nameflg.groupNmae;
              response[j].teamname = nameflg.teamNmae;
            }
            // response[j].centername = response[j].centerid;
            // response[j].groupname = response[j].groupid;
            // response[j].teamname = response[j].teamid;
            // if (response[j].budgetunit !== null && response[j].budgetunit !== "") {
            //   let letBudgetunit = getDictionaryInfo(response[j].budgetunit);
            //   if (letBudgetunit != null) {
            //     response[j].budgetunit = letBudgetunit.value1;
            //   }
            // }
            if (response[j].type !== null && response[j].type !== '') {
              if (response[j].type === '0') {
                if (this.$i18n) {

                  response[j].type = this.$t('label.PFANS1013VIEW_TYPEON');
                }
              } else if (response[j].type === '1') {
                if (this.$i18n) {

                  response[j].type = this.$t('label.PFANS1013VIEW_TYPEOFF');
                }
              }
            }
            if (response[j].startdate !== null && response[j].startdate !== '') {
              response[j].startdate = moment(response[j].startdate).format('YYYY-MM-DD');
            }
            if (response[j].status != '0') {
              if (response[j].modifyon !== null && response[j].modifyon !== '') {
                response[j].modifyon = moment(response[j].modifyon).format('YYYY-MM-DD');
              }
            } else {
              response[j].modifyon = null;
            }
            if (response[j].status !== null && response[j].status !== '') {
              response[j].status = getStatus(response[j].status);
            }
            if (response[j].enddate !== null && response[j].enddate !== '') {
              response[j].enddate = moment(response[j].enddate).format('YYYY-MM-DD');
            }
          }
          this.data = response;
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
    methods: {
      //ADD_FJL
      selectInit(row, index) {
        if (this.$i18n) {
          return row.status === this.$t('label.PFANS5004VIEW_OVERTIME');
        }
      },
      //ADD_FJL
      rowClick(row) {
        this.rowid = row.evectionid;
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
      export1(val) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1013Store/exportjs', {evectionid: this.$refs.roletable.selectedList[val].evectionid})
          .then(response => {
            this.loading = false;
            if (val < this.$refs.roletable.selectedList.length - 1) {
              val = val + 1;
              this.export1(val);
            }
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
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1013FormView',
            params: {
              _id: this.rowid,
              disabled: true,
              method: 'update',
            },
          });
        } else if (val === 'insert') {
          this.$router.push({
            name: 'PFANS1013FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        } else if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1013FormView',
            params: {
              _id: this.rowid,
              disabled: false,
              method: 'view',
            },
          });
        } else if (val === 'export') {
          this.startoptionvalue = [];
          this.travelcostvalue = [];
          this.startoption = [];
          this.selectedList = {};
          this.selectedList.travelcost = [];
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          //DEL_FJL
          // else if (this.$refs.roletable.selectedList.length > 0) {
          //   for (let i = 0; i < this.$refs.roletable.selectedList.length; i++) {
          //     if (this.$refs.roletable.selectedList[i].status !== this.$t('label.PFANS5004VIEW_OVERTIME')) {
          //       Message({
          //         message: this.$t('label.PFANS1013VIEW_EXPORTERRINFO'),
          //         type: 'error',
          //         duration: 2 * 1000,
          //       });
          //       return;
          //     }
          //   }
          // }
          //DEL_FJL
          this.selectedlist = this.$refs.roletable.selectedList;
          for (let i = 0; i < this.selectedlist.length; i++) {
            this.selectedList.travelcost.push({
              evectionid: this.selectedlist[i].evectionid,
            });
          }
          this.loading = true;
          this.$store
            .dispatch('PFANS1013Store/gettravelcostvo', this.selectedList)
            .then(response => {
              this.selectedlist = this.$refs.roletable.selectedList;
              let sum = 0;
              let invoiceamountvalue = 0;
              for (let z = 0; z < response.length; z++) {
                invoiceamountvalue += parseFloat(response[z].lineamount);
              }
              for (let m = 0; m < response.length; m++) {
                sum = sum + 1;
                for (let i = 0; i < this.selectedlist.length; i++) {
                  if (response[m].evectionid == this.selectedlist[i].evectionid) {
                    if (response[m].invoicedate !== null && response[m].invoicedate !== '') {
                      let date;
                      let invoiceDate = moment(response[m].invoicedate).format('MM');
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
                      let invoiceDat = moment(response[m].invoicedate).format('DD');
                      let invoicedat = moment(response[m].invoicedate).format('YYYY');
                      response[m].invoicedate = invoiceDat + date + invoicedat;
                    }
                    if (response[m].conditiondate !== null && response[m].conditiondate !== '') {
                      let Date;
                      let conditionDate = moment(response[m].conditiondate).format('MM');
                      if (conditionDate == '01') {
                        Date = 'JAN';
                      } else if (conditionDate == '02') {
                        Date = 'FEB';
                      } else if (conditionDate == '03') {
                        Date = 'MAR';
                      } else if (conditionDate == '04') {
                        Date = 'APR';
                      } else if (conditionDate == '05') {
                        Date = 'MAY';
                      } else if (conditionDate == '06') {
                        Date = 'JUNE';
                      } else if (conditionDate == '07') {
                        Date = 'JULY';
                      } else if (conditionDate == '08') {
                        Date = 'AUG';
                      } else if (conditionDate == '09') {
                        Date = 'SEPT';
                      } else if (conditionDate == '10') {
                        Date = 'OCT';
                      } else if (conditionDate == '11') {
                        Date = 'NOV';
                      } else if (conditionDate == '12') {
                        Date = 'DEC';
                      }
                      let conditionDat = moment(response[m].invoicedate).format('DD');
                      let conditiondat = moment(response[m].invoicedate).format('YYYY');
                      response[m].conditiondate = conditionDat + Date + conditiondat;
                    }
                    if (response[m].subjectnumber != '' && response[m].subjectnumber != null) {
                      response[m].subjectnumber = response[m].subjectnumber.replace('-0', '0');
                      response[m].subjectnumber = response[m].subjectnumber.replace('0-', '0');
                    }
                    if (response[m].budgetcoding != '' && response[m].budgetcoding != null) {
                      let letbudge = getDictionaryInfo(response[m].budgetcoding);
                      if (letbudge) {
                        response[m].budgetcoding = letbudge.value2;
                      }
                    }
                    this.travelcostvalue.push({
                      invoicenumber: response[m].invoicenumber,
                      number: response[m].number,
                      invoicetype: 'STANDARD',
                      rowtype: 'ITEM',
                      invoicedate: response[m].invoicedate,
                      conditiondate: response[m].conditiondate,
                      vendorcode: response[m].vendorcode,
                      paymentmethod: this.$t('label.PFANS1012VIEW_OFFICE'),
                      currency: response[m].currency,
                      invoiceamount: invoiceamountvalue.toFixed(2),
                      lineamount: parseFloat(response[m].lineamount).toFixed(2),
                      currencyrate: response[m].exchangerate,
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
                    });
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
                invoiceamount: sum + 1,
                lineamount: invoiceamountvalue.toFixed(2),
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
              this.startoptionvalue = this.travelcostvalue.concat(this.startoption);
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
                  remark: obj.remark,
                  source: obj.source,
                  paymentmethods: obj.paymentmethods,
                  type: obj.type,
                });
              }

              let filterVal = ['invoicenumber', 'number', 'invoicetype', 'rowtype', 'invoicedate', 'conditiondate', 'vendorcode', 'paymentmethod', 'currency',
                'invoiceamount', 'lineamount', 'currencyrate', 'companysegment', 'budgetcoding', 'subjectnumber',
                , 'productsegment', 'vatnumber', 'taxCode', 'paymentterms', 'remarks', 'source', 'paymentmethods', 'type'];
              const parser = new Parser({header: false});
              const result = parser.parse(csvData);
              let aaa = result;
              let csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + aaa;
              const link = document.createElement('a');
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
                duration: 5 * 1000,
              });
              this.loading = false;
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
          this.export1(0);

        }
      },
    },
  };
</script>

<style scoped>

</style>


