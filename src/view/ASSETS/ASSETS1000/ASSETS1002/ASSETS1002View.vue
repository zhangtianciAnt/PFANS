<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui';
    import moment from "moment";
    import {getStatus} from '@/utils/customize';

    export default {
        name: 'ASSETS1002View',
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.ASSETS1002VIEW",
                data: [],
                columns: [
                    {
                        code: 'inventorycycle',
                        label: 'label.ASSETS1002VIEW_INVENTORYCYCLE',
                        width: 90,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'totalnumber',
                        label: 'label.ASSETS1002VIEW_TOTALNUMBER',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'inquantity',
                        label: 'label.ASSETS1002VIEW_INQUANTITY',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'unquantity',
                        label: 'label.ASSETS1002VIEW_UNQUANTITY',
                        width: 160,
                        fix: false,
                        filter: true
                    },
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'new', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'delete', 'name': 'button.delete', 'disabled': false, 'icon': 'el-icon-delete'},
                ],
                rowid: '',
                row_id: 'inventoryplan_id'
            };
        },
        mounted() {
        },
        methods: {
            rowClick(row) {
                this.rowid = row.inventoryplan_id;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
              if (val === 'new') {
                this.$router.push({
                  name: 'ASSETS1002FormView',
                  params: {
                    _id: this.rowid,
                    disabled: true
                  }
                })
              }
                if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'error',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'ASSETS1002FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
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
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
