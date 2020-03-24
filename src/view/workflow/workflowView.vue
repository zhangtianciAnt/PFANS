<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :formatter="formatter">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import { Message } from 'element-ui'
  import { app, menu } from "@/utils/menu";
  export default {
    name: 'workflowView',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title:"title.workflow",
        // 表格数据源
        data: [],
        // 列属性
        columns: [
          {
            code: 'workflowname',
            label: 'label.workflow_name',
            width: 200,
            fix: false,
            filter: true
          },
          {
            code: 'formname',
            label: 'label.workflow_page',
            width: 200,
            fix: false,
            filter: false
          },
          {
            code: 'workflowtext',
            label: 'label.workflow_remarks',
            width: 600,
            fix: false,
            filter: false
          }
        ],
        buttonList: [
          {'key': 'new', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled':false, 'icon': 'el-icon-edit'},
          {'key': 'delete', 'name': 'button.delete', 'disabled': false, 'icon': 'el-icon-delete'}
        ],
        rowid: '',
        menuList:[]
      };
    },
    mounted () {
      this.getWorkflowList();
      this.$store.commit('global/SET_OPERATEID', '');
      let menus = menu().filter(item => item._id === "homePage")[0].menus;
      menus.map(item=>{
        if(!item.children || item.children.length === 0){
          this.menuList.push(item)
        }else{
          item.children.map(
            citem=>{
              if(!citem.children || citem.children.length === 0){
                this.menuList.push(citem)
              }else{
                citem.children.map(
                  ccitem=>{
                    if (!ccitem.children || ccitem.children.length === 0) {
                      this.menuList.push(ccitem)
                    } else {
                      ccitem.children.map(
                        cccitem => {
                          if (!cccitem.children || cccitem.children.length === 0) {
                            this.menuList.push(cccitem)
                          }
                        }
                      )
                    }
                  }
                )
              }
            }
          )
        }
      })
    },
    methods: {
      getWorkflowList(){
        this.loading = true;
        this.$store
          .dispatch('workflowStore/getWorkflowList', {})
          .then(response => {
            this.data = response;
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            })
            this.loading = false;
          })
      },
      rowClick (row) {
        this.rowid = row.workflowid;
      },
      buttonClick (val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path)
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            })
            return;
          }
          this.$router.push({
            name: 'workflowFormView',
            params: {
              _id: this.rowid
            }
          })
        }
        if (val === 'new') {
          this.$router.push({
            name: 'workflowFormView',
            params: {
              _id: ''
            }
          })
        }
        if (val === 'delete') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            })
            return;
          }
          this.delete();
        }
      },
      delete() {
        this.loading = true;
        this.$confirm(this.$t('normal.info_02'), this.$t('normal.info'), {
          confirmButtonText: this.$t('button.confirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning',
          center: true
        }).then(() => {
          this.$store
            .dispatch('workflowStore/delWorkflow', {workflowid: this.rowid})
            .then(response => {
              this.getWorkflowList();
              Message({
                message: this.$t('normal.info_03'),
                type: 'success',
                duration: 2 * 1000
              })
              this.loading = false;
            })
            .catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000
              })
              this.loading = false;
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('normal.info_04')
          });
          this.loading = false;
        });
      },
      // table格式化
      formatter(row, column) {
        if (column.property === "workflowname") {
          if (row.workflowname) {
            return row.workflowname;
          }
        }
        if (column.property === "formname") {
          if (row.formid) {
            var name = this.menuList.filter(item=>item.menuurl === row.formid)
            if(name.length > 0){
              return this.$t(name[0].name);
            }else{
              return "";
            }
          }
        }
        if (column.property === "workflowtext") {
          if (row.workflowtext) {
            return row.workflowtext;
          }
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
