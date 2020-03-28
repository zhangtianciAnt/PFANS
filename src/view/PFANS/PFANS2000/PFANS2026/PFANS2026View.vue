<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable'
  import {Message} from 'element-ui'
  import moment from 'moment'
  import {getStatus, getUserInfo,getDictionaryInfo,getOrgInfoByUserId} from '@/utils/customize'

  export default {
    name: "PFANS2026View",
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS2026VIEW",
        data: [],
        columns: [
          {
            code: 'user_id',
            label: 'label.user_name',
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
            code: 'sex',
            label: 'label.sex',
            width: 90,
            fix: false,
            filter: true
          },
          {
            code: 'position',
            label: 'label.PFANS2026VIEW_POSITION',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'entry_time',
            label: 'label.PFANS2026VIEW_ENTRYTIME',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'hope_exit_date',
            label: 'label.PFANS2026VIEW_DEPARTUREDATE',
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
          },
          {
            code: 'stage',
            label: 'label.PFANS2023VIEW_STAGE',
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
        row_id: 'staffexitprocedure_id'
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS2026Store/get', {})
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].user_id !== null && response[j].user_id !== "") {
              let rst = getUserInfo(response[j].user_id);
                let nameflg = getOrgInfoByUserId(response[j].user_id);
                if (nameflg) {
                    response[j].center_name = nameflg.centerNmae;
                    response[j].group_name = nameflg.groupNmae;
                    response[j].team_name = nameflg.teamNmae;
                }
              if (rst) {
                response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
              }
              if (response[j].status !== null && response[j].status !== "") {
                response[j].status = getStatus(response[j].status);
              }
              if (response[j].hope_exit_date !== null && response[j].hope_exit_date !== "") {
                response[j].hope_exit_date = moment(response[j].hope_exit_date).format("YYYY-MM-DD");
              }
              if (response[j].entry_time !== null && response[j].entry_time !== "") {
                response[j].entry_time = moment(response[j].entry_time).format("YYYY-MM-DD");
              }
              if (response[j].sex!== null && response[j].sex !== "") {
                let letsex = getDictionaryInfo(response[j].sex);
                if (letsex) {
                  response[j].sex = letsex.value1;
                }
              }
              if (this.$i18n){
                if(response[j].stage!==null&&response[j].stage!==""){
                  if(response[j].stage=='0'){
                    response[j].stage=this.$t('label.PFANS2026VIEW');
                  }else if(response[j].stage=='1'){
                    response[j].stage=this.$t('label.PFANS2026VIEW_RIGHT');
                  }else if(response[j].stage=='2'){
                    response[j].stage=this.$t('label.PFANS2026VIEW_DATA');
                  }else {
                    response[j].stage=this.$t('label.PFANS2026VIEW_OUT');
                  }
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
            duration: 5 * 1000
          });
          this.loading = false;
        })
    },
    methods: {
      rowClick(row) {
        this.rowid = row.staffexitprocedure_id;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
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
            name: 'PFANS2026FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        } else if (val === "insert") {
          this.$router.push({
            name: 'PFANS2026FormView',
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
            name: 'PFANS2026FormView',
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
