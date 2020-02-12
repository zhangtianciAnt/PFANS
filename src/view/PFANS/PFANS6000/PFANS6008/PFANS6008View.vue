<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row"
    :title="title"
    @buttonClick="buttonClick"
    v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui';
  import moment from "moment";
  import {getUserInfo,getDictionaryInfo} from '@/utils/customize';
  export default {
    name: 'PFANS6008View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS6008VIEW_TITLE",
        data: [],
        columns: [
          {
            code: 'bpname',
            label: 'label.PFANS6008VIEW_BPNAME',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'bpcompany',
            label: 'label.PFANS6008VIEW_BPCOMPANY',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'four',
            label: 'label.PFANS6008VIEW_FOUR',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour4',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost4',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support4',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'five',
            label: 'label.PFANS6008VIEW_FIVE',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour5',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost5',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support5',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'six',
            label: 'label.PFANS6008VIEW_SIX',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour6',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost6',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support6',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'sixtotal',
            label: 'label.PFANS6008VIEW_SIX',
            child: [
              {
                code: 'totalmanhours6',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost6',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'expense6',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'contract6',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'seven',
            label: 'label.PFANS6008VIEW_SEVEN',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour7',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost7',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support7',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'eight',
            label: 'label.PFANS6008VIEW_EIGHT',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour8',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost8',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support8',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'nine',
            label: 'label.PFANS6008VIEW_NINE',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour9',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost9',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support9',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'ninetotal',
            label: 'label.PFANS6008VIEW_NINE',
            child: [
              {
                code: 'totalmanhours9',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost9',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'expense9',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'contract9',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'ten',
            label: 'label.PFANS6008VIEW_TEN',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour10',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost10',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support10',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'eleven',
            label: 'label.PFANS6008VIEW_ELEVEN',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour11',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost11',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support11',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'twelve',
            label: 'label.PFANS6008VIEW_TWELVE',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour12',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost12',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support12',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'twelvetotal',
            label: 'label.PFANS6008VIEW_TWELVE',
            child: [
              {
                code: 'totalmanhours12',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost12',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'expense12',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'contract12',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'one',
            label: 'label.PFANS6008VIEW_ONE',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour1',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost1',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support1',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'two',
            label: 'label.PFANS6008VIEW_TWO',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour2',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost2',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support2',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'three',
            label: 'label.PFANS6008VIEW_THREE',
            child: [
              {
                code: 'unitprice',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'manhour3',
                label: 'label.PFANS6008VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost3',
                label: 'label.PFANS6008VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support3',
                label: 'label.PFANS6008VIEW_SUPPORT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'threetotal',
            label: 'label.PFANS6008VIEW_THREE',
            child: [
              {
                code: 'totalmanhours3',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost3',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'expense3',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'contract3',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'pfans2013view_column_5',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'}
        ],
        rowid: '',
        row: 'variousfunds_id'
      };
    },
    mounted() {
//      this.loading = true;
//      this.$store
//        .dispatch('PFANS6007Store/getvariousfunds')
//        .then(response => {
//          for (let j = 0; j < response.length; j++) {
//            if (response[j].year !== null && response[j].year !== "") {
//              response[j].year = moment(response[j].year).format("YYYY");
//            }
//            if (response[j].psdcdwindow !== null && response[j].psdcdwindow !== "") {
//              let psdcdwindow = getUserInfo(response[j].psdcdwindow);
//              if (psdcdwindow) {
//                response[j].psdcdwindow = user.userinfo.customername;
//              }
//
//            }
//            if (response[j].bpplayer !== null && response[j].bpplayer !== "") {
//              let bpplayer = getUserInfo(response[j].bpplayer);
//              if (bpplayer) {
//                response[j].bpplayer = user.userinfo.customername;
//              }
//            }
//            if (response[j].bpclubname !== null && response[j].bpclubname !== "") {
//              let bpclubname = getUserInfo(response[j].bpclubname);
//              if (bpclubname) {
//                response[j].bpclubname = user.userinfo.customername;
//              }
//            }
//            if (response[j].plmonthplan !== null && response[j].plmonthplan !== "") {
//              let plmonthplan = getDictionaryInfo(response[j].plmonthplan);
//              if (plmonthplan != null) {
//                response[j].plmonthplan = plmonthplan.value1;
//              }
//            }
//            if (response[j].typeoffees !== null && response[j].typeoffees !== "") {
//              let typeoffees = getDictionaryInfo(response[j].typeoffees);
//              if (typeoffees != null) {
//                response[j].typeoffees = typeoffees.value1;
//              }
//            }
//            if (response[j].payment !== null && response[j].payment !== "") {
//              let payment = getUserInfo(response[j].payment);
//              if (payment) {
//                response[j].payment = user.userinfo.customername;
//              }
//            }
//            if (response[j].remarks !== null && response[j].remarks !== "") {
//              let remarks = getUserInfo(response[j].remarks);
//              if (remarks != null) {
//                response[j].remarks = user.userinfo.customername;
//              }
//            }
//          }
//          this.data = response;
//          this.loading = false;
//        })
//        .catch(error => {
//          Message({
//            message: error,
//            type: 'error',
//            duration: 5 * 1000
//          });
//          this.loading = false
//        })
    },
    methods: {
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);

        if (val === 'export') {
          this.selectedlist = this.$refs.roletable.selectedList;
          if(this.selectedlist.length === 0){
            Message({
              message: this.$t("normal.info_01"),
              type: 'info',
              duration: 2 * 1000
            });
          }else{
            let selectedList = this.selectedlist;
            this.export(selectedList);
          }
        }
      },
      export(selectedList){
//        let tHeader = "";
//        let filterVal = "";
//        let arr1 = ["PA001001"];
//        let arr2 = ["PA001002","PA001003","PA001004"];
//        let arr3 = ["PA001005","PA001006","PA001007","PA001008"];
//        if(selectedList.every(list => {
//            return arr1.includes(list.typeassets1)
//          })){
//          selectedList.forEach(
//            list => {
//              if(list.purchasetime){
//                list.purchasetime = moment(list.purchasetime).format("YYYY/MM/DD");
//              }
//            });
//          tHeader = [this.$t('label.ASSETS1001VIEW_FILENAME'),
//            this.$t('label.ASSETS1001VIEW_TYPEASSETS'),
//            this.$t('label.PFANS2020VIEW_JOBNUMBER'),
//            this.$t('label.ASSETS1001VIEW_BARCODE'),
//            this.$t('label.ASSETS1001VIEW_BARTYPE'),
//            this.$t('label.ASSETS1001VIEW_ASSETSTATUS'),
//            this.$t('label.ASSETS1001VIEW_STOCKSTATUS'),
//            this.$t('label.ASSETS1001VIEW_PCNO'),
//            this.$t('label.ASSETS1001VIEW_USEDEPARTMENT'),
//            this.$t('label.ASSETS1001VIEW_DEPARTMENTCODE'),
//            this.$t('label.ASSETS1001VIEW_PURCHASETIME'),
//            this.$t('label.ASSETS1001VIEW_PRICE'),
//            this.$t('label.ASSETS1001VIEW_REALPRICE'),
//            this.$t('label.ASSETS1001VIEW_MODEL'),
//            this.$t('label.ASSETS1001VIEW_REMARKS')
//          ];
//          filterVal = ['filename', 'typeassets', 'jobnumber', 'barcode', 'bartypeName', 'assetstatus','stockstatus','pcno','usedepartment','departmentcode','purchasetime','price','realprice','model','remarks'];
//        }else if(selectedList.every(list => {
//            return arr2.includes(list.typeassets1)
//          })){
//          selectedList.forEach(
//            list => {
//              if(list.activitiondate){
//                list.activitiondate = moment(list.activitiondate).format("YYYY/MM/DD");
//              }if(list.psdcdperiod){
//                list.psdcdperiod = moment(list.psdcdperiod).format("YYYY/MM/DD");
//              }if(list.psdcdreturndate){
//                list.psdcdreturndate = moment(list.psdcdreturndate).format("YYYY/MM/DD");
//              }
//            });
//          tHeader = [this.$t('label.ASSETS1001VIEW_FILENAME'),
//            this.$t('label.ASSETS1001VIEW_TYPEASSETS'),
//            this.$t('label.PFANS2020VIEW_JOBNUMBER'),
//            this.$t('label.ASSETS1001VIEW_BARCODE'),
//            this.$t('label.ASSETS1001VIEW_BARTYPE'),
//            this.$t('label.ASSETS1001VIEW_ASSETSTATUS'),
//            this.$t('label.ASSETS1001VIEW_STOCKSTATUS'),
//            this.$t('label.ASSETS1001VIEW_REMARKS1'),
//            this.$t('label.ASSETS1001VIEW_NO'),
//            this.$t('label.ASSETS1001VIEW_ACTIVITIONDATE'),
//            this.$t('label.ASSETS1001VIEW_ORIPRICE'),
//            this.$t('label.ASSETS1001VIEW_LABELNUMBER'),
//            this.$t('label.ASSETS1001VIEW_MODEL'),
//            this.$t('label.ASSETS1001VIEW_ADDRESS'),
//            this.$t('label.ASSETS1001VIEW_USEDEPARTMENT'),
//            this.$t('label.ASSETS1001VIEW_DEPARTMENTCODE'),
//            this.$t('label.ASSETS1001VIEW_PSDCDDEBITSITUATION'),
//            this.$t('label.ASSETS1001VIEW_PSDCDBRINGOUTREASON'),
//            this.$t('label.ASSETS1001VIEW_PSDCDPERIOD'),
//            this.$t('label.ASSETS1001VIEW_PSDCDRETURNDATE'),
//            this.$t('label.ASSETS1001VIEW_PSDCDISOVERDUE'),
//            this.$t('label.ASSETS1001VIEW_PSDCDCOUNTERPARTY'),
//            this.$t('label.ASSETS1001VIEW_PSDCDRESPONSIBLE'),
//            this.$t('label.ASSETS1001VIEW_PSDCDRETURNCONFIRMATION')
//          ];
//          filterVal = ['filename', 'typeassets', 'jobnumber', 'barcode', 'bartypeName', 'assetstatus','stockstatus',
//            'remarks','no','activitiondate','price','assetnumber','model','address','usedepartment','departmentcode','psdcddebitsituation','psdcdbringoutreason'
//            ,'psdcdperiod','psdcdreturndate','psdcdisoverdue','psdcdcounterparty','psdcdresponsible','psdcdreturnconfirmation'];
//
//        }else if(selectedList.every(list => {
//            return arr3.includes(list.typeassets1)
//          })){
//          selectedList.forEach(
//            list => {
//              debugger
//              if(list.outparams12 && getUserInfo(list.outparams12)){
//                list.outparams12 = getUserInfo(list.outparams12).userinfo.customername;
//              }if(list.outparams11 && getUserInfo(list.outparams11)){
//                list.outparams11 = getUserInfo(list.outparams11).userinfo.customername;
//              }if(list.inparams3 && getUserInfo(list.inparams3)){
//                list.inparams3 = getUserInfo(list.inparams3).userinfo.customername;
//              }if(list.inparams6 && getUserInfo(list.outparams6)){
//                list.inparams6 = getUserInfo(list.inparams6).userinfo.customername;
//              }if(list.outparams2 && getUserInfo(list.outparams2)){
//                list.outparams2 = getUserInfo(list.outparams2).userinfo.customername;
//              }if(list.outparams7 && getUserInfo(list.outparams7)){
//                list.outparams7 = getUserInfo(list.outparams7).userinfo.customername;
//              }if(list.outparams8 && getUserInfo(list.outparams8)){
//                list.outparams8 = getUserInfo(list.outparams8).userinfo.customername;
//              }if(list.purchasetime){
//                list.purchasetime = moment(list.purchasetime).format("YYYY/MM/DD");
//              }if(list.activitiondate){
//                list.activitiondate = moment(list.activitiondate).format("YYYY/MM/DD");
//              }if(list.inparams4){
//                list.inparams4 = moment(list.inparams4).format("YYYY/MM/DD");
//              }if(list.inparams7){
//                list.inparams7 = moment(list.inparams7).format("YYYY/MM/DD");
//              }if(list.outparams3){
//                list.outparams3 = moment(list.outparams3).format("YYYY/MM/DD");
//              }if(list.outparams13){
//                list.outparams13 = moment(list.outparams13).format("YYYY/MM/DD");
//              }if(list.outparams9){
//                list.outparams9 = moment(list.outparams9).format("YYYY/MM/DD");
//              }
//
//              list.inparams1 = list.inparams1 === "1" ? this.$t("label.yes") : this.$t("label.no");
//              list.inparams2 = list.inparams2 === "1" ? this.$t("label.yes") : this.$t("label.no");
//              list.inparams5 = list.inparams5 === "1" ? this.$t("label.yes") : this.$t("label.no");
//              list.outparams4 = list.outparams4 === "1" ? this.$t("label.yes") : this.$t("label.no");
//              list.outparams5 = list.outparams5 === "1" ? this.$t("label.yes") : this.$t("label.no");
//              list.outparams6 = list.outparams6 === "1" ? this.$t("label.yes") : this.$t("label.no");
//              list.outparams10 = list.outparams10 === "1" ? this.$t("label.yes") : this.$t("label.no");
//            }
//          )
//          tHeader = [this.$t('label.ASSETS1001VIEW_FILENAME'),
//            this.$t('label.ASSETS1001VIEW_TYPEASSETS'),
//            this.$t('label.PFANS2020VIEW_JOBNUMBER'),
//            this.$t('label.ASSETS1001VIEW_BARCODE'),
//            this.$t('label.ASSETS1001VIEW_BARTYPE'),
//            this.$t('label.ASSETS1001VIEW_ASSETSTATUS'),
//            this.$t('label.ASSETS1001VIEW_STOCKSTATUS'),
//            this.$t('label.ASSETS1001VIEW_TONGGUANNO'),
//            this.$t('label.ASSETS1001VIEW_MODEL'),
//            this.$t('label.ASSETS1001VIEW_PRICE'),
//            this.$t('label.ASSETS1001VIEW_HSCODE'),
//            this.$t('label.ASSETS1001VIEW_INTIME'),
//            this.$t('label.ASSETS1001VIEW_YANQIDATE'),
//            this.$t('label.ASSETS1001VIEW_REMARKS'),
//            this.$t('label.ASSETS1001VIEW_CUSTOMER'),
//            this.$t('label.ASSETS1001VIEW_CONTROLNO'),
//            this.$t('label.ASSETS1001VIEW_MACHINENAME'),
//            this.$t('label.ASSETS1001VIEW_PARAM1'),
//            this.$t('label.ASSETS1001VIEW_PARAM2'),
//            this.$t('label.ASSETS1001VIEW_PARAM3'),
//            this.$t('label.ASSETS1001VIEW_PARAM4'),
//            this.$t('label.ASSETS1001VIEW_PARAM5'),
//            this.$t('label.ASSETS1001VIEW_PARAM6'),
//            this.$t('label.ASSETS1001VIEW_PARAM4'),
//            this.$t('label.ASSETS1001VIEW_PARAM7'),
//            this.$t('label.ASSETS1001VIEW_PARAM5'),
//            this.$t('label.ASSETS1001VIEW_PARAM8'),
//            this.$t('label.ASSETS1001VIEW_PARAM4'),
//            this.$t('label.ASSETS1001VIEW_PARAM9'),
//            this.$t('label.ASSETS1001VIEW_PARAM10'),
//            this.$t('label.ASSETS1001VIEW_PARAM11'),
//            this.$t('label.ASSETS1001VIEW_PARAM6'),
//            this.$t('label.ASSETS1001VIEW_PARAM3'),
//            this.$t('label.ASSETS1001VIEW_PARAM4'),
//            this.$t('label.ASSETS1001VIEW_PARAM12'),
//            this.$t('label.ASSETS1001VIEW_PARAM13'),
//            this.$t('label.ASSETS1001VIEW_PARAM14'),
//            this.$t('label.ASSETS1001VIEW_PARAM4'),
//            this.$t('label.ASSETS1001VIEW_PARAM7')
//          ];
//          filterVal = ['filename', 'typeassets', 'jobnumber', 'barcode', 'bartypeName', 'assetstatus','stockstatus',
//            'pcno','model','price','no','purchasetime','activitiondate','remarks','customer','controlno','machinename',
//            'inparams1','inparams2',
//            'inparams3','inparams4','inparams5','inparams6',
//            'inparams7','inparams8','outparams1',
//            'outparams2', 'outparams3','outparams4','outparams5','outparams6','outparams7','outparams8','outparams9',
//            'outparams10','outparams11','outparams12','outparams13','outparams14'];
//        }else{
//          Message({
//            message: this.$t("label.ASSETS1001VIEW_ERROR"),
//            type: 'error',
//            duration: 2 * 1000
//          });
//        }
//        if(tHeader&&filterVal){
//          import('@/vendor/Export2Excel').then(excel => {
//            const list = selectedList;
//            const data = this.formatJson(filterVal, list);
//            excel.export_json_to_excel(tHeader, data, this.$t('menu.ASSETS1001'));
//          });
//        }
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
