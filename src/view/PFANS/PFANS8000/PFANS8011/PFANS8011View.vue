<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';

  export default {
    name: 'PFANS8011VIEW',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS8011VIEW',
        data: [],
        columns: [
          {
            code: 'year',
            label: 'label.PFANS2007VIEW_YEAR',
            width: 110,
            fix: false,
            filter: true,
          },
          {
            code: 'month',
            label: 'label.PFANS5009FORMVIEW_MONTH',
            width: 110,
            fix: false,
            filter: true,
          },
          // {
          //   code: 'currency',
          //   label: 'label.PFANS8011VIEW_CURRENCY',
          //   width: 110,
          //   fix: false,
          //   filter: true,
          // },
          // {
          //   code: 'businessplanexchangerate',
          //   label: 'label.PFANS8011VIEW_BUSINESSPLANEXCHANGERATE',
          //   width: 110,
          //   fix: false,
          //   filter: true,
          // },
          // {
          //   code: 'accountingexchangerate',
          //   label: 'label.PFANS8011VIEW_ACCOUNTINGEXCHANGERATE',
          //   width: 110,
          //   fix: false,
          //   filter: true,
          // },
          // {
          //   code: 'exchangerate',
          //   label: 'label.PFANS8011VIEW_EXCHANGERATE',
          //   width: 110,
          //   fix: false,
          //   filter: true,
          // },
          // {
          //   code: 'rmarks',
          //   label: 'label.remarks',
          //   width: 110,
          //   fix: false,
          //   filter: true,
          // },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        rowid: '',
        year: '',
        month: '',
        row: 'monthlyrate_id',
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS8011Store/list')
        .then(response => {
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
    methods: {
      rowClick(row) {
        this.rowid = row.monthlyrate_id;
        this.year = row.year;
        this.month = row.month;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
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
            name: 'PFANS8011FormView',
            params: {
              _id: this.rowid,
              year: this.year,
              month: this.month,
              disabled: true,
            },
          });
        }
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
            name: 'PFANS8011FormView',
            params: {
              _id: this.rowid,
              year: this.year,
              month: this.month,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.year = moment(new Date()).format('YYYY');
          this.month = moment(new Date()).format('YYYY-MM');
          let data = this.data.filter(item => item.year == this.year && item.month == this.month);
          if (data.length > 0) {
            Message({
              message: this.$t('label.PFANS8011VIEW_MESSAGE'),
              type: 'error',
              duration: 5 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS8011FormView',
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
