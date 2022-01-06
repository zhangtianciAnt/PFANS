<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" v-loading="loading" :buttonList="buttonList" :title="title"
                         @buttonClick="buttonClick">
      <div slot="customize" style="margin-top: 4vw;">
        <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="8vw" style="padding: 2vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.workflow_name')" prop="workflowname">
                <el-input v-model="form.workflowname" maxlength="255" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.workflow_page')" prop="formid">
                <el-select v-model="form.formid" style="width:20vw">
                  <el-option
                    v-for="item in menuList"
                    :key="item.menuurl"
                    :label="$t(item.name)"
                    :value="item.menuurl">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.workflow_code')" prop="code">
                <el-input v-model="form.code" maxlength="5" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item :label="$t('label.workflow_remarks')">
              <el-input v-model="form.workflowtext" style="width: 72vw" type="textarea"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <el-steps :active="editableTabs.length" align-center style="padding: 3vw">
          <el-step v-for="(item, index) in editableTabs" :key="item.name" :title="$t(item.title)"></el-step>
        </el-steps>

        <el-tabs v-model="editableTabsValue" closable type="border-card" @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="$t(item.title)"
            :name="item.name"
          >
            <workflowNodeFormView :ref="item.name" :no="item.name" :nodedata="item.nodedata"
                                  @nameChange="nameChange"></workflowNodeFormView>
          </el-tab-pane>
        </el-tabs>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import workflowNodeFormView from '../workflow/workflowNodeFormView.vue';
import {menu} from '@/utils/menu';
import {uploadUrl} from '@/utils/customize';

import {Message} from 'element-ui';

export default {
  name: 'workflowFormView',
  components: {
    EasyNormalContainer,
    workflowNodeFormView,
  },
  data() {
    return {
      datalist: [],
      fileList: [],
      upload: uploadUrl(),
      loading: false,
      title: 'title.workflow',
      buttonList: [
        {key: 'save', name: 'button.save'},
        {key: 'addNode', name: 'button.addNode'},
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
        nodeList: [],
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
      },
    };
  },
  mounted() {
    let menus = menu().filter(item => item._id === 'homePage')[0].menus;
    menus.map(item => {
      if (!item.children || item.children.length === 0) {
        this.menuList.push(item);
      } else {
        item.children.map(
          citem => {
            if (!citem.children || citem.children.length === 0) {
              this.menuList.push(citem);
            } else {
              citem.children.map(
                ccitem => {
                  if (!ccitem.children || ccitem.children.length === 0) {
                    this.menuList.push(ccitem);
                  } else {
                    ccitem.children.map(
                      cccitem => {
                        if (!cccitem.children || cccitem.children.length === 0) {
                          this.menuList.push(cccitem);
                        }
                      },
                    );
                  }
                },
              );
            }
          },
        );
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
              nodedata: this.form.nodeList[i],
            });
          }
          if (this.form.nodeList.length > 0) {
            this.editableTabsValue = '1';
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
            this.form.nodeList.push(this.$refs[i + 1][0].form);
          }

        }
        this.$refs['form'].validate((valid) => {
          if (valid) {
            //add fr 添加流程名/识别码的重复check
            if (this.form.code !== '' || this.form.workflowname !== '') {
              this.loading = true;
              this.$store
                .dispatch('workflowStore/getWorkflowList', {})
                .then(response => {
                  this.datalist = response;
                  let data1 = this.datalist.filter(item => item.workflowname === this.form.workflowname && item.workflowid !== this.$route.params._id);
                  let data2 = this.datalist.filter(item => item.code === this.form.code && item.workflowid !== this.$route.params._id);
                  if (data1.length > 0) {
                    Message({
                      message: this.$t('label.workflow_check2'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                  } else if (data2.length > 0) {
                    Message({
                      message: this.$t('label.workflow_check1'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                  } else {
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
                            duration: 5 * 1000,
                          });
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

                    } else {
                      this.loading = true;
                      this.$store
                        .dispatch('workflowStore/createWorkflow', this.form)
                        .then(response => {
                          this.data = response;
                          Message({
                            message: this.$t('normal.success_01'),
                            type: 'success',
                            duration: 5 * 1000,
                          });
                          this.loading = false;
                          if (this.$store.getters.historyUrl) {
                            this.$router.push(this.$store.getters.historyUrl);
                          }
                        })
                        .catch(error => {
                          this.$message.error({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000,
                          });
                          this.loading = false;
                        });
                    }
                  }
                  this.loading = false;
                })
                .catch(error => {
                  this.$message.error({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000,
                  });
                });
            }
            //add to
          } else {
            Message({
              message: this.$t('normal.error_12'),
              type: 'error',
              duration: 5 * 1000,
            });
          }
        });
      }
      if (val === 'addNode') {
        this.addTab(this.editableTabsValue);
      }
    },
    addTab(targetName) {
      this.tabIndex = this.editableTabs.length;
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'label.new_node',
        name: newTabName,
        nodedata: {
          nodeusertype: '1',
        },
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      this.$confirm(this.$t('normal.info_02'), this.$t('normal.info'), {
        confirmButtonText: this.$t('button.confirm'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning',
        center: true,
      }).then(() => {
        let tabs = this.editableTabs;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        var newname = 1;
        this.editableTabs.map((item) => {
          item.name = newname;
          newname++;
        });
        this.editableTabsValue = 1;
      });

    },
    nameChange(val, name) {
      var item = this.editableTabs.filter(item => item.name === name);
      if (item.length > 0) {
        item[0].title = val;
      }
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
