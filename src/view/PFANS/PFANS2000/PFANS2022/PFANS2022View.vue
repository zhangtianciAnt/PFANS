<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" >
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import { Message } from 'element-ui'
  import moment from "moment";
  import {getOrgInfoByUserId,getUserInfo,getStatus,getDictionaryInfo} from '@/utils/customize';

  export default {
    name: 'PFANS2022View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS2022VIEW",
        data: [],
        columns: [
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 90,
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
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'twoclass',
            label: 'label.PFANS2022VIEW_TYPE',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'amoutmoney',
            label: 'label.PFANS2022VIEW_AMOUNT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'application_date',
            label: 'label.application_date',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 100,
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
        row : 'casgiftapplyid'
      };
    },
    mounted() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2022Store/getCasgiftApply')
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              let lst = getOrgInfoByUserId(response[j].user_id);
              response[j].center_id = lst.centerNmae;
              response[j].group_id = lst.groupNmae;
              response[j].team_id = lst.teamNmae;
              response[j].status = getStatus(response[j].status);
              let user = getUserInfo(response[j].user_id);
              if (user) {
                response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
              }
              if (response[j].application_date !== null && response[j].application_date !== "") {
                response[j].application_date = moment(response[j].application_date).format("YYYY-MM-DD");
              }
              if (response[j].twoclass !== null && response[j].twoclass !== "") {
                let letTwoclass = getDictionaryInfo(response[j].twoclass);
                if (letTwoclass != null) {
                  response[j].twoclass = letTwoclass.value1;
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
            this.loading = false
          })
    },
    methods: {
      rowClick(row) {
        this.rowid = row.casgiftapplyid;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'error',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2022FormView',
            params: {
              _id: this.rowid,
              disabled: true
            }
          })
        }
        if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.error_09'),
              type: 'error',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2022FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS2022FormView',
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
