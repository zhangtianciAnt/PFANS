<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" >
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import { Message } from 'element-ui'
  import {getDictionaryInfo,getOrgInfo,getStatus} from '@/utils/customize';

  export default {
    name: 'PFANS5009VIEW',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS5009VIEW",
        data: [],
        submitted: this.$t('label.PFANS5009FORMVIEW_SUBMITTED'),
        notsubmitted: this.$t('label.PFANS5009FORMVIEW_NOTSUBMITTED'),
        phasestatus0: this.$t('label.PFANS5009FORMVIEW_PHASESTATUS0'),
        phasestatus1: this.$t('label.PFANS5009FORMVIEW_PHASESTATUS1'),
        contractstatus0: this.$t('label.PFANS5009FORMVIEW_CONTRACTSTATUS0'),
        contractstatus1: this.$t('label.PFANS5009FORMVIEW_CONTRACTSTATUS1'),
        contractstatus2: this.$t('label.PFANS5009FORMVIEW_CONTRACTSTATUS2'),
        columns: [
           {
             code: 'numbers',
             label: 'label.PFANS5009VIEW_PROJECTNO',
             width: 110,
             fix: false,
             filter: true,
           },
          {
            code: 'project_name',
            label: 'label.PFANS5009VIEW_PROJECTNAME',
            width: 110,
            fix: false,
            filter: true,
          },
          {
            code: 'phase',
            label: 'label.PFANS5009VIEW_PHASE',
            width: 110,
            fix: false,
            filter: true,
          },
          {
            code: 'productstatus',
            label: 'label.PFANS5009VIEW_PRODUCTSTATUS',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'phasestatus',
            label: 'label.PFANS5009VIEW_STAGESTATUS',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'estimatedwork',
            label: 'label.PFANS5009VIEW_ESTIMATEDWORK',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'actualwork',
            label: 'label.PFANS5009VIEW_ACTUALWORK',
            width: 150,
            fix: false,
            filter: true,
          },
          // {
          //   code: 'zpqk',
          //   label: 'label.PFANS5009VIEW_SITUATION',
          //   width: 150,
          //   fix: false,
          //   filter: true,
          // },
          {
            code: 'contractstatus',
            label: 'label.PFANS5009VIEW_STATUS',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 150,
            fix: false,
            filter: true,
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          // {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        rowid: '',
        row : 'companyprojects_id'
      };
    },
    mounted: function() {
      this.loading = true;
      this.$store
        .dispatch('PFANS5009Store/getSiteList')
        .then(response => {
           for (let j = 0; j < response.length; j++) {
             if (response[j].phase !== null && response[j].phase !== "") {
               let letPhase = getDictionaryInfo(response[j].phase);
               if (letPhase != null) {
                 response[j].phase = letPhase.value1;
               }
             }
             if (response[j].phasestatus !== null && response[j].phasestatus !== "") {
               if(response[j].phasestatus === "0") {
                 response[j].phasestatus = this.phasestatus0
               }else {
                 response[j].phasestatus = this.phasestatus1
               }
             }
             if (response[j].contractstatus !== null && response[j].contractstatus !== "") {
               if(response[j].contractstatus === "0") {
                 response[j].contractstatus = this.contractstatus0
               }else if(response[j].contractstatus === "1"){
                 response[j].contractstatus = this.contractstatus1
               }else {
                 response[j].contractstatus = this.contractstatus2
               }
             }
             if (response[j].status !== null && response[j].status !== "") {
               response[j].status = getStatus(response[j].status);
             }
           }
          this.data = response;
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
    methods: {
        rowClick(row) {
          this.rowid = row.companyprojects_id
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS5009FormView',
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
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS5009FormView',
            params: {
              _id: this.rowid,
              disabled: false,
              adddisabled: true,
            }
          })
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
