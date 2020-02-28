<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :data="data" :buttonList="buttonList" ref="roletable"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :rowid="rowid" >
    </EasyNormalTable>
  </div>
</template>
<script>
  import {getToken} from '@/utils/auth'
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId, getUserInfo} from "../../../../utils/customize";
  let moment = require("moment");
  export default {
    name: 'PFANS5012View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        totaldata: [],
        total: 0,
        message: [{hang: '', error: '',}],
        Message1: true,
        result: false,
        cuowu: '',
        daoru: false,
        checkTableData: [],
        addActionUrl: '',
        resultShow: false,
        file: null,
        successCount: 0,
        errorCount: 0,
        errorList: [],
        downloadLoading: false,
        loading: false,
        title: "title.PFANS5012View",
        data: [],
        transferData: [],
        selectedlist: [],
        columns: [
          {
            code: 'center_name',
            label: 'label.center',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'group_name',
            label: 'label.group',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'project_id',
            label: 'label.PFANS5008VIEW_PROGRAM',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'log_date',
            label: 'label.PFANS5008VIEW_RIQI',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'time_start',
            label: 'label.PFANS5008FORMVIEW_SC',
            width: 140,
            fix: false,
            filter: true
          },
        ],
        buttonList: [
          {'key': 'handle', 'name': 'button.handle', 'disabled': false, 'icon': 'el-icon-view'},
        ],
        row: '',
        rowid: 'logmanagement_id',
      };
    },
    mounted() {
      this.getProjectList();
    },
    methods: {
      rowClick(row) {
        this.row = row.logmanagement_id;
      },
      getProjectList() {
        this.loading = true;
            this.$store
              .dispatch('PFANS5008Store/gettlist', {})
              .then(response => {
                  let datalist = [];
                  for (let j = 0; j < response.length; j++) {
                    for (let i = 0; i < this.transferData.length; i++) {
                      if (this.transferData[i].key === response[j].project_id) {
                        response[j].project_id = this.transferData[i].label;
                      }
                    }
                    let lst = getOrgInfoByUserId(response[j].createby);
                    let user = getUserInfo(response[j].createby)
                    if (user) {
                      response[j].username = user.userinfo.customername;
                    }
                    response[j].center_name = lst.centerNmae;
                    response[j].group_name = lst.groupNmae;
                    response[j].log_date = moment(response[j].log_date).format("YYYY-MM-DD");
                  }
                  this.data = response;
                  this.loading = false;
                }
              )
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000
                });
                this.loading = false;
              })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'handle') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS5012FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
