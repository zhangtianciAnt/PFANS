<template>
  <div class="org_company" style="min-height: 100%">
    <el-container v-loading="loading" class="container" element-loading-spinner="el-icon-loading"
                  style="width: 100%;min-height: 100%">
      <el-aside style="overflow: hidden" width="20rem">
        <EasyTree ref="treeCom" :defaultProps="defaultProps" :defaultlist="data" :renderContent="renderContent"
                  :showCheckbox="false" :showFilter="true" maxheight="35rem" minheight="100%"
                  @nodeClick="handleNodeClick"></EasyTree>
      </el-aside>
      <el-main style="padding: 0;width: 100%;min-height: 100%">
        <el-card style="border:none;border-radius:0;min-height: 100%">
          <div slot="header" class="clearfix" style="height: 2rem">
            <easy-button-bar :data="buttonList" @buttonClick="buttonClick"></easy-button-bar>
          </div>
          <div>{{ '年份' }}
            <el-date-picker
              v-model="years"
              placeholder="选择年"
              type="year"
              @change="showData">
            </el-date-picker>
          </div>
          <div>
            <el-tabs v-model="activeNam">
              <el-tab-pane label="基本信息" name="first">
                <el-form v-show="currentNode.type === '1'||currentNode.type === '2'" ref="companyForm" :disabled="formDisabled" :model="currentNode"
                         autoComplete="off" label-position="left"
                         label-width="8rem"
                         status-icon style="border: none;  border-radius: 0.5rem;padding:3rem;">
                  <el-form-item label="简称" prop="name" @mouseover.native="changeflag('nameflag',true)"
                                @mouseout.native="changeflag('nameflag',false)">
                    <el-input v-show="nameflag" v-model="currentNode.companyshortname" :disabled="!disabled"></el-input>
                    <span v-show="!nameflag">{{ currentNode.companyshortname }}</span>
                  </el-form-item>
                  <el-form-item label="全称" prop="lessname" @mouseover.native="changeflag('namelessflag',true)"
                                @mouseout.native="changeflag('namelessflag',false)">
                    <el-input v-show="namelessflag" v-model="currentNode.companyname" :disabled="!disabled"></el-input>
                    <span v-show="!namelessflag">{{ currentNode.companyname }}</span>
                  </el-form-item>
                  <el-form-item label="英文缩写" prop="engname" @mouseover.native="changeflag('nameengflag',true)"
                                @mouseout.native="changeflag('nameengflag',false)">
                    <el-input v-show="nameengflag" v-model="currentNode.companyen" :disabled="!disabled"></el-input>
                    <span v-show="!nameengflag">{{ currentNode.companyen }}</span>
                  </el-form-item>
                  <el-form-item label="组织番号" @mouseover.native="changeflag('orgnameflag',true)"
                                @mouseout.native="changeflag('orgnameflag',false)">
                    <el-input v-show="orgnameflag" v-model="currentNode.orgname" :disabled="!disabled"></el-input>
                    <span v-show="!orgnameflag">{{ currentNode.orgname }}</span>
                  </el-form-item>
                  <el-form-item label="预算编码(集约）" @mouseover.native="changeflag('encodingflag',true)"
                                @mouseout.native="changeflag('encodingflag',false)">
                    <el-input v-show="encodingflag" v-model="currentNode.encoding" :disabled="!disabled"></el-input>
                    <span v-show="!encodingflag">{{ currentNode.encoding }}</span>
                  </el-form-item>
                  <el-form-item label="组织负责人" prop="user">
                    <user :disabled="!disabled" :userlist="currentNode.user" selectType="Single"
                          style="width:20vw" @getUserids="getUserids"></user>
                  </el-form-item>
                  <el-form-item label="是否直属组织" prop="redirict">
                    <el-switch v-model="currentNode.redirict" :disabled="!disabled" :width="50"
                               active-color="#13ce66" active-value="0" inactive-color="#ff4949" inactive-value="1">
                    </el-switch>
                  </el-form-item>
                  <el-form-item label="状态" prop="status">
                    <el-switch v-model="currentNode.status" :disabled="!disabled" :width="50"
                               active-color="#13ce66" active-value="0" inactive-color="#ff4949" inactive-value="1">
                    </el-switch>
                  </el-form-item>
                </el-form>
                <el-form v-show="currentNode.type !== '1'&& currentNode.type !== '2'" ref="departmentForm" :disabled="formDisabled" :model="currentNode"
                         autoComplete="off" label-position="left" label-width="8rem"
                         status-icon style="  border-radius: 0.5rem;padding:3rem;">
                  <el-form-item :rules="[{ required: true, message: '请输入部门名称', trigger: 'blur' }]" label="名称"
                                prop="departmentname"
                                @mouseover.native="changeflag('nameflag',true)"
                                @mouseout.native="changeflag('nameflag',false)">
                    <el-input v-show="nameflag" v-model="currentNode.departmentname" :disabled="!disabled"></el-input>
                    <span v-show="!nameflag">{{ currentNode.departmentname }}</span>
                  </el-form-item>
                  <el-form-item label="上级组织" prop="cname">
                    <span>{{ currentNode.upcompany }}</span>
                  </el-form-item>
                  <el-form-item label="预算编码" @mouseover.native="changeflag('encodingflag',true)"
                                @mouseout.native="changeflag('encodingflag',false)">
                    <el-input v-show="encodingflag" v-model="currentNode.encoding" :disabled="!disabled"></el-input>
                    <span v-show="!encodingflag">{{ currentNode.encoding }}</span>
                  </el-form-item>
                  <el-form-item label="组织负责人" prop="user">
                    <user :disabled="!disabled" :userlist="currentNode.user" selectType="Single"
                          style="width:20vw" @getUserids="getUserids"></user>
                  </el-form-item>
                  <el-form-item label="是否直属组织" prop="redirict">
                    <el-switch v-model="currentNode.redirict" :disabled="!disabled" :width="50"
                               active-color="#13ce66" active-value="0" inactive-color="#ff4949" inactive-value="1">
                    </el-switch>
                  </el-form-item>
                  <el-form-item label="状态" prop="status">
                    <el-switch v-model="currentNode.status" :disabled="!disabled" :width="50"
                               active-color="#13ce66" active-value="0" inactive-color="#ff4949" inactive-value="1">
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
import EasyTree from '@/components/EasyTree';
import EasyButtonBar from '@/components/EasyButtonBar';
import {parseTime} from '@/utils/customize';
import {Message} from 'element-ui';
import moment from 'moment';
import user from '../components/user.vue';

