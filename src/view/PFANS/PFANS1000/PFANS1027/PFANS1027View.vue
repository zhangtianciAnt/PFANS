<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" >
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import { Message } from 'element-ui'
  import moment from "moment";
  import {getOrgInfoByUserId,getUserInfo,getStatus,getDictionaryInfo} from '@/utils/customize';

  export default {
    name: 'PFANS1027View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS1027VIEW",
        data: [],
        columns: [
          {
            code: 'contractnumber',
            label: 'label.PFANS1032FORMVIEW_CONTRACTNUMBER',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'contracttype',
            label: 'label.PFANS1024VIEW_CONTRACTTYPE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'trusteejapanese',
            label: 'label.PFANS1032FORMVIEW_DEPOSITARY',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'entrustedjapanese',
            label: 'label.PFANS1030FORMVIEW_PRINCIPALPLAC',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'department',
            label: 'label.PFANS1024VIEW_DEPLOYMENT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'pjjapanese',
            label: 'label.PFANS1025VIEW_PJNAME',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'startdate',
            label: 'label.PFANS1025VIEW_OPENINGDATE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'enddate',
            label: 'label.PFANS1025VIEW_ENDDATE',
            width: 120,
            fix: false,
            filter: true,
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        rowid: '',
        row : 'quotationid'
      };
    },
    mounted() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2022Store/get')
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].contracttype !== null && response[j].contracttype !== "") {
                let letContracttype = getDictionaryInfo(response[j].contracttype);
                if (letContracttype != null) {
                  response[j].contracttype = letContracttype.value1;
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
            this.loading = false
          })
    },
    methods: {
      rowClick(row) {
        this.rowid = row.quotationid;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1027FormView',
            params: {
              _id: this.rowid,
              disabled: true
            }
          })
        }
        if (val === 'view') {
          if (this.rowid === '') {
            Message({
                message: this.$t('normal.info_01'),
                type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1027FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
