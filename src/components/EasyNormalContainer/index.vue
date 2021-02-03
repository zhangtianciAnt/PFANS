<template>

  <div element-loading-spinner="el-icon-loading" style="height: calc(100vh - 60px - 2rem)">
    <el-card class="box-card">
      <!--<el-card class="box-card">-->
      <div element-loading-spinner="el-icon-loading" slot="header" class="clearfix" style="height: 20px" v-loading="vloading" v-if="!Pop">
        <el-row>
          <easy-button-bar :data="buttons" @buttonClick="buttonClick"></easy-button-bar>
          <easy-work-flow :canStart="canStart" :workflowCode="workflowCode"
                          @canStartWorkflow="canStartWorkflow" :userlist="userlist"
                          @canViewWorkflow="canViewWorkflow" @StartWorkflow="StartWorkflow" :defaultStart="defaultStart"
                          :defaultDo="defaultDo" @OperationWorkflow="OperationWorkflow"
                          @changeLoading="changeLoading" @end="end" @start="start" @workflowState="workflowState"
                          ref="workflow"></easy-work-flow>
        </el-row>
      </div>
      <div align="right" class="filter-container">
        <span class="Title_front main_color" style="float:left">{{$t(title)}}
        <el-popover
          placement="right-start"
          title="温馨提示！"
          width="800"
          trigger="click">
                      <div class="el-popover__Content_customize" v-html="helpContent"></div>
          <i class="el-icon-question" v-if="showHelp" slot="reference"/>
          </el-popover></span>
      </div>
      <slot name="customize" ref="customize"></slot>
    </el-card>
  </div>

</template>

<script>
  import EasyButtonBar from '@/components/EasyButtonBar'
  import EasyWorkFlow from '@/components/EasyWorkFlow'
  import {helpContent} from "@/utils/helpContent";
  import {getDictionaryInfo} from '@/utils/customize'

  export default {
    name: 'index',
    data() {
      return {
        Pop:false,
        buttons: [],
        defaultbuttons: [{'key': 'back', 'name': 'button.back', 'disabled': false, 'icon': 'el-icon-back'}],
        enabled: [],
        vloading: false,
        canStartWorkflowVal: false,
        canViewWorkflowVal: false,
        showHelp: false,
        helpContent: ''
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
      },
      enableSave: {
        type: Boolean,
        default: false
      },
      defaultStart:{
        type:Boolean,
        default:true
      },
      defaultDo:{
        type:Boolean,
        default:true
      },
      userlist: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    methods: {
      start(val) {
        this.$emit('start',val)
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
            // if(this.$router.currentRoute.fullPath === '/PFANS1004FormView'){
            //   this.$router.push(this.$store.getters.historyUrl)
            // }else{
              this.$router.back();
            // }
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
        if (!this.enableSave) {
          if (!this.canStartWorkflowVal && this.canViewWorkflowVal) {
            for (var i = 1; i < this.buttons.length; i++) {
              this.buttons[i].disabled = true
              this.$emit('disabled', false);
            }
          } else {
            for (var i = 0; i < this.enabled.length; i++) {
              this.buttons[i].disabled = this.enabled[i]
            }
            this.$emit('disabled', true);
          }
        }
      },
      StartWorkflow(val){
        this.$emit("StartWorkflow",val)
      },
      OperationWorkflow(val){
        this.$emit("OperationWorkflow",val)
      },
      canViewWorkflow(val) {
        this.canViewWorkflowVal = val;
        if (!this.enableSave) {
          if (!this.canStartWorkflowVal && this.canViewWorkflowVal) {
            for (var i = 1; i < this.buttons.length; i++) {
              this.buttons[i].disabled = true
              this.$emit('disabled', false);
            }
          } else {
            for (var i = 0; i < this.enabled.length; i++) {
              this.buttons[i].disabled = this.enabled[i]
            }
            this.$emit('disabled', true);
          }
        }
      },
      getFileToken() {
        this.$store
          .dispatch('dictionaryStore/getFileToken', {})
          .then(response => {
            this.$store.commit("global/SET_FILETOKEN", response.data);
            console.log(response.data)
          })
      },
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
      this.getFileToken();
    },
    created() {
      let Content = helpContent().filter(item => item.id == this.$router.currentRoute.name);
      if (Content.length > 0) {
        let text = Content[0].help;
        if (text.indexOf('^') != -1) {
          let code = text.substr(text.indexOf('^') + 1, 8);
          let dic = getDictionaryInfo(code);
          if (dic) {
            text = text.replace("^" + code, dic.value1)
          }
        }
        this.helpContent = text;
        if (this.helpContent.length > 0) {
          this.showHelp = true;
        }
      }
    },
    watch: {
      loading(val) {
        this.vloading = val;
      },
      enableSave(val){
        if (this.enableSave) {
          for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].disabled = false
          }
        }
      }
    }
  }
</script>
<style lang='scss'>
  .el-input.is-disabled .el-input__inner {
    background-color: #E4E7ED;
    /*background-image: linear-gradient(to right, white,#E4E7ED);*/
    border-color: #E4E7ED;
    color: #606266;
    cursor: not-allowed;
  }
  .el-textarea.is-disabled .el-textarea__inner{
    /*background-image: linear-gradient(to right, white,#E4E7ED );*/
    background-color: #E4E7ED;
    border-color: #E4E7ED;
    color: #606266;
    cursor: not-allowed;
  }
  .el-form--label-top .el-form-item__label {
    float: none;
    display: inline-block;
    text-align: left;
    padding: 10px 0 10px 0;
    font-size: 0.8rem;
    line-height: 10px;
    color: #005BAA;
    font-weight: bold;
  }
  .el-popover__title{
    color: #005BAA;
    font-size: 16px;
    font-weight:bold;
    line-height: 1;
    margin-bottom: 5px;
  }
  .el-popover__Content_customize{
    color: #005BAA;
    font-size: 13px;
    line-height: 1;
    padding: 2px;
  }
  .collapse_Title{
    font-size: 0.85rem !important;
    color: #005BAA;
    font-weight: bold;
  }
  .Title_front{
    font-size: 1rem !important;
  }
  .main_color{
    color: #005BAA;
  }
</style>
