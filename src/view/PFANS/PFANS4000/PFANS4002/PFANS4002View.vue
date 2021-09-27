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
    name: "PFANS4002View",
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
        Message: false,
        result: false,
        data: [],
        tableList: [],
        title: "title.PFANS4002VIEW",
        rowData: [],
        checkTableData: [],
        transferData: [],
        selectedlist: [],
        org: {},
        departmentData: {},
        columns: [
          {
            code: "customername",
            label: "label.user_name",
            width: 120,
            fix: false,
            filter: false
          },
          {
            code: "jobnumber",
            label: "label.PFANSUSERFORMVIEW_JOBNUMBER",
            width: 110,
            fix: false,
            filter: false
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
            filter: false
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
            filter: false
          },
          // add_fjl_05/22 --添加退职日
          {
            code: "resignation_date",
            label: "label.PFANS2026VIEW_RESIGNATIONDATE",
            width: 120,
            fix: false,
            filter: false
          },
          // add_fjl_05/22 --添加退职日
          // add_ws_06/23 --禅道141
          {
            code: "reason2",
            label: "label.PFANS2026VIEW_CAUSE",
            width: 110,
            fix: false,
            filter: false
          }
          // add_ws_06/23 --禅道141
        ],
        defaultProps: {
          label: "title",
          children: "orgs"
        },
        buttonList: [
          {
            key: "update",
            name: this.$t("label.PFANSUSERVIEW_EDITUSER"),
            disabled: true,
            icon: "el-icon-edit"
          },
        ],
        departmentname: "",
        loading: false,
        currentNodeData: {},
        //ADD-LXX
        enterOrleave: "0", //默认在职的筛选
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
            //离职筛选
            if (this.enterOrleave === "1") {
              if (this.workinghours)
              {
                this.working = this.getworkinghours(this.workinghours);
                this.starttime = this.working.substring(0, 10),
                  this.endTime = this.working.substring(13, 23);
                if (this.starttime != "" || this.endTime != "") {
                  this.tableList = this.tableList.filter(item => {
                    return ( moment(this.starttime).format('YYYY-MM-DD') <=  moment(item.resignation_date).format('YYYY-MM-DD') &&  moment(item.resignation_date).format('YYYY-MM-DD') <= moment(this.endTime).format('YYYY-MM-DD') && moment(item.resignation_date).format('YYYY-MM-DD')<moment(new Date()).format('YYYY-MM-DD') ) && (item.resignation_date !== null && item.resignation_date !== "")
                  });
                }
              }
              else
              {
                this.tableList = this.tableList.filter(item => {
                  return item.resignation_date !== null && item.resignation_date !== "" && moment(item.resignation_date).format('YYYY-MM-DD')<moment(new Date()).format('YYYY-MM-DD')
                });
              }
            } else {
              if (this.workinghours)
              {

                this.working = this.getworkinghours(this.workinghours);
                this.starttime = this.working.substring(0, 10),
                  this.endTime = this.working.substring(13, 23);
                if (this.starttime != "" || this.endTime != "") {
                  this.tableList = this.tableList.filter(item => {
                    return ( moment(this.starttime).format('YYYY-MM-DD') <= moment(item.enterday).format('YYYY-MM-DD') && moment(item.enterday).format('YYYY-MM-DD') <= moment(this.endTime).format('YYYY-MM-DD'))
                  });
                }
              }
              else
              {
                this.tableList = this.tableList.filter(item => {
                  return item.resignation_date === null || item.resignation_date === ""||moment(item.resignation_date).format('YYYY-MM-DD')>=moment(new Date()).format('YYYY-MM-DD')
                });
              }
            }
          }
          //进行时间筛选
          // this.working = this.getworkinghours(this.workinghours);
          // (this.starttime = this.working.substring(0, 10)),
          //   (this.endTime = this.working.substring(13, 23));
          // if (this.starttime != "" || this.endTime != "") {
          //   if (this.enterOrleave === "1")
          //   {
          //     return (this.starttime <= item.enterday && item.enterday <= this.endTime) && (item.resignation_date !== null && item.resignation_date !== "")
          //   }
          //   else
          //   {
          //     this.tableList = this.tableList.filter(item => {
          //       return this.starttime <= item.enterday && item.enterday <= this.endTime
          //     });
          //   }
          // }
        }
      },
      //ADD-LXX
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
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      //ADD_FJL 获取年假信息
      buttonClick(val) {
        this.$store.commit("global/SET_HISTORYURL", this.$route.path);
         if (val === "update") {
          this.$router.push({
            name: "PFANS4002FormView",
            params: {
              _id: this.rowData.userid
            }
          });
        }
      },
      // name: 'PFANS4002FormView',
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
          .dispatch("usersStore/getUserTableList3", params)
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
                // add_fjl_05/22 --添加退职日
                if (_tableList[j].resignation_date)
                  _tableList[j].resignation_date = moment(_tableList[j].resignation_date).format(
                    "YYYY-MM-DD"
                  );
                // add_fjl_05/22 --添加退职日
                if (_tableList[j].birthday)
                  _tableList[j].birthday = moment(_tableList[j].birthday).format(
                    "YYYY-MM-DD"
                  );
                if (_tableList[j].sex === "PR019001") {
                  _tableList[j].sex = this.$t("label.PFANS2002FORMVIEW_BOY");
                } else if (_tableList[j].sex === "PR019002"){
                  _tableList[j].sex = this.$t("label.PFANS2002FORMVIEW_GRIL");
                }
              }
            }
            this.tableList = _tableList;
            this.TABLEList = _tableList;
            this.loading = false;
          })
          .catch(err => {
            this.$message.error({
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
          this.buttonList[0].disabled = false;
        } else {
          this.rowData = {};
          this.buttonList[0].disabled = true;
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
            this.$message.error({
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
          .dispatch("usersStore/getUserTableList3", params)
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
                // add_fjl_05/22 --添加退职日
                if (_tableList[j].resignation_date)
                  _tableList[j].resignation_date = moment(_tableList[j].resignation_date).format(
                    "YYYY-MM-DD"
                  );
                // add_fjl_05/22 --添加退职日
                if (_tableList[j].birthday)
                  _tableList[j].birthday = moment(_tableList[j].birthday).format(
                    "YYYY-MM-DD"
                  );
                //ccm 课题票143 from
                //毕业年月日
                if (_tableList[j].graduationday)
                  _tableList[j].graduationday = moment(_tableList[j].graduationday).format(
                    "YYYY-MM-DD"
                  );
                //仕事年月日
                if (_tableList[j].workday)
                  _tableList[j].workday = moment(_tableList[j].workday).format(
                    "YYYY-MM-DD"
                  );
                //ccm 课题票143 to
                if (this.$i18n) {
                  if (_tableList[j].sex === "PR019001") {
                    _tableList[j].sex = this.$t("label.PFANS2002FORMVIEW_BOY");
                  } else if (_tableList[j].sex === "PR019002"){
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
            // add_fjl --默认在职的筛选
            this.filterInfo();
            // add_fjl
            this.loading = false;
          })
          .catch(err => {
            this.$message.error({
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
