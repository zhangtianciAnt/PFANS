<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
      :noback="noback"
      @disabled="setdisabled"
      ref="container"
      v-loading="loading"
    >
      <div slot="customize" style="width: 100%">
        <el-row style="padding-top: 30px">
          <el-col :span="5">
            <el-date-picker
              v-model="form.main.pd_date" @change="change"
              type="month">
            </el-date-picker>
          </el-col>
          <el-col :span="6">
            <div align="right">

                <el-select v-model="form.main.group_id" style="width: 20vw"
                           @change="changeGroup">
                  <el-option
                    v-for="item in optionsdata"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value">
                  </el-option>
                </el-select>

            </div>
          </el-col>
        </el-row>
        <el-row style="padding-top: 20px">
        <plx-table-grid
          :datas="tableData"
          border ref="plx"
          stripe use-virtual :pagination-show="paginationShow"
          style="width: 100%;height: calc(100vh - 200px - 2rem)"
          tooltip-effect="dark"
          cell-class-name = "row_height_left" :row-height="rowheight"
          highlight-current-row
          header-cell-class-name="sub_bg_color_blue"
        >
          <!--checkbox-->
          <!--<plx-table-column type="selection" width="55"></plx-table-column>-->
          <!-- 序号-->
          <plx-table-column
            :label="$t('label.PFANS2026FORMVIEW_ORDERNUMBER')"
            align="center"
            type="index"
            fixed="left"
            width="50"
          ></plx-table-column>
          <!-- 名前-->
          <plx-table-column
            :label="$t('label.PFANS2007VIEW_NAME')"
            align="center"
            prop="username"
            fixed="left"
            width="70"
          ></plx-table-column>
          <!-- 卒業年-->
          <plx-table-column
            :label="$t('label.PFANS2024VIEW_GRADUATIONYEAR')"
            align="center"
            width="65"
            prop="graduation1"
          ></plx-table-column>
          <!-- 会社名-->
          <plx-table-column sortable
            :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')"
            align="left"
            prop="company"
            width="160"
          ></plx-table-column>
          <!-- 查定时间-->
          <!--<plx-table-column :label="$t('label.PFANS6005VIEW_CHECKTIME')" align="center" width="250">-->
            <!--<template slot-scope="scope">-->
              <!--<el-date-picker-->
                <!--:disabled="!disabled"-->
                <!--v-model="scope.row.assesstime"-->
                <!--type="datetime"-->
                <!--placeholder="选择日期时间"-->
              <!--&gt;</el-date-picker>-->
            <!--</template>-->
          <!--</plx-table-column>-->
          <!-- 技術スキル-->
          <plx-table-column
            :label="$t('label.PFANS6005FORMVIEW_TECHNOLOGY')"
            align="center"
            width="250"
          >
            <template slot-scope="scope">
              <dicselect
                size="mini"
                :no="scope.row"
                :code="code1"
                :data="scope.row.technical"
                :disabled="!disabled"
                @change="changetechnical"
                style="width: 100%"
              ></dicselect>
            </template>
          </plx-table-column>
          <!-- 技術価値-->
          <plx-table-column
            :label="$t('label.PFANS6005FORMVIEW_TECHNOLOGYVALUE')"
            align="center"
            prop="technology"
            width="100"
          ></plx-table-column>
          <!-- 管理スキル-->
          <plx-table-column
            :label="$t('label.PFANS6005FORMVIEW_MANAGEMENTSKILLS')"
            align="center"
            prop="management"
            width="250"
          >
            <template slot-scope="scope">
              <dicselect
                size="mini"
                :no="scope.row"
                :code="code2"
                :data="scope.row.management"
                :disabled="!disabled"
                @change="changemanagement"
                style="width: 100%"
              ></dicselect>
            </template>
          </plx-table-column>
          <!-- 管理価値-->
          <plx-table-column
            :label="$t('label.PFANS6005FORMVIEW_MANAGEMENTVALUE')"
            align="center"
            prop="value"
            width="100"
          ></plx-table-column>
          <!--   分野スキル-->
          <plx-table-column
            :label="$t('label.PFANS2026FORMVIEW_FIELDSKILLS')"
            align="center"
            prop="fieldskills"
            width="250"
          >
            <template slot-scope="scope">
              <dicselect
                size="mini"
                :no="scope.row"
                :code="code3"
                :data="scope.row.fieldskills"
                :disabled="!disabled"
                @change="changefieldskills"
                style="width: 100%"
              ></dicselect>
            </template>
          </plx-table-column>
          <!-- 分野価値-->
          <plx-table-column
            :label="$t('label.PFANS6005FORMVIEW_FIELDVALUE')"
            align="center"
            prop="field"
            width="100"
          ></plx-table-column>
          <!-- 語学スキル-->
          <plx-table-column
            :label="$t('label.PFANS6005FORMVIEW_LANGUAGESKILLS')"
            align="center"
            prop="language"
            width="250"
          >
            <template slot-scope="scope">
              <dicselect
                size="mini"
                :no="scope.row"
                :code="code4"
                :data="scope.row.language"
                :disabled="!disabled"
                @change="changelanguage"
                style="width: 100%"
              ></dicselect>
            </template>
          </plx-table-column>
          <!--  語学価値-->
          <plx-table-column
            :label="$t('label.PFANS2026FORMVIEW_LANGUAGEVALUE')"
            align="center"
            prop="languagevalue"
            width="100"
          ></plx-table-column>
          <!-- 勤務スキル-->
          <plx-table-column
            :label="$t('label.PFANS6005FORMVIEW_JOBSKILLS')"
            align="center"
            prop="workskills"
            width="250"
          >
            <template slot-scope="scope">
              <dicselect
                size="mini"
                :no="scope.row"
                :code="code5"
                :data="scope.row.workskills"
                :disabled="!disabled"
                @change="changeworkskills"
                style="width: 100%"
              ></dicselect>
            </template>
          </plx-table-column>
          <!--  勤務価値-->
          <plx-table-column
            :label="$t('label.PFANS6005FORMVIEW_WORKVALUE')"
            align="center"
            prop="service"
            width="100"
          ></plx-table-column>
          <!-- 勤続評価-->
          <plx-table-column
            :label="$t('label.PFANS6005FORMVIEW_WORKTIME')"
            align="center"
            prop="evaluation"
            width="250"
          >
            <template slot-scope="scope">
              <dicselect
                size="mini"
                :no="scope.row"
                :code="code6"
                :data="scope.row.evaluation"
                :disabled="!disabled"
                @change="changeevaluation"
                style="width: 100%"
              ></dicselect>
            </template>
          </plx-table-column>
          <!--  勤続価値-->
          <plx-table-column
            :label="$t('label.PFANS6005FORMVIEW_WORKVALUE1')"
            align="center"
            prop="rvicevalue"
            width="100"
          ></plx-table-column>
          <!-- 責任者激励-->
          <plx-table-column :label="$t('label.PFANS6005FORMVIEW_INCENTIVELEADER')" align="center">
            <!-- PSDCD駐在規模-->
            <plx-table-column
              :label="$t('label.PFANS6005FORMVIEW_SERVINGSIZE')"
              align="center"
              prop="psdcdscale"
              width="250"
            >
              <template slot-scope="scope">
                <dicselect
                  size="mini"
                  :no="scope.row"
                  :code="code7"
                  :data="scope.row.psdcdscale"
                  :disabled="!disabled"
                  @change="changepsdcdscale"
                  style="width: 100%"
                ></dicselect>
              </template>
            </plx-table-column>
            <!-- 規模価値-->
            <plx-table-column
              :label="$t('label.PFANS6005FORMVIEW_SIZEVALUE')"
              align="center"
              prop="scalevalue"
              width="100"
            ></plx-table-column>
            <!-- 貢献評価-->
            <plx-table-column
              :label="$t('label.PFANS6005FORMVIEW_CONEVALUATION')"
              align="center"
              prop="contribution"
              width="200"
            >
              <template slot-scope="scope">
                <dicselect
                  size="mini"
                  :no="scope.row"
                  :code="code8"
                  :data="scope.row.contribution"
                  :disabled="!disabled"
                  @change="changecontribution"
                  style="width: 100%"
                ></dicselect>
              </template>
            </plx-table-column>
            <!-- 貢献係数-->
            <plx-table-column
              :label="$t('label.PFANS6005FORMVIEW_CONCOEFFICIENT')"
              align="center"
              prop="coefficient"
              width="100"
            ></plx-table-column>
          </plx-table-column>
          <!--  出向者激励-->
          <plx-table-column :label="$t('label.PFANS6005FORMVIEW_OUTBOUNDMOTIVATION')" align="center">
            <!--出项者PSDCD相当ランク-->
            <plx-table-column
              :label="$t('label.PFANS6005VIEW_PSDCDGRADE')"
              align="center"
              prop="staffpsdcdrank"
              width="250"
            >
              <template slot-scope="scope">
                <dicselect
                  size="mini"
                  :no="scope.row"
                  :code="code9"
                  :data="scope.row.staffpsdcdrank"
                  :disabled="!disabled"
                  @change="changestaffpsdcdrank"
                  style="width: 100%"
                ></dicselect>
              </template>
            </plx-table-column>
            <!--  ランク価値-->
            <plx-table-column
              :label="$t('label.PFANS6005FORMVIEW_LEVELVALUE')"
              align="center"
              prop="rankvalue"
              width="100"
            ></plx-table-column>
            <!--  貢献評価-->
            <plx-table-column
              :label="$t('label.PFANS6005FORMVIEW_CONCOEFFICIENT')"
              align="center"
              prop="butionevaluation"
              width="200"
            >
              <template slot-scope="scope">
                <dicselect
                  size="mini"
                  :no="scope.row"
                  :code="code8"
                  :data="scope.row.butionevaluation"
                  :disabled="!disabled"
                  @change="changebutionevaluation"
                  style="width: 100%"
                ></dicselect>
              </template>
            </plx-table-column>
            <!-- 貢献係数-->
            <plx-table-column
              :label="$t('label.PFANS6005FORMVIEW_SIZEVALUE')"
              align="center"
              prop="butioncoefficient"
              width="100"
            ></plx-table-column>
          </plx-table-column>
          <!-- 開発単価微調整-->
          <plx-table-column
            :label="$t('label.PFANS6005VIEW_PRICEADJUST')"
            align="center"
            prop="unitprice"
            width="130"
          >
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="!disabled"
                controls-position="right"
                :min="-100000" :max="100000"
                v-model="scope.row.unitprice"
                @change="unitpriceBuler"
                style="width: 100%"
              ></el-input-number>
            </template>
          </plx-table-column>
          <!-- 開発総単価-->
          <plx-table-column
            :label="$t('label.PFANS6005VIEW_SUMPRICE')"
            align="center"
            prop="totalunit"
            width="100"
          >
          </plx-table-column>
          <!-- 共通費用-->
          <plx-table-column
            :label="$t('label.PFANS6005FORMVIEW_COMMONCOST')"
            v-if="false"
            align="center"
            prop="common"
            width="100"
          >
          </plx-table-column>
          <!-- PSDCD相当ランク-->
          <plx-table-column
            :label="$t('label.PFANS6005VIEW_PSDCDGRADE')"
            align="center"
            prop="psdcdrank"
            width="150"
          >
            <template slot-scope="scope">
              <dicselect
                size="mini"
                :no="scope.row"
                :code="code9"
                :data="scope.row.psdcdrank"
                :disabled="!disabled"
                @change="changepsdcdrank"
                style="width: 100%"
              ></dicselect>
            </template>
          </plx-table-column>
          <!--  備考-->
          <plx-table-column
            :label="$t('label.PFANS6007VIEW_REMARKS')"
            align="center"
            prop="remarks"
            width="280"
          >
            <template slot-scope="scope">
              <el-input
                size="mini"
                :no="scope.row"
                :disabled="!disabled"
                v-model="scope.row.remarks"
                style="width: 100%"
              ></el-input>
            </template>
          </plx-table-column>
          <!-- 前年単価-->
          <!--<plx-table-column-->
            <!--:label="$t('label.PFANS6005VIEW_LASTYEARPRICE')"-->
            <!--align="center"-->
            <!--prop="yearunit"-->
            <!--width="90"-->
          <!--&gt;-->
          <!--</plx-table-column>-->
        </plx-table-grid>
        </el-row>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import EasyNormalContainer from "@/components/EasyNormalContainer";
