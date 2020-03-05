<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :data="data" :buttonList="buttonList" ref="roletable"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :rowid="row_id" >
    </EasyNormalTable>
  </div>
</template>
<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui';
  import {getorgGroupList} from "../../../../utils/customize";
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
        checkTableData: [],
        addActionUrl: '',
        resultShow: false,
        file: null,
        loading: false,
        title: "title.PFANS5012View",
        data: [],
        transferData: [],
        selectedlist: [],
        columns: [
          {
            code: 'projectid',
            label: 'label.center',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'projectname',
            label: 'label.group',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'numbers',
            label: 'label.PFANS2009VIEW_JUNE',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'confirm',
            label: 'label.PFANS1036FORMVIEW_JOBNUMBER',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'status',
            label: 'label.status',
            width: 140,
            fix: false,
            filter: true
          },
        ],
        buttonList: [
          {'key': 'handle', 'name': 'button.handle', 'disabled': false, 'icon': 'el-icon-view'},
        ],
        rowid: '',
        row_id: 'projectname'
      };
    },
    mounted() {
      this.getProjectList();
    },
    methods: {
      rowClick(row) {
        this.rowid = row.projectname;
      },
      getProjectList(){
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/getProjectList', {StrFlg:"1"})
          .then(response => {
            debugger;
            let letuserList = this.$store.getters.orgGroupList;
            for (let i = 0;i < letuserList.length; i ++){
                let letdata = {};
                debugger;
                letdata.centerid = letuserList[i].centerid;
                letdata.projectid = letuserList[i].centername;
                letdata.groupid = letuserList[i].groupid;
                letdata.projectname = letuserList[i].groupname;
                this.data.push(letdata);
            }
            // for (let i = 0;i < response.length; i ++){
            //   if(response[i].confirm === response[i].unconfirm){
            //     response[i].status = "已确认";
            //   }
            //   else{
            //     response[i].status = "未确认";
            //   }
            // }
            //this.data = response;
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
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
