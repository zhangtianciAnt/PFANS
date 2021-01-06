<template>
  <div style="min-height: 100%" class="org_company">
    <el-container class="container" style="width: 100%;min-height: 100%" v-loading="loading" element-loading-spinner="el-icon-loading">
      <el-aside width="20rem" style="overflow: hidden">
        <div class="custom-tree-container">
          <div class="block">
            <el-tree
              :data="data"
              node-key="id"
              :props="defaultProps"
              default-expand-all
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
              ref="treeCom">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            添加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
            </el-tree>
          </div>
        </div>
      </el-aside>
      <el-main style="padding: 0;width: 100%;min-height: 100%">
        <el-card style="border:none;border-radius:0;min-height: 100%">
          <div slot="header" class="clearfix" style="height: 2rem">
            <easy-button-bar @buttonClick="buttonClick" :data="buttonList"></easy-button-bar>
          </div>
          <div>
            <el-tabs v-model="activeNam">
              <el-tab-pane label="基本信息" name="first">
                <el-form autoComplete="off" status-icon :model="currentNode" ref="companyForm"
                         label-position="left" label-width="8rem" style="border: none;  border-radius: 0.5rem;padding:3rem;">
                  <el-form-item prop="name" label="简称">
                    <el-input v-model="currentNode.companyshortname"></el-input>
                  </el-form-item>
                  <el-form-item prop="lessname" label="全称">
                    <el-input v-model="currentNode.companyname"></el-input>
                  </el-form-item>
                  <el-form-item prop="engname" label="英文缩写">
                    <el-input v-model="currentNode.companyen"></el-input>
                  </el-form-item>
                  <el-form-item  label="组织番号">
                    <el-input v-model="currentNode.orgname"></el-input>
                  </el-form-item>
                  <el-form-item  label="预算编码(集约）">
                    <el-input v-model="currentNode.encoding"></el-input>
                  </el-form-item>
                  <el-form-item prop="user" label="组织负责人">
                    <user selectType="Single" @getUserids="getUserids" :userlist="currentNode.user" style="width:20vw"></user>
                  </el-form-item>
                  <el-form-item prop="redirict" label="是否直属组织">
                    <el-switch v-model="currentNode.redirict" active-color="#13ce66" inactive-color="#ff4949" active-value="0" inactive-value="1" :width="50">
                    </el-switch>
                  </el-form-item>
                  <el-form-item prop="status" label="状态">
                    <el-switch v-model="currentNode.status" active-color="#13ce66" inactive-color="#ff4949" active-value="0" inactive-value="1" :width="50">
                    </el-switch>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import EasyTree from '@/components/EasyTree'
    import EasyButtonBar from '@/components/EasyButtonBar'
    import { Message } from 'element-ui'
    import user from "../components/user.vue";
    import {getUUID} from '@/utils/customize';
    import moment from "moment";
    export default {
        name: 'orgTree1002View',
        components: {
            EasyTree,
            EasyButtonBar,
            user
        },

        data () {
            return {
                companyFormcheck: {},
                treeshow: true,
                data:[],
                filterText: '',
                loading: false,
                defaultProps: {
                    label: 'title',
                    children: 'orgs'
                },
                activeNam: 'first',
                currentNode: {
                    type: '1',
                    companyshortname: '',
                    companyname: '公司',
                    companyen: '',
                    orgname: '',
                    encoding: '',
                },
                buttonList: [
                    { key: 'back', name: 'button.back', disabled: false, icon: 'el-icon-back' },
                    { key: 'save', name: 'button.confirm', disabled: false, icon: 'el-icon-check' },
                ],
                nameflag: false,
                namelessflag: true,
                nameengflag: false,
                addressflag: false,
                ownerflag: false,
                timeflag: false,
                orgnameflag:false,
                encodingflag:false,
                newBtnDisabled: false,
            }
        },
        methods: {
            append(data) {
                let lettype;
                if(data.type === 0){
                    lettype = 1;
                }
                if(data.type === 1){
                    lettype = 2;
                }
                if(data.type === 2){
                    lettype = 3;
                }
                const newChild = { id: getUUID(36, 16), title: '请输入组织名称',type:lettype, orgs: [] };
                if (!data.orgs) {
                    this.$set(data, 'orgs', []);
                }
                data.orgs.push(newChild);
                this.currentNode = {};
                this.currentNode.companyname = '请输入组织名称';
            },
            remove(node, data) {
                if(data.id === 0){
                    return;
                }
                const parent = node.parent;
                const orgs = parent.data.orgs || parent.data;
                const index = orgs.findIndex(d => d.id === data.id);
                orgs.splice(index, 1);
            },
            getUserids(val){
                this.currentNode.user = val;
            },
            handleNodeClick (data) {
                debugger;
                this.currentNode = {};
                this.companyFormcheck = Object.assign(
                    {},
                    data
                )
                if(!data.companyname){
                    data.companyname = data.title;
                }
                this.currentNode = data;
                this.currentNode.companyname = data.title;
            },
            getInitData () {
                this.loading = true;
                this.$store
                  .dispatch('orgTreeStore/getTreeYears', {"Years": this.year,"type": '0'})
                  .then(response => {
                      if (response) {
                          debugger;
                          this.data = [response]
                          this.currentNode = response
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
            buttonClick (val) {
                if (val === 'back') {
                    this.cancelForm();
                }
                if (val === 'save') {
                    this.formcommit();
                }
            },
            changeflag (flag, type) {
                // switch (flag) {
                //     case 'nameflag':
                //         this.nameflag = type
                //         break
                //     case 'namelessflag':
                //         this.namelessflag = type
                //         break
                //     case 'nameengflag':
                //         this.nameengflag = type
                //         break
                //     case 'addressflag':
                //         this.addressflag = type
                //         break
                //     case 'ownerflag':
                //         this.ownerflag = type
                //         break
                //     case 'orgnameflag':
                //         this.orgnameflag = type
                //         break
                //     case 'encodingflag':
                //         this.encodingflag = type
                //         break
                //     default:
                //         this.timeflag = type
                // }
            },
            formcommit () {
                debugger;
                if (
                    JSON.stringify(this.currentNode) !==
                    JSON.stringify(this.companyFormcheck)
                ) {
                    debugger;
                    let dataArray = this.$refs.treeCom.data;
                    this.companyFormcheck = Object.assign({}, this.currentNode)
                    this.loading = true;
                    this.currentNode.title = this.currentNode.companyname;
                    this.$store
                        .dispatch('orgTreeStore/saveTree', dataArray[0])
                        .then((response) => {
                            Message({
                                message: this.$t('label.PFANSUSERFORMVIEW_SUBMITSUCCESSFULLY'),
                                type: 'success',
                                duration: 2 * 1000
                            })
                            this.loading = false
                            this.getInitData()
                        })
                        .catch((error) => {
                            Message({
                                message: error,
                                type: 'error',
                                duration: 2 * 1000
                            })
                            this.loading = false
                        })
                }
            },
            cancelForm() {
                if(this.$store.getters.historyUrl){
                    this.$router.push(this.$store.getters.historyUrl);
                }
            },
        },
        mounted () {
            this.getInitData()
            this.$store.commit('global/SET_OPERATEID', '')
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  .org_company {
    $bodercolor: rgba(0, 0, 0, 0.2);

    .container {
      min-height: 50rem;
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

    .cardfooter {
      border-top: 0.1rem solid rgba(0, 0, 0, 0.2);
      text-align: center;
      font-size: 1.7rem;
      height: 2rem;
      i {
        padding: 1rem;
        cursor: pointer;
      }
      i:hover {
        color: #409eff;
      }
    }

    .invform {
      min-height: 18rem;
      .el-form-item {
        margin-bottom: 0;
      }
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
</style>
