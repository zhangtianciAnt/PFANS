<template>
  <div style="min-height: 100%" class="user_view">
    <el-container class="container" style="width: 100%"  v-loading="loading" element-loading-spinner="el-icon-loading">
      <el-aside width="20rem" style="overflow: hidden">
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
          @buttonClick="buttonClick"
          @rowClick="rowClick"

        ></EasyNormalTable>
      </el-main>
    </el-container>
  </div>
</template>

<script>
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
      data: [],
      tableList: [],
      title: "label.PFANSUSERVIEW_USER",
      rowData: [],
      org: {},
      departmentData: {},
      columns: [
        {
          code: "customername",
          label: "label.user_name",
          width: 150,
          fix: false,
          filter: true
        },
        {
          code: "mobilenumber",
          label: "label.user_mobile",
          width: 120,
          fix: false,
          filter: true
        },
        {
          code: "centername",
          label: "center",
          width: 150,
          fix: false,
          filter: true
        },
        {
          code: "groupname",
          label: "group",
          width: 150,
          fix: false,
          filter: true
        },
        {
          code: "teamname",
          label: "team",
          width: 150,
          fix: false,
          filter: true
        },
        {
          code: "enterday",
          label: "label.PFANSUSERVIEW_ENTERDAY",
          width: 150,
          fix: false,
          filter: true
        },
        {
          code: "post",
          label: "label.PFANSUSERVIEW_POST",
          width: 150,
          fix: false,
          filter: true
        },
        {
          code: "rank",
          label: "label.PFANSUSERVIEW_RANK",
          width: 150,
          fix: false,
          filter: true
        },
        {
          code: "sex",
          label: "label.sex",
          width: 150,
          fix: false,
          filter: true
        },
        {
          code: "nationality",
          label: "label.PFANSUSERVIEW_NATIONALITY",
          width: 150,
          fix: false,
          filter: true
        },
        {
          code: "birthday",
          label: "label.PFANSUSERVIEW_BIRTHDAY",
          width: 150,
          fix: false,
          filter: true
        },
        {
          code: "statusname",
          label: "label.PFANSUSERVIEW_STATUSNAME",
          width: 150,
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
          key: "setRole",
          name: this.$t("label.PFANSUSERVIEW_SETTINGROLES"),
          disabled: true,
          icon: "el-icon-plus"
        },
        {
          key: "update",
          name: this.$t("label.PFANSUSERVIEW_EDITUSER"),
          disabled: true,
          icon: "el-icon-edit"
        },
        {
          key: "disableUser",
          name: this.$t("label.PFANSUSERVIEW_STATUSNAME"),
          disabled: true,
          icon: "el-icon-edit"
        }
      ],
      departmentname: "",
      loading: false,
      currentNodeData: {}
    };
  },
  methods: {
    buttonClick(val) {
      this.$store.commit("global/SET_HISTORYURL", this.$route.path);
      if (val === "new") {
        this.$router.push({
          name: "usersFormView",
          params: {
            _companyid:
              JSON.stringify(this.currentNodeData) == "{}"
                ? this.data[0]._id
                : this.currentNodeData._id,
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
            _id: this.rowData.userid,
            _companyid:
              JSON.stringify(this.currentNodeData) == "{}"
                ? this.data[0]._id
                : this.currentNodeData._id
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
              if (_tableList[j].rank && getDictionaryInfo(
                  _tableList[j].rank.value1)){
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
                 if (_tableList[j].sex === "0"){
                       _tableList[j].sex = this.$t("label.PFANS2002FORMVIEW_BOY");
                }else{
                      _tableList[j].sex =  this.$t("label.PFANS2002FORMVIEW_GRIL");
                }
            }
          }
          this.tableList = _tableList;
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
              if (_tableList[j].rank && getDictionaryInfo(
                  _tableList[j].rank))
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
              if (_tableList[j].sex === "0"){
                _tableList[j].sex = this.$t("label.PFANS2002FORMVIEW_BOY");
              }else{
                _tableList[j].sex =  this.$t("label.PFANS2002FORMVIEW_GRIL");
              }
            }
          }
          this.tableList = _tableList;
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
        if (this.$refs.treeCom.$refs.treeCom.getNode(id).level === 1){
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
    this.$store.commit("global/SET_OPERATEID", "");
     this.$store.commit(
          "usersStore/SET_ORGS",
          this.$refs.treeCom.$refs.treeCom
        );
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
