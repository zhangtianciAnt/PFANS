<template>
  <div class="dpSupIndex" style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         @buttonClick="buttonClick"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane :label="title" name="first">
            <el-row>
              <el-col :span="8">
                <dicselect
                  :code="code14"
                  @change="changeType"
                  style="width: 20vw"
                >
                </dicselect>
              </el-col>
            </el-row>
            <el-row style="padding-top: 20px">
              <el-table :cell-class-name="rowheight" :data="data1" border header-cell-class-name="sub_bg_color_blue"
                        ref="eltable1" stripe>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL1')" prop="title1" width="120">
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="title2" name="second">
            <el-table :cell-class-name="rowheight" :data="data2" :span-method="spanmethod2" border header-cell-class-name="sub_bg_color_blue"
                      ref="eltable2" stripe>
              <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL1')" prop="title1" width="120">
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL2')" prop="title2" width="120">
              </el-table-column>
              <el-table-column :formatter="formatter" :label="$t('label.PFANS1027FORMVIEW_COL3')" prop="title3"
                               show-overflow-tooltip width="150">
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL4T')">
                <el-table-column :formatter="formatter" :label="$t('label.PFANS1027FORMVIEW_COL4T1')" prop="title4T1"
                                 show-overflow-tooltip width="120">
                </el-table-column>
                <el-table-column :formatter="formatter" :label="$t('label.PFANS1027FORMVIEW_COL4T2')" prop="title4T2"
                                 show-overflow-tooltip width="120">
                </el-table-column>
                <el-table-column :formatter="formatter" :label="$t('label.PFANS1027FORMVIEW_COL4T3')" prop="title4T3"
                                 show-overflow-tooltip width="120">
                </el-table-column>
                <el-table-column :formatter="formatter" :label="$t('label.PFANS1027FORMVIEW_COL4T4')" prop="title4T4"
                                 show-overflow-tooltip width="120">
                </el-table-column>
                <el-table-column :formatter="formatter" :label="$t('label.PFANS1027FORMVIEW_COL4T5')" prop="title4T5"
                                 show-overflow-tooltip width="120">
                </el-table-column>
                <el-table-column :formatter="formatter" :label="$t('label.PFANS1027FORMVIEW_COL4T6')" prop="title4T6"
                                 show-overflow-tooltip width="120">
                </el-table-column>
                <el-table-column :formatter="formatter" :label="$t('label.PFANS1027FORMVIEW_COL4T7')" prop="title4T7"
                                 show-overflow-tooltip width="120">
                </el-table-column>
                <el-table-column :formatter="formatter" :label="$t('label.PFANS1027FORMVIEW_COL4T8')" prop="title4T8"
                                 show-overflow-tooltip width="120">
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T')">
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T1')" prop="r5" width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.r5">
                      <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in options">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T0')" prop="r5rate" width="150">
                  <template slot-scope="scope">
                    <el-input-number :max="100" :min="0" :step="5" controls-position="right" size="mini"
                                     v-model="scope.row.r5rate"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T2')" prop="r6" width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.r6">
                      <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in options">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T0')" prop="r6rate" width="150">
                  <template slot-scope="scope">
                    <el-input-number :max="100" :min="0" :step="5" controls-position="right" size="mini"
                                     v-model="scope.row.r6rate"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T3')" prop="r81" width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.r81">
                      <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in options">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T0')" prop="r81rate" width="150">
                  <template slot-scope="scope">
                    <el-input-number :max="100" :min="0" :step="5" controls-position="right" size="mini"
                                     v-model="scope.row.r81rate"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T4')" prop="r82" width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.r82">
                      <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in options">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T0')" prop="r82rate" width="150">
                  <template slot-scope="scope">
                    <el-input-number :max="100" :min="0" :step="5" controls-position="right" size="mini"
                                     v-model="scope.row.r82rate"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T5')" prop="r83" width="160">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.r83">
                      <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in options">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T0')" prop="r83rate" width="150">
                  <template slot-scope="scope">
                    <el-input-number :max="100" :min="0" :step="5" controls-position="right" size="mini"
                                     v-model="scope.row.r83rate"></el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>

      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import {getDictionaryInfo, getOrgInfo, getUserInfo} from '@/utils/customize';
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import dicselect from '../../../components/dicselect';
  import EasyNormalTable from '@/components/EasyNormalTable'
  import moment from "moment";
  export default {
    name: "PFANS2027FormView",
    components: {
      dicselect,
      EasyNormalContainer,
      EasyNormalTable
    },
    data() {
      return {
        activeName: 'first',
        title: this.$t("title.PFANS2027VIEW_VIEW"),
        title2: this.$t("title.PFANS2027VIEW_VIEW2"),
        loading: false,
        buttonList: [],
        disabled: false,
        code14: 'PJ103',
        buttonShow: false,
        titleShow: false,
        data1: [],
        data2: [
          {
            index: "1",
            title1: "経営・運営成果",
            title2: "系统联动",
            code: "PJ08901",
            r5: "0",
            r5rate: "0",
            r6: "0",
            r6rate: "0",
            r81: "0",
            r81rate: "0",
            r82: "0",
            r82rate: "0",
            r83: "1",
            r83rate: "40",
          },
          {
            index: "2",
            title1: "経営・運営成果",
            title2: "系统联动",
            code: "PJ08902",
            r5: "0",
            r5rate: "0",
            r6: "0",
            r6rate: "0",
            r81: "0",
            r81rate: "0",
            r82: "0",
            r82rate: "0",
            r83: "1",
            r83rate: "40",
          },
          {
            index: "3",
            title1: "経営・運営成果",
            title2: "系统联动",
            code: "PJ08903",
            r5: "0",
            r5rate: "0",
            r6: "0",
            r6rate: "0",
            r81: "1",
            r81rate: "20",
            r82: "0",
            r82rate: "0",
            r83: "1",
            r83rate: "40",
          },
          {
            index: "4",
            title1: "経営・運営成果",
            title2: "系统联动",
            code: "PJ08904",
            r5: "0",
            r5rate: "0",
            r6: "0",
            r6rate: "0",
            r81: "1",
            r81rate: "20",
            r82: "0",
            r82rate: "0",
            r83: "1",
            r83rate: "40",
          },
          {
            index: "5",
            title1: "PJ管理",
            title2: "系统联动",
            code: "PJ08905",
            r5: "1",
            r5rate: "60",
            r6: "1",
            r6rate: "60",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "60",
            r83: "1",
            r83rate: "20",
          },
          {
            index: "6",
            title1: "PJ管理",
            title2: "系统联动",
            code: "PJ08906",
            r5: "1",
            r5rate: "60",
            r6: "1",
            r6rate: "60",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "60",
            r83: "0",
            r83rate: "0",
          },
          {
            index: "7",
            title1: "PJ管理",
            title2: "系统联动",
            code: "PJ08907",
            r5: "1",
            r5rate: "60",
            r6: "1",
            r6rate: "60",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "60",
            r83: "0",
            r83rate: "0",
          },
          {
            index: "8",
            title1: "PJ管理",
            title2: "系统联动",
            code: "PJ08908",
            r5: "1",
            r5rate: "60",
            r6: "1",
            r6rate: "60",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "60",
            r83: "0",
            r83rate: "0",
          },
          {
            index: "9",
            title1: "意欲",
            title2: "系统联动",
            code: "PJ08909",
            r5: "1",
            r5rate: "40",
            r6: "1",
            r6rate: "40",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "40",
            r83: "1",
            r83rate: "40",
          },
          {
            index: "10",
            title1: "意欲",
            title2: "系统联动",
            code: "PJ08910",
            r5: "1",
            r5rate: "40",
            r6: "1",
            r6rate: "40",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "40",
            r83: "1",
            r83rate: "40",
          },
          {
            index: "11",
            title1: "意欲",
            title2: "系统联动",
            code: "PJ08911",
            r5: "1",
            r5rate: "40",
            r6: "1",
            r6rate: "40",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "40",
            r83: "1",
            r83rate: "40",
          },
          {
            index: "12",
            title1: "意欲",
            title2: "系统联动",
            code: "PJ08912",
            r5: "1",
            r5rate: "40",
            r6: "1",
            r6rate: "40",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "40",
            r83: "1",
            r83rate: "40",
          },
        ],
        options: [
          {
            value: "0",
            label: "-"
          },
          {
            value: "1",
            label: "○"
          }
        ],
        columns: [
          {
            code: 'userName',
            label: 'label.PFANS2027VIEW_NAME',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'rnName',
            label: 'label.PFANS2027VIEW_RN',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'enterdayFormat',
            label: 'label.PFANS2027VIEW_DATE',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'groupName',
            label: 'label.PFANS2027VIEW_GROUP2',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'teamName',
            label: 'label.PFANS2027VIEW_TEAM',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'differenceName',
            label: 'label.PFANS2027VIEW_FORM',
            width: 120,
            fix: false,
            filter: false,
          },
        ]
      }
    },
    created() {
      this.disabled = this.$route.params.disabled;
      if (this.disabled) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            disabled: false,
            icon: "el-icon-check"
          }
        ];
      }
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch("PFANS2027Store/getOne", {"lunarbonus_id": this.$route.params._id})
        .then(response => {
          if (response.lunarbasic.length > 0) {
            this.data2 = response.lunarbasic;
          }
          for (let item of response.lunardetail) {
            let userinfo = getUserInfo(item.user_id);
            if (userinfo) {
              item.userName = userinfo.userinfo.customername
            }
            let dicinfo = getDictionaryInfo(item.rn)
            if(dicinfo){
              item.rnName = dicinfo.value1;
            }
            let orgs = getOrgInfo(item.group_id)
            if(orgs){
              item.groupName = orgs.companyname
            }
            orgs = getOrgInfo(item.team_id)
            if(orgs){
              item.teamName = orgs.companyname
            }
            if(item.difference === '1'){
              item.differenceName =this.$t("label.PFANSUSERFORMVIEW_NEWSTAFF");
            }else if(item.difference === '2'){
              item.differenceName =this.$t("label.PFANSUSERFORMVIEW_OLDSTAFF");
            }

            item.enterdayFormat = moment(item.enterday).format('YYYY-MM-DD')
          }
          this.data1 = response.lunardetail;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          Message({
            message: err,
            type: "error",
            duration: 5 * 1000
          });
        });
    },
    methods: {
      formatter(row, column) {
        if (column.property === "title3") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value1;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T1") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value2;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T2") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value3;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T3") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value4;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T4") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value5;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T5") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value6;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T6") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value7;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T7") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value8;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T8") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value9;
            } else {
              return "";
            }
          }
        }
      },
      rowheight({row, column, rowIndex, columnIndex}) {
        let val = row[column.columnKey];
        return 'row_height_left';
      },
      spanmethod2({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 12 || columnIndex === 14 || columnIndex === 16 || columnIndex === 18 || columnIndex === 20) {
          if (rowIndex === 0) {
            return {
              rowspan: 4,
              colspan: 1
            };
          } else if (rowIndex === 4) {
            return {
              rowspan: 4,
              colspan: 1
            };
          } else if (rowIndex === 8) {
            return {
              rowspan: 4,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      changeType() {

      },
      buttonClick(val) {

      }
    },
    watch: {
      data2: {
        handler() {
          for (let i = 0; i < this.data2.length; i++) {
            if (i === 0 || i === 4 || i === 8) {
              this.data2[i + 1].r5rate = this.data2[i].r5rate;
              this.data2[i + 2].r5rate = this.data2[i].r5rate;
              this.data2[i + 3].r5rate = this.data2[i].r5rate;

              this.data2[i + 1].r6rate = this.data2[i].r6rate;
              this.data2[i + 2].r6rate = this.data2[i].r6rate;
              this.data2[i + 3].r6rate = this.data2[i].r6rate;

              this.data2[i + 1].r81rate = this.data2[i].r81rate;
              this.data2[i + 2].r81rate = this.data2[i].r81rate;
              this.data2[i + 3].r81rate = this.data2[i].r81rate;

              this.data2[i + 1].r82rate = this.data2[i].r82rate;
              this.data2[i + 2].r82rate = this.data2[i].r82rate;
              this.data2[i + 3].r82rate = this.data2[i].r82rate;

              this.data2[i + 1].r83rate = this.data2[i].r83rate;
              this.data2[i + 2].r83rate = this.data2[i].r83rate;
              this.data2[i + 3].r83rate = this.data2[i].r83rate;
            }
          }
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .dpSupIndex {
    .row_height_left {
      height: 40px;
      font-size: 0.75rem;
      padding: 0px;
      text-align: left;
      background-color: transparent !important;
    }
  }
</style>
