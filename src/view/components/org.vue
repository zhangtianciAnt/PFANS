<template>
  <div class="dpOrgIndex">
    <el-container>
      <div :style="error !== ''? 'border-color:red' : 'border-color:#EBEEF5'" class="content bg">

        <el-tag v-for="item in multipleSelection" :key="item.id" :closable="!disabled" size="small"
                type="info" @close="handleClose(item)">
          <el-tooltip :content=item.title class="item" effect="dark" placement="top-start">
            <span>{{ item.title.length >= 5 ? item.title.substr(0, 5) + '...' : item.title }}</span>
          </el-tooltip>
        </el-tag>
      </div>
      <el-button :disabled="disabled" icon="el-icon-search" size="small" @click="openDialog"></el-button>
      <el-dialog :visible.sync="dialogVisible" append-to-body center destroy-on-close lock-scroll size="50%" top="8vh">
        <el-row style="text-align: center;height: 90%;overflow: hidden">
          <EasyTree ref="treeCom" :checktrictly="true" :defaultProps="defaultProps" :defaultlist="data"
                    :renderContent="renderContent" :showCheckbox="selectType === 'Single'?false:true"
                    :showFilter="false" maxheight="30rem" minheight="80%" @nodeClick="handleClickChange"></EasyTree>
        </el-row>
        <span slot="footer" class="dialog-footer">
        <el-button :disabled="conConfirm" type="primary" @click="submit">{{ $t('button.confirm') }}</el-button>
        </span>
      </el-dialog>
      <EasyTree v-show="false" ref="treeCombak" :checkedList="checkedList" :checktrictly="true"
                :defaultProps="defaultProps" :defaultlist="data" :renderContent="renderContent"
                :showCheckbox="selectType === 'Single'?false:true" :showFilter="false" maxheight="500rem" minheight="100%" @InitData="InitData"
                @nodeClick="handleClickChange"></EasyTree>
    </el-container>
  </div>
</template>

<script>
import EasyTree from '@/components/EasyTree';

export default {
  name: 'org',
  components: {
    EasyTree,
  },
  mounted() {
    // this.$store
    //   .dispatch('orgTreeStore/getOrgTree')
    //   .then(response => {
    //     if(response){
    //
    //     this.data = [response]
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error({
    //       message: error,
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //   })
    var orgs = this.$store.getters.orgList;
    var result = [];
    if (orgs.length > 0) {
      result = Object.assign({}, orgs[0]);
      result.orgs = [];
    }

    for (var i_orgs = 0; i_orgs < orgs.length; i_orgs++) {
      let sub1orgs = orgs[i_orgs];
      for (var i_sub1orgs = 0; i_sub1orgs < sub1orgs.orgs.length; i_sub1orgs++) {
        let sub2orgs = sub1orgs.orgs[i_sub1orgs];
        if (sub2orgs.virtual === '0') {
          result.orgs = result.orgs.concat(sub2orgs.orgs);
        } else {
          result.orgs.push(sub2orgs);
        }
      }
    }
    this.data = [result];
    this.orglistids = this.orglist;
    if (this.orglistids != null) {
      if (!Array.isArray(this.orglistids)) {
        this.orglistids = this.orglistids.split(',');
      }
    }
    this.checkedList = this.orglistids;

    if (this.orgtype === '1') {
      this.defaultProps.disabled = function(data, node) {
        if (node.data.type === '1') {
          return false;
        } else {
          return true;
        }
      };

    } else if (this.orgtype === '2') {
      this.defaultProps.disabled = function(data, node) {
        if (node.data.type === '2') {
          return false;
        } else {
          return true;
        }
      };
    } else if (this.orgtype === '3') {
      this.defaultProps.disabled = function(data, node) {
        if (node.data.type === '3') {
          return false;
        } else {
          return true;
        }
      };
    } else if (this.orgtype === 'eff') {//有效部门
      this.defaultProps.disabled = function(data, node) {
        if (node.data.effective) {
          return false;
        } else {
          return true;
        }
      };
    } else {
      return false;
    }
  },
  watch: {
    orglist(val) {
      if (val || val === '') {
        this.orglistids = val;
        if (!Array.isArray(this.orglistids)) {
          this.orglistids = this.orglistids.split(',');
        }
        this.checkedList = this.orglistids;
      }
    },
  },
  methods: {
    handleClose(item) {
      this.multipleSelection.splice(this.multipleSelection.indexOf(item), 1);

      this.orglistids = '';
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.orglistids += this.multipleSelection[i]._id + ',';
      }
      if (this.orglistids.length > 0) {
        this.orglistids = this.orglistids.substr(
          0,
          this.orglistids.length - 1,
        );
      }

      this.$emit('getOrgids', this.orglistids, this.no);
      this.$refs.treeCom.$refs.treeCom.setCheckedKeys([], true);

    },
    InitData(val) {
      if (!Array.isArray(val)) {
        val = [val];
      }
      this.multipleSelection = val;
    },
    openDialog() {
      this.dialogVisible = true;
      this.$nextTick(function() {
        if (!Array.isArray(this.orglistids)) {
          this.orglistids = this.orglistids.split(',');
        }
        this.$refs.treeCom.$refs.treeCom.setCheckedKeys(this.orglistids, true);
      });
    },
    renderContent(h, {node, data, store}) {
      return (
        < span
          style="font-size:0.8rem">
          < span
            class
              ={data.type === '1' ? 'el-icon-star-on' : 'el-icon-star-off'}
            style="margin-right:0.5rem"> < /span>
          {
            node.label
          }
      <
        /span>);
    }
    ,
    submit() {
      let val;
      if (this.selectType === 'Single') {
        val = this.currentRow;
      } else {
        val = this.$refs.treeCom.$refs.treeCom.getCheckedNodes();

      }

      if (!Array.isArray(val)) {
        val = [val];
      }
      this.multipleSelection = val;
      this.orglistids = '';
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.orglistids += this.multipleSelection[i]._id + ',';
      }
      if (this.orglistids.length > 0) {
        this.orglistids = this.orglistids.substr(
          0,
          this.orglistids.length - 1,
        );
      }

      this.$emit('getOrgids', this.orglistids, this.no);
      this.$refs.treeCom.$refs.treeCom.setCheckedKeys([], true);
      this.dialogVisible = false;
    },
    handleClickChange(val) {
      this.currentRow = val;
      if (this.selectType === 'Single') {
        debugger
        if (this.orgtype != 'eff') {
          if (this.orgtype != '4' && val.type !== this.orgtype) {
            this.conConfirm = true;
          } else {
            this.conConfirm = false;
          }
        } else {
          if (val.effective) {
            this.conConfirm = false;
          } else {
            this.conConfirm = true;
          }
        }
      } else {
        this.conConfirm = false;
      }
    },
  }
  ,

  data() {
    return {
      multipleSelection: [],
      orglistids: '',
      defaultProps: {
        label: 'title',
        children: 'orgs',
      },
      data: [],
      dialogVisible: false,
      checkedList: [],
      conConfirm: false,
    };
  }
  ,
  props: {
    orglist: {
      type: String,
      default:
        function() {
          return '';
        },
    }
    ,
    disabled: {
      type: Boolean,
      default:
        false,
    }
    ,
    selectType: {
      type: String,
      default:
        function() {
          return 'Single';
        },
    }
    ,
    orgtype: {
      type: String,
      default:
        '1',
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
};
</script>

<style lang="scss" scoped>
.dpOrgIndex {
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
}
</style>
