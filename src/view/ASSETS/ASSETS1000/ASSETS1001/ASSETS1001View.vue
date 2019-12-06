<template>
  <EasyNormalTable :buttonList="buttonList" :showSelection="showSelection" :columns="columns" :data="data"
                   :rowid="row_id"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from "moment";
  import {getDictionaryInfo,getUserInfo} from '@/utils/customize';

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
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'typeassets',
            label: 'label.ASSETS1001VIEW_TYPEASSETS',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'price',
            label: 'label.ASSETS1001VIEW_PRICE',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'purchasetime',
            label: 'label.ASSETS1001VIEW_PURCHASETIME',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'usedepartment',
            label: 'label.ASSETS1001VIEW_USEDEPARTMENT',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'principal',
            label: 'label.ASSETS1001VIEW_PRINCIPAL',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'assetstatus',
            label: 'label.ASSETS1001VIEW_ASSETSTATUS',
            width: 100,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'import', 'name': 'button.import', 'disabled': false, 'icon': 'el-icon-download'},
          {'key': 'print', 'name': '打印条形码', 'disabled': false},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-upload2'},
        ],
        rowid: '',
        row_id: 'assets_id',
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('ASSETS1001Store/getList', {})
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            let user = getUserInfo(response[j].principal);
            if (user) {
              response[j].principal = user.userinfo.customername;
              response[j].usedepartment = user.userinfo.centername;
            }
            if (response[j].purchasetime !== null && response[j].purchasetime !== "") {
              response[j].purchasetime = moment(response[j].purchasetime).format("YYYY-MM-DD");
            }
            if (response[j].typeassets !== null && response[j].typeassets !== "") {
              let letErrortype = getDictionaryInfo(response[j].typeassets);
              if (letErrortype != null) {
                response[j].typeassets = letErrortype.value1;
              }
            }
            if (response[j].assetstatus !== null && response[j].assetstatus !== "") {
              let letErrortype = getDictionaryInfo(response[j].assetstatus);
              if (letErrortype != null) {
                response[j].assetstatus = letErrortype.value1;
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
        this.rowid = row.assets_id;
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
