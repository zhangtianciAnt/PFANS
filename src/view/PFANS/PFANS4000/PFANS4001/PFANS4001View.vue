<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>
<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui';
    import moment from "moment";
    import { getDictionaryInfo,getStatus, getUserInfo,getOrgInfoByUserId} from '@/utils/customize';
  export default {
      name: 'PFANS4001View',
      components: {
          EasyNormalTable
      },
      data() {
        return{
            loading: false,
            title: "title.PFANS4001VIEW",
            data: [],
            columns: [
                {
                    code: 'username',
                    label: 'label.applicant',
                    width: 130,
                    fix: false,
                    filter: true
                },
                {
                    code: 'centername',
                    label: 'label.center',
                    width: 160,
                    fix: false,
                    filter: true
                },
                {
                    code: 'groupname',
                    label: 'label.group',
                    width: 160,
                    fix: false,
                    filter: true
                },
                {
                    code: 'teamname',
                    label: 'label.team',
                    width: 160,
                    fix: false,
                    filter: true
                },
                {
                    code: 'filename',
                    label: 'label.PFANS1034VIEW_FILENAME',
                    width: 130,
                    fix: false,
                    filter: true
                },
                {
                    code: 'sealtype',
                    label: 'label.PFANS4001FORMVIRW_YYLX',
                    width: 130,
                    fix: false,
                    filter: true
                },
                {
                    code: 'usedate',
                    label: 'label.PFANS4001FORMVIEW_YYRQ',
                    width: 130,
                    fix: false,
                    filter: true
                },
                {
                    code: 'status',
                    label: 'label.PFANS8008VIEW_AVAILABLESTATE',
                    width: 100,
                    fix: false,
                    filter: true
                },
            ],
            buttonList: [
                {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
            ],
            rowid: '',
            row_id: 'sealid'
        }
      },
      mounted() {
          this.loading = true;
          this.$store
              .dispatch('PFANS4001Store/getFpans4001List', {})
              .then(response => {
                  for (let j = 0; j < response.length; j++) {
                      let user = getUserInfo(response[j].userid);
                      let nameflg = getOrgInfoByUserId(response[j].user_id);
                      if (nameflg) {
                          response[j].centername = nameflg.centerNmae;
                          response[j].groupname = nameflg.groupNmae;
                          response[j].teamname = nameflg.teamNmae;
                      }
                      if (user) {
                          response[j].username = user.userinfo.customername;
                      }
                      if (response[j].status !== null && response[j].status !== "") {
                          response[j].status = getStatus(response[j].status);
                      }
                      if (response[j].usedate !== null && response[j].usedate !== "") {
                          response[j].usedate = moment(response[j].usedate).format("YYYY-MM-DD");
                      }
                      if (response[j].sealtype !== null && response[j].sealtype !== "") {
                          let letErrortype = getDictionaryInfo(response[j].sealtype);
                          if (letErrortype != null) {
                              response[j].sealtype = letErrortype.value1;
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
              this.rowid = row.sealid;
          },
          buttonClick(val) {
              this.$store.commit('global/SET_HISTORYURL', this.$route.path);
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
                      name: 'PFANS4001FormView',
                      params: {
                          _id: this.rowid,
                          disabled: false
                      }
                  })
              }
              if (val === 'insert') {
                  this.$router.push({
                      name: 'PFANS4001FormView',
                      params: {
                          _id: '',
                          disabled: true
                      }
                  })
              }
              if (val === 'edit') {
                  if (this.rowid === '') {
                      Message({
                          message: this.$t('normal.info_01'),
                          type: 'info',
                          duration: 2 * 1000
                      });
                      return;
                  }
                  this.$router.push({
                      name: 'PFANS4001FormView',
                      params: {
                          _id: this.rowid,
                          disabled: true
                      }
                  })
              }
          },
      }
  }
</script>
<style scoped>
</style>
