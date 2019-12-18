<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>

</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable'
  import {Message} from 'element-ui'
  import {getDictionaryInfo, getStatus, getUserInfo} from '@/utils/customize'

  export default {
    name: "PFANS1036View",
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS1036VIEW",
        // 表格数据源
        data: [],
        // 列属性
        columns: [
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 100,
            fix: false,
            filter: true
          },
          {
            code: 'center_name',
            label: 'label.center',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'group_name',
            label: 'label.group',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'team_name',
            label: 'label.team',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, "icon": "el-icon-plus"},
          {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'}
        ],
        rowid: '',
        row_id: 'businessplanid'
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1036Store/get')
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].user_id !== null && response[j].user_id !== "") {
              let rst = getUserInfo(response[j].user_id);
              if (rst) {
                response[j].user_id = rst.userinfo.customername;
              }
              response[j].center_name = response[j].centerid;
              response[j].group_name = response[j].centerid;
              response[j].team_name = response[j].centerid;
              if (response[j].status !== null && response[j].status !== "") {
                response[j].status = getStatus(response[j].status);
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
            duration: 5 * 1000
          });
          this.loading = false;
        })
    },
    methods: {
      rowClick(row) {
        this.rowid = row.businessplanid;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path)
        if (val === "view") {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1036FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        } else if (val === "insert") {
          this.$router.push({
            name: 'PFANS1036FormView',
            params: {
              _id: '',
              disabled: true
            }
          })
        } else if (val === "update") {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1036FormView',
            params: {
              _id: this.rowid,
              disabled: true
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>


