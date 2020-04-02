<template>
  <div style="min-height: 100%" class="user_view">
    <el-container class="container" style="width: 100%"  v-loading="loading" element-loading-spinner="el-icon-loading">
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
          <el-date-picker unlink-panels
                          class="bigWidth"
                          v-model="workinghours"
                          style="margin-right:1vw"
                          slot="customize"
                          type="daterange"
                          :end-placeholder="$t('label.enddate')"
                          :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                          :start-placeholder="$t('label.startdate')"
                          @change="clickdata"
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
                :limit=1
                :on-remove="this.clear"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>
              </el-upload>
            </div>
            <el-row>
              <span v-if="this.resultShow">{{$t('label.PFANS2005FORMVIEW_CG')}}{{this.successCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span v-if="this.resultShow"
              >{{$t('label.PFANS2005FORMVIEW_SB')}}{{this.errorCount}}</span>
            </el-row>
            <span v-if="this.Message">{{this.cuowu}}</span>
            <div v-if="this.result">
              <el-table :data="message">
                <el-table-column :label="$t('label.PFANS2017VIEW_CUHS')" align="center" width="120%" prop="hang">
                </el-table-column>
                <el-table-column :label="$t('label.PFANS2017VIEW_ERROR')" align="center" prop="error">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="pop_download" width="50%" destroy-on-close>
          <el-table
            :data="downtypes"
            style="width: 100%">
            <el-table-column
              prop="name"
              :label="$t('label.ASSETS1001VIEW_FILENAME')"
            >
            </el-table-column>

            <el-table-column :label="$t('label.operation')">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleDownload(scope.row)"
                >{{$t('button.download2')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {getToken} from '@/utils/auth'
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
      TABLEList: [],
      totaldata: [],
      cuowu: '',
      working: '',
      workinghours: '',
      starttime: '',
      endTime: "",
      daoru: false,
      successCount: 0,
      errorCount: 0,
      pop_download: false,
      authHeader: {'x-auth-token': getToken()},
      postAction: process.env.BASE_API + '/user/importUser',
      resultShow: false,
      message: [{hang: '', error: '',}],
      Message: false,
      addActionUrl: '',
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
      isShow:true,
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
        // {
        //   key: "setRole",
        //   name: this.$t("label.PFANSUSERVIEW_SETTINGROLES"),
        //   disabled: true,
        //   icon: "el-icon-plus"
        // },
        {
          key: "update",
          name: this.$t("label.PFANSUSERVIEW_EDITUSER"),
          disabled: true,
          icon: "el-icon-edit"
        },
        // {
        //   key: "disableUser",
        //   name: this.$t("label.PFANSUSERVIEW_STATUSNAME"),
        //   disabled: true,
        //   icon: "el-icon-edit"
        // },
        {
          key: 'import',
          name: 'button.import',
          disabled: false,
          icon: 'el-icon-download'
        },
        {
          key: 'export',
          name: 'button.export',
          disabled: false,
          icon: 'el-icon-upload2'
        },
        {
          key: 'export2',
          name: 'button.download2',
          disabled: false,
          icon: 'el-icon-download'
        },
      ],
      departmentname: "",
      loading: false,
      currentNodeData: {}
    };
  },
  methods: {
    handleDownload(row) {
      this.loading = true;
      this.$store
        .dispatch('usersStore/download', {'type': row.type})
        .then(response => {
          this.loading = false;
        })
        .catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
          });
          this.loading = false;
        })
    },
      getworkinghours(workinghours) {
          if (workinghours != null) {
              if (workinghours.length > 0) {
                  return moment(workinghours[0]).format('YYYY-MM-DD') + " ~ " + moment(workinghours[1]).format('YYYY-MM-DD');
              } else {
                  return '';
              }
          } else {
              return '';
          }
      },
      clickdata() {
          this.working = this.getworkinghours(this.workinghours);
          this.starttime =  this.working.substring(0,10),
          this.endTime = this.working.substring(13,23)
          let tabledate = [];
          let tabledata = [];
          if (this.TABLEList != ''){
          if(this.starttime == '' && this.endTime == ''){
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
                      birthday: this.TABLEList[i].birthday,
                  })
              }
              this.tableList = tabledata
          }else {
              for (let i = 0; i < this.TABLEList.length; i++) {
                  if (this.starttime <= this.TABLEList[i].enterday && this.TABLEList[i].enterday <= this.endTime) {
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
                          birthday: this.TABLEList[i].birthday,
                      })
                  }
              }
              this.tableList = tabledate
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
        if(this.$refs.uploader != undefined){
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
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    buttonClick(val) {

      if (val === 'export') {
        if(this.$refs.roletable.selectedList.length === 0){
          Message({
            message: this.$t('normal.info_01'),
            type: 'info',
            duration: 2 * 1000
          });
          return;
        }
        this.selectedlist = this.$refs.roletable.selectedList;
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [this.$t('label.user_name'), this.$t('label.PFANSUSERFORMVIEW_ADFIELD'),  this.$t('label.PFANS2002VIEW_BIRTHDAY'),  this.$t('label.PFANSUSERVIEW_NATIONALITY'), this.$t('label.PFANSUSERFORMVIEW_NATION'), this.$t('label.PFANSUSERFORMVIEW_REGISTER'), this.$t('label.PFANSUSERFORMVIEW_ADDRESS'),this.$t('label.PFANSUSERFORMVIEW_GRADUATION'),this.$t('label.PFANSUSERFORMVIEW_SPECIALTY')];
          const filterVal = ['customername','adfield', 'birthday', 'nationality', 'nation', 'register', 'address', 'graduation', 'specialty'];
          const list = this.selectedlist;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel(tHeader, data,  this.$t('menu.PERSONNEL'));
        })
      }
      if (val === 'import') {
      this.daoru = true;
      this.clear(false);
    }
      if (val === 'export2') {
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
                 if (_tableList[j].sex === "PR019001"){
                       _tableList[j].sex = this.$t("label.PFANS2002FORMVIEW_BOY");
                }else{
                      _tableList[j].sex =  this.$t("label.PFANS2002FORMVIEW_GRIL");
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
              if(_tableList[j].departmentid != null){
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
              if (this.$i18n){
                _tableList[j].status === "0"
                  ? (_tableList[j].statusname = this.$t(
                  "label.PFANSUSERVIEW_ENABLE"
                  ))
                  : (_tableList[j].statusname = this.$t(
                  "label.PFANSUSERVIEW_FORBIDDEN"
                  ));
              }

              if (_tableList[j].post && getDictionaryInfo(
                _tableList[j].post))
                _tableList[j].post = getDictionaryInfo(
                  _tableList[j].post
                ).value1;
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
              if (this.$i18n){
                if (_tableList[j].sex === "PR019001"){
                  _tableList[j].sex = this.$t("label.PFANS2002FORMVIEW_BOY");
                }else{
                  _tableList[j].sex =  this.$t("label.PFANS2002FORMVIEW_GRIL");
                }
              }

              if (_tableList[j].budgetunit!== null && _tableList[j].budgetunit !== "") {
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
  },
  computed: {
    downtypes(){
      return [
        {name: this.$t('menu.user'), type: 0}
      ]
    }
  },
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
