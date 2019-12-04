<template>
  <div>
    <el-dialog :title="$t('title.workflowlog')" :visible.sync="viewWorkflow" @close="refresh" append-to-body center
               direction="rtl" min-height="100%" size="60%" width="50%">
      <div v-loading="loading" element-loading-spinner="el-icon-loading">
        <el-steps align-center>
          <el-step :key="item.id"
                   :status="item.stepStatus === $t('label.node_step1') ?'success':((item.stepStatus === $t('label.node_step2') || item.stepStatus === $t('label.node_step3'))?'error':(item.stepStatus === $t('label.node_step4')?'process':'wait'))"
                   v-for="item in logDetail">
            <el-popover min-width="200" placement="top-start" slot="title" trigger="hover">
              <el-table :data="item.detail">
                <el-table-column :formatter="formatter" :label="$t('label.user_name')" property="userId"
                                 show-overflow-tooltip
                                 width="80"></el-table-column>
                <el-table-column :label="$t('label.result')" property="result" show-overflow-tooltip
                                 width="80"></el-table-column>
                <el-table-column :label="$t('label.remarks')" property="remark" show-overflow-tooltip
                                 width="150"></el-table-column>
                <el-table-column :formatter="formatter" :label="$t('label.start')" property="sdata"
                                 show-overflow-tooltip
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

        <el-timeline style="padding-top: 30px;max-height: 500px;overflow-y: scroll">
          <el-timeline-item
            :key="index"
            :timestamp="(item.sdata)" :type="index.toString() === '0'?'primary':'info'"
            v-for="(item, index) in logDetail2">
            {{item.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getUserInfo} from '../../utils/customize'

  let moment = require('moment')
  export default {
    name: 'Log',
    components: {},
    data () {
      return {
        workflow: {
          menuUrl: '',
          dataId: ''
        },
        viewWorkflow: false,
        logDetail: [],
        logDetail2: [],
        loading: true
      }
    },
    props: {},
    methods: {
      refresh () {
        this.$emit('refresh')
      },
      getlogDetail () {
        this.loading = true
        this.workflow.dataId = this.$store.getters.operateId
        this.workflow.menuUrl = this.$store.getters.workflowUrl
        this.$store
          .dispatch('EasyWorkflowStore/ViewWorkflow', this.workflow)
          .then(response => {
            if (response && response.code === 0) {
              this.logDetail = response.data
              this.$store
                .dispatch('EasyWorkflowStore/ViewWorkflow2', this.workflow)
                .then(response => {
                  if (response && response.code === 0) {
                    this.logDetail2 = response.data
                    this.logDetail2.map(item => {
                      if (item.sdata && item.sdata != '') {
                        item.sdata = moment(item.sdata).format('YYYY-MM-DD HH:mm:ss')
                      }
                      if (item.isvirtual === '0') {
                        item.content = item.result
                      } else {
                        let userinfo = getUserInfo(item.userId)
                        item.content = userinfo.userinfo.customername + ' ' + item.result + this.$t('title.workflow') + '！'
                      }
                    })
                    this.loading = false
                  }
                })
                .catch(error => {

                })
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
      }
    },
    watch: {}
  }
</script>
