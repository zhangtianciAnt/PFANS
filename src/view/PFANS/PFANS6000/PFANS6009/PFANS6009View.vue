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
      <el-date-picker
        :placeholder="$t('normal.error_09')"
        @change="yearChangeA"
        format="yyyy"
        type="year"
        slot="customize"
        v-model="form.year" style="width:8vw ">
      </el-date-picker>
      <el-select v-model="form.group_id" style="width: 13vw"
                 @change="changeGroupA" slot="customize">
        <el-option
          v-for="item in optionsdata"
          :key="item.value"
          :label="item.lable"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="region" slot="customize" style="width: 10vw">
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
      <el-date-picker
        :placeholder="$t('normal.error_09')"
        @change="yearChangeB"
        format="yyyy"
        type="year"
        slot="customize"
        v-model="form.year" style="width:8vw ">
      </el-date-picker>
      <el-select v-model="form.group_id" style="width: 13vw"
                 @change="changeGroupB" slot="customize">
        <el-option
          v-for="item in optionsdata"
          :key="item.value"
          :label="item.lable"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="region" slot="customize" style="width: 10vw">
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
      <el-date-picker
        :placeholder="$t('normal.error_09')"
        @change="yearChangeC"
        format="yyyy"
        type="year"
        slot="customize"
        v-model="form.year" style="width:8vw ">
      </el-date-picker>
      <el-select v-model="form.group_id" style="width: 13vw"
                 @change="changeGroupC" slot="customize">
        <el-option
          v-for="item in optionsdata"
          :key="item.value"
          :label="item.lable"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="region" slot="customize" style="width: 10vw">
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
  import moment from 'moment';
  import {
    getCooperinterviewList,
    getDictionaryInfo,
    getSupplierinfor,
    getCurrentRole,
    getDownOrgInfo,
  } from '@/utils/customize';

  export default {
    name: 'PFANS6009View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        showIndex: true,
        loading: false,
        title: 'title.PFANS6009VIEW',
        activeName: 'first',
        form: {
          group_id: '',
          year: moment(new Date()).format('MM') < 4 ? moment(new Date()).add(-1, 'y').format('YYYY') : moment(new Date()).format('YYYY'),

        },
        optionsdata: [],
        tableA: [],
        tableB: [],
        tableC: [],
        optationsC: [],
        optationsB: [],
        tableALoading: true,
        region: '1',
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost4',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost5',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost6',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost7',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost8',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost9',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost10',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost11',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost12',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost1',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost2',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'cost3',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
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
                width: 100,
                fix: false,
              },
              {
                code: 'totalcost',
                label: 'label.PFANS6009VIEW_COST',
                width: 100,
                fix: false,
              },
            ],
            width: 540,
            fix: false,
          },
        ],
        buttonList: [
//          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'},
        ],
        yearLabel: this.$t('label.PFANS6009VIEW_YEARLABEL'),
        monthLabel: this.$t('label.PFANS6009VIEW_MONTHLABEL'),
        array: [
          '0000Y4M', '0000Y5M', '0000Y6M', '0000Y7M', '0000Y8M', '0000Y9M', '0000Y10M', '0000Y11M', '0000Y12M', '0000Y1M', '0000Y2M', '0000Y3M',
        ],
        array1: [
          '0000/4/1', '0000/5/1', '0000/6/1', '0000/7/1', '0000/8/1', '0000/9/1', '0000/10/1', '0000/11/1', '0000/12/1', '0000/1/1', '0000/2/1', '0000/3/1',
        ],
        arrayB: [
          this.$t('label.PFANS6009VIEW_MANHOUR2'), this.$t('label.PFANS6009VIEW_COST2'),
        ],
        columnsB: [
          {
            code: 'suppliername',
            label: 'label.PFANS6007VIEW_BPCLUBNAME',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '4' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost4',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost4',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '5' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost5',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost5',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '6' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost6',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost6',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '7' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost7',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost7',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '8' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost8',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost8',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '9' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost9',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost9',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '10' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost10',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost10',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '11' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost11',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost11',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '12' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost12',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost12',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() + 1 +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '1' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost1',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost1',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() + 1 +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '2' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost2',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost2',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() + 1 +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '3' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'ncost3',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wcost3',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: 'label.PFANS1012VIEW_ACCOUNT',
            child: [
              {
                code: 'nsum',
                label: 'label.PFANS6009VIEW_MANHOUR2',
                width: 110,
                fix: false,
                filter: true,
              }, {
                code: 'wsum',
                label: 'label.PFANS6009VIEW_COST2',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          },
        ],
        columnsC: [
          {
            code: 'suppliername',
            label: 'label.PFANS6007VIEW_BPCLUBNAME',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '4' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost4',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '5' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost5',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '6' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost6',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '7' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost7',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '8' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost8',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '9' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost9',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '10' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost10',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '11' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost11',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '12' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost12',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() + 1 +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '1' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost1',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() + 1 +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '2' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost2',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: moment().years() + 1 +
              this.$t('label.PFANS2005FORMVIEW_YEAR') +
              '3' +
              this.$t('label.PFANS2005FORMVIEW_MONTH'),
            child: [
              {
                code: 'cost3',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          }, {
            code: 'SERVICE',
            label: 'label.PFANS1012VIEW_ACCOUNT',
            child: [
              {
                code: 'sum',
                label: 'label.PFANS6009VIEW_MANHOUR3',
                width: 110,
                fix: false,
                filter: true,
              },
            ],
          },
        ],
        number: this.$t('label.PFANS6009VIEW_MANHOUR3'),
        arryaLabels: [
          this.$t('label.PFANS6009VIEW_TOTAL'),
          this.$t('label.PFANS6009VIEW_TOTALEXPENDITURE'),
          this.$t('label.PFANS6009VIEW_EQUIPMENTFUNDS'),
          this.$t('label.PFANS6009VIEW_TRAVELEXPENSES'),
          this.$t('label.PFANS6009VIEW_AVERAGEUNITPRICE'),
        ],
      };
    },
    mounted() {
      this.getById();
      // TAB1
//      for (var i = 0; i < this.array.length; i++) {
//        this.columns[i + 1].label = this.array[i];
//      }

      let year = moment().subtract(3, 'months').year();
      for (var i = 0; i < this.array.length; i++) {
        if (i <= 8) {
          this.columns[i + 1].label = this.array[i].replace('0000', year).replace('Y', this.yearLabel).replace('M', this.monthLabel);
        } else {
          this.columns[i + 1].label = this.array[i].replace('0000', year + 1).replace('Y', this.yearLabel).replace('M', this.monthLabel);
          ;
        }
      }


//       // TAB2
//       this.columnsB = JSON.parse(JSON.stringify(this.columns));
//       for (var i = 0; i < this.array1.length; i++) {
// //        this.columnsB[i + 1].label = this.array1[i];
//         for (var j = 0; j < this.arrayB.length; j++) {
//           this.columnsB[i + 1].child[j].label = this.arrayB[j];
//         }
//       }
//
//       for (var i = 1; i <= 12; i++) {
//         if (i <= 9) {
//           this.columnsB[i].label = this.array1[i - 1].replace('0000', year);
//         } else {
//           this.columnsB[i].label = this.array1[i - 1].replace('0000', year + 1);
//         }
//       }
//
//
//       this.columnsB[13].child[0].label = this.arrayB[0];
//       this.columnsB[13].child[1].label = this.arrayB[1];

      // TAB3
//       this.columnsC = JSON.parse(JSON.stringify(this.columns));
//       for (var i = 0; i < this.array1.length; i++) {
// //        this.columnsC[i + 1].label = this.array1[i];
//         this.columnsC[i + 1].child.splice(1, 1);
//         this.columnsC[i + 1].child[0].label = this.number;
//       }
//
//       for (var i = 1; i <= 12; i++) {
//         if (i <= 9) {
//           this.columnsC[i].label = this.array1[i - 1].replace('0000', year);
//         } else {
//           this.columnsC[i].label = this.array1[i - 1].replace('0000', year + 1);
//         }
//       }
//
//
//       this.columnsC[13].child.splice(1, 1);
//       this.columnsC[13].child[0].label = this.number;

      this.loadTableA(this.form.group_id, this.form.year);
      this.loadTableB(this.form.group_id, this.form.year);
      this.loadTableC(this.form.group_id, this.form.year);

    },
    methods: {
      // rowspan
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (rowIndex > this.tableA.length - 5) {
          if ((columnIndex + 1) % 2 == 0) {
            return {
              rowspan: 1,
              colspan: 2,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        } else {
          if (rowIndex > this.tableA.length - 6) {
            if (columnIndex == 0) {
              return {
                rowspan: 0,
                colspan: 0,
              };
            } else if (columnIndex == 1) {
              return {
                rowspan: 1,
                colspan: 2,
              };
            }
          }
          if (columnIndex == 0 || columnIndex == 1) {
            console.log('return 1,1');
            return [1, 1];
          }
        }
      },
      arraySpanMethod2({row, column, rowIndex, columnIndex}) {
        if (rowIndex > this.tableB.length - 1) {
          if ((columnIndex + 1) % 2 == 0) {
            return {
              rowspan: 1,
              colspan: 2,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        } else {
          if (rowIndex > this.tableB.length - 2) {
            if (columnIndex == 0) {
              return {
                rowspan: 0,
                colspan: 0,
              };
            } else if (columnIndex == 1) {
              return {
                rowspan: 1,
                colspan: 2,
              };
            }
          }
          if (columnIndex == 0 || columnIndex == 1) {
            console.log('return 1,1');
            return [1, 1];
          }
        }
      },
      arraySpanMethod3({row, column, rowIndex, columnIndex}) {
        if (rowIndex > this.tableC.length - 1) {
          if ((columnIndex + 1) % 2 == 0) {
            return {
              rowspan: 1,
              colspan: 2,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        } else {
          if (rowIndex > this.tableC.length - 2) {
            if (columnIndex == 0) {
              return {
                rowspan: 0,
                colspan: 0,
              };
            } else if (columnIndex == 1) {
              return {
                rowspan: 1,
                colspan: 2,
              };
            }
          }
          if (columnIndex == 0 || columnIndex == 1) {
            console.log('return 1,1');
            return [1, 1];
          }
        }
      },
      loadTableA(group_id, yearss) {
        let groupid = '';
        let year = '';
        this.loading = true;
        this.form.group_id = group_id;
        this.form.year = yearss;
        if (this.form.group_id) {
          groupid = this.form.group_id;
        }
        if (this.form.year) {
          year = this.form.year;
        }
        let params = {
          groupid: groupid,
          years: year,
        };
        this.$store
          .dispatch('PFANS6009Store/getCostList', params)
          .then(response => {
            debugger;
            var tableData = response.company;
            var tripData = response.trip;
            var assetData = response.asset;

            for (let j = 0; j < tableData.length; j++) {
              if (tableData[j].bpcompany !== null && tableData[j].bpcompany !== '') {
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
              var key_hour = 'manhour' + i;
              var key_cost = 'cost' + i;
              if (i > 12) {
                key_cost = 'totalcost';
                key_hour = 'totalmanhours';
              }
              for (var j = 0; j < tableData.length; j++) {
                total_manhour += parseFloat(tableData[j][key_hour]);
                total_cost += parseFloat(tableData[j][key_cost]);
              }
              addLine1[key_hour] = parseFloat(total_manhour).toFixed(2);
              addLine1[key_cost] = parseFloat(total_cost).toFixed(2);
              if (total_manhour == 0) {
                addLine2[key_cost] = '0.00';
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
              duration: 5 * 1000,
            });
            this.loading = false;
            this.tableALoading = false;
          });
      },
      loadTableB(group_id, yearss) {
        let groupid = '';
        let year = '';
        this.loading = true;
        this.form.group_id = group_id;
        this.form.year = yearss;
        if (this.form.group_id) {
          groupid = this.form.group_id;
        }
        if (this.form.year) {
          year = this.form.year;
        }
        let params = {
          groupid: groupid,
          years: year,
        };
        this.$store
          .dispatch('PFANS6009Store/getWorktimes', params)
          .then(response => {
            debugger
            this.tableB = [];
            this.optationsB = [];
            let datatableb = [];
            for (let i = 0; i < response.length; i++) {
              this.optationsB.push({
                group_id: response[i].group_id,
                suppliername: response[i].suppliername,
                ncost1: moment(response[i].date).format('MM') === '01' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                ncost2: moment(response[i].date).format('MM') === '02' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                ncost3: moment(response[i].date).format('MM') === '03' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                ncost4: moment(response[i].date).format('MM') === '04' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                ncost5: moment(response[i].date).format('MM') === '05' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                ncost6: moment(response[i].date).format('MM') === '06' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                ncost7: moment(response[i].date).format('MM') === '07' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                ncost8: moment(response[i].date).format('MM') === '08' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                ncost9: moment(response[i].date).format('MM') === '09' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                ncost10: moment(response[i].date).format('MM') === '10' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                ncost11: moment(response[i].date).format('MM') === '11' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                ncost12: moment(response[i].date).format('MM') === '12' ? (response[i].operationform === 'BP024001' ? response[i].worktime : '0') : '0',
                wcost1: moment(response[i].date).format('MM') === '01' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                wcost2: moment(response[i].date).format('MM') === '02' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                wcost3: moment(response[i].date).format('MM') === '03' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                wcost4: moment(response[i].date).format('MM') === '04' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                wcost5: moment(response[i].date).format('MM') === '05' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                wcost6: moment(response[i].date).format('MM') === '06' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                wcost7: moment(response[i].date).format('MM') === '07' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                wcost8: moment(response[i].date).format('MM') === '08' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                wcost9: moment(response[i].date).format('MM') === '09' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                wcost10: moment(response[i].date).format('MM') === '10' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                wcost11: moment(response[i].date).format('MM') === '11' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                wcost12: moment(response[i].date).format('MM') === '12' ? (response[i].operationform === 'BP024002' ? response[i].worktime : '0') : '0',
                nsum: response[i].operationform === 'BP024001' ? response[i].worktime : '0',
                wsum: response[i].operationform === 'BP024002' ? response[i].worktime : '0',
              });
            }
            let nsumcost1 = 0;
            let nsumcost2 = 0;
            let nsumcost3 = 0;
            let nsumcost4 = 0;
            let nsumcost5 = 0;
            let nsumcost6 = 0;
            let nsumcost7 = 0;
            let nsumcost8 = 0;
            let nsumcost9 = 0;
            let nsumcost10 = 0;
            let nsumcost11 = 0;
            let nsumcost12 = 0;
            let wsumcost1 = 0;
            let wsumcost2 = 0;
            let wsumcost3 = 0;
            let wsumcost4 = 0;
            let wsumcost5 = 0;
            let wsumcost6 = 0;
            let wsumcost7 = 0;
            let wsumcost8 = 0;
            let wsumcost9 = 0;
            let wsumcost10 = 0;
            let wsumcost11 = 0;
            let wsumcost12 = 0;
            let nsum = 0;
            let wsum = 0;
            let sum = 0;
            for (let i = 0; i < this.optationsB.length; i++) {
              nsumcost1 += parseFloat(this.optationsB[i].ncost1);
              nsumcost2 += parseFloat(this.optationsB[i].ncost2);
              nsumcost3 += parseFloat(this.optationsB[i].ncost3);
              nsumcost4 += parseFloat(this.optationsB[i].ncost4);
              nsumcost5 += parseFloat(this.optationsB[i].ncost5);
              nsumcost6 += parseFloat(this.optationsB[i].ncost6);
              nsumcost7 += parseFloat(this.optationsB[i].ncost7);
              nsumcost8 += parseFloat(this.optationsB[i].ncost8);
              nsumcost9 += parseFloat(this.optationsB[i].ncost9);
              nsumcost10 += parseFloat(this.optationsB[i].ncost10);
              nsumcost11 += parseFloat(this.optationsB[i].ncost11);
              nsumcost12 += parseFloat(this.optationsB[i].ncost12);
              nsum += parseFloat(this.optationsB[i].nsum);
              wsumcost1 += parseFloat(this.optationsB[i].wcost1);
              wsumcost2 += parseFloat(this.optationsB[i].wcost2);
              wsumcost3 += parseFloat(this.optationsB[i].wcost3);
              wsumcost4 += parseFloat(this.optationsB[i].wcost4);
              wsumcost5 += parseFloat(this.optationsB[i].wcost5);
              wsumcost6 += parseFloat(this.optationsB[i].wcost6);
              wsumcost7 += parseFloat(this.optationsB[i].wcost7);
              wsumcost8 += parseFloat(this.optationsB[i].wcost8);
              wsumcost9 += parseFloat(this.optationsB[i].wcost9);
              wsumcost10 += parseFloat(this.optationsB[i].wcost10);
              wsumcost11 += parseFloat(this.optationsB[i].wcost11);
              wsumcost12 += parseFloat(this.optationsB[i].wcost12);
              wsum += parseFloat(this.optationsB[i].wsum);
            }
            datatableb.push({
              group_id: '0',
              suppliername: this.$t('label.PFANS1012VIEW_ACCOUNT'),
              ncost1: nsumcost1.toFixed(2),
              ncost2: nsumcost2.toFixed(2),
              ncost3: nsumcost3.toFixed(2),
              ncost4: nsumcost4.toFixed(2),
              ncost5: nsumcost5.toFixed(2),
              ncost6: nsumcost6.toFixed(2),
              ncost7: nsumcost7.toFixed(2),
              ncost8: nsumcost8.toFixed(2),
              ncost9: nsumcost9.toFixed(2),
              ncost10: nsumcost10.toFixed(2),
              ncost11: nsumcost11.toFixed(2),
              ncost12: nsumcost12.toFixed(2),
              wcost1: wsumcost1.toFixed(2),
              wcost2: wsumcost2.toFixed(2),
              wcost3: wsumcost3.toFixed(2),
              wcost4: wsumcost4.toFixed(2),
              wcost5: wsumcost5.toFixed(2),
              wcost6: wsumcost6.toFixed(2),
              wcost7: wsumcost7.toFixed(2),
              wcost8: wsumcost8.toFixed(2),
              wcost9: wsumcost9.toFixed(2),
              wcost10: wsumcost10.toFixed(2),
              wcost11: wsumcost11.toFixed(2),
              wcost12: wsumcost12.toFixed(2),
              nsum: nsum.toFixed(2),
              wsum: wsum.toFixed(2),
            });
            this.tableB = this.optationsB.concat(datatableb);
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
      loadTableC(group_id, yearss) {
        let groupid = '';
        let year = '';
        this.loading = true;
        this.form.group_id = group_id;
        this.form.year = yearss;
        if (this.form.group_id) {
          groupid = this.form.group_id;
        }
        if (this.form.year) {
          year = this.form.year;
        }
        let params = {
          groupid: groupid,
          years: year,
        };
        this.$store
          .dispatch('PFANS6009Store/getWorkers', params)
          .then(response => {
            this.tableC = [];
            this.optationsC = [];
            let datatablec = [];
            for (let i = 0; i < response.length; i++) {
              this.optationsC.push({
                group_id: response[i].group_id,
                suppliername: response[i].suppliername,
                cost1: moment(response[i].date).format('MM') === '01' ? response[i].counts : '0',
                cost2: moment(response[i].date).format('MM') === '02' ? response[i].counts : '0',
                cost3: moment(response[i].date).format('MM') === '03' ? response[i].counts : '0',
                cost4: moment(response[i].date).format('MM') === '04' ? response[i].counts : '0',
                cost5: moment(response[i].date).format('MM') === '05' ? response[i].counts : '0',
                cost6: moment(response[i].date).format('MM') === '06' ? response[i].counts : '0',
                cost7: moment(response[i].date).format('MM') === '07' ? response[i].counts : '0',
                cost8: moment(response[i].date).format('MM') === '08' ? response[i].counts : '0',
                cost9: moment(response[i].date).format('MM') === '09' ? response[i].counts : '0',
                cost10: moment(response[i].date).format('MM') === '10' ? response[i].counts : '0',
                cost11: moment(response[i].date).format('MM') === '11' ? response[i].counts : '0',
                cost12: moment(response[i].date).format('MM') === '12' ? response[i].counts : '0',
                sum: response[i].counts,
              });
            }
            let sumcost1 = 0;
            let sumcost2 = 0;
            let sumcost3 = 0;
            let sumcost4 = 0;
            let sumcost5 = 0;
            let sumcost6 = 0;
            let sumcost7 = 0;
            let sumcost8 = 0;
            let sumcost9 = 0;
            let sumcost10 = 0;
            let sumcost11 = 0;
            let sumcost12 = 0;
            let sum = 0;
            for (let i = 0; i < this.optationsC.length; i++) {
              sumcost1 += parseFloat(this.optationsC[i].cost1);
              sumcost2 += parseFloat(this.optationsC[i].cost2);
              sumcost3 += parseFloat(this.optationsC[i].cost3);
              sumcost4 += parseFloat(this.optationsC[i].cost4);
              sumcost5 += parseFloat(this.optationsC[i].cost5);
              sumcost6 += parseFloat(this.optationsC[i].cost6);
              sumcost7 += parseFloat(this.optationsC[i].cost7);
              sumcost8 += parseFloat(this.optationsC[i].cost8);
              sumcost9 += parseFloat(this.optationsC[i].cost9);
              sumcost10 += parseFloat(this.optationsC[i].cost10);
              sumcost11 += parseFloat(this.optationsC[i].cost11);
              sumcost12 += parseFloat(this.optationsC[i].cost12);
              sum += parseFloat(this.optationsC[i].sum);
            }
            datatablec.push({
              group_id: '0',
              suppliername: this.$t('label.PFANS1012VIEW_ACCOUNT'),
              cost1: sumcost1.toFixed(2),
              cost2: sumcost2.toFixed(2),
              cost3: sumcost3.toFixed(2),
              cost4: sumcost4.toFixed(2),
              cost5: sumcost5.toFixed(2),
              cost6: sumcost6.toFixed(2),
              cost7: sumcost7.toFixed(2),
              cost8: sumcost8.toFixed(2),
              cost9: sumcost9.toFixed(2),
              cost10: sumcost10.toFixed(2),
              cost11: sumcost11.toFixed(2),
              cost12: sumcost12.toFixed(2),
              sum: sum.toFixed(2),
            });
            this.tableC = this.optationsC.concat(datatablec);
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
      yearChangeA(value) {
        this.form.year = moment(value).format('YYYY');
        this.loadTableA(this.form.group_id, this.form.year);
      },
      yearChangeB(value) {
        this.form.year = moment(value).format('YYYY');
        this.loadTableB(this.form.group_id, this.form.year);
      },
      yearChangeC(value) {
        this.form.year = moment(value).format('YYYY');
        this.loadTableC(this.form.group_id, this.form.year);
      },
      handleTabClick(tab, event) {
        switch (tab.name) {
          case 'first':
            this.loadTableA(this.form.group_id, this.form.year);
            break;
          case 'second':
            this.loadTableB(this.form.group_id, this.form.year);
            break;
          case 'third':
            this.loadTableC(this.form.group_id, this.form.year);
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

        let params = {
          groupid: this.form.group_id,
          years: this.form.year,
        };
        this.$store
          .dispatch('PFANS6009Store/downloadExcel', params)
          .then(response => {
            this.download(response, 'BP社集計一览');
          })
          .catch(() => {
            console.log('no');
          });
      },
      download(data, filename) {
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(
            new Blob([data], {type: 'application/vnd.ms-excel;charset=utf-8'}),
            decodeURI(filename) + '.xlsx',
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
      getById() {
        this.loading = true;
        let role = getCurrentRole();
        const vote = [];
        if (role === '3') {
          vote.push(
            {
              value: this.$store.getters.userinfo.userinfo.groupid,
              lable: this.$store.getters.userinfo.userinfo.groupname,
            },
          );
        } else if (role === '2') {
          let centerId = this.$store.getters.userinfo.userinfo.centerid;
          let orgs = getDownOrgInfo(centerId);
          if (orgs) {
            for (let org of orgs) {
              console.log(org);
              vote.push(
                {
                  value: org._id,
                  lable: org.companyname,
                },
              );
            }
          }

        } else if (role === '1') {
          let centerId = this.$store.getters.userinfo.userinfo.centerid;
          let orgs = getDownOrgInfo(centerId);
          if (orgs) {
            for (let center of orgs) {
              let centers = getDownOrgInfo(center._id);
              if (centers) {
                for (let group of centers) {
                  vote.push(
                    {
                      value: group._id,
                      lable: group.companyname,
                    },
                  );
                }
              }
            }
          }
        }
        const vote1 = [];
        if (this.$store.getters.userinfo.userid === '5e78fefff1560b363cdd6db7'
          || this.$store.getters.userinfo.userid === '5e78b2254e3b194874180f31'
          || this.$store.getters.userinfo.userid === '5e78b2004e3b194874180e21'
          || this.$store.getters.userinfo.userid === '5e78b2064e3b194874180e4d') {
          let centerId = '5e7858a08f4316308435112c';
          let orgs = getDownOrgInfo(centerId);
          if (orgs) {
            for (let center of orgs) {
              let centers = getDownOrgInfo(center._id);
              if (centers) {
                for (let group of centers) {
                  vote1.push(
                    {
                      value: group._id,
                      lable: group.companyname,
                    },
                  );
                }
              }
            }
          }
          this.optionsdata = vote1;
        } else {
          this.optionsdata = vote;
        }
        this.form.group_id = this.optionsdata[0].value;
        //if (this.form.group_id) {
        this.loadTableA(this.form.group_id, this.form.year);
        this.loadTableB(this.form.group_id, this.form.year);
        this.loadTableC(this.form.group_id, this.form.year);
        //}
        this.loading = false;
      },
      changeGroupA(val) {
        this.form.group_id = val;
        //if (this.form.group_id) {
        this.loadTableA(this.form.group_id, this.form.year);
        //}
      },
      changeGroupB(val) {
        this.form.group_id = val;
        this.loadTableB(this.form.group_id, this.form.year);

      },
      changeGroupC(val) {
        this.form.group_id = val;
        this.loadTableC(this.form.group_id, this.form.year);

      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
