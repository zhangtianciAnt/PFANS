<template>
  <div style="min-height: 100%" class="user_view">
    <el-container
      class="container"
      style="width: 100%"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
    >
      <el-aside width="20rem" style="overflow: hidden" v-show="false">
        <EasyTree
          :defaultlist="data"
          :defaultProps="defaultProps"
          :showFilter="true"
          :showCheckbox="false"
          @nodeClick="handleNodeClick"
          maxheight="20rem"
          minheight="100%"
          ref="treeCom"
          :renderContent="renderContent"
        ></EasyTree>
      </el-aside>
      <el-main style="padding: 0;width: 100%">
        <EasyNormalTable
          :title="title"
          :columns="columns"
          :data="tableList"
          :buttonList="buttonList"
          ref="roletable"
          @buttonClick="buttonClick"
          @rowClick="rowClick"
          :showSelection="isShow"
        >
          <!-- ADD-LXX -->
          <el-select
            v-model="enterOrleave"
            placeholder="请选择"
            slot="customize"
            style="margin-right:1vw"
            @change="filterInfo"
            clearable
          >
            <el-option
              v-for="item in optionsForel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- ADD-LXX -->

          <el-date-picker
            unlink-panels
            class="bigWidth"
            v-model="workinghours"
            style="margin-right:1vw"
            slot="customize"
            type="daterange"
            :end-placeholder="$t('label.enddate')"
            :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
            :start-placeholder="$t('label.startdate')"
            @change="filterInfo"
          ></el-date-picker>
        </EasyNormalTable>
        <el-dialog :visible.sync="daoru" width="50%">
          <div>
            <div style="margin-top: 1rem;margin-left: 28%">
              <el-upload
                drag
                ref="uploader"
                :action="postAction"
                :on-success="handleSuccess"
                :before-upload="handleChange"
                :headers="authHeader"
                :limit="1"
                :on-remove="this.clear"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>
              </el-upload>
            </div>
            <el-row>
              <span v-if="this.resultShow">{{$t('label.PFANS2005FORMVIEW_CG')}}{{this.successCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                v-if="this.resultShow"
              >{{$t('label.PFANS2005FORMVIEW_SB')}}{{this.errorCount}}</span>
            </el-row>
            <span v-if="this.Message">{{this.cuowu}}</span>
            <div v-if="this.result">
              <el-table :data="message">
                <el-table-column
                  :label="$t('label.PFANS2017VIEW_CUHS')"
                  align="center"
                  width="120%"
                  prop="hang"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2017VIEW_ERROR')"
                  align="center"
                  prop="error"
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="pop_download" width="50%" destroy-on-close>
          <el-table :data="downtypes" style="width: 100%">
            <el-table-column prop="name" :label="$t('label.ASSETS1001VIEW_FILENAME')"></el-table-column>

            <el-table-column :label="$t('label.operation')">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDownload(scope.row)">{{$t('button.download2')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import EasyTree from "@/components/EasyTree";
import EasyButtonBar from "@/components/EasyButtonBar";
import EasyNormalTable from "@/components/EasyNormalTable";
import { parseTime, getDictionaryInfo } from "@/utils/customize";
import { Message } from "element-ui";
import moment from "moment";

export default {
  name: "usersView",
  components: {
    EasyTree,
    EasyButtonBar,
    EasyNormalTable
  },
  data() {
    return {
      _tableList: [],
      TABLEList: [],
      totaldata: [],
      cuowu: "",
      working: "",
      workinghours: "",
      starttime: "",
      endTime: "",
      daoru: false,
      successCount: 0,
      errorCount: 0,
      pop_download: false,
      authHeader: { "x-auth-token": getToken() },
      postAction: process.env.BASE_API + "/user/importUser",
      resultShow: false,
      message: [{ hang: "", error: "" }],
      Message: false,
      addActionUrl: "",
      result: false,
      data: [],
      tableList: [],
      downloadLoading: false,
      file: null,
      title: "label.PFANSUSERVIEW_USER",
      rowData: [],
      checkTableData: [],
      transferData: [],
      selectedlist: [],
      org: {},
      departmentData: {},
      isShow: true,
      columns: [
        {
          code: "customername",
          label: "label.user_name",
          width: 120,
          fix: false,
          filter: true
        },
        {
          code: "jobnumber",
          label: "label.PFANSUSERFORMVIEW_JOBNUMBER",
          width: 110,
          fix: false,
          filter: true
        },
        {
          code: "centername",
          label: "label.center",
          width: 120,
          fix: false,
          filter: true
        },
        {
          code: "groupname",
          label: "label.group",
          width: 120,
          fix: false,
          filter: true
        },
        {
          code: "teamname",
          label: "label.team",
          width: 120,
          fix: false,
          filter: true
        },
        {
          code: "enterday",
          label: "label.PFANSUSERVIEW_ENTERDAY",
          width: 120,
          fix: false,
          filter: true
        },
        {
          code: "post",
          label: "label.PFANSUSERVIEW_POST",
          width: 120,
          fix: false,
          filter: true
        },
        {
          code: "rank",
          label: "label.PFANSUSERVIEW_RANK",
          width: 120,
          fix: false,
          filter: true
        },
        {
          code: "sex",
          label: "label.sex",
          width: 90,
          fix: false,
          filter: true
        },
        {
          code: "budgetunit",
          label: "label.budgetunit",
          width: 120,
          fix: false,
          filter: true
        },
        {
          code: "birthday",
          label: "label.PFANSUSERVIEW_BIRTHDAY",
          width: 110,
          fix: false,
          filter: true
        }
      ],
      defaultProps: {
        label: "title",
        children: "orgs"
      },
      buttonList: [
        {
          key: "new",
          name: this.$t("label.PFANSUSERVIEW_NEWUSER"),
          disabled: false,
          icon: "el-icon-plus"
        },
        {
          key: "update",
          name: this.$t("label.PFANSUSERVIEW_EDITUSER"),
          disabled: true,
          icon: "el-icon-edit"
        },
        {
          key: "import",
          name: "button.import",
          disabled: false,
          icon: "el-icon-download"
        },
        {
          key: "export",
          name: "button.export",
          disabled: false,
          icon: "el-icon-upload2"
        },
        {
          key: "export2",
          name: "button.download2",
          disabled: false,
          icon: "el-icon-download"
        }
      ],
      departmentname: "",
      loading: false,
      currentNodeData: {},
      //ADD-LXX
      enterOrleave: "",
      optionsForel: [
        {
          value: "0",
          label: this.$t("label.USERSVIEW_ENTER")
        },
        {
          value: "1",
          label: this.$t("label.USERSVIEW_LEAVE")
        }
      ]
      //ADD-LXX
    };
  },
  methods: {
    //ADD-LXX
    filterInfo() {
      this.tableList = this.TABLEList.slice(0);

      if (this.TABLEList.length > 0) {
        //进行在职离职筛选
        if (this.enterOrleave !== "") {
          //在职筛选
          if (this.enterOrleave === "1") {
            this.tableList = this.tableList.filter(item => {
              return item.enddate === null || item.enddate === "";
            });
          } else {
            this.tableList = this.tableList.filter(item => {
              return item.enddate !== null && item.enddate !== "";
            });
          }
        }
        //进行时间筛选
        this.working = this.getworkinghours(this.workinghours);
        (this.starttime = this.working.substring(0, 10)),
          (this.endTime = this.working.substring(13, 23));
        if (this.starttime != "" || this.endTime != "") {
          this.tableList = this.tableList.filter(item => {
            return this.starttime <= item.enterday && item.enterday <= this.endTime
          });
        }
      }
    },
    //ADD-LXX
    handleDownload(row) {
      this.loading = true;
      this.$store
        .dispatch("usersStore/download", { type: row.type })
        .then(response => {
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
    getworkinghours(workinghours) {
      if (workinghours != null) {
        if (workinghours.length > 0) {
          return (
            moment(workinghours[0]).format("YYYY-MM-DD") +
            " ~ " +
            moment(workinghours[1]).format("YYYY-MM-DD")
          );
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    clickdata() {
      this.working = this.getworkinghours(this.workinghours);
      (this.starttime = this.working.substring(0, 10)),
        (this.endTime = this.working.substring(13, 23));
      let tabledate = [];
      let tabledata = [];
      if (this.TABLEList != "") {
        if (this.starttime == "" && this.endTime == "") {
          for (let i = 0; i < this.TABLEList.length; i++) {
            tabledata.push({
              customername: this.TABLEList[i].customername,
              jobnumber: this.TABLEList[i].jobnumber,
              centername: this.TABLEList[i].centername,
              groupname: this.TABLEList[i].groupname,
              teamname: this.TABLEList[i].teamname,
              enterday: this.TABLEList[i].enterday,
              post: this.TABLEList[i].post,
              rank: this.TABLEList[i].rank,
              sex: this.TABLEList[i].sex,
              budgetunit: this.TABLEList[i].budgetunit,
              birthday: this.TABLEList[i].birthday
            });
          }
          this.tableList = tabledata;
        } else {
          for (let i = 0; i < this.TABLEList.length; i++) {
            if (
              this.starttime <= this.TABLEList[i].enterday &&
              this.TABLEList[i].enterday <= this.endTime
            ) {
              tabledate.push({
                customername: this.TABLEList[i].customername,
                jobnumber: this.TABLEList[i].jobnumber,
                centername: this.TABLEList[i].centername,
                groupname: this.TABLEList[i].groupname,
                teamname: this.TABLEList[i].teamname,
                enterday: this.TABLEList[i].enterday,
                post: this.TABLEList[i].post,
                rank: this.TABLEList[i].rank,
                sex: this.TABLEList[i].sex,
                budgetunit: this.TABLEList[i].budgetunit,
                birthday: this.TABLEList[i].birthday
              });
            }
          }
          this.tableList = tabledate;
        }
      }
    },
    handleChange(file, fileList) {
      this.clear(true);
    },
    clear(safe) {
      this.file = null;
      this.resultShow = false;
      this.Message = false;
      this.result = false;
      if (!safe) {
        if (this.$refs.uploader != undefined) {
          this.$refs.uploader.clearFiles();
        }
      }
    },
    handleSuccess(response, file, fileList) {
      if (response.code !== 0) {
        this.cuowu = response.message;
        this.Message = true;
      } else {
        let datalist = [];
        for (let c = 0; c < response.data.length; c++) {
          let error = response.data[c];
          error = error.substring(0, 3);
          if (this.$i18n) {
            if (error === this.$t("label.PFANS2005FORMVIEW_SB")) {
              this.errorCount = response.data[c].substring(4);
              this.resultShow = true;
            }
            if (error === this.$t("label.PFANS2005FORMVIEW_CG")) {
              this.successCount = response.data[c].substring(4);
              this.resultShow = true;
            }
            if (error === this.$t("label.PFANS2017VIEW_D")) {
              let obj = {};
              var str = response.data[c];
              var aPos = str.indexOf(this.$t("label.PFANS2017VIEW_BAN"));
              var bPos = str.indexOf(this.$t("label.PFANS2017VIEW_DE"));
              var r = str.substr(aPos + 1, bPos - aPos - 1);
              obj.hang = r;
              obj.error = response.data[c].substring(6);
              datalist[c] = obj;
            }
          }
          this.message = datalist;
          this.totaldata = this.message;
          if (this.errorCount === "0") {
            this.result = false;
          } else {
            this.result = true;
          }
        }
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
      //ADD_FJL  获取年龄
      getAge(val) {
          let birthdays = new Date(val);
          let d = new Date();
          let age = 0;
          let agenew = 0;
          age = d.getFullYear() - birthdays.getFullYear();
          agenew = d.getFullYear() - birthdays.getFullYear();
          if (d.getMonth() > birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() > birthdays.getDate())) {
              agenew = age;
          } else {
              agenew = age - 1;
          }
          return agenew;
      },
      //ADD_FJL  获取年龄
      //ADD_FJL 获取年假信息
      getDataList() {
          this.loading = true;
          this.$store
              .dispatch('PFANS2013Store/getDataList', {})
              .then(response => {
                  this._tableList = response;
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
      //ADD_FJL 获取年假信息
    buttonClick(val) {
      if (val === "export") {
        if (this.$refs.roletable.selectedList.length === 0) {
          Message({
            message: this.$t("normal.info_01"),
            type: "info",
            duration: 2 * 1000
          });
          return;
        }
        this.selectedlist = this.$refs.roletable.selectedList;
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = [
            this.$t("label.user_name"),//姓名
            this.$t("label.PFANSUSERFORMVIEW_JOBNUMBER"),//工号
            this.$t("label.center"),//center
            this.$t("label.group"),//group
            this.$t("label.team"),//team
            this.$t("label.PFANSUSERVIEW_ENTERDAY"),//入社时间
            this.$t("label.PFANSUSERVIEW_POST"),//职务
            this.$t("label.PFANSUSERVIEW_RANK"),//RANK
            this.$t("label.sex"),//性别
            this.$t("label.budgetunit"),//预算编码
            this.$t("label.PFANSUSERVIEW_BIRTHDAY"),//生年月日
            this.$t("label.PFANSUSERFORMVIEW_ADFIELD"),//AD域账号
            this.$t("label.PFANSUSERVIEW_NATIONALITY"),//国籍
            this.$t("label.PFANSUSERFORMVIEW_NATION"),//民族
            this.$t("label.PFANSUSERFORMVIEW_REGISTER"),//户籍
            this.$t("label.PFANSUSERFORMVIEW_ADDRESS"),//住所
            this.$t("label.PFANSUSERFORMVIEW_GRADUATION"),//最终毕业学校
            this.$t("label.PFANSUSERFORMVIEW_SPECIALTY"),//专业
            this.$t("label.PFANSUSERFORMVIEW_EXPERIENCE"),//是否有工作经验
            this.$t("label.PFANSUSERFORMVIEW_IDNUMBER"),//身份证号码
            this.$t("label.PFANSUSERFORMVIEW_GRADUATIONDAY"),//毕业年月日
            this.$t("label.PFANSUSERFORMVIEW_DEGREE"),//最终学位
            this.$t("label.PFANSUSERFORMVIEW_WORKDAY"),//仕事开始年月日
            this.$t("label.PFANS1012VIEW_PERSONALCODE"),//员工ID
            this.$t("label.PFANSUSERFORMVIEW_LABORCONTRACTTYPE"),//劳动合同类型
            this.$t("label.PFANSUSERFORMVIEW_AGE"),//年龄
            this.$t("label.PFANSUSERFORMVIEW_CHILDREN"),//是否独生子女
            this.$t("label.PFANSUSERFORMVIEW_ANNUALBREAKS"),//今年年休数(残)
            this.$t("label.PFANSUSERFORMVIEW_ANNUALYEAR"),//今年年休数
            this.$t("label.PFANSUSERFORMVIEW_UPGRADED"),//升格升号年月日
            this.$t("label.PFANSUSERFORMVIEW_SEATNUMBER"),//银行账号
            this.$t("label.PFANSUSERFORMVIEW_FIXEDATE"),//银行账号
            this.$t("label.PFANSUSERFORMVIEW_BEFOREBASICSALARY"),//変更前基本工资
            this.$t("label.PFANSUSERFORMVIEW_CHANGEDUTYSALARY"),//変更前职责工资
            this.$t("label.PFANSUSERFORMVIEW_CURRENTBASICSALARY"),//现基本工资
            this.$t("label.PFANSUSERFORMVIEW_CURRENTDUTYSALARY"),//现职责工资
            this.$t("label.PFANSUSERFORMVIEW_FEEDINGCHANGEDAY"),//給料変更日
            this.$t("label.PFANSUSERFORMVIEW_YANGLAOINSURANCE"),//养老保险基数
            this.$t("label.PFANSUSERFORMVIEW_YILIAOINSURANCE"),//医疗保险基数
            this.$t("label.PFANSUSERFORMVIEW_SHIYEINSURANCE"),//失业保险基数
            this.$t("label.PFANSUSERFORMVIEW_GONGSHANGINSURANCE"),//工伤保险基数
            this.$t("label.PFANSUSERFORMVIEW_SHENGYUINSURANCE"),//生育保险基数
            this.$t("label.PFANSUSERFORMVIEW_HOUSEINSURANCE"),//住房公积金缴纳基数
          ];
          const filterVal = [
            "customername",//姓名
            "jobnumber",//工号
            "centername",//center
            "groupname",//group
            "teamname",//team
            "enterday",//入社时间
            "post",//职务
            "rank",//RANK
            "sex",//性别
            "budgetunit",//预算编码
            "birthday",//生年月日
            "adfield",//AD域账号
            "nationality",//国籍
            "nation",//民族
            "register",//户籍
            "address",//住所
            "graduation",//最终毕业学校
            "specialty",//专业
            "experience",//是否有工作经验
            "idnumber",//身份证号码
            "graduationday",//毕业年月日
            "degree",//最终学位
            "workday",//仕事开始年月日
            "personalcode",//员工ID
            "laborcontracttype",//劳动合同类型
            "age",//年龄
            "children",//是否独生子女
            "annualyearto",//今年年休数(残)
            "annualyear",//今年年休数
            "upgraded",//升格升号年月日
            "seatnumber",//银行账号
            "fixedate",//固定期限締切日
            "after",//変更前基本工资
            "before",//変更前职责工资
            "basic",//现基本工资
            "duty",//现职责工资
            "date",//給料変更日
            "yanglaoinsurance",//养老保险基数
            "yiliaoinsurance",//医疗保险基数
            "shiyeinsurance",//失业保险基数
            "gongshanginsurance",//工伤保险基数
            "shengyuinsurance",//生育保险基数
            "houseinsurance",//住房公积金缴纳基数
          ];
          const list = this.selectedlist;
            for (let h = 0; h < list.length; h++) {
                //劳动合同类型
                if(list[h].laborcontracttype !== '' && list[h].laborcontracttype !== null){
                    if(list[h].laborcontracttype === '0'){
                        list[h].laborcontracttype = this.$t('label.PFANSUSERFORMVIEW_FIXEDTIME');
                    } else if(list[h].laborcontracttype === '1'){
                        list[h].laborcontracttype = this.$t('label.PFANSUSERFORMVIEW_NOFIXEDTIME');
                    }
                }
                //升格升号年月日
                if(list[h].upgraded !== '' && list[h].upgraded !== null){
                    list[h].upgraded = moment(list[h].upgraded).format('YYYY-MM-DD');
                }
                //固定期限締切日
                if(list[h].fixedate !== '' && list[h].fixedate !== null){
                    list[h].fixedate = moment(list[h].fixedate).format('YYYY-MM-DD');
                }
                //是否独生子女
                if(list[h].children !== '' && list[h].children !== null) {
                    if (list[h].children === '1') {
                        list[h].children = this.$t('label.yes');
                    } else if (list[h].children === '0') {
                        list[h].children = this.$t('label.no');
                    }
                }
                //是否有工作经验
                if(list[h].experience !== '' && list[h].experience !== null) {
                    if (list[h].experience === '1') {
                        list[h].experience = this.$t('label.PFANSUSERFORMVIEW_NO');
                    } else if (list[h].experience === '0') {
                        list[h].experience = this.$t('label.PFANSUSERFORMVIEW_YES');
                    }
                }
                //最终学位
                if(list[h].degree !== '' && list[h].degree !== null) {
                    let degreeinfo = getDictionaryInfo(list[h].degree);
                    if (degreeinfo) {
                        list[h].degree = degreeinfo.value1;
                    }
                }
                //年龄
                list[h].age = this.getAge(list[h].birthday);
                //変更前基本工资,変更前职责工资,现基本工资,现职责工资,給料変更日
                if(list[h].gridData !== '' && list[h].gridData !== null && list[h].gridData !== undefined && list[h].gridData.length > 0 ){
                    for (let d = 0; d < list[h].gridData.length; d++) {
                        list[h].after = list[h].gridData[d].after;
                        list[h].before = list[h].gridData[d].before;
                        list[h].basic = list[h].gridData[d].basic;
                        list[h].duty = list[h].gridData[d].duty;
                        list[h].date = list[h].gridData[d].date;
                    }
                }
                //去年年休数(残)
                for (let t = 0; t < this._tableList.length; t++) {
                    if(list[h].userid === this._tableList[t].user_id){
                        list[h].annualyearto = this._tableList[t].remaining_annual_leave_thisyear;
                    }
                }
            }
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel(tHeader, data, this.$t("menu.PERSONNEL"));
        });
      }
      if (val === "import") {
        this.daoru = true;
        this.clear(false);
      }
      if (val === "export2") {
        this.pop_download = true;
      }
      this.$store.commit("global/SET_HISTORYURL", this.$route.path);
      if (val === "new") {
        this.$router.push({
          name: "usersFormView",
          params: {
            _org: this.org
          }
        });
      } else if (val === "setRole") {
        this.$router.push({
          name: "usersToRoleView",
          params: {
            _id: this.rowData.userid
          }
        });
      } else if (val === "update") {
        this.$router.push({
          name: "usersFormView",
          params: {
            _id: this.rowData.userid
          }
        });
      } else if (val === "disableUser") {
        this.disableUser();
      }
    },
    disableUser() {
      this.loading = true;
      let params = {
        userid: this.rowData.userid,
        status: this.rowData.status === "0" ? "1" : "0"
      };
      this.$store
        .dispatch("usersStore/disableUser", params)
        .then(() => {
          this.handleNodeClick(this.currentNodeData);
          this.loading = false;
        })
        .catch(err => {
          Message({
            message: err,
            type: "error",
            duration: 5 * 1000
          });
          this.loading = false;
        });
    },
    handleNodeClick(data) {
      let select = this.getOrgInformation(data._id);
      this.rowClick();
      this.loading = true;
      this.currentNodeData = data;
      let params = {
        orgid: data._id,
        orgtype: data.type
      };
      if (select) {
        params = {
          orgid: "",
          orgtype: ""
        };
      }
      this.$store
        .dispatch("usersStore/getUserTableList", params)
        .then(response => {
          let _tableList = [];
          if (response.length > 0) {
            response.map(d => {
              let o = {};
              Object.assign(o, d.userinfo, d);
              delete o.userinfo;
              _tableList.push(o);
            });

            for (var j = 0; j < _tableList.length; j++) {
              let result = "";
              for (var i = 0; i < _tableList[j].departmentid.length; i++) {
                let departName = this.getDepartmentNameById(
                  _tableList[j].departmentid[i]
                );
                if (departName !== "") {
                  result += departName + ",";
                }
              }
              result = result.substring(0, result.lastIndexOf(","));
              _tableList[j].departmentname = result;
              _tableList[j].status === "0"
                ? (_tableList[j].statusname = this.$t(
                    "label.PFANSUSERVIEW_ENABLE"
                  ))
                : (_tableList[j].statusname = this.$t(
                    "label.PFANSUSERVIEW_FORBIDDEN"
                  ));
              if (
                _tableList[j].rank &&
                getDictionaryInfo(_tableList[j].rank.value1)
              ) {
                _tableList[j].rank = getDictionaryInfo(
                  _tableList[j].rank
                ).value1;
              }
              if (_tableList[j].enterday)
                _tableList[j].enterday = moment(_tableList[j].enterday).format(
                  "YYYY-MM-DD"
                );
              if (_tableList[j].birthday)
                _tableList[j].birthday = moment(_tableList[j].birthday).format(
                  "YYYY-MM-DD"
                );
              if (_tableList[j].sex === "PR019001") {
                _tableList[j].sex = this.$t("label.PFANS2002FORMVIEW_BOY");
              } else {
                _tableList[j].sex = this.$t("label.PFANS2002FORMVIEW_GRIL");
              }
            }
          }
          this.tableList = _tableList;
          this.TABLEList = _tableList;
          this.loading = false;
        })
        .catch(err => {
          Message({
            message: err,
            type: "error",
            duration: 5 * 1000
          });
          this.loading = false;
        });
    },
    rowClick(row) {
      if (row) {
        this.rowData = row;
        this.buttonList[1].disabled = false;
        this.buttonList[2].disabled = false;
        this.buttonList[3].disabled = false;
      } else {
        this.rowData = {};
        this.buttonList[1].disabled = true;
        this.buttonList[2].disabled = true;
        this.buttonList[3].disabled = true;
      }
    },
    buildDepartmentData(data) {
      for (var i in data) {
        this.departmentData[data[i]._id] = data[i].title;
        if (data[i].hasOwnProperty("orgs")) {
          this.buildDepartmentData(data[i].orgs);
        }
      }
    },
    getDepartmentNameById(id) {
      if (this.departmentData.hasOwnProperty(id)) {
        return this.departmentData[id];
      }
      return "";
    },
    getInitData() {
      this.loading = true;
      this.$store
        .dispatch("orgTreeStore/getOrgTree")
        .then(response => {
          if (response) {
            this.data = [response];
            this.departmentData = {};
            this.buildDepartmentData(this.data);
          }
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
      let params = {
        orgid: "",
        orgtype: ""
      };
      this.$store
        .dispatch("usersStore/getUserTableList", params)
        .then(response => {
          let _tableList = [];
          if (response.length > 0) {
            response.map(d => {
              let o = {};
              Object.assign(o, d.userinfo, d);
              delete o.userinfo;
              _tableList.push(o);
            });
            for (var j = 0; j < _tableList.length; j++) {
              let result = "";
              if (_tableList[j].departmentid != null) {
                for (var i = 0; i < _tableList[j].departmentid.length; i++) {
                  let departName = this.getDepartmentNameById(
                    _tableList[j].departmentid[i]
                  );
                  if (departName !== "") {
                    result += departName + ",";
                  }
                }
                result = result.substring(0, result.lastIndexOf(","));
                _tableList[j].departmentname = result;
              }
              if (this.$i18n) {
                _tableList[j].status === "0"
                  ? (_tableList[j].statusname = this.$t(
                      "label.PFANSUSERVIEW_ENABLE"
                    ))
                  : (_tableList[j].statusname = this.$t(
                      "label.PFANSUSERVIEW_FORBIDDEN"
                    ));
              }

              if (_tableList[j].post && getDictionaryInfo(_tableList[j].post))
                _tableList[j].post = getDictionaryInfo(
                  _tableList[j].post
                ).value1;
              if (_tableList[j].rank && getDictionaryInfo(_tableList[j].rank))
                _tableList[j].rank = getDictionaryInfo(
                  _tableList[j].rank
                ).value1;
              if (_tableList[j].enterday)
                _tableList[j].enterday = moment(_tableList[j].enterday).format(
                  "YYYY-MM-DD"
                );
              if (_tableList[j].birthday)
                _tableList[j].birthday = moment(_tableList[j].birthday).format(
                  "YYYY-MM-DD"
                );
              if (this.$i18n) {
                if (_tableList[j].sex === "PR019001") {
                  _tableList[j].sex = this.$t("label.PFANS2002FORMVIEW_BOY");
                } else {
                  _tableList[j].sex = this.$t("label.PFANS2002FORMVIEW_GRIL");
                }
              }

              if (
                _tableList[j].budgetunit !== null &&
                _tableList[j].budgetunit !== ""
              ) {
                let letbudge = getDictionaryInfo(_tableList[j].budgetunit);
                if (letbudge) {
                  _tableList[j].budgetunit = letbudge.value1;
                }
              }
            }
          }
          this.tableList = _tableList;
          this.TABLEList = _tableList;
          this.loading = false;
        })
        .catch(err => {
          Message({
            message: err,
            type: "error",
            duration: 5 * 1000
          });
          this.loading = false;
        });
    },

    getOrgInformation(id) {
      let org = {};
      let select = false;
      if (id && this.$refs.treeCom.$refs.treeCom.getNode(id)) {
        if (this.$refs.treeCom.$refs.treeCom.getNode(id).level === 1) {
          return true;
        }
        let node = id;
        let type = this.$refs.treeCom.$refs.treeCom.getNode(id).data.type || 0;
        for (let index = parseInt(type); index >= 1; index--) {
          if (parseInt(type) === index && ![1, 2].includes(parseInt(type))) {
            org.teamname = this.$refs.treeCom.$refs.treeCom.getNode(
              node
            ).data.departmentname;
            org.teamid = this.$refs.treeCom.$refs.treeCom.getNode(
              node
            ).data._id;
          }
          if (index === 2) {
            org.groupname = this.$refs.treeCom.$refs.treeCom.getNode(
              node
            ).data.departmentname;
            org.groupid = this.$refs.treeCom.$refs.treeCom.getNode(
              node
            ).data._id;
          }
          if (index === 1) {
            org.centername = this.$refs.treeCom.$refs.treeCom.getNode(
              node
            ).data.companyname;
            org.centerid = this.$refs.treeCom.$refs.treeCom.getNode(
              node
            ).data._id;
          }
          node = this.$refs.treeCom.$refs.treeCom.getNode(node).parent.data._id;
        }
        this.org = org;
      } else {
        select = true;
      }
      return select;
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style="font-size:0.8rem">
          <el-tooltip content={node.label} placement="top-end" effect="light">
            <span>{node.label}</span>
          </el-tooltip>
        </span>
      );
    }
  },
  mounted() {
    if (this.$store.getters.useraccount._id === "5e78b17ef3c8d71e98a2aa30" || this.$store.getters.useraccount._id === "5e78b2034e3b194874180e37") {
      this.buttonList = [
        {
          key: "new",
          name: this.$t("label.PFANSUSERVIEW_NEWUSER"),
          disabled: false,
          icon: "el-icon-plus"
        },
        {
          key: "setRole",
          name: this.$t("label.PFANSUSERVIEW_SETTINGROLES"),
          disabled: false,
          icon: "el-icon-plus"
        },
        {
          key: "update",
          name: this.$t("label.PFANSUSERVIEW_EDITUSER"),
          disabled: true,
          icon: "el-icon-edit"
        },
        {
          key: "import",
          name: "button.import",
          disabled: false,
          icon: "el-icon-download"
        },
        {
          key: "export",
          name: "button.export",
          disabled: false,
          icon: "el-icon-upload2"
        },
        {
          key: "export2",
          name: "button.download2",
          disabled: false,
          icon: "el-icon-download"
        }
      ];
    }
    this.getInitData();
    this.getDataList();
    this.$store.commit("global/SET_OPERATEID", "");
    this.$store.commit("usersStore/SET_ORGS", this.$refs.treeCom.$refs.treeCom);
  },
  computed: {
    downtypes() {
      return [{ name: this.$t("menu.user"), type: 0 }];
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.user_view {
  $bodercolor: rgba(0, 0, 0, 0.2);

  .container {
    min-height: 30rem;
    width: 95%;
    left: 0;
    right: 0;
    /*margin: 2% auto;*/
    background-color: rgb(255, 255, 255);
    border-radius: 0.5rem;
  }

  .box-card {
    min-height: 28rem;
  }
  .el-aside {
    color: rgb(53, 23, 23);
    border-right: 0.1rem solid #ebeef5;
  }

  .title {
    font-size: 1.6rem;
  }

  .invform {
    min-height: 18rem;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
