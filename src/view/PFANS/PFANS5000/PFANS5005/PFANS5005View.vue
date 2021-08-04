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
    name: "PFANS5005View",
    components: {
      EasyNormalTable
    },
    data(){
      return {
        loading:false,
        title:"title.PFANS5005VIEW",
        data:[],
        columns:[
          // {
          //   code: 'numrs',
          //   label: 'label.PFANS5005VIEW_PROJECTNO',
          //   width: 120,
          //   fix: false,
          //   filter: true
          // },
          {
            code: 'project_name',
            label: 'label.PFANS5005VIEW_PROJECTNAMW',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'contractnumber',
            label: 'label.PFANS5005VIEW_CONTRACTID',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'leaderid',
            label: 'PL',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'field',
            label: 'label.PFANS5005VIEW_FIELD',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'actualwork',
            label: 'label.PFANS5005VIEW_CONTRACTFORM',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'entrust',
            label: 'label.PFANS5005VIEW_DEPOSITARY',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'work',
            label: 'label.PFANS5005VIEW_WORK',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'actualstarttime',
            label: 'label.PFANS5005VIEW_STARTTIME',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'actualendtime',
            label: 'label.PFANS5005VIEW_ENDTIME',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
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
        .dispatch('PFANS5001Store/getPjList')
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            // todo status 未定 ,同 PFANS5009
            if(response[j].leaderid !== null && response[j].leaderid !== "") {
              let user = getUserInfo(response[j].leaderid);
              if (user) {
                response[j].leaderid = user.userinfo.customername;
              }
            }
            if (response[j].field !== null && response[j].field !== "") {
              let letField = getDictionaryInfo(response[j].field);
              if (letField != null) {
                response[j].field = letField.value1;
              }
            }
            if (response[j].actualstarttime !== null && response[j].actualstarttime !== "") {
              var d = new Date(response[j].actualstarttime);
              var times=d.getFullYear() + '-' + this.addZero(d.getMonth() + 1) + '-' + this.addZero(d.getDate());
              response[j].actualstarttime = times;
            }
            if (response[j].actualendtime !== null && response[j].actualendtime !== "") {
              var d = new Date(response[j].actualendtime);
              var times=d.getFullYear() + '-' + this.addZero(d.getMonth() + 1) + '-' + this.addZero(d.getDate());
              response[j].actualendtime = times;
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
            name: 'PFANS5005FormView',
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
            name: 'PFANS5005FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }

      },
      addZero(num) {
        return num < 10 ? '0' + num : num;
      }
  }
  }
</script>

<style scoped>

</style>
