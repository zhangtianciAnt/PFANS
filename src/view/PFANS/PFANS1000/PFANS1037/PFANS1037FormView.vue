<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId, getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS1037FormView',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: '',
        // 表格数据源
        data: [],
        // 列属性
        columns: [
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'center_id',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
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
        rowid: '',
        row: '',
        url: '',
      };
    },
    mounted() {
      this.getCompanyProjectList(this.$route.params.title);

    },
    methods: {
      getCompanyProjectList(val) {
        if (val === 7) {
          this.row = 'assetinformationid';
          this.title = 'title.PFANS1007VIEW';
          this.dispatch('PFANS1037Store/getAssetinformation');
        } else if (val === 8) {
          this.row = 'softwaretransferid';
          this.title = 'title.PFANS1008VIEW';
            this.dispatch('PFANS1037Store/getSoftwaretransfer');
        } else if (val === 9) {
          this.row = 'fixedassets_id';
          this.title = 'title.PFANS1009VIEW';
          this.dispatch('PFANS1037Store/getFixedassets');
        }
      },
      dispatch(val) {
        this.data = [];
        this.loading = true;
        this.$store
          .dispatch(val)
          .then(response => {
            this.data = this.setuser(response);
            this.loading = false;
          });
      },
      dispatchparameter(val, letequipment) {
        this.data = [];
        this.loading = true;
        this.$store
          .dispatch(val, letequipment)
          .then(response => {
            this.data = this.setuser(response);
            this.loading = false;
          });
      },
      setuser(response) {
        for (let j = 0; j < response.length; j++) {
          let nameflg = getOrgInfoByUserId(response[j].user_id);
          if (nameflg) {
            response[j].center_id = nameflg.centerNmae;
            response[j].group_id = nameflg.groupNmae;
            response[j].team_id = nameflg.teamNmae;
          }
          let user = getUserInfo(response[j].user_id);
          if (user) {
            response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
          }
          if (response[j].status !== null && response[j].status !== '') {
            response[j].status = getStatus(response[j].status);
          }
        }
        return response;
        this.loading = false;
      },
      rowClick(row) {
        if (this.$route.params.title === 7) {
          this.rowid = row.assetinformationid;
        } else if (this.$route.params.title === 8) {
          this.rowid = row.softwaretransferid;
        } else if (this.$route.params.title === 9) {
          this.rowid = row.fixedassets_id;
        }
      },
      buttonClick(val) {
        let letname;
        if (this.$route.params.title === 7) {
          letname = 'PFANS1007FormView';
        } else if (this.$route.params.title === 8) {
          letname = 'PFANS1008FormView';
        } else if (this.$route.params.title === 9) {
          letname = 'PFANS1009FormView';
        }
        this.$store.commit('global/SET_HISTORYURL', '');
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: letname,
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
        if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
            });
            return;
          }
          this.$router.push({
            name: letname,
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: letname,
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
