<template>
    <span>
        <el-button @click="addworkflow" plain size="mini" style="margin-left:10px" type="primary"
                   v-if="canStartWorkflow">{{$t('button.startWorkflow')}}</el-button>
        <el-button :data="OperationWorkflowData" @click="OperationWorkflow" plain size="mini" style="margin-left:10px"
                   type="primary" v-if="canOperationWorkflow">{{$t('button.operationWorkflow')}}</el-button>
        <el-button @click="ViewWorkflow" plain size="mini" style="margin-left:10px" type="primary"
                   v-if="canViewWorkflow">{{$t('button.viewWorkflow')}}</el-button>
        <el-button @click="DelWorkflow" plain size="mini" style="margin-left:10px" type="primary" v-if="canDelWorkflow">{{$t('button.delWorkflow')}}</el-button>
        <operation :data="data" :userlist="userlist" @refresh="refresh" @workflowState="workflowState"
                   ref="operation"></operation>
        <log @refresh="refresh" ref="log"></log>
        <start :data="workflowlist" :userlist="userlist" @refresh="refresh" @start="start" ref="start"></start>

    </span>
</template>

<script>
  import Operation from '@/components/EasyWorkFlow/Operation.vue'
  import Log from '@/components/EasyWorkFlow/Log.vue'
  import Start from '@/components/EasyWorkFlow/Start.vue'
  import {Message} from 'element-ui'

  export default {
    name: 'index',
    components: {
      Operation,
      Log,
      Start
    },
    data() {
      return {
        workflow: {
          menuUrl: '',
          dataId: '',
          workFlowId: ''
        },
        OperationWorkflowData: [],
        canStartWorkflow: false,
        canOperationWorkflow: false,
        canViewWorkflow: false,
        canDelWorkflow: false,
        operationWorkflow: false,
        instanceId: '',
        data: {
          id: '',
          type: ''
        },
        workflowlist: []
      }
    },
    props: {
      canStart: {
        type: Boolean,
        default: false
      },
      workflowCode: {
        type: String,
        default: ""
      },
      userlist: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      start() {
        this.refresh();
        this.$emit('start')
      },
      workflowState(val) {
        this.$emit('workflowState', val)
      },
      //是否可以插销审批
      isDelWorkflow() {
        this.$emit('changeLoading', true);
        this.workflow.dataId = this.$store.getters.operateId;
        this.workflow.menuUrl = this.$store.getters.workflowUrl;
        this.$store
          .dispatch('EasyWorkflowStore/IsDelWorkflow', this.workflow)
          .then(response => {
            this.$emit('changeLoading', false);
            if (response && response.code === 0) {
              if (response.message) {
                this.canDelWorkflow = true;
                this.instanceId = response.message
              } else {
                this.canDelWorkflow = false
              }
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.$emit('changeLoading', false)
          })
      },
      //是否可以发起审批
      isStartWorkflow() {
        this.$emit('changeLoading', true);
        this.workflow.dataId = this.$store.getters.operateId;
        this.workflow.menuUrl = this.$store.getters.workflowUrl;
        this.$store
          .dispatch('EasyWorkflowStore/IsStartWorkflow', this.workflow)
          .then(response => {
            this.$emit('changeLoading', false);
            if (response && response.code === 0) {
              if (Object.keys(response.data).length > 0) {
                let workflows = [];
                if (this.workflowCode && this.workflowCode !== "") {
                  response.data.list.filter((item) => {
                    if (item.code === this.workflowCode) {
                      workflows.push(item)
                    }
                  })
                } else {
                  workflows = response.data.list;
                }
                this.workflowlist = workflows;
                if (response.data.can === "0") {
                  this.canStartWorkflow = true;
                  this.$emit('canStartWorkflow', true)
                } else {
                  if (response.data.can === "1") {
                    this.canStartWorkflow = false;
                    this.$emit('canStartWorkflow', false)
                  } else {
                    if (this.canStart && response.data.can === "2") {
                      this.canStartWorkflow = true;
                      this.$emit('canStartWorkflow', true)
                    } else {
                      this.canStartWorkflow = false;
                      this.$emit('canStartWorkflow', false)
                    }
                  }
                }
              }
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.$emit('changeLoading', false)
          })
      },
      isStartWorkflow2() {
        this.$emit('changeLoading', true);
        this.workflow.dataId = this.$store.getters.operateId;
        this.workflow.menuUrl = this.$store.getters.workflowUrl;
        this.$store
          .dispatch('EasyWorkflowStore/IsStartWorkflow', this.workflow)
          .then(response => {
            this.$emit('changeLoading', false);
            if (response && response.code === 0) {
              if (Object.keys(response.data).length > 0) {
                if (response.data.can === "0") {
                  this.$emit('canStartWorkflow', true)
                } else {
                  if (response.data.can === "1") {
                    this.$emit('canStartWorkflow', false)
                  } else {
                    if (this.canStart && response.data.can === "2") {
                      this.$emit('canStartWorkflow', true)
                    } else {
                      this.$emit('canStartWorkflow', false)
                    }
                  }
                }
              }
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.$emit('changeLoading', false)
          })
      },
      //是否可以进行审批
      isOperationWorkflow() {
        this.$emit('changeLoading', true);
        this.workflow.dataId = this.$store.getters.operateId;
        this.workflow.menuUrl = this.$store.getters.workflowUrl;
        this.$store
          .dispatch(
            'EasyWorkflowStore/IsOperationWorkflow',
            this.workflow
          )
          .then(response => {
            this.$emit('changeLoading', false);
            if (response && response.code === 0) {
              this.OperationWorkflowData = response.data;
              if (Object.keys(response.data).length > 0) {
                this.canOperationWorkflow = true;
                this.data.id = response.data.id;
                this.data.type = response.data.type;
                this.data.remarks = response.data.remarks;
                this.data.nodeusertype = response.data.nodeusertype;

                let stepInfo = {
                  code:response.data.code,
                  no:response.data.nodeord,
                }
                console.log(stepInfo);
                this.$emit('stepInfo',stepInfo);
              } else {
                this.canOperationWorkflow = false
              }

              this.$emit('WorkflowUser',this.canOperationWorkflow);
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.$emit('changeLoading', false)
          })
      },
      //是否可以查看流程日志
      isViewWorkflow() {
        this.$emit('changeLoading', true);
        this.canViewWorkflow= false;
        this.workflow.dataId = this.$store.getters.operateId;
        this.workflow.menuUrl = this.$store.getters.workflowUrl;
        this.$store
          .dispatch('EasyWorkflowStore/IsViewWorkflow', this.workflow)
          .then(response => {
            this.$emit('changeLoading', false);
            if (response && response.code === 0) {
              this.canViewWorkflow = response.data;
              this.$emit('canViewWorkflow', this.canViewWorkflow)
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.$emit('changeLoading', false)
          })
      },
      //是否可以查看流程日志
      isViewWorkflow2() {
        this.$emit('changeLoading', true);
        this.workflow.dataId = this.$store.getters.operateId;
        this.workflow.menuUrl = this.$store.getters.workflowUrl;
        this.$store
          .dispatch('EasyWorkflowStore/IsViewWorkflow', this.workflow)
          .then(response => {
            this.$emit('changeLoading', false);
            if (response && response.code === 0) {
              this.$emit('canViewWorkflow', response.data)
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.$emit('changeLoading', false)
          })
      },
      // 发起审批
      addworkflow() {
        if(this.workflowlist.length > 1){
          this.$refs.start.startWorkflow = true;
          this.$refs.start.selectId = this.workflowlist[0].workflowid;
          this.$refs.start.selectWorkflowstep(
            this.workflowlist[0].workflowid
          )
        }else{
          // this.$refs.start.startWorkflow = false;
          this.$refs.start.selectId = this.workflowlist[0].workflowid;
          this.$refs.start.selectWorkflowstep(
            this.workflowlist[0].workflowid
          )
          this.$refs.start.submit();

        }

      },
      //关闭回掉
      refresh() {
        if (this.$route.params._id && this.$route.params._id !== '') {
          this.isStartWorkflow();
          this.isOperationWorkflow();
          this.isViewWorkflow();
          this.isDelWorkflow()
        }

      },
      //打开进行审批画面
      OperationWorkflow() {
        this.$refs.operation.operationWorkflow = true;
        this.$refs.operation.getlogDetail();
        this.$refs.operation.init()
      },
      ViewWorkflow() {
        this.$refs.log.viewWorkflow = true;
        this.$refs.log.getlogDetail()
      },
      DelWorkflow() {
        this.$confirm(this.$t('normal.info_06'), this.$t('normal.info'), {
          confirmButtonText: this.$t('button.confirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'info'
        }).then(() => {
          this.$emit('changeLoading', true);
          this.$store
            .dispatch('EasyWorkflowStore/DelWorkflow', {
              instanceId: this.instanceId
            })
            .then(response => {
              this.$emit('changeLoading', false);
              if (response && response.code === 0) {
                this.$message({
                  message: this.$t('normal.success_03'),
                  type: 'success'
                });
                this.$emit('end');
                this.refresh()
              } else {
                this.$message({
                  message: this.$t('normal.error_04'),
                  type: 'error'
                })
              }
            })
            .catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000
              });
              this.$emit('changeLoading', false)
            })
        })
      }
    },
    mounted() {
    },
    watch: {
      workflowCode(val) {
        if (val) {
          this.isStartWorkflow();
        }
      }
    }
  }
</script>
