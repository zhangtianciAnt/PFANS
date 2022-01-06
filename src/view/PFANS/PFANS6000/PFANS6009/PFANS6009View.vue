<template>
  <div>
    <EasyNormalTable
      v-show="region === '1'"
      ref="container1"
      v-loading="loading"
      :buttonList="buttonList"
      :columns="columns"
      :data="this.tableA"
      :rowClassName="rowClassNameA"
      :showIndex="showIndex"
      :span-method="this.arraySpanMethod"
      :title="title"
      @buttonClick="buttonClick"
    >
      <el-date-picker
        slot="customize"
        v-model="form.year"
        :placeholder="$t('normal.error_09')"
        format="yyyy"
        style="width:8vw "
        type="year" @change="yearChangeA">
      </el-date-picker>
      <el-select slot="customize" v-model="form.group_id"
                 style="width: 13vw" @change="changeGroupA">
        <el-option
          v-for="item in optionsdata"
          :key="item.value"
          :label="item.lable"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select slot="customize" v-model="region" style="width: 10vw" @change="changeregion">
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
      v-show="region === '2'"
      ref="container2"
      v-loading="loading"
      :buttonList="buttonList"
      :columns="columnsB"
      :data="this.tableB"
      :rowClassName="rowClassNameB"
      :showIndex="showIndex"
      :span-method="this.arraySpanMethod2"
      :title="title"
      @buttonClick="buttonClick"
    >
      <el-date-picker
        slot="customize"
        v-model="form.year"
        :placeholder="$t('normal.error_09')"
        format="yyyy"
        style="width:8vw "
        type="year" @change="yearChangeB">
      </el-date-picker>
      <el-select slot="customize" v-model="form.group_id"
                 style="width: 13vw" @change="changeGroupB">
        <el-option
          v-for="item in optionsdata"
          :key="item.value"
          :label="item.lable"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select slot="customize" v-model="region" style="width: 10vw" @change="changeregion">
        <el-option :label="$t('label.PFANS6009TAB1')" value="1"></el-option>
        <el-option :label="$t('label.PFANS6009TAB2')" value="2"></el-option>
        <el-option :label="$t('label.PFANS6009TAB3')" value="3"></el-option>
      </el-select>
    </EasyNormalTable>
    <EasyNormalTable
      v-show="region === '3'"
      ref="container3"
      v-loading="loading"
      :buttonList="buttonList"
      :columns="columnsC"
      :data="this.tableC"
      :rowClassName="rowClassNameC"
      :showIndex="showIndex"
      :span-method="this.arraySpanMethod3"
      :title="title"
      @buttonClick="buttonClick"
    >
      <el-date-picker
        slot="customize"
        v-model="form.year"
        :placeholder="$t('normal.error_09')"
        format="yyyy"
        style="width:8vw "
        type="year" @change="yearChangeC">
      </el-date-picker>
      <el-select slot="customize" v-model="form.group_id"
                 style="width: 13vw" @change="changeGroupC">
        <el-option
          v-for="item in optionsdata"
          :key="item.value"
          :label="item.lable"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select slot="customize" v-model="region" style="width: 10vw" @change="changeregion">
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
import moment from 'moment';
import {getCurrentRoleNew, getOrgInfo} from '@/utils/customize';

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
      region: '1',
      columns: [
        {
          code: 'bpcompany',
          label: 'label.PFANS6009VIEW_BPCOMPANY',
          width: 160,
          fix: true,
          filter: true,
        },
        {
          code: 'four',
          label: '',
          child: [
            {
              // region add_qhr_20210907  bp社统计每月加入实际费用列
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'manhour4f',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'cost4f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'manhour5f',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'cost5f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'manhour6f',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'cost6f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'manhour7f',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'cost7f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'manhour8f',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'cost8f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'manhour9f',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'cost9f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'manhour10f',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'cost10f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'manhour11f',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'cost11f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'manhour12f',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'cost12f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'manhour1f',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'cost1f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [{
                code: 'manhour2f',
                label: 'label.PFANS6009VIEW_MANHOUR',
                width: 100,
                fix: false,
              },
                {
                  code: 'cost2f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                }],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'manhour3f',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'cost3f',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
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
              code: 'yuti',
              label: 'label.PFANS6009VIEW_YUTI',
              child: [
                {
                  code: 'totalmanhour',
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
            },
            {
              code: 'feiyong',
              label: 'label.PFANS6009VIEW_FEIYONG',
              child: [
                {
                  code: 'totalmanhourf',
                  label: 'label.PFANS6009VIEW_MANHOUR',
                  width: 100,
                  fix: false,
                },
                {
                  code: 'totalcostf',
                  label: 'label.PFANS6009VIEW_COST',
                  width: 100,
                  fix: false,
                },
              ],
            },
            // endregion add_qhr_20210907  bp社统计每月加入实际费用列
          ],
          width: 540,
          fix: false,
        },
      ],
      buttonList: [
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
          width: 160,
          fix: true,
          filter: true,
        },
        {
          code: 'SERVICE1',
          label:
            '4' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'aprilgn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'aprilgw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE2',
          label:
            '5' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'maygn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'maygw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE3',
          label:
            '6' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'junegn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'junegw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE4',
          label:
            '7' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'julygn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'julygw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE5',
          label:
            '8' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'augustgn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'augustgw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE6',
          label:
            '9' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'septembergn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'septembergw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE7',
          label:
            '10' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'octobergn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'octobergw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE8',
          label:
            '11' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'novembergn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'novembergw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE9',
          label:
            '12' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'decembergn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'decembergw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE10',
          label:
            '1' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'januarygn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'januarygw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE11',
          label:
            '2' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'februarygn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'februarygw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE12',
          label:
            '3' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'marchgn',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'marchgw',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICE13',
          label: 'label.PFANS1012VIEW_ACCOUNT',
          child: [
            {
              code: 'nsum',
              label: 'label.PFANS6009VIEW_MANHOUR2',
              width: 110,
              fix: false,
              filter: false,
            }, {
              code: 'wsum',
              label: 'label.PFANS6009VIEW_COST2',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        },
      ],
      columnsC: [
        {
          code: 'suppliername',
          label: 'label.PFANS6007VIEW_BPCLUBNAME',
          width: 160,
          fix: true,
          filter: true,
        },
        {
          code: 'SERVICEC1',
          label:
            '4' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'april',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC2',
          label:
            '5' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'may',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC3',
          label:
            '6' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'june',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC4',
          label:
            '7' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'july',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC5',
          label:
            '8' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'august',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC6',
          label:
            '9' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'september',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC7',
          label:
            '10' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'october',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC8',
          label:
            '11' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'november',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC9',
          label:
            '12' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'december',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC10',
          label:
            '1' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'january',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC11',
          label:
            '2' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'february',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC12',
          label:
            '3' +
            this.$t('label.PFANS2005FORMVIEW_MONTH'),
          child: [
            {
              code: 'march',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
            },
          ],
        }, {
          code: 'SERVICEC13',
          label: 'label.PFANS1012VIEW_ACCOUNT',
          child: [
            {
              code: 'sum',
              label: 'label.PFANS6009VIEW_MANHOUR3',
              width: 110,
              fix: false,
              filter: false,
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

    let year = moment().subtract(3, 'months').year();
    for (var i = 0; i < this.array.length; i++) {
      if (i <= 8) {
        this.columns[i + 1].label = this.array[i].replace('0000', '').replace('Y', '').replace('M', this.monthLabel);
      } else {
        this.columns[i + 1].label = this.array[i].replace('0000', '').replace('Y', '').replace('M', this.monthLabel);
      }
    }
    this.loadTableA(this.form.group_id, this.form.year);
    this.loadTableB(this.form.group_id, this.form.year);
    this.loadTableC(this.form.group_id, this.form.year);

  },
  methods: {
    rowClassNameA({row, rowIndex}) {
      if (row.bpcompany === this.$t('label.PFANS6009VIEW_TOTAL') || row.bpcompany === this.$t('label.PFANS6009VIEW_AVERAGEUNITPRICE') || row.bpcompany === this.$t('label.PFANS6009VIEW_TRAVELEXPENSES') || row.bpcompany === this.$t('label.PFANS6009VIEW_EQUIPMENTFUNDS') || row.bpcompany === this.$t('label.PFANS6009VIEW_TOTALEXPENDITURE')) {
        return 'sub_bg_color_Darkgrey';
      }
    },
    rowClassNameB({row, rowIndex}) {
      if (row.group_id === '0') {
        return 'sub_bg_color_Darkgrey';
      }
    },
    rowClassNameC({row, rowIndex}) {
      if (row.group_id === '0') {
        return 'sub_bg_color_Darkgrey';
      }
    },
    changeregion(val) {
      if (val === '1') {
        this.loadTableA(this.form.group_id, this.form.year);
      } else if (val === '2') {
        this.loadTableB(this.form.group_id, this.form.year);
      } else if (val === '3') {
        this.loadTableC(this.form.group_id, this.form.year);
      }
    },
    // rowspan
    arraySpanMethod({row, column, rowIndex, columnIndex}) {
      if (rowIndex > this.tableA.length - 1) {
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
        if (rowIndex > this.tableA.length - 2) {
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
      //if (this.form.group_id) {
      groupid = this.form.group_id;
      //}
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
          var tableData = response;
          let arrayAdate = [];
          let addLine1 = {}, addLine2 = {}, addLine5 = {};
          for (var i = 1; i <= 13; i++) {
            var total_manhour = 0, total_cost = 0, total_manhourf = 0, total_costf = 0;
            var key_hour = 'manhour' + i;
            var key_cost = 'cost' + i;
            var key_hourf = 'manhour' + i + 'f';
            var key_costf = 'cost' + i + 'f';
            if (i > 12) {
              key_cost = 'totalcost';
              key_hour = 'totalmanhour';
              key_costf = 'totalcostf';
              key_hourf = 'totalmanhourf';
            }
            for (var j = 0; j < tableData.length; j++) {
              total_manhour += parseFloat(tableData[j][key_hour]);
              total_cost += parseFloat(tableData[j][key_cost]);
              total_manhourf += parseFloat(tableData[j][key_hourf]);
              total_costf += parseFloat(tableData[j][key_costf]);
            }
            addLine1[key_hour] = parseFloat(total_manhour).toFixed(2);
            addLine1[key_cost] = parseFloat(total_cost).toFixed(2);
            addLine1[key_hourf] = parseFloat(total_manhourf).toFixed(2);
            addLine1[key_costf] = parseFloat(total_costf).toFixed(2);
            addLine5[key_cost] = (parseFloat(total_cost)).toFixed(2);
          }
          arrayAdate.push(addLine1);
          tableData.push(Object.assign(arrayAdate[0], {bpcompany: this.arryaLabels[0]}));
          this.tableA = tableData;
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
    loadTableB(group_id, yearss) {
      let groupid = '';
      let year = '';
      this.loading = true;
      this.form.group_id = group_id;
      this.form.year = yearss;
      //if (this.form.group_id) {
      groupid = this.form.group_id;
      //}
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
          this.tableB = [];
          this.optationsB = [];
          let datatableb = [];
          for (let i = 0; i < response.length; i++) {
            this.optationsB.push({
              group_id: response[i].group_ID,
              suppliername: response[i].suppliername,
              aprilgn: response[i].aprilgn === '0' ? '0.00' : response[i].aprilgn,
              aprilgw: response[i].aprilgw === '0' ? '0.00' : response[i].aprilgw,
              maygn: response[i].maygn === '0' ? '0.00' : response[i].maygn,
              maygw: response[i].maygw === '0' ? '0.00' : response[i].maygw,
              junegn: response[i].junegn === '0' ? '0.00' : response[i].junegn,
              junegw: response[i].junegw === '0' ? '0.00' : response[i].junegw,
              julygn: response[i].julygn === '0' ? '0.00' : response[i].julygn,
              julygw: response[i].julygw === '0' ? '0.00' : response[i].julygw,
              augustgn: response[i].augustgn === '0' ? '0.00' : response[i].augustgn,
              augustgw: response[i].augustgw === '0' ? '0.00' : response[i].augustgw,
              septembergn: response[i].septembergn === '0' ? '0.00' : response[i].septembergn,
              septembergw: response[i].septembergw === '0' ? '0.00' : response[i].septembergw,
              octobergn: response[i].octobergn === '0' ? '0.00' : response[i].octobergn,
              octobergw: response[i].octobergw === '0' ? '0.00' : response[i].octobergw,
              novembergn: response[i].novembergn === '0' ? '0.00' : response[i].novembergn,
              novembergw: response[i].novembergw === '0' ? '0.00' : response[i].novembergw,
              decembergn: response[i].decembergn === '0' ? '0.00' : response[i].decembergn,
              decembergw: response[i].decembergw === '0' ? '0.00' : response[i].decembergw,
              januarygn: response[i].januarygn === '0' ? '0.00' : response[i].januarygn,
              januarygw: response[i].januarygw === '0' ? '0.00' : response[i].januarygw,
              februarygn: response[i].februarygn === '0' ? '0.00' : response[i].februarygn,
              februarygw: response[i].februarygw === '0' ? '0.00' : response[i].februarygw,
              marchgn: response[i].marchgn === '0' ? '0.00' : response[i].marchgn,
              marchgw: response[i].marchgw === '0' ? '0.00' : response[i].marchgw,
              nsum: (Number(response[i].aprilgn) + Number(response[i].maygn) + Number(response[i].junegn) + Number(response[i].julygn)
                + Number(response[i].augustgn) + Number(response[i].septembergn) + Number(response[i].octobergn)
                + Number(response[i].novembergn) + Number(response[i].decembergn) + Number(response[i].januarygn) + Number(response[i].februarygn) + Number(response[i].marchgn)).toFixed(2),
              wsum: (Number(response[i].aprilgw) + Number(response[i].maygw) + Number(response[i].junegw) + Number(response[i].julygw)
                + Number(response[i].augustgw) + Number(response[i].septembergw) + Number(response[i].octobergw)
                + Number(response[i].novembergw) + Number(response[i].decembergw) + Number(response[i].januarygw) + Number(response[i].februarygw) + Number(response[i].marchgw)).toFixed(2),
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
            nsumcost1 += parseFloat(this.optationsB[i].aprilgn);
            nsumcost2 += parseFloat(this.optationsB[i].maygn);
            nsumcost3 += parseFloat(this.optationsB[i].junegn);
            nsumcost4 += parseFloat(this.optationsB[i].julygn);
            nsumcost5 += parseFloat(this.optationsB[i].augustgn);
            nsumcost6 += parseFloat(this.optationsB[i].septembergn);
            nsumcost7 += parseFloat(this.optationsB[i].octobergn);
            nsumcost8 += parseFloat(this.optationsB[i].novembergn);
            nsumcost9 += parseFloat(this.optationsB[i].decembergn);
            nsumcost10 += parseFloat(this.optationsB[i].januarygn);
            nsumcost11 += parseFloat(this.optationsB[i].februarygn);
            nsumcost12 += parseFloat(this.optationsB[i].marchgn);
            nsum += parseFloat(this.optationsB[i].nsum);
            wsumcost1 += parseFloat(this.optationsB[i].aprilgw);
            wsumcost2 += parseFloat(this.optationsB[i].maygw);
            wsumcost3 += parseFloat(this.optationsB[i].junegw);
            wsumcost4 += parseFloat(this.optationsB[i].julygw);
            wsumcost5 += parseFloat(this.optationsB[i].augustgw);
            wsumcost6 += parseFloat(this.optationsB[i].septembergw);
            wsumcost7 += parseFloat(this.optationsB[i].octobergw);
            wsumcost8 += parseFloat(this.optationsB[i].novembergw);
            wsumcost9 += parseFloat(this.optationsB[i].decembergw);
            wsumcost10 += parseFloat(this.optationsB[i].januarygw);
            wsumcost11 += parseFloat(this.optationsB[i].februarygw);
            wsumcost12 += parseFloat(this.optationsB[i].marchgw);
            wsum += parseFloat(this.optationsB[i].wsum);
          }
          datatableb.push({
            group_id: '0',
            suppliername: this.$t('label.PFANS1012VIEW_ACCOUNT'),
            aprilgn: nsumcost1.toFixed(2),
            maygn: nsumcost2.toFixed(2),
            junegn: nsumcost3.toFixed(2),
            julygn: nsumcost4.toFixed(2),
            augustgn: nsumcost5.toFixed(2),
            septembergn: nsumcost6.toFixed(2),
            octobergn: nsumcost7.toFixed(2),
            novembergn: nsumcost8.toFixed(2),
            decembergn: nsumcost9.toFixed(2),
            januarygn: nsumcost10.toFixed(2),
            februarygn: nsumcost11.toFixed(2),
            marchgn: nsumcost12.toFixed(2),
            aprilgw: wsumcost1.toFixed(2),
            maygw: wsumcost2.toFixed(2),
            junegw: wsumcost3.toFixed(2),
            julygw: wsumcost4.toFixed(2),
            augustgw: wsumcost5.toFixed(2),
            septembergw: wsumcost6.toFixed(2),
            octobergw: wsumcost7.toFixed(2),
            novembergw: wsumcost8.toFixed(2),
            decembergw: wsumcost9.toFixed(2),
            januarygw: wsumcost10.toFixed(2),
            februarygw: wsumcost11.toFixed(2),
            marchgw: wsumcost12.toFixed(2),
            nsum: nsum.toFixed(2),
            wsum: wsum.toFixed(2),
          });
          this.tableB = this.optationsB.concat(datatableb);
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
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
      //if (this.form.group_id) {
      groupid = this.form.group_id;
      //}
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
              april: response[i].april,
              may: response[i].may,
              june: response[i].june,
              july: response[i].july,
              august: response[i].august,
              september: response[i].september,
              october: response[i].october,
              november: response[i].november,
              december: response[i].december,
              january: response[i].january,
              february: response[i].february,
              march: response[i].march,
              sum: Number(response[i].april) + Number(response[i].may) + Number(response[i].june)
                + Number(response[i].july) + Number(response[i].august) + Number(response[i].september) +
                Number(response[i].october) + Number(response[i].november) + Number(response[i].december) +
                Number(response[i].january) + Number(response[i].february) + Number(response[i].march),
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
            sumcost1 += parseFloat(this.optationsC[i].april);
            sumcost2 += parseFloat(this.optationsC[i].may);
            sumcost3 += parseFloat(this.optationsC[i].june);
            sumcost4 += parseFloat(this.optationsC[i].july);
            sumcost5 += parseFloat(this.optationsC[i].august);
            sumcost6 += parseFloat(this.optationsC[i].september);
            sumcost7 += parseFloat(this.optationsC[i].october);
            sumcost8 += parseFloat(this.optationsC[i].november);
            sumcost9 += parseFloat(this.optationsC[i].december);
            sumcost10 += parseFloat(this.optationsC[i].january);
            sumcost11 += parseFloat(this.optationsC[i].february);
            sumcost12 += parseFloat(this.optationsC[i].march);
            sum += parseFloat(this.optationsC[i].sum);
          }
          datatablec.push({
            group_id: '0',
            suppliername: this.$t('label.PFANS1012VIEW_ACCOUNT'),
            april: sumcost1,
            may: sumcost2,
            june: sumcost3,
            july: sumcost4,
            august: sumcost5,
            september: sumcost6,
            october: sumcost7,
            november: sumcost8,
            december: sumcost9,
            january: sumcost10,
            february: sumcost11,
            march: sumcost12,
            sum: sum,
          });
          this.tableC = this.optationsC.concat(datatablec);
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
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
      this.loading = true;
      let params = {
        groupid: this.form.group_id,
        years: this.form.year,
      };
      this.$store
        .dispatch('PFANS6009Store/downloadExcel', params)
        .then(response => {
          this.download(response, 'BP社集計一览');
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
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
      //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 start
      let role = getCurrentRoleNew();
      const vote = [];
      if (role === '3') {//CENTER
        vote.push(
          {
            value: this.$store.getters.userinfo.userinfo.centerid,
            lable: this.$store.getters.userinfo.userinfo.centername,
          },
        );
        //add ccm 0112 兼职部门
        if (this.$store.getters.userinfo.userinfo.otherorgs) {
          for (let others of this.$store.getters.userinfo.userinfo.otherorgs) {
            if (others.centerid) {
              this.$store.getters.orgGroupList.filter((item) => {
                if (item.centerid === others.centerid) {
                  vote.push(
                    {
                      value: item.centerid,
                      lable: item.centername,
                    },
                  );
                }
              });
            }
          }
        }
        //add ccm 0112 兼职部门
      } else if (role === '2') {//副总经理
        this.$store.getters.orgGroupList.filter((item) => {
          if (item.virtualuser === this.$store.getters.userinfo.userid) {
            vote.push(
              {
                value: item.centerid,
                lable: item.centername,
              },
            );
          }
        });
        //add ccm 0112 兼职部门
        if (this.$store.getters.userinfo.userinfo.otherorgs) {
          for (let others of this.$store.getters.userinfo.userinfo.otherorgs) {
            if (others.centerid) {
              this.$store.getters.orgGroupList.filter((item) => {
                if (item.centerid === others.centerid) {
                  vote.push(
                    {
                      value: item.centerid,
                      lable: item.centername,
                    },
                  );
                }
              });
            }
          }
        }
        //add ccm 0112 兼职部门
      } else if (role === '4') //GM
      {
        let centers = getOrgInfo(this.$store.getters.userinfo.userinfo.centerid);
        if (centers) {
          if (centers.encoding === null || centers.encoding === '' || centers.encoding === undefined) {
            vote.push(
              {
                value: this.$store.getters.userinfo.userinfo.groupid,
                lable: this.$store.getters.userinfo.userinfo.groupname,
              },
            );
          }
        }
      }

      const vote1 = [];
      if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
        || this.$store.getters.roles.indexOf('11') != -1 //总经理
        || this.$store.getters.roles.indexOf('16') != -1 //财务部长
        || this.$store.getters.roles.indexOf('18') != -1//企划部长
        || this.$store.getters.roles.indexOf('22') != -1)//外注管理担当
      {
        this.$store.getters.orgGroupList.filter((item) => {
          vote1.push(
            {
              value: item.centerid,
              lable: item.centername,
            },
          );
        });
        this.optionsdata = vote1;
      } else {
        this.optionsdata = vote;
      }
      //去重
      let letoptionsdata = [];
      let arrId = [];
      for (var item of this.optionsdata) {
        if (arrId.indexOf(item['lable']) == -1) {
          arrId.push(item['lable']);
          letoptionsdata.push(item);
        }
      }
      //针对经营管理统计到group修改 start
      let incfmyList = [];
      for (let item of letoptionsdata) {
        if (getOrgInfo(item.value).encoding == '') {
          incfmyList.push(item.value);
        }
      }
      if (incfmyList.length > 0) {
        for (let item of incfmyList) {
          letoptionsdata = letoptionsdata.filter(letitem => letitem.value != item);
        }
        let orgInfo = [];
        for (let item of incfmyList) {
          if (item) {
            if (getOrgInfo(item).orgs.length != 0) {
              orgInfo.push(getOrgInfo(item).orgs);
            }
          }
        }
        let groInfo = orgInfo[0].filter(item => item.type == '2');
        for (let item of groInfo) {
          letoptionsdata.push(
            {
              value: item._id,
              lable: item.title,
            },
          );
        }
      }
      //针对经营管理统计到group修改 end
      this.optionsdata = [];
      if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
        || this.$store.getters.roles.indexOf('11') != -1 //总经理
        || this.$store.getters.roles.indexOf('16') != -1 //财务部长
        || this.$store.getters.roles.indexOf('18') != -1//企划部长
        || this.$store.getters.roles.indexOf('22') != -1)//外注管理担当
      {
        this.optionsdata.push(
          {
            value: 'all',
            lable: this.$t('label.PFANS6009VIEW_QUANSHE'),
          },
        );
      }
      for (let item of letoptionsdata) {
        this.optionsdata.push(
          {
            value: item.value,
            lable: item.lable,
          },
        );
      }
      if (this.optionsdata.length > 0) {
        this.form.group_id = this.optionsdata[0].value;
      }
      //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 end
      //if (this.form.group_id) {
      this.loadTableA(this.form.group_id, this.form.year);
      this.loadTableB(this.form.group_id, this.form.year);
      this.loadTableC(this.form.group_id, this.form.year);
      //}
      this.loading = false;
    },
    changeGroupA(val) {
      this.form.group_id = val;
      this.loadTableA(this.form.group_id, this.form.year);
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
