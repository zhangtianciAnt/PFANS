<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  let moment = require('moment')
  import {Message} from 'element-ui';
  import {getDepartmentById, getOrgInfoByUserId, getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS2036View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2036View',
        data: [],
        columns: [
          {
            code: 'years',
            label: 'label.PFANS2036VIEW_YEARS',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'updatetime',
            label: 'label.PFANS2036VIEW_UPDATETIME',
            width: 150,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'generate', 'name': 'button.generate', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        rowid: '',
        row: 'yearsantid',
        year: '2020',
      };
    },
    mounted() {
      this.getYears();
    },
    methods: {
      rowClick(row) {
        this.rowid = row.yearsantid;
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
            name: 'PFANS2036FormView',
            params: {
              _id: this.rowid,
              disabled: false,
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
            name: 'PFANS2036FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
        if (val === 'generate') {
          this.loading = true;
          this.$store
            .dispatch('PFANS2036Store/insertPenalcost',this.year)
            .then(response => {
              Message({
                message: this.$t("normal.success_03"),
                type: "success",
                duration: 5 * 1000
              });
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
        }
      },
      getYears(){
        this.loading = true;
        this.$store
          .dispatch('PFANS2036Store/getYears')
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].updatetime !== null && response[j].updatetime !== '') {
                response[j].updatetime = moment(response[j].updatetime).format('YYYY-MM-DD');
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
      }
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
