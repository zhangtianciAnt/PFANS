<template>
  <div>
    <el-dialog :title="$t('menu.startworkflow')" :visible.sync="startWorkflow" @close="refresh" append-to-body center
               size="60%" width="50%">
      <div style="min-height:40rem" v-loading="loading" element-loading-spinner="el-icon-loading">
        <el-card class="box-card">
          <el-select @change="changed" style="width:100%;padding-top: 1rem"
                     v-model="selectId">
            <el-option :key="item.workflowid" :label="item.workflowname" :value="item.workflowid"
                       v-for="item in Workflowlist">
            </el-option>
          </el-select>
        </el-card>

        <el-steps :active="editableTabs.length" align-center style="padding: 40px">
          <el-step :key="item.name" :title="$t(item.title)" v-for="(item, index) in editableTabs"></el-step>
        </el-steps>

        <el-tabs style="padding-top: 40px" type="card" v-model="editableTabsValue">
          <el-tab-pane
            :key="item.name"
            :label="$t(item.title)"
            :name="item.name"
            v-for="(item, index) in editableTabs"
          >
            <workflowNodeFormView :disabled="FormView" :no="item.name" :nodedata="item.nodedata"
                                  :ref="item.name"></workflowNodeFormView>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span class="dialog-footer" slot="footer">
            <el-button @click="submit" type="primary">{{$t('button.confirm')}}</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import workflowNodeFormView from '@/view/workflow/workflowNodeFormView.vue'

  export default {
    name: 'Start',
    components: {
      workflowNodeFormView
    },
    data () {
      return {
        FormView: true,
        Workflowlist: [],
        workindex: '', // 选中节点
        nodeData: [],
        loading: true,
        editableTabs: [],
        startWorkflow: false,
        editableTabsValue: '0',
        selectId: '',
        workflowform: {
          menuUrl: '',
          dataId: '',
          dataUrl: '',
          workFlowId: '',
          userList: []
        }
      }
    },
    props: {
      data: {
        type: Array
      },
      userlist: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      refresh () {
        this.$emit('refresh')
      },
      activityNode (index) {
        this.workindex = index
      },
      /**
       * 流程节点查询
       * workflowid 流程id
       */
      selectWorkflowstep (workflowid) {
        this.loading = true
        this.editableTabs = []
        this.$store
          .dispatch('workflowStore/getWorkflowOne', {'workflowid': workflowid})
          .then(response => {
            this.form = response

            for (var i = 0; i < this.form.nodeList.length; i++) {

              let newTabName = ++this.tabIndex + ''
              this.editableTabs.push({
                title: this.form.nodeList[i].nodename,
                name: this.form.nodeList[i].nodeord.toString(),
                nodedata: this.form.nodeList[i]
              })
            }
            if (this.form.nodeList.length > 0) {
              this.editableTabsValue = '1'
            }

            this.loading = false
          })
          .catch(err => {
            this.loading = false
          })
      },
      changed (val) {
        this.loading = true
        this.selectId = val
        this.selectWorkflowstep(val)
      },
      submit () {
        this.$confirm(this.$t('normal.info_05'), this.$t('normal.info'), {
          confirmButtonText: this.$t('button.confirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'info'
        }).then(() => {
          this.loading = true
          this.workflowform.dataId = this.$store.getters.operateId
          this.workflowform.menuUrl = this.$store.getters.workflowUrl
          this.workflowform.dataUrl = this.$route.path
          this.workflowform.workFlowId = this.selectId
          this.workflowform.userlist = this.userlist;

          this.$store
            .dispatch(
              'EasyWorkflowStore/StartWorkflow',
              this.workflowform
            )
            .then(response => {
              if (response && response.code === 0) {
                this.$message({
                  message: this.$t('normal.success_03'),
                  type: 'success'
                })
                this.$emit('start')
                this.startWorkflow = false
              } else {
                this.$message({
                  message: response.message,
                  type: 'error'
                })
                this.loading = false
              }
            })
            .catch(error => {
              this.$message({
                message: this.$t('normal.error_04'),
                type: 'error'
              })
              this.loading = false
            })
        })
      }
    },
    mounted () {
    },
    watch: {
      data (val) {
        this.Workflowlist = val
      }
    }
  }
</script>
