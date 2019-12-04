<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :title="title"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    </EasyNormalTable>
    <el-dialog :visible.sync="dialogTableVisible" title="角色成员">
      <EasyNormalTable :buttonList="[]" :columns="popcolumns" :data="tableDataRoleUser"
                       :formatter="formatter" title="成员" v-loading="userloading">
      </EasyNormalTable>
    </el-dialog>
  </div>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui'

  export default {
    name: "roleView",
    components: {
      EasyNormalTable
    },
    data() {
      return {
        departmentData: [],
        orgdata: [],
        tableDataRoleUser: [],
        userloading: false,
        dialogTableVisible: false,
        loading: false,
        title: "角色",
        // 表格数据源
        data: [],
        // 列属性
        columns: [
          {
            code: 'rolename',
            label: '角色名称',
            width: 200,
            fix: false,
            filter: true
          },
          {
            code: 'description',
            label: '描述',
            width: 400,
            fix: false,
            filter: false
          }
        ],
        // pop画面列属性
        popcolumns: [
          {
            code: 'customername',
            label: '姓名',
            width: 150,
            fix: false,
            filter: false
          },
          {
            code: 'mobilenumber',
            label: '手机',
            width: 150,
            fix: false,
            filter: false
          },
          {
            code: 'departments',
            label: '部门',
            width: 400,
            fix: false,
            filter: false
          }
        ],
        buttonList: [
          {'key': 'new', 'name': '新建', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': '编辑', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'delete', 'name': '删除', 'disabled': false, 'icon': 'el-icon-delete'},
          {'key': 'member', 'name': '成员', 'disabled': false, 'icon': 'el-icon-view'}
        ],
        rowid: ''
      };
    },
    methods: {
      getRoleList() {
        this.loading = true;
        this.$store
          .dispatch('roleStore/getRoleList', {})
          .then(response => {
            this.data = response;
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
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t("normal.info_01"),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'roleFormView',
            params: {
              _id: this.rowid
            }
          })
        }
        if (val === 'new') {
          this.$router.push({
            name: 'roleFormView',
            params: {
              _id: ''
            }
          })
        }
        if (val === 'delete') {
          if (this.rowid === '') {
            Message({
              message: this.$t("normal.info_01"),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.deleteRole();
        }
        if (val === 'member') {
          if (this.rowid === '') {
            Message({
              message: this.$t("normal.info_01"),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.getMemberData();
        }
      },
      rowClick(row) {
        this.rowid = row._id;
      },
      deleteRole() {
        this.$confirm('删除角色为不可逆操作，确认删除角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$store
            .dispatch('roleStore/delRoleInfo', {_id: this.rowid})
            .then(response => {
              this.getRoleList();
              Message({
                message: "删除成功",
                type: 'success',
                duration: 2 * 1000
              })
            })
            .catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      buildDepartmentData(data) {
        for (var i in data) {
          this.departmentData[data[i]._id] = data[i].title;
          if (data[i].hasOwnProperty("orgs")) {
            this.buildDepartmentData(data[i].orgs);
          }
        }
      },
      // 获取部门名称
      getDepartmentNameById(id) {
        if (this.departmentData.hasOwnProperty(id)) {
          return this.departmentData[id];
        }
        return "";
      },
      // table格式化
      formatter(row, column) {
        // 姓名
        if (column.property === "customername") {
          if (row.customername) {
            return row.customername;
          }
        }
        // 手机
        if (column.property === "mobilenumber") {
          if (row.mobilenumber) {
            return row.mobilenumber;
          }
        }
        // 部门
        if (column.property === "departments") {
          if (row.departments) {
            let result = "";
            for (var i = 0; i < row.departments.length; i++) {
              let departName = this.getDepartmentNameById(row.departments[i]);
              if (departName !== "") {
                result += departName + ',';
              }
            }
            result = result.substring(0, result.lastIndexOf(','));
            return result;
          }
        }
      },

      getMemberData() {
        this.dialogTableVisible = true;
        this.userloading = true;
        this.$store
          .dispatch('orgTreeStore/getOrgTree')
          .then(response => {
            this.orgdata = [response];
            this.departmentData = {};
            this.buildDepartmentData(this.orgdata);
            this.$store
              .dispatch('roleStore/getMembers', this.rowid)
              .then(response => {
                // this.getRoleList();
                this.tableDataRoleUser = response;
                this.userloading = false;
              })
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 2 * 1000
                });
                this.userloading = false;
              })
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 2 * 1000
            });
            this.userloading = false;
          })
      },

    },
    mounted() {
      this.getRoleList();
      this.$store.commit('global/SET_OPERATEID', '');
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
