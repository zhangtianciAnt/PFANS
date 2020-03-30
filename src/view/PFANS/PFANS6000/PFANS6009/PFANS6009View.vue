<template>
  <div>
    <EasyNormalTable
      :buttonList="buttonList"
      :columns="columns"
      :data="this.tableA"
      :showIndex="showIndex"
      :title="title"
      @buttonClick="buttonClick"
      :span-method="this.arraySpanMethod"
      ref="container1"
      v-loading="loading"
      v-show="region === '1'"
    >
      <el-select slot="customize" v-model="region">
        <el-option :label="$t('label.PFANS6009TAB1')" value="1"></el-option>
        <el-option :label="$t('label.PFANS6009TAB2')" value="2"></el-option>
        <el-option :label="$t('label.PFANS6009TAB3')" value="3"></el-option>
      </el-select>
      <!--<el-tabs v-model="activeName" type="border-card" @tab-click="handleTabClick">-->
      <!--<el-tab-pane :label="$t('label.PFANS6009TAB1')" name="first">-->
      <!--<el-table :data="this.tableA" stripe header-cell-class-name="sub_bg_color_blue" :span-method="arraySpanMethod" v-loading="tableALoading">-->
      <!--<el-table-column type="index" width="55" label="NO">-->
      <!--</el-table-column>-->
      <!--<el-table-column :key="item.code" :label="$t(item.label)" v-for="item in this.columns" align="center" :min-width="item.width"-->
      <!--v-if="item.child && item.child.length > 0">-->
      <!--<el-table-column :key="o.code" :label="$t(o.label)" v-for="o in item.child" :min-width="o.width" :prop="o.code">-->
      <!--</el-table-column>-->
      <!--</el-table-column>-->
      <!--<el-table-column :column-key="item.code" :key="item.code" :label="$t(item.label)" :min-width="item.width"-->
      <!--:prop="item.code" v-else/>-->
      <!--</el-table>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane :label="$t('label.PFANS6009TAB2')" name="second">-->
      <!--<el-table :data="this.tableB" stripe header-cell-class-name="sub_bg_color_blue" :span-method="arraySpanMethod2" v-loading="tableBLoading">-->
      <!--<el-table-column type="index" width="55" label="NO">-->
      <!--</el-table-column>-->
      <!--<el-table-column :key="item.code" :label="$t(item.label)" v-for="item in this.columnsB" align="center" :min-width="item.width"-->
      <!--v-if="item.child && item.child.length > 0">-->
      <!--<el-table-column :key="o.code" :label="$t(o.label)" v-for="o in item.child" :min-width="o.width" :prop="o.code">-->
      <!--</el-table-column>-->
      <!--</el-table-column>-->
      <!--<el-table-column :column-key="item.code" :key="item.code" :label="$t(item.label)" :min-width="item.width"-->
      <!--:prop="item.code" v-else/>-->
      <!--</el-table>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane :label="$t('label.PFANS6009TAB3')" name="third">-->
      <!--<el-table :data="this.tableC" stripe header-cell-class-name="sub_bg_color_blue" :span-method="arraySpanMethod3" v-loading="tableCLoading">-->
      <!--<el-table-column type="index" width="55" label="NO">-->
      <!--</el-table-column>-->
      <!--<el-table-column :key="item.code" :label="$t(item.label)" v-for="item in this.columnsC" align="center" :min-width="item.width"-->
      <!--v-if="item.child && item.child.length > 0">-->
      <!--<el-table-column :key="o.code" :label="$t(o.label)" v-for="o in item.child" :min-width="o.width" :prop="o.code">-->
      <!--</el-table-column>-->
      <!--</el-table-column>-->
      <!--<el-table-column :column-key="item.code" :key="item.code" :label="$t(item.label)" :min-width="item.width"-->
      <!--:prop="item.code" v-else/>-->
      <!--</el-table>-->
      <!--</el-tab-pane>-->
      <!--</el-tabs>-->
    </EasyNormalTable>
    <EasyNormalTable
      :buttonList="buttonList"
      :columns="columnsB"
      :data="this.tableB"
      :showIndex="showIndex"
      :title="title"
      @buttonClick="buttonClick"
      :span-method="this.arraySpanMethod2"
      ref="container2"
      v-loading="loading"
      v-show="region === '2'"
    >
      <el-select slot="customize" v-model="region">
        <el-option :label="$t('label.PFANS6009TAB1')" value="1"></el-option>
        <el-option :label="$t('label.PFANS6009TAB2')" value="2"></el-option>
        <el-option :label="$t('label.PFANS6009TAB3')" value="3"></el-option>
      </el-select>
    </EasyNormalTable>
    <EasyNormalTable
      :buttonList="buttonList"
      :columns="columnsC"
      :data="this.tableC"
      :showIndex="showIndex"
      :title="title"
      @buttonClick="buttonClick"
      :span-method="this.arraySpanMethod3"
      ref="container3"
      v-loading="loading"
      v-show="region === '3'"
    >
      <el-select slot="customize" v-model="region">
        <el-option :label="$t('label.PFANS6009TAB1')" value="1"></el-option>
        <el-option :label="$t('label.PFANS6009TAB2')" value="2"></el-option>
        <el-option :label="$t('label.PFANS6009TAB3')" value="3"></el-option>
      </el-select>
    </EasyNormalTable>
  </div>
