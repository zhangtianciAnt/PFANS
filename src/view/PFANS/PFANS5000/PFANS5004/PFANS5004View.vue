<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {getDictionaryInfo, getStatus, getUserInfo} from '@/utils/customize';
  import {Message} from "element-ui";
  import moment from "moment";

    export default {
        name: "PFANS5004View",
      components: {
        EasyNormalTable
      },
      data(){
          return {
            loading:false,
            title:"title.PFANS5004VIEW",
            data:[],
            columns:[
              {
                code: 'project_name',
                label: 'label.PFANS5004VIEW_PROJECTNAMW',
                width: 120,
                fix: false,
                filter: true
              },
              /*阶段信息*/
              {
                code: 'phase',
                label: 'label.PFANS5009VIEW_PHASE',
                width: 120,
                fix: false,
                filter: true
              },
              {
                code: 'productstatus',
                label: 'label.PFANS5009VIEW_PRODUCTSTATUS',
                width: 120,
                fix: false,
                filter: true
              },
              {
                code: 'estimatedwork',
                label: 'label.PFANS5009VIEW_ESTIMATEDWORK',
                width: 120,
                fix: false,
                filter: true
              },
              {
                code: 'actualwork',
                label: 'label.PFANS5009VIEW_ACTUALWORK',
                width: 120,
                fix: false,
                filter: true
              },
              /*合同状态*/
              {
                code: 'status2',
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
              },
            ],
            buttonList: [
              {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
              {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'}
            ],
            rowid: '',
            row_id: 'companyprojects_id'
          }
      },
      mounted() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/getFpans5001List', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
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
              duration: 5 * 1000
            });
            this.loading = false;
          });
      },
      methods: {
        rowClick(row) {
          this.rowid = row.companyprojects_id;
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
              name: 'PFANS5004FormView',
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
              name: 'PFANS5004FormView',
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

<style scoped>

</style>
