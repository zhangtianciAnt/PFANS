<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getStatus, getUserInfo, getDictionaryInfo, getOrgInfoByUserId} from '@/utils/customize';

  export default {
    name: 'PFANS2032View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2032VIEW',
        data: [],
        columns: [
          {
            code: 'user_id',
            label: 'label.user_name',
            width: 100,
            fix: false,
            filter: false,
          },
          {
            code: 'center_name',
            label: 'label.center',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'group_name',
            label: 'label.group',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'team_name',
            label: 'label.team',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'starank',
            label: 'label.PFANSUSERFORMVIEW_RANK',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'sex',
            label: 'label.sex',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'position',
            label: 'label.PFANS2026VIEW_POSITION',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'entry_time',
            label: 'label.PFANS2026VIEW_ENTRYTIME',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'resignation_date',
            label: 'label.PFANS2026VIEW_RESIGNATIONDATE',
            width: 150,
            fix: false,
            filter: false,
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
        rowid: '',
        row_id: 'staffexitproce_id',
      };
    },

    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2026Store/get2', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].user_id !== null && response[j].user_id !== '') {
                if (response[j].starank != '' && response[j].starank != null) {
                  let letbudge = getDictionaryInfo(response[j].starank);
                  if (letbudge) {
                    response[j].starank = letbudge.value1;
                  }
                }
                let rst = getUserInfo(response[j].user_id);
                let nameflg = getOrgInfoByUserId(response[j].user_id);
                if (nameflg) {
                  response[j].center_name = nameflg.centerNmae;
                  response[j].group_name = nameflg.groupNmae;
                  response[j].team_name = nameflg.teamNmae;
                }
                let postinfo = getDictionaryInfo(response[j].position);
                if (postinfo) {
                  response[j].position = postinfo.value1;
                }
                if (rst) {
                  response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
                }
                if (response[j].status !== null && response[j].status !== '') {
                  response[j].status = getStatus(response[j].status);
                }

                if (response[j].entry_time !== null && response[j].entry_time !== '') {
                  response[j].entry_time = moment(response[j].entry_time).format('YYYY-MM-DD');
                }
                if (response[j].resignation_date !== null && response[j].resignation_date !== '') {
                  response[j].resignation_date = moment(response[j].resignation_date).format('YYYY-MM-DD');
                }

                if (response[j].sex !== null && response[j].sex !== '') {
                  let letsex = getDictionaryInfo(response[j].sex);
                  if (letsex) {
                    response[j].sex = letsex.value1;
                  }
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
      rowClick(row) {
        this.rowid = row.staffexitproce_id;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        // this.$store.commit('global/SET_OPERATEID', this.rowid);
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
            name: 'PFANS2032FormView',
            params: {
              _checkdisabled: false,
              _type: 0,
              _id: this.rowid,
              disabled: false,
            },
          });
        }  else if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2032FormView',
            params: {
              _checkdisabled: false,
              _type: 0,
              _id: this.rowid,
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
