<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading">
      <div slot="customize" style="margin-top: 4vw;">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form" style="padding: 2vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.workflow_name')" prop="workflowname">
                <el-input maxlength="255" style="width:20vw" v-model="form.workflowname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.workflow_page')" prop="formid">
                <el-select v-model="form.formid" style="width:20vw">
                  <el-option
                    :key="item.menuurl"
                    :label="$t(item.name)"
                    :value="item.menuurl"
                    v-for="item in menuList">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.workflow_code')" prop="code">
                <el-input maxlength="5" style="width:20vw" v-model="form.code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item :label="$t('label.workflow_remarks')">
              <el-input style="width: 72vw" type="textarea" v-model="form.workflowtext"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <el-steps :active="editableTabs.length" align-center style="padding: 3vw">
          <el-step :key="item.name" :title="$t(item.title)" v-for="(item, index) in editableTabs"></el-step>
        </el-steps>

        <el-tabs @tab-remove="removeTab" closable type="border-card" v-model="editableTabsValue">
          <el-tab-pane
            :key="item.name"
            :label="$t(item.title)"
            :name="item.name"
            v-for="(item, index) in editableTabs"
          >
            <workflowNodeFormView :no="item.name" :nodedata="item.nodedata" :ref="item.name"
                                  @nameChange="nameChange"></workflowNodeFormView>
          </el-tab-pane>
        </el-tabs>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer'
  import workflowNodeFormView from '../workflow/workflowNodeFormView.vue'
  import {app, menu} from '@/utils/menu'
  import {downLoadUrl, uploadUrl} from '@/utils/customize'

  import {Message} from 'element-ui'

  export default {
    name: 'workflowFormView',
    components: {
      EasyNormalContainer,
      workflowNodeFormView
    },
    data() {
      return {
        fileList: [],
        upload: uploadUrl(),
        loading: false,
        title: 'title.workflow',
        buttonList: [
          {key: 'save', name: 'button.save'},
          {key: 'addNode', name: 'button.addNode'}
        ],
        editableTabsValue: '0',
        editableTabs: [],
        tabIndex: 0,
        form: {
          workflowid: '',
          workflowname: '',
          formid: '',
          code: '',
          workflowtext: '',
          nodeList: []
        },
        menuList: [],
        rules: {
          workflowname: [
            {required: true, message: this.$t('normal.error_08') + this.$t('label.workflow_name'), trigger: 'blur'},
          ],
          formid: [
            {required: true, message: this.$t('normal.error_09') + this.$t('label.workflow_page'), trigger: 'change'},
          ],
          code: [
            {required: true, message: this.$t('normal.error_08') + this.$t('label.workflow_code'), trigger: 'blur'},
          ],
        }
      }
    },
    mounted() {
      let menus = menu().filter(item => item._id === 'homePage')[0].menus;
      menus.map(item => {
        if (!item.children || item.children.length === 0) {
          this.menuList.push(item)
        } else {
          item.children.map(
            citem => {
              if (!citem.children || citem.children.length === 0) {
                this.menuList.push(citem)
              } else {
                citem.children.map(
                  ccitem => {
                    if (!ccitem.children || ccitem.children.length === 0) {
                      this.menuList.push(ccitem)
                    }
                  }
                )
              }
            }
          )
        }
      });

      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('workflowStore/getWorkflowOne', {'workflowid': this.$route.params._id})
          .then(response => {
            this.form = response;

            for (var i = 0; i < this.form.nodeList.length; i++) {

              let newTabName = ++this.tabIndex + '';
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
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false
          })
      }
    },
    methods: {
      // 保存,创建
      buttonClick(val) {
        if (val === 'save') {
          this.form.nodeList = [];
          let rst = true;
          for (var i = 0; i < this.editableTabs.length; i++) {
            this.$refs[i + 1][0].$refs['form'].validate((valid) => {
              rst = valid;
            });
            if (!rst) {
              return;
            } else {
              this.form.nodeList.push(this.$refs[i + 1][0].form)
            }

          }
          this.$refs['form'].validate((valid) => {
            if (valid) {
              if (this.$route.params._id) {
                this.form.workflowid = this.$route.params._id;
                this.loading = true;
                this.$store
                  .dispatch('workflowStore/updateWorkflow', this.form)
                  .then(response => {
                    this.data = response;
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000
                    });
                    this.loading = false

                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000
                    });
                    this.loading = false
                  })

              } else {
                this.loading = true;
                this.$store
                  .dispatch('workflowStore/createWorkflow', this.form)
                  .then(response => {
                    this.data = response;
                    Message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
                      duration: 5 * 1000
                    });
                    this.loading = false;
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl)
                    }
                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000
                    });
                    this.loading = false
                  })
              }
            }
          })
        }
        if (val === 'addNode') {
          this.addTab(this.editableTabsValue)
        }
      },
      addTab(targetName) {
        this.tabIndex = this.editableTabs.length;
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'label.new_node',
          name: newTabName,
          nodedata: {
            nodeusertype: '1'
          }
        });
        this.editableTabsValue = newTabName
      },
      removeTab(targetName) {
        this.$confirm(this.$t('normal.info_02'), this.$t('normal.info'), {
          confirmButtonText: this.$t('button.confirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning',
          center: true
        }).then(() => {
          let tabs = this.editableTabs;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
          var newname = 1;
          this.editableTabs.map((item) => {
            item.name = newname;
            newname++
          });
          this.editableTabsValue = 1
        })

      },
      nameChange(val, name) {
        var item = this.editableTabs.filter(item => item.name === name);
        if (item.length > 0) {
          item[0].title = val
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
