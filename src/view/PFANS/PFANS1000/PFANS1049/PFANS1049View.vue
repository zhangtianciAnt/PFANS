<template>
  <EasyNormalTable :buttonList="buttonList"
                   :columns="columns"
                   :data="data"
                   :title="title"
                   :rowid="row_id"
                   @buttonClick="buttonClick"
                   @rowClick="rowClick"
                   v-loading="loading"
                   ref="roletable"
  >
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getDictionaryInfo, getStatus, getOrgInfoByUserId, getOrgInfo, getUserInfo} from '@/utils/customize';
  import {Message} from 'element-ui';

  let moment = require('moment');
  export default {
    name: 'PFANS1049View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS1049VIEW',
        data: [],
        columns: [
          {
            code: 'year',
            label: 'label.fiscal_year',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'type',
            label: 'label.group',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'plancount',
            label: 'label.center',
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
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        row_id: 'themeplan_id',
        row_info: '',
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1049Store/list')
        .then(response => {
          if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
              let orgInfo_cnt = getOrgInfo(response[i].center_id);
              if (orgInfo_cnt) {
                response[i].plancount = orgInfo_cnt.companyname;
              }
              let orgInfo_grp = getOrgInfo(response[i].group_id);
              if (orgInfo_grp) {
                response[i].type = orgInfo_grp.companyname;
              }
              let userInfo = getUserInfo(response[i].createby);
              if (userInfo) {
                response[i].user_id = userInfo.userinfo.customername;
              }
              if (response[i].status !== null && response[i].status !== '') {
                response[i].status = getStatus(response[i].status);
              }
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
        this.row_info = row;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.themeplan_id === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1049FormView',
            params: {
              year: this.row_info.year,
              group_id: this.row_info.group_id,
              center_id: this.row_info.center_id,
              disabled: false,
            },
          });
        }
        if (val === 'view') {
          if (this.themeplan_id === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1049FormView',
            params: {
              year: this.row_info.year,
              group_id: this.row_info.group_id,
              center_id: this.row_info.center_id,
              disabled: true,
            },
          });
        }

      },
    },
  };
</script>

<style scoped>

</style>