import dicselect from "../../../components/dicselect.vue";
import { Message } from "element-ui";
import { getDictionaryInfo, getOrgInfoByUserId } from "@/utils/customize";
import moment from "moment";
import {getCurrentRole, getDownOrgInfo, getUserInfo,getCooperinterviewList} from "../../../../utils/customize";

export default {
  name: "PFANS6005FormView",
  components: {
    dicselect,
    EasyNormalContainer
  },
  data() {
    return {
      paginationShow:false,
      noback: true,
      loading: false,
      baseInfo: {},
      scope: "",
      row: "",
      arr: [], //二维数组初始化变量服务于更改和计算
      tableData: [],
      optionsdata:[],
      code1: "BP015",
      code2: "BP016",
      code3: "BP017",
      code4: "BP018",
      code5: "BP019",
      code6: "BP020",
      code7: "BP021",
      code8: "BP022",
      code9: "BP023",
      title: "title.PFANS6005VIEW",
      disabled: false,
      form:{
        main:{
          pricesetgroup_id:'',
          pd_date:new Date(),
          group_id:''
        },
        drtail:[]
      },
      buttonList: [
        {
          key: "save",
          name: "button.save",
          disabled: false,
          icon: "el-icon-check"
        }
      ]
    };
  },
  mounted() {
    this.getById();
    this.getpriceset(this.form.main.group_id);
  },
  created() {
    this.disabled = true;
    if (this.disable) {
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

  methods: {
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
        this.group_id = this.$store.getters.userinfo.userinfo.groupid;
      } else if (role === '2') {
        let centerId = this.$store.getters.userinfo.userinfo.centerid;
        let orgs = getDownOrgInfo(centerId);
        if (orgs){
          if(orgs.length > 0){
            this.group_id = orgs[0]._id;
          }
          for (let org of orgs) {
            console.log(org)
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
        if (orgs){
          if(orgs.length > 0){
            if(getDownOrgInfo(orgs[0]._id).length > 0){
              this.group_id = getDownOrgInfo(orgs[0]._id)[0]._id;
            }
          }
          for (let center of orgs) {
            let centers = getDownOrgInfo(center._id);
            if (centers){
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
      if (this.$store.getters.userinfo.userid ==='5e78fefff1560b363cdd6db7'
        || this.$store.getters.userinfo.userid ==='5e78b2254e3b194874180f31'
        || this.$store.getters.userinfo.userid ==='5e78b2004e3b194874180e21'
        || this.$store.getters.userinfo.userid ==='5e78b2064e3b194874180e4d')
      {
        let centerId = '5e7858a08f4316308435112c';
        let orgs = getDownOrgInfo(centerId);
        if (orgs){
          if(orgs.length > 0){
            if(getDownOrgInfo(orgs[0]._id).length > 0){
              this.group_id = getDownOrgInfo(orgs[0]._id)[0]._id;
            }
          }
          for (let center of orgs) {
            let centers = getDownOrgInfo(center._id);
            if (centers){
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
      }
      else
      {
        this.optionsdata = vote;
      }
      this.form.main.group_id = this.optionsdata[0].value;
      if (this.form.main.group_id) {
        this.getpriceset(this.form.main.group_id);
      }
      this.loading = false;
    },
    changeGroup(val) {
      this.form.main.group_id = val;
      if (this.form.main.group_id) {
        this.getpriceset(this.form.main.group_id);
      }
    },
    change(){
      this.tableData = [];
      this.getpriceset(this.form.main.group_id);
    },
    setdisabled(val) {
      if (this.$route.params.disabled) {
        this.disabled = val;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    countTotalunit(index) {
      let sum = 0;
      for (let i = 0; i < 6; i++) {
        if (this.arr[index][i] !== "" && this.arr[index][i] !== null)
          sum += this.arr[index][i];
      }
      this.tableData[index].totalunit =
      sum + this.arr[index][6] * this.arr[index][7] + this.arr[index][8] * this.arr[index][9] + this.arr[index][10];
      //sum + this.arr[index][8] * this.arr[index][9];
      this.tableData[index].common = this.arr[index][6] * this.arr[index][7];
    },
    unitpriceBuler(index) {
      this.sum();
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (column.level === 2 && columnIndex >= 0 && columnIndex < 4) {
        return {
          color: "white",
          background: "#99CCFF !important",
          "border-bottom": "1px solid #99CCFF",
          "border-right": "1px solid #73B9FF"
        };
      }
      if (column.level === 2 && columnIndex >= 4 && columnIndex < 8) {
        return {
          color: "white",
          background: "#99CC99 !important",
          "border-bottom": "1px solid #99CCFF",
          "border-right": "1px solid #73CC73"
        };
      }
      if (column.level === 1 && columnIndex >= 0 && columnIndex < 26) {
        return {
          color: "white",
          background: "#005BAA !important"
        };
      } else {
        return {
          color: "black",
          background: "white !important"
        };
      }
    },
    getpriceset(val) {
      this.loading = true;
      this.$store
        .dispatch("PFANS6005Store/getpriceset",{pd_date:moment(this.form.main.pd_date).format("YYYY-MM")})
        .then(response => {
          this.form = response[0];
          if(response[0].detail){
            response = response[0];
            for (let j = 0; j < response.detail.length; j++) {
              response.detail[j].assesstime = moment(new Date()).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              if(response.detail[j].graduation){
                response.detail[j].graduation1 = moment(response.detail[j].graduation).format(
                  "YYYY"
                );
              }

              this.arr[j] = [];
              this.arr[j][0] = parseInt(
                response.detail[j].technology == null ? 0 : response.detail[j].technology
              );
              this.arr[j][1] = parseInt(
                response.detail[j].value == null ? 0 : response.detail[j].value
              );
              this.arr[j][2] = parseInt(
                response.detail[j].field == null ? 0 : response.detail[j].field
              );
              this.arr[j][3] = parseInt(
                response.detail[j].languagevalue == null ? 0 : response.detail[j].languagevalue
              );
              this.arr[j][4] = parseInt(
                response.detail[j].service == null ? 0 : response.detail[j].service
              );
              this.arr[j][5] = parseInt(
                response.detail[j].rvicevalue == null ? 0 : response.detail[j].rvicevalue
              );
              this.arr[j][6] = parseInt(
                response.detail[j].scalevalue == null ? 0 : response.detail[j].scalevalue
              );
              this.arr[j][7] = parseFloat(
                response.detail[j].coefficient == null ? 0 : response.detail[j].coefficient
              );
              this.arr[j][8] = parseInt(
                response.detail[j].rankvalue == null ? 0 : response.detail[j].rankvalue
              );
              this.arr[j][9] = parseFloat(
                response.detail[j].butioncoefficient == null
                  ? 0
                  : response.detail[j].butioncoefficient
              );
              this.arr[j][10] = parseInt(
                response.detail[j].unitprice == null ? 0 : response.detail[j].unitprice
              );

              // if(response.detail[j].user_id)
              // {
              //   let co = getCooperinterviewList(response.detail[j].user_id);
              //   if (co)
              //   {
              //     response.detail[j].group_id = co.group_id;
              //     // if (co.group_id)
              //     // {
              //     //   let group = getOrgInfo(co.group_id);
              //     //   if (group) {
              //     //     response.detail[j].groupname = group.companyname;
              //     //   }
              //     // }
              //   }
              // }
            }
          }
          let tablegroup = [];
          this.form.main.group_id = val;
          debugger;
          tablegroup = response.detail.filter(item => item.groupid === this.form.main.group_id);
          this.tableData = tablegroup;
          this.loading = false;
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
    buttonClick(val) {
      if (val === "save") {
        // if (this.multipleSelection) {
          this.loading = true;
          this.$store
            .dispatch("PFANS6005Store/updatepriceset", this.form)
            .then(response => {
              Message({
                message: this.$t("normal.success_02"),
                type: "success",
                duration: 5 * 1000
              });
              this.loading = false;
              // this.getpriceset();
            })
            .catch(error => {
              Message({
                message: error,
                type: "error",
                duration: 5 * 1000
              });
              this.loading = false;
            });
          // this.getpriceset();
        // } else {
        //   Message({
        //     message: this.$t("normal.info_01"),
        //     type: "error",
        //     duration: 5 * 1000
        //   });
        // }
      }
    },
    changetechnical(val, row) {
      row.technical = val;
      let dictionaryInfo = getDictionaryInfo(val);
      if (dictionaryInfo) {
        row.technology = dictionaryInfo.value2;
      }
      this.sum();
    },
    changemanagement(val, row) {
      row.management = val;
      let dictionaryInfo = getDictionaryInfo(val);
      if (dictionaryInfo) {
        row.value = dictionaryInfo.value2;
      }
      this.sum();
    },
    changefieldskills(val, row) {
      row.fieldskills = val;
      let dictionaryInfo = getDictionaryInfo(val);
      if (dictionaryInfo) {
        row.field = dictionaryInfo.value2;
      }
      this.sum();
    },
    changelanguage(val, row) {
      row.language = val;
      let dictionaryInfo = getDictionaryInfo(val);
      if (dictionaryInfo) {
        row.languagevalue = dictionaryInfo.value2;
      }
      this.sum();
    },
    changeworkskills(val, row) {
      row.workskills = val;
      let dictionaryInfo = getDictionaryInfo(val);
      if (dictionaryInfo) {
        row.service = dictionaryInfo.value2;
      }
      this.sum();
    },
    changeevaluation(val, row) {
      row.evaluation = val;
      let dictionaryInfo = getDictionaryInfo(val);
      if (dictionaryInfo) {
        row.rvicevalue = dictionaryInfo.value2;
      }
      this.sum();
    },
    changepsdcdscale(val, row) {
      row.psdcdscale = val;
      let dictionaryInfo = getDictionaryInfo(val);
      if (dictionaryInfo) {
        row.scalevalue = dictionaryInfo.value2;
      }
      this.sum1();
    },
    changecontribution(val, row) {
      row.contribution = val;
      let dictionaryInfo = getDictionaryInfo(val);
      if (dictionaryInfo) {
        row.coefficient = dictionaryInfo.value2;
      }
      this.sum1();
    },
    changestaffpsdcdrank(val, row) {
      row.staffpsdcdrank = val;
      let dictionaryInfo = getDictionaryInfo(val);
      if (dictionaryInfo) {
        row.rankvalue = dictionaryInfo.value2;
      }
      this.sum();
    },
    changebutionevaluation(val, row) {
      row.butionevaluation = val;
      let dictionaryInfo = getDictionaryInfo(val);
      if (dictionaryInfo) {
        row.butioncoefficient = dictionaryInfo.value2;
      }
      this.sum();
    },
    changepsdcdrank(val, row) {
      row.psdcdrank = val;
      let dictionaryInfo = getDictionaryInfo(val);
      if (dictionaryInfo) {
        row.psdcdrank = dictionaryInfo.value1;
      }
      this.sum();
    },
    sum(){
      for(let item of this.tableData){
        item.totalunit = Number(item.technology) + Number(item.value) + Number(item.field) + Number(item.languagevalue) + Number(item.service)
          + Number(item.rvicevalue)+ Number(item.scalevalue)*Number(item.coefficient) + Number(item.rankvalue)*Number(item.butioncoefficient) + Number(item.unitprice)
        // item.totalunit = Number(item.technology) + Number(item.value) + Number(item.field) + Number(item.languagevalue) + Number(item.service)
        //   + Number(item.rvicevalue)+ Number(item.rankvalue)*Number(item.butioncoefficient)
      }
    },
    sum1(){
      for(let item of this.tableData){
        item.common = Number(item.scalevalue)*Number(item.coefficient);
      }
    }
  },
};
</script>

<style lang="scss">
  .row_height_left {
    font-size: 0.75rem;
    padding: 0px;
    text-align: left;
    background-color: transparent !important;
  }
  .el-table /deep/ .current-row{
    background-color: #BDD8EE;
  }
</style>
