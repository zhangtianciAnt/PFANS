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
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getUserInfo, getDictionaryInfo} from '@/utils/customize';

  export default {
    name: 'PFANS5011FormView',
    components: {
      EasyNormalTable,
    },

    data() {
      return {
        loading: false,
        title: 'title.PFANS5011FormView',
        data: [],
        columns: [
          {
            //姓名
            code: 'name',
            label: 'label.user_name',
            width: 80,
            fix: false,
            filter: true,
          },
          {
            //所属部门
            code: 'company',
            label: 'label.PFANS1008FORMVIEW_DEPARTMENT',
            width: 80,
            fix: false,
            filter: true,
          },
          {
            //员工类型
            code: 'employeetype',
            label: 'label.PFANS6001VIEW_EMPLOYEETYPE',
            width: 80,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          //承认
          {'key': 'recognition', 'name': 'button.recognition', 'disabled': false, 'icon': 'el-icon-plus'},
          // 拒绝
          {'key': 'refuse', 'name': 'button.refuse', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        rowid: '',
        row: 'companyprojects_id',
        isShow: true,
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/select', {companyprojectsid: this.$route.params._id})
          .then(response => {
            this.data = response;
            for(let i = 0; i < response.length; i++){
              if(response[i].type == 0){
                response[i].employeetype = this.$t('label.PFANS5001FORMVIEW_INCOMMUNITY')
              }else{
                response[i].employeetype = this.$t('label.PFANS5004VIEW_ASSIST')
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
          });
      }
    },
    methods: {
      rowClick(row) {
        this.rowid = row.companyprojects_id;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      },
    },
  };
</script>

<style scoped>

</style>
