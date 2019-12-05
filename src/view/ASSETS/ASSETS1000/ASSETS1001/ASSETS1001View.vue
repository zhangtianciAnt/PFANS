<template>
  <EasyNormalTable :buttonList="buttonList" :showSelection="showSelection" :columns="columns" :data="data"
                   :rowid="row_id"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';

  export default {
    name: 'ASSETS1001View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        showSelection: true,
        loading: false,
        title: 'title.ASSETS1001VIEW',
        data: [],
        columns: [
          {
            code: 'filename',
            label: 'label.ASSETS1001VIEW_FILENAME',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            code: 'typeassets',
            label: 'label.ASSETS1001VIEW_TYPEASSETS',
            width: 160,
            fix: false,
            filter: true,
          },
          {
            code: 'price',
            label: 'label.ASSETS1001VIEW_PRICE',
            width: 160,
            fix: false,
            filter: true,
          },
          {
            code: 'purchasetime',
            label: 'label.ASSETS1001VIEW_PURCHASETIME',
            width: 160,
            fix: false,
            filter: true,
          },
          {
            code: 'ASSETS1001VIEW_USEDEPARTMENT',
            label: 'label.ASSETS1001VIEW_USEDEPARTMENT',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'principal',
            label: 'label.ASSETS1001VIEW_PRINCIPAL',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'assetstatus',
            label: 'label.ASSETS1001VIEW_ASSETSTATUS',
            width: 130,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'import', 'name': 'button.import', 'disabled': false, 'icon': 'el-icon-download'},
          {'key': 'print', 'name': '打印二维码', 'disabled': false},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-upload2'},
        ],
        rowid: '',
        row_id: 'assetsid',
      };
    },
    mounted() {
    },
    methods: {
      rowClick(row) {
        this.rowid = row.assetsid;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'error',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'ASSETS1001FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'ASSETS1001FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
        if (val === 'edit') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'error',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'ASSETS1001FormView',
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
