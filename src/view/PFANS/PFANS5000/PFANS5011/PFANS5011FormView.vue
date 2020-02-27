<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row"
    :title="title"
    :noback="false"
    :showSelection="isShow"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui'
  import {getUserInfo, getDictionaryInfo} from '@/utils/customize';

  export default {
    name: 'PFANS5011FormView',
    components:{
      EasyNormalTable
    },

    data() {
      return{
        loading: false,
        title: "title.PFANS6002VIEW",
        data: [],
        columns: [
          {
            //姓名
            code: 'name',
            label: 'label.user_name',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //所属部门
            code: 'departement',
            label: 'label.PFANS1008FORMVIEW_DEPARTMENT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //员工类型
            code: 'employeetype',
            label: 'label.PFANS6001VIEW_EMPLOYEETYPE',
            width: 140,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          //承认
          {'key': 'recognition', 'name': 'button.recognition', 'disabled': false, 'icon': 'el-icon-plus'},
          // 拒绝
          {'key': 'refuse', 'name': 'button.refuse', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        rowid: '',
        row: 'companyprojects_id'
      }
    },
    mounted(){
      this.loading = true;
      this.$store
        .dispatch('PFANS5001Store/selectById', {})
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
        this.rowid = row.companyprojects_id
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      }
    }
  };
</script>

<style scoped>

</style>
