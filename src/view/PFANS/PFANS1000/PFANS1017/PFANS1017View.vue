<template>
  <EasyNormalTable v-loading="loading" :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @reget="getdata" @rowClick="rowClick">
  </EasyNormalTable>
</template>
<script>
import EasyNormalTable from '@/components/EasyNormalTable';
import {Message} from 'element-ui';
import {getDepartmentById, getStatus, getUserInfo} from '@/utils/customize';

export default {
  name: 'PFANS1017View',
  components: {
    EasyNormalTable,
  },
  data() {
    return {
      loading: false,
      title: 'title.PFANS1017VIEW',
      data: [],
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
          width: 150,
          fix: false,
          filter: true,
        },
        {
          code: 'group_id',
          label: 'label.group',
          width: 150,
          fix: false,
          filter: true,
        },
        {
          code: 'team_id',
          label: 'label.team',
          width: 150,
          fix: false,
          filter: true,
        },
        {
          code: 'corresponding',
          label: 'label.PFANS1016FORMVIEW_CORRESPONDING',
          width: 80,
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
        {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
        {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
      ],
      rowid: '',
      row: 'psdcd_id',
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1017Store/getPsdcd')
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].corresponding == 1) {
              response[j].corresponding = '完成';
            } else {
              response[j].corresponding = '未完成';
            }
            //修改列表组织 不跟随申请人显示组织名称 ztc fr
            // let nameflg = getOrgInfoByUserId(response[j].user_id);
            // if (nameflg) {
            //   response[j].center_id = nameflg.centerNmae;
            //   // response[j].group_id = nameflg.groupNmae;
            //   response[j].team_id = nameflg.teamNmae;
            // }
            //add_fjl_0927
            if (response[j].center_id !== null && response[j].center_id !== '' && response[j].center_id !== undefined) {
              response[j].center_id = getDepartmentById(response[j].center_id);
            }
            if (response[j].group_id !== null && response[j].group_id !== '' && response[j].group_id !== undefined) {
              response[j].group_id = getDepartmentById(response[j].group_id);
            }
            if (response[j].team_id !== null && response[j].team_id !== '' && response[j].team_id !== undefined) {
              response[j].team_id = getDepartmentById(response[j].team_id);
            }
            //add_fjl_0927
            let user = getUserInfo(response[j].user_id);
            //修改列表组织 不跟随申请人显示组织名称 ztc to
            if (user) {
              response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
            }
            response[j].status = getStatus(response[j].status);
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
      this.rowid = row.psdcd_id;
    },
    buttonClick(val) {
      this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      if (val === 'view') {
        if (this.rowid === '') {
          Message({
            message: this.$t('normal.info_01'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
        this.$router.push({
          name: 'PFANS1017FormView',
          params: {
            _id: this.rowid,
            disabled: false,
          },
        });
      }
      if (val === 'insert') {
        this.$router.push({
          name: 'PFANS1017FormView',
          params: {
            _id: '',
            disabled: true,
          },
        });
      }
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
          name: 'PFANS1017FormView',
          params: {
            _id: this.rowid,
            disabled: true,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
