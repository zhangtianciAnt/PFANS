<template>
  <div class="dpOrgIndex">
    <el-container>
      <div class="content bg" :style="error !== ''? 'border-color:red' : 'border-color:#EBEEF5'">

        <el-tag :key="item.id" type="info" v-for="item in multipleSelection" :closable="!disabled" @close="handleClose(item)" size="small">
          <el-tooltip class="item" effect="dark" :content=item.title placement="top-start">
            <span>{{ item.title.length >= 5 ? item.title.substr(0,5)+ "..." : item.title}}</span>
          </el-tooltip>
        </el-tag>
      </div>
      <el-button :disabled="disabled" @click="openDialog" icon="el-icon-search" size="small"></el-button>
      <el-dialog :visible.sync="dialogVisible" center size="50%" top="8vh" lock-scroll append-to-body>
        <el-row style="text-align: center;height: 90%;overflow: hidden">
          <EasyTree :checktrictly="true" :defaultProps="defaultProps" :defaultlist="data" :renderContent="renderContent"
                    :showCheckbox="selectType === 'Single'?false:true" :showFilter="false"
                    @nodeClick="handleClickChange" maxheight="30rem" minheight="80%" ref="treeCom" ></EasyTree>
        </el-row>
        <span slot="footer" class="dialog-footer">
        <el-button :disabled="conConfirm" @click="submit" type="primary">{{$t("button.confirm")}}</el-button>
        </span>
      </el-dialog>
      <EasyTree :checktrictly="true" :defaultProps="defaultProps" :defaultlist="data" :renderContent="renderContent"
                :showCheckbox="selectType === 'Single'?false:true" :showFilter="false" @nodeClick="handleClickChange"
                maxheight="500rem" minheight="100%" ref="treeCombak" v-show="false" @InitData="InitData" :checkedList="checkedList"></EasyTree>
    </el-container>
  </div>
</template>

<script>
  import {Message} from 'element-ui'
  import EasyTree from '@/components/EasyTree'

  export default {
    name: 'org',
    components: {
      EasyTree
    },
    mounted () {
      // this.$store
      //   .dispatch('orgTreeStore/getOrgTree')
      //   .then(response => {
      //     if(response){
      //
      //     this.data = [response]
      //     }
      //   })
      //   .catch(error => {
      //     Message({
      //       message: error,
      //       type: 'error',
      //       duration: 5 * 1000
      //     })
      //   })
      this.data = this.$store.getters.orgList;
      this.orglistids = this.orglist

      if (!Array.isArray(this.orglistids)) {
        this.orglistids = this.orglistids.split(',')
      }
      this.checkedList = this.orglistids;


      if (this.orgtype === '1') {
        this.defaultProps.disabled = function (data, node) {
          if (node.data.type === '1') {
            return false
          } else {
            return true
          }
        }

      } else if (this.orgtype === '2') {
        this.defaultProps.disabled = function (data, node) {
          if (node.data.type === '2') {
            return false
          } else {
            return true
          }
        }
      }else if (this.orgtype === '3'){
        this.defaultProps.disabled = function (data, node) {
          if (node.data.type === '3') {
            return false
          } else {
            return true
          }
        }
      }
    },
    watch: {
      orglist(val){
        if(val || val === ''){
          this.orglistids = val;
          if (!Array.isArray(this.orglistids)) {
            this.orglistids = this.orglistids.split(',')
          }
          this.checkedList = this.orglistids;
        }
      }
    },
    methods: {
      handleClose(item){
        this.multipleSelection.splice(this.multipleSelection.indexOf(item), 1);

        this.orglistids = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.orglistids += this.multipleSelection[i]._id + ','
        }
        if (this.orglistids.length > 0) {
          this.orglistids = this.orglistids.substr(
            0,
            this.orglistids.length - 1
          )
        }

        this.$emit('getOrgids', this.orglistids, this.no)
        this.$refs.treeCom.$refs.treeCom.setCheckedKeys([], true)

      },
      InitData(val){
        if (!Array.isArray(val)) {
          val = [val]
        }
        this.multipleSelection = val
      },
      openDialog () {
        this.dialogVisible = true
        this.$nextTick(function () {
          if (!Array.isArray(this.orglistids)) {
            this.orglistids = this.orglistids.split(',')
          }
          this.$refs.treeCom.$refs.treeCom.setCheckedKeys(this.orglistids, true)
        })
      },
      renderContent (h, {node, data, store}) {
        return (
          < span
        style = 'font-size:0.8rem' >
          < span
      class
        = {data.type === '1' ? 'el-icon-star-on' : 'el-icon-star-off'}
        style = 'margin-right:0.5rem' > < /span>
        {
          node.label
        }
      <
        /span>)
      }
      ,
      submit () {
        let val
        if (this.selectType === 'Single') {
          val = this.currentRow
        } else {
          val = this.$refs.treeCom.$refs.treeCom.getCheckedNodes()

        }

        if (!Array.isArray(val)) {
          val = [val]
        }
        this.multipleSelection = val
        this.orglistids = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.orglistids += this.multipleSelection[i]._id + ','
        }
        if (this.orglistids.length > 0) {
          this.orglistids = this.orglistids.substr(
            0,
            this.orglistids.length - 1
          )
        }

        this.$emit('getOrgids', this.orglistids, this.no)
        this.$refs.treeCom.$refs.treeCom.setCheckedKeys([], true)
        this.dialogVisible = false
      },
      handleClickChange (val) {
        this.currentRow = val
        if (this.selectType === 'Single') {
          if (
            val.type !== this.orgtype
          ) {
            this.conConfirm = true
          } else {
            this.conConfirm = false
          }
        } else {
          this.conConfirm = false
        }
      },
    }
    ,

    data () {
      return {
        multipleSelection: [],
        orglistids: '',
        defaultProps: {
          label: 'title',
          children: 'orgs'
        },
        data: [],
        dialogVisible: false,
        checkedList:[],
        conConfirm: false
      }
    }
    ,
    props: {
      orglist: {
        type: String,
        default:
          function () {
            return ''
          }
      }
      ,
      disabled: {
        type: Boolean,
        default:
          false
      }
      ,
      selectType: {
        type: String,
        default:
          function () {
            return 'Single'
          }
      }
      ,
      orgtype: {
        type: String,
        default:
          '1'
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
    }
  }
</script>

<style lang="scss" scoped>
  .dpOrgIndex {
    .content {
      height: 34px;
      min-width: 80%;
      border: 0.1rem solid #ebeef5;
      overflow-y: scroll;
      overflow-x:hidden;
      line-height: 34px;
      padding: 0.1rem 0.5rem 0.2rem 0.5rem;
    }

    .bg {
      background: white;
      border-width: 1px;
    }
  }
</style>
