<template>
  <div>
    <EasyNormalTable v-loading="loading" :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                     :title="title"
                     @buttonClick="buttonClick" @reget="getdata" @rowClick="rowClick">
    </EasyNormalTable>
  </div>
</template>

<script>
import EasyNormalTable from '@/components/EasyNormalTable';
import {Message} from 'element-ui';
import {getOrgInfo, getUserInfo} from '@/utils/customize';

export default {
  name: 'PFANS1040View',
  components: {
    EasyNormalTable,
  },
  data() {
    return {
      loading: false,
      title: 'title.PFANS1040VIEW',
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
        // {
        //   code: 'groupNmae',
        //   label: 'label.group',
        //   width: 120,
        //   fix: false,
        //   filter: true,
        // },
        // {
        //   code: 'centerNmae',
        //   label: 'label.center',
        //   width: 120,
        //   fix: false,
        //   filter: true,
        // },
        {
          code: 'department',
          label: 'label.ASSETS1001VIEW_USEDEPARTMENT',
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
    this.getdata();
  },
  methods: {
    getdata() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1040Store/getList', {'type': '0'})
        .then(response => {
          if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
              let orgInfo_cnt = getOrgInfo(response[i].center_id);
              if (orgInfo_cnt) {
                response[i].department = orgInfo_cnt.companyname;
              }
              // let orgInfo_grp = getOrgInfo(response[i].group_id);
              // if (orgInfo_grp) {
              //   response[i].groupNmae = orgInfo_grp.companyname;
              // }
              let userInfo = getUserInfo(response[i].createby);
              if (userInfo) {
                response[i].user_id = userInfo.userinfo.customername;
              }
            }
          }
          this.data = response;
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
    rowClick(row) {
      this.row_info = row;
      this.themeplan_id = row.themeplan_id;
      //region scc add 9/28 获取编辑按钮可用状态 from
      this.$store
        .dispatch('PFANS1036Store/whetherEditor', {'centerid': row.center_id, 'years': row.year})
        .then(response => {
          this.buttonList[2].disabled = response;
        })
        .catch(err => {
          this.$message.error({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
        });
      //endregion scc add 9/28 获取编辑按钮可用状态 to
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
            plancount: this.row_info.plancount,
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
          name: 'PFANS1040FormView',
          params: {
            _id: this.row_info.themeplan_id,
            year: this.row_info.year,
            group_id: this.row_info.group_id,
            center_id: this.row_info.center_id,
            disabled: true,
          },
        });
      }
      if (val === 'insert') {
        this.$router.push({
          name: 'PFANS1040FormView',
          params: {
            _id: '',
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

<style lang="scss" rel="stylesheet/scss">

</style>
