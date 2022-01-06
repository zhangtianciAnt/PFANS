<template>
  <div class="dpUserIndex">
    <el-container>
      <el-tooltip class="item" content="点击进入输入模式" effect="dark" placement="bottom">
        <div :style="error !== ''? 'border-color:red' : 'border-color:#EBEEF5'" class="content bg" @click="showInput">
          <el-tag v-for="item in multipleSelection" :key="item.customername" :closable="!disabled" size="small"
                  type="info" @close="handleClose(item)">
            <el-tooltip :content=item.customername class="item" effect="dark" placement="top-start">
            <span>
              {{ item.customername.length >= 5 ? item.customername.substr(0, 5) + '...' : item.customername }}
            </span>
            </el-tooltip>
          </el-tag>
          <el-input
            v-show="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            :disabled="disabled"
            class="input-new-tag"
            size="small"
            @blur="handleInputConfirm"
            @keyup.enter.native="handleInputConfirm"
          >
          </el-input>
          <div style="width: 1px; height: 1px; display: none;">
            <el-input v-model="userids"></el-input>
          </div>
        </div>
      </el-tooltip>
      <el-button :disabled="disabled" icon="el-icon-search" size="small" @click="show = true"></el-button>


      <el-dialog :visible.sync="show" append-to-body center destroy-on-close lock-scroll top="2vh" width="60%"
                 @close="close">
        <el-container v-loading="loading" class="container" element-loading-spinner="el-icon-loading"
                      style="height:60%">
          <el-aside style="overflow: hidden" width="30%">
            <EasyTree ref="treeCom" :defaultProps="defaultProps" :defaultlist="data" :renderContent="renderContent"
                      :showCheckbox="false" :showFilter="true" maxheight="30rem" minheight="100%"
                      @nodeClick="handleNodeClick"></EasyTree>
          </el-aside>
          <el-main>
            <el-table :data="tableList" :formatter="formatter" height="500"
                      max-height="500" row-key="_id"
                      style="width: 100%"
                      @row-click="handleClickChange" @row-dblclick="handleClickChange"
                      @selection-change="handleSelectionChange">
              <el-table-column v-if="isShow" reserve-selection type="selection" width="55">
              </el-table-column>
              <el-table-column
                :label="$t('label.user_name')"
                prop="customername"
                width="200">
              </el-table-column>
              <el-table-column
                :label="$t('label.user_mobile')"
                prop="mobilenumber"
                width="180">
              </el-table-column>
              <el-table-column
                :label="$t('label.department')"
                prop="departmentname" width="200">
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>

        <el-container v-loading="loading" class="container2" element-loading-spinner="el-icon-loading"
                      style="height:30%">
          <el-row>
            <el-col :span="24">
              <el-tag v-for="item in multipleSelection" :key="item.customername" class="list-padding" type="success">
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

import EasyTree from '@/components/EasyTree';
import {getUserInfo, getUserInfoName} from '../../utils/customize';
import {Message} from 'element-ui';


