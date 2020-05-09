<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row_id" :buttonList="buttonList"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getCurrentRole, getOrgInfo, getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS1041View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS1041VIEW',
        themeplan_id: '',
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
            code: 'groupNmae',
            label: 'label.group',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'centerNmae',
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
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        state: '',
        row_info: [],
        row_id: 'themeplan_id',
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1040Store/getList', {"type":"1"})
        .then(response => {
          if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
              let orgInfo_cnt = getOrgInfo(response[i].center_id);
              if (orgInfo_cnt) {
                response[i].centerNmae = orgInfo_cnt.companyname;
              }
              let orgInfo_grp = getOrgInfo(response[i].group_id);
              if (orgInfo_grp) {
                response[i].groupNmae = orgInfo_grp.companyname;
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
          // //画面按钮制御：总经理和Center长不可新建theme
          // let role = getCurrentRole();
          // if (role === '1' || role === '2') {
          //   this.buttonList = [
          //     {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          //     {'key': 'insert', 'name': 'button.insert', 'disabled': true, 'icon': 'el-icon-plus'},
          //     {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          //   ];
          // }
          //管理员不可新建
          if (!this.$store.getters.userinfo.userinfo) {
            this.buttonList = [
              {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
              {'key': 'insert', 'name': 'button.insert', 'disabled': true, 'icon': 'el-icon-plus'},
              {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
            ];
          }
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
        this.themeplan_id = row.themeplan_id;
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
            name: 'PFANS1040FormView',
            params: {
              _id: this.row_info.themeplan_id,
              year: this.row_info.year,
              group_id: this.row_info.group_id,
              center_id: this.row_info.center_id,
              status: this.row_info.status,
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
            name: 'PFANS1041FormView',
            params: {
              _id: this.row_info.themeplan_id,
              year: this.row_info.year,
              group_id: this.row_info.group_id,
              center_id: this.row_info.center_id,
              status: this.row_info.status,
              disabled: true,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS1041FormView',
            params: {
              _id: '',
              // year: this.fiscal_year,
              group_id: this.$store.getters.userinfo.userinfo.groupid,
              center_id: this.$store.getters.userinfo.userinfo.centerid,
              disabled: false,
            },
          });
        }
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
