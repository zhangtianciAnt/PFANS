<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :no-back="true" :data="data" :buttonList="buttonList" ref="roletable"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :rowid="rowid" :showSelection="isShow">
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
    name: 'PFANS5012FormView',
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
        title: "title.PFANS5012FormView",
        data: [],
        transferData: [],
        selectedlist: [],
        isShow:true,
        columns: [
          {
            code: 'username',
            label: 'label.user_name',
            width: 120,
            fix: false,
            filter: true
          },
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
            code: 'team_name',
            label: 'label.team',
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

          {
            code: 'work_memo',
            label: 'label.PFANS5008VIEW_GZBZ',
            width: 140,
            fix: false,
            filter: true
          },
        ],
        buttonList: [
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        row: '',
        rowid: '',
      };
    },
    mounted() {
    },
    methods: {
      buttonClick(val) {
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
