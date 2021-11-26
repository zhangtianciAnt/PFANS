<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row_id" :buttonList="buttonList" @reget="getdata"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getDepartmentById, getStatus} from '@/utils/customize';

  export default {
    name: 'PFANS1042View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        rowlist: '',
        loading: false,
        title: 'title.PFANS1042VIEW',
        data: [],
        columns: [
          {
            code: 'year',
            label: 'label.fiscal_year',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'region',
            label: 'label.PFANS2009VIEW_JUNE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'pj',
            label: 'label.group',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        state: '',
        row_info: [],
        row_id: 'costcarryforward_id',
      };
    },
    mounted() {
     this.getdata();
    },
    methods: {
      getdata(){
        this.loading = true;
        this.$store
          .dispatch('PFANS1042Store/list')
          .then(response => {
            this.data = response;
            for (let j = 0; j < response.length; j++) {
              if (response[j].group_id !== null && response[j].group_id !== '' && response[j].group_id !== undefined) {
                response[j].pj = getDepartmentById(response[j].group_id);
              }
              if (response[j].status !== null && response[j].status !== '') {
                response[j].status = getStatus(response[j].status);
              }
            }

            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      rowClick(row) {
        this.rowlist = row;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.themeplan_id === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1042FormView',
            params: {
              _id: this.rowlist.costcarryforward_id,
              group_id: this.rowlist.group_id,
              region: this.rowlist.region,
              year: this.rowlist.year,
              disabled: true,
            },
          });
        }
        if (val === 'view') {
          if (this.themeplan_id === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1042FormView',
            params: {
              _id: this.rowlist.costcarryforward_id,
              group_id: this.rowlist.group_id,
              region: this.rowlist.region,
              year: this.rowlist.year,
              disabled: false,
            },
          });

        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS1042FormView',
            params: {
              _id: '',
              group_id: '',
              region: '',
              year: '',
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