export default {
  name: 'user',
  components: {
    EasyTree,
  },
  props: {
    userlist: {
      type: String,
      default: function() {
        return '';
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selectType: {
      type: String,
      default: function() {
        return 'Single';
      },
    },
    error: {
      type: String,
      default: '',
    },
    no: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  mounted() {
    this.getInitData();
    if (this.selectType === 'mult') {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    if (this.userlist) {
      this.multipleSelection = [];
      for (let i = 0; i < this.userlist.split(",").length; i++) {
        if (this.userlist.split(',')[i] !== '') {
          let user = getUserInfo(this.userlist.split(',')[i]);
          if (user) {
            user.userinfo.userid = user.userid;
            this.multipleSelection.push(
              user.userinfo,
            );
          }
        }
      }
    } else {
      this.multipleSelection = [];
    }
  },
  watch: {
    selectType(val) {
      if (val === 'mult') {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    userlist(val) {
      this.multipleSelection = [];
      if (val) {
        for (let i = 0; i < val.split(",").length; i++) {
          if (val.split(',')[i] !== '') {
            let user = getUserInfo(val.split(',')[i]);
            if (user) {
              user.userinfo.userid = user.userid;
              this.multipleSelection.push(
                user.userinfo,
              );
            }
          }
        }
      }
    },
    filterText(val) {
      this.$refs.treeCom.filter(val);
    },
    UserfilterText(val) {
      if (val === '') {
        this.tableData = this.$store.state.memberSet.tabledata;
      } else {
        let td = [];
        if (this.tableData) {
          let len = this.tableData.length;

          for (let i = 0; i < len; i++) {
            let has = false;
            let name = this.tableData[i]['username'];
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
        }


        this.tableData = td;
      }
    },
  },
  methods: {
    close() {
      //add ccm 20210817 点开放大镜不操作直接关闭组件，需要重新获取当前有效值 fr
      this.userids = '';
      if (this.multipleSelection) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.userids += this.multipleSelection[i].userid + ',';
        }
      }

      if (this.userids && this.userids.length > 0) {
        this.userids = this.userids.substr(0, this.userids.length - 1);
      }
      //add ccm 20210817 点开放大镜不操作直接关闭组件，需要重新获取当前有效值 to
      this.$emit('close', this.userids, this.no);
    },
    showInput() {
      if (this.selectType === 'mult') {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      } else {
        if (this.multipleSelection.length <= 0) {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        }
      }
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        let user = getUserInfoName(inputValue);
        if (user != -1) {
          user.userinfo.userid = user.userid;
          this.multipleSelection.push(
            user.userinfo,
          );
        } else {
          Message({
            message: '无此用户！',
            type: 'error',
            duration: 5 * 1000,
          });
        }
      }

      this.userids = '';
      if (this.multipleSelection) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.userids += this.multipleSelection[i].userid + ',';
        }
      }

      if (this.userids && this.userids.length > 0) {
        this.userids = this.userids.substr(0, this.userids.length - 1);
      }

      this.$emit('getUserids', this.userids, this.no);
      //add_fjl_0927
      this.$emit('close', this.userids, this.no);
      //add_fjl_0927

      this.inputVisible = false;
      this.inputValue = '';
    },
    handleClose(item) {
      this.multipleSelection.splice(this.multipleSelection.indexOf(item), 1);

      this.userids = '';
      if (this.multipleSelection) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.userids += this.multipleSelection[i].userid + ',';
        }
      }

      if (this.userids && this.userids.length > 0) {
        this.userids = this.userids.substr(0, this.userids.length - 1);
      }

      this.$emit('getUserids', this.userids, this.no);
      //add_fjl_0927
      this.$emit('close', this.userids, this.no);
      //add_fjl_0927

    },
    getInitData() {
      this.loading = true;
      // this.$store
      //   .dispatch('orgTreeStore/getOrgTree')
      //   .then(response => {
      //     if (response) {
      //       this.data = [response];
      //       this.departmentData = {};
      //       this.buildDepartmentData(this.data);
      //       this.handleNodeClick(this.data[0]);
      //     }
      //     this.loading = false;
      //   })
      //   .catch(error => {
      //     this.$message.error({
      //       message: error,
      //       type: 'error',
      //       duration: 5 * 1000
      //     })
      //     this.loading = false;
      //   })

      //update gbb 20210329 2021组织架构变更-人员选择时树组织隐藏副总经理节点 start
      //this.data = this.$store.getters.orgList;
      this.data = this.$store.getters.orguserList;
      //update gbb 20210329 2021组织架构变更-人员选择时树组织隐藏副总经理节点 end
      this.departmentData = {};
      this.buildDepartmentData(this.data);
      this.handleNodeClick(this.data[0]);
      this.loading = false;
    },
    buildDepartmentData(data) {
      for (var i in data) {
        this.departmentData[data[i]._id] = data[i].title;
        if (data[i].hasOwnProperty('orgs')) {
          this.buildDepartmentData(data[i].orgs);
        }
      }
    },
    // 点击树节点获取用户列表
    handleNodeClick(data) {
      this.loading = true;

      // if(this.$store.getters.orgId === data._id){
      //   this.tableList = this.$store.getters.userTableList;
      //   this.loading = false;
      //   return;
      // }
      this.$store.commit('global/SET_ORGID', data._id);
      let virtual = '';//虚拟组织
      if (data.virtual != undefined) {
        virtual = data.virtual;//总经理、副总经理
      }
      this.currentNodeData = data;
      let params = {
        orgid: data._id,
        orgtype: data.type,
        virtual: virtual,
      };
      this.$store.dispatch('usersStore/getUserTableList2', params).then(response => {
        let _tableList = [];
        if (response && response.length > 0) {
          response.map((d) => {
            let o = {};
            Object.assign(o, d.userinfo, d);
            delete o.userinfo;
            _tableList.push(o);
          });

          for (var j = 0; j < _tableList.length; j++) {
            let result = '';
            if (_tableList[j].departmentid) {
              for (var i = 0; i < _tableList[j].departmentid.length; i++) {
                let departName = this.getDepartmentNameById(_tableList[j].departmentid[i]);
                if (departName !== '') {
                  result += departName + ',';
                }
              }
            }

            result = result.substring(0, result.lastIndexOf(','));
            _tableList[j].departmentname = result;
            _tableList[j].status === '0' ? _tableList[j].statusname = '启用' : _tableList[j].statusname = '禁用';
          }
        }
        this.$store.commit('global/SET_USERTABLELIST', _tableList);
        this.tableList = _tableList;
        this.loading = false;
      }).catch(err => {
        this.$message.error({
          message: err,
          type: 'error',
          duration: 5 * 1000,
        });
        this.loading = false;
      });
    },
    // 获取部门名称
    getDepartmentNameById(id) {
      if (this.departmentData.hasOwnProperty(id)) {
        return this.departmentData[id];
      }
      return '';
    },
    renderContent(h, {node, data, store}) {
      return (
        <span style="font-size:0.8rem">
          <span class={data.type === '1' ? 'el-icon-star-on' : 'el-icon-star-off'} style="margin-right:0.5rem"></span>
          {node.label}
      </span>);
    },
    handleSelectionChangei(val) {
      if (!Array.isArray(val)) {
        val = [val];
      }
      this.multipleSelection = val;
      this.userids = '';
      if (this.multipleSelection) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.userids += this.multipleSelection[i].userid + ',';
        }
      }

      if (this.userids && this.userids.length > 0) {
        this.userids = this.userids.substr(0, this.userids.length - 1);
      }

      this.$emit('getUserids', this.userids, this.no);
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
      if (this.selectType === 'Single') {
        this.handleSelectionChangei(this.currentRow);
      } else {
        this.handleSelectionChangei(this.multipleSelection);
      }
      // this.show = false;
    },
    // table格式化
    formatter(row, column) {
      // 姓名
      if (column.property === 'customername') {
        if (row.customername) {
          return row.customername;
        }
      }

      // 手机
      if (column.property === 'mobilenumber') {
        if (row.mobilenumber) {
          return row.mobilenumber;
        }
      }
      // 部门
      if (column.property === 'departmentname') {
        if (row.departmentid) {
          return row.departmentname;
        }
      }
    },
  },
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      data: [],// 组织树结构data
      multipleSelection: [],
      userids: '',
      title: 'title.user',
      tableData: [],
      loading: false,
      defaultProps: {
        label: 'title',
        children: 'orgs',
      },
      tableList: [],// 用户列表
      show: false,
      currentRow: {},
      buttonList: [],
      isShow: false,
      selectList: [],
    };
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

$bodercolor: rgb(156, 154, 154);

.dpUserIndex {
  .content {
    height: 34px;
    min-width: 80%;
    border: 0.1rem solid #ebeef5;
    overflow-y: scroll;
    overflow-x: hidden;
    line-height: 34px;
    padding: 0.1rem 0.5rem 0.2rem 0.5rem;
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
