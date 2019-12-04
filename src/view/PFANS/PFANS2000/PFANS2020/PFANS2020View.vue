<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>
<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from "element-ui";
  import moment from "moment";
  import {getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS2020View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS2020VIEW",
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
            code: 'jobnumber',
            label: 'label.PFANS2020VIEW_JOBNUMBER',
            width: 100,
            fix: false,
            filter: true
          },
          {
            code: 'job',
            label: 'label.PFANS2020VIEW_JOB',
            width: 100,
            fix: false,
            filter: true
          },
          {
            code: 'reason',
            label: 'label.cause',
            width: 100,
            fix: false,
            filter: true
          },
          {
            code: 'createon',
            label: 'label.application_date',
            width: 200,
            fix: false,
            filter: true
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 100,
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
        row_id: 'irregulartiming_id'
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS2020Store/getAllIrregulartiming', {})
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].user_id !== null && response[j].user_id !== "") {
              let rst = getUserInfo(response[j].user_id);
              if (rst) {
                response[j].user_id = rst.userinfo.customername;
              }

              if (response[j].status !== null && response[j].status !== "") {
                response[j].status = getStatus(response[j].status);
              }
              if (response[j].createon !== null && response[j].createon !== "") {
                response[j].createon = moment(response[j].createon).format("YYYY-MM-DD");
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
        this.rowid = row.irregulartiming_id;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2020FormView',
            params: {
              _id: this.rowid,
              disabled: true
            }
          })
        }
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
            name: 'PFANS2020FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS2020FormView',
            params: {
              _id: '',
              disabled: true,
            }
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
