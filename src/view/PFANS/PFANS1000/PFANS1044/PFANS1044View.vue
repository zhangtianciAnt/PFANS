<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="rowid"
                   :showSelection="showSelection"
                   :title="title" @buttonClick="buttonClick" @dbrowClick="dbrowClick" ref="roletable"
                   v-loading="loading">
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
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui'
  import moment from "moment";
  import {getDictionaryInfo, getOrgInfo, getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS1044View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        showSelection: true,
        buttonList: [
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'}
        ],
        contractType: "0",
        loading: false,
        title: "title.PFANS1044VIEW",
        contractnumbercount: '',
        data: [],
        month: '',
        month2: '',
        month4: '',
        month3: '',
        alldata: [],
        alldata2: [],
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
            width: 120,
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
          }
        ],
        row: '',
        contractnumber: '',
        state: '',
        rowid: 'contractapplication_id '
      };
    },
    beforeRouteEnter(to, from, next) {

      if (from.name === 'PFANS1024FormView' || from.name === 'PFANS1026FormView' || from.name === 'PFANS1033FormView') {
        to.meta.isBack = true
      } else {
        to.meta.isBack = false
      }
      next();
    },

    activated() {
      if (!this.$route.meta.isBack) {
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        this.init();
        this.contractType = "0";
        this.month = '';
        this.month2 = '';
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack = false

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
              if (tabledata[i].applicationdate !== null && tabledata[i].applicationdate !== "") {
                tabledata[i].applicationdate = moment(tabledata[i].applicationdate).format("YYYY-MM-DD");
              }
              if (tabledata[i].contracttype !== null && tabledata[i].contracttype !== "") {
                let letContracttype = getDictionaryInfo(tabledata[i].contracttype);
                if (letContracttype != null) {
                  tabledata[i].contracttype = letContracttype.value1;
                }
              }

              if (tabledata[i].contractnumber != "") {
                letcontractnumber.push(tabledata[i].contractnumber);
              }
              if (tabledata[i].type !== '1') {
                if (tabledata[i].contractdate && tabledata[i].contractdate.split("~").length > 1) {
                  tabledata[i].start = tabledata[i].contractdate.split("~")[0].trim();
                  tabledata[i].end = tabledata[i].contractdate.split("~")[1].trim();
                }
              } else {
                if (tabledata[i].claimdatetime && tabledata[i].claimdatetime.split("~").length > 1) {
                  tabledata[i].start = tabledata[i].claimdatetime.split("~")[0].trim();
                  tabledata[i].end = tabledata[i].claimdatetime.split("~")[1].trim();
                }

              }

              if (tabledata[i].state === '1' && this.$i18n) {
                tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_EFFECTIVE");
              } else if (tabledata[i].state === '0' && this.$i18n) {
                tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_INVALID");
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
            this.alldata2 = response.contractnumbercount;
            this.contractnumbercount = (letcontractnumber.length + 1);
            this.changed();
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
      dbrowClick(val) {
        let name = "";
        if (val.type === '0') {
          name = "PFANS1024FormView"
        } else if (val.type === '1') {
          name = "PFANS1026FormView"
        } else if (val.type === '2') {
          name = "PFANS1033FormView"
        }

        this.$router.push({
          name: name,
          params: {
            _id: val.contractnumber,
            state: val.state,
            disabled: true
          }
        })
      },
      buttonClick(val) {
        if (val === 'export') {
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
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
              'loadingjudge'
            ];

            for (let selItem of selectedlist) {
              let cons = this.alldata2;
              if (this.month) {
                cons = cons.filter(item => moment(item.deliverydate).format("YYYY-MM") == moment(this.month).format("YYYY-MM"));
              }
              if (this.month2) {
                cons = cons.filter(item => moment(item.claimdate).format("YYYY-MM") == moment(this.month2).format("YYYY-MM"));
              }

              cons = cons.filter(item => selItem.contractnumber == item.contractnumber);


              for (let citem of cons) {

                let letContracttype = getDictionaryInfo(citem.entrycondition);
                if (letContracttype != null) {
                  citem.entrycondition = letContracttype.value1;
                }
                if (selItem.extensiondate != null) {
                  selItem.extensiondate = moment(selItem.extensiondate).format("YYYY-MM-DD");
                }
                if (citem.entrypayment != null) {
                  citem.entrypayment = moment(citem.entrypayment).format("YYYY-MM-DD");
                }
                letContracttype = getDictionaryInfo(citem.currencyposition);
                if (letContracttype != null) {
                  citem.currencyposition = letContracttype.value1;
                }
                if (citem.deliverydate != null) {
                  citem.deliverydate = moment(citem.deliverydate).format("YYYY-MM-DD");
                }
                if (selItem.entrypayment != null) {
                  selItem.entrypayment = moment(selItem.entrypayment).format("YYYY-MM-DD");
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
            excel.export_json_to_excel(tHeader, data, "契约一览");
          })

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
          cons = cons.filter(item => moment(item.deliverydate).format("YYYY-MM") == moment(this.month).format("YYYY-MM"));
        }
        if (this.month2) {
          cons = cons.filter(item => moment(item.claimdate).format("YYYY-MM") == moment(this.month2).format("YYYY-MM"));
        }

        let filters = new Set();
        for (let al2 of cons) {
          filters.add(al2)
        }
        let filtersrst = [...new Set(filters)];
        var hash = {};
        filtersrst = filtersrst.reduce(function (item, next) {
          if (hash[next.contractnumber]) {
            ''
          } else {
            hash[next.contractnumber] = true && item.push(next)
          }
          return item
        }, []);

        let rst = [];
        for (let al2 of filtersrst) {
          let a = this.alldata.filter(item => item.type == this.contractType && al2.contractnumber == item.contractnumber);

          if (this.month3) {
            a = a.filter(item => moment(item.start).format("YYYY-MM") == moment(this.month3).format("YYYY-MM"));
          }
          if (this.month4) {
            a = a.filter(item => moment(item.end).format("YYYY-MM") == moment(this.month4).format("YYYY-MM"));
          }

          let prices = cons.filter(item => al2.contractnumber == item.contractnumber);
          let price = 0;
          for (let pi of prices) {
            price = price + Number(pi.claimamount)
          }
          if (a.length > 0) {
            a[0].price = this.abs(price * 100);
            rst.push(a[0])
          }
        }
        this.data = rst;
      },
      abs(val) {
        var str = (val / 100).toFixed(2) + '';
        var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
        var dot = str.substring(str.length, str.indexOf("."));//取到小数部分搜索
        var ret = intSum + dot;
        return ret;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
