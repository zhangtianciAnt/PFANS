<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getUserInfo, getDictionaryInfo, getDepartmentById, getSupplierinfor} from '../../../../utils/customize';

  export default {
    name: 'PFANS6001View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS6001VIEW',
        data: [],
        columns: [
          {
            //姓名
            code: 'expname',
            label: 'label.user_name',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'graduateschool',
            label: 'label.PFANS6001VIEW_GRADUATESCHOOL',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'suppliername',
            label: 'label.PFANS6001VIEW_SUPPLIERNAME',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'interviewdep',
            label: 'label.PFANS2003FORMVIEW_INTERVIEWDEP',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //面试结果
            code: 'result',
            label: 'label.PFANS6001VIEW_RESULT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //入职与否
            code: 'whetherentry',
            label: 'label.PFANS2003FORMVIEW_WHETHERENTRY',
            width: 120,
            fix: false,
            filter: true,
          },
          // {
          //   //技术分类
          //   code: 'technology',
          //   label: 'label.PFANS2003VIEW_TECHNOLOGY',
          //   width: 120,
          //   fix: false,
          //   filter: true,
          // },
          {
            //面试时间
            code: 'interview_date',
            label: 'label.PFANS2003FORMVIEW_INTERVIEWDATE',
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
        rowid: '',
        row: 'expatriatesinfor_id',
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS6004Store/getexpatriatesinfor')
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].graduateschool !== null && response[j].graduateschool !== '') {
              let graduateschool = getUserInfo(response[j].graduateschool);
              if (graduateschool) {
                response[j].graduateschool = user.userinfo.customername;
              }
            }
            if (response[j].supplierinfor_id !== null && response[j].supplierinfor_id !== '') {
              let supplierInfor = getSupplierinfor(response[j].supplierinfor_id);
              if (supplierInfor) {
                response[j].suppliername = supplierInfor.supchinese;
              }
            }
            if (response[j].result !== null && response[j].result !== '') {
              let letStage = getDictionaryInfo(response[j].result);
              if (letStage != null) {
                response[j].result = letStage.value1;
              }
            }
            if (response[j].whetherentry !== null && response[j].whetherentry !== '') {
              let letStage = getDictionaryInfo(response[j].whetherentry);
              if (letStage != null) {
                response[j].whetherentry = letStage.value1;
              }
            }
            // if (response[j].technology !== null && response[j].technology !== '') {
            //   let letStage = getDictionaryInfo(response[j].technology);
            //   if (letStage != null) {
            //     response[j].technology = letStage.value1;
            //   }
            // }
            if (response[j].interview_date !== null && response[j].interview_date !== '') {
              response[j].interview_date = moment(response[j].interview_date).format('YYYY-MM-DD');
            }
          }
          for (let i = 0; i < response.length; i++) {
            response[i].groupNmae = getUserInfo(response[i].interviewdep);
          }
          for (let i = 0; i < response.length; i++) {
            response[i].interviewdep = getDepartmentById(response[i].interviewdep);
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
    },
    methods: {
      rowClick(row) {
        this.rowid = row.expatriatesinfor_id;
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
            name: 'PFANS6001FormView',
            params: {
              _id: this.rowid,
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
            name: 'PFANS6001FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS6001FormView',
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

<style lang="scss" rel="stylesheet/scss">

</style>
