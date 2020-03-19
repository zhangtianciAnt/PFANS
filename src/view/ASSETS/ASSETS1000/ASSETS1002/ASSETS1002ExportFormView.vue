<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                   :showSelection="showSelection" :title="title" @buttonClick="buttonClick" @rowClick="rowClick"
                   ref="roletable"
                   v-loading="loading">
    <el-select @change="changed" slot="customize" v-model="department">
      <el-option
        :key="item.code"
        :label="item.code"
        :value="item.code"
        v-for="item in options">
      </el-option>
    </el-select>
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyBigDataTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo,getUserInfo} from '@/utils/customize';
  export default {
    name: 'ASSETS1002ExportFormView',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        department: '',
        options:[],
        loading: false,
        title: 'title.ASSETS1002EXPORTFORMVIEW',
        data: [],
        tablelist:[],
        selectedlist: [],
        showSelection: true,
        columns: [
          {
            code: 'filename',
            label: 'label.ASSETS1001VIEW_FILENAME',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'typeassets',
            label: 'label.ASSETS1001VIEW_TYPEASSETS',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'principal',
            label: 'label.ASSETS1001VIEW_PRINCIPAL',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'barcode',
            label: 'label.ASSETS1001VIEW_BARCODE',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'usedepartment',
            label: 'label.ASSETS1001VIEW_USEDEPARTMENT',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'result',
            label: 'label.ASSETS1001VIEW_RESULT',
            width: 100,
            fix: false,
            filter: false,
          },
        ],
        buttonList: [
          {'key': 'back', 'name': 'button.back', 'disabled': false, 'icon': 'el-icon-back'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-upload2'},
        ],
        rowid: '',
        row_id: 'inventoryresults_id',
      };
    },
    mounted() {
      this.getListData();
    },
    methods: {
      changed() {
        if(this.department){
          this.data = this.tablelist.filter(item => item.usedepartment == this.department)
        }else{
          this.data = this.tablelist;
        }
      },
      getListData() {
        this.loading = true;
        this.$store
          .dispatch('ASSETS1002Store/selectByResult', {'inventoryresultsid': this.$route.params._id})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              let user = getUserInfo(response[j].principal);
              if (user) {
                response[j].principal = user.userinfo.customername;
//                response[j].usedepartment = user.userinfo.centername;
              }
              if (response[j].purchasetime !== null && response[j].purchasetime !== '') {
                response[j].purchasetime = moment(response[j].purchasetime).format('YYYY-MM-DD');
              }
              if (response[j].result !== null && response[j].result !== '') {
                if (response[j].result === '1') {
                  response[j].result = this.$t('✘');
                } else if (response[j].result === '2') {
                  response[j].result = this.$t('✔');
                }
              }
              if (response[j].bartype !== null && response[j].bartype !== '') {
                let letbartype1 = getDictionaryInfo(response[j].bartype);
                if (letbartype1 != null) {
                  response[j].bartypeName = letbartype1.value1;
                }
              }
            }
            let filters = new Set()
            for (let item of response) {
              let i = {};
              if (item) {
                i.code = item.usedepartment;
              }
              filters.add(i);
            }
            let filtersrst = [...new Set(filters)]
            var hash = {}
            filtersrst = filtersrst.reduce(function (item, next) {
              if (hash[next.code]) {
                ''
              } else {
                hash[next.code] = true && item.push(next)
              }
              return item
            }, [])
            this.options = filtersrst
            this.tablelist = response;
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
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        }));
      },
      rowClick(row) {
        this.rowid = row.assets_id;
      },
      buttonClick(val) {
        if (val === 'back') {
          this.$router.push({
            name: 'ASSETS1002FormView',
            params: {
              _id: this.$route.params._id,
            },
          });
        }
        if (val === 'export') {
          this.selectedlist = this.$refs.roletable.selectedList;
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [this.$t('label.ASSETS1001VIEW_FILENAME'), this.$t('label.ASSETS1001VIEW_TYPEASSETS'), this.$t('label.ASSETS1001VIEW_PRINCIPAL'),
              this.$t('label.ASSETS1001VIEW_BARCODE'), this.$t('label.ASSETS1001VIEW_USEDEPARTMENT'), this.$t('label.ASSETS1001VIEW_RESULT'), this.$t('label.PFANS6005FORMVIEW_NOTE')];
            const filterVal = ['filename', 'typeassets', 'principal', 'barcode','usedepartment','result',""];
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
