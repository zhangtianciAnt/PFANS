<template>
  <div>
    <el-dialog :title="$t('menu.startworkflow')" :visible.sync="startWorkflow" append-to-body center size="60%"
               width="50%" @close="refresh">
      <div v-loading="loading" element-loading-spinner="el-icon-loading" style="min-height:40rem">
        <el-card class="box-card">
          <el-select v-model="selectId" style="width:100%;padding-top: 1rem"
                     @change="changed">
            <el-option v-for="item in Workflowlist" :key="item.workflowid" :label="item.workflowname"
                       :value="item.workflowid">
            </el-option>
          </el-select>
        </el-card>

        <el-steps :active="editableTabs.length" align-center style="padding: 40px">
          <el-step v-for="(item, index) in editableTabs" :key="item.name" :title="$t(item.title)"></el-step>
        </el-steps>

        <el-tabs v-model="editableTabsValue" style="padding-top: 40px" type="card">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="$t(item.title)"
            :name="item.name"
          >
            <workflowNodeFormView :ref="item.name" :disabled="FormView" :no="item.name"
                                  :nodedata="item.nodedata"></workflowNodeFormView>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">{{ $t('button.confirm') }}</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
import workflowNodeFormView from '@/view/workflow/workflowNodeFormView.vue';

export default {
  name: 'Start',
  components: {
    workflowNodeFormView,
  },
  data() {
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
        userList: [],
      },
    };
  },
  props: {
    data: {
      type: Array,
    },
    userlist: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  methods: {
    refresh() {
      this.$emit('refresh');
    },
    activityNode(index) {
      this.workindex = index;
    },
    /**
     * 流程节点查询
     * workflowid 流程id
     */
    selectWorkflowstep(workflowid) {
      this.loading = true;
      this.editableTabs = [];
      this.$store
        .dispatch('workflowStore/getWorkflowOne', {'workflowid': workflowid})
        .then(response => {
          this.form = response;

          for (var i = 0; i < this.form.nodeList.length; i++) {

            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
              title: this.form.nodeList[i].nodename,
              name: this.form.nodeList[i].nodeord.toString(),
              nodedata: this.form.nodeList[i],
            });
          }
          if (this.form.nodeList.length > 0) {
            this.editableTabsValue = '1';
          }

          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    changed(val) {
      this.loading = true;
      this.selectId = val;
      this.selectWorkflowstep(val);
    },
    submit() {
      this.$confirm(this.$t('normal.info_05'), this.$t('normal.info'), {
        confirmButtonText: this.$t('button.confirm'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'info',
      }).then(() => {
        this.loading = true;
        this.$emit('changeLoading', true);
        this.workflowform.dataId = this.$store.getters.operateId;
        this.workflowform.menuUrl = this.$store.getters.workflowUrl;
        this.workflowform.dataUrl = this.$route.path;
        this.workflowform.workFlowId = this.selectId;
        this.workflowform.userList = this.userlist;

        this.$store
          .dispatch(
            'EasyWorkflowStore/StartWorkflow',
            this.workflowform,
          )
          .then(response => {
            if (response && response.code === 0) {
              this.$message.success({
                message: this.$t('normal.success_03'),
                type: 'success',
              });
              this.$emit('start', response.data);
              this.startWorkflow = false;
            } else {
              this.$message.error({
                message: response.message,
                type: 'error',
              });
              this.loading = false;
              this.$emit('changeLoading', false);
            }
          })
          .catch(error => {
            this.$message.error({
              message: this.$t('normal.error_04'),
              type: 'error',
            });
            this.loading = false;
            this.$emit('changeLoading', false);
          });
      });
    },
  },
  mounted() {
  },
  watch: {
    data(val) {
      this.Workflowlist = val;
    },
  },
};
</script>
