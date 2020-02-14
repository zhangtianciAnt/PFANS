<template>
  <EasyNormalContainer
    :buttonList="buttonList"
    v-loading="loading"
    :title="title"
    @buttonClick="buttonClick"
    ref="container"
  >
    <div slot="customize">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane :label="$t('label.PFANS6009TAB1')" name="first">
        <el-table :data="this.tableA" stripe header-cell-class-name="sub_bg_color_blue" :span-method="arraySpanMethod">
          <el-table-column :key="item.code" :label="$t(item.label)" v-for="item in this.columns" align="center" :min-width="item.width"
                           v-if="item.child && item.child.length > 0">
            <el-table-column :key="o.code" :label="$t(o.label)" v-for="o in item.child" :min-width="o.width" :prop="o.code">
            </el-table-column>
          </el-table-column>
          <el-table-column :column-key="item.code" :key="item.code" :label="$t(item.label)" :min-width="item.width"
                           :prop="item.code" v-else/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('label.PFANS6009TAB2')" name="second">
        <el-table :data="this.tableB" stripe header-cell-class-name="sub_bg_color_blue" show-summary>
          <el-table-column :key="item.code" :label="$t(item.label)" v-for="item in this.columnsB" align="center" :min-width="item.width"
                           v-if="item.child && item.child.length > 0">
            <el-table-column :key="o.code" :label="$t(o.label)" v-for="o in item.child" :min-width="o.width">
            </el-table-column>
          </el-table-column>
          <el-table-column :column-key="item.code" :key="item.code" :label="$t(item.label)" :min-width="item.width"
                           :prop="item.code" v-else/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('label.PFANS6009TAB3')" name="third">
        <el-table :data="this.tableC" stripe header-cell-class-name="sub_bg_color_blue" show-summary>
          <el-table-column :key="item.code" :label="$t(item.label)" v-for="item in this.columnsC" align="center" :min-width="item.width"
                           v-if="item.child && item.child.length > 0">
            <el-table-column :key="o.code" :label="$t(o.label)" v-for="o in item.child" :min-width="o.width">
            </el-table-column>
          </el-table-column>
          <el-table-column :column-key="item.code" :key="item.code" :label="$t(item.label)" :min-width="item.width"
                           :prop="item.code" v-else/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    </div>
  </EasyNormalContainer>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import moment from "moment";
  import {getUserInfo,getDictionaryInfo} from '@/utils/customize';
  export default {
    name: 'PFANS6009View',
    components: {
      EasyNormalContainer
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS6009VIEW',
        activeName: 'first',
        tableA: [{
          bpcompany: 'AAA',
          manhour4: '1',
          cost4: '1'
        }],
        tableB: [],
        tableC: [],
        columns: [
          {
            code: 'bpcompany',
            label: 'label.PFANS6009VIEW_BPCOMPANY',
            width: 160,
            fix: false,
          },
          {
            code: 'four',
            label: '',
            child: [
              {
                code: 'manhour4',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost4',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'five',
            label: '',
            child: [
              {
                code: 'manhour5',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost5',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'six',
            label: '',
            child: [
              {
                code: 'manhour6',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost6',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'seven',
            label: '',
            child: [
              {
                code: 'manhour7',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost7',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'eight',
            label: '',
            child: [
              {
                code: 'manhour8',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost8',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'nine',
            label: '',
            child: [
              {
                code: 'manhour9',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost9',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'ten',
            label: '',
            child: [
              {
                code: 'manhour10',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost10',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'eleven',
            label: '',
            child: [
              {
                code: 'manhour11',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost11',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'twelve',
            label: '',
            child: [
              {
                code: 'manhour12',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost12',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'one',
            label: '',
            child: [
              {
                code: 'manhour1',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost1',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'two',
            label: '',
            child: [
              {
                code: 'manhour2',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost2',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'three',
            label: '',
            child: [
              {
                code: 'manhour3',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'cost3',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
          {
            code: 'total',
            label: 'label.PFANS6009VIEW_TOTAL',
            child: [
              {
                code: 'totalmanhours',
                label: 'label.PFANS6009VIEW_MANHOUR',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              },
              {
                code: 'totalcost',
                label: 'label.PFANS6009VIEW_COST',
                labelClass: 'pfans2013view_column_5',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'}
        ],
        rowid: '',
        row: 'variousfunds_id',
        array: [
          '2019年4月','2019年5月','2019年6月','2019年7月','2019年8月','2019年9月','2019年10月','2019年11月','2019年12月','2019年1月','2019年2月','2019年3月'
        ],
        array1: [
          '2019/4/1','2019/5/1','2019/6/1','2019/7/1','2019年8月','2019年9月','2019年10月','2019年11月','2019年12月','2019年1月','2019年2月','2019年3月'
        ],
        arrayB: [
          this.$t('label.PFANS6009VIEW_MANHOUR2'),this.$t('label.PFANS6009VIEW_COST2')
        ],
        columnsB: [],
        columnsC: [],
        number: this.$t('label.PFANS6009VIEW_MANHOUR3'),
        arryaLabels:[
          this.$t('label.PFANS6009VIEW_TOTAL'),
          this.$t('label.PFANS6009VIEW_AVERAGEUNITPRICE'),
          this.$t('label.PFANS6009VIEW_TRAVELEXPENSES'),
          this.$t('label.PFANS6009VIEW_EQUIPMENTFUNDS'),
          this.$t('label.PFANS6009VIEW_TOTALEXPENDITURE')
        ]
      };
    },
    mounted() {
      this.loading = true;
      // TAB1
      for (var i = 0; i < this.array.length; i++) {
        this.columns[i + 1].label = this.array[i];
      }
      // TAB2
      this.columnsB = JSON.parse(JSON.stringify(this.columns));
      for (var i = 0; i < this.array1.length; i++) {
        this.columnsB[i + 1].label = this.array1[i];
        for (var j = 0; j < this.arrayB.length; j++) {
          this.columnsB[i + 1].child[j].label = this.arrayB[j];
        }
      }

      this.columnsB[13].child[0].label = this.arrayB[0];
      this.columnsB[13].child[1].label = this.arrayB[1];

      // TAB3
      this.columnsC = JSON.parse(JSON.stringify(this.columns));
      for (var i = 0; i < this.array1.length; i++) {
        this.columnsC[i + 1].label = this.array1[i];
        this.columnsC[i + 1].child.splice(1, 1);
        this.columnsC[i + 1].child[0].label = this.number;
      }

      this.columnsC[13].child.splice(1, 1);
      this.columnsC[13].child[0].label = this.number;

      // 赋值
      for(var p = 0; p < 4; p++) {
        this.tableA.push(
          {
            bpcompany: this.arryaLabels[p],
            manhour4: '',
            cost4: '',
            manhour5: '',
            cost5: '',
            manhour6: '',
            cost6: '',
            manhour7: '',
            cost7: ''
          })
      }

      //      this.$store
//        .dispatch('PFANS6009Store/getCostList')
//        .then(response => {
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

      this.loading = false
    },
    methods: {
      // rowspan
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        for(var i = this.tableA.length - 4; i < this.tableA.length; i++) {
          if(rowIndex === i) {
            if(columnIndex !== 0) {
              return [1, 2];
            }
          }
        }
      },
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