</template>

<script>
  // import EasyNormalContainer from '@/components/EasyNormalContainer';
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getSupplierinfor} from '@/utils/customize';
  import moment from 'moment';

  export default {
    name: 'PFANS6009View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        showIndex: true,
        loading: false,
        title: 'title.PFANS6009VIEW',
        activeName: 'first',
        tableA: [],
        tableB: [],
        tableC: [],
        tableALoading: true,
        tableBLoading: true,
        tableCLoading: true,
        region: "1",
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost4',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost5',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost6',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost7',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost8',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost9',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost10',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost11',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost12',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost1',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost2',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'cost3',
                label: 'label.PFANS6009VIEW_COST',
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
                width: 50,
                fix: false,
              },
              {
                code: 'totalcost',
                label: 'label.PFANS6009VIEW_COST',
                width: 50,
                fix: false,
              }
            ],
            width: 540,
            fix: false,
          },
        ],
        buttonList: [
//          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'}
        ],
        yearLabel: this.$t('label.PFANS6009VIEW_YEARLABEL'),
        monthLabel: this.$t('label.PFANS6009VIEW_MONTHLABEL'),
        array: [
          '0000Y4M', '0000Y5M', '0000Y6M', '0000Y7M', '0000Y8M', '0000Y9M', '0000Y10M', '0000Y11M', '0000Y12M', '0000Y1M', '0000Y2M', '0000Y3M'
        ],
        array1: [
          '0000/4/1', '0000/5/1', '0000/6/1', '0000/7/1', '0000/8/1', '0000/9/1', '0000/10/1', '0000/11/1', '0000/12/1', '0000/1/1', '0000/2/1', '0000/3/1'
        ],
        arrayB: [
          this.$t('label.PFANS6009VIEW_MANHOUR2'), this.$t('label.PFANS6009VIEW_COST2')
        ],
        columnsB: [],
        columnsC: [],
        number: this.$t('label.PFANS6009VIEW_MANHOUR3'),
        arryaLabels: [
          this.$t('label.PFANS6009VIEW_TOTAL'),
          this.$t('label.PFANS6009VIEW_TOTALEXPENDITURE'),
          this.$t('label.PFANS6009VIEW_EQUIPMENTFUNDS'),
          this.$t('label.PFANS6009VIEW_TRAVELEXPENSES'),
          this.$t('label.PFANS6009VIEW_AVERAGEUNITPRICE'),
        ]
      };
    },
    mounted() {
      // TAB1
//      for (var i = 0; i < this.array.length; i++) {
//        this.columns[i + 1].label = this.array[i];
//      }

      let year = moment().subtract(3,'months').year();
      for (var i = 0; i < this.array.length; i++) {
        if(i <=8) {
          this.columns[i + 1].label = this.array[i].replace("0000", year).replace("Y", this.yearLabel).replace("M", this.monthLabel);
        }else{
          this.columns[i + 1].label = this.array[i].replace("0000", year + 1).replace("Y", this.yearLabel).replace("M", this.monthLabel);;
        }
      }


      // TAB2
      this.columnsB = JSON.parse(JSON.stringify(this.columns));
      for (var i = 0; i < this.array1.length; i++) {
//        this.columnsB[i + 1].label = this.array1[i];
        for (var j = 0; j < this.arrayB.length; j++) {
          this.columnsB[i + 1].child[j].label = this.arrayB[j];
        }
      }

      for (var i = 1; i <= 12; i++) {
        if(i <=9) {
          this.columnsB[i].label = this.array1[i - 1].replace("0000", year);
        }else {
          this.columnsB[i].label = this.array1[i - 1].replace("0000", year + 1);
        }
      }


      this.columnsB[13].child[0].label = this.arrayB[0];
      this.columnsB[13].child[1].label = this.arrayB[1];

      // TAB3
      this.columnsC = JSON.parse(JSON.stringify(this.columns));
      for (var i = 0; i < this.array1.length; i++) {
//        this.columnsC[i + 1].label = this.array1[i];
        this.columnsC[i + 1].child.splice(1, 1);
        this.columnsC[i + 1].child[0].label = this.number;
      }

      for (var i = 1; i <= 12; i++) {
        if(i <= 9) {
          this.columnsC[i].label = this.array1[i - 1].replace("0000", year);
        }else {
          this.columnsC[i].label = this.array1[i - 1].replace("0000", year + 1);
        }
      }


      this.columnsC[13].child.splice(1, 1);
      this.columnsC[13].child[0].label = this.number;

      this.loadTableA();
      this.loadTableB();
      this.loadTableC();

    },
    methods: {
      // rowspan
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (rowIndex > this.tableA.length - 5) {
          if ((columnIndex + 1) % 2 == 0) {
            return {
              rowspan: 1,
              colspan: 2
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        } else {
          if (rowIndex > this.tableA.length - 6) {
            if (columnIndex == 0) {
              return {
                rowspan: 0,
                colspan: 0
              }
            } else if (columnIndex == 1) {
              return {
                rowspan: 1,
                colspan: 2
              }
            }
          }
          if (columnIndex == 0 || columnIndex == 1) {
            console.log("return 1,1");
            return [1, 1];
          }
        }
      },
      arraySpanMethod2({row, column, rowIndex, columnIndex}) {
        if (rowIndex > this.tableB.length - 1) {
          if ((columnIndex + 1) % 2 == 0) {
            return {
              rowspan: 1,
              colspan: 2
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        } else {
          if (rowIndex > this.tableB.length - 2) {
            if (columnIndex == 0) {
              return {
                rowspan: 0,
                colspan: 0
              }
            } else if (columnIndex == 1) {
              return {
                rowspan: 1,
                colspan: 2
              }
            }
          }
          if (columnIndex == 0 || columnIndex == 1) {
            console.log("return 1,1");
            return [1, 1];
          }
        }
      },
      arraySpanMethod3({row, column, rowIndex, columnIndex}) {
        if (rowIndex > this.tableC.length - 1) {
          if ((columnIndex + 1) % 2 == 0) {
            return {
              rowspan: 1,
              colspan: 2
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        } else {
          if (rowIndex > this.tableC.length - 2) {
            if (columnIndex == 0) {
              return {
                rowspan: 0,
                colspan: 0
              }
            } else if (columnIndex == 1) {
              return {
                rowspan: 1,
                colspan: 2
              }
            }
          }
          if (columnIndex == 0 || columnIndex == 1) {
            console.log("return 1,1");
            return [1, 1];
          }
        }
      },
      loadTableA() {
        if (this.tableALoading == false) {
          return;
        }
        this.loading = true;
        this.$store
          .dispatch('PFANS6009Store/getCostList')
          .then(response => {
            var tableData = response.company;
            var tripData = response.trip;
            var assetData = response.asset;

            for (let j = 0; j < tableData.length; j++) {
              if(tableData[j].bpcompany !== null && tableData[j].bpcompany !== "") {
                let supplierInfor = getSupplierinfor(tableData[j].bpcompany);
                if (supplierInfor) {
                  tableData[j].bpcompany = supplierInfor.supchinese;
                }
              }
            }

            let arrayAdate = [];
            let addLine1 = {}, addLine2 = {}, addLine5 = {};
            for (var i = 1; i <= 13; i++) {
              var total_manhour = 0, total_cost = 0;
              var key_hour = "manhour" + i;
              var key_cost = "cost" + i;
              if (i > 12) {
                key_cost = "totalcost";
                key_hour = "totalmanhours";
              }
              for (var j = 0; j < tableData.length; j++) {
                total_manhour += parseFloat(tableData[j][key_hour]);
                total_cost += parseFloat(tableData[j][key_cost]);
              }
              addLine1[key_hour] = parseFloat(total_manhour).toFixed(2);
              addLine1[key_cost] = parseFloat(total_cost).toFixed(2);
              if (total_manhour == 0) {
                addLine2[key_cost] = "0.0";
              } else {
                addLine2[key_cost] = (parseFloat(total_cost) / parseFloat(total_manhour)).toFixed(2);
              }

              tripData[key_cost] = parseFloat(tripData[key_cost]).toFixed(2);
              assetData[key_cost] = parseFloat(assetData[key_cost]).toFixed(2);

              addLine5[key_cost] = (parseFloat(total_cost) + parseFloat(tripData[key_cost]) + parseFloat(assetData[key_cost])).toFixed(2);
            }
            arrayAdate.push(addLine1);
            arrayAdate.push(addLine2);
            arrayAdate.push(tripData);
            arrayAdate.push(assetData);
            arrayAdate.push(addLine5);
            // 赋值
            for (var p = 0; p <= 4; p++) {
              tableData.push(Object.assign(arrayAdate[p], {bpcompany: this.arryaLabels[p]}));
            }
//            var year = response.year;
//            for (var i = 0; i < this.array.length; i++) {
//              if(i <=8) {
//                this.columns[i + 1].label = this.array[i].replace("0000", year[0]).replace("Y", this.yearLabel).replace("M", this.monthLabel);
//              }else{
//                this.columns[i + 1].label = this.array[i].replace("0000", year[1]).replace("Y", this.yearLabel).replace("M", this.monthLabel);;
//              }
//            }

            this.tableA = tableData;
            this.loading = false;
            this.tableALoading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
            this.tableALoading = false;
          });
      },
      loadTableB() {
        if (this.tableBLoading == false) {
          return;
        }
        this.loading = true;
        this.$store
          .dispatch('PFANS6009Store/getWorktimes')
          .then(response => {
            var tableData = response.worktimes;
            var year = response.year;

            for (let j = 0; j < tableData.length; j++) {
              if(tableData[j].bpcompany !== null && tableData[j].bpcompany !== "") {
                let supplierInfor = getSupplierinfor(tableData[j].bpcompany);
                if (supplierInfor) {
                  tableData[j].bpcompany = supplierInfor.supchinese;
                }
              }
            }

            tableData.forEach(data => {
              var totalManhour = 0, totalCost = 0;
              for (var i = 1; i <= 12; i++) {
                var m = parseFloat(data["manhour" + i]);
                var c = parseFloat(data["cost" + i]);
                totalManhour += m;
                totalCost += c;
                data["manhour" + i] = m.toFixed(2);
                data["cost" + i] = c.toFixed(2);
              }
              data["totalmanhours"] = parseFloat(totalManhour).toFixed(2);
              data["totalcost"] = parseFloat(totalCost).toFixed(2);
            });

            let arrayAdate = [];
            let addLine1 = {};
            for (var i = 1; i <= 13; i++) {
              var total_manhour = 0, total_cost = 0;
              var key_hour = "manhour" + i;
              var key_cost = "cost" + i;
              if (i > 12) {
                key_cost = "totalcost";
                key_hour = "totalmanhours";
              }
              for (var j = 0; j < tableData.length; j++) {
                total_manhour = parseFloat(total_manhour) + parseFloat(tableData[j][key_hour]);
                total_cost = parseFloat(total_cost) + parseFloat(tableData[j][key_cost]);
              }
              addLine1[key_hour] = parseFloat(total_manhour).toFixed(2);
              addLine1[key_cost] = parseFloat(total_cost).toFixed(2);
            }
            arrayAdate.push(addLine1);
            tableData.push(Object.assign(arrayAdate[0], {bpcompany: this.arryaLabels[0]}));
//            for (var i = 1; i <= 12; i++) {
//              if(i <=9) {
//                this.columnsB[i].label = this.array1[i - 1].replace("0000", year[0]);
//              }else {
//                this.columnsB[i].label = this.array1[i - 1].replace("0000", year[1]);
//              }
//            }

            this.tableB = tableData;
            this.loading = false;
            this.tableBLoading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
            this.tableBLoading = false;
          });
      },
      loadTableC() {
        if (this.tableCLoading == false) {
          return;
        }
        this.loading = true;
        this.$store
          .dispatch('PFANS6009Store/getWorkers')
          .then(response => {
            var tableC = response.workers;
            var year = response.year;

            for (let j = 0; j < tableC.length; j++) {
              if(tableC[j].bpcompany !== null && tableC[j].bpcompany !== "") {
                let supplierInfor = getSupplierinfor(tableC[j].bpcompany);
                if (supplierInfor) {
                  tableC[j].bpcompany = supplierInfor.supchinese;
                }
              }
            }

            let arrayAdate = [];
            let addLine1 = {};
            for (var i = 1; i <= 13; i++) {
              var total_manhour = 0, total_cost = 0;
              var key_hour = "manhour" + i;
              var key_cost = "cost" + i;
              if (i > 12) {
                key_cost = "totalcost";
                key_hour = "totalmanhours";
              }
              for (var j = 0; j < tableC.length; j++) {
                total_manhour += parseFloat(tableC[j][key_hour]);
                total_cost += parseFloat(tableC[j][key_cost]);
              }
              addLine1[key_hour] = parseFloat(total_manhour);
              addLine1[key_cost] = parseFloat(total_cost);
            }
            arrayAdate.push(addLine1);
            tableC.push(Object.assign(arrayAdate[0], {bpcompany: this.arryaLabels[0]}));

            tableC.forEach(data => {
              var totalManhour = 0;
              for (var i = 1; i <= 12; i++) {
                var m = parseFloat(data["manhour" + i]);
                totalManhour += m;
                data["manhour" + i] = m;
              }
              data["totalmanhours"] = parseFloat(totalManhour);
            });
//            for (var i = 1; i <= 12; i++) {
//              if(i <= 9) {
//                this.columnsC[i].label = this.array1[i - 1].replace("0000", year[0]);
//              }else {
//                this.columnsC[i].label = this.array1[i - 1].replace("0000", year[1]);
//              }
//            }

            this.tableC = tableC;
            this.loading = false;
            this.tableCLoading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
            this.tableCLoading = false;
          });
      },
      handleTabClick(tab, event) {
        switch (tab.name) {
          case 'first':
            this.loadTableA();
            break;
          case 'second':
            this.loadTableB();
            break;
          case 'third':
            this.loadTableC();
            break;
          default:
            break;
        }
      },
      buttonClick(val) {
        if (val === 'export') {
          this.export(this.tableA, this.tableB, this.tableC);
        }
      },
      export(listA, listB, listC) {
        console.log(listA);
        console.log(listB);
        console.log(listC);
        this.$store
          .dispatch("PFANS6009Store/downloadExcel")
          .then(response => {
            this.download(response, "BP社集計一览")
          })
          .catch(() => {
            console.log("no");
          });
      },
      download(data, filename) {
        if ("msSaveOrOpenBlob" in navigator) {
          window.navigator.msSaveOrOpenBlob(
            new Blob([data], {type: 'application/vnd.ms-excel;charset=utf-8'}),
            decodeURI(filename) + ".xlsx"
          );
        } else {
          var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = decodeURI(filename) + '.xlsx'; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        }
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
