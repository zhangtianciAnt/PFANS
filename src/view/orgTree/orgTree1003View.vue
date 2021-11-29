<template>
  <div style="min-height: 100%" class="org_company">
    <el-container class="container" style="width: 100%;min-height: 100%" v-loading="loading" element-loading-spinner="el-icon-loading">
      <el-aside width="20rem" style="overflow: hidden">
        <div
          :style="{maxHeight:'35rem',minHeight:'100%',overflowY:'auto'}"
          class="easy_tree"
          :element-loading-text="$t('normal.waiting')"
          v-loading="loading"
        >
          <el-input
            :placeholder="$t('normal.search')"
            v-if="showFilter"
            v-model="filterText"
          >
          </el-input>

          <el-tree
            :check-strictly="checktrictly"
            :data="data"
            node-key="_id"
            :default-expand-all="true"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            :props="defaultProps"
            @node-click="handleNodeClick"
            class="filter-tree"
            ref="treeCom"
            style="margin-top:10px"
          >
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
                         label-position="left" label-width="8rem" style="border: none;  border-radius: 0.5rem;padding:3rem;"
                         v-show="currentNode.type === '1'||currentNode.type === '2'" :disabled="formDisabled">
                  <el-form-item prop="name" label="简称" @mouseover.native="changeflag('nameflag',true)" @mouseout.native="changeflag('nameflag',false)">
                    <el-input v-model="currentNode.companyshortname" v-show="nameflag"></el-input>
                    <span v-show="!nameflag">{{currentNode.companyshortname}}</span>
                  </el-form-item>
                  <el-form-item prop="lessname" label="全称" @mouseover.native="changeflag('namelessflag',true)" @mouseout.native="changeflag('namelessflag',false)">
                    <el-input v-model="currentNode.companyname" v-show="namelessflag"></el-input>
                    <span v-show="!namelessflag">{{currentNode.companyname}}</span>
                  </el-form-item>
                  <el-form-item prop="engname" label="英文缩写" @mouseover.native="changeflag('nameengflag',true)" @mouseout.native="changeflag('nameengflag',false)">
                    <el-input v-model="currentNode.companyen" v-show="nameengflag"></el-input>
                    <span v-show="!nameengflag">{{currentNode.companyen}}</span>
                  </el-form-item>
                  <el-form-item  label="组织番号" @mouseover.native="changeflag('orgnameflag',true)" @mouseout.native="changeflag('orgnameflag',false)">
                    <el-input v-model="currentNode.orgname" v-show="orgnameflag"></el-input>
                    <span v-show="!orgnameflag">{{currentNode.orgname}}</span>
                  </el-form-item>
                  <el-form-item  label="预算编码(集约）" @mouseover.native="changeflag('encodingflag',true)" @mouseout.native="changeflag('encodingflag',false)">
                    <el-input v-model="currentNode.encoding" v-show="encodingflag"></el-input>
                    <span v-show="!encodingflag">{{currentNode.encoding}}</span>
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
                <el-form autoComplete="off" status-icon :model="currentNode" ref="departmentForm"
                         label-position="left" label-width="8rem" style="  border-radius: 0.5rem;padding:3rem;"
                         v-show="currentNode.type !== '1'&& currentNode.type !== '2'" :disabled="formDisabled">
                  <el-form-item prop="departmentname" label="名称"
                                @mouseover.native="changeflag('nameflag',true)"
                                @mouseout.native="changeflag('nameflag',false)"
                                :rules="[{ required: true, message: '请输入部门名称', trigger: 'blur' }]">
                    <el-input v-model="currentNode.departmentname" v-show="nameflag"></el-input>
                    <span v-show="!nameflag">{{currentNode.departmentname}}</span>
                  </el-form-item>
                  <el-form-item label="上级组织" prop="cname">
                    <span >{{currentNode.upcompany}}</span>
                  </el-form-item>
                  <el-form-item  label="预算编码" @mouseover.native="changeflag('encodingflag',true)" @mouseout.native="changeflag('encodingflag',false)">
                    <el-input v-model="currentNode.encoding" v-show="encodingflag"></el-input>
                    <span v-show="!encodingflag">{{currentNode.encoding}}</span>
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
    import {getUUID} from '@/utils/customize';
    import { Message } from 'element-ui'
    import moment from "moment"
    import user from "../components/user.vue";
    let _id = 1;
    export default {
        name: 'orgTree1003View',
        components: {
            EasyTree,
            EasyButtonBar,
            user
        },
        data () {
            return {
                showFilter:true,
                companyFormcheck: {},
                treeshow: true,
                year:  moment(new Date()).format('YYYY'),
                data: [],
                filterText: '',
                checktrictly:false,
                ids:'',
                loading: false,
                defaultProps: {
                    label: 'title',
                    children: 'orgs'
                },
                activeNam: 'first',
                currentNode: {
                    type: '1'
                },
                buttonList: [
                    { key: 'back', name: 'button.back', disabled: false, icon: 'el-icon-back' },
                    { key: 'save', name: 'button.confirm', disabled: false, icon: 'el-icon-check' },
                ],
                nameflag: false,
                namelessflag: false,
                nameengflag: false,
                addressflag: false,
                ownerflag: false,
                timeflag: false,
                orgnameflag:false,
                encodingflag:false,
                exrinfolist: {
                    banlist: [],
                    invlist: []
                },
                newBtnDisabled: false,
                formDisabled: false
            }
        },
        methods: {
            append(data) {
                let lettype;
                var newChild = {};
                if (!data.orgs) {
                    this.$set(data, 'orgs', []);
                }
                if(data.years != undefined){
                    if(data.years != null){
                        lettype = '1';
                        newChild = { _id: getUUID(36, 16), title: '请输入组织名称',type:lettype, orgs: [] };
                        this.currentNode = {};
                        //this.currentNode.companyname = '请输入组织名称';
                        data.orgs.push(newChild);
                        return;
                    }
                }
                if(data.type === '1'){
                    lettype = '2';
                    newChild = { _id: getUUID(36, 16), title: '请输入组织名称',type:lettype, orgs: [] };
                    this.currentNode = {};
                    //this.currentNode.companyname = '请输入组织名称';
                }
                else{
                    lettype = '3';
                    newChild = { _id: getUUID(36, 16), title: '请输入组织名称',type:lettype, upcompany : data.companyname };
                    this.currentNode = {};
                    //this.currentNode.departmentname = '请输入组织名称';
                    this.currentNode.upcompany = data.companyname;
                }
                data.orgs.push(newChild);
            },
            remove(node, data) {
                if(data.years != undefined){
                    if(data.years != null){
                        return;
                    }
                }
                const parent = node.parent;
                const orgs = parent.data.orgs || parent.data;
                const index = orgs.findIndex(d => d._id === data._id);
                orgs.splice(index, 1);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data[this.defaultProps.label].indexOf(value) !== -1;
            },
            getUserids(val){
                this.currentNode.user = val;
            },
            handleNodeClick (data) {
                if(this.ids != ''){
                }
                this.ids = data._id;
                let temp = []
                this.companyFormcheck = Object.assign(
                    {},
                    data
                )
                if(data.companyname != undefined)(
                    data.title = data.companyname
                )
                if (data.type === '2') {
                    this.activeNam = 'first'
                } else if (data.type === '3') {
                    this.activeNam = 'first'
                }
                this.currentNode = data
                if (data.invoiceinfo) {
                    temp.push(data.invoiceinfo)
                }
                this.exrinfolist.invlist = temp
                if (!data.bankinfo) {
                    this.exrinfolist.banlist = []
                } else {
                    this.exrinfolist.banlist = data.bankinfo
                }
            },
            getInitData () {
                this.loading = true;
                this.$store
                    .dispatch('orgTreeStore/getTreeYears', {"Years": this.year,"Status": '1'})
                    .then(response => {
                        if (response) {
                            this.data = [response]
                            this.currentNode = response
                            if (this.currentNode.invoiceinfo) {
                                this.exrinfolist.invlist = [this.currentNode.invoiceinfo]
                            }
                            if (this.currentNode.bankinfo) {
                                this.exrinfolist.banlist = this.currentNode.bankinfo
                            }
                        }
                        else{
                            Message({
                                message: this.$t('normal.info_16'),
                                type: 'info',
                                duration: 2 * 1000,
                            });
                            this.buttonList[1].disabled = true;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.$message.error({
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
                switch (flag) {
                    case 'nameflag':
                        this.nameflag = type
                        break
                    case 'namelessflag':
                        this.namelessflag = type
                        break
                    case 'nameengflag':
                        this.nameengflag = type
                        break
                    case 'addressflag':
                        this.addressflag = type
                        break
                    case 'ownerflag':
                        this.ownerflag = type
                        break
                    case 'orgnameflag':
                        this.orgnameflag = type
                        break
                    case 'encodingflag':
                        this.encodingflag = type
                        break
                    default:
                        this.timeflag = type
                }
            },
            formcommit () {
                if (
                    JSON.stringify(this.currentNode) !==
                    JSON.stringify(this.companyFormcheck)
                ) {
                    let dataArray = this.$refs.treeCom.data
                    this.companyFormcheck = Object.assign({}, this.currentNode)
                    this.loading = true
                    this.currentNode.title = this.currentNode.type === '1' || this.currentNode.type === '2' ? this.currentNode.companyshortname : this.currentNode.departmentname
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
                            this.$message.error({
                                message: error,
                                type: 'error',
                                duration: 2 * 1000
                            })
                            this.loading = false
                        })
                }
            },
            renderContent (h, { node, data, store }) {
                if (data) {
                    return (
                        <span style="font-size:0.8rem">
                        <el-tooltip content={node.label} placement="top-end" effect="light">
                        <span>{node.label}</span>
                        </el-tooltip>
                        </span>
                )
                }
            },
            cancelForm() {
                if(this.$store.getters.historyUrl){
                    this.$router.push(this.$store.getters.historyUrl);
                }
            }
        },
        mounted () {
            this.getInitData()
            this.$store.commit('global/SET_OPERATEID', '')
        },
        watch: {
            filterText(val) {
                this.$refs.treeCom.filter(val);
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #fff;
  .easy_tree {
    background-color: $bg;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
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
  }
</style>
