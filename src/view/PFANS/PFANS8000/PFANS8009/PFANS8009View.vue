<template>
  <EasyNormalTable v-loading="loading" :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                   :title="title"
                   @buttonClick="buttonClick" @reget="dispatch('PFANS8009Store/getDictionary', '')" @rowClick="rowClick">
  </EasyNormalTable>
</template>

<script>
import EasyNormalTable from '@/components/EasyNormalTable';
import {Message} from 'element-ui';

export default {
  name: 'PFANS8009View',
  components: {
    EasyNormalTable,
  },
  data() {
    return {
      loading: false,
      title: '',
      data: [],
      codetype: '',
      codename: '',
      // 列属性
      columns: [
        {
          code: 'code',
          label: 'label.PFANS8009VIEW_CODE',
          width: 80,
          fix: false,
          filter: false,
        },
        {
          code: 'value1',
          label: 'label.PFANS8009VIEW_VALUE',
          width: 80,
          fix: false,
          filter: false,
        },
        {
          code: 'tenantid',
          label: 'label.PFANS8009VIEW_TENANTID',
          width: 200,
          fix: false,
          filter: false,
        },
      ],
      buttonList: [
        {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
        {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
      ],
      rowid: '',
      row_id: 'code',
    };
  },
  mounted() {
    this.dispatch('PFANS8009Store/getDictionary', '');
    this.title = 'menu.PFANSDICTIONARY';
    // this.codetype = this.$route.params.codetype;
    // this.getCompanyProjectList(this.$route.params.codetype);
  },
  methods: {
    getCompanyProjectList(codetype) {
      if (codetype === 'PJ') {
        this.title = 'label.PFANS8009VIEW_MANAGEMENT';
        // update gbb 20210315 NT_PFANS_20210308_BUG_163 字典列表显示对应类型的字典（合同管理） start
        //} else if (codetype === 'CT') {
      } else if (codetype === 'HT') {
        // update gbb 20210315 NT_PFANS_20210308_BUG_163 字典列表显示对应类型的字典（合同管理） end
        this.title = 'label.PFANS8009VIEW_CONTRACT';
      } else if (codetype === 'PR') {
        this.title = 'label.PFANS8009VIEW_PERSONNELMATTERS';
      } else if (codetype === 'PP') {
        this.title = 'label.PFANS8009VIEW_PFANSPJ';
      } else if (codetype === 'PC') {
        this.title = 'label.PFANS8009VIEW_FINANCIAL';
      } else if (codetype === 'BP') {
        this.title = 'label.PFANS8009VIEW_PFANSBP';
      } else if (codetype === 'PA') {
        this.title = 'label.PFANS8009VIEW_ASSETS';
      } else if (codetype === 'PG') {
        this.title = 'label.PFANS8009VIEW_PFANSSYSTEM';
      }
      this.dispatch('PFANS8009Store/getDictionary', codetype);
    },
    dispatch(val, codetype) {
      this.data = [];
      this.loading = true;
      this.$store
        .dispatch(val, {'tenantid': '查所以父cide'})
        .then(response => {
          this.data = response;
          this.loading = false;
        });
    },
    rowClick(row) {
      this.rowid = row.code;
      this.codename = row.value1;
    },
    buttonClick(val) {
      //this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      this.$store.commit('global/SET_HISTORYURL', '');
      let letname = 'PFANS8009FormView';
      if (val === 'back') {
        this.$router.push({
          name: 'PFANS8009View',
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
          name: letname,
          params: {
            code: this.rowid,
            disabled: true,
            codetype: this.codetype,
            codename: this.codename,
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
          name: letname,
          params: {
            code: this.rowid,
            disabled: false,
            codetype: this.codetype,
            codename: this.codename,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
