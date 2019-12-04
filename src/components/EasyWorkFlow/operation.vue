<template>
  <div>
    <el-dialog :visible.sync="operationWorkflow" @close="refresh" append-to-body center direction="rtl" size="50%"
               title="进行审批" width="50%">
      <div v-loading="loading" element-loading-spinner="el-icon-loading">
        <el-steps align-center>
          <el-step :key="item.id" :status="item.stepStatus === $t('label.node_step1') ?'success':((item.stepStatus === $t('label.node_step2') || item.stepStatus === $t('label.node_step3'))?'error':(item.stepStatus === $t('label.node_step4')?'process':'wait'))"
                   v-for="item in logDetail">
            <el-popover min-width="200" placement="top-start" slot="title" trigger="hover">
              <el-table :data="item.detail">
                <el-table-column :formatter="formatter" :label="$t('label.user_name')" property="userId" show-overflow-tooltip
                                 width="80"></el-table-column>
                <el-table-column :label="$t('label.result')" property="result" show-overflow-tooltip
                                 width="80"></el-table-column>
                <el-table-column :label="$t('label.remarks')" property="remark" show-overflow-tooltip
                                 width="150"></el-table-column>
                <el-table-column :formatter="formatter" :label="$t('label.start')" property="sdata" show-overflow-tooltip
                                 width="80"></el-table-column>
                <el-table-column :formatter="formatter" :label="$t('label.end')" property="edata" show-overflow-tooltip
                                 width="80"></el-table-column>
              </el-table>
              <span slot="reference">
                                {{item.title}}
                            </span>
            </el-popover>
          </el-step>
        </el-steps>
        <el-form :model="OperationData" label-width="80px" ref="form" style="padding-top: 30px"
                 v-if="operationWorkflow">
          <el-form-item label="注意事项">

              <el-popover
                placement="right"
                width="500"
                trigger="hover"
                :content="data.remarks">
                <div style="color: #DF4848;max-height: 5rem;overflow: hidden" slot="reference">
                {{data.remarks}}
                </div>
              </el-popover>

          </el-form-item>
          <el-form-item label="结果">
            <el-radio-group @change="radiochange" v-model="OperationData.result">
              <el-radio border label="0" v-if="this.steptype==='2'?true:false">通过</el-radio>
              <el-radio border label="1" v-if="this.steptype==='2'?true:false">驳回</el-radio>
              <el-radio border label="3" v-if="this.steptype==='1'?true:false">同意</el-radio>
              <el-radio border label="4" v-if="this.steptype==='1'?true:false">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审批意见">
            <el-input :rows="6" placeholder="请输入内容" type="textarea" v-model="OperationData.remark">
            </el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer" slot="footer">
                <el-button @click="submit" type="primary">确定</el-button>
              </span>

      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getUserInfo} from '../../utils/customize'
  import user from '../../view/components/user.vue'

  let moment = require('moment')
  export default {
    name: 'Operation',
    components: {
      user
    },
    data () {
      return {
        OperationData: {
          id: '',
          menuUrl: '',
          dataId: '',
          result: '0',
          toAnotherUser: '',
          nextStepUser: [],
          users: '',
          remark: ''
        },
        workflow: {
          menuUrl: '',
          dataId: ''
        },
        userList: [],
        logDetail: [],
        toAnotherUserDisabled: true,
        nextStepUserDisabled: true,
        operationWorkflow: false,
        steptype: '',
        loading: true,
        notice:''
      }
    },
    props: {
      data: {
        type: Object,
        default: function () {
          return {
            id: '1',
            type: '1',
            remarks:''
          }
        }
      },
      userlist:{
      type:Array,
      default:function () {
        return []
      }
    }
    },
    methods: {
      radiochange (value) {
        switch (value) {
          case '3':
            this.toAnotherUserDisabled = true
            this.nextStepUserDisabled = true
            this.OperationData.remark =
              this.$store.state.baseInfo.userName + '：同意'
            break
          case '4':
            this.toAnotherUserDisabled = true
            this.nextStepUserDisabled = true
            this.OperationData.remark =
              this.$store.state.baseInfo.userName + '：拒绝'
            break
          case '11':
            this.toAnotherUserDisabled = false
            this.nextStepUserDisabled = true
            this.OperationData.remark = ''
            break
          case '5':
            this.toAnotherUserDisabled = true
            this.nextStepUserDisabled = false
            this.OperationData.remark = ''
            break
          default:
            this.toAnotherUserDisabled = true
            this.nextStepUserDisabled = true
            this.OperationData.remark = ''
            break
        }
      },
      refresh () {
        this.OperationData.id = ''
        this.OperationData.dataId = ''
        this.OperationData.result = '0'
        this.OperationData.toAnotherUser = ''
        this.OperationData.nextStepUser = []
        this.OperationData.users = ''
        this.OperationData.remark = ''
        this.$emit('refresh')
      },
      submit () {
        this.$confirm('是否确认提交当前操作内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.loading = true
          this.$refs.form.validate(valid => {
            if (valid) {
              this.OperationData.id = this.data.id
              this.OperationData.dataId = this.$store.getters.operateId
              this.OperationData.menuUrl = this.$store.getters.workflowUrl
              this.OperationData.dataUrl = this.$route.path
              this.OperationData.userlist = this.userlist;
              this.$store
                .dispatch(
                  'EasyWorkflowStore/OperationWorkflow',
                  this.OperationData
                )
                .then(response => {
                  if (response && response.code === 0) {
                    this.$message({
                      message: this.$t('normal.success_03'),
                      type: 'success'
                    })
                    this.$emit('workflowState', response.data)
                    this.operationWorkflow = false
                  } else {
                    this.$message({
                      message:response.message,
                      type: 'error'
                    })
                    this.loading = false
                  }
                })
                .catch(error => {
                  this.$message({
                    message:this.$t('normal.error_04'),
                    type: 'error'
                  })
                  this.loading = false
                })
            } else {
              this.loading = false
            }
          })
        })
      },
      getlogDetail () {
        this.workflow.dataId = this.$store.getters.operateId
        this.workflow.menuUrl = this.$store.getters.workflowUrl
        this.$store
          .dispatch('EasyWorkflowStore/ViewWorkflow', this.workflow)
          .then(response => {
            if (response && response.code === 0) {
              this.logDetail = response.data
              this.loading = false
            }
          })
          .catch(error => {
          })
      },
      formatter (row, column) {
        if (column.property === 'userId') {
          let userinfo = getUserInfo(row[column.property])
          if (userinfo) {
            return userinfo.userinfo.customername
          } else {
            return ''
          }
        }
        if (column.property === 'sdata') {
          if (row[column.property] && row[column.property] != '') {
            return moment(row[column.property]).format('YYYY-MM-DD HH:mm:ss')
          } else {
            return ''
          }

        }
        if (column.property === 'edata') {
          if (row[column.property] && row[column.property] != '') {
            return moment(row[column.property]).format('YYYY-MM-DD HH:mm:ss')
          } else {
            return ''
          }
        }
      },
      init () {
        this.steptype = this.data.type
        if (this.steptype === '0') {
          this.OperationData.result = '3'
          this.toAnotherUserDisabled = true
          this.nextStepUserDisabled = true
          this.OperationData.remark =
            this.$store.state.baseInfo.userName + '：同意'
        } else {
          this.OperationData.result = '0'
          this.toAnotherUserDisabled = true
          this.nextStepUserDisabled = true
          this.OperationData.remark = ''
        }
      }
    },
    mounted () {
    },
    watch: {}
  }
</script>

<style lang='scss'>

</style>
