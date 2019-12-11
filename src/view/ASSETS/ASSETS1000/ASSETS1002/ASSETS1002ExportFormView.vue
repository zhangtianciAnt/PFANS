<template>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                     :showSelection="showSelection" :title="title" @buttonClick="buttonClick" @rowClick="rowClick" ref="roletable"
                     v-loading="loading">
    </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo, getUserInfo} from '@/utils/customize';

  export default {
    name: 'ASSETS1002ExportFormView',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.ASSETS1002EXPORTFORMVIEW',
        data: [],
        selectedlist: [],
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
          {
            code: 'barcode',
            label: 'label.ASSETS1001VIEW_BARCODE',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'result',
            label: 'label.ASSETS1001VIEW_RESULT',
            width: 100,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'back', 'name': 'button.back', 'disabled': false, 'icon': 'el-icon-upload2'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-upload2'},
        ],
        rowid: '',
        row_id: 'assets_id',
      };
    },
    mounted() {
      this.getListData();
    },
    methods: {
      getListData() {
        this.loading = true;
        this.$store
          .dispatch('ASSETS1002Store/selectById', {'inventoryplanid': this.$route.params._id})
          .then(response => {
            if (response.assets.length > 0) {
              this.data = response.assets;
              for (let j = 0; j < response.assets.length; j++) {
                let user = getUserInfo(response.assets[j].principal);
                if (user) {
                  response.assets[j].principal = user.userinfo.customername;
                  response.assets[j].usedepartment = user.userinfo.centername;
                }
                if (response.assets[j].purchasetime !== null && response.assets[j].purchasetime !== '') {
                  response.assets[j].purchasetime = moment(response.assets[j].purchasetime).format('YYYY-MM-DD');
                }
                if (response.assets[j].typeassets !== null && response.assets[j].typeassets !== '') {
                  let letErrortype = getDictionaryInfo(response.assets[j].typeassets);
                  if (letErrortype != null) {
                    response.assets[j].typeassets = letErrortype.value1;
                  }
                }
              }
            }
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
        this.rowid = row.assets_id;
      },
      buttonClick(val) {
        if (val === 'back') {
          this.$router.push({
            name: 'ASSETS1002FormView',
            params: {
            },
          });
        } else if (val === 'export') {
          this.selectedlist = this.$refs.roletable.selectedList;
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [this.$t('label.ASSETS1001VIEW_FILENAME'), this.$t('label.ASSETS1001VIEW_TYPEASSETS'), this.$t('label.ASSETS1001VIEW_PRICE'),
              this.$t('label.ASSETS1001VIEW_PURCHASETIME'), this.$t('label.ASSETS1001VIEW_USEDEPARTMENT'), this.$t('label.ASSETS1001VIEW_PRINCIPAL'),
              this.$t('label.ASSETS1001VIEW_ASSETSTATUS'), this.$t('label.ASSETS1001VIEW_BARCODE'), this.$t('label.ASSETS1001VIEW_RESULT')];
            const filterVal = ['filename', 'typeassets', 'price', 'purchasetime', 'usedepartment', 'principal', 'assetstatus', 'barcode', 'result'];
            const list = this.selectedlist;
            const data = this.formatJson(filterVal, list);
            excel.export_json_to_excel(tHeader, data, this.$t('title.ASSETS1002EXPORTFORMVIEW'));
          });
        }
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
