<template>
  <div element-loading-spinner="el-icon-loading" style="min-height: 100%">
    <el-card class="box-card">
      <!--<el-card class="box-card">-->
      <div element-loading-spinner="el-icon-loading" slot="header" style="height: 100%" v-loading="vloading">
        <el-row>
          <easy-button-bar :data="buttons" @buttonClick="buttonClick"></easy-button-bar>
          <easy-work-flow :canStart="canStart" :workflowCode="workflowCode"
                          @canStartWorkflow="canStartWorkflow"
                          @canViewWorkflow="canViewWorkflow"
                          @changeLoading="changeLoading" @end="end" @start="start" @workflowState="workflowState"
                          ref="workflow"></easy-work-flow>
        </el-row>
      </div>
      <div align="right" class="filter-container" style="padding-bottom: 1rem">
        <span class="Title_front main_color" style="float:left">{{$t(title)}}</span>
      </div>
      <slot name="customize"></slot>
    </el-card>
  </div>
</template>

<script>
  import EasyButtonBar from '@/components/EasyButtonBar'
  import EasyWorkFlow from '@/components/EasyWorkFlow'

  export default {
    name: 'index',
    data() {
      return {
        buttons: [],
        defaultbuttons: [{'key': 'back', 'name': 'button.back', 'disabled': false, 'icon': 'el-icon-back'}],
        enabled: [],
        vloading: false,
        canStartWorkflowVal: false,
        canViewWorkflowVal: false
      }
    },
    components: {
      EasyButtonBar,
      EasyWorkFlow
    },
    props: {
      //详情画面标题
      title: {
        type: String,
        default: ''
      },
      buttonList: {
        type: Array,
        default: function () {
          return []
        }
      },
      canStart: {
        type: Boolean,
        default: false
      },
      workflowCode: {
        type: String,
        default: ""
      },
      loading: {
        type: Boolean,
        default: false
      },
      noback: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      start() {
        this.$emit('start')
      },
      end() {
        this.$emit('end')
      },
      workflowState(val) {
        this.$emit('workflowState', val)
      },
      buttonClick(val) {
        if ('back' === val) {
          if (this.$store.getters.historyUrl && this.$store.getters.historyUrl !== '') {
            this.$router.push(this.$store.getters.historyUrl)
          } else {
            this.$emit('buttonClick', val)
          }
        } else {
          this.$emit('buttonClick', val)
        }
      },
      changeLoading(val) {
        this.vloading = val
      },
      canStartWorkflow(val) {
        this.canStartWorkflowVal = val;
        if (!this.canStartWorkflowVal && this.canViewWorkflowVal) {
          for (var i = 1; i < this.buttons.length; i++) {
            this.buttons[i].disabled = true
          }
        } else {
          for (var i = 0; i < this.enabled.length; i++) {
            this.buttons[i].disabled = this.enabled[i]
          }
        }
      },
      canViewWorkflow(val) {
        this.canViewWorkflowVal = val;
        if (!this.canStartWorkflowVal && this.canViewWorkflowVal) {
          for (var i = 1; i < this.buttons.length; i++) {
            this.buttons[i].disabled = true
          }
        } else {
          for (var i = 0; i < this.enabled.length; i++) {
            this.buttons[i].disabled = this.enabled[i]
          }
        }
      }
    },
    mounted() {
      if (this.noback) {
        this.buttons = this.buttonList
      } else {
        this.buttons = this.defaultbuttons.concat(this.buttonList)
      }
      this.buttons.map((map) => {
        this.enabled.push(map.disabled)
      });
      if (this.$route.params._id && this.$route.params._id !== '') {
        // if(!this.$route.params.disabled){
        this.$refs.workflow.isStartWorkflow();
        this.$refs.workflow.isOperationWorkflow();
        this.$refs.workflow.isViewWorkflow();
        this.$refs.workflow.isDelWorkflow()
        // }else{
        //   this.$refs.workflow.isStartWorkflow2()
        //   this.$refs.workflow.isViewWorkflow2()
        // }

      }
    },
    watch: {
      loading(val) {
        this.vloading = val;
      }
    }
  }
</script>
<style lang='scss'>
  .el-input.is-disabled .el-input__inner {
    background-color: white;
    border-color: #E4E7ED;
    color: #C0C4CC;
    cursor: not-allowed;
  }
  .el-textarea.is-disabled .el-textarea__inner{
    background-color: white;
    border-color: #E4E7ED;
    color: #C0C4CC;
    cursor: not-allowed;
  }
</style>
