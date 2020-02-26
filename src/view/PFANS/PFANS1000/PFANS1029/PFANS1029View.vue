<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     :rowid="row_id"
                     @buttonClick="buttonClick"
                     @rowClick="rowClick"
                     v-loading="loading">
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getUserInfo, getOrgInfoByUserId,getStatus} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from "moment";

  export default {
    name: "PFANS1029View",
    components: {
      EasyNormalTable,
    },
    data(){
      return{
        loading: false,
        title: "title.PFANS1029VIEW",
        data: [],
        columns:[
          {
            code: 'contract_id',
            label: 'label.PFANS1024VIEW_CONTRACTNUMBER',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'contracttype',
            label: 'label.PFANS1024VIEW_CONTRACTTYPE',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'depositjapanese',
            label: 'label.PFANS1029VIEW_DEPOSITJAPANESE',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'prplacejapanese',
            label: 'label.PFANS1029VIEW_PRPLACEJAPANESE',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'deployment',
            label: 'label.PFANS1029VIEW_DEPLOYMENT',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'pjnamejapanese',
            label: 'label.PFANS1029VIEW_PJNAMEJAPANESE',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'openingdate',
            label: 'label.PFANS1029VIEW_OPENINGDATE',
            width: 200,
            fix: false,
            filter: true
          },

          {
            code: 'enddate',
            label: 'label.PFANS1029VIEW_ENDDATE',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'currencyformat',
            label: 'label.PFANS1029VIEW_CURRENCYFORMAT',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'claimamount',
            label: 'label.PFANS1029VIEW_CLAIMAMOUNT',
            width: 120,
            fix: false,
            filter: true
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'}
        ],
        rowid: '',
        row_id: 'contractapplication_id'
      }
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1029Store/get',{})
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].user_id !== null && response[j].user_id !== "") {

              if (response[j].openingdate !== null && response[j].openingdate !== ""){
                response[j].openingdate = moment(response[j].openingdate).format("YYYY-MM-DD");
              }
              if (response[j].enddate !== null && response[j].enddate !== ""){
                    response[j].enddate = moment(response[j].enddate).format("YYYY-MM-DD");
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
        this.rowid = row.contractapplication_id;
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
            name: 'PFANS1029FormView',
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
            name: 'PFANS1029FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }

      }
    }
  }
</script>

<style scoped>

</style>
