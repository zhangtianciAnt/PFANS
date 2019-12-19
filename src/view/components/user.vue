<template>
  <div class="dpUserIndex" >
    <el-container>
      <div class="content bg" :style="error !== ''? 'border-color:red' : 'border-color:#EBEEF5'">
        <el-tag type="info" v-for="item in multipleSelection" :key="item.customername" :closable="!disabled" @close="handleClose(item)" size="small">
          <el-tooltip class="item" effect="dark" :content=item.customername placement="top-start">
            <span>
              {{ item.customername.length >= 5 ? item.customername.substr(0,5)+ "..." : item.customername}}
            </span>
          </el-tooltip>
        </el-tag>
      </div>
      <el-button icon="el-icon-search" @click="show = true" :disabled="disabled" size="small"></el-button>

      <el-dialog :visible.sync="show" center width="60%" append-to-body lock-scroll top="2vh">
        <el-container class="container" style="height:60%"   v-loading="loading" element-loading-spinner="el-icon-loading">
          <el-aside width="30%" style="overflow: hidden">
            <EasyTree :defaultlist="data" :defaultProps="defaultProps" :showFilter="true" :showCheckbox="false"
                      @nodeClick="handleNodeClick" maxheight="30rem" minheight="100%" ref="treeCom" :renderContent="renderContent"></EasyTree>
          </el-aside>
          <el-main>
            <el-table :formatter="formatter" height="500" max-height="500"
                      @row-click="handleClickChange" @row-dblclick="handleClickChange" @selection-change="handleSelectionChange"
              :data="tableList" row-key="_id"
              style="width: 100%">
              <el-table-column reserve-selection type="selection" width="55">
              </el-table-column>
              <el-table-column
                prop="customername"
                :label="$t('label.user_name')"
                width="200">
              </el-table-column>
              <el-table-column
                prop="mobilenumber"
                :label="$t('label.user_mobile')"
                width="180">
              </el-table-column>
              <el-table-column
                prop="departmentname"
                :label="$t('label.department')" width="200">
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>

        <el-container class="container2" style="height:30%"   v-loading="loading" element-loading-spinner="el-icon-loading">
          <el-row>
            <el-col :span="24">
              <el-tag type="success" class="list-padding" v-for="item in multipleSelection" :key="item.customername">
                {{ item.customername }}
              </el-tag>
            </el-col>
          </el-row>
        </el-container>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>

  import EasyTree from '@/components/EasyTree'
  import { getUserInfo } from "../../utils/customize";
  import { Message } from 'element-ui'


  export default {
    name: 'user',
    components: {
      EasyTree
    },
    props: {
      userlist: {
        type: String,
        default: function() {
          return "";
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      selectType: {
        type: String,
        default: function() {
          return "mult";
        }
      },
      error:{
        type:String,
        default:""
      },
      no:{
        type:Object,
        default:function(){
          return {};
        }
      }
    },
    mounted() {
      this.getInitData()
      if(this.selectType === 'mult'){
        this.isShow = true
      }else{
        this.isShow =false
      }

      if (this.userlist) {
        this.multipleSelection = [];
        for (let i = 0; i < this.userlist.split(",").length; i++) {
          if (this.userlist.split(",")[i] !== "") {
            this.multipleSelection.push(
              getUserInfo(this.userlist.split(",")[i]).userinfo
            );
          }
        }
      }
    },
    watch: {
      userlist(val) {
        if (val) {
          this.multipleSelection = [];
          for (let i = 0; i < val.split(",").length; i++) {
            if (val.split(",")[i] !== "") {
              this.multipleSelection.push(
                getUserInfo(val.split(",")[i]).userinfo
              );
            }
          }}
        },
      filterText(val) {
        this.$refs.treeCom.filter(val);
      },
      UserfilterText(val) {
        if (val === "") {
          this.tableData = this.$store.state.memberSet.tabledata;
        } else {
          let td = [];
          let len = this.tableData.length;

          for (let i = 0; i < len; i++) {
            let has = false;
            let name = this.tableData[i]["username"];
            if (
              name != null &&
              -1 != name.toString().search(val)
            ) {
              has = true;
            }

            if (has) {
              td.push(this.tableData[i]);
            }
          }

          this.tableData = td;
        }
      }
    },
    methods: {
      handleClose(item){
        this.multipleSelection.splice(this.multipleSelection.indexOf(item), 1);

        this.userids = "";
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.userids += this.multipleSelection[i].userid + ",";
        }
        if (this.userids.length > 0) {
          this.userids = this.userids.substr(0, this.userids.length - 1);
        }

        this.$emit("getUserids", this.userids,this.no);

      },
      getInitData () {
        this.loading = true;
        this.$store
          .dispatch('orgTreeStore/getOrgTree')
          .then(response => {
            if (response) {
              this.data = [response];
              this.departmentData = {};
              this.buildDepartmentData(this.data);
              this.handleNodeClick(this.data[0]);
            }
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            })
            this.loading = false;
          })
      },
      buildDepartmentData(data) {
        for (var i in data) {
          this.departmentData[data[i]._id] = data[i].title;
          if (data[i].hasOwnProperty("orgs")) {
            this.buildDepartmentData(data[i].orgs);
          }
        }
      },
      // 点击树节点获取用户列表
      handleNodeClick (data) {
        this.loading = true;
        this.currentNodeData = data;
        let params = {
          orgid: data._id,
          orgtype: data.type
        }
        this.$store.dispatch('usersStore/getUserTableList', params).then(response => {
          let _tableList = [];
          if(response.length > 0) {
            response.map((d)=>{
              let o = {};
              Object.assign(o, d.userinfo, d);
              delete o.userinfo;
              _tableList.push(o);
            })

            for(var j = 0; j< _tableList.length; j++) {
              let result = "";
              for(var i = 0; i< _tableList[j].departmentid.length; i++) {
                let departName = this.getDepartmentNameById(_tableList[j].departmentid[i]);
                if ( departName !== "" ) {
                  result += departName + ',';
                }
              }
              result = result.substring(0, result.lastIndexOf(','));
              _tableList[j].departmentname = result;
              _tableList[j].status === "0" ? _tableList[j].statusname = "启用" : _tableList[j].statusname = "禁用";
            }
          }
          this.tableList = _tableList;
          this.loading = false;
        }).catch(err => {
          Message({
            message: err,
            type: 'error',
            duration: 5 * 1000
          })
          this.loading = false;
        })
      },
      // 获取部门名称
      getDepartmentNameById(id) {
        if ( this.departmentData.hasOwnProperty(id) ) {
          return this.departmentData[id];
        }
        return "";
      },
      renderContent (h, { node, data, store }) {
        return (
          <span style="font-size:0.8rem">
          <span class={data.type === '1' ? 'el-icon-star-on' : 'el-icon-star-off'} style="margin-right:0.5rem"></span>
        {node.label}
      </span>)
      },
      handleSelectionChangei(val) {
        if (!Array.isArray(val)) {
          val = [val];
        }
        this.multipleSelection = val;
        this.userids = "";
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.userids += this.multipleSelection[i].userid + ",";
        }
        if (this.userids.length > 0) {
          this.userids = this.userids.substr(0, this.userids.length - 1);
        }

        this.$emit("getUserids", this.userids,this.no);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.submit();
      },
      handleClickChange(val) {
        this.currentRow = val;
        this.submit();
      },
      submit() {
        if (this.selectType === "Single") {
          this.handleSelectionChangei(this.currentRow);
        } else {
          this.handleSelectionChangei(this.multipleSelection);
        }
        // this.show = false;
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
        if (column.property === "departmentname") {
          if (row.departmentid) {
            return row.departmentname;
          }
        }
      },
    },
    data() {
      return {
        data: [],// 组织树结构data
        multipleSelection: [],
        userids: "",
        title:"title.user",
        tableData: [],
        loading: false,
        defaultProps: {
          label: 'title',
          children: 'orgs'
        },
        tableList: [],// 用户列表
        show: false,
        currentRow: {},
        buttonList: [
        ],
        isShow:false,
        selectList:[]
      };
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  $bodercolor: rgb(156, 154, 154);

  .dpUserIndex {
    .content {
      height: 38px;
      min-width: 80%;
      border: 0.1rem solid #ebeef5;
      overflow-y: scroll;
      overflow-x:hidden;
      line-height: 38px;
    }
    .bg {
      background: white;
      border-width: 1px;
    }
    .container {
      min-height: 50rem;
      width: 95%;
      left: 0;
      right: 0;
      margin: 1% auto;
      background-color: rgb(255, 255, 255);
      border: 0.1rem solid $bodercolor;
      border-radius: 0.5rem;
    }
    .container2 {
      min-height: 10rem;
      width: 95%;
      left: 0;
      right: 0;
      margin: 1% auto;
      background-color: rgb(255, 255, 255);
      border: 0.1rem solid $bodercolor;
      border-radius: 0.5rem;
      padding: 0.5rem;
    }

    .el-table {
      border: 0.1rem solid #d5d5d5;
    }

    .el-aside {
      color: rgb(53, 23, 23);
      border-right: 0.1rem solid $bodercolor;
    }

    .list-padding {
      margin-right: 0.5rem;
    }
  }

</style>
