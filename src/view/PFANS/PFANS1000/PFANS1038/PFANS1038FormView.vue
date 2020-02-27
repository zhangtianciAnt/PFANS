<template>
  <EasyNormalContainer
    :buttonList="buttonList"
    :title="titles"
    @buttonClick="buttonClick"
    ref="container"
    v-loading="loading"
  >
    <div slot="customize" style="margin-top:2vw">
      <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane
            label="现实点人员"
            name="first"
          >
            <el-table
              :data="tableData"
              border stripe
              :style="{width:(this.$route.params.type === 0?'51vw':'62.3vw'),marginLeft:(this.$route.params.type === 0?'17%':'11%'),marginTop: '1%'}"
              header-cell-class-name="sub_bg_color_blue">
              <el-table-column
                label="No."
                type="index"
                width="80"
                align="center">
              </el-table-column>
              <el-table-column
                prop="supchinese"
                label="外驻先"
                width="180"
                v-if="this.$route.params.type === 0 ? false : true"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                label="社员名前"
                width="180"
                align="center">
              </el-table-column>
              <el-table-column
                prop="thisyear"
                :label="getThisYearLevel"
                width="180"
                align="center"
                :formatter="formatterDic">
              </el-table-column>
              <el-table-column
                prop="nextyear"
                :label="getNextYearLevel"
                width="180"
                align="center"
              >
                <template slot-scope="scope">
                <el-select size="small" v-model="scope.row.nextyear" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="entermouth"
                label="新规采用入社预定日"
                width="195"
                align="center"
                :formatter="formatterDic">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="新入职人员" name="second">
            <el-table
              :data="newTableData"
              border stripe
              :style="{width:(this.$route.params.type === 0?'70.1vw':'80.1vw'),marginLeft:(this.$route.params.type === 0?'5%':'0%'),marginTop: '1%'}"
              header-cell-class-name="sub_bg_color_blue">
              <el-table-column
                label="No."
                type="index"
                width="80"
                align="center">
              </el-table-column>
              <el-table-column
                prop="supchinese"
                label="外驻先"
                width="160"
                v-if="this.$route.params.type === 0 ? false : true"
                align="center">
                <el-select size="small" v-model="scope.row.supchinese" placeholder="请选择">
                  <el-option
                    v-for="item in externalOption"
                    :key="item.supplierinfor_id"
                    :label="item.supchinese"
                    :value="item.supplierinfor_id">
                  </el-option>
                </el-select>
              </el-table-column>
              <el-table-column
                prop="name"
                label="社员名前"
                width="180"
                align="center">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.name"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="thisyear"
                :label="getThisYearLevel"
                width="180"
                align="center">
                <template slot-scope="scope">
                  <el-select size="small" v-model="scope.row.thisyear" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="nextyear"
                :label="getNextYearLevel"
                width="180"
                align="center"
              >
                <template slot-scope="scope">
                  <el-select size="small" v-model="scope.row.nextyear" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="entermouth"
                label="新规采用入社预定日"
                width="200"
                align="center"
                >
                <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.entermouth"
                  type="month"
                  style="width:10vw"
                  placeholder="请选择"
                  size="small"
                 v-show="!scope.row.isoutside">
                </el-date-picker>
                  <span v-show="scope.row.isoutside">{{scope.row.entermouth}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="isoutside"
                label="是否社外"
                width="100"
                align="center">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isoutside"
                  @change="val => changeOption(val,scope.row)">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, newTableData)"
                    type="danger"
                    size="small"
                    plain
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click="addRow"
                    type="primary"
                    size="small"
                    plain
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import moment from "moment";
  import {getDictionaryInfo} from "../../../../utils/customize";
  export default {
    name: 'PFANS1038FormView',
    components: {
      EasyNormalContainer
    },
    data() {
      return {
        options:[{
          value: 'PR021001',
          label: 'R3'
        },{
          value: 'PR021002',
          label: 'R4'
        },{
          value: 'PR021003',
          label: 'R5'
        },{
          value: 'PR021004',
          label: 'R6'
        },{
          value: 'PR021005',
          label: 'R7'
        },{
          value: 'PR021006',
          label: 'R8A'
        },{
          value: 'PR021007',
          label: 'R8B'
        },{
          value: 'PR021008',
          label: 'R8C'
        },{
          value: 'PR021009',
          label: 'R9A'
        },{
          value: 'PR021010',
          label: 'R9B'
        },{
          value: 'PR021011',
          label: 'R10'
        },{
          value: 'PR021012',
          label: 'R11A'
        },{
          value: 'PR021013',
          label: 'R11B'
        },{
          value: 'PJ053001',
          label: this.$t("label.PFANS1036FORMVIEW_COUNSELORUP")
        },{
          value: 'PJ053002',
          label: this.$t("label.PFANS1036FORMVIEW_CHANCELLORDOWN")
        }],
        loading:false,
        externalOption:"",
        newTableData:[{name:"123",isoutside:false}],
        tableData:[],
        activeName:"first",
        buttonList:[],
        titles: this.$route.params.type === 0 ? "社员计划" : "外驻计划",
        form:{
          year:""
        }
      };
    },
    computed:{
      getThisYearLevel:function () {
           if(this.form.year){
             return this.form.year + "";
           }else{
             this.form.year = moment().subtract(3,'M').format('YYYY');
            return this.form.year + "";
           }
      },
      getNextYearLevel:(parseInt(this.getThisYearLevel) + 1) + ""
    },
    created() {
      this.disabled = this.$route.params.disabled;
      if (!this.disabled) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            icon: "el-icon-check"
          }
        ];
      }
    },
    mounted() {
      if (this.$route.params._id) {
        this.getOne(this.$route.params._id);
      }else{
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.$route.params.type === 0?this.getCustomerInfo(rst.groupId||""):this.getExpatriatesinfor();
        }
      }
    },
    methods: {
      getCustomerInfo(id) {
        this.$store
          .dispatch('PFANS1038Store/getCustomerInfo', id)
          .then(response => {
            debugger
            if (response.length > 0) {
              this.tableData = response.map(
                res => {
                  return {name: res.userinfo.customername, userid: res.userid, thisyear: res.userinfo.rank};
                }
              )
              console.log(this.tableData);
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
          })
      },
      getExpatriatesinfor() {
        this.$store
          .dispatch('PFANS1038Store/getExpatriatesinfor')
          .then(response => {
            debugger
            if (response.length > 0) {
              this.newTableData = response;
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
          })
      },
      getExternal() {
        this.$store
          .dispatch('PFANS1038Store/getExternal')
          .then(response => {
            debugger
            if (response.length > 0) {
              this.externalOption = response;
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
          })
      },
      getOne(id) {
        this.loading = true;
        this.$store
          .dispatch("PFANS1038Store/getOne", id)
          .then(response => {
              this.loading = false;
              this.form = response;
              this.form.employed = JSON.parse(this.form.employed);
              this.form.employed = JSON.parse(this.form.employed);
          })
          .catch(error => {
            Message({
              message: error,
              type: "error",
              duration: 5 * 1000
            });
            this.loading = false;
          });
      },
      formatterDic(row, column) {
        if (column.property === "thisyear") {
          if (row[column.property]) {
            debugger
            let dic = getDictionaryInfo(row[column.property]);
            return dic === null ? "-" : dic.value1;
          } else {
            return "-";
          }
        } else if (column.property === "entermouth") {
          return "-";
        }
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRow() {
        this.newTableData.push({});
      },
      changeOption(val, row) {
        if (val) {
          row.entermouth = "社外";
        }
      },
      buttonClick(val) {
        this.form.employed = JSON.stringify(this.tableData);
        this.form.newentry = JSON.stringify(this.newTableData);
        if (!this.$route.params._id) {
          this.loading = true;
          this.$store
            .dispatch("PFANS1038Store/insert", this.form)
            .then(response => {
              this.loading = false;
              this.$message({
                message: this.$t("normal.success_01"),
                type: "success"
              });
              if (this.$store.getters.historyUrl) {
                this.$router.push(this.$store.getters.historyUrl);
              }
            })
            .catch(err => {
              this.loading = false;
              Message({
                message: err,
                type: "error",
                duration: 5 * 1000
              });
            });
        } else {
          this.loading = true;
          this.form.type = this.$route.params.type;
          this.$store
            .dispatch("PFANS1038Store/update", this.form)
            .then(response => {
              this.loading = false;
              this.$message({
                message: this.$t("normal.success_02"),
                type: "success"
              });
              if (val !== "update") {
                if (this.$store.getters.historyUrl) {
                  this.$router.push(this.$store.getters.historyUrl);
                }
              }
            })
            .catch(err => {
              this.loading = false;
              Message({
                message: err,
                type: "error",
                duration: 5 * 1000
              });
            });
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