export default {
  name: 'orgTree1001View',
  components: {
    EasyTree,
    EasyButtonBar,
    user,
  },
  data() {
    return {
      disabled: false,
      companyFormcheck: {},
      treeshow: true,
      data: [],
      filterText: '',
      loading: false,
      defaultProps: {
        label: 'title',
        children: 'orgs',
      },
      years: moment(new Date()).format('MM') < 4 ? moment(new Date()).add(-1, 'y').format('YYYY') : moment(new Date()).format('YYYY'),
      activeNam: 'first',
      currentNode: {
        type: '1',
      },
      buttonList: [
        {key: 'back', name: 'button.back', disabled: false, icon: 'el-icon-back'},
        {key: 'applicate', name: 'button.applicate', disabled: false, icon: 'el-icon-check'},
      ],
      nameflag: false,
      namelessflag: false,
      nameengflag: false,
      addressflag: false,
      ownerflag: false,
      timeflag: false,
      orgnameflag: false,
      encodingflag: false,
      exrinfolist: {
        banlist: [],
        invlist: [],
      },
      newBtnDisabled: false,
      formDisabled: false,
    };
  },
  methods: {
    showData(value) {
      this.years = moment(value).format('YYYY');
      this.getInitData();
    },
    getUserids(val) {
      this.currentNode.user = val;
    },
    handleNodeClick(data) {
      let temp = [];
      this.companyFormcheck = Object.assign(
        {},
        data,
      );
      if (!data.companyname) {
        data.companyname = data.title;
      }
      this.currentNode = data;
      if (data.invoiceinfo) {
        temp.push(data.invoiceinfo);
      }
      this.exrinfolist.invlist = temp;
      if (!data.bankinfo) {
        this.exrinfolist.banlist = [];
      } else {
        this.exrinfolist.banlist = data.bankinfo;
      }
    },
    getInitData() {
      this.loading = true;
      this.$store
        .dispatch('orgTreeStore/getTreeYears', {'Years': this.years, 'Status': '0'})
        .then(response => {
          if (response) {
            this.data = [response];
            this.currentNode = response;
            if (this.currentNode.invoiceinfo) {
              this.exrinfolist.invlist = [this.currentNode.invoiceinfo];
            }
            if (this.currentNode.bankinfo) {
              this.exrinfolist.banlist = this.currentNode.bankinfo;
            }
            // 根据年度控制【应用】按钮权限 且无组织时不显示
            if (response.status === '0') {
              this.buttonList[1].disabled = true;
            } else {
              this.buttonList[1].disabled = false;
            }
          } else {
            this.data = [];
            this.buttonList[1].disabled = true;
            // 根据年度控制【应用】按钮权限 且无组织时不显示
          }
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
    buttonClick(val) {
      if (val === 'back') {
        this.cancelForm();
      } else if (val === 'applicate') {
        this.$store
          .dispatch('orgTreeStore/updateStatus', {'Years': this.years})
          .then((response) => {
            Message({
              message: this.$t('normal.success_03'),
              type: 'success',
              duration: 2 * 1000,
            });
            this.loading = false;
            this.cancelForm();
          })
          .catch((error) => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 2 * 1000,
            });
            this.loading = false;
          });
      }
    },
    changeflag(flag, type) {
      switch (flag) {
        case 'nameflag':
          this.nameflag = type;
          break;
        case 'namelessflag':
          this.namelessflag = type;
          break;
        case 'nameengflag':
          this.nameengflag = type;
          break;
        case 'addressflag':
          this.addressflag = type;
          break;
        case 'ownerflag':
          this.ownerflag = type;
          break;
        case 'orgnameflag':
          this.orgnameflag = type;
          break;
        case 'encodingflag':
          this.encodingflag = type;
          break;
        default:
          this.timeflag = type;
      }
    },
    formcommit() {
      if (
        JSON.stringify(this.currentNode) !==
        JSON.stringify(this.companyFormcheck)
      ) {
        let dataArray = this.$refs.treeCom.getData();
        this.companyFormcheck = Object.assign({}, this.currentNode);
        this.loading = true;
        this.currentNode.title = this.currentNode.type === '1' ? this.currentNode.companyshortname : this.currentNode.departmentname;
        this.$store
          .dispatch('orgTreeStore/saveTree', dataArray[0])
          .then((response) => {
            Message({
              message: this.$t('label.PFANSUSERFORMVIEW_SUBMITSUCCESSFULLY'),
              type: 'success',
              duration: 2 * 1000,
            });
            this.loading = false;
            this.getInitData();
          })
          .catch((error) => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 2 * 1000,
            });
            this.loading = false;
          });
      }
    },
    formattime(data) {
      return parseTime(data, '{y}-{m}-{d}');
    },
    renderContent(h, {node, data, store}) {
      if (data) {
        return (
          <span style="font-size:0.8rem">
            <el-tooltip content={node.label} placement="top-end" effect="light">
            <span>{node.label}</span>
            </el-tooltip>
            </span>
        );
      }
    },
    addinvoice(flag, val) {
      this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      this.$router.push({
        name: 'invoiceForm',
        params: {
          currentNode: this.currentNode,
          orgTree: this.$refs.treeCom.$refs.treeCom,
          type: flag === 'add' ? '1' : '2',
          invoice: val,
        },
      });
    },
    deleteinvoice() {
      this.currentNode.invoiceinfo = null;
      this.exrinfolist.invlist = [];
      let dataArray = this.$refs.treeCom.getData();
      this.loading = true;
      this.$store
        .dispatch('orgTreeStore/saveTree', dataArray[0])
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    addbank(flag, val) {
      this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      this.$router.push({
        name: 'bankForm',
        params: {
          currentNode: this.currentNode,
          orgTree: this.$refs.treeCom.$refs.treeCom,
          type: flag === 'add' ? '1' : '2',
          bank: val,
        },
      });
    },
    deletebank(data) {
      const index = this.exrinfolist.banlist.findIndex(d => d._id === data._id);
      this.exrinfolist.banlist.splice(index, 1);
      let dataArray = this.$refs.treeCom.getData();
      this.loading = true;
      this.$store
        .dispatch('orgTreeStore/saveTree', dataArray[0])
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    cancelForm() {
      if (this.$store.getters.historyUrl) {
        this.$router.push(this.$store.getters.historyUrl);
      }
    },
  },
  mounted() {
    this.getInitData();
    this.$store.commit('global/SET_OPERATEID', '');
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
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
