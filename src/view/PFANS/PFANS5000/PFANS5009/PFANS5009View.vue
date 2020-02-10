<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" >
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import { Message } from 'element-ui'
  import moment from "moment";
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
        columns: [
          {
            code: 'center_id',
            label: 'label.center',
            width: 110,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 110,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
            width: 110,
            fix: false,
            filter: true,
          },
          {
            code: 'postname',
            label: 'label.PFANS5009VIEW_POSITIONTITLE',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'peoplerequired',
            label: 'label.PFANS5009VIEW_PEOPLEREQUIRED',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'workplace',
            label: 'label.PFANS5009VIEW_WORKPLACE',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'requirements',
            label: 'label.PFANS5009VIEW_REQUIREMENTS',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'applicationtime',
            label: 'label.application_date',
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
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        rowid: '',
        row : 'recruitid'
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS5009Store/getRecruit')
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            response[j].status = getStatus(response[j].status);
            let center = getOrgInfo(response[j].center_id);
            let group = getOrgInfo(response[j].group_id);
            let team = getOrgInfo(response[j].team_id);
            if(center){
              response[j].center_id = center.companyname;
            }
            if(group){
              response[j].group_id = group.companyname;
            }
            if(team){
              response[j].team_id = team.departmentname;
            }
            if (response[j].requirements !== null && response[j].requirements !== "") {
              let letRequirements = getDictionaryInfo(response[j].requirements);
              if (letRequirements != null) {
                response[j].requirements = letRequirements.value1;
              }
            }
            if (response[j].application_date !== null && response[j].application_date !== "") {
              response[j].application_date = moment(response[j].application_date).format("YYYY-MM-DD");
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
          this.loading = false
        })
    },
    methods: {
        rowClick(row) {
          this.rowid = row.recruitid
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
              disabled: false
            }
          })
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS5009FormView',
            params: {
              _id: '',
              disabled: true
            }
          })
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
