<template>
  <div>
    <EasyNormalContainer
      ref="container"
      :buttonList="buttonList"
      :canStart="canStart"
      :title="roleid===''?'创建角色':'编辑角色'"
      @buttonClick="buttonClick"
      @start="start"
      @workflowState="workflowState"
    >
      <div slot="customize" style="margin-top: 4vw;">
        <el-row>
          <el-steps :active="active" align-center finish-status="success">
            <el-step :title="roleid==='' ? '创建角色' : '编辑角色'"></el-step>
            <el-step title="应用权限"></el-step>
            <el-step title="功能权限&数据权限"></el-step>
          </el-steps>
        </el-row>
        <el-row v-show="active === 0">
          <div style="width: 100%; min-height:20rem; margin: 5% auto; border-radius: 0.5rem;">
            <el-form ref="roleForm" :model="roleForm" label-position="top" label-width="8vw" status-icon>
              <el-row>
                <el-col :offset="3" :span="16">
                  <el-form-item
                    :rules="[
                             { required: true, message: '请输入角色名称', trigger: 'blur' }]"
                    label="角色名称:"
                    prop="rolename"
                  >
                  </el-form-item>
                  <el-input v-model="roleForm.rolename" style="width:70vw"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="3" :span="16">
                  <el-form-item
                    :rules="[
                                        { required: true, message: '请输入角色说明', trigger: 'blur' }]"
                    label="角色说明:"
                    prop="description"
                  >
                  </el-form-item>
                  <el-input v-model="roleForm.description" style="width:70vw" type="textarea"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="3" :span="16">
                  <el-form-item label="是否默认角色:">
                    <span style="margin-right: 1vw ">{{ $t('label.no') }}</span>
                    <el-switch v-model="roleForm.defaultrole"></el-switch>
                    <span style="margin-left: 1vw ">{{ $t('label.yes') }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-row>
        <el-row v-show="active === 1">
          <el-col :offset="3" :span="16">
            <div style="width: 100%; min-height:20rem; margin: 5% auto;">
              <el-tree
                ref="apptree"
                :data="apptreedata"
                :default-expand-all="true"
                :props="defaultProps"
                node-key="_id"
                show-checkbox
              >
                <span slot-scope="{ node, data }" class="custom-tree-node">
                  <span>{{ $t(node.label) }}</span>
                </span>
              </el-tree>
            </div>
          </el-col>
        </el-row>
        <el-row v-show="active === 2">
          <el-col :offset="3" :span="16">
            <div style="width: 100%; min-height:20rem; margin: 5% auto;">
              <el-tree
                ref="functiontree"
                :data="fundata"
                :expand-on-click-node="false"
                :props="props"
                default-expand-all
                node-key="_id"
                show-checkbox
              >
                <span slot-scope="{ node, data }" class="custom-tree-node">
                  <span>
                    <el-popover placement="right" title="权限等级" trigger="hover">
                      <span :slot="node.childNodes.length > 0?'':'reference'">{{ $t(node.label) }}</span>
                      <div
                        style="width: 100%; margin: 5% auto; border: 0.1rem solid rgba(0, 0, 0, 0.2); border-radius: 0.5rem;"
                      >
                        <el-radio-group v-model="data.auth" style="width: 100%">
                          <el-row style="padding: 1.5rem">
                            <el-col>
                              <el-radio :label="-1">全组织</el-radio>
                            </el-col>
                              <el-col>
                              <el-radio :label="3">本CENTER</el-radio>
                            </el-col>
                             <el-col>
                              <el-radio :label="2">本GROUP</el-radio>
                            </el-col>
                            <el-col>
                              <el-radio :label="5">本级及以下</el-radio>
                            </el-col>
                            <el-col>
                              <el-radio :label="4">仅限本人</el-radio>
                            </el-col>
                          </el-row>
                        </el-radio-group>
                      </div>
                    </el-popover>
                    <span v-show="node.childNodes.length == 0 ? false : true">{{ $t(node.label) }}</span>
                  </span>
                </span>
              </el-tree>
            </div>
          </el-col>
        </el-row>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import EasyTree from '@/components/EasyTree';
import {Message} from 'element-ui';
import {menu} from '@/utils/menu';

export default {
  name: 'roleFormView',
  components: {
    EasyTree,
    EasyNormalContainer,
  },
  data() {
    return {
      roleid: '',
      canStart: false,
      active: 0,
      downloading: false,
      rolename: '',
      roleinstaceid: null,
      hiddenbtn: true,
      dialogVisibleNew: false,
      dialogVisible: false,
      dialogTableVisible: false,
      tableData: [],
      tableDataRoleUser: [],
      disabled: false,
      buttonList: [
        {
          key: 'btnBackward',
          name: '上一步',
          disabled: true,
          icon: 'el-icon-arrow-left',
        },
        {
          key: 'btnForward',
          name: '下一步',
          disabled: false,
          icon: 'el-icon-arrow-right',
        },
        {key: 'btnSave', name: '完成', disabled: true, icon: 'el-icon-check'},
      ],
      roleForm: {
        rolename: '',
        defaultrole: false,
        description: '',
      },
      defaultProps: {
        label: 'name',
        children: 'children',
      },
      props: {
        label: 'name',
        children: 'actions',
      },
      appdata: [],
      fundata: [],
      checkmenulist: [],
      checkactionlist: [],
      checkedMenu: [],
      apptreedata: [],
      checkedApp: [],
    };
  },
  methods: {
    workflowState(val) {
      console.log(val);
    },
    start() {
    },
    next() {
      switch (this.active) {
        case 0:
          if (this.submitForm()) {
            this.active = this.active + 1;
          }
          break;
        case 1:
          //this.getMenuTreeNodes();
          this.fundata = this.$refs.apptree.getCheckedNodes(true);
          if (this.roleid != '') {
            this.getcheckactionlist();
          }
          this.active = this.active + 1;
          break;
        default:
      }
    },
    saverole() {
      this.$emit('changeLoading', true);
      this.getMenuTreeNodes();
      this.$store
        .dispatch('roleStore/saveRole', this.roleForm)
        .then(response => {
          this.$emit('changeLoading', false);
          Message({
            message: '保存成功！',
            type: 'success',
            duration: 2 * 1000,
          });
          this.$refs.container.buttonClick('back');
        })
        .catch(error => {
          this.$emit('changeLoading', false);
          this.$message.error({
            message: error,
            type: 'error',
            duration: 2 * 1000,
          });
        });
    },
    buttonClick(val) {
      if (val === 'btnBackward') {
        this.active = this.active - 1;
      }
      if (val === 'btnForward') {
        this.next();
      }
      if (val === 'btnSave') {
        this.saverole();
      }
      if (val === 'back') {
        this.$refs.container.buttonClick('back');
      }
    },
    getRoleInfo(roleid) {
      this.$emit('changeLoading', true);
      this.$store
        .dispatch('roleStore/getRoleInfo', roleid)
        .then(response => {
          this.roleForm = response;
          this.fetch();
          this.$emit('changeLoading', false);
        })
        .catch(error => {
          this.$emit('changeLoading', false);
        });
    },
    submitForm() {
      let result = false;
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          result = true;
        } else {
          return false;
        }
      });
      return result;
    },
    fetch() {
      this.$emit('changeLoading', true);
      this.appdata = menu();
      this.appdata.map(item => {
        this.apptreedata = this.apptreedata.concat(item.menus);
      });
      if (this.roleid != '') {
        this.getcheckmenulist();
      }
      this.$emit('changeLoading', false);
    },
    getcheckmenulist() {
      // let temp = [];
      let checkmenulist = [];
      // this.roleForm.apps.map(item => {
      //   item.menus.map(item => {
      //       temp = temp.concat(item.children);
      //   });
      // });
      this.roleForm.menus.map(item => {
        if (!item.children || item.children.length === 0) {
          checkmenulist.push(item._id);
        }
      });
      this.$refs.apptree.setCheckedKeys(checkmenulist);
    },
    getcheckactionlist() {
      let temp = [];
      let checkmenulist = [];
      // this.roleForm.apps.map(item => {
      //   item.menus.map(item => {
      //     item.children.map(item => {
      //       temp = temp.concat(item.actions);
      //     })
      //   });
      // });
      // this.roleForm.menus.map(item => {
      //   if (!item.children || item.children.length === 0) {
      //     temp = temp.concat(item.actions);
      //   }
      // });
      this.roleForm.actions.map(item => {
        checkmenulist.push(item._id);
        this.fundata.map(menu => {
          menu.actions.map(action => {
            if (action._id === item._id) {
              action.auth = item.auth;
            }
          });
        });
      });
      this.$refs.functiontree.setCheckedKeys(checkmenulist);
    },
    getMenuTreeNodes() {
      // this.checkedMenu = [];
      // this.checkedApp = [];
      // let checkedKeys = this.$refs.apptree.getCheckedKeys(false);
      // let halfcheckedkeys = this.$refs.apptree.getHalfCheckedKeys();
      // let actioncheckedkeys = this.$refs.functiontree.getCheckedKeys(true);
      // checkedKeys = checkedKeys.concat(halfcheckedkeys);
      // console.log(checkedKeys);
      // console.log('appcheck', actioncheckedkeys);
      // this.apptreedata.map(item => {
      //   if(checkedKeys.indexOf(item._id) > -1){
      //     let submenu = Object.assign({}, item)
      //     this.$set(submenu, 'children', []);
      //     item.children.map(info => {
      //       if (checkedKeys.indexOf(info._id) > -1) {
      //         let menu = Object.assign({}, info)
      //         this.$set(menu, 'actions', []);
      //         info.actions.map(action => {
      //           if(actioncheckedkeys.indexOf(action._id) > -1){
      //             menu.actions.push(action);
      //           }
      //         });
      //         submenu.children.push(menu);
      //       }
      //     });
      //     this.checkedMenu.push(submenu);
      //   }
      // });
      // this.appdata.map(app => {
      //   let apptemp = Object.assign({}, app)
      //   this.$set(apptemp, 'menus', []);
      //   this.checkedMenu.map(menu => {
      //     if(!(app.menus.every((obj)=>{
      //         return menu._id !== obj._id
      //       }))){
      //         apptemp.menus.push(menu);
      //       }
      //   });
      //   if (apptemp.menus.length > 0) {
      //     this.checkedApp.push(apptemp);
      //   }
      // });
      // console.log('menu', this.checkedMenu);
      // console.log('app', this.checkedApp);
      // this.roleForm.apps = this.checkedApp;
      this.checkedApp = [];
      let checkedMenus = this.$refs.apptree.getCheckedNodes(false, true);
      let checkedActions = this.$refs.functiontree.getCheckedNodes(true);
      let checkedKeys = this.$refs.apptree.getCheckedKeys(false);
      let halfcheckedkeys = this.$refs.apptree.getHalfCheckedKeys();
      checkedKeys = checkedKeys.concat(halfcheckedkeys);
      this.appdata.map(app => {
        app.menus.some(menu => {
          if (checkedKeys.indexOf(menu._id) > -1) {
            this.checkedApp.push(app);
            return true;
          }
        });
      });
      this.roleForm.apps = this.checkedApp;
      this.roleForm.menus = checkedMenus;
      this.roleForm.actions = checkedActions;
    },
  },
  mounted() {
    this.roleid = this.$route.params._id;
    if (this.roleid != '') {
      this.getRoleInfo(this.roleid);
    } else {
      this.fetch();
    }
  },
  watch: {
    active(val) {
      this.buttonList[0].disabled = val > 0 ? false : true;
      this.buttonList[1].disabled = val < 2 ? false : true;
      this.buttonList[2].disabled = val === 2 ? false : true;
    },
  },
};
</script>
<style lang='scss'>
</style>
