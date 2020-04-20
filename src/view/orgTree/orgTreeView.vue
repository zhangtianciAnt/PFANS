<template>
  <div style="min-height: 100%" class="org_company">
    <el-container class="container" style="width: 100%;min-height: 100%" v-loading="loading" element-loading-spinner="el-icon-loading">
      <el-aside width="20rem" style="overflow: hidden">
        <EasyTree :defaultlist="data" :defaultProps="defaultProps" :showFilter="true" :showCheckbox="false"
                  @nodeClick="handleNodeClick" maxheight="35rem" minheight="100%" ref="treeCom"
                  :renderContent="renderContent"></EasyTree>
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
  import { parseTime } from '@/utils/customize'
  import { Message } from 'element-ui'
  import user from "../components/user.vue";
  export default {
    name: 'orgTreeView',
    components: {
      EasyTree,
      EasyButtonBar,
      user
    },
    data () {
      return {
        companyFormcheck: {},
        treeshow: true,
        data: [],
        filterText: '',
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
          { key: 'new1', name: 'button.newCenter', disabled: false, icon: 'el-icon-plus' },
          { key: 'new2', name: 'button.newGroup', disabled: false, icon: 'el-icon-plus' },
          { key: 'new3', name: 'button.newTeam', disabled: false, icon: 'el-icon-plus' },
          { key: 'save', name: 'button.confirm', disabled: true, icon: 'el-icon-check' }
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
      getUserids(val){
        this.currentNode.user = val;
      },
      getButtonAuth (data) {
        this.$store
          .dispatch('tableStore/getActionsAuth', data.owner)
          .then(response => {
            this.buttonList[3].disabled = response[1];
            this.formDisabled = response[1];
          })
          .catch(error => {
            this.buttonList[3].disabled = false;
            this.formDisabled = false;
          })
      },
      getNewActionAuth () {
        this.$store
          .dispatch('tableStore/getNewActionAuth')
          .then(response => {
            this.newBtnDisabled = response;
            this.buttonList[0].disabled = response;
            this.buttonList[1].disabled = response;
            this.buttonList[2].disabled = response;
          })
          .catch(error => {
            this.newBtnDisabled = false;
            this.buttonList[0].disabled = false;
            this.buttonList[1].disabled = false;
            this.buttonList[2].disabled = false;
          })
      },
      handleNodeClick (data) {
        let temp = []
        this.companyFormcheck = Object.assign(
          {},
          data
        )
        if (!data.companyname) {
          data.companyname = data.title
        }
        //设置按钮状态
        this.getButtonAuth(data);
        if (data.type === '2') {
          this.activeNam = 'first'
          this.buttonList[0].disabled = true
          this.buttonList[1].disabled = false
        } else if (data.type === '3') {
          this.activeNam = 'first'
          this.buttonList[0].disabled = true
          this.buttonList[1].disabled = true
        } else {
          this.buttonList[0].disabled = false || this.newBtnDisabled
          this.buttonList[1].disabled = false || this.newBtnDisabled
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
          .dispatch('orgTreeStore/getOrgTree')
          .then(response => {
            if (response) {
              this.$store.commit("global/SET_ORGLIST", [response]);
              this.data = [response]
              this.currentNode = response
              this.getButtonAuth(this.currentNode)
              if (this.currentNode.invoiceinfo) {
                this.exrinfolist.invlist = [this.currentNode.invoiceinfo]
              }
              if (this.currentNode.bankinfo) {
                this.exrinfolist.banlist = this.currentNode.bankinfo
              }
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
        if (val === 'save') {
          this.formcommit();
        } else {
          this.$store.commit('global/SET_HISTORYURL', this.$route.path)
          let type = val === 'new1' ? '1' : (val === 'new2' ? '2' : '3')
          this.$router.push({
            name: 'orgFormEdit',
            params: {
              currentNode: this.currentNode,
              orgTree: this.$refs.treeCom.$refs.treeCom,
              type: type
            }
          })
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
          let dataArray = this.$refs.treeCom.getData()
          this.companyFormcheck = Object.assign({}, this.currentNode)
          this.loading = true
          this.currentNode.title = this.currentNode.type === '1' ? this.currentNode.companyshortname : this.currentNode.departmentname
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
      formattime (data) {
        return parseTime(data, '{y}-{m}-{d}')
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
      addinvoice (flag, val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path)
        this.$router.push({
          name: 'invoiceForm',
          params: {
            currentNode: this.currentNode,
            orgTree: this.$refs.treeCom.$refs.treeCom,
            type: flag === 'add' ? '1' : '2',
            invoice: val
          }
        })
      },
      deleteinvoice () {
        this.currentNode.invoiceinfo = null
        this.exrinfolist.invlist = []
        let dataArray = this.$refs.treeCom.getData()
        this.loading = true
        this.$store
          .dispatch('orgTreeStore/saveTree', dataArray[0])
          .then(() => {
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      },
      addbank (flag, val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path)
        this.$router.push({
          name: 'bankForm',
          params: {
            currentNode: this.currentNode,
            orgTree: this.$refs.treeCom.$refs.treeCom,
            type: flag === 'add' ? '1' : '2',
            bank: val
          }
        })
      },
      deletebank (data) {
        const index = this.exrinfolist.banlist.findIndex(d => d._id === data._id)
        this.exrinfolist.banlist.splice(index, 1)
        let dataArray = this.$refs.treeCom.getData()
        this.loading = true
        this.$store
          .dispatch('orgTreeStore/saveTree', dataArray[0])
          .then(() => {
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    mounted () {
      this.getNewActionAuth()
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
  }
</style>
